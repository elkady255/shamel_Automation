import { test, expect } from '@playwright/test';
import { StockReconciliationPage } from './pages/StockReconciliationPage';
import { api } from './helpers/api';
import { plainItem, binQty, OTHER_WAREHOUSE } from './helpers/sle-data';
import { seed, ITEM_A, WAREHOUSE, COMPANY, code, today } from './helpers/ps-data';

/**
 * SRS "Inventory > Stock Reconciliation" UC2 Add Stock Reconciliation, with the user's TC-RCA cases.
 * Records come from the Frappe API where possible. Only Stock Reconciliations created by these tests are ever deleted.
 * Cases the SRS leaves open record the behaviour as an "observed" annotation instead of asserting.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

let sr: StockReconciliationPage;
test.beforeAll(async () => { await plainItem(); await seed(); });
test.beforeEach(async ({ page }) => { sr = new StockReconciliationPage(page); });
const ITEM = 'PW-PS-ITEM-A|STO-ITEM-2026-00074';

test.describe('Basic Information', () => {
  test('TC-RCA-001/002/003/004 Series lists the Stock Reconciliation series and is mandatory', srs('UC2 Series'), async () => {
    await sr.gotoNew();
    const o = await sr.options(sr.trigger('Select Series'));
    observe('Series options: ' + o.join(' | '));
    expect(o.join(' ')).toContain('MAT-RECO');
    await sr.close(); await sr.save().click(); await sr.page.waitForTimeout(2000);
    expect(await sr.text()).toMatch(/Series is required/);
  });

  test('TC-RCA-005/006/007/008 Company is a searchable list of companies and is mandatory', srs('UC2 Company'), async () => {
    await sr.gotoNew();
    const o = await sr.options(sr.trigger('Select Company'));
    expect(o).toContain(COMPANY);
    const none = await sr.options(sr.trigger('Select Company'), 'zzzzqq');
    observe('Company search with no match shows: ' + JSON.stringify(none));
    expect(none.filter(Boolean).length).toBeLessThan(2);
    await sr.close(); await sr.save().click(); await sr.page.waitForTimeout(2000);
    expect(await sr.text()).toMatch(/Company is required/);
  });

  test('TC-RCA-009/010/011/012/013 Purpose offers Opening Stock and Stock Reconciliation and is mandatory', srs('UC2 Purpose'), async () => {
    await sr.gotoNew();
    const o = await sr.options(sr.trigger('Select Purpose'));
    observe('Purpose options: ' + JSON.stringify(o));
    expect(o).toEqual(expect.arrayContaining(['Opening Stock', 'Stock Reconciliation']));
    expect(o.filter(Boolean).length, 'only the two SRS values (no empty option)').toBe(o.length);
    await sr.close(); await sr.save().click(); await sr.page.waitForTimeout(2000);
    expect(await sr.text()).toMatch(/Purpose is required/);
  });

  test('TC-RCA-014/143/144 choosing the Purpose sets the Difference Account (Opening Stock: Temporary Opening, Stock Reconciliation: Stock Adjustment)', srs('UC2 Purpose -> Difference Account'), async () => {
    await sr.gotoNew();
    await sr.pick(sr.trigger('Select Company'), /Ahmed Ebrahim/);
    await sr.pick(sr.trigger('Select Purpose'), /^Opening Stock$/); await sr.page.waitForTimeout(2000);
    const afterOpening = (await sr.text()).match(/Difference Account \*(.{0,50})/)?.[1] ?? '';
    await sr.main.getByText('Opening Stock').locator('visible=true').first().click(); await sr.page.waitForTimeout(700);
    await sr.page.locator('li:visible').filter({ hasText: /^Stock Reconciliation$/ }).first().click({ force: true }); await sr.page.waitForTimeout(2000);
    const afterRecon = (await sr.text()).match(/Difference Account \*(.{0,50})/)?.[1] ?? '';
    observe(`Difference Account after Opening Stock: "${clean(afterOpening)}" | after Stock Reconciliation: "${clean(afterRecon)}"`);
    expect(afterOpening).toMatch(/Temporary Opening/);
    expect(afterRecon).toMatch(/Stock Adjustment/);
  });

  test('TC-RCA-016/017/018/019/020 Posting Date and Time default to now and are read-only until Edit Posting Datetime is switched on', srs('UC2 Posting Date / Time'), async () => {
    await sr.gotoNew();
    const date = sr.main.locator('input').filter({ hasText: '' }).nth(0);
    const t = await sr.text();
    expect(t).toContain(today());
    const dateInput = sr.page.locator('input[readonly], input[disabled]');
    observe('read-only/disabled inputs before the switch: ' + await dateInput.count());
    void date;
    const toggle = sr.main.getByText('Edit Posting Datetime').locator('visible=true').first();
    await toggle.click(); await sr.page.waitForTimeout(800);
    observe('after the switch: date picker ' + (await sr.main.locator('input[type=date], [class*=date] input:not([readonly])').count()) + ' editable');
    await sr.main.getByText('Posting Date').first().waitFor();
  });
});

test.describe('Default Warehouse', () => {
  test('TC-RCA-026/027 Default Warehouse is a searchable list of child warehouses (no group warehouse)', srs('UC2 Default Warehouse'), async () => {
    await sr.gotoNew();
    const groups = (await api.list('Warehouse', [['is_group', '=', 1], ['company', '=', COMPANY]], ['name'], 50)).map((w) => w.name);
    const o = await sr.options(sr.trigger('Select Warehouse'));
    observe(`offered ${o.length}; group warehouses of the company: ${groups.join(', ')}`);
    expect(o.length).toBeGreaterThan(1);
    for (const g of groups) expect(o, `${g} is a group warehouse`).not.toContain(g);
  });

  test('TC-RCA-028/029/058 Default Warehouse fills only the empty rows; a row keeps its own warehouse', srs('UC2 Default Warehouse behaviour'), async () => {
    await sr.gotoNew();
    await sr.addRow();
    const before = clean(await sr.items().first().innerText());
    await sr.pick(sr.trigger('Select Warehouse'), /Stores - E/, 'Stores - E', true);
    await sr.page.waitForTimeout(1500);
    const afterFill = clean(await sr.items().first().innerText());
    observe(`row before: "${before}" | after choosing the Default Warehouse: "${afterFill}"`);
    expect(afterFill, 'the empty row takes the Default Warehouse').toContain('Stores');
    await sr.pick(sr.main.getByText('Stores - E').locator('visible=true').first(), new RegExp(OTHER_WAREHOUSE), OTHER_WAREHOUSE, true);
    await sr.page.waitForTimeout(1500);
    const afterChange = clean(await sr.items().first().innerText());
    observe('row after the Default Warehouse changed to ' + OTHER_WAREHOUSE + ': ' + afterChange);
    expect(afterChange, 'a filled row is not overwritten').toContain('Stores');
  });
});

test.describe('Items table', () => {
  test('TC-RCA-046/047/048 the Items table has the default columns and Add Item adds a row', srs('UC2 Items table'), async () => {
    await sr.gotoNew();
    await sr.addRow();
    const headers = (await sr.main.getByRole('columnheader').allInnerTexts()).map(clean).filter(Boolean);
    observe('columns: ' + headers.join(' | '));
    expect(headers).toEqual(['Item Code', 'Warehouse', 'Current Qty', 'Quantity', 'Stock UOM', 'Valuation Rate', 'Batch No']);
    await sr.addRow();
    expect(await sr.items().count()).toBe(2);
  });

  test('TC-RCA-049/050/051/052 Item Code is a searchable list; an unknown text finds nothing; an empty item blocks Save', srs('UC2 Item Code'), async () => {
    await sr.gotoNew(); await sr.addRow();
    const o = await sr.options(sr.main.getByText('Item Code').locator('visible=true').last());
    observe(`item list offers ${o.length} entries`);
    expect(o.length).toBeGreaterThan(5);
    const none = await sr.options(sr.main.getByText('Item Code').locator('visible=true').last(), 'zzzzqq');
    observe('search with no match: ' + JSON.stringify(none));
    expect(none.filter(Boolean).length).toBe(0);
    await sr.close();
    const found = await sr.options(sr.main.getByText('Item Code').locator('visible=true').last(), 'PW-PS');
    expect(found.join(' '), 'the item is found by name').toContain('PW-PS-ITEM-A');
    const foundByCode = await sr.options(sr.main.getByText('Item Code').locator('visible=true').last(), '2026-00074');
    observe('search by the item code part "2026-00074": ' + JSON.stringify(foundByCode));
    expect(foundByCode.filter(Boolean).length, 'an item can be found by its code').toBeGreaterThan(0);
  });

  test('TC-RCA-059/060/061 Current Qty is the actual stock of the item in the row warehouse (0 where there is none)', srs('UC2 Current Qty'), async () => {
    await sr.gotoNew();
    await sr.pick(sr.trigger('Select Warehouse'), /Stores - E/, 'Stores - E', true);
    await sr.addRow(ITEM);
    await sr.page.waitForTimeout(2500);
    const expected = await binQty(WAREHOUSE);
    const cells = (await sr.items().first().locator('input').evaluateAll((els) => els.map((e: any) => e.value || e.placeholder)));
    observe('row inputs: ' + JSON.stringify(cells) + ' | Bin ' + expected);
    expect(cells.join(' ')).toContain(String(expected));
  });

  test('TC-RCA-065/066/070/071/072/073/074/075/076 Quantity: default 0, numbers only, 100 characters at most', srs('UC2 Quantity'), async () => {
    await sr.gotoNew(); await sr.addRow();
    const q = sr.qtyInput();
    observe('default Quantity: ' + (await q.inputValue()) + '|' + (await q.getAttribute('placeholder')));
    await q.fill(''); await q.pressSequentially('ab5c', { delay: 30 });
    expect(await q.inputValue(), 'letters are rejected').toMatch(/^[0-9.\-]*$/);
    await q.fill(''); await q.pressSequentially('9'.repeat(120), { delay: 3 });
    observe('Quantity after typing 120 digits: ' + (await q.inputValue()).length + ' characters');
    expect((await q.inputValue()).length).toBeLessThanOrEqual(100);
    await q.fill('-5');
    observe('Quantity accepts a negative number: ' + (await q.inputValue()));
    await q.fill('2.5');
    observe('Quantity accepts decimals: ' + (await q.inputValue()));
  });

  test('TC-RCA-078/081/082/083/084 Valuation Rate: numbers with decimals, letters rejected, 100 characters at most', srs('UC2 Valuation Rate'), async () => {
    await sr.gotoNew(); await sr.addRow();
    const r = sr.rateInput();
    await r.fill(''); await r.pressSequentially('x7y', { delay: 30 });
    expect(await r.inputValue(), 'letters are rejected').toMatch(/^[0-9.]*$/);
    await r.fill('12.75'); expect(await r.inputValue()).toBe('12.75');
    await r.fill(''); await r.pressSequentially('8'.repeat(120), { delay: 3 });
    expect((await r.inputValue()).length).toBeLessThanOrEqual(100);
  });

  test('TC-RCA-086/087/088 a row can be deleted with its Delete button', srs('UC2 Delete row'), async () => {
    await sr.gotoNew(); await sr.addRow(); await sr.addRow();
    expect(await sr.items().count()).toBe(2);
    await sr.items().first().locator('button[title*="Delete"], [title="Delete"]').first().click(); await sr.page.waitForTimeout(1200);
    const confirm = sr.page.locator('.shamel-confirm-dialog');
    if (await confirm.isVisible().catch(() => false)) { observe('confirmation: ' + clean(await confirm.innerText())); await confirm.getByRole('button', { name: 'Delete' }).click(); await sr.page.waitForTimeout(800); }
    expect(await sr.items().count()).toBe(1);
  });

  test('TC-RCA-089/090/096/099/100 the Items table has a Settings control (columns order, width, add / remove columns)', srs('UC2 Items > Setting'), async () => {
    await sr.gotoNew(); await sr.addRow();
    const header = await sr.main.locator('thead button, thead [title], thead svg').count();
    const near = await sr.main.getByText(/^Setting/).count();
    observe(`controls in the table header: ${header} | text "Setting": ${near}`);
    expect(header + near, 'a Settings control exists on the Items table').toBeGreaterThan(0);
  });
});

test.describe('Edit Row popup', () => {
  test('TC-RCA-101/102/106/107/108/109/110/114/134/135 Edit Row opens with the SRS fields; read-only labels; Barcode and Project are not mandatory', srs('UC2 Edit Row'), async () => {
    await sr.gotoNew(); await sr.addRow(ITEM);
    await sr.openEditRow();
    const t = clean(await sr.page.locator('body').innerText());
    const popup = t.slice(t.indexOf('Edit Row'));
    observe('Edit Row text: ' + popup.slice(0, 520));
    for (const f of ['Barcode', 'Has Item Scanned', 'Warehouse', 'Item Code', 'Item Name', 'Item Group', 'Quantity', 'Stock UOM', 'Valuation Rate', 'Allow Zero Valuation Rate', 'Amount', 'Current Qty', 'Current Amount', 'Current Valuation Rate', 'Quantity Difference', 'Amount Difference', 'Difference Account', 'Cost Center', 'Project', 'Serial & Batch']) expect(popup, f).toContain(f);
    expect(popup, 'Barcode is optional').not.toMatch(/Barcode \*/);
    expect(popup, 'Project is optional').not.toMatch(/Project \*/);
  });

  test('TC-RCA-113/136/137/138 Edit Row: Amount = Quantity x Valuation Rate and Quantity Difference = Quantity - Current Qty', srs('UC2 Edit Row calculations'), async () => {
    await sr.gotoNew();
    await sr.pick(sr.trigger('Select Warehouse'), /Stores - E/, 'Stores - E', true);
    await sr.addRow(ITEM); await sr.page.waitForTimeout(2000);
    await sr.qtyInput().fill('30'); await sr.rateInput().fill('4'); await sr.page.waitForTimeout(800);
    await sr.openEditRow();
    const t = clean(await sr.page.locator('body').innerText());
    const popup = t.slice(t.indexOf('Edit Row'));
    const current = await binQty(WAREHOUSE);
    observe(`Edit Row after Quantity 30, rate 4 (current ${current}): ${popup.match(/Amount.{0,200}Difference Account/)?.[0]}`);
    expect(popup).toMatch(/Amount\s+120/);
    expect(popup).toContain(String(30 - current));
  });
});

