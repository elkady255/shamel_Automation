import { test, expect, type Locator, type Page } from '@playwright/test';
import { api } from './helpers/api';

/**
 * Selling SRS v1.0 - Coupon Code (list, Add, Details). Every SRS statement of the three use cases is checked once.
 * The Coupon screens are in Arabic, so the labels below are Arabic. Test coupons are named "PW CC ..." and are never deleted.
 * Tests marked "Known issue" are differences from the SRS found on this server (see the Coupon Code bug report, CC-01 to CC-10);
 * they are expected to fail now and will report "unexpectedly passed" once the difference is fixed.
 * The two delete tests are tagged @delete (they open the confirmation and cancel it): run them with --grep @delete.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
test.describe.configure({ timeout: 170_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

const LOAD = { timeout: 100_000 };
const RULE = 'PRLE-0003'; // the only Pricing Rule with Coupon Code Based enabled on this server
const main = (page: Page) => page.getByRole('main');
const press = (l: Locator) => l.evaluate((e) => (e as HTMLElement).click());
const stamp = () => `${Date.now()}`.slice(-8) + Math.floor(Math.random() * 90 + 10);

async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/coupon-codes${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const field = (page: Page, placeholder: string) => main(page).getByPlaceholder(placeholder);
const nameBox = (p: Page) => field(p, 'أدخل اسم كود الخصم');
const codeBox = (p: Page) => field(p, 'أدخل رمز كود الخصم');
const maxUseBox = (p: Page) => field(p, 'أدخل الحد الأقصى للاستخدام');
const descBox = (p: Page) => field(p, 'أدخل وصفًا أو ملاحظات الاستخدام');
const save = async (p: Page) => { await press(main(p).getByRole('button', { name: 'حفظ', exact: true })); await p.waitForTimeout(2500); };
const pageText = async (p: Page) => clean(await main(p).innerText());

async function pickType(page: Page, label: 'ترويجي' | 'هدية') {
  await press(main(page).getByText('اختر نوع كود الخصم', { exact: true }).first());
  await page.waitForTimeout(700);
  await press(page.getByText(label, { exact: true }).locator('visible=true').first());
  await page.waitForTimeout(800);
}
async function pickRule(page: Page) {
  await field(page, 'ابحث واختر قاعدة التسعير').click({ force: true });
  await page.waitForTimeout(2000);
  await press(page.getByText(new RegExp(RULE)).locator('visible=true').first());
  await page.waitForTimeout(800);
}
/** Picks a day of the current month in one of the two date pickers (0 = Valid From, 1 = Valid To). */
async function pickDay(page: Page, picker: 0 | 1, dayNumber: number) {
  await main(page).locator('input[type=text][placeholder="اختر التاريخ"]').nth(picker).click();
  await page.waitForTimeout(800);
  await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').nth(dayNumber - 1).click();
  await page.waitForTimeout(600);
}
/** A coupon made through the server, for the Details tests. */
const newCoupon = (extra: Record<string, unknown> = {}) => {
  const id = stamp();
  return api.insert('Coupon Code', { coupon_name: `PW CC ${id}`, coupon_code: `PWCC${id}`, coupon_type: 'Promotional', pricing_rule: RULE, valid_from: '2026-11-01', valid_upto: '2026-12-31', maximum_use: 5, description: 'PW coupon', ...extra });
};

// ---------------------------------------------------------------- Coupon Code List
test('TC-CPL-001 the list shows the columns Coupon Code ID, Name, Type and Valid From, with a checkbox per row', srs('Coupon Code List - table'), async ({ page }) => {
  await open(page, '');
  const header = clean(await main(page).locator('thead').first().innerText());
  for (const col of ['رقم المعرف', 'اسم كود الخصم', 'نوع كود الخصم', 'ساري من']) expect(header, col).toContain(col);
  await expect(main(page).locator('tbody tr').first().getByRole('checkbox')).toBeVisible();
});

test('TC-CPL-002 Add Coupon Code opens the Add screen', srs('Add Coupon Code button'), async ({ page }) => {
  await open(page, '');
  await press(main(page).getByRole('button', { name: 'إضافة كود خصم' }));
  await expect(page).toHaveURL(/coupon-codes\/new/);
});

