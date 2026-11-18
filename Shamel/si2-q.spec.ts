import { test } from '@playwright/test';
import * as fs from 'fs';
import { get, method } from './helpers/qt-api';
import { api } from './helpers/api';
const OUT = 'C:/Playwright_Automation/Shamel/si2-q.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('q', async () => {
  fs.writeFileSync(OUT, '');
  const d = await get('Sales Invoice', 'ACC-SINV-2026-02761'); log('09 posting ' + d.posting_date + ' due ' + d.due_date);
  const d2 = await get('Sales Invoice', 'ACC-SINV-2026-02767'); log('19 item row ' + JSON.stringify({ rate: d2.items[0].rate, plr: d2.items[0].price_list_rate, dp: d2.items[0].discount_percentage, amt: d2.items[0].amount }));
  const d3 = await get('Sales Invoice', 'ACC-SINV-2026-02766'); log('18 item row ' + JSON.stringify({ rate: d3.items[0].rate, plr: d3.items[0].price_list_rate, dp: d3.items[0].discount_percentage, amt: d3.items[0].amount }));
  const d4 = await get('Sales Invoice', 'ACC-SINV-2026-02768'); log('20 ' + JSON.stringify({ cr: d4.conversion_rate, plc: d4.plc_conversion_rate }));
  const t = await api.list('Sales Taxes and Charges Template', [['disabled', '=', 0]], ['name', 'company', 'is_default'], 30); log('TEMPLATES ' + JSON.stringify(t));
  for (const x of t.slice(0, 6)) { const tt = await api.get('Sales Taxes and Charges Template', x.name); log('TPL ' + x.name + ' ' + JSON.stringify(tt.taxes.map((r: any) => [r.charge_type, r.account_head, r.rate, r.included_in_print_rate, r.description]))); }
  const ss = await api.get('Selling Settings', 'Selling Settings'); log('SELLING ' + JSON.stringify(Object.fromEntries(Object.entries(ss).filter(([k]) => /allow|so_required|dn_required|validate|over|zero|auto|advance|calc|cust/.test(k)))));
  const as = await api.get('Accounts Settings', 'Accounts Settings'); log('ACCOUNTS ' + JSON.stringify(Object.fromEntries(Object.entries(as).filter(([k]) => /exchange|rounding|credit|over|frozen|unlink|allow|determine|book|delete|stale|rate/.test(k)))));
  const co = await api.get('Company', 'Ahmed Ebrahim CO.'); log('COMPANY ' + JSON.stringify({ cur: co.default_currency, rec: co.default_receivable_account, round: co.round_off_account, cc: co.cost_center, wo: co.write_off_account, lo: co.default_income_account }));
  const lp = await api.list('Loyalty Program', [], ['name', 'company', 'to_date', 'collection_rules'], 10); log('LOYALTY ' + JSON.stringify(lp));
  const pt = await api.list('Payment Terms Template', [], ['name'], 10); log('PTT ' + JSON.stringify(pt));
  const pos = await api.list('POS Profile', [], ['name', 'company', 'disabled'], 5); log('POS ' + JSON.stringify(pos));
});
