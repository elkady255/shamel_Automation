// Probe: what the Reference Number box keeps, and the Quick Entry account selects (nothing saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });
test('reference and quick entry', async ({ page }) => {
  test.setTimeout(200_000);
  const w = (ms: number) => page.waitForTimeout(ms);
  await u.open(page, '/desk/shamel#/accounting/journal-entries/new');
  const ref = u.input(page, 'الرقم المرجعي');
  console.log('ATTR', await ref.evaluate((e: any) => e.outerHTML)); // eslint-disable-line @typescript-eslint/no-explicit-any
  for (const v of ['ABC', 'CHQ-123', '12-34/5', 'مرجع 7']) { await ref.click(); await ref.press('Control+a'); await ref.press('Delete'); await ref.pressSequentially(v, { delay: 80 }); await ref.press('Tab'); await w(700); console.log('TYPED', JSON.stringify(v), 'KEPT', JSON.stringify(await ref.inputValue())); }
  await ref.fill('PASTE-A1'); await ref.press('Tab'); await w(700); console.log('FILL PASTE-A1 KEPT', JSON.stringify(await ref.inputValue()));
  await page.screenshot({ path: 'Shamel/je-results/p4-ref.png' });
  await u.main(page).getByRole('button', { name: 'إدخال سريع' }).click(); await w(2500);
  await page.getByText('ابحث واختر', { exact: true }).filter({ visible: true }).last().waitFor({ timeout: 3000 }).catch(() => {});
  const m = page.locator('.qr-dialog:visible, .base-modal:visible, [role=dialog]:visible').last();
  const html = await m.locator('label').filter({ hasText: 'الحساب المدين' }).first().evaluate((e: any) => e.parentElement.outerHTML); // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log('POPUP', html.replace(/ data-v-\w+(="")?/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '').slice(0, 2500));
});
