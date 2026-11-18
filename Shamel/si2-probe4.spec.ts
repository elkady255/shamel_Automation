import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1600 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
async function expandAll(page: Page) { for (let k = 0; k < 3; k++) { const t = main(page).locator('button[aria-expanded=false]'); const n = await t.count(); for (let i = n - 1; i >= 0; i--) { try { await press(t.nth(i)); } catch { /* */ } } await page.waitForTimeout(600); if (!n) break; } }
const menus = (p: Page) => p.locator('.cd-action-menu, [role=menu]').evaluateAll((els) => els.map((e: any) => e.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean));
for (const [tag, name] of [['sub', 'ACC-SINV-2026-02755'], ['draft', 'ACC-SINV-2026-02754'], ['canc', 'ACC-SINV-2026-02757']]) {
  test('si details ' + tag, async ({ page }) => {
    await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/' + name, LOAD); await page.waitForTimeout(10000);
    log(`== ${tag} ${name}`);
    log('BTN ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
    log('MENUS(DOM) ' + JSON.stringify(await menus(page)));
    log('HEAD ' + clean(await main(page).locator('h1,h2').first().innerText().catch(() => '')) + ' | ' + clean((await main(page).innerText()).slice(0, 400)));
    await page.screenshot({ path: `Shamel/si2-det-${tag}.png` });
    await expandAll(page);
    log('TEXT ' + clean(await main(page).innerText()).slice(0, 5500));
    log('INPUTS ' + JSON.stringify(await main(page).locator('input,textarea').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${e.type}:${(e.placeholder || '').slice(0, 20)}:${String(e.value).slice(0, 18)}${e.disabled || e.readOnly ? ':RO' : ''}`))));
  });
}
