# Builds the bilingual Payment Entry report (run from the repo root).
import base64
import io
import pymupdf

ROOT = 'Shamel/pe-results/'


def crop(path, box):
    pix = pymupdf.Pixmap(ROOT + path)
    doc = pymupdf.open()
    page = doc.new_page(width=pix.width, height=pix.height)
    page.insert_image(page.rect, pixmap=pix)
    out = page.get_pixmap(clip=pymupdf.Rect(*box))
    return 'data:image/png;base64,' + base64.b64encode(out.tobytes('png')).decode()


def t(en, ar):
    return '<span class="en">%s</span><span class="ar">%s</span>' % (en, ar)


SHOT1 = crop('bug-pe01.png', (400, 15, 1000, 250))
SHOT2 = crop('bug-pe02.png', (480, 400, 1090, 935))

BUGS = [
    ('PE-01', 'High', 'عالية', 'Add Row in Advance Taxes and Charges returns a server error', '«إضافة صف» في الضرائب والرسوم المقدمة يرجّع خطأ من السيرفر', 'p. 345-350',
     ['Accounting, Payment Entry, Add (Receive from a customer).', 'Fill the mandatory fields and a paid amount, then Save.', 'In “Advance Taxes and Charges” press Add Row.'],
     ['الحسابات، قيود الدفع، إضافة (استلام من عميل).', 'املأ الحقول الإلزامية والمبلغ ثم احفظ.', 'في «الضرائب والرسوم المقدمة» اضغط «إضافة صف».'],
     'An empty row is added with no message.', 'يضاف صف فارغ بدون أي رسالة.',
     'HTTP 500 pop-up: UnboundLocalError: cannot access local variable ‘current_tax_amount’ (recalculation runs on a row with no Type). It returns on later recalculations, for example when adding a deduction row, while a row has no Type. The only button of the pop-up reads “حصل خطأ أثناء النسخ إلى الحافظة”. After choosing a Type the row calculates correctly.',
     'نافذة خطأ 500: UnboundLocalError: cannot access local variable ‘current_tax_amount’ (إعادة الحساب تعمل على صف بدون «نوع»). تتكرر مع أي إعادة حساب لاحقة، مثل إضافة صف خصم، طالما يوجد صف بدون نوع. زر النافذة مكتوب عليه «حصل خطأ أثناء النسخ إلى الحافظة». بعد اختيار النوع يُحسب الصف بشكل صحيح.', SHOT1),
    ('PE-02', 'Medium', 'متوسطة', 'Hidden field “Letter Head” is offered in bulk Edit', 'الحقل المخفي «ترويسة الخطاب» ظاهر في التعديل الجماعي', 'p. 326, 366',
     ['Open the Payment Entry list and select an entry.', 'Press Edit in the action bar and open the Field list.'],
     ['افتح قائمة قيود الدفع واختر قيدًا.', 'اضغط «تعديل» في شريط الإجراءات وافتح قائمة «الحقل».'],
     'Letter Head is highlighted red in the SRS, so it is not offered anywhere.', 'ترويسة الخطاب مظللة بالأحمر في الـ SRS، فلا تظهر في أي مكان.',
     'ترويسة الخطاب (Letter Head) is listed. عنوان الطباعة (Print Heading), which is not in the SRS, is offered too.', '«ترويسة الخطاب» موجودة في القائمة، ومعها «عنوان الطباعة» غير المذكور في الـ SRS.', SHOT2),
    ('PE-03', 'Low', 'منخفضة', 'Default Party Type is shown in English on the add screen', 'القيمة الافتراضية لنوع الطرف تظهر بالإنجليزية في شاشة الإضافة', 'p. 330',
     ['Open Add Payment Entry with the Arabic interface.'], ['افتح إضافة قيد دفع والواجهة بالعربية.'],
     'Party Type shows «عميل».', 'يظهر نوع الطرف «عميل».', 'It shows “Customer”. The details screen of a submitted entry shows «عميل».', 'يظهر “Customer”، بينما شاشة تفاصيل القيد المعتمد تعرض «عميل».', ''),
    ('PE-04', 'Low', 'منخفضة', 'Cost Center and account values repeat the name', 'قيم مركز التكلفة والحسابات تكرر الاسم', 'p. 332-333, 365',
     ['Open the Cost Center list, or choose the bank accounts of an internal transfer.'], ['افتح قائمة مركز التكلفة، أو اختر حسابات البنك في التحويل الداخلي.'],
     'Each name is shown once.', 'يظهر كل اسم مرة واحدة.', '“101 - Main X - E - Main X” and “122102 - RIYAD BANK - E - RIYAD BANK”.', '“101 - Main X - E - Main X” و“122102 - RIYAD BANK - E - RIYAD BANK”.', ''),
    ('PE-05', 'Low', 'منخفضة', 'Automatic Remarks mix Arabic and English', 'الملاحظات التلقائية تخلط العربية بالإنجليزية', 'p. 366',
     ['Submit a payment allocated to invoices and open Additional Info.'], ['اعتمد دفعة مخصصة على فواتير وافتح المعلومات الاضافية.'],
     'Remarks fully in the interface language.', 'الملاحظات كاملة بلغة الواجهة.', '“Amount ريال سعودي 1500.0 adjusted against Sales Invoice ACC-SINV-2026-02915”.', '“Amount ريال سعودي 1500.0 adjusted against Sales Invoice ACC-SINV-2026-02915”.', ''),
]