test('TC-CPL-008/009 the Type column shows Promotional or Gift and Valid From shows the date', srs('Coupon type and Valid From values'), async ({ page }) => {
  const c = await newCoupon({ coupon_type: 'Promotional' });
  await open(page, '');
  await main(page).getByPlaceholder('بحث').first().fill(c.name).catch(() => undefined);
  await page.waitForTimeout(2500);
  const rows = (await main(page).locator('tbody tr').allInnerTexts()).map(clean);
  observe('rows: ' + rows.slice(0, 4).join(' || '));
  const row = rows.find((r) => r.includes(c.name));
  expect(row, 'the new coupon is listed').toBeTruthy();
  expect(row).toContain('ترويجي');
  expect(row).toMatch(/01-11-2026/);
});

test('TC-CPL-006 clicking the Coupon Code ID opens the Details screen', srs('Coupon Code ID is clickable'), async ({ page }) => {
  const c = await newCoupon();
  await open(page, '');
  await main(page).getByPlaceholder('بحث').first().fill(c.name).catch(() => undefined);
  await page.waitForTimeout(2500);
  await press(main(page).locator('tbody tr').filter({ hasText: c.name }).first().getByText(c.name, { exact: true }).first());
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(new RegExp('coupon-codes/'));
  expect(page.url()).not.toMatch(/coupon-codes\/?$/);
});

test('TC-CPL-017 selecting a row shows the action bar with Edit, Export, Assign, Add Tags, Print and Delete', srs('List action bar'), async ({ page }) => {
  await open(page, '');
  await main(page).locator('tbody tr').first().getByRole('checkbox').check();
  await page.waitForTimeout(1200);
  const bar = (await page.getByRole('button').locator('visible=true').allInnerTexts()).map(clean);
  observe('action bar: ' + bar.slice(-9).join(' | '));
  for (const action of ['تعديل', 'تصدير', 'اسناد', 'إضافة وسوم', 'طباعة', 'حذف']) expect(bar, action).toContain(action);
});

test('TC-CPL-033 the action bar has a Clear Assignment action', srs('List action bar - Clear assignment'), async ({ page }) => {
  test.fail(true, 'Known issue CC-06: Clear Assignment is missing from the list action bar');
  await open(page, '');
  await main(page).locator('tbody tr').first().getByRole('checkbox').check();
  await page.waitForTimeout(1200);
  const bar = (await page.getByRole('button').locator('visible=true').allInnerTexts()).map(clean);
  expect(bar.some((t) => /مسح الإسناد|إلغاء الإسناد|مسح التعيين|إزالة الإسناد/.test(t)), 'Clear Assignment').toBe(true);
});

test('TC-CPL-018/019 Edit opens a popup with a mandatory Field dropdown and an Update button', srs('List Edit popup'), async ({ page }) => {
  await open(page, '');
  await main(page).locator('tbody tr').first().getByRole('checkbox').check();
  await page.waitForTimeout(1000);
  await press(page.getByRole('button', { name: 'تعديل', exact: true }).locator('visible=true').first());
  await page.waitForTimeout(2000);
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(clean(await dialog.innerText())).toMatch(/الحقل\s*\*/);
  await expect(dialog.getByRole('button', { name: 'تحديث' })).toBeVisible();
  const combo = dialog.getByRole('combobox');
  await combo.click();
  await page.waitForTimeout(1200);
  const options = (await page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean);
  observe('fields offered by the Edit popup: ' + options.join(' | '));
  expect(options.length, 'the Field dropdown lists the Coupon Code fields').toBeGreaterThan(3);
});

