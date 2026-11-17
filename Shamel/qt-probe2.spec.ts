import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);

test('list', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/customer-groups', LOAD);
  await page.waitForTimeout(6000);
  await press(page.getByText('Quotations', { exact: true }).first().or(page.getByText('عروض الأسعار', { exact: true }).first()));
  await page.waitForTimeout(6000);
  log('URL ' + page.url());
  log('TEXT ' + clean(await main(page).innerText()).slice(0, 1800));
  log('HEADERS ' + JSON.stringify((await main(page).locator('th').allInnerTexts()).map(clean)));
  log('BTNS ' + JSON.stringify(await btns(page)));
  log('ROWS ' + (await main(page).locator('tbody tr').count()));
  // first row (any) bulk bar
  await press(main(page).locator('tbody tr').first().getByRole('checkbox'));
  await page.waitForTimeout(1000);
  log('BULK (first row) ' + JSON.stringify(await btns(page)));
  await press(main(page).locator('tbody tr').first().getByRole('checkbox'));
  await page.waitForTimeout(500);
  // find a Draft row and select it
  const rows = main(page).locator('tbody tr');
  const n = await rows.count();
  for (let i = 0; i < n; i++) {
    const t = clean(await rows.nth(i).innerText());
    if (/مسودة|Draft/.test(t)) {
      await press(rows.nth(i).getByRole('checkbox'));
      await page.waitForTimeout(800);
      log('DRAFT ROW ' + t);
      log('BULK (draft) ' + JSON.stringify(await btns(page)));
      break;
    }
  }
  // status texts present
  const all = clean(await main(page).innerText());
  log('STATUS WORDS ' + JSON.stringify([...new Set((all.match(/مسودة|مفتوح|تم الرد|مطلوب جزئيا|تم الطلب|مفقود|ملغي|منتهي|Draft|Open|Replied|Expired|Cancelled|Lost|Ordered/g) || []))]));
  // pagination / page size
  log('PAGER ' + JSON.stringify((await main(page).locator('[class*=pagination],[class*=pager]').allInnerTexts()).map(clean)));
});
