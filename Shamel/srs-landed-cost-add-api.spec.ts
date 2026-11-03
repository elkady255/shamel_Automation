import { test, expect } from '@playwright/test';
import { api } from './helpers/api';

/** Landed Cost Voucher - Add through the create endpoint the UI uses (backend rules, TC-LCA-134..198). */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const METHOD = 'shamel.api.routes.inventory.transactions.landed_cost.create_landed_cost';
const COMPANY = 'Ahmed Ebrahim CO.';
const PR = 'MAT-PRE-2026-00024';
let acc = '';
let base: Record<string, any>;
const made: string[] = [];

test.beforeAll(async () => {
  const pr = await api.get('Purchase Receipt', PR);
  const [a] = await api.list('Account', [['company', '=', COMPANY], ['is_group', '=', 0], ['account_type', '=', 'Expenses Included In Valuation']], ['name']);
  acc = a?.name ?? '5317 - ديون معدومة - E';
  const it = pr.items[0];
  base = {
    naming_series: 'MAT-LCV-.YYYY.-', company: COMPANY, posting_date: new Date().toISOString().slice(0, 10),
    purchase_receipts: [{ receipt_document_type: 'Purchase Receipt', receipt_document: PR, supplier: pr.supplier, grand_total: pr.grand_total, posting_date: pr.posting_date }],
    items: [{ item_code: it.item_code, description: it.description, qty: it.qty, rate: it.rate, amount: it.amount, applicable_charges: 0, purchase_receipt_item: it.name, receipt_document_type: 'Purchase Receipt', receipt_document: PR, cost_center: it.cost_center }],
    vendor_invoices: [], taxes: [{ expense_account: acc, description: 'PW freight', amount: 50, exchange_rate: 1 }],
    distribute_charges_based_on: 'Qty', amended_from: '', total_vendor_invoices_cost: 0, total_taxes_and_charges: 50,
  };
});

async function create(over: Record<string, any>): Promise<{ ok: boolean; text: string; name?: string }> {
  const payload = { ...structuredClone(base), ...over };
  try {
    const r = await api.call(METHOD, { data: JSON.stringify(payload) });
    const name = r?.doc?.name ?? r?.name; if (name) made.push(name);
    return { ok: true, text: JSON.stringify(r).slice(0, 300), name };
  } catch (e) { return { ok: false, text: String(e).replace(/\\n/g, ' ').slice(0, 400) }; }
}
const taxRow = (o: Record<string, any>) => [{ ...base.taxes[0], ...o }];

test('TC-LCA-194 valid voucher is created (Qty, applicable charges set)', srs('Add LCV > Save with valid data'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items });
  console.log('VALID:', r.text);
  expect(r.ok, r.text).toBe(true);
});

test('TC-LCA-135 Expense Account is optional in the SRS - save without it', srs('Add LCV > Expense Account optional'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items, taxes: taxRow({ expense_account: '' }) });
  console.log('NO ACCOUNT:', r.text);
  expect(r.ok, r.text).toBe(true);
});

test('TC-LCA-196/197 voucher with no landed cost rows gives a clear validation error', srs('Add LCV > needs landed cost'), async () => {
  const r = await create({ taxes: [], total_taxes_and_charges: 0 });
  console.log('NO TAXES:', r.text);
  expect(r.ok).toBe(false);
  expect(r.text, 'a readable message, not MandatoryError on the child table').not.toMatch(/MandatoryError/);
});

test('TC-LCA-196 voucher with no receipt documents is rejected', srs('Add LCV > needs receipt documents'), async () => {
  const r = await create({ purchase_receipts: [], items: [] });
  console.log('NO RECEIPTS:', r.text);
  expect(r.ok).toBe(false);
});

test('TC-LCA-195 missing company is rejected', srs('Add LCV > Company mandatory'), async () => {
  const r = await create({ company: '' });
  console.log('NO COMPANY:', r.text);
  expect(r.ok).toBe(false);
});

for (const [id, amount] of [['TC-LCA-151', 0], ['TC-LCA-152', -50]] as const) {
  test(`${id} Landed Cost Amount ${amount} is rejected (SRS min 1)`, srs('Add LCV > Amount min 1'), async () => {
    const items = structuredClone(base.items); items[0].applicable_charges = amount;
    const r = await create({ items, taxes: taxRow({ amount }), total_taxes_and_charges: amount });
    console.log(id, r.text);
    expect(r.ok, 'must not be created').toBe(false);
  });
}

test('TC-LCA-138 Description of 2 characters is rejected (SRS min 3)', srs('Add LCV > Description 3-500'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items, taxes: taxRow({ description: 'ab' }) });
  console.log('DESC 2:', r.text);
  expect(r.ok, 'must not be created').toBe(false);
});

test('TC-LCA-141 Description over 500 characters is rejected', srs('Add LCV > Description max 500'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items, taxes: taxRow({ description: 'D'.repeat(600) }) });
  console.log('DESC 600:', r.text);
  expect(r.ok, 'must not be created').toBe(false);
});

test('TC-LCA-144 empty Description is rejected', srs('Add LCV > Description mandatory'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items, taxes: taxRow({ description: '' }) });
  console.log('DESC EMPTY:', r.text);
  expect(r.ok, 'must not be created').toBe(false);
});

test('TC-LCA-153 decimal amount is accepted and distributed', srs('Add LCV > Amount decimals'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 12.75;
  const r = await create({ items, taxes: taxRow({ amount: 12.75 }), total_taxes_and_charges: 12.75 });
  console.log('DECIMAL:', r.text);
  expect(r.ok, r.text).toBe(true);
});

test('TC-LCA-198 total applicable charges different from total landed cost is rejected', srs('Add LCV > charges must equal landed cost'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 10;
  const r = await create({ items });
  console.log('MISMATCH:', r.text);
  expect(r.ok, 'must not be created').toBe(false);
});

test('TC-LCA-037 same Receipt Document twice is rejected', srs('Add LCV > duplicate receipt document'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items, purchase_receipts: [base.purchase_receipts[0], base.purchase_receipts[0]] });
  console.log('DUP RECEIPT:', r.text);
  expect(r.ok, 'must not be created').toBe(false);
});

test('TC-LCA-188 Distribute Manually keeps the entered charges', srs('Add LCV > Distribute Manually'), async () => {
  const items = structuredClone(base.items); items[0].applicable_charges = 50;
  const r = await create({ items, distribute_charges_based_on: 'Distribute Manually' });
  console.log('MANUAL:', r.text);
  expect(r.ok, r.text).toBe(true);
});

test('created vouchers are Draft', async () => {
  console.log('MADE:', JSON.stringify(made));
  for (const n of made) expect((await api.get('Landed Cost Voucher', n)).docstatus).toBe(0);
});
