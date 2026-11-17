import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe25.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
async function fresh(page: Page) {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
}

test('quotation to + party', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await fresh(page);
  const to = main(page).getByPlaceholder('Select party type');
  await to.click(); await page.waitForTimeout(1200);
  log('QUOTATION TO OPTIONS ' + JSON.stringify(await opts(page)));
  await page.locator('.cs-option', { hasText: 'Lead' }).first().click(); await page.waitForTimeout(2000);
  log('AFTER LEAD labels ' + clean(await main(page).innerText()).replace(/^.*?Basic Information/, '').slice(0, 160));
  const party = main(page).getByPlaceholder('Search and select', { exact: true }).first();
  await party.click(); await page.waitForTimeout(2200);
  log('LEAD OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 4)) + ' count=' + (await opts(page)).length);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3000);
  log('LEAD PARTY NAME ' + clean(await main(page).innerText()).replace(/^.*?Party Name/, '').slice(0, 50));
  await to.click(); await page.waitForTimeout(800);
  await page.locator('.cs-option', { hasText: 'Customer' }).first().click(); await page.waitForTimeout(2000);
  log('SWITCH BACK party value="' + (await main(page).getByPlaceholder('Search and select', { exact: true }).first().inputValue()) + '"');
  const series = main(page).getByPlaceholder('Select series');
  await series.click(); await page.waitForTimeout(1200);
  log('SERIES OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
});

test('date picker + valid till', async ({ page }) => {
  await fresh(page);
  const dates = main(page).getByPlaceholder('Select date');
  await dates.first().click({ force: true });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-datepicker2.png' });
  const cal = page.locator('.dp__menu, .flatpickr-calendar.open, [class*=calendar]:visible, [class*=datepicker]:visible').first();
  log('CAL visible ' + (await cal.isVisible().catch(() => false)) + ' class=' + (await cal.getAttribute('class').catch(() => '')));
  const days = page.locator('.dp__cell_inner, .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)');
  log('DAY CELLS ' + (await days.count()));
  if (await days.count()) {
    await days.filter({ hasText: /^25$/ }).first().click().catch(() => {});
    await page.waitForTimeout(1500);
    const vals = await dates.evaluateAll((els) => els.map((e: any) => e.value));
    log('AFTER PICK 25 => date/valid_till ' + JSON.stringify(vals));
  }
});

test('taxes + discount ui', async ({ page }) => {
  await fresh(page);
  await press(main(page).getByRole('button', { name: 'Add Tax or Charge' }).first());
  await page.waitForTimeout(1500);
  const tbl = main(page).locator('table').last();
  log('TAX TABLE TH ' + JSON.stringify((await tbl.locator('th').allInnerTexts()).map(clean)));
  log('TAX ROW INPUTS ' + JSON.stringify(await tbl.locator('tbody tr').first().locator('input,select').evaluateAll((els) => els.map((e: any) => `${e.type}|ph=${e.placeholder}|val=${e.value}`))));
  const typeIn = tbl.locator('tbody tr').first().locator('input.cs-input').first();
  await typeIn.click(); await page.waitForTimeout(1200);
  log('TAX TYPE OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  // template
  const tpl = main(page).getByText('Sales Taxes and Charges Template').first().locator('xpath=following::input[1]');
  await tpl.click(); await page.waitForTimeout(2000);
  log('TEMPLATE OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 8)) + ' count=' + (await opts(page)).length);
  await page.keyboard.press('Escape');
  // Additional discount
  const apply = main(page).getByText('Apply Additional Discount On').first().locator('xpath=following::input[1]');
  await apply.click(); await page.waitForTimeout(1000);
  log('APPLY DISCOUNT OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  log('DISCOUNT INPUTS ' + JSON.stringify(await main(page).getByText('Additional Discount Percentage').first().locator('xpath=following::input[position()<=3]').evaluateAll((els) => els.map((e: any) => `${e.type}|max=${e.maxLength}|ro=${e.readOnly}|val=${e.value}`))));
});
