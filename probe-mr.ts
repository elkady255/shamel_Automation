import dotenv from 'dotenv';
import { api } from './Shamel/helpers/api';

dotenv.config({ quiet: true });

const base = {
  company: 'Ahmed Ebrahim CO.', material_request_type: 'Purchase', naming_series: 'MAT-MR-.YYYY.-',
  transaction_date: '2026-10-07', schedule_date: '2026-10-22',
};
const row = { item_code: 'STO-ITEM-2026-00072', qty: 50, uom: 'Unit', schedule_date: '2026-10-29' };

(async () => {
  const cases: Record<string, unknown> = {
    'group WH of other company (مخزن القاضى - AIG)': 'مخزن القاضى - AIG',
    'group WH of same company (مخزن جديد 1 - E)': 'مخزن جديد 1 - E',
    'label only, no suffix (مخزن جديد 1)': 'مخزن جديد 1',
    'empty warehouse': null,
  };
  for (const [label, wh] of Object.entries(cases)) {
    try {
      const d = await api.insert('Material Request', { ...base, items: [{ ...row, warehouse: wh }] });
      console.log(`${label}: CREATED draft ${d.name}`);
    } catch (e) {
      const s = String(e);
      const m = s.match(/"exception":\s*"([^"]+)/) ?? s.match(/_server_messages.{0,300}/);
      console.log(`${label}: REJECTED -> ${(m?.[1] ?? m?.[0] ?? s).slice(0, 300)}`);
    }
  }
})().catch((e) => console.log('ERROR', String(e).slice(0, 600)));

