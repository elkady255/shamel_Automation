import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 300_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/addr-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const stamp = () => `${Date.now()}`.slice(-6);
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/addresses${hash}`, LOAD);
  await page.waitForTimeout(6000);
}

test('server', async () => {
  fs.writeFileSync(OUT, '');
  const id = stamp();
  const base = { address_title: `PW AD ${id}`, address_type: 'Billing', address_line1: 'Street 1', city: 'Riyadh', country: 'Saudi Arabia' };
  const tryIt = async (label: string, over: Record<string, unknown>) => {
    try { const d = await api.insert('Address', { ...base, ...over }); log(`${label} -> SAVED ${d.name}`); }
    catch (e: any) { log(`${label} -> REFUSED ${clean(String(e.message)).slice(0, 260)}`); }
  };
  await tryIt('baseline', { address_title: `PW AD A ${id}` });
  await tryIt('title 1 char', { address_title: 'q' });
  await tryIt('title 101', { address_title: 'T'.repeat(101) });
  await tryIt('line1 1 char', { address_title: `PW AD B ${id}`, address_line1: 'x' });
  await tryIt('line1 101', { address_title: `PW AD C ${id}`, address_line1: 'L'.repeat(101) });
  await tryIt('no type', { address_title: `PW AD D ${id}`, address_type: '' });
  await tryIt('type Other', { address_title: `PW AD E ${id}`, address_type: 'Other' });
  await tryIt('no line1', { address_title: `PW AD F ${id}`, address_line1: '' });
  await tryIt('no country', { address_title: `PW AD G ${id}`, country: '' });
  await tryIt('no city', { address_title: `PW AD H ${id}`, city: '' });
  await tryIt('no title', { address_title: '' });
  await tryIt('pincode 1 char', { address_title: `PW AD I ${id}`, pincode: '1' });
  await tryIt('fax 1 char', { address_title: `PW AD J ${id}`, fax: '1' });
  await tryIt('email invalid', { address_title: `PW AD K ${id}`, email_id: 'not-an-email' });
  await tryIt('phone letters', { address_title: `PW AD L ${id}`, phone: 'abcdef' });
  await tryIt('link doctype Item', { address_title: `PW AD M ${id}`, links: [{ link_doctype: 'Item', link_name: 'x' }] });
  await tryIt('link missing name', { address_title: `PW AD N ${id}`, links: [{ link_doctype: 'Customer' }] });
  await tryIt('duplicate title', { address_title: `PW AD A ${id}` });
  await tryIt('governorate field', { address_title: `PW AD O ${id}`, governorate: 'zzz' });
  // list of existing address field names (shows custom fields)
  const rows = await api.list('Address', [], ['*'], 1);
  log('ADDRESS KEYS ' + Object.keys(rows[0] || {}).join(','));
  const lt = await api.list('Link Document Type', [], ['name'], 50).catch(() => []);
  log('LINKDT ' + JSON.stringify(lt));
});

test('add-ui', async ({ page }) => {
  await open(page, '/new');
  // type dropdown
  await press(main(page).getByPlaceholder('اختر نوع العنوان'));
  await page.waitForTimeout(800);
  log('TYPE OPTIONS ' + JSON.stringify((await page.locator('.cs-option').locator('visible=true').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  // country list
  await main(page).getByPlaceholder('ابحث واختر الدولة').click({ force: true });
  await page.waitForTimeout(1500);
  const c = (await page.locator('.cs-option').locator('visible=true').allInnerTexts()).map(clean);
  log('COUNTRY count ' + c.length + ' first ' + JSON.stringify(c.slice(0, 5)));
  await page.keyboard.press('Escape');
  // add link
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(1200);
  log('AFTER ADD LINK ' + clean(await main(page).innerText()).slice(-900));
  const btns = await main(page).getByRole('button').allInnerTexts();
  log('BTNS ' + JSON.stringify(btns.map(clean)));
  const ph = await main(page).locator('input').evaluateAll((els) => els.map((e: any) => e.placeholder + '|' + e.type));
  log('INPUTS ' + JSON.stringify(ph));
  // untouched save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2000);
  log('AFTER SAVE UNTOUCHED ' + clean(await main(page).innerText()).slice(0, 600) + ' TOAST ' + clean(await page.locator('[role=alert],.toast,.shamel-toast').allInnerTexts().then((a) => a.join('|'))));
});

test('details', async ({ page }) => {
  await open(page, '/PW Billing One-Billing');
  log('DET TEXT ' + clean(await main(page).innerText()).slice(0, 2500));
  const titles = await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title));
  log('DET TITLES ' + JSON.stringify(titles));
  const inputs = await main(page).locator('input,textarea').evaluateAll((els) => els.map((e: any) => `${e.placeholder}|${e.type}|dis=${e.disabled}|val=${e.value}|chk=${e.checked}`));
  inputs.forEach((i) => log('DET INPUT ' + i));
  log('DET BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean)));
});

