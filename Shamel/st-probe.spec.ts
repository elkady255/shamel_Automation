import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 150_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.map((e: any) => `${e.tagName}|${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));

test('route', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling', LOAD);
  await page.waitForTimeout(6000);
  const links = await page.locator('a[href*="selling"]').evaluateAll((els) => els.map((e: any) => `${e.getAttribute('href')}|${(e.innerText || '').trim()}`));
  log('LINKS ' + JSON.stringify(links.filter((l) => /tax|ضريب/i.test(l))));
  log('ALL ' + JSON.stringify(links).slice(0, 3000));
});

test('meta', async () => {
  const dt = await api.get('DocType', 'Sales Taxes and Charges Template');
  for (const f of dt.fields) log(`META ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|opt=${(f.options || '').toString().replace(/\n/g, ',')}`);
  const ch = await api.get('DocType', 'Sales Taxes and Charges');
  for (const f of ch.fields) log(`CHILD ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|opt=${(f.options || '').toString().replace(/\n/g, ',')}`);
  const rows = await api.list('Sales Taxes and Charges Template', [], ['name', 'title', 'company', 'is_default', 'disabled', 'tax_category'], 50);
  log('TEMPLATES ' + JSON.stringify(rows));
});
