// Builds coupon-code-bug-report.html from the Delivery Note report template (same layout, feedback box and EN/AR toggle).
const fs = require('fs'), path = require('path'), vm = require('vm');
const { bugs, bugAr } = require('./cc-report-data.js');

const dir = path.join(__dirname, '..');
const lines = fs.readFileSync(path.join(dir, 'delivery-note-bug-report.html'), 'utf8').split(/\r?\n/);
const idx = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
const iScript = idx(/^<script>/), iT = idx(/^const T = \{/);
const iTend = idx(/^\};/, iT); if (iTend < 0) throw new Error('end of T not found');
const T = vm.runInNewContext('(' + lines.slice(iT, iTend + 1).join('\n').replace(/^const T = /, '').replace(/;\s*$/, '') + ')');

const SHEET = 222;
const refd = new Set(bugs.flatMap((b) => b.tc)).size;
const count = (f) => bugs.filter(f).length;
const high = count((b) => b.sev === 'High'), med = count((b) => b.sev === 'Medium'), low = count((b) => b.sev === 'Low');
const en = T.en, ar = T.ar;

en.title = 'Coupon Code Bug Report'; ar.title = 'تقرير مشاكل Coupon Code';
en.eyebrow = 'QA bug report · Selling › Coupon Code'; ar.eyebrow = 'تقرير مشاكل الجودة · Selling › Coupon Code';
en.h1 = `Coupon Code: ${bugs.length} differences from the SRS, none stops a coupon from being added`;
ar.h1 = `Coupon Code: ${bugs.length} فرق عن الـ SRS، ومفيش واحد بيمنع إضافة كوبون`;
en.lede = `Comparison of the Coupon Code screens (list, Add, Details) and of the server rules with the SRS, on the test server: 40 checks (31 matched, 9 differ; some parts are still untested, see Not executed). The screens follow the SRS in most places: list columns, field limits, Customer shown for Gift coupons only, the Pricing Rule list filtered to coupon-based rules, field messages and the Details actions. The differences are in three groups: fields the SRS calls optional that the screen makes mandatory (CC-04, CC-05); rules the screen enforces but the server does not (CC-01 to CC-03: a Valid To before Valid From, short and long names, a negative Maximum Use); and small gaps (CC-06 to CC-11, including a silent Save on an untouched form).`;
ar.lede = `مقارنة شاشات Coupon Code (القايمة والإضافة والتفاصيل) وقواعد السيرفر بالـ SRS على السيرفر التجريبي: 40 فحص (31 مطابق و9 مختلف؛ وفيه أجزاء لسه مااتفحصتش، شوف «ماتنفذش»). الشاشات ماشية على الـ SRS في أغلب الحاجات: أعمدة القايمة وحدود الحقول وظهور Customer لكوبون الهدية بس وفلتر قواعد التسعير على الكوبونات ورسايل الحقول وإجراءات التفاصيل. الفروق في تلات مجموعات: حقول الـ SRS بيقول عليها اختيارية والشاشة بتخليها إجبارية (CC-04 وCC-05)؛ وقواعد الشاشة بتطبّقها والسيرفر لأ (CC-01 لـ CC-03: Valid To قبل Valid From وأسماء قصيرة وطويلة وMaximum Use بالسالب)؛ وفجوات صغيرة (CC-06 لـ CC-11، منها Save صامت على فورم ماتلمسش).`;
en.meta = [['Environment', 'test.hr.azzrk.com'], ['Browser', 'Chromium (desktop)'], ['User', 'Administrator'], ['Company', 'Ahmed Ebrahim CO.'], ['Language', 'Arabic (the Coupon screens)'], ['Run date', '2026-11-15'], ['Method', 'Shamel/srs-coupon-code.spec.ts (40 checks, browser and server calls)'], ['Bug IDs', 'CC-01 to CC-11 (this module only)']];
ar.meta = [['البيئة', 'test.hr.azzrk.com'], ['المتصفح', 'Chromium (كمبيوتر)'], ['المستخدم', 'Administrator'], ['الشركة', 'Ahmed Ebrahim CO.'], ['اللغة', 'العربية (شاشات الكوبون)'], ['تاريخ التشغيل', '2026-11-15'], ['الطريقة', 'Shamel/srs-coupon-code.spec.ts (40 فحص، متصفح ونداءات سيرفر)'], ['أرقام المشاكل', 'CC-01 لـ CC-11 (الموديول ده بس)']];
en.covRows = [
  ['List screen: columns, Add button, Type and Valid From, ID link, action bar, Clear Assignment, Edit popup and its dynamic Value', 8, 7, 1, 0],
  ['Add screen: fields, Name / Code lengths and duplicates, Type, Customer, Pricing Rule, dates and the date order, Maximum Use, Used, Description, messages, Save', 23, 16, 7, 0],
  ['Details screen: data, Used, action buttons, Coupon Conditions, edit and save, name / code editing', 7, 6, 1, 0],
  ['Delete confirmation from the list and from the Details screen (Cancel only; nothing is deleted)', 2, 2, 0, 0],
];
ar.covRows = [
  ['شاشة القايمة: الأعمدة وزر الإضافة والنوع وValid From ورابط الـ ID وشريط الإجراءات وClear Assignment ونافذة Edit والقيمة الديناميكية', 8, 7, 1, 0],
  ['شاشة الإضافة: الحقول وأطوال الاسم والكود والتكرار والنوع وCustomer وPricing Rule والتواريخ وترتيبها وMaximum Use وUsed والوصف والرسايل وSave', 23, 16, 7, 0],
  ['شاشة التفاصيل: البيانات وUsed وأزرار الإجراءات وشروط الكوبون والتعديل والحفظ وتعديل الاسم / الكود', 7, 6, 1, 0],
  ['تأكيد الحذف من القايمة ومن التفاصيل (Cancel بس؛ مفيش حاجة اتمسحت)', 2, 2, 0, 0],
];
en.covNote = `${refd} of the ${SHEET} cases of the sheet are linked to a defect above. The spec Shamel/srs-coupon-code.spec.ts checks every statement of the three SRS use cases once and cites the sheet case IDs; it is not a run of all ${SHEET} cases (many are variations of the same field). Tests of known differences are marked as expected to fail and report unexpectedly passed when fixed. The server checks of CC-02 / CC-03 only show that the rules are missing on the server.`;
ar.covNote = `${refd} من ${SHEET} حالة في الشيت مربوطة بمشكلة فوق. وملف Shamel/srs-coupon-code.spec.ts بيفحص كل جملة في حالات استخدام الـ SRS التلاتة مرة واحدة وبيذكر أرقام حالات الشيت؛ ده مش تشغيل لكل الـ ${SHEET} حالة (كتير منهم تنويعات على نفس الحقل). اختبارات الفروق المعروفة معلّمة «متوقع تفشل» وبتبلّغ unexpectedly passed لما تتصلح. فحوصات السيرفر في CC-02 وCC-03 بتثبت إن القواعد ناقصة في السيرفر بس.`;
en.ok = ['List: columns Coupon Code ID, name, type and Valid From; Add Coupon Code button; row checkboxes; the action bar shows Select All, Edit, Export, Assign, Add Tags, Print and Delete', 'Add: Coupon Name and Coupon Code stop at 100 characters; their short-value messages appear ("يجب ألا يقل عن حرفين"); Description stops at 500 characters and asks for 3 characters; Used is read only', 'Coupon Type has Promotional and Gift; Customer shows only for Gift; the Pricing Rule list shows only coupon-based rules (1 of 3)', 'Maximum Use takes numbers only (letters are removed); Save on an empty form shows a message under every mandatory field', 'Details: Add / Edit Coupon Conditions, Assign, Tags, Attachments, Print, Share and Delete are all present; the server refuses a duplicate Coupon Code', 'The server accepts a coupon with no Valid From, Valid To or Maximum Use, which matches the SRS (CC-04 is about the screen)'];
ar.ok = ['القايمة: أعمدة Coupon Code ID والاسم والنوع وValid From؛ وزر Add Coupon Code؛ وcheckbox الصفوف؛ وشريط الإجراءات فيه تحديد الكل وتعديل وتصدير واسناد وإضافة وسوم وطباعة وحذف', 'الإضافة: اسم الكوبون والكود بيقفوا عند 100 حرف؛ ورسايل القيمة القصيرة بتظهر («يجب ألا يقل عن حرفين»)؛ والوصف بيقف عند 500 حرف وبيطلب 3 أحرف؛ وUsed للقراءة بس', 'Coupon Type فيه ترويجي وهدية؛ وCustomer بيظهر للهدية بس؛ وقايمة Pricing Rule بتعرض الكوبونات بس (1 من 3)', 'Maximum Use بياخد أرقام بس (الحروف بتتشال)؛ وSave على فورم فاضي بيظهر رسالة تحت كل حقل إجباري', 'التفاصيل: Add / Edit Coupon Conditions وAssign وTags وAttachments وPrint وShare وDelete كلهم موجودين؛ والسيرفر بيرفض Coupon Code مكرر', 'السيرفر بيقبل كوبون من غير Valid From وValid To وMaximum Use، وده مطابق للـ SRS (CC-04 عن الشاشة)'];
en.no = ['The warning for a coupon that is linked to other documents (it needs Yes on Delete for a coupon already used, which was not done on real data)', 'Using a coupon in a Sales Order (limit reached, dates, Gift customer) and how Used is counted: they belong to the Sales Order part', 'Print, Share, Attachments, Tags and Assign from the Details screen (the buttons are present; their popups were not opened)', 'Export, bulk edit and delete of several coupons from the list, search, filter, sort and paging'];
ar.no = ['التحذير لكوبون مرتبط بمستندات تانية (محتاج Yes على Delete لكوبون مستخدم فعلًا، وماعملتهاش على داتا حقيقية)', 'استخدام الكوبون في Sales Order (الحد الأقصى والتواريخ وعميل الهدية) وإزاي Used بيتحسب: دي تبع جزء Sales Order', 'الطباعة والمشاركة والمرفقات والوسوم والإسناد من شاشة التفاصيل (الأزرار موجودة؛ نوافذها ماتفتحتش)', 'التصدير والتعديل الجماعي وحذف أكتر من كوبون من القايمة والبحث والفلتر والترتيب والتقسيم لصفحات'];
en.srsPrefix = 'Selling SRS v1.0, Coupon Code'; ar.srsPrefix = 'Selling SRS v1.0, Coupon Code';
en.rtBody = [['p', 'Round 1 is finished. Retesting starts when the developers mark CC-01 and CC-04 as Fixed here (or tell the tester). CC-04 and CC-05 first need a decision on the SRS.'],
  ['h', 'When a fix lands'], ['ol', ['Repeat the case on the screen and through the create endpoint (the server rules CC-01 to CC-03 can only be seen there).', 'Run the cases listed under Not executed, starting with the delete confirmation.', 'Update each bug status in the feedback box below.']],
  ['h', 'Test data and records left in the system'], ['p', 'The server checks created 9 test coupons that were not deleted (nothing is deleted by the tests): PWA1651423, PWB1651423, PWF1651423, PWH1651423, PWK1651423, PWL1651423, a coupon named "x" and a coupon with a 101-character name. The older coupons (Inf Discount, Inf Discountss, كود الخصم, كود الخصم1) were only read.']];