test('TC-CPL-021/022 in the Edit popup the Value input changes with the chosen field', srs('List Edit popup - dynamic Value field'), async ({ page }) => {
  await open(page, '');
  await main(page).locator('tbody tr').first().getByRole('checkbox').check();
  await page.waitForTimeout(1000);
  await press(page.getByRole('button', { name: 'تعديل', exact: true }).locator('visible=true').first());
  await page.waitForTimeout(2000);
  const dialog = page.getByRole('dialog');
  const shape = async () => dialog.locator('input,textarea,select').evaluateAll((els) => els.map((e) => `${e.tagName}:${(e as HTMLInputElement).type}:${(e as HTMLInputElement).placeholder}`).join(' ; '));
  const before = await shape();
  const picks: Record<string, string> = {};
  for (const label of ['الحد الأقصى للاستخدام', 'ساري من', 'وصف الكود']) {
    await dialog.getByRole('combobox').click();
    await page.waitForTimeout(800);
    const option = page.getByRole('option', { name: new RegExp(label) }).locator('visible=true').first();
    if (!(await option.count())) { picks[label] = 'option not found'; continue; }
    await press(option);
    await page.waitForTimeout(1200);
    picks[label] = await shape();
  }
  observe('before: ' + before + ' | after choosing: ' + JSON.stringify(picks));
  const shapes = new Set(Object.values(picks).filter((s) => s !== 'option not found'));
  expect(shapes.size, 'the Value input is different for text, date and description fields').toBeGreaterThan(1);
});

// ---------------------------------------------------------------- Add Coupon Code
test('TC-CPA-001 the Add screen shows the SRS fields and hides From External Ecomm platform', srs('Add Coupon Code - components'), async ({ page }) => {
  await open(page, '/new');
  const text = await pageText(page);
  for (const label of ['اسم كود الخصم', 'رمز كود الخصم', 'نوع كود الخصم', 'قاعدة التسعير', 'ساري من', 'ساري حتى', 'الحد الأقصى للاستخدام', 'عدد مرات الاستخدام', 'وصف الكود']) expect(text, label).toContain(label);
  expect(text, 'From External Ecomm platform is hidden').not.toMatch(/ecomm|منصة.*(تجارة|خارجية)|التجارة الإلكترونية/i);
  expect(text, 'Customer is hidden for the default type').not.toContain('العميل');
});

test('TC-CPA-012/013/017 Coupon Name accepts letters, numbers and special characters and stops at 100 characters', srs('Coupon Name length'), async ({ page }) => {
  await open(page, '/new');
  await nameBox(page).fill('Name 12 @#-ا');
  expect(await nameBox(page).inputValue()).toBe('Name 12 @#-ا');
  await nameBox(page).fill('N'.repeat(105));
  expect((await nameBox(page).inputValue()).length).toBe(100);
});

test('TC-CPA-011 Coupon Name of 1 character shows the minimum length message', srs('Coupon Name minimum length'), async ({ page }) => {
  await open(page, '/new');
  await nameBox(page).fill('a');
  await save(page);
  expect(await pageText(page)).toContain('اسم كود الخصم يجب ألا يقل عن حرفين');
});

test('TC-CPA-023 Coupon Code of 1 character shows the minimum length message and the field stops at 100 characters', srs('Coupon Code length'), async ({ page }) => {
  await open(page, '/new');
  await codeBox(page).fill('b');
  await save(page);
  expect(await pageText(page)).toContain('رمز كود الخصم يجب ألا يقل عن حرفين');
  await codeBox(page).fill('C'.repeat(105));
  expect((await codeBox(page).inputValue()).length).toBe(100);
});

test('TC-CPA-027 a Coupon Code that already exists is refused and no coupon is added', srs('Coupon Code must be unique'), async ({ page }) => {
  const before = (await api.list('Coupon Code', [], ['name'], 1000)).length;
  const existing = (await api.list('Coupon Code', [], ['coupon_code'], 1))[0].coupon_code as string;
  const id = stamp();
  await open(page, '/new');
  await nameBox(page).fill(`PW CC ${id}`);
  await codeBox(page).fill(existing);
  await pickType(page, 'ترويجي');
  await pickRule(page);
  await pickDay(page, 0, 3);
  await pickDay(page, 1, 25);
  await maxUseBox(page).fill('5');
  await save(page);
  const text = await pageText(page);
  observe('after Save: ' + text.slice(0, 300));
  const after = (await api.list('Coupon Code', [], ['name'], 1000)).length;
  expect(after, 'no coupon is added').toBe(before);
});

