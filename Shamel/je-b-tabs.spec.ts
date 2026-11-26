// Journal Entry - references, multi currency, More Info, write off and tax withholding (SRS p.377-403). CHANGES DATA.
import { test, type Page } from '@playwright/test';
import * as j from './helpers/je-ui';
import { recorder } from './helpers/si-ui';

const { u, f, d, api } = j;
const rec = recorder('je-b-tabs');
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(480_000);

const field = (p: Page, label: string) => j.modal(p).locator('.qr-field').filter({ has: p.locator('label', { hasText: new RegExp('^\\s*' + label + '\\s*\\*?\\s*$') }) }).first();
/** Chooses a value of a dropdown inside the Edit Row pop-up. */
async function popupPick(p: Page, label: string, query: string, option = query) {
  const box = field(p, label); await box.locator('.select-head, input:visible').first().click(); await j.wait(1500);
  const search = p.getByPlaceholder('بحث', { exact: true }).filter({ visible: true });
  if (await search.count()) { await search.last().fill(query); await j.wait(2500); } else if (await box.locator('input:visible').count()) { await box.locator('input:visible').first().fill(query); await j.wait(2500); }
  await p.locator('.cs-option:visible, [role=option]:visible, .select-option:visible').filter({ hasText: option }).or(p.getByText(option).filter({ visible: true })).first().click(); await j.wait(2000);
}

test('B01 pay an invoice through a journal entry reference', async ({ page }) => {
  const inv = (await d.salesInvoice(950, 3)).name as string; // a fresh invoice on every run
  await j.open(page); await j.rows(page, [{ account: j.CASH, debit: '100' }, { account: '1210', partyType: 'عميل', party: d.CUST, credit: '100' }]);
  await u.main(page).locator('button[title="تعديل الصف"]').nth(1).click(); await j.wait(2500);
  await popupPick(page, 'نوع المرجع', '', 'فاتورة مبيعات'); await popupPick(page, 'اسم المرجع', inv, inv);
  await page.screenshot({ path: 'Shamel/je-results/b01-edit.png' });
  const t = await j.modalText(page);
  rec.check('B01-1', 'Reference Name is chosen from the doctype selected in Reference Type', t.includes(inv), t);
  await j.modal(page).locator('button').filter({ hasText: /^\s*حفظ\s*$/ }).last().click(); await j.wait(2500);
  let s = await j.send(page, 'حفظ'); const name = j.nameOf(page);
  rec.check('B01-2', 'The entry with a reference saves', !!name, `${s.msg} ${s.errors} ${s.body}`);
  if (!name) return;
  d.remember('JE-B01', name); let doc = await j.je(name);
  rec.check('B01-3', 'Reference type, name and due date are stored', doc.accounts[1].reference_type === 'Sales Invoice' && doc.accounts[1].reference_name === inv, JSON.stringify([doc.accounts[1].reference_type, doc.accounts[1].reference_name, doc.accounts[1].reference_due_date]));
  await j.openDoc(page, name); s = await j.send(page, 'اعتماد', /submit/i); await j.settled(name, 1); doc = await j.je(name);
  const i = await api.get('Sales Invoice', inv);
  rec.check('B01-4', 'Submit reduces the invoice balance by 100', doc.docstatus === 1 && i.outstanding_amount === 850, `docstatus=${doc.docstatus} outstanding=${i.outstanding_amount} ${s.msg}`);
});

