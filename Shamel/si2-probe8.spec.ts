import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1800 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe8.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const overlay = (p: Page) => p.evaluate(() => { const els = [...document.querySelectorAll('body *')].filter((e: any) => { const s = getComputedStyle(e); return s.position === 'fixed' && e.offsetWidth > 300 && e.offsetHeight > 150 && e.innerText.trim().length > 5 && !/AN Administrator/.test(e.innerText.slice(0, 200)) ; }); const e: any = els[els.length - 1]; return e ? { cls: e.className, text: e.innerText.replace(/\s+/g, ' ').slice(0, 3500), inputs: [...e.querySelectorAll('input,textarea,select')].map((i: any) => i.type + ':' + (i.placeholder || '').slice(0, 20) + ':' + String(i.value).slice(0, 12) + (i.readOnly || i.disabled ? '(ro)' : '')) } : null; });
test('si row popups2', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  page.on('response', async (r) => { if (/\/api\//.test(r.url()) && !/session_default|getpage|get_count|notification|search_widget/.test(r.url())) { let b = ''; try { b = clean(await r.text()).slice(0, 260); } catch { /* */ } log('API ' + r.request().method() + ' ' + r.status() + ' ' + r.url().split('/api/')[1]?.slice(0, 90) + ' | ' + clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 200) + ' => ' + b); } });
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  await pickText(0, 'Ahmed', 'Ahmed Ebrahim'); await pickText(1, 'PW Packing', 'PW Packing');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2000);
  const row = main(page).locator('table.si-table tbody tr').first();
  const itemIn = row.locator('input[placeholder="ابحث واختر"]').first(); await itemIn.click(); await itemIn.fill('PW-PS'); await page.waitForTimeout(2000);
  log('OPTS ' + JSON.stringify(await page.locator('.cs-option:visible').allInnerTexts())); await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(3000); log('ITEMVAL ' + await itemIn.inputValue());
  // select row
  await press(row.locator('input[type=checkbox]').first()); await page.waitForTimeout(1200);
  log('AFTER ROW SELECT BTN ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els: any[]) => els.map((e) => e.title).filter(Boolean))));
  await page.screenshot({ path: 'Shamel/si2-p8-sel.png' });
  const edit = main(page).locator('[title="تعديل الصف"],[title="Edit Row"]').first();
  const snap = () => page.evaluate(() => [...document.querySelectorAll('.modal')].filter((e: any) => e.offsetWidth > 0).map((e: any) => ({ cls: e.className, t: e.innerText.replace(/\s+/g, ' ').slice(0, 2600), n: e.querySelectorAll('input,textarea,select').length })));
  await press(edit); 
  for (const ms of [800, 2000, 4000]) { await page.waitForTimeout(ms); log('SNAP ' + ms + ' ' + JSON.stringify(await snap())); }
  await page.screenshot({ path: 'Shamel/si2-p8-edit2.png' });
});
