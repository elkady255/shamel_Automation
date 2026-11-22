import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si6-dump.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('si form dump', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', { timeout: 100_000 }); await page.waitForTimeout(9000);
  const tabs = await main(page).locator('button[type=submit]').allInnerTexts();
  log('TABS ' + JSON.stringify(tabs));
  const dump = async (name: string) => {
    log('=== ' + name);
    log('TEXT ' + (await main(page).innerText()).replace(/\n+/g, ' | '));
    log('CONTROLS ' + JSON.stringify(await main(page).locator('input,select,textarea').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e, k) => [k, e.type, e.placeholder || '', (e.value || '').slice(0, 25), (e.closest('label')?.innerText || e.parentElement?.parentElement?.querySelector('label')?.innerText || '').slice(0, 35)].join('~')))));
  };
  await dump('first tab');
  await page.screenshot({ path: 'Shamel/si6-tab0.png', fullPage: true });
  let i = 1;
  for (const t of tabs.map((s) => s.trim()).filter(Boolean)) {
    if (/حفظ|إلغاء|إضافة/.test(t)) continue;
    try { await press(main(page).getByRole('button', { name: t, exact: true })); await page.waitForTimeout(2000); await dump('tab ' + t); await page.screenshot({ path: `Shamel/si6-tab${i++}.png`, fullPage: true }); } catch (e: any) { log('FAIL tab ' + t + ' ' + String(e.message).slice(0, 100)); }
  }
});
