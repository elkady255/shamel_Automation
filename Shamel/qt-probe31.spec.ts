import { test, type Page } from '@playwright/test';
import { get, method } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe31.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack],[class*=msg]').allInnerTexts()).map(clean).filter(Boolean);

test('ui save without party', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  await press(main(page).getByRole('button', { name: 'إضافة صنف' }).first());
  await page.waitForTimeout(1500);
  const row = main(page).locator('table.qi-table tbody tr').first();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await itemIn.fill('IND182210'); await page.waitForTimeout(2500);
  await page.locator('.cs-option', { hasText: 'IND182210' }).first().click(); await page.waitForTimeout(3500);
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(3500);
  log('SAVE WITH ITEM BUT NO PARTY toasts ' + JSON.stringify(await toasts(page)).slice(0, 500));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-save-noparty.png' });
});

test('competitors length', async ({ page }) => {
  const NAME = 'SAL-QTN-2026-01703';
  const r = await method('frappe.client.submit', { doc: await get('Quotation', NAME) });
  log('API submit ' + NAME + ' ' + r.ok + ' ' + r.msg.slice(0, 100));
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/' + NAME, LOAD);
  await page.waitForTimeout(9000);
  const btn = main(page).getByRole('button', { name: /^(Set as Lost|تحديد كمفقود|.*مفقود.*)$/ }).first();
  log('BTN texts ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter((b) => b).slice(-6)));
  const all = main(page).getByRole('button');
  const n = await all.count();
  // Set as Lost is the 2nd of the 4 fixed actions at the end (Cancel Document, Set as Lost, Update Items, Create)
  await press(all.nth(n - 3));
  await page.waitForTimeout(1500);
  const ins = page.locator('input:visible:not(.cs-input):not([type=checkbox])');
  const cnt = await ins.count();
  log('POPUP text inputs ' + cnt + ' ' + JSON.stringify(await ins.evaluateAll((els) => els.map((e: any) => `${e.placeholder}|max=${e.maxLength}`))));
  const comp = ins.nth(cnt - 2);
  await comp.type('C'.repeat(130), { delay: 0 });
  log('COMPETITORS length after typing 130 chars = ' + (await comp.inputValue()).length);
  const det = ins.nth(cnt - 1);
  await det.type('D'.repeat(130), { delay: 0 });
  log('DETAILED length after typing 130 chars = ' + (await det.inputValue()).length);
});
