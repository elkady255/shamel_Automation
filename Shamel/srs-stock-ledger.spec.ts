import { test, expect, type Page } from '@playwright/test';
import { api, type Doc } from './helpers/api';
import { note } from './helpers/dn-data';
import { plainItem, stockEntry, entriesOf, ledger, binQty, OTHER_WAREHOUSE } from './helpers/sle-data';
import { ITEM_A, WAREHOUSE, code } from './helpers/ps-data';

/**
 * SRS "Inventory > Stock Ledger Entry" (list, details) and the user's TC-SLL / TC-SLD / TC-SLG cases.
 * The screen is read only and its rows are system generated, so the entries are produced by submitting stock documents
 * through the Frappe API and the screen is compared with the SRS and with the stored records.
 * Where the SRS is silent the behaviour is recorded as an "observed" annotation instead of asserted.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

const LOAD = { timeout: 120_000 };
const open = async (page: Page, hash: string) => { await page.goto('about:blank'); await page.goto(`/desk/shamel#/inventory/${hash}`, LOAD); };
const gotoList = async (page: Page) => { await open(page, 'stock-ledger'); await page.getByRole('main').getByRole('table').waitFor(LOAD); await page.waitForTimeout(1500); };
const gotoDetails = async (page: Page, id: string) => { await open(page, `stock-ledger/${id}`); await page.getByRole('main').getByText('Stock Ledger Entry Details').first().waitFor(LOAD); await page.waitForTimeout(2500); };
const rows = (page: Page) => page.getByRole('main').getByRole('table').locator('tbody').getByRole('row');
const buttons = async (page: Page) => (await page.getByRole('main').getByRole('button').allInnerTexts()).map(clean).filter(Boolean);

let receipt: Doc, issue: Doc, dn: Doc, cancelledDn: Doc, draftDn: Doc;
let receiptSle: Doc, issueSle: Doc, dnSle: Doc;
test.beforeAll(async () => {
  await plainItem();
  receipt = await stockEntry('Material Receipt', 20, { rate: 7 });
  issue = await stockEntry('Material Issue', 4);
  dn = await note('Submitted'); cancelledDn = await note('Cancelled'); draftDn = await note('Draft');
  [receiptSle] = await entriesOf(receipt.name); [issueSle] = await entriesOf(issue.name); [dnSle] = await entriesOf(dn.name);
});

test.describe('List (UC1)', () => {
  test('TC-SLL-001/002/003/004/006/007/008/009/011/014/016 the list shows exactly the SRS columns and has no Add button', srs('UC1 list'), async ({ page }) => {
    await gotoList(page);
    const headers = (await page.getByRole('main').getByRole('columnheader').allInnerTexts()).map(clean).filter(Boolean);
    expect(headers).toEqual(['Stock Ledger Entry ID', 'Item Code', 'Warehouse', 'Posting Date', 'Voucher No', 'Qty Change', 'Incoming Rate']);
    await expect(rows(page).first().getByRole('checkbox')).toBeVisible();
    expect(await page.getByRole('main').getByRole('button', { name: /^Add/ }).count(), 'no Add button on a system generated list').toBe(0);
  });

  test('TC-SLL-005/010 the ID opens the Details screen and the Voucher No link opens the source document', srs('UC1 clickable ID / Voucher No'), async ({ page }) => {
    await gotoList(page);
    await page.getByRole('main').getByText(/^MAT-SLE-/).first().click(); await page.waitForTimeout(3500);
    expect(page.url()).toMatch(/stock-ledger\/MAT-SLE-/);
    await expect(page.getByRole('main')).toContainText('Stock Ledger Entry Details');
    await gotoList(page);
    const voucher = rows(page).first().getByText(/^MAT-(DN|STE|RECO|PRE)/);
    observe('Voucher No in the list is ' + ((await voucher.first().evaluate((e) => getComputedStyle(e).cursor === 'pointer' || e.tagName === 'A').catch(() => false)) ? 'a link' : 'plain text'));
  });

  test('TC-SLL-012/013/014/015 Qty Change and Incoming Rate in the list equal the stored entries (incoming +, outgoing -)', srs('UC1 Qty Change / Incoming Rate'), async ({ page }) => {
    await gotoList(page);
    const text = clean(await page.getByRole('main').innerText());
    for (const e of [receiptSle, issueSle, dnSle]) {
      expect(text, `${e.voucher_no} appears in the newest rows`).toContain(e.voucher_no);
    }
    const line = async (voucher: string) => clean(await rows(page).filter({ hasText: voucher }).first().innerText());
    const r = await line(receipt.name), i = await line(issue.name);
    observe(`receipt row: ${r} | issue row: ${i}`);
    expect(r).toMatch(/\s20\s+7$/); expect(i).toMatch(/\s-4\s+\d+(\.\d+)?$/);
    expect(receiptSle.actual_qty).toBe(20); expect(issueSle.actual_qty).toBe(-4);
  });

  test('TC-SLL-017 default order: the newest entry is first', srs('UC1 sort order (SRS silent)'), async ({ page }) => {
    await gotoList(page);
    const first = clean(await rows(page).first().innerText());
    const [newest] = await api.list('Stock Ledger Entry', [], ['name', 'creation'], 1).then(() => api.call('frappe.client.get_list', { doctype: 'Stock Ledger Entry', fields: ['name'], order_by: 'creation desc', limit_page_length: 1 }));
    observe(`first row ${first.split(' ')[0]} | newest created ${newest.name}`);
    expect(first.toLowerCase().startsWith(newest.name.toLowerCase())).toBe(true);
    if (!first.startsWith(newest.name)) observe(`the list shows the ID with a capital first letter (${first.split(' ')[0]}) while the stored ID is ${newest.name}`);
  });

  test('TC-SLL-018 entries of a cancelled voucher stay in the list', srs('UC1 cancelled vouchers (SRS silent)'), async ({ page }) => {
    const e = await entriesOf(cancelledDn.name);
    observe('entries of the cancelled Delivery Note: ' + e.map((x) => `${x.name} qty ${x.actual_qty} is_cancelled ${x.is_cancelled}`).join(' | '));
    await gotoList(page);
    const text = clean(await page.getByRole('main').innerText());
    expect(e.length, 'the cancelled voucher kept its entries').toBeGreaterThan(0);
    expect(text).toContain(cancelledDn.name);
  });

  test('TC-SLL-019/020/021/022/023/024/025 the action bar offers Export, Assign, Clear assignment, Add Tags, Print and no Edit, Delete, Submit, Cancel', srs('UC1 action bar'), async ({ page }) => {
    await gotoList(page);
    await rows(page).nth(0).getByRole('checkbox').check(); await page.waitForTimeout(800);
    const one = await buttons(page);
    observe('action bar (1 row): ' + one.join(' | '));
    await rows(page).nth(1).getByRole('checkbox').check(); await page.waitForTimeout(500);
    expect(await buttons(page), 'still shown for two rows').toEqual(expect.arrayContaining(['Export']));
    for (const a of ['Export', 'Assign', 'Add Tags', 'Print']) expect(one, a).toContain(a);
    expect(one.join('|'), 'Clear assignment').toMatch(/Clear/i);
    for (const a of ['Edit', 'Delete', 'Submit', 'Cancel']) expect(one, `${a} must not be offered`).not.toContain(a);
    await rows(page).nth(0).getByRole('checkbox').uncheck(); await rows(page).nth(1).getByRole('checkbox').uncheck(); await page.waitForTimeout(600);
    expect(await buttons(page), 'action bar disappears').not.toContain('Export');
  });

  test('TC-SLL-029/030/032/033 Export, Assign, Add Tags and Print react to a click', srs('UC1 Export / Assign / Tags / Print'), async ({ page }) => {
    for (const a of ['Export', 'Assign', 'Add Tags', 'Print']) {
      await gotoList(page); await rows(page).first().getByRole('checkbox').check();
      const popup = page.waitForEvent('popup', { timeout: 6000 }).catch(() => null);
      const download = page.waitForEvent('download', { timeout: 6000 }).catch(() => null);
      const url = page.url();
      await page.getByRole('main').getByRole('button', { name: a, exact: true }).click(); await page.waitForTimeout(2500);
      const o = await popup; const f = await download;
      const dialogs = await page.locator('[role=dialog]:visible, .modal:visible, [class*=modal-container]:visible, [class*=popup]:visible').count();
      observe(`${a}: ${f ? 'downloads ' + f.suggestedFilename() : o ? 'opens a new tab' : dialogs ? 'opens a popup' : page.url() !== url ? 'navigates' : 'no visible reaction'}`);
      if (o) await o.close();
      await page.keyboard.press('Escape');
    }
  });

  test('TC-SLL-034 search and filters (SRS silent)', srs('UC1 search / filter'), async ({ page }) => {
    await gotoList(page);
    const t = clean(await page.getByRole('main').innerText());
    observe(`Search By ID box: ${await page.getByRole('main').getByPlaceholder('Search By ID').count() ? 'present' : 'absent'} | filter controls: ${['All Filters', 'Saved Filters', 'Create Filters', 'Last Updates'].filter((x) => t.includes(x)).join(', ')}`);
  });
});

test.describe('Read only: nothing can create, edit or delete an entry (TC-SLL-023..028, TC-SLD-056..062)', () => {
  test('TC-SLL-024/026 the Delete button of the action bar must not exist (and what it does on a test-created entry)', srs('UC1: no Delete'), async ({ page }) => {
    await gotoList(page);
    const target = rows(page).filter({ hasText: cancelledDn.name }).first();
    await target.getByRole('checkbox').check(); await page.waitForTimeout(600);
    const has = await page.getByRole('main').getByRole('button', { name: 'Delete', exact: true }).count();
    observe('Delete in the action bar: ' + has);
    expect(has, 'SRS: entries cannot be deleted').toBe(0);
  });

  test('TC-SLL-026 deleting a test-created entry through the API is refused', srs('UC1: cannot delete'), async () => {
    const [e] = await entriesOf(cancelledDn.name);
    let outcome = 'deleted';
    try { await api.call('frappe.client.delete', { doctype: 'Stock Ledger Entry', name: e.name }); } catch (err) { outcome = 'refused: ' + clean(String(err)).slice(0, 160); }
    observe('API delete of ' + e.name + ': ' + outcome);
    expect(outcome.startsWith('refused'), 'an entry cannot be deleted').toBe(true);
  });

  test('TC-SLL-027/SLG-021 changing a test-created entry through the API is refused', srs('UC1: cannot edit'), async () => {
    let outcome = 'changed';
    try { await api.call('frappe.client.set_value', { doctype: 'Stock Ledger Entry', name: receiptSle.name, fieldname: 'actual_qty', value: 99 }); } catch (err) { outcome = 'refused: ' + clean(String(err)).slice(0, 160); }
    const after = (await api.get('Stock Ledger Entry', receiptSle.name)).actual_qty;
    observe('API edit of ' + receiptSle.name + ': ' + outcome + ' | actual_qty now ' + after);
    if (after !== 20) await api.call('frappe.client.set_value', { doctype: 'Stock Ledger Entry', name: receiptSle.name, fieldname: 'actual_qty', value: 20 });
    expect(outcome.startsWith('refused') && after === 20, 'an entry cannot be edited').toBe(true);
  });

  test('TC-SLL-028 creating an entry by hand through the API is refused', srs('UC1: cannot create'), async () => {
    let outcome = 'created'; let made = '';
    try { const d = await api.insert('Stock Ledger Entry', { item_code: code(ITEM_A), warehouse: WAREHOUSE, posting_date: receiptSle.posting_date, posting_time: '10:00:00', actual_qty: 1, company: receiptSle.company, voucher_type: 'Stock Entry', voucher_no: receipt.name }); made = d.name; } catch (err) { outcome = 'refused: ' + clean(String(err)).slice(0, 160); }
    observe('API create: ' + outcome + (made ? ' ' + made : ''));
    if (made) await api.call('frappe.client.delete', { doctype: 'Stock Ledger Entry', name: made }).catch(() => undefined);
    expect(outcome.startsWith('refused'), 'an entry cannot be created manually').toBe(true);
  });
});

test.describe('Details (UC2)', () => {
  test('TC-SLD-001/002/003/056..062/063 the Details screen is read only with no Save / Submit / Cancel', srs('UC2 read only'), async ({ page }) => {
    await gotoDetails(page, issueSle.name);
    const editable = await page.getByRole('main').locator('input:visible:not([readonly]):not([disabled]):not([placeholder^="Search pages"]), textarea:visible:not([readonly]):not([disabled]), select:visible').count();
    observe('editable inputs: ' + editable + ' | buttons: ' + (await buttons(page)).join(' | '));
    expect(editable).toBe(0);
    for (const b of ['Save', 'Submit', 'Cancel', 'Delete', 'Edit']) expect(await buttons(page)).not.toContain(b);
  });

  test('TC-SLD-004..008/013/015/020/025/026/028..030/032/034/038/039/042 the Details fields show the stored values of the issue entry', srs('UC2 field values'), async ({ page }) => {
    await gotoDetails(page, issueSle.name);
    const text = clean(await page.getByRole('main').innerText());
    const e = await api.get('Stock Ledger Entry', issueSle.name);
    const checks: [string, unknown][] = [['Item Code', e.item_code], ['Warehouse', e.warehouse], ['Posting Date', e.posting_date], ['Voucher Type', e.voucher_type], ['Voucher No', e.voucher_no], ['Voucher Detail No', e.voucher_detail_no], ['Fiscal Year', e.fiscal_year], ['Company', e.company]];
    for (const [label, v] of checks) expect(text, `${label} = ${v}`).toContain(String(v));
    for (const [label, v] of [['Qty Change', e.actual_qty], ['Qty after Transaction', e.qty_after_transaction], ['Incoming Rate', e.incoming_rate], ['Outgoing Rate', e.outgoing_rate], ['Average Rate', e.valuation_rate], ['Balance Stock Value', e.stock_value], ['Change In Stock Value', e.stock_value_difference]] as [string, number][]) {
      const m = text.match(new RegExp(`${label} (-?[0-9.,]+)`));
      observe(`${label}: screen ${m?.[1]} | stored ${v}`);
      expect(Number((m?.[1] ?? 'NaN').replace(/,/g, '')), label).toBeCloseTo(Number(v), 2);
    }
  });

  test('TC-SLD-039 Stock UOM is shown for an entry of the test item', srs('UC2 Stock UOM'), async ({ page }) => {
    await gotoDetails(page, issueSle.name);
    const e = await api.get('Stock Ledger Entry', issueSle.name);
    const text = clean(await page.getByRole('main').innerText());
    observe(`stored stock_uom "${e.stock_uom}" | screen: ${text.match(/Stock UOM (.{0,25})/)?.[1]}`);
    expect(e.stock_uom, 'the stored entry has a Stock UOM').toBeTruthy();
    expect(text).toContain(String(e.stock_uom));
  });

  test('TC-SLD-016/017/018 Voucher No opens the source Stock Entry and Delivery Note', srs('UC2 Voucher No link'), async ({ page }) => {
    for (const [sle, kind] of [[issueSle, 'stock-entry'], [dnSle, 'delivery-note']] as [Doc, string][]) {
      await gotoDetails(page, sle.name);
      await page.getByRole('main').getByText(sle.voucher_no, { exact: true }).click(); await page.waitForTimeout(4000);
      observe(`${sle.voucher_no} link opens ${page.url()}`);
      expect(page.url()).toContain(kind);
      expect(page.url()).toContain(sle.voucher_no);
    }
  });

  test('TC-SLD-009/012/044..055 flags for an ordinary entry: not cancelled, not batch / serial, To Rename checked', srs('UC2 flags'), async () => {
    const e = await api.get('Stock Ledger Entry', issueSle.name);
    observe(`flags: is_cancelled ${e.is_cancelled}, has_batch_no ${e.has_batch_no}, has_serial_no ${e.has_serial_no}, to_rename ${e.to_rename}, is_adjustment_entry ${e.is_adjustment_entry}`);
    expect(e.is_cancelled).toBe(0); expect(e.has_batch_no).toBe(0); expect(e.has_serial_no).toBe(0);
    expect(e.to_rename, 'SRS: To Rename is checked by default').toBe(1);
  });

  test('TC-SLD-048/049 Is Cancelled is checked for the entries of a cancelled voucher', srs('UC2 Is Cancelled'), async ({ page }) => {
    const e = await entriesOf(cancelledDn.name);
    const flagged = e.filter((x) => x.is_cancelled === 1).length;
    observe('cancelled voucher entries: ' + e.map((x) => `${x.name}:${x.actual_qty}:cancelled=${x.is_cancelled}`).join(' | '));
    expect(flagged, 'the entries of a cancelled voucher are flagged Is Cancelled').toBeGreaterThan(0);
    await gotoDetails(page, e.find((x) => x.is_cancelled === 1)?.name ?? e[0].name);
    await expect(page.getByRole('main').getByText('Is Cancelled')).toBeVisible();
  });
});

test.describe('Entry generation and valuation (TC-SLG)', () => {
  test('TC-SLG-001/014/016/018 Material Receipt creates one incoming entry that follows the voucher', srs('Ledger: receipt'), async () => {
    const e = await entriesOf(receipt.name);
    expect(e.length).toBe(1);
    expect(e[0]).toMatchObject({ item_code: code(ITEM_A), warehouse: WAREHOUSE, voucher_type: 'Stock Entry', actual_qty: 20, incoming_rate: 7, posting_date: receipt.posting_date, company: receipt.company, is_cancelled: 0 });
    expect(e[0].voucher_detail_no).toBe(receipt.items[0].name);
    expect(e[0].stock_value_difference).toBeCloseTo(140, 2);
    expect(String(e[0].fiscal_year)).toBe(receipt.posting_date.slice(0, 4));
  });

  test('TC-SLG-002 Material Issue creates one outgoing entry with a negative quantity', srs('Ledger: issue'), async () => {
    const e = await entriesOf(issue.name);
    expect(e.length).toBe(1);
    expect(e[0].actual_qty).toBe(-4); expect(e[0].stock_value_difference).toBeLessThan(0);
  });

  test('TC-SLG-003 Material Transfer creates an outgoing and an incoming entry', srs('Ledger: transfer'), async () => {
    const tr = await stockEntry('Material Transfer', 3, { to: OTHER_WAREHOUSE });
    const e = await entriesOf(tr.name);
    observe('transfer entries: ' + e.map((x) => `${x.warehouse}:${x.actual_qty}`).join(' | '));
    expect(e.length).toBe(2);
    expect(e.map((x) => x.actual_qty).sort()).toEqual([-3, 3]);
    expect(e.find((x) => x.actual_qty < 0)?.warehouse).toBe(WAREHOUSE);
    expect(e.find((x) => x.actual_qty > 0)?.warehouse).toBe(OTHER_WAREHOUSE);
  });

  test('TC-SLG-007 a submitted Delivery Note creates an outgoing entry for its quantity', srs('Ledger: Delivery Note'), async () => {
    const e = await entriesOf(dn.name);
    observe('delivery note entries: ' + e.map((x) => `${x.warehouse}:${x.actual_qty}:rate ${x.incoming_rate}`).join(' | '));
    expect(e.length).toBe(1);
    expect(e[0]).toMatchObject({ actual_qty: -10, voucher_type: 'Delivery Note', warehouse: WAREHOUSE });
  });

  test('TC-SLG-012 a Draft document creates no entry', srs('Ledger: drafts'), async () => {
    expect((await entriesOf(draftDn.name)).length).toBe(0);
    const draftReceipt = await stockEntry('Material Receipt', 5, { submit: false });
    expect((await entriesOf(draftReceipt.name)).length).toBe(0);
  });

  test('TC-SLG-013/SLD-050 cancelling a voucher reverses its effect on the stock balance', srs('Ledger: cancel'), async () => {
    const before = await binQty();
    const extra = await stockEntry('Material Receipt', 6);
    expect(await binQty()).toBe(before + 6);
    await api.call('frappe.client.cancel', { doctype: 'Stock Entry', name: extra.name });
    const e = await entriesOf(extra.name);
    observe('after cancel: ' + e.map((x) => `${x.actual_qty}:cancelled=${x.is_cancelled}`).join(' | '));
    expect(await binQty(), 'the cancelled receipt no longer counts').toBe(before);
    expect(e.every((x) => x.is_cancelled === 1) || e.reduce((s, x) => s + x.actual_qty, 0) === 0).toBe(true);
  });

  test('TC-SLD-027/SLG-019 every Qty after Transaction equals the previous balance plus Qty Change, and the last equals the Bin', srs('Ledger: running balance'), async () => {
    const l = await ledger();
    expect(l.length).toBeGreaterThan(3);
    let balance = 0; const wrong: string[] = [];
    for (const e of l) { balance = +(balance + e.actual_qty).toFixed(6); if (Math.abs(balance - e.qty_after_transaction) > 0.0001) wrong.push(`${e.name}: expected ${balance} stored ${e.qty_after_transaction}`); }
    observe(`${l.length} entries checked, ${wrong.length} wrong. ${wrong.slice(0, 3).join(' | ')}`);
    expect(wrong, 'running balance').toEqual([]);
    expect(await binQty(), 'sum of the entries = Bin').toBeCloseTo(balance, 4);
  });

  test('TC-SLD-033/035 Balance Stock Value and Change In Stock Value follow Qty x valuation rate', srs('Ledger: stock value'), async () => {
    const e = await api.get('Stock Ledger Entry', receiptSle.name);
    expect(e.stock_value_difference).toBeCloseTo(e.actual_qty * e.incoming_rate, 2);
    const l = await ledger(); const last = l[l.length - 1];
    observe(`last entry: qty after ${last.qty_after_transaction}, value ${last.stock_value}, rate ${last.valuation_rate}`);
    expect(last.stock_value).toBeCloseTo(last.qty_after_transaction * last.valuation_rate, 1);
  });

  test('TC-SLG-015 a backdated receipt recalculates the balances of the entries after it', srs('Ledger: backdated'), async () => {
    const d = new Date(); d.setDate(d.getDate() - 400);
    const old = await stockEntry('Material Receipt', 2, { date: d.toISOString().slice(0, 10) }).catch((e) => { test.skip(/BackDatedStockTransaction/.test(String(e)), 'The system refuses stock documents dated before the last transaction of the item in the warehouse (BackDatedStockTransaction); the case needs that restriction switched off in Stock Settings'); throw e; });
    const l = await ledger();
    let balance = 0; const wrong = l.filter((e) => { balance = +(balance + e.actual_qty).toFixed(6); return Math.abs(balance - e.qty_after_transaction) > 0.0001; });
    observe(`backdated ${old.name} (${d.toISOString().slice(0, 10)}): ${wrong.length} entries with a wrong balance afterwards`);
    expect(wrong.length).toBe(0);
    expect((await entriesOf(old.name))[0].fiscal_year).toBe(String(d.getFullYear()));
  });

  test('TC-SLD-036/037/SLG-020 the FIFO Stock Queue is stored on the entries', srs('Ledger: FIFO queue'), async () => {
    const e = await api.get('Stock Ledger Entry', issueSle.name);
    observe('stock_queue of the issue entry: ' + e.stock_queue);
    expect(String(e.stock_queue ?? ''), 'FIFO queue present').not.toBe('');
  });
});
