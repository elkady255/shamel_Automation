import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1600, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si2-probe9.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const modals = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.modal,.shamel-confirm-overlay')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 500)));
const menus = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.cd-action-menu,[role=menu],[class*=dropdown-menu]')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 300)));
test('si ui create+submit', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  page.on('response', async (r) => { if (/\/api\//.test(r.url()) && (r.request().method() !== 'GET' || r.status() >= 400) && !/session_default|getpage|get_count|notification|recalculate/.test(r.url())) { let b = ''; try { b = clean(await r.text()).slice(0, 300); } catch { /* */ } log('API ' + r.request().method() + ' ' + r.status() + ' ' + r.url().split('/api/')[1]?.slice(0, 100) + ' => ' + b); } });
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new', LOAD); await page.waitForTimeout(9000);
  const pickText = async (idx: number, q: string, opt: string) => { const f = main(page).getByPlaceholder('ابحث واختر').nth(idx); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1500); await press(page.locator('.cs-option:visible').filter({ hasText: opt }).first()); await page.waitForTimeout(1500); };
  await pickText(0, 'Ahmed', 'Ahmed Ebrahim'); await pickText(1, 'PW Packing', 'PW Packing');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2000);
  const row = main(page).locator('table.si-table tbody tr').first();
  const itemIn = row.locator('input[placeholder="ابحث واختر"]').first(); await itemIn.click(); await itemIn.fill('PW-PS'); await page.waitForTimeout(2000);
  await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(3000);
  log('SUMMARY ' + clean(await main(page).innerText()).match(/إجمالي الكمية.{0,400}/)?.[0]);
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(6000);
  log('AFTER SAVE URL ' + page.url()); log('MODALS ' + JSON.stringify(await modals(page)));
  log('BTN ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await page.screenshot({ path: 'Shamel/si2-p9-saved.png' });
  const m = page.url().match(/sales-invoices\/([^/?#]+)/); log('NAME ' + m?.[1]);
  // submit
  const sub = main(page).getByRole('button', { name: 'اعتماد', exact: true });
  if (await sub.count()) { await press(sub); await page.waitForTimeout(2500); log('AFTER SUBMIT CLICK MODALS ' + JSON.stringify(await modals(page))); 
    const yes = page.locator('.shamel-confirm-overlay:visible button, .modal.show button').filter({ hasText: /نعم|تأكيد|اعتماد|موافق/ }).first(); if (await yes.count()) { await press(yes); await page.waitForTimeout(6000); } }
  log('AFTER SUBMIT URL ' + page.url() + ' MODALS ' + JSON.stringify(await modals(page)));
  log('BTN2 ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  log('HEAD2 ' + clean((await main(page).innerText()).slice(0, 300)));
  await page.screenshot({ path: 'Shamel/si2-p9-submitted.png' });
  // Create menu
  const cr = main(page).getByRole('button', { name: 'إنشاء', exact: true }); if (await cr.count()) { await press(cr); await page.waitForTimeout(1500); log('CREATE MENU ' + JSON.stringify(await menus(page))); await page.keyboard.press('Escape'); }
  const vw = main(page).getByRole('button', { name: 'عرض', exact: true }); if (await vw.count()) { await press(vw); await page.waitForTimeout(1500); log('VIEW MENU ' + JSON.stringify(await menus(page))); await press(vw); }
  const qc = main(page).getByRole('button', { name: 'إنشاء فحص جودة' }); if (await qc.count()) { await press(qc); await page.waitForTimeout(2500); log('QC ' + JSON.stringify(await modals(page))); await page.screenshot({ path: 'Shamel/si2-p9-qc.png' }); }
});
