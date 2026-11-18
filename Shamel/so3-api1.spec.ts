import { test } from '@playwright/test';
import * as fs from 'fs';
import { post, method, get, put } from './helpers/qt-api';
const OUT = 'C:/Playwright_Automation/Shamel/so3-api1.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const today = new Date().toISOString().slice(0, 10);
const plus = (d: number) => new Date(Date.now() + d * 86400000).toISOString().slice(0, 10);
const base = () => ({ customer: 'CU-2026-00001', company: 'Ahmed Ebrahim CO.', transaction_date: today, delivery_date: plus(7), order_type: 'Sales',
  custom_employee: 'HR-EMP-01418', custom_name_in_contract: 'PW SO', custom_brief: 'pw', custom_contract_end_date: plus(30), custom_contract_start_date: today, custom_account_type: 'New Account',
  items: [{ item_code: 'IND182210', qty: 1, rate: 10200, warehouse: 'Stores - E', delivery_date: plus(7) }] });
test('so api1', async () => {
  fs.writeFileSync(OUT, '');
  const a = await post('Sales Order', base()); log('A draft ' + a.ok + ' ' + a.name + ' ' + a.msg); 
  if (a.ok) { const d = a.doc; log('A fields ' + JSON.stringify({ status: d.status, skip: d.skip_delivery_note, ds: d.delivery_status, bs: d.billing_status, av: d.custom_availability_status, pl: d.selling_price_list, cur: d.currency, tot: d.grand_total, adv: d.advance_payment_status, cc: d.cost_center, taxid: d.tax_id })); log('A keys custom ' + JSON.stringify(Object.keys(d).filter(k => k.startsWith('custom')))); log('A item ' + JSON.stringify(d.items[0])); }
  const b = await post('Sales Order', { ...base(), skip_delivery_note: 1 }); log('B skip ' + b.ok + ' ' + b.name + ' ' + b.msg);
  const c = await post('Sales Order', { ...base(), skip_delivery_note: 0 }); log('C noskip ' + c.ok + ' ' + c.name + ' ' + c.msg);
  const e = await post('Sales Order', { ...base(), skip_delivery_note: 0 }); log('E noskip ' + e.ok + ' ' + e.name + ' ' + e.msg);
});
