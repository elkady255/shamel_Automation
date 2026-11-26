// Journal Entry - add screen fields, rows, rules and Quick Entry (SRS p.375-389). Saves only drafts when a rule is checked.
import { test } from '@playwright/test';
import * as j from './helpers/je-ui';
import { recorder } from './helpers/si-ui';

const { u, f, d } = j;
const rec = recorder('je-a-form');
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(480_000);

const TYPES = ['قيد يومية', 'قيد يومية بين الشركات', 'قيد بنكي', 'قيد نقدي', 'قيد بطاقة ائتمان', 'إشعار مدين', 'إشعار دائن', 'قيد مقابل', 'قيد ضريبة إنتاج', 'قيد شطب', 'قيد افتتاحي', 'قيد إهلاك', 'استبعاد أصل', 'إعادة تقييم سعر الصرف', 'أرباح أو خسائر فروق العملة', 'إيرادات مؤجلة', 'مصروفات مؤجلة'];
const required = async (p: import('@playwright/test').Page, text: string) => (await u.main(p).locator('label:visible').allInnerTexts()).some((s) => s.replace(/\s+/g, ' ').trim().startsWith(text) && s.includes('*'));

test('A01 default state', async ({ page }) => {
  await j.open(page); const x = await u.fields(page), l = await u.labels(page), t = await j.toggles(page), body = await j.bodyText(page);
  rec.check('A01-1', 'Company is shown and mandatory', 'الشركة' in x && (await required(page, 'الشركة')), x['الشركة']);
  rec.check('A01-2', 'Series is mandatory and filled', (await required(page, 'السلسلة')) && !!x['السلسلة'], x['السلسلة']);
  rec.check('A01-3', 'Entry Type defaults to Journal Entry and is shown translated', x['نوع القيد'] === 'قيد يومية', x['نوع القيد']);
  const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
  rec.check('A01-4', 'Posting Date defaults to the current date and is mandatory', x['تاريخ الترحيل'] === today && (await required(page, 'تاريخ الترحيل')), `${x['تاريخ الترحيل']} today=${today}`);
  rec.check('A01-5', 'Multi Currency is a switch, off by default', x['عملات متعددة'] === 'off', x['عملات متعددة']);
  rec.check('A01-6', 'Consider for Tax Withholding is hidden for a Journal Entry', !t.some((s) => /ضرائب/.test(s)), t.join(','));
  rec.check('A01-7', 'Is System Generated and Amended From are hidden on a new entry', !l.some((s) => /من النظام|معدل من|عُدل من/.test(s)) && !/منشأ بواسطة النظام/.test(body), l.join(','));
  rec.check('A01-8', 'Hidden (red) Periodic Accounting fields are not shown', !/محاسبة دورية|المحاسبة الدورية|أصول المخزون/.test(body), body.slice(0, 300));
  rec.check('A01-9', 'Hidden (red) Auto Repeat is not shown', !/تكرار تلقائي|التكرار التلقائي/.test(body));
  rec.check('A01-10', 'Total Debit, Total Credit and Difference are read only labels', ['إجمالي المدين', 'إجمالي الدائن', 'الفرق (مدين - دائن)'].every((k) => k in x) && (await u.label(page, 'إجمالي المدين').locator('xpath=..').locator('input:not([disabled]):not([readonly])').count()) === 0);
  rec.check('A01-11', 'Reference Number and Reference Date are optional for a Journal Entry', !(await required(page, 'الرقم المرجعي')) && !(await required(page, 'تاريخ المرجع')));
  rec.check('A01-12', 'Clearance Date is hidden before submit', !l.includes('تاريخ التسوية'), l.join(','));
  rec.check('A01-13', 'Quick Entry is offered before Save', j.has(await j.buttons(page), 'إدخال سريع'));
  await u.input(page, 'نوع القيد').click(); await j.wait(2000); const o = (await page.locator('.cs-option:visible').allInnerTexts()).map((s) => s.trim());
  rec.check('A01-14', 'Entry Type offers the 17 SRS values (no Periodic Accounting Entry)', o.length === 17 && TYPES.every((v) => o.some((s) => s.replace(/[ىي]/g, 'ي') === v.replace(/[ىي]/g, 'ي'))), `${o.length}: ${o.join(' | ')}`);
});

