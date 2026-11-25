import { test } from '@playwright/test';
import { method } from './helpers/qt-api';
test('set_value', async () => {
  const key = 'custom_allow_update_stock_in_sales_invoice';
  const r = await method('frappe.client.set_value', { doctype: 'Selling Settings', name: 'Selling Settings', fieldname: key, value: 1 });
  console.log('SET1', r.ok, r.status, r.msg);
  const g = await method('frappe.client.get_value', { doctype: 'Selling Settings', fieldname: key });
  console.log('GET', JSON.stringify(g.message));
  const r0 = await method('frappe.client.set_value', { doctype: 'Selling Settings', name: 'Selling Settings', fieldname: key, value: 0 });
  console.log('RESTORE', r0.ok, r0.status, r0.msg);
  const g0 = await method('frappe.client.get_value', { doctype: 'Selling Settings', fieldname: key });
  console.log('GET2', JSON.stringify(g0.message));
});
