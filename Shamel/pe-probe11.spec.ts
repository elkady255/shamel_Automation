// Probe: where the Ledger button goes and the buttons of the bulk delete confirmation (answers No).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';
import { api } from './helpers/api';
test.use({ viewport: { width: 1500, height: 1400 }, actionTimeout: 20_000 });
test('ledger and bulk delete', async ({ page, context }) => {
  test.setTimeout(200_000);
  console.log('E03', JSON.stringify(await api.list('Payment Entry', [['party', '=', d.CUST], ['paid_amount', 'in', [25, 14, 16]]], ['name', 'docstatus', 'paid_amount', 'amended_from', 'modified'], 30)));
  await u.open(page, u.LIST + '/' + d.data().B01);
  const reqs: string[] = []; context.on('request', (r) => { if (/ledger|report/i.test(r.url())) reqs.push(r.url().slice(0, 300)); });
  const popup = context.waitForEvent('page', { timeout: 15_000 }).catch(() => null);
  await u.btn(page, 'دفتر الأستاذ').click();
  const p2 = await popup; await page.waitForTimeout(12_000);
  console.log('SAME', page.url()); console.log('NEW', p2 ? p2.url() : 'none'); console.log('REQ', reqs.join('\n'));
  if (p2) { await p2.waitForTimeout(10_000); console.log('NEWTEXT', (await p2.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 900)); await p2.screenshot({ path: 'Shamel/pe-results/p11-ledger.png' }); }
  else console.log('MAIN', (await page.locator('main').innerText()).replace(/\s+/g, ' ').slice(0, 500));
  const draft = (await api.list('Payment Entry', [['party', '=', d.CUST], ['paid_amount', '=', 16], ['docstatus', '=', 2]], ['name'], 1))[0]?.name;
  if (!draft) return;
  await u.open(page, u.LIST);
  await page.locator('main input[placeholder="البحث باستخدام الID"]').fill(draft); await page.keyboard.press('Enter'); await page.waitForTimeout(5000);
  await page.locator(`input.check_item[data-id="${draft}"]`).click(); await page.waitForTimeout(2000);
  await page.locator('button:visible').filter({ hasText: /^\s*حذف\s*$/ }).last().click(); await page.waitForTimeout(3000);
  console.log('DIALOG', draft, await page.getByText('حذف السجل').last().evaluate((e: any) => { let x = e; for (let i = 0; i < 4 && x.parentElement; i++) { x = x.parentElement; if (x.querySelector('button')) break; } return `${x.className} :: ${[...x.querySelectorAll('button')].map((b: any) => JSON.stringify(b.innerText) + '.' + b.className).join(' | ')} :: parents ${x.parentElement.className} / ${x.parentElement.parentElement.className}`; }));
  await page.screenshot({ path: 'Shamel/pe-results/p11-bulkdel.png' });
});
