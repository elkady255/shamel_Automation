import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe26.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('arabic labels', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  log('AR NEW TEXT ' + clean(await main(page).innerText()).slice(0, 2600));
  log('AR NEW BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  const tabs = main(page).getByRole('button');
  const names = (await tabs.allInnerTexts()).map(clean);
  log('INPUT PLACEHOLDERS ' + JSON.stringify(await main(page).locator('input').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => i + ':' + e.className.slice(0, 12) + ':' + e.placeholder + ':' + e.value))));
});
