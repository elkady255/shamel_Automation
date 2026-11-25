// Probe: why the USD invoice is rejected (prints the full server messages).
import { test, request } from '@playwright/test';
import * as d from './helpers/prec-data';

test('usd invoice error', async () => {
  test.setTimeout(120_000);
  const ctx = await request.newContext({ baseURL: process.env.BASE_URL, timeout: 90_000 });
  await ctx.post('/api/method/login', { form: { usr: process.env.APP_USERNAME!, pwd: process.env.APP_PASSWORD! } });
  const res = await ctx.post('/api/resource/Sales%20Invoice', {
    data: {
      company: d.CO, customer: 'QA-PR Cust USD', set_posting_time: 1, posting_date: d.daysAgo(8), due_date: d.daysAgo(1),
      update_stock: 0, currency: 'USD', conversion_rate: 3.7, debit_to: d.USD_REC, selling_price_list: 'Standard Selling',
      items: [{ item_code: d.ITEM, qty: 1, rate: 100, cost_center: d.CC }], taxes: [],
    },
  });
  const j = await res.json();
  console.log('STATUS', res.status(), 'NAME', j.data?.name ?? '');
  console.log('MSG', j._server_messages);
  console.log('TB', String(j.exc ?? '').slice(-1200));
});
