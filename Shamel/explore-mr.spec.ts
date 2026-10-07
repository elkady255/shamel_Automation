import fs from 'fs';
import { test } from '@playwright/test';
import { MaterialRequestPage } from './pages/MaterialRequestPage';
import { salesOrder } from './helpers/mr-data';

// Temporary exploration of get-items and connections (removed afterwards)
test('explore: get items + connections', async ({ page }) => {
  test.setTimeout(1_200_000);
  await page.setViewportSize({ width: 1400, height: 1000 });
  const mr = new MaterialRequestPage(page);
  const out: string[] = [];
  const so = await salesOrder('open', 3);
  out.push(`SO ${so.name} status=${so.status}`);
  page.on('response', async (r) => {
    if (/connections|get_linked|sales_order|product_bundle|get_items|map/.test(r.url())) out.push(`RESP ${r.status()} ${r.url().replace(/^.*\/api\//, '').slice(0, 200)}`);
  });
  await mr.gotoNew();
  await page.getByRole('button', { name: 'Get Items from' }).click();
  await page.waitForTimeout(1500);
  out.push('MENU ' + (await page.locator('body').ariaSnapshot()).split('\n').filter((l) => /menuitem|option|Sales Order|Bundle|Bill/.test(l)).join('\n'));
  await page.getByText('Sales Order', { exact: true }).first().click();
  await page.waitForTimeout(8000);
  out.push('DIALOG ' + (await page.getByRole('dialog').last().ariaSnapshot().catch(() => 'no dialog')).slice(0, 5000));
  await page.screenshot({ path: 'test-results/explore-getitems.png' });
  await page.keyboard.press('Escape');
  await mr.gotoDetails('MAT-MR-2026-00020');
  out.push('URL before ' + page.url());
  await mr.tab('Connections').click();
  for (let i = 0; i < 12; i++) {
    await page.waitForTimeout(5000);
    out.push(`t+${(i + 1) * 5}s URL ${page.url()} heading=${await page.getByRole('heading', { level: 2 }).first().innerText().catch(() => '')}`);
  }
  out.push('CONN ' + (await mr.main.ariaSnapshot()).slice(0, 3000));
  await page.screenshot({ path: 'test-results/explore-connections.png' });
  fs.writeFileSync('test-results/explore-mr2.txt', out.join('\n'));
});
