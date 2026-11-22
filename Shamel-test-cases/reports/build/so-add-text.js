// Text of the "Add Sales Order screen" report. Starts from so-text.js, then replaces the parts that describe the whole module.
const base = require('./so-text.js');
module.exports = function apply(en, ar, bugs) {
  base(en, ar, bugs);
  en.title = 'Add Sales Order - Bug Report';
  ar.title = 'Add Sales Order - تقرير المشاكل';
  en.eyebrow = 'QA bug report · Selling › Sales Order › Add screen';
  ar.eyebrow = 'تقرير مشاكل QA · Selling › Sales Order › شاشة الإضافة';
  en.h1 = 'Add Sales Order: 19 problems. The order cannot be saved from the screen, because four fields the server requires are not on any tab';
  ar.h1 = 'Add Sales Order: 19 مشكلة. الأمر مينفعش يتحفظ من الشاشة، لأن أربع خانات السيرفر بيطلبها مش موجودة في أي تاب';
  en.lede = 'Only the Add Sales Order screen (Details, General Information and More Information tabs) and the rules the server applies when an order is created, compared with the SRS (pages 173 to 214) on the test server. A real UI run filled every field that can be filled on the three tabs and pressed Save: the order was NOT added (no API was used in that run). After about 7 seconds the popup "تعذّر الحفظ" says that Name In Contract, Contract End Date, Employee and Brief are missing, and none of them is on any tab (SO-01). Other problems found while filling: Territory opens an empty list (SO-22), the exchange rate does not change with the currency (SO-23), an expired coupon is offered (SO-24), and the server accepts several invalid values (SO-06, SO-07, SO-14 to SO-18). The numbers keep the IDs of the full Sales Order report so both files match. The Details screen, Create, the list and Hold problems (SO-02, SO-03, SO-05, SO-09, SO-10) are in the full report only.';
  ar.lede = 'شاشة Add Sales Order بس (تابات Details وGeneral Information وMore Information) وقواعد السيرفر وقت إنشاء الأمر، مقارنة بالـ SRS (الصفحات 173 لـ 214) على السيرفر التجريبي. تشغيل فعلي من الشاشة ملا كل خانة تتملي في التابات التلاتة ودوس Save: الأمر ما اتضافش (ومن غير أي API في التشغيل ده). بعد حوالي 7 ثواني بتظهر نافذة «تعذّر الحفظ» وبتقول إن Name In Contract وContract End Date وEmployee وBrief ناقصين، ومفيش واحد فيهم في أي تاب (SO-01). مشاكل تانية ظهرت أثناء الملء: Territory بتفتح قايمة فاضية (SO-22)، وسعر الصرف مبيتغيرش مع العملة (SO-23)، وكوبون منتهي بيتعرض (SO-24)، والسيرفر بيقبل قيم غلط كتير (SO-06 وSO-07 وSO-14 لـ SO-18). الأرقام محتفظة بترقيم التقرير الكامل لـ Sales Order عشان الملفين يتطابقوا. مشاكل شاشة Details وCreate والقايمة وHold (SO-02 وSO-03 وSO-05 وSO-09 وSO-10) في التقرير الكامل بس.';
  en.meta = [['Environment', 'test.hr.azzrk.com'], ['Browser', 'Chromium (desktop, headed)'], ['User', 'Administrator'], ['Company', 'Ahmed Ebrahim CO.'], ['Language', 'Arabic interface (account language: ar)'], ['Run date', '2026-11-18'], ['Method', 'Full fill of the Add screen in the browser, then Save (no API); server rules checked with the standard create call'], ['Bug IDs', 'SO-01, SO-04, SO-06 to SO-08, SO-11 to SO-24 (19 problems)']];
  ar.meta = [['البيئة', 'test.hr.azzrk.com'], ['المتصفح', 'Chromium (كمبيوتر، ظاهر)'], ['المستخدم', 'Administrator'], ['الشركة', 'Ahmed Ebrahim CO.'], ['اللغة', 'واجهة عربي (لغة الحساب: ar)'], ['تاريخ التشغيل', '2026-11-18'], ['الطريقة', 'ملء كامل لشاشة الإضافة في المتصفح ثم Save (من غير API)؛ وقواعد السيرفر اتفحصت بنداء الإنشاء العادي'], ['أرقام المشاكل', 'SO-01 وSO-04 وSO-06 لـ SO-08 وSO-11 لـ SO-24 (19 مشكلة)']];
  en.covRows = [
    ['Add screen, Details tab: company, series, customer, dates, Skip Delivery Note, currency, exchange rate and price list, barcode, Items table (add, edit row, delete, item filter), Setting, Get Items From Quotation, taxes, totals, additional discount, coupon, Blanket Order link, Save messages', 27, 18, 9, 0],
    ['Add screen, General Information and More Information tabs: addresses, contacts, payment terms, terms, status fields, territory, customer purchase order, print settings', 14, 12, 2, 0],
    ['Server rules on create: party, items, quantity, rate, dates, discounts, taxes, warehouse, UOM, item filter, order type, text lengths, contract fields', 18, 11, 7, 0],
    ['Messages, labels and translation', 3, 2, 1, 0],
  ];
  ar.covRows = [
    ['شاشة الإضافة، تاب Details: الشركة والسلسلة والعميل والتواريخ وSkip Delivery Note والعملة وسعر الصرف وقايمة الأسعار والباركود وجدول الأصناف (إضافة وتعديل صف وحذف وفلتر الأصناف) وSetting وGet Items From Quotation والضرايب والإجماليات والخصم الإضافي والكوبون وربط Blanket Order ورسائل Save', 27, 18, 9, 0],
    ['شاشة الإضافة، تابي General Information وMore Information: العناوين وجهات الاتصال وشروط الدفع والشروط وخانات الحالة والمنطقة وأمر شراء العميل وإعدادات الطباعة', 14, 12, 2, 0],
    ['قواعد السيرفر وقت الإنشاء: العميل والأصناف والكمية والسعر والتواريخ والخصومات والضرايب والمخزن والـ UOM وفلتر الأصناف وOrder Type وأطوال النصوص وحقول العقد', 18, 11, 7, 0],
    ['الرسائل والعناوين والترجمة', 3, 2, 1, 0],
  ];
  en.covNote = 'Counts are the Add-screen part of the full Sales Order report (62 checks, 43 matched, 19 differ). No Sales Order test-case workbook exists yet, so the defects are not linked to case IDs.';
  ar.covNote = 'الأرقام هي جزء شاشة الإضافة من التقرير الكامل لـ Sales Order (62 فحص، 43 مطابق، 19 مختلف). مفيش ملف test cases لـ Sales Order لسه، فالمشاكل مش مربوطة بأرقام حالات.';
  en.ok = [
    'Customer, date, delivery date, cost center, project, currency, price list, source warehouse, barcode field and the three switches (Skip Delivery Note, Ignore Pricing Rule, Reserve Stock) can be filled; the item row takes quantity and rate; Edit Row takes description, margin type, supplier delivers and page break',
    'Shipping rule and tax template fill the tax row; additional discount 5 percent on the grand total gives a net total of 29,925.00 and a grand total of 34,413.75 after tax',
    'General Information: billing, shipping and company addresses; the payment terms template adds a 100 percent row with a due date; terms template and text',
    'More Information: customer purchase order and date, letter head, print without amounts, group same items',
    'The item dropdown hides fixed assets, template items and items that are not for sale; Get Items From Quotation adds the row; validate selling price refuses a rate below valuation; quantity 0 is refused by the server; the server calculates discount and tax correctly',
  ];
  ar.ok = [
    'العميل والتاريخ وتاريخ التسليم ومركز التكلفة والمشروع والعملة وقايمة الأسعار ومخزن المصدر وخانة الباركود والثلاث مفاتيح (Skip Delivery Note وIgnore Pricing Rule وReserve Stock) بتتملي؛ وصف الصنف بياخد الكمية والسعر؛ وEdit Row بياخد الوصف ونوع الهامش وsupplier delivers وفاصل الصفحة',
    'قاعدة الشحن وقالب الضرايب بيملوا صف الضريبة؛ والخصم الإضافي 5٪ على الإجمالي الكلي بيدي صافي 29,925.00 وإجمالي 34,413.75 بعد الضريبة',
    'General Information: عنوان الفوترة والشحن والشركة؛ وقالب شروط الدفع بيضيف صف 100٪ بتاريخ استحقاق؛ وقالب الشروط والنص',
    'More Information: أمر شراء العميل وتاريخه ورأس الصفحة والطباعة بدون المبالغ وتجميع الأصناف',
    'قايمة الأصناف بتخبي الأصول الثابتة وأصناف الـ template والأصناف اللي مش للبيع؛ وGet Items From Quotation بيضيف الصف؛ وvalidate selling price بيرفض سعر أقل من التقييم؛ والسيرفر بيرفض الكمية 0 وبيحسب الخصم والضريبة صح',
  ];
  en.no = [
    'Billing and company contact (the customer PW Test Customer has no contacts) and the Preferred / Primary address and contact rules',
    'Territory (SO-22), Coupon Code with a valid coupon, Taxes and Charges Calculation and Bundle Items tables (they appear after Save, and Save does not work, SO-01)',
    'Exchange rate roles (who may edit it), Payment Terms rules after Save, serial and batch fields of the item row, shortage rules Warn and Block (the setting is Ignore and was not changed)',
  ];
  ar.no = [
    'جهة اتصال الفوترة والشركة (العميل PW Test Customer ملوش جهات اتصال) وقواعد العنوان وجهة الاتصال Preferred / Primary',
    'Territory (SO-22) وCoupon Code بكوبون صالح وجدولي Taxes and Charges Calculation وBundle Items (بيظهروا بعد Save، وSave مش شغال SO-01)',
    'صلاحيات تعديل سعر الصرف وقواعد Payment Terms بعد Save وحقول الـ serial والـ batch في صف الصنف وقواعد العجز Warn وBlock (الإعداد Ignore ومتغيّرش)',
  ];
  en.rtBody = [['p', 'Retest starts when the developers mark SO-01 as Fixed here (or tell the tester): until then no order can be created from the screen and the Taxes and Charges Calculation, Bundle Items, Payment Terms and shortage cases cannot be run.'],
    ['h', 'When a fix arrives'], ['ol', ['Repeat SO-01: fill the three tabs and press Save; the order must be created and the popup must not appear.', 'Repeat SO-22, SO-23, SO-24 and SO-19 on the screen; repeat SO-06, SO-07 and SO-14 to SO-18 with the create call.', 'Run the cases listed under "Not tested".', 'Update the status of each problem in the feedback box below.']]];
  ar.rtBody = [['p', 'إعادة الاختبار تبدأ لما المطورين يعلّموا SO-01 كـ Fixed هنا (أو يبلّغوا الـ tester): لحد ما ده يحصل مفيش أمر بيتعمل من الشاشة، وحالات Taxes and Charges Calculation وBundle Items وPayment Terms والعجز مش هتتنفذ.'],
    ['h', 'لما يوصل إصلاح'], ['ol', ['كرر SO-01: املا التابات التلاتة ودوس Save؛ لازم الأمر يتعمل والنافذة متظهرش.', 'كرر SO-22 وSO-23 وSO-24 وSO-19 على الشاشة؛ وكرر SO-06 وSO-07 وSO-14 لـ SO-18 بنداء الإنشاء.', 'نفّذ الحالات المكتوبة تحت «ماتنفذش».', 'حدّث حالة كل مشكلة في صندوق الـ feedback تحت.']]];
  en.obs = [
    'Fields on the screen or the server that are not in the SRS: the contract fields (Account Type, Contract Start Date, Contract End Date, Name In Contract, Employee, Brief, Customer Account), mandatory on the server (SO-01), and Territories. They look intentional but the SRS should describe them.',
    'The Save button gives no loading state: the error popup comes after about 7 seconds (SO-01).',
  ];
  ar.obs = [
    'حقول في الشاشة أو السيرفر مش في الـ SRS: حقول العقد (Account Type وContract Start Date وContract End Date وName In Contract وEmployee وBrief وCustomer Account) وهي إجبارية في السيرفر (SO-01) وTerritories. باين إنها مقصودة لكن لازم الـ SRS يوصفها.',
    'زر Save مفيهوش حالة تحميل: نافذة الخطأ بتظهر بعد حوالي 7 ثواني (SO-01).',
  ];
};
