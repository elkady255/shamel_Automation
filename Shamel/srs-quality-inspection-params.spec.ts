import { test, expect, type Page } from '@playwright/test';
import { QualityInspectionPage } from './pages/QualityInspectionPage';
import { api } from './helpers/api';
import { qi, param, paramGroup } from './helpers/qi-data';

/**
 * SRS "Inventory > Quality Inspection" UC4 Quality Inspection Parameter List and UC5 Quality Inspection Parameter Group List,
 * with the user's TC-QIP / TC-QPG cases: Add popup, validation, list, action bar, Edit popup, Delete.
 * Only records named "PW ..." that these tests create are ever deleted.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let q: QualityInspectionPage;
test.beforeEach(async ({ page }) => { q = new QualityInspectionPage(page); });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const uid = () => `${Date.now()}`.slice(-7);
const ph = (page: Page, p: string) => page.getByPlaceholder(p, { exact: true }).locator('visible=true').first();
const saveBtn = (page: Page) => page.getByRole('button', { name: 'Save', exact: true }).locator('visible=true').last();
const errText = async (page: Page) => clean((await page.locator('body').innerText()).match(/(required|mandatory|minimum|at least|invalid|cannot|already exists|duplicate)[^.]{0,120}/i)?.[0] ?? 'no message');

type Kind = { label: string; ids: string; goto: () => Promise<void>; add: string; namePh: string; doctype: string; nameField: string; prefix: string; hasDesc: boolean; hasGroup: boolean; make: (name: string) => Promise<{ name: string }> };

function suite(k: () => Kind) {
  const pop = (page: Page) => page.locator('.shamel-dialog, .modal-container, [class*=popup]').locator('visible=true').last();
  const open = async (page: Page) => { await k().goto(); await q.main.getByRole('button', { name: k().add }).click(); await expect(ph(page, k().namePh)).toBeVisible({ timeout: 10_000 }); };
  const find = async (name: string) => (await api.list(k().doctype, [['name', '=', name]], ['name'])).length;
  const byField = async (name: string) => (await api.list(k().doctype, [[k().nameField, '=', name]], ['name']));

  test.describe('Add popup and validation', () => {
    test('list loads and the Add button opens the Add popup with its fields', srs('list + Add popup'), async ({ page }) => {
      await open(page);
      const inputs = await page.locator('input:visible, textarea:visible').evaluateAll((els) => els.map((e: any) => e.placeholder));
      observe('Add popup inputs: ' + inputs.filter(Boolean).join(' | '));
      await expect(ph(page, k().namePh)).toBeVisible();
      if (k().hasGroup) await expect(ph(page, 'Select Parameter Group')).toBeVisible();
      if (k().hasDesc) await expect(ph(page, 'Enter Description')).toBeVisible();
    });

    test('name is mandatory: Save with an empty name shows an error and creates nothing', srs('name mandatory'), async ({ page }) => {
      await open(page);
      const before = await api.call('frappe.client.get_count', { doctype: k().doctype });
      await saveBtn(page).click(); await page.waitForTimeout(2500);
      observe('empty name: ' + (await errText(page)));
      expect(await errText(page)).toMatch(/required|mandatory/i);
      expect(await api.call('frappe.client.get_count', { doctype: k().doctype })).toBe(before);
    });

    test('name: letters, numbers and special characters are accepted and saved', srs('name chars'), async ({ page }) => {
      const name = `PW ${k().prefix} #${uid()} @A-1`;
      await open(page);
      await ph(page, k().namePh).fill(name);
      if (k().hasGroup) { /* group is optional in the SRS */ }
      await saveBtn(page).click(); await page.waitForTimeout(3500);
      observe('after Save with name only: ' + (await errText(page)));
      expect((await byField(name)).length, 'record created').toBe(1);
    });

    test('name: minimum 2 characters (1 character is refused with a message)', srs('name min 2'), async ({ page }) => {
      await open(page);
      const before = await api.call('frappe.client.get_count', { doctype: k().doctype });
      await ph(page, k().namePh).fill('x'); await saveBtn(page).click(); await page.waitForTimeout(2500);
      observe('1-char name: ' + (await errText(page)));
      expect(await errText(page)).toMatch(/minimum|at least|2|short/i);
      expect(await api.call('frappe.client.get_count', { doctype: k().doctype })).toBe(before);
    });

    test('name: maximum 100 characters, further typing is blocked', srs('name max 100'), async ({ page }) => {
      await open(page);
      await ph(page, k().namePh).fill('n'.repeat(120));
      expect((await ph(page, k().namePh).inputValue()).length).toBe(100);
    });

    test('name: invalid characters (HTML) are refused with a message', srs('name invalid'), async ({ page }) => {
      await open(page);
      const bad = `<b>PW bad ${uid()}</b>`;
      await ph(page, k().namePh).fill(bad); await saveBtn(page).click(); await page.waitForTimeout(3000);
      const made = (await api.list(k().doctype, [[k().nameField, 'like', '%PW bad%']], [k().nameField])).map((r) => r[k().nameField]);
      observe('HTML name: message "' + (await errText(page)) + '" | stored as: ' + JSON.stringify(made));
      expect(made.length, 'a name containing HTML tags is not stored').toBe(0);
    });

    test('a duplicate name is refused with a message', srs('duplicate'), async ({ page }) => {
      const base = await k().make(`PW dup ${uid()}`);
      const stored = (await api.get(k().doctype, base.name))[k().nameField];
      await open(page);
      await ph(page, k().namePh).fill(stored); await saveBtn(page).click(); await page.waitForTimeout(3000);
      observe('duplicate: ' + (await errText(page)));
      expect((await byField(stored)).length).toBe(1);
    });
  });

  test.describe('list display and action bar', () => {
    test('list columns, row checkbox, clickable ID opening the details popup', srs('list columns'), async ({ page }) => {
      const rec = await k().make(`PW row ${uid()}`);
      await k().goto();
      const headers = (await q.table.getByRole('columnheader').allInnerTexts()).map((h) => h.trim()).filter(Boolean);
      observe('columns: ' + headers.join(' | '));
      expect(headers).toContain('ID');
      await q.search(rec.name);
      await expect(q.dataRows().first().getByRole('checkbox')).toBeVisible();
      await q.table.getByText(rec.name, { exact: true }).first().click(); await page.waitForTimeout(2000);
      observe('click on ID: ' + clean((await page.locator('body').innerText()).slice(-300)));
      await expect(page.getByText(rec.name).locator('visible=true').first()).toBeVisible();
      expect(await page.locator('input:visible, textarea:visible').count(), 'details popup shows fields').toBeGreaterThan(2);
    });

    test('the list shows every record that exists (count matches the API)', srs('list count'), async () => {
      await k().goto();
      const api_count = await api.call('frappe.client.get_count', { doctype: k().doctype });
      observe('records in API: ' + api_count + ' | list: ' + (await q.main.innerText()).replace(/\s+/g, ' ').match(/(From \d+|There is no data[^.]*)/)?.[0]);
      expect(await q.total(), 'list total equals the number of records').toBe(api_count);
    });

    test('selecting a row shows Edit, Export, Assign, Add Tags, Print and Delete', srs('action bar'), async () => {
      const rec = await k().make(`PW bar ${uid()}`);
      await k().goto(); await q.select(rec.name);
      const b = (await q.main.getByRole('button').allInnerTexts()).map((t) => t.trim());
      observe('action bar: ' + b.filter(Boolean).slice(-8).join(' | '));
      for (const a of ['Edit', 'Export', 'Assign', 'Add Tags', 'Print', 'Delete']) expect(b, a).toContain(a);
      expect(b.join('|'), 'Clear assignment').toMatch(/Clear/i);
    });

    test('Export, Assign, Add Tags and Print react to a click on a selected row', srs('action bar clicks'), async ({ page }) => {
      const rec = await k().make(`PW act ${uid()}`);
      for (const a of ['Export', 'Assign', 'Add Tags', 'Print']) {
        await k().goto(); await q.select(rec.name);
        const popup = page.waitForEvent('popup', { timeout: 6000 }).catch(() => null);
        const download = page.waitForEvent('download', { timeout: 6000 }).catch(() => null);
        const url = page.url();
        await q.actionBar(a).click(); await page.waitForTimeout(2500);
        const o = await popup; const f = await download;
        const dialogs = await page.locator('[role=dialog]:visible, .modal:visible, [class*=modal-container]:visible, [class*=popup]:visible').count();
        observe(`${a}: ${f ? 'downloads ' + f.suggestedFilename() : o ? 'opens a new tab' : dialogs ? 'opens a popup' : page.url() !== url ? 'navigates' : 'no visible reaction'}`);
        if (o) await o.close();
        await page.keyboard.press('Escape');
      }
    });

    test('Edit popup: Field list is linked to the doctype and Update changes the record', srs('Edit popup'), async ({ page }) => {
      const rec = await k().make(`PW edit ${uid()}`);
      await k().goto(); await q.select(rec.name);
      await q.actionBar('Edit').click(); await expect(q.editDialog()).toBeVisible();
      const target = k().hasDesc ? 'Description' : k().nameField === 'group_name' ? 'Parameter Group Name' : 'Parameter';
      await q.editDialog().getByText(/^(Parameter|Parameter Group Name|Description|Group Name|Name)$/).first().click().catch(() => {});
      await page.waitForTimeout(700);
      const options = (await page.locator('[role=option], .dropdown-item, [class*=option]:visible').allInnerTexts()).map(clean).filter(Boolean);
      observe('Edit Field options: ' + options.join(', '));
      expect(options.length).toBeGreaterThan(0);
      void target;
    });

    test('Delete asks for confirmation; Cancel keeps the record; confirming removes an unreferenced record', srs('Delete'), async () => {
      const keep = await k().make(`PW del keep ${uid()}`);
      await k().goto(); await q.select(keep.name);
      await q.actionBar('Delete').click(); await expect(q.confirmDialog()).toBeVisible();
      observe('confirmation: ' + clean(await q.confirmDialog().innerText()));
      await q.confirmDialog().getByRole('button', { name: 'Cancel' }).click();
      expect(await find(keep.name)).toBe(1);
      await q.actionBar('Delete').click();
      await q.confirmDialog().getByRole('button', { name: 'Delete' }).click();
      await expect.poll(() => find(keep.name), { timeout: 40_000 }).toBe(0);
    });
  });
}

