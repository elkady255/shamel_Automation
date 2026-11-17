import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 120_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/ct-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/contacts${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const opts = async (p: Page) => (await p.locator('.cs-option').locator('visible=true').allInnerTexts()).map(clean);
const dialogText = async (p: Page) => clean(await p.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog'));

test('meta', async () => {
  fs.writeFileSync(OUT, '');
  const dt = await api.get('DocType', 'Contact');
  for (const f of dt.fields) log(`META ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|hid=${f.hidden}|opt=${(f.options || '').toString().replace(/\n/g, ',')}`);
  for (const t of ['Contact Email', 'Contact Phone']) { const d = await api.get('DocType', t); for (const f of d.fields) log(`${t} ${f.fieldname}|${f.fieldtype}|req=${f.reqd}|opt=${(f.options || '').toString().replace(/\n/g, ',')}`); }
  const rows = await api.list('Contact', [], ['*'], 1);
  log('KEYS ' + Object.keys(rows[0]).join(','));
});

test('add widgets', async ({ page }) => {
  await open(page, '/new');
  await main(page).getByPlaceholder('اختر الجنس', { exact: true }).click({ force: true }).catch(() => {});
  await page.getByText('اختر الجنس').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(800);
  log('GENDER ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  await press(main(page).getByRole('button', { name: /إضافة بريد/ }));
  await press(main(page).getByRole('button', { name: /إضافة رقم/ }));
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(800);
  log('EMAIL ROW HTML ' + (await main(page).locator('table').nth(0).locator('tbody tr').first().innerHTML()).replace(/\s+/g, ' ').slice(0, 1800));
  log('TABLE COUNT ' + (await main(page).locator('table').count()));
  const heads = await main(page).locator('table thead').allInnerTexts();
  log('HEADS ' + JSON.stringify(heads.map(clean)));
  // email type options
  const typeBox = main(page).getByText('نوع البريد').first();
  // phone type
  await main(page).getByPlaceholder('اختر نوع جهة الاتصال').click({ force: true });
  await page.waitForTimeout(800);
  log('PHONE TYPE OPTS ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  await main(page).getByPlaceholder('الكود', { exact: true }).click({ force: true });
  await page.waitForTimeout(1000);
  const cc = await opts(page);
  log('COUNTRY CODE count ' + cc.length + ' ' + JSON.stringify(cc.slice(0, 4)));
  await page.keyboard.press('Escape');
  // link doctypes
  await main(page).getByPlaceholder('اختر نوع المستند').click({ force: true });
  await page.waitForTimeout(1000);
  log('LINK DOCTYPES ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
  // field validation messages (cannot save: first name 1 char + invalid email + bad phone, and no link)
  await main(page).getByPlaceholder('أدخل الاسم الأول').fill('q');
  await main(page).getByPlaceholder('أدخل اسم العائلة').fill('z');
  await main(page).getByPlaceholder('أدخل البريد الإلكتروني').fill('bad-email');
  await main(page).getByPlaceholder('أدخل رقم الهاتف').fill('abc');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  log('VALIDATION ' + clean(await main(page).innerText()).slice(0, 1800));
  await main(page).getByPlaceholder('أدخل الاسم الأول').fill('T'.repeat(120));
  log('FIRST NAME len ' + (await main(page).getByPlaceholder('أدخل الاسم الأول').inputValue()).length);
  await main(page).getByPlaceholder('أدخل رقم الهاتف').fill('1');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2000);
  log('PHONE 1 char ' + clean(await main(page).innerText()).match(/[^ ]+ ?[^.]*حرفين[^ ]*/)?.[0]);
});

test('row icons + popups', async ({ page }) => {
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: /إضافة بريد/ }));
  await page.waitForTimeout(700);
  const row = main(page).locator('tbody tr').first();
  log('ROW BUTTONS ' + JSON.stringify(await row.locator('button, [role=button], svg').evaluateAll((els) => els.map((e: any) => e.tagName + ':' + (e.getAttribute('title') || e.getAttribute('aria-label') || e.className?.baseVal || e.className)))));
  const th = main(page).locator('table').first().locator('thead');
  log('THEAD HTML ' + (await th.innerHTML()).replace(/\s+/g, ' ').slice(0, 1500));
});
