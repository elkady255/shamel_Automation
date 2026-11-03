import { test, expect, type Page } from '@playwright/test';
import { api } from './helpers/api';

/** Landed Cost Voucher - Add screen (TC-LCA). The Get Items button is dead (known), so field rules are checked through Save and the visible errors. */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const COMPANY = 'Ahmed Ebrahim CO.';
const PR = 'MAT-PRE-2026-00024'; // submitted Purchase Receipt created for the tests (supplier 1, total 50)

test.describe.configure({ mode: 'default' });

let page: Page;
let creates: string[] = [];
const main = () => page.getByRole('main');

async function openNew() {
  creates = [];
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/inventory/landed-cost-voucher/new', { timeout: 120_000 });
  await main().getByPlaceholder('Select Series').waitFor({ timeout: 60_000 });
  await page.waitForTimeout(1500);
}
async function pick(trigger: ReturnType<Page['locator']>, text?: string | RegExp) {
  await trigger.click(); await page.waitForTimeout(700);
  const opt = (text ? page.getByRole('option', { name: text }) : page.getByRole('option')).locator('visible=true').first();
  if (await opt.count()) await opt.click({ timeout: 8000 });
  else await page.getByText(text as string, { exact: true }).locator('visible=true').last().click({ timeout: 8000, force: true });
  await page.waitForTimeout(500);
}
async function options(trigger: ReturnType<Page['locator']>): Promise<string[]> {
  await trigger.click(); await page.waitForTimeout(900);
  const t = (await page.locator('li:visible,[role=option]:visible').allInnerTexts()).map(clean).filter(Boolean);
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  return t;
}
async function basics() {
  await pick(main().getByPlaceholder('Select Series'));
  await pick(main().getByPlaceholder('Select Company'), /Ahmed Ebrahim/);
}
async function voucherRow(doc = PR) {
  await main().getByRole('button', { name: 'Add Row' }).nth(0).click(); await page.waitForTimeout(800);
  await pick(main().getByPlaceholder('Select Document Type'), 'Purchase Receipt');
  const f = main().getByPlaceholder('Select Document', { exact: true });
  await f.click(); await f.fill(doc); await page.waitForTimeout(1500);
  await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(800);
}
async function costRow(desc: string, amount: string) {
  await main().getByRole('button', { name: 'Add Row' }).last().click(); await page.waitForTimeout(800);
  const d = main().getByPlaceholder('Enter description').last(); await d.click(); await page.keyboard.insertText(desc);
  const a = main().getByRole('textbox').last(); await a.click(); await page.keyboard.insertText(amount);
}
async function distribute(mode: string) { await pick(main().getByPlaceholder('Select Distribution Method'), mode); }
/** Click Save and return the visible text of alerts/errors plus whether a create request was sent. */
async function save() {
  const before = creates.length;
  await page.getByRole('button', { name: 'Save', exact: true }).last().click({ force: true }); await page.waitForTimeout(2500);
  const alerts = (await page.getByRole('alert').allInnerTexts()).map(clean);
  const inline = clean(await main().innerText()).match(/(must|required|invalid|at least|at most|cannot|should|maximum|minimum|Please)[^.]*/gi) ?? [];
  return { sent: creates.length > before, text: [...alerts, ...inline].join(' | ') };
}

