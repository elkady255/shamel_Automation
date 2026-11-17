import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('click sidebar', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/customer-groups', LOAD);
  await page.waitForTimeout(6000);
  await press(page.getByText('الضرائب والرسوم على المبيعات', { exact: true }).first());
  await page.waitForTimeout(5000);
  log('URL ' + page.url());
  log('LIST TEXT ' + clean(await main(page).innerText()).slice(0, 1500));
  log('BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('HEADERS ' + JSON.stringify((await main(page).locator('th').allInnerTexts()).map(clean)));
  log('ROWS ' + (await main(page).locator('tbody tr').count()));
  await press(main(page).locator('tbody tr').first().getByRole('checkbox'));
  await page.waitForTimeout(1000);
  log('BULK ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
});
