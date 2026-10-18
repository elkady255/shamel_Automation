import { test } from '@playwright/test';
import { note, stockOf, ITEM_A } from './helpers/dn-data';

test('delivery note seed smoke', async () => {
  const before = await stockOf(ITEM_A);
  for (const s of ['Draft', 'Submitted', 'Cancelled', 'Closed'] as const) {
    try { const d = await note(s); console.log(s, d.name, 'docstatus', d.docstatus, 'status', d.status); } catch (e) { console.log(s, 'FAILED', String(e).slice(0, 300)); }
  }
  console.log('stock', before, '->', await stockOf(ITEM_A));
});
