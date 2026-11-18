import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 295_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe8.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const ov = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.so-overlay,.qr-overlay,.base-modal,.modal.show,[class*=confirm]')].filter((e: any) => e.offsetWidth > 150).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 400)));
const status = async (p: Page) => clean(await main(p).innerText()).slice(110, 135);
const go = async (p: Page, n: string) => { await p.goto('about:blank'); await p.goto('/desk/shamel#/selling/sales-orders/' + n, LOAD); await p.waitForTimeout(8000); };
const toasts = (p: Page) => p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts().then((a) => [...new Set(a.map(clean).filter(Boolean))]);
test('so hold/close', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const N = 'SAL-ORD-2026-03114';
  await go(page, N); log('START ' + await status(page));
  // delete icon on submitted
  await press(main(page).locator('[title="حذف"]').first()); await page.waitForTimeout(2000);
  log('DELETE ICON on submitted -> ' + JSON.stringify(await ov(page))); await page.screenshot({ path: 'Shamel/so3-p8-del.png' });
  await page.evaluate(() => document.querySelectorAll('.base-modal button,.modal.show button').forEach((b: any) => { if (/^(لا|إلغاء|إغلاق)$/.test(b.innerText.trim())) b.click(); })); await page.keyboard.press('Escape'); await page.waitForTimeout(800);
  // hold
  const hold = async (txt: string) => { await go(page, N); await press(main(page).getByRole('button', { name: 'تعليق', exact: true })); await page.waitForTimeout(1500); const ta = page.locator('.so-overlay textarea').first(); await ta.fill(txt); await page.waitForTimeout(400); await press(page.locator('.so-overlay button').filter({ hasText: /^اعتماد$/ }).first()); await page.waitForTimeout(3000); log(`HOLD "${txt.slice(0, 12)}..(${txt.length})" -> overlay ${JSON.stringify(await ov(page))} toasts ${JSON.stringify(await toasts(page))} status ${await status(page)}`); };
  await hold('');
  await hold('ab');
  await hold('x'.repeat(501));
  await go(page, N);
  await press(main(page).getByRole('button', { name: 'تعليق', exact: true })); await page.waitForTimeout(1500);
  log('HOLD maxlength attr ' + await page.locator('.so-overlay textarea').first().getAttribute('maxlength'));
  await page.locator('.so-overlay textarea').first().fill('سبب التعليق للاختبار'); await press(page.locator('.so-overlay button').filter({ hasText: /^اعتماد$/ }).first()); await page.waitForTimeout(4000);
  log('HOLD valid -> status ' + await status(page) + ' BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(0, 6)));
  // activity log
  log('HOLD activity text ' + (clean(await main(page).innerText()).match(/سبب التعليق.{0,80}/)?.[0] ?? 'none'));
  await press(main(page).getByRole('button', { name: 'استئناف', exact: true })); await page.waitForTimeout(4000);
  log('RESUME -> status ' + await status(page));
  await press(main(page).getByRole('button', { name: 'إغلاق', exact: true })); await page.waitForTimeout(4000);
  log('CLOSE -> status ' + await status(page) + ' BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(0, 6)));
  await press(main(page).getByRole('button', { name: 'إعادة فتح', exact: true })); await page.waitForTimeout(4000);
  log('REOPEN -> status ' + await status(page));
  // update items popup
  await press(main(page).getByRole('button', { name: 'تحديث الأصناف', exact: true })); await page.waitForTimeout(2500);
  log('UPDATE ITEMS INPUTS ' + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.so-overlay input')].map((i: any) => i.type + ':' + i.value + (i.readOnly || i.disabled ? ':RO' : '')))));
  const nums = page.locator('.so-overlay input[type=number]'); log('UPDATE ITEMS number inputs ' + await nums.count());
});
