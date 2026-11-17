import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => `${e.tagName}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|ro=${e.readOnly}|val=${e.value}|chk=${e.checked}`));

test('new form', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  log('URL ' + page.url());
  log('TEXT ' + clean(await main(page).innerText()).slice(0, 3500));
  log('BTNS ' + JSON.stringify(await btns(page)));
  log('INPUTS ' + JSON.stringify(await inputs(page), null, 0));
  log('TABS ' + JSON.stringify(await main(page).getByRole('tab').allInnerTexts()));
  log('H ' + JSON.stringify((await main(page).locator('h1,h2,h3,h4,legend').allInnerTexts()).map(clean)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-new.png', fullPage: true });
});
