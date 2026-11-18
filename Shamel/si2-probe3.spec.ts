import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1600 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const vis = (p: Page) => p.locator('input:visible,textarea:visible,select:visible').evaluateAll((els) => els.map((e: any, i) => `${i}:${e.type}:${(e.placeholder || '').slice(0, 28)}:${String(e.value).slice(0, 20)}${e.disabled || e.readOnly ? ':RO' : ''}`));
async function expandAll(page: Page) { for (let k = 0; k < 3; k++) { const t = main(page).locator('button[aria-expanded=false]'); const n = await t.count(); for (let i = n - 1; i >= 0; i--) { try { await press(t.nth(i)); } catch { /* */ } } await page.waitForTimeout(600); if (!n) break; } }
test('si add item', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  // company + customer
  const pick = async (idx: number, q: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await page.locator('.cs-option:visible').first().evaluate((e: any) => e.click()); await page.waitForTimeout(1500); };
  await pick(0, '');
  await pick(1, 'PW');
  log('AFTER COMPANY+CUSTOMER ' + JSON.stringify(await main(page).locator('input:visible').evaluateAll((els) => els.map((e: any) => (e.placeholder || e.type) + '=' + e.value).filter((x: string) => !/checkbox/.test(x)))));
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true }));
  await page.waitForTimeout(2500);
  log('POPUP TEXT ' + clean((await page.locator('[role=dialog]:visible,.modal:visible,.popup:visible,[class*=modal]:visible').allInnerTexts()).join(' | ')).slice(0, 2500));
  log('POPUP INPUTS ' + JSON.stringify(await vis(page)));
  await page.screenshot({ path: 'si2-additem.png', fullPage: true });
});
