import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1500, height: 1400 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('meta', async () => {
  fs.writeFileSync(OUT, '');
  for (const dt of ['Blanket Order', 'Blanket Order Item']) {
    const d = await api.get('DocType', dt);
    log(`DOCTYPE ${dt} naming=${d.autoname} submittable=${d.is_submittable}`);
    for (const f of d.fields) log(`META ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|def=${f.default}|hid=${f.hidden}|ro=${f.read_only}|opt=${(f.options || '').toString().replace(/\n/g, ',').slice(0, 80)}|dep=${f.depends_on || ''}`);
  }
  const cf = await api.list('Custom Field', [['dt', 'in', ['Blanket Order', 'Blanket Order Item']]], ['dt', 'fieldname', 'label', 'fieldtype', 'reqd', 'hidden', 'depends_on'], 50);
  for (const f of cf) log(`CF ${f.dt}|${f.fieldname}|${f.label}|${f.fieldtype}|reqd=${f.reqd}|hid=${f.hidden}`);
  const rows = await api.list('Blanket Order', [], ['name', 'blanket_order_type', 'docstatus', 'customer', 'supplier', 'company', 'from_date', 'to_date', 'order_no'], 40);
  log('ROWS ' + rows.length + ' ' + JSON.stringify(rows));
  const u = await api.get('User', 'Administrator'); log('LANG ' + u.language);
});

test('list ui', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/blanket-orders', LOAD);
  await page.waitForTimeout(8000);
  log('URL ' + page.url());
  log('TEXT ' + clean(await main(page).innerText()).slice(0, 1500));
  log('HEADERS ' + JSON.stringify((await main(page).locator('th').allInnerTexts()).map(clean)));
  log('BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  if (await main(page).locator('tbody tr').count()) {
    await press(main(page).locator('tbody tr').first().getByRole('checkbox'));
    await page.waitForTimeout(1000);
    log('BULK ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  }
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-list.png' });
});
