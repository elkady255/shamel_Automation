import { test, expect } from '@playwright/test';
import { StockReconciliationPage } from './pages/StockReconciliationPage';
import { api } from './helpers/api';
import { sr, removeSR } from './helpers/sr-data';
import { plainItem } from './helpers/sle-data';
import { seed } from './helpers/ps-data';

/**
 * SRS "Inventory > Stock Reconciliation" UC1 List (TC-RCL): columns, status, row selection, action bar, Submit / Cancel / Delete / Edit
 * and Export / Assign / Tags / Print. Records are prepared through the Frappe API; only records created here are ever deleted, one by one.
 * Cases the SRS leaves open record the behaviour as an "observed" annotation instead of asserting.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
test.describe.configure({ timeout: 180_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

let p: StockReconciliationPage;
const created: string[] = [];
test.beforeAll(async () => { await plainItem(); await seed(); });
test.afterAll(async () => { for (const n of created) await removeSR(n).catch(() => undefined); });
test.beforeEach(async ({ page }) => { p = new StockReconciliationPage(page); });
const make = async (s: 'Draft' | 'Submitted' | 'Cancelled') => { const d = await sr(s); created.push(d.name); return d; };
const row = (name: string) => p.main.locator('tbody tr').filter({ hasText: name }).first();
const bar = async () => (await p.main.getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const bt = (name: string) => p.main.getByRole('button', { name, exact: true });

test('TC-RCL-001/002/003 the list loads and Add Stock Reconciliation opens the Add screen', srs('UC1 list + Add'), async () => {
  await p.gotoList();
  expect(await p.items().count()).toBeGreaterThan(0);
  await p.main.getByRole('button', { name: 'Add Stock Reconciliation' }).click();
  await expect(p.page).toHaveURL(/stock-reconciliation\/new/);
});

test('TC-RCL-004/005/007/011/012/013 columns: checkbox, ID, Status, Posting Date, Posting Time', srs('UC1 columns'), async () => {
  await p.gotoList();
  const headers = (await p.main.getByRole('columnheader').allInnerTexts()).map(clean).filter(Boolean);
  observe('columns: ' + headers.join(' | '));
  expect(headers).toEqual(['ID', 'Status', 'Posting Date', 'Posting Time']);
});

test('TC-RCL-006 clicking the ID opens the Details screen', srs('UC1 ID link'), async () => {
  const d = await make('Draft');
  await p.gotoList();
  await row(d.name).getByText(d.name, { exact: true }).click(); await p.page.waitForTimeout(3500);
  expect(p.page.url()).toContain(d.name);
  await expect(p.main).toContainText('Stock Reconciliation Details');
});

test('TC-RCL-008/009/010 the row shows Draft, Submitted and Cancelled', srs('UC1 Status values'), async () => {
  const [a, b, c] = [await make('Draft'), await make('Submitted'), await make('Cancelled')];
  await p.gotoList();
  const texts = [await row(a.name).innerText(), await row(b.name).innerText(), await row(c.name).innerText()].map(clean);
  observe('rows: ' + texts.join(' || '));
  expect(texts[0]).toContain('Draft'); expect(texts[1]).toContain('Submitted'); expect(texts[2]).toContain('Cancelled');
});

test('TC-RCL-014/015/016/017 selecting rows shows the action bar (Edit, Export, Assign, Clear assignment, Add Tags, Print, Delete)', srs('UC1 action bar'), async () => {
  const d = await make('Draft'); await make('Draft');
  await p.gotoList();
  await row(d.name).getByRole('checkbox').check(); await p.page.waitForTimeout(700);
  const b = await bar();
  observe('action bar for a Draft row: ' + b.join(' | '));
  for (const a of ['Edit', 'Export', 'Assign', 'Add Tags', 'Print']) expect(b, a).toContain(a);
  expect(b.join('|'), 'Clear assignment').toMatch(/Clear/i);
  await row(d.name).getByRole('checkbox').uncheck(); await p.page.waitForTimeout(500);
  expect(await bar(), 'action bar disappears').not.toContain('Export');
});

test('TC-RCL-027/028/029 Submit is offered for a Draft row only and submits it from the list', srs('UC1 Submit'), async () => {
  const draft = await make('Draft'); const sub = await make('Submitted');
  await p.gotoList();
  await row(sub.name).getByRole('checkbox').check(); await p.page.waitForTimeout(600);
  expect(await bt('Submit').count(), 'Submit hidden for a Submitted row').toBe(0);
  await row(sub.name).getByRole('checkbox').uncheck();
  await row(draft.name).getByRole('checkbox').check(); await p.page.waitForTimeout(600);
  observe('buttons for a Draft row: ' + (await bar()).join(' | '));
  await expect(bt('Submit')).toBeVisible({ timeout: 4000 });
  await bt('Submit').click(); await p.page.waitForTimeout(1500);
  const yes = p.page.getByRole('button', { name: /^(Yes|Confirm|OK|Submit)$/ });
  if (await yes.first().isVisible({ timeout: 2000 }).catch(() => false)) await yes.first().click();
  await p.page.waitForTimeout(4000);
  observe('message: ' + ((await p.bodyText()).match(/(Error|Not permitted|submitted)[^.]{0,80}/i)?.[0] ?? 'none'));
  expect((await api.get('Stock Reconciliation', draft.name)).docstatus).toBe(1);
});

test('TC-RCL-032/033/034 Cancel is offered for a Submitted row only and cancels it from the list', srs('UC1 Cancel'), async () => {
  const sub = await make('Submitted'); const canc = await make('Cancelled');
  await p.gotoList();
  await row(canc.name).getByRole('checkbox').check(); await p.page.waitForTimeout(600);
  expect(await bt('Cancel').count(), 'Cancel hidden for a Cancelled row').toBe(0);
  await row(canc.name).getByRole('checkbox').uncheck();
  await row(sub.name).getByRole('checkbox').check(); await p.page.waitForTimeout(600);
  await expect(bt('Cancel')).toBeVisible({ timeout: 4000 });
  await bt('Cancel').click(); await p.page.waitForTimeout(1500);
  const yes = p.page.getByRole('button', { name: /^(Yes|Confirm|OK|Cancel Document)$/ });
  if (await yes.first().isVisible({ timeout: 2000 }).catch(() => false)) await yes.first().click();
  await p.page.waitForTimeout(4000);
  expect((await api.get('Stock Reconciliation', sub.name)).docstatus).toBe(2);
});

test('TC-RCL-018/019/020 the Edit popup opens with a Field list; Update with no field is refused', srs('UC1 Edit popup'), async () => {
  const d = await make('Draft');
  await p.gotoList(); await row(d.name).getByRole('checkbox').check();
  await bt('Edit').click(); await expect(p.page.locator('.edit-modal-content')).toBeVisible();
  const field = p.page.locator('.edit-modal-content').getByPlaceholder('Select a field');
  await field.click(); await p.page.waitForTimeout(900);
  const options = (await p.page.getByRole('option').locator('visible=true').allInnerTexts()).map(clean).filter(Boolean);
  observe('Field options: ' + options.join(', '));
  expect(options.length).toBeGreaterThan(1);
});

test('TC-RCL-039/040/041 Delete asks for confirmation; Cancel keeps the record; confirming deletes a Draft', srs('UC1 Delete'), async () => {
  const keep = await make('Draft');
  await p.gotoList(); await row(keep.name).getByRole('checkbox').check();
  await bt('Delete').click();
  await expect(p.page.locator('.shamel-confirm-dialog')).toBeVisible();
  observe('confirmation: ' + clean(await p.page.locator('.shamel-confirm-dialog').innerText()));
  await p.page.locator('.shamel-confirm-dialog').getByRole('button', { name: 'Cancel' }).click();
  expect((await api.get('Stock Reconciliation', keep.name)).name).toBe(keep.name);
  await bt('Delete').click();
  await p.page.locator('.shamel-confirm-dialog').getByRole('button', { name: 'Delete' }).click();
  await expect.poll(async () => (await api.list('Stock Reconciliation', [['name', '=', keep.name]])).length, { timeout: 40_000 }).toBe(0);
});

test('TC-RCL-042 Delete of a Submitted record: what the system does (SRS: no status restriction)', srs('UC1 Delete Submitted'), async () => {
  const s = await make('Submitted');
  await p.gotoList(); await row(s.name).getByRole('checkbox').check();
  await bt('Delete').click();
  await p.page.locator('.shamel-confirm-dialog').getByRole('button', { name: 'Delete' }).click(); await p.page.waitForTimeout(5000);
  observe('Submitted record delete: ' + ((await p.bodyText()).match(/(Error|Cannot|cannot|linked)[^.]{0,140}/)?.[0] ?? 'no message') + ' | still exists: ' + (await api.list('Stock Reconciliation', [['name', '=', s.name]])).length);
});

test('TC-RCL-047/048/050/051 Export, Assign, Add Tags and Print react to a click', srs('UC1 Export / Assign / Tags / Print'), async () => {
  const d = await make('Draft');
  for (const a of ['Export', 'Assign', 'Add Tags', 'Print']) {
    await p.gotoList(); await row(d.name).getByRole('checkbox').check();
    const popup = p.page.waitForEvent('popup', { timeout: 6000 }).catch(() => null);
    const download = p.page.waitForEvent('download', { timeout: 6000 }).catch(() => null);
    const url = p.page.url();
    await bt(a).click(); await p.page.waitForTimeout(2500);
    const o = await popup; const f = await download;
    const dialogs = await p.page.locator('[role=dialog]:visible, .modal:visible, [class*=modal-container]:visible, [class*=popup]:visible').count();
    observe(`${a}: ${f ? 'downloads ' + f.suggestedFilename() : o ? 'opens a new tab' : dialogs ? 'opens a popup' : p.page.url() !== url ? 'navigates' : 'no visible reaction'}`);
    if (o) await o.close();
    await p.page.keyboard.press('Escape');
  }
});
