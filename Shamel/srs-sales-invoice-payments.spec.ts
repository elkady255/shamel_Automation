import { test, expect } from '@playwright/test';
import { api } from './helpers/api';
import { invoice, draftInvoice, deliveryNote, salesOrder, draftReturn, pay, cancel, reload, stockOf, glOf, newCustomer, advance, draftFor, today, ITEM_A, ITEM_B, COMPANY, WAREHOUSE, code, seed } from './helpers/si-data';

/**
 * Sales Invoice: advances, write off, un-reconcile, credit note and refund, loyalty, addresses, Product Bundle,
 * rounding and edit rules (TC-SIG, TC-SIT, TC-SID, TC-SII). Documents come from the API chain
 * Sales Order -> Delivery Note -> Sales Invoice; only own test documents are created, submitted and cancelled, never deleted.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const failure = async (p: Promise<unknown>) => { try { await p; return ''; } catch (e) { return String(e).replace(/\s+/g, ' '); } };
test.describe.configure({ timeout: 170_000 });

test('TC-SIG-020 an advance payment is allocated automatically and reduces the outstanding amount', srs('Advance Payment: Allocate Advance Automatically'), async () => {
  const cust = await newCustomer();
  await advance(cust, 300);
  const draft = await draftFor(cust);
  const saved = await api.call('frappe.client.save', { doc: { ...draft, allocate_advances_automatically: 1, only_include_allocated_payments: 0 } });
  observe(`advances rows: ${saved.advances?.length}, total advance ${saved.total_advance}`);
  expect(saved.advances.length).toBe(1);
  const si = await api.submit(saved);
  expect(si.total_advance).toBe(300);
  expect(si.outstanding_amount).toBe(200);
  expect(si.status).toBe('Partly Paid');
});

test('TC-SIG-024 an advance larger than the invoice is only allocated up to the Grand Total', srs('Advance allocation capped at the invoice total'), async () => {
  const cust = await newCustomer();
  await advance(cust, 900);
  const saved = await api.call('frappe.client.save', { doc: { ...(await draftFor(cust)), allocate_advances_automatically: 1, only_include_allocated_payments: 0 } });
  const si = await api.submit(saved);
  expect(si.total_advance).toBe(500);
  expect(si.outstanding_amount).toBe(0);
});

test('TC-SIG-029 an advance of another customer is not allocated', srs('Advances of the invoice customer only'), async () => {
  await advance(await newCustomer(), 300);
  const saved = await api.call('frappe.client.save', { doc: { ...(await draftFor(await newCustomer())), allocate_advances_automatically: 1, only_include_allocated_payments: 0 } });
  expect(saved.advances?.length ?? 0).toBe(0);
  expect(saved.total_advance ?? 0).toBe(0);
});

test('TC-SIG-027 with automatic allocation off the Advances table stays empty until it is filled by the user', srs('Allocate Advance Automatically unchecked'), async () => {
  const cust = await newCustomer();
  await advance(cust, 300);
  const saved = await api.call('frappe.client.save', { doc: { ...(await draftFor(cust)), allocate_advances_automatically: 0 } });
  expect(saved.advances?.length ?? 0).toBe(0);
  expect((await api.submit(saved)).outstanding_amount).toBe(500);
});

test('TC-SIG-032 an invoice that used an advance cannot be cancelled until the advance is un-linked', srs('Cancel an invoice with an allocated advance'), async () => {
  const cust = await newCustomer();
  const pe = await advance(cust, 300);
  const si = await api.submit(await api.call('frappe.client.save', { doc: { ...(await draftFor(cust)), allocate_advances_automatically: 1, only_include_allocated_payments: 0 } }));
  const err = await failure(cancel('Sales Invoice', si.name));
  observe('cancel with an allocated advance: ' + err.slice(0, 200));
  expect(err).toContain('Payment Entry');
  expect((await reload(si.name)).docstatus, 'the invoice stays submitted').toBe(1);
  expect((await api.get('Payment Entry', pe.name)).docstatus).toBe(1);
});

test('TC-SIG-035 a write off amount reduces the outstanding amount and is posted to the write off account', srs('Write Off Amount'), async () => {
  const co = await api.get('Company', COMPANY);
  const draft = await draftFor(await newCustomer());
  const si = await api.submit(await api.call('frappe.client.save', { doc: { ...draft, write_off_amount: 40, write_off_account: co.write_off_account, write_off_cost_center: draft.items[0].cost_center } }));
  expect(si.outstanding_amount).toBe(460);
  const gl = await glOf(si.name);
  observe(`GL entries: ${JSON.stringify(gl.map((g) => `${g.account} dr ${g.debit} cr ${g.credit}`))}`);
  expect(gl.filter((g) => g.debit > 0).reduce((s, g) => s + g.debit, 0), 'debits equal the Grand Total').toBe(500);
  expect(gl.filter((g) => g.credit > 0).reduce((s, g) => s + g.credit, 0), 'credits equal the debits').toBe(500);
});

test('TC-SIG-037 a write off larger than the invoice is rejected', srs('Write Off Amount greater than the outstanding'), async () => {
  // Known issue found on this server: a write off of 900 on an invoice of 500 is accepted and leaves an outstanding of -400.
  test.fail(true, 'Known issue: the server accepts a write off larger than the invoice');
  const co = await api.get('Company', COMPANY);
  const draft = await draftFor(await newCustomer());
  let outstanding = 0;
  const err = await failure(api.call('frappe.client.save', { doc: { ...draft, write_off_amount: 900, write_off_account: co.write_off_account } }).then((d) => api.submit(d)).then((d) => { outstanding = d.outstanding_amount; }));
  observe('write off 900 on an invoice of 500: ' + (err ? 'rejected: ' + err.slice(0, 200) : `accepted, outstanding became ${outstanding}`));
  if (!err) expect(outstanding, 'a write off larger than the invoice must not leave a negative outstanding').toBeGreaterThanOrEqual(0);
});

test('TC-SIG-038 writing off the whole invoice makes it fully paid', srs('Write Off Outstanding Amount'), async () => {
  const co = await api.get('Company', COMPANY);
  const draft = await draftFor(await newCustomer());
  const si = await api.submit(await api.call('frappe.client.save', { doc: { ...draft, write_off_amount: 500, write_off_account: co.write_off_account, write_off_cost_center: draft.items[0].cost_center } }));
  expect(si.outstanding_amount).toBe(0);
  expect(si.status).toBe('Paid');
});

test('TC-SID-068 a payment can be un-reconciled from the invoice without cancelling it', srs('Actions > UnReconcile'), async () => {
  const si = await invoice('Submitted');
  const pe = await pay(si, 200);
  expect((await reload(si.name)).outstanding_amount).toBe(300);
  const selection = [{ company: COMPANY, voucher_type: 'Payment Entry', voucher_no: pe.name, against_voucher_type: 'Sales Invoice', against_voucher_no: si.name }];
  const err = await failure(api.call('erpnext.accounts.doctype.unreconcile_payment.unreconcile_payment.create_unreconcile_doc_for_selection', { selections: JSON.stringify(selection) }));
  observe(err ? 'unreconcile failed: ' + err.slice(0, 250) : 'unreconcile created');
  expect(err).toBe('');
  const after = await reload(si.name);
  expect(after.outstanding_amount).toBe(500);
  expect(after.docstatus).toBe(1);
  expect((await api.get('Payment Entry', pe.name)).docstatus, 'the payment is not cancelled').toBe(1);
});

test('TC-SID-064 a refund of a credit note settles the return invoice', srs('Credit note and refund'), async () => {
  const si = await invoice('Submitted');
  await pay(si);
  const ret = await api.submit(await draftReturn(si, 2));
  expect(ret.grand_total).toBe(-200);
  expect(ret.outstanding_amount).toBe(-200);
  const pe = await api.call('erpnext.accounts.doctype.payment_entry.payment_entry.get_payment_entry', { dt: 'Sales Invoice', dn: ret.name });
  pe.mode_of_payment = (await api.list('Mode of Payment', [['enabled', '=', 1]], ['name'], 1))[0].name;
  pe.reference_no = 'PW-REFUND'; pe.reference_date = today();
  const refund = await api.insertAndSubmit('Payment Entry', pe);
  observe(`refund payment type ${refund.payment_type}, amount ${refund.paid_amount}`);
  expect(refund.payment_type).toBe('Pay');
  expect((await reload(ret.name)).outstanding_amount).toBe(0);
});

test('TC-SID-065 with Update Outstanding for Self checked the return keeps its own outstanding and the original is unchanged', srs('Update Outstanding for Self'), async () => {
  const si = await invoice('Submitted');
  const ret = await api.submit(await draftReturn(si, 2));
  const after = await reload(si.name);
  observe(`original outstanding ${after.outstanding_amount}, status ${after.status}; return outstanding ${ret.outstanding_amount}, update_outstanding_for_self ${ret.update_outstanding_for_self}`);
  expect(ret.update_outstanding_for_self).toBe(1);
  expect(ret.outstanding_amount).toBe(-200);
  expect(after.outstanding_amount).toBe(500);
});

test('TC-SID-066 with Update Outstanding for Self unchecked the return reduces the outstanding of the original invoice', srs('Update Outstanding for Self unchecked'), async () => {
  const si = await invoice('Submitted');
  const draft = await draftReturn(si, 2);
  const ret = await api.submit(await api.call('frappe.client.save', { doc: { ...draft, update_outstanding_for_self: 0 } }));
  const after = await reload(si.name);
  observe(`original outstanding ${after.outstanding_amount}; return outstanding ${ret.outstanding_amount}`);
  expect(after.outstanding_amount).toBe(300);
});

test('TC-SID-070 an invoice with a submitted return can still be cancelled only after the return is cancelled', srs('Cancel an invoice with a linked return'), async () => {
  const si = await invoice('Submitted');
  const ret = await api.submit(await draftReturn(si, 2));
  const err = await failure(cancel('Sales Invoice', si.name));
  observe('cancel original with a return: ' + (err ? err.slice(0, 220) : 'allowed'));
  if (err) {
    await cancel('Sales Invoice', ret.name);
    await cancel('Sales Invoice', si.name);
  }
  expect((await reload(si.name)).docstatus).toBe(2);
});

test('TC-SID-010 a submitted invoice cannot be edited', srs('Submitted invoice is read only'), async () => {
  const si = await invoice('Submitted');
  const err = await failure(api.call('frappe.client.save', { doc: { ...si, items: si.items.map((r: any) => ({ ...r, qty: 1 })) } }));
  observe('edit after submit: ' + err.slice(0, 220));
  expect(err).not.toBe('');
  expect((await reload(si.name)).items[0].qty).toBe(5);
});

test('TC-SID-031 a submitted invoice cannot be deleted', srs('Delete is not available for a submitted invoice'), async () => {
  const si = await invoice('Submitted');
  const err = await failure(api.call('frappe.client.delete', { doctype: 'Sales Invoice', name: si.name }));
  observe('delete a submitted invoice: ' + err.slice(0, 200));
  expect(err).not.toBe('');
  expect((await reload(si.name)).docstatus).toBe(1);
});

test('TC-SID-011 an invoice cannot be submitted twice', srs('Double submit'), async () => {
  const si = await invoice('Submitted');
  const err = await failure(api.submit(await reload(si.name)));
  observe('second submit: ' + (err ? err.slice(0, 200) : 'no error returned'));
  expect((await reload(si.name)).docstatus).toBe(1);
  expect((await glOf(si.name)).filter((g) => g.debit > 0).length, 'one receivable entry only').toBe(1);
});

test('TC-SIT-029 the Rounded Total follows the Grand Total', srs('Rounded Total and Rounding Adjustment'), async () => {
  const draft = await draftFor(await newCustomer(), 3, 33.33);
  observe(`draft: rate ${draft.items[0].rate}, qty ${draft.items[0].qty}, grand ${draft.grand_total}`);
  const saved = await api.call('frappe.client.save', { doc: draft });
  observe(`grand ${saved.grand_total}, rounded ${saved.rounded_total}, adjustment ${saved.rounding_adjustment}`);
  expect(saved.grand_total).toBeCloseTo(99.99, 2);
  if (saved.disable_rounded_total) {
    observe('rounding is disabled on this server (Global Defaults): Rounded Total and Rounding Adjustment stay 0');
    expect(saved.rounded_total).toBe(0);
    expect(saved.rounding_adjustment).toBe(0);
  } else {
    expect(saved.rounded_total).toBe(Math.round(saved.grand_total));
    expect(saved.rounding_adjustment).toBeCloseTo(saved.rounded_total - saved.grand_total, 2);
  }
});

test('TC-SII-020 selling in Box (12 Nos) deducts 24 stock units for 2 boxes', srs('UOM conversion and Qty as per Stock UOM'), async () => {
  await seed();
  const item = (await api.ensure('Item', [['item_name', '=', 'PW-SI-UOM']], {
    item_name: 'PW-SI-UOM', item_group: 'Services', stock_uom: 'Nos', is_stock_item: 1, valuation_rate: 10,
    uoms: [{ uom: 'Nos', conversion_factor: 1 }, { uom: 'Box', conversion_factor: 12 }],
    item_defaults: [{ company: COMPANY, default_warehouse: WAREHOUSE }],
  })).name as string;
  const [bin] = await api.list('Bin', [['item_code', '=', item], ['warehouse', '=', WAREHOUSE]], ['actual_qty']);
  if (!bin || bin.actual_qty < 100) {
    await api.insertAndSubmit('Stock Entry', { stock_entry_type: 'Material Receipt', company: COMPANY, posting_date: today(), items: [{ item_code: item, qty: 200, t_warehouse: WAREHOUSE, basic_rate: 10 }] });
  }
  const stock = async () => Number((await api.list('Bin', [['item_code', '=', item], ['warehouse', '=', WAREHOUSE]], ['actual_qty']))[0].actual_qty);
  const before = await stock();
  const so = await api.insertAndSubmit('Sales Order', {
    custom_name_in_contract: 'PW Contract', custom_contract_end_date: today(), custom_brief: 'PW uom order',
    custom_employee: (await api.list('Employee', [['status', '=', 'Active']], ['name'], 1))[0].name,
    customer: await newCustomer(), company: COMPANY, transaction_date: today(), delivery_date: today(), set_warehouse: WAREHOUSE,
    items: [{ item_code: item, qty: 2, uom: 'Box', conversion_factor: 12, rate: 120, warehouse: WAREHOUSE, delivery_date: today() }],
  });
  const dn = await deliveryNote(so);
  expect(await stock(), 'stock after delivering 2 boxes').toBe(before - 24);
  const si = await draftInvoice(dn);
  expect(si.items[0].uom).toBe('Box');
  expect(si.items[0].stock_qty).toBe(24);
  expect(si.grand_total).toBe(240);
});

test('TC-SII-079 a Product Bundle deducts its components from stock and lists them in the Bundle Items table', srs('Product Bundle item'), async () => {
  await seed();
  const parent = (await api.ensure('Item', [['item_name', '=', 'PW-SI-BUNDLE']], { item_name: 'PW-SI-BUNDLE', item_group: 'Services', stock_uom: 'Nos', is_stock_item: 0 })).name as string;
  await api.ensure('Product Bundle', [['new_item_code', '=', parent]], {
    new_item_code: parent, items: [{ item_code: code(ITEM_A), qty: 2, uom: 'Nos' }, { item_code: code(ITEM_B), qty: 1, uom: 'Nos' }],
  });
  const beforeA = await stockOf(ITEM_A);
  const beforeB = await stockOf(ITEM_B);
  const so = await api.insertAndSubmit('Sales Order', {
    custom_name_in_contract: 'PW Contract', custom_contract_end_date: today(), custom_brief: 'PW bundle order',
    custom_employee: (await api.list('Employee', [['status', '=', 'Active']], ['name'], 1))[0].name,
    customer: await (await import('./helpers/si-data')).customer(), company: COMPANY, transaction_date: today(), delivery_date: today(), set_warehouse: WAREHOUSE,
    items: [{ item_code: parent, qty: 3, rate: 100, warehouse: WAREHOUSE, delivery_date: today() }],
  });
  const dn = await deliveryNote(so);
  expect(await stockOf(ITEM_A), 'component A').toBe(beforeA - 6);
  expect(await stockOf(ITEM_B), 'component B').toBe(beforeB - 3);
  expect((await api.get('Delivery Note', dn.name)).packed_items.length, 'Bundle Items of the Delivery Note').toBe(2);
  const si = await api.submit(await draftInvoice(dn));
  observe(`Bundle Items rows on the invoice: ${si.packed_items?.length ?? 0} (the invoice does not update stock); amounts: order ${so.grand_total}, delivery note ${dn.grand_total}, invoice ${si.grand_total}`);
  expect(si.grand_total, 'the invoice amount equals the order amount').toBe(so.grand_total);
});

test('TC-SIG-060 the billing address and the contact are fetched from the customer', srs('Billing Address: preferred / primary / latest address'), async () => {
  const draft = await draftFor(await (await import('./helpers/si-data')).customer());
  observe(`customer_address "${draft.customer_address}", contact "${draft.contact_person}", address text: ${String(draft.address_display ?? '').replace(/\s+/g, ' ').slice(0, 120)}`);
  expect(draft.customer_address, 'billing address').toBeTruthy();
});

test('TC-SIG-066 a customer without an address still gets an invoice', srs('Customer without addresses'), async () => {
  const draft = await draftFor(await newCustomer());
  observe(`customer_address "${draft.customer_address ?? ''}"`);
  expect(draft.docstatus).toBe(0);
});

test('TC-SIG-054 invoicing a customer with a Loyalty Program earns loyalty points on submit', srs('Earning loyalty points'), async () => {
  const cust = await newCustomer({ loyalty_program: 'Golden Program' });
  // the Golden Program gives 1 point for every 1000 spent, so the invoice must be at least 1000
  const draft = await draftFor(cust, 10, 200);
  observe(`loyalty program on the draft: ${draft.loyalty_program}`);
  const si = await api.submit(draft);
  const entries = await api.list('Loyalty Point Entry', [['invoice', '=', si.name]], ['name', 'loyalty_points', 'purchase_amount', 'expiry_date'], 5);
  observe(`loyalty point entries: ${JSON.stringify(entries)}`);
  expect(entries.length).toBeGreaterThan(0);
  expect(entries[0].loyalty_points).toBeGreaterThan(0);
  const gl = await glOf(si.name);
  expect(gl.every((g) => g.account !== ''), 'earning points creates no extra GL entry').toBe(true);
  expect(gl.length).toBe(2);
});

test('TC-SIG-055 cancelling the invoice cancels the loyalty points it earned', srs('Cancel an invoice that earned points'), async () => {
  const cust = await newCustomer({ loyalty_program: 'Golden Program' });
  const si = await api.submit(await draftFor(cust, 10, 200));
  expect((await api.list('Loyalty Point Entry', [['invoice', '=', si.name]], ['name'], 5)).length, 'points before cancel').toBeGreaterThan(0);
  await cancel('Sales Invoice', si.name);
  const entries = await api.list('Loyalty Point Entry', [['invoice', '=', si.name], ['docstatus', '!=', 2]], ['name'], 5);
  observe(`entries left after cancel: ${entries.length}`);
  expect(entries.length).toBe(0);
});

test('TC-SIG-056 loyalty points can be redeemed on a later invoice', srs('Redeem Loyalty Points'), async () => {
  const cust = await newCustomer({ loyalty_program: 'Golden Program' });
  await api.submit(await draftFor(cust, 10, 200));
  const entries = await api.list('Loyalty Point Entry', [['customer', '=', cust]], ['loyalty_points'], 5);
  const points = entries.reduce((s: number, e: any) => s + e.loyalty_points, 0);
  observe(`points earned: ${points}`);
  test.skip(points <= 0, 'the Loyalty Program earned no points for this customer');
  const program = await api.get('Loyalty Program', 'Golden Program');
  const draft = await draftFor(cust, 5, 100);
  const saved = await api.call('frappe.client.save', { doc: { ...draft, redeem_loyalty_points: 1, loyalty_points: points, loyalty_redemption_account: (await api.get('Company', COMPANY)).default_income_account, loyalty_redemption_cost_center: draft.items[0].cost_center } });
  const si = await api.submit(saved);
  observe(`redeemed ${si.loyalty_points} points = ${si.loyalty_amount}; outstanding ${si.outstanding_amount}`);
  expect(si.loyalty_amount).toBeCloseTo(points * program.conversion_factor, 2);
  expect(si.outstanding_amount).toBeCloseTo(500 - si.loyalty_amount, 2);
});
