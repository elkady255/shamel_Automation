import { test } from '@playwright/test';
import * as fs from 'fs';
import { get } from './helpers/qt-api';
import { api } from './helpers/api';
const OUT = 'C:/Playwright_Automation/Shamel/si2-q2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('q2', async () => {
  fs.writeFileSync(OUT, '');
  const cf = await api.list('Custom Field', [['dt', '=', 'Sales Invoice']], ['fieldname', 'label', 'fieldtype', 'reqd', 'hidden', 'options', 'insert_after', 'depends_on'], 200);
  for (const f of cf) log(`CF ${f.fieldname}|${f.label}|${f.fieldtype}|reqd=${f.reqd}|hid=${f.hidden}|opt=${(f.options || '').slice(0, 60)}|dep=${f.depends_on || ''}`);
  const [s] = await api.list('Sales Invoice', [['docstatus', '=', 1], ['status', '=', 'Overdue']], ['name'], 1);
  const d = await get('Sales Invoice', s.name);
  log('KEYS ' + JSON.stringify(Object.fromEntries(Object.entries(d).filter(([k, v]) => /status|credit|refund|hold|close|custom|zatca|invoice_type/.test(k) && typeof v !== 'object'))));
  const meta = await api.call('frappe.desk.form.load.getdoctype', { doctype: 'Sales Invoice' });
  const dt = meta.docs[0];
  const st = dt.fields.find((f: any) => f.fieldname === 'status'); log('STATUS OPTIONS ' + JSON.stringify(st?.options));
  for (const fn of ['custom_credit_status', 'custom_refund_status', 'custom_invoice_status']) { const f = dt.fields.find((x: any) => x.fieldname === fn); if (f) log(fn + ' ' + JSON.stringify(f.options)); }
});
