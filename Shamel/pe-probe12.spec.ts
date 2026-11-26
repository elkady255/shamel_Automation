// Read only: confirms the company settings are unchanged.
import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as d from './helpers/pe-data';
test('company unchanged', async () => {
  const c = await api.get('Company', d.CO);
  console.log('NOW', JSON.stringify([c.book_advance_payments_in_separate_party_account, c.reconcile_on_advance_payment_date, c.default_advance_received_account, c.default_advance_paid_account, c.modified]));
});
