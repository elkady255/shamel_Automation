import { test } from '@playwright/test';
import * as fs from 'fs';
import { ctx, post, method } from './helpers/qt-api';
test('q4', async () => {
  const c = await ctx(); const out: string[] = [];
  const g = async (dt: string, f: any, fields: string[], lim = 5) => { const r = await c.get('/api/resource/' + dt, { params: { filters: JSON.stringify(f), fields: JSON.stringify(fields), limit_page_length: String(lim) } }); const j = await r.json(); return JSON.stringify(j.data ?? j.exception ?? j).slice(0, 500); };
  out.push('COMMENTS 03114 ' + await g('Comment', [['reference_doctype', '=', 'Sales Order'], ['reference_name', '=', 'SAL-ORD-2026-03114']], ['comment_type', 'content', 'creation'], 10));
  out.push('VERSION 03114 ' + await g('Version', [['ref_doctype', '=', 'Sales Order'], ['docname', '=', 'SAL-ORD-2026-03114']], ['name'], 10));
  out.push('OPEN QT ' + await g('Quotation', [['status', '=', 'Open']], ['name', 'party_name', 'valid_till', 'docstatus'], 6));
  out.push('QT status counts ' + await g('Quotation', [['docstatus', '=', 1]], ['status', 'count(name) as n'], 20).catch(String));
  fs.writeFileSync('C:/Playwright_Automation/Shamel/so3-q4.out.txt', out.join('\n'));
});
