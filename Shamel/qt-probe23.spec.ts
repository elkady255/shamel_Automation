import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe23.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
async function fresh(page: Page) {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
}
const field = (page: Page, label: string) => main(page).getByText(label).first().locator('xpath=following::input[1]');

test('quotation to + party', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await fresh(page);
  const to = field(page, 'Quotation To');
  await to.click(); await page.waitForTimeout(1200);
  log('QUOTATION TO OPTIONS ' + JSON.stringify(await opts(page)));
  await page.locator('.cs-option', { hasText: 'Lead' }).first().click(); await page.waitForTimeout(2000);
  log('AFTER LEAD labels ' + clean(await main(page).innerText()).replace(/^.*?Basic Information/, '').slice(0, 200));
  const party = main(page).getByPlaceholder('Search and select', { exact: true }).first();
  await party.click(); await page.waitForTimeout(2000);
  log('LEAD OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 5)));
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3000);
  log('LEAD PARTY NAME label ' + clean(await main(page).innerText()).replace(/^.*?Party Name/, '').slice(0, 60));
  // switch back to customer; party should clear
  await to.click(); await page.waitForTimeout(800);
  await page.locator('.cs-option', { hasText: 'Customer' }).first().click(); await page.waitForTimeout(2000);
  log('AFTER SWITCH BACK party value=' + (await main(page).getByPlaceholder('Search and select', { exact: true }).first().inputValue()));
  // Series options
  const series = field(page, 'Series');
  await series.click(); await page.waitForTimeout(1200);
  log('SERIES OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  // Company options count
  const comp = field(page, 'Company');
  await comp.click(); await page.waitForTimeout(1500);
  log('COMPANY OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 5)) + ' count=' + (await opts(page)).length);
  await page.keyboard.press('Escape');
});

test('dates', async ({ page }) => {
  await fresh(page);
  const dateIn = field(page, 'Quotation Date');
  log('DATE readonly=' + (await dateIn.getAttribute('readonly')));
  await press(main(page).locator('input[placeholder="Select date"]').first().locator('xpath=ancestor::*[1]'));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-datepicker.png' });
  log('DATEPICKER TEXT ' + clean(await page.evaluate(() => [...document.querySelectorAll('[class*=calendar],[class*=datepicker],[class*=flatpickr],[class*=picker]')].map((e: any) => e.innerText).join(' | '))).slice(0, 300));
});

test('item dropdown filters', async ({ page }) => {
  await fresh(page);
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  const row = main(page).locator('table.qi-table tbody tr').first();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await page.waitForTimeout(2000);
  log('ITEM OPEN-EMPTY options ' + JSON.stringify((await opts(page)).slice(0, 6)) + ' count=' + (await opts(page)).length);
  for (const q of ['2121', 'BR-1', 'Branding', 'Des-1', 'Ads', 'Marketing']) {
    await itemIn.fill(q); await page.waitForTimeout(2200);
    log(`ITEM SEARCH ${q} => ` + JSON.stringify((await opts(page)).slice(0, 4)));
  }
});

