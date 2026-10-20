from lib import *
import random, math, ipaddress
Rn = random.Random(4040)
S = 'net'

# ---------- 서브넷: 네트워크·브로드캐스트 ----------
fixed = [('172.16.45.130', 27), ('192.168.10.77', 26), ('10.20.30.200', 29)]
rand = [('10.%d.%d.%d' % (Rn.randint(0, 255), Rn.randint(0, 255), Rn.randint(1, 254)), Rn.choice([25, 26, 27, 28, 29, 30])) for _ in range(4)]
for ip, pre in fixed + rand:
    net = ipaddress.ip_network('%s/%d' % (ip, pre), strict=False); blk = 2 ** (32 - pre); last = int(ip.split('.')[-1])
    hb = 32 - pre; nb = 8 - hb; mask_last = (0xff << hb) & 0xff
    wn = ipaddress.ip_network('%s/%d' % (ip, pre + 1 if pre < 30 else pre - 1), strict=False)
    o = ['%s / %s' % (net.network_address, net.broadcast_address), '%s / %s' % (wn.network_address, wn.broadcast_address),
         '%s / %s' % (net.network_address + 1, net.broadcast_address - 1), '%s / %s' % (net.network_address, net.broadcast_address + blk)]
    lb = format(last, '08b')
    add(S, '서브네팅', '%s/%d이 속한 네트워크 주소와 브로드캐스트 주소는?' % (ip, pre), o[0], o[1:],
        ol('/%d → 앞 %d비트가 네트워크, 뒤 %d비트가 호스트. 서브넷 마스크 마지막 옥텟 = %s = %d' % (pre, pre, hb, format(mask_last, '08b'), mask_last),
           '마지막 옥텟 %d = %s₂ (그림). 호스트 비트(뒤 %d비트)를 <b>모두 0</b>으로 → %s = <b>%d</b> → 네트워크 주소 %s' % (last, lb, hb, lb[:nb] + '0' * hb, int(lb[:nb] + '0' * hb, 2), net.network_address),
           '호스트 비트를 <b>모두 1</b>로 → %s = <b>%d</b> → 브로드캐스트 %s' % (lb[:nb] + '1' * hb, int(lb[:nb] + '1' * hb, 2), net.broadcast_address),
           '빠른 방법: 블록 크기 = 2^%d = %d. %d를 %d의 배수로 내림 → %d, 다음 블록 시작 − 1 → %d' % (hb, blk, last, blk, last // blk * blk, last // blk * blk + blk - 1),
           '사용 가능한 호스트: %s ~ %s (%d개)' % (net.network_address + 1, net.broadcast_address - 1, blk - 2))
        + tip('호스트 수 = 2^(호스트 비트) − 2 (네트워크 주소·브로드캐스트 주소 제외). /31·/32는 예외적 용도.'),
        bitcells(lb, [(0, nb, 'h', '네트워크 %d비트' % nb), (nb, 8, 'n', '호스트 %d비트' % hb)]) if nb else None, '마지막 옥텟 %d의 비트 구성' % last)
for base, need in [(24, 5), (24, 3), (24, 10), (16, 50), (24, 6)]:
    b = math.ceil(math.log2(need)); p = base + b; hosts = 2 ** (32 - p) - 2
    add(S, '서브네팅', '/%d 네트워크를 서브넷 <b>%d개 이상</b>으로 똑같이 나눌 때 서브넷 마스크 길이와 서브넷당 사용 가능한 호스트 수는?' % (base, need),
        '/%d, %d개' % (p, hosts), ['/%d, %d개' % (p, hosts + 2), '/%d, %d개' % (p + 1, 2 ** (31 - p) - 2), '/%d, %d개' % (p - 1, 2 ** (33 - p) - 2)],
        ol('서브넷 k개를 만들려면 호스트 부분에서 n비트를 빌려 2^n ≥ k가 되게 한다.', '2^%d = %d < %d, 2^%d = %d ≥ %d → <b>%d비트</b> 빌림' % (b - 1, 2 ** (b - 1), need, b, 2 ** b, need, b),
           '마스크 = /%d + %d = <b>/%d</b>' % (base, b, p), '남은 호스트 비트 = 32 − %d = %d → 2^%d − 2 = <b>%d개</b>' % (p, 32 - p, 32 - p, hosts))
        + tip('반대로 "서브넷당 호스트 h개 이상"이 조건이면 2^m − 2 ≥ h인 최소 호스트 비트 m을 먼저 구한다.'),
        bitfields([('기존 네트워크', base, None, 'g'), ('서브넷', b, None, 'h'), ('호스트', 32 - p, None, 'n')]), '32비트 주소의 분할')
for pre in (26, 28):
    add(S, '서브네팅', '/%d 서브넷 하나에서 호스트에 할당할 수 있는 주소 수는?' % pre, 2 ** (32 - pre) - 2, [2 ** (32 - pre), 2 ** (33 - pre) - 2, 2 ** (31 - pre) - 2],
        ol('호스트 비트 = 32 − %d = %d' % (pre, 32 - pre), '주소 2^%d = %d개 중 네트워크 주소와 브로드캐스트 주소 2개 제외 → <b>%d</b>' % (32 - pre, 2 ** (32 - pre), 2 ** (32 - pre) - 2))
        + table(['프리픽스', '마스크 마지막 옥텟', '블록', '호스트'], [['/%d' % q, 256 - 2 ** (32 - q), 2 ** (32 - q), 2 ** (32 - q) - 2] for q in range(25, 31)]))

# ---------- 오류 제어 ----------
for m in [8, 4, 16, 32]:
    p = next(p for p in range(1, 10) if 2 ** p >= m + p + 1)
    add(S, '오류 제어', '데이터 비트 %d개를 해밍 코드로 보낼 때 필요한 최소 패리티 비트 수는?' % m, p, [p - 1, p + 1, m // 2],
        ol('패리티 p비트로 가리킬 수 있는 위치는 2^p가지. "오류 없음" 1가지 + 전체 비트(m + p) 중 오류 위치를 모두 구분해야 하므로 <b>2^p ≥ m + p + 1</b>.',
           table(['p', '2^p', 'm + p + 1', '만족?'], [[k, 2 ** k, m + k + 1, '✓' if 2 ** k >= m + k + 1 else '✗'] for k in range(max(1, p - 2), p + 1)]),
           '최소 p = <b>%d</b>, 전체 코드 길이 %d비트' % (p, m + p))
        + tip('패리티 비트는 2의 거듭제곱 위치(1, 2, 4, 8, …)에 둔다. 최소 해밍 거리 d인 코드는 d − 1비트 오류 검출, ⌊(d − 1) / 2⌋비트 오류 정정.'))
for d in [3, 5, 7]:
    add(S, '오류 제어', '최소 해밍 거리가 %d인 코드가 검출할 수 있는 오류 비트 수와 정정할 수 있는 오류 비트 수는?' % d, '검출 %d, 정정 %d' % (d - 1, (d - 1) // 2),
        ['검출 %d, 정정 %d' % (d, d // 2 + 1), '검출 %d, 정정 %d' % ((d - 1) // 2, d - 1), '검출 %d, 정정 %d' % (d - 1, d - 1)],
        ol('해밍 거리: 두 코드워드에서 서로 다른 비트 수. 최소 해밍 거리 d = 유효한 코드워드끼리 가장 가까운 거리.', '검출: d − 1비트까지 바뀌어도 다른 유효 코드가 되지 않는다 → <b>%d</b>' % (d - 1),
           '정정: 받은 값이 원래 코드에 가장 가까우려면 오류가 거리의 절반 미만 → ⌊(d − 1) / 2⌋ = <b>%d</b>' % ((d - 1) // 2)))
def crc(d, g):
    r = list(map(int, d + '0' * (len(g) - 1))); gg = list(map(int, g)); lines = []
    for i in range(len(r) - len(gg) + 1):
        if r[i]:
            lines.append(' ' * i + ''.join(map(str, r[i:i + len(gg)])) + '\n' + ' ' * i + g + '  XOR')
            for j in range(len(gg)): r[i + j] ^= gg[j]
    rem = ''.join(map(str, r[-(len(g) - 1):]))
    return rem, '\n'.join(lines)
for d, g, poly in [('1101011011', '10011', 'x⁴ + x + 1'), ('101101', '1101', 'x³ + x² + 1'), ('11100110', '1011', 'x³ + x + 1')]:
    r, work = crc(d, g); wr = sorted({r[:i] + str(1 - int(r[i])) + r[i + 1:] for i in range(len(r))})[:3]
    add(S, '오류 제어', '데이터 %s를 생성 다항식 %s(%s)로 CRC를 계산할 때 붙는 나머지(FCS)는?' % (d, g, poly), r, wr,
        ol('생성 다항식의 차수 = %d → 데이터 뒤에 0을 %d개 붙인다: %s' % (len(g) - 1, len(g) - 1, d + '0' * (len(g) - 1)),
           '모듈로-2 나눗셈: 맨 앞 비트가 1인 자리마다 생성 다항식을 XOR (자리올림·빌림 없음)<pre><code>%s</code></pre>' % work,
           '마지막 %d비트가 나머지 → <b>%s</b>' % (len(g) - 1, r), '송신 비트열 = 데이터 + 나머지 = %s. 수신 측이 같은 다항식으로 나눠 나머지가 0이면 오류 없음.' % (d + r))
        + tip('CRC는 연집(burst) 오류 검출에 강하다. 패리티는 홀수 개 오류만, 체크섬은 합산 기반.'))
for bits, kind in [('1011001', '짝수'), ('1101101', '홀수'), ('0110100', '짝수')]:
    ones = bits.count('1'); pb = (ones % 2) if kind == '짝수' else 1 - ones % 2
    add(S, '오류 제어', '7비트 데이터 %s에 <b>%s</b> 패리티 비트를 붙인다면 패리티 비트 값은?' % (bits, kind), pb, [1 - pb],
        ol('1의 개수를 센다: %d개' % ones, '%s 패리티는 패리티를 포함한 전체 1의 개수를 %s로 맞춘다 → 패리티 <b>%d</b>' % (kind, kind, pb))
        + tip('패리티는 1비트 오류 검출만 가능(정정 불가). 2비트가 동시에 바뀌면 검출 못 한다.'))

# ---------- TCP ----------
def hs_fig(c, s):
    b = T(80, 12, '클라이언트') + T(400, 12, '서버') + L(80, 22, 80, 190) + L(400, 22, 400, 190)
    for i, (txt, right) in enumerate([('SYN  seq=%d' % c, True), ('SYN+ACK  seq=%d, ack=%d' % (s, c + 1), False), ('ACK  seq=%d, ack=%d' % (c + 1, s + 1), True)]):
        y1 = 36 + i * 50; y2 = y1 + 34
        b += L(80, y1, 400, y2, 'ha') if right else L(400, y1, 80, y2, 'ha')
        b += T(240, (y1 + y2) / 2 - 10, txt, 'sm')
    return svg(480, 196, b)
for c, s in [(100, 300), (2000, 7000)]:
    add(S, 'TCP', '클라이언트가 SYN(seq = %d)을 보냈고 서버의 초기 순서 번호는 %d다. 3-way handshake의 세 번째 ACK 세그먼트의 seq와 ack 번호는?' % (c, s),
        'seq = %d, ack = %d' % (c + 1, s + 1), ['seq = %d, ack = %d' % (c, s), 'seq = %d, ack = %d' % (c + 1, s), 'seq = %d, ack = %d' % (s + 1, c + 1)],
        ol('SYN과 FIN은 데이터가 없어도 순서 번호 <b>1개를 소비</b>한다.', '① SYN: seq = %d' % c, '② SYN+ACK: seq = %d(서버 초기값), ack = %d + 1 = %d ("다음에 받을 번호")' % (s, c, c + 1),
           '③ ACK: seq = %d, ack = %d + 1 = <b>%d</b>' % (c + 1, s, s + 1))
        + tip('연결 종료는 4-way handshake: FIN → ACK → FIN → ACK. 먼저 끊은 쪽은 TIME_WAIT 상태로 잠시 기다린다(늦게 온 패킷 처리).'),
        hs_fig(c, s), '3-way handshake')
add(S, 'TCP', 'TCP와 UDP에 대한 설명으로 옳지 <b>않은</b> 것은?', 'UDP는 흐름 제어와 혼잡 제어를 제공한다', ['TCP는 연결 지향이고 순서·신뢰성을 보장한다', 'UDP는 헤더가 8바이트로 작고 오버헤드가 적다', 'DNS 질의와 실시간 스트리밍에는 주로 UDP를 쓴다'],
    table(['', 'TCP', 'UDP'], [['연결', '연결 지향(3-way handshake)', '비연결'], ['신뢰성', '재전송·순서 보장', '없음'], ['제어', '흐름 제어(슬라이딩 윈도우)·혼잡 제어', '없음'], ['헤더', '20바이트 이상', '8바이트'], ['용도', 'HTTP, 메일, 파일 전송', 'DNS, 스트리밍, 게임, VoIP']])
    + tip('혼잡 제어: 느린 시작(지수 증가) → 임계값 이후 혼잡 회피(선형 증가) → 손실 시 윈도우 감소.'))

# ---------- 개념 ----------
add(S, '프로토콜', '프로토콜과 기본 포트 번호의 짝이 <b>잘못된</b> 것은?', 'SSH – 23', ['HTTPS – 443', 'DNS – 53', 'SMTP – 25'],
    table(['프로토콜', '포트', '프로토콜', '포트'], [['FTP', '20(데이터), 21(제어)', 'HTTP', '80'], ['SSH', '<b>22</b>', 'POP3', '110'], ['Telnet', '23', 'IMAP', '143'], ['SMTP', '25', 'HTTPS', '443'], ['DNS', '53', 'SNMP', '161'], ['DHCP', '67, 68', 'RDP', '3389']])
    + tip('0~1023은 잘 알려진 포트(well-known). Telnet은 평문 전송이라 SSH로 대체됐다.'))
add(S, '프로토콜', 'IP 주소로 MAC 주소를 알아내는 프로토콜은?', 'ARP', ['RARP', 'ICMP', 'DHCP'],
    ol('같은 네트워크 안에서 실제 전달은 MAC 주소로 한다. IP만 알 때 "이 IP 가진 장비 누구?"를 브로드캐스트로 묻고, 주인이 자기 MAC을 응답(유니캐스트).', '결과는 ARP 캐시에 저장해 재사용.')
    + table(['프로토콜', '역할'], [['ARP', 'IP → MAC'], ['RARP', 'MAC → IP (지금은 DHCP가 대체)'], ['ICMP', '오류 보고·진단 (ping, traceroute)'], ['IGMP', '멀티캐스트 그룹 관리'], ['DHCP', 'IP 주소 자동 할당']])
    + tip('ARP 스푸핑: 가짜 ARP 응답으로 다른 호스트의 MAC을 사칭해 트래픽을 가로챈다.'))
add(S, 'OSI 계층', 'OSI 7계층에서 라우터가 동작하는 계층과 그 계층의 데이터 단위(PDU)는?', '네트워크 계층 / 패킷', ['데이터 링크 계층 / 프레임', '전송 계층 / 세그먼트', '물리 계층 / 비트'],
    table(['계층', 'PDU', '장비·프로토콜'], [['7 응용', '데이터(메시지)', 'HTTP, FTP, SMTP, DNS'], ['6 표현', '', '암호화, 압축, 코드 변환 (JPEG, SSL)'], ['5 세션', '', '대화 제어, 동기화'], ['4 전송', '세그먼트', 'TCP, UDP / 게이트웨이'],
                                   ['3 네트워크', '<b>패킷</b>', 'IP, ICMP, ARP / <b>라우터</b>, L3 스위치'], ['2 데이터 링크', '프레임', '이더넷, MAC / 스위치, 브리지'], ['1 물리', '비트', '케이블 / 허브, 리피터']])
    + tip('TCP/IP 4계층: 네트워크 접근(1·2) – 인터넷(3) – 전송(4) – 응용(5·6·7).'))
add(S, 'OSI 계층', '유선 이더넷과 무선 LAN의 매체 접근 제어 방식을 바르게 짝지은 것은?', 'CSMA/CD / CSMA/CA', ['CSMA/CA / CSMA/CD', '토큰 링 / CSMA/CD', 'CSMA/CD / 토큰 버스'],
    ol('CSMA: 보내기 전에 매체가 비었는지 듣는다(Carrier Sense).', '유선(CD, Collision Detection): 보내면서 충돌을 감지하면 중단하고 임의 시간 뒤 재전송(지수 백오프).',
       '무선(CA, Collision Avoidance): 송신 중 충돌 감지가 어렵고 숨은 노드 문제가 있어, 임의 대기·RTS/CTS·ACK로 충돌을 미리 피한다.'))
add(S, '프로토콜', 'IPv6 주소의 길이는?', '128비트', ['32비트', '64비트', '48비트'],
    ol('IPv4 32비트(약 43억 개) 주소 고갈 → IPv6 <b>128비트</b>, 16비트씩 8개 그룹을 16진수로 표기(2001:db8::1).', '연속된 0 그룹은 :: 로 한 번만 생략 가능.')
    + table(['', 'IPv4', 'IPv6'], [['길이', '32비트', '128비트'], ['헤더', '가변(20~60바이트), 체크섬 있음', '고정 40바이트, 체크섬 없음'], ['브로드캐스트', '있음', '없음(멀티캐스트·애니캐스트)'], ['전환 기술', '', '듀얼 스택, 터널링, 주소 변환']])
    + tip('MAC 주소는 48비트, 포트 번호는 16비트(0~65535).'))
