import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe8.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const dlg = (p: Page) => p.locator('[role=dialog],.modal,[class*=modal]').last();
const dInputs = (p: Page) => dlg(p).locator('input,textarea,select').evaluateAll((els) => els.map((e: any, i) => `${i}|${e.tagName}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|ro=${e.readOnly}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));

test('popups', async ({ page }) => {
  fs.writeFileSync(OUT, '');
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
  await page.locator('.cs-option', { hasText: /^111$/ }).first().click().catch(async () => page.locator('.cs-option').nth(1).click());
  await page.waitForTimeout(3500);
  log('ROW ITEM VALUE ' + (await row.locator('input.cs-input').first().inputValue()));
  // Setting popup first
  await press(main(page).locator('button[title="Setting"]').first());
  await page.waitForTimeout(1500);
  log('SETTING POPUP ' + clean(await page.locator('body').innerText()).slice(0, 100));
  const popTxt = (await page.locator('[role=dialog],.modal,[class*=modal],[class*=popup],[class*=popover]').allInnerTexts()).map(clean).filter(Boolean);
  log('SETTING OVERLAYS ' + JSON.stringify(popTxt).slice(0, 2500));
  log('SETTING INPUTS ' + JSON.stringify(await page.locator('[class*=modal] input,[role=dialog] input,[class*=popup] input,[class*=popover] input').evaluateAll((els) => els.map((e: any) => `${e.type}|max=${e.maxLength}|val=${e.value}|lab=${(e.closest('label')||e.parentElement)?.innerText?.trim().slice(0,30)}`))).slice(0, 2500));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-setting.png' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  // Edit row popup
  await press(row.locator('[title="Edit Row"]').first());
  await page.waitForTimeout(2500);
  log('EDIT INPUTS ' + JSON.stringify(await dInputs(page)));
  log('EDIT BUTTONS ' + JSON.stringify((await dlg(page).getByRole('button').allInnerTexts()).map(clean)));
  log('EDIT LABELS(rich) ' + (await dlg(page).locator('.cs-control').count()) + ' selects');
  // Description limits
  const desc = dlg(page).locator('textarea').first();
  log('DESC max=' + (await desc.getAttribute('maxlength')));
  await desc.fill('ab');
  const margin = dlg(page).locator('input.cs-input').nth(2);
  log('CS INPUT count in dlg ' + (await dlg(page).locator('input.cs-input').count()));
  await dlg(page).locator('input.cs-input').nth(1).click(); // uom
  await page.waitForTimeout(1500);
  log('UOM OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 10)));
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-editrow2.png' });
});
