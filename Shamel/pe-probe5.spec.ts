// Probe: references, taxes and deductions tables of a saved draft (my own).
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';

test.use({ viewport: { width: 1400, height: 1800 } });
const dlg = async (p: Page) => (await p.locator('.base-modal:visible').last().innerText().catch(() => 'none')).replace(/\n+/g, ' | ').slice(0, 2500);
const dlgFields = (p: Page) => p.locator('.base-modal:visible').last().locator('label:visible').allInnerTexts().catch(() => []);

test('tables', async ({ page }) => {
  test.setTimeout(290_000);
  await u.open(page, u.LIST + '/' + d.data().probeDraft);
  const click = (l: import('@playwright/test').Locator) => l.evaluate((e: any) => e.click(), undefined, { timeout: 6000 });
  const allBtns = () => u.main(page).locator('button:visible').evaluateAll((els: any[]) => els.map((e) => (e.innerText.trim() || e.title || '').replace(/\s+/g, ' ')).filter(Boolean));
  console.log('BTNS', JSON.stringify(await allBtns()));
  for (let i = 0; i < 3; i++) {
    try {
      const adds = u.main(page).locator('button:visible').filter({ hasText: /^\s*إضافة صف\s*$/ });
      console.log('ADD count', await adds.count());
      await click(adds.nth(i)); await u.wait(page, 2500);
      console.log('ADDED', i, JSON.stringify(await u.tablesInfo(page)), 'dlg', await dlg(page));
    } catch (e: any) { console.log('ADD ERR', i, e.message.slice(0, 150)); }
  }
  await page.screenshot({ path: 'Shamel/pe-results/p5-rows.png', fullPage: true });
  const edits = u.main(page).locator('button[title="تعديل الصف"]');
  console.log('EDIT count', await edits.count());
  for (let i = 0; i < (await edits.count()); i++) {
    try {
      await click(edits.nth(i)); await u.wait(page, 2500);
      console.log('EDIT', i, JSON.stringify(await dlgFields(page)), await dlg(page)); await page.screenshot({ path: `Shamel/pe-results/p5-edit${i}.png` });
      await click(page.locator('.base-modal:visible button').filter({ hasText: /^\s*إلغاء\s*$/ }).last()); await u.wait(page, 1500);
    } catch (e: any) { console.log('EDIT ERR', i, e.message.slice(0, 150)); }
  }
  const gears = u.main(page).locator('button[title="إعدادات الجدول"]');
  for (let i = 0; i < (await gears.count()); i++) {
    try {
      await click(gears.nth(i)); await u.wait(page, 2000);
      await click(page.locator('.base-modal:visible').last().getByText('إضافة/إزالة حقول')); await u.wait(page, 2000);
      console.log('COLS', i, await dlg(page));
      for (let k = 0; k < 2; k++) { await click(page.locator('.base-modal:visible button').filter({ hasText: /^\s*إلغاء\s*$/ }).last()).catch(() => {}); await u.wait(page, 1200); }
    } catch (e: any) { console.log('COLS ERR', i, e.message.slice(0, 150)); }
  }
  console.log('TYPE options', JSON.stringify(await f.offered(page, 'قالب ضرائب ورسوم المبيعات')));
});