test('A02 entry type dependent fields', async ({ page }) => {
  await j.open(page, 'قيد بنكي');
  rec.check('A02-1', 'Bank Entry makes Reference Number and Date mandatory', (await required(page, 'الرقم المرجعي')) && (await required(page, 'تاريخ المرجع')));
  await j.rows(page, j.pair('5')); let s = await j.send(page, 'حفظ');
  rec.check('A02-2', 'Bank Entry without a reference is not saved and the fields show errors', !j.nameOf(page) && (s.errors.length > 0 || s.msg !== ''), `${s.errors} ${s.msg.slice(0, 300)}`);
  for (const [id, type, shown] of [['A02-3', 'إشعار دائن', true], ['A02-4', 'إشعار مدين', true], ['A02-5', 'قيد نقد', false]] as const) {
    await j.open(page, type); const t = await j.toggles(page);
    rec.check(id, `${type}: Consider for Tax Withholding is ${shown ? 'shown' : 'hidden'}`, t.some((x) => /ضرائب/.test(x)) === shown, t.join(','));
  }
});

test('A03 accounting rows and amount rules', async ({ page }) => {
  await j.open(page); await j.addRow(page);
  const head = (await u.tablesInfo(page))[0]?.head.filter(Boolean) ?? [];
  rec.check('A03-1', 'Table columns: No., Account, Party Type, Party, Debit, Credit', ['الرقم', 'الحساب', 'نوع الطرف', 'الطرف', 'مدين', 'دائن'].every((h) => head.includes(h)), head.join(' | '));
  const types = await j.cellOptions(page, 0, 1); rec.note('A03-2', 'party types offered', types.join(' | '));
  rec.check('A03-3', 'Party is disabled until a Party Type is chosen', (await j.cell(page, 0, 2).isDisabled()) );
  await j.pickCell(page, 0, 1, '', 'عميل'); const parties = await j.cellOptions(page, 0, 2, d.CUST);
  rec.check('A03-4', 'Party lists records of the chosen Party Type', parties.length > 0 && parties.every((x) => x.includes('QA-PE Cust')), parties.slice(0, 6).join(' | '));
  await j.pickCell(page, 0, 0, j.CASH);
  const letters = await j.typeCell(page, 0, 3, 'abc!@'); rec.check('A03-5', 'Debit accepts numbers only', !/[a-z!@]/i.test(letters), `"${letters}"`);
  const dec = await j.typeCell(page, 0, 3, '12.55'); rec.check('A03-6', 'Debit accepts decimals', /12\.55/.test(dec), dec);
  const neg = await j.typeCell(page, 0, 3, '-7'); rec.check('A03-7', 'Debit rejects a negative value', !neg.startsWith('-'), `"${neg}"`);
  await j.typeCell(page, 0, 3, '10');
  const locked = !(await j.cell(page, 0, 4).isEditable({ timeout: 3000 }).catch(() => false));
  rec.check('A03-8', 'Debit and Credit cannot both be entered on one row in the table (the other box is locked)', locked, `credit editable=${!locked}`);
  await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await j.wait(2500);
  const inPopup = (label: string) => j.modal(page).locator('.qr-field').filter({ has: page.locator('label', { hasText: new RegExp('^\s*' + label + '\s*$') }) }).locator('input').first();
  const open = await inPopup('دائن').isEditable({ timeout: 3000 }).catch(() => false);
  if (open) { await j.watch(page); await inPopup('دائن').fill('10'); await inPopup('دائن').press('Tab'); await j.modal(page).locator('button').filter({ hasText: /^\s*حفظ\s*$/ }).last().click(); await j.wait(2500); }
  const popupMsg = `${await j.flashed(page)} ${await j.dialogText(page)}`; await j.closeAll(page);
  const debit = await j.cell(page, 0, 3).inputValue(), credit = await j.cell(page, 0, 4).inputValue();
  rec.check('A03-9', 'Edit Row also prevents Debit and Credit together on one row', !(Number(debit) && Number(credit)), `popup credit editable=${open} debit=${debit} credit=${credit} msg=${popupMsg.slice(0, 200)}`);
});

