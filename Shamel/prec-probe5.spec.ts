// Probe: table DOM, selection, Allocate, edit row, settings (no Reconcile).
import { test } from '@playwright/test';
import * as u from './helpers/prec-ui';
import { api } from './helpers/api';

test.use({ viewport: { width: 1400, height: 2600 } });

test('table dom, allocate, edit', async ({ page }) => {
  test.setTimeout(280_000);
  console.log('PERIODS', JSON.stringify(await api.list('Accounting Period', [['company', '=', u.COMPANY]], ['name', 'start_date', 'end_date', 'disabled'])));
  page.on('response', async (r) => {
    if (!/payment_reconcil/i.test(r.url()) || /\.(js|css)/.test(r.url())) return;
    console.log('API', r.status(), decodeURIComponent(r.url().split('/api/method/')[1] ?? '').slice(0, 200), decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' ')).slice(0, 1500), '=>', (await r.text().catch(() => '')).slice(0, 1800));
  });
  await u.open(page);
  await u.setParty(page, 'QA-PR Cust Main');
  await u.getEntries(page);
  const t = u.tables(page);
  console.log('ROW0', (await t.nth(0).locator('tbody tr').first().evaluate((e) => e.outerHTML)).replace(/ data-v-\w+(="")?/g, '').slice(0, 2500));
  console.log('HEAD0', (await t.nth(0).locator('thead').evaluate((e) => e.outerHTML)).replace(/ data-v-\w+(="")?/g, '').slice(0, 1500));
  console.log('WRAP', (await t.nth(0).evaluate((e) => { let x: HTMLElement = e as HTMLElement; for (let i = 0; i < 3; i++) x = x.parentElement!; return x.outerHTML; })).replace(/ data-v-\w+(="")?/g, '').replace(/<svg.*?<\/svg>/g, '').replace(/<tbody.*<\/tbody>/g, '').slice(0, 2500));
  await page.screenshot({ path: 'Shamel/prec-results/p5-a.png', fullPage: true });
});
