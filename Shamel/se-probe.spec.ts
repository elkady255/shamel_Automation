import { test, type Page } from '@playwright/test';
import { api } from './helpers/api';
import { seed, ITEM_A, code } from './helpers/ps-data';
import { writeFileSync } from 'fs';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const EP = 'shamel.api.routes.inventory.transactions.stock_entry.create_stock_entry';

test('Stock Entry add: capture the UI request, replay it with one change at a time', async ({ page }) => {
  test.setTimeout(240_000);
  await seed();
  let uiPayload = ''; let uiResponse = '';
  page.on('response', async (r) => {
    if (r.url().includes('create_stock_entry')) { uiPayload = r.request().postData() ?? ''; try { uiResponse = await r.text(); } catch { /* ignore */ } }
  });
  const main = page.getByRole('main');
  const choose = async (trigger: ReturnType<Page['locator']>, text?: string | RegExp) => {
    await trigger.click(); await page.waitForTimeout(900);
    const o = text ? page.getByRole('option', { name: text }).locator('visible=true').first() : page.getByRole('option').locator('visible=true').first();
    await o.click({ timeout: 8000 }); await page.waitForTimeout(600);
  };
  await page.goto('about:blank'); await page.goto('/desk/shamel#/inventory/stock-entry/new', { timeout: 120_000 }); await page.waitForTimeout(5000);
  await choose(main.getByPlaceholder('Select Series'));
  await choose(main.getByPlaceholder('Select Stock Entry Type'), /Material Receipt/);
  const w = main.getByPlaceholder('Select Target Warehouse').last(); await w.click(); await w.fill('Stores - E'); await page.waitForTimeout(1500);
  await page.getByRole('option', { name: /^Stores - E$/ }).locator('visible=true').first().click();
  await main.getByRole('button', { name: 'Add Item' }).click(); await page.waitForTimeout(1500);
  const f = main.getByPlaceholder('Item Code', { exact: true }).last(); await f.click(); await f.fill(code(ITEM_A)); await page.waitForTimeout(1500);
  await page.getByRole('option').locator('visible=true').first().click();
  await main.getByPlaceholder('0', { exact: true }).first().fill('5');
  await main.getByRole('button', { name: 'Save', exact: true }).click(); await page.waitForTimeout(6000);

  const raw = decodeURIComponent(uiPayload.replace(/^data=/, '').replace(/\+/g, ' '));
  writeFileSync('C:/Users/user/AppData/Local/Temp/claude/c--Playwright-Automation/2eb2d311-448a-41b8-ab8f-172e9678b463/scratchpad/se-ui-payload.json', raw);
  writeFileSync('C:/Users/user/AppData/Local/Temp/claude/c--Playwright-Automation/2eb2d311-448a-41b8-ab8f-172e9678b463/scratchpad/se-ui-response.json', uiResponse);
  console.log('UI RESPONSE TAIL:', clean(uiResponse).slice(-1400));
  const base = JSON.parse(raw);
  console.log('TOP-LEVEL non-empty:', JSON.stringify(Object.fromEntries(Object.entries(base).filter(([k, v]) => k !== 'items' && v !== '' && v !== 0 && v !== null))));
  console.log('ROW non-empty:', JSON.stringify(Object.fromEntries(Object.entries(base.items[0]).filter(([, v]) => v !== '' && v !== 0 && v !== null))));
  console.log('EMPTY top-level keys:', Object.keys(base).filter((k) => k !== 'items' && base[k] === '').join(','));
  console.log('EMPTY row keys:', Object.keys(base.items[0]).filter((k) => base.items[0][k] === '').join(','));

  const call = async (label: string, payload: unknown) => {
    try { const r = await api.call(EP, { data: JSON.stringify(payload) }); console.log('REPLAY', label, '=> OK', JSON.stringify(r).slice(0, 120)); return true; }
    catch (e) { console.log('REPLAY', label, '=> FAIL', String(e).replace(/\s+/g, ' ').replace(/^Error: [^ ]+ failed: /, '').slice(0, 170)); return false; }
  };
  const clone = () => JSON.parse(raw);
  await call('V0 exact UI payload', clone());
  for (const k of Object.keys(base).filter((x) => x !== 'items' && base[x] === '')) {
    const p = clone(); p[k] = null; await call(`top-level ${k}: "" -> null`, p);
  }
  for (const k of Object.keys(base.items[0]).filter((x) => base.items[0][x] === '')) {
    const p = clone(); p.items[0][k] = null; await call(`row ${k}: "" -> null`, p);
  }
});
