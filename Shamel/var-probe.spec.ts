import { test } from '@playwright/test';
import { api } from './helpers/api';
import { ItemFormPage } from './pages/ItemFormPage';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

test('variant probe: create attribute + explore Has Variants UI', async ({ page }) => {
  test.setTimeout(150_000);
  const existing = await api.list('Item Attribute', [], ['name'], 50);
  console.log('EXISTING ATTRIBUTES:', JSON.stringify(existing.map((a) => a.name)));
  const att = await api.ensure('Item Attribute', [['name', '=', 'PW-Size']], {
    attribute_name: 'PW-Size',
    item_attribute_values: [
      { attribute_value: 'Small', abbr: 'S' }, { attribute_value: 'Medium', abbr: 'M' }, { attribute_value: 'Large', abbr: 'L' },
    ],
  });
  console.log('ATTRIBUTE:', att.name, JSON.stringify(att.item_attribute_values?.map((v: any) => v.attribute_value)));
  page.on('response', async (r) => {
    if (r.request().method() !== 'GET' && /\/api\//.test(r.url()) && !/session_default|getpage|get_doc_fields|filters|get_list|get_options|get_naming|kaspersky/.test(r.url())) {
      let b = ''; try { b = clean(await r.text()).slice(0, 400); } catch { /* ignore */ }
      console.log('API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 110), '| body:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 600), '=>', b);
    }
  });
  const form = new ItemFormPage(page);
  await form.gotoNew();
  await form.setting('Has Variants').click();
  await page.waitForTimeout(1500);
  console.log('INPUTS:', JSON.stringify(await form.main.locator('input:visible,textarea:visible').evaluateAll((els) => els.map((e: any) => e.placeholder || e.name || e.type))));
  console.log('BUTTONS:', JSON.stringify((await form.main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  console.log('TEXT:', clean(await form.main.innerText()).slice(0, 1500));
  await form.main.getByText('Select An Option').click(); await page.waitForTimeout(800);
  console.log('VBO OPTIONS:', JSON.stringify((await page.locator('li:visible,[role=option]:visible').allInnerTexts()).map(clean)));
  await page.locator('li:visible,[role=option]:visible').filter({ hasText: 'Item Attribute' }).first().click(); await page.waitForTimeout(1500);
  console.log('INPUTS2:', JSON.stringify(await form.main.locator('input:visible,textarea:visible').evaluateAll((els) => els.map((e: any) => e.placeholder || e.name || e.type))));
  console.log('TEXT2:', clean(await form.main.innerText()).slice(clean(await form.main.innerText()).indexOf('Variants Based On')).slice(0, 800));
  await page.screenshot({ path: 'test-results/variants-ui.png', fullPage: true });
});

