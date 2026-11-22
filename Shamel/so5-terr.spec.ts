import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.use({ viewport: { width: 1500, height: 2400 }, actionTimeout: 15_000 });
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so5-terr.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('terr', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', { timeout: 100_000 }); await page.waitForTimeout(9000);
  await press(main(page).getByRole('button', { name: 'معلومات إضافية', exact: true })); await page.waitForTimeout(2000);
  const f = main(page).locator('.so-field').filter({ has: page.locator('label.cd-label', { hasText: /^المنطقة$/ }) }).first();
  await press(f.locator('.select-head').first()); await page.waitForTimeout(2500);
  log('PAGE OPTS ' + JSON.stringify(await page.locator('.cs-option:visible,[role=option]:visible,.cs-dropdown:visible li').allInnerTexts()));
  log('FIELD ' + (await f.innerHTML()).replace(/data-v-\w+=""/g, '').slice(0, 1500));
  await page.screenshot({ path: 'Shamel/so5-terr.png' });
});