AREAS = [
    ('Add screen: fields, defaults, mandatory and visibility rules', 'شاشة الإضافة: الحقول والقيم الافتراضية والإلزامية والإظهار', 72, 70),
    ('End to end: every payment type and party type', 'من البداية للنهاية: كل أنواع الدفع والأطراف', 60, 60),
    ('References, taxes, deductions and write off', 'المراجع والضرائب والخصومات والشطب', 41, 40),
    ('Tax withholding and foreign currency', 'الضريبة المستقطعة والعملة الأجنبية', 36, 36),
    ('List, details, More Info, cancel, amend, delete, bulk actions', 'القائمة والتفاصيل والمعلومات الاضافية والإلغاء ونسخة التعديل والحذف والإجراءات الجماعية', 51, 48),
]

WORKS = [
    ('Adding from the screen saves correct data and submits: Receive and Pay for customer, supplier, employee and shareholder, and Internal Transfer. Stored values, ledger entries and invoice balances match.', 'الإضافة من الشاشة تحفظ البيانات صح وتعتمد: استلام ودفع للعميل والمورد والموظف والمساهم، والتحويل الداخلي. القيم المخزنة والقيود وأرصدة الفواتير مطابقة.'),
    ('Get Outstanding Invoices allocates the oldest first. References can be added, edited and deleted by hand.', '«جلب الفواتير المستحقة» يوزع من الأقدم. والمراجع تضاف وتعدل وتحذف يدويًا.'),
    ('Taxes (typed row and template), write off, manual deduction and the unsettled difference rule work and post correctly.', 'الضرائب (صف يدوي وقالب) والشطب والخصم اليدوي وقاعدة الفرق غير المسوى تعمل وتُرحّل صح.'),
    ('Tax withholding of 5% posts 50 on 1,000 to the withholding account. Foreign currency: fetched and manual rates, amount calculation both ways, exchange gain posting and a SAR to EGP transfer are correct.', 'الضريبة المستقطعة 5% تُرحّل 50 من 1000 على حساب الاستقطاع. العملة الأجنبية: السعر المجلوب واليدوي، وحساب المبلغ في الاتجاهين، وترحيل ربح العملة، والتحويل من ريال لجنيه صحيحة.'),
    ('Draft editing, ledger preview, custom remarks (3 to 500 characters), submit, cancel with ledger reversal, amend with the Amended From link, refusal to delete a linked entry, draft deletion and bulk submit / cancel work.', 'تعديل المسودة، ومعاينة القيود، والملاحظات المخصصة (من 3 إلى 500 حرف)، والاعتماد، والإلغاء مع عكس القيود، ونسخة التعديل مع رابط «معدل من»، ورفض حذف قيد مرتبط، وحذف المسودة، والاعتماد والإلغاء الجماعي تعمل.'),
    ('Fields marked red in the SRS are not on the add screen, the details screen or the reference Edit Row.', 'الحقول المظللة بالأحمر في الـ SRS غير موجودة في شاشة الإضافة ولا التفاصيل ولا «تعديل الصف» للمراجع.'),
]

