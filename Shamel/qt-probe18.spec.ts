import { test, type Page } from '@playwright/test';
import { get, method } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe18.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const open = async (page: Page, name: string) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/' + name, LOAD);
  await page.waitForTimeout(9000);
};
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack],[class*=msg]').allInnerTexts()).map(clean).filter(Boolean);
const modalText = (p: Page) => p.evaluate(() => {
  const els = [...document.querySelectorAll('body *')].filter((e: any) => e.offsetParent !== null && /fixed/.test(getComputedStyle(e).position) && e.innerText && e.getBoundingClientRect().width > 200 && e.getBoundingClientRect().width < 1300);
  return els.map((e: any) => (e.innerText as string).replace(/\s+/g, ' ')).slice(-2).join(' ## ');
});

test('set as lost flow', async ({ page }) => {
  fs.writeFileSync(OUT, ''); const NAME = 'SAL-QTN-2026-01677';
  await open(page, NAME);
  await press(main(page).getByRole('button', { name: 'Set as Lost', exact: true }));
  await page.waitForTimeout(1200);
  const dlg = page.locator('div', { has: page.getByText('Set As Lost', { exact: true }) }).last();
  // empty
  await press(page.getByRole('button', { name: 'Declare Lost' }));
  await page.waitForTimeout(2500);
  log('LOST EMPTY toasts ' + JSON.stringify(await toasts(page)).slice(0, 300) + ' | modal ' + (await modalText(page)).slice(0, 300));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-lost-empty.png' });
  // choose reason
  const reason = page.getByText('Lost Reasons').first().locator('xpath=following::input[1]');
  await reason.click(); await page.waitForTimeout(1500); log('LOST OPEN-EMPTY options ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean))); await reason.fill('hes'); await page.waitForTimeout(2000);
  log('LOST REASON OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 12)));
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(800);
  const inputs = page.locator('input[type=text]:not(.cs-input), textarea').filter({ hasNot: page.locator('x') });
  const txt = page.getByText('Competitors').first().locator('xpath=following::input[position()<=2]');
  const cnt = 2;
  log('MODAL TEXT INPUT COUNT ' + cnt);
  // find competitors & detailed reason: last two text inputs
  const comp = txt.nth(cnt - 2); const det = txt.nth(cnt - 1);
  log('COMP max=' + (await comp.getAttribute('maxlength')) + ' DET max=' + (await det.getAttribute('maxlength')));
  await comp.fill('x'); await det.fill('y');
  await press(page.getByRole('button', { name: 'Declare Lost' }));
  await page.waitForTimeout(3000);
  log('LOST 1-char comp/det toasts ' + JSON.stringify(await toasts(page)).slice(0, 300));
  const mid = await get('Quotation', NAME);
  log('LOST 1-char => status ' + mid.status + ' competitors=' + JSON.stringify(mid.competitors) + ' reason=' + mid.order_lost_reason);
  if (mid.status !== 'Lost') {
    await comp.fill('Competitor A'); await det.fill('Price too high');
    await press(page.getByRole('button', { name: 'Declare Lost' }));
    await page.waitForTimeout(4000);
    log('LOST valid toasts ' + JSON.stringify(await toasts(page)).slice(0, 300));
  }
  const fin = await get('Quotation', NAME);
  log('FINAL status=' + fin.status + ' lost_reasons=' + JSON.stringify(fin.lost_reasons) + ' competitors=' + JSON.stringify(fin.competitors) + ' detail=' + fin.order_lost_reason);
  await open(page, NAME);
  log('LOST DETAIL BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter((b) => /Cancel|Set|Update|Create|Amend|Save|Submit/.test(b))));
  await press(main(page).getByRole('button', { name: 'More Information', exact: true }));
  await page.waitForTimeout(1500);
  log('LOST MORE INFO ' + clean(await main(page).innerText()).replace(/^.*?More Information/, '').slice(0, 700));
});


