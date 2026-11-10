import { test } from '@playwright/test';
import { api } from './helpers/api';
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
test('si create attempt', async ({ page }) => {
  test.setTimeout(170_000);
  const [cust] = await api.list('Customer', [['disabled', '=', 0]], ['name', 'customer_name', 'default_currency'], 3);
  console.log('CUSTOMER:', JSON.stringify(cust));
  page.on('response', async (r) => { if (/\/api\//.test(r.url()) && (r.request().method() !== 'GET' || r.status() >= 400) && !/kaspersky|session_default|getpage|get_doc_fields|filters|get_list|get_options|get_naming|get_count/.test(r.url())) { let b = ''; try { b = clean(await r.text()).slice(0, 400); } catch { /* */ } console.log('API', r.request().method(), r.status(), r.url().split('/api/')[1]?.slice(0, 100), '| body:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 500), '=>', b); } });
  const main = page.getByRole('main');
  const step = async (l: string, fn: () => Promise<unknown>) => { try { await fn(); console.log('OK  ', l); } catch (e) { console.log('FAIL', l, '-', clean(String(e)).slice(0, 200)); await page.screenshot({ path: `test-results/si-fail-${l.replace(/\W+/g, '-')}.png` }); throw e; } };
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-invoices/new'); await page.waitForTimeout(6000);
  const pickIn = async (placeholder: RegExp | string, text: RegExp | string) => {
    const f = main.getByPlaceholder(placeholder).first(); await f.click(); await page.waitForTimeout(1200);
    const o = page.getByRole('option', { name: text }).locator('visible=true').first();
    if (await o.count()) await o.click({ timeout: 8000 }); else await page.getByText(text as string).locator('visible=true').last().click({ timeout: 8000, force: true });
    await page.waitForTimeout(800);
  };
  await step('company', () => pickIn('Search And Select Company', /Ahmed Ebrahim/));
  await step('customer', async () => { const f = main.getByPlaceholder('Search And Select Customer').first(); await f.click(); await f.fill(cust.customer_name.slice(0, 6)); await page.waitForTimeout(1800); await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(1500); });
  console.log('AFTER CUSTOMER INPUTS:', JSON.stringify(await main.locator('input:visible').evaluateAll((els: any[]) => els.map((e) => (e.placeholder || e.type) + '=' + e.value).filter((x) => !/checkbox/.test(x)))));
  await step('add item popup', async () => { await main.getByRole('button', { name: 'Add Item' }).click(); await page.waitForTimeout(2000); });
  console.log('POPUP:', clean((await page.locator('[role=dialog]:visible,.modal:visible,.popup:visible').allInnerTexts()).join(' | ')).slice(0, 900));
  console.log('POPUP INPUTS:', JSON.stringify(await page.locator('input:visible').evaluateAll((els: any[]) => els.map((e) => (e.placeholder || e.type) + '=' + e.value).filter((x) => !/checkbox/.test(x)))));
  await page.screenshot({ path: 'test-results/si-popup.png', fullPage: true });
});
