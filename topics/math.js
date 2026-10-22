TOPICS.math = [
  {
    id: 'math-vector', title: '벡터와 내적',
    summary: R`데이터 한 건 = 공간의 한 점(벡터)
<strong>내적</strong> = 같은 방향인 정도 → 유사도·선형 점수·투영·결정 경계`,
    body: R`
<h3>벡터 = 데이터 한 건</h3>
<p>키 170, 몸무게 65, 나이 30인 사람은 3차원 벡터 $(170, 65, 30)$이다. 특성이 $d$개면 $d$차원 공간의 점이 된다. 이렇게 보면 "비슷한 데이터"는 "가까운 점"이 되고, 분류는 "공간을 나누는 경계 찾기"가 된다.</p>
<h3>노름: 벡터의 길이</h3>
<ul>
<li><strong>L2 노름</strong> $\|\mathbf x\|_2 = \sqrt{\sum x_i^2}$: 피타고라스 정리로 잰 직선 거리. 두 점의 유클리드 거리는 $\|\mathbf x - \mathbf y\|_2$.</li>
<li><strong>L1 노름</strong> $\|\mathbf x\|_1 = \sum |x_i|$: 격자를 따라 걷는 거리(맨해튼 거리).</li>
</ul>
<p>정규화(L1·L2 규제)에서 가중치의 크기를 잴 때도 이 노름을 쓴다. 특성마다 단위가 다르면(키는 cm, 연봉은 원) 큰 값의 특성이 거리를 지배하므로, 거리 기반 방법 전에 스케일을 맞춘다.</p>
<h3>내적의 두 얼굴</h3>
<p>대수적으로는 같은 자리끼리 곱해 더한 것이고, 기하적으로는 길이와 사잇각의 코사인의 곱이다.</p>
<ul>
<li>$\mathbf a \cdot \mathbf b &gt; 0$: 사잇각이 90°보다 작다(대체로 같은 방향).</li>
<li>$\mathbf a \cdot \mathbf b = 0$: <strong>직교</strong>. 서로 상관없는 방향.</li>
<li>$\mathbf a \cdot \mathbf b &lt; 0$: 반대 방향 성분이 크다.</li>
</ul>
<p><strong>코사인 유사도</strong>는 내적을 두 길이로 나눠 방향만 비교한다. 문서의 길이(단어 수)와 상관없이 주제가 비슷한지를 볼 때 쓰며, 벡터를 미리 길이 1로 정규화해 두면 내적이 곧 코사인 유사도다.</p>
<h3>투영</h3>
<p>$\mathbf b$를 $\mathbf a$ 방향으로 내린 그림자의 길이는 $\mathbf a$ 방향의 단위 벡터와 $\mathbf b$의 내적이다. "어떤 방향으로 얼마나"를 재는 이 연산이 PCA(분산이 큰 방향으로 투영), 최소제곱(열공간으로 투영), 어텐션(질의와 키의 내적)의 공통 원리다.</p>
<h3>초평면과 선형 분류</h3>
<p>$\mathbf w \cdot \mathbf x + b = 0$을 만족하는 점들은 $d$차원 공간을 둘로 나누는 평면(초평면)이다. $\mathbf w$는 이 평면에 수직인 법선 벡터다. 선형 모델은 $\mathbf w \cdot \mathbf x + b$의 부호로 클래스를 정하고, 그 값을 $\|\mathbf w\|$로 나누면 점과 평면 사이의 거리가 된다. SVM의 마진이 바로 이 거리다.</p>
<h3>평균 = 무게중심</h3>
<p>점들의 평균 벡터는 "모든 점까지의 거리 제곱합"을 최소로 만드는 점이다. k-평균 군집이 각 군집의 중심을 평균으로 갱신하는 이유다.</p>`,
    analogy: R`<p>내적은 <strong>"같은 방향으로 얼마나 함께 미는가"</strong>다. 두 사람이 수레를 밀 때, 같은 방향으로 밀면 힘이 그대로 더해지고(양수, 큼), 직각으로 밀면 서로에게 도움이 안 되고(0), 반대로 밀면 상쇄된다(음수). 코사인 유사도는 힘의 세기는 무시하고 "방향이 얼마나 맞는가"만 본다.</p>`,
    diagram: { caption: '내적의 기하적 의미. b를 a 방향으로 투영한 길이 × a의 길이 = a·b. 초평면 w·x+b=0은 법선 w에 수직이다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="e" d="M30,170 H260"/><path class="e" d="M40,190 V20"/>
<path class="ha" d="M40,170 L230,170"/><text x="235" y="185">a</text>
<path class="a" d="M40,170 L160,60"/><text x="150" y="50">b</text>
<path class="e d" d="M160,60 V168"/>
<path class="h" d="M40,170 L160,170" style="stroke-width:5;fill:none;stroke-opacity:.5"/>
<text x="100" y="200" class="sm">투영 길이 = |b| cos θ</text>
<path class="e" d="M70,170 A30,30 0 0,0 63,150" style="fill:none"/><text x="82" y="158" class="sm">θ</text>
<path class="e" d="M330,190 L520,30"/><text x="525" y="25" class="sm">w·x + b = 0</text>
<path class="ha" d="M425,110 L475,170"/><text x="485" y="180">w</text>
<circle class="h" cx="360" cy="70" r="5"/><circle class="h" cx="390" cy="50" r="5"/><circle class="h" cx="340" cy="110" r="5"/>
<circle class="n" cx="470" cy="120" r="5"/><circle class="n" cx="500" cy="150" r="5"/><circle class="n" cx="440" cy="165" r="5"/>
<text x="360" y="30" class="sm">w·x + b &lt; 0</text><text x="500" y="200" class="sm">w·x + b &gt; 0</text>
</svg>` },
    math: [
      { tex: R`\mathbf a \cdot \mathbf b = \sum_{i=1}^{d} a_i b_i = \|\mathbf a\|\,\|\mathbf b\| \cos\theta, \qquad \cos(\mathbf a, \mathbf b) = \frac{\mathbf a \cdot \mathbf b}{\|\mathbf a\|\,\|\mathbf b\|}`, explain: R`$\theta$: 두 벡터의 사잇각. 코사인 유사도는 −1(정반대) ~ 1(같은 방향). 모든 값이 0 이상인 벡터(단어 빈도 등)라면 0 ~ 1이다.` },
      { tex: R`\mathrm{dist}(\mathbf x_0, \{\mathbf x : \mathbf w \cdot \mathbf x + b = 0\}) = \frac{|\mathbf w \cdot \mathbf x_0 + b|}{\|\mathbf w\|}`, explain: R`점 $\mathbf x_0$와 초평면 사이의 거리. $\mathbf w$ 방향(법선)으로의 투영 길이를 잰 것이다.` },
      { tex: R`\bar{\mathbf x} = \frac1n \sum_{i=1}^n \mathbf x_i = \arg\min_{\mathbf c} \sum_{i=1}^n \|\mathbf x_i - \mathbf c\|_2^2`, explain: R`평균 벡터는 거리 제곱합을 최소로 하는 점이다. $\mathbf c$에 대해 미분해 0으로 놓으면 $\sum(\mathbf x_i - \mathbf c) = 0$에서 바로 나온다.` },
    ],
    code: R`
import numpy as np

a, b = np.array([3.0, 0.0]), np.array([2.0, 2.0])
print("내적:", a @ b, "| 길이:", np.linalg.norm(a), np.linalg.norm(b).round(3))
cos = a @ b / (np.linalg.norm(a) * np.linalg.norm(b))
print(f"코사인 {cos:.3f} → 사잇각 {np.degrees(np.arccos(cos)):.0f}°")
print("b를 a 방향으로 투영한 길이:", (a / np.linalg.norm(a)) @ b)
print("직교:", np.array([1, 2]) @ np.array([-2, 1]))

doc1 = np.array([3, 1, 0])        # 단어 빈도 (AI, 데이터, 요리)
doc2 = doc1 * 10                  # 같은 주제, 10배 긴 문서
doc3 = np.array([0, 1, 4])
cos_sim = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))
print(f"\n유클리드 거리 doc1-doc2 {np.linalg.norm(doc1 - doc2):.1f}, doc1-doc3 {np.linalg.norm(doc1 - doc3):.1f}")
print(f"코사인 유사도 doc1-doc2 {cos_sim(doc1, doc2):.2f}, doc1-doc3 {cos_sim(doc1, doc3):.2f}  ← 길이 무시, 방향만")

w, bias = np.array([1.0, -1.0]), 0.5                     # 결정 경계 x1 - x2 + 0.5 = 0
pts = np.array([[2.0, 0.0], [0.0, 2.0], [1.0, 1.5]])
score = pts @ w + bias
print("\n선형 점수:", score, "→ 클래스", np.where(score > 0, 1, 0), "| 경계까지 거리", (np.abs(score) / np.linalg.norm(w)).round(3))

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 3)) + [5, -2, 1]
cost = lambda c: ((X - c) ** 2).sum()
print(f"\n평균에서의 거리제곱합 {cost(X.mean(0)):.1f} vs 조금 옮긴 점 {cost(X.mean(0) + [0.3, 0, 0]):.1f}")
print(f"(차이 = n × 0.3² = {len(X) * 0.09:.1f})")

unscaled = np.array([[170, 3_000], [180, 3_000], [170, 3_100]], float)   # 키(cm), 연봉(만 원)
print("\n스케일 차이: 키 10cm 차이 거리", np.linalg.norm(unscaled[0] - unscaled[1]), "/ 연봉 100만 원 차이 거리", np.linalg.norm(unscaled[0] - unscaled[2]))
`,
    links: [
      { to: 'ml-knn', why: '거리 = 벡터 차이의 노름, 스케일링의 필요성' },
      { to: 'ml-svm', why: '초평면과 점 사이의 거리 = 마진' },
      { to: 'ai-embedding', why: '코사인 유사도로 의미를 비교' },
      { to: 'dl-attention', why: '어텐션 점수 = 질의와 키의 내적' },
      { to: 'math-matrix', why: '여러 내적을 한 번에 = 행렬 곱' },
      { to: 'ml-clustering', why: 'k-평균의 중심 = 평균 벡터' },
    ],
    quiz: [
      { q: '두 문서의 단어 빈도 벡터 중 하나가 다른 하나의 정확히 10배일 때 코사인 유사도는?',
        options: ['0.1 (길이 비율의 역수)', '1 (방향이 같아 최대)', '10 (길이 비율만큼 커짐)', '0 (길이가 달라 서로 무관)'], answer: 1,
        explain: '코사인 유사도는 길이로 나누므로 방향만 본다. 유클리드 거리는 이 경우 크게 나와, 문서 길이에 휘둘린다.' },
      { q: '두 벡터의 내적이 0이라는 것의 기하학적 의미는?',
        options: ['두 벡터 중 적어도 하나는 반드시 영벡터다', '영벡터가 아니라면 두 벡터가 직교한다(90°)', '두 벡터의 길이가 같고 방향이 반대다', '두 벡터가 같은 직선 위에 놓여 있다'], answer: 1,
        explain: '코사인 90° = 0. 한 벡터를 다른 벡터 방향으로 투영하면 그림자의 길이가 0이 된다.' },
      { q: '선형 분류기 w·x + b의 값을 ||w||로 나누면 무엇이 되나?',
        options: ['x가 양성 클래스일 확률', '점 x와 결정 경계 사이의 부호 있는 거리', 'x를 w 방향으로 정규화한 단위 벡터', '결정 경계가 원점에서 떨어진 거리'], answer: 1,
        explain: 'w는 초평면의 법선이므로, 법선 방향 투영 길이가 곧 거리다. SVM은 이 거리(마진)를 최대화한다.' },
    ],
    resources: ['3Blue1Brown, "Essence of Linear Algebra" (영상 시리즈)', 'Gilbert Strang, MIT 18.06 Linear Algebra (MIT OCW)', 'Deisenroth, Faisal, Ong, 『Mathematics for Machine Learning』 (무료 공개) 2·3장'],
  },
  {
    id: 'math-matrix', title: '행렬과 선형변환',
    summary: R`행렬 = 공간을 바꾸는 <strong>선형변환</strong>, 행렬 곱 = 변환의 합성
신경망 층 = 행렬 곱 + 비선형
최소제곱 = 열공간으로의 <strong>정사영</strong>`,
    body: R`
