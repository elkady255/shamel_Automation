import { test } from '@playwright/test';
import { post } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe7.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

const base = (): any => ({
  blanket_order_type: 'Selling', customer: 'CU-2026-00001', company: 'Ahmed Ebrahim CO.',
  from_date: '2026-11-12', to_date: '2026-11-20', order_no: 'PW-BO',
  items: [{ item_code: 'IND182210', qty: 10, rate: 150 }],
});
async function t(label: string, mutate: (d: any) => void) {
  const d = base(); mutate(d);
  const r = await post('Blanket Order', d);
  const i = r.doc?.items?.[0];
  log(`${label} => ${r.ok ? 'OK ' + r.name + ' rows=' + r.doc.items?.length + ' r1=' + JSON.stringify({ q: i?.qty, rate: i?.rate, n: i?.item_name }) : 'FAIL ' + r.status + ' ' + r.msg.slice(0, 200).replace(/\s+/g, ' ')}`);
}

test('server validations', async () => {
  fs.writeFileSync(OUT, '');
  await t('baseline', () => {});
  await t('selling without customer', (d) => { delete d.customer; });
  await t('purchasing without supplier', (d) => { d.blanket_order_type = 'Purchasing'; delete d.customer; });
  await t('purchasing with supplier Facebook', (d) => { d.blanket_order_type = 'Purchasing'; delete d.customer; d.supplier = 'Facebook'; });
  await t('selling with supplier only', (d) => { delete d.customer; d.supplier = 'Facebook'; });
  await t('customer not found', (d) => { d.customer = 'NOPE'; });
  await t('no type', (d) => { delete d.blanket_order_type; });
  await t('invalid type', (d) => { d.blanket_order_type = 'Bogus'; });
  await t('from after to', (d) => { d.from_date = '2026-11-25'; d.to_date = '2026-11-20'; });
  await t('from equals to', (d) => { d.to_date = d.from_date; });
  await t('no from_date', (d) => { delete d.from_date; });
  await t('no to_date', (d) => { delete d.to_date; });
  await t('dates in 2019', (d) => { d.from_date = '2019-01-01'; d.to_date = '2019-02-01'; });
  await t('dates far future 2099', (d) => { d.from_date = '2099-01-01'; d.to_date = '2099-02-01'; });
  await t('no company', (d) => { delete d.company; });
  await t('no items', (d) => { d.items = []; });
  await t('row without item_code', (d) => { delete d.items[0].item_code; });
  await t('item not found', (d) => { d.items[0].item_code = 'NOPE-ITEM'; });
  await t('rate missing', (d) => { delete d.items[0].rate; });
  await t('rate 0', (d) => { d.items[0].rate = 0; });
  await t('rate negative', (d) => { d.items[0].rate = -5; });
  await t('qty missing', (d) => { delete d.items[0].qty; });
  await t('qty 0', (d) => { d.items[0].qty = 0; });
  await t('qty negative', (d) => { d.items[0].qty = -3; });
  await t('qty decimal 2.5', (d) => { d.items[0].qty = 2.5; });
  await t('qty huge 1e15', (d) => { d.items[0].qty = 1e15; });
  await t('duplicate item twice', (d) => { d.items.push({ item_code: 'IND182210', qty: 1, rate: 100 }); });
  await t('non-stock item 2121', (d) => { d.items[0].item_code = '2121'; });
  await t('template item 1111', (d) => { d.items[0].item_code = '1111'; });
  await t('non-sales item 45 (selling)', (d) => { d.items[0].item_code = '45'; });
  await t('order_no 100 chars', (d) => { d.order_no = 'N'.repeat(100); });
  await t('order_no 101 chars', (d) => { d.order_no = 'N'.repeat(101); });
  await t('order_no 141 chars', (d) => { d.order_no = 'N'.repeat(141); });
  await t('order_date without order_no', (d) => { delete d.order_no; d.order_date = '2026-11-10'; });
  await t('order_date after from_date', (d) => { d.order_date = '2027-01-01'; });
  await t('terms 2 chars', (d) => { d.terms = 'ab'; });
  await t('terms 501 chars', (d) => { d.terms = 'T'.repeat(501); });
  await t('terms 5000 chars', (d) => { d.terms = 'T'.repeat(5000); });
  await t('row terms 2 chars', (d) => { d.items[0].terms_and_conditions = 'ab'; });
  await t('row terms 501 chars', (d) => { d.items[0].terms_and_conditions = 'T'.repeat(501); });
  await t('tc_name not found', (d) => { d.tc_name = 'NOPE'; });
  await t('tc_name PW Terms', (d) => { d.tc_name = 'PW Terms'; });
  await t('company not matching customer?', (d) => { d.company = 'Azzrk - أزرق'; });
});
