// Read-only: journal entries and ledger rows of the supplier and USD reconciliations.
import { test } from '@playwright/test';
import { api } from './helpers/api';

test('ledgers', async () => {
  test.setTimeout(150_000);
  for (const party of ['QA-PR Supp Main', 'QA-PR Cust USD', 'QA-PR Cust Main']) {
    const jes = await api.list('Journal Entry', [['Journal Entry Account', 'party', '=', party]], ['name', 'voucher_type', 'posting_date', 'docstatus', 'creation', 'is_system_generated'], 30);
    console.log('JE', party, JSON.stringify(jes));
    for (const j of jes.filter((x, i) => jes.findIndex((y) => y.name === x.name) === i)) {
      const doc = await api.get('Journal Entry', j.name);
      console.log('ROWS', j.name, doc.voucher_type, doc.posting_date, JSON.stringify(doc.accounts.map((a: any) => [a.account, a.debit, a.credit, a.reference_name ?? '']))); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
  for (const n of ['ACC-SINV-2026-02911', 'ACC-PAY-2026-03076']) {
    console.log('GL', n, JSON.stringify(await api.list('GL Entry', [['against_voucher', '=', n], ['is_cancelled', '=', 0]], ['voucher_type', 'voucher_no', 'account', 'debit', 'credit', 'posting_date'], 30)));
    console.log('GLV', n, JSON.stringify(await api.list('GL Entry', [['voucher_no', '=', n], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit', 'posting_date'], 30)));
  }
  const pe = await api.get('Payment Entry', 'ACC-PAY-2026-03076');
  console.log('PEU', JSON.stringify({ unallocated: pe.unallocated_amount, refs: pe.references.map((r: any) => [r.reference_name, r.allocated_amount, r.exchange_rate, r.exchange_gain_loss]), deductions: pe.deductions })); // eslint-disable-line @typescript-eslint/no-explicit-any
});
