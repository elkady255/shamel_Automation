import { test } from '@playwright/test';
import { openDoc, main, press, wait, recorder, messages } from './helpers/si-ui';
test.describe.configure({ timeout: 300_000 });
test.use({ viewport: { width: 1500, height: 2000 }, actionTimeout: 15_000 });
const rec = recorder('f2-probe');
test('F2 delete dialog and Create menu', async ({ page }) => {
  await openDoc(page, 'ACC-SINV-2026-02829');
  const del = main(page).locator('button[title="حذف"], button:has-text("حذف")').first();
  rec.note('F2-1', 'delete button', await del.evaluate((e: any) => e.outerHTML.slice(0, 200)));
  await press(del); await wait(page, 2500);
  await page.screenshot({ path: 'Shamel/si8-f2-delete.png' });
  rec.note('F2-2', 'visible dialogs', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.modal,[role=dialog],.base-modal,[class*=confirm],[class*=popup]')].filter((e: any) => e.offsetParent || getComputedStyle(e).position === 'fixed').map((e: any) => (e.className + ' :: ' + (e.innerText || '').replace(/\s+/g, ' ').slice(0, 250))))));
  rec.note('F2-3', 'messages', JSON.stringify(await messages(page)));
  await page.keyboard.press('Escape'); await wait(page, 800);
  rec.note('F2-4', 'url after Escape', page.url());
  // Create menu on the submitted invoice
  await openDoc(page, 'ACC-SINV-2026-02830');
  await press(main(page).getByRole('button', { name: 'إنشاء', exact: true }).first()); await wait(page, 1500);
  rec.note('F2-5', 'visible menus', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.cd-action-menu,[role=menu],ul[class*=menu],div[class*=dropdown]')].filter((e: any) => e.offsetParent && getComputedStyle(e).display !== 'none' && (e.innerText || '').trim()).map((e: any) => (e.className + ' :: ' + (e.innerText || '').replace(/\n+/g, ' | ').slice(0, 300))))));
  await page.screenshot({ path: 'Shamel/si8-f2-create.png' });
});
