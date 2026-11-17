import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/pricing-rules';
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => `${e.tagName}|${e.type}|${e.placeholder}|max=${e.maxLength}|val=${e.value}|chk=${e.checked}`));
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}

test('add form default', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  log('TEXT ' + clean(await main(page).innerText()).slice(0, 3000));
  log('TABS ' + JSON.stringify((await main(page).getByRole('tab').allInnerTexts()).map(clean)));
  log('BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  (await inputs(page)).forEach((i) => log('INPUT ' + i));
  // untouched save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  log('UNTOUCHED SAVE ' + clean(await main(page).innerText()).slice(0, 1500));
});

test('tabs', async ({ page }) => {
  await open(page, '/new');
  const tabs = main(page).getByRole('tab');
  const n = await tabs.count();
  for (let i = 0; i < n; i++) {
    const name = clean(await tabs.nth(i).innerText());
    await press(tabs.nth(i));
    await page.waitForTimeout(1200);
    log(`TAB ${name} TEXT ` + clean(await main(page).innerText()).slice(0, 1800));
    (await inputs(page)).forEach((x) => log(`TAB ${name} INPUT ` + x));
  }
});
