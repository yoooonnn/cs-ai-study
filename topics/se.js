TOPICS.se = [
  {
    id: 'se-process', title: '개발 방법론', advanced: true,
    summary: R`방법론 = <strong>불확실성</strong>을 다루는 방식
요구사항 확실 → 계획 중심(폭포수) / 불확실 → 짧은 주기 반복(애자일)`,
    body: R`
<h3>폭포수: 단계를 순서대로</h3>
<p>요구사항 → 설계 → 구현 → 테스트 → 배포를 한 번씩 순서대로 진행한다. 각 단계의 산출물(문서)을 다음 단계의 입력으로 쓰므로 계획과 진척 관리가 명확하다. 전제는 <strong>처음에 요구사항을 정확히 알 수 있다</strong>는 것이다. 이 전제가 틀리면 문제가 마지막 테스트·배포 단계에서야 드러나고, 그때 고치는 비용은 초기보다 훨씬 크다. 요구사항이 법·규제로 고정되거나, 하드웨어처럼 되돌리기 비싼 영역에서는 여전히 계획 중심 접근이 합리적이다.</p>
<h3>대표적인 생명주기 모델</h3>
<table><tr><th>모델</th><th>진행 방식</th><th>잘 맞는 경우</th></tr>
<tr><td>폭포수</td><td>단계를 한 번씩 순서대로, 되돌아가지 않음</td><td>요구사항이 분명하고 바뀌지 않음</td></tr>
<tr><td>프로토타입</td><td>견본을 빨리 만들어 보여 주고 요구사항을 확정</td><td>사용자가 원하는 것을 말로 설명하기 어려움</td></tr>
<tr><td>나선형</td><td>계획 → <strong>위험 분석</strong> → 개발 → 평가를 여러 바퀴 반복</td><td>크고 위험이 큰 프로젝트</td></tr>
<tr><td>반복·점진적</td><td>전체를 나눠 작은 부분씩 완성하며 늘려 감</td><td>일찍 일부 기능을 써 봐야 함</td></tr>
<tr><td>애자일</td><td>1~4주 주기로 작동하는 결과물을 내고 피드백 반영</td><td>요구사항이 자주 바뀜</td></tr></table>
<figure class="diagram"><svg viewBox="0 0 560 282" width="560"><path class="e d" d="M150,130 H410 M280,5 V255"/><path class="he" d="M266.0,130.0 L265.5,131.5 L265.2,133.1 L265.1,134.9 L265.1,136.6 L265.4,138.4 L265.9,140.2 L266.6,142.0 L267.6,143.8 L268.8,145.5 L270.2,147.0 L271.8,148.5 L273.6,149.8 L275.6,150.9 L277.7,151.8 L280.0,152.5 L282.4,152.9 L284.9,153.1 L287.5,153.0 L290.1,152.6 L292.7,151.9 L295.2,151.0 L297.7,149.7 L300.1,148.1 L302.3,146.2 L304.4,144.1 L306.2,141.7 L307.9,139.1 L309.2,136.2 L310.3,133.2 L311.0,130.0 L311.4,126.7 L311.4,123.3 L311.1,119.9 L310.4,116.5 L309.3,113.1 L307.8,109.8 L306.0,106.6 L303.8,103.6 L301.2,100.8 L298.3,98.2 L295.1,96.0 L291.7,94.1 L288.0,92.5 L284.1,91.3 L280.0,90.5 L275.8,90.2 L271.6,90.3 L267.3,90.8 L263.0,91.8 L258.8,93.3 L254.8,95.3 L250.9,97.7 L247.3,100.5 L243.9,103.8 L240.9,107.4 L238.2,111.4 L236.0,115.7 L234.2,120.3 L232.8,125.0 L232.0,130.0 L231.7,135.1 L231.9,140.2 L232.7,145.4 L234.1,150.4 L236.0,155.4 L238.4,160.2 L241.4,164.8 L244.8,169.0 L248.8,173.0 L253.2,176.5 L257.9,179.5 L263.1,182.1 L268.5,184.2 L274.2,185.6 L280.0,186.5 L286.0,186.8 L292.0,186.4 L298.0,185.4 L303.9,183.7 L309.7,181.4 L315.2,178.5 L320.5,174.9 L325.4,170.8 L329.8,166.2 L333.8,161.1 L337.3,155.5 L340.2,149.6 L342.5,143.3 L344.1,136.7 L345.0,130.0 L345.2,123.1 L344.7,116.3 L343.4,109.4 L341.5,102.6 L338.7,96.1 L335.3,89.8 L331.3,83.9 L326.5,78.3 L321.2,73.3 L315.3,68.8 L309.0,64.9 L302.2,61.7 L295.0,59.2 L287.6,57.5 L280.0,56.5 L272.3,56.3 L264.5,57.0 L256.8,58.5 L249.2,60.8 L241.8,63.9 L234.8,67.8 L228.2,72.4 L222.0,77.8 L216.4,83.8 L211.4,90.4 L207.2,97.6 L203.6,105.2 L200.9,113.2 L199.0,121.5 L198.0,130.0 L197.9,138.6 L198.7,147.3 L200.4,155.9 L203.0,164.3 L206.5,172.4 L210.9,180.2 L216.1,187.5 L222.1,194.3 L228.8,200.5 L236.2,205.9 L244.1,210.6 L252.6,214.5 L261.4,217.4 L270.6,219.4 L280.0,220.5 L289.5,220.6 L299.1,219.6 L308.5,217.7 L317.7,214.7 L326.7,210.8 L335.2,206.0 L343.2,200.2 L350.6,193.6 L357.3,186.2 L363.3,178.1 L368.4,169.3 L372.5,160.1 L375.7,150.3 L377.9,140.3 L379.0,130.0 L379.0,119.6 L377.9,109.2 L375.8,98.9 L372.5,88.8 L368.2,79.1 L362.8,69.8 L356.5,61.1 L349.3,53.1 L341.2,45.8 L332.3,39.4 L322.8,33.9 L312.7,29.4 L302.1,26.0 L291.2,23.7 L280.0,22.5 L268.7,22.5 L257.4,23.7 L246.3,26.1 L235.4,29.7 L224.8,34.4 L214.8,40.3 L205.4,47.2 L196.7,55.0 L188.9,63.8 L182.0,73.4 L176.1,83.7 L171.3,94.7 L167.6,106.1 L165.2,117.9 L164.0,130.0"/><text x="130" y="25" class="en">① 계획 수립</text><text x="130" y="42" class="sm en">목표·제약 정하기</text><text x="430" y="25" class="st">② 위험 분석</text><text x="430" y="42" class="sm st">위험 찾고 줄이기</text><text x="430" y="230" class="st">③ 개발과 검증</text><text x="430" y="247" class="sm st">이번 바퀴의 결과물</text><text x="130" y="230" class="en">④ 고객 평가</text><text x="130" y="247" class="sm en">다음 바퀴 계획</text><text x="280" y="272" class="sm">한 바퀴 돌 때마다 결과물이 커지고 비용이 쌓인다</text></svg><figcaption>나선형 모델. 네 단계를 한 바퀴씩 돌며 점점 커진다. 매 바퀴 개발 전에 위험 분석을 하는 것이 다른 모델과 구별되는 점이다(보엠, 1988).</figcaption></figure>
<h3>반복·점진적 개발과 애자일</h3>
<p>소프트웨어 요구사항은 사용자가 실제로 써 봐야 분명해지는 경우가 많다. 그래서 전체를 한 번에 만들지 않고, <strong>작동하는 작은 부분</strong>을 짧은 주기(1~4주)로 만들어 보여 주고 피드백을 반영한다. 2001년 애자일 선언은 "계획을 따르기보다 변화에 대응"하는 가치를 강조했다. 핵심은 의식(회의)이 아니라 <strong>피드백 주기를 짧게</strong> 해서 잘못된 방향으로 오래 가지 않는 것이다.</p>
<!--diagram-->
<p>애자일 선언의 네 가지 가치: <strong>공정과 도구보다 개인과 상호작용</strong>, 포괄적인 문서보다 작동하는 소프트웨어, 계약 협상보다 고객과의 협력, 계획을 따르기보다 변화에 대응. 오른쪽 것도 가치가 있지만 왼쪽을 더 중요하게 본다는 뜻이다.</p>
<h3>스크럼</h3>
<p>고정 길이 <strong>스프린트</strong> 단위로 일한다. 제품 책임자(Product Owner)가 우선순위가 매겨진 제품 백로그를 관리하고, 팀은 스프린트 계획에서 이번 주기의 목표를 정한다. 매일 짧게 진행 상황과 장애물을 공유하고(데일리 스크럼), 스프린트 끝에 결과물을 시연하고(리뷰) 일하는 방식을 돌아본다(회고). 스크럼 마스터는 이 과정이 잘 돌아가도록 장애물을 치운다.</p>
<h3>XP (eXtreme Programming)</h3>
<p>개발 실천 방법에 집중한 애자일 방법론이다. 5가지 가치는 <strong>의사소통, 단순성, 피드백, 용기, 존중</strong>이다.</p>
<ul>
<li><strong>짝 프로그래밍</strong>: 두 사람이 한 화면에서 함께 코드를 쓴다.</li>
<li><strong>테스트 주도 개발</strong>: 테스트를 먼저 쓰고 통과하는 코드를 쓴다.</li>
<li><strong>지속적 통합</strong>, <strong>리팩터링</strong>, <strong>작은 릴리스</strong>, <strong>단순한 설계</strong></li>
<li><strong>공동 코드 소유</strong>, <strong>코딩 표준</strong>, <strong>주 40시간 작업</strong>(지속 가능한 속도), <strong>고객 상주</strong>(현장 고객)</li>
</ul>
<h3>칸반: 흐름과 WIP 한도</h3>
<p>칸반은 주기 대신 <strong>흐름</strong>에 집중한다. 할 일 → 진행 중 → 완료 같은 보드로 일을 보이게 하고, 무엇보다 각 단계의 <strong>동시 진행 작업 수(WIP)에 한도</strong>를 둔다. 왜 일을 덜 동시에 하면 더 빨리 끝날까? 큐 이론의 <strong>리틀의 법칙</strong>에 따르면 평균 진행 중 작업 수 = 처리량 × 평균 리드타임이다. 처리량이 일정하다면 진행 중 작업이 많을수록 각 작업이 끝나기까지의 시간(리드타임)이 길어진다. 게다가 여러 일을 오가는 전환 비용 때문에 처리량 자체도 떨어진다. "시작하기를 멈추고, 끝내기를 시작하라"가 칸반의 구호다.</p>
<!--math:0-->
<!--code-->
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
    points: [
      R`폭포수: 순차, 문서 중심, 되돌아가기 어려움. 프로토타입: 견본으로 요구 확정. 나선형: 위험 분석 반복(보엠)`,
      R`애자일 가치: 개인과 상호작용, 작동하는 소프트웨어, 고객 협력, 변화 대응`,
      R`스크럼: 제품 책임자, 스크럼 마스터, 개발팀 / 스프린트, 백로그, 데일리 스크럼, 리뷰, 회고`,
      R`XP 가치: 의사소통, 단순성, 피드백, 용기, 존중. 실천: 짝 프로그래밍, TDD, CI, 리팩터링, 작은 릴리스, 공동 소유`,
      R`칸반: WIP 한도, 리틀의 법칙 L = λW`,
    ],
    interview: [
      { q: '폭포수와 애자일의 차이는요?', a: R`<p>폭포수는 요구사항부터 배포까지 단계를 한 번씩 순서대로 진행해 계획과 문서가 명확하지만, 요구사항이 틀렸을 때 마지막에야 드러난다. 애자일은 작동하는 작은 결과물을 짧은 주기로 반복해 내고 피드백을 반영하므로 변화에 강하지만, 전체 일정과 범위를 처음에 확정하기 어렵다.</p>` },
      { q: '스크럼의 역할과 이벤트를 설명해 주세요.', a: R`<p>제품 책임자는 백로그의 우선순위를 정하고, 스크럼 마스터는 과정이 잘 돌아가도록 장애물을 치우며, 개발팀은 결과물을 만든다. 스프린트 계획에서 목표를 정하고, 매일 데일리 스크럼으로 진행을 공유하고, 끝에 리뷰로 결과물을 시연하고 회고로 일하는 방식을 개선한다.</p>` },
    ],
    types: ['개발 방법론'],
    links: [
      { to: 'se-req', why: '요구사항을 언제, 얼마나 자세히 정할 것인가' },
      { to: 'se-cicd', why: '작은 변경을 자주 안전하게 배포하는 자동화' },
      { to: 'se-test', why: '짧은 주기를 가능하게 하는 자동화된 테스트' },
      { to: 'os-sched', why: '작업 전환 비용 — 운영체제의 문맥 교환과 같은 원리' },
      { to: 'ai-mlops', why: 'ML 프로젝트의 반복 실험과 배포 주기' },
    ],
    quiz: [
      { q: '폭포수 모델이 실패하기 쉬운 상황은?',
        options: ['규제·계약으로 요구사항이 처음부터 고정된 시스템', '써 봐야 원하는 것이 분명해지는, 요구사항이 불확실한 서비스', '하드웨어와 함께 납품해 일정이 정해진 임베디드 시스템', '같은 시스템을 여러 번 만들어 본 경험이 있는 팀의 프로젝트'], answer: 1,
        explain: '폭포수는 "처음에 요구사항을 정확히 안다"는 전제 위에 있다. 전제가 틀리면 문제가 마지막 단계에서야 드러나 비용이 커진다.' },
      { q: '칸반에서 WIP(진행 중 작업) 한도를 두면 리드타임이 줄어드는 이유는?',
        options: ['한도를 넘으면 작업이 자동으로 쪼개져 작업 하나의 크기가 작아지기 때문', '처리량이 같다면 진행 중 작업이 적을수록 평균 리드타임이 짧아지기 때문', '진행 중 작업이 적으면 팀원 한 명당 처리 속도가 두 배 가까이 오르기 때문', '한도를 두면 우선순위가 낮은 작업이 보드에서 자동으로 제거되기 때문'], answer: 1,
        explain: '리틀의 법칙(L = λW): 처리량(λ)이 같다면 진행 중 작업 수(L)가 적을수록 평균 리드타임(W)이 짧아진다. 작업 전환 비용도 준다. 열 가지 일을 동시에 하면 열 가지 모두 늦게 끝난다. 한도는 "새로 시작하기 전에 하던 것을 끝내라"는 압력을 만든다.' },
      { q: '애자일의 핵심을 가장 잘 설명한 것은?',
        options: ['계획과 문서를 최소화하고 개발자가 원하는 대로 바로 구현하는 것', '스프린트·데일리 스크럼 같은 정해진 회의를 빠짐없이 지키는 것', '짧은 주기로 작동하는 결과물을 만들어 피드백을 받고 계획을 조정하는 것', '전체 요구사항을 미리 확정한 뒤 작은 단위로 나눠 순서대로 만드는 것'], answer: 2,
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
<!--math:0-->
<!--code-->
<p>기능 요구사항은 <strong>인수 기준</strong>으로 구체화한다. "Given(전제) – When(행동) – Then(기대 결과)" 형식으로 쓰면 그대로 테스트 시나리오가 되고, 경계 조건(쿠폰 금액이 결제 금액보다 크면?)이 드러난다.</p>
<p>요구사항 개발은 <strong>도출</strong>(수집) → <strong>분석</strong>(충돌·누락 정리) → <strong>명세</strong>(문서화) → <strong>확인</strong>(검토로 맞는지 검증) 순서로 진행한다.</p>
<h3>요구사항을 얻는 방법</h3>
<p>인터뷰, 관찰, 기존 시스템 분석, 프로토타입. 사용자는 해결책("엑셀 내보내기 버튼")을 말하는 경우가 많으므로, 그 뒤의 <strong>진짜 문제</strong>("월말 정산 자료를 회계팀에 보내야 한다")를 찾는 것이 중요하다. 애자일에서는 "사용자로서, ~하기 위해, ~하고 싶다" 형식의 <strong>사용자 스토리</strong>로 가치 중심으로 쓰고, 상세는 구현 직전에 대화로 채운다.</p>
<h3>구조적 분석 도구</h3>
<p>객체지향 이전의 <strong>구조적 분석</strong>은 데이터가 시스템 안에서 어떻게 흐르고 변환되는지를 그린다.</p>
<figure class="diagram"><svg viewBox="0 0 560 190" width="560"><rect class="n" x="20" y="70" width="90" height="40" rx="4"/><text x="65.0" y="90.0">고객</text><circle class="h" cx="230" cy="90" r="42"/><text x="230" y="82" class="sm">1.0</text><text x="230" y="98">주문 접수</text><circle class="h" cx="420" cy="90" r="42"/><text x="420" y="82" class="sm">2.0</text><text x="420" y="98">결제 처리</text><path class="e" d="M180,160 H280 M180,184 H280"/><text x="230" y="172">주문 파일</text><path class="a" d="M112,84 L186,84"/><text x="148" y="72" class="sm">주문 정보</text><path class="a" d="M273,90 H376"/><text x="324" y="78" class="sm">주문 내역</text><path class="a" d="M230,133 V158"/><text x="222" y="146" class="sm en">저장</text><path class="a" d="M420,133 C420,170 120,170 66,112"/><text x="470" y="150" class="sm st">영수증</text><text x="500" y="40" class="sm">○ 프로세스</text><text x="500" y="56" class="sm">→ 자료 흐름</text><text x="500" y="72" class="sm">═ 자료 저장소</text><text x="500" y="88" class="sm">□ 단말(외부)</text></svg><figcaption>DFD(자료 흐름도). 고객이 보낸 주문 정보가 주문 접수 프로세스를 거쳐 저장소에 기록되고 결제 처리로 넘어간다. 프로세스는 원, 흐름은 화살표, 저장소는 평행선, 외부 개체는 사각형으로 그린다.</figcaption></figure>
<ul>
<li><strong>DFD</strong>(자료 흐름도): 프로세스(원), 자료 흐름(화살표), 자료 저장소(평행선), 단말(사각형) 네 가지로 그린다. 제어 흐름(조건, 반복)은 그리지 않는다. 큰 프로세스를 하위 DFD로 나눠 단계적으로 자세히 그린다(0레벨 → 1레벨).</li>
<li><strong>자료 사전</strong>(DD): DFD에 나온 자료를 기호로 정의한다. <code>=</code> 정의, <code>+</code> 연결, <code>[ | ]</code> 선택, <code>{ }</code> 반복, <code>( )</code> 생략 가능, <code>* *</code> 주석. 예: 주문 = 주문번호 + {상품 + 수량} + (메모).</li>
<li><strong>소단위 명세서</strong>(미니 스펙): 가장 작은 프로세스가 하는 일을 구조적 언어, 의사결정표 등으로 쓴다.</li>
<li><strong>ERD</strong>(데이터 구조), <strong>STD</strong>(상태 전이도, 시간에 따른 동작)도 함께 쓴다.</li>
</ul>
<h3>객체지향 분석 방법론</h3>
<ul>
<li><strong>럼바우(OMT)</strong>: <strong>객체 모델링</strong>(객체와 관계, 객체 다이어그램) → <strong>동적 모델링</strong>(상태 다이어그램) → <strong>기능 모델링</strong>(DFD) 순서로 분석한다. "객동기"로 외운다.</li>
<li><strong>부치(Booch)</strong>: 미시적·거시적 개발 프로세스를 함께 쓴다. <strong>제이콥슨</strong>: 유스케이스 중심. <strong>코드-요든</strong>: E-R 다이어그램 중심. <strong>워프스-브록</strong>: 분석과 설계를 구분하지 않는다.</li>
</ul>
<h3>모델링: 그림으로 합의하기</h3>
<p>UML은 소프트웨어를 여러 관점에서 그리는 표준 표기법이다. 모든 다이어그램을 그릴 필요는 없고, 의사소통에 도움이 되는 것만 쓴다.</p>
<ul>
<li><strong>유스케이스 다이어그램</strong>: 누가(액터) 시스템으로 무엇을 하는가. 범위 합의에 좋다.</li>
<li><strong>클래스 다이어그램</strong>: 개념과 그 관계(연관, 상속, 다중성). 도메인 용어를 맞추는 데 유용하다.</li>
<li><strong>시퀀스 다이어그램</strong>: 객체·서비스 사이 메시지의 시간 순서. API 연동 설계에 좋다.</li>
<li><strong>상태 다이어그램</strong>: 주문(생성→결제→배송→완료/취소)처럼 상태 전이가 핵심인 개념.</li>
</ul>
<h3>추적성</h3>
<p>각 요구사항이 어떤 설계, 코드, 테스트로 이어지는지 연결해 두면, 요구사항이 바뀔 때 영향 범위를 알 수 있고 모든 요구사항이 검증되었는지 확인할 수 있다. 요구사항 단계와 테스트 단계를 짝지은 V 모델이 이 관계를 보여 준다.</p>
<!--diagram-->`,
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
    points: [
      R`기능 요구사항 = 무엇을 하는가 / 비기능 = 얼마나 잘(성능, 보안, 가용성, 사용성)`,
      R`요구사항 개발: 도출 → 분석 → 명세 → 확인`,
      R`DFD 구성: 프로세스(원), 자료 흐름(화살표), 자료 저장소(평행선), 단말(사각형). 제어 흐름은 없음`,
      R`자료 사전: = 정의, + 연결, [ | ] 선택, { } 반복, ( ) 생략, * * 주석`,
      R`럼바우 OMT: 객체 → 동적 → 기능 모델링 (객동기)`,
      R`가용성 99.9% = 월 약 43분, 99.99% = 약 4분 다운타임`,
    ],
    interview: [
      { q: '기능 요구사항과 비기능 요구사항의 차이는요?', a: R`<p>기능 요구사항은 시스템이 무엇을 하는지, 예를 들어 회원이 쿠폰을 적용해 결제할 수 있다는 것이다. 비기능 요구사항은 그것을 얼마나 잘 하는지로, 응답 시간, 가용성, 보안, 확장성 같은 품질 속성이다. 비기능 요구사항은 측정 가능한 숫자로 써야 검증할 수 있고 아키텍처를 크게 좌우한다.</p>` },
    ],
    types: ['요구사항'],
    links: [
      { to: 'se-test', why: '인수 기준은 그대로 인수 테스트가 된다' },
      { to: 'se-process', why: '요구사항을 미리 확정하는 방식 vs 반복으로 발견하는 방식' },
      { to: 'ml-metrics', why: '평균이 아니라 분포(p95)를 보라 — 지표 선택의 문제' },
      { to: 'net-http', why: '응답 시간·가용성 요구사항이 걸리는 대상' },
      { to: 'os-process', why: '상태 다이어그램의 예: 프로세스 상태 전이' },
    ],
    quiz: [
      { q: '"시스템은 빠르게 응답해야 한다"를 검증 가능한 요구사항으로 바꾼 것으로 가장 적절한 것은?',
        options: ['"시스템은 사용자가 불편을 느끼지 않을 만큼 빠르게 응답해야 한다"', '"정상 부하에서 요청의 95%가 300ms 이내에 응답해야 한다"', '"시스템은 평균 응답 시간이 짧은 최신 서버 위에서 동작해야 한다"', '"모든 요청은 가능한 한 빨리, 늦어도 몇 초 안에 응답해야 한다"'], answer: 1,
        explain: '측정 방법과 기준이 있어야 만족 여부를 판단할 수 있다. 평균만 쓰면 일부 사용자가 겪는 매우 느린 응답이 가려지므로 백분위수를 쓴다.' },
      { q: '가용성 99.9%인 서비스 세 개에 모두 의존하는 기능의 가용성은?',
        options: ['99.9% — 세 서비스의 가용성이 모두 같으므로', '약 99.7% — 직렬 의존은 각 가용성의 곱이므로', '약 99.99% — 셋 중 하나만 살아 있으면 되므로', '약 99.8% — 가장 낮은 두 서비스의 곱이므로'], answer: 1,
        explain: '0.999³ ≈ 0.997. 의존이 늘어날수록 전체 가용성은 떨어지므로, 중요한 경로에는 재시도·대체 경로·캐시 같은 대책이 필요하다.' },
      { q: '인수 기준을 Given-When-Then 형식으로 쓰는 가장 큰 이점은?',
        options: ['형식이 정해져 있어 요구사항 문서의 분량이 크게 줄어든다', '전제·행동·결과가 명확해 그대로 테스트가 되고 빠진 경우가 드러난다', '개발자가 직접 기준을 써서 구현 가능한 범위로 요구를 조정할 수 있다', '자연어로 쓰므로 비기능 요구사항까지 모두 같은 형식으로 담을 수 있다'], answer: 1,
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
<p>외부 결합은 모듈들이 외부에서 정한 자료 형식, 통신 규약, 장치 인터페이스를 함께 쓰는 경우로, 제어 결합과 공통 결합 사이에 온다.</p>
<p>의존의 <strong>방향</strong>도 중요하다. 순환 의존(A → B → A)이 생기면 둘은 사실상 하나의 모듈이 되어 따로 이해·테스트·배포할 수 없다. 의존은 자주 바뀌는 것에서 안정된 것 쪽으로 흐르게 한다. 많은 모듈이 의존하는 모듈일수록 안정적이어야 하고(바꾸면 영향이 크므로), 이를 추상화로 보장하는 것이 의존성 역전 원칙이다.</p>
<h3>응집도: 모듈 내부의 집중도</h3>
<p>응집도가 높은 모듈은 내부 요소들이 하나의 목적을 위해 함께 일한다. 낮은 순서로 우연적(그냥 모아 둔 utils), 논리적(비슷한 종류라서 — 모든 입력 처리), 시간적(같은 시점에 실행 — 초기화 코드 모음), 절차적, 교환적(같은 데이터를 다룸), 순차적, <strong>기능적</strong>(하나의 기능을 위해 필요한 것만 — 가장 바람직)으로 나눈다. 이름을 붙이기 어렵거나 "~와 ~ 관리자"처럼 "와"가 들어가는 모듈은 응집도가 낮다는 신호다.</p>
<figure class="diagram"><svg viewBox="0 0 560 170" width="560"><text x="20" y="20" class="st">결합도</text><text x="540" y="20" class="sm en">약함(좋음) → 강함(나쁨)</text><rect class="h" x="20" y="32" width="81" height="30" rx="4"/><text x="60.5" y="47.0">자료</text><rect class="n" x="107" y="32" width="81" height="30" rx="4"/><text x="147.5" y="47.0">스탬프</text><rect class="n" x="194" y="32" width="81" height="30" rx="4"/><text x="234.5" y="47.0">제어</text><rect class="n" x="281" y="32" width="81" height="30" rx="4"/><text x="321.5" y="47.0">외부</text><rect class="n" x="368" y="32" width="81" height="30" rx="4"/><text x="408.5" y="47.0">공통</text><rect class="g" x="455" y="32" width="81" height="30" rx="4"/><text x="495.5" y="47.0">내용</text><text x="20" y="100" class="st">응집도</text><text x="540" y="100" class="sm en">약함(나쁨) → 강함(좋음)</text><rect class="g" x="20" y="112" width="69" height="30" rx="4"/><text x="54.5" y="127.0">우연적</text><rect class="n" x="95" y="112" width="69" height="30" rx="4"/><text x="129.5" y="127.0">논리적</text><rect class="n" x="170" y="112" width="69" height="30" rx="4"/><text x="204.5" y="127.0">시간적</text><rect class="n" x="245" y="112" width="69" height="30" rx="4"/><text x="279.5" y="127.0">절차적</text><rect class="n" x="320" y="112" width="69" height="30" rx="4"/><text x="354.5" y="127.0">교환적</text><rect class="n" x="395" y="112" width="69" height="30" rx="4"/><text x="429.5" y="127.0">순차적</text><rect class="h" x="470" y="112" width="69" height="30" rx="4"/><text x="504.5" y="127.0">기능적</text></svg><figcaption>결합도와 응집도의 순서. 결합도는 왼쪽(자료)일수록, 응집도는 오른쪽(기능적)일수록 바람직하다. 시험에는 이 순서가 그대로 나온다.</figcaption></figure>
<h3>둘은 함께 움직인다</h3>
<p>관련된 것을 한곳에 모으면(응집도↑) 모듈 사이에서 오갈 일이 줄어든다(결합도↓). 반대로 하나의 기능이 여러 모듈에 흩어져 있으면 그 기능을 바꿀 때 여러 모듈을 함께 고쳐야 한다(산탄총 수술).</p>
<!--diagram-->
<p>모듈 구조를 볼 때는 <strong>팬인</strong>(나를 호출하는 상위 모듈 수)과 <strong>팬아웃</strong>(내가 호출하는 하위 모듈 수)도 본다. 팬인이 높으면 재사용이 잘 되는 모듈이고, 팬아웃이 너무 높으면 하는 일이 많다는 신호라 나눌지 검토한다. 좋은 설계는 팬인을 높이고 팬아웃을 줄인다.</p>
<!--math:0-->
<!--code-->
<h3>다른 원칙들</h3>
<ul>
<li><strong>관심사의 분리</strong>: UI, 비즈니스 규칙, 데이터 접근처럼 바뀌는 이유가 다른 것을 나눈다(계층형 아키텍처, MVC).</li>
<li><strong>DRY</strong>: 같은 <strong>지식</strong>을 두 곳에 두지 않는다. 단, 생긴 것만 비슷하고 바뀌는 이유가 다른 코드를 억지로 합치면 오히려 결합도가 올라간다.</li>
<li><strong>KISS·YAGNI</strong>: 지금 필요한 만큼 단순하게. 미래를 대비한 추상화도 비용이다.</li>
<li><strong>디미터 법칙</strong>: 친구의 친구에게 말 걸지 않는다. <code>order.customer.address.city</code>처럼 줄줄이 따라가면 그 경로의 모든 구조에 결합된다.</li>
</ul>`,
    analogy: R`<p>잘 정리된 주방. 칼·도마는 조리대에, 그릇은 찬장에, 양념은 가스레인지 옆에(높은 응집도: 함께 쓰는 것끼리). 조리대와 찬장 사이에는 "완성된 요리를 접시에 담는다"는 단순한 약속만 있다(낮은 결합도). 반대로 양념 하나를 꺼내려면 찬장 문을 열고 그릇을 치워야 하는 주방은, 한 곳을 정리하면 다른 곳이 엉망이 된다.</p>`,
    diagram: { caption: '왼쪽: 기능이 흩어져 모듈 사이에 의존이 얽힌 구조(높은 결합도·낮은 응집도). 오른쪽: 관련 요소를 모으고 모듈 사이에는 좁은 인터페이스만 둔 구조.', svg: R`
<svg viewBox="0 0 560 218" width="560">
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
    points: [
      R`좋은 설계 = 결합도 ↓, 응집도 ↑`,
      R`결합도(좋음 → 나쁨): 자료 → 스탬프 → 제어 → 외부 → 공통 → 내용`,
      R`응집도(나쁨 → 좋음): 우연적 → 논리적 → 시간적 → 절차적 → 교환적 → 순차적 → 기능적`,
      R`내용 결합 = 다른 모듈 내부를 직접 참조·수정. 공통 결합 = 전역 데이터 공유`,
      R`팬인 ↑(재사용), 팬아웃 ↓. 정보 은닉: 바뀔 설계 결정을 모듈 안에 숨김`,
    ],
    interview: [
      { q: '결합도와 응집도를 설명해 주세요.', a: R`<p>결합도는 모듈 사이에 의존하는 정도로, 낮을수록 한 모듈을 바꿀 때 다른 모듈이 영향을 덜 받는다. 응집도는 모듈 안의 요소들이 하나의 목적에 집중하는 정도로, 높을수록 이해하고 바꾸기 쉽다. 관련된 것을 한곳에 모으면 응집도가 오르면서 결합도도 함께 내려간다.</p>` },
      { q: '전역 변수를 피하라는 이유는요?', a: R`<p>여러 모듈이 같은 전역 데이터를 읽고 쓰면 공통 결합이 되어, 누가 언제 값을 바꿨는지 추적하기 어렵고 한 곳의 변경이 예측하지 못한 곳에 영향을 준다. 모듈을 따로 테스트하기도 어렵다. 필요한 값은 인자로 주고받는 자료 결합이 바람직하다.</p>` },
    ],
    types: ['모듈 설계'],
    links: [
      { to: 'pl-solid', why: '단일 책임·의존성 역전 — 결합도와 응집도를 다루는 구체적 원칙' },
      { to: 'net-layers', why: '네트워크 계층화: 계층 간 좁은 인터페이스의 대표 사례' },
      { to: 'se-pattern', why: '결합도를 낮추는 반복되는 설계 해법' },
      { to: 'se-refactor', why: '높은 결합도·낮은 응집도를 개선하는 작업' },
      { to: 'ds-graph', why: '모듈 의존 관계는 방향 그래프 — 순환 탐지' },
    ],
    quiz: [
      { q: '여러 모듈이 같은 전역 설정 딕셔너리를 직접 읽고 수정하는 구조의 문제는?',
        options: ['딕셔너리 조회가 반복되어 실행 속도가 눈에 띄게 느려진다', '공통 결합: 누가 언제 바꿨는지 추적하기 어렵고 변경이 번진다', '모듈마다 설정을 복사해 두게 되어 메모리 사용량이 늘어난다', '설정이 한 곳에 모여 있어 응집도가 지나치게 높아진다'], answer: 1,
        explain: '필요한 값만 인자로 전달하거나(자료 결합), 설정을 읽기 전용으로 한 곳에서 주입하는 방식이 낫다.' },
      { q: '"UserAndOrderAndEmailManager" 같은 클래스 이름이 암시하는 것은?',
        options: ['관련 기능이 한곳에 모인 높은 응집도', '서로 다른 목적이 섞인 낮은 응집도', '다른 클래스를 모르는 낮은 결합도', '여러 클래스를 감싼 퍼사드 패턴'], answer: 1,
        explain: '하나의 이름으로 설명하기 어렵다면 책임이 여러 개라는 신호다. 목적별로 나누면 각각 응집도가 높아지고 서로의 결합은 좁은 인터페이스로 줄어든다.' },
      { q: '모듈 A와 B가 서로를 import하는 순환 의존의 문제는?',
        options: ['Python은 순환 import를 감지하면 둘 중 하나를 자동으로 무시한다', '둘을 따로 이해·테스트·배포할 수 없어 사실상 하나의 큰 모듈이 된다', '두 모듈이 서로의 사본을 하나씩 더 만들어 메모리를 두 배로 쓴다', '순환이 있으면 두 모듈의 응집도가 높아져 기능을 나누기 어려워진다'], answer: 1,
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
<table><tr><th>분류</th><th>목적</th><th>패턴 (GoF 23개)</th></tr>
<tr><td>생성 (5)</td><td>객체를 만드는 방법을 감춤</td><td>추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, 싱글턴</td></tr>
<tr><td>구조 (7)</td><td>클래스·객체를 조합해 더 큰 구조</td><td>어댑터, 브리지, 컴포지트, 데코레이터, 퍼사드, 플라이웨이트, 프록시</td></tr>
<tr><td>행위 (11)</td><td>객체 사이 책임 분배와 통신</td><td>책임 연쇄, 커맨드, 인터프리터, 반복자, 중재자, 메멘토, 옵저버, 상태, 전략, 템플릿 메서드, 방문자</td></tr></table>
<h3>행위 패턴</h3>
<ul>
<li><strong>전략(Strategy)</strong>: 알고리즘을 객체(또는 함수)로 분리해 실행 중에 바꿔 끼운다. 할인 정책, 정렬 기준, 최적화 알고리즘. Python에서는 함수를 넘기는 것으로 충분한 경우가 많다(<code>sorted(key=...)</code>가 전략 패턴이다).</li>
<li><strong>옵저버(Observer)</strong>: 어떤 객체의 상태 변화를 여러 객체가 구독해 통지받는다. 발행자는 구독자가 누구인지 몰라도 된다(결합도↓). GUI 이벤트, 이벤트 버스, 딥러닝 학습 루프의 콜백(에폭이 끝나면 로깅·체크포인트·조기 종료)이 이 구조다.</li>
<li><strong>템플릿 메서드</strong>: 알고리즘의 뼈대는 상위 클래스가 정하고 일부 단계만 하위 클래스가 채운다. 프레임워크의 기본 구조(PyTorch Lightning의 <code>training_step</code>).</li>
<li>그 밖에 <strong>상태</strong>(상태마다 객체를 두고 상태에 따라 동작을 바꿈), <strong>커맨드</strong>(요청을 객체로 만들어 실행 취소·대기열 가능), <strong>반복자</strong>(내부 구조를 드러내지 않고 차례로 접근), <strong>중재자</strong>(객체끼리 직접 말하지 않고 중재자를 거침), <strong>책임 연쇄</strong>(처리할 수 있는 객체를 만날 때까지 요청을 넘김), <strong>방문자</strong>(구조는 그대로 두고 새 연산 추가)가 자주 나온다.</li>
</ul>
<!--diagram-->
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
<li><strong>프록시</strong>: 대리 객체가 접근을 통제하거나 실제 객체 생성을 늦춘다(지연 로딩, 원격 프록시). <strong>브리지</strong>: 기능 계층과 구현 계층을 분리해 따로 확장한다. <strong>플라이웨이트</strong>: 공유할 수 있는 상태를 나눠 쓰는 객체 수를 줄인다.</li>
</ul>
<h3>패턴의 함정</h3>
<p>패턴은 문제가 있을 때의 해법이지, 미리 적용할 체크리스트가 아니다. 구현이 하나뿐인데 팩토리와 인터페이스를 겹겹이 쌓으면 코드만 읽기 어려워진다. 또 많은 GoF 패턴은 일급 함수가 없는 언어의 한계를 보완하려고 나온 것이라, Python에서는 함수·클로저·딕셔너리로 훨씬 간단하게 표현된다.</p>
<!--code-->`,
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
    points: [
      R`생성 5: 추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, 싱글턴`,
      R`구조 7: 어댑터, 브리지, 컴포지트, 데코레이터, 퍼사드, 플라이웨이트, 프록시`,
      R`행위 11: 책임 연쇄, 커맨드, 인터프리터, 반복자, 중재자, 메멘토, 옵저버, 상태, 전략, 템플릿 메서드, 방문자`,
      R`싱글턴: 인스턴스 하나, 생성자 private. 어댑터: 인터페이스 변환. 옵저버: 상태 변화 자동 통지`,
      R`전략: 알고리즘 교체. 데코레이터: 기능 덧붙이기. 퍼사드: 단순한 진입점`,
    ],
    interview: [
      { q: '싱글턴 패턴의 장단점은요?', a: R`<p>인스턴스를 하나만 만들어 설정이나 커넥션 풀처럼 공유해야 하는 자원을 한곳에서 관리할 수 있다. 하지만 사실상 전역 상태라 결합도가 높아지고, 테스트에서 가짜로 바꾸기 어려우며, 멀티스레드 환경에서는 생성 시점의 동기화도 신경 써야 한다.</p>` },
      { q: '전략 패턴과 템플릿 메서드 패턴의 차이는요?', a: R`<p>둘 다 알고리즘의 바뀌는 부분을 분리한다. 전략 패턴은 알고리즘 전체를 별도 객체로 만들어 조합으로 실행 중에 바꿔 끼우고, 템플릿 메서드는 상위 클래스가 뼈대를 정하고 일부 단계를 하위 클래스가 상속으로 채운다. 조합 방식인 전략이 더 유연하다.</p>` },
    ],
    types: ['디자인 패턴'],
    links: [
      { to: 'pl-oop', why: '다형성과 조합 — 패턴들의 공통 기반' },
      { to: 'pl-solid', why: '개방-폐쇄·의존성 역전을 구현하는 구체적 방법' },
      { to: 'pl-decorator', why: 'Python 함수 데코레이터와 데코레이터 패턴' },
      { to: 'se-principle', why: '패턴의 목적: 결합도를 낮추고 변경을 국지화' },
      { to: 'dl-mlp', why: '신경망 모듈 구성(레이어를 담는 레이어)은 컴포지트 구조' },
    ],
    quiz: [
      { q: '할인 정책이 자주 추가·변경되어 checkout 함수의 if-elif가 계속 길어진다. 적절한 패턴은?',
        options: ['싱글턴 — 할인 계산기를 하나만 만들어 전역에서 공유한다', '전략 — 할인 정책을 같은 인터페이스의 객체로 분리해 호출만 한다', '퍼사드 — 할인 관련 함수들을 한 클래스 뒤에 숨겨 단순화한다', '데코레이터 — checkout 함수를 감싸 할인 조건을 if-elif로 추가한다'], answer: 1,
        explain: '새 정책은 새 전략을 추가하는 것으로 끝나고 checkout은 수정하지 않는다(개방-폐쇄 원칙).' },
      { q: '딥러닝 학습 루프에서 "에폭이 끝나면 로깅, 체크포인트 저장, 조기 종료 판단"을 콜백으로 등록하는 구조는 어떤 패턴인가?',
        options: ['어댑터 — 서로 다른 인터페이스를 학습 루프에 맞게 변환한다', '옵저버 — 학습 루프는 이벤트만 알리고, 등록된 구독자가 반응한다', '템플릿 메서드 — 학습 루프의 각 단계를 하위 클래스가 재정의한다', '빌더 — 로깅·저장·종료 설정을 단계별로 조립해 루프를 만든다'], answer: 1,
        explain: '학습 루프 코드를 고치지 않고 새로운 콜백을 추가할 수 있다. Keras callbacks, Lightning callbacks가 이 구조다. 템플릿 메서드는 상속으로 단계를 바꾸는 방식이라 여러 기능을 동시에 끼우기 어렵다.' },
      { q: '싱글턴 패턴을 신중히 써야 하는 이유는?',
        options: ['인스턴스를 하나만 만들기 위해 매번 락을 잡아 성능이 크게 떨어져서', '사실상 전역 상태라 숨은 의존이 생기고, 테스트에서 바꾸거나 초기화하기 어려워서', '프로세스마다 인스턴스가 하나씩 생겨 멀티스레드에서 값이 달라지기 때문', 'Python 모듈은 이미 싱글턴이라 클래스로 만들면 인스턴스가 두 개 생겨서'], answer: 1,
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
<li><strong>경계값 분석</strong>: 버그는 경계에 몰린다(<code>&gt;</code>와 <code>&gt;=</code>의 혼동, off-by-one). 경계 바로 아래·경계·바로 위(49,999 / 50,000 / 50,001)를 시험한다. 입력 범위가 1~100이면 0, 1, 2, 99, 100, 101이다.</li>
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
<!--diagram-->
<h3>테스트 대역</h3>
<p>외부 API, 시간, 난수, 결제처럼 느리거나 통제할 수 없는 의존성은 가짜로 바꿔 끼운다. 정해진 값을 돌려주는 <strong>스텁</strong>, 호출 여부와 인자를 검증하는 <strong>목(mock)</strong>, 메모리 DB처럼 간단히 동작하는 <strong>페이크</strong>가 있다. 의존성을 인자로 주입하는 설계(의존성 역전)여야 쉽게 바꿔 끼울 수 있다. 목을 과하게 쓰면 구현 세부에 테스트가 묶여, 동작은 그대로인데 리팩터링할 때마다 테스트가 깨진다.</p>
<!--code-->
<h3>좋은 단위 테스트의 성질</h3>
<p>빠르고(Fast), 서로 독립적이며(Independent), 언제 어디서나 같은 결과를 내고(Repeatable), 결과를 스스로 판정하고(Self-validating), 적시에 작성된다(Timely) — FIRST. 하나의 테스트는 하나의 동작을 검증하고, 이름만 보고도 무엇이 깨졌는지 알 수 있어야 한다.</p>
<h3>TDD와 더 나은 테스트</h3>
<p><strong>TDD</strong>는 실패하는 테스트를 먼저 쓰고(Red), 통과시킬 최소한의 코드를 쓰고(Green), 구조를 다듬는(Refactor) 짧은 주기를 반복한다. 테스트하기 쉬운 설계를 강제하는 효과가 있다. <strong>속성 기반 테스트</strong>는 구체적인 예 대신 "어떤 입력이든 결과는 항상 0 또는 3,000"처럼 성질을 쓰고 무작위 입력을 대량 생성해 검사한다(Python의 Hypothesis). <strong>뮤테이션 테스트</strong>는 코드에 일부러 작은 버그(<code>&gt;=</code> → <code>&gt;</code>)를 심어 테스트가 잡아내는지 확인해 테스트의 품질을 잰다.</p>
<!--math:0-->
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
    points: [
      R`블랙박스(명세 기반): 동등 분할, 경계값 분석, 결정 테이블, 원인-결과 그래프, 상태 전이, 오류 예측`,
      R`화이트박스(구조 기반): 기초 경로, 제어 흐름(구문·결정·조건 커버리지), 데이터 흐름, 루프 검사`,
      R`경계값: 범위 1~100 → 0, 1, 2, 99, 100, 101`,
      R`테스트 피라미드: 단위(많이) → 통합 → E2E(적게)`,
      R`테스트 대역: 스텁(정해진 값), 목(호출 검증), 페이크(간단한 실제 구현). TDD: Red → Green → Refactor`,
    ],
    interview: [
      { q: '블랙박스 테스트와 화이트박스 테스트의 차이는요?', a: R`<p>블랙박스는 내부 코드를 보지 않고 명세만으로 입력과 기대 출력을 정해 시험하며, 동등 분할과 경계값 분석이 대표적이다. 화이트박스는 코드의 분기와 경로를 보고 모든 문장이나 분기가 실행되도록 테스트를 설계하며, 커버리지로 충분한지 잰다.</p>` },
      { q: '단위 테스트에서 목(mock)은 왜 쓰나요?', a: R`<p>외부 API, DB, 시간처럼 느리거나 통제할 수 없는 의존성을 가짜로 바꿔 테스트를 빠르고 반복 가능하게 만들기 위해서다. 다만 목을 과하게 쓰면 구현 세부에 테스트가 묶여 리팩터링할 때마다 깨지므로, 경계에 있는 외부 의존성 위주로 쓴다.</p>` },
    ],
    types: ['테스트'],
    links: [
      { to: 'se-req', why: '인수 기준(Given-When-Then)이 인수 테스트가 된다' },
      { to: 'pl-solid', why: '의존성 주입이 테스트 대역을 가능하게 한다' },
      { to: 'se-refactor', why: '테스트는 동작을 바꾸지 않았음을 보장하는 안전망' },
      { to: 'se-cicd', why: '모든 변경마다 테스트를 자동 실행하는 파이프라인' },
      { to: 'ml-cv', why: 'ML의 평가도 "보지 않은 데이터로 시험"한다는 같은 원리' },
    ],
    quiz: [
      { q: '"5만 원 이상 무료 배송" 규칙에서 >= 를 > 로 잘못 쓴 버그를 잡을 수 있는 테스트 입력은?',
        options: ['10,000원', '100,000원', '50,000원', '49,000원'], answer: 2,
        explain: '경계에서 멀리 떨어진 값은 두 구현 모두 같은 답을 낸다. 경계값 분석이 중요한 이유다.' },
      { q: '테스트 피라미드에서 E2E 테스트를 가장 적게 두는 이유는?',
        options: ['E2E 테스트는 내부 로직을 보지 않아 버그를 거의 찾지 못하기 때문', '느리고 비싸며 환경 탓에 불안정하고, 실패해도 원인을 좁히기 어렵기 때문', 'E2E 테스트는 사람이 직접 화면을 눌러야 해서 자동화할 수 없기 때문', '단위 테스트를 충분히 쓰면 E2E 테스트가 찾을 버그가 남지 않기 때문'], answer: 1,
        explain: '대부분의 로직은 빠른 단위 테스트로 검증하고, E2E는 핵심 사용자 흐름이 연결되어 동작하는지만 확인한다.' },
      { q: '코드 커버리지 100%가 테스트 품질을 보장하지 못하는 이유는?',
        options: ['커버리지 도구가 분기 안쪽의 실행 여부는 측정하지 못하기 때문', '줄이 실행됐다는 뜻일 뿐, 결과를 단언했는지·중요 입력을 시험했는지는 모르기 때문', '100%를 맞추려면 실제 코드 대신 목(mock)만 실행하게 되기 때문', '커버리지는 테스트 코드 자체의 줄까지 세어 실제보다 높게 나오기 때문'], answer: 1,
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
<!--math:0-->
<!--code-->
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
<!--diagram-->
<h3>형상 관리</h3>
<p>Git 같은 버전 관리는 더 넓은 <strong>소프트웨어 형상 관리</strong>(SCM)의 일부다. 형상 관리는 소스 코드뿐 아니라 요구사항 명세, 설계 문서, 테스트 자료 같은 모든 산출물의 변경을 체계적으로 관리한다. 개발 비용을 줄이는 활동이 아니라 변경을 <strong>추적·통제</strong>하는 활동이다.</p>
<table><tr><th>활동</th><th>내용</th></tr>
<tr><td>형상 식별</td><td>관리할 항목을 정하고 이름·버전을 붙인다</td></tr>
<tr><td>형상 통제</td><td>변경 요청을 검토·승인해 <strong>기준선</strong>(베이스라인, 공식 승인된 버전)에 반영한다. 형상 통제 위원회(CCB)가 결정</td></tr>
<tr><td>형상 감사</td><td>기준선이 요구사항대로 바르게 변경되었는지 검토한다</td></tr>
<tr><td>형상 기록(상태 보고)</td><td>변경 내용과 상태를 기록하고 보고한다</td></tr></table>
<p>버전 관리 도구는 공유 폴더 방식(RCS, SCCS), 클라이언트-서버 방식(CVS, SVN), 분산 저장소 방식(Git)으로 나뉜다. 용어: 체크아웃(저장소에서 가져오기), 체크인·커밋(변경 반영), 동기화(최신 버전으로 맞추기).</p>
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
    points: [
      R`Git 객체: blob(내용), tree(디렉터리), commit(tree + 부모 + 메시지). ID = 내용의 해시`,
      R`브랜치·HEAD = 커밋을 가리키는 포인터. 작업 디렉터리 → (add) 스테이징 → (commit) 저장소`,
      R`merge: 병합 커밋, 이력 보존 / rebase: 커밋 재적용, 일직선, 공유한 커밋에는 금지`,
      R`형상 관리 활동: 식별 → 통제 → 감사 → 기록. 기준선(베이스라인), CCB`,
      R`버전 관리 방식: 공유 폴더(RCS), 클라이언트-서버(CVS, SVN), 분산(Git)`,
    ],
    interview: [
      { q: 'merge와 rebase의 차이는요?', a: R`<p>merge는 두 브랜치의 공통 조상을 기준으로 합친 병합 커밋을 만들어 실제 이력을 그대로 남긴다. rebase는 내 커밋들을 상대 브랜치 끝에 다시 적용해 새 커밋을 만들므로 이력이 일직선이 되지만 해시가 바뀐다. 그래서 이미 공유한 커밋에는 rebase를 쓰지 않는다.</p>` },
      { q: '형상 관리는 왜 필요한가요?', a: R`<p>여러 사람이 여러 산출물을 계속 바꾸는 상황에서, 무엇이 언제 왜 바뀌었는지 추적하고 승인된 변경만 기준선에 반영해야 혼란과 회귀를 막을 수 있다. 문제가 생기면 이전 버전으로 되돌리거나 원인이 된 변경을 찾을 수 있다.</p>` },
    ],
    types: ['형상 관리'],
    links: [
      { to: 'sec-hash', why: 'Git 객체 ID는 암호학적 해시 — 내용이 조금만 바뀌어도 ID가 바뀐다' },
      { to: 'ds-graph', why: '커밋 이력은 방향 비순환 그래프(DAG), 병합 기준은 공통 조상 찾기' },
      { to: 'ds-hash', why: '내용 주소 저장: 해시를 키로 한 객체 저장소' },
      { to: 'se-cicd', why: '브랜치·PR이 CI 파이프라인을 실행하는 단위' },
      { to: 'ds-search', why: 'git bisect: 버그가 생긴 커밋을 이진 탐색으로 찾기' },
    ],
    quiz: [
      { q: 'Git에서 브랜치를 수십 개 만들어도 저장소 크기가 거의 늘지 않는 이유는?',
        options: ['Git이 브랜치마다 바뀐 줄만 diff로 압축해 저장해서', '브랜치는 커밋 해시를 가리키는 작은 이름표일 뿐 파일을 복사하지 않아서', '브랜치는 원격 저장소에만 만들어지고 로컬에는 저장되지 않아서', '브랜치를 만들면 기존 파일을 하드 링크로 연결해 공간을 공유해서'], answer: 1,
        explain: '새 커밋을 만들 때만 객체가 추가되고, 그것도 바뀐 파일의 blob과 경로상의 tree만 새로 생긴다.' },
      { q: '이미 원격에 push해 동료가 받아 간 커밋들을 rebase한 뒤 강제 push하면 문제가 되는 이유는?',
        options: ['rebase는 충돌이 난 파일의 내용을 한쪽 버전으로 덮어써 지우기 때문', 'rebase는 해시가 다른 새 커밋을 만들어 동료의 옛 커밋과 이력이 갈라지기 때문', '강제 push는 원격 저장소의 모든 브랜치를 내 로컬 상태로 덮어쓰기 때문', 'rebase한 커밋은 작성자 정보가 바뀌어 동료의 커밋이 내 것으로 표시되기 때문'], answer: 1,
        explain: '공유하지 않은 로컬 커밋을 정리할 때만 rebase를 쓰는 것이 원칙이다.' },
      { q: '3-way 병합에서 공통 조상이 필요한 이유는?',
        options: ['공통 조상의 커밋 메시지를 기준으로 두 브랜치의 메시지를 합치려고', '조상과 비교해야 한쪽만 바꾼 곳은 자동 선택하고 양쪽 변경만 충돌로 봐서', '공통 조상부터 다시 커밋을 쌓아야 병합 결과가 선형 이력이 되기 때문', '두 버전만 비교하면 줄 단위 비교가 불가능해 파일 전체가 충돌하기 때문'], answer: 1,
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
<!--diagram-->
<h3>지속적 전달과 지속적 배포</h3>
<p><strong>지속적 전달</strong>은 모든 변경이 언제든 배포 가능한 상태로 유지되고 버튼 하나로 배포하는 것, <strong>지속적 배포</strong>는 파이프라인을 통과하면 사람의 승인 없이 운영까지 자동으로 나가는 것이다. 배포를 자주 하면 각 배포의 변경량이 작아져 위험도 작다.</p>
<h3>안전하게 내보내는 기법</h3>
<ul>
<li><strong>블루-그린</strong>: 새 버전 환경을 옆에 완전히 띄운 뒤 트래픽을 한 번에 전환하고, 문제가 있으면 다시 전환해 즉시 되돌린다.</li>
<li><strong>카나리</strong>: 새 버전에 트래픽의 일부(예: 5%)만 보내고 오류율·지연 시간을 기존 버전과 비교한다. 괜찮으면 비율을 늘리고, 나빠지면 자동으로 롤백한다. 판단하려면 비교할 만큼 충분한 요청이 쌓여야 한다.</li>
<li><strong>기능 플래그</strong>: 코드는 배포하되 기능은 설정으로 켜고 끈다. 배포(코드를 내보내기)와 릴리스(사용자에게 공개)를 분리해, 미완성 기능도 주 브랜치에 합칠 수 있게 한다.</li>
</ul>
<!--math:0-->
<!--code-->
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
<text x="176" y="122" class="st sm">CD: 같은 산출물을 단계적으로 승격</text>
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
    points: [
      R`CI: 자주 통합 + 자동 빌드·테스트, 빠르게 실패, 깨진 빌드 최우선`,
      R`지속적 전달(배포 가능 상태 유지, 수동 승인) vs 지속적 배포(자동으로 운영까지)`,
      R`블루-그린(한 번에 전환·즉시 복귀), 카나리(일부 트래픽부터), 기능 플래그(배포와 릴리스 분리)`,
      R`DORA 지표: 배포 빈도, 변경 리드타임, 변경 실패율, 복구 시간`,
    ],
    interview: [
      { q: '블루-그린 배포와 카나리 배포의 차이는요?', a: R`<p>블루-그린은 새 버전 환경을 통째로 띄운 뒤 트래픽을 한 번에 넘기고, 문제가 있으면 바로 이전 환경으로 되돌린다. 카나리는 새 버전에 일부 트래픽만 보내 오류율과 지연을 비교하고, 괜찮으면 점점 늘린다. 카나리는 영향 범위가 작고 블루-그린은 전환과 복귀가 단순하다.</p>` },
    ],
    types: ['CI/CD'],
    links: [
      { to: 'se-test', why: '파이프라인의 핵심 단계인 자동화된 테스트' },
      { to: 'se-git', why: '브랜치·PR·병합이 파이프라인을 실행하는 단위' },
      { to: 'se-process', why: '작은 배치와 짧은 피드백 주기 — 애자일의 연장' },
      { to: 'ai-mlops', why: '데이터·모델까지 포함하는 ML의 CI/CD' },
      { to: 'math-test', why: '카나리 판단은 두 집단 비율의 통계적 비교' },
    ],
    quiz: [
      { q: 'CI 파이프라인에서 린터·단위 테스트처럼 빠른 검사를 먼저 실행하는 이유는?',
        options: ['빠른 검사가 실패하면 나머지 단계 결과도 항상 실패로 나오기 때문', '실패할 변경을 빨리 걸러 즉시 알리고, 비싼 단계에 자원을 낭비하지 않으려고', '느린 검사는 빠른 검사 결과를 입력으로 받아야만 실행할 수 있기 때문', '린터와 단위 테스트는 배포 서버에서만 돌아가므로 먼저 실행해야 해서'], answer: 1,
        explain: '빠른 실패(fail fast). 피드백이 늦을수록 개발자는 다른 일로 넘어가 맥락을 잃고 수정 비용이 커진다.' },
      { q: '카나리 배포에서 새 버전에 트래픽의 5%만 보내는 이유는?',
        options: ['새 버전 서버를 5%만 띄워 인프라 비용을 줄이려고', '영향받는 사용자를 일부로 제한하면서 실제 트래픽으로 지표를 비교하려고', '새 버전의 기능을 일부 사용자에게만 먼저 공개해 홍보 효과를 내려고', '5%면 통계적으로 모든 버그를 찾아낼 수 있다고 알려져 있어서'], answer: 1,
        explain: '테스트 환경에서 재현되지 않는 문제를 실제 트래픽으로 검증한다. 다만 비교할 만큼 요청이 쌓일 때까지 기다려야 한다.' },
      { q: '기능 플래그의 핵심 이점은?',
        options: ['조건문이 사라져 코드 양과 복잡도가 함께 줄어든다', '배포와 기능 공개를 분리해, 미완성 기능도 합치고 재배포 없이 끌 수 있다', '플래그로 기능을 켜고 끌 수 있어 해당 기능은 테스트할 필요가 없어진다', '사용자마다 다른 브랜치를 배포해 장기 브랜치를 쉽게 관리할 수 있다'], answer: 1,
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
<!--diagram-->
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
<!--math:0-->
<!--code-->
<h3>기술 부채</h3>
<p>빨리 출시하기 위해 택한 임시 설계는 빚과 같다. 당장은 시간을 벌지만, 그 위에 코드를 쌓을수록 이자(변경 비용)가 붙는다. 의도적으로 진 빚은 기록해 두고 갚을 계획을 세우며, 모르고 쌓인 빚은 리팩터링으로 꾸준히 갚는다. "보이스카우트 규칙: 왔을 때보다 깨끗하게 하고 떠나라"는 작은 개선을 일상에 녹이는 방법이다.</p>
<h3>소프트웨어 유지보수</h3>
<p>리팩터링은 유지보수 활동의 하나다. 유지보수는 소프트웨어 생명주기 비용의 가장 큰 부분을 차지하며 네 가지로 나눈다.</p>
<table><tr><th>종류</th><th>목적</th><th>예</th></tr>
<tr><td>수정(교정) 유지보수</td><td>발견된 오류 수정</td><td>버그 수정</td></tr>
<tr><td>적응 유지보수</td><td>운영 환경 변화(OS, 하드웨어, DBMS)에 맞춤</td><td>새 OS 버전 대응</td></tr>
<tr><td>완전화(완벽) 유지보수</td><td>기능 추가·성능 개선. 비중이 가장 큼</td><td>새 기능, 속도 개선</td></tr>
<tr><td>예방 유지보수</td><td>앞으로 생길 문제를 미리 막음</td><td>리팩터링, 문서 정비</td></tr></table>
<p>오래된 시스템을 다루는 기법으로, 완성된 코드에서 설계 정보를 거꾸로 뽑아내는 <strong>역공학</strong>, 기능은 그대로 두고 구조를 다시 만드는 <strong>재공학</strong>, 다른 환경으로 옮기는 <strong>이식</strong>이 있다. 유지보수가 어려운 이유가 문서 없이 남은 레거시 코드라면, 문서 대신 동작하는 코드가 기준이 된다.</p>
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
    points: [
      R`리팩터링 = 외부 동작은 그대로, 내부 구조 개선. 테스트 + 작은 단계`,
      R`코드 냄새: 긴 함수, 중복, 매직 넘버, 긴 매개변수, 기능 욕심, 산탄총 수술`,
      R`순환 복잡도 = 분기 수 + 1 = E − N + 2`,
      R`유지보수: 수정(오류), 적응(환경 변화), 완전화(기능 개선, 비중 최대), 예방`,
      R`역공학(코드 → 설계), 재공학(구조 재구성), 기술 부채`,
    ],
    interview: [
      { q: '리팩터링은 언제, 어떻게 하나요?', a: R`<p>기능을 추가하기 전에 그 기능을 넣기 쉬운 구조로 먼저 바꾸거나, 코드 냄새가 보일 때 한다. 테스트가 통과하는 상태에서 이름 바꾸기나 함수 추출 같은 작은 변경 하나를 하고 바로 테스트를 돌린다. 기능 추가와 리팩터링은 한 커밋에 섞지 않는다.</p>` },
    ],
    types: ['유지보수'],
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
        options: ['구조가 엉망이면 리팩터링보다 빠르므로 코드를 처음부터 다시 작성한다', '현재 동작을 그대로 기록하는 특성 테스트를 만들어 안전망을 확보한다', '코드를 가장 잘 아는 사람에게 리뷰를 받아 위험한 부분을 표시해 둔다', '정적 분석 도구를 돌려 경고가 나오는 부분부터 하나씩 고친다'], answer: 1,
        explain: '특성 테스트는 "지금 이렇게 동작한다"를 고정한다. 그래야 구조를 바꾼 뒤 동작이 달라졌는지 알 수 있다.' },
      { q: '순환 복잡도가 높은 함수가 문제인 이유로 가장 적절한 것은?',
        options: ['분기가 많으면 CPU의 분기 예측이 자주 틀려 실행이 크게 느려져서', '독립적인 실행 경로가 많아 이해하기 어렵고, 검증에 테스트가 많이 필요해서', '조건문마다 지역 변수가 새로 생겨 함수의 메모리 사용량이 늘어나서', '복잡도가 높으면 컴파일러가 최적화를 포기해 바이트코드가 길어져서'], answer: 1,
        explain: '분기마다 경우의 수가 늘어난다. 함수 추출, 보호절, 다형성(조건문을 전략 객체로) 등으로 줄인다.' },
    ],
    resources: ['Martin Fowler, 『리팩터링』 2판', 'Michael Feathers, 『레거시 코드 활용 전략(Working Effectively with Legacy Code)』', 'Robert C. Martin, 『클린 코드』', 'Ruff 문서 (Python 린터·포매터)'],
  },
  {
    id: 'se-pm', title: '프로젝트 관리: 비용 산정·일정 관리',
    summary: R`비용 산정: 규모(LOC·기능 점수)를 추정해 <strong>노력(인월)</strong>으로 환산 → 기간·비용
일정 관리: WBS로 작업을 쪼개고 CPM으로 <strong>임계 경로</strong>(하나라도 늦으면 전체가 늦는 경로) 찾기
브룩스의 법칙: 늦어진 프로젝트에 사람을 더하면 <strong>더 늦어진다</strong>`,
    body: R`
<p>프로젝트 관리의 질문은 셋이다. 얼마나 큰 일인가(규모), 얼마나 걸리는가(일정), 얼마가 드는가(비용). 셋은 모두 추정이고, 초기 추정은 실제와 몇 배씩 차이 나는 것이 보통이다. 요구사항이 구체화될수록 오차가 줄어든다(불확실성의 원뿔). 그래서 추정은 한 번 하고 끝내지 않고 단계마다 다시 한다.</p>
<h3>LOC 기법</h3>
<p>완성될 코드 줄 수(LOC)를 추정해 노력으로 바꾼다. 한 값만 찍지 않고 낙관치·가능치·비관치를 받아 가중 평균을 쓴다(PERT 3점 추정).</p>
<ul>
<li>예상 LOC $= (\text{낙관} + 4 \times \text{가능} + \text{비관}) / 6$</li>
<li>노력(인월) $=$ LOC $\div$ 1인당 월 생산성(LOC/인월)</li>
<li>기간(개월) $=$ 노력 $\div$ 투입 인원, 비용 $=$ 노력 $\times$ 1인월 단가</li>
</ul>
<p>예: 낙관 8,000, 가능 12,000, 비관 22,000줄이면 예상 13,000줄. 1인당 월 250줄이면 52인월, 4명이 하면 13개월, 1인월 600만 원이면 약 3.1억 원이다. "인월"은 한 사람이 한 달 일하는 양이다. 52인월을 52명이 1개월에 끝낼 수는 없다는 것이 아래 브룩스의 법칙이다.</p>
<!--code-->
<h3>COCOMO</h3>
<p>보엠(Boehm)이 과거 프로젝트 자료로 만든 모델이다. 기본형은 노력 $E = a \times \text{KLOC}^b$로, 프로젝트 유형에 따라 계수가 다르다.</p>
<table><tr><th>유형</th><th>특징</th><th>a</th><th>b</th></tr>
<tr><td>조직형(organic)</td><td>작은 팀, 익숙한 업무용 소프트웨어</td><td>2.4</td><td>1.05</td></tr>
<tr><td>반분리형(semi-detached)</td><td>중간 규모, 경험이 섞인 팀</td><td>3.0</td><td>1.12</td></tr>
<tr><td>내장형(embedded)</td><td>하드웨어·제약이 엄격한 시스템</td><td>3.6</td><td>1.20</td></tr></table>
<p>지수 $b$가 1보다 크다는 것이 핵심이다. 규모가 10배가 되면 노력은 10배보다 더 늘어난다. 사람이 많아질수록 조율과 의사소통 비용이 커지기 때문이다. 원가 요인(신뢰도 요구, 팀 경험 등)으로 보정하는 중간형·상세형이 있고, 현재는 COCOMO II가 쓰인다.</p>
<h3>기능 점수(FP)</h3>
<p>코드 줄 수 대신 사용자가 보는 기능의 양을 센다. 외부 입력, 외부 출력, 외부 조회, 내부 논리 파일, 외부 인터페이스 파일의 개수에 복잡도별 가중치를 곱해 더하고, 시스템 특성으로 보정한다. 어떤 언어로 만들지 정하기 전, 요구사항 단계에서 쓸 수 있다는 것이 장점이다.</p>
<h3>일정 관리: WBS와 CPM</h3>
<p><strong>WBS</strong>(작업 분해 구조)로 프로젝트를 관리 가능한 크기의 작업으로 쪼갠 뒤, 작업마다 기간과 선후 관계를 정해 네트워크로 그린다.</p>
<ul>
<li><strong>임계 경로</strong>: 시작에서 끝까지 가장 긴 경로. 그 길이가 프로젝트의 최소 기간이다.</li>
<li><strong>여유 시간</strong>(slack): 작업이 전체 일정을 늦추지 않고 밀릴 수 있는 시간. 가장 늦은 시작 − 가장 이른 시작. 임계 경로 위 작업은 여유가 0이다.</li>
<li>앞에서부터 "가장 이른 시작·끝"을, 뒤에서부터 "가장 늦은 시작·끝"을 계산하면 여유 시간이 나온다.</li>
</ul>
<!--diagram-->
<p>아래 그림의 작업으로 직접 계산해 보자. 앞에서부터 가장 이른 시작(ES) = 선행 작업 EF의 최댓값, EF = ES + 기간. 뒤에서부터 가장 늦은 끝(LF) = 후행 작업 LS의 최솟값, LS = LF − 기간. 여유 = LS − ES다.</p>
<table><tr><th>작업</th><th>기간</th><th>선행</th><th>ES</th><th>EF</th><th>LS</th><th>LF</th><th>여유</th></tr><tr><td>A</td><td>3</td><td>-</td><td>0</td><td>3</td><td>0</td><td>3</td><td><strong>0 (임계)</strong></td></tr><tr><td>B</td><td>2</td><td>A</td><td>3</td><td>5</td><td>5</td><td>7</td><td>2</td></tr><tr><td>C</td><td>4</td><td>A</td><td>3</td><td>7</td><td>3</td><td>7</td><td><strong>0 (임계)</strong></td></tr><tr><td>D</td><td>5</td><td>B, C</td><td>7</td><td>12</td><td>7</td><td>12</td><td><strong>0 (임계)</strong></td></tr><tr><td>E</td><td>2</td><td>D</td><td>12</td><td>14</td><td>12</td><td>14</td><td><strong>0 (임계)</strong></td></tr></table>
<p>여유가 0인 A → C → D → E가 임계 경로이고, 전체 기간은 14일이다.</p>
<p>일정을 줄이려면 임계 경로 위 작업을 줄여야 한다. 여유가 있는 작업을 서둘러 봐야 전체 기간은 그대로다. 간트 차트는 같은 정보를 시간 막대로 보여 주는 도구다.</p>
<h3>브룩스의 법칙</h3>
<p>『맨먼스 미신』의 결론이다. 새로 들어온 사람은 일을 배우는 동안 기존 인원의 시간을 쓰고, 사람 $n$명 사이의 의사소통 경로는 $n(n-1)/2$로 늘어난다. 5명이면 10개, 10명이면 45개다. 그래서 일정이 밀렸을 때 인원 추가보다 범위 축소가 먼저 검토된다.</p>
<h3>위험 관리</h3>
<p>위험을 식별하고, 발생 확률과 영향으로 우선순위를 매기고, 회피·완화·전가·수용 중 대응을 정한 뒤 계속 감시한다. 애자일 팀은 시간 대신 상대 크기(스토리 포인트)로 추정하고, 스프린트마다 실제로 끝낸 양(속도)으로 다음 계획을 보정한다.</p>`,
    analogy: R`<p>여럿이 저녁을 준비할 때 밥 짓기(40분), 국 끓이기(30분), 반찬(20분)을 동시에 시작하면 저녁은 40분 뒤에 나온다. 밥이 임계 경로다. 반찬을 10분 만에 끝내도 저녁 시간은 그대로고, 밥이 5분 늦으면 저녁도 5분 늦는다. 부엌에 사람을 더 넣으면 오히려 서로 부딪힌다(브룩스의 법칙).</p>`,
    diagram: { caption: '작업 네트워크. 괄호는 (가장 이른 시작~끝, 일). 임계 경로 A → C → D → E는 3 + 4 + 5 + 2 = 14일이다. B는 2일 늦어져도 D를 늦추지 않는다(여유 2일).', svg: R`
<svg viewBox="0 0 540 220" width="540">
<path class="a" d="M120,100 L158,55"/><path class="a" d="M260,50 L298,100"/>
<path class="ha" d="M120,120 L158,172"/><path class="ha" d="M260,175 L298,123"/><path class="ha" d="M400,113 L428,113"/>
<rect class="h" x="20" y="90" width="100" height="46" rx="6"/><text x="70" y="105" class="sm">A 요구 분석</text><text x="70" y="122" class="sm">3일 (0~3)</text>
<rect class="n" x="160" y="25" width="100" height="46" rx="6"/><text x="210" y="40" class="sm">B 화면 설계</text><text x="210" y="57" class="sm">2일 (3~5) 여유 2</text>
<rect class="h" x="160" y="155" width="100" height="46" rx="6"/><text x="210" y="170" class="sm">C DB 설계</text><text x="210" y="187" class="sm">4일 (3~7)</text>
<rect class="h" x="300" y="90" width="100" height="46" rx="6"/><text x="350" y="105" class="sm">D 구현</text><text x="350" y="122" class="sm">5일 (7~12)</text>
<rect class="h" x="430" y="90" width="100" height="46" rx="6"/><text x="480" y="105" class="sm">E 테스트</text><text x="480" y="122" class="sm">2일 (12~14)</text>
</svg>` },
    code: R`
def pert(o, m, p):                       # 3점 추정: 가장 가능성 높은 값에 4배 가중
  return (o + 4 * m + p) / 6

loc = pert(8_000, 12_000, 22_000)
effort = loc / 250                       # 1인당 월 250 LOC → 노력(인월)
print(f"예상 규모 {loc:,.0f} LOC, 노력 {effort:.0f}인월, 4명이면 {effort / 4:.0f}개월, 비용 {effort * 600 / 10000:.2f}억 원")   # 월 단가 600만 원

COCOMO = {"조직형": (2.4, 1.05, 0.38), "반분리형": (3.0, 1.12, 0.35), "내장형": (3.6, 1.20, 0.32)}
for kind, (a, b, c) in COCOMO.items():   # 기본 COCOMO: 노력 = a × KLOC^b, 기간 = 2.5 × 노력^c
  e = a * (loc / 1000) ** b
  print(f"{kind:5} 노력 {e:5.1f}인월, 기간 {2.5 * e ** c:4.1f}개월")
for kloc in [10, 100]:                   # b > 1: 규모가 10배면 노력은 10배보다 더 는다
  print(f"{kloc} KLOC 조직형 노력 {2.4 * kloc ** 1.05:.0f}인월")

tasks = {"A": (3, []), "B": (2, ["A"]), "C": (4, ["A"]), "D": (5, ["B", "C"]), "E": (2, ["D"])}

def cpm(tasks):
  es, ef = {}, {}
  for t, (d, pre) in tasks.items():    # 앞에서부터: 가장 이른 시작 = 선행 작업의 가장 늦은 끝
      es[t] = max((ef[p] for p in pre), default=0)
      ef[t] = es[t] + d
  end = max(ef.values())
  lf, ls = {}, {}
  for t in reversed(list(tasks)):      # 뒤에서부터: 가장 늦은 끝 = 후행 작업의 가장 이른 늦은 시작
      succ = [s for s, (_, pre) in tasks.items() if t in pre]
      lf[t] = min((ls[s] for s in succ), default=end)
      ls[t] = lf[t] - tasks[t][0]
  return end, {t: ls[t] - es[t] for t in tasks}

end, slack = cpm(tasks)
print("프로젝트 기간", end, "일 / 여유 시간", slack, "/ 임계 경로", [t for t in tasks if slack[t] == 0])

for n in [3, 5, 10]:                     # 의사소통 경로 수 n(n-1)/2
  print(f"{n}명 → 경로 {n * (n - 1) // 2}개")
`,
    points: [
      R`LOC 기법: 예상 LOC = (낙관 + 4 × 가능 + 비관) / 6, 노력(인월) = LOC / 생산성, 기간 = 노력 / 인원`,
      R`예: 30,000 LOC, 5명, 1인 월 300 LOC → 노력 100인월 → 기간 20개월`,
      R`COCOMO 유형: 조직형(organic), 반분리형(semi-detached), 내장형(embedded). E = a × KLOC^b`,
      R`기능 점수(FP): 입력·출력·조회·내부 파일·외부 인터페이스 수 × 가중치. 언어와 무관`,
      R`CPM: 임계 경로 = 가장 긴 경로 = 최소 기간, 여유 = LS − ES. 간트 차트, PERT`,
      R`브룩스의 법칙: 늦은 프로젝트에 인원 추가 → 더 늦어짐. 의사소통 경로 n(n − 1)/2`,
    ],
    interview: [
      { q: '브룩스의 법칙은 무엇이고 왜 그런가요?', a: R`<p>일정이 늦어진 프로젝트에 사람을 더하면 더 늦어진다는 법칙이다. 새 인원이 일을 배우는 동안 기존 인원의 시간을 쓰고, 사람 사이 의사소통 경로가 n(n − 1)/2로 늘어 조율 비용이 커진다. 그래서 일정이 밀리면 인원 추가보다 범위 축소를 먼저 검토한다.</p>` },
    ],
    types: ['비용 산정', '일정 관리'],
    links: [
      { to: 'se-process', why: '폭포수는 초기에 한 번, 애자일은 반복마다 추정한다' },
      { to: 'se-req', why: '요구사항이 구체적일수록 추정 오차가 준다' },
      { to: 'ds-shortest', why: '임계 경로는 작업 그래프(DAG)의 최장 경로' },
      { to: 'se-principle', why: '모듈 사이 결합이 낮으면 병렬로 나눠 개발하기 쉽다' },
    ],
    quiz: [
      { q: '낙관치 10,000, 가능치 16,000, 비관치 28,000 LOC일 때 PERT 3점 추정에 따른 예상 LOC는?',
        options: ['16,000', '17,000', '18,000', '18,500'], answer: 1,
        explain: '(10,000 + 4 × 16,000 + 28,000) / 6 = 102,000 / 6 = 17,000. 단순 평균(18,000)보다 가능치 쪽으로 끌려간다.' },
      { q: 'CPM에서 임계 경로 위에 있지 않은 작업을 하루 앞당기면 프로젝트 전체 기간은?',
        options: ['그 작업의 여유 시간만큼 줄어든다', '줄어들지 않는다', '정확히 하루 줄어든다', '임계 경로가 바뀌어 하루 늘어난다'], answer: 1,
        explain: '전체 기간은 가장 긴 경로인 임계 경로가 정한다. 여유가 있는 작업을 앞당겨도 여유만 늘어날 뿐 가장 긴 경로의 길이는 그대로다.' },
      { q: 'COCOMO의 노력 공식 E = a × KLOC^b에서 b가 1보다 크다는 것이 뜻하는 바는?',
        options: ['코드 줄 수가 늘수록 1줄당 비용이 점점 줄어든다', '규모가 커질수록 노력이 규모보다 더 빠르게 는다', '노력이 규모와 정확히 비례해 단가가 일정하다', '프로젝트 유형과 관계없이 노력이 항상 같다'], answer: 1,
        explain: '규모가 10배면 노력은 10배보다 크다(조직형 기준 10 KLOC 약 27인월, 100 KLOC 약 302인월). 팀이 커질수록 의사소통·통합 비용이 붙기 때문이다.' },
    ],
    resources: ['『맨먼스 미신』(Frederick Brooks)', '『소프트웨어 추정』(Steve McConnell)', '『소프트웨어 공학』(Pressman) 25~27장 — 추정·일정·위험 관리'],
  },
  {
    id: 'se-sysdesign', title: '시스템 설계 기초: 확장성·캐시·로드 밸런서',
    summary: R`서버를 키우는 <strong>수직 확장</strong> vs 대수를 늘리는 <strong>수평 확장</strong>(서버가 상태를 갖지 않아야 가능)
로드 밸런서로 요청을 나누고, <strong>캐시</strong>로 반복 조회를 흡수, DB는 복제·샤딩으로 분산
병목은 측정으로 찾는다: 평균이 아니라 <strong>p95·p99 지연 시간</strong>과 처리량`,
    body: R`
<p>처음에는 서버 한 대에 웹 애플리케이션과 DB가 함께 있다. 사용자가 늘면 어딘가가 먼저 한계에 닿는다. 시스템 설계는 그 지점을 찾아 하나씩 풀어 가는 과정이다.</p>
<h3>수직 확장과 수평 확장</h3>
<ul>
<li><strong>수직 확장</strong>(scale up): 더 큰 CPU·메모리로 바꾼다. 코드 수정이 없지만 한계가 있고 비싸며, 그 한 대가 죽으면 서비스가 멈춘다.</li>
<li><strong>수평 확장</strong>(scale out): 같은 서버를 여러 대 둔다. 이론상 한계가 없고 한 대가 죽어도 나머지가 버틴다.</li>
</ul>
<p>수평 확장의 전제는 <strong>무상태</strong>(stateless) 서버다. 로그인 세션을 서버 메모리에 두면 다음 요청이 다른 서버로 갔을 때 사용자가 로그아웃된다. 세션은 Redis 같은 공유 저장소나 토큰(JWT)으로 옮기고, 웹 서버는 어떤 요청이 와도 같은 일을 하게 만든다.</p>
<h3>로드 밸런서</h3>
<p>요청을 받아 뒤의 서버들에 나눠 준다.</p>
<ul>
<li><strong>L4</strong>는 IP·포트만 보고 나누고, <strong>L7</strong>은 HTTP 경로·헤더를 보고 나눈다(예: /api는 API 서버, /static은 파일 서버).</li>
<li>나누는 방법: 차례대로(라운드 로빈), 연결이 가장 적은 서버로(최소 연결), 클라이언트 IP나 키의 해시로(같은 사용자를 같은 서버로). 서버가 늘고 줄 때 재배치를 줄이려면 일관성 해싱을 쓴다.</li>
<li><strong>헬스 체크</strong>로 응답 없는 서버를 자동으로 뺀다. 로드 밸런서 자체도 이중화해야 단일 장애점이 되지 않는다.</li>
</ul>
<!--diagram-->
<h3>캐시</h3>
<p>같은 데이터를 반복해서 읽는다면 느린 저장소 앞에 빠른 저장소를 둔다. 브라우저 캐시, CDN(가까운 지역 서버에 정적 파일 복사), 애플리케이션 캐시(Redis·Memcached), DB 자체의 버퍼 풀이 모두 같은 원리다.</p>
<ul>
<li><strong>캐시 어사이드</strong>: 읽을 때 캐시를 먼저 보고, 없으면(미스) DB에서 읽어 캐시에 넣는다. 가장 흔한 방식이다.</li>
<li>평균 지연 $=$ 적중률 $\times$ 캐시 시간 $+$ (1 − 적중률) $\times$ DB 시간. CPU 캐시의 평균 메모리 접근 시간과 같은 식이다.</li>
<li>데이터가 바뀌면 캐시를 지우거나(무효화) 만료 시간(TTL)으로 언젠가 새로 읽게 한다. 오래된 값을 얼마나 허용할지는 업무가 정한다.</li>
<li>인기 키가 동시에 만료되면 요청이 한꺼번에 DB로 몰린다(캐시 스탬피드). 만료 시간에 무작위 값을 더하거나 한 요청만 DB를 읽게 막는다.</li>
</ul>
<h3>DB 확장</h3>
<p>DB는 상태를 가진 부분이라 가장 늦게, 가장 조심스럽게 확장한다. 먼저 느린 질의와 인덱스를 점검한다. 그다음 쓰기는 주 서버가 받고 읽기는 <strong>복제본</strong>들이 나눠 받게 한다. 복제에는 지연이 있어서 방금 쓴 글이 복제본에서 바로 안 보일 수 있다. 쓰기까지 감당이 안 되면 키 범위나 해시로 데이터를 나눠 여러 DB에 둔다(<strong>샤딩</strong>). 대신 샤드를 넘나드는 조인과 트랜잭션이 어려워진다.</p>
<h3>비동기 처리</h3>
<p>이메일 발송, 썸네일 생성, 모델 추론처럼 오래 걸리고 즉시 결과가 필요 없는 작업은 메시지 큐에 넣고 별도 작업자(worker)가 처리한다. 사용자 응답이 빨라지고, 몰리는 요청을 큐가 완충한다.</p>
<h3>숫자로 판단하기</h3>
<p>하루 사용자 100만 명이 1인당 20번 요청하면 평균 약 231 QPS, 피크를 3배로 잡으면 700 QPS 정도다. 이런 어림 계산으로 서버 한 대로 될지부터 판단한다. 지연 시간은 평균보다 <strong>백분위</strong>로 본다. p99가 1초라면 요청 100번 중 1번은 1초 넘게 걸린다는 뜻이고, 한 화면이 요청을 수십 개 보내면 거의 모든 사용자가 그 느린 1%를 겪는다.</p>
<!--code-->`,
    analogy: R`<p>인기 식당이 손님이 늘었을 때 할 수 있는 일과 같다. 주방장을 더 실력 있는 사람으로 바꾸는 것이 수직 확장, 같은 레시피로 요리하는 주방장을 여럿 두는 것이 수평 확장이다. 입구 직원이 빈 주방으로 주문을 보내는 것이 로드 밸런서, 자주 나가는 반찬을 미리 담아 두는 것이 캐시다. 레시피가 주방장 머릿속에만 있으면(상태) 주방장을 늘릴 수 없다.</p>`,
    diagram: { caption: '수평 확장한 웹 서비스. 웹 서버는 상태를 갖지 않아 몇 대든 늘릴 수 있다. 반복 조회는 캐시가 흡수하고, 쓰기는 주 서버로, 읽기는 복제본으로 나눈다.', svg: R`
<svg viewBox="0 0 560 230" width="560">
<rect class="n" x="10" y="95" width="80" height="40" rx="6"/><text x="50" y="115" class="sm">사용자</text>
<rect class="h" x="120" y="95" width="100" height="40" rx="6"/><text x="170" y="115" class="sm">로드 밸런서</text>
<rect class="n" x="260" y="30" width="100" height="36" rx="6"/><text x="310" y="48" class="sm">웹 서버 1</text>
<rect class="n" x="260" y="97" width="100" height="36" rx="6"/><text x="310" y="115" class="sm">웹 서버 2</text>
<rect class="n" x="260" y="164" width="100" height="36" rx="6"/><text x="310" y="182" class="sm">웹 서버 3</text>
<rect class="h" x="420" y="20" width="130" height="40" rx="6"/><text x="485" y="40" class="sm">캐시 (Redis)</text>
<rect class="n" x="420" y="95" width="130" height="40" rx="6"/><text x="485" y="115" class="sm">DB 주 서버 (쓰기)</text>
<rect class="n" x="420" y="175" width="130" height="40" rx="6"/><text x="485" y="195" class="sm">복제본 (읽기)</text>
<path class="a" d="M90,115 H118"/>
<path class="a" d="M220,108 L258,52"/><path class="a" d="M220,115 H258"/><path class="a" d="M220,122 L258,178"/>
<path class="e" d="M360,48 H385 M360,115 H385 M360,182 H385 M385,40 V195"/>
<path class="a" d="M385,40 H418"/><path class="a" d="M385,115 H418"/><path class="a" d="M385,195 H418"/>
<path class="a d" d="M455,135 V173"/><text x="461" y="154" class="st sm">복제 (지연 있음)</text>
</svg>` },
    code: R`
import random
from collections import OrderedDict
from itertools import cycle

dau, per_user = 1_000_000, 20            # 어림 계산: 하루 사용자 100만, 1인당 20요청
avg_qps = dau * per_user / 86_400
print(f"평균 {avg_qps:.0f} QPS, 피크(3배) 약 {avg_qps * 3:.0f} QPS")

class LRUCache:
  def __init__(self, cap):
      self.cap, self.data = cap, OrderedDict()
  def get(self, k):
      if k not in self.data:
          return None
      self.data.move_to_end(k)         # 최근에 쓴 것으로 표시
      return self.data[k]
  def put(self, k, v):
      self.data[k] = v
      self.data.move_to_end(k)
      if len(self.data) > self.cap:
          self.data.popitem(last=False)  # 가장 오래 안 쓴 것을 내보낸다

DB_MS, CACHE_MS = 20.0, 0.5
def db_read(k):
  return f"row-{k}"

def get_item(cache, k):                  # 캐시 어사이드: 캐시 → (미스면) DB → 캐시에 저장
  v = cache.get(k)
  if v is not None:
      return v, CACHE_MS
  v = db_read(k)
  cache.put(k, v)
  return v, DB_MS

random.seed(0)
keys = list(range(10_000))
weights = [1 / (i + 1) for i in keys]    # 소수의 인기 항목에 요청이 몰리는 분포(지프)
reqs = random.choices(keys, weights, k=50_000)
for cap in [100, 1_000]:
  cache, lat = LRUCache(cap), []
  for k in reqs:
      lat.append(get_item(cache, k)[1])
  hit = lat.count(CACHE_MS) / len(lat)
  lat.sort()
  print(f"캐시 {cap:5}개(전체의 {cap / 100:.0f}%): 적중률 {hit:.0%}, 평균 {sum(lat) / len(lat):.1f}ms, "
        f"p50 {lat[len(lat) // 2]}ms, p99 {lat[int(len(lat) * 0.99)]}ms")

servers = cycle(["web-1", "web-2", "web-3"])  # 라운드 로빈 로드 밸런서
print([next(servers) for _ in range(7)])
`,
    points: [
      R`수직 확장(서버 키우기, 한계·단일 장애점) vs 수평 확장(대수 늘리기, 무상태 서버 필요)`,
      R`로드 밸런서: L4(IP·포트) vs L7(HTTP), 라운드 로빈·최소 연결·해시, 헬스 체크`,
      R`캐시 어사이드, TTL·무효화, 캐시 스탬피드`,
      R`DB: 읽기 복제본(복제 지연), 샤딩(조인·트랜잭션 어려움)`,
      R`지연은 평균이 아니라 p95·p99로 본다`,
    ],
    interview: [
      { q: '서비스 사용자가 10배로 늘면 어떻게 대응하나요?', a: R`<p>먼저 측정으로 병목을 찾는다. 웹 서버를 무상태로 만들어 로드 밸런서 뒤에 수평 확장하고, 반복 조회는 캐시로 흡수한다. DB는 느린 질의와 인덱스를 점검한 뒤 읽기 복제본을 두고, 그래도 쓰기가 부족하면 샤딩한다. 오래 걸리는 작업은 메시지 큐로 비동기 처리한다.</p>` },
    ],
    types: ['시스템 설계'],
    links: [
      { to: 'ca-cache', why: '적중률과 평균 접근 시간, 같은 식이 시스템 전체에서 반복된다' },
      { to: 'db-nosql', why: '샤딩·복제·일관성 해싱·CAP' },
      { to: 'net-messaging', why: '메시지 큐로 무거운 작업을 비동기로 분리' },
      { to: 'se-req', why: '가용성·지연 시간 같은 비기능 요구사항을 숫자로' },
      { to: 'ai-mlops', why: '모델 서빙도 같은 원리로 확장한다' },
    ],
    quiz: [
      { q: '웹 서버를 수평 확장하기 전에 로그인 세션을 서버 메모리에서 Redis로 옮기는 이유는?',
        options: ['Redis가 서버 메모리보다 빨라 로그인 속도가 크게 오르기 때문', '다음 요청이 다른 서버로 가도 같은 세션을 볼 수 있게 하려고', '세션을 Redis에 두면 로드 밸런서가 필요 없어지기 때문', '서버 메모리에 둔 세션은 HTTPS로 암호화할 수 없어서'], answer: 1,
        explain: '로드 밸런서는 요청마다 다른 서버를 고를 수 있다. 세션이 특정 서버 메모리에만 있으면 그 서버로 가지 않은 요청은 로그인 정보를 모른다.' },
      { q: '캐시 적중률 90%, 캐시 1ms, DB 21ms일 때 평균 응답 시간은?',
        options: ['2.1ms', '3ms', '1.9ms', '11ms'], answer: 1,
        explain: '0.9 × 1 + 0.1 × 21 = 0.9 + 2.1 = 3ms. 적중률이 99%로 오르면 1.2ms로 줄어든다. 마지막 몇 %가 평균을 크게 좌우한다.' },
      { q: '평균 응답 시간이 50ms로 괜찮은데도 사용자 불만이 많다. 먼저 확인할 지표로 가장 알맞은 것은?',
        options: ['초당 처리하는 요청 수(QPS)를 하루 동안 평균 낸 값', 'p99처럼 느린 쪽 꼬리를 보는 백분위 지연 시간', '전체 서버의 CPU 사용률을 평균 낸 값', '하루 동안 들어온 전체 요청 수의 합계'], answer: 1,
        explain: '평균은 소수의 매우 느린 요청을 가린다. 한 화면이 요청 여러 개로 이루어지면 그중 하나만 느려도 화면 전체가 느리므로, 꼬리 지연을 봐야 사용자 경험이 보인다.' },
    ],
    resources: ['『가상 면접 사례로 배우는 대규모 시스템 설계 기초』(Alex Xu)', '『데이터 중심 애플리케이션 설계』(Martin Kleppmann) 1, 5, 6장'],
  },
  {
    id:'se-arch', title: '아키텍처 패턴과 미들웨어',
    summary: R`아키텍처 패턴은 시스템 전체의 뼈대: <strong>계층형</strong>, <strong>클라이언트-서버</strong>, <strong>MVC</strong>, <strong>파이프-필터</strong>, <strong>브로커</strong>, <strong>이벤트 기반</strong>, <strong>마이크로서비스</strong>
디자인 패턴이 클래스 몇 개의 관계라면, 아키텍처 패턴은 컴포넌트와 그 사이 통신 방식을 정한다
<strong>미들웨어</strong>는 서로 다른 시스템을 잇는 중간 소프트웨어: RPC, MOM(메시지 큐), ORB, TP 모니터, WAS, ESB`,
    body: R`
<p>코드를 어디에 두고 무엇이 무엇을 부를 수 있게 할지를 시스템 수준에서 정한 것이 아키텍처다. 한번 정하면 바꾸기 가장 어려운 결정이라, 설계 면접과 정보처리기사 모두에서 패턴의 이름과 장단점을 묻는다.</p>
<h3>계층형 (Layered)</h3>
<p>시스템을 표현(UI) → 업무 로직 → 데이터 접근 → DB처럼 층으로 나누고, 각 층은 바로 아래층만 부른다. 층 하나를 통째로 바꾸기 쉽고(DB를 바꿔도 위층은 그대로) 역할이 분명하다. 대신 단순한 요청도 모든 층을 거쳐 느려질 수 있다. OSI 7계층도 같은 패턴이다.</p>
<h3>클라이언트-서버</h3>
<p>여러 클라이언트가 요청하고 서버 하나(또는 여럿)가 응답한다. 웹이 대표적이다. 데이터와 규칙이 서버에 모여 관리가 쉽지만 서버가 병목이자 단일 장애점이 될 수 있다. 반대로 모든 노드가 요청자이자 응답자인 구조가 <strong>P2P</strong>(토렌트, 블록체인)다.</p>
<h3>MVC (Model-View-Controller)</h3>
<ul>
<li><strong>모델</strong>: 데이터와 업무 규칙. 화면을 모른다.</li>
<li><strong>뷰</strong>: 모델을 사용자에게 보여 준다.</li>
<li><strong>컨트롤러</strong>: 사용자 입력을 받아 모델을 바꾸고 어떤 뷰를 보일지 고른다.</li>
</ul>
<p>같은 데이터를 웹, 앱, 관리자 화면 등 여러 뷰로 보여 줄 수 있고, 화면을 바꿔도 업무 규칙은 그대로다. 모델이 바뀌면 뷰에 알리는 부분에 옵저버 패턴이 쓰인다. 변형으로 MVP, MVVM이 있다.</p>
<!--diagram-->
<!--code-->
<h3>파이프-필터</h3>
<p>데이터가 필터들을 차례로 통과하며 변환된다. 각 필터는 입력을 받아 출력만 내놓고 다른 필터를 모른다. 유닉스의 cat log | grep ERROR | sort, 컴파일러(어휘 분석 → 구문 분석 → 최적화 → 코드 생성), ML 전처리 파이프라인이 예다. 필터를 재사용하고 순서를 바꾸기 쉽지만, 필터마다 데이터 변환 비용이 들고 대화형 처리에는 맞지 않는다.</p>
<h3>브로커와 이벤트 기반</h3>
<ul>
<li><strong>브로커</strong>: 클라이언트가 서버 위치를 모른 채 브로커에 요청하면 브로커가 알맞은 서버로 전달한다. 분산 객체 시스템(CORBA)이 이 구조다.</li>
<li><strong>이벤트 기반</strong>(발행-구독): 발행자는 "주문됨" 이벤트만 내보내고, 관심 있는 구독자(결제, 배송, 알림)가 각자 받아 처리한다. 발행자는 구독자가 누구인지 몰라 결합도가 낮다. 대신 전체 흐름이 코드에 드러나지 않아 추적이 어렵다.</li>
<li><strong>마스터-슬레이브</strong>: 마스터가 일을 나눠 주고 슬레이브들이 처리한 결과를 모은다. DB 복제(주 서버와 복제본)가 예다.</li>
</ul>
<h3>모놀리식과 마이크로서비스</h3>
<table>
<tr><th></th><th>모놀리식</th><th>마이크로서비스 (MSA)</th></tr>
<tr><td>구성</td><td>하나의 코드베이스, 하나의 배포 단위</td><td>업무 기능별 작은 서비스 여럿, 각자 배포</td></tr>
<tr><td>데이터</td><td>DB 하나 공유</td><td>서비스마다 자기 DB</td></tr>
<tr><td>통신</td><td>함수 호출</td><td>네트워크(REST, gRPC, 메시지)</td></tr>
<tr><td>장점</td><td>단순, 개발·테스트·디버깅 쉬움</td><td>독립 배포·확장, 장애 격리, 팀별 기술 선택</td></tr>
<tr><td>단점</td><td>커지면 빌드·배포가 느리고 한 부분의 장애가 전체로 번짐</td><td>네트워크 지연·실패 처리, 분산 트랜잭션, 운영 복잡도</td></tr>
</table>
<p>서비스 앞에는 인증, 라우팅, 속도 제한을 맡는 <strong>API 게이트웨이</strong>를 둔다. 작은 팀과 초기 제품은 모놀리식으로 시작하는 편이 낫다는 것이 일반적인 조언이다. 이전 세대의 비슷한 생각으로, 재사용 가능한 서비스를 기업 공용 버스(ESB)로 잇는 <strong>SOA</strong>(서비스 지향 아키텍처)가 있다.</p>
<h3>미들웨어</h3>
<p>운영체제와 응용 프로그램 사이, 또는 서로 다른 시스템 사이에서 통신과 데이터 교환을 맡는 소프트웨어다. 필기에서 종류를 묻는다.</p>
<table>
<tr><th>종류</th><th>하는 일</th></tr>
<tr><td>RPC</td><td>원격 프로시저를 로컬 함수처럼 호출 (gRPC)</td></tr>
<tr><td>MOM</td><td>메시지 큐로 비동기 메시지 전달. 받는 쪽이 꺼져 있어도 메시지가 쌓인다 (RabbitMQ, Kafka)</td></tr>
<tr><td>ORB</td><td>분산 객체의 메서드를 원격 호출 (CORBA)</td></tr>
<tr><td>DB 미들웨어</td><td>응용 프로그램과 여러 DB를 연결 (ODBC, JDBC)</td></tr>
<tr><td>TP 모니터</td><td>대량의 온라인 트랜잭션을 관리하고 부하를 분산 (은행, 항공 예약)</td></tr>
<tr><td>WAS</td><td>동적 웹 콘텐츠를 만드는 애플리케이션 실행 환경 (Tomcat, JBoss)</td></tr>
<tr><td>EAI / ESB</td><td>기업 내 여러 애플리케이션을 통합. EAI는 연결 방식으로 Point-to-Point, Hub &amp; Spoke, Message Bus, Hybrid가 있다</td></tr>
</table>
<p>EAI 구축 유형: <strong>Point-to-Point</strong>는 애플리케이션끼리 1:1로 직접 연결해 단순하지만 연결 수가 급격히 는다. <strong>Hub &amp; Spoke</strong>는 가운데 허브가 모든 데이터 전송을 중개해 관리가 쉽지만 허브가 장애점이 된다. <strong>Message Bus</strong>(ESB)는 애플리케이션 사이에 미들웨어 버스를 두어 확장성이 좋다. <strong>Hybrid</strong>는 그룹 안은 Hub &amp; Spoke, 그룹 사이는 Message Bus로 섞는다.</p>
<p>웹 서버(Apache, Nginx)는 정적 파일을 빠르게 내주고, WAS는 프로그램을 실행해 동적 응답을 만든다. 보통 웹 서버를 앞에 두고 동적 요청만 WAS로 넘긴다.</p>`,
    analogy: R`<p>건물에 비유하면 디자인 패턴은 방 안의 가구 배치, 아키텍처 패턴은 건물의 구조다. 계층형은 층마다 용도가 정해진 빌딩, 마이크로서비스는 각자 문이 따로 있는 상가 단지, 이벤트 기반은 안내 방송을 듣고 필요한 가게만 움직이는 쇼핑몰이다. 미들웨어는 건물들 사이를 잇는 통로와 우편 시스템이다.</p>`,
    diagram: { caption: '대표적인 아키텍처 패턴 셋. 계층형은 위에서 아래로만 부르고, MVC는 입력·데이터·표시를 나누며, 마이크로서비스는 게이트웨이 뒤에 서비스마다 자기 DB를 둔다.', svg: R`
<svg viewBox="0 0 560 230" width="560">
<text x="85" y="15">계층형</text>
<rect class="n" x="20" y="30" width="130" height="32" rx="4"/><text x="85" y="46" class="sm">표현 계층</text>
<rect class="n" x="20" y="82" width="130" height="32" rx="4"/><text x="85" y="98" class="sm">업무 계층</text>
<rect class="n" x="20" y="134" width="130" height="32" rx="4"/><text x="85" y="150" class="sm">데이터 접근 계층</text>
<rect class="g" x="20" y="186" width="130" height="32" rx="4"/><text x="85" y="202" class="sm">DB</text>
<path class="a" d="M85,62 V80"/>
<path class="a" d="M85,114 V132"/>
<path class="a" d="M85,166 V184"/>
<text x="275" y="15">MVC</text>
<rect class="h" x="215" y="40" width="120" height="36" rx="4"/><text x="275" y="58" class="sm">컨트롤러</text>
<rect class="n" x="190" y="150" width="80" height="36" rx="4"/><text x="230" y="168" class="sm">모델</text>
<rect class="n" x="290" y="150" width="80" height="36" rx="4"/><text x="330" y="168" class="sm">뷰</text>
<path class="a" d="M250,76 L235,148"/><text x="215" y="110" class="sm">갱신</text>
<path class="a" d="M300,76 L320,148"/><text x="342" y="110" class="sm">선택</text>
<path class="a d" d="M270,168 H288"/>
<text x="279" y="200" class="sm">변경 알림</text>
<text x="475" y="15">마이크로서비스</text>
<rect class="h" x="410" y="40" width="130" height="32" rx="4"/><text x="475" y="56" class="sm">API 게이트웨이</text>
<rect class="n" x="400" y="110" width="45" height="32" rx="4"/><text x="422" y="126" class="sm">주문</text>
<rect class="n" x="453" y="110" width="45" height="32" rx="4"/><text x="475" y="126" class="sm">결제</text>
<rect class="n" x="506" y="110" width="45" height="32" rx="4"/><text x="528" y="126" class="sm">배송</text>
<rect class="g" x="400" y="175" width="45" height="28" rx="4"/><text x="422" y="189" class="sm">DB</text>
<rect class="g" x="453" y="175" width="45" height="28" rx="4"/><text x="475" y="189" class="sm">DB</text>
<rect class="g" x="506" y="175" width="45" height="28" rx="4"/><text x="528" y="189" class="sm">DB</text>
<path class="a" d="M440,72 L425,108"/>
<path class="a" d="M475,72 V108"/>
<path class="a" d="M510,72 L525,108"/>
<path class="e" d="M422,142 V175"/>
<path class="e" d="M475,142 V175"/>
<path class="e" d="M528,142 V175"/>
</svg>` },
    code: R`
# MVC: 모델은 데이터와 규칙, 뷰는 표시, 컨트롤러는 입력을 받아 둘을 잇는다
class TodoModel:
  def __init__(self):
      self.items, self.listeners = [], []
  def add(self, text):
      if not text.strip():
          raise ValueError('빈 할 일')
      self.items.append(text)
      for notify in self.listeners:   # 옵저버: 모델이 바뀌면 뷰에 알린다
          notify(self.items)

class TodoView:
  def render(self, items):
      print(' | '.join(f"{i}. {t}" for i, t in enumerate(items, 1)))

class TodoController:
  def __init__(self, model):
      self.model = model
  def on_submit(self, text):
      try:
          self.model.add(text)
      except ValueError as e:
          print('입력 오류:', e)

model, view = TodoModel(), TodoView()
model.listeners.append(view.render)
ctrl = TodoController(model)
for text in ['논문 읽기', '  ', '복습']:
  ctrl.on_submit(text)

# 파이프-필터: 각 필터는 입력을 받아 출력만 넘긴다. 순서를 바꾸거나 끼워 넣기 쉽다
log = ['INFO start', 'ERROR disk full', 'WARN slow', 'ERROR timeout']
pipeline = [
  lambda xs: (x for x in xs if x.startswith('ERROR')),
  lambda xs: (x.split(' ', 1)[1] for x in xs),
  lambda xs: sorted(xs),
]
data = log
for f in pipeline:
  data = f(data)
print(data)
`,
    points: [
      R`패턴: 계층형, 클라이언트-서버, MVC, 파이프-필터, 브로커, 이벤트 기반(발행-구독), 마스터-슬레이브, P2P`,
      R`MVC: 모델(데이터·규칙), 뷰(표시), 컨트롤러(입력 처리)`,
      R`모놀리식(단순, 하나로 배포) vs 마이크로서비스(독립 배포·확장, 운영 복잡). API 게이트웨이`,
      R`미들웨어: RPC, MOM, ORB, DB 미들웨어(ODBC·JDBC), TP 모니터, WAS`,
      R`EAI: Point-to-Point, Hub & Spoke(허브 중개), Message Bus(ESB), Hybrid`,
    ],
    interview: [
      { q: '모놀리식과 마이크로서비스의 장단점은요?', a: R`<p>모놀리식은 하나의 코드베이스와 배포 단위라 개발, 테스트, 디버깅이 단순하지만 커지면 빌드와 배포가 느리고 장애가 전체로 번진다. 마이크로서비스는 기능별 서비스를 독립적으로 배포하고 확장하며 장애를 격리할 수 있지만, 네트워크 실패 처리, 분산 트랜잭션, 운영 복잡도가 커진다. 작은 팀은 모놀리식으로 시작하는 편이 낫다.</p>` },
      { q: 'MVC 패턴을 설명해 주세요.', a: R`<p>모델은 데이터와 업무 규칙, 뷰는 모델을 사용자에게 보여 주는 화면, 컨트롤러는 사용자 입력을 받아 모델을 바꾸고 보여 줄 뷰를 고른다. 화면과 업무 규칙이 분리되어 같은 데이터를 여러 화면으로 보여 주거나 화면만 바꾸기 쉽다.</p>` },
    ],
    types: ['아키텍처'],
    links: [
      { to: 'se-pattern', why: '옵저버·전략 같은 디자인 패턴이 아키텍처 안에서 쓰인다' },
      { to: 'se-principle', why: '낮은 결합도·높은 응집도가 모든 패턴의 목표' },
      { to: 'se-sysdesign', why: '확장성·캐시·로드 밸런서로 아키텍처를 키우기' },
      { to: 'net-messaging', why: 'MOM과 이벤트 기반 구조의 실제: 메시지 큐' },
      { to: 'db-distributed', why: '마이크로서비스의 분산 트랜잭션 문제' },
    ],
    quiz: [
      { q: '데이터가 독립된 처리 단계들을 차례로 통과하며 변환되고, 각 단계는 앞뒤 단계를 모르는 아키텍처 패턴은?',
        options: ['브로커 패턴', '마스터-슬레이브 패턴', '파이프-필터 패턴', '클라이언트-서버 패턴'], answer: 2,
        explain: '파이프-필터에서 각 필터는 입력을 받아 출력을 넘길 뿐이다. 유닉스 파이프와 컴파일러의 단계 구성이 대표적인 예다.' },
      { q: '모놀리식과 비교한 마이크로서비스 아키텍처의 단점으로 가장 알맞은 것은?',
        options: ['기능 하나를 고쳐도 전체를 다시 배포해야 한다', '서비스 간 통신과 분산 트랜잭션 처리가 복잡하다', '부하가 몰리는 특정 기능만 골라서 수평 확장할 수 없다', '한 기능의 장애가 시스템 전체로 쉽게 번진다'], answer: 1,
        explain: '나머지 셋은 모놀리식의 단점이다. 마이크로서비스는 독립 배포·확장과 장애 격리를 얻는 대신 함수 호출이 네트워크 호출이 되어 지연, 실패, 데이터 일관성 문제를 떠안는다.' },
      { q: '송신 측과 수신 측이 동시에 실행 중이지 않아도 메시지를 큐에 저장했다가 전달하는 비동기 방식의 미들웨어는?',
        options: ['RPC', 'TP 모니터', 'ORB', 'MOM'], answer: 3,
        explain: 'MOM(메시지 지향 미들웨어)은 큐에 메시지를 쌓아 두므로 받는 쪽이 나중에 처리해도 된다. RPC와 ORB는 상대가 응답할 때까지 기다리는 동기 호출이 기본이다.' },
    ],
    resources: ['『소프트웨어 아키텍처 101』(Mark Richards, Neal Ford)', 'Martin Fowler, 「Microservices」 (martinfowler.com/articles/microservices.html)'],
  },
  {
    id:'se-uml', title: 'UML: 다이어그램 종류와 관계 표기',
    summary: R`UML은 설계를 그림으로 공유하는 표준 언어. <strong>구조</strong> 다이어그램(클래스·객체·컴포넌트·배치·패키지)과 <strong>행위</strong> 다이어그램(유스케이스·시퀀스·활동·상태 등)으로 나뉜다
클래스 사이 관계: 연관, 집합(빈 마름모), 합성(채운 마름모), 일반화(빈 삼각형 실선), 실체화(빈 삼각형 점선), 의존(점선 화살표)
유스케이스의 <strong>include</strong>는 항상 포함, <strong>extend</strong>는 조건에 따라 확장`,
    body: R`
<p>UML(Unified Modeling Language)은 시스템을 여러 관점에서 그리는 표준 표기법이다. 코드보다 추상적이라 설계를 빠르게 공유할 수 있다. 필기에서는 다이어그램 분류와 관계 기호를, 면접에서는 집합과 합성의 차이 같은 개념을 묻는다.</p>
<h3>다이어그램 분류</h3>
<table>
<tr><th>구분</th><th>다이어그램</th><th>무엇을 그리나</th></tr>
<tr><td rowspan="6">구조 (정적)</td><td>클래스</td><td>클래스의 속성·메서드와 클래스 사이 관계</td></tr>
<tr><td>객체</td><td>특정 시점의 객체(인스턴스)와 그 연결</td></tr>
<tr><td>컴포넌트</td><td>교체 가능한 소프트웨어 부품과 인터페이스</td></tr>
<tr><td>배치</td><td>물리적 서버·장치에 어떤 산출물이 놓이는지</td></tr>
<tr><td>패키지</td><td>요소들을 묶은 그룹과 그 의존 관계</td></tr>
<tr><td>복합 구조</td><td>클래스 내부 구조</td></tr>
<tr><td rowspan="7">행위 (동적)</td><td>유스케이스</td><td>사용자(액터)가 시스템으로 할 수 있는 일. 요구사항 분석 단계</td></tr>
<tr><td>시퀀스</td><td>객체들이 주고받는 메시지를 시간 순서로</td></tr>
<tr><td>커뮤니케이션</td><td>메시지 교환을 객체 간 연결 중심으로</td></tr>
<tr><td>활동</td><td>처리 흐름. 순서도와 비슷하며 병렬 흐름도 표현</td></tr>
<tr><td>상태</td><td>한 객체가 이벤트에 따라 상태를 바꾸는 과정</td></tr>
<tr><td>타이밍</td><td>시간 제약 아래 상태 변화</td></tr>
<tr><td>상호작용 개요</td><td>여러 상호작용 다이어그램의 흐름</td></tr>
</table>
<p>외우는 요령: 구조는 "무엇으로 이루어졌나", 행위는 "어떻게 움직이나"다. 이름에 상태·순서·흐름·상호작용의 느낌이 있으면 행위다.</p>
<h3>클래스 다이어그램</h3>
<p>상자를 세 칸으로 나눠 이름, 속성, 메서드를 쓴다. 접근 제어자는 기호로 표시한다: <strong>+</strong> public, <strong>−</strong> private, <strong>#</strong> protected, <strong>~</strong> package. 추상 클래스와 추상 메서드는 기울임꼴, 정적 멤버는 밑줄이다.</p>
<h3>관계 (필기 단골)</h3>
<table>
<tr><th>관계</th><th>표기</th><th>의미</th><th>예</th></tr>
<tr><td>연관</td><td>실선 (방향이 있으면 화살표)</td><td>한 클래스가 다른 클래스를 알고 참조한다</td><td>차 — 운전자</td></tr>
<tr><td>집합 (aggregation)</td><td>실선 + <strong>빈 마름모</strong>(전체 쪽)</td><td>전체와 부분, 부분이 독립적으로 존재</td><td>팀 ◇— 선수</td></tr>
<tr><td>합성 (composition)</td><td>실선 + <strong>채운 마름모</strong>(전체 쪽)</td><td>전체와 부분, 생명주기를 함께함</td><td>집 ◆— 방</td></tr>
<tr><td>일반화 (generalization)</td><td>실선 + 빈 삼각형(부모 쪽)</td><td>상속, is-a 관계</td><td>학생 —▷ 사람</td></tr>
<tr><td>실체화 (realization)</td><td>점선 + 빈 삼각형</td><td>인터페이스 구현</td><td>카드 ┈▷ 결제수단</td></tr>
<tr><td>의존 (dependency)</td><td>점선 화살표</td><td>잠깐 사용 (매개변수, 지역 변수)</td><td>운전자 ┈> 결제수단</td></tr>
</table>
<p>집합과 합성의 차이는 <strong>부분이 전체 없이 존재할 수 있는가</strong>다. 팀이 해체돼도 선수는 남지만, 집을 허물면 방도 사라진다. 코드로는 부분 객체를 밖에서 받아 오면 집합, 전체가 직접 만들고 밖에 노출하지 않으면 합성에 가깝다.</p>
<!--diagram-->
<!--code-->
<p>관계선 끝에는 <strong>다중성</strong>을 쓴다: 1(정확히 하나), 0..1(없거나 하나), *(0개 이상), 1..*(하나 이상). 고객 1 — * 주문은 고객 한 명이 주문을 여러 개 가질 수 있다는 뜻이다.</p>
<h3>유스케이스 다이어그램</h3>
<ul>
<li><strong>액터</strong>: 시스템 밖에서 시스템과 상호작용하는 사람이나 외부 시스템(졸라맨 모양).</li>
<li><strong>유스케이스</strong>: 액터가 얻는 기능 하나(타원).</li>
<li><strong>include</strong>(포함): 기본 유스케이스를 실행할 때 <strong>반드시</strong> 함께 실행된다. "송금"은 항상 "본인 인증"을 포함한다. 화살표는 기본 → 포함 유스케이스로.</li>
<li><strong>extend</strong>(확장): <strong>조건이 맞을 때만</strong> 추가로 실행된다. "상품 검색"에서 결과가 없으면 "추천 상품 보기"로 확장된다. 화살표는 확장 → 기본 유스케이스로.</li>
<li>시스템 경계는 사각형으로 그린다.</li>
</ul>
<h3>시퀀스 다이어그램</h3>
<p>위쪽에 객체를 나란히 두고, 아래로 내려가는 점선(<strong>생명선</strong>)이 시간 흐름이다. 객체가 일하는 동안은 생명선 위에 가는 직사각형(<strong>활성 구간</strong>)을 그린다. 실선 화살표는 메시지(호출), 점선 화살표는 응답이다. 반복은 loop, 조건은 alt·opt 같은 <strong>프레임</strong>(상자)으로 묶는다. 구성 요소는 액터, 객체, 생명선, 활성 구간, 메시지, 프레임이다(상태나 전이는 상태 다이어그램의 요소).</p>
<h3>상태와 활동 다이어그램</h3>
<p>상태 다이어그램은 시작(채운 원)에서 출발해 이벤트에 따라 상태 사이를 옮겨 가고 종료(테두리 있는 채운 원)에서 끝난다. 주문 객체라면 접수 → 결제 완료 → 배송 중 → 배송 완료. 활동 다이어그램은 작업의 흐름을 그리며, 마름모로 분기하고, 굵은 막대(포크·조인)로 병렬 흐름을 나누고 합친다. 담당자별로 영역을 나눈 것을 <strong>스윔레인</strong>이라 한다.</p>`,
    analogy: R`<p>UML은 건축 도면 세트와 같다. 평면도(클래스), 배관도(배치), 공정표(활동), 시공 순서도(시퀀스)처럼 같은 건물을 여러 장의 도면으로 나눠 그린다. 집합과 합성은 이렇게 기억한다. 자동차와 운전자(집합)는 헤어져도 각자 살지만, 자동차와 자동차 차체(합성)는 함께 폐차된다.</p>`,
    diagram: { caption: '클래스 다이어그램의 관계 기호. 마름모와 삼각형은 각각 전체 쪽, 부모 쪽에 붙는다. 빈 마름모는 집합, 채운 마름모는 합성, 점선은 구현이나 일시적 사용을 뜻한다.', svg: R`
<svg viewBox="0 0 560 250" width="560">
<rect class="n" x="20" y="15" width="90" height="30" rx="3"/><text x="65" y="30" class="sm">Car</text>
<rect class="n" x="250" y="15" width="90" height="30" rx="3"/><text x="295" y="30" class="sm">Driver</text>
<path class="a" d="M110,30 H248"/><text x="180" y="20" class="sm">연관</text><text x="420" y="30" class="st sm">연관: 참조한다</text>
<rect class="n" x="20" y="60" width="90" height="30" rx="3"/><text x="65" y="75" class="sm">Team</text>
<rect class="n" x="250" y="60" width="90" height="30" rx="3"/><text x="295" y="75" class="sm">Player</text>
<path class="e" d="M134,75 H250"/><polygon class="n" points="110,75 122,68 134,75 122,82"/><text x="420" y="75" class="st sm">집합: 부분이 따로 존재</text>
<rect class="n" x="20" y="105" width="90" height="30" rx="3"/><text x="65" y="120" class="sm">House</text>
<rect class="n" x="250" y="105" width="90" height="30" rx="3"/><text x="295" y="120" class="sm">Room</text>
<path class="e" d="M134,120 H250"/><polygon class="fill" points="110,120 122,113 134,120 122,127"/><text x="420" y="120" class="st sm">합성: 생명주기를 함께함</text>
<rect class="n" x="20" y="150" width="90" height="30" rx="3"/><text x="65" y="165" class="sm">Student</text>
<rect class="n" x="250" y="150" width="90" height="30" rx="3"/><text x="295" y="165" class="sm">Person</text>
<path class="e" d="M110,165 H236"/><polygon class="n" points="236,157 250,165 236,173"/><text x="420" y="165" class="st sm">일반화: 상속 (is-a)</text>
<rect class="n" x="20" y="195" width="90" height="30" rx="3"/><text x="65" y="210" class="sm">Card</text>
<rect class="n" x="250" y="195" width="90" height="30" rx="3"/><text x="295" y="204" class="sm">«interface»</text><text x="295" y="218" class="sm">Payable</text>
<path class="e d" d="M110,210 H236"/><polygon class="n" points="236,202 250,210 236,218"/><text x="420" y="210" class="st sm">실체화: 인터페이스 구현</text>
<path class="e d" d="M340,30 H380 V210 H352"/>
<path class="a" d="M352,210 H342"/>
<text x="395" y="240" class="sm">의존(점선 화살표): Driver가 결제 때 Payable을 잠깐 사용</text>
</svg>` },
    code: R`
from abc import ABC, abstractmethod

class Payable(ABC):                      # 인터페이스
  @abstractmethod
  def pay(self, amount): ...

class Card(Payable):                     # 실체화(realization): 인터페이스를 구현
  def pay(self, amount):
      return f"카드 {amount}원"

class Engine:
  pass

class Car:
  def __init__(self, driver):
      self.engine = Engine()           # 합성(composition): 차가 엔진을 만들고, 차와 함께 사라진다
      self.driver = driver             # 연관(association): 이미 있는 운전자를 참조
  def refuel(self, method: Payable):   # 의존(dependency): 메서드 안에서 잠깐 쓴다
      return method.pay(50000)

class Team:
  def __init__(self, members):
      self.members = list(members)     # 집합(aggregation): 팀이 없어져도 구성원은 남는다

class Person:
  pass

class Student(Person):                   # 일반화(generalization): 상속
  pass

kim = Student()
car = Car(kim)
team = Team([kim, Person()])
print(car.refuel(Card()))
del car, team
print('차와 팀이 사라져도 운전자는 남음:', isinstance(kim, Person))

for cls in (Car, Card, Student):
  print(cls.__name__, '→', [b.__name__ for b in cls.__mro__[1:-1]])
`,
    points: [
      R`구조(정적): 클래스, 객체, 컴포넌트, 배치, 패키지, 복합 구조`,
      R`행위(동적): 유스케이스, 시퀀스, 커뮤니케이션, 활동, 상태, 타이밍, 상호작용 개요`,
      R`관계: 연관(실선), 집합(빈 마름모), 합성(채운 마름모), 일반화(빈 삼각형 실선), 실체화(빈 삼각형 점선), 의존(점선 화살표)`,
      R`접근 제어: + public, − private, # protected, ~ package`,
      R`유스케이스: include(항상 포함), extend(조건부 확장). 시퀀스: 생명선, 활성 구간, 메시지, 프레임`,
    ],
    interview: [
      { q: '집합 관계와 합성 관계의 차이는요?', a: R`<p>둘 다 전체와 부분의 관계지만, 집합은 부분이 전체 없이도 독립적으로 존재할 수 있고, 합성은 전체가 사라지면 부분도 함께 사라진다. 팀과 선수는 집합, 집과 방은 합성이다. 표기는 전체 쪽에 집합은 빈 마름모, 합성은 채운 마름모를 붙인다.</p>` },
    ],
    types: ['UML'],
    links: [
      { to: 'pl-oop', why: '상속·구현·합성을 코드로' },
      { to: 'se-req', why: '유스케이스는 요구사항 분석 단계에서 그린다' },
      { to: 'se-pattern', why: '디자인 패턴은 대개 클래스 다이어그램으로 설명된다' },
      { to: 'db-er', why: 'ER 다이어그램과 클래스 다이어그램의 다중성 표기 비교' },
    ],
    quiz: [
      { q: '주문서가 삭제되면 그 안의 주문 항목도 함께 삭제되어야 한다. 주문서와 주문 항목의 관계로 알맞은 것은?',
        options: ['합성', '집합', '일반화', '의존'], answer: 0,
        explain: '부분이 전체 없이 존재할 수 없고 생명주기를 함께하므로 합성(채운 마름모)이다. 부분이 독립적으로 남을 수 있으면 집합(빈 마름모)이다.' },
      { q: "유스케이스 '로그인'에서 비밀번호를 다섯 번 틀린 경우에만 '계정 잠금'이 실행된다. 두 유스케이스의 관계는?",
        options: ['포함(include)', '일반화(generalization)', '확장(extend)', '연관(association)'], answer: 2,
        explain: '특정 조건에서만 추가로 실행되므로 확장이다. 포함은 기본 유스케이스를 실행할 때마다 반드시 함께 실행되는 경우다.' },
      { q: '클래스 다이어그램에서 멤버 앞에 붙은 ~ 기호가 뜻하는 접근 제어자는?',
        options: ['public', 'private', 'protected', 'package'], answer: 3,
        explain: '+ public, − private, # protected, ~ package다.' },
    ],
    resources: ['『UML Distilled』(Martin Fowler)', 'OMG UML 명세 (omg.org/spec/UML)'],
  },
  {
    id:'se-testlevel', title: '테스트 단계·통합 전략·커버리지',
    summary: R`<strong>V 모델</strong>: 요구사항 ↔ 인수 테스트, 분석 ↔ 시스템 테스트, 설계 ↔ 통합 테스트, 구현 ↔ 단위 테스트가 짝을 이룬다
통합 전략: <strong>하향식</strong>은 위에서부터 붙이며 아래를 <strong>스텁</strong>으로, <strong>상향식</strong>은 아래부터 붙이며 위를 <strong>드라이버</strong>로 대신한다
커버리지 강도: 구문 &lt; 결정(분기) &lt; 조건/결정 &lt; MC/DC &lt; 다중 조건. 조건 커버리지는 결정 커버리지를 보장하지 않는다`,
    body: R`
<p>테스트 기초 페이지가 "무엇을, 어떤 대역으로 시험할지"를 다뤘다면, 여기서는 개발 단계별로 언제 무엇을 시험하는지와 화이트박스 테스트의 강도를 재는 기준을 다룬다. 정보처리기사에서 해마다 나오는 영역이다.</p>
<h3>V 모델</h3>
<p>폭포수 모델의 각 개발 단계에 대응하는 테스트 단계를 짝지은 모델이다. 왼쪽으로 내려가며 만들고, 오른쪽으로 올라가며 확인한다.</p>
<table>
<tr><th>개발 단계</th><th>짝이 되는 테스트</th><th>확인하는 것</th></tr>
<tr><td>요구사항 정의</td><td>인수 테스트</td><td>사용자가 원한 것이 맞는가</td></tr>
<tr><td>시스템 분석</td><td>시스템 테스트</td><td>전체 시스템이 기능·비기능 요구를 만족하는가</td></tr>
<tr><td>설계</td><td>통합 테스트</td><td>모듈끼리 붙였을 때 인터페이스가 맞는가</td></tr>
<tr><td>구현</td><td>단위 테스트</td><td>모듈 하나가 명세대로 동작하는가</td></tr>
</table>
<p><strong>검증</strong>(verification)은 "제품을 올바르게 만들고 있는가"(명세에 맞는가), <strong>확인</strong>(validation)은 "올바른 제품을 만들고 있는가"(사용자가 원하는 것인가)다. 단위·통합 테스트는 검증, 인수 테스트는 확인에 가깝다.</p>
<!--diagram-->
<h3>인수 테스트의 종류</h3>
<ul>
<li><strong>알파 테스트</strong>: 개발자의 장소에서, 사용자가 개발자 앞에서 시험한다. 통제된 환경.</li>
<li><strong>베타 테스트</strong>: 사용자의 실제 환경에서 개발자 없이 시험하고 문제를 보고한다. 공개 베타가 예다.</li>
<li>그 밖에 사용자 인수, 운영상 인수(백업·복구 같은 운영 절차), 계약 인수, 규정 인수 테스트가 있다.</li>
</ul>
<h3>통합 테스트 전략</h3>
<table>
<tr><th>방식</th><th>순서</th><th>임시 모듈</th><th>특징</th></tr>
<tr><td>하향식</td><td>최상위 모듈 → 하위로 (깊이 우선 또는 너비 우선)</td><td><strong>스텁</strong>: 아직 없는 하위 모듈을 대신해 정해진 값을 돌려줌</td><td>주요 흐름과 설계 결함을 일찍 발견</td></tr>
<tr><td>상향식</td><td>최하위 모듈 → 상위로. 하위 모듈들을 <strong>클러스터</strong>로 묶어 시험</td><td><strong>드라이버</strong>: 아직 없는 상위 모듈 대신 시험 대상을 호출함</td><td>스텁이 필요 없고 하위 기능을 철저히 시험</td></tr>
<tr><td>빅뱅</td><td>모두 한꺼번에</td><td>없음</td><td>작은 시스템에만. 실패하면 원인을 찾기 어렵다</td></tr>
<tr><td>샌드위치</td><td>상위는 하향식, 하위는 상향식으로 동시에</td><td>둘 다</td><td>큰 시스템에서 병행</td></tr>
</table>
<p>통합 후에 기존 기능이 망가지지 않았는지 다시 돌리는 것이 <strong>회귀 테스트</strong>다. 수정이 있을 때마다 반복하므로 자동화 대상 1순위다.</p>
<h3>화이트박스: 커버리지 기준</h3>
<p>if (회원 and 금액 ≥ 30000)처럼 <strong>결정</strong>(분기 전체의 참·거짓) 하나에 <strong>조건</strong>(회원, 금액 ≥ 30000) 두 개가 있는 코드를 예로 든다.</p>
<table>
<tr><th>기준</th><th>요구 사항</th><th>예시 테스트</th></tr>
<tr><td>구문(문장)</td><td>모든 문장을 한 번 이상 실행</td><td>(회원, 5만) 하나로 충분</td></tr>
<tr><td>결정(분기)</td><td>각 결정이 참과 거짓을 한 번씩</td><td>(회원, 5만), (비회원, 5만)</td></tr>
<tr><td>조건</td><td>각 조건이 참과 거짓을 한 번씩</td><td>(회원, 1만), (비회원, 5만): 결정은 둘 다 거짓</td></tr>
<tr><td>조건/결정</td><td>조건과 결정을 모두 만족</td><td>(회원, 5만), (비회원, 1만)</td></tr>
<tr><td>MC/DC</td><td>여기에 더해 각 조건이 <strong>혼자서</strong> 결정 결과를 바꿈을 보임</td><td>(회원, 5만), (회원, 1만), (비회원, 5만)</td></tr>
<tr><td>다중 조건</td><td>조건 값의 모든 조합</td><td>2² = 4가지 전부</td></tr>
</table>
<p>세 번째 줄이 함정이다. 조건 커버리지는 각 조건을 참·거짓으로 만들지만, 결정은 한 번도 참이 되지 않을 수 있다. 그래서 조건 커버리지가 결정 커버리지를 포함하지 않는다. MC/DC는 조건이 n개일 때 보통 n + 1개의 테스트로 되며, 항공 소프트웨어 표준(DO-178C)이 요구한다.</p>
<!--code-->
<p>이 밖에 프로그램 흐름 그래프의 독립 경로를 모두 지나게 하는 <strong>기초 경로 검사</strong>(경로 수 = 맥케이브 순환 복잡도 V(G) = 간선 − 노드 + 2), 변수의 정의와 사용 위치를 따라가는 <strong>데이터 흐름 검사</strong>, 반복문을 0번·1번·여러 번 도는 <strong>루프 검사</strong>가 있다.</p>
<h3>블랙박스 기법 정리</h3>
<ul>
<li><strong>동등 분할</strong>, <strong>경계값 분석</strong>: 테스트 기초 페이지 참고. 경계값은 경계 바로 아래·경계·바로 위(29,999 / 30,000 / 30,001).</li>
<li><strong>결정 테이블</strong>: 조건 조합과 그에 따른 동작을 표로 만들어 각 열을 테스트로 쓴다.</li>
<li><strong>원인-결과 그래프</strong>: 입력(원인)과 출력(결과)의 논리 관계를 그래프로 그려 결정 테이블을 만든다.</li>
<li><strong>상태 전이</strong>: 상태와 이벤트의 전이를 모두 지나도록 설계한다(로그인 실패 3회 → 잠금).</li>
<li><strong>페어와이즈</strong>: 모든 조합 대신 변수 두 개씩의 조합이 한 번 이상 나오게 해 테스트 수를 크게 줄인다.</li>
<li><strong>오류 예측</strong>: 경험으로 오류가 날 만한 곳을 짐작한다. <strong>비교 검사</strong>: 같은 입력을 여러 버전에 넣어 결과를 비교한다.</li>
</ul>
<h3>테스트 오라클과 원리</h3>
<p>테스트 결과가 맞는지 판단하는 기준이 <strong>오라클</strong>이다. 모든 입력에 정답을 주는 참 오라클, 일부만 주는 샘플링 오라클, 대략적인 범위만 확인하는 추정(휴리스틱) 오라클, 이전 버전과 비교하는 일관성 검사 오라클이 있다.</p>
<p>테스트의 원리도 단골이다. 테스트는 결함이 <strong>있음</strong>을 보일 뿐 없음을 증명하지 못한다. 완벽한 테스트는 불가능하다. 결함은 일부 모듈에 몰린다(<strong>결함 집중</strong>, 파레토 법칙). 같은 테스트만 반복하면 새 결함을 못 찾는다(<strong>살충제 패러독스</strong>). 결함을 다 고쳐도 사용자 요구에 맞지 않으면 소용없다(<strong>오류-부재의 궤변</strong>).</p>
<h3>검토와 프로세스 성숙도</h3>
<p>코드를 실행하지 않고 산출물을 사람이 읽어 결함을 찾는 정적 검토도 있다. <strong>워크스루</strong>는 검토 자료를 회의 전에 배포하고 짧은 회의로 오류를 일찍 찾는 비공식 검토다. <strong>인스펙션</strong>은 훈련된 중재자가 이끌고 체크리스트와 역할을 정해 진행하는 가장 공식적인 검토다.</p>
<p>조직의 개발 프로세스 성숙도는 <strong>CMMI</strong> 5단계로 평가한다: 1 초기(Initial, 개인 역량에 의존) → 2 관리(Managed, 프로젝트별 관리) → 3 정의(Defined, 조직 표준 프로세스) → 4 정량적 관리(Quantitatively Managed, 수치로 통제) → 5 최적화(Optimizing, 지속적 개선). 국제 표준 프로세스 평가 모델로는 <strong>SPICE</strong>(ISO/IEC 15504)가 있다.</p>
<h3>품질 특성 (ISO/IEC 25010)</h3>
<p>기능 적합성, 성능 효율성, 호환성, 사용성, 신뢰성, 보안성, 유지보수성, 이식성의 8가지다. 이전 표준인 ISO 9126은 기능성, 신뢰성, 사용성, 효율성, 유지보수성, 이식성의 6가지였다. 시스템 테스트는 기능뿐 아니라 이 비기능 특성들(성능, 부하, 보안, 복구)도 시험한다.</p>`,
    analogy: R`<p>자동차 공장을 떠올리면 된다. 볼트와 브레이크를 따로 검사하는 것이 단위 테스트, 브레이크를 바퀴에 달아 함께 움직여 보는 것이 통합 테스트, 완성차를 시험 주행장에서 모는 것이 시스템 테스트, 고객이 시승해 보고 사기로 하는 것이 인수 테스트다. 아직 바퀴가 없을 때 바퀴 자리에 끼워 두는 모형이 스텁, 아직 운전석이 없을 때 브레이크를 대신 밟아 주는 장치가 드라이버다.</p>`,
    diagram: { caption: 'V 모델. 왼쪽 개발 단계마다 오른쪽에 짝이 되는 테스트가 있다. 위로 갈수록 더 큰 범위를 사용자 관점에서 시험한다.', svg: R`
<svg viewBox="0 0 560 230" width="560">
<rect class="n" x="20" y="20" width="130" height="34" rx="4"/><text x="85" y="37" class="sm">요구사항 정의</text>
<rect class="n" x="60" y="70" width="130" height="34" rx="4"/><text x="125" y="87" class="sm">시스템 분석</text>
<rect class="n" x="100" y="120" width="110" height="34" rx="4"/><text x="155" y="137" class="sm">설계</text>
<rect class="h" x="215" y="180" width="130" height="34" rx="4"/><text x="280" y="197" class="sm">구현 (코딩)</text>
<rect class="n" x="350" y="120" width="110" height="34" rx="4"/><text x="405" y="137" class="sm">통합 테스트</text>
<rect class="n" x="370" y="70" width="130" height="34" rx="4"/><text x="435" y="87" class="sm">시스템 테스트</text>
<rect class="n" x="410" y="20" width="130" height="34" rx="4"/><text x="475" y="37" class="sm">인수 테스트</text>
<path class="a" d="M85,54 L110,68"/>
<path class="a" d="M125,104 L150,118"/>
<path class="a" d="M155,154 L230,178"/>
<path class="a" d="M330,178 L405,156"/>
<path class="a" d="M410,120 L435,106"/>
<path class="a" d="M450,70 L475,56"/>
<path class="e d" d="M150,37 H410"/>
<path class="e d" d="M190,87 H370"/>
<path class="e d" d="M210,137 H350"/>
<text x="280" y="27" class="sm">사용자가 원한 것인가</text>
<text x="280" y="77" class="sm">명세를 만족하는가</text>
<text x="280" y="127" class="sm">인터페이스가 맞는가</text>
<text x="400" y="197" class="sm">단위 테스트</text>
</svg>` },
    code: R`
from itertools import product

def discount(member, amount):            # 결정문 하나, 조건 두 개
  rate = 0
  if member and amount >= 30000:
      rate = 10
  return rate

def coverage(tests):
  decisions, conds = set(), {'member': set(), 'big': set()}
  for member, amount in tests:
      big = amount >= 30000
      decisions.add(member and big)
      conds['member'].add(member)
      conds['big'].add(big)
  return {'결정(분기)': len(decisions) == 2,
          '조건': all(len(v) == 2 for v in conds.values())}

suites = {
  'A: (T, 50000)':                [(True, 50000)],                    # 모든 문장 실행 → 구문 커버리지
  'B: (T, 50000), (F, 50000)':    [(True, 50000), (False, 50000)],
  'C: (T, 10000), (F, 50000)':    [(True, 10000), (False, 50000)],
  'D: (T,50000), (T,10000), (F,50000)': [(True, 50000), (True, 10000), (False, 50000)],
}
for name, tests in suites.items():
  print(f"{name:38}", coverage(tests))
# C는 조건 커버리지를 만족하지만 결정은 늘 거짓 → 조건 커버리지가 결정 커버리지를 보장하지 않는다
# D는 MC/DC: 각 조건이 혼자 결과를 바꾸는 쌍이 있다 (1↔2: amount, 1↔3: member)

print('다중 조건 커버리지:', [(m, a) for m, a in product([True, False], [50000, 10000])])
for amount in (29999, 30000, 30001):     # 경계값: 바로 아래, 경계, 바로 위
  print(amount, discount(True, amount))
`,
    points: [
      R`V 모델: 요구사항 ↔ 인수, 분석 ↔ 시스템, 설계 ↔ 통합, 구현 ↔ 단위 테스트`,
      R`알파(개발자 환경, 개발자 입회) vs 베타(사용자 환경, 개발자 없이)`,
      R`하향식 통합 = 스텁, 상향식 통합 = 드라이버(클러스터). 회귀 테스트`,
      R`커버리지: 구문 < 결정 < 조건/결정 < MC/DC < 다중 조건. 조건 커버리지 ⊅ 결정 커버리지`,
      R`순환 복잡도 V(G) = 간선 − 노드 + 2 (= 분기 수 + 1)`,
      R`테스트 원리: 결함 집중(파레토), 살충제 패러독스, 오류-부재의 궤변. 워크스루(비공식) vs 인스펙션(공식)`,
      R`CMMI: 초기 → 관리 → 정의 → 정량적 관리 → 최적화. ISO 25010 품질 특성 8가지`,
    ],
    interview: [
      { q: '하향식과 상향식 통합 테스트의 차이는요?', a: R`<p>하향식은 최상위 모듈부터 아래로 붙여 가며, 아직 없는 하위 모듈을 정해진 값을 돌려주는 스텁으로 대신한다. 주요 흐름의 결함을 일찍 찾는다. 상향식은 최하위 모듈부터 묶어 올라가며, 아직 없는 상위 모듈 대신 시험 대상을 호출하는 드라이버를 쓴다.</p>` },
      { q: '코드 커버리지 100%면 버그가 없나요?', a: R`<p>아니다. 커버리지는 코드가 실행되었는지만 보여 줄 뿐 결과를 제대로 검사했는지는 알려 주지 않는다. 구문 커버리지 100%여도 조건 조합이나 경계값, 명세에서 빠진 기능의 결함은 남을 수 있다. 커버리지는 시험하지 않은 곳을 찾는 도구로 쓴다.</p>` },
    ],
    types: ['테스트 단계', '품질 관리'],
    links: [
      { to: 'se-test', why: '동등 분할·경계값, 테스트 대역(스텁·목), 테스트 피라미드' },
      { to: 'se-process', why: 'V 모델은 폭포수 모델에 테스트 단계를 짝지은 것' },
      { to: 'se-principle', why: '모듈이 잘 나뉘어 있어야 단위·통합 테스트가 쉽다' },
      { to: 'se-cicd', why: '회귀 테스트를 매 변경마다 자동으로 돌리는 곳' },
      { to: 'se-req', why: '인수 테스트의 기준이 되는 요구사항과 품질 특성' },
    ],
    quiz: [
      { q: '상향식 통합 테스트에서 아직 개발되지 않은 상위 모듈을 대신해 시험 대상 모듈을 호출하는 임시 프로그램은?',
        options: ['테스트 스텁', '테스트 드라이버', '테스트 오라클', '목(mock) 객체'], answer: 1,
        explain: '상향식은 하위 모듈부터 시험하므로 그것을 불러 줄 상위가 필요하다. 그 역할이 드라이버다. 하향식에서 아직 없는 하위 모듈을 대신하는 것이 스텁이다.' },
      { q: 'if (x > 0 || y > 0) 결정에 대해 (x=5, y=−1), (x=−2, y=3) 두 테스트를 실행했다. 만족하는 커버리지는?',
        options: ['조건 커버리지만 만족한다', '결정 커버리지와 조건 커버리지 모두 만족한다', '결정 커버리지만 만족한다', '구문 커버리지도 만족하지 못한다'], answer: 0,
        explain: '각 조건은 참·거짓을 한 번씩 가졌다(x > 0: 참, 거짓 / y > 0: 거짓, 참). 그러나 OR 결정은 두 번 다 참이라 거짓 분기를 실행하지 않았으므로 결정 커버리지는 만족하지 못한다.' },
      { q: '개발자가 참여하지 않고 실제 사용자 환경에서 사용자가 직접 시험하며 문제를 보고하는 인수 테스트는?',
        options: ['알파 테스트', '회귀 테스트', '베타 테스트', '통합 테스트'], answer: 2,
        explain: '알파 테스트는 개발자의 장소에서 개발자가 지켜보는 가운데 하고, 베타 테스트는 사용자의 실제 환경에서 개발자 없이 한다.' },
    ],
    resources: ['ISTQB Foundation Level 실러버스 (istqb.org)', '『소프트웨어 테스팅 기법』(Lee Copeland)'],
  },
  {
    id:'se-newtech', title: 'IT 신기술 용어 정리',
    summary: R`정보처리기사 필기·실기에 해마다 나오는 신기술 용어를 분야별로 묶었다: 네트워크·IoT, 클라우드·인프라, 데이터·블록체인, 보안, AI, 개발 트렌드
용어는 <strong>한 줄 정의 + 무엇과 구별되는지</strong>로 외운다. 예: 엣지 컴퓨팅(기기 가까이) vs 포그 컴퓨팅(기기와 클라우드 사이 층)
단어의 구성(Software Defined, Zero Trust, Digital Twin)을 풀어 읽으면 정의가 대부분 따라 나온다`,
    body: R`
<p>신기술 용어는 개념이 깊지 않은 대신 범위가 넓다. 시험에서는 정의를 주고 용어를 고르게 하거나, 비슷한 용어 사이의 차이를 묻는다. 면접에서는 자기 분야와 관련된 용어(엣지 컴퓨팅, 연합 학습, 제로 트러스트 등)를 설명할 수 있는지 본다.</p>
<h3>네트워크와 IoT</h3>
<table>
<tr><th>용어</th><th>정의</th></tr>
<tr><td>SDN</td><td>네트워크 장비의 제어 기능(경로 결정)과 전달 기능을 분리하고, 제어를 소프트웨어 컨트롤러가 중앙에서 프로그래밍한다</td></tr>
<tr><td>NFV</td><td>라우터, 방화벽 같은 전용 장비의 기능을 일반 서버 위 가상 머신의 소프트웨어로 구현한다</td></tr>
<tr><td>엣지 컴퓨팅</td><td>데이터가 생기는 기기나 그 가까이에서 처리해 지연과 전송량을 줄인다. 자율주행, 공장 설비</td></tr>
<tr><td>포그 컴퓨팅</td><td>기기와 클라우드 사이에 중간 처리 층(게이트웨이, 지역 서버)을 둔다</td></tr>
<tr><td>메시 네트워크</td><td>노드들이 그물처럼 서로 연결되어 데이터를 중계한다. 한 노드가 죽어도 우회 가능</td></tr>
<tr><td>MQTT</td><td>발행-구독 방식의 가벼운 IoT 메시지 프로토콜. 브로커를 거쳐 전달</td></tr>
<tr><td>CoAP</td><td>제약이 많은 IoT 기기용으로 HTTP를 가볍게 만든 웹 프로토콜. UDP 기반</td></tr>
<tr><td>지그비 (Zigbee)</td><td>저전력·저속 근거리 무선 통신(IEEE 802.15.4). 스마트홈 센서</td></tr>
<tr><td>LPWAN (LoRa 등)</td><td>적은 전력으로 수 km 이상 멀리 보내는 저속 무선 통신. 원격 검침</td></tr>
<tr><td>NFC / 비콘</td><td>10cm 이내 근거리 통신(교통카드, 결제) / BLE로 주변 기기에 신호를 뿌려 위치 기반 서비스 제공</td></tr>
<tr><td>WBAN</td><td>몸에 붙이거나 이식한 센서들로 이루어진 무선 신체 영역 네트워크. 헬스케어</td></tr>
<tr><td>네트워크 슬라이싱</td><td>5G에서 하나의 물리 망을 용도별(초저지연, 대용량, 대규모 IoT) 가상 망으로 나눈다</td></tr>
</table>
<!--diagram-->
<h3>클라우드와 인프라</h3>
<p>클라우드 서비스는 제공자가 어디까지 관리해 주느냐로 나뉜다. <strong>IaaS</strong>는 서버·스토리지·네트워크 같은 인프라를(AWS EC2), <strong>PaaS</strong>는 운영체제·런타임까지 갖춘 개발·실행 플랫폼을(Heroku, Google App Engine), <strong>SaaS</strong>는 완성된 소프트웨어를(Gmail, Office 365) 빌려준다.</p>
<figure class="diagram"><svg viewBox="0 0 560 250" width="560"><text x="88" y="14">온프레미스</text><rect class="h" x="30" y="26" width="116" height="28" rx="4"/><text x="88.0" y="40.0" class="sm">애플리케이션</text><rect class="h" x="30" y="58" width="116" height="28" rx="4"/><text x="88.0" y="72.0" class="sm">데이터</text><rect class="h" x="30" y="90" width="116" height="28" rx="4"/><text x="88.0" y="104.0" class="sm">런타임·미들웨어</text><rect class="h" x="30" y="122" width="116" height="28" rx="4"/><text x="88.0" y="136.0" class="sm">운영체제</text><rect class="h" x="30" y="154" width="116" height="28" rx="4"/><text x="88.0" y="168.0" class="sm">가상화</text><rect class="h" x="30" y="186" width="116" height="28" rx="4"/><text x="88.0" y="200.0" class="sm">서버·저장장치</text><text x="218" y="14">IaaS</text><rect class="h" x="160" y="26" width="116" height="28" rx="4"/><text x="218.0" y="40.0" class="sm">애플리케이션</text><rect class="h" x="160" y="58" width="116" height="28" rx="4"/><text x="218.0" y="72.0" class="sm">데이터</text><rect class="h" x="160" y="90" width="116" height="28" rx="4"/><text x="218.0" y="104.0" class="sm">런타임·미들웨어</text><rect class="h" x="160" y="122" width="116" height="28" rx="4"/><text x="218.0" y="136.0" class="sm">운영체제</text><rect class="g" x="160" y="154" width="116" height="28" rx="4"/><text x="218.0" y="168.0" class="sm">가상화</text><rect class="g" x="160" y="186" width="116" height="28" rx="4"/><text x="218.0" y="200.0" class="sm">서버·저장장치</text><text x="348" y="14">PaaS</text><rect class="h" x="290" y="26" width="116" height="28" rx="4"/><text x="348.0" y="40.0" class="sm">애플리케이션</text><rect class="h" x="290" y="58" width="116" height="28" rx="4"/><text x="348.0" y="72.0" class="sm">데이터</text><rect class="g" x="290" y="90" width="116" height="28" rx="4"/><text x="348.0" y="104.0" class="sm">런타임·미들웨어</text><rect class="g" x="290" y="122" width="116" height="28" rx="4"/><text x="348.0" y="136.0" class="sm">운영체제</text><rect class="g" x="290" y="154" width="116" height="28" rx="4"/><text x="348.0" y="168.0" class="sm">가상화</text><rect class="g" x="290" y="186" width="116" height="28" rx="4"/><text x="348.0" y="200.0" class="sm">서버·저장장치</text><text x="478" y="14">SaaS</text><rect class="g" x="420" y="26" width="116" height="28" rx="4"/><text x="478.0" y="40.0" class="sm">애플리케이션</text><rect class="g" x="420" y="58" width="116" height="28" rx="4"/><text x="478.0" y="72.0" class="sm">데이터</text><rect class="g" x="420" y="90" width="116" height="28" rx="4"/><text x="478.0" y="104.0" class="sm">런타임·미들웨어</text><rect class="g" x="420" y="122" width="116" height="28" rx="4"/><text x="478.0" y="136.0" class="sm">운영체제</text><rect class="g" x="420" y="154" width="116" height="28" rx="4"/><text x="478.0" y="168.0" class="sm">가상화</text><rect class="g" x="420" y="186" width="116" height="28" rx="4"/><text x="478.0" y="200.0" class="sm">서버·저장장치</text><rect class="h" x="140" y="226" width="14" height="14" rx="3"/><text x="160" y="233" class="sm st">사용자가 관리</text><rect class="g" x="290" y="226" width="14" height="14" rx="3"/><text x="310" y="233" class="sm st">제공자가 관리</text></svg><figcaption>클라우드 서비스 모델별 관리 범위. 오른쪽으로 갈수록 제공자가 더 많은 층을 맡고, 사용자는 위쪽 일부만 관리한다.</figcaption></figure>
<table>
<tr><th>용어</th><th>정의</th></tr>
<tr><td>서버리스 (FaaS)</td><td>서버를 관리하지 않고 함수 단위로 올려, 호출될 때만 실행하고 그만큼만 비용을 낸다</td></tr>
<tr><td>멀티 클라우드 / 하이브리드 클라우드</td><td>여러 클라우드 제공자를 함께 씀 / 퍼블릭과 프라이빗(사내) 클라우드를 섞어 씀</td></tr>
<tr><td>SDDC</td><td>소프트웨어 정의 데이터센터. 컴퓨팅, 스토리지, 네트워크를 모두 가상화해 소프트웨어로 관리</td></tr>
<tr><td>HCI</td><td>하이퍼 컨버지드 인프라. 서버, 스토리지, 네트워크를 한 장비에 통합하고 소프트웨어로 묶는다</td></tr>
<tr><td>DAS / NAS / SAN</td><td>서버에 직접 연결한 저장장치 / 네트워크(LAN)로 파일 단위 공유 / 전용 고속망(광채널)으로 블록 단위 공유</td></tr>
<tr><td>컨테이너</td><td>운영체제 커널을 공유하면서 애플리케이션과 라이브러리를 묶어 격리된 공간에서 실행한다(Docker). 게스트 OS를 통째로 띄우는 가상 머신보다 가볍고 빠르다. 여러 컨테이너의 배치·확장은 쿠버네티스가 관리한다</td></tr>
<tr><td>IaC</td><td>코드형 인프라. 서버·네트워크 구성을 코드로 작성해 버전 관리하고 자동으로 만든다(Terraform)</td></tr>
</table>
<h3>데이터와 블록체인</h3>
<table>
<tr><th>용어</th><th>정의</th></tr>
<tr><td>빅데이터 3V</td><td>규모(Volume), 속도(Velocity), 다양성(Variety). 여기에 정확성(Veracity), 가치(Value)를 더해 5V</td></tr>
<tr><td>하둡 / 맵리듀스</td><td>여러 서버에 데이터를 나눠 저장(HDFS)하고 처리하는 오픈소스 프레임워크 / 데이터를 쪼개 병렬 처리(Map)한 뒤 합치는(Reduce) 모델</td></tr>
<tr><td>스파크</td><td>중간 결과를 메모리에 두어 맵리듀스보다 빠른 분산 처리 엔진</td></tr>
<tr><td>디지털 트윈</td><td>실제 사물·공정을 가상 공간에 똑같이 만들어 실시간 데이터로 동기화하고 시뮬레이션한다</td></tr>
<tr><td>마이데이터</td><td>개인이 기관에 흩어진 자기 정보를 내려받거나 원하는 곳으로 옮기도록 하는 제도</td></tr>
<tr><td>블록체인</td><td>거래 기록을 블록으로 묶어 이전 블록의 해시로 사슬처럼 연결하고, 여러 참여자가 나눠 보관하는 분산 원장</td></tr>
<tr><td>합의 알고리즘</td><td>분산 원장의 다음 블록을 정하는 규칙. 작업 증명(PoW, 계산 경쟁), 지분 증명(PoS, 보유량 기반)</td></tr>
<tr><td>스마트 컨트랙트</td><td>조건이 충족되면 블록체인 위에서 자동으로 실행되는 계약 코드</td></tr>
<tr><td>하이퍼레저 패브릭</td><td>허가된 참여자만 쓰는 기업용(프라이빗) 블록체인 플랫폼</td></tr>
</table>
<h3>보안</h3>
<table>
<tr><th>용어</th><th>정의</th></tr>
<tr><td>제로 트러스트</td><td>"내부는 안전하다"는 가정을 버리고 모든 사용자·기기·요청을 매번 인증하고 최소 권한만 준다</td></tr>
<tr><td>SIEM</td><td>여러 보안 장비·서버의 로그를 모아 연관 분석하고 위협을 탐지한다</td></tr>
<tr><td>SOAR</td><td>보안 경보에 대한 대응 절차를 자동화(플레이북)하고 조율한다</td></tr>
<tr><td>EDR</td><td>PC·서버 같은 단말에서 행위를 기록·분석해 위협을 탐지하고 대응한다</td></tr>
<tr><td>FIDO</td><td>비밀번호 대신 생체 인식이나 보안 키로 인증하는 표준. 서버에는 공개키만 저장</td></tr>
<tr><td>CC 인증 / ISMS-P</td><td>정보보호 제품의 보안 기능을 평가하는 국제 공통 평가 기준 / 국내 정보보호 및 개인정보보호 관리체계 인증</td></tr>
<tr><td>양자 암호 통신 (QKD)</td><td>도청하면 양자 상태가 바뀌는 성질을 이용해 안전하게 키를 나눠 갖는다</td></tr>
</table>
<h3>AI</h3>
<table>
<tr><th>용어</th><th>정의</th></tr>
<tr><td>연합 학습</td><td>데이터를 한곳에 모으지 않고 각 기기에서 학습한 뒤 모델 갱신값만 모아 합친다. 개인정보 보호</td></tr>
<tr><td>XAI</td><td>설명 가능한 AI. 모델이 왜 그런 결정을 했는지 사람이 이해할 수 있게 한다(SHAP, LIME)</td></tr>
<tr><td>AutoML</td><td>모델 선택, 하이퍼파라미터 탐색 같은 머신러닝 과정을 자동화한다</td></tr>
<tr><td>할루시네이션</td><td>생성형 AI가 사실이 아니거나 근거 없는 내용을 그럴듯하게 만들어 내는 현상. 검색 결과를 근거로 주는 RAG로 줄인다</td></tr>
<tr><td>온디바이스 AI</td><td>클라우드를 거치지 않고 스마트폰 같은 기기 안에서 모델을 실행한다</td></tr>
<tr><td>생성형 AI / 파운데이션 모델</td><td>학습한 분포에서 새 텍스트·이미지를 만들어 내는 AI / 대규모 데이터로 사전 학습해 여러 작업에 맞춰 쓰는 큰 모델</td></tr>
<tr><td>뉴로모픽 칩</td><td>뇌의 뉴런·시냅스 구조를 모방해 적은 전력으로 신경망을 처리하는 반도체</td></tr>
</table>
<h3>개발과 업무 트렌드</h3>
<table>
<tr><th>용어</th><th>정의</th></tr>
<tr><td>RPA</td><td>사람이 하던 규칙적인 화면 작업(복사, 입력, 클릭)을 소프트웨어 로봇이 자동으로 한다</td></tr>
<tr><td>로우코드 / 노코드</td><td>코드를 적게 또는 전혀 쓰지 않고 화면에서 끌어다 놓아 앱을 만든다</td></tr>
<tr><td>매시업</td><td>여러 웹 서비스의 API를 조합해 새 서비스를 만든다(지도 + 부동산 정보)</td></tr>
<tr><td>DevSecOps</td><td>개발·운영 흐름의 모든 단계에 보안 점검을 자동으로 넣는다</td></tr>
<tr><td>메타버스</td><td>현실처럼 사회·경제 활동을 할 수 있는 3차원 가상 세계</td></tr>
<tr><td>디지털 포렌식</td><td>디지털 기기에서 법적 증거를 수집·분석하는 절차. 무결성 유지가 핵심</td></tr>
</table>
<h3>공부하는 방법</h3>
<p>비슷한 것끼리 짝지어 차이로 외운다: 엣지와 포그, SDN과 NFV, NAS와 SAN, SIEM과 SOAR, PoW와 PoS. 새 용어가 나오면 영어 약자를 풀어 보고 그 기술이 어떤 문제를 풀려고 나왔는지 한 문장으로 적어 둔다. 최신 기출 용어는 해마다 바뀌므로 시험 직전 회차의 기출 해설로 보충한다.</p>
<!--code-->`,
    analogy: R`<p>신기술 용어는 새로 생긴 동네 가게 이름과 같다. 이름(약자)만 들으면 낯설지만 간판을 풀어 읽으면 무엇을 파는지 대개 짐작된다. Software Defined Network는 "소프트웨어로 정의하는 네트워크", Zero Trust는 "아무도 믿지 않음"이다. 낯선 약자를 만나면 먼저 풀어 읽는 습관이 암기량을 크게 줄인다.</p>`,
    diagram: { caption: '데이터를 어디서 처리하느냐에 따른 구분. 기기 가까이로 내려올수록 지연이 줄고, 클라우드로 올라갈수록 계산 자원이 커진다.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<rect class="h" x="170" y="15" width="220" height="44" rx="8"/><text x="280" y="30">클라우드</text><text x="280" y="47" class="sm">큰 자원, 긴 지연, 전체 학습·분석</text>
<rect class="n" x="140" y="85" width="280" height="44" rx="8"/><text x="280" y="100">포그 (중간 층)</text><text x="280" y="117" class="sm">게이트웨이·지역 서버에서 모아 걸러 냄</text>
<rect class="n" x="40" y="160" width="130" height="44" rx="8"/><text x="105" y="175">엣지 기기</text><text x="105" y="192" class="sm">자율주행차</text>
<rect class="n" x="215" y="160" width="130" height="44" rx="8"/><text x="280" y="175">엣지 기기</text><text x="280" y="192" class="sm">공장 센서</text>
<rect class="n" x="390" y="160" width="130" height="44" rx="8"/><text x="455" y="175">엣지 기기</text><text x="455" y="192" class="sm">스마트폰 (온디바이스 AI)</text>
<path class="a" d="M105,160 L200,131"/>
<path class="a" d="M280,160 V131"/>
<path class="a" d="M455,160 L360,131"/>
<path class="a" d="M280,85 V61"/>
<path class="e d" d="M540,30 V200"/><text x="535" y="20" class="sm">지연 ↑</text><text x="535" y="212" class="sm">지연 ↓</text>
</svg>` },
    code: R`
import random

cards = {
  'SDN': '네트워크 제어 기능을 장비에서 떼어 소프트웨어 컨트롤러로 중앙 관리',
  '엣지 컴퓨팅': '데이터가 생기는 곳 가까이에서 처리해 지연과 전송량을 줄임',
  '디지털 트윈': '실제 사물을 가상 공간에 똑같이 만들어 시뮬레이션',
  '제로 트러스트': '내부망도 믿지 않고 모든 접근을 매번 검증',
  '연합 학습': '데이터를 모으지 않고 각 기기에서 학습한 모델 갱신값만 모음',
  'RPA': '사람이 하던 반복적인 화면 작업을 소프트웨어 로봇이 자동화',
  'MQTT': '발행-구독 방식의 가벼운 IoT 메시지 프로토콜',
  '스마트 컨트랙트': '조건이 맞으면 블록체인 위에서 자동 실행되는 계약 코드',
}

def drill(cards, n, seed):
  rng = random.Random(seed)
  for term in rng.sample(list(cards), n):
      meaning = cards[term]
      wrong = rng.sample([m for t, m in cards.items() if t != term], 2)
      options = wrong + [meaning]
      rng.shuffle(options)
      print(f"Q. {term}")
      for i, o in enumerate(options, 1):
          print(f"   {i}) {o}")
      print(f"   정답: {options.index(meaning) + 1}")

drill(cards, 3, seed=2)
`,
    points: [
      R`클라우드: IaaS(인프라), PaaS(플랫폼: OS·런타임), SaaS(완성 소프트웨어). 서버리스(FaaS)`,
      R`컨테이너(커널 공유, 가벼움) vs 가상 머신(게스트 OS 포함)`,
      R`엣지(기기 가까이) vs 포그(기기와 클라우드 사이) / SDN(제어 분리) vs NFV(장비 기능 가상화)`,
      R`블록체인: 해시로 연결된 블록 + 분산 원장, 합의(PoW, PoS), 퍼블릭·프라이빗·컨소시엄`,
      R`디지털 트윈, 메타버스, 할루시네이션, 연합 학습, 제로 트러스트`,
    ],
    interview: [
      { q: '컨테이너와 가상 머신의 차이는요?', a: R`<p>가상 머신은 하이퍼바이저 위에 게스트 운영체제를 통째로 올려 격리가 강하지만 무겁고 부팅이 느리다. 컨테이너는 호스트 커널을 공유하고 애플리케이션과 라이브러리만 묶어 격리하므로 가볍고 빨리 뜨며 같은 이미지를 어디서나 똑같이 실행할 수 있다. 대신 커널을 공유해 격리 수준은 가상 머신보다 약하다.</p>` },
    ],
    types: ['신기술'],
    links: [
      { to: 'os-virtual', why: '클라우드, 컨테이너, SDN·NFV의 바탕인 가상화' },
      { to: 'sec-hash', why: '블록체인이 블록을 잇는 해시 사슬' },
      { to: 'sec-access', why: '제로 트러스트와 최소 권한 원칙' },
      { to: 'net-messaging', why: 'MQTT 같은 발행-구독 메시징' },
      { to: 'ai-mlops', why: '온디바이스 추론, 모델 배포와 운영' },
    ],
    quiz: [
      { q: '네트워크 장비의 경로 제어 기능을 데이터 전달 기능과 분리해 중앙의 소프트웨어 컨트롤러가 프로그래밍하는 기술은?',
        options: ['NFV', 'SDN', '네트워크 슬라이싱', '메시 네트워크'], answer: 1,
        explain: 'SDN은 제어 평면을 장비에서 떼어 중앙화한다. NFV는 전용 장비의 기능 자체를 범용 서버 위 소프트웨어로 옮기는 것이라 초점이 다르다. 둘은 함께 쓰이는 경우가 많다.' },
      { q: '병원들이 환자 데이터를 밖으로 보내지 않고 각자 모델을 학습한 뒤 갱신값만 모아 공동 모델을 만드는 방식은?',
        options: ['전이 학습', 'AutoML', '연합 학습', '앙상블 학습'], answer: 2,
        explain: '데이터는 각 기관에 두고 모델 갱신값(가중치 변화)만 중앙에서 합치는 것이 연합 학습이다. 전이 학습은 다른 작업에서 학습한 모델을 가져와 다시 맞추는 것이다.' },
      { q: '"사내망 안에 있다는 이유로 신뢰하지 않고, 모든 접근 요청을 매번 인증·검증한다"는 보안 모델은?',
        options: ['심층 방어 전략', 'DMZ', '최소 권한 원칙', '제로 트러스트'], answer: 3,
        explain: '제로 트러스트는 경계 안팎을 구분하지 않고 매 요청을 검증한다. 최소 권한은 그 안에서 쓰는 원칙 하나이고, 심층 방어는 여러 겹의 방어를 두는 전략이다.' },
    ],
    resources: ['한국정보통신기술협회(TTA) 정보통신용어사전 (terms.tta.or.kr)', '정보처리기사 최근 회차 기출 해설의 신기술 용어 부분'],
  },
];
