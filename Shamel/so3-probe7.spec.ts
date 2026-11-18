import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 295_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe7.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const layers = (p: Page) => p.evaluate(() => [...document.querySelectorAll('[class*=modal],[class*=overlay],[class*=popup],[class*=popover]')].filter((e: any) => e.offsetWidth > 200 && e.offsetHeight > 100 && !/profile|fade$|modal-overlay/.test(e.className)).map((e: any) => e.className.slice(0, 25) + ' :: ' + e.innerText.replace(/\s+/g, ' ').slice(0, 2500) + ' || INPUTS ' + [...e.querySelectorAll('input,textarea,select')].map((i: any) => i.type + ':' + (i.placeholder || '').slice(0, 15) + ':' + String(i.value).slice(0, 12) + (i.checked ? ':CHK' : '')).join(',')));
test('so items+taxes', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  await pickText(1, 'PW Test', 'PW Test');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2000);
  const row = main(page).locator('table tbody tr').first();
  const ic = row.getByPlaceholder('ابحث واختر').first();
  for (const q of ['2121', '1111', 'Test Asset', 'asdasd', 'Item-123', 'Ads', 'BR-1', 'STO-ITEM-2026-00077']) {
    await ic.click(); await ic.fill(''); await ic.fill(q); await page.waitForTimeout(1800);
    log(`ITEM SEARCH ${q} => ` + JSON.stringify((await page.locator('.cs-option:visible').allInnerTexts()).map(clean).slice(0, 4)));
  }
  await ic.fill(''); await ic.fill('IND182210'); await page.waitForTimeout(1800); await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(2500);
  // gear -> add/remove fields
  await press(main(page).locator('[title="إعدادات"]').first()); await page.waitForTimeout(1500);
  await press(page.locator('.base-modal button').filter({ hasText: 'إضافة/إزالة حقول' }).first()); await page.waitForTimeout(1500);
  log('GEAR FIELDS ' + JSON.stringify(await layers(page)));
  await page.screenshot({ path: 'Shamel/so3-p7-gear2.png', fullPage: true });
  await page.keyboard.press('Escape'); await page.evaluate(() => document.querySelectorAll('.base-modal button').forEach((b: any) => { if (/^إلغاء$/.test(b.innerText.trim())) b.click(); })); await page.waitForTimeout(800);
  // taxes
  await press(main(page).getByRole('button', { name: 'إضافة ضريبة أو رسم' })); await page.waitForTimeout(2000);
  const tabs = await main(page).locator('table').count(); log('TABLES ' + tabs);
  const t2 = main(page).locator('table').nth(1);
  log('TAX HEAD ' + JSON.stringify((await t2.locator('thead th').allInnerTexts()).map(clean)));
  log('TAX ROW ' + JSON.stringify(await t2.locator('tbody tr').first().locator('input,select').evaluateAll((els: any[]) => els.map((i) => i.type + ':' + (i.placeholder || '') + ':' + i.value))));
  const tt = t2.locator('tbody tr').first().locator('select').first(); if (await tt.count()) log('TAX TYPE OPTIONS ' + JSON.stringify(await tt.locator('option').allInnerTexts()));
  await press(t2.locator('tbody tr').first().locator('input[type=checkbox]').first()); await page.waitForTimeout(800);
  await press(main(page).locator('[title="تعديل الصف"]').last()); await page.waitForTimeout(3000);
  log('TAX EDIT ' + JSON.stringify(await layers(page))); await page.screenshot({ path: 'Shamel/so3-p7-taxedit.png', fullPage: true });
});
