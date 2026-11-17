import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe19.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('lost reason dropdown request', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const dt = await api.get('DocType', 'Quotation Lost Reason');
  for (const f of dt.fields) log(`QLR FIELD ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|opt=${f.options || ''}`);
  const rows = await api.list('Quotation Lost Reason', [], ['name', 'order_lost_reason', 'disabled'], 50).catch(async () => api.list('Quotation Lost Reason', [], ['name', 'order_lost_reason'], 50));
  log('QLR ROWS ' + JSON.stringify(rows));
  const reqs: string[] = [];
  page.on('request', (r) => { if (/api\//.test(r.url()) && !/notification|search_widget_hist|socket/.test(r.url())) reqs.push(r.method() + ' ' + decodeURIComponent(r.url()).slice(0, 300) + ' ' + (r.postData() || '').slice(0, 300)); });
  page.on('response', async (r) => { if (/search|lost/i.test(r.url()) && /api\//.test(r.url())) log('RESP ' + r.status() + ' ' + decodeURIComponent(r.url()).slice(0, 200) + ' ' + (await r.text().catch(() => '')).slice(0, 300)); });
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/SAL-QTN-2026-01677', LOAD);
  await page.waitForTimeout(9000);
  reqs.length = 0;
  await press(main(page).getByRole('button', { name: 'Set as Lost', exact: true }));
  await page.waitForTimeout(1500);
  const reason = page.getByText('Lost Reasons').first().locator('xpath=following::input[1]');
  await reason.click(); await page.waitForTimeout(2500);
  log('REQS after open dropdown ' + JSON.stringify(reqs, null, 0));
  await reason.fill('hes'); await page.waitForTimeout(2500);
  log('REQS after typing ' + JSON.stringify(reqs.slice(-3)));
  log('OPTIONS ' + JSON.stringify((await page.locator('.cs-option, [class*=option]').allInnerTexts()).map(clean)));
});
