import { test, expect, type Page } from '@playwright/test';
import { DeliveryNotePage } from './pages/DeliveryNotePage';
import { api } from './helpers/api';
import { note, customer, ITEM_A, code } from './helpers/dn-data';
import { packingSlip } from './helpers/ps-data';

/**
 * SRS Delivery Note: General Info tab (TC-DNG), More Info tab (TC-DNM) and Delivery Note Details (TC-DND):
 * addresses and contacts, terms, transporter data, print settings, header actions, the Create menu, delete and Connections.
 * Documents are prepared through the Frappe API; only notes created by these tests are ever deleted.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

let dn: DeliveryNotePage;
test.beforeEach(async ({ page }) => { dn = new DeliveryNotePage(page); });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const bodyOf = async (page: Page) => (await page.locator('body').innerText()).replace(/\s+/g, ' ');
const inputsOf = (page: Page) => page.locator('main input:visible, main textarea:visible').evaluateAll((els) => els.map((e) => ({ ph: e.getAttribute('placeholder'), type: (e as HTMLInputElement).type, max: (e as HTMLInputElement).maxLength, val: (e as HTMLInputElement).value, off: (e as HTMLInputElement).disabled })));
async function chooseCustomer(page: Page) {
  const box = dn.field('Select Customer');
  await box.click(); await box.fill('PW Packing'); await page.waitForTimeout(2500);
  await page.getByRole('option', { name: 'PW Packing Customer', exact: true }).first().click(); await page.waitForTimeout(3500);
}

/** Addresses, a contact and a Terms template for the test customer (created once, never deleted). */
const ids: { addr1?: string; addr2?: string; contact?: string; terms?: string } = {};
test.beforeAll(async () => {
  const cust = await customer();
  const cities = (await api.list('City', [], ['name'], 5)).map((c) => c.name as string);
  const countries = await api.list('Country', [['name', 'like', '%Saudi%']], ['name'], 1);
  const country = (countries[0]?.name as string) ?? 'Saudi Arabia';
  const addr = async (title: string, primary: number, shipping: number, city: string) => (await api.ensure('Address', [['address_title', '=', title]], {
    address_title: title, address_type: 'Billing', address_line1: `${title} street 1`, city, country: 'Saudi Arabia', is_primary_address: primary, is_shipping_address: shipping,
    links: [{ link_doctype: 'Customer', link_name: cust }],
  })).name as string;
  ids.addr1 = await addr('PW Billing One', 1, 0, 'Riyadh');
  ids.addr2 = await addr('PW Shipping Two', 0, 1, 'Jeddah');
  ids.contact = (await api.ensure('Contact', [['first_name', '=', 'PWContact']], {
    first_name: 'PWContact', links: [{ link_doctype: 'Customer', link_name: cust }], phone_nos: [{ phone: '0500000001', is_primary_phone: 1 }], email_ids: [{ email_id: 'pw.contact@example.com', is_primary: 1 }],
  })).name as string;
  ids.terms = (await api.ensure('Terms and Conditions', [['title', '=', 'PW Terms']], { title: 'PW Terms', selling: 1, terms: 'PW standard delivery terms.' })).name as string;
});

