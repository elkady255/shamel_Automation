import { test } from '@playwright/test';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

test('probe Stock Ledger Entry UI', async ({ page }) => {
  test.setTimeout(240_000);
  const main = page.getByRole('main');
  test.setTimeout(100_000);
  await page.goto('about:blank'); await page.goto('/desk/shamel#/inventory/quality-inspection', { timeout: 120_000 }); await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Stock Ledger Entry', exact: true }).first().click(); await page.waitForTimeout(6000);
  console.log('LIST URL', page.url());
  console.log('LIST TEXT:', clean(await main.innerText()).slice(0, 900));
  console.log('HEADERS:', JSON.stringify((await main.getByRole('columnheader').allInnerTexts()).map(clean)));
  console.log('LIST BUTTONS:', JSON.stringify((await main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  console.log('FIRST ROW:', clean(await main.locator('tbody').getByRole('row').first().innerText()));
  await page.screenshot({ path: 'test-results/sle-list.png' });
  await main.locator('tbody').getByRole('row').first().getByRole('checkbox').check(); await page.waitForTimeout(800);
  console.log('ACTION BAR:', JSON.stringify((await main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await page.screenshot({ path: 'test-results/sle-actionbar.png' });
  await main.locator('tbody').getByRole('row').first().getByRole('checkbox').uncheck();
  const id = clean(await main.locator('tbody').getByRole('row').first().locator('td').nth(1).innerText());
  console.log('FIRST ID', id);
  await main.getByText(id, { exact: true }).first().click(); await page.waitForTimeout(4000);
  console.log('DETAILS URL', page.url());
  console.log('DETAILS TEXT:', clean(await main.innerText()).slice(0, 2200));
  console.log('INPUTS (editable?):', JSON.stringify(await main.locator('input:visible,textarea:visible,select:visible').evaluateAll((els) => els.map((e: any) => `${e.placeholder || e.name || e.type}${e.readOnly || e.disabled ? '(ro)' : '(EDIT)'}`))));
  console.log('DETAILS BUTTONS:', JSON.stringify((await main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await page.screenshot({ path: 'test-results/sle-details.png', fullPage: true });
});
