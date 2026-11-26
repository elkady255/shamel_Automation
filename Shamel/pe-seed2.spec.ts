// Creates the withholding tax category and the foreign currency data once.
import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as d from './helpers/pe-data';
import { usdInvoice } from './helpers/prec-data';

export const TWC = 'QA-PE TDS 5';

test('seed advanced', async () => {
  test.setTimeout(300_000);
  const accounts = await api.list('Account', [['company', '=', d.CO], ['is_group', '=', 0], ['account_type', '=', 'Tax']], ['name', 'account_currency'], 10);
  console.log('TAXACCOUNTS', JSON.stringify(accounts));
  try { console.log('TWC12', JSON.stringify(await api.get('Tax Withholding Category', '12')).slice(0, 900)); } catch (e: any) { console.log('TWC12', e.message.slice(0, 200)); } // eslint-disable-line @typescript-eslint/no-explicit-any
  const parent = (await api.get('Account', d.PAY_DEFAULT)).parent_account;
  const wht = await d.seedStep('whtAccount', () => api.ensure('Account', [['name', '=', 'QA-PE WHT - E']], { account_name: 'QA-PE WHT', company: d.CO, parent_account: parent, account_type: 'Tax', account_currency: 'SAR' }));
  await d.seedStep('twc', () => api.ensure('Tax Withholding Category', [['name', '=', TWC]], {
    name: TWC, category_name: TWC, rates: [{ from_date: '2026-01-01', to_date: '2026-12-31', tax_withholding_rate: 5, single_threshold: 0, cumulative_threshold: 0 }], accounts: [{ company: d.CO, account: wht }],
  }));
  await d.seedStep('custUsd', async () => (await api.ensure('Customer', [['customer_name', '=', d.CUST_USD]], { customer_name: d.CUST_USD, customer_type: 'Company', custom_company: d.CO, default_currency: 'USD', accounts: [{ company: d.CO, account: 'usd debtors - E' }] })).name as string);
  await d.seedStep('siU', () => usdInvoice(d.data().custUsd, 300, 3.7));
  await d.seedStep('siU2', () => usdInvoice(d.data().custUsd, 250, 3.7, 7));
  console.log('RATES', JSON.stringify(await api.list('Currency Exchange', [['from_currency', 'in', ['USD', 'EGP']]], ['date', 'from_currency', 'to_currency', 'exchange_rate'], 20)));
});
