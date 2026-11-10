import { api, type Doc } from './api';
import { COMPANY, WAREHOUSE, ITEM_A, ITEM_B, code, customer, seed, today } from './ps-data';

/**
 * Sales Invoice test data, created through the Frappe API. This server requires a Sales Order and a Delivery Note
 * for every Sales Invoice (Selling Settings), so every invoice here is built with Sales Order -> Delivery Note -> Sales Invoice.
 * Nothing is ever deleted; invoices are only created, submitted and cancelled.
 */
export { COMPANY, WAREHOUSE, ITEM_A, ITEM_B, code, customer, seed, today };

const BOOKS = { expense_account: '5317 - ديون معدومة - E', cost_center: '101 - Main X - E' };
const SO = 'erpnext.selling.doctype.sales_order.sales_order';
const DN = 'erpnext.stock.doctype.delivery_note.delivery_note';
const SI = 'erpnext.accounts.doctype.sales_invoice.sales_invoice';

export type Line = { item: string; qty: number; rate?: number };

let employee: string | undefined;
/** Sales Order has four mandatory custom fields in this environment (name in contract, contract end date, employee, brief). */
async function contractFields(): Promise<Doc> {
  employee ??= (await api.list('Employee', [['status', '=', 'Active']], ['name'], 1))[0].name as string;
  const end = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);
  return { custom_name_in_contract: 'PW Contract', custom_contract_end_date: end, custom_employee: employee, custom_brief: 'PW test order' };
}

/** A submitted Sales Order for the test customer. */
export async function salesOrder(lines: Line[] = [{ item: ITEM_A, qty: 5, rate: 100 }]): Promise<Doc> {
  await seed();
  return api.insertAndSubmit('Sales Order', {
    ...(await contractFields()),
    customer: await customer(), company: COMPANY, transaction_date: today(), delivery_date: today(), set_warehouse: WAREHOUSE,
    items: lines.map((l) => ({ item_code: code(l.item), qty: l.qty, rate: l.rate ?? 100, warehouse: WAREHOUSE, delivery_date: today() })),
  });
}

/** A submitted Delivery Note made from the Sales Order (stock leaves the warehouse here). */
export async function deliveryNote(so: Doc): Promise<Doc> {
  const doc = await api.call(`${SO}.make_delivery_note`, { source_name: so.name });
  doc.items.forEach((r: Doc) => Object.assign(r, BOOKS));
  return api.insertAndSubmit('Delivery Note', doc);
}

/** A Draft Sales Invoice made from the Delivery Note. */
export async function draftInvoice(dn: Doc, qty?: number): Promise<Doc> {
  const doc = await api.call(`${DN}.make_sales_invoice`, { source_name: dn.name });
  doc.due_date = today();
  doc.update_stock = 0; // stock already left with the Delivery Note
  doc.items.forEach((r: Doc) => { r.cost_center = BOOKS.cost_center; if (qty) r.qty = qty; });
  return api.insert('Sales Invoice', doc);
}

export type Status = 'Draft' | 'Submitted' | 'Cancelled';

/** A Sales Invoice in the wanted state, built through the full Sales Order -> Delivery Note -> Sales Invoice chain. */
export async function invoice(status: Status = 'Submitted', lines?: Line[]): Promise<Doc> {
  const dn = await deliveryNote(await salesOrder(lines));
  const draft = await draftInvoice(dn);
  if (status === 'Draft') return draft;
  const submitted = await api.submit(draft);
  if (status === 'Submitted') return submitted;
  await cancel('Sales Invoice', draft.name);
  return api.get('Sales Invoice', draft.name);
}

export const reload = (name: string) => api.get('Sales Invoice', name);
export const cancel = (doctype: string, name: string) => api.call('frappe.client.cancel', { doctype, name });

