import { test } from '@playwright/test';
import { ctx } from './helpers/qt-api';
import { api } from './helpers/api';
import * as fs from 'fs';
test('SO insert error', async () => {
  const c = await ctx();
  const emp = (await api.list('Employee', [['status', '=', 'Active']], ['name'], 1))[0].name;
  const end = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10); const today = new Date().toISOString().slice(0, 10);
  const doc = { custom_name_in_contract: 'x', custom_contract_end_date: end, custom_employee: emp, custom_brief: 'b', customer: 'CU-2026-00001', company: 'Ahmed Ebrahim CO.', transaction_date: today, delivery_date: today, items: [{ item_code: 'IND182210', qty: 1, rate: 10500, warehouse: 'Stores - E', delivery_date: today }] };
  const r = await c.post('/api/resource/Sales Order', { data: doc });
  fs.writeFileSync('Shamel/si8-so-probe.raw.txt', r.status() + '\n' + (await r.text()));
});
