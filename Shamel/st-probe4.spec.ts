import { test } from '@playwright/test';
import * as fs from 'fs';
import { request } from '@playwright/test';

test.describe.configure({ timeout: 300_000 });
const OUT = 'C:/Playwright_Automation/Shamel/st-probe4b.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const DT = 'Sales Taxes and Charges Template';
const CO = 'Ahmed Ebrahim CO.';
let seq = Date.now() % 100000;

async function ctx() {
  const c = await request.newContext({ baseURL: process.env.BASE_URL, timeout: 90_000 });
  const r = await c.post('/api/method/login', { form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! } });
  if (!r.ok()) throw new Error('login ' + r.status());
  return c;
}
const short = (t: string) => t.replace(/\s+/g, ' ').slice(0, 300);
async function ins(c: any, label: string, data: any) {
  const r = await c.post(`/api/resource/${encodeURIComponent(DT)}`, { data });
  const t = await r.text();
  let msg = short(t);
  try { const j = JSON.parse(t); if (j.data) msg = 'SAVED name=' + j.data.name; else if (j._server_messages) msg = short(JSON.parse(j._server_messages).map((m: string) => JSON.parse(m).message).join(' | ')); else if (j.exception) msg = short(j.exception); } catch {}
  log(`${label} -> ${r.status()} ${msg}`);
  return r;
}
const tax = (o: any = {}) => ({ charge_type: 'On Net Total', account_head: '5317 - ديون معدومة - E', description: 'PW ST row', rate: 15, ...o });
const base = (o: any = {}) => ({ title: `PW ST ${++seq}`, company: CO, taxes: [tax()], ...o });

test('server rules', async () => {
  fs.writeFileSync(OUT, '');
  const c = await ctx();
  // accounts: a Profit and Loss and a Balance Sheet one
  const acc = async (rt: string) => {
    const r = await c.get(`/api/resource/Account?fields=${encodeURIComponent('["name","report_type","root_type","is_group"]')}&filters=${encodeURIComponent(JSON.stringify([['company', '=', CO], ['is_group', '=', 0], ['report_type', '=', rt]]))}&limit_page_length=2`);
    return (await r.json()).data;
  };
  const bs = await acc('Balance Sheet');
  log('BS ACCOUNTS ' + JSON.stringify(bs));
  const pl = await acc('Profit and Loss');
  log('PL ACCOUNTS ' + JSON.stringify(pl));

  await ins(c, 'S01 no title', { company: CO, taxes: [tax()] });
  await ins(c, 'S02 title 1 char', base({ title: 'a' }));
  await ins(c, 'S03 title 101 chars', base({ title: 'T'.repeat(101) }));
  await ins(c, 'S04 title 100 chars', base({ title: 'U'.repeat(100) }));
  await ins(c, 'S05 no company', { title: `PW ST ${++seq}`, taxes: [tax()] });
  await ins(c, 'S06 no rows', { title: `PW ST ${++seq}`, company: CO });
  const dup = `PW ST DUP ${seq}`;
  await ins(c, 'S07 dup title #1', base({ title: dup }));
  await ins(c, 'S08 dup title #2', base({ title: dup }));
  if (bs[0]) await ins(c, 'S09 balance sheet account head', base({ taxes: [tax({ account_head: bs[0].name })] }));
  await ins(c, 'S10 no charge type', base({ taxes: [{ account_head: '5317 - ديون معدومة - E', description: 'x', rate: 5 }] }));
  await ins(c, 'S11 no account head', base({ taxes: [{ charge_type: 'On Net Total', description: 'x', rate: 5 }] }));
  await ins(c, 'S12 no description', base({ taxes: [{ charge_type: 'On Net Total', account_head: '5317 - ديون معدومة - E', rate: 5 }] }));
  await ins(c, 'S13 rate 150', base({ taxes: [tax({ rate: 150 })] }));
  await ins(c, 'S14 rate negative', base({ taxes: [tax({ rate: -5 })] }));
  await ins(c, 'S15 prev row amount on row 1', base({ taxes: [tax({ charge_type: 'On Previous Row Amount' })] }));
  await ins(c, 'S16 prev row total row_id 5 invalid', base({ taxes: [tax(), tax({ charge_type: 'On Previous Row Total', row_id: '5' })] }));
  await ins(c, 'S17 actual with tax_amount', base({ taxes: [tax({ charge_type: 'Actual', rate: 0, tax_amount: 50 })] }));
  await ins(c, 'S18 description 1 char', base({ taxes: [tax({ description: 'a' })] }));
  await ins(c, 'S19 description 501 chars', base({ taxes: [tax({ description: 'D'.repeat(501) })] }));
  await ins(c, 'S20 same account twice', base({ taxes: [tax(), tax()] }));
  const d1 = `PW ST DEF ${++seq}`;
  await ins(c, 'S21 default #1', base({ title: d1, is_default: 1 }));
  await ins(c, 'S22 default #2 same company', base({ title: d1 + 'b', is_default: 1 }));
  await ins(c, 'S23 disabled and default', base({ is_default: 1, disabled: 1 }));
  await ins(c, 'S24 tax category invalid', base({ tax_category: 'does not exist xyz' }));
  const r = await c.get(`/api/resource/${encodeURIComponent(DT)}?fields=${encodeURIComponent('["name","title","company","is_default","disabled"]')}&filters=${encodeURIComponent('[["is_default","=",1]]')}&limit_page_length=50`);
  log('DEFAULTS NOW ' + short(await r.text()));
});
