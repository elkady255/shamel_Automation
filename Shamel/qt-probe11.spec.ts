import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe11.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const msgs = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=error],[class*=invalid],[class*=snack],[class*=msg]').allInnerTexts()).map(clean).filter(Boolean);
const save = async (p: Page) => { await press(main(p).getByRole('button', { name: 'Save', exact: true })); await p.waitForTimeout(3500); };

async function fresh(page: Page) {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
}
async function party(page: Page, q = 'PW Test') {
  const p = main(page).getByPlaceholder('Search and select', { exact: true }).first();
  await p.click(); await p.fill(q); await page.waitForTimeout(2000);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3000);
}
async function addRow(page: Page, code: string) {
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  const row = main(page).locator('table.qi-table tbody tr').last();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await itemIn.fill(code); await page.waitForTimeout(2500);
  await page.locator('.cs-option', { hasText: code }).first().click();
  await page.waitForTimeout(3500);
  return row;
}

test('a empty save', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await fresh(page);
  await save(page);
  log('A1 EMPTY SAVE msgs ' + JSON.stringify(await msgs(page)));
  log('A1 URL ' + page.url());
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-save-empty.png' });
});

test('b party only', async ({ page }) => {
  await fresh(page);
  await party(page);
  await save(page);
  log('B PARTY ONLY msgs ' + JSON.stringify(await msgs(page)));
  log('B URL ' + page.url());
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-save-party.png' });
});

test('c blank item row', async ({ page }) => {
  await fresh(page);
  await party(page);
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  await save(page);
  log('C BLANK ROW msgs ' + JSON.stringify(await msgs(page)));
  log('C URL ' + page.url());
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-save-blankrow.png' });
});

test('d item with qty cases', async ({ page }) => {
  await fresh(page);
  await party(page);
  const row = await addRow(page, 'IND182210');
  log('D ROW ' + clean(await row.innerText()) + ' | inputs ' + JSON.stringify(await row.locator('input').evaluateAll((els) => els.map((e: any) => e.type + ':' + e.value))));
  const qty = row.locator('input[type=number]').first();
  for (const v of ['0', '-3', '2.5', '']) {
    await qty.fill(v); await qty.blur(); await page.waitForTimeout(1500);
    await save(page);
    log(`D QTY=[${v}] msgs ${JSON.stringify(await msgs(page))} url=${page.url().split('/').pop()}`);
    if (!/new$/.test(page.url())) break;
  }
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-save-qty.png' });
});

