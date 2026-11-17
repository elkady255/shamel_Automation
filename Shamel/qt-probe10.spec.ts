import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe10.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const vis = (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${e.type}|ph=${e.placeholder}|ro=${e.readOnly}|dis=${e.disabled}|val=${String(e.value).slice(0, 25)}`));

for (const [tag, name] of [['DRAFT', 'SAL-QTN-2026-01655'], ['SUBMITTED', 'SAL-QTN-2026-01656'], ['CANCELLED', 'SAL-QTN-2025-00017']]) {
  test('detail ' + tag, async ({ page }) => {
    await page.goto('about:blank');
    await page.goto('/desk/shamel#/selling/quotations/' + name, LOAD);
    await page.waitForTimeout(9000);
    log(`\n##### ${tag} ${name} URL ${page.url()}`);
    log('TEXT ' + clean(await main(page).innerText()).replace(/^.*?(Quotation|SAL-QTN)/, '$1').slice(0, 2600));
    log('BTNS ' + JSON.stringify(await btns(page)));
    const vi = await vis(page);
    log('VISIBLE INPUTS ' + vi.length + ' editable=' + vi.filter((x) => /ro=false\|dis=false/.test(x)).length);
    log('TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => e.getAttribute('title')))));
    await page.screenshot({ path: `C:/Playwright_Automation/Shamel/qt-detail-${tag}.png`, fullPage: false });
  });
}
