// Read only: how many QA journal entries exist by status.
import { test } from '@playwright/test';
import { api } from './helpers/api';
test('entries', async () => {
  const r = await api.list('Journal Entry', [['name', '>=', 'ACC-JV-2026-01720'], ['owner', '=', 'Administrator'], ['creation', '>', '2026-11-26 14:00:00']], ['name', 'docstatus'], 300);
  console.log('JE', r.length, [0, 1, 2].map((s) => r.filter((x) => x.docstatus === s).length), r.map((x) => x.name).sort()[0], r.map((x) => x.name).sort().pop());
});
