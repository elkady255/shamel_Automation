// Journal Entry - adding from the screen (save and submit), then checking the stored data. CHANGES DATA (small QA amounts).
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api, type Doc } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('je-add');
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(400_000);

const NEW = '/desk/shamel#/accounting/journal-entries/new';
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const CASH = '122102', BANK = '122101';
const popups = async (p: Page) => (await p.locator('.modal.show, .base-modal:visible, .qr-dialog:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim()).join(' || ');
const je = (n: string) => api.get('Journal Entry', n);
const gl = async (n: string) => api.list('GL Entry', [['voucher_no', '=', n], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit', 'party'], 20);

type Row = { account: string; partyType?: string; party?: string; debit?: string; credit?: string };
async function cell(p: Page, row: number, col: number) { return u.main(p).locator('table:visible tbody tr').nth(row).locator('input:visible').nth(col); }
async function pickCell(p: Page, row: number, col: number, query: string, option = query) {
  const c = await cell(p, row, col); await c.click(); await c.fill(query); await wait(2500);
  await p.locator('.cs-option:visible').filter({ hasText: option }).first().click(); await wait(2500);
}
async function rows(p: Page, list: Row[]) {
  for (const [i, r] of list.entries()) {
    await u.main(p).getByRole('button', { name: 'إضافة صف' }).click(); await wait(1500);
    await pickCell(p, i, 0, r.account);
    if (r.partyType) await pickCell(p, i, 1, '', r.partyType);
    if (r.party) await pickCell(p, i, 2, r.party);
    for (const [col, v] of [[3, r.debit], [4, r.credit]] as const) if (v) { const c = await cell(p, i, col); await c.click(); await c.press('Control+a'); await c.pressSequentially(v); await c.press('Tab'); await wait(1500); }
  }
}
/** Clicks a button and returns the server answer of the matching call plus anything shown on screen. */
async function send(p: Page, button: string, call: RegExp) {
  await p.evaluate(() => {
    const w = window as any; w.__qa = [] as string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs = new MutationObserver((muts) => { for (const m of muts) for (const n of [...m.addedNodes, m.target] as any[]) { const t = (n.innerText ?? n.textContent ?? '').replace(/\s+/g, ' ').trim(); if (t && t.length < 300 && /بنجاح|خطأ|لا يمكن|يجب|تعذر/.test(t) && !w.__qa.includes(t)) w.__qa.push(t); } }); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });
  const res = p.waitForResponse((r) => call.test(r.url()) && r.request().method() !== 'GET', { timeout: 30_000 }).catch(() => null);
  const b = p.locator('button:visible').filter({ hasText: new RegExp('^\\s*' + button + '\\s*$') }).last();
  const enabled = await b.isEnabled().catch(() => false);
  if (enabled) await b.click();
  const r = await res; await wait(7000);
  const toasts: string[] = await p.evaluate(() => { const w = window as any; w.__qaObs?.disconnect(); return w.__qa ?? []; }); // eslint-disable-line @typescript-eslint/no-explicit-any
  const body = r ? (await r.text().catch(() => '')).slice(0, 900) : '';
  return { enabled, status: r?.status() ?? 0, url: r?.url() ?? '', body, msg: `${toasts.join(' | ')} ${await popups(p)}`.trim() };
}
const nameOf = (p: Page) => (p.url().match(/journal-entries\/(ACC[^/?#]+)/) || [])[1] ?? '';

/** Save from the add screen, verify the stored rows, submit from the screen and verify the ledger. */
async function saveAndSubmit(page: Page, id: string, title: string, expected: [string, number, number][], extra: Doc = {}) {
  const s = await send(page, 'حفظ', /journal_entry|Journal/);
  const name = nameOf(page);
  await page.screenshot({ path: `Shamel/je-results/${id}-save.png`, fullPage: true });
  rec.check(`${id}-1`, `${title}: Save creates the entry`, !!name, `enabled=${s.enabled} status=${s.status} ${s.url.split('/').pop()} msg=${s.msg} ${s.body}`);
  if (!name) return '';
  d.remember(`JE-${id}`, name);
  const doc = await je(name);
  const got = doc.accounts.map((a: Doc) => [a.account.split(' - ')[0], a.debit_in_account_currency, a.credit_in_account_currency]);
  const wrong = Object.entries(extra).filter(([k, v]) => doc[k] !== v).map(([k, v]) => `${k}: expected ${v} got ${doc[k]}`);
  rec.check(`${id}-2`, `${title}: the stored data matches what was typed`, JSON.stringify(got) === JSON.stringify(expected) && !wrong.length, `${JSON.stringify(got)} ${wrong}`);
  await u.open(page, `/desk/shamel#/accounting/journal-entries/${name}`);
  const r = await send(page, 'اعتماد', /submit/i);
  const after = await je(name);
  await page.screenshot({ path: `Shamel/je-results/${id}-submit.png`, fullPage: true });
  rec.check(`${id}-3`, `${title}: Submit works`, after.docstatus === 1, `docstatus=${after.docstatus} enabled=${r.enabled} status=${r.status} msg=${r.msg} ${r.body}`);
  if (after.docstatus === 1) {
    const g = await gl(name); const dr = g.reduce((a, x) => a + x.debit, 0), cr = g.reduce((a, x) => a + x.credit, 0);
    rec.check(`${id}-4`, `${title}: the ledger is posted and balanced`, g.length >= 2 && Math.abs(dr - cr) < 0.01 && dr > 0, JSON.stringify(g.map((x) => [x.account.split(' - ')[0], x.debit, x.credit, x.party])));
  }
  return name;
}
const open = async (p: Page, type?: string) => { await u.open(p, NEW); if (type) await f.option(p, 'نوع القيد', type); };
const reference = async (p: Page, no: string) => { await u.type(p, 'الرقم المرجعي', no); await f.day(p, 'تاريخ المرجع', 24); };

test('J01 plain journal entry between two cash accounts', async ({ page }) => {
  await open(page); await rows(page, [{ account: CASH, debit: '10' }, { account: BANK, credit: '10' }]);
  await saveAndSubmit(page, 'J01', 'Journal Entry', [[CASH, 10, 0], [BANK, 0, 10]], { voucher_type: 'Journal Entry', total_debit: 10, total_credit: 10 });
});

test('J02 row with a customer', async ({ page }) => {
  await open(page); await rows(page, [{ account: CASH, debit: '15' }, { account: '1210', partyType: 'عميل', party: d.CUST, credit: '15' }]);
  const name = await saveAndSubmit(page, 'J02', 'With a customer', [[CASH, 15, 0], ['1210', 0, 15]]);
  if (name) rec.check('J02-5', 'The customer is stored on the receivable row', (await je(name)).accounts[1].party === d.CUST);
});

test('J03 row with a supplier', async ({ page }) => {
  await open(page); await rows(page, [{ account: 'QA-PR Payable', partyType: 'مورد', party: d.SUPP, debit: '12' }, { account: CASH, credit: '12' }]);
  await saveAndSubmit(page, 'J03', 'With a supplier', [['QA-PR Payable', 12, 0], [CASH, 0, 12]]);
});

test('J04 bank entry with a reference', async ({ page }) => {
  await open(page, 'قيد بنكي'); await rows(page, [{ account: '122301', debit: '20' }, { account: CASH, credit: '20' }]); await reference(page, '1001'); // numbers only (SRS p.386)
  await saveAndSubmit(page, 'J04', 'Bank Entry', [['122301', 20, 0], [CASH, 0, 20]], { voucher_type: 'Bank Entry', cheque_no: '1001', cheque_date: '2026-11-24' });
});

test('J05 cash entry', async ({ page }) => {
  await open(page, 'قيد نقدي'); await rows(page, [{ account: CASH, debit: '11' }, { account: BANK, credit: '11' }]);
  await saveAndSubmit(page, 'J05', 'Cash Entry', [[CASH, 11, 0], [BANK, 0, 11]], { voucher_type: 'Cash Entry' });
});

test('J06 contra entry', async ({ page }) => {
  await open(page, 'قيد مقابل'); await rows(page, [{ account: '122301', debit: '13' }, { account: CASH, credit: '13' }]); await reference(page, '1002');
  await saveAndSubmit(page, 'J06', 'Contra Entry', [['122301', 13, 0], [CASH, 0, 13]], { voucher_type: 'Contra Entry', cheque_no: '1002' });
});

test('J07 three rows', async ({ page }) => {
  await open(page); await rows(page, [{ account: CASH, debit: '30' }, { account: BANK, credit: '18' }, { account: '122301', credit: '12' }]);
  await saveAndSubmit(page, 'J07', 'Three rows', [[CASH, 30, 0], [BANK, 0, 18], ['122301', 0, 12]], { total_debit: 30, total_credit: 30 });
});

test('J08 multi currency', async ({ page }) => {
  await open(page);
  await u.main(page).locator('.toggle-row').filter({ hasText: 'عملات متعددة' }).locator('.is-switch-slider').click({ force: true }); await wait(2000);
  await rows(page, [{ account: CASH, debit: '37.5' }, { account: 'usd debtors', partyType: 'عميل', party: d.CUST_USD, credit: '10' }]);
  const x = await u.fields(page); rec.note('J08-0', 'totals before save', `${x['إجمالي المدين']} / ${x['إجمالي الدائن']} / ${x['الفرق (مدين - دائن)']}`);
  await saveAndSubmit(page, 'J08', 'Multi currency (USD customer)', [[CASH, 37.5, 0], ['usd debtors', 0, 10]], { multi_currency: 1 });
});

test('J09 Edit Row values are saved', async ({ page }) => {
  await open(page); await rows(page, [{ account: CASH, debit: '9' }, { account: BANK, credit: '9' }]);
  await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await wait(2500);
  const m = page.locator('.qr-dialog:visible, .base-modal:visible').last();
  const remark = m.locator('textarea:visible').last(); await remark.fill('QA row remark'); await remark.press('Tab');
  await m.locator('button').filter({ hasText: /^\s*حفظ\s*$/ }).last().click(); await wait(2500);
  const name = await saveAndSubmit(page, 'J09', 'Edit Row', [[CASH, 9, 0], [BANK, 0, 9]]);
  if (name) rec.check('J09-5', 'The row remark typed in Edit Row is stored', (await je(name)).accounts[0].user_remark === 'QA row remark', String((await je(name)).accounts[0].user_remark));
});

test('J10 quick entry', async ({ page }) => {
  await open(page);
  await u.main(page).getByRole('button', { name: 'إدخال سريع' }).click(); await wait(2500);
  const m = page.locator('.qr-dialog:visible, .base-modal:visible, [role=dialog]:visible').last();
  const box = (label: string) => m.locator('label').filter({ hasText: new RegExp('^\\s*' + label + '\\s*\\*?\\s*$') }).locator('xpath=ancestor::div[.//input or .//textarea][1]').locator('input:visible, textarea:visible').first();
  await box('المبلغ').fill('8');
  for (const [label, q] of [['الحساب المدين', CASH], ['الحساب الدائن', BANK]]) { // a custom select, not a text box
    await m.locator('.qr-field').filter({ hasText: label }).locator('.select-head').click(); await wait(2000);
    await page.getByPlaceholder('بحث', { exact: true }).filter({ visible: true }).last().fill(q); await wait(2500);
    await page.getByText(new RegExp('^\\s*' + q + ' - ')).filter({ visible: true }).last().click(); await wait(1500);
  }
  await box('ملاحظات').fill('QA quick entry'); await box('ملاحظات').press('Tab'); await wait(1000);
  await page.screenshot({ path: 'Shamel/je-results/J10-popup.png' });
  const s = await send(page, 'حفظ', /journal_entry|Journal/);
  await page.screenshot({ path: 'Shamel/je-results/J10-after.png', fullPage: true });
  let name = nameOf(page);
  if (!name) { // the pop-up may only fill the form
    const again = await send(page, 'حفظ', /journal_entry|Journal/); name = nameOf(page); rec.note('J10-0', 'the pop-up filled the form; Save pressed on the form', `${again.status} ${again.msg} ${again.body.slice(0, 300)}`);
  }
  rec.check('J10-1', 'Quick Entry creates the entry', !!name, `status=${s.status} ${s.msg} ${s.body}`);
  if (!name) return;
  d.remember('JE-J10', name); const doc = await je(name);
  rec.check('J10-2', 'Quick Entry stores amount, both accounts and the remark', doc.total_debit === 8 && doc.accounts.length === 2 && /QA quick entry/.test(`${doc.user_remark} ${doc.remark}`), JSON.stringify([doc.total_debit, doc.user_remark, doc.accounts.map((a: Doc) => [a.account, a.debit, a.credit])]));
  if (doc.docstatus === 0) { await u.open(page, `/desk/shamel#/accounting/journal-entries/${name}`); const r = await send(page, 'اعتماد', /submit/i); rec.check('J10-3', 'Quick Entry document submits', (await je(name)).docstatus === 1, `${r.status} ${r.msg} ${r.body}`); }
});

test('J11 unbalanced entry is refused', async ({ page }) => {
  await open(page); await rows(page, [{ account: CASH, debit: '50' }, { account: BANK, credit: '40' }]);
  const s = await send(page, 'حفظ', /journal_entry|Journal/); const name = nameOf(page);
  await page.screenshot({ path: 'Shamel/je-results/J11.png', fullPage: true });
  rec.check('J11-1', 'An unbalanced entry is not saved and a clear message is shown', !name && s.msg !== '', `name=${name} enabled=${s.enabled} status=${s.status} msg=${s.msg} ${s.body.slice(0, 300)}`);
});
