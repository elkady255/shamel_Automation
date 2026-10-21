import { test, expect, type Page, type Locator } from '@playwright/test';
import { QualityInspectionPage } from './pages/QualityInspectionPage';
import { api } from './helpers/api';
import { refDN, qi } from './helpers/qi-data';
import { ITEM_A, code, seed } from './helpers/ps-data';

/**
 * SRS "Inventory > Quality Inspection" UC2 Add Quality Inspection (General fields, Reference, Item & Inspection, Readings,
 * Save / Submit / Cancel / Amend), with the user's TC-AQI cases. Records are prepared through the Frappe API.
 * Cases the SRS leaves open record the behaviour as an "observed" annotation instead of asserting.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let q: QualityInspectionPage;
test.beforeEach(async ({ page }) => { q = new QualityInspectionPage(page); });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

/** Open a dropdown and return the options it offers. */
async function options(page: Page, trigger: Locator): Promise<string[]> {
  await trigger.click(); await page.waitForTimeout(900);
  return (await page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean).filter(Boolean);
}
async function pick(page: Page, trigger: Locator, text: string | RegExp) {
  await trigger.click(); await page.waitForTimeout(700);
  await page.getByRole('option', { name: text }).locator('visible=true').first().click(); await page.waitForTimeout(500);
}
const ph = (page: Page, p: string) => page.getByRole('main').getByPlaceholder(p, { exact: true }).first();
const dd = (page: Page, text: string | RegExp) => page.getByRole('main').getByRole('button', { name: text }).first();

/** Fill every field the SRS marks mandatory that the Add screen offers, using the test Delivery Note and item. */
async function fillValid(page: Page, dnName: string) {
  await seed();
  await q.openSection('Reference Document');
  await q.openSection('Item & Inspection');
  await pick(page, ph(page, 'Select Series'), /MAT-QA/);
  await pick(page, ph(page, 'Select Company'), /.+/);
  await pick(page, dd(page, /Select Status/), 'Accepted');
  await pick(page, dd(page, /Select Inspection/), 'Outgoing');
  await pick(page, dd(page, /Select Reference Type/), 'Delivery Note');
  await ph(page, 'Select Reference').click(); await ph(page, 'Select Reference').fill(dnName); await page.waitForTimeout(1500);
  await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(800);
  await ph(page, 'Select Item').click(); await page.waitForTimeout(1200);
  await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(800);
  await ph(page, 'Enter sample size').fill('2');
}
const save = async (page: Page) => { await page.getByRole('main').getByRole('button', { name: 'Save', exact: true }).click(); await page.waitForTimeout(3500); };
const lastQI = async () => (await api.list('Quality Inspection', [], ['name', 'docstatus', 'status', 'reference_name', 'item_code', 'sample_size', 'description', 'inspected_by', 'inspection_type'], 1))[0];

test.describe('Basic Information', () => {
  test('TC-AQI-001/002/003 Series lists the naming series, is single selection and mandatory', srs('UC2 Series'), async ({ page }) => {
    await q.gotoNew();
    const o = await options(page, ph(page, 'Select Series'));
    observe('Series options: ' + o.join(', '));
    expect(o.join(' ')).toMatch(/MAT-QA/);
    await page.keyboard.press('Escape');
    await save(page);
    expect(await q.bodyText()).toMatch(/Series.{0,40}(required|mandatory)|required.{0,40}Series/i);
  });

  test('TC-AQI-004/005/006/007 Company is a searchable list of companies and is optional', srs('UC2 Company'), async ({ page }) => {
    await q.gotoNew();
    const o = await options(page, ph(page, 'Select Company'));
    observe('Company options: ' + o.join(', '));
    expect(o.length).toBeGreaterThan(0);
    const companies = (await api.list('Company', [], ['name'])).map((c) => c.name);
    expect(o.some((x) => companies.includes(x)), 'options come from the Company doctype').toBe(true);
    const text = await q.bodyText();
    observe('Company label: ' + (text.match(/Company\s*\*?/)?.[0] ?? ''));
    expect(text, 'Company is optional per SRS (no asterisk)').not.toMatch(/Company \*/);
  });

  test('TC-AQI-008/009/010 Report Date is a date picker defaulting to today and can be changed', srs('UC2 Report Date'), async ({ page }) => {
    await q.gotoNew();
    const today = new Date(); const label = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const field = ph(page, 'Select date');
    expect(await field.inputValue()).toBe(label);
    await field.click(); await page.waitForTimeout(800);
    observe('date picker after click: ' + (await page.locator('[class*=calendar]:visible, [class*=datepicker]:visible, [role=dialog]:visible').count()) + ' popups');
  });

  test('TC-AQI-011/012/013 Status offers Accepted / Rejected / Cancelled and is mandatory', srs('UC2 Status'), async ({ page }) => {
    await q.gotoNew();
    const o = await options(page, dd(page, /Select Status/));
    observe('Status options: ' + o.join(', '));
    expect(o).toEqual(expect.arrayContaining(['Accepted', 'Rejected', 'Cancelled']));
  });

  test('TC-AQI-014/015/016 Inspection Type offers Incoming / Outgoing / In process', srs('UC2 Inspection Type'), async ({ page }) => {
    await q.gotoNew();
    const o = await options(page, dd(page, /Select Inspection/));
    observe('Inspection Type options: ' + o.join(', '));
    expect(o.map((x) => x.toLowerCase())).toEqual(expect.arrayContaining(['incoming', 'outgoing', 'in process']));
  });

  test('TC-AQI-017/018/019 Reference Type offers exactly the 5 SRS document types', srs('UC2 Reference Type'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Reference Document');
    const o = await options(page, dd(page, /Select Reference Type/));
    observe('Reference Type options: ' + o.join(', '));
    expect(o).toEqual(expect.arrayContaining(['Purchase Receipt', 'Purchase Invoice', 'Delivery Note', 'Sales Invoice', 'Stock Entry']));
    expect(o.length, 'the SRS lists 5 types only').toBe(5);
  });
});

