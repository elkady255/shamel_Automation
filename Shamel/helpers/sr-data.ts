import { api, type Doc } from './api';
import { ITEM_A, WAREHOUSE, COMPANY, code, seed, today } from './ps-data';
import { binQty, plainItem } from './sle-data';

/**
 * Stock Reconciliation test data, created through the Frappe API for the test item. Only records created here
 * (the draft / submitted / cancelled ones) are ever deleted.
 */
export const ACCOUNT = '5317 - ديون معدومة - E';
export const COST_CENTER = '101 - Main X - E';

export async function draftSR(extra: Doc = {}, qtyDelta = 10, rate = 9): Promise<Doc> {
  await plainItem(); await seed();
  const current = await binQty(WAREHOUSE);
  return api.insert('Stock Reconciliation', {
    purpose: 'Stock Reconciliation', company: COMPANY, posting_date: today(), set_warehouse: WAREHOUSE,
    expense_account: ACCOUNT, cost_center: COST_CENTER,
    items: [{ item_code: code(ITEM_A), warehouse: WAREHOUSE, qty: current + qtyDelta, valuation_rate: rate }], ...extra,
  });
}

export type SRStatus = 'Draft' | 'Submitted' | 'Cancelled';
export async function sr(status: SRStatus = 'Draft', qtyDelta = 10): Promise<Doc> {
  const d = await draftSR({}, qtyDelta);
  if (status === 'Draft') return d;
  await api.submit(d);
  if (status === 'Submitted') return api.get('Stock Reconciliation', d.name);
  await api.call('frappe.client.cancel', { doctype: 'Stock Reconciliation', name: d.name });
  return api.get('Stock Reconciliation', d.name);
}

export async function removeSR(name: string): Promise<void> {
  const d = await api.get('Stock Reconciliation', name).catch(() => undefined);
  if (!d) return;
  if (d.docstatus === 1) await api.call('frappe.client.cancel', { doctype: 'Stock Reconciliation', name });
  await api.call('frappe.client.delete', { doctype: 'Stock Reconciliation', name });
}
