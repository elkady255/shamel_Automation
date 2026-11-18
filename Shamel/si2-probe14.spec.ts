import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe14.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const modals = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.modal,.shamel-confirm-overlay')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 400)));
const errs = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.cd-error')].map((e: any) => e.innerText.trim()));
async function closeModals(page: Page) { for (let i = 0; i < 3; i++) { const c = page.locator('.modal.show button').first(); if (await c.count()) { await press(c); await page.waitForTimeout(500); } } }
test('si ui validations', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  await pickText(0, 'Ahmed', 'Ahmed Ebrahim'); await pickText(1, 'PW Packing', 'PW Packing');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(1500);
  const row = main(page).locator('table.si-table tbody tr').first();
  const itemIn = row.locator('input[placeholder="ابحث واختر"]').first(); await itemIn.click(); await itemIn.fill('PW-PS'); await page.waitForTimeout(2000);
  await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(3000);
  const qty = row.locator('input.si-num').nth(0), rate = row.locator('input.si-num').nth(1);
  log('ROW before: qty=' + await qty.inputValue() + ' rate=' + await rate.inputValue());
  const tryCase = async (label: string, q: string, r?: string) => {
    await qty.fill(q); if (r !== undefined) await rate.fill(r); await page.waitForTimeout(1500);
    log(`${label}: qty=${await qty.inputValue()} rate=${await rate.inputValue()} amount="${clean(await row.innerText())}" summary=${(clean(await main(page).innerText()).match(/إجمالي الكمية [^إ]{0,12}/)?.[0])}`);
    await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(4000);
    log(`   SAVE -> url=${page.url().split('#')[1]} modals=${JSON.stringify(await modals(page))} errs=${JSON.stringify(await errs(page))}`);
    await closeModals(page);
  };
  page.on('response', async (r) => { if (/\/api\//.test(r.url()) && r.request().method() !== 'GET' && !/session_default|getpage|get_count|notification|recalculate/.test(r.url())) { let b = ''; try { b = clean(await r.text()).slice(0, 400); } catch { /* */ } log('API ' + r.request().method() + ' ' + r.status() + ' ' + r.url().split('/api/')[1]?.slice(0, 100) + ' => ' + b); } });
  await tryCase('rate -50', '2', '-50');
});
