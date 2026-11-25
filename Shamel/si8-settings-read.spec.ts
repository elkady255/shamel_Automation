import { test, request } from '@playwright/test';
import * as fs from 'fs';
test('read settings', async () => {
  const ctx = await request.newContext({ baseURL: process.env.BASE_URL, storageState: 'playwright/.auth/user.json' });
  const out: string[] = [];
  for (const dt of ['Selling Settings', 'Accounts Settings', 'Stock Settings']) {
    const r = await ctx.get(`/api/resource/${encodeURIComponent(dt)}/${encodeURIComponent(dt)}`);
    const j: any = await r.json().catch(() => ({}));
    const d = j.data || {};
    const keys = Object.keys(d).filter((k) => /advance|update_stock|shortage|loyalty|allow|validate|exchange|rounded|round|so_required|dn_required|stock_to|over|credit|delete|auto|zero|negative|serial/i.test(k));
    out.push('== ' + dt + ' (' + r.status() + ')');
    for (const k of keys) out.push(k + ' = ' + JSON.stringify(d[k]));
  }
  fs.writeFileSync('Shamel/si8-settings-read.out.txt', out.join('\n'));
});
