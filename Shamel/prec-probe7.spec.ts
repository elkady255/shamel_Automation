// Probe: errors shown when Get is pressed on the empty screen.
import { test } from '@playwright/test';
import * as u from './helpers/prec-ui';
test.use({ viewport: { width: 1400, height: 800 } });
test('empty get', async ({ page }) => {
  await u.open(page);
  console.log('COMPANY before', JSON.stringify(await u.input(page, 'الشركة').inputValue()));
  await u.press(u.main(page).getByRole('button', { name: u.BTN_GET })); await u.wait(page, 3000);
  console.log('COMPANY after', JSON.stringify(await u.input(page, 'الشركة').inputValue()));
  await page.screenshot({ path: 'Shamel/prec-results/p7-empty-get.png' });
});