test('B02 multi currency: rate and company amounts', async ({ page }) => {
  await j.open(page); await j.toggle(page, 'عملات متعددة'); await j.addRow(page);
  const head = (await u.tablesInfo(page))[0]?.head.filter(Boolean) ?? [];
  rec.check('B02-1', 'With Multi Currency the columns become Debit / Credit in Account Currency', head.some((h) => /مدين بعملة الحساب/.test(h)) && head.some((h) => /دائن بعملة الحساب/.test(h)), head.join(' | '));
  await j.pickCell(page, 0, 0, 'usd debtors'); await j.pickCell(page, 0, 1, '', 'عميل'); await j.pickCell(page, 0, 2, d.CUST_USD); await j.typeCell(page, 0, 4, '10');
  await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await j.wait(2500); const t = await j.modalText(page); await page.screenshot({ path: 'Shamel/je-results/b02-edit.png' });
  rec.check('B02-2', 'Edit Row shows Account Currency, Exchange Rate and the company currency amounts', /عملة الحساب/.test(t) && /سعر الصرف/.test(t) && /بعملة الشركة/.test(t), t);
  const rate = field(page, 'سعر الصرف').locator('input:visible').first();
  const v = (await rate.count()) ? await rate.inputValue() : await field(page, 'سعر الصرف').innerText();
  rec.check('B02-3', 'Exchange Rate 3.75 is fetched from Currency Exchange', /3\.75/.test(v), v);
  const canEdit = (await rate.count()) > 0 && (await rate.isEditable());
  rec.check('B02-4', 'An authorised user can change the rate', canEdit, `editable=${canEdit}`);
  if (canEdit) { await rate.fill('3.8'); await rate.press('Tab'); await j.wait(1500); }
  await j.modal(page).locator('button').filter({ hasText: /^\s*حفظ\s*$/ }).last().click(); await j.wait(2500);
  await j.addRow(page); await j.pickCell(page, 1, 0, j.CASH); await j.typeCell(page, 1, 3, '38');
  const s = await j.send(page, 'حفظ'); const name = j.nameOf(page);
  rec.check('B02-5', 'The entry saves with the manual rate', !!name, `${s.msg} ${s.errors} ${s.body}`);
  if (!name) return;
  const doc = await j.je(name);
  rec.check('B02-6', 'Stored: rate 3.8, credit 10 USD = 38 SAR', doc.accounts[0].exchange_rate === 3.8 && doc.accounts[0].credit === 38 && doc.accounts[0].credit_in_account_currency === 10, JSON.stringify(doc.accounts.map((a: j.Doc) => [a.account_currency, a.exchange_rate, a.credit_in_account_currency, a.credit, a.debit])));
});

