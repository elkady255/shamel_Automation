import { test } from '@playwright/test';
import * as fs from 'fs';
import { api } from './helpers/api';
const OUT = 'C:/Playwright_Automation/Shamel/si2-q4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const txt = fs.readFileSync('C:/Playwright_Automation/Shamel/si2-probe11.out.txt', 'utf8');
test('q4', async () => {
  fs.writeFileSync(OUT, '');
  for (const [dt, re] of [['Sales Order', /SAL-ORD-2026-\d+/g], ['Delivery Note', /MAT-DN-2026-\d+/g]] as const) {
    const names = [...new Set(txt.match(re) || [])];
    const rows = await api.list(dt, [['customer', '=', 'CU-2026-00002']], ['name', 'status', 'docstatus'], 2000);
    const m = new Map(rows.map((r: any) => [r.name, `ds${r.docstatus}/${r.status}`]));
    const by: any = {}; names.forEach((n) => { const k = m.get(n) ?? 'unknown'; by[k] = (by[k] || 0) + 1; });
    log(dt + ' popup names (from probe text) ' + names.length + ' ' + JSON.stringify(by));
  }
});
