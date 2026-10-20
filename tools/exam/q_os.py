from lib import *
import random
Rn = random.Random(1020)
S = 'os'

# ---------- CPU 스케줄링 ----------
RULE = {
    'FCFS': '도착한 순서대로 실행하고, 한 번 잡으면 끝날 때까지 실행한다(비선점).',
    'SJF': 'CPU가 비면 준비 큐에서 <b>실행 시간이 가장 짧은</b> 프로세스를 골라 끝까지 실행한다(비선점). 실행 중에 더 짧은 프로세스가 와도 빼앗지 않는다.',
    'SRT': '새 프로세스가 도착하거나 실행이 끝날 때마다 <b>남은 실행 시간이 가장 짧은</b> 프로세스를 고른다. 더 짧은 것이 오면 실행 중인 것을 빼앗는다(선점).',
    'RR': '준비 큐 맨 앞 프로세스를 최대 타임 퀀텀(q)만큼 실행하고, 다 못 끝내면 큐 맨 뒤로 보낸다. 같은 시각에 새로 도착한 프로세스가 있으면 그 프로세스가 먼저 큐에 들어간다.',
}
NAME = {'FCFS': 'FCFS', 'SJF': '비선점 SJF', 'SRT': 'SRT(선점 SJF)', 'RR': 'RR'}

def sched(ps, alg, q=2):
    rem = {n: b for n, a, b in ps}; arr = {n: a for n, a, b in ps}; done = {}; t = 0; g = []; log = []
    def run(n, s, e):
        if g and g[-1][0] == n and g[-1][2] == s: g[-1] = (n, g[-1][1], e)
        else: g.append((n, s, e))
    ready = lambda: [n for n, a, b in ps if a <= t and n not in done]
    if alg in ('FCFS', 'SJF'):
        while len(done) < len(ps):
            rd = ready()
            if not rd: t = min(a for n, a, b in ps if n not in done); log.append('시각 %d까지 CPU 유휴' % t); continue
            n = rd[0] if alg == 'FCFS' else min(rd, key=lambda x: (rem[x], arr[x]))
            why = '가장 먼저 도착' if alg == 'FCFS' else '실행 시간이 가장 짧음'
            log.append('시각 %d: 대기 중 %s → <b>%s</b> 선택(%s), %d~%d 실행' % (t, ', '.join('%s(%d)' % (x, rem[x]) for x in rd), n, why, t, t + rem[n]))
            run(n, t, t + rem[n]); t += rem[n]; done[n] = t
    elif alg == 'SRT':
        events = sorted({a for _, a, _ in ps}); prev = None
        while len(done) < len(ps):
            rd = ready()
            if not rd: t += 1; continue
            n = min(rd, key=lambda x: (rem[x], arr[x]))
            if n != prev or t in events:
                arrived = [x for x, a, _ in ps if a == t]
                head = '시각 %d%s: 남은 시간 %s → <b>%s</b>' % (t, ' (%s 도착)' % ', '.join(arrived) if arrived and t else '', ', '.join('%s %d' % (x, rem[x]) for x in rd), n)
                if prev and prev != n and prev not in done: head += ' (%s 선점당함)' % prev
                if n != prev or arrived: log.append(head)
            prev = n
            run(n, t, t + 1); rem[n] -= 1; t += 1
            if rem[n] == 0: done[n] = t; prev = None
    else:
        queue, seen = [], set()
        def admit(upto):
            for n, a, b in ps:
                if a <= upto and n not in seen: seen.add(n); queue.append(n)
        admit(t)
        while len(done) < len(ps):
            if not queue: t += 1; admit(t); continue
            snap = list(queue); n = queue.pop(0); d = min(q, rem[n])
            log.append('시각 %d: 큐 [%s] → <b>%s</b> %d~%d 실행 (남은 %d → %d)' % (t, ', '.join(snap), n, t, t + d, rem[n], rem[n] - d))
            run(n, t, t + d); t += d; rem[n] -= d; admit(t)
            if rem[n]: queue.append(n)
            else: done[n] = t
    rows, wsum, tsum = [], 0, 0
    for n, a, b in ps:
        tat = done[n] - a; wt = tat - b; wsum += wt; tsum += tat
        rows.append([n, a, b, done[n], '%d − %d = %d' % (done[n], a, tat), '%d − %d = %d' % (tat, b, wt)])
    return wsum / len(ps), tsum / len(ps), g, log, rows, wsum, tsum

