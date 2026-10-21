import { test } from '@playwright/test';
import { qi } from './helpers/qi-data';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

test('probe QI edit popup', async ({ page }) => {
  test.setTimeout(300_000);
  const d = await qi('Draft');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/inventory/quality-inspection', { timeout: 120_000 }); await page.waitForTimeout(5000);
  const main = page.getByRole('main');
  await main.getByPlaceholder('Search By ID').fill(d.name); await page.waitForTimeout(2500);
  await main.locator('tbody').getByRole('row').first().getByRole('checkbox').check();
  console.log('ACTIONBAR:', JSON.stringify((await main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await main.getByRole('button', { name: 'Edit', exact: true }).click(); await page.waitForTimeout(2000);
  const pop = page.locator('[role=dialog]:visible, .modal:visible, [class*=popup]:visible').last();
  console.log('POPUP HTML CLASSES:', await page.getByText('Edit —').first().evaluate((e) => { let n: any = e; const out = []; for (let i = 0; i < 6 && n; i++) { out.push(n.tagName + '.' + (n.className || '').toString().slice(0, 50)); n = n.parentElement; } return out.join(' < '); }));
  console.log('POPUP BUTTONS:', JSON.stringify((await page.getByRole('button').allInnerTexts()).map(clean).filter(Boolean).slice(-8)));
  console.log('POPUP INPUTS:', JSON.stringify(await page.locator('input:visible,textarea:visible,[role=combobox]:visible,select:visible').evaluateAll((els) => els.map((e: any) => e.tagName + ':' + (e.placeholder || e.name || e.type || e.getAttribute('aria-label') || e.innerText || '').slice(0, 30)))).slice(-600));
  await page.screenshot({ path: 'test-results/qi-edit1.png' });
  // open Field dropdown
  await page.getByText('Field', { exact: true }).last().click({ force: true }).catch(() => {});
  await page.waitForTimeout(800);
  const opts = await page.getByRole('option').allInnerTexts();
  console.log('OPTIONS:', JSON.stringify(opts.map(clean)));
  await page.screenshot({ path: 'test-results/qi-edit2.png' });
});
