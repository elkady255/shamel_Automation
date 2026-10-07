import { test, expect, type Page } from '@playwright/test';
import { MaterialRequestPage } from './pages/MaterialRequestPage';
import { api } from './helpers/api';
import {
  COMPANY, WAREHOUSE, ITEM_NAME, today, testData, submittedMR, orderFromMR, receiveFromPO, stockEntryFromMR,
  receiveStock, salesOrder, setMRStatus, cancel, mr as getMR,
} from './helpers/mr-data';

/**
 * SRS "Inventory Transactions > Material Request" (UC1 List, UC2 Add, UC3 More Info, UC4 Details) with the
 * user's test cases (TC-ML, TC-AD, TC-IT, TC-GI, TC-MI, TC-DT, TC-CN, TC-FA).
 * Creating a Material Request from the UI is blocked by BUG-27 (see report), so documents are created through the
 * Frappe API and every screen after "Save" is tested in the UI. Test data is never deleted, by request.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });

test.describe.configure({ timeout: 240_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let mrPage: MaterialRequestPage;
test.beforeEach(async ({ page }) => {
  mrPage = new MaterialRequestPage(page);
});

const mainText = (page: Page) => page.getByRole('main').innerText();

test.describe('UC1 - Material Request list', () => {
  test('List shows Status and Transaction Date columns', srs('UC1 List columns: ID, Title, Status, Purpose, Transaction Date, Required By (TC-ML)'), async () => {
    await mrPage.gotoList();
    const headers = (await mrPage.table.getByRole('columnheader').allInnerTexts()).map((h) => h.trim());
    expect.soft(headers).toEqual(expect.arrayContaining(['ID', 'Title', 'Purpose', 'Required By']));
    expect(headers).toEqual(expect.arrayContaining(['Status', 'Transaction Date']));
  });

  test('A new Material Request appears at the top of the list with its values', srs('UC1 List: newest first, row shows ID/Title/Purpose/Required By (TC-ML)'), async () => {
    const doc = await submittedMR('Purchase', 3);
    await mrPage.gotoList();
    const first = mrPage.table.getByRole('row').nth(1);
    await expect(first).toContainText(doc.name);
    await expect(first).toContainText(`Purchase Request for ${ITEM_NAME}`);
    await expect(first).toContainText('Purchase');
    await expect(first).toContainText(doc.schedule_date);
  });

  test('Total record count matches the number of Material Requests', srs('UC1 List: pagination shows total records (TC-ML)'), async ({ page }) => {
    await mrPage.gotoList();
    const count = await api.call('frappe.client.get_count', { doctype: 'Material Request' });
    await expect(page.getByRole('main')).toContainText(`From ${count}`);
  });

  test('Search by ID shows only the matching Material Request', srs('UC1 List: search by ID (TC-ML)'), async ({ page }) => {
    const [target] = await api.list('Material Request', [['company', '=', COMPANY]], ['name'], 1);
    await mrPage.gotoList();
    await page.getByRole('searchbox', { name: 'Search by ID' }).fill(target.name);
    await expect(mrPage.table.getByRole('row')).toHaveCount(2, { timeout: 60_000 });
    await expect(mrPage.table.getByRole('row').nth(1)).toContainText(target.name);
  });

  test('Clicking a row opens that Material Request', srs('UC1 List: open record details (TC-ML)'), async ({ page }) => {
    await mrPage.gotoList();
    const id = (await mrPage.table.getByRole('row').nth(1).getByRole('cell').nth(1).innerText()).trim();
    await mrPage.table.getByRole('row').nth(1).getByRole('cell').nth(1).click();
    await expect(page).toHaveURL(new RegExp(encodeURIComponent(id)), { timeout: 60_000 });
    await expect(page.getByRole('heading', { name: 'Material Request Details' })).toBeVisible({ timeout: 120_000 });
  });
});

test.describe('UC2 - New Material Request form (header and dropdowns)', () => {
  test.beforeEach(async () => {
    await mrPage.gotoNew();
  });

  test('Request Date defaults to today', srs('UC2 Request Date: default today (TC-AD)'), async () => {
    const label = new Date(`${today()}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    await expect(mrPage.dateInputs().nth(0)).toHaveValue(label);
  });

  test('Price List offers buying price lists only', srs('UC2 Price List: buying price lists (TC-AD)'), async () => {
    const options = await mrPage.options(mrPage.combo('Select Price List'));
    expect.soft(options).toContain('Standard Buying');
    expect(options.filter((o) => /Selling/i.test(o))).toEqual([]);
  });

  test('Optional fields are not marked mandatory', srs('UC2/UC3: Price List, Required Before, Terms, Terms content are optional (TC-AD, TC-MI)'), async () => {
    const text = await mrPage.main.innerText();
    for (const label of ['Price List', 'Required Before']) expect.soft(text, label).not.toContain(`${label} *`);
    await mrPage.tab('Additional Information').click();
    const info = await mrPage.main.innerText();
    expect.soft(info, 'Terms').not.toMatch(/Terms \*/);
    expect.soft(info, 'Terms content').not.toContain('Terms and Conditions Content *');
    expect(test.info().errors).toHaveLength(0);
  });

  test('Warehouse list offers only warehouses of the Material Request company', srs('UC2 Set Warehouse / row Warehouse: warehouses of the selected company (TC-AD, TC-IT)'), async () => {
    await mrPage.choose(mrPage.combo('Select Purpose'), 'Purchase');
    const options = await mrPage.options(mrPage.combo('Select Warehouse'));
    // "مخزن القاضى" is "مخزن القاضى - AIG" of Azzrk Influencer Group, not Ahmed Ebrahim CO.
    expect(options).not.toContain('مخزن القاضى');
  });

  test('Warehouse list does not offer group warehouses', srs('UC2 Warehouse: transactions need a non-group warehouse (TC-AD, TC-IT) [assumed, ERPNext rule]'), async () => {
    await mrPage.choose(mrPage.combo('Select Purpose'), 'Purchase');
    const options = await mrPage.options(mrPage.combo('Select Warehouse'));
    expect(options).not.toContain('All Warehouses'); // All Warehouses - E is a group
  });

  test('Warehouses with the same name can be told apart', srs('UC2 Warehouse: user must be able to pick the intended warehouse (TC-AD, TC-IT)'), async () => {
    await mrPage.choose(mrPage.combo('Select Purpose'), 'Purchase');
    const options = await mrPage.options(mrPage.combo('Select Warehouse'));
    const duplicated = options.filter((o, i) => options.indexOf(o) !== i);
    expect(new Set(duplicated)).toEqual(new Set());
  });

  test('Item Code list offers every purchasable item, not only the first 20', srs('UC2 Items: Item Code dropdown (TC-IT)'), async () => {
    await testData();
    await mrPage.addItemRow();
    const options = await mrPage.options(mrPage.row(0).itemCode);
    expect(options).toContain(ITEM_NAME);
  });

  test('UOM list offers every unit, not only the first 20', srs('UC2 Items: UOM dropdown (TC-IT)'), async () => {
    await mrPage.addItemRow();
    const options = await mrPage.options(mrPage.row(0).uom);
    expect(options).toContain('Unit');
  });

  test('Choosing a Terms template fills the Terms and Conditions content', srs('UC3 Terms: selecting a template loads its content (TC-MI)'), async ({ page }) => {
    const template = await api.get('Terms and Conditions', 'dsfsdfsdf');
    expect(template.terms).toContain('sdfsdfsdf');
    await mrPage.tab('Additional Information').click();
    await mrPage.choose(page.getByRole('combobox', { name: 'Select Terms' }), 'dsfsdfsdf');
    await expect(page.getByRole('textbox', { name: 'Enter terms and conditions' })).not.toHaveValue('');
  });
});

