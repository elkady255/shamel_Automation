// Verify: does the page stop responding after "Add Row" in the taxes / deductions tables?
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';

test.use({ viewport: { width: 1400, height: 1800 } });
const alive = async (p: Page) => Promise.race([p.evaluate(() => document.querySelectorAll('table tbody tr').length).then((n) => `alive rows=${n}`), new Promise<string>((r) => setTimeout(() => r('NO ANSWER in 15s'), 15_000))]);

for (const [name, steps] of [['taxes', [1]], ['refs-then-taxes', [0, 1]]] as const) {
  test(`add row ${name}`, async ({ page }) => {
    test.setTimeout(150_000);
    page.on('response', async (r) => {
      if (!r.url().includes('recalculate_payment_entry') || r.status() < 400) return;
      const sent = decodeURIComponent((r.request().postData() ?? '').replace(/[+]/g, ' '));
      const body = await r.text().catch(() => '');
      console.log(name, 'HTTP', r.status(), 'SENT', sent.slice(sent.indexOf('"references"'), sent.indexOf('"deductions"')).slice(0, 600));
      console.log(name, 'EXC', body.slice(-700).split(String.fromCharCode(10)).join(' '));
    });
    await u.open(page, u.LIST + '/' + d.data().probeDraft);
    console.log(name, 'before', await alive(page));
    for (const i of steps) {
      const add = u.main(page).locator('button:visible').filter({ hasText: /^\s*إضافة صف\s*$/ }).nth(i);
      await Promise.race([add.click({ timeout: 8000 }).catch((e) => console.log(name, 'click error', e.message.slice(0, 200))), new Promise((r) => setTimeout(r, 12_000))]);
      await new Promise((r) => setTimeout(r, 6000));
      console.log(name, `after add on table ${i}`, await alive(page));
    }
  });
}
