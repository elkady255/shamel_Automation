import { test } from '@playwright/test';
import { main, press, wait, recorder, messages } from './helpers/si-ui';
test.use({ viewport: { width: 1500, height: 2000 }, actionTimeout: 15_000 });
const rec = recorder('h2-probe');
test('H2 bulk edit popup', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/accounting/sales-invoices', { timeout: 100_000 });
  await main(page).locator('table tbody tr').first().waitFor({ timeout: 60_000 }); await wait(page, 2500);
  const row = main(page).locator('table tbody tr').filter({ hasText: /ACC-SINV-2026-02832(?!-)/ }).first();
  await press(row.locator('input[type=checkbox]').first()); await wait(page, 1000);
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }).first()); await wait(page, 3000);
  await page.screenshot({ path: 'Shamel/si8-h2-edit.png' });
  rec.note('H2-1', 'overlays', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[class*=overlay],[class*=modal],[role=dialog],[class*=popup]')].filter((e: any) => e.offsetParent || getComputedStyle(e).position === 'fixed').map((e: any) => e.className + ' :: ' + (e.innerText || '').replace(/\s+/g, ' ').slice(0, 300)))));
  rec.note('H2-2', 'messages', JSON.stringify(await messages(page)));
});
