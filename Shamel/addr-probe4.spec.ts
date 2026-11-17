import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 90_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/addr-probe4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/addresses${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const opts = async (p: Page) => (await p.locator('.cs-option').locator('visible=true').allInnerTexts()).map(clean);

test('auto-primary + link name', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(800);
  await main(page).getByPlaceholder('نوع المستند', { exact: true }).locator('visible=true').first().click({ force: true });
  await page.waitForTimeout(1000);
  await press(page.locator('.cs-option', { hasText: /^Customer$/ }).locator('visible=true').first());
  await page.waitForTimeout(1000);
  const nameBox = main(page).getByPlaceholder('المستند', { exact: true }).locator('visible=true').first();
  await nameBox.click({ force: true }); await nameBox.fill('PW');
  await page.waitForTimeout(1500);
  const o = await opts(page);
  log('LINK NAME OPTS count ' + o.length + ' ' + JSON.stringify(o.slice(0, 6)));
  await press(page.locator('.cs-option').locator('visible=true').first());
  await page.waitForTimeout(1500);
  log('CHECKS after customer link ' + JSON.stringify(await main(page).locator('input[type=checkbox]').evaluateAll((els) => els.map((e: any) => e.checked))));
  log('LINK TITLE cell ' + clean(await main(page).locator('table tbody tr').first().innerText()));
  // change doctype -> name cleared?
  await main(page).getByPlaceholder('نوع المستند', { exact: true }).locator('visible=true').first().click({ force: true });
  await page.waitForTimeout(800);
  await press(page.locator('.cs-option', { hasText: /^Supplier$/ }).locator('visible=true').first());
  await page.waitForTimeout(1000);
  log('NAME after doctype change ' + (await main(page).getByPlaceholder('المستند', { exact: true }).locator('visible=true').first().inputValue()));
});

test('min length messages (cannot save: type empty)', async ({ page }) => {
  await open(page, '/new');
  await main(page).getByPlaceholder('أدخل عنوان السجل').fill('q');
  await main(page).getByPlaceholder('أدخل سطر العنوان', { exact: true }).fill('x');
  await main(page).getByPlaceholder('أدخل سطر العنوان 2').fill('z');
  await main(page).getByPlaceholder('أدخل الرمز البريدي').fill('1');
  await main(page).getByPlaceholder('أدخل رقم الفاكس').fill('1');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  log('MINLEN SAVE ' + clean(await main(page).innerText()).slice(0, 900));
  // max length behaviour
  await main(page).getByPlaceholder('أدخل عنوان السجل').fill('T'.repeat(120));
  log('TITLE LEN after 120 ' + (await main(page).getByPlaceholder('أدخل عنوان السجل').inputValue()).length);
  await main(page).getByPlaceholder('أدخل رقم الفاكس').fill('abc !@#');
  log('FAX accepts letters ' + (await main(page).getByPlaceholder('أدخل رقم الفاكس').inputValue()));
  await main(page).getByPlaceholder('أدخل الرمز البريدي').fill('ab-1 #');
  log('POSTAL accepts ' + (await main(page).getByPlaceholder('أدخل الرمز البريدي').inputValue()));
});

test('details disabled + list', async ({ page }) => {
  await open(page, '/PW Billing One-Billing');
  const checks = await main(page).locator('input[type=checkbox]').evaluateAll((els) => els.map((e: any) => e.checked));
  log('DETAILS checks (company? primary,billing,shipping,disabled order) ' + JSON.stringify(checks));
  log('DETAILS labels ' + clean(await main(page).innerText()).slice(0, 400));
  await open(page, '');
  await main(page).locator('tbody tr').first().getByRole('checkbox').evaluate((e: any) => e.click());
  await page.waitForTimeout(800);
  await press(main(page).getByRole('button', { name: 'حذف', exact: true }));
  await page.waitForTimeout(1500);
  log('DELETE CONFIRM ' + clean(await page.locator('.shamel-confirm-dialog, [role=dialog]').first().innerText().catch(() => 'none')));
  const cancel = page.locator('.shamel-confirm-dialog').getByRole('button', { name: 'إلغاء' });
  if (await cancel.count()) await press(cancel.first());
});


