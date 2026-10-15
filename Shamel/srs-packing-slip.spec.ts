import { test, expect } from '@playwright/test';
import { PackingSlipPage } from './pages/PackingSlipPage';
import { api } from './helpers/api';
import { ITEM_A, ITEM_B, ITEM_C, code, draftDN, packingSlip, seed } from './helpers/ps-data';

/**
 * SRS "Inventory Transactions > Packing Slip" (UC1 List, UC2 Add, UC5 Details) with the user's test cases
 * (TC-PSL, TC-APS, TC-PSD). Test names start with the test case ID so results map back to the sheet.
 * Documents are prepared through the Frappe API; every screen is tested in the UI. Nothing is ever deleted.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });

test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let ps: PackingSlipPage;
test.beforeEach(async ({ page }) => {
  ps = new PackingSlipPage(page);
});
test.beforeAll(async () => {
  await seed();
});

test.describe('UC1 - Packing Slip list', () => {
  test('TC-PSL-001 list shows the Packing Slips', srs('UC1: view the list of Packing Slips'), async () => {
    await ps.gotoList();
    expect((await ps.listIds()).length).toBeGreaterThan(0);
  });

  test('TC-PSL-002 Add Packing Slip button is displayed', srs('UC1: Add Packing Slip button'), async () => {
    await ps.gotoList();
    await expect(ps.main.getByRole('button', { name: 'Add Packing Slip' })).toBeVisible();
  });

  test('TC-PSL-003 Add button opens the Add Packing Slip screen', srs('UC1: button redirects to Add screen'), async ({ page }) => {
    await ps.gotoList();
    await ps.main.getByRole('button', { name: 'Add Packing Slip' }).click();
    await expect(page).toHaveURL(/packing-slip\/new/);
    await expect(ps.main).toContainText('Add Packing Slip');
  });

  test('TC-PSL-004/005/011 list columns: checkbox, Packing Slip ID, Delivery Note', srs('UC1: table columns'), async () => {
    await ps.gotoList();
    const headers = (await ps.table.getByRole('columnheader').allInnerTexts()).map((h) => h.trim());
    expect(headers).toEqual(expect.arrayContaining(['ID', 'Delivery Note']));
    await expect(ps.table.getByRole('row').nth(1).getByRole('checkbox')).toBeVisible();
  });

  test('TC-PSL-007 list has a Status column (Draft / Submitted / Cancelled)', srs('UC1: Status column'), async () => {
    test.fail(true, 'Known bug BUG-52 list has no Status column');
    await ps.gotoList();
    const headers = (await ps.table.getByRole('columnheader').allInnerTexts()).map((h) => h.trim());
    expect(headers).toContain('Status');
  });

  test('TC-PSL-006 clicking the ID opens Packing Slip Details', srs('UC1: ID is clickable'), async ({ page }) => {
    await ps.gotoList();
    const [id] = await ps.listIds();
    await ps.table.getByText(id, { exact: true }).click();
    await expect(page).toHaveURL(new RegExp(id));
    await expect(ps.main.getByRole('heading', { name: 'Packing Slip Details' })).toBeVisible();
  });

  test('TC-PSL-012/015 action bar appears on selection and lists the SRS actions', srs('UC1: action bar actions'), async () => {
    await ps.gotoList();
    await ps.selectListRow(0);
    for (const a of ['Edit', 'Export', 'Assign', 'Clear Assignment', 'Add Tags', 'Print']) {
      await expect(ps.actionBar(a), a).toBeVisible();
    }
  });

  test('TC-PSL-014 action bar disappears when the row is deselected', srs('UC1: action bar only while selected'), async () => {
    await ps.gotoList();
    await ps.selectListRow(0);
    await expect(ps.actionBar('Edit')).toBeVisible();
    await ps.table.getByRole('row').nth(1).getByRole('checkbox').uncheck();
    await expect(ps.actionBar('Edit')).toBeHidden();
  });

  test.describe('actions depend on status', () => {
    let draft: string, submitted: string, cancelled: string;
    test.beforeAll(async () => {
      draft = (await packingSlip(await draftDN(), { status: 'Draft' })).name;
      submitted = (await packingSlip(await draftDN(), { status: 'Submitted' })).name;
      cancelled = (await packingSlip(await draftDN(), { status: 'Cancelled' })).name;
    });

    test('TC-PSL-026 Submit is shown for a Draft slip', srs('UC1: Submit appears only when status = draft'), async () => {
      test.fail(true, 'Known bug BUG-53 list action bar has no Submit for a Draft slip');
      await ps.gotoList();
      await ps.selectById(draft);
      await expect(ps.actionBar('Submit')).toBeVisible();
    });

    test('TC-PSL-027 Submit is hidden for Submitted and Cancelled slips', srs('UC1: Submit appears only when status = draft'), async () => {
      await ps.gotoList();
      await ps.selectById(submitted);
      await expect(ps.actionBar('Submit')).toBeHidden();
      await ps.gotoList();
      await ps.selectById(cancelled);
      await expect(ps.actionBar('Submit')).toBeHidden();
    });

    test('TC-PSL-031 Cancel is shown for a Submitted slip', srs('UC1: Cancel appears only when status = Submitted'), async () => {
      test.fail(true, 'Known bug BUG-53 list action bar has no Cancel for a Submitted slip');
      await ps.gotoList();
      await ps.selectById(submitted);
      await expect(ps.actionBar('Cancel')).toBeVisible();
    });

    test('TC-PSL-032 Cancel is hidden for Draft and Cancelled slips', srs('UC1: Cancel appears only when status = Submitted'), async () => {
      await ps.gotoList();
      await ps.selectById(draft);
      await expect(ps.actionBar('Cancel')).toBeHidden();
      await ps.gotoList();
      await ps.selectById(cancelled);
      await expect(ps.actionBar('Cancel')).toBeHidden();
    });

    test('TC-PSL-035 Delete is shown for a Submitted slip', srs('UC1: Delete appears only when status = Submitted'), async () => {
      await ps.gotoList();
      await ps.selectById(submitted);
      await expect(ps.actionBar('Delete')).toBeVisible();
    });

    test('TC-PSL-036 Delete is hidden for Draft and Cancelled slips', srs('UC1: Delete appears only when status = Submitted'), async () => {
      test.fail(true, 'Known bug BUG-54 Delete is shown for Draft and Cancelled slips');
      await ps.gotoList();
      await ps.selectById(draft);
      await expect(ps.actionBar('Delete')).toBeHidden();
      await ps.gotoList();
      await ps.selectById(cancelled);
      await expect(ps.actionBar('Delete')).toBeHidden();
    });

    test('TC-PSL-037/038 Delete asks for confirmation and No keeps the slip', srs('UC1: confirmation message before delete'), async ({ page }) => {
      await ps.gotoList();
      await ps.selectById(submitted);
      await ps.actionBar('Delete').click();
      const confirm = page.locator('.shamel-confirm-dialog');
      await expect(confirm).toContainText('Delete Record');
      await confirm.getByRole('button', { name: 'Cancel' }).click();
      expect((await api.get('Packing Slip', submitted)).docstatus).toBe(1);
    });

    test('TC-PSL-022/023/024 Edit > Update on Submitted and Cancelled slips shows a cannot-modify error', srs('UC1: Update on Submitted/Cancelled shows error'), async ({ page }) => {
      test.fail(true, 'Known bug BUG-55 Update on a Submitted slip shows no cannot-modify error');
      await ps.gotoList();
      await ps.selectById(submitted);
      await ps.actionBar('Edit').click();
      await expect(page.getByText('Edit —')).toBeVisible();
      await page.getByRole('button', { name: 'Update', exact: true }).click();
      await page.waitForTimeout(2500);
      const body = await page.locator('body').innerText();
      console.log('AFTER UPDATE (submitted):', body.replace(/\s+/g, ' ').slice(0, 400));
      await expect(page.getByText(/cannot|can't|not allowed|can not/i).first()).toBeVisible({ timeout: 5_000 });
    });
  });
});

test.describe('UC2 - Add Packing Slip', () => {
  test('TC-APS-001 Add screen shows the SRS fields', srs('UC2: components'), async () => {
    await ps.gotoNew();
    for (const f of ['Select Delivery Note', 'Select Series', 'Enter Packing Slip Number', 'Enter Gross Weight', 'Select Gross Weight UOM', 'Select Letter Head']) {
      await expect(ps.field(f), f).toBeVisible();
    }
    await expect(ps.main.getByRole('button', { name: 'Add Row' })).toBeVisible();
    await expect(ps.save).toBeVisible();
  });

  test('TC-APS-003 Delivery Note dropdown lists only Draft Delivery Notes', srs('UC2: Delivery Note shows only Draft'), async () => {
    test.fail(true, 'Known bug BUG-47 Delivery Note dropdown lists non-Draft Delivery Notes');
    await ps.gotoNew();
    const names = (await ps.options(ps.field('Select Delivery Note'))).filter((n) => n.startsWith('MAT-DN'));
    const rows = await api.list('Delivery Note', [['name', 'in', names]], ['name', 'docstatus'], 100);
    const notDraft = rows.filter((r) => r.docstatus !== 0).map((r) => `${r.name}(docstatus ${r.docstatus})`);
    expect(notDraft, 'non-Draft Delivery Notes offered').toEqual([]);
  });

  test('TC-APS-0xx Item Code lists only items of the selected Delivery Note', srs('UC2: Item Code - only items included in the selected Delivery Note'), async () => {
    test.fail(true, 'Known bug BUG-48 Item Code dropdown is not filtered by the selected Delivery Note');
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    const opts = await ps.options(ps.row().itemCode(0));
    expect(opts).toEqual([ITEM_A]);
  });

  test('TC-APS-005 Save with an empty form shows required-field errors', srs('UC2: mandatory fields show an error'), async () => {
    test.fail(true, 'Known bug BUG-56 no required-field error messages on the Add screen');
    await ps.gotoNew();
    // Save is disabled while required fields are empty; the SRS asks for an error message per empty field
    await ps.field('Select Delivery Note').click();
    await ps.field('Select Series').click();
    await ps.field('Enter Packing Slip Number').click();
    await expect(ps.main).toContainText(/required|mandatory|please/i, { timeout: 5_000 });
  });

  test('TC-APS-0xx save a valid Packing Slip: stored as Draft with the entered values', srs('UC2: Save -> saved, not submitted, status draft'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-45 UI Save fails: From Package No. is required but has no field');
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.fillForm({ dn: dn.name, item: code(ITEM_A), itemLabel: ITEM_A, qty: '5', gross: '50', uom: 'Kg' });
    await ps.save.click();
    await expect(page).toHaveURL(/packing-slip\/MAT-PAC/, { timeout: 60_000 });
    const name = decodeURIComponent(page.url().split('/').pop()!);
    const doc = await api.get('Packing Slip', name);
    expect(doc.docstatus).toBe(0);
    expect(doc.delivery_note).toBe(dn.name);
    expect(doc.items[0].qty).toBe(5);
    expect(doc.gross_weight_pkg).toBe(50);
  });
});

test.describe('UC2 - Add Packing Slip: fields and rows (no save)', () => {
  test('TC-APS-0xx Packing Slip Number accepts letters, digits and symbols and stops at 100 characters', srs('UC2: Packing Slip Number - max length 100, further input prevented'), async () => {
    await ps.gotoNew();
    const box = ps.field('Enter Packing Slip Number');
    await box.click();
    await box.pressSequentially('PS-@#/-' + 'a1'.repeat(60), { delay: 5 });
    const v = await box.inputValue();
    expect(v.startsWith('PS-@#/-')).toBe(true);
    expect(v.length).toBe(100);
  });

  test('TC-APS-0xx Gross Weight accepts numbers only', srs('UC2: Gross Weight - numbers only'), async () => {
    await ps.gotoNew();
    const box = ps.field('Enter Gross Weight');
    await box.click();
    await box.pressSequentially('ab12!c3', { delay: 20 });
    expect(await box.inputValue()).toMatch(/^[0-9.]+$/);
  });

  test('TC-APS-0xx Quantity accepts numbers only', srs('UC2: Items > Qty - numbers only'), async () => {
    test.fail(true, 'Known bug BUG-59 Quantity accepts letters');
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.typeNumber(ps.row().qty(0), 'x9y8');
    expect(await ps.row().qty(0).inputValue()).toMatch(/^[0-9.]+$/);
  });

  test('TC-APS-0xx Quantity is fetched from the Delivery Note when an item is chosen', srs('UC2: Items > Qty - fetched from the selected Delivery Note'), async () => {
    test.fail(true, 'Known bug BUG-49 Qty is not fetched from the Delivery Note');
    const dn = await draftDN([{ item: ITEM_A, qty: 7 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.search(ps.row().itemCode(0), code(ITEM_A), ITEM_A);
    await expect(ps.row().qty(0)).toHaveValue('7');
  });

  test('TC-APS-0xx Net Weight is fetched from the item Weight Per Unit', srs('UC2: Items > Net Weight - fetched from Item Weight Per Unit'), async () => {
    test.fail(true, 'Known bug BUG-49 Net Weight is not fetched from the item');
    const dn = await draftDN([{ item: ITEM_A, qty: 7 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.search(ps.row().itemCode(0), code(ITEM_A), ITEM_A);
    await expect(ps.row().netWeight(0)).not.toHaveValue('');
    await expect(ps.row().netWeight(0)).not.toHaveValue('0');
  });

  test('TC-APS-0xx Add Row adds a row and the row Delete icon removes it', srs('UC2: Add Row / Delete row'), async () => {
    await ps.gotoNew();
    await ps.addRow();
    await ps.addRow();
    await expect(ps.main.locator('tbody tr')).toHaveCount(2);
    await ps.main.locator('tbody tr').first().getByTitle('Delete').click();
    await expect(ps.main.locator('tbody tr')).toHaveCount(1);
  });

  test('TC-APS-0xx Edit Row popup: Description is optional', srs('UC2: Edit Row > Description - Optional'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-50 Description is marked mandatory in Edit Row');
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.search(ps.row().itemCode(0), code(ITEM_A), ITEM_A);
    await ps.main.locator('tbody tr').first().getByTitle('Edit').click();
    await expect(page.getByText('Edit Row').first()).toBeVisible();
    const label = page.getByText(/^Description/).last();
    expect(await label.innerText()).not.toContain('*');
  });

  test('TC-APS-0xx Edit Row popup: Item Default UOM and Item Weight UOM are displayed for the chosen item', srs('UC2: Edit Row > Item Default UOM / Item Weight UOM (read only)'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-51 Item Default UOM / Item Weight UOM are empty in Edit Row');
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.search(ps.row().itemCode(0), code(ITEM_A), ITEM_A);
    await ps.main.locator('tbody tr').first().getByTitle('Edit').click();
    const val = (label: string) => page.locator(`xpath=(//*[starts-with(normalize-space(text()),"${label}")]/following::input)[1]`);
    await expect(val('Item Default UOM')).toHaveValue('Nos');
    await expect(val('Item Weight UOM')).toHaveValue('Kg');
  });

  test('TC-APS-0xx Edit Row popup: Description shorter than 3 characters shows an error', srs('UC2: Edit Row > Description - min length 3, error if shorter'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-60 no error message for a Description shorter than 3 characters');
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.search(ps.row().itemCode(0), code(ITEM_A), ITEM_A);
    await ps.main.locator('tbody tr').first().getByTitle('Edit').click();
    const d = page.getByPlaceholder('Enter description');
    await d.fill('ab');
    await d.blur();
    await expect(page.getByText(/at least 3|minimum|min/i).first()).toBeVisible({ timeout: 5_000 });
  });

  test('TC-APS-0xx Edit Row popup: Description stops at 500 characters', srs('UC2: Edit Row > Description - max length 500'), async ({ page }) => {
    const dn = await draftDN([{ item: ITEM_A, qty: 5 }]);
    await ps.gotoNew();
    await ps.chooseDeliveryNote(dn.name);
    await ps.addRow();
    await ps.search(ps.row().itemCode(0), code(ITEM_A), ITEM_A);
    await ps.main.locator('tbody tr').first().getByTitle('Edit').click();
    const d = page.getByPlaceholder('Enter description');
    await d.fill('x'.repeat(520));
    expect((await d.inputValue()).length).toBe(500);
  });

  test('TC-APS-0xx table header has a Setting control (column order, width, add/remove columns)', srs('UC2: Items > Setting popup'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-58 Setting control missing in the Items table');
    await ps.gotoNew();
    await ps.addRow();
    const setting = ps.main.locator('thead').getByTitle(/setting/i).or(ps.main.getByRole('button', { name: /setting/i }));
    await expect(setting.first()).toBeVisible({ timeout: 5_000 });
    void page;
  });
});

test.describe('UC5 - Packing Slip details and end-to-end status flow', () => {
  test('TC-PSD-0xx Draft details are editable and show the saved data', srs('UC5: Draft -> fields are inputs holding the data entered at creation'), async () => {
    const dn = await draftDN([{ item: ITEM_A, qty: 4 }]);
    const doc = await packingSlip(dn, { gross: 40 });
    await ps.gotoDetails(doc.name);
    await expect(ps.field('Select Delivery Note')).toHaveValue(dn.name);
    await expect(ps.field('Enter Gross Weight')).toHaveValue('40');
    await expect(ps.field('Enter Gross Weight')).toBeEnabled();
    await expect(ps.row().qty(0)).toHaveValue('4');
  });

  test('TC-PSD-0xx Submitted and Cancelled details are read-only', srs('UC5: Submitted/Cancelled -> read-only'), async () => {
    test.fail(true, 'Known bug BUG-57 Add Row is available on a Submitted slip');
    for (const status of ['Submitted', 'Cancelled'] as const) {
      const doc = await packingSlip(await draftDN(), { status });
      await ps.gotoDetails(doc.name);
      await expect(ps.field('Enter Gross Weight'), status).toBeDisabled();
      await expect(ps.field('Select Delivery Note'), status).toBeDisabled();
      await expect(ps.main.getByRole('button', { name: 'Add Row' }), `${status}: Add Row`).toBeHidden();
    }
  });

  test('TC-PSD-0xx details page has the fixed actions Assign, Attachment, Tags, Share, Print', srs('UC5: fixed page actions'), async ({ page }) => {
    const doc = await packingSlip(await draftDN(), { status: 'Submitted' });
    await ps.gotoDetails(doc.name);
    for (const t of ['Assign To', 'Attachments', 'Tags', 'Share', 'Print']) {
      await expect(page.getByTitle(t).first(), t).toBeVisible();
    }
  });

  test('TC-PSD-0xx Delete is shown on details only for a Submitted slip', srs('UC5: Delete appears only when status = Submitted'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-54 Delete is shown on details for every status');
    const draft = await packingSlip(await draftDN(), { status: 'Draft' });
    await ps.gotoDetails(draft.name);
    await expect(page.getByTitle('Delete').first()).toBeHidden();
    const cancelled = await packingSlip(await draftDN(), { status: 'Cancelled' });
    await ps.gotoDetails(cancelled.name);
    await expect(page.getByTitle('Delete').first()).toBeHidden();
  });

  test('TC-PSD-0xx Delete on a Submitted slip asks for confirmation; Cancel keeps it', srs('UC5: Delete -> confirmation message'), async ({ page }) => {
    const doc = await packingSlip(await draftDN(), { status: 'Submitted' });
    await ps.gotoDetails(doc.name);
    await page.getByTitle('Delete').first().click();
    const confirm = page.locator('.shamel-confirm-dialog');
    await expect(confirm).toContainText(/delete/i);
    await confirm.getByRole('button', { name: 'Cancel' }).click();
    expect((await api.get('Packing Slip', doc.name)).docstatus).toBe(1);
  });

  test('TC-PSD-0xx Edit a Draft slip and Save keeps the new value', srs('UC5: Draft can be modified and saved'), async () => {
    test.fail(true, 'Known bug BUG-46 Save/Submit/Cancel fail: update_packing_slip returns 417 Extra inputs are not permitted');
    const doc = await packingSlip(await draftDN(), { gross: 100 });
    await ps.gotoDetails(doc.name);
    await ps.typeNumber(ps.field('Enter Gross Weight'), '150');
    await ps.save.click();
    await expect.poll(async () => (await api.get('Packing Slip', doc.name)).gross_weight_pkg, { timeout: 30_000 }).toBe(150);
  });

  test('TC-PSL-028 Submit a Draft slip from details: status becomes Submitted', srs('UC1/UC2: Submit -> successfully submitted, status Submitted'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-46 Save/Submit/Cancel fail: update_packing_slip returns 417 Extra inputs are not permitted');
    const doc = await packingSlip(await draftDN(), { status: 'Draft' });
    await ps.gotoDetails(doc.name);
    await ps.main.getByRole('button', { name: 'Submit', exact: true }).click();
    const confirm = page.getByRole('button', { name: /^(Yes|Submit|Confirm)$/ });
    if (await confirm.first().isVisible({ timeout: 3_000 }).catch(() => false)) await confirm.first().click();
    await expect.poll(async () => (await api.get('Packing Slip', doc.name)).docstatus, { timeout: 40_000 }).toBe(1);
    await expect(ps.main.getByRole('button', { name: 'Cancel', exact: true })).toBeVisible();
  });

  test('TC-PSL-033 Cancel a Submitted slip from details: status becomes Cancelled and Amend appears', srs('UC2/UC5: Cancel -> canceled successfully'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-46 Save/Submit/Cancel fail: update_packing_slip returns 417 Extra inputs are not permitted');
    const doc = await packingSlip(await draftDN(), { status: 'Submitted' });
    await ps.gotoDetails(doc.name);
    await ps.main.getByRole('button', { name: 'Cancel', exact: true }).first().click();
    const confirm = page.getByRole('button', { name: /^(Yes|Confirm|Cancel Document)$/ });
    if (await confirm.first().isVisible({ timeout: 3_000 }).catch(() => false)) await confirm.first().click();
    await expect.poll(async () => (await api.get('Packing Slip', doc.name)).docstatus, { timeout: 40_000 }).toBe(2);
    await expect(ps.main.getByRole('button', { name: 'Amend', exact: true })).toBeVisible();
  });

  test('TC-PSD-0xx Amend a Cancelled slip creates a Draft with Amended From', srs('UC2: Amend appears when status = cancelled; Amended From shows the source'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-46 Amend cannot be completed: update_packing_slip returns 417');
    const doc = await packingSlip(await draftDN(), { status: 'Cancelled' });
    await ps.gotoDetails(doc.name);
    await ps.main.getByRole('button', { name: 'Amend', exact: true }).click();
    await expect(page).not.toHaveURL(new RegExp(`${doc.name}$`), { timeout: 40_000 });
    await expect(ps.main).toContainText(doc.name);
  });

  test('TC-PSL-0xx list shows each slip status after submit and cancel (end to end)', srs('UC1: Status column Draft/Submitted/Cancelled'), async () => {
    test.fail(true, 'Known bug BUG-52 list has no Status column');
    const doc = await packingSlip(await draftDN(), { status: 'Submitted' });
    await ps.gotoList();
    await ps.main.getByPlaceholder('Search By ID').fill(doc.name);
    await expect(ps.table.getByRole('row').filter({ hasText: doc.name })).toContainText('Submitted', { timeout: 20_000 });
  });
});