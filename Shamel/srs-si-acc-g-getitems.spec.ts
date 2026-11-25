import { test, type Page } from '@playwright/test';
import { openNew, combo, main, press, wait, recorder, summary, num, closeModal } from './helpers/si-ui';

test.describe.configure({ timeout: 500_000 });
test.use({ viewport: { width: 1500, height: 2200 }, actionTimeout: 15_000 });
const rec = recorder('g-getitems');
const modal = (p: Page) => p.locator('.base-modal:visible').first();
async function openSource(page: Page, label: string) {
  await press(main(page).getByRole('button', { name: 'جلب الأصناف من', exact: true }).first()); await wait(page, 1200);
  await press(page.locator('.cd-action-menu.open *').filter({ hasText: new RegExp('^\\s*' + label + '\\s*$') }).first()); await wait(page, 3500);
}
async function closePopup(page: Page) {
  const c = modal(page).getByRole('button', { name: /إلغاء|إغلاق/ }).first();
  if (await c.count()) await press(c); else await page.keyboard.press('Escape');
  await wait(page, 800);
}

for (const [label, expectStatus] of [['أمر المبيعات', 'To Bill / Partially Billed'], ['عرض سعر', 'Open'], ['إذن التسليم', 'To Bill']] as const) {
  test('G01 Get Items From ' + label, async ({ page }) => {
    await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
    await openSource(page, label);
    const m = modal(page);
    rec.check('G01-' + label + '-open', `the "${label}" popup opens`, (await m.count()) > 0, '');
    if (!(await m.count())) return;
    rec.note('G01-' + label + '-text', 'popup text', (await m.innerText()).replace(/\s+/g, ' ').slice(0, 500));
    const heads = (await m.locator('table thead th').allInnerTexts()).map((s) => s.trim());
    rec.note('G01-' + label + '-heads', 'headers', JSON.stringify(heads));
    rec.check('G01-' + label + '-cols', 'popup has No., Name and Customer columns', ['م', 'الاسم', 'العميل'].every((h) => heads.includes(h)), JSON.stringify(heads));
    rec.check('G01-' + label + '-search', 'popup has a Name search field and a Customer field', (await m.locator('input').count()) >= 2, String(await m.locator('input').count()));
    rec.check('G01-' + label + '-btn', 'popup has a "Get Items" button', /جلب الأصناف/.test(await m.innerText()), '');
    const n = await m.locator('table tbody tr').count(); rec.note('G01-' + label + '-rows', 'rows listed', String(n));
    rec.check('G01-' + label + '-limit', 'the popup lists more than 50 documents when they exist (old SI-16)', n !== 50, 'rows ' + n, n === 50 ? 'SI-16' : '');
    if (label === 'عرض سعر' && n > 0 && !(await m.innerText()).includes('لا توجد')) {
      await press(m.locator('table tbody tr input[type=checkbox]').first()); await wait(page, 600);
      await press(m.getByRole('button', { name: /جلب الأصناف/ }).last()); await wait(page, 5000);
      const rows = await main(page).locator('table.si-table tbody tr').count();
      rec.check('G01-quotation-fetch', 'Get Items adds the quotation items to the Items table', rows > 0, 'rows ' + rows);
      const tot = await summary(page, 'إجمالي المبلغ بالعملة'); rec.check('G01-quotation-totals', 'totals are calculated after Get Items (old SI-22)', num(tot) > 0, tot, 'SI-22');
    } else await closePopup(page);
  });
}
