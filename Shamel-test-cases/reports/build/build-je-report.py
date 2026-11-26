# Builds the bilingual Journal Entry report (run from the repo root).
import base64
import io
import pymupdf

ROOT = 'Shamel/je-results/'


def crop(path, box):
    pix = pymupdf.Pixmap(ROOT + path)
    doc = pymupdf.open()
    page = doc.new_page(width=pix.width, height=pix.height)
    page.insert_image(page.rect, pixmap=pix)
    out = page.get_pixmap(clip=pymupdf.Rect(*box))
    return 'data:image/png;base64,' + base64.b64encode(out.tobytes('png')).decode()


def t(en, ar):
    return '<span class="en">%s</span><span class="ar">%s</span>' % (en, ar)


SHOT1 = crop('p7-writeoff.png', (40, 1020, 1200, 1250))
SHOT2 = crop('p5-more.png', (40, 410, 1200, 790))
SHOT3 = crop('bug-letterhead.png', (540, 610, 960, 1130))

BUGS = [
    ('JE-01', 'High', 'عالية', 'Write Off Entry: Get Outstanding Invoices does nothing', 'قيد الشطب: زر «جلب الفواتير المستحقة» لا يعمل', 'p. 402',
     ['Add Journal Entry, Entry Type = Write Off Entry.', 'Open Additional Info, section Write Off.', 'Press Get Outstanding Invoices (with Write Off Amount empty or filled, either Based On value).'],
     ['أضف قيد يومية بنوع «قيد شطب».', 'افتح المعلومات الاضافية، قسم الشطب.', 'اضغط «جلب الفواتير المستحقة» (بمبلغ شطب فارغ أو مكتوب، وبأي قيمة في «شطب بناءً على»).'],
     'The outstanding invoices are added to the Accounting Entries table.', 'تُضاف الفواتير المستحقة إلى جدول القيود المحاسبية.',
     'Nothing happens: no request is sent to the server, no row is added and no message is shown. The button looks enabled.', 'لا يحدث أي شيء: لا يُرسل طلب للسيرفر، ولا يُضاف صف، ولا تظهر رسالة. والزر يبدو مفعّلًا.', SHOT1),
    ('JE-02', 'Medium', 'متوسطة', 'Hidden field “Payment Order” is shown in Additional Info', 'الحقل المخفي «أمر الدفع» ظاهر في المعلومات الاضافية', 'p. 401',
     ['Open Add Journal Entry (or any entry) and the Additional Info tab.'], ['افتح إضافة قيد يومية (أو أي قيد) ثم تبويب المعلومات الاضافية.'],
     'Payment Order is highlighted red in the SRS, so it is not shown.', '«أمر الدفع» مظلل بالأحمر في الـ SRS، فلا يظهر.', 'The field «أمر الدفع» is shown in the Reference section.', 'الحقل «أمر الدفع» ظاهر في قسم المرجع.', SHOT2),
    ('JE-03', 'Medium', 'متوسطة', 'Hidden field “Letter Head” is offered in bulk Edit', 'الحقل المخفي «ترويسة الخطاب» ظاهر في التعديل الجماعي', 'p. 373, 401',
     ['Select an entry in the list, press Edit and open the Field list.'], ['اختر قيدًا من القائمة، اضغط «تعديل» وافتح قائمة «الحقل».'],
     'Letter Head is marked “Remove” and highlighted red in the SRS.', '«ترويسة الخطاب» مظللة بالأحمر ومكتوب عليها Remove في الـ SRS.',
     '«ترويسة الخطاب» is listed, together with «عنوان الطباعة» which is not in the SRS.', '«ترويسة الخطاب» موجودة، ومعها «عنوان الطباعة» غير المذكور في الـ SRS.', SHOT3),
    ('JE-04', 'Low', 'منخفضة', 'Default Entry Type is shown in English on the add screen', 'نوع القيد الافتراضي يظهر بالإنجليزية في شاشة الإضافة', 'p. 376',
     ['Open Add Journal Entry with the Arabic interface.'], ['افتح إضافة قيد يومية والواجهة بالعربية.'],
     'Entry Type shows «قيد يومية».', 'يظهر نوع القيد «قيد يومية».', 'It shows “Journal Entry”. The details screen shows «قيد يومية». Same behaviour as PE-03.', 'يظهر “Journal Entry”، بينما شاشة التفاصيل تعرض «قيد يومية». نفس سلوك PE-03.', ''),
    ('JE-05', 'Low', 'منخفضة', 'Column width accepts letters and more than 3 characters', 'عرض العمود يقبل حروفًا وأكثر من 3 خانات', 'p. 380',
     ['Open the table settings of Accounting Entries.', 'Type abc, then 12345 in a column width.'], ['افتح إعدادات جدول القيود المحاسبية.', 'اكتب abc ثم 12345 في عرض العمود.'],
     'Numbers only, at most 3 characters.', 'أرقام فقط، بحد أقصى 3 خانات.', 'Both are accepted while typing. Same behaviour as PREC-04.', 'يتم قبولهما أثناء الكتابة. نفس سلوك PREC-04.', ''),
    ('JE-06', 'Low', 'منخفضة', 'Table settings button is “Save”, SRS names it “Update”', 'زر إعدادات الجدول اسمه «حفظ» والمطلوب «تحديث»', 'p. 381',
     ['Open the table settings.'], ['افتح إعدادات الجدول.'], 'Button labelled Update.', 'الزر باسم «تحديث».', 'Button labelled «حفظ». Same behaviour as PREC-05.', 'الزر باسم «حفظ». نفس سلوك PREC-05.', ''),
    ('JE-07', 'Low', 'منخفضة', 'Cost Center and account values repeat the name', 'قيم مركز التكلفة والحسابات تكرر الاسم', 'p. 378, 382',
     ['Add a row and open Edit Row.'], ['أضف صفًا وافتح «تعديل الصف».'], 'Each name is shown once.', 'يظهر كل اسم مرة واحدة.',
     '“101 - Main X - E - Main X” and “122102 - RIYAD BANK - E - RIYAD BANK”. Same behaviour as PE-04.', '“101 - Main X - E - Main X” و“122102 - RIYAD BANK - E - RIYAD BANK”. نفس سلوك PE-04.', ''),
]