test.describe('Server rules behind the form', () => {
  test('A warehouse of another company is rejected', srs('UC2 Warehouse: must belong to the company (TC-IT)'), async () => {
    const { item } = await testData();
    await expect(api.insert('Material Request', {
      company: COMPANY, material_request_type: 'Purchase', transaction_date: today(), schedule_date: today(),
      items: [{ item_code: item, qty: 1, uom: 'Unit', schedule_date: today(), warehouse: 'مخزن القاضى - AIG' }],
    })).rejects.toThrow(/does not belong to company/);
  });

  test('A group warehouse is rejected on a Material Request', srs('UC2 Warehouse: group warehouses not allowed in transactions [assumed, ERPNext rule]'), async () => {
    const { item } = await testData();
    // If the server wrongly accepts it, a draft is created (kept on the server, never deleted)
    await expect(api.insert('Material Request', {
      company: COMPANY, material_request_type: 'Purchase', transaction_date: today(), schedule_date: today(),
      items: [{ item_code: item, qty: 1, uom: 'Unit', schedule_date: today(), warehouse: 'All Warehouses - E' }],
    })).rejects.toThrow(/[Gg]roup/);
  });
});

test.describe('UC4 - Details of a saved Material Request', () => {
  test('Details show the saved header and item values', srs('UC4 Details: shows saved data (TC-DT)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 7);
    await mrPage.gotoDetails(doc.name);
    await expect(mrPage.combo('Select Purpose')).toHaveValue('Purchase');
    const r = mrPage.row(0);
    await expect(r.qty).toHaveValue('7');
    await expect(r.itemCode).toHaveValue(new RegExp(`${doc.items[0].item_code}|${ITEM_NAME}`));
    await expect(page.getByRole('combobox', { name: 'Warehouse', exact: true })).toHaveValue(new RegExp(WAREHOUSE));
  });

  test('Details show the saved UOM of each item', srs('UC4 Details: item UOM (TC-DT)'), async () => {
    const doc = await submittedMR('Purchase', 2);
    await mrPage.gotoDetails(doc.name);
    await expect(mrPage.row(0).uom).toHaveValue('Unit');
  });

  test('Material Issue details show the From Warehouse', srs('UC4 Details: Material Issue shows From Warehouse (TC-DT)'), async ({ page }) => {
    const doc = await submittedMR('Material Issue', 1);
    await mrPage.gotoDetails(doc.name);
    await expect(page.getByRole('combobox', { name: 'From Warehouse' })).toHaveValue(new RegExp(WAREHOUSE));
  });

  test('Details show the document ID and its status', srs('UC4 Details: ID and status visible (TC-DT, TC-FA)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 1);
    await mrPage.gotoDetails(doc.name);
    const text = await mainText(page);
    expect.soft(text).toContain(doc.name);
    expect(text).toMatch(/Submitted|Pending/);
  });

  test('A submitted Material Request cannot be edited or deleted', srs('UC4/FA: submitted document is read-only (TC-DT, TC-FA)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 1);
    await mrPage.gotoDetails(doc.name);
    await expect.soft(mrPage.row(0).qty).toBeDisabled();
    await expect.soft(mrPage.items.getByRole('button', { name: 'Add Item' })).toBeHidden();
    await expect.soft(page.getByRole('button', { name: 'Delete' })).toBeHidden();
    await expect.soft(page.getByRole('button', { name: 'Get Items from' })).toBeHidden();
    expect(test.info().errors).toHaveLength(0);
  });

  test('A draft Material Request can be submitted', srs('UC2 Submit: draft shows Submit (TC-GI, TC-FA)'), async ({ page }) => {
    const { item } = await testData();
    const draft = await api.insert('Material Request', {
      company: COMPANY, material_request_type: 'Purchase', transaction_date: today(), schedule_date: today(),
      items: [{ item_code: item, qty: 1, uom: 'Unit', schedule_date: today(), warehouse: WAREHOUSE }],
    });
    await mrPage.gotoDetails(draft.name);
    await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeVisible();
  });

  test('Cancel on a submitted Material Request cancels the document', srs('FA Cancel: cancels the submitted document (TC-FA)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 1);
    await mrPage.gotoDetails(doc.name);
    await page.getByRole('button', { name: 'Cancel', exact: true }).last().click();
    const confirm = page.getByRole('dialog').getByRole('button', { name: /Yes|Confirm|Cancel/ });
    if (await confirm.first().isVisible({ timeout: 5_000 }).catch(() => false)) await confirm.first().click();
    await expect.poll(async () => (await getMR(doc.name)).docstatus, { timeout: 60_000 }).toBe(2);
  });

  test('A cancelled Material Request shows Cancelled and is read-only', srs('FA Cancel: cancelled document state (TC-FA)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 1);
    await cancel('Material Request', doc.name);
    await mrPage.gotoDetails(doc.name);
    expect.soft(await mainText(page)).toContain('Cancelled');
    await expect.soft(mrPage.row(0).qty).toBeDisabled();
    expect(test.info().errors).toHaveLength(0);
  });
});

