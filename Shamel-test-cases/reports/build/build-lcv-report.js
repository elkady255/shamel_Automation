// Builds landed-cost-voucher-bug-report.html from the Delivery Note report template (same layout, feedback box and EN/AR toggle).
const fs = require('fs'), path = require('path'), vm = require('vm');
const { bugs, bugAr } = require('./lcv-report-data.js');

const dir = path.join(__dirname, '..');
const lines = fs.readFileSync(path.join(dir, 'delivery-note-bug-report.html'), 'utf8').split(/\r?\n/);
const idx = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
const iScript = idx(/^<script>/), iT = idx(/^const T = \{/);
const iTend = idx(/^\};/, iT); if (iTend < 0) throw new Error('end of T not found');
const T = vm.runInNewContext('(' + lines.slice(iT, iTend + 1).join('\n').replace(/^const T = /, '').replace(/;\s*$/, '') + ')');

// Coverage: Add cases (TC-LCA) referenced by a test title in the two Add specs
const SHEET_ADD = 201;
const covered = new Set();
for (const f of ['srs-landed-cost-add.spec.ts', 'srs-landed-cost-add-api.spec.ts']) {
  const src = fs.readFileSync(path.join(dir, '..', '..', 'Shamel', f), 'utf8');
  for (const m of src.matchAll(/test\(\s*[`']((?:TC-LCA)[^'`]*)['`]/g)) {
    const rest = (m[1].slice(7).match(/^([0-9\/]+)/) || [])[1] || '';
    for (const n of rest.split('/')) if (n) covered.add(`TC-LCA-${n.padStart(3, '0')}`);
  }
}
for (const id of ['TC-LCA-138', 'TC-LCA-139', 'TC-LCA-140', 'TC-LCA-142', 'TC-LCA-151', 'TC-LCA-152']) covered.add(id);
const refd = covered.size, pct = Math.round((refd / SHEET_ADD) * 100);
console.log('Add cases', SHEET_ADD, 'referenced', refd);

const count = (f) => bugs.filter(f).length;
const crit = count((b) => b.sev === 'Critical'), high = count((b) => b.sev === 'High'), med = count((b) => b.sev === 'Medium'), low = count((b) => b.sev === 'Low');
const en = T.en, ar = T.ar;
en.title = 'Landed Cost Voucher Bug Report'; ar.title = 'تقرير مشاكل Landed Cost Voucher';
en.eyebrow = 'QA bug report · Inventory › Landed Cost Voucher (Add)'; ar.eyebrow = 'تقرير مشاكل الجودة · Inventory › Landed Cost Voucher (الإضافة)';
en.h1 = `Landed Cost Voucher (Add): ${bugs.length} defects, 1 stops the Add screen from saving`;
ar.h1 = `Landed Cost Voucher (الإضافة): ${bugs.length} مشكلة، ومشكلة واحدة بتمنع شاشة الإضافة من الحفظ`;
en.lede = `Functional run of the Add screen against the SRS on the test server: 32 checks in the browser and 15 against the create endpoint the screen uses. The Add screen cannot save a voucher: Get Items sends no request and the Items table cannot be typed in (LC-01). The server side does accept a voucher when it receives items, but it breaks several SRS rules on the way: it demands an Expense Account the SRS calls optional, and it stores amounts of 0 and -50 and descriptions of 2 and 600 characters. ${refd} of the ${SHEET_ADD} Add cases in the sheet are touched by a check.`;
ar.lede = `اختبار وظيفي لشاشة الإضافة بحسب الـ SRS على السيرفر التجريبي: 32 فحص في المتصفح و15 فحص على endpoint الإنشاء اللي الشاشة بتستخدمه. شاشة الإضافة مش بتقدر تحفظ voucher: Get Items مبيبعتش request وجدول Items مينفعش يتكتب فيه (LC-01). الـ backend بيقبل voucher لما يوصله أصناف، لكنه بيكسر كذا قاعدة في الـ SRS: بيطلب Expense Account والـ SRS بيقول اختياري، وبيخزن مبالغ 0 و-50 ووصف من حرفين و600 حرف. ${refd} من ${SHEET_ADD} حالة إضافة في الشيت اتلمست بفحص.`;
en.meta = [['Environment', 'test.hr.azzrk.com'], ['Browser', 'Chromium (desktop)'], ['User', 'Administrator'], ['Company', 'Ahmed Ebrahim CO.'], ['Language', 'English'], ['Run date', '2026-11-03'], ['Specs', 'Shamel/srs-landed-cost-add.spec.ts, srs-landed-cost-add-api.spec.ts'], ['Bug IDs', 'LC-01 to LC-12 (this module only)']];
ar.meta = [['البيئة', 'test.hr.azzrk.com'], ['المتصفح', 'Chromium (كمبيوتر)'], ['المستخدم', 'Administrator'], ['الشركة', 'Ahmed Ebrahim CO.'], ['اللغة', 'الإنجليزية'], ['تاريخ التشغيل', '2026-11-03'], ['ملفات الاختبار', 'Shamel/srs-landed-cost-add.spec.ts و srs-landed-cost-add-api.spec.ts'], ['أرقام المشاكل', 'LC-01 لـ LC-12 (الموديول ده بس)']];
en.covRows = [
  ['Header fields: screen layout, Series, Company, Posting Date, Distribute list', 6, 5, 1, 0],
  ['Vouchers table: Add Row, document types, Receipt Document filter, type change, delete, mandatory', 6, 3, 1, 2],
  ['Get Items and Receipt Items', 3, 0, 3, 0],
  ['Landed Cost table in the browser: Description lengths, Amount (letters, 0, negative, decimal, max), totals, delete', 14, 8, 6, 0],
  ['Save in the browser: no receipts, no landed cost rows, valid voucher', 3, 1, 2, 0],
  ['Create endpoint: valid voucher, Expense Account, empty tables, Company, Amount 0 / -50, Description 2 / 600 / empty, decimal, charges mismatch, duplicate receipt, Distribute Manually, Draft status', 15, 6, 9, 0],
];
ar.covRows = [
  ['حقول الهيدر: شكل الشاشة وSeries وCompany وPosting Date وقايمة Distribute', 6, 5, 1, 0],
  ['جدول Vouchers: Add Row وأنواع المستندات وفلتر Receipt Document وتغيير النوع والحذف والإجباري', 6, 3, 1, 2],
  ['Get Items وReceipt Items', 3, 0, 3, 0],
  ['جدول Landed Cost في المتصفح: أطوال Description وAmount (حروف وصفر وسالب وعشري والحد الأقصى) والإجماليات والحذف', 14, 8, 6, 0],
  ['Save في المتصفح: من غير استلام، ومن غير صفوف landed cost، وvoucher صالح', 3, 1, 2, 0],
  ['Endpoint الإنشاء: voucher صالح وExpense Account والجداول الفاضية وCompany وAmount 0 / -50 وDescription 2 / 600 / فاضي وعشري وعدم تطابق الـ charges وتكرار الاستلام وDistribute Manually وحالة Draft', 15, 6, 9, 0],
];
en.covNote = `${refd} of the ${SHEET_ADD} Add cases (${pct}%) are referenced by a check. Two checks timed out (Receipt Document list on the open screen, Receipt Document before a type), so they are counted as not completed, not as passed. Some checks that fail in the browser do so because of the same bug as another one (for example LC-01 hides everything after Get Items).`;
ar.covNote = `${refd} من ${SHEET_ADD} حالة إضافة (${pct}%) متغطّية بفحص. فحصين خلص وقتهم (قايمة Receipt Document والـ Receipt Document قبل اختيار النوع) فهم محسوبين «ماخلصوش» مش ناجحين. فحوصات بتفشل في المتصفح بنفس سبب مشكلة تانية (مثلًا LC-01 بيخفي كل اللي بعد Get Items).`;
en.ok = ['The Add screen opens without the old error dialog (get_supplier_options); all sections are shown and Amended From is hidden', 'Series lists the LCV series; Company search with no match shows nothing; Posting Date defaults to today; Distribute Charges Based On lists Qty, Amount and Distribute Manually', 'Receipt Document Type lists Purchase Receipt, Purchase Invoice and Stock Entry; Supplier and Grand Total fill from the receipt; changing the type clears the Receipt Document; a voucher row can be deleted', 'Landed Cost row: Description of 3, 500 and special characters is accepted; letters are rejected in Amount; negative amount does not pass the screen; Total Landed Cost follows the rows; a row can be deleted', 'Create endpoint: a valid voucher is stored as a Draft (MAT-LCV-2026-00003 with Qty, MAT-LCV-2026-00010 with Distribute Manually); an empty Description, a missing Company and no receipt document are refused'];
ar.ok = ['شاشة الإضافة بتفتح من غير نافذة الخطأ القديمة (get_supplier_options)؛ كل الأقسام ظاهرة وAmended From مخفي', 'Series بيعرض series الـ LCV؛ بحث Company من غير نتيجة مبيعرضش حاجة؛ Posting Date افتراضيه النهارده؛ وDistribute Charges Based On فيه Qty وAmount وDistribute Manually', 'Receipt Document Type فيه Purchase Receipt وPurchase Invoice وStock Entry؛ Supplier وGrand Total بيتملوا من الاستلام؛ تغيير النوع بيمسح الـ Receipt Document؛ وصف الـ voucher ينفع يتحذف', 'صف Landed Cost: Description من 3 و500 حرف وحروف خاصة بيتقبل؛ الحروف بتترفض في Amount؛ المبلغ السالب مبيعديش الشاشة؛ Total Landed Cost بيتابع الصفوف؛ والصف ينفع يتحذف', 'Endpoint الإنشاء: voucher صالح بيتخزن Draft (MAT-LCV-2026-00003 بـ Qty وMAT-LCV-2026-00010 بـ Distribute Manually)؛ Description فاضي وCompany ناقصة ومن غير مستند استلام بيترفضوا'];
en.no = ['Receipt Items after Get Items (read-only labels, Applicable Charges by mode, Edit Row popup, fixed asset items, delete rows): Get Items is dead (LC-01)', 'Distribute by Qty / Amount / manually results, rounding and recalculation (TC-LCA-186 to 191): need items in the table', 'Vendor Invoices table (TC-LCA-101 to 129): no eligible invoice was prepared', 'Receipt Document of type Purchase Invoice (Update Stock) and Stock Entry (Repack): no such documents were prepared', 'Table Settings popups, column width, hide / show / reorder / reset columns for the four tables (TC-LCA-050 to 061, 089 to 100, 118 to 129, 167 to 178)', 'Edit Row popups of the four tables', 'Posting Date earlier than the receipt, in a closed period, or empty; Account Currency and Exchange Rate; Submit after Save (TC-LCA-200, 201)', 'Receipt Document search with no match and Receipt Document list on the open screen (the checks timed out; run again after LC-01)'];
ar.no = ['Receipt Items بعد Get Items (الـ labels القراءة بس والـ Applicable Charges حسب الوضع ونافذة Edit Row وأصناف الأصول الثابتة وحذف الصفوف): Get Items ميت (LC-01)', 'نتايج التوزيع بالـ Qty / Amount / يدوي والتقريب وإعادة الحساب (TC-LCA-186 لـ 191): محتاجة أصناف في الجدول', 'جدول Vendor Invoices (TC-LCA-101 لـ 129): ماجهزناش فاتورة مناسبة', 'Receipt Document من نوع Purchase Invoice (Update Stock) وStock Entry (Repack): ماجهزناش مستندات من النوع ده', 'نوافذ Settings للجداول وعرض العمود وإخفاء / إظهار / ترتيب / Reset الأعمدة للجداول الأربعة (TC-LCA-050 لـ 061 و089 لـ 100 و118 لـ 129 و167 لـ 178)', 'نوافذ Edit Row للجداول الأربعة', 'Posting Date أقدم من الاستلام أو في فترة مقفولة أو فاضي؛ Account Currency وExchange Rate؛ وSubmit بعد Save (TC-LCA-200 و201)', 'بحث Receipt Document من غير نتيجة وقايمة Receipt Document على الشاشة المفتوحة (الفحصين خلص وقتهم؛ يتعادوا بعد إصلاح LC-01)'];
en.srsPrefix = 'Inventory SRS v1.0, Landed Cost Voucher'; ar.srsPrefix = 'Inventory SRS v1.0, Landed Cost Voucher';
en.rtBody = [['p', 'Round 1 (Add only) is finished. Retesting starts when the developers mark LC-01 as Fixed here (or tell the tester). LC-02 to LC-04 follow, since they decide what a stored voucher may contain.'],
  ['h', 'When a fix lands'], ['ol', ['Re-run srs-landed-cost-add.spec.ts and srs-landed-cost-add-api.spec.ts.', 'In the browser: add a voucher with Get Items, check the item row, the distribution by Qty, Amount and Distribute Manually, and Save.', 'Run the not-executed groups: Vendor Invoices, Purchase Invoice and Stock Entry receipts, table Settings, Edit Row popups and Submit.', 'Update each bug status in the feedback box below.']],
  ['h', 'Test data and records left in the system'], ['p', 'Purchase Receipt MAT-PRE-2026-00024 (supplier 1, item PW-PS-ITEM-A / STO-ITEM-2026-00074, qty 10, rate 5, total 50, Stores - E, Submitted). Valid Drafts kept on request: MAT-LCV-2026-00003 (Qty) and MAT-LCV-2026-00010 (Distribute Manually). The six vouchers saved with invalid data during the checks (MAT-LCV-2026-00004 to 00009) were deleted.']];
ar.rtBody = [['p', 'الجولة الأولى (الإضافة بس) خلصت. إعادة الاختبار تبدأ لما المطورين يعلّموا LC-01 كـ Fixed هنا (أو يبلّغوا الـ tester). وبعده LC-02 لـ LC-04 لأنهم بيحددوا إيه اللي ينفع يتخزن في الـ voucher.'],
  ['h', 'لما يوصل إصلاح'], ['ol', ['أعد تشغيل srs-landed-cost-add.spec.ts و srs-landed-cost-add-api.spec.ts.', 'في المتصفح: ضيف voucher بـ Get Items، وراجع صف الصنف والتوزيع بالـ Qty والـ Amount والـ Distribute Manually، واعمل Save.', 'شغّل المجموعات اللي ماتنفذتش: Vendor Invoices واستلامات Purchase Invoice وStock Entry وSettings الجداول ونوافذ Edit Row وSubmit.', 'حدّث حالة كل مشكلة في صندوق الـ feedback تحت.']],
  ['h', 'داتا الاختبار والسجلات اللي فضلت في النظام'], ['p', 'Purchase Receipt MAT-PRE-2026-00024 (المورد 1، الصنف PW-PS-ITEM-A / STO-ITEM-2026-00074، كمية 10، سعر 5، إجمالي 50، Stores - E، Submitted). الـ Drafts الصالحة اللي سبناها بطلبك: MAT-LCV-2026-00003 (Qty) وMAT-LCV-2026-00010 (Distribute Manually). الستة vouchers اللي اتحفظوا ببيانات غلط أثناء الفحوصات (MAT-LCV-2026-00004 لـ 00009) اتمسحوا.']];
en.obs = ['Receipt Document Type lists "Empty" in the SRS although it is mandatory.', 'The SRS names the list table "Stock Entries"; Get Items is described as "when checked" without saying what is checked.', 'The SRS limits Landed Cost Amount to a maximum of 100 characters while also saying "min 1, max 100" for the value: the intended limit (length or value) needs confirming.', 'The SRS does not define duplicates, rounding, negative amounts or empty tables for the voucher (see LC-06, LC-03, LC-07).', 'Cancel has no confirmation or link check in the SRS, and Delete has no status restriction.', 'The create payload sent by the browser carried supplier "" and grand_total 0 for the voucher row in one run, while the screen showed Supplier 1 and Grand Total 50. Not confirmed again; check that the values shown are the values sent.', 'The success message of create_landed_cost says "landed cost voucher item created successfully" (text copied from another module).'];
ar.obs = ['Receipt Document Type في الـ SRS فيه «Empty» مع إنه إجباري.', 'الـ SRS بيسمي جدول القايمة «Stock Entries»؛ وGet Items متوصف «when checked» من غير ما يقول إيه اللي بيتعلّم.', 'الـ SRS بيحدد Landed Cost Amount بحد أقصى 100 حرف وفي نفس الوقت «min 1, max 100» للقيمة: محتاج تأكيد الحد المقصود (طول ولا قيمة).', 'الـ SRS مبيعرّفش التكرار والتقريب والمبالغ السالبة والجداول الفاضية للـ voucher (شوف LC-06 وLC-03 وLC-07).', 'Cancel في الـ SRS من غير تأكيد ولا فحص روابط، وDelete من غير شرط على الحالة.', 'الـ payload اللي المتصفح بعته كان فيه supplier "" وgrand_total 0 لصف الـ voucher في تشغيل واحد، والشاشة كانت بتعرض Supplier 1 وGrand Total 50. ماتأكدش تاني؛ اتأكد إن القيم المعروضة هي المبعوتة.', 'رسالة نجاح create_landed_cost بتقول «landed cost voucher item created successfully» (نص منسوخ من موديول تاني).'];
en.rdBody = en.rdBody.map((s) => s.replace('from the Delivery Note sheet (TC-DNL, TC-DNA, TC-DNW, TC-DNG, TC-DNM, TC-DND)', 'from the Landed Cost Voucher sheet (TC-LCL, TC-LCA, TC-LCW, TC-LCD)'));
ar.rdBody = ar.rdBody.map((s) => s.replace('من شيت Delivery Note (TC-DNL وTC-DNA وTC-DNW وTC-DNG وTC-DNM وTC-DND)', 'من شيت Landed Cost Voucher (TC-LCL وTC-LCA وTC-LCW وTC-LCD)'));

const out = [];
out.push(...lines.slice(0, iScript + 1).map((l) => l.replace('<title>Delivery Note Bug Report</title>', '<title>Landed Cost Voucher Bug Report</title>')));
out.push('const SHOTS = {};');
out.push(`const STATUSES = ['New','In Progress','Fixed','Retest Passed','Reopened','Not a Bug','Cannot Reproduce','Deferred'];`);
out.push('const BUGS = ' + JSON.stringify(bugs, null, 1) + ';');
out.push('const BUG_AR = ' + JSON.stringify(bugAr, null, 1) + ';');
out.push('const SHOT_AR = {};');
out.push('const TC_AR = {};');
out.push('');
out.push('const T = ' + JSON.stringify(T) + ';');
out.push(...lines.slice(iTend + 1));
fs.writeFileSync(path.join(dir, 'landed-cost-voucher-bug-report.html'), out.join('\n'));
console.log('written', out.join('\n').length, 'bytes; bugs', bugs.length, 'critical', crit, 'high', high, 'medium', med, 'low', low);
