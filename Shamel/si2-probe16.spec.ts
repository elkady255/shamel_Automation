import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1800 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe16.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const bm = (p: Page) => p.evaluate(() => { const c = [...document.querySelectorAll('div')].filter((e: any) => e.offsetWidth > 500 && e.offsetHeight > 300 && /^تعديل الصف/.test(e.innerText.trim()) ).sort((a: any, b: any) => a.innerText.length - b.innerText.length); const e: any = c[0]; return e ? [{ cls: String(e.className), labels: [...e.querySelectorAll('label')].map((l: any) => l.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean), inputs: [...e.querySelectorAll('input,textarea,select')].map((i: any) => i.type + ':' + (i.placeholder || '').slice(0, 12) + ':' + String(i.value).slice(0, 10) + (i.readOnly || i.disabled ? '(ro)' : '')), t: e.innerText.replace(/\s+/g, ' ').slice(0, 4000) }] : []; });
test('edit row + tax + terms popups', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  await pickText(0, 'Ahmed', 'Ahmed Ebrahim'); await pickText(1, 'PW Packing', 'PW Packing');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(1500);
  const row = main(page).locator('table.si-table tbody tr').first();
  const itemIn = row.locator('input[placeholder="ابحث واختر"]').first(); await itemIn.click(); await itemIn.fill('PW-PS'); await page.waitForTimeout(2000);
  await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(3000);
  await press(row.locator('input[type=checkbox]').first()); await page.waitForTimeout(800);
  await press(main(page).locator('[title="تعديل الصف"]').first()); await page.waitForTimeout(3500);
  const m = await bm(page); log('EDITROW ' + JSON.stringify(m.map((x) => [x.cls, x.t]))); log('EDITROW INPUTS ' + JSON.stringify(m.map((x) => x.inputs)));
  await page.screenshot({ path: 'Shamel/si2-p16-edit.png' });
  // close message and popup
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  // taxes: add row
  await page.evaluate(() => { document.querySelectorAll('.modal.show .btn-close,.modal.show button').forEach((b: any) => b.click()); });
  await page.waitForTimeout(800);
  const xs = page.locator('.base-modal [title="إغلاق"],.base-modal button:has-text("إلغاء")').first(); if (await xs.count()) { await press(xs); await page.waitForTimeout(800); }
  await press(main(page).getByRole('button', { name: 'إضافة ضريبة أو رسم' })); await page.waitForTimeout(2000);
  log('TAX TABLE HEAD ' + JSON.stringify((await main(page).locator('table').nth(1).locator('thead th').allInnerTexts()).map(clean)));
  const tr = main(page).locator('table').nth(1).locator('tbody tr').first();
  log('TAX ROW INPUTS ' + JSON.stringify(await tr.locator('input,select').evaluateAll((els: any[]) => els.map((i) => i.type + ':' + (i.placeholder || '') + ':' + i.value))));
  log('TAX ROW titles ' + JSON.stringify(await tr.locator('[title]').evaluateAll((els: any[]) => els.map((e) => e.title))));
  await press(tr.locator('input[type=checkbox]').first()); await page.waitForTimeout(800);
  const te = main(page).locator('[title="تعديل الصف"]').nth(0); log('EDIT BTN COUNT ' + await main(page).locator('[title="تعديل الصف"]').count());
  await press(main(page).locator('[title="تعديل الصف"]').last()); await page.waitForTimeout(3000);
  const m2 = await bm(page); log('TAXEDIT ' + JSON.stringify(m2.map((x) => [x.cls, x.t]))); log('TAXEDIT INPUTS ' + JSON.stringify(m2.map((x) => x.inputs)));
  await page.screenshot({ path: 'Shamel/si2-p16-tax.png' });
});
