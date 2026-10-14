import { test } from '@playwright/test';
import { draftDN, packingSlip } from './helpers/ps-data';

test('seed smoke', async () => {
  const dn = await draftDN();
  console.log('DN', dn.name, JSON.stringify(dn.items.map((i: any) => [i.name, i.item_code, i.qty])));
  const ps = await packingSlip(dn);
  console.log('PS', ps.name, ps.docstatus, JSON.stringify(ps.items.map((i: any) => [i.item_code, i.qty, i.net_weight, i.weight_uom])), ps.net_weight_pkg);
});
