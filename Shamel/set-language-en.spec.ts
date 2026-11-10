import { test } from '@playwright/test';
import { api } from './helpers/api';

/** Sets the Administrator language to English (user's choice, 2026-11-10). The previous value is printed so it can be restored. */
test('set Administrator language to English', async () => {
  const [before] = await api.list('User', [['name', '=', 'Administrator']], ['name', 'language']);
  console.log('LANGUAGE BEFORE', before.language);
  await api.call('frappe.client.set_value', { doctype: 'User', name: 'Administrator', fieldname: 'language', value: 'en' });
  const [after] = await api.list('User', [['name', '=', 'Administrator']], ['name', 'language']);
  console.log('LANGUAGE AFTER', after.language);
});
