import { test, type Page } from '@playwright/test';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const PR = 'MAT-PRE-2026-00024';

/** One single attempt to add a Landed Cost Voucher through the UI, logging every step and every API write. */
test('LCV add one attempt', async ({ page }) => {
  test.setTimeout(110_000);
  page.on('response', async (r) => {
    if (r.request().method() !== 'GET' && /\/api\//.test(r.url()) && !/session_default|getpage|get_doc_fields|filters/.test(r.url())) {
      let b = ''; try { b = clean(await r.text()).slice(0, 500); } catch { /* ignore */ }
      if (!/get_list|get_options|get_naming/.test(r.url())) console.log('PAYLOAD:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 900));
      console.log('API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 110), '=>', b);
    }
  });
  page.on('response', async (r) => { if (/landed_cost|get_items|receipt/i.test(r.url()) && /\/api\//.test(r.url())) { let b = ''; try { b = clean(await r.text()).slice(0, 300); } catch { /* ignore */ } console.log('LCV-API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 130), '=>', b); } });
  page.on('response', async (r) => { if (/\/api\//.test(r.url()) && (r.status() >= 400)) { let b = ''; try { b = clean(await r.text()).slice(0, 170); } catch { /* ignore */ } console.log('NET', r.request().method(), r.status(), clean(decodeURIComponent((r.request().postData() ?? r.url().split('?')[1] ?? '').replace(/\+/g, ' '))).slice(0, 110), '=>', b); } });
  const main = page.getByRole('main');
  const step = async (label: string, fn: () => Promise<unknown>) => {
    try { await fn(); console.log('OK  ', label); } catch (e) { console.log('FAIL', label, '-', clean(String(e)).slice(0, 200)); await page.screenshot({ path: `test-results/lcv-fail-${label.replace(/\W+/g, '-')}.png` }); throw e; }
  };
  const choose = async (trigger: ReturnType<Page['locator']>, text?: string | RegExp) => {
    await trigger.click(); await page.waitForTimeout(900);
    const opt = text ? page.getByRole('option', { name: text }).locator('visible=true').first() : page.getByRole('option').locator('visible=true').first();
    if (await opt.count()) await opt.click({ timeout: 8000 });
    else await page.getByText(text as string, { exact: true }).locator('visible=true').last().click({ timeout: 8000, force: true });
    await page.waitForTimeout(600);
  };
  await page.goto('about:blank'); await page.goto('/desk/shamel#/inventory/landed-cost-voucher/new', { timeout: 120_000 }); await page.waitForTimeout(5000);
  void 0; const modal = page.locator('[role=dialog]:visible, .modal:visible').filter({ hasText: 'Failed to get method' }).first();
  const dialogText = ((await page.getByText('Failed to get method').count()) ? await page.getByText('Failed to get method').first().innerText() : 'no error dialog');
  console.log('ERROR DIALOG ON OPEN:', clean(dialogText));
  await page.screenshot({ path: 'test-results/lcv-after-close.png' });
  await step('series', () => choose(main.getByPlaceholder('Select Series')));
  await step('company', () => choose(main.getByPlaceholder('Select Company'), /Ahmed Ebrahim/));
  await step('voucher row', () => main.getByRole('button', { name: 'Add Row' }).nth(0).click());
  await page.waitForTimeout(1000);
  await step('receipt document type', () => choose(main.getByPlaceholder('Select Document Type'), 'Purchase Receipt'));
  await step('receipt document', async () => { const f = main.getByPlaceholder('Select Document', { exact: true }); await f.click(); await page.waitForTimeout(1500); console.log('DOC LIST:', JSON.stringify((await page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean).slice(0, 5))); await f.fill('MAT-PRE-2026-00024'); await page.waitForTimeout(1800); await page.getByRole('option').locator('visible=true').first().click(); });
  await step('get items', async () => { const seen: string[] = []; const on = (r: import('@playwright/test').Request) => { if (['fetch','xhr'].includes(r.resourceType())) seen.push(r.method() + ' ' + r.url().replace('https://test.hr.azzrk.com','').slice(0, 130)); }; page.on('request', on); const cb = main.locator('tbody tr').first().locator('input[type=checkbox], [role=checkbox], .pb-checkbox, .sr-checkbox, [class*=checkbox]').first(); console.log('ROW CHECKBOX found:', await cb.count()); if (await cb.count()) { await cb.click({ force: true }).catch((e) => console.log('checkbox click error', String(e).slice(0, 100))); await page.waitForTimeout(800); console.log('BUTTONS NOW:', JSON.stringify((await main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean))); } const btn = main.getByRole('button', { name: 'Get Items' }); console.log('GET ITEMS BUTTON enabled:', await btn.isEnabled(), '| disabled attr:', await btn.getAttribute('disabled')); await btn.click(); await page.waitForTimeout(4000); page.off('request', on); console.log('REQUESTS AFTER Get Items CLICK:', seen.filter((s) => !/kaspersky/.test(s)).length ? '' : 'none'); seen.filter((s) => !/kaspersky/.test(s)).forEach((s) => console.log('   ', s)); });
  console.log('VOUCHER ROW VALUES:', JSON.stringify(await main.locator('input:visible').evaluateAll((els) => els.map((e: any) => e.value).slice(4, 9))));
  console.log('ITEMS TABLE:', clean(await main.innerText()).match(/Items.{0,300}Applicable Charges/)?.[0]);
  await step('landed cost row', () => main.getByRole('button', { name: 'Add Row' }).last().click());
  await page.waitForTimeout(1000);
  await step('description', () => main.getByPlaceholder('Enter description').fill('PW freight charge'));
  await step('amount', async () => { const f = main.getByRole('textbox').last(); await f.click(); await f.fill('50'); });
  await step('distribute method', () => choose(main.getByPlaceholder('Select Distribution Method'), 'Qty'));
  console.log('FORM BEFORE SAVE:', clean(await main.innerText()).replace(/^.*?Basic Information/, 'Basic Information').slice(0, 900));
  await page.screenshot({ path: 'test-results/lcv-before-save.png', fullPage: true });
  await step('save', async () => { await main.getByRole('button', { name: 'Save', exact: true }).click(); await page.waitForTimeout(6000); });
  console.log('REQUIRED MESSAGES:', JSON.stringify((await main.locator('[class*=error], [class*=invalid], .text-red-500, [class*=danger]').allInnerTexts()).map(clean).filter(Boolean)));
  console.log('AFTER SAVE URL', page.url());
  console.log('AFTER SAVE TEXT:', clean(await page.locator('body').innerText()).slice(-600));
  await page.screenshot({ path: 'test-results/lcv-after-save.png', fullPage: true });
});
