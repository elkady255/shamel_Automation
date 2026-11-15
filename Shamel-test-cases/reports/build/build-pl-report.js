// Builds price-list-bug-report.html from the Delivery Note report template (same layout, feedback box and EN/AR toggle).
const fs = require('fs'), path = require('path'), vm = require('vm');
const { bugs, bugAr } = require('./pl-report-data.js');

const dir = path.join(__dirname, '..');
const lines = fs.readFileSync(path.join(dir, 'delivery-note-bug-report.html'), 'utf8').split(/\r?\n/);
const idx = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
const iScript = idx(/^<script>/), iT = idx(/^const T = \{/);
const iTend = idx(/^\};/, iT); if (iTend < 0) throw new Error('end of T not found');
const T = vm.runInNewContext('(' + lines.slice(iT, iTend + 1).join('\n').replace(/^const T = /, '').replace(/;\s*$/, '') + ')');

const SHEET = 159;
const refd = new Set(bugs.flatMap((b) => b.tc)).size;
const count = (f) => bugs.filter(f).length;
const high = count((b) => b.sev === 'High'), med = count((b) => b.sev === 'Medium'), low = count((b) => b.sev === 'Low');
const en = T.en, ar = T.ar;

en.title = 'Price List Bug Report'; ar.title = 'تقرير مشاكل Price List';
en.eyebrow = 'QA bug report · Selling › Price List'; ar.eyebrow = 'تقرير مشاكل الجودة · Selling › Price List';
en.h1 = `Price List: ${bugs.length} differences from the SRS, the main flow works`;
ar.h1 = `Price List: ${bugs.length} فرق عن الـ SRS، والدورة الأساسية شغالة`;
en.lede = `Comparison of the Price List screens (list, Add, Details) and of the server rules with the SRS, on the test server: 24 checks (14 matched, 10 differ). The list columns and statuses, the Enabled default, the Name and Currency rules on the screen, the Buying / Selling rule and the Details actions follow the SRS. The differences: rules the screen enforces but the server does not (PL-01, PL-02), the Applicable for Countries table without row selection (PL-03), a silent Save on an untouched form (PL-04), and small gaps (PL-05 to PL-09).`;
ar.lede = `مقارنة شاشات Price List (القايمة والإضافة والتفاصيل) وقواعد السيرفر بالـ SRS على السيرفر التجريبي: 24 فحص (14 مطابق و10 مختلف). أعمدة القايمة وحالاتها وقيمة Enabled الافتراضية وقواعد الاسم والعملة في الشاشة وقاعدة الشراء / البيع وإجراءات التفاصيل ماشية على الـ SRS. الفروق: قواعد الشاشة بتطبّقها والسيرفر لأ (PL-01 وPL-02)، وجدول الدول من غير تحديد صفوف (PL-03)، وSave صامت على فورم ماتلمسش (PL-04)، وفجوات صغيرة (PL-05 لـ PL-09).`;
en.meta = [['Environment', 'test.hr.azzrk.com'], ['Browser', 'Chromium (desktop)'], ['User', 'Administrator'], ['Company', 'Ahmed Ebrahim CO.'], ['Language', 'Arabic (the Price List screens)'], ['Run date', '2026-11-15'], ['Method', 'Playwright browser checks and calls to the create endpoint (not saved as a spec yet)'], ['Bug IDs', 'PL-01 to PL-09 (this module only)']];
ar.meta = [['البيئة', 'test.hr.azzrk.com'], ['المتصفح', 'Chromium (كمبيوتر)'], ['المستخدم', 'Administrator'], ['الشركة', 'Ahmed Ebrahim CO.'], ['اللغة', 'العربية (شاشات Price List)'], ['تاريخ التشغيل', '2026-11-15'], ['الطريقة', 'فحوصات متصفح بـ Playwright ونداءات على endpoint الإنشاء (لسه مش محفوظة كملف اختبار)'], ['أرقام المشاكل', 'PL-01 لـ PL-09 (الموديول ده بس)']];
en.covRows = [
  ['List screen: columns, Status values, action bar', 3, 2, 1, 0],
  ['Add screen: fields, Enabled default, Name limits and messages, Currency, Buying / Selling rule, Save on an untouched form, Add / Edit Prices', 10, 8, 2, 0],
  ['Applicable for Countries table: Add Row, row selection, Delete row, Edit Row, Setting popup', 2, 0, 2, 0],
  ['Details screen: fields, fixed actions, Add / Edit Prices', 3, 2, 1, 0],
  ['Server rules (create endpoint): Name lengths, Currency, duplicate name, neither Buying nor Selling, name trimming', 6, 2, 4, 0],
];
ar.covRows = [
  ['شاشة القايمة: الأعمدة وقيم الحالة وشريط الإجراءات', 3, 2, 1, 0],
  ['شاشة الإضافة: الحقول وقيمة Enabled الافتراضية وحدود الاسم ورسايله وCurrency وقاعدة الشراء / البيع وSave على فورم ماتلمسش وAdd / Edit Prices', 10, 8, 2, 0],
  ['جدول Applicable for Countries: Add Row وتحديد الصفوف وDelete row وEdit Row ونافذة Setting', 2, 0, 2, 0],
  ['شاشة التفاصيل: الحقول والإجراءات الثابتة وAdd / Edit Prices', 3, 2, 1, 0],
  ['قواعد السيرفر (endpoint الإنشاء): أطوال الاسم وCurrency والاسم المكرر ولا شراء ولا بيع وقص مسافات الاسم', 6, 2, 4, 0],
];
en.covNote = `${refd} of the ${SHEET} cases of the sheet are linked to a defect above. The checks were run through browser scripts and requests, not from the saved case list, so this is not a run of the whole sheet.`;
ar.covNote = `${refd} من ${SHEET} حالة في الشيت مربوطة بمشكلة فوق. الفحوصات اتعملت بسكريبتات متصفح وطلبات للسيرفر، مش من قايمة الحالات المحفوظة، فده مش تشغيل للشيت كله.`;
en.ok = ['List: columns ID, Status, Currency, Buying and Selling; Add button; the action bar shows Select All, Edit, Export, Assign, Add Tags, Print and Delete', 'Add: Enabled is on by default; Price List Name stops at 100 characters and shows the minimum length message; Currency is a searchable dropdown ("SA" finds SAR) and is mandatory', 'Save with neither Buying nor Selling is refused on the screen and on the server (the SRS does not define this)', 'Add Row adds a Country dropdown row; a duplicate price list name is refused; the name is saved without the spaces around it', 'Details: Assign, Tags, Attachments, Print, Share, Delete and Add / Edit Prices are present and the saved data is displayed'];
ar.ok = ['القايمة: أعمدة ID والحالة والعملة والشراء والبيع؛ وزر الإضافة؛ وشريط الإجراءات فيه تحديد الكل وتعديل وتصدير واسناد وإضافة وسوم وطباعة وحذف', 'الإضافة: Enabled شغال افتراضيًا؛ واسم الـ price list بيقف عند 100 حرف وبيظهر رسالة الحد الأدنى؛ وCurrency dropdown قابل للبحث («SA» بتلاقي SAR) وإجباري', 'Save من غير شراء ولا بيع بيترفض في الشاشة وفي السيرفر (الـ SRS مبيعرّفش ده)', 'Add Row بيضيف صف dropdown دولة؛ واسم price list مكرر بيترفض؛ والاسم بيتحفظ من غير المسافات اللي حواليه', 'التفاصيل: Assign وTags وAttachments وPrint وShare وDelete وAdd / Edit Prices موجودين والبيانات المحفوظة معروضة'];
en.no = ['Saving a price list from the screen with valid data, and editing / saving on the Details screen', 'Delete confirmation and the warning for a price list linked to other documents (Delete was not clicked on real price lists)', 'The effect of Enabled and of Selling / Buying on the price list dropdown of a Sales Order, and Price Not UOM Dependent on the item price', 'The Edit popup of the list, Export, Assign, Print, tags and sharing', 'The Setting popup rules: column width, reorder by drag and drop, Add / Remove columns', 'Duplicate countries in the table: the server accepts them and the SRS does not define it'];
ar.no = ['حفظ price list من الشاشة ببيانات صحيحة، والتعديل والحفظ في شاشة التفاصيل', 'تأكيد الحذف والتحذير لـ price list مرتبطة بمستندات تانية (ماضغطتش Delete على price lists حقيقية)', 'تأثير Enabled وSelling / Buying على قايمة الـ price list في Sales Order، وPrice Not UOM Dependent على سعر الصنف', 'نافذة Edit في القايمة والتصدير والإسناد والطباعة والوسوم والمشاركة', 'قواعد نافذة Setting: عرض العمود والسحب والإفلات وAdd / Remove columns', 'تكرار الدولة في الجدول: السيرفر بيقبله والـ SRS مبيعرّفوش'];
en.srsPrefix = 'Selling SRS v1.0, Price List'; ar.srsPrefix = 'Selling SRS v1.0, Price List';
en.rtBody = [['p', 'Round 1 is finished. Retesting starts when the developers mark PL-03 and PL-04 as Fixed here (or tell the tester).'],
  ['h', 'When a fix lands'], ['ol', ['Repeat the case on the screen and through the create endpoint (PL-01 and PL-02 can only be seen there).', 'Run the cases listed under Not executed.', 'Update each bug status in the feedback box below.']],
  ['h', 'Test data and records left in the system'], ['p', 'The server checks created 5 test price lists that were not deleted (nothing is deleted by the tests): "x", one with a 101-character name, "PW PL C 5694629", "PW PL D 5694629" (two Saudi Arabia rows) and "PW PL E 5694629". The existing price lists were only read.']];
