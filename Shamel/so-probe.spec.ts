import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const OUT = 'C:/Playwright_Automation/Shamel/so-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('so new from blanket', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const bo = await api.get('Blanket Order', 'MFG-BLR-2026-00030');
  log('BO ' + JSON.stringify({ t: bo.blanket_order_type, c: bo.customer, co: bo.company, from: bo.from_date, to: bo.to_date, ds: bo.docstatus, items: bo.items.map((i: any) => [i.item_code, i.qty, i.rate]) }));
  const cf = await api.list('Custom Field', [['dt', '=', 'Sales Order']], ['fieldname', 'label', 'fieldtype', 'reqd', 'hidden', 'depends_on', 'mandatory_depends_on', 'options'], 100);
  for (const f of cf.filter((x: any) => x.reqd || x.mandatory_depends_on)) log(`CF REQ ${f.fieldname}|${f.label}|${f.fieldtype}|reqd=${f.reqd}|mdep=${f.mandatory_depends_on || ''}|opt=${f.options || ''}`);
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/sales-orders/new?blanket_order=MFG-BLR-2026-00030', LOAD);
  await page.waitForTimeout(10000);
  log('URL ' + page.url());
  log('TEXT ' + clean(await main(page).innerText()).slice(0, 2500));
  log('INPUTS ' + JSON.stringify(await main(page).locator('input,textarea').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${i}:${e.className.slice(0, 9)}:${e.placeholder}:${String(e.value).slice(0, 30)}`))));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/so-new.png', fullPage: true });
});