test.describe('UC3 - More Info: status and % Ordered', () => {
  test('A new submitted Purchase request is Pending with 0% ordered', srs('UC3 Status/% Ordered (TC-MI)'), async () => {
    const doc = await submittedMR('Purchase', 10);
    await mrPage.gotoDetails(doc.name);
    await mrPage.expectStatus('Pending', '0');
  });

  test('Ordering part of the quantity gives Partially Ordered and the right %', srs('UC3 Status: Partially Ordered, % Ordered = ordered/requested (TC-MI)'), async () => {
    const doc = await submittedMR('Purchase', 10);
    await orderFromMR(doc.name, 4);
    await mrPage.gotoDetails(doc.name);
    await mrPage.expectStatus('Partially Ordered', '40');
  });

  test('Ordering and receiving the full quantity gives Received', srs('UC3 Status: Ordered then Received (TC-MI)'), async () => {
    const doc = await submittedMR('Purchase', 5);
    const po = await orderFromMR(doc.name, 5);
    expect((await getMR(doc.name)).status).toBe('Ordered');
    await receiveFromPO(po.name);
    await mrPage.gotoDetails(doc.name);
    await mrPage.expectStatus('Received', '100');
  });

  test('A stopped request shows Stopped', srs('UC3 Status: Stopped (TC-MI)'), async () => {
    const doc = await submittedMR('Purchase', 5);
    await setMRStatus(doc.name, 'Stopped');
    await mrPage.gotoDetails(doc.name);
    await mrPage.expectStatus('Stopped');
  });

  test('Issuing the full quantity of a Material Issue gives Issued', srs('UC3 Status: Issued (TC-MI)'), async () => {
    await receiveStock(5);
    const doc = await submittedMR('Material Issue', 2);
    await stockEntryFromMR(doc.name);
    await mrPage.gotoDetails(doc.name);
    await mrPage.expectStatus('Issued', '100');
  });

  test('Transferring the full quantity of a Material Transfer gives Transferred', srs('UC3 Status: Transferred (TC-MI)'), async () => {
    await receiveStock(5);
    const doc = await submittedMR('Material Transfer', 2);
    await stockEntryFromMR(doc.name);
    await mrPage.gotoDetails(doc.name);
    await mrPage.expectStatus('Transferred', '100');
  });
});

