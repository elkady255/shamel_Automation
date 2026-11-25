import { test, request } from '@playwright/test';
test('exists', async () => {
  const ctx = await request.newContext({ baseURL: process.env.BASE_URL, storageState: 'playwright/.auth/user.json' });
  for (const n of ['ACC-SINV-2026-02829', 'ACC-SINV-2026-02830', 'ACC-SINV-2026-02833', 'ACC-SINV-2026-02833-1']) {
    const r = await ctx.get(`/api/resource/Sales Invoice/${n}`); const j: any = await r.json().catch(() => ({}));
    console.log('EXISTS', n, r.status(), j.data?.docstatus, j.data?.status, j.data?.grand_total);
  }
});
