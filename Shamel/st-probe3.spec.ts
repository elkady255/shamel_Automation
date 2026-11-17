import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/sales-tax-templates';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.map((e: any) => `${e.tagName}|${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));
const dialog = async (p: Page) => clean(await p.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog'));

test('list rows', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '');
  const rows = main(page).locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const cells = await rows.nth(i).locator('td').evaluateAll((tds) => tds.map((t: any) => (t.innerText || '').trim() + (t.querySelector('input[type=checkbox]') ? `[chk=${t.querySelector('input[type=checkbox]').checked}]` : '')));
    log('ROW ' + JSON.stringify(cells));
  }
});

test('add', async ({ page }) => {
  await open(page, '/new');
  log('ADD URL ' + page.url());
  log('ADD TEXT ' + clean(await main(page).innerText()).slice(0, 2500));
  (await inputs(page)).forEach((i) => log('ADD INPUT ' + i));
  log('ADD BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await press(main(page).getByRole('button', { name: /إضافة صف/ }).first());
  await page.waitForTimeout(800);
  log('AFTER ROW ' + clean(await main(page).innerText()).slice(0, 2500));
  (await inputs(page)).forEach((i) => log('ROW INPUT ' + i));
  log('TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
  log('WRAPPERS ' + (await main(page).locator('.id-uom-table-wrapper').count()));
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  log('UNTOUCHED SAVE ' + clean(await main(page).innerText()).slice(0, 2500));
});

test('details', async ({ page }) => {
  await open(page, '/' + encodeURIComponent('VAT - E'));
  log('DET URL ' + page.url());
  log('DET TEXT ' + clean(await main(page).innerText()).slice(0, 3000));
  (await inputs(page)).forEach((i) => log('DET INPUT ' + i));
  log('DET BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('DET TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
  const wr = main(page).locator('.id-uom-table-wrapper');
  const n = await wr.count();
  log('DET WRAPPERS ' + n);
  if (n) {
    log('TABLE HEAD ' + clean((await wr.first().innerText()).slice(0, 400)));
    await press(wr.first().locator('.id-uom-settings'));
    await page.waitForTimeout(1200);
    log('SETTING POPUP ' + await dialog(page));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await press(wr.first().locator('.id-uom-edit').first());
    await page.waitForTimeout(1200);
    log('EDIT ROW POPUP ' + await dialog(page));
    await page.keyboard.press('Escape');
  }
});