test('A04 totals, difference and make difference entry', async ({ page }) => {
  await j.open(page); await j.rows(page, [{ account: j.CASH, debit: '70' }]);
  let x = await u.fields(page);
  rec.check('A04-1', 'Totals and Difference follow the rows (70 / 0 / 70)', /70\.00/.test(x['إجمالي المدين']) && /^0\.00/.test(x['إجمالي الدائن']) && /70\.00/.test(x['الفرق (مدين - دائن)']), `${x['إجمالي المدين']} ${x['إجمالي الدائن']} ${x['الفرق (مدين - دائن)']}`);
  const diffButton = () => u.main(page).getByRole('button', { name: /قيد (ال)?فرق|فرق القيد|إنشاء قيد الفرق|Difference/ });
  const shown = (await diffButton().count()) > 0;
  rec.check('A04-2', 'Make Difference Entry button appears while Difference is not zero', shown, (await j.buttons(page)).join(' | '));
  if (shown) {
    await diffButton().first().click(); await j.wait(3000);
    const n = await j.table(page).locator('tbody tr').count(); const credit = n > 1 ? await j.cell(page, 1, 4).inputValue() : ''; x = await u.fields(page);
    rec.check('A04-3', 'It adds a balancing row (credit 70) and the Difference becomes zero', n === 2 && /70/.test(credit) && /^0\.00/.test(x['الفرق (مدين - دائن)']), `rows=${n} credit=${credit} diff=${x['الفرق (مدين - دائن)']}`);
    rec.check('A04-4', 'The button disappears when the entry is balanced', (await diffButton().count()) === 0);
  }
  await j.open(page); await j.rows(page, j.pair('30')); await j.typeCell(page, 1, 4, '20'); const s = await j.send(page, 'حفظ');
  rec.check('A04-5', 'An unbalanced entry cannot be saved', !j.nameOf(page) && s.msg !== '', s.msg.slice(0, 300));
});

test('A05 mandatory checks on save', async ({ page }) => {
  await j.open(page); let s = await j.send(page, 'حفظ');
  rec.check('A05-1', 'An untouched form is not saved', !j.nameOf(page), `enabled=${s.enabled} ${s.msg}`);
  await j.addRow(page); await j.typeCell(page, 0, 3, '5'); s = await j.send(page, 'حفظ');
  rec.check('A05-2', 'A row without an Account is refused with an error', !j.nameOf(page) && (s.errors.length > 0 || s.msg !== '' || /مطلوب|إلزامي/.test(await j.bodyText(page))), `${s.errors} ${s.msg.slice(0, 300)}`);
  await j.open(page); await u.type(page, 'الرقم المرجعي', '55'); s = await j.send(page, 'حفظ');
  rec.check('A05-3', 'Saving without any accounting row shows an error', !j.nameOf(page) && (s.errors.length > 0 || s.msg !== '' || /مطلوب|أضف صف|صفًا واحد/.test(await j.bodyText(page))), `enabled=${s.enabled} ${s.errors} ${s.msg.slice(0, 300)}`);
});