def sched_q(ps, alg, what='대기', q=2):
    res = {k: sched(ps, k, q) for k in ('FCFS', 'SJF', 'SRT', 'RR')}
    i = 0 if what == '대기' else 1
    vals = {k: fmt(res[k][i]) for k in res}
    avg, tavg, g, log, rows, ws, ts = res[alg]
    nm = NAME[alg] + ('(타임 퀀텀 %d)' % q if alg == 'RR' else '')
    desc = ', '.join('%s(도착 %d, 실행 %d)' % p for p in ps)
    tot = ws if what == '대기' else ts
    ex = ol('규칙 — ' + RULE[alg].replace('(q)', '(q = %d)' % q),
            '진행 과정<br>' + '<br>'.join(log),
            '프로세스별 계산 (반환 = 종료 − 도착, 대기 = 반환 − 실행)' + table(['프로세스', '도착', '실행', '종료', '반환', '대기'], rows),
            '평균 %s 시간 = %d / %d = <b>%s</b>' % (what, tot, len(ps), vals[alg])) \
        + tip('같은 입력에서 평균 %s 시간 — %s. 평균 대기 시간이 최소인 것은 SJF 계열(선점형은 SRT).' % (what, ', '.join('%s %s' % (NAME[k], vals[k]) for k in vals)))
    add(S, 'CPU 스케줄링', '%s를 <b>%s</b>로 스케줄링할 때 평균 %s 시간은?' % (desc, nm, what), vals[alg],
        [vals[k] for k in vals if k != alg] + [fmt(float(vals[alg]) + 1)], ex, gantt(g), nm + ' 간트 차트')

classic = [('P1', 0, 8), ('P2', 1, 4), ('P3', 2, 9), ('P4', 3, 5)]
for alg in ('FCFS', 'SJF', 'SRT'): sched_q(classic, alg)
sched_q([('P1', 0, 5), ('P2', 0, 3), ('P3', 0, 8)], 'RR', '반환', 4)
for alg in ['SJF', 'SRT', 'RR', 'FCFS', 'SRT', 'RR']:
    while True:
        arrs = sorted(Rn.sample(range(0, 6), 4)); arrs[0] = 0
        ps = [('P%d' % (i + 1), a, Rn.randint(2, 9)) for i, a in enumerate(arrs)]
        if len({fmt(sched(ps, k)[0]) for k in ('FCFS', 'SJF', 'SRT', 'RR')}) == 4: break
    sched_q(ps, alg)

# HRN
for jobs in [[('A', 5, 5), ('B', 8, 2), ('C', 12, 4), ('D', 20, 10)], [('A', 10, 5), ('B', 4, 4), ('C', 9, 3), ('D', 6, 6)]]:
    pr = {n: (w + s) / s for n, w, s in jobs}; best = max(pr, key=pr.get)
    add(S, 'CPU 스케줄링', 'HRN 스케줄링에서 가장 먼저 선택되는 작업은? (%s)' % ', '.join('%s 대기 %d·서비스 %d' % j for j in jobs), best, [n for n, _, _ in jobs if n != best],
        ol('HRN 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 — 값이 클수록 먼저.',
           table(['작업', '계산', '우선순위'], [[n, '(%d + %d) / %d' % (w, s, s), fmt(pr[n])] for n, w, s in jobs]),
           '가장 큰 값 → <b>%s</b>' % best)
        + tip('SJF는 긴 작업이 계속 밀리는 기아(starvation)가 생긴다. HRN은 기다린 시간이 분자에 들어가 오래 기다릴수록 우선순위가 올라가므로 이를 완화한다.'))

# ---------- 페이지 교체 ----------
def replace(ref, n, alg):
    slots = []; last = {}; states = []; faults = []; log = []
    for i, x in enumerate(ref):
        last_use = dict(last)
        if x in slots:
            faults.append(False)
        else:
            faults.append(True)
            if len(slots) < n: slots.append(x)
            else:
                if alg == 'FIFO': v = order.pop(0)
                elif alg == 'LRU': v = min(slots, key=lambda y: last_use[y])
                else:
                    fut = ref[i + 1:]; v = max(slots, key=lambda y: (fut.index(y) if y in fut else 99, -slots.index(y)))
                why = {'FIFO': '가장 먼저 들어옴', 'LRU': '가장 오래 전에 사용', 'OPT': '앞으로 가장 늦게 사용' if v in ref[i + 1:] else '앞으로 다시 안 쓰임'}[alg]
                log.append('%d 참조 → %s 교체(%s)' % (x, v, why))
                slots[slots.index(v)] = x
            if alg == 'FIFO': order.append(x)
        last[x] = i; states.append(list(slots))
        if i == 0 and alg == 'FIFO': pass
    return sum(faults), states, faults, log
