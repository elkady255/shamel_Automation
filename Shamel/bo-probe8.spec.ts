import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 120_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe8.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
const errs = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.cd-error')].map((e: any) => e.innerText.trim()).filter(Boolean));
const fixedTxt = (p: Page) => p.evaluate(() => { const els = [...document.querySelectorAll('body *')].filter((e: any) => e.offsetParent !== null && /fixed/.test(getComputedStyle(e).position) && e.innerText && e.innerText.length < 500 && e.getBoundingClientRect().width > 150 && e.getBoundingClientRect().width < 900); return els.map((e: any) => e.innerText.replace(/\s+/g, ' ')).slice(-2).join(' ## '); });
const cs = (p: Page, i: number) => main(p).locator('input.cs-input').nth(i);
const saveBtn = (p: Page) => main(p).getByRole('button', { name: 'حفظ', exact: true });
async function fresh(page: Page) { await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/blanket-orders/new', LOAD); await page.waitForTimeout(8000); }

test.skip('untouched save + purchasing + no customer', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await fresh(page);
  await press(saveBtn(page)); await page.waitForTimeout(2500);
  log('UNTOUCHED SAVE overlay "' + (await fixedTxt(page)) + '" errs ' + JSON.stringify(await errs(page)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-untouched.png' });
  await page.keyboard.press('Escape');
  // purchasing
  await cs(page, 0).click(); await page.waitForTimeout(800); await page.locator('.cs-option').first().click();
  await cs(page, 1).click(); await page.waitForTimeout(800); await page.locator('.cs-option').nth(1).click(); await page.waitForTimeout(1500);
  log('PURCHASING text ' + clean(await main(page).innerText()).replace(/^.*?المعلومات الأساسية/, '').slice(0, 160));
  const sup = cs(page, 2); await sup.click(); await sup.fill('Face'); await page.waitForTimeout(2000);
  log('SUPPLIER OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 3)));
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(1500);
  log('AFTER SUPPLIER ' + clean(await main(page).innerText()).replace(/^.*?المعلومات الأساسية/, '').slice(0, 160));
  // switch to selling: supplier cleared?
  await cs(page, 1).click(); await page.waitForTimeout(600); await page.locator('.cs-option').first().click(); await page.waitForTimeout(1500);
  log('BACK TO SELLING inputs ' + JSON.stringify(await main(page).locator('input.cs-input').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => e.value))));
  // save selling without customer
  await press(saveBtn(page)); await page.waitForTimeout(2500);
  log('SELLING NO CUSTOMER overlay "' + (await fixedTxt(page)) + '" errs ' + JSON.stringify(await errs(page)));
});

test('list bulk on submitted + edit popup + delete overlay', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/blanket-orders', LOAD);
  await page.waitForTimeout(8000);
  const rows = main(page).locator('tbody tr');
  const sub = rows.filter({ hasText: 'MFG-BLR-2026-00033' }).first();
  await press(sub.getByRole('checkbox')); await page.waitForTimeout(1000);
  log('BULK (submitted 00003) ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }).first()); await page.waitForTimeout(1500);
  log('EDIT on submitted: ' + (await fixedTxt(page)));
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  await press(sub.getByRole('checkbox')); await page.waitForTimeout(500);
  const dr = rows.filter({ hasText: 'MFG-BLR-2026-00032' }).first();
  log('DRAFT ROW exists ' + (await dr.count()));
  if (await dr.count()) {
    await press(dr.getByRole('checkbox')); await page.waitForTimeout(800);
    log('BULK (draft) ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
    await press(main(page).getByRole('button', { name: 'تعديل', exact: true }).first()); await page.waitForTimeout(1500);
    await page.locator('input.cs-input:visible').last().click(); await page.waitForTimeout(1500);
    log('EDIT FIELD OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 14)));
  }
});

test.skip('delete overlay on draft', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/blanket-orders/MFG-BLR-2026-00005-1', LOAD);
  await page.waitForTimeout(8000);
  await press(main(page).getByRole('button', { name: 'حذف', exact: true }));
  await page.waitForTimeout(1500);
  log('DELETE overlay: ' + clean(await page.evaluate(() => (document.querySelector('.shamel-confirm-overlay') as any)?.innerText || 'NONE')));
  const c = page.locator('.shamel-confirm-overlay button').first();
  if (await c.count()) await press(c);
});

