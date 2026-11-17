import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe32.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('save without party: inline errors?', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  await press(main(page).getByRole('button', { name: 'إضافة صنف' }).first());
  await page.waitForTimeout(1500);
  const row = main(page).locator('table.qi-table tbody tr').first();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await itemIn.fill('IND182210'); await page.waitForTimeout(2500);
  await page.locator('.cs-option', { hasText: 'IND182210' }).first().click(); await page.waitForTimeout(3500);
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(3000);
  const errs = await page.evaluate(() => [...document.querySelectorAll('[class*=error],[class*=invalid],[class*=danger],[class*=required],[class*=helper],small')].filter((e: any) => e.innerText && e.innerText.trim()).map((e: any) => e.className.toString().slice(0, 30) + ':' + e.innerText.trim().slice(0, 80)));
  log('ERROR-LIKE ELEMENTS ' + JSON.stringify(errs));
  const redTexts = await page.evaluate(() => [...document.querySelectorAll('main *, #page-shamel *')].filter((e: any) => e.children.length === 0 && e.innerText && /rgb\((2[0-4]\d|1[89]\d), (\d{1,2}|1[0-2]\d), (\d{1,2}|1[0-2]\d)\)/.test(getComputedStyle(e).color)).map((e: any) => e.innerText.trim().slice(0, 80)));
  log('RED TEXTS ' + JSON.stringify(redTexts));
  await page.evaluate(() => window.scrollTo(0, 0));
  await main(page).evaluate((e: any) => { e.scrollTop = 0; });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-save-noparty-top.png' });
});
