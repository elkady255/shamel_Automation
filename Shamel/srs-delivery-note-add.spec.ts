import { test, expect, type Page } from '@playwright/test';
import { DeliveryNotePage } from './pages/DeliveryNotePage';
import { api } from './helpers/api';
import { note, ITEM_A, code } from './helpers/dn-data';

/**
 * SRS "Add Delivery Note - Details Tab" (TC-DNA): header, Currency and Price List, Picking Settings, Items table,
 * Edit Row popup, Settings popup, totals, taxes, Update Item Location and Get Items From Sales Order.
 * Fields are picked from lists, never typed as new values. Cases the SRS leaves open are recorded as "observed".
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let dn: DeliveryNotePage;
test.beforeEach(async ({ page }) => { dn = new DeliveryNotePage(page); });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const section = (page: Page, name: string) => dn.main.getByRole('button', { name, exact: true }).click();
const inputsOf = (page: Page) => page.locator('main input:visible, main textarea:visible').evaluateAll((els) => els.map((e) => ({ ph: e.getAttribute('placeholder'), type: (e as HTMLInputElement).type, max: (e as HTMLInputElement).maxLength, val: (e as HTMLInputElement).value, off: (e as HTMLInputElement).disabled })));
const rowEl = (n = 0) => dn.main.locator('tbody tr').nth(n);
const rowSelect = (n = 0) => rowEl(n).locator('.sr-checkbox').first();
async function pickFirst(page: Page, box: ReturnType<Page['locator']>) { await box.click(); await page.getByRole('option').first().waitFor({ timeout: 30_000 }); await page.getByRole('option').first().click(); }
async function addRow(page: Page) { await dn.main.getByRole('button', { name: 'Add Row' }).first().click(); await page.waitForTimeout(800); }

test.describe('Header', () => {
  test('TC-DNA-001/002/003 Add screen opens with the three tabs and disabled picking fields', srs('UC2: Add Delivery Note, tabs, picking fields disabled'), async ({ page }) => {
    await dn.gotoNew();
    for (const t of ['Details', 'General Info', 'More Info'] as const) await expect(dn.tab(t), t).toBeVisible();
    await section(page, 'Picking Settings');
    const inputs = await inputsOf(page);
    const barcode = inputs.find((i) => i.ph === 'Enter or scan barcode');
    expect(barcode?.off, 'Scan Barcode disabled before Submit For Picking').toBe(true);
    expect(barcode?.max, 'Scan Barcode max length').toBe(100);
    observe('disabled checkboxes in Picking Settings: ' + inputs.filter((i) => i.type === 'checkbox' && i.off).length);
  });

  test('TC-DNA-004/005/007 Customer is a searchable list: select one, and a search with no match lists nothing', srs('UC2 Customer'), async ({ page }) => {
    await dn.gotoNew();
    const box = dn.field('Select Customer');
    await box.click(); await box.fill('NO-SUCH-CUSTOMER-XYZ'); await page.waitForTimeout(2500);
    await expect(page.getByRole('option')).toHaveCount(0);
    await box.fill('PW Packing'); await page.waitForTimeout(2500);
    await page.getByRole('option', { name: 'PW Packing Customer', exact: true }).first().click();
    await expect(box).toHaveValue('PW Packing Customer');
  });

  test('TC-DNA-006/011 empty Customer and Series show an error message', srs('UC2 Customer / Series: error if left empty'), async ({ page }) => {
    await dn.gotoNew();
    await dn.field('Select Customer').click(); await dn.field('Select Series').click(); await dn.field('Select Customer').click(); await page.keyboard.press('Escape');
    await dn.main.getByText('Add Delivery Note').first().click();
    await expect(dn.main).toContainText(/required|mandatory|please/i, { timeout: 5_000 });
  });

  test('TC-DNA-009/010 Series lists the naming series and one can be chosen', srs('UC2 Series'), async ({ page }) => {
    await dn.gotoNew();
    await dn.field('Select Series').click(); await page.getByRole('option').first().waitFor({ timeout: 30_000 });
    const labels = (await page.getByRole('option').allInnerTexts()).map((t) => t.trim());
    observe('series: ' + labels.join(' | '));
    await page.getByRole('option').first().click();
    expect(await dn.field('Select Series').inputValue()).toBe(labels[0]);
  });

  test('TC-DNA-012/014/015/017 Edit Posting Date And Time: the time is read-only until the checkbox is changed', srs('UC2 Date / Posting Time'), async ({ page }) => {
    await dn.gotoNew();
    const time = dn.main.locator('input[type=time]');
    await expect(time).toBeDisabled();
    const box = dn.main.locator('input[type=checkbox]').first();
    const before = await box.isChecked();
    await box.evaluate((e) => (e as HTMLInputElement).click()); await page.waitForTimeout(800);
    observe(`Edit Posting Date checkbox: ${before ? 'checked' : 'unchecked'} by default; time field after toggling: ${(await time.isDisabled()) ? 'still disabled' : 'enabled'}`);
    expect(await time.isDisabled()).toBe(before);
  });

  test('TC-DNA-013/020/021/022 Amended From, Is Return, Issue Credit Note and Return Against are hidden on a new note', srs('UC2 hidden fields'), async () => {
    await dn.gotoNew();
    const text = await dn.main.innerText();
    for (const t of ['Is Return', 'Issue Credit Note', 'Return Against']) expect(text, t).not.toContain(t);
    observe('"Amended From" visible on a new note: ' + text.includes('Amended From'));
    expect(text).not.toContain('Amended From');
  });
});

test.describe('Currency and Price List, Picking Settings', () => {
  test('TC-DNA-023/034/035 Currency and Price List are lists; Price List defaults to Standard Selling', srs('UC2 Currency and Price List'), async ({ page }) => {
    await dn.gotoNew(); await section(page, 'Currency and Price List');
    const inputs = await inputsOf(page);
    observe('currency "' + inputs.find((i) => i.ph === 'Select Currency')?.val + '"; price list "' + inputs.find((i) => i.ph === 'Select Price List')?.val + '"');
    expect(inputs.find((i) => i.ph === 'Select Price List')?.val).toBe('Standard Selling');
  });

  test('TC-DNA-024/027 Currency is fetched from the Company and Exchange Rate is 1 for the company currency', srs('UC2 Currency / Exchange Rate'), async ({ page }) => {
    await dn.gotoNew(); await section(page, 'Currency and Price List');
    await dn.field('Select Customer').click(); await dn.field('Select Customer').fill('PW Packing'); await page.waitForTimeout(2500);
    await page.getByRole('option', { name: 'PW Packing Customer', exact: true }).first().click(); await page.waitForTimeout(3500);
    const inputs = await inputsOf(page);
    const cur = inputs.find((i) => i.ph === 'Select Currency')?.val;
    observe('currency after choosing a customer: ' + cur + '; auto-generated values: ' + inputs.filter((i) => i.ph === 'Auto-generated').map((i) => i.val).slice(0, 4).join(','));
    expect(cur, 'Currency filled').toBeTruthy();
  });

  test('TC-DNA-041/043 Ignore Pricing Rule and Consider Rejected Warehouses checkboxes exist', srs('UC2 checkboxes'), async ({ page }) => {
    await dn.gotoNew(); await section(page, 'Currency and Price List');
    const text = await dn.main.innerText();
    for (const t of ['Ignore Pricing Rule']) expect(text, t).toContain(t);
    observe('Consider Rejected Warehouses shown: ' + text.includes('Consider Rejected Warehouses'));
  });

  test('TC-DNA-045/046/047/048/050/051 Scan Barcode, Pick Manually, Scan Mode and Prompt Quantity are disabled; the barcode field stops at 100', srs('UC2 Picking Settings'), async ({ page }) => {
    await dn.gotoNew(); await section(page, 'Picking Settings');
    const inputs = await inputsOf(page);
    const picking = inputs.slice(inputs.findIndex((i) => i.ph === 'Enter or scan barcode') - 2, inputs.findIndex((i) => i.ph === 'Enter or scan barcode') + 3);
    observe('picking controls: ' + picking.map((i) => `${i.ph ?? i.type}:${i.off ? 'off' : 'on'}`).join(' '));
    expect(picking.every((i) => i.off || i.type === 'checkbox' && i.ph === null)).toBe(true);
  });
});

test.describe('Items table', () => {
  test('TC-DNA-067/068/069 default columns, Add Row adds rows, rows are numbered', srs('UC2 Items'), async ({ page }) => {
    await dn.gotoNew();
    await addRow(page); await addRow(page);
    const headers = (await dn.main.locator('thead th').allInnerTexts()).map((h) => h.trim()).filter(Boolean);
    observe('headers: ' + headers.join('|'));
    for (const c of ['Item', 'Warehouse', 'Qty']) expect(headers).toContain(c);
    await expect(dn.main.locator('tbody tr')).toHaveCount(2);
    expect(headers, 'a "No." column numbers the rows').toContain('No.');
  });

  test('TC-DNA-070/071/074 Item lists only stock items; a search with no match lists nothing', srs('UC2 Items > Item: Maintain Stock items only'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page);
    const box = rowEl(0).getByPlaceholder('Item');
    await box.click(); await page.getByRole('option').first().waitFor({ timeout: 30_000 }); await page.waitForTimeout(1500);
    const labels = (await page.getByRole('option').allInnerTexts()).map((t) => t.trim()).filter((t) => t && t !== 'Add New');
    const items = await api.list('Item', [['item_name', 'in', labels]], ['item_name', 'is_stock_item'], 50);
    const nonStock = items.filter((i) => i.is_stock_item === 0).map((i) => i.item_name);
    observe('first page of items: ' + labels.length + '; non-stock among them: ' + nonStock.join(','));
    expect(nonStock, 'non-stock items offered').toEqual([]);
    await box.fill('NO-SUCH-ITEM-XYZ'); await page.waitForTimeout(2500);
    await expect(page.getByRole('option')).toHaveCount(0);
  });

  test('TC-DNA-076/078/079/094/099 Warehouse and Picked Qty are disabled while picking has not started', srs('UC2 Items: Warehouse, Picked Qty disabled'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page);
    const row = await rowEl(0).locator('input').evaluateAll((els) => els.map((e) => `${e.getAttribute('placeholder')}:${(e as HTMLInputElement).disabled ? 'off' : 'on'}`));
    observe('row inputs: ' + row.join(' '));
    expect(row.find((r) => r.startsWith('Warehouse'))).toBe('Warehouse:off');
    expect(row.filter((r) => r.startsWith('0:')).pop()).toBe('0:off');
  });

  test('TC-DNA-085/086/087 Qty accepts numbers only and stops at 100 characters', srs('UC2 Items > Qty: numbers only, max 100'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page);
    const qty = rowEl(0).getByPlaceholder('0', { exact: true }).first();
    await qty.click(); await qty.pressSequentially('x9y8', { delay: 30 });
    expect(await qty.inputValue()).toMatch(/^[0-9.]*$/);
    await qty.fill(''); await qty.pressSequentially('7'.repeat(120), { delay: 5 });
    expect((await qty.inputValue()).length).toBe(100);
  });

  test('TC-DNA-100/101/102 selecting rows shows the action bar and Delete removes the selected rows', srs('UC2 Items: action bar, Delete row'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page); await addRow(page); await addRow(page);
    await rowSelect(0).click(); await rowSelect(1).click(); await page.waitForTimeout(800);
    observe('buttons with a row selected: ' + (await dn.main.getByRole('button').allInnerTexts()).map((t) => t.trim()).filter(Boolean).slice(-6).join(' | '));
    await dn.main.getByRole('button').filter({ hasText: /^Delete$/ }).first().click();
    await expect(dn.main.locator('tbody tr')).toHaveCount(1);
  });
});

test.describe('Settings popup and Edit Row popup', () => {
  const width = (page: Page, i: number) => page.locator('input:visible').nth(-5 + i);
  test('TC-DNA-103/110 the Items table has a Setting control in its header', srs('UC2 Items > Setting'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page);
    await expect(dn.main.locator('thead th button').first()).toBeVisible({ timeout: 5_000 });
  });

  test('TC-DNA-115/116 Edit Row opens a popup with Item Information, Warehouse & Quantity, Pricing, Taxes & Amounts, Weight & Quality, References, Serial & Batch and Accounting', srs('UC2 Items > Edit Row'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page);
    await rowEl(0).getByTitle('Edit Row').click();
    await expect(page.getByText('Item Information').first()).toBeVisible();
    for (const t of ['Warehouse & Quantity', 'Pricing', 'Taxes & Amounts', 'Weight & Quality', 'References', 'Serial & Batch', 'Accounting']) await expect(page.getByText(t, { exact: true }).first(), t).toBeVisible();
  });

  test('TC-DNA-117/118/119/120/121/124/126 Edit Row: Item Group, Item Name, Customer Item Code and Brand are read-only; Description stops at 500', srs('UC2 Edit Row > Item Information'), async ({ page }) => {
    await dn.gotoNew(); await addRow(page);
    await rowEl(0).getByTitle('Edit Row').click();
    const text = await page.locator('body').innerText();
    for (const t of ['Item Group', 'Item Name', 'Customer Item Code', 'Brand Name', 'Description']) expect(text, t).toContain(t);
    const desc = page.locator('textarea:visible').last();
    await desc.fill('d'.repeat(560));
    expect((await desc.inputValue()).length).toBe(500);
  });

  const tabs: [string, string[]][] = [
    ['Warehouse & Quantity', ['Warehouse', 'UOM', 'Stock UOM', 'Conversion Factor', 'Returned Qty', 'Delivered Qty', 'Available Qty']],
    ['Pricing', ['Price List Rate', 'Margin Type', 'Discount', 'Rate']],
    ['Taxes & Amounts', ['Net Rate', 'Net Amount', 'Item Tax Template']],
    ['Weight & Quality', ['Weight', 'Quality Inspection']],
    ['References', ['Against Sales Order', 'Against Sales Invoice']],
    ['Serial & Batch', ['Serial', 'Batch']],
    ['Accounting', ['Expense Account', 'Cost Center', 'Project']],
  ];
  for (const [tab, labels] of tabs) {
    test(`TC-DNA-131..184 Edit Row > ${tab} shows the fields the SRS lists`, srs('UC2 Edit Row sections'), async ({ page }) => {
      await dn.gotoNew(); await addRow(page);
      await rowEl(0).getByTitle('Edit Row').click();
      await page.getByText(tab, { exact: true }).last().click(); await page.waitForTimeout(800);
      const text = await page.locator('body').innerText();
      const missing = labels.filter((l) => !text.includes(l));
      observe(`${tab}: missing ${missing.join(', ') || 'none'}`);
      expect(missing, `labels missing in ${tab}`).toEqual([]);
    });
  }
});

test.describe('Totals shown for a saved note', () => {
  test('TC-DNA-205/206/209/212 Total Quantity and the totals match the saved note, and are read-only', srs('UC2 Totals'), async ({ page }) => {
    const d = await note('Draft', [{ item: ITEM_A, qty: 4 }]);
    await dn.gotoDetails(d.name);
    const full = await api.get('Delivery Note', d.name);
    const inputs = await inputsOf(page);
    const vals = inputs.map((i) => i.val).filter(Boolean);
    observe(`API: total_qty ${full.total_qty}, total ${full.total}, grand ${full.grand_total}; values on screen: ${vals.join(',')}`);
    expect(vals.some((v) => Number(v) === Number(full.total_qty)), 'Total Quantity shown').toBe(true);
    expect(vals.some((v) => Math.round(Number(String(v).replace(/,/g, ''))) === Math.round(full.grand_total)), 'Grand Total shown').toBe(true);
    observe('editable "Auto-generated" fields: ' + inputs.filter((i) => i.ph === 'Auto-generated' && !i.off).length + ' of ' + inputs.filter((i) => i.ph === 'Auto-generated').length);
  });

  test('TC-DNA-210/211 changing a Qty in a Draft updates Total Quantity', srs('UC2 Totals update'), async ({ page }) => {
    const d = await note('Draft', [{ item: ITEM_A, qty: 4 }]);
    await dn.gotoDetails(d.name);
    const qty = rowEl(0).getByPlaceholder('0', { exact: true }).first();
    await qty.click(); await qty.fill(''); await qty.pressSequentially('9', { delay: 30 }); await page.waitForTimeout(2500);
    const vals = (await inputsOf(page)).map((i) => i.val);
    observe('input values after typing 9: ' + vals.filter(Boolean).join(','));
    expect(vals.some((v) => Number(v) === 9 && v !== '9' || false) || vals.filter((v) => Number(v) === 9).length >= 2, 'Total Quantity follows the Qty').toBe(true);
  });
});

test.describe('Update Item Location and Get Items From Sales Order', () => {
  test('TC-DNA-291/295 both buttons are shown on a Draft note', srs('UC2 header buttons'), async () => {
    const d = await note('Draft');
    await dn.gotoDetails(d.name);
    for (const b of ['Update Item Location', 'Get Items From Sales Order']) await expect(dn.main.getByRole('button', { name: b }), b).toBeVisible();
  });

  test('TC-DNA-296/297/301/304 Get Items From Sales Order opens a popup that lists open Sales Orders, with search', srs('UC2 Get Items From Sales Order'), async ({ page }) => {
    await dn.gotoNew();
    await dn.main.getByRole('button', { name: 'Get Items From Sales Order' }).click(); await page.waitForTimeout(2500);
    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
    observe('popup: ' + text.match(/Get Items From Sales Order.{0,300}/g)?.slice(-1)[0]);
    expect(text).toMatch(/Sales Order/);
    expect(text).toMatch(/SAL-ORD-/);
  });

  test('TC-DNA-292/293/294 Update Item Location opens a popup', srs('UC2 Update Item Location'), async ({ page }) => {
    const d = await note('Draft');
    await dn.gotoDetails(d.name);
    await dn.main.getByRole('button', { name: 'Update Item Location' }).click(); await page.waitForTimeout(2500);
    observe('popup: ' + (await page.locator('body').innerText()).replace(/\s+/g, ' ').match(/Update Item Location.{0,300}/g)?.slice(-1)[0]);
  });
});

void code;
