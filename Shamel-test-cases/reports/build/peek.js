const fs = require('fs'), vm = require('vm');
const L = fs.readFileSync(__dirname + '/../delivery-note-bug-report.html', 'utf8').split(/\r?\n/);
const i = L.findIndex((l) => /^const T = \{/.test(l));
const e = L.findIndex((l, k) => k > i && /^\};/.test(l));
const T = vm.runInNewContext('(' + L.slice(i, e + 1).join('\n').replace(/^const T = /, '').replace(/;\s*$/, '') + ')');
console.log(Object.keys(T.en).join(','));
console.log(JSON.stringify(T.en.rdBody).slice(0, 1600));
console.log(JSON.stringify(T.en.covHead || T.en.cov || ''));
console.log(JSON.stringify(T.ar.rdBody).slice(0, 900));
