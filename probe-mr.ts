import dotenv from 'dotenv';
import { api } from './Shamel/helpers/api';

dotenv.config({ quiet: true });

(async () => {
  console.log(JSON.stringify(await api.list('Sales Order', [['customer', '=', 'PW Test Customer']], ['name', 'status', 'docstatus', 'company'], 20)));
  const t = await api.get('Terms and Conditions', 'dsfsdfsdf');
  console.log('terms', JSON.stringify({ name: t.name, buying: t.buying, selling: t.selling, terms: String(t.terms).slice(0, 80) }));
  console.log('MR count', JSON.stringify(await api.call('frappe.client.get_count', { doctype: 'Material Request' })));
  const m = await api.get('Material Request', 'MAT-MR-2026-00021');
  console.log('00021', JSON.stringify({ status: m.status, type: m.material_request_type, items: m.items.map((i: Record<string, unknown>) => [i.warehouse, i.from_warehouse, i.uom]) }));
})().catch((e) => console.log('ERROR', String(e).slice(0, 600)));
