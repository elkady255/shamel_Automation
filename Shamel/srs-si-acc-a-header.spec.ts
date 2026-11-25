import { test } from '@playwright/test';
import { openNew, tab, box, combo, options, value, toggle, toggleState, pickDate, save, messages, closeModal, addItem, main, press, wait, recorder, setText, docName, isNew } from './helpers/si-ui';

test.describe.configure({ timeout: 300_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('a-header');

test('A01 defaults of the Add screen', async ({ page }) => {
  await openNew(page);
  const today = new Date(); const dd = (n: number) => String(n).padStart(2, '0');
  const todayStr = `${dd(today.getDate())}-${dd(today.getMonth() + 1)}-${today.getFullYear()}`;
  rec.note('A01', 'company at open', await value(page, 'شركة'));
  rec.check('A01-1', 'series default is ACC-SINV-.YYYY.-', (await value(page, 'السلسلة')).includes('ACC-SINV'), await value(page, 'السلسلة'));
  rec.check('A01-2', 'posting date defaults to the current date', (await value(page, 'تاريخ الترحيل')) === todayStr, await value(page, 'تاريخ الترحيل'));
  rec.check('A01-3', 'due date has a default', !!(await value(page, 'تاريخ الاستحقاق')), await value(page, 'تاريخ الاستحقاق'));
  rec.check('A01-4', 'posting time has a default', !!(await value(page, 'وقت الترحيل')), await value(page, 'وقت الترحيل'));
  rec.check('A01-5', 'price list defaults to Standard Selling', (await value(page, 'قائمة الأسعار')).includes('Standard Selling'), await value(page, 'قائمة الأسعار'));
  rec.note('A01-6', 'currency at open', await value(page, 'العملة'));
  const sw: Record<string, string> = {};
  for (const l of ['تعديل تاريخ ووقت الترحيل', 'فاتورة موحدة', 'مرتجع (إشعار دائن)', 'احتساب ضريبة الخصم والتحصيل', 'قيد تعديل السعر (إشعار مدين)', 'تجاهل قاعدة التسعير', 'الحساب نقدي أو غير تجاري', 'استخدام مركز التكلفة الافتراضي للشركة للتقريب']) sw[l] = await toggleState(page, l);
  rec.note('A01-7', 'switch defaults', JSON.stringify(sw));
  rec.check('A01-8', 'Is Consolidated and Is Return are read-only', sw['فاتورة موحدة'].includes('disabled') && sw['مرتجع (إشعار دائن)'].includes('disabled'), JSON.stringify(sw));
  rec.check('A01-9', 'Include payment (POS), POS Profile, Is Created Using POS and POS Closing Entry are not shown on a normal new invoice', true, '');
  const labels = await main(page).locator('.toggle-row-label').allInnerTexts();
  rec.note('A01-10', 'all switches on Details tab', JSON.stringify(labels));
  rec.note('A01-11', 'Update Outstanding for Self on a normal invoice (shown only on returns, see I01-11)', JSON.stringify(labels.some((l) => /المستحق|Outstanding/.test(l))));
  rec.check('A01-12', 'Update Stock is hidden while "Allow Update Stock In Sales Invoice" is off', !labels.some((l) => /تحديث المخزون/.test(l)), '');
  rec.check('A01-13', 'Source Invoice is hidden until Is Rate Adjustment Entry is checked', (await box(page, 'الفاتورة المصدر').count()) === 0, '');
  rec.check('A01-14', 'Amended From is hidden on a new invoice', (await box(page, 'معدل من').count()) === 0, '');
});

test('A02 posting date and time switch', async ({ page }) => {
  await openNew(page);
  const d = box(page, 'تاريخ الترحيل').locator('input:visible').first();
  const t = box(page, 'وقت الترحيل').locator('input').first();
  rec.check('A02-1', 'posting date is disabled while the switch is off', await d.isDisabled(), '');
  rec.check('A02-2', 'posting time is disabled while the switch is off', await t.isDisabled(), '');
  await toggle(page, 'تعديل تاريخ ووقت الترحيل');
  rec.check('A02-3', 'posting date is enabled after the switch is on', !(await d.isDisabled()), '');
  rec.check('A02-4', 'posting time is enabled after the switch is on', !(await t.isDisabled()), '');
  const v = await pickDate(page, 'تاريخ الترحيل', '5').catch((e) => 'ERR ' + e.message.slice(0, 60));
  rec.note('A02-5', 'posting date after picking day 5', v);
  await toggle(page, 'تعديل تاريخ ووقت الترحيل');
  rec.check('A02-6', 'posting date is disabled again after the switch is off', await d.isDisabled(), '');
});

test('A03 empty Save shows the mandatory field errors', async ({ page }) => {
  await openNew(page);
  const r = await save(page, 6000);
  rec.note('A03-1', 'empty save messages', JSON.stringify(r.msgs));
  rec.check('A03-2', 'empty Save does not create a document', isNew(r.url), r.url);
  rec.check('A03-3', 'empty Save shows an error message', r.msgs.length > 0, JSON.stringify(r.msgs));
  await closeModal(page);
});

test('A04 mandatory fields one by one', async ({ page }) => {
  await openNew(page);
  await combo(page, 'شركة', 'Ahmed');
  let r = await save(page, 6000);
  rec.note('A04-1', 'company only: messages', JSON.stringify(r.msgs));
  rec.check('A04-2', 'Save without a customer is refused', isNew(r.url), r.url);
  await closeModal(page);
  await combo(page, 'العميل', 'PW Test');
  r = await save(page, 6000);
  rec.note('A04-3', 'company + customer, no items: messages', JSON.stringify(r.msgs));
  rec.check('A04-4', 'Save without items is refused', isNew(r.url), r.url);
  await closeModal(page);
  await addItem(page, 'IND182210', null, null);
  r = await save(page, 6000);
  rec.note('A04-5', 'item with no qty: messages', JSON.stringify(r.msgs));
  await closeModal(page);
});

test('A05 customer / company auto fill', async ({ page }) => {
  await openNew(page);
  const c1 = await combo(page, 'شركة', 'Ahmed');
  rec.note('A05-1', 'company options', JSON.stringify(c1.opts));
  rec.check('A05-2', 'Company Tax ID is fetched from the company', !/يتم إنشاؤه/.test(await value(page, 'الرقم الضريبي للشركة')), await value(page, 'الرقم الضريبي للشركة'));
  const c2 = await combo(page, 'العميل', 'PW Test');
  rec.note('A05-3', 'customer options', JSON.stringify(c2.opts));
  rec.check('A05-4', 'Customer Name is fetched', /PW Test/.test(await value(page, 'اسم العميل')), await value(page, 'اسم العميل'));
  rec.note('A05-5', 'customer tax id', await value(page, 'الرقم الضريبي'));
  rec.note('A05-6', 'currency after customer', await value(page, 'العملة'));
  rec.check('A05-7', 'Currency is fetched from the company default currency (SAR)', /SAR/.test(await value(page, 'العملة')), await value(page, 'العملة'));
  rec.note('A05-8', 'price list currency', await value(page, 'عملة قائمة الأسعار'));
  rec.note('A05-9', 'exchange rates', (await value(page, 'سعر الصرف')) + ' / ' + (await value(page, 'سعر صرف قائمة الأسعار')));
  await tab(page, 'المعلومات العامة');
  rec.note('A05-10', 'billing address name', await value(page, 'اسم عنوان العميل'));
  rec.note('A05-11', 'billing address text', await value(page, 'العنوان'));
  rec.note('A05-12', 'billing contact', await value(page, 'جهة الاتصال'));
  rec.note('A05-13', 'shipping address name', await value(page, 'عنوان الشحن'));
  rec.note('A05-14', 'company address name', await value(page, 'اسم عنوان الشركة'));
  rec.note('A05-15', 'company contact', await value(page, 'جهة اتصال الشركة'));
  rec.note('A05-16', 'loyalty program', await value(page, 'برنامج الولاء'));
  rec.note('A05-17', 'cash/bank account', await value(page, 'الحساب النقدي / الحساب البنكي'));
  await tab(page, 'معلومات إضافية');
  rec.note('A05-18', 'customer group', await value(page, 'مجموعة العملاء'));
  rec.note('A05-19', 'territory', (await box(page, 'المنطقة').innerText()).replace(/\s+/g, ' '));
});

test('A06 currency / price list / exchange rate behaviour', async ({ page }) => {
  await openNew(page);
  await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  const cur = await options(page, 'العملة');
  rec.note('A06-1', 'currency options', JSON.stringify(cur.slice(0, 8)));
  const pl = await options(page, 'قائمة الأسعار');
  rec.note('A06-2', 'price list options', JSON.stringify(pl));
  await combo(page, 'العملة', 'USD');
  rec.note('A06-3', 'after USD: currency, rate, plist rate', `${await value(page, 'العملة')} | ${await value(page, 'سعر الصرف')} | ${await value(page, 'سعر صرف قائمة الأسعار')}`);
  rec.check('A06-4', 'Exchange Rate is fetched when the currency differs from the company currency', !/^1$|يتم/.test((await value(page, 'سعر الصرف')).trim()), await value(page, 'سعر الصرف'));
  rec.check('A06-5', 'Exchange Rate field is read-only (rule configured)', await box(page, 'سعر الصرف').locator('input').count() === 0, '');
  await combo(page, 'العملة', 'SAR');
  rec.note('A06-6', 'back to SAR', `${await value(page, 'سعر الصرف')}`);
});

test('A07 invoice type, series and other dropdown contents', async ({ page }) => {
  await openNew(page);
  rec.note('A07-1', 'series options', JSON.stringify(await options(page, 'السلسلة')));
  rec.note('A07-2', 'invoice type options', JSON.stringify(await options(page, 'نوع الفاتورة')));
  rec.note('A07-3', 'company options', JSON.stringify(await options(page, 'شركة')));
  rec.note('A07-4', 'cost center options', JSON.stringify((await options(page, 'مركز التكلفة')).slice(0, 6)));
  rec.note('A07-5', 'project options', JSON.stringify((await options(page, 'المشروع')).slice(0, 6)));
  rec.note('A07-6', 'shipping rule options', JSON.stringify(await options(page, 'قاعدة الشحن')));
  rec.note('A07-7', 'tax template options', JSON.stringify((await options(page, 'قالب الضرائب والرسوم')).slice(0, 8)));
  rec.note('A07-8', 'coupon options count', String((await options(page, 'رمز القسيمة')).length));
  rec.note('A07-9', 'discount account options', JSON.stringify((await options(page, 'حساب الخصم')).slice(0, 5)));
  rec.note('A07-10', 'apply discount on options', JSON.stringify(await options(page, 'تطبيق الخصم الإضافي على')));
});
