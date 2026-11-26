# Builds the bilingual Payment Reconciliation report (run from the repo root).
import base64
import io
import pymupdf

ROOT = 'Shamel/prec-results/'


def crop(path, box):
    pix = pymupdf.Pixmap(ROOT + path)
    doc = pymupdf.open()
    page = doc.new_page(width=pix.width, height=pix.height)
    page.insert_image(page.rect, pixmap=pix)
    out = page.get_pixmap(clip=pymupdf.Rect(*box))
    return 'data:image/png;base64,' + base64.b64encode(out.tobytes('png')).decode()


def t(en, ar):
    return '<span class="en">%s</span><span class="ar">%s</span>' % (en, ar)


SHOT = crop('E02.png', (40, 925, 1100, 1275))

BUGS = [
    ('PREC-01', 'Medium', 'متوسطة', 'Bank / Cash Account filter does not filter Payment Entries', 'فلتر حساب البنك / النقدية لا يفلتر قيود الدفع', 'p. 314',
     ['Customer QA-PR Cust Main, open Payment Reconciliation.', 'Choose Bank / Cash Account = 122102 - RIYAD BANK - E.', 'Press Get Unreconciled Entries.'],
     ['العميل QA-PR Cust Main، افتح تسوية الدفعات.', 'اختر حساب البنك / النقدية = 122102 - RIYAD BANK - E.', 'اضغط «جلب القيود غير المسواة».'],
     'Only payments made through the chosen bank are returned.', 'تظهر دفعات البنك المختار فقط.',
     'ACC-PAY-2026-03072 and 03073 are still listed although both were received in 122101 - ALRAJHY BANK. Only the journal entry is filtered out.', 'ACC-PAY-2026-03072 و03073 يظهران رغم أنهما مستلمان على 122101 - ALRAJHY BANK. قيد اليومية فقط هو الذي يختفي.', ''),
    ('PREC-02', 'Medium', 'متوسطة', 'Cost Center of a Payment Entry is not returned in the Payments table', 'مركز تكلفة قيد الدفع لا يرجع في جدول الدفعات', 'p. 318-319',
     ['Get the entries of QA-PR Cust Main.', 'Open Edit Row of ACC-PAY-2026-03072 (or read the server answer).'],
     ['اجلب قيود العميل QA-PR Cust Main.', 'افتح «تعديل الصف» لـ ACC-PAY-2026-03072 (أو راجع رد السيرفر).'],
     'Cost Center shows the value stored on the payment: 101 - Main X - E.', 'يظهر مركز التكلفة المسجل على الدفعة: 101 - Main X - E.',
     'cost_center is null for both Payment Entries. Journal entries and return invoices return it correctly.', 'القيمة cost_center فارغة (null) لقيدي الدفع. قيود اليومية والمرتجعات ترجعها بشكل صحيح.', ''),
    ('PREC-03', 'Medium', 'متوسطة', 'Amount columns are cut off in the Invoices and Payments tables', 'أعمدة المبالغ مقصوصة في جدولي الفواتير والدفعات', 'p. 314-317',
     ['Open the screen at 1400 px width.', 'Get Unreconciled Entries.'],
     ['افتح الشاشة بعرض 1400 بكسل.', 'اجلب القيود غير المسواة.'],
     'Outstanding Amount and Amount are readable without scrolling.', 'المبلغ المستحق والمبلغ مقروءان بدون تمرير.',
     'The two tables sit side by side and the amounts show only “.00” until the user scrolls each table sideways.', 'الجدولان متجاوران والمبالغ يظهر منها «.00» فقط حتى يمرر المستخدم كل جدول أفقيًا.', SHOT),
    ('PREC-04', 'Low', 'منخفضة', 'Column width accepts letters and more than 3 characters while typing', 'عرض العمود يقبل حروفًا وأكثر من 3 خانات أثناء الكتابة', 'p. 315, 317',
     ['Open table settings.', 'Type abc, then 12345 in a column width.'],
     ['افتح إعدادات الجدول.', 'اكتب abc ثم 12345 في عرض العمود.'],
     'Numbers only; input stops at 3 characters.', 'أرقام فقط، ويتوقف الإدخال عند 3 خانات.',
     'Both are typed in. They are corrected only after Save (abc becomes auto, 12345 becomes 123), with no message.', 'يتم قبولهما، ويتم تصحيحهما بعد الحفظ فقط (abc تصبح auto و12345 تصبح 123) بدون رسالة.', ''),
    ('PREC-05', 'Low', 'منخفضة', 'Table settings button is “Save”, SRS names it “Update”', 'زر إعدادات الجدول اسمه «حفظ» والمطلوب في الـ SRS «تحديث»', 'p. 315, 318',
     ['Open table settings of any table.'], ['افتح إعدادات أي جدول.'],
     'Button labelled Update.', 'الزر باسم «تحديث».', 'Button labelled حفظ (Save). It works correctly.', 'الزر باسم «حفظ» ويعمل بشكل صحيح.', ''),
]

