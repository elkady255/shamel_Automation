import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe20.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const NAME = 'SAL-QTN-2026-01674';
const open = async (page: Page, name = NAME) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/' + name, LOAD);
  await page.waitForTimeout(9000);
};
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack],[class*=msg]').allInnerTexts()).map(clean).filter(Boolean);
const fixedText = (p: Page) => p.evaluate(() => {
  const els = [...document.querySelectorAll('body *')].filter((e: any) => e.offsetParent !== null && /fixed/.test(getComputedStyle(e).position) && e.innerText && e.getBoundingClientRect().width > 200 && e.getBoundingClientRect().width < 1300);
  return els.map((e: any) => (e.innerText as string).replace(/\s+/g, ' ')).slice(-2).join(' ## ');
});

test('auto repeat popup', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page);
  await press(main(page).getByRole('button', { name: 'Create', exact: true }));
  await page.waitForTimeout(800);
  await press(page.getByText('Auto Repeat', { exact: true }).last());
  await page.waitForTimeout(1500);
  log('AUTO REPEAT POPUP ' + (await fixedText(page)));
  log('AR INPUTS ' + JSON.stringify(await page.locator('input,select,textarea').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).slice(-6).map((e: any) => `${e.type}|ph=${e.placeholder}|val=${e.value}`))));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-autorepeat.png' });
  const save = page.getByRole('button', { name: 'Save', exact: true }).last();
  await press(save); await page.waitForTimeout(2000);
  log('AR SAVE EMPTY toasts ' + JSON.stringify(await toasts(page)).slice(0, 300) + ' | ' + (await fixedText(page)).slice(0, 400));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-autorepeat-empty.png' });
});

test('create sales order / invoice nav', async ({ page }) => {
  for (const target of ['Sales Order', 'Sales Invoice']) {
    await open(page);
    await press(main(page).getByRole('button', { name: 'Create', exact: true }));
    await page.waitForTimeout(800);
    await press(page.getByText(target, { exact: true }).last());
    await page.waitForTimeout(7000);
    log(`CREATE ${target} => URL ${page.url()}`);
    log(`CREATE ${target} TEXT ` + clean(await main(page).innerText()).slice(0, 700));
    log(`CREATE ${target} toasts ` + JSON.stringify(await toasts(page)).slice(0, 300));
    await page.screenshot({ path: `C:/Playwright_Automation/Shamel/qt-create-${target.replace(' ', '')}.png` });
  }
});

test('delete overlay on submitted', async ({ page }) => {
  await open(page);
  await press(main(page).locator('button[title="Delete"]').first());
  await page.waitForTimeout(1500);
  log('DELETE overlay (submitted) ' + (await fixedText(page)).slice(0, 500));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-delete-submitted.png' });
  const cancel = page.locator('.shamel-confirm-overlay').getByRole('button', { name: /Cancel|No/ });
  if (await cancel.count()) await press(cancel.first());
  await page.waitForTimeout(800);
  log('DOC STILL EXISTS ' + (await get('Quotation', NAME)).name);
});
