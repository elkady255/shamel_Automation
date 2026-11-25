// Payment Reconciliation test data (own QA-PR parties only; nothing is ever deleted).
import { api, type Doc } from './api';

export const CO = 'Ahmed Ebrahim CO.';
export const REC = '1210 - العملاء - E';
/** Company default payable account (balance must be Credit, so advances cannot post to it). */
export const PAY_DEFAULT = '2300 - مصروفات مستحقة - E';
/** Own payable account without a balance rule, created for the supplier scenarios. */
export const PAY = 'QA-PR Payable - E';

export async function ensurePayable() {
  const parent = (await api.get('Account', PAY_DEFAULT)).parent_account;
  return (await api.ensure('Account', [['name', '=', PAY]], { account_name: 'QA-PR Payable', company: CO, parent_account: parent, account_type: 'Payable', account_currency: 'SAR' })).name as string;
}
export const ITEM = 'IND182210';
export const CC = '101 - Main X - E';
export const today = () => new Date().toISOString().slice(0, 10);
export const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

/** A new party per run keeps the entry tables small and predictable. */
export async function newCustomer(tag: string, extra: Doc = {}) {
  const customer_name = `QA-PR Cust ${tag}`;
  return (await api.ensure('Customer', [['customer_name', '=', customer_name]], { customer_name, customer_type: 'Company', custom_company: CO, ...extra })).name as string;
}
export async function newSupplier(tag: string, extra: Doc = {}) {
  const supplier_name = `QA-PR Supp ${tag}`;
  const group = (await api.list('Supplier Group', [['is_group', '=', 0]], ['name'], 1))[0]?.name;
  return (await api.ensure('Supplier', [['supplier_name', '=', supplier_name]], { supplier_name, supplier_group: group, ...extra })).name as string;
}

export async function salesInvoice(customer: string, rate: number, days = 1, extra: Doc = {}): Promise<Doc> {
  return api.insertAndSubmit('Sales Invoice', {
    company: CO, customer, set_posting_time: 1, posting_date: daysAgo(days), due_date: daysAgo(days - 10), update_stock: 0,
    debit_to: REC, items: [{ item_code: ITEM, qty: 1, rate, cost_center: CC }], taxes: [], ...extra,
  });
}
export async function salesReturn(si: Doc, amount: number, extra: Doc = {}): Promise<Doc> {
  return api.insertAndSubmit('Sales Invoice', {
    company: CO, customer: si.customer, is_return: 1, return_against: si.name, update_outstanding_for_self: 1, update_stock: 0,
    debit_to: si.debit_to, currency: si.currency, conversion_rate: si.conversion_rate, set_posting_time: 1, posting_date: daysAgo(1), due_date: daysAgo(1),
    items: [{ item_code: ITEM, qty: -1, rate: amount, cost_center: CC, sales_invoice_item: si.items[0].name }], taxes: [], ...extra,
  });
}
export async function purchaseInvoice(supplier: string, rate: number, days = 1, extra: Doc = {}): Promise<Doc> {
  return api.insertAndSubmit('Purchase Invoice', {
    company: CO, supplier, set_posting_time: 1, posting_date: daysAgo(days), due_date: daysAgo(days - 10), update_stock: 0,
    credit_to: PAY, buying_price_list: 'Standard Buying - SAR', items: [{ item_code: ITEM, qty: 1, rate, cost_center: CC }], taxes: [], ...extra,
  });
}
export async function purchaseReturn(pi: Doc, amount: number, extra: Doc = {}): Promise<Doc> {
  return api.insertAndSubmit('Purchase Invoice', {
    company: CO, supplier: pi.supplier, is_return: 1, return_against: pi.name, update_outstanding_for_self: 1, update_stock: 0,
    credit_to: pi.credit_to, buying_price_list: 'Standard Buying - SAR', set_posting_time: 1, posting_date: daysAgo(1), due_date: daysAgo(1),
    items: [{ item_code: ITEM, qty: -1, rate: amount, cost_center: CC, purchase_invoice_item: pi.items[0].name }], taxes: [], ...extra,
  });
}

let mop: string | undefined;
async function bankAccount() {
  return '122101 - ALRAJHY BANK - E';
}
/** An unallocated (advance) Payment Entry. */
export async function advance(partyType: 'Customer' | 'Supplier', party: string, amount: number, days = 1, extra: Doc = {}): Promise<Doc> {
  mop ??= 'BANK ALRAJHY';
  const receive = partyType === 'Customer';
  const bank = await bankAccount();
  return api.insertAndSubmit('Payment Entry', {
    company: CO, payment_type: receive ? 'Receive' : 'Pay', party_type: partyType, party, posting_date: daysAgo(days), mode_of_payment: mop,
    paid_from: receive ? REC : bank, paid_to: receive ? bank : PAY,
    paid_amount: amount, received_amount: amount, source_exchange_rate: 1, target_exchange_rate: 1,
    reference_no: 'QA-PR', reference_date: daysAgo(days), cost_center: CC, ...extra,
  });
}
/** A Journal Entry that leaves an unallocated amount on the party account. */
export async function journal(partyType: 'Customer' | 'Supplier', party: string, amount: number, days = 1): Promise<Doc> {
  const customer = partyType === 'Customer';
  const bank = await bankAccount();
  const partyRow: Doc = { account: customer ? REC : PAY, party_type: partyType, party, cost_center: CC, is_advance: 'Yes' };
  const bankRow: Doc = { account: bank, cost_center: CC };
  partyRow[customer ? 'credit_in_account_currency' : 'debit_in_account_currency'] = amount;
  bankRow[customer ? 'debit_in_account_currency' : 'credit_in_account_currency'] = amount;
  return api.insertAndSubmit('Journal Entry', {
    company: CO, voucher_type: 'Journal Entry', posting_date: daysAgo(days), cheque_no: 'QA-PR', cheque_date: daysAgo(days),
    user_remark: 'QA-PR payment reconciliation', accounts: [partyRow, bankRow],
  });
}
export const reload = (doctype: string, name: string) => api.get(doctype, name);

export const USD_REC = 'usd debtors - E';
/** Foreign currency (USD) invoice and advance at different rates, to produce an exchange difference. */
export async function usdInvoice(customer: string, usd: number, rate: number, days = 8) {
  return salesInvoice(customer, usd, days, { currency: 'USD', conversion_rate: rate, debit_to: USD_REC, selling_price_list: 'Standard Selling' });
}
export async function usdAdvance(customer: string, usd: number, rate: number, days = 6) {
  return advance('Customer', customer, usd, days, { paid_from: USD_REC, source_exchange_rate: rate, received_amount: usd * rate });
}
