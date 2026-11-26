// UI helpers for Payment Entry (Arabic interface).
import { type Page, expect } from '@playwright/test';
import { press, wait, esc, messages } from './si-ui';
import { label, input, pick, options, modalText, closeModals, main } from './prec-ui';

export { press, wait, messages, label, input, pick, options, modalText, closeModals, main };
export const LIST = '/desk/shamel#/accounting/payment-entries';
export const NEW = LIST + '/new';

export async function open(p: Page, route = NEW) {
  await p.goto('about:blank');
  await p.goto(route, { timeout: 100_000 });
  await main(p).locator('h1,h2,h3').first().waitFor({ timeout: 60_000 });
  await wait(p, 5000);
}
export const labels = async (p: Page) => (await main(p).locator('label:visible').allInnerTexts()).map((s) => s.replace(/\*/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
export const btn = (p: Page, name: string | RegExp) => main(p).getByRole('button', { name, exact: typeof name === 'string' }).first();
/** label -> shown value (input, read-only box or switch) for every visible field. */
export async function fields(p: Page): Promise<Record<string, string>> {
  return main(p).evaluate((root) => {
    const out: Record<string, string> = {};
    for (const l of [...root.querySelectorAll('label, .toggle-row-label')] as HTMLElement[]) {
      if (!l.offsetParent) continue; const key = l.innerText.replace(/\*/g, '').replace(/\s+/g, ' ').trim(); if (!key) continue;
      let b: HTMLElement | null = l.parentElement;
      for (let i = 0; i < 3 && b && !b.querySelector('input,textarea,.cd-readonly'); i++) b = b.parentElement;
      if (!b) continue;
      const c = b.querySelector('input[type=checkbox]') as HTMLInputElement | null;
      const i = [...b.querySelectorAll('input:not([type=checkbox]):not([type=hidden]),textarea')].find((e: any) => e.offsetParent) as HTMLInputElement | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
      const r = b.querySelector('.cd-readonly') as HTMLElement | null;
      out[out[key] === undefined ? key : key + '#2'] = i ? i.value : r ? r.innerText.trim() : c ? (c.checked ? 'on' : 'off') : '';
    }
    return out;
  });
}
export async function type(p: Page, text: string, v: string) {
  const f = label(p, text).locator('xpath=ancestor::div[.//input or .//textarea][1]').locator('input:visible,textarea:visible').first();
  await f.click(); await f.press('Control+a'); if (v) await f.pressSequentially(v); else await f.press('Delete'); await f.press('Tab'); await wait(p, 900);
  return f.inputValue();
}
/** Picks the first option matching the query in a searchable dropdown. */
export async function choose(p: Page, text: string, query: string, optionText = query) { return pick(p, text, query, optionText); }
/** Labels of the fields that currently show an inline error, with the error text. */
export const inlineErrors = (p: Page) => main(p).locator('label:visible').evaluateAll((ls: any[]) => ls.flatMap((l) => { let b = l.parentElement; for (let i = 0; i < 2 && b; i++) { if (b.querySelectorAll('label').length === 1) { const e = [...b.querySelectorAll('[class*=error]')].map((x: any) => x.innerText.trim()).filter(Boolean)[0]; if (e) return [`${l.innerText.replace('*', '').trim()}: ${e}`]; } b = b.parentElement; } return []; })); // eslint-disable-line @typescript-eslint/no-explicit-any
export const docName = (url: string) => (url.match(/payment-entries\/([^/?#]+)/) || [])[1] ?? '';
/** Presses Save and returns the server answer and what the screen shows. */
export async function save(p: Page) {
  let status = 0, body = '', url = '', sent = '';
  const h = async (r: import('@playwright/test').Response) => { const q = r.request(); if (q.method() !== 'GET' && /payment.?entr/i.test(r.url()) && /creat|updat|save|\/resource\//i.test(r.url())) { status = r.status(); url = r.url(); sent = decodeURIComponent((q.postData() ?? '').replace(/\+/g, ' ')); body = (await r.text().catch(() => '')).slice(0, 3000); } };
  p.on('response', h);
  await press(btn(p, /^(حفظ|تحديث)$/)); await wait(p, 11_000);
  p.off('response', h);
  const msg = `${await modalText(p)} ${(await messages(p)).join(' ')}`.trim();
  return { status, url, sent, body, msg, name: docName(p.url()).replace('new', ''), errors: await inlineErrors(p) };
}
export const sections = async (p: Page) => (await main(p).locator('h2:visible, h3:visible, h4:visible, button[aria-expanded]:visible').allInnerTexts()).map((s) => s.trim()).filter(Boolean);
export const tablesInfo = (p: Page) => main(p).locator('table:visible').evaluateAll((ts: any[]) => ts.map((t) => ({ head: [...t.querySelectorAll('thead th')].map((e: any) => e.innerText.trim()), rows: [...t.querySelectorAll('tbody tr')].map((r: any) => [...r.querySelectorAll('td')].map((c: any) => { const i = c.querySelector('input:not([type=checkbox])'); return i ? i.value : c.innerText.replace(/\s+/g, ' ').trim(); })) }))); // eslint-disable-line @typescript-eslint/no-explicit-any
export { expect, esc };
