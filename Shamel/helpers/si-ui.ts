// UI helpers for the Add / Details screens of Sales Invoice (Arabic interface, route /accounting/sales-invoices).
import { type Page, type Locator, expect, test } from '@playwright/test';
import * as fs from 'fs';

export const ROUTE_NEW = '/desk/shamel#/accounting/sales-invoices/new';
export const ROUTE_LIST = '/desk/shamel#/accounting/sales-invoices';
export const main = (p: Page) => p.getByRole('main');
export const press = (l: Locator) => l.evaluate((e: any) => e.click());
export const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const wait = (p: Page, ms: number) => p.waitForTimeout(ms);

/** Field container found through its label text (a trailing * is ignored). */
export const box = (p: Page, label: string) =>
  main(p).locator('label').filter({ hasText: new RegExp('^\\s*' + esc(label) + '\\s*\\*?\\s*$') }).first().locator("xpath=ancestor::div[.//input or .//textarea or .//*[contains(@class,'cd-readonly') or contains(@class,'status-chip') or contains(@class,'selected-value')]][1]");

export async function openNew(p: Page) {
  await p.goto('about:blank');
  await p.goto(ROUTE_NEW, { timeout: 100_000 });
  await main(p).getByRole('button', { name: 'التفاصيل', exact: true }).waitFor({ timeout: 60_000 });
  await wait(p, 4000);
}
export async function openDoc(p: Page, name: string) {
  await p.goto('about:blank');
  await p.goto(`/desk/shamel#/accounting/sales-invoices/${name}`, { timeout: 100_000 });
  await main(p).getByRole('button', { name: 'التفاصيل', exact: true }).waitFor({ timeout: 60_000 });
  await wait(p, 4000);
}
export async function tab(p: Page, name: 'التفاصيل' | 'المعلومات العامة' | 'معلومات إضافية') {
  await press(main(p).getByRole('button', { name, exact: true }).first()); await wait(p, 1500);
  // open collapsed sections of the tab (skip notification / action buttons)
  for (let i = 0; i < 30; i++) {
    const idx = await main(p).locator('button[aria-expanded=false]').evaluateAll((els: any[]) =>
      els.findIndex((e) => e.offsetParent && !/إشعار|رجوع|عرض|جلب|إنشاء|حفظ|إلغاء|الكل|مقروء/.test(e.innerText || e.title || '') && (e.innerText || '').trim().length > 2));
    if (idx < 0) break;
    try { await press(main(p).locator('button[aria-expanded=false]').nth(idx)); await wait(p, 300); } catch { break; }
  }
}

/** Choose an option of a searchable dropdown. Returns what was shown / picked. */
export async function combo(p: Page, label: string, query = '', nth = 0) {
  const f = box(p, label).locator('input').first();
  await f.click(); if (query) await f.fill(query); await wait(p, 1600);
  const opts = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  if (!opts.length) { await p.keyboard.press('Escape'); return { picked: '', opts, value: await f.inputValue() }; }
  await press(p.locator('.cs-option:visible').nth(nth)); await wait(p, 1500);
  return { picked: opts[nth], opts, value: await f.inputValue() };
}
export async function options(p: Page, label: string, query = '') {
  const f = box(p, label).locator('input').first();
  await f.click(); if (query) await f.fill(query); await wait(p, 1600);
  const opts = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  await p.keyboard.press('Escape'); await main(p).click({ position: { x: 5, y: 5 }, force: true }).catch(() => {});
  return opts;
}
export async function setText(p: Page, label: string, v: string) {
  const f = box(p, label).locator('input,textarea').first();
  await f.fill(v); await f.press('Tab'); await wait(p, 600); return f.inputValue();
}
export async function value(p: Page, label: string) {
  const b = box(p, label);
  const inp = b.locator('input:not([type=hidden]),textarea').first();
  if (await inp.count()) return inp.inputValue();
  const ro = b.locator('.cd-readonly,.status-chip,.selected-value').first();
  if (await ro.count()) return (await ro.innerText()).replace(/\s+/g, ' ').trim();
  return (await b.innerText()).replace(/\s+/g, ' ').trim();
}
export async function pickDate(p: Page, label: string, day: string) {
  const f = box(p, label).locator('input:visible').first();
  await f.click({ force: true }); await wait(p, 700);
  await p.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: new RegExp('^' + day + '$') }).first().click();
  await wait(p, 700); return f.inputValue();
}
export async function toggle(p: Page, label: string) {
  const r = main(p).locator('.toggle-row').filter({ hasText: label }).first();
  await r.locator('.is-switch-slider').click(); await wait(p, 700);
  return r.locator('input[type=checkbox]').isChecked();
}
export async function toggleState(p: Page, label: string) {
  const r = main(p).locator('.toggle-row').filter({ hasText: label }).first();
  if (!(await r.count())) return 'missing';
  const c = r.locator('input[type=checkbox]');
  return (await c.isChecked() ? 'on' : 'off') + ((await c.isDisabled()) ? ' disabled' : '');
}

