// Run after pe-reset.spec.ts (a separate command, so the new run suffix is loaded).
import { test, expect } from '@playwright/test';
import * as d from './helpers/pe-data';
import { usdInvoice } from './helpers/prec-data';

test('seed the new data set', async () => {
  test.setTimeout(500_000);
  await d.seedStep('cust', d.customer);
  await d.seedStep('supp', d.supplier);
  await d.seedStep('contactC', () => d.contact('QA-PE CustContact', 'Customer', d.CUST));
  await d.seedStep('contactS', () => d.contact('QA-PE SuppContact', 'Supplier', d.SUPP));
  // sales invoices first: the purchase invoices change the item's last purchase rate
  await d.seedStep('si2', () => d.salesInvoice(1500, 10));
  await d.seedStep('si3', () => d.salesInvoice(1200, 5));
  await d.seedStep('custUsd', async () => (await d.usdCustomer()).name as string);
  await d.seedStep('siU', () => usdInvoice(d.data().custUsd, 300, 3.7));
  await d.seedStep('siU2', () => usdInvoice(d.data().custUsd, 250, 3.7, 7));
  await d.seedStep('pi1', () => d.purchaseInvoice(1500, 12));
  await d.seedStep('pi2', () => d.purchaseInvoice(900, 6));
  for (const k of ['cust', 'supp', 'contactC', 'contactS', 'si2', 'si3', 'custUsd', 'siU', 'siU2', 'pi1', 'pi2']) expect(d.data()[k], k).toBeTruthy();
});
