import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 300_000 });
const OUT = 'C:/Playwright_Automation/Shamel/addr-probe3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const stamp = () => `${Date.now()}`.slice(-6);

test('rules', async () => {
  fs.writeFileSync(OUT, '');
  const id = stamp();
  const custs = await api.list('Customer', [], ['name', 'customer_name', 'customer_primary_address'], 100);
  const links = await api.list('Dynamic Link', [['parenttype', '=', 'Address'], ['link_doctype', '=', 'Customer']], ['link_name'], 500);
  const used = new Set(links.map((l) => l.link_name));
  const free = custs.filter((c) => !used.has(c.name));
  log('CUSTOMERS ' + custs.length + ' without address: ' + JSON.stringify(free.slice(0, 5)));
  const cust = free[0]?.name || custs[0].name;
  const mk = (title: string, extra: Record<string, unknown> = {}) => ({ address_title: `PW AD ${title} ${id}`, address_type: 'Billing', address_line1: 'Street 1', city: 'Riyadh', country: 'Saudi Arabia', links: [{ link_doctype: 'Customer', link_name: cust }], ...extra });
  const tryIt = async (label: string, data: Record<string, unknown>) => {
    try { const d = await api.insert('Address', data); log(`${label} -> SAVED ${d.name}`); return d; }
    catch (e: any) { log(`${label} -> REFUSED ${clean(String(e.message)).slice(0, 300)}`); return null; }
  };
  // 1 first address of this customer: is_primary auto-set?
  const a1 = await tryIt('first address of customer ' + cust, mk('P1'));
  if (a1) { const g = await api.get('Address', a1.name); log(`  a1 is_primary=${g.is_primary} billing=${g.is_primary_address} shipping=${g.is_shipping_address}`); }
  // 2 second address with all three flags set
  const a2 = await tryIt('second address with primary+billing+shipping', mk('P2', { is_primary: 1, is_primary_address: 1, is_shipping_address: 1 }));
  if (a1 && a2) {
    const g1 = await api.get('Address', a1.name); const g2 = await api.get('Address', a2.name);
    log(`  after second: a1 primary=${g1.is_primary} billing=${g1.is_primary_address} shipping=${g1.is_shipping_address} | a2 primary=${g2.is_primary} billing=${g2.is_primary_address} shipping=${g2.is_shipping_address}`);
  }
  // 3 third with only primary set, check uniqueness of each flag separately
  const a3 = await tryIt('third address with primary only', mk('P3', { is_primary: 1 }));
  if (a1 && a2 && a3) {
    for (const n of [a1.name, a2.name, a3.name]) { const g = await api.get('Address', n); log(`  ${n}: primary=${g.is_primary} billing=${g.is_primary_address} shipping=${g.is_shipping_address}`); }
  }
  // 4 link to a doctype outside the SRS list
  const items = await api.list('Item', [], ['name'], 1);
  await tryIt('link doctype Item (real item)', mk('P4', { links: [{ link_doctype: 'Item', link_name: items[0].name }] }));
  // 5 company flag with a customer link
  await tryIt('company flag + customer link', mk('P5', { is_your_company_address: 1 }));
  // 6 address with the company flag on a company
  // 7 phone unique
  const ph = '+2010' + id + '1';
  await tryIt('phone first', mk('P6', { phone: ph }));
  await tryIt('phone same again', mk('P7', { phone: ph }));
  // 8 disabled address is not offered in transactions
  const dis = await tryIt('disabled address', mk('P8', { disabled: 1 }));
  if (dis) {
    const res = await api.call('frappe.desk.search.search_link', { doctype: 'Address', txt: '', query: 'erpnext.controllers.queries.address_query', filters: { link_doctype: 'Customer', link_name: cust } });
    const names = (res || []).map((r: any) => r.value);
    log(`  address_query for ${cust}: ${JSON.stringify(names)} contains disabled=${names.includes(dis.name)}`);
  }
  // 9 length of fields 2 char
  await tryIt('line2 1 char', mk('P9', { address_line2: 'z' }));
  // 10 postal code letters/special chars
  await tryIt('pincode special chars', mk('P10', { pincode: '@#-1 A' }));
});
