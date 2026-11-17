import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe17.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const NAME = 'SAL-QTN-2026-01674';
const open = async (page: Page, name = NAME) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/' + name, LOAD);
  await page.waitForTimeout(9000);
};
const top = async (page: Page) => clean(await page.evaluate(() => {
  const els = [...document.querySelectorAll('body *')].filter((e: any) => e.offsetParent !== null && /fixed|absolute/.test(getComputedStyle(e).position) && e.innerText && e.innerText.length < 1500 && e.getBoundingClientRect().width > 100);
  return els.map((e: any) => e.innerText).slice(-4).join(' ## ');
}));

test('create menu', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page);
  await press(main(page).getByRole('button', { name: 'Create', exact: true }));
  await page.waitForTimeout(1200);
  log('CREATE MENU ' + await top(page));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-create-menu.png' });
});

test('set as lost popup', async ({ page }) => {
  await open(page);
  await press(main(page).getByRole('button', { name: 'Set as Lost', exact: true }));
  await page.waitForTimeout(1500);
  log('SET AS LOST ' + await top(page));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-lost.png' });
});

test('update items popup', async ({ page }) => {
  await open(page);
  await press(main(page).getByRole('button', { name: 'Update Items', exact: true }));
  await page.waitForTimeout(1500);
  log('UPDATE ITEMS ' + await top(page));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-updateitems.png' });
});

test('linked records', async ({ page }) => {
  await open(page);
  await press(main(page).getByRole('button', { name: /Linked Records/ }));
  await page.waitForTimeout(2000);
  log('LINKED ' + clean(await main(page).innerText()).replace(/^.*?Quotation Details/, '').slice(0, 900));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-linked.png' });
});
