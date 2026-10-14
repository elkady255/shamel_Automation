import { api, type Doc } from './api';

/**
 * Test data for the Packing Slip module. Created through the Frappe API, reused across runs (ensure-style),
 * and never deleted, by request.
 */
export const COMPANY = 'Ahmed Ebrahim CO.';
export const WAREHOUSE = 'Stores - E';
export const CUSTOMER_NAME = 'PW Packing Customer';
export const ITEM_A = 'PW-PS-ITEM-A'; // weight_per_unit 2 Kg
export const ITEM_B = 'PW-PS-ITEM-B'; // weight_per_unit 0.5 Kg
export const ITEM_C = 'PW-PS-ITEM-C'; // no weight
export const today = () => new Date().toISOString().slice(0, 10);

let customerName: string | undefined;
export async function customer(): Promise<string> {
  customerName ??= (
    await api.ensure('Customer', [['customer_name', '=', CUSTOMER_NAME]], {
      customer_name: CUSTOMER_NAME, customer_type: 'Individual', customer_group: 'Individual', territory: 'KSA',
    })
  ).name as string;
  return customerName;
}

async function ensureItem(code: string, weight: number): Promise<void> {
  await api.ensure('Item', [['item_code', '=', code]], {
    item_code: code, item_name: code, item_group: 'Products', stock_uom: 'Nos', is_stock_item: 1,
    weight_per_unit: weight, weight_uom: weight ? 'Kg' : '',
    item_defaults: [{ company: COMPANY, default_warehouse: WAREHOUSE }],
  });
}

let ready: Promise<void> | undefined;
/** Items with weights and plenty of stock in Stores - E. */
export function seed(): Promise<void> {
  ready ??= (async () => {
    await customer();
    await ensureItem(ITEM_A, 2);
    await ensureItem(ITEM_B, 0.5);
    await ensureItem(ITEM_C, 0);
    for (const code of [ITEM_A, ITEM_B, ITEM_C]) {
      const [bin] = await api.list('Bin', [['item_code', '=', code], ['warehouse', '=', WAREHOUSE]], ['actual_qty']);
      if (!bin || bin.actual_qty < 500) {
        await api.insertAndSubmit('Stock Entry', {
          stock_entry_type: 'Material Receipt', company: COMPANY, posting_date: today(),
          items: [{ item_code: code, qty: 1000, t_warehouse: WAREHOUSE, basic_rate: 10 }],
        });
      }
    }
  })();
  return ready;
}

export type Line = { item: string; qty: number };

/** A Draft Delivery Note for the test customer. */
export async function draftDN(lines: Line[] = [{ item: ITEM_A, qty: 10 }]): Promise<Doc> {
  await seed();
  return api.insert('Delivery Note', {
    customer: await customer(), company: COMPANY, posting_date: today(), set_warehouse: WAREHOUSE,
    items: lines.map((l) => ({ item_code: l.item, qty: l.qty, rate: 10, warehouse: WAREHOUSE })),
  });
}

/** A Packing Slip created through the API for the given Delivery Note (all lines packed by default). */
export async function packingSlip(dn: Doc, opts: { gross?: number; status?: 'Draft' | 'Submitted' | 'Cancelled'; items?: Doc[] } = {}): Promise<Doc> {
  const rows = (opts.items ?? dn.items).map((r: Doc) => ({
    item_code: r.item_code, qty: r.qty, dn_detail: r.name, stock_uom: r.stock_uom, net_weight: 0,
  }));
  const doc = await api.insert('Packing Slip', {
    delivery_note: dn.name, naming_series: 'MAT-PAC-.YYYY.-', from_case_no: 1, items: rows,
    gross_weight_pkg: opts.gross ?? 100, gross_weight_uom: 'Kg',
  });
  if (opts.status === 'Draft' || !opts.status) return doc;
  const submitted = await api.submit(doc);
  if (opts.status === 'Submitted') return submitted;
  return api.call('frappe.client.cancel', { doctype: 'Packing Slip', name: doc.name }).then(() => api.get('Packing Slip', doc.name));
}