test('TC-CPA-037/039 Coupon Type offers Promotional and Gift and is mandatory', srs('Coupon Type'), async ({ page }) => {
  await open(page, '/new');
  await press(main(page).getByText('اختر نوع كود الخصم', { exact: true }).first());
  await page.waitForTimeout(800);
  for (const label of ['ترويجي', 'هدية']) await expect(page.getByText(label, { exact: true }).locator('visible=true').first(), label).toBeVisible();
  await page.keyboard.press('Escape');
  await nameBox(page).fill('PW type check');
  await save(page);
  expect(await pageText(page)).toContain('نوع كود الخصم مطلوب');
});

test('TC-CPA-042 Customer shows for Gift and is hidden for Promotional', srs('Customer appears only for Gift Card'), async ({ page }) => {
  await open(page, '/new');
  await pickType(page, 'هدية');
  expect(await pageText(page), 'shown for Gift').toContain('العميل');
  await press(main(page).getByText('هدية', { exact: true }).first());
  await page.waitForTimeout(700);
  await press(page.getByText('ترويجي', { exact: true }).locator('visible=true').first());
  await page.waitForTimeout(800);
  expect(await pageText(page), 'hidden again for Promotional').not.toContain('العميل');
});

test('TC-CPA-045 Customer is optional for a Gift coupon', srs('Customer is optional'), async ({ page }) => {
  test.fail(true, 'Known issue CC-05: Customer is mandatory for a Gift coupon (the SRS says optional)');
  await open(page, '/new');
  await pickType(page, 'هدية');
  await save(page);
  expect(await pageText(page), 'no Customer message').not.toMatch(/العميل مطلوب/);
});

test('TC-CPA-051 the Pricing Rule list shows only Coupon Code Based rules', srs('Pricing Rule filter'), async ({ page }) => {
  const rules = await api.list('Pricing Rule', [], ['name', 'coupon_code_based'], 500);
  const based = rules.filter((r: any) => r.coupon_code_based).map((r: any) => r.name);
  const others = rules.filter((r: any) => !r.coupon_code_based).map((r: any) => r.name);
  await open(page, '/new');
  await field(page, 'ابحث واختر قاعدة التسعير').click({ force: true });
  await page.waitForTimeout(2500);
  const shown = clean((await page.locator('li, [role=option]').locator('visible=true').allInnerTexts()).join(' | '));
  observe(`coupon based: ${based.join(', ')}; not coupon based: ${others.join(', ')}; dropdown: ${shown.slice(0, 200)}`);
  for (const n of based) expect(shown, n).toContain(n);
  for (const n of others) expect(shown, n).not.toContain(n);
});

test('TC-CPA-051 the Pricing Rule list has no extra Add New option', srs('Pricing Rule dropdown'), async ({ page }) => {
  test.fail(true, 'Known issue CC-08: an "إضافة جديد" option is listed in the Pricing Rule dropdown');
  await open(page, '/new');
  await field(page, 'ابحث واختر قاعدة التسعير').click({ force: true });
  await page.waitForTimeout(2500);
  expect(await page.locator('.cs-add-option').locator('visible=true').count(), 'no Add New option').toBe(0);
});

test('TC-CPA-053 Pricing Rule is mandatory', srs('Pricing Rule mandatory'), async ({ page }) => {
  await open(page, '/new');
  await nameBox(page).fill('PW rule check');
  await save(page);
  expect(await pageText(page)).toContain('قاعدة التسعير مطلوبة');
});

test('TC-CPA-058 Valid From and Valid To can be chosen from a calendar', srs('Valid From / Valid To pickers'), async ({ page }) => {
  await open(page, '/new');
  await pickDay(page, 0, 20);
  expect(await main(page).locator('input[type=text][placeholder="اختر التاريخ"]').nth(0).inputValue()).toMatch(/^20-\d\d-\d{4}$/);
  await pickDay(page, 1, 28);
  expect(await main(page).locator('input[type=text][placeholder="اختر التاريخ"]').nth(1).inputValue()).toMatch(/^28-\d\d-\d{4}$/);
});