test.describe('Connections', () => {
  test('Connections list the Purchase Orders and Purchase Receipts made from the request', srs('Connections: linked documents (TC-CN)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 4);
    const po = await orderFromMR(doc.name, 4);
    const pr = await receiveFromPO(po.name);
    await mrPage.gotoDetails(doc.name);
    await page.getByRole('button', { name: /^Connections/ }).click();
    await expect(page.getByRole('button', { name: 'Connections 2' })).toBeVisible({ timeout: 120_000 });
    await expect(page.getByRole('button', { name: po.name })).toBeVisible();
    await expect(page.getByRole('button', { name: pr.name })).toBeVisible();
  });

  test('Connections of a Material Issue list its Stock Entry', srs('Connections: Stock Entry (TC-CN)'), async ({ page }) => {
    await receiveStock(2);
    const doc = await submittedMR('Material Issue', 1);
    const se = await stockEntryFromMR(doc.name);
    await mrPage.gotoDetails(doc.name);
    await page.getByRole('button', { name: /^Connections/ }).click();
    await expect(page.getByRole('button', { name: se.name })).toBeVisible({ timeout: 120_000 });
    await expect(page).toHaveURL(new RegExp(doc.name));
  });

  test('Connections show who created each linked document', srs('Connections: By column (TC-CN)'), async ({ page }) => {
    const doc = await submittedMR('Purchase', 2);
    await orderFromMR(doc.name, 2);
    await mrPage.gotoDetails(doc.name);
    await page.getByRole('button', { name: /^Connections/ }).click();
    const row = page.getByRole('main').getByRole('table').getByRole('row').nth(1);
    await expect(row).toContainText('Administrator', { timeout: 120_000 });
    await expect(row).not.toContainText('None');
  });
});

