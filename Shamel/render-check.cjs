const { chromium } = require('@playwright/test');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('file:///C:/Playwright_Automation/Shamel-test-cases/reports/landed-cost-voucher-bug-report.html'); await p.waitForTimeout(1500);
  const t = await p.locator('body').innerText();
  console.log('ERRORS', JSON.stringify(errs)); console.log('has LC-01', t.includes('LC-01'), 'LC-12', t.includes('LC-12'), 'len', t.length);
  console.log(t.slice(0, 700));
  await b.close();
})();
