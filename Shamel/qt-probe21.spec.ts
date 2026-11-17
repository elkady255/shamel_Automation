import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe21.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const NAME = 'SAL-QTN-2026-01674';
const open = async (page: Page, name = NAME) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/' + name, LOAD);
  await page.waitForTimeout(9000);
};
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack],[class*=msg]').allInnerTexts()).map(clean).filter(Boolean);
const btnList = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter((b) => /Cancel|Set|Update|Create|Amend|Save|Submit/.test(b));

test('cancel + amend', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page);
  await press(main(page).getByRole('button', { name: 'Cancel Document', exact: true }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-cancel-click.png' });
  const dlgBtns = (await page.locator('.shamel-confirm-overlay button, [role=dialog] button').allInnerTexts()).map(clean);
  log('CANCEL CLICK dialog buttons ' + JSON.stringify(dlgBtns) + ' toasts ' + JSON.stringify(await toasts(page)).slice(0, 200));
  const confirm = page.locator('.shamel-confirm-overlay button, [role=dialog] button').filter({ hasText: /^(Yes|Confirm|Cancel Document|OK)$/ });
  if (await confirm.count()) { await press(confirm.first()); await page.waitForTimeout(5000); }
  log('AFTER CANCEL toasts ' + JSON.stringify(await toasts(page)).slice(0, 300));
  let d = await get('Quotation', NAME);
  log('API status=' + d.status + ' docstatus=' + d.docstatus);
  await open(page);
  log('CANCELLED BTNS ' + JSON.stringify(await btnList(page)));
  log('HEADER BADGE ' + clean(await main(page).innerText()).slice(0, 90));
  // Amend
  await press(main(page).getByRole('button', { name: 'Amend', exact: true }));
  await page.waitForTimeout(6000);
  log('AMEND URL ' + page.url() + ' toasts ' + JSON.stringify(await toasts(page)).slice(0, 300));
  log('AMEND TEXT ' + clean(await main(page).innerText()).replace(/^.*?(Add Quotation|Quotation Details)/, '$1').slice(0, 500));
  log('AMEND BTNS ' + JSON.stringify(await btnList(page)));
  log('AMEND INPUTS ' + JSON.stringify(await main(page).locator('input').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).slice(0, 14).map((e: any) => e.type + '|' + e.placeholder + '|' + e.value))));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-amend.png' });
  const amended = page.url().split('/').pop()!;
  if (/^SAL-QTN/.test(amended)) { d = await get('Quotation', amended); log('AMENDED DOC ' + amended + ' amended_from=' + d.amended_from + ' status=' + d.status); }
});
