import { test } from '@playwright/test';
import * as fs from 'fs';
import { ctx } from './helpers/qt-api';
test('q', async () => {
  const c = await ctx();
  const q = async (f: any, fields: string[], lim = 3) => { const r = await c.get('/api/resource/Sales Order', { params: { filters: JSON.stringify(f), fields: JSON.stringify(fields), limit_page_length: String(lim), order_by: 'modified desc' } }); return JSON.stringify((await r.json()).data); };
  const out: string[] = [];
  for (const [k, f] of Object.entries({ draft: [['docstatus', '=', 0]], cancelled: [['docstatus', '=', 2]], hold: [['status', '=', 'On Hold']], closed: [['status', '=', 'Closed']], toDeliver: [['status', '=', 'To Deliver and Bill']], toDeliverNoSkip: [['docstatus', '=', 1], ['skip_delivery_note', '=', 0], ['per_delivered', '=', 0]], partlyDel: [['delivery_status', '=', 'Partly Delivered']], fullyDel: [['delivery_status', '=', 'Fully Delivered']], amended: [['amended_from', 'is', 'set']], partlyBilled: [['billing_status', '=', 'Partly Billed']] } as any)) out.push(k + ' ' + await q(f, ['name', 'status', 'docstatus', 'customer', 'skip_delivery_note', 'delivery_status', 'billing_status', 'per_delivered', 'per_billed']));
  const r = await c.get('/api/resource/Sales Order/SAL-ORD-2026-03111'); out.push('DOC03111 ' + JSON.stringify(Object.keys((await r.json()).data).length));
  const sets = await c.get('/api/resource/Selling Settings/Selling Settings'); const s = (await sets.json()).data; out.push('SETTINGS ' + JSON.stringify(Object.fromEntries(Object.entries(s).filter(([k, v]) => /^(so_|dn_|allow|blanket|sales_order|maintain|action|dont|editable|validate|custom|is_|enable|role|over|deliver|set_)/.test(k) || k.includes('shortage')))));
  fs.writeFileSync('C:/Playwright_Automation/Shamel/so3-q.out.txt', out.join('\n'));
});
