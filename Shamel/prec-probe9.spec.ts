// Read-only: current balances of the QA-PR Cust Main documents.
import { test } from '@playwright/test';
import { api } from './helpers/api';

test('state', async () => {
  test.setTimeout(120_000);
  const si = await api.list('Sales Invoice', [['customer', '=', 'QA-PR Cust Main']], ['name', 'docstatus', 'status', 'grand_total', 'outstanding_amount', 'total_advance', 'allocate_advances_automatically'], 50);
  si.forEach((x) => console.log('SI', JSON.stringify(x)));
  for (const n of ['ACC-PAY-2026-03072', 'ACC-PAY-2026-03073']) {
    const p = await api.get('Payment Entry', n);
    console.log('PE', n, p.docstatus, p.unallocated_amount, JSON.stringify(p.references.map((r: any) => [r.reference_name, r.allocated_amount]))); // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  const j = await api.get('Journal Entry', 'ACC-JV-2026-01713');
  console.log('JV', j.docstatus, JSON.stringify(j.accounts.map((a: any) => [a.account, a.reference_name ?? '', a.credit_in_account_currency, a.debit_in_account_currency]))); // eslint-disable-line @typescript-eslint/no-explicit-any
});
