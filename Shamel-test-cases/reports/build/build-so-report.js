// Builds sales-order-srs-comparison-report.html from the Delivery Note report template (same layout, feedback box and EN/AR toggle).
const fs = require('fs'), path = require('path'), vm = require('vm');
const { bugs, bugAr } = require('./so-report-data.js');

const dir = path.join(__dirname, '..');
const lines = fs.readFileSync(path.join(dir, 'delivery-note-bug-report.html'), 'utf8').split(/\r?\n/);
const idx = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
const iScript = idx(/^<script>/), iT = idx(/^const T = \{/);
const iTend = idx(/^\};/, iT); if (iTend < 0) throw new Error('end of T not found');
const T = vm.runInNewContext('(' + lines.slice(iT, iTend + 1).join('\n').replace(/^const T = /, '').replace(/;\s*$/, '') + ')');

const SHEET = 0;
const refd = new Set(bugs.flatMap((b) => b.tc)).size;
const count = (f) => bugs.filter(f).length;
const high = count((b) => b.sev === 'High'), med = count((b) => b.sev === 'Medium'), low = count((b) => b.sev === 'Low');
const en = T.en, ar = T.ar;

require('./so-text.js')(en, ar, bugs);

const out = [];
out.push(...lines.slice(0, iScript + 1).map((l) => l.replace('<title>Delivery Note Bug Report</title>', '<title>Sales Order Comparison Report</title>')));
out.push('const SHOTS = {};');
out.push(`const STATUSES = ['New','In Progress','Fixed','Retest Passed','Reopened','Not a Bug','Cannot Reproduce','Deferred'];`);
out.push('const BUGS = ' + JSON.stringify(bugs, null, 1) + ';');
out.push('const BUG_AR = ' + JSON.stringify(bugAr, null, 1) + ';');
out.push('const SHOT_AR = {};');
out.push('const TC_AR = {};');
out.push('');
out.push('const T = ' + JSON.stringify(T) + ';');
out.push(...lines.slice(iTend + 1));
fs.writeFileSync(path.join(dir, 'sales-order-srs-comparison-report.html'), out.join('\n'));
console.log('written', out.join('\n').length, 'bytes; bugs', bugs.length, 'high', high, 'medium', med, 'low', low, 'cases linked', refd);



