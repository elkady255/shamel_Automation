// Appends the executed test cases (latest result per check id) to the SRS markdown file.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const groups = [
  ['prec-a-header', 'A - Header fields', 'prec-a-header.spec.ts'], ['prec-b-filters', 'B - Filters', 'prec-b-filters.spec.ts'],
  ['prec-c-tables', 'C - Unreconciled Entries tables', 'prec-c-tables.spec.ts'], ['prec-d-alloc', 'D - Allocate and Allocation table', 'prec-d-alloc.spec.ts'],
  ['prec-e-reconcile', 'E - Reconcile (customer)', 'prec-e-reconcile.spec.ts'], ['prec-f-supplier-usd', 'F/G - Supplier and foreign currency', 'prec-f-supplier-usd.spec.ts'],
];
const bugOf = (id) => /^C03-3/.test(id) ? 'PREC-03' : /^C09-[12]-[45]/.test(id) ? 'PREC-04' : /^C09-[12]-2/.test(id) ? 'PREC-05' : /^B08-5/.test(id) ? 'PREC-01' : /^B08-7/.test(id) ? 'PREC-02' : '';
const esc = (s) => String(s).replace(/\|/g, '/').replace(/\s+/g, ' ');
const MARK = '<!-- TEST CASES -->';
const md = path.join(root, 'Shamel-test-cases', 'SRS-modules', 'SRS-Accounting-Payment-Reconciliation.md');
let out = ''; const total = { pass: 0, fail: 0 };
for (const [b, title, spec] of groups) {
  const m = new Map();
  for (const l of fs.readFileSync(path.join(root, 'Shamel', 'si-results', b + '.jsonl'), 'utf8').trim().split('\n')) { const j = JSON.parse(l); if (j.ok !== null) m.set(j.id, j); else if (j.reviewed) m.delete(j.id); }
  const rows = [...m.values()].sort((a, c) => a.id.localeCompare(c.id, undefined, { numeric: true }));
  const p = rows.filter((r) => r.ok).length; total.pass += p; total.fail += rows.length - p;
  out += `\n## ${title} (${rows.length} cases: ${p} passed, ${rows.length - p} failed) - \`Shamel/${spec}\`\n\n| ID | Test case (expected behaviour) | Result | Bug |\n|---|---|---|---|\n`;
  for (const r of rows) out += `| PREC-TC-${r.id} | ${esc(r.text)} | ${r.ok ? 'Passed' : 'FAILED'} | ${r.ok ? '' : bugOf(r.id)} |\n`;
}
const head = `${MARK}\n\n# Test cases - Payment Reconciliation (executed 2026-11-26 on test.hr.azzrk.com)\n\n> ${total.pass + total.fail} cases: ${total.pass} passed, ${total.fail} failed. Red item (the Invoice Type value list) is excluded on purpose. Foreign currency observations (not SRS requirements): the tables show no currency, and the popup shows no gain / loss amount.\n`;
fs.writeFileSync(md, fs.readFileSync(md, 'utf8').split(MARK)[0].replace(/## Existing material for the same module[\s\S]*?(?=## Hidden)/, '').trimEnd() + '\n\n' + head + out);
console.log(JSON.stringify(total));
