import { request, test } from '@playwright/test';
import { api } from './helpers/api';
/** Removes only the draft vouchers created by srs-landed-cost-add-api.spec.ts with invalid data (checked before deleting). */
test('cleanup invalid test vouchers', async () => {
  const ctx = await request.newContext({ baseURL: process.env.BASE_URL });
  await ctx.post('/api/method/login', { form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! } });
  for (const n of ['00004', '00005', '00006', '00007', '00008', '00009']) {
    const name = `MAT-LCV-2026-${n}`;
    const d = await api.get('Landed Cost Voucher', name);
    const mine = d.docstatus === 0 && d.purchase_receipts.every((p: any) => p.receipt_document === 'MAT-PRE-2026-00024');
    console.log(name, 'docstatus', d.docstatus, 'amount', d.taxes?.[0]?.amount, 'desc', String(d.taxes?.[0]?.description).slice(0, 12), 'receipts', d.purchase_receipts.length, 'mine', mine);
    if (mine) { const r = await ctx.delete(`/api/resource/Landed Cost Voucher/${encodeURIComponent(name)}`); console.log('  DELETE', r.status()); }
  }
  for (const n of ['00003', '00010']) { const d = await api.get('Landed Cost Voucher', `MAT-LCV-2026-${n}`); console.log('KEPT', d.name, d.docstatus, d.distribute_charges_based_on, d.total_taxes_and_charges, d.items?.[0]?.applicable_charges); }
});
