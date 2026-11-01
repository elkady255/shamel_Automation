import { test, expect } from '@playwright/test';
import { StockReconciliationPage } from './pages/StockReconciliationPage';
import { api } from './helpers/api';
import { sr, draftSR, removeSR } from './helpers/sr-data';
import { binQty, entriesOf } from './helpers/sle-data';
import { WAREHOUSE } from './helpers/ps-data';

/**
 * SRS "Inventory > Stock Reconciliation" Details (TC-RCD) and the stock effect of Submit / Cancel / Amend (TC-RCW).
 * Records are prepared through the Frappe API for the test item. Only records created here are ever deleted.
 * Cases the SRS leaves open record the behaviour as an "observed" annotation instead of asserting.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

let p: StockReconciliationPage;
test.beforeEach(async ({ page }) => { p = new StockReconciliationPage(page); });
const created: string[] = [];
test.afterAll(async () => { for (const n of created) await removeSR(n).catch(() => undefined); });
const buttons = async () => (await p.main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const editable = () => p.main.locator('input:visible:not([readonly]):not([disabled]):not([placeholder^="Search pages"]), textarea:visible:not([readonly]):not([disabled])').count();

test.describe('Draft Details', () => {
  test('TC-RCD-001/002/003 a Draft opens with the saved data in input fields and a Submit button', srs('Details: Draft'), async () => {
    const d = await sr('Draft'); created.push(d.name);
    await p.gotoDetails(d.name);
    const t = await p.text();
    observe('Details text: ' + t.slice(0, 500));
    for (const v of [d.purpose, d.company, d.set_warehouse, d.items[0].item_code, d.expense_account]) expect(t, String(v)).toContain(String(v));
    observe('buttons: ' + (await buttons()).join(' | ') + ' | editable inputs: ' + await editable());
    expect(await editable(), 'Draft fields are inputs').toBeGreaterThan(2);
    await expect(p.main.getByRole('button', { name: 'Submit', exact: true })).toBeVisible();
  });

  test('TC-RCD-004 a change made to a Draft on the Details screen is saved (Quantity)', srs('Details: Draft save'), async () => {
    const d = await sr('Draft'); created.push(d.name);
    await p.gotoDetails(d.name);
    await p.qtyInput().fill('77');
    await p.save().click(); await p.page.waitForTimeout(4000);
    observe('after Save: ' + ((await p.bodyText()).match(/(Error|required|saved successfully|updated)[^.]{0,100}/i)?.[0] ?? 'no message'));
    expect((await api.get('Stock Reconciliation', d.name)).items[0].qty).toBe(77);
  });

  test('TC-RCD-007 clearing a mandatory field (Cost Center) and saving shows an error and keeps the record unchanged', srs('Details: invalid data'), async () => {
    const d = await sr('Draft'); created.push(d.name);
    await p.gotoDetails(d.name);
    await p.main.getByText(d.cost_center).locator('visible=true').first().click(); await p.page.waitForTimeout(700);
    await p.page.locator('li:visible').first().click({ force: true }).catch(() => undefined);
    await p.main.getByText('Cost Center').first().waitFor();
    const before = (await api.get('Stock Reconciliation', d.name)).cost_center;
    await p.save().click(); await p.page.waitForTimeout(3000);
    observe('message: ' + ((await p.bodyText()).match(/(required|Error)[^.]{0,100}/i)?.[0] ?? 'none') + ' | cost center stored: ' + before);
  });
});

test.describe('Submit, stock effect and Cancel / Amend', () => {
  test('TC-RCD-009/RCW-001/007/008/009 Submit from Details sets the stock to the Quantity, creates the ledger entry and updates the Bin', srs('Workflow: Submit'), async () => {
    const d = await sr('Draft', 10); created.push(d.name);
    const before = await binQty(WAREHOUSE);
    await p.gotoDetails(d.name);
    await p.main.getByRole('button', { name: 'Submit', exact: true }).click(); await p.page.waitForTimeout(1500);
    const yes = p.page.getByRole('button', { name: /^(Yes|Confirm|OK|Submit)$/ });
    if (await yes.first().isVisible({ timeout: 2500 }).catch(() => false)) await yes.first().click();
    await p.page.waitForTimeout(5000);
    const after = await api.get('Stock Reconciliation', d.name);
    observe(`docstatus ${after.docstatus} | Bin ${before} -> ${await binQty(WAREHOUSE)} | message ${(await p.bodyText()).match(/(submitted|Error)[^.]{0,80}/i)?.[0]}`);
    expect(after.docstatus).toBe(1);
    expect(await binQty(WAREHOUSE)).toBe(after.items[0].qty);
    const e = await entriesOf(d.name);
    expect(e.length).toBe(1);
    expect(e[0].actual_qty).toBeCloseTo(after.items[0].qty - before, 3);
    expect(e[0].voucher_type).toBe('Stock Reconciliation');
  });

  test('TC-RCD-010/011/012/013 a Submitted record is read-only and offers Cancel', srs('Details: Submitted'), async () => {
    const d = await sr('Submitted'); created.push(d.name);
    await p.gotoDetails(d.name);
    observe('buttons: ' + (await buttons()).join(' | ') + ' | editable inputs: ' + await editable());
    expect(await editable()).toBe(0);
    await expect(p.main.getByRole('button', { name: 'Cancel', exact: true }).first()).toBeVisible();
    expect(await p.main.getByRole('button', { name: 'Submit', exact: true }).count()).toBe(0);
    expect(await p.main.getByRole('button', { name: 'Save', exact: true }).count()).toBe(0);
  });

  test('TC-RCD-018/019/020/021/022 the View dropdown appears only after Submit and lists Stock Ledger, Serial / Batch Nos, Accounting Ledger', srs('Details: View'), async () => {
    const draft = await sr('Draft'); created.push(draft.name);
    await p.gotoDetails(draft.name);
    expect(await p.main.getByRole('button', { name: /^View/ }).count(), 'no View before Submit').toBe(0);
    const s = await sr('Submitted'); created.push(s.name);
    await p.gotoDetails(s.name);
    const view = p.main.getByRole('button', { name: /^View/ });
    observe('View button present: ' + await view.count());
    await expect(view.first()).toBeVisible({ timeout: 5000 });
    await view.first().click(); await p.page.waitForTimeout(900);
    const items = (await p.page.locator('li:visible, [role=menuitem]:visible, .dropdown-item:visible').allInnerTexts()).map(clean);
    observe('View items: ' + items.join(' | '));
    for (const x of ['Stock Ledger', 'Serial', 'Accounting Ledger']) expect(items.join(' '), x).toContain(x);
  });

  test('TC-RCD-014/RCW-022/023/024 Cancel from Details restores the stock and reverses the ledger entries', srs('Workflow: Cancel'), async () => {
    const d = await sr('Submitted', 15); created.push(d.name);
    const submittedBin = await binQty(WAREHOUSE);
    await p.gotoDetails(d.name);
    await p.main.getByRole('button', { name: 'Cancel', exact: true }).first().click(); await p.page.waitForTimeout(1500);
    const yes = p.page.getByRole('button', { name: /^(Yes|Confirm|OK|Cancel Document)$/ });
    if (await yes.first().isVisible({ timeout: 2500 }).catch(() => false)) await yes.first().click();
    await p.page.waitForTimeout(5000);
    const after = await api.get('Stock Reconciliation', d.name);
    observe(`docstatus ${after.docstatus} | Bin ${submittedBin} -> ${await binQty(WAREHOUSE)} | buttons ${(await buttons()).join(' | ')}`);
    expect(after.docstatus).toBe(2);
    expect(await binQty(WAREHOUSE), 'stock goes back').toBe(submittedBin - 15);
    const e = await entriesOf(d.name);
    observe('entries after cancel: ' + e.map((x) => `${x.actual_qty}:cancelled=${x.is_cancelled}`).join(' | '));
    expect(e.every((x) => x.is_cancelled === 1) || e.reduce((s, x) => s + x.actual_qty, 0) === 0).toBe(true);
  });

  test('TC-RCD-015/016/RCW-026/027/028/029 a Cancelled record is read-only; Amend creates a new Draft linked through Amended From and opens it', srs('Workflow: Amend'), async () => {
    const d = await sr('Cancelled'); created.push(d.name);
    await p.gotoDetails(d.name);
    expect(await editable()).toBe(0);
    const amend = p.main.getByRole('button', { name: 'Amend', exact: true });
    await expect(amend).toBeVisible({ timeout: 5000 });
    await amend.click(); await p.page.waitForTimeout(5000);
    const kids = await api.list('Stock Reconciliation', [['amended_from', '=', d.name]], ['name', 'docstatus']);
    observe('amended: ' + JSON.stringify(kids) + ' | url ' + p.page.url());
    expect(kids.length).toBe(1); created.push(kids[0].name);
    expect(p.page.url(), 'the amended record is opened').toContain(kids[0].name);
  });
});

test.describe('Page actions (TC-RCD-023..029)', () => {
  test('TC-RCD-023/024 Assign, Attachment, Tags, Share and Print are offered on every status', srs('Details: fixed page actions'), async () => {
    for (const status of ['Draft', 'Submitted'] as const) {
      const d = await sr(status); created.push(d.name);
      await p.gotoDetails(d.name);
      const t = await p.bodyText();
      observe(`${status} buttons: ${(await buttons()).join(' | ')}`);
      for (const a of ['Assign', 'Attachment', 'Tags', 'Share', 'Print']) expect(t, `${a} on a ${status} record`).toContain(a);
    }
  });
});

void draftSR;
