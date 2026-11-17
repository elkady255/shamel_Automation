import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe9b.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('row select actions', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/sales-tax-templates/new', LOAD);
  await page.waitForTimeout(6000);
  const wr = main(page).locator('.id-uom-table-wrapper');
  await press(main(page).getByRole('button', { name: /إضافة ضريبة/ }).first());
  await press(main(page).getByRole('button', { name: /إضافة ضريبة/ }).first());
  await page.waitForTimeout(800);
  log('ROWS ' + (await wr.locator('.id-uom-td-row').count()));
  await press(wr.locator('.id-uom-td-row .id-uom-checkbox').first());
  await page.waitForTimeout(800);
  log('AFTER SELECT TITLES ' + JSON.stringify(await wr.locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
  log('AFTER SELECT TEXT ' + clean(await wr.innerText()).slice(0, 300));
  log('PAGE TITLES AFTER SELECT ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title)))); log('PAGE BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean))); const del = main(page).locator('[title="حذف"]').last();
  if (await del.count()) { await press(del); await page.waitForTimeout(1200); log('ROWS AFTER DELETE ' + (await wr.locator('.id-uom-td-row').count())); }
  // select all in header then count
  await press(wr.locator('.id-uom-th .id-uom-checkbox').first());
  await page.waitForTimeout(800);
  log('HEADER SELECT TITLES ' + JSON.stringify(await wr.locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
});
