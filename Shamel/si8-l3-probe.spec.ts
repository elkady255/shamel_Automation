import { test } from '@playwright/test';
import { openDoc, tab, main, press, wait, recorder, snapshot, summary, messages } from './helpers/si-ui';
test.describe.configure({ timeout: 600_000 });
test.use({ viewport: { width: 1500, height: 2400 }, actionTimeout: 15_000 });
const rec = recorder('l3-probe');
test('L3 refund on the return doc and the unreconcile popup', async ({ page }) => {
  await openDoc(page, 'ACC-SINV-2026-02901'); await tab(page, 'معلومات إضافية'); const r = await snapshot(page);
  rec.note('L3-1', 'return doc 02901 status block', JSON.stringify(Object.entries(r).filter(([k]) => /حالة|مبلغ|الدائن/.test(k))));
  await openDoc(page, 'ACC-SINV-2026-02902');
  await press(main(page).getByRole('button', { name: /إجراءات/ }).first()); await wait(page, 1000);
  await press(page.locator('.cd-action-menu.open *').filter({ hasText: /^\s*إلغاء التسوية\s*$/ }).first()); await wait(page, 4000);
  await page.screenshot({ path: 'Shamel/si8-l3-unreconcile.png' });
  rec.note('L3-2', 'overlays', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[class*=overlay],[class*=modal],[role=dialog],[class*=popup]')].filter((e: any) => e.offsetParent || getComputedStyle(e).position === 'fixed').map((e: any) => e.className + ' :: ' + (e.innerText || '').replace(/\s+/g, ' ').slice(0, 400)))));
});
