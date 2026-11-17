import { test } from '@playwright/test';
import { post, BASE } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe13.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const today = new Date().toISOString().slice(0, 10);
const addDays = (d: number) => new Date(Date.now() + d * 86400000).toISOString().slice(0, 10);

async function t(label: string, mutate: (d: any) => void) {
  const d: any = BASE();
  d.title = 'PW QT ' + label;
  mutate(d);
  const r = await post('Quotation', d);
  log(`${label} => ${r.ok ? 'OK ' + r.name + ' valid_till=' + r.doc.valid_till + ' total=' + r.doc.grand_total + ' status=' + r.doc.status : 'FAIL ' + r.status + ' ' + r.msg.slice(0, 220)}`);
  return r;
}

test('header validations', async () => {
  fs.writeFileSync(OUT, '');
  await t('baseline', () => {});
  await t('lead party', (d) => { d.quotation_to = 'Lead'; d.party_name = 'CRM-LEAD-2025-00008'; });
  await t('no party', (d) => { delete d.party_name; });
  await t('party not found', (d) => { d.party_name = 'NOPE-123'; });
  await t('party type mismatch (Lead with a Customer id)', (d) => { d.quotation_to = 'Lead'; });
  await t('quotation_to invalid doctype', (d) => { d.quotation_to = 'Supplier'; d.party_name = 'x'; });
  await t('no company', (d) => { delete d.company; });
  await t('valid_till before date', (d) => { d.transaction_date = today; d.valid_till = addDays(-5); });
  await t('valid_till equals date', (d) => { d.transaction_date = today; d.valid_till = today; });
  await t('no valid_till', (d) => { delete d.valid_till; });
  await t('date in the past (2020)', (d) => { d.transaction_date = '2020-01-01'; d.valid_till = '2020-02-01'; });
  await t('date far future', (d) => { d.transaction_date = '2099-01-01'; d.valid_till = '2099-02-01'; });
  await t('title 1 char', (d) => { d.title = 'a'; });
  await t('title 101 chars', (d) => { d.title = 'T'.repeat(101); });
  await t('title 141 chars', (d) => { d.title = 'T'.repeat(141); });
  await t('no employee', (d) => { delete d.custom_employee; });
  await t('no name in contract', (d) => { delete d.custom_name_in_contract; });
  await t('exchange rate 0', (d) => { d.conversion_rate = 0; });
  await t('exchange rate negative', (d) => { d.conversion_rate = -2; });
  await t('plc rate 0', (d) => { d.plc_conversion_rate = 0; });
  await t('price list not found', (d) => { d.selling_price_list = 'NOPE PL'; });
  await t('currency USD (company SAR)', (d) => { d.currency = 'USD'; });
  await t('order type Maintenance', (d) => { d.order_type = 'Maintenance'; });
  await t('order type Shopping Cart', (d) => { d.order_type = 'Shopping Cart'; });
  await t('order type invalid', (d) => { d.order_type = 'Bogus'; });
  await t('ignore pricing rule', (d) => { d.ignore_pricing_rule = 1; });
  await t('company other (Azzrk) with its stores', (d) => { d.company = 'Azzrk - أزرق'; });
});
