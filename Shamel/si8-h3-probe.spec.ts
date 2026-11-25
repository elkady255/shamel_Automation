import { test } from '@playwright/test';
import { main, wait } from './helpers/si-ui';
import * as fs from 'fs';
test('row html', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/accounting/sales-invoices', { timeout: 100_000 });
  await main(page).locator('table tbody tr').first().waitFor({ timeout: 60_000 }); await wait(page, 2500);
  const h = await main(page).locator('table tbody tr').first().evaluate((r: any) => r.querySelectorAll('td')[2].outerHTML.slice(0, 400));
  fs.writeFileSync('Shamel/si8-h3-probe.out.txt', h);
});
