import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.map((e: any) => `${e.tagName}|${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));

test('meta', async () => {
  fs.writeFileSync(OUT, '');
  const dt = await api.get('DocType', 'Pricing Rule');
  log('NAMING ' + dt.autoname);
  for (const f of dt.fields) log(`META ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|def=${f.default}|opt=${(f.options || '').toString().replace(/\n/g, ',').slice(0, 120)}|dep=${f.depends_on || ''}`);
  const rows = await api.list('Pricing Rule', [], ['name', 'title', 'apply_on', 'disabled', 'company'], 30);
  log('RULES ' + rows.length + ' ' + JSON.stringify(rows.slice(0, 10)));
});

test('route + list', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/customer-groups', LOAD);
  await page.waitForTimeout(6000);
  await press(page.getByText('قواعد التسعير', { exact: true }).first());
  await page.waitForTimeout(5000);
  log('URL ' + page.url());
  log('LIST ' + clean(await main(page).innerText()).slice(0, 1500));
  log('HEADERS ' + JSON.stringify((await main(page).locator('th').allInnerTexts()).map(clean)));
  log('BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  if (await main(page).locator('tbody tr').count()) {
    await press(main(page).locator('tbody tr').first().getByRole('checkbox'));
    await page.waitForTimeout(1000);
    log('BULK ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  }
});