QUESTIONS = [
    ('1. A cancelled entry cannot be deleted, from the details screen or bulk Delete: the system asks to enable “Delete accounting and stock ledger entries on deletion of transaction” in Accounts Settings. The SRS says an unlinked cancelled entry is deleted. Enable the setting or update the SRS? Bulk Delete also adds “خطأ غير معروف” to the message. Two cases fail for this reason.', '1. لا يمكن حذف قيد ملغي، من شاشة التفاصيل أو الحذف الجماعي: السيستم يطلب تفعيل «حذف القيود المحاسبية والمخزنية عند حذف المعاملة» في إعدادات الحسابات. والـ SRS يقول إن القيد الملغي غير المرتبط يُحذف. هل يُفعّل الإعداد أم يُعدّل الـ SRS؟ والحذف الجماعي يضيف «خطأ غير معروف» للرسالة. حالتان تفشلان لهذا السبب.'),
    ('2. Company Bank Account is prefilled with the company default bank account even when the money goes to another account, and Additional Info shows that account number. Is this default wanted?', '2. الحساب البنكي للشركة يُملأ بالحساب الافتراضي حتى لو المبلغ ذاهب لحساب آخر، والمعلومات الاضافية تعرض رقم هذا الحساب. هل هذا الافتراضي مقصود؟'),
    ('3. Ledger opens General Ledger in a new tab inside the ERPNext desk, outside the Shamel interface. Is that intended?', '3. زر «دفتر الأستاذ» يفتح التقرير في تبويب جديد داخل واجهة ERPNext خارج واجهة شامل. هل هذا مقصود؟'),
    ('4. Account Type, Payment Type and Payment Request are red in the reference Edit Row but not in the SRS column list. The system hides them in Edit Row and offers them in Add / Remove columns. Should they be removed there too?', '4. نوع الحساب ونوع الدفع وطلب الدفع مظللة بالأحمر في «تعديل الصف» وغير مظللة في قائمة الأعمدة بالـ SRS. السيستم يخفيها في تعديل الصف ويعرضها في إضافة وإزالة الأعمدة. هل تُحذف من هناك أيضًا؟'),
    ('5. The list shows Title, Company and Mode of Payment beyond the SRS, and the SRS description of the Payment Type column omits Internal Transfer.', '5. القائمة تعرض العنوان والشركة وطريقة الدفع زيادة عن الـ SRS، ووصف عمود نوع الدفع في الـ SRS لا يذكر التحويل الداخلي.'),
    ('6. The company exchange gain / loss account is 5220 (doubtful debts). Please review the configuration.', '6. حساب أرباح وخسائر العملة في الشركة هو 5220 (ديون مشكوك في تحصيلها). برجاء مراجعة الإعداد.'),
    ('7. With tax withholding, Paid Amount After Tax changes only after Save.', '7. مع الضريبة المستقطعة، المبلغ المدفوع بعد الضريبة لا يتغير إلا بعد الحفظ.'),
]

NOT_TESTED = [
    ('Allocation to Sales and Purchase Orders: creating an order fails with the server error “unexpected keyword argument for_update” (SI-43).', 'التخصيص على أوامر البيع والشراء: إنشاء الأمر يفشل بخطأ السيرفر “unexpected keyword argument for_update” (SI-43).'),
    ('Book advance payments in a separate account, Is Opening and reconcile on advance date: updating the Company through frappe.client.set_value fails with the same for_update error, so the option could not be switched on. Company values are unchanged.', 'حجز الدفعات المقدمة في حساب منفصل و«قيد افتتاحي» والتسوية بتاريخ الدفعة: تحديث الشركة عبر frappe.client.set_value يفشل بنفس خطأ for_update فتعذر تفعيل الخيار. إعدادات الشركة لم تتغير.'),
    ('Other exchange rate settings, Dunning references, running Export, Print, Assign, Tags and Share (only their presence was checked), user permissions and the English interface.', 'إعدادات سعر الصرف الأخرى، ومراجع المطالبة، وتنفيذ التصدير والطباعة والإسناد والوسوم والمشاركة (تم التحقق من وجودها فقط)، والصلاحيات، والواجهة الإنجليزية.'),
]

