// Probe: list screen, bulk actions menu and the buttons of draft / submitted documents (read only).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';

test.use({ viewport: { width: 1500, height: 1300 } });

test('list and details', async ({ page }) => {
  test.setTimeout(200_000);
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const buttons = async () => (await u.main(page).locator('button:visible, a.btn:visible').evaluateAll((bs: any[]) => bs.map((b) => (b.innerText.trim() || `[${b.title || b.getAttribute('aria-label') || b.className}]`)))).join(' | '); // eslint-disable-line @typescript-eslint/no-explicit-any
  await u.open(page, u.LIST);
  console.log('HEAD', JSON.stringify(await u.main(page).locator('thead th:visible').allInnerTexts()));
  console.log('ROW', (await u.main(page).locator('tbody tr').first().innerText()).replace(/\s+/g, ' '));
  console.log('BUTTONS', await buttons());
  console.log('INPUTS', JSON.stringify(await u.main(page).locator('input:visible').evaluateAll((is: any[]) => is.map((i) => i.placeholder || i.type)))); // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log('FIRSTROWHTML', (await u.main(page).locator('tbody tr').first().innerHTML()).slice(0, 900));
  await u.main(page).locator('tbody tr').first().locator('input[type=checkbox], .sr-checkbox, td').first().click({ timeout: 6000 }).catch((e) => console.log('check', e.message.slice(0, 120)));
  await wait(2000);
  console.log('SELECTED-BUTTONS', page.url(), await buttons());
  await page.screenshot({ path: 'Shamel/pe-results/p8-list.png' });
  await u.main(page).locator('button:visible').filter({ hasText: /إجراء|الإجراءات|Actions/ }).first().click({ timeout: 6000 }).catch((e) => console.log('menu', e.message.slice(0, 120)));
  await wait(1500);
  console.log('MENU', JSON.stringify(await page.locator('[role=menu]:visible, .dropdown-menu:visible, [class*=menu]:visible [class*=item]:visible').allInnerTexts()));
  await page.screenshot({ path: 'Shamel/pe-results/p8-menu.png' });
  for (const name of [d.data().probeDraft, d.data().B01]) {
    const n = typeof name === 'string' ? name : (name as any).name; // eslint-disable-line @typescript-eslint/no-explicit-any
    await u.open(page, u.LIST + '/' + n);
    console.log('DOC', n, await buttons());
    console.log('FIELDS', JSON.stringify(await u.fields(page)));
    console.log('SECTIONS', JSON.stringify(await u.sections(page)));
    console.log('ENABLED', await u.main(page).locator('input:visible:not([disabled]):not([readonly]), textarea:visible:not([disabled]):not([readonly])').count());
    await page.screenshot({ path: `Shamel/pe-results/p8-${n}.png`, fullPage: true });
  }
  console.log('DATA', JSON.stringify(d.data()));
});
