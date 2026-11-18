import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe10.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const modals = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.modal,.shamel-confirm-overlay')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 500)));
async function expandAll(page: Page) { for (let k = 0; k < 3; k++) { const t = main(page).locator('button[aria-expanded=false]'); const n = await t.count(); for (let i = n - 1; i >= 0; i--) { try { await press(t.nth(i)); } catch { /* */ } } await page.waitForTimeout(600); if (!n) break; } }
const NAME = 'ACC-SINV-2026-02789';
for (const [tag, label] of [['return', 'مرتجع / إشعار دائن'], ['dn', 'إذن التسليم'], ['payment', 'دفعة'], ['maint', 'جدول الصيانة']]) {
  test('create ' + tag, async ({ page }) => {
    await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/' + NAME, LOAD); await page.waitForTimeout(9000);
    await press(main(page).getByRole('button', { name: 'إنشاء', exact: true })); await page.waitForTimeout(1200);
    const it = page.locator('.cd-action-menu *,[role=menu] *').filter({ hasText: new RegExp('^' + label + '$') }).first();
    log(`== ${tag} item count ${await it.count()}`);
    await press(it); await page.waitForTimeout(8000);
    log('URL ' + page.url()); log('MODALS ' + JSON.stringify(await modals(page)));
    await expandAll(page);
    log('TEXT ' + clean(await main(page).innerText()).slice(0, 2600));
    log('INPUTS ' + JSON.stringify(await main(page).locator('input,textarea').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent !== null).map((e) => (e.placeholder || e.type).slice(0, 16) + '=' + String(e.value).slice(0, 18) + (e.readOnly || e.disabled ? '(ro)' : '')).filter((x) => !/^checkbox=on/.test(x)))));
    await page.screenshot({ path: `Shamel/si2-p10-${tag}.png`, fullPage: true });
  });
}
