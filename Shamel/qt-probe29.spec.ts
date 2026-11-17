import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe29.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('setting on saved doc (items + taxes + payment)', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/SAL-QTN-2026-01655', LOAD);
  await page.waitForTimeout(9000);
  const gears = main(page).locator('button.qi-gear-btn');
  log('GEAR COUNT ' + (await gears.count()));
  await press(gears.first());
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-setting-saved.png' });
  const t = await page.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' '));
  const i = t.search(/تعديل الأعمدة|Edit Columns/);
  log('POPUP TEXT ' + (i >= 0 ? t.slice(i, i + 400) : 'NOT FOUND'));
  log('ROW COLUMN HEADERS (items) ' + JSON.stringify((await main(page).locator('table.qi-table').first().locator('th').allInnerTexts()).map(clean)));
  log('ITEM ROW ' + clean(await main(page).locator('table.qi-table tbody tr').first().innerText()));
  log('ROW TITLES ' + JSON.stringify(await main(page).locator('table.qi-table tbody tr').first().locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
});