test('TC-CPA-059 Valid From, Valid To and Maximum Use are optional', srs('Valid From, Valid To and Maximum Use are optional'), async ({ page }) => {
  test.fail(true, 'Known issue CC-04: the three fields are mandatory on the screen (the SRS says optional)');
  await open(page, '/new');
  await nameBox(page).fill('PW optional check'); // messages only appear once the form has been touched (CC-11)
  await save(page);
  const text = await pageText(page);
  expect(text).not.toContain('تاريخ البداية مطلوب');
  expect(text).not.toContain('تاريخ الانتهاء مطلوب');
  expect(text).not.toContain('الحد الأقصى للاستخدام مطلوب');
});

test('TC-CPA-063 Valid To earlier than Valid From is refused on Save', srs('Valid To must be greater than Valid From'), async ({ page }) => {
  const before = (await api.list('Coupon Code', [], ['name'], 1000)).length;
  const id = stamp();
  await open(page, '/new');
  await nameBox(page).fill(`PW CC ${id}`);
  await codeBox(page).fill(`PWCC${id}`);
  await pickType(page, 'ترويجي');
  await pickRule(page);
  await pickDay(page, 0, 20);
  await pickDay(page, 1, 3);
  await maxUseBox(page).fill('5');
  await save(page);
  const after = (await api.list('Coupon Code', [], ['name'], 1000)).length;
  observe(`coupons before ${before}, after ${after}; page: ${(await pageText(page)).slice(0, 200)}`);
  expect(after, 'the coupon is not added').toBe(before);
  expect(await pageText(page)).toContain('تاريخ الانتهاء يجب');
});

test('TC-CPA-063/064 the server also refuses Valid To earlier than Valid From', srs('Valid To must be greater than Valid From (server)'), async () => {
  test.fail(true, 'Known issue CC-01: the server accepts Valid To earlier than (or equal to) Valid From');
  const err = await newCoupon({ valid_from: '2026-11-30', valid_upto: '2026-11-15' }).then(() => '', (e) => String(e));
  observe(err ? 'refused' : 'accepted');
  expect(err, 'must be refused').not.toBe('');
});

test('TC-CPA-011/023/077 the server refuses a Name or Code shorter than 2 characters and a negative Maximum Use', srs('Field rules (server)'), async () => {
  test.fail(true, 'Known issue CC-02 / CC-03: the server accepts a 1-character name, a 1-character code and a negative Maximum Use');
  const results = [await newCoupon({ coupon_name: 'x' }).then(() => '', () => 'refused'), await newCoupon({ coupon_code: 'y' }).then(() => '', () => 'refused'), await newCoupon({ maximum_use: -3 }).then(() => '', () => 'refused')];
  observe('refused: ' + JSON.stringify(results));
  expect(results.every((r) => r === 'refused')).toBe(true);
});

test('TC-CPA-075 Maximum Use accepts numbers only', srs('Maximum Use numbers only'), async ({ page }) => {
  await open(page, '/new');
  await maxUseBox(page).fill('ab-c1#2');
  expect(await maxUseBox(page).inputValue()).toBe('12');
});

test('TC-CPA-083 Maximum Use stops at 100 characters', srs('Maximum Use maximum length 100'), async ({ page }) => {
  test.fail(true, 'Known issue CC-07: Maximum Use stops at 10 digits');
  await open(page, '/new');
  await maxUseBox(page).fill('9'.repeat(120));
  expect((await maxUseBox(page).inputValue()).length).toBe(100);
});

test('TC-CPA-087 Used is a read only field', srs('Used is read only'), async ({ page }) => {
  await open(page, '/new');
  const used = main(page).locator('input').filter({ has: page.locator('xpath=self::*') }).and(main(page).locator('input[disabled]'));
  expect(await used.count(), 'a disabled input exists (Used)').toBeGreaterThan(0);
});

test('TC-CPA-091/092 Coupon Description accepts 500 characters, stops there, and asks for 3 characters', srs('Coupon Description length'), async ({ page }) => {
  await open(page, '/new');
  await descBox(page).fill('D'.repeat(520));
  expect((await descBox(page).inputValue()).length).toBe(500);
  await descBox(page).fill('xy');
  await save(page);
  expect(await pageText(page)).toContain('يجب أن يتكون الوصف من 3 أحرف على الأقل');
});

