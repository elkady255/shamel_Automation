import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe22.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const btnList = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter((b) => /Cancel|Set|Update|Create|Amend|Save|Submit/.test(b));

test('amended doc', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const d = await get('Quotation', 'SAL-QTN-2026-01674-1');
  log('AMENDED DOC amended_from=' + d.amended_from + ' status=' + d.status + ' docstatus=' + d.docstatus + ' items=' + d.items.length + ' emp=' + d.custom_employee);
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/SAL-QTN-2026-01674-1', LOAD);
  await page.waitForTimeout(9000);
  log('FRESH LOAD badge ' + clean(await main(page).innerText()).slice(0, 110));
  log('FRESH BTNS ' + JSON.stringify(await btnList(page)));
  log('FRESH TEXT ' + clean(await main(page).innerText()).replace(/^.*?Quotation Details/, '').slice(0, 260));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-amended-fresh.png' });
  // Does the page show "Amended From"?
  log('HAS AMENDED FROM LABEL ' + /Amended From/i.test(await main(page).innerText()));
  // Stale check: from the cancelled doc, click Amend then wait longer & dump again
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/SAL-QTN-2025-00017', LOAD);
  await page.waitForTimeout(8000);
  log('OLD CANCELLED BTNS ' + JSON.stringify(await btnList(page)));
});
