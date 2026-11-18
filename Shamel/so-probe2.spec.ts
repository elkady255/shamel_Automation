import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('so save', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/sales-orders/new?blanket_order=MFG-BLR-2026-00030', LOAD);
  await page.waitForTimeout(10000);
  const row = main(page).locator('table tbody tr').first();
  log('ROW ' + clean(await row.innerText()) + ' | inputs ' + JSON.stringify(await row.locator('input').evaluateAll((els) => els.map((e: any) => e.type + ':' + e.value))));
  log('WARN ' + JSON.stringify((await main(page).locator('[class*=warn],[class*=alert],[class*=notice]').allInnerTexts()).map(clean)));
  { const d = main(page).locator('input.flatpickr-input:visible').nth(1); await d.click({ force: true }); await page.waitForTimeout(800); await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: /^28$/ }).first().click(); await page.waitForTimeout(1500); log('DELIVERY DATE ' + JSON.stringify(await main(page).locator('input.flatpickr-input:visible').evaluateAll((els) => els.map((e: any) => e.value)))); }
  // delivery date is mandatory in ERPNext SO; set it if empty via no action; just try save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(5000);
  log('AFTER SAVE url ' + page.url());
  log('MSG ' + JSON.stringify([...new Set((await page.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts()).map(clean).filter(Boolean))]));
  log('INLINE ERRS ' + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.cd-error')].map((e: any) => e.innerText.trim()))));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/so-save.png' });
});

