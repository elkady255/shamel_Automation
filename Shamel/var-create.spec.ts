import { test } from '@playwright/test';
import { api } from './helpers/api';
import { ItemFormPage } from './pages/ItemFormPage';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const TEMPLATE = 'STO-ITEM-2026-00306';

/** Headed attempt to create variants of the template from the item page. Nothing is deleted. */
test('Item with variants: create variants', async ({ page }) => {
  test.setTimeout(170_000);
  page.on('response', async (r) => {
    if (/\/api\//.test(r.url()) && (r.request().method() !== 'GET' || r.status() >= 400) && !/session_default|getpage|get_doc_fields|filters|get_list|get_options|get_naming|kaspersky|get_count|assign/.test(r.url())) {
      let b = ''; try { b = clean(await r.text()).slice(0, 500); } catch { /* ignore */ }
      console.log('API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 110), '| body:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 600), '=>', b);
    }
  });
  const form = new ItemFormPage(page);
  await page.goto('about:blank'); await page.goto(`/desk/shamel#/inventory/items/${TEMPLATE}`); await page.waitForTimeout(6000);
  console.log('BUTTONS:', JSON.stringify((await form.main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await form.main.getByRole('button', { name: 'Create', exact: true }).first().click(); await page.waitForTimeout(1000);
  console.log('BODY AFTER CREATE:', clean(await page.locator('body').innerText()).slice(0, 900)); console.log('VARIANT TEXT ON PAGE:', clean(await form.main.innerText()).match(/.{0,80}ariant.{0,120}/g));
  console.log('CREATE MENU:', JSON.stringify((await page.locator('li:visible,[role=menuitem]:visible,[role=option]:visible').allInnerTexts()).map(clean)));
  await page.screenshot({ path: 'test-results/var-create-menu.png' });
  const item = page.getByText('Single Variant', { exact: true }).locator('visible=true').first();
  console.log('VARIANT MENU ITEM:', await item.count());
  if (!(await item.count())) return;
  await item.click(); await page.waitForTimeout(2500);
  const bodyText = clean(await page.locator('body').innerText()); console.log('DIALOG/URL:', page.url(), bodyText.slice(bodyText.indexOf('Administrator')).slice(0, 900));
  console.log('INPUTS:', JSON.stringify(await page.locator('input:visible').evaluateAll((els) => els.map((e: any) => (e.placeholder || e.name || e.type) + '=' + e.value))));
  const val = page.getByPlaceholder('Select PW-Size'); await val.click(); await page.waitForTimeout(1000);
  console.log('VALUE OPTIONS:', JSON.stringify((await page.locator('li:visible,[role=option]:visible').allInnerTexts()).map(clean)));
  const m = page.getByText('Medium', { exact: true }).locator('visible=true').last(); await m.click({ force: true }); await page.waitForTimeout(800);
  const btns = (await page.getByRole('button').evaluateAll((els) => els.filter((e: any) => e.offsetParent).map((e: any) => e.innerText.trim()))).filter(Boolean);
  console.log('ALL VISIBLE BUTTONS:', JSON.stringify(btns));
  await page.screenshot({ path: 'test-results/var-create-dialog.png', fullPage: true });
  const ok = page.getByRole('button', { name: /^(Create|Save|Submit|Create Variant)$/ }).last(); console.log('DIALOG BUTTON COUNT:', await ok.count());
  await ok.click(); await page.waitForTimeout(6000);
  console.log('ALERTS:', JSON.stringify((await page.getByRole('alert').allInnerTexts()).map(clean)));
  const kids = await api.list('Item', [['variant_of', '=', TEMPLATE]], ['name', 'item_name', 'variant_of']);
  console.log('VARIANTS NOW:', JSON.stringify(kids));
});



