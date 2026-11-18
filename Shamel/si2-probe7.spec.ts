import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
test('si row view', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2000);
  await main(page).locator('table').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'Shamel/si2-p7.png' });
  fs.writeFileSync('C:/Playwright_Automation/Shamel/si2-probe7.out.txt', await main(page).locator('table').first().evaluate((e: any) => e.outerHTML.slice(0, 4000)));
});
