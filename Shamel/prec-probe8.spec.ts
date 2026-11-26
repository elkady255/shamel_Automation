// Verify the bank / cost center filter findings against the stored documents and the server answers.
import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as d from './helpers/prec-data';

test('verify bank and cost center filters', async () => {
  test.setTimeout(120_000);
  for (const n of ['ACC-PAY-2026-03072', 'ACC-PAY-2026-03073']) {
    const x = await api.get('Payment Entry', n);
    console.log('PE', n, JSON.stringify({ paid_from: x.paid_from, paid_to: x.paid_to, cost_center: x.cost_center, unallocated: x.unallocated_amount, docstatus: x.docstatus }));
  }
  const ret = await api.get('Sales Invoice', 'ACC-SINV-2026-02910');
  console.log('RET', JSON.stringify({ cost_center: ret.cost_center, item_cc: ret.items[0].cost_center }));
  const base = { company: d.CO, party_type: 'Customer', party: 'QA-PR Cust Main', receivable_payable_account: d.REC, invoice_limit: 50, payment_limit: 50 };
  for (const extra of [{}, { bank_cash_account: '122101 - ALRAJHY BANK - E' }, { bank_cash_account: '122102 - RIYAD BANK - E' }, { cost_center: '101 - Main X - E' }, { project: 'PROJ-0001' }]) {
    const m = await api.call('shamel.api.routes.account.transactions.payment_reconcilition.get_unreconciled_entries', { data: JSON.stringify({ ...base, ...extra }) });
    console.log('FILTER', JSON.stringify(extra), JSON.stringify(m?.data?.payments?.map((p: any) => `${p.reference_name.slice(-5)}:${p.cost_center ?? '-'}`) ?? m).slice(0, 400)); // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  const cc = await api.list('Cost Center', [['company', '=', d.CO], ['is_group', '=', 0], ['name', '!=', d.CC]], ['name'], 1);
  const m = await api.call('shamel.api.routes.account.transactions.payment_reconcilition.get_unreconciled_entries', { data: JSON.stringify({ ...base, cost_center: cc[0].name }) });
  console.log('FILTER other cc', cc[0].name, JSON.stringify(m?.data?.payments?.map((p: any) => `${p.reference_name.slice(-5)}:${p.cost_center ?? '-'}`))); // eslint-disable-line @typescript-eslint/no-explicit-any
});
