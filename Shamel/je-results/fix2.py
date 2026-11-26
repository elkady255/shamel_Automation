def sub(p, old, new):
    s = open(p, encoding='utf-8').read()
    assert old in s, (p, old[:60])
    open(p, 'w', encoding='utf-8', newline='').write(s.replace(old, new))
B = 'Shamel/je-b-tabs.spec.ts'
sub(B, "const inv = await d.seedStep('jeInv', () => d.salesInvoice(950, 3));", "const inv = (await d.salesInvoice(950, 3)).name as string; // a fresh invoice on every run")
