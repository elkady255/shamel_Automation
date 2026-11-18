import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe13.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
async function expandAll(page: Page) { for (let k = 0; k < 3; k++) { const t = main(page).locator('button[aria-expanded=false]'); const n = await t.count(); for (let i = n - 1; i >= 0; i--) { try { await press(t.nth(i)); } catch { /* */ } } await page.waitForTimeout(600); if (!n) break; } }
test('return labels', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/ACC-SINV-2026-02790', LOAD); await page.waitForTimeout(10000);
  await expandAll(page);
  const t = clean(await main(page).innerText());
  log('RETURN TEXT ' + t.slice(t.indexOf('المعلومات الأساسية'), t.indexOf('المعلومات الأساسية') + 1500));
  log('RETURN BTN ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els: any[]) => els.map((e) => e.title).filter((x) => x && !/تحديد الكل|حذف$|المزيد|إغلاق/.test(x)))));
  await page.screenshot({ path: 'Shamel/si2-p13-return.png', fullPage: true });
});
test('limits', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  await pickText(0, 'Ahmed', 'Ahmed Ebrahim'); await pickText(1, 'PW Packing', 'PW Packing');
  const long = async (loc: any, n: number, label: string) => { await loc.click(); await loc.fill('x'.repeat(n)); const v = await loc.inputValue(); log(`LIMIT ${label}: typed ${n}, kept ${v.length}, maxlength attr=${await loc.getAttribute('maxlength')}`); };
  await long(main(page).getByPlaceholder('امسح أو اكتب الباركود'), 150, 'scan barcode');
  await main(page).getByPlaceholder('امسح أو اكتب الباركود').fill('');
  // general tab
  await press(main(page).getByRole('button', { name: 'المعلومات العامة', exact: true }).first()); await page.waitForTimeout(2000);
  await expandAll(page);
  const ta = main(page).locator('textarea').first(); if (await ta.count()) await long(ta, 700, 'terms content textarea');
  const nums = main(page).locator('input[type=number]:visible'); log('NUMBER INPUTS ' + await nums.count());
  for (let i = 0; i < Math.min(await nums.count(), 3); i++) { const n = nums.nth(i); await n.fill('-5'); log(`number#${i} -5 kept=${await n.inputValue()} min=${await n.getAttribute('min')}`); }
  await press(main(page).getByRole('button', { name: 'معلومات إضافية', exact: true }).first()); await page.waitForTimeout(2000);
  await expandAll(page);
  const po = main(page).locator('input[type=text]:visible').filter({ hasNot: page.locator('[placeholder]') }).first();
  const poAll = await main(page).locator('input:visible').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + (e.placeholder || '') + ':' + (e.getAttribute('maxlength') || '')));
  log('MORE INFO INPUTS ' + JSON.stringify(poAll));
  if (await po.count()) await long(po, 150, 'customer PO');
});