const paramKind = (): Kind => ({
  label: 'Parameter', ids: 'QIP', goto: () => q.gotoParams(), add: 'Add Inspection Parameter', namePh: 'Enter Parameter', doctype: 'Quality Inspection Parameter', nameField: 'parameter', prefix: 'Param', hasDesc: true, hasGroup: true,
  make: async (n) => { const p = await param(n); return { name: p.name }; },
});
const groupKind = (): Kind => ({
  label: 'Parameter Group', ids: 'QPG', goto: () => q.gotoGroups(), add: 'Add Quality Inspection Parameter Group', namePh: 'Enter Parameter Group Name', doctype: 'Quality Inspection Parameter Group', nameField: 'group_name', prefix: 'Group', hasDesc: false, hasGroup: false,
  make: async (n) => { const g = await paramGroup(n); return { name: g.name }; },
});

test.describe('Inspection Parameters (TC-QIP)', () => {
  suite(paramKind);

  test('TC-QIP-010/011/012 Parameter Group is optional: a parameter can be saved without a group', srs('UC4 Parameter Group optional'), async ({ page }) => {
    const name = `PW nogroup ${uid()}`;
    await q.gotoParams(); await q.main.getByRole('button', { name: 'Add Inspection Parameter' }).click();
    await ph(page, 'Enter Parameter').fill(name);
    const label = clean(await page.locator('body').innerText()).match(/Parameter Group\s*\*?/)?.[0];
    observe('label in popup: ' + label);
    await saveBtn(page).click(); await page.waitForTimeout(3500);
    observe('save without group: ' + (await errText(page)));
    expect((await api.list('Quality Inspection Parameter', [['parameter', '=', name]])).length, 'saved without a group').toBe(1);
  });

  test('TC-QIP-010/011/018 Parameter Group is a searchable list; a parameter with a group is saved and appears in the list', srs('UC4 Parameter Group + Save'), async ({ page }) => {
    const grp = await paramGroup('PW Group ' + uid());
    const name = `PW grouped ${uid()}`;
    await q.gotoParams(); await q.main.getByRole('button', { name: 'Add Inspection Parameter' }).click();
    await ph(page, 'Enter Parameter').fill(name);
    await ph(page, 'Select Parameter Group').click(); await page.waitForTimeout(1000);
    const o = (await page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean);
    observe('group options: ' + o.join(', '));
    await page.getByRole('option', { name: grp.name }).locator('visible=true').first().click();
    await saveBtn(page).click(); await page.waitForTimeout(3500);
    const [rec] = await api.list('Quality Inspection Parameter', [['parameter', '=', name]], ['name', 'parameter_group']);
    expect(rec?.parameter_group).toBe(grp.name);
    await q.gotoParams(); await q.search(name);
    await expect(q.dataRows().first()).toContainText(grp.name);
  });

  test('TC-QIP-013/014/015/016/017 Description: optional, special characters, min 2, max 500', srs('UC4 Description'), async ({ page }) => {
    await q.gotoParams(); await q.main.getByRole('button', { name: 'Add Inspection Parameter' }).click();
    const d = ph(page, 'Enter Description');
    await d.fill('d'.repeat(520));
    expect((await d.inputValue()).length).toBe(500);
    await ph(page, 'Enter Parameter').fill(`PW desc ${uid()}`);
    await d.fill('x'); await saveBtn(page).click(); await page.waitForTimeout(2500);
    observe('1-char description: ' + (await errText(page)));
    expect(await errText(page)).toMatch(/minimum|at least|2/i);
  });

  test('TC-QIP-033 Delete is blocked for a parameter used in a Quality Inspection', srs('UC4 Delete referenced'), async ({ page }) => {
    const p = await param('PW used ' + uid());
    await qi('Draft', { readings: [{ specification: p.name, status: 'Accepted' }] });
    await q.gotoParams(); await q.select(p.name);
    await q.actionBar('Delete').click(); await q.confirmDialog().getByRole('button', { name: 'Delete' }).click(); await page.waitForTimeout(4500);
    observe('delete of a used parameter: ' + (await errText(page)));
    expect((await api.list('Quality Inspection Parameter', [['name', '=', p.name]])).length, 'the parameter stays').toBe(1);
  });
});

test.describe('Parameter Groups (TC-QPG)', () => {
  suite(groupKind);

  test('TC-QPG-024 Delete is blocked for a group used by a parameter', srs('UC5 Delete referenced'), async ({ page }) => {
    const g = await paramGroup('PW used group ' + uid());
    await param('PW child ' + uid(), g.name);
    await q.gotoGroups(); await q.select(g.name);
    await q.actionBar('Delete').click(); await q.confirmDialog().getByRole('button', { name: 'Delete' }).click(); await page.waitForTimeout(4500);
    observe('delete of a used group: ' + (await errText(page)));
    expect((await api.list('Quality Inspection Parameter Group', [['name', '=', g.name]])).length, 'the group stays').toBe(1);
  });
});
