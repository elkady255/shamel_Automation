import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1700 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe5.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const modal = (p: Page) => p.locator('[role=dialog]:visible,[class*=modal]:visible,[class*=overlay]:visible,[class*=popup]:visible').last();
test('si ui add', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  // untouched save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(3000);
  log('UNTOUCHED SAVE modal=' + clean(await page.locator('[class*=modal]:visible,[role=dialog]:visible').allInnerTexts().then((a) => a.join('|'))).slice(0, 600) + ' | errs=' + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.cd-error')].map((e: any) => e.innerText.trim()))));
  await page.screenshot({ path: 'Shamel/si2-p5-save0.png' });
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); const o = page.locator('.cs-option:visible').filter({ hasText: opt }).first(); await press(o); await page.waitForTimeout(1500); };
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  await pickText(0, 'Ahmed', 'Ahmed Ebrahim');
  await pickText(1, 'PW Packing', 'PW Packing');
  log('INPUTS ' + JSON.stringify(await main(page).locator('input:visible').evaluateAll((els) => els.map((e: any) => (e.placeholder || e.type) + '=' + e.value + (e.readOnly ? '(ro)' : '')).filter((x: string) => !/checkbox/.test(x)))));
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2500);
  log('TABLE HEAD ' + JSON.stringify((await main(page).locator('table thead th').allInnerTexts()).map(clean)));
  log('ROW BUTTONS ' + JSON.stringify(await main(page).locator('table tbody tr').first().locator('button').evaluateAll((els) => els.map((e: any) => (e.title || e.getAttribute('aria-label') || e.className.slice(0, 20)) ))));
  log('ROW INPUTS ' + JSON.stringify(await main(page).locator('table tbody tr').first().locator('input').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + (e.placeholder || '') + ':' + e.value + (e.readOnly ? '(ro)' : '')))));
  await page.screenshot({ path: 'Shamel/si2-p5-row.png', fullPage: false });
});