AREAS = [
    ('Header fields, mandatory checks, default accounts', 'حقول الرأس والحقول الإلزامية والحسابات الافتراضية', 32, 32),
    ('Filters', 'الفلاتر', 41, 39),
    ('Unreconciled Entries tables (data, search, delete, edit row, settings)', 'جداول القيود غير المسواة (البيانات والبحث والحذف وتعديل الصف والإعدادات)', 74, 67),
    ('Allocate and Allocation table', 'التخصيص وجدول التخصيص', 46, 46),
    ('Reconcile, customer', 'التسوية للعميل', 22, 22),
    ('Reconcile, supplier and foreign currency', 'التسوية للمورد والعملة الأجنبية', 19, 19),
]

WORKS = [
    ('The data returned matches the stored documents for customer and supplier: submitted invoices with a balance, unallocated payments, returns and advance journal entries. Draft and cancelled documents are not listed.', 'البيانات الراجعة مطابقة للمستندات للعميل والمورد: الفواتير المعتمدة التي عليها رصيد، والدفعات غير المخصصة، والمرتجعات، وقيود الدفعات المقدمة. المسودات والملغيات لا تظهر.'),
    ('Allocation starts with the oldest invoice and never exceeds an invoice balance or a payment amount. Over-allocation, empty, zero and negative amounts are refused.', 'التخصيص يبدأ بالأقدم ولا يتجاوز رصيد الفاتورة أو مبلغ الدفعة. ويُرفض التخصيص الزائد والفارغ والصفر والسالب.'),
    ('Reconcile updates invoice balances and payment unallocated amounts, shows “تمت التسوية بنجاح”, hides the button and refreshes the tables. No journal entry is created for a payment entry.', 'التسوية تحدّث أرصدة الفواتير والمبالغ غير المخصصة، وتعرض «تمت التسوية بنجاح»، وتخفي الزر وتحدّث الجداول. لا يُنشأ قيد يومية لقيد الدفع.'),
    ('Foreign currency: invoice at 3.70 and payment at 3.80 posted a 10 SAR exchange gain to the Difference Account on the chosen Difference Posting Date.', 'العملة الأجنبية: فاتورة بسعر 3.70 ودفعة بسعر 3.80 رحّلت ربح فرق 10 ريال إلى حساب الفرق بالتاريخ المختار.'),
    ('Editing: changing allocated amounts in the table and in Edit Row, deleting rows, column show / hide and reset all work. Deleting a row never deletes a document.', 'التعديل: تعديل المبلغ المخصص في الجدول وفي «تعديل الصف»، وحذف الصفوف، وإظهار وإخفاء الأعمدة وإعادتها تعمل. حذف الصف لا يحذف أي مستند.'),
]

QUESTIONS = [
    ('The Difference Account defaults to 5220 (doubtful debts), taken from the company Exchange Gain / Loss setting. Please review the company configuration.', 'حساب الفرق الافتراضي هو 5220 (ديون مشكوك في تحصيلها) من إعداد أرباح وخسائر العملة في الشركة. برجاء مراجعة إعداد الشركة.'),
    ('The SRS says no journal entry is created for a payment entry. A foreign currency difference creates an “Exchange Gain Or Loss” entry, and a return creates a Credit / Debit Note entry. Please confirm this is intended.', 'الـ SRS يقول لا يُنشأ قيد لقيد الدفع. فرق العملة يُنشئ قيد «Exchange Gain Or Loss»، والمرتجع يُنشئ قيد إشعار دائن أو مدين. برجاء تأكيد أن هذا مقصود.'),
    ('Invoice Date is highlighted in the SRS as “Posting Date or Due Date?”. The system shows the posting date.', 'تاريخ الفاتورة مظلل في الـ SRS بسؤال «تاريخ الترحيل أم الاستحقاق؟». السيستم يعرض تاريخ الترحيل.'),
    ('The Party Type description in the SRS repeats the bank account rule (copy and paste). The system offers Customer, Employee, Shareholder and Supplier.', 'وصف نوع الطرف في الـ SRS مكرر من قاعدة حساب البنك (نسخ ولصق). السيستم يعرض العميل والموظف والمساهم والمورد.'),
    ('The tables show amounts without a currency, and the allocation popup does not show the exchange gain or loss amount. Neither is required by the SRS; showing them would help the user.', 'الجداول تعرض المبالغ بدون عملة، ونافذة التخصيص لا تعرض قيمة ربح أو خسارة العملة. غير مطلوبين في الـ SRS لكن إظهارهما يساعد المستخدم.'),
]