ar.rtBody = [['p', 'الجولة الأولى خلصت. إعادة الاختبار تبدأ لما المطورين يعلّموا CC-01 وCC-04 كـ Fixed هنا (أو يبلّغوا الـ tester). وCC-04 وCC-05 محتاجين قرار على الـ SRS الأول.'],
  ['h', 'لما يوصل إصلاح'], ['ol', ['كرر الحالة في الشاشة وعن طريق endpoint الإنشاء (قواعد السيرفر CC-01 لـ CC-03 مبتبانش إلا من هناك).', 'نفّذ الحالات المكتوبة تحت «ماتنفذش» وابدأ بتأكيد الحذف.', 'حدّث حالة كل مشكلة في صندوق الـ feedback تحت.']],
  ['h', 'داتا الاختبار والسجلات اللي فضلت في النظام'], ['p', 'فحوصات السيرفر عملت 9 كوبونات تجريبية مامسحتش (الاختبارات مبتمسحش حاجة): PWA1651423 وPWB1651423 وPWF1651423 وPWH1651423 وPWK1651423 وPWL1651423 وكوبون اسمه "x" وكوبون باسم من 101 حرف. الكوبونات القديمة (Inf Discount وInf Discountss وكود الخصم وكود الخصم1) اتقرت بس.']];