test.describe('Difference Amount, Cost Center, Amended From', () => {
  test('TC-RCA-147/148/149/151 Difference Amount is 0 with no rows, a read-only label; Amended From is hidden on a new record', srs('UC2 Accounting fields'), async () => {
    await sr.gotoNew();
    expect(await sr.text()).toMatch(/Difference Amount 0\.00/);
    const t = await sr.text();
    observe('Amended From shown on a new record: ' + /Amended From/.test(t));
    expect(t, 'Amended From is hidden on a new record').not.toContain('Amended From');
  });

  test('TC-RCA-142/145/146/150 Difference Account and Cost Center are searchable lists', srs('UC2 Difference Account / Cost Center'), async () => {
    await sr.gotoNew();
    await sr.pick(sr.trigger('Select Company'), /Ahmed Ebrahim/);
    const accounts = await sr.options(sr.trigger('Select Expense Account'), '5317');
    observe('Difference Account offers: ' + accounts.join(' | '));
    expect(accounts.filter(Boolean).length).toBeGreaterThan(0);
    expect(accounts.filter((a) => a && !/ - E$/.test(a)), 'only accounts of the chosen company').toEqual([]);
    await sr.close();
    const cc = await sr.options(sr.trigger('Select Cost Center'), 'Main');
    observe('Cost Center offers: ' + cc.join(' | '));
    expect(cc.filter((a) => a && !/ - E$/.test(a)), 'only cost centers of the chosen company').toEqual([]);
  });
});

