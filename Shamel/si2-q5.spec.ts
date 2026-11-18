import { test } from '@playwright/test';
import * as fs from 'fs';
import { api } from './helpers/api';
import { get, post } from './helpers/qt-api';
const OUT = 'C:/Playwright_Automation/Shamel/si2-q5.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('q5', async () => {
  fs.writeFileSync(OUT, '');
  const c = await api.list('Customer', [['loyalty_program', '!=', '']], ['name', 'customer_name', 'loyalty_program'], 5); log('LOYALTY CUSTOMERS ' + JSON.stringify(c));
  const pb = await api.list('Product Bundle', [['disabled', '=', 0]], ['name', 'new_item_code'], 5); log('BUNDLES ' + JSON.stringify(pb));
  const sl = await api.list('Sales Invoice', [['customer', 'in', c.map((x: any) => x.name)], ['docstatus', '=', 1]], ['name', 'customer', 'status', 'loyalty_points', 'redeem_loyalty_points'], 5); log('SI of loyalty customers ' + JSON.stringify(sl));
  const lm = await api.list('Sales Invoice', [['status', '=', 'Partly Paid'], ['docstatus', '=', 1]], ['name'], 3); log('PARTLY ' + JSON.stringify(lm));
  const rec = await api.list('Sales Invoice', [['status', 'in', ['On Hold', 'Closed']]], ['name', 'status'], 3); log('HOLD/CLOSED ' + JSON.stringify(rec));
});
