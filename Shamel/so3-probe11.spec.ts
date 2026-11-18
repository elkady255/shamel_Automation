import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 295_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe11.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const ov = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.so-overlay,.qr-overlay,.base-modal,.modal.show,.gq-overlay')].filter((e: any) => e.offsetWidth > 150).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 500)));
const toasts = (p: Page) => p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts().then((a) => [...new Set(a.map(clean).filter(Boolean))]);
test('so cancel/amend + general info + getqt', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/SAL-ORD-2026-03115', LOAD); await page.waitForTimeout(8000);
  await press(main(page).getByRole('button', { name: 'إلغاء المستند', exact: true })); await page.waitForTimeout(2000);
  log('CANCEL DIALOG ' + JSON.stringify(await ov(page)));
  const yes = page.locator('.base-modal button,.modal.show button,.so-overlay button').filter({ hasText: /^(نعم|تأكيد|إلغاء المستند|موافق|اعتماد)$/ });
  log('cancel confirm btns ' + await yes.count()); if (await yes.count()) { await press(yes.last()); await page.waitForTimeout(5000); }
  log('AFTER CANCEL BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(0, 5)) + ' toasts ' + JSON.stringify(await toasts(page)));
  const am = main(page).getByRole('button', { name: 'تعديل', exact: true });
  if (await am.count()) { await press(am); await page.waitForTimeout(7000); log('AMEND -> url ' + page.url()); log('AMEND page ' + clean(await main(page).innerText()).slice(100, 420)); log('AMEND BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(0, 6))); await page.screenshot({ path: 'Shamel/so3-p11-amend.png' }); }
  // general info on new
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(2500); };
  await pickText(1, 'CU-2026-00002', 'CU-2026-00002');
  log('CUSTOMER 00002 name/taxid ' + JSON.stringify(await main(page).locator('input').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => e.value).filter(Boolean).slice(0, 10))));
  await press(main(page).getByRole('button', { name: 'المعلومات العامة', exact: true })); await page.waitForTimeout(2500);
  log('GENERAL INFO TEXT ' + clean(await main(page).innerText()).slice(100, 1500));
  log('GENERAL INFO INPUTS ' + JSON.stringify(await main(page).locator('input:visible,textarea:visible').evaluateAll((els: any[]) => els.map((e) => (e.placeholder || e.type).slice(0, 14) + '=' + String(e.value).slice(0, 30)))));
  // payment terms template
  const ptt = main(page).getByPlaceholder('ابحث واختر'); log('GI dropdown count ' + await ptt.count());
  for (let i = 0; i < await ptt.count(); i++) { const v = await ptt.nth(i).inputValue(); const ph = await ptt.nth(i).evaluate((e: any) => e.closest('div')?.parentElement?.innerText.replace(/\s+/g, ' ').slice(0, 30)); log(`  dd${i} [${ph}] = ${v}`); }
});