DATA = [
    ('Parties', 'QA-PE Cust, QA-PE Supp, QA-PE Cust USD, HR-EMP-03882, ACC-SH-2026-00002, CONT-00001, CONT-00002'),
    ('Invoices', 'QA-PE sales invoices from ACC-SINV-2026-02914; purchase invoices ACC-PINV-2026-00008, 00009'),
    ('Payment entries', 'Between ACC-PAY-2026-03079 and 03120 (QA parties only; draft, submitted and cancelled)'),
    ('Retest dry run', 'A second data set with suffix 11261152 (parties, invoices ACC-SINV-2026-02922 to 02925, ACC-PINV-2026-00010, 00011) and the payments of the dry run'),
    ('Setup', 'Accounts QA-PE WHT - E and QA-PE Adv Received - E; Tax Withholding Category QA-PE TDS 5'),
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

html = '''<title>Payment Entry QA</title>
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
    t('Payment Entry test report', 'تقرير اختبار قيود الدفع'),
    t('test.hr.azzrk.com · /accounting/payment-entries · company Ahmed Ebrahim CO. · compared with the Accounting SRS V1.0, pages 325-371 · 26 November 2026', 'test.hr.azzrk.com · \u200e/accounting/payment-entries · شركة Ahmed Ebrahim CO. · مقارنة بـ SRS الحسابات V1.0 صفحات 325-371 · 26 نوفمبر 2026'),
    passed, total, t(' passed', ' نجحت'), total - passed,
    t('Adding and the full end-to-end cycle work, and the data is saved correctly for every payment and party type. Five defects were found: one high (adding a tax row), one medium and three low. Two more cases fail because of an Accounts Settings option (question 1).', 'الإضافة والدورة الكاملة تعمل، والبيانات تُحفظ صح لكل أنواع الدفع والأطراف. وُجدت خمس مشاكل: واحدة عالية (إضافة صف ضريبة)، وواحدة متوسطة، وثلاث منخفضة. وحالتان تفشلان بسبب خيار في إعدادات الحسابات (سؤال 1).'),
    t('Defects', 'المشاكل'), bug_html,
    t('What works', 'ما يعمل'), li(WORKS),
    t('Coverage', 'التغطية'), t('Area', 'الجزء'), t('Cases', 'الحالات'), t('Passed', 'نجحت'), t('Failed', 'فشلت'), rows,
    t('Questions for the BA and DEV', 'أسئلة لمحلل الأعمال والمطورين'), li(QUESTIONS),
    t('Not tested', 'لم يُختبر'), li(NOT_TESTED),
    t('Test data left on the system', 'بيانات الاختبار المتروكة على السيستم'),
    t('To retest after the fixes, run: npx playwright test pe-reset --project=chromium &amp;&amp; npx playwright test pe-reseed --project=chromium &amp;&amp; npx playwright test pe-a-form pe-b-e2e pe-c-advanced pe-d-tds-fx pe-e-lifecycle --project=chromium --workers=1', 'لإعادة الاختبار بعد الإصلاح شغّل: <bdi dir="ltr">npx playwright test pe-reset --project=chromium &amp;&amp; npx playwright test pe-reseed --project=chromium &amp;&amp; npx playwright test pe-a-form pe-b-e2e pe-c-advanced pe-d-tds-fx pe-e-lifecycle --project=chromium --workers=1</bdi>'),
    ''.join('<tr><td>%s</td><td>%s</td></tr>' % x for x in DATA))
open('Shamel-test-cases/reports/payment-entry-bug-report.html', 'w', encoding='utf-8').write(html)
print(total, passed, len(html))