en.obs = ['Name and Code are read only on the Details screen, while the SRS says the details can be viewed and edited. Confirm if this is intended.', 'The SRS says the minimum length of Maximum Use is 2 characters, which would not allow a coupon that can be used once (the screen saves 1).', 'The SRS calls the type "Gift type" in the list section and "Gift Card" in the Add section (see CC-10).', 'The SRS does not say what happens when a coupon is used after Valid To or at its Maximum Use; these rules belong to the Sales Order and were not checked here.'];
ar.obs = ['الاسم والكود للقراءة بس في شاشة التفاصيل، والـ SRS بيقول إن التفاصيل تتعرض وتتعدّل. أكدوا لو ده مقصود.', 'الـ SRS بيقول إن أقل طول لـ Maximum Use هو حرفين، وده مش هيسمح بكوبون يتستخدم مرة واحدة (الشاشة بتحفظ 1).', 'الـ SRS بيسمي النوع «Gift type» في قسم القايمة و«Gift Card» في قسم الإضافة (شوف CC-10).', 'الـ SRS مبيقولش إيه اللي يحصل لو الكوبون اتستخدم بعد Valid To أو عند Maximum Use؛ القواعد دي تبع Sales Order ومااتفحصتش هنا.'];
en.rdBody = en.rdBody.map((s) => s.replace('from the Delivery Note sheet (TC-DNL, TC-DNA, TC-DNW, TC-DNG, TC-DNM, TC-DND)', 'from the Coupon Code sheet (TC-CPL, TC-CPA, TC-CPD, TC-CPI)'));
ar.rdBody = ar.rdBody.map((s) => s.replace('من شيت Delivery Note (TC-DNL وTC-DNA وTC-DNW وTC-DNG وTC-DNM وTC-DND)', 'من شيت Coupon Code (TC-CPL وTC-CPA وTC-CPD وTC-CPI)'));

const out = [];
out.push(...lines.slice(0, iScript + 1).map((l) => l.replace('<title>Delivery Note Bug Report</title>', '<title>Coupon Code Bug Report</title>')));
out.push('const SHOTS = {};');
out.push(`const STATUSES = ['New','In Progress','Fixed','Retest Passed','Reopened','Not a Bug','Cannot Reproduce','Deferred'];`);
out.push('const BUGS = ' + JSON.stringify(bugs, null, 1) + ';');
out.push('const BUG_AR = ' + JSON.stringify(bugAr, null, 1) + ';');
out.push('const SHOT_AR = {};');
out.push('const TC_AR = {};');
out.push('');
out.push('const T = ' + JSON.stringify(T) + ';');
out.push(...lines.slice(iTend + 1));
fs.writeFileSync(path.join(dir, 'coupon-code-bug-report.html'), out.join('\n'));
console.log('written', out.join('\n').length, 'bytes; bugs', bugs.length, 'high', high, 'medium', med, 'low', low, 'cases linked', refd);
