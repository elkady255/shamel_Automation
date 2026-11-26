// Payment Entry - end to end through the screen for every type and party. CHANGES DATA (own QA-PE documents).
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api, type Doc } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('pe-b-e2e');
test.use({ viewport: { width: 1400, height: 1800 } });
test.describe.configure({ mode: 'default' });
test.setTimeout(290_000);

/** General Ledger of a voucher, one line per account (the ledger may split a line per invoice). */
const gl = async (name: string) => {
  const rows = await api.list('GL Entry', [['voucher_no', '=', name], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit', 'party', 'cost_center'], 30);
  const m = new Map<string, Doc>();
  for (const x of rows) { const k = `${x.account}|${x.debit > 0 ? 'D' : 'C'}`; const y = m.get(k); if (y) { y.debit += x.debit; y.credit += x.credit; } else m.set(k, { ...x }); }
  return [...m.values()];
};
const glText = (g: Doc[]) => g.map((x) => `${x.account} Dr${x.debit} Cr${x.credit}${x.party ? ' ' + x.party : ''}`).sort().join(' ; ');
const has = (g: Doc[], account: string, debit: number, credit: number) => g.some((x) => x.account === account && Math.abs(x.debit - debit) < 0.01 && Math.abs(x.credit - credit) < 0.01);

type Case = {
  id: string; title: string; pay: f.Payment; expect: Partial<Record<string, unknown>>;
  /** debit account / credit account / amount in company currency expected in the General Ledger */
  gl: [string, string, number]; invoices?: { names: string[]; doctype: string; outstanding: number[] };
};

/** Add from the screen, check the stored draft, (allocate), submit, check the ledger and the balances. */
async function run(page: Page, c: Case) {
  await f.fill(page, c.pay);
  const before = await u.fields(page); rec.note(`${c.id}-form`, 'form before Save', JSON.stringify(before));
  const s = await u.save(page);
  rec.check(`${c.id}-1`, `${c.title}: Save creates a draft from the screen`, s.status < 300 && /ACC-PAY/.test(s.name), `status=${s.status} name=${s.name} msg=${s.msg.slice(0, 300)} errors=${s.errors.join(';')} body=${s.body.slice(0, 300)}`);
  if (!/ACC-PAY/.test(s.name)) return '';
  d.remember(c.id, s.name);
  await u.closeModals(page);
  let doc = await api.get('Payment Entry', s.name);
  const wrong = Object.entries(c.expect).filter(([k, v]) => doc[k] !== v).map(([k, v]) => `${k}: expected ${v} saved ${doc[k]}`);
  rec.check(`${c.id}-2`, `${c.title}: every entered value is saved on the document`, wrong.length === 0 && doc.docstatus === 0, wrong.join(' ; ') || s.name);
  if (c.invoices) {
    await f.getInvoices(page);
    const t = (await u.tablesInfo(page))[0]; rec.note(`${c.id}-refs`, 'reference rows', JSON.stringify(t));
    rec.check(`${c.id}-3`, `${c.title}: Get Outstanding Invoices lists the open invoices of the party`, !!t && c.invoices.names.every((n) => t.rows.some((r) => r.includes(n))), JSON.stringify(t?.rows));
    const s2 = await u.save(page); await u.closeModals(page);
    doc = await api.get('Payment Entry', s.name);
    rec.check(`${c.id}-4`, `${c.title}: the allocation is saved on the draft`, s2.status < 300 && c.invoices.names.some((n) => doc.references.some((r: Doc) => r.reference_name === n && r.allocated_amount > 0)), `status=${s2.status} refs=${JSON.stringify(doc.references.map((r: Doc) => [r.reference_name, r.allocated_amount]))} msg=${s2.msg}`);
  }
  const r = await f.submit(page); await u.closeModals(page);
  doc = await api.get('Payment Entry', s.name);
  rec.check(`${c.id}-5`, `${c.title}: Submit from the screen submits the document with a success message`, doc.docstatus === 1 && /نجاح/.test(r.msg), `docstatus=${doc.docstatus} status=${r.status} msg=${r.msg.slice(0, 300)} body=${r.body.slice(0, 300)}`);
  if (doc.docstatus !== 1) return s.name;
  const g = await gl(s.name);
  rec.check(`${c.id}-6`, `${c.title}: General Ledger posts Dr ${c.gl[0]} / Cr ${c.gl[1]} with ${c.gl[2]}`, has(g, c.gl[0], c.gl[2], 0) && has(g, c.gl[1], 0, c.gl[2]), glText(g));
  const debit = g.reduce((a, x) => a + x.debit, 0), credit = g.reduce((a, x) => a + x.credit, 0);
  rec.check(`${c.id}-7`, `${c.title}: the ledger is balanced`, Math.abs(debit - credit) < 0.01 && debit > 0, `${debit} / ${credit}`);
  if (c.invoices) {
    const out = [] as number[]; for (const n of c.invoices.names) out.push((await api.get(c.invoices.doctype, n)).outstanding_amount);
    rec.check(`${c.id}-8`, `${c.title}: invoice balances are reduced (${c.invoices.outstanding.join(' / ')})`, JSON.stringify(out) === JSON.stringify(c.invoices.outstanding), out.join(' / '));
  }
  await u.open(page, `${u.LIST}/${s.name}`);
  const x = await u.fields(page); const head = (await u.main(page).innerText()).slice(0, 600);
  const num = (v: string) => Number((v ?? '').replace(/,/g, ''));
  rec.check(`${c.id}-9`, `${c.title}: the details screen shows status Submitted and the saved values`, /معتمد/.test(head) && num(x['المبلغ المدفوع']) === doc.paid_amount && num(x['المبلغ المستلم']) === doc.received_amount && x['طريقة الدفع'] === doc.mode_of_payment, `${x['المبلغ المدفوع']} ${x['المبلغ المستلم']} ${x['طريقة الدفع']}`);
  return s.name;
}

const dd = () => d.data();

test('B01 receive from customer against invoices (cash)', async ({ page }) => {
  await run(page, {
    id: 'B01', title: 'Receive / Customer', pay: { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '2000' },
    expect: { payment_type: 'Receive', company: d.CO, party_type: 'Customer', party: d.CUST, party_name: d.CUST, mode_of_payment: 'Cash', paid_from: d.REC, paid_to: '122102 - RIYAD BANK - E', paid_amount: 2000, received_amount: 2000, source_exchange_rate: 1, target_exchange_rate: 1, cost_center: d.CC },
    gl: ['122102 - RIYAD BANK - E', d.REC, 2000], invoices: { names: [dd().si2, dd().si3], doctype: 'Sales Invoice', outstanding: [0, 700] },
  });
});

test('B02 pay supplier by bank against an invoice', async ({ page }) => {
  await run(page, {
    id: 'B02', title: 'Pay / Supplier', pay: { type: 'pay', mop: 'Tabby', party: d.SUPP, paidFrom: '122301', paid: '1500', ref: 'QA-PE-CHQ-02' },
    expect: { payment_type: 'Pay', party_type: 'Supplier', party: d.SUPP, mode_of_payment: 'Tabby', paid_from: '122301 - Tabby - E', paid_to: d.PAY, paid_amount: 1500, received_amount: 1500, reference_no: 'QA-PE-CHQ-02', reference_date: '2026-11-24' },
    gl: [d.PAY, '122301 - Tabby - E', 1500], invoices: { names: [dd().pi1], doctype: 'Purchase Invoice', outstanding: [0] },
  });
});

test('B03 internal transfer cash to bank', async ({ page }) => {
  await run(page, {
    id: 'B03', title: 'Internal Transfer', pay: { type: 'transfer', mop: 'Tabby', paidFrom: '122102', paidTo: '122301', paid: '250', ref: 'QA-PE-TR-03' },
    expect: { payment_type: 'Internal Transfer', paid_from: '122102 - RIYAD BANK - E', paid_to: '122301 - Tabby - E', paid_amount: 250, received_amount: 250, reference_no: 'QA-PE-TR-03' },
    gl: ['122301 - Tabby - E', '122102 - RIYAD BANK - E', 250],
  });
});

test('B04 receive from employee', async ({ page }) => {
  await run(page, {
    id: 'B04', title: 'Receive / Employee', pay: { type: 'receive', mop: 'Cash', partyType: 'Employee', party: dd().employee, paidTo: '122102', paid: '300' },
    expect: { payment_type: 'Receive', party_type: 'Employee', party: dd().employee, paid_from: d.PAY_DEFAULT, paid_amount: 300 },
    gl: ['122102 - RIYAD BANK - E', d.PAY_DEFAULT, 300],
  });
});

test('B05 pay to employee', async ({ page }) => {
  await run(page, {
    id: 'B05', title: 'Pay / Employee', pay: { type: 'pay', mop: 'Cash', partyType: 'Employee', party: dd().employee, paidFrom: '122102', paid: '100' },
    expect: { payment_type: 'Pay', party_type: 'Employee', party: dd().employee, paid_to: d.PAY_DEFAULT, paid_amount: 100 },
    gl: [d.PAY_DEFAULT, '122102 - RIYAD BANK - E', 100],
  });
});

test('B06 receive from shareholder', async ({ page }) => {
  await run(page, {
    id: 'B06', title: 'Receive / Shareholder', pay: { type: 'receive', mop: 'Cash', partyType: 'Shareholder', party: dd().shareholder, paidTo: '122102', paid: '400' },
    expect: { payment_type: 'Receive', party_type: 'Shareholder', party: dd().shareholder, paid_amount: 400 },
    gl: ['122102 - RIYAD BANK - E', d.PAY_DEFAULT, 400],
  });
});

test('B07 pay to shareholder', async ({ page }) => {
  await run(page, {
    id: 'B07', title: 'Pay / Shareholder', pay: { type: 'pay', mop: 'Cash', partyType: 'Shareholder', party: dd().shareholder, paidFrom: '122102', paid: '150' },
    expect: { payment_type: 'Pay', party_type: 'Shareholder', party: dd().shareholder, paid_amount: 150 },
    gl: [d.PAY_DEFAULT, '122102 - RIYAD BANK - E', 150],
  });
});

test('B08 refund to customer (pay)', async ({ page }) => {
  await run(page, {
    id: 'B08', title: 'Pay / Customer', pay: { type: 'pay', mop: 'Cash', partyType: 'Customer', party: d.CUST, paidFrom: '122102', paid: '120' },
    expect: { payment_type: 'Pay', party_type: 'Customer', party: d.CUST, paid_from: '122102 - RIYAD BANK - E', paid_to: d.REC, paid_amount: 120 },
    gl: [d.REC, '122102 - RIYAD BANK - E', 120],
  });
});

test('B09 refund from supplier (receive)', async ({ page }) => {
  await run(page, {
    id: 'B09', title: 'Receive / Supplier', pay: { type: 'receive', mop: 'Cash', partyType: 'Supplier', party: d.SUPP, paidTo: '122102', paid: '130' },
    expect: { payment_type: 'Receive', party_type: 'Supplier', party: d.SUPP, paid_from: d.PAY, paid_to: '122102 - RIYAD BANK - E', paid_amount: 130 },
    gl: ['122102 - RIYAD BANK - E', d.PAY, 130],
  });
});
