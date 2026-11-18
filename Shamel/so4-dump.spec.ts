import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 2400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const OUT = 'C:/Playwright_Automation/Shamel/so4-dump.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('so form dump', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  log('TEXT ' + (await main(page).innerText()).replace(/\n+/g, ' | '));
  log('CONTROLS ' + JSON.stringify(await main(page).locator('input,select,textarea,button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e, i) => {
    const lab = e.closest('label')?.innerText || e.parentElement?.previousElementSibling?.innerText || e.parentElement?.parentElement?.querySelector('label')?.innerText || '';
    return [i, e.tagName, e.type, e.placeholder || '', (e.value || '').slice(0, 30), (e.innerText || '').slice(0, 25), lab.slice(0, 40)].join('~');
  }))));
  await page.screenshot({ path: 'Shamel/so4-form.png', fullPage: true });
});
