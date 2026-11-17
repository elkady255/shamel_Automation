import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe9.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

async function setup(page: Page) {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  const party = main(page).getByPlaceholder('Search and select', { exact: true }).first();
  await party.click(); await party.fill('PW Test'); await page.waitForTimeout(2000);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(3000);
  await press(main(page).getByRole('button', { name: 'Add Item' }).first());
  await page.waitForTimeout(1500);
  const row = main(page).locator('table.qi-table tbody tr').first();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await itemIn.fill('111'); await page.waitForTimeout(2500);
  await page.locator('.cs-option', { hasText: /^111$/ }).first().click();
  await page.waitForTimeout(3500);
  return row;
}

test('setting html', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const row = await setup(page);
  log('WARN ' + clean(await main(page).locator('[class*=warn],[class*=alert],[class*=notice]').allInnerTexts().then((a) => a.join(' | '))));
  await press(main(page).locator('button[title="Setting"]').first());
  await page.waitForTimeout(1500);
  const modal = page.locator('div', { hasText: /^Edit Columns/ }).last();
  const html = await page.evaluate(() => {
    const h = [...document.querySelectorAll('*')].filter((e) => (e as HTMLElement).innerText?.trim().startsWith('Edit Columns')).pop() as HTMLElement;
    let m: HTMLElement | null = h;
    for (let i = 0; i < 4 && m?.parentElement; i++) m = m.parentElement;
    return m ? m.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g, '<svg/>').slice(0, 3500) : 'none';
  });
  log('MODAL HTML ' + html);
  await press(page.getByText('Add/Remove Fields').first());
  await page.waitForTimeout(1500);
  const txt = await page.evaluate(() => {
    const all = [...document.querySelectorAll('*')].filter((e) => /Add\/Remove|Select Fields|Fields/.test((e as HTMLElement).innerText || ''));
    const biggest = all.filter((e) => (e as HTMLElement).innerText.length < 3000).pop() as HTMLElement;
    return biggest ? biggest.innerText : 'none';
  });
  log('ADD/REMOVE TEXT ' + clean(txt).slice(0, 2500));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-addremove.png' });
});