export async function addItem(p: Page, code: string, qty: string | null, rate: string | null) {
  await press(main(p).getByRole('button', { name: 'إضافة صنف', exact: true })); await wait(p, 1800);
  const rows = main(p).locator('table.si-table tbody tr, table tbody tr');
  const row = rows.first();
  const ic = row.getByPlaceholder('ابحث واختر').first(); await ic.click(); await ic.fill(code); await wait(p, 1800);
  await press(p.locator('.cs-option:visible').first()); await wait(p, 2500);
  if (qty !== null) { const q = row.locator('input[type=number]').first(); await q.fill(qty); await q.press('Tab'); await wait(p, 900); }
  if (rate !== null) { const r = row.locator('input[type=number]').nth(1); await r.fill(rate); await r.press('Tab'); await wait(p, 1200); }
  return row;
}
export async function fillBasic(p: Page, opts: { customer?: string; item?: string; qty?: string; rate?: string } = {}) {
  await combo(p, 'شركة', 'Ahmed').catch(() => {});
  await combo(p, 'العميل', opts.customer ?? 'PW Test');
  return addItem(p, opts.item ?? 'IND182210', opts.qty ?? '1', opts.rate ?? '10500');
}

/** Everything the screen currently shows as a message (modal, toast, inline error). */
export async function messages(p: Page) {
  return p.evaluate(() => {
    const out: string[] = [];
    const vis = (e: Element) => (e as HTMLElement).offsetParent !== null || getComputedStyle(e as HTMLElement).position === 'fixed';
    for (const m of document.querySelectorAll('.modal.show,.base-modal,[role=dialog]')) if (vis(m)) out.push('MODAL: ' + (m as HTMLElement).innerText.replace(/\s+/g, ' ').slice(0, 500));
    const txt = (e: Element) => (typeof (e as HTMLElement).innerText === 'string' ? (e as HTMLElement).innerText : '').replace(/\s+/g, ' ').trim();
    for (const t of document.querySelectorAll('[role=alert],.alert,.desk-alert,[class*=toast],[class*=Toastify],[class*=snack],[class*=notif]:not(button)')) if (vis(t) && txt(t)) out.push('TOAST: ' + txt(t).slice(0, 300));
    for (const e of document.querySelectorAll('[class*=error],[class*=invalid],[class*=danger]')) if (vis(e) && e.children.length === 0 && txt(e)) out.push('ERR: ' + txt(e).slice(0, 200));
    return out;
  });
}
export async function closeModal(p: Page) {
  for (let i = 0; i < 3; i++) {
    const x = p.locator('.modal.show .btn-modal-close');
    if (await x.count()) { await press(x.first()).catch(() => {}); await wait(p, 600); continue; }
    const b = p.locator('.base-modal:visible button').filter({ hasText: /إغلاق|حسنًا|حسنا|موافق|إلغاء|OK/ }).first();
    if (await b.count()) { await press(b).catch(() => {}); await wait(p, 600); continue; }
    break;
  }
}
export async function save(p: Page, waitMs = 9000) {
  await press(main(p).getByRole('button', { name: 'حفظ', exact: true }));
  await wait(p, waitMs);
  return { msgs: await messages(p), url: p.url() };
}
export const docName = (url: string) => (url.match(/sales-invoices\/([^/?#]+)/) || [])[1] || '';
export const isNew = (url: string) => /\/new$/.test(url);

/** Reads a summary value (label then value) from the financial summary / totals. */
export async function summary(p: Page, label: string) {
  return (await value(p, label)).replace(/\s+/g, ' ').trim();
}
export const num = (s: string) => Number(String(s).replace(/[^\d.\-]/g, '')) || 0;

// ---- results recording -------------------------------------------------
const RES_DIR = 'C:/Playwright_Automation/Shamel/si-results';
export function recorder(batch: string) {
  fs.mkdirSync(RES_DIR, { recursive: true });
  const file = `${RES_DIR}/${batch}.jsonl`;
  return {
    reset() { fs.writeFileSync(file, ''); },
    /** check(id, text, ok, detail, knownBug) - soft assertion; a known bug only adds an annotation */
    check(id: string, text: string, ok: boolean, detail = '', known = '') {
      fs.appendFileSync(file, JSON.stringify({ id, text, ok, detail: String(detail).slice(0, 400), known }) + '\n');
      if (known && !ok) test.info().annotations.push({ type: 'known-bug', description: `${id} ${known}` });
      else expect.soft(ok, `${id} ${text} ${detail}`).toBeTruthy();
    },
    note(id: string, text: string, detail = '') { fs.appendFileSync(file, JSON.stringify({ id, text, ok: null, detail: String(detail).slice(0, 6000) }) + '\n'); },
  };
}

/** label -> value for every visible field of the current tab (duplicate labels get a #n suffix). */
export async function snapshot(p: Page): Promise<Record<string, string>> {
  const arr: [string, string][] = await p.evaluate(() => {
    const root = document.querySelector('main') as HTMLElement; const out: [string, string][] = [];
    const vis = (e: Element) => (e as HTMLElement).offsetParent !== null;
    const t = (e: Element | null) => (e ? ((e as HTMLElement).innerText || '').replace(/\s+/g, ' ').trim() : '');
    for (const lab of [...root.querySelectorAll('label, .toggle-row-label')].filter(vis)) {
      const txt = t(lab).replace(/\s*\*$/, ''); if (!txt) continue;
      let box: HTMLElement | null = lab as HTMLElement;
      for (let i = 0; i < 4 && box; i++) { if (box !== lab && box.querySelector('input,textarea,.cd-readonly,.status-chip,.selected-value,.is-switch')) break; box = box.parentElement; }
      if (!box) continue;
      let val = '';
      const sw = box.querySelector('input[type=checkbox]') as HTMLInputElement | null;
      const inp = box.querySelector('input:not([type=hidden]):not([type=checkbox]),textarea') as HTMLInputElement | null;
      if (box.querySelector('.is-switch') && sw) val = sw.checked ? 'on' : 'off';
      else if (inp) val = inp.value || '';
      else if (box.querySelector('.cd-readonly')) val = t(box.querySelector('.cd-readonly'));
      else if (box.querySelector('.status-chip')) val = t(box.querySelector('.status-chip'));
      else if (box.querySelector('.selected-value')) { val = t(box.querySelector('.selected-value')); if (val === 'ابحث واختر') val = ''; }
      out.push([txt, val]);
    }
    return out;
  });
  const m: Record<string, string> = {}; const seen: Record<string, number> = {};
  for (const [k, v] of arr) { seen[k] = (seen[k] || 0) + 1; m[seen[k] > 1 ? `${k}#${seen[k]}` : k] = v; }
  return m;
}
export function diffSnap(a: Record<string, string>, b: Record<string, string>, ignore: RegExp = /حالة|الحالة|إنشاؤه|^—$|إشعار|وقت/) {
  const out: string[] = [];
  for (const k of Object.keys(a)) { if (ignore.test(k)) continue; const va = (a[k] || '').trim(), vb = (b[k] ?? '<missing>').trim(); if (va && va !== vb && !vb.includes(va) && !va.includes(vb) && !ignore.test(va)) out.push(`${k}: "${va}" -> "${vb}"`); }
  return out;
}

/** Creates, saves and submits a small invoice from the screen (confirms the shortage dialog); returns its ID. */
export async function submittedInvoice(p: Page, rate = '3000') {
  await openNew(p); await combo(p, 'شركة', 'Ahmed'); await combo(p, 'العميل', 'PW Test');
  await addItem(p, 'IND182210', '1', null); await wait(p, 4000);
  const r1 = main(p).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1); await r1.fill(rate); await r1.press('Tab'); await wait(p, 1200);
  const s = await save(p, 10000); if (isNew(s.url)) throw new Error('save failed ' + JSON.stringify(s.msgs));
  const name = docName(s.url); await wait(p, 2500);
  await press(main(p).getByRole('button', { name: 'اعتماد', exact: true })); await wait(p, 4000);
  const ok = p.locator('.modal.show .btn-modal-primary, .base-modal:visible button').filter({ hasText: /إرسال|نعم|تأكيد/ }).first();
  if (await ok.count()) { await press(ok); await wait(p, 7000); }
  return name;
}
export async function cancelInvoice(p: Page, name: string) {
  await openDoc(p, name);
  await press(main(p).getByRole('button', { name: 'إلغاء المستند', exact: true }).first()); await wait(p, 3000);
  const ok = p.locator('.modal.show .btn-modal-primary, .base-modal:visible button').filter({ hasText: /نعم|تأكيد|إلغاء المستند|إرسال/ }).first();
  if (await ok.count()) { await press(ok); await wait(p, 6000); }
}