NOT_TESTED = [
    ('Party types Employee and Shareholder.', 'نوعا الطرف الموظف والمساهم.'),
    ('Dragging columns to reorder them.', 'سحب الأعمدة لإعادة ترتيبها.'),
    ('Cost Center filter exclusion (the company has one posting cost center) and Project filter with matching payments.', 'استبعاد فلتر مركز التكلفة (الشركة لديها مركز تكلفة واحد للترحيل) وفلتر المشروع بدفعات مطابقة.'),
    ('User permissions, large data volumes and the English interface.', 'صلاحيات المستخدمين وأحجام البيانات الكبيرة والواجهة الإنجليزية.'),
]

DATA = [
    ('QA-PR Cust Main', 'ACC-SINV-2026-02907, 02908, 02909, return 02910, draft 02912, cancelled 02913; ACC-PAY-2026-03072, 03073, cancelled 03077; ACC-JV-2026-01713, credit note 01715'),
    ('QA-PR Supp Main', 'ACC-PINV-2026-00005, 00006, return 00007; ACC-PAY-2026-03074, 03075; ACC-JV-2026-01714, debit note 01716, draft 01712'),
    ('QA-PR Cust USD', 'ACC-SINV-2026-02911; ACC-PAY-2026-03076; ACC-JV-2026-01717'),
    ('Account', 'QA-PR Payable - E (new payable account used by the test supplier)'),
]


def li(items):
    return ''.join('<li>%s</li>' % t(a, b) for a, b in items)


bug_html = ''
for (bid, sev, sev_ar, en, ar, page, s_en, s_ar, exp, exp_ar, act, act_ar, shot) in BUGS:
    bug_html += '''<article class="bug %s"><header><code>%s</code><span class="sev">%s</span><span class="pg">SRS %s</span></header>
<h3>%s</h3><ol class="en">%s</ol><ol class="ar">%s</ol>
<dl><dt>%s</dt><dd>%s</dd><dt>%s</dt><dd>%s</dd></dl>%s</article>''' % (
        sev.lower(), bid, t(sev, sev_ar), page, t(en, ar), ''.join('<li>%s</li>' % x for x in s_en), ''.join('<li>%s</li>' % x for x in s_ar),
        t('Expected', 'المتوقع'), t(exp, exp_ar), t('Actual', 'الفعلي'), t(act, act_ar),
        '<div class="shot"><img alt="Tables with cut amount columns" src="%s"></div>' % shot if shot else '')

rows = ''.join('<tr><td>%s</td><td class="n">%d</td><td class="n">%d</td><td class="n %s">%d</td></tr>' % (t(a, b), n, p, 'bad' if n - p else '', n - p) for a, b, n, p in AREAS)
total, passed = sum(a[2] for a in AREAS), sum(a[3] for a in AREAS)

