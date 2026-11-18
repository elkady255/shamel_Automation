import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1800 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe17.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const edit = (p: Page) => p.evaluate(() => { const c = [...document.querySelectorAll('div')].filter((e: any) => e.offsetWidth > 500 && e.offsetHeight > 300 && /^تعديل الصف/.test(e.innerText.trim())).sort((a: any, b: any) => a.innerText.length - b.innerText.length); const e: any = c[0]; if (!e) return null; const pick = (lab: string) => { const l = [...e.querySelectorAll('label')].find((x: any) => x.innerText.replace(/\s+/g, ' ').trim().startsWith(lab)); const box = l?.closest('div')?.parentElement; return box ? box.innerText.replace(/\s+/g, ' ').trim().slice(0, 60) + ' | inp=' + [...box.querySelectorAll('input')].map((i: any) => i.value).join(',') : null; }; return ['سعر قائمة الأسعار (العملة)', 'سعر قائمة الأسعار (بعملة الشركة)', 'السعر', 'المبلغ', 'السعر (بعملة الشركة)', 'المبلغ (بعملة الشركة)', 'صافي السعر', 'صافي المبلغ (بعملة الشركة)'].map((k) => k + ' => ' + pick(k)); });
test('draft edit row values', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/ACC-SINV-2026-02812', LOAD); await page.waitForTimeout(10000);
  await page.evaluate(() => document.querySelectorAll('.modal.show button').forEach((b: any) => b.click())); await page.waitForTimeout(800);
  const row = main(page).locator('table.si-table tbody tr').first();
  await press(row.locator('input[type=checkbox]').first()); await page.waitForTimeout(800);
  await press(main(page).locator('[title="تعديل الصف"]').first()); await page.waitForTimeout(3000);
  log('DRAFT EDITROW ' + JSON.stringify(await edit(page)));
});
test('list bulk actions on submitted', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices', LOAD); await page.waitForTimeout(9000);
  const s = main(page).getByPlaceholder('البحث باستخدام الـ ID'); await s.fill('ACC-SINV-2026-02791'); await page.waitForTimeout(3500);
  const r = main(page).locator('tbody tr').filter({ hasText: 'ACC-SINV-2026-02791' }).first();
  await press(r.locator('input[type=checkbox]').first()); await page.waitForTimeout(1500);
  log('BULK BAR submitted ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(-12)));
  const ed = main(page).getByRole('button', { name: 'تعديل', exact: true }); if (await ed.count()) { await press(ed); await page.waitForTimeout(2500); log('BULK EDIT POPUP ' + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.base-modal,.modal.show')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 500))))); }
  // partly paid row
  await page.keyboard.press('Escape');
  await s.fill('ACC-SINV-2026-02621'); await page.waitForTimeout(3500);
  const r2 = main(page).locator('tbody tr').filter({ hasText: 'ACC-SINV-2026-02621' }).first();
  log('PARTLY ROW ' + (await r2.count() ? clean(await r2.innerText()) : 'not found'));
});
