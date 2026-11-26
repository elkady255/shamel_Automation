// Payment Entry - references, taxes, deductions / write-off, withholding tax and foreign currency (SRS p.343-362). CHANGES DATA.
import { test, type Page, type Locator } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api, type Doc } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('pe-c-advanced');
test.use({ viewport: { width: 1400, height: 1800 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(560_000);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const REFS = 'المخصص', TAXES = 'رأس الحساب', DED = 'المبلغ (عملة الشركة)';
const click = async (l: Locator) => { await l.evaluate((e: any) => e.click(), undefined, { timeout: 10_000 }); }; // eslint-disable-line @typescript-eslint/no-explicit-any
const table = (p: Page, head: string) => u.main(p).locator('table:visible').filter({ has: p.locator('thead th', { hasText: head }) }).first();
/** Text of server error pop-ups; closes them. */
async function errorPopups(p: Page) {
  const m = p.locator('.modal.show'); let text = '';
  for (let i = 0; i < 4 && (await m.count()); i++) { text += (await m.first().innerText().catch(() => '')).replace(/\s+/g, ' ') + ' '; await click(p.locator('.modal.show .btn-modal-close').first()).catch(() => {}); await wait(1200); }
  return text.trim();
}
async function addRow(p: Page, n: number) { await click(u.main(p).locator('button:visible').filter({ hasText: /^\s*إضافة صف\s*$/ }).nth(n)); await wait(4000); return errorPopups(p); }
/** The control of a table cell found through the column header. */
async function cell(p: Page, head: string, column: string, row = 0) {
  const t = table(p, head);
  const i = (await t.locator('thead th').allInnerTexts()).findIndex((h) => h.trim().startsWith(column));
  return t.locator('tbody tr').nth(row).locator('td').nth(i);
}
async function setCell(p: Page, head: string, column: string, value: string, option?: string, row = 0) {
  await errorPopups(p);
  const c = (await cell(p, head, column, row)).locator('input:visible').first();
  await c.click({ timeout: 10_000 });
  if (option !== undefined) { await c.fill(value); await wait(2200); await click(p.locator('.cs-option:visible').filter({ hasText: option }).first()); }
  else { await c.press('Control+a'); await c.pressSequentially(value); await c.press('Tab'); }
  await wait(3500);
}
const cellText = async (p: Page, head: string, column: string, row = 0) => { const c = await cell(p, head, column, row); const i = c.locator('input:visible').first(); return (await i.count()) ? i.inputValue() : (await c.innerText()).trim(); };
const optionsOf = async (p: Page, head: string, column: string, row = 0) => {
  await errorPopups(p); const c = (await cell(p, head, column, row)).locator('input:visible').first(); await c.click({ timeout: 10_000 }); await c.fill(''); await wait(2200);
  const o = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.trim()); await p.keyboard.press('Escape'); await u.main(p).locator('h1,h2,h3').first().click({ force: true }).catch(() => {}); await wait(800); return o;
};
const modal = (p: Page) => p.locator('.base-modal:visible, .qr-dialog:visible').last();
async function editRow(p: Page, head: string, row = 0) { await errorPopups(p); await table(p, head).locator('tbody tr').nth(row).locator('button[title="تعديل الصف"]').click({ timeout: 10_000 }).catch(() => {}); await wait(2500); await errorPopups(p); return (await modal(p).innerText({ timeout: 5000 }).catch(() => 'NO POPUP OPENED')).replace(/\s+/g, ' '); }
const cancelModal = async (p: Page) => { for (let i = 0; i < 3 && (await modal(p).count()); i++) { await click(modal(p).locator('button').filter({ hasText: /^\s*(إلغاء|إغلاق)\s*$/ }).last()).catch(() => {}); await wait(1200); } };
async function columns(p: Page, head: string) {
  await errorPopups(p); await table(p, head).locator('button[title="إعدادات الجدول"]').click({ timeout: 10_000 }); await wait(2000);
  await modal(p).getByText('إضافة/إزالة حقول').click({ timeout: 10_000 }); await wait(2000);
  const t = (await modal(p).innerText({ timeout: 5000 })).replace(/\s+/g, ' '); await cancelModal(p); return t;
}
async function newDraft(page: Page, x: f.Payment) {
  await f.fill(page, x); const s = await u.save(page);
  if (!/ACC-PAY/.test(s.name)) throw new Error(`draft not saved: ${s.msg} ${s.errors} ${s.body.slice(0, 300)}`);
  await u.closeModals(page); return s.name;
}
const saveDraft = async (p: Page) => { await errorPopups(p); const s = await u.save(p); await u.closeModals(p); return s; };
const pe = (n: string) => api.get('Payment Entry', n);
const gl = async (n: string) => api.list('GL Entry', [['voucher_no', '=', n], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit', 'posting_date'], 40);
const glText = (g: Doc[]) => g.map((x) => `${x.account} Dr${x.debit} Cr${x.credit}`).join(' ; ');
const sum = (g: Doc[], account: RegExp, side: 'debit' | 'credit') => Math.round(g.filter((x) => account.test(x.account)).reduce((a, x) => a + x[side], 0) * 100) / 100;
async function submitCheck(page: Page, id: string, name: string) {
  const r = await f.submit(page); await u.closeModals(page); const doc = await pe(name);
  rec.check(id, 'Submit from the screen submits the document', doc.docstatus === 1, `docstatus=${doc.docstatus} ${r.msg.slice(0, 200)} ${r.body.slice(0, 400)}`);
  return doc.docstatus === 1;
}
const invoice = async (key: string, rate: number, days = 4) => d.seedStep(key, () => d.salesInvoice(rate, days));

test('C01 references table: add a row by hand', async ({ page }) => {
  const inv = await invoice('siC1', 1100);
  const name = await newDraft(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '600' });
  await addRow(page, 0);
  const types = await optionsOf(page, REFS, 'النوع');
  rec.check('C01-1', 'Type offers Dunning, Journal Entry, Sales Invoice and Sales Order (customer)', ['مطالبة', 'قيد يومية', 'فاتورة مبيعات', 'أمر بيع'].every((t) => types.some((o) => o.includes(t))) && types.length === 4, types.join(' | '));
  await setCell(page, REFS, 'النوع', 'Sales Invoice', 'فاتورة مبيعات');
  const names = await optionsOf(page, REFS, 'الاسم');
  rec.check('C01-2', 'Name lists only documents of the selected type that belong to the party', names.length > 0 && names.every((n) => /ACC-SINV/.test(n)), names.slice(0, 10).join(' | '));
  rec.check('C01-3', 'Name offers only invoices that still have an outstanding amount', names.some((n) => n.includes(inv)), names.slice(0, 10).join(' | '));
  await setCell(page, REFS, 'الاسم', inv, inv);
  const due = await cellText(page, REFS, 'تاريخ الاستحقاق'), total = await cellText(page, REFS, 'الإجمالي'), out = await cellText(page, REFS, 'المستحق');
  const doc = await api.get('Sales Invoice', inv);
  rec.check('C01-4', 'Due Date, Grand Total and Outstanding are fetched from the document', due === doc.due_date.split('-').reverse().join('-') && total.includes('1,100') && out.includes('1,100'), `${due} | ${total} | ${out}`);
  await setCell(page, REFS, 'المخصص', 'abc'); const letters = await cellText(page, REFS, 'المخصص');
  rec.check('C01-5', 'Allocated accepts numbers only', !/[a-z]/i.test(letters), `"${letters}"`);
  for (const [id, v, text] of [['C01-6', '-50', 'negative'], ['C01-7', '5000', 'above the outstanding amount']] as const) {
    await setCell(page, REFS, 'المخصص', v); const s = await saveDraft(page); const saved = (await pe(name)).references;
    rec.check(id, `An allocated amount ${text} is refused`, s.status >= 300 || s.msg !== '' || s.errors.length > 0 || !saved.some((r: Doc) => r.allocated_amount === Number(v)), `shown=${await cellText(page, REFS, 'المخصص').catch(() => '')} status=${s.status} msg=${s.msg.slice(0, 200)} saved=${JSON.stringify(saved.map((r: Doc) => r.allocated_amount))}`);
    await u.open(page, `${u.LIST}/${name}`);
    if (!(await table(page, REFS).count())) { await addRow(page, 0); await setCell(page, REFS, 'النوع', 'Sales Invoice', 'فاتورة مبيعات'); await setCell(page, REFS, 'الاسم', inv, inv); }
  }
  await setCell(page, REFS, 'المخصص', '600'); const x = await u.fields(page);
  rec.check('C01-8', 'Totals follow the row: Total Allocated 600, Unallocated 0', x['إجمالي المبلغ المخصص (SAR)'] === '600.00' && x['المبلغ غير المخصص'] === '0.00', `${x['إجمالي المبلغ المخصص (SAR)']} / ${x['المبلغ غير المخصص']}`);
  const text = await editRow(page, REFS); await page.screenshot({ path: 'Shamel/pe-results/c01-edit.png' });
  const want = ['النوع', 'الاسم', 'تاريخ الاستحقاق', 'شرط الدفع', 'الإجمالي', 'المستحق', 'المخصص', 'سعر الصرف', 'الحساب'];
  rec.check('C01-9', 'Reference Edit Row shows the SRS fields', want.every((w) => text.includes(w)), `missing=${want.filter((w) => !text.includes(w))} popup=${text}`);
  rec.check('C01-10', 'Hidden (red) fields Account Type, Payment Type and Payment Request are not shown', !/نوع الحساب|نوع الدفع|طلب الدفع|طلب السداد/.test(text), text);
  rec.check('C01-11', 'Supplier Invoice No is not shown for a sales invoice', !/رقم فاتورة المورد/.test(text), text);
  await cancelModal(page);
  const cols = await columns(page, REFS);
  const colWant = ['النوع', 'الاسم', 'تاريخ الاستحقاق', 'الإجمالي', 'المستحق', 'المخصص', 'رقم فاتورة المورد', 'شرط الدفع', 'تأثير التسوية', 'سعر الصرف', 'أرباح', 'الحساب'];
  rec.check('C01-12', 'Add/Remove columns of references lists the SRS columns', colWant.every((w) => cols.includes(w)), `missing=${colWant.filter((w) => !cols.includes(w))} popup=${cols}`);
  const s = await saveDraft(page); const saved = await pe(name);
  rec.check('C01-13', 'The hand-made reference is saved', saved.references.length === 1 && saved.references[0].reference_name === inv && saved.references[0].allocated_amount === 600, `${s.status} ${s.msg} ${JSON.stringify(saved.references.map((r: Doc) => [r.reference_name, r.allocated_amount]))}`);
  await click(table(page, REFS).locator('tbody tr').first().locator('button[title="حذف"]')); await wait(1500);
  await saveDraft(page);
  rec.check('C01-14', 'Deleting the reference row and saving removes it from the draft', (await pe(name)).references.length === 0, String((await pe(name)).references.length));
  await click(u.btn(page, 'جلب الأوامر المستحقة')); await wait(7000); const m = `${await errorPopups(page)} ${await u.modalText(page)}`;
  rec.check('C01-15', 'Get Outstanding Orders answers without an error (no order exists for this party)', !/خطأ في الخادم|Error/.test(m), m.slice(0, 300));
  d.remember('C01', name);
});

test('C02 taxes added by hand (receive from customer)', async ({ page }) => {
  const name = await newDraft(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '500' });
  const errAdd = await addRow(page, 1);
  rec.check('C02-1', 'Add Row in Advance Taxes and Charges adds a row without any error', errAdd === '', errAdd.slice(0, 300));
  const types = await optionsOf(page, TAXES, 'النوع');
  rec.check('C02-2', 'Tax Type offers Actual, On Paid Amount, On Previous Row Amount and On Previous Row Total', types.length === 4, types.join(' | '));
  await setCell(page, TAXES, 'النوع', '', types.find((t) => /المدفوع|Paid/.test(t)) ?? types[1]);
  const heads = await optionsOf(page, TAXES, 'رأس الحساب'); rec.note('C02-3', 'account head options', heads.slice(0, 40).join(' | '));
  const taxAccount = heads.find((h) => /QA-PE WHT/.test(h)) ?? heads.find((h) => /VAT|ضريب|القيمة المضافة/i.test(h)) ?? heads[0];
  await setCell(page, TAXES, 'رأس الحساب', taxAccount.split(' - ')[0], taxAccount.split(' - ')[0]);
  await setCell(page, TAXES, 'نسبة الضريبة', '10'); await errorPopups(page);
  const amt = await cellText(page, TAXES, 'المبلغ'), tot = await cellText(page, TAXES, 'الإجمالي'); const x = await u.fields(page);
  rec.check('C02-4', 'Amount = 10% of 500 = 50 and totals show it', /50\.00/.test(amt) && /50\.00/.test(x['إجمالي الضرائب والرسوم (SAR)'] ?? ''), `amount=${amt} total=${tot} totals=${x['إجمالي الضرائب والرسوم (SAR)']}`);
  const text = await editRow(page, TAXES); await page.screenshot({ path: 'Shamel/pe-results/c02-edit.png' });
  const want = ['إضافة', 'النوع', 'رأس الحساب', 'الوصف', 'المدفوع', 'مركز التكلفة', 'المشروع', 'نسبة الضريبة', 'عملة الحساب', 'صافي المبلغ', 'المبلغ', 'الإجمالي'];
  rec.check('C02-5', 'Tax Edit Row shows the SRS fields', want.every((w) => text.includes(w)), `missing=${want.filter((w) => !text.includes(w))} popup=${text}`);
  rec.check('C02-6', 'Reference Row is hidden for On Paid Amount', !/الصف المرجعي|صف المرجع|رقم الصف/.test(text), text);
  rec.check('C02-7', 'Description is mandatory in the tax Edit Row', /الوصف\s*\*/.test(text), text);
  await cancelModal(page);
  const s = await saveDraft(page); const doc = await pe(name);
  rec.check('C02-8', 'The tax row is saved with the draft', s.status < 300 && doc.taxes.length === 1 && doc.taxes[0].tax_amount === 50, `${s.status} ${s.msg} ${s.errors} ${JSON.stringify(doc.taxes.map((t: Doc) => [t.account_head, t.rate, t.tax_amount]))}`);
  if (doc.taxes.length && (await submitCheck(page, 'C02-9', name))) {
    const g = await gl(name);
    rec.check('C02-10', 'The ledger posts the tax of 50 to the tax account and stays balanced', sum(g, new RegExp(u.esc(doc.taxes[0].account_head)), 'credit') + sum(g, new RegExp(u.esc(doc.taxes[0].account_head)), 'debit') === 50 && Math.abs(g.reduce((a, y) => a + y.debit - y.credit, 0)) < 0.01, glText(g));
  }
});

test('C03 tax template and template visibility', async ({ page }) => {
  await newDraft(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '200' });
  let l = await u.labels(page);
  rec.check('C03-1', 'Receive + Customer shows the Sales template only', l.includes('قالب ضرائب ورسوم المبيعات') && !l.includes('قالب ضرائب ورسوم الشراء'), l.filter((s) => /قالب/.test(s)).join(','));
  await f.search(page, 'قالب ضرائب ورسوم المبيعات', 'VAT - E'); await wait(5000); await errorPopups(page);
  const t = (await table(page, TAXES).count()) ? await table(page, TAXES).locator('tbody tr').allInnerTexts() : [];
  const tpl = await api.get('Sales Taxes and Charges Template', 'VAT - E');
  rec.check('C03-2', 'Choosing a template fills the taxes table with the template rows', t.length === tpl.taxes.length, `${t.length} rows, template has ${tpl.taxes.length}`);
  const s = await saveDraft(page); rec.check('C03-3', 'The draft saves with the template taxes', s.status < 300, `${s.status} ${s.msg} ${s.body.slice(0, 300)}`);
  await newDraft(page, { type: 'pay', mop: 'Cash', party: d.SUPP, paidFrom: '122102', paid: '50' });
  l = await u.labels(page);
  rec.check('C03-4', 'Pay + Supplier shows the Purchase template only', l.includes('قالب ضرائب ورسوم الشراء') && !l.includes('قالب ضرائب ورسوم المبيعات'), l.filter((s) => /قالب/.test(s)).join(','));
  await newDraft(page, { type: 'pay', mop: 'Cash', partyType: 'Employee', party: d.data().employee, paidFrom: '122102', paid: '5' });
  const secs = await u.sections(page);
  rec.check('C03-5', 'Advance Taxes and Charges is hidden for an Employee', !secs.some((s) => /الضرائب والرسوم المقدمة/.test(s)) && !(await u.labels(page)).some((x) => /قالب ضرائب/.test(x)), secs.join(','));
});

test('C04 deductions and write off', async ({ page }) => {
  const inv = await invoice('siC4', 900);
  const name = await newDraft(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '880' });
  await addRow(page, 0); await setCell(page, REFS, 'النوع', 'Sales Invoice', 'فاتورة مبيعات'); await setCell(page, REFS, 'الاسم', inv, inv); await setCell(page, REFS, 'المخصص', '900');
  let x = await u.fields(page);
  rec.check('C04-1', 'Difference Amount shows 20 when 900 is allocated from a payment of 880', /20\.00/.test(x['مبلغ الفرق (عملة الشركة)'] ?? ''), x['مبلغ الفرق (عملة الشركة)']);
  const btn = u.main(page).getByRole('button', { name: /شطب مبلغ الفرق|شطب الفرق|Write off/i });
  rec.check('C04-2', 'Write off Difference Amount appears when Difference Amount > 0', (await btn.count()) > 0, (await u.main(page).locator('button:visible').allInnerTexts()).join(','));
  if (await btn.count()) { await click(btn.first()); await wait(5000); await errorPopups(page); }
  const rows = (await table(page, DED).count()) ? (await u.tablesInfo(page)).find((t) => t.head.includes('مركز التكلفة'))?.rows : [];
  rec.check('C04-3', 'Write off adds a deduction row of 20 to the write off account and clears the difference', JSON.stringify(rows).includes('5317') && JSON.stringify(rows).includes('20') && /^0\.00$/.test((await u.fields(page))['مبلغ الفرق (عملة الشركة)'] ?? ''), JSON.stringify(rows));
  const text = await editRow(page, DED); await page.screenshot({ path: 'Shamel/pe-results/c04-edit.png' });
  const want = ['الحساب', 'مركز التكلفة', 'المبلغ', 'أرباح', 'الوصف'];
  rec.check('C04-4', 'Deduction Edit Row shows Account, Cost Center, Amount, Is Exchange Gain / Loss, Description', want.every((w) => text.includes(w)), `missing=${want.filter((w) => !text.includes(w))} popup=${text}`);
  rec.check('C04-5', 'Account, Cost Center and Amount are marked mandatory', /الحساب\s*\*/.test(text) && /مركز التكلفة\s*\*/.test(text) && /المبلغ[^|*]{0,20}\*/.test(text), text);
  await cancelModal(page);
  const s = await saveDraft(page); const doc = await pe(name);
  rec.check('C04-6', 'Draft saves with allocation 900 and deduction 20', s.status < 300 && doc.deductions.length === 1 && doc.deductions[0].amount === 20 && doc.difference_amount === 0, `${s.status} ${s.msg} ${JSON.stringify(doc.deductions.map((y: Doc) => [y.account, y.amount]))} diff=${doc.difference_amount}`);
  if (await submitCheck(page, 'C04-7', name)) {
    const g = await gl(name); const i = await api.get('Sales Invoice', inv);
    rec.check('C04-8', 'Invoice 900 is fully paid and 20 is posted to the write off account', i.outstanding_amount === 0 && sum(g, /^5317/, 'debit') === 20, `outstanding=${i.outstanding_amount} ${glText(g)}`);
  }
});