test('B03 More Info tab fields and stored values', async ({ page }) => {
  await j.open(page); await j.rows(page, [{ account: j.CASH, debit: '6' }, { account: '1210', partyType: 'عميل', party: d.CUST, credit: '6' }]);
  await j.tab(page, j.MORE); const x = await u.fields(page), body = await j.bodyText(page);
  const want = ['رقم الفاتورة', 'تاريخ الفاتورة', 'تاريخ الاستحقاق', 'معالجة المحاسبة المؤجلة', 'عكس لـ', 'قيد المخزون', 'ادفع إلى / استلم من', 'قيد افتتاحي', 'الدفتر المالي', 'ملاحظات مخصصة', 'الملاحظات', 'طريقة الدفع', 'الطرف غير مطلوب'];
  rec.check('B03-1', 'More Info shows the SRS fields', want.every((w) => w in x), `missing=${want.filter((w) => !(w in x))}`);
  rec.check('B03-2', 'Hidden (red) Payment Order is not shown', !/أمر الدفع/.test(body), 'أمر الدفع (Payment Order) is displayed');
  rec.check('B03-3', 'Hidden (red) Letter Head, Total Amount, From Template and Title are not shown', !/ترويسة|إجمالي المبلغ|المبلغ الإجمالي|من القالب|من قالب/.test(body) && !('العنوان' in x), body.slice(0, 600));
  rec.check('B03-4', 'Inter Company Reference and the Write Off section are hidden for a Journal Entry', !('مرجع قيد اليومية بين الشركات' in x) && !('مبلغ الشطب' in x), Object.keys(x).join(','));
  const area = () => u.main(page).locator('textarea:visible').first(); const editable = async () => (await area().count()) > 0 && (await area().isEditable());
  rec.check('B03-5', 'Remarks is read only while Custom Remark is off', !(await editable()));
  await j.toggle(page, 'ملاحظات مخصصة'); const on = await editable();
  rec.check('B03-6', 'Custom Remark enables Remarks', on);
  await u.type(page, 'رقم الفاتورة', 'QA-BILL-9'); await f.day(page, 'تاريخ الفاتورة', 20); await f.day(page, 'تاريخ الاستحقاق', 28);
  await u.type(page, 'ادفع إلى / استلم من', 'QA payee'); await f.search(page, 'طريقة الدفع', 'Cash');
  let s = { msg: '', errors: [] as string[], body: '' };
  if (on) {
    await area().fill('ab'); await area().press('Tab'); s = await j.send(page, 'حفظ');
    rec.check('B03-7', 'Remarks shorter than 3 characters are refused with an error', !j.nameOf(page), `name=${j.nameOf(page)} ${s.msg} ${s.errors}`);
    if (j.nameOf(page)) return;
    await j.closeAll(page); await area().fill(''); await area().pressSequentially('x'.repeat(505)); const len = (await area().inputValue()).length;
    rec.check('B03-8', 'Remarks stops at 500 characters', len === 500, `length=${len}`);
    await area().fill('ملاحظة QA 123 !@#'); await area().press('Tab');
  }
  s = await j.send(page, 'حفظ'); const name = j.nameOf(page);
  rec.check('B03-9', 'The entry saves with the More Info values', !!name, `${s.msg} ${s.errors} ${s.body}`);
  if (!name) return;
  d.remember('JE-B03', name); const doc = await j.je(name);
  const stored = { bill_no: doc.bill_no, bill_date: doc.bill_date?.slice(-2), due_date: doc.due_date?.slice(-2), pay_to_recd_from: doc.pay_to_recd_from, mode_of_payment: doc.mode_of_payment, custom_remark: doc.custom_remark, user_remark: doc.user_remark, remark: doc.remark };
  rec.check('B03-10', 'Bill No, Bill Date, Due Date, Pay To, Mode of Payment and the remark are stored', doc.bill_no === 'QA-BILL-9' && stored.bill_date === '20' && stored.due_date === '28' && doc.pay_to_recd_from === 'QA payee' && doc.mode_of_payment === 'Cash' && `${doc.user_remark} ${doc.remark}`.includes('ملاحظة QA 123'), JSON.stringify(stored));
});

test('B04 write off entry', async ({ page }) => {
  await j.open(page, 'قيد شطب'); await j.tab(page, j.MORE); let x = await u.fields(page);
  rec.check('B04-1', 'Write Off Entry shows Write Off Based On, Write Off Amount and Get Outstanding Invoices', 'شطب بناءً على' in x && 'مبلغ الشطب' in x && j.has(await j.buttons(page), 'جلب الفواتير المستحقة'), Object.keys(x).join(','));
  await u.input(page, 'شطب بناءً على').click(); await j.wait(1500); const o = (await page.locator('.cs-option:visible').allInnerTexts()).map((s) => s.trim()); await page.keyboard.press('Escape');
  rec.check('B04-2', 'Based On offers Accounts Receivable and Accounts Payable', o.length === 2, o.join(' | '));
  const letters = await u.type(page, 'مبلغ الشطب', 'abc'); rec.check('B04-3', 'Write Off Amount accepts numbers only', !/[a-z]/i.test(letters), `"${letters}"`);
  await u.type(page, 'مبلغ الشطب', '60'); await j.watch(page); await j.click(page, 'جلب الفواتير المستحقة'); await j.wait(8000);
  const msg = `${await j.flashed(page)} ${await j.dialogText(page)}`; await j.closeAll(page); await j.tab(page, j.DETAILS);
  const info = (await u.tablesInfo(page))[0]; const count = await j.table(page).locator('tbody tr').count().catch(() => 0);
  await page.screenshot({ path: 'Shamel/je-results/b04.png', fullPage: true });
  rec.check('B04-4', 'Get Outstanding Invoices adds the open invoices within the limit to the accounting entries', count > 0, `rows=${count} msg=${msg} ${JSON.stringify(info?.rows?.slice(0, 4))}`);
  x = await u.fields(page); rec.note('B04-5', 'totals after fetching', `${x['إجمالي المدين']} ${x['إجمالي الدائن']}`);
});