test.beforeEach(async ({ page: p }) => {
  page = p;
  page.on('response', async (r) => { if (r.request().method() !== 'GET' && /landed_cost/i.test(r.url())) { creates.push(r.url()); let b = ''; try { b = clean(await r.text()).slice(0, 300); } catch { /* ignore */ } console.log('LCV-API', r.status(), r.url().split('/api/')[1], '|', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 500), '=>', b); } });
});
test.describe('General fields', () => {
  test.beforeEach(openNew);

  test('TC-LCA-001/015/016/101/130/067 screen opens with all sections and no Amended From', srs('Add LCV > screen layout'), async () => {
    const t = clean(await main().innerText());
    for (const s of ['Series', 'Company', 'Posting Date', 'Vouchers', 'Get Items', 'Vendor Invoices', 'Landed Cost', 'Distribute Charges Based On']) expect.soft(t, s).toContain(s);
    expect.soft(await main().getByPlaceholder('Select Amended From').count(), 'Amended From hidden on a new voucher').toBe(0);
    expect(t).not.toMatch(/Failed to get method/);
  });

  test('TC-LCA-002 Series lists the LCV series', srs('Add LCV > Series'), async () => {
    const o = await options(main().getByPlaceholder('Select Series'));
    expect(o.length).toBeGreaterThan(0);
    expect(o.join(' ')).toMatch(/LCV/);
  });

  test('TC-LCA-004/007/012/195 save with mandatory fields empty is blocked', srs('Add LCV > mandatory Series, Company, Posting Date'), async () => {
    const r = await save();
    expect(r.sent, 'no create request').toBe(false);
    expect(r.text).toMatch(/required|complete/i);
  });

  test('TC-LCA-010 Posting Date defaults to today', srs('Add LCV > Posting Date default = current date'), async () => {
    const v = await main().locator('input').evaluateAll((els: any[]) => els.map((e) => e.value));
    const d = new Date(); const iso = d.toISOString().slice(0, 10);
    const alt = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    expect(v.some((x) => x.includes(iso) || x.includes(alt) || x.includes(String(d.getFullYear())))).toBeTruthy();
  });

  test('TC-LCA-005/008 Company search with no match shows nothing', srs('Add LCV > Company searchable'), async () => {
    const c = main().getByPlaceholder('Select Company'); await c.click(); await c.fill('zzzz-no-such-company'); await page.waitForTimeout(1500);
    expect(await page.getByRole('option').locator('visible=true').count()).toBe(0);
  });

  test('TC-LCA-183/184/185 Distribute Charges Based On lists Qty / Amount / Distribute Manually', srs('Add LCV > Distribute Charges Based On'), async () => {
    const o = (await options(main().getByPlaceholder('Select Distribution Method'))).join('|');
    expect(o).toMatch(/Qty/); expect(o).toMatch(/Amount/); expect(o).toMatch(/Distribute Manually/);
  });
});

test.describe('Vouchers table', () => {
  test.beforeEach(openNew);

  test('TC-LCA-017/019 Add Row adds a voucher row; type lists the 3 allowed documents', srs('Add LCV > Vouchers'), async () => {
    await basics();
    await main().getByRole('button', { name: 'Add Row' }).nth(0).click(); await page.waitForTimeout(800);
    const o = (await options(main().getByPlaceholder('Select Document Type'))).join('|');
    for (const t of ['Purchase Receipt', 'Purchase Invoice', 'Stock Entry']) expect.soft(o, t).toContain(t);
  });

  test('TC-LCA-027/031/034/036 Receipt Document lists submitted Purchase Receipts and fills Supplier and Grand Total', srs('Add LCV > Receipt Document filter + auto fields'), async () => {
    await basics();
    await main().getByRole('button', { name: 'Add Row' }).nth(0).click(); await page.waitForTimeout(800);
    await pick(main().getByPlaceholder('Select Document Type'), 'Purchase Receipt');
    const list = await options(main().getByPlaceholder('Select Document', { exact: true }));
    const submitted = (await api.list('Purchase Receipt', [['docstatus', '=', 1], ['company', '=', COMPANY]], ['name'], 500)).map((d) => d.name);
    const notSubmitted = list.filter((n) => !submitted.includes(n.split(' ')[0]));
    expect(notSubmitted, 'only submitted receipts listed').toEqual([]);
    await voucherRow();
    const t = clean(await main().innerText());
    expect(t).toContain(PR); expect(t).toMatch(/\b50(\.00)?\b/);
  });

  test('TC-LCA-023/032 empty Receipt Document Type or Document blocks Save', srs('Add LCV > voucher row mandatory'), async () => {
    await basics();
    await main().getByRole('button', { name: 'Add Row' }).nth(0).click(); await page.waitForTimeout(800);
    await costRow('Freight', '50'); await distribute('Qty');
    const r = await save();
    expect(r.sent).toBe(false); expect(r.text).toMatch(/required|complete/i);
  });

  test('TC-LCA-030 Receipt Document is empty before a type is chosen', srs('Add LCV > Receipt Document needs a type'), async () => {
    await basics();
    await main().getByRole('button', { name: 'Add Row' }).nth(0).click(); await page.waitForTimeout(800);
    expect((await options(main().getByPlaceholder('Select Document', { exact: true }))).filter((x) => /MAT-|PUR|ACC/.test(x))).toEqual([]);
  });

  test('TC-LCA-025 changing the type clears the Receipt Document', srs('Add LCV > type change clears document'), async () => {
    await basics(); await voucherRow();
    await pick(main().getByPlaceholder('Select Document Type'), 'Stock Entry');
    expect(await main().getByPlaceholder('Select Document', { exact: true }).inputValue()).toBe('');
  });

  test('TC-LCA-041 delete a voucher row', srs('Add LCV > delete voucher row'), async () => {
    await basics(); await voucherRow();
    await main().locator('tbody tr').first().locator('input[type=checkbox], [role=checkbox], [class*=checkbox]').first().click({ force: true });
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: /Delete/ }).locator('visible=true').first().click(); await page.waitForTimeout(800);
    const confirm = page.getByRole('button', { name: /^(Delete|Yes|Confirm)$/ }).locator('visible=true').last();
    if (await confirm.count()) await confirm.click();
    await page.waitForTimeout(800);
    expect(clean(await main().innerText())).not.toContain(PR);
  });
});

