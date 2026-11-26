// Payment Reconciliation - Unreconciled Entries tables (SRS p.314-319). Nothing is reconciled.
import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as u from './helpers/prec-ui';
import * as d from './helpers/prec-data';
import { api } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('prec-c-tables');
test.use({ viewport: { width: 1400, height: 1400 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(280_000);

const money = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dmy = (iso: string) => iso.split('-').reverse().join('-');
const CUST = 'QA-PR Cust Main';
const FILE = 'Shamel/prec-results/data.json';

async function start(page: Page, party = CUST, type: 'العميل' | 'المورد' = 'العميل') {
  await u.open(page); await u.setParty(page, party, type);
  return (await u.getEntries(page))!;
}
/** Text of every open dialog of the screen. */
const dlg = (p: Page) => p.locator('.base-modal:visible').last();

async function checkData(page: Page, tag: string, party: string, partyType: 'Customer' | 'Supplier', account: string, entries: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const invType = partyType === 'Customer' ? 'Sales Invoice' : 'Purchase Invoice';
  const partyField = partyType === 'Customer' ? 'customer' : 'supplier';
  const accField = partyType === 'Customer' ? 'debit_to' : 'credit_to';
  const invs = await api.list(invType, [[partyField, '=', party], ['docstatus', '=', 1], ['is_return', '=', 0], [accField, '=', account], ['outstanding_amount', '>', 0]], ['name', 'posting_date', 'grand_total', 'outstanding_amount']);
  const returns = await api.list(invType, [[partyField, '=', party], ['docstatus', '=', 1], ['is_return', '=', 1], [accField, '=', account], ['outstanding_amount', '<', 0]], ['name', 'posting_date', 'outstanding_amount']);
  const pes = await api.list('Payment Entry', [['party', '=', party], ['docstatus', '=', 1], ['unallocated_amount', '>', 0]], ['name', 'posting_date', 'unallocated_amount']);
  const screen = await u.readTables(page);
  const iRows = screen[0]?.rows.map((r) => r.cells) ?? []; const pRows = screen[1]?.rows.map((r) => r.cells) ?? [];
  rec.check(`${tag}-1`, 'Invoices table lists exactly the submitted invoices with an outstanding balance', JSON.stringify(entries.invoices.map((x: any) => x.invoice_number).sort()) === JSON.stringify(invs.map((x) => x.name).sort()) && iRows.length === invs.length, `screen=${iRows.map((r) => r[3])} db=${invs.map((x) => x.name)}`); // eslint-disable-line @typescript-eslint/no-explicit-any
  const badI = invs.filter((x) => { const r = iRows.find((c) => c.includes(x.name)); return !r || !r.includes(dmy(x.posting_date)) || !r.includes(money(x.outstanding_amount)); });
  rec.check(`${tag}-2`, 'Each invoice row shows its type, number, posting date and outstanding amount as stored', badI.length === 0 && iRows.every((r) => r[2] === (partyType === 'Customer' ? 'فاتورة مبيعات' : 'فاتورة مشتريات')), `bad=${badI.map((x) => x.name)} rows=${JSON.stringify(iRows)}`);
  const badAmt = entries.invoices.filter((x: any) => { const doc = invs.find((i) => i.name === x.invoice_number); return !doc || x.amount !== doc.grand_total || x.outstanding_amount !== doc.outstanding_amount; }); // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.check(`${tag}-3`, 'Returned Amount = grand total and Outstanding = document outstanding', badAmt.length === 0, JSON.stringify(badAmt));
  rec.check(`${tag}-4`, 'Rows are numbered 1..n', iRows.every((r, i) => r[1] === String(i + 1)) && pRows.every((r, i) => r[1] === String(i + 1)), JSON.stringify([iRows.map((r) => r[1]), pRows.map((r) => r[1])]));
  const missingPe = pes.filter((x) => { const r = pRows.find((c) => c.includes(x.name)); return !r || !r.includes(dmy(x.posting_date)) || !r.includes(money(x.unallocated_amount)); });
  rec.check(`${tag}-5`, 'Every submitted payment entry with an unallocated amount is listed with date and available amount', missingPe.length === 0, `missing/wrong=${missingPe.map((x) => x.name)} rows=${JSON.stringify(pRows)}`);
  const missingRet = returns.filter((x) => { const r = pRows.find((c) => c.includes(x.name)); return !r || !r.includes(money(-x.outstanding_amount)); });
  rec.check(`${tag}-6`, 'Return invoices with an available amount are listed in Payments', missingRet.length === 0, `missing=${missingRet.map((x) => x.name)}`);
  const jeName = JSON.parse(fs.readFileSync(FILE, 'utf8'))[partyType === 'Customer' ? 'jeC' : 'jeS'];
  rec.check(`${tag}-7`, 'The advance journal entry is listed in Payments', pRows.some((r) => r.includes(jeName)), jeName);
  const known = new Set([...pes.map((x) => x.name), ...returns.map((x) => x.name), jeName]);
  rec.check(`${tag}-8`, 'Payments lists nothing else (no normal invoices, no allocated documents)', pRows.every((r) => known.has(r[2])), `extra=${pRows.filter((r) => !known.has(r[2])).map((r) => r[2])}`);
}

test('C01 customer data returned correctly', async ({ page }) => {
  const e = await start(page);
  await checkData(page, 'C01', CUST, 'Customer', d.REC, e);
});

test('C02 supplier data returned correctly', async ({ page }) => {
  await u.open(page); await u.setParty(page, 'QA-PR Supp Main', 'المورد');
  await u.pick(page, 'حساب المدينين / الدائنين', 'QA-PR Payable');
  const e = (await u.getEntries(page))!;
  await checkData(page, 'C02', 'QA-PR Supp Main', 'Supplier', d.PAY, e);
});

test('C03 columns of both tables', async ({ page }) => {
  await start(page);
  const t = await u.readTables(page);
  rec.check('C03-1', 'Invoices columns: No., Invoice Type, Invoice Number, Invoice Date, Outstanding Amount', ['م', 'نوع الفاتورة', 'رقم الفاتورة', 'تاريخ الفاتورة', 'المبلغ المستحق'].every((c) => t[0].head.includes(c)), t[0].head.join('|'));
  rec.check('C03-2', 'Payments columns: No., Reference Name, Posting Date, Amount', ['م', 'اسم المرجع', 'تاريخ الترحيل', 'المبلغ'].every((c) => t[1].head.includes(c)), t[1].head.join('|'));
  const cut = await u.tables(page).evaluateAll((ts: any[]) => ts.map((x) => { const wrap = x.parentElement; const w = wrap.getBoundingClientRect(); return [...x.querySelectorAll('thead th')].filter((h: any) => { const r = h.getBoundingClientRect(); return h.innerText.trim() && (r.left < w.left - 2 || r.right > w.right + 2); }).map((h: any) => h.innerText.trim()); })); // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.check('C03-3', 'All columns are fully visible without clipping at 1400px width', cut.flat().length === 0, JSON.stringify(cut));
  await page.screenshot({ path: 'Shamel/prec-results/c03-tables.png', fullPage: true });
});

test('C04 draft and cancelled documents are excluded', async ({ page }) => {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const save = () => fs.writeFileSync(FILE, JSON.stringify(data, null, 1));
  if (!data.siDraft) { data.siDraft = (await api.insert('Sales Invoice', { company: d.CO, customer: CUST, set_posting_time: 1, posting_date: d.daysAgo(3), due_date: d.daysAgo(1), debit_to: d.REC, items: [{ item_code: d.ITEM, qty: 1, rate: 1900, cost_center: d.CC }], taxes: [] })).name; save(); }
  if (!data.siCancelled) { const s = await d.salesInvoice(CUST, 1950, 4); await api.call('frappe.client.cancel', { doctype: 'Sales Invoice', name: s.name }); data.siCancelled = s.name; save(); }
  if (!data.peCancelled) { const p = await d.advance('Customer', CUST, 111, 4); await api.call('frappe.client.cancel', { doctype: 'Payment Entry', name: p.name }); data.peCancelled = p.name; save(); }
  const e = await start(page);
  const all = JSON.stringify(e) + (await u.main(page).innerText());
  rec.check('C04-1', `Draft invoice ${data.siDraft} is not listed`, !all.includes(data.siDraft));
  rec.check('C04-2', `Cancelled invoice ${data.siCancelled} is not listed`, !all.includes(data.siCancelled));
  rec.check('C04-3', `Cancelled payment ${data.peCancelled} is not listed`, !all.includes(data.peCancelled));
});

test('C05 invoice number opens the document', async ({ page }) => {
  await start(page);
  const link = u.row(page, 0, '02907').locator('a');
  rec.check('C05-1', 'Invoice Number is a link', (await link.count()) === 1, String(await link.count()));
  const [tab] = await Promise.all([page.context().waitForEvent('page', { timeout: 20_000 }).catch(() => null), link.click()]);
  const target = tab ?? page;
  const opened = await expect.poll(async () => (await target.locator('main input').evaluateAll((els: any[]) => els.map((e) => e.value).join(' ')).catch(() => '')) + (await target.locator('main').innerText().catch(() => '')), { timeout: 45_000 }).toContain('QA-PR Cust Main').then(() => true).catch(() => false);
  const body = await target.locator('main').innerText();
  await target.screenshot({ path: 'Shamel/prec-results/c05-opened.png' });
  rec.check('C05-2', 'The link opens the corresponding Sales Invoice', opened && /sales-invoices\/ACC-SINV-2026-02907/.test(target.url()), `${target.url()} opened=${opened}`);
  rec.check('C05-3', 'The opened document is not an error / empty screen', !/غير موجود|404/.test(body), body.slice(0, 200));
});

test('C06 filter on invoice number', async ({ page }) => {
  await start(page);
  const f = u.main(page).getByPlaceholder('ابحث برقم الفاتورة');
  const rows = async () => (await u.readTables(page))[0].rows.map((r) => r.cells[3] ?? r.cells.join(' '));
  const set = async (v: string) => { await f.fill(v); await u.wait(page, 1500); return rows(); };
  let r = await set('ACC-SINV-2026-02908'); rec.check('C06-1', 'Full number shows only that invoice', r.length === 1 && r[0].includes('02908'), r.join(','));
  r = await set('02909'); rec.check('C06-2', 'Part of the number works', r.length === 1 && r[0].includes('02909'), r.join(','));
  r = await set('sinv-2026-02907'); rec.check('C06-3', 'Search ignores letter case', r.length === 1 && r[0].includes('02907'), r.join(','));
  r = await set('  02907  '); rec.check('C06-4', 'Leading / trailing spaces are ignored', r.length === 1 && r[0].includes('02907'), r.join(','));
  r = await set('zzz'); rec.check('C06-5', 'No match shows an empty table', !r.some((x) => x.includes('ACC-')), r.join(','));
  r = await set(''); rec.check('C06-6', 'Clearing the search restores every invoice', r.length === 3, r.join(','));
  rec.check('C06-7', 'The search does not filter the payments table', (await u.readTables(page))[1].rows.length >= 4);
});

test('C07 select and delete rows', async ({ page }) => {
  await start(page);
  const t = () => u.tables(page).nth(0);
  const count = async (i = 0) => (await u.readTables(page))[i].rows.filter((r) => r.cells.join('').includes('ACC-')).length;
  const before = await count();
  await u.press(t().locator('thead .sr-checkbox')); await u.wait(page, 1000);
  const bar = (await u.main(page).locator('.table-controls:visible').allInnerTexts()).join(' ').replace(/\s+/g, ' ');
  rec.check('C07-1', 'Header checkbox selects all rows and shows the action bar with the count', bar.includes(String(before)) && /حذف/.test(bar), bar);
  await u.press(t().locator('thead .sr-checkbox')); await u.wait(page, 800);
  rec.check('C07-2', 'Unticking the header hides the action bar', (await u.main(page).locator('.table-controls:visible').count()) === 0);
  await u.select(page, 0, '02907', '02908');
  await u.press(u.main(page).locator('.table-controls:visible button').filter({ hasText: 'حذف' }).first()); await u.wait(page, 1500);
  const m = await u.modalText(page); if (m) { rec.note('C07-3', 'confirmation shown on bulk delete', m); await u.press(page.locator('.base-modal:visible button, .modal.show button').filter({ hasText: /حذف|نعم|تأكيد/ }).last()); await u.wait(page, 1500); }
  const left = (await u.readTables(page))[0].rows.map((r) => r.cells.join(' ')).join(' ');
  rec.check('C07-4', 'Delete removes exactly the selected rows', !left.includes('02907') && !left.includes('02908') && left.includes('02909'), left);
  await u.press(u.row(page, 1, '03072').locator('button[title="حذف"]')); await u.wait(page, 1500);
  const m2 = await u.modalText(page); if (m2) { await u.press(page.locator('.base-modal:visible button, .modal.show button').filter({ hasText: /حذف|نعم|تأكيد/ }).last()); await u.wait(page, 1500); }
  const pays = (await u.readTables(page))[1].rows.map((r) => r.cells.join(' ')).join(' ');
  rec.check('C07-5', 'The row delete icon removes that payment row only', !pays.includes('03072') && pays.includes('03073'), pays);
  rec.check('C07-6', 'Remaining rows are renumbered from 1', (await u.readTables(page))[1].rows[0]?.cells[1] === '1', JSON.stringify((await u.readTables(page))[1].rows[0]));
  const doc = await api.get('Sales Invoice', 'ACC-SINV-2026-02907'); const pe = await api.get('Payment Entry', 'ACC-PAY-2026-03072');
  rec.check('C07-7', 'Deleting rows only removes them from the screen (documents stay submitted)', doc.docstatus === 1 && pe.docstatus === 1);
  await u.getEntries(page);
  rec.check('C07-8', 'Get Unreconciled Entries brings the removed rows back', (await count()) === before && (await u.readTables(page))[1].rows.some((r) => r.cells.join(' ').includes('03072')), String(await count()));
});

test('C08 edit row of invoice and payment', async ({ page }) => {
  await start(page);
  const open = async (table: number, key: string) => { await u.press(u.row(page, table, key).locator('button[title="تعديل الصف"]')); await u.wait(page, 2000); const text = (await dlg(page).innerText()).replace(/\s+/g, ' '); const editable = await dlg(page).locator('input:visible:not([readonly]):not([disabled]), textarea:visible:not([readonly]):not([disabled])').count(); return { text, editable }; };
  let x = await open(0, '02908');
  const inv = ['نوع الفاتورة', 'رقم الفاتورة', 'تاريخ الفاتورة', 'المبلغ المستحق', 'المبلغ'];
  rec.check('C08-1', 'Invoice Edit Row shows Invoice Type, Number, Date, Outstanding Amount and Amount', inv.every((f) => x.text.includes(f)), x.text);
  rec.check('C08-2', 'Invoice Edit Row values match the row', x.text.includes('ACC-SINV-2026-02908') && x.text.includes('2,000.00'), x.text);
  rec.check('C08-3', 'All invoice popup fields are read-only labels', x.editable === 0, `editable inputs=${x.editable}`);
  const link = dlg(page).locator('a');
  rec.check('C08-4', 'Invoice Number inside Edit Row is clickable (opens the document)', (await link.count()) > 0, `links=${await link.count()}`);
  await u.closeModals(page);
  x = await open(1, '01713');
  const ccValue = (await dlg(page).locator('input:visible').evaluateAll((els: any[]) => els.map((e) => e.value))).join(' | ');
  const pf = ['نوع المرجع', 'اسم المرجع', 'تاريخ الترحيل', 'المبلغ', 'مبلغ الفرق', 'ملاحظات', 'مركز التكلفة'];
  rec.check('C08-5', 'Payment Edit Row shows Reference Type, Name, Posting Date, Amount, Difference Amount, Remarks, Cost Center', pf.every((f) => x.text.includes(f)), x.text);
  rec.check('C08-6', 'Payment Edit Row shows Journal Entry values', /قيد يومية|قيد اليومية|دفتر/.test(x.text) && x.text.includes('400.00') && ccValue.includes('101 - Main X'), `costCenter="${ccValue}" ${x.text}`);
  const cc = dlg(page).locator('label').filter({ hasText: 'مركز التكلفة' }).locator('xpath=ancestor::div[1]').locator('input');
  const ccEditable = (await cc.count()) > 0 && (await cc.first().isEditable());
  rec.check('C08-7', 'Cost Center in the payment popup is a searchable dropdown (SRS)', ccEditable, `inputs=${await cc.count()} editable=${ccEditable}`);
  await u.closeModals(page);
  x = await open(1, '02910'); rec.check('C08-8', 'Return invoice payment shows reference type Invoice', /فاتورة/.test(x.text) && x.text.includes('200.00'), x.text); await u.closeModals(page);
  x = await open(1, '03073'); rec.check('C08-9', 'Payment Entry row shows reference type Payment Entry with remarks', /قيد دفع/.test(x.text) && /3,000.00/.test(x.text) && /QA-PR/.test(x.text), x.text);
});

for (const [n, idx, name, srs] of [
  [1, 0, 'Invoices', ['نوع الفاتورة', 'رقم الفاتورة', 'تاريخ الفاتورة', 'المبلغ المستحق', 'المبلغ']],
  [2, 1, 'Payments', ['اسم المرجع', 'تاريخ الترحيل', 'المبلغ', 'نوع المرجع', 'مبلغ الفرق', 'ملاحظات', 'مركز التكلفة']],
] as const) {
  test(`C09-${n} table settings: ${name}`, async ({ page }) => {
    await start(page);
    const openS = async () => { await u.press(u.tables(page).nth(idx).locator('button[title="إعدادات الجدول"]')); await u.wait(page, 2000); };
    const head = async () => (await u.readTables(page))[idx].head.filter(Boolean);
    const widths = () => dlg(page).locator('input:visible');
    const saveBtn = async () => { await u.press(dlg(page).getByRole('button', { name: /^(حفظ|تحديث)$/ })); await u.wait(page, 3000); };
    const reset = async () => { await openS(); await u.press(dlg(page).getByRole('button', { name: /إعادة تعيين/ })); await u.wait(page, 2500); if (await dlg(page).count()) { const s = dlg(page).getByRole('button', { name: /^(حفظ|تحديث)$/ }); if (await s.count()) { await u.press(s); await u.wait(page, 2500); } } await u.closeModals(page); };
    await reset();
    const h0 = await head(); await openS();
    const txt = (await dlg(page).innerText()).replace(/\s+/g, ' ');
    rec.check(`C09-${n}-1`, `${name}: settings popup has drag handles, column width, Add/Remove columns, Reset and Save`, /عرض العمود/.test(txt) && /إضافة\/إزالة/.test(txt) && /إعادة تعيين/.test(txt) && /حفظ|تحديث/.test(txt), txt);
    rec.check(`C09-${n}-2`, `${name}: save button is labelled Update as in the SRS`, /تحديث/.test(txt), txt);
    const vals = await widths().evaluateAll((els: any[]) => els.map((e) => e.value)); // eslint-disable-line @typescript-eslint/no-explicit-any
    rec.check(`C09-${n}-3`, `${name}: default column width is 3`, vals.length > 0 && vals.every((v) => v === '3'), vals.join(','));
    const w = widths().first();
    await w.fill(''); await w.pressSequentially('abc'); await w.press('Tab'); const letters = await w.inputValue();
    await w.fill(''); await w.pressSequentially('12345'); await w.press('Tab'); const long = await w.inputValue();
    await w.fill(''); await w.pressSequentially('-1'); await w.press('Tab'); const neg = await w.inputValue();
    rec.check(`C09-${n}-4`, `${name}: column width accepts numbers only`, !/[a-z]/i.test(letters), `"${letters}"`);
    rec.check(`C09-${n}-5`, `${name}: column width maximum 3 characters`, long.length <= 3, `"${long}"`);
    rec.check(`C09-${n}-6`, `${name}: negative width is not accepted`, !neg.startsWith('-'), `"${neg}"`);
    await w.fill(''); await w.press('Tab'); await saveBtn();
    const emptyState = (await dlg(page).count()) ? (await dlg(page).innerText()).replace(/\s+/g, ' ') : 'closed';
    rec.check(`C09-${n}-7`, `${name}: empty width (below 1 character) is rejected or replaced by the default`, emptyState !== 'closed' || (await head()).length === h0.length, emptyState.slice(0, 300));
    await u.closeModals(page); await reset(); await openS();
    await u.press(dlg(page).getByText('إضافة/إزالة حقول')); await u.wait(page, 2000);
    const all = (await dlg(page).innerText()).replace(/\s+/g, ' ');
    rec.check(`C09-${n}-8`, `${name}: Add/Remove lists every SRS column`, srs.every((c) => all.includes(c)), `missing=${srs.filter((c) => !all.includes(c))} popup=${all}`);
    await page.screenshot({ path: `Shamel/prec-results/c09-${n}-columns.png` });
    // add every column that is not ticked, then confirm
    const boxes = dlg(page).locator('.sr-checkbox, input[type=checkbox]');
    const nBoxes = await boxes.count(); rec.note(`C09-${n}-9`, 'checkboxes in the column picker', String(nBoxes));
    const target = dlg(page).locator('label, li, .field-option, [class*=row]').filter({ hasText: srs[srs.length - 1] }).last();
    await u.press(target.locator('.sr-checkbox, input[type=checkbox]').first()).catch(() => {}); await u.wait(page, 800);
    const confirm = dlg(page).getByRole('button', { name: /^(حفظ|تحديث|تم|إضافة|تأكيد)$/ }).last(); await u.press(confirm).catch(() => {}); await u.wait(page, 2000);
    if (await dlg(page).count()) { const s = dlg(page).getByRole('button', { name: /^(حفظ|تحديث)$/ }); if (await s.count()) { await u.press(s.last()); await u.wait(page, 3000); } }
    await u.closeModals(page);
    const h1 = await head();
    rec.check(`C09-${n}-10`, `${name}: ticking / unticking a column changes the table after saving`, JSON.stringify(h1) !== JSON.stringify(h0), `before=${h0} after=${h1}`);
    const e = await start(page); expect(e).toBeTruthy();
    rec.check(`C09-${n}-11`, `${name}: saved column choice persists after reopening the page`, JSON.stringify(await head()) === JSON.stringify(h1), `${await head()}`);
    await reset();
    rec.check(`C09-${n}-12`, `${name}: Reset to default restores the original columns`, JSON.stringify(await head()) === JSON.stringify(h0), `${await head()}`);
    await openS(); const w2 = widths().first(); await w2.fill('9'); await w2.press('Tab'); await u.press(dlg(page).getByRole('button', { name: 'إلغاء' })); await u.wait(page, 1500); await openS();
    rec.check(`C09-${n}-13`, `${name}: Cancel discards a width change`, (await widths().first().inputValue()) === '3', await widths().first().inputValue());
  });
}
