import { test } from '@playwright/test';
import { ctx } from './helpers/qt-api';
import { openDoc, tab, main, wait } from './helpers/si-ui';
import * as fs from 'fs';
test.describe.configure({ timeout: 300_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
test('POS data vs screen', async ({ page }) => {
  const c = await ctx(); const out: string[] = [];
  const r = await c.get('/api/resource/Sales Invoice/ACC-SINV-2026-02355'); const d: any = (await r.json()).data || {};
  out.push('API keys with pos: ' + JSON.stringify(Object.fromEntries(Object.entries(d).filter(([k]) => /pos|consolidated/i.test(k)))));
  out.push('API payments: ' + JSON.stringify((d.payments || []).map((p: any) => [p.mode_of_payment, p.amount, p.account])));
  out.push('API paid_amount/grand_total/outstanding: ' + [d.paid_amount, d.grand_total, d.outstanding_amount, d.update_stock].join(' / '));
  await openDoc(page, 'ACC-SINV-2026-02355');
  for (const t of ['التفاصيل', 'المعلومات العامة', 'معلومات إضافية'] as const) {
    await (await import('./helpers/si-ui')).tab(page, t);
    const txt = (await main(page).innerText()).replace(/\s+/g, ' ');
    out.push(`[${t}] has "تم إنشاؤها باستخدام"=${/باستخدام نقطة|مُنشأة/.test(txt)} | has "إدخال إغلاق"=${/إدخال إغلاق|قيد إغلاق|إغلاق نقطة/.test(txt)} | payments tbl: ` + (await main(page).locator('table').evaluateAll((ts: any[]) => ts.filter((x) => x.offsetParent && /طريقة الدفع/.test(x.innerText)).map((x) => x.querySelectorAll('tbody tr').length + ' rows'))).join(','));
  }
  fs.writeFileSync('Shamel/si8-pos-probe.out.txt', out.join('\n'));
});
