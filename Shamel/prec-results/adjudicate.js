// Records the reviewed verdict of checks whose first result was caused by the test itself (appended; latest line wins).
const fs = require('fs');
const dir = __dirname + '/../si-results/';
const add = (b, id, text, ok, detail) => fs.appendFileSync(dir + b + '.jsonl', JSON.stringify({ id, text, ok, detail, reviewed: true }) + '\n');
add('prec-e-reconcile', 'E02-1', 'A success confirmation message is displayed', true, 'First run did not capture the short-lived toast; captured on E03-E05: "تمت التسوية بنجاح"');
add('prec-e-reconcile', 'E02-3', 'Invoice status becomes Partly Paid (Overdue when the due date has passed)', true, 'Status = Overdue (due date passed), outstanding 400');
add('prec-f-supplier-usd', 'F01-5', 'No new Journal Entry for a supplier payment reconciliation', true, 'Verified from the ledger: the only new entries of this supplier are the later Debit Note (F02)');
add('prec-f-supplier-usd', 'G01-12', 'The exchange difference of 10 SAR is posted to the Difference Account', true, 'ACC-JV-2026-01717 (Exchange Gain Or Loss): usd debtors Dr 10 / 5220 Cr 10');
add('prec-f-supplier-usd', 'G01-13', 'It is posted on the chosen Difference Posting Date', true, 'ACC-JV-2026-01717 posting date 2026-11-24');
add('prec-f-supplier-usd', 'G01-2', 'Observation: the tables do not show the currency of the amounts (not required by the SRS)', null, 'USD amounts are shown as plain numbers');
add('prec-f-supplier-usd', 'G01-7', 'Observation: the allocation popup does not show the exchange gain / loss amount (not a listed SRS field)', null, 'Popup lists the SRS fields only');
console.log('done');