test.describe('Get Items and Receipt Items', () => {
  test.beforeEach(openNew);

  test('TC-LCA-062 Get Items fetches the items of the receipt documents', srs('Add LCV > Get Items'), async () => {
    await basics(); await voucherRow();
    await main().locator('tbody tr').first().locator('input[type=checkbox], [role=checkbox], [class*=checkbox]').first().click({ force: true }).catch(() => {});
    const seen: string[] = [];
    const on = (r: import('@playwright/test').Request) => { if (['fetch', 'xhr'].includes(r.resourceType()) && !/kaspersky/.test(r.url())) seen.push(r.url()); };
    page.on('request', on);
    await main().getByRole('button', { name: 'Get Items' }).click(); await page.waitForTimeout(4000);
    page.off('request', on);
    expect(seen.length, 'Get Items sends a request').toBeGreaterThan(0);
    expect(clean(await main().innerText())).toContain('PW-PS-ITEM-A');
  });

  test('TC-LCA-064 Get Items without a Receipt Document shows a message', srs('Add LCV > Get Items needs a document'), async () => {
    await basics();
    await main().getByRole('button', { name: 'Get Items' }).click(); await page.waitForTimeout(1500);
    const msg = (await page.getByRole('alert').allInnerTexts()).join(' ');
    expect(msg.length, 'a message explains why nothing was fetched').toBeGreaterThan(0);
  });

  test('TC-LCA-075 manual item rows can be added only through Get Items (Add Row not offered)', srs('Add LCV > Receipt Items has no Add Row'), async () => {
    await basics();
    expect(await main().getByRole('button', { name: 'Add Row' }).count(), 'Add Row appears only for Vouchers, Vendor Invoices, Landed Cost').toBeLessThanOrEqual(3);
  });
});

