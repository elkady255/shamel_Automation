import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('meta', async () => {
  fs.writeFileSync(OUT, '');
  const dt = await api.get('DocType', 'Quotation');
  log('NAMING ' + dt.autoname + ' submittable=' + dt.is_submittable);
  for (const f of dt.fields) log(`META ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|def=${f.default}|hid=${f.hidden}|ro=${f.read_only}|opt=${(f.options || '').toString().replace(/\n/g, ',').slice(0, 100)}|dep=${f.depends_on || ''}`);
  const rows = await api.list('Quotation', [], ['name', 'status', 'docstatus', 'party_name', 'quotation_to', 'company', 'grand_total', 'transaction_date'], 40);
  log('QUOTES ' + rows.length + ' ' + JSON.stringify(rows));
  const ss = await api.call('frappe.client.get', { doctype: 'Selling Settings', name: 'Selling Settings' });
  log('SELLING_SETTINGS ' + JSON.stringify({ allow_zero: ss.allow_zero_qty_in_quotation, price_list: ss.selling_price_list, cust: ss.cust_master_name }));
  const crm = await api.call('frappe.client.get', { doctype: 'CRM Settings', name: 'CRM Settings' }).catch((e: any) => 'ERR ' + String(e).slice(0, 100));
  log('CRM ' + JSON.stringify(crm && crm.default_valid_till ? crm.default_valid_till : crm).slice(0, 300));
  const cd = await api.list('Child DocType' as any, [], ['name'], 1).catch(() => null);
  const it = await api.get('DocType', 'Quotation Item');
  for (const f of it.fields) log(`ITEMMETA ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|hid=${f.hidden}|ro=${f.read_only}|opt=${(f.options || '').toString().slice(0, 40)}`);
});

test('route + list', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/customer-groups', LOAD);
  await page.waitForTimeout(6000);
  const side = clean(await page.locator('aside,nav').first().innerText().catch(() => ''));
  log('SIDEBAR ' + side.slice(0, 800));
  const links = await page.locator('a[href*="selling"]').evaluateAll((els) => els.map((e: any) => e.getAttribute('href') + '|' + e.innerText.trim()));
  log('LINKS ' + JSON.stringify(links));
});
