import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe6.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${i}|${e.tagName}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|ro=${e.readOnly}|val=${e.value}|chk=${e.checked}`));
const titles = (p: Page) => main(p).locator('[title]').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => e.tagName + ':' + e.getAttribute('title')));

test('fill party + item', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  const party = main(page).getByPlaceholder('Search and select', { exact: true }).first();
  await party.click();
  await party.fill('PW Test');
  await page.waitForTimeout(2000);
  log('PARTY OPTIONS ' + JSON.stringify(await page.locator('.cs-option').allInnerTexts()));
  await page.locator('.cs-option').first().click();
  await page.waitForTimeout(3000);
  log('AFTER PARTY ' + clean(await main(page).innerText()).replace(/^.*?Add Quotation/, '').slice(0, 600));
  log('INPUTS ' + JSON.stringify(await inputs(page)));
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  log('TITLES ' + JSON.stringify(await titles(page)));
  log('TABLE HTML ' + (await main(page).locator('table').first().evaluate((e: any) => e.outerHTML.slice(0, 2500)).catch(() => 'no table')));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-row.png', fullPage: false });
  // type in item
  const itemIn = main(page).getByPlaceholder('Search and select', { exact: true }).nth(3);
  log('ITEM IN visible ' + (await itemIn.isVisible().catch(() => false)));
});