AREAS = []  # filled below from the generated case table
import json, collections
def area(batch):
    last = {}
    for line in open('Shamel/si-results/%s.jsonl' % batch, encoding='utf-8'):
        j = json.loads(line)
        if j['ok'] is not None:
            last[j['id']] = j['ok']
        elif j.get('reviewed'):
            last.pop(j['id'], None)
    return len(last), sum(1 for v in last.values() if v)
for batch, en, ar in [('je-add', 'Add and submit: entry kinds, parties, multi currency, Quick Entry', 'الإضافة والاعتماد: أنواع القيد والأطراف والعملات والإدخال السريع'),
                      ('je-a-form', 'Add screen: fields, rows, rules, table settings', 'شاشة الإضافة: الحقول والصفوف والقواعد وإعدادات الجدول'),
                      ('je-b-tabs', 'References, multi currency, Additional Info, write off, tax withholding', 'المراجع والعملات والمعلومات الاضافية والشطب والضريبة المستقطعة'),
                      ('je-c-lifecycle', 'List, details, reverse, cancel, amend, delete, bulk actions', 'القائمة والتفاصيل والقيد العكسي والإلغاء ونسخة التعديل والحذف والإجراءات الجماعية')]:
    n, p = area(batch)
    AREAS.append((en, ar, n, p))

