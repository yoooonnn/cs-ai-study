from lib import *
import random, math, heapq
Rn = random.Random(3030)
S = 'ds'
J = lambda l: ' '.join(map(str, l))

def orders(root, kids):
    def pre(n): return [] if n is None else [n] + pre(kids.get(n, (None, None))[0]) + pre(kids.get(n, (None, None))[1])
    def ino(n): return [] if n is None else ino(kids.get(n, (None, None))[0]) + [n] + ino(kids.get(n, (None, None))[1])
    def post(n): return [] if n is None else post(kids.get(n, (None, None))[0]) + post(kids.get(n, (None, None))[1]) + [n]
    return pre(root), ino(root), post(root)
TRAV = '전위(루트 → 왼쪽 → 오른쪽), 중위(왼쪽 → 루트 → 오른쪽), 후위(왼쪽 → 오른쪽 → 루트)'

# ---------- 전위 + 중위 → 트리 ----------
def rebuild(pre, ino, log):
    if not pre: return None, {}
    r = pre[0]; k = ino.index(r)
    if len(pre) > 1: log.append('전위 [%s]의 첫 원소 <b>%s</b>가 루트 → 중위에서 왼쪽 [%s], 오른쪽 [%s]' % (J(pre), r, J(ino[:k]) or '없음', J(ino[k + 1:]) or '없음'))
    l, kl = rebuild(pre[1:k + 1], ino[:k], log); rr, kr = rebuild(pre[k + 1:], ino[k + 1:], log)
    kids = {**kl, **kr, r: (l, rr)}; return r, kids
for pre, ino in [('A B D E C F', 'D B E A F C'), ('A B D H E C F G', 'H D B E A F C G'), ('1 2 4 5 3 6 7', '4 2 5 1 6 3 7'), ('A B C D E F', 'C B D A E F')]:
    pre, ino = pre.split(), ino.split(); log = []
    root, kids = rebuild(pre, ino, log); _, _, post = orders(root, kids)
    add(S, '트리 순회', '전위 순회 %s, 중위 순회 %s인 이진 트리의 후위 순회 결과는?' % (J(pre), J(ino)), J(post), [J(post[::-1]), J(ino[::-1]), J(post[:-2] + post[-2:][::-1]) if post[-2] != post[-1] else J(pre[::-1])],
        ol('전위의 첫 원소는 항상 (서브)트리의 루트, 중위에서 루트 왼쪽은 왼쪽 서브트리, 오른쪽은 오른쪽 서브트리다.', '이 규칙을 서브트리마다 반복해 트리를 복원(그림)<br>' + '<br>'.join(log),
           '복원한 트리를 후위(왼쪽 → 오른쪽 → 루트)로 읽으면 <b>%s</b>' % J(post))
        + tip(TRAV + '. 후위의 마지막 원소도 루트다. 전위·후위만으로는 트리가 하나로 정해지지 않는다(중위가 꼭 필요).'), tree(root, kids), '복원한 트리')

# ---------- BST 삽입 후 순회 ----------
def bst(seq):
    kids = {}; root = seq[0]; log = []
    for x in seq[1:]:
        c = root; path = [str(root)]
        while True:
            l, r = kids.get(c, (None, None))
            if x < c:
                if l is None: kids[c] = (x, r); break
                c = l
            else:
                if r is None: kids[c] = (l, x); break
                c = r
            path.append(str(c))
        log.append('%d: %s → %s의 %s 자식' % (x, ' → '.join(path), c, '왼쪽' if x < c else '오른쪽'))
    return root, kids, log
for kind in ['후위', '전위', '후위', '중위', '전위']:
    seq = Rn.sample(range(10, 90), 7)
    root, kids, log = bst(seq); pr, io, po = orders(root, kids)
    ans = {'후위': po, '전위': pr, '중위': io}[kind]
    wr = [x for x in (pr, io, po, seq) if x != ans]
    add(S, '트리 순회', '빈 이진 탐색 트리(BST)에 %s를 차례로 삽입했다. %s 순회 결과는?' % (', '.join(map(str, seq)), kind), J(ans), [J(w) for w in wr],
        ol('BST 규칙: 루트부터 비교해 작으면 왼쪽, 크거나 같으면 오른쪽으로 내려가 빈 자리에 붙인다. 첫 값 %d이 루트.' % seq[0], '<br>'.join(log),
           '완성된 트리(그림)를 순회<br>전위: %s<br>중위: %s<br>후위: %s' % (J(pr), J(io), J(po)))
        + tip('BST를 중위 순회하면 항상 오름차순이 나온다 — 중위를 묻는 문제는 정렬만 하면 끝. 정렬된 순서로 삽입하면 한쪽으로 치우쳐 탐색이 O(n)이 된다.'), tree(root, kids), 'BST 삽입 결과')

