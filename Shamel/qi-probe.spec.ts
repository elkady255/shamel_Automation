import { test, type Page } from '@playwright/test';
import { refDN } from './helpers/qi-data';
import { seed } from './helpers/ps-data';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

/** One single attempt to add a Quality Inspection through the UI, logging every step and every API call. */
test('probe QI add one attempt', async ({ page }) => {
  test.setTimeout(240_000);
  await seed();
  const dn = await refDN();
  console.log('reference DN', dn.name);
  page.on('response', async (r) => {
    const u = r.url();
    if (/\/api\//.test(u) && r.request().method() !== 'GET' || /quality/i.test(u) && !/\.(js|css|svg|png)/.test(u)) {
      let body = ''; try { body = clean(await r.text()).slice(0, 260); } catch { /* ignore */ }
      console.log('API', r.request().method(), r.status(), u.replace('https://test.hr.azzrk.com', '').slice(0, 110), '=>', body);
    }
  });
  const main = page.getByRole('main');
  const step = async (label: string, fn: () => Promise<unknown>) => {
    try { await fn(); console.log('OK  ', label); } catch (e) { console.log('FAIL', label, '-', clean(String(e)).slice(0, 160)); await page.screenshot({ path: `test-results/qi-add-fail-${label.replace(/\W+/g, '-')}.png` }); throw e; }
  };
  await page.goto('about:blank'); await page.goto('/desk/shamel#/inventory/quality-inspection/new', { timeout: 120_000 }); await page.waitForTimeout(5000);
  const pickOpt = async (trigger: ReturnType<Page['locator']>, text?: string | RegExp) => {
    await trigger.click(); await page.waitForTimeout(900);
    const o = text ? page.getByRole('option', { name: text }).locator('visible=true').first() : page.getByRole('option').locator('visible=true').first();
    if (await o.count()) await o.click({ timeout: 10_000 });
    else {
      const chip = page.getByText(text as string, { exact: true }).locator('visible=true').last();
      try { await chip.click({ timeout: 8_000 }); } catch (e) { console.log('chip click error:', clean(String(e)).slice(0, 500)); await chip.click({ timeout: 8_000, force: true }); }
    }
    await page.waitForTimeout(600);
  };
  await step('series', () => pickOpt(main.getByPlaceholder('Select Series'), /MAT-QA/));
  await step('company', () => pickOpt(main.getByPlaceholder('Select Company')));
  await step('status', () => pickOpt(main.getByText(/Select Status/).locator('visible=true').first(), 'Accepted'));
  await step('inspection type', () => pickOpt(main.getByText(/Select Inspection Type/).locator('visible=true').first(), 'Outgoing'));
  await step('open reference section', () => main.getByRole('button', { name: 'Reference Document' }).click());
  await step('reference type', () => pickOpt(main.getByText(/Select Reference Type/).locator('visible=true').first(), 'Delivery Note'));
  await step('reference name', async () => { const f = main.getByPlaceholder('Select Reference'); await f.click(); await f.fill(dn.name); await page.waitForTimeout(1800); await page.getByRole('option').locator('visible=true').first().click(); });
  await step('open item section', () => main.getByRole('button', { name: 'Item & Inspection' }).click());
  await step('item code', () => pickOpt(main.getByPlaceholder('Select Item')));
  await step('sample size', () => main.getByPlaceholder('Enter sample size').fill('2'));
  await step('open review section', () => main.getByRole('button', { name: 'Review' }).click());
  await step('inspected by', () => pickOpt(main.getByPlaceholder('Select User')));
  await page.screenshot({ path: 'test-results/qi-add-before-save.png', fullPage: true });
  console.log('FORM TEXT BEFORE SAVE:', clean(await main.innerText()).slice(0, 1200));
  await step('save', async () => { await main.getByRole('button', { name: 'Save', exact: true }).click(); await page.waitForTimeout(6000); });
  console.log('AFTER SAVE URL', page.url());
  console.log('AFTER SAVE TEXT:', clean(await page.locator('body').innerText()).slice(-700));
  await page.screenshot({ path: 'test-results/qi-add-after-save.png', fullPage: true });
});