test('B05 tax withholding on a credit / debit note', async ({ page }) => {
  await j.open(page, 'إشعار مدين'); await j.toggle(page, 'احتسابها لحجز الضرائب');
  let x = await u.fields(page); const b = await j.buttons(page);
  rec.check('B05-1', 'Turning it on shows Tax Withholding Category (mandatory) and the Tax Withholding tab', 'فئة حجز الضرائب' in x && j.has(b, 'حجز الضرائب') && (await u.main(page).locator('label:visible', { hasText: 'فئة حجز الضرائب' }).first().innerText()).includes('*'), `${Object.keys(x)} ${b}`);
  await j.rows(page, [{ account: 'QA-PR Payable', partyType: 'مورد', party: d.SUPP, debit: '1000' }, { account: j.CASH, credit: '1000' }]);
  let s = await j.send(page, 'حفظ');
  rec.check('B05-2', 'Saving without the category is refused', !j.nameOf(page), `${s.msg} ${s.errors}`);
  await j.closeAll(page); if (j.nameOf(page)) return;
  await f.search(page, 'فئة حجز الضرائب', d.data().twc); await j.wait(3000);
  await j.tab(page, 'حجز الضرائب'); x = await u.fields(page); const t = await j.toggles(page), body = await j.bodyText(page); await page.screenshot({ path: 'Shamel/je-results/b05-tab.png', fullPage: true });
  rec.check('B05-3', 'The tab offers Tax Withholding Group, Ignore Threshold and Edit Entries', Object.keys(x).some((k) => /مجموعة/.test(k)) && t.some((k) => /تجاهل/.test(k)) && t.some((k) => /تعديل/.test(k)), `${Object.keys(x)} | ${t}`);
  rec.check('B05-4', 'Hidden (red) withholding fields are not shown', !/الترحيل من|Migration|شهادة/.test(body));
  s = await j.send(page, 'حفظ'); const name = j.nameOf(page);
  rec.check('B05-5', 'The entry saves with tax withholding', !!name, `${s.msg} ${s.errors} ${s.body}`);
  if (!name) return;
  d.remember('JE-B05', name); const doc = await j.je(name);
  rec.check('B05-6', 'A withholding entry of 5% = 50 is calculated', (doc.tax_withholding_entries ?? []).length === 1 && Math.abs(doc.tax_withholding_entries[0].withholding_amount) === 50, JSON.stringify({ apply: doc.apply_tds, cat: doc.tax_withholding_category, entries: (doc.tax_withholding_entries ?? []).map((e: j.Doc) => [e.taxable_amount, e.tax_rate, e.withholding_amount, e.status]), accounts: doc.accounts.map((a: j.Doc) => [a.account, a.debit, a.credit]) }));
  await j.openDoc(page, name); await j.tab(page, 'حجز الضرائب'); const info = (await u.tablesInfo(page)).find((i) => i.head.some((h) => /نسبة/.test(h)));
  rec.check('B05-7', 'The Tax Withholding Entries table shows category, rate and amounts', !!info && info.rows.length > 0, JSON.stringify(info));
  await j.openDoc(page, name); s = await j.send(page, 'اعتماد', /submit/i); await j.settled(name, 1); const after = await j.je(name); const g = await j.gl(name);
  rec.check('B05-8', 'Submit posts the withholding of 50 to the withholding account', after.docstatus === 1 && g.some((e) => /QA-PE WHT/.test(e.account) && Math.abs(e.credit - e.debit) === 50), `${after.docstatus} ${s.msg} ${JSON.stringify(g.map((e) => [e.account, e.debit, e.credit]))}`);
});