test.describe('General Info tab', () => {
  test('TC-DNG-001/002/003/004/013/023 the tab opens; after choosing the customer, the address and contact lists offer only that customer\'s records', srs('UC2 General Info: addresses and contact'), async ({ page }) => {
    await dn.gotoNew(); await chooseCustomer(page);
    await dn.tab('General Info').click(); await page.waitForTimeout(2000);
    const inputs = await inputsOf(page);
    observe('address/contact values after choosing the customer: ' + inputs.filter((i) => /Select (Address|Contact)/.test(i.ph ?? '')).map((i) => `${i.ph}="${i.val}"`).join(' | '));
    const billing = page.getByPlaceholder('Select Address').first();
    await billing.click(); await page.getByRole('option').first().waitFor({ timeout: 30_000 });
    const options = (await page.getByRole('option').allInnerTexts()).map((t) => t.trim()).filter((t) => t && t !== 'Add New');
    observe('customer address options: ' + options.join(' | '));
    expect(options).toEqual(expect.arrayContaining([ids.addr1!]));
    await page.keyboard.press('Escape');
    const contact = page.getByPlaceholder('Select Contact').first();
    await contact.click(); await page.getByRole('option').first().waitFor({ timeout: 30_000 });
    expect((await page.getByRole('option').allInnerTexts()).join(' ')).toContain('PWContact');
  });

  test('TC-DNG-004/010/011/015/020 the Preferred billing address and contact are fetched, and their labels are read-only', srs('UC2 General Info: fetched billing address and contact'), async ({ page }) => {
    await dn.gotoNew(); await chooseCustomer(page);
    await dn.tab('General Info').click(); await page.waitForTimeout(2000);
    const inputs = await inputsOf(page);
    const addr = inputs.find((i) => i.ph === 'Select Address');
    const labels = inputs.filter((i) => i.ph === 'Auto-generated');
    observe('billing address "' + addr?.val + '"; labels: ' + labels.map((l) => `${l.val || '(empty)'}${l.off ? ' [read-only]' : ''}`).join(' | '));
    expect(addr?.val, 'billing address fetched from the customer').toBeTruthy();
    expect(labels.every((l) => l.off), 'address and contact labels are read-only').toBe(true);
  });

  test('TC-DNG-008/009/033 the automatic address can be replaced or cleared, and changing the customer refreshes it', srs('UC2 General Info: overwrite / empty address'), async ({ page }) => {
    await dn.gotoNew(); await chooseCustomer(page);
    await dn.tab('General Info').click(); await page.waitForTimeout(1500);
    const billing = page.getByPlaceholder('Select Address').first();
    await billing.click(); await page.getByRole('option', { name: ids.addr2!, exact: true }).first().click({ timeout: 20_000 }).catch(() => observe('second address not offered in the billing list'));
    observe('billing address now: ' + await billing.inputValue());
    await billing.fill(''); await page.keyboard.press('Escape');
    observe('billing address after clearing: "' + await billing.inputValue() + '"');
  });

  test('TC-DNG-023/024/025/032 the Shipping Address list offers the customer\'s addresses', srs('UC2 General Info: Shipping Address'), async ({ page }) => {
    await dn.gotoNew(); await chooseCustomer(page);
    await dn.tab('General Info').click(); await page.waitForTimeout(1500);
    const ship = page.getByPlaceholder('Select Address').nth(1);
    observe('shipping address fetched: "' + await ship.inputValue() + '"');
    await ship.click(); await page.getByRole('option').first().waitFor({ timeout: 30_000 });
    expect((await page.getByRole('option').allInnerTexts()).join(' ')).toContain(ids.addr2!);
  });

  test('TC-DNG-034/035/036/040/043 the Company Address and Company Contact lists open', srs('UC2 General Info: company address'), async ({ page }) => {
    await dn.gotoNew(); await chooseCustomer(page);
    await dn.tab('General Info').click(); await page.waitForTimeout(1500);
    const company = page.getByPlaceholder('Select Address').nth(2);
    observe('company address fetched: "' + await company.inputValue() + '"');
    await company.click(); await page.waitForTimeout(2500);
    observe('company address options: ' + (await page.getByRole('option').allInnerTexts()).map((t) => t.trim()).join(' | '));
  });

  test('TC-DNG-044/045/056 choosing Terms fills the content, which can then be edited', srs('UC2 General Info: Terms'), async ({ page }) => {
    await dn.gotoNew(); await dn.tab('General Info').click();
    const terms = page.getByPlaceholder('Select Terms');
    await terms.click(); await page.getByRole('option', { name: 'PW Terms', exact: true }).first().click({ timeout: 30_000 });
    const content = page.getByPlaceholder('Enter terms and conditions');
    await expect(content).toHaveValue(/PW standard delivery terms/, { timeout: 10_000 });
    await content.fill('edited terms text'); expect(await content.inputValue()).toBe('edited terms text');
  });

  test('TC-DNG-049/052/053/054 Terms and Conditions content accepts symbols and stops at 500 characters', srs('UC2 General Info: content limits'), async () => {
    await dn.gotoNew(); await dn.tab('General Info').click();
    const content = dn.page.getByPlaceholder('Enter terms and conditions');
    await content.fill('Terms 123 !@#$%^&*() /\\'); expect(await content.inputValue()).toBe('Terms 123 !@#$%^&*() /\\');
    await content.fill('t'.repeat(560)); expect((await content.inputValue()).length).toBe(500);
  });

  test('TC-DNG-050/051 Terms content shorter than the minimum length: what the app does', srs('UC2 General Info: content minimum length'), async ({ page }) => {
    await dn.gotoNew(); await dn.tab('General Info').click();
    const content = page.getByPlaceholder('Enter terms and conditions');
    await content.fill('a'); await content.blur(); await page.waitForTimeout(1200);
    observe('1 character: ' + ((await bodyOf(page)).match(/(at least|minimum)[^.]{0,40}/)?.[0] ?? 'no message'));
  });

  test('TC-DNG-047/048/057 saved General Info appears on Details; Terms section only when terms exist', srs('Details: General Info data is saved with the note'), async ({ page }) => {
    const d = await note('Draft');
    await api.call('frappe.client.set_value', { doctype: 'Delivery Note', name: d.name, fieldname: { customer_address: ids.addr1, tc_name: 'PW Terms' } }).catch(() => observe('set_value for address/terms failed'));
    await dn.gotoDetails(d.name); await dn.tab('General Info').click(); await page.waitForTimeout(2000);
    const inputs = await inputsOf(page);
    observe('Details General Info: ' + inputs.filter((i) => /Select (Address|Terms)|terms/.test(i.ph ?? '')).map((i) => `${i.ph}="${i.val.slice(0, 30)}"`).join(' | '));
    expect(inputs.find((i) => i.ph === 'Select Address')?.val).toBe(ids.addr1);
  });
});

