import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 295_000 });
test.use({ viewport: { width: 1500, height: 1900 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe10.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const ov = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.so-overlay,.qr-overlay,.base-modal,.modal.show')].filter((e: any) => e.offsetWidth > 150).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 900) + ' || ' + [...e.querySelectorAll('input,textarea')].map((i: any) => i.type + ':' + (i.placeholder || '').slice(0, 14) + ':' + String(i.value).slice(0, 10)).join(',')));
const go = async (p: Page, n: string) => { await p.goto('about:blank'); await p.goto('/desk/shamel#/selling/sales-orders/' + n, LOAD); await p.waitForTimeout(8000); };
const create = async (page: Page, label: string) => { await press(main(page).getByRole('button', { name: 'إنشاء', exact: true })); await page.waitForTimeout(1200); await press(page.locator('.cd-action-menu *').filter({ hasText: new RegExp('^' + label + '$') }).first()); await page.waitForTimeout(6000); };
test('so create menu', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const N = 'SAL-ORD-2026-03115';
  await go(page, N); await press(main(page).getByRole('button', { name: 'اعتماد', exact: true })); await page.waitForTimeout(6000);
  log('SUBMITTED BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(0, 6)));
  for (const label of ['فاتورة المبيعات', 'طلب المواد', 'أمر الشراء', 'الدفع', 'إذن التسليم']) {
    await go(page, N); await create(page, label);
    log(`CREATE ${label} -> url ${page.url()} | overlay ${JSON.stringify(await ov(page))}`);
    log(`   page text ${clean(await main(page).innerText()).slice(0, 260)}`);
    await page.screenshot({ path: `Shamel/so3-p10-${label.length}.png` });
  }
});
