import { test, type Page } from '@playwright/test';
import { api, type Doc } from './helpers/api';
import { pay, draftReturn, advance, newCustomer, cancel } from './helpers/si-data';
import { toggle, openDoc, tab, main, press, wait, recorder, snapshot, messages, closeModal, summary, num, value } from './helpers/si-ui';

test.describe.configure({ timeout: 900_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('l-payments');
const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

/** A direct Sales Invoice (service item, no stock update) for a customer; submitted when asked. */
async function mk(customer: string, opt: { qty?: number; rate?: number; posting?: string; due?: string; submit?: boolean } = {}): Promise<Doc> {
  const src = await api.get('Sales Invoice', 'ACC-SINV-2026-02830');
  const doc: Doc = { company: src.company, customer, currency: 'SAR', selling_price_list: 'Standard Selling', invoice_type: src.invoice_type, update_stock: 0,
    posting_date: opt.posting ?? today, due_date: opt.due ?? opt.posting ?? today, set_posting_time: opt.posting ? 1 : 0,
    items: [{ item_code: 'IND182210', qty: opt.qty ?? 1, rate: opt.rate ?? 1000, warehouse: 'Stores - E' }] };
  return opt.submit === false ? api.insert('Sales Invoice', doc) : api.insertAndSubmit('Sales Invoice', doc);
}
const buttons = (p: Page) => main(p).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || '').replace(/\s+/g, ' ').trim()).filter((s) => s && !/إشعار|تحديد|^الكل$|مقروء|Show popup/.test(s)));
const chip = async (p: Page) => (await main(p).locator('.status-chip').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
async function info(page: Page) { await tab(page, 'معلومات إضافية'); return snapshot(page); }
async function createItems(page: Page) {
  await press(main(page).getByRole('button', { name: 'إنشاء', exact: true }).first()).catch(() => {}); await wait(page, 1000);
  const t = ((await page.locator('.cd-action-menu.open').first().innerText().catch(() => '')) || '').split('\n').map((s) => s.trim()).filter(Boolean);
  await page.keyboard.press('Escape'); return t;
}

test('L01 partial then full payment: statuses, amounts, Actions and Create > Payment', async ({ page }) => {
  const cust = await newCustomer(); const si = await mk(cust, { rate: 1000 }); rec.note('L01-0', 'invoice', si.name);
  await pay(si, 400);
  await openDoc(page, si.name);
  const s = await info(page); const b = await buttons(page);
  rec.note('L01-1', 'status chip / info after paying 400', `${await chip(page)} | ${JSON.stringify(Object.entries(s).filter(([k]) => /حالة|مبلغ|المدفوع|الدائن|مستحق/.test(k)))}`);
  rec.check('L01-2', 'status is Partially Paid after a partial payment', /جزئي/.test(s['حالة الفاتورة'] || ''), s['حالة الفاتورة']);
  rec.check('L01-3', 'Paid Amount shows 400', num(s['المبلغ المدفوع'] || '') === 400, s['المبلغ المدفوع']);
  await tab(page, 'التفاصيل'); rec.check('L01-4', 'Outstanding Amount shows 600', num(await summary(page, 'المبلغ المستحق')) === 600, await summary(page, 'المبلغ المستحق'));
  rec.check('L01-5', 'the Actions menu (UnReconcile) is shown when the invoice is Partially Paid', b.some((x) => /إجراءات/.test(x)), JSON.stringify(b.slice(0, 14)));
  rec.check('L01-6', 'Create > Payment is still offered while Outstanding is not 0', (await createItems(page)).some((x) => /دفعة/.test(x)), '');
  await pay(await api.get('Sales Invoice', si.name), 600);
  await openDoc(page, si.name);
  const s2 = await info(page); const b2 = await buttons(page); const c2 = await createItems(page);
  rec.note('L01-7', 'after full payment', `${await chip(page)} | ${JSON.stringify(Object.entries(s2).filter(([k]) => /حالة|مبلغ|المدفوع/.test(k)))} | create=${JSON.stringify(c2)}`);
  rec.check('L01-8', 'status is Fully Paid after the full payment', /مدفوعة|مسددة/.test(s2['حالة الفاتورة'] || '') && !/جزئي|غير/.test(s2['حالة الفاتورة'] || ''), s2['حالة الفاتورة']);
  rec.check('L01-9', 'Create > Payment disappears when Outstanding = 0', !c2.some((x) => /دفعة/.test(x)), JSON.stringify(c2));
  rec.check('L01-10', 'the Actions menu is still shown when Fully Paid', b2.some((x) => /إجراءات/.test(x)), JSON.stringify(b2.slice(0, 14)));
  rec.check('L01-11', 'an invoice with a payment cannot be cancelled until the payment is cancelled', await (async () => { try { await cancel('Sales Invoice', si.name); return false; } catch { return true; } })(), '');
});

test('L02 overdue status', async ({ page }) => {
  const cust = await newCustomer();
  let si: Doc | null = null; try { si = await mk(cust, { posting: daysAgo(40), due: daysAgo(10), rate: 300 }); } catch (e: any) { rec.note('L02-0', 'back-dated invoice could not be created', String(e.message).slice(0, 200)); }
  if (!si) return; rec.note('L02-1', 'overdue invoice', si.name);
  await openDoc(page, si.name); const s = await info(page);
  rec.check('L02-2', 'status is Overdue when the due date has passed and nothing is paid', /متأخر/.test(s['حالة الفاتورة'] || ''), s['حالة الفاتورة'] + ' | ' + await chip(page));
});

test('L03 credit note: partial then full return, statuses on both documents', async ({ page }) => {
  const cust = await newCustomer(); const si = await mk(cust, { qty: 2, rate: 500 }); rec.note('L03-0', 'invoice', si.name);
  const ret1 = await api.submit(await draftReturn(si, 1)); rec.note('L03-1', 'partial return', ret1.name);
  await openDoc(page, si.name); const s = await info(page);
  rec.note('L03-2', 'original after a partial return', JSON.stringify(Object.entries(s).filter(([k]) => /حالة|مبلغ|الدائن/.test(k))) + ' chip=' + await chip(page));
  rec.check('L03-3', 'Credit Status = Partially Credited on the original', /جزئي/.test(s['حالة الائتمان'] || ''), s['حالة الائتمان']);
  rec.check('L03-4', 'Credit Amount = 500 on the original', Math.abs(num(s['مبلغ الدائن'] || '')) === 500, s['مبلغ الدائن']);
  await openDoc(page, ret1.name); const r = await info(page); await tab(page, 'التفاصيل'); const rs = await snapshot(page);
  rec.note('L03-5', 'the return document', `${await chip(page)} | ${JSON.stringify(Object.entries(rs).filter(([k]) => /مرتجع|مقابل/.test(k)))}`);
  rec.check('L03-6', 'the return shows status Return and Is Return checked', /مرتجع|إشعار دائن/.test(r['حالة الفاتورة'] || await chip(page)) && rs['مرتجع (إشعار دائن)'] === 'on', r['حالة الفاتورة'] + ' | ' + rs['مرتجع (إشعار دائن)']);
  rec.check('L03-7', 'the return shows the original invoice it was made against', (await main(page).innerText()).includes(si.name), si.name);
  const ret2 = await api.submit(await draftReturn(await api.get('Sales Invoice', si.name), 1)); rec.note('L03-8', 'second return', ret2.name);
  await openDoc(page, si.name); const s3 = await info(page);
  rec.note('L03-9', 'original after the full return', JSON.stringify(Object.entries(s3).filter(([k]) => /حالة|مبلغ|الدائن/.test(k))) + ' chip=' + await chip(page));
  rec.check('L03-10', 'Credit Status = Fully Credited after the total is returned', /كامل|بالكامل/.test(s3['حالة الائتمان'] || ''), s3['حالة الائتمان']);
  rec.note('L03-11', 'Invoice Status after the total is returned (the return keeps its own outstanding because Update Outstanding for Self is on by default, so the original stays Unpaid)', s3['حالة الفاتورة']);
});

test('L04 refund of a paid invoice return', async ({ page }) => {
  const cust = await newCustomer(); const si = await mk(cust, { qty: 1, rate: 800 }); await pay(si);
  const ret = await api.submit(await draftReturn(await api.get('Sales Invoice', si.name), 1)); rec.note('L04-0', 'paid invoice and its return', si.name + ' / ' + ret.name);
  await openDoc(page, si.name); let s = await info(page);
  rec.note('L04-1', 'before refund', JSON.stringify(Object.entries(s).filter(([k]) => /حالة|مبلغ|الدائن/.test(k))));
  rec.check('L04-2', 'Refund Status shows No Refund before the refund payment', /بدون استرداد/.test(s['حالة الاسترداد'] || ''), s['حالة الاسترداد']);
  let refund = false;
  try {
    const pe = await api.call('erpnext.accounts.doctype.payment_entry.payment_entry.get_payment_entry', { dt: 'Sales Invoice', dn: ret.name });
    pe.mode_of_payment = (await api.list('Mode of Payment', [['enabled', '=', 1]], ['name'], 1))[0].name; pe.reference_no = 'PW-REF'; pe.reference_date = today;
    await api.insertAndSubmit('Payment Entry', pe); refund = true;
  } catch (e: any) { rec.note('L04-3', 'refund payment could not be created', String(e.message).slice(0, 220)); }
  if (!refund) return;
  await openDoc(page, ret.name); s = await info(page);
  rec.note('L04-4', 'the return document after the refund payment', JSON.stringify(Object.entries(s).filter(([k]) => /حالة|مبلغ|الدائن/.test(k))));
  rec.check('L04-5', 'the return shows Refund Status = Fully Refunded and Refund Amount = 800', /مسترد|استرداد كامل|بالكامل/.test(s['حالة الاسترداد'] || '') && Math.abs(num(s['مبلغ الاسترداد'] || '')) === 800, s['حالة الاسترداد'] + ' | ' + s['مبلغ الاسترداد']);
});

test('L05 advance payment: Get Advance Received, allocation and UnReconcile', async ({ page }) => {
  const cust = await newCustomer(); const adv = await advance(cust, 300); rec.note('L05-0', 'advance payment entry', adv.name);
  const si = await mk(cust, { rate: 1000, submit: false }); rec.note('L05-1', 'draft invoice', si.name);
  await openDoc(page, si.name); await tab(page, 'المعلومات العامة');
  await toggle(page, 'تضمين الدفعات المخصصة مقابل أمر البيع المرجعي فقط'); // default is on: only advances allocated to the reference Sales Order are fetched
  const adTable = main(page).locator('table').filter({ hasText: /الدفعة المقدمة|المبلغ المخصص|اسم المرجع/ }).first();
  const before = await adTable.locator('tbody tr').count().catch(() => 0);
  await press(main(page).getByRole('button', { name: 'جلب الدفعات المقدمة المستلمة', exact: true }).first()); await wait(page, 5000);
  rec.note('L05-2', 'messages after Get Advance Received', JSON.stringify(await messages(page)));
  const rowsN = await adTable.locator('tbody tr').count().catch(() => 0);
  rec.check('L05-3', 'Get Advance Received adds the customer advance to the Advances table', rowsN > before, `${before} -> ${rowsN} ${JSON.stringify(await messages(page))}`, 'SI-46'); await closeModal(page); await closeModal(page);
  rec.note('L05-4', 'advances table', ((await adTable.innerText().catch(() => '')) || '').replace(/\s+/g, ' ').slice(0, 300));
  await tab(page, 'التفاصيل');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await wait(page, 9000);
  rec.note('L05-5', 'save with the allocated advance', JSON.stringify(await messages(page)) + ' ' + page.url()); await closeModal(page);
  await press(main(page).getByRole('button', { name: 'اعتماد', exact: true })).catch(() => {}); await wait(page, 4000);
  const ok = page.locator('.modal.show .btn-modal-primary, .base-modal:visible button').filter({ hasText: /إرسال|نعم|تأكيد/ }).first(); if (await ok.count()) { await press(ok); await wait(page, 7000); }
  await openDoc(page, si.name); const s = await info(page); await tab(page, 'التفاصيل');
  rec.note('L05-6', 'after submit: status / outstanding / advance total', `${s['حالة الفاتورة']} | ${await summary(page, 'المبلغ المستحق')} | ${await summary(page, 'إجمالي الدفعات المقدمة')}`);
  rec.check('L05-7', 'the allocated advance reduces the Outstanding Amount (1000 - 300 = 700)', num(await summary(page, 'المبلغ المستحق')) === 700, await summary(page, 'المبلغ المستحق'));
  rec.check('L05-8', 'status is Partially Paid after an advance is applied', /جزئي/.test(s['حالة الفاتورة'] || ''), s['حالة الفاتورة']);
  const b = await buttons(page); rec.check('L05-9', 'the Actions menu is shown', b.some((x) => /إجراءات/.test(x)), JSON.stringify(b.slice(0, 14)));
  const act = main(page).getByRole('button', { name: /إجراءات/ }).first();
  if (await act.count()) {
    await press(act); await wait(page, 1200);
    const items = ((await page.locator('.cd-action-menu.open').first().innerText().catch(() => '')) || '').split('\n').map((x) => x.trim()).filter(Boolean); rec.note('L05-10', 'Actions menu items', JSON.stringify(items));
    const un = page.locator('.cd-action-menu.open *').filter({ hasText: /^\s*إلغاء المصالحة|فك الربط|إلغاء التسوية/ }).first();
    if (await un.count()) {
      await press(un); await wait(page, 3500);
      const pop = page.locator('.base-modal:visible, [class*=overlay]:visible').filter({ hasText: /المخصصات|رقم السند/ }).first();
      rec.note('L05-11', 'UnReconcile popup', ((await pop.innerText().catch(() => '')) || '').replace(/\s+/g, ' ').slice(0, 400));
      await press(pop.locator('table tbody tr input[type=checkbox]').first()).catch(() => {});
      await press(pop.getByRole('button', { name: /إلغاء المصالحة|فك الربط|إلغاء التسوية/ }).last()).catch(() => {}); await wait(page, 7000);
      await openDoc(page, si.name); const s2 = await info(page); await tab(page, 'التفاصيل');
      rec.note('L05-12', 'after UnReconcile', `${s2['حالة الفاتورة']} | ${await summary(page, 'المبلغ المستحق')}`);
      rec.check('L05-13', 'UnReconcile releases the advance and restores the Outstanding Amount (1000)', num(await summary(page, 'المبلغ المستحق')) === 1000, await summary(page, 'المبلغ المستحق'));
    } else rec.check('L05-14', 'the Actions menu offers UnReconcile', false, JSON.stringify(items));
  }
});
