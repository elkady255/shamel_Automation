// Creates the base data set once and writes the document names to prec-results/data.json.
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as d from './helpers/prec-data';

test('seed customer and supplier data', async () => {
  test.setTimeout(500_000);
  const file = 'Shamel/prec-results/data.json';
  const out: Record<string, string> = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const step = async (key: string, fn: () => Promise<any>) => {
    if (out[key]) return out[key];
    try { const r = await fn(); out[key] = typeof r === 'string' ? r : r.name; console.log('OK', key, out[key]); }
    catch (e: any) { console.log('ERR', key, String(e.message).replace(/\\n/g, ' ').slice(0, 700)); }
    fs.writeFileSync(file, JSON.stringify(out, null, 1));
    return out[key];
  };
  await d.ensurePayable();
  const c = await step('cust', () => d.newCustomer('Main'));
  const s = await step('supp', () => d.newSupplier('Main'));
  const get = (dt: string, k: string) => d.reload(dt, out[k]);
  await step('si1', () => d.salesInvoice(c, 1000, 20));
  await step('si2', () => d.salesInvoice(c, 2000, 10));
  await step('si3', () => d.salesInvoice(c, 500, 1));
  await step('peC1', () => d.advance('Customer', c, 700, 15));
  await step('peC2', () => d.advance('Customer', c, 3000, 5));
  await step('jeC', () => d.journal('Customer', c, 400, 2));
  await step('siR', async () => d.salesReturn(await get('Sales Invoice', 'si3'), 200));
  await step('pi1', () => d.purchaseInvoice(s, 1500, 20));
  await step('pi2', () => d.purchaseInvoice(s, 800, 3));
  await step('peS1', () => d.advance('Supplier', s, 600, 12));
  await step('peS2', () => d.advance('Supplier', s, 2000, 1));
  await step('jeS', () => d.journal('Supplier', s, 300, 2));
  await step('piR', async () => d.purchaseReturn(await get('Purchase Invoice', 'pi2'), 100));
  const u = await step('custUsd', () => d.newCustomer('USD', { default_currency: 'USD' }));
  await step('siU', () => d.usdInvoice(u, 300, 3.7));
  await step('peU', () => d.usdAdvance(u, 100, 3.8));
});