html = '''<title>Payment Reconciliation QA</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
/* one reading column: verdict, defects, coverage, open questions, test data */
:root{--bg:#f6f7f3;--card:#fff;--fg:#1d241a;--mute:#5d6757;--line:#dde2d6;--accent:#4f7233;--med:#a35b00;--low:#3d6475;--bad:#a8321f;
--body:'IBM Plex Sans Arabic',system-ui,sans-serif;--mono:'IBM Plex Mono',ui-monospace,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#13170f;--card:#1c2217;--fg:#e8ece2;--mute:#a3ad9a;--line:#333c2b;--accent:#9cc377;--med:#f0aa55;--low:#87bdd3;--bad:#ff8c78;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#13170f;--card:#1c2217;--fg:#e8ece2;--mute:#a3ad9a;--line:#333c2b;--accent:#9cc377;--med:#f0aa55;--low:#87bdd3;--bad:#ff8c78;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font:15px/1.65 var(--body);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
main{max-width:860px;margin:0 auto;padding-block:28px 48px;display:flex;flex-direction:column;gap:30px}
.ar{display:none} main[dir=rtl] .ar{display:revert} main[dir=rtl] .en{display:none}
h1{font-size:28px;line-height:1.25;margin:0;text-wrap:balance} h2{font-size:18px;margin:0 0 12px;border-bottom:2px solid var(--accent);padding-bottom:6px} h3{font-size:16px;margin:8px 0;text-wrap:balance}
p{margin:6px 0;max-width:70ch} .meta{color:var(--mute);font-size:13px}
.top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;flex-wrap:wrap}
button{font:500 14px var(--body);background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:6px;padding:6px 14px;cursor:pointer}
button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.verdict{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:16px 18px}
.score{font:500 26px var(--mono);color:var(--accent)} .score b{color:var(--bad);font-weight:500}
.bug{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:14px 18px;margin-bottom:14px}
.bug header{display:flex;gap:12px;flex-wrap:wrap;font-size:13px;align-items:center} code{font-family:var(--mono)}
.sev{font-weight:700;color:var(--med)} .low .sev{color:var(--low)} .pg{color:var(--mute)}
ol,ul{padding-inline-start:22px;margin:6px 0} dl{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;margin:8px 0} dt{color:var(--mute)} dd{margin:0;min-width:0;overflow-wrap:anywhere}
.shot{overflow-x:auto;border:1px solid var(--line);border-radius:6px} .shot img{display:block;max-width:100%%}
.wrap{overflow-x:auto} table{border-collapse:collapse;width:100%%;font-size:14px} th,td{border-bottom:1px solid var(--line);padding:8px 10px;text-align:start;vertical-align:top}
.n{font-family:var(--mono);font-variant-numeric:tabular-nums;text-align:end;white-space:nowrap} .bad{color:var(--bad)}
.data td:last-child{font:500 12.5px/1.7 var(--mono);direction:ltr;text-align:left}
.warn{border:1px solid var(--med);border-radius:8px;padding:12px 16px}
</style>
<main id="doc" dir="ltr">
<div class="top"><div><h1>%s</h1><p class="meta">%s</p></div><button id="lang" type="button">العربية</button></div>
<section class="verdict"><div class="score">%d / %d%s <b>· %d</b></div><p>%s</p></section>
<section><h2>%s</h2>%s</section>
<section><h2>%s</h2><ul>%s</ul></section>
<section><h2>%s</h2><div class="wrap"><table><thead><tr><th>%s</th><th class="n">%s</th><th class="n">%s</th><th class="n">%s</th></tr></thead><tbody>%s</tbody></table></div></section>
<section><h2>%s</h2><ul>%s</ul></section>
<section><h2>%s</h2><ul>%s</ul></section>
<section><h2>%s</h2><p class="warn">%s</p><div class="wrap"><table class="data"><tbody>%s</tbody></table></div></section>
</main>
<script>
const d=document.getElementById('doc'),b=document.getElementById('lang');
const set=ar=>{d.dir=ar?'rtl':'ltr';b.textContent=ar?'English':'العربية';try{localStorage.setItem('lang',ar?'ar':'en')}catch(e){}};
b.onclick=()=>set(d.dir!=='rtl');
try{if(localStorage.getItem('lang')==='ar')set(true)}catch(e){}
</script>
''' % (
    t('Payment Reconciliation test report', 'تقرير اختبار تسوية الدفعات'),
    t('test.hr.azzrk.com · /accounting/payment-reconciliation · company Ahmed Ebrahim CO. · compared with the Accounting SRS V1.0, pages 312-324 · 26 November 2026', 'test.hr.azzrk.com · ‎/accounting/payment-reconciliation · شركة Ahmed Ebrahim CO. · مقارنة بـ SRS الحسابات V1.0 صفحات 312-324 · 26 نوفمبر 2026'),
    passed, total, t(' passed', ' نجحت'), total - passed,
    t('The core process works: entries are returned correctly, allocation is calculated correctly and reconciliation updates the ledgers for customer, supplier and foreign currency. Five defects remain, three medium and two low. The item highlighted red in the SRS was excluded.', 'العملية الأساسية تعمل: القيود ترجع بشكل صحيح، والتخصيص محسوب صح، والتسوية تحدّث الأرصدة للعميل والمورد والعملة الأجنبية. توجد خمس مشاكل: ثلاث متوسطة واثنتان منخفضتان. العنصر المظلل بالأحمر في الـ SRS مستبعد.'),
    t('Defects', 'المشاكل'), bug_html,
    t('What works', 'ما يعمل'), li(WORKS),
    t('Coverage', 'التغطية'), t('Area', 'الجزء'), t('Cases', 'الحالات'), t('Passed', 'نجحت'), t('Failed', 'فشلت'), rows,
    t('Questions for the BA and DEV', 'أسئلة لمحلل الأعمال والمطورين'), li(QUESTIONS),
    t('Not tested', 'لم يُختبر'), li(NOT_TESTED),
    t('Test data left on the system', 'بيانات الاختبار المتروكة على السيستم'),
    t('Purchase invoice ACC-PINV-2026-00006 set the last purchase rate of item IND182210 to 800 SAR, so selling that item below 800 SAR is now rejected until the rate changes.', 'فاتورة الشراء ACC-PINV-2026-00006 جعلت آخر سعر شراء للصنف IND182210 = 800 ريال، لذلك يُرفض بيعه بأقل من 800 ريال حتى يتغير السعر.'),
    ''.join('<tr><td>%s</td><td>%s</td></tr>' % x for x in DATA))
open('Shamel-test-cases/reports/payment-reconciliation-bug-report.html', 'w', encoding='utf-8').write(html)
print(total, passed, len(html))