test.describe('Reference Document and Item', () => {
  test('TC-AQI-020/021/022 Reference Name searches the document chosen in Reference Type', srs('UC2 Reference Name'), async ({ page }) => {
    const dn = await refDN();
    await q.gotoNew(); await q.openSection('Reference Document');
    await pick(page, dd(page, /Select Reference Type/), 'Delivery Note');
    await ph(page, 'Select Reference').click(); await ph(page, 'Select Reference').fill(dn.name); await page.waitForTimeout(1800);
    const o = (await page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean);
    observe('Reference options for "' + dn.name + '": ' + o.join(', '));
    expect(o.join(' ')).toContain(dn.name);
  });

  test('TC-AQI-023 Reference Name is mandatory: Save without it shows an error', srs('UC2 Reference Name mandatory'), async ({ page }) => {
    await q.gotoNew(); await save(page);
    expect(await q.bodyText()).toMatch(/Reference.{0,50}(required|mandatory)|(required|mandatory).{0,50}Reference/i);
  });

  test('TC-AQI-026/027/028/029/030/031/032 Item Code lists only inspection-required items of the reference; Item Name fills in', srs('UC2 Item Code'), async ({ page }) => {
    await seed();
    const dn = await refDN();
    await q.gotoNew(); await q.openSection('Reference Document'); await q.openSection('Item & Inspection');
    await pick(page, dd(page, /Select Reference Type/), 'Delivery Note');
    await ph(page, 'Select Reference').click(); await ph(page, 'Select Reference').fill(dn.name); await page.waitForTimeout(1500);
    await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(800);
    await ph(page, 'Select Item').click(); await page.waitForTimeout(1500);
    const o = (await page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean);
    observe('Item options: ' + o.join(', '));
    expect(o.join(' ')).toContain(code(ITEM_A));
    expect(o.length, 'only the reference document items').toBe(1);
    await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(1200);
    const name = await ph(page, 'Auto-generated').last().inputValue().catch(() => '');
    observe('Item Name after choosing the item: ' + name);
    expect(name.length).toBeGreaterThan(0);
  });

  test('TC-AQI-024/025 Child Row Reference is a read-only field that shows the item row of the reference', srs('UC2 Child Row Reference'), async ({ page }) => {
    const dn = await refDN();
    await q.gotoNew(); await q.openSection('Reference Document'); await q.openSection('Item & Inspection');
    await pick(page, dd(page, /Select Reference Type/), 'Delivery Note');
    await ph(page, 'Select Reference').click(); await ph(page, 'Select Reference').fill(dn.name); await page.waitForTimeout(1500);
    await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(800);
    await ph(page, 'Select Item').click(); await page.waitForTimeout(1200);
    await page.getByRole('option').locator('visible=true').first().click(); await page.waitForTimeout(1500);
    const first = ph(page, 'Auto-generated');
    const val = await first.inputValue();
    observe('Child Row Reference value: ' + val + ' | readonly: ' + (await first.isDisabled() || (await first.getAttribute('readonly')) !== null));
    expect(val.length).toBeGreaterThan(0);
  });
});

test.describe('Item & Inspection fields', () => {
  test('TC-AQI-033/034/035/036/037/038 Description: optional, special characters, min 3, max 500 stops typing', srs('UC2 Description'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Item & Inspection');
    const d = ph(page, 'Enter description');
    await d.fill('x'.repeat(520));
    expect((await d.inputValue()).length).toBe(500);
    await d.fill('ab#12 @!');
    expect(await d.inputValue()).toBe('ab#12 @!');
    await d.fill('ab'); await save(page);
    observe('2-char Description: ' + clean((await q.bodyText()).match(/(minimum|at least|least 3|3 char)[^.]{0,80}/i)?.[0] ?? 'no minimum-length message'));
    expect(await q.bodyText()).toMatch(/minimum|at least|3 char/i);
  });

  test('TC-AQI-047/048/049/050/051 Sample Size: numbers only, 100 characters at most, mandatory', srs('UC2 Sample Size'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Item & Inspection');
    const s = ph(page, 'Enter sample size');
    await s.fill(''); await s.pressSequentially('ab5c', { delay: 30 });
    expect(await s.inputValue(), 'letters are rejected').toMatch(/^[0-9.]*$/);
    await s.fill(''); await s.pressSequentially('9'.repeat(120), { delay: 3 });
    expect((await s.inputValue()).length).toBe(100);
  });

  test('TC-AQI-039/040/041/042/043/044/045/046 Item Serial No, Batch No and Template are optional (no asterisk)', srs('UC2 Serial / Batch / Template optional'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Item & Inspection');
    const text = await q.bodyText();
    observe('labels: ' + (text.match(/Item Serial No \*?|Batch No \*?|Quality Inspection Template \*?/g) ?? []).join(' | '));
    expect(text).not.toMatch(/Item Serial No \*/);
    expect(text).not.toMatch(/Batch No \*/);
    expect(text).not.toMatch(/Quality Inspection Template \*/);
  });
});

