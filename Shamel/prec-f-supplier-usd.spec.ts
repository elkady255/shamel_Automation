// Payment Reconciliation - supplier flow and foreign-currency difference (SRS p.312-324). CHANGES DATA: run once.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/prec-ui';
import * as d from './helpers/prec-data';
import { api } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('prec-f-supplier-usd');
test.use({ viewport: { width: 1400, height: 1400 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(280_000);

const SUPP = 'QA-PR Supp Main', PI1 = 'ACC-PINV-2026-00005', PI2 = 'ACC-PINV-2026-00006', PIR = 'ACC-PINV-2026-00007';
const PS1 = 'ACC-PAY-2026-03074', PS2 = 'ACC-PAY-2026-03075', JVS = 'ACC-JV-2026-01714';
const USD = 'QA-PR Cust USD', SIU = 'ACC-SINV-2026-02911', PEU = 'ACC-PAY-2026-03076';
const reconcileBtn = (p: Page) => u.main(p).getByRole('button', { name: 'تسوية', exact: true });
const newJes = async (since: string) => api.list('Journal Entry', [['company', '=', d.CO], ['creation', '>', since]], ['name', 'voucher_type', 'posting_date', 'docstatus', 'total_debit'], 50);
const stamp = async () => (await api.list('Journal Entry', [['company', '=', d.CO]], ['creation'], 500)).map((x) => x.creation as string).sort().at(-1)!;

async function go(page: Page, party: string, type: 'العميل' | 'المورد', account: string, invoices: string[], payments: string[]) {
  await u.open(page); await u.setParty(page, party, type);
  await u.pick(page, 'حساب المدينين / الدائنين', account);
  const entries = await u.getEntries(page);
  await u.select(page, 0, ...invoices); await u.select(page, 1, ...payments);
  return { entries, alloc: await u.allocate(page) };
}
async function reconcile(p: Page, tag: string) {
  let status = 0, body = '', sent = '';
  const h = async (r: import('@playwright/test').Response) => { if (/payment_reconcil\w*\.reconcile/.test(r.url())) { status = r.status(); sent = decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' ')); body = (await r.text().catch(() => '')).slice(0, 600); } };
  p.on('response', h);
  await p.evaluate(() => {
    const w = window as any; w.__qa = [] as string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs = new MutationObserver((muts) => { for (const m of muts) for (const n of [...m.addedNodes, m.target] as any[]) { const t = (n.innerText ?? n.textContent ?? '').replace(/\s+/g, ' ').trim(); if (t && t.length < 250 && /بنجاح|تمت|خطأ/.test(t) && !w.__qa.includes(t)) w.__qa.push(t); } }); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });
  await u.press(reconcileBtn(p)); await u.wait(p, 9000);
  const toasts: string[] = await p.evaluate(() => { const w = window as any; w.__qaObs?.disconnect(); return w.__qa ?? []; }); // eslint-disable-line @typescript-eslint/no-explicit-any
  const msg = `${toasts.join(' | ')} ${await u.modalText(p)}`.trim();
  await p.screenshot({ path: `Shamel/prec-results/${tag}.png`, fullPage: true });
  p.off('response', h);
  rec.note(`${tag}-answer`, 'reconcile answer', `status=${status} msg=${msg.slice(0, 300)} sent=${sent.slice(-900)} body=${body.slice(0, 250)}`);
  return { status, msg, sent };
}
const okMsg = (m: string) => /تمت التسوية بنجاح/.test(m);

test('F01 supplier: invoice with advance payment', async ({ page }) => {
  const since = await stamp();
  const { alloc } = await go(page, SUPP, 'المورد', 'QA-PR Payable', ['00005'], ['03074']);
  rec.check('F01-1', 'Supplier allocation: 600 of 1500, difference 900', alloc?.length === 1 && alloc[0].allocated_amount === 600 && alloc[0].invoice_outstanding - alloc[0].allocated_amount === 900, JSON.stringify(alloc));
  const r = await reconcile(page, 'F01');
  const i = await api.get('Purchase Invoice', PI1); const p = await api.get('Payment Entry', PS1);
  rec.check('F01-2', 'Success message for a supplier reconciliation', okMsg(r.msg), r.msg);
  rec.check('F01-3', 'Purchase invoice outstanding = 900', i.outstanding_amount === 900, `${i.outstanding_amount} ${i.status}`);
  rec.check('F01-4', 'Supplier payment fully used and references the invoice', p.unallocated_amount === 0 && (p.references ?? []).some((x: any) => x.reference_name === PI1 && x.allocated_amount === 600), `${p.unallocated_amount}`); // eslint-disable-line @typescript-eslint/no-explicit-any
  const j = await newJes(since); rec.check('F01-5', 'No new Journal Entry', j.length === 0, JSON.stringify(j));
});

test('F02 supplier: return invoice (debit note)', async ({ page }) => {
  const since = await stamp();
  const { alloc } = await go(page, SUPP, 'المورد', 'QA-PR Payable', ['00006'], ['00007']);
  rec.check('F02-1', 'Purchase return 100 allocates to the 800 invoice', alloc?.length === 1 && alloc[0].allocated_amount === 100, JSON.stringify(alloc));
  const r = await reconcile(page, 'F02');
  const i = await api.get('Purchase Invoice', PI2); const ret = await api.get('Purchase Invoice', PIR);
  rec.check('F02-2', 'Invoice reduced to 700, return fully used, success message', i.outstanding_amount === 700 && ret.outstanding_amount === 0 && okMsg(r.msg), `${i.outstanding_amount} ${ret.outstanding_amount} ${r.msg}`);
  rec.note('F02-3', 'journal entries created for the debit note', JSON.stringify(await newJes(since)));
});

test('F03 supplier: journal entry and payment against one invoice', async ({ page }) => {
  const { alloc } = await go(page, SUPP, 'المورد', 'QA-PR Payable', ['00005'], ['01714', '03075']);
  rec.note('F03-0', 'allocation', JSON.stringify(alloc));
  rec.check('F03-1', 'The two payments cover exactly the remaining 900', (alloc ?? []).reduce((s, x) => s + x.allocated_amount, 0) === 900, JSON.stringify(alloc?.map((x) => [x.reference_name, x.allocated_amount])));
  const r = await reconcile(page, 'F03');
  const i = await api.get('Purchase Invoice', PI1); const p = await api.get('Payment Entry', PS2); const j = await api.get('Journal Entry', JVS);
  const used = (alloc ?? []).find((x) => x.reference_name === PS2)?.allocated_amount ?? 0;
  rec.check('F03-2', 'Invoice 1500 is fully paid', i.outstanding_amount === 0 && i.status === 'Paid' && okMsg(r.msg), `${i.outstanding_amount} ${i.status} ${r.msg}`);
  rec.check('F03-3', 'Payment keeps the remainder and the journal entry references the invoice', p.unallocated_amount === 2000 - used && (j.accounts ?? []).some((x: any) => x.reference_name === PI1), `${p.unallocated_amount} used=${used}`); // eslint-disable-line @typescript-eslint/no-explicit-any
});

test('G01 foreign currency: entries, allocation, difference and reconcile', async ({ page }) => {
  const since = await stamp();
  const si0 = await api.get('Sales Invoice', SIU); const pe0 = await api.get('Payment Entry', PEU);
  const { entries, alloc } = await go(page, USD, 'العميل', 'usd debtors', ['02911'], ['03076']);
  rec.note('G01-0', 'entries and allocation', JSON.stringify({ entries, alloc }));
  rec.check('G01-1', 'USD invoice 300 and USD payment 100 are returned in account currency', entries?.invoices[0]?.outstanding_amount === 300 && entries?.payments[0]?.amount === 100 && entries?.invoices[0]?.currency === 'USD', JSON.stringify(entries));
  const screen = JSON.stringify(await u.readTables(page));
  rec.check('G01-2', 'The tables show which currency the amounts are in', /USD|دولار|\$/.test(screen), screen.slice(0, 500));
  const a = alloc?.[0];
  rec.check('G01-3', 'Allocated 100, difference 200 (outstanding - allocated)', a?.allocated_amount === 100 && (await u.allocRows(page))[0]?.[5]?.startsWith('200'), JSON.stringify(await u.allocRows(page)));
  rec.check('G01-4', 'A Difference Account is filled for the exchange difference', !!a?.difference_account, String(a?.difference_account));
  await u.press(u.tables(page).nth(2).locator('button[title="تعديل الصف"]').first()); await u.wait(page, 2500);
  const dlg = page.locator('.base-modal:visible').last();
  const text = (await dlg.innerText()).replace(/\s+/g, ' ');
  const values = await dlg.locator('input:visible').evaluateAll((els: any[]) => els.map((e) => e.value)); // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.note('G01-5', 'edit popup', `${text} || ${values.join(' | ')}`);
  rec.check('G01-6', 'Exchange Rate of the transaction is shown (payment 3.8 or invoice 3.7, not 1)', /3\.[78]/.test(text + values.join(' ')), `${text} ${values}`);
  rec.check('G01-7', 'The popup shows the exchange gain / loss of 10 SAR somewhere', /10\.00/.test(text.replace(/100\.00|200\.00|300\.00|\d{2,}-10-\d+/g, '')), text);
  await dlg.locator('label').filter({ hasText: 'تاريخ ترحيل الفرق' }).locator('xpath=ancestor::div[.//input][1]').locator('input:visible').first().click({ force: true }); await u.wait(page, 800);
  await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: /^24$/ }).first().click(); await u.wait(page, 800);
  await u.press(dlg.getByRole('button', { name: /^(تعديل|تحديث|حفظ)$/ })); await u.wait(page, 2000);
  const r = await reconcile(page, 'G01');
  const si = await api.get('Sales Invoice', SIU); const pe = await api.get('Payment Entry', PEU);
  rec.check('G01-8', 'The chosen Difference Posting Date (24-11) is sent', /"(gain_loss_posting_date|difference_posting_date)":"2026-11-24"/.test(r.sent), r.sent.slice(-600));
  rec.check('G01-9', 'Reconcile succeeds with the success message', r.status === 200 && okMsg(r.msg), `${r.status} ${r.msg}`);
  rec.check('G01-10', 'USD invoice outstanding = 200 and payment fully used', si.outstanding_amount === 200 && pe.unallocated_amount === 0, `before=${si0.outstanding_amount}/${pe0.unallocated_amount} after=${si.outstanding_amount}/${pe.unallocated_amount}`);
  const jes = await newJes(since);
  const gl = [] as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  for (const j of jes) { const doc = await api.get('Journal Entry', j.name); gl.push({ name: j.name, type: doc.voucher_type, date: doc.posting_date, rows: doc.accounts.map((x: any) => [x.account, x.debit, x.credit, x.reference_name]) }); } // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.note('G01-11', 'journal entries created by the reconciliation', JSON.stringify(gl));
  const diff = gl.find((j) => JSON.stringify(j.rows).includes(a?.difference_account ?? '###'));
  rec.check('G01-12', 'The exchange difference of 10 SAR is posted to the Difference Account', !!diff && diff.rows.some((x: any) => x[0] === a?.difference_account && Math.abs((x[1] || x[2]) - 10) < 0.01), JSON.stringify(gl)); // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.check('G01-13', 'It is posted on the chosen Difference Posting Date', !!diff && diff.date === '2026-11-24', `${diff?.date}`);
});
