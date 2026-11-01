import { test } from '@playwright/test';
import { api } from './helpers/api';

/** Remove, one by one, the Stock Reconciliations created by today's tests (only those whose every item is the PW test item). */
test('clean up the test Stock Reconciliations', async () => {
  test.setTimeout(240_000);
  const rows = await api.call('frappe.client.get_list', { doctype: 'Stock Reconciliation', fields: ['name', 'docstatus'], filters: [['creation', '>', '2026-10-28 00:00:00']], order_by: 'creation desc', limit_page_length: 200 });
  let removed = 0; const kept: string[] = [];
  for (const r of rows) {
    const d = await api.get('Stock Reconciliation', r.name);
    if (!d.items.length || !d.items.every((i: any) => i.item_code === 'STO-ITEM-2026-00074')) { kept.push(`${r.name}(not a test record)`); continue; }
    try {
      if (d.docstatus === 1) await api.call('frappe.client.cancel', { doctype: 'Stock Reconciliation', name: r.name });
      await api.call('frappe.client.delete', { doctype: 'Stock Reconciliation', name: r.name });
      removed++;
    } catch (e) { kept.push(`${r.name}:${d.docstatus} ${String(e).replace(/\s+/g, ' ').replace(/^Error: [^ ]+ failed: /, '').slice(0, 90)}`); }
  }
  console.log('REMOVED', removed, 'of', rows.length);
  kept.forEach((k) => console.log('KEPT', k));
});
