import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 120_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/ct-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/contacts${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.map((e: any) => `${e.tagName}|${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));

test('list', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '');
  log('LIST URL ' + page.url());
  log('LIST TEXT ' + clean(await main(page).innerText()).slice(0, 1200));
  await main(page).locator('tbody tr').first().getByRole('checkbox').evaluate((e: any) => e.click());
  await page.waitForTimeout(1000);
  log('BULK ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
});

test('add', async ({ page }) => {
  await open(page, '/new');
  log('ADD TEXT ' + clean(await main(page).innerText()).slice(0, 2500));
  (await inputs(page)).forEach((i) => log('ADD INPUT ' + i));
  // add rows to each table
  const adds = main(page).getByRole('button', { name: /إضافة/ });
  log('ADD BTNS ' + JSON.stringify((await adds.allInnerTexts()).map(clean)));
  const n = await adds.count();
  for (let i = 0; i < n; i++) { const t = clean(await adds.nth(i).innerText()); if (/إضافة (بريد|رقم|رابط|صف|إيميل|هاتف|عنوان)/.test(t)) { await press(adds.nth(i)); await page.waitForTimeout(700); } }
  log('AFTER ROWS ' + clean(await main(page).innerText()).slice(0, 2500));
  (await inputs(page)).forEach((i) => log('ROWS INPUT ' + i));
  log('TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  log('UNTOUCHED SAVE ' + clean(await main(page).innerText()).slice(0, 2500));
});

test('details', async ({ page }) => {
  const rows = await api.list('Contact', [], ['name', 'first_name', 'email_id', 'mobile_no', 'status'], 5);
  log('CONTACTS ' + JSON.stringify(rows));
  await open(page, '/' + encodeURIComponent(rows[0].name));
  log('DET TEXT ' + clean(await main(page).innerText()).slice(0, 2500));
  (await inputs(page)).forEach((i) => log('DET INPUT ' + i));
  log('DET TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
  const dt = await api.get('DocType', 'Contact');
  for (const f of dt.fields) log(`META ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|opt=${(f.options || '').toString().replace(/\n/g, ',')}`);
});
