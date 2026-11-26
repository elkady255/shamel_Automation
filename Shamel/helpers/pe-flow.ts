// Fills the Add Payment Entry screen the way a user does.
import { type Page } from '@playwright/test';
import * as u from './pe-ui';

export const TYPE = { receive: 'استلام', pay: 'دفع', transfer: 'تحويل داخلي' } as const;
export const PARTY = { Customer: 'عميل', Employee: 'موظف', Shareholder: 'مساهم', Supplier: 'مورد' } as const;
export type PartyType = keyof typeof PARTY;

const box = (p: Page, text: string) => u.label(p, text).locator('xpath=ancestor::div[.//input][1]').locator('input:visible').first();
/** Opens a short dropdown and clicks the option with exactly this text (first one containing it otherwise). */
export async function option(p: Page, text: string, value: string) {
  const f = box(p, text); await f.click(); await u.wait(p, 1500);
  const all = p.locator('.cs-option:visible');
  const exact = all.filter({ hasText: new RegExp('^\s*' + u.esc(value) + '\s*$') });
  // the box keeps the current value as a search text: clear it, then search, until the option is listed
  for (const q of ['', value]) { if (await exact.count()) break; await f.fill(q); await u.wait(p, 1800); }
  await u.press((await exact.count()) ? exact.first() : all.filter({ hasText: value }).first()); await u.wait(p, 2000);
  return f.inputValue();
}
/** Options offered by a dropdown (optionally after typing a query), then closes it. */
export async function offered(p: Page, text: string, query = '') {
  const f = box(p, text); await f.click(); if (query) await f.fill(query); await u.wait(p, 2200);
  const o = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  await p.keyboard.press('Escape'); await u.main(p).locator('h1,h2,h3').first().click({ force: true }).catch(() => {}); await u.wait(p, 700);
  return o;
}
export async function search(p: Page, text: string, query: string, optionText = query) {
  const f = box(p, text); await f.click(); await f.fill(query); await u.wait(p, 2400);
  await u.press(p.locator('.cs-option:visible').filter({ hasText: optionText }).first()); await u.wait(p, 2200);
  return f.inputValue();
}
/** Picks a calendar day of the shown month. */
export async function day(p: Page, text: string, d: number) {
  await box(p, text).click({ force: true }); await u.wait(p, 800);
  await p.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: new RegExp('^' + d + '$') }).first().click(); await u.wait(p, 800);
}

export type Payment = {
  type: keyof typeof TYPE; mop?: string; partyType?: PartyType; party?: string; paidFrom?: string; paidTo?: string;
  paid?: string; received?: string; ref?: string; sourceRate?: string; targetRate?: string;
};
export async function fill(p: Page, x: Payment) {
  await u.open(p);
  if (x.type !== 'receive') await option(p, 'نوع الدفع', TYPE[x.type]);
  if (x.mop) await search(p, 'طريقة الدفع', x.mop);
  if (x.partyType && x.partyType !== (x.type === 'pay' ? 'Supplier' : 'Customer')) await option(p, 'نوع الطرف', PARTY[x.partyType]);
  if (x.party) { await search(p, 'الطرف', x.party); await u.wait(p, 3000); }
  if (x.paidFrom) { await search(p, 'الحساب المدفوع منه', x.paidFrom); await u.wait(p, 1500); }
  if (x.paidTo) { await search(p, 'الحساب المدفوع إليه', x.paidTo); await u.wait(p, 1500); }
  if (x.sourceRate) await u.type(p, 'سعر الصرف (المصدر)', x.sourceRate);
  if (x.targetRate) await u.type(p, 'سعر الصرف (الهدف)', x.targetRate);
  if (x.paid) await u.type(p, 'المبلغ المدفوع', x.paid);
  if (x.received) await u.type(p, 'المبلغ المستلم', x.received);
  if (x.ref) { await u.type(p, 'رقم الشيك / المرجع', x.ref); await day(p, 'تاريخ الشيك / المرجع', 24); }
  await u.wait(p, 2500);
}
/** Get Outstanding Invoices on a saved draft. */
export async function getInvoices(p: Page) {
  await u.press(u.btn(p, 'جلب الفواتير المستحقة')); await u.wait(p, 7000);
}
export async function submit(p: Page) {
  // success messages disappear quickly: record every one that appears after the click
  await p.evaluate(() => {
    const w = window as any; w.__qa = [] as string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs = new MutationObserver((muts) => { for (const m of muts) for (const n of [...m.addedNodes, m.target] as any[]) { const t = (n.innerText ?? n.textContent ?? '').replace(/\s+/g, ' ').trim(); if (t && t.length < 250 && /بنجاح|خطأ/.test(t) && !w.__qa.includes(t)) w.__qa.push(t); } }); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });
  const res = p.waitForResponse((r) => r.url().includes('submit_payment_entry'), { timeout: 40_000 }).catch(() => null);
  await u.press(u.btn(p, 'اعتماد')); await u.wait(p, 3000);
  const yes = p.locator('.base-modal:visible button, .modal.show button, .shamel-confirm-content button').filter({ hasText: /^\s*(نعم|تأكيد|اعتماد|إرسال|موافق)\s*$/ });
  if (await yes.count()) await u.press(yes.last()).catch(() => {});
  const r = await res; await u.wait(p, 6000);
  const toasts: string[] = await p.evaluate(() => { const w = window as any; w.__qaObs?.disconnect(); return w.__qa ?? []; }); // eslint-disable-line @typescript-eslint/no-explicit-any
  return { status: r?.status() ?? 0, body: r ? (await r.text().catch(() => '')).slice(0, 700) : '', msg: `${toasts.join(' | ')} ${await u.modalText(p)} ${(await u.messages(p)).join(' ')}`.trim() };
}
