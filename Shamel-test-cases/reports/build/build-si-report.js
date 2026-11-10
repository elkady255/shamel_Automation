// Builds sales-invoice-bug-report.html from the Delivery Note report template (same layout, feedback box and EN/AR toggle).
const fs = require('fs'), path = require('path'), vm = require('vm');
const { bugs, bugAr } = require('./si-report-data.js');

const dir = path.join(__dirname, '..');
const lines = fs.readFileSync(path.join(dir, 'delivery-note-bug-report.html'), 'utf8').split(/\r?\n/);
const idx = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
const iScript = idx(/^<script>/), iT = idx(/^const T = \{/);
const iTend = idx(/^\};/, iT); if (iTend < 0) throw new Error('end of T not found');
const T = vm.runInNewContext('(' + lines.slice(iT, iTend + 1).join('\n').replace(/^const T = /, '').replace(/;\s*$/, '') + ')');

// Coverage: sheet cases referenced by a test title in the four Sales Invoice specs
const SHEET = 546;
const covered = new Set();
let checks = 0;
for (const f of ['business', 'payments', 'ui', 'tabs', 'remaining']) {
  const src = fs.readFileSync(path.join(dir, '..', '..', 'Shamel', `srs-sales-invoice-${f}.spec.ts`), 'utf8');
  for (const m of src.matchAll(/^test\(\s*'(TC-SI[A-Z]-[0-9\/]+)/gm)) {
    checks++;
    const [, pre, nums] = m[1].match(/^(TC-SI[A-Z])-([0-9\/]+)/);
    for (const n of nums.split('/')) if (n) covered.add(`${pre}-${n.padStart(3, '0')}`);
  }
}
const refd = covered.size, pct = Math.round((refd / SHEET) * 100);
console.log('checks', checks, 'cases referenced', refd);

const count = (f) => bugs.filter(f).length;
const high = count((b) => b.sev === 'High'), med = count((b) => b.sev === 'Medium'), low = count((b) => b.sev === 'Low');
const en = T.en, ar = T.ar;
en.title = 'Sales Invoice Bug Report'; ar.title = 'تقرير مشاكل Sales Invoice';
en.eyebrow = 'QA bug report · Selling › Sales Invoice'; ar.eyebrow = 'تقرير مشاكل الجودة · Selling › Sales Invoice';
en.h1 = `Sales Invoice: ${bugs.length} defects, the main flow works but 2 parts of the Add screen are blocked`;
ar.h1 = `Sales Invoice: ${bugs.length} مشكلة، الدورة الأساسية شغالة لكن جزئين من شاشة الإضافة واقفين`;
en.lede = `Functional run against the SRS on the test server: ${checks} automated checks (${checks - 7} passed, 7 found defects). The main flow works: Sales Order → Delivery Note → Sales Invoice → Payment Entry, the General Ledger entries, taxes, discount, payment terms, partial payments, Overdue, cancel and amend, partial billing, returns and refunds, advances, loyalty points, UOM and Product Bundle. The defects are in the rules around it: a Write Off larger than the invoice is accepted (SI-01), an invoice can be created without a Sales Order (SI-02), the Get Items From menu on the Add screen never opens (SI-10), Hold / Close are missing (SI-11), and two configuration items stop invoices from being created (price list in AFN, tax template VAT - E). ${refd} of the ${SHEET} cases in the sheet are touched by a check.`;
ar.lede = `اختبار وظيفي بحسب الـ SRS على السيرفر التجريبي: ${checks} فحص آلي (${checks - 7} نجحوا و7 كشفوا مشاكل). الدورة الأساسية شغالة: Sales Order ← Delivery Note ← Sales Invoice ← Payment Entry، وقيود الـ General Ledger، والضرايب، والخصم، وشروط الدفع، والدفع الجزئي، وOverdue، والإلغاء والـ Amend، والفوترة الجزئية، والمرتجعات والاسترداد، والدفعات المقدمة، ونقاط الولاء، والـ UOM والـ Product Bundle. المشاكل في القواعد حواليها: Write Off أكبر من الفاتورة بيتقبل (SI-01)، وفاتورة تتعمل من غير Sales Order (SI-02)، وقايمة Get Items From في شاشة الإضافة مبتفتحش (SI-10)، وHold / Close مش موجودين (SI-11)، وإعدادين بيمنعوا إنشاء الفواتير (price list بالـ AFN وقالب الضريبة VAT - E). ${refd} من ${SHEET} حالة في الشيت اتلمست بفحص.`;
en.meta = [['Environment', 'test.hr.azzrk.com'], ['Browser', 'Chromium (desktop)'], ['User', 'Administrator'], ['Company', 'Ahmed Ebrahim CO. (SAR)'], ['Language', 'English'], ['Run date', '2026-11-10'], ['Specs', 'Shamel/srs-sales-invoice-business, -payments, -ui, -tabs, -remaining .spec.ts'], ['Bug IDs', 'SI-01 to SI-11 (this module only)']];
ar.meta = [['البيئة', 'test.hr.azzrk.com'], ['المتصفح', 'Chromium (كمبيوتر)'], ['المستخدم', 'Administrator'], ['الشركة', 'Ahmed Ebrahim CO. (SAR)'], ['اللغة', 'الإنجليزية'], ['تاريخ التشغيل', '2026-11-10'], ['ملفات الاختبار', 'Shamel/srs-sales-invoice-business و-payments و-ui و-tabs و-remaining .spec.ts'], ['أرقام المشاكل', 'SI-01 لـ SI-11 (الموديول ده بس)']];
en.covRows = [
  ['Business flow: chain, General Ledger, taxes, discount, payment terms, partial payment, Overdue, cancel, amend, partial billing, returns, exchange rate, due date, direct invoice', 19, 18, 1, 0],
  ['Payments and rules: advances, write off, unreconcile, credit note and refund, Update Outstanding for Self, edit / delete / double submit, rounding, UOM, Product Bundle, addresses, loyalty', 24, 23, 1, 0],
  ['List and Details screens: columns and statuses, Add screen, mandatory fields, currency, submitted and draft actions, Create menu, cancel from the screen', 10, 10, 0, 0],
  ['Tabs and screens: Details, General Information and More Information fields, Add Item table, list bulk actions, View Accounting Ledger, Linked Records', 13, 11, 2, 0],
  ['Remaining checks: Hold / Close, Customer Purchase Order limits, discount over 100, negative write off, Get Items From menu', 6, 3, 3, 0],
];
ar.covRows = [
  ['الدورة الأساسية: السلسلة وGeneral Ledger والضرايب والخصم وشروط الدفع والدفع الجزئي وOverdue والإلغاء والـ Amend والفوترة الجزئية والمرتجعات وسعر الصرف وتاريخ الاستحقاق والفاتورة المباشرة', 19, 18, 1, 0],
  ['المدفوعات والقواعد: الدفعات المقدمة وWrite Off وUnreconcile وCredit Note والاسترداد وUpdate Outstanding for Self والتعديل / الحذف / Submit مرتين والتقريب والـ UOM والـ Product Bundle والعناوين والولاء', 24, 23, 1, 0],
  ['شاشات القايمة والتفاصيل: الأعمدة والحالات وشاشة الإضافة والحقول الإجبارية والعملة وأزرار الفاتورة Submitted وDraft وقايمة Create والإلغاء من الشاشة', 10, 10, 0, 0],
  ['التابات والشاشات: حقول Details وGeneral Information وMore Information وجدول Add Item وإجراءات القايمة الجماعية وView Accounting Ledger وLinked Records', 13, 11, 2, 0],
  ['فحوصات إضافية: Hold / Close وحدود Customer Purchase Order والخصم فوق 100 والـ write off بالسالب وقايمة Get Items From', 6, 3, 3, 0],
];
en.covNote = `${refd} of the ${SHEET} cases (${pct}%) are referenced by a check; the rest are not automated yet (see Not executed: field-by-field limits and messages, permissions, closed periods, serial / batch, popups with data). SI-05 and SI-06 were found while preparing test data, not by a failing check.`;
ar.covNote = `${refd} من ${SHEET} حالة (${pct}%) متغطّية بفحص؛ والباقي لسه مش آلي (شوف «ماتنفذش»: حدود ورسائل كل حقل والصلاحيات والفترات المقفولة والـ serial / batch والنوافذ بداتا). SI-05 وSI-06 اتلاقوا وأنا بجهّز داتا الاختبار مش من فحص فاشل.`;
en.ok = ['Sales Order → Delivery Note → Sales Invoice → Payment Entry works; the General Ledger posts the receivable and the income on Submit; Cancel reverses it and reopens the Sales Order', 'Taxes from a template (15%, included in the rate), additional discount on Net Total and a Payment Terms Template add up to the Grand Total; Unpaid, Partly Paid and Overdue are set correctly', 'Over-billing, over-payment, over-return and a third return after a full return are refused; Amend of a cancelled invoice works; an invoice with a payment, an advance or a return cannot be cancelled before they are', 'Advances are allocated automatically (capped at the total, own customer only); write off of 40 and 500 is posted to the write off account; credit note, refund and Update Outstanding for Self 1 / 0 behave as the SRS describes', 'UOM conversion (2 Box = 24 Nos stock units), Product Bundle items, addresses, loyalty points earned, cancelled with the invoice and redeemed on the next one', 'List columns and statuses, the Add screen (tabs, Get Items From, Add Item, Save), submitted / draft / cancelled screens and buttons, Create menu, View Accounting Ledger (opens the General Ledger of the invoice) and Linked Records'];
ar.ok = ['Sales Order ← Delivery Note ← Sales Invoice ← Payment Entry شغال؛ والـ General Ledger بيرحّل المدين والإيراد عند Submit؛ والإلغاء بيعكسه ويفتح الـ Sales Order تاني', 'ضرايب القالب (15% مشمولة في السعر) والخصم الإضافي على Net Total وقالب شروط الدفع بيطلعوا Grand Total صح؛ وحالات Unpaid وPartly Paid وOverdue صح', 'الفوترة الزيادة والدفع الزيادة والمرتجع الزيادة والمرتجع التالت بعد مرتجع كامل بيترفضوا؛ وAmend لفاتورة ملغية شغال؛ وفاتورة عليها دفعة أو advance أو مرتجع مينفعش تتلغي قبلهم', 'الـ Advances بتتوزع تلقائي (بحد الإجمالي ولنفس العميل بس)؛ وWrite off بـ 40 و500 بيترحّل لحساب الـ write off؛ والـ credit note والاسترداد وUpdate Outstanding for Self (1 و0) زي ما الـ SRS بيوصف', 'تحويل الـ UOM (2 Box = 24 وحدة مخزون) وأصناف الـ Product Bundle والعناوين ونقاط الولاء (تتكسب وتتلغي مع الفاتورة وتتستبدل في الفاتورة اللي بعدها)', 'أعمدة القايمة وحالاتها وشاشة الإضافة (التابات وGet Items From وAdd Item وSave) وشاشات وأزرار Submitted وDraft وCancelled وقايمة Create وView Accounting Ledger (بيفتح General Ledger للفاتورة) وLinked Records'];
en.no = ['The permissions of roles (needs a second user with limited rights; not prepared)', 'Selling with serial numbers and batches: the Sales Order for item shamel123 (serial + batch, 20 in Stores - E) was rejected by a server validation whose message could not be read through the API, so the sale was not tested', 'Posting in a closed accounting period and frozen stock dates (needs a change to system settings)', 'Executing Delete from the list (test data is never deleted; only the presence of the button is checked, SI-03)', 'The Quotation, Sales Order and Delivery Note selection popups of Get Items From (the menu does not open, SI-10)', 'Field-by-field length, format and message checks of single inputs (the repeated cases of the sheet)', 'Creating an invoice from the Add screen with real input (the screen needs the Sales Order chain; only the screen itself was checked)'];
ar.no = ['صلاحيات الأدوار (محتاجة مستخدم تاني بصلاحيات محدودة؛ ماجهزناش)', 'البيع بـ serial numbers وbatches: الـ Sales Order للصنف shamel123 (serial + batch، 20 في Stores - E) اترفض بـ validation من السيرفر ورسالته مقدرتش أقراها من الـ API، فالبيع ماتختبرش', 'الترحيل في فترة محاسبية مقفولة وتواريخ تجميد المخزون (محتاج تغيير في إعدادات النظام)', 'تنفيذ Delete من القايمة (داتا الاختبار مبتتمسحش؛ اتفحص وجود الزرار بس، SI-03)', 'نوافذ اختيار Quotation وSales Order وDelivery Note في Get Items From (القايمة مبتفتحش، SI-10)', 'فحوصات الأطوال والصيغ والرسائل لكل حقل لوحده (الحالات المتكررة في الشيت)', 'إنشاء فاتورة من شاشة الإضافة بإدخال حقيقي (الشاشة محتاجة سلسلة Sales Order؛ اتفحصت الشاشة نفسها بس)'];
en.srsPrefix = 'Selling SRS v1.0, Sales Invoice'; ar.srsPrefix = 'Selling SRS v1.0, Sales Invoice';
en.rtBody = [['p', 'Round 1 is finished. Retesting starts when the developers mark SI-01 and SI-02 as Fixed here (or tell the tester); SI-05 and SI-06 are settings that can be corrected at any time.'],
  ['h', 'When a fix lands'], ['ol', ['Re-run the four specs: npx playwright test Shamel/srs-sales-invoice-business.spec.ts Shamel/srs-sales-invoice-payments.spec.ts Shamel/srs-sales-invoice-ui.spec.ts Shamel/srs-sales-invoice-tabs.spec.ts Shamel/srs-sales-invoice-remaining.spec.ts --project=chromium --headed --workers=1 (about 25 minutes). The tests of SI-01, SI-03, SI-04, SI-09, SI-10 and SI-11 are marked as known issues and will report "unexpectedly passed" once the fix is in; then the mark is removed.', 'Run by hand what is listed under Not executed.', 'Update each bug status in the feedback box below.']],
  ['h', 'Test data and records left in the system'], ['p', 'Every invoice, order, delivery note and payment was created and submitted or cancelled by the test; nothing was deleted. The test customers are named "PW SI Customer ..." and "PW Packing Customer". Items PW-SI-UOM and PW-SI-BUNDLE were added for the UOM and Product Bundle checks. The Administrator language was changed to English for the run.']];
ar.rtBody = [['p', 'الجولة الأولى خلصت. إعادة الاختبار تبدأ لما المطورين يعلّموا SI-01 وSI-02 كـ Fixed هنا (أو يبلّغوا الـ tester)؛ أما SI-05 وSI-06 فهم إعدادات ينفع تتصلّح في أي وقت.'],
  ['h', 'لما يوصل إصلاح'], ['ol', ['أعد تشغيل الأربع ملفات: npx playwright test Shamel/srs-sales-invoice-business.spec.ts Shamel/srs-sales-invoice-payments.spec.ts Shamel/srs-sales-invoice-ui.spec.ts Shamel/srs-sales-invoice-tabs.spec.ts Shamel/srs-sales-invoice-remaining.spec.ts --project=chromium --headed --workers=1 (حوالي 25 دقيقة). اختبارات SI-01 وSI-03 وSI-04 وSI-09 وSI-10 وSI-11 معلّمة كـ known issues وهتبلّغ «unexpectedly passed» بعد الإصلاح؛ وساعتها بنشيل العلامة.', 'نفّذ يدويًا اللي مكتوب تحت «ماتنفذش».', 'حدّث حالة كل مشكلة في صندوق الـ feedback تحت.']],
  ['h', 'داتا الاختبار والسجلات اللي فضلت في النظام'], ['p', 'كل الفواتير والأوامر وإذونات التسليم والمدفوعات اتعملت واتعمل لها Submit أو اتلغت من الاختبار؛ ومفيش حاجة اتمسحت. عملاء الاختبار اسمهم «PW SI Customer ...» و«PW Packing Customer». الصنفين PW-SI-UOM وPW-SI-BUNDLE اتضافوا لفحوصات الـ UOM والـ Product Bundle. لغة Administrator اتغيّرت للإنجليزي أثناء التشغيل.']];
en.obs = ['The rounded total is disabled on the server (Rounded Total and Rounding Adjustment stay 0 for a grand total of 99.99); the SRS describes rounding, so confirm whether it should be on.', 'An invoice that used an advance cannot be cancelled until the advance is un-linked (LinkExistsError). The SRS does not say this; confirm that it is wanted.', 'The invoice total of a Product Bundle item differs from the order and the delivery note total; the packed items appear in the Bundle Items table. Confirm how the bundle should be priced.', 'The SRS does not say what happens when Payment Due Date is earlier than Posting Date (see SI-08) or whether a direct invoice is allowed (see SI-02).', 'The SRS names the status "Credit Note Issued" and the credit statuses; check the wording against the list (see SI-07).'];
ar.obs = ['الـ Rounded Total معطّل على السيرفر (Rounded Total وRounding Adjustment بيفضلوا 0 لـ grand total = 99.99)؛ والـ SRS بيوصف التقريب، فأكدوا هل المفروض يكون شغال.', 'فاتورة استخدمت advance مينفعش تتلغي لحد ما الـ advance يتفك (LinkExistsError). الـ SRS مبيقولش كده؛ أكدوا إنه مطلوب.', 'إجمالي فاتورة صنف Product Bundle مختلف عن إجمالي الأمر وإذن التسليم؛ والأصناف المجمّعة بتظهر في جدول Bundle Items. أكدوا إزاي المفروض الـ bundle يتسعّر.', 'الـ SRS مبيقولش إيه اللي يحصل لما Payment Due Date قبل Posting Date (شوف SI-08) ولا هل الفاتورة المباشرة مسموحة (شوف SI-02).', 'الـ SRS بيسمي الحالة «Credit Note Issued» وحالات الـ credit؛ راجعوا الصياغة مع القايمة (شوف SI-07).'];
en.rdBody = en.rdBody.map((s) => s.replace('from the Delivery Note sheet (TC-DNL, TC-DNA, TC-DNW, TC-DNG, TC-DNM, TC-DND)', 'from the Sales Invoice sheet (TC-SIL, TC-SIH, TC-SIG, TC-SIT, TC-SII, TC-SIM, TC-SIF, TC-SID, TC-SIB)'));
ar.rdBody = ar.rdBody.map((s) => s.replace('من شيت Delivery Note (TC-DNL وTC-DNA وTC-DNW وTC-DNG وTC-DNM وTC-DND)', 'من شيت Sales Invoice (TC-SIL وTC-SIH وTC-SIG وTC-SIT وTC-SII وTC-SIM وTC-SIF وTC-SID وTC-SIB)'));

const out = [];
out.push(...lines.slice(0, iScript + 1).map((l) => l.replace('<title>Delivery Note Bug Report</title>', '<title>Sales Invoice Bug Report</title>')));
out.push('const SHOTS = {};');
out.push(`const STATUSES = ['New','In Progress','Fixed','Retest Passed','Reopened','Not a Bug','Cannot Reproduce','Deferred'];`);
out.push('const BUGS = ' + JSON.stringify(bugs, null, 1) + ';');
out.push('const BUG_AR = ' + JSON.stringify(bugAr, null, 1) + ';');
out.push('const SHOT_AR = {};');
out.push('const TC_AR = {};');
out.push('');
out.push('const T = ' + JSON.stringify(T) + ';');
out.push(...lines.slice(iTend + 1));
fs.writeFileSync(path.join(dir, 'sales-invoice-bug-report.html'), out.join('\n'));
console.log('written', out.join('\n').length, 'bytes; bugs', bugs.length, 'high', high, 'medium', med, 'low', low);
