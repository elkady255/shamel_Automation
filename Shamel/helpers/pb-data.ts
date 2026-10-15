import { api, type Doc } from './api';
import { COMPANY, WAREHOUSE, ITEM_A, ITEM_B, ITEM_C, code, seed } from './ps-data';

/**
 * Test data for the Product Bundle module, created through the Frappe API and never deleted.
 * A Product Bundle needs a parent item that is a bundle item (custom "Is Bundle Item"), has no stock and is not a fixed asset;
 * each parent can carry only one bundle, so every bundle gets its own parent item.
 */
export { ITEM_A, ITEM_B, ITEM_C, code, seed };
let counter = 0;
const stamp = () => `${Date.now().toString(36)}${counter++}`;

/** A new non-stock bundle parent item. Returns its generated item code and its display name. */
export async function parentItem(opts: { bundle?: boolean } = {}): Promise<{ code: string; name: string }> {
  const name = `PW-PB-PARENT-${stamp()}`.toUpperCase();
  const doc = await api.insert('Item', {
    item_name: name, item_group: 'Services', stock_uom: 'Nos', is_stock_item: 0, is_fixed_asset: 0,
    custom_is_bundle_item: opts.bundle === false ? 0 : 1,
    item_defaults: [{ company: COMPANY, default_warehouse: WAREHOUSE }],
  });
  return { code: doc.name as string, name };
}

export type BundleLine = { item: string; qty: number; description?: string };

/** A Product Bundle (Active unless disabled) on a fresh parent item. */
export async function bundle(opts: { lines?: BundleLine[]; description?: string; disabled?: boolean } = {}): Promise<Doc & { parentName: string }> {
  await seed();
  const parent = await parentItem();
  const lines = opts.lines ?? [{ item: ITEM_A, qty: 2 }, { item: ITEM_B, qty: 3 }];
  const doc = await api.insert('Product Bundle', {
    new_item_code: parent.code, description: opts.description ?? '', disabled: opts.disabled ? 1 : 0,
    items: lines.map((l) => ({ item_code: code(l.item), qty: l.qty, description: l.description ?? '' })),
  });
  return Object.assign(doc, { parentName: parent.name });
}
