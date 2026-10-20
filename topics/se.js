TOPICS.se = [
  {
    id: 'se-process', title: '개발 방법론', advanced: true,
    summary: R`방법론 = <strong>불확실성</strong>을 다루는 방식
요구사항 확실 → 계획 중심(폭포수) / 불확실 → 짧은 주기 반복(애자일)`,
    body: R`
<h3>폭포수: 단계를 순서대로</h3>
<p>요구사항 → 설계 → 구현 → 테스트 → 배포를 한 번씩 순서대로 진행한다. 각 단계의 산출물(문서)을 다음 단계의 입력으로 쓰므로 계획과 진척 관리가 명확하다. 전제는 <strong>처음에 요구사항을 정확히 알 수 있다</strong>는 것이다. 이 전제가 틀리면 문제가 마지막 테스트·배포 단계에서야 드러나고, 그때 고치는 비용은 초기보다 훨씬 크다. 요구사항이 법·규제로 고정되거나, 하드웨어처럼 되돌리기 비싼 영역에서는 여전히 계획 중심 접근이 합리적이다.</p>
<h3>반복·점진적 개발과 애자일</h3>
<p>소프트웨어 요구사항은 사용자가 실제로 써 봐야 분명해지는 경우가 많다. 그래서 전체를 한 번에 만들지 않고, <strong>작동하는 작은 부분</strong>을 짧은 주기(1~4주)로 만들어 보여 주고 피드백을 반영한다. 2001년 애자일 선언은 "계획을 따르기보다 변화에 대응"하는 가치를 강조했다. 핵심은 의식(회의)이 아니라 <strong>피드백 주기를 짧게</strong> 해서 잘못된 방향으로 오래 가지 않는 것이다.</p>
<h3>스크럼</h3>
<p>고정 길이 <strong>스프린트</strong> 단위로 일한다. 제품 책임자(Product Owner)가 우선순위가 매겨진 제품 백로그를 관리하고, 팀은 스프린트 계획에서 이번 주기의 목표를 정한다. 매일 짧게 진행 상황과 장애물을 공유하고(데일리 스크럼), 스프린트 끝에 결과물을 시연하고(리뷰) 일하는 방식을 돌아본다(회고). 스크럼 마스터는 이 과정이 잘 돌아가도록 장애물을 치운다.</p>
<h3>칸반: 흐름과 WIP 한도</h3>
<p>칸반은 주기 대신 <strong>흐름</strong>에 집중한다. 할 일 → 진행 중 → 완료 같은 보드로 일을 보이게 하고, 무엇보다 각 단계의 <strong>동시 진행 작업 수(WIP)에 한도</strong>를 둔다. 왜 일을 덜 동시에 하면 더 빨리 끝날까? 큐 이론의 <strong>리틀의 법칙</strong>에 따르면 평균 진행 중 작업 수 = 처리량 × 평균 리드타임이다. 처리량이 일정하다면 진행 중 작업이 많을수록 각 작업이 끝나기까지의 시간(리드타임)이 길어진다. 게다가 여러 일을 오가는 전환 비용 때문에 처리량 자체도 떨어진다. "시작하기를 멈추고, 끝내기를 시작하라"가 칸반의 구호다.</p>
<h3>DevOps와 지속적 전달</h3>
<p>개발과 운영의 경계를 줄이고, 자동화된 테스트·배포로 작은 변경을 자주 안전하게 내보내는 문화다. 반복 개발의 피드백 루프를 "운영 환경의 실제 사용자"까지 확장한 것이다.</p>
<h3>ML 프로젝트에서</h3>
<p>ML은 "이 데이터로 원하는 성능이 나오는가"부터 불확실하다. 그래서 단순한 기준 모델(baseline)을 빨리 만들어 끝까지 파이프라인을 연결하고, 평가 지표를 보며 반복 개선하는 방식이 표준이다. CRISP-DM(비즈니스 이해 → 데이터 이해 → 준비 → 모델링 → 평가 → 배포)도 각 단계를 오가는 반복 구조로 그려진다.</p>`,
    analogy: R`<p>여행 계획. <strong>폭포수</strong>는 출발 전에 2주 일정을 시간 단위로 확정하고 그대로 따르는 것 — 현지에서 박물관이 휴관이면 일정 전체가 흔들린다. <strong>애자일</strong>은 큰 방향만 정하고 하루씩 계획한 뒤, 저녁마다 그날을 돌아보고 다음 날 계획을 고치는 것이다. <strong>칸반의 WIP 한도</strong>는 "한 번에 관광지 열 곳을 반쯤씩 보지 말고, 한 곳씩 제대로 끝내자"는 원칙이다.</p>`,
    diagram: { caption: '폭포수는 각 단계를 한 번씩 순서대로 거치고, 반복 개발은 짧은 주기를 여러 번 돌며 매번 작동하는 결과물과 피드백을 얻는다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="130" y="14">폭포수</text><text x="420" y="14">반복·점진적 (애자일)</text>
<rect class="n" x="10" y="25" width="90" height="28" rx="5"/><text x="55" y="39" class="sm">요구사항</text>
<rect class="n" x="50" y="60" width="90" height="28" rx="5"/><text x="95" y="74" class="sm">설계</text>
<rect class="n" x="90" y="95" width="90" height="28" rx="5"/><text x="135" y="109" class="sm">구현</text>
<rect class="n" x="130" y="130" width="90" height="28" rx="5"/><text x="175" y="144" class="sm">테스트</text>
<rect class="h" x="170" y="165" width="90" height="28" rx="5"/><text x="215" y="179" class="sm">배포</text>
<path class="a" d="M55,53 V74 H48"/><path class="a" d="M95,88 V109 H88"/><path class="a" d="M135,123 V144 H128"/><path class="a" d="M175,158 V179 H168"/>
<text x="80" y="185" class="sm">문제는 마지막에 발견</text>
<path class="e d" d="M285,8 V200"/>
<circle class="e" cx="420" cy="110" r="70"/>
<rect class="n" x="380" y="27" width="80" height="26" rx="5"/><text x="420" y="40" class="sm">계획</text>
<rect class="n" x="455" y="97" width="80" height="26" rx="5"/><text x="495" y="110" class="sm">개발·테스트</text>
<rect class="h" x="380" y="167" width="80" height="26" rx="5"/><text x="420" y="180" class="sm">리뷰 (시연)</text>
<rect class="n" x="305" y="97" width="80" height="26" rx="5"/><text x="345" y="110" class="sm">회고</text>
<path class="a" d="M465,47 Q490,60 492,92"/><path class="a" d="M492,125 Q488,160 462,175"/><path class="a" d="M378,177 Q350,165 345,127"/><path class="a" d="M348,95 Q352,55 378,42"/>
<text x="420" y="110" class="sm">1~4주 주기</text>
</svg>` },
    math: [
      { tex: R`L = \lambda W`, explain: R`리틀의 법칙.<ul class="defs"><li>$L$: 시스템 안의 평균 작업 수(WIP)</li><li>$\lambda$: 평균 처리량(단위 시간당 완료 수)</li><li>$W$: 평균 리드타임</li></ul>안정 상태의 큐에서 분포와 무관하게 성립한다. 처리량이 그대로면 WIP를 줄여야 리드타임이 줄어든다.` },
    ],
    code: R`
import random, statistics

def simulate(wip_limit, days=3000, seed=0, switch_cost=0.03):
  """팀 하루 작업량 2.0, 작업마다 필요한 노력은 2~8일. 동시 작업이 많을수록 전환 비용."""
  rng = random.Random(seed)
  active, lead_times, in_system = [], [], []
  for day in range(days):
      while len(active) < wip_limit:                  # 백로그는 충분, WIP 한도까지만 착수
          active.append({"start": day, "left": rng.uniform(2, 8)})
      in_system.append(len(active))
      capacity = 2.0 * max(0.3, 1 - switch_cost * (len(active) - 1))
      for item in active:
          item["left"] -= capacity / len(active)       # 작업량을 진행 중 작업들에 나눠 씀
      for item in active:
          if item["left"] <= 0:
              lead_times.append(day + 1 - item["start"])
      active = [it for it in active if it["left"] > 0]
  throughput = len(lead_times) / days
  return throughput, statistics.mean(lead_times), statistics.mean(in_system)

print("WIP 한도 | 처리량(개/일) | 평균 리드타임(일) | 리틀의 법칙 L = λW")
for wip in [1, 2, 4, 8, 16]:
  th, lt, L = simulate(wip)
  print(f"{wip:8d} | {th:13.2f} | {lt:17.1f} | {L:5.1f} ≈ {th * lt:5.1f}")
`,
    links: [
      { to: 'se-req', why: '요구사항을 언제, 얼마나 자세히 정할 것인가' },
      { to: 'se-cicd', why: '작은 변경을 자주 안전하게 배포하는 자동화' },
      { to: 'se-test', why: '짧은 주기를 가능하게 하는 자동화된 테스트' },
      { to: 'os-sched', why: '작업 전환 비용 — 운영체제의 문맥 교환과 같은 원리' },
      { to: 'ai-mlops', why: 'ML 프로젝트의 반복 실험과 배포 주기' },
    ],
    quiz: [
      { q: '폭포수 모델이 실패하기 쉬운 상황은?',
        options: ['규제로 요구사항이 고정된 시스템', '사용자가 실제로 써 봐야 원하는 것이 분명해지는, 요구사항이 불확실한 서비스', '팀원이 많은 프로젝트'], answer: 1,
        explain: '폭포수는 "처음에 요구사항을 정확히 안다"는 전제 위에 있다. 전제가 틀리면 문제가 마지막 단계에서야 드러나 비용이 커진다.' },
      { q: '칸반에서 WIP(진행 중 작업) 한도를 두면 리드타임이 줄어드는 이유는?',
        options: ['팀원이 더 열심히 일해서', '리틀의 법칙(L = λW)에 따라 처리량이 같다면 진행 중 작업 수가 적을수록 평균 리드타임이 짧아지고, 작업 전환 비용도 줄기 때문', '작업 크기가 자동으로 작아져서'], answer: 1,
        explain: '열 가지 일을 동시에 하면 열 가지 모두 늦게 끝난다. 한도는 "새로 시작하기 전에 하던 것을 끝내라"는 압력을 만든다.' },
      { q: '애자일의 핵심을 가장 잘 설명한 것은?',
        options: ['문서를 전혀 쓰지 않는 것', '매일 회의를 하는 것', '짧은 주기로 작동하는 결과물을 만들어 피드백을 받고, 그에 따라 계획을 계속 조정하는 것', '정해진 날짜 없이 개발하는 것'], answer: 2,
        explain: '스프린트·데일리 스크럼 같은 의식은 수단일 뿐이다. 목적은 피드백 주기를 줄여 잘못된 방향으로 오래 가지 않는 것이다.' },
    ],
    resources: ['Agile Manifesto (agilemanifesto.org)', 'Ken Schwaber & Jeff Sutherland, 『스크럼 가이드』 (scrumguides.org, 무료)', 'David J. Anderson, 『칸반』', 'John D. C. Little, "A Proof for the Queuing Formula: L = λW" (1961)'],
  },
  {
    id: 'se-req', title: '요구사항과 모델링', advanced: true,
    summary: R`요구사항 = "무엇을 만들 것인가"에 대한 합의
가장 비싼 버그 = 잘못 이해한 요구사항
좋은 요구사항은 <strong>검증 가능</strong>("빠르게" ✗ → "95%가 1초 이내" ✓)`,
    body: R`
<h3>기능 요구사항과 비기능 요구사항</h3>
<ul>
<li><strong>기능 요구사항</strong>: 시스템이 <strong>무엇을</strong> 하는가. "회원은 쿠폰을 적용해 결제할 수 있다."</li>
<li><strong>비기능 요구사항</strong>(품질 속성): <strong>얼마나 잘</strong> 하는가. 성능, 가용성, 확장성, 보안, 사용성, 유지보수성. 아키텍처를 가장 크게 좌우하지만 말로 표현되지 않고 넘어가기 쉽다.</li>
</ul>
<h3>검증 가능하게 쓰기</h3>
<p>"빠르게", "안정적으로", "사용하기 쉽게"는 합의된 것처럼 보이지만 사람마다 다르게 이해한다. 측정 가능한 기준으로 바꿔야 만든 것이 요구사항을 만족하는지 판단할 수 있다.</p>
<ul>
<li>"빠르게" → "p95 응답 시간 300ms 이하" (평균은 소수의 매우 느린 요청을 가린다).</li>
<li>"안정적으로" → "월 가용성 99.9%" — 한 달에 약 43분까지의 장애를 허용한다는 뜻이다. 99.99%면 약 4분이다. 9 하나를 더할 때마다 비용이 크게 늘어나므로 비즈니스와 함께 정해야 한다.</li>
<li>여러 구성 요소에 <strong>직렬로</strong> 의존하면 전체 가용성은 각 가용성의 곱이라 가장 약한 고리보다 낮아진다.</li>
</ul>
<p>기능 요구사항은 <strong>인수 기준</strong>으로 구체화한다. "Given(전제) – When(행동) – Then(기대 결과)" 형식으로 쓰면 그대로 테스트 시나리오가 되고, 경계 조건(쿠폰 금액이 결제 금액보다 크면?)이 드러난다.</p>
<h3>요구사항을 얻는 방법</h3>
<p>인터뷰, 관찰, 기존 시스템 분석, 프로토타입. 사용자는 해결책("엑셀 내보내기 버튼")을 말하는 경우가 많으므로, 그 뒤의 <strong>진짜 문제</strong>("월말 정산 자료를 회계팀에 보내야 한다")를 찾는 것이 중요하다. 애자일에서는 "사용자로서, ~하기 위해, ~하고 싶다" 형식의 <strong>사용자 스토리</strong>로 가치 중심으로 쓰고, 상세는 구현 직전에 대화로 채운다.</p>
<h3>모델링: 그림으로 합의하기</h3>
<p>UML은 소프트웨어를 여러 관점에서 그리는 표준 표기법이다. 모든 다이어그램을 그릴 필요는 없고, 의사소통에 도움이 되는 것만 쓴다.</p>
<ul>
<li><strong>유스케이스 다이어그램</strong>: 누가(액터) 시스템으로 무엇을 하는가. 범위 합의에 좋다.</li>
<li><strong>클래스 다이어그램</strong>: 개념과 그 관계(연관, 상속, 다중성). 도메인 용어를 맞추는 데 유용하다.</li>
<li><strong>시퀀스 다이어그램</strong>: 객체·서비스 사이 메시지의 시간 순서. API 연동 설계에 좋다.</li>
<li><strong>상태 다이어그램</strong>: 주문(생성→결제→배송→완료/취소)처럼 상태 전이가 핵심인 개념.</li>
</ul>
<h3>추적성</h3>
<p>각 요구사항이 어떤 설계, 코드, 테스트로 이어지는지 연결해 두면, 요구사항이 바뀔 때 영향 범위를 알 수 있고 모든 요구사항이 검증되었는지 확인할 수 있다. 요구사항 단계와 테스트 단계를 짝지은 V 모델이 이 관계를 보여 준다.</p>`,
    analogy: R`<p>집 짓기 주문. "넓고 밝은 거실"이라고만 하면 시공사와 집주인의 머릿속 그림이 다르다. "거실 30㎡ 이상, 남향 창 폭 4m 이상"이라고 해야 완공 후 줄자로 확인할 수 있다(검증 가능). 방 개수와 배치(기능 요구사항)만큼, 단열·내진 등급(비기능 요구사항)이 설계를 좌우한다. 도면(모델)은 말로 하기 어려운 구조를 서로 같은 그림으로 이해하게 해 준다.</p>`,
    diagram: { caption: 'V 모델: 왼쪽의 각 요구사항·설계 단계는 오른쪽의 같은 높이 테스트 단계로 검증된다. 요구사항은 처음부터 "어떻게 확인할지"와 함께 정의되어야 한다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<rect class="h" x="10" y="15" width="130" height="30" rx="5"/><text x="75" y="30" class="sm">요구사항 분석</text>
<rect class="n" x="60" y="60" width="130" height="30" rx="5"/><text x="125" y="75" class="sm">시스템 설계</text>
<rect class="n" x="110" y="105" width="130" height="30" rx="5"/><text x="175" y="120" class="sm">상세 설계</text>
<rect class="g" x="215" y="160" width="130" height="30" rx="5"/><text x="280" y="175" class="sm">구현</text>
<rect class="n" x="320" y="105" width="130" height="30" rx="5"/><text x="385" y="120" class="sm">단위 테스트</text>
<rect class="n" x="370" y="60" width="130" height="30" rx="5"/><text x="435" y="75" class="sm">통합·시스템 테스트</text>
<rect class="h" x="420" y="15" width="130" height="30" rx="5"/><text x="485" y="30" class="sm">인수 테스트</text>
<path class="a" d="M75,45 L110,58"/><path class="a" d="M125,90 L160,103"/><path class="a" d="M175,135 L225,158"/>
<path class="a" d="M335,158 L375,137"/><path class="a" d="M400,103 L430,92"/><path class="a" d="M450,58 L480,47"/>
<path class="e d" d="M140,30 H418"/><path class="e d" d="M190,75 H368"/><path class="e d" d="M240,120 H318"/>
<text x="280" y="22" class="sm">검증: 요구사항 ↔ 인수 기준</text>
</svg>` },
    math: [
      { tex: R`\text{허용 다운타임} = (1 - A) \times T, \qquad A_{\text{직렬}} = \prod_{i} A_i`, explain: R`<ul class="defs"><li>$A$: 가용성 목표</li><li>$T$: 기간(예: 30일 = 43,200분)</li></ul>99.9%면 약 43분, 99.99%면 약 4.3분. 여러 구성 요소가 모두 동작해야 하는 직렬 구조의 가용성은 각 가용성의 곱이다.` },
    ],
    code: R`
import math, random, statistics

for slo in [0.99, 0.999, 0.9999]:                         # 비기능 요구사항을 숫자로
  print(f"가용성 {slo:.2%}: 30일 기준 허용 다운타임 {(1 - slo) * 30 * 24 * 60:6.1f}분")

deps = {"API 서버": 0.999, "DB": 0.9995, "결제 대행사": 0.998}
print(f"직렬 의존 전체 가용성: {math.prod(deps.values()):.4%}  (가장 약한 고리 {min(deps.values()):.2%}보다 낮음)")

random.seed(0)                                            # "빠르게"를 측정 가능한 기준으로: p95
latencies = [random.lognormvariate(4.6, 0.5) for _ in range(10_000)]   # ms, 오른쪽 꼬리가 긴 분포
p95 = statistics.quantiles(latencies, n=100)[94]
print(f"평균 {statistics.mean(latencies):.0f}ms / p95 {p95:.0f}ms → 기준 'p95 ≤ 300ms' 충족: {p95 <= 300}")

COUPONS = {"SAVE5000": {"amount": 5000, "expired": False}, "OLD": {"amount": 5000, "expired": True}}
def apply_coupon(total, code):
  c = COUPONS.get(code)
  if c is None or c["expired"]:
      return total
  return max(total - c["amount"], 0)

scenarios = [                                             # 인수 기준(Given-When-Then)을 실행 가능한 검사로
  ("Given 30,000원 장바구니 When SAVE5000 적용 Then 25,000원", 30000, "SAVE5000", 25000),
  ("Given 3,000원 장바구니 When SAVE5000 적용 Then 0원 (음수 불가)", 3000, "SAVE5000", 0),
  ("Given 30,000원 장바구니 When 만료 쿠폰 적용 Then 원래 금액", 30000, "OLD", 30000),
]
for text, total, code, expected in scenarios:
  result = apply_coupon(total, code)
  print(f"{'통과' if result == expected else '실패'} | {text} (실제 {result:,}원)")
`,
    links: [
      { to: 'se-test', why: '인수 기준은 그대로 인수 테스트가 된다' },
      { to: 'se-process', why: '요구사항을 미리 확정하는 방식 vs 반복으로 발견하는 방식' },
      { to: 'ml-metrics', why: '평균이 아니라 분포(p95)를 보라 — 지표 선택의 문제' },
      { to: 'net-http', why: '응답 시간·가용성 요구사항이 걸리는 대상' },
      { to: 'os-process', why: '상태 다이어그램의 예: 프로세스 상태 전이' },
    ],
    quiz: [
      { q: '"시스템은 빠르게 응답해야 한다"를 검증 가능한 요구사항으로 바꾼 것으로 가장 적절한 것은?',
        options: ['"시스템은 매우 빠르게 응답해야 한다"', '"정상 부하에서 요청의 95%가 300ms 이내에 응답해야 한다"', '"최신 서버를 사용해야 한다"'], answer: 1,
        explain: '측정 방법과 기준이 있어야 만족 여부를 판단할 수 있다. 평균만 쓰면 일부 사용자가 겪는 매우 느린 응답이 가려지므로 백분위수를 쓴다.' },
      { q: '가용성 99.9%인 서비스 세 개에 모두 의존하는 기능의 가용성은?',
        options: ['99.9%', '약 99.7% — 직렬 의존은 각 가용성의 곱이라 하나보다 낮아진다', '99.99%'], answer: 1,
        explain: '0.999³ ≈ 0.997. 의존이 늘어날수록 전체 가용성은 떨어지므로, 중요한 경로에는 재시도·대체 경로·캐시 같은 대책이 필요하다.' },
      { q: '인수 기준을 Given-When-Then 형식으로 쓰는 가장 큰 이점은?',
        options: ['문서가 짧아진다', '전제·행동·기대 결과가 명확해 그대로 테스트 시나리오가 되고, 경계 조건 같은 빠진 경우가 드러난다', '개발자가 요구사항을 정할 수 있다'], answer: 1,
        explain: '"쿠폰 금액이 결제 금액보다 크면?" 같은 질문이 요구사항 단계에서 나오면 구현 후에 발견하는 것보다 훨씬 싸다.' },
    ],
    resources: ['Karl Wiegers & Joy Beatty, 『소프트웨어 요구사항』 3판', 'Martin Fowler, 『UML Distilled』', 'Google, 『Site Reliability Engineering』 4장 — Service Level Objectives (무료 공개)'],
  },
  {
    id: 'se-principle', title: '설계 원칙: 결합도·응집도', advanced: true,
    summary: R`좋은 설계의 척도: <strong>낮은 결합도 · 높은 응집도</strong>
한 곳의 변경이 다른 곳으로 번지지 않게`,
    body: R`
<h3>왜 모듈로 나누는가</h3>
<p>사람이 한 번에 이해할 수 있는 양에는 한계가 있다. 시스템을 모듈로 나누고 각 모듈이 <strong>무엇을 하는지(인터페이스)</strong>만 알면 <strong>어떻게 하는지(구현)</strong>는 몰라도 쓸 수 있게 하는 것이 모듈화와 정보 은닉이다. 1972년 Parnas는 "변경될 가능성이 높은 설계 결정을 모듈 안에 숨겨라"라는 기준을 제시했다. 나누는 기준은 처리 순서가 아니라 <strong>변경의 이유</strong>다.</p>
<h3>결합도: 모듈 사이 의존의 강도</h3>
<p>결합도가 높으면 한 모듈을 바꿀 때 다른 모듈도 함께 바꿔야 하고, 따로 테스트하거나 재사용하기 어렵다. 의존이 약한 순서로 대략 다음과 같이 분류한다.</p>
<ul>
<li><strong>자료 결합</strong>: 필요한 값만 인자로 주고받는다(가장 바람직).</li>
<li><strong>스탬프 결합</strong>: 일부만 쓰면서 큰 자료 구조 전체를 넘긴다.</li>
<li><strong>제어 결합</strong>: "어떻게 동작하라"는 플래그를 넘겨 상대의 내부 흐름을 조종한다.</li>
<li><strong>공통 결합</strong>: 여러 모듈이 같은 전역 데이터를 읽고 쓴다. 누가 바꿨는지 추적이 어렵다.</li>
<li><strong>내용 결합</strong>: 다른 모듈의 내부 데이터나 구현을 직접 건드린다(가장 나쁨).</li>
</ul>
<p>의존의 <strong>방향</strong>도 중요하다. 순환 의존(A → B → A)이 생기면 둘은 사실상 하나의 모듈이 되어 따로 이해·테스트·배포할 수 없다. 의존은 자주 바뀌는 것에서 안정된 것 쪽으로 흐르게 한다. 많은 모듈이 의존하는 모듈일수록 안정적이어야 하고(바꾸면 영향이 크므로), 이를 추상화로 보장하는 것이 의존성 역전 원칙이다.</p>
<h3>응집도: 모듈 내부의 집중도</h3>
<p>응집도가 높은 모듈은 내부 요소들이 하나의 목적을 위해 함께 일한다. 낮은 순서로 우연적(그냥 모아 둔 utils), 논리적(비슷한 종류라서 — 모든 입력 처리), 시간적(같은 시점에 실행 — 초기화 코드 모음), 절차적, 교환적(같은 데이터를 다룸), 순차적, <strong>기능적</strong>(하나의 기능을 위해 필요한 것만 — 가장 바람직)으로 나눈다. 이름을 붙이기 어렵거나 "~와 ~ 관리자"처럼 "와"가 들어가는 모듈은 응집도가 낮다는 신호다.</p>
<h3>둘은 함께 움직인다</h3>
<p>관련된 것을 한곳에 모으면(응집도↑) 모듈 사이에서 오갈 일이 줄어든다(결합도↓). 반대로 하나의 기능이 여러 모듈에 흩어져 있으면 그 기능을 바꿀 때 여러 모듈을 함께 고쳐야 한다(산탄총 수술).</p>
<h3>다른 원칙들</h3>
<ul>
<li><strong>관심사의 분리</strong>: UI, 비즈니스 규칙, 데이터 접근처럼 바뀌는 이유가 다른 것을 나눈다(계층형 아키텍처, MVC).</li>
<li><strong>DRY</strong>: 같은 <strong>지식</strong>을 두 곳에 두지 않는다. 단, 생긴 것만 비슷하고 바뀌는 이유가 다른 코드를 억지로 합치면 오히려 결합도가 올라간다.</li>
<li><strong>KISS·YAGNI</strong>: 지금 필요한 만큼 단순하게. 미래를 대비한 추상화도 비용이다.</li>
<li><strong>디미터 법칙</strong>: 친구의 친구에게 말 걸지 않는다. <code>order.customer.address.city</code>처럼 줄줄이 따라가면 그 경로의 모든 구조에 결합된다.</li>
</ul>`,
    analogy: R`<p>잘 정리된 주방. 칼·도마는 조리대에, 그릇은 찬장에, 양념은 가스레인지 옆에(높은 응집도: 함께 쓰는 것끼리). 조리대와 찬장 사이에는 "완성된 요리를 접시에 담는다"는 단순한 약속만 있다(낮은 결합도). 반대로 양념 하나를 꺼내려면 찬장 문을 열고 그릇을 치워야 하는 주방은, 한 곳을 정리하면 다른 곳이 엉망이 된다.</p>`,
    diagram: { caption: '왼쪽: 기능이 흩어져 모듈 사이에 의존이 얽힌 구조(높은 결합도·낮은 응집도). 오른쪽: 관련 요소를 모으고 모듈 사이에는 좁은 인터페이스만 둔 구조.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="135" y="14">높은 결합도 · 낮은 응집도</text><text x="420" y="14">낮은 결합도 · 높은 응집도</text>
<path class="e d" d="M280,8 V205"/>
<rect class="g" x="15" y="30" width="110" height="75" rx="8"/><rect class="g" x="150" y="30" width="110" height="75" rx="8"/><rect class="g" x="80" y="125" width="110" height="75" rx="8"/>
<circle class="h" cx="40" cy="55" r="9"/><circle class="n" cx="85" cy="80" r="9"/><circle class="n" cx="175" cy="55" r="9"/><circle class="h" cx="225" cy="85" r="9"/><circle class="h" cx="110" cy="160" r="9"/><circle class="n" cx="160" cy="175" r="9"/>
<path class="a" d="M49,57 L166,55"/><path class="a" d="M93,85 L151,170"/><path class="a" d="M216,88 L119,155"/><path class="a" d="M184,58 L101,155"/><path class="a" d="M50,60 L102,152"/><path class="a" d="M168,63 L94,77"/>
<text x="135" y="20" class="sm"> </text>
<rect class="h" x="300" y="30" width="110" height="75" rx="8" style="fill-opacity:.5"/><rect class="n" x="430" y="30" width="110" height="75" rx="8"/><rect class="n" x="365" y="125" width="110" height="75" rx="8"/>
<circle class="h" cx="330" cy="55" r="9"/><circle class="h" cx="380" cy="80" r="9"/><circle class="h" cx="345" cy="88" r="7"/>
<circle class="n" cx="460" cy="55" r="9"/><circle class="n" cx="510" cy="80" r="9"/>
<circle class="n" cx="395" cy="160" r="9"/><circle class="n" cx="445" cy="175" r="9"/>
<path class="e" d="M338,58 L372,77 M469,58 L501,77 M403,163 L437,172"/>
<path class="a" d="M410,68 H428"/><path class="a" d="M420,105 L420,123"/>
<text x="420" y="207" class="sm">모듈 사이에는 좁은 인터페이스 하나</text>
</svg>` },
    math: [
      { tex: R`I = \frac{C_e}{C_a + C_e}`, explain: R`모듈의 불안정성(Robert C. Martin).<ul class="defs"><li>$C_e$: 이 모듈이 의존하는 모듈 수(나가는 의존)</li><li>$C_a$: 이 모듈에 의존하는 모듈 수(들어오는 의존)</li></ul>$I = 0$이면 많은 모듈이 기대는 안정적인 모듈(바꾸기 어려우니 추상적이어야 함), $I = 1$이면 아무도 의존하지 않아 바꾸기 쉬운 모듈.` },
    ],
    code: R`
import ast

SOURCES = {                                   # 작은 프로젝트의 모듈별 import 문
  "orders":        "import db\nimport pricing\nimport notifications",
  "pricing":       "import db",
  "notifications": "import email_sender\nimport orders",       # orders ↔ notifications 순환!
  "email_sender":  "",
  "db":            "",
  "reports":       "import orders\nimport pricing\nimport db",
}

def dependencies(sources):
  deps = {}
  for mod, code in sources.items():
      tree = ast.parse(code)
      deps[mod] = {alias.name for node in ast.walk(tree) if isinstance(node, ast.Import) for alias in node.names}
  return deps

def report(sources):
  deps = dependencies(sources)
  print(f"{'모듈':14s} Ce  Ca  불안정성 I")
  for mod in deps:
      ce = len(deps[mod])
      ca = sum(mod in d for d in deps.values())
      print(f"{mod:14s} {ce:2d}  {ca:2d}  {ce / (ca + ce) if ca + ce else 0:.2f}")
  cycles = [(a, b) for a in deps for b in deps[a] if a < b and a in deps.get(b, set())]
  print("순환 의존:", cycles or "없음")

report(SOURCES)

# 개선: notifications가 orders를 import하지 않고, 필요한 값만 인자로 받는다(자료 결합)
SOURCES["notifications"] = "import email_sender"
print("\n개선 후")
report(SOURCES)
`,
    links: [
      { to: 'pl-solid', why: '단일 책임·의존성 역전 — 결합도와 응집도를 다루는 구체적 원칙' },
      { to: 'net-layers', why: '네트워크 계층화: 계층 간 좁은 인터페이스의 대표 사례' },
      { to: 'se-pattern', why: '결합도를 낮추는 반복되는 설계 해법' },
      { to: 'se-refactor', why: '높은 결합도·낮은 응집도를 개선하는 작업' },
      { to: 'ds-graph', why: '모듈 의존 관계는 방향 그래프 — 순환 탐지' },
    ],
    quiz: [
      { q: '여러 모듈이 같은 전역 설정 딕셔너리를 직접 읽고 수정하는 구조의 문제는?',
        options: ['실행 속도가 느려진다', '공통 결합: 누가 언제 값을 바꿨는지 추적하기 어렵고, 한 모듈의 수정이 다른 모듈에 예기치 않은 영향을 준다', '응집도가 너무 높아진다'], answer: 1,
        explain: '필요한 값만 인자로 전달하거나(자료 결합), 설정을 읽기 전용으로 한 곳에서 주입하는 방식이 낫다.' },
      { q: '"UserAndOrderAndEmailManager" 같은 클래스 이름이 암시하는 것은?',
        options: ['높은 응집도', '서로 다른 목적이 한 클래스에 섞인 낮은 응집도 — 바뀌는 이유가 여러 개다', '낮은 결합도'], answer: 1,
        explain: '하나의 이름으로 설명하기 어렵다면 책임이 여러 개라는 신호다. 목적별로 나누면 각각 응집도가 높아지고 서로의 결합은 좁은 인터페이스로 줄어든다.' },
      { q: '모듈 A와 B가 서로를 import하는 순환 의존의 문제는?',
        options: ['Python에서는 절대 실행되지 않는다', '둘을 따로 이해·테스트·재사용·배포할 수 없어 사실상 하나의 큰 모듈이 되고, 한쪽 변경이 다른 쪽으로 곧바로 번진다', '메모리를 두 배로 쓴다'], answer: 1,
        explain: '공통 부분을 제3의 모듈로 빼거나, 한쪽이 추상(콜백·인터페이스)에 의존하게 해 방향을 한쪽으로 정리한다.' },
    ],
    resources: ['David Parnas, "On the Criteria To Be Used in Decomposing Systems into Modules" (1972)', 'Robert C. Martin, 『클린 아키텍처』 4부 — 컴포넌트 원칙 (안정성 지표)', 'John Ousterhout, 『소프트웨어 설계의 철학』 — 깊은 모듈'],
  },
  {
    id: 'se-pattern', title: '디자인 패턴', advanced: true,
    summary: R`반복되는 설계 문제의 검증된 해법에 붙인 이름
코드 암기 ✗ → "무엇을 <strong>바꿔 끼울 수 있게</strong> 하려는가"가 핵심`,
    body: R`
<h3>패턴의 가치</h3>
<p>1994년 GoF(Gang of Four)의 책은 23개 패턴을 생성·구조·행위 패턴으로 정리했다. 패턴의 가장 큰 가치는 <strong>공통 어휘</strong>다. "여기 전략 패턴으로 할인 정책을 바꿔 끼우자"는 한 문장이 클래스 구조 전체를 설명한다. 대부분의 패턴은 "변하는 부분을 인터페이스 뒤로 숨기고, 상속보다 조합으로 갈아 끼운다"는 같은 원리의 변형이다.</p>
<h3>행위 패턴</h3>
<ul>
<li><strong>전략(Strategy)</strong>: 알고리즘을 객체(또는 함수)로 분리해 실행 중에 바꿔 끼운다. 할인 정책, 정렬 기준, 최적화 알고리즘. Python에서는 함수를 넘기는 것으로 충분한 경우가 많다(<code>sorted(key=...)</code>가 전략 패턴이다).</li>
<li><strong>옵저버(Observer)</strong>: 어떤 객체의 상태 변화를 여러 객체가 구독해 통지받는다. 발행자는 구독자가 누구인지 몰라도 된다(결합도↓). GUI 이벤트, 이벤트 버스, 딥러닝 학습 루프의 콜백(에폭이 끝나면 로깅·체크포인트·조기 종료)이 이 구조다.</li>
<li><strong>템플릿 메서드</strong>: 알고리즘의 뼈대는 상위 클래스가 정하고 일부 단계만 하위 클래스가 채운다. 프레임워크의 기본 구조(PyTorch Lightning의 <code>training_step</code>).</li>
</ul>
<h3>생성 패턴</h3>
<ul>
<li><strong>팩토리</strong>: 어떤 구체 클래스를 만들지 결정하는 책임을 한곳에 모은다. 설정 파일의 문자열("resnet50")로 모델 객체를 만드는 레지스트리가 대표적이다.</li>
<li><strong>빌더</strong>: 선택 항목이 많은 복잡한 객체를 단계적으로 조립한다. Python에서는 키워드 인자와 기본값으로 대부분 해결된다.</li>
<li><strong>싱글턴</strong>: 인스턴스가 하나만 존재하도록 보장한다. 사실상 전역 상태라 테스트와 결합도 측면에서 문제가 많아 신중히 쓴다. Python에서는 모듈 자체가 한 번만 로드되는 싱글턴이다.</li>
</ul>
<h3>구조 패턴</h3>
<ul>
<li><strong>어댑터</strong>: 인터페이스가 맞지 않는 기존 코드를 원하는 인터페이스로 감싼다. 외부 결제 API나 레거시 라이브러리 연동.</li>
<li><strong>데코레이터</strong>: 같은 인터페이스로 감싸 기능을 덧붙인다(Python의 함수 데코레이터와 같은 아이디어).</li>
<li><strong>퍼사드</strong>: 복잡한 하위 시스템 앞에 단순한 진입점을 둔다.</li>
<li><strong>컴포지트</strong>: 개별 객체와 그 묶음을 같은 방식으로 다룬다(파일과 폴더, 신경망의 레이어와 레이어를 담은 모듈).</li>
</ul>
<h3>패턴의 함정</h3>
<p>패턴은 문제가 있을 때의 해법이지, 미리 적용할 체크리스트가 아니다. 구현이 하나뿐인데 팩토리와 인터페이스를 겹겹이 쌓으면 코드만 읽기 어려워진다. 또 많은 GoF 패턴은 일급 함수가 없는 언어의 한계를 보완하려고 나온 것이라, Python에서는 함수·클로저·딕셔너리로 훨씬 간단하게 표현된다.</p>`,
    analogy: R`<p>디자인 패턴은 <strong>요리의 기본 기법</strong>과 같다. "볶음", "조림", "튀김"이라는 이름만으로 요리사끼리 과정을 공유한다. 전략 패턴은 같은 재료에 소스만 바꿔 끼우는 것, 옵저버는 "요리가 나오면 알려 주세요" 진동벨, 어댑터는 해외 전자제품의 플러그 변환기다. 기법을 안다고 모든 요리에 다 쓰는 것은 아니다.</p>`,
    diagram: { caption: '전략 패턴(왼쪽): 문맥은 인터페이스에만 의존하고 구체 전략을 바꿔 끼운다. 옵저버 패턴(오른쪽): 발행자는 구독자 목록에 통지만 하고 구독자가 누구인지 모른다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="135" y="14">전략 (Strategy)</text><text x="420" y="14">옵저버 (Observer)</text>
<path class="e d" d="M280,8 V205"/>
<rect class="n" x="10" y="35" width="100" height="40" rx="6"/><text x="60" y="49" class="sm">Checkout</text><text x="60" y="64" class="sm">(문맥)</text>
<rect class="h" x="150" y="35" width="115" height="40" rx="6"/><text x="207" y="49" class="sm">«인터페이스»</text><text x="207" y="64" class="sm">할인 전략</text>
<path class="a" d="M110,55 H148"/>
<rect class="n" x="140" y="130" width="60" height="34" rx="5"/><text x="170" y="147" class="sm">회원</text>
<rect class="n" x="210" y="130" width="60" height="34" rx="5"/><text x="240" y="147" class="sm">쿠폰</text>
<path class="a d" d="M170,128 L195,77"/><path class="a d" d="M240,128 L220,77"/>
<text x="70" y="150" class="sm">실행 중 교체</text>
<rect class="h" x="300" y="80" width="100" height="44" rx="6"/><text x="350" y="96" class="sm">학습 루프</text><text x="350" y="112" class="sm">(발행자)</text>
<rect class="n" x="440" y="30" width="110" height="34" rx="5"/><text x="495" y="47" class="sm">로거</text>
<rect class="n" x="440" y="85" width="110" height="34" rx="5"/><text x="495" y="102" class="sm">체크포인트 저장</text>
<rect class="n" x="440" y="140" width="110" height="34" rx="5"/><text x="495" y="157" class="sm">조기 종료</text>
<path class="ha" d="M400,95 L438,50"/><path class="ha" d="M400,102 H438"/><path class="ha" d="M400,110 L438,152"/>
<text x="350" y="190" class="sm">"에폭 끝남" 이벤트 통지</text>
</svg>` },
    code: R`
from typing import Callable

# 전략: Python에서는 함수 자체가 전략이 될 수 있다
def member(price): return price * 0.9
def coupon(price): return max(price - 5000, 0)
def checkout(price: int, strategy: Callable[[int], float]) -> float:
  return strategy(price)
print("전략:", {s.__name__: checkout(30000, s) for s in (member, coupon)})
print("sorted의 key도 전략:", sorted(["banana", "kiwi", "apple"], key=len))

# 옵저버: 발행자는 구독자가 누구인지 모른다
class EventBus:
  def __init__(self): self.handlers = {}
  def subscribe(self, event, fn): self.handlers.setdefault(event, []).append(fn)
  def publish(self, event, **data):
      for fn in self.handlers.get(event, []):
          fn(**data)

bus, best = EventBus(), {"loss": float("inf")}
bus.subscribe("epoch_end", lambda epoch, loss: print(f"  [로거] epoch {epoch} loss {loss:.3f}"))
def checkpoint(epoch, loss):
  if loss < best["loss"]:
      best["loss"] = loss
      print(f"  [체크포인트] epoch {epoch} 저장 (최저 loss 갱신)")
bus.subscribe("epoch_end", checkpoint)
print("옵저버:")
for epoch, loss in enumerate([0.9, 0.7, 0.75], start=1):   # 학습 루프는 통지만 한다
  bus.publish("epoch_end", epoch=epoch, loss=loss)

# 어댑터: 인터페이스가 다른 외부 라이브러리를 우리 인터페이스로 감싼다
class LegacyPay:                                   # 바꿀 수 없는 외부 코드: 센트 단위, 다른 메서드 이름
  def make_payment(self, cents, currency_code): return {"ok": True, "paid": cents / 100, "cur": currency_code}
class PaymentAdapter:
  def __init__(self, legacy): self.legacy = legacy
  def pay(self, amount_krw): return self.legacy.make_payment(int(amount_krw * 100), "KRW")["ok"]
print("어댑터:", PaymentAdapter(LegacyPay()).pay(15000))

# 팩토리(레지스트리): 설정 문자열로 객체 생성 — ML 프레임워크에서 흔한 형태
MODELS = {}
def register(name):
  def deco(cls):
      MODELS[name] = cls
      return cls
  return deco
@register("linear")
class Linear:
  def __init__(self, **cfg): self.cfg = cfg
@register("tree")
class Tree:
  def __init__(self, **cfg): self.cfg = cfg
def create(config): return MODELS[config.pop("name")](**config)
m = create({"name": "tree", "max_depth": 5})
print("팩토리:", type(m).__name__, m.cfg)
`,
    links: [
      { to: 'pl-oop', why: '다형성과 조합 — 패턴들의 공통 기반' },
      { to: 'pl-solid', why: '개방-폐쇄·의존성 역전을 구현하는 구체적 방법' },
      { to: 'pl-decorator', why: 'Python 함수 데코레이터와 데코레이터 패턴' },
      { to: 'se-principle', why: '패턴의 목적: 결합도를 낮추고 변경을 국지화' },
      { to: 'dl-mlp', why: '신경망 모듈 구성(레이어를 담는 레이어)은 컴포지트 구조' },
    ],
    quiz: [
      { q: '할인 정책이 자주 추가·변경되어 checkout 함수의 if-elif가 계속 길어진다. 적절한 패턴은?',
        options: ['싱글턴', '전략 — 할인 정책을 같은 인터페이스의 객체(또는 함수)로 분리해 checkout은 그것을 호출만 하게 한다', '퍼사드'], answer: 1,
        explain: '새 정책은 새 전략을 추가하는 것으로 끝나고 checkout은 수정하지 않는다(개방-폐쇄 원칙).' },
      { q: '딥러닝 학습 루프에서 "에폭이 끝나면 로깅, 체크포인트 저장, 조기 종료 판단"을 콜백으로 등록하는 구조는 어떤 패턴인가?',
        options: ['어댑터', '옵저버 — 학습 루프(발행자)는 이벤트만 통지하고, 등록된 구독자들이 각자 반응한다', '빌더'], answer: 1,
        explain: '학습 루프 코드를 고치지 않고 새로운 콜백을 추가할 수 있다. Keras callbacks, Lightning callbacks가 이 구조다.' },
      { q: '싱글턴 패턴을 신중히 써야 하는 이유는?',
        options: ['메모리를 많이 써서', '사실상 전역 상태라 여러 곳이 숨은 의존을 갖게 되고, 테스트에서 다른 구현으로 바꾸거나 상태를 초기화하기 어려워서', 'Python에서는 구현할 수 없어서'], answer: 1,
        explain: '필요한 객체를 생성자 인자로 주입하면 같은 효과(하나만 만들어 공유)를 얻으면서 의존이 드러나고 테스트하기 쉽다.' },
    ],
    resources: ['Gamma, Helm, Johnson, Vlissides, 『GoF의 디자인 패턴』', 'Eric Freeman 외, 『헤드 퍼스트 디자인 패턴』', 'Peter Norvig, "Design Patterns in Dynamic Languages" (1996, 동적 언어에서 사라지거나 단순해지는 패턴)', 'Brandon Rhodes, python-patterns.guide'],
  },
  {
    id: 'se-test', title: '테스트', advanced: true,
    summary: R`테스트는 버그의 존재를 보여 줄 뿐, 부재를 증명 못 함
어디를 시험할지가 핵심: 경계값·테스트 피라미드·테스트 대역
<strong>자동화</strong> → 변경의 안전망`,
    body: R`
<h3>무엇을 시험할 것인가</h3>
<p>가능한 입력은 사실상 무한하므로 대표를 골라야 한다.</p>
<ul>
<li><strong>동등 분할</strong>: 같은 방식으로 처리될 입력들을 한 그룹으로 보고 그룹마다 대표값 하나를 시험한다(배송비: 5만 원 미만 / 이상 / 음수).</li>
<li><strong>경계값 분석</strong>: 버그는 경계에 몰린다(<code>&gt;</code>와 <code>&gt;=</code>의 혼동, off-by-one). 경계 바로 아래·경계·바로 위(49,999 / 50,000 / 50,001)를 시험한다.</li>
<li><strong>예외 경로</strong>: 잘못된 입력이 올바르게 거부되는지.</li>
</ul>
<p>내부 구조를 모르고 명세만 보고 설계하면 <strong>블랙박스</strong>, 코드의 분기·경로를 보고 설계하면 <strong>화이트박스</strong> 테스트다. 커버리지(실행된 줄·분기의 비율)는 "시험하지 않은 곳"을 찾는 데는 유용하지만, 높다고 해서 결과를 제대로 검사했다는 뜻은 아니다. 단언문(assert)이 없는 테스트도 커버리지는 올린다.</p>
<h3>테스트 피라미드</h3>
<ul>
<li><strong>단위 테스트</strong>: 함수·클래스 하나를 격리해 시험. 밀리초 단위로 빠르고, 실패 원인이 분명하다. 가장 많이 둔다.</li>
<li><strong>통합 테스트</strong>: 실제 DB, 다른 모듈과 함께 동작하는지. 더 느리고 준비가 필요하다.</li>
<li><strong>E2E(종단 간) 테스트</strong>: 실제 사용자처럼 전체 시스템을 시험. 가장 현실적이지만 느리고, 환경 문제로 가끔 이유 없이 실패(flaky)하기 쉽다. 핵심 흐름에만 둔다.</li>
</ul>
<p>아래층일수록 많이, 위층일수록 적게 두면 빠른 피드백과 현실성의 균형을 잡을 수 있다.</p>
<h3>테스트 대역</h3>
<p>외부 API, 시간, 난수, 결제처럼 느리거나 통제할 수 없는 의존성은 가짜로 바꿔 끼운다. 정해진 값을 돌려주는 <strong>스텁</strong>, 호출 여부와 인자를 검증하는 <strong>목(mock)</strong>, 메모리 DB처럼 간단히 동작하는 <strong>페이크</strong>가 있다. 의존성을 인자로 주입하는 설계(의존성 역전)여야 쉽게 바꿔 끼울 수 있다. 목을 과하게 쓰면 구현 세부에 테스트가 묶여, 동작은 그대로인데 리팩터링할 때마다 테스트가 깨진다.</p>
<h3>좋은 단위 테스트의 성질</h3>
<p>빠르고(Fast), 서로 독립적이며(Independent), 언제 어디서나 같은 결과를 내고(Repeatable), 결과를 스스로 판정하고(Self-validating), 적시에 작성된다(Timely) — FIRST. 하나의 테스트는 하나의 동작을 검증하고, 이름만 보고도 무엇이 깨졌는지 알 수 있어야 한다.</p>
<h3>TDD와 더 나은 테스트</h3>
<p><strong>TDD</strong>는 실패하는 테스트를 먼저 쓰고(Red), 통과시킬 최소한의 코드를 쓰고(Green), 구조를 다듬는(Refactor) 짧은 주기를 반복한다. 테스트하기 쉬운 설계를 강제하는 효과가 있다. <strong>속성 기반 테스트</strong>는 구체적인 예 대신 "어떤 입력이든 결과는 항상 0 또는 3,000"처럼 성질을 쓰고 무작위 입력을 대량 생성해 검사한다(Python의 Hypothesis). <strong>뮤테이션 테스트</strong>는 코드에 일부러 작은 버그(<code>&gt;=</code> → <code>&gt;</code>)를 심어 테스트가 잡아내는지 확인해 테스트의 품질을 잰다.</p>
<h3>ML 코드의 테스트</h3>
<p>모델 성능은 확률적이라 "정확도 = 0.9123" 같은 단언은 깨지기 쉽다. 대신 전처리 함수의 출력 형태·범위, 결측치 처리, 작은 데이터에서 손실이 줄어드는지(과적합 가능한지), 입력 스키마와 학습-서빙 간 피처 일관성, 성능이 기준선 아래로 떨어지지 않는지 같은 <strong>성질</strong>을 시험한다.</p>`,
    analogy: R`<p>자동차 검사. 볼트 하나하나의 강도를 재는 것(단위 테스트)은 빠르고 싸며 어디가 문제인지 분명하다. 엔진과 변속기를 연결해 돌려 보는 것(통합 테스트)은 더 걸린다. 실제 도로 주행(E2E)은 가장 현실적이지만 비싸고 날씨에 따라 결과가 흔들린다. 그래서 볼트 검사는 많이, 도로 주행은 꼭 필요한 코스만 한다. 경계값 검사는 "제한 속도 100km/h"를 99, 100, 101에서 시험하는 것이다.</p>`,
    diagram: { caption: '테스트 피라미드. 아래로 갈수록 빠르고 싸고 원인이 분명해 많이 두고, 위로 갈수록 현실적이지만 느리고 불안정해 핵심 흐름에만 둔다.', svg: R`
<svg viewBox="0 0 560 200" width="560">
<polygon class="h" points="280,15 355.4,75 204.6,75"/><text x="280" y="58" class="sm">E2E</text>
<polygon class="n" points="204.6,77 355.4,77 430.9,135 129.1,135"/><text x="280" y="106" class="sm">통합 테스트</text>
<polygon class="g" points="129.1,137 430.9,137 500,190 60,190"/><text x="280" y="163" class="sm">단위 테스트</text>
<text x="400" y="40" class="st sm">적게 · 느림 · 현실적</text>
<text x="450" y="106" class="st sm">실제 DB·모듈 연결</text>
<text x="505" y="163" class="st sm">많이</text><text x="505" y="179" class="st sm">빠름(ms)</text>
<path class="a" d="M30,185 V25"/><text x="30" y="14" class="sm">비용·시간</text>
</svg>` },
    math: [
      { tex: R`\text{뮤테이션 점수} = \frac{\text{테스트가 잡아낸 뮤턴트 수}}{\text{전체 뮤턴트 수}}`, explain: R`뮤턴트: 코드에 일부러 심은 작은 변형(연산자 바꾸기, 경계 ±1 등). 커버리지가 "실행했는가"를 본다면 뮤테이션 점수는 "틀리면 알아채는가"를 본다.` },
    ],
    code: R`
import io, random, unittest
from unittest import mock

def shipping_fee(total, is_member):
  """회원이거나 5만 원 이상이면 무료, 아니면 3,000원"""
  if total < 0:
      raise ValueError("금액은 0 이상")
  return 0 if is_member or total >= 50_000 else 3_000

def shipping_fee_mutant(total, is_member):         # 일부러 심은 버그: >= 를 > 로 (뮤턴트)
  if total < 0:
      raise ValueError("금액은 0 이상")
  return 0 if is_member or total > 50_000 else 3_000

class Forecast:                                    # 실제로는 외부 API를 호출하는 의존성
  def today(self):
      raise ConnectionError("테스트에서 네트워크를 쓰면 안 된다")

def what_to_bring(forecast):
  return "우산" if forecast.today() == "rain" else "선글라스"

IMPL = {"fee": shipping_fee}                       # 시험 대상 교체용

class ShippingTests(unittest.TestCase):
  def test_boundary_values(self):                # 경계 바로 아래 · 경계 · 바로 위
      fee = IMPL["fee"]
      self.assertEqual(fee(49_999, False), 3_000)
      self.assertEqual(fee(50_000, False), 0)
      self.assertEqual(fee(50_001, False), 0)
  def test_member_always_free(self):
      self.assertEqual(IMPL["fee"](1_000, True), 0)
  def test_negative_rejected(self):
      with self.assertRaises(ValueError):
          IMPL["fee"](-1, False)
  def test_property_fee_is_0_or_3000(self):      # 속성 기반: 어떤 입력이든 성립해야 할 성질
      rng = random.Random(0)
      for _ in range(1000):
          self.assertIn(IMPL["fee"](rng.randint(0, 200_000), rng.random() < 0.5), {0, 3_000})

class DoubleTests(unittest.TestCase):
  def test_with_mock(self):                      # 테스트 대역: 외부 의존을 가짜로 바꿔 끼운다
      fake = mock.Mock()
      fake.today.return_value = "rain"
      self.assertEqual(what_to_bring(fake), "우산")
      fake.today.assert_called_once()

def run(label):
  loader, suite = unittest.defaultTestLoader, unittest.TestSuite()
  for case in (ShippingTests, DoubleTests):
      suite.addTests(loader.loadTestsFromTestCase(case))
  result = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)
  failed = [t.id().split(".")[-1] for t, _ in result.failures + result.errors]
  print(f"{label}: {result.testsRun}개 중 {result.testsRun - len(failed)}개 통과", f"| 실패: {failed}" if failed else "")

run("원래 코드        ")
IMPL["fee"] = shipping_fee_mutant
run("버그 심은 코드   ")                           # 경계값 테스트만이 이 버그를 잡는다
`,
    links: [
      { to: 'se-req', why: '인수 기준(Given-When-Then)이 인수 테스트가 된다' },
      { to: 'pl-solid', why: '의존성 주입이 테스트 대역을 가능하게 한다' },
      { to: 'se-refactor', why: '테스트는 동작을 바꾸지 않았음을 보장하는 안전망' },
      { to: 'se-cicd', why: '모든 변경마다 테스트를 자동 실행하는 파이프라인' },
      { to: 'ml-cv', why: 'ML의 평가도 "보지 않은 데이터로 시험"한다는 같은 원리' },
    ],
    quiz: [
      { q: '"5만 원 이상 무료 배송" 규칙에서 >= 를 > 로 잘못 쓴 버그를 잡을 수 있는 테스트 입력은?',
        options: ['10,000원', '100,000원', '50,000원 — 경계값에서만 두 구현의 결과가 달라진다', '음수 금액'], answer: 2,
        explain: '경계에서 멀리 떨어진 값은 두 구현 모두 같은 답을 낸다. 경계값 분석이 중요한 이유다.' },
      { q: '테스트 피라미드에서 E2E 테스트를 가장 적게 두는 이유는?',
        options: ['E2E 테스트는 버그를 찾지 못해서', '실제와 가장 가깝지만 느리고 비싸며 환경 요인으로 불안정하게 실패하기 쉽고, 실패해도 원인을 좁히기 어렵기 때문', 'E2E 테스트는 자동화할 수 없어서'], answer: 1,
        explain: '대부분의 로직은 빠른 단위 테스트로 검증하고, E2E는 핵심 사용자 흐름이 연결되어 동작하는지만 확인한다.' },
      { q: '코드 커버리지 100%가 테스트 품질을 보장하지 못하는 이유는?',
        options: ['커버리지 측정 도구가 부정확해서', '모든 줄이 실행되었다는 뜻일 뿐, 결과가 올바른지 검사(단언)했는지와 중요한 입력 조합을 시험했는지는 알려 주지 않기 때문', '100%는 달성할 수 없어서'], answer: 1,
        explain: '단언 없이 함수만 호출해도 커버리지는 오른다. 뮤테이션 테스트가 "틀리면 알아채는가"를 측정하는 보완책이다.' },
    ],
    resources: ['Kent Beck, 『테스트 주도 개발』', 'Vladimir Khorikov, 『단위 테스트(Unit Testing Principles, Practices, and Patterns)』', 'Python 공식 문서 — unittest, unittest.mock / pytest 문서', 'Martin Fowler, "TestPyramid" (martinfowler.com)'],
  },
  {
    id: 'se-git', title: '버전 관리와 Git',
    summary: R`차이(diff)가 아니라 <strong>스냅숏</strong> 저장, 모든 것을 내용 해시로 식별
브랜치 = 커밋을 가리키는 이름표`,
    body: R`
<h3>왜 버전 관리인가</h3>
<p>누가, 언제, 무엇을, <strong>왜</strong> 바꿨는지 기록하고, 언제든 이전 상태로 돌아가고, 여러 사람이 동시에 작업한 결과를 합치기 위해서다. Git은 분산 방식이라 모든 사람이 전체 이력을 가진 저장소 사본을 갖고, 네트워크 없이도 커밋·브랜치·이력 조회가 된다.</p>
<h3>Git의 데이터 모델: 세 가지 객체</h3>
<ul>
<li><strong>blob</strong>: 파일 내용. 이름도 권한도 없이 내용만.</li>
<li><strong>tree</strong>: 디렉터리. "이름 → blob 또는 하위 tree의 해시" 목록.</li>
<li><strong>commit</strong>: 최상위 tree의 해시 + 부모 커밋 해시(들) + 작성자 + 메시지.</li>
</ul>
<p>각 객체의 ID는 <strong>"타입 길이\0내용"의 SHA-1 해시</strong>다(SHA-256 형식도 지원된다). 그래서</p>
<ul>
<li>같은 내용은 어디에 있든 같은 객체 하나로 저장된다. 바뀌지 않은 파일은 새 커밋에서도 기존 blob을 그대로 가리키므로 스냅숏 방식이어도 공간 낭비가 적다.</li>
<li>파일 하나가 바뀌면 그 blob → 상위 tree들 → 커밋 해시가 연쇄적으로 바뀐다. 커밋 해시는 전체 내용과 모든 조상 이력의 지문이라, 과거 이력을 몰래 고치면 이후 모든 해시가 달라진다.</li>
</ul>
<h3>브랜치와 HEAD는 포인터</h3>
<p>브랜치는 <strong>특정 커밋 해시를 담은 이름</strong>일 뿐이다(<code>.git/refs/heads/main</code> 파일 하나에 해시 40자). 새 커밋을 만들면 현재 브랜치 포인터가 그 커밋으로 옮겨 간다. HEAD는 "지금 어느 브랜치(또는 커밋)에 있는가"를 가리킨다. 브랜치 생성이 거의 공짜인 이유다.</p>
<h3>세 영역</h3>
<p><strong>작업 디렉터리</strong>(실제 파일) → <code>git add</code> → <strong>스테이징 영역</strong>(다음 커밋에 들어갈 스냅숏) → <code>git commit</code> → <strong>저장소</strong>(이력). 스테이징 덕분에 여러 수정 중 일부만 골라 의미 있는 단위로 커밋할 수 있다.</p>
<h3>merge와 rebase</h3>
<p>두 브랜치를 합칠 때 Git은 두 커밋의 <strong>공통 조상(merge base)</strong>을 찾아 <strong>3-way 병합</strong>을 한다. 각 파일(실제로는 각 구간)에 대해 한쪽만 바꿨으면 그 변경을 택하고, 양쪽이 같은 부분을 다르게 바꿨으면 <strong>충돌</strong>로 사람에게 묻는다. 공통 조상이 있어야 "누가 바꿨는가"를 알 수 있다.</p>
<ul>
<li><strong>merge</strong>: 부모가 둘인 병합 커밋을 만든다. 실제로 일어난 역사를 보존한다.</li>
<li><strong>rebase</strong>: 내 브랜치의 커밋들을 상대 브랜치 끝에 <strong>다시 적용</strong>해 새 커밋들을 만든다. 이력이 일직선이 되지만, 커밋 해시가 바뀐 새 커밋이 생기는 것이므로 <strong>이미 다른 사람과 공유한 커밋은 rebase하지 않는다</strong>.</li>
</ul>
<h3>협업 흐름과 좋은 커밋</h3>
<p>main에서 짧게 브랜치를 따서 작업하고, Pull Request로 리뷰를 받고 자동 테스트를 통과하면 병합한다. 오래 사는 브랜치일수록 병합 충돌이 커지므로 작고 자주 합치는 것이 좋다(트렁크 기반 개발). 커밋은 하나의 논리적 변경 단위로, 메시지는 "무엇을"보다 <strong>"왜"</strong>를 쓴다. 비밀번호나 API 키는 한 번 커밋되면 이력에 남으므로 <code>.gitignore</code>와 비밀 관리 도구로 처음부터 막는다. ML 프로젝트에서 대용량 데이터·모델 파일은 Git LFS나 DVC 같은 별도 도구로 버전을 관리한다.</p>`,
    analogy: R`<p>Git은 <strong>사진 앨범</strong>이다. 커밋할 때마다 프로젝트 전체를 찍은 사진(스냅숏)을 붙이되, 변하지 않은 부분은 이전 사진의 조각을 재사용한다. 각 사진에는 바로 앞 사진의 번호가 적혀 있어 줄줄이 이어진다. 브랜치는 앨범의 특정 페이지에 꽂은 <strong>책갈피</strong>일 뿐이라 몇 개를 꽂아도 앨범은 무거워지지 않는다. 병합은 두 책갈피가 갈라진 지점(공통 조상)을 기준으로 각자 바뀐 부분을 합치는 것이다.</p>`,
    diagram: { caption: '커밋 그래프. 각 커밋은 부모를 가리키고, 브랜치는 커밋을 가리키는 이름이다. M은 부모가 둘인 병합 커밋이며 C1이 병합의 공통 조상이다.', svg: R`
<svg viewBox="0 0 560 215" width="560">
<circle class="h" cx="60" cy="120" r="18"/><text x="60" y="120" class="sm">C1</text>
<circle class="n" cx="160" cy="120" r="18"/><text x="160" y="120" class="sm">C2</text>
<circle class="n" cx="260" cy="120" r="18"/><text x="260" y="120" class="sm">C3</text>
<circle class="n" cx="160" cy="50" r="18"/><text x="160" y="50" class="sm">F1</text>
<circle class="n" cx="260" cy="50" r="18"/><text x="260" y="50" class="sm">F2</text>
<circle class="h" cx="380" cy="90" r="20"/><text x="380" y="90" class="sm">M</text>
<path class="a" d="M142,120 H80"/><path class="a" d="M242,120 H180"/><path class="a" d="M145,60 L76,110"/><path class="a" d="M242,50 H180"/>
<path class="a" d="M361,96 L278,116"/><path class="a" d="M361,84 L278,55"/>
<rect class="g" x="440" y="76" width="70" height="28" rx="5"/><text x="475" y="90" class="sm">main</text><path class="a" d="M440,90 H402"/>
<rect class="g" x="290" y="12" width="70" height="26" rx="5"/><text x="325" y="25" class="sm">feature</text><path class="a" d="M300,38 L274,44"/>
<text x="475" y="62" class="sm">HEAD → main</text>
<text x="60" y="150" class="sm">공통 조상</text>
<rect class="n" x="40" y="178" width="90" height="26" rx="4"/><text x="85" y="191" class="sm">commit</text>
<rect class="n" x="175" y="178" width="90" height="26" rx="4"/><text x="220" y="191" class="sm">tree (폴더)</text>
<rect class="n" x="310" y="178" width="90" height="26" rx="4"/><text x="355" y="191" class="sm">blob (내용)</text>
<path class="a" d="M130,191 H173"/><path class="a" d="M265,191 H308"/>
<text x="480" y="191" class="sm">ID = SHA-1(내용)</text>
</svg>` },
    math: [
      { tex: R`\text{object id} = \text{SHA-1}\big(\texttt{"<타입> <바이트 수>\textbackslash 0"} \,\|\, \text{내용}\big)`, explain: R`Git 객체 ID. $\|$: 이어 붙이기. 내용이 1바이트만 달라도 해시가 완전히 달라지고, 같은 내용은 항상 같은 ID가 된다(내용 주소 저장).` },
    ],
    code: R`
import hashlib, shutil, subprocess

def git_hash(kind, data: bytes) -> str:
  return hashlib.sha1(f"{kind} {len(data)}\0".encode() + data).hexdigest()

print("직접 계산한 blob('hello\\n'):", git_hash("blob", b"hello\n"))
if shutil.which("git"):                                       # 실제 git과 비교 (설치되어 있으면)
  real = subprocess.run(["git", "hash-object", "--stdin"], input=b"hello\n", capture_output=True).stdout.decode().strip()
  print("실제 git hash-object      :", real)

store, snapshot, parents = {}, {}, {}
def put(kind, data):
  sha = git_hash(kind, data)
  store[sha] = kind                                          # 같은 내용이면 같은 키 → 자동 중복 제거
  return sha

def commit(files, parent_list, msg):
  tree_data = b"".join(f"100644 {name}\0".encode() + bytes.fromhex(put("blob", content))
                       for name, content in sorted(files.items()))
  body = f"tree {put('tree', tree_data)}\n" + "".join(f"parent {p}\n" for p in parent_list)
  body += "author me <me@ex.com> 1700000000 +0900\ncommitter me <me@ex.com> 1700000000 +0900\n\n" + msg + "\n"
  c = put("commit", body.encode())
  snapshot[c], parents[c] = dict(files), list(parent_list)
  return c

c1 = commit({"a.txt": b"hello\n", "b.txt": b"v1\n"}, [], "init")
c2 = commit({"a.txt": b"hello\n", "b.txt": b"v2\n"}, [c1], "update b")          # main
f1 = commit({"a.txt": b"hello world\n", "b.txt": b"v1\n"}, [c1], "update a")    # feature
refs = {"main": c2, "feature": f1}                                               # 브랜치 = 해시를 가리키는 이름
print("브랜치:", {k: v[:7] for k, v in refs.items()}, "| 객체 수:", len(store), "(바뀌지 않은 blob은 재사용)")

def ancestors(c):
  seen, stack = set(), [c]
  while stack:
      x = stack.pop()
      if x not in seen:
          seen.add(x)
          stack.extend(parents[x])
  return seen

def merge_base(a, b):                                          # 다른 공통 조상의 조상이 아닌 공통 조상
  common = ancestors(a) & ancestors(b)
  return next(c for c in common if not any(c != o and c in ancestors(o) for o in common))

def three_way(base, ours, theirs):
  merged, conflicts = {}, []
  for name in sorted(set(base) | set(ours) | set(theirs)):
      b, o, t = base.get(name), ours.get(name), theirs.get(name)
      if o == t or t == b:
          merged[name] = o                                   # 같거나 상대가 안 바꿨으면 내 것
      elif o == b:
          merged[name] = t                                   # 내가 안 바꿨으면 상대 것
      else:
          conflicts.append(name)                             # 양쪽이 다르게 바꿈 → 충돌
          merged[name] = o
  return merged, conflicts

base = merge_base(refs["main"], refs["feature"])
merged, conflicts = three_way(snapshot[base], snapshot[refs["main"]], snapshot[refs["feature"]])
print("공통 조상 = c1:", base == c1, "| 병합 결과:", merged, "| 충돌:", conflicts)
refs["main"] = commit(merged, [refs["main"], refs["feature"]], "merge feature")    # 부모가 둘인 커밋

other = commit({"a.txt": b"hello\n", "b.txt": b"v3\n"}, [c1], "other change to b")
print("b.txt를 양쪽에서 다르게 수정:", three_way(snapshot[c1], snapshot[c2], snapshot[other])[1])
`,
    links: [
      { to: 'sec-hash', why: 'Git 객체 ID는 암호학적 해시 — 내용이 조금만 바뀌어도 ID가 바뀐다' },
      { to: 'ds-graph', why: '커밋 이력은 방향 비순환 그래프(DAG), 병합 기준은 공통 조상 찾기' },
      { to: 'ds-hash', why: '내용 주소 저장: 해시를 키로 한 객체 저장소' },
      { to: 'se-cicd', why: '브랜치·PR이 CI 파이프라인을 실행하는 단위' },
      { to: 'ds-search', why: 'git bisect: 버그가 생긴 커밋을 이진 탐색으로 찾기' },
    ],
    quiz: [
      { q: 'Git에서 브랜치를 수십 개 만들어도 저장소 크기가 거의 늘지 않는 이유는?',
        options: ['Git이 브랜치를 압축해서', '브랜치는 특정 커밋 해시를 가리키는 작은 이름표일 뿐, 파일을 복사하지 않기 때문', '브랜치는 원격 저장소에만 저장되어서'], answer: 1,
        explain: '새 커밋을 만들 때만 객체가 추가되고, 그것도 바뀐 파일의 blob과 경로상의 tree만 새로 생긴다.' },
      { q: '이미 원격에 push해 동료가 받아 간 커밋들을 rebase한 뒤 강제 push하면 문제가 되는 이유는?',
        options: ['rebase는 파일 내용을 지우기 때문', 'rebase는 기존 커밋을 고치는 게 아니라 해시가 다른 새 커밋을 만들기 때문에, 동료의 저장소에 있는 옛 커밋들과 이력이 갈라져 혼란과 중복이 생긴다', 'Git이 원격 rebase를 금지해서'], answer: 1,
        explain: '공유하지 않은 로컬 커밋을 정리할 때만 rebase를 쓰는 것이 원칙이다.' },
      { q: '3-way 병합에서 공통 조상이 필요한 이유는?',
        options: ['병합 속도를 높이려고', '두 버전만 비교하면 차이가 있다는 것만 알 뿐 누가 바꿨는지 모르지만, 공통 조상과 비교하면 한쪽만 바꾼 부분은 자동으로 택하고 양쪽이 다르게 바꾼 부분만 충돌로 판단할 수 있기 때문', '커밋 메시지를 합치려고'], answer: 1,
        explain: '공통 조상이 "원래 값"을 알려 준다. 한쪽만 원래 값과 다르면 그쪽이 변경한 것이다.' },
    ],
    resources: ['Scott Chacon & Ben Straub, 『Pro Git』 (무료 공개, 한국어판 있음) — 특히 10장 Git의 내부', 'Julia Evans, 「How Git Works」 진', 'Learn Git Branching (learngitbranching.js.org — 브랜치·병합 시각화 연습)'],
  },
  {
    id: 'se-cicd', title: 'CI/CD',
    summary: R`CI: 모든 변경을 자주 합치고 <strong>자동 검증</strong>
CD: 검증된 변경을 언제든(또는 자동으로) 안전하게 배포`,
    body: R`
<h3>왜 자주 합치는가</h3>
<p>여러 사람이 몇 주씩 따로 작업한 뒤 한꺼번에 합치면 충돌과 버그가 몰려 "통합 지옥"이 된다. 변경을 작게, 하루에도 여러 번 주 브랜치에 합치면 충돌이 작고, 문제가 생겼을 때 원인이 되는 변경을 바로 찾을 수 있다. 이를 가능하게 하는 것이 <strong>모든 커밋·PR마다 자동으로 실행되는 파이프라인</strong>이다.</p>
<h3>CI 파이프라인</h3>
<p>코드를 올리면 서버가 깨끗한 환경에서 의존성을 설치하고, 정적 분석(린터, 타입 검사, 보안 취약점 검사), 단위·통합 테스트, 빌드를 자동으로 실행한다. 원칙은 다음과 같다.</p>
<ul>
<li><strong>빠르게 실패</strong>: 싸고 빠른 검사부터 실행하고, 실패하면 즉시 멈추고 알린다. 피드백이 10분 안에 와야 개발자가 맥락을 잃지 않는다.</li>
<li><strong>깨진 빌드는 최우선으로 고친다</strong>: 빨간 상태가 계속되면 다음 문제가 묻혀 버린다.</li>
<li><strong>재현 가능한 빌드</strong>: 의존성 버전을 고정(lock 파일)하고, 같은 커밋은 같은 산출물이 되게 한다. 한 번 만든 산출물(컨테이너 이미지 등)을 스테이징과 운영에 그대로 승격해 "스테이징에선 됐는데"를 막는다.</li>
</ul>
<h3>지속적 전달과 지속적 배포</h3>
<p><strong>지속적 전달</strong>은 모든 변경이 언제든 배포 가능한 상태로 유지되고 버튼 하나로 배포하는 것, <strong>지속적 배포</strong>는 파이프라인을 통과하면 사람의 승인 없이 운영까지 자동으로 나가는 것이다. 배포를 자주 하면 각 배포의 변경량이 작아져 위험도 작다.</p>
<h3>안전하게 내보내는 기법</h3>
<ul>
<li><strong>블루-그린</strong>: 새 버전 환경을 옆에 완전히 띄운 뒤 트래픽을 한 번에 전환하고, 문제가 있으면 다시 전환해 즉시 되돌린다.</li>
<li><strong>카나리</strong>: 새 버전에 트래픽의 일부(예: 5%)만 보내고 오류율·지연 시간을 기존 버전과 비교한다. 괜찮으면 비율을 늘리고, 나빠지면 자동으로 롤백한다. 판단하려면 비교할 만큼 충분한 요청이 쌓여야 한다.</li>
<li><strong>기능 플래그</strong>: 코드는 배포하되 기능은 설정으로 켜고 끈다. 배포(코드를 내보내기)와 릴리스(사용자에게 공개)를 분리해, 미완성 기능도 주 브랜치에 합칠 수 있게 한다.</li>
</ul>
<h3>성과 측정</h3>
<p>DORA 연구는 배포 빈도, 변경의 리드타임(커밋에서 운영까지), 변경 실패율, 장애 복구 시간을 소프트웨어 전달 성과의 핵심 지표로 제시했다. 빠름과 안정성은 서로 반대가 아니라, 잘하는 조직은 둘 다 좋다는 것이 주요 발견이다.</p>
<h3>ML에서는: MLOps</h3>
<p>ML 시스템은 코드뿐 아니라 <strong>데이터와 모델</strong>도 바뀐다. 그래서 데이터 검증(스키마·분포), 모델 학습 재현성, 성능 기준을 통과한 모델만 등록하는 모델 레지스트리, 새 모델의 섀도·카나리 배포, 운영 데이터 분포 변화(드리프트) 감시와 주기적 재학습(지속적 학습, CT)이 파이프라인에 더해진다.</p>`,
    analogy: R`<p>공장의 자동 품질 검사 라인. 부품 하나가 들어올 때마다(커밋) 컨베이어 위에서 치수 검사 → 강도 검사 → 조립 검사를 자동으로 거치고(CI), 하나라도 불합격이면 라인이 즉시 멈추고 알람이 울린다. 합격한 제품은 먼저 일부 매장에만 진열해 반응을 보고(카나리), 문제가 없으면 전국에 출시한다. 완성품을 일 년에 한 번 몰아서 검사하는 공장보다 훨씬 빨리 문제를 찾는다.</p>`,
    diagram: { caption: 'CI/CD 파이프라인. 싼 검사부터 실행해 실패하면 즉시 멈추고, 카나리 단계에서 지표가 나빠지면 자동으로 되돌린다.', svg: R`
<svg viewBox="0 0 560 215" width="560">
<text x="30" y="20" class="st sm">CI: 합칠 때마다 자동 검증</text>
<rect class="n" x="20" y="30" width="110" height="40" rx="6"/><text x="75" y="50" class="sm">커밋 / PR</text>
<rect class="n" x="155" y="30" width="110" height="40" rx="6"/><text x="210" y="50" class="sm">정적 분석</text>
<rect class="n" x="290" y="30" width="110" height="40" rx="6"/><text x="345" y="50" class="sm">테스트</text>
<rect class="n" x="425" y="30" width="110" height="40" rx="6"/><text x="480" y="50" class="sm">빌드 (산출물)</text>
<path class="a" d="M130,50 H153"/><path class="a" d="M265,50 H288"/><path class="a" d="M400,50 H423"/>
<path class="a d" d="M345,72 Q210,100 80,72"/><text x="210" y="98" class="sm">실패 → 중단·즉시 알림</text>
<text x="30" y="122" class="st sm">CD: 같은 산출물을 단계적으로 승격</text>
<path class="a" d="M480,70 V110 H165 V128"/>
<rect class="n" x="110" y="130" width="110" height="40" rx="6"/><text x="165" y="150" class="sm">스테이징</text>
<rect class="h" x="245" y="130" width="110" height="40" rx="6"/><text x="300" y="144" class="sm">카나리</text><text x="300" y="158" class="sm">(트래픽 5%)</text>
<rect class="n" x="380" y="130" width="110" height="40" rx="6"/><text x="435" y="150" class="sm">전체 배포</text>
<path class="a" d="M220,150 H243"/><path class="a" d="M355,150 H378"/>
<path class="a d" d="M300,172 Q300,205 220,195"/><text x="390" y="200" class="sm">지표 악화 → 자동 롤백</text>
</svg>` },
    math: [
      { tex: R`\text{SE}(\hat p) \approx \sqrt{\frac{p(1-p)}{n}}`, explain: R`카나리 그룹 오류율 추정치의 표준오차.<ul class="defs"><li>$p$: 오류율</li><li>$n$: 카나리가 받은 요청 수</li></ul>$p$ = 1%, $n$ = 1,000이면 약 0.31%p라서, 1%와 1.5%를 구별하기엔 아직 이르다. 카나리 판단에는 충분한 요청과 시간이 필요하다.` },
    ],
    code: R`
import hashlib, random

def lint(code):
  ok = "print(" not in code
  return ok, "디버그 print 없음" if ok else "디버그 print 발견"

def unit_tests(code):
  ns = {}
  exec(code, ns)                                  # 학습용: 검사 대상 코드를 불러와 시험
  ok = ns["add"](2, 3) == 5 and ns["add"](-1, 1) == 0
  return ok, "테스트 2개 통과" if ok else "add(2, 3)의 기대값 5와 불일치"

def build(code):
  return True, f"산출물 {hashlib.sha256(code.encode()).hexdigest()[:12]} (같은 코드 → 같은 산출물)"

def pipeline(code):
  for name, stage in [("정적 분석", lint), ("단위 테스트", unit_tests), ("빌드", build)]:
      ok, info = stage(code)
      print(f"  {'✔' if ok else '✘'} {name}: {info}")
      if not ok:
          print("  → 이후 단계는 실행하지 않고 즉시 알림 (빠른 실패)")
          return False
  print("  → 스테이징 배포 가능")
  return True

print("커밋 A"); pipeline("def add(a, b):\n    return a + b\n")
print("커밋 B"); pipeline("def add(a, b):\n    return a - b\n")

def canary(new_error_rate, base_error_rate=0.01, requests=20_000, share=0.05, seed=0):
  rng = random.Random(seed)
  stats = {"기존": [0, 0], "카나리": [0, 0]}      # [요청 수, 오류 수]
  for _ in range(requests):
      group = "카나리" if rng.random() < share else "기존"
      rate = new_error_rate if group == "카나리" else base_error_rate
      stats[group][0] += 1
      stats[group][1] += rng.random() < rate
  base, new = (stats[g][1] / stats[g][0] for g in ("기존", "카나리"))
  decision = "자동 롤백" if new > base + 0.01 else "트래픽 비율 확대"
  print(f"  기존 오류율 {base:.2%} / 카나리 오류율 {new:.2%} (카나리 요청 {stats['카나리'][0]:,}개) → {decision}")

print("카나리 배포: 정상 버전"); canary(0.01)
print("카나리 배포: 버그 있는 버전"); canary(0.05)
`,
    links: [
      { to: 'se-test', why: '파이프라인의 핵심 단계인 자동화된 테스트' },
      { to: 'se-git', why: '브랜치·PR·병합이 파이프라인을 실행하는 단위' },
      { to: 'se-process', why: '작은 배치와 짧은 피드백 주기 — 애자일의 연장' },
      { to: 'ai-mlops', why: '데이터·모델까지 포함하는 ML의 CI/CD' },
      { to: 'math-test', why: '카나리 판단은 두 집단 비율의 통계적 비교' },
    ],
    quiz: [
      { q: 'CI 파이프라인에서 린터·단위 테스트처럼 빠른 검사를 먼저 실행하는 이유는?',
        options: ['느린 검사는 중요하지 않아서', '실패할 변경을 가능한 한 빨리 걸러 개발자에게 즉시 알리고, 비싼 단계(통합 테스트, 빌드, 배포)에 자원을 낭비하지 않기 위해', '순서는 결과에 영향이 없어서'], answer: 1,
        explain: '빠른 실패(fail fast). 피드백이 늦을수록 개발자는 다른 일로 넘어가 맥락을 잃고 수정 비용이 커진다.' },
      { q: '카나리 배포에서 새 버전에 트래픽의 5%만 보내는 이유는?',
        options: ['서버 비용을 아끼려고', '문제가 있어도 영향을 받는 사용자를 일부로 제한하면서, 실제 운영 트래픽으로 기존 버전과 지표를 비교해 확대 또는 롤백을 판단하기 위해', '5%는 법적으로 정해진 비율이라서'], answer: 1,
        explain: '테스트 환경에서 재현되지 않는 문제를 실제 트래픽으로 검증한다. 다만 비교할 만큼 요청이 쌓일 때까지 기다려야 한다.' },
      { q: '기능 플래그의 핵심 이점은?',
        options: ['코드 양이 줄어든다', '코드 배포와 기능 공개를 분리해, 미완성 기능도 주 브랜치에 자주 합치고 문제가 생기면 재배포 없이 기능만 끌 수 있다', '테스트가 필요 없어진다'], answer: 1,
        explain: '장기 브랜치를 피하게 해 준다. 대신 오래된 플래그는 코드 복잡도를 높이므로 정리해야 한다.' },
    ],
    resources: ['Jez Humble & David Farley, 『신뢰할 수 있는 소프트웨어 출시(Continuous Delivery)』', 'Nicole Forsgren 외, 『Accelerate』 (DORA 연구)', 'Google, 「MLOps: 머신러닝의 지속적 배포 및 자동화 파이프라인」 (Google Cloud 문서)', 'GitHub Actions 문서'],
  },
  {
    id: 'se-refactor', title: '리팩터링과 코드 품질',
    summary: R`겉으로 보이는 동작은 그대로, <strong>내부 구조</strong>만 개선
테스트라는 안전망 위에서 작은 단계로
목적: 다음 변경을 쉽게`,
    body: R`
<h3>리팩터링의 정의와 조건</h3>
<p>리팩터링은 기능 추가나 버그 수정이 아니다. 같은 입력에 같은 출력을 내면서 코드를 이해하고 바꾸기 쉽게 만드는 작업이다. 그래서 두 가지가 필요하다.</p>
<ul>
<li><strong>테스트</strong>: 동작이 바뀌지 않았음을 확인할 방법. 테스트가 없는 레거시 코드라면, 먼저 현재 동작을 그대로 기록하는 <strong>특성 테스트</strong>(characterization test)를 만든다. 현재 동작이 옳은지와 무관하게 "지금 이렇게 동작한다"를 고정하는 것이다.</li>
<li><strong>작은 단계</strong>: 이름 바꾸기 하나, 함수 추출 하나를 하고 테스트를 돌린다. 실패하면 방금 바꾼 것만 되돌리면 된다. 큰 덩어리를 한 번에 바꾸면 무엇이 문제인지 찾기 어렵다.</li>
</ul>
<p>기능 추가와 리팩터링은 섞지 않는다(두 개의 모자). "기능을 추가하기 쉬운 구조로 먼저 리팩터링하고, 그다음 기능을 추가"하는 순서가 좋다.</p>
<h3>코드 냄새: 리팩터링이 필요하다는 신호</h3>
<ul>
<li><strong>긴 함수</strong>와 깊은 중첩: 한눈에 이해되지 않는다 → 함수 추출, 보호절(예외 경우를 먼저 반환)로 중첩 줄이기.</li>
<li><strong>중복 코드</strong>: 같은 규칙이 여러 곳에 → 하나로 모으기. 단, 바뀌는 이유가 다른 우연한 중복은 합치지 않는다.</li>
<li><strong>매직 넘버</strong>: <code>* 0.85</code>의 의미를 모른다 → 이름 있는 상수.</li>
<li><strong>긴 매개변수 목록</strong>, 항상 같이 다니는 데이터 묶음 → 객체로 묶기.</li>
<li><strong>기능 욕심</strong>: 다른 객체의 데이터를 너무 많이 쓰는 메서드 → 그 데이터가 있는 곳으로 옮기기.</li>
<li><strong>산탄총 수술</strong>: 하나를 바꾸려면 여러 파일을 고쳐야 함 → 응집도가 낮다는 뜻.</li>
<li><strong>나쁜 이름</strong>: 가장 흔하고 가장 싸게 고칠 수 있는 냄새다.</li>
</ul>
<h3>복잡도를 재는 방법</h3>
<p><strong>순환 복잡도</strong>는 함수 안의 독립적인 실행 경로 수로, 대략 분기(if, for, while, and/or, except)의 수 + 1이다. 경로 수만큼 테스트가 필요하므로, 값이 크면(흔히 10 이상) 이해와 테스트가 어렵다는 신호다. 다만 숫자는 참고용이고, 중첩 깊이와 이름의 명확성처럼 사람이 느끼는 이해 난이도(인지 복잡도)도 함께 본다.</p>
<h3>기술 부채</h3>
<p>빨리 출시하기 위해 택한 임시 설계는 빚과 같다. 당장은 시간을 벌지만, 그 위에 코드를 쌓을수록 이자(변경 비용)가 붙는다. 의도적으로 진 빚은 기록해 두고 갚을 계획을 세우며, 모르고 쌓인 빚은 리팩터링으로 꾸준히 갚는다. "보이스카우트 규칙: 왔을 때보다 깨끗하게 하고 떠나라"는 작은 개선을 일상에 녹이는 방법이다.</p>
<h3>도구로 품질을 지키기</h3>
<p>포매터(black, ruff format)로 스타일 논쟁을 없애고, 린터(ruff, pylint)로 흔한 실수를 잡고, 타입 힌트와 타입 검사기(mypy, pyright)로 잘못된 호출을 실행 전에 찾는다. 이것들을 CI에 넣으면 사람의 코드 리뷰는 설계와 의도에 집중할 수 있다. 노트북으로 실험한 ML 코드를 서비스로 옮길 때가 대표적인 리팩터링 시점이다: 셀에 흩어진 전처리를 테스트 가능한 함수로 추출하고, 매직 넘버를 설정으로 빼고, 학습과 서빙이 같은 전처리 코드를 쓰게 만든다.</p>`,
    analogy: R`<p>정리 정돈. 리팩터링은 <strong>방을 정리하는 것</strong>이지 새 가구를 사는 것(기능 추가)이 아니다. 정리 전후로 방에 있는 물건(동작)은 같아야 한다. 한 번에 다 꺼내 늘어놓으면 오히려 엉망이 되니, 서랍 하나씩 정리하고 확인한다(작은 단계 + 테스트). 매일 조금씩 정리하는 집은 대청소가 필요 없지만, 미뤄 둔 정리(기술 부채)는 나중에 이사할 때 몇 배로 돌아온다.</p>`,
    diagram: { caption: '리팩터링 주기. 테스트가 통과하는 상태에서 작은 변경 하나를 하고 테스트를 돌린다. 실패하면 방금 변경만 되돌린다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<rect class="h" x="190" y="15" width="180" height="42" rx="8"/><text x="280" y="31" class="sm">테스트 모두 통과</text><text x="280" y="47" class="sm">(동작 고정)</text>
<rect class="n" x="340" y="120" width="200" height="46" rx="8"/><text x="440" y="137" class="sm">작은 변경 하나</text><text x="440" y="153" class="sm">이름 바꾸기 · 함수 추출 · 상수화</text>
<rect class="n" x="20" y="120" width="200" height="46" rx="8"/><text x="120" y="137" class="sm">테스트 실행</text><text x="120" y="153" class="sm">(수 초 안에)</text>
<path class="a" d="M350,50 Q440,70 440,118"/><path class="a" d="M338,143 H222"/><path class="ha" d="M120,118 Q120,70 188,45"/>
<text x="140" y="80" class="sm">통과</text>
<path class="a d" d="M120,168 Q280,215 440,168"/><text x="280" y="203" class="sm">실패 → 방금 변경만 되돌림</text>
</svg>` },
    math: [
      { tex: R`M = E - N + 2P \;=\; (\text{분기 수}) + 1`, explain: R`순환 복잡도(McCabe). 제어 흐름 그래프에서<ul class="defs"><li>$E$: 간선 수</li><li>$N$: 노드 수</li><li>$P$: 연결된 부분 수(함수 하나면 1)</li></ul>함수 하나에 대해서는 if·for·while·and/or 같은 결정 지점 수에 1을 더한 값과 같다. 모든 독립 경로를 시험하는 데 필요한 최소 테스트 수의 기준이 된다.` },
    ],
    code: R`
import ast, itertools, math

BEFORE = '''
def price(kind, qty, member):
  if kind == "book":
      if member:
          if qty >= 10:
              return qty * 9000 * 0.85
          else:
              return qty * 9000 * 0.9
      else:
          if qty >= 10:
              return qty * 9000 * 0.95
          else:
              return qty * 9000
  elif kind == "pen":
      if member:
          return qty * 1000 * 0.9
      else:
          return qty * 1000
  else:
      raise ValueError(kind)
'''

AFTER = '''
UNIT_PRICE = {"book": 9000, "pen": 1000}           # 매직 넘버 → 이름 있는 상수
BULK_QTY, BULK_DISCOUNT, MEMBER_RATE = 10, 0.05, 0.9

def discount_rate(kind, qty, member):               # 함수 추출: 할인 규칙만 담당
  rate = MEMBER_RATE if member else 1.0
  if kind == "book" and qty >= BULK_QTY:
      rate -= BULK_DISCOUNT
  return rate

def price(kind, qty, member):
  if kind not in UNIT_PRICE:                      # 보호절: 예외 경우를 먼저 처리
      raise ValueError(kind)
  return qty * UNIT_PRICE[kind] * discount_rate(kind, qty, member)
'''

def complexity(fn):                                 # 순환 복잡도 = 결정 지점 + 1
  count = 1
  for node in ast.walk(fn):
      if isinstance(node, (ast.If, ast.For, ast.While, ast.IfExp, ast.ExceptHandler)):
          count += 1
      elif isinstance(node, ast.BoolOp):
          count += len(node.values) - 1
  return count

for label, src in [("리팩터링 전", BEFORE), ("리팩터링 후", AFTER)]:
  funcs = [n for n in ast.walk(ast.parse(src)) if isinstance(n, ast.FunctionDef)]
  print(f"{label}: 순환 복잡도 {({f.name: complexity(f) for f in funcs})}")

old, new = {}, {}
exec(BEFORE, old)
exec(AFTER, new)
cases = list(itertools.product(["book", "pen"], [1, 9, 10, 25], [True, False]))   # 특성 테스트
# 계산 순서가 바뀌면 부동소수점 마지막 자리가 달라질 수 있으므로 == 대신 isclose로 비교한다
same = sum(math.isclose(old["price"](*c), new["price"](*c)) for c in cases)
print(f"특성 테스트 {len(cases)}개 중 동작 일치 {same}개")
for impl in (old, new):
  try:
      impl["price"]("cup", 1, False)
  except ValueError:
      pass
  else:
      raise AssertionError("알 수 없는 상품은 거부해야 한다")
print("예외 동작도 동일: 알 수 없는 상품 → ValueError")
`,
    links: [
      { to: 'se-test', why: '테스트는 리팩터링의 전제 조건인 안전망' },
      { to: 'se-principle', why: '결합도·응집도 — 리팩터링이 개선하려는 대상' },
      { to: 'pl-solid', why: '단일 책임 — 함수·클래스 추출의 기준' },
      { to: 'ca-number', why: '같은 계산도 연산 순서에 따라 부동소수점 결과가 미세하게 달라진다' },
      { to: 'se-cicd', why: '린터·포매터·타입 검사를 파이프라인에서 자동 실행' },
    ],
    quiz: [
      { q: '다음 중 리팩터링에 해당하지 <strong>않는</strong> 것은?',
        options: ['긴 함수를 의미 있는 작은 함수들로 추출하기', '모호한 변수 이름을 의도가 드러나는 이름으로 바꾸기', '할인 계산 버그를 고쳐 결과 금액을 바로잡기', '매직 넘버를 이름 있는 상수로 바꾸기'], answer: 2,
        explain: '리팩터링은 동작을 바꾸지 않는다. 버그 수정은 동작을 바꾸는 별개의 작업이므로 리팩터링과 섞지 않고 따로 커밋한다.' },
      { q: '테스트가 없는 레거시 코드를 리팩터링하기 전에 가장 먼저 할 일은?',
        options: ['코드 전체를 새로 작성한다', '현재 동작을 그대로 기록하는 특성 테스트를 만들어 안전망을 확보한다', '주석을 모두 지운다'], answer: 1,
        explain: '특성 테스트는 "지금 이렇게 동작한다"를 고정한다. 그래야 구조를 바꾼 뒤 동작이 달라졌는지 알 수 있다.' },
      { q: '순환 복잡도가 높은 함수가 문제인 이유로 가장 적절한 것은?',
        options: ['실행 속도가 느려서', '독립적인 실행 경로가 많아 이해하기 어렵고, 모든 경로를 검증하려면 그만큼 많은 테스트가 필요하기 때문', '메모리를 많이 써서'], answer: 1,
        explain: '분기마다 경우의 수가 늘어난다. 함수 추출, 보호절, 다형성(조건문을 전략 객체로) 등으로 줄인다.' },
    ],
    resources: ['Martin Fowler, 『리팩터링』 2판', 'Michael Feathers, 『레거시 코드 활용 전략(Working Effectively with Legacy Code)』', 'Robert C. Martin, 『클린 코드』', 'Ruff 문서 (Python 린터·포매터)'],
  },
];
