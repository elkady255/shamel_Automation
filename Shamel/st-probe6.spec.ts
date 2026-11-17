import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe6.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/sales-tax-templates';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const body = async (p: Page) => clean(await main(p).innerText());
const dlg = async (p: Page) => clean(await p.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog'));

test('list icons', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '');
  const rows = main(page).locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const cells = await rows.nth(i).locator('td').evaluateAll((tds) => tds.map((t: any) => (t.innerText || '').trim().slice(0, 25) + '{' + t.querySelectorAll('svg').length + 'svg,' + (t.innerHTML.match(/check/gi) || []).length + 'chk}'));
    log('ROW ' + JSON.stringify(cells));
  }
  const dis = await rows.nth(5).locator('td').nth(4).innerHTML();
  log('DISABLED CELL HTML ' + dis.replace(/\s+/g, ' ').slice(0, 400));
  const def = await rows.nth(1).locator('td').nth(3).innerHTML();
  log('DEFAULT CELL HTML ' + def.replace(/\s+/g, ' ').slice(0, 400));
});

test('warrqa disabled', async ({ page }) => {
  await open(page, '/' + encodeURIComponent('warrqa - Warrqa'));
  log('WARRQA DET ' + (await body(page)).slice(0, 600));
  log('WARRQA CHECKS ' + JSON.stringify(await main(page).locator('input[type=checkbox]').evaluateAll((els) => els.map((e: any) => e.checked))));
});

test('accounts by company', async ({ page }) => {
  await open(page, '/new');
  const co = main(page).getByPlaceholder('ابحث واختر الشركة', { exact: true });
  await co.click();
  await co.fill('Ahmed');
  await page.waitForTimeout(1500);
  await page.locator('.cs-option', { hasText: 'Ahmed Ebrahim CO.' }).first().click();
  await page.waitForTimeout(800);
  await press(main(page).getByRole('button', { name: /إضافة ضريبة/ }).first());
  await page.waitForTimeout(800);
  const acc = main(page).getByPlaceholder('ابحث واختر', { exact: true }).first();
  await acc.click();
  await page.waitForTimeout(1500);
  const o1 = (await page.locator('.cs-option').allInnerTexts()).map(clean);
  log('ACCOUNTS (company chosen) ' + o1.length + ' ' + JSON.stringify(o1.slice(0, 12)));
  for (const q of ['01204523609', '1 - s', 'يوليوس']) {
    await acc.fill(q);
    await page.waitForTimeout(1500);
    log(`SEARCH ${q} -> ` + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 6)));
  }
  await page.keyboard.press('Escape');
  // add/remove columns
  await press(main(page).locator('.id-uom-table-wrapper .id-uom-settings').first());
  await page.waitForTimeout(1200);
  await press(page.getByRole('button', { name: /إضافة\/إزالة/ }).first());
  await page.waitForTimeout(1200);
  log('ADD/REMOVE COLUMNS ' + (await dlg(page)));
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
});

test('delete confirm and connections', async ({ page }) => {
  await open(page, '/' + encodeURIComponent('VAT - E'));
  await press(main(page).locator('[title="حذف"]').first());
  await page.waitForTimeout(1500);
  log('DELETE CONFIRM ' + (await dlg(page)));
  log('DELETE BTNS ' + JSON.stringify((await page.locator('[role=dialog] button, .base-modal button').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await press(main(page).getByRole('button', { name: /السجلات المرتبطة/ }));
  await page.waitForTimeout(2500);
  log('CONNECTIONS ' + (await body(page)).slice(0, 1800));
});
