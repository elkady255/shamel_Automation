import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe14.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const anyMsg = (p: Page) => p.evaluate(() => [...document.querySelectorAll('body *')].filter((e: any) => e.children.length === 0 && e.offsetParent && /تعذّر|يرجى|الرجاء|مطلوب|خطأ|Error|required/i.test(e.innerText || '')).map((e: any) => e.innerText.trim().slice(0, 160)));
test('so save msgs', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(2000); };
  await pickText(1, 'PW Test', 'PW Test');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2000);
  const row = main(page).locator('table tbody tr').first();
  const ic = row.getByPlaceholder('ابحث واختر').first(); await ic.click(); await ic.fill('IND182210'); await page.waitForTimeout(2000); await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(2500);
  const rate = row.locator('input[type=number]').nth(1); await rate.fill('10200'); await rate.press('Tab'); await page.waitForTimeout(1500);
  { const d = main(page).locator('input.flatpickr-input:visible').nth(1); await d.click({ force: true }); await page.waitForTimeout(800); await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: /^28$/ }).first().click(); await page.waitForTimeout(1500); }
  log('ROW now ' + JSON.stringify(await row.locator('input').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + e.value))));
  log('HEADER date ' + JSON.stringify(await main(page).locator('input.flatpickr-input:visible').evaluateAll((els: any[]) => els.map((e) => e.value))));
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(500);
  log('SAVE @0.5s ' + JSON.stringify(await anyMsg(page))); await page.waitForTimeout(4500);
  log('SAVE @5s ' + JSON.stringify(await anyMsg(page)) + ' url ' + page.url());
  log('MODAL ' + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.modal.show,.base-modal')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 600)))));
  await page.screenshot({ path: 'Shamel/so3-p14.png' });
});