ar.rtBody = [['p', 'الجولة الأولى خلصت. إعادة الاختبار تبدأ لما المطورين يعلّموا PL-03 وPL-04 كـ Fixed هنا (أو يبلّغوا الـ tester).'],
  ['h', 'لما يوصل إصلاح'], ['ol', ['كرر الحالة في الشاشة وعن طريق endpoint الإنشاء (PL-01 وPL-02 مبتبانوش إلا من هناك).', 'نفّذ الحالات المكتوبة تحت «ماتنفذش».', 'حدّث حالة كل مشكلة في صندوق الـ feedback تحت.']],
  ['h', 'داتا الاختبار والسجلات اللي فضلت في النظام'], ['p', 'فحوصات السيرفر عملت 5 price lists تجريبية مامسحتش (الاختبارات مبتمسحش حاجة): «x» وواحد باسم من 101 حرف و«PW PL C 5694629» و«PW PL D 5694629» (صفّين السعودية) و«PW PL E 5694629». الـ price lists الموجودة اتقرت بس.']];
en.obs = ['The SRS note says the system-defined "Standard Selling" and "Standard Buying" can be edited or deleted; confirm that deleting them is really intended.', 'The server accepts the same country twice in one price list; the SRS does not define duplicates.', 'The SRS says "An error message will appear if an invalid item name is entered" (copied from Item) and does not define what an invalid price list name is.', 'The Price List Name is editable on the Details screen; the SRS does not say whether it can be renamed.', 'The SRS describes Buying as read only in the list and Selling only as a checkbox label.'];
ar.obs = ['ملاحظة الـ SRS بتقول إن «Standard Selling» و«Standard Buying» (قوائم النظام) ينفع يتعدّلوا أو يتمسحوا؛ أكدوا إن مسحهم مقصود فعلًا.', 'السيرفر بيقبل نفس الدولة مرتين في price list واحدة؛ والـ SRS مبيعرّفش التكرار.', 'الـ SRS بيقول «An error message will appear if an invalid item name is entered» (منسوخ من Item) ومبيحددش إيه هو الاسم غير الصالح.', 'اسم الـ price list قابل للتعديل في شاشة التفاصيل؛ والـ SRS مبيقولش هل ينفع يتغيّر.', 'الـ SRS بيوصف Buying كقراءة بس في القايمة وSelling كـ checkbox label بس.'];
en.rdBody = en.rdBody.map((s) => s.replace('from the Delivery Note sheet (TC-DNL, TC-DNA, TC-DNW, TC-DNG, TC-DNM, TC-DND)', 'from the Price List sheet (TC-PLL, TC-PLA, TC-PLD)'));
ar.rdBody = ar.rdBody.map((s) => s.replace('من شيت Delivery Note (TC-DNL وTC-DNA وTC-DNW وTC-DNG وTC-DNM وTC-DND)', 'من شيت Price List (TC-PLL وTC-PLA وTC-PLD)'));

const out = [];
out.push(...lines.slice(0, iScript + 1).map((l) => l.replace('<title>Delivery Note Bug Report</title>', '<title>Price List Bug Report</title>')));
out.push('const SHOTS = {};');
out.push(`const STATUSES = ['New','In Progress','Fixed','Retest Passed','Reopened','Not a Bug','Cannot Reproduce','Deferred'];`);
out.push('const BUGS = ' + JSON.stringify(bugs, null, 1) + ';');
out.push('const BUG_AR = ' + JSON.stringify(bugAr, null, 1) + ';');
out.push('const SHOT_AR = {};');
out.push('const TC_AR = {};');
out.push('');
out.push('const T = ' + JSON.stringify(T) + ';');
out.push(...lines.slice(iTend + 1));
fs.writeFileSync(path.join(dir, 'price-list-bug-report.html'), out.join('\n'));
console.log('written', out.join('\n').length, 'bytes; bugs', bugs.length, 'high', high, 'medium', med, 'low', low, 'cases linked', refd);