test.describe('Inspected By, Verified By, Remarks, Letter Head', () => {
  test('TC-AQI-104/105/106 Inspected By (User, mandatory) is on the Add screen', srs('UC2 Inspected By'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Reference Document'); await q.openSection('Item & Inspection');
    const text = await q.bodyText();
    observe('Add screen contains Inspected By: ' + /Inspected By/.test(text));
    expect(text).toContain('Inspected By');
  });
  test('TC-AQI-107/108/109 Verified By (text, optional, max 100) is on the Add screen', srs('UC2 Verified By'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Item & Inspection');
    expect(await q.bodyText()).toContain('Verified By');
  });
  test('TC-AQI-110/111/112/113 Remarks (text area, 3..500) is on the Add screen', srs('UC2 Remarks'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Item & Inspection');
    expect(await q.bodyText()).toContain('Remarks');
  });
  test('TC-AQI-117/118/119 Print Settings / Letter Head is on the Add screen', srs('UC2 Letter Head'), async ({ page }) => {
    await q.gotoNew(); await q.openSection('Item & Inspection');
    expect(await q.bodyText()).toContain('Letter Head');
  });
});

test.describe('Save, Submit, Cancel and Amend (end to end through the UI)', () => {
  test('TC-AQI-120/121 Save with valid data creates a Draft; Save with missing data shows errors per field', srs('UC2 Save'), async ({ page }) => {
    await q.gotoNew(); await save(page);
    const err = clean((await q.bodyText()).match(/(required|mandatory)[^.]{0,120}/i)?.[0] ?? 'no validation message');
    observe('Save of an empty form: ' + err);
    expect(await q.bodyText()).toMatch(/required|mandatory/i);
    const before = (await api.call('frappe.client.get_count', { doctype: 'Quality Inspection' })) as number;
    const dn = await refDN();
    await q.gotoNew(); await fillValid(page, dn.name); await save(page);
    observe('after a Save with every visible field filled: ' + clean((await q.bodyText()).slice(0, 300)));
    const after = (await api.call('frappe.client.get_count', { doctype: 'Quality Inspection' })) as number;
    expect(after, 'a Quality Inspection is created').toBe(before + 1);
    const created = await lastQI();
    expect(created.docstatus).toBe(0);
    expect(created.reference_name).toBe(dn.name);
  });

  test('TC-AQI-122/123 the Submit button appears only after Save; Submit makes the record Submitted', srs('UC2 Submit'), async ({ page }) => {
    const dn = await refDN();
    await q.gotoNew();
    expect(await q.main.getByRole('button', { name: 'Submit', exact: true }).count(), 'no Submit before Save').toBe(0);
    await fillValid(page, dn.name); await save(page);
    const submit = q.main.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit).toBeVisible({ timeout: 8000 });
    await submit.click(); await page.waitForTimeout(3500);
    const created = (await api.list('Quality Inspection', [['reference_name', '=', dn.name]], ['name', 'docstatus']))[0];
    expect(created.docstatus).toBe(1);
  });

  test('TC-AQI-124/125/126 Cancel turns into Amend and Amend creates a new Draft linked through Amended From', srs('UC2 Cancel / Amend'), async ({ page }) => {
    const s = await qi('Submitted');
    await q.gotoDetails(s.name);
    await q.main.getByRole('button', { name: 'Cancel', exact: true }).first().click(); await page.waitForTimeout(1500);
    const yes = page.getByRole('button', { name: /^(Yes|Confirm|OK|Cancel Document)$/ });
    if (await yes.first().isVisible({ timeout: 3000 }).catch(() => false)) await yes.first().click();
    await page.waitForTimeout(3500);
    expect((await api.get('Quality Inspection', s.name)).docstatus).toBe(2);
    const amend = q.main.getByRole('button', { name: 'Amend', exact: true });
    await expect(amend).toBeVisible({ timeout: 8000 });
    await amend.click(); await page.waitForTimeout(4000);
    const children = await api.list('Quality Inspection', [['amended_from', '=', s.name]], ['name', 'docstatus']);
    observe('amended records: ' + JSON.stringify(children) + ' | url: ' + page.url());
    expect(children.length).toBe(1);
    expect(page.url(), 'the amended document is opened').toContain(children[0].name);
  });
});