test.describe('Get Items From', () => {
  test.beforeEach(async () => {
    await mrPage.gotoNew();
  });

  test('Get Items from offers Sales Order and Product Bundle', srs('UC2 Get Items From: Sales Order, Product Bundle (TC-GI)'), async ({ page }) => {
    await page.getByRole('button', { name: 'Get Items from' }).click();
    await expect(page.getByRole('button', { name: 'Sales Order', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Product Bundle', exact: true })).toBeVisible();
  });

  test('Sales Order picker lists open orders but not orders on Hold or Closed', srs('UC2 Get Items From Sales Order: only open orders (TC-GI)'), async ({ page }) => {
    const open = await salesOrder('open', 2);
    const hold = await salesOrder('hold', 2);
    const closed = await salesOrder('closed', 2);
    expect([hold.status, closed.status]).toEqual(['On Hold', 'Closed']);
    await page.getByRole('button', { name: 'Get Items from' }).click();
    await page.getByRole('button', { name: 'Sales Order', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Sales Order' });
    const search = dialog.getByRole('textbox', { name: 'Search by name' });
    const rowsFor = async (name: string) => {
      await search.fill(name);
      await page.waitForTimeout(4000);
      return dialog.getByRole('row', { name: new RegExp(name) }).count();
    };
    expect.soft(await rowsFor(open.name), `open ${open.name}`).toBe(1);
    expect.soft(await rowsFor(hold.name), `on hold ${hold.name}`).toBe(0);
    expect.soft(await rowsFor(closed.name), `closed ${closed.name}`).toBe(0);
    expect(test.info().errors).toHaveLength(0);
  });

  test('Picking a Sales Order adds its items with their quantities', srs('UC2 Get Items From Sales Order: items copied (TC-GI)'), async ({ page }) => {
    const so = await salesOrder('open', 6);
    await page.getByRole('button', { name: 'Get Items from' }).click();
    await page.getByRole('button', { name: 'Sales Order', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Sales Order' });
    await dialog.getByRole('textbox', { name: 'Search by name' }).fill(so.name);
    const row = dialog.getByRole('row', { name: new RegExp(so.name) });
    await row.getByRole('cell').first().click();
    await dialog.getByRole('button', { name: /Get Items|Add|Select|Confirm|Done/ }).first().click();
    await expect(mrPage.row(0).itemCode).toHaveValue(new RegExp(ITEM_NAME), { timeout: 60_000 });
    await expect(mrPage.row(0).qty).toHaveValue('6');
  });
});
