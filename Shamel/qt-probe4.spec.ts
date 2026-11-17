import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => `${e.tagName}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|ro=${e.readOnly}|val=${e.value}|chk=${e.checked}`));

test('tabs + add item', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  // General Information tab
  await press(main(page).getByRole('button', { name: 'General Information', exact: true }));
  await page.waitForTimeout(1500);
  log('GENERAL TEXT ' + clean(await main(page).innerText()).replace(/^.*?Add Quotation/, '').slice(0, 2500));
  log('GENERAL BTNS ' + JSON.stringify(await btns(page)));
  log('GENERAL INPUTS ' + JSON.stringify((await inputs(page)).slice(1)));
  await press(main(page).getByRole('button', { name: 'More Information', exact: true }));
  await page.waitForTimeout(1500);
  log('MORE TEXT ' + clean(await main(page).innerText()).replace(/^.*?Add Quotation/, '').slice(0, 2500));
  log('MORE INPUTS ' + JSON.stringify((await inputs(page)).slice(1)));
  await press(main(page).getByRole('button', { name: 'Details', exact: true }));
  await page.waitForTimeout(1500);
  // Add item
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  log('ADD ITEM TEXT ' + clean(await main(page).innerText()).slice(clean(await main(page).innerText()).indexOf('Items Log')).slice(0, 1500));
  log('ADD ITEM BTNS ' + JSON.stringify(await btns(page)));
  log('ADD ITEM INPUTS ' + JSON.stringify((await inputs(page)).slice(13)));
  log('TH ' + JSON.stringify((await main(page).locator('th').allInnerTexts()).map(clean)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-additem.png', fullPage: true });
});