<h3>행렬 = 선형변환</h3>
<p>행렬 $A$를 벡터에 곱하는 것은 공간을 늘이고, 돌리고, 기울이고, 뒤집는 변환이다. 직선은 직선으로, 원점은 원점으로 간다(선형성: $A(\alpha\mathbf x + \beta\mathbf y) = \alpha A\mathbf x + \beta A\mathbf y$). <strong>$A$의 각 열은 기저 벡터 $\mathbf e_1, \mathbf e_2, \ldots$가 옮겨 간 위치</strong>다. 그래서 $A\mathbf x$는 "$A$의 열들을 $\mathbf x$의 성분만큼 섞은 것", 즉 열들의 선형 결합이다.</p>
<h3>행렬 곱 = 변환의 합성</h3>
<p>$AB\mathbf x$는 $B$를 먼저, $A$를 나중에 적용한다. 회전 후 늘이기와 늘인 후 회전은 결과가 다르듯 일반적으로 $AB \ne BA$다. 크기 규칙: $(m \times n)(n \times p) = (m \times p)$. 원소 $(i, j)$는 $A$의 $i$행과 $B$의 $j$열의 내적이다.</p>
<p>신경망의 한 층 $\mathbf h = \sigma(W\mathbf x + \mathbf b)$에서 $W\mathbf x$가 선형변환이다. 비선형 함수 $\sigma$가 없다면 층을 아무리 쌓아도 $W_3 W_2 W_1$은 행렬 하나로 합쳐져 선형 모델 하나와 같다. 배치 전체를 한 번에 처리할 때는 데이터 행렬 $X$(샘플 × 특성)에 $W^\top$를 곱한다.</p>
<h3>역행렬, 행렬식, 랭크</h3>
<ul>
<li><strong>행렬식</strong> $\det A$: 변환이 넓이(부피)를 몇 배로 바꾸는지. 0이면 공간이 더 낮은 차원으로 납작해진 것이다.</li>
<li><strong>역행렬</strong> $A^{-1}$: 변환을 되돌린다. 납작해진 변환($\det A = 0$)은 정보를 잃었으므로 되돌릴 수 없다.</li>
<li><strong>랭크</strong>: 변환 결과가 차지하는 공간의 차원 = 선형 독립인 열의 수. 특성 중 하나가 다른 특성들의 선형 결합이면(예: 총점 = 국어 + 영어) 랭크가 줄어든다(다중공선성).</li>
</ul>
<h3>열공간과 최소제곱</h3>
<p>선형 회귀 $X\mathbf w \approx \mathbf y$에서 $X\mathbf w$는 언제나 $X$의 열들의 선형 결합, 즉 <strong>열공간</strong> 안에 있다. 데이터가 $n$개고 특성이 그보다 적으면 $\mathbf y$는 보통 열공간 밖에 있어 정확히 맞출 수 없다. 그렇다면 열공간에서 $\mathbf y$와 가장 가까운 점을 고르는 것이 최선이고, 그 점은 $\mathbf y$를 열공간에 수직으로 내린 <strong>정사영</strong>이다. 이때 잔차 $\mathbf y - X\hat{\mathbf w}$는 모든 열과 직교하므로 $X^\top(\mathbf y - X\hat{\mathbf w}) = 0$, 즉 <strong>정규방정식</strong>이 나온다.</p>
<p>실제 계산은 $(X^\top X)^{-1}$을 직접 구하지 않는다. 수치적으로 불안정하고(특히 열들이 거의 선형 종속일 때) 느리기 때문에, QR 분해나 SVD 기반의 <code>np.linalg.lstsq</code>, <code>solve</code>를 쓴다.</p>`,
    analogy: R`<p>행렬은 <strong>고무판 위 격자를 잡아당기는 규칙</strong>이다. 규칙은 "x축 눈금 하나는 여기로, y축 눈금 하나는 저기로"만 정하면 되고(행렬의 열), 나머지 모든 점은 그 규칙대로 따라간다. 판을 완전히 접어 선으로 만들어 버리면(행렬식 0) 원래 어느 점이었는지 되돌릴 수 없다.</p>`,
    diagram: { caption: '선형변환. 행렬의 열은 기저 벡터 e₁, e₂가 옮겨 간 위치이고, 정사각형 격자는 평행사변형 격자가 된다. 넓이 배율 = 행렬식.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<g transform="translate(40,170)">
  <path class="e d" d="M0,-40 H120 M0,-80 H120 M0,-120 H120 M40,0 V-120 M80,0 V-120"/>
  <path class="e" d="M0,0 H130 M0,0 V-130"/>
  <rect class="g" x="0" y="-40" width="40" height="40"/>
  <path class="ha" d="M0,0 H40"/><path class="a" d="M0,0 V-40"/>
  <text x="45" y="15" class="sm">e₁</text><text x="-12" y="-40" class="sm">e₂</text>
  <text x="60" y="-140" class="sm">변환 전 (넓이 1)</text>
</g>
<text x="250" y="95">A = [[2, 1], [0, 1]]</text><path class="a" d="M210,110 H290"/>
<g transform="translate(330,170)">
  <path class="e" d="M0,0 H200 M0,0 V-130"/>
  <path class="g" d="M0,0 L80,0 L120,-40 L40,-40 Z"/>
  <path class="e d" d="M40,-40 L120,-40 L160,-80 L80,-80 Z M80,-80 L160,-80 L200,-120 L120,-120 Z"/>
  <path class="ha" d="M0,0 H80"/><path class="a" d="M0,0 L40,-40"/>
  <text x="70" y="15" class="sm">A e₁ = (2, 0)</text><text x="-10" y="-50" class="sm">A e₂ = (1, 1)</text>
  <text x="110" y="-140" class="sm">변환 후 (넓이 = det A = 2)</text>
</g>
</svg>` },
    math: [
      { tex: R`A\mathbf x = x_1 \mathbf a_1 + x_2 \mathbf a_2 + \cdots + x_n \mathbf a_n, \qquad (AB)_{ij} = \sum_k A_{ik} B_{kj}`, explain: R`$\mathbf a_j$: $A$의 $j$번째 열. 행렬-벡터 곱은 열들의 선형 결합이고, 행렬 곱의 각 원소는 행과 열의 내적이다.` },
      { tex: R`X^\top (\mathbf y - X\hat{\mathbf w}) = \mathbf 0 \;\Longrightarrow\; X^\top X\, \hat{\mathbf w} = X^\top \mathbf y`, explain: R`정규방정식. 잔차가 $X$의 모든 열과 직교한다는 조건이다. $X^\top X$가 가역이면(열들이 선형 독립) 해가 하나로 정해진다.` },
    ],
    code: R`
import numpy as np

A = np.array([[2.0, 1.0], [0.0, 1.0]])
print("A e1 =", A @ [1, 0], "  A e2 =", A @ [0, 1], " ← 행렬의 열 = 기저가 옮겨 간 곳")
print("det A =", np.linalg.det(A).round(3), "(넓이 2배)")

R = np.array([[0.0, -1.0], [1.0, 0.0]])            # 90도 회전
print("\nRA == AR ?", np.allclose(R @ A, A @ R), "→ 변환 순서가 중요하다")

rng = np.random.default_rng(0)                     # 비선형 없이 쌓은 층은 행렬 하나와 같다
W1, W2, W3 = rng.normal(size=(5, 4)), rng.normal(size=(3, 5)), rng.normal(size=(2, 3))
x = rng.normal(size=4)
print("3층 선형 = 행렬 하나:", np.allclose(W3 @ (W2 @ (W1 @ x)), (W3 @ W2 @ W1) @ x))

flat = np.array([[1.0, 2.0], [2.0, 4.0]])          # 두 번째 열 = 첫 열의 2배
print("\n납작해진 변환: det =", np.linalg.det(flat), " rank =", np.linalg.matrix_rank(flat))

n = 50                                             # 최소제곱 = 열공간으로의 정사영
X = np.column_stack([np.ones(n), rng.uniform(0, 10, n)])
y = 3 + 2 * X[:, 1] + rng.normal(0, 1, n)
w_normal = np.linalg.solve(X.T @ X, X.T @ y)       # 정규방정식 (역행렬을 직접 구하지 않음)
w_lstsq = np.linalg.lstsq(X, y, rcond=None)[0]
resid = y - X @ w_lstsq
print(f"\n정규방정식 {w_normal.round(3)} / lstsq {w_lstsq.round(3)}")
print("잔차와 각 열의 내적 (직교 → 0):", (X.T @ resid).round(10))

x1 = rng.normal(size=n)                            # 거의 선형 종속인 특성 → 불안정
Xc = np.column_stack([x1, x1 + 1e-6 * rng.normal(size=n)])
print(f"\n거의 같은 두 특성: X의 조건수 {np.linalg.cond(Xc):.1e}, XᵀX의 조건수 {np.linalg.cond(Xc.T @ Xc):.1e} (제곱)")
`,
    links: [
      { to: 'ml-linear', why: '최소제곱 회귀 = 열공간으로의 정사영' },
      { to: 'dl-mlp', why: '층 = 행렬 곱 + 비선형, 비선형이 없으면 층이 하나로 합쳐진다' },
      { to: 'math-vector', why: '행렬 곱의 각 원소 = 행과 열의 내적' },
      { to: 'math-eigen', why: '변환해도 방향이 바뀌지 않는 특별한 벡터' },
      { to: 'ca-simd', why: '행렬 곱이 SIMD·GPU 병렬화에 잘 맞는 이유' },
      { to: 'ml-regularization', why: '다중공선성(랭크 부족)과 릿지 회귀' },
    ],
    quiz: [
      { q: '활성화 함수 없이 선형층 10개를 쌓은 신경망의 표현력은?',
        options: ['층 수에 비례해 커져 10배 복잡한 함수를 표현한다', '행렬들의 곱은 행렬 하나라 선형층 1개와 같다', '층마다 차원이 다르면 비선형 함수도 표현할 수 있다', '층이 깊을수록 지수적으로 많은 선형 구간을 만든다'], answer: 1,
        explain: '선형변환의 합성은 선형변환이다. 층 사이의 비선형 함수가 있어야 깊이가 의미를 갖는다.' },
      { q: '최소제곱 해에서 잔차 벡터 y − Xŵ가 X의 모든 열과 직교하는 이유는?',
        options: ['잔차 제곱합이 최소가 되면 잔차의 평균이 0이 되기 때문', 'Xŵ가 y의 열공간 정사영이라 연결선이 그 공간에 수직이라서', 'X의 열들이 서로 직교하도록 미리 정규화되어 있기 때문', '잔차는 X와 무관한 잡음이라 모든 벡터와 직교하기 때문'], answer: 1,
        explain: '이 직교 조건을 식으로 쓴 것이 정규방정식 XᵀXŵ = Xᵀy이다.' },
      { q: '특성 중 "총점 = 국어 + 영어"가 함께 들어 있으면 정규방정식의 XᵀX에 생기는 문제는?',
        options: ['특성 수가 늘어 XᵀX의 크기가 커지고 계산만 느려진다', '열들이 선형 종속이라 XᵀX의 역행렬이 없어 해가 유일하지 않다', '총점이 다른 특성보다 커서 그 계수만 0으로 수렴한다', '국어·영어 계수가 음수가 되도록 강제되어 해석이 어려워진다'], answer: 1,
        explain: '완전한 종속이면 특이 행렬이고, 거의 종속이면 조건수가 커져 계수가 불안정해진다. 특성 제거나 릿지 회귀로 해결한다.' },
    ],
    resources: ['3Blue1Brown, "Essence of Linear Algebra" 3~7편', 'Gilbert Strang, 『Introduction to Linear Algebra』', 'Deisenroth 외, 『Mathematics for Machine Learning』 2·3·9장'],
  },
  {
    id: 'math-eigen', title: '고유값과 고유벡터',
    summary: R`$A\mathbf v = \lambda\mathbf v$: 변환해도 <strong>방향이 그대로</strong>인 벡터
공분산의 고유벡터 = PCA 주성분
거듭 곱하면 가장 큰 고유값이 지배(RNN·PageRank)`,
    body: R`
<h3>정의와 의미</h3>
<p>$A\mathbf v = \lambda\mathbf v$ ($\mathbf v \ne \mathbf 0$)를 만족하는 $\mathbf v$가 고유벡터, $\lambda$가 고유값이다. 대부분의 벡터는 변환되면 방향이 바뀌지만, 고유벡터는 같은 직선 위에 머문다. $\lambda &gt; 1$이면 늘어나고, $0 &lt; \lambda &lt; 1$이면 줄어들고, 음수면 뒤집힌다. 고유값은 $\det(A - \lambda I) = 0$의 해이며, $\det A$는 고유값들의 곱, 대각합(trace)은 고유값들의 합이다.</p>
<h3>대칭 행렬: 가장 좋은 경우</h3>
<p>공분산 행렬처럼 $A = A^\top$인 실수 대칭 행렬은 (스펙트럼 정리) 고유값이 모두 실수이고, 서로 <strong>직교하는</strong> 고유벡터들을 축으로 잡을 수 있다: $A = Q\Lambda Q^\top$. 즉 대칭 행렬이 하는 일은 "적당히 돌린 직교 축 방향으로 각각 늘이거나 줄이기"뿐이다.</p>
<h3>PCA: 공분산의 고유벡터</h3>
<p>평균을 뺀 데이터의 공분산 행렬 $\Sigma$에 대해, 단위 벡터 $\mathbf u$ 방향으로 투영한 데이터의 분산은 $\mathbf u^\top \Sigma \mathbf u$다. 이를 최대화하는 방향이 가장 큰 고유값의 고유벡터(제1 주성분)이고, 그 분산이 바로 고유값이다. 다음 주성분은 앞의 것과 직교하면서 남은 분산이 가장 큰 방향이다. 고유값의 비율이 "그 축이 설명하는 분산의 비율"이 된다.</p>
<h3>거듭제곱: 큰 고유값이 지배한다</h3>
<p>$A$가 고유벡터들로 대각화된다면 $A^k = V\Lambda^k V^{-1}$이다. 아무 벡터나 고유벡터들의 결합으로 쓰면, $k$번 곱한 뒤 각 성분은 $\lambda_i^k$배가 되므로 $|\lambda|$가 가장 큰 성분이 나머지를 압도한다.</p>
<ul>
<li><strong>거듭제곱법</strong>: 임의의 벡터에 $A$를 반복해 곱하고 정규화하면 가장 큰 고유값의 고유벡터로 수렴한다. PageRank가 이 원리로 계산된다.</li>
<li><strong>RNN의 기울기 폭발·소실</strong>: 같은 가중치 행렬을 시간 단계마다 곱하므로, 가장 큰 고유값(엄밀히는 특이값)이 1보다 크면 폭발, 작으면 소실한다.</li>
<li><strong>마르코프 체인</strong>: 전이 행렬을 거듭 곱하면 고유값 1의 고유벡터, 즉 정상 분포로 수렴한다.</li>
</ul>
<p>정사각 행렬이라고 모두 대각화되지는 않고(예: 전단 변환), 회전 행렬처럼 실수 고유벡터가 없는 경우도 있다. 정사각이 아닌 행렬까지 다루는 일반화가 SVD다.</p>`,
    analogy: R`<p>지구본을 축을 중심으로 돌리면 모든 점이 움직이지만 <strong>북극과 남극을 잇는 축 위의 점들은 제자리</strong>다(고유값 1). 반죽을 한쪽으로 밀어 늘리면 미는 방향의 선은 그 방향 그대로 길어지기만 한다(고유값 &gt; 1). 고유벡터는 "이 변환이 실제로 무엇을 하는가"를 보여 주는 축이다.</p>`,
    diagram: { caption: '대칭 행렬 A = [[3,1],[1,3]]이 단위원을 타원으로 바꾼다. 고유벡터 방향(대각선)은 방향을 유지한 채 고유값(4와 2)배가 된다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<g transform="translate(130,105)">
  <path class="e" d="M-100,0 H100 M0,-95 V95"/>
  <circle class="g" r="35" style="fill-opacity:.4"/>
  <path class="ha" d="M0,0 L25,-25"/><path class="a" d="M0,0 L-25,-25"/>
  <text x="40" y="-35" class="sm">v₁</text><text x="-50" y="-35" class="sm">v₂</text>
  <text x="0" y="90" class="sm">단위원</text>
</g>
<text x="280" y="95">A</text><path class="a" d="M245,110 H315"/>
<g transform="translate(430,105)">
  <path class="e" d="M-110,0 H110 M0,-95 V95"/>
  <ellipse class="g" rx="140" ry="70" transform="rotate(-45) scale(0.5)" style="fill-opacity:.4"/>
  <path class="ha" d="M0,0 L70,-70"/><path class="a" d="M0,0 L-35,-35"/>
  <text x="85" y="-70" class="sm">4·v₁</text><text x="-60" y="-40" class="sm">2·v₂</text>
  <text x="0" y="90" class="sm">고유벡터 방향은 그대로, 길이만 λ배</text>
</g>
</svg>` },
    math: [
      { tex: R`A\mathbf v = \lambda \mathbf v, \qquad \det(A - \lambda I) = 0, \qquad \det A = \prod_i \lambda_i,\ \ \mathrm{tr}\,A = \sum_i \lambda_i`, explain: R`고유값은 특성방정식의 해다. 행렬식이 0이면 고유값 중 하나가 0, 즉 어떤 방향이 0으로 납작해진다는 뜻이다.` },
      { tex: R`\max_{\|\mathbf u\| = 1} \mathbf u^\top \Sigma\, \mathbf u = \lambda_{\max}, \qquad \text{설명된 분산 비율}_k = \frac{\lambda_k}{\sum_j \lambda_j}`, explain: R`$\Sigma$: 공분산 행렬. 투영 분산을 최대화하는 방향은 가장 큰 고유값의 고유벡터이고, 그 최대 분산이 고유값이다(라그랑주 승수로 유도).` },
      { tex: R`A^k \mathbf x = \sum_i c_i \lambda_i^k \mathbf v_i \;\approx\; c_1 \lambda_1^k \mathbf v_1 \quad (|\lambda_1| > |\lambda_2| \ge \cdots)`, explain: R`$\mathbf x = \sum c_i \mathbf v_i$로 쓸 때. 수렴 속도는 $|\lambda_2 / \lambda_1|$에 달려 있다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

A = np.array([[3.0, 1.0], [1.0, 3.0]])
vals, vecs = np.linalg.eigh(A)                    # 대칭 행렬 전용: 실수 고유값, 직교 고유벡터
print("고유값:", vals, "\n고유벡터(열):\n", vecs.round(3))
for lam, v in zip(vals, vecs.T):
  print(f"A v = {(A @ v).round(3)}  =  {lam} × v = {(lam * v).round(3)}")
print("고유벡터끼리 내적:", (vecs[:, 0] @ vecs[:, 1]).round(10), "| det = 곱", np.linalg.det(A).round(3), "| trace = 합", np.trace(A))

x = rng.normal(size=2)                            # 거듭제곱법
for k in range(30):
  x = A @ x
  x /= np.linalg.norm(x)
print("\n거듭제곱법 30회 →", x.round(4), " 레일리 몫 xᵀAx =", (x @ A @ x).round(4))

for scale in [0.9, 1.1]:                          # RNN처럼 같은 행렬을 반복해서 곱하면
  W = scale * np.linalg.qr(rng.normal(size=(8, 8)))[0]   # 모든 특이값 = scale
  h = np.ones(8)
  for _ in range(50):
      h = W @ h
  print(f"가중치 크기 {scale}배 행렬을 50번 곱한 벡터의 길이: {np.linalg.norm(h):.2e}")

X = rng.normal(size=(500, 2)) @ np.array([[3.0, 0.0], [0.0, 0.5]])   # PCA = 공분산의 고유분해
X = X @ np.array([[np.cos(0.5), np.sin(0.5)], [-np.sin(0.5), np.cos(0.5)]])
Xc = X - X.mean(0)
cov = Xc.T @ Xc / (len(X) - 1)
lam, U = np.linalg.eigh(cov)
lam, U = lam[::-1], U[:, ::-1]
print("\n공분산 고유값:", lam.round(3), "→ 설명된 분산 비율", (lam / lam.sum()).round(3))
print("제1 주성분 방향으로 투영한 분산:", np.var(Xc @ U[:, 0], ddof=1).round(3), "= 최대 고유값")

P = np.array([[0.9, 0.1], [0.5, 0.5]])            # 마르코프 체인: 맑음/비 전이 확률
print("\n전이 행렬 50제곱의 행:", np.linalg.matrix_power(P, 50)[0].round(4), "← 고유값 1의 정상 분포 (5/6, 1/6)")
`,
    links: [
      { to: 'ml-pca', why: '주성분 = 공분산 행렬의 고유벡터, 분산 = 고유값' },
      { to: 'dl-rnn', why: '같은 행렬의 반복 곱 → 기울기 폭발·소실' },
      { to: 'math-svd', why: '정사각이 아닌 행렬로의 일반화' },
      { to: 'math-matrix', why: '선형변환과 행렬식' },
      { to: 'dl-init', why: '층을 지나며 신호 크기가 유지되도록 하는 초기화' },
    ],
    quiz: [
      { q: '공분산 행렬의 가장 큰 고유값에 해당하는 고유벡터의 의미는?',
        options: ['데이터의 평균이 놓인 방향이며 고유값은 평균의 크기다', '투영했을 때 분산이 가장 큰 방향이며, 그 분산이 고유값이다', '분산이 가장 작아 잡음으로 버려도 되는 방향이다', '값의 범위가 가장 큰 특성 하나의 축 방향이다'], answer: 1,
        explain: 'uᵀΣu를 단위 벡터 조건에서 최대화하면 고유값 문제가 된다. 대칭 행렬이라 주성분들은 서로 직교한다.' },
      { q: '어떤 행렬을 임의의 벡터에 계속 곱하고 정규화하면 어떻게 되나? (가장 큰 |고유값|이 유일할 때)',
        options: ['고유값들이 번갈아 지배해 여러 방향 사이를 진동한다', '가장 큰 |고유값|의 고유벡터 방향으로 수렴한다', '가장 작은 |고유값|의 고유벡터 방향으로 수렴한다', '처음 벡터의 방향을 그대로 유지하며 길이만 바뀐다'], answer: 1,
        explain: '각 고유벡터 성분이 λᵏ배가 되어 가장 큰 것이 지배한다. PageRank, 마르코프 체인의 정상 분포가 이 원리다.' },
      { q: '행렬식이 0인 정사각 행렬에 대해 옳은 것은?',
        options: ['모든 고유값이 1이라 변환이 부피를 바꾸지 않는다', '고유값 중 하나 이상이 0이라 역행렬이 없다', '대칭 행렬이라서 고유벡터들이 서로 직교한다', '모든 고유값이 음수라 변환이 방향을 뒤집는다'], answer: 1,
        explain: '행렬식 = 고유값의 곱이다. 고유값 0의 고유벡터 방향은 변환 후 원점으로 간다.' },
    ],
    resources: ['3Blue1Brown, "Eigenvectors and eigenvalues" (Essence of Linear Algebra 14편)', 'Gilbert Strang, MIT 18.06 고유값 강의', 'Page, Brin 외, "The PageRank Citation Ranking" (1999)'],
  },
  {
    id: 'math-svd', title: '특이값 분해(SVD)',
    summary: R`모든 행렬 = 회전 → 축별 늘이기 → 회전($U\Sigma V^\top$)
큰 특이값만 남기기 = <strong>최선의 저랭크 근사</strong>
활용: PCA·추천·압축·LoRA`,
    body: R`
<h3>분해의 형태</h3>
<p>$m \times n$ 행렬 $A$는 항상 $A = U\Sigma V^\top$로 쓸 수 있다.</p>
<ul>
<li>$V$ ($n \times n$): 직교 행렬. 입력 공간의 직교 축(오른쪽 특이벡터).</li>
<li>$\Sigma$ ($m \times n$): 대각선에 <strong>특이값</strong> $\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$. 각 축 방향으로 늘이는 배율.</li>
<li>$U$ ($m \times m$): 직교 행렬. 출력 공간의 직교 축(왼쪽 특이벡터).</li>
</ul>
<p>즉 어떤 선형변환이든 "입력을 적당히 돌려서(Vᵀ) 축마다 늘이고(Σ) 다시 돌린다(U)"로 설명된다. 0이 아닌 특이값의 수가 랭크다. 특이값은 $A^\top A$의 고유값의 제곱근이고, $V$는 $A^\top A$의, $U$는 $AA^\top$의 고유벡터다. 고유분해와 달리 정사각이 아니어도, 대칭이 아니어도 항상 존재한다.</p>
<h3>랭크 1 행렬들의 합</h3>
<p>SVD는 $A = \sum_i \sigma_i \mathbf u_i \mathbf v_i^\top$, 즉 "랭크 1짜리 조각을 중요도($\sigma_i$) 순으로 더한 것"으로도 쓸 수 있다. 앞의 $k$개만 남긴 $A_k$는 <strong>랭크 $k$ 행렬 중 $A$에 가장 가까운 행렬</strong>이다(Eckart–Young 정리). 버린 부분의 오차는 버린 특이값들로 정확히 정해진다.</p>
<h3>활용</h3>
<ul>
<li><strong>PCA</strong>: 평균을 뺀 데이터 행렬 $X_c$를 SVD하면 $V$의 열이 주성분이고, $\sigma_i^2/(n-1)$이 각 주성분의 분산(공분산 행렬의 고유값)이다. 공분산 행렬을 만들지 않으므로 수치적으로 더 안정적이라 scikit-learn의 PCA도 SVD를 쓴다.</li>
<li><strong>압축·잡음 제거</strong>: 이미지 행렬의 큰 특이값 몇 개만 남기면 저장량이 $mn$에서 $k(m+n+1)$로 줄고, 작은 특이값에 섞인 잡음이 걸러지기도 한다.</li>
<li><strong>추천 시스템</strong>: 사용자 × 상품 평점 행렬을 저랭크로 근사하면 "취향 요인" 몇 개로 사용자와 상품을 표현할 수 있다(행렬 분해). 실제로는 대부분이 비어 있는 행렬이라 관측된 값만으로 분해를 학습한다.</li>
<li><strong>잠재 의미 분석(LSA)</strong>: 단어 × 문서 행렬의 SVD로 단어와 문서를 같은 저차원 의미 공간에 놓는다. 임베딩의 고전적 형태다.</li>
<li><strong>LoRA</strong>: 가중치 변화를 저랭크 $BA$로 제한하는 것은 "필요한 변화의 특이값이 소수에 몰려 있다"는 가정이다.</li>
<li><strong>의사역행렬과 조건수</strong>: 최소제곱 해는 $A^+ = V\Sigma^+ U^\top$로 안정적으로 구하고, $\sigma_{\max}/\sigma_{\min}$(조건수)은 입력 오차가 결과에서 얼마나 증폭되는지 알려 준다.</li>
</ul>`,
    analogy: R`<p>오케스트라 음원을 악기별 트랙으로 분리하는 것. 각 트랙(랭크 1 조각)에는 음량(특이값)이 있고, 음량이 큰 주요 악기 몇 개만 남겨도 곡은 거의 그대로 들린다(저랭크 근사). 아주 작은 소리로 섞여 있던 잡음 트랙은 빼는 편이 오히려 깨끗하다.</p>`,
    diagram: { caption: 'SVD의 기하학. 어떤 행렬이든 회전(Vᵀ) → 축 방향 늘이기(Σ) → 회전(U)으로 분해된다.', svg: R`
<svg viewBox="0 0 560 190" width="560">
<g transform="translate(60,90)"><circle class="g" r="35" style="fill-opacity:.4"/><path class="ha" d="M0,0 L25,-25"/><path class="a" d="M0,0 L-25,-25"/><text x="0" y="65" class="sm">입력: 단위원</text></g>
<path class="a" d="M105,90 H150"/><text x="127" y="80" class="sm">Vᵀ 회전</text>
<g transform="translate(195,90)"><circle class="g" r="35" style="fill-opacity:.4"/><path class="ha" d="M0,0 H35"/><path class="a" d="M0,0 V-35"/><text x="0" y="65" class="sm">축 정렬</text></g>
<path class="a" d="M240,90 H285"/><text x="262" y="80" class="sm">Σ 늘이기</text>
<g transform="translate(345,90)"><ellipse class="g" rx="55" ry="18" style="fill-opacity:.4"/><path class="ha" d="M0,0 H55"/><path class="a" d="M0,0 V-18"/><text x="0" y="65" class="sm">σ₁ = 3, σ₂ = 1</text></g>
<path class="a" d="M405,90 H450"/><text x="427" y="80" class="sm">U 회전</text>
<g transform="translate(500,90)"><ellipse class="g" rx="55" ry="18" transform="rotate(-30)" style="fill-opacity:.4"/><text x="0" y="65" class="sm">출력 = A·원</text></g>
<text x="280" y="180" class="sm">A = U Σ Vᵀ = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + … (중요도 순 랭크 1 조각의 합)</text>
</svg>` },
    math: [
      { tex: R`A = U \Sigma V^\top = \sum_{i=1}^{r} \sigma_i\, \mathbf u_i \mathbf v_i^\top, \qquad \sigma_i = \sqrt{\lambda_i(A^\top A)}`, explain: R`<ul class="defs"><li>$r$: 랭크</li><li>$U, V$: 직교 행렬($U^\top U = I$)</li><li>$\sigma_i$: 특이값(내림차순)</li></ul>고유분해와 달리 모든 실수 행렬에 존재한다.` },
      { tex: R`A_k = \sum_{i=1}^{k} \sigma_i \mathbf u_i \mathbf v_i^\top, \qquad \min_{\mathrm{rank}(B) \le k} \|A - B\|_F = \|A - A_k\|_F = \sqrt{\textstyle\sum_{i > k} \sigma_i^2}`, explain: R`Eckart–Young 정리. $\|\cdot\|_F$: 프로베니우스 노름(모든 원소 제곱합의 제곱근). 상위 $k$개 특이값을 남기는 것이 최선의 랭크 $k$ 근사이고, 오차는 버린 특이값으로 정확히 계산된다.` },
    ],
    code: R`
import numpy as np
from sklearn.decomposition import PCA
rng = np.random.default_rng(0)

A = rng.normal(size=(5, 3))
U, s, Vt = np.linalg.svd(A, full_matrices=False)
print("특이값:", s.round(3))
print("복원 일치:", np.allclose(U @ np.diag(s) @ Vt, A), "| U 직교:", np.allclose(U.T @ U, np.eye(3)))
print("AᵀA 고유값의 제곱근:", np.sqrt(np.linalg.eigvalsh(A.T @ A))[::-1].round(3))

# 저랭크 근사: 랭크 3 신호 + 잡음
m, n = 60, 40
signal = rng.normal(size=(m, 3)) @ rng.normal(size=(3, n))
M = signal + 0.3 * rng.normal(size=(m, n))
U, s, Vt = np.linalg.svd(M, full_matrices=False)
print("\n상위 특이값:", s[:6].round(1), "← 3개 이후 급감")
for k in [1, 3, 10]:
  Mk = U[:, :k] * s[:k] @ Vt[:k]
  err = np.linalg.norm(M - Mk)
  print(f"k={k:2d}: ‖M−M_k‖ = {err:6.2f} (공식 {np.sqrt((s[k:] ** 2).sum()):6.2f}), 원래 신호와의 오차 {np.linalg.norm(signal - Mk):6.2f}, "
        f"저장 {k * (m + n + 1)}/{m * n}")
print("→ k=3이 잡음 낀 원본보다 '원래 신호'에 더 가깝다 (잡음 제거)")

X = rng.normal(size=(300, 4)) @ rng.normal(size=(4, 4))    # PCA = 평균 뺀 데이터의 SVD
Xc = X - X.mean(0)
_, s, Vt = np.linalg.svd(Xc, full_matrices=False)
pca = PCA().fit(X)
print("\nSVD로 구한 주성분 분산:", (s ** 2 / (len(X) - 1)).round(3))
print("sklearn PCA 분산      :", pca.explained_variance_.round(3))
print("주성분 방향 일치(부호 무시):", np.allclose(np.abs(Vt), np.abs(pca.components_)))

R = np.array([[5, 5, 0, 1], [4, 5, 1, 0], [0, 1, 5, 4], [1, 0, 4, 5]], float)   # 사용자 × 영화 평점
U, s, Vt = np.linalg.svd(R)
print("\n평점 행렬 특이값:", s.round(2), "→ 취향 요인 2개(액션파/로맨스파)가 대부분")
`,
    links: [
      { to: 'ml-pca', why: 'PCA의 실제 계산 = 평균 뺀 데이터 행렬의 SVD' },
      { to: 'ai-finetune', why: 'LoRA = 가중치 변화의 저랭크 근사' },
      { to: 'ai-embedding', why: '공기 행렬의 SVD로 단어 임베딩 얻기(LSA)' },
      { to: 'math-eigen', why: '특이값 = AᵀA 고유값의 제곱근' },
      { to: 'math-matrix', why: '조건수와 최소제곱의 안정적인 계산' },
    ],
    quiz: [
      { q: '고유분해 대신 SVD가 쓰이는 대표적인 이유는?',
        options: ['SVD는 반복 없이 닫힌 식으로 구해져 고유분해보다 항상 빠르다', '정사각·대칭이 아닌 행렬을 포함해 모든 실수 행렬에 존재하기 때문', '특이값은 항상 정수라 반올림 오차 없이 정확하게 계산되기 때문', '고유분해는 대칭 행렬에서 복소수 고유값이 나와 쓸 수 없기 때문'], answer: 1,
        explain: '데이터 행렬(샘플 × 특성)은 보통 정사각이 아니다. SVD는 이런 행렬의 구조를 바로 보여 준다.' },
      { q: '특이값이 [50, 30, 0.5, 0.3, 0.1]인 행렬을 랭크 2로 근사할 때 프로베니우스 노름 오차는?',
        options: ['0 (특이값 0.5 이하는 오차로 치지 않음)', '√(0.5² + 0.3² + 0.1²) ≈ 0.59', '0.5 + 0.3 + 0.1 = 0.9', '√(50² + 30²) ≈ 58.3'], answer: 1,
        explain: 'Eckart–Young 정리에 따라 최선의 랭크 2 근사의 오차는 버린 특이값들의 제곱합의 제곱근이다. 이 행렬은 사실상 랭크 2다.' },
      { q: 'scikit-learn의 PCA가 공분산 행렬의 고유분해 대신 데이터 행렬의 SVD를 쓰는 이유로 적절한 것은?',
        options: ['SVD로 구한 주성분이 고유분해보다 분산을 더 많이 설명해서', 'XᵀX를 만들면 조건수가 제곱되어 수치 오차가 커질 수 있어서', '공분산 행렬의 고유분해는 특성 수가 많으면 존재하지 않아서', 'SVD는 데이터를 중심화하지 않아도 같은 결과를 주기 때문'], answer: 1,
        explain: '수학적으로 같은 결과(주성분, 분산)를 주지만 수치적 안정성이 다르다.' },
    ],
    resources: ['Gilbert Strang, "Singular Value Decomposition" (MIT 18.06 강의)', 'Steve Brunton, "Singular Value Decomposition" 영상 시리즈', 'Koren, Bell, Volinsky, "Matrix Factorization Techniques for Recommender Systems" (2009)', 'Deisenroth 외, 『Mathematics for Machine Learning』 4장'],
  },
  {
    id: 'math-deriv', title: '미분과 편미분',
    summary: R`미분 = 입력을 조금 바꿀 때 출력이 바뀌는 비율 = <strong>국소 선형 근사</strong>
편미분: 나머지 변수는 고정
수치 미분은 검증용(그래디언트 검사)`,
    body: R`
<h3>미분 = 순간 변화율</h3>
<p>$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$. 평균 변화율에서 구간을 0으로 줄인 것이다. 의미는 <strong>국소 선형 근사</strong>다: $x$ 근처에서 $f(x + h) \approx f(x) + f'(x)\,h$. 즉 "$x$를 $h$만큼 움직이면 $f$는 대략 $f'(x)h$만큼 바뀐다". 학습에서 가중치를 조금 바꿀 때 손실이 어떻게 변할지 예측하는 근거가 바로 이 근사다.</p>
<ul>
<li>$f'(x) &gt; 0$: 증가 중, $f'(x) &lt; 0$: 감소 중, $f'(x) = 0$: 평평한 점(극소, 극대 또는 안장점 후보).</li>
<li>이계도함수 $f''(x)$는 기울기의 변화율, 즉 <strong>휘어짐(곡률)</strong>이다. $f'' &gt; 0$이면 아래로 볼록해 평평한 점이 극소다.</li>
</ul>
<h3>자주 쓰는 미분</h3>
<table><tr><th>함수</th><th>도함수</th><th>ML에서</th></tr>
<tr><td>$x^n$</td><td>$n x^{n-1}$</td><td>제곱 오차 $(y - \hat y)^2$</td></tr>
<tr><td>$e^x$</td><td>$e^x$</td><td>소프트맥스</td></tr>
<tr><td>$\ln x$</td><td>$1/x$</td><td>로그 우도, 교차 엔트로피</td></tr>
<tr><td>$\sigma(x) = 1/(1+e^{-x})$</td><td>$\sigma(x)(1 - \sigma(x))$</td><td>시그모이드 (최대 0.25 → 기울기 소실)</td></tr>
<tr><td>$\max(0, x)$</td><td>$x &gt; 0$이면 1, $x &lt; 0$이면 0</td><td>ReLU (0에서는 미분 불가, 관례로 0 사용)</td></tr></table>
<p>합의 미분은 미분의 합, 상수배는 그대로(선형성). 곱과 몫에는 곱의 법칙·몫의 법칙, 합성 함수에는 연쇄법칙을 쓴다.</p>
<h3>편미분과 그래디언트</h3>
<p>$f(x, y)$에서 $\partial f / \partial x$는 <strong>$y$를 고정하고</strong> $x$로만 미분한 것이다. 각 입력 방향으로의 기울기를 모은 벡터가 그래디언트 $\nabla f = (\partial f/\partial x, \partial f/\partial y)$다. 가중치가 100만 개인 모델의 그래디언트는 100만 차원 벡터로, "각 가중치를 조금 올리면 손실이 얼마나 바뀌는가"를 한 번에 알려 준다. 입력도 출력도 벡터인 함수의 편미분을 모은 행렬은 <strong>야코비안</strong>이다.</p>
<h3>수치 미분: 검증용</h3>
<p>정의대로 작은 $h$를 넣어 근사할 수 있다. 앞쪽 차분 $\frac{f(x+h) - f(x)}{h}$의 오차는 $O(h)$, 중앙 차분 $\frac{f(x+h) - f(x-h)}{2h}$의 오차는 $O(h^2)$이다(테일러 전개에서 짝수 차 항이 상쇄). 하지만 $h$를 너무 작게 하면 거의 같은 두 부동소수점 수를 빼는 과정에서 <strong>반올림 오차</strong>가 커진다. 그래서 중앙 차분은 $h \approx 10^{-5}$ 근처가 적당하다. 파라미터마다 함수를 두 번 계산해야 해 학습에 쓰기엔 너무 느리고, 역전파 구현이 맞는지 확인하는 <strong>그래디언트 검사</strong>에 쓴다.</p>`,
    analogy: R`<p>자동차 속도계. 서울에서 부산까지 평균 속력(평균 변화율)과 달리, 속도계는 "지금 이 순간" 1초 뒤에 얼마나 더 갈지를 알려 준다(순간 변화율). 편미분은 산에서 <strong>동쪽으로만 한 걸음</strong>, <strong>북쪽으로만 한 걸음</strong> 갔을 때 각각 얼마나 오르는지 재는 것이다.</p>`,
    diagram: { caption: '미분 = 접선의 기울기. x 근처에서 함수는 접선으로 잘 근사된다. h가 작을수록 할선의 기울기가 접선의 기울기에 가까워진다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="e" d="M40,190 H520 M60,200 V20"/>
<path class="h" d="M70,185 Q200,175 280,120 T470,25" style="fill:none;stroke-width:2.5"/>
<path class="ha" d="M140,183 L420,57"/><text x="428" y="68" class="st sm">접선: 기울기 f′(x)</text>
<path class="e d" d="M232,140 L460,30"/><text x="468" y="46" class="st sm">할선 (h 큼)</text>
<circle class="h" cx="280" cy="120" r="5"/><text x="280" y="140" class="sm">x</text>
<circle class="n" cx="395" cy="68" r="4"/><text x="410" y="85" class="sm">x + h</text>
<path class="e d" d="M280,120 H395 V68"/><text x="335" y="112" class="sm">h</text><text x="420" y="100" class="sm">≈ f′(x)·h</text>
<text x="150" y="60" class="sm">f(x + h) ≈ f(x) + f′(x) h</text>
</svg>` },
    math: [
      { tex: R`f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}, \qquad f(x + h) = f(x) + f'(x)\,h + \tfrac12 f''(x)\,h^2 + O(h^3)`, explain: R`정의와 테일러 전개. 일차까지만 남긴 것이 선형 근사, 이차까지 남기면 곡률까지 반영한 근사가 된다(뉴턴 방법의 기초).` },
      { tex: R`\frac{f(x+h) - f(x-h)}{2h} = f'(x) + \frac{f'''(x)}{6}\,h^2 + O(h^4)`, explain: R`중앙 차분. 두 테일러 전개를 빼면 $h^2$ 항이 사라져 오차가 $O(h^2)$가 된다. 실제로는 부동소수점 반올림 오차(약 $\varepsilon/h$, $\varepsilon \approx 10^{-16}$)와의 균형으로 최적의 $h$가 정해진다.` },
      { tex: R`\sigma'(x) = \sigma(x)\big(1 - \sigma(x)\big) \le \tfrac14`, explain: R`시그모이드의 도함수. 최댓값이 $x = 0$에서 0.25이므로, 시그모이드 층을 여러 개 지나면 기울기가 0.25의 거듭제곱으로 줄어든다(기울기 소실).` },
    ],
    code: R`
import numpy as np

f = lambda x: x ** 3 - 2 * x
df = lambda x: 3 * x ** 2 - 2                          # 해석적 도함수
x0 = 1.5
print(f"f'({x0}) = {df(x0)}")
print(f"선형 근사: f({x0}+0.01) = {f(x0 + 0.01):.6f} ≈ f(x)+f'(x)·0.01 = {f(x0) + df(x0) * 0.01:.6f}")

print("\nh       앞쪽 차분 오차   중앙 차분 오차")
for h in [1e-1, 1e-3, 1e-5, 1e-8, 1e-11]:
  fwd = (f(x0 + h) - f(x0)) / h
  ctr = (f(x0 + h) - f(x0 - h)) / (2 * h)
  print(f"{h:<7.0e} {abs(fwd - df(x0)):14.2e}   {abs(ctr - df(x0)):14.2e}")
print("→ h를 무작정 줄이면 반올림 오차가 커진다")

sig = lambda x: 1 / (1 + np.exp(-x))
xs = np.linspace(-6, 6, 13)
print("\n시그모이드 도함수 최댓값:", (sig(xs) * (1 - sig(xs))).max(), "→ 10층을 지나면 최대", 0.25 ** 10)

g = lambda w: (w[0] - 3) ** 2 + 10 * (w[1] + 1) ** 2   # 편미분: 다른 변수는 고정
w = np.array([0.0, 0.0])
analytic = np.array([2 * (w[0] - 3), 20 * (w[1] + 1)])
numeric = np.array([(g(w + e) - g(w - e)) / 2e-5 for e in np.eye(2) * 1e-5])
print("\n그래디언트 (해석):", analytic, " (수치):", numeric.round(6))
rel = np.linalg.norm(analytic - numeric) / np.linalg.norm(analytic + numeric)
print(f"그래디언트 검사 상대 오차 {rel:.1e} → 구현이 맞다")
`,
    links: [
      { to: 'math-chain', why: '합성 함수의 미분 = 연쇄법칙' },
      { to: 'math-gradient', why: '편미분을 모은 벡터 = 그래디언트' },
      { to: 'dl-activation', why: '활성화 함수의 도함수와 기울기 소실' },
      { to: 'ca-number', why: '수치 미분의 반올림 오차 = 부동소수점의 한계' },
      { to: 'dl-backprop', why: '역전파 구현을 확인하는 그래디언트 검사' },
    ],
    quiz: [
      { q: '중앙 차분 (f(x+h) − f(x−h))/2h가 앞쪽 차분보다 정확한 이유는?',
        options: ['함수를 두 번 계산해 평균을 내므로 무작위 오차가 절반이 되어서', '테일러 전개에서 h² 항이 상쇄되어 오차가 O(h²)이 되기 때문', '간격이 2h로 두 배라 반올림 오차가 절반으로 줄어들기 때문', '앞쪽 차분은 x에서 미분 불가능한 함수에만 쓰이기 때문'], answer: 1,
        explain: 'f(x+h)와 f(x−h)의 전개를 빼면 짝수 차 항이 없어진다. 단, h가 너무 작으면 반올림 오차가 지배한다.' },
      { q: 'f(x, y) = x²y에서 ∂f/∂x는?',
        options: ['x² (y로 미분한 결과)', '2xy (y를 상수로 보고 x로 미분)', '2x (y는 x와 무관하니 사라짐)', '2xy + x² (곱의 법칙 적용)'], answer: 1,
        explain: '편미분은 나머지 변수를 고정한다. ∂f/∂y = x²이다.' },
      { q: '수치 미분이 신경망 학습에 쓰이지 않고 검증용으로만 쓰이는 이유는?',
        options: ['수치 미분은 활성화 함수처럼 꺾인 함수에서 항상 0을 돌려줘서', '파라미터마다 따로 계산해야 해서 수백만 개면 너무 느리고 근사 오차도 있어서', '수치 미분은 배치 전체가 아니라 샘플 하나에 대해서만 정의되어서', 'GPU는 h처럼 작은 값을 표현할 수 없어 결과가 모두 0이 되어서'], answer: 1,
        explain: '역전파는 한 번의 순전파·역전파로 모든 편미분을 구한다. 수치 미분은 그 결과가 맞는지 비교하는 데 쓴다.' },
    ],
    resources: ['3Blue1Brown, "Essence of Calculus" (영상 시리즈)', 'Khan Academy, Multivariable calculus — Partial derivatives', 'Stanford CS231n 강의 노트 — Gradient checking', 'Deisenroth 외, 『Mathematics for Machine Learning』 5장'],
  },
  {
    id: 'math-chain', title: '연쇄법칙',
    summary: R`합성 함수의 미분 = 단계별 <strong>미분의 곱</strong>, 여러 경로면 합
출력에서 입력 쪽으로 곱해 나가기 = <strong>역전파</strong>`,
    body: R`
<h3>한 변수</h3>
<p>$y = f(g(x))$에서 $u = g(x)$라 하면 $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$. "$x$를 조금 바꾸면 $u$가 $g'$배로 바뀌고, 그 변화가 다시 $f'$배로 $y$를 바꾼다"는 뜻이다. 변화율이 단계마다 곱해진다. 예: $y = (3x + 1)^2$이면 $u = 3x + 1$, $dy/dx = 2u \cdot 3 = 6(3x + 1)$.</p>
<h3>여러 경로: 경로마다 곱하고 모두 더한다</h3>
<p>$x$가 $u$와 $v$ 두 경로로 $y$에 영향을 준다면 $\frac{\partial y}{\partial x} = \frac{\partial y}{\partial u}\frac{\partial u}{\partial x} + \frac{\partial y}{\partial v}\frac{\partial v}{\partial x}$. 신경망에서 한 뉴런의 출력은 다음 층의 여러 뉴런으로 퍼지므로, 그 뉴런의 기울기는 다음 층에서 돌아오는 기울기들의 합이 된다. 벡터 함수로 일반화하면 <strong>야코비안 행렬의 곱</strong>이다.</p>
<h3>계산 그래프</h3>
<p>복잡한 식을 덧셈·곱셈·exp 같은 기본 연산의 그래프로 나눈다. 각 노드는 자기 입력에 대한 <strong>국소 미분</strong>만 알면 된다(곱셈 노드 $z = xy$라면 $\partial z/\partial x = y$). 전체 미분은 연쇄법칙으로 국소 미분을 이어 붙여 얻는다.</p>
<h3>순방향 모드 vs 역방향 모드</h3>
<ul>
<li><strong>순방향 모드</strong>: 입력 하나를 골라 "이 입력이 바뀌면 각 노드가 얼마나 바뀌는가"를 앞으로 전파한다. 입력 하나당 한 번 — 입력(가중치)이 100만 개면 100만 번.</li>
<li><strong>역방향 모드(역전파)</strong>: 출력 하나에서 시작해 "각 노드가 바뀌면 출력이 얼마나 바뀌는가"(수반 값, adjoint)를 뒤로 전파한다. <strong>출력 하나당 한 번</strong>으로 모든 입력에 대한 기울기를 얻는다.</li>
</ul>
<p>신경망의 학습은 "가중치 수백만 개 → 손실 스칼라 하나"이므로 역방향 모드가 압도적으로 유리하다. 비용은 순전파 계산의 작은 상수배다. 대신 역방향 계산에 필요한 중간값(활성값)을 순전파 때 저장해 두어야 해서 <strong>메모리</strong>를 많이 쓴다. PyTorch의 <code>autograd</code>, JAX의 <code>grad</code>가 이 자동 미분을 구현한다.</p>
<h3>곱이 만드는 문제</h3>
<p>층이 깊으면 기울기는 수십 개 국소 미분의 곱이다. 각 값이 1보다 작으면 기울기가 지수적으로 사라지고(시그모이드의 0.25), 1보다 크면 폭발한다. ReLU, 잔차 연결(곱 대신 덧셈 경로를 만들어 기울기가 그대로 흐르게 함), 정규화, 적절한 초기화가 모두 이 곱을 1 근처로 유지하려는 방법이다.</p>`,
    analogy: R`<p><strong>환율 계산</strong>. 원화 → 달러 → 유로로 바꿀 때, 원화가 1원 늘면 유로가 얼마나 느는지는 (원→달러 환율) × (달러→유로 환율)이다. 단계별 환율(국소 미분)만 알면 된다. 역전파는 "최종 유로 금액에 대한 각 통화의 영향"을 끝에서부터 한 번에 계산해 내려오는 방식이다.</p>`,
    diagram: { caption: '계산 그래프 위의 역전파. f = (x + y) · z, x=2, y=−1, z=3. 순전파(검정)로 값을, 역전파(파랑)로 각 입력에 대한 기울기를 구한다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<circle class="n" cx="60" cy="50" r="22"/><text x="60" y="50">x</text><text x="60" y="88" class="sm">2</text>
<circle class="n" cx="60" cy="130" r="22"/><text x="60" y="130">y</text><text x="60" y="168" class="sm">−1</text>
<circle class="h" cx="230" cy="90" r="24"/><text x="230" y="90">+</text>
<path class="a" d="M82,55 L206,85"/><path class="a" d="M82,125 L206,95"/>
<text x="230" y="130" class="sm">q = 1</text>
<circle class="n" cx="230" cy="180" r="20"/><text x="230" y="180">z</text><text x="270" y="190" class="sm">3</text>
<circle class="h" cx="400" cy="120" r="24"/><text x="400" y="120">×</text>
<path class="a" d="M254,95 L376,115"/><path class="a" d="M250,175 L378,128"/>
<path class="a" d="M424,120 H480"/><text x="510" y="120">f = 3</text>
<text x="140" y="40" class="sm" style="fill:var(--sc)">∂f/∂x = 3·1 = 3</text>
<text x="140" y="148" class="sm" style="fill:var(--sc)">∂f/∂y = 3</text>
<text x="320" y="88" class="sm" style="fill:var(--sc)">∂f/∂q = z = 3</text>
<text x="320" y="178" class="sm" style="fill:var(--sc)">∂f/∂z = q = 1</text>
<text x="510" y="145" class="sm" style="fill:var(--sc)">∂f/∂f = 1</text>
</svg>` },
    math: [
      { tex: R`\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}, \qquad \frac{\partial y}{\partial x} = \sum_{j} \frac{\partial y}{\partial u_j}\, \frac{\partial u_j}{\partial x}`, explain: R`한 경로면 곱, 여러 중간 변수 $u_j$를 거치면 경로별 곱의 합이다.` },
      { tex: R`\frac{\partial L}{\partial \mathbf x} = J_1^\top J_2^\top \cdots J_n^\top\, \frac{\partial L}{\partial \mathbf y}`, explain: R`$J_i$: $i$번째 층의 야코비안. 역전파는 오른쪽부터 벡터-야코비안 곱을 계산하므로 큰 야코비안 행렬을 실제로 만들지 않는다. 출력이 스칼라 $L$ 하나일 때 가장 효율적이다.` },
    ],
    code: R`
import math

class Value:
  """스칼라 자동 미분 (역방향 모드) — micrograd와 같은 구조의 최소 구현"""
  def __init__(self, data, parents=(), local_grads=()):
      self.data, self.grad = data, 0.0
      self.parents, self.local_grads = parents, local_grads    # 국소 미분만 기억
  def __add__(self, other):
      other = other if isinstance(other, Value) else Value(other)
      return Value(self.data + other.data, (self, other), (1.0, 1.0))
  def __mul__(self, other):
      other = other if isinstance(other, Value) else Value(other)
      return Value(self.data * other.data, (self, other), (other.data, self.data))
  def exp(self):
      e = math.exp(self.data)
      return Value(e, (self,), (e,))
  def log(self):
      return Value(math.log(self.data), (self,), (1 / self.data,))
  def backward(self):
      order, seen = [], set()
      def visit(v):                                    # 위상 정렬: 출력 → 입력 순서
          if id(v) not in seen:
              seen.add(id(v))
              for p in v.parents:
                  visit(p)
              order.append(v)
      visit(self)
      self.grad = 1.0
      for v in reversed(order):
          for p, g in zip(v.parents, v.local_grads):
              p.grad += g * v.grad                     # 연쇄법칙: 국소 미분 × 위에서 온 기울기, 경로별로 누적

x, y, z = Value(2.0), Value(-1.0), Value(3.0)
f = (x + y) * z
f.backward()
print(f"f = {f.data}, ∂f/∂x = {x.grad}, ∂f/∂y = {y.grad}, ∂f/∂z = {z.grad}")

a = Value(1.5)                                           # 여러 경로: a가 두 번 쓰인다
g = a * a + a * Value(3.0)                               # g = a² + 3a → g' = 2a + 3
g.backward()
print(f"g = a² + 3a 에서 ∂g/∂a = {a.grad} (해석해 {2 * 1.5 + 3})")

w, b, xin, label = Value(0.5), Value(-0.2), 2.0, 1.0      # 로지스틱 회귀 한 점의 손실
s = (w * xin + b) * -1.0
p_inv = s.exp() + 1.0                                    # 1/σ(z) = 1 + e^(−z)
loss = p_inv.log()                                       # −log σ(z) = log(1 + e^(−z))
loss.backward()
sig = 1 / (1 + math.exp(-(0.5 * xin - 0.2)))
print(f"\n손실 {loss.data:.4f}, ∂L/∂w = {w.grad:.4f} (공식 (σ−y)·x = {(sig - label) * xin:.4f})")

h = 1e-6                                                 # 수치 미분으로 검증
num = (math.log(1 + math.exp(-((0.5 + h) * xin - 0.2))) - math.log(1 + math.exp(-((0.5 - h) * xin - 0.2)))) / (2 * h)
print(f"수치 미분 ∂L/∂w = {num:.4f}")
`,
    links: [
      { to: 'dl-backprop', why: '역전파 = 계산 그래프 위의 역방향 연쇄법칙' },
      { to: 'math-deriv', why: '각 노드의 국소 미분' },
      { to: 'dl-activation', why: '국소 미분의 곱 → 기울기 소실·폭발' },
      { to: 'ds-graph', why: '계산 그래프의 위상 정렬' },
      { to: 'math-gradient', why: '얻은 기울기로 경사하강' },
    ],
    quiz: [
      { q: 'y = sin(x²)의 도함수는?',
        options: ['cos(x²)', 'cos(x²) · 2x', '2x · sin(x²)', 'cos(2x)'], answer: 1,
        explain: '바깥 함수 sin의 미분 cos(u)에 안쪽 함수 u = x²의 미분 2x를 곱한다.' },
      { q: '신경망 학습에서 순방향 모드보다 역방향 모드 자동 미분(역전파)이 유리한 이유는?',
        options: ['중간 활성값을 저장하지 않아 순방향 모드보다 메모리를 덜 써서', '입력은 수백만 개, 출력은 1개라 역전파 한 번에 모든 기울기를 얻어서', '역방향으로 계산하면 반올림 오차가 줄어 기울기가 더 정확해서', '역방향 모드만 비선형 활성화 함수의 미분을 계산할 수 있어서'], answer: 1,
        explain: '순방향 모드는 입력 하나당 한 번 계산해야 한다. 역방향 모드는 출력 하나당 한 번이면 된다. 대신 역방향 모드는 중간 활성값을 저장해야 해 메모리를 더 쓴다.' },
      { q: '한 변수가 계산 그래프에서 두 곳에 쓰일 때, 그 변수의 기울기는?',
        options: ['두 경로 중 큰 쪽의 기울기', '두 경로에서 돌아온 기울기의 합', '두 경로 기울기의 곱', '두 경로 기울기의 평균'], answer: 1,
        explain: '다변수 연쇄법칙은 경로별 곱의 합이다. 그래서 구현에서 기울기를 대입하지 않고 누적(+=)한다.' },
    ],
    resources: ['Andrej Karpathy, "The spelled-out intro to neural networks and backpropagation: building micrograd" (영상)', 'Stanford CS231n, "Backpropagation, Intuitions" 강의 노트', 'Baydin et al., "Automatic Differentiation in Machine Learning: a Survey" (2018)', '3Blue1Brown, "Backpropagation calculus"'],
  },
  {
    id: 'math-gradient', title: '그래디언트와 경사하강',
    summary: R`그래디언트 = <strong>가장 가파르게 증가</strong>하는 방향, 등고선에 수직
반대로 조금씩 이동 = 경사하강
수렴 좌우: 학습률·곡률(조건수)·볼록성`,
    body: R`
<h3>왜 가장 가파른 방향인가</h3>
<p>단위 벡터 $\mathbf u$ 방향으로 조금 움직일 때의 변화율(방향 미분)은 $\nabla f \cdot \mathbf u = \|\nabla f\|\cos\theta$다. 이 값은 $\mathbf u$가 그래디언트와 같은 방향($\theta = 0$)일 때 최대, 반대 방향일 때 최소(가장 빨리 감소), 수직일 때 0이다. 그래서 그래디언트는 <strong>등고선에 수직</strong>이고, 크기는 그 방향의 기울기다.</p>
<h3>경사하강법</h3>
<p>$\mathbf w \leftarrow \mathbf w - \eta \nabla L(\mathbf w)$. 현재 위치의 선형 근사만 믿고 한 걸음 내려간다. 선형 근사는 가까운 곳에서만 정확하므로 걸음 크기 <strong>학습률 $\eta$</strong>가 중요하다.</p>
<ul>
<li>너무 작으면 수렴이 매우 느리다.</li>
<li>너무 크면 골짜기를 건너뛰어 진동하거나 발산한다. 이차 함수 $\frac12\mathbf w^\top A\mathbf w$에서는 $\eta &lt; 2/\lambda_{\max}$일 때만 수렴한다($\lambda_{\max}$: 가장 큰 곡률).</li>
</ul>
<h3>손실 지형</h3>
<ul>
<li><strong>볼록 함수</strong>(선형 회귀의 MSE, 로지스틱 회귀의 로그 손실): 극소점이 곧 전역 최소점이라, 적절한 학습률이면 어디서 시작해도 최솟값에 간다.</li>
<li><strong>비볼록 함수</strong>(신경망): 여러 극소점과 안장점이 있다. 고차원에서는 나쁜 극소점보다 <strong>안장점</strong>(어떤 방향으로는 오르막, 다른 방향으로는 내리막)과 평평한 구간이 더 흔한 장애물로 여겨진다. 그래도 실제로는 경사하강이 충분히 좋은 해를 찾는 경우가 많다.</li>
<li><strong>조건수</strong>: 방향마다 곡률이 크게 다르면(길고 좁은 골짜기) 가파른 방향에 맞춰 학습률을 작게 해야 하고, 완만한 방향으로는 거의 움직이지 못해 지그재그로 느리게 수렴한다. 특성 스케일링, 정규화 층, 모멘텀·Adam 같은 적응적 방법이 이 문제를 완화한다.</li>
</ul>
<h3>확률적 경사하강 (SGD)</h3>
<p>전체 데이터의 손실 그래디언트는 각 샘플 그래디언트의 평균이다. 데이터가 수백만 개면 한 걸음에 전체를 계산하기 비싸므로, 무작위로 뽑은 <strong>미니배치</strong>의 평균 그래디언트로 근사한다. 기댓값은 전체 그래디언트와 같고(불편 추정), 분산은 배치 크기에 반비례한다. 잡음 때문에 경로가 흔들리지만 한 걸음이 훨씬 싸서 같은 시간에 훨씬 많이 움직이고, 이 잡음이 날카로운 극소점을 벗어나는 데 도움이 된다는 설명도 있다.</p>
<h3>멈추는 곳</h3>
<p>그래디언트가 0인 점(정류점)은 극소, 극대, 안장점 중 하나다. 어느 것인지는 이계도함수 행렬(헤시안)의 고유값 부호로 판별한다: 모두 양수면 극소, 부호가 섞이면 안장점.</p>`,
    analogy: R`<p>짙은 안개 속에서 산을 내려가기. 멀리는 안 보이지만 발밑의 경사(그래디언트)는 느낄 수 있다. 가장 가파른 내리막으로 한 걸음씩 간다. 보폭(학습률)이 너무 크면 계곡을 뛰어넘어 맞은편 비탈로 올라가 버리고, 너무 작으면 해가 질 때까지 못 내려간다. 좁고 긴 협곡에서는 양쪽 벽 사이를 지그재그로 오가며 느리게 내려간다.</p>`,
    diagram: { caption: '등고선과 경사하강. 그래디언트는 등고선에 수직이다. 곡률이 방향마다 다르면(타원) 경로가 지그재그가 된다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<g transform="translate(280,105)">
  <ellipse class="e" rx="240" ry="90" style="fill:none"/><ellipse class="e" rx="180" ry="66" style="fill:none"/><ellipse class="e" rx="120" ry="44" style="fill:none"/><ellipse class="e" rx="60" ry="22" style="fill:none"/>
  <circle class="h" r="5"/><text x="0" y="40" class="sm">최소점</text>
  <path class="ha" d="M-200,-45 L-170,40 L-135,-30 L-105,25 L-75,-18 L-50,12 L-30,-6"/>
  <circle class="n" cx="-200" cy="-45" r="5"/><text x="-205" y="-58" class="sm">시작</text>
  <path class="a" d="M150,-38 L185,-62"/><text x="200" y="-70" class="sm">∇L (등고선에 수직)</text>
</g>
<text x="280" y="200" class="sm">세로 방향(가파름)에 맞춘 작은 학습률 → 가로 방향(완만함)으로는 느리게 진행</text>
</svg>` },
    math: [
      { tex: R`D_{\mathbf u} f = \nabla f \cdot \mathbf u = \|\nabla f\| \cos\theta \quad\Rightarrow\quad \arg\min_{\|\mathbf u\|=1} D_{\mathbf u} f = -\frac{\nabla f}{\|\nabla f\|}`, explain: R`방향 미분. 코시-슈바르츠 부등식에 의해 그래디언트의 반대 방향이 가장 빠르게 감소하는 방향이다.` },
      { tex: R`\mathbf w_{t+1} = \mathbf w_t - \eta\, \nabla L(\mathbf w_t), \qquad L = \tfrac12 \mathbf w^\top A \mathbf w \text{ 에서 수렴 조건: } 0 < \eta < \frac{2}{\lambda_{\max}(A)}`, explain: R`이차 함수에서 각 고유벡터 방향의 성분은 매 걸음 $(1 - \eta\lambda_i)$배가 된다. 이 절댓값이 모두 1보다 작아야 수렴한다. 가장 느린 방향은 $\lambda_{\min}$ 방향이어서 조건수 $\lambda_{\max}/\lambda_{\min}$이 클수록 느리다.` },
      { tex: R`\nabla L(\mathbf w) = \frac1n \sum_{i=1}^n \nabla \ell_i(\mathbf w) \;\approx\; \frac1{|B|} \sum_{i \in B} \nabla \ell_i(\mathbf w)`, explain: R`미니배치 $B$로 근사한 확률적 그래디언트. 기댓값은 전체 그래디언트와 같고, 분산은 $1/|B|$에 비례한다.` },
    ],
    code: R`
import numpy as np

A = np.diag([1.0, 20.0])                              # 곡률: 가로 1, 세로 20 (조건수 20)
L = lambda w: 0.5 * w @ A @ w
grad = lambda w: A @ w
print("수렴 한계 학습률 2/λmax =", 2 / 20)
for lr in [0.01, 0.09, 0.105]:
  w = np.array([10.0, 1.0])
  for t in range(100):
      w = w - lr * grad(w)
  print(f"학습률 {lr:<5}: 100걸음 후 손실 {L(w):.3e}, 위치 {w.round(4)}")
print("→ 0.09: 세로는 금방 수렴, 가로는 (1−0.09)^100 배로 느리게 / 0.105: 발산")

g = np.array([3.0, 4.0])                              # 가장 가파른 방향 확인
angles = np.linspace(0, 2 * np.pi, 360, endpoint=False)
dirs = np.column_stack([np.cos(angles), np.sin(angles)])
best = dirs[np.argmin(dirs @ g)]
print("\n가장 빠르게 감소하는 단위 방향:", best.round(3), " = −∇f/|∇f| =", (-g / np.linalg.norm(g)).round(3))

rng = np.random.default_rng(0)                        # SGD: 미니배치 그래디언트는 전체 그래디언트의 불편 추정
n = 10_000
X = rng.normal(size=(n, 3))
y = X @ np.array([2.0, -1.0, 0.5]) + rng.normal(0, 0.5, n)
w = np.zeros(3)
full = 2 / n * X.T @ (X @ w - y)
for bs in [8, 64, 512]:
  gs = []
  for _ in range(500):
      idx = rng.integers(0, n, bs)
      gs.append(2 / bs * X[idx].T @ (X[idx] @ w - y[idx]))
  gs = np.array(gs)
  print(f"배치 {bs:3d}: 평균 {gs.mean(0).round(2)} (전체 {full.round(2)}), 표준편차 {gs.std(0).mean():.3f}")

w, lr = np.zeros(3), 0.05
for step in range(300):
  idx = rng.integers(0, n, 32)
  w -= lr * 2 / 32 * X[idx].T @ (X[idx] @ w - y[idx])
print("\nSGD(배치 32) 300걸음 후 가중치:", w.round(3), "(참값 [2, -1, 0.5])")
`,
    links: [
      { to: 'dl-optim', why: '모멘텀·Adam = 경사하강의 개선' },
      { to: 'ml-linear', why: '선형 회귀를 경사하강으로 학습' },
      { to: 'math-eigen', why: '곡률(헤시안 고유값)과 수렴 조건' },
      { to: 'math-chain', why: '그래디언트를 계산하는 방법 = 역전파' },
      { to: 'ml-feature', why: '특성 스케일링이 조건수를 줄여 학습을 빠르게 한다' },
      { to: 'math-deriv', why: '편미분을 모은 벡터' },
    ],
    quiz: [
      { q: '그래디언트 ∇f의 방향에 대해 옳은 것은?',
        options: ['함수가 가장 빠르게 감소하는 방향이며 등고선과 나란하다', '함수가 가장 빠르게 증가하는 방향이며 등고선에 수직이다', '함수가 가장 빠르게 증가하는 방향이며 등고선과 나란하다', '최솟값이 있는 지점을 곧바로 가리키는 방향이다'], answer: 1,
        explain: '그래서 손실을 줄이려면 −∇L 방향으로 움직인다. 등고선을 따라 움직이면 함숫값이 변하지 않으므로 그래디언트와 수직이다.' },
      { q: '특성 하나는 0~1, 다른 하나는 0~10,000 범위일 때 스케일링 없이 경사하강을 하면?',
        options: ['큰 특성의 기울기가 커서 학습률을 크게 잡아도 안정적으로 수렴한다', '방향마다 곡률이 크게 달라, 작은 특성 방향의 학습이 매우 느려진다', '스케일이 다르면 손실 함수가 볼록하지 않게 되어 지역 최솟값에 빠진다', '작은 특성의 계수는 업데이트되지 않고 초기값에 그대로 고정된다'], answer: 1,
        explain: '표준화하면 손실 지형이 둥글어져 같은 학습률로 모든 방향이 비슷하게 수렴한다.' },
      { q: '미니배치 SGD에서 배치 크기를 키우면?',
        options: ['그래디언트 추정의 기댓값이 바뀌어 다른 최솟값으로 향한다', '기댓값은 같고 분산(잡음)은 줄지만 한 걸음 비용이 커진다', '추정의 분산이 커져 학습 곡선이 더 크게 흔들린다', '같은 에폭에서 업데이트 횟수가 늘어 수렴이 빨라진다'], answer: 1,
        explain: '분산은 배치 크기에 반비례한다. 큰 배치는 GPU 병렬성을 잘 쓰지만, 학습률 등을 함께 조정해야 한다.' },
    ],
    resources: ['Goodfellow, Bengio, Courville, 『Deep Learning』 4·8장 (무료 공개)', 'Gabriel Goh, "Why Momentum Really Works" (Distill, 2017)', 'Sebastian Ruder, "An overview of gradient descent optimization algorithms" (2016)', '3Blue1Brown, "Gradient descent, how neural networks learn"'],
  },
  {
    id: 'math-prob', title: '확률변수와 분포', advanced: true,
    summary: R`분포의 요약: <strong>기댓값</strong>(중심) · <strong>분산</strong>(퍼짐) · 공분산(함께 움직임)
독립이면 분산이 더해짐 → 평균내면 줄어듦
조건부 확률: 정밀도 ≠ 재현율`,
    body: R`
<h3>확률변수와 분포</h3>
<ul>
<li><strong>이산</strong>: 값을 셀 수 있다(주사위, 클릭 수). 확률질량함수 $P(X = x)$의 합이 1.</li>
<li><strong>연속</strong>: 실수 값(키, 대기 시간). 확률밀도함수 $f(x)$를 구간에서 적분한 넓이가 확률이고, 한 점의 확률은 0이다. 밀도 값 자체는 1보다 클 수 있다.</li>
<li><strong>누적분포함수</strong> $F(x) = P(X \le x)$는 두 경우 모두 정의된다.</li>
</ul>
<h3>기댓값과 분산</h3>
<p>기댓값 $\mathbb E[X]$는 확률로 가중한 평균, 즉 무수히 반복했을 때의 평균값이다. <strong>선형성</strong> $\mathbb E[aX + bY] = a\mathbb E[X] + b\mathbb E[Y]$는 독립이 아니어도 항상 성립한다. 분산 $\mathrm{Var}(X) = \mathbb E[(X - \mu)^2] = \mathbb E[X^2] - \mu^2$은 평균에서 벗어난 정도의 제곱 평균이고, 표준편차는 그 제곱근(원래 단위)이다.</p>
<ul>
<li>$\mathrm{Var}(aX + b) = a^2 \mathrm{Var}(X)$: 이동은 퍼짐을 바꾸지 않고, 배율은 제곱으로 들어간다.</li>
<li>$\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2\,\mathrm{Cov}(X, Y)$. <strong>독립이면 공분산이 0</strong>이라 분산이 그냥 더해진다. 그래서 독립인 $n$개를 평균내면 분산이 $1/n$로 줄고(앙상블, 미니배치), 서로 상관된 모델을 평균내면 덜 줄어든다.</li>
</ul>
<h3>공분산과 상관계수</h3>
<p>공분산은 두 변수가 함께 평균보다 크거나 작아지는 경향이다. 단위에 따라 크기가 달라지므로 표준편차로 나눈 <strong>상관계수</strong> $\rho \in [-1, 1]$를 쓴다. 주의할 점이 두 가지 있다. 상관계수는 <strong>직선 관계만</strong> 잰다($Y = X^2$이고 $X$가 0을 중심으로 대칭이면 완벽히 관련되어 있어도 상관은 0). 그리고 상관은 인과가 아니다(아이스크림 판매와 익사 사고는 둘 다 기온과 관련).</p>
<h3>조건부 확률과 독립</h3>
<p>$P(A \mid B) = P(A \cap B) / P(B)$: $B$가 일어난 세계로 범위를 좁혀서 본 $A$의 확률이다. $P(A \mid B) = P(A)$이면 독립. 방향에 주의해야 한다. 분류 평가에서 <strong>정밀도</strong> = $P(\text{실제 양성} \mid \text{양성으로 예측})$, <strong>재현율</strong> = $P(\text{양성으로 예측} \mid \text{실제 양성})$으로 조건과 대상이 뒤바뀐 서로 다른 값이다. 둘을 잇는 것이 베이즈 정리다.</p>
<h3>자주 쓰는 분포</h3>
<table><tr><th>분포</th><th>상황</th><th>평균 / 분산</th></tr>
<tr><td>베르누이($p$)</td><td>한 번의 성공/실패 (클릭 여부)</td><td>$p$ / $p(1-p)$</td></tr>
<tr><td>이항($n, p$)</td><td>$n$번 중 성공 횟수 (다수결 정답 수)</td><td>$np$ / $np(1-p)$</td></tr>
<tr><td>포아송($\lambda$)</td><td>단위 시간당 드문 사건 수 (분당 접속)</td><td>$\lambda$ / $\lambda$</td></tr>
<tr><td>균등($a, b$)</td><td>구간 안의 모든 값이 같은 정도로</td><td>$\frac{a+b}2$ / $\frac{(b-a)^2}{12}$</td></tr>
<tr><td>정규($\mu, \sigma^2$)</td><td>작은 독립 요인이 많이 더해진 값, 측정 오차</td><td>$\mu$ / $\sigma^2$</td></tr>
<tr><td>지수($\lambda$)</td><td>다음 사건까지의 대기 시간</td><td>$1/\lambda$ / $1/\lambda^2$</td></tr>
<tr><td>라플라스($\mu, b$)</td><td>정규보다 중심이 뾰족하고 꼬리가 두꺼움 (차분 프라이버시 잡음)</td><td>$\mu$ / $2b^2$</td></tr></table>
<p>정규분포에서는 평균 ± 1, 2, 3 표준편차 안에 약 68%, 95%, 99.7%가 들어간다. 실제 데이터(소득, 파일 크기)는 꼬리가 훨씬 두꺼운 경우가 많아 정규 가정을 확인 없이 쓰면 극단값의 빈도를 과소평가한다.</p>`,
    analogy: R`<p>확률분포는 <strong>과녁에 쏜 화살 자국의 모양</strong>이다. 기댓값은 자국들의 중심, 분산은 흩어진 정도다. 여러 궁수가 서로 독립적으로 쏜 자국의 평균은 한 명의 자국보다 중심에 모이지만, 모두 같은 바람(공통 요인)을 맞고 쏘면 평균을 내도 함께 한쪽으로 치우친다(양의 공분산).</p>`,
    diagram: { caption: '정규분포와 라플라스분포(분산을 같게 맞춤). 정규분포에서 ±1σ, ±2σ 안에 약 68%, 95%가 들어간다. 라플라스는 중심이 뾰족하고 꼬리가 두껍다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="e" d="M30,180 H530"/>
<path class="h" d="M50,179 C150,178 200,40 280,40 C360,40 410,178 510,179" style="fill:none;stroke-width:2.5"/>
<path class="n" d="M50,176 C180,170 250,60 280,22 C310,60 380,170 510,176" style="fill:none;stroke-width:2;stroke-dasharray:5 3"/>
<path class="e d" d="M230,180 V75 M330,180 V75 M180,180 V150 M380,180 V150"/>
<text x="280" y="198" class="sm">μ</text><text x="230" y="198" class="sm">−1σ</text><text x="330" y="198" class="sm">+1σ</text><text x="180" y="198" class="sm">−2σ</text><text x="380" y="198" class="sm">+2σ</text>
<path class="ha" d="M232,120 H328"/><text x="280" y="112" class="sm">68%</text>
<path class="a" d="M182,160 H378"/><text x="280" y="155" class="sm">95%</text>
<text x="440" y="60" class="sm">── 정규</text><text x="440" y="78" class="sm">- - 라플라스</text>
</svg>` },
    math: [
      { tex: R`\mathbb E[X] = \sum_x x\,P(X=x) \;\;\text{또는}\;\; \int x f(x)\,dx, \qquad \mathrm{Var}(X) = \mathbb E[X^2] - (\mathbb E[X])^2`, explain: R`이산이면 합, 연속이면 적분. 분산의 두 번째 식은 계산할 때 편리하다.` },
      { tex: R`\mathrm{Var}\Big(\frac1n\sum_{i=1}^n X_i\Big) = \frac{\sigma^2}{n} + \frac{n-1}{n}\,\rho\,\sigma^2`, explain: R`분산이 $\sigma^2$이고 모든 쌍의 상관계수가 $\rho$인 $n$개 변수의 평균. 독립($\rho = 0$)이면 $\sigma^2/n$으로 줄지만, $\rho &gt; 0$이면 아무리 많이 평균내도 $\rho\sigma^2$ 아래로 내려가지 않는다(배깅·랜덤 포레스트가 트리 간 상관을 줄이려는 이유).` },
      { tex: R`\rho_{XY} = \frac{\mathrm{Cov}(X, Y)}{\sigma_X \sigma_Y}, \qquad \mathrm{Cov}(X, Y) = \mathbb E[(X - \mu_X)(Y - \mu_Y)]`, explain: R`$-1 \le \rho \le 1$. $\pm 1$은 완벽한 직선 관계, 0은 직선 관계가 없음(독립이라는 뜻은 아님).` },
      { tex: R`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`, explain: R`조건부 확률. 정밀도 $= TP/(TP + FP)$는 "양성 예측" 조건, 재현율 $= TP/(TP + FN)$은 "실제 양성" 조건이다.` },
    ],
    code: R`
import numpy as np
from math import comb
rng = np.random.default_rng(0)

die = rng.integers(1, 7, 100_000)
print(f"주사위: 평균 {die.mean():.3f} (이론 3.5), 분산 {die.var():.3f} (이론 {35 / 12:.3f})")

X, Y = rng.normal(0, 1, 100_000), rng.normal(0, 2, 100_000)
print(f"독립: Var(X+Y) = {np.var(X + Y):.2f} ≈ 1 + 4")
Z = X + 0.5 * rng.normal(size=X.size)                      # X와 상관된 변수
print(f"상관: Var(X+Z) = {np.var(X + Z):.2f} = Var X + Var Z + 2Cov = {np.var(X) + np.var(Z) + 2 * np.cov(X, Z)[0, 1]:.2f}")

for rho in [0.0, 0.3]:                                     # 상관된 모델 n개 평균의 분산
  n = 50
  cov = np.full((n, n), rho) + (1 - rho) * np.eye(n)
  preds = rng.multivariate_normal(np.zeros(n), cov, 20_000)
  print(f"상관 {rho}: 모델 {n}개 평균의 분산 {preds.mean(1).var():.3f} (공식 {1 / n + (n - 1) / n * rho:.3f})")

x = rng.uniform(-1, 1, 10_000)
print(f"\nY = X² (X는 0 대칭): 상관계수 {np.corrcoef(x, x ** 2)[0, 1]:.3f} ← 완벽히 관련되어도 0")

p, m = 0.6, 5                                              # 이항분포: 5번 중 3번 이상 정답일 확률
exact = sum(comb(m, k) * p ** k * (1 - p) ** (m - k) for k in range(3, m + 1))
sim = (rng.binomial(m, p, 100_000) >= 3).mean()
print(f"이항: P(5번 중 3번 이상) 공식 {exact:.4f}, 시뮬레이션 {sim:.4f}")

g = rng.normal(0, 1, 1_000_000)
print("정규 ±1,2,3σ 비율:", [round(float(np.mean(np.abs(g) < k)), 4) for k in (1, 2, 3)])
lap = rng.laplace(0, 1 / np.sqrt(2), 1_000_000)            # 분산 1로 맞춘 라플라스
print(f"|값| > 3 의 비율: 정규 {np.mean(np.abs(g) > 3):.4f}, 라플라스 {np.mean(np.abs(lap) > 3):.4f} (꼬리가 두껍다)")

actual = rng.random(10_000) < 0.1                          # 조건부 확률: 정밀도 vs 재현율
pred = np.where(actual, rng.random(10_000) < 0.9, rng.random(10_000) < 0.05)
print(f"\n재현율 P(예측+|실제+) = {pred[actual].mean():.3f}, 정밀도 P(실제+|예측+) = {actual[pred].mean():.3f}")
`,
    links: [
      { to: 'ml-metrics', why: '정밀도·재현율 = 조건 방향이 다른 조건부 확률' },
      { to: 'ml-ensemble', why: '독립·상관된 모델 평균의 분산' },
      { to: 'math-bayes', why: 'P(A|B)와 P(B|A)를 잇는 베이즈 정리' },
      { to: 'math-clt', why: '표본평균의 분포와 중심극한정리' },
      { to: 'sec-deid', why: '차분 프라이버시의 라플라스 잡음' },
      { to: 'math-mle', why: '분포의 모수를 데이터로 추정하기' },
    ],
    quiz: [
      { q: '서로 독립인 X(분산 4)와 Y(분산 9)에 대해 Var(X − Y)는?',
        options: ['−5 (4 − 9)', '13 (4 + 9)', '5 (|4 − 9|)', '√13 (√(4 + 9))'], answer: 1,
        explain: 'Var(X − Y) = Var X + (−1)² Var Y − 2Cov = 4 + 9 − 0 = 13. 빼도 불확실성은 커진다.' },
      { q: '두 변수의 상관계수가 0이라면?',
        options: ['두 변수는 반드시 서로 독립인 관계다', '직선 관계가 없을 뿐, 비선형으로는 관련될 수 있다', '한쪽이 커질 때 다른 쪽은 반드시 작아진다', '두 변수 중 하나는 분산이 0인 상수여야 한다'], answer: 1,
        explain: '독립 → 상관 0은 맞지만 역은 일반적으로 성립하지 않는다(다변량 정규분포 같은 특수한 경우 제외).' },
      { q: '정확도가 비슷하지만 서로 상관이 높은 모델 100개를 평균낸 앙상블의 효과가 기대보다 작은 이유는?',
        options: ['100개로는 부족하고 1,000개 이상이어야 분산이 줄기 시작해서', '평균의 분산이 σ²/n + (n−1)/n·ρσ²라 ρσ² 아래로 안 줄어서', '정확도가 비슷한 모델을 평균내면 편향이 커져 분산 감소를 상쇄해서', '모델 수가 늘수록 과적합이 심해져 테스트 성능이 오히려 떨어져서'], answer: 1,
        explain: '그래서 배깅은 부트스트랩 샘플로, 랜덤 포레스트는 특성 무작위 선택으로 트리 간 상관을 낮춘다.' },
    ],
    resources: ['Joseph Blitzstein & Jessica Hwang, 『Introduction to Probability』 (무료 공개, Harvard Stat 110)', 'Seeing Theory (Brown University, 확률·통계 시각화 사이트)', 'Khan Academy, Statistics and probability', 'Deisenroth 외, 『Mathematics for Machine Learning』 6장'],
  },
  {
    id: 'math-bayes', title: '베이즈 정리',
    summary: R`<strong>사후 ∝ 가능도 × 사전</strong>: 증거로 믿음 갱신
$P(A|B) \ne P(B|A)$ → 차이를 메우는 것은 기저율
활용: 나이브 베이즈 · 정규화(MAP)`,
    body: R`
<h3>식과 각 항의 의미</h3>
<p>$P(H \mid D) = \dfrac{P(D \mid H)\,P(H)}{P(D)}$. $H$는 가설(병이 있다, 스팸이다, 모수가 이 값이다), $D$는 관측한 데이터다.</p>
<ul>
<li><strong>사전확률</strong> $P(H)$: 데이터를 보기 전의 믿음(유병률, 스팸 비율).</li>
<li><strong>가능도</strong> $P(D \mid H)$: 가설이 참이라면 이 데이터가 나올 확률.</li>
<li><strong>증거</strong> $P(D) = \sum_h P(D \mid h)P(h)$: 모든 가설에 걸친 정규화 상수.</li>
<li><strong>사후확률</strong> $P(H \mid D)$: 데이터를 본 뒤의 믿음.</li>
</ul>
<p>정리 자체는 조건부 확률의 정의 $P(H \cap D) = P(D \mid H)P(H) = P(H \mid D)P(D)$를 변형한 것뿐이다. 힘은 "결과로부터 원인을 추론"하게 해 준다는 데 있다.</p>
<h3>기저율의 함정</h3>
<p>유병률 1%인 질병에 대해 민감도(환자를 양성으로) 99%, 특이도(정상인을 음성으로) 95%인 검사가 있다. 양성이 나왔을 때 실제로 병이 있을 확률은? 1만 명 중 환자 100명에서 양성 99명, 정상인 9,900명에서 위양성 495명. 양성 594명 중 환자는 99명, 약 <strong>16.7%</strong>다. "정확도 99% 검사"라는 말과 직관이 크게 어긋나는 이유는 드문 사건에서 위양성의 절대 수가 진양성보다 많기 때문이다. 이상 탐지·사기 탐지처럼 양성이 드문 문제에서 정밀도가 낮게 나오는 것과 같은 원리다. 그래서 1차 검사 후 재검사(새 사전확률 16.7%에서 다시 갱신)를 한다.</p>
<h3>순차적 갱신</h3>
<p>오늘의 사후는 내일의 사전이 된다. 동전의 앞면 확률 $p$에 대한 믿음을 베타 분포 $\mathrm{Beta}(\alpha, \beta)$로 두면, 앞면 $k$번·뒷면 $n-k$번을 본 뒤의 사후는 $\mathrm{Beta}(\alpha + k, \beta + n - k)$다(켤레 사전분포). 데이터가 쌓일수록 사전의 영향은 줄고 분포는 좁아진다. A/B 테스트에서 "B의 전환율이 A보다 높을 확률"을 직접 계산할 때 쓰인다.</p>
<h3>나이브 베이즈 분류기</h3>
<p>$P(\text{클래스} \mid \text{단어들}) \propto P(\text{클래스}) \prod_j P(\text{단어}_j \mid \text{클래스})$. 클래스가 주어지면 특성들이 서로 독립이라고 "순진하게" 가정해 곱으로 쓴다. 가정은 거의 틀리지만(단어들은 서로 연관됨), 학습이 빈도 세기뿐이라 빠르고 적은 데이터에서도 분류 순위는 꽤 잘 맞아 스팸 필터의 고전적 방법이 되었다. 확률값 자체는 과신하는 경향이 있다. 학습 데이터에 없던 단어 때문에 곱이 0이 되지 않도록 빈도에 1을 더하는 라플라스 스무딩을 쓰고, 작은 확률의 곱이 언더플로하지 않도록 로그를 더한다.</p>
<h3>MAP와 정규화</h3>
<p>모수 $\mathbf w$의 사후를 최대화하는 MAP 추정은 $\arg\max_{\mathbf w} [\log P(D \mid \mathbf w) + \log P(\mathbf w)]$이다. 첫 항은 MLE의 목표(손실의 음수)이고, 둘째 항이 사전에서 오는 벌점이다.</p>
<ul>
<li>가중치에 평균 0의 <strong>가우시안 사전</strong> → $\log P(\mathbf w) = -\|\mathbf w\|_2^2 / 2\tau^2 + $ 상수 → <strong>L2 정규화(릿지)</strong>.</li>
<li><strong>라플라스 사전</strong> → $-\|\mathbf w\|_1 / b$ → <strong>L1 정규화(라쏘)</strong>. 0에서 뾰족한 사전이라 많은 가중치가 정확히 0이 된다.</li>
</ul>
<p>"가중치는 아마 작을 것"이라는 믿음이 곧 정규화이고, 사전이 좁을수록($\tau$가 작을수록) 정규화가 강하다.</p>`,
    analogy: R`<p><strong>의사의 진단</strong>. 기침(데이터)은 폐렴 환자에게 흔하지만(가능도가 큼), 감기 환자는 훨씬 많다(사전확률). 그래서 기침만으로는 감기일 가능성이 더 높다. 엑스레이라는 새 증거가 나오면 그 결과로 다시 판단을 갱신한다. "폐렴이면 기침을 한다"와 "기침을 하면 폐렴이다"는 전혀 다른 확률이다.</p>`,
    diagram: { caption: '기저율의 함정. 유병률 1%, 민감도 99%, 특이도 95%인 검사에서 1만 명 중 양성은 594명이고, 그중 실제 환자는 99명(16.7%)이다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<rect class="n" x="200" y="10" width="160" height="34" rx="6"/><text x="280" y="27">1만 명</text>
<path class="a" d="M240,44 L130,72"/><path class="a" d="M320,44 L430,72"/>
<rect class="h" x="60" y="74" width="140" height="34" rx="6"/><text x="130" y="91" class="sm">환자 100명 (1%)</text>
<rect class="g" x="360" y="74" width="140" height="34" rx="6"/><text x="430" y="91" class="sm">정상 9,900명</text>
<path class="a" d="M110,108 L70,135"/><path class="a" d="M150,108 L190,135"/><path class="a" d="M410,108 L370,135"/><path class="a" d="M450,108 L490,135"/>
<rect class="h" x="20" y="137" width="100" height="30" rx="5"/><text x="70" y="152" class="sm">양성 99</text>
<rect class="n" x="140" y="137" width="100" height="30" rx="5"/><text x="190" y="152" class="sm">음성 1</text>
<rect class="h" x="320" y="137" width="100" height="30" rx="5" style="fill-opacity:.5"/><text x="370" y="152" class="sm">위양성 495</text>
<rect class="n" x="440" y="137" width="110" height="30" rx="5"/><text x="495" y="152" class="sm">음성 9,405</text>
<text x="280" y="195" style="fill:var(--sc)">P(환자 | 양성) = 99 / (99 + 495) ≈ 16.7%</text>
</svg>` },
    math: [
      { tex: R`P(H \mid D) = \frac{P(D \mid H)\, P(H)}{\sum_{h} P(D \mid h)\, P(h)} \;\propto\; \underbrace{P(D \mid H)}_{\text{가능도}}\;\underbrace{P(H)}_{\text{사전}}`, explain: R`분모는 가설과 무관한 정규화 상수라, 가설들을 비교할 때는 분자만 보면 된다.` },
      { tex: R`p \sim \mathrm{Beta}(\alpha, \beta),\ \ k \text{ 성공} / n \text{ 시행} \;\Rightarrow\; p \mid D \sim \mathrm{Beta}(\alpha + k,\ \beta + n - k)`, explain: R`베타-이항 켤레. 사후 평균은 $(\alpha + k)/(\alpha + \beta + n)$으로, 사전 평균과 관측 비율 $k/n$의 가중 평균이다. $\alpha, \beta$는 "미리 본 가상의 성공·실패 횟수"로 해석된다.` },
      { tex: R`\hat{\mathbf w}_{\text{MAP}} = \arg\min_{\mathbf w}\ \frac{1}{2\sigma^2}\|\mathbf y - X\mathbf w\|^2 + \frac{1}{2\tau^2}\|\mathbf w\|^2 \;=\; \text{릿지}\Big(\alpha = \frac{\sigma^2}{\tau^2}\Big)`, explain: R`가우시안 잡음(분산 $\sigma^2$)과 가우시안 사전(분산 $\tau^2$)을 둔 선형 회귀의 MAP. 양변에 $2\sigma^2$를 곱하면 릿지의 목적 함수 $\|\mathbf y - X\mathbf w\|^2 + \alpha\|\mathbf w\|^2$와 같다.` },
    ],
    code: R`
import numpy as np
from sklearn.linear_model import Ridge
rng = np.random.default_rng(0)

prev, sens, spec = 0.01, 0.99, 0.95                       # 기저율의 함정
post = sens * prev / (sens * prev + (1 - spec) * (1 - prev))
print(f"P(병 | 양성) = {post:.3f}")
post2 = sens * post / (sens * post + (1 - spec) * (1 - post))
print(f"재검사도 양성이면 (사전 {post:.3f}에서 갱신) = {post2:.3f}")
sick = rng.random(1_000_000) < prev
positive = np.where(sick, rng.random(sick.size) < sens, rng.random(sick.size) < 1 - spec)
print(f"시뮬레이션 100만 명: {sick[positive].mean():.3f}")

a, b = 1, 1                                               # 베타-이항: 클릭률에 대한 믿음의 갱신
for clicks, views in [(3, 10), (25, 100), (240, 1000)]:
  pa, pb = a + clicks, b + views - clicks
  draws = rng.beta(pa, pb, 100_000)
  lo, hi = np.quantile(draws, [0.025, 0.975])
  print(f"클릭 {clicks:3d}/{views:4d}: 사후 평균 {pa / (pa + pb):.3f}, 95% 신용구간 [{lo:.3f}, {hi:.3f}]")

A = rng.beta(1 + 120, 1 + 1000 - 120, 200_000)            # A/B: P(B의 전환율 > A의 전환율)
B = rng.beta(1 + 145, 1 + 1000 - 145, 200_000)
print(f"\nA 120/1000, B 145/1000 → P(p_B > p_A | 데이터) ≈ {np.mean(B > A):.3f}")

spam = ["무료 당첨 클릭", "무료 쿠폰 지금 클릭", "당첨 축하 무료"]      # 나이브 베이즈
ham = ["회의 자료 공유", "내일 회의 시간", "자료 검토 부탁"]
vocab = sorted({w for d in spam + ham for w in d.split()})
def word_logprob(docs):
  counts = np.array([sum(d.split().count(w) for d in docs) for w in vocab]) + 1   # 라플라스 스무딩
  return np.log(counts / counts.sum())
lp_spam, lp_ham = word_logprob(spam), word_logprob(ham)
def classify(text):
  idx = [vocab.index(w) for w in text.split() if w in vocab]
  s = np.log(0.5) + lp_spam[idx].sum()                  # 로그로 더해 언더플로 방지
  h = np.log(0.5) + lp_ham[idx].sum()
  return f"스팸 확률 {1 / (1 + np.exp(h - s)):.3f}"
for t in ["무료 쿠폰 당첨", "회의 자료 부탁", "무료 회의 자료"]:
  print(f"'{t}': {classify(t)}")

X = rng.normal(size=(30, 5))                              # MAP(가우시안 사전) = 릿지
y = X @ np.array([1.0, 0, 0, -2, 0]) + rng.normal(0, 1.0, 30)
sigma2, tau2 = 1.0, 0.25
w_map = np.linalg.solve(X.T @ X / sigma2 + np.eye(5) / tau2, X.T @ y / sigma2)
w_ridge = Ridge(alpha=sigma2 / tau2, fit_intercept=False).fit(X, y).coef_
print("\nMAP :", w_map.round(4), "\n릿지:", w_ridge.round(4))
`,
    links: [
      { to: 'ml-regularization', why: 'L2·L1 정규화 = 가우시안·라플라스 사전의 MAP 추정' },
      { to: 'math-prob', why: '조건부 확률의 정의에서 바로 나오는 정리' },
      { to: 'ml-metrics', why: '양성이 드물면 정밀도가 낮아지는 이유(기저율)' },
      { to: 'math-mle', why: '사전이 없는(균등한) MAP = MLE' },
      { to: 'math-test', why: '빈도주의 p-value와 베이즈 사후확률의 차이' },
      { to: 'ai-pretrain', why: '선호 학습에서 쓰는 확률 모델' },
    ],
    quiz: [
      { q: '사기 거래 비율이 0.1%인데 탐지 모델의 재현율 99%, 위양성률 1%다. 경고가 뜬 거래가 실제 사기일 확률에 가장 가까운 것은?',
        options: ['약 99%', '약 9%', '약 50%', '약 1%'], answer: 1,
        explain: '10만 건 중 사기 100건에서 경고 99건, 정상 99,900건에서 위경고 999건. 경고의 대부분은 위양성이다. 기저율이 낮으면 정밀도가 떨어진다.' },
      { q: '릿지 회귀의 L2 벌점을 베이즈 관점에서 해석하면?',
        options: ['가중치가 일정 범위 안에서 모두 같은 확률이라는 균등 사전', '가중치가 0 근처일 것이라는 평균 0 가우시안 사전을 둔 MAP 추정', '가중치 대부분이 정확히 0이라는 라플라스 사전을 둔 MAP 추정', '데이터 잡음이 없다고 가정한 최대 가능도 추정'], answer: 1,
        explain: '로그 가우시안 밀도가 −‖w‖²/2τ²이므로 L2 벌점이 된다. τ가 작을수록(믿음이 강할수록) 정규화가 강하다. 라플라스 사전은 L1(라소)에 해당한다.' },
      { q: '나이브 베이즈에서 "나이브"한 가정은?',
        options: ['모든 클래스의 사전확률이 서로 같다고 본다', '클래스가 주어지면 특성들이 서로 조건부 독립이다', '모든 특성이 클래스별로 정규분포를 따른다', '특성들이 클래스와 상관없이 서로 독립이다'], answer: 1,
        explain: '이 가정 덕분에 결합 확률이 각 특성 확률의 곱이 되어 학습이 빈도 세기로 끝난다. 가정이 틀려도 분류 순위는 괜찮은 경우가 많지만, 확률값은 과신하기 쉽다.' },
    ],
    resources: ['3Blue1Brown, "Bayes theorem, the geometry of changing beliefs"', 'Allen Downey, 『Think Bayes』 (무료 공개, 파이썬 예제)', 'Blitzstein & Hwang, 『Introduction to Probability』 2장', 'Bishop, 『Pattern Recognition and Machine Learning』 1·3장'],
  },
  {
    id: 'math-mle', title: '최대우도추정(MLE)',
    summary: R`관측 데이터가 나올 확률이 가장 큰 모수 선택
손실 함수 = 분포 가정의 NLL: MSE ↔ 가우시안, BCE ↔ 베르누이
데이터가 적으면 극단적 → MAP`,
    body: R`
<h3>확률과 가능도</h3>
<p>같은 식 $P(D \mid \theta)$를 두 방향으로 읽는다. $\theta$를 고정하고 $D$에 대한 함수로 보면 확률이고, 데이터 $D$를 고정하고 $\theta$에 대한 함수로 보면 <strong>가능도</strong> $L(\theta)$다. 가능도는 $\theta$에 대한 확률분포가 아니므로 적분해도 1이 아니다. 동전을 10번 던져 앞면 7번이 나왔을 때 $L(p) = \binom{10}{7} p^7 (1-p)^3$을 최대화하는 $p$는 0.7이다.</p>
<h3>로그 가능도</h3>
<p>데이터가 독립이면 가능도는 각 샘플 확률의 곱이다. 수천 개의 작은 확률을 곱하면 컴퓨터에서 0이 되고(언더플로), 곱은 미분하기도 불편하다. 로그는 증가 함수라 최대점이 같으므로 <strong>로그 가능도의 합</strong>을 최대화하고, 관례상 부호를 바꿔 <strong>음의 로그 가능도(NLL)를 최소화</strong>한다. 이것이 손실 함수다.</p>
<h3>손실 함수는 분포 가정에서 나온다</h3>
<ul>
<li><strong>MSE ↔ 가우시안</strong>: $y = f(\mathbf x) + \varepsilon$, $\varepsilon \sim \mathcal N(0, \sigma^2)$이면 NLL $= \frac{1}{2\sigma^2}\sum(y_i - f(\mathbf x_i))^2 + $ 상수. 그래서 MSE 최소화는 잡음이 정규분포라는 가정의 MLE다. 이상치가 많으면(꼬리가 두꺼운 잡음) 이 가정이 맞지 않아, 라플라스 잡음에 해당하는 MAE나 Huber 손실이 더 강건하다.</li>
<li><strong>BCE ↔ 베르누이</strong>: $y \in \{0, 1\}$, $P(y = 1) = \hat p$이면 NLL $= -\sum[y\log\hat p + (1-y)\log(1-\hat p)]$. 로지스틱 회귀의 손실이다.</li>
<li><strong>교차 엔트로피 ↔ 범주형</strong>: 소프트맥스 출력 $\hat p_k$에 대해 NLL $= -\sum_i \log \hat p_{i, y_i}$. LLM의 다음 토큰 예측 손실이 이것이다.</li>
</ul>
<h3>대표적인 MLE 결과</h3>
<ul>
<li>베르누이의 $\hat p$ = 성공 비율. 포아송의 $\hat\lambda$ = 표본평균.</li>
<li>정규분포의 $\hat\mu$ = 표본평균, $\hat\sigma^2 = \frac1n\sum(x_i - \bar x)^2$. 이 분산 추정은 평균을 같은 데이터로 추정했기 때문에 실제보다 작게 나오는 경향이 있다(편향, 기댓값이 $\frac{n-1}{n}\sigma^2$). 그래서 표본분산은 $n - 1$로 나눈다.</li>
</ul>
<h3>좋은 성질과 한계</h3>
<p>데이터가 많아지면 MLE는 일반적인 조건에서 참값으로 수렴하고(일치성), 분포도 정규에 가까워진다. 하지만 데이터가 적으면 극단적이다. 동전을 3번 던져 3번 다 앞면이면 MLE는 $\hat p = 1$, "뒷면은 절대 안 나온다"고 결론 내린다. 모수가 많은 모델에서 이것이 과적합이다. 사전분포를 더한 MAP(정규화), 또는 검증 데이터로 하는 조기 종료가 이를 완화한다.</p>`,
    analogy: R`<p><strong>범인 추리</strong>. 현장에 남은 증거(데이터)를 보고, 용의자(모수 후보) 각각에 대해 "이 사람이 범인이라면 이런 증거가 남을 가능성이 얼마나 되나"(가능도)를 따져 가장 그럴듯한 사람을 고른다. 증거가 하나뿐이면 성급한 결론이 나올 수 있어, 평소의 정황(사전 지식)을 함께 고려하는 것이 MAP다.</p>`,
    diagram: { caption: '동전 10번 중 앞면 7번을 관측했을 때 p에 대한 가능도. 최대점은 관측 비율 0.7이다. 같은 비율이라도 데이터가 많으면(100번 중 70번) 곡선이 좁아져 추정이 확실해진다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="e" d="M50,180 H520 M50,180 V20"/>
<text x="50" y="198" class="sm">0</text><text x="285" y="198" class="sm">0.5</text><text x="379" y="198" class="sm">0.7</text><text x="520" y="198" class="sm">1</text><text x="540" y="183" class="sm">p</text>
<path class="n" d="M50,180 C200,178 260,60 379,60 C450,60 480,170 520,180" style="fill:none;stroke-width:2.5"/>
<path class="h" d="M50,180 C300,180 330,30 379,30 C420,30 440,180 520,180" style="fill:none;stroke-width:2.5"/>
<path class="e d" d="M379,180 V25"/>
<text x="180" y="110" class="sm">7 / 10 (넓다)</text><text x="460" y="70" class="sm" style="fill:var(--sc)">70 / 100 (좁다)</text>
<text x="379" y="16" class="sm">최대우도 p̂ = 0.7</text>
<text x="80" y="35" class="sm">가능도 (최댓값을 1로 맞춤)</text>
</svg>` },
    math: [
      { tex: R`\hat\theta_{\text{MLE}} = \arg\max_\theta \prod_{i=1}^n p(x_i \mid \theta) = \arg\min_\theta\ -\sum_{i=1}^n \log p(x_i \mid \theta)`, explain: R`독립 동일 분포 가정. 로그는 단조 증가라 최대점이 같고, 곱이 합이 되어 계산과 미분이 쉬워진다.` },
      { tex: R`-\log \mathcal N(y \mid \hat y, \sigma^2) = \frac{(y - \hat y)^2}{2\sigma^2} + \tfrac12\log(2\pi\sigma^2)`, explain: R`$\sigma$가 고정이면 둘째 항은 상수이므로 NLL 최소화 = 제곱 오차 최소화다.` },
      { tex: R`\hat\mu = \bar x, \qquad \hat\sigma^2_{\text{MLE}} = \frac1n \sum (x_i - \bar x)^2, \qquad \mathbb E\big[\hat\sigma^2_{\text{MLE}}\big] = \frac{n-1}{n}\sigma^2`, explain: R`정규분포의 MLE. 분산 추정은 아래쪽으로 편향되어 있어, 불편 추정량은 $n-1$로 나눈 표본분산 $s^2$이다.` },
    ],
    code: R`
import numpy as np
from scipy.optimize import minimize_scalar
rng = np.random.default_rng(0)

k, n = 7, 10                                             # 동전: 가능도를 p에 대한 함수로 보기
ps = np.linspace(0.01, 0.99, 99)
loglik = k * np.log(ps) + (n - k) * np.log(1 - ps)
print(f"격자에서 최대가 되는 p = {ps[np.argmax(loglik)]:.2f} (공식 k/n = {k / n})")
print("곱으로 계산한 가능도(1000개 샘플):", np.prod(np.full(1000, 0.3)), "← 언더플로 → 로그 합을 쓴다")

x = rng.normal(5.0, 2.0, 50)                             # 정규분포 MLE
nll = lambda mu: -np.sum(-0.5 * ((x - mu) / 2.0) ** 2)
mu_hat = minimize_scalar(nll).x
print(f"\n수치 최적화 μ̂ = {mu_hat:.4f}, 표본평균 = {x.mean():.4f}")

sig2 = 4.0                                               # 분산 MLE의 편향
for m in [3, 10, 100]:
  s = rng.normal(0, 2.0, (100_000, m))
  print(f"n={m:3d}: E[σ̂²_MLE] ≈ {s.var(axis=1, ddof=0).mean():.3f} (이론 {(m - 1) / m * sig2:.3f}), "
        f"E[s²(n−1로 나눔)] ≈ {s.var(axis=1, ddof=1).mean():.3f}")

X = rng.normal(size=200)                                 # MSE = 가우시안 NLL (같은 최적점)
y = 3 * X + rng.normal(0, 1, 200)
mse = lambda w: np.mean((y - w * X) ** 2)
gauss_nll = lambda w: np.sum((y - w * X) ** 2 / 2 + 0.5 * np.log(2 * np.pi))
print(f"\nMSE 최적 w = {minimize_scalar(mse).x:.4f}, 가우시안 NLL 최적 w = {minimize_scalar(gauss_nll).x:.4f}")

labels = rng.integers(0, 2, 100)                         # BCE = 베르누이 NLL
p_hat = np.clip(0.5 + 0.3 * (labels - 0.5) + rng.normal(0, 0.1, 100), 0.01, 0.99)
bce = -np.mean(labels * np.log(p_hat) + (1 - labels) * np.log(1 - p_hat))
bern_nll = -np.mean(np.log(np.where(labels == 1, p_hat, 1 - p_hat)))
print(f"BCE {bce:.6f} = 베르누이 NLL {bern_nll:.6f}")

print("\n3번 던져 3번 앞면: MLE p̂ =", 3 / 3, "/ MAP(Beta(2,2) 사전) =", (3 + 1) / (3 + 2), "← 데이터가 적을 때 사전이 극단을 막는다")
`,
    links: [
      { to: 'ml-linear', why: '가우시안 잡음 가정에서 MSE 최소화 = MLE' },
      { to: 'ml-logistic', why: '베르누이 분포의 MLE = BCE 최소화' },
      { to: 'ai-pretrain', why: '다음 토큰 예측 = 범주형 분포의 MLE' },
      { to: 'math-bayes', why: '사전을 더한 MAP = 정규화' },
      { to: 'math-info', why: '교차 엔트로피와 NLL의 관계' },
      { to: 'math-ci', why: '표본분산을 n−1로 나누는 이유와 추정의 불확실성' },
    ],
    quiz: [
      { q: '회귀에서 이상치가 많아 잡음 분포의 꼬리가 두꺼울 때, MSE 대신 MAE(절대 오차)를 쓰는 것을 MLE 관점에서 설명하면?',
        options: ['MAE는 기울기가 일정해 학습률을 따로 정하지 않아도 되므로', 'MSE는 가우시안, MAE는 라플라스 잡음을 가정한 MLE라서', 'MAE는 이상치를 자동으로 찾아 학습 데이터에서 제외해 주므로', 'MSE는 잡음이 없다고, MAE는 잡음이 있다고 가정한 MLE라서'], answer: 1,
        explain: '−log 라플라스 밀도는 |y − ŷ|/b + 상수다. 손실 선택은 잡음에 대한 가정의 선택이다.' },
      { q: '확률을 곱하는 대신 로그 가능도의 합을 최대화하는 이유가 아닌 것은?',
        options: ['로그는 증가 함수라 최대가 되는 점이 같다', '작은 확률을 많이 곱하면 언더플로가 생긴다', '곱보다 합이 미분하기 쉽다', '로그를 취하면 최적점이 더 좋은 쪽으로 옮겨 간다'], answer: 3,
        explain: '로그는 단조 증가 변환이므로 최적점은 그대로다. 계산의 안정성과 편리함 때문에 쓴다.' },
      { q: '정규분포 분산의 MLE(n으로 나눔)가 실제 분산보다 작게 나오는 경향이 있는 이유는?',
        options: ['n으로 나누면 소수점 반올림이 누적되어 값이 작아지기 때문', '평균을 같은 데이터로 추정해, 데이터가 추정 평균 주위에 더 모여 보이기 때문', '정규분포는 꼬리가 얇아 표본에 극단값이 거의 포함되지 않기 때문', '분산의 MLE는 표준편차의 MLE를 제곱한 값이라 편향이 두 번 생기기 때문'], answer: 1,
        explain: '표본평균은 편차제곱합을 최소화하는 점이라, 참 평균으로 잰 편차제곱합보다 항상 작거나 같다. n−1로 나누면 편향이 없어진다.' },
    ],
    resources: ['Bishop, 『Pattern Recognition and Machine Learning』 1.2절', 'Goodfellow 외, 『Deep Learning』 5.5절 (최대우도추정)', 'StatQuest, "Maximum Likelihood, clearly explained" (영상)', 'Kevin Murphy, 『Probabilistic Machine Learning: An Introduction』 4장 (무료 공개)'],
  },
  {
    id: 'math-clt', title: '중심극한정리와 표본분포', advanced: true,
    summary: R`표본평균도 표본마다 흔들리는 확률변수, 퍼짐 = <strong>표준오차 σ/√n</strong>
원래 분포와 무관하게 평균은 <strong>정규분포</strong>에 근사(분산 유한, 독립일 때)`,
    body: R`
<h3>표본평균도 흔들린다</h3>
<p>모집단에서 30명을 뽑아 평균 키를 재면, 다시 30명을 뽑을 때마다 값이 조금씩 다르다. 이 "표본마다 달라지는 통계량의 분포"가 <strong>표본분포</strong>다. 표본평균의 기댓값은 모평균 $\mu$이고(불편), 표준편차는 $\sigma/\sqrt n$이다. 이를 <strong>표준오차(SE)</strong>라 부른다. 데이터 하나하나의 흩어짐(σ)과 평균 추정값의 흩어짐(SE)은 다른 개념이다.</p>
<p>$\sqrt n$에 주의하자. 오차를 절반으로 줄이려면 표본이 <strong>4배</strong> 필요하다. 여론조사의 오차 범위, A/B 테스트에 필요한 사용자 수, 몬테카를로 시뮬레이션의 정확도가 모두 이 법칙을 따른다.</p>
<h3>대수의 법칙</h3>
<p>독립 동일 분포에서 $n \to \infty$이면 표본평균은 모평균으로 수렴한다. 카지노가 장기적으로 반드시 돈을 버는 이유이고, 미니배치 그래디언트의 평균이 전체 그래디언트를 근사하는 근거다. "앞에서 손해 봤으니 이제 이길 차례"(도박사의 오류)는 아니다. 앞의 결과가 상쇄되는 것이 아니라, 많은 새 결과 속에 희석되는 것이다.</p>
<h3>중심극한정리</h3>
<p>평균 $\mu$, 유한한 분산 $\sigma^2$을 갖는 독립 동일 분포에서 표본평균을 표준화한 $\frac{\bar X - \mu}{\sigma/\sqrt n}$의 분포는 $n$이 커지면 표준정규분포에 가까워진다. <strong>원래 분포의 모양과 상관없이</strong> — 주사위(균등), 대기 시간(지수, 한쪽으로 치우침), 클릭 여부(베르누이) 모두 그렇다. 많은 작은 독립 요인이 더해진 양(측정 오차, 키)이 정규분포에 가까운 이유도 여기에 있다.</p>
<ul>
<li><strong>얼마나 커야 하나</strong>: 원래 분포가 대칭이면 작은 $n$에서도 잘 맞고, 심하게 치우쳤거나 꼬리가 두꺼우면 훨씬 큰 $n$이 필요하다. "30 이상이면 된다"는 흔한 경험칙일 뿐 보장이 아니다. 클릭률처럼 $p$가 아주 작은 베르누이는 $np$가 충분히 커야 한다.</li>
<li><strong>조건이 깨지면</strong>: 분산이 무한한 분포(코시 분포)는 표본평균이 수렴하지 않고, 평균을 내도 원래 분포와 같은 코시 분포다. 독립이 아닌 데이터(시계열, 같은 사용자의 반복 행동)는 실제 SE가 공식보다 커서, 공식을 그대로 쓰면 불확실성을 과소평가한다.</li>
</ul>
<h3>왜 중요한가</h3>
<p>원래 분포를 몰라도 "평균은 대략 정규분포를 따르고 퍼짐은 $\sigma/\sqrt n$"이라는 사실 하나로, 평균에 대한 신뢰구간을 만들고(±1.96 SE), 두 집단 평균의 차이가 우연인지 검정할 수 있다. 통계적 추론 대부분이 이 위에 서 있다.</p>`,
    analogy: R`<p>주사위 한 개를 던지면 1~6이 고르게 나온다(평평한 분포). 두 개의 평균은 3.5 근처가 더 잦아 삼각형이 되고, 30개의 평균은 거의 언제나 3~4 사이에 모이는 종 모양이 된다. 개별 값은 들쭉날쭉해도 <strong>많이 모아 평균을 내면 극단이 서로 상쇄</strong>되기 때문이다. 단, 가끔 천문학적인 값이 튀어나오는 주사위(코시)라면 평균도 안정되지 않는다.</p>`,
    diagram: { caption: '지수분포(오른쪽으로 치우침)에서 뽑은 표본의 평균 분포. n이 커질수록 종 모양에 가까워지고 폭은 σ/√n으로 좁아진다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<g transform="translate(20,0)">
  <path class="e" d="M0,170 H150"/>
  <path class="n" d="M5,40 C20,90 40,130 70,150 C100,163 130,168 150,169" style="fill:none;stroke-width:2.5"/>
  <text x="75" y="190" class="sm">n = 1 (원래 분포)</text>
</g>
<g transform="translate(200,0)">
  <path class="e" d="M0,170 H150"/>
  <path class="g" d="M10,169 C30,150 40,70 60,70 C85,70 100,140 150,168" style="stroke-width:2.5;fill-opacity:.4"/>
  <text x="75" y="190" class="sm">n = 5 (아직 치우침)</text>
</g>
<g transform="translate(380,0)">
  <path class="e" d="M0,170 H150"/>
  <path class="h" d="M30,169 C55,165 60,30 75,30 C90,30 95,165 120,169" style="stroke-width:2.5;fill-opacity:.4"/>
  <text x="75" y="190" class="sm">n = 30 (거의 정규, 좁다)</text>
</g>
<text x="280" y="20" class="sm">표본평균 X̄ 의 분포: 평균 μ, 표준오차 σ/√n</text>
</svg>` },
    math: [
      { tex: R`\mathbb E[\bar X] = \mu, \qquad \mathrm{SE}(\bar X) = \sqrt{\mathrm{Var}(\bar X)} = \frac{\sigma}{\sqrt n}`, explain: R`독립 동일 분포 가정. 독립인 $n$개 합의 분산은 $n\sigma^2$이고, $n$으로 나누면 분산은 $n^2$으로 나뉜다.` },
      { tex: R`\frac{\bar X_n - \mu}{\sigma / \sqrt n} \;\xrightarrow{d}\; \mathcal N(0, 1) \qquad (n \to \infty,\ \sigma^2 < \infty)`, explain: R`중심극한정리. $\xrightarrow{d}$는 분포 수렴. 유한한 $n$에서는 근사이며, 근사의 정확도는 원래 분포의 치우침(왜도)에 크게 좌우된다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

def skew(a):
  a = a - a.mean()
  return float((a ** 3).mean() / a.std() ** 3)

mu, sigma = 1.0, 1.0                                    # 지수분포(1): 평균 1, 표준편차 1, 왜도 2
print("지수분포에서 뽑은 표본평균 10만 개의 분포")
for n in [1, 5, 30, 200]:
  means = rng.exponential(1.0, (100_000, n)).mean(axis=1)
  z = (means - mu) / (sigma / np.sqrt(n))
  print(f"n={n:3d}: 평균 {means.mean():.3f}, 표준편차 {means.std():.4f} (σ/√n = {sigma / np.sqrt(n):.4f}), "
        f"왜도 {skew(means):5.2f}, 꼬리 P(Z>1.96) {np.mean(z > 1.96):.3f} / P(Z<−1.96) {np.mean(z < -1.96):.3f}")
print("→ 왜도가 2/√n 로 줄고, 두 꼬리가 정규분포처럼 각각 0.025에 가까워진다")

print("\n표본 4배 → 표준오차 절반:", [round(float(rng.normal(0, 1, (20_000, n)).mean(1).std()), 4) for n in (25, 100, 400)])

flips = rng.random(100_000) < 0.5                       # 대수의 법칙
running = np.cumsum(flips) / np.arange(1, flips.size + 1)
print("\n앞면 비율:", {n: round(float(running[n - 1]), 4) for n in (10, 100, 10_000, 100_000)})

cauchy = rng.standard_cauchy(1_000_000)                 # 분산이 무한하면 성립하지 않는다
print("코시 분포의 누적 평균:", [round(float(cauchy[:n].mean()), 2) for n in (100, 10_000, 1_000_000)], "← 수렴하지 않는다")

users = np.repeat(rng.normal(0, 1, 200), 50) + rng.normal(0, 1, 10_000)   # 독립이 아닌 데이터
naive_se = users.std() / np.sqrt(users.size)
true_se = np.std([(np.repeat(rng.normal(0, 1, 200), 50) + rng.normal(0, 1, 10_000)).mean() for _ in range(2000)])
print(f"\n사용자 200명 × 50회 행동: 공식 SE {naive_se:.4f} vs 실제 SE {true_se:.4f} ← 독립 가정이 깨지면 과소평가")
`,
    links: [
      { to: 'math-ci', why: '표본평균 ± 1.96 SE = 신뢰구간의 근거' },
      { to: 'math-test', why: '검정 통계량이 정규분포를 따른다는 근사' },
      { to: 'math-prob', why: '독립 변수 합의 분산, 기댓값의 선형성' },
      { to: 'math-gradient', why: '미니배치 그래디언트 = 표본평균, 분산 ∝ 1/배치 크기' },
      { to: 'ml-cv', why: '교차 검증 점수의 평균과 표준오차' },
    ],
    quiz: [
      { q: '설문의 오차 범위를 ±4%p에서 ±2%p로 줄이려면 표본을 대략 몇 배로 늘려야 하나?',
        options: ['2배', '4배', '8배', '√2배'], answer: 1,
        explain: '오차를 1/k로 줄이려면 표본이 k²배 필요하다. 정확도를 높이는 비용이 빠르게 커지는 이유다.' },
      { q: '중심극한정리에 대해 옳은 것은?',
        options: ['표본이 크면 데이터 자체의 분포가 정규분포로 바뀐다', '분산이 유한한 iid라면 표본평균의 분포가 정규분포에 가까워진다', '어떤 분포든 n = 30이면 표본평균이 정확히 정규분포가 된다', '표본이 크면 표본분산이 0으로 수렴해 평균이 하나로 정해진다'], answer: 1,
        explain: '정규에 가까워지는 것은 데이터가 아니라 표본평균의 분포다. 필요한 n은 원래 분포의 치우침에 달려 있고, 분산이 무한하면(코시) 성립하지 않는다.' },
      { q: '한 사용자의 여러 행동 로그를 독립 샘플로 보고 표준오차를 σ/√n으로 계산하면?',
        options: ['정확하다 — 로그 수가 많을수록 σ/√n이 실제 오차에 가까워지므로', '같은 사용자의 행동은 상관되어 있어 불확실성을 과소평가하게 된다', '표준오차가 과대평가되어 실제 차이가 있어도 놓치기 쉬워진다', '사용자 수와 로그 수가 같아져 표준오차가 바뀌지 않는다'], answer: 1,
        explain: '분석 단위(사용자)로 집계하거나, 사용자 단위로 리샘플링하는 부트스트랩 등을 쓴다.' },
    ],
    resources: ['Seeing Theory — "Probability Distributions", "Central Limit Theorem" 장', 'Blitzstein & Hwang, 『Introduction to Probability』 10장', '3Blue1Brown, "But what is the Central Limit Theorem?"', 'Khan Academy, Sampling distributions'],
  },
  {
    id: 'math-ci', title: '추정과 신뢰구간', advanced: true,
    summary: R`"95% 신뢰구간" = 같은 방법으로 만든 구간의 <strong>95%가 참값 포함</strong>
σ를 모르면 t 분포 / 비율은 Wilson
공식이 없으면 <strong>부트스트랩</strong>`,
    body: R`
<h3>좋은 추정량</h3>
<ul>
<li><strong>불편성</strong>: 기댓값이 참값과 같다. 표본평균은 불편, $n$으로 나눈 분산은 편향이라 $n - 1$로 나눈다.</li>
<li><strong>효율성</strong>: 분산(흔들림)이 작다.</li>
<li><strong>일치성</strong>: 표본이 커지면 참값으로 수렴한다.</li>
</ul>
<p>편향과 분산의 합(평균제곱오차)이 작은 것이 실제로 중요하다. 정규화한 추정량처럼 약간의 편향을 받아들이고 분산을 크게 줄이는 것이 나을 때도 있다.</p>
<h3>평균의 신뢰구간</h3>
<p>중심극한정리에 의해 $\bar X$는 대략 $\mathcal N(\mu, \sigma^2/n)$을 따르므로, $\bar X \pm 1.96\,\sigma/\sqrt n$은 반복 실험에서 약 95%의 경우 $\mu$를 포함한다. 실제로는 $\sigma$를 모르니 표본표준편차 $s$로 바꾸는데, 그만큼 불확실성이 추가되므로 정규분포 대신 꼬리가 조금 더 두꺼운 <strong>t 분포</strong>(자유도 $n - 1$)의 임계값을 쓴다. $n = 10$이면 1.96 대신 2.26이다. $n$이 크면 두 값이 거의 같아진다.</p>
<h3>"95%"의 정확한 의미</h3>
<p>참값 $\mu$는 고정된 상수이고, 표본마다 달라지는 것은 <strong>구간</strong>이다. 따라서 이미 계산된 구간 [168.2, 171.8]에 대해 "$\mu$가 이 안에 있을 확률이 95%"라고 말하는 것은 빈도주의 해석에서 정확하지 않다(이미 들어 있거나 아니거나다). 정확한 말은 "이 <strong>절차</strong>로 만든 구간의 95%가 참값을 포함한다"이다. "참값이 이 구간에 있을 확률"을 직접 말하고 싶다면 베이즈의 <strong>신용구간</strong>이 그 뜻을 갖는다. 실무에서는 두 결과가 비슷하게 나오는 경우가 많지만, 해석은 구분해야 한다.</p>
<p>신뢰구간은 <strong>평균의 불확실성</strong>이지 개별 데이터의 범위가 아니다. "고객 한 명의 구매액이 이 범위에 들어갈 것"을 말하려면 훨씬 넓은 예측구간이 필요하다.</p>
<h3>비율의 신뢰구간</h3>
<p>전환율 $\hat p$에 대해 흔한 공식 $\hat p \pm 1.96\sqrt{\hat p(1 - \hat p)/n}$(Wald 구간)은 $n$이 작거나 $p$가 0이나 1에 가까우면 실제 포함률이 95%에 크게 못 미치고, 성공이 0번이면 폭이 0이 되어 버린다. 이런 경우 <strong>Wilson 구간</strong>처럼 더 정확한 방법을 쓰는 것이 권장된다.</p>
<h3>부트스트랩</h3>
<p>중앙값, 상관계수, AUC, 두 모델 성능 차이처럼 표준오차 공식이 없거나 복잡한 통계량은 어떻게 할까? 가진 표본을 모집단의 대용으로 보고, <strong>표본에서 같은 크기로 복원추출</strong>해 통계량을 다시 계산하기를 수천 번 반복한다. 그 값들의 분포의 2.5%~97.5% 분위가 백분위 부트스트랩 신뢰구간이다(Efron, 1979). 계산만으로 불확실성을 얻는 강력한 도구지만, 표본이 아주 작거나 표본이 모집단을 대표하지 못하면 잘 맞지 않고, 최댓값처럼 극단에 민감한 통계량에는 부적합하다. 데이터가 독립이 아니면(같은 사용자 반복) 사용자 단위로 리샘플링해야 한다.</p>`,
    analogy: R`<p><strong>고리 던지기</strong>. 바닥에 꽂힌 말뚝(참값)은 움직이지 않고, 던지는 고리(구간)의 위치가 매번 달라진다. "95% 신뢰구간"은 "이 던지기 방식으로 던지면 100번 중 95번은 말뚝에 걸린다"는 뜻이다. 이미 던진 고리 하나가 걸렸는지는 확률의 문제가 아니라 사실의 문제다. 고리를 크게 만들면(99%) 더 자주 걸리지만, 위치 정보는 덜 정확해진다.</p>`,
    diagram: { caption: '같은 모집단에서 뽑은 표본 20개로 만든 95% 신뢰구간들. 참값(세로선)은 고정이고, 구간은 표본마다 움직인다. 평균적으로 20개 중 1개 정도가 참값을 놓친다(빨간색).', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="ha" d="M280,10 V192"/><text x="280" y="203" class="sm">참값 μ</text>
<g style="stroke-width:3">
  <path class="e" d="M220,18 H330 M245,27 H350 M200,36 H310 M235,45 H340 M255,54 H365 M210,63 H315"/>
  <path class="e" d="M240,72 H345 M225,81 H325 M260,90 H370 M215,99 H320 M230,108 H335 M250,117 H355"/>
  <path d="M300,126 H400" style="stroke:#dc2626"/>
  <path class="e" d="M205,135 H305 M245,144 H350 M225,153 H330 M235,162 H340 M215,171 H318 M250,180 H352 M228,189 H332"/>
</g>
<text x="470" y="128" class="sm" style="fill:#dc2626">참값을 놓친 구간</text>
<text x="90" y="100" class="sm">표본마다</text><text x="90" y="116" class="sm">달라지는 구간</text>
</svg>` },
    math: [
      { tex: R`\bar x \pm t_{0.975,\,n-1}\, \frac{s}{\sqrt n}, \qquad s^2 = \frac{1}{n-1}\sum_{i=1}^n (x_i - \bar x)^2`, explain: R`평균의 95% t-신뢰구간. $t_{0.975, n-1}$: 자유도 $n-1$인 t 분포의 97.5% 분위(n=10이면 2.262, n이 크면 1.96에 가까워짐). 데이터가 대략 정규이거나 $n$이 충분히 클 때 쓴다.` },
      { tex: R`\text{Wilson: } \frac{\hat p + \frac{z^2}{2n} \pm z\sqrt{\frac{\hat p(1-\hat p)}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}}, \qquad z = 1.96`, explain: R`비율의 Wilson 신뢰구간. 성공이 0번이어도 폭이 0이 되지 않고, 작은 $n$이나 극단적인 $p$에서 Wald 구간보다 포함률이 명목 수준(95%)에 가깝다.` },
    ],
    code: R`
import numpy as np
from scipy import stats
rng = np.random.default_rng(0)

mu, n, trials = 170.0, 10, 20_000                       # 포함률 시뮬레이션: 정말 95%인가
samples = rng.normal(mu, 8.0, (trials, n))
xbar, s = samples.mean(1), samples.std(1, ddof=1)
t_crit = stats.t.ppf(0.975, n - 1)
for name, crit in [("z 1.96 + s", 1.96), (f"t {t_crit:.3f} + s", t_crit)]:
  cover = np.mean(np.abs(xbar - mu) <= crit * s / np.sqrt(n))
  print(f"n=10, {name:14s}: 참값 포함률 {cover:.3f}")
print("→ σ 대신 s를 쓰면 t 분포를 써야 95%가 맞는다")

x = samples[0]
lo, hi = stats.t.interval(0.95, n - 1, loc=x.mean(), scale=stats.sem(x))
print(f"\n표본 하나의 95% CI: [{lo:.1f}, {hi:.1f}] (이 구간은 참값을 포함하거나 안 하거나 둘 중 하나)")

def wald(k, m):
  p = k / m
  h = 1.96 * np.sqrt(p * (1 - p) / m)
  return p - h, p + h
def wilson(k, m, z=1.96):
  p = k / m
  center = (p + z ** 2 / (2 * m)) / (1 + z ** 2 / m)
  h = z * np.sqrt(p * (1 - p) / m + z ** 2 / (4 * m ** 2)) / (1 + z ** 2 / m)
  return center - h, center + h
p_true, m = 0.05, 40                                    # 전환율 5%, 방문 40명
ks = rng.binomial(m, p_true, 20_000)
for name, f in [("Wald", wald), ("Wilson", wilson)]:
  lo, hi = f(ks, m)
  print(f"{name:6s} 구간 포함률 (p=0.05, n=40): {np.mean((lo <= p_true) & (p_true <= hi)):.3f}")
print("성공 0/40일 때 Wald:", np.round(wald(0, 40), 3) + 0.0, " Wilson:", np.round(wilson(0, 40), 3) + 0.0)

income = rng.lognormal(8, 1.0, 200)                     # 부트스트랩: 중앙값의 신뢰구간
boot = np.array([np.median(rng.choice(income, income.size, replace=True)) for _ in range(5000)])
lo, hi = np.quantile(boot, [0.025, 0.975])
print(f"\n중앙값 {np.median(income):.0f}, 부트스트랩 95% CI [{lo:.0f}, {hi:.0f}] (참 중앙값 {np.exp(8):.0f})")

res = stats.bootstrap((income,), np.median, n_resamples=5000, method="percentile", random_state=0)
print("scipy.stats.bootstrap:", np.round([res.confidence_interval.low, res.confidence_interval.high], 0))
`,
    links: [
      { to: 'math-clt', why: '표본평균이 정규분포에 가깝다는 것이 신뢰구간의 근거' },
      { to: 'math-test', why: '신뢰구간과 가설 검정은 같은 정보를 다른 형태로 표현' },
      { to: 'math-bayes', why: '베이즈 신용구간: "참값이 이 구간에 있을 확률"' },
      { to: 'math-mle', why: '표본분산을 n−1로 나누는 이유(불편성)' },
      { to: 'ml-ensemble', why: '부트스트랩 = 배깅의 복원추출' },
      { to: 'ml-metrics', why: '모델 성능 지표의 불확실성을 부트스트랩으로' },
    ],
    quiz: [
      { q: '어떤 평균의 95% 신뢰구간이 [48, 52]로 계산되었다. 빈도주의 관점에서 가장 정확한 해석은?',
        options: ['참 평균이 48과 52 사이에 있을 확률이 95%다', '같은 방법으로 구간을 반복해 만들면 약 95%가 참 평균을 포함한다', '데이터의 95%가 48과 52 사이에 분포한다', '다시 표본을 뽑으면 표본평균이 95% 확률로 이 구간에 들어온다'], answer: 1,
        explain: '빈도주의에서 참값은 고정이고 구간이 확률적이다. "참 평균이 이 구간에 있을 확률 95%"는 베이즈 신용구간의 해석이다. "데이터의 95%"는 신뢰구간이 아니라 데이터 분포에 대한 말로, 개별 데이터는 훨씬 넓게 퍼져 있다. 다음 표본평균이 이 구간에 들어올 확률도 95%가 아니다.' },
      { q: '표본 10개로 평균의 95% 신뢰구간을 만들 때 1.96 대신 t 분포의 2.26을 쓰는 이유는?',
        options: ['표본이 적으면 표본평균이 참 평균보다 크게 나오는 편향이 있어서', 'σ 대신 s를 쓴 불확실성이 더해져 1.96이면 포함률이 95%에 못 미쳐서', '표본이 10개면 중심극한정리가 성립하지 않아 정규분포를 쓸 수 없어서', 't 분포는 꼬리가 얇아 1.96보다 큰 값을 써야 구간이 좁아지기 때문'], answer: 1,
        explain: '표본이 작을수록 s가 σ보다 작게 나올 가능성이 무시할 수 없어 꼬리가 두꺼운 t 분포가 필요하다. n이 커지면 t 임계값은 1.96에 가까워진다.' },
      { q: '두 모델의 AUC 차이에 대한 신뢰구간을 구할 공식이 마땅치 않을 때 쓸 수 있는 방법은?',
        options: ['두 모델의 AUC 차이에 1.96 × √(AUC×(1−AUC)/n)을 더하고 빼서 구한다', '테스트 샘플을 복원추출로 다시 뽑아 AUC 차이를 반복 계산하는 부트스트랩', '테스트 세트를 10개로 나눠 각 조각의 AUC 차이를 평균내고 표준편차를 쓴다', '두 모델을 각각 다른 리샘플로 평가해 독립 표본 t 검정으로 비교한다'], answer: 1,
        explain: '같은 리샘플에서 두 모델을 함께 평가해야 짝지어진 비교가 된다. 모델마다 다른 리샘플을 쓰면 짝이 깨져 구간이 불필요하게 넓어진다. 차이의 구간이 0을 포함하면 차이가 확실하다고 말하기 어렵다.' },
    ],
    resources: ['Bradley Efron, "Bootstrap Methods: Another Look at the Jackknife" (1979)', 'Brown, Cai, DasGupta, "Interval Estimation for a Binomial Proportion" (Statistical Science, 2001)', 'Seeing Theory — "Frequentist Inference" 장', 'SciPy 문서 — scipy.stats.bootstrap'],
  },
  {
    id: 'math-test', title: '가설 검정', advanced: true,
    summary: R`<strong>귀무가설</strong>(차이 없음) 가정 → 지금만큼 극단적인 결과의 확률 = <strong>p-value</strong>
p-value ≠ 귀무가설이 참일 확률, 효과 크기도 아님
주의: 다중 비교·중간 엿보기`,
    body: R`
<h3>절차</h3>
<ol>
<li><strong>가설 세우기</strong>: 귀무가설 $H_0$(차이 없음, 새 버튼의 전환율 = 기존 전환율)과 대립가설 $H_1$(차이 있음).</li>
<li><strong>유의수준 $\alpha$ 정하기</strong>: 보통 0.05. 데이터를 보기 <strong>전에</strong> 정한다.</li>
<li><strong>검정 통계량 계산</strong>: 관측한 차이를 "우연에 의한 흔들림(표준오차)" 단위로 잰다. 예: $z = (\hat p_B - \hat p_A)/\mathrm{SE}$.</li>
<li><strong>p-value 계산</strong>: $H_0$가 참일 때 통계량이 관측값만큼 또는 그보다 극단적으로 나올 확률.</li>
<li><strong>판단</strong>: $p \le \alpha$이면 $H_0$를 기각한다("통계적으로 유의"). 아니면 기각하지 못한다. 이것이 $H_0$가 참이라는 증명은 아니다 — 증거가 부족할 뿐이다.</li>
</ol>
<h3>두 가지 오류</h3>
<table><tr><th></th><th>$H_0$ 참 (실제 차이 없음)</th><th>$H_0$ 거짓 (실제 차이 있음)</th></tr>
<tr><td>기각함</td><td><strong>1종 오류</strong>(위양성), 확률 $\alpha$</td><td>올바른 탐지, 확률 = <strong>검정력</strong> $1 - \beta$</td></tr>
<tr><td>기각 못 함</td><td>올바른 판단</td><td><strong>2종 오류</strong>(위음성), 확률 $\beta$</td></tr></table>
<p>분류 모델의 FP·FN과 같은 구조다. $\alpha$를 낮추면 위양성은 줄지만 같은 데이터로는 진짜 효과를 놓치기 쉬워진다. 검정력은 효과 크기가 클수록, 표본이 클수록, 데이터 잡음이 작을수록 높다. 그래서 실험 전에 "이 정도 효과를 80% 검정력으로 잡으려면 표본이 몇 명 필요한가"를 계산한다(검정력 분석).</p>
<h3>p-value에 대한 흔한 오해</h3>
<ul>
<li><strong>"p = 0.03이면 귀무가설이 참일 확률이 3%다"</strong> — 아니다. p-value는 $P(\text{이만큼 극단적인 데이터} \mid H_0)$이지 $P(H_0 \mid \text{데이터})$가 아니다. 후자를 알려면 사전확률이 필요하다(베이즈 정리).</li>
<li><strong>"p가 작을수록 효과가 크다"</strong> — 아니다. 표본이 매우 크면 무의미할 만큼 작은 차이(전환율 0.01%p)도 p가 아주 작게 나온다. 반드시 <strong>효과 크기와 신뢰구간</strong>을 함께 보고, 실무적으로 의미 있는 차이인지 판단한다.</li>
<li><strong>"p &gt; 0.05면 효과가 없다"</strong> — 아니다. 표본이 작아 검정력이 부족했을 수 있다. 신뢰구간이 넓다면 "모른다"가 정확한 결론이다.</li>
</ul>
<p>미국통계학회(ASA)는 2016년 성명에서 p-value가 가설이 참일 확률이나 효과의 크기를 나타내지 않으며, 과학적 결론이 p-value가 특정 기준을 넘는지 여부에만 근거해서는 안 된다고 밝혔다.</p>
<h3>결과를 왜곡하는 습관</h3>
<ul>
<li><strong>다중 비교</strong>: 효과가 전혀 없는 지표 20개를 각각 $\alpha = 0.05$로 검정하면, 적어도 하나가 유의하게 나올 확률은 $1 - 0.95^{20} \approx 64\%$다. 미리 주요 지표를 하나로 정하거나, 본페로니 보정($\alpha/m$)이나 FDR 통제(Benjamini–Hochberg)를 쓴다.</li>
<li><strong>중간에 엿보기(peeking)</strong>: A/B 테스트 도중 매일 p-value를 보다가 0.05 아래로 내려온 날 멈추면, 실제 위양성률이 5%보다 훨씬 커진다. 표본 크기를 미리 정하거나, 순차 검정처럼 중간 확인을 고려한 방법을 쓴다.</li>
<li><strong>p-해킹</strong>: 유의한 결과가 나올 때까지 분석 방법·하위 집단·이상치 처리를 바꿔 보는 것. 분석 계획을 미리 정해 두는 것이 방어다.</li>
</ul>
<h3>대표적인 검정</h3>
<ul>
<li><strong>두 비율 비교</strong>(A/B 전환율): 두 비율의 z 검정, 또는 카이제곱 검정.</li>
<li><strong>두 평균 비교</strong>: t 검정. 분산이 다를 수 있으면 Welch의 t 검정이 안전하다. 같은 대상의 전후 비교는 대응표본 t 검정.</li>
<li><strong>범주형 변수의 독립성</strong>: 카이제곱 검정.</li>
<li><strong>분포 가정이 의심스러울 때</strong>: 순열 검정 — 집단 레이블을 무작위로 섞어 "차이가 없다면 나올 통계량의 분포"를 직접 만든다.</li>
</ul>`,
    analogy: R`<p><strong>형사 재판</strong>. 피고인은 무죄로 추정된다(귀무가설). 검사는 "무죄라면 이런 증거가 나올 가능성이 매우 낮다"(작은 p-value)를 보여 무죄 추정을 기각하려 한다. 증거가 부족하면 "무죄 판결"이지 "결백 증명"이 아니다. 무고한 사람을 유죄로(1종 오류) 만드는 것을 특히 피하려고 기준(α)을 엄격하게 둔다. 같은 사람을 20번 기소하면 언젠가는 우연히 유죄가 나올 수 있다(다중 비교).</p>`,
    diagram: { caption: '귀무가설에서의 검정 통계량 분포. 관측값보다 극단적인 꼬리의 넓이(양쪽)가 p-value다. 기각역(|z| > 1.96)의 넓이가 α = 0.05다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="e" d="M30,170 H530"/>
<path class="g" d="M40,169 C150,168 210,35 280,35 C350,35 410,168 520,169 Z" style="fill-opacity:.35"/>
<path class="h" d="M418,170 L418,139 C450,158 480,166 520,169 L520,170 Z"/>
<path class="h" d="M142,170 L142,139 C110,158 80,166 40,169 L40,170 Z"/>
<path class="e d" d="M390,170 V118 M170,170 V118"/>
<text x="280" y="190" class="sm">0 (귀무가설: 차이 없음)</text>
<text x="390" y="190" class="sm">1.96</text><text x="170" y="190" class="sm">−1.96</text>
<path class="ha" d="M440,170 V60"/><text x="470" y="52" class="sm" style="fill:var(--sc)">관측 z = 2.3</text>
<text x="490" y="125" class="sm">p/2</text><text x="70" y="125" class="sm">p/2</text>
<text x="280" y="20" class="sm">H₀가 참일 때 통계량의 분포</text>
</svg>` },
    math: [
      { tex: R`z = \frac{\hat p_B - \hat p_A}{\sqrt{\hat p(1 - \hat p)\left(\frac1{n_A} + \frac1{n_B}\right)}}, \qquad \hat p = \frac{x_A + x_B}{n_A + n_B}`, explain: R`두 비율의 z 검정. $\hat p$: 귀무가설(두 비율이 같음) 아래에서 합쳐서 추정한 공통 비율. 양측 p-value는 $2(1 - \Phi(|z|))$, $\Phi$는 표준정규 누적분포함수.` },
      { tex: R`p\text{-value} = P\big(|T| \ge |t_{\text{obs}}| \;\big|\; H_0\big) \;\ne\; P(H_0 \mid \text{데이터})`, explain: R`조건의 방향이 다르다. 오른쪽 값을 알려면 사전확률 $P(H_0)$와 대립가설에서의 가능도가 필요하다.` },
      { tex: R`P(\text{적어도 하나 위양성}) = 1 - (1 - \alpha)^m, \qquad \text{본페로니: } \alpha' = \frac{\alpha}{m}`, explain: R`$m$개의 독립적인 검정에서 모든 귀무가설이 참일 때. $m = 20$, $\alpha = 0.05$면 약 0.64. 본페로니 보정은 이 확률을 $\alpha$ 이하로 묶지만 보수적이라 검정력이 떨어진다.` },
    ],
    code: R`
import numpy as np
from scipy import stats
rng = np.random.default_rng(0)

def two_prop_z(xa, na, xb, nb):
  pa, pb, pool = xa / na, xb / nb, (xa + xb) / (na + nb)
  z = (pb - pa) / np.sqrt(pool * (1 - pool) * (1 / na + 1 / nb))
  return z, 2 * stats.norm.sf(abs(z))

z, p = two_prop_z(200, 2000, 250, 2000)                    # A 10.0% vs B 12.5%
chi2, p_chi, _, _ = stats.chi2_contingency([[200, 1800], [250, 1750]], correction=False)
print(f"A/B: z = {z:.3f}, p = {p:.4f} | 카이제곱 {chi2:.3f} (= z² {z ** 2:.3f}), p = {p_chi:.4f}")

xa, xb = 100_000, 101_500                                  # 아주 큰 표본: 작은 차이도 '유의'
z, p = two_prop_z(xa, 1_000_000, xb, 1_000_000)
print(f"표본 100만: 전환율 10.00% vs 10.15% → p = {p:.5f} (차이 0.15%p — 유의하지만 실무적 의미는 별개)")

pvals = []                                                 # 귀무가설이 참이면 p-value는 균등분포
for _ in range(5000):
  a, b = rng.normal(0, 1, 50), rng.normal(0, 1, 50)
  pvals.append(stats.ttest_ind(a, b, equal_var=False).pvalue)
pvals = np.array(pvals)
print(f"\n차이가 없을 때 p < 0.05 비율 (1종 오류율): {np.mean(pvals < 0.05):.3f}")

for effect in [0.2, 0.5]:                                  # 검정력: 효과 크기와 표본 크기
  for n in [20, 100]:
      power = np.mean([stats.ttest_ind(rng.normal(0, 1, n), rng.normal(effect, 1, n)).pvalue < 0.05 for _ in range(2000)])
      print(f"효과 {effect}σ, 집단당 {n:3d}명: 검정력 {power:.2f}")

m = 20                                                     # 다중 비교
fp = np.mean([(rng.uniform(size=m) < 0.05).any() for _ in range(20_000)])
fp_bonf = np.mean([(rng.uniform(size=m) < 0.05 / m).any() for _ in range(20_000)])
print(f"\n지표 {m}개 중 하나라도 위양성: {fp:.3f} (공식 {1 - 0.95 ** m:.3f}), 본페로니 보정 후 {fp_bonf:.3f}")

stopped = 0                                                # 중간에 엿보기
for _ in range(2000):
  a, b = rng.random(5000) < 0.1, rng.random(5000) < 0.1  # 실제로는 차이 없음
  for n in range(500, 5001, 500):                        # 500명마다 확인, 유의하면 중단
      if two_prop_z(a[:n].sum(), n, b[:n].sum(), n)[1] < 0.05:
          stopped += 1
          break
print(f"10번 엿보고 유의하면 멈출 때 위양성률: {stopped / 2000:.3f} (명목 0.05)")

a, b = rng.exponential(1.0, 40), rng.exponential(1.4, 40)  # 순열 검정
obs = b.mean() - a.mean()
pooled = np.concatenate([a, b])
perm = np.array([np.diff([s[:40].mean(), s[40:].mean()])[0] for s in (rng.permutation(pooled) for _ in range(10_000))])
print(f"\n순열 검정: 관측 차이 {obs:.3f}, p = {np.mean(np.abs(perm) >= abs(obs)):.4f}"
    f" | Welch t 검정 p = {stats.ttest_ind(b, a, equal_var=False).pvalue:.4f}")
`,
    links: [
      { to: 'ml-metrics', why: 'FP·FN = 통계적 가설 검정의 1종·2종 오류' },
      { to: 'math-ci', why: '신뢰구간이 0을 포함하지 않음 ⇔ 유의수준에서 기각' },
      { to: 'math-clt', why: '검정 통계량이 정규분포를 따른다는 근사의 근거' },
      { to: 'math-bayes', why: 'P(데이터|H₀)와 P(H₀|데이터)의 차이' },
      { to: 'se-cicd', why: '카나리·A/B 배포의 판단 = 두 집단 비율의 비교' },
      { to: 'ml-cv', why: '여러 모델·설정을 비교할 때의 다중 비교 문제' },
    ],
    quiz: [
      { q: 'A/B 테스트에서 p = 0.03이 나왔다. 올바른 해석은?',
        options: ['B가 A보다 좋을 확률이 97%다', '차이가 없다면 이만큼 큰 차이가 우연히 나올 확률이 3%다', '귀무가설이 참일 확률이 3%다', '같은 실험을 반복하면 97%에서 같은 결론이 나온다'], answer: 1,
        explain: 'p-value는 귀무가설을 가정한 조건부 확률이다. 가설의 확률을 말하려면 베이즈 분석이 필요하고, 효과의 크기는 신뢰구간으로 따로 본다.' },
      { q: '테스트 도중 매일 p-value를 확인하다가 처음으로 0.05 아래가 된 날 실험을 멈추면?',
        options: ['더 적은 표본으로 같은 위양성률의 결론을 얻을 수 있다', '우연히 기준 아래로 내려간 순간을 잡게 되어 실제 위양성률이 크게 높아진다', '위양성률은 그대로지만 검정력이 낮아져 효과를 놓치기 쉬워진다', '매일 확인하면 p-value가 점점 작아져 결국 항상 유의하게 나온다'], answer: 1,
        explain: '여러 번 확인하는 것도 다중 비교다. 표본 크기를 미리 정하거나, 중간 분석을 고려한 순차 검정을 쓴다.' },
      { q: '사용자 1,000만 명 실험에서 체류 시간이 0.1초 늘었고 p < 0.001이다. 가장 적절한 판단은?',
        options: ['p-value가 매우 작으므로 큰 성과로 보고 바로 전면 적용한다', '우연은 아닐 가능성이 높지만, 실무적으로 의미 있는지는 따로 판단해야 한다', 'p-value가 너무 작으면 실험 설계 오류이므로 결과를 버려야 한다', '효과가 0.1초뿐이니 통계적으로도 유의하지 않다고 봐야 한다'], answer: 1,
        explain: '표본이 크면 아주 작은 차이도 유의해진다. 통계적 유의성과 실무적 중요성은 다른 질문이다.' },
    ],
    resources: ['Wasserstein & Lazar, "The ASA Statement on p-Values: Context, Process, and Purpose" (The American Statistician, 2016)', 'Kohavi, Tang, Xu, 『Trustworthy Online Controlled Experiments』 (A/B 테스트 실무, 2020)', 'Evan Miller, "How Not To Run an A/B Test" (블로그, 엿보기 문제)', 'Seeing Theory — "Frequentist Inference" 장'],
  },
  {
    id: 'math-info', title: '엔트로피와 교차 엔트로피',
    summary: R`정보량 $-\log p$: 드문 사건일수록 큼, <strong>엔트로피</strong> = 평균 불확실성
교차 엔트로피 = 엔트로피 + KL 발산 → 분류 손실
정보 이득 → 결정 트리 분할`,
    body: R`
<h3>정보량: 놀람의 크기</h3>
<p>확률 $p$인 사건이 일어났을 때의 정보량은 $-\log p$다. 확실한 사건($p = 1$)은 0, 드문 사건일수록 크다. 독립 사건 두 개의 정보량은 더해진다(확률은 곱해지고, 로그는 곱을 합으로 바꾼다). 로그의 밑이 2면 단위는 <strong>비트</strong>, 자연로그면 <strong>내트</strong>다. 공정한 동전 한 번의 결과는 1비트다.</p>
<h3>엔트로피: 평균 불확실성</h3>
<p>$H(p) = -\sum_x p(x)\log p(x)$, 즉 정보량의 기댓값이다.</p>
<ul>
<li>결과가 하나로 정해져 있으면 0(불확실성 없음).</li>
<li>$k$가지 결과가 모두 같은 확률이면 최대 $\log k$(가장 예측하기 어려움).</li>
<li>의미: 그 분포에서 나온 값을 평균적으로 표현하는 데 필요한 최소 비트 수(섀넌의 원천 부호화 정리). 자주 나오는 기호에 짧은 코드를 주는 허프만 부호화가 그 예다.</li>
</ul>
<h3>교차 엔트로피와 KL 발산</h3>
<p>실제 분포는 $p$인데 모델 $q$를 믿고 있다면, 평균 놀람은 $H(p, q) = -\sum p(x)\log q(x)$다. 이 값은 언제나 $H(p)$ 이상이고, 초과분이 <strong>KL 발산</strong>이다: $H(p, q) = H(p) + D_{\mathrm{KL}}(p \,\|\, q)$.</p>
<ul>
<li>$D_{\mathrm{KL}} \ge 0$이고 $p = q$일 때만 0이다(깁스 부등식).</li>
<li><strong>대칭이 아니다</strong>: $D_{\mathrm{KL}}(p\|q) \ne D_{\mathrm{KL}}(q\|p)$. 그래서 엄밀한 의미의 거리가 아니다. $p$가 양수인 곳에서 $q$가 0에 가까우면 $D_{\mathrm{KL}}(p\|q)$는 무한히 커진다. 모델이 "절대 안 일어난다"고 한 일이 일어나면 무한히 놀라는 셈이다.</li>
<li>대칭이 필요하면 양방향을 더하거나(모집단 안정성 지수 PSI가 이 형태), 젠슨–섀넌 발산을 쓴다.</li>
</ul>
<h3>분류 손실이 교차 엔트로피인 이유</h3>
<p>분류에서 정답 분포 $p$는 정답 클래스에 1, 나머지에 0인 원-핫이다. 그러면 $H(p) = 0$이고 교차 엔트로피는 $-\log q(\text{정답})$, 즉 <strong>정답 클래스 확률의 음의 로그</strong>가 된다. 이는 범주형 분포의 음의 로그 가능도와 같다. $p$는 고정이므로 교차 엔트로피를 최소화하는 것은 KL 발산을 최소화하는 것, 즉 모델 분포를 데이터 분포에 가깝게 만드는 것이다. 정답에 0.01을 주면 손실은 4.6, 0.9를 주면 0.1로, 틀린 확신에 특히 크게 벌을 준다. 다만 확률 0에 가까운 출력에서 $\log$가 발산하므로 구현에서는 로짓에서 바로 계산하는 안정적인 함수(<code>log_softmax</code>)를 쓴다.</p>
<h3>정보 이득과 상호 정보량</h3>
<p>결정 트리는 분할 전후 엔트로피의 감소, 즉 <strong>정보 이득</strong> $H(Y) - H(Y \mid X)$가 가장 큰 특성으로 노드를 나눈다. 이 값은 $X$와 $Y$의 <strong>상호 정보량</strong>으로, "$X$를 알면 $Y$에 대한 불확실성이 얼마나 줄어드는가"다. 상관계수와 달리 비선형 관계도 잡아낸다(독립일 때만 0). 다만 값의 종류가 많은 특성(ID 같은)에 유리하게 편향되어, C4.5는 이득 비율로 보정한다.</p>`,
    analogy: R`<p><strong>스무고개</strong>. 상대가 고른 것을 맞히는 데 필요한 평균 질문 수가 엔트로피다. 동전 앞뒤면 1번, 1~8 중 하나면 3번. "답은 대부분 고양이"라는 사실을 안다면 "고양이야?"를 먼저 물어 평균 질문 수를 줄인다. 잘못된 믿음(모델 q)으로 질문 순서를 짜면 평균 질문 수가 늘어나는데, 그것이 교차 엔트로피이고 늘어난 만큼이 KL 발산이다.</p>`,
    diagram: { caption: '베르누이 분포의 엔트로피(비트). p = 0.5일 때 최대 1비트, 결과가 확실할수록(p → 0 또는 1) 0에 가까워진다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<path class="e" d="M60,180 H500 M60,180 V20"/>
<path class="h" d="M60,180 C70,100 140,30 280,30 C420,30 490,100 500,180" style="fill:none;stroke-width:2.5"/>
<text x="60" y="198" class="sm">0</text><text x="280" y="198" class="sm">0.5</text><text x="500" y="198" class="sm">1</text><text x="525" y="183" class="sm">p</text>
<text x="40" y="34" class="sm">1</text><text x="40" y="183" class="sm">0</text><text x="30" y="105" class="sm">H</text>
<path class="e d" d="M280,30 V180 M60,30 H280"/>
<circle class="h" cx="280" cy="30" r="5"/><text x="340" y="22" class="sm">최대 불확실성 (공정한 동전)</text>
<circle class="n" cx="104" cy="113" r="4"/><text x="150" y="125" class="sm">p = 0.1 → 0.47비트</text>
</svg>` },
    math: [
      { tex: R`H(p) = -\sum_x p(x)\log p(x), \qquad 0 \le H(p) \le \log k`, explain: R`$k$: 가능한 결과의 수. 최댓값은 균등분포에서. $0 \log 0 = 0$으로 정의한다.` },
      { tex: R`H(p, q) = -\sum_x p(x)\log q(x) = H(p) + D_{\mathrm{KL}}(p\,\|\,q), \qquad D_{\mathrm{KL}}(p\,\|\,q) = \sum_x p(x)\log\frac{p(x)}{q(x)} \ge 0`, explain: R`교차 엔트로피 = 엔트로피 + KL 발산. $p$가 고정(데이터 분포)이면 교차 엔트로피 최소화 = KL 최소화다.` },
      { tex: R`\mathrm{IG}(Y, X) = H(Y) - \sum_{v} P(X = v)\, H(Y \mid X = v) = I(X; Y)`, explain: R`정보 이득 = 상호 정보량. 분할 후 각 자식 노드의 엔트로피를 샘플 비율로 가중평균해 원래 엔트로피에서 뺀다.` },
    ],
    code: R`
import numpy as np

def H(p, base=2):
  p = np.asarray(p, float)
  p = p[p > 0]                                           # 0 log 0 = 0
  return float(-(p * np.log(p)).sum() / np.log(base)) + 0.0   # −0.0 방지

print("공정한 동전:", H([0.5, 0.5]), "비트 | 치우친 동전(0.9):", round(H([0.9, 0.1]), 3), "| 확실:", H([1.0]))
print("1~8 균등:", H(np.full(8, 1 / 8)), "비트 = log2(8)")

def cross_entropy(p, q):
  return float(-(np.asarray(p) * np.log(np.asarray(q))).sum())
def kl(p, q):
  p, q = np.asarray(p), np.asarray(q)
  m = p > 0
  return float((p[m] * np.log(p[m] / q[m])).sum())

p = np.array([0.7, 0.2, 0.1])                              # 참 분포
q = np.array([0.4, 0.4, 0.2])                              # 모델
print(f"\nH(p) = {H(p, np.e):.4f}, H(p,q) = {cross_entropy(p, q):.4f}, H(p)+KL = {H(p, np.e) + kl(p, q):.4f} (내트)")
print(f"KL(p||q) = {kl(p, q):.4f}, KL(q||p) = {kl(q, p):.4f} ← 대칭이 아니다")

for q_true in [0.9, 0.5, 0.01]:                            # 원-핫 정답의 교차 엔트로피 = −log q(정답)
  print(f"정답 클래스에 확률 {q_true:<4} → 손실 {-np.log(q_true):.3f}")

logits = np.array([1000.0, 0.0, -5.0])                     # 수치 안정성
with np.errstate(over="ignore", invalid="ignore"):
  naive = np.exp(logits) / np.exp(logits).sum()
log_softmax = logits - (logits.max() + np.log(np.exp(logits - logits.max()).sum()))
print("\n순진한 소프트맥스:", naive, "← exp(1000) 오버플로로 nan")
print("log_softmax (안정):", log_softmax.round(3))

y = np.array([1, 1, 1, 1, 0, 0, 0, 0, 1, 0])                # 결정 트리의 정보 이득
feature_a = np.array([1, 1, 1, 1, 0, 0, 0, 0, 0, 1])        # 레이블과 강하게 관련
feature_b = np.array([1, 0, 1, 0, 1, 0, 1, 0, 1, 0])        # 거의 무관
def info_gain(y, x):
  h_after = sum((x == v).mean() * H(np.bincount(y[x == v], minlength=2) / (x == v).sum()) for v in np.unique(x))
  return H(np.bincount(y) / len(y)) - h_after
print(f"\n정보 이득: 특성 A {info_gain(y, feature_a):.3f}비트, 특성 B {info_gain(y, feature_b):.3f}비트")

x = np.random.default_rng(0).integers(-2, 3, 10_000)        # 상호 정보량은 비선형 관계도 잡는다
y2 = x ** 2
joint = {}
for a, b in zip(x, y2):
  joint[(a, b)] = joint.get((a, b), 0) + 1
pxy = np.array(list(joint.values())) / len(x)
mi = H(np.bincount(x + 2) / len(x)) + H(np.bincount(y2) / len(x)) - H(pxy)
print(f"Y = X²: 상관계수 {np.corrcoef(x, y2)[0, 1]:.3f}, 상호 정보량 {mi:.3f}비트 (= H(Y), X를 알면 Y가 정해진다)")
`,
    links: [
      { to: 'ml-logistic', why: '교차 엔트로피 손실의 정보이론적 의미' },
      { to: 'ml-tree', why: '엔트로피와 정보 이득으로 분할 기준 정하기' },
      { to: 'math-mle', why: '교차 엔트로피 최소화 = 범주형 분포의 MLE' },
      { to: 'ai-mlops', why: 'PSI = 두 분포 사이의 대칭 KL 발산' },
      { to: 'ai-llm', why: '다음 토큰 분포의 엔트로피와 온도' },
      { to: 'ds-greedy', why: '허프만 부호화 = 엔트로피에 가까운 길이의 코드' },
    ],
    quiz: [
      { q: '분류 모델이 정답 클래스에 0.01의 확률을 줬을 때와 0.5를 줬을 때의 교차 엔트로피 손실(자연로그)은 각각 대략?',
        options: ['약 0.99와 약 0.5', '약 4.6과 약 0.69', '약 2.0과 약 0.30', '약 100과 약 2'], answer: 1,
        explain: '원-핫 정답에서 교차 엔트로피는 −log q(정답)이다. q → 0이면 손실이 무한히 커진다.' },
      { q: 'KL 발산 D(p‖q)에 대해 옳은 것은?',
        options: ['대칭이라 D(p‖q) = D(q‖p)인 거리 함수다', '항상 0 이상이고 p = q일 때만 0이지만 대칭이 아니다', 'p와 q가 다르면 음수가 될 수도 있다', '두 분포의 엔트로피 차이 H(p) − H(q)와 같다'], answer: 1,
        explain: 'p가 양수인 곳에서 q가 0에 가까우면 D(p‖q)는 매우 커진다. 대칭 지표가 필요하면 양방향 합이나 젠슨–섀넌 발산을 쓴다.' },
      { q: '결정 트리가 고객 ID처럼 값이 모두 다른 특성을 정보 이득으로 고르기 쉬운 이유는?',
        options: ['ID는 숫자형이라 분할 후보가 많아 다른 특성보다 먼저 검토되기 때문', '값마다 샘플이 하나라 분할 후 엔트로피가 0이 되어 이득이 최대가 되기 때문', 'ID는 데이터가 들어온 순서를 담고 있어 실제로 레이블과 강하게 관련되어서', '정보 이득은 값의 종류가 적은 특성에 벌점을 주도록 정의되어 있어서'], answer: 1,
        explain: '그래서 C4.5는 분할 자체의 엔트로피로 나눈 이득 비율을 쓰고, 실무에서는 ID 같은 특성을 제외한다.' },
    ],
    resources: ['Claude Shannon, "A Mathematical Theory of Communication" (1948)', 'Christopher Olah, "Visual Information Theory" (블로그, 2015)', 'Cover & Thomas, 『Elements of Information Theory』', 'Goodfellow 외, 『Deep Learning』 3.13절'],
  },
];
