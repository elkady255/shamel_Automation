// Probe: every request, console error and screen change after Get Outstanding Invoices (nothing saved).
import { test } from '@playwright/test';
import * as j from './helpers/je-ui';
const { u, f } = j;
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 15_000 });
test('get outstanding', async ({ page }) => {
  test.setTimeout(240_000);
  await j.open(page, 'قيد شطب'); await j.tab(page, j.MORE);
  for (const based of ['', 'الذمم المدينة', 'الذمم الدائنة']) {
    if (based) await f.option(page, 'شطب بناءً على', based).catch((e) => console.log('opt', e.message.slice(0, 80)));
    const log: string[] = [];
    const a = (r: any) => { if (!/socket\.io|assets/.test(r.url())) log.push(`${r.method()} ${decodeURIComponent(r.url()).slice(30, 220)}`); }; // eslint-disable-line @typescript-eslint/no-explicit-any
    const c = (m: any) => { if (/error|warn/.test(m.type())) log.push('CONSOLE ' + m.text().slice(0, 250)); }; // eslint-disable-line @typescript-eslint/no-explicit-any
    const e = (x: Error) => log.push('PAGEERROR ' + x.message.slice(0, 250));
    page.on('request', a); page.on('console', c); page.on('pageerror', e);
    const b = u.main(page).getByRole('button', { name: 'جلب الفواتير المستحقة' });
    console.log('BASED', based || '(default)', 'buttons', await b.count(), 'enabled', await b.first().isEnabled());
    await b.first().click(); await page.waitForTimeout(9000);
    page.off('request', a); page.off('console', c); page.off('pageerror', e);
    console.log('LOG', log.join('\n') || 'nothing sent');
    console.log('SCREEN', (await j.bodyText(page)).slice(-500), '| dialog', await j.dialogText(page));
  }
  await page.screenshot({ path: 'Shamel/je-results/p7-writeoff.png', fullPage: true });
});