# ---------- 중위식 → 후위식 ----------
PREC = {'+': 1, '-': 1, '*': 2, '/': 2}
def postfix(expr):
    out, st, rows = [], [], []
    for t in expr.split():
        if t == '(': st.append(t)
        elif t == ')':
            while st[-1] != '(': out.append(st.pop())
            st.pop()
        elif t in PREC:
            while st and st[-1] != '(' and PREC[st[-1]] >= PREC[t]: out.append(st.pop())
            st.append(t)
        else: out.append(t)
        rows.append([t, J(st) or '—', J(out)])
    out += st[::-1]; rows.append(['(끝)', '—', J(out)])
    return J(out), rows
for e, wrongs in [('A + B * ( C - D ) / E', ['A B C D - E / * +', 'A B + C D - * E /', 'A B C - D * E / +']),
                  ('( A + B ) * C - D / E', ['A B + C D E / - *', 'A B C * + D E / -', 'A B + C * D - E /']),
                  ('A * ( B + C ) - D', ['A B C + - D *', 'A B * C + D -', 'A B C * + D -']),
                  ('A - B / C + D * E', ['A B C / D E * + -', 'A B - C / D E * +', 'A B C / - D + E *']),
                  ('( A - B ) / ( C + D ) * E', ['A B - C D + E * /', 'A B - C D + / * E', 'A B C D - + / E *'])]:
    a, rows = postfix(e); assert a not in wrongs
    add(S, '스택 응용', '중위식 %s를 후위식으로 바꾸면?' % e, a, wrongs,
        ol('피연산자는 바로 출력, 연산자는 스택에 넣되 넣기 전에 <b>스택 위의 우선순위가 같거나 높은 연산자</b>를 먼저 꺼내 출력한다.', '( 는 그냥 넣고, ) 를 만나면 ( 까지 꺼내 출력한다. 끝나면 스택을 모두 비운다.',
           '진행' + table(['읽은 토큰', '스택(왼쪽이 바닥)', '출력'], rows))
        + tip('검산용 손 풀이: 연산 순서대로 괄호를 모두 씌운 뒤 각 연산자를 자기 닫는 괄호 자리로 옮기고 괄호를 지운다. 전위식은 여는 괄호 자리로 옮긴다.'))
