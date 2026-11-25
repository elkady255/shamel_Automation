import { test, type Page } from '@playwright/test';
import { snapshot, openNew, tab, combo, options, box, value, save, messages, closeModal, addItem, main, press, wait, recorder, summary, num, setText, toggle, toggleState, isNew, docName } from './helpers/si-ui';

test.describe.configure({ timeout: 420_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('d-general');
const tables = async (p: Page) => main(p).locator('table').evaluateAll((ts: any[]) => ts.filter((t) => t.offsetParent).map((t) => [...t.querySelectorAll('thead th')].map((h: any) => h.innerText.replace(/\s+/g, ' ').trim()).join(' | ')));
async function ready(page: Page, rate = '1000') {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '1', null); await wait(page, 4000);
  const r = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1);
  await r.fill(rate); await r.press('Tab'); await wait(page, 1500);
}

test('D01 payments and changes sections', async ({ page }) => {
  await ready(page); await tab(page, 'المعلومات العامة');
  rec.note('D01-1', 'tables on tab', JSON.stringify(await tables(page)));
  rec.note('D01-2', 'cash/bank options', JSON.stringify((await options(page, 'الحساب النقدي / الحساب البنكي')).slice(0, 6)));
  rec.note('D01-3', 'account for change options', JSON.stringify((await options(page, 'حساب مبلغ التغيير')).slice(0, 4)));
  const btns = await main(page).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || '').replace(/\s+/g, ' ').trim()).filter((s) => s && !/إشعار|تحديد|الكل|مقروء/.test(s)));
  rec.note('D01-4', 'buttons on tab', JSON.stringify(btns));
  rec.check('D01-5', 'Add Row button exists for Sales Invoice Payments', btns.some((b) => /إضافة دفعة|إضافة صف/.test(b)), JSON.stringify(btns));
  rec.check('D01-6', 'Get Advance Received button exists on a draft', btns.some((b) => /جلب الدفعات|الدفعات المقدمة/.test(b)), JSON.stringify(btns));
});

test('D02 advance payment defaults', async ({ page }) => {
  await ready(page); await tab(page, 'المعلومات العامة');
  rec.note('D02-1', 'Allocate Advance Automatically (FIFO)', await toggleState(page, 'تخصيص الدفعة المقدمة تلقائيًا (الوارد أولاً يُصرف أولاً)').catch(() => 'n/a'));
  const sw = await main(page).locator('.toggle-row-label').allInnerTexts();
  rec.note('D02-2', 'all switches on General tab', JSON.stringify(sw));
  rec.note('D02-3', 'Only include allocated payments against reference SO', await toggleState(page, 'تضمين الدفعات المخصصة مقابل أمر البيع المرجعي فقط'));
  const off = await toggle(page, 'تخصيص الدفعة المقدمة تلقائيًا (الوارد أولاً يُصرف أولاً)').catch(() => null);
  rec.note('D02-4', 'after turning FIFO off, "only include allocated" visible?', JSON.stringify(await main(page).locator('.toggle-row-label').allInnerTexts()));
  rec.check('D02-5', 'Only Include Allocated Payments is shown only while FIFO is checked', !(await main(page).locator('.toggle-row-label').allInnerTexts()).some((s) => /مقابل أمر البيع المرجعي/.test(s)), '');
});

test('D03 write off rules', async ({ page }) => {
  await ready(page, '500'); await tab(page, 'المعلومات العامة');
  const wo = box(page, 'مبلغ الشطب').locator('input').first();
  await wo.click(); await wo.type('900', { delay: 30 }); await wo.press('Tab'); await wait(page, 2000);
  rec.note('D03-1', 'write off 900 on a 500 invoice: company amount', await summary(page, 'مبلغ الشطب (بعملة الشركة الأساسية)'));
  const acc = await combo(page, 'حساب الشطب', '').catch(() => null); rec.note('D03-2', 'write off account', JSON.stringify(acc && acc.picked));
  await combo(page, 'مركز تكلفة الشطب', '').catch(() => null);
  const s = await save(page, 9000); rec.note('D03-3', 'save', JSON.stringify(s.msgs) + ' ' + s.url);
  rec.check('D03-4', 'write off larger than the invoice total is refused (old SI-01)', isNew(s.url), s.url, 'SI-01');
  await closeModal(page);
});

