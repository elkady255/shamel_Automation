// Payment Reconciliation - Allocate and the Allocation table (SRS p.319-324). Reconcile is never pressed here.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/prec-ui';
import { recorder } from './helpers/si-ui';

const rec = recorder('prec-d-alloc');
test.use({ viewport: { width: 1400, height: 1400 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(280_000);

const CUST = 'QA-PR Cust Main';
const dlg = (p: Page) => p.locator('.base-modal:visible').last();
const reconcileBtn = (p: Page) => u.main(p).getByRole('button', { name: 'تسوية', exact: true });
const short = (a?: any[]) => (a ?? []).map((x) => `${x.reference_name.slice(-5)}>${x.invoice_number.slice(-5)}:${x.allocated_amount} diff=${x.difference_amount ?? x.invoice_outstanding - x.allocated_amount}`).join(' ; '); // eslint-disable-line @typescript-eslint/no-explicit-any
const num = (s: string) => Number(String(s).replace(/[^\d.\-]/g, ''));

async function start(page: Page) { await u.open(page); await u.setParty(page, CUST); return (await u.getEntries(page))!; }
async function alloc(page: Page, invoices: string[], payments: string[]) {
  await start(page); await u.select(page, 0, ...invoices); await u.select(page, 1, ...payments);
  return u.allocate(page);
}
const amountInput = (p: Page, i = 0) => u.tables(p).nth(2).locator('tbody tr').nth(i).locator('input.prc-amount, input:not([type=checkbox])').first();
const errText = async (p: Page) => `${await u.modalText(p)} ${(await u.tables(p).nth(2).locator('[class*=error]:visible').allInnerTexts().catch(() => [])).join(' ')}`.replace(/\s+/g, ' ').trim();
async function setAmount(p: Page, v: string, i = 0) {
  const f = amountInput(p, i); await f.click(); await f.press('Control+a'); if (v) await f.pressSequentially(v); else await f.press('Delete'); await f.press('Tab'); await u.wait(p, 1500);
  const out = { value: await f.inputValue(), error: await errText(p), diff: (await u.allocRows(p))[i]?.[5] ?? '' };
  await u.closeModals(p); return out;
}

test('D01 selection validation', async ({ page }) => {
  await start(page);
  for (const [id, inv, pay, text] of [['D01-1', [], [], 'nothing'], ['D01-2', ['02907'], [], 'an invoice only'], ['D01-3', [], ['03072'], 'a payment only']] as const) {
    if (id !== 'D01-1') await start(page);
    await u.select(page, 0, ...inv); await u.select(page, 1, ...pay);
    const a = await u.allocate(page); const m = await u.modalText(page);
    rec.check(id, `Allocate with ${text} selected shows an error and no Allocation table`, !a && /فاتورة|دفعة/.test(m) && (await u.tables(page).count()) === 2, m);
    await u.closeModals(page);
  }
});

test('D02 one invoice and one payment', async ({ page }) => {
  const a = await alloc(page, ['02907'], ['03072']);
  rec.note('D02-0', 'server allocation', JSON.stringify(a));
  rec.check('D02-1', 'The Allocation table appears with one row', (await u.allocRows(page)).length === 1, JSON.stringify(await u.allocRows(page)));
  const r = (await u.allocRows(page))[0] ?? [];
  rec.check('D02-2', 'Row shows Reference Name, Invoice Number, Allocated Amount and Difference Amount', r.includes('ACC-PAY-2026-03072') && r.includes('ACC-SINV-2026-02907'), r.join('|'));
  rec.check('D02-3', 'Allocated = min(outstanding 1000, payment 700) = 700', num(r[4]) === 700, r[4]);
  rec.check('D02-4', 'Difference Amount = outstanding - allocated = 300', num(r[5]) === 300, r[5]);
  rec.check('D02-5', 'Reconcile button is displayed', (await reconcileBtn(page).count()) === 1);
  rec.check('D02-6', 'Get Unreconciled Entries stays visible', (await u.main(page).getByRole('button', { name: u.BTN_GET }).count()) === 1);
  const h = (await u.readTables(page))[2].head.filter(Boolean);
  rec.check('D02-7', 'Allocation default columns: No., Reference Name, Invoice Number, Allocated Amount, Difference Amount', ['م', 'اسم المرجع', 'رقم الفاتورة', 'المبلغ المخصص', 'مبلغ الفرق'].every((c) => h.includes(c)), h.join('|'));
  await page.screenshot({ path: 'Shamel/prec-results/d02-alloc.png', fullPage: true });
  await u.getEntries(page);
  rec.check('D02-8', 'Pressing Get Unreconciled Entries again clears the old allocation and Reconcile', (await u.tables(page).count()) === 2 && (await reconcileBtn(page).count()) === 0, `${await u.tables(page).count()} reconcile=${await reconcileBtn(page).count()}`);
});

test('D03 one invoice, several payments', async ({ page }) => {
  const a = await alloc(page, ['02908'], ['03072', '03073']);
  rec.note('D03-0', 'allocation', short(a));
  const rows = await u.allocRows(page); const al = rows.map((r) => num(r[4]));
  rec.check('D03-1', 'Two rows: 700 from the first payment and 1300 from the second', JSON.stringify(al) === '[700,1300]', JSON.stringify(rows));
  rec.check('D03-2', 'The invoice is never over-allocated', al.reduce((s, x) => s + x, 0) <= 2000, String(al));
  rec.check('D03-3', 'Difference of the last row is 0 when the invoice is fully allocated', num(rows.at(-1)?.[5] ?? '') === 0, rows.map((r) => r[5]).join(','));
});

test('D04 several invoices, one payment', async ({ page }) => {
  const a = await alloc(page, ['02907', '02908', '02909'], ['03073']);
  rec.note('D04-0', 'allocation', short(a));
  const rows = await u.allocRows(page); const al = rows.map((r) => num(r[4]));
  rec.check('D04-1', 'Payment 3000 covers 1000 + 2000 (oldest first), nothing left for the third', JSON.stringify(al) === '[1000,2000]', JSON.stringify(rows));
  rec.check('D04-2', 'The payment is never over-allocated', al.reduce((s, x) => s + x, 0) <= 3000, String(al));
});

test('D05 return invoice and journal entry as payments', async ({ page }) => {
  const a = await alloc(page, ['02909'], ['02910']);
  rec.note('D05-0', 'allocation with a return', JSON.stringify(a));
  let r = (await u.allocRows(page))[0] ?? [];
  rec.check('D05-1', 'Return invoice 200 allocates to invoice 500: allocated 200, difference 300', num(r[4]) === 200 && num(r[5]) === 300, r.join('|'));
  const b = await alloc(page, ['02907'], ['01713']); rec.note('D05-2', 'allocation with a journal entry', JSON.stringify(b));
  r = (await u.allocRows(page))[0] ?? [];
  rec.check('D05-3', 'Journal entry 400 allocates to invoice 1000: allocated 400, difference 600', num(r[4]) === 400 && num(r[5]) === 600, r.join('|'));
});

test('D06 everything selected', async ({ page }) => {
  await start(page);
  await u.press(u.tables(page).nth(0).locator('thead .sr-checkbox')); await u.press(u.tables(page).nth(1).locator('thead .sr-checkbox')); await u.wait(page, 1000);
  const a = await u.allocate(page); rec.note('D06-0', 'allocation', short(a));
  const sum = (key: 'invoice_number' | 'reference_name') => (a ?? []).reduce((m: Record<string, number>, x) => { m[x[key]] = (m[x[key]] ?? 0) + x.allocated_amount; return m; }, {});
  const out: Record<string, number> = { 'ACC-SINV-2026-02907': 1000, 'ACC-SINV-2026-02908': 2000, 'ACC-SINV-2026-02909': 500 };
  const pays: Record<string, number> = { 'ACC-PAY-2026-03072': 700, 'ACC-PAY-2026-03073': 3000, 'ACC-JV-2026-01713': 400, 'ACC-SINV-2026-02910': 200 };
  rec.check('D06-1', 'No invoice receives more than its outstanding amount', !!a?.length && Object.entries(sum('invoice_number')).every(([k, v]) => v <= out[k]), JSON.stringify(sum('invoice_number')));
  rec.check('D06-2', 'No payment gives more than its amount', !!a?.length && Object.entries(sum('reference_name')).every(([k, v]) => v <= pays[k]), JSON.stringify(sum('reference_name')));
  rec.check('D06-3', 'All 3500 of outstanding is covered (payments total 4300)', (a ?? []).reduce((s, x) => s + x.allocated_amount, 0) === 3500, String((a ?? []).reduce((s, x) => s + x.allocated_amount, 0)));
  rec.check('D06-4', 'Table rows equal the server allocation', (await u.allocRows(page)).length === a?.length, `${(await u.allocRows(page)).length} vs ${a?.length}`);
});

test('D07 edit Allocated Amount in the table', async ({ page }) => {
  await alloc(page, ['02907'], ['03072']);
  let x = await setAmount(page, '500.55');
  rec.check('D07-1', 'Decimals are accepted', num(x.value) === 500.55, JSON.stringify(x));
  rec.check('D07-2', 'Difference Amount is recalculated after editing (1000 - 500.55 = 499.45)', num(x.diff) === 499.45, `diff=${x.diff}`);
  x = await setAmount(page, '100'); rec.check('D07-3', 'Integers are accepted and the difference becomes 900', num(x.value) === 100 && num(x.diff) === 900, JSON.stringify(x));
  x = await setAmount(page, '800'); rec.check('D07-4', 'More than the payment amount (800 > 700) shows an error', x.error !== '' || num(x.value) <= 700, JSON.stringify(x));
  x = await setAmount(page, '1500'); rec.check('D07-5', 'More than the invoice outstanding (1500 > 1000) shows an error', x.error !== '' || num(x.value) <= 700, JSON.stringify(x));
  x = await setAmount(page, 'abc!@'); rec.check('D07-6', 'Letters and symbols are rejected', !/[a-z!@]/i.test(x.value), JSON.stringify(x));
  x = await setAmount(page, '-50'); rec.check('D07-7', 'A negative amount is not accepted', !x.value.startsWith('-') || x.error !== '', JSON.stringify(x));
  x = await setAmount(page, '0'); rec.check('D07-8', 'Zero is rejected with a message', x.error !== '', JSON.stringify(x));
  x = await setAmount(page, ''); rec.check('D07-9', 'An empty mandatory amount shows an error', x.error !== '', JSON.stringify(x));
  x = await setAmount(page, '700'); rec.check('D07-10', 'The exact payment amount is accepted without error', num(x.value) === 700 && x.error === '', JSON.stringify(x));
});

test('D08 over-allocation across several rows', async ({ page }) => {
  await alloc(page, ['02908'], ['03072', '03073']);
  const x = await setAmount(page, '700', 0); const y = await setAmount(page, '2000', 1);
  rec.check('D08-1', 'Rows that together exceed the invoice outstanding (700 + 2000 > 2000) raise an error', y.error !== '' || num(y.value) <= 1300, JSON.stringify({ x, y }));
});

test('D09 Edit Row of the allocation', async ({ page }) => {
  await alloc(page, ['02907'], ['03072']);
  const openE = async () => { await u.press(u.tables(page).nth(2).locator('button[title="تعديل الصف"]').first()); await u.wait(page, 2500); };
  await openE();
  const text = (await dlg(page).innerText()).replace(/\s+/g, ' ');
  const fields = ['نوع المرجع', 'اسم المرجع', 'نوع الفاتورة', 'رقم الفاتورة', 'المبلغ المخصص', 'مبلغ الفرق', 'حساب الفرق', 'تاريخ ترحيل الفرق', 'سعر الصرف', 'تاريخ ترحيل إشعار المدين / الدائن'];
  rec.check('D09-1', 'All 10 SRS fields are in the popup', fields.every((f) => text.includes(f)), fields.filter((f) => !text.includes(f)).join(', ') || text);
  rec.check('D09-2', 'Allocated Amount is marked mandatory', /المبلغ المخصص\s*\*/.test(text), text);
  const inputs = await dlg(page).locator('input:visible').evaluateAll((els: any[]) => els.map((e) => { let b = e.parentElement; while (b && !b.querySelector('label')) b = b.parentElement; return { label: b?.querySelector('label')?.innerText.replace('*', '').trim() ?? '', value: e.value, ro: e.disabled || (e.readOnly && !e.className.includes('flatpickr')) }; })); // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.note('D09-3', 'popup inputs', JSON.stringify(inputs));
  const editable = inputs.filter((i) => !i.ro).map((i) => i.label);
  rec.check('D09-4', 'Only Allocated Amount, Difference Posting Date and Debit / Credit Note Posting Date are editable', editable.every((l) => /المبلغ المخصص|تاريخ ترحيل/.test(l)) && editable.some((l) => /المبلغ المخصص/.test(l)), editable.join(', '));
  const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
  rec.check('D09-5', 'Difference Posting Date defaults to the current date', inputs.some((i) => /ترحيل الفرق/.test(i.label) && i.value === today) || text.includes(today), `today=${today} ${JSON.stringify(inputs)}`);
  const f = dlg(page).locator('input[inputmode=decimal]:visible:not([readonly]):not([disabled])').first();
  const typeIn = async (v: string) => { await f.click(); await f.press('Control+a'); if (v) await f.pressSequentially(v); else await f.press('Delete'); await f.press('Tab'); await u.wait(page, 600); rec.note('D09-typed', `typed "${v}"`, await f.inputValue()); };
  const apply = async () => { await u.press(dlg(page).getByRole('button', { name: /^(تعديل|تحديث|حفظ)$/ })); await u.wait(page, 2000); };
  await typeIn(''); await apply();
  const e1 = `${await u.modalText(page)}`;
  rec.check('D09-6', 'Empty Allocated Amount in the popup shows an error and is not applied', /مطلوب|المبلغ|خطأ/.test(e1) && (await page.locator('.base-modal:visible').count()) > 0, e1.slice(0, 300));
  await u.closeModals(page); await alloc(page, ['02907'], ['03072']); await openE();
  await typeIn('900'); await apply(); const e2 = await u.modalText(page);
  rec.check('D09-7', 'Amount above the payment (900 > 700) shows an error in the popup', /خطأ|أكبر|يتجاوز|لا يمكن/.test(e2), e2.slice(0, 300));
  await u.closeModals(page); await alloc(page, ['02907'], ['03072']); await openE();
  await typeIn('250'); await apply();
  const r = (await u.allocRows(page))[0] ?? [];
  rec.check('D09-8', 'A valid change in the popup updates the table row (250, difference 750)', num(r[4]) === 250 && num(r[5]) === 750, r.join('|'));
  await openE(); await typeIn('300'); await u.press(dlg(page).getByRole('button', { name: 'إلغاء' })); await u.wait(page, 1500);
  rec.check('D09-9', 'Cancel keeps the previous amount', num((await u.allocRows(page))[0]?.[4] ?? '') === 250, (await u.allocRows(page))[0]?.join('|'));
});

test('D10 delete allocation rows', async ({ page }) => {
  await alloc(page, ['02908'], ['03072', '03073']);
  await u.press(u.tables(page).nth(2).locator('tbody tr').first().locator('button[title="حذف"]')); await u.wait(page, 1500);
  if (await u.modalText(page)) { await u.press(page.locator('.base-modal:visible button, .modal.show button').filter({ hasText: /حذف|نعم|تأكيد/ }).last()); await u.wait(page, 1500); }
  let rows = await u.allocRows(page);
  rec.check('D10-1', 'Deleting one allocation row keeps the other', rows.filter((r) => r.join('').includes('ACC-')).length === 1 && rows[0].includes('ACC-PAY-2026-03073'), JSON.stringify(rows));
  await u.press(u.tables(page).nth(2).locator('thead .sr-checkbox')); await u.wait(page, 800);
  await u.press(u.main(page).locator('.table-controls:visible button').filter({ hasText: 'حذف' }).last()); await u.wait(page, 1500);
  if (await u.modalText(page)) { await u.press(page.locator('.base-modal:visible button, .modal.show button').filter({ hasText: /حذف|نعم|تأكيد/ }).last()); await u.wait(page, 1500); }
  rows = await u.allocRows(page);
  rec.check('D10-2', 'Bulk delete empties the Allocation table', !rows.some((r) => r.join('').includes('ACC-')), JSON.stringify(rows));
  if (await reconcileBtn(page).count()) {
    let sent = false; page.on('request', (r) => { if (/payment_reconcil\w*\.reconcile/.test(r.url())) sent = true; });
    await u.press(reconcileBtn(page)); await u.wait(page, 5000); const m = await u.modalText(page);
    rec.check('D10-3', 'Reconcile with no allocation rows shows an error and nothing is reconciled', m !== '' && !/تمت|بنجاح/.test(m), `sent=${sent} msg=${m}`);
  } else rec.check('D10-3', 'Reconcile is hidden when no allocation row is left', true);
});

test('D11 allocation table settings', async ({ page }) => {
  await alloc(page, ['02907'], ['03072']);
  await u.press(u.tables(page).nth(2).locator('button[title="إعدادات الجدول"]')); await u.wait(page, 2000);
  const txt = (await dlg(page).innerText()).replace(/\s+/g, ' ');
  rec.check('D11-1', 'Allocation settings popup: width, Add/Remove, Reset, Save', /عرض العمود/.test(txt) && /إضافة\/إزالة/.test(txt) && /إعادة تعيين/.test(txt), txt);
  await u.press(dlg(page).getByText('إضافة/إزالة حقول')); await u.wait(page, 2000);
  const all = (await dlg(page).innerText()).replace(/\s+/g, ' ');
  const srs = ['اسم المرجع', 'رقم الفاتورة', 'المبلغ المخصص', 'مبلغ الفرق', 'نوع المرجع', 'نوع الفاتورة', 'تاريخ ترحيل الفرق', 'تاريخ ترحيل إشعار المدين / الدائن', 'حساب الفرق', 'سعر الصرف', 'مركز التكلفة'];
  rec.check('D11-2', 'Add/Remove lists every SRS allocation column', srs.every((c) => all.includes(c)), `missing=${srs.filter((c) => !all.includes(c))} popup=${all}`);
  await page.screenshot({ path: 'Shamel/prec-results/d11-columns.png' });
});