def pr_q(ref, n, alg):
    global order
    res = {}
    for a in ('FIFO', 'LRU', 'OPT'):
        order = []; res[a] = replace(ref, n, a)
    order = []; cnt, states, faults, log = res[alg]
    rule = {'FIFO': '메모리에 <b>가장 먼저 들어온</b> 페이지를 내보낸다(큐).', 'LRU': '<b>가장 오랫동안 참조되지 않은</b> 페이지를 내보낸다(과거 기준).',
            'OPT': '<b>앞으로 가장 오랫동안 쓰이지 않을</b> 페이지를 내보낸다(미래 기준, 이론상 최소 부재).'}[alg]
    ex = ol('규칙 — ' + rule, '빈 프레임이 남아 있는 동안 들어오는 페이지도 부재(F)로 센다.',
            '교체가 일어난 지점<br>' + ('<br>'.join(log) if log else '없음'),
            '그림의 F를 세면 부재 <b>%d회</b>, 적중 %d회.' % (cnt, len(ref) - cnt)) \
        + tip('같은 참조열 — FIFO %d, LRU %d, OPT %d. OPT가 항상 최소지만 미래를 알아야 해서 구현할 수 없고 비교 기준으로만 쓴다. FIFO는 프레임을 늘렸는데 부재가 늘어나는 벨레이디의 모순이 생길 수 있다.' % tuple(res[a][0] for a in ('FIFO', 'LRU', 'OPT')))
    add(S, '페이지 교체', '참조열 %s, 프레임 %d개일 때 <b>%s</b>의 페이지 부재 횟수는?' % (' '.join(map(str, ref)), n, alg), cnt,
        [res[a][0] for a in res if a != alg] + [cnt + 1, cnt - 1], ex, frames_grid(ref, states, faults, n), '%s: 강조된 칸이 새로 적재된 페이지' % alg)
order = []
pr_q([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2], 3, 'FIFO')
pr_q([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2], 3, 'LRU')
pr_q([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2], 3, 'OPT')
for alg, n in [('FIFO', 3), ('LRU', 3), ('OPT', 3), ('LRU', 4), ('FIFO', 4)]:
    while True:
        r = [Rn.randint(0, 5) for _ in range(12)]
        if not all(a != b for a, b in zip(r, r[1:])): continue
        cs = set()
        for a in ('FIFO', 'LRU', 'OPT'): order = []; cs.add(replace(r, n, a)[0])
        if len(cs) == 3: break
    pr_q(r, n, alg)

# ---------- 은행원 알고리즘 ----------
def banker(total, procs):
    alloc = sum(a for _, m, a in procs); av = total - alloc
    need = {n: m - a for n, m, a in procs}; al = {n: a for n, m, a in procs}
    seq, log, left = [], [], [n for n, _, _ in procs]
    while left:
        for n in left:
            if need[n] <= av:
                log.append('가용 %d ≥ %s의 Need %d → %s 실행 후 반납: 가용 %d + %d = %d' % (av, n, need[n], n, av, al[n], av + al[n]))
                av += al[n]; seq.append(n); left.remove(n); break
        else: return None, log
    return seq, log
for total, procs in [(12, [('P0', 10, 5), ('P1', 4, 2), ('P2', 9, 2)]), (10, [('P0', 7, 3), ('P1', 5, 2), ('P2', 4, 1), ('P3', 3, 2)])]:
    seq, log = banker(total, procs); ans = ' → '.join(seq)
    alloc = sum(a for _, _, a in procs)
    wr = [' → '.join(p for p, _, _ in procs), ' → '.join(reversed(seq)), '안전 순서 없음(불안전 상태)']
    add(S, '교착 상태', '자원 %d개, %s일 때 은행원 알고리즘의 안전 순서는?' % (total, ', '.join('%s(최대 %d, 할당 %d)' % p for p in procs)), ans, wr,
        ol('가용 = 전체 − 할당 합 = %d − %d = <b>%d</b>' % (total, alloc, total - alloc),
           'Need = 최대 − 할당' + table(['프로세스', '최대', '할당', 'Need'], [[n, m, a, m - a] for n, m, a in procs]),
           'Need ≤ 가용인 프로세스를 하나씩 끝까지 실행시키고, 끝나면 할당했던 자원을 돌려받는다.<br>' + '<br>'.join(log),
           '모두 끝낼 수 있으므로 안전 상태, 안전 순서 <b>%s</b>' % ans)
        + tip('은행원 알고리즘은 교착 상태 <b>회피</b> 기법이다. 자원을 내주기 전에 "내줘도 안전 순서가 존재하는가"를 검사해서, 불안전해지는 요청은 미룬다.'))

