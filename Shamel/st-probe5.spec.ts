import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe5.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/sales-tax-templates';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.map((e: any) => `${e.tagName}|${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));
const body = async (p: Page) => clean(await main(p).innerText());

test('add form', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2000);
  log('UNTOUCHED SAVE ' + (await body(page)).slice(0, 700));
  // title 1 char
  const title = main(page).getByPlaceholder('أدخل عنوان القالب', { exact: true });
  await title.fill('a');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2000);
  log('TITLE 1 CHAR ' + (await body(page)).slice(0, 700));
  await title.fill('x'.repeat(120));
  log('TITLE LEN AFTER 120 TYPED ' + (await title.inputValue()).length);
  await title.fill('ab');
  // company dropdown
  const co = main(page).getByPlaceholder('ابحث واختر الشركة', { exact: true });
  await co.click();
  await page.waitForTimeout(1500);
  log('COMPANY OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 12)));
  await page.keyboard.press('Escape');
  // tax category
  const tc = main(page).getByPlaceholder('ضريبة القيمة المضافة القياسية', { exact: true });
  await tc.click();
  await page.waitForTimeout(1500);
  log('TAX CATEGORY OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 12)));
  await page.keyboard.press('Escape');
  // add rows
  await press(main(page).getByRole('button', { name: /إضافة ضريبة/ }).first());
  await page.waitForTimeout(1000);
  log('AFTER ROW ' + (await body(page)).slice(0, 1200));
  (await inputs(page)).forEach((i) => log('ROW INPUT ' + i));
  log('WRAPPERS ' + (await main(page).locator('.id-uom-table-wrapper').count()));
  log('ROW TITLES ' + JSON.stringify(await main(page).locator('.id-uom-table-wrapper [title]').evaluateAll((els) => els.map((e: any) => e.title))));
  // mode options
  const mode = main(page).getByPlaceholder('فارغ', { exact: true }).first();
  await mode.click();
  await page.waitForTimeout(1200);
  log('MODE OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean)));
  await page.locator('.cs-option').nth(1).click().catch(() => {});
  await page.waitForTimeout(500);
  // account options
  const acc = main(page).getByPlaceholder('ابحث واختر', { exact: true }).first();
  await acc.click();
  await page.waitForTimeout(1500);
  const accs = (await page.locator('.cs-option').allInnerTexts()).map(clean);
  log('ACCOUNT OPTIONS (' + accs.length + ') ' + JSON.stringify(accs.slice(0, 15)));
  await page.keyboard.press('Escape');
  // untouched row save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2000);
  log('SAVE WITH EMPTY ROW ' + (await body(page)).slice(0, 1200));
  // numeric fields
  const nums = main(page).locator('.id-uom-table-wrapper input[maxlength="100"]');
  log('NUM FIELDS ' + (await nums.count()));
  if ((await nums.count()) > 0) {
    await nums.first().fill('abc');
    log('RATE AFTER abc ' + (await nums.first().inputValue()));
    await nums.first().fill('12.5');
    log('RATE AFTER 12.5 ' + (await nums.first().inputValue()));
    await nums.first().fill('1'.repeat(120));
    log('RATE LEN AFTER 120 ' + (await nums.first().inputValue()).length);
  }
  // setting popup with a row
  await press(main(page).locator('.id-uom-table-wrapper .id-uom-settings').first());
  await page.waitForTimeout(1200);
  log('SETTING POPUP ' + clean(await page.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog')));
  log('SETTING POPUP BTNS ' + JSON.stringify((await page.locator('[role=dialog] button, .base-modal button').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await press(main(page).locator('.id-uom-table-wrapper .id-uom-edit').first());
  await page.waitForTimeout(1200);
  log('EDIT ROW POPUP ' + clean(await page.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog')));
  log('EDIT ROW INPUTS ' + JSON.stringify(await page.locator('[role=dialog] input, [role=dialog] textarea, .base-modal input, .base-modal textarea').evaluateAll((els) => els.map((e: any) => `${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}`))));
  await page.keyboard.press('Escape');
});

test('list and delete', async ({ page }) => {
  await open(page, '');
  const row = main(page).locator('tbody tr').filter({ hasText: 'Warrqa - Warrqa' }).first();
  log('WARRQA ROW HTML ' + clean((await row.innerHTML()).replace(/<[^>]+>/g, ' ')).slice(0, 200));
  log('WARRQA ROW CHECK ICONS ' + JSON.stringify(await row.locator('svg, [class*=check], img').evaluateAll((els) => els.map((e: any) => (e.tagName + '.' + (e.className?.baseVal ?? e.className)).slice(0, 60)))));
  const def = main(page).locator('tbody tr').filter({ hasText: 'عنوان قالب ضريبى جديد - E' }).first();
  log('DEFAULT ROW ICONS ' + JSON.stringify(await def.locator('svg, [class*=check], img').evaluateAll((els) => els.map((e: any) => (e.tagName + '.' + (e.className?.baseVal ?? e.className)).slice(0, 60)))));
  log('DEFAULT ROW HTML ' + (await def.innerHTML()).replace(/\s+/g, ' ').slice(0, 900));
  // filter labels
  // delete a template that has 38 links -> cancel only
  await open(page, '/' + encodeURIComponent('VAT - E'));
  await press(main(page).locator('[title="حذف"]').first());
  await page.waitForTimeout(1500);
  log('DELETE CONFIRM ' + clean(await page.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog')));
  log('DELETE BTNS ' + JSON.stringify((await page.locator('[role=dialog] button, .base-modal button').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  // connections tab
  await press(main(page).getByRole('button', { name: /السجلات المرتبطة/ }));
  await page.waitForTimeout(2000);
  log('CONNECTIONS ' + (await body(page)).slice(0, 1500));
});
