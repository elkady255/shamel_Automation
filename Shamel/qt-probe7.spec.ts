import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe7.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const rowInputs = (p: Page) => main(p).locator('table.qi-table tbody tr').first().locator('input,textarea,select').evaluateAll((els) => els.map((e: any, i) => `${i}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|ro=${e.readOnly}|dis=${e.disabled}|val=${e.value}`));
const overlay = async (p: Page) => (await p.locator('[role=dialog],.modal,[class*=modal],[class*=popup],[class*=drawer],[class*=overlay]').allInnerTexts()).map(clean).filter(Boolean);

test('row + popups', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  const party = main(page).getByPlaceholder('Search and select', { exact: true }).first();
  await party.click(); await party.fill('PW Test'); await page.waitForTimeout(2000);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3000);
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  log('ROW INPUTS (empty) ' + JSON.stringify(await rowInputs(page)));
  const row = main(page).locator('table.qi-table tbody tr').first();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await itemIn.fill('111'); await page.waitForTimeout(2500);
  log('ITEM OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 8)));
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3500);
  log('ROW INPUTS (item 111) ' + JSON.stringify(await rowInputs(page)));
  log('ROW TEXT ' + clean(await row.innerText()));
  log('SUMMARY ' + clean(await main(page).innerText()).replace(/^.*?Item Summary/, 'Item Summary').slice(0, 500));
  // Edit Row popup
  await press(row.locator('[title="Edit Row"]').first());
  await page.waitForTimeout(2500);
  log('EDIT ROW OVERLAYS ' + JSON.stringify(await overlay(page)).slice(0, 4500));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-editrow.png', fullPage: false });
});
