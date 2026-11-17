import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe27.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
const cs = (p: Page, i: number) => main(p).locator('input.cs-input').nth(i);
async function fresh(page: Page) {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
}

test('quotation to + party', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await fresh(page);
  await cs(page, 1).click(); await page.waitForTimeout(1200);
  log('QUOTATION TO OPTIONS ' + JSON.stringify(await opts(page)));
  await page.locator('.cs-option', { hasText: 'المحتمل' }).first().click(); await page.waitForTimeout(2000);
  log('AFTER LEAD text ' + clean(await main(page).innerText()).replace(/^.*?المعلومات الأساسية/, '').slice(0, 150));
  await cs(page, 2).click(); await page.waitForTimeout(2500);
  log('LEAD OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 4)) + ' count=' + (await opts(page)).length);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3000);
  log('LEAD selected party value=' + (await cs(page, 2).inputValue()) + ' | text ' + clean(await main(page).innerText()).replace(/^.*?المعلومات الأساسية/, '').slice(0, 140));
  await cs(page, 1).click(); await page.waitForTimeout(800);
  await page.locator('.cs-option', { hasText: /^العميل$/ }).first().click(); await page.waitForTimeout(2000);
  log('SWITCH BACK party value="' + (await cs(page, 2).inputValue()) + '"');
  await cs(page, 0).click(); await page.waitForTimeout(1200);
  log('SERIES OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  await cs(page, 3).click(); await page.waitForTimeout(1500);
  log('COMPANY OPTIONS count=' + (await opts(page)).length + ' ' + JSON.stringify((await opts(page)).slice(0, 4)));
  await page.keyboard.press('Escape');
});

test('date picker + valid till', async ({ page }) => {
  await fresh(page);
  const dates = main(page).locator('input.flatpickr-input:visible');
  log('DATE INPUT COUNT ' + (await dates.count()));
  await dates.first().click({ force: true });
  await page.waitForTimeout(1200);
  const days = page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)');
  log('OPEN CALENDAR DAYS ' + (await days.count()));
  await days.filter({ hasText: /^25$/ }).first().click().catch((e) => log('PICK ERR ' + String(e).slice(0, 100)));
  await page.waitForTimeout(1500);
  log('AFTER PICK 25 => date/valid_till ' + JSON.stringify(await dates.evaluateAll((els) => els.map((e: any) => e.value))));
  // set valid till BEFORE the date
  await dates.nth(1).click({ force: true }); await page.waitForTimeout(1000);
  const days2 = page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)');
  await days2.filter({ hasText: /^3$/ }).first().click().catch((e) => log('PICK2 ERR ' + String(e).slice(0, 100)));
  await page.waitForTimeout(1500);
  log('AFTER VALID TILL 3 => ' + JSON.stringify(await dates.evaluateAll((els) => els.map((e: any) => e.value))) + ' text: ' + clean(await main(page).innerText()).replace(/^.*?صالح حتى/, '').slice(0, 80));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-validtill.png' });
});

test('taxes + discount ui', async ({ page }) => {
  await fresh(page);
  await press(main(page).getByRole('button', { name: 'إضافة ضريبة أو رسم' }).first());
  await page.waitForTimeout(1500);
  const tbl = main(page).locator('table').last();
  log('TAX TABLE TH ' + JSON.stringify((await tbl.locator('th').allInnerTexts()).map(clean)));
  log('TAX ROW INPUTS ' + JSON.stringify(await tbl.locator('tbody tr').first().locator('input,select').evaluateAll((els) => els.map((e: any) => `${e.className.slice(0, 10)}|${e.type}|ph=${e.placeholder}|val=${e.value}`))));
  const typeIn = tbl.locator('tbody tr').first().locator('input.cs-input').first();
  await typeIn.click(); await page.waitForTimeout(1200);
  log('TAX TYPE OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  await cs(page, 6).click(); await page.waitForTimeout(2000);
  log('IDX6 (template?) OPTIONS count=' + (await opts(page)).length + ' ' + JSON.stringify((await opts(page)).slice(0, 6)));
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-taxes-ar.png', fullPage: true });
});

