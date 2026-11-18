import { test } from '@playwright/test';
import * as fs from 'fs';
import { ctx } from './helpers/qt-api';
test('q5', async () => {
  const c = await ctx(); const out: string[] = [];
  const g = async (dt: string, f: any, fields: string[], lim = 20, ob = '') => { const r = await c.get('/api/resource/' + dt, { params: { filters: JSON.stringify(f), fields: JSON.stringify(fields), limit_page_length: String(lim), ...(ob ? { order_by: ob } : {}) } }); const j = await r.json(); return JSON.stringify(j.data ?? j.exception ?? j).slice(0, 1500); };
  const links = JSON.parse(await g('Dynamic Link', [['link_doctype', '=', 'Customer'], ['link_name', '=', 'CU-2026-00002'], ['parenttype', '=', 'Address']], ['parent']));
  for (const l of links) out.push('ADDR ' + await g('Address', [['name', '=', l.parent]], ['name', 'address_title', 'address_type', 'is_primary_address', 'is_shipping_address', 'creation', 'disabled']));
  const cl = JSON.parse(await g('Dynamic Link', [['link_doctype', '=', 'Customer'], ['link_name', '=', 'CU-2026-00002'], ['parenttype', '=', 'Contact']], ['parent']));
  for (const l of cl) out.push('CONTACT ' + await g('Contact', [['name', '=', l.parent]], ['name', 'is_primary_contact', 'is_billing_contact', 'creation']));
  const cu = await (await c.get('/api/resource/Customer/CU-2026-00002')).json(); out.push('CUSTOMER ' + JSON.stringify({ addr: cu.data.customer_primary_address, contact: cu.data.customer_primary_contact, terms: cu.data.payment_terms, pl: cu.data.default_price_list, loyalty: cu.data.loyalty_program, group: cu.data.customer_group, terr: cu.data.territory, tax: cu.data.tax_id }));
  const co = await g('Address', [['address_title', 'like', '%dfgh%']], ['name', 'is_your_company_address', 'is_primary_address', 'creation', 'address_title'], 5); out.push('COMPANY ADDR ' + co);
  fs.writeFileSync('C:/Playwright_Automation/Shamel/so3-q5.out.txt', out.join('\n'));
});
