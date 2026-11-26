// Probe: add a Receive payment through the screen and look at everything that appears (saves a draft of mine).
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';

test.use({ viewport: { width: 1400, height: 1800 } });
const dump = async (p: Page, tag: string) => {
  console.log(`== ${tag} ${p.url()}`);
  console.log('FIELDS', JSON.stringify(await u.fields(p)));
  console.log('SECTIONS', JSON.stringify(await u.sections(p)));
  console.log('TABLES', JSON.stringify(await u.tablesInfo(p)));
  console.log('BUTTONS', JSON.stringify((await u.main(p).locator('button:visible').evaluateAll((els: any[]) => els.map((e) => (e.innerText.trim() || e.title || '').replace(/\s+/g, ' ') + (e.disabled ? '[disabled]' : '')))).filter(Boolean)));
  await p.screenshot({ path: `Shamel/pe-results/${tag}.png`, fullPage: true });
};

test('receive walk', async ({ page }) => {
  test.setTimeout(280_000);
  page.on('response', async (r) => {
    const q = r.request();
    if (!/\/api\/method\/shamel/.test(r.url()) || /notification|get_options/.test(r.url())) return;
    console.log('API', r.status(), q.method(), decodeURIComponent(r.url().split('/api/method/')[1]).slice(0, 160), decodeURIComponent((q.postData() ?? '').replace(/\+/g, ' ')).slice(0, 900), '=>', (await r.text().catch(() => '')).slice(0, 700));
  });
  await u.open(page);
  await u.choose(page, 'طريقة الدفع', 'BANK ALRAJHY');
  await u.choose(page, 'الطرف', 'QA-PE Cust'); await u.wait(page, 3000);
  console.log('PAIDTO options', JSON.stringify(await u.options(page, 'الحساب المدفوع إليه')));
  await u.choose(page, 'الحساب المدفوع إليه', '122101'); await u.wait(page, 3000);
  await dump(page, 'p3-a-accounts');
  await u.type(page, 'المبلغ المدفوع', '1500').catch((e) => console.log('no paid field', e.message.slice(0, 100)));
  await dump(page, 'p3-b-amount');
  const s = await u.save(page);
  console.log('SAVE', s.status, s.url, 'name', s.name, 'msg', s.msg, 'errors', JSON.stringify(s.errors));
  console.log('SENT', s.sent.slice(0, 2000)); console.log('BODY', s.body.slice(0, 1200));
  await u.closeModals(page); await u.wait(page, 3000);
  await dump(page, 'p3-c-saved');
});
