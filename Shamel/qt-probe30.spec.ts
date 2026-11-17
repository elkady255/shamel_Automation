import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe30.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack],[class*=msg]').allInnerTexts()).map(clean).filter(Boolean);

test('list edit popup', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations', LOAD);
  await page.waitForTimeout(8000);
  const rows = main(page).locator('tbody tr');
  // select the CANCELLED row (SAL-QTN-2026-01674)
  const target = rows.filter({ hasText: 'SAL-QTN-2026-01703' }).first();
  log('TARGET ROW ' + clean(await target.innerText()));
  await press(target.getByRole('checkbox'));
  await page.waitForTimeout(1000);
  const bar = (await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
  log('BULK BAR (cancelled) ' + JSON.stringify(bar));
  const editBtn = main(page).getByRole('button', { name: 'تعديل', exact: true });
  await press(editBtn.first());
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-list-edit.png' });
  log('EDIT POPUP INPUTS ' + JSON.stringify(await page.locator('input:visible').evaluateAll((els) => els.slice(-4).map((e: any) => e.className.slice(0, 10) + ':' + e.placeholder + ':' + e.value))));
  const field = page.locator('input.cs-input:visible, input[role=combobox]:visible').last();
  await field.click(); await page.waitForTimeout(1500);
  const o = await opts(page);
  log('EDIT FIELD OPTIONS count=' + o.length + ' ' + JSON.stringify(o.slice(0, 12)));
});