/** A submitted Payment Entry (Receive) for the invoice; the full outstanding unless an amount is given. */
export async function pay(si: Doc, amount?: number): Promise<Doc> {
  const pe = await api.call('erpnext.accounts.doctype.payment_entry.payment_entry.get_payment_entry', { dt: 'Sales Invoice', dn: si.name });
  const paid = amount ?? pe.paid_amount;
  pe.mode_of_payment = (await api.list('Mode of Payment', [['enabled', '=', 1]], ['name'], 1))[0].name; // mandatory in this environment
  pe.reference_no = 'PW-REF'; pe.reference_date = today();
  pe.paid_amount = paid; pe.received_amount = paid;
  pe.references.forEach((r: Doc) => { r.allocated_amount = paid; });
  return api.insertAndSubmit('Payment Entry', pe);
}

/** A Draft return (credit note) for the invoice, optionally for fewer units than the original. */
export async function draftReturn(si: Doc, qty?: number): Promise<Doc> {
  const doc = await api.call(`${SI}.make_sales_return`, { source_name: si.name });
  if (qty) doc.items.forEach((r: Doc) => { r.qty = -qty; r.stock_qty = -qty; });
  return api.insert('Sales Invoice', doc);
}

/** Actual stock of an item in the test warehouse. */
export async function stockOf(item: string): Promise<number> {
  await seed();
  const [bin] = await api.list('Bin', [['item_code', '=', code(item)], ['warehouse', '=', WAREHOUSE]], ['actual_qty']);
  return bin ? Number(bin.actual_qty) : 0;
}

/** General Ledger entries of a voucher (cancelled entries included). */
export const glOf = (voucher: string) =>
  api.list('GL Entry', [['voucher_no', '=', voucher]], ['account', 'debit', 'credit', 'is_cancelled'], 50);

/** Submitted Sales Invoice returns against an invoice. */
export const returnsOf = (si: string) =>
  api.list('Sales Invoice', [['return_against', '=', si], ['docstatus', '=', 1]], ['name', 'grand_total']);

/** A new customer for tests that must not share advances or loyalty points with other tests. */
export async function newCustomer(extra: Doc = {}): Promise<string> {
  const doc = await api.insert('Customer', {
    customer_name: `PW SI Customer ${Date.now()}${Math.floor(Math.random() * 1000)}`, customer_type: 'Individual', customer_group: 'Individual',
    // without these the invoice takes the default price list, which is in AFN with no exchange rate, and every amount becomes 0
    territory: 'KSA', custom_company: COMPANY, default_price_list: 'Standard Selling', default_currency: 'SAR', ...extra,
  });
  return doc.name as string;
}

/** A submitted advance Payment Entry (Receive, no invoice) for the customer. */
export async function advance(customerName: string, amount: number): Promise<Doc> {
  const co = await api.get('Company', COMPANY);
  return api.insertAndSubmit('Payment Entry', {
    payment_type: 'Receive', party_type: 'Customer', party: customerName, company: COMPANY, posting_date: today(),
    mode_of_payment: (await api.list('Mode of Payment', [['enabled', '=', 1]], ['name'], 1))[0].name,
    paid_from: co.default_receivable_account, paid_to: co.default_bank_account, paid_amount: amount, received_amount: amount,
    reference_no: 'PW-ADV', reference_date: today(),
  });
}

/** Like invoice() but for another customer: Sales Order -> Delivery Note -> Draft Sales Invoice (the mapper keeps the customer of the order). */
export async function draftFor(customerName: string, qty = 5, rate = 100): Promise<Doc> {
  await seed();
  const so = await api.insertAndSubmit('Sales Order', {
    ...(await contractFields()),
    customer: customerName, company: COMPANY, transaction_date: today(), delivery_date: today(), set_warehouse: WAREHOUSE,
    items: [{ item_code: code(ITEM_A), qty, rate, warehouse: WAREHOUSE, delivery_date: today() }],
  });
  return draftInvoice(await deliveryNote(so));
}
