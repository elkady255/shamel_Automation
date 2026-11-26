// Screenshots used in the DEV report (nothing is saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';
test.use({ viewport: { width: 1400, height: 1100 }, actionTimeout: 20_000 });
test.setTimeout(240_000);
test('PE-01 tax row error', async ({ page }) => {
  await u.open(page, u.LIST + '/' + d.data().probeDraft);
  await u.main(page).locator('button:visible').filter({ hasText: /^\s*إضافة صف\s*$/ }).nth(1).click(); await page.waitForTimeout(6000);
  await page.screenshot({ path: 'Shamel/pe-results/bug-pe01.png' });
});
test('PE-02 letter head in bulk edit', async ({ page }) => {
  await u.open(page, u.LIST);
  await page.locator('main input[placeholder="البحث باستخدام الID"]').fill(d.data().probeDraft); await page.keyboard.press('Enter'); await page.waitForTimeout(5000);
  await page.locator(`input.check_item[data-id="${d.data().probeDraft}"]`).click(); await page.waitForTimeout(1500);
  await page.locator('button:visible').filter({ hasText: /^\s*تعديل\s*$/ }).first().click(); await page.waitForTimeout(2500);
  await page.locator('.base-modal:visible input:visible').first().click(); await page.waitForTimeout(2000);
  await page.screenshot({ path: 'Shamel/pe-results/bug-pe02.png' });
});
