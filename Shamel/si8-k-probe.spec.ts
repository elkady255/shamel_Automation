import { test } from '@playwright/test';
import { openNew, combo, value, tab, main, wait, recorder, toggle, snapshot, messages, closeModal } from './helpers/si-ui';
test.describe.configure({ timeout: 400_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('k-probe');
test('K1 currencies in sequence', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  for (const cur of ['USD', 'EUR', 'EGP', 'KWD', 'JOD', 'USD']) {
    await combo(page, 'العملة', cur); await wait(page, 3500);
    const m = await messages(page);
    rec.note('K-2-' + cur, 'currency ' + cur, `${await value(page, 'العملة')} rate=${await value(page, 'سعر الصرف')} plist-rate=${await value(page, 'سعر صرف قائمة الأسعار')} msgs=${JSON.stringify(m)}`);
    await closeModal(page);
  }
});
test('K2 loyalty fields', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await tab(page, 'المعلومات العامة');
  const before = Object.keys(await snapshot(page));
  await toggle(page, 'استرداد نقاط الولاء'); await wait(page, 1500);
  const after = await snapshot(page);
  rec.note('K-4', 'fields added by Redeem Loyalty Points', JSON.stringify(Object.keys(after).filter((k) => !before.includes(k))));
  rec.note('K-5', 'loyalty labels now', JSON.stringify(Object.entries(after).filter(([k]) => /ولاء|استرداد/.test(k))));
});