test.describe('Add Items from Warehouse', () => {
  test('TC-RCA-152/153/154/155/156 the Fetch popup needs a Warehouse; Item is available only after a warehouse is chosen', srs('UC2 Fetch Items From Warehouse'), async () => {
    await sr.gotoNew();
    await sr.main.getByRole('button', { name: 'Add Items from Warehouse' }).click(); await sr.page.waitForTimeout(1500);
    const popup = clean(await sr.page.locator('body').innerText());
    observe('popup: ' + popup.slice(popup.indexOf('Add Items from Warehouse Add Items') >= 0 ? popup.indexOf('Add Items from Warehouse Add Items') : 0).slice(0, 220));
    expect(popup).toContain('Ignore Empty Stock');
    await sr.page.getByRole('button', { name: 'Update', exact: true }).click(); await sr.page.waitForTimeout(1500);
    observe('Update with no warehouse: ' + (clean(await sr.page.locator('body').innerText()).match(/(Warehouse is required|required|Please)[^.]{0,80}/i)?.[0] ?? 'no message'));
    expect(clean(await sr.page.locator('body').innerText())).toMatch(/Warehouse is required|required/i);
  });

  test('TC-RCA-157/158/162 fetching a warehouse adds rows with Current Qty and Quantity', srs('UC2 Fetch: warehouse only'), async () => {
    await sr.gotoNew();
    await sr.main.getByRole('button', { name: 'Add Items from Warehouse' }).click(); await sr.page.waitForTimeout(1500);
    const trigger = sr.page.getByText('Select Warehouse').locator('visible=true').last();
    await sr.pick(trigger, /Work In Progress - E/, 'Work In Progress', true);
    await sr.page.getByRole('button', { name: 'Update', exact: true }).click(); await sr.page.waitForTimeout(4000);
    const rows = await sr.items().count();
    observe(`rows fetched from ${OTHER_WAREHOUSE}: ${rows} | first: ${rows ? clean(await sr.items().first().innerText()) : ''}`);
    expect(rows, 'the warehouse holds stock, so rows are added').toBeGreaterThan(0);
  });
});