def evalpf(toks):
    st, rows = [], []
    for t in toks:
        if t in '+-*/':
            b, a = st.pop(), st.pop(); v = {'+': a + b, '-': a - b, '*': a * b, '/': a // b}[t]; st.append(v)
            rows.append([t, '%d %s %d = %d' % (a, t, b, v), J(st)])
        else: st.append(int(t)); rows.append([t, 'push', J(st)])
    return st[0], rows
for toks in ['5 3 2 * + 4 -', '6 2 3 + * 4 -', '8 2 - 3 4 * +', '4 5 + 2 3 * -', '9 3 1 - * 2 +']:
    v, rows = evalpf(toks.split())
    add(S, '스택 응용', '후위식 %s의 계산 결과는?' % toks, v, [v + 2, v - 3, v * 2],
        ol('숫자는 스택에 push. 연산자를 만나면 두 개를 pop — <b>먼저 꺼낸 것이 오른쪽</b> 피연산자 — 계산 결과를 다시 push.', table(['토큰', '동작', '스택(오른쪽이 top)'], rows), '마지막에 남은 값 <b>%d</b>' % v)
        + tip('뺄셈·나눗셈에서 순서를 바꾸면 틀린다: "a b −"는 a − b.'))
add(S, '스택 응용', '1, 2, 3을 순서대로 스택에 push한다(중간에 언제든 pop 가능). 출력 순서로 <b>불가능한</b> 것은?', '3 1 2', ['1 2 3', '2 3 1', '3 2 1'],
    ol('3을 가장 먼저 출력하려면 1, 2, 3을 모두 push한 뒤 pop해야 한다. 이때 스택은 [1, 2] (2가 top).', '다음 pop은 반드시 2 → 3 다음에 1이 나올 수 없다.',
       '가능한 예: 1 2 3 (push-pop 반복), 2 3 1 (push1 push2 pop2 push3 pop3 pop1), 3 2 1 (모두 push 후 pop)')
    + tip('n개로 만들 수 있는 출력 순서의 수는 카탈란 수 C(n) — 3개면 5가지, 4개면 14가지. 불가능 패턴: 큰 수 다음에 작은 수 두 개가 "오름차순"으로 나오는 경우(예: 3 … 1 … 2).'))
add(S, '스택 응용', '1, 2, 3, 4를 순서대로 스택에 push한다(중간에 pop 가능). 출력 순서로 <b>불가능한</b> 것은?', '4 2 3 1', ['2 1 4 3', '1 4 3 2', '3 4 2 1'],
    ol('4가 처음 나오려면 1~4를 모두 push한 뒤 pop → 스택 [1, 2, 3].', '이후는 3 → 2 → 1 순서로만 나올 수 있다. 4 다음 2는 불가능.',
       '2 1 4 3: push1 push2 pop pop push3 push4 pop pop ✓ / 1 4 3 2 ✓ / 3 4 2 1: push1 push2 push3 pop push4 pop pop pop ✓')
    + tip('어떤 수 x가 나온 시점에 x보다 작은데 아직 안 나온 수들은 스택 안에 있으므로 반드시 큰 것부터(역순으로) 나와야 한다.'))

# ---------- 힙 ----------
def heap_ins(seq, mx):
    h, log = [], []
    better = (lambda a, b: a > b) if mx else (lambda a, b: a < b)
    for x in seq:
        h.append(x); i = len(h) - 1; sw = []
        while i and better(h[i], h[(i - 1) // 2]):
            p = (i - 1) // 2; sw.append(str(h[p])); h[p], h[i] = h[i], h[p]; i = p
        log.append('%d 삽입 → %s → [%s]' % (x, '부모 %s와 교환' % ', '.join(sw) if sw else '교환 없음', J(h)))
    return h, log
for seq, mx in [([5, 3, 8, 1, 9], True), ([10, 4, 15, 20, 3, 7], False), ([12, 30, 5, 18, 25, 9], True), ([40, 20, 35, 10, 5, 15], False)]:
    h, log = heap_ins(seq, mx); alt = h[:]; alt[-1], alt[-2] = alt[-2], alt[-1]
    add(S, '힙', '빈 %s 힙에 %s를 차례로 삽입한 뒤의 배열(레벨 순서)은?' % ('최대' if mx else '최소', ', '.join(map(str, seq))), J(h), [J(sorted(seq, reverse=mx)), J(seq), J(alt)],
        ol('삽입: 배열 맨 끝(트리의 마지막 자리)에 넣고, 부모보다 %s 동안 부모와 교환하며 올라간다(up-heap).' % ('큰' if mx else '작은'), '<br>'.join(log),
           '인덱스 i의 부모는 (i − 1) / 2, 자식은 2i + 1, 2i + 2 (0부터 셀 때)')
        + tip('힙은 "부모가 자식보다 %s"만 보장할 뿐 정렬 상태가 아니다. 삭제는 루트를 꺼내고 마지막 원소를 루트로 올린 뒤 아래로 내려 보낸다(down-heap). 삽입·삭제 O(log n), 힙 정렬 O(n log n).' % ('크다' if mx else '작다')),
        heap_tree(h), '완성된 힙')

# ---------- 정렬 과정 ----------
def bubble(a):
    a = a[:]; rows = [a[:]]
    for i in range(len(a) - 1):
        if a[i] > a[i + 1]: a[i], a[i + 1] = a[i + 1], a[i]
        rows.append(a[:])
    return a, rows
def selection(a):
    a = a[:]; m = a.index(min(a)); a[0], a[m] = a[m], a[0]; return a, m
def insertion(a, k):
    return sorted(a[:k + 1]) + a[k + 1:]
for name in ['버블 정렬', '선택 정렬', '삽입 정렬', '버블 정렬', '선택 정렬']:
    while True:
        a = Rn.sample(range(1, 10), 6)
        b1, rows = bubble(a); s1, m = selection(a); i2 = insertion(a, 2)
        if len({J(b1), J(s1), J(i2), J(sorted(a))}) == 4 and m != 0: break
    ans = {'버블 정렬': b1, '선택 정렬': s1, '삽입 정렬': i2}[name]
    steps = {'버블 정렬': '인접한 두 원소를 왼쪽부터 비교해 앞이 크면 교환 — 1회전이 끝나면 최댓값이 맨 뒤에 확정(그림: 각 줄이 비교 한 번 후 상태).',
             '선택 정렬': '전체에서 최솟값 %d(인덱스 %d)를 찾아 맨 앞 원소 %d와 교환 → 1회전 후 맨 앞이 확정.' % (min(a), m, a[0]),
             '삽입 정렬': '2번째 원소부터 하나씩 앞쪽의 정렬된 부분에 끼워 넣는다. 1회전: 앞 2개 정렬, 2회전: 앞 3개 정렬 → [%s]' % J(i2)}[name]
    add(S, '정렬', '[%s]에 <b>%s</b>(오름차순)을 %s 수행한 결과는?' % (', '.join(map(str, a)), name, '2회전' if name == '삽입 정렬' else '1회전'), J(ans),
        [J(x) for x in (b1, s1, i2, sorted(a)) if x != ans],
        ol(steps, '비교용 — 같은 배열에서 버블 1회전: %s, 선택 1회전: %s, 삽입 2회전: %s' % (J(b1), J(s1), J(i2)))
        + table(['정렬', '평균', '최악', '안정'], [['버블·선택·삽입', 'O(n²)', 'O(n²)', '선택만 불안정'], ['퀵', 'O(n log n)', 'O(n²)', '불안정'], ['병합', 'O(n log n)', 'O(n log n)', '안정'], ['힙', 'O(n log n)', 'O(n log n)', '불안정']]),
        cells(rows, ['시작'] + ['비교 %d' % (i + 1) for i in range(len(rows) - 1)], hl={(r, r - 1) for r in range(1, len(rows))} | {(r, r) for r in range(1, len(rows))}) if name == '버블 정렬' else None, '버블 정렬 1회전 — 강조된 두 칸을 비교')
add(S, '정렬', '다음 중 <b>안정(stable) 정렬이 아닌</b> 것은?', '퀵 정렬', ['삽입 정렬', '버블 정렬', '병합 정렬'],
    ol('안정 정렬: 값이 같은 원소들의 원래 순서가 정렬 후에도 유지된다.', '퀵 정렬은 피벗 기준으로 멀리 떨어진 원소끼리 교환하므로 같은 값의 순서가 뒤바뀔 수 있다.',
       '안정: 버블, 삽입, 병합, 계수·기수 / 불안정: 퀵, 힙, 선택, 셸')
    + tip('퀵 정렬은 평균 O(n log n)으로 실제로 가장 빠른 편이지만, 이미 정렬된 배열에서 첫 원소를 피벗으로 쓰면 최악 O(n²). 병합 정렬은 항상 O(n log n)이지만 추가 메모리 O(n)이 필요.'))

# ---------- 해시 ----------
for m, keys in [(7, [10, 17, 24, 3]), (11, None), (13, None), (10, None)]:
    if keys is None:
        while True:
            keys = Rn.sample(range(10, 100), 5)
            if len({k % m for k in keys}) <= 3 and keys[-1] % m != 0: break
    T = [None] * m; log = []
    for k in keys:
        i = k % m; path = [i]
        while T[i] is not None: i = (i + 1) % m; path.append(i)
        T[i] = k; log.append('%d mod %d = %d → %s' % (k, m, k % m, ' → '.join('%d번%s' % (p, ' 충돌' if j < len(path) - 1 else ' 저장') for j, p in enumerate(path))))
    last = keys[-1]; pos = T.index(last)
    add(S, '해시', '크기 %d, h(k) = k mod %d, 선형 조사(linear probing) 해시 테이블에 %s를 차례로 넣을 때 %d이 저장되는 위치는?' % (m, m, ', '.join(map(str, keys)), last),
        pos, [last % m, (pos + 1) % m, (pos + 2) % m, (last % m + 1) % m],
        ol('선형 조사: 자리가 차 있으면 다음 칸(+1)으로, 끝에 닿으면 0번으로 돌아간다.', '<br>'.join(log))
        + tip('선형 조사는 충돌한 키가 한 구역에 몰리는 1차 군집이 생긴다. 이차 조사(+1², +2², …)는 이를 줄이지만 2차 군집이 생기고, 이중 해싱이 가장 고르게 퍼진다. 체이닝은 같은 자리에 연결 리스트로 매단다.'),
        cells([[('' if v is None else v) for v in T]], hl={(0, T.index(k)) for k in keys if T.index(k) != k % m}, idx=True), '최종 테이블 (강조: 충돌 후 밀려난 키)')

# ---------- 이진 탐색 ----------
for n in [15, 31, 100, 1000]:
    c = int(math.log2(n)) + 1
    add(S, '탐색', '정렬된 원소 %d개에서 이진 탐색을 할 때 최대 비교 횟수는?' % n, c, [c - 1, c + 1, n // 2],
        ol('비교 한 번마다 후보가 절반으로 준다: %s' % ' → '.join(str(x) for x in [n] + [n >> i for i in range(1, c)] if x),
           '최대 비교 횟수 = ⌊log₂ n⌋ + 1 = ⌊log₂ %d⌋ + 1 = %d + 1 = <b>%d</b>' % (n, c - 1, c))
        + tip('이진 탐색은 정렬된 배열(임의 접근)이 전제. 순차 탐색은 최대 n번, 평균 (n + 1) / 2번.'))

# ---------- 그래프 ----------
N6 = {'A': (40, 115), 'B': (160, 40), 'C': (160, 190), 'D': (290, 40), 'E': (290, 190), 'F': (400, 115)}
E6 = [('A', 'B', 4), ('A', 'C', 1), ('B', 'C', 2), ('B', 'D', 5), ('C', 'D', 8), ('C', 'E', 10), ('D', 'E', 2), ('D', 'F', 6), ('E', 'F', 3)]
def kruskal(E):
    p = {}; fd = lambda x: x if p.get(x, x) == x else fd(p[x]); rows, used = [], []
    for a, b, w in sorted(E, key=lambda e: e[2]):
        ok = fd(a) != fd(b)
        if ok: p[fd(a)] = fd(b); used.append((a, b))
        rows.append(['%s-%s' % (a, b), w, '채택' if ok else '버림(사이클)'])
    return used, rows
used, rows = kruskal(E6); tot = sum(w for a, b, w in E6 if (a, b) in used)
add(S, '그래프', '그림의 그래프(간선 A-B 4, A-C 1, B-C 2, B-D 5, C-D 8, C-E 10, D-E 2, D-F 6, E-F 3)의 최소 신장 트리(MST) 가중치 합은?', tot, [12, 14, 16],
    ol('크루스칼: 간선을 가중치 오름차순으로 보면서 <b>사이클이 생기지 않으면</b> 채택한다.', table(['간선', '가중치', '판단'], rows[:7]),
       '정점 6개 → 간선 5개를 채우면 끝. 1 + 2 + 2 + 3 + 5 = <b>%d</b>' % tot)
    + tip('프림: 한 정점에서 시작해 "트리와 밖을 잇는 가장 싼 간선"을 하나씩 추가. 결과 가중치는 크루스칼과 같다. 크루스칼 O(E log E) — 간선 적은 희소 그래프, 프림 — 밀집 그래프에 유리.'),
    graph(N6, E6, used), 'MST (굵은 선)')
def prim(E, s):
    adj = {}
    for a, b, w in E: adj.setdefault(a, []).append((w, a, b)); adj.setdefault(b, []).append((w, b, a))
    seen = {s}; pq = list(adj[s]); heapq.heapify(pq); order = []
    while pq:
        w, a, b = heapq.heappop(pq)
        if b in seen: continue
        seen.add(b); order.append((a, b, w))
        for e in adj[b]: heapq.heappush(pq, e)
    return order
po = prim(E6, 'A'); third = '%s-%s' % po[2][:2]
add(S, '그래프', '같은 그래프에서 A부터 시작하는 프림 알고리즘이 <b>세 번째로</b> 선택하는 간선은?', third, ['%s-%s' % po[i][:2] for i in (1, 3, 4)],
    ol('프림: 지금까지 만든 트리와 바깥 정점을 잇는 간선 중 가장 가벼운 것을 고른다.', '<br>'.join('%d번째: %s-%s (%d) → 트리 {%s}' % (i + 1, a, b, w, ', '.join(['A'] + [x[1] for x in po[:i + 1]])) for i, (a, b, w) in enumerate(po)))
    + tip('크루스칼과 달리 프림은 항상 하나로 연결된 트리를 키워 간다. 그래서 D-E(2)처럼 가벼워도 트리에 닿지 않은 간선은 나중에 선택된다.'), graph(N6, E6, [p[:2] for p in po]), 'A에서 시작한 프림')
def dijkstra(E, s):
    adj = {}
    for a, b, w in E: adj.setdefault(a, []).append((b, w)); adj.setdefault(b, []).append((a, w))
    d = {v: math.inf for v in adj}; d[s] = 0; prev = {}; done = []; rows = []
    while len(done) < len(adj):
        u = min((v for v in adj if v not in done), key=lambda v: d[v]); done.append(u)
        for v, w in adj[u]:
            if v not in done and d[u] + w < d[v]: d[v] = d[u] + w; prev[v] = u
        rows.append([u] + [('∞' if d[v] == math.inf else d[v]) if v not in done or v == u else '✓' for v in sorted(adj)])
    return d, prev, rows
d, prev, rows = dijkstra(E6, 'A')
for tgt in ['F', 'D']:
    path = [tgt]
    while path[-1] != 'A': path.append(prev[path[-1]])
    path = path[::-1]
    add(S, '그래프', '같은 그래프에서 A로부터 %s까지의 최단 거리(다익스트라)는?' % tgt, d[tgt], [d[tgt] + 1, d[tgt] - 2, d[tgt] + 3],
        ol('다익스트라: 아직 확정 안 된 정점 중 거리가 가장 작은 것을 확정하고, 그 정점을 거쳐 가는 쪽이 더 짧으면 이웃의 거리를 갱신한다.',
           '각 단계 후 거리표 (✓ = 이미 확정)' + table(['확정'] + sorted(d), rows),
           '최단 경로 %s, 거리 <b>%d</b>' % (' → '.join(path), d[tgt]))
        + tip('음의 가중치가 있으면 다익스트라는 틀릴 수 있다 → 벨만-포드. 모든 쌍 최단 경로는 플로이드-워셜 O(V³).'),
        graph(N6, E6, list(zip(path, path[1:]))), 'A → %s 최단 경로' % tgt)

# ---------- 트리 성질 ----------
for n2 in [10, 15]:
    add(S, '트리 순회', '이진 트리에서 차수가 2인 노드가 %d개일 때 단말(리프) 노드 수는?' % n2, n2 + 1, [n2, n2 - 1, n2 * 2],
        ol('노드 수 n = n₀ + n₁ + n₂ (차수 0, 1, 2인 노드 수)', '간선 수 = n − 1, 그리고 간선 수 = 자식 수의 합 = n₁ + 2n₂',
           'n₀ + n₁ + n₂ − 1 = n₁ + 2n₂ → <b>n₀ = n₂ + 1</b> = %d' % (n2 + 1))
        + tip('높이 h(루트 = 1)인 이진 트리의 최대 노드 수 2^h − 1, 노드 n개인 완전 이진 트리의 높이 ⌊log₂ n⌋ + 1.'))
add(S, '트리 순회', '깊이(레벨) 5인 포화 이진 트리의 노드 수는? (루트 = 레벨 1)', 31, [32, 16, 15],
    ol('레벨 k에는 최대 2^(k−1)개 노드: 1, 2, 4, 8, 16', '합 = 2^5 − 1 = <b>31</b>') + tip('포화 이진 트리: 모든 레벨이 꽉 참. 완전 이진 트리: 마지막 레벨만 왼쪽부터 채워짐 — 배열로 표현하기 좋아서 힙에 쓰인다.'))
