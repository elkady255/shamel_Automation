import { test } from '@playwright/test';
import { post, get } from './helpers/qt-api';
import { recorder } from './helpers/si-ui';

test.describe.configure({ timeout: 400_000 });
const rec = recorder('j-server');
const today = new Date().toISOString().slice(0, 10);
let base: any;
async function baseDoc() {
  if (base) return structuredClone(base);
  const d: any = await get('Sales Invoice', 'ACC-SINV-2026-02830');
  const src = d?.data || d;
  base = { company: src.company, customer: src.customer, currency: src.currency, selling_price_list: src.selling_price_list, posting_date: today, due_date: today, invoice_type: src.invoice_type, update_stock: 0, items: [{ item_code: 'IND182210', qty: 1, rate: 100, warehouse: 'Stores - E' }] };
  return structuredClone(base);
}
const refused = (r: any) => !r.ok;
const tryDoc = async (id: string, text: string, mut: (d: any) => void, expectRefused: boolean, known = '') => {
  const d = await baseDoc(); mut(d); const r = await post('Sales Invoice', d);
  rec.check(id, text, expectRefused ? refused(r) : r.ok, `${r.ok ? 'accepted ' + r.name : 'refused'} | ${String(r.msg).slice(0, 260)}`, known);
  return r;
};

test('J01 server rules (create through the API; drafts only)', async () => {
  const b = await baseDoc(); rec.note('J-0', 'base doc', JSON.stringify({ ...b, items: b.items.length }));
  await tryDoc('J01', 'valid draft is accepted (control)', () => {}, false);
  await tryDoc('J02', 'qty 0 is refused', (d) => { d.items[0].qty = 0; }, true);
  await tryDoc('J03', 'negative rate is refused', (d) => { d.items[0].rate = -1; }, true);
  await tryDoc('J04', 'group warehouse is refused (SI-18)', (d) => { d.items[0].warehouse = 'All Warehouses - E'; }, true, 'SI-18');
  await tryDoc('J05', 'UOM the item does not have is refused (SI-18)', (d) => { d.items[0].uom = 'Kg'; d.items[0].conversion_factor = 1; }, true, 'SI-18');
  await tryDoc('J06', 'negative write off amount is refused (SI-09)', (d) => { d.write_off_amount = -100; }, true, 'SI-09');
  await tryDoc('J07', 'write off larger than the invoice is refused (SI-01)', (d) => { d.write_off_amount = 900; }, true, 'SI-01');
  await tryDoc('J08', 'negative additional discount % is refused (SI-19)', (d) => { d.additional_discount_percentage = -10; d.apply_discount_on = 'Net Total'; }, true, 'SI-19');
  await tryDoc('J09', 'due date before posting date is refused, not silently changed (SI-08)', (d) => { d.due_date = '2020-01-01'; }, true, 'SI-08');
  await tryDoc('J10', 'item description over 500 characters is refused (SI-23)', (d) => { d.items[0].description = 'x'.repeat(600); }, true, 'SI-23');
  await tryDoc('J11', 'customer PO over 100 characters is refused (SI-23)', (d) => { d.po_no = 'p'.repeat(150); }, true, 'SI-23');
  await tryDoc('J12', 'terms over 500 characters is refused', (d) => { d.terms = 't'.repeat(600); }, true, 'SI-23');
  await tryDoc('J13', 'quantity 1e15 gives a readable error, not a database error (SI-24)', (d) => { d.items[0].qty = 1e15; }, true);
  await tryDoc('J14', 'tax template "VAT - E" can be used (SI-06)', (d) => { d.taxes_and_charges = 'VAT - E'; }, false, 'SI-06');
  const r = await tryDoc('J15', 'quantity 0.0000001 is refused instead of saved as 0 (SI-25)', (d) => { d.items[0].qty = 0.0000001; }, true, 'SI-25');
  if (r.ok && r.name) { const g: any = await get('Sales Invoice', r.name); const doc = g?.data || g; rec.note('J15b', 'saved qty/amount', `${doc.items?.[0]?.qty} / ${doc.items?.[0]?.amount}`); }
  await tryDoc('J16', 'draft without Sales Order / Delivery Note is accepted when they are not required', () => {}, false);
  await tryDoc('J17', 'rate below valuation is refused when Validate Selling Price is on (SI-20)', (d) => { d.items[0].rate = 1; }, true, 'SI-20');
});
