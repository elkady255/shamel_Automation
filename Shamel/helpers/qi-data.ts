import { api, type Doc } from './api';
import { ITEM_A, code, seed, today } from './ps-data';
import { draftDN } from './dn-data';

/**
 * Quality Inspection test data, created through the Frappe API. Only records created here
 * (reference = a Delivery Note of customer "PW Packing Customer", parameters/groups named "PW ...") may ever be deleted.
 */
export type QIStatus = 'Draft' | 'Submitted' | 'Cancelled';

/** A reference Delivery Note (Draft) for the test customer; the QI points at it. */
export async function refDN(): Promise<Doc> { return draftDN([{ item: ITEM_A, qty: 5 }]); }

/** The test item must be flagged "Inspection Required" before a QI can reference it (our own item, safe to change). */
async function inspectable(): Promise<void> {
  await seed();
  const item = await api.get('Item', code(ITEM_A));
  for (const f of ['inspection_required_before_delivery', 'inspection_required_before_purchase']) {
    if (!item[f]) await api.call('frappe.client.set_value', { doctype: 'Item', name: item.name, fieldname: f, value: 1 });
  }
}

export async function draftQI(extra: Doc = {}): Promise<Doc> {
  await inspectable();
  const dn = await refDN();
  return api.insert('Quality Inspection', {
    report_date: today(), status: 'Accepted', inspection_type: 'Outgoing', reference_type: 'Delivery Note', reference_name: dn.name,
    item_code: code(ITEM_A), sample_size: 1, inspected_by: 'Administrator', ...extra,
  });
}

/** A QI in the wanted state: Draft, Submitted or Cancelled. */
export async function qi(status: QIStatus = 'Draft', extra: Doc = {}): Promise<Doc> {
  const d = await draftQI(extra);
  if (status === 'Draft') return d;
  await api.submit(d);
  if (status === 'Submitted') return api.get('Quality Inspection', d.name);
  await api.call('frappe.client.cancel', { doctype: 'Quality Inspection', name: d.name });
  return api.get('Quality Inspection', d.name);
}

export async function param(name: string, group?: string): Promise<Doc> {
  return api.ensure('Quality Inspection Parameter', [['name', '=', name]], { parameter: name, ...(group ? { parameter_group: group } : {}) });
}
export async function paramGroup(name: string): Promise<Doc> {
  return api.ensure('Quality Inspection Parameter Group', [['name', '=', name]], { group_name: name });
}
