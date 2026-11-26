// Read only: QA payment entries created during the Payment Entry test.
import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as d from './helpers/pe-data';
test('my entries', async () => {
  const r = await api.list('Payment Entry', [['creation', '>', '2026-11-26'], ['party', 'in', [d.CUST, d.SUPP, d.data().custUsd, d.data().employee, d.data().shareholder]]], ['name', 'docstatus'], 300);
  const t = await api.list('Payment Entry', [['creation', '>', '2026-11-26'], ['payment_type', '=', 'Internal Transfer'], ['owner', '=', 'Administrator']], ['name', 'docstatus', 'paid_amount'], 50);
  for (const s of [0, 1, 2]) console.log('STATUS', s, r.filter((x) => x.docstatus === s).length);
  console.log('RANGE', r.map((x) => x.name).sort()[0], r.map((x) => x.name).sort().pop(), 'TRANSFERS', JSON.stringify(t));
});
