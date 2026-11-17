import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
const vis = (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${i}|${e.className.slice(0, 10)}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|ro=${e.readOnly}|val=${e.value}`));

test('new form', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/blanket-orders/new', LOAD);
  await page.waitForTimeout(8000);
  log('TEXT ' + clean(await main(page).innerText()).slice(0, 1800));
  log('BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('INPUTS ' + JSON.stringify(await vis(page)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-new.png', fullPage: true });
  // order type options
  const cs = main(page).locator('input.cs-input');
  log('CS COUNT ' + (await cs.count()));
  await cs.nth(1).click(); await page.waitForTimeout(1200);
  log('IDX1 OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  await cs.nth(0).click(); await page.waitForTimeout(1200);
  log('IDX0 OPTIONS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  // untouched save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  log('UNTOUCHED SAVE toasts ' + JSON.stringify((await page.locator('[class*=toast],[class*=Toast],[role=alert],[class*=error],[class*=cd-error]').allInnerTexts()).map(clean).filter(Boolean)));
});
