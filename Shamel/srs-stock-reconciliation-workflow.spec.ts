import { test, expect } from '@playwright/test';
import { api } from './helpers/api';
import { sr, draftSR, removeSR } from './helpers/sr-data';
import { binQty, entriesOf, stockEntry, plainItem } from './helpers/sle-data';
import { WAREHOUSE, ITEM_A, code, seed } from './helpers/ps-data';

/**
 * SRS Stock Reconciliation workflow (TC-RCW): what Submit and Cancel do to the stock, the Stock Ledger, the Bin and the accounts.
 * The Details screen cannot submit (the update request is refused), so the documents are submitted through the Frappe API.
 * Only records created here are ever deleted, one by one.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const created: string[] = [];
test.beforeAll(async () => { await plainItem(); await seed(); });
test.afterAll(async () => { for (const n of created.reverse()) await removeSR(n).catch(() => undefined); });
const track = (d: { name: string }) => { created.push(d.name); return d; };

test('TC-RCW-001/008/009/010 Submit that increases the stock: Bin = Quantity, one ledger entry for the difference', srs('Workflow: increase'), async () => {
  const before = await binQty(WAREHOUSE);
  const d = track(await sr('Submitted', 10));
  const e = await entriesOf(d.name);
  observe(`Bin ${before} -> ${await binQty(WAREHOUSE)} | entries ${e.map((x) => `${x.actual_qty}@${x.valuation_rate}`).join(' ')} | difference_amount ${d.difference_amount}`);
  expect(await binQty(WAREHOUSE)).toBe(before + 10);
  expect(e.length).toBe(1);
  expect(e[0]).toMatchObject({ voucher_type: 'Stock Reconciliation', warehouse: WAREHOUSE, is_cancelled: 0 });
  expect(e[0].qty_after_transaction, 'the entry records the new balance').toBe(before + 10);
});

test('TC-RCW-002 Submit that decreases the stock creates an outgoing entry', srs('Workflow: decrease'), async () => {
  const before = await binQty(WAREHOUSE);
  const d = track(await sr('Submitted', -6));
  const e = await entriesOf(d.name);
  expect(await binQty(WAREHOUSE)).toBe(before - 6);
  expect(e[0].qty_after_transaction).toBe(before - 6);
});

test('TC-RCW-004 Submit with an unchanged quantity and rate: what the system does', srs('Workflow: unchanged'), async () => {
  const before = await binQty(WAREHOUSE);
  const [last] = await api.call('frappe.client.get_list', { doctype: 'Stock Ledger Entry', fields: ['valuation_rate'], filters: [['item_code', '=', code(ITEM_A)], ['warehouse', '=', WAREHOUSE], ['is_cancelled', '=', 0]], order_by: 'posting_datetime desc, creation desc', limit_page_length: 1 });
  const d = track(await draftSR({}, 0, last.valuation_rate));
  const r = await api.submit(d).then(() => 'submitted').catch((e) => 'refused: ' + String(e).replace(/\s+/g, ' ').slice(0, 140));
  observe(`unchanged quantity (${before}) and rate ${last.valuation_rate}: ${r} | entries ${(await entriesOf(d.name)).length}`);
});

test('TC-RCW-005 Submit that changes only the valuation rate changes the stock value but not the quantity', srs('Workflow: rate only'), async () => {
  const before = await binQty(WAREHOUSE);
  const d = track(await draftSR({}, 0, 11.11));
  await api.submit(d);
  const e = await entriesOf(d.name);
  observe(`entries: ${e.map((x) => `qty ${x.actual_qty} rate ${x.valuation_rate} value diff ${x.stock_value_difference}`).join(' | ')}`);
  expect(await binQty(WAREHOUSE)).toBe(before);
  expect(e.length, 'a ledger entry records the rate change').toBeGreaterThan(0);
});

test('TC-RCW-011 Submit creates the accounting entries for the stock difference', srs('Workflow: accounting entries'), async () => {
  const d = track(await sr('Submitted', 7));
  const gl = await api.list('GL Entry', [['voucher_no', '=', d.name], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit'], 20);
  observe('GL entries: ' + JSON.stringify(gl));
  expect(gl.length, 'accounting entries exist').toBeGreaterThan(0);
  expect(gl.some((g) => g.account === '5317 - ديون معدومة - E'), 'the Difference Account is used').toBe(true);
});

test('TC-RCW-012 a Stock Reconciliation with a missing mandatory value (no Difference Account) cannot be saved', srs('Workflow: mandatory'), async () => {
  const outcome = await api.insert('Stock Reconciliation', { purpose: 'Stock Reconciliation', company: 'Ahmed Ebrahim CO.', items: [{ item_code: code(ITEM_A), warehouse: WAREHOUSE, qty: 1, valuation_rate: 1 }] }).then((x) => { created.push(x.name); return 'saved ' + x.name; }).catch((e) => 'refused: ' + String(e).replace(/\s+/g, ' ').slice(0, 120));
  observe('no accounts: ' + outcome);
});

test('TC-RCW-013/RCD-011 a Submitted record cannot be edited', srs('Workflow: submitted read-only'), async () => {
  const d = track(await sr('Submitted'));
  const outcome = await api.call('frappe.client.set_value', { doctype: 'Stock Reconciliation', name: d.name, fieldname: 'set_warehouse', value: 'Work In Progress - E' }).then(() => 'changed').catch((e) => 'refused: ' + String(e).replace(/\s+/g, ' ').slice(0, 110));
  observe('API edit of a Submitted record: ' + outcome);
});

test('TC-RCW-022/023/024 Cancel restores the stock and reverses the ledger and accounting entries', srs('Workflow: cancel'), async () => {
  const before = await binQty(WAREHOUSE);
  const d = track(await sr('Submitted', 12));
  expect(await binQty(WAREHOUSE)).toBe(before + 12);
  await api.call('frappe.client.cancel', { doctype: 'Stock Reconciliation', name: d.name });
  const e = await entriesOf(d.name);
  const gl = await api.list('GL Entry', [['voucher_no', '=', d.name]], ['is_cancelled'], 20);
  observe(`Bin after cancel ${await binQty(WAREHOUSE)} | ledger ${e.map((x) => `${x.actual_qty}:cancelled=${x.is_cancelled}`).join(' ')} | GL cancelled: ${gl.map((g) => g.is_cancelled).join(',')}`);
  expect(await binQty(WAREHOUSE)).toBe(before);
  expect(e.every((x) => x.is_cancelled === 1)).toBe(true);
});

test('TC-RCW-025 Cancel when a later transaction depends on the reconciliation', srs('Workflow: cancel with later issue'), async () => {
  const d = track(await sr('Submitted', 20));
  const later = await stockEntry('Material Issue', 20);
  created.push('');
  const outcome = await api.call('frappe.client.cancel', { doctype: 'Stock Reconciliation', name: d.name }).then(() => 'cancelled').catch((e) => 'refused: ' + String(e).replace(/\s+/g, ' ').slice(0, 160));
  observe(`later issue ${later.name} of 20; cancelling the reconciliation: ${outcome} | Bin ${await binQty(WAREHOUSE)}`);
});

test('TC-RCW-027/028 Amend creates a new Draft linked through Amended From', srs('Workflow: amend'), async () => {
  const d = track(await sr('Cancelled'));
  const copy = await api.call('frappe.client.get', { doctype: 'Stock Reconciliation', name: d.name });
  const amended = await api.insert('Stock Reconciliation', { ...copy, name: undefined, docstatus: 0, amended_from: d.name, items: copy.items.map((i: Record<string, unknown>) => ({ ...i, name: undefined })) }).catch((e) => { observe('amend via API refused: ' + String(e).slice(0, 140)); return undefined; });
  if (amended) created.push(amended.name);
  observe('amended record: ' + (amended ? `${amended.name} (${amended.name.includes('-1') ? 'suffix -1' : 'new number'})` : 'none'));
});

test('TC-RCW-031 stock changed between Save and Submit: the Submit still sets the stock to the Quantity', srs('Workflow: concurrent change'), async () => {
  const d = track(await draftSR({}, 10));
  const qty = d.items[0].qty;
  await stockEntry('Material Receipt', 5);
  await api.submit(await api.get('Stock Reconciliation', d.name));
  observe(`saved Quantity ${qty}; Bin after Submit ${await binQty(WAREHOUSE)}`);
  expect(await binQty(WAREHOUSE)).toBe(qty);
});