test('D04 loyalty redemption section', async ({ page }) => {
  await ready(page); await tab(page, 'المعلومات العامة');
  rec.note('D04-1', 'loyalty program value', await value(page, 'برنامج الولاء'));
  const before = Object.keys(await snapshot(page));
  await toggle(page, 'استرداد نقاط الولاء'); await wait(page, 1500);
  const afterSnap = await snapshot(page); const after = Object.keys(afterSnap);
  const added = after.filter((l) => !before.includes(l)); rec.note('D04-2', 'fields shown after Redeem Loyalty Points', JSON.stringify(added));
  rec.check('D04-3', 'Loyalty Points, Loyalty Amount, Redemption Account and Redemption Cost Center appear when Redeem is checked', ['نقاط الولاء', 'قيمة نقاط الولاء', 'حساب الاسترداد', 'مركز تكلفة الاسترداد'].every((x) => added.some((a) => a.includes(x.split(' ')[0]))), JSON.stringify(added));
  rec.check('D04-4', 'Restore Redeemed Loyalty Points is hidden on a normal invoice', !after.some((l) => /استعادة|استرجاع نقاط/.test(l)), '');
});

test('D05 addresses and contacts', async ({ page }) => {
  await ready(page); await tab(page, 'المعلومات العامة');
  const bill = await options(page, 'اسم عنوان العميل'); rec.note('D05-1', 'billing address options (' + bill.length + ')', JSON.stringify(bill.slice(0, 12)));
  rec.note('D05-2', 'selected billing', await value(page, 'اسم عنوان العميل'));
  const before = await value(page, 'العنوان');
  if (bill.length > 1) { await combo(page, 'اسم عنوان العميل', '', 1); await wait(page, 1500); rec.note('D05-3', 'choosing another billing address refreshes the address text', (await value(page, 'العنوان')) !== before, before + ' -> ' + (await value(page, 'العنوان'))); }
  rec.note('D05-4', 'contact options', JSON.stringify(await options(page, 'جهة الاتصال')));
  rec.note('D05-5', 'shipping options count', String((await options(page, 'عنوان الشحن')).length));
  rec.note('D05-6', 'company address options', JSON.stringify(await options(page, 'اسم عنوان الشركة')));
  rec.note('D05-7', 'company contact options', JSON.stringify(await options(page, 'جهة اتصال الشركة')));
  rec.check('D05-8', 'Contact (Hidden) field is not shown', (await main(page).locator('label').filter({ hasText: /^\s*جهة الاتصال\s*$/ }).count()) === 1, '');
});

test('D06 payment terms template and schedule', async ({ page }) => {
  await ready(page, '1000'); await tab(page, 'المعلومات العامة');
  const tp = await options(page, 'قالب شروط الدفع'); rec.note('D06-1', 'payment terms templates', JSON.stringify(tp));
  rec.note('D06-2', 'tables before', JSON.stringify(await tables(page)));
  if (tp.length) {
    await combo(page, 'قالب شروط الدفع', tp[0]); await wait(page, 2500);
    const t = main(page).locator('table').filter({ hasText: /تاريخ الاستحقاق/ }).first();
    rec.note('D06-3', 'schedule headers', JSON.stringify((await t.locator('thead th').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim())));
    rec.note('D06-4', 'schedule rows', JSON.stringify(await t.locator('tbody tr').evaluateAll((trs: any[]) => trs.map((r) => [...r.querySelectorAll('input')].map((i: any) => i.value).join(' ; ')))));
    const portions = await t.locator('tbody tr').evaluateAll((trs: any[]) => trs.map((r) => [...r.querySelectorAll('input[type=number]')].map((i: any) => Number(i.value))));
    rec.note('D06-5', 'numeric inputs per row', JSON.stringify(portions));
  }
});

test('D07 terms and conditions', async ({ page }) => {
  await ready(page); await tab(page, 'المعلومات العامة');
  const t = await options(page, 'الشروط'); rec.note('D07-1', 'terms options', JSON.stringify(t));
  if (t.length) { await combo(page, 'الشروط', t[0].split(' ')[0]); await wait(page, 2000); rec.check('D07-2', 'terms content is fetched from the selected term', !!(await box(page, 'محتوى الشروط والأحكام').locator('textarea').first().inputValue()), (await box(page, 'محتوى الشروط والأحكام').locator('textarea').first().inputValue()).slice(0, 60)); }
  const ta = box(page, 'محتوى الشروط والأحكام').locator('textarea').first();
  await ta.fill('x'.repeat(501)); rec.check('D07-3', 'terms content is limited to 500 characters', (await ta.inputValue()).length <= 500, 'len ' + (await ta.inputValue()).length);
  await ta.fill('ab'); await ta.press('Tab'); await wait(page, 1200); rec.note('D07-4', 'messages for 2 characters', JSON.stringify(await messages(page))); await closeModal(page);
});
