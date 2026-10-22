TOPICS.ds = [
  {
    id:'ds-complexity', title: '시간복잡도와 점근 표기', advanced: true,
    summary: R`입력 크기 $n$ 증가 시 연산 횟수가 <strong>어떤 꼴로 증가하는지</strong>로 비교
하드웨어 무관: "데이터 10배 → 얼마나 느려지나" 판단`,
    body: R`
<p>알고리즘의 성능을 "몇 초 걸렸다"로 비교하면 컴퓨터·언어·입력이 바뀔 때마다 결론이 달라진다. 그래서 <strong>입력 크기 $n$에 대해 기본 연산 횟수가 어떤 함수 꼴로 늘어나는가</strong>를 본다. 관심사는 절대 시간이 아니라 <em>확장성</em>이다. 데이터가 10배가 되면 시간이 10배인지, 100배인지.</p>
<h3>왜 상수와 낮은 차수 항을 버리는가</h3>
<p>$3n^2 + 100n + 5000$에서 $n=10$이면 상수 5000이 가장 크지만 $n=10^6$이면 $3n^2 = 3\times10^{12}$이 나머지를 압도한다. 점근 표기는 <strong>충분히 큰 $n$</strong>에서의 행동만 본다. 계수 3을 버리는 이유는 그 정도 차이는 CPU나 언어 구현이 바뀌면 달라지는 값이라 알고리즘 고유의 성질이 아니기 때문이다.</p>
<h3>O·Ω·Θ와 최선·평균·최악은 서로 다른 축</h3>
<p>$O$는 상한, $\Omega$는 하한, $\Theta$는 상한과 하한이 같은 꼴(증가율이 정확히 그 함수)임을 뜻한다. 반면 최선/평균/최악은 <em>어떤 입력을 볼지</em>에 대한 선택이다. 그래서 "퀵 정렬은 최악의 경우 $\Theta(n^2)$, 평균 $\Theta(n\log n)$"처럼 두 축을 조합해 말한다. 흔히 "O(n log n) 알고리즘"이라고 할 때는 보통 평균이나 최악 기준의 증가율을 느슨하게 가리킨다.</p>
<h3>로그는 어디서 나오는가</h3>
<p>매 단계 문제 크기를 <strong>일정 비율로 줄이면</strong>(예: 절반) 단계 수는 $\log n$이다. 이진 탐색, 균형 트리의 높이, 병합 정렬의 분할 깊이가 모두 이 구조다. 로그의 밑은 $\log_a n = \log_b n / \log_b a$ 관계로 상수배 차이일 뿐이라 표기에서 생략한다. $n$이 1000배 커져도 $\log_2 n$은 약 10만 늘어난다.</p>
<h3>복잡도가 같아도 속도는 다를 수 있다</h3>
<p>점근 표기는 상수를 숨기므로 실제 성능은 메모리 접근 패턴(캐시), 인터프리터 오버헤드 등에도 좌우된다. 같은 $O(n)$ 합계라도 Python <code>for</code> 루프보다 C로 구현된 <code>sum()</code>이나 numpy가 훨씬 빠르다. 또 $n$이 작으면 상수가 작은 $O(n^2)$ 삽입 정렬이 유리할 수 있어서, Python의 정렬(Timsort)도 짧은 구간에는 삽입 정렬을 쓴다. 공간 복잡도(추가 메모리)도 같은 방식으로 분석한다.</p>`,
    analogy: R`<p>두꺼운 책에서 단어 찾기. 첫 쪽부터 한 장씩 넘기면 책이 두 배 두꺼워질 때 시간도 두 배($O(n)$). 사전처럼 정렬되어 있으면 가운데를 펴서 앞/뒤 절반을 버리는 걸 반복하므로, 책이 두 배가 되어도 <strong>한 번만 더 펼치면</strong> 된다($O(\log n)$). 어느 사람이 손이 더 빠른지(상수)는 책이 아주 두꺼워지면 의미가 없어진다.</p>`,
    diagram: { caption: '증가율 비교. n이 커질수록 곡선의 "꼴" 차이가 상수 차이를 압도한다.', svg: R`
<svg viewBox="0 0 490 270" width="490">
<path class="a" d="M40,245 V18"/><path class="a" d="M40,245 H425"/>
<text x="418" y="258" class="sm">n</text><text x="60" y="14" class="sm">연산 수</text>
<path class="e" d="M40,220 H400"/><text x="406" y="220" class="st">O(1)</text>
<path class="e" d="M40,243 C55,190 150,172 400,166"/><text x="406" y="166" class="st">O(log n)</text>
<path class="e" d="M40,245 L400,112"/><text x="406" y="112" class="st">O(n)</text>
<path class="e" d="M40,245 Q200,178 400,42"/><text x="406" y="42" class="st">O(n log n)</text>
<path class="he" d="M40,245 Q290,240 330,22"/><text x="340" y="22" class="st">O(n²)</text>
</svg>` },
    math: [
      { tex: R`f(n) = O(g(n)) \iff \exists\, c>0,\ n_0 \ \text{s.t.}\ \forall n \ge n_0,\ f(n) \le c\cdot g(n)`, explain: R`<ul class="defs"><li>$f$: 실제 연산 횟수</li><li>$g$: 비교 기준 함수</li><li>$c$: 상수배 여유</li><li>$n_0$: "충분히 큰 n"의 시작점</li></ul>작은 $n$에서는 무엇이든 성립하지 않아도 된다는 점이 핵심.` },
      { tex: R`\sum_{i=0}^{n-1} (n-1-i) = \frac{n(n-1)}{2} = \Theta(n^2)`, explain: R`모든 쌍 $(i, j)$, $i &lt; j$를 확인하는 이중 루프의 반복 횟수. 안쪽 루프가 점점 짧아져도 여전히 $n^2$ 꼴이다.` },
    ],
    code: R`
import time

def count_log(n):          # 절반씩 줄이기
  ops = 0
  while n > 1:
      n //= 2
      ops += 1
  return ops

def count_linear(n):
  ops = 0
  for _ in range(n):
      ops += 1
  return ops

def count_quadratic(n):    # 모든 쌍 (i, j), i < j
  ops = 0
  for i in range(n):
      for j in range(i + 1, n):
          ops += 1
  return ops

for n in [10, 100, 1000, 2000]:
  print(f"n={n:5d}  log:{count_log(n):3d}  linear:{count_linear(n):6d}  quad:{count_quadratic(n):8d}")

# 입력을 2배로 늘렸을 때 실제 시간이 몇 배가 되는가?
def ratio(f, n):
  t0 = time.perf_counter(); f(n)
  t1 = time.perf_counter(); f(2 * n)
  t2 = time.perf_counter()
  return (t2 - t1) / (t1 - t0)

print("linear    ×", round(ratio(count_linear, 1_000_000), 1))   # 약 2
print("quadratic ×", round(ratio(count_quadratic, 1500), 1))      # 약 4
`,
    links: [
      { to: 'ds-array', why: '자료구조별 연산 복잡도의 대표 예: list의 append·insert·in' },
      { to: 'ds-search', why: '로그 시간의 대표 예: 매번 절반을 버리는 탐색' },
      { to: 'ca-cache', why: '복잡도가 같아도 메모리 접근 패턴에 따라 실제 속도가 크게 달라지는 이유' },
      { to: 'ml-knn', why: 'KNN 예측은 학습 데이터 n개 × 차원 d → O(nd). 데이터가 커지면 근사 탐색이 필요해진다' },
    ],
    quiz: [
      { q: '실행 시간이 $3n^2 + 100n + 5000$인 알고리즘을 $O(n^2)$라고 부르는 가장 정확한 이유는?',
        options: ['100n과 5000은 n이 1 이상이면 언제나 3n²보다 작은 항이기 때문', 'n이 충분히 커지면 n² 항이 증가를 지배하고, 계수 3은 상수배일 뿐이기 때문', 'O 표기는 최악의 경우를 나타내므로 가장 큰 항 하나만 남기기 때문', '실행 시간이 정확히 n²에 비례하도록 나머지 항이 상쇄되기 때문'],
        answer: 1, explain: '"모든 n에서 작다"는 거짓이다(n=10이면 5000이 더 크다). 점근 표기는 "충분히 큰 n"에서 상수배를 무시한 증가 꼴만 본다. O를 최악의 경우와 동일시하는 것은 흔한 오해 — O는 상한이라는 뜻이고, 어떤 경우(최악/평균)를 볼지는 별개의 선택이다.' },
      { q: '퀵 정렬을 흔히 "O(n log n) 정렬"이라 부르면서 최악의 경우 $O(n^2)$라고도 한다. 이것이 모순이 아닌 이유는?',
        options: ['O는 평균을, 최악은 Θ로 따로 써야 하므로 앞의 표현이 부정확한 것이다', '경우(평균·최악)와 경계(O·Ω·Θ)는 별개의 축이고, 앞의 말은 평균 경우이기 때문', '피벗을 무작위로 고르면 최악의 경우가 이론적으로 아예 생기지 않기 때문', 'n²은 n log n의 상한이므로 O(n²)이라고 써도 같은 뜻이 되기 때문'],
        answer: 1, explain: '"어떤 입력에 대해"(평균/최악)와 "어떤 경계로"(O/Ω/Θ)는 독립적인 선택이다. 퀵 정렬은 평균 Θ(n log n), 최악 Θ(n²)이다.' },
      { q: '입력이 1,000배 커졌을 때 $O(\log_2 n)$ 알고리즘의 연산 횟수는 대략 어떻게 변하는가?',
        options: ['약 1,000배 증가 (곱셈으로)', '약 10배 증가 (곱셈으로)', '약 10회 증가 (덧셈으로)', '약 1,000회 증가 (덧셈으로)'],
        answer: 2, explain: '$\\log_2(1000n) = \\log_2 n + \\log_2 1000 \\approx \\log_2 n + 10$. 곱셈이 덧셈으로 바뀌는 것이 로그의 본질이다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 3장 — 점근 표기', 'MIT OCW 6.006 Introduction to Algorithms', '『파이썬 알고리즘 인터뷰』(박상길) — 빅오 및 자료형별 복잡도'],
  },
  {
    id:'ds-array', title: '배열과 동적 배열',
    summary: R`같은 크기 칸을 <strong>연속된 메모리</strong>에 배치 → 주소 계산 한 번으로 $O(1)$ 접근
Python <code>list</code> = 객체 참조(포인터)를 담는 동적 배열`,
    body: R`
<p>배열의 핵심은 <strong>주소 계산</strong>이다. 각 칸의 크기가 같고 연속되어 있으므로 $i$번째 칸의 주소는 <code>시작 주소 + i × 칸 크기</code> 한 번의 계산으로 나온다. 그래서 0번째든 100만 번째든 접근 시간이 같다(임의 접근, random access).</p>
<p>대가는 <strong>중간 삽입·삭제</strong>다. 연속성을 유지하려면 그 뒤의 원소를 모두 한 칸씩 밀거나 당겨야 하므로 $O(n)$이다. 맨 끝에서의 추가·삭제만 싸다.</p>
<h3>동적 배열: 크기가 자라는 배열</h3>
<p>고정 크기 배열에 원소가 꽉 차면, 더 큰 배열을 새로 할당하고 전부 복사해야 한다. 이때 <strong>얼마나 크게</strong> 늘리느냐가 성능을 결정한다.</p>
<ul>
<li><strong>일정 비율(예: 2배)로 늘리면</strong>: 복사 비용 합이 $1+2+4+\cdots+n < 2n$이라 append $n$번의 총비용이 $O(n)$, <strong>한 번당 $O(1)$</strong>.</li>
<li><strong>일정량(예: +10)씩 늘리면</strong>: 복사가 $n/10$번 일어나고 매번 길이가 늘어 총비용 $O(n^2)$.</li>
</ul>
<p>CPython의 list는 비율 방식으로 여유 공간을 미리 확보한다(배율은 2배보다 작고, 세부 공식은 버전마다 다르다). 비율이 1보다 크기만 하면 한 번당 $O(1)$은 유지된다.</p>
<h3>Python list는 '값'이 아니라 '참조'의 배열</h3>
<p><code>[1, 'a', 3.0]</code>처럼 타입이 섞여도 인덱싱이 $O(1)$인 이유는, list가 실제 객체가 아니라 <strong>같은 크기의 포인터(객체 주소)</strong>를 연속 저장하기 때문이다. 실제 객체들은 힙 메모리 여기저기에 흩어져 있다. 그래서 순회할 때마다 포인터를 따라가야 하고 캐시 효율이 낮다.</p>
<p>반면 numpy 배열은 같은 dtype의 <strong>값 자체</strong>를 연속으로 저장한다. 포인터 추적이 없고 CPU 캐시와 SIMD 명령을 잘 활용할 수 있어, 같은 $O(n)$ 연산이 훨씬 빠르다.</p>
<table><tr><th>list 연산</th><th>복잡도</th><th>이유</th></tr>
<tr><td><code>a[i]</code>, <code>a[i] = x</code></td><td>$O(1)$</td><td>주소 계산</td></tr>
<tr><td><code>a.append(x)</code>, <code>a.pop()</code></td><td>$O(1)$</td><td>끝에서만 변경 (가끔 확장 복사)</td></tr>
<tr><td><code>a.insert(0, x)</code>, <code>a.pop(0)</code></td><td>$O(n)$</td><td>나머지 전부 이동</td></tr>
<tr><td><code>x in a</code></td><td>$O(n)$</td><td>정렬 정보가 없어 전부 비교</td></tr></table>`,
    analogy: R`<p>번호가 붙은 사물함 줄. 37번 사물함은 번호만 알면 바로 간다. 하지만 3번과 4번 사이에 새 사물함을 끼우려면 4번 이후 짐을 전부 한 칸씩 옮겨야 한다. 사물함이 꽉 차면 더 큰 복도로 <strong>이사</strong>해야 하는데, 이사할 때마다 넉넉하게 두 배 크기로 옮기면 이사 횟수 자체가 드물어진다.</p>`,
    diagram: { caption: 'Python list는 포인터를, numpy 배열은 값 자체를 연속 저장한다. 회색 칸은 미리 확보한 여유 용량.', svg: R`
<svg viewBox="0 0 520 250" width="520">
<text x="20" y="16" class="st">Python list — 포인터의 연속 배열</text>
<rect class="n" x="20" y="30" width="50" height="34"/><rect class="n" x="70" y="30" width="50" height="34"/><rect class="n" x="120" y="30" width="50" height="34"/><rect class="n" x="170" y="30" width="50" height="34"/>
<rect class="g" x="220" y="30" width="50" height="34"/><rect class="g" x="270" y="30" width="50" height="34"/>
<text x="45" y="47">●</text><text x="95" y="47">●</text><text x="145" y="47">●</text><text x="195" y="47">●</text>
<text x="295" y="78" class="sm">여유 용량</text>
<rect class="n" x="20" y="115" width="56" height="28" rx="6"/><text x="48" y="129">3</text>
<rect class="n" x="150" y="105" width="56" height="28" rx="6"/><text x="178" y="119">'a'</text>
<rect class="n" x="250" y="120" width="56" height="28" rx="6"/><text x="278" y="134">2.5</text>
<rect class="n" x="360" y="100" width="70" height="28" rx="6"/><text x="395" y="114">[1, 2]</text>
<path class="a" d="M45,64 L46,113"/><path class="a" d="M95,64 L170,104"/><path class="a" d="M145,64 L265,119"/><path class="a" d="M195,64 L370,100"/>
<text x="440" y="150" class="sm">객체는 메모리 곳곳에</text>
<text x="20" y="182" class="st">numpy float64 — 값 자체가 연속</text>
<rect class="h" x="20" y="196" width="64" height="34"/><rect class="h" x="84" y="196" width="64" height="34"/><rect class="h" x="148" y="196" width="64" height="34"/><rect class="h" x="212" y="196" width="64" height="34"/>
<text x="52" y="213">1.0</text><text x="116" y="213">2.0</text><text x="180" y="213">3.0</text><text x="244" y="213">4.0</text>
<text x="52" y="242" class="sm">+0</text><text x="116" y="242" class="sm">+8</text><text x="180" y="242" class="sm">+16</text><text x="244" y="242" class="sm">+24 바이트</text>
</svg>` },
    math: [
      { tex: R`\text{addr}(a[i]) = \text{base} + i \times s`, explain: R`<ul class="defs"><li>base: 배열 시작 주소</li><li>$s$: 칸 하나의 바이트 수(list는 포인터 크기, float64 배열은 8)</li></ul>곱셈·덧셈 한 번이므로 $i$와 무관하게 $O(1)$.` },
      { tex: R`1 + 2 + 4 + \cdots + 2^{k} = 2^{k+1} - 1 < 2n \quad (2^k \le n)`, explain: R`2배씩 늘릴 때 전체 복사 비용의 합. $n$번 append의 총비용이 $O(n)$이므로 한 번당 $O(1)$.` },
    ],
    code: R`
import sys, timeit
import numpy as np

# 1) 용량이 '가끔' 크게 늘어나는 것을 관찰 (over-allocation)
lst, last = [], sys.getsizeof([])
for i in range(40):
  lst.append(i)
  size = sys.getsizeof(lst)
  if size != last:
      print(f"len={len(lst):3d}  bytes={size}")
      last = size

# 2) 끝 삽입 O(1) vs 앞 삽입 O(n)
n = 20000
t_end = timeit.timeit("a.append(0)", setup="a=[]", number=n)
t_front = timeit.timeit("a.insert(0, 0)", setup="a=[]", number=n)
print(f"append: {t_end:.4f}s   insert(0): {t_front:.4f}s")

# 3) numpy: 원소 크기(itemsize)와 다음 원소까지의 거리(strides)
a = np.arange(5, dtype=np.float64)
print(a.itemsize, a.strides)   # 8 (8,) → i번째 주소 = 시작 + 8*i
`,
    links: [
      { to: 'ds-complexity', why: '복잡도 표기와 증가율 비교' },
      { to: 'ds-linkedlist', why: '반대 트레이드오프: 중간 삽입은 싸지만 임의 접근이 느리다' },
      { to: 'ca-cache', why: '연속 메모리 → 공간 지역성 → 캐시 적중률이 높다' },
      { to: 'ca-simd', why: 'numpy 벡터화가 빠른 이유: 연속된 같은 타입 값을 한 명령으로 여러 개 처리' },
      { to: 'pl-object', why: 'Python에서 변수와 list 원소는 모두 객체에 대한 참조' },
    ],
    quiz: [
      { q: '동적 배열이 꽉 찰 때마다 용량을 "+10칸"씩 늘리도록 구현하면 append $n$번의 총비용은?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n√n)'], answer: 2,
        explain: '복사가 약 n/10번 일어나고, k번째 복사 비용은 약 10k. 합은 10(1+2+…+n/10) ≈ n²/20 → O(n²). 비율로 늘려야 한 번당 O(1)이 된다.' },
      { q: '<code>[1, "a", 3.0]</code>처럼 서로 크기가 다른 객체가 섞여 있는데도 list 인덱싱이 $O(1)$인 이유는?',
        options: ['CPython이 각 칸을 가장 큰 객체 크기에 맞춰 고정 폭으로 할당하기 때문', 'list는 객체 자체가 아니라 같은 크기의 참조(포인터)를 연속 저장하기 때문', 'list가 인덱스를 키로 하는 해시 테이블로 구현되어 있기 때문', '원소마다 다음 원소의 위치를 함께 저장해 바로 건너뛸 수 있기 때문'], answer: 1,
        explain: '칸에 들어 있는 것은 모두 같은 크기의 주소값이다. 대신 실제 객체에 도달하려면 한 번 더 따라가야 해서 캐시 효율이 떨어진다.' },
      { q: '데이터를 계속 앞쪽에 추가하고 앞쪽에서 꺼내야 하는 작업에 list 대신 쓸 자료구조로 가장 적절한 것은?',
        options: ['heapq로 관리하는 list', 'collections.deque', 'array.array', 'numpy 배열'], answer: 1,
        explain: 'list의 insert(0)/pop(0)은 O(n)이다. deque는 양 끝 추가·삭제가 O(1)이다.' },
    ],
    resources: ['『Fluent Python』(Luciano Ramalho) 2장 — 시퀀스', 'CPython 소스 Objects/listobject.c (list_resize)', 'NumPy 공식 문서 — The N-dimensional array (strides)'],
  },
  {
    id:'ds-linkedlist', title: '연결 리스트',
    summary: R`각 노드가 다음 노드의 <strong>참조</strong>를 보유
위치를 알면 삽입·삭제 $O(1)$, $i$번째 탐색은 $O(n)$`,
    body: R`
<p>배열은 "연속성" 덕분에 주소 계산이 가능했다. 연결 리스트는 연속성을 포기하는 대신 <strong>각 노드가 다음 노드의 위치를 직접 기억</strong>한다. 노드는 <code>(값, next)</code>로 구성되고, 메모리 어디에 있어도 된다.</p>
<h3>트레이드오프</h3>
<ul>
<li><strong>삽입·삭제</strong>: 대상 노드의 앞 노드를 이미 가지고 있다면 포인터 1~2개만 바꾸면 끝나므로 $O(1)$. 다른 원소를 옮길 필요가 없다.</li>
<li><strong>탐색·임의 접근</strong>: $i$번째 노드의 주소를 계산할 방법이 없으므로 head부터 $i$번 따라가야 한다. $O(n)$.</li>
</ul>
<p>그래서 "연결 리스트 삽입은 $O(1)$"이라는 말에는 <strong>위치를 이미 알고 있다면</strong>이라는 조건이 숨어 있다. 값으로 위치를 찾는 단계까지 포함하면 $O(n)$이다.</p>
<h3>변형</h3>
<p><strong>이중 연결 리스트</strong>는 prev 포인터도 가져서, 노드 참조만 있으면 자기 자신을 $O(1)$에 삭제할 수 있다. 이 성질 덕분에 <strong>해시 테이블 + 이중 연결 리스트</strong>는 LRU 캐시의 고전적인 구현이다: 해시로 노드를 $O(1)$에 찾고, 리스트에서 떼어 맨 앞으로 옮기는 것도 $O(1)$. Python의 <code>collections.deque</code>는 고정 크기 블록들을 이중 연결 리스트로 이은 구조라 양 끝 연산이 $O(1)$이다.</p>
<h3>이론과 현실의 차이</h3>
<p>노드들이 메모리에 흩어져 있어 순회할 때마다 캐시 미스가 나기 쉽고, 노드마다 포인터 공간과 할당 비용이 든다. 그래서 많은 경우 "중간 삽입이 잦다"는 이유만으로 연결 리스트가 배열보다 빨라지지는 않는다. 실제 성능은 측정으로 확인해야 한다.</p>`,
    analogy: R`<p>보물찾기 쪽지. 첫 쪽지에 "다음은 신발장"이라고 적혀 있고, 신발장 쪽지엔 "다음은 화분 밑"이라 적혀 있다. 중간에 새 장소를 끼우려면 쪽지 하나만 고쳐 쓰면 된다(삽입 $O(1)$). 하지만 "다섯 번째 장소"에 바로 가는 방법은 없다. 처음부터 따라가야 한다.</p>`,
    diagram: { caption: '3 뒤에 5를 삽입: 새 노드가 7을 가리키게 한 뒤, 3이 새 노드를 가리키게 한다. 순서를 반대로 하면 7 이후를 잃어버린다.', svg: R`
<svg viewBox="0 0 520 190" width="520">
<text x="22" y="57">head</text><path class="a" d="M44,57 H58"/>
<rect class="n" x="60" y="40" width="40" height="34"/><rect class="n" x="100" y="40" width="24" height="34"/><text x="80" y="57">3</text><text x="112" y="57">●</text>
<rect class="n" x="200" y="40" width="40" height="34"/><rect class="n" x="240" y="40" width="24" height="34"/><text x="220" y="57">7</text><text x="252" y="57">●</text>
<rect class="n" x="330" y="40" width="40" height="34"/><rect class="n" x="370" y="40" width="24" height="34"/><text x="350" y="57">9</text><text x="382" y="57">●</text>
<text x="460" y="57">None</text>
<path class="a d" d="M112,57 H198"/><path class="a" d="M252,57 H328"/><path class="a" d="M382,57 H436"/>
<rect class="h" x="140" y="125" width="40" height="34"/><rect class="h" x="180" y="125" width="24" height="34"/><text x="160" y="142">5</text><text x="192" y="142">●</text>
<path class="ha" d="M112,74 L152,123"/><path class="ha" d="M192,125 L214,76"/>
<text x="128" y="110" class="en sm">② 3.next = 새 노드</text><text x="292" y="110" class="sm">① 새 노드.next = 7</text>
</svg>` },
    code: R`
class Node:
  def __init__(self, val, next=None):
      self.val, self.next = val, next

def from_list(xs):
  head = None
  for x in reversed(xs):
      head = Node(x, head)
  return head

def to_list(head):
  out = []
  while head:
      out.append(head.val)
      head = head.next
  return out

def insert_after(node, val):      # O(1): 포인터만 바꾼다
  node.next = Node(val, node.next)

def reverse(head):                # O(n) 시간, O(1) 추가 공간
  prev, cur = None, head
  while cur:
      nxt = cur.next            # 1) 다음 노드를 잃기 전에 저장
      cur.next = prev           # 2) 방향 뒤집기
      prev, cur = cur, nxt      # 3) 한 칸 전진
  return prev

head = from_list([3, 7, 9])
insert_after(head, 5)
print(to_list(head))              # [3, 5, 7, 9]
print(to_list(reverse(head)))     # [9, 7, 5, 3]
`,
    links: [
      { to: 'ds-array', why: '반대 트레이드오프의 짝' },
      { to: 'ds-hash', why: '해시 + 이중 연결 리스트 = LRU 캐시' },
      { to: 'os-vm', why: '페이지 교체 알고리즘 LRU의 구현 아이디어' },
      { to: 'ca-cache', why: '흩어진 노드 → 공간 지역성이 낮아 캐시 미스가 잦다' },
    ],
    quiz: [
      { q: '"연결 리스트의 삽입은 O(1)"이라는 말이 성립하려면 필요한 조건은?',
        options: ['삽입할 값이 리스트의 기존 값보다 작거나 같아야 한다', '삽입할 위치(앞 노드)의 참조를 이미 가지고 있어야 한다', '꼬리(tail) 포인터를 따로 유지하고 있어야 한다', '삽입할 위치의 인덱스를 미리 알고 있어야 한다'], answer: 1,
        explain: '포인터를 바꾸는 작업 자체는 O(1)이지만, 값이나 인덱스로 그 위치를 찾는 데는 O(n)이 든다.' },
      { q: '리스트 뒤집기에서 <code>cur.next = prev</code> 전에 <code>nxt = cur.next</code>를 먼저 저장해야 하는 이유는?',
        options: ['prev가 None인 첫 노드에서 속성 오류가 나는 것을 막기 위해서', 'cur.next를 덮어쓰면 나머지 리스트로 가는 유일한 참조를 잃기 때문', 'nxt를 먼저 저장해야 마지막에 head를 새로 지정할 수 있기 때문', 'cur.next를 바꾸면 이전 노드 prev의 next도 함께 바뀌기 때문'], answer: 1,
        explain: '단일 연결 리스트에서 다음 노드로 가는 길은 next 하나뿐이다. 덮어쓰기 전에 보관해야 한다.' },
      { q: '중간 삽입이 이론상 O(1)인데도 실제로는 Python list(배열)가 더 빠른 경우가 많은 이유로 가장 적절한 것은?',
        options: ['연결 리스트는 위치를 찾은 뒤에도 뒤쪽 노드를 한 칸씩 옮겨야 해서', '노드가 메모리에 흩어져 캐시 지역성이 낮고, 노드마다 할당 비용이 들어서', 'Python list는 중간 삽입 시 내부적으로 연결 리스트로 전환되기 때문', '배열은 빈 칸을 미리 확보해 두어 원소를 옮기지 않고 삽입하기 때문'], answer: 1,
        explain: '점근 복잡도는 상수를 숨긴다. 연속된 메모리를 한 번에 옮기는 것(memmove)은 매우 빠르고, 포인터를 따라가는 순회는 캐시 미스가 많다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 10장', 'LeetCode "Linked List" 태그 문제 (Reverse Linked List, LRU Cache)'],
  },
  {
    id:'ds-stack-queue', title: '스택과 큐', advanced: true,
    summary: R`넣고 꺼내는 순서 규칙만 정의한 추상 자료형
스택(LIFO): <strong>되돌아가기</strong> / 큐(FIFO): <strong>차례 지키기</strong>`,
    body: R`
<p>스택과 큐는 구현이 아니라 <strong>인터페이스(추상 자료형, ADT)</strong>다. "어떤 연산이 있고 어떤 순서로 나오는가"만 정한다. 같은 스택을 배열로도, 연결 리스트로도 만들 수 있다.</p>
<h3>스택 = 가장 최근 것부터 처리</h3>
<p>스택이 자연스러운 상황은 <strong>중첩 구조</strong>다. 괄호 <code>( [ { } ] )</code>는 가장 나중에 연 것을 가장 먼저 닫아야 하고, 함수 A가 B를, B가 C를 호출하면 C가 먼저 끝나야 B로 돌아갈 수 있다. 그래서 프로그램 실행 시 함수 호출 정보(지역 변수, 돌아갈 위치)는 <strong>콜 스택</strong>에 쌓인다. 재귀 함수는 이 콜 스택을 암묵적으로 쓰는 것이고, 반복문으로 바꾸려면 명시적 스택이 필요하다. Python은 기본 재귀 깊이 한도(<code>sys.getrecursionlimit()</code>, 보통 1000)가 있어서 깊은 재귀는 명시적 스택으로 바꾸는 편이 안전하다.</p>
<p>그 밖에 DFS, 실행 취소(Undo), 수식 계산(후위 표기) 등이 스택의 응용이다.</p>
<h3>큐 = 먼저 온 것부터 처리</h3>
<p>큐는 <strong>공정성과 순서</strong>가 필요한 곳에 쓰인다. 프린터 작업 대기열, OS의 준비(ready) 큐, 네트워크 패킷 버퍼, 그리고 BFS. BFS가 큐를 쓰는 이유는 "가까운 것부터" 처리해야 하기 때문이다 — 먼저 발견된 노드가 먼저 확장된다.</p>
<h3>구현할 때의 함정</h3>
<p>Python list로 큐를 만들면 <code>pop(0)</code>이 뒤 원소를 모두 당기므로 $O(n)$이다. <code>collections.deque</code>를 써야 한다. 배열로 큐를 직접 구현할 때는 <strong>원형 큐</strong>를 쓴다: head와 tail 인덱스를 모듈러로 돌려 앞쪽 빈 칸을 재사용한다. 이때 head == tail이 "비었다"와 "가득 찼다"를 구별하지 못하는 문제가 있어서, 한 칸을 비워 두거나 원소 개수를 따로 센다.</p>`,
    analogy: R`<p>스택은 <strong>쌓인 접시</strong>: 위에 놓고 위에서 꺼낸다. 큐는 <strong>은행 번호표</strong>: 먼저 뽑은 사람이 먼저 창구로 간다. 원형 큐는 <strong>회전 초밥 레일</strong>: 끝에 도달한 자리가 다시 처음과 이어져 빈 접시 자리를 재사용한다.</p>`,
    diagram: { caption: '스택은 한쪽 끝에서만 넣고 빼고, 큐는 뒤로 넣고 앞에서 뺀다.', svg: R`
<svg viewBox="0 0 520 220" width="520">
<text x="100" y="16">스택 (LIFO)</text>
<path class="a" d="M85,40 V82"/><path class="a" d="M115,82 V40"/>
<text x="62" y="60" class="sm">push</text><text x="136" y="60" class="sm">pop</text>
<rect class="h" x="60" y="95" width="80" height="32"/><text x="100" y="111">C (top)</text>
<rect class="n" x="60" y="127" width="80" height="32"/><text x="100" y="143">B</text>
<rect class="n" x="60" y="159" width="80" height="32"/><text x="100" y="175">A</text>
<path class="e" d="M52,95 V199 H148 V95"/>
<text x="350" y="16">큐 (FIFO)</text>
<rect class="h" x="260" y="110" width="45" height="36"/><rect class="n" x="305" y="110" width="45" height="36"/><rect class="n" x="350" y="110" width="45" height="36"/><rect class="n" x="395" y="110" width="45" height="36"/>
<text x="282" y="128">A</text><text x="327" y="128">B</text><text x="372" y="128">C</text><text x="417" y="128">D</text>
<path class="a" d="M258,128 H206"/><text x="226" y="104" class="sm">dequeue</text>
<path class="a" d="M500,128 H444"/><text x="472" y="104" class="sm">enqueue</text>
<text x="282" y="164" class="sm">front</text><text x="417" y="164" class="sm">rear</text>
</svg>` },
    math: [
      { tex: R`\text{tail} = (\text{head} + \text{size}) \bmod C`, explain: R`원형 큐에서 다음 원소를 넣을 위치. $C$: 배열 용량. 모듈러 연산 덕분에 배열 끝 다음이 0번 칸으로 이어진다.` },
    ],
    code: R`
from collections import deque

def is_balanced(s):
  pairs = {')': '(', ']': '[', '}': '{'}
  stack = []
  for ch in s:
      if ch in '([{':
          stack.append(ch)               # 여는 괄호는 짝이 올 때까지 보관
      elif ch in pairs:
          if not stack or stack.pop() != pairs[ch]:
              return False               # 가장 최근에 연 괄호와 짝이 맞아야 함
  return not stack

print(is_balanced("f(a[i], {k: v})"))    # True
print(is_balanced("(]"))                  # False

class CircularQueue:
  def __init__(self, capacity):
      self.buf = [None] * capacity
      self.head = self.size = 0          # size를 따로 세서 빈/가득 참을 구별
  def enqueue(self, x):
      if self.size == len(self.buf):
          raise OverflowError("가득 참")
      self.buf[(self.head + self.size) % len(self.buf)] = x
      self.size += 1
  def dequeue(self):
      if self.size == 0:
          raise IndexError("비어 있음")
      x = self.buf[self.head]
      self.head = (self.head + 1) % len(self.buf)
      self.size -= 1
      return x

q = CircularQueue(3)
for x in (1, 2, 3):
  q.enqueue(x)
print(q.dequeue(), q.dequeue())            # 1 2
q.enqueue(4); q.enqueue(5)                 # 배열 끝을 넘어 앞칸을 재사용
print([q.dequeue() for _ in range(3)])     # [3, 4, 5]

dq = deque([1, 2, 3])                      # 실전에서는 deque
dq.appendleft(0); dq.pop()
print(dq)                                  # deque([0, 1, 2])
`,
    links: [
      { to: 'ds-graph', why: 'DFS는 스택, BFS는 큐 — 자료구조가 탐색 순서를 결정한다' },
      { to: 'os-process', why: '프로세스 메모리의 스택 영역 = 콜 스택' },
      { to: 'os-sched', why: '준비 큐와 FCFS·라운드 로빈 스케줄링' },
      { to: 'net-congestion', why: '라우터·소켓 버퍼는 큐이며, 넘치면 패킷이 버려진다' },
    ],
    quiz: [
      { q: '재귀 DFS를 반복문으로 바꿀 때 명시적인 스택이 필요한 이유는?',
        options: ['반복문에서는 지역 변수가 매 반복마다 초기화되어 방문 표시가 사라지기 때문', '재귀가 콜 스택에 암묵적으로 저장하던 "돌아갈 지점"을 직접 보관해야 하기 때문', '스택을 쓰지 않으면 방문 순서가 BFS와 같아져 결과가 달라지기 때문', '반복문은 그래프에 사이클이 있으면 종료 조건을 판단할 수 없기 때문'], answer: 1,
        explain: '재귀 호출은 호출 정보를 콜 스택에 쌓는다. 반복문으로 바꾸면 "아직 처리하지 않은 노드"를 같은 LIFO 순서로 직접 보관해야 한다.' },
      { q: 'BFS에서 스택 대신 큐를 써야 시작점과 가까운 노드부터 방문하는 이유는?',
        options: ['큐는 이미 방문한 노드를 자동으로 걸러 내 중복 방문이 생기지 않기 때문', '먼저 발견된(더 가까운) 노드가 먼저 꺼내져 이웃이 확장되기 때문', '큐는 꺼낼 때마다 거리가 가장 작은 노드를 골라 주는 구조이기 때문', '스택은 나중에 넣은 노드를 버려 일부 노드를 방문하지 못하기 때문'], answer: 1,
        explain: 'FIFO 덕분에 거리 d인 노드들이 모두 처리된 뒤에 거리 d+1인 노드가 처리된다. 스택을 쓰면 DFS가 된다.' },
      { q: '배열 기반 원형 큐에서 head와 tail 인덱스만 쓸 때 생기는 문제와 해결책은?',
        options: ['빈 상태와 가득 찬 상태가 모두 head == tail → 한 칸을 비우거나 개수를 센다', '앞쪽에 빈 칸이 생겨도 다시 쓸 수 없다 → 꺼낼 때마다 원소를 앞으로 당긴다', 'tail이 배열 끝을 넘어선다 → 가득 차면 배열을 두 배로 늘려 복사한다', '삭제할 때 head 앞쪽 값이 남는다 → 꺼낸 칸을 None으로 지워 준다'], answer: 0,
        explain: '가득 찰 때까지 넣으면 tail이 한 바퀴 돌아 head와 같아진다. 그래서 용량을 1 줄이거나 size 변수를 둔다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 10.1', 'Python 공식 문서 — collections.deque', '『SICP』1.2절 — 재귀 프로세스와 반복 프로세스'],
  },
  {
    id:'ds-hash', title: '해시 테이블',
    summary: R`키 → 해시 함수 → <strong>배열 인덱스</strong>로 바로 접근
평균 $O(1)$ 조회, Python <code>dict</code>·<code>set</code>의 기반`,
    body: R`
<p>배열은 인덱스를 알면 $O(1)$이다. 해시 테이블은 이 성질을 임의의 키로 확장한다: <strong>키 → 정수(해시) → 배열 인덱스</strong>. 보통 <code>index = hash(key) mod m</code> ($m$: 버킷 수)이다.</p>
<h3>충돌은 피할 수 없다</h3>
<p>가능한 키는 무한하고 버킷은 유한하므로(비둘기집 원리) 서로 다른 키가 같은 버킷에 오는 <strong>충돌</strong>이 반드시 생긴다. 해결 방식은 두 가지다.</p>
<ul>
<li><strong>체이닝</strong>: 버킷마다 리스트를 두고 충돌한 항목을 이어 붙인다.</li>
<li><strong>개방 주소법</strong>: 버킷이 차 있으면 정해진 규칙(선형·이차 탐사, 이중 해싱 등)으로 다른 빈 칸을 찾는다. 모든 항목이 하나의 배열 안에 있어 캐시 효율이 좋다. CPython의 dict가 이 방식이다.</li>
</ul>
<p>어느 방식이든 같은 버킷 안에서는 <strong><code>==</code>로 실제 키를 비교</strong>해 구분한다. 해시는 후보를 좁히는 용도이고, 최종 판단은 동등성 비교다.</p>
<h3>적재율과 리사이즈</h3>
<p>적재율 $\alpha = n/m$이 커질수록 충돌이 늘어 탐색 비용이 커진다. 그래서 일정 적재율을 넘으면 버킷 배열을 키우고 모든 항목을 다시 배치(재해싱)한다. 동적 배열처럼 비율로 키우면 재해싱 비용이 여러 삽입에 나눠져 삽입이 평균 $O(1)$로 유지된다. CPython dict는 테이블의 약 2/3가 차면 확장한다.</p>
<h3>왜 dict 키는 해시 가능(불변)해야 하는가</h3>
<p>키를 넣을 때 계산한 해시로 버킷이 정해진다. 만약 키 객체의 내용이 바뀌어 해시가 달라지면, 나중에 찾을 때 <strong>다른 버킷을 보게 되어</strong> 분명히 넣은 키를 찾지 못한다. 그래서 list처럼 가변 객체는 <code>__hash__</code>를 제공하지 않는다. 같은 이유로 직접 만든 클래스에서는 <code>a == b</code>이면 반드시 <code>hash(a) == hash(b)</code>이어야 한다. <code>1 == 1.0 == True</code>이므로 이 셋의 해시도 같다.</p>
<h3>평균 O(1), 최악 O(n)</h3>
<p>모든 키가 한 버킷에 몰리면 탐색은 $O(n)$이 된다. 공격자가 의도적으로 충돌 키를 대량 전송하는 <strong>해시 충돌 DoS</strong>를 막기 위해 Python은 문자열·바이트의 해시에 프로세스마다 다른 무작위 시드를 쓴다(<code>PYTHONHASHSEED</code>). 그래서 실행할 때마다 <code>hash("abc")</code> 값이 다르다.</p>
<h3>해시 테이블이 못 하는 일</h3>
<p>해시는 키의 순서를 의도적으로 흩어 놓는다. 따라서 "80 이상 90 이하인 키"나 "가장 작은 키" 같은 <strong>범위·순서 질의</strong>는 전체를 훑어야 한다. 이런 질의가 필요하면 정렬을 유지하는 트리(DB의 B-Tree 인덱스)를 쓴다. 또 해시는 "정확히 같은 키"만 찾는다. "비슷한 벡터"를 찾는 벡터 검색에는 오히려 비슷한 입력이 같은 버킷에 오도록 설계한 <strong>LSH(Locality-Sensitive Hashing)</strong> 같은 다른 아이디어가 필요하다.</p>`,
    analogy: R`<p>도서관에서 책 제목의 첫 글자로 서가를 정하는 규칙. "ㄱ" 서가에 가면 바로 찾을 수 있다(평균 $O(1)$). 하지만 "ㄱ"으로 시작하는 책이 너무 많으면 그 서가 안에서 한 권씩 확인해야 하고(충돌), 서가가 넘치면 규칙을 더 잘게 나눠 책을 전부 재배치한다(재해싱). 이 규칙으로는 "출판 연도가 2000~2010년인 책"을 찾을 수 없다(범위 질의 불가).</p>`,
    diagram: { caption: 'hash(k) mod m으로 버킷이 정해지고, apple과 melon처럼 충돌한 키는 체인으로 연결된다(체이닝 방식).', svg: R`
<svg viewBox="0 0 540 230" width="540">
<rect class="n" x="20" y="34" width="84" height="30" rx="6"/><text x="62" y="49">"apple"</text>
<rect class="n" x="20" y="100" width="84" height="30" rx="6"/><text x="62" y="115">"grape"</text>
<rect class="n" x="20" y="166" width="84" height="30" rx="6"/><text x="62" y="181">"melon"</text>
<text x="215" y="14" class="sm">hash(k) % m</text>
<path class="a" d="M104,49 L328,68"/><path class="a" d="M104,115 L328,164"/><path class="ha" d="M104,181 L328,72"/>
<rect class="n" x="330" y="20" width="40" height="32"/><rect class="n" x="330" y="52" width="40" height="32"/><rect class="n" x="330" y="84" width="40" height="32"/><rect class="n" x="330" y="116" width="40" height="32"/><rect class="n" x="330" y="148" width="40" height="32"/><rect class="n" x="330" y="180" width="40" height="32"/>
<text x="350" y="36" class="sm">0</text><text x="350" y="68" class="sm">1</text><text x="350" y="100" class="sm">2</text><text x="350" y="132" class="sm">3</text><text x="350" y="164" class="sm">4</text><text x="350" y="196" class="sm">5</text>
<path class="a" d="M370,68 H392"/><rect class="n" x="394" y="54" width="64" height="28" rx="5"/><text x="426" y="68">apple:3</text>
<path class="a" d="M458,68 H472"/><rect class="h" x="474" y="54" width="64" height="28" rx="5"/><text x="506" y="68">melon:7</text>
<path class="a" d="M370,164 H392"/><rect class="n" x="394" y="150" width="64" height="28" rx="5"/><text x="426" y="164">grape:2</text>
</svg>` },
    math: [
      { tex: R`\alpha = \frac{n}{m}`, explain: R`적재율.<ul class="defs"><li>$n$: 저장된 항목 수</li><li>$m$: 버킷 수</li></ul>체이닝에서 버킷 하나의 평균 길이와 같다.` },
      { tex: R`\mathbb{E}[\text{탐색 비용}] = \Theta(1 + \alpha)`, explain: R`키들이 버킷에 균등하게 퍼진다는 가정(단순 균등 해싱)에서 체이닝의 기대 탐색 비용. 1은 해시 계산과 버킷 접근, $\alpha$는 체인 순회. $\alpha$를 상수 이하로 유지하면 $O(1)$.` },
    ],
    code: R`
class HashMap:
  """체이닝 방식 해시 테이블 (학습용)"""
  def __init__(self, m=8):
      self.buckets = [[] for _ in range(m)]
      self.n = 0

  def _bucket(self, key):
      return self.buckets[hash(key) % len(self.buckets)]

  def put(self, key, value):
      b = self._bucket(key)
      for i, (k, _) in enumerate(b):
          if k == key:                       # 버킷 안에서는 == 로 실제 키 비교
              b[i] = (key, value)
              return
      b.append((key, value))
      self.n += 1
      if self.n / len(self.buckets) > 0.75:  # 적재율 초과 → 2배로 재해싱
          self._resize(2 * len(self.buckets))

  def get(self, key):
      for k, v in self._bucket(key):
          if k == key:
              return v
      raise KeyError(key)

  def _resize(self, m):
      items = [kv for b in self.buckets for kv in b]
      self.buckets = [[] for _ in range(m)]
      for k, v in items:
          self._bucket(k).append((k, v))

h = HashMap()
for i in range(20):
  h.put(f"key{i}", i)
print(h.get("key13"), "버킷 수:", len(h.buckets), "최장 체인:", max(map(len, h.buckets)))

print(hash(1) == hash(1.0) == hash(True))   # True: 같다고 비교되는 값은 해시도 같아야 한다
try:
  {[1, 2]: "x"}
except TypeError as e:
  print("TypeError:", e)                    # unhashable type: 'list'
`,
    links: [
      { to: 'db-index', why: '해시 인덱스는 등호 검색에 강하고, 범위 검색은 B-Tree가 담당한다' },
      { to: 'db-vector', why: '정확한 일치가 아닌 "유사한 벡터" 검색 — LSH 등 근사 최근접 탐색' },
      { to: 'sec-hash', why: '암호학적 해시는 충돌을 "찾기 어렵게" 설계된 다른 목적의 해시' },
      { to: 'pl-mutable', why: '불변 객체만 dict 키가 될 수 있는 이유' },
      { to: 'ds-linkedlist', why: '해시 + 이중 연결 리스트 = LRU 캐시' },
    ],
    quiz: [
      { q: 'list를 dict의 키로 쓸 수 없는 근본적인 이유는?',
        options: ['list는 원소 수가 많아 해시값을 계산하는 비용이 너무 크기 때문', '내용이 바뀌면 해시가 바뀌어 저장한 버킷과 다른 버킷을 찾게 되기 때문', 'list는 원소 순서가 있어 같은 원소라도 다른 키로 취급되기 때문', 'list는 서로 다른 타입을 담을 수 있어 비교 연산이 정의되지 않기 때문'], answer: 1,
        explain: '해시 테이블은 "같은 키 → 항상 같은 해시"를 전제로 한다. 가변 객체는 이 전제를 깰 수 있으므로 hash를 제공하지 않는다. tuple은 불변이라(원소도 모두 해시 가능하면) 키로 쓸 수 있다.' },
      { q: '해시 테이블의 적재율을 매우 낮게(예: 0.1) 유지하면 생기는 효과는?',
        options: ['충돌이 줄어 조회가 빨라지지만 빈 버킷이 많아 메모리를 많이 쓴다', '버킷이 많아 해시 계산이 느려지고 오히려 조회 시간이 늘어난다', '메모리는 아끼지만 체인이 길어져 조회가 O(n)에 가까워진다', '재해싱이 자주 일어나 삽입마다 평균 O(n)의 비용이 든다'], answer: 0,
        explain: '시간과 공간의 트레이드오프. 버킷을 넉넉히 두면 충돌은 줄지만 빈 칸이 많아진다.' },
      { q: '선수별 타율을 dict로 저장했을 때 "타율이 0.280~0.300인 선수 찾기"가 비효율적인 이유는?',
        options: ['float 키는 해시값이 정밀도 문제로 불안정해 비교가 정확하지 않아서', '해시는 키의 크기 순서를 보존하지 않아 범위에 맞는 버킷을 알 수 없어서', 'dict는 같은 타율(같은 키)을 가진 선수를 하나만 저장할 수 있어서', '범위 조회는 키마다 해시를 다시 계산해야 해서 O(n log n)이 되어서'], answer: 1,
        explain: '좋은 해시 함수일수록 비슷한 키를 멀리 흩어 놓는다. 범위 질의에는 정렬 순서를 유지하는 트리 구조가 필요하다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 11장 — 해시 테이블', 'Raymond Hettinger, "Modern Python Dictionaries: A confluence of a dozen great ideas" (PyCon 2017 발표)', 'CPython 소스 Objects/dictobject.c 상단 주석'],
  },
  {
    id:'ds-tree', title: '트리와 이진 탐색 트리', advanced: true,
    summary: R`BST: 왼쪽 &lt; 노드 &lt; 오른쪽 → 비교마다 한쪽 서브트리 제외
성능 = <strong>트리 높이</strong>`,
    body: R`
<p>트리는 사이클이 없는 연결 그래프이고, 루트에서 각 노드로 가는 경로가 유일하다. 계층(파일 시스템, HTML DOM, 조직도)을 표현하는 자연스러운 구조다. 여기서는 탐색에 쓰이는 <strong>이진 탐색 트리(BST)</strong>의 원리에 집중한다.</p>
<h3>불변식 하나가 모든 것을 결정한다</h3>
<p>BST의 규칙: 모든 노드에 대해 <strong>왼쪽 서브트리의 키 &lt; 노드의 키 &lt; 오른쪽 서브트리의 키</strong>. 이 규칙 덕분에 찾는 값과 현재 노드를 한 번 비교하면 반대쪽 서브트리 전체를 볼 필요가 없어진다. 정렬된 배열의 이진 탐색을 "포인터 구조"로 옮긴 것이다. 같은 이유로 <strong>중위 순회</strong>(왼쪽 → 자기 → 오른쪽)를 하면 키가 정렬된 순서로 나온다.</p>
<h3>높이가 성능이다</h3>
<p>탐색·삽입·삭제 모두 루트에서 한 경로를 따라 내려가므로 $O(h)$이다($h$: 높이).</p>
<ul>
<li>균형이 잘 잡히면 $h \approx \log_2 n$ → $O(\log n)$.</li>
<li><strong>정렬된 순서로 삽입</strong>하면 매번 오른쪽에만 붙어 사실상 연결 리스트가 되고 $h = n-1$ → $O(n)$.</li>
</ul>
<p>그래서 실무용 트리는 삽입·삭제 때마다 <strong>회전(rotation)</strong>으로 높이를 $O(\log n)$으로 유지한다. AVL 트리(좌우 높이 차 ≤ 1)와 레드-블랙 트리(색 규칙으로 가장 긴 경로가 가장 짧은 경로의 2배 이하)가 대표적이다. 회전은 중위 순서를 보존하면서 부모-자식 관계만 바꾸는 연산이다.</p>
<h3>디스크에서는 B-Tree</h3>
<p>메모리에서는 비교 횟수가 비용이지만, 디스크(또는 SSD) 기반 DB에서는 <strong>블록을 읽는 횟수</strong>가 비용이다. 이진 트리는 노드 하나에 키 하나라 높이가 $\log_2 n$이다. B-Tree는 노드 하나(한 블록)에 키를 수백 개 넣어 분기 수를 키우고, 높이를 $\log_{\text{수백}} n$으로 낮춘다. 수억 건이어도 몇 번의 블록 읽기로 찾을 수 있는 이유다.</p>
<h3>해시 테이블과 비교</h3>
<p>평균 조회는 해시가 $O(1)$로 더 빠르지만, BST는 <strong>정렬 순서</strong>를 유지하므로 최솟값·최댓값, 범위 질의, "x보다 큰 가장 작은 키" 같은 질의를 $O(\log n)$(+ 결과 크기)에 처리할 수 있다.</p>`,
    analogy: R`<p>스무고개 게임. "50보다 커?"라는 질문 하나로 후보의 절반을 지운다. 질문을 잘 고르면(균형 트리) 100만 개 중 하나도 20번이면 맞히지만, "1이야? 2야? 3이야?"처럼 묻는다면(편향 트리) 최악의 경우 100만 번이 걸린다.</p>`,
    diagram: { caption: '65 탐색: 50 → 70 → 60 → 65. 비교할 때마다 한쪽 서브트리 전체가 후보에서 제외된다.', svg: R`
<svg viewBox="0 0 480 240" width="480">
<path class="he" d="M240,30 L340,90"/><path class="e" d="M240,30 L140,90"/>
<path class="e" d="M140,90 L90,150"/><path class="e" d="M140,90 L190,150"/>
<path class="he" d="M340,90 L290,150"/><path class="e" d="M340,90 L390,150"/>
<path class="he" d="M290,150 L330,210"/>
<circle class="h" cx="240" cy="30" r="19"/><text x="240" y="30">50</text>
<circle class="n" cx="140" cy="90" r="19"/><text x="140" y="90">30</text>
<circle class="h" cx="340" cy="90" r="19"/><text x="340" y="90">70</text>
<circle class="n" cx="90" cy="150" r="19"/><text x="90" y="150">20</text>
<circle class="n" cx="190" cy="150" r="19"/><text x="190" y="150">40</text>
<circle class="h" cx="290" cy="150" r="19"/><text x="290" y="150">60</text>
<circle class="n" cx="390" cy="150" r="19"/><text x="390" y="150">80</text>
<circle class="h" cx="330" cy="210" r="19"/><text x="330" y="210">65</text>
<text x="300" y="50" class="sm">65 &gt; 50</text><text x="345" y="125" class="sm">65 &lt; 70</text><text x="345" y="180" class="sm">65 &gt; 60</text>
<path class="d e" d="M60,120 H220 V185 H60 Z"/><text x="140" y="200" class="sm">한 번의 비교로 제외</text>
</svg>` },
    math: [
      { tex: R`h_{\min} = \lfloor \log_2 n \rfloor, \qquad h_{\max} = n - 1`, explain: R`노드 $n$개인 이진 트리의 최소 높이(완전 이진 트리)와 최대 높이(한쪽으로 편향). BST 연산 비용은 $O(h)$이므로 이 둘 사이 어디에 있느냐가 성능을 결정한다.` },
    ],
    code: R`
import random

class Node:
  __slots__ = ("key", "left", "right")
  def __init__(self, key):
      self.key, self.left, self.right = key, None, None

def insert(root, key):                    # 반복문으로 구현 (깊은 트리에서도 재귀 한도 문제 없음)
  if root is None:
      return Node(key)
  node = root
  while True:
      if key < node.key:
          if node.left is None:
              node.left = Node(key); break
          node = node.left
      else:
          if node.right is None:
              node.right = Node(key); break
          node = node.right
  return root

def search_steps(root, key):
  steps = 0
  while root:
      steps += 1
      if key == root.key:
          return steps
      root = root.left if key < root.key else root.right
  return steps

def height(root):                         # 레벨 단위로 내려가며 높이 계산
  h, level = -1, [root] if root else []
  while level:
      h += 1
      level = [c for n in level for c in (n.left, n.right) if c]
  return h

def inorder(root):                        # 왼쪽 → 자기 → 오른쪽 = 정렬 순서
  out, stack = [], []
  while stack or root:
      while root:
          stack.append(root); root = root.left
      root = stack.pop(); out.append(root.key); root = root.right
  return out

n = 2000
keys = list(range(n))
for name, order in [("무작위 순서 삽입", random.sample(keys, n)), ("정렬된 순서 삽입", keys)]:
  root = None
  for k in order:
      root = insert(root, k)
  print(f"{name}: 높이={height(root)}, 최댓값 탐색 비교 횟수={search_steps(root, n - 1)}")
print(inorder(root)[:10])
`,
    links: [
      { to: 'db-index', why: '디스크 블록 읽기 횟수를 줄이기 위해 분기 수를 늘린 B-Tree / B+Tree' },
      { to: 'ds-search', why: 'BST는 정렬 배열 이진 탐색의 동적(삽입 가능) 버전' },
      { to: 'ds-heap', why: '같은 이진 트리 모양이지만 다른 불변식(부모 ≤ 자식)' },
      { to: 'ml-tree', why: '결정 트리도 "질문 하나로 공간을 둘로 나누는" 트리 구조' },
      { to: 'ds-hash', why: '평균 조회 속도 vs 순서·범위 질의 지원의 트레이드오프' },
    ],
    quiz: [
      { q: '빈 BST에 1, 2, 3, …, n을 순서대로 삽입하면 탐색 비용은?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], answer: 2,
        explain: '매번 오른쪽 자식으로만 붙어 높이가 n-1인 연결 리스트 모양이 된다. 그래서 자가 균형 트리(AVL, 레드-블랙)가 필요하다.' },
      { q: 'BST를 중위 순회하면 키가 정렬된 순서로 나오는 이유는?',
        options: ['삽입할 때마다 트리 전체를 회전시켜 키를 크기 순으로 재배치하기 때문', '"왼쪽 < 노드 < 오른쪽" 규칙상 왼쪽 → 자기 → 오른쪽이 크기 순이라서', '중위 순회는 깊이가 얕은 노드부터 방문하는데 얕을수록 키가 작기 때문', '루트가 최솟값이고 아래로 내려갈수록 키가 커지도록 저장되기 때문'], answer: 1,
        explain: '각 노드에서 "나보다 작은 것 전부"를 먼저, "큰 것 전부"를 나중에 출력하므로 귀납적으로 전체가 정렬된다.' },
      { q: 'DB 인덱스에 이진 트리 대신 B-Tree를 쓰는 주된 이유는?',
        options: ['B-Tree는 해시를 함께 사용해 등호 조건을 O(1)에 찾을 수 있기 때문', '노드 하나에 많은 키를 담아 높이를 낮추고 디스크 블록 읽기를 줄이기 때문', '이진 트리는 범위 질의를 할 때 모든 노드를 순회해야 하기 때문', 'B-Tree는 삽입·삭제 때 재균형이 필요 없어 쓰기 비용이 적기 때문'], answer: 1,
        explain: '디스크 I/O는 블록 단위다. 한 블록에 키를 수백 개 넣으면 분기 수가 커져 높이가 log_수백(n)으로 줄어든다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 12장(BST), 13장(레드-블랙 트리), 18장(B-Tree)', 'VisuAlgo (visualgo.net) — BST/AVL 시각화', 'MIT OCW 6.006 — Binary Trees, AVL'],
  },
  {
    id:'ds-heap', title: '힙과 우선순위 큐', advanced: true,
    summary: R`최솟값(최댓값) 꺼내기 $O(\log n)$
완전 이진 트리 → <strong>포인터 없이 배열 하나</strong>로 저장`,
    body: R`
<p>우선순위 큐는 "넣기"와 "가장 우선순위가 높은 것 꺼내기"를 지원하는 ADT다. 정렬된 배열로 만들면 꺼내기는 $O(1)$이지만 넣기가 $O(n)$, 정렬 안 된 배열이면 그 반대다. <strong>힙</strong>은 두 연산 모두 $O(\log n)$으로 만드는 절충안이다.</p>
<h3>두 가지 규칙</h3>
<ol>
<li><strong>모양 규칙</strong>: 완전 이진 트리 — 마지막 레벨을 제외하고 꽉 차 있고, 마지막 레벨은 왼쪽부터 채운다.</li>
<li><strong>힙 규칙</strong>(최소 힙): 모든 부모 ≤ 자식. 따라서 루트가 최솟값이다.</li>
</ol>
<p>힙 규칙은 BST보다 훨씬 <strong>약하다</strong>. 부모-자식 관계만 정하고 형제나 사촌 사이의 순서는 정하지 않는다. 그래서 힙 배열을 그대로 출력하면 정렬되어 있지 않다. 이 약한 규칙 덕분에 유지 비용이 싸다.</p>
<h3>배열로 저장되는 이유</h3>
<p>완전 이진 트리는 빈칸이 없으므로 레벨 순서대로 배열에 넣으면 인덱스 계산만으로 부모·자식을 찾을 수 있다: $i$의 자식은 $2i+1, 2i+2$, 부모는 $\lfloor (i-1)/2 \rfloor$. 포인터가 없어 메모리 효율과 캐시 효율이 좋다.</p>
<h3>연산</h3>
<ul>
<li><strong>push</strong>: 배열 끝(모양 규칙 유지)에 넣고, 부모보다 작으면 교환하며 위로 올린다(sift-up). 최대 높이만큼 → $O(\log n)$.</li>
<li><strong>pop</strong>: 루트를 꺼내고, 마지막 원소를 루트로 옮긴 뒤 더 작은 자식과 교환하며 내린다(sift-down). $O(\log n)$.</li>
<li><strong>heapify</strong>: 배열 전체를 힙으로 만들기. 아래쪽 노드부터 sift-down하면 $O(n)$이다. 노드의 절반은 잎이라 내려갈 거리가 0이고, 높이가 높은 노드일수록 개수가 적기 때문이다.</li>
</ul>
<h3>응용</h3>
<p>다익스트라 최단 경로(가장 가까운 미확정 노드), OS·이벤트 스케줄링(가장 이른 시각의 작업), 힙 정렬, 그리고 <strong>Top-k</strong>: $n$개 중 상위 $k$개는 크기 $k$인 최소 힙을 유지하며 훑으면 $O(n\log k)$로, 전체 정렬 $O(n \log n)$보다 싸다. Python <code>heapq</code>는 최소 힙이며, 최대 힙이 필요하면 값의 부호를 뒤집어 넣는다.</p>`,
    analogy: R`<p>응급실 분류(트리아지). 대기 환자 전체를 위급한 순서로 완벽히 줄 세울 필요는 없다. "지금 가장 위급한 한 명"만 항상 알 수 있으면 된다. 새 환자가 오면 그 환자의 위급도에 맞는 높이까지만 올라가고, 맨 앞 환자가 진료실에 들어가면 남은 사람 중 가장 위급한 사람이 앞으로 온다.</p>`,
    diagram: { caption: '최소 힙의 트리 모양과 배열 표현. 노드 1(값 3)의 자식은 인덱스 2·1+1=3, 2·1+2=4.', svg: R`
<svg viewBox="0 0 520 255" width="520">
<path class="e" d="M260,30 L160,85 M260,30 L360,85 M160,85 L110,140 M160,85 L210,140 M360,85 L310,140 M360,85 L410,140"/>
<path class="he" d="M160,85 L110,140 M160,85 L210,140"/>
<circle class="n" cx="260" cy="30" r="18"/><text x="260" y="30">1</text><text x="290" y="22" class="sm">[0]</text>
<circle class="h" cx="160" cy="85" r="18"/><text x="160" y="85">3</text><text x="130" y="72" class="sm">[1]</text>
<circle class="n" cx="360" cy="85" r="18"/><text x="360" y="85">2</text><text x="390" y="72" class="sm">[2]</text>
<circle class="h" cx="110" cy="140" r="18"/><text x="110" y="140">7</text><text x="110" y="167" class="sm">[3]</text>
<circle class="h" cx="210" cy="140" r="18"/><text x="210" y="140">4</text><text x="210" y="167" class="sm">[4]</text>
<circle class="n" cx="310" cy="140" r="18"/><text x="310" y="140">5</text><text x="310" y="167" class="sm">[5]</text>
<circle class="n" cx="410" cy="140" r="18"/><text x="410" y="140">8</text><text x="410" y="167" class="sm">[6]</text>
<rect class="n" x="120" y="198" width="40" height="32"/><rect class="h" x="160" y="198" width="40" height="32"/><rect class="n" x="200" y="198" width="40" height="32"/><rect class="h" x="240" y="198" width="40" height="32"/><rect class="h" x="280" y="198" width="40" height="32"/><rect class="n" x="320" y="198" width="40" height="32"/><rect class="n" x="360" y="198" width="40" height="32"/>
<text x="140" y="214">1</text><text x="180" y="214">3</text><text x="220" y="214">2</text><text x="260" y="214">7</text><text x="300" y="214">4</text><text x="340" y="214">5</text><text x="380" y="214">8</text>
<text x="140" y="243" class="sm">0</text><text x="180" y="243" class="sm">1</text><text x="220" y="243" class="sm">2</text><text x="260" y="243" class="sm">3</text><text x="300" y="243" class="sm">4</text><text x="340" y="243" class="sm">5</text><text x="380" y="243" class="sm">6</text>
<text x="74" y="214" class="sm">배열</text>
</svg>` },
    math: [
      { tex: R`\text{left}(i) = 2i+1,\quad \text{right}(i) = 2i+2,\quad \text{parent}(i) = \left\lfloor \tfrac{i-1}{2} \right\rfloor`, explain: R`0부터 시작하는 인덱스 기준. 완전 이진 트리는 레벨 순서로 빈칸 없이 채워지므로 이 계산이 항상 맞다.` },
      { tex: R`\sum_{h=0}^{\lfloor \log n \rfloor} \left\lceil \frac{n}{2^{h+1}} \right\rceil \cdot O(h) = O\!\left(n \sum_{h} \frac{h}{2^{h}}\right) = O(n)`, explain: R`heapify의 총비용. 높이 $h$인 노드는 약 $n/2^{h+1}$개이고 각각 최대 $h$만큼 내려간다. $\sum h/2^h$는 상수(2)로 수렴한다.` },
    ],
    code: R`
import heapq, random

def push(h, x):
  h.append(x)
  i = len(h) - 1
  while i > 0 and h[(i - 1) // 2] > h[i]:    # 부모보다 작으면 위로 (sift-up)
      p = (i - 1) // 2
      h[i], h[p] = h[p], h[i]
      i = p

def pop(h):
  top, last = h[0], h.pop()
  if h:
      h[0] = last
      i = 0
      while True:                             # 더 작은 자식과 교환하며 아래로 (sift-down)
          l, r, m = 2 * i + 1, 2 * i + 2, i
          if l < len(h) and h[l] < h[m]: m = l
          if r < len(h) and h[r] < h[m]: m = r
          if m == i: break
          h[i], h[m] = h[m], h[i]
          i = m
  return top

data = random.sample(range(100), 10)
h = []
for x in data:
  push(h, x)
print("힙 배열 :", h)                                    # 정렬된 상태가 아니다
print("꺼낸 순서:", [pop(h) for _ in range(len(data))])  # 정렬된 순서로 나온다

# Top-k: 크기 k 힙으로 O(n log k)
nums = [random.random() for _ in range(100_000)]
print(heapq.nlargest(3, nums) == sorted(nums, reverse=True)[:3])   # True

# 최대 힙: 부호를 뒤집어 저장
mx = []
for x in [5, 1, 9]:
  heapq.heappush(mx, -x)
print(-heapq.heappop(mx))   # 9
`,
    links: [
      { to: 'ds-shortest', why: '다익스트라는 "가장 가까운 미확정 노드"를 힙으로 꺼낸다' },
      { to: 'ds-sort', why: '힙 정렬: heapify 후 n번 pop → O(n log n), 제자리 정렬' },
      { to: 'os-sched', why: '우선순위 스케줄링, 타이머 이벤트 처리' },
      { to: 'ml-knn', why: 'k개의 최근접 이웃 유지 = Top-k 문제' },
    ],
    quiz: [
      { q: '최소 힙의 내부 배열을 그대로 출력하면 정렬되어 있지 않은 이유는?',
        options: ['heappush가 원소를 배열 끝에 붙이기만 하고 sift-up을 생략하기 때문', '힙 규칙은 부모-자식 관계만 정하고 형제·사촌 사이의 순서는 정하지 않기 때문', '힙은 루트가 최댓값이 되도록 거꾸로 저장해 출력 시 뒤집혀 보이기 때문', '배열에는 레벨 순서가 아니라 전위 순회 순서로 노드가 저장되기 때문'], answer: 1,
        explain: '루트가 최솟값이라는 것만 보장된다. 이 약한 규칙 덕분에 삽입·삭제가 O(log n)으로 싸다.' },
      { q: '100만 개 점수 중 상위 10개를 구할 때 크기 10인 최소 힙을 쓰면 전체 정렬보다 유리한 이유는?',
        options: ['힙에서는 원소를 넣고 빼는 연산이 원소 수와 무관하게 O(1)이기 때문', '원소마다 크기 10인 힙과 비교·교체해 O(n log 10)이고 메모리도 10칸이라서', '최소 힙의 루트가 지금까지 본 전체 데이터의 최댓값을 가리키고 있기 때문', '힙에 100만 개를 모두 넣고 10번 꺼내면 비교가 10번만 일어나기 때문'], answer: 1,
        explain: '힙 루트는 "현재 상위 10개 중 가장 작은 값"이다. 새 값이 그보다 크면 교체한다. 비교 비용이 log k로 작다.' },
      { q: 'heapify(배열 → 힙)를 아래 노드부터 sift-down으로 하면 O(n log n)이 아니라 O(n)인 직관은?',
        options: ['대부분의 노드가 잎 근처라 내려갈 거리가 짧고, 멀리 내려가는 위쪽 노드는 적어서', '각 노드가 최대 한 번만 교환되도록 sift-down이 한 단계에서 멈추기 때문', '잎이 아닌 노드만 처리하므로 처리 횟수가 n/2이고 각각 O(1)이기 때문', '아래에서부터 처리하면 이미 정렬된 부분은 비교 없이 건너뛸 수 있어서'], answer: 0,
        explain: '노드의 절반은 잎(거리 0), 4분의 1은 거리 1, … 가중합 Σ h·n/2^(h+1) = O(n).' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 6장 — Heapsort', 'Python 공식 문서 — heapq (이론 설명 포함)', 'VisuAlgo — Binary Heap'],
  },
  {
    id:'ds-graph', title: '그래프와 DFS·BFS',
    summary: R`"관계" 자체를 표현하는 자료구조
DFS(스택) vs BFS(큐): <strong>다음 방문 후보 관리 구조</strong>만 다름`,
    body: R`
<p>그래프 $G=(V,E)$는 정점과 간선의 집합이다. 도로망, SNS 친구 관계, 웹 링크, 패키지 의존성, 신경망의 계산 그래프까지 "무엇이 무엇과 연결되어 있는가"를 표현하는 일반적인 틀이다. 트리와 연결 리스트는 그래프의 특수한 경우다.</p>
<h3>표현 방법</h3>
<table><tr><th></th><th>인접 행렬</th><th>인접 리스트</th></tr>
<tr><td>메모리</td><td>$O(V^2)$</td><td>$O(V+E)$</td></tr>
<tr><td>간선 (u,v) 존재 확인</td><td>$O(1)$</td><td>$O(\deg u)$</td></tr>
<tr><td>u의 이웃 전부 순회</td><td>$O(V)$</td><td>$O(\deg u)$</td></tr>
<tr><td>적합</td><td>밀집 그래프</td><td>희소 그래프(대부분의 현실 그래프)</td></tr></table>
<h3>탐색의 공통 틀</h3>
<p>"후보 모음에서 하나 꺼내 → 방문하지 않았으면 방문 → 이웃을 후보에 추가." 후보 모음이 <strong>스택이면 DFS</strong>, <strong>큐면 BFS</strong>다. 방문 표시가 없으면 사이클에서 무한 루프에 빠지므로 필수다. 각 정점과 간선을 상수 번 처리하므로 둘 다 $O(V+E)$다.</p>
<h3>BFS가 최단 경로를 보장하는 이유</h3>
<p>큐는 먼저 넣은 것을 먼저 꺼내므로, 시작점에서 거리 $d$인 정점이 <strong>모두</strong> 처리된 다음에야 거리 $d+1$인 정점이 처리된다. 그래서 어떤 정점을 처음 발견한 순간의 거리가 곧 최단 거리다. 단, 모든 간선의 비용이 같을 때만 성립한다. 가중치가 다르면 다익스트라가 필요하다.</p>
<h3>DFS가 잘하는 일</h3>
<p>DFS는 한 경로를 끝까지 파고들고 되돌아온다. 이 "되돌아오는 시점"의 정보가 유용하다: 사이클 탐지(현재 경로에 있는 정점을 다시 만나면 사이클), 연결 요소 찾기, 백트래킹(미로, N-Queen), <strong>위상 정렬</strong>(DFS가 끝나는 순서의 역순).</p>
<h3>위상 정렬과 계산 그래프</h3>
<p>방향 비순환 그래프(DAG)에서 "모든 간선 u→v에 대해 u가 v보다 앞에 오는" 순서를 위상 순서라고 한다. 진입 차수가 0인 정점부터 꺼내는 Kahn 알고리즘으로도 구할 수 있다. 신경망의 순전파는 계산 그래프를 위상 순서로 실행하는 것이고, <strong>역전파는 그 역순</strong>으로 그래디언트를 전달하는 것이다.</p>`,
    analogy: R`<p>미로 찾기. DFS는 <strong>한 사람이</strong> 한 길을 끝까지 가 보고 막히면 마지막 갈림길로 돌아오는 방식. BFS는 갈림길마다 <strong>사람을 분신시켜</strong> 모든 방향으로 한 걸음씩 동시에 퍼지는 방식 — 물감이 번지듯 퍼지므로 출구에 처음 도착한 분신이 곧 최단 경로다.</p>`,
    diagram: { caption: 'A에서 시작한 BFS의 거리(레벨). 같은 레벨의 정점은 다음 레벨보다 먼저 모두 처리된다.', svg: R`
<svg viewBox="0 0 500 250" width="500">
<path class="e d" d="M115,10 V215 M230,10 V215 M350,10 V215"/>
<path class="e" d="M60,120 L170,60 M60,120 L170,180 M170,60 L290,40 M170,60 L290,120 M170,180 L290,200 M290,120 L290,200 M290,200 L420,200"/>
<circle class="h" cx="60" cy="120" r="20"/><text x="60" y="120">A</text>
<circle class="n" cx="170" cy="60" r="20"/><text x="170" y="60">B</text>
<circle class="n" cx="170" cy="180" r="20"/><text x="170" y="180">C</text>
<circle class="n" cx="290" cy="40" r="20"/><text x="290" y="40">D</text>
<circle class="n" cx="290" cy="120" r="20"/><text x="290" y="120">E</text>
<circle class="n" cx="290" cy="200" r="20"/><text x="290" y="200">F</text>
<circle class="n" cx="420" cy="200" r="20"/><text x="420" y="200">G</text>
<text x="60" y="236" class="sm">거리 0</text><text x="170" y="236" class="sm">거리 1</text><text x="290" y="236" class="sm">거리 2</text><text x="420" y="236" class="sm">거리 3</text>
</svg>` },
    code: R`
from collections import deque

graph = {                                 # 인접 리스트 (무방향)
  'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'],
  'D': ['B'], 'E': ['B', 'F'], 'F': ['C', 'E', 'G'], 'G': ['F'],
}

def bfs(start):
  dist = {start: 0}                     # 방문 표시 겸 거리
  q = deque([start])
  while q:
      u = q.popleft()
      for v in graph[u]:
          if v not in dist:             # 큐에 '넣을 때' 표시해야 중복 삽입이 없다
              dist[v] = dist[u] + 1
              q.append(v)
  return dist

def dfs(start):
  seen, order, stack = set(), [], [start]
  while stack:
      u = stack.pop()
      if u in seen:
          continue
      seen.add(u)
      order.append(u)
      stack.extend(reversed(graph[u]))  # 인접 순서대로 방문하려고 뒤집어 넣음
  return order

print("BFS 거리:", bfs('A'))
print("DFS 순서:", dfs('A'))

# 위상 정렬 (Kahn): 진입 차수 0인 노드부터 — 계산 그래프의 실행 순서
dag = {'x': ['h'], 'w': ['h'], 'h': ['y'], 'y': ['loss'], 't': ['loss'], 'loss': []}
indeg = {u: 0 for u in dag}
for u in dag:
  for v in dag[u]:
      indeg[v] += 1
q = deque(u for u in dag if indeg[u] == 0)
topo = []
while q:
  u = q.popleft()
  topo.append(u)
  for v in dag[u]:
      indeg[v] -= 1
      if indeg[v] == 0:
          q.append(v)
print("위상 순서:", topo)   # 순전파 순서. 역전파는 이 역순으로 그래디언트를 전달
`,
    links: [
      { to: 'ds-stack-queue', why: '스택이냐 큐냐가 DFS와 BFS를 가른다' },
      { to: 'ds-shortest', why: '가중치가 있는 그래프의 최단 경로' },
      { to: 'dl-backprop', why: '계산 그래프를 위상 순서의 역순으로 순회하며 그래디언트 계산' },
      { to: 'net-routing', why: '네트워크 = 라우터를 정점으로 하는 그래프' },
      { to: 'os-deadlock', why: '자원 할당 그래프에서 사이클 = 교착 상태의 가능성' },
    ],
    quiz: [
      { q: 'BFS가 가중치 없는 그래프에서 최단 경로를 보장하는 이유는?',
        options: ['BFS는 시작점에서 각 정점까지의 모든 경로를 나열해 그중 가장 짧은 것을 고르기 때문', '거리 d인 정점이 모두 처리된 뒤에 거리 d+1인 정점이 처리되어 처음 발견한 거리가 최소이기 때문', '정점을 꺼낼 때마다 아직 방문하지 않은 이웃 중 가장 가까운 것만 큐에 넣기 때문', '방문한 정점의 거리를 이후에 더 짧은 경로가 나오면 다시 갱신하기 때문'], answer: 1,
        explain: '거리 순서대로 "물결처럼" 퍼진다. 간선 비용이 다르면 이 성질이 깨지므로 다익스트라를 쓴다.' },
      { q: 'BFS에서 방문 표시를 "큐에서 꺼낼 때"가 아니라 "큐에 넣을 때" 하는 이유는?',
        options: ['꺼낼 때 표시하면 거리가 실제보다 길게 계산되는 경우가 생기기 때문', '같은 정점이 여러 이웃에게서 중복으로 큐에 들어가는 것을 막기 위해', '넣을 때 표시해야 사이클이 있는 그래프에서 무한 루프를 피할 수 있기 때문', '꺼낼 때 표시하면 큐가 비기 전에 탐색이 끝나 일부 정점을 놓치기 때문'], answer: 1,
        explain: '꺼낼 때 표시해도 거리는 맞게 나오지만, 같은 정점이 큐에 여러 번 들어가 최악의 경우 큐 크기가 간선 수만큼 커진다.' },
      { q: '정점 10만 개, 간선 20만 개인 도로망을 표현할 때 인접 리스트가 적합한 이유는?',
        options: ['인접 리스트는 두 정점 사이에 간선이 있는지 O(1)에 확인할 수 있어서', '인접 행렬은 V² = 100억 칸이 필요하지만 대부분 비어 있어서', '인접 행렬은 가중치가 있는 간선을 표현할 수 없어서', '인접 리스트는 정점 번호 순으로 정렬되어 탐색 순서가 보장되어서'], answer: 1,
        explain: '현실 그래프는 대부분 희소하다. 인접 리스트는 V+E에 비례하는 공간만 쓴다. 간선 존재 확인은 오히려 인접 행렬이 O(1)로 빠르다 — 트레이드오프다. 인접 행렬도 칸에 가중치를 넣으면 가중 그래프를 표현할 수 있다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 22장 — 기본 그래프 알고리즘', 'Stanford Algorithms (Tim Roughgarden, Coursera) — Graph Search', 'VisuAlgo — Graph Traversal'],
  },
  {
    id:'ds-sort', title: '정렬 알고리즘', advanced: true,
    summary: R`단순 $O(n^2)$(버블·선택·삽입) → 셸 → $O(n\log n)$(퀵·병합·힙) → 비교 없는 정렬(계수·기수)
구분 기준: <strong>회전마다 무엇이 확정되나·최악 경우·추가 메모리·안정성</strong>`,
    body: R`
<h3>0. 먼저 알아 둘 용어</h3>
<ul>
<li><strong>회전(pass)</strong>: 배열을 한 번 훑는 단위. 필기는 "n회전 후 배열 상태"를 자주 묻는다.</li>
<li><strong>안정(stable)</strong>: 키가 같은 원소들의 기존 순서가 유지된다. "이름순 정렬 후 점수순 정렬"하면 같은 점수 안에서 이름순이 남는다. 여러 키로 단계적으로 정렬할 때 필수.</li>
<li><strong>제자리(in-place)</strong>: 추가 메모리가 $O(1)$(또는 $O(\log n)$) 수준.</li>
<li><strong>비교 정렬의 하한</strong>: 비교 결과로 갈라지는 결정 트리가 $n!$개 순열을 구별하려면 높이가 $\log_2 n! = \Theta(n\log n)$ 이상이어야 한다. 그래서 비교만 쓰는 정렬은 최악 $\Omega(n\log n)$보다 빠를 수 없다.</li>
</ul>
<p>아래 그림은 모두 같은 입력 <code>5 3 8 4 9 1 6 2</code>를 오름차순으로 정렬하며 <strong>각 회전이 끝난 직후의 배열</strong>을 보여 준다. 색칠된 칸은 최종 위치가 확정된 원소, 굵은 테두리는 그 회전에서 움직이거나 확정된 칸이다.</p>

<h3>1. 단순 정렬 — $O(n^2)$</h3>
<h4>버블 정렬</h4>
<ul>
<li><strong>원리</strong>: 인접한 두 원소를 비교해 순서가 틀리면 교환, 앞에서 끝까지 반복.</li>
<li><strong>회전마다</strong>: 남은 것 중 <strong>가장 큰 값이 맨 뒤에 확정</strong>. $k$회전 후 뒤쪽 $k$칸 확정.</li>
<li><strong>복잡도</strong>: 비교 $n(n-1)/2$번 → $O(n^2)$. 교환이 없는 회전에서 멈추는 플래그를 두면 정렬된 입력에서 $O(n)$.</li>
<li><strong>안정성</strong>: 안정 (같은 값은 교환하지 않음).</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 424 290" width="424">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="116" y="1" width="40" height="28" rx="4"/><text x="136.0" y="15.0">3</text>
<rect class="n" x="160" y="1" width="40" height="28" rx="4"/><text x="180.0" y="15.0">8</text>
<rect class="n" x="204" y="1" width="40" height="28" rx="4"/><text x="224.0" y="15.0">4</text>
<rect class="n" x="248" y="1" width="40" height="28" rx="4"/><text x="268.0" y="15.0">9</text>
<rect class="n" x="292" y="1" width="40" height="28" rx="4"/><text x="312.0" y="15.0">1</text>
<rect class="n" x="336" y="1" width="40" height="28" rx="4"/><text x="356.0" y="15.0">6</text>
<rect class="n" x="380" y="1" width="40" height="28" rx="4"/><text x="400.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">1회전</text>
<rect class="n" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">3</text>
<rect class="n" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">5</text>
<rect class="n" x="160" y="37" width="40" height="28" rx="4"/><text x="180.0" y="51.0">4</text>
<rect class="n" x="204" y="37" width="40" height="28" rx="4"/><text x="224.0" y="51.0">8</text>
<rect class="n" x="248" y="37" width="40" height="28" rx="4"/><text x="268.0" y="51.0">1</text>
<rect class="n" x="292" y="37" width="40" height="28" rx="4"/><text x="312.0" y="51.0">6</text>
<rect class="n" x="336" y="37" width="40" height="28" rx="4"/><text x="356.0" y="51.0">2</text>
<rect class="h" x="380" y="37" width="40" height="28" rx="4"/><text x="400.0" y="51.0">9</text>
<rect class="he" x="378" y="35" width="44" height="32" rx="5"/>
<text x="4" y="87.0" class="sm st">2회전</text>
<rect class="n" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">3</text>
<rect class="n" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">4</text>
<rect class="n" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">5</text>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">1</text>
<rect class="n" x="248" y="73" width="40" height="28" rx="4"/><text x="268.0" y="87.0">6</text>
<rect class="n" x="292" y="73" width="40" height="28" rx="4"/><text x="312.0" y="87.0">2</text>
<rect class="h" x="336" y="73" width="40" height="28" rx="4"/><text x="356.0" y="87.0">8</text>
<rect class="he" x="334" y="71" width="44" height="32" rx="5"/>
<rect class="h" x="380" y="73" width="40" height="28" rx="4"/><text x="400.0" y="87.0">9</text>
<text x="4" y="123.0" class="sm st">3회전</text>
<rect class="n" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">3</text>
<rect class="n" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">4</text>
<rect class="n" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">1</text>
<rect class="n" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">5</text>
<rect class="n" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">2</text>
<rect class="h" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">6</text>
<rect class="he" x="290" y="107" width="44" height="32" rx="5"/>
<rect class="h" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">8</text>
<rect class="h" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">9</text>
<text x="4" y="159.0" class="sm st">4회전</text>
<rect class="n" x="72" y="145" width="40" height="28" rx="4"/><text x="92.0" y="159.0">3</text>
<rect class="n" x="116" y="145" width="40" height="28" rx="4"/><text x="136.0" y="159.0">1</text>
<rect class="n" x="160" y="145" width="40" height="28" rx="4"/><text x="180.0" y="159.0">4</text>
<rect class="n" x="204" y="145" width="40" height="28" rx="4"/><text x="224.0" y="159.0">2</text>
<rect class="h" x="248" y="145" width="40" height="28" rx="4"/><text x="268.0" y="159.0">5</text>
<rect class="he" x="246" y="143" width="44" height="32" rx="5"/>
<rect class="h" x="292" y="145" width="40" height="28" rx="4"/><text x="312.0" y="159.0">6</text>
<rect class="h" x="336" y="145" width="40" height="28" rx="4"/><text x="356.0" y="159.0">8</text>
<rect class="h" x="380" y="145" width="40" height="28" rx="4"/><text x="400.0" y="159.0">9</text>
<text x="4" y="195.0" class="sm st">5회전</text>
<rect class="n" x="72" y="181" width="40" height="28" rx="4"/><text x="92.0" y="195.0">1</text>
<rect class="n" x="116" y="181" width="40" height="28" rx="4"/><text x="136.0" y="195.0">3</text>
<rect class="n" x="160" y="181" width="40" height="28" rx="4"/><text x="180.0" y="195.0">2</text>
<rect class="h" x="204" y="181" width="40" height="28" rx="4"/><text x="224.0" y="195.0">4</text>
<rect class="he" x="202" y="179" width="44" height="32" rx="5"/>
<rect class="h" x="248" y="181" width="40" height="28" rx="4"/><text x="268.0" y="195.0">5</text>
<rect class="h" x="292" y="181" width="40" height="28" rx="4"/><text x="312.0" y="195.0">6</text>
<rect class="h" x="336" y="181" width="40" height="28" rx="4"/><text x="356.0" y="195.0">8</text>
<rect class="h" x="380" y="181" width="40" height="28" rx="4"/><text x="400.0" y="195.0">9</text>
<text x="4" y="231.0" class="sm st">6회전</text>
<rect class="n" x="72" y="217" width="40" height="28" rx="4"/><text x="92.0" y="231.0">1</text>
<rect class="n" x="116" y="217" width="40" height="28" rx="4"/><text x="136.0" y="231.0">2</text>
<rect class="h" x="160" y="217" width="40" height="28" rx="4"/><text x="180.0" y="231.0">3</text>
<rect class="he" x="158" y="215" width="44" height="32" rx="5"/>
<rect class="h" x="204" y="217" width="40" height="28" rx="4"/><text x="224.0" y="231.0">4</text>
<rect class="h" x="248" y="217" width="40" height="28" rx="4"/><text x="268.0" y="231.0">5</text>
<rect class="h" x="292" y="217" width="40" height="28" rx="4"/><text x="312.0" y="231.0">6</text>
<rect class="h" x="336" y="217" width="40" height="28" rx="4"/><text x="356.0" y="231.0">8</text>
<rect class="h" x="380" y="217" width="40" height="28" rx="4"/><text x="400.0" y="231.0">9</text>
<text x="4" y="267.0" class="sm st">7회전</text>
<rect class="h" x="72" y="253" width="40" height="28" rx="4"/><text x="92.0" y="267.0">1</text>
<rect class="h" x="116" y="253" width="40" height="28" rx="4"/><text x="136.0" y="267.0">2</text>
<rect class="he" x="114" y="251" width="44" height="32" rx="5"/>
<rect class="h" x="160" y="253" width="40" height="28" rx="4"/><text x="180.0" y="267.0">3</text>
<rect class="h" x="204" y="253" width="40" height="28" rx="4"/><text x="224.0" y="267.0">4</text>
<rect class="h" x="248" y="253" width="40" height="28" rx="4"/><text x="268.0" y="267.0">5</text>
<rect class="h" x="292" y="253" width="40" height="28" rx="4"/><text x="312.0" y="267.0">6</text>
<rect class="h" x="336" y="253" width="40" height="28" rx="4"/><text x="356.0" y="267.0">8</text>
<rect class="h" x="380" y="253" width="40" height="28" rx="4"/><text x="400.0" y="267.0">9</text>
</svg><figcaption>6회전에서 이미 정렬되었지만, 그 사실은 교환이 없는 7회전을 돌아야 알 수 있다.</figcaption></figure>

<h4>선택 정렬</h4>
<ul>
<li><strong>원리</strong>: 남은 구간의 <strong>최솟값을 찾아</strong> 맨 앞 칸과 교환.</li>
<li><strong>회전마다</strong>: 앞쪽부터 한 칸씩 확정.</li>
<li><strong>복잡도</strong>: 입력과 무관하게 비교 $n(n-1)/2$번 → 최선도 $O(n^2)$. 대신 <strong>교환은 최대 $n-1$번</strong>이라 쓰기가 비싼 환경에서 유리.</li>
<li><strong>안정성</strong>: 불안정. <code>5a 5b 2</code> → 첫 회전에 5a와 2가 바뀌어 <code>2 5b 5a</code>.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 424 290" width="424">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="116" y="1" width="40" height="28" rx="4"/><text x="136.0" y="15.0">3</text>
<rect class="n" x="160" y="1" width="40" height="28" rx="4"/><text x="180.0" y="15.0">8</text>
<rect class="n" x="204" y="1" width="40" height="28" rx="4"/><text x="224.0" y="15.0">4</text>
<rect class="n" x="248" y="1" width="40" height="28" rx="4"/><text x="268.0" y="15.0">9</text>
<rect class="n" x="292" y="1" width="40" height="28" rx="4"/><text x="312.0" y="15.0">1</text>
<rect class="n" x="336" y="1" width="40" height="28" rx="4"/><text x="356.0" y="15.0">6</text>
<rect class="n" x="380" y="1" width="40" height="28" rx="4"/><text x="400.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">1회전</text>
<rect class="h" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">1</text>
<rect class="he" x="70" y="35" width="44" height="32" rx="5"/>
<rect class="n" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">3</text>
<rect class="n" x="160" y="37" width="40" height="28" rx="4"/><text x="180.0" y="51.0">8</text>
<rect class="n" x="204" y="37" width="40" height="28" rx="4"/><text x="224.0" y="51.0">4</text>
<rect class="n" x="248" y="37" width="40" height="28" rx="4"/><text x="268.0" y="51.0">9</text>
<rect class="n" x="292" y="37" width="40" height="28" rx="4"/><text x="312.0" y="51.0">5</text>
<rect class="he" x="290" y="35" width="44" height="32" rx="5"/>
<rect class="n" x="336" y="37" width="40" height="28" rx="4"/><text x="356.0" y="51.0">6</text>
<rect class="n" x="380" y="37" width="40" height="28" rx="4"/><text x="400.0" y="51.0">2</text>
<text x="4" y="87.0" class="sm st">2회전</text>
<rect class="h" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">1</text>
<rect class="h" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">2</text>
<rect class="he" x="114" y="71" width="44" height="32" rx="5"/>
<rect class="n" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">8</text>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">4</text>
<rect class="n" x="248" y="73" width="40" height="28" rx="4"/><text x="268.0" y="87.0">9</text>
<rect class="n" x="292" y="73" width="40" height="28" rx="4"/><text x="312.0" y="87.0">5</text>
<rect class="n" x="336" y="73" width="40" height="28" rx="4"/><text x="356.0" y="87.0">6</text>
<rect class="n" x="380" y="73" width="40" height="28" rx="4"/><text x="400.0" y="87.0">3</text>
<rect class="he" x="378" y="71" width="44" height="32" rx="5"/>
<text x="4" y="123.0" class="sm st">3회전</text>
<rect class="h" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">1</text>
<rect class="h" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">2</text>
<rect class="h" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">3</text>
<rect class="he" x="158" y="107" width="44" height="32" rx="5"/>
<rect class="n" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">4</text>
<rect class="n" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">9</text>
<rect class="n" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">5</text>
<rect class="n" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">6</text>
<rect class="n" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">8</text>
<rect class="he" x="378" y="107" width="44" height="32" rx="5"/>
<text x="4" y="159.0" class="sm st">4회전</text>
<rect class="h" x="72" y="145" width="40" height="28" rx="4"/><text x="92.0" y="159.0">1</text>
<rect class="h" x="116" y="145" width="40" height="28" rx="4"/><text x="136.0" y="159.0">2</text>
<rect class="h" x="160" y="145" width="40" height="28" rx="4"/><text x="180.0" y="159.0">3</text>
<rect class="h" x="204" y="145" width="40" height="28" rx="4"/><text x="224.0" y="159.0">4</text>
<rect class="he" x="202" y="143" width="44" height="32" rx="5"/>
<rect class="n" x="248" y="145" width="40" height="28" rx="4"/><text x="268.0" y="159.0">9</text>
<rect class="n" x="292" y="145" width="40" height="28" rx="4"/><text x="312.0" y="159.0">5</text>
<rect class="n" x="336" y="145" width="40" height="28" rx="4"/><text x="356.0" y="159.0">6</text>
<rect class="n" x="380" y="145" width="40" height="28" rx="4"/><text x="400.0" y="159.0">8</text>
<text x="4" y="195.0" class="sm st">5회전</text>
<rect class="h" x="72" y="181" width="40" height="28" rx="4"/><text x="92.0" y="195.0">1</text>
<rect class="h" x="116" y="181" width="40" height="28" rx="4"/><text x="136.0" y="195.0">2</text>
<rect class="h" x="160" y="181" width="40" height="28" rx="4"/><text x="180.0" y="195.0">3</text>
<rect class="h" x="204" y="181" width="40" height="28" rx="4"/><text x="224.0" y="195.0">4</text>
<rect class="h" x="248" y="181" width="40" height="28" rx="4"/><text x="268.0" y="195.0">5</text>
<rect class="he" x="246" y="179" width="44" height="32" rx="5"/>
<rect class="n" x="292" y="181" width="40" height="28" rx="4"/><text x="312.0" y="195.0">9</text>
<rect class="he" x="290" y="179" width="44" height="32" rx="5"/>
<rect class="n" x="336" y="181" width="40" height="28" rx="4"/><text x="356.0" y="195.0">6</text>
<rect class="n" x="380" y="181" width="40" height="28" rx="4"/><text x="400.0" y="195.0">8</text>
<text x="4" y="231.0" class="sm st">6회전</text>
<rect class="h" x="72" y="217" width="40" height="28" rx="4"/><text x="92.0" y="231.0">1</text>
<rect class="h" x="116" y="217" width="40" height="28" rx="4"/><text x="136.0" y="231.0">2</text>
<rect class="h" x="160" y="217" width="40" height="28" rx="4"/><text x="180.0" y="231.0">3</text>
<rect class="h" x="204" y="217" width="40" height="28" rx="4"/><text x="224.0" y="231.0">4</text>
<rect class="h" x="248" y="217" width="40" height="28" rx="4"/><text x="268.0" y="231.0">5</text>
<rect class="h" x="292" y="217" width="40" height="28" rx="4"/><text x="312.0" y="231.0">6</text>
<rect class="he" x="290" y="215" width="44" height="32" rx="5"/>
<rect class="n" x="336" y="217" width="40" height="28" rx="4"/><text x="356.0" y="231.0">9</text>
<rect class="he" x="334" y="215" width="44" height="32" rx="5"/>
<rect class="n" x="380" y="217" width="40" height="28" rx="4"/><text x="400.0" y="231.0">8</text>
<text x="4" y="267.0" class="sm st">7회전</text>
<rect class="h" x="72" y="253" width="40" height="28" rx="4"/><text x="92.0" y="267.0">1</text>
<rect class="h" x="116" y="253" width="40" height="28" rx="4"/><text x="136.0" y="267.0">2</text>
<rect class="h" x="160" y="253" width="40" height="28" rx="4"/><text x="180.0" y="267.0">3</text>
<rect class="h" x="204" y="253" width="40" height="28" rx="4"/><text x="224.0" y="267.0">4</text>
<rect class="h" x="248" y="253" width="40" height="28" rx="4"/><text x="268.0" y="267.0">5</text>
<rect class="h" x="292" y="253" width="40" height="28" rx="4"/><text x="312.0" y="267.0">6</text>
<rect class="h" x="336" y="253" width="40" height="28" rx="4"/><text x="356.0" y="267.0">8</text>
<rect class="he" x="334" y="251" width="44" height="32" rx="5"/>
<rect class="h" x="380" y="253" width="40" height="28" rx="4"/><text x="400.0" y="267.0">9</text>
<rect class="he" x="378" y="251" width="44" height="32" rx="5"/>
</svg><figcaption>굵은 테두리는 교환된 두 칸. 4회전처럼 최솟값이 이미 제자리면 교환이 없다.</figcaption></figure>

<h4>삽입 정렬</h4>
<ul>
<li><strong>원리</strong>: 정렬된 앞부분에 다음 원소를 알맞은 위치로 끼워 넣는다. 큰 원소들은 한 칸씩 뒤로 민다.</li>
<li><strong>회전마다</strong>: 앞부분이 "정렬"될 뿐 <strong>최종 위치가 확정되지는 않는다</strong>(5회전의 1처럼 나중 원소가 앞으로 끼어든다). 버블·선택과의 차이로 자주 출제.</li>
<li><strong>복잡도</strong>: $O(n^2)$이지만 비용이 뒤바뀐 쌍(inversion)의 수에 비례 → <strong>거의 정렬된 입력에서 $O(n)$</strong>. 작은 배열에서 빠르다.</li>
<li><strong>안정성</strong>: 안정.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 424 290" width="424">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="h" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="116" y="1" width="40" height="28" rx="4"/><text x="136.0" y="15.0">3</text>
<rect class="n" x="160" y="1" width="40" height="28" rx="4"/><text x="180.0" y="15.0">8</text>
<rect class="n" x="204" y="1" width="40" height="28" rx="4"/><text x="224.0" y="15.0">4</text>
<rect class="n" x="248" y="1" width="40" height="28" rx="4"/><text x="268.0" y="15.0">9</text>
<rect class="n" x="292" y="1" width="40" height="28" rx="4"/><text x="312.0" y="15.0">1</text>
<rect class="n" x="336" y="1" width="40" height="28" rx="4"/><text x="356.0" y="15.0">6</text>
<rect class="n" x="380" y="1" width="40" height="28" rx="4"/><text x="400.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">1회전</text>
<rect class="h" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">3</text>
<rect class="he" x="70" y="35" width="44" height="32" rx="5"/>
<rect class="h" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">5</text>
<rect class="n" x="160" y="37" width="40" height="28" rx="4"/><text x="180.0" y="51.0">8</text>
<rect class="n" x="204" y="37" width="40" height="28" rx="4"/><text x="224.0" y="51.0">4</text>
<rect class="n" x="248" y="37" width="40" height="28" rx="4"/><text x="268.0" y="51.0">9</text>
<rect class="n" x="292" y="37" width="40" height="28" rx="4"/><text x="312.0" y="51.0">1</text>
<rect class="n" x="336" y="37" width="40" height="28" rx="4"/><text x="356.0" y="51.0">6</text>
<rect class="n" x="380" y="37" width="40" height="28" rx="4"/><text x="400.0" y="51.0">2</text>
<text x="4" y="87.0" class="sm st">2회전</text>
<rect class="h" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">3</text>
<rect class="h" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">5</text>
<rect class="h" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">8</text>
<rect class="he" x="158" y="71" width="44" height="32" rx="5"/>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">4</text>
<rect class="n" x="248" y="73" width="40" height="28" rx="4"/><text x="268.0" y="87.0">9</text>
<rect class="n" x="292" y="73" width="40" height="28" rx="4"/><text x="312.0" y="87.0">1</text>
<rect class="n" x="336" y="73" width="40" height="28" rx="4"/><text x="356.0" y="87.0">6</text>
<rect class="n" x="380" y="73" width="40" height="28" rx="4"/><text x="400.0" y="87.0">2</text>
<text x="4" y="123.0" class="sm st">3회전</text>
<rect class="h" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">3</text>
<rect class="h" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">4</text>
<rect class="he" x="114" y="107" width="44" height="32" rx="5"/>
<rect class="h" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">5</text>
<rect class="h" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">8</text>
<rect class="n" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">9</text>
<rect class="n" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">1</text>
<rect class="n" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">6</text>
<rect class="n" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">2</text>
<text x="4" y="159.0" class="sm st">4회전</text>
<rect class="h" x="72" y="145" width="40" height="28" rx="4"/><text x="92.0" y="159.0">3</text>
<rect class="h" x="116" y="145" width="40" height="28" rx="4"/><text x="136.0" y="159.0">4</text>
<rect class="h" x="160" y="145" width="40" height="28" rx="4"/><text x="180.0" y="159.0">5</text>
<rect class="h" x="204" y="145" width="40" height="28" rx="4"/><text x="224.0" y="159.0">8</text>
<rect class="h" x="248" y="145" width="40" height="28" rx="4"/><text x="268.0" y="159.0">9</text>
<rect class="he" x="246" y="143" width="44" height="32" rx="5"/>
<rect class="n" x="292" y="145" width="40" height="28" rx="4"/><text x="312.0" y="159.0">1</text>
<rect class="n" x="336" y="145" width="40" height="28" rx="4"/><text x="356.0" y="159.0">6</text>
<rect class="n" x="380" y="145" width="40" height="28" rx="4"/><text x="400.0" y="159.0">2</text>
<text x="4" y="195.0" class="sm st">5회전</text>
<rect class="h" x="72" y="181" width="40" height="28" rx="4"/><text x="92.0" y="195.0">1</text>
<rect class="he" x="70" y="179" width="44" height="32" rx="5"/>
<rect class="h" x="116" y="181" width="40" height="28" rx="4"/><text x="136.0" y="195.0">3</text>
<rect class="h" x="160" y="181" width="40" height="28" rx="4"/><text x="180.0" y="195.0">4</text>
<rect class="h" x="204" y="181" width="40" height="28" rx="4"/><text x="224.0" y="195.0">5</text>
<rect class="h" x="248" y="181" width="40" height="28" rx="4"/><text x="268.0" y="195.0">8</text>
<rect class="h" x="292" y="181" width="40" height="28" rx="4"/><text x="312.0" y="195.0">9</text>
<rect class="n" x="336" y="181" width="40" height="28" rx="4"/><text x="356.0" y="195.0">6</text>
<rect class="n" x="380" y="181" width="40" height="28" rx="4"/><text x="400.0" y="195.0">2</text>
<text x="4" y="231.0" class="sm st">6회전</text>
<rect class="h" x="72" y="217" width="40" height="28" rx="4"/><text x="92.0" y="231.0">1</text>
<rect class="h" x="116" y="217" width="40" height="28" rx="4"/><text x="136.0" y="231.0">3</text>
<rect class="h" x="160" y="217" width="40" height="28" rx="4"/><text x="180.0" y="231.0">4</text>
<rect class="h" x="204" y="217" width="40" height="28" rx="4"/><text x="224.0" y="231.0">5</text>
<rect class="h" x="248" y="217" width="40" height="28" rx="4"/><text x="268.0" y="231.0">6</text>
<rect class="he" x="246" y="215" width="44" height="32" rx="5"/>
<rect class="h" x="292" y="217" width="40" height="28" rx="4"/><text x="312.0" y="231.0">8</text>
<rect class="h" x="336" y="217" width="40" height="28" rx="4"/><text x="356.0" y="231.0">9</text>
<rect class="n" x="380" y="217" width="40" height="28" rx="4"/><text x="400.0" y="231.0">2</text>
<text x="4" y="267.0" class="sm st">7회전</text>
<rect class="h" x="72" y="253" width="40" height="28" rx="4"/><text x="92.0" y="267.0">1</text>
<rect class="h" x="116" y="253" width="40" height="28" rx="4"/><text x="136.0" y="267.0">2</text>
<rect class="he" x="114" y="251" width="44" height="32" rx="5"/>
<rect class="h" x="160" y="253" width="40" height="28" rx="4"/><text x="180.0" y="267.0">3</text>
<rect class="h" x="204" y="253" width="40" height="28" rx="4"/><text x="224.0" y="267.0">4</text>
<rect class="h" x="248" y="253" width="40" height="28" rx="4"/><text x="268.0" y="267.0">5</text>
<rect class="h" x="292" y="253" width="40" height="28" rx="4"/><text x="312.0" y="267.0">6</text>
<rect class="h" x="336" y="253" width="40" height="28" rx="4"/><text x="356.0" y="267.0">8</text>
<rect class="h" x="380" y="253" width="40" height="28" rx="4"/><text x="400.0" y="267.0">9</text>
</svg><figcaption>색칠된 칸은 "지금까지 정렬된 앞부분", 굵은 테두리는 이번 회전에 끼워 넣은 원소의 위치.</figcaption></figure>

<h3>2. 삽입 정렬의 개선 — 셸 정렬</h3>
<h4>셸 정렬</h4>
<ul>
<li><strong>원리</strong>: 간격 $h$만큼 떨어진 원소끼리 묶어 삽입 정렬하고, 간격을 줄여 마지막에 $h=1$로 마무리.</li>
<li><strong>왜 빠른가</strong>: 삽입 정렬은 원소가 한 칸씩만 움직인다. 앞 단계에서 멀리 있는 원소를 크게 옮겨 두면 마지막 삽입 정렬이 거의 정렬된 입력을 만난다.</li>
<li><strong>복잡도</strong>: 간격 수열에 따라 다름. 평균 약 $O(n^{1.3\sim1.5})$, 간격 n/2·n/4·… 방식의 최악 $O(n^2)$.</li>
<li><strong>안정성</strong>: 불안정 (멀리 떨어진 원소를 옮김).</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 424 146" width="424">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="116" y="1" width="40" height="28" rx="4"/><text x="136.0" y="15.0">3</text>
<rect class="n" x="160" y="1" width="40" height="28" rx="4"/><text x="180.0" y="15.0">8</text>
<rect class="n" x="204" y="1" width="40" height="28" rx="4"/><text x="224.0" y="15.0">4</text>
<rect class="n" x="248" y="1" width="40" height="28" rx="4"/><text x="268.0" y="15.0">9</text>
<rect class="n" x="292" y="1" width="40" height="28" rx="4"/><text x="312.0" y="15.0">1</text>
<rect class="n" x="336" y="1" width="40" height="28" rx="4"/><text x="356.0" y="15.0">6</text>
<rect class="n" x="380" y="1" width="40" height="28" rx="4"/><text x="400.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">간격 4</text>
<rect class="n" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">5</text>
<rect class="n" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">1</text>
<rect class="n" x="160" y="37" width="40" height="28" rx="4"/><text x="180.0" y="51.0">6</text>
<rect class="n" x="204" y="37" width="40" height="28" rx="4"/><text x="224.0" y="51.0">2</text>
<rect class="n" x="248" y="37" width="40" height="28" rx="4"/><text x="268.0" y="51.0">9</text>
<rect class="n" x="292" y="37" width="40" height="28" rx="4"/><text x="312.0" y="51.0">3</text>
<rect class="n" x="336" y="37" width="40" height="28" rx="4"/><text x="356.0" y="51.0">8</text>
<rect class="n" x="380" y="37" width="40" height="28" rx="4"/><text x="400.0" y="51.0">4</text>
<text x="4" y="87.0" class="sm st">간격 2</text>
<rect class="n" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">5</text>
<rect class="n" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">1</text>
<rect class="n" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">6</text>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">2</text>
<rect class="n" x="248" y="73" width="40" height="28" rx="4"/><text x="268.0" y="87.0">8</text>
<rect class="n" x="292" y="73" width="40" height="28" rx="4"/><text x="312.0" y="87.0">3</text>
<rect class="n" x="336" y="73" width="40" height="28" rx="4"/><text x="356.0" y="87.0">9</text>
<rect class="n" x="380" y="73" width="40" height="28" rx="4"/><text x="400.0" y="87.0">4</text>
<text x="4" y="123.0" class="sm st">간격 1</text>
<rect class="h" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">1</text>
<rect class="h" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">2</text>
<rect class="h" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">3</text>
<rect class="h" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">4</text>
<rect class="h" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">5</text>
<rect class="h" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">6</text>
<rect class="h" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">8</text>
<rect class="h" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">9</text>
</svg><figcaption>간격 4에서는 (5,9) (3,1) (8,6) (4,2) 네 묶음을 각각 정렬해 작은 값이 앞쪽으로 크게 이동한다.</figcaption></figure>

<h3>3. 분할 정복·힙 — $O(n\log n)$</h3>
<h4>퀵 정렬</h4>
<ul>
<li><strong>원리</strong>: 피벗보다 작은 것은 왼쪽, 큰 것은 오른쪽으로 나누고 양쪽을 재귀 정렬.</li>
<li><strong>분할마다</strong>: <strong>피벗이 최종 위치에 확정</strong>.</li>
<li><strong>필기식 분할</strong>: 피벗 = 맨 앞 원소. low는 오른쪽으로 가며 피벗보다 큰 값을, high는 왼쪽으로 가며 피벗보다 작은 값을 찾아 교환. 둘이 엇갈리면 피벗과 high를 교환. 아래 첫 분할은 8↔2, 9↔1 교환 뒤 피벗 5를 1과 바꾼다. 피벗 선택 방식에 따라 중간 배열이 달라지므로 문제의 방식을 따른다.</li>
<li><strong>복잡도</strong>: 평균 $O(n\log n)$, 최악 $O(n^2)$ — 이미 정렬된 배열에서 첫 원소를 피벗으로 고르면 매번 한쪽이 빈다. 무작위 피벗·세 값의 중앙값(median-of-three)으로 피한다. 추가 공간은 재귀 스택 $O(\log n)$.</li>
<li><strong>안정성</strong>: 불안정. 대신 제자리·순차 접근이라 캐시 친화적이어서 실제로 가장 빠른 경우가 많다.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 424 218" width="424">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="116" y="1" width="40" height="28" rx="4"/><text x="136.0" y="15.0">3</text>
<rect class="n" x="160" y="1" width="40" height="28" rx="4"/><text x="180.0" y="15.0">8</text>
<rect class="n" x="204" y="1" width="40" height="28" rx="4"/><text x="224.0" y="15.0">4</text>
<rect class="n" x="248" y="1" width="40" height="28" rx="4"/><text x="268.0" y="15.0">9</text>
<rect class="n" x="292" y="1" width="40" height="28" rx="4"/><text x="312.0" y="15.0">1</text>
<rect class="n" x="336" y="1" width="40" height="28" rx="4"/><text x="356.0" y="15.0">6</text>
<rect class="n" x="380" y="1" width="40" height="28" rx="4"/><text x="400.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">피벗 5</text>
<rect class="n" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">1</text>
<rect class="n" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">3</text>
<rect class="n" x="160" y="37" width="40" height="28" rx="4"/><text x="180.0" y="51.0">2</text>
<rect class="n" x="204" y="37" width="40" height="28" rx="4"/><text x="224.0" y="51.0">4</text>
<rect class="h" x="248" y="37" width="40" height="28" rx="4"/><text x="268.0" y="51.0">5</text>
<rect class="he" x="246" y="35" width="44" height="32" rx="5"/>
<rect class="n" x="292" y="37" width="40" height="28" rx="4"/><text x="312.0" y="51.0">9</text>
<rect class="n" x="336" y="37" width="40" height="28" rx="4"/><text x="356.0" y="51.0">6</text>
<rect class="n" x="380" y="37" width="40" height="28" rx="4"/><text x="400.0" y="51.0">8</text>
<text x="4" y="87.0" class="sm st">피벗 1</text>
<rect class="h" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">1</text>
<rect class="he" x="70" y="71" width="44" height="32" rx="5"/>
<rect class="n" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">3</text>
<rect class="n" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">2</text>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">4</text>
<rect class="h" x="248" y="73" width="40" height="28" rx="4"/><text x="268.0" y="87.0">5</text>
<rect class="n" x="292" y="73" width="40" height="28" rx="4"/><text x="312.0" y="87.0">9</text>
<rect class="n" x="336" y="73" width="40" height="28" rx="4"/><text x="356.0" y="87.0">6</text>
<rect class="n" x="380" y="73" width="40" height="28" rx="4"/><text x="400.0" y="87.0">8</text>
<text x="4" y="123.0" class="sm st">피벗 3</text>
<rect class="h" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">1</text>
<rect class="n" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">2</text>
<rect class="h" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">3</text>
<rect class="he" x="158" y="107" width="44" height="32" rx="5"/>
<rect class="n" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">4</text>
<rect class="h" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">5</text>
<rect class="n" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">9</text>
<rect class="n" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">6</text>
<rect class="n" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">8</text>
<text x="4" y="159.0" class="sm st">피벗 9</text>
<rect class="h" x="72" y="145" width="40" height="28" rx="4"/><text x="92.0" y="159.0">1</text>
<rect class="h" x="116" y="145" width="40" height="28" rx="4"/><text x="136.0" y="159.0">2</text>
<rect class="h" x="160" y="145" width="40" height="28" rx="4"/><text x="180.0" y="159.0">3</text>
<rect class="h" x="204" y="145" width="40" height="28" rx="4"/><text x="224.0" y="159.0">4</text>
<rect class="h" x="248" y="145" width="40" height="28" rx="4"/><text x="268.0" y="159.0">5</text>
<rect class="n" x="292" y="145" width="40" height="28" rx="4"/><text x="312.0" y="159.0">8</text>
<rect class="n" x="336" y="145" width="40" height="28" rx="4"/><text x="356.0" y="159.0">6</text>
<rect class="h" x="380" y="145" width="40" height="28" rx="4"/><text x="400.0" y="159.0">9</text>
<rect class="he" x="378" y="143" width="44" height="32" rx="5"/>
<text x="4" y="195.0" class="sm st">피벗 8</text>
<rect class="h" x="72" y="181" width="40" height="28" rx="4"/><text x="92.0" y="195.0">1</text>
<rect class="h" x="116" y="181" width="40" height="28" rx="4"/><text x="136.0" y="195.0">2</text>
<rect class="h" x="160" y="181" width="40" height="28" rx="4"/><text x="180.0" y="195.0">3</text>
<rect class="h" x="204" y="181" width="40" height="28" rx="4"/><text x="224.0" y="195.0">4</text>
<rect class="h" x="248" y="181" width="40" height="28" rx="4"/><text x="268.0" y="195.0">5</text>
<rect class="h" x="292" y="181" width="40" height="28" rx="4"/><text x="312.0" y="195.0">6</text>
<rect class="h" x="336" y="181" width="40" height="28" rx="4"/><text x="356.0" y="195.0">8</text>
<rect class="he" x="334" y="179" width="44" height="32" rx="5"/>
<rect class="h" x="380" y="181" width="40" height="28" rx="4"/><text x="400.0" y="195.0">9</text>
</svg><figcaption>각 행은 한 번의 분할이 끝난 뒤. 굵은 테두리가 그 분할의 피벗, 크기 1인 구간은 자동으로 확정된다.</figcaption></figure>

<h4>병합 정렬</h4>
<ul>
<li><strong>원리</strong>: 반으로 나눠 각각 정렬한 뒤, 정렬된 두 묶음을 앞에서부터 작은 것을 골라 <strong>병합</strong>($O(n)$).</li>
<li><strong>복잡도</strong>: 분할 깊이 $\log n$ × 단계당 $n$ → 입력과 무관하게 <strong>항상 $O(n\log n)$</strong>. 단점은 $O(n)$ 추가 메모리.</li>
<li><strong>안정성</strong>: 안정 (같은 값이면 왼쪽 것을 먼저).</li>
<li><strong>쓰임</strong>: 연결 리스트 정렬, 메모리에 다 안 올라가는 데이터의 <strong>외부 정렬</strong>.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 494 146" width="494">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="126" y="1" width="40" height="28" rx="4"/><text x="146.0" y="15.0">3</text>
<rect class="n" x="180" y="1" width="40" height="28" rx="4"/><text x="200.0" y="15.0">8</text>
<rect class="n" x="234" y="1" width="40" height="28" rx="4"/><text x="254.0" y="15.0">4</text>
<rect class="n" x="288" y="1" width="40" height="28" rx="4"/><text x="308.0" y="15.0">9</text>
<rect class="n" x="342" y="1" width="40" height="28" rx="4"/><text x="362.0" y="15.0">1</text>
<rect class="n" x="396" y="1" width="40" height="28" rx="4"/><text x="416.0" y="15.0">6</text>
<rect class="n" x="450" y="1" width="40" height="28" rx="4"/><text x="470.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">크기 2</text>
<rect class="n" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">3</text>
<rect class="n" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">5</text>
<rect class="n" x="170" y="37" width="40" height="28" rx="4"/><text x="190.0" y="51.0">4</text>
<rect class="n" x="214" y="37" width="40" height="28" rx="4"/><text x="234.0" y="51.0">8</text>
<rect class="n" x="268" y="37" width="40" height="28" rx="4"/><text x="288.0" y="51.0">1</text>
<rect class="n" x="312" y="37" width="40" height="28" rx="4"/><text x="332.0" y="51.0">9</text>
<rect class="n" x="366" y="37" width="40" height="28" rx="4"/><text x="386.0" y="51.0">2</text>
<rect class="n" x="410" y="37" width="40" height="28" rx="4"/><text x="430.0" y="51.0">6</text>
<text x="4" y="87.0" class="sm st">크기 4</text>
<rect class="n" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">3</text>
<rect class="n" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">4</text>
<rect class="n" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">5</text>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">8</text>
<rect class="n" x="258" y="73" width="40" height="28" rx="4"/><text x="278.0" y="87.0">1</text>
<rect class="n" x="302" y="73" width="40" height="28" rx="4"/><text x="322.0" y="87.0">2</text>
<rect class="n" x="346" y="73" width="40" height="28" rx="4"/><text x="366.0" y="87.0">6</text>
<rect class="n" x="390" y="73" width="40" height="28" rx="4"/><text x="410.0" y="87.0">9</text>
<text x="4" y="123.0" class="sm st">크기 8</text>
<rect class="h" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">1</text>
<rect class="h" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">2</text>
<rect class="h" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">3</text>
<rect class="h" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">4</text>
<rect class="h" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">5</text>
<rect class="h" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">6</text>
<rect class="h" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">8</text>
<rect class="h" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">9</text>
</svg><figcaption>상향식 병합: 크기 1 묶음 → 2 → 4 → 8로 이웃한 두 묶음씩 병합한다. 칸 사이 간격이 묶음의 경계.</figcaption></figure>

<h4>힙 정렬</h4>
<ul>
<li><strong>원리</strong>: 배열을 <strong>최대 힙</strong>으로 만든 뒤($O(n)$), 루트(최댓값)를 맨 뒤와 교환하고 힙 크기를 1 줄여 루트를 아래로 내리며 복구. 반복.</li>
<li><strong>회전마다</strong>: 뒤쪽부터 큰 값이 확정.</li>
<li><strong>복잡도</strong>: 최악에도 $O(n\log n)$, 제자리.</li>
<li><strong>안정성</strong>: 불안정. 메모리 접근이 흩어져 실제로는 퀵 정렬보다 느린 경우가 많다.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 424 326" width="424">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="40" height="28" rx="4"/><text x="92.0" y="15.0">5</text>
<rect class="n" x="116" y="1" width="40" height="28" rx="4"/><text x="136.0" y="15.0">3</text>
<rect class="n" x="160" y="1" width="40" height="28" rx="4"/><text x="180.0" y="15.0">8</text>
<rect class="n" x="204" y="1" width="40" height="28" rx="4"/><text x="224.0" y="15.0">4</text>
<rect class="n" x="248" y="1" width="40" height="28" rx="4"/><text x="268.0" y="15.0">9</text>
<rect class="n" x="292" y="1" width="40" height="28" rx="4"/><text x="312.0" y="15.0">1</text>
<rect class="n" x="336" y="1" width="40" height="28" rx="4"/><text x="356.0" y="15.0">6</text>
<rect class="n" x="380" y="1" width="40" height="28" rx="4"/><text x="400.0" y="15.0">2</text>
<text x="4" y="51.0" class="sm st">최대 힙</text>
<rect class="n" x="72" y="37" width="40" height="28" rx="4"/><text x="92.0" y="51.0">9</text>
<rect class="he" x="70" y="35" width="44" height="32" rx="5"/>
<rect class="n" x="116" y="37" width="40" height="28" rx="4"/><text x="136.0" y="51.0">5</text>
<rect class="n" x="160" y="37" width="40" height="28" rx="4"/><text x="180.0" y="51.0">8</text>
<rect class="n" x="204" y="37" width="40" height="28" rx="4"/><text x="224.0" y="51.0">4</text>
<rect class="n" x="248" y="37" width="40" height="28" rx="4"/><text x="268.0" y="51.0">3</text>
<rect class="n" x="292" y="37" width="40" height="28" rx="4"/><text x="312.0" y="51.0">1</text>
<rect class="n" x="336" y="37" width="40" height="28" rx="4"/><text x="356.0" y="51.0">6</text>
<rect class="n" x="380" y="37" width="40" height="28" rx="4"/><text x="400.0" y="51.0">2</text>
<text x="4" y="87.0" class="sm st">1회 추출</text>
<rect class="n" x="72" y="73" width="40" height="28" rx="4"/><text x="92.0" y="87.0">8</text>
<rect class="n" x="116" y="73" width="40" height="28" rx="4"/><text x="136.0" y="87.0">5</text>
<rect class="n" x="160" y="73" width="40" height="28" rx="4"/><text x="180.0" y="87.0">6</text>
<rect class="n" x="204" y="73" width="40" height="28" rx="4"/><text x="224.0" y="87.0">4</text>
<rect class="n" x="248" y="73" width="40" height="28" rx="4"/><text x="268.0" y="87.0">3</text>
<rect class="n" x="292" y="73" width="40" height="28" rx="4"/><text x="312.0" y="87.0">1</text>
<rect class="n" x="336" y="73" width="40" height="28" rx="4"/><text x="356.0" y="87.0">2</text>
<rect class="h" x="380" y="73" width="40" height="28" rx="4"/><text x="400.0" y="87.0">9</text>
<rect class="he" x="378" y="71" width="44" height="32" rx="5"/>
<text x="4" y="123.0" class="sm st">2회 추출</text>
<rect class="n" x="72" y="109" width="40" height="28" rx="4"/><text x="92.0" y="123.0">6</text>
<rect class="n" x="116" y="109" width="40" height="28" rx="4"/><text x="136.0" y="123.0">5</text>
<rect class="n" x="160" y="109" width="40" height="28" rx="4"/><text x="180.0" y="123.0">2</text>
<rect class="n" x="204" y="109" width="40" height="28" rx="4"/><text x="224.0" y="123.0">4</text>
<rect class="n" x="248" y="109" width="40" height="28" rx="4"/><text x="268.0" y="123.0">3</text>
<rect class="n" x="292" y="109" width="40" height="28" rx="4"/><text x="312.0" y="123.0">1</text>
<rect class="h" x="336" y="109" width="40" height="28" rx="4"/><text x="356.0" y="123.0">8</text>
<rect class="he" x="334" y="107" width="44" height="32" rx="5"/>
<rect class="h" x="380" y="109" width="40" height="28" rx="4"/><text x="400.0" y="123.0">9</text>
<text x="4" y="159.0" class="sm st">3회 추출</text>
<rect class="n" x="72" y="145" width="40" height="28" rx="4"/><text x="92.0" y="159.0">5</text>
<rect class="n" x="116" y="145" width="40" height="28" rx="4"/><text x="136.0" y="159.0">4</text>
<rect class="n" x="160" y="145" width="40" height="28" rx="4"/><text x="180.0" y="159.0">2</text>
<rect class="n" x="204" y="145" width="40" height="28" rx="4"/><text x="224.0" y="159.0">1</text>
<rect class="n" x="248" y="145" width="40" height="28" rx="4"/><text x="268.0" y="159.0">3</text>
<rect class="h" x="292" y="145" width="40" height="28" rx="4"/><text x="312.0" y="159.0">6</text>
<rect class="he" x="290" y="143" width="44" height="32" rx="5"/>
<rect class="h" x="336" y="145" width="40" height="28" rx="4"/><text x="356.0" y="159.0">8</text>
<rect class="h" x="380" y="145" width="40" height="28" rx="4"/><text x="400.0" y="159.0">9</text>
<text x="4" y="195.0" class="sm st">4회 추출</text>
<rect class="n" x="72" y="181" width="40" height="28" rx="4"/><text x="92.0" y="195.0">4</text>
<rect class="n" x="116" y="181" width="40" height="28" rx="4"/><text x="136.0" y="195.0">3</text>
<rect class="n" x="160" y="181" width="40" height="28" rx="4"/><text x="180.0" y="195.0">2</text>
<rect class="n" x="204" y="181" width="40" height="28" rx="4"/><text x="224.0" y="195.0">1</text>
<rect class="h" x="248" y="181" width="40" height="28" rx="4"/><text x="268.0" y="195.0">5</text>
<rect class="he" x="246" y="179" width="44" height="32" rx="5"/>
<rect class="h" x="292" y="181" width="40" height="28" rx="4"/><text x="312.0" y="195.0">6</text>
<rect class="h" x="336" y="181" width="40" height="28" rx="4"/><text x="356.0" y="195.0">8</text>
<rect class="h" x="380" y="181" width="40" height="28" rx="4"/><text x="400.0" y="195.0">9</text>
<text x="4" y="231.0" class="sm st">5회 추출</text>
<rect class="n" x="72" y="217" width="40" height="28" rx="4"/><text x="92.0" y="231.0">3</text>
<rect class="n" x="116" y="217" width="40" height="28" rx="4"/><text x="136.0" y="231.0">1</text>
<rect class="n" x="160" y="217" width="40" height="28" rx="4"/><text x="180.0" y="231.0">2</text>
<rect class="h" x="204" y="217" width="40" height="28" rx="4"/><text x="224.0" y="231.0">4</text>
<rect class="he" x="202" y="215" width="44" height="32" rx="5"/>
<rect class="h" x="248" y="217" width="40" height="28" rx="4"/><text x="268.0" y="231.0">5</text>
<rect class="h" x="292" y="217" width="40" height="28" rx="4"/><text x="312.0" y="231.0">6</text>
<rect class="h" x="336" y="217" width="40" height="28" rx="4"/><text x="356.0" y="231.0">8</text>
<rect class="h" x="380" y="217" width="40" height="28" rx="4"/><text x="400.0" y="231.0">9</text>
<text x="4" y="267.0" class="sm st">6회 추출</text>
<rect class="n" x="72" y="253" width="40" height="28" rx="4"/><text x="92.0" y="267.0">2</text>
<rect class="n" x="116" y="253" width="40" height="28" rx="4"/><text x="136.0" y="267.0">1</text>
<rect class="h" x="160" y="253" width="40" height="28" rx="4"/><text x="180.0" y="267.0">3</text>
<rect class="he" x="158" y="251" width="44" height="32" rx="5"/>
<rect class="h" x="204" y="253" width="40" height="28" rx="4"/><text x="224.0" y="267.0">4</text>
<rect class="h" x="248" y="253" width="40" height="28" rx="4"/><text x="268.0" y="267.0">5</text>
<rect class="h" x="292" y="253" width="40" height="28" rx="4"/><text x="312.0" y="267.0">6</text>
<rect class="h" x="336" y="253" width="40" height="28" rx="4"/><text x="356.0" y="267.0">8</text>
<rect class="h" x="380" y="253" width="40" height="28" rx="4"/><text x="400.0" y="267.0">9</text>
<text x="4" y="303.0" class="sm st">7회 추출</text>
<rect class="h" x="72" y="289" width="40" height="28" rx="4"/><text x="92.0" y="303.0">1</text>
<rect class="h" x="116" y="289" width="40" height="28" rx="4"/><text x="136.0" y="303.0">2</text>
<rect class="he" x="114" y="287" width="44" height="32" rx="5"/>
<rect class="h" x="160" y="289" width="40" height="28" rx="4"/><text x="180.0" y="303.0">3</text>
<rect class="h" x="204" y="289" width="40" height="28" rx="4"/><text x="224.0" y="303.0">4</text>
<rect class="h" x="248" y="289" width="40" height="28" rx="4"/><text x="268.0" y="303.0">5</text>
<rect class="h" x="292" y="289" width="40" height="28" rx="4"/><text x="312.0" y="303.0">6</text>
<rect class="h" x="336" y="289" width="40" height="28" rx="4"/><text x="356.0" y="303.0">8</text>
<rect class="h" x="380" y="289" width="40" height="28" rx="4"/><text x="400.0" y="303.0">9</text>
</svg><figcaption>"최대 힙" 행은 배열을 최대 힙으로 만든 결과(루트 9). 이후 매번 루트를 맨 뒤와 교환해 확정하고(굵은 테두리) 남은 부분을 다시 힙으로 만든다.</figcaption></figure>

<h3>4. 비교하지 않는 정렬 — 하한을 벗어난다</h3>
<p>비교 정렬의 하한은 "비교만 쓴다"는 전제에서 나온다. 값에 대한 추가 정보(작은 정수, 자릿수)를 쓰면 더 빠를 수 있다.</p>
<h4>계수 정렬</h4>
<ul>
<li><strong>원리</strong>: 값의 범위가 작은 정수(0~k)일 때 각 값의 개수를 세고, 누적합으로 위치를 정한다.</li>
<li><strong>복잡도</strong>: $O(n+k)$. $k$가 크면 메모리 낭비. 안정.</li>
</ul>
<h4>기수 정렬 (LSD)</h4>
<ul>
<li><strong>원리</strong>: 가장 낮은 자리부터 한 자리씩, 그 자리 숫자로 <strong>안정 정렬</strong>(0~9 버킷에 차례로 넣고 꺼내기)을 반복.</li>
<li><strong>핵심</strong>: 각 단계가 안정적이어야 앞 단계(낮은 자리)의 순서가 유지된다.</li>
<li><strong>복잡도</strong>: $O(d(n+k))$ ($d$: 자릿수, $k$: 기수). 안정.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 488 146" width="488">
<text x="4" y="15.0" class="sm st">초기</text>
<rect class="n" x="72" y="1" width="48" height="28" rx="4"/><text x="96.0" y="15.0">170</text>
<rect class="n" x="124" y="1" width="48" height="28" rx="4"/><text x="148.0" y="15.0">45</text>
<rect class="n" x="176" y="1" width="48" height="28" rx="4"/><text x="200.0" y="15.0">75</text>
<rect class="n" x="228" y="1" width="48" height="28" rx="4"/><text x="252.0" y="15.0">90</text>
<rect class="n" x="280" y="1" width="48" height="28" rx="4"/><text x="304.0" y="15.0">802</text>
<rect class="n" x="332" y="1" width="48" height="28" rx="4"/><text x="356.0" y="15.0">24</text>
<rect class="n" x="384" y="1" width="48" height="28" rx="4"/><text x="408.0" y="15.0">2</text>
<rect class="n" x="436" y="1" width="48" height="28" rx="4"/><text x="460.0" y="15.0">66</text>
<text x="4" y="51.0" class="sm st">1의 자리</text>
<rect class="n" x="72" y="37" width="48" height="28" rx="4"/><text x="96.0" y="51.0">170</text>
<rect class="n" x="124" y="37" width="48" height="28" rx="4"/><text x="148.0" y="51.0">90</text>
<rect class="n" x="176" y="37" width="48" height="28" rx="4"/><text x="200.0" y="51.0">802</text>
<rect class="n" x="228" y="37" width="48" height="28" rx="4"/><text x="252.0" y="51.0">2</text>
<rect class="n" x="280" y="37" width="48" height="28" rx="4"/><text x="304.0" y="51.0">24</text>
<rect class="n" x="332" y="37" width="48" height="28" rx="4"/><text x="356.0" y="51.0">45</text>
<rect class="n" x="384" y="37" width="48" height="28" rx="4"/><text x="408.0" y="51.0">75</text>
<rect class="n" x="436" y="37" width="48" height="28" rx="4"/><text x="460.0" y="51.0">66</text>
<text x="4" y="87.0" class="sm st">10의 자리</text>
<rect class="n" x="72" y="73" width="48" height="28" rx="4"/><text x="96.0" y="87.0">802</text>
<rect class="n" x="124" y="73" width="48" height="28" rx="4"/><text x="148.0" y="87.0">2</text>
<rect class="n" x="176" y="73" width="48" height="28" rx="4"/><text x="200.0" y="87.0">24</text>
<rect class="n" x="228" y="73" width="48" height="28" rx="4"/><text x="252.0" y="87.0">45</text>
<rect class="n" x="280" y="73" width="48" height="28" rx="4"/><text x="304.0" y="87.0">66</text>
<rect class="n" x="332" y="73" width="48" height="28" rx="4"/><text x="356.0" y="87.0">170</text>
<rect class="n" x="384" y="73" width="48" height="28" rx="4"/><text x="408.0" y="87.0">75</text>
<rect class="n" x="436" y="73" width="48" height="28" rx="4"/><text x="460.0" y="87.0">90</text>
<text x="4" y="123.0" class="sm st">100의 자리</text>
<rect class="h" x="72" y="109" width="48" height="28" rx="4"/><text x="96.0" y="123.0">2</text>
<rect class="h" x="124" y="109" width="48" height="28" rx="4"/><text x="148.0" y="123.0">24</text>
<rect class="h" x="176" y="109" width="48" height="28" rx="4"/><text x="200.0" y="123.0">45</text>
<rect class="h" x="228" y="109" width="48" height="28" rx="4"/><text x="252.0" y="123.0">66</text>
<rect class="h" x="280" y="109" width="48" height="28" rx="4"/><text x="304.0" y="123.0">75</text>
<rect class="h" x="332" y="109" width="48" height="28" rx="4"/><text x="356.0" y="123.0">90</text>
<rect class="h" x="384" y="109" width="48" height="28" rx="4"/><text x="408.0" y="123.0">170</text>
<rect class="h" x="436" y="109" width="48" height="28" rx="4"/><text x="460.0" y="123.0">802</text>
</svg><figcaption>1의 자리 → 10의 자리 → 100의 자리 순으로 버킷 정렬. 10의 자리에서 802와 2는 둘 다 0이라 직전 순서(802가 먼저)가 유지된다.</figcaption></figure>

<h3>5. 총정리 비교표</h3>
<table><tr><th>알고리즘</th><th>최선</th><th>평균</th><th>최악</th><th>추가 공간</th><th>안정</th></tr>
<tr><td>버블</td><td>$O(n)$*</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>안정</td></tr>
<tr><td>선택</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>불안정</td></tr>
<tr><td>삽입</td><td>$O(n)$</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>안정</td></tr>
<tr><td>셸</td><td>$O(n\log n)$</td><td>약 $O(n^{1.3\sim1.5})$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>불안정</td></tr>
<tr><td>퀵</td><td>$O(n\log n)$</td><td>$O(n\log n)$</td><td>$O(n^2)$</td><td>$O(\log n)$</td><td>불안정</td></tr>
<tr><td>병합</td><td>$O(n\log n)$</td><td>$O(n\log n)$</td><td>$O(n\log n)$</td><td>$O(n)$</td><td>안정</td></tr>
<tr><td>힙</td><td>$O(n\log n)$</td><td>$O(n\log n)$</td><td>$O(n\log n)$</td><td>$O(1)$</td><td>불안정</td></tr>
<tr><td>계수</td><td colspan="3">$O(n+k)$</td><td>$O(n+k)$</td><td>안정</td></tr>
<tr><td>기수</td><td colspan="3">$O(d(n+k))$</td><td>$O(n+k)$</td><td>안정</td></tr></table>
<ul>
<li>* 교환이 없으면 멈추는 플래그를 둔 경우.</li>
<li><strong>안정 정렬 암기</strong>: 버블·삽입·병합·계수·기수. 멀리 떨어진 원소를 한 번에 교환하는 <strong>선택·셸·퀵·힙</strong>은 불안정.</li>
<li><strong>최악에도 $O(n\log n)$</strong>: 병합·힙. 퀵은 최악 $O(n^2)$.</li>
<li><strong>실무</strong>: Python <code>sorted</code>는 <strong>Timsort</strong> — 이미 정렬된 구간(run)을 찾아 짧은 run은 삽입 정렬로 늘리고 병합 정렬 방식으로 합치는 하이브리드. 안정, 최악 $O(n\log n)$, 정렬된 입력에서 $O(n)$.</li>
</ul>`,
    analogy: R`<p>시험지 1,000장을 번호순으로 정리하기. <strong>병합 정렬</strong>은 조교들에게 나눠 각자 정리하게 한 뒤 정리된 더미 두 개씩 위에서부터 비교하며 합친다. <strong>퀵 정렬</strong>은 "500번보다 작은 것은 왼쪽, 큰 것은 오른쪽"으로 나눈 뒤 각 더미에서 다시 반복한다. 기준을 운 나쁘게 1번으로 잡으면 한 더미에 거의 전부가 몰린다.</p>`,
    diagram: { caption: '병합 정렬: log₂n 단계로 분할한 뒤, 각 단계에서 전체 n개를 한 번씩 병합한다 → O(n log n).', svg: R`
<svg viewBox="0 0 520 260" width="520">
<rect class="n" x="140" y="8" width="240" height="30" rx="5"/><text x="260" y="23">38 27 43 3 9 82 10 15</text>
<path class="e" d="M220,38 L130,58 M300,38 L390,58"/>
<rect class="n" x="55" y="58" width="150" height="30" rx="5"/><text x="130" y="73">38 27 43 3</text>
<rect class="n" x="315" y="58" width="150" height="30" rx="5"/><text x="390" y="73">9 82 10 15</text>
<path class="e" d="M100,88 L65,108 M160,88 L195,108 M360,88 L325,108 M420,88 L455,108"/>
<rect class="n" x="25" y="108" width="80" height="30" rx="5"/><text x="65" y="123">38 27</text>
<rect class="n" x="155" y="108" width="80" height="30" rx="5"/><text x="195" y="123">43 3</text>
<rect class="n" x="285" y="108" width="80" height="30" rx="5"/><text x="325" y="123">9 82</text>
<rect class="n" x="415" y="108" width="80" height="30" rx="5"/><text x="455" y="123">10 15</text>
<path class="ha" d="M65,138 L120,166"/><path class="ha" d="M195,138 L140,166"/><path class="ha" d="M325,138 L380,166"/><path class="ha" d="M455,138 L400,166"/>
<rect class="h" x="55" y="168" width="150" height="30" rx="5"/><text x="130" y="183">3 27 38 43</text>
<rect class="h" x="315" y="168" width="150" height="30" rx="5"/><text x="390" y="183">9 10 15 82</text>
<path class="ha" d="M130,198 L230,224"/><path class="ha" d="M390,198 L290,224"/>
<rect class="h" x="140" y="226" width="240" height="30" rx="5"/><text x="260" y="241">3 9 10 15 27 38 43 82</text>
<text x="490" y="73" class="sm">분할</text><text x="490" y="183" class="sm">병합</text>
</svg>` },
    math: [
      { tex: R`T(n) = 2T(n/2) + cn \;\Rightarrow\; T(n) = \Theta(n \log n)`, explain: R`병합 정렬의 점화식.<ul class="defs"><li>$2T(n/2)$: 절반 크기 두 문제</li><li>$cn$: 병합 비용</li></ul>깊이 $\log_2 n$인 재귀 트리의 각 층 비용 합이 $cn$이다.` },
      { tex: R`\log_2 n! \ge \log_2 \left(\tfrac{n}{2}\right)^{n/2} = \tfrac{n}{2}\log_2 \tfrac{n}{2} = \Omega(n \log n)`, explain: R`비교 정렬 하한. $n!$의 곱에서 큰 쪽 절반의 항만 남겨도(각각 $\ge n/2$) 이만큼 크다.` },
    ],
    code: R`
import random

def merge_sort(a):
  if len(a) <= 1:
      return a
  mid = len(a) // 2
  L, R = merge_sort(a[:mid]), merge_sort(a[mid:])
  out, i, j = [], 0, 0
  while i < len(L) and j < len(R):
      if L[i] <= R[j]:               # '<=': 같은 값은 왼쪽 것이 먼저 → 안정 정렬
          out.append(L[i]); i += 1
      else:
          out.append(R[j]); j += 1
  return out + L[i:] + R[j:]

def quick_sort(a):                     # 이해용 버전 (제자리 분할 아님)
  if len(a) <= 1:
      return a
  pivot = random.choice(a)           # 무작위 피벗: 어떤 입력이든 기대 O(n log n)
  return (quick_sort([x for x in a if x < pivot])
          + [x for x in a if x == pivot]
          + quick_sort([x for x in a if x > pivot]))

data = [random.randint(0, 99) for _ in range(20)]
assert merge_sort(data) == quick_sort(data) == sorted(data)
print(merge_sort(data))

# 안정성: 점수로 정렬해도 같은 점수끼리는 직전 순서(이름순)가 유지된다
students = sorted([("양의지", 90), ("곽빈", 85), ("정수빈", 90), ("김택연", 85)])  # 이름순
print(sorted(students, key=lambda s: s[1], reverse=True))
# [('양의지', 90), ('정수빈', 90), ('곽빈', 85), ('김택연', 85)]
`,
    links: [
      { to: 'ds-complexity', why: '결정 트리 하한 — 문제 자체의 복잡도' },
      { to: 'ds-heap', why: '힙 정렬과 우선순위 큐' },
      { to: 'ds-search', why: '정렬해 두면 이진 탐색이 가능해진다' },
      { to: 'db-plan', why: 'ORDER BY, 정렬-병합 조인 등 쿼리 실행 계획 속 정렬 연산' },
      { to: 'ca-cache', why: '퀵 정렬이 힙 정렬보다 실제로 빠른 경우가 많은 이유: 순차 접근' },
    ],
    quiz: [
      { q: '<code>7 4 9 2 5</code>를 오름차순 <strong>버블 정렬</strong>할 때 1회전 후의 배열은?',
        options: ['4 7 2 5 9', '2 4 9 7 5', '4 7 9 2 5', '4 2 7 5 9'], answer: 0,
        explain: '인접 비교·교환: (7,4)교환 → 4 7 9 2 5, (7,9)그대로, (9,2)교환 → 4 7 2 9 5, (9,5)교환 → 4 7 2 5 9. 가장 큰 9가 맨 뒤에 확정된다. 2 4 9 7 5는 선택 정렬 1회전, 4 7 9 2 5는 삽입 정렬 2회전 결과다.' },
      { q: '다음 중 <strong>안정 정렬</strong>로만 짝지어진 것은?',
        options: ['버블, 삽입, 병합', '선택, 삽입, 병합', '퀵, 삽입, 병합', '셸, 버블, 병합'], answer: 0,
        explain: '안정: 버블·삽입·병합·계수·기수. 불안정: 선택·셸·퀵·힙 — 멀리 떨어진 원소를 한 번에 교환하기 때문이다.' },
      { q: '이미 거의 정렬된 대량의 데이터에 가장 적합한 단순 정렬과 그 이유는?',
        options: ['삽입 정렬 — 뒤바뀐 쌍의 수에 비례해 O(n)에 가깝다', '선택 정렬 — 교환 횟수가 최대 n−1번으로 적다', '퀵 정렬(첫 원소 피벗) — 평균 O(n log n)이다', '병합 정렬 — 입력과 무관하게 O(n log n)이다'], answer: 0,
        explain: '거의 정렬된 입력에서 삽입 정렬은 각 원소가 조금만 이동하므로 O(n)에 가깝다. 선택 정렬은 입력과 무관하게 비교 n(n-1)/2번이고, 첫 원소 피벗 퀵 정렬은 정렬된 입력에서 최악 O(n²)이 된다. 병합 정렬은 O(n log n)이지만 단순 정렬이 아니고 거의 정렬된 입력의 이점을 살리지 못한다.' },
      { q: '비교 기반 정렬이 최악의 경우 Ω(n log n)보다 빠를 수 없는 이유는?',
        options: ['비교 한 번에 원소 하나의 최종 위치만 확정할 수 있어서 n·log n번이 필요하기 때문', 'n!개 순열을 구별하는 결정 트리의 높이가 log₂(n!) = Θ(n log n) 이상이라서', '분할 정복으로 나눌 때 재귀 깊이가 최소 log n이고 단계마다 n번 비교하기 때문', '모든 원소 쌍을 적어도 한 번씩은 비교해야 정렬 여부를 확인할 수 있기 때문'], answer: 1,
        explain: '알고리즘이 아니라 "비교만 쓰는 정렬 문제" 자체의 하한이다. 계수 정렬처럼 비교 외 정보를 쓰면 이 하한을 벗어날 수 있다.' },
      { q: '선수 명단을 이름순으로 정렬한 뒤, 같은 포지션 안에서는 이름순을 유지하며 포지션순으로 정렬하려 한다. 두 번째 정렬에 필요한 성질은?',
        options: ['제자리 정렬', '안정 정렬', '최악 O(n log n)', '비교 정렬'], answer: 1,
        explain: '안정 정렬은 키(포지션)가 같은 원소의 기존 상대 순서(이름순)를 보존한다. Python sorted/list.sort는 안정 정렬이다.' },
      { q: '퀵 정렬이 O(n²)이 되는 전형적인 상황은?',
        options: ['데이터가 무작위 순서로 뒤섞여 있을 때', '정렬된 배열에서 첫 원소를 피벗으로 고를 때', '피벗을 매번 무작위 위치에서 고를 때', '중복된 값이 하나도 없는 배열을 정렬할 때'], answer: 1,
        explain: '매번 한쪽이 비고 다른 쪽에 n-1개가 남아 깊이가 n이 된다. 무작위 피벗이나 중앙값 근사(median-of-three)로 피한다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 2, 7, 8장', 'Tim Peters, "listsort.txt" (CPython 저장소의 Timsort 설계 문서)', 'Sedgewick, 『Algorithms』 4판 2장 + Coursera 강의'],
  },
  {
    id:'ds-search', title: '이진 탐색', advanced: true,
    summary: R`정렬(<strong>단조</strong>) 구조에서 매번 후보 절반 제거 → $O(\log n)$
핵심은 코드보다 <strong>불변식</strong>`,
    body: R`
<p>이진 탐색이 가능한 이유는 정렬 그 자체가 아니라, 가운데 원소 하나만 보고 <strong>"답은 이쪽 절반에 없다"고 확신할 수 있는 성질</strong>이다. 정렬된 배열에서 <code>a[mid] &lt; x</code>이면 <code>a[0..mid]</code>는 모두 x보다 작으니 버릴 수 있다. 이 보장이 깨지면(정렬 안 된 배열) 버린 절반에 답이 있을 수 있어 실패한다.</p>
<h3>불변식으로 생각하면 off-by-one이 사라진다</h3>
<p>이진 탐색 버그는 대부분 경계(<code>&lt;</code> vs <code>&lt;=</code>, <code>mid</code> vs <code>mid±1</code>)에서 나온다. 해결책은 구간의 의미를 먼저 정하는 것이다. 반열린 구간 <code>[lo, hi)</code>를 쓰고 다음 불변식을 유지한다:</p>
<ul><li><code>a[:lo]</code>의 원소는 모두 <code>x</code>보다 작다.</li><li><code>a[hi:]</code>의 원소는 모두 <code>x</code> 이상이다.</li></ul>
<p>그러면 <code>a[mid] &lt; x</code>일 때 mid까지 "작은 쪽"이 확정되므로 <code>lo = mid + 1</code>, 아니면 mid는 "이상인 쪽"이므로 <code>hi = mid</code>. 루프가 끝나 <code>lo == hi</code>가 되면 그 위치가 "x 이상인 첫 위치(lower bound)"다. Python <code>bisect_left</code>가 정확히 이것이다. 매 반복마다 구간이 반드시 줄어드므로 종료도 보장된다.</p>
<h3>값 찾기를 넘어: 답에 대한 이진 탐색</h3>
<p>조건 $f(k)$가 어떤 지점부터 계속 참인 꼴(F F F T T T, <strong>단조</strong>)이면 배열이 없어도 경계를 이진 탐색할 수 있다. "하루 처리량이 k면 마감 내에 끝나는가?", "용량 k인 트럭 몇 대면 되는가?" 같은 최적화 문제를 "k가 가능한가?"라는 판정 문제로 바꿔 푼다(파라메트릭 서치). <code>git bisect</code>가 버그를 처음 만든 커밋을 찾는 방식도 같다 — "이 커밋에서 버그가 있는가?"가 단조이기 때문이다.</p>
<h3>자료구조와의 관계</h3>
<p>이진 탐색은 <strong>임의 접근 $O(1)$</strong>을 전제로 한다. 연결 리스트에서는 mid에 가는 데 $O(n)$이 들어 의미가 없다. 삽입·삭제가 잦으면 정렬 배열을 유지하는 비용($O(n)$)이 커지므로 같은 아이디어를 포인터 구조로 옮긴 BST/B-Tree를 쓴다.</p>`,
    analogy: R`<p>"숫자 맞히기 게임(1~100)". "50보다 커요?" → "아니요" → "25보다 커요?"… 7번이면 반드시 맞힌다($2^7 = 128 \ge 100$). 상대가 거짓말을 섞으면(정렬이 깨지면) 이 전략은 무너진다.</p>`,
    diagram: { caption: '23 찾기: 회색 칸은 이미 제외된 후보. 매 단계 구간 [lo, hi)가 절반으로 줄어든다.', svg: R`
<svg viewBox="0 0 530 210" width="530">
<g>
  <rect class="h" x="10" y="20" width="44" height="32"/><rect class="h" x="54" y="20" width="44" height="32"/><rect class="h" x="98" y="20" width="44" height="32"/><rect class="h" x="142" y="20" width="44" height="32"/>
  <rect class="n" x="186" y="20" width="44" height="32" style="stroke-width:3"/><rect class="h" x="230" y="20" width="44" height="32"/><rect class="h" x="274" y="20" width="44" height="32"/><rect class="h" x="318" y="20" width="44" height="32"/>
  <text x="32" y="36">2</text><text x="76" y="36">5</text><text x="120" y="36">8</text><text x="164" y="36">12</text><text x="208" y="36">16</text><text x="252" y="36">23</text><text x="296" y="36">38</text><text x="340" y="36">56</text>
  <text x="374" y="36" class="st sm">[0,8) mid=4: 16 &lt; 23 → lo=5</text>
</g>
<g>
  <rect class="g" x="10" y="75" width="44" height="32"/><rect class="g" x="54" y="75" width="44" height="32"/><rect class="g" x="98" y="75" width="44" height="32"/><rect class="g" x="142" y="75" width="44" height="32"/><rect class="g" x="186" y="75" width="44" height="32"/>
  <rect class="h" x="230" y="75" width="44" height="32"/><rect class="n" x="274" y="75" width="44" height="32" style="stroke-width:3"/><rect class="h" x="318" y="75" width="44" height="32"/>
  <text x="32" y="91">2</text><text x="76" y="91">5</text><text x="120" y="91">8</text><text x="164" y="91">12</text><text x="208" y="91">16</text><text x="252" y="91">23</text><text x="296" y="91">38</text><text x="340" y="91">56</text>
  <text x="374" y="91" class="st sm">[5,8) mid=6: 38 ≥ 23 → hi=6</text>
</g>
<g>
  <rect class="g" x="10" y="130" width="44" height="32"/><rect class="g" x="54" y="130" width="44" height="32"/><rect class="g" x="98" y="130" width="44" height="32"/><rect class="g" x="142" y="130" width="44" height="32"/><rect class="g" x="186" y="130" width="44" height="32"/>
  <rect class="n" x="230" y="130" width="44" height="32" style="stroke-width:3"/><rect class="g" x="274" y="130" width="44" height="32"/><rect class="g" x="318" y="130" width="44" height="32"/>
  <text x="32" y="146">2</text><text x="76" y="146">5</text><text x="120" y="146">8</text><text x="164" y="146">12</text><text x="208" y="146">16</text><text x="252" y="146">23</text><text x="296" y="146">38</text><text x="340" y="146">56</text>
  <text x="374" y="146" class="st sm">[5,6) mid=5: 23 ≥ 23 → hi=5</text>
</g>
<text x="186" y="192">lo = hi = 5 → a[5] = 23 (x 이상인 첫 위치)</text>
</svg>` },
    math: [
      { tex: R`\text{반복 횟수} \le \lceil \log_2 (n+1) \rceil`, explain: R`매 반복 후보 구간이 절반 이하로 줄어든다. $n = 10^6$이면 약 20번, $10^9$이면 약 30번.` },
    ],
    code: R`
import bisect

def lower_bound(a, x):
  """x 이상인 첫 위치. 불변식: a[:lo] < x  그리고  a[hi:] >= x"""
  lo, hi = 0, len(a)                 # 반열린 구간 [lo, hi)
  while lo < hi:
      mid = (lo + hi) // 2
      if a[mid] < x:
          lo = mid + 1               # mid까지는 x보다 작다 → 버림
      else:
          hi = mid                   # mid는 답 후보 → 남김
  return lo

a = [1, 3, 3, 3, 7, 9]
for x in [0, 3, 4, 10]:
  assert lower_bound(a, x) == bisect.bisect_left(a, x)
print(lower_bound(a, 3), bisect.bisect_right(a, 3))   # 1 4 → 3의 개수 = 4 - 1 = 3

# 답에 대한 이진 탐색: f(k) = (k*k > n) 은 F...F T...T 꼴(단조)
def isqrt(n):
  lo, hi = 0, n + 1
  while lo < hi:                     # k*k > n 을 만족하는 최소 k 찾기
      mid = (lo + hi) // 2
      if mid * mid > n:
          hi = mid
      else:
          lo = mid + 1
  return lo - 1

print(isqrt(10**12 + 5), isqrt(15))    # 1000000 3
`,
    links: [
      { to: 'ds-tree', why: '이진 탐색을 삽입·삭제 가능한 포인터 구조로 옮긴 것이 BST' },
      { to: 'db-index', why: 'B-Tree 노드 안의 키 탐색, 범위 질의의 시작점 찾기' },
      { to: 'se-git', why: 'git bisect: 버그가 처음 생긴 커밋을 이진 탐색으로 찾는다' },
      { to: 'ds-sort', why: '정렬 비용을 한 번 치르면 이후 탐색이 O(log n)' },
    ],
    quiz: [
      { q: '정렬되지 않은 배열에 이진 탐색을 쓰면 실패할 수 있는 근본 이유는?',
        options: ['mid = (lo+hi)//2 계산에서 오버플로가 나기 때문', '"버리는 절반에는 답이 없다"는 보장이 깨지기 때문', '찾는 값이 배열에 두 번 이상 나올 수 있기 때문', '배열 길이가 2의 거듭제곱이 아닐 수 있기 때문'], answer: 1,
        explain: '이진 탐색의 정당성은 a[mid]와의 비교만으로 한쪽 절반 전체를 판정할 수 있다는 단조성에서 나온다.' },
      { q: '"마감 D일 안에 모든 작업을 끝내기 위한 최소 하루 처리량"을 이진 탐색으로 찾을 수 있는 조건은?',
        options: ['작업들이 처리량 순으로 미리 정렬되어 있어야 한다', 'k로 가능하면 k보다 큰 처리량으로도 항상 가능해야 한다', '가능한 처리량 k가 정확히 하나만 존재해야 한다', '하루 처리량과 걸리는 일수가 정비례 관계여야 한다'], answer: 1,
        explain: '판정 결과가 F…F T…T 꼴이면 경계(최소 k)를 이진 탐색할 수 있다. 판정 함수 비용 × log(범위)로 풀린다.' },
      { q: '연결 리스트에서 이진 탐색이 O(log n)이 되지 않는 이유는?',
        options: ['연결 리스트에서는 원소 사이의 크기 비교를 정의할 수 없어서', '가운데 노드까지 가는 데 O(n)이 걸려 전제가 깨지기 때문', '정렬된 연결 리스트는 삽입할 때마다 정렬이 깨지기 때문', '비교 횟수 자체가 log n이 아니라 n/2로 늘어나기 때문'], answer: 1,
        explain: '비교 횟수는 log n이어도 mid까지 이동하는 비용이 크다. 그래서 동적 집합에서는 트리 구조를 쓴다.' },
    ],
    resources: ['Jon Bentley, 『Programming Pearls』 4장 — 올바른 프로그램 작성(이진 탐색)', 'Python 공식 문서 — bisect', '『Introduction to Algorithms』(CLRS) 2.3 연습문제'],
  },
  {
    id:'ds-dp', title: '동적 계획법 (DP)',
    summary: R`반복되는 부분 문제를 <strong>한 번만 풀고 저장해 재사용</strong>
지수 시간 재귀 → 다항 시간`,
    body: R`
<p>DP가 적용되려면 두 조건이 필요하다.</p>
<ol>
<li><strong>최적 부분 구조</strong>: 큰 문제의 최적해가 작은 문제들의 최적해로 구성된다.</li>
<li><strong>중복 부분 문제</strong>: 재귀로 풀면 같은 부분 문제가 여러 번 호출된다.</li>
</ol>
<p>병합 정렬도 분할 정복이지만 부분 문제(서로 다른 구간)가 겹치지 않아 저장해 봐야 재사용할 일이 없다. 피보나치는 $F(5)$를 구하려고 $F(3)$을 두 번, $F(2)$를 세 번 계산하며, $n$이 커지면 호출 수가 지수적으로 폭증한다. 서로 다른 부분 문제는 $n+1$개뿐인데 말이다. DP는 <strong>"서로 다른 부분 문제의 수 × 하나를 푸는 비용"</strong>으로 복잡도를 낮춘다.</p>
<h3>두 가지 구현</h3>
<ul>
<li><strong>메모이제이션(top-down)</strong>: 재귀 그대로 쓰되 결과를 캐시. 필요한 부분 문제만 계산한다. Python에서는 <code>@functools.lru_cache</code> 데코레이터 한 줄. 다만 깊은 재귀는 재귀 한도에 걸릴 수 있다.</li>
<li><strong>타뷸레이션(bottom-up)</strong>: 작은 부분 문제부터 표를 채운다. 계산 순서를 직접 정해야 하지만 재귀 오버헤드가 없고, 필요한 이전 값만 남겨 공간을 줄이기 쉽다.</li>
</ul>
<h3>DP 설계 절차</h3>
<ol>
<li><strong>상태 정의</strong>: <code>dp[i][w]</code> = "앞의 i개 물건만 보고 용량 w일 때 최대 가치"처럼, 부분 문제를 무엇으로 식별할지. 가장 어렵고 중요한 단계다.</li>
<li><strong>점화식</strong>: 마지막 선택(i번째 물건을 넣는다/안 넣는다)으로 경우를 나눈다.</li>
<li><strong>기저 조건</strong>: <code>dp[0][w] = 0</code>.</li>
<li><strong>계산 순서</strong>: 의존하는 상태가 먼저 계산되도록.</li>
</ol>
<h3>다른 분야의 DP</h3>
<p>벨만-포드·플로이드-워셜 최단 경로, 문자열 편집 거리, 음성 인식·품사 태깅의 비터비 알고리즘이 모두 DP다. 신경망의 역전파도 출력에 가까운 노드의 그래디언트를 한 번 계산해 저장하고 입력 쪽 계산에 재사용한다는 점에서 같은 아이디어를 쓴다.</p>`,
    analogy: R`<p>계단 오르기 문제를 친구들에게 물어보는 상황. "10층까지 가는 방법 수는?"이라고 물으면 친구는 "9층까지 방법 수 + 8층까지 방법 수"라며 다시 다른 친구에게 묻는다. 메모 없이 하면 같은 질문("5층은?")을 수십 명이 반복한다. <strong>벽에 붙인 답안 표</strong>를 두고 이미 나온 답은 보기만 하면 한 층에 한 번씩만 계산하면 된다.</p>`,
    diagram: { caption: 'F(5)의 재귀 호출 트리. 강조된 F(3)은 2번, F(2)는 3번 중복 계산된다. 메모이제이션하면 각 F(k)는 한 번만 계산된다.', svg: R`
<svg viewBox="0 0 500 200" width="500">
<path class="e" d="M250,22 L150,72 M250,22 L380,72 M150,72 L90,122 M150,72 L210,122 M380,72 L330,122 M380,72 L430,122 M90,122 L50,172 M90,122 L130,172 M210,122 L185,172 M210,122 L235,172 M330,122 L305,172 M330,122 L355,172"/>
<ellipse class="n" cx="250" cy="22" rx="26" ry="14"/><text x="250" y="22">F(5)</text>
<ellipse class="n" cx="150" cy="72" rx="26" ry="14"/><text x="150" y="72">F(4)</text>
<ellipse class="h" cx="380" cy="72" rx="26" ry="14"/><text x="380" y="72">F(3)</text>
<ellipse class="h" cx="90" cy="122" rx="26" ry="14"/><text x="90" y="122">F(3)</text>
<ellipse class="h" cx="210" cy="122" rx="26" ry="14" style="stroke-dasharray:4 3"/><text x="210" y="122">F(2)</text>
<ellipse class="h" cx="330" cy="122" rx="26" ry="14" style="stroke-dasharray:4 3"/><text x="330" y="122">F(2)</text>
<ellipse class="n" cx="430" cy="122" rx="26" ry="14"/><text x="430" y="122">F(1)</text>
<ellipse class="h" cx="50" cy="172" rx="22" ry="13" style="stroke-dasharray:4 3"/><text x="50" y="172">F(2)</text>
<ellipse class="n" cx="130" cy="172" rx="22" ry="13"/><text x="130" y="172">F(1)</text>
<ellipse class="n" cx="185" cy="172" rx="22" ry="13"/><text x="185" y="172">F(1)</text>
<ellipse class="n" cx="235" cy="172" rx="22" ry="13"/><text x="235" y="172">F(0)</text>
<ellipse class="n" cx="305" cy="172" rx="22" ry="13"/><text x="305" y="172">F(1)</text>
<ellipse class="n" cx="355" cy="172" rx="22" ry="13"/><text x="355" y="172">F(0)</text>
</svg>` },
    math: [
      { tex: R`dp[i][w] = \max\big(dp[i-1][w],\; dp[i-1][w - w_i] + v_i\big)`, explain: R`0/1 배낭 점화식. $w_i, v_i$: i번째 물건의 무게와 가치. 앞 항은 i번째를 넣지 않는 경우, 뒤 항은 넣는 경우($w \ge w_i$일 때만). 상태 수 $nW$ × 상태당 $O(1)$ = $O(nW)$.` },
    ],
    code: R`
from functools import lru_cache

calls = 0
def fib_naive(n):
  global calls
  calls += 1
  return n if n < 2 else fib_naive(n - 1) + fib_naive(n - 2)

fib_naive(25)
print("단순 재귀 호출 수:", calls)                       # 242785

@lru_cache(maxsize=None)                                  # 메모이제이션
def fib_memo(n):
  return n if n < 2 else fib_memo(n - 1) + fib_memo(n - 2)

print(fib_memo(25), "/ 실제 계산 횟수:", fib_memo.cache_info().misses)   # 75025 / 26

def knapsack(items, W):
  """items: (무게, 가치) 목록. dp[w] = 용량 w로 얻을 수 있는 최대 가치"""
  dp = [0] * (W + 1)
  for wt, val in items:
      for w in range(W, wt - 1, -1):   # 큰 용량부터: dp[w-wt]가 아직 '이번 물건 전' 값이어야 함
          dp[w] = max(dp[w], dp[w - wt] + val)
  return dp[W]

print(knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7))   # 9 (무게 3+4)
`,
    links: [
      { to: 'ds-greedy', why: '그리디가 실패하는 문제(일반 동전 거스름)를 DP는 정확히 푼다' },
      { to: 'ds-shortest', why: '벨만-포드와 플로이드-워셜은 DP' },
      { to: 'dl-backprop', why: '중간 그래디언트를 저장해 재사용 — 같은 계산을 반복하지 않는다' },
      { to: 'pl-decorator', why: 'lru_cache는 함수를 감싸 캐시를 추가하는 데코레이터' },
    ],
    quiz: [
      { q: '병합 정렬에 메모이제이션을 적용해도 성능 이득이 거의 없는 이유는?',
        options: ['병합 단계가 O(n)이라 메모로 줄일 수 있는 부분이 전체의 일부뿐이어서', '분할된 부분 문제(서로 다른 구간)가 겹치지 않아 재사용할 결과가 없어서', '정렬 결과는 입력마다 달라 키를 만들 수 없어 메모 조회가 실패해서', '재귀 깊이가 log n뿐이라 메모 없이도 이미 최적이기 때문'], answer: 1,
        explain: 'DP의 이득은 "중복 부분 문제"에서 나온다. 부분 문제가 겹치지 않으면 일반 분할 정복이 맞다.' },
      { q: '1차원 dp 배열로 0/1 배낭을 풀 때 용량 w를 큰 값 → 작은 값 순서로 도는 이유는?',
        options: ['큰 값부터 돌아야 dp[w]가 단조 증가하도록 유지되어 최댓값이 보장되기 때문', '작은 값부터 돌면 이번 물건이 반영된 dp[w−wt]를 다시 써서 같은 물건을 여러 번 넣기 때문', '작은 값부터 돌면 dp[w−wt]가 아직 초기화되지 않은 값이라 음수 인덱스가 생기기 때문', '큰 값부터 돌아야 무게가 큰 물건을 먼저 고려하는 그리디 순서가 지켜지기 때문'], answer: 1,
        explain: '큰 w부터 갱신하면 dp[w-wt]는 아직 "이번 물건을 고려하기 전" 값이다. 작은 것부터 돌면 무한 배낭(물건 중복 허용) 문제가 된다.' },
      { q: '동전 종류가 {1, 3, 4}일 때 6원을 최소 개수로 거슬러 주는 문제에 그리디(큰 동전부터) 대신 DP가 필요한 이유는?',
        options: ['그리디는 4+1+1(3개)을 고르지만 최적은 3+3(2개)이기 때문', '그리디는 1+1+4 순서로 골라 4를 마지막에야 쓰기 때문', '그리디는 6원을 만들 수 없어 실패를 반환하기 때문', '그리디는 3+3(2개)을 고르지만 최적은 4+1+1이기 때문'], answer: 0,
        explain: '그리디는 한 번 고른 것을 되돌리지 않는다. DP는 모든 금액 a에 대해 최적값을 저장하므로 "4를 고르지 않는 경우"도 고려한다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 15장 — 동적 계획법', 'MIT OCW 6.006 — Dynamic Programming (Erik Demaine, SRTBOT 프레임워크)', '『알고리즘 문제 해결 전략』(구종만) 8~9장'],
  },
  {
    id:'ds-greedy', title: '그리디 알고리즘',
    summary: R`매 단계 최선의 선택, <strong>되돌리지 않음</strong>
전체 최적이라는 <strong>증명</strong>이 있을 때만 정답`,
    body: R`
<p>그리디는 DP와 달리 여러 가능성을 저장하지 않는다. 한 번 선택하면 끝이다. 그래서 정답을 보장하려면 다음 두 성질이 필요하다.</p>
<ul>
<li><strong>탐욕 선택 속성</strong>: 지금의 탐욕적 선택을 포함하는 최적해가 존재한다.</li>
<li><strong>최적 부분 구조</strong>: 그 선택 후 남은 문제의 최적해와 합치면 전체 최적해가 된다.</li>
</ul>
<h3>증명 방법: 교환 논증</h3>
<p>"임의의 최적해를 가져와서, 그리디가 고른 것으로 <strong>바꿔도 손해가 없음</strong>"을 보이는 방식이다. 회의실 배정(활동 선택) 문제에서 가장 <strong>빨리 끝나는</strong> 회의를 먼저 고르는 전략을 보자. 어떤 최적해의 첫 회의를 가장 빨리 끝나는 회의로 바꾸면, 끝나는 시간이 같거나 빨라졌으므로 뒤의 회의들과 겹치지 않는다. 개수는 그대로이니 여전히 최적이다. 이 논리를 반복하면 그리디 해가 최적임이 증명된다.</p>
<h3>직관적인 기준이 틀리는 경우</h3>
<p>같은 문제에서 "가장 빨리 <strong>시작하는</strong> 회의"나 "가장 <strong>짧은</strong> 회의"를 먼저 고르는 기준은 반례가 있다(아주 일찍 시작해 하루 종일 하는 회의 하나가 나머지를 모두 막는 경우). 그리디는 "어떤 기준으로 탐욕적인가"가 전부다.</p>
<p>동전 거스름도 마찬가지다. 한국 화폐(10, 50, 100, 500)처럼 큰 단위가 작은 단위의 배수인 체계에서는 큰 동전부터 쓰는 그리디가 최적이지만, {1, 3, 4} 같은 체계에서는 실패한다.</p>
<h3>대표적인 정답 그리디</h3>
<p>최소 신장 트리(크루스칼: 가장 가벼운 간선부터, 사이클이 안 생기면 추가 / 프림), 다익스트라(가장 가까운 미확정 정점부터 확정), 허프만 코딩(가장 드문 두 기호부터 합치기).</p>
<h3>ML 속의 그리디</h3>
<p>결정 트리는 각 노드에서 "지금 불순도를 가장 많이 줄이는 분할"을 고르고 되돌리지 않는다. 전역 최적 트리를 찾는 것은 계산적으로 너무 어려워서 택한 그리디 근사다. LLM이 매 단계 확률이 가장 높은 토큰을 고르는 그리디 디코딩도 전체 문장 확률이 최대인 문장을 보장하지 않으며, 그래서 빔 서치 같은 대안이 있다.</p>`,
    analogy: R`<p>등산할 때 "항상 가장 가파른 오르막으로" 걷는 전략. 산봉우리가 하나뿐인 산이라면 정상에 도착하지만(정답 그리디), 봉우리가 여럿이면 근처의 낮은 봉우리에 갇힐 수 있다. 그리디가 통하는 문제는 "봉우리가 하나뿐임"을 증명할 수 있는 문제다.</p>`,
    diagram: { caption: '활동 선택: 끝나는 시간 순으로 정렬해, 직전에 고른 회의와 겹치지 않는 것을 고른다. 강조된 4개가 선택된다.', svg: R`
<svg viewBox="0 0 520 240" width="520">
<rect class="h" x="68" y="12" width="84" height="12"/>
<rect class="n" x="124" y="30" width="56" height="12"/>
<rect class="n" x="40" y="48" width="168" height="12"/>
<rect class="h" x="180" y="66" width="56" height="12"/>
<rect class="n" x="124" y="84" width="168" height="12"/>
<rect class="n" x="180" y="102" width="112" height="12"/>
<rect class="n" x="208" y="120" width="112" height="12"/>
<rect class="h" x="264" y="138" width="84" height="12"/>
<rect class="n" x="264" y="156" width="112" height="12"/>
<rect class="n" x="96" y="174" width="336" height="12"/>
<rect class="h" x="376" y="192" width="112" height="12"/>
<path class="e d" d="M152,8 V210 M236,8 V210 M348,8 V210"/>
<path class="a" d="M40,218 H500"/>
<text x="40" y="230" class="sm">0</text><text x="152" y="230" class="sm">4</text><text x="264" y="230" class="sm">8</text><text x="376" y="230" class="sm">12</text><text x="488" y="230" class="sm">16</text>
</svg>` },
    code: R`
def select_activities(acts):
  """끝나는 시간이 빠른 순으로 고르면 최대 개수 (교환 논증으로 증명 가능)"""
  chosen, end = [], float("-inf")
  for s, e in sorted(acts, key=lambda a: a[1]):
      if s >= end:
          chosen.append((s, e))
          end = e
  return chosen

acts = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10),
      (8, 11), (8, 12), (2, 14), (12, 16)]
print(select_activities(acts))     # [(1, 4), (5, 7), (8, 11), (12, 16)]

def coins_greedy(amount, coins):
  used = []
  for c in sorted(coins, reverse=True):
      while amount >= c:
          amount -= c
          used.append(c)
  return used

def coins_dp(amount, coins):       # 최소 동전 개수 (정답)
  INF = float("inf")
  dp = [0] + [INF] * amount
  for a in range(1, amount + 1):
      dp[a] = min((dp[a - c] + 1 for c in coins if c <= a), default=INF)
  return dp[amount]

print(coins_greedy(6, [1, 3, 4]), "→ 최적 개수:", coins_dp(6, [1, 3, 4]))          # [4, 1, 1] → 2
print(coins_greedy(760, [10, 50, 100, 500]), "→ 최적 개수:", coins_dp(760, [10, 50, 100, 500]))
`,
    links: [
      { to: 'ds-dp', why: '그리디가 실패하는 문제의 정확한 해법' },
      { to: 'ds-shortest', why: '다익스트라 = 증명된 그리디' },
      { to: 'ml-tree', why: '결정 트리의 분할은 각 노드에서의 그리디 선택' },
      { to: 'ai-llm', why: '그리디 디코딩 vs 빔 서치·샘플링' },
    ],
    quiz: [
      { q: '회의실 배정에서 "가장 빨리 시작하는 회의부터" 고르는 기준이 실패하는 예는?',
        options: ['모든 회의의 길이가 같고 시간이 조금씩 서로 겹칠 때', '0~24시 회의 하나와 그 사이 짧은 회의들이 있을 때', '회의들이 서로 전혀 겹치지 않고 띄엄띄엄 있을 때', '시작 시각이 같은 회의가 여러 개 있을 때'], answer: 1,
        explain: '가장 일찍 시작하는 긴 회의를 고르면 나머지를 전부 놓친다. 끝나는 시간 기준은 "남은 시간을 최대한 많이 남긴다"는 점에서 교환 논증이 성립한다.' },
      { q: '결정 트리 학습이 "그리디"라는 말의 의미는?',
        options: ['학습 데이터 전체를 한 번에 메모리에 올려서 사용한다는 뜻', '노드마다 당장 불순도를 가장 많이 줄이는 분할을 고르고 되돌리지 않음', '가지치기 없이 잎이 순수해질 때까지 깊이를 최대로 키운다는 뜻', '분할 후보를 무작위로 여러 개 뽑아 그중 가장 좋은 것을 고른다는 뜻'], answer: 1,
        explain: '지금은 효과가 작아 보이는 분할이 다음 분할과 결합되면 더 좋을 수 있지만(XOR 같은 상호작용), 그리디는 이를 보지 못한다.' },
      { q: '그리디 알고리즘의 정당성을 보이는 "교환 논증"의 핵심 아이디어는?',
        options: ['그리디가 고른 해와 다른 모든 해를 비교해 그리디가 가장 좋음을 보인다', '최적해의 선택을 그리디의 선택으로 바꿔도 해가 나빠지지 않음을 보인다', '그리디의 각 단계가 부분 문제의 최적해를 표에 저장함을 보인다', '그리디가 실패하는 반례가 존재하지 않을 때까지 입력을 늘려 본다'], answer: 1,
        explain: '그리디 선택을 포함하는 최적해가 항상 존재함을 보이고, 남은 부분 문제에 같은 논리를 반복 적용한다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 16장 — 그리디 알고리즘', 'Kleinberg & Tardos, 『Algorithm Design』 4장 (교환 논증 설명이 특히 좋음)'],
  },
  {
    id:'ds-shortest', title: '최단 경로 알고리즘',
    summary: R`가중치 그래프 최단 거리 3가지 방법
공통 연산: <strong>완화(relaxation)</strong>
차이: 완화 순서·횟수, 음수 간선 허용 여부`,
    body: R`
<h3>공통 연산: 완화</h3>
<p>현재 알고 있는 거리 <code>d[v]</code>보다 "u를 거쳐 가는 길" <code>d[u] + w(u,v)</code>가 짧으면 갱신한다. 처음에는 시작점만 0, 나머지는 ∞. 모든 최단 경로 알고리즘은 완화를 반복하며, 언제 멈춰도 되는지를 보장하는 방식이 다르다.</p>
<h3>다익스트라: 가까운 것부터 확정 (그리디)</h3>
<p>아직 확정되지 않은 정점 중 <code>d</code>가 가장 작은 정점을 꺼내 <strong>확정</strong>하고, 그 이웃을 완화한다. 왜 확정해도 되는가? 다른 경로로 이 정점에 오려면 이미 이 정점보다 먼(또는 같은) 정점을 거쳐야 하고, 간선이 <strong>음수가 아니라면</strong> 거리는 더 늘어나기만 하기 때문이다. 이 논리는 음수 간선이 있으면 깨진다 — 멀리 돌아가다 음수 간선으로 크게 줄어드는 경로가 있을 수 있다.</p>
<p>최솟값 꺼내기를 힙으로 하면 $O((V+E)\log V)$. Python <code>heapq</code>는 우선순위 갱신(decrease-key)이 없으므로, 갱신할 때 새 항목을 그냥 넣고 꺼낼 때 낡은 항목(이미 더 짧은 거리로 처리된 정점)을 건너뛰는 방식을 쓴다.</p>
<h3>벨만-포드: 모든 간선을 V−1번 (DP)</h3>
<p>단순 경로(사이클 없는 경로)는 간선이 최대 $V-1$개다. 모든 간선을 한 번씩 완화하는 것을 $k$번 반복하면 "간선 $k$개 이하로 가는 최단 거리"가 확정된다. 그래서 $V-1$번이면 충분하고, 음수 간선도 처리할 수 있다. $V$번째 반복에서도 거리가 줄어든다면 무한히 줄일 수 있는 <strong>음수 사이클</strong>이 있다는 뜻이다. $O(VE)$.</p>
<h3>플로이드-워셜: 모든 쌍 (DP)</h3>
<p>"정점 $1..k$만 경유할 수 있을 때 i→j 최단 거리"를 $k$를 늘려 가며 계산한다. 3중 루프 $O(V^3)$으로 모든 쌍의 최단 거리를 한 번에 구한다. 정점 수가 수백 개 이하일 때 적합하다.</p>
<table><tr><th>알고리즘</th><th>대상</th><th>음수 간선</th><th>복잡도</th></tr>
<tr><td>BFS</td><td>단일 출발, 가중치 동일</td><td>-</td><td>$O(V+E)$</td></tr>
<tr><td>다익스트라</td><td>단일 출발</td><td>불가</td><td>$O((V+E)\log V)$</td></tr>
<tr><td>벨만-포드</td><td>단일 출발</td><td>가능, 음수 사이클 탐지</td><td>$O(VE)$</td></tr>
<tr><td>플로이드-워셜</td><td>모든 쌍</td><td>가능(음수 사이클 없을 때)</td><td>$O(V^3)$</td></tr></table>
<h3>네트워크 라우팅과의 연결</h3>
<p>인터넷 라우팅 프로토콜 중 OSPF(링크 상태 방식)는 각 라우터가 전체 지도를 알고 다익스트라로 경로를 계산하고, RIP(거리 벡터 방식)는 이웃끼리 거리 정보를 교환하며 벨만-포드 방식으로 갱신한다.</p>`,
    analogy: R`<p>다익스트라는 시작점에서 물을 부어 <strong>물이 퍼져 나가는 순서</strong>대로 도착 시간을 기록하는 것과 같다. 물이 먼저 닿은 곳은 그 시간이 확정이다. 그런데 어떤 수로에 "시간을 되돌리는" 구간(음수 간선)이 있으면, 늦게 출발한 물줄기가 먼저 도착한 기록을 뒤집을 수 있어 이 방식이 무너진다.</p>`,
    diagram: { caption: 'S에서 출발한 최단 경로 트리(강조). 직접 가는 S→A(4)보다 S→B→A(1+2=3)가 짧다. 정점 옆 숫자는 최단 거리.', svg: R`
<svg viewBox="0 0 440 220" width="440">
<path class="a" d="M80.2,101.2 L198,49.6"/><path class="a" d="M240.2,171.2 L358,118.6"/>
<path class="ha" d="M80.2,118.8 L198,170.4"/><path class="ha" d="M220,158 L220,64"/><path class="ha" d="M240.2,48.8 L358,101.4"/>
<circle class="h" cx="60" cy="110" r="22"/><text x="60" y="110">S·0</text>
<circle class="n" cx="220" cy="40" r="22"/><text x="220" y="40">A·3</text>
<circle class="n" cx="220" cy="180" r="22"/><text x="220" y="180">B·1</text>
<circle class="n" cx="380" cy="110" r="22"/><text x="380" y="110">C·4</text>
<text x="128" y="62">4</text><text x="128" y="160">1</text><text x="234" y="110">2</text><text x="312" y="62">1</text><text x="312" y="160">5</text>
</svg>` },
    math: [
      { tex: R`d[v] \leftarrow \min\big(d[v],\; d[u] + w(u, v)\big)`, explain: R`완화.<ul class="defs"><li>$d[v]$: 지금까지 알려진 시작점→v 최단 거리 추정치</li><li>$w(u,v)$: 간선 가중치</li></ul>추정치는 줄어들기만 하고, 실제 최단 거리보다 작아지지는 않는다.` },
      { tex: R`D_k[i][j] = \min\big(D_{k-1}[i][j],\; D_{k-1}[i][k] + D_{k-1}[k][j]\big)`, explain: R`플로이드-워셜 점화식. $D_k$: 정점 $1..k$만 경유 가능할 때의 최단 거리. 정점 $k$를 거치거나 안 거치거나 둘 중 하나다.` },
    ],
    code: R`
import heapq

def dijkstra(graph, src):
  dist = {u: float("inf") for u in graph}
  dist[src] = 0
  pq, done = [(0, src)], set()
  while pq:
      d, u = heapq.heappop(pq)
      if u in done:              # 이미 확정된 정점의 낡은 항목 → 건너뜀
          continue
      done.add(u)                # 꺼낸 순간 거리 확정 (음수 간선이 없다는 가정)
      for v, w in graph[u]:
          if v not in done and d + w < dist[v]:   # 완화
              dist[v] = d + w
              heapq.heappush(pq, (dist[v], v))
  return dist

def bellman_ford(graph, src):
  dist = {u: float("inf") for u in graph}
  dist[src] = 0
  edges = [(u, v, w) for u in graph for v, w in graph[u]]
  for _ in range(len(graph) - 1):          # 최단 경로의 간선 수 ≤ V-1
      for u, v, w in edges:
          if dist[u] + w < dist[v]:
              dist[v] = dist[u] + w
  for u, v, w in edges:                    # 그래도 줄어들면 음수 사이클
      if dist[u] + w < dist[v]:
          raise ValueError("음수 사이클 존재")
  return dist

g = {'S': [('A', 4), ('B', 1)], 'A': [('C', 1)], 'B': [('A', 2), ('C', 5)], 'C': []}
print(dijkstra(g, 'S'))                      # {'S': 0, 'A': 3, 'B': 1, 'C': 4}

neg = {'S': [('A', 1), ('B', 5)], 'A': [], 'B': [('A', -10)]}   # 음수 간선
print("다익스트라:", dijkstra(neg, 'S'))     # A=1 (틀림: A를 너무 일찍 확정)
print("벨만-포드:", bellman_ford(neg, 'S'))  # A=-5 (정답)
`,
    links: [
      { to: 'ds-heap', why: '"가장 가까운 미확정 정점"을 빠르게 꺼내는 우선순위 큐' },
      { to: 'ds-graph', why: '가중치가 없으면 BFS로 충분하다' },
      { to: 'ds-dp', why: '벨만-포드·플로이드-워셜은 DP' },
      { to: 'ds-greedy', why: '다익스트라는 정당성이 증명된 그리디' },
      { to: 'net-routing', why: 'OSPF(링크 상태, 다익스트라)와 RIP(거리 벡터, 벨만-포드)' },
    ],
    quiz: [
      { q: '음수 간선이 있으면 다익스트라가 틀릴 수 있는 이유는?',
        options: ['음수 간선이 있으면 힙에서 우선순위 비교 결과가 뒤바뀌기 때문', '확정한 정점에 음수 간선을 거쳐 더 짧은 경로가 생길 수 있기 때문', '음수 간선이 있으면 그래프에 반드시 음수 사이클이 생기기 때문', '거리 배열을 무한대로 초기화하면 음수와 비교가 불가능하기 때문'], answer: 1,
        explain: '다익스트라는 꺼낸 정점을 다시 보지 않는다. 음수 간선이 있으면 이미 확정한 정점에 더 짧은 경로가 생길 수 있다.' },
      { q: '벨만-포드가 모든 간선 완화를 V−1번 반복하면 충분한 이유는?',
        options: ['한 번 반복할 때마다 정점 하나의 거리가 확정되고 시작 정점은 처음부터 확정이라서', '최단 경로는 간선이 최대 V−1개이고, k번째 반복 후 간선 k개 이하 경로가 확정되어서', '간선이 V−1개면 트리가 되므로 그 이상 반복하면 사이클을 돌게 되어서', '각 반복이 다익스트라 한 번과 같아서 V−1번이면 모든 시작점을 처리해서'], answer: 1,
        explain: '그래서 V번째 반복에서도 거리가 줄어들면 음수 사이클이 있다는 증거가 된다.' },
      { q: 'heapq로 구현한 다익스트라에서 이미 처리한 정점이 힙에서 다시 나오는 이유는?',
        options: ['그래프에 사이클이 있으면 같은 정점이 여러 경로로 다시 방문되기 때문', '거리가 줄 때마다 새 항목을 넣고, 예전(더 긴 거리) 항목이 힙에 남아 있기 때문', 'heapq는 안정 정렬이 아니라 같은 거리의 항목 순서가 뒤바뀌기 때문', '방문 표시를 큐에 넣을 때가 아니라 꺼낼 때 해서 생기는 구현 오류이기 때문'], answer: 1,
        explain: '낡은 항목은 꺼낼 때 건너뛰면 된다(lazy deletion). 힙 크기는 O(E)까지 커질 수 있지만 복잡도는 O(E log V)로 같다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 24~25장', 'Stanford Algorithms (Coursera) — Dijkstra, Bellman-Ford', '『컴퓨터 네트워킹 하향식 접근』(Kurose & Ross) 5장 — 라우팅 알고리즘'],
  },
  {
    id:'ds-trie', title: '트라이와 문자열 탐색',
    summary: R`문자열을 글자 단위로 쪼개 <strong>공통 접두사를 공유</strong>하는 트리
검색·삽입 <strong>O(L)</strong>: 저장된 단어 수와 무관, 단어 길이 L에만 비례
자동완성·사전·라우팅 테이블(최장 접두사 일치)`,
    body: R`
<p>트라이(trie, retrieval에서 온 이름)는 문자열 집합을 저장하는 트리다. 노드 하나가 "지금까지 읽은 접두사"를 나타내고, 간선 하나가 글자 하나다. "tea"와 "ten"은 "te"까지 같은 경로를 쓰고 마지막 글자에서만 갈라진다.</p>
<h3>구조</h3>
<ul>
<li>루트는 빈 문자열이다. 루트에서 내려가며 만나는 글자를 이으면 접두사가 된다.</li>
<li>각 노드는 <strong>자식 표</strong>(글자 → 자식 노드)와 <strong>단어 끝 표시</strong>(<code>is_end</code>)를 가진다.</li>
<li>단어 끝 표시가 필요한 이유: "ten"만 저장해도 "te" 경로는 존재한다. 경로가 있다는 것만으로는 "te"가 저장된 단어인지 알 수 없다.</li>
</ul>
<h3>연산과 복잡도</h3>
<p>삽입·검색·접두사 확인 모두 루트에서 글자 하나씩 자식으로 내려가면 끝나므로 $O(L)$이다. 단어가 1개든 100만 개든 같다. 비교해 보면 다음과 같다.</p>
<table><tr><th>방법</th><th>정확히 일치</th><th>접두사로 시작하는 단어 모두</th></tr>
<tr><td>해시 테이블</td><td>$O(L)$ (해시 계산)</td><td>전부 훑어야 함 $O(nL)$</td></tr>
<tr><td>정렬 리스트 + 이진 탐색</td><td>$O(L \log n)$</td><td>시작 위치를 찾고 이어서 읽기</td></tr>
<tr><td>트라이</td><td>$O(L)$</td><td>접두사 노드까지 $O(L)$ + 그 아래만 훑기</td></tr></table>
<p>대가는 메모리다. 노드마다 자식 표를 두므로 같은 문자열을 리스트에 넣을 때보다 훨씬 많은 공간을 쓴다. 자식 표를 크기 26 배열로 두면 빠르지만 대부분 비어 있고, 딕셔너리로 두면 공간은 줄지만 조회가 조금 느리다. 자식이 하나뿐인 노드가 길게 이어지는 경로를 한 간선으로 합친 것을 <strong>압축 트라이</strong>(radix tree)라고 한다.</p>
<h3>문자열 탐색: 긴 텍스트에서 패턴 찾기</h3>
<p>트라이가 "많은 단어 중 어느 것인가"를 푼다면, 문자열 탐색은 "긴 텍스트 안 어디에 패턴이 있는가"를 푼다. 텍스트 길이 $n$, 패턴 길이 $m$일 때 모든 시작 위치에서 비교하는 단순한 방법은 최악 $O(nm)$이다.</p>
<ul>
<li><strong>KMP</strong>: 비교가 어긋났을 때 "이미 맞은 부분 중 패턴의 앞부분과 같은 가장 긴 접미사"만큼은 다시 비교하지 않는다. 이 길이를 미리 계산한 표(실패 함수)를 쓰면 $O(n + m)$이다.</li>
<li><strong>아호-코라식</strong>: 패턴 여러 개를 트라이에 넣고 KMP의 실패 링크를 붙인 것이다. 텍스트를 한 번만 읽으며 모든 패턴을 동시에 찾는다. 금칙어 필터, 침입 탐지 시스템의 시그니처 매칭이 이 방식이다.</li>
</ul>
<h3>실무 속의 트라이</h3>
<p>라우터는 목적지 IP를 라우팅 테이블에서 찾을 때 <strong>가장 길게 일치하는 접두사</strong>를 고른다(10.0.0.0/8보다 10.1.0.0/16이 우선). 주소 비트를 따라 트라이를 내려가며 마지막으로 만난 접두사를 기억하면 된다. 검색창 자동완성, 맞춤법 사전, 토크나이저가 어휘에서 가장 긴 토큰을 찾는 과정도 같은 구조를 쓴다.</p>`,
    analogy: R`<p>국어사전의 손톱 색인. "ㅌ" 탭을 펼치고, 그 안에서 "테" 쪽을 펼치고, 다시 "텐"으로 좁혀 간다. 사전에 단어가 몇만 개 있든 찾는 데 걸리는 단계 수는 단어의 글자 수만큼이다. "테"로 시작하는 단어를 모두 보고 싶다면 그 구역만 넘겨 보면 된다.</p>`,
    diagram: { caption: '"to", "tea", "ten", "in", "inn"을 저장한 트라이. 노드 안 글자는 들어온 간선의 글자이고, 강조된 노드가 단어의 끝이다. "in"과 "inn"처럼 한 단어가 다른 단어의 접두사여도 된다.', svg: R`
<svg viewBox="0 0 520 240" width="520">
<path class="e" d="M260,25 L170,80 M260,25 L380,80 M170,80 L110,140 M170,80 L220,140 M220,140 L180,200 M220,140 L260,200 M380,80 L380,140 M380,140 L380,200"/>
<circle class="n" cx="260" cy="25" r="16"/><text x="260" y="25" class="sm">루트</text>
<circle class="n" cx="170" cy="80" r="16"/><text x="170" y="80">t</text>
<circle class="n" cx="380" cy="80" r="16"/><text x="380" y="80">i</text>
<circle class="h" cx="110" cy="140" r="16"/><text x="110" y="140">o</text>
<circle class="n" cx="220" cy="140" r="16"/><text x="220" y="140">e</text>
<circle class="h" cx="180" cy="200" r="16"/><text x="180" y="200">a</text>
<circle class="h" cx="260" cy="200" r="16"/><text x="260" y="200">n</text>
<circle class="h" cx="380" cy="140" r="16"/><text x="380" y="140">n</text>
<circle class="h" cx="380" cy="200" r="16"/><text x="380" y="200">n</text>
<text x="110" y="168" class="sm">to</text><text x="180" y="228" class="sm">tea</text><text x="260" y="228" class="sm">ten</text>
<text x="402" y="140" class="st sm">in</text><text x="402" y="200" class="st sm">inn</text>
<text x="244" y="140" class="st sm">te (단어 아님)</text>
</svg>` },
    code: R`
class TrieNode:
  def __init__(self):
      self.children = {}        # 글자 → 자식 노드
      self.is_end = False       # 여기서 끝나는 단어가 있는가

class Trie:
  def __init__(self):
      self.root = TrieNode()

  def insert(self, word):
      node = self.root
      for ch in word:
          node = node.children.setdefault(ch, TrieNode())
      node.is_end = True

  def _walk(self, s):           # s를 따라 내려간 노드 (없으면 None)
      node = self.root
      for ch in s:
          if ch not in node.children:
              return None
          node = node.children[ch]
      return node

  def search(self, word):
      node = self._walk(word)
      return node is not None and node.is_end

  def starts_with(self, prefix):  # 접두사 노드 아래만 훑는다
      node, out = self._walk(prefix), []
      def dfs(n, path):
          if n.is_end:
              out.append(path)
          for ch in sorted(n.children):
              dfs(n.children[ch], path + ch)
      if node:
          dfs(node, prefix)
      return out

t = Trie()
for w in ["to", "tea", "ten", "in", "inn"]:
  t.insert(w)
print(t.search("ten"), t.search("te"))   # True False (te는 경로만 있고 단어 끝이 아님)
print(t.starts_with("te"))               # ['tea', 'ten']
print(t.starts_with("i"))                # ['in', 'inn']

def lcp_route(table, ip_bits):           # 최장 접두사 일치: 라우팅 테이블 조회
  rt = Trie()
  for prefix in table:
      rt.insert(prefix)
  node, best, path = rt.root, None, ""
  for b in ip_bits:
      if b not in node.children:
          break
      node, path = node.children[b], path + b
      if node.is_end:
          best = path                  # 더 긴 일치를 찾을 때마다 갱신
  return table.get(best, "기본 경로")

table = {"10": "A", "1011": "B", "0": "C"}
print(lcp_route(table, "10110010"), lcp_route(table, "10010000"), lcp_route(table, "11000000"))  # B A 기본 경로
`,
    links: [
      { to: 'ds-hash', why: '정확한 일치는 해시도 O(L), 접두사 질의는 트라이만 효율적' },
      { to: 'ds-tree', why: '트라이도 트리: 키를 노드에 두지 않고 경로에 나눠 담는다' },
      { to: 'net-routing', why: '라우팅 테이블의 최장 접두사 일치' },
      { to: 'ai-tokenizer', why: '어휘에서 가장 긴 토큰 찾기' },
    ],
    quiz: [
      { q: '트라이에서 길이 L인 단어를 검색하는 시간이 저장된 단어 수 n과 무관한 이유는?',
        options: ['모든 단어를 해시해 같은 버킷에 모아 두고 한 번에 꺼내 찾기 때문', '루트에서 글자 하나씩 자식으로 내려가므로 L번만 이동하면 되어서', '단어를 길이순으로 정렬해 두고 이진 탐색으로 위치를 찾기 때문', '노드마다 그 아래 모든 단어 목록을 저장해 바로 꺼내기 때문'], answer: 1,
        explain: '검색 경로는 단어의 글자 수만큼만 길다. 다른 단어가 얼마나 많든 그 경로 밖에 있으므로 보지 않는다.' },
      { q: '"app"로 시작하는 단어를 모두 찾을 때 해시 테이블보다 트라이가 유리한 이유는?',
        options: ['해시 테이블은 문자열을 키로 저장하지 못해 숫자로 바꿔야 해서', '트라이는 접두사 노드 아래만 보면 되지만 해시는 키 전체가 필요해서', '트라이는 충돌이 생기면 자동으로 접두사 순으로 정렬해 주어서', '해시 테이블은 원소가 많아지면 검색이 항상 O(n)으로 느려지기 때문'], answer: 1,
        explain: '해시 함수는 비슷한 문자열을 흩어 놓는 것이 목적이라 "app…" 키들이 테이블 곳곳에 퍼진다. 트라이에서는 같은 접두사를 가진 단어가 한 서브트리에 모여 있다.' },
      { q: '"ten"만 저장된 트라이에서 "te"를 검색하면 False가 나와야 한다. 이를 가능하게 하는 것은?',
        options: ['노드마다 깊이를 저장해 두고 단말 노드에 도착했을 때만 True를 돌려주는 규칙', '노드의 단어 끝 표시(is_end)로 경로와 저장된 단어를 구분하는 것', '자식 표를 크기 26 배열로 두어 빈 칸으로 끝을 알아내는 방식', '삽입할 때 단어의 모든 접두사를 별도의 해시 집합에 함께 넣는 것'], answer: 1,
        explain: '"te"에 해당하는 노드는 "ten"을 넣을 때 만들어졌지만 is_end가 False다. "in"과 "inn"처럼 단어 끝이 단말이 아닌 경우도 있으므로 "단말이면 단어"라는 규칙도 쓸 수 없다.' },
    ],
    resources: ['『Algorithms』(Sedgewick & Wayne) 5.2절 — Tries', '『Introduction to Algorithms』(CLRS) 32장 — 문자열 매칭(KMP)'],
  },
  {
    id:'ds-mst', title: '최소 신장 트리와 유니온-파인드',
    summary: R`모든 정점을 잇는 트리 중 <strong>간선 가중치 합이 최소</strong>인 것 (간선 V−1개)
크루스칼: 가벼운 간선부터, <strong>사이클이 생기면 버림</strong> → 유니온-파인드로 판별
프림: 지금 트리에서 바깥으로 뻗는 가장 가벼운 간선을 하나씩 추가 → 힙`,
    body: R`
<p>도시 여러 곳을 광케이블로 모두 연결하되 공사비 합을 최소로 하고 싶다. 모든 도시가 연결되기만 하면 되므로 사이클은 낭비다. 사이클 없이 모든 정점을 잇는 부분 그래프를 <strong>신장 트리</strong>(spanning tree)라 하고, 정점이 $V$개면 간선은 정확히 $V-1$개다. 그중 가중치 합이 가장 작은 것이 <strong>최소 신장 트리</strong>(MST)다.</p>
<h3>왜 그리디가 통하는가: 컷 속성</h3>
<p>정점을 아무렇게나 두 그룹으로 나눈다(컷). 두 그룹을 잇는 간선 중 가장 가벼운 간선은 어떤 MST에 반드시 들어 있다. 그 간선이 빠진 MST가 있다고 해도, 그 간선을 넣고 같은 컷을 건너는 다른(더 무거운) 간선을 빼면 여전히 신장 트리이고 합은 같거나 작아진다. 그리디의 교환 논증이다. 크루스칼과 프림은 이 속성을 서로 다른 순서로 적용한다.</p>
<h3>크루스칼: 간선 중심</h3>
<ol>
<li>모든 간선을 가중치 오름차순으로 정렬한다.</li>
<li>차례로 보면서, 두 끝 정점이 아직 다른 덩어리에 있으면 추가하고 같은 덩어리면 버린다(이으면 사이클).</li>
<li>간선이 $V-1$개가 되면 끝난다.</li>
</ol>
<p>정렬이 $O(E \log E)$로 전체 비용을 결정한다. "두 정점이 같은 덩어리인가"를 빠르게 답하는 자료구조가 유니온-파인드다.</p>
<h3>유니온-파인드 (서로소 집합)</h3>
<ul>
<li>각 원소가 부모를 가리키는 배열 하나로 여러 트리(집합)를 표현한다. 루트가 그 집합의 대표다.</li>
<li><code>find(x)</code>: 부모를 따라 올라가 루트를 찾는다. 두 원소의 루트가 같으면 같은 집합이다.</li>
<li><code>union(a, b)</code>: 두 루트 중 하나를 다른 루트 아래에 붙인다.</li>
<li><strong>경로 압축</strong>: find 중에 지나친 노드들이 루트를 직접 가리키게 바꾼다. <strong>랭크(또는 크기) 기준 합치기</strong>: 낮은 트리를 높은 트리 아래에 붙인다. 둘을 함께 쓰면 연산 하나가 사실상 상수 시간이다(아커만 함수의 역함수 $\alpha(n)$, 현실적인 $n$에서 4 이하).</li>
</ul>
<h3>프림: 정점 중심</h3>
<p>시작 정점 하나로 된 트리에서 출발해, 트리 안과 밖을 잇는 간선 중 가장 가벼운 것을 골라 바깥 정점을 하나씩 트리에 넣는다. 매번 "트리와 바깥 사이" 컷에 컷 속성을 적용하는 셈이다. 후보 간선을 힙에 넣으면 $O(E \log V)$다. 간선이 많은 밀집 그래프에서는 프림, 간선이 적은 희소 그래프에서는 크루스칼이 보통 편하다.</p>
<h3>다익스트라와 헷갈리지 않기</h3>
<p>프림과 다익스트라는 코드 모양이 거의 같다. 차이는 힙에 넣는 값이다. 프림은 "트리까지 간선 하나의 무게", 다익스트라는 "시작점부터의 누적 거리"를 쓴다. 그래서 MST 위의 두 정점 사이 경로가 원래 그래프의 최단 경로라는 보장은 없다.</p>
<h3>다른 분야와의 연결</h3>
<p>MST에서 가장 무거운 간선 $k-1$개를 끊으면 정점들이 $k$개 덩어리로 나뉜다. 이것이 단일 연결(single linkage) 계층적 군집과 같은 결과다. 유니온-파인드는 네트워크에서 두 노드가 연결되어 있는지, 이미지에서 붙어 있는 픽셀 영역이 몇 개인지 세는 데도 쓰인다.</p>`,
    analogy: R`<p>유니온-파인드는 회사 조직도와 같다. 두 사람이 같은 회사 소속인지 알려면 각자 상사를 따라 올라가 대표이사가 같은지 보면 된다. 두 회사가 합병하면 한쪽 대표가 다른 쪽 대표 밑으로 들어간다. 경로 압축은 한 번 대표를 찾아간 직원이 그 뒤로는 중간 관리자를 건너뛰고 대표에게 직접 보고하게 바꾸는 것이다.</p>`,
    diagram: { caption: '크루스칼 순서: D–E(1) → A–C(2) → B–C(3) → C–D(4) → D–F(5). 남은 간선 B–D(6), E–F(6), A–B(7), C–E(8)는 모두 같은 덩어리 안의 두 정점을 이어 사이클을 만드므로 버린다. 강조된 간선이 MST, 합 15.', svg: R`
<svg viewBox="0 0 540 210" width="540">
<path class="e" d="M70,50 L70,180 M70,180 L350,180 M210,115 L350,50 M350,50 L480,115"/>
<path class="he" d="M70,50 L210,115 M70,180 L210,115 M210,115 L350,180 M350,50 L350,180 M350,180 L480,115"/>
<circle class="n" cx="70" cy="50" r="18"/><text x="70" y="50">A</text>
<circle class="n" cx="70" cy="180" r="18"/><text x="70" y="180">B</text>
<circle class="n" cx="210" cy="115" r="18"/><text x="210" y="115">C</text>
<circle class="n" cx="350" cy="50" r="18"/><text x="350" y="50">E</text>
<circle class="n" cx="350" cy="180" r="18"/><text x="350" y="180">D</text>
<circle class="n" cx="480" cy="115" r="18"/><text x="480" y="115">F</text>
<text x="56" y="115">7</text><text x="148" y="70">2</text><text x="148" y="162">3</text><text x="210" y="196">6</text>
<text x="272" y="162">4</text><text x="272" y="70">8</text><text x="364" y="115">1</text><text x="424" y="162">5</text><text x="424" y="70">6</text>
</svg>` },
    code: R`
import heapq

class UnionFind:
  def __init__(self, items):
      self.parent = {x: x for x in items}
      self.rank = {x: 0 for x in items}

  def find(self, x):
      if self.parent[x] != x:
          self.parent[x] = self.find(self.parent[x])   # 경로 압축: 루트를 직접 가리키게
      return self.parent[x]

  def union(self, a, b):
      ra, rb = self.find(a), self.find(b)
      if ra == rb:
          return False                 # 이미 같은 덩어리 → 이으면 사이클
      if self.rank[ra] < self.rank[rb]:
          ra, rb = rb, ra
      self.parent[rb] = ra             # 낮은 트리를 높은 트리 아래에 (랭크 기준 합치기)
      if self.rank[ra] == self.rank[rb]:
          self.rank[ra] += 1
      return True

def kruskal(vertices, edges):
  uf, mst = UnionFind(vertices), []
  for w, u, v in sorted(edges):        # 가벼운 간선부터
      if uf.union(u, v):
          mst.append((u, v, w))
  return mst

def prim(graph, start):
  seen, mst = {start}, []
  pq = [(w, start, v) for v, w in graph[start]]
  heapq.heapify(pq)
  while pq:
      w, u, v = heapq.heappop(pq)      # 트리에서 바깥으로 뻗는 가장 가벼운 간선
      if v in seen:
          continue
      seen.add(v)
      mst.append((u, v, w))
      for x, wx in graph[v]:
          if x not in seen:
              heapq.heappush(pq, (wx, v, x))
  return mst

edges = [(7, 'A', 'B'), (2, 'A', 'C'), (3, 'B', 'C'), (6, 'B', 'D'), (4, 'C', 'D'),
       (8, 'C', 'E'), (1, 'D', 'E'), (5, 'D', 'F'), (6, 'E', 'F')]
graph = {x: [] for x in "ABCDEF"}
for w, u, v in edges:
  graph[u].append((v, w))
  graph[v].append((u, w))

k = kruskal("ABCDEF", edges)
p = prim(graph, 'A')
print("크루스칼:", k, "합", sum(w for *_, w in k))
print("프림:    ", p, "합", sum(w for *_, w in p))   # 고르는 순서는 달라도 합은 같다
`,
    links: [
      { to: 'ds-greedy', why: '컷 속성 = MST에서의 교환 논증' },
      { to: 'ds-graph', why: '그래프 표현과 연결 요소' },
      { to: 'ds-heap', why: '프림이 가장 가벼운 후보 간선을 꺼내는 방법' },
      { to: 'ds-shortest', why: '프림과 다익스트라는 힙에 넣는 값만 다르다' },
      { to: 'ml-clustering', why: 'MST의 무거운 간선을 끊으면 단일 연결 군집' },
    ],
    quiz: [
      { q: '크루스칼에서 간선 (u, v)를 넣기 전에 find(u) == find(v)인지 확인하는 이유는?',
        options: ['두 정점의 차수가 같으면 트리의 균형이 깨져 버리기 때문', '같은 덩어리 안의 두 정점을 이으면 사이클이 생기기 때문', '같은 간선이 결과에 두 번 들어가는 것을 막기 위해서', '더 가벼운 간선이 아직 남았는지 알아보기 위해서'], answer: 1,
        explain: '루트가 같다는 것은 이미 다른 경로로 연결되어 있다는 뜻이다. 거기에 간선을 더하면 사이클이 되고, 트리는 사이클이 없어야 한다.' },
      { q: '유니온-파인드의 경로 압축이 하는 일은?',
        options: ['union할 때 두 집합의 원소를 모두 한 배열로 옮겨 합친다', '집합 크기를 세어 큰 트리를 작은 트리 아래에 붙인다', 'find 중 지나친 노드가 루트를 직접 가리키게 바꾼다', '루트에서 모든 자식까지의 경로를 해시에 저장해 둔다'], answer: 2,
        explain: '한 번 찾은 루트를 경로 위 노드들에 바로 연결해 두면 다음 find가 짧아진다. 크기 기준 합치기는 반대로 작은 트리를 큰 트리 아래에 붙인다.' },
      { q: 'MST 위에서 두 정점 사이의 경로에 대해 옳은 것은?',
        options: ['항상 원래 그래프에서 두 정점 사이의 최단 경로와 같다', '원래 그래프의 최단 경로보다 길 수 있다', '항상 간선 수가 가장 적은 경로와 같다', '경로 위 간선 가중치가 항상 오름차순이다'], answer: 1,
        explain: 'MST는 전체 합을 최소로 할 뿐 특정 두 정점 사이 거리는 고려하지 않는다. 예: 삼각형 A–B 2, B–C 2, A–C 3에서 MST는 A–B, B–C이고 A→C 경로 길이는 4로 직접 간선 3보다 길다.' },
    ],
    resources: ['『Introduction to Algorithms』(CLRS) 21장(서로소 집합), 23장(MST)', 'Kleinberg & Tardos, 『Algorithm Design』 4.5~4.6절'],
  },
  {
    id:'ds-twopointer', title: '투 포인터·슬라이딩 윈도우·누적합',
    summary: R`정렬이나 연속 구간의 성질을 이용해 <strong>O(n²) → O(n)</strong>
투 포인터: 조건을 보고 두 위치 중 <strong>한쪽만</strong> 움직여 후보를 하나씩 제거
슬라이딩 윈도우: 구간을 밀며 <strong>들어온 것만 더하고 나간 것만 뺌</strong>
누적합: 미리 더해 두면 임의 구간 합이 <strong>뺄셈 한 번</strong>`,
    body: R`
<p>세 기법 모두 "모든 쌍·모든 구간을 다 보는" $O(n^2)$ 풀이에서, 이미 계산한 것을 버리지 않고 재사용해 $O(n)$으로 줄이는 방법이다. 핵심은 <strong>왜 건너뛴 후보 중에 답이 없는지</strong>를 설명할 수 있느냐다.</p>
<h3>투 포인터: 정렬된 배열에서 합이 target인 쌍</h3>
<p>왼쪽 끝 <code>l</code>과 오른쪽 끝 <code>r</code>에서 시작한다. <code>a[l] + a[r]</code>이 target보다 작으면 <code>l</code>을 오른쪽으로, 크면 <code>r</code>을 왼쪽으로 옮긴다.</p>
<ul>
<li>합이 작을 때: <code>a[l]</code>과 짝지을 수 있는 가장 큰 수가 <code>a[r]</code>인데도 모자란다. 그러니 <code>a[l]</code>은 어떤 짝으로도 답이 될 수 없어 버려도 된다.</li>
<li>합이 클 때: 같은 논리로 <code>a[r]</code>은 가장 작은 짝과도 넘치므로 버린다.</li>
<li>매 단계 후보 하나가 사라지므로 최대 $n$번이면 끝난다.</li>
</ul>
<p>같은 방향으로 움직이는 투 포인터도 있다. 정렬된 두 리스트를 병합(병합 정렬의 merge 단계)하거나, 정렬된 배열에서 중복을 제자리에서 지울 때 쓴다.</p>
<h3>슬라이딩 윈도우</h3>
<p><strong>고정 길이</strong>: 길이 $k$ 구간 합의 최댓값. 구간을 한 칸 밀면 새로 들어온 원소를 더하고 빠진 원소를 빼면 되므로, 매번 $k$개를 다시 더할 필요가 없다.</p>
<p><strong>가변 길이</strong>: 양수 배열에서 합이 $S$ 이상인 가장 짧은 구간. 오른쪽 끝 <code>r</code>을 늘리다가 조건을 만족하면, 만족하는 동안 왼쪽 끝 <code>l</code>을 줄여 본다. <code>l</code>과 <code>r</code>이 각각 최대 $n$번 움직이므로 전체 $O(n)$이다. 이 방법은 "구간을 넓히면 합이 늘고 좁히면 준다"는 단조성에 기대므로, <strong>음수가 섞이면 쓸 수 없다</strong>.</p>
<p>문자열에서 "중복 문자가 없는 가장 긴 부분 문자열"도 같은 틀이다. 윈도우 안 문자를 집합으로 관리하고, 중복이 생기면 <code>l</code>을 당긴다.</p>
<h3>누적합</h3>
<p>$P_k = a_0 + a_1 + \dots + a_{k-1}$을 미리 계산해 두면($P_0 = 0$) 구간 $[l, r)$의 합은 $P_r - P_l$이다. 준비에 $O(n)$, 질의마다 $O(1)$이다. 2차원 표에서도 같은 원리로 직사각형 합을 네 값의 덧셈·뺄셈으로 구한다.</p>
<p>음수가 섞인 배열에서 "합이 $k$인 구간의 개수"는 슬라이딩 윈도우로 못 풀지만 누적합으로 풀린다. $P_r - P_l = k$, 즉 $P_l = P_r - k$이므로 지금까지 나온 누적합 값의 빈도를 해시에 세어 두면 된다.</p>
<h3>실무 속의 쓰임</h3>
<p>시계열의 이동 평균은 고정 길이 슬라이딩 윈도우다. API 요청 제한(rate limiting)의 "최근 1분간 요청 수"도 윈도우를 밀며 센다. numpy의 <code>cumsum</code>은 누적합이고, 이미지 처리의 적분 영상(integral image)은 2차원 누적합이다.</p>`,
    analogy: R`<p>기차 창밖으로 전봇대 세 개씩만 보이는 창문을 떠올려 보자. 기차가 한 칸 나아가면 창문 오른쪽에 새 전봇대 하나가 들어오고 왼쪽에서 하나가 사라진다. 창문 안 전봇대를 매번 처음부터 셀 필요 없이, 들어온 것과 나간 것만 반영하면 된다.</p>`,
    diagram: { caption: '길이 3 윈도우를 한 칸 밀 때: 이전 합 8에서 나간 2를 빼고 들어온 1을 더한다. 매번 세 개를 다시 더하지 않는다.', svg: R`
<svg viewBox="0 0 520 200" width="520">
<text x="85" y="18" class="sm">0</text><text x="135" y="18" class="sm">1</text><text x="185" y="18" class="sm">2</text><text x="235" y="18" class="sm">3</text><text x="285" y="18" class="sm">4</text><text x="335" y="18" class="sm">5</text>
<rect class="h" x="60" y="28" width="50" height="34"/><rect class="h" x="110" y="28" width="50" height="34"/><rect class="h" x="160" y="28" width="50" height="34"/>
<rect class="n" x="210" y="28" width="50" height="34"/><rect class="n" x="260" y="28" width="50" height="34"/><rect class="n" x="310" y="28" width="50" height="34"/>
<text x="85" y="45">2</text><text x="135" y="45">1</text><text x="185" y="45">5</text><text x="235" y="45">1</text><text x="285" y="45">3</text><text x="335" y="45">2</text>
<text x="380" y="45" class="st sm">2 + 1 + 5 = 8</text>
<rect class="n" x="60" y="108" width="50" height="34"/><rect class="h" x="110" y="108" width="50" height="34"/><rect class="h" x="160" y="108" width="50" height="34"/>
<rect class="h" x="210" y="108" width="50" height="34"/><rect class="n" x="260" y="108" width="50" height="34"/><rect class="n" x="310" y="108" width="50" height="34"/>
<text x="85" y="125">2</text><text x="135" y="125">1</text><text x="185" y="125">5</text><text x="235" y="125">1</text><text x="285" y="125">3</text><text x="335" y="125">2</text>
<text x="380" y="125" class="st sm">8 − 2 + 1 = 7</text>
<path class="a" d="M85,144 V164"/><text x="85" y="178" class="sm">나감: 뺀다</text>
<path class="ha" d="M235,144 V164"/><text x="235" y="178" class="sm">들어옴: 더한다</text>
</svg>` },
    math: [
      { tex: R`\sum_{i=l}^{r-1} a_i = P_r - P_l, \qquad P_k = \sum_{i=0}^{k-1} a_i,\; P_0 = 0`, explain: R`누적합으로 구간 합 구하기.<ul class="defs"><li>$P_k$: 앞에서부터 $k$개를 더한 값</li><li>$[l, r)$: $l$부터 $r-1$까지 (파이썬 슬라이스 <code>a[l:r]</code>와 같은 범위)</li></ul>$P_r$은 $a_0 \dots a_{r-1}$, $P_l$은 $a_0 \dots a_{l-1}$이므로 빼면 앞부분이 지워진다.` },
    ],
    code: R`
import random
from itertools import accumulate

def pair_sum(a, target):                 # a는 정렬되어 있다
  l, r = 0, len(a) - 1
  while l < r:
      s = a[l] + a[r]
      if s == target:
          return a[l], a[r]
      if s < target:
          l += 1                       # a[l]은 가장 큰 짝과도 모자람 → 버린다
      else:
          r -= 1                       # a[r]은 가장 작은 짝과도 넘침 → 버린다
  return None

def max_window(a, k):                    # 길이 k 구간 합의 최댓값
  s = best = sum(a[:k])
  for i in range(k, len(a)):
      s += a[i] - a[i - k]             # 들어온 것 더하고 나간 것 뺀다
      best = max(best, s)
  return best

def min_len_at_least(a, S):              # 합이 S 이상인 가장 짧은 구간 (원소는 양수)
  l = s = 0
  best = float("inf")
  for r, x in enumerate(a):
      s += x
      while s >= S:                    # 조건을 만족하는 동안 왼쪽을 줄여 본다
          best = min(best, r - l + 1)
          s -= a[l]
          l += 1
  return best if best != float("inf") else 0

def count_sum_k(a, k):                   # 합이 k인 부분 배열 수 (음수 허용): 누적합 + 해시
  seen, P, cnt = {0: 1}, 0, 0
  for x in a:
      P += x
      cnt += seen.get(P - k, 0)        # P_r - P_l = k 인 l의 개수
      seen[P] = seen.get(P, 0) + 1
  return cnt

a = [2, 1, 5, 1, 3, 2]
print(max_window(a, 3), min_len_at_least(a, 8))    # 9 3
P = [0] + list(accumulate(a))
print("a[1:4] 합 =", P[4] - P[1])                  # 1 + 5 + 1 = 7

for _ in range(300):                     # 무작위 입력으로 O(n²) 정답과 비교
  b = [random.randint(-5, 9) for _ in range(random.randint(1, 15))]
  brute = sum(sum(b[i:j]) == 4 for i in range(len(b)) for j in range(i + 1, len(b) + 1))
  assert count_sum_k(b, 4) == brute
  c = sorted(b)
  t = random.randint(-6, 14)
  has = any(c[i] + c[j] == t for i in range(len(c)) for j in range(i + 1, len(c)))
  assert (pair_sum(c, t) is not None) == has
print("무작위 300회 검증 통과")
`,
    links: [
      { to: 'ds-array', why: '연속 메모리와 인덱스 접근이 기법의 바탕' },
      { to: 'ds-sort', why: '투 포인터는 정렬된 입력이 전제, 병합 정렬의 merge도 투 포인터' },
      { to: 'ds-hash', why: '음수가 섞인 구간 합 문제는 누적합 + 해시' },
      { to: 'ds-complexity', why: 'O(n²)과 O(n)의 차이가 실제로 체감되는 곳' },
    ],
    quiz: [
      { q: '정렬된 배열의 투 포인터에서 a[l] + a[r] < target일 때 l을 늘려도 답을 놓치지 않는 이유는?',
        options: ['r을 줄이면 합이 커져서 target에 더 빨리 다가갈 수 있기 때문', 'a[l]은 남은 가장 큰 수와 더해도 모자라 답이 될 수 없어서', 'l을 늘리면 탐색 범위가 매번 절반씩 줄어들기 때문', 'a[l]은 이전 단계에서 모든 원소와 이미 비교되었기 때문'], answer: 1,
        explain: 'a[r]은 아직 남은 후보 중 가장 크다. 그 수와 더해도 target에 못 미치면 a[l]과 짝이 되는 수는 없다. 그래서 a[l]을 후보에서 지운다.' },
      { q: '합이 S 이상인 가장 짧은 구간을 찾는 가변 슬라이딩 윈도우가 음수가 섞인 배열에서 틀리는 이유는?',
        options: ['음수가 있으면 합이 오버플로되어 크기 비교 결과가 틀어지기 때문', '음수 원소는 윈도우에 들어올 때 두 번 더해지기 때문', '구간을 좁히면 합이 준다는 성질이 깨져 l을 옮길 근거가 없어서', '음수가 있으면 길이 0인 답이 생겨 반복문이 끝나지 않아서'], answer: 2,
        explain: '왼쪽 원소가 음수면 그것을 빼는 순간 합이 오히려 커진다. "조건을 만족하는 동안만 왼쪽을 줄인다"는 판단이 성립하지 않으므로, 이런 문제는 누적합과 다른 자료구조로 푼다.' },
      { q: 'P[k] = a[0] + … + a[k−1] (P[0] = 0)일 때 a[2]부터 a[5]까지의 합은?',
        options: ['P[5] − P[2]', 'P[6] − P[2]', 'P[6] − P[1]', 'P[5] − P[1]'], answer: 1,
        explain: 'P[6]은 a[0]~a[5], P[2]는 a[0]~a[1]의 합이다. 빼면 a[2]~a[5]만 남는다.' },
    ],
    resources: ['『Algorithms』(Sedgewick & Wayne) 2.2절 — 병합(merge)', 'LeetCode 학습 카드 "Two Pointers", "Sliding Window"'],
  },
  {
    id:'ds-backtrack', title: '완전탐색과 백트래킹',
    summary: R`완전탐색: 가능한 후보를 <strong>빠짐없이</strong> 시도 → 정답 보장, 대신 경우의 수만큼 느림
백트래킹: 선택의 트리를 DFS로 내려가다 <strong>가망 없는 가지는 잘라냄</strong>
템플릿: 선택 → 재귀 → <strong>선택 취소</strong>`,
    body: R`
<p>더 똑똑한 방법이 떠오르지 않을 때 가장 먼저 할 일은 "모든 경우를 다 해 보면 몇 가지인가"를 세는 것이다. 그 수가 충분히 작으면 완전탐색이 가장 단순하고 확실한 정답이다.</p>
<h3>경우의 수로 판단하기</h3>
<table><tr><th>탐색 대상</th><th>경우의 수</th><th>현실적인 n (파이썬 기준 대략)</th></tr>
<tr><td>부분집합</td><td>$2^n$</td><td>20 안팎 ($2^{20} \approx 100$만)</td></tr>
<tr><td>순열</td><td>$n!$</td><td>10 안팎 ($10! \approx 363$만)</td></tr>
<tr><td>$k$개 고르는 조합</td><td>$\binom{n}{k}$</td><td>$n$과 $k$에 따라 계산</td></tr>
<tr><td>칸마다 $m$가지 선택</td><td>$m^n$</td><td>$m$, $n$ 모두 작을 때</td></tr></table>
<p>$13! \approx 62$억은 $10!$의 1,716배다. 입력이 조금만 커져도 완전탐색이 불가능해지는 이유가 여기 있다.</p>
<h3>상태 공간 트리와 백트래킹</h3>
<p>결정을 하나씩 내리는 과정을 트리로 그릴 수 있다. 루트는 아무것도 정하지 않은 상태, 깊이 $d$의 노드는 $d$번째 결정까지 내린 상태다. 완전탐색은 이 트리의 잎을 모두 방문한다. 백트래킹은 DFS로 내려가다가 <strong>이 아래에는 해가 없다</strong>는 것이 확실한 노드에서 바로 되돌아간다(가지치기).</p>
<pre><code class="language-python">def backtrack(state):
    if 완성(state):
        기록(state); return
    for choice in 후보(state):
        if 유망(state, choice):
            적용(state, choice)    # 선택
            backtrack(state)       # 재귀
            취소(state, choice)    # 선택 취소</code></pre>
<p>상태 객체 하나를 계속 고쳐 쓰므로, 재귀에서 돌아온 뒤 반드시 원래대로 되돌려야 다음 후보를 깨끗한 상태에서 시도할 수 있다. 해를 기록할 때 복사본을 저장하는 것도 같은 이유다.</p>
<h3>가지치기 예</h3>
<ul>
<li><strong>N-Queen</strong>: 퀸을 행마다 하나씩 놓는다. 같은 열이나 대각선에 이미 퀸이 있는 칸은 그 아래를 보지 않는다. 8×8에서 행마다 아무 열에나 놓는 배치는 $8^8 \approx 1{,}677$만 개지만, 백트래킹이 방문하는 노드는 약 2천 개다.</li>
<li><strong>부분집합 합</strong>: 수를 정렬해 두고, 지금 합에 다음 수를 더해 목표를 넘으면 그 뒤의 더 큰 수들도 넘으므로 반복을 멈춘다.</li>
<li><strong>분기 한정</strong>(branch and bound): 최적화 문제에서 "이 가지에서 얻을 수 있는 최선이 지금까지 찾은 최선보다 나쁘다"면 자른다.</li>
</ul>
<p>가지치기가 정답을 놓치지 않으려면, 잘라낸 가지 아래에 해가 없다는 것이 <strong>논리적으로 확실</strong>해야 한다. "아마 없을 것"이라는 직감으로 자르면 휴리스틱일 뿐이다.</p>
<h3>DP·그리디와의 관계</h3>
<p>백트래킹 중 같은 부분 문제가 여러 번 나오면 결과를 저장(메모이제이션)해 DP로 바꿀 수 있다. 반대로 "해의 개수"가 아니라 "해 전체 목록"이 필요하거나 상태가 너무 다양해 저장할 수 없으면 백트래킹이 맞다. 그리디는 트리에서 가지 하나만 골라 내려가는 극단적인 경우다.</p>
<h3>실무 속의 완전탐색</h3>
<p>하이퍼파라미터 그리드 서치는 조합을 모두 시도하는 완전탐색이라, 후보가 늘면 무작위 탐색이나 베이지안 최적화로 바꾼다. 스도쿠·일정 배정 같은 제약 만족 문제의 해결기는 백트래킹에 강한 가지치기를 더한 것이다.</p>`,
    analogy: R`<p>미로에서 갈림길마다 벽에 표시를 하며 한쪽 길로 들어간다. 막다른 길이면 마지막 갈림길로 돌아와(backtrack) 아직 안 가 본 길로 간다. 가지치기는 입구에 "이쪽은 막혀 있음"이라고 쓰인 길은 아예 들어가지 않는 것이다.</p>`,
    diagram: { caption: '{3, 5, 6}에서 합이 9인 부분집합 찾기. 왼쪽 가지는 그 수를 넣고, 오른쪽 가지는 넣지 않는다. 합이 9를 넘는 노드(점선)는 더 내려가지 않는다. 강조된 노드가 해 {3, 6}이다.', svg: R`
<svg viewBox="0 0 540 235" width="540">
<path class="e" d="M270,25 L150,85 M270,25 L390,85 M150,85 L90,145 M150,85 L210,145 M390,85 L330,145 M390,85 L450,145 M90,145 L60,205 M90,145 L120,205 M210,145 L180,205 M210,145 L240,205 M330,145 L300,205 M330,145 L360,205 M450,145 L420,205 M450,145 L480,205"/>
<circle class="n" cx="270" cy="25" r="15"/><text x="270" y="25" class="sm">0</text>
<circle class="n" cx="150" cy="85" r="15"/><text x="150" y="85" class="sm">3</text>
<circle class="n" cx="390" cy="85" r="15"/><text x="390" y="85" class="sm">0</text>
<circle class="n" cx="90" cy="145" r="15"/><text x="90" y="145" class="sm">8</text>
<circle class="n" cx="210" cy="145" r="15"/><text x="210" y="145" class="sm">3</text>
<circle class="n" cx="330" cy="145" r="15"/><text x="330" y="145" class="sm">5</text>
<circle class="n" cx="450" cy="145" r="15"/><text x="450" y="145" class="sm">0</text>
<circle class="n d" cx="60" cy="205" r="15"/><text x="60" y="205" class="sm">14</text>
<circle class="n" cx="120" cy="205" r="15"/><text x="120" y="205" class="sm">8</text>
<circle class="h" cx="180" cy="205" r="15"/><text x="180" y="205" class="sm">9</text>
<circle class="n" cx="240" cy="205" r="15"/><text x="240" y="205" class="sm">3</text>
<circle class="n d" cx="300" cy="205" r="15"/><text x="300" y="205" class="sm">11</text>
<circle class="n" cx="360" cy="205" r="15"/><text x="360" y="205" class="sm">5</text>
<circle class="n" cx="420" cy="205" r="15"/><text x="420" y="205" class="sm">6</text>
<circle class="n" cx="480" cy="205" r="15"/><text x="480" y="205" class="sm">0</text>
<text x="8" y="55" class="st sm">3 넣기?</text><text x="8" y="115" class="st sm">5 넣기?</text><text x="8" y="175" class="st sm">6 넣기?</text>
<text x="60" y="229" class="sm">✗ 9 초과</text><text x="300" y="229" class="sm">✗ 9 초과</text>
</svg>` },
    code: R`
from itertools import product

def subset_sum(nums, target):
  nums = sorted(nums)
  out, pick = [], []
  def bt(i, s):
      if s == target:
          out.append(pick[:])          # 복사해서 기록 (pick은 계속 바뀐다)
          return
      for j in range(i, len(nums)):
          if s + nums[j] > target:     # 정렬되어 있으니 뒤는 더 크다 → 이 가지 전체를 자른다
              break
          pick.append(nums[j])         # 선택
          bt(j + 1, s + nums[j])       # 재귀
          pick.pop()                   # 선택 취소
  bt(0, 0)
  return out

print(subset_sum([3, 5, 6, 2, 4], 9))    # [[2, 3, 4], [3, 6], [4, 5]]

def n_queens(n):
  cols, d1, d2 = set(), set(), set()
  count = visited = 0
  def bt(r):
      nonlocal count, visited
      visited += 1
      if r == n:
          count += 1
          return
      for c in range(n):
          if c in cols or r - c in d1 or r + c in d2:
              continue                 # 이미 공격받는 칸 → 그 아래는 보지 않는다
          cols.add(c); d1.add(r - c); d2.add(r + c)
          bt(r + 1)
          cols.remove(c); d1.remove(r - c); d2.remove(r + c)
  bt(0)
  return count, visited

def n_queens_brute(n):                   # 행마다 아무 열이나: n^n 배치를 전부 검사
  ok = 0
  for cols in product(range(n), repeat=n):
      if len(set(cols)) == n and len({r - c for r, c in enumerate(cols)}) == n \
              and len({r + c for r, c in enumerate(cols)}) == n:
          ok += 1
  return ok, n ** n

print("백트래킹 (해, 방문 노드):", n_queens(8))
print("완전탐색 (해, 검사 배치):", n_queens_brute(8))   # 몇 초 걸린다
`,
    links: [
      { to: 'ds-graph', why: '백트래킹은 상태 공간 트리 위의 DFS' },
      { to: 'ds-dp', why: '부분 문제가 겹치면 메모이제이션으로 DP가 된다' },
      { to: 'ds-complexity', why: '2ⁿ, n! 같은 지수 시간의 감각' },
      { to: 'ml-cv', why: '그리드 서치는 하이퍼파라미터 조합의 완전탐색' },
    ],
    quiz: [
      { q: '백트래킹 템플릿에서 재귀 호출이 끝난 뒤 "선택 취소"를 하는 이유는?',
        options: ['재귀 깊이를 줄여서 스택 오버플로가 나는 것을 막기 위해서', '상태를 공유하므로 되돌려야 다음 후보를 깨끗하게 시도할 수 있어서', '취소하지 않으면 같은 해가 결과에 두 번 기록되기 때문', '취소해야 파이썬이 쓰던 메모리를 그 자리에서 바로 돌려받을 수 있어서'], answer: 1,
        explain: '한 리스트나 집합을 계속 고쳐 쓰는 구조라, 이번 선택을 지우지 않으면 다음 형제 후보가 이전 선택이 남은 상태에서 시작된다.' },
      { q: '순열을 모두 확인하는 완전탐색이 n = 10에서는 되지만 n = 13에서 어려운 이유는?',
        options: ['13은 소수라서 순열을 대칭으로 나눠 줄일 수 없어서', '13! ≈ 62억으로 10! ≈ 363만의 1,716배라서', '재귀 깊이가 12를 넘으면 파이썬이 곧바로 오류를 내기 때문', 'n이 10을 넘으면 같은 순열이 중복으로 생겨서'], answer: 1,
        explain: '11 × 12 × 13 = 1,716. 10!이 1초 걸리는 코드라면 13!은 30분 가까이 걸린다. 경우의 수를 먼저 세면 이런 판단을 미리 할 수 있다.' },
      { q: '가지치기가 정답을 놓치지 않으려면 필요한 조건은?',
        options: ['잘라낸 가지 아래에 해가 없다는 것이 확실해야 한다', '잘라낸 가지가 전체 탐색 트리의 절반을 넘지 않아야 한다', '가지치기 조건을 재귀 호출이 끝난 뒤에 검사해야 한다', '모든 후보를 미리 크기순으로 정렬해 둔 상태여야 한다'], answer: 0,
        explain: '정렬은 가지치기를 쉽게 해 주는 경우가 많지만 필요조건은 아니다. 확실하지 않은 기준으로 자르면 빠르지만 정답을 보장하지 못하는 휴리스틱이 된다.' },
    ],
    resources: ['『Algorithm Design Manual』(Skiena) 7장 — Combinatorial Search', '『Introduction to Algorithms』(CLRS) 34장 — NP-완전성(완전탐색밖에 알려진 방법이 없는 문제들)'],
  },
];
