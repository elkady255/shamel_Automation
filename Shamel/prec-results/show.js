// Prints the latest result per check id of the given batches.
const fs = require('fs');
for (const b of process.argv.slice(2)) {
  const m = new Map();
  for (const l of fs.readFileSync(__dirname + '/../si-results/' + b + '.jsonl', 'utf8').trim().split('\n')) { const j = JSON.parse(l); m.set(j.id, j); }
  for (const j of m.values()) console.log(j.id, j.ok === null ? 'NOTE' : j.ok ? 'PASS' : 'FAIL', j.ok === true ? '' : j.detail.replace(/\s+/g, ' ').slice(0, 350));
}
