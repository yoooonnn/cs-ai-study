TOPICS.net = [
  {
    id:'net-layers', title: 'OSI·TCP/IP 계층', advanced: true,
    summary: R`통신 문제를 <strong>계층</strong>으로 분리
각 계층은 아래 계층 서비스만 이용
송신: 헤더 추가(캡슐화) / 수신: 하나씩 제거`,
    body: R`
<h3>왜 계층으로 나누는가</h3>
<p>"서울의 노트북에서 실행 중인 브라우저가 미국 서버의 프로그램과 대화한다"는 문제에는 전기 신호, 같은 망 안의 전달, 여러 망을 건너는 경로 찾기, 손실 복구, 메시지 해석이 모두 섞여 있다. 계층화는 이를 독립적인 문제로 나눈다. 각 계층은 <strong>바로 아래 계층이 제공하는 서비스만 믿고</strong> 자기 일을 한다. 그래서 Wi-Fi를 LTE로 바꿔도 HTTP 코드를 고칠 필요가 없고, 새 응용 프로토콜을 만들 때 라우터를 바꿀 필요가 없다.</p>
<h3>TCP/IP 모델과 OSI 7계층</h3>
<table><tr><th>TCP/IP</th><th>OSI</th><th>하는 일</th><th>주소 / 단위</th><th>예</th></tr>
<tr><td>응용</td><td>응용·표현·세션</td><td>응용 프로그램 간의 메시지 형식과 의미</td><td>(URL 등) / 메시지</td><td>HTTP, DNS, SMTP</td></tr>
<tr><td>전송</td><td>전송</td><td><strong>프로세스 간</strong> 전달, 필요하면 신뢰성·순서 보장</td><td>포트 / 세그먼트·데이터그램</td><td>TCP, UDP</td></tr>
<tr><td>네트워크(인터넷)</td><td>네트워크</td><td><strong>호스트 간</strong> 전달, 여러 망을 건너는 경로 찾기</td><td>IP 주소 / 패킷</td><td>IP, ICMP</td></tr>
<tr><td>링크</td><td>데이터 링크·물리</td><td><strong>같은 링크의 다음 장비</strong>까지 전달</td><td>MAC 주소 / 프레임</td><td>이더넷, Wi-Fi</td></tr></table>
<p>OSI의 표현(인코딩·암호화)·세션(대화 관리) 계층은 TCP/IP에서는 응용이 직접 처리한다. TLS처럼 어느 계층이라고 딱 잘라 말하기 애매한 프로토콜도 있다 — 모델은 현실을 설명하는 틀이지 법칙이 아니다.</p>
<h3>캡슐화와 세 가지 주소</h3>
<p>보내는 쪽에서 응용 데이터에 TCP 헤더(포트, 순서 번호)가 붙어 세그먼트가 되고, IP 헤더(출발지·목적지 IP, TTL)가 붙어 패킷이 되고, 이더넷 헤더(출발지·목적지 MAC)가 붙어 프레임이 된다. 받는 쪽은 아래 계층부터 헤더를 확인하고 벗겨 위로 올린다.</p>
<ul>
<li><strong>MAC 주소</strong>: 같은 링크 안에서 "다음에 받을 장비". 라우터를 지날 때마다 <strong>바뀐다</strong>.</li>
<li><strong>IP 주소</strong>: 최종 목적지 호스트. 경로 내내 <strong>유지된다</strong>(NAT를 거치는 경우 제외). 라우터는 TTL만 1씩 줄인다.</li>
<li><strong>포트 번호</strong>: 그 호스트 안의 어느 프로세스(소켓)인지.</li>
</ul>
<p>같은 망 안에서 IP 주소에 해당하는 MAC 주소는 ARP로 알아낸다.</p>
<h3>종단 간 원칙</h3>
<p>IP는 패킷을 "최선을 다해" 전달할 뿐 손실·중복·순서 뒤바뀜을 책임지지 않는다. 신뢰성 같은 기능은 네트워크 중간이 아니라 <strong>양 끝(종단)</strong>에서 구현하는 것이 낫다는 설계 원칙 때문이다. 어차피 종단에서 최종 확인을 해야 하고, 중간 장비를 단순하게 두어야 네트워크가 확장되고 새로운 응용이 자유롭게 생긴다. 그래서 신뢰성은 종단의 TCP가 담당한다. 실제 인터넷에는 NAT, 방화벽, 로드 밸런서처럼 계층을 넘나드는 장비들도 많다.</p>
<h3>프로그래머가 만나는 경계: 소켓</h3>
<p>응용 프로그램은 운영체제의 <strong>소켓 API</strong>를 통해 전송 계층을 사용한다. 그 아래(TCP, IP, 드라이버)는 커널과 네트워크 카드가 처리한다. <code>requests.get()</code> 한 줄 아래에서 위의 모든 계층이 동작한다.</p>`,
    analogy: R`<p>국제 택배. 물건(데이터)을 상자에 넣고 수취인 이름(포트)을 쓰고, 그 상자를 송장이 붙은 큰 박스(IP: 최종 주소)에 넣는다. 지역 운송 트럭(링크)은 "다음 물류 센터까지"만 책임지므로, 센터마다 트럭 배차표(MAC 헤더)는 새로 붙지만 송장의 최종 주소는 그대로다. 물건을 보내는 사람은 트럭이 어떤 길로 가는지 몰라도 되고, 트럭 기사는 상자 안 물건이 무엇인지 몰라도 된다.</p>`,
    diagram: { caption: '캡슐화: 내려갈수록 각 계층의 헤더가 앞에 붙는다. 받는 쪽은 아래 계층부터 하나씩 벗긴다.', svg: R`
<svg viewBox="0 0 560 200" width="560">
<text x="55" y="35">응용</text><text x="55" y="80">전송</text><text x="55" y="125">네트워크</text><text x="55" y="170">링크</text>
<rect class="n" x="330" y="20" width="120" height="30"/><text x="390" y="35" class="sm">데이터</text>
<rect class="h" x="260" y="65" width="70" height="30"/><text x="295" y="80" class="sm">TCP</text>
<rect class="n" x="330" y="65" width="120" height="30"/><text x="390" y="80" class="sm">데이터</text>
<rect class="h" x="190" y="110" width="70" height="30"/><text x="225" y="125" class="sm">IP</text>
<rect class="h" x="260" y="110" width="70" height="30"/><text x="295" y="125" class="sm">TCP</text>
<rect class="n" x="330" y="110" width="120" height="30"/><text x="390" y="125" class="sm">데이터</text>
<rect class="h" x="120" y="155" width="70" height="30"/><text x="155" y="170" class="sm">이더넷</text>
<rect class="h" x="190" y="155" width="70" height="30"/><text x="225" y="170" class="sm">IP</text>
<rect class="h" x="260" y="155" width="70" height="30"/><text x="295" y="170" class="sm">TCP</text>
<rect class="n" x="330" y="155" width="120" height="30"/><text x="390" y="170" class="sm">데이터</text>
<rect class="g" x="450" y="155" width="40" height="30"/><text x="470" y="170" class="sm">FCS</text>
<text x="500" y="35" class="st sm">메시지</text><text x="500" y="80" class="st sm">세그먼트</text><text x="500" y="125" class="st sm">패킷</text>
<text x="225" y="196" class="sm">포트 → IP 주소 → MAC 주소</text>
</svg>` },
    code: R`
import struct

def checksum(data: bytes) -> int:                  # 인터넷 체크섬: 16비트 단위 1의 보수 합
  if len(data) % 2:
      data += b"\0"
  s = sum(struct.unpack(f"!{len(data) // 2}H", data))
  while s >> 16:
      s = (s & 0xFFFF) + (s >> 16)
  return ~s & 0xFFFF

payload = b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n"                            # 응용 계층
tcp = struct.pack("!HHIIBBHHH", 51000, 80, 1000, 0, 5 << 4, 0x18, 65535, 0, 0)       # 전송: 포트·순서 번호
segment = tcp + payload
ip_hdr = struct.pack("!BBHHHBBH4s4s", (4 << 4) | 5, 0, 20 + len(segment), 1, 0, 64, 6, 0,
                   bytes([192, 168, 0, 10]), bytes([203, 0, 113, 10]))              # 네트워크: IP 주소·TTL
ip_hdr = ip_hdr[:10] + struct.pack("!H", checksum(ip_hdr)) + ip_hdr[12:]
packet = ip_hdr + segment
frame = bytes.fromhex("aabbccddeeff112233445566") + struct.pack("!H", 0x0800) + packet  # 링크: MAC 주소

print(f"메시지 {len(payload)}B → 세그먼트 {len(segment)}B → 패킷 {len(packet)}B → 프레임 {len(frame)}B")

# 받는 쪽: 아래 계층부터 헤더를 하나씩 확인하고 벗긴다
eth_type = struct.unpack("!H", frame[12:14])[0]
ip = frame[14:]
ver_ihl, _, total, _, _, ttl, proto, _, src, dst = struct.unpack("!BBHHHBBH4s4s", ip[:20])
print(f"이더넷 타입 0x{eth_type:04x} (IPv4) | IP v{ver_ihl >> 4}, TTL {ttl}, 프로토콜 {proto} (6 = TCP)")
print(f"  {'.'.join(map(str, src))} → {'.'.join(map(str, dst))}, 헤더 체크섬 검증: {checksum(ip[:20]) == 0}")
sport, dport = struct.unpack("!HH", ip[20:24])
data_offset = (ip[32] >> 4) * 4
first_line = ip[20 + data_offset:].split(b"\r\n")[0]
print(f"TCP 포트 {sport} → {dport} | 응용 데이터 첫 줄: {first_line.decode()}")
`,
    links: [
      { to: 'net-tcp', why: '전송 계층: 프로세스 간 신뢰성 있는 바이트 스트림' },
      { to: 'net-ip', why: '네트워크 계층: 주소 체계와 서브넷' },
      { to: 'net-http', why: '응용 계층의 대표 프로토콜' },
      { to: 'os-syscall', why: '소켓 API = 응용과 커널(전송 계층) 사이의 시스템 콜' },
      { to: 'se-principle', why: '계층화는 낮은 결합도·높은 응집도라는 설계 원칙의 대표 사례' },
    ],
    quiz: [
      { q: '노트북의 연결을 Wi-Fi에서 유선 이더넷으로 바꿔도 웹 브라우저 코드를 고칠 필요가 없는 이유는?',
        options: ['브라우저가 모든 네트워크 종류를 직접 지원해서', '각 계층이 아래 계층의 서비스만 이용하도록 분리되어 있어, 링크 계층이 바뀌어도 위 계층의 인터페이스는 그대로이기 때문', 'Wi-Fi와 이더넷은 같은 기술이라서'], answer: 1,
        explain: '계층화의 핵심 이점이다. 각 계층은 인터페이스(서비스)만 지키면 내부 구현을 자유롭게 바꿀 수 있다.' },
      { q: '패킷이 라우터 3개를 지나 목적지에 도착할 때, 일반적으로(NAT 없음) 경로 내내 바뀌지 <strong>않는</strong> 것은?',
        options: ['출발지·목적지 MAC 주소', '출발지·목적지 IP 주소', 'TTL 값', '링크 계층 헤더 전체'], answer: 1,
        explain: 'MAC 주소는 "이번 링크의 다음 장비"라 홉마다 새로 붙고, TTL은 라우터마다 1씩 줄어든다. IP 주소는 종단을 나타내므로 유지된다.' },
      { q: 'IP가 패킷 손실·순서를 보장하지 않고 이를 TCP(종단)에 맡기는 설계의 근거로 가장 적절한 것은?',
        options: ['IP를 만든 사람들이 신뢰성을 중요하게 생각하지 않아서', '중간 장비에서 신뢰성을 보장해도 결국 종단에서 최종 확인이 필요하고, 중간을 단순하게 두어야 확장성과 다양한 응용(신뢰성이 필요 없는 실시간 통신 등)을 지원할 수 있기 때문', '라우터는 패킷을 저장할 수 없어서'], answer: 1,
        explain: '종단 간 원칙. 덕분에 신뢰성이 필요 없는 응용은 UDP를 쓰고, 필요한 응용은 TCP를 쓰는 선택이 가능하다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 1장', 'Saltzer, Reed & Clark, "End-to-End Arguments in System Design" (1984)', 'Julia Evans, 「Networking! ACK!」(진 형식의 입문 자료)'],
  },
  {
    id:'net-tcp', title: 'TCP 연결과 신뢰성', advanced: true,
    summary: R`불안정한 IP 위에 <strong>빠짐없고 순서대로인 바이트 스트림</strong>
핵심: 순서 번호·ACK·재전송·슬라이딩 윈도우·3-way 핸드셰이크`,
    body: R`
<h3>IP가 주는 것과 TCP가 만드는 것</h3>
<p>IP 패킷은 사라지거나, 두 번 도착하거나, 순서가 바뀌거나, 비트가 손상될 수 있다. TCP는 이 위에서 응용에게 "보낸 바이트가 빠짐없이, 순서대로 도착하는 파이프"를 제공한다.</p>
<ul>
<li><strong>체크섬</strong>: 손상된 세그먼트를 버린다.</li>
<li><strong>순서 번호</strong>: 세그먼트가 아니라 <strong>바이트</strong>마다 번호를 매긴다. 수신자는 번호로 순서를 맞추고 중복을 걸러낸다.</li>
<li><strong>누적 ACK</strong>: "다음에 받을 바이트 번호는 N"이라고 알린다. N 이전은 모두 잘 받았다는 뜻이다.</li>
<li><strong>재전송</strong>: 일정 시간(RTO) 안에 ACK가 없으면 다시 보낸다. RTO는 측정한 왕복 시간(RTT)의 평균과 변동으로 계속 조정한다. 같은 ACK가 세 번 더 오면(중복 ACK) 타임아웃을 기다리지 않고 바로 재전송한다(빠른 재전송).</li>
</ul>
<h3>슬라이딩 윈도우: 기다리지 않고 보내기</h3>
<p>세그먼트 하나를 보내고 ACK를 기다리면(stop-and-wait), 왕복 시간 동안 회선이 논다. 서울–미국 왕복이 150ms라면 아무리 빠른 회선이어도 초당 몇 개밖에 못 보낸다. 그래서 ACK를 받지 않은 상태로 <strong>윈도우 크기만큼</strong> 연속으로 보내고, ACK가 오는 만큼 윈도우를 앞으로 민다. 처리량의 상한은 대략 <strong>윈도우 / RTT</strong>다. 윈도우 크기는 수신자의 여유(흐름 제어)와 네트워크 상황(혼잡 제어)이 함께 정한다.</p>
<h3>3-way 핸드셰이크: 왜 세 번인가</h3>
<p>양쪽은 각자 무작위로 고른 <strong>초기 순서 번호(ISN)</strong>로 시작한다. 연결을 맺는다는 것은 서로의 ISN을 알리고, 상대가 그것을 받았음을 확인하는 것이다.</p>
<ol><li>클라이언트 → SYN(seq = x)</li><li>서버 → SYN-ACK(seq = y, ack = x + 1): 서버의 ISN을 알리면서 클라이언트의 것을 확인</li><li>클라이언트 → ACK(ack = y + 1): 서버의 ISN을 확인</li></ol>
<p>두 번으로 끝내면 서버는 자신의 ISN이 전달됐는지 알 수 없고, 네트워크를 떠돌던 오래된 SYN이 뒤늦게 도착했을 때 서버가 가짜 연결을 열어 버릴 수 있다. ISN을 무작위로 정하는 이유는 이전 연결의 지연된 세그먼트와 섞이지 않게 하고, 제3자가 순서 번호를 추측해 끼어드는 것을 어렵게 하기 위해서다. 연결 종료는 양방향을 각각 닫는 FIN/ACK 교환(보통 4번)이고, 먼저 닫은 쪽은 늦게 도착할 세그먼트를 처리하기 위해 한동안 TIME_WAIT 상태로 남는다.</p>
<h3>바이트 스트림: 메시지 경계가 없다</h3>
<p>TCP는 "메시지"를 모른다. <code>send(b"hello")</code>, <code>send(b"world")</code>를 했어도 받는 쪽 <code>recv()</code>는 <code>b"helloworld"</code>를 한 번에 받거나, <code>b"hel"</code>만 받을 수도 있다. 그래서 응용 프로토콜이 직접 경계를 정한다: 길이를 앞에 붙이기(HTTP의 Content-Length), 구분자 쓰기(줄바꿈) 등. 네트워크 프로그래밍에서 가장 흔한 버그가 이 사실을 잊는 것이다.</p>
<h3>연결의 정체와 한계</h3>
<p>TCP 연결은 (출발지 IP, 출발지 포트, 목적지 IP, 목적지 포트) 4-튜플로 식별된다. 순서를 보장하므로, 세그먼트 하나가 손실되면 그 뒤에 이미 도착한 데이터도 응용에 전달되지 못하고 재전송을 기다린다(<strong>Head-of-Line 블로킹</strong>). 하나의 연결에 여러 독립적인 요청을 실을 때 문제가 되며, HTTP/3가 QUIC으로 옮겨 간 이유 중 하나다.</p>`,
    analogy: R`<p>번호를 매긴 소포 묶음 보내기. 받는 사람은 번호로 순서를 맞추고, "37번까지 다 받았어요"(누적 ACK)라고 답장한다. 보내는 사람은 답장을 하나씩 기다리지 않고 몇 개씩 미리 보내 두며(윈도우), 한참 답이 없으면 다시 보낸다(재전송). 처음 거래를 시작할 때는 "제 번호는 1000번부터예요" — "확인, 제 번호는 5000번부터예요" — "확인했어요"로 서로의 시작 번호를 맞춘다(3-way 핸드셰이크).</p>`,
    diagram: { caption: '3-way 핸드셰이크. 세 번째 ACK와 함께 바로 요청 데이터를 보낼 수 있으므로, 연결 설정에 약 1 RTT가 든다.', svg: R`
<svg viewBox="0 0 540 230" width="540">
<text x="100" y="12">클라이언트</text><text x="440" y="12">서버</text>
<path class="e" d="M100,20 V220"/><path class="e" d="M440,20 V220"/>
<path class="ha" d="M100,35 L438,70"/><text x="250" y="40" class="sm">SYN (seq = x)</text>
<path class="ha" d="M440,80 L102,115"/><text x="290" y="86" class="sm">SYN-ACK (seq = y, ack = x + 1)</text>
<path class="ha" d="M100,125 L438,160"/><text x="250" y="130" class="sm">ACK (ack = y + 1) + 요청 데이터</text>
<path class="a" d="M440,170 L102,205"/><text x="290" y="176" class="sm">응답 데이터</text>
<text x="55" y="40" class="sm">SYN_SENT</text><text x="50" y="125" class="sm">ESTABLISHED</text>
<text x="485" y="35" class="sm">LISTEN</text><text x="487" y="85" class="sm">SYN_RCVD</text><text x="490" y="160" class="sm">ESTABLISHED</text>
</svg>` },
    math: [
      { tex: R`\text{처리량} \lesssim \frac{W}{\text{RTT}}`, explain: R`<ul class="defs"><li>$W$: 한 번에 ACK 없이 보낼 수 있는 바이트(윈도우)</li><li>RTT: 왕복 시간</li></ul>예: $W$ = 64KB, RTT = 100ms이면 약 5.2Mbps가 상한이다. 고속·장거리 회선에서는 큰 윈도우(윈도우 스케일링 옵션)가 필요하다.` },
      { tex: R`\begin{aligned} \text{RTTVAR} &\leftarrow (1-\beta)\,\text{RTTVAR} + \beta\,|\text{SRTT} - R| \\ \text{SRTT} &\leftarrow (1-\alpha)\,\text{SRTT} + \alpha\, R \\ \text{RTO} &= \text{SRTT} + 4\,\text{RTTVAR} \end{aligned}`, explain: R`재전송 타임아웃 계산(RFC 6298). 위에서 아래 순서로 갱신하며, RTTVAR은 갱신 전의 SRTT를 쓴다. $R$: 새로 측정한 RTT, 권장값 $\alpha = 1/8$, $\beta = 1/4$. 평균뿐 아니라 변동까지 반영해, 지연이 들쭉날쭉한 망에서 불필요한 재전송을 줄인다.` },
    ],
    code: R`
import socket, struct, threading, time

def recv_exact(conn, n):                     # 정확히 n바이트를 받을 때까지 반복
  buf = b""
  while len(buf) < n:
      chunk = conn.recv(n - len(buf))
      if not chunk:
          raise ConnectionError("상대가 연결을 닫음")
      buf += chunk
  return buf

srv = socket.create_server(("127.0.0.1", 0))  # 포트 0: OS가 빈 포트를 배정, LISTEN 상태
port = srv.getsockname()[1]
result = {}

def server():
  conn, _ = srv.accept()                    # 3-way 핸드셰이크가 끝난 연결을 꺼낸다
  with conn:
      time.sleep(0.2)                       # 그사이 클라이언트가 send를 두 번 한다
      result["raw"] = conn.recv(1024)       # 두 번 보낸 것이 한 덩어리로 올 수 있다
      msgs = []
      for _ in range(2):                    # 길이 접두(4바이트) 프레이밍으로 경계 복원
          n = struct.unpack("!I", recv_exact(conn, 4))[0]
          msgs.append(recv_exact(conn, n).decode())
      result["framed"] = msgs

t = threading.Thread(target=server)
t.start()
with socket.create_connection(("127.0.0.1", port)) as c:   # connect(): SYN → SYN-ACK → ACK
  print("연결 4-튜플:", c.getsockname(), "→", c.getpeername())
  c.sendall(b"hello")
  c.sendall(b"world")
  time.sleep(0.3)
  for m in [b"hello", b"world"]:
      c.sendall(struct.pack("!I", len(m)) + m)
t.join()
srv.close()
print("경계 없이 받은 바이트  :", result["raw"])
print("프레이밍으로 복원한 메시지:", result["framed"])
`,
    links: [
      { to: 'net-congestion', why: '윈도우 크기를 정하는 흐름 제어와 혼잡 제어' },
      { to: 'net-udp', why: '신뢰성을 포기하고 지연·단순함을 얻는 반대 선택' },
      { to: 'net-layers', why: 'IP(best effort) 위의 전송 계층' },
      { to: 'net-http', why: 'HTTP는 TCP 연결 위에서, 길이 헤더로 메시지 경계를 정한다' },
      { to: 'os-io', why: '소켓 I/O: 블로킹, 다중화, 비동기' },
      { to: 'net-tls', why: 'TCP 연결 위에 암호화 계층을 하나 더 얹은 것이 HTTPS' },
    ],
    quiz: [
      { q: '3-way 핸드셰이크를 2단계(SYN, SYN-ACK)로 줄이면 생기는 문제는?',
        options: ['연결이 더 느려진다', '서버는 자신의 초기 순서 번호가 클라이언트에게 전달됐는지 확인할 수 없고, 네트워크에 남아 있던 오래된 SYN이 도착하면 가짜 연결을 열 수 있다', '클라이언트가 서버 주소를 모르게 된다'], answer: 1,
        explain: '양방향 각각의 시작 번호를 "알리고 확인받는" 과정이 필요하다. 서버의 SYN과 ACK를 하나의 세그먼트로 합쳐 총 3번이 된다.' },
      { q: '클라이언트가 send(b"hello") 후 send(b"world")를 했는데 서버의 recv()가 b"helloworld"를 한 번에 반환했다. 올바른 해석은?',
        options: ['TCP 버그다', 'TCP는 메시지 경계가 없는 바이트 스트림이므로 정상이며, 메시지 구분은 응용 프로토콜(길이 접두, 구분자)이 해야 한다', 'Nagle 알고리즘을 끄면 항상 따로 온다'], answer: 1,
        explain: '반대로 한 번 보낸 것이 여러 번에 나뉘어 올 수도 있다. "recv 한 번 = 메시지 하나"라는 가정은 언제든 깨질 수 있다.' },
      { q: '대역폭이 1Gbps인 서울–미국 회선(RTT 150ms)에서 윈도우가 64KB로 고정되면 단일 TCP 연결의 처리량은?',
        options: ['약 1Gbps — 대역폭이 상한이므로', '약 3.5Mbps — 윈도우/RTT가 상한이므로', '약 64Mbps'], answer: 1,
        explain: '64KB × 8 / 0.15s ≈ 3.5Mbps. 회선이 아무리 빨라도 ACK를 기다리는 동안 보낼 수 있는 양이 제한된다. 그래서 윈도우 스케일링으로 윈도우를 키운다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 3장 — 전송 계층', 'RFC 9293 (TCP), RFC 6298 (재전송 타이머)', 'Beej\'s Guide to Network Programming (소켓 프로그래밍 입문, 무료)'],
  },
  {
    id:'net-udp', title: 'UDP', advanced: true,
    summary: R`IP + <strong>포트 번호·체크섬만</strong>
연결·재전송·순서 보장 없음 → 저지연, 메시지 경계 보존
신뢰성은 응용이 직접 구현(QUIC)`,
    body: R`
<h3>UDP가 하는 일과 하지 않는 일</h3>
<p>UDP 헤더는 8바이트(출발지 포트, 목적지 포트, 길이, 체크섬)뿐이다. 하는 일은 "포트로 프로세스를 구분하고, 손상된 데이터그램을 버리는 것"이 전부다.</p>
<ul>
<li><strong>연결 설정이 없다</strong>: 첫 패킷부터 데이터를 담는다. 짧은 요청-응답은 1 RTT에 끝난다(TCP는 핸드셰이크 때문에 최소 2 RTT).</li>
<li><strong>신뢰성·순서 보장이 없다</strong>: 잃어버린 데이터그램은 그냥 사라지고, 순서가 바뀌어도 그대로 전달된다.</li>
<li><strong>혼잡 제어가 없다</strong>: 보내는 속도를 응용이 정한다. 그래서 대량 전송을 UDP로 마구 보내면 네트워크를 혼잡하게 만들 수 있다.</li>
<li><strong>메시지 경계를 보존한다</strong>: <code>sendto</code> 한 번이 데이터그램 하나이고, <code>recvfrom</code> 한 번에 정확히 하나를 받는다(TCP와의 큰 차이).</li>
</ul>
<h3>언제 UDP를 쓰는가</h3>
<ul>
<li><strong>짧은 질의-응답</strong>: DNS. 질의 하나, 응답 하나면 끝이고, 응답이 안 오면 응용이 타임아웃 후 다시 묻는다. 연결을 맺는 비용이 질의 자체보다 크다.</li>
<li><strong>실시간 미디어·게임</strong>: 음성 통화에서 0.5초 늦게 도착한 소리는 쓸모가 없다. TCP처럼 재전송을 기다리며 뒤의 데이터까지 멈추는(HOL 블로킹) 것보다, 잃어버린 조각은 건너뛰고 최신 데이터를 쓰는 편이 낫다.</li>
<li><strong>브로드캐스트·멀티캐스트</strong>: 일대다 전송은 연결 개념과 맞지 않는다.</li>
<li><strong>자체 전송 프로토콜의 기반</strong>: 필요한 기능만 응용 수준에서 구현한다.</li>
</ul>
<h3>QUIC: UDP 위에 다시 만든 신뢰성</h3>
<p>HTTP/3가 쓰는 QUIC은 UDP 위에서 신뢰성, 혼잡 제어, 그리고 TLS 1.3 암호화를 하나로 통합한 프로토콜이다. 왜 TCP를 고치지 않고 UDP 위에 새로 만들었을까? TCP는 운영체제 커널과 수많은 중간 장비(방화벽, NAT)에 깊이 박혀 있어 새 기능을 배포하기가 사실상 불가능하다(프로토콜 경직화). UDP 위라면 응용(사용자 공간)에서 구현해 빠르게 개선할 수 있고, 중간 장비는 그냥 UDP로 보고 통과시킨다. 또 QUIC은 하나의 연결 안의 여러 스트림을 독립적으로 관리해, 한 스트림의 패킷 손실이 다른 스트림을 막지 않는다. 핸드셰이크도 전송과 암호화를 합쳐 왕복 수를 줄였다.</p>
<h3>주의할 점</h3>
<p>데이터그램이 경로의 최대 전송 단위(MTU, 이더넷에서 흔히 1500바이트)보다 크면 IP 단편화가 일어나고, 조각 중 하나만 잃어도 전체가 사라진다. 그래서 UDP 기반 프로토콜은 보통 데이터그램을 작게 유지한다.</p>`,
    analogy: R`<p>TCP가 <strong>등기 우편과 전화 통화</strong>라면 UDP는 <strong>엽서</strong>다. 엽서는 미리 약속 없이 바로 보내고, 한 장 한 장이 따로 도착하며(경계 보존), 가끔 분실되어도 우체국은 다시 보내 주지 않는다. 답장이 안 오면 보낸 사람이 다시 쓰면 된다. 생중계 방송에서 지나간 장면을 다시 보내 달라고 하지 않는 것처럼, 실시간 통신에서는 이것이 오히려 장점이다.</p>`,
    diagram: { caption: '짧은 요청-응답의 왕복 횟수 비교. TCP는 연결 설정 후에 요청을 보내고, UDP는 바로 보낸다(대신 손실 복구는 응용의 몫).', svg: R`
<svg viewBox="0 0 540 200" width="540">
<text x="135" y="12">TCP</text><text x="405" y="12">UDP</text>
<path class="e" d="M40,20 V160"/><path class="e" d="M230,20 V160"/><path class="e" d="M310,20 V160"/><path class="e" d="M500,20 V160"/>
<path class="a" d="M40,35 L228,60"/><text x="120" y="38" class="sm">SYN</text>
<path class="a" d="M230,65 L42,90"/><text x="150" y="68" class="sm">SYN-ACK</text>
<path class="ha" d="M40,95 L228,120"/><text x="120" y="98" class="sm">ACK + 요청</text>
<path class="ha" d="M230,125 L42,150"/><text x="150" y="128" class="sm">응답</text>
<path class="ha" d="M310,35 L498,60"/><text x="390" y="38" class="sm">요청</text>
<path class="ha" d="M500,65 L312,90"/><text x="420" y="68" class="sm">응답</text>
<text x="135" y="180" class="sm">응답까지 약 2 RTT</text><text x="405" y="180" class="sm">약 1 RTT (손실 시 응용이 재시도)</text>
</svg>` },
    math: [
      { tex: R`P(\text{데이터그램 손실}) = 1 - (1 - p)^{k}`, explain: R`데이터그램이 IP 단편 $k$개로 쪼개지고 각 조각의 손실 확률이 $p$일 때. 예: $p$ = 1%, $k$ = 10이면 약 9.6%로 커진다. UDP 메시지를 MTU보다 작게 유지하는 이유다.` },
    ],
    code: R`
import random, socket, threading

srv = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
srv.bind(("127.0.0.1", 0))
addr = srv.getsockname()
random.seed(1)

def server():
  while True:
      data, client = srv.recvfrom(2048)          # recvfrom 한 번 = 데이터그램 하나
      if data.startswith(b"Q") and random.random() < 0.5:
          continue                               # 손실 흉내: 응답을 보내지 않는다
      srv.sendto(b"ANS:" + data, client)

threading.Thread(target=server, daemon=True).start()

c = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
c.settimeout(0.2)
for m in [b"one", b"two", b"three"]:
  c.sendto(m, addr)                              # 연결 설정 없이 바로 전송
print("받은 응답 (메시지 경계 보존):", [c.recvfrom(2048)[0] for _ in range(3)])

def query(q, retries=5):                           # 신뢰성은 응용의 몫: 타임아웃 + 재시도 (DNS 클라이언트 방식)
  for attempt in range(1, retries + 1):
      c.sendto(q, addr)
      try:
          return c.recvfrom(2048)[0], f"{attempt}번째 시도에 성공"
      except socket.timeout:
          print(f"  시도 {attempt}: 0.2초 동안 응답 없음 → 재전송")
  return None, "포기"

print("질의 결과:", query(b"Q:example"))
`,
    links: [
      { to: 'net-tcp', why: '신뢰성·순서를 보장하는 반대편의 선택' },
      { to: 'net-dns', why: '대표적인 UDP 기반 질의-응답 프로토콜' },
      { to: 'net-http', why: 'HTTP/3는 UDP 위의 QUIC을 사용한다' },
      { to: 'net-congestion', why: 'UDP에는 혼잡 제어가 없다 — 응용의 책임' },
      { to: 'net-tls', why: 'QUIC은 TLS 1.3을 전송 프로토콜 안에 통합했다' },
    ],
    quiz: [
      { q: '화상 통화 앱이 TCP보다 UDP 기반 전송을 선호하는 주된 이유는?',
        options: ['UDP가 더 안전해서', '늦게 도착한 오디오·영상은 쓸모가 없으므로, 손실된 조각을 재전송하며 뒤의 데이터까지 기다리게 하는 것보다 건너뛰는 편이 낫기 때문', 'UDP는 대역폭이 더 넓어서'], answer: 1,
        explain: 'TCP의 순서 보장은 손실 하나가 뒤따르는 모든 데이터를 막는 HOL 블로킹을 낳는다. 실시간 통신에서는 "늦은 정확함"보다 "제때의 근사"가 중요하다.' },
      { q: 'DNS가 기본적으로 UDP를 쓰면서도 응답을 확실히 받는 방법은?',
        options: ['UDP가 자동으로 재전송해 준다', '클라이언트(리졸버)가 타임아웃 후 질의를 다시 보내 응용 수준에서 신뢰성을 처리한다', 'DNS 서버가 응답을 여러 번 보낸다'], answer: 1,
        explain: '질의-응답이 한 쌍뿐이라 응용이 직접 재시도하는 것이 연결을 맺는 것보다 싸다. 응답이 너무 크면 TCP로 다시 묻기도 한다.' },
      { q: 'QUIC이 TCP를 수정하지 않고 UDP 위에 새로 만들어진 이유로 가장 적절한 것은?',
        options: ['UDP가 TCP보다 항상 빠르기 때문', 'TCP는 OS 커널과 중간 장비에 깊이 고정되어 새 기능 배포가 어려운 반면, UDP 위에서는 응용 수준에서 구현·개선할 수 있고 중간 장비도 통과하기 때문', 'TCP는 암호화를 지원할 수 없어서'], answer: 1,
        explain: '프로토콜 경직화(ossification) 문제다. QUIC은 여기에 스트림별 독립 전송과 TLS 1.3 통합 핸드셰이크를 더했다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 3.3절 — UDP', 'RFC 768 (UDP), RFC 9000 (QUIC)', 'Robin Marx, "HTTP/3 From A To Z: Core Concepts" (Smashing Magazine 연재)'],
  },
  {
    id:'net-congestion', title: '흐름 제어와 혼잡 제어', advanced: true,
    summary: R`<strong>흐름 제어</strong>: 수신 버퍼 보호 / <strong>혼잡 제어</strong>: 네트워크 보호
실제 송신량 = 둘 중 작은 값
TCP: 손실 = 혼잡 신호, AIMD`,
    body: R`
<h3>두 가지 다른 문제</h3>
<ul>
<li><strong>흐름 제어</strong>: 수신 프로그램이 데이터를 늦게 읽으면 수신 버퍼가 찬다. 수신자는 남은 버퍼 크기를 TCP 헤더의 윈도우 필드(<code>rwnd</code>)로 계속 알려 주고, 송신자는 그 이상 보내지 않는다. 0이 되면 송신을 멈추고 주기적으로 확인한다.</li>
<li><strong>혼잡 제어</strong>: 송신자와 수신자는 멀쩡해도 경로 중간 라우터의 큐가 넘칠 수 있다. 큐가 차면 지연이 늘고, 넘치면 패킷이 버려진다. 버려진 패킷을 모두가 재전송하면 네트워크는 더 혼잡해지고, 실제로 전달되는 유효 데이터는 거의 0이 되는 <strong>혼잡 붕괴</strong>가 올 수 있다. 1980년대 중반 인터넷에서 실제로 일어났고, 이를 계기로 TCP에 혼잡 제어가 도입되었다.</li>
</ul>
<p>송신자는 혼잡 윈도우(<code>cwnd</code>)를 스스로 관리하며, 실제로 ACK 없이 보낼 수 있는 양은 <strong>min(cwnd, rwnd)</strong>다.</p>
<h3>네트워크 상태를 모르는데 어떻게 조절하나</h3>
<p>TCP 송신자는 라우터의 큐를 직접 볼 수 없다. 그래서 <strong>손실을 혼잡의 신호</strong>로 해석한다(전통적인 방식). 고전적인 TCP Reno의 동작은 다음과 같다.</p>
<ol>
<li><strong>슬로 스타트</strong>: cwnd = 1 MSS(세그먼트 하나)에서 시작해 ACK마다 1씩 늘린다. 결과적으로 RTT마다 <strong>두 배</strong>가 된다. 이름과 달리 빠르게 사용 가능한 대역폭을 탐색한다.</li>
<li><strong>혼잡 회피</strong>: cwnd가 임계값(ssthresh)에 도달하면 RTT마다 <strong>1씩</strong>만 늘린다(가산 증가).</li>
<li><strong>손실 감지</strong>: 중복 ACK 3개(일부만 손실, 경로는 아직 동작 중)면 cwnd를 <strong>절반</strong>으로 줄인다(곱셈 감소). 타임아웃(심각한 상황)이면 cwnd를 1로 되돌리고 슬로 스타트부터 다시 한다.</li>
</ol>
<p>그래서 cwnd 그래프는 톱니 모양이 된다.</p>
<h3>왜 AIMD인가</h3>
<p>여러 흐름이 같은 병목을 공유할 때, 가산 증가는 모든 흐름의 몫을 <strong>같은 양</strong>만큼 늘리고 곱셈 감소는 <strong>같은 비율</strong>로 줄인다. 감소할 때마다 두 흐름의 차이도 절반이 되므로, 처음에 불공평했던 몫이 반복될수록 같아진다(공정성). 또 혼잡 신호에 강하게 반응해 네트워크를 붕괴에서 지킨다(안정성). 증가와 감소를 다른 조합으로 하면 이 두 성질을 동시에 얻지 못한다.</p>
<h3>현대의 알고리즘</h3>
<p>Linux의 기본값인 <strong>CUBIC</strong>은 고속·장거리 회선에서 cwnd를 더 빨리 회복하도록 증가 함수를 3차 곡선으로 바꿨다. Google이 제안한 <strong>BBR</strong>은 손실을 기다리지 않고 병목 대역폭과 최소 RTT를 측정해 그에 맞는 속도로 보낸다. 라우터 버퍼가 지나치게 크면 손실이 늦게 일어나 그전까지 큐에 패킷이 쌓여 지연이 수백 ms~수 초까지 늘어나는데(<strong>버퍼블로트</strong>), 지연 기반 접근과 능동 큐 관리(AQM)가 이를 완화한다.</p>
<h3>처리량에 주는 시사점</h3>
<p>손실 기반 TCP의 장기 평균 처리량은 대략 $1/(\text{RTT}\sqrt{p})$에 비례한다. 같은 손실률이라도 RTT가 긴(먼) 연결일수록, 같은 RTT라도 손실률이 높을수록 느리다. 무선망의 손실처럼 혼잡과 무관한 손실도 TCP는 혼잡으로 오해해 속도를 줄인다.</p>`,
    analogy: R`<p>고속도로 진입 램프 신호등. <strong>흐름 제어</strong>는 목적지 주차장에 빈자리가 몇 개인지 보고 보내는 것, <strong>혼잡 제어</strong>는 고속도로 자체가 막히지 않게 진입 속도를 조절하는 것이다. 운전자는 고속도로 전체 상황을 볼 수 없으니, 차가 잘 빠지면 진입 간격을 조금씩 줄이고(가산 증가), 정체가 느껴지면 확 늘린다(곱셈 감소). 모두가 이 규칙을 따르면 결국 차선을 공평하게 나눠 쓰게 된다.</p>`,
    diagram: { caption: 'TCP Reno의 혼잡 윈도우 변화. 슬로 스타트(지수 증가) → 혼잡 회피(선형 증가) → 중복 ACK 시 절반, 타임아웃 시 1로.', svg: R`
<svg viewBox="0 0 520 240" width="520">
<path class="a" d="M30,215 H505"/><path class="a" d="M30,215 V15"/>
<text x="490" y="230" class="sm">시간(RTT)</text><text x="52" y="12" class="sm">cwnd</text>
<path class="he" d="M30,213 Q85,210 110,120 L110,165 L230,105 L230,160 L330,110 L330,213 Q350,212 365,165 L480,120"/>
<path class="e d" d="M30,165 H330"/><text x="60" y="158" class="sm">ssthresh</text>
<text x="75" y="105" class="sm">슬로 스타트</text>
<text x="175" y="118" class="sm">혼잡 회피 (+1)</text>
<text x="230" y="90" class="sm">3 중복 ACK: 절반</text>
<text x="372" y="100" class="sm">타임아웃: 1로</text>
<text x="425" y="160" class="sm">다시 슬로 스타트 → 회피</text>
</svg>` },
    math: [
      { tex: R`\text{보낼 수 있는 양} = \min(\text{cwnd},\ \text{rwnd})`, explain: R`<ul class="defs"><li>cwnd: 송신자가 추정한 네트워크 허용량(혼잡 제어)</li><li>rwnd: 수신자가 광고한 버퍼 여유(흐름 제어)</li></ul>` },
      { tex: R`\text{AIMD:}\quad \text{cwnd} \leftarrow \begin{cases} \text{cwnd} + 1 & \text{RTT마다 (손실 없음)} \\ \text{cwnd} / 2 & \text{손실 감지} \end{cases}`, explain: R`단위는 MSS(최대 세그먼트 크기). 슬로 스타트 구간에서는 RTT마다 두 배.` },
      { tex: R`\text{처리량} \approx \frac{\text{MSS}}{\text{RTT}} \cdot \frac{\sqrt{3/2}}{\sqrt{p}}`, explain: R`손실률 $p$인 정상 상태에서 Reno 방식 TCP의 평균 처리량 근사(Mathis 등, 1997). RTT가 두 배면 처리량은 절반, 손실률이 4배면 처리량은 절반.` },
    ],
    code: R`
import math

def reno(rtts, capacity, ssthresh=64):
  cwnd, trace = 1, []                # 단위: MSS (세그먼트 개수)
  for _ in range(rtts):
      trace.append(cwnd)
      if cwnd > capacity:            # 병목 큐가 넘쳐 손실 (중복 ACK로 감지했다고 가정)
          ssthresh = cwnd // 2
          cwnd = ssthresh            # 곱셈 감소
      elif cwnd < ssthresh:
          cwnd *= 2                  # 슬로 스타트: RTT마다 2배
      else:
          cwnd += 1                  # 혼잡 회피: RTT마다 +1
  return trace

print("cwnd 변화:", reno(40, capacity=30))

# AIMD 두 흐름: 처음엔 불공평해도 같은 몫으로 수렴한다 (Chiu & Jain)
a, b, cap = 30.0, 2.0, 40
for step in range(201):
  if step % 50 == 0:
      print(f"step {step:3d}: A={a:5.1f}  B={b:5.1f}  차이={abs(a - b):5.2f}")
  if a + b > cap:
      a, b = a / 2, b / 2            # 둘 다 손실을 겪고 절반으로 → 차이도 절반
  else:
      a, b = a + 1, b + 1            # 둘 다 같은 양만큼 증가 → 차이 유지

mss_bits, rtt = 1460 * 8, 0.1
for p in (1e-2, 1e-4):
  print(f"손실률 {p:g}, RTT 100ms: 처리량 ≈ {mss_bits / rtt * math.sqrt(1.5) / math.sqrt(p) / 1e6:.1f} Mbps")
`,
    links: [
      { to: 'net-tcp', why: '윈도우와 ACK — 혼잡 제어가 조절하는 대상' },
      { to: 'net-udp', why: 'UDP에는 혼잡 제어가 없어 응용이 책임져야 한다' },
      { to: 'net-routing', why: '혼잡이 실제로 일어나는 곳: 라우터의 출력 큐' },
      { to: 'ds-stack-queue', why: '라우터 버퍼는 큐 — 넘치면 패킷을 버린다' },
    ],
    quiz: [
      { q: '흐름 제어와 혼잡 제어의 차이를 가장 정확히 설명한 것은?',
        options: ['둘은 같은 기능의 다른 이름이다', '흐름 제어는 수신자의 버퍼가 넘치지 않게, 혼잡 제어는 경로상의 네트워크(라우터 큐)가 넘치지 않게 송신량을 조절한다', '흐름 제어는 UDP, 혼잡 제어는 TCP의 기능이다'], answer: 1,
        explain: '흐름 제어는 수신자가 rwnd로 직접 알려 주고, 혼잡 제어는 송신자가 손실·지연으로 추정한 cwnd로 한다. 실제 송신량은 둘의 최솟값이다.' },
      { q: 'TCP가 손실을 감지하면 cwnd를 1만 줄이지 않고 절반으로 줄이는(곱셈 감소) 이유는?',
        options: ['계산이 간단해서', '혼잡 신호에 강하게 반응해 네트워크 붕괴를 막고, 가산 증가와 결합하면 여러 흐름의 몫이 공평하게 수렴하기 때문', '절반이 항상 최적의 속도라서'], answer: 1,
        explain: '곱셈 감소는 흐름 간 차이를 매번 절반으로 줄이고, 가산 증가는 차이를 유지한다. 반복하면 공정한 몫으로 수렴한다.' },
      { q: '라우터 버퍼를 아주 크게 만들면 생길 수 있는 부작용은?',
        options: ['손실이 줄어 모든 것이 좋아진다', '손실이 늦게 일어나 TCP가 계속 속도를 올리고, 그동안 큐에 패킷이 쌓여 지연이 크게 늘어난다(버퍼블로트)', '처리량이 0이 된다'], answer: 1,
        explain: '손실 기반 혼잡 제어는 버퍼가 가득 찰 때까지 속도를 높인다. 화상 통화·게임처럼 지연에 민감한 트래픽이 큰 피해를 본다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 3.6~3.7절', 'Van Jacobson, "Congestion Avoidance and Control" (SIGCOMM 1988)', 'Chiu & Jain, "Analysis of the Increase and Decrease Algorithms for Congestion Avoidance" (1989)', 'Cardwell et al., "BBR: Congestion-Based Congestion Control" (ACM Queue, 2016)'],
  },
  {
    id:'net-ip', title: 'IP 주소와 서브넷', advanced: true,
    summary: R`IP 주소 = <strong>네트워크 부분 + 호스트 부분</strong>
CIDR → 라우터가 <strong>접두사 단위</strong>로 경로 관리
주소 고갈 대응: NAT·IPv6`,
    body: R`
<h3>주소의 구조</h3>
<p>IPv4 주소는 32비트이고 8비트씩 끊어 10진수로 쓴다(192.168.10.37). 전화번호의 지역번호처럼 앞부분은 <strong>네트워크</strong>, 뒷부분은 그 안의 <strong>호스트</strong>를 나타낸다. 경계 위치를 정하는 것이 접두 길이(CIDR 표기 <code>/26</code>) 또는 같은 정보를 비트로 쓴 서브넷 마스크(255.255.255.192)다.</p>
<p>과거에는 A(/8)·B(/16)·C(/24) 클래스로 경계를 고정해서, 254개가 부족한 조직이 6만 개짜리 B 클래스를 받는 등 낭비가 심했다. <strong>CIDR</strong>은 경계를 임의의 비트 위치로 정할 수 있게 해 필요한 만큼만 나눠 준다.</p>
<h3>마스크와 AND 연산</h3>
<p>주소와 마스크를 비트 AND 하면 네트워크 주소가 나온다. 호스트는 패킷을 보낼 때마다 이 계산을 한다.</p>
<ul>
<li>목적지의 네트워크 주소가 <strong>나와 같으면</strong>: 같은 링크에 있으므로 ARP로 목적지의 MAC 주소를 알아내 직접 보낸다.</li>
<li><strong>다르면</strong>: 기본 게이트웨이(라우터)의 MAC 주소로 보내고, 라우터가 다음 경로를 정한다.</li>
</ul>
<p>/n 네트워크의 주소 수는 $2^{32-n}$개이고, 호스트 부분이 모두 0인 주소(네트워크 주소)와 모두 1인 주소(브로드캐스트)를 빼면 일반적으로 $2^{32-n} - 2$개를 호스트에 줄 수 있다.</p>
<h3>나누기와 합치기</h3>
<p>큰 블록을 접두 길이를 늘려 여러 서브넷으로 나눌 수 있고(/24 → /26 네 개), 반대로 연속된 블록을 하나의 짧은 접두사로 <strong>집약</strong>할 수 있다(10.0.0.0/24 + 10.0.1.0/24 = 10.0.0.0/23). 인터넷 라우터들이 전 세계 경로를 수십만~백만 개 수준의 항목으로 관리할 수 있는 것은 이 집약 덕분이다. 클라우드에서 VPC·서브넷의 CIDR을 설계할 때 서로 겹치지 않게 해야 나중에 망을 연결(피어링, VPN)할 수 있다.</p>
<h3>사설 주소와 NAT</h3>
<p>32비트로는 약 43억 개뿐이라 IPv4 주소는 고갈되었다. 그래서 인터넷에서 라우팅되지 않는 <strong>사설 대역</strong>(10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)을 내부망에서 자유롭게 쓰고, 공유기·게이트웨이가 <strong>NAT</strong>로 바꿔 준다. 나가는 패킷의 (사설 IP, 포트)를 (공인 IP, 새 포트)로 바꾸고 그 대응을 표에 기록해 두었다가, 돌아오는 응답을 표를 보고 원래 기기로 돌려보낸다. 덕분에 집 안의 기기 수십 대가 공인 IP 하나를 쓴다. 대가는 외부에서 <strong>먼저</strong> 내부 기기로 연결을 걸 수 없다는 것(표에 항목이 없음)이다. P2P 통신이나 게임이 NAT 통과 기법을 따로 쓰는 이유다.</p>
<h3>IPv6</h3>
<p>128비트 주소로 고갈 문제를 근본적으로 해결한다. 16비트씩 16진수로 쓰고 연속된 0은 <code>::</code>로 줄인다(2001:db8::ff00:42:8329). 서브넷은 보통 /64이고, NAT 없이 모든 기기가 전역 주소를 가질 수 있다. 127.0.0.1(IPv6에서는 ::1)은 자기 자신을 가리키는 루프백 주소다.</p>`,
    analogy: R`<p>IP 주소는 <strong>"아파트 동 + 호수"</strong>와 같다. 택배 기사는 동 번호(네트워크 부분)만 보고 어느 동으로 갈지 정하고, 호수(호스트 부분)는 그 동에 도착해서 찾는다. 마스크는 "앞의 몇 자리가 동 번호인가"를 알려 주는 규칙이다. NAT는 회사 대표번호와 내선번호 — 밖에서는 대표번호 하나만 보이고, 교환원(공유기)이 통화 기록을 보고 내선으로 연결해 준다. 하지만 외부인이 내선 번호로 직접 걸 수는 없다.</p>`,
    diagram: { caption: '192.168.10.37/26: 앞 26비트가 네트워크, 뒤 6비트가 호스트. 주소 AND 마스크 = 네트워크 주소 192.168.10.0.', svg: R`
<svg viewBox="0 0 560 205" width="560">
<text x="295" y="14" class="sm">네트워크 부분 (26비트)</text><text x="505" y="14" class="sm">호스트 (6비트)</text>
<text x="65" y="45" class="sm">192.168.10.37</text>
<rect class="h" x="130" y="30" width="330" height="30"/><rect class="n" x="460" y="30" width="90" height="30"/>
<text x="295" y="45" class="sm">11000000.10101000.00001010.00</text><text x="505" y="45" class="sm">100101</text>
<text x="65" y="95" class="sm">255.255.255.192</text>
<rect class="g" x="130" y="80" width="330" height="30"/><rect class="g" x="460" y="80" width="90" height="30"/>
<text x="295" y="95" class="sm">11111111.11111111.11111111.11</text><text x="505" y="95" class="sm">000000</text>
<text x="105" y="120">AND</text>
<text x="65" y="155" class="sm">192.168.10.0</text>
<rect class="h" x="130" y="140" width="330" height="30"/><rect class="n" x="460" y="140" width="90" height="30"/>
<text x="295" y="155" class="sm">11000000.10101000.00001010.00</text><text x="505" y="155" class="sm">000000</text>
<text x="300" y="192" class="sm">호스트 2⁶ − 2 = 62개 (전부 0 = 네트워크 주소, 전부 1 = 브로드캐스트)</text>
</svg>` },
    math: [
      { tex: R`\text{네트워크 주소} = \text{IP} \land \text{mask}, \qquad \text{mask} = \underbrace{1\cdots1}_{n}\underbrace{0\cdots0}_{32-n}`, explain: R`<ul class="defs"><li>$\land$: 비트 AND</li><li>$n$: 접두 길이</li></ul>두 주소가 같은 서브넷인지는 둘 다 마스크와 AND 한 결과가 같은지로 판단한다.` },
      { tex: R`\text{호스트 수} = 2^{32-n} - 2`, explain: R`네트워크 주소(호스트 부분 전부 0)와 브로드캐스트 주소(전부 1)를 제외. /31(점대점 링크)과 /32(단일 호스트)는 예외로 취급한다.` },
    ],
    code: R`
import ipaddress as ip

iface = ip.ip_interface("192.168.10.37/26")
net = iface.network
print("네트워크:", net, "| 마스크:", net.netmask, "| 브로드캐스트:", net.broadcast_address,
    "| 호스트 수:", net.num_addresses - 2)
bits = format(int(iface.ip), "032b")
print("비트: 네트워크", bits[:26], "| 호스트", bits[26:])
print("주소 AND 마스크 =", ip.ip_address(int(iface.ip) & int(net.netmask)))

for dst in ["192.168.10.50", "192.168.10.100", "8.8.8.8"]:
  same = ip.ip_address(dst) in net
  print(f"  → {dst:15s}: {'같은 서브넷, ARP로 직접 전달' if same else '다른 네트워크, 기본 게이트웨이로'}")

print("/24를 /26 네 개로:", [str(s) for s in ip.ip_network("10.0.1.0/24").subnets(new_prefix=26)])
print("두 /24를 집약:", [str(s) for s in ip.collapse_addresses([ip.ip_network("10.0.0.0/24"), ip.ip_network("10.0.1.0/24")])])
print("사설 주소?", {a: ip.ip_address(a).is_private for a in ["10.1.2.3", "172.20.0.1", "8.8.8.8"]})

# NAT 표: (사설 IP, 사설 포트) ↔ 공인 포트
public_ip, nat, next_port = "203.0.113.5", {}, 40000
for host in [("192.168.0.10", 51000), ("192.168.0.11", 51000), ("192.168.0.10", 51001)]:
  nat[host] = next_port
  next_port += 1
for (h, p), pub in nat.items():
  print(f"  NAT {h}:{p} → {public_ip}:{pub}")
print("IPv6 축약:", ip.ip_address("2001:0db8:0000:0000:0000:ff00:0042:8329").compressed)
`,
    links: [
      { to: 'net-routing', why: '접두사로 경로를 고르는 최장 접두 일치' },
      { to: 'net-layers', why: 'IP 주소(종단) vs MAC 주소(다음 홉), ARP' },
      { to: 'net-dns', why: '사람이 쓰는 이름을 IP 주소로 바꾸는 시스템' },
      { to: 'net-tcp', why: 'NAT는 포트를 바꿔 TCP/UDP 연결을 구분한다' },
      { to: 'ca-number', why: '2진수와 비트 연산' },
    ],
    quiz: [
      { q: '10.0.5.0/26 서브넷에 일반적으로 할당 가능한 호스트 주소는 몇 개인가?',
        options: ['64개', '62개', '254개', '26개'], answer: 1,
        explain: '호스트 비트 6개 → 2⁶ = 64개 주소, 네트워크 주소와 브로드캐스트 주소를 빼면 62개.' },
      { q: '호스트가 목적지로 패킷을 직접 보낼지 게이트웨이로 보낼지 결정하는 방법은?',
        options: ['DNS에 물어본다', '자신과 목적지의 IP 주소를 각각 서브넷 마스크와 AND 해서 네트워크 주소가 같으면 직접, 다르면 게이트웨이로 보낸다', '항상 게이트웨이로 보낸다'], answer: 1,
        explain: '같은 네트워크면 ARP로 MAC 주소를 알아내 링크 계층으로 바로 전달한다. 다르면 라우터의 MAC 주소로 보낸다.' },
      { q: '집 공유기(NAT) 뒤의 노트북에서 웹 서버를 열었는데 외부에서 접속이 안 되는 이유는?',
        options: ['노트북의 IP 주소가 잘못되어서', 'NAT는 내부에서 먼저 나간 연결에 대한 대응표만 가지고 있어, 외부에서 먼저 들어온 요청을 어느 내부 기기로 보낼지 모르기 때문 (포트 포워딩 설정 필요)', '웹 서버는 공인 IP에서만 실행되기 때문'], answer: 1,
        explain: 'NAT의 대가다. 공유기에 "공인 IP의 특정 포트로 오면 이 내부 기기로" 규칙(포트 포워딩)을 직접 추가해야 한다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 4.3절 — IP 주소, NAT, IPv6', 'Python 공식 문서 — ipaddress 모듈', 'RFC 1918 (사설 주소), RFC 4632 (CIDR)'],
  },
  {
    id:'net-routing', title: '라우팅', advanced: true,
    summary: R`<strong>포워딩</strong>: 패킷마다 표 조회(최장 접두 일치)
<strong>라우팅</strong>: 표 생성(링크 상태·거리 벡터, 조직 간 BGP)`,
    body: R`
<h3>포워딩과 라우팅</h3>
<ul>
<li><strong>포워딩(데이터 평면)</strong>: 패킷이 들어오면 목적지 주소로 포워딩 표를 조회해 나갈 인터페이스를 정한다. 초당 수억 개 패킷을 처리해야 하므로 전용 하드웨어로 나노초 단위에 끝낸다.</li>
<li><strong>라우팅(제어 평면)</strong>: 라우터들이 서로 정보를 교환해 그 표를 만들고, 링크가 끊기면 다시 계산한다. 초~분 단위로 동작한다.</li>
</ul>
<h3>최장 접두 일치</h3>
<p>포워딩 표의 항목은 개별 주소가 아니라 <strong>접두사</strong>(10.1.0.0/16 → 인터페이스 2)다. 목적지가 여러 항목에 동시에 일치할 수 있는데, 그중 <strong>가장 긴(가장 구체적인) 접두사</strong>를 고른다. 그래서 큰 블록을 하나로 집약해 두고 예외만 더 긴 접두사로 추가할 수 있다. 0.0.0.0/0은 모든 주소에 일치하는 기본 경로(default route)로, "아무것도 해당 안 되면 상위 ISP로"가 된다. 소프트웨어로는 비트 단위 트라이로, 하드웨어로는 TCAM 같은 특수 메모리로 구현한다.</p>
<h3>라우팅 알고리즘 1: 링크 상태 (예: OSPF)</h3>
<p>각 라우터가 자신의 이웃과 링크 비용을 망 전체에 알린다(flooding). 모든 라우터가 <strong>같은 전체 지도</strong>를 갖게 되고, 각자 다익스트라로 자신에서 모든 목적지까지의 최단 경로 트리를 계산한다. 변화에 빠르게 수렴하지만, 지도 전체를 저장하고 계산하는 비용이 있다.</p>
<h3>라우팅 알고리즘 2: 거리 벡터 (예: RIP)</h3>
<p>각 라우터는 "목적지별 거리 표"만 이웃과 주기적으로 교환하고, 벨만-포드 식 $D_x(y) = \min_v \{c(x,v) + D_v(y)\}$로 갱신한다. 전체 지도 없이 이웃의 말만 믿는다. 단순하지만, 링크가 끊겼을 때 이웃끼리 "나는 저쪽을 통해 갈 수 있어"라고 서로의 오래된 정보를 믿고 거리를 조금씩 키워 가는 <strong>무한 카운팅</strong> 문제가 생긴다. 이웃에게서 배운 경로를 그 이웃에게는 "무한대"로 알려 주는 포이즌 리버스 같은 기법으로 완화하고, RIP는 15홉을 넘는 거리(16)를 도달 불가로 정해 끝없는 증가를 막는다.</p>
<h3>인터넷 규모: AS와 BGP</h3>
<p>인터넷은 ISP, 클라우드, 대학 같은 수만 개의 <strong>자율 시스템(AS)</strong>이 연결된 것이다. AS 내부에서는 OSPF·IS-IS 같은 프로토콜로 최단 경로를 찾지만, AS 사이에서는 <strong>BGP</strong>가 "이 접두사로 가려면 이 AS들을 거친다"는 <strong>경로 전체</strong>를 광고한다(경로 벡터). 경로에 자기 AS가 이미 있으면 루프이므로 버린다. 중요한 점은 BGP의 선택이 최단 거리가 아니라 <strong>정책</strong>(어느 회사와 돈을 내고 연결했는지, 어떤 경로를 다른 AS에 알려 줄지)에 따른다는 것이다. 한 AS가 실수나 악의로 남의 접두사를 잘못 광고하면 그 트래픽이 엉뚱한 곳으로 빨려 들어가는 사고가 실제로 여러 번 있었고, 이를 막기 위해 경로 출처를 서명으로 검증하는 RPKI가 도입되고 있다.</p>
<h3>루프 방지와 traceroute</h3>
<p>경로가 잠시 꼬여 패킷이 라우터 사이를 맴돌더라도, IP 헤더의 TTL이 홉마다 1씩 줄어 0이 되면 버려진다. traceroute는 TTL을 1, 2, 3…으로 늘려 보내고 각 라우터가 돌려주는 "시간 초과" 메시지로 경로를 알아낸다.</p>`,
    analogy: R`<p>택배 물류 센터. 분류 직원(포워딩)은 송장을 보고 "서울 강남구 역삼동 → 3번 레인, 서울 강남구 → 2번 레인, 서울 → 1번 레인" 중 <strong>가장 자세히 맞는 규칙</strong>을 골라 순식간에 보낸다. 규칙표를 만드는 건 본사(라우팅)다. <strong>링크 상태</strong>는 모든 센터가 전국 도로 지도를 공유하고 각자 길을 계산하는 방식, <strong>거리 벡터</strong>는 옆 센터가 "부산까지 우리 거쳐서 5시간"이라고 알려 주는 말만 믿는 방식이다. 회사 간 운송(BGP)은 가장 빠른 길이 아니라 계약 관계에 따라 정해진다.</p>`,
    diagram: { caption: '최장 접두 일치. 10.1.2.3은 네 항목에 모두 일치하지만, 가장 긴 접두사인 /24의 다음 홉(R3)으로 보낸다.', svg: R`
<svg viewBox="0 0 520 190" width="520">
<rect class="h" x="10" y="72" width="130" height="44" rx="6"/><text x="75" y="88" class="sm">패킷 목적지</text><text x="75" y="104">10.1.2.3</text>
<rect class="g" x="200" y="10" width="300" height="26"/><text x="285" y="23" class="sm">접두사</text><text x="445" y="23" class="sm">다음 홉</text>
<rect class="n" x="200" y="40" width="180" height="30"/><rect class="n" x="380" y="40" width="120" height="30"/><text x="290" y="55" class="sm">0.0.0.0/0 (기본 경로)</text><text x="440" y="55" class="sm">ISP · 일치 0비트</text>
<rect class="n" x="200" y="74" width="180" height="30"/><rect class="n" x="380" y="74" width="120" height="30"/><text x="290" y="89" class="sm">10.0.0.0/8</text><text x="440" y="89" class="sm">R1 · 일치 8비트</text>
<rect class="n" x="200" y="108" width="180" height="30"/><rect class="n" x="380" y="108" width="120" height="30"/><text x="290" y="123" class="sm">10.1.0.0/16</text><text x="440" y="123" class="sm">R2 · 일치 16비트</text>
<rect class="h" x="200" y="142" width="180" height="30"/><rect class="h" x="380" y="142" width="120" height="30"/><text x="290" y="157" class="sm">10.1.2.0/24</text><text x="440" y="157" class="sm">R3 · 일치 24비트 ✔</text>
<path class="ha" d="M140,105 L198,152"/>
</svg>` },
    math: [
      { tex: R`D_x(y) = \min_{v \in \text{이웃}(x)} \big\{\, c(x, v) + D_v(y) \,\big\}`, explain: R`거리 벡터의 벨만-포드 갱신식.<ul class="defs"><li>$D_x(y)$: 라우터 $x$가 아는 목적지 $y$까지의 거리</li><li>$c(x,v)$: 이웃 $v$까지의 링크 비용</li><li>$D_v(y)$: 이웃이 알려 준 거리</li></ul>각 라우터는 이웃의 표만으로 계산한다.` },
    ],
    code: R`
import ipaddress as ip

class PrefixTrie:                                   # 비트 단위 트라이로 최장 접두 일치
  def __init__(self):
      self.root = {}
  def insert(self, prefix, hop):
      net, node = ip.ip_network(prefix), self.root
      for b in format(int(net.network_address), "032b")[:net.prefixlen]:
          node = node.setdefault(b, {})
      node["hop"] = hop
  def lookup(self, addr):
      node, best = self.root, None
      for b in format(int(ip.ip_address(addr)), "032b"):
          if "hop" in node:
              best = node["hop"]                  # 지금까지 일치한 가장 긴 접두사의 다음 홉
          if b not in node:
              return best
          node = node[b]
      return node.get("hop", best)

table = PrefixTrie()
for prefix, hop in [("0.0.0.0/0", "ISP"), ("10.0.0.0/8", "R1"), ("10.1.0.0/16", "R2"), ("10.1.2.0/24", "R3")]:
  table.insert(prefix, hop)
for dst in ["10.1.2.3", "10.1.9.9", "10.200.0.1", "8.8.8.8"]:
  print(f"{dst:12s} → {table.lookup(dst)}")

# 거리 벡터의 무한 카운팅: A — B — C 일렬 연결에서 B–C 링크가 끊어지면?
INF = 16                                            # RIP에서 16 = 도달 불가
def after_failure(poison_reverse):
  dA, rounds = 2, []                              # 끊기기 전: A→C = 2 (B 경유)
  while True:
      a_adv = INF if poison_reverse else dA       # A는 C에 B를 거쳐 가므로, 포이즌 리버스면 B에게 '무한대'라고 알림
      dB = min(INF, 1 + a_adv)                    # B는 남은 이웃 A의 광고만 믿고 갱신
      dA = min(INF, 1 + dB)
      rounds.append((dB, dA))
      if dB == INF and dA == INF:
          return rounds

print("기본 거리 벡터 (B→C, A→C):", after_failure(False))
print("포이즌 리버스            :", after_failure(True))
`,
    links: [
      { to: 'ds-shortest', why: '링크 상태 = 다익스트라, 거리 벡터 = 벨만-포드' },
      { to: 'ds-graph', why: '네트워크는 라우터를 정점, 링크를 간선으로 하는 그래프' },
      { to: 'net-ip', why: '접두사와 CIDR, 경로 집약' },
      { to: 'ds-tree', why: '최장 접두 일치를 위한 트라이(접두사 트리)' },
      { to: 'net-congestion', why: '라우터의 출력 큐에서 혼잡이 생긴다' },
    ],
    quiz: [
      { q: '포워딩 표에 10.0.0.0/8 → R1, 10.1.0.0/16 → R2가 있을 때 목적지 10.1.5.5인 패킷은?',
        options: ['R1 — 먼저 등록된 항목이므로', 'R2 — 두 항목 모두 일치하지만 더 긴(구체적인) 접두사가 우선이므로', '두 경로로 나눠 보낸다', '일치하는 항목이 없어 버린다'], answer: 1,
        explain: '최장 접두 일치. 덕분에 큰 블록 경로 하나와 소수의 예외 경로로 표를 작게 유지할 수 있다.' },
      { q: '거리 벡터 라우팅에서 "무한 카운팅" 문제가 생기는 원인은?',
        options: ['링크 비용이 음수라서', '각 라우터가 전체 지도 없이 이웃의 거리 정보만 믿기 때문에, 끊긴 경로에 대한 오래된 정보를 서로 주고받으며 거리를 조금씩 키워 가기 때문', '다익스트라 알고리즘의 버그'], answer: 1,
        explain: 'B는 "A가 C까지 2라고 했으니 나는 3"이라고 믿고, A는 다시 B를 믿는다. 포이즌 리버스와 최대 거리 제한으로 완화한다. 링크 상태 방식은 전체 지도를 알아 이 문제가 없다.' },
      { q: 'BGP가 고른 AS 간 경로가 홉 수 기준 최단 경로가 아닐 수 있는 이유는?',
        options: ['BGP 계산이 부정확해서', 'BGP는 비용 계약·트래픽 정책 같은 조직 간 관계에 따라 경로를 고르고 알리는 정책 기반 프로토콜이기 때문', '인터넷에는 최단 경로가 존재하지 않아서'], answer: 1,
        explain: 'ISP는 돈을 받는 고객의 트래픽은 나르지만, 돈을 내야 하는 경로로는 남의 트래픽을 보내지 않으려 한다. 기술보다 경제가 경로를 정한다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 4~5장 — 네트워크 계층(데이터·제어 평면)', 'RFC 2328 (OSPF v2), RFC 4271 (BGP-4)', 'Cloudflare Learning Center — What is BGP? / What is routing?'],
  },
  {
    id:'net-dns', title: 'DNS',
    summary: R`도메인 → IP 변환 <strong>분산 데이터베이스</strong>
계층적 <strong>위임</strong> + TTL 기반 <strong>캐싱</strong>
장애·보안 문제의 단골 출발점`,
    body: R`
<h3>왜 분산인가</h3>
<p>초기 인터넷은 모든 이름과 주소를 담은 파일 하나(hosts.txt)를 나눠 썼다. 호스트가 늘자 파일 하나를 한 곳에서 관리·배포하는 방식은 규모, 단일 장애점, 관리 권한 모든 면에서 불가능해졌다. DNS는 이름 공간을 <strong>트리</strong>로 나누고, 각 가지의 관리를 그 가지의 주인에게 맡긴다.</p>
<h3>계층과 위임</h3>
<p>이름은 오른쪽에서 왼쪽으로 읽는 트리 경로다: <code>www.example.com.</code> = 루트(.) → <code>com</code> → <code>example</code> → <code>www</code>.</p>
<ul>
<li><strong>루트 서버</strong>: 각 TLD(.com, .kr …)를 담당하는 서버가 어디인지만 안다. 루트 서버 이름은 a~m 13개지만, 각각 애니캐스트로 전 세계 수많은 지점에 복제되어 있다.</li>
<li><strong>TLD 서버</strong>: <code>example.com</code>을 담당하는 네임서버가 어디인지 안다.</li>
<li><strong>권한(authoritative) 서버</strong>: 그 도메인의 실제 레코드를 가진다. 도메인 주인이 관리한다.</li>
</ul>
<p>상위는 하위의 "담당자 위치"만 알면 되므로(위임), 누구도 전체를 알 필요가 없고 각자 자기 영역만 관리한다.</p>
<h3>이름 해석 과정</h3>
<p>내 컴퓨터의 스텁 리졸버는 보통 <strong>재귀 리졸버</strong>(ISP의 DNS, 8.8.8.8, 1.1.1.1 등)에 "답을 찾아 달라"고 한 번 묻는다. 재귀 리졸버는 루트 → TLD → 권한 서버 순으로 <strong>반복 질의</strong>하며 답을 찾아 돌려주고, 결과를 <strong>캐시</strong>한다. 루트와 TLD 서버의 위치도 캐시되므로 실제로는 대부분의 질의가 캐시에서 끝난다.</p>
<h3>레코드와 TTL</h3>
<p>주요 레코드: <strong>A</strong>(IPv4 주소), <strong>AAAA</strong>(IPv6), <strong>CNAME</strong>(다른 이름의 별칭), <strong>MX</strong>(메일 서버), <strong>NS</strong>(이 영역의 네임서버, 위임에 사용), <strong>TXT</strong>(도메인 소유 확인, 메일 인증 등 임의 문자열). 모든 레코드에는 <strong>TTL</strong>(캐시해도 되는 초)이 붙는다. TTL이 길면 질의 부하와 지연이 줄지만 주소를 바꿨을 때 전 세계에 반영되기까지 오래 걸리고, 짧으면 그 반대다. 서버 이전 전에 TTL을 미리 줄여 두는 이유다.</p>
<h3>전송과 확장 용도</h3>
<p>질의-응답이 짧아 기본적으로 <strong>UDP 53번</strong> 포트를 쓰고, 응답이 크거나 영역 전체를 복제할 때는 TCP를 쓴다. CDN과 로드 밸런서는 질의한 사용자의 위치나 서버 상태에 따라 다른 IP를 응답해 트래픽을 분산하는 데 DNS를 이용한다.</p>
<h3>보안과 프라이버시</h3>
<p>전통적인 DNS는 암호화도 서명도 없다. 위조 응답을 리졸버 캐시에 심는 <strong>캐시 포이즈닝</strong>을 막기 위해 질의 ID와 출발지 포트를 무작위화하고, <strong>DNSSEC</strong>은 레코드에 전자서명을 붙여 위조를 검증할 수 있게 한다(무결성, 암호화는 아님). 어떤 사이트를 찾는지 평문으로 드러나는 문제는 DNS over HTTPS/TLS(DoH/DoT)로 암호화해 해결한다. 설정 실수 하나가 서비스 전체를 마비시키는 경우가 많아 "문제의 원인은 항상 DNS"라는 농담이 있다.</p>`,
    analogy: R`<p>모르는 회사의 담당자 전화번호 찾기. 안내원(재귀 리졸버)에게 부탁하면, 안내원이 국가 대표번호 안내(루트)에 "기업 번호는 어디서?"라고 묻고, 기업 안내(TLD)에 "그 회사 대표번호는?"이라고 묻고, 그 회사 교환실(권한 서버)에서 담당자 번호를 받아 알려 준다. 안내원은 자주 묻는 번호를 수첩에 적어 두고(캐시), 수첩의 번호는 "며칠까지 유효"(TTL)라고 표시해 둔다.</p>`,
    diagram: { caption: '재귀 리졸버의 반복 질의. 각 서버는 자기 아래 담당자의 위치만 알려 주고(위임), 마지막 권한 서버가 실제 주소를 준다.', svg: R`
<svg viewBox="0 0 560 225" width="560">
<rect class="n" x="10" y="90" width="90" height="40" rx="6"/><text x="55" y="110" class="sm">내 컴퓨터</text>
<rect class="h" x="150" y="90" width="120" height="40" rx="6"/><text x="210" y="103" class="sm">재귀 리졸버</text><text x="210" y="119" class="sm">(캐시 보유)</text>
<rect class="n" x="400" y="20" width="150" height="40" rx="6"/><text x="475" y="40" class="sm">루트 서버 (.)</text>
<rect class="n" x="400" y="90" width="150" height="40" rx="6"/><text x="475" y="110" class="sm">TLD 서버 (com.)</text>
<rect class="n" x="400" y="160" width="150" height="40" rx="6"/><text x="475" y="180" class="sm">권한 서버 (example.com.)</text>
<path class="a" d="M100,104 H148"/><text x="124" y="94" class="sm">①</text>
<path class="a" d="M148,120 H102"/><text x="124" y="140" class="sm">⑤</text>
<path class="a" d="M270,100 L398,45"/><text x="320" y="58" class="sm">② .com 담당은?</text>
<path class="a" d="M270,110 H398"/><text x="335" y="100" class="sm">③ example.com 담당은?</text>
<path class="ha" d="M270,120 L398,175"/><text x="320" y="164" class="sm">④ www의 A 레코드</text>
<text x="280" y="216" class="sm">① www.example.com의 주소? ⑤ 203.0.113.10 (TTL 300초) — 결과를 캐시</text>
</svg>` },
    math: [
      { tex: R`\mathbb{E}[\text{조회 시간}] = h \cdot t_{\text{cache}} + (1 - h)\cdot t_{\text{full}}`, explain: R`<ul class="defs"><li>$h$: 리졸버 캐시 적중률</li><li>$t_\text{cache}$: 캐시 응답 시간(수 ms)</li><li>$t_\text{full}$: 루트부터 권한 서버까지 여러 번 왕복하는 시간(수십~수백 ms)</li></ul>TTL이 길수록 $h$가 커진다. CPU 캐시의 평균 접근 시간과 같은 구조다.` },
    ],
    code: R`
import socket, struct

def build_query(name, qtype=1, txid=0x1234):            # qtype 1 = A 레코드
  header = struct.pack("!HHHHHH", txid, 0x0100, 1, 0, 0, 0)    # 0x0100: 재귀 요청(RD) 플래그, 질문 1개
  qname = b"".join(bytes([len(label)]) + label.encode() for label in name.split(".")) + b"\0"
  return header + qname + struct.pack("!HH", qtype, 1)        # 클래스 1 = IN

q = build_query("www.example.com")
print(f"DNS 질의 메시지 {len(q)}바이트 (UDP 하나에 충분):", q.hex(" "))

# 위임 구조 흉내: 각 영역은 자기 바로 아래 담당자만 안다
ZONES = {
  ".":            {"com.": "a.gtld-servers.net"},
  "com.":         {"example.com.": "ns1.example.com"},
  "example.com.": {"www.example.com.": ("203.0.113.10", 300)},   # (주소, TTL초)
}

def iterative_resolve(name):
  labels = name.rstrip(".").split(".")
  zone, path = ".", []
  for i in range(len(labels) - 1, -1, -1):             # 오른쪽(상위)부터 한 단계씩 내려간다
      child = ".".join(labels[i:]) + "."
      answer = ZONES[zone][child]
      path.append(f"[{zone}]에 '{child}' 질의")
      if isinstance(answer, tuple):
          return answer, path
      zone = child                                     # 위임받은 하위 서버로 이동

class CachingResolver:
  def __init__(self):
      self.cache = {}
  def resolve(self, name, now):
      if name in self.cache and self.cache[name][1] > now:
          return self.cache[name][0], "캐시 적중"
      (addr, ttl), path = iterative_resolve(name)
      self.cache[name] = (addr, now + ttl)
      return addr, " → ".join(path)

r = CachingResolver()
for t in [0, 100, 400]:                                  # 0초, 100초, 400초 (TTL 300초)
  print(f"t={t:3d}s:", r.resolve("www.example.com", t))

print("localhost (hosts 파일):", sorted({ai[4][0] for ai in socket.getaddrinfo("localhost", 80, proto=socket.IPPROTO_TCP)}))
`,
    links: [
      { to: 'net-udp', why: 'DNS의 기본 전송: 짧은 질의-응답에 맞는 UDP' },
      { to: 'net-ip', why: 'DNS가 돌려주는 것: IP 주소' },
      { to: 'ds-tree', why: '도메인 이름 공간은 트리이고, 위임은 서브트리 관리권 이양' },
      { to: 'ds-hash', why: '리졸버 캐시 = 이름을 키로 하는 해시 테이블 + 만료 시간' },
      { to: 'sec-asym', why: 'DNSSEC은 레코드에 전자서명을 붙여 위조를 막는다' },
      { to: 'net-http', why: '브라우저가 HTTP 요청 전에 가장 먼저 하는 일이 DNS 조회' },
    ],
    quiz: [
      { q: '루트 서버가 전 세계 모든 도메인의 주소를 알지 못해도 이름 해석이 되는 이유는?',
        options: ['루트 서버 수가 매우 많아서', '각 단계는 바로 아래 담당 서버의 위치만 알려 주면 되는 위임 구조라, 루트는 TLD 서버 위치만 알면 되기 때문', '모든 컴퓨터가 hosts 파일을 갖고 있어서'], answer: 1,
        explain: '트리의 각 노드는 자식의 위치만 알면 된다. 관리 권한도 함께 위임되어 example.com의 레코드는 그 주인이 직접 관리한다.' },
      { q: '웹 서버를 새 IP로 옮길 예정이다. 이전 며칠 전에 A 레코드의 TTL을 짧게 줄여 두는 이유는?',
        options: ['DNS 서버 비용을 줄이려고', '전 세계 리졸버들이 옛 주소를 캐시하는 시간을 줄여, 주소를 바꾼 뒤 새 주소가 빨리 반영되게 하려고', 'TTL이 짧으면 보안이 강해져서'], answer: 1,
        explain: 'TTL 동안 캐시된 옛 주소가 계속 쓰인다. 이전이 끝나면 다시 TTL을 늘려 질의 부하를 줄인다.' },
      { q: 'DNSSEC이 해결하는 문제로 옳은 것은?',
        options: ['어떤 사이트를 조회하는지 숨긴다(프라이버시)', '응답 레코드에 전자서명을 붙여 위조된 응답(캐시 포이즈닝)을 검증할 수 있게 한다(무결성)', 'DNS 조회 속도를 높인다'], answer: 1,
        explain: 'DNSSEC은 내용을 암호화하지 않는다. 조회 내용을 숨기는 것은 DoH/DoT의 역할이다.' },
    ],
    resources: ['Kurose & Ross, 『컴퓨터 네트워킹 하향식 접근』 2.4절 — DNS', 'RFC 1034, RFC 1035 (DNS 개념과 메시지 형식)', 'Julia Evans, 「How DNS Works」 진 / Cloudflare Learning Center — What is DNS?'],
  },
  {
    id:'net-http', title: 'HTTP',
    summary: R`<strong>요청-응답</strong> 프로토콜
메서드·상태 코드·헤더 + <strong>무상태성</strong>
버전별 연결 방식 개선: 1.1 → 2 → 3`,
    body: R`
<h3>메시지 구조</h3>
<p>HTTP/1.1 메시지는 사람이 읽을 수 있는 텍스트다. 요청은 <strong>시작줄</strong>(메서드, 경로, 버전), <strong>헤더</strong>(이름: 값), 빈 줄, <strong>본문</strong>으로 이뤄진다. 응답의 시작줄은 버전과 상태 코드다. TCP는 메시지 경계를 모르므로 <code>Content-Length</code> 헤더(또는 청크 인코딩)로 본문이 어디서 끝나는지 알린다.</p>
<h3>메서드의 의미: 안전성과 멱등성</h3>
<table><tr><th>메서드</th><th>의미</th><th>안전(서버 상태 불변)</th><th>멱등(여러 번 = 한 번)</th></tr>
<tr><td>GET</td><td>자원 조회</td><td>예</td><td>예</td></tr>
<tr><td>POST</td><td>생성·처리 요청</td><td>아니오</td><td>아니오</td></tr>
<tr><td>PUT</td><td>자원을 통째로 교체</td><td>아니오</td><td>예</td></tr>
<tr><td>PATCH</td><td>일부 수정</td><td>아니오</td><td>보장 안 됨</td></tr>
<tr><td>DELETE</td><td>삭제</td><td>아니오</td><td>예</td></tr></table>
<p>멱등성이 중요한 이유는 <strong>네트워크 실패</strong> 때문이다. 요청을 보냈는데 응답이 안 왔다면, 서버가 처리했는지 알 수 없다. 멱등한 요청은 다시 보내도 결과가 같으므로 안전하게 재시도할 수 있다. POST로 결제를 재시도하면 이중 결제가 될 수 있어, 결제 API는 멱등성 키(요청 고유 ID)를 따로 받기도 한다.</p>
<h3>상태 코드</h3>
<p><strong>2xx</strong> 성공(200 OK, 201 Created, 204 No Content), <strong>3xx</strong> 다른 곳을 보라(301 영구 이동, 304 캐시된 것 그대로 써도 됨), <strong>4xx</strong> 클라이언트 잘못(400 형식 오류, 401 인증 필요, 403 권한 없음, 404 없음, 429 요청 과다), <strong>5xx</strong> 서버 잘못(500 내부 오류, 502 게이트웨이 뒤 서버 응답 이상, 503 일시적 사용 불가). 4xx는 같은 요청을 재시도해도 소용없고, 5xx·429는 잠시 후 재시도할 가치가 있다.</p>
<h3>무상태성</h3>
<p>서버는 요청 사이에 클라이언트 상태를 기억하지 않는다. 모든 요청이 처리에 필요한 정보를 스스로 담는다. 덕분에 어떤 서버가 요청을 받아도 처리할 수 있어 <strong>서버를 늘려 확장하기 쉽다</strong>. 로그인 상태는 쿠키(세션 ID)나 토큰을 매 요청 헤더에 실어 보내 유지한다.</p>
<h3>캐싱</h3>
<p><code>Cache-Control</code> 헤더로 브라우저·CDN이 응답을 얼마나 재사용할지 정한다. 기한이 지나면 <code>ETag</code>(내용 식별자)를 담아 조건부 요청을 보내고, 바뀌지 않았으면 서버는 본문 없이 304를 돌려준다.</p>
<h3>버전별 연결 사용 방식</h3>
<ul>
<li><strong>HTTP/1.0</strong>: 요청마다 TCP 연결을 새로 맺었다. 핸드셰이크 비용이 매번 든다.</li>
<li><strong>HTTP/1.1</strong>: 연결을 재사용(keep-alive)한다. 하지만 한 연결에서 응답은 요청 순서대로 와야 해서, 느린 응답 하나가 뒤를 막는다. 브라우저는 도메인당 여러 연결을 열어 우회했다.</li>
<li><strong>HTTP/2</strong>: 메시지를 바이너리 프레임으로 쪼개 <strong>하나의 TCP 연결에서 여러 스트림을 섞어</strong> 보내고(다중화), 반복되는 헤더를 압축한다. 하지만 TCP 패킷 하나를 잃으면 TCP가 순서를 지키느라 모든 스트림이 함께 멈춘다.</li>
<li><strong>HTTP/3</strong>: UDP 기반 QUIC 위에서 동작해 스트림별로 독립적으로 손실을 복구한다. 연결 설정과 TLS 핸드셰이크도 합쳐 왕복 수를 줄였다.</li>
</ul>
<h3>API와 ML 서빙</h3>
<p>REST 스타일 API는 자원을 URL로, 행위를 메서드로 표현하고 주로 JSON을 주고받는다. ML 모델 서빙(FastAPI 등)도 대부분 HTTP API이며, LLM API는 생성되는 토큰을 응답 하나에 조금씩 흘려 보내는 스트리밍(Server-Sent Events, <code>text/event-stream</code>)을 많이 쓴다.</p>`,
    analogy: R`<p>주문서와 영수증. 손님(클라이언트)은 매번 "무엇을(경로), 어떻게(메서드), 부가 정보(헤더), 내용(본문)"을 적은 주문서를 내고, 점원(서버)은 결과 코드가 적힌 영수증을 준다. 점원은 손님을 기억하지 않으므로(무상태) 단골 카드(쿠키·토큰)를 매번 보여 줘야 한다. 대신 어느 점원에게 가도 같은 서비스를 받을 수 있다. "같은 주문서를 두 번 내도 결과가 같은가"가 멱등성이다 — "콜라를 1잔으로 바꿔 주세요"(PUT)는 두 번 말해도 1잔이지만, "콜라 1잔 추가요"(POST)는 두 번 말하면 2잔이 된다.</p>`,
    diagram: { caption: 'HTTP/1.1 요청과 응답 메시지. 빈 줄이 헤더와 본문을 나누고, Content-Length가 본문의 끝을 알린다.', svg: R`
<svg viewBox="0 0 560 190" width="560">
<text x="185" y="12">요청</text><text x="432" y="12">응답</text>
<text x="8" y="40" class="st sm">시작줄</text><text x="8" y="80" class="st sm">헤더</text><text x="8" y="120" class="st sm">빈 줄</text><text x="8" y="155" class="st sm">본문</text>
<rect class="h" x="70" y="25" width="230" height="28"/><text x="80" y="39" class="st sm">GET /apple HTTP/1.1</text>
<rect class="n" x="70" y="56" width="230" height="50"/><text x="80" y="71" class="st sm">Host: api.example.com</text><text x="80" y="91" class="st sm">Accept: application/json</text>
<rect class="g" x="70" y="109" width="230" height="22"/><text x="80" y="120" class="st sm">\r\n</text>
<rect class="n" x="70" y="134" width="230" height="40"/><text x="80" y="154" class="st sm">(GET은 보통 본문 없음)</text>
<rect class="h" x="315" y="25" width="235" height="28"/><text x="325" y="39" class="st sm">HTTP/1.1 200 OK</text>
<rect class="n" x="315" y="56" width="235" height="50"/><text x="325" y="71" class="st sm">Content-Type: application/json</text><text x="325" y="91" class="st sm">Content-Length: 15</text>
<rect class="g" x="315" y="109" width="235" height="22"/><text x="325" y="120" class="st sm">\r\n</text>
<rect class="n" x="315" y="134" width="235" height="40"/><text x="325" y="154" class="st sm">{"price": 1000}</text>
</svg>` },
    code: R`
import http.client, http.server, json, socket, threading

class Handler(http.server.BaseHTTPRequestHandler):
  protocol_version = "HTTP/1.1"                      # keep-alive: 연결 재사용
  items = {}
  def _send(self, code, body):
      data = json.dumps(body, ensure_ascii=False).encode()
      self.send_response(code)
      self.send_header("Content-Type", "application/json; charset=utf-8")
      self.send_header("Content-Length", str(len(data)))    # 본문 길이로 메시지 경계를 알린다
      self.end_headers()
      self.wfile.write(data)
  def do_GET(self):
      key = self.path.strip("/")
      if key in self.items:
          self._send(200, {key: self.items[key]})
      else:
          self._send(404, {"error": "없음"})
  def do_PUT(self):                                  # 멱등: 몇 번 보내도 결과가 같다
      n = int(self.headers["Content-Length"])
      self.items[self.path.strip("/")] = json.loads(self.rfile.read(n))
      self._send(200, {"ok": True})
  def log_message(self, *args):
      pass

srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
port = srv.server_address[1]

conn = http.client.HTTPConnection("127.0.0.1", port)  # TCP 연결 하나로 여러 요청
for method, path, body in [("GET", "/apple", None), ("PUT", "/apple", {"price": 1000}),
                         ("PUT", "/apple", {"price": 1000}), ("GET", "/apple", None)]:
  conn.request(method, path, body=json.dumps(body) if body else None,
               headers={"Content-Type": "application/json"})
  r = conn.getresponse()
  print(f"{method:3s} {path} → {r.status} {r.reason} {r.read().decode()}  (로컬 포트 {conn.sock.getsockname()[1]})")
conn.close()

# HTTP/1.1은 결국 TCP 위의 텍스트다
with socket.create_connection(("127.0.0.1", port)) as s:
  s.sendall(b"GET /apple HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n")
  raw = b""
  while chunk := s.recv(4096):
      raw += chunk
print(raw.decode().replace("\r\n", " ⏎ "))
srv.shutdown()
srv.server_close()
`,
    links: [
      { to: 'net-tcp', why: 'HTTP/1.1·2는 TCP 연결 위에서 동작한다' },
      { to: 'net-tls', why: 'HTTPS = HTTP over TLS' },
      { to: 'net-dns', why: '요청 전에 도메인 이름을 IP로 바꾼다' },
      { to: 'net-udp', why: 'HTTP/3는 UDP 기반 QUIC을 쓴다' },
      { to: 'net-websocket', why: '요청-응답을 넘어선 양방향 실시간 통신' },
      { to: 'sec-auth', why: '무상태 프로토콜에서 로그인을 유지하는 쿠키·세션·JWT' },
      { to: 'sec-web', why: 'HTTP를 노리는 웹 공격: XSS, CSRF, SQL 인젝션' },
      { to: 'ai-mlops', why: '모델을 HTTP API로 서빙하기' },
    ],
    quiz: [
      { q: '타임아웃으로 응답을 받지 못한 요청을 자동으로 재시도할 때, PUT은 비교적 안전하고 POST는 위험한 이유는?',
        options: ['POST는 더 큰 데이터를 보내서', 'PUT은 멱등이라 여러 번 실행해도 결과가 같지만, POST는 실행할 때마다 새 자원 생성·결제 같은 부작용이 반복될 수 있기 때문', 'PUT은 서버가 처리하지 않아서'], answer: 1,
        explain: '첫 요청이 실제로는 처리됐는데 응답만 유실됐을 수 있다. POST 재시도가 필요하면 멱등성 키로 중복 처리를 막는다.' },
      { q: 'HTTP가 무상태로 설계되어 얻는 가장 큰 이점과, 그로 인해 필요한 장치는?',
        options: ['속도가 빨라진다 / 압축', '어느 서버가 요청을 받아도 처리할 수 있어 수평 확장이 쉽다 / 로그인 상태를 쿠키·토큰으로 매 요청에 실어 보낸다', '보안이 강해진다 / 암호화'], answer: 1,
        explain: '서버가 클라이언트별 대화 상태를 들고 있지 않으므로 로드 밸런서가 요청을 아무 서버에나 보낼 수 있다.' },
      { q: 'HTTP/2가 한 TCP 연결에서 여러 요청을 다중화해도 Head-of-Line 블로킹이 완전히 사라지지 않는 이유는?',
        options: ['HTTP/2는 요청을 순서대로만 처리해서', 'TCP는 바이트 순서를 보장하므로, 패킷 하나를 잃으면 재전송될 때까지 그 연결의 모든 스트림 데이터가 응용에 전달되지 않기 때문', '헤더 압축 때문'], answer: 1,
        explain: 'HTTP 수준의 HOL은 해결했지만 TCP 수준의 HOL이 남는다. HTTP/3는 스트림을 독립적으로 다루는 QUIC으로 이를 해결했다.' },
    ],
    resources: ['MDN Web Docs — An overview of HTTP, HTTP request methods, HTTP response status codes', 'Ilya Grigorik, 『High Performance Browser Networking』 (무료 온라인, HTTP/1.1·2 장)', 'RFC 9110 (HTTP Semantics), RFC 9114 (HTTP/3)'],
  },
  {
    id:'net-websocket', title: 'WebSocket',
    summary: R`HTTP로 시작해 <strong>Upgrade</strong> → 하나의 TCP 연결에서 <strong>양방향·실시간</strong> 통신
요청 없이도 서버가 먼저 전송(푸시), 메시지당 헤더 2~14바이트
대안 비교: 폴링·롱폴링·SSE / 대가: 연결 상태 유지 → 확장이 어려움`,
    body: R`
<h3>왜 필요한가: HTTP는 클라이언트만 말을 걸 수 있다</h3>
<p>HTTP는 요청이 있어야 응답이 있다. 채팅·알림·주식 시세·협업 편집처럼 <strong>서버 쪽에서 새 일이 생기는</strong> 서비스에서는 서버가 먼저 알릴 방법이 없다. 그래서 등장한 우회책과 WebSocket을 비교하면 다음과 같다.</p>
<table><tr><th>방식</th><th>동작</th><th>방향</th><th>비용·한계</th></tr>
<tr><td>폴링</td><td>몇 초마다 "새 소식 있어?" 요청</td><td>클라 → 서버</td><td>대부분 빈 응답, 요청마다 헤더 수백 바이트, 주기만큼 지연</td></tr>
<tr><td>롱폴링</td><td>서버가 새 소식이 생길 때까지 응답을 붙잡아 둠</td><td>클라 → 서버</td><td>지연은 줄지만 응답마다 다시 요청, 서버가 대기 연결을 계속 들고 있음</td></tr>
<tr><td>SSE</td><td>응답 하나를 끝내지 않고 이벤트를 계속 흘려 보냄 (<code>text/event-stream</code>)</td><td>서버 → 클라 (단방향)</td><td>평범한 HTTP라 인프라 호환이 좋고 자동 재연결 지원, 클라이언트 → 서버는 별도 요청</td></tr>
<tr><td>WebSocket</td><td>연결을 업그레이드한 뒤 양쪽이 아무 때나 프레임 전송</td><td>양방향 (전이중)</td><td>지연·오버헤드 최소, 대신 연결 상태를 서버가 유지</td></tr></table>

<h3>핸드셰이크: HTTP로 시작해서 프로토콜을 갈아탄다</h3>
<p>WebSocket은 별도 포트가 아니라 <strong>HTTP 요청으로 시작</strong>한다. 그래서 80/443 포트와 기존 프록시·방화벽을 그대로 통과한다.</p>
<ol>
<li>클라이언트: <code>GET /chat</code> + <code>Upgrade: websocket</code>, <code>Connection: Upgrade</code>, 무작위 16바이트를 base64로 만든 <code>Sec-WebSocket-Key</code></li>
<li>서버: <code>101 Switching Protocols</code> + <code>Sec-WebSocket-Accept</code> = base64(SHA-1(Key + 고정 GUID))</li>
<li>이후 같은 TCP 연결은 더 이상 HTTP가 아니라 <strong>WebSocket 프레임</strong>을 주고받는다.</li>
</ol>
<p>Accept 값은 보안용 인증이 아니라 "이 서버가 WebSocket을 진짜로 이해한다"는 확인이다. 일반 HTTP 서버나 캐시가 실수로 업그레이드에 응한 것처럼 보이는 일을 막는다.</p>

<h3>프레임 구조</h3>
<p>TCP는 바이트 스트림이라 메시지 경계가 없다. HTTP가 <code>Content-Length</code>로 경계를 정하듯, WebSocket은 매 메시지 앞에 작은 <strong>프레임 헤더</strong>를 붙인다.</p>
<ul>
<li><strong>FIN</strong>: 메시지의 마지막 조각인지 (큰 메시지는 여러 프레임으로 쪼갤 수 있음)</li>
<li><strong>opcode</strong>: 1 텍스트, 2 바이너리, 8 종료(close), 9 ping, 10 pong</li>
<li><strong>길이</strong>: 125 이하는 7비트에 바로, 그 이상은 16비트·64비트 확장 길이</li>
<li><strong>마스킹</strong>: 클라이언트 → 서버 프레임은 4바이트 키로 XOR 마스킹이 필수. 악의적인 페이지가 보낸 바이트가 중간 프록시에게 HTTP 요청처럼 보여 캐시를 오염시키는 공격을 막기 위한 장치다(암호화가 아님).</li>
</ul>
<p>헤더는 2~14바이트뿐이다. 매 요청에 쿠키·헤더 수백 바이트를 싣는 폴링과 비교하면, 작은 메시지가 잦을수록 차이가 커진다.</p>

<h3>연결을 유지한다는 것의 대가</h3>
<ul>
<li><strong>상태가 있는 연결</strong>: HTTP의 무상태성 덕분에 아무 서버나 요청을 받을 수 있었지만, WebSocket 사용자는 특정 서버에 오래 붙어 있다. 서버가 여러 대면 "A 서버에 붙은 사람에게 B 서버에서 생긴 메시지를 전달"하기 위해 Redis pub/sub 같은 <strong>서버 간 메시지 버스</strong>가 필요하다.</li>
<li><strong>동시 연결 수</strong>: 연결마다 소켓과 메모리를 차지한다. 수만 개 연결을 스레드 하나씩으로 처리하면 버티지 못해서, 이벤트 루프(<code>asyncio</code>, epoll) 기반 서버를 쓴다.</li>
<li><strong>끊김 대비</strong>: NAT·프록시는 한동안 조용한 연결을 몰래 끊는다. ping/pong으로 주기적으로 살아 있음을 확인하고(하트비트), 클라이언트는 끊기면 재연결한 뒤 놓친 메시지를 다시 받아야 한다. 프로토콜이 이것을 대신 해 주지 않는다.</li>
</ul>

<h3>보안</h3>
<ul>
<li><code>wss://</code> = TLS 위의 WebSocket. 실서비스는 항상 wss를 쓴다(평문 ws는 중간 장비가 끊거나 엿볼 수 있음).</li>
<li>브라우저 WebSocket에는 같은 출처 정책(CORS)이 적용되지 않는다. 서버가 핸드셰이크의 <code>Origin</code> 헤더를 검사하지 않으면, 다른 사이트가 사용자의 쿠키로 연결을 열 수 있다(Cross-Site WebSocket Hijacking).</li>
<li>연결 후 들어오는 메시지도 HTTP 요청과 똑같이 인증·검증해야 한다.</li>
</ul>

<h3>어디에 쓰나</h3>
<p>채팅·게임·협업 편집·실시간 대시보드처럼 <strong>양방향으로 자주</strong> 주고받는 곳에 쓴다. LLM 텍스트 응답 스트리밍은 서버 → 클라이언트 한 방향이면 충분해서 대부분 SSE를 쓰고, 음성 대화처럼 양쪽이 동시에 데이터를 흘려야 하는 실시간 API는 WebSocket(또는 WebRTC)을 쓴다.</p>`,
    analogy: R`<p>HTTP는 편지, WebSocket은 전화. 편지는 매번 봉투에 주소를 쓰고(헤더) 내가 보내야만 답장이 온다. 새 소식이 있는지 알려면 계속 편지를 보내 물어야 한다(폴링). WebSocket은 처음에 편지로 "전화로 바꿔도 될까요?"라고 묻고(Upgrade), 상대가 "좋아요"(101)라고 답하면 그때부터는 전화가 연결된 상태라 양쪽 누구든 아무 때나 바로 말할 수 있다. 대신 통화 중인 동안 회선을 계속 잡고 있어야 하고, 오래 조용하면 "여보세요?"(ping)로 끊기지 않았는지 확인해야 한다.</p>`,
    diagram: { caption: 'HTTP 요청으로 업그레이드를 협상한 뒤, 같은 TCP 연결에서 양쪽이 프레임을 자유롭게 보낸다. 서버는 요청 없이도 먼저 보낼 수 있다.', svg: R`
<svg viewBox="0 0 560 250" width="560">
<text x="90" y="14">클라이언트</text><text x="470" y="14">서버</text>
<path class="e d" d="M90,26 V240 M470,26 V240"/>
<path class="a" d="M90,48 H466"/><text x="280" y="38" class="sm">GET /chat · Upgrade: websocket · Sec-WebSocket-Key</text>
<path class="a" d="M470,82 H94"/><text x="280" y="72" class="sm">101 Switching Protocols · Sec-WebSocket-Accept</text>
<rect class="g" x="110" y="96" width="340" height="22" rx="4"/><text x="280" y="107" class="sm">여기부터 HTTP가 아니라 WebSocket 프레임 (같은 TCP 연결)</text>
<path class="ha" d="M90,142 H466"/><text x="280" y="132" class="sm">텍스트 프레임 "안녕" (마스킹)</text>
<path class="ha" d="M470,172 H94"/><text x="280" y="162" class="sm">echo: 안녕</text>
<path class="ha" d="M470,202 H94"/><text x="280" y="192" class="sm">요청 없이 서버가 먼저 푸시 (새 메시지 알림)</text>
<path class="a d" d="M90,232 H466"/><text x="280" y="222" class="sm">ping / pong · close</text>
</svg>` },
    code: R`
import base64, hashlib, os, socket, struct, threading

GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"   # RFC 6455에 고정된 값

def accept_key(key):
  """Sec-WebSocket-Accept = base64(SHA-1(Key + GUID))"""
  return base64.b64encode(hashlib.sha1((key + GUID).encode()).digest()).decode()

print("RFC 6455 예시 키 →", accept_key("dGhlIHNhbXBsZSBub25jZQ=="))   # s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

def read_headers(sock):
  buf = b""
  while not buf.endswith(b"\r\n\r\n"):        # 한 바이트씩: 뒤따르는 프레임까지 먹지 않도록
      buf += sock.recv(1)
  return buf.decode()

def recv_exact(sock, n):
  buf = b""
  while len(buf) < n:
      chunk = sock.recv(n - len(buf))
      if not chunk:
          raise ConnectionError("연결 끊김")
      buf += chunk
  return buf

def send_frame(sock, text, mask, opcode=1):
  data = text.encode()
  head = bytes([0x80 | opcode])               # FIN=1 + opcode(1=텍스트, 8=종료)
  m = 0x80 if mask else 0
  if len(data) < 126:
      head += bytes([m | len(data)])
  else:                                       # 64비트 길이(127)는 생략
      head += bytes([m | 126]) + struct.pack("!H", len(data))
  if mask:                                    # 클라이언트 → 서버는 마스킹 필수
      key = os.urandom(4)
      data = key + bytes(b ^ key[i % 4] for i, b in enumerate(data))
  sock.sendall(head + data)
  return len(head)

def recv_frame(sock):
  b1, b2 = recv_exact(sock, 2)
  n = b2 & 0x7F
  if n == 126:
      n = struct.unpack("!H", recv_exact(sock, 2))[0]
  key = recv_exact(sock, 4) if b2 & 0x80 else None
  data = recv_exact(sock, n)
  if key:
      data = bytes(b ^ key[i % 4] for i, b in enumerate(data))
  return b1 & 0x0F, data.decode()

def serve(conn):
  lines = read_headers(conn).split("\r\n")
  headers = dict(l.split(": ", 1) for l in lines[1:] if ": " in l)
  conn.sendall(("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n"
                f"Sec-WebSocket-Accept: {accept_key(headers['Sec-WebSocket-Key'])}\r\n\r\n").encode())
  send_frame(conn, "환영합니다 (요청 없이 서버가 먼저 보냄)", mask=False)
  while True:
      op, msg = recv_frame(conn)
      if op == 8:                             # close
          break
      send_frame(conn, f"echo: {msg}", mask=False)
  conn.close()

srv = socket.create_server(("127.0.0.1", 0))
threading.Thread(target=lambda: serve(srv.accept()[0]), daemon=True).start()

c = socket.create_connection(srv.getsockname())
key = base64.b64encode(os.urandom(16)).decode()
handshake = (f"GET /chat HTTP/1.1\r\nHost: localhost\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n"
           f"Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n")
c.sendall(handshake.encode())
status, *resp = read_headers(c).split("\r\n")
print(status, "| Accept 검증:", f"Sec-WebSocket-Accept: {accept_key(key)}" in resp)

print("받음:", recv_frame(c)[1])
for text in ["안녕", "실시간"]:
  head = send_frame(c, text, mask=True)
  print(f"보냄: {text!r} (프레임 헤더 {head}바이트 + 마스킹 키 4바이트) / 받음: {recv_frame(c)[1]}")
send_frame(c, "", mask=True, opcode=8)
c.close()
srv.close()
print(f"참고: 폴링이라면 메시지마다 이런 HTTP 요청 헤더({len(handshake)}바이트 수준)가 반복된다")
`,
    links: [
      { to: 'net-http', why: 'WebSocket은 HTTP 요청(Upgrade)으로 시작한다' },
      { to: 'net-tcp', why: '하나의 TCP 연결을 오래 유지하며 그 위에 프레임으로 메시지 경계를 만든다' },
      { to: 'net-tls', why: 'wss:// = TLS 위의 WebSocket' },
      { to: 'os-io', why: '수많은 연결을 이벤트 루프·비동기 I/O로 처리한다' },
      { to: 'sec-web', why: 'Origin 검사를 빠뜨리면 생기는 Cross-Site WebSocket Hijacking' },
    ],
    quiz: [
      { q: '채팅 서비스에서 1초 폴링 대신 WebSocket을 쓰면 줄어드는 비용으로 가장 알맞은 것은?',
        options: ['데이터를 더 강하게 암호화하는 비용', '새 메시지가 없어도 반복되는 요청과, 요청마다 붙는 수백 바이트 헤더 및 최대 1초의 지연', 'TCP 연결 자체를 유지하는 비용'], answer: 1,
        explain: '연결을 한 번 맺어 두면 서버가 메시지가 생긴 즉시 2~14바이트 헤더의 프레임으로 보낸다. 대신 연결을 유지하는 비용은 오히려 생긴다.' },
      { q: 'LLM API가 생성 중인 토큰을 보낼 때 WebSocket보다 SSE를 많이 쓰는 이유는?',
        options: ['서버 → 클라이언트 한 방향 전송이면 충분하고, 평범한 HTTP 응답이라 기존 프록시·인증·재연결 처리를 그대로 쓸 수 있어서', 'SSE가 양방향 통신을 지원해서', 'WebSocket은 텍스트를 보낼 수 없어서'], answer: 0,
        explain: '질문은 일반 HTTP 요청으로 보내고, 답만 스트리밍하면 된다. 양쪽이 동시에 계속 데이터를 흘려야 하는 실시간 음성 같은 경우에 WebSocket이 필요하다.' },
      { q: 'WebSocket 서버를 여러 대로 늘릴 때 일반 HTTP API보다 까다로운 이유는?',
        options: ['WebSocket은 포트를 하나만 쓸 수 있어서', '프레임 헤더가 HTTP 헤더보다 커서', '사용자가 특정 서버에 오래 연결된 상태라, 다른 서버에 붙은 사용자에게 전달하려면 서버 간 메시지 버스(pub/sub)와 재연결 처리가 필요해서'], answer: 2,
        explain: '무상태 HTTP는 어떤 서버가 요청을 받아도 되지만, WebSocket 연결은 상태다. 그래서 확장 설계가 "누가 어느 서버에 붙어 있나"를 다뤄야 한다.' },
    ],
    resources: ['RFC 6455 — The WebSocket Protocol', 'MDN Web Docs — The WebSocket API, Using server-sent events', 'Ilya Grigorik, 『High Performance Browser Networking』 (무료 온라인, WebSocket·SSE 장)'],
  },
  {
    id:'net-messaging', title: '메시지 큐와 비동기 메시징',
    summary: R`<strong>메시지 브로커</strong>로 보내는 쪽과 받는 쪽을 분리 → 비동기·느슨한 결합
Producer/Consumer: 메시지 하나를 <strong>소비자 하나</strong>가 처리 → 작업 분배·확장
Pub/Sub: 메시지 하나를 <strong>구독자 전원</strong>이 받음 → 이벤트 팬아웃`,
    body: R`
<h3>왜 필요한가: 직접 호출의 결합</h3>
<p>주문 서버가 재고·알림·분석 서버를 HTTP로 차례로 호출하면 세 가지가 묶인다.</p>
<ul>
<li><strong>시간 결합</strong>: 호출받는 서버가 지금 살아 있어야 한다. 알림 서버가 죽으면 주문까지 실패한다.</li>
<li><strong>속도 결합</strong>: 가장 느린 서버의 속도가 전체 응답 시간이 된다. 순간적으로 요청이 몰리면 뒤쪽 서버가 같이 무너진다.</li>
<li><strong>대상 결합</strong>: 보내는 쪽이 받는 쪽 목록을 알고 있어야 한다. 새 서비스가 생길 때마다 주문 서버 코드를 고친다.</li>
</ul>
<p>중간에 <strong>메시지 브로커</strong>(Kafka, RabbitMQ, Redis, 클라우드 큐 등)를 두면 보내는 쪽은 메시지를 맡기고 바로 돌아간다. 받는 쪽은 자기 속도로 가져가 처리한다. 메시지를 "누가 받느냐"에 따라 두 가지 방식으로 나뉜다.</p>

<h3>Producer/Consumer: 작업 큐 (점대점)</h3>
<ul>
<li>생산자가 큐에 넣은 메시지 <strong>하나는 소비자 하나만</strong> 가져가 처리한다.</li>
<li>같은 큐에 소비자를 여러 개 붙이면 메시지가 나뉘어 처리된다(<strong>경쟁 소비자</strong>). 처리량이 부족하면 워커만 늘리면 된다.</li>
<li>소비자가 처리를 끝내고 <strong>ack</strong>를 보내야 브로커가 메시지를 지운다. ack 전에 소비자가 죽으면 다른 소비자에게 다시 전달된다.</li>
<li>큐는 생산 속도와 소비 속도의 차이를 흡수하는 <strong>버퍼</strong>다. 큐 크기에 한계를 두면 소비자가 밀릴 때 생산자가 기다리게 된다(백프레셔).</li>
<li>예: 이미지 리사이즈, 이메일 발송, 결제 후처리, ML 배치 추론 작업 분배</li>
</ul>
<p>OS의 <strong>생산자-소비자 문제</strong>(유한 버퍼를 세마포어로 보호)와 같은 구조다. 스레드 사이의 버퍼가 서버 사이의 브로커로 커졌을 뿐이다.</p>

<h3>Publish/Subscribe: 토픽 (팬아웃)</h3>
<ul>
<li>발행자는 메시지를 <strong>토픽</strong>에 발행하고, 그 토픽을 구독한 <strong>모두가 각자 사본</strong>을 받는다.</li>
<li>발행자는 구독자가 누구인지, 몇 명인지 모른다. 새 서비스는 구독만 추가하면 되고 발행자 코드는 그대로다.</li>
<li>메시지는 "이 일을 해라"(명령)보다 "이런 일이 일어났다"(<strong>이벤트</strong>)에 가깝다. 예: <code>주문생성</code> 이벤트 하나 → 재고 차감, 알림 발송, 매출 집계가 각자 반응</li>
<li>예: 이벤트 기반 마이크로서비스, 실시간 알림 전파, 캐시 무효화 방송, 여러 WebSocket 서버에 채팅 메시지 전달</li>
</ul>

<h3>한눈에 비교</h3>
<table><tr><th></th><th>Producer/Consumer (큐)</th><th>Pub/Sub (토픽)</th></tr>
<tr><td>메시지 하나를 받는 수</td><td>소비자 1명</td><td>구독자 전원</td></tr>
<tr><td>받는 쪽을 늘리면</td><td>일이 나뉘어 <strong>처리량 증가</strong></td><td>같은 메시지를 받는 <strong>대상 증가</strong></td></tr>
<tr><td>메시지 성격</td><td>처리할 작업(명령)</td><td>일어난 사실(이벤트)</td></tr>
<tr><td>처리 후</td><td>ack하면 삭제</td><td>구독자마다 따로 소비 (보관 여부는 브로커마다 다름)</td></tr></table>

<h3>실제 브로커는 둘을 섞는다</h3>
<ul>
<li><strong>Kafka</strong>: 토픽은 지워지지 않는 로그다. <strong>컨슈머 그룹</strong>끼리는 Pub/Sub(그룹마다 전체 메시지를 받음), 같은 그룹 안의 소비자끼리는 Producer/Consumer(파티션을 나눠 맡음). 그룹마다 "어디까지 읽었나"(오프셋)를 따로 기록하므로, 나중에 생긴 그룹도 처음부터 다시 읽을 수 있다.</li>
<li><strong>RabbitMQ</strong>: 메시지는 exchange로 들어가 규칙에 따라 큐로 복사된다. fanout exchange에 큐를 여러 개 묶으면 Pub/Sub, 큐 하나에 소비자를 여러 개 붙이면 작업 큐다.</li>
<li><strong>Redis Pub/Sub</strong>: 메시지를 저장하지 않는다. 그 순간 연결된 구독자만 받고, 잠시 끊긴 구독자는 그동안의 메시지를 영영 놓친다. 놓치면 안 되는 이벤트에는 Redis Streams나 Kafka처럼 저장하는 방식을 쓴다.</li>
</ul>

<h3>전달 보장: 유실·중복·순서</h3>
<ul>
<li><strong>at-most-once</strong>: 받자마자 ack. 처리 중 죽으면 유실된다.</li>
<li><strong>at-least-once</strong>: 처리 후 ack. 처리는 했는데 ack가 유실되면 <strong>같은 메시지가 다시 온다</strong>. 그래서 소비자를 <strong>멱등</strong>하게 만든다(메시지 ID를 기록해 두고 이미 처리한 것은 건너뛰기). 실무 기본값이다.</li>
<li><strong>exactly-once</strong>: 브로커와 저장소가 함께 협력해야 해서 어렵고 비싸다. 대부분 "at-least-once + 멱등 소비자"로 같은 효과를 낸다.</li>
<li><strong>순서</strong>: 소비자가 여럿이면 전체 순서는 보장되지 않는다. Kafka는 <strong>파티션 안에서만</strong> 순서를 지키므로, 같은 주문의 이벤트는 같은 키로 보내 한 파티션에 모은다.</li>
<li>계속 실패하는 메시지는 무한 재시도하지 않고 <strong>DLQ</strong>(dead-letter queue)로 빼서 따로 살펴본다. 소비가 생산을 못 따라가는 정도(lag)는 핵심 모니터링 지표다.</li>
</ul>`,
    analogy: R`<p>Producer/Consumer는 식당 주방의 주문 꽂이. 홀 직원(생산자)이 주문서를 꽂으면 요리사(소비자) 중 손이 빈 사람이 하나씩 뽑아 간다. 한 주문은 한 요리사만 만들고, 주문이 밀리면 요리사를 더 부른다. Pub/Sub는 아파트 안내 방송. 관리사무소(발행자)는 누가 듣는지 모른 채 방송하고, 스피커가 켜진 집(구독자)은 모두 같은 내용을 듣는다. 방송 시간에 집에 없으면 못 듣는 것이 저장하지 않는 Pub/Sub이고, 게시판에 붙여 두어 나중에 와서도 읽을 수 있게 한 것이 Kafka 같은 로그 방식이다.</p>`,
    diagram: { caption: '왼쪽: 큐의 메시지는 소비자들에게 나뉘어 한 번씩만 처리된다. 오른쪽: 토픽의 메시지는 모든 구독자에게 복사된다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="140" y="14">Producer/Consumer (큐)</text><text x="420" y="14">Pub/Sub (토픽)</text>
<rect class="n" x="8" y="100" width="56" height="36" rx="6"/><text x="36" y="118" class="sm">생산자</text>
<path class="a" d="M64,118 H88"/>
<rect class="h" x="90" y="100" width="76" height="36" rx="6"/><text x="128" y="112" class="sm">큐</text><text x="128" y="126" class="sm">1 2 3 4 5</text>
<path class="a" d="M166,112 L192,56 M166,118 H192 M166,124 L192,180"/>
<rect class="n" x="194" y="38" width="76" height="36" rx="6"/><text x="232" y="50" class="sm">소비자 A</text><text x="232" y="64" class="sm">1, 4</text>
<rect class="n" x="194" y="100" width="76" height="36" rx="6"/><text x="232" y="112" class="sm">소비자 B</text><text x="232" y="126" class="sm">2, 5</text>
<rect class="n" x="194" y="162" width="76" height="36" rx="6"/><text x="232" y="174" class="sm">소비자 C</text><text x="232" y="188" class="sm">3</text>
<path class="e d" d="M280,30 V200"/>
<rect class="n" x="290" y="100" width="56" height="36" rx="6"/><text x="318" y="118" class="sm">발행자</text>
<path class="a" d="M346,118 H370"/>
<rect class="h" x="372" y="100" width="76" height="36" rx="6"/><text x="410" y="112" class="sm">토픽</text><text x="410" y="126" class="sm">1 2 3</text>
<path class="ha" d="M448,112 L474,56 M448,118 H474 M448,124 L474,180"/>
<rect class="n" x="476" y="38" width="76" height="36" rx="6"/><text x="514" y="50" class="sm">재고</text><text x="514" y="64" class="sm">1, 2, 3</text>
<rect class="n" x="476" y="100" width="76" height="36" rx="6"/><text x="514" y="112" class="sm">알림</text><text x="514" y="126" class="sm">1, 2, 3</text>
<rect class="n" x="476" y="162" width="76" height="36" rx="6"/><text x="514" y="174" class="sm">분석</text><text x="514" y="188" class="sm">1, 2, 3</text>
</svg>` },
    code: R`
import queue, threading, time
from collections import Counter, defaultdict

# 1) Producer/Consumer: 큐 하나, 소비자 셋이 나눠 처리
jobs = queue.Queue(maxsize=5)            # 크기 제한: 소비자가 밀리면 put()이 기다린다(백프레셔)
done = Counter()

def consumer(name):
  while (job := jobs.get()) is not None:
      time.sleep(0.005)                # 처리 시간
      done[name] += 1                  # 각 스레드가 자기 이름 칸만 고친다
  jobs.put(None)                       # 종료 신호를 다음 소비자에게 넘긴다

workers = [threading.Thread(target=consumer, args=(f"소비자{c}",)) for c in "ABC"]
for w in workers:
  w.start()
for i in range(30):
  jobs.put(f"이미지{i}")
jobs.put(None)
for w in workers:
  w.join()
print("작업 큐:", dict(done), "합계", sum(done.values()), "→ 30개가 한 번씩만 처리됨")

# 2) Pub/Sub: 구독자마다 자기 큐를 갖고, 발행하면 전원에게 사본
class Broker:
  def __init__(self):
      self.subs = defaultdict(list)
  def subscribe(self, topic):
      q = queue.Queue()
      self.subs[topic].append(q)
      return q
  def publish(self, topic, msg):
      for q in self.subs[topic]:
          q.put(msg)
      return len(self.subs[topic])

def drain(q):
  out = []
  while not q.empty():
      out.append(q.get())
  return out

b = Broker()
print("구독자 없이 발행 → 받은 수:", b.publish("주문생성", 0))   # 저장하지 않으면 그냥 사라진다
subs = {name: b.subscribe("주문생성") for name in ["재고", "알림", "분석"]}
for order_id in [1, 2, 3]:
  b.publish("주문생성", order_id)
print("Pub/Sub:", {name: drain(q) for name, q in subs.items()})

# 3) Kafka식 로그 + 컨슈머 그룹: 그룹끼리는 Pub/Sub, 그룹마다 읽은 위치(오프셋)를 따로 기록
log = [f"주문{i}" for i in range(1, 6)]   # 소비해도 지워지지 않는 로그
offsets = {"재고팀": 0}
def poll(group, n):
  start = offsets[group]
  offsets[group] = min(start + n, len(log))
  return log[start:offsets[group]]
print("재고팀 1차:", poll("재고팀", 3), "/ 2차:", poll("재고팀", 3))
offsets["분석팀"] = 0                       # 나중에 합류한 그룹도
print("늦게 합류한 분석팀:", poll("분석팀", 10), "← 처음부터 다시 읽을 수 있다")

# 4) at-least-once: ack 유실로 같은 메시지가 두 번 와도 멱등 소비자는 한 번만 반영
balance, seen = 0, set()
for msg_id, amount in [("m1", 100), ("m2", 50), ("m2", 50)]:   # m2 재전달
  if msg_id in seen:
      continue
  seen.add(msg_id)
  balance += amount
print("중복 전달 후 잔액:", balance, "(멱등 처리 없으면 200)")
`,
    links: [
      { to: 'os-sync', why: '생산자-소비자 문제: 유한 버퍼와 세마포어' },
      { to: 'net-websocket', why: '여러 WebSocket 서버가 메시지를 주고받는 서버 간 pub/sub' },
      { to: 'net-http', why: '동기 요청-응답 호출과 비동기 메시지의 차이, 멱등한 재시도' },
      { to: 'db-tx', why: 'DB 저장과 메시지 발행을 함께 성공시키는 문제(트랜잭셔널 아웃박스)' },
      { to: 'db-nosql', why: '분산 저장소의 파티셔닝·복제와 같은 설계 축' },
    ],
    quiz: [
      { q: '회원가입이 일어나면 환영 메일 발송·쿠폰 발급·분석 기록 세 서비스가 모두 알아야 한다. 가장 알맞은 방식은?',
        options: ['작업 큐 하나에 넣고 세 서비스가 경쟁적으로 가져간다', 'Pub/Sub: 가입 이벤트를 토픽에 발행하면 세 서비스가 각자 사본을 받는다', '가입 서버가 세 서비스를 HTTP로 차례로 호출한다'], answer: 1,
        explain: '작업 큐는 메시지 하나를 한 소비자만 받으므로 세 서비스 중 하나만 알게 된다. 직접 호출은 한 서비스의 장애가 가입 실패로 번진다.' },
      { q: '이미지 변환 요청이 몰려 큐에 메시지가 쌓이고 있다. 처리 속도를 높이는 방법은?',
        options: ['같은 큐에 소비자(워커)를 더 붙인다. 메시지가 소비자들에게 나뉘어 처리량이 늘어난다', '구독자를 더 붙인다. 모두가 같은 작업을 받아 더 빨리 끝난다', '생산자를 더 늘린다'], answer: 0,
        explain: '경쟁 소비자 패턴. Pub/Sub 구독자를 늘리면 같은 작업이 중복 처리될 뿐이다.' },
      { q: 'at-least-once 전달을 쓰는 결제 소비자를 멱등하게 만들어야 하는 이유는?',
        options: ['메시지 순서가 항상 뒤바뀌어서', '브로커가 메시지를 암호화하지 않아서', '처리 후 ack가 유실되면 같은 메시지가 다시 전달되므로, 두 번 처리해도 결과가 같아야 이중 결제가 생기지 않아서'], answer: 2,
        explain: '메시지 ID를 기록해 이미 처리한 메시지는 건너뛰면 "at-least-once + 멱등"으로 사실상 한 번 처리한 효과를 낸다.' },
    ],
    resources: ['Martin Kleppmann, 『데이터 중심 애플리케이션 설계』 11장 — 스트림 처리', 'Gregor Hohpe & Bobby Woolf, 『Enterprise Integration Patterns』 — Point-to-Point Channel, Publish-Subscribe Channel', 'Apache Kafka 공식 문서 — Consumers, Consumer Groups', 'RabbitMQ 공식 튜토리얼 — Work Queues, Publish/Subscribe'],
  },
  {
    id:'net-tls', title: 'HTTPS와 TLS',
    summary: R`<strong>기밀성·무결성·인증</strong> 제공
핸드셰이크: 공개키로 키 합의 + <strong>인증서</strong>로 상대 확인
데이터는 대칭키 암호, HTTPS = HTTP over TLS`,
    body: R`
<h3>세 가지 보장</h3>
<ul>
<li><strong>기밀성</strong>: 중간에서 엿들어도 내용을 알 수 없다.</li>
<li><strong>무결성</strong>: 중간에서 내용을 바꾸면 받는 쪽이 알아챈다.</li>
<li><strong>인증</strong>: 내가 대화하는 상대가 정말 그 도메인의 주인이다.</li>
</ul>
<p>셋 중 하나라도 빠지면 의미가 없다. 특히 인증이 없으면, 암호화는 되어 있지만 상대가 공격자인 통신이 된다.</p>
<h3>왜 두 종류의 암호를 섞는가</h3>
<p>대칭키 암호(AES, ChaCha20)는 빠르지만 <strong>양쪽이 같은 키를 미리 가져야</strong> 한다. 공개키 암호는 처음 만난 상대와도 안전하게 키를 정할 수 있지만 훨씬 느리다. 그래서 TLS는 핸드셰이크에서만 공개키 방식을 써서 <strong>세션 키를 합의</strong>하고, 이후 데이터는 대칭키로 암호화한다. 현대 TLS의 대칭 암호는 암호화와 무결성 검사를 함께 하는 AEAD 방식(AES-GCM, ChaCha20-Poly1305)이다.</p>
<h3>키 합의: (EC)DHE</h3>
<p>디피-헬만 키 교환에서 양쪽은 각자 비밀값 $a$, $b$를 고르고 $g^a$, $g^b$만 공개적으로 교환한다. 각자 $(g^b)^a = (g^a)^b = g^{ab}$를 계산해 같은 비밀을 얻지만, 도청자는 $g^a$와 $g^b$만으로 $g^{ab}$를 계산할 수 없다(이산로그 문제가 어렵기 때문). TLS 1.3은 매 연결마다 새 비밀값을 쓰는(ephemeral) 방식만 허용한다. 그래서 나중에 서버의 장기 개인키가 유출되어도 과거에 녹음해 둔 트래픽을 풀 수 없다(<strong>전방 비밀성</strong>).</p>
<h3>인증서: 그 공개값이 정말 서버의 것인가</h3>
<p>DH만으로는 <strong>중간자 공격</strong>을 막지 못한다. 공격자가 가운데서 양쪽과 각각 DH를 하면 양쪽 모두 공격자와 키를 공유하게 된다. 그래서 서버는 <strong>인증서</strong>(도메인 이름 + 서버 공개키에 인증 기관(CA)이 서명한 것)를 보내고, 핸드셰이크 내용에 자신의 개인키로 서명해 그 인증서의 주인임을 증명한다. 클라이언트는</p>
<ol><li>인증서 체인을 따라 운영체제·브라우저에 미리 들어 있는 <strong>신뢰하는 루트 CA</strong>까지 서명을 검증하고,</li><li>인증서의 도메인이 접속하려는 도메인과 일치하는지, 유효 기간 안인지 확인하고,</li><li>서버의 서명을 인증서의 공개키로 검증한다.</li></ol>
<p>코드에서 인증서 검증을 끄는 것(<code>verify=False</code>)은 이 인증 단계를 통째로 없애 중간자 공격을 허용하는 것이다.</p>
<h3>TLS 1.3 핸드셰이크</h3>
<p>클라이언트가 지원하는 암호 방식과 자신의 키 공유 값을 담은 <strong>ClientHello</strong>를 보내면, 서버는 <strong>ServerHello</strong>(자신의 키 공유 값)로 응답한다. 이 시점에 양쪽은 이미 공유 비밀을 계산할 수 있으므로, 서버의 인증서·서명·완료 메시지부터는 <strong>암호화된 상태</strong>로 보낸다. 결과적으로 1 RTT 만에 암호화된 데이터를 보낼 수 있다(TLS 1.2는 2 RTT). 이전에 접속한 서버에는 첫 메시지부터 데이터를 보내는 0-RTT도 가능하지만, 공격자가 그 데이터를 다시 보내는 재전송 공격에 취약해 멱등한 요청에만 써야 한다.</p>
<h3>HTTPS가 숨기지 못하는 것</h3>
<p>내용(경로, 헤더, 본문)은 숨기지만, 접속하는 서버의 IP 주소, 트래픽 양과 타이밍, 그리고 일반적으로 핸드셰이크의 SNI 필드에 담긴 <strong>도메인 이름</strong>은 드러난다(SNI를 암호화하는 ECH가 도입되는 중이다). 또 HTTPS는 전송 구간만 보호할 뿐, 서버 자체가 악성이거나 해킹당한 경우까지 막아 주지는 않는다.</p>`,
    analogy: R`<p>처음 만난 사람과 비밀 대화를 나누려는 상황. 공개된 자리에서 각자 "물감 섞기"로 같은 비밀 색을 만드는 것이 DH다 — 공용 노란색에 각자 비밀 색을 섞어 교환하고, 받은 색에 다시 자기 비밀 색을 섞으면 둘 다 같은 색이 되지만, 구경꾼은 섞인 색에서 비밀 색을 분리하지 못한다. 하지만 상대가 사기꾼일 수 있으니 <strong>정부가 발급한 신분증</strong>(CA가 서명한 인증서)을 확인해야 한다. 비밀 색(세션 키)이 정해지면 그 뒤로는 빠른 암호(대칭키)로 대화한다.</p>`,
    diagram: { caption: 'TLS 1.3 핸드셰이크. ServerHello 이후의 메시지({ })는 이미 암호화되며, 1 RTT 후 암호화된 HTTP 요청을 보낸다.', svg: R`
<svg viewBox="0 0 540 235" width="540">
<text x="100" y="12">클라이언트</text><text x="440" y="12">서버</text>
<path class="e" d="M100,20 V225"/><path class="e" d="M440,20 V225"/>
<path class="a" d="M100,32 L438,62"/><text x="270" y="34" class="sm">ClientHello: 지원 암호 + 키 공유(g^a) + SNI</text>
<path class="ha" d="M440,72 L102,112"/><text x="270" y="78" class="sm">ServerHello: 키 공유(g^b)</text>
<text x="320" y="112" class="sm">+ { 인증서, 인증서 서명, Finished }</text>
<path class="ha" d="M100,125 L438,160"/><text x="270" y="128" class="sm">{ Finished } + { HTTP 요청 }</text>
<path class="ha" d="M440,170 L102,205"/><text x="270" y="176" class="sm">{ HTTP 응답 }</text>
<text x="50" y="112" class="sm">공유 비밀</text><text x="50" y="126" class="sm">계산 가능</text>
<text x="485" y="66" class="sm">공유 비밀</text><text x="485" y="80" class="sm">계산 가능</text>
<text x="270" y="224" class="sm">{ } = 핸드셰이크에서 유도한 키로 암호화</text>
</svg>` },
    math: [
      { tex: R`A = g^{a} \bmod p,\quad B = g^{b} \bmod p,\qquad K = B^{a} = A^{b} = g^{ab} \bmod p`, explain: R`디피-헬만 키 교환.<ul class="defs"><li>$a, b$: 각자의 비밀(전송 안 함)</li><li>$A, B$: 공개적으로 교환하는 값</li><li>$K$: 공유 비밀</li></ul>실제 TLS는 같은 원리를 타원곡선(X25519 등) 위에서 계산해 더 짧은 키로 같은 안전성을 얻는다.` },
    ],
    code: R`
import hashlib, hmac, secrets, ssl

p = 2**127 - 1                       # 학습용 소수 (실제 TLS는 X25519 같은 타원곡선을 쓴다)
g = 3
a = secrets.randbelow(p - 2) + 1     # 클라이언트 비밀 (전송하지 않음)
b = secrets.randbelow(p - 2) + 1     # 서버 비밀
A, B = pow(g, a, p), pow(g, b, p)    # 공개값만 네트워크로 교환
k_client, k_server = pow(B, a, p), pow(A, b, p)
print("양쪽이 계산한 공유 비밀이 같은가?", k_client == k_server)

key = hashlib.sha256(k_client.to_bytes(16, "big")).digest()   # 공유 비밀 → 대칭 키 유도 (실제는 HKDF)
msg, forged = b"amount=1000", b"amount=9000"
tag = hmac.new(key, msg, hashlib.sha256).digest()              # 무결성 태그 (실제는 AEAD가 암호화와 함께 처리)
verify = lambda m: hmac.compare_digest(tag, hmac.new(key, m, hashlib.sha256).digest())
print("원본 검증:", verify(msg), "/ 변조 검증:", verify(forged))

# 중간자: 인증이 없으면 공격자가 서버인 척 자기 공개값 M을 보내 클라이언트와 키를 공유한다
m = secrets.randbelow(p - 2) + 1
M = pow(g, m, p)
print("공격자-클라이언트 키 일치:", pow(M, a, p) == pow(A, m, p), "→ 그래서 인증서와 서명으로 서버를 확인해야 한다")

ctx = ssl.create_default_context()   # 파이썬의 안전한 기본 설정
print("인증서 검증:", ctx.verify_mode.name, "| 호스트명 확인:", ctx.check_hostname,
    "| 최소 버전:", ctx.minimum_version.name)
print("TLS 라이브러리:", ssl.OPENSSL_VERSION)
`,
    links: [
      { to: 'sec-asym', why: '공개키 암호와 전자서명 — 인증서와 핸드셰이크 서명의 원리' },
      { to: 'sec-sym', why: '세션 데이터를 보호하는 대칭키 암호(AES-GCM)' },
      { to: 'sec-hash', why: 'HMAC·HKDF와 해시 함수' },
      { to: 'net-http', why: 'HTTPS = HTTP over TLS, ALPN으로 HTTP/2 협상' },
      { to: 'net-tcp', why: 'TLS는 TCP 연결 위에서 핸드셰이크를 한다 (QUIC은 통합)' },
      { to: 'sec-auth', why: '서버 인증(인증서) vs 사용자 인증(로그인, 토큰)' },
    ],
    quiz: [
      { q: 'TLS가 데이터 전체를 공개키 암호로 암호화하지 않고, 핸드셰이크 후 대칭키 암호를 쓰는 이유는?',
        options: ['공개키 암호는 안전하지 않아서', '공개키 연산은 대칭키 암호보다 훨씬 느리므로, 키 합의에만 쓰고 대량 데이터는 빠른 대칭키로 처리하기 위해', '대칭키 암호가 인증까지 해 주기 때문'], answer: 1,
        explain: '공개키 방식은 "처음 만난 상대와 비밀을 정하는" 어려운 문제를, 대칭키 방식은 "빠르게 대량 암호화"를 담당하는 분업이다.' },
      { q: '디피-헬만 키 교환만으로는 중간자 공격을 막을 수 없는 이유는?',
        options: ['DH가 수학적으로 깨졌기 때문', 'DH는 도청은 막지만 상대가 누구인지 확인하지 않아, 공격자가 가운데서 양쪽과 각각 키를 합의할 수 있기 때문', 'DH는 키를 평문으로 보내기 때문'], answer: 1,
        explain: '그래서 서버는 CA가 서명한 인증서와 핸드셰이크 서명으로 자신이 그 도메인의 주인임을 증명한다. 인증서 검증을 끄면 이 보호가 사라진다.' },
      { q: 'HTTPS로 접속해도 네트워크 관리자(또는 ISP)가 일반적으로 알 수 있는 정보는?',
        options: ['방문한 페이지의 전체 URL 경로와 폼 입력값', '접속한 서버의 IP 주소와, 핸드셰이크의 SNI에 담긴 도메인 이름, 트래픽 양과 시간', '아무것도 알 수 없다'], answer: 1,
        explain: '경로·헤더·본문은 암호화되지만 접속 대상과 메타데이터는 드러난다. SNI 암호화(ECH)와 DoH가 이를 줄이려는 기술이다.' },
    ],
    resources: ['Ilya Grigorik, 『High Performance Browser Networking』 — Transport Layer Security (TLS) 장', 'The Illustrated TLS 1.3 Connection (tls13.xargs.org — 핸드셰이크 바이트 단위 해설)', 'RFC 8446 (TLS 1.3)', 'Jean-Philippe Aumasson, 『Serious Cryptography』'],
  },
];
