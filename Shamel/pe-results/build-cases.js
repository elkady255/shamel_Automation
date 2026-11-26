// Appends the executed test cases (latest result per check id) to the Payment Entry SRS markdown file.
// bugs.json: { "<check id>": "PE-01", ... }
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const groups = [
  ['pe-a-form', 'A - Add screen: fields and rules', 'pe-a-form.spec.ts'], ['pe-b-e2e', 'B - End to end, every payment and party type', 'pe-b-e2e.spec.ts'],
  ['pe-c-advanced', 'C - References, taxes, deductions and write off', 'pe-c-advanced.spec.ts'], ['pe-d-tds-fx', 'D - Tax withholding and foreign currency', 'pe-d-tds-fx.spec.ts'],
  ['pe-e-lifecycle', 'E - List, details and document life cycle', 'pe-e-lifecycle.spec.ts'],
];
const bugsFile = path.join(__dirname, 'bugs.json');
const bugs = fs.existsSync(bugsFile) ? JSON.parse(fs.readFileSync(bugsFile, 'utf8')) : {};
const esc = (s) => String(s).replace(/\|/g, '/').replace(/\s+/g, ' ');
const MARK = '<!-- TEST CASES -->';
const md = path.join(root, 'Shamel-test-cases', 'SRS-modules', 'SRS-Accounting-Payment-Entry.md');
let out = ''; const total = { pass: 0, fail: 0 }; const areas = []; const unmapped = [];
for (const [b, title, spec] of groups) {
  const file = path.join(root, 'Shamel', 'si-results', b + '.jsonl');
  if (!fs.existsSync(file)) continue;
  const m = new Map();
  for (const l of fs.readFileSync(file, 'utf8').trim().split('\n')) { const j = JSON.parse(l); if (j.ok !== null) m.set(j.id, j); else if (j.reviewed) m.delete(j.id); }
  const rows = [...m.values()].sort((a, c) => a.id.localeCompare(c.id, undefined, { numeric: true }));
  const p = rows.filter((r) => r.ok).length; total.pass += p; total.fail += rows.length - p; areas.push([b, rows.length, p]);
  out += `\n## ${title} (${rows.length} cases: ${p} passed, ${rows.length - p} failed) - \`Shamel/${spec}\`\n\n| ID | Test case (expected behaviour) | Result | Bug |\n|---|---|---|---|\n`;
  for (const r of rows) { if (!r.ok && !bugs[r.id]) unmapped.push(r.id); out += `| PE-TC-${r.id} | ${esc(r.text)} | ${r.ok ? 'Passed' : 'FAILED'} | ${r.ok ? '' : bugs[r.id] || ''} |\n`; }
}
const head = `${MARK}\n\n# Test cases - Payment Entry (executed 2026-11-26 on test.hr.azzrk.com)\n\n> ${total.pass + total.fail} cases: ${total.pass} passed, ${total.fail} failed. Red (hidden) items are tested as "must not be shown".\n`;
fs.writeFileSync(md, fs.readFileSync(md, 'utf8').split(MARK)[0].trimEnd() + '\n\n' + head + out);
console.log(JSON.stringify({ ...total, areas, unmapped }));
