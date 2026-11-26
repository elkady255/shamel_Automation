// UI helpers for Payment Reconciliation (Arabic interface).
import { type Page, type Locator, expect } from '@playwright/test';
import { press, wait, esc, messages } from './si-ui';

export { press, wait, messages };
export const ROUTE = '/desk/shamel#/accounting/payment-reconciliation';
export const main = (p: Page) => p.locator('main');
export const BTN_GET = 'جلب القيود غير المسواة';
export const BTN_ALLOC = 'تخصيص';
export const COMPANY = 'Ahmed Ebrahim CO.';

export async function open(p: Page) {
  await p.goto('about:blank');
  await p.goto(ROUTE, { timeout: 100_000 });
  await main(p).getByRole('button', { name: BTN_GET }).waitFor({ timeout: 60_000 });
  await wait(p, 2500);
}
export const label = (p: Page, text: string) =>
  main(p).locator('label').filter({ hasText: new RegExp('^\\s*' + esc(text) + '\\s*\\*?\\s*$') }).first();
export const input = (p: Page, text: string) => label(p, text).locator('xpath=ancestor::div[.//input][1]').locator('input').first();

export async function options(p: Page, text: string, query = '') {
  const f = input(p, text); await f.click(); if (query) await f.fill(query); await wait(p, 2200);
  const o = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  await p.keyboard.press('Escape'); await main(p).locator('h1,h2,h3').first().click({ force: true }).catch(() => {}); await wait(p, 600);
  return o;
}
export async function pick(p: Page, text: string, query: string, optionText = query) {
  const f = input(p, text); await f.click(); await f.fill(query); await wait(p, 2200);
  const opt = p.locator('.cs-option:visible').filter({ hasText: optionText }).first();
  await expect(opt, `option ${query} for ${text}`).toBeVisible();
  await press(opt); await wait(p, 1800);
  return f.inputValue();
}
export async function setParty(p: Page, party: string, type: 'العميل' | 'المورد' = 'العميل') {
  await pick(p, 'الشركة', COMPANY);
  await pick(p, 'نوع الطرف', type === 'العميل' ? 'Customer' : 'Supplier', type);
  await pick(p, 'الطرف', party);
  await wait(p, 2000);
}
export async function getEntries(p: Page) {
  const res = p.waitForResponse((r) => r.url().includes('get_unreconciled_entries'), { timeout: 60_000 });
  await press(main(p).getByRole('button', { name: BTN_GET }));
  const body = await (await res).json().catch(() => ({}));
  await wait(p, 3000);
  return body?.message?.data as { invoices: any[]; payments: any[] } | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export const tables = (p: Page): Locator => main(p).locator('table.editable-table:visible');
export const modalText = async (p: Page) => (await p.locator('.modal.show, .base-modal:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim()).join(' || ');
export async function closeModals(p: Page) {
  for (let i = 0; i < 4; i++) {
    const err = p.locator('.modal.show .btn-modal-close');
    if (await err.count()) { await press(err.first()).catch(() => {}); await wait(p, 900); continue; }
    const b = p.locator('.base-modal:visible button').filter({ hasText: /^\s*(إلغاء|إغلاق|حسنًا|حسنا|موافق)\s*$/ }).first();
    if (await b.count()) { await press(b).catch(() => {}); await wait(p, 900); continue; }
    break;
  }
}
/** Table by position: 0 invoices, 1 payments, 2 allocation. */
export const row = (p: Page, table: number, text: string) => tables(p).nth(table).locator('tbody tr').filter({ hasText: text }).first();
export async function select(p: Page, table: number, ...texts: string[]) {
  for (const t of texts) { await press(row(p, table, t).locator('.sr-checkbox')); await wait(p, 500); }
}
/** Clicks Allocate; returns the allocation rows of the server answer (undefined when no request was made). */
export async function allocate(p: Page) {
  const res = p.waitForResponse((r) => r.url().includes('allocate_entries'), { timeout: 25_000 }).catch(() => null);
  await press(main(p).getByRole('button', { name: BTN_ALLOC, exact: true }));
  const r = await res; await wait(p, 3000);
  if (!r) return undefined;
  const body = await r.json().catch(() => ({}));
  return body?.message?.data?.allocation as any[] | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export const allocRows = async (p: Page) => ((await tables(p).count()) > 2 ? (await readTables(p))[2].rows.map((r) => r.cells) : []);
export async function readTables(p: Page) {
  return tables(p).evaluateAll((ts: any[]) => ts.map((t) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
    head: [...t.querySelectorAll('thead th')].map((e: any) => e.innerText.trim()), // eslint-disable-line @typescript-eslint/no-explicit-any
    rows: [...t.querySelectorAll('tbody tr')].map((r: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      cells: [...r.querySelectorAll('td')].map((c: any) => { const i = c.querySelector('input:not([type=checkbox])'); return i ? i.value : c.innerText.replace(/\s+/g, ' ').trim(); }), // eslint-disable-line @typescript-eslint/no-explicit-any
    })),
  })));
}
