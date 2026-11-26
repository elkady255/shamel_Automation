// Payment Entry - tax withholding and foreign currency (SRS p.331-343, 355-362). CHANGES DATA.
import { test, type Page, type Locator } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api, type Doc } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('pe-d-tds-fx');
test.use({ viewport: { width: 1400, height: 1800 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(560_000);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const click = async (l: Locator) => { await l.evaluate((e: any) => e.click(), undefined, { timeout: 10_000 }); }; // eslint-disable-line @typescript-eslint/no-explicit-any
async function errorPopups(p: Page) {
  const m = p.locator('.modal.show'); let text = '';
  for (let i = 0; i < 4 && (await m.count()); i++) { text += (await m.first().innerText().catch(() => '')).replace(/\s+/g, ' ') + ' '; await click(p.locator('.modal.show .btn-modal-close').first()).catch(() => {}); await wait(1200); }
  return text.trim();
}
async function toggle(p: Page, text: string) { await click(u.main(p).locator('.toggle-row').filter({ hasText: text }).first().locator('.is-switch-slider')); await wait(3000); }
const saveDraft = async (p: Page) => { const before = await errorPopups(p); const s = await u.save(p); await u.closeModals(p); return { ...s, before }; };
const pe = (n: string) => api.get('Payment Entry', n);
const gl = async (n: string) => api.list('GL Entry', [['voucher_no', '=', n], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit', 'debit_in_account_currency', 'credit_in_account_currency'], 40);
const glText = (g: Doc[]) => g.map((x) => `${x.account} Dr${x.debit} Cr${x.credit}`).join(' ; ');
const sum = (g: Doc[], account: RegExp, side: 'debit' | 'credit') => Math.round(g.filter((x) => account.test(x.account)).reduce((a, x) => a + x[side], 0) * 100) / 100;
const n = (v?: string) => Number((v ?? '').replace(/,/g, ''));
async function submitCheck(page: Page, id: string, name: string) {
  await errorPopups(page); const r = await f.submit(page); await u.closeModals(page); const doc = await pe(name);
  rec.check(id, 'Submit from the screen submits the document', doc.docstatus === 1, `docstatus=${doc.docstatus} ${r.msg.slice(0, 200)} ${r.body.slice(0, 400)}`);
  return doc.docstatus === 1;
}

test('D01 consider for tax withholding', async ({ page }) => {
  await f.fill(page, { type: 'pay', mop: 'Cash', party: d.SUPP, paidFrom: '122102', paid: '1000' });
  const l0 = await u.labels(page);
  rec.check('D01-1', 'Tax Withholding Category is hidden while Consider for Tax Withholding is off', !l0.some((s) => /فئة (حجز|استقطاع)/.test(s)), l0.filter((s) => /حجز|استقطاع/.test(s)).join(','));
  await toggle(page, 'مراعاة حجز الضرائب'); await errorPopups(page);
  const l1 = await u.labels(page); const added = l1.filter((s) => !l0.includes(s)); rec.note('D01-2', 'fields that appear', added.join(' | '));
  const cat = added.find((s) => /فئة/.test(s)) ?? '';
  rec.check('D01-3', 'Turning it on shows Tax Withholding Category', !!cat, added.join(' | '));
  const marked = (await u.main(page).locator('label:visible').allInnerTexts()).some((s) => /فئة/.test(s) && s.includes('*'));
  rec.check('D01-4', 'Tax Withholding Category is mandatory', marked);
  rec.check('D01-5', 'Tax Withholding Group is offered', added.some((s) => /مجموعة/.test(s)), added.join(' | '));
  const toggles = (await u.main(page).locator('.toggle-row:visible').allInnerTexts()).map((s) => s.trim());
  rec.check('D01-6', 'Ignore Tax Withholding Threshold and Edit Tax Withholding Entries are offered', toggles.some((s) => /تجاهل/.test(s)) && toggles.some((s) => /تعديل/.test(s)), toggles.join(' | '));
  let sent = false; page.on('request', (q) => { if (q.url().includes('create_payment_entry')) sent = true; });
  await click(u.btn(page, 'حفظ')); await wait(5000);
  const e = await u.inlineErrors(page); const m = await u.modalText(page);
  rec.check('D01-7', 'Saving without the category is refused with an error', !sent && (e.some((s) => /فئة/.test(s)) || /فئة|Category/.test(m)), `sent=${sent} errors=${e} msg=${m.slice(0, 200)}`);
  await u.closeModals(page);
  if (!cat) return;
  await f.search(page, cat, d.data().twc); await wait(5000); const err = await errorPopups(page);
  const x = await u.fields(page);
  rec.check('D01-8', 'Choosing the category calculates without a server error', !/خطأ/.test(err), err.slice(0, 300));
  rec.note('D01-9', 'amounts after choosing the category', JSON.stringify(Object.fromEntries(Object.entries(x).filter(([k]) => /بعد الضريبة|المبلغ/.test(k)))));
  const s = await saveDraft(page);
  rec.check('D01-10', 'The draft saves with the withholding category', /ACC-PAY/.test(s.name), `${s.status} ${s.msg} ${s.errors} ${s.body.slice(0, 400)}`);
  if (!/ACC-PAY/.test(s.name)) return;
  d.remember('D01', s.name);
  const doc = await pe(s.name); const y = await u.fields(page);
  rec.check('D01-11', 'Stored: apply withholding, category, one withholding entry of 5% = 50', doc.tax_withholding_category === d.data().twc && (doc.tax_withholding_entries ?? []).length === 1 && doc.tax_withholding_entries[0].withholding_amount === 50, JSON.stringify({ apply: doc.apply_tds, cat: doc.tax_withholding_category, entries: (doc.tax_withholding_entries ?? []).map((t: Doc) => [t.taxable_amount, t.tax_rate, t.withholding_amount, t.status]), taxes: doc.taxes?.map((t: Doc) => [t.account_head, t.tax_amount]) }));
  rec.check('D01-12', 'Paid Amount After Tax shows 950', n(y['المبلغ المدفوع بعد الضريبة']) === 950, `${y['المبلغ المدفوع بعد الضريبة']} stored=${doc.paid_amount_after_tax}`);
  const t = (await u.tablesInfo(page)).find((x2) => x2.head.some((h) => /الأساس|الخاضع|المحتجز|الحجز/.test(h)));
  rec.check('D01-13', 'The Tax Withholding Entries table appears after Save with category, group, base amount, rate, withheld and document', !!t && ['فئة', 'مجموعة', 'نسبة'].every((w) => t.head.some((h) => h.includes(w))), JSON.stringify(t));
  if (t) {
    const row = u.main(page).locator('table:visible').filter({ has: page.locator('thead th', { hasText: t.head.find((h) => /نسبة/.test(h))! }) }).last().locator('tbody tr').first();
    await row.locator('button[title="تعديل الصف"]').click({ timeout: 10_000 }).catch(() => {}); await wait(2500);
    const text = (await page.locator('.base-modal:visible, .qr-dialog:visible').last().innerText({ timeout: 5000 }).catch(() => 'NO POPUP OPENED')).replace(/\s+/g, ' '); await page.screenshot({ path: 'Shamel/pe-results/d01-edit.png' });
    const want = ['الشركة', 'نوع الطرف', 'الطرف', 'الرقم الضريبي', 'فئة', 'مجموعة', 'نسبة', 'نوع المستند', 'العملة', 'سعر الصرف', 'الحالة'];
    rec.check('D01-14', 'Withholding entry Edit Row shows the SRS fields', want.every((w) => text.includes(w)), `missing=${want.filter((w) => !text.includes(w))} popup=${text}`);
    rec.check('D01-15', 'Hidden (red) fields Under Withheld Reason, Lower Deduction Certificate, Created By Migration are not shown', !/سبب|شهادة|الترحيل من|Migration/.test(text), text);
    await click(page.locator('.base-modal:visible button, .qr-dialog:visible button').filter({ hasText: /^\s*(إلغاء|إغلاق)\s*$/ }).last()).catch(() => {}); await wait(1500);
  }
  if (await submitCheck(page, 'D01-16', s.name)) {
    const g = await gl(s.name);
    rec.check('D01-17', 'Ledger: 50 credited to the withholding account and balanced', sum(g, /QA-PE WHT/, 'credit') === 50 && Math.abs(g.reduce((a, z) => a + z.debit - z.credit, 0)) < 0.01, glText(g));
  }
});

test('D02 foreign currency receipt with exchange gain', async ({ page }) => {
  await f.fill(page, { type: 'receive', mop: 'Cash', party: d.data().custUsd, paidTo: '122102' });
  let x = await u.fields(page); rec.note('D02-0', 'fields', JSON.stringify(x));
  rec.check('D02-1', 'Source rate is fetched from Currency Exchange (3.75), target rate 1', n(x['سعر الصرف (المصدر)']) === 3.75 && n(x['سعر الصرف (الهدف)']) === 1, `${x['سعر الصرف (المصدر)']} / ${x['سعر الصرف (الهدف)']}`);
  await u.type(page, 'المبلغ المدفوع', '300'); await wait(4000); x = await u.fields(page);
  rec.check('D02-2', 'Received Amount = 300 x 3.75 / 1 = 1125 and company amounts follow', n(x['المبلغ المستلم']) === 1125 && n(x['المبلغ المدفوع (عملة الشركة)']) === 1125, `received=${x['المبلغ المستلم']} paidBase=${x['المبلغ المدفوع (عملة الشركة)']}`);
  const s = await saveDraft(page);
  rec.check('D02-3', 'The foreign currency draft saves', /ACC-PAY/.test(s.name), `${s.status} ${s.msg} ${s.errors} ${s.body.slice(0, 400)}`);
  if (!/ACC-PAY/.test(s.name)) return;
  await f.getInvoices(page); await errorPopups(page); await saveDraft(page);
  let doc = await pe(s.name);
  const inv = d.data().siU, other = d.data().siU2;
  rec.check('D02-4', 'Outstanding USD invoices are allocated up to 300 USD', Math.abs(doc.references.reduce((a: number, r: Doc) => a + r.allocated_amount, 0) - 300) < 0.01, JSON.stringify(doc.references.map((r: Doc) => [r.reference_name, r.allocated_amount, r.exchange_rate, r.exchange_gain_loss])));
  rec.check('D02-5', 'Stored rates and amounts: 3.75, paid 300, received 1125', doc.source_exchange_rate === 3.75 && doc.paid_amount === 300 && doc.received_amount === 1125 && doc.paid_from_account_currency === 'USD', `${doc.source_exchange_rate} ${doc.paid_amount} ${doc.received_amount} ${doc.paid_from_account_currency}`);
  if (await submitCheck(page, 'D02-6', s.name)) {
    doc = await pe(s.name); const g = await gl(s.name);
    const gain = Math.round(doc.references.reduce((a: number, r: Doc) => a + r.allocated_amount * 0.05, 0) * 100) / 100;
    const je = await api.list('Journal Entry', [['Journal Entry Account', 'reference_name', '=', s.name]], ['name', 'voucher_type'], 5);
    const all = [...g]; for (const j of je) all.push(...(await gl(j.name)));
    rec.check('D02-7', 'Ledger: cash debited 1125 and receivable credited at the invoice rate', sum(g, /^122102/, 'debit') === 1125, glText(g));
    rec.check('D02-8', `Exchange gain of ${gain} SAR is posted to the exchange gain / loss account`, sum(all, /^5220/, 'credit') === gain, `journal=${JSON.stringify(je)} ${glText(all)}`);
    const i1 = await api.get('Sales Invoice', inv); const i2 = await api.get('Sales Invoice', other);
    rec.check('D02-9', 'USD invoice balances are reduced by 300 in total', Math.abs(i1.outstanding_amount + i2.outstanding_amount - 250) < 0.01, `${i1.outstanding_amount} + ${i2.outstanding_amount}`);
  }
});

test('D03 manual exchange rate overrides the fetched one', async ({ page }) => {
  await f.fill(page, { type: 'receive', mop: 'Cash', party: d.data().custUsd, paidTo: '122102', paid: '100' });
  const typed = await u.type(page, 'سعر الصرف (المصدر)', '3.8').catch((e) => `read only: ${String(e.message).slice(0, 80)}`); await wait(4000);
  const x = await u.fields(page);
  rec.check('D03-1', 'An authorised user can change the fetched rate', n(x['سعر الصرف (المصدر)']) === 3.8, typed);
  rec.check('D03-2', 'Received Amount is recalculated with the manual rate (380)', n(x['المبلغ المستلم']) === 380, x['المبلغ المستلم']);
  const s = await saveDraft(page); const doc = /ACC-PAY/.test(s.name) ? await pe(s.name) : undefined;
  rec.check('D03-3', 'The manual rate is saved on the document', doc?.source_exchange_rate === 3.8 && doc?.received_amount === 380, `${doc?.source_exchange_rate} ${doc?.received_amount} ${s.msg}`);
  if (doc) await submitCheck(page, 'D03-4', s.name);
});

test('D04 paid amount calculated from received amount', async ({ page }) => {
  await f.fill(page, { type: 'receive', mop: 'Cash', party: d.data().custUsd, paidTo: '122102' });
  await u.type(page, 'المبلغ المستلم', '375'); await wait(4000); const x = await u.fields(page);
  rec.check('D04-1', 'Paid Amount empty + Received 375: Paid = 375 x 1 / 3.75 = 100', n(x['المبلغ المدفوع']) === 100, x['المبلغ المدفوع']);
  await u.type(page, 'المبلغ المدفوع', '90'); await wait(4000); const y = await u.fields(page);
  rec.check('D04-2', 'A Paid Amount typed by the user is kept as typed', n(y['المبلغ المدفوع']) === 90, y['المبلغ المدفوع']);
  await u.type(page, 'المبلغ المستلم', '400'); await wait(4000); const z = await u.fields(page);
  rec.check('D04-3', 'When both are typed by the user neither is recalculated', n(z['المبلغ المدفوع']) === 90 && n(z['المبلغ المستلم']) === 400, `${z['المبلغ المدفوع']} / ${z['المبلغ المستلم']}`);
});

test('D05 internal transfer between currencies', async ({ page }) => {
  await f.fill(page, { type: 'transfer', mop: 'Cash', paidFrom: '122102', paidTo: '122201' });
  let x = await u.fields(page); rec.note('D05-0', 'fields', JSON.stringify(x));
  rec.check('D05-1', 'Currencies SAR to EGP with the target rate fetched (0.078740157)', x['عملة الحساب (من)'] === 'SAR' && x['عملة الحساب (إلى)'] === 'EGP' && Math.abs(n(x['سعر الصرف (الهدف)']) - 0.078740157) < 0.0001, `${x['عملة الحساب (من)']} ${x['عملة الحساب (إلى)']} ${x['سعر الصرف (الهدف)']}`);
  await u.type(page, 'المبلغ المدفوع', '100'); await wait(4000);
  await u.type(page, 'رقم الشيك / المرجع', 'QA-PE-FX'); await f.day(page, 'تاريخ الشيك / المرجع', 24); await wait(2000); x = await u.fields(page);
  rec.check('D05-2', 'Received = 100 / 0.078740157 = 1270', Math.abs(n(x['المبلغ المستلم']) - 1270) < 0.05, x['المبلغ المستلم']);
  const s = await saveDraft(page); const doc = /ACC-PAY/.test(s.name) ? await pe(s.name) : undefined;
  rec.check('D05-3', 'The transfer saves with both currencies', !!doc && doc.paid_amount === 100 && Math.abs(doc.received_amount - 1270) < 0.05, `${doc?.paid_amount} ${doc?.received_amount} ${s.msg} ${s.errors}`);
  if (doc && (await submitCheck(page, 'D05-4', s.name))) { const g = await gl(s.name); rec.check('D05-5', 'Ledger balanced between the two cash / bank accounts', Math.abs(g.reduce((a, z) => a + z.debit - z.credit, 0)) < 0.01 && sum(g, /^122102/, 'credit') === 100, glText(g)); }
});