test('TC-CPA-014/026/053 Save on an untouched form shows a message for each mandatory field', srs('Save - validation per field'), async ({ page }) => {
  test.fail(true, 'Known issue CC-11: Save on an untouched form shows no message at all');
  await open(page, '/new');
  await save(page);
  const text = await pageText(page);
  for (const message of ['اسم كود الخصم مطلوب', 'رمز كود الخصم مطلوب', 'قاعدة التسعير مطلوبة']) expect(text, message).toContain(message);
  await expect(page).toHaveURL(/coupon-codes\/new/);
});

test('TC-CPA-098 Save after typing one field shows a message for each other mandatory field', srs('Save - validation per field'), async ({ page }) => {
  await open(page, '/new');
  await nameBox(page).fill('PW partial');
  await save(page);
  const text = await pageText(page);
  for (const message of ['رمز كود الخصم مطلوب', 'نوع كود الخصم مطلوب', 'قاعدة التسعير مطلوبة']) expect(text, message).toContain(message);
  await expect(page).toHaveURL(/coupon-codes\/new/);
});

test('TC-CPA-102 Save with valid data adds the coupon with the entered values', srs('Save - coupon added successfully'), async ({ page }) => {
  const id = stamp();
  const name = `PW CC ${id}`;
  await open(page, '/new');
  await nameBox(page).fill(name);
  await codeBox(page).fill(`PWCC${id}`);
  await pickType(page, 'ترويجي');
  await pickRule(page);
  await pickDay(page, 0, 3);
  await pickDay(page, 1, 26);
  await maxUseBox(page).fill('7');
  await descBox(page).fill('PW added from the screen');
  await save(page);
  await page.waitForTimeout(2500);
  observe('after Save: ' + page.url() + ' | ' + (await pageText(page)).slice(0, 150));
  const [saved] = await api.list('Coupon Code', [['coupon_code', '=', `PWCC${id}`]], ['name', 'coupon_name', 'coupon_type', 'pricing_rule', 'valid_from', 'valid_upto', 'maximum_use', 'description', 'used'], 1);
  expect(saved, 'the coupon exists').toBeTruthy();
  expect(saved).toMatchObject({ coupon_name: name, coupon_type: 'Promotional', pricing_rule: RULE, maximum_use: 7, description: 'PW added from the screen' });
  expect(saved.valid_from).toMatch(/-03$/);
  expect(saved.valid_upto).toMatch(/-26$/);
  expect(saved.used).toBe(0);
});

// ---------------------------------------------------------------- Coupon Code Details
test('TC-CPD-002 the Details screen shows the data entered during creation', srs('Details - input fields'), async ({ page }) => {
  const c = await newCoupon({ description: 'PW details check', maximum_use: 9 });
  await open(page, `/${encodeURIComponent(c.name)}`);
  const values = await main(page).locator('input,textarea').evaluateAll((els) => els.map((e) => (e as HTMLInputElement).value));
  observe('field values: ' + values.filter(Boolean).join(' | '));
  for (const v of [c.name, c.coupon_code, RULE, '01-11-2026', '31-12-2026', '9', 'PW details check']) expect(values.join('|'), v).toContain(v);
});

test('TC-CPD-003 the Used field shows the number of redemptions and cannot be edited', srs('Used - read only'), async ({ page }) => {
  const [used] = await api.list('Coupon Code', [['used', '>', 0]], ['name', 'used'], 1);
  test.skip(!used, 'no coupon has been redeemed on this server');
  await open(page, `/${encodeURIComponent(used.name)}`);
  const box = main(page).locator('input[disabled]').last();
  expect(await box.inputValue()).toBe(String(used.used));
});

test('TC-CPD-004 the Details screen has Assign, Tags, Attachments, Print, Share, Delete and Add / Edit Coupon Conditions', srs('Fixed page actions'), async ({ page }) => {
  const c = await newCoupon();
  await open(page, `/${encodeURIComponent(c.name)}`);
  for (const title of ['تعيين إلى', 'الوسوم', 'المرفقات', 'طباعة', 'مشاركة', 'حذف']) await expect(page.locator(`button[title="${title}"]`), title).toBeVisible();
  await expect(main(page).getByRole('button', { name: 'إضافة / تعديل شروط الكود' })).toBeVisible();
});

