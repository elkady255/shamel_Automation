import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe16.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).filter((b) => !/^(Details|General Information|More Information|Basic Information|Currency and Price List|Items|Item Summary|Taxes and Charges|Totals|Additional Discount|Taxes and Charges Calculation|Bundle Items|Pricing Rule Detail)$/.test(b));
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack],[class*=msg],[class*=dialog],[class*=modal],[class*=confirm]').allInnerTexts()).map(clean).filter(Boolean);
const open = async (page: Page, name: string) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/' + name, LOAD);
  await page.waitForTimeout(9000);
};
const status = async (page: Page) => clean(await main(page).locator('[class*=status],[class*=badge]').first().innerText().catch(() => ''));

test('lifecycle submit/cancel/amend', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const NAME = 'SAL-QTN-2026-01674';
  await open(page, NAME);
  log('DRAFT BTNS ' + JSON.stringify(await btns(page)));
  // Save with no changes
  await press(main(page).getByRole('button', { name: 'Save', exact: true }));
  await page.waitForTimeout(3500);
  log('SAVE NO-CHANGE toasts ' + JSON.stringify(await toasts(page)).slice(0, 400));
  // Submit
  await press(main(page).getByRole('button', { name: 'Submit', exact: true }));
  await page.waitForTimeout(2500);
  log('SUBMIT CLICK toasts/dialogs ' + JSON.stringify(await toasts(page)).slice(0, 600));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-submit-click.png' });
  const confirm = page.getByRole('button', { name: /^(Yes|Confirm|Submit|OK)$/ });
  const n = await confirm.count();
  log('CONFIRM BUTTONS ' + n);
  if (n) { await press(confirm.last()); await page.waitForTimeout(6000); }
  log('AFTER SUBMIT toasts ' + JSON.stringify(await toasts(page)).slice(0, 500));
  const doc = await get('Quotation', NAME);
  log('API AFTER SUBMIT docstatus=' + doc.docstatus + ' status=' + doc.status + ' valid_till=' + doc.valid_till);
  await open(page, NAME);
  log('SUBMITTED BTNS ' + JSON.stringify(await btns(page)));
  log('HEADER ' + clean(await main(page).innerText()).slice(0, 80));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-submitted.png' });
  // Create menu
  await press(main(page).getByRole('button', { name: 'Create', exact: true }));
  await page.waitForTimeout(1200);
  log('CREATE MENU ' + JSON.stringify((await page.locator('[role=menu] *,[class*=dropdown] *,[class*=menu] *').allInnerTexts()).map(clean).filter(Boolean)).slice(0, 600));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-create-menu.png' });
});
