import { test, expect } from '@playwright/test';
import { api } from './helpers/api';
import { COMPANY, WAREHOUSE, today } from './helpers/ps-data';

/**
 * Inventory SRS note: once an Item is Serialized, Batched or Non-Serialized, the tracking type cannot be changed after any
 * stock transaction. Items are created new for each check (nothing existing is touched); nothing is deleted.
 */
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const short = (e: unknown) => String(e).replace(/\s+/g, ' ').match(/"_server_messages":"([^"]{0,300})|"exception":"([^"]{0,250})/)?.slice(1).find(Boolean) ?? String(e).replace(/\s+/g, ' ').slice(0, 250);
const failure = (p: Promise<unknown>) => p.then(() => '', (e) => short(e));
const stamp = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

async function newItem(extra: Record<string, unknown>) {
  const name = `PW Track ${stamp()}`;
  return api.insert('Item', { item_code: name, item_name: name, item_group: 'Services', stock_uom: 'Nos', is_stock_item: 1, valuation_rate: 10, item_defaults: [{ company: COMPANY, default_warehouse: WAREHOUSE }], ...extra });
}
const receipt = (row: Record<string, unknown>) => api.insertAndSubmit('Stock Entry', {
  stock_entry_type: 'Material Receipt', company: COMPANY, posting_date: today(), items: [{ t_warehouse: WAREHOUSE, basic_rate: 10, ...row }],
});
const setValue = (item: string, fieldname: string, value: number) => api.call('frappe.client.set_value', { doctype: 'Item', name: item, fieldname, value });

test('before any stock transaction the tracking type can still be changed (control)', async () => {
  const item = await newItem({});
  const err = await failure(setValue(item.name, 'has_batch_no', 1));
  observe(`no stock yet, has_batch_no 0 -> 1: ${err || 'accepted'}`);
  expect(err).toBe('');
  await setValue(item.name, 'has_batch_no', 0); // put it back
});

test('a non-serialized item with stock cannot become Serialized', async () => {
  const item = await newItem({});
  await receipt({ item_code: item.name, qty: 5 });
  const err = await failure(setValue(item.name, 'has_serial_no', 1));
  observe(`item with stock, has_serial_no 0 -> 1: ${err ? 'refused: ' + err : 'ACCEPTED'}`);
  if (!err) await setValue(item.name, 'has_serial_no', 0);
  expect(err, 'the change must be refused').not.toBe('');
});

test('a non-batched item with stock cannot become Batched', async () => {
  const item = await newItem({});
  await receipt({ item_code: item.name, qty: 5 });
  const err = await failure(setValue(item.name, 'has_batch_no', 1));
  observe(`item with stock, has_batch_no 0 -> 1: ${err ? 'refused: ' + err : 'ACCEPTED'}`);
  if (!err) await setValue(item.name, 'has_batch_no', 0);
  expect(err, 'the change must be refused').not.toBe('');
});

test('a serialized item with stock cannot become Non-Serialized', async () => {
  const item = await newItem({ has_serial_no: 1, serial_no_series: `PWS${stamp().slice(-6)}-.#####` });
  await receipt({ item_code: item.name, qty: 2, use_serial_batch_fields: 1 }).catch((e) => observe('receipt with auto serials failed: ' + short(e)));
  const err = await failure(setValue(item.name, 'has_serial_no', 0));
  observe(`serialized item, has_serial_no 1 -> 0: ${err ? 'refused: ' + err : 'ACCEPTED'}`);
  if (!err) await setValue(item.name, 'has_serial_no', 1);
  expect(err, 'the change must be refused').not.toBe('');
});

test('a batched item with stock cannot become Non-Batched', async () => {
  const item = await newItem({ has_batch_no: 1, create_new_batch: 1, batch_number_series: `PWB${stamp().slice(-6)}-.#####` });
  await receipt({ item_code: item.name, qty: 2, use_serial_batch_fields: 1 }).catch((e) => observe('receipt with auto batch failed: ' + short(e)));
  const err = await failure(setValue(item.name, 'has_batch_no', 0));
  observe(`batched item, has_batch_no 1 -> 0: ${err ? 'refused: ' + err : 'ACCEPTED'}`);
  if (!err) await setValue(item.name, 'has_batch_no', 1);
  expect(err, 'the change must be refused').not.toBe('');
});
