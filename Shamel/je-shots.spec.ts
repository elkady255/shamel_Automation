// Screenshot for the DEV report: bulk Edit field list scrolled to Letter Head (nothing saved).
import { test } from '@playwright/test';
import * as j from './helpers/je-ui';
const { u, d } = j;
test.use({ viewport: { width: 1500, height: 1500 }, actionTimeout: 15_000 });
test('letter head', async ({ page }) => {
  test.setTimeout(150_000);
  const name = d.data()['JE-C01'];
  await u.open(page, j.LIST);
  await page.locator('main input[placeholder="البحث باستخدام الID"]').fill(name); await page.keyboard.press('Enter'); await j.wait(5000);
  await page.locator(`input.check_item[data-id="${name}"]`).click(); await j.wait(1500);
  await j.click(page, 'تعديل');
  await j.modal(page).locator('input:visible').first().click(); await j.wait(1500);
  await page.locator('.cs-option:visible').last().scrollIntoViewIfNeeded(); await j.wait(800);
  await page.screenshot({ path: 'Shamel/je-results/bug-letterhead.png' });
});
