import { test } from '@playwright/test';
import * as fs from 'fs';
import { get } from './helpers/qt-api';
test('q3', async () => {
  const out: string[] = [];
  for (const n of ['03144', '03145', '03146', '03129', '03128', '03124', '03132']) { const d = await get('Sales Order', 'SAL-ORD-2026-' + n); out.push(n + ' ' + JSON.stringify({ cur: d.currency, cr: d.conversion_rate, plc: d.price_list_currency, plcr: d.plc_conversion_rate, gt: d.grand_total, bgt: d.base_grand_total, rounded: d.rounded_total, wh: d.items[0].warehouse, uom: d.items[0].uom, cf: d.items[0].conversion_factor, sq: d.items[0].stock_qty, qty: d.items[0].qty, amt: d.items[0].amount, disc: d.discount_amount, dp: d.additional_discount_percentage, status: d.status, av: d.custom_availability_status ?? null })); }
  fs.writeFileSync('C:/Playwright_Automation/Shamel/so3-q3.out.txt', out.join('\n'));
});
