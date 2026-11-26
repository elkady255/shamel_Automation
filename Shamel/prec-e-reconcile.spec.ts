// Payment Reconciliation - Reconcile on own QA-PR documents (SRS p.323-324). CHANGES DATA: run once, after A-D.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/prec-ui';
import * as d from './helpers/prec-data';
import { api } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('prec-e-reconcile');
test.use({ viewport: { width: 1400, height: 1400 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(280_000);

const CUST = 'QA-PR Cust Main';
const SI1 = 'ACC-SINV-2026-02907', SI2 = 'ACC-SINV-2026-02908', SI3 = 'ACC-SINV-2026-02909', RET = 'ACC-SINV-2026-02910';
const PE1 = 'ACC-PAY-2026-03072', PE2 = 'ACC-PAY-2026-03073', JV = 'ACC-JV-2026-01713';
const reconcileBtn = (p: Page) => u.main(p).getByRole('button', { name: 'تسوية', exact: true });
const si = (n: string) => api.get('Sales Invoice', n);
const pe = (n: string) => api.get('Payment Entry', n);
const jeCount = async () => (await api.list('Journal Entry', [['company', '=', d.CO], ['creation', '>', `${d.today()} 00:00:00`]], ['name', 'voucher_type'], 200));
const invRow = async (p: Page, key: string) => ((await u.readTables(p))[0]?.rows.map((r) => r.cells.join(' ')).find((x) => x.includes(key)) ?? '');
const payRow = async (p: Page, key: string) => ((await u.readTables(p))[1]?.rows.map((r) => r.cells.join(' ')).find((x) => x.includes(key)) ?? '');

async function alloc(page: Page, invoices: string[], payments: string[]) {
  await u.open(page); await u.setParty(page, CUST); await u.getEntries(page);
  await u.select(page, 0, ...invoices); await u.select(page, 1, ...payments);
  return u.allocate(page);
}
async function setAmount(p: Page, v: string, i = 0) {
  const f = u.tables(p).nth(2).locator('tbody tr').nth(i).locator('input.prc-amount').first();
  await f.click(); await f.press('Control+a'); if (v) await f.pressSequentially(v); else await f.press('Delete'); await f.press('Tab'); await u.wait(p, 1500); await u.closeModals(p);
  return f.inputValue();
}
/** Presses Reconcile (confirming if asked) and reports what the server and the screen answered. */
async function reconcile(p: Page, tag: string) {
  let status = 0, body = '', url = '';
  const h = async (r: import('@playwright/test').Response) => { if (/payment_reconcil\w*\.reconcile/.test(r.url())) { status = r.status(); url = r.url(); body = (await r.text().catch(() => '')).slice(0, 900); } };
  p.on('response', h);
  // record every short-lived message (toast) that appears after the click
  await p.evaluate(() => {
    const w = window as any; w.__qa = [] as string[];
    w.__qaObs = new MutationObserver((muts) => { for (const m of muts) for (const n of [...m.addedNodes, m.target] as any[]) { const t = (n.innerText ?? n.textContent ?? '').replace(/\s+/g, ' ').trim(); if (t && t.length < 250 && /بنجاح|تمت|success|reconcil|خطأ/i.test(t) && !w.__qa.includes(t)) w.__qa.push(t); } });
    w.__qaObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });
  await u.press(reconcileBtn(p)); await u.wait(p, 2500);
  const confirm = p.locator('.base-modal:visible button, .modal.show button').filter({ hasText: /^\s*(نعم|تأكيد|تسوية|متابعة)\s*$/ });
  if (!status && (await confirm.count())) { rec.note(`${tag}-confirm`, 'confirmation dialog', await u.modalText(p)); await u.press(confirm.last()); }
  await u.wait(p, 7000);
  const toasts: string[] = await p.evaluate(() => { const w = window as any; w.__qaObs?.disconnect(); return w.__qa ?? []; });
  const msg = `${toasts.join(' | ')} ${await u.modalText(p)} ${(await u.messages(p)).join(' ')}`.trim();
  await p.screenshot({ path: `Shamel/prec-results/${tag}.png`, fullPage: true });
  p.off('response', h);
  rec.note(`${tag}-answer`, 'reconcile answer', `status=${status} url=${url.split('/api/method/')[1]?.split('?')[0]} msg=${msg.slice(0, 300)} body=${body}`);
  return { status, body, msg };
}

test('E01 invalid allocation cannot be reconciled', async ({ page }) => {
  const before = [(await si(SI1)).outstanding_amount, (await pe(PE1)).unallocated_amount];
  for (const [id, v, text] of [['E01-1', '900', 'more than the payment (900 > 700)'], ['E01-2', '', 'an empty amount']] as const) {
    await alloc(page, ['02907'], ['03072']); const shown = await setAmount(page, v);
    const r = await reconcile(page, id);
    const after = [(await si(SI1)).outstanding_amount, (await pe(PE1)).unallocated_amount];
    rec.check(id, `Reconcile with ${text} is refused with a message and changes nothing`, JSON.stringify(after) === JSON.stringify(before) && r.msg !== '', `field="${shown}" before=${before} after=${after} status=${r.status} msg=${r.msg.slice(0, 200)}`);
    await u.closeModals(page);
    if (JSON.stringify(after) !== JSON.stringify(before)) throw new Error('data changed by an invalid reconcile - stop');
  }
});

test('E02 partial reconcile of one invoice and one payment', async ({ page }) => {
  const jes = (await jeCount()).length;
  await alloc(page, ['02907'], ['03072']); await setAmount(page, '600');
  const r = await reconcile(page, 'E02');
  const inv = await si(SI1); const p = await pe(PE1);
  rec.check('E02-1', 'A success confirmation message is displayed', /نجاح|تمت|بنجاح|تسوية/.test(r.msg) && !/خطأ/.test(r.msg), r.msg);
  await u.closeModals(page); await u.wait(page, 2000);
  rec.check('E02-2', 'Invoice outstanding is reduced from 1000 to 400', inv.outstanding_amount === 400, `${inv.outstanding_amount} status=${inv.status}`);
  rec.check('E02-3', 'Invoice status becomes Partly Paid (Overdue when the due date has passed)', /Partly Paid|Overdue/.test(inv.status), inv.status);
  rec.check('E02-4', 'Payment unallocated amount is reduced from 700 to 100', p.unallocated_amount === 100, String(p.unallocated_amount));
  const ref = (p.references ?? []).find((x: any) => x.reference_name === SI1); // eslint-disable-line @typescript-eslint/no-explicit-any
  rec.check('E02-5', 'Payment Entry references the invoice with allocated 600', ref?.allocated_amount === 600, JSON.stringify(p.references));
  const after = await jeCount();
  rec.check('E02-6', 'No new Journal Entry is created for a payment-entry reconciliation', after.length === jes, JSON.stringify(after));
  rec.check('E02-7', 'The Reconcile button disappears after success', (await reconcileBtn(page).count()) === 0);
  rec.check('E02-8', 'The screen refreshes: invoice shows 400 and the payment shows 100', (await u.tables(page).count()) >= 2 && /400\.00/.test(await invRow(page, SI1)) && /100\.00/.test(await payRow(page, PE1)), `tables=${await u.tables(page).count()} ${await invRow(page, SI1)} | ${await payRow(page, PE1)}`);
  const ple = await api.list('Payment Ledger Entry', [['against_voucher_no', '=', SI1], ['voucher_no', '=', PE1], ['delinked', '=', 0]], ['amount']);
  rec.check('E02-9', 'Payment Ledger has the -600 allocation against the invoice', ple.some((x) => x.amount === -600), JSON.stringify(ple));
  const entries = await u.getEntries(page);
  rec.check('E02-10', 'Get Unreconciled Entries returns the new balances', entries?.invoices.find((x) => x.invoice_number === SI1)?.outstanding_amount === 400 && entries?.payments.find((x) => x.reference_name === PE1)?.amount === 100, JSON.stringify(entries).slice(0, 400));
});

test('E03 one invoice with two payments', async ({ page }) => {
  await alloc(page, ['02908'], ['03072', '03073']);
  rec.note('E03-0', 'allocation rows', JSON.stringify(await u.allocRows(page)));
  const r = await reconcile(page, 'E03');
  const inv = await si(SI2); const a = await pe(PE1); const b = await pe(PE2);
  rec.check('E03-0b', 'A success confirmation message is displayed', /بنجاح|تمت/.test(r.msg) && !/خطأ/.test(r.msg), r.msg);
  rec.check('E03-1', 'Invoice 2000 becomes fully Paid', inv.outstanding_amount === 0 && inv.status === 'Paid', `${inv.outstanding_amount} ${inv.status} msg=${r.msg}`);
  rec.check('E03-2', 'First payment fully used (0) and second keeps 1100', a.unallocated_amount === 0 && b.unallocated_amount === 1100, `${a.unallocated_amount} ${b.unallocated_amount}`);
  rec.check('E03-3', 'The first payment keeps its earlier reference too', (a.references ?? []).length >= 2, JSON.stringify((a.references ?? []).map((x: any) => [x.reference_name, x.allocated_amount]))); // eslint-disable-line @typescript-eslint/no-explicit-any
  await u.closeModals(page); const e = await u.getEntries(page);
  rec.check('E03-4', 'Paid invoice and used payment are no longer listed', !e?.invoices.some((x) => x.invoice_number === SI2) && !e?.payments.some((x) => x.reference_name === PE1), JSON.stringify(e).slice(0, 400));
});

test('E04 journal entry against an invoice', async ({ page }) => {
  await alloc(page, ['02907'], ['01713']);
  const r = await reconcile(page, 'E04');
  const inv = await si(SI1); const j = await api.get('Journal Entry', JV);
  rec.check('E04-1', 'Invoice 02907 is fully paid by the journal entry', inv.outstanding_amount === 0, `${inv.outstanding_amount} ${inv.status} msg=${r.msg}`);
  rec.check('E04-2', 'The journal entry row now references the invoice', (j.accounts ?? []).some((x: any) => x.reference_name === SI1), JSON.stringify((j.accounts ?? []).map((x: any) => [x.account, x.reference_name, x.credit]))); // eslint-disable-line @typescript-eslint/no-explicit-any
});

test('E05 return invoice against an invoice', async ({ page }) => {
  const before = await jeCount();
  await alloc(page, ['02909'], ['02910']);
  const r = await reconcile(page, 'E05');
  const inv = await si(SI3); const ret = await si(RET); const after = await jeCount();
  rec.check('E05-1', 'Invoice 500 is reduced to 300 by the 200 return', inv.outstanding_amount === 300, `${inv.outstanding_amount} ${inv.status} msg=${r.msg}`);
  rec.check('E05-2', 'The return has nothing left to allocate', ret.outstanding_amount === 0, `${ret.outstanding_amount} ${ret.status}`);
  rec.note('E05-3', 'journal entries created by the return reconciliation', JSON.stringify(after.filter((x) => !before.some((y) => y.name === x.name))));
  await u.closeModals(page); const e = await u.getEntries(page);
  rec.check('E05-4', 'Remaining entries: invoice 02909 (300) and payment 03073 (1100) only', JSON.stringify(e?.invoices.map((x) => [x.invoice_number, x.outstanding_amount])) === JSON.stringify([[SI3, 300]]) && JSON.stringify(e?.payments.map((x) => [x.reference_name, x.amount])) === JSON.stringify([[PE2, 1100]]), JSON.stringify(e));
});
