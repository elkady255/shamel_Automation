import { test } from '@playwright/test';
import { api } from './helpers/api';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const T = 'STO-ITEM-2026-00306';

test('Item with variants: multiple variants', async ({ page }) => {
  test.setTimeout(150_000);
  page.on('response', async (r) => {
    if (/\/api\//.test(r.url()) && (r.request().method() !== 'GET' || r.status() >= 400) && !/session_default|getpage|get_doc_fields|filters|get_list|get_options|get_naming|kaspersky|get_count|assign/.test(r.url())) {
      let b = ''; try { b = clean(await r.text()).slice(0, 500); } catch { /* ignore */ }
      console.log('API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 110), '| body:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 600), '=>', b);
    }
  });
  await page.goto('about:blank'); await page.goto(`/desk/shamel#/inventory/items/${T}`); await page.waitForTimeout(6000);
  await page.getByRole('main').getByRole('button', { name: 'Create', exact: true }).first().click(); await page.waitForTimeout(800);
  await page.getByText('Multiple Variants', { exact: true }).locator('visible=true').first().click(); await page.waitForTimeout(2500);
  console.log('INPUTS:', JSON.stringify(await page.locator('input:visible').evaluateAll((els) => els.map((e: any) => (e.placeholder || e.name || e.type) + '=' + e.value + (e.checked ? '[x]' : '')))));
  console.log('BUTTONS:', JSON.stringify((await page.getByRole('button').evaluateAll((els) => els.filter((e: any) => e.offsetParent).map((e: any) => e.innerText.trim()))).filter(Boolean)));
  const body = clean(await page.locator('body').innerText()); console.log('TEXT:', body.slice(body.indexOf('Create Cancel') > 0 ? 0 : 0).slice(-700));
  await page.screenshot({ path: 'test-results/var-multi.png', fullPage: true });
  const dlg = page.getByRole('dialog', { name: 'Create Multiple Variants' });
  const combo = dlg.getByRole('combobox', { name: 'Select PW-Size' });
  await combo.click(); await page.waitForTimeout(800);
  await dlg.getByRole('button', { name: 'Show popup' }).click().catch(() => {}); await page.waitForTimeout(800);
  console.log('DIALOG TEXT:', clean(await dlg.innerText()));
  console.log('OPTIONS:', JSON.stringify((await page.getByRole('option').evaluateAll((els) => els.map((e: any) => e.innerText))).map(clean)));
  for (const v of ['Small', 'Medium']) {
    await combo.click(); await page.waitForTimeout(500);
    const o = page.getByRole('option', { name: v, exact: true });
    console.log('OPTION', v, await o.count());
    if (await o.count()) await o.first().click({ timeout: 8000 }); else await combo.fill(v).then(() => combo.press('Enter'));
    await page.waitForTimeout(700);
  }
  console.log('DIALOG AFTER PICK:', clean(await dlg.innerText()));
  await page.screenshot({ path: 'test-results/var-multi2.png', fullPage: true });
  await dlg.getByRole('button', { name: 'Create', exact: true }).click(); await page.waitForTimeout(7000);
  console.log('ALERTS:', JSON.stringify((await page.getByRole('alert').allInnerTexts()).map(clean)));  console.log('VARIANTS NOW:', JSON.stringify(await api.list('Item', [['variant_of', '=', T]], ['name', 'item_name'])));
});


