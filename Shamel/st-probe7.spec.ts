import { test, request, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe7.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/sales-tax-templates';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}

test('api disabled flags', async () => {
  fs.writeFileSync(OUT, '');
  const c = await request.newContext({ baseURL: process.env.BASE_URL, timeout: 90_000 });
  await c.post('/api/method/login', { form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! } });
  for (const n of ['warrqa - Warrqa', '6+526 - E', 'VAT - E']) {
    const r = await c.get(`/api/resource/${encodeURIComponent('Sales Taxes and Charges Template')}/${encodeURIComponent(n)}`);
    const d = (await r.json()).data;
    log(`API ${n}: disabled=${d?.disabled} default=${d?.is_default} title=${d?.title} docstatus=${d?.docstatus} rows=${d?.taxes?.length}`);
  }
});

test('ui disabled + delete', async ({ page }) => {
  await open(page, '/' + encodeURIComponent('6+526 - E'));
  log('6+526 CHECKS ' + JSON.stringify(await main(page).locator('input[type=checkbox]').evaluateAll((els) => els.map((e: any) => e.checked))));
  await open(page, '');
  const rows = main(page).locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const t = clean(await rows.nth(i).innerText());
    if (/6\+526|warrqa/i.test(t)) log('LIST ROW ' + t + ' | disabledCellHTML=' + (await rows.nth(i).locator('td').nth(4).innerHTML()).replace(/\s+/g, ' ').slice(0, 200));
  }
  await open(page, '/' + encodeURIComponent('VAT - E'));
  const dels = main(page).locator('[title="حذف"]');
  log('DELETE ICONS ' + (await dels.count()));
  await press(dels.first());
  await page.waitForTimeout(2000);
  log('AFTER DELETE CLICK BODY ' + clean(await page.locator('body').innerText()).slice(0, 700));
  log('OVERLAYS ' + JSON.stringify(await page.locator('[class*=modal], [class*=dialog], [class*=confirm], [role=alertdialog]').evaluateAll((els) => els.map((e: any) => (e.className || '').toString().slice(0, 40) + '|' + (e.innerText || '').trim().slice(0, 150)))));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  const tab = main(page).getByText(/السجلات المرتبطة/).first();
  await press(tab);
  await page.waitForTimeout(2500);
  log('CONNECTIONS ' + clean(await main(page).innerText()).slice(0, 1800));
});