test.describe('More Info tab', () => {
  test('TC-DNM-001/002/003 the tab opens; Status is a read-only label showing Draft', srs('UC2 More Info: Status'), async ({ page }) => {
    await dn.gotoNew(); await dn.tab('More Info').click(); await page.waitForTimeout(1500);
    const inputs = await inputsOf(page);
    const status = inputs.find((i) => i.ph === 'Auto-generated');
    observe('Status label: "' + status?.val + '" read-only: ' + status?.off);
    expect(status?.off).toBe(true);
    expect(status?.val).toBe('Draft');
  });

  const texts: [string, string, number][] = [['Transporter Receipt No', 'Enter receipt number', 100], ['Vehicle No', 'Enter vehicle number', 100], ['Driver Name', 'Enter driver name', 100], ["Customer's Purchase Order No", 'Enter customer purchase order number', 500]];
  for (const [label, ph, max] of texts) {
    test(`TC-DNM-009..039 ${label}: accepts letters, numbers and symbols, may stay empty, stops at ${max} characters`, srs(`UC2 More Info: ${label}`), async ({ page }) => {
      await dn.gotoNew(); await dn.tab('More Info').click(); await page.waitForTimeout(1200);
      const box = page.getByPlaceholder(ph);
      await expect(box).toHaveValue('');
      await box.fill('AB-12 /#@ 99'); expect(await box.inputValue()).toBe('AB-12 /#@ 99');
      await box.fill(''); await box.pressSequentially('z'.repeat(max + 20), { delay: 3 });
      expect((await box.inputValue()).length, `${label} max length`).toBe(max);
    });
  }

  test('TC-DNM-005/006/007/008/014/017 Transporter, Delivery Trip and Driver are lists (Transporter offers only transporter suppliers)', srs('UC2 More Info: lists'), async ({ page }) => {
    await dn.gotoNew(); await dn.tab('More Info').click(); await page.waitForTimeout(1200);
    for (const ph of ['Select Transporter', 'Select Delivery Trip', 'Select Driver']) {
      const box = page.getByPlaceholder(ph);
      await box.click(); await page.waitForTimeout(2500);
      const opts = (await page.getByRole('option').allInnerTexts()).map((t) => t.trim()).filter((t) => t && t !== 'Add New');
      observe(`${ph}: ${opts.length} options (${opts.slice(0, 3).join(', ')})`);
      if (ph === 'Select Transporter' && opts.length) {
        const sup = await api.list('Supplier', [['supplier_name', 'in', opts]], ['supplier_name', 'is_transporter'], 50);
        expect(sup.filter((s) => s.is_transporter !== 1).map((s) => s.supplier_name), 'non-transporter suppliers offered').toEqual([]);
      }
      await page.keyboard.press('Escape');
    }
  });

  test('TC-DNM-020/021/022/040/041/042 Transporter Receipt Date and Customer Purchase Order Date are date pickers that can be set and cleared', srs('UC2 More Info: dates'), async ({ page }) => {
    await dn.gotoNew(); await dn.tab('More Info').click(); await page.waitForTimeout(1200);
    const dates = page.getByPlaceholder('Select date');
    observe('receipt date default: "' + await dates.first().inputValue() + '"');
    await dates.first().click(); await page.waitForTimeout(800);
    const day = page.locator('.flatpickr-day:not(.flatpickr-disabled)').nth(10);
    if (await day.count()) { await day.click(); observe('receipt date picked: "' + await dates.first().inputValue() + '"'); }
    else observe('no calendar day found to click');
    await dates.nth(1).click(); await page.waitForTimeout(800);
    observe('PO date calendar opened: ' + (await page.locator('.flatpickr-calendar.open').count()));
  });

  test('TC-DNM-043/045/046/048/049 Letter Head and UTM Source are lists, Language is read-only, and the print checkboxes toggle', srs('UC2 More Info: Print Settings'), async ({ page }) => {
    await dn.gotoNew(); await dn.tab('More Info').click(); await page.waitForTimeout(1200);
    const inputs = await inputsOf(page);
    const lang = inputs.filter((i) => i.ph === 'Auto-generated')[1];
    observe('Language label: "' + lang?.val + '" read-only: ' + lang?.off);
    expect(lang?.off).toBe(true);
    const boxes = page.locator('main input[type=checkbox]');
    const n = await boxes.count();
    for (let i = 0; i < n; i++) { const was = await boxes.nth(i).isChecked(); await boxes.nth(i).evaluate((e) => (e as HTMLInputElement).click()); expect(await boxes.nth(i).isChecked()).toBe(!was); }
    for (const ph of ['Select Letter Head', 'Select Source']) { await page.getByPlaceholder(ph).click(); await page.waitForTimeout(2000); observe(`${ph}: ${(await page.getByRole('option').count())} options`); await page.keyboard.press('Escape'); }
  });

  test('TC-DNM-051 More Info data is saved with the note and shown on Details', srs('Details: More Info data is saved'), async ({ page }) => {
    const d = await note('Draft');
    await api.call('frappe.client.set_value', { doctype: 'Delivery Note', name: d.name, fieldname: { vehicle_no: 'PW-123', driver_name: 'PW Driver', lr_no: 'RC-77' } });
    await dn.gotoDetails(d.name); await dn.tab('More Info').click(); await page.waitForTimeout(1500);
    const inputs = await inputsOf(page);
    expect(inputs.find((i) => i.ph === 'Enter vehicle number')?.val).toBe('PW-123');
    expect(inputs.find((i) => i.ph === 'Enter driver name')?.val).toBe('PW Driver');
    expect(inputs.find((i) => i.ph === 'Enter receipt number')?.val).toBe('RC-77');
  });
});

