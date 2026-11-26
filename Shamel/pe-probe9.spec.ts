// Probe: More Info and Connections tabs, bulk Edit pop-up, list search (nothing changed).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';

test.use({ viewport: { width: 1500, height: 1400 } });

test('tabs and bulk popup', async ({ page }) => {
  test.setTimeout(200_000);
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const text = async () => (await u.main(page).innerText()).replace(/\n+/g, ' | ');
  for (const name of [d.data().probeDraft, d.data().B01]) {
    await u.open(page, u.LIST + '/' + name);
    for (const tab of ['المعلومات الاضافية', 'السجلات المرتبطة']) {
      await u.main(page).getByText(tab, { exact: true }).first().click({ timeout: 8000 }).catch((e) => console.log(tab, e.message.slice(0, 120)));
      await wait(3500);
      console.log('TAB', name, tab, (await text()).slice(0, 900));
      console.log('FIELDS', JSON.stringify(await u.fields(page)));
      console.log('INPUTS', JSON.stringify(await u.main(page).locator('input:visible, textarea:visible').evaluateAll((is: any[]) => is.map((i) => `${i.tagName}:${i.type}:${i.disabled || i.readOnly ? 'ro' : 'rw'}`)))); // eslint-disable-line @typescript-eslint/no-explicit-any
      await page.screenshot({ path: `Shamel/pe-results/p9-${name}-${tab === 'السجلات المرتبطة' ? 'conn' : 'info'}.png`, fullPage: true });
    }
  }
  await u.open(page, u.LIST);
  await u.main(page).locator('input[placeholder="البحث باستخدام الID"]').fill(d.data().B01); await page.keyboard.press('Enter'); await wait(5000);
  console.log('SEARCH', (await u.main(page).locator('tbody tr').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ')).slice(0, 4).join(' // '));
  await u.main(page).locator(`input.check_item[data-id="${d.data().B01}"]`).click({ timeout: 8000 }); await wait(2000);
  const act = page.locator('button:visible').filter({ hasText: /^\s*تعديل\s*$/ }).first();
  await act.click({ timeout: 8000 }).catch((e) => console.log('edit', e.message.slice(0, 120))); await wait(2500);
  const m = page.locator('.base-modal:visible, .modal.show, [role=dialog]:visible').last();
  if (await m.count()) {
    console.log('POPUP', (await m.innerText()).replace(/\n+/g, ' | '), (await m.innerHTML()).slice(0, 1500));
    await page.screenshot({ path: 'Shamel/pe-results/p9-bulk.png' });
    await m.locator('input:visible').first().click({ timeout: 5000 }).catch(() => {}); await wait(2000);
    console.log('OPTIONS', JSON.stringify((await page.locator('.cs-option:visible, [role=option]:visible').allInnerTexts()).slice(0, 60)));
  } else console.log('NOPOPUP');
});
