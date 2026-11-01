import { api, type Doc } from './api';
import { ITEM_A, WAREHOUSE, COMPANY, code, seed, today } from './ps-data';

/**
 * Stock Ledger Entry test data. Entries are system generated, so they are produced by submitting stock documents
 * (Stock Entry, Delivery Note) for the test item through the Frappe API. Only documents created here are ever deleted.
 */
export const OTHER_WAREHOUSE = 'Work In Progress - E';
const books = { expense_account: '5317 - ديون معدومة - E', cost_center: '101 - Main X - E' };

/** The Quality Inspection tests flag the test item "Inspection Required"; stock documents need that switched off again. */
export async function plainItem(): Promise<void> {
  await seed();
  const item = await api.get('Item', code(ITEM_A));
  for (const f of ['inspection_required_before_delivery', 'inspection_required_before_purchase']) {
    if (item[f]) await api.call('frappe.client.set_value', { doctype: 'Item', name: item.name, fieldname: f, value: 0 });
  }
}

export async function stockEntry(type: 'Material Receipt' | 'Material Issue' | 'Material Transfer', qty: number, opts: { rate?: number; date?: string; to?: string; from?: string; submit?: boolean } = {}): Promise<Doc> {
  await seed();
  const row: Doc = { item_code: code(ITEM_A), qty, basic_rate: opts.rate ?? 7, ...books };
  if (type !== 'Material Issue') row.t_warehouse = opts.to ?? WAREHOUSE;
  if (type !== 'Material Receipt') row.s_warehouse = opts.from ?? WAREHOUSE;
  const doc = await api.insert('Stock Entry', { stock_entry_type: type, company: COMPANY, posting_date: opts.date ?? today(), ...(opts.date ? { set_posting_time: 1 } : {}), items: [row] });
  return opts.submit === false ? doc : api.submit(doc);
}

/** All ledger entries of a voucher, oldest first. */
export async function entriesOf(voucherNo: string): Promise<Doc[]> {
  return api.list('Stock Ledger Entry', [['voucher_no', '=', voucherNo]],
    ['name', 'item_code', 'warehouse', 'posting_date', 'posting_time', 'posting_datetime', 'voucher_type', 'voucher_no', 'voucher_detail_no', 'actual_qty', 'qty_after_transaction', 'incoming_rate', 'outgoing_rate', 'valuation_rate', 'stock_value', 'stock_value_difference', 'stock_queue', 'company', 'stock_uom', 'fiscal_year', 'is_cancelled', 'has_batch_no', 'has_serial_no', 'to_rename', 'project', 'creation'], 50);
}

/** Every entry of the test item in a warehouse in posting order. */
export async function ledger(warehouse = WAREHOUSE): Promise<Doc[]> {
  await seed();
  return api.list('Stock Ledger Entry', [['item_code', '=', code(ITEM_A)], ['warehouse', '=', warehouse], ['is_cancelled', '=', 0]],
    ['name', 'actual_qty', 'qty_after_transaction', 'posting_datetime', 'creation', 'voucher_no', 'stock_value', 'stock_value_difference', 'valuation_rate'], 500)
    .then((r) => r.sort((a, b) => String(a.posting_datetime).localeCompare(String(b.posting_datetime)) || String(a.creation).localeCompare(String(b.creation))));
}

export async function binQty(warehouse = WAREHOUSE): Promise<number> {
  const [b] = await api.list('Bin', [['item_code', '=', code(ITEM_A)], ['warehouse', '=', warehouse]], ['actual_qty']);
  return b ? Number(b.actual_qty) : 0;
}
