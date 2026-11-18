import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const inputs = (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${i}:${e.type}:${(e.placeholder || '').slice(0, 20)}:${String(e.value).slice(0, 20)}${e.disabled || e.readOnly ? ':RO' : ''}`));
test('so details', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  for (const n of ['SAL-ORD-2026-03111', 'SAL-ORD-2026-02797', 'SAL-ORD-2026-02777', 'SAL-ORD-2026-02814', 'SAL-ORD-2026-02815']) {
    await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/' + n, LOAD); await page.waitForTimeout(9000);
    await page.evaluate(() => document.querySelectorAll('.modal.show button').forEach((b: any) => b.click())); await page.waitForTimeout(500);
    log(`\n=== ${n}`);
    log('BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
    log('TEXT ' + clean(await main(page).innerText()).slice(0, n.endsWith('3111') ? 3800 : 1200));
    if (n.endsWith('3111') || n.endsWith('2797')) log('INPUTS ' + JSON.stringify(await inputs(page)));
    await page.screenshot({ path: `so3-d-${n.slice(-5)}.png`, fullPage: true });
    if (n.endsWith('3111') || n.endsWith('2797')) {
      for (const t of ['المعلومات العامة', 'معلومات إضافية', 'السجلات المرتبطة']) {
        const b = main(page).getByRole('button', { name: t, exact: true });
        if (await b.count()) { await press(b); await page.waitForTimeout(2500); log(`TAB ${t} ` + clean(await main(page).innerText()).slice(0, 2200)); }
      }
    }
  }
});
