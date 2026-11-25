// Exploratory probe: environment data and the Payment Reconciliation screen.
import { test } from '@playwright/test';
import { api } from './helpers/api';

test('env data', async () => {
  test.setTimeout(120_000);
  const show = async (label: string, fn: () => Promise<unknown>) => {
    try { console.log(label, JSON.stringify(await fn()).slice(0, 2500)); } catch (e: any) { console.log(label, 'ERR', String(e.message).slice(0, 300)); }
  };
  await show('COMPANY', () => api.list('Company', [], ['name', 'default_currency', 'default_receivable_account', 'default_payable_account', 'default_advance_received_account', 'default_advance_paid_account', 'book_advance_payments_in_separate_party_account', 'exchange_gain_loss_account', 'default_bank_account', 'default_cash_account']));
  await show('CURRENCIES', () => api.list('Currency', [['enabled', '=', 1]], ['name'], 30));
  await show('EXCHANGE', () => api.list('Currency Exchange', [], ['name', 'date', 'from_currency', 'to_currency', 'exchange_rate'], 15));
  await show('ACCOUNTS', () => api.list('Account', [['account_type', 'in', ['Receivable', 'Payable', 'Bank', 'Cash']], ['is_group', '=', 0]], ['name', 'account_type', 'account_currency', 'company'], 40));
  await show('MOP', () => api.list('Mode of Payment', [['enabled', '=', 1]], ['name', 'type'], 10));
  await show('QA', () => api.list('Customer', [['customer_name', 'like', 'QA-PR%']], ['name']));
});

test('screen', async ({ page }) => {
  test.setTimeout(180_000);
  const calls: string[] = [];
  page.on('response', (r) => { if (r.url().includes('/api/')) calls.push(`${r.status()} ${r.url().replace(/^https?:\/\/[^/]+/, '').slice(0, 200)}`); });
  await page.goto('/desk/shamel#/accounting/payment-reconciliation', { timeout: 100_000 });
  await page.waitForTimeout(15000);
  console.log('URL', page.url());
  console.log('TEXT', (await page.locator('main').innerText()).slice(0, 3000));
  console.log('LABELS', JSON.stringify(await page.locator('main label:visible').allInnerTexts()));
  console.log('BUTTONS', JSON.stringify((await page.locator('main button:visible').allInnerTexts()).map((s) => s.trim()).filter(Boolean)));
  console.log('LINKS', JSON.stringify(await page.locator('a[href*="reconcil"]').evaluateAll((a: any[]) => a.map((x) => x.getAttribute('href') + ' ' + x.innerText.trim()))));
  console.log('CALLS', calls.slice(-30).join('\n'));
  await page.screenshot({ path: 'Shamel/prec-results/probe1.png', fullPage: true });
});
