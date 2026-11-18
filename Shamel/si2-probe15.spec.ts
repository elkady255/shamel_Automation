import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe15.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const layers = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.cd-action-menu,[class*=dropdown-menu],[class*=modal],[class*=popup],[role=menu]')].filter((e: any) => e.offsetWidth > 60 && e.offsetHeight > 30 && !/AN Administrator/.test(e.innerText.slice(0, 100))).map((e: any) => String(e.className).slice(0, 30) + ' :: ' + e.innerText.replace(/\s+/g, ' ').slice(0, 700)));
test('list statuses', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices', LOAD); await page.waitForTimeout(9000);
  for (const id of ['ACC-SINV-2026-02789', 'ACC-SINV-2026-02790', 'ACC-SINV-2026-02791', 'ACC-SINV-2026-02792', 'ACC-SINV-2026-02793', 'ACC-SINV-2026-02797', 'ACC-SINV-2026-02798', 'ACC-SINV-2026-02799']) {
    const s = main(page).getByPlaceholder('البحث باستخدام الـ ID'); await s.fill(id); await page.waitForTimeout(3500);
    const r = main(page).locator('tbody tr').filter({ hasText: id }).first();
    log(id + ' => ' + (await r.count() ? clean(await r.innerText()) : 'NOT IN LIST'));
  }
});
test('paid details', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/ACC-SINV-2026-02791', LOAD); await page.waitForTimeout(10000);
  log('PAID BTN ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('PAID HEAD ' + clean((await main(page).innerText()).slice(0, 260)));
  const act = main(page).getByRole('button', { name: /^(الإجراءات|إجراءات)$/ }); log('ACTIONS COUNT ' + await act.count());
  if (await act.count()) { await press(act.first()); await page.waitForTimeout(1500); log('ACTIONS MENU ' + JSON.stringify(await layers(page))); const u = page.locator('.cd-action-menu *,[role=menu] *').filter({ hasText: /إلغاء المطابقة|فك|UnReconcile/ }).first(); if (await u.count()) { await press(u); await page.waitForTimeout(3000); log('UNRECONCILE ' + JSON.stringify(await layers(page))); await page.screenshot({ path: 'Shamel/si2-p15-unrec.png' }); } }
  await press(main(page).getByRole('button', { name: 'المعلومات العامة', exact: true }).first()); await page.waitForTimeout(2000);
  log('PAID GENERAL ' + clean(await main(page).innerText()).match(/المدفوعات.{0,900}/)?.[0]);
  await press(main(page).getByRole('button', { name: 'معلومات إضافية', exact: true }).first()); await page.waitForTimeout(2000);
  for (let k = 0; k < 2; k++) { const t = main(page).locator('button[aria-expanded=false]'); const n = await t.count(); for (let i = n - 1; i >= 0; i--) { try { await press(t.nth(i)); } catch { /* */ } } await page.waitForTimeout(600); }
  log('PAID MORE ' + clean(await main(page).innerText()).match(/الحالة.{0,1200}/)?.[0]);
  await press(main(page).getByRole('button', { name: /السجلات المرتبطة/ }).first()); await page.waitForTimeout(4000);
  log('PAID LINKED ' + clean(await main(page).innerText()).match(/السجلات المرتبطة.{0,700}/)?.[0]);
});
