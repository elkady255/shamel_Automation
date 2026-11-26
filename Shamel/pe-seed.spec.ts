// Creates the Payment Entry test data once.
import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as d from './helpers/pe-data';

test('seed', async () => {
  test.setTimeout(500_000);
  await d.seedStep('cust', d.customer);
  await d.seedStep('supp', d.supplier);
  await d.seedStep('contactC', () => d.contact('QA-PE CustContact', 'Customer', d.CUST));
  await d.seedStep('contactS', () => d.contact('QA-PE SuppContact', 'Supplier', d.SUPP));
  await d.seedStep('shareholder', () => api.ensure('Shareholder', [['title', '=', 'QA-PE Shareholder']], { title: 'QA-PE Shareholder', company: d.CO }));
  await d.seedStep('employee', () => api.ensure('Employee', [['first_name', '=', 'QA-PE']], {
    first_name: 'QA-PE', last_name: 'Employee', company: d.CO, gender: 'Male', date_of_birth: '1990-01-01', date_of_joining: '2026-01-01', status: 'Active', personal_email: 'qa-pe.employee@example.com', custom_الرقم_القومي: '29001010000011',
  }));
  await d.seedStep('si1', () => d.salesInvoice(1000, 20));
  await d.seedStep('si2', () => d.salesInvoice(2000, 10));
  await d.seedStep('si3', () => d.salesInvoice(1200, 5));
  await d.seedStep('pi1', () => d.purchaseInvoice(1500, 12));
  await d.seedStep('pi2', () => d.purchaseInvoice(900, 6));
  await d.seedStep('so1', () => api.insertAndSubmit('Sales Order', { company: d.CO, customer: d.CUST, transaction_date: d.daysAgo(3), delivery_date: d.today(), items: [{ item_code: d.ITEM, qty: 1, rate: 3000, delivery_date: d.today(), warehouse: undefined }] }));
  await d.seedStep('po1', () => api.insertAndSubmit('Purchase Order', { company: d.CO, supplier: d.SUPP, transaction_date: d.daysAgo(3), schedule_date: d.today(), buying_price_list: 'Standard Buying - SAR', items: [{ item_code: d.ITEM, qty: 1, rate: 800, schedule_date: d.today() }] }));
});
