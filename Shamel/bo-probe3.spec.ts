import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts()).map(clean).filter(Boolean);
const errs = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.cd-error,[class*=error-msg]')].map((e: any) => e.innerText.trim()).filter(Boolean));
const cs = (p: Page, i: number) => main(p).locator('input.cs-input').nth(i);
const pickDay = async (page: Page, idx: number, day: string) => {
  const d = main(page).locator('input.flatpickr-input:visible').nth(idx);
  await d.click({ force: true }); await page.waitForTimeout(800);
  await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: new RegExp('^' + day + '$') }).first().click();
  await page.waitForTimeout(600);
};

test('selling flow + save', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/blanket-orders/new', LOAD);
  await page.waitForTimeout(8000);
  await cs(page, 0).click(); await page.waitForTimeout(800); await page.locator('.cs-option').first().click(); await page.waitForTimeout(500);
  await cs(page, 1).click(); await page.waitForTimeout(800); await page.locator('.cs-option').first().click(); await page.waitForTimeout(1500);
  log('AFTER SELLING text ' + clean(await main(page).innerText()).replace(/^.*?المعلومات الأساسية/, '').slice(0, 300));
  const cust = main(page).locator('input.cs-input').nth(2);
  await cust.click(); await cust.fill('PW Test'); await page.waitForTimeout(2000);
  log('CUSTOMER OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 4)));
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(2000);
  log('AFTER CUSTOMER text ' + clean(await main(page).innerText()).replace(/^.*?المعلومات الأساسية/, '').slice(0, 300));
  const orderNo = main(page).locator('input.cd-input').first();
  await orderNo.type('PW-BO-ORDER-1', { delay: 0 });
  await page.waitForTimeout(800);
  log('AFTER ORDER NO inputs ' + JSON.stringify(await main(page).locator('input.flatpickr-input:visible').count()) + ' date boxes');
  const cnt = await main(page).locator('input.flatpickr-input:visible').count();
  // order date first, from, to
  await pickDay(page, 0, '10'); await pickDay(page, 1, '12'); await pickDay(page, 2, '20');
  log('DATES ' + JSON.stringify(await main(page).locator('input.flatpickr-input:visible').evaluateAll((els) => els.map((e: any) => e.value))));
  // company
  const comp = main(page).locator('input.cs-input').filter({ hasNot: page.locator('x') });
  log('CS COUNT now ' + (await comp.count()));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-filled.png', fullPage: true });
  log('INPUTS ' + JSON.stringify(await main(page).locator('input.cs-input').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => i + ':' + e.placeholder + ':' + e.value))));
});
