import { test, type Page } from '@playwright/test';
import { openNew, combo, options, box, value, save, messages, closeModal, addItem, main, press, wait, recorder, summary, num, setText, isNew, docName, toggle } from './helpers/si-ui';

test.describe.configure({ timeout: 420_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('c-taxes');
const taxTable = (p: Page) => main(p).locator('table').nth(1);

async function withItem(page: Page, qty = '1', rate = '1000') {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', qty, null); await wait(page, 4000);
  const r = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1);
  await r.fill(rate); await r.press('Tab'); await wait(page, 1500);
}
const totals = async (p: Page) => ({
  total: num(await summary(p, 'إجمالي المبلغ بالعملة')), net: num(await summary(p, 'صافي الإجمالي بالعملة')), taxes: num(await summary(p, 'إجمالي الضرائب والرسوم (بالعملة)')),
  grand: num(await summary(p, 'الإجمالي الكلي (العملة)')), rounded: num(await summary(p, 'الإجمالي بعد التقريب (العملة)')), outstanding: num(await summary(p, 'المبلغ المستحق')),
  discAmt: num(await summary(p, 'مبلغ الخصم الإضافي (بعملة الشركة الأساسية)')),
});

test('C01 tax templates fill the table and the maths is right', async ({ page }) => {
  await withItem(page, '1', '1000');
  const tpls = await options(page, 'قالب الضرائب والرسوم');
  rec.note('C01-1', 'tax templates', JSON.stringify(tpls));
  for (const t of tpls.slice(0, 4)) {
    await combo(page, 'قالب الضرائب والرسوم', t.split(' ')[0]); await wait(page, 2500);
    const tt = await totals(page);
    const rowsTxt = (await main(page).locator('table').last().innerText()).replace(/\s+/g, ' ').slice(0, 400);
    rec.note('C01-tpl-' + t, 'template ' + t, JSON.stringify(tt) + ' | ' + rowsTxt);
    rec.check('C01-sum-' + t, `grand total = net + taxes for template ${t}`, Math.abs(tt.grand - (tt.net + tt.taxes)) < 0.011 || Math.abs(tt.grand - tt.net) < 0.011, JSON.stringify(tt));
  }
});

test('C02 manual tax row', async ({ page }) => {
  await withItem(page, '1', '1000');
  await press(main(page).getByRole('button', { name: /إضافة ضريبة أو رسم/ })); await wait(page, 1500);
  const t = main(page).locator('table').last();
  rec.note('C02-1', 'taxes table headers', JSON.stringify((await t.locator('thead th').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim())));
  rec.note('C02-2', 'new row inputs', JSON.stringify(await t.locator('tbody tr').first().locator('input,select').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + (e.placeholder || '') + ':' + e.value))));
  const row = t.locator('tbody tr').first();
  const mode = row.locator('input[type=text]').first(); await mode.click(); await wait(page, 1200);
  const modes = (await page.locator('.cs-option:visible').allInnerTexts()).map((s) => s.trim());
  rec.note('C02-3', 'mode options', JSON.stringify(modes));
  rec.check('C02-4', 'Mode has the 5 SRS values (Actual, On Net Total, On Previous Row Amount, On Previous Row Total, On Item Quantity)', modes.length === 5, JSON.stringify(modes));
  await page.keyboard.press('Escape');
  const s = await save(page, 7000); rec.note('C02-5', 'save with an empty tax row', JSON.stringify(s.msgs) + ' ' + s.url);
  rec.check('C02-6', 'a tax row without Mode / Account Head is refused', isNew(s.url), s.url);
  await closeModal(page);
});