test('A06 row Edit Row and column settings', async ({ page }) => {
  await j.open(page); await j.rows(page, [{ account: j.CASH, debit: '5' }]);
  const click = async () => { await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await j.wait(2500); return j.modalText(page); };
  let t = await click(); await page.screenshot({ path: 'Shamel/je-results/a06-edit.png' });
  const want = ['الحساب', 'نوع الحساب', 'الحساب البنكي', 'نوع الطرف', 'الطرف', 'مركز التكلفة', 'المشروع', 'مدين', 'دائن', 'نوع المرجع', 'اسم المرجع', 'تاريخ استحقاق المرجع', 'رقم تفصيل المرجع', 'نوع سند الدفعة المقدمة', 'رقم سند الدفعة المقدمة', 'حساب حجز ضرائب', 'دفعة مقدمة', 'ملاحظة المستخدم'];
  rec.check('A06-1', 'Edit Row shows the SRS fields', want.every((w) => t.includes(w)), `missing=${want.filter((w) => !t.includes(w))} popup=${t}`);
  rec.check('A06-2', 'Account Currency and company currency amounts are hidden without Multi Currency', !/عملة الحساب|سعر الصرف|بعملة الشركة|بعملة الحساب/.test(t), t);
  const select = j.modal(page).locator('.qr-field').filter({ hasText: 'نوع المرجع' }).first();
  await select.locator('.select-head, input:visible').first().click(); await j.wait(2000);
  const options = (await page.locator('.select-dropdown.is-teleported:visible').last().innerText().catch(() => '')).split(/\r?\n/).map((s) => s.trim()).filter((s) => s && s !== 'لا يوجد');
  await page.screenshot({ path: 'Shamel/je-results/a06-reftype.png' });
  rec.note('A06-3', 'Reference Type options', options.join(' | '));
  if (options.length) {
    rec.check('A06-4', 'Reference Type offers the visible SRS doctypes', ['فاتورة مبيعات', 'فاتورة مشتريات', 'قيد يومية', 'أمر بيع', 'أمر شراء', 'أصل', 'إعادة تقييم سعر الصرف', 'قيد دفع', 'معاملة بنكية'].every((w) => options.some((o) => o.includes(w))), options.join(' | '));
    rec.check('A06-5', 'Hidden (red) reference types are not offered (Expense Claim, Loan, Payroll, Employee Advance, Invoice Discounting, Fees, FnF)', !options.some((o) => /مصروف|قرض|رواتب|سلفة موظف|خصم الفواتير|خصم فواتير|رسوم|التسوية النهائية|Expense|Loan|Payroll|Fees|Discount/i.test(o)), options.join(' | '));
  }
  await page.keyboard.press('Escape'); await j.closeAll(page); await j.open(page); await j.addRow(page);
  await u.main(page).locator('button[title="إعدادات الجدول"]').first().click(); await j.wait(2000); t = await j.modalText(page);
  rec.check('A06-6', 'Table settings has Column width, Add / Remove columns, Update and Reset to default', /عرض العمود/.test(t) && /إضافة\/إزالة/.test(t) && /إعادة تعيين/.test(t) && /تحديث/.test(t), t);
  const width = j.modal(page).locator('input:visible').first(); await width.click(); await width.press('Control+a'); await width.pressSequentially('abc'); const a = await width.inputValue(); await width.press('Control+a'); await width.pressSequentially('12345'); const b = await width.inputValue();
  rec.check('A06-7', 'Column width accepts numbers only', !/[a-z]/i.test(a), `"${a}"`);
  rec.check('A06-8', 'Column width stops at 3 characters', b.length <= 3, `"${b}"`);
  await j.modal(page).getByText('إضافة/إزالة حقول').click(); await j.wait(2000); t = await j.modalText(page);
  const cols = ['الحساب', 'نوع الطرف', 'الطرف', 'مدين', 'دائن', 'الحساب البنكي', 'مركز التكلفة', 'المشروع', 'عملة الحساب', 'سعر الصرف', 'مدين بعملة الشركة', 'دائن بعملة الشركة', 'نوع المرجع', 'اسم المرجع', 'تاريخ استحقاق المرجع', 'نوع سند الدفعة المقدمة', 'رقم سند الدفعة المقدمة', 'حساب حجز ضرائب', 'دفعة مقدمة', 'ملاحظة المستخدم'];
  rec.check('A06-9', 'Add / Remove columns lists the SRS columns', cols.every((w) => t.includes(w)), `missing=${cols.filter((w) => !t.includes(w))}`);
});

test('A07 quick entry rules', async ({ page }) => {
  await j.open(page); await u.main(page).getByRole('button', { name: 'إدخال سريع' }).click(); await j.wait(2500);
  const m = j.modal(page); let t = await j.modalText(page);
  rec.check('A07-1', 'Pop-up has Amount, Debit Account, Credit Account, Date, Remark, Series (all mandatory) and Save', ['المبلغ', 'الحساب المدين', 'الحساب الدائن', 'التاريخ', 'ملاحظات', 'السلسلة'].every((w) => new RegExp(w + '\\s*\\*').test(t)) && /حفظ/.test(t), t);
  await m.locator('button').filter({ hasText: /^\s*حفظ\s*$/ }).click(); await j.wait(2000); t = await j.modalText(page); await page.screenshot({ path: 'Shamel/je-results/a07-empty.png' });
  rec.check('A07-2', 'Saving it empty shows an error for the fields', t !== 'NO POPUP OPENED' && (t.match(/مطلوب|إلزامي|يرجى/g) ?? []).length >= 3, t);
  const amount = m.locator('input:visible').first();
  await amount.click(); await amount.pressSequentially('abc-'); const a = await amount.inputValue(); await amount.fill(''); await amount.pressSequentially('12.5'); const b = await amount.inputValue(); await amount.fill(''); await amount.pressSequentially('9'.repeat(105)); const c = await amount.inputValue();
  rec.check('A07-3', 'Amount accepts integers and decimals only', !/[a-z]/i.test(a) && b === '12.5', `"${a}" "${b}"`);
  rec.check('A07-4', 'Amount stops at 100 characters', c.length <= 100, `length=${c.length}`);
});
