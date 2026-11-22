import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 120_000 });
test.use({ viewport: { width: 1500, height: 2400 }, actionTimeout: 15_000 });
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so5-html.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('so html', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', { timeout: 100_000 }); await page.waitForTimeout(9000);
  const up = (t: string) => page.evaluate((t) => { const n = [...document.querySelectorAll('main *')].find((e: any) => e.children.length === 0 && (e.innerText || '').trim() === t) as any; return n ? n.parentElement.parentElement.outerHTML.slice(0, 700) : 'NOT FOUND'; }, t);
  log('SKIP ' + await up('تخطي إشعار التسليم'));
  log('IGNORE ' + await up('تجاهل قاعدة التسعير'));
  await press(main(page).getByRole('button', { name: 'معلومات إضافية', exact: true })); await page.waitForTimeout(2000);
  log('TERR ' + await up('المنطقة'));
  log('PRINT ' + await up('الطباعة بدون المبالغ'));
  log('COUPON-LIST: n/a');
});