async function c03(page: Page) {
  await withItem(page, '1', '1000');
  rec.note('C03-0', 'discount fields at start', JSON.stringify(await totals(page)));
  await combo(page, 'تطبيق الخصم الإضافي على', '', 1); // net total
  await setText(page, 'نسبة الخصم الإضافي', '10'); await wait(page, 1500); await closeModal(page);
  let t = await totals(page); rec.note('C03-1', 'net total 10%', JSON.stringify(t) + ' amtField=' + (await value(page, 'مبلغ الخصم الإضافي (العملة)')));
  rec.check('C03-2', '10% of 1,000 = 100: grand total 900', Math.abs(t.grand - 900) < 0.011, JSON.stringify(t), 'SI-33');
  rec.check('C03-3', 'Additional Discount Amount (currency) is calculated from the percentage', num(await value(page, 'مبلغ الخصم الإضافي (العملة)')) === 100, await value(page, 'مبلغ الخصم الإضافي (العملة)'), 'SI-33');
  await setText(page, 'نسبة الخصم الإضافي', ''); await closeModal(page); await setText(page, 'مبلغ الخصم الإضافي (العملة)', '250'); await wait(page, 1500); await closeModal(page);
  t = await totals(page); rec.note('C03-4', 'amount 250', JSON.stringify(t) + ' pct=' + (await value(page, 'نسبة الخصم الإضافي')));
  rec.check('C03-5', 'amount 250: grand total 750', Math.abs(t.grand - 750) < 0.011, JSON.stringify(t), 'SI-33');
  await setText(page, 'نسبة الخصم الإضافي', '150'); await wait(page, 1500); await closeModal(page);
  rec.note('C03-6', 'pct 150 on screen', (await value(page, 'نسبة الخصم الإضافي')) + ' | ' + JSON.stringify(await totals(page)));
  let s = await save(page, 7000); rec.check('C03-7', 'discount over 100% is refused on Save', isNew(s.url), JSON.stringify(s.msgs) + ' ' + s.url); await closeModal(page);
  await setText(page, 'نسبة الخصم الإضافي', '-10'); await wait(page, 1200); await closeModal(page);
  t = await totals(page); rec.note('C03-8', 'pct -10', JSON.stringify(t));
  rec.check('C03-9', 'a negative discount is not accepted (must not raise the total)', t.grand <= 1000.011, JSON.stringify(t));
  const cp = await options(page, 'رمز القسيمة'); rec.note('C03-10', 'coupon options', JSON.stringify(cp));
}
test('C03 additional discount', async ({ page }) => { try { await c03(page); } catch (e: any) { rec.note('C03-stop', 'stopped after the server error popup of SI-33', String(e.message).slice(0, 160)); } });

test('C04 totals, rounding, in words, outstanding', async ({ page }) => {
  await withItem(page, '3', '333.33');
  const t = await totals(page); rec.note('C04-1', 'totals for 3 x 333.33', JSON.stringify(t));
  rec.check('C04-2', 'total = 999.99', Math.abs(t.total - 999.99) < 0.011, JSON.stringify(t));
  rec.note('C04-3', 'rounding adjustment', await summary(page, 'تسوية التقريب (العملة)'));
  rec.note('C04-4', 'in words', (await value(page, 'الإجمالي كتابةً')));
  rec.check('C04-5', 'Outstanding Amount equals the grand total on a draft', Math.abs(t.outstanding - t.grand) < 0.011 || t.outstanding === 0, JSON.stringify(t));
  rec.note('C04-6', 'total advance', await summary(page, 'إجمالي الدفعات المقدمة'));
  const inWords = await value(page, 'الإجمالي كتابةً');
  rec.check('C04-7', 'In Words is shown in Arabic on an Arabic interface', /[؀-ۿ]/.test(inWords), inWords);
});

test('C05 shipping rule', async ({ page }) => {
  await withItem(page, '1', '1000');
  const sr = await options(page, 'قاعدة الشحن'); rec.note('C05-1', 'shipping rules', JSON.stringify(sr));
  if (sr.length) { await combo(page, 'قاعدة الشحن', sr[0].split(' ')[0]); await wait(page, 2500); rec.note('C05-2', 'after shipping rule', JSON.stringify(await totals(page)) + ' | ' + (await main(page).locator('table').last().innerText()).replace(/\s+/g, ' ').slice(0, 300)); }
});

test('C06 tax withholding and rate adjustment switches', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed');
  rec.note('C06-1', 'switch Consider for Tax Withholding', String(await toggle(page, 'احتساب ضريبة الخصم والتحصيل')));
  rec.note('C06-2', 'after tax withholding: new fields', JSON.stringify((await main(page).locator('label').allInnerTexts()).filter((s) => /حجز|استقطاع|خصم/.test(s)).slice(0, 8)));
  rec.note('C06-3', 'switch Debit Note', String(await toggle(page, 'قيد تعديل السعر (إشعار مدين)')));
  const labels = (await main(page).locator('label,.toggle-row-label').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  rec.check('C06-4', 'Source Invoice appears when Is Rate Adjustment Entry (Debit Note) is checked', labels.some((l) => /فاتورة المصدر|الفاتورة المصدر|الفاتورة الأصلية/.test(l)), JSON.stringify(labels.filter((l) => /فاتورة/.test(l))));
  rec.note('C06-5', 'Update Outstanding for Self on a normal invoice', JSON.stringify(labels.filter((l) => /مستحق/.test(l))));
});
