TOPICS.ca = [
  {
    id:'ca-number', title: '수 체계와 부동소수점', advanced: true,
    summary: R`모든 수를 <strong>고정 개수의 비트</strong>로 표현
정수: 2의 보수 / 실수: IEEE 754
<code>0.1 + 0.2 != 0.3</code>·오버플로·float16/bfloat16의 원인`,
    body: R`
<h3>2진수와 16진수</h3>
<p>트랜지스터는 켜짐/꺼짐 두 상태를 안정적으로 구분하므로 컴퓨터는 2진수를 쓴다. 16진수는 4비트를 한 글자로 묶은 표기일 뿐이다(<code>0xFF</code> = <code>1111 1111</code>). 메모리 주소, 색상 코드, 바이트 덤프를 16진수로 쓰는 이유는 비트 경계와 정확히 맞기 때문이다.</p>
<h3>음수: 왜 2의 보수인가</h3>
<p>최상위 비트를 부호로 쓰는 방법(부호-크기)이나 비트를 모두 뒤집는 1의 보수는 <strong>+0과 −0이 따로 존재</strong>하고, 덧셈 회로와 별도로 부호 처리가 필요하다. <strong>2의 보수</strong>는 $-x$를 "비트를 모두 뒤집고 1을 더한 값"으로 표현한다. 이렇게 하면</p>
<ul>
<li>0이 하나뿐이다.</li>
<li>부호 있는 수와 부호 없는 수의 덧셈이 <strong>같은 회로</strong>로 된다. 뺄셈은 "보수를 더하기"로 처리되어 별도 뺄셈기가 필요 없다.</li>
<li>$n$비트로 $-2^{n-1}$ ~ $2^{n-1}-1$을 표현한다. 최상위 비트의 자릿값을 $-2^{n-1}$로 보면 된다.</li>
</ul>
<p>범위를 넘으면 <strong>오버플로</strong>로 값이 반대편으로 돌아간다(8비트에서 127 + 1 = −128). Python의 <code>int</code>는 필요한 만큼 자릿수를 늘리는 임의 정밀도라 오버플로가 없지만, numpy의 <code>int8</code>·<code>int32</code> 배열은 하드웨어 정수를 그대로 쓰므로 조용히 돌아간다.</p>
<h3>실수: IEEE 754 부동소수점</h3>
<p>실수는 과학적 표기법처럼 $(-1)^s \times 1.f \times 2^{e - \text{bias}}$로 저장한다. 부호 1비트, 지수 $e$(편향값을 더해 부호 없이 저장), 가수 $f$(맨 앞의 1은 항상 1이라 저장하지 않음). float32는 1/8/23비트, float64는 1/11/52비트다.</p>
<ul>
<li><strong>지수 비트</strong>는 표현 가능한 <strong>범위</strong>(얼마나 크고 작은 수까지)를, <strong>가수 비트</strong>는 <strong>정밀도</strong>(유효숫자 몇 자리)를 결정한다.</li>
<li>상대 정밀도가 일정하다. 즉 수가 커질수록 표현 가능한 수 사이의 <strong>간격도 커진다</strong>. float64에서 $10^{16}$ 근처의 간격은 2라서 $10^{16} + 1$은 $10^{16}$과 구별되지 않는다.</li>
</ul>
<h3>0.1 + 0.2 != 0.3</h3>
<p>10진수 0.1은 2진수로 $0.000110011\ldots$ 무한 반복 소수다. 유한한 가수에 맞춰 반올림하므로 처음부터 정확한 0.1이 아니다. 오차가 누적되어 <code>0.1 + 0.2</code>는 <code>0.30000000000000004</code>가 된다. 그래서 실수 비교는 <code>==</code>가 아니라 <code>math.isclose</code>·<code>np.allclose</code>로 하고, 돈 계산은 정수(원 단위)나 <code>decimal</code>을 쓴다.</p>
<p>또 반올림 때문에 <strong>결합법칙이 성립하지 않는다</strong>: $(a + b) + c \ne a + (b + c)$일 수 있다. GPU처럼 여러 스레드가 순서를 바꿔 가며 합을 구하면 실행할 때마다 결과의 마지막 자리가 조금씩 달라질 수 있는 이유다. 특수값으로 $\pm\infty$와 NaN(정의되지 않은 결과, <code>NaN != NaN</code>)이 있다.</p>
<h3>딥러닝과 정밀도</h3>
<ul>
<li><strong>float16</strong>(1/5/10): 메모리와 연산량이 절반이지만 지수가 5비트라 최댓값이 65504로 작고, 아주 작은 그래디언트는 0이 되어 버린다(언더플로). 그래서 손실에 큰 수를 곱했다가 되돌리는 loss scaling을 함께 쓴다.</li>
<li><strong>bfloat16</strong>(1/8/7): float32와 <strong>지수 비트 수가 같아 범위가 같고</strong> 정밀도만 낮다. 범위 문제가 거의 없어 학습에 많이 쓰인다.</li>
<li><strong>int8·4비트 양자화</strong>: 추론 시 가중치를 정수로 바꿔 메모리와 대역폭을 줄인다.</li>
</ul>
<p>수치 안정성 기법도 표현 한계에서 나온다. 소프트맥스에서 $e^{1000}$은 float64로도 무한대가 되므로, 모든 입력에서 최댓값을 빼고 계산한다(결과는 수학적으로 같다).</p>`,
    analogy: R`<p>부동소수점은 <strong>유효숫자 7자리만 적을 수 있는 계산기</strong>와 같다. 1,234,567과 0.0001234567은 둘 다 정확히 적을 수 있지만, 1,234,567 + 0.0001은 적을 자리가 없어 그냥 1,234,567이 된다. 2의 보수는 <strong>자동차 주행 거리계</strong>와 비슷하다. 000에서 한 칸 뒤로 돌리면 999가 되듯, 0에서 1을 빼면 모든 비트가 1인 값(= −1)이 된다.</p>`,
    diagram: { caption: '부동소수점 형식의 비트 배치. 지수 비트는 범위를, 가수 비트는 정밀도를 결정한다. bfloat16은 float32와 지수 폭이 같다.', svg: R`
<svg viewBox="0 0 560 215" width="560">
<text x="40" y="35">float32</text>
<rect class="g" x="80" y="20" width="14" height="30"/><rect class="h" x="94" y="20" width="112" height="30"/><rect class="n" x="206" y="20" width="322" height="30"/>
<text x="87" y="35" class="sm">S</text><text x="150" y="35" class="sm">지수 8</text><text x="367" y="35" class="sm">가수 23</text>
<text x="40" y="95">float16</text>
<rect class="g" x="80" y="80" width="14" height="30"/><rect class="h" x="94" y="80" width="70" height="30"/><rect class="n" x="164" y="80" width="140" height="30"/>
<text x="87" y="95" class="sm">S</text><text x="129" y="95" class="sm">지수 5</text><text x="234" y="95" class="sm">가수 10</text>
<text x="420" y="95" class="sm">범위 좁음 (최대 65504)</text>
<text x="40" y="155">bfloat16</text>
<rect class="g" x="80" y="140" width="14" height="30"/><rect class="h" x="94" y="140" width="112" height="30"/><rect class="n" x="206" y="140" width="98" height="30"/>
<text x="87" y="155" class="sm">S</text><text x="150" y="155" class="sm">지수 8</text><text x="255" y="155" class="sm">가수 7</text>
<text x="420" y="155" class="sm">범위 = float32, 정밀도 낮음</text>
<text x="280" y="200">값 = (−1)^S × 1.가수 × 2^(지수 − 편향)</text>
</svg>` },
    math: [
      { tex: R`x = -b_{n-1}\,2^{n-1} + \sum_{i=0}^{n-2} b_i\, 2^{i}, \qquad -x = \overline{x} + 1`, explain: R`$n$비트 2의 보수 해석. $b_i$: $i$번째 비트. 최상위 비트만 음의 자릿값을 갖는다. $\overline{x}$: 모든 비트를 뒤집은 값.` },
      { tex: R`v = (-1)^{s} \times \Big(1 + \sum_{i=1}^{m} f_i\, 2^{-i}\Big) \times 2^{\,e - \text{bias}}`, explain: R`IEEE 754 정규화 수.<ul class="defs"><li>$s$: 부호 비트</li><li>$f_i$: 가수 비트($m$개)</li><li>$e$: 저장된 지수</li><li>bias: float32는 127, float64는 1023</li></ul>지수가 모두 0이거나 모두 1인 경우는 0·비정규수·무한대·NaN에 쓰인다.` },
      { tex: R`\varepsilon_{\text{float32}} = 2^{-23} \approx 1.19\times10^{-7}, \qquad \varepsilon_{\text{float64}} = 2^{-52} \approx 2.22\times10^{-16}`, explain: R`머신 엡실론: 1과 그다음 표현 가능한 수의 차이. 상대 오차의 크기를 나타낸다. float32는 유효숫자 약 7자리, float64는 약 16자리.` },
    ],
    code: R`
import math, struct
import numpy as np

def bits32(x):                                    # float32의 실제 비트 배치
  b = f"{struct.unpack('>I', struct.pack('>f', x))[0]:032b}"
  return f"{b[0]} {b[1:9]} {b[9:]}"             # 부호 | 지수(8) | 가수(23)

print("-5의 8비트 2의 보수:", format(-5 & 0xFF, "08b"))      # 11111011
with np.errstate(over="ignore"):
  print("int8 127 + 1       :", np.array([127], dtype=np.int8) + np.int8(1))   # [-128]
print("0.1  =", bits32(0.1))                      # 가수가 0011 0011 ... 반복 후 반올림
print("-2.5 =", bits32(-2.5))

print(0.1 + 0.2 == 0.3, 0.1 + 0.2, math.isclose(0.1 + 0.2, 0.3))
print("결합법칙:", (1.0 + 1e16) - 1e16, "vs", 1.0 + (1e16 - 1e16))   # 0.0 vs 1.0
print("엡실론  float32:", np.finfo(np.float32).eps, " float64:", np.finfo(np.float64).eps)

with np.errstate(over="ignore", invalid="ignore"):
  print("float16 최댓값:", np.finfo(np.float16).max, "/ 70000 →", np.float16(70000.0))
  x = np.array([1000.0, 1001.0, 1002.0])
  naive = np.exp(x) / np.exp(x).sum()           # exp(1000) = inf → inf/inf = nan
  stable = np.exp(x - x.max()) / np.exp(x - x.max()).sum()
print("softmax 단순:", naive, "/ 최댓값 빼기:", stable.round(4))
`,
    links: [
      { to: 'ca-cpu', why: 'ALU의 덧셈 회로와 오버플로·자리올림 플래그' },
      { to: 'ca-simd', why: 'float32가 float64보다 같은 레지스터에 두 배 많이 들어간다' },
      { to: 'ca-gpu', why: '혼합 정밀도 학습과 Tensor Core' },
      { to: 'dl-activation', why: '소프트맥스·시그모이드의 수치 안정성' },
      { to: 'ai-finetune', why: '양자화(QLoRA 등)로 메모리를 줄이는 원리' },
    ],
    quiz: [
      { q: 'Python에서 <code>0.1 + 0.2 == 0.3</code>이 False인 근본 이유는?',
        options: ['Python의 버그', '0.1과 0.2가 2진수로 무한 소수라 유한한 가수에 맞춰 반올림된 근삿값으로 저장되기 때문', 'CPU의 덧셈 회로가 부정확해서', '0.3이 정수로 변환되어서'], answer: 1,
        explain: '10진수로 1/3을 0.333…으로 끝없이 쓸 수 없는 것과 같다. 어느 언어든 IEEE 754 double을 쓰면 같은 결과가 나온다. 비교는 허용 오차를 두고 한다.' },
      { q: '부호-크기 방식 대신 2의 보수를 쓰는 이유로 옳지 <strong>않은</strong> 것은?',
        options: ['0의 표현이 하나뿐이다', '부호 있는 덧셈과 부호 없는 덧셈을 같은 회로로 처리할 수 있다', '뺄셈을 보수의 덧셈으로 처리해 별도 뺄셈기가 필요 없다', '같은 비트 수로 표현 가능한 양수의 범위가 두 배로 넓어진다'], answer: 3,
        explain: 'n비트 2의 보수의 양수 최댓값은 2^(n-1) − 1로, 부호-크기 방식과 같다. 나머지는 실제 장점이다.' },
      { q: '딥러닝 학습에서 float16보다 bfloat16이 다루기 쉬운 이유는?',
        options: ['bfloat16이 정밀도(가수 비트)가 더 높아서', 'bfloat16은 float32와 지수 비트 수가 같아 표현 범위가 같으므로, 그래디언트가 0이 되거나 무한대가 되는 문제가 적어서', 'bfloat16은 정수 형식이라서'], answer: 1,
        explain: 'bfloat16은 가수가 7비트로 float16(10비트)보다 오히려 정밀도가 낮다. 대신 범위가 넓어 loss scaling 같은 보정이 거의 필요 없다.' },
    ],
    resources: ['『Computer Systems: A Programmer\'s Perspective』(CS:APP) 2장 — 정보의 표현과 처리', 'David Goldberg, "What Every Computer Scientist Should Know About Floating-Point Arithmetic" (1991)', 'Python 공식 문서 — Floating Point Arithmetic: Issues and Limitations'],
  },
  {
    id:'ca-cpu', title: 'CPU 구조', advanced: true,
    summary: R`뼈대: <strong>제어장치·ALU·레지스터</strong> + 버스
폰 노이만 구조와 병목 → 캐시·파이프라인의 출발점`,
    body: R`
<h3>폰 노이만 구조</h3>
<p>프로그램(명령어)도 데이터처럼 메모리에 저장해 두고, CPU가 하나씩 읽어 실행한다(내장 프로그램 방식). 덕분에 프로그램을 바꾸려고 배선을 다시 할 필요가 없고, 컴파일러처럼 "프로그램을 만드는 프로그램"이 가능하다. 대가는 명령어와 데이터가 같은 통로로 메모리를 오가야 한다는 것이다. CPU는 점점 빨라졌지만 메모리는 그만큼 빨라지지 않아서, CPU가 메모리를 기다리는 <strong>폰 노이만 병목</strong>이 생겼다. 캐시, 프리페치, 파이프라인, 비순차 실행은 모두 이 병목을 숨기려는 노력이다. 명령어와 데이터용 메모리를 분리하는 하버드 구조의 아이디어도 현대 CPU의 L1 캐시(명령어 캐시와 데이터 캐시 분리)에 쓰인다.</p>
<h3>구성 요소</h3>
<ul>
<li><strong>ALU</strong>: 덧셈, 비트 연산, 비교 같은 산술·논리 연산. 결과와 함께 0인지(Z), 음수인지(N), 자리올림(C), 부호 있는 오버플로(V) 같은 <strong>상태 플래그</strong>를 남긴다. 조건 분기는 이 플래그를 본다.</li>
<li><strong>제어장치</strong>: 명령어를 해독해 ALU·레지스터·메모리에 어떤 동작을 할지 제어 신호를 보낸다.</li>
<li><strong>레지스터</strong>: CPU 안의 가장 빠른 저장소. 다음 명령어 주소를 담은 <strong>PC</strong>(프로그램 카운터), 현재 명령어를 담은 <strong>IR</strong>(명령어 레지스터), 메모리에 보낼 주소의 <strong>MAR</strong>, 메모리와 주고받는 데이터의 <strong>MBR</strong>(MDR), 계산용 범용 레지스터, 스택 위치를 가리키는 스택 포인터 등이 있다.</li>
<li><strong>버스</strong>: 주소 버스(어디에), 데이터 버스(무엇을), 제어 버스(읽기/쓰기 등).</li>
</ul>
<h3>CPU 성능 방정식</h3>
<p>프로그램 실행 시간 = <strong>명령어 수 × 명령어당 평균 사이클(CPI) × 클럭 주기</strong>. 클럭(GHz)은 셋 중 하나일 뿐이다. 클럭이 높아도 CPI가 크면 느리고, 명령어 집합이나 컴파일러가 명령어 수를 바꾸기도 한다. 그래서 클럭 속도만으로 서로 다른 CPU를 비교할 수 없다.</p>
<h3>클럭이 멈추고 코어가 늘었다</h3>
<p>클럭을 올리면 전력과 발열이 급격히 늘어난다. 트랜지스터가 작아져도 전력 밀도가 유지되던 경향(데나드 스케일링)이 2000년대 중반에 무너지면서, 업계는 클럭 대신 <strong>코어 수</strong>를 늘리는 방향으로 전환했다. 이때부터 소프트웨어가 병렬로 짜여야 성능이 오르게 되었다. 한 코어가 두 개의 하드웨어 스레드를 번갈아 실행해 놀고 있는 실행 유닛을 채우는 SMT(인텔의 하이퍼스레딩)도 같은 맥락이다.</p>
<h3>ISA와 마이크로아키텍처</h3>
<p><strong>명령어 집합 구조(ISA)</strong>는 소프트웨어와 하드웨어 사이의 계약(어떤 명령어와 레지스터가 있는가)이고, <strong>마이크로아키텍처</strong>는 그 계약을 실제로 구현한 내부 설계다. 인텔과 AMD CPU는 내부 구조가 전혀 다르지만 같은 x86-64 ISA를 구현하므로 같은 프로그램이 돈다. <strong>CISC</strong>(x86: 가변 길이, 메모리를 직접 다루는 복잡한 명령어)와 <strong>RISC</strong>(ARM, RISC-V: 고정 길이, 메모리 접근은 load/store만)의 구분은 지금도 쓰이지만, 현대 x86 CPU는 내부적으로 복잡한 명령어를 단순한 마이크로 연산으로 쪼개 실행하므로 경계가 많이 흐려졌다.</p>`,
    analogy: R`<p>CPU는 <strong>주방</strong>이다. 레시피(프로그램)와 재료(데이터)는 모두 창고(메모리)에 있다. 주방장(제어장치)이 레시피를 한 줄씩 읽고, 조리 도구(ALU)로 손질하며, 손에 들고 있는 재료(레지스터)는 바로 쓸 수 있다. 창고로 가는 복도(버스)가 하나뿐이라 레시피 확인과 재료 운반이 같은 복도를 써야 하는 것이 폰 노이만 병목이다. 그래서 주방 옆에 작은 냉장고(캐시)를 둔다.</p>`,
    diagram: { caption: 'CPU 내부(제어장치, ALU, 레지스터)와 버스로 연결된 메모리·입출력. 메모리에는 명령어와 데이터가 함께 있다.', svg: R`
<svg viewBox="0 0 540 220" width="540">
<rect class="g" x="10" y="10" width="320" height="200" rx="10"/><text x="40" y="24" class="sm">CPU</text>
<rect class="h" x="30" y="35" width="130" height="60" rx="6"/><text x="95" y="57">제어장치</text><text x="95" y="77" class="sm">해독 · 제어 신호</text>
<rect class="h" x="180" y="35" width="130" height="60" rx="6"/><text x="245" y="57">ALU</text><text x="245" y="77" class="sm">연산 · 플래그</text>
<rect class="n" x="30" y="115" width="280" height="80" rx="6"/><text x="170" y="128" class="sm">레지스터</text>
<rect class="n" x="40" y="140" width="46" height="28"/><text x="63" y="154" class="sm">PC</text>
<rect class="n" x="92" y="140" width="46" height="28"/><text x="115" y="154" class="sm">IR</text>
<rect class="n" x="144" y="140" width="46" height="28"/><text x="167" y="154" class="sm">MAR</text>
<rect class="n" x="196" y="140" width="46" height="28"/><text x="219" y="154" class="sm">MBR</text>
<rect class="n" x="248" y="140" width="52" height="28"/><text x="274" y="154" class="sm">R0~Rn</text>
<path class="he" d="M360,25 V200"/><text x="360" y="212" class="sm">버스</text>
<path class="a" d="M330,80 H358"/><path class="a" d="M358,150 H332"/>
<rect class="n" x="395" y="25" width="135" height="95" rx="6"/><text x="462" y="55">메모리</text><text x="462" y="78" class="sm">명령어 + 데이터</text><text x="462" y="96" class="sm">(같은 공간)</text>
<rect class="n" x="395" y="140" width="135" height="50" rx="6"/><text x="462" y="165">입출력 장치</text>
<path class="a" d="M362,70 H393"/><path class="a" d="M362,165 H393"/>
</svg>` },
    math: [
      { tex: R`T_{\text{CPU}} = \text{IC} \times \text{CPI} \times T_{\text{clock}} = \frac{\text{IC} \times \text{CPI}}{f}`, explain: R`<ul class="defs"><li>IC: 실행한 명령어 수(프로그램·컴파일러·ISA가 결정)</li><li>CPI: 명령어당 평균 사이클 수(마이크로아키텍처·메모리 동작이 결정)</li><li>$f$: 클럭 주파수</li></ul>세 요소를 모두 봐야 성능을 비교할 수 있다.` },
    ],
    code: R`
import os, platform

print("ISA:", platform.machine(), "/ 논리 코어 수:", os.cpu_count())

def cpu_time(ic, cpi, ghz):
  return ic * cpi / (ghz * 1e9)

# 같은 프로그램(10억 명령어)을 두 설계에서 실행
a = cpu_time(1e9, cpi=2.0, ghz=4.0)      # 클럭은 높지만 명령어당 사이클이 많음
b = cpu_time(1e9, cpi=1.2, ghz=3.0)      # 클럭은 낮지만 CPI가 작음
print(f"A(4GHz): {a:.3f}s, B(3GHz): {b:.3f}s → 클럭만으로는 비교할 수 없다")

# ALU: 같은 8비트 덧셈 결과를 부호 없는/부호 있는 수로 다르게 해석하고, 플래그로 상황을 알린다
def alu_add(a, b, bits=8):
  mask = (1 << bits) - 1
  raw = (a & mask) + (b & mask)
  r = raw & mask
  sign = lambda x: (x >> (bits - 1)) & 1
  flags = {"Z": r == 0,                                       # 결과가 0
           "N": sign(r) == 1,                                 # 최상위 비트 = 음수
           "C": raw > mask,                                   # 부호 없는 자리올림
           "V": sign(a) == sign(b) and sign(r) != sign(a)}    # 부호 있는 오버플로
  return r, {k for k, v in flags.items() if v}

for a, b in [(100, 27), (100, 28), (200, 100), (255, 1)]:
  r, f = alu_add(a, b)
  signed = r - 256 if r > 127 else r
  print(f"{a:3d} + {b:3d} = {r:3d} (부호 있는 해석 {signed:4d})  플래그 {sorted(f) or '-'}")
`,
    links: [
      { to: 'ca-cycle', why: '레지스터들이 명령어 사이클에서 어떻게 쓰이는가' },
      { to: 'ca-number', why: '2의 보수와 ALU 플래그(자리올림·오버플로)' },
      { to: 'ca-cache', why: '폰 노이만 병목을 숨기는 첫 번째 장치' },
      { to: 'ca-pipeline', why: 'CPI를 1에 가깝게(또는 그 이하로) 만드는 기법' },
      { to: 'os-syscall', why: 'CPU의 사용자/커널 모드와 특권 명령' },
      { to: 'ca-gpu', why: '클럭 정체 이후 병렬화로의 전환' },
    ],
    quiz: [
      { q: '4GHz CPU가 3GHz CPU보다 항상 빠르지 않은 이유는?',
        options: ['클럭 측정이 부정확해서', '실행 시간은 명령어 수 × CPI × 클럭 주기이므로, CPI나 명령어 수가 크면 클럭이 높아도 느릴 수 있기 때문', '높은 클럭은 메모리를 더 많이 써서'], answer: 1,
        explain: 'CPU 성능 방정식의 세 요소는 서로 다른 설계 수준(ISA·컴파일러·마이크로아키텍처·공정)이 결정한다. 실제 비교는 벤치마크로 한다.' },
      { q: '"폰 노이만 병목"을 가장 잘 설명한 것은?',
        options: ['프로그램을 바꾸려면 배선을 다시 해야 하는 문제', '명령어와 데이터가 같은 경로로 메모리를 오가야 하는데, 메모리가 CPU보다 훨씬 느려 CPU가 기다리는 문제', '레지스터 개수가 너무 많은 문제'], answer: 1,
        explain: '①은 내장 프로그램 방식이 해결한 문제다. 병목을 숨기기 위해 캐시 계층, 명령어/데이터 캐시 분리, 프리페치 등이 생겼다.' },
      { q: '인텔과 AMD CPU의 내부 설계가 다른데도 같은 프로그램 실행 파일이 양쪽에서 동작하는 이유는?',
        options: ['운영체제가 실행 중에 번역해 주기 때문', '둘 다 같은 ISA(x86-64)를 구현하므로, 마이크로아키텍처가 달라도 같은 명령어를 같은 의미로 실행하기 때문', '실행 파일에 두 버전이 들어 있기 때문'], answer: 1,
        explain: 'ISA는 계약, 마이크로아키텍처는 구현이다. 반면 x86-64용 실행 파일은 ARM CPU에서 그대로 돌지 않고 번역 계층(예: Apple Rosetta 2)이 필요하다.' },
    ],
    resources: ['Patterson & Hennessy, 『Computer Organization and Design』(컴퓨터 구조 및 설계) 1장', '『혼자 공부하는 컴퓨터 구조+운영체제』(강민철)', 'Nand2Tetris (『The Elements of Computing Systems』, 무료 강좌)'],
  },
  {
    id:'ca-cycle', title: '명령어 집합과 명령어 사이클', advanced: true,
    summary: R`<strong>인출 → 해독 → 실행</strong> 무한 반복
명령어 형식·주소 지정: 피연산자 위치 결정
분기: PC를 덮어써 흐름 변경`,
    body: R`
<h3>명령어 사이클</h3>
<ol>
<li><strong>인출(fetch)</strong>: PC가 가리키는 주소에서 명령어를 읽어 IR에 넣고, PC를 다음 명령어로 증가시킨다. 미리 증가시키므로, 분기가 없으면 자연스럽게 다음 명령어가 실행된다.</li>
<li><strong>해독(decode)</strong>: 명령어의 연산 코드(opcode)와 피연산자 필드를 해석해 무엇을 어디서 가져올지 정한다.</li>
<li><strong>실행(execute)</strong>: ALU 연산, 메모리 읽기·쓰기, 또는 분기(PC에 새 주소를 넣음). 메모리 접근과 결과 저장을 별도 단계로 나누기도 한다.</li>
<li><strong>인터럽트 확인</strong>: 사이클이 끝날 때 대기 중인 인터럽트가 있으면 현재 상태(PC 등)를 저장하고 인터럽트 핸들러로 간다. 그래서 인터럽트는 명령어 하나의 "중간"이 아니라 명령어 사이의 경계에서 처리된다.</li>
</ol>
<h3>고급 언어 한 줄 = 명령어 여러 개</h3>
<p><code>sum = sum + a[i]</code>는 대략 "i를 레지스터로 읽기 → a의 시작 주소 + i × 원소 크기 계산 → 그 주소에서 값 읽기 → sum 읽기 → 더하기 → sum에 쓰기"가 된다. <code>if</code>와 <code>for</code>는 비교 명령어와 조건 분기(플래그를 보고 PC를 바꿈)로, 함수 호출은 "돌아올 주소를 스택에 저장하고 PC를 함수 시작 주소로 바꾸는 것"으로 번역된다.</p>
<h3>명령어 형식</h3>
<p>명령어는 연산 코드와 0~3개의 피연산자 주소로 구성된다. <strong>3-주소</strong>(<code>ADD R1, R2, R3</code>), <strong>2-주소</strong>(결과를 피연산자 하나에 덮어씀), <strong>1-주소</strong>(누산기 하나를 암묵적으로 사용), <strong>0-주소</strong>(스택 꼭대기의 값들을 사용하는 스택 머신). 주소가 적을수록 명령어는 짧지만 같은 일을 하는 데 명령어가 더 많이 필요하다. 흥미롭게도 <strong>CPython과 JVM의 바이트코드는 스택 머신</strong>이다. <code>dis</code> 모듈로 보면 피연산자를 스택에 올리고(LOAD) 연산하는 0-주소 형식이다.</p>
<h3>주소 지정 방식: 피연산자를 어디서 찾나</h3>
<table><tr><th>방식</th><th>피연산자</th><th>대표 용도</th></tr>
<tr><td>즉시</td><td>명령어 안의 값 자체</td><td>상수 (<code>x + 1</code>의 1)</td></tr>
<tr><td>레지스터</td><td>레지스터의 값</td><td>가장 빠름, 대부분의 연산</td></tr>
<tr><td>직접</td><td>명령어에 적힌 메모리 주소의 값</td><td>전역 변수</td></tr>
<tr><td>간접</td><td>주소에 적힌 "또 다른 주소"의 값</td><td>포인터 따라가기</td></tr>
<tr><td>레지스터 간접</td><td>레지스터가 가리키는 주소의 값</td><td>포인터, 참조</td></tr>
<tr><td>변위(베이스+오프셋)</td><td>레지스터 값 + 상수 주소의 값</td><td>배열 원소, 구조체 필드, 스택의 지역 변수</td></tr>
<tr><td>상대(PC+오프셋)</td><td>PC 기준 위치</td><td>분기 — 코드가 메모리 어디에 올라가도 동작</td></tr></table>
<p>RISC 계열은 메모리 접근을 load/store 명령어에만 허용하고, 연산은 레지스터끼리만 한다. 명령어 형식이 단순하고 길이가 일정해 파이프라인 설계가 쉬워진다.</p>`,
    analogy: R`<p>요리책을 한 줄씩 따라 하는 요리사. 책갈피(PC)가 있는 줄을 읽고(인출), 책갈피를 다음 줄로 옮겨 둔 뒤, 무슨 뜻인지 이해하고(해독), 실행한다. "소스가 끓지 않으면 3단계로 돌아가라"는 문장은 책갈피를 3단계로 옮기는 것(분기)이다. 한 줄을 끝낼 때마다 초인종이 울렸는지(인터럽트) 확인한다. 재료 위치를 알려 주는 방식이 주소 지정 방식이다 — "소금 1스푼"(즉시), "냉장고 3번 칸의 것"(직접), "3번 칸 쪽지에 적힌 곳의 것"(간접).</p>`,
    diagram: { caption: '명령어 사이클. 분기는 실행 단계에서 PC를 덮어써 다음 인출 위치를 바꾼다.', svg: R`
<svg viewBox="0 0 540 220" width="540">
<rect class="h" x="190" y="10" width="160" height="50" rx="8"/><text x="270" y="28">인출</text><text x="270" y="46" class="sm">IR ← M[PC], PC 증가</text>
<rect class="n" x="380" y="85" width="150" height="50" rx="8"/><text x="455" y="103">해독</text><text x="455" y="121" class="sm">opcode · 피연산자 해석</text>
<rect class="n" x="190" y="160" width="160" height="50" rx="8"/><text x="270" y="178">실행</text><text x="270" y="196" class="sm">ALU / 메모리 / 분기(PC 변경)</text>
<rect class="n" x="10" y="85" width="150" height="50" rx="8"/><text x="85" y="103">인터럽트 확인</text><text x="85" y="121" class="sm">있으면 핸들러로</text>
<path class="a" d="M350,40 Q425,45 448,83"/><path class="a" d="M450,135 Q435,182 352,186"/>
<path class="a" d="M190,186 Q105,182 92,137"/><path class="a" d="M88,85 Q100,38 188,35"/>
</svg>` },
    math: [
      { tex: R`\begin{aligned} \text{MAR} &\leftarrow \text{PC} \\ \text{MBR} &\leftarrow M[\text{MAR}] \\ \text{IR} &\leftarrow \text{MBR},\quad \text{PC} \leftarrow \text{PC} + \ell \end{aligned}`, explain: R`인출 단계의 레지스터 전송 표기.<ul class="defs"><li>$M[\cdot]$: 메모리</li><li>$\ell$: 명령어 길이</li></ul>RISC는 $\ell$이 고정(예: 4바이트), x86은 가변이다.` },
      { tex: R`\text{EA} = R_{\text{base}} + d \qquad (\text{a[i]: } \text{EA} = \text{base}(a) + i \times s)`, explain: R`변위(베이스+오프셋) 방식의 유효 주소.<ul class="defs"><li>$d$: 명령어에 적힌 상수</li><li>$s$: 원소 크기</li></ul>배열 인덱싱이 $O(1)$인 것이 하드웨어 수준에서 이 계산 한 번이기 때문이다.` },
    ],
    code: R`
import dis

# 장난감 누산기 CPU: 프로그램과 데이터가 같은 메모리에 있다(폰 노이만)
mem = [
  ("LOAD_I", 0),    # 0: ACC ← 0          (즉시 주소 지정)
  ("STORE", 20),    # 1: M[20] ← ACC      sum = 0
  ("LOAD_I", 5),    # 2: ACC ← 5
  ("STORE", 21),    # 3: M[21] ← ACC      i = 5
  ("LOAD", 20),     # 4: ACC ← M[20]      (직접 주소 지정) ← 루프 시작
  ("ADD", 21),      # 5: ACC ← ACC + M[21]
  ("STORE", 20),    # 6: sum ← ACC
  ("LOAD", 21),     # 7: ACC ← i
  ("SUB_I", 1),     # 8: ACC ← ACC - 1
  ("STORE", 21),    # 9: i ← ACC
  ("JNZ", 4),       # 10: ACC ≠ 0 이면 PC ← 4 (분기 = PC 덮어쓰기)
  ("HALT", 0),      # 11
] + [0] * 10          # 12~21: 데이터 영역

pc, acc, executed = 0, 0, 0
while True:
  op, x = mem[pc]                       # 인출: IR ← M[PC]
  pc += 1                               #       PC ← PC + 1
  executed += 1
  if op == "LOAD_I":   acc = x          # 해독 + 실행
  elif op == "LOAD":   acc = mem[x]
  elif op == "STORE":  mem[x] = acc
  elif op == "ADD":    acc += mem[x]
  elif op == "SUB_I":  acc -= x
  elif op == "JNZ":    pc = x if acc != 0 else pc
  elif op == "HALT":   break
print(f"sum(1..5) = {mem[20]}, 실행한 명령어 {executed}개")

# CPython도 0-주소 스택 머신의 명령어(바이트코드)로 컴파일된다
def f(a, b):
  return a + b * 2
dis.dis(f)            # LOAD_FAST로 스택에 올리고, BINARY_OP가 스택 위 두 값을 계산
`,
    links: [
      { to: 'ca-cpu', why: 'PC·IR·MAR·MBR 레지스터' },
      { to: 'ca-pipeline', why: '사이클의 단계를 겹쳐 실행하기' },
      { to: 'os-io', why: '사이클 끝의 인터럽트 확인과 인터럽트 처리' },
      { to: 'os-syscall', why: '트랩 명령어로 커널에 진입' },
      { to: 'ds-stack-queue', why: '스택 머신(0-주소 명령어)과 함수 호출의 콜 스택' },
      { to: 'ds-array', why: '변위 주소 지정 = 배열 인덱싱의 하드웨어 버전' },
    ],
    quiz: [
      { q: '인출 단계에서 명령어를 읽은 직후 PC를 미리 증가시키는 이유는?',
        options: ['PC가 넘치지 않게 하려고', '분기가 없으면 다음 명령어로 자연스럽게 진행하고, 분기 명령어는 실행 단계에서 PC를 덮어쓰기만 하면 되도록', '해독 단계에서 PC가 필요 없어서'], answer: 1,
        explain: '기본 흐름은 "다음 명령어"이고, 분기·호출·인터럽트만 예외적으로 PC를 바꾼다. 함수 호출 시 저장하는 "돌아올 주소"가 바로 이미 증가된 PC 값이다.' },
      { q: '반복문에서 배열 a[i]를 차례로 읽는 데 가장 자연스러운 주소 지정 방식은?',
        options: ['즉시 주소 지정', '변위(베이스 레지스터 + 오프셋) 또는 인덱스 방식', '간접 주소 지정만 가능'], answer: 1,
        explain: '배열 시작 주소(또는 i × 크기)를 레지스터에 두고 오프셋을 더한다. 레지스터 값만 바꿔 같은 명령어로 모든 원소에 접근할 수 있다.' },
      { q: '<code>if x &gt; 0:</code> 같은 조건문이 기계어 수준에서 하는 일은?',
        options: ['메모리 전체를 검색한다', '비교 명령어로 플래그를 설정하고, 조건 분기 명령어가 플래그에 따라 PC를 바꾸거나 그대로 둔다', '새로운 프로세스를 만든다'], answer: 1,
        explain: '제어 흐름은 결국 "다음에 실행할 주소(PC)를 무엇으로 할까"다. 이 분기의 결과를 미리 알기 어렵다는 점이 파이프라인의 제어 해저드로 이어진다.' },
    ],
    resources: ['Patterson & Hennessy, 『Computer Organization and Design』 2장 — 명령어: 컴퓨터의 언어', 'Nand2Tetris Part 1 — Machine Language, Computer Architecture', 'Python 공식 문서 — dis 모듈'],
  },
  {
    id:'ca-pipeline', title: '파이프라이닝과 해저드',
    summary: R`처리 단계를 나눠 <strong>여러 명령어를 겹쳐</strong> 실행
지연이 아니라 <strong>처리량</strong> 향상
의존(해저드)이 겹침을 방해`,
    body: R`
<h3>아이디어: 세탁기와 건조기</h3>
<p>고전적인 5단계 파이프라인은 IF(인출) → ID(해독·레지스터 읽기) → EX(실행) → MEM(메모리 접근) → WB(결과 저장)이다. 첫 명령어가 ID 단계로 넘어가면 IF 단계는 놀고 있으니 다음 명령어를 인출한다. 파이프라인이 꽉 차면 <strong>매 사이클 명령어 하나가 완료</strong>되어 이상적으로 CPI = 1이 된다.</p>
<ul>
<li><strong>처리량</strong>은 최대 단계 수만큼 좋아지지만, 명령어 하나가 처음부터 끝까지 걸리는 <strong>지연 시간</strong>은 줄지 않는다(단계 사이 레지스터 때문에 약간 늘기도 한다).</li>
<li>클럭은 <strong>가장 느린 단계</strong>에 맞춰야 하므로 단계들의 작업량이 고르게 나뉘어야 한다.</li>
<li>단계를 더 잘게 쪼개면(깊은 파이프라인) 클럭을 높일 수 있지만, 아래 해저드의 비용이 커진다.</li>
</ul>
<h3>해저드: 겹침을 방해하는 것들</h3>
<ul>
<li><strong>구조적 해저드</strong>: 두 명령어가 같은 하드웨어를 동시에 쓰려는 충돌. 예: 한 명령어의 IF와 다른 명령어의 MEM이 같은 메모리 포트를 원함 → 명령어 캐시와 데이터 캐시를 분리해 해결.</li>
<li><strong>데이터 해저드</strong>: <code>ADD R1, R2, R3</code> 바로 다음에 <code>SUB R4, R1, R5</code>처럼 앞 명령어의 결과(R1)가 레지스터에 기록되기 전에 뒤 명령어가 필요로 하는 경우(RAW). EX 단계의 결과를 레지스터를 거치지 않고 다음 명령어의 EX 입력으로 바로 넘기는 <strong>포워딩(바이패싱)</strong>으로 대부분 해결된다. 단, 메모리에서 읽어 온 값을 바로 다음 명령어가 쓰는 경우(load-use)는 값이 MEM 단계 끝에야 나오므로 한 사이클을 쉬어야(stall) 한다. 컴파일러는 독립적인 명령어를 그 사이에 끼워 넣어 이를 줄인다.</li>
<li><strong>제어 해저드</strong>: 조건 분기의 결과(어디로 갈지)는 EX 단계쯤에야 알 수 있는데, 그동안 다음 명령어를 무엇으로 인출할지 정해야 한다. 기다리면 매 분기마다 여러 사이클을 잃는다.</li>
</ul>
<h3>분기 예측</h3>
<p>그래서 CPU는 분기 결과를 <strong>예측</strong>하고 그 방향으로 계속 인출·실행한다(투기적 실행). 맞으면 손실이 없고, 틀리면 잘못 들어온 명령어들을 버리고(flush) 올바른 주소부터 다시 시작한다. 이 손실은 파이프라인 깊이에 비례한다. 동적 예측기는 각 분기의 과거 기록(예: 2비트 포화 카운터, 다른 분기들의 결과 패턴)으로 예측하며, 현대 CPU의 예측 정확도는 일반적인 코드에서 매우 높다. 반대로 <strong>무작위 데이터에 따라 갈리는 분기</strong>는 예측할 수 없어 비싸다. C/C++에서 "정렬된 배열에 대해 if문 루프가 훨씬 빠르다"는 유명한 사례가 이 때문이다. Python에서는 인터프리터 자체의 오버헤드가 커서 이 효과가 잘 드러나지 않는다.</p>
<h3>더 나아가: 슈퍼스칼라와 비순차 실행</h3>
<p>현대 CPU는 매 사이클 여러 명령어를 동시에 인출·실행하고(슈퍼스칼라, CPI &lt; 1), 데이터가 준비된 명령어부터 순서를 바꿔 실행한 뒤 결과만 원래 순서대로 확정한다(비순차 실행). 캐시 미스로 기다리는 명령어가 있어도 뒤의 독립적인 명령어를 먼저 처리해 시간을 채운다. 투기적 실행이 남긴 캐시 흔적을 이용한 Spectre 같은 보안 취약점도 이 구조에서 나왔다.</p>`,
    analogy: R`<p>빨래 네 바구니를 <strong>세탁 → 건조 → 개기</strong>로 처리할 때, 한 바구니를 끝까지 다 하고 다음을 시작하면 오래 걸린다. 첫 바구니가 건조기로 가면 바로 두 번째를 세탁기에 넣는다. 한 바구니가 걸리는 시간은 같지만 전체는 훨씬 빨리 끝난다. 그런데 "두 번째 바구니는 첫 바구니에서 나온 양말 짝을 맞춰야 한다"(데이터 해저드)거나, "건조가 끝나 봐야 다음에 어떤 빨래를 할지 정할 수 있다"(제어 해저드)면 흐름이 멈춘다.</p>`,
    diagram: { caption: '5단계 파이프라인. 점선으로 표시한 5번째 사이클에는 네 명령어가 서로 다른 단계에서 동시에 처리된다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<text x="115" y="14" class="sm">1</text><text x="170" y="14" class="sm">2</text><text x="225" y="14" class="sm">3</text><text x="280" y="14" class="sm">4</text><text x="335" y="14" class="sm">5</text><text x="390" y="14" class="sm">6</text><text x="445" y="14" class="sm">7</text><text x="500" y="14" class="sm">8</text>
<text x="40" y="14" class="sm">사이클 →</text>
<text x="45" y="42">명령어 1</text><text x="45" y="80">명령어 2</text><text x="45" y="118">명령어 3</text><text x="45" y="156">명령어 4</text>
<g>
  <rect class="n" x="90" y="28" width="50" height="28"/><rect class="n" x="145" y="28" width="50" height="28"/><rect class="n" x="200" y="28" width="50" height="28"/><rect class="n" x="255" y="28" width="50" height="28"/><rect class="h" x="310" y="28" width="50" height="28"/>
  <text x="115" y="42" class="sm">IF</text><text x="170" y="42" class="sm">ID</text><text x="225" y="42" class="sm">EX</text><text x="280" y="42" class="sm">MEM</text><text x="335" y="42" class="sm">WB</text>
  <rect class="n" x="145" y="66" width="50" height="28"/><rect class="n" x="200" y="66" width="50" height="28"/><rect class="n" x="255" y="66" width="50" height="28"/><rect class="h" x="310" y="66" width="50" height="28"/><rect class="n" x="365" y="66" width="50" height="28"/>
  <text x="170" y="80" class="sm">IF</text><text x="225" y="80" class="sm">ID</text><text x="280" y="80" class="sm">EX</text><text x="335" y="80" class="sm">MEM</text><text x="390" y="80" class="sm">WB</text>
  <rect class="n" x="200" y="104" width="50" height="28"/><rect class="n" x="255" y="104" width="50" height="28"/><rect class="h" x="310" y="104" width="50" height="28"/><rect class="n" x="365" y="104" width="50" height="28"/><rect class="n" x="420" y="104" width="50" height="28"/>
  <text x="225" y="118" class="sm">IF</text><text x="280" y="118" class="sm">ID</text><text x="335" y="118" class="sm">EX</text><text x="390" y="118" class="sm">MEM</text><text x="445" y="118" class="sm">WB</text>
  <rect class="n" x="255" y="142" width="50" height="28"/><rect class="h" x="310" y="142" width="50" height="28"/><rect class="n" x="365" y="142" width="50" height="28"/><rect class="n" x="420" y="142" width="50" height="28"/><rect class="n" x="475" y="142" width="50" height="28"/>
  <text x="280" y="156" class="sm">IF</text><text x="335" y="156" class="sm">ID</text><text x="390" y="156" class="sm">EX</text><text x="445" y="156" class="sm">MEM</text><text x="500" y="156" class="sm">WB</text>
</g>
<rect class="he d" x="306" y="22" width="58" height="154"/>
<text x="300" y="192" class="sm">비파이프라인이면 4개에 20사이클, 파이프라인이면 8사이클</text>
</svg>` },
    math: [
      { tex: R`S = \frac{n \cdot k}{k + (n - 1)} \xrightarrow{\,n \to \infty\,} k`, explain: R`$k$단계 파이프라인으로 명령어 $n$개를 처리할 때의 이상적 속도 향상. 첫 명령어가 $k$사이클 걸려 채운 뒤에는 매 사이클 하나씩 완료된다. 단계 간 불균형과 해저드가 실제 속도 향상을 $k$보다 작게 만든다.` },
      { tex: R`\text{CPI}_{\text{실제}} = 1 + \text{명령어당 평균 정지(stall) 사이클}`, explain: R`예: 분기가 명령어의 20%, 오예측률 5%, 오예측 손실 15사이클이면 $0.2 \times 0.05 \times 15 = 0.15$사이클이 더해진다.` },
    ],
    code: R`
import random

def pipeline_cycles(n, k, stalls=0):
  return k + (n - 1) + stalls               # 첫 명령어 k사이클, 이후 매 사이클 1개씩 완료

n, k = 1000, 5
print(f"비파이프라인 {n * k} 사이클 / 파이프라인 {pipeline_cycles(n, k)} 사이클 "
    f"→ {n * k / pipeline_cycles(n, k):.2f}배")

def two_bit_predictor(outcomes):
  """2비트 포화 카운터: 상태 0·1 = '분기 안 함' 예측, 2·3 = '분기함' 예측"""
  state, correct = 2, 0
  for taken in outcomes:
      correct += (state >= 2) == taken
      state = min(state + 1, 3) if taken else max(state - 1, 0)   # 한 번 틀려서는 예측을 바꾸지 않음
  return correct / len(outcomes)

random.seed(0)
data = [random.randrange(256) for _ in range(100_000)]
PENALTY = 15                                   # 오예측 1회 손실 (가정한 값)
for name, xs in [("무작위 순서", data), ("정렬된 순서", sorted(data))]:
  acc = two_bit_predictor([x >= 128 for x in xs])        # 'if x >= 128:' 분기의 결과들
  miss = round((1 - acc) * len(xs))
  print(f"{name}: 예측 정확도 {acc:.1%}, 오예측 {miss:,}회 → 약 {miss * PENALTY:,} 사이클 손실")
`,
    links: [
      { to: 'ca-cycle', why: '파이프라인의 각 단계 = 명령어 사이클의 단계' },
      { to: 'ca-cpu', why: 'CPU 성능 방정식에서 CPI를 낮추는 방법' },
      { to: 'ca-cache', why: '캐시 미스는 파이프라인을 가장 오래 멈추게 하는 원인' },
      { to: 'ca-simd', why: '명령어 수준 병렬성 vs 데이터 수준 병렬성' },
      { to: 'ds-sort', why: '정렬된 데이터에서 분기 예측이 잘 맞는 이유' },
    ],
    quiz: [
      { q: '5단계 파이프라인을 도입해도 명령어 "하나"가 완료되기까지의 시간은 줄지 않는 이유는?',
        options: ['파이프라인은 명령어를 건너뛰기 때문', '각 명령어는 여전히 모든 단계를 차례로 거쳐야 하고, 파이프라인은 여러 명령어를 겹쳐 처리량을 높일 뿐이기 때문', '클럭이 느려지기 때문'], answer: 1,
        explain: '처리량(단위 시간당 완료 수)과 지연 시간(하나가 걸리는 시간)은 다른 지표다. 단계 사이 레지스터 때문에 지연 시간은 오히려 약간 늘 수 있다.' },
      { q: '<code>ADD R1, R2, R3</code> 직후 <code>SUB R4, R1, R5</code>가 올 때, 레지스터 기록을 기다리지 않고 해결하는 기법은?',
        options: ['분기 예측', '포워딩(바이패싱): EX 단계의 결과를 다음 명령어의 EX 입력으로 바로 전달', '캐시 분리', '인터럽트'], answer: 1,
        explain: '데이터 해저드(RAW)의 대표적 해결책이다. 메모리에서 읽은 값을 바로 쓰는 load-use 경우는 포워딩만으로 부족해 한 사이클 정지가 필요할 수 있다.' },
      { q: '같은 데이터를 정렬한 뒤 처리하면 "if x >= 128" 분기가 많은 루프가 (C/C++에서) 빨라지는 이유는?',
        options: ['정렬하면 데이터 양이 줄어서', '분기 결과가 한동안 계속 같다가 한 번 바뀌는 패턴이 되어 분기 예측이 거의 다 맞으므로, 오예측으로 인한 파이프라인 비우기가 사라지기 때문', '정렬된 데이터는 캐시에 들어가지 않아서'], answer: 1,
        explain: '무작위 순서에서는 결과가 동전 던지기라 예측기가 약 절반을 틀린다. 분기 자체를 없애는 방법(마스크·np.where 같은 branchless 코드)도 있다.' },
    ],
    resources: ['Patterson & Hennessy, 『Computer Organization and Design』 4장 — 프로세서(파이프라이닝)', 'Hennessy & Patterson, 『Computer Architecture: A Quantitative Approach』 3장 — 명령어 수준 병렬성', 'Stack Overflow, "Why is processing a sorted array faster than processing an unsorted array?" (분기 예측의 유명한 설명)'],
  },
  {
    id:'ca-cache', title: '캐시와 지역성', advanced: true,
    summary: R`CPU–메모리 속도 차이를 <strong>작고 빠른 캐시</strong>로 은닉
<strong>지역성</strong>이 있을 때만 효과
연속 메모리 순차 접근(numpy)이 빠른 이유`,
    body: R`
<h3>지역성: 캐시가 통하는 이유</h3>
<ul>
<li><strong>시간 지역성</strong>: 최근에 쓴 데이터는 곧 다시 쓰일 가능성이 높다(루프 변수, 자주 호출되는 함수의 코드).</li>
<li><strong>공간 지역성</strong>: 방금 쓴 주소 근처의 데이터가 곧 쓰일 가능성이 높다(배열을 순서대로 읽기, 명령어를 순서대로 실행).</li>
</ul>
<p>캐시는 이 두 성질에 기대어 "곧 쓰일 것 같은 데이터"를 CPU 가까이에 둔다.</p>
<h3>캐시 라인: 한 번에 블록 단위로</h3>
<p>메모리에서 캐시로는 바이트 하나가 아니라 <strong>캐시 라인</strong>(흔히 64바이트) 단위로 가져온다. float64 원소 하나를 읽으면 이웃 7개가 함께 들어온다. 그래서 배열을 순서대로 읽으면 8번 중 1번만 미스가 난다. 반대로 띄엄띄엄(stride가 크게) 읽으면 라인마다 원소 하나만 쓰고 나머지를 버리게 된다. CPU의 <strong>하드웨어 프리페처</strong>는 순차·일정 간격 패턴을 감지해 다음 라인을 미리 가져오므로, 예측 가능한 접근은 더욱 유리하다.</p>
<h3>어디에 둘 것인가: 매핑 방식</h3>
<p>주소는 <strong>태그 | 인덱스 | 오프셋</strong>으로 나뉜다. 오프셋은 라인 안의 위치, 인덱스는 캐시 안의 어느 집합(set)에 들어갈지, 태그는 그 자리에 있는 라인이 정말 내가 찾는 주소인지 확인하는 용도다.</p>
<ul>
<li><strong>직접 사상</strong>: 각 주소가 들어갈 자리가 하나로 정해져 있다. 빠르고 단순하지만, 같은 자리에 매핑되는 두 주소를 번갈아 쓰면 서로를 계속 쫓아낸다(충돌 미스).</li>
<li><strong>완전 연관</strong>: 아무 자리에나 들어갈 수 있다. 충돌은 없지만 모든 태그를 동시에 비교해야 해 크게 만들 수 없다.</li>
<li><strong>집합 연관(n-way)</strong>: 한 집합 안의 n개 자리 중 아무 곳에나. 실제 CPU 캐시가 쓰는 절충안이다.</li>
</ul>
<p>미스의 종류(3C): 처음 접근이라 생기는 <strong>강제 미스</strong>, 작업 집합이 캐시보다 커서 생기는 <strong>용량 미스</strong>, 매핑 자리가 겹쳐 생기는 <strong>충돌 미스</strong>.</p>
<h3>쓰기 정책</h3>
<p><strong>write-through</strong>는 쓸 때마다 아래 계층에도 바로 쓰고, <strong>write-back</strong>은 캐시에만 쓰고 dirty 표시를 했다가 그 라인이 쫓겨날 때 내려 쓴다. 대부분의 CPU 캐시는 쓰기 트래픽을 줄이는 write-back을 쓴다.</p>
<h3>멀티코어와 캐시 일관성</h3>
<p>코어마다 L1·L2 캐시가 있으므로 같은 주소의 복사본이 여러 곳에 생긴다. 한 코어가 쓰면 다른 코어의 복사본을 무효화하는 <strong>캐시 일관성 프로토콜</strong>(MESI 계열)이 동작한다. 서로 다른 변수라도 같은 캐시 라인에 있으면 두 코어가 번갈아 쓸 때마다 라인이 코어 사이를 오가는 <strong>거짓 공유(false sharing)</strong>가 생겨 성능이 크게 떨어질 수 있다.</p>
<h3>프로그래머가 할 수 있는 일</h3>
<ul>
<li><strong>메모리에 저장된 순서대로 순회</strong>한다. numpy 기본(C 순서)은 행 우선이라 같은 행의 원소가 연속이다. 열 방향으로 순회하면 원소마다 다른 라인을 건드린다.</li>
<li>Python list 대신 numpy 배열을 쓴다. list는 포인터 배열이라 실제 float 객체들이 힙 곳곳에 흩어져 있다.</li>
<li>큰 행렬 곱은 캐시에 들어가는 작은 블록 단위로 나눠 계산한다(블로킹/타일링). BLAS 라이브러리와 GPU 커널이 모두 이렇게 한다.</li>
</ul>
<p>정리하면 numpy 벡터화가 빠른 이유는 (1) 원소마다의 인터프리터 오버헤드 제거, (2) 연속 메모리로 캐시 라인·프리페처를 최대로 활용, (3) SIMD 명령어 활용이다.</p>`,
    analogy: R`<p>도서관 열람실 책상(캐시)과 서고(메모리). 책 한 권을 가지러 서고에 가면 <strong>그 칸의 책을 한 묶음</strong>(캐시 라인) 통째로 가져온다. 시리즈물을 1권부터 순서대로 읽으면(순차 접근) 한 번 다녀올 때마다 여러 권을 연달아 읽을 수 있지만, 서고 곳곳에서 한 권씩 골라 읽으면(무작위 접근) 매번 서고를 오가야 한다.</p>`,
    diagram: { caption: '행 우선으로 저장된 4×4 행렬. 행을 따라 읽으면 캐시 라인 1개로 충분하지만, 열을 따라 읽으면 원소마다 다른 라인을 가져와야 한다.', svg: R`
<svg viewBox="0 0 540 215" width="540">
<path class="ha" d="M20,18 H180"/><text x="100" y="9" class="sm">행 순회</text>
<rect class="h" x="20" y="30" width="40" height="40"/><rect class="h" x="60" y="30" width="40" height="40"/><rect class="h" x="100" y="30" width="40" height="40"/><rect class="h" x="140" y="30" width="40" height="40"/>
<rect class="n" x="20" y="70" width="40" height="40"/><rect class="n" x="60" y="70" width="40" height="40"/><rect class="n" x="100" y="70" width="40" height="40"/><rect class="n" x="140" y="70" width="40" height="40"/>
<rect class="n" x="20" y="110" width="40" height="40"/><rect class="n" x="60" y="110" width="40" height="40"/><rect class="n" x="100" y="110" width="40" height="40"/><rect class="n" x="140" y="110" width="40" height="40"/>
<rect class="n" x="20" y="150" width="40" height="40"/><rect class="n" x="60" y="150" width="40" height="40"/><rect class="n" x="100" y="150" width="40" height="40"/><rect class="n" x="140" y="150" width="40" height="40"/>
<text x="40" y="50">0</text><text x="80" y="50">1</text><text x="120" y="50">2</text><text x="160" y="50">3</text>
<text x="40" y="90">4</text><text x="80" y="90">5</text><text x="120" y="90">6</text><text x="160" y="90">7</text>
<text x="40" y="130">8</text><text x="80" y="130">9</text><text x="120" y="130">10</text><text x="160" y="130">11</text>
<text x="40" y="170">12</text><text x="80" y="170">13</text><text x="120" y="170">14</text><text x="160" y="170">15</text>
<rect class="e d" x="17" y="27" width="46" height="166"/><text x="40" y="205" class="sm">열 순회</text>
<text x="370" y="20" class="sm">메모리 (행 우선 저장)</text>
<rect class="h" x="210" y="40" width="20" height="30"/><rect class="h" x="230" y="40" width="20" height="30"/><rect class="h" x="250" y="40" width="20" height="30"/><rect class="h" x="270" y="40" width="20" height="30"/>
<rect class="n" x="290" y="40" width="20" height="30"/><rect class="n" x="310" y="40" width="20" height="30"/><rect class="n" x="330" y="40" width="20" height="30"/><rect class="n" x="350" y="40" width="20" height="30"/>
<rect class="n" x="370" y="40" width="20" height="30"/><rect class="n" x="390" y="40" width="20" height="30"/><rect class="n" x="410" y="40" width="20" height="30"/><rect class="n" x="430" y="40" width="20" height="30"/>
<rect class="n" x="450" y="40" width="20" height="30"/><rect class="n" x="470" y="40" width="20" height="30"/><rect class="n" x="490" y="40" width="20" height="30"/><rect class="n" x="510" y="40" width="20" height="30"/>
<text x="220" y="55" class="sm">0</text><text x="240" y="55" class="sm">1</text><text x="260" y="55" class="sm">2</text><text x="280" y="55" class="sm">3</text><text x="300" y="55" class="sm">4</text><text x="320" y="55" class="sm">5</text><text x="340" y="55" class="sm">6</text><text x="360" y="55" class="sm">7</text><text x="380" y="55" class="sm">8</text><text x="400" y="55" class="sm">9</text><text x="420" y="55" class="sm">10</text><text x="440" y="55" class="sm">11</text><text x="460" y="55" class="sm">12</text><text x="480" y="55" class="sm">13</text><text x="500" y="55" class="sm">14</text><text x="520" y="55" class="sm">15</text>
<rect class="e" x="208" y="36" width="84" height="38"/><rect class="e" x="288" y="36" width="84" height="38"/><rect class="e" x="368" y="36" width="84" height="38"/><rect class="e" x="448" y="36" width="84" height="38"/>
<text x="250" y="88" class="sm">라인 0</text><text x="330" y="88" class="sm">라인 1</text><text x="410" y="88" class="sm">라인 2</text><text x="490" y="88" class="sm">라인 3</text>
<circle class="fill" cx="220" cy="105" r="4"/><circle class="fill" cx="300" cy="105" r="4"/><circle class="fill" cx="380" cy="105" r="4"/><circle class="fill" cx="460" cy="105" r="4"/>
<text x="370" y="128" class="sm">열 순회(0, 4, 8, 12)는 라인 4개를 모두 가져와 1/4씩만 사용</text>
<text x="370" y="150" class="sm">행 순회(0, 1, 2, 3)는 라인 1개로 끝 (강조)</text>
</svg>` },
    math: [
      { tex: R`\text{AMAT} = t_{\text{hit}} + m \times t_{\text{penalty}}`, explain: R`평균 메모리 접근 시간.<ul class="defs"><li>$t_\text{hit}$: 캐시 적중 시 시간</li><li>$m$: 미스율</li><li>$t_\text{penalty}$: 미스 시 아래 계층에서 가져오는 추가 시간</li></ul>미스 비용이 적중 비용의 수십~수백 배이므로 미스율이 조금만 변해도 AMAT가 크게 변한다.` },
      { tex: R`\text{오프셋 비트} = \log_2(\text{라인 크기}),\qquad \text{인덱스 비트} = \log_2(\text{집합 수}),\qquad \text{태그} = \text{나머지 상위 비트}`, explain: R`예: 64바이트 라인이면 하위 6비트가 오프셋. 집합 수 = 캐시 크기 ÷ (라인 크기 × 연관도 n).` },
    ],
    code: R`
import time
import numpy as np

def bench(f, repeat=5):
  best = float("inf")
  for _ in range(repeat):
      t0 = time.perf_counter(); f(); best = min(best, time.perf_counter() - t0)
  return best

n = 3000
a = np.random.rand(n, n)                       # C 순서(행 우선): 같은 행이 메모리에 연속
print(f"행 단위 순회: {bench(lambda: [a[i, :].sum() for i in range(n)]):.3f}s")
print(f"열 단위 순회: {bench(lambda: [a[:, j].sum() for j in range(n)]):.3f}s  ← 원소마다 다른 캐시 라인")

big = np.random.rand(16 * 1_000_000)
contig = big[:1_000_000].copy()               # 연속된 100만 개
strided = big[::16]                           # 같은 100만 개지만 128바이트 간격 → 라인마다 1개만 사용
print(f"연속 합: {bench(contig.sum) * 1e3:.2f}ms / 16칸 간격 합: {bench(strided.sum) * 1e3:.2f}ms")

lst = contig.tolist()                          # 파이썬 float 객체 100만 개 + 포인터 배열
print(f"list sum: {bench(lambda: sum(lst)) * 1e3:.2f}ms / numpy sum: {bench(contig.sum) * 1e3:.2f}ms")
`,
    links: [
      { to: 'ds-array', why: '연속 메모리 배열과 Python list(포인터 배열)의 차이' },
      { to: 'ca-hierarchy', why: 'L1·L2·L3·DRAM으로 이어지는 계층 전체' },
      { to: 'ca-simd', why: 'numpy가 빠른 또 다른 이유: 한 명령어로 여러 원소 처리' },
      { to: 'os-memory', why: 'TLB도 주소 변환 결과를 담는 캐시다' },
      { to: 'os-sync', why: '멀티코어 캐시 일관성, 거짓 공유' },
      { to: 'ds-linkedlist', why: '흩어진 노드는 공간 지역성이 없다' },
    ],
    quiz: [
      { q: '행 우선으로 저장된 큰 2차원 배열을 열 방향으로 순회하면 느린 이유는?',
        options: ['열의 원소 개수가 더 많아서', '연속한 두 접근이 행 길이만큼 떨어진 주소라 매번 다른 캐시 라인을 가져오고, 가져온 라인의 나머지는 쓰지 못하기 때문', 'CPU가 열 연산을 지원하지 않아서'], answer: 1,
        explain: '공간 지역성이 사라진다. 열 순회가 필요하면 F 순서(열 우선) 배열로 바꾸거나 전치(transpose) 후 복사하는 것이 나을 수 있다.' },
      { q: '캐시 라인 크기를 크게 늘리면 생기는 효과로 옳은 것은?',
        options: ['항상 성능이 좋아진다', '공간 지역성을 더 활용해 순차 접근의 미스는 줄지만, 미스당 가져오는 양이 늘어 비용이 커지고 같은 용량에 들어가는 라인 수가 줄어 무작위 접근에서는 불리할 수 있다', '시간 지역성만 좋아진다'], answer: 1,
        explain: '모든 설계 파라미터에는 트레이드오프가 있다. 실제 CPU는 64바이트 정도를 많이 쓴다.' },
      { q: '직접 사상 캐시에서 두 배열을 번갈아 읽을 때 캐시 용량이 충분한데도 미스가 계속 날 수 있는 이유는?',
        options: ['강제 미스 때문', '두 배열의 주소가 같은 인덱스(같은 자리)에 매핑되어 서로를 계속 쫓아내는 충돌 미스 때문', '캐시가 쓰기 금지라서'], answer: 1,
        explain: '집합 연관 캐시는 한 집합에 여러 자리를 두어 이 문제를 완화한다.' },
    ],
    resources: ['『Computer Systems: A Programmer\'s Perspective』(CS:APP) 6장 — 메모리 계층과 지역성', 'Ulrich Drepper, "What Every Programmer Should Know About Memory" (2007)', 'NumPy 문서 — Internal organization of NumPy arrays (strides, C/F order)'],
  },
  {
    id:'ca-hierarchy', title: '기억장치 계층', advanced: true,
    summary: R`빠른 메모리 = 비싸고 작음
레지스터·캐시·DRAM·SSD·HDD 계층, <strong>위층이 아래층의 캐시</strong>
큰 용량을 빠른 속도처럼 사용`,
    body: R`
<h3>왜 계층인가</h3>
<p>한 가지 기술로 "빠르고, 크고, 싸고, 전원이 꺼져도 남는" 메모리를 만들 수 없다. 빠를수록 비트당 비용이 크고 전력이 많이 들며, CPU에 가까이(같은 칩 위에) 둘 수 있는 양도 제한된다. 그래서 속도와 용량이 다른 여러 층을 쌓는다.</p>
<table><tr><th>계층</th><th>기술</th><th>대략적 지연 시간</th><th>대략적 용량</th></tr>
<tr><td>레지스터</td><td>플립플롭</td><td>1 사이클 이내</td><td>수백 B ~ KB</td></tr>
<tr><td>L1 / L2 캐시</td><td>SRAM</td><td>~1 ns / 수 ns</td><td>수십 KB / 수백 KB~수 MB</td></tr>
<tr><td>L3 캐시</td><td>SRAM</td><td>~10 ns 이상</td><td>수 MB ~ 수십 MB</td></tr>
<tr><td>메인 메모리</td><td>DRAM</td><td>~100 ns</td><td>GB 단위</td></tr>
<tr><td>SSD</td><td>NAND 플래시</td><td>수십~수백 µs</td><td>TB 단위</td></tr>
<tr><td>HDD</td><td>자기 디스크</td><td>수 ms</td><td>TB 단위</td></tr></table>
<p>(값은 제품마다 크게 다르므로 자릿수 감각으로만 볼 것.)</p>
<h3>기술의 차이</h3>
<ul>
<li><strong>SRAM</strong>: 비트당 트랜지스터 여러 개(보통 6개)로 상태를 유지한다. 빠르고 리프레시가 필요 없지만 면적이 커서 비싸다 → 캐시.</li>
<li><strong>DRAM</strong>: 비트당 커패시터 하나와 트랜지스터 하나. 전하가 새어 나가므로 주기적으로 다시 써 주는 <strong>리프레시</strong>가 필요하다. 밀도가 높아 싸다 → 메인 메모리. 둘 다 전원이 꺼지면 사라지는 <strong>휘발성</strong>이다.</li>
<li><strong>플래시(SSD)</strong>: 비휘발성. 읽기·쓰기는 페이지 단위, 지우기는 더 큰 블록 단위이고 셀마다 쓰기 횟수 수명이 있어서, 컨트롤러(FTL)가 쓰기 위치를 고르게 분산하고 주소를 재매핑한다.</li>
<li><strong>HDD</strong>: 헤드를 원하는 트랙으로 옮기는 탐색 시간과 원판이 돌아오기를 기다리는 회전 지연이 있어 <strong>무작위 접근이 매우 느리고</strong>, 순차 접근은 상대적으로 빠르다.</li>
</ul>
<h3>계층이 동작하는 원리</h3>
<p>각 경계마다 위층이 아래층의 일부를 복사해 두는 캐시다. CPU 캐시 ↔ DRAM은 <strong>하드웨어</strong>가, DRAM ↔ 디스크는 <strong>운영체제</strong>(가상 메모리의 페이지 교체, 파일의 페이지 캐시)가 관리한다. 지역성 덕분에 대부분의 접근이 위층에서 해결되므로, 평균 접근 시간은 맨 위층에 가깝고 용량은 맨 아래층에 가까워진다.</p>
<h3>지연 시간과 대역폭은 다르다</h3>
<p><strong>지연 시간</strong>은 요청 후 첫 바이트가 올 때까지의 시간, <strong>대역폭</strong>은 초당 옮길 수 있는 양이다. 지연이 큰 장치일수록 한 번에 큰 덩어리를 순차적으로 가져와 지연을 여러 바이트에 나눠 갚는 것이 중요하다. 디스크를 블록 단위로 읽고, 캐시를 라인 단위로 채우고, DB가 페이지 단위로 읽는 이유다.</p>
<h3>AI 시스템에서의 계층</h3>
<p>GPU는 HBM 같은 고대역폭 메모리를 쓰지만 용량이 제한되어, 모델 가중치와 활성값이 GPU 메모리에 들어가는지가 학습·추론 가능 여부를 정한다. 또 GPU 내부에도 레지스터 → 공유 메모리/L1 → L2 → HBM의 계층이 있다. LLM이 토큰을 하나씩 생성하는 단계는 매 토큰마다 큰 가중치를 메모리에서 읽어야 해서 연산 능력보다 <strong>메모리 대역폭</strong>이 속도를 제한하는 경우가 많다. 어텐션 계산을 GPU의 빠른 온칩 메모리 안에서 블록 단위로 처리해 HBM 왕복을 줄이는 FlashAttention이 이 계층 구조를 활용한 대표적 예다.</p>`,
    analogy: R`<p>요리사의 작업 공간. 손에 든 칼과 재료(레지스터), 도마 위(L1), 조리대 옆 선반(L2·L3), 주방 냉장고(DRAM), 지하 창고(SSD), 멀리 떨어진 물류 창고(HDD·네트워크). 가까울수록 빨리 집을 수 있지만 공간이 좁다. 잘 정리된 주방은 지금 쓰는 재료를 가까이 두고, 창고에 갈 때는 한 번에 넉넉히 가져온다(블록 단위 전송).</p>`,
    diagram: { caption: '기억장치 계층. 위로 갈수록 빠르고 비싸고 작으며, 각 층은 아래층의 캐시 역할을 한다. 값은 대략적인 자릿수.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<polygon class="h" points="170,15 230,15 258,45 142,45"/><text x="200" y="30" class="sm">레지스터</text>
<polygon class="h" points="142,47 258,47 286,77 114,77"/><text x="200" y="62" class="sm">L1·L2 캐시 (SRAM)</text>
<polygon class="h" points="114,79 286,79 314,109 86,109"/><text x="200" y="94" class="sm">L3 캐시 (SRAM)</text>
<polygon class="n" points="86,111 314,111 342,141 58,141"/><text x="200" y="126" class="sm">메인 메모리 (DRAM)</text>
<polygon class="n" points="58,143 342,143 370,173 30,173"/><text x="200" y="158" class="sm">SSD (플래시)</text>
<polygon class="g" points="30,175 370,175 398,205 2,205"/><text x="200" y="190" class="sm">HDD · 네트워크 저장소</text>
<text x="410" y="30" class="st sm">1 사이클 이내 · 수백 B</text>
<text x="410" y="62" class="st sm">~1–수 ns · KB~MB</text>
<text x="410" y="94" class="st sm">~10 ns+ · 수~수십 MB</text>
<text x="410" y="126" class="st sm">~100 ns · GB</text>
<text x="410" y="158" class="st sm">수십~수백 µs · TB</text>
<text x="410" y="190" class="st sm">수 ms · TB</text>
<text x="410" y="212" class="st sm">↑ 빠름·비쌈·작음 / ↓ 느림·쌈·큼</text>
</svg>` },
    math: [
      { tex: R`\text{AMAT} = t_{1} + m_{1}\Big(t_{2} + m_{2}\big(t_{3} + m_{3}\, t_{\text{mem}}\big)\Big)`, explain: R`다단계 캐시의 평균 접근 시간.<ul class="defs"><li>$t_i$: $i$번째 캐시의 접근 시간</li><li>$m_i$: 그 캐시에서의 (지역) 미스율</li><li>$t_\text{mem}$: 메인 메모리 접근 시간</li></ul>안쪽 괄호일수록 일어날 확률이 작아 영향이 줄어든다.` },
    ],
    code: R`
import time
import numpy as np

def amat(levels, t_mem):
  """levels: [(접근 시간 ns, 미스율), ...] 위 계층부터"""
  t = t_mem
  for hit_time, miss_rate in reversed(levels):
      t = hit_time + miss_rate * t
  return t

# 가정한 예시 값: L1 1ns, L2 4ns, L3 15ns, DRAM 100ns
print(f"L1 미스율 5%  → 평균 {amat([(1, 0.05), (4, 0.30), (15, 0.40)], 100):.2f} ns")
print(f"L1 미스율 20% → 평균 {amat([(1, 0.20), (4, 0.30), (15, 0.40)], 100):.2f} ns")

# 작업 집합 크기에 따른 무작위 접근 비용: 캐시 용량을 넘을 때마다 느려진다
rng = np.random.default_rng(0)
count = 2_000_000
for kb in [16, 256, 4_096, 65_536, 262_144]:
  data = np.ones(kb * 1024 // 8)                     # float64 배열
  idx = rng.integers(0, data.size, count)
  data[idx].sum()                                     # 워밍업
  t0 = time.perf_counter(); data[idx].sum(); t = time.perf_counter() - t0
  print(f"작업 집합 {kb:>7,} KB: 무작위 읽기 1회당 약 {t / count * 1e9:5.2f} ns")
`,
    links: [
      { to: 'ca-cache', why: '계층의 각 경계에서 일어나는 일' },
      { to: 'os-vm', why: 'DRAM과 디스크 사이를 OS가 관리하는 방식' },
      { to: 'os-fs', why: '파일 데이터의 페이지 캐시' },
      { to: 'os-io', why: '저장 장치의 지연 시간과 DMA' },
      { to: 'ca-gpu', why: 'GPU의 HBM과 온칩 메모리 계층' },
      { to: 'ai-llm', why: 'LLM 토큰 생성이 메모리 대역폭에 묶이는 이유' },
    ],
    quiz: [
      { q: '모든 메모리를 SRAM으로 만들지 않는 이유는?',
        options: ['SRAM은 느려서', 'SRAM은 비트당 트랜지스터가 많아 면적·비용·전력이 커서, 같은 비용으로 훨씬 적은 용량밖에 만들 수 없기 때문', 'SRAM은 비휘발성이라서'], answer: 1,
        explain: '그래서 SRAM은 CPU 가까이에 작은 캐시로, 밀도가 높은 DRAM은 메인 메모리로 쓴다. 둘 다 휘발성이다.' },
      { q: '작은 캐시 몇 MB와 큰 DRAM 몇 GB의 조합이 "거의 캐시 속도로, DRAM 용량만큼" 동작할 수 있는 근거는?',
        options: ['DRAM이 캐시만큼 빠르기 때문', '프로그램의 접근이 시간·공간 지역성을 가져 대부분의 접근이 위층에서 해결되기 때문', '운영체제가 데이터를 압축하기 때문'], answer: 1,
        explain: '지역성이 없는 접근 패턴(거대한 데이터의 무작위 접근)에서는 계층의 이점이 사라지고 평균 접근 시간이 아래층에 가까워진다.' },
      { q: 'HDD에서 같은 양의 데이터를 읽을 때 순차 읽기가 무작위 읽기보다 훨씬 빠른 이유는?',
        options: ['순차 읽기는 데이터를 압축해서', '무작위 읽기는 매번 헤드 이동(탐색)과 회전 대기라는 큰 지연이 발생하지만, 순차 읽기는 한 번의 지연 후 연속으로 읽어 지연이 많은 바이트에 나눠지기 때문', 'HDD는 무작위 읽기를 지원하지 않아서'], answer: 1,
        explain: '지연 시간이 큰 장치에서는 "한 번에 크게, 순서대로"가 핵심이다. SSD도 차이는 작지만 같은 경향이 있다.' },
    ],
    resources: ['Hennessy & Patterson, 『Computer Architecture: A Quantitative Approach』 2장 — 메모리 계층 설계', '『Computer Systems: A Programmer\'s Perspective』(CS:APP) 6장', 'Tri Dao et al., "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness" (2022)'],
  },
  {
    id:'ca-simd', title: 'SIMD와 벡터화',
    summary: R`<strong>명령어 하나로 여러 데이터</strong> 동시 처리
numpy가 빠른 이유: 인터프리터 오버헤드 제거 + 연속 메모리 + SIMD`,
    body: R`
<h3>병렬성의 분류 (플린의 분류)</h3>
<p>명령어 흐름과 데이터 흐름이 각각 하나인지 여럿인지로 나눈다. <strong>SISD</strong>(전통적 단일 코어), <strong>SIMD</strong>(한 명령어 → 여러 데이터), <strong>MIMD</strong>(여러 코어가 각자 다른 명령어 실행 — 멀티코어, 클러스터). GPU는 SIMD를 스레드 단위로 확장한 SIMT 방식이다.</p>
<h3>SIMD 레지스터</h3>
<p>CPU에는 일반 레지스터보다 넓은 벡터 레지스터가 있다. x86의 SSE는 128비트, AVX2는 256비트, AVX-512는 512비트, ARM의 NEON은 128비트(SVE는 길이 가변)다. 256비트 레지스터에는 float64 4개 또는 float32 8개가 들어가고, 명령어 하나로 그 원소들에 같은 연산을 동시에 한다. 그래서 <strong>float32는 float64보다 명령어당 처리 원소가 두 배</strong>이고 메모리 이동량도 절반이다.</p>
<h3>SIMD가 잘 되는 조건</h3>
<ul>
<li>모든 원소에 <strong>같은 연산</strong>을 한다.</li>
<li>데이터가 메모리에 <strong>연속</strong>되어 있어 한 번에 레지스터로 읽어 들일 수 있다.</li>
<li>원소 사이에 <strong>의존성이 없다</strong>(앞 원소의 결과가 뒤 원소의 입력이 아님). 누적합처럼 의존이 있으면 그대로는 벡터화하기 어렵다.</li>
<li><strong>분기가 없다</strong>. 원소마다 if/else가 다르면 같은 명령어를 쓸 수 없다. 그래서 SIMD는 양쪽 결과를 모두 계산한 뒤 조건 마스크로 고른다. <code>np.where(cond, a, b)</code>가 바로 이 모양이다.</li>
</ul>
<h3>"벡터화"의 두 가지 의미</h3>
<p>(1) 파이썬 <code>for</code> 루프를 numpy 배열 연산으로 바꾸는 것, (2) 하드웨어 SIMD 명령어를 쓰는 것. numpy의 배열 연산은 C로 작성된 내부 루프에서 실행되고, 많은 연산에서 CPU가 지원하는 SIMD 명령어를 골라 사용한다. 파이썬 루프가 느린 이유는 SIMD 이전의 문제다. 원소마다 바이트코드를 해석하고, 타입을 확인하고, 결과를 새 <code>float</code> 객체로 만들고(박싱), 참조 카운트를 갱신한다. 실제 덧셈 자체는 그중 아주 작은 부분이다.</p>
<h3>벡터화의 한계와 그다음</h3>
<p><code>a * b + c</code>는 <code>a * b</code>의 결과를 담는 임시 배열을 만든 뒤 다시 읽어 <code>c</code>를 더한다. 원소별 연산은 계산보다 <strong>메모리 이동</strong>이 병목인 경우가 많아, 임시 배열이 늘면 느려진다. <code>out=</code> 인자로 제자리 연산을 하거나, 여러 연산을 한 번의 루프로 합쳐 주는 도구(numexpr, Numba, PyTorch의 연산 융합)를 쓴다. 행렬 곱은 BLAS 라이브러리가 SIMD, 캐시 블로킹, 멀티스레드를 모두 동원해 하드웨어 최고 성능에 가깝게 실행한다. ML 코드에서 "for 루프 대신 행렬 연산으로 쓰라"는 조언의 근거가 여기에 있다.</p>`,
    analogy: R`<p>시험지 채점. 스칼라 방식은 채점자가 답안지 한 장의 한 문항씩 정답과 비교하는 것. SIMD는 <strong>구멍 뚫린 정답 판</strong>을 답안지 위에 겹쳐 한 번에 여러 문항을 확인하는 것이다. 단, 모든 답안지가 같은 양식(연속·같은 타입)이어야 하고, 문항마다 채점 기준이 다르면(분기) 판 하나로는 안 된다. 파이썬 루프는 문항 하나 볼 때마다 채점 규정집을 처음부터 다시 읽는 채점자와 같다.</p>`,
    diagram: { caption: '스칼라 연산은 원소마다 명령어 하나, SIMD는 넓은 레지스터 하나에 담긴 여러 원소를 명령어 하나로 처리한다.', svg: R`
<svg viewBox="0 0 540 205" width="540">
<text x="110" y="12">스칼라</text>
<rect class="n" x="20" y="25" width="40" height="28"/><text x="40" y="39" class="sm">a0</text><text x="75" y="39">+</text><rect class="n" x="90" y="25" width="40" height="28"/><text x="110" y="39" class="sm">b0</text><text x="145" y="39">=</text><rect class="h" x="160" y="25" width="40" height="28"/><text x="180" y="39" class="sm">c0</text>
<rect class="n" x="20" y="60" width="40" height="28"/><text x="40" y="74" class="sm">a1</text><text x="75" y="74">+</text><rect class="n" x="90" y="60" width="40" height="28"/><text x="110" y="74" class="sm">b1</text><text x="145" y="74">=</text><rect class="h" x="160" y="60" width="40" height="28"/><text x="180" y="74" class="sm">c1</text>
<rect class="n" x="20" y="95" width="40" height="28"/><text x="40" y="109" class="sm">a2</text><text x="75" y="109">+</text><rect class="n" x="90" y="95" width="40" height="28"/><text x="110" y="109" class="sm">b2</text><text x="145" y="109">=</text><rect class="h" x="160" y="95" width="40" height="28"/><text x="180" y="109" class="sm">c2</text>
<rect class="n" x="20" y="130" width="40" height="28"/><text x="40" y="144" class="sm">a3</text><text x="75" y="144">+</text><rect class="n" x="90" y="130" width="40" height="28"/><text x="110" y="144" class="sm">b3</text><text x="145" y="144">=</text><rect class="h" x="160" y="130" width="40" height="28"/><text x="180" y="144" class="sm">c3</text>
<text x="110" y="180">명령어 4번</text>
<path class="e d" d="M240,10 V190"/>
<text x="400" y="12">SIMD (256비트 레지스터)</text>
<rect class="n" x="300" y="30" width="50" height="30"/><rect class="n" x="350" y="30" width="50" height="30"/><rect class="n" x="400" y="30" width="50" height="30"/><rect class="n" x="450" y="30" width="50" height="30"/>
<text x="325" y="45" class="sm">a0</text><text x="375" y="45" class="sm">a1</text><text x="425" y="45" class="sm">a2</text><text x="475" y="45" class="sm">a3</text>
<text x="280" y="80">+</text>
<rect class="n" x="300" y="70" width="50" height="30"/><rect class="n" x="350" y="70" width="50" height="30"/><rect class="n" x="400" y="70" width="50" height="30"/><rect class="n" x="450" y="70" width="50" height="30"/>
<text x="325" y="85" class="sm">b0</text><text x="375" y="85" class="sm">b1</text><text x="425" y="85" class="sm">b2</text><text x="475" y="85" class="sm">b3</text>
<path class="a" d="M400,102 V126"/>
<rect class="h" x="300" y="130" width="50" height="30"/><rect class="h" x="350" y="130" width="50" height="30"/><rect class="h" x="400" y="130" width="50" height="30"/><rect class="h" x="450" y="130" width="50" height="30"/>
<text x="325" y="145" class="sm">c0</text><text x="375" y="145" class="sm">c1</text><text x="425" y="145" class="sm">c2</text><text x="475" y="145" class="sm">c3</text>
<text x="400" y="180">명령어 1번 (float64 4개 / float32면 8개)</text>
</svg>` },
    math: [
      { tex: R`\text{레인 수} = \frac{\text{레지스터 폭}}{\text{원소 크기}} \qquad \text{예: } \frac{256}{32} = 8,\ \ \frac{256}{64} = 4`, explain: R`명령어 하나가 동시에 처리하는 원소 수. 이론적 최대 속도 향상이며, 실제로는 메모리 대역폭·데이터 정렬·나머지 원소 처리 등으로 더 작다.` },
    ],
    code: R`
import time
import numpy as np

def bench(f, repeat=3):
  best = float("inf")
  for _ in range(repeat):
      t0 = time.perf_counter(); f(); best = min(best, time.perf_counter() - t0)
  return best

n = 1_000_000
x, y = np.random.rand(n), np.random.rand(n)
xl, yl = x.tolist(), y.tolist()

t_py = bench(lambda: [a * b + 1.0 for a, b in zip(xl, yl)])
t_np = bench(lambda: x * y + 1.0)
print(f"파이썬 루프 {t_py * 1e3:.1f}ms / numpy {t_np * 1e3:.2f}ms → 약 {t_py / t_np:.0f}배")

# 분기 대신 마스크: SIMD 방식은 양쪽을 계산한 뒤 조건으로 고른다
t_if = bench(lambda: [v if v > 0.5 else 0.0 for v in xl])
t_where = bench(lambda: np.where(x > 0.5, x, 0.0))
print(f"if 루프 {t_if * 1e3:.1f}ms / np.where {t_where * 1e3:.2f}ms")

# float32: 레지스터당 원소 2배, 메모리 이동량 절반 (out=으로 임시 배열 생성도 제거)
x32, y32 = x.astype(np.float32), y.astype(np.float32)
o64, o32 = np.empty_like(x), np.empty_like(x32)
t64 = bench(lambda: np.multiply(x, y, out=o64))
t32 = bench(lambda: np.multiply(x32, y32, out=o32))
print(f"곱셈 float64 {t64 * 1e3:.3f}ms / float32 {t32 * 1e3:.3f}ms")

# 원소 간 의존이 있는 연산(누적합)도 numpy가 C 루프로 처리하지만, 독립 연산보다는 벡터화 이득이 작다
print("누적합 마지막 값 일치:", np.isclose(np.cumsum(x)[-1], x.sum()))
`,
    links: [
      { to: 'ds-array', why: 'numpy 배열은 같은 타입의 값을 연속 저장한다' },
      { to: 'ca-cache', why: '연속 메모리 + 캐시 라인 = SIMD에 데이터를 빠르게 공급' },
      { to: 'ca-gpu', why: 'SIMD를 수천 개 스레드로 확장한 GPU' },
      { to: 'ca-number', why: 'float32·float16이 처리량을 높이는 이유' },
      { to: 'ml-knn', why: '모든 점까지의 거리를 루프 없이 한 번에 계산하기' },
      { to: 'ca-pipeline', why: '명령어 수준 병렬성(파이프라인) vs 데이터 수준 병렬성(SIMD)' },
    ],
    quiz: [
      { q: 'numpy 연산이 파이썬 루프보다 빠른 이유 중 SIMD와 <strong>무관한</strong> 것은?',
        options: ['원소마다 바이트코드 해석·타입 확인·float 객체 생성을 하지 않는다', '명령어 하나로 여러 원소를 계산한다', '256비트 레지스터에 float64 4개를 담는다', 'float32는 레지스터당 원소가 두 배다'], answer: 0,
        explain: '인터프리터 오버헤드 제거는 SIMD 없이도 얻는 이득이며, 보통 가장 큰 차이를 만든다. 나머지는 모두 SIMD에 관한 설명이다.' },
      { q: '원소마다 if/else로 다른 계산을 하는 코드가 SIMD로 처리하기 어려운 이유와 해결 방식은?',
        options: ['if문은 CPU가 실행할 수 없다 → 사용 금지', '레인마다 다른 명령어를 실행할 수 없다 → 양쪽 결과를 모두 계산한 뒤 조건 마스크로 고른다(np.where 방식)', '분기가 있으면 메모리가 부족하다 → 배열을 나눈다'], answer: 1,
        explain: '양쪽을 다 계산하는 낭비가 있어도, 분기 오예측과 원소별 처리를 피하는 이득이 보통 더 크다. GPU의 분기 발산 문제와 같은 원리다.' },
      { q: '같은 원소별 곱셈에서 float32 배열이 float64보다 빠른 이유로 가장 적절한 것은?',
        options: ['float32 곱셈 결과가 항상 정확해서', '같은 폭의 SIMD 레지스터에 두 배 많은 원소가 들어가고, 메모리에서 읽고 써야 할 바이트도 절반이기 때문', 'float32는 정수 연산으로 처리되어서'], answer: 1,
        explain: '원소별 연산은 메모리 대역폭에 묶이는 경우가 많아 바이트 수 절감 효과가 크다. 대신 정밀도(유효숫자 약 7자리)를 잃는다.' },
    ],
    resources: ['Hennessy & Patterson, 『Computer Architecture: A Quantitative Approach』 4장 — 데이터 수준 병렬성(벡터, SIMD, GPU)', 'NumPy 문서 — CPU/SIMD Optimizations', 'Jake VanderPlas, 『Python Data Science Handbook』 2장 — NumPy 유니버설 함수(무료 공개)'],
  },
  {
    id:'ca-gpu', title: 'CPU vs GPU와 병렬 처리',
    summary: R`CPU: 소수의 강한 코어, <strong>지연 시간</strong> 최적화
GPU: 수천 개 단순 유닛, <strong>처리량</strong> 최적화
한계: 암달의 법칙·메모리 대역폭`,
    body: R`
<h3>설계 철학의 차이</h3>
<p>CPU는 트랜지스터를 큰 캐시, 정교한 분기 예측, 비순차 실행에 써서 <strong>한 흐름(스레드)을 최대한 빨리</strong> 끝내도록 설계된다. 운영체제, 웹 서버 요청 처리, 분기가 많은 일반 프로그램에 적합하다. GPU는 그 면적을 대부분 <strong>연산 유닛</strong>에 쓰고, 제어 로직과 캐시는 작게 둔다. 대신 엄청나게 많은 스레드를 띄워 두고, 어떤 스레드 묶음이 메모리를 기다리면 즉시 다른 묶음을 실행해 <strong>지연 시간을 숨긴다</strong>. 한 작업은 느려도 전체 처리량이 크다.</p>
<h3>SIMT와 분기 발산</h3>
<p>NVIDIA GPU는 32개 스레드를 워프(warp)로 묶어 같은 명령어를 함께 실행한다(SIMT). 워프 안의 스레드들이 if/else에서 다른 쪽으로 갈리면 두 경로를 <strong>차례로</strong> 실행하고 해당하지 않는 스레드는 쉰다(분기 발산). 그래서 데이터마다 다른 흐름을 타는 코드는 GPU에서 효율이 떨어진다. SIMD의 마스크 처리와 같은 원리다.</p>
<h3>왜 딥러닝은 GPU인가</h3>
<p>신경망의 핵심 연산인 행렬 곱은 서로 독립적인 곱셈·덧셈이 대량으로 있다. 게다가 $n \times n$ 행렬 곱은 데이터 $O(n^2)$를 읽어 연산 $O(n^3)$을 하므로, 읽은 바이트당 연산 수(<strong>산술 강도</strong>)가 높아 연산 유닛을 쉬지 않고 채울 수 있다. 최신 GPU는 작은 행렬 블록의 곱-누산을 한 번에 처리하는 전용 유닛(NVIDIA Tensor Core 등)을 갖추고, FP16·BF16·INT8 같은 낮은 정밀도에서 처리량이 특히 크다.</p>
<h3>병렬화의 한계 1: 암달의 법칙</h3>
<p>프로그램 중 병렬화할 수 있는 비율이 $p$라면, 프로세서를 무한히 늘려도 속도 향상은 $1/(1-p)$를 넘지 못한다. 90%를 병렬화해도 최대 10배다. 남은 직렬 부분(데이터 로딩, 파이썬 제어 코드, 동기화)이 병목이 된다. 실제 학습 파이프라인에서 GPU 사용률이 낮다면 이 직렬 부분이 원인인 경우가 많다. (문제 크기를 함께 키우면 병렬 부분의 비중이 커져 더 많은 프로세서를 활용할 수 있다는 관점이 구스타프슨의 법칙이다.)</p>
<h3>병렬화의 한계 2: 메모리 대역폭 (루프라인 모델)</h3>
<p>달성 가능한 성능은 <strong>min(최대 연산 성능, 메모리 대역폭 × 산술 강도)</strong>다. 원소별 덧셈·활성화 함수처럼 원소 하나를 읽고 연산 한두 번만 하는 연산은 산술 강도가 매우 낮아 GPU의 연산 능력을 쓰지 못하고 메모리 속도에 묶인다(<strong>memory-bound</strong>). 큰 행렬 곱은 연산 능력에 묶인다(<strong>compute-bound</strong>). 그래서 딥러닝 프레임워크는 여러 원소별 연산을 하나의 커널로 합쳐(연산 융합) 메모리 왕복을 줄인다.</p>
<h3>병렬화의 한계 3: 데이터 이동</h3>
<p>CPU 메모리와 GPU 메모리 사이의 전송(PCIe 등)은 GPU 내부 메모리 대역폭보다 훨씬 느리다. 작은 연산마다 데이터를 오가게 하면 전송 시간이 계산 시간을 압도한다. 데이터를 GPU에 올려 두고 가능한 많은 계산을 그 안에서 끝내는 것이 원칙이다.</p>
<h3>병렬 처리의 여러 수준</h3>
<p>명령어 수준(파이프라인, 슈퍼스칼라), 데이터 수준(SIMD, GPU), 스레드 수준(멀티코어), 그리고 여러 장치·여러 서버로의 분산(데이터 병렬: 배치를 나눠 각 GPU가 같은 모델로 계산 후 그래디언트를 평균 / 모델 병렬: 모델 자체를 나눠 배치). 큰 모델 학습은 이 수준들을 모두 조합한다.</p>`,
    analogy: R`<p>CPU는 <strong>베테랑 코치 몇 명</strong>, GPU는 <strong>육성군 선수 수천 명</strong>이다. 상대 타선 분석과 볼배합 설계(분기 많은 순차 작업)는 코치 몇 명이 훨씬 빨리 끝낸다. 하지만 "구장 좌석 2만 개 닦기"(행렬 곱)는 선수들이 나눠 맡으면 압도적으로 빠르다. 단, 모두가 같은 구령에 맞춰 같은 동작을 해야 하고(SIMT), 선수들을 버스로 구장까지 실어 나르는 시간(데이터 전송)이 청소 시간보다 길면 의미가 없으며, 감독 혼자 해야 하는 마지막 결재(직렬 부분)가 있으면 그만큼은 기다려야 한다(암달의 법칙).</p>`,
    diagram: { caption: 'CPU는 칩 면적을 강력한 코어·제어 로직·큰 캐시에, GPU는 수많은 단순한 연산 유닛에 쓴다(개념도).', svg: R`
<svg viewBox="0 0 540 215" width="540">
<defs><pattern id="gpuCore" width="19" height="15" patternUnits="userSpaceOnUse" x="295" y="35"><rect class="h" x="1" y="1" width="15" height="11"/></pattern></defs>
<text x="135" y="12">CPU: 소수의 강력한 코어</text>
<rect class="g" x="10" y="22" width="250" height="175" rx="8"/>
<rect class="h" x="25" y="35" width="75" height="50" rx="4"/><text x="62" y="60" class="sm">코어</text>
<rect class="h" x="110" y="35" width="75" height="50" rx="4"/><text x="147" y="60" class="sm">코어</text>
<rect class="h" x="25" y="95" width="75" height="50" rx="4"/><text x="62" y="120" class="sm">코어</text>
<rect class="h" x="110" y="95" width="75" height="50" rx="4"/><text x="147" y="120" class="sm">코어</text>
<rect class="n" x="195" y="35" width="55" height="110" rx="4"/><text x="222" y="80" class="sm">제어·</text><text x="222" y="96" class="sm">분기 예측</text>
<rect class="n" x="25" y="155" width="225" height="32" rx="4"/><text x="137" y="171" class="sm">큰 캐시</text>
<text x="408" y="12">GPU: 수천 개의 단순한 연산 유닛</text>
<rect class="g" x="280" y="22" width="255" height="175" rx="8"/>
<rect x="295" y="35" width="228" height="105" fill="url(#gpuCore)"/>
<rect class="n" x="295" y="150" width="228" height="37" rx="4"/><text x="409" y="168" class="sm">작은 캐시 · 공유 메모리</text>
<text x="270" y="210" class="sm">지연 시간 최적화 ←→ 처리량 최적화</text>
</svg>` },
    math: [
      { tex: R`S(N) = \frac{1}{(1 - p) + \dfrac{p}{N}} \;\xrightarrow{\,N\to\infty\,}\; \frac{1}{1 - p}`, explain: R`암달의 법칙.<ul class="defs"><li>$p$: 병렬화 가능한 비율</li><li>$N$: 프로세서 수</li></ul>$p = 0.9$이면 $N$이 아무리 커도 최대 10배.` },
      { tex: R`P_{\text{달성}} = \min\big(P_{\text{peak}},\; \beta \times I\big), \qquad I = \frac{\text{연산 수 (FLOP)}}{\text{메모리 이동량 (byte)}}`, explain: R`루프라인 모델.<ul class="defs"><li>$P_\text{peak}$: 최대 연산 성능</li><li>$\beta$: 메모리 대역폭</li><li>$I$: 산술 강도</li></ul>$I$가 작으면 메모리에, 크면 연산에 묶인다.` },
      { tex: R`I_{\text{matmul}} \approx \frac{2n^3}{3n^2 \cdot b} = \frac{2n}{3b}, \qquad I_{c=a+b} = \frac{1}{3b}`, explain: R`$n \times n$ 행렬 곱(A, B 읽기 + C 쓰기)과 원소별 덧셈의 산술 강도. $b$: 원소 크기(바이트). 행렬 곱은 $n$에 비례해 커지고, 원소별 연산은 상수로 매우 작다.` },
    ],
    code: R`
import time
import numpy as np

def amdahl(p, n):
  return 1 / ((1 - p) + p / n)

for p in (0.5, 0.9, 0.99):
  print(f"병렬 비율 {p:.0%}: 8개 → {amdahl(p, 8):5.2f}배, 1000개 → {amdahl(p, 1000):6.2f}배 (상한 {1 / (1 - p):.0f}배)")

b = 4                                            # float32
print(f"산술 강도  원소별 덧셈: {1 / (3 * b):.3f} FLOP/byte  /  4096×4096 행렬 곱: {2 * 4096 / (3 * b):.0f} FLOP/byte")

# 같은 CPU에서도 compute-bound와 memory-bound의 차이가 보인다
n = 2048
A = np.random.rand(n, n).astype(np.float32)
B = np.random.rand(n, n).astype(np.float32)
A @ B                                            # 워밍업
t0 = time.perf_counter(); A @ B; t = time.perf_counter() - t0
print(f"행렬 곱 {n}×{n}: {2 * n**3 / t / 1e9:6.1f} GFLOP/s  (BLAS: SIMD + 캐시 블로킹 + 멀티코어)")

x = np.random.rand(20_000_000).astype(np.float32)
y = np.random.rand(20_000_000).astype(np.float32)
out = np.empty_like(x)
np.add(x, y, out=out)                            # 워밍업
t0 = time.perf_counter(); np.add(x, y, out=out); t = time.perf_counter() - t0
print(f"원소별 덧셈   : {x.size / t / 1e9:6.1f} GFLOP/s, 메모리 {3 * x.nbytes / t / 1e9:.0f} GB/s  ← 메모리 대역폭이 한계")
`,
    links: [
      { to: 'ca-simd', why: 'GPU의 SIMT는 SIMD를 스레드 단위로 확장한 것' },
      { to: 'ca-hierarchy', why: 'GPU 메모리(HBM) 용량·대역폭과 온칩 메모리' },
      { to: 'ca-number', why: '낮은 정밀도(FP16·BF16·INT8)에서 처리량이 커지는 이유' },
      { to: 'os-thread', why: 'CPU의 스레드 병렬성과 GIL' },
      { to: 'dl-transformer', why: 'Transformer는 행렬 곱 중심이라 GPU 병렬화에 유리하다' },
      { to: 'ai-llm', why: 'LLM 학습·추론의 계산량과 메모리 요구' },
    ],
    quiz: [
      { q: '프로그램의 90%를 완벽히 병렬화할 수 있다. 프로세서를 무한히 늘리면 최대 속도 향상은?',
        options: ['무한대', '90배', '10배', '9배'], answer: 2,
        explain: '암달의 법칙: 1/(1−0.9) = 10. 남은 10%의 직렬 부분이 전체 시간의 하한을 만든다.' },
      { q: 'GPU 커널 안에서 스레드마다 데이터에 따라 다른 if/else 경로를 타면 성능이 떨어지는 이유는?',
        options: ['GPU는 if문을 지원하지 않아서', '같은 워프의 스레드들이 같은 명령어를 함께 실행하므로, 경로가 갈리면 각 경로를 차례로 실행하며 해당 없는 스레드는 쉬기 때문', 'if문이 메모리를 많이 써서'], answer: 1,
        explain: '분기 발산. CPU의 분기 예측처럼 "갈림 자체"를 줄이는 방향(데이터 정렬, 마스크 연산)으로 해결한다.' },
      { q: 'GPU에서 ReLU 같은 원소별 연산 여러 개를 따로 실행하면 행렬 곱에 비해 GPU의 최대 연산 성능을 거의 쓰지 못하는 이유는?',
        options: ['원소별 연산은 GPU에서 실행되지 않아서', '읽고 쓰는 바이트에 비해 연산이 매우 적어(산술 강도가 낮아) 메모리 대역폭에 묶이기 때문 — 그래서 여러 연산을 하나로 합치는 연산 융합을 쓴다', '원소별 연산은 정밀도가 높아서'], answer: 1,
        explain: '루프라인 모델에서 산술 강도가 낮으면 성능 = 대역폭 × 강도다. 연산을 합치면 중간 결과를 메모리에 쓰고 다시 읽는 왕복이 사라진다.' },
    ],
    resources: ['Hennessy & Patterson, 『Computer Architecture: A Quantitative Approach』 4장 — GPU', 'NVIDIA CUDA C++ Programming Guide — Introduction, SIMT Architecture', 'Williams, Waterman & Patterson, "Roofline: An Insightful Visual Performance Model for Multicore Architectures" (2009)', 'Horace He, "Making Deep Learning Go Brrrr From First Principles" (블로그 글, 2022)'],
  },
  { id:'ca-logic', title: '불 대수와 논리회로' },
];
