// Read-only: mandatory Employee fields.
import { test } from '@playwright/test';
import { api } from './helpers/api';
test('employee required fields', async () => {
  const cf = await api.list('Custom Field', [['dt', '=', 'Employee'], ['reqd', '=', 1]], ['fieldname', 'fieldtype', 'options', 'label'], 60);
  console.log('CF', JSON.stringify(cf));
  const [e] = await api.list('Employee', [['status', '=', 'Active'], ['company', '=', 'Ahmed Ebrahim CO.']], ['name'], 1);
  const doc = await api.get('Employee', e.name);
  console.log('SAMPLE', JSON.stringify(Object.fromEntries(cf.map((f) => [f.fieldname, doc[f.fieldname]]))));
});
