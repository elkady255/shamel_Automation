import { test } from '@playwright/test';
import { openDoc, main, press, wait, recorder, messages, submittedInvoice, cancelInvoice } from './helpers/si-ui';
import { ctx } from './helpers/qt-api';
test.describe.configure({ timeout: 600_000 });
test.use({ viewport: { width: 1500, height: 2200 }, actionTimeout: 15_000 });
const rec = recorder('k2-probe');
test('K2 delete a cancelled invoice with no amended document', async ({ page }) => {
  const n = await submittedInvoice(page, '650'); await cancelInvoice(page, n); await openDoc(page, n);
  await press(main(page).locator('button[data-action="delete"]').first());
  await page.locator('.shamel-confirm-overlay.is-visible').first().waitFor({ timeout: 10000 }).catch(() => {});
  await press(page.locator('.shamel-confirm-actions .shamel-btn-destructive').first());
  for (const t of [2000, 4000, 8000]) { await wait(page, t === 2000 ? 2000 : t - (t === 4000 ? 2000 : 4000)); rec.note('K2-' + t, 'msgs at ' + t + 'ms', JSON.stringify(await messages(page)) + ' url=' + page.url()); }
  await page.screenshot({ path: 'Shamel/si8-k2-delete-cancelled.png' });
  const c = await ctx(); const r = await c.get(`/api/resource/Sales Invoice/${n}`); rec.note('K2-api', n + ' status after delete attempt', String(r.status()));
});