test('TC-CPD-032 Add / Edit Coupon Conditions opens the selected Pricing Rule', srs('Add / Edit Coupon Conditions'), async ({ page }) => {
  const c = await newCoupon();
  await open(page, `/${encodeURIComponent(c.name)}`);
  await press(main(page).getByRole('button', { name: 'إضافة / تعديل شروط الكود' }));
  await page.waitForTimeout(4000);
  expect(page.url()).toContain(`pricing-rules/${RULE}`);
});

test('TC-CPD-023 editing the description on the Details screen is saved', srs('Details - edit and save'), async ({ page }) => {
  const c = await newCoupon({ description: 'PW before edit' });
  await open(page, `/${encodeURIComponent(c.name)}`);
  await descBox(page).fill('PW after edit');
  await save(page);
  const [saved] = await api.list('Coupon Code', [['name', '=', c.name]], ['description'], 1);
  expect(saved.description).toBe('PW after edit');
});

test('TC-CPD-024 editing the description to 2 characters shows the minimum length message', srs('Details - validation'), async ({ page }) => {
  const c = await newCoupon();
  await open(page, `/${encodeURIComponent(c.name)}`);
  await descBox(page).fill('xy');
  await save(page);
  expect(await pageText(page)).toContain('يجب أن يتكون الوصف من 3 أحرف على الأقل');
});

test('TC-CPD-006/009 Name and Code can be edited on the Details screen', srs('Details - view / edit'), async ({ page }) => {
  // The SRS says the details can be viewed and updated; on this server the two fields are disabled (to be confirmed with the SRS owner).
  test.fail(true, 'Open question: Coupon Name and Coupon Code are disabled on the Details screen');
  const c = await newCoupon();
  await open(page, `/${encodeURIComponent(c.name)}`);
  await expect(nameBox(page).or(main(page).locator('input[type=text]').nth(1))).toBeEnabled();
});

// ---------------------------------------------------------------- Delete (tag @delete: opens the confirmation and cancels it)
test('TC-CPL-036 Delete from the list asks for a confirmation @delete', srs('List - Delete confirmation'), async ({ page }) => {
  const c = await newCoupon();
  await open(page, '');
  await main(page).getByPlaceholder('بحث').first().fill(c.name).catch(() => undefined);
  await page.waitForTimeout(2500);
  await main(page).locator('tbody tr').filter({ hasText: c.name }).first().getByRole('checkbox').check();
  await page.waitForTimeout(1000);
  await press(page.getByRole('button', { name: 'حذف', exact: true }).locator('visible=true').first());
  await page.waitForTimeout(2000);
  const confirm = page.locator('.shamel-confirm-dialog');
  await expect(confirm, 'a confirmation is shown').toBeVisible();
  const dialog = clean(await confirm.innerText());
  observe('confirmation: ' + dialog);
  expect(dialog).toMatch(/متأكد|نهائيا/);
  await press(confirm.getByRole('button', { name: 'إلغاء' })); // nothing is deleted
  await page.waitForTimeout(1000);
  const [still] = await api.list('Coupon Code', [['name', '=', c.name]], ['name'], 1);
  expect(still, 'the coupon is still there').toBeTruthy();
});

test('TC-CPD-040 Delete on the Details screen asks for a confirmation @delete', srs('Details - Delete confirmation'), async ({ page }) => {
  const c = await newCoupon();
  await open(page, `/${encodeURIComponent(c.name)}`);
  await press(page.locator('button[title="حذف"]'));
  await page.waitForTimeout(2000);
  const confirm = page.locator('.shamel-confirm-dialog');
  await expect(confirm, 'a confirmation is shown').toBeVisible();
  const dialog = clean(await confirm.innerText());
  observe('confirmation: ' + dialog);
  expect(dialog).toMatch(/متأكد|نهائيا/);
  await press(confirm.getByRole('button', { name: 'إلغاء' })); // nothing is deleted
  await page.waitForTimeout(1000);
  const [still] = await api.list('Coupon Code', [['name', '=', c.name]], ['name'], 1);
  expect(still, 'the coupon is still there').toBeTruthy();
});
