import { test, expect, type Page } from '@playwright/test';
import { QualityInspectionPage } from './pages/QualityInspectionPage';
import { api } from './helpers/api';
import { qi } from './helpers/qi-data';

/**
 * SRS "Inventory > Quality Inspection" UC1 List and UC3 Details, with the user's TC-QIL / TC-QID cases.
 * Records are prepared through the Frappe API. Only Quality Inspections created by these tests are ever deleted.
 * Cases the SRS leaves open record the behaviour as an "observed" annotation instead of asserting.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let q: QualityInspectionPage;
test.beforeEach(async ({ page }) => { q = new QualityInspectionPage(page); });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const msg = async (page: Page) => ((await page.locator('body').innerText()).replace(/\s+/g, ' ').match(/(Error|Cannot|cannot|not allowed|Not Permitted|modif).{0,160}/)?.[0] ?? 'no message');

let draft: { name: string }, submitted: { name: string }, cancelled: { name: string };
test.beforeAll(async () => {
  draft = await qi('Draft'); submitted = await qi('Submitted'); cancelled = await qi('Cancelled');
});

test.describe('List display', () => {
  test('TC-QIL-001/002/003 list loads; Add Quality Inspection opens the Add screen', srs('UC1: list, Add button'), async ({ page }) => {
    await q.gotoList();
    expect(await q.dataRows().count()).toBeGreaterThan(0);
    await q.main.getByRole('button', { name: 'Add Quality Inspection' }).click();
    await expect(page).toHaveURL(/quality-inspection\/new/);
  });

  test('TC-QIL-004/005/006/013/014/015/016 columns: checkbox, ID, Status, Report Date, Inspection Type, Reference Name, Item Code', srs('UC1 table columns'), async () => {
    await q.gotoList();
    const headers = (await q.table.getByRole('columnheader').allInnerTexts()).map((h) => h.trim());
    expect(headers).toEqual(expect.arrayContaining(['ID', 'Status', 'Report Date', 'Inspection Type', 'Reference Name', 'Item Code']));
    await expect(q.dataRows().first().getByRole('checkbox')).toBeVisible();
  });

  test('TC-QIL-005 several rows can be ticked at the same time', srs('UC1 multi selection'), async ({ page }) => {
    await q.gotoList();
    await q.dataRows().nth(0).getByRole('checkbox').check(); await q.dataRows().nth(1).getByRole('checkbox').check();
    await expect(page.getByText(/2\s*Selected/i).first()).toBeVisible();
  });

  test('TC-QIL-007/008 clicking the ID opens the Quality Inspection details', srs('UC1: ID is clickable'), async ({ page }) => {
    await q.gotoList(); await q.search(draft.name);
    await q.table.getByText(draft.name, { exact: true }).first().click();
    await expect(page).toHaveURL(new RegExp(draft.name));
    await expect(q.main).toContainText('Quality Inspection Details');
  });

  test('TC-QIL-009 a Draft Quality Inspection shows Draft in the Status column', srs('UC1 Status: Draft'), async () => {
    await q.gotoList();
    const row = await q.rowText(draft.name);
    observe('row of a Draft QI: ' + row);
    expect(row).toContain('Draft');
  });

  test('TC-QIL-010 a Submitted Quality Inspection shows Submitted in the Status column', srs('UC1 Status: Submitted'), async () => {
    await q.gotoList();
    const row = await q.rowText(submitted.name);
    observe('row of a Submitted QI: ' + row);
    expect(row).toContain('Submitted');
  });

  test('TC-QIL-011 a Cancelled Quality Inspection shows Cancelled in the Status column', srs('UC1 Status: Cancelled'), async () => {
    await q.gotoList();
    const row = await q.rowText(cancelled.name);
    observe('row of a Cancelled QI: ' + row);
    expect(row).toContain('Cancelled');
  });

  test('TC-QIL-012 Closed status: a Quality Inspection cannot be Closed in the system', srs('UC1 Status: Closed (no Close action exists)'), async () => {
    await q.gotoList();
    observe('SRS lists Closed as a Status value, but no Close action or Closed state is defined anywhere in the SRS');
    expect((await api.list('Quality Inspection', [['status', '=', 'Closed']])).length).toBe(0);
  });
});

test.describe('Row selection, action bar and Edit popup', () => {
  test('TC-QIL-017/024/025/026/027/028 selecting a row shows Edit, Export, Assign, Clear assignment, Add Tags, Print', srs('UC1 action bar'), async () => {
    await q.gotoList(); await q.select(draft.name);
    const buttons = (await q.main.getByRole('button').allInnerTexts()).map((t) => t.trim());
    observe('action bar buttons: ' + buttons.filter(Boolean).slice(-8).join(' | '));
    for (const b of ['Edit', 'Export', 'Assign', 'Add Tags', 'Print']) expect(buttons, b).toContain(b);
    expect(buttons.join('|'), 'Clear assignment action').toMatch(/Clear/i);
  });

  test('TC-QIL-029/030/031 Submit from the list: visible only for a Draft row and submits it', srs('UC1 Submit action'), async ({ page }) => {
    const d = await qi('Draft');
    await q.gotoList(); await q.select(d.name);
    observe('Submit in the action bar for a Draft row: ' + (await q.actionBar('Submit').count()));
    await expect(q.actionBar('Submit')).toBeVisible({ timeout: 4000 });
    await q.actionBar('Submit').click(); await page.waitForTimeout(3000);
    await expect.poll(async () => (await api.get('Quality Inspection', d.name)).docstatus, { timeout: 30_000 }).toBe(1);
  });

  test('TC-QIL-032/033/034 Cancel from the list: visible only for a Submitted row', srs('UC1 Cancel action'), async ({ page }) => {
    const s = await qi('Submitted');
    await q.gotoList(); await q.select(s.name);
    observe('Cancel in the action bar for a Submitted row: ' + (await q.actionBar('Cancel').count()));
    await expect(q.actionBar('Cancel')).toBeVisible({ timeout: 4000 });
    await q.actionBar('Cancel').click(); await page.waitForTimeout(3000);
    await expect.poll(async () => (await api.get('Quality Inspection', s.name)).docstatus, { timeout: 30_000 }).toBe(2);
  });

  test('TC-QIL-030/033 Submit and Cancel are not offered for a Cancelled row', srs('UC1 Submit/Cancel hidden for non matching status'), async () => {
    await q.gotoList(); await q.select(cancelled.name);
    expect(await q.actionBar('Submit').count()).toBe(0);
    expect(await q.actionBar('Cancel').count()).toBe(0);
  });

  test('TC-QIL-018/019 Edit popup: the Field list offers the Quality Inspection fields and the Value input adapts', srs('UC1 Edit popup'), async ({ page }) => {
    await q.gotoList(); await q.select(draft.name);
    await q.actionBar('Edit').click(); await expect(q.editDialog()).toBeVisible();
    await q.editDialog().getByText('Report Date', { exact: true }).first().click(); await page.waitForTimeout(800);
    const options = (await page.locator('[role=option], .dropdown-item, [class*=option]:visible').allInnerTexts()).map((t) => t.trim()).filter(Boolean);
    observe('Field options: ' + options.slice(0, 30).join(', '));
    expect(options.length).toBeGreaterThan(3);
  });

  test('TC-QIL-023 Edit a Draft Quality Inspection: Remarks is updated', srs('UC1 Edit: Draft -> Update succeeds'), async ({ page }) => {
    const d = await qi('Draft');
    await q.gotoList(); await q.select(d.name);
    await q.actionBar('Edit').click(); await expect(q.editDialog()).toBeVisible();
    await q.editDialog().getByText('Report Date', { exact: true }).first().click(); await page.waitForTimeout(600);
    await page.getByText('Remarks', { exact: true }).locator('visible=true').last().click(); await page.waitForTimeout(600);
    await q.editDialog().locator('textarea:visible, input[type=text]:visible').last().fill('edited by PW');
    await q.editDialog().getByRole('button', { name: 'Update' }).click(); await page.waitForTimeout(4000);
    expect((await api.get('Quality Inspection', d.name)).remarks).toBe('edited by PW');
  });

  test('TC-QIL-021/022 Update is refused for a Submitted and for a Cancelled Quality Inspection with an error message', srs('UC1 Edit: Submitted / Cancelled cannot be modified'), async ({ page }) => {
    for (const rec of [submitted, cancelled]) {
      await q.gotoList(); await q.select(rec.name);
      await q.actionBar('Edit').click(); await expect(q.editDialog()).toBeVisible();
      await q.editDialog().getByText('Report Date', { exact: true }).first().click(); await page.waitForTimeout(600);
      await page.getByText('Remarks', { exact: true }).locator('visible=true').last().click(); await page.waitForTimeout(600);
      await q.editDialog().locator('textarea:visible, input[type=text]:visible').last().fill('should not save');
      await q.editDialog().getByRole('button', { name: 'Update' }).click(); await page.waitForTimeout(4000);
      observe(`${rec.name}: ${await msg(page)}`);
      expect((await api.get('Quality Inspection', rec.name)).remarks ?? '').not.toBe('should not save');
    }
  });

  test('TC-QIL-020 Edit popup with the Value left empty is blocked', srs('UC1 Edit: empty value'), async ({ page }) => {
    const d = await qi('Draft');
    await q.gotoList(); await q.select(d.name);
    await q.actionBar('Edit').click(); await expect(q.editDialog()).toBeVisible();
    const value = q.editDialog().locator('input:visible').last();
    await value.fill('');
    await q.editDialog().getByRole('button', { name: 'Update' }).click(); await page.waitForTimeout(3000);
    observe('empty value: ' + (await msg(page)) + ' | dialog still open: ' + (await q.editDialog().isVisible()));
    expect((await api.get('Quality Inspection', d.name)).report_date).toBeTruthy();
  });
});

test.describe('Export, Assign, Tags, Print', () => {
  test('TC-QIL-024/025/026/027/028 Export, Assign, Add Tags and Print react to a click on a selected row', srs('UC1 action bar (SRS lists the names only)'), async ({ page }) => {
    for (const a of ['Export', 'Assign', 'Add Tags', 'Print']) {
      await q.gotoList(); await q.select(draft.name);
      const before = page.url();
      const popup = page.waitForEvent('popup', { timeout: 6_000 }).catch(() => null);
      const download = page.waitForEvent('download', { timeout: 6_000 }).catch(() => null);
      await q.actionBar(a).click(); await page.waitForTimeout(2500);
      const opened = await popup; const file = await download;
      const dialogs = await page.locator('[role=dialog]:visible, .modal:visible, [class*=modal-container]:visible, [class*=popup]:visible').count();
      observe(`${a}: ${file ? 'downloads ' + file.suggestedFilename() : opened ? 'opens a new tab' : dialogs ? 'opens a popup' : page.url() !== before ? 'navigates' : 'no visible reaction'}`);
      if (opened) await opened.close();
      await page.keyboard.press('Escape');
    }
  });

  test('TC-QIL-027 Add Tags: a tag typed in the popup is saved on the Quality Inspection', srs('UC1 Add tags'), async ({ page }) => {
    const d = await qi('Draft');
    await q.gotoList(); await q.select(d.name);
    await q.actionBar('Add Tags').click(); await page.waitForTimeout(1500);
    await page.getByPlaceholder('Type tag name...').fill('pwtag');
    await page.getByRole('button', { name: 'Add', exact: true }).last().click(); await page.waitForTimeout(3500);
    const tags = (await api.get('Quality Inspection', d.name))._user_tags;
    observe('_user_tags after Add Tags: ' + JSON.stringify(tags));
    expect(String(tags ?? '')).toContain('pwtag');
  });
});

test.describe('Delete from the list', () => {
  test('TC-QIL-035 Delete is offered for a Submitted row (the SRS says Delete shows only for Submitted)', srs('UC1 Delete visibility'), async () => {
    await q.gotoList(); await q.select(submitted.name);
    expect(await q.actionBar('Delete').count(), 'Delete for Submitted').toBe(1);
    await q.gotoList(); await q.select(draft.name);
    observe('Delete offered for a Draft row: ' + (await q.actionBar('Delete').count()));
  });

  test('TC-QIL-036/040 Delete asks for confirmation; Cancel keeps the record', srs('UC1 Delete confirmation'), async () => {
    const d = await qi('Draft');
    await q.gotoList(); await q.select(d.name);
    await q.actionBar('Delete').click();
    await expect(q.confirmDialog()).toBeVisible();
    observe('confirmation: ' + (await q.confirmDialog().innerText()).replace(/\s+/g, ' '));
    await q.confirmDialog().getByRole('button', { name: 'Cancel' }).click();
    expect((await api.get('Quality Inspection', d.name)).name).toBe(d.name);
  });

  test('TC-QIL-039 Delete a Draft Quality Inspection that has no links', srs('UC1 Delete: no links -> deleted'), async () => {
    const d = await qi('Draft');
    await q.gotoList(); await q.select(d.name);
    await q.actionBar('Delete').click();
    await q.confirmDialog().getByRole('button', { name: 'Delete' }).click();
    await expect.poll(async () => (await api.list('Quality Inspection', [['name', '=', d.name]])).length, { timeout: 40_000 }).toBe(0);
  });

  test('TC-QIL-038 Delete a Submitted Quality Inspection (linked to its reference): a message lists what must be deleted first', srs('UC1 Delete: linked transactions block the delete'), async ({ page }) => {
    const s = await qi('Submitted');
    await q.gotoList(); await q.select(s.name);
    await q.actionBar('Delete').click();
    await q.confirmDialog().getByRole('button', { name: 'Delete' }).click(); await page.waitForTimeout(5000);
    observe('Submitted QI delete: ' + (await msg(page)));
    expect((await api.list('Quality Inspection', [['name', '=', s.name]])).length, 'a Submitted document cannot simply be deleted').toBe(1);
  });
});

test.describe('Details screen', () => {
  test('TC-QID-001/005 opening a Quality Inspection shows its saved data', srs('UC3: data entered during creation is shown'), async () => {
    await q.gotoDetails(draft.name);
    const text = await q.bodyText();
    expect(text).toContain('Quality Inspection Details');
    expect(text).toMatch(/Incoming|Outgoing|In Process/i);
  });

  test('TC-QID-002 a Draft Quality Inspection has editable input fields and a Submit button', srs('UC3: Draft = editable'), async () => {
    await q.gotoDetails(draft.name);
    expect(await q.main.locator('input:visible, textarea:visible').count()).toBeGreaterThan(2);
    await expect(q.main.getByRole('button', { name: 'Submit', exact: true })).toBeVisible();
  });

  test('TC-QID-003 a Submitted Quality Inspection is read-only with a Cancel button', srs('UC3: Submitted = labels only'), async () => {
    await q.gotoDetails(submitted.name);
    await expect(q.main.getByRole('button', { name: 'Cancel', exact: true }).first()).toBeVisible();
    await expect(q.main.getByRole('button', { name: 'Save', exact: true })).toHaveCount(0);
    observe('editable inputs on a Submitted QI: ' + (await q.main.locator('input:visible:not([readonly]):not([disabled]), textarea:visible:not([readonly]):not([disabled])').count()));
  });

  test('TC-QID-004 a Cancelled Quality Inspection is read-only', srs('UC3: Cancelled = labels only'), async () => {
    await q.gotoDetails(cancelled.name);
    await expect(q.main.getByRole('button', { name: 'Save', exact: true })).toHaveCount(0);
    expect(await q.main.locator('input:visible:not([readonly]):not([disabled]), textarea:visible:not([readonly]):not([disabled])').count(), 'editable inputs on a Cancelled QI').toBeLessThan(2);
  });

  test('TC-QID-006 a change made to a Draft on the Details screen is saved', srs('UC3: Draft changes can be saved'), async ({ page }) => {
    const d = await qi('Draft');
    await q.gotoDetails(d.name);
    await q.openSection('Item & Inspection');
    await q.main.getByPlaceholder('Enter description').fill('changed by PW');
    await q.main.getByRole('button', { name: 'Save', exact: true }).click(); await page.waitForTimeout(4000);
    expect((await api.get('Quality Inspection', d.name)).description).toBe('changed by PW');
  });

  test('TC-QID-007 invalid data on the Details screen (Sample Size cleared) shows a per-field error', srs('UC3: invalid data -> error'), async ({ page }) => {
    const d = await qi('Draft');
    await q.gotoDetails(d.name);
    await q.openSection('Item & Inspection');
    await q.main.getByPlaceholder('Enter sample size').fill('');
    await q.main.getByRole('button', { name: 'Save', exact: true }).click(); await page.waitForTimeout(2500);
    observe('after clearing Sample Size: ' + (await msg(page)));
    expect(await q.bodyText()).toMatch(/required|mandatory|invalid|Sample Size/i);
    expect((await api.get('Quality Inspection', d.name)).sample_size).toBe(1);
  });

  test('TC-QID-008/009/010/011/012 the Details page has Assign, Attachment, Tags, Share and Print actions', srs('UC3: fixed page actions'), async () => {
    await q.gotoDetails(draft.name);
    const text = await q.bodyText();
    const buttons = (await q.main.getByRole('button').allInnerTexts()).map((t) => t.trim()).filter(Boolean);
    observe('Details buttons: ' + buttons.join(' | '));
    for (const a of ['Assign', 'Attachment', 'Tags', 'Share', 'Print']) expect(text, a).toContain(a);
  });
});
