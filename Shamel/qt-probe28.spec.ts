import { test, type Page } from '@playwright/test';
import { ctx } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe28.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const cs = (p: Page, i: number) => main(p).locator('input.cs-input').nth(i);
const OPT = '/api/method/shamel.api.routes.selling.transactions.quotation.get_options';

test('address options data', async () => {
  fs.writeFileSync(OUT, '');
  const c = await ctx();
  for (const [src, q] of [['address', 'party_type=Customer&party=CU-2026-00001'], ['contact', 'party_type=Customer&party=CU-2026-00001'], ['address', 'party_type=Customer&party=CUST-2025-00002'], ['contact', 'party_type=Customer&party=CUST-2025-00002'], ['company_address', 'company=Ahmed Ebrahim CO.'], ['company_contact', 'company=Ahmed Ebrahim CO.']]) {
    const r = await c.get(`${OPT}?source=${src}&${q}&search_text=`);
    const b = await r.json();
    log(`OPTIONS ${src} ${q} => ${JSON.stringify((b.message?.data || []).map((d: any) => ({ n: d.name, p: d.is_primary_address ?? d.is_primary_contact, s: d.is_shipping_address, t: d.address_type, c: d.creation })))}`.slice(0, 1200));
  }
});

test('general information tab after party', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/quotations/new', LOAD);
  await page.waitForTimeout(8000);
  await cs(page, 2).click(); await cs(page, 2).fill('PW Test'); await page.waitForTimeout(2000);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(4000);
  await press(main(page).getByRole('button', { name: 'المعلومات العامة', exact: true }));
  await page.waitForTimeout(2500);
  log('GENERAL TAB TEXT ' + clean(await main(page).innerText()).replace(/^.*?إضافة عرض سعر/, '').slice(0, 1500));
  log('GENERAL INPUTS ' + JSON.stringify(await main(page).locator('input,textarea').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).slice(1).map((e: any, i) => `${i}:${e.tagName}:${e.className.slice(0, 9)}:${e.placeholder}:${String(e.value).slice(0, 40)}:max=${e.maxLength}`))));
  log('GENERAL BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/qt-general-ar.png', fullPage: true });
});