WORKS = [
    ('Adding works from the screen: save and submit store the typed data and post a balanced ledger for journal, bank, cash and contra entries, customer and supplier rows, several rows, multi currency and Quick Entry.', 'الإضافة تعمل من الشاشة: الحفظ والاعتماد يخزنان البيانات المكتوبة ويرحّلان قيودًا متوازنة للقيد العادي والبنكي والنقدي والمقابل، وسطور العملاء والموردين، وعدة سطور، والعملات المتعددة، والإدخال السريع.'),
    ('Rules work: unbalanced and incomplete entries are refused, bank entries require a reference, Make Difference Entry balances the entry, and a row cannot take debit and credit together.', 'القواعد تعمل: القيد غير المتوازن أو الناقص يُرفض، والقيد البنكي يطلب المرجع، و«إنشاء قيد الفرق» يوازن القيد، ولا يمكن كتابة مدين ودائن في نفس السطر.'),
    ('An invoice reference reduces the invoice balance. The exchange rate is fetched and can be changed. Tax withholding on a debit note calculates and posts 50 on 1,000.', 'مرجع الفاتورة يقلل رصيدها. سعر الصرف يُجلب ويمكن تعديله. الضريبة المستقطعة على الإشعار المدين تحسب وترحّل 50 من 1000.'),
    ('Draft editing, ledger button, Reverse Journal Entry with swapped amounts and the Reversal Of link, cancel, amend with Amended From, refusal to delete a linked entry, draft deletion and bulk submit / cancel work.', 'تعديل المسودة، وزر دفتر الأستاذ، والقيد العكسي مع رابط «عكس لـ»، والإلغاء، ونسخة التعديل مع «معدل من»، ورفض حذف قيد مرتبط، وحذف المسودة، والاعتماد والإلغاء الجماعي تعمل.'),
    ('The other fields marked red in the SRS are not shown: Periodic Accounting, Auto Repeat, From Template, Title, Total Amount fields and the hidden reference types.', 'باقي الحقول المظللة بالأحمر غير ظاهرة: المحاسبة الدورية، والتكرار التلقائي، ومن قالب، والعنوان، وحقول إجمالي المبلغ، وأنواع المراجع المخفية.'),
]

QUESTIONS = [
    ('1. A cancelled entry cannot be deleted: the system asks to enable “Delete accounting and stock ledger entries on deletion of transaction” in Accounts Settings. The SRS says an unlinked cancelled entry is deleted. Enable the setting or update the SRS? Bulk Delete also adds “خطأ غير معروف”. Same as Payment Entry.', '1. لا يمكن حذف قيد ملغي: السيستم يطلب تفعيل «حذف القيود المحاسبية والمخزنية عند حذف المعاملة» في إعدادات الحسابات، والـ SRS يقول إنه يُحذف. هل يُفعّل الإعداد أم يُعدّل الـ SRS؟ والحذف الجماعي يضيف «خطأ غير معروف». نفس سؤال قيود الدفع.'),
    ('2. Reference Number accepts numbers only, as the SRS says, but letters are removed silently: CHQ-123 is saved as 123. Cheque and transfer numbers often contain letters. Should the rule or the behaviour change?', '2. الرقم المرجعي يقبل أرقامًا فقط كما في الـ SRS، لكن الحروف تُحذف بدون تنبيه: CHQ-123 يُحفظ 123. أرقام الشيكات والتحويلات قد تحتوي حروفًا. هل تتغير القاعدة أم السلوك؟'),
    ('3. The SRS asks for the message “You cannot credit and debit the same account at the same time”. The screen locks the second box instead and shows no message. Is that accepted?', '3. الـ SRS يطلب رسالة «لا يمكن أن يكون الحساب دائنًا ومدينًا في نفس الوقت». الشاشة تقفل الخانة الثانية بدلًا من ذلك بدون رسالة. هل هذا مقبول؟'),
    ('4. Tax withholding on a debit note adds the withholding row with a negative credit (-50). Is that the wanted presentation?', '4. الضريبة المستقطعة على الإشعار المدين تضيف صف الاستقطاع بقيمة دائن سالبة (-50). هل هذا العرض مقصود؟'),
    ('5. The list shows Total Debit beyond the SRS columns. View Ledger opens the General Ledger of the ERPNext desk, outside the Shamel interface.', '5. القائمة تعرض «إجمالي المدين» زيادة عن أعمدة الـ SRS. وزر دفتر الأستاذ يفتح تقرير ERPNext خارج واجهة شامل.'),
]

