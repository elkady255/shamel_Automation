import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe5.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('data', async () => {
  fs.writeFileSync(OUT, '');
  const q = await api.get('Quotation', 'SAL-QTN-2026-01655');
  const { items, taxes, payment_schedule, ...head } = q;
  log('HEAD ' + JSON.stringify(head).slice(0, 2500));
  log('ITEMS ' + JSON.stringify(items.map((i: any) => ({ ic: i.item_code, qty: i.qty, rate: i.rate, uom: i.uom, wh: i.warehouse, name: i.item_name }))));
  log('TAXES ' + JSON.stringify(taxes));
  log('PAY ' + JSON.stringify(payment_schedule));
  const cust = await api.list('Customer', [['disabled', '=', 0]], ['name', 'customer_name', 'default_currency', 'default_price_list', 'territory', 'customer_group', 'payment_terms'], 8);
  log('CUSTOMERS ' + JSON.stringify(cust));
  const items2 = await api.list('Item', [['is_stock_item', '=', 1], ['has_variants', '=', 0], ['is_sales_item', '=', 1], ['disabled', '=', 0]], ['name', 'item_name', 'stock_uom', 'has_batch_no', 'has_serial_no'], 8);
  log('ITEMS_OK ' + JSON.stringify(items2));
  const nonstock = await api.list('Item', [['is_stock_item', '=', 0], ['is_sales_item', '=', 1], ['disabled', '=', 0]], ['name', 'item_name'], 3);
  log('NONSTOCK ' + JSON.stringify(nonstock));
  const variants = await api.list('Item', [['has_variants', '=', 1]], ['name'], 3);
  log('TEMPLATES ' + JSON.stringify(variants));
  const nosale = await api.list('Item', [['is_sales_item', '=', 0], ['is_stock_item', '=', 1]], ['name', 'item_name'], 3);
  log('NOSALE ' + JSON.stringify(nosale));
  const lost = await api.list('Quotation Lost Reason', [], ['name', 'order_lost_reason'], 10);
  log('LOSTREASONS ' + JSON.stringify(lost));
  const ptt = await api.list('Payment Terms Template', [], ['name'], 5);
  log('PTT ' + JSON.stringify(ptt));
  const tnc = await api.list('Terms and Conditions', [], ['name'], 5);
  log('TNC ' + JSON.stringify(tnc));
  const stt = await api.list('Sales Taxes and Charges Template', [['disabled', '=', 0]], ['name', 'company'], 10);
  log('STT ' + JSON.stringify(stt));
  const ar = await api.call('frappe.client.get', { doctype: 'Accounts Settings', name: 'Accounts Settings' });
  log('ACCSET ' + JSON.stringify({ fetch: ar.use_exchange_rate_fetching_rule ?? null, noexch: ar.action_if_no_exchange_rate_found ?? null, role: ar.allowed_to_edit_exchange_rate ?? ar.exchange_rate_editing_role ?? null }).slice(0, 400));
  const comp = await api.list('Company', [], ['name', 'default_currency'], 20);
  log('COMPANIES ' + JSON.stringify(comp));
});
