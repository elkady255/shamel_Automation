import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 240_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe12.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const ov = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.so-overlay,.qr-overlay,.base-modal,.modal.show,.gq-overlay')].filter((e: any) => e.offsetWidth > 150).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 500)));
test('so list bulk + getqt', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders', LOAD); await page.waitForTimeout(9000);
  const s = main(page).getByPlaceholder('البحث باستخدام الـ ID');
  for (const n of ['SAL-ORD-2026-03114', 'SAL-ORD-2026-03113']) {
    await s.fill(n); await page.waitForTimeout(3500);
    const r = main(page).locator('tbody tr').filter({ hasText: n }).first();
    log(n + ' ROW ' + clean(await r.innerText()));
    await press(r.locator('input[type=checkbox]').first()); await page.waitForTimeout(1500);
    log(n + ' BULK BAR ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(-11)));
    const ed = main(page).getByRole('button', { name: 'تعديل', exact: true });
    if (await ed.count()) { await press(ed); await page.waitForTimeout(2500); log(n + ' BULK EDIT POPUP ' + JSON.stringify(await ov(page))); const upd = page.locator('.base-modal button,.so-overlay button').filter({ hasText: /^(تحديث|حفظ)$/ }); log('  update btns ' + await upd.count()); await page.keyboard.press('Escape'); await page.evaluate(() => document.querySelectorAll('.base-modal button,.so-overlay button').forEach((b: any) => { if (/^إلغاء$/.test(b.innerText.trim())) b.click(); })); await page.waitForTimeout(600); }
    await press(r.locator('input[type=checkbox]').first()); await page.waitForTimeout(800);
  }
  // sort/filter UI
  log('LIST FILTER UI ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(0, 8)));
  // get items from quotation
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  await press(main(page).getByRole('button', { name: 'إضافة الأصناف من عرض السعر', exact: true })); await page.waitForTimeout(4000);
  const rows = page.locator('.gq-overlay tbody tr'); log('GQ rows ' + await rows.count());
  const t = page.locator('.gq-overlay tbody tr').filter({ hasText: 'SAL-QTN-2026-01703' }).first();
  await press(t.locator('input[type=checkbox]').first()); await page.waitForTimeout(800);
  await press(page.locator('.gq-overlay button').filter({ hasText: /^إضافة الأصناف$/ }).first()); await page.waitForTimeout(6000);
  log('AFTER GET: ' + clean(await main(page).innerText()).slice(100, 700));
  log('ROW inputs ' + JSON.stringify(await main(page).locator('table tbody tr').first().locator('input').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + e.value))));
  log('HEADER inputs ' + JSON.stringify(await main(page).locator('input:visible').evaluateAll((els: any[]) => els.map((e) => e.value).filter(Boolean).slice(0, 12))));
  await page.screenshot({ path: 'Shamel/so3-p12-fromqt.png', fullPage: true });
});
