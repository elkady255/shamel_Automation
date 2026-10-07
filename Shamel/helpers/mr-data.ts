import { api, type Doc } from './api';

/** Shared, reusable test data for the Material Request suite. Created once, never deleted (by request). */
export const COMPANY = 'Ahmed Ebrahim CO.';
export const WAREHOUSE = 'Stores - E';
export const WAREHOUSE_2 = 'Finished Goods - E';
export const GROUP_WAREHOUSE = 'All Warehouses - E';
export const ITEM_NAME = 'PW MR Stock Item';
export const SUPPLIER = 'PW Test Supplier';
export const CUSTOMER = 'PW Test Customer';
/** Any active employee; required by a custom field on Sales Order. */
const SO_EMPLOYEE = 'HR-EMP-03389';

export const today = () => new Date().toISOString().slice(0, 10);
export const addDays = (days: number, from = new Date()) => {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

let cached: { item: string; supplier: string; customer: string } | undefined;

export async function testData() {
  if (cached) return cached;
  const item = await api.ensure('Item', [['item_name', '=', ITEM_NAME]], {
    item_name: ITEM_NAME,
    item_group: 'Services',
    stock_uom: 'Unit',
    is_stock_item: 1,
    valuation_rate: 10,
    item_defaults: [{ company: COMPANY, default_warehouse: WAREHOUSE }],
  });
  const supplier = await api.ensure('Supplier', [['supplier_name', '=', SUPPLIER]], {
    supplier_name: SUPPLIER,
    supplier_group: 'Local',
  });
  const customer = await api.ensure('Customer', [['customer_name', '=', CUSTOMER]], {
    customer_name: CUSTOMER,
    customer_group: 'Individual',
    territory: 'KSA',
    custom_company: COMPANY, // mandatory custom field in this environment
  });
  cached = { item: item.name, supplier: supplier.name, customer: customer.name };
  return cached;
}

type MrPurpose = 'Purchase' | 'Material Transfer' | 'Material Issue';

/** A submitted Material Request (status Pending) for qty units of the test item. */
export async function submittedMR(purpose: MrPurpose = 'Purchase', qty = 10): Promise<Doc> {
  const { item } = await testData();
  const row: Doc = { item_code: item, qty, schedule_date: addDays(7), uom: 'Unit', conversion_factor: 1 };
  if (purpose === 'Purchase') row.warehouse = WAREHOUSE;
  if (purpose === 'Material Transfer') Object.assign(row, { from_warehouse: WAREHOUSE, warehouse: WAREHOUSE_2 });
  if (purpose === 'Material Issue') row.warehouse = WAREHOUSE;
  return api.insertAndSubmit('Material Request', {
    naming_series: 'MAT-MR-.YYYY.-',
    material_request_type: purpose,
    company: COMPANY,
    transaction_date: today(),
    schedule_date: addDays(7),
    items: [row],
  });
}

/** Purchase Order made from the MR through ERPNext's own mapper, with qty overridden, then submitted. */
export async function orderFromMR(mrName: string, qty: number): Promise<Doc> {
  const { supplier } = await testData();
  const po = await api.call('erpnext.stock.doctype.material_request.material_request.make_purchase_order', { source_name: mrName });
  po.supplier = supplier;
  po.items = po.items.map((r: Doc) => ({ ...r, qty, rate: 10 }));
  return api.insertAndSubmit('Purchase Order', po);
}

export async function receiveFromPO(poName: string): Promise<Doc> {
  const pr = await api.call('erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_receipt', { source_name: poName });
  return api.insertAndSubmit('Purchase Receipt', pr);
}

/** Stock Entry made from an Issue/Transfer MR through ERPNext's mapper, then submitted. */
export async function stockEntryFromMR(mrName: string): Promise<Doc> {
  const se = await api.call('erpnext.stock.doctype.material_request.material_request.make_stock_entry', { source_name: mrName });
  return api.insertAndSubmit('Stock Entry', se);
}

/** Put stock into a warehouse so issues/transfers have something to move. */
export async function receiveStock(qty: number, warehouse = WAREHOUSE): Promise<Doc> {
  const { item } = await testData();
  return api.insertAndSubmit('Stock Entry', {
    stock_entry_type: 'Material Receipt',
    company: COMPANY,
    items: [{ item_code: item, qty, t_warehouse: warehouse, basic_rate: 10, uom: 'Unit', conversion_factor: 1 }],
  });
}

/** A submitted Sales Order for the test customer; optionally put on Hold or Closed afterwards. */
export async function salesOrder(state: 'open' | 'hold' | 'closed', qty = 3): Promise<Doc> {
  const { item, customer } = await testData();
  const so = await api.insertAndSubmit('Sales Order', {
    customer,
    company: COMPANY,
    transaction_date: today(),
    delivery_date: addDays(10),
    items: [{ item_code: item, qty, rate: 25, delivery_date: addDays(10), warehouse: WAREHOUSE, uom: 'Unit', conversion_factor: 1 }],
    // Mandatory custom fields in this environment
    custom_name_in_contract: 'PW Test Contract',
    custom_contract_end_date: addDays(30),
    custom_employee: SO_EMPLOYEE,
    custom_brief: 'Playwright test sales order for Material Request "Get Items From"',
  });
  if (state === 'hold') await api.call('erpnext.selling.doctype.sales_order.sales_order.update_status', { status: 'On Hold', name: so.name });
  if (state === 'closed') await api.call('erpnext.selling.doctype.sales_order.sales_order.update_status', { status: 'Closed', name: so.name });
  return api.get('Sales Order', so.name);
}

export async function setMRStatus(mrName: string, status: 'Stopped' | 'Submitted') {
  return api.call('erpnext.stock.doctype.material_request.material_request.update_status', { name: mrName, status });
}

export async function cancel(doctype: string, name: string) {
  return api.call('frappe.client.cancel', { doctype, name });
}

export async function mr(name: string): Promise<Doc> {
  return api.get('Material Request', name);
}
