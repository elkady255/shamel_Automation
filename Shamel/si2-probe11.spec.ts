import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe11.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
/** Everything visible that is a dialog-like layer: modal, popup, drawer, overlay. */
const layers = (p: Page) => p.evaluate(() => [...document.querySelectorAll('[class*=modal],[class*=popup],[class*=dialog],[class*=drawer],[class*=overlay],[class*=settings],[role=dialog]')].filter((e: any) => e.offsetWidth > 250 && e.offsetHeight > 120 && !/AN Administrator/.test(e.innerText.slice(0, 120))).map((e: any) => ({ cls: String(e.className).slice(0, 60), t: e.innerText.replace(/\s+/g, ' ').slice(0, 1800), inputs: [...e.querySelectorAll('input,textarea,select')].map((i: any) => i.type + ':' + (i.placeholder || '').slice(0, 14) + ':' + String(i.value).slice(0, 8)).slice(0, 40) })));
test('si popups', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  log('start'); await pickText(0, 'Ahmed', 'Ahmed Ebrahim'); log('company'); await pickText(1, 'PW Packing', 'PW Packing');
  log('customer');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(1500);
  // items gear
  await press(main(page).locator('button.si-gear-btn').first()); await page.waitForTimeout(1800);
  log('ITEMS GEAR ' + JSON.stringify(await layers(page))); await page.screenshot({ path: 'Shamel/si2-p11-gear.png' });
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  // get items from -> sales order
  await press(main(page).getByRole('button', { name: 'جلب الأصناف من' }).first()); await page.waitForTimeout(1000);
  for (const [tag, label] of [['so', 'أمر المبيعات'], ['qt', 'عرض سعر'], ['dn', 'إذن التسليم']]) {
    const it = page.locator('.cd-action-menu *').filter({ hasText: new RegExp('^' + label + '$') }).first();
    if (!(await it.count())) { await press(main(page).getByRole('button', { name: 'جلب الأصناف من' }).first()); await page.waitForTimeout(800); }
    await press(page.locator('.cd-action-menu *').filter({ hasText: new RegExp('^' + label + '$') }).first()); await page.waitForTimeout(4000);
    log(`GETITEMS ${tag} ROWS ` + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.base-modal table tbody tr')].map((r: any) => r.innerText.replace(/\s+/g, ' ').trim())))); await page.screenshot({ path: `Shamel/si2-p11-${tag}.png` });
    await page.keyboard.press('Escape'); await page.waitForTimeout(800);
    const closeBtn = page.locator('[class*=modal] [title="إغلاق"],[class*=popup] button:has-text("إلغاء")').first(); if (await closeBtn.count()) { await press(closeBtn); await page.waitForTimeout(500); }
    await press(main(page).getByRole('button', { name: 'جلب الأصناف من' }).first()); await page.waitForTimeout(800);
  }
});
