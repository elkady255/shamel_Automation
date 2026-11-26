// Payment Entry test data (own QA-PE records only). Document names are kept in pe-results/data.json.
import * as fs from 'fs';
import { api, type Doc } from './api';
import * as d from './prec-data';

export const { CO, REC, PAY_DEFAULT, PAY, ITEM, CC, today, daysAgo } = d;
export const FILE = 'Shamel/pe-results/data.json';
export const data = (): Record<string, string> => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : {});
export function remember(key: string, value: string) { const j = data(); j[key] = value; fs.writeFileSync(FILE, JSON.stringify(j, null, 1)); }

// pe-reset.spec.ts sets a new run suffix so a retest starts with fresh parties and unpaid invoices
export const RUN = data().run ?? '';
const named = (base: string) => (RUN ? `${base} ${RUN}` : base);
export const CUST = named('QA-PE Cust');
export const SUPP = named('QA-PE Supp');
export const CUST_USD = named('QA-PE Cust USD');

export async function seedStep(key: string, fn: () => Promise<Doc | string>) {
  if (data()[key]) return data()[key];
  try { const r = await fn(); const name = typeof r === 'string' ? r : (r.name as string); remember(key, name); console.log('OK', key, name); return name; }
  catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const m = String(e.message); console.log('ERR', key, m.slice(0, 450)); return ''; }
}

export const customer = async () => (await api.ensure('Customer', [['customer_name', '=', CUST]], { customer_name: CUST, customer_type: 'Company', custom_company: CO })).name as string;
export const supplier = async () => {
  const supplier_group = (await api.list('Supplier Group', [['is_group', '=', 0]], ['name'], 1))[0]?.name;
  // own payable account (the company default one only accepts a credit balance)
  return (await api.ensure('Supplier', [['supplier_name', '=', SUPP]], { supplier_name: SUPP, supplier_group, accounts: [{ company: CO, account: PAY }] })).name as string;
};
/** Contact e-mails must be unique on the system, so they carry the run suffix. */
export const mail = (first: string) => `${first.toLowerCase().replace(/\W+/g, '.')}${RUN}@example.com`;
export const contact = (first: string, doctype: string, name: string) => api.ensure('Contact', [['first_name', '=', first], ['last_name', '=', RUN]], {
  first_name: first, last_name: RUN, is_primary_contact: 1, email_ids: [{ email_id: mail(first), is_primary: 1 }], links: [{ link_doctype: doctype, link_name: name }],
});
export const salesInvoice = (rate: number, days: number, extra: Doc = {}) => d.salesInvoice(CUST, rate, days, { allocate_advances_automatically: 0, ...extra });
export const purchaseInvoice = (rate: number, days: number, extra: Doc = {}) => d.purchaseInvoice(SUPP, rate, days, { allocate_advances_automatically: 0, bill_no: `QA-BILL-${rate}`, ...extra });
export const usdCustomer = () => api.ensure('Customer', [['customer_name', '=', CUST_USD]], { customer_name: CUST_USD, customer_type: 'Company', custom_company: CO, default_currency: 'USD', accounts: [{ company: CO, account: 'usd debtors - E' }] });
