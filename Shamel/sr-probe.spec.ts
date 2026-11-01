import { test } from '@playwright/test';
import { StockReconciliationPage } from './pages/StockReconciliationPage';
import { sr, removeSR } from './helpers/sr-data';
import { writeFileSync } from 'fs';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

test('traceback of the Save on Details', async ({ page }) => {
  test.setTimeout(120_000);
  const p = new StockReconciliationPage(page);
  const d = await sr('Draft');
  let req = '', res = '';
  page.on('response', async (r) => { if (r.url().includes('update_stock_reconciliation')) { req = r.request().postData() ?? ''; try { res = await r.text(); } catch { /* ignore */ } } });
  await p.gotoDetails(d.name);
  await p.qtyInput().fill('77'); await p.save().click(); await page.waitForTimeout(4000);
  const sp = 'C:/Users/user/AppData/Local/Temp/claude/c--Playwright-Automation/2eb2d311-448a-41b8-ab8f-172e9678b463/scratchpad';
  writeFileSync(`${sp}/sr-update-req.txt`, decodeURIComponent(req.replace(/\+/g, ' ')));
  writeFileSync(`${sp}/sr-update-res.txt`, res);
  const tb = JSON.parse(res).exc as string;
  console.log('TRACEBACK FRAMES:'); (tb.match(/File \\?"[^"\\]+\\?", line \d+, in \w+/g) ?? []).slice(-8).forEach((f) => console.log('   ', f));
  console.log('LAST LINES:', clean(tb.replace(/\\n/g, ' ')).slice(-420));
  console.log('REQUEST PAYLOAD:', clean(decodeURIComponent(req.replace(/\+/g, ' '))).slice(0, 1500));
  await removeSR(d.name).catch(() => undefined);
});
