import { test } from '@playwright/test';
import * as fs from 'fs';
import { post, get } from './helpers/qt-api';
import { seed, code, customer, ITEM_A, COMPANY, WAREHOUSE, today } from './helpers/ps-data';
const OUT = 'C:/Playwright_Automation/Shamel/si2-q7.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('q7', async () => {
  fs.writeFileSync(OUT, '');
  await seed(); const cust = await customer();
  const BASE = (): any => ({ customer: cust, company: COMPANY, posting_date: today(), due_date: today(), update_stock: 0, currency: 'SAR', selling_price_list: 'Standard Selling', cost_center: '101 - Main X - E', items: [{ item_code: code(ITEM_A), qty: 2, rate: 100, warehouse: WAREHOUSE, cost_center: '101 - Main X - E' }] });
  const d = BASE(); d.taxes_and_charges = 'VAT - E'; const r = await post('Sales Invoice', d); log('SI-06 VAT - E template -> ' + (r.ok ? 'ACCEPTED ' + r.name + ' tax=' + r.doc.total_taxes_and_charges : 'REFUSED ' + r.msg.slice(0, 250)));
  const d2 = BASE(); d2.taxes_and_charges = 'a - E'; const r2 = await post('Sales Invoice', d2); log('a - E template -> ' + (r2.ok ? 'ACCEPTED ' + r2.name + ' tax=' + r2.doc.total_taxes_and_charges + ' gt=' + r2.doc.grand_total : 'REFUSED ' + r2.msg.slice(0, 250)));
  // product bundle
  const d3 = BASE(); d3.items[0].item_code = 'BR-1'; const r3 = await post('Sales Invoice', d3); log('bundle BR-1 -> ' + (r3.ok ? 'ACCEPTED ' + r3.name + ' packed=' + (r3.doc.packed_items || []).length + ' gt=' + r3.doc.grand_total : 'REFUSED ' + r3.msg.slice(0, 250)));
  // item fixed asset
  const d4 = BASE(); d4.items[0].item_code = '2121'; const r4 = await post('Sales Invoice', d4); log('fixed asset item 2121 -> ' + (r4.ok ? 'ACCEPTED ' + r4.name : 'REFUSED ' + r4.msg.slice(0, 250)));
  // customer disabled / other company customer? skip. non-sales item
  // write off account missing with write off amount
  const d5 = BASE(); d5.write_off_amount = 50; d5.write_off_account = ''; const r5 = await post('Sales Invoice', d5); log('write off, no account -> ' + (r5.ok ? 'ACCEPTED' : 'REFUSED ' + r5.msg.slice(0, 200)));
  // loyalty: redeem with points
  const d6 = BASE(); d6.redeem_loyalty_points = 1; d6.loyalty_points = 5; d6.loyalty_program = 'Golden Program'; const r6 = await post('Sales Invoice', d6); log('loyalty redeem 5 pts -> ' + (r6.ok ? 'ACCEPTED' : 'REFUSED ' + r6.msg.slice(0, 200)));
  // posting time / set_posting_time 
  const d7 = BASE(); d7.set_posting_time = 1; d7.posting_date = '2026-11-10'; d7.due_date = '2026-11-10'; const r7 = await post('Sales Invoice', d7); log('set_posting_time=1 past date -> ' + (r7.ok ? 'ACCEPTED posting=' + r7.doc.posting_date : 'REFUSED ' + r7.msg.slice(0, 200)));
  // customer PO min
  const d8 = BASE(); d8.po_no = 'P'; const r8 = await post('Sales Invoice', d8); log('po_no 1 char -> ' + (r8.ok ? 'ACCEPTED' : 'REFUSED ' + r8.msg.slice(0, 200)));
});
