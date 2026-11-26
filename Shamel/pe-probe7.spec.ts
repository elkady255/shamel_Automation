// Probe: headers and Edit Row pop-ups of the three tables (nothing saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';

test.use({ viewport: { width: 1400, height: 1800 } });

test('popups', async ({ page }) => {
  test.setTimeout(200_000);
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await u.open(page, u.LIST + '/' + d.data().probeDraft);
  for (const i of [0, 1, 2]) {
    await u.main(page).locator('button:visible').filter({ hasText: /^\s*إضافة صف\s*$/ }).nth(i).click({ timeout: 8000 }).catch((e) => console.log('add', i, e.message.slice(0, 120)));
    await wait(4000);
    const err = page.locator('.modal.show');
    if (await err.count()) { console.log('POPUP after add', i, (await err.first().innerText()).replace(/\n+/g, ' | ').slice(0, 400)); await page.locator('.modal.show .btn-modal-close').first().click({ timeout: 5000 }).catch(() => {}); await wait(1500); }
  }
  console.log('TABLES', JSON.stringify(await u.tablesInfo(page)));
  await page.screenshot({ path: 'Shamel/pe-results/p7-rows.png', fullPage: true });
  const n = await u.main(page).locator('button[title="تعديل الصف"]').count();
  for (let i = 0; i < n; i++) {
    await u.main(page).locator('button[title="تعديل الصف"]').nth(i).click({ timeout: 8000 }).catch((e) => console.log('edit', i, e.message.slice(0, 120)));
    await wait(3000);
    const m = page.locator('.base-modal:visible').last();
    if (await m.count()) {
      console.log('EDIT', i, (await m.innerText()).replace(/\n+/g, ' | ').slice(0, 1500));
      await page.screenshot({ path: `Shamel/pe-results/p7-edit${i}.png` });
      await m.locator('button').filter({ hasText: /^\s*إلغاء\s*$/ }).last().click({ timeout: 6000 }).catch((e) => console.log('close', i, e.message.slice(0, 100)));
      await wait(1500);
    }
  }
});