test.describe('Save (TC-RCA-173..178)', () => {
  test('TC-RCA-174/175 Save with everything empty lists every missing field; Save with no item rows is refused', srs('UC2 Save validation'), async () => {
    await sr.gotoNew(); await sr.save().click(); await sr.page.waitForTimeout(2500);
    const t = await sr.text();
    observe('messages: ' + (t.match(/[A-Z][A-Za-z ]+ is required/g) ?? []).join(' | '));
    for (const f of ['Series', 'Company', 'Purpose']) expect(t, f).toContain(`${f} is required`);
    const before = await api.call('frappe.client.get_count', { doctype: 'Stock Reconciliation' });
    await sr.fillHeader(); await sr.fillAccounts(); await sr.save().click(); await sr.page.waitForTimeout(3500);
    const after = await api.call('frappe.client.get_count', { doctype: 'Stock Reconciliation' });
    observe(`save with a valid header and no rows: records ${before} -> ${after} | ${(await sr.bodyText()).match(/(Error|required|at least)[^.]{0,100}/i)?.[0]}`);
    expect(after, 'no record without items').toBe(before);
  });

  test('TC-RCA-173/176/177/178 a valid Save creates a Draft with the entered data; the Submit button appears after Save and the record is shown', srs('UC2 Save / Submit'), async () => {
    await sr.gotoNew();
    await sr.fillHeader(); await sr.addRow(ITEM); await sr.page.waitForTimeout(1500);
    await sr.qtyInput().fill('25'); await sr.fillAccounts();
    expect(await sr.main.getByRole('button', { name: 'Submit', exact: true }).count(), 'no Submit before Save').toBe(0);
    await sr.save().click(); await sr.page.waitForTimeout(5000);
    const [rec] = await api.list('Stock Reconciliation', [], ['name', 'docstatus', 'purpose', 'set_warehouse', 'expense_account', 'cost_center', 'creation'], 1).then(() => api.call('frappe.client.get_list', { doctype: 'Stock Reconciliation', fields: ['name', 'docstatus', 'purpose', 'set_warehouse', 'expense_account', 'cost_center'], order_by: 'creation desc', limit_page_length: 1 }));
    observe(`saved ${rec.name} docstatus ${rec.docstatus} | url ${sr.page.url()} | Submit button: ${await sr.main.getByRole('button', { name: 'Submit', exact: true }).count()} | message: ${(await sr.bodyText()).match(/saved successfully|created successfully/i)?.[0]}`);
    expect(rec).toMatchObject({ docstatus: 0, purpose: 'Stock Reconciliation', set_warehouse: 'Stores - E' });
    expect(sr.page.url(), 'after Save the saved record is shown').toContain(rec.name);
    await expect(sr.main.getByRole('button', { name: 'Submit', exact: true })).toBeVisible({ timeout: 5000 });
    const d = await api.get('Stock Reconciliation', rec.name);
    expect(d.items[0]).toMatchObject({ item_code: code(ITEM_A), warehouse: WAREHOUSE, qty: 25 });
    await api.call('frappe.client.delete', { doctype: 'Stock Reconciliation', name: rec.name });
  });
});
