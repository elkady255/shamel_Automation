// Probe (read-only): settings, master data and the Payment Entry screens.
import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';

test('environment', async () => {
  test.setTimeout(150_000);
  const show = async (label: string, fn: () => Promise<unknown>) => {
    try { console.log(label, JSON.stringify(await fn()).slice(0, 3000)); } catch (e: any) { console.log(label, 'ERR', String(e.message).slice(0, 200)); }
  };
  await show('ACCSET', async () => { const d = await api.get('Accounts Settings', 'Accounts Settings'); return Object.fromEntries(Object.entries(d).filter(([k]) => /exchange|advance|delete_linked|unlink|withhold|stale|cost_center|payment/i.test(k))); });
  await show('CO', async () => { const d = await api.get('Company', 'Ahmed Ebrahim CO.'); return Object.fromEntries(Object.entries(d).filter(([k]) => /default_.*account|advance|reconcil|cost_center|exchange|round|write_off/i.test(k))); });
  await show('TWC', () => api.list('Tax Withholding Category', [], ['name'], 20));
  await show('TWG', () => api.list('Tax Withholding Group', [], ['name'], 20));
  await show('STT', () => api.list('Sales Taxes and Charges Template', [['company', '=', 'Ahmed Ebrahim CO.']], ['name'], 20));
  await show('PTT', () => api.list('Purchase Taxes and Charges Template', [['company', '=', 'Ahmed Ebrahim CO.']], ['name'], 20));
  await show('EMP', () => api.list('Employee', [['company', '=', 'Ahmed Ebrahim CO.'], ['status', '=', 'Active']], ['name', 'employee_name', 'personal_email'], 5));
  await show('SH', () => api.list('Shareholder', [], ['name', 'title'], 5));
  await show('ACCTS', () => api.list('Account', [['company', '=', 'Ahmed Ebrahim CO.'], ['is_group', '=', 0], ['disabled', '=', 0], ['account_type', 'in', ['Bank', 'Cash', 'Equity', 'Tax']]], ['name', 'account_type', 'account_currency'], 60));
  await show('BANKACC', () => api.list('Bank Account', [], ['name', 'account', 'is_company_account', 'party', 'bank', 'bank_account_no'], 20));
  await show('MOP', () => api.list('Mode of Payment', [['enabled', '=', 1]], ['name', 'type'], 20));
  await show('PECOUNT', () => api.list('Payment Entry', [], ['name', 'docstatus', 'payment_type'], 3));
});

const dump = async (p: Page, tag: string) => {
  const m = p.locator('main');
  console.log(`== ${tag} ${p.url()}`);
  console.log('LABELS', JSON.stringify((await m.locator('label:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim())));
  console.log('BUTTONS', JSON.stringify((await m.locator('button:visible').evaluateAll((els: any[]) => els.map((e) => (e.innerText.trim() || e.title || '').replace(/\s+/g, ' ')))).filter(Boolean)));
  console.log('INPUTS', JSON.stringify(await m.locator('label:visible').evaluateAll((ls: any[]) => ls.map((l) => { let b = l.parentElement; for (let i = 0; i < 3 && b && !b.querySelector('input,textarea,.cd-readonly'); i++) b = b.parentElement; const i = b?.querySelector('input,textarea') as any; const ro = b?.querySelector('.cd-readonly') as any; return `${l.innerText.replace(/\s+/g, ' ').trim()}=${i ? i.value + (i.disabled || i.readOnly ? ' [ro]' : '') : ro ? ro.innerText + ' [label]' : ''}`; }))));
  await p.screenshot({ path: `Shamel/pe-results/${tag}.png`, fullPage: true });
};

test('screens', async ({ page }) => {
  test.setTimeout(200_000);
  await page.setViewportSize({ width: 1400, height: 1800 });
  await page.goto('/desk/shamel#/accounting/payment-entries', { timeout: 100_000 }); await page.waitForTimeout(12000);
  await dump(page, 'list');
  console.log('LISTHEAD', JSON.stringify(await page.locator('main table thead th').allInnerTexts()));
  console.log('ROW1', (await page.locator('main table tbody tr').first().innerText().catch(() => '')).replace(/\s+/g, ' '));
  await page.goto('about:blank'); await page.goto('/desk/shamel#/accounting/payment-entries/new', { timeout: 100_000 }); await page.waitForTimeout(12000);
  await dump(page, 'new');
});
