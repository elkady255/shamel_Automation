import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 300_000 });
const OUT = 'C:/Playwright_Automation/Shamel/ct-probe4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
let seq = 100;
const stamp = () => `${Date.now()}`.slice(-6);

test('rules', async () => {
  fs.writeFileSync(OUT, '');
  const id = stamp();
  const links = await api.list('Dynamic Link', [['parenttype', '=', 'Contact'], ['link_doctype', '=', 'Customer']], ['link_name'], 5000);
  const used = new Set(links.map((l) => l.link_name));
  const custs = await api.list('Customer', [], ['name'], 200);
  const free = custs.filter((c) => !used.has(c.name)).map((c) => c.name);
  log('free customers ' + free.length + ' ' + free.slice(0, 3));
  const cust = free[0];
  const em = (n: string) => `pwct${id}${n}@example.com`;
  const mk = (n: string, extra: Record<string, unknown> = {}) => ({ first_name: `PW CT ${n} ${id}`, email_ids: [{ email_id: em(n), is_primary: 1 }], phone_nos: [{ phone: `+2011${id}${++seq}`, is_primary_phone: 1 }], ...extra });
  const tryIt = async (label: string, data: Record<string, unknown>) => {
    try { const d = await api.insert('Contact', data); log(`${label} -> SAVED ${d.name}`); return d; }
    catch (e: any) { log(`${label} -> REFUSED ${clean(String(e.message)).slice(0, 260)}`); return null; }
  };
  await tryIt('baseline', mk('A'));
  await tryIt('first name 1 char', mk('B', { first_name: 'q' }));
  await tryIt('first name 101', mk('C', { first_name: 'F'.repeat(101) }));
  await tryIt('last name 1 char', mk('D', { last_name: 'z' }));
  await tryIt('last name 101', mk('E', { last_name: 'L'.repeat(101) }));
  await tryIt('department 1 char', mk('F', { department: 'd' }));
  await tryIt('no first name', mk('G', { first_name: '' }));
  await tryIt('duplicate first name', { ...mk('H'), first_name: `PW CT A ${id}` });
  await tryIt('email invalid', mk('I', { email_ids: [{ email_id: 'bad-email', is_primary: 1 }] }));
  await tryIt('email empty', mk('J', { email_ids: [{ email_id: '', is_primary: 1 }] }));
  await tryIt('email 101 chars', mk('K', { email_ids: [{ email_id: 'e'.repeat(90) + '@example.com', is_primary: 1 }] }));
  await tryIt('email same as another contact', mk('L', { email_ids: [{ email_id: em('A'), is_primary: 1 }] }));
  await tryIt('two primary emails', mk('M', { email_ids: [{ email_id: em('M1'), is_primary: 1 }, { email_id: em('M2'), is_primary: 1 }] }));
  await tryIt('no primary email', mk('N', { email_ids: [{ email_id: em('N1'), is_primary: 0 }, { email_id: em('N2'), is_primary: 0 }] }));
  await tryIt('phone empty', mk('O', { phone_nos: [{ phone: '', is_primary_phone: 1 }] }));
  await tryIt('phone letters', mk('P', { phone_nos: [{ phone: 'abcdef', is_primary_phone: 1 }] }));
  await tryIt('phone 1 char', mk('Q', { phone_nos: [{ phone: '1', is_primary_phone: 1 }] }));
  await tryIt('phone same as another contact', mk('R', { phone_nos: [{ phone: `+2011${id}101`, is_primary_phone: 1 }] }));
  await tryIt('two primary phones', mk('S', { phone_nos: [{ phone: `+2012${id}1`, is_primary_phone: 1 }, { phone: `+2012${id}2`, is_primary_phone: 1 }] }));
  await tryIt('no primary phone', mk('T', { phone_nos: [{ phone: `+2013${id}1`, is_primary_phone: 0 }, { phone: `+2013${id}2`, is_primary_phone: 0 }] }));
  await tryIt('gender Other', mk('U', { gender: 'Other' }));
  await tryIt('gender Male', mk('V', { gender: 'Male' }));
  await tryIt('phone type via custom?', mk('W', { phone_nos: [{ phone: `+2014${id}1`, is_primary_phone: 1, phone_type: 'Home' }] }));
  // primary / billing / shipping rules with a customer
  const link = [{ link_doctype: 'Customer', link_name: cust }];
  const c1 = await tryIt('first contact of customer ' + cust, mk('X1', { links: link }));
  if (c1) { const g = await api.get('Contact', c1.name); log(`  c1 primary=${g.is_primary_contact} billing=${g.is_billing_contact} shipping=${g.is_shipping_contact}`); }
  const c2 = await tryIt('second contact with all flags', mk('X2', { links: link, is_primary_contact: 1, is_billing_contact: 1, is_shipping_contact: 1 }));
  if (c1 && c2) { for (const n of [c1.name, c2.name]) { const g = await api.get('Contact', n); log(`  ${n}: primary=${g.is_primary_contact} billing=${g.is_billing_contact} shipping=${g.is_shipping_contact}`); } }
  if (c2) {
    try { const g = await api.get('Contact', c2.name); g.disabled = 1; await api.call('frappe.client.save', { doc: g }); log('disable the primary contact -> SAVED'); } catch (e: any) { log('disable the primary contact -> REFUSED ' + clean(String(e.message)).slice(0, 250)); }
    try { const g = await api.get('Contact', c2.name); g.is_primary_contact = 0; await api.call('frappe.client.save', { doc: g }); log('uncheck primary on the only/other primary -> SAVED'); } catch (e: any) { log('uncheck primary -> REFUSED ' + clean(String(e.message)).slice(0, 250)); }
  }
  await tryIt('company flag with customer link', mk('Y', { links: link, is_your_company_contact: 1 }));
});