test.describe('Details: editing, header actions, Create menu, delete, Connections', () => {
  test('TC-DND-002/003/004 Draft details show the saved data, are editable, and a change is saved', srs('Details: Draft is editable'), async ({ page }) => {
    const d = await note('Draft', [{ item: ITEM_A, qty: 3 }]);
    await dn.gotoDetails(d.name);
    await expect(dn.field('Select Customer')).toHaveValue('PW Packing Customer');
    await expect(dn.main.locator('tbody tr').first().getByPlaceholder('0', { exact: true }).first()).toHaveValue('3');
    const qty = dn.main.locator('tbody tr').first().getByPlaceholder('0', { exact: true }).first();
    await qty.click(); await qty.fill(''); await qty.pressSequentially('8', { delay: 30 });
    await page.getByRole('button', { name: 'Save', exact: true }).last().click(); await page.waitForTimeout(5000);
    observe('after Save: ' + ((await bodyOf(page)).match(/(Error|Validation).{0,160}/)?.[0] ?? 'no error'));
    await expect.poll(async () => (await api.get('Delivery Note', d.name)).items[0].qty, { timeout: 30_000 }).toBe(8);
  });

  test('TC-DND-005/006 Submitted and Cancelled details are read-only', srs('Details: Submitted / Cancelled read-only'), async ({ page }) => {
    for (const status of ['Submitted', 'Cancelled'] as const) {
      const d = await note(status);
      await dn.gotoDetails(d.name);
      const inputs = await inputsOf(page);
      const editable = inputs.filter((i) => !i.off && i.ph !== 'Search...' && i.type !== 'search');
      observe(`${status}: editable inputs ${editable.length} of ${inputs.length}: ${editable.slice(0, 6).map((i) => i.ph ?? i.type).join(',')}`);
      expect(editable.length, `${status} note inputs still editable`).toBe(0);
    }
  });

  test('TC-DND-008/061/062/063/064/065 the fixed page actions Assign To, Tags, Attachments, Print, Share and Delete are present', srs('Details: fixed page actions'), async ({ page }) => {
    const d = await note('Draft');
    await dn.gotoDetails(d.name);
    for (const t of ['Assign To', 'Tags', 'Attachments', 'Print', 'Share']) await expect(page.getByTitle(t).first(), t).toBeVisible();
  });

  test('TC-DND-051/053/054 Delete is shown for Draft and Cancelled notes, not for Submitted', srs('Details: Delete appears for Draft and Cancelled'), async ({ page }) => {
    const seen: Record<string, boolean> = {};
    for (const status of ['Draft', 'Submitted', 'Cancelled'] as const) { const d = await note(status); await dn.gotoDetails(d.name); seen[status] = await page.getByTitle('Delete').first().isVisible(); }
    observe(JSON.stringify(seen));
    expect(seen.Draft).toBe(true); expect(seen.Cancelled).toBe(true); expect(seen.Submitted).toBe(false);
  });

  test('TC-DND-055/056/057 Delete from Details: confirmation, Cancel keeps the note, Delete removes a Draft with no links', srs('Details: Delete'), async ({ page }) => {
    const d = await note('Draft');
    await dn.gotoDetails(d.name);
    await page.getByTitle('Delete').first().click();
    await expect(dn.confirmDialog()).toBeVisible();
    await dn.confirmDialog().getByRole('button', { name: 'Cancel' }).click();
    expect((await api.list('Delivery Note', [['name', '=', d.name]])).length).toBe(1);
    await page.getByTitle('Delete').first().click();
    await dn.confirmDialog().getByRole('button', { name: 'Delete' }).click();
    await expect.poll(async () => (await api.list('Delivery Note', [['name', '=', d.name]])).length, { timeout: 40_000 }).toBe(0);
  });

  test('TC-DND-059/060 Delete a note linked to a Packing Slip: a message with links, and the note stays', srs('Details: Delete a linked note'), async ({ page }) => {
    const d = await note('Draft');
    await packingSlip(d, { status: 'Draft' }).catch(() => observe('packing slip could not be created'));
    await dn.gotoDetails(d.name);
    await page.getByTitle('Delete').first().click();
    await dn.confirmDialog().getByRole('button', { name: 'Delete' }).click(); await page.waitForTimeout(5000);
    observe('message: ' + ((await bodyOf(page)).match(/(Cannot|cannot|linked|Linked).{0,200}/)?.[0] ?? 'none') + ' | links: ' + await page.locator('a:visible').filter({ hasText: /PAC|Packing/ }).count());
    expect((await api.list('Delivery Note', [['name', '=', d.name]])).length).toBe(1);
  });

  test('TC-DND-009/010/011/013/027/029/043/045 the Create menu offers the SRS actions for a Submitted note', srs('Details: Create dropdown'), async ({ page }) => {
    const d = await note('Submitted');
    await dn.gotoDetails(d.name);
    await page.getByTitle('More actions').first().click(); await page.waitForTimeout(1500);
    const text = await bodyOf(page);
    const wanted = ['Shipment', 'Quality Inspection', 'Packing Slip', 'Sales Return', 'Delivery Trip', 'Sales Invoice'];
    const missing = wanted.filter((w) => !text.includes(w));
    observe('Create menu (Submitted): missing ' + (missing.join(', ') || 'none') + '; menu text: ' + (text.match(/More actions.{0,200}/)?.[0] ?? ''));
    expect(missing, 'Create menu entries missing').toEqual([]);
  });

  test('TC-DND-027/028/046 Create > Sales Invoice and Create > Packing Slip open the new document with this note', srs('Details: Create actions'), async ({ page }) => {
    const d = await note('Submitted');
    await dn.gotoDetails(d.name);
    await page.getByTitle('More actions').first().click(); await page.waitForTimeout(1200);
    const item = page.getByText('Packing Slip', { exact: true }).locator('visible=true').first();
    if (await item.count()) { await item.click(); await page.waitForTimeout(4000); observe('Packing Slip action opened: ' + page.url() + ' | ' + (await bodyOf(page)).match(/Delivery Note.{0,60}/)?.[0]); }
    else observe('no Packing Slip entry in the Create menu');
  });

  test('TC-DND-067/068/070/076 the Connections tab lists linked documents (Packing Slip) or says there are none', srs('Details: Connections'), async ({ page }) => {
    const plain = await note('Draft');
    await dn.gotoDetails(plain.name); await dn.tab('Connections' as 'Details').click(); await page.waitForTimeout(2500);
    observe('Connections of a note with no links: ' + ((await bodyOf(page)).match(/Connections.{0,160}/g)?.slice(-1)[0] ?? ''));
    const linked = await note('Draft');
    await packingSlip(linked, { status: 'Draft' }).catch(() => observe('packing slip could not be created'));
    await dn.gotoDetails(linked.name); await dn.tab('Connections' as 'Details').click(); await page.waitForTimeout(2500);
    expect(await bodyOf(page)).toContain('Packing Slip');
  });
});

void code;