add(S, '교착 상태', '교착 상태의 발생 필요 조건이 <b>아닌</b> 것은?', '선점(preemption)', ['상호 배제', '점유와 대기', '환형 대기'],
    ol('네 가지 필요 조건: <b>상호 배제</b>(한 번에 한 프로세스만 사용), <b>점유와 대기</b>(가진 채로 다른 것을 기다림), <b>비선점</b>(강제로 빼앗을 수 없음), <b>환형 대기</b>(원형으로 서로 기다림).',
       '넷이 동시에 성립해야 교착 상태가 생긴다. 선점이 가능하면 오히려 교착이 풀린다.')
    + table(['대책', '방법'], [['예방', '네 조건 중 하나를 원천 차단 (예: 자원에 번호를 매겨 순서대로만 요청 → 환형 대기 제거)'], ['회피', '은행원 알고리즘으로 안전 상태만 유지'], ['탐지·회복', '자원 할당 그래프로 사이클 탐지 후 프로세스 종료·자원 선점'], ['무시', '타조 알고리즘 — 드물면 무시 (일반 OS)']]))

# ---------- 주소 변환 ----------
for tlb, mem, hit in [(20, 100, 80), (10, 100, 90), (20, 80, 75), (5, 50, 95)]:
    h = hit / 100; eat = h * (tlb + mem) + (1 - h) * (tlb + 2 * mem)
    add(S, '가상 메모리', 'TLB 접근 %dns, 메모리 접근 %dns, TLB 적중률 %d%%일 때 유효 메모리 접근 시간(EAT)은? (1단계 페이지 테이블)' % (tlb, mem, hit),
        fmt(eat) + 'ns', [fmt(h * mem + (1 - h) * 2 * mem) + 'ns', fmt(tlb + mem) + 'ns', fmt(eat + mem) + 'ns'],
        ol('TLB 적중: TLB에서 프레임 번호를 바로 얻음 → TLB + 메모리 1회 = %d + %d = <b>%d</b>ns' % (tlb, mem, tlb + mem),
           'TLB 실패: TLB 확인 후 메모리의 페이지 테이블을 읽고, 다시 실제 데이터를 읽음 → %d + %d + %d = <b>%d</b>ns' % (tlb, mem, mem, tlb + 2 * mem),
           'EAT = %s × %d + %s × %d = %s + %s = <b>%sns</b>' % (fmt(h), tlb + mem, fmt(1 - h), tlb + 2 * mem, fmt(h * (tlb + mem)), fmt((1 - h) * (tlb + 2 * mem)), fmt(eat)))
        + tip('TLB 조회 시간을 무시하라는 조건이 있으면 TLB 항을 빼고 계산한다. 문제에서 "TLB와 메모리 동시 탐색" 같은 조건이 없는지 확인할 것.'))
for addr, size, label in [(0x12345678, 1 << 12, '4KB'), (0x00ABCDEF, 1 << 10, '1KB'), (0x7FFF3A20, 1 << 13, '8KB')]:
    ob = size.bit_length() - 1; pn, off = addr >> ob, addr & (size - 1)
    pw = (32 - ob + 3) // 4; owd = (ob + 3) // 4
    bits = format(addr, '032b')
    add(S, '가상 메모리', '32비트 논리 주소, 페이지 크기 %s일 때 논리 주소 0x%08X의 페이지 번호와 오프셋은?' % (label, addr),
        '0x%X / 0x%X' % (pn, off), ['0x%X / 0x%X' % (addr >> (ob + 4), addr & ((size << 4) - 1)), '0x%X / 0x%X' % (addr >> (ob - 4), addr & ((size >> 4) - 1)), '0x%X / 0x%X' % (off, pn)],
        ol('페이지 크기 %s = 2^%d → 하위 <b>%d비트</b>가 오프셋(페이지 안 위치), 상위 %d비트가 페이지 번호.' % (label, ob, ob, 32 - ob),
           '주소를 2진수로 펼쳐 %d비트 지점에서 자른다(그림).' % ob,
           '페이지 번호 = 주소 ÷ %d = 0x%X, 오프셋 = 주소 mod %d = 0x%X' % (size, pn, size, off),
           '페이지 테이블 항목 수 = 2^%d개' % (32 - ob))
        + tip('페이지 크기가 4KB(2^12)처럼 16진수 자릿수(4비트)에 딱 맞으면 뒤 3자리를 그냥 떼면 된다. 1KB(2^10)처럼 안 맞으면 2진수로 펼쳐서 잘라야 한다.'),
        bitcells(bits, [(0, 32 - ob, 'h', '페이지 번호 %d비트' % (32 - ob)), (32 - ob, 32, 'n', '오프셋 %d비트' % ob)]), '0x%08X를 2진수로 펼친 모습' % addr)

