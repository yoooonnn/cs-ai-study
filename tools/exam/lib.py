# 필기 대비 문항 빌더 공용 부품: 문항 수집 + SVG 그림 도우미
import json, random, html

OUT = {}
def esc(s): return html.escape(str(s), quote=False)

def add(subj, typ, q, right, wrongs, explain, fig=None, cap=''):
    opts = [str(right)]
    for w in wrongs:
        if str(w) not in opts: opts.append(str(w))
    assert len(opts) >= 3 or (len(opts) == 2 and len(wrongs) == 1), (q, opts)
    opts = opts[:4]
    rr = random.Random(q); order = list(range(len(opts))); rr.shuffle(order)
    item = {'type': typ, 'q': q, 'options': [opts[i] for i in order], 'answer': order.index(0), 'explain': explain}
    if fig: item['fig'] = fig; item['cap'] = cap
    OUT.setdefault(subj, []).append(item)

def ol(*steps): return '<ol>' + ''.join('<li>%s</li>' % s for s in steps) + '</ol>'
def tip(s): return '<p><b>핵심</b> · %s</p>' % s
def table(head, rows):
    h = '<table><tr>' + ''.join('<th>%s</th>' % c for c in head) + '</tr>'
    for r in rows: h += '<tr>' + ''.join('<td>%s</td>' % c for c in r) + '</tr>'
    return h + '</table>'
def fmt(x): return ('%.2f' % x).rstrip('0').rstrip('.')

# ---------- SVG ----------
def svg(w, h, body): return '<svg viewBox="0 0 %d %d" width="%d">%s</svg>' % (w, h, w, body)
def R(x, y, w, h, cls='n'): return '<rect class="%s" x="%g" y="%g" width="%g" height="%g" rx="3"/>' % (cls, x, y, w, h)
def T(x, y, s, cls=''): return '<text x="%g" y="%g"%s>%s</text>' % (x, y, ' class="%s"' % cls if cls else '', esc(s))
def L(x1, y1, x2, y2, cls='e'): return '<path class="%s" d="M%g,%g L%g,%g"/>' % (cls, x1, y1, x2, y2)
def C(x, y, r, cls='n'): return '<circle class="%s" cx="%g" cy="%g" r="%g"/>' % (cls, x, y, r)

def gantt(g):
    end = g[-1][2]; sc = min(40, 520 / end); W = end * sc + 40
    b = ''
    for n, s, e in g:
        b += R(20 + s * sc, 14, (e - s) * sc, 36, 'h') + T(20 + (s + e) / 2 * sc, 32, n)
    ticks = sorted({0} | {x for _, s, e in g for x in (s, e)})
    for t in ticks: b += L(20 + t * sc, 50, 20 + t * sc, 56) + T(20 + t * sc, 66, t, 'sm')
    return svg(W, 76, b)

def tree(root, kids, label=lambda n: n, hl=()):
    # kids: node -> (left, right). 중위 순서로 x, 깊이로 y
    pos, order = {}, []
    def walk(n, d):
        if n is None: return
        l, r = kids.get(n, (None, None)); walk(l, d + 1); order.append(n); pos[n] = [len(order), d]; walk(r, d + 1)
    walk(root, 0)
    W = (len(order) + 1) * 46; H = (max(d for _, d in pos.values()) + 1) * 58 + 10
    xy = lambda n: (pos[n][0] * 46, 24 + pos[n][1] * 58)
    b = ''
    for n in order:
        for c in kids.get(n, (None, None)):
            if c is not None: b += L(*xy(n), *xy(c), 'he' if n in hl and c in hl else 'e')
    for n in order: b += C(*xy(n), 18, 'h' if n in hl else 'n') + T(*xy(n), label(n))
    return svg(W, H, b)

def heap_tree(arr):
    kids = {i: (i * 2 + 1 if i * 2 + 1 < len(arr) else None, i * 2 + 2 if i * 2 + 2 < len(arr) else None) for i in range(len(arr))}
    return tree(0, kids, lambda i: arr[i])

def cells(rows, labels=None, hl=(), idx=False, cw=40):
    lw = 80 if labels else 0; top = 18 if idx else 0
    W = lw + max(len(r) for r in rows) * cw + 10; H = top + len(rows) * 38 + 4
    b = ''
    if idx:
        for c in range(max(len(r) for r in rows)): b += T(lw + c * cw + cw / 2, 9, c, 'sm')
    for ri, r in enumerate(rows):
        y = top + ri * 38
        if labels: b += T(4, y + 16, labels[ri], 'sm st')
        for ci, v in enumerate(r):
            b += R(lw + ci * cw + 1, y + 1, cw - 2, 32, 'h' if (ri, ci) in hl else ('g' if v in ('', None) else 'n'))
            if v not in ('', None): b += T(lw + ci * cw + cw / 2, y + 17, v)
    return svg(W, H, b)

def bitfields(fields, W=520):
    # fields: [(라벨, 비트 수, 내용 or None, cls)]
    tot = sum(f[1] for f in fields); sc = (W - 20) / tot; x = 10; b = ''
    for lab, n, content, cls in fields:
        w = n * sc; b += R(x, 10, w, 40, cls) + T(x + w / 2, 30, content if content is not None else lab)
        b += T(x + w / 2, 64, ('%s · ' % lab if content is not None else '') + '%d비트' % n, 'sm'); x += w
    return svg(W, 76, b)

def bitcells(bits, groups):
    # groups: [(start, end, cls, label)] 각 비트를 칸으로
    cw = min(26, 500 / len(bits)); W = len(bits) * cw + 20; b = ''
    for s, e, cls, lab in groups:
        for i in range(s, e): b += R(10 + i * cw, 10, cw - 1, 30, cls) + T(10 + i * cw + cw / 2, 25, bits[i])
        b += T(10 + (s + e) / 2 * cw, 54, lab, 'sm')
    return svg(W, 64, b)

def graph(nodes, edges, hl=(), W=440, H=230):
    b = ''
    for a, c, w in edges:
        (x1, y1), (x2, y2) = nodes[a], nodes[c]; on = (a, c) in hl or (c, a) in hl
        b += L(x1, y1, x2, y2, 'he' if on else 'e d')
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        b += R(mx - 11, my - 10, 22, 20, 'h' if on else 'g') + T(mx, my, w, 'sm')
    for n, (x, y) in nodes.items(): b += C(x, y, 17, 'n') + T(x, y, n)
    return svg(W, H, b)

def frames_grid(ref, states, faults, n):
    cw = 30; lw = 52; W = lw + len(ref) * cw + 6; H = 26 + n * 30 + 28; b = T(4, 12, '참조', 'sm st')
    for i, x in enumerate(ref): b += T(lw + i * cw + cw / 2, 12, x)
    for f in range(n):
        y = 24 + f * 30; b += T(4, y + 13, '프레임%d' % (f + 1), 'sm st')
        for i, st in enumerate(states):
            v = st[f] if f < len(st) else None
            new = faults[i] and v == ref[i]
            b += R(lw + i * cw + 1, y, cw - 2, 26, 'h' if new else ('n' if v is not None else 'g'))
            if v is not None: b += T(lw + i * cw + cw / 2, y + 13, v)
    y = 24 + n * 30 + 12; b += T(4, y, '부재', 'sm st')
    for i, fl in enumerate(faults):
        if fl: b += T(lw + i * cw + cw / 2, y, 'F')
    return svg(W, H, b)
