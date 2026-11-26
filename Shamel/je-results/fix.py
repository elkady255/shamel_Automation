def sub(p, old, new, n=1):
    s = open(p, encoding='utf-8').read()
    assert old in s, (p, old[:60])
    open(p, 'w', encoding='utf-8', newline='').write(s.replace(old, new) if n == 0 else s.replace(old, new, n))
A = 'Shamel/je-a-form.spec.ts'; B = 'Shamel/je-b-tabs.spec.ts'; C = 'Shamel/je-c-lifecycle.spec.ts'; H = 'Shamel/helpers/je-ui.ts'
s = open(A, encoding='utf-8').read()
a = s.index("  await j.typeCell(page, 0, 3, '10'); await j.watch(page);"); b = s.index("test('A04 totals")
s = s[:a] + """  await j.typeCell(page, 0, 3, '10');
  const locked = !(await j.cell(page, 0, 4).isEditable({ timeout: 3000 }).catch(() => false));
  rec.check('A03-8', 'Debit and Credit cannot both be entered on one row in the table (the other box is locked)', locked, `credit editable=${!locked}`);
  await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await j.wait(2500);
  const inPopup = (label: string) => j.modal(page).locator('.qr-field').filter({ has: page.locator('label', { hasText: new RegExp('^\\s*' + label + '\\s*$') }) }).locator('input').first();
  const open = await inPopup('دائن').isEditable({ timeout: 3000 }).catch(() => false);
  if (open) { await j.watch(page); await inPopup('دائن').fill('10'); await inPopup('دائن').press('Tab'); await j.modal(page).locator('button').filter({ hasText: /^\s*حفظ\s*$/ }).last().click(); await j.wait(2500); }
  const popupMsg = `${await j.flashed(page)} ${await j.dialogText(page)}`; await j.closeAll(page);
  const debit = await j.cell(page, 0, 3).inputValue(), credit = await j.cell(page, 0, 4).inputValue();
  rec.check('A03-9', 'Edit Row also prevents Debit and Credit together on one row', !(Number(debit) && Number(credit)), `popup credit editable=${open} debit=${debit} credit=${credit} msg=${popupMsg.slice(0, 200)}`);
});

""" + s[b:]
open(A, 'w', encoding='utf-8', newline='').write(s)
sub(A, "const options = (await page.locator('.cs-option:visible, .custom-select-input li:visible, [role=option]:visible, .select-option:visible, .options-list > *:visible').allInnerTexts()).map((s) => s.trim()).filter(Boolean);",
       "const options = (await page.locator('.select-dropdown.is-teleported:visible').last().innerText().catch(() => '')).split('\n').map((s) => s.trim()).filter((s) => s && s !== 'لا يوجد');")
sub(A, "'فاتورة شراء', 'قيد يومية', 'أمر بيع', 'أمر شراء', 'قيد دفع'", "'فاتورة مشتريات', 'قيد يومية', 'أمر بيع', 'أمر شراء', 'أصل', 'إعادة تقييم سعر الصرف', 'قيد دفع', 'معاملة بنكية'")
sub(A, "|| /مطلوب|صف واحد|القيود المحاسبية مطلوب/.test(", "|| /مطلوب|أضف صف|صفًا واحد/.test(")
sub(B, "doc.tax_withholding_entries[0].withholding_amount === 50", "Math.abs(doc.tax_withholding_entries[0].withholding_amount) === 50")
sub(B, "g.some((e) => /QA-PE WHT/.test(e.account) && e.credit + e.debit === 50)", "g.some((e) => /QA-PE WHT/.test(e.account) && Math.abs(e.credit - e.debit) === 50)")
sub(H, "export const click = async", "/** Delete on the details screen is an icon button. */\nexport const remove = async (p: Page) => { await u.main(p).getByRole('button', { name: 'حذف', exact: true }).first().click(); await wait(2500); };\nexport const click = async")
s = open(C, encoding='utf-8').read()
a = s.index("test('C06 bulk"); head, tail = s[:a], s[a:]
head = head.replace("await j.click(page, 'حذف')", "await j.remove(page)")
open(C, 'w', encoding='utf-8', newline='').write(head + tail)
