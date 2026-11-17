import { test, request } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 300_000 });
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe6.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const DT = 'Pricing Rule';
const CO = 'Ahmed Ebrahim CO.';
let seq = Date.now() % 100000;
const short = (t: string) => t.replace(/\s+/g, ' ').slice(0, 260);

async function ctx() {
  const c = await request.newContext({ baseURL: process.env.BASE_URL, timeout: 90_000 });
  const r = await c.post('/api/method/login', { form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! } });
  if (!r.ok()) throw new Error('login ' + r.status());
  return c;
}
async function ins(c: any, label: string, data: any) {
  const r = await c.post(`/api/resource/${encodeURIComponent(DT)}`, { data });
  const t = await r.text();
  let msg = short(t);
  try {
    const j = JSON.parse(t);
    if (j.data) msg = 'SAVED name=' + j.data.name;
    else if (j._server_messages) msg = short(JSON.parse(j._server_messages).map((m: string) => JSON.parse(m).message).join(' | '));
    else if (j.exception) msg = short(j.exception);
  } catch {}
  log(`${label} -> ${r.status()} ${msg}`);
}

test('server rules', async () => {
  fs.writeFileSync(OUT, '');
  const c = await ctx();
  const items = (await (await c.get(`/api/resource/Item?fields=${encodeURIComponent('["name","stock_uom"]')}&filters=${encodeURIComponent('[["disabled","=",0],["is_stock_item","=",1]]')}&limit_page_length=3`)).json()).data;
  log('ITEMS ' + JSON.stringify(items));
  const it = items[0];
  const cur = (await (await c.get(`/api/resource/Company/${encodeURIComponent(CO)}`)).json()).data.default_currency;
  log('CURRENCY ' + cur);
  // all junk is created DISABLED so it never applies to real transactions
  const base = (o: any = {}) => ({ title: `PW PR ${++seq}`, apply_on: 'Item Code', price_or_product_discount: 'Price', items: [{ item_code: it.name, uom: it.stock_uom }], selling: 1, rate_or_discount: 'Discount Percentage', discount_percentage: 10, company: CO, currency: cur, disable: 1, ...o });
  await ins(c, 'P00 valid baseline', base());
  await ins(c, 'P01 no title', base({ title: undefined }));
  await ins(c, 'P02 title 1 char', base({ title: 'a' }));
  await ins(c, 'P03 title 101 chars', base({ title: 'T'.repeat(101) }));
  await ins(c, 'P04 no price_or_product', base({ price_or_product_discount: undefined }));
  await ins(c, 'P05 no company', base({ company: undefined }));
  await ins(c, 'P06 no currency', base({ currency: undefined }));
  await ins(c, 'P07 Item Code with no rows', base({ items: [] }));
  await ins(c, 'P08 row without item', base({ items: [{ uom: it.stock_uom }] }));
  await ins(c, 'P09 row without UOM', base({ items: [{ item_code: it.name }] }));
  await ins(c, 'P10 row with a UOM the item does not have', base({ items: [{ item_code: it.name, uom: 'Kg' === it.stock_uom ? 'Box' : 'Kg' }] }));
  await ins(c, 'P11 min qty > max qty', base({ min_qty: 10, max_qty: 5 }));
  await ins(c, 'P12 negative min qty', base({ min_qty: -5 }));
  await ins(c, 'P13 min amt > max amt', base({ min_amt: 100, max_amt: 10 }));
  await ins(c, 'P14 valid_upto before valid_from', base({ valid_from: '2026-12-31', valid_upto: '2026-01-01' }));
  await ins(c, 'P15 discount 150%', base({ discount_percentage: 150 }));
  await ins(c, 'P16 discount -10%', base({ discount_percentage: -10 }));
  await ins(c, 'P17 discount 0% (no benefit)', base({ discount_percentage: 0 }));
  await ins(c, 'P18 Rate with rate 0', base({ rate_or_discount: 'Rate', rate: 0, discount_percentage: 0 }));
  await ins(c, 'P19 margin percentage rate 1 digit', base({ margin_type: 'Percentage', margin_rate_or_amount: 5 }));
  await ins(c, 'P20 recursive without recurse_for', base({ price_or_product_discount: 'Product', is_recursive: 1, same_item: 1, free_qty: 1, rate_or_discount: undefined, discount_percentage: undefined }));
  await ins(c, 'P21 Product, no free item, not same item', base({ price_or_product_discount: 'Product', rate_or_discount: undefined, discount_percentage: undefined, free_qty: 1 }));
  await ins(c, 'P22 has_priority without priority', base({ has_priority: 1 }));
  await ins(c, 'P23 priority without has_priority', base({ priority: '5' }));
  await ins(c, 'P24 validate applied rule, description 2 chars', base({ validate_applied_rule: 1, rule_description: 'ab' }));
  await ins(c, 'P25 validate applied rule, description 501 chars', base({ validate_applied_rule: 1, rule_description: 'D'.repeat(501) }));
  await ins(c, 'P26 threshold 150', base({ threshold_percentage: 150 }));
  await ins(c, 'P27 neither selling nor buying', base({ selling: 0, buying: 0 }));
  await ins(c, 'P28 applicable_for Customer without customer', base({ applicable_for: 'Customer' }));
  await ins(c, 'P29 selling only, applicable_for Supplier', base({ applicable_for: 'Supplier', supplier: 'x' }));
  await ins(c, 'P30 Transaction with items rows', base({ apply_on: 'Transaction', warehouse: undefined }));
  await ins(c, 'P31 invalid warehouse', base({ warehouse: 'no such warehouse xyz' }));
  const dup = { item_code: it.name, uom: it.stock_uom };
  await ins(c, 'P32 duplicate criteria #1', base({ title: 'PW PR DUP A ' + seq, items: [dup], min_qty: 3, discount_percentage: 7 }));
  await ins(c, 'P33 duplicate criteria #2 (same criteria)', base({ title: 'PW PR DUP B ' + seq, items: [dup], min_qty: 3, discount_percentage: 7 }));
  await ins(c, 'P34 same item twice in rows', base({ items: [dup, dup] }));
  await ins(c, 'P35 mixed conditions on Item Code', base({ mixed_conditions: 1, items: [dup, { item_code: items[1]?.name || it.name, uom: items[1]?.stock_uom || it.stock_uom }] }));
});
