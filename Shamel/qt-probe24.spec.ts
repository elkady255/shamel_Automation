import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 100_000 });
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe24.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('item flags', async () => {
  fs.writeFileSync(OUT, '');
  for (const code of ['Ads', 'IND182210', '2121', '1111', '45', 'tes-RED', 'BR-1']) {
    const r = await api.list('Item', [['name', '=', code]], ['name', 'item_name', 'is_stock_item', 'is_sales_item', 'has_variants', 'disabled', 'item_group', 'stock_uom'], 3);
    log(code + ' ' + JSON.stringify(r));
  }
  const nonstockCount = await api.list('Item', [['is_stock_item', '=', 0], ['is_sales_item', '=', 1], ['has_variants', '=', 0], ['disabled', '=', 0]], ['name', 'item_name'], 300);
  log('NON-STOCK sales items count (<=300) ' + nonstockCount.length + ' sample ' + JSON.stringify(nonstockCount.slice(0, 8)));
  const ss = await api.call('frappe.client.get', { doctype: 'Selling Settings', name: 'Selling Settings' });
  const keys = Object.keys(ss).filter((k) => /price|auto|valid|zero|editable|delivery|so_|dn_/.test(k));
  log('SELLING SETTINGS ' + JSON.stringify(Object.fromEntries(keys.map((k) => [k, ss[k]]))));
});
