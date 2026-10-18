import { api, type Doc } from './api';
import { ITEM_A, ITEM_B, ITEM_C, WAREHOUSE, code, customer, seed, today } from './ps-data';

/**
 * Delivery Note test data, created through the Frappe API. Only notes created here (customer "PW Packing Customer")
 * may ever be deleted by the tests; no pre-existing record is touched.
 */
export { ITEM_A, ITEM_B, ITEM_C, WAREHOUSE, code, customer, seed, today };
import { COMPANY } from './ps-data';

/** This company has no Cost of Goods Sold account; existing Delivery Notes use this expense account and cost center, which Submit needs on every row. */
const books = async () => ({ expense: '5317 - ديون معدومة - E', costCenter: '101 - Main X - E' });

/** A Draft Delivery Note for the test customer, ready to be submitted. */
export async function draftDN(lines: { item: string; qty: number }[] = [{ item: ITEM_A, qty: 10 }]): Promise<Doc> {
  await seed();
  const b = await books();
  return api.insert('Delivery Note', {
    customer: await customer(), company: COMPANY, posting_date: today(), set_warehouse: WAREHOUSE,
    items: lines.map((l) => ({ item_code: code(l.item), qty: l.qty, rate: 10, warehouse: WAREHOUSE, expense_account: b.expense, cost_center: b.costCenter })),
  });
}

export type Status = 'Draft' | 'Submitted' | 'Cancelled' | 'Closed';

/** A Delivery Note in the wanted state: Draft, Submitted (To Bill), Cancelled or Closed. */
export async function note(status: Status = 'Draft', lines?: { item: string; qty: number }[]): Promise<Doc> {
  const draft = await draftDN(lines);
  if (status === 'Draft') return draft;
  if (status === 'Closed') {
    await api.call('erpnext.stock.doctype.delivery_note.delivery_note.update_delivery_note_status', { docname: draft.name, status: 'Closed' });
    return api.get('Delivery Note', draft.name);
  }
  const submitted = await api.submit(draft);
  if (status === 'Submitted') return submitted;
  await api.call('frappe.client.cancel', { doctype: 'Delivery Note', name: draft.name });
  return api.get('Delivery Note', draft.name);
}

/** Actual stock of an item in the test warehouse. */
export async function stockOf(itemName: string): Promise<number> {
  const [bin] = await api.list('Bin', [['item_code', '=', code(itemName)], ['warehouse', '=', WAREHOUSE]], ['actual_qty']);
  return bin ? Number(bin.actual_qty) : 0;
}
