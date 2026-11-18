import { test } from '@playwright/test';
import * as fs from 'fs';
import { get } from './helpers/qt-api';
const OUT = 'C:/Playwright_Automation/Shamel/si2-q3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
test('q3', async () => {
  fs.writeFileSync(OUT, '');
  const a = await get('Sales Invoice', 'ACC-SINV-2026-02789'); const r = await get('Sales Invoice', 'ACC-SINV-2026-02790');
  log('ORIG ' + JSON.stringify({ ds: a.docstatus, st: a.status, wh: a.items[0].warehouse, cc: a.items[0].cost_center, due: a.due_date, ia: a.items[0].income_account, ea: a.items[0].expense_account, own: a.owner, upd: a.update_stock, itype: a.invoice_type, debit_to: a.debit_to }));
  log('RETURN ' + JSON.stringify({ ds: r.docstatus, st: r.status, is_return: r.is_return, against: r.return_against, wh: r.items[0].warehouse, qty: r.items[0].qty, rate: r.items[0].rate, upos: r.update_outstanding_for_self, itype: r.invoice_type, due: r.due_date, cc: r.items[0].cost_center, rr: r.custom_return_reason }));
  const dn = await get('Delivery Note', 'MAT-DN-2026-00660'); log('DN ' + JSON.stringify({ ds: dn.docstatus, st: dn.status, wh: dn.items?.[0]?.warehouse, cust: dn.customer }));
});
