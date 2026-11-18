import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 2400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so4-dump2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('so tabs dump', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  for (const [i, name] of [[1, 'المعلومات العامة'], [2, 'معلومات إضافية']] as [number, string][]) {
    await press(main(page).getByRole('button', { name, exact: true })); await page.waitForTimeout(2500);
    log('=== TAB ' + name);
    log('TEXT ' + (await main(page).innerText()).replace(/\n+/g, ' | '));
    log('CONTROLS ' + JSON.stringify(await main(page).locator('input,select,textarea').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e, k) => {
      const lab = e.closest('label')?.innerText || e.parentElement?.parentElement?.querySelector('label')?.innerText || '';
      return [k, e.tagName, e.type, e.placeholder || '', (e.value || '').slice(0, 30), lab.slice(0, 40)].join('~');
    }))));
    await page.screenshot({ path: `Shamel/so4-tab${i}.png`, fullPage: true });
  }
});