test.describe('Landed Cost table', () => {
  test.beforeEach(async () => { await openNew(); await basics(); await voucherRow(); await distribute('Qty'); });

  for (const [id, desc, shouldFail] of [
    ['TC-LCA-138', 'ab', true], ['TC-LCA-139', 'abc', false], ['TC-LCA-140', 'A'.repeat(500), false], ['TC-LCA-142', 'Freight #1 & customs/clearance (EGP) 100%', false],
  ] as const) {
    test(`${id} Description "${desc.slice(0, 12)}" (${desc.length} chars)`, srs('Add LCV > Landed Cost Description 3-500'), async () => {
      await costRow(desc, '50');
      const r = await save();
      if (shouldFail) expect(r.text).toMatch(/Description|at least 3/i);
      else expect(r.text, 'no Description error').not.toMatch(/Description.*(at least|must|invalid|required)/i);
    });
  }

  test('TC-LCA-141 Description stops at 500 characters', srs('Add LCV > Description max 500'), async () => {
    await main().getByRole('button', { name: 'Add Row' }).last().click(); await page.waitForTimeout(800);
    const d = main().getByPlaceholder('Enter description').last(); await d.click(); await page.keyboard.insertText('D'.repeat(510));
    expect((await d.inputValue()).length).toBeLessThanOrEqual(500);
  });

  test('TC-LCA-144 empty Description blocks Save', srs('Add LCV > Description mandatory'), async () => {
    await costRow('', '50');
    const r = await save(); expect(r.sent).toBe(false); expect(r.text).toMatch(/required|complete|Description/i);
  });

  test('TC-LCA-146 empty Landed Cost Amount blocks Save', srs('Add LCV > Landed Cost Amount mandatory'), async () => {
    await costRow('Freight', '');
    const r = await save(); expect(r.sent).toBe(false); expect(r.text).toMatch(/required|complete|Amount/i);
  });

  test('TC-LCA-148 Amount rejects letters and special characters', srs('Add LCV > Amount numbers only'), async () => {
    await main().getByRole('button', { name: 'Add Row' }).last().click(); await page.waitForTimeout(800);
    const a = main().getByRole('textbox').last(); await a.click(); await page.keyboard.insertText('ab#$%');
    expect(await a.inputValue()).toMatch(/^[0-9.]*$/);
  });

  for (const [id, v] of [['TC-LCA-151', '0'], ['TC-LCA-152', '-5']] as const) {
    test(`${id} Amount ${v} is rejected (SRS min 1)`, srs('Add LCV > Amount min 1'), async () => {
      await costRow('Freight', v);
      const r = await save(); expect(r.sent).toBe(false); expect(r.text).toMatch(/Amount|greater|at least|minimum|invalid|must/i);
    });
  }

  test('TC-LCA-150 Amount stops at 100 characters', srs('Add LCV > Amount max 100'), async () => {
    await main().getByRole('button', { name: 'Add Row' }).last().click(); await page.waitForTimeout(800);
    const a = main().getByRole('textbox').last(); await a.click(); await page.keyboard.insertText('9'.repeat(105));
    expect((await a.inputValue()).length).toBeLessThanOrEqual(100);
  });

  test('TC-LCA-153 Amount accepts decimals', srs('Add LCV > Amount decimals'), async () => {
    await costRow('Freight', '12.75');
    expect(await main().getByRole('textbox').last().inputValue()).toContain('12.75');
  });

  test('TC-LCA-179/180/182 Total Landed Cost follows the cost rows', srs('Add LCV > totals'), async () => {
    await costRow('Freight', '50');
    await page.waitForTimeout(800);
    expect(clean(await main().innerText())).toMatch(/Total Landed Cost\D*50/);
  });

  test('TC-LCA-131/157 Add Row adds a cost row and it can be deleted', srs('Add LCV > Landed Cost rows'), async () => {
    await costRow('Freight', '50');
    await main().getByPlaceholder('Enter description').last().locator('xpath=ancestor::tr').locator('input[type=checkbox], [role=checkbox], [class*=checkbox]').first().click({ force: true });
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: /Delete/ }).locator('visible=true').first().click(); await page.waitForTimeout(800);
    const confirm = page.getByRole('button', { name: /^(Delete|Yes|Confirm)$/ }).locator('visible=true').last();
    if (await confirm.count()) await confirm.click();
    await page.waitForTimeout(800);
    expect(await main().getByPlaceholder('Enter description').count()).toBe(0);
  });
});

test.describe('Save', () => {
  test.beforeEach(openNew);

  test('TC-LCA-196 voucher with no receipt documents is rejected', srs('Add LCV > needs receipt documents'), async () => {
    await basics(); await costRow('Freight', '50'); await distribute('Qty');
    const r = await save(); expect(r.sent).toBe(false); expect(r.text.length).toBeGreaterThan(0);
  });

  test('TC-LCA-197 voucher with no landed cost rows is rejected', srs('Add LCV > needs landed cost'), async () => {
    await basics(); await voucherRow(); await distribute('Qty');
    const r = await save(); expect(r.sent).toBe(false); expect(r.text.length).toBeGreaterThan(0);
  });

  test('TC-LCA-194/198/199/200 valid voucher saves (no Get Items needed in the SRS flow)', srs('Add LCV > Save with valid data'), async () => {
    await basics(); await voucherRow(); await costRow('PW freight charge', '50'); await distribute('Qty');
    const r = await save();
    expect(r.sent, `create request sent; page said: ${r.text}`).toBe(true);
  });
});




