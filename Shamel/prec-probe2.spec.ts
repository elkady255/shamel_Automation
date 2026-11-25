// Probe: what blocks the seed data (closed period, payable account rules, price lists).
import { test } from '@playwright/test';
import { api } from './helpers/api';

test('blockers', async () => {
  test.setTimeout(120_000);
  const show = async (label: string, fn: () => Promise<unknown>) => {
    try { console.log(label, JSON.stringify(await fn()).slice(0, 3000)); } catch (e: any) { console.log(label, 'ERR', String(e.message).slice(0, 300)); }
  };
  await show('PERIODS', () => api.list('Accounting Period', [['company', '=', 'Ahmed Ebrahim CO.']], ['name', 'period_name', 'start_date', 'end_date', 'disabled', 'owner', 'creation']));
  await show('PERIOD DOC', async () => { const [p] = await api.list('Accounting Period', [['period_name', '=', 'test']], ['name']); const d = await api.get('Accounting Period', p.name); return { ...d, closed_documents: d.closed_documents.filter((x: any) => x.closed).map((x: any) => x.document_type) }; });
  await show('PAYABLE', () => api.list('Account', [['company', '=', 'Ahmed Ebrahim CO.'], ['account_type', 'in', ['Payable', 'Receivable']], ['is_group', '=', 0]], ['name', 'account_type', 'account_currency', 'balance_must_be', 'disabled']));
  await show('PRICELISTS', () => api.list('Price List', [['enabled', '=', 1]], ['name', 'buying', 'selling', 'currency']));
  await show('CUSTFIELD', () => api.list('Customer', [['custom_company', '=', 'Ahmed Ebrahim CO.']], ['name', 'custom_company'], 3));
});
