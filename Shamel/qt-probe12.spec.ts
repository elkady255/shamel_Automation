import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe12.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('custom fields', async () => {
  fs.writeFileSync(OUT, '');
  for (const dt of ['Quotation', 'Quotation Item']) {
    const cf = await api.list('Custom Field', [['dt', '=', dt]], ['name', 'fieldname', 'label', 'fieldtype', 'reqd', 'hidden', 'read_only', 'depends_on', 'mandatory_depends_on', 'insert_after', 'options', 'fetch_from', 'default'], 100);
    for (const f of cf) log(`CF ${dt}|${f.fieldname}|${f.label}|${f.fieldtype}|reqd=${f.reqd}|hid=${f.hidden}|dep=${f.depends_on || ''}|mdep=${f.mandatory_depends_on || ''}|opt=${f.options || ''}|fetch=${f.fetch_from || ''}|def=${f.default || ''}`);
  }
  const ps = await api.list('Property Setter', [['doc_type', 'in', ['Quotation', 'Quotation Item']]], ['name', 'field_name', 'property', 'value'], 100);
  for (const p of ps) log(`PS ${p.field_name}|${p.property}|${String(p.value).slice(0, 80)}`);
  // Does the same happen via API? (insert minimal valid quotation without those fields)
  try {
    const r = await api.insert('Quotation', { quotation_to: 'Customer', party_name: 'CU-2026-00001', company: 'Ahmed Ebrahim CO.', order_type: 'Sales', items: [{ item_code: 'IND182210', qty: 1, rate: 100 }] });
    log('API INSERT OK ' + r.name);
  } catch (e: any) {
    log('API INSERT FAIL ' + String(e.message).slice(0, 500));
  }
});
