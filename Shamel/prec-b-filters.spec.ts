// Payment Reconciliation - filters (SRS p.313-314). Expected rows are computed from the unfiltered result. Read-only.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/prec-ui';
import { recorder } from './helpers/si-ui';

const rec = recorder('prec-b-filters');
test.use({ viewport: { width: 1400, height: 1400 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(280_000);

type Entries = { invoices: any[]; payments: any[] }; // eslint-disable-line @typescript-eslint/no-explicit-any
const inv = (e?: Entries) => (e?.invoices ?? []).map((x) => x.invoice_number as string).sort();
const pay = (e?: Entries) => (e?.payments ?? []).map((x) => x.reference_name as string).sort();
const same = (a: string[], b: string[]) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

async function start(page: Page) {
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main');
  const base = (await u.getEntries(page))!;
  return base;
}
async function type(page: Page, label: string, v: string) {
  const f = u.input(page, label); await f.fill(v); await f.press('Tab'); await u.wait(page, 500); return f.inputValue();
}
/** Chooses an ISO date in the calendar of a filter. */
async function date(page: Page, label: string, iso: string) {
  const f = u.label(page, label).locator('xpath=ancestor::div[.//input][1]').locator('input:visible').first(); await f.click({ force: true }); await u.wait(page, 800);
  const day = String(Number(iso.slice(8)));
  await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: new RegExp('^' + day + '$') }).first().click();
  await u.wait(page, 700); return f.inputValue();
}
/** Get Unreconciled Entries and report: server answer, sent payload and the rows on screen. */
async function run(page: Page) {
  const req = page.waitForRequest((r) => r.url().includes('get_unreconciled_entries'), { timeout: 20_000 }).catch(() => null);
  const res = page.waitForResponse((r) => r.url().includes('get_unreconciled_entries'), { timeout: 40_000 }).catch(() => null);
  await u.press(u.main(page).getByRole('button', { name: u.BTN_GET }));
  const q = await req; if (!q) { await u.wait(page, 2000); return { sent: '', data: undefined as Entries | undefined, status: 0, screen: [] as string[] }; }
  const r = await res; const body = r ? await r.json().catch(() => ({})) : {}; await u.wait(page, 3000);
  const screen = (await u.tables(page).count()) ? (await u.readTables(page)).slice(0, 2).map((t) => t.rows.map((x) => x.cells.join(' ')).join(' ; ')) : [];
  return { sent: decodeURIComponent((q.postData() ?? '').replace(/\+/g, ' ')), data: body?.message?.data as Entries | undefined, status: r?.status() ?? 0, screen };
}
const info = (x: Awaited<ReturnType<typeof run>>) => `inv=[${inv(x.data).map((s) => s.slice(-5))}] pay=[${pay(x.data).map((s) => s.slice(-5))}] status=${x.status} sent=${x.sent.replace(/.*receivable_payable_account[^,]*,/, '')}`;

test('B01 invoice date range', async ({ page }) => {
  const base = await start(page); rec.note('B01-0', 'unfiltered', JSON.stringify(base));
  const dates = base.invoices.map((x) => x.invoice_date as string).sort();
  const mid = dates[1];
  await date(page, 'من تاريخ الفاتورة', mid); let x = await run(page);
  rec.check('B01-1', `From Invoice Date ${mid} keeps invoices dated on or after it`, same(inv(x.data), inv({ invoices: base.invoices.filter((i) => i.invoice_date >= mid), payments: [] })), info(x));
  rec.check('B01-2', 'From Invoice Date does not filter the payments', same(pay(x.data), pay(base)), info(x));
  await date(page, 'إلى تاريخ الفاتورة', mid); x = await run(page);
  rec.check('B01-3', `From = To = ${mid} returns exactly that invoice (inclusive)`, same(inv(x.data), base.invoices.filter((i) => i.invoice_date === mid).map((i) => i.invoice_number)), info(x));
  rec.check('B01-4', 'The table on screen shows the same invoices as the server answer', x.screen.length > 0 && inv(x.data).every((n) => x.screen[0].includes(n)) && x.screen[0].split(' ; ').length === inv(x.data).length, x.screen[0]);
});

test('B02 invoice From later than To', async ({ page }) => {
  const base = await start(page); const dates = base.invoices.map((x) => x.invoice_date as string).sort();
  await date(page, 'من تاريخ الفاتورة', dates[2]); const to = await date(page, 'إلى تاريخ الفاتورة', dates[0]); const x = await run(page);
  const msg = `${await u.modalText(page)} ${(await u.messages(page)).join(' ')}`;
  rec.note('B02-0', 'from > to', `to field="${to}" ${info(x)} msg=${msg}`);
  rec.check('B02-1', 'From later than To is prevented or answered with a clear message (not silently wrong rows)', to === '' || /تاريخ/.test(msg) || inv(x.data).length === 0, `${info(x)} msg=${msg}`);
});

test('B03 payment date range', async ({ page }) => {
  const base = await start(page);
  const dates = base.payments.map((x) => x.posting_date as string).sort(); const a = dates[1]; const b = dates[2];
  await date(page, 'من تاريخ الدفع', a); let x = await run(page);
  rec.check('B03-1', `From Payment Date ${a} keeps payments on or after it`, same(pay(x.data), base.payments.filter((p) => p.posting_date >= a).map((p) => p.reference_name)), info(x));
  rec.check('B03-2', 'Payment dates do not filter the invoices', same(inv(x.data), inv(base)), info(x));
  await date(page, 'إلى تاريخ الدفع', b); x = await run(page);
  rec.check('B03-3', `Payment range ${a}..${b} (inclusive)`, same(pay(x.data), base.payments.filter((p) => p.posting_date >= a && p.posting_date <= b).map((p) => p.reference_name)), info(x));
});

test('B04 invoice amount range', async ({ page }) => {
  const base = await start(page);
  await type(page, 'الحد الأدنى لمبلغ الفاتورة', '600'); let x = await run(page);
  rec.check('B04-1', 'Minimum Invoice Amount 600', same(inv(x.data), base.invoices.filter((i) => i.outstanding_amount >= 600).map((i) => i.invoice_number)), info(x));
  await type(page, 'الحد الأقصى لمبلغ الفاتورة', '1500'); x = await run(page);
  rec.check('B04-2', 'Invoice amount 600..1500', same(inv(x.data), base.invoices.filter((i) => i.outstanding_amount >= 600 && i.outstanding_amount <= 1500).map((i) => i.invoice_number)), info(x));
  await type(page, 'الحد الأدنى لمبلغ الفاتورة', '500'); await type(page, 'الحد الأقصى لمبلغ الفاتورة', '500'); x = await run(page);
  rec.check('B04-3', 'Min = Max = 500 returns the 500 invoice (inclusive)', same(inv(x.data), base.invoices.filter((i) => i.outstanding_amount === 500).map((i) => i.invoice_number)), info(x));
  await type(page, 'الحد الأدنى لمبلغ الفاتورة', '99999'); await type(page, 'الحد الأقصى لمبلغ الفاتورة', ''); x = await run(page);
  rec.check('B04-4', 'A range with no match gives no invoices without an error', inv(x.data).length === 0 && x.status === 200, `${info(x)} ${await u.modalText(page)}`);
  await u.closeModals(page);
  await type(page, 'الحد الأدنى لمبلغ الفاتورة', '1500'); await type(page, 'الحد الأقصى لمبلغ الفاتورة', '600'); x = await run(page);
  const msg = `${await u.modalText(page)} ${(await u.messages(page)).join(' ')}`;
  rec.check('B04-5', 'Min greater than Max is rejected with a message or returns nothing', x.sent === '' || inv(x.data).length === 0 || /الحد|مبلغ/.test(msg), `${info(x)} msg=${msg}`);
});

test('B05 payment amount range', async ({ page }) => {
  const base = await start(page);
  await type(page, 'الحد الأدنى لمبلغ الدفعة', '300'); let x = await run(page);
  rec.check('B05-1', 'Minimum Payment Amount 300', same(pay(x.data), base.payments.filter((p) => p.amount >= 300).map((p) => p.reference_name)), info(x));
  await type(page, 'الحد الأقصى لمبلغ الدفعة', '800'); x = await run(page);
  rec.check('B05-2', 'Payment amount 300..800', same(pay(x.data), base.payments.filter((p) => p.amount >= 300 && p.amount <= 800).map((p) => p.reference_name)), info(x));
  rec.check('B05-3', 'Payment amounts do not filter the invoices', same(inv(x.data), inv(base)), info(x));
});

test('B06 limits', async ({ page }) => {
  const base = await start(page);
  rec.check('B06-0', 'Default limits are 50', (await u.input(page, 'حد الفواتير').inputValue()) === '50' && (await u.input(page, 'حد الدفعات').inputValue()) === '50');
  await type(page, 'حد الفواتير', '1'); let x = await run(page);
  rec.check('B06-1', 'Invoice Limit 1 returns one invoice', inv(x.data).length === 1, info(x));
  await type(page, 'حد الفواتير', '2'); await type(page, 'حد الدفعات', '1'); x = await run(page);
  rec.check('B06-2', 'Invoice Limit 2 and Payment Limit 1 are applied', inv(x.data).length === 2 && pay(x.data).length === 1, info(x));
  rec.note('B06-3', 'rows kept with payment limit 1 (the answer may be one per document type)', pay(x.data).join(', '));
  await type(page, 'حد الفواتير', '0'); await type(page, 'حد الدفعات', '0'); x = await run(page);
  rec.note('B06-4', 'limit 0', `${info(x)} msg=${await u.modalText(page)}`); await u.closeModals(page);
  await type(page, 'حد الفواتير', ''); await type(page, 'حد الدفعات', ''); x = await run(page);
  rec.check('B06-5', 'Empty limits return all entries', same(inv(x.data), inv(base)) && same(pay(x.data), pay(base)), info(x));
});

test('B07 invalid input in numeric filters', async ({ page }) => {
  await start(page);
  const fields = ['حد الفواتير', 'حد الدفعات', 'الحد الأدنى لمبلغ الفاتورة', 'الحد الأقصى لمبلغ الفاتورة', 'الحد الأدنى لمبلغ الدفعة', 'الحد الأقصى لمبلغ الدفعة'];
  let n = 0;
  for (const f of fields) {
    const i = u.input(page, f);
    await i.fill(''); await i.pressSequentially('abc@#'); await i.press('Tab'); const letters = await i.inputValue();
    await i.fill(''); await i.pressSequentially('-5'); await i.press('Tab'); const neg = await i.inputValue();
    await i.fill(''); await i.pressSequentially('2.5'); await i.press('Tab'); const dec = await i.inputValue();
    await i.fill(''); await i.pressSequentially('9'.repeat(30)); await i.press('Tab'); const long = await i.inputValue();
    await i.fill(/حد (الفواتير|الدفعات)/.test(f) ? '50' : ''); await i.press('Tab');
    n++;
    rec.check(`B07-${n}a`, `${f}: letters and symbols are rejected`, !/[a-z@#]/i.test(letters), `"${letters}"`);
    rec.check(`B07-${n}b`, `${f}: a negative value is not accepted`, !neg.startsWith('-'), `"${neg}"`);
    if (/^حد /.test(f)) rec.check(`B07-${n}c`, `${f}: a limit accepts whole numbers only`, !dec.includes('.'), `"${dec}"`);
    rec.note(`B07-${n}d`, `${f}: 30 digits / decimal`, `long="${long}" decimal="${dec}"`);
  }
  const i = u.input(page, 'حد الفواتير'); await i.fill(''); await i.pressSequentially('9'.repeat(30)); await i.press('Tab'); const x = await run(page);
  rec.check('B07-7', 'A very large limit does not cause a server error', x.status < 500, `${x.status} ${await u.modalText(page)}`);
});

test('B08 bank account, cost center and project', async ({ page }) => {
  const base = await start(page);
  await u.pick(page, 'مركز التكلفة', '101 - Main X'); let x = await run(page);
  const withCc = base.payments.filter((p) => p.cost_center === '101 - Main X - E').map((p) => p.reference_name);
  rec.note('B08-0', 'payments that report cost center 101 in the unfiltered list', withCc.join(', '));
  rec.check('B08-1', 'Cost Center filter is sent to the server', /"cost_center":"101 - Main X - E"/.test(x.sent), x.sent);
  rec.note('B08-2', 'result with cost center 101', info(x));
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main'); await u.getEntries(page);
  await u.pick(page, 'حساب البنك / النقدية', '122101'); x = await run(page);
  rec.check('B08-3', 'Bank / Cash Account filter is sent to the server', /122101/.test(x.sent), x.sent);
  rec.check('B08-4', 'Bank filter keeps payment entries that used this bank', ['ACC-PAY-2026-03072', 'ACC-PAY-2026-03073'].every((n) => pay(x.data).includes(n)), info(x));
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main'); await u.getEntries(page);
  await u.pick(page, 'حساب البنك / النقدية', '122102'); x = await run(page);
  rec.check('B08-5', 'A bank with no payments of this party returns no payment entries', !pay(x.data).some((n) => n.startsWith('ACC-PAY')), info(x));
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main'); await u.getEntries(page);
  const opts = await u.options(page, 'المشروع');
  if (opts.some((o) => o.includes('PROJ-0001'))) { await u.pick(page, 'المشروع', 'PROJ-0001'); x = await run(page); rec.check('B08-6', 'Project filter with an unused project returns no payments', pay(x.data).length === 0, info(x)); }
});