# ---------- 디스크 스케줄링 ----------
def disk(head, reqs, alg):
    pos, rest, path = head, list(reqs), [head]
    if alg == 'FCFS': path += rest
    elif alg == 'SSTF':
        while rest: nx = min(rest, key=lambda r: abs(r - pos)); rest.remove(nx); path.append(nx); pos = nx
    elif alg == 'SCAN':  # 0 방향으로 먼저
        path += sorted([r for r in rest if r <= head], reverse=True) + [0] + sorted(r for r in rest if r > head)
    elif alg == 'LOOK':
        path += sorted([r for r in rest if r <= head], reverse=True) + sorted(r for r in rest if r > head)
    return path, sum(abs(a - b) for a, b in zip(path, path[1:]))
def disk_fig(path):
    W, sc = 520, 500 / 199; b = L(10, 14, 510, 14, 'e')
    for t in (0, 50, 100, 150, 199): b += T(10 + t * sc, 6, t, 'sm')
    pts = [(10 + p * sc, 26 + i * 20) for i, p in enumerate(path)]
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]): b += L(x1, y1, x2, y2, 'ha')
    for (x, y), p in zip(pts, path): b += C(x, y, 3, 'fill') + T(x + 16, y - 6, p, 'sm')
    return svg(W, 36 + len(path) * 20, b)
for head, reqs, alg in [(53, [98, 183, 37, 122, 14, 124, 65, 67], 'SSTF'), (53, [98, 183, 37, 122, 14, 124, 65, 67], 'FCFS'),
                        (53, [98, 183, 37, 122, 14, 124, 65, 67], 'SCAN'), (100, [55, 58, 39, 18, 90, 160, 150, 38, 184], 'SSTF'), (100, [55, 58, 39, 18, 90, 160, 150, 38, 184], 'LOOK')]:
    path, tot = disk(head, reqs, alg); others = {a: disk(head, reqs, a)[1] for a in ('FCFS', 'SSTF', 'SCAN', 'LOOK')}
    rule = {'FCFS': '요청이 들어온 순서대로', 'SSTF': '현재 위치에서 <b>가장 가까운</b> 요청부터', 'SCAN': '한 방향(여기선 0 쪽)으로 <b>끝(0번 트랙)까지</b> 가며 처리한 뒤 방향을 바꿈 (엘리베이터)', 'LOOK': 'SCAN과 같지만 끝까지 가지 않고 <b>마지막 요청에서</b> 방향을 바꿈 (여기선 0 쪽 먼저)'}[alg]
    add(S, '디스크 스케줄링', '헤드 위치 %d, 요청 큐 %s일 때 <b>%s</b>의 총 헤드 이동 거리는? (트랙 0~199%s)' % (head, ' '.join(map(str, reqs)), alg, ', 0 방향 먼저' if alg in ('SCAN', 'LOOK') else ''),
        tot, [v for a, v in others.items() if a != alg] + [tot + 10, tot - 12],
        ol('규칙 — ' + rule + '.', '방문 순서: ' + ' → '.join(map(str, path)),
           '이동 거리: ' + ' + '.join(str(abs(a - b)) for a, b in zip(path, path[1:])) + ' = <b>%d</b>' % tot)
        + tip('같은 큐 — ' + ', '.join('%s %d' % kv for kv in others.items()) + '. SSTF는 평균 성능이 좋지만 멀리 있는 요청이 계속 밀리는 기아가 생길 수 있다. C-SCAN은 한 방향으로만 처리하고 처음으로 돌아가 대기 시간을 균등하게 한다.'),
        disk_fig(path), '%s 헤드 이동 경로' % alg)
