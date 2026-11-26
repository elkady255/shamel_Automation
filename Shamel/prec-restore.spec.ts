// Restores my own QA data: unlinks the advance journal entry from my test invoice 02913, then cancels that invoice.
import { test, expect } from '@playwright/test';
import { api } from './helpers/api';
import * as d from './helpers/prec-data';
import * as fs from 'fs';

test('unreconcile my advance from my test invoice and cancel it', async () => {
  test.setTimeout(180_000);
  const inv = 'ACC-SINV-2026-02913';
  const doc = await api.get('Sales Invoice', inv);
  expect(doc.customer).toBe('QA-PR Cust Main');
  if (doc.docstatus === 1 && doc.outstanding_amount < doc.grand_total) {
    await api.insertAndSubmit('Unreconcile Payment', {
      company: d.CO, voucher_type: 'Journal Entry', voucher_no: 'ACC-JV-2026-01713',
      allocations: [{ account: d.REC, party_type: 'Customer', party: 'QA-PR Cust Main', reference_doctype: 'Sales Invoice', reference_name: inv, allocated_amount: 400, account_currency: 'SAR', unlinked: 1 }],
    });
  }
  if ((await api.get('Sales Invoice', inv)).docstatus === 1) await api.call('frappe.client.cancel', { doctype: 'Sales Invoice', name: inv });
  const after = await api.get('Sales Invoice', inv);
  const j = await api.get('Journal Entry', 'ACC-JV-2026-01713');
  console.log('INV', after.docstatus, after.status);
  console.log('JV', JSON.stringify(j.accounts.map((a: any) => [a.account, a.reference_name ?? '', a.credit_in_account_currency, a.debit_in_account_currency]))); // eslint-disable-line @typescript-eslint/no-explicit-any
  const m = await api.call('shamel.api.routes.account.transactions.payment_reconcilition.get_unreconciled_entries', { data: JSON.stringify({ company: d.CO, party_type: 'Customer', party: 'QA-PR Cust Main', receivable_payable_account: d.REC, invoice_limit: 50, payment_limit: 50 }) });
  console.log('INVOICES', JSON.stringify(m.data.invoices.map((x: any) => [x.invoice_number.slice(-5), x.outstanding_amount]))); // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log('PAYMENTS', JSON.stringify(m.data.payments.map((x: any) => [x.reference_name.slice(-5), x.amount]))); // eslint-disable-line @typescript-eslint/no-explicit-any
  const f = 'Shamel/prec-results/data.json'; const data = JSON.parse(fs.readFileSync(f, 'utf8')); data.siCancelled = inv; fs.writeFileSync(f, JSON.stringify(data, null, 1));
});
