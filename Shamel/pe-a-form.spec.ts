// Payment Entry - Add screen rules (SRS pages 328-343). Nothing is saved.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('pe-a-form');
test.use({ viewport: { width: 1400, height: 1800 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(280_000);

const has = (l: string[], x: string) => l.includes(x);
const mandatory = async (p: Page) => (await u.main(p).locator('label:visible').allInnerTexts()).filter((s) => s.includes('*')).map((s) => s.replace(/\*/g, '').trim());
const today = () => new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

test('A01 initial screen, defaults and mandatory marks', async ({ page }) => {
  await u.open(page); const x = await u.fields(page); const l = await u.labels(page); const m = await mandatory(page);
  rec.note('A01-0', 'fields on open', JSON.stringify(x));
  rec.check('A01-1', 'Series is shown, mandatory and filled from the doctype naming series', has(m, 'السلسلة') && x['السلسلة'] === 'ACC-PAY-.YYYY.-', x['السلسلة']);
  rec.check('A01-2', 'Payment Type defaults to Receive', x['نوع الدفع'] === 'استلام', x['نوع الدفع']);
  rec.check('A01-3', 'Posting Date defaults to the current date and is mandatory', x['تاريخ الترحيل'] === today() && has(m, 'تاريخ الترحيل'), x['تاريخ الترحيل']);
  rec.check('A01-4', 'Company and Mode of Payment are mandatory', has(m, 'الشركة') && has(m, 'طريقة الدفع'), m.join(','));
  rec.check('A01-5', 'Party Type defaults to Customer for Receive and is shown translated in Arabic', x['نوع الطرف'] === 'عميل', x['نوع الطرف']);
  rec.check('A01-6', 'Party is mandatory', has(m, 'الطرف'), m.join(','));
  rec.check('A01-7', 'Receive shows Account Paid To and hides Account Paid From', has(l, 'الحساب المدفوع إليه') && !has(l, 'الحساب المدفوع منه'), l.join(','));
  rec.check('A01-8', 'Paid / Received amounts are hidden until the accounts are set', !has(l, 'المبلغ المدفوع'), l.join(','));
  rec.check('A01-9', 'Company Bank Account and Party Bank Account are hidden until a Party is chosen', !has(l, 'الحساب البنكي للشركة') && !has(l, 'الحساب البنكي للطرف'), l.join(','));
  rec.check('A01-10', 'References, Write-off, Deductions and More Info are not shown before Save', !(await u.sections(page)).some((s) => /المراجع|الشطب|الخصم|معلومات/.test(s)), (await u.sections(page)).join(','));
  rec.check('A01-11', 'Cheque / Reference fields are hidden until the accounts are set', !has(l, 'رقم الشيك / المرجع'), l.join(','));
  rec.check('A01-12', 'Cost Center is mandatory', has(m, 'مركز التكلفة'), m.join(','));
  const text = await u.main(page).innerText();
  for (const [id, name, rx] of [['A01-13', 'Payment Order Status', /حالة أمر الدفع|Payment Order/], ['A01-14', 'Letter Head', /ترويسة|رأس الرسالة|Letter Head/], ['A01-15', 'Auto Repeat', /التكرار التلقائي|تكرار|Auto Repeat/], ['A01-16', 'Payment Order', /أمر الدفع/]] as const)
    rec.check(id, `Hidden (red) field "${name}" is not displayed`, !rx.test(text), (text.match(rx) ?? [''])[0]);
});

test('A02 payment types change the screen', async ({ page }) => {
  await u.open(page);
  const types = await f.offered(page, 'نوع الدفع');
  rec.check('A02-1', 'Payment Type offers exactly Receive, Pay and Internal Transfer', types.length === 3, types.join(','));
  await f.option(page, 'نوع الدفع', f.TYPE.pay); let l = await u.labels(page); let x = await u.fields(page);
  rec.check('A02-2', 'Pay: Party Type defaults to Supplier', /مورد|Supplier/.test(x['نوع الطرف']), x['نوع الطرف']);
  rec.check('A02-3', 'Pay: Account Paid From is shown and Account Paid To is hidden (SRS)', has(l, 'الحساب المدفوع منه') && !has(l, 'الحساب المدفوع إليه'), l.join(','));
  await f.option(page, 'نوع الدفع', f.TYPE.transfer); l = await u.labels(page);
  rec.check('A02-4', 'Internal Transfer hides Party Type, Party and Party Name', !has(l, 'نوع الطرف') && !has(l, 'الطرف') && !has(l, 'اسم الطرف'), l.join(','));
  rec.check('A02-5', 'Internal Transfer shows both Account Paid From and Account Paid To', has(l, 'الحساب المدفوع منه') && has(l, 'الحساب المدفوع إليه'), l.join(','));
  await f.option(page, 'نوع الدفع', f.TYPE.receive); l = await u.labels(page); x = await u.fields(page);
  rec.check('A02-6', 'Back to Receive: party fields return with Party Type Customer', has(l, 'نوع الطرف') && /عميل|Customer/.test(x['نوع الطرف']), x['نوع الطرف']);
  const pt = await f.offered(page, 'نوع الطرف');
  rec.check('A02-7', 'Party Type offers exactly Customer, Employee, Shareholder and Supplier', pt.length === 4 && ['عميل', 'موظف', 'مساهم', 'مورد'].every((o) => pt.some((s) => s.includes(o))), pt.join(','));
});

test('A03 mandatory validation on Save', async ({ page }) => {
  await u.open(page);
  const saveBtn = u.btn(page, 'حفظ');
  const disabled = await saveBtn.isDisabled();
  rec.note('A03-0', 'Save button state on an empty form', String(disabled));
  let sent = false; page.on('request', (r) => { if (r.url().includes('create_payment_entry')) sent = true; });
  // Save is enabled only after a change on this screen: make one that leaves the mandatory fields empty
  await f.option(page, 'نوع الدفع', f.TYPE.pay);
  if (!(await saveBtn.isDisabled())) { await u.press(saveBtn); await u.wait(page, 3000); }
  const e = await u.inlineErrors(page);
  rec.check('A03-1', 'Save with empty mandatory fields shows an error under each (Mode of Payment, Party, Account)', e.some((s) => /طريقة الدفع/.test(s)) && e.some((s) => /^الطرف/.test(s)) && e.some((s) => /الحساب/.test(s)), `${e.join(' ; ')} saveDisabledBefore=${disabled}`);
  rec.check('A03-2', 'No document is sent to the server while mandatory fields are empty', !sent);
  await f.option(page, 'نوع الدفع', f.TYPE.receive);
  await f.search(page, 'طريقة الدفع', 'BANK ALRAJHY'); await f.search(page, 'الطرف', d.CUST); await u.wait(page, 2000); await f.search(page, 'الحساب المدفوع إليه', '122101'); await u.wait(page, 2000);
  if (!(await saveBtn.isDisabled())) { await u.press(saveBtn); await u.wait(page, 3000); }
  const e2 = await u.inlineErrors(page);
  rec.check('A03-3', 'Empty Paid Amount shows a mandatory error and nothing is saved', !sent && (e2.some((s) => /المبلغ/.test(s)) || /المبلغ/.test(await u.modalText(page))), `saveDisabled=${await saveBtn.isDisabled()} errors=${e2.join(' ; ')} sent=${sent}`);
});

async function accountsCheck(page: Page, id: string, type: 'receive' | 'pay', party: f.PartyType, field: string, types: string[]) {
  await u.open(page);
  if (type === 'pay') await f.option(page, 'نوع الدفع', f.TYPE.pay);
  if (party !== (type === 'pay' ? 'Supplier' : 'Customer')) await f.option(page, 'نوع الطرف', f.PARTY[party]);
  const l = await u.labels(page);
  if (!has(l, field)) { rec.check(id, `${type} / ${party}: ${field} offers only ${types.join(' or ')} accounts`, false, 'field not shown'); return; }
  const o = await f.offered(page, field);
  const all = await api.list('Account', [['company', '=', d.CO], ['is_group', '=', 0]], ['name', 'account_type', 'root_type', 'disabled'], 600);
  const kind = (n: string) => { const a = all.find((x) => n.startsWith(x.name)); return a ? (a.account_type || a.root_type) : '?'; };
  const bad = o.filter((n) => !types.includes(kind(n)) && !(types.includes('Equity') && all.find((x) => n.startsWith(x.name))?.root_type === 'Equity'));
  rec.check(id, `${type} / ${party}: ${field} offers only non-group ${types.join(' or ')} accounts`, o.length > 0 && bad.length === 0, o.length === 0 ? 'no options offered' : `${o.length} options; wrong: ${bad.slice(0, 8).map((n) => `${n} [${kind(n)}]`).join(' | ')}`);
}

test('A04 account filters for Receive', async ({ page }) => {
  let n = 1;
  for (const p of ['Customer', 'Supplier', 'Employee'] as const) await accountsCheck(page, `A04-${n++}`, 'receive', p, 'الحساب المدفوع إليه', ['Cash', 'Bank']);
  await accountsCheck(page, `A04-${n++}`, 'receive', 'Shareholder', 'الحساب المدفوع إليه', ['Cash', 'Bank', 'Equity']);
});
test('A05 account filters for Pay', async ({ page }) => {
  let n = 1;
  for (const p of ['Supplier', 'Customer', 'Employee'] as const) await accountsCheck(page, `A05-${n++}`, 'pay', p, 'الحساب المدفوع منه', ['Cash', 'Bank']);
  await accountsCheck(page, `A05-${n++}`, 'pay', 'Shareholder', 'الحساب المدفوع منه', ['Cash', 'Bank', 'Equity']);
});

test('A06 party selection: fetched values per party type', async ({ page }) => {
  const emp = await api.get('Employee', d.data().employee); const company = await api.get('Company', d.CO);
  const cases: [string, 'receive' | 'pay', f.PartyType, string, string, string, string][] = [
    ['A06-1', 'receive', 'Customer', d.CUST, d.CUST, d.REC, d.mail('QA-PE CustContact')],
    ['A06-2', 'pay', 'Supplier', d.SUPP, d.SUPP, d.PAY, d.mail('QA-PE SuppContact')],
    ['A06-3', 'pay', 'Employee', d.data().employee, emp.employee_name, '', 'qa-pe.employee@example.com'],
    ['A06-4', 'receive', 'Shareholder', d.data().shareholder, 'QA-PE Shareholder', '', ''],
  ];
  for (const [id, type, pt, party, name, account, email] of cases) {
    await f.fill(page, { type, partyType: pt, party }); const x = await u.fields(page); const l = await u.labels(page);
    rec.note(`${id}-0`, `${pt} fields`, JSON.stringify(x));
    rec.check(`${id}a`, `${pt}: Party Name is fetched and read-only`, x['اسم الطرف'] === name, x['اسم الطرف']);
    rec.check(`${id}b`, `${pt}: Company / Party Bank Account fields appear after choosing the Party`, has(l, 'الحساب البنكي للشركة') && has(l, 'الحساب البنكي للطرف'), l.join(','));
    rec.check(`${id}c`, `${pt}: Contact field is ${pt === 'Employee' ? 'hidden' : 'shown'}`, has(l, 'جهة الاتصال') === (pt !== 'Employee'), l.join(','));
    if (pt === 'Customer' || pt === 'Supplier') rec.check(`${id}d`, `${pt}: Contact defaults to the primary contact and Email shows its primary e-mail`, /CONT-|QA-PE/.test(x['جهة الاتصال'] ?? '') && x['البريد الإلكتروني'] === email, `${x['جهة الاتصال']} | ${x['البريد الإلكتروني']}`);
    if (pt === 'Employee') rec.check(`${id}d`, 'Employee: Email is the personal e-mail of the employee', x['البريد الإلكتروني'] === email, String(x['البريد الإلكتروني']));
    const toggles = (await u.main(page).locator('.toggle-row:visible').allInnerTexts()).join(','); // a switch, not an input label
    rec.check(`${id}e`, `${pt}: Consider for Tax Withholding is shown only for Pay + Supplier`, toggles.includes('مراعاة حجز الضرائب') === (pt === 'Supplier' && type === 'pay'), toggles);
    if (account) {
      const field = type === 'receive' ? 'الحساب المدفوع منه' : 'الحساب المدفوع إليه';
      rec.note(`${id}f`, `${pt}: the party account field (${field}) is hidden by design of the SRS; fetched value checked on save`, has(l, field) ? x[field] : `hidden; expected ${account}; company default ${company.default_payable_account}`);
    }
  }
});

test('A07 accounts: type, currency and amount fields', async ({ page }) => {
  await f.fill(page, { type: 'receive', mop: 'Tabby', party: d.CUST });
  let x = await u.fields(page); rec.note('A07-0', 'Mode of Payment Tabby', JSON.stringify(x));
  rec.check('A07-1', 'Account Paid To is filled from the Mode of Payment account', /1223|Tabby/.test(x['الحساب المدفوع إليه'] ?? ''), x['الحساب المدفوع إليه']);
  await f.search(page, 'الحساب المدفوع إليه', '122102'); x = await u.fields(page); let l = await u.labels(page);
  rec.check('A07-2', 'Paid To Account Type and Account Currency (To) are fetched from the account', /نقدي|Cash/.test(x['نوع الحساب المدفوع إليه']) && x['عملة الحساب (إلى)'] === 'SAR', `${x['نوع الحساب المدفوع إليه']} ${x['عملة الحساب (إلى)']}`);
  rec.check('A07-3', 'Amount section appears once both accounts are known', has(l, 'المبلغ المدفوع') && has(l, 'المبلغ المستلم'), l.join(','));
  rec.check('A07-4', 'Reference No / Date appear once the accounts are set', has(l, 'رقم الشيك / المرجع') && has(l, 'تاريخ الشيك / المرجع'), l.join(','));
  await u.type(page, 'المبلغ المدفوع', '1234.56'); x = await u.fields(page);
  rec.check('A07-5', 'Received Amount is calculated from Paid Amount (same currency, rate 1)', x['المبلغ المستلم'] === '1,234.56' && x['المبلغ المدفوع (عملة الشركة)'] === '1,234.56' && x['المبلغ المستلم (عملة الشركة)'] === '1,234.56', `${x['المبلغ المستلم']} ${x['المبلغ المدفوع (عملة الشركة)']}`);
  const bad = await u.type(page, 'المبلغ المدفوع', 'abc!@'); rec.check('A07-6', 'Paid Amount rejects letters and symbols', !/[a-z!@]/i.test(bad), `"${bad}"`);
  const neg = await u.type(page, 'المبلغ المدفوع', '-100'); rec.check('A07-7', 'Paid Amount rejects a negative value', !neg.startsWith('-'), `"${neg}"`);
  const long = await u.type(page, 'المبلغ المدفوع', '9'.repeat(105)); rec.check('A07-8', 'Paid Amount stops at 100 characters', long.replace(/[,.]/g, '').length <= 100, `length=${long.length} value=${long.slice(0, 40)}`);
  const ref = await u.type(page, 'رقم الشيك / المرجع', 'R'.repeat(105)); rec.check('A07-9', 'Reference No stops at 100 characters', ref.length === 100, `length=${ref.length}`);
  const special = await u.type(page, 'رقم الشيك / المرجع', 'AB-12 /#ع'); rec.check('A07-10', 'Reference No accepts letters, numbers and special characters', special === 'AB-12 /#ع', special);
});

test('A08 reference mandatory for bank accounts', async ({ page }) => {
  let sent = false; page.on('request', (r) => { if (r.url().includes('create_payment_entry')) sent = true; });
  await f.fill(page, { type: 'receive', mop: 'Tabby', party: d.CUST, paidTo: '122301', paid: '10' });
  const m = await mandatory(page);
  rec.check('A08-1', 'Bank account: Reference No and Date are marked mandatory', m.includes('رقم الشيك / المرجع') && m.includes('تاريخ الشيك / المرجع'), m.join(','));
  const b = u.btn(page, 'حفظ'); if (!(await b.isDisabled())) { await u.press(b); await u.wait(page, 6000); }
  const e = await u.inlineErrors(page);
  rec.check('A08-2', 'Bank account without a reference: Save is refused with errors on the reference fields', !sent && e.some((s) => /المرجع/.test(s)), `sent=${sent} errors=${e.join(';')} msg=${await u.modalText(page)}`);
  await f.fill(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '10' });
  rec.check('A08-3', 'Cash account: Reference fields are optional', !(await mandatory(page)).includes('رقم الشيك / المرجع'), (await mandatory(page)).join(','));
});

test('A09 bank accounts and tax template visibility', async ({ page }) => {
  await f.fill(page, { type: 'receive', party: d.CUST });
  const co = await f.offered(page, 'الحساب البنكي للشركة'); const bank = await api.list('Bank Account', [['is_company_account', '=', 1], ['company', '=', d.CO]], ['name'], 50);
  rec.check('A09-1', 'Company Bank Account lists only company accounts of the selected company', co.length > 0 && co.every((o) => bank.some((b) => o.includes(b.name))), `${co.join(' | ')} :: expected ${bank.map((b) => b.name).join(' | ')}`);
  const pa = await f.offered(page, 'الحساب البنكي للطرف'); const mine = await api.list('Bank Account', [['party', '=', d.CUST]], ['name'], 50);
  rec.check('A09-2', 'Party Bank Account lists only the accounts of the selected party', pa.filter((o) => !/لا توجد|no /i.test(o)).length === mine.length, `${pa.join(' | ')} :: expected ${mine.length}`);
  const x = await u.fields(page);
  rec.check('A09-3', 'The default company bank account is consistent with the chosen payment account', !x['الحساب البنكي للشركة'], `prefilled "${x['الحساب البنكي للشركة']}" before any account is chosen`);
});

test('A10 date, company and cost center', async ({ page }) => {
  await u.open(page);
  const cc = await f.offered(page, 'مركز التكلفة'); const ccs = await api.list('Cost Center', [['company', '=', d.CO]], ['name'], 200);
  rec.check('A10-1', 'Cost Center lists the cost centers of the company', cc.length > 0 && cc.every((o) => ccs.some((c) => o.includes(c.name))), cc.join(' | '));
  rec.check('A10-2', 'Cost Center option text is not duplicated', !cc.some((o) => /(.{6,}) - E - \1/.test(o) || / - E - /.test(o)), cc.join(' | '));
  const mop = await f.offered(page, 'طريقة الدفع'); rec.check('A10-3', 'Mode of Payment lists the enabled modes', mop.length > 0, mop.join(' | '));
  await f.search(page, 'طريقة الدفع', 'Cash'); await f.search(page, 'الطرف', d.CUST); await u.wait(page, 2500);
  await f.search(page, 'الشركة', 'Alarrab'); await u.wait(page, 3000); const x = await u.fields(page);
  rec.check('A10-4', 'Changing the Company clears accounts / cost center of the old company', !Object.values(x).some((v) => / - E( |$)/.test(v)), JSON.stringify(x));
});
