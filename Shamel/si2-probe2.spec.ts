import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1600 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const inputs = (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${i}:${e.type}:${(e.placeholder || '').slice(0, 30)}:${String(e.value).slice(0, 25)}${e.disabled || e.readOnly ? ':RO' : ''}`));
async function expandAll(page: Page) {
  for (let k = 0; k < 4; k++) {
    const t = main(page).locator('button[aria-expanded=false]');
    const n = await t.count();
    for (let i = n - 1; i >= 0; i--) { try { await press(t.nth(i)); } catch { /* */ } }
    await page.waitForTimeout(700);
    if (!n) break;
  }
}
test('si tabs', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  await expandAll(page);
  log('DETAILS EXPANDED ' + clean(await main(page).innerText()).slice(0, 6000));
  log('DETAILS INPUTS ' + JSON.stringify(await inputs(page)));
  await page.screenshot({ path: 'si2-d.png', fullPage: true });
  for (const [t, f] of [['المعلومات العامة', 'g'], ['معلومات إضافية', 'm']]) {
    await press(main(page).getByRole('button', { name: t, exact: true }).first()); await page.waitForTimeout(2500);
    await expandAll(page);
    log(`TAB ${f} TEXT ` + clean(await main(page).innerText()).slice(0, 6000));
    log(`TAB ${f} INPUTS ` + JSON.stringify(await inputs(page)));
    await page.screenshot({ path: `si2-${f}.png`, fullPage: true });
  }
  // get items from menu + view
  await press(main(page).getByRole('button', { name: 'التفاصيل', exact: true }).first()); await page.waitForTimeout(1500);
  await press(main(page).getByRole('button', { name: 'جلب الأصناف من' }).first()); await page.waitForTimeout(1500);
  log('GETITEMS MENU ' + JSON.stringify((await page.locator('.cd-action-menu:visible, [role=menu]:visible').allInnerTexts()).map(clean)));
  log('ALL VISIBLE BTN AFTER ' + JSON.stringify((await page.getByRole('button').locator('visible=true').allInnerTexts()).map(clean).filter(Boolean)));
  await press(main(page).getByRole('button', { name: 'عرض', exact: true }).first()); await page.waitForTimeout(1500);
  log('VIEW MENU ' + JSON.stringify((await page.locator('.cd-action-menu:visible, [role=menu]:visible').allInnerTexts()).map(clean)));
});
