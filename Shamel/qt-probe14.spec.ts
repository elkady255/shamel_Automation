import { test } from '@playwright/test';
import { post, BASE } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe14.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

async function t(label: string, mutate: (d: any) => void) {
  const d: any = BASE();
  d.title = 'PW QT ' + label.slice(0, 60);
  d.items = [{ item_code: 'IND182210', qty: 2, rate: 10200, warehouse: 'Stores - E' }];
  mutate(d);
  const r = await post('Quotation', d);
  const i = r.doc?.items?.[0];
  log(`${label} => ${r.ok ? 'OK ' + r.name + ' total=' + r.doc.total + ' grand=' + r.doc.grand_total + ' disc=' + r.doc.discount_amount + ' rows=' + r.doc.items?.length + ' r1=' + JSON.stringify({ q: i?.qty, rate: i?.rate, amt: i?.amount, uom: i?.uom, wh: i?.warehouse, dp: i?.discount_percentage }) : 'FAIL ' + r.status + ' ' + r.msg.slice(0, 230).replace(/\s+/g, ' ')}`);
  return r;
}

test('item validations', async () => {
  fs.writeFileSync(OUT, '');
  await t('baseline IND', () => {});
  await t('qty 0', (d) => { d.items[0].qty = 0; });
  await t('qty 0 + has_unit_price_items', (d) => { d.items[0].qty = 0; d.has_unit_price_items = 1; });
  await t('qty negative', (d) => { d.items[0].qty = -3; });
  await t('qty decimal 2.5', (d) => { d.items[0].qty = 2.5; });
  await t('qty 0.0001', (d) => { d.items[0].qty = 0.0001; });
  await t('qty huge 1e12', (d) => { d.items[0].qty = 1e12; });
  await t('rate 0', (d) => { d.items[0].rate = 0; });
  await t('rate negative', (d) => { d.items[0].rate = -100; });
  await t('no items', (d) => { d.items = []; });
  await t('template item 1111', (d) => { d.items[0].item_code = '1111'; });
  await t('duplicate item twice', (d) => { d.items.push({ item_code: 'IND182210', qty: 1, rate: 10200, warehouse: 'Stores - E' }); });
  await t('uom Kg not of item', (d) => { d.items[0].uom = 'Kg'; });
  await t('uom missing', (d) => { d.items[0].uom = ''; });
  await t('warehouse missing', (d) => { delete d.items[0].warehouse; });
  await t('warehouse other company', (d) => { d.items[0].warehouse = 'Stores - Warrqa'; });
  await t('row desc 2 chars', (d) => { d.items[0].description = 'ab'; });
  await t('row desc 501 chars', (d) => { d.items[0].description = 'D'.repeat(501); });
  await t('row discount 150%', (d) => { d.items[0].discount_percentage = 150; });
  await t('row discount -10%', (d) => { d.items[0].discount_percentage = -10; });
  await t('row discount 10%', (d) => { d.items[0].discount_percentage = 10; });
  await t('row discount amount > rate', (d) => { d.items[0].discount_amount = 20000; });
  await t('margin percentage 20', (d) => { d.items[0].margin_type = 'Percentage'; d.items[0].margin_rate_or_amount = 20; });
  await t('margin amount negative', (d) => { d.items[0].margin_type = 'Amount'; d.items[0].margin_rate_or_amount = -5; });
  await t('add disc % 150', (d) => { d.additional_discount_percentage = 150; });
  await t('add disc % -10', (d) => { d.additional_discount_percentage = -10; });
  await t('add disc % 10 Grand Total', (d) => { d.additional_discount_percentage = 10; d.apply_discount_on = 'Grand Total'; });
  await t('add disc % 10 Net Total', (d) => { d.additional_discount_percentage = 10; d.apply_discount_on = 'Net Total'; });
  await t('add disc amount > total', (d) => { d.discount_amount = 999999; });
  await t('add disc amount negative', (d) => { d.discount_amount = -50; });
  await t('tax template (a - E)', (d) => { d.taxes_and_charges = 'a - E'; });
  await t('terms 2 chars', (d) => { d.terms = 'ab'; });
  await t('terms 501 chars', (d) => { d.terms = 'T'.repeat(501); });
  await t('terms 5000 chars', (d) => { d.terms = 'T'.repeat(5000); });
  await t('payment due before date', (d) => { d.payment_schedule = [{ due_date: '2026-01-01', invoice_portion: 100, payment_amount: 20400 }]; });
  await t('payment portion 60 only', (d) => { d.payment_schedule = [{ due_date: '2026-12-31', invoice_portion: 60 }]; });
  await t('payment portion 150', (d) => { d.payment_schedule = [{ due_date: '2026-12-31', invoice_portion: 150 }]; });
  await t('payment amount > total', (d) => { d.payment_schedule = [{ due_date: '2026-12-31', invoice_portion: 100, payment_amount: 99999 }]; });
  await t('tax row no account', (d) => { d.taxes = [{ charge_type: 'On Net Total', rate: 5, description: 'x' }]; });
  await t('tax row rate negative', (d) => { d.taxes = [{ charge_type: 'On Net Total', account_head: '1 - s - E', rate: -5, description: 'x' }]; });
  await t('tax row rate 500', (d) => { d.taxes = [{ charge_type: 'On Net Total', account_head: '1 - s - E', rate: 500, description: 'x' }]; });
  await t('tax prev row no ref', (d) => { d.taxes = [{ charge_type: 'On Previous Row Amount', account_head: '1 - s - E', rate: 5, description: 'x' }]; });
  await t('tax actual no amount', (d) => { d.taxes = [{ charge_type: 'Actual', account_head: '1 - s - E', description: 'x' }]; });
});
