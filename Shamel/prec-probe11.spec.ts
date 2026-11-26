// What happens when an invalid column width is saved (then reset to default).
import { test } from '@playwright/test';
import * as u from './helpers/prec-ui';
import { recorder } from './helpers/si-ui';
const rec = recorder('prec-c-tables');
test.use({ viewport: { width: 1400, height: 1400 } });

test('save invalid column widths', async ({ page }) => {
  test.setTimeout(250_000);
  const dlg = () => page.locator('.base-modal:visible').last();
  const openS = async () => { await u.press(u.tables(page).nth(0).locator('button[title="إعدادات الجدول"]')); await u.wait(page, 2000); };
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main'); await u.getEntries(page);
  for (const [id, v] of [['C09-3-1', 'abc'], ['C09-3-2', '12345']] as const) {
    await openS(); const w = dlg().locator('input:visible').first();
    await w.click(); await w.press('Control+a'); await w.pressSequentially(v); await w.press('Tab'); const typed = await w.inputValue();
    await u.press(dlg().getByRole('button', { name: /^(حفظ|تحديث)$/ })); await u.wait(page, 3000);
    const msg = await u.modalText(page); const stillOpen = await dlg().count();
    await page.screenshot({ path: `Shamel/prec-results/${id}.png` });
    await u.closeModals(page);
    let after = ''; if (await u.tables(page).count()) { await openS(); after = await dlg().locator('input:visible').first().inputValue(); await u.closeModals(page); }
    rec.check(id, `Saving column width "${v}" is refused or corrected to a valid 1-3 digit number`, /^\d{1,3}$/.test(after), `typed="${typed}" afterSave="${after}" popupStillOpen=${stillOpen} msg=${msg.slice(0, 200)}`);
    console.log(id, typed, '|', after, '|', msg.slice(0, 200));
    await openS(); await u.press(dlg().getByRole('button', { name: /إعادة تعيين/ })); await u.wait(page, 2500);
    if (await dlg().count()) { const s = dlg().getByRole('button', { name: /^(حفظ|تحديث)$/ }); if (await s.count()) { await u.press(s); await u.wait(page, 2500); } }
    await u.closeModals(page);
  }
});
