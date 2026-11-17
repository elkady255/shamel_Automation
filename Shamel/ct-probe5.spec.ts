import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/ct-probe5.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const dialog = async (p: Page) => clean(await p.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog'));

let seq = 300;
test('flags', async () => {
  fs.writeFileSync(OUT, '');
  const id = `${Date.now()}`.slice(-6);
  const link = [{ link_doctype: 'Customer', link_name: 'CUST-2025-00003' }];
  const mk = (n: string, extra: Record<string, unknown>) => ({ first_name: `PW CT ${n} ${id}`, email_ids: [{ email_id: `pwct${id}${n}@example.com`, is_primary: 1 }], phone_nos: [{ phone: `+2015${id}${++seq}`, is_primary_phone: 1 }], links: link, ...extra });
  const a = await api.insert('Contact', mk('F1', { is_primary_contact: 1, is_billing_contact: 1, is_shipping_contact: 1 }));
  const b = await api.insert('Contact', mk('F2', { is_primary_contact: 1 }));
  const c = await api.insert('Contact', mk('F3', { is_billing_contact: 1, is_shipping_contact: 1 }));
  for (const x of [a, b, c]) { const g = await api.get('Contact', x.name); log(`${x.name}: primary=${g.is_primary_contact} billing=${g.is_billing_contact} shipping=${g.is_shipping_contact}`); }
  const first = await api.insert('Contact', { ...mk('F4', {}), links: [{ link_doctype: 'Customer', link_name: 'CUST-2025-00004' }], phone_nos: [{ phone: `+2016${id}9`, is_primary_phone: 1 }] });
  const g4 = await api.get('Contact', first.name); log(`first contact of another customer: primary=${g4.is_primary_contact}`);
});

test('layout + popups', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/contacts/new', { timeout: 100_000 });
  await page.waitForTimeout(6000);
  await press(main(page).getByRole('button', { name: /إضافة بريد/ }));
  await press(main(page).getByRole('button', { name: /إضافة رقم/ }));
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(1000);
  const info = await main(page).locator('*').evaluateAll((els) => els.filter((e: any) => e.scrollWidth > e.clientWidth + 5 && e.clientWidth > 300).map((e: any) => `${e.tagName}.${(e.className || '').toString().slice(0, 40)} sw=${e.scrollWidth} cw=${e.clientWidth}`).slice(0, 8));
  log('OVERFLOW ' + JSON.stringify(info));
  log('GEARS ' + (await main(page).locator('button:has(svg)').count()));
  // email edit row + setting
  const edits = await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title));
  log('TITLES ' + JSON.stringify(edits));
  // click the gear of the email table (first svg button in header row)
  const gear = main(page).locator('button:has(svg)').filter({ hasNot: page.locator('[title]') });
  log('GEAR candidates ' + (await gear.count()));
});