NOT_TESTED = [
    ('Write off rows after fetching (blocked by JE-01), Inter Company entries, Opening, Depreciation, Asset Disposal and Deferred entry types as full postings.', 'صفوف الشطب بعد الجلب (متوقفة على JE-01)، وقيود بين الشركات، وترحيل أنواع القيد الافتتاحي والإهلاك واستبعاد الأصل والمؤجلة.'),
    ('Sales and Purchase Order references: creating an order fails with the server error for_update (SI-43).', 'مراجع أوامر البيع والشراء: إنشاء الأمر يفشل بخطأ السيرفر for_update (SI-43).'),
    ('Running Export, Print, Assign, Tags and Share, dragging columns, exchange rate setting variants, user permissions and the English interface.', 'تنفيذ التصدير والطباعة والإسناد والوسوم والمشاركة، وسحب الأعمدة، وحالات إعدادات سعر الصرف، والصلاحيات، والواجهة الإنجليزية.'),
]

DATA = [
    ('Journal entries', 'QA entries from ACC-JV-2026-01720 upward (draft, submitted and cancelled)'),
    ('Parties', 'QA-PE Cust 11261152, QA-PE Supp 11261152, QA-PE Cust USD 11261152'),
    ('Invoice', 'One QA sales invoice of 950 for the reference case'),
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
        '<div class="shot"><img alt="Screenshot of the defect" src="%s"></div>' % shot if shot else '')

rows = ''.join('<tr><td>%s</td><td class="n">%d</td><td class="n">%d</td><td class="n %s">%d</td></tr>' % (t(a, b), n, p, 'bad' if n - p else '', n - p) for a, b, n, p in AREAS)
total, passed = sum(a[2] for a in AREAS), sum(a[3] for a in AREAS)

html = '''<title>Journal Entry QA</title>
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
    t('Journal Entry test report', 'تقرير اختبار قيود اليومية'),
    t('test.hr.azzrk.com · /accounting/journal-entries · company Ahmed Ebrahim CO. · compared with the Accounting SRS V1.0, pages 372-407 · 26 November 2026', 'test.hr.azzrk.com · \u200e/accounting/journal-entries · شركة Ahmed Ebrahim CO. · مقارنة بـ SRS الحسابات V1.0 صفحات 372-407 · 26 نوفمبر 2026'),
    passed, total, t(' passed', ' نجحت'), total - passed,
    t('Adding works and the data is saved and posted correctly. Seven defects were found: one high (write off cannot fetch invoices), two medium (fields that must be hidden) and four low. Cases that delete a cancelled entry fail because of an Accounts Settings option (question 1).', 'الإضافة تعمل والبيانات تُحفظ وتُرحّل بشكل صحيح. وُجدت سبع مشاكل: واحدة عالية (قيد الشطب لا يجلب الفواتير)، واثنتان متوسطتان (حقول يجب إخفاؤها)، وأربع منخفضة. وحالات حذف القيد الملغي تفشل بسبب خيار في إعدادات الحسابات (سؤال 1).'),
    t('Defects', 'المشاكل'), bug_html,
    t('What works', 'ما يعمل'), li(WORKS),
    t('Coverage', 'التغطية'), t('Area', 'الجزء'), t('Cases', 'الحالات'), t('Passed', 'نجحت'), t('Failed', 'فشلت'), rows,
    t('Questions for the BA and DEV', 'أسئلة لمحلل الأعمال والمطورين'), li(QUESTIONS),
    t('Not tested', 'لم يُختبر'), li(NOT_TESTED),
    t('Test data left on the system', 'بيانات الاختبار المتروكة على السيستم'),
    t('To retest after the fixes run: npx playwright test je-add je-a-form je-b-tabs je-c-lifecycle --project=chromium --workers=1', 'لإعادة الاختبار بعد الإصلاح شغّل: <bdi dir="ltr">npx playwright test je-add je-a-form je-b-tabs je-c-lifecycle --project=chromium --workers=1</bdi>'),
    ''.join('<tr><td>%s</td><td>%s</td></tr>' % x for x in DATA))
open('Shamel-test-cases/reports/journal-entry-bug-report.html', 'w', encoding='utf-8').write(html)
print(total, passed, len(html))
