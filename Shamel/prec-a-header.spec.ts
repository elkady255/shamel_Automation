// Payment Reconciliation - header fields (SRS p.312-313). Read-only: nothing is reconciled.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/prec-ui';
import { api } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('prec-a-header');
test.use({ viewport: { width: 1400, height: 1400 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(240_000);

const labels = async (p: Page) => (await u.main(p).locator('label:visible').allInnerTexts()).map((s) => s.replace('*', '').trim());
const getBtn = (p: Page) => u.press(u.main(p).getByRole('button', { name: u.BTN_GET }));

test('A01 initial state and progressive fields', async ({ page }) => {
  await u.open(page);
  const l0 = await labels(page);
  rec.check('A01-1', 'On open only Company and Party Type are shown (Party, accounts and filters hidden)', l0.includes('الشركة') && l0.includes('نوع الطرف') && !l0.includes('الطرف') && !l0.includes('حساب المدينين / الدائنين') && !l0.includes('من تاريخ الفاتورة'), l0.join(', '));
  rec.check('A01-2', 'No tables and no Allocate / Reconcile before Get Unreconciled Entries', (await u.tables(page).count()) === 0 && !(await u.main(page).getByRole('button', { name: /^(تخصيص|تسوية)$/ }).count()));
  rec.check('A01-3', 'Company is marked mandatory', /\*/.test(await u.label(page, 'الشركة').innerText()));
  await u.pick(page, 'الشركة', u.COMPANY);
  await u.pick(page, 'نوع الطرف', 'Customer', 'العميل');
  const l1 = await labels(page);
  rec.check('A01-4', 'After Party Type has a value the Party field appears', l1.includes('الطرف'), l1.join(', '));
  rec.check('A01-5', 'Accounts and filters stay hidden until Party has a value', !l1.includes('حساب المدينين / الدائنين') && !l1.includes('حساب الدفعات المقدمة الافتراضي') && !l1.includes('من تاريخ الفاتورة'), l1.join(', '));
  await u.pick(page, 'الطرف', 'QA-PR Cust Main'); await u.wait(page, 2000);
  const l2 = await labels(page);
  rec.check('A01-6', 'After Party: Receivable / Payable Account, Default Advance Account and Filters appear', l2.includes('حساب المدينين / الدائنين') && l2.includes('حساب الدفعات المقدمة الافتراضي') && l2.includes('من تاريخ الفاتورة'), l2.join(', '));
  const want = ['من تاريخ الفاتورة', 'إلى تاريخ الفاتورة', 'حد الفواتير', 'من تاريخ الدفع', 'إلى تاريخ الدفع', 'الحد الأدنى لمبلغ الفاتورة', 'الحد الأقصى لمبلغ الفاتورة', 'حد الدفعات', 'الحد الأدنى لمبلغ الدفعة', 'الحد الأقصى لمبلغ الدفعة', 'حساب البنك / النقدية', 'مركز التكلفة', 'المشروع'];
  rec.check('A01-7', 'All 13 SRS filters are present', want.every((w) => l2.includes(w)), want.filter((w) => !l2.includes(w)).join(', '));
  rec.check('A01-8', 'Receivable / Payable Account is marked mandatory, advance account optional', /\*/.test(await u.label(page, 'حساب المدينين / الدائنين').innerText()) && !/\*/.test(await u.label(page, 'حساب الدفعات المقدمة الافتراضي').innerText()));
});

test('A02 mandatory validation', async ({ page }) => {
  // inline errors: return the label of every field that shows one
  const errs = () => u.main(page).locator('label:visible').evaluateAll((ls: any[]) => ls.filter((l) => { let b = l.parentElement; for (let i = 0; i < 2 && b; i++) { if (b.querySelectorAll('label').length === 1 && /هذا الحقل مطلوب/.test(b.innerText)) return true; b = b.parentElement; } return false; }).map((l) => l.innerText.replace('*', '').trim()));
  const run = async () => { await getBtn(page); await u.wait(page, 2500); return errs(); };
  await u.open(page);
  rec.note('A02-0', 'Company value on open (session default)', await u.input(page, 'الشركة').inputValue());
  const co = u.input(page, 'الشركة'); await co.click(); await co.fill(''); await u.wait(page, 800); await u.main(page).locator('h1,h2,h3').first().click({ force: true }); await u.wait(page, 1200);
  const coShown = await co.inputValue();
  let e = await run(); rec.check('A02-1', 'Get with Company cleared and no Party Type shows an error under both', coShown !== '' ? e.includes('نوع الطرف') : e.includes('الشركة') && e.includes('نوع الطرف'), `company="${coShown}" errors=${e.join(', ')}`);
  await u.pick(page, 'الشركة', u.COMPANY);
  e = await run(); rec.check('A02-2', 'Get with Company only shows an error under Party Type only', e.includes('نوع الطرف') && !e.includes('الشركة'), e.join(', '));
  await u.pick(page, 'نوع الطرف', 'Customer', 'العميل');
  e = await run(); rec.check('A02-3', 'Get without Party shows an error under Party', e.includes('الطرف'), e.join(', '));
  await u.pick(page, 'الطرف', 'QA-PR Cust Main'); await u.wait(page, 2000);
  const acc = u.input(page, 'حساب المدينين / الدائنين'); await acc.click(); await acc.fill(''); await u.wait(page, 800); await u.main(page).locator('h1,h2,h3').first().click({ force: true }); await u.wait(page, 1200);
  const shown = await acc.inputValue();
  let called = false; page.on('request', (r) => { if (r.url().includes('get_unreconciled_entries')) called = true; });
  e = await run();
  rec.check('A02-4', 'A cleared Receivable / Payable Account blocks Get with an error (or the value cannot be cleared)', shown !== '' ? true : !called && e.includes('حساب المدينين / الدائنين'), `field="${shown}" requestSent=${called} errors=${e.join(', ')}`);
});

test('A03 dropdown content and filtering', async ({ page }) => {
  await u.open(page);
  const co = await u.options(page, 'الشركة');
  const companies = await api.list('Company', [], ['name'], 100);
  rec.check('A03-1', 'Company list offers records of the Company doctype', co.length > 0 && co.every((c) => companies.some((x) => c.includes(x.name))), `${co.length} of ${companies.length}`);
  const search = await u.options(page, 'الشركة', 'Ahmed'); rec.check('A03-2', 'Company is searchable', search.length === 1 && search[0].includes('Ahmed'), search.join(', '));
  const none = await u.options(page, 'الشركة', 'zzzz-nothing'); rec.check('A03-3', 'Search with no match offers no company', !none.some((o) => companies.some((x) => o.includes(x.name))), none.join(', '));
  await u.pick(page, 'الشركة', u.COMPANY);
  const pt = await u.options(page, 'نوع الطرف'); rec.note('A03-4', 'Party Type options', pt.join(', '));
  rec.check('A03-5', 'Party Type offers Customer and Supplier', pt.some((o) => o.includes('العميل')) && pt.some((o) => o.includes('المورد')), pt.join(', '));
  await u.pick(page, 'نوع الطرف', 'Customer', 'العميل');
  const cust = await u.options(page, 'الطرف', 'QA-PR'); rec.check('A03-6', 'Party is searchable and lists the selected type (customers)', cust.length >= 2 && cust.every((o) => /Cust/.test(o)), cust.join(', '));
  const sup = await u.options(page, 'الطرف', 'QA-PR Supp'); rec.check('A03-7', 'A supplier is not offered when Party Type is Customer', !sup.some((o) => /QA-PR Supp/.test(o)), sup.join(', '));
  await u.pick(page, 'الطرف', 'QA-PR Cust Main'); await u.wait(page, 2500);
  const all = await api.list('Account', [['company', '=', u.COMPANY], ['is_group', '=', 0], ['account_type', 'in', ['Receivable', 'Payable']]], ['name', 'disabled'], 100);
  for (const [id, f] of [['A03-8', 'حساب المدينين / الدائنين'], ['A03-9', 'حساب الدفعات المقدمة الافتراضي']] as const) {
    const o = await u.options(page, f);
    rec.check(id, `${f}: only non-group Receivable / Payable accounts of the company`, o.length > 0 && o.every((x) => all.some((a) => x.includes(a.name))), o.join(' | '));
    rec.check(`${id}b`, `${f}: all enabled matching accounts are offered`, all.filter((a) => !a.disabled).every((a) => o.some((x) => x.includes(a.name))), all.filter((a) => !a.disabled && !o.some((x) => x.includes(a.name))).map((a) => a.name).join(', '));
  }
  const bank = await u.options(page, 'حساب البنك / النقدية');
  const banks = await api.list('Account', [['company', '=', u.COMPANY], ['is_group', '=', 0], ['account_type', 'in', ['Bank', 'Cash']]], ['name'], 100);
  rec.note('A03-10', 'Bank / Cash account options', bank.join(' | '));
  rec.check('A03-11', 'Bank / Cash Account offers only bank or cash accounts of the company', bank.length > 0 && bank.every((x) => banks.some((a) => x.includes(a.name))), bank.filter((x) => !banks.some((a) => x.includes(a.name))).join(' | ') || `${bank.length} options`);
  const cc = await u.options(page, 'مركز التكلفة'); const ccs = await api.list('Cost Center', [['company', '=', u.COMPANY]], ['name', 'is_group'], 200);
  rec.check('A03-12', 'Cost Center offers cost centers of the selected company only', cc.length > 0 && cc.every((x) => ccs.some((a) => x.includes(a.name))), cc.filter((x) => !ccs.some((a) => x.includes(a.name))).join(' | ') || `${cc.length} options`);
  const pr = await u.options(page, 'المشروع'); rec.note('A03-13', 'Project options', pr.join(' | ') || 'none');
});

test('A04 default accounts and re-selection', async ({ page }) => {
  const company = await api.get('Company', u.COMPANY);
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main');
  const acc = () => u.input(page, 'حساب المدينين / الدائنين').inputValue(); const adv = () => u.input(page, 'حساب الدفعات المقدمة الافتراضي').inputValue();
  rec.check('A04-1', 'Customer: account = company Default Receivable Account', (await acc()) === company.default_receivable_account, await acc());
  rec.check('A04-2', 'Customer: advance account = company Default Advance Received Account', (await adv()) === (company.default_advance_received_account ?? ''), `"${await adv()}" company="${company.default_advance_received_account}"`);
  await u.pick(page, 'حساب المدينين / الدائنين', 'usd debtors');
  rec.check('A04-3', 'The fetched account can be edited', /usd debtors/.test(await acc()), await acc());
  await u.getEntries(page); rec.note('A04-4', 'Tables after Get with usd debtors for a SAR customer', String(await u.tables(page).count()));
  await u.closeModals(page);
  await u.pick(page, 'الطرف', 'QA-PR Cust USD'); await u.wait(page, 2500);
  rec.check('A04-5', 'Changing the Party clears the previous entry tables', (await u.tables(page).count()) === 0, String(await u.tables(page).count()));
  await u.pick(page, 'نوع الطرف', 'Supplier', 'المورد');
  let l = await labels(page); const party = (await u.input(page, 'الطرف').inputValue().catch(() => ''));
  rec.check('A04-6', 'Changing Party Type clears the Party and hides dependent fields', party === '' && !l.includes('حساب المدينين / الدائنين'), `party="${party}" labels=${l.join(',')}`);
  await u.pick(page, 'الطرف', 'QA-PR Supp Main'); await u.wait(page, 2500);
  rec.check('A04-7', 'Supplier: account = company Default Payable Account', (await acc()) === company.default_payable_account, await acc());
  rec.check('A04-8', 'Supplier: advance account = company Default Advance Paid Account', (await adv()) === (company.default_advance_paid_account ?? ''), `"${await adv()}" company="${company.default_advance_paid_account}"`);
  await u.pick(page, 'الشركة', 'Alarrab'); await u.wait(page, 2500);
  l = await labels(page);
  const p2 = l.includes('الطرف') ? await u.input(page, 'الطرف').inputValue() : '';
  const a2 = l.includes('حساب المدينين / الدائنين') ? await acc() : '';
  rec.check('A04-9', 'Changing Company does not keep accounts of the old company', !/- E$/.test(a2), `party="${p2}" account="${a2}"`);
});