test('C05 deduction added by hand and difference check', async ({ page }) => {
  const inv = await invoice('siC5', 900);
  const name = await newDraft(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '890' });
  await addRow(page, 0); await setCell(page, REFS, 'النوع', 'Sales Invoice', 'فاتورة مبيعات'); await setCell(page, REFS, 'الاسم', inv, inv); await setCell(page, REFS, 'المخصص', '900');
  await saveDraft(page); await errorPopups(page); await u.open(page, `${u.LIST}/${name}`);
  const r = await f.submit(page); await errorPopups(page); await u.closeModals(page);
  const unsettled = await pe(name);
  rec.check('C05-1', 'A payment with an unsettled difference of 10 cannot be submitted and an error is shown', unsettled.docstatus === 0 && unsettled.difference_amount !== 0 && r.msg !== '', `diff=${unsettled.difference_amount} docstatus=${unsettled.docstatus} ${r.msg.slice(0, 250)} ${r.body.slice(0, 250)}`);
  await u.open(page, `${u.LIST}/${name}`);
  if (!(await table(page, REFS).count())) { await addRow(page, 0); await setCell(page, REFS, 'النوع', 'Sales Invoice', 'فاتورة مبيعات'); await setCell(page, REFS, 'الاسم', inv, inv); await setCell(page, REFS, 'المخصص', '900'); }
  await addRow(page, 2);
  await setCell(page, DED, 'الحساب', '5317', '5317'); await setCell(page, DED, 'المبلغ', '10');
  const x = await u.fields(page);
  rec.check('C05-2', 'A hand-made deduction of 10 clears the difference', /^0\.00$/.test(x['مبلغ الفرق (عملة الشركة)'] ?? ''), x['مبلغ الفرق (عملة الشركة)']);
  const s = await saveDraft(page); const doc = await pe(name);
  rec.check('C05-3', 'The deduction row is saved', doc.deductions.length === 1 && doc.deductions[0].amount === 10, `${s.status} ${s.msg} ${s.errors} ${JSON.stringify(doc.deductions)}`.slice(0, 400));
  if (doc.deductions.length) await submitCheck(page, 'C05-4', name);
});
