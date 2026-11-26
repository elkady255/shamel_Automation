// UI helpers for Journal Entry (Arabic interface).
import { type Page, type Locator } from '@playwright/test';
import * as u from './pe-ui';
import * as f from './pe-flow';
import * as d from './pe-data';
import { api, type Doc } from './api';

export const LIST = '/desk/shamel#/accounting/journal-entries';
export const NEW = LIST + '/new';
export const CASH = '122102', BANK = '122101';
export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const je = (n: string) => api.get('Journal Entry', n);
export const exists = async (n: string) => (await api.list('Journal Entry', [['name', '=', n]])).length === 1;
export const gl = async (n: string): Promise<Doc[]> => api.list('GL Entry', [['voucher_no', '=', n], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit', 'party'], 30);
export const nameOf = (p: Page) => (p.url().match(/journal-entries\/(ACC[^/?#]+)/) || [])[1] ?? '';

export const dialog = (p: Page) => p.locator('.base-modal:visible, .qr-dialog:visible, .modal.show, [role=dialog]:visible, .shamel-confirm-dialog:visible');
export const dialogText = async (p: Page) => (await dialog(p).allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim()).join(' || ');
export const modal = (p: Page) => p.locator('.qr-dialog:visible, .base-modal:visible, [role=dialog]:visible').last();
export const modalText = async (p: Page) => (await modal(p).innerText({ timeout: 5000 }).catch(() => 'NO POPUP OPENED')).replace(/\s+/g, ' ');
export async function closeAll(p: Page) {
  for (let i = 0; i < 4 && (await dialog(p).count()); i++) { await dialog(p).last().locator('.shamel-btn-cancel, .btn-modal-close, .qr-close, .close-btn, button:has-text("إلغاء"), button:has-text("إغلاق")').first().click({ timeout: 5000 }).catch(() => {}); await wait(1200); }
}

export const open = async (p: Page, type?: string) => { await u.open(p, NEW); if (type) { await f.option(p, 'نوع القيد', type); await wait(1500); } };
export const openDoc = (p: Page, n: string) => u.open(p, `${LIST}/${n}`);
export const buttons = async (p: Page) => (await u.main(p).locator('button:visible, a.btn:visible').evaluateAll((bs: any[]) => bs.map((b) => b.innerText.replace(/\s+/g, ' ').trim() || b.title || ''))).filter(Boolean) as string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
export const has = (list: string[], name: string) => list.includes(name);
export const bodyText = async (p: Page) => (await u.main(p).innerText()).replace(/\s+/g, ' ');
export const toggles = async (p: Page) => (await u.main(p).locator('.toggle-row:visible').allInnerTexts()).map((s) => s.trim());
export async function toggle(p: Page, text: string) { await u.main(p).locator('.toggle-row').filter({ hasText: text }).first().locator('.is-switch-slider').click({ force: true }); await wait(2000); }
export async function tab(p: Page, name: string) { await u.main(p).getByRole('button', { name: new RegExp('^\\s*' + name + '\\s*\\d*\\s*$') }).or(u.main(p).getByRole('tab', { name })).first().click(); await wait(2500); }
export const MORE = 'المعلومات الاضافية', DETAILS = 'التفاصيل';

export const table = (p: Page) => u.main(p).locator('table:visible').first();
export const cell = (p: Page, row: number, col: number) => table(p).locator('tbody tr').nth(row).locator('input:visible').nth(col);
export const addRow = async (p: Page) => { await u.main(p).getByRole('button', { name: 'إضافة صف' }).click(); await wait(1500); };
export async function pickCell(p: Page, row: number, col: number, query: string, option = query) {
  const c = cell(p, row, col); await c.click(); await c.fill(query); await wait(2500);
  await p.locator('.cs-option:visible').filter({ hasText: option }).first().click(); await wait(2500);
}
export async function cellOptions(p: Page, row: number, col: number, query = '') {
  const c = cell(p, row, col); await c.click(); await c.fill(query); await wait(2500);
  const o = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  await p.keyboard.press('Escape'); await u.main(p).locator('h1,h2,h3').first().click({ force: true }).catch(() => {}); await wait(700); return o;
}
export async function typeCell(p: Page, row: number, col: number, v: string) {
  const c = cell(p, row, col); await c.click(); await c.press('Control+a'); if (v) await c.pressSequentially(v); else await c.press('Delete'); await c.press('Tab'); await wait(1500); return c.inputValue();
}
export type Row = { account: string; partyType?: string; party?: string; debit?: string; credit?: string };
export async function rows(p: Page, list: Row[]) {
  for (const [i, r] of list.entries()) {
    await addRow(p); await pickCell(p, i, 0, r.account);
    if (r.partyType) await pickCell(p, i, 1, '', r.partyType);
    if (r.party) await pickCell(p, i, 2, r.party);
    for (const [col, v] of [[3, r.debit], [4, r.credit]] as const) if (v) await typeCell(p, i, col, v);
  }
}
export const pair = (amount: string): Row[] => [{ account: CASH, debit: amount }, { account: BANK, credit: amount }];

/** Starts collecting every message that flashes on screen. */
export async function watch(p: Page) {
  await p.evaluate(() => {
    const w = window as any; w.__qa = [] as string[]; w.__qaObs?.disconnect(); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs = new MutationObserver((muts) => { for (const m of muts) for (const n of [...m.addedNodes, m.target] as any[]) { const t = (n.innerText ?? n.textContent ?? '').replace(/\s+/g, ' ').trim(); if (t && t.length < 300 && /بنجاح|خطأ|لا يمكن|يجب|تعذر|فشل/.test(t) && !w.__qa.includes(t)) w.__qa.push(t); } }); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });
}
export const flashed = async (p: Page) => ((await p.evaluate(() => (window as any).__qa ?? []).catch(() => [])) as string[]).join(' | '); // eslint-disable-line @typescript-eslint/no-explicit-any
const button = (p: Page, label: string): Locator => p.locator('button:visible').filter({ hasText: new RegExp('^\\s*' + label + '\\s*$') }).last();
/** Delete on the details screen is an icon button. */
export const remove = async (p: Page) => { await u.main(p).getByRole('button', { name: 'حذف', exact: true }).first().click(); await wait(2500); };
export const click = async (p: Page, label: string) => { await button(p, label).click(); await wait(2500); };
/** Clicks a button and returns the server answer plus every message shown. */
export async function send(p: Page, label: string, call = /journal_entry|Journal/) {
  await watch(p);
  const res = p.waitForResponse((r) => call.test(r.url()) && r.request().method() !== 'GET', { timeout: 20_000 }).catch(() => null);
  const b = button(p, label); const enabled = await b.isEnabled().catch(() => false);
  if (enabled) await b.click();
  const r = await res; await wait(7000);
  const body = r ? (await r.text().catch(() => '')).slice(0, 900) : '';
  return { enabled, status: r?.status() ?? 0, body, msg: `${await flashed(p)} ${await dialogText(p)}`.trim(), errors: await u.inlineErrors(p) };
}
export async function confirmYes(p: Page) {
  const yes = p.locator('.shamel-btn-confirm:visible');
  if (await yes.count()) { await yes.last().click(); await wait(7000); return true; }
  return false;
}
export async function settled(n: string, status: number) { for (let i = 0; i < 12 && (await je(n)).docstatus !== status; i++) await wait(3000); }
/** A saved draft made through the Add screen. */
export async function draft(p: Page, list: Row[] = pair('10'), type?: string) {
  await open(p, type); await rows(p, list); const s = await send(p, 'حفظ'); const n = nameOf(p);
  if (!n) throw new Error(`draft not saved: ${s.msg} ${s.errors} ${s.body.slice(0, 300)}`);
  await closeAll(p); return n;
}
export async function submitted(p: Page, list: Row[] = pair('10'), type?: string) {
  const n = await draft(p, list, type); await openDoc(p, n); await send(p, 'اعتماد', /submit/i); await settled(n, 1); await closeAll(p);
  if ((await je(n)).docstatus !== 1) throw new Error('not submitted ' + n);
  return n;
}
export { u, f, d, api };
export type { Doc };
