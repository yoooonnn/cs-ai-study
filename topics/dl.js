TOPICS.dl = [
  {
    id: 'dl-perceptron', title: '퍼셉트론', advanced: true,
    summary: R`가중합이 기준을 넘으면 1을 내는 가장 단순한 뉴런
선형 분리 가능하면 학습 수렴 / <strong>XOR</strong>처럼 불가능하면 실패`,
    body: R`
<h3>구조</h3>
<p>퍼셉트론(Rosenblatt, 1958)은 입력 $x_1, \ldots, x_n$에 가중치를 곱해 더하고 편향을 더한 뒤, 그 값이 0보다 크면 1, 아니면 0을 출력한다. 생물학적 뉴런에서 영감을 받았지만 실제 뉴런과는 거리가 먼, <strong>선형 분류기</strong>다. $\mathbf w^\top \mathbf x + b = 0$이 입력 공간을 둘로 가르는 초평면(2차원이면 직선)이고, 가중치 벡터 $\mathbf w$는 그 초평면에 수직인 방향, 편향 $b$는 원점에서의 위치를 정한다.</p>
<h3>학습 규칙: 틀린 점 쪽으로 경계를 옮긴다</h3>
<p>샘플 하나를 보고 예측이 맞으면 아무것도 하지 않는다. 틀렸으면 $\mathbf w \leftarrow \mathbf w + \eta (y - \hat y)\mathbf x$로 고친다. 양성(1)을 0으로 틀렸다면 $\mathbf w$에 $\mathbf x$를 더해 그 점과의 내적을 키우고, 반대면 뺀다. 경계가 틀린 점을 올바른 쪽에 두는 방향으로 회전·이동하는 것이다.</p>
<p><strong>퍼셉트론 수렴 정리</strong>(Novikoff, 1962): 데이터가 어떤 초평면으로 여유(마진) $\gamma$ 이상 떨어지게 나뉠 수 있고 모든 점이 반지름 $R$ 안에 있다면, 학습 규칙이 틀리는 횟수는 최대 $(R/\gamma)^2$번이다. 즉 선형 분리 가능하면 <strong>반드시 유한 번 안에 모든 점을 맞히는</strong> 경계를 찾는다. 다만 찾는 경계는 여러 해 중 하나일 뿐 마진이 최대인 경계는 아니다(그것은 SVM이 찾는다).</p>
<h3>XOR의 벽</h3>
<p>AND와 OR은 직선 하나로 0과 1을 나눌 수 있지만, XOR((0,1)과 (1,0)은 1, (0,0)과 (1,1)은 0)은 어떤 직선으로도 나눌 수 없다. 이때 학습 규칙은 영원히 경계를 이리저리 옮길 뿐 수렴하지 않는다. Minsky와 Papert(1969)가 이런 한계를 엄밀하게 보인 뒤 신경망 연구는 한동안 침체되었다. 해법은 <strong>퍼셉트론을 여러 층으로 쌓아</strong> 입력 공간 자체를 변환하는 것이었지만, 계단 함수는 미분할 수 없어 여러 층을 학습시킬 방법이 마땅치 않았다.</p>
<h3>계단 함수에서 시그모이드로</h3>
<p>계단 함수를 매끄러운 시그모이드로 바꾸면 출력이 0~1 사이의 연속값(확률)이 되고 미분이 가능해져, 손실 함수를 정의하고 경사하강으로 학습할 수 있다. 시그모이드 출력 뉴런 하나에 교차 엔트로피 손실을 쓰면 그것이 정확히 <strong>로지스틱 회귀</strong>다. 그리고 미분 가능한 뉴런을 여러 층 쌓은 것을 역전파로 학습하는 것이 현대 신경망이다.</p>`,
    analogy: R`<p>입사 지원서 점수 매기기. 학점, 자격증, 경력에 각각 가중치를 곱해 합산하고 합격선을 넘으면 합격이다. 합격시켜야 할 사람을 떨어뜨렸다면 그 사람이 가진 항목의 가중치를 조금 올리고, 반대면 내린다. 이 규칙은 "점수 합으로 한 줄 세워 나눌 수 있는" 기준이라면 결국 찾아내지만, "학점과 경력 중 <strong>딱 하나만</strong> 좋은 사람을 뽑는다"(XOR) 같은 기준은 합산 점수 한 줄로는 표현할 수 없다.</p>`,
    diagram: { caption: '퍼셉트론: 입력의 가중합에 편향을 더하고 계단 함수를 적용한다. 결정 경계 wᵀx + b = 0은 초평면이므로 직선으로 나눌 수 있는 문제만 풀 수 있다.', svg: R`
<svg viewBox="0 0 560 200" width="560">
<circle class="n" cx="50" cy="40" r="18"/><text x="50" y="40" class="sm">x₁</text>
<circle class="n" cx="50" cy="100" r="18"/><text x="50" y="100" class="sm">x₂</text>
<circle class="n" cx="50" cy="160" r="18"/><text x="50" y="160" class="sm">x₃</text>
<circle class="h" cx="220" cy="100" r="30"/><text x="220" y="100">Σ + b</text>
<path class="a" d="M68,44 L192,92"/><path class="a" d="M68,100 H188"/><path class="a" d="M68,156 L192,108"/>
<text x="125" y="55" class="sm">w₁</text><text x="125" y="92" class="sm">w₂</text><text x="125" y="146" class="sm">w₃</text>
<rect class="n" x="285" y="78" width="70" height="44" rx="6"/><path class="he" d="M295,112 H318 V88 H345"/>
<path class="a" d="M250,100 H283"/><path class="a" d="M355,100 H385"/>
<text x="320" y="135" class="sm">계단 함수</text>
<text x="400" y="100" class="st">ŷ ∈ {0, 1}</text>
<text x="470" y="40" class="sm">AND·OR: 직선 하나로 분리 ✓</text>
<text x="470" y="160" class="sm">XOR: 직선으로 분리 불가 ✗</text>
</svg>` },
    math: [
      { tex: R`\hat y = \mathbb{1}\left[\mathbf w^\top \mathbf x + b > 0\right], \qquad \mathbf w \leftarrow \mathbf w + \eta\,(y - \hat y)\,\mathbf x,\quad b \leftarrow b + \eta\,(y - \hat y)`, explain: R`$\mathbb{1}[\cdot]$: 조건이 참이면 1. $\eta$: 학습률. 맞히면 $y - \hat y = 0$이라 갱신이 일어나지 않는다.` },
      { tex: R`\text{실수 횟수} \le \left(\frac{R}{\gamma}\right)^2, \qquad R = \max_i \lVert \mathbf x_i \rVert,\ \ \gamma = \min_i \frac{y_i' \,\mathbf w^{*\top} \mathbf x_i}{\lVert \mathbf w^* \rVert}`, explain: R`퍼셉트론 수렴 정리.<ul class="defs"><li>$\mathbf w^*$: 데이터를 완벽히 나누는 어떤 초평면</li><li>$y_i' \in \{-1, +1\}$: 부호로 바꾼 레이블</li><li>$\gamma$: 그 초평면과 가장 가까운 점 사이의 거리(마진)</li></ul>편향은 입력에 상수 1을 붙여 가중치에 포함시킨 형태로 본다.` },
    ],
    code: R`
import numpy as np

def train_perceptron(X, y, epochs=100, lr=1.0):
  w, b, mistakes = np.zeros(X.shape[1]), 0.0, 0
  for _ in range(epochs):
      errors = 0
      for xi, yi in zip(X, y):
          pred = int(w @ xi + b > 0)
          if pred != yi:                         # 틀렸을 때만 경계를 그 점 쪽으로 옮긴다
              w += lr * (yi - pred) * xi
              b += lr * (yi - pred)
              errors += 1
      mistakes += errors
      if errors == 0:                            # 한 바퀴 동안 실수가 없으면 수렴
          break
  acc = np.mean([int(w @ xi + b > 0) == yi for xi, yi in zip(X, y)])
  return w, b, acc, mistakes

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], float)
for name, y in [("AND", [0, 0, 0, 1]), ("OR", [0, 1, 1, 1]), ("XOR", [0, 1, 1, 0])]:
  w, b, acc, m = train_perceptron(X, np.array(y))
  print(f"{name}: 정확도 {acc:.0%}, 총 실수 {m:3d}회, w = {w}, b = {b}")

# 수렴 정리 확인: 마진이 있는 선형 분리 데이터
rng = np.random.default_rng(0)
w_star = np.array([1.0, -2.0])                     # 원점을 지나는 진짜 경계
P = rng.uniform(-1, 1, (2000, 2))
keep = np.abs(P @ w_star) / np.linalg.norm(w_star) > 0.05
P, labels = P[keep], (P[keep] @ w_star > 0).astype(int)
_, _, acc, m = train_perceptron(P, labels)
R = np.linalg.norm(np.c_[P, np.ones(len(P))], axis=1).max()        # 편향을 포함한 입력의 반지름
gamma = (np.abs(P @ w_star) / np.linalg.norm(w_star)).min()
print(f"분리 가능 데이터 {len(P)}개: 정확도 {acc:.0%}, 실수 {m}회 ≤ 상한 (R/γ)² = {(R / gamma) ** 2:.0f}")
`,
    links: [
      { to: 'ml-logistic', why: '계단 대신 시그모이드를 쓴 뉴런 하나 = 로지스틱 회귀' },
      { to: 'dl-mlp', why: 'XOR 문제를 푸는 방법: 층을 쌓아 공간을 변환' },
      { to: 'ml-svm', why: '같은 선형 경계지만 마진을 최대화하는 분류기' },
      { to: 'math-vector', why: '내적과 초평면 — 결정 경계의 기하학' },
      { to: 'dl-activation', why: '계단 함수를 미분 가능한 함수로 바꾸는 이유' },
    ],
    quiz: [
      { q: '단층 퍼셉트론이 XOR 문제를 풀 수 없는 근본 이유는?',
        options: ['학습률이 너무 작아 정해진 반복 안에 경계에 도달하지 못하기 때문', '결정 경계가 직선 하나인데, XOR은 어떤 직선으로도 나눌 수 없기 때문', '샘플이 4개뿐이라 가중치를 정할 정보가 부족해 해가 여러 개이기 때문', '입력이 0과 1뿐이라 가중치 갱신량이 항상 0이 되어 학습이 멈추기 때문'], answer: 1,
        explain: '학습을 오래 해도 해결되지 않는 표현력의 한계다. 은닉층을 두어 입력을 변환하면 변환된 공간에서는 선형 분리가 가능해진다.' },
      { q: '퍼셉트론 학습 규칙에서 올바르게 분류된 샘플을 만나면?',
        options: ['같은 방향으로 가중치를 조금 더 키워 확신을 높인다', '아무것도 바꾸지 않는다 — 갱신량이 (y − ŷ)라서', '학습률을 절반으로 줄여 이후 갱신을 작게 만든다', '편향만 조정해 경계를 그 샘플에서 멀리 옮긴다'], answer: 1,
        explain: '틀린 샘플만 경계를 움직인다. 그래서 모든 샘플을 맞히는 순간 학습이 멈추며, 그 경계가 마진이 최대라는 보장은 없다.' },
      { q: '계단 함수를 시그모이드로 바꾸는 것이 다층 신경망 학습에 결정적이었던 이유는?',
        options: ['시그모이드는 계단 함수보다 계산이 빨라 큰 망을 학습할 수 있었기 때문', '미분 가능해 그래디언트를 구할 수 있고, 연쇄법칙으로 여러 층을 학습할 수 있어서', '시그모이드는 출력이 0을 중심으로 대칭이라 다음 층 입력이 안정되기 때문', '시그모이드를 쓰면 은닉층 없이도 XOR 같은 비선형 문제를 풀 수 있어서'], answer: 1,
        explain: '계단 함수의 미분은 거의 모든 곳에서 0이라 그래디언트가 전달되지 않는다. 미분 가능한 활성화가 역전파의 전제다.' },
    ],
    resources: ['Frank Rosenblatt, "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain" (1958)', 'Minsky & Papert, 『Perceptrons』 (1969)', '사이토 고키, 『밑바닥부터 시작하는 딥러닝』 2장 — 퍼셉트론', 'Goodfellow, Bengio, Courville, 『Deep Learning』 6장 (무료 공개)'],
  },
  {
    id: 'dl-mlp', title: '다층 퍼셉트론과 표현력', advanced: true,
    summary: R`선형 변환 + <strong>비선형 활성화</strong>를 쌓아 공간을 접고 휘기
은닉층 하나로도 연속 함수 근사 가능, 실제로는 깊게 쌓는 편이 효율적`,
    body: R`
<h3>층을 쌓는다는 것</h3>
<p>다층 퍼셉트론(MLP)의 각 층은 $\mathbf h = \sigma(W\mathbf x + \mathbf b)$를 계산한다. 선형 변환 $W\mathbf x + \mathbf b$로 공간을 회전·늘이기·이동하고, 활성화 함수 $\sigma$로 휘거나 접는다. 마지막 층은 문제에 맞는 출력을 낸다.</p>
<table><tr><th>문제</th><th>출력층</th><th>손실</th></tr>
<tr><td>회귀</td><td>선형(활성화 없음)</td><td>MSE</td></tr>
<tr><td>이진 분류</td><td>시그모이드 1개</td><td>이진 교차 엔트로피</td></tr>
<tr><td>다중 분류</td><td>소프트맥스 K개</td><td>범주형 교차 엔트로피</td></tr></table>
<h3>왜 비선형 활성화가 반드시 필요한가</h3>
<p>활성화가 없으면 $W_2(W_1\mathbf x + \mathbf b_1) + \mathbf b_2 = (W_2W_1)\mathbf x + (W_2\mathbf b_1 + \mathbf b_2)$로, 아무리 층을 쌓아도 <strong>선형 변환 하나</strong>와 같다. 층을 쌓는 의미가 사라진다. 비선형 활성화가 있어야 층마다 새로운 표현이 생긴다.</p>
<h3>은닉층은 특성을 학습한다</h3>
<p>XOR은 입력 공간에서는 직선으로 나눌 수 없지만, 은닉층이 입력을 새로운 좌표(예: "x₁ OR x₂", "x₁ AND x₂")로 바꾸면 그 공간에서는 직선 하나로 나뉜다. 전통적인 ML에서는 사람이 이런 특성을 설계했지만(피처 엔지니어링), 신경망은 출력의 손실을 줄이도록 <strong>특성 변환 자체를 학습</strong>한다. 이것이 표현 학습이다.</p>
<h3>보편 근사 정리와 그 한계</h3>
<p>Cybenko(1989), Hornik(1991) 등은 시그모이드 같은 비선형 활성화를 가진 <strong>은닉층 하나</strong>짜리 신경망이, 뉴런만 충분히 많으면 유계 구간 위의 어떤 연속 함수도 원하는 정밀도로 근사할 수 있음을 보였다. 강력해 보이지만 이 정리는 "그런 가중치가 <strong>존재한다</strong>"는 것만 말한다.</p>
<ul><li>필요한 뉴런 수가 감당할 수 없을 만큼 클 수 있다.</li>
<li>경사하강이 그 가중치를 <strong>찾을 수 있다</strong>는 보장이 없다.</li>
<li>훈련 데이터 밖에서 잘 <strong>일반화</strong>한다는 보장도 없다.</li></ul>
<h3>왜 넓게가 아니라 깊게인가</h3>
<p>깊은 망은 단순한 특성을 조합해 복잡한 특성을 만드는 <strong>계층적 표현</strong>을 자연스럽게 학습한다(이미지라면 모서리 → 질감 → 부분 → 물체). 이론적으로도, 어떤 함수들은 깊은 망으로는 적은 뉴런으로 표현되지만 얕은 망으로 표현하려면 뉴런 수가 지수적으로 늘어남이 알려져 있다. ReLU 신경망은 입력 공간을 여러 영역으로 나눠 영역마다 선형인 함수(조각별 선형 함수)를 만드는데, 깊이가 늘수록 만들 수 있는 영역 수가 빠르게 늘어난다. 대신 깊어질수록 학습이 어려워져(기울기 소실·폭발) 활성화 함수, 초기화, 정규화, 잔차 연결 같은 기법이 필요해졌다.</p>
<h3>모듈의 조합</h3>
<p>PyTorch의 <code>nn.Module</code>처럼 신경망 프레임워크는 층을 객체로 만들고, 여러 층을 담은 모듈도 같은 인터페이스(<code>forward</code>)를 갖는 하나의 층처럼 다룬다. 블록 안에 블록을 넣어 큰 모델을 조립하는 이 구조가 컴포지트 패턴이다. 파라미터 수는 층마다 (입력 수 + 1) × 출력 수를 더해 계산한다.</p>`,
    analogy: R`<p>종이접기. 평평한 종이(입력 공간) 위에 빨간 점과 파란 점이 XOR 모양으로 섞여 있으면 가위질 한 번(직선 하나)으로 나눌 수 없다. 하지만 종이를 한 번 접으면(은닉층의 비선형 변환) 같은 색 점들이 겹쳐져, 이제는 한 번에 자를 수 있다. 층을 더 쌓는 것은 더 여러 번 접는 것이고, 접기만 하고 펴지 않는 직선 이동(활성화 없는 층)은 몇 번을 해도 종이 모양이 그대로다.</p>`,
    diagram: { caption: '2-3-1 다층 퍼셉트론. 각 층은 선형 변환 후 비선형 활성화를 적용한다. 은닉층이 입력을 새로운 특성 공간으로 바꾼다.', svg: R`
<svg viewBox="0 0 520 210" width="520">
<text x="70" y="14" class="sm">입력층</text><text x="260" y="14" class="sm">은닉층 (σ)</text><text x="450" y="14" class="sm">출력층</text>
<path class="e" d="M88,70 L242,40 M88,70 L242,105 M88,70 L242,170 M88,140 L242,40 M88,140 L242,105 M88,140 L242,170"/>
<path class="e" d="M278,40 L432,105 M278,105 L432,105 M278,170 L432,105"/>
<circle class="n" cx="70" cy="70" r="18"/><text x="70" y="70" class="sm">x₁</text>
<circle class="n" cx="70" cy="140" r="18"/><text x="70" y="140" class="sm">x₂</text>
<circle class="h" cx="260" cy="40" r="18"/><text x="260" y="40" class="sm">h₁</text>
<circle class="h" cx="260" cy="105" r="18"/><text x="260" y="105" class="sm">h₂</text>
<circle class="h" cx="260" cy="170" r="18"/><text x="260" y="170" class="sm">h₃</text>
<circle class="n" cx="450" cy="105" r="18"/><text x="450" y="105" class="sm">ŷ</text>
<text x="165" y="195" class="sm">W₁ (2×3) + b₁</text><text x="355" y="195" class="sm">W₂ (3×1) + b₂</text>
<text x="165" y="22" class="sm">선형 변환</text><text x="355" y="30" class="sm">은닉 특성 → 출력</text>
</svg>` },
    math: [
      { tex: R`\mathbf h = \sigma(W_1 \mathbf x + \mathbf b_1), \qquad \hat{\mathbf y} = g(W_2 \mathbf h + \mathbf b_2)`, explain: R`<ul class="defs"><li>$\sigma$: 은닉층 활성화(ReLU, tanh 등)</li><li>$g$: 출력층 함수(항등, 시그모이드, 소프트맥스)</li></ul>$\sigma$가 없으면 두 층이 하나의 선형 변환 $W_2W_1$로 합쳐진다.` },
      { tex: R`\#\text{params} = \sum_{l=1}^{L} (n_{l-1} + 1)\, n_l`, explain: R`$n_l$: $l$번째 층의 뉴런 수($n_0$은 입력 차원). $+1$은 편향. 예: 784-128-10이면 $(785)(128) + (129)(10) = 101{,}770$개.` },
    ],
    code: R`
import numpy as np

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], float)
y = np.array([[0], [1], [1], [0]], float)            # XOR
sigmoid = lambda z: 1 / (1 + np.exp(-z))

def train(use_activation, steps=5000, lr=0.5, hidden=4, seed=1):
  rng = np.random.default_rng(seed)
  W1, b1 = rng.normal(0, 1, (2, hidden)), np.zeros(hidden)
  W2, b2 = rng.normal(0, 1, (hidden, 1)), np.zeros(1)
  for _ in range(steps):
      z1 = X @ W1 + b1
      h = np.tanh(z1) if use_activation else z1    # 은닉층 활성화 유무
      p = sigmoid(h @ W2 + b2)
      dz2 = (p - y) / len(X)                       # 시그모이드 + BCE의 그래디언트
      dW2, db2 = h.T @ dz2, dz2.sum(0)
      dh = dz2 @ W2.T
      dz1 = dh * (1 - h ** 2) if use_activation else dh
      dW1, db1 = X.T @ dz1, dz1.sum(0)
      W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2
  return p.ravel(), h

p, h = train(use_activation=True)
print("tanh 은닉층 출력:", p.round(3), "→ XOR 해결")
p_lin, _ = train(use_activation=False)
print("활성화 없는 은닉층:", p_lin.round(3), "→ 모두 0.5 근처: 결국 선형 모델")

# 은닉 공간에서는 선형 분리가 가능해졌는지: 은닉 특성에 직선(최소제곱) 하나를 맞춰 본다
H = np.c_[h, np.ones(len(h))]
w = np.linalg.lstsq(H, 2 * y.ravel() - 1, rcond=None)[0]
print("은닉 특성에서 직선 하나로 분류한 정확도:", np.mean((H @ w > 0) == (y.ravel() == 1)))

def n_params(sizes):
  return sum((a + 1) * b for a, b in zip(sizes, sizes[1:]))
print("784-128-10 MLP 파라미터 수:", f"{n_params([784, 128, 10]):,}")
`,
    links: [
      { to: 'dl-perceptron', why: '단층의 한계(XOR)와 그 해법' },
      { to: 'dl-backprop', why: '여러 층의 가중치를 한 번에 학습하는 방법' },
      { to: 'dl-activation', why: '층을 의미 있게 만드는 비선형성' },
      { to: 'math-matrix', why: '각 층은 행렬 곱(선형 변환)' },
      { to: 'ml-feature', why: '사람이 설계하던 특성을 신경망이 스스로 학습한다(표현 학습)' },
      { to: 'se-pattern', why: '층을 담은 모듈도 하나의 층처럼 다루는 컴포지트 구조' },
    ],
    quiz: [
      { q: '은닉층에 활성화 함수 없이 선형 층만 10개 쌓은 신경망의 표현력은?',
        options: ['층 수에 비례해 10배 강해진다', '선형 층 하나와 같다', '층마다 차원이 다르면 비선형 함수도 표현한다', '깊이에 따라 지수적으로 강해진다'], answer: 1,
        explain: 'W₁₀⋯W₂W₁은 행렬 하나다. 그래서 각 층 사이에 비선형 활성화가 반드시 필요하다.' },
      { q: '보편 근사 정리가 보장하지 <strong>않는</strong> 것은?',
        options: ['충분히 넓은 은닉층 하나로 연속 함수를 근사하는 가중치가 존재한다는 것', '경사하강으로 그 가중치를 실제로 찾을 수 있고 잘 일반화한다는 것', '근사 오차를 원하는 만큼 작게 만들 수 있다는 것', '비선형 활성화가 있어야 이 성질이 성립한다는 것'], answer: 1,
        explain: '존재 정리일 뿐 학습 가능성, 필요한 크기, 일반화는 말하지 않는다. 실제로는 깊은 구조와 학습 기법이 중요하다.' },
      { q: '입력 784, 은닉 128, 출력 10인 MLP의 파라미터(가중치 + 편향) 수는?',
        options: ['100,352', '101,770', '101,632', '100,480'], answer: 1,
        explain: '(784 + 1) × 128 + (128 + 1) × 10 = 100,480 + 1,290 = 101,770.' },
    ],
    resources: ['Goodfellow, Bengio, Courville, 『Deep Learning』 6장 — Deep Feedforward Networks', 'Michael Nielsen, 『Neural Networks and Deep Learning』 4장 — 보편 근사의 시각적 증명 (무료)', 'Cybenko, "Approximation by Superpositions of a Sigmoidal Function" (1989)', '3Blue1Brown, 「신경망」 영상 시리즈'],
  },
  {
    id: 'dl-backprop', title: '역전파',
    summary: R`연쇄법칙을 출력 → 입력 방향으로 적용
모든 파라미터의 그래디언트를 <strong>순전파 비슷한 비용</strong>으로 한 번에
대가: 중간 활성값 저장(메모리)`,
    body: R`
<h3>무엇이 문제인가</h3>
<p>경사하강으로 학습하려면 손실 $L$을 모든 파라미터로 미분한 값이 필요하다. 가장 단순한 방법은 수치 미분 — 파라미터 하나를 조금 바꿔 손실이 얼마나 변하는지 보는 것이다. 하지만 파라미터가 $n$개면 순전파를 $n$번(정확히는 $2n$번) 해야 한다. 파라미터가 1억 개면 불가능하다. 역전파는 같은 그래디언트를 순전파 비용의 몇 배 정도로 정확하게 계산한다.</p>
<h3>계산 그래프와 국소 미분</h3>
<p>신경망의 계산을 덧셈, 곱셈, 활성화 같은 기본 연산의 그래프로 쪼갠다. 각 연산 노드는 <strong>자기 입력에 대한 자기 출력의 미분(국소 미분)</strong>만 알면 된다. 덧셈의 국소 미분은 1, 곱셈 $a \times b$에서 $a$에 대한 미분은 $b$, $\tanh$의 미분은 $1 - \tanh^2$.</p>
<h3>연쇄법칙을 거꾸로</h3>
<p>출력 쪽에서 "이 노드의 출력이 손실에 미치는 영향" $\partial L/\partial(\text{출력})$을 받으면(상류 그래디언트), 여기에 국소 미분을 곱해 입력 쪽으로 넘긴다. 이것을 그래프의 <strong>위상 정렬 역순</strong>으로 모든 노드에서 반복하면, 모든 값에 대한 $\partial L/\partial(\cdot)$가 한 번의 역방향 순회로 구해진다.</p>
<ul>
<li><strong>재사용(동적 계획법)</strong>: 어떤 층의 그래디언트를 계산할 때 그 위층에서 이미 계산한 그래디언트를 그대로 쓴다. 경로마다 연쇄법칙을 처음부터 다시 계산하지 않기 때문에 효율적이다.</li>
<li><strong>분기는 합</strong>: 한 값이 여러 곳에 쓰이면(fan-out), 각 경로에서 돌아온 그래디언트를 <strong>더한다</strong>. 다변수 연쇄법칙의 결과다.</li>
<li><strong>행렬 형태</strong>: 선형 층 $\mathbf z = W\mathbf a$에서 $\partial L/\partial W = \boldsymbol\delta\,\mathbf a^\top$, $\partial L/\partial \mathbf a = W^\top \boldsymbol\delta$. 역전파도 결국 행렬 곱이라 GPU에서 빠르다.</li>
</ul>
<h3>왜 거꾸로가 효율적인가</h3>
<p>신경망 학습은 "입력(파라미터)은 수백만 개, 출력(손실)은 스칼라 하나"인 함수의 미분이다. 출력에서 거꾸로 가면(역방향 자동 미분) 한 번의 순회로 모든 입력에 대한 미분이 나온다. 반대로 입력에서 앞으로 가는 순방향 자동 미분은 입력 하나당 한 번씩 순회해야 한다. 입력이 적고 출력이 많은 함수라면 순방향이 유리하다.</p>
<h3>메모리라는 대가</h3>
<p>역전파에는 순전파 때 계산한 중간값(활성값)이 필요하다. 그래서 학습 중에는 모든 층의 활성값을 저장해 두어야 하고, 메모리 사용량이 배치 크기 × 깊이에 비례해 커진다. 추론보다 학습에 메모리가 훨씬 많이 드는 이유다. 일부 활성값만 저장하고 나머지는 역전파 때 다시 계산하는 <strong>그래디언트 체크포인팅</strong>은 계산을 더 해서 메모리를 아낀다.</p>
<p>PyTorch의 autograd는 순전파를 실행하면서 그래프를 기록하고, <code>loss.backward()</code>가 위의 과정을 수행한다. 결과 텐서가 그래프를 참조하고 있으므로, 기록용으로 <code>total += loss</code>처럼 텐서를 누적하면 매 반복의 그래프가 해제되지 않아 메모리가 계속 늘어난다(<code>loss.item()</code>으로 숫자만 꺼내야 한다).</p>
<h3>구현 확인: 그래디언트 검사</h3>
<p>역전파를 직접 구현했다면 몇 개 파라미터에 대해 수치 미분 $\frac{L(w+h) - L(w-h)}{2h}$와 비교해 맞는지 검사한다. 그래디언트 크기가 층을 거치며 작아지거나 커지는 문제(소실·폭발)는 활성화 함수, 초기화, 정규화, 잔차 연결로 다룬다.</p>`,
    analogy: R`<p>회사의 손실 원인 추적. 최종 적자(손실)가 났을 때, 재무팀이 "매출이 1 줄면 적자가 얼마 늘었나"를 영업팀에 알리고, 영업팀은 그 값에 "광고비가 1 줄면 매출이 얼마 줄었나"를 곱해 마케팅팀에 알린다. 각 팀은 <strong>자기 바로 다음 단계와의 관계(국소 미분)</strong>만 알면 되고, 위에서 내려온 숫자를 재사용하므로 모든 원인의 책임 비율을 한 번에 계산할 수 있다. 한 팀이 여러 부서에 영향을 줬다면 각 부서에서 돌아온 책임을 합친다.</p>`,
    diagram: { caption: 'L = (w·x + b − y)²의 계산 그래프. 순전파(위, 값)로 계산한 뒤, 역전파(아래, 그래디언트)는 출력에서 입력 쪽으로 상류 그래디언트 × 국소 미분을 전달한다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<circle class="n" cx="40" cy="40" r="20"/><text x="40" y="40" class="sm">w=3</text>
<circle class="n" cx="40" cy="120" r="20"/><text x="40" y="120" class="sm">x=2</text>
<circle class="h" cx="150" cy="80" r="22"/><text x="150" y="80">×</text>
<circle class="n" cx="150" cy="170" r="20"/><text x="150" y="170" class="sm">b=1</text>
<circle class="h" cx="270" cy="110" r="22"/><text x="270" y="110">+</text>
<circle class="h" cx="390" cy="110" r="22"/><text x="390" y="110">−y</text>
<circle class="h" cx="500" cy="110" r="22"/><text x="500" y="110">( )²</text>
<path class="a" d="M58,48 L130,72"/><path class="a" d="M58,112 L130,88"/><path class="a" d="M170,88 L249,104"/><path class="a" d="M168,162 L250,120"/><path class="a" d="M292,110 H366"/><path class="a" d="M412,110 H476"/>
<text x="210" y="80" class="sm">6</text><text x="330" y="100" class="sm">7</text><text x="445" y="100" class="sm">2 (y=5)</text><text x="500" y="145" class="sm">L = 4</text>
<text x="445" y="130" class="sm" style="fill:var(--sc)">∂L = 4</text>
<text x="330" y="130" class="sm" style="fill:var(--sc)">4 × 1</text>
<text x="205" y="118" class="sm" style="fill:var(--sc)">4 × 1</text>
<text x="210" y="165" class="sm" style="fill:var(--sc)">∂L/∂b = 4</text>
<text x="128" y="28" class="sm" style="fill:var(--sc)">∂L/∂w = 4 × x = 8</text>
<text x="122" y="140" class="sm" style="fill:var(--sc)">∂L/∂x = 4 × w = 12</text>
<text x="280" y="200" class="sm">검정 = 순전파 값 · 색 = 역전파 그래디언트 (상류 × 국소 미분)</text>
</svg>` },
    math: [
      { tex: R`\frac{\partial L}{\partial x} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial x}, \qquad \frac{\partial L}{\partial x} = \sum_{j} \frac{\partial L}{\partial y_j}\frac{\partial y_j}{\partial x}\ \ (\text{x가 여러 } y_j \text{에 쓰일 때})`, explain: R`연쇄법칙.<ul class="defs"><li>$\partial L/\partial y$: 위에서 내려온 상류 그래디언트</li><li>$\partial y/\partial x$: 노드의 국소 미분</li></ul>한 값이 여러 곳에 쓰이면 모든 경로의 기여를 더한다.` },
      { tex: R`\boldsymbol\delta^{(l)} = \left(W^{(l+1)\top} \boldsymbol\delta^{(l+1)}\right) \odot \sigma'(\mathbf z^{(l)}), \qquad \frac{\partial L}{\partial W^{(l)}} = \boldsymbol\delta^{(l)}\, \mathbf a^{(l-1)\top}`, explain: R`MLP의 역전파 점화식.<ul class="defs"><li>$\boldsymbol\delta^{(l)} = \partial L/\partial \mathbf z^{(l)}$: $l$층 사전 활성값에 대한 그래디언트</li><li>$\mathbf a^{(l-1)}$: 이전 층의 활성값(순전파 때 저장해 둔 값)</li><li>$\odot$: 원소별 곱</li></ul>위층의 $\boldsymbol\delta$를 재사용해 아래층을 계산한다.` },
    ],
    code: R`
import math

class Value:
  """스칼라 하나와 그 그래디언트를 담는 노드. 연산을 하면 계산 그래프가 기록된다."""
  def __init__(self, data, parents=()):
      self.data, self.grad, self._parents, self._backward = data, 0.0, parents, lambda: None

  def __add__(self, other):
      other = other if isinstance(other, Value) else Value(other)
      out = Value(self.data + other.data, (self, other))
      def backward():                          # 덧셈의 국소 미분 = 1
          self.grad += out.grad                 # += : 여러 곳에 쓰인 값은 그래디언트를 합한다
          other.grad += out.grad
      out._backward = backward
      return out
  __radd__ = __add__

  def __mul__(self, other):
      other = other if isinstance(other, Value) else Value(other)
      out = Value(self.data * other.data, (self, other))
      def backward():                          # 곱셈의 국소 미분 = 상대편 값
          self.grad += other.data * out.grad
          other.grad += self.data * out.grad
      out._backward = backward
      return out
  __rmul__ = __mul__

  def tanh(self):
      t = math.tanh(self.data)
      out = Value(t, (self,))
      def backward():
          self.grad += (1 - t ** 2) * out.grad
      out._backward = backward
      return out

  def backward(self):
      order, seen = [], set()
      def topo(v):                              # 위상 정렬: 입력 쪽 노드가 먼저
          if v not in seen:
              seen.add(v)
              for p in v._parents:
                  topo(p)
              order.append(v)
      topo(self)
      self.grad = 1.0                           # ∂L/∂L = 1
      for v in reversed(order):                 # 위상 순서의 역순으로 연쇄법칙 적용
          v._backward()

def neuron(w1, w2, b, x1=2.0, x2=-1.0):
  w1, w2, b = Value(w1), Value(w2), Value(b)
  out = (w1 * x1 + w2 * x2 + b).tanh()
  loss = out * out + out                        # out이 두 곳에 쓰임 (fan-out)
  return (w1, w2, b), loss

params, loss = neuron(0.5, -0.3, 0.1)
loss.backward()
print("역전파:", [round(p.grad, 6) for p in params])

h = 1e-6                                          # 수치 미분으로 검산 (파라미터마다 순전파 2번)
base = [0.5, -0.3, 0.1]
numeric = []
for i in range(3):
  up, down = base.copy(), base.copy()
  up[i] += h
  down[i] -= h
  numeric.append((neuron(*up)[1].data - neuron(*down)[1].data) / (2 * h))
print("수치 미분:", [round(g, 6) for g in numeric])
`,
    links: [
      { to: 'math-chain', why: '역전파는 연쇄법칙의 효율적인 적용' },
      { to: 'ds-graph', why: '계산 그래프를 위상 순서의 역순으로 순회' },
      { to: 'ds-dp', why: '위층의 그래디언트를 저장해 재사용 — 동적 계획법과 같은 아이디어' },
      { to: 'dl-mlp', why: '역전파로 학습하는 대상' },
      { to: 'dl-optim', why: '구한 그래디언트로 파라미터를 어떻게 갱신할까' },
      { to: 'pl-memory', why: '그래프를 붙잡는 텐서 참조와 메모리 누수' },
    ],
    quiz: [
      { q: '파라미터가 1억 개인 신경망에서 수치 미분 대신 역전파를 쓰는 이유는?',
        options: ['역전파는 근사값을 주는 대신 수치 미분보다 계산이 단순해서', '수치 미분은 파라미터마다 순전파가 필요하지만, 역전파는 한 번에 모두 구해서', '수치 미분은 float32에서 항상 0이 나와 큰 모델에 쓸 수 없어서', '역전파는 그래디언트를 저장하지 않아 메모리를 훨씬 덜 써서'], answer: 1,
        explain: '출력(손실)이 스칼라 하나이고 입력(파라미터)이 많을 때 역방향 자동 미분이 효율적이다. 수치 미분은 구현 검증에만 쓴다.' },
      { q: '계산 그래프에서 한 값이 두 연산에 동시에 쓰였다면, 그 값의 그래디언트는?',
        options: ['두 경로 중 큰 쪽만 택한다', '두 경로의 그래디언트를 더한다', '두 경로의 그래디언트를 곱한다', '두 경로의 그래디언트를 평균낸다'], answer: 1,
        explain: '다변수 연쇄법칙: 그 값이 손실에 영향을 주는 모든 경로의 기여를 합한다. 그래서 구현에서 grad += 를 쓴다.' },
      { q: '같은 모델이라도 학습할 때 추론보다 GPU 메모리를 훨씬 많이 쓰는 주된 이유는?',
        options: ['학습 때는 가중치 사본을 하나 더 만들어 순전파와 역전파에 따로 쓰기 때문', '역전파에 필요한 중간 활성값과 그래디언트·옵티마이저 상태까지 보관하기 때문', '학습은 정밀도를 위해 반드시 float64로 해야 해서 크기가 두 배가 되기 때문', '학습 때는 배치 전체를 한 번에 올려야 하고 추론은 샘플 하나씩 처리하기 때문'], answer: 1,
        explain: '활성값 메모리는 배치 크기와 깊이에 비례한다. 그래디언트 체크포인팅은 일부를 다시 계산해 이 메모리를 줄인다.' },
    ],
    resources: ['Rumelhart, Hinton, Williams, "Learning representations by back-propagating errors" (Nature, 1986)', 'Andrej Karpathy, "The spelled-out intro to neural networks and backpropagation: building micrograd" (영상)', 'Stanford CS231n 강의 노트 — Backpropagation, Intuitions', 'PyTorch 문서 — Autograd mechanics'],
  },
  {
    id: 'dl-activation', title: '활성화 함수',
    summary: R`비선형성 제공 + 그래디언트 흐름 결정
시그모이드·tanh: 포화 → <strong>기울기 소실</strong>
ReLU 계열: 양수 구간 기울기 1 → 깊은 망의 기본값`,
    body: R`
<h3>시그모이드: 확률처럼 보이지만 은닉층에는 불리하다</h3>
<p>$\sigma(z) = 1/(1+e^{-z})$는 출력이 0~1이라 확률 해석에 좋다. 그러나 은닉층에서는 두 가지 문제가 있다.</p>
<ul>
<li><strong>포화와 기울기 소실</strong>: 미분 $\sigma(1-\sigma)$는 최대 0.25이고, $|z|$가 크면 0에 가깝다. 역전파는 층마다 이 값을 곱하므로, 깊은 망에서는 앞쪽 층에 도착하는 그래디언트가 기하급수적으로 작아진다. 앞쪽 층이 거의 학습되지 않는다.</li>
<li><strong>0 중심이 아님</strong>: 출력이 항상 양수라 다음 층 가중치들의 그래디언트 부호가 한꺼번에 같아져 지그재그 경로로 비효율적으로 학습한다.</li>
</ul>
<h3>tanh</h3>
<p>$\tanh(z)$는 출력이 −1~1로 0 중심이고 원점에서 기울기가 1이라 시그모이드보다 낫지만, 역시 $|z|$가 크면 포화된다. RNN·LSTM 내부에서 여전히 많이 쓰인다.</p>
<h3>ReLU: 깊은 망 학습의 전환점</h3>
<p>$\max(0, z)$는 양수 영역에서 기울기가 정확히 1이라 그래디언트가 줄지 않고 통과하며, 계산도 매우 싸다. 음수 입력은 0이 되어 활성이 희소해진다. AlexNet(2012) 이후 은닉층의 기본값이 되었다. 단점은 <strong>죽은 ReLU</strong>다. 학습 중 큰 갱신으로 편향이 크게 음수가 되는 등, 어떤 뉴런의 입력이 모든 샘플에서 음수가 되면 출력도 그래디언트도 항상 0이라 그 뉴런은 다시 살아나지 못한다. 학습률이 너무 크면 이런 뉴런이 늘어난다.</p>
<h3>ReLU의 변형들</h3>
<ul>
<li><strong>Leaky ReLU</strong>: 음수 영역에 작은 기울기(예: 0.01)를 둬 죽은 뉴런을 막는다. ELU는 음수 영역을 매끄러운 지수 곡선으로 만든다.</li>
<li><strong>GELU</strong>: $z\,\Phi(z)$ ($\Phi$: 표준정규 누적분포). 입력을 "얼마나 통과시킬지"를 확률적으로 정하는 것처럼 부드럽게 동작한다. BERT, GPT 계열 Transformer의 표준 활성화다.</li>
<li><strong>SiLU(Swish)</strong>: $z\,\sigma(z)$. 이를 게이트 구조로 쓴 <strong>SwiGLU</strong>가 LLaMA 등 최근 LLM의 피드포워드 층에 쓰인다.</li>
</ul>
<h3>출력층: 문제에 맞게</h3>
<ul>
<li>회귀: 활성화 없음(항등).</li>
<li>이진 분류, 또는 한 샘플이 여러 클래스에 동시에 속할 수 있는 <strong>다중 레이블</strong> 분류: 클래스마다 <strong>시그모이드</strong>.</li>
<li>정확히 하나의 클래스를 고르는 <strong>다중 클래스</strong> 분류: <strong>소프트맥스</strong> $e^{z_k}/\sum_j e^{z_j}$ — 출력의 합이 1인 확률 분포.</li>
</ul>
<h3>수치 안정성</h3>
<p>$e^{1000}$은 float64로도 무한대다. 소프트맥스는 모든 입력에서 최댓값을 빼고 계산해도 결과가 같으므로 항상 그렇게 구현한다. 교차 엔트로피와 함께 쓸 때는 소프트맥스 후 로그를 취하지 않고 <strong>log-sum-exp</strong>로 로그 확률을 바로 계산한다(PyTorch의 <code>CrossEntropyLoss</code>가 로짓을 입력으로 받는 이유). 시그모이드도 큰 음수 입력에서 $e^{-z}$가 넘치지 않게, 부호에 따라 식을 나눠 계산한다.</p>`,
    analogy: R`<p>수도관의 밸브. 시그모이드는 끝까지 열거나 잠그면 손잡이를 더 돌려도 물줄기가 거의 변하지 않는 밸브라, 멀리 있는 수원(앞쪽 층)에 "더 열어라"는 신호가 전달되지 않는다(포화). ReLU는 열린 쪽으로는 돌린 만큼 그대로 흐르는 밸브라 신호가 잘 전달되지만, 한번 완전히 잠긴 채 녹슬면 다시는 열리지 않는다(죽은 ReLU).</p>`,
    diagram: { caption: '주요 활성화 함수(−4 ≤ z ≤ 4). 시그모이드와 tanh는 |z|가 크면 평평해져(포화) 기울기가 0에 가까워지고, ReLU·GELU는 양수 쪽에서 기울기를 유지한다.', svg: R`
<svg viewBox="0 0 560 230" width="560">
<path class="a" d="M30,150 H455"/><path class="a" d="M240,215 V30"/>
<path class="e d" d="M40,100 H440"/><path class="e d" d="M40,200 H440"/>
<text x="250" y="100" class="st sm">1</text><text x="250" y="200" class="st sm">−1</text><text x="452" y="162" class="sm">z</text>
<polyline class="e" style="stroke:#7c4dcc;stroke-width:2.2" points="40.0,149.1 60.0,148.7 80.0,148.0 100.0,147.1 120.0,145.8 140.0,144.0 160.0,141.6 180.0,138.4 200.0,134.5 220.0,129.9 240.0,125.0 260.0,120.1 280.0,115.5 300.0,111.6 320.0,108.4 340.0,106.0 360.0,104.2 380.0,102.9 400.0,102.0 420.0,101.3 440.0,100.9"/>
<polyline class="e" style="stroke:#0e9f8e;stroke-width:2.2" points="40.0,200.0 80.0,199.8 120.0,199.2 140.0,198.2 160.0,196.1 170.0,194.3 180.0,191.7 190.0,188.1 200.0,183.2 210.0,176.9 220.0,169.0 230.0,159.9 240.0,150.0 250.0,140.1 260.0,131.0 270.0,123.1 280.0,116.8 290.0,111.9 300.0,108.3 320.0,103.9 340.0,101.8 360.0,100.8 400.0,100.2 440.0,100.0"/>
<polyline class="e" style="stroke:#ea7a1a;stroke-width:2.2" points="40.0,150.0 240.0,150.0 250.0,140.0 260.0,130.0 270.0,120.0 280.0,110.0 290.0,100.0 300.0,90.0 310.0,80.0 320.0,70.0 330.0,60.0 340.0,50.0"/>
<polyline class="e d" style="stroke:#2563eb;stroke-width:2" points="40.0,150.0 80.0,150.1 100.0,150.4 120.0,151.0 140.0,152.3 160.0,154.4 180.0,156.9 200.0,158.5 210.0,158.2 220.0,156.9 230.0,154.2 240.0,150.0 250.0,144.2 260.0,136.9 270.0,128.2 280.0,118.5 290.0,107.9 300.0,96.9 310.0,85.7 320.0,74.4 330.0,63.2 340.0,52.3 350.0,41.5"/>
<text x="470" y="60" class="st sm" style="fill:#ea7a1a">ReLU</text>
<text x="470" y="80" class="st sm" style="fill:#2563eb">GELU (점선)</text>
<text x="470" y="105" class="st sm" style="fill:#7c4dcc">시그모이드</text>
<text x="470" y="125" class="st sm" style="fill:#0e9f8e">tanh</text>
<text x="90" y="135" class="sm">포화: 기울기 ≈ 0</text>
</svg>` },
    math: [
      { tex: R`\sigma(z) = \frac{1}{1 + e^{-z}},\quad \sigma'(z) = \sigma(z)\bigl(1 - \sigma(z)\bigr) \le \tfrac14, \qquad \tanh'(z) = 1 - \tanh^2 z \le 1`, explain: R`시그모이드의 기울기는 최대 0.25다. 역전파는 층마다 이를 곱하므로 가중치 효과를 빼고 보면 $n$층 뒤에는 최대 $(1/4)^n$ — 10층이면 약 $10^{-6}$배로 줄어든다.` },
      { tex: R`\begin{aligned} \mathrm{ReLU}(z) &= \max(0, z), \qquad \mathrm{GELU}(z) = z\,\Phi(z) \\ \mathrm{softmax}(\mathbf z)_k &= \frac{e^{z_k - m}}{\sum_j e^{z_j - m}}, \quad m = \max_j z_j \end{aligned}`, explain: R`$\Phi$: 표준정규분포의 누적분포함수. 소프트맥스에서 최댓값 $m$을 빼도 분자·분모가 같은 배수로 줄어 결과는 같지만, 지수가 넘치지 않는다.` },
    ],
    code: R`
import numpy as np

sigmoid = lambda z: 1 / (1 + np.exp(-z))
ACTS = {   # (함수, 도함수)
  "sigmoid": (sigmoid, lambda z: sigmoid(z) * (1 - sigmoid(z))),
  "tanh":    (np.tanh, lambda z: 1 - np.tanh(z) ** 2),
  "relu":    (lambda z: np.maximum(0, z), lambda z: (z > 0).astype(float)),
}

def first_layer_grad_ratio(name, layers=20, width=256, seed=0):
  """깊은 MLP를 실제로 순전파·역전파해, 마지막 층 대비 첫 층에 도착한 그래디언트 크기를 잰다."""
  f, df = ACTS[name]
  rng = np.random.default_rng(seed)
  std = np.sqrt((2.0 if name == "relu" else 1.0) / width)       # He / Xavier 계열 초기화
  Ws = [rng.normal(0, std, (width, width)) for _ in range(layers)]
  h, zs = rng.normal(0, 1, (64, width)), []
  for W in Ws:
      z = h @ W
      zs.append(z)
      h = f(z)
  g, norms = np.ones_like(h), []
  for W, z in zip(reversed(Ws), reversed(zs)):
      g = (g * df(z)) @ W.T                                     # 국소 미분을 곱해 아래층으로
      norms.append(np.linalg.norm(g))
  return norms[-1] / norms[0]

for name in ACTS:
  print(f"{name:7s}: 20층을 거슬러 올라간 그래디언트 크기 비율 = {first_layer_grad_ratio(name):.2e}")

rng = np.random.default_rng(1)
z = rng.normal(0, 1, (1000, 100)) - 4.0                          # 편향이 크게 음수로 밀린 층
print("입력 1,000개 모두에서 출력이 0인 ReLU 뉴런 비율:", np.mean((z > 0).sum(axis=0) == 0))

logits = np.array([1000.0, 1001.0, 1002.0])
with np.errstate(over="ignore", invalid="ignore"):
  naive = np.exp(logits) / np.exp(logits).sum()
m = logits.max()
log_probs = logits - m - np.log(np.exp(logits - m).sum())        # log-sum-exp로 로그 확률
print("소프트맥스 단순 계산:", naive, "| 최댓값 빼기:", np.exp(log_probs).round(4))

def stable_sigmoid(z):                                            # 큰 음수에서도 exp가 넘치지 않게
  e = np.exp(-np.abs(z))
  return np.where(z >= 0, 1 / (1 + e), e / (1 + e))
print("stable_sigmoid([-1000, 0, 1000]) =", stable_sigmoid(np.array([-1000.0, 0.0, 1000.0])))
`,
    links: [
      { to: 'dl-backprop', why: '역전파에서 층마다 활성화의 도함수가 곱해진다' },
      { to: 'dl-init', why: '활성화 함수에 맞는 초기화(Xavier, He)' },
      { to: 'ml-logistic', why: '시그모이드 + 교차 엔트로피 = 로지스틱 회귀' },
      { to: 'ca-number', why: '지수 함수의 오버플로와 최댓값 빼기' },
      { to: 'dl-transformer', why: 'Transformer 피드포워드 층의 GELU·SwiGLU' },
      { to: 'dl-lstm', why: '게이트에 쓰이는 시그모이드: 0~1의 "통과 비율"' },
    ],
    quiz: [
      { q: '시그모이드를 은닉층에 쓴 깊은 신경망에서 앞쪽 층이 거의 학습되지 않는 이유는?',
        options: ['시그모이드는 지수 함수 계산이 필요해 앞쪽 층까지 계산이 끝나지 않아서', '기울기가 최대 0.25이고 포화되면 0에 가까워, 층마다 곱해지며 작아지기 때문', '시그모이드 출력이 음수가 될 수 있어 다음 층 가중치의 부호가 뒤집히기 때문', '시그모이드는 미분이 불연속이라 역전파가 앞쪽 층까지 전달되지 않아서'], answer: 1,
        explain: '기울기 소실. ReLU는 양수 영역 기울기가 1이라 이 문제를 크게 줄인다.' },
      { q: '"죽은 ReLU"란?',
        options: ['출력이 계속 커져 무한대로 발산하는 뉴런', '입력이 늘 음수라 출력·그래디언트가 0으로 굳은 뉴런', '학습이 끝나 가중치가 더 이상 필요 없어진 뉴런', '드롭아웃으로 학습 중에 꺼져 있는 뉴런'], answer: 1,
        explain: '그래디언트가 0이면 가중치가 바뀌지 않아 회복되지 않는다. 학습률을 낮추거나 Leaky ReLU 같은 변형을 쓴다.' },
      { q: '사진 한 장에 "고양이", "실내", "야간" 태그가 동시에 붙을 수 있는 다중 레이블 분류의 출력층으로 알맞은 것은?',
        options: ['클래스 전체에 소프트맥스 하나', '클래스마다 독립적인 시그모이드', '클래스 전체에 ReLU 후 정규화', '클래스마다 tanh 후 0을 기준으로 판정'], answer: 1,
        explain: '소프트맥스는 합이 1인 분포라 "하나만 고르기"에 맞다. 여러 개가 동시에 참일 수 있으면 클래스별 시그모이드와 이진 교차 엔트로피를 쓴다.' },
    ],
    resources: ['Glorot & Bengio, "Understanding the difficulty of training deep feedforward neural networks" (2010)', 'Nair & Hinton, "Rectified Linear Units Improve Restricted Boltzmann Machines" (2010)', 'Hendrycks & Gimpel, "Gaussian Error Linear Units (GELUs)" (2016)', 'Noam Shazeer, "GLU Variants Improve Transformer" (2020)'],
  },
  {
    id: 'dl-optim', title: '최적화 기법: SGD·모멘텀·Adam',
    summary: R`기본 = 미니배치 경사하강
<strong>모멘텀</strong>: 관성으로 지그재그 완화 / <strong>Adam</strong>: 파라미터별 보폭 조절
학습률 스케줄·워밍업이 성능 좌우`,
    body: R`
<h3>미니배치 SGD</h3>
<p>전체 데이터의 그래디언트를 매번 정확히 계산하면 너무 느리다. 무작위로 뽑은 작은 묶음(미니배치)의 평균 그래디언트로 전체 그래디언트를 <strong>추정</strong>한다. 추정치에는 잡음이 있고, 그 표준편차는 배치 크기 $B$의 제곱근에 반비례한다. 배치를 4배로 키우면 잡음은 절반이 되지만 계산은 4배다. GPU는 배치 단위 행렬 곱에 최적화되어 있어 적당한 크기의 배치가 효율적이다. 잡음이 오히려 날카로운 지점에 갇히지 않게 돕는다는 관찰도 있지만, 일반화와의 관계는 아직 활발히 연구되는 주제다.</p>
<h3>골짜기의 문제와 모멘텀</h3>
<p>손실 지형은 어떤 방향으로는 가파르고 어떤 방향으로는 완만한 <strong>길쭉한 골짜기</strong>인 경우가 많다. 학습률은 가장 가파른 방향에서 발산하지 않을 만큼 작아야 하므로, 완만한 방향으로는 거의 나아가지 못하고 양쪽 벽 사이를 지그재그로 오간다.</p>
<p><strong>모멘텀</strong>은 지난 그래디언트를 누적한 "속도"로 이동한다. 일관되게 같은 방향인 성분(골짜기 바닥 방향)은 누적되어 가속되고, 부호가 계속 바뀌는 성분(벽 사이 진동)은 서로 상쇄되어 줄어든다. 공이 굴러가며 관성을 얻는 것과 같다. 계수 $\beta = 0.9$면 대략 최근 10스텝의 그래디언트를 평균내는 효과다.</p>
<h3>적응적 학습률: AdaGrad, RMSProp, Adam</h3>
<p>파라미터마다 그래디언트의 크기가 매우 다르다(자주 나오는 단어 임베딩 vs 드문 단어). 그래서 <strong>파라미터별로</strong> 최근 그래디언트 제곱의 크기로 나눠 보폭을 맞춘다.</p>
<ul>
<li><strong>AdaGrad</strong>: 제곱 그래디언트를 계속 누적해 나눈다. 드문 특성에 유리하지만 누적값이 커지기만 해 학습률이 계속 줄어든다.</li>
<li><strong>RMSProp</strong>: 누적 대신 지수 이동 평균을 써서 최근 크기에만 반응한다.</li>
<li><strong>Adam</strong>: 모멘텀(그래디언트의 이동 평균, 1차 모멘트)과 RMSProp(제곱의 이동 평균, 2차 모멘트)을 합친 것. 두 평균은 0에서 시작하므로 초기에는 실제보다 작게 추정된다. 이를 $1-\beta^t$로 나눠 보정한다(편향 보정). 학습률 기본값에 덜 민감해 많은 문제의 기본 선택이다.</li>
</ul>
<h3>AdamW: weight decay를 분리하기</h3>
<p>SGD에서는 손실에 L2 벌점 $\frac{\lambda}{2}\lVert\mathbf w\rVert^2$를 더하는 것과 매 스텝 가중치를 일정 비율 줄이는 weight decay가 같다. 하지만 Adam에서는 L2 벌점의 그래디언트도 적응적 스케일로 나눠지므로, 그래디언트가 큰 파라미터일수록 덜 줄어드는 왜곡이 생긴다. <strong>AdamW</strong>는 감쇠를 그래디언트와 분리해 가중치에 직접 적용하며, Transformer 학습의 표준이 되었다.</p>
<h3>학습률 스케줄</h3>
<ul>
<li><strong>워밍업</strong>: 처음 수백~수천 스텝 동안 학습률을 0에서 목표값까지 서서히 올린다. 초기에는 파라미터가 무작위이고 Adam의 2차 모멘트 추정도 불안정해 큰 보폭이 위험하기 때문이다. 큰 배치와 Transformer 학습에서 특히 중요하다.</li>
<li><strong>감소</strong>: 후반에는 학습률을 줄여(코사인 감소, 단계적 감소) 최솟값 근처에서 진동하지 않고 정착하게 한다.</li>
<li><strong>그래디언트 클리핑</strong>: 그래디언트 노름이 기준을 넘으면 줄인다. RNN·Transformer에서 가끔 생기는 그래디언트 폭발로 학습이 망가지는 것을 막는다.</li>
</ul>
<h3>고차원 손실 지형</h3>
<p>신경망의 손실은 볼록하지 않다. 직관과 달리 고차원에서는 "나쁜 지역 최솟값"보다 어떤 방향으로는 내려가고 어떤 방향으로는 올라가는 <strong>안장점</strong>과 넓고 평평한 영역이 학습을 느리게 하는 주된 원인이라는 분석이 있다. 모멘텀과 잡음은 이런 지형을 지나가는 데 도움이 된다.</p>`,
    analogy: R`<p>안개 낀 좁고 긴 협곡을 내려가는 상황. 발밑 경사만 보고 걸으면(SGD) 협곡 벽 쪽 경사가 가장 가파르게 느껴져 양쪽 벽을 오가느라 아래로는 잘 못 간다. 무거운 썰매를 타면(모멘텀) 좌우로 흔들리는 힘은 상쇄되고 아래로 가는 힘은 쌓여 빨라진다. Adam은 방향마다 "지금까지 얼마나 가파랐는지"를 기억해서, 가파른 방향은 조심스럽게, 완만한 방향은 성큼성큼 걷는 등산객이다.</p>`,
    diagram: { caption: '곡률이 크게 다른 손실 등고선. SGD(회색)는 가파른 방향으로 진동하며 느리게 나아가고, 모멘텀(색)은 진동이 상쇄되어 골짜기 바닥을 따라 빠르게 이동한다.', svg: R`
<svg viewBox="0 0 520 220" width="520">
<ellipse class="e" cx="260" cy="110" rx="230" ry="80"/>
<ellipse class="e" cx="260" cy="110" rx="160" ry="55"/>
<ellipse class="e" cx="260" cy="110" rx="95" ry="32"/>
<ellipse class="e" cx="260" cy="110" rx="35" ry="12"/>
<circle class="fill" cx="260" cy="110" r="4"/>
<path class="a" d="M50,70 L80,150 L110,75 L140,145 L170,82 L200,138 L225,92 L245,125 L256,106"/>
<path class="ha" d="M50,70 Q120,175 200,128 Q240,108 256,110"/>
<text x="60" y="58" class="sm">시작</text><text x="292" y="132" class="sm">최솟값</text>
<text x="130" y="208" class="sm">SGD: 가파른 방향으로 진동</text>
<text x="370" y="208" class="sm" style="fill:var(--sc)">모멘텀: 진동 상쇄, 바닥 방향 가속</text>
</svg>` },
    math: [
      { tex: R`\text{SGD: } \theta_{t+1} = \theta_t - \eta\, g_t, \qquad \text{모멘텀: } v_{t} = \beta v_{t-1} + g_t,\ \ \theta_{t+1} = \theta_t - \eta\, v_t`, explain: R`<ul class="defs"><li>$g_t$: 미니배치 그래디언트</li><li>$\eta$: 학습률</li><li>$\beta$: 관성 계수(보통 0.9)</li></ul>$v$는 과거 그래디언트의 지수 가중 합이다.` },
      { tex: R`\begin{aligned} m_t &= \beta_1 m_{t-1} + (1-\beta_1) g_t, & v_t &= \beta_2 v_{t-1} + (1-\beta_2) g_t^2 \\ \hat m_t &= \frac{m_t}{1-\beta_1^t}, & \hat v_t &= \frac{v_t}{1-\beta_2^t} \\ \theta_{t+1} &= \theta_t - \eta\,\frac{\hat m_t}{\sqrt{\hat v_t} + \epsilon} \end{aligned}`, explain: R`Adam.<ul class="defs"><li>$m$: 그래디언트의 이동 평균(방향)</li><li>$v$: 제곱의 이동 평균(크기)</li><li>기본값 $\beta_1 = 0.9$, $\beta_2 = 0.999$</li></ul>두 값이 0에서 시작해 초기에 작게 추정되는 것을 $1-\beta^t$로 나눠 보정한다. 나눗셈 덕분에 파라미터마다 보폭이 대략 $\eta$ 수준으로 맞춰진다.` },
    ],
    code: R`
import numpy as np

def sgd(lr):
  return lambda w, g, s, t: w - lr * g
def momentum(lr, beta=0.9):
  def step(w, g, s, t):
      s["v"] = beta * s.get("v", 0) + g
      return w - lr * s["v"]
  return step
def adam(lr, b1=0.9, b2=0.999, eps=1e-8):
  def step(w, g, s, t):
      s["m"] = b1 * s.get("m", 0) + (1 - b1) * g
      s["v"] = b2 * s.get("v", 0) + (1 - b2) * g * g
      m_hat, v_hat = s["m"] / (1 - b1 ** t), s["v"] / (1 - b2 ** t)     # 편향 보정
      return w - lr * m_hat / (np.sqrt(v_hat) + eps)
  return step

def steps_to_converge(update, kappa, tol=1e-6, max_steps=30000):
  A = np.diag([1.0, kappa])                    # 곡률이 kappa배 다른 길쭉한 골짜기: f(w) = ½ wᵀAw
  w, state = np.array([1.0, 1.0]), {}
  for t in range(1, max_steps + 1):
      w = update(w, A @ w, state, t)
      f = 0.5 * w @ A @ w
      if not np.isfinite(f) or f > 1e6:
          return "발산"
      if f < tol:
          return f"{t:,}스텝"
  return "미수렴"

for kappa in [50, 5000]:                         # SGD의 학습률 상한은 2/kappa (가장 가파른 방향 기준)
  lr = 1.75 / kappa
  print(f"곡률 비 {kappa:>5}: SGD {steps_to_converge(sgd(lr), kappa):>8} | 학습률 상한 초과 SGD {steps_to_converge(sgd(2.2 / kappa), kappa)}"
        f" | 모멘텀 {steps_to_converge(momentum(lr), kappa):>7} | Adam(lr=0.02) {steps_to_converge(adam(0.02), kappa)}")

rng = np.random.default_rng(0)                   # 미니배치 그래디언트의 잡음 ∝ 1/√B
X = rng.normal(size=(20_000, 5)); y = X @ np.ones(5) + rng.normal(size=20_000)
w0 = np.zeros(5)
for B in [8, 64, 512]:
  gs = []
  for _ in range(500):
      idx = rng.integers(0, len(X), B)
      gs.append((2 / B * X[idx].T @ (X[idx] @ w0 - y[idx]))[0])
  print(f"배치 {B:3d}: 그래디언트 추정치의 표준편차 {np.std(gs):.3f}")

def lr_schedule(step, total=1000, warmup=100, peak=3e-4):   # 선형 워밍업 + 코사인 감소
  if step < warmup:
      return peak * step / warmup
  return peak * 0.5 * (1 + np.cos(np.pi * (step - warmup) / (total - warmup)))
print("학습률 스케줄:", {s: f"{lr_schedule(s):.1e}" for s in (0, 50, 100, 550, 1000)})
`,
    links: [
      { to: 'ml-linear', why: '경사하강과 학습률, 특성 스케일 문제의 기본형' },
      { to: 'math-gradient', why: '그래디언트와 손실 지형' },
      { to: 'dl-backprop', why: '옵티마이저가 사용하는 그래디언트를 계산하는 방법' },
      { to: 'ml-regularization', why: 'L2 정규화와 weight decay, 그리고 AdamW' },
      { to: 'dl-norm', why: '정규화 층은 손실 지형을 다루기 쉽게 만든다' },
      { to: 'dl-transformer', why: 'Transformer 학습의 표준: AdamW + 워밍업 + 코사인 감소' },
    ],
    quiz: [
      { q: '좁고 긴 골짜기 모양의 손실에서 모멘텀이 SGD보다 빠른 이유는?',
        options: ['모멘텀이 학습률을 반복마다 자동으로 키워 보폭이 커지기 때문', '벽 사이를 오가는 성분은 상쇄되고 바닥 방향 성분은 누적되어서', '모멘텀은 2차 미분 정보를 써서 골짜기 모양을 미리 알기 때문', '모멘텀은 그래디언트가 큰 방향만 골라 그 방향으로만 움직이기 때문'], answer: 1,
        explain: '과거 그래디언트의 지수 평균으로 움직이므로 진동은 줄고 일관된 방향은 강화된다.' },
      { q: 'Adam이 1차·2차 모멘트 추정치를 1 − βᵗ로 나눠 보정하는 이유는?',
        options: ['학습 후반의 보폭을 줄여 최솟값 근처에서 진동을 막으려고', '이동 평균이 0에서 시작해 초기에 작게 추정되는 것을 바로잡으려고', '그래디언트가 갑자기 커질 때 그 영향을 줄여 폭발을 막으려고', 'β 값을 반복마다 점점 키워 오래된 그래디언트를 더 반영하려고'], answer: 1,
        explain: 't가 커지면 βᵗ → 0이라 보정 효과가 사라진다. 특히 β₂ = 0.999는 초기 편향이 크다.' },
      { q: 'AdamW가 "Adam + 손실에 L2 벌점"과 다른 점은?',
        options: ['차이가 없다 — 두 방식은 수학적으로 항상 같은 갱신을 한다', 'L2 그래디언트가 적응적 스케일로 왜곡되지 않게 감쇠를 가중치에 직접 적용한다', 'AdamW는 2차 모멘트를 쓰지 않아 감쇠가 모든 파라미터에 같게 걸린다', 'AdamW는 감쇠를 그래디언트에 더한 뒤 모멘텀에 넣어 효과를 키운다'], answer: 1,
        explain: 'SGD에서는 두 방식이 같지만 적응적 옵티마이저에서는 다르다(Loshchilov & Hutter, "Decoupled Weight Decay Regularization").' },
    ],
    resources: ['Sebastian Ruder, "An overview of gradient descent optimization algorithms" (2016)', 'Kingma & Ba, "Adam: A Method for Stochastic Optimization" (2015)', 'Loshchilov & Hutter, "Decoupled Weight Decay Regularization" (2019)', 'Gabriel Goh, "Why Momentum Really Works" (Distill, 2017 — 시각화)'],
  },
  {
    id: 'dl-init', title: '가중치 초기화',
    summary: R`목표: 층을 지나도 신호의 <strong>분산 유지</strong>
작으면 소실, 크면 폭발·포화 / 모두 같으면 뉴런이 똑같이 학습
ReLU → He, tanh → Xavier`,
    body: R`
<h3>0으로 초기화하면 안 되는 이유: 대칭</h3>
<p>한 층의 모든 가중치가 같은 값이면, 그 층의 모든 뉴런은 같은 입력을 받아 같은 출력을 내고, 역전파에서도 같은 그래디언트를 받는다. 갱신 후에도 여전히 같으므로 뉴런이 100개여도 사실상 1개처럼 동작한다. 그래서 가중치는 <strong>무작위로</strong> 초기화해 대칭을 깬다(편향은 보통 0으로 둬도 된다).</p>
<h3>얼마나 크게: 분산 분석</h3>
<p>뉴런 하나의 입력 $z = \sum_{i=1}^{n} w_i x_i$에서 $w_i$와 $x_i$가 독립이고 평균이 0이면 $\mathrm{Var}(z) = n\,\mathrm{Var}(w)\,\mathrm{Var}(x)$다. 층마다 분산이 $n\,\mathrm{Var}(w)$배가 되므로,</p>
<ul>
<li>$n\,\mathrm{Var}(w) &lt; 1$이면 층을 지날수록 신호가 기하급수적으로 작아지고(그래디언트도 소실),</li>
<li>$n\,\mathrm{Var}(w) &gt; 1$이면 기하급수적으로 커져 폭발하거나, tanh·시그모이드라면 포화되어 기울기가 0이 된다.</li>
</ul>
<p>따라서 $\mathrm{Var}(w) \approx 1/n$이 기준이 된다. 고정된 작은 값(예: 표준편차 0.01)은 층이 얕을 때는 괜찮지만 깊어지면 신호가 사라진다.</p>
<h3>Xavier(Glorot)와 He 초기화</h3>
<ul>
<li><strong>Xavier</strong>: 순전파(입력 수 $n_\text{in}$ 기준)와 역전파(출력 수 $n_\text{out}$ 기준)에서 모두 분산을 유지하도록 절충해 $\mathrm{Var}(w) = 2/(n_\text{in} + n_\text{out})$. 원점 근처에서 선형에 가까운 tanh·시그모이드를 가정한다.</li>
<li><strong>He(Kaiming)</strong>: ReLU는 입력의 절반을 0으로 만들어 분산을 절반으로 줄인다. 이를 보상해 $\mathrm{Var}(w) = 2/n_\text{in}$. ReLU 계열에 Xavier를 쓰면 층마다 분산이 절반씩 줄어든다.</li>
</ul>
<h3>지금도 중요한가</h3>
<p>배치·레이어 정규화와 잔차 연결이 도입되며 초기화에 대한 민감도는 크게 줄었다. 그래도 매우 깊은 망에서는 여전히 중요해서, 예를 들어 GPT-2는 잔차 경로에 더해지는 층의 가중치를 잔차 층 수 $N$에 대해 $1/\sqrt N$배로 줄여 초기화했다. 층이 쌓일수록 잔차 경로의 분산이 커지는 것을 막기 위해서다. RNN에서는 같은 행렬이 시간축으로 반복 곱해지므로 직교 행렬 초기화를 쓰기도 한다.</p>
<p>그리고 가장 강력한 초기화는 <strong>사전 학습된 가중치</strong>다. 대규모 데이터로 학습된 모델에서 시작하는 전이 학습과 파인튜닝은 이미 좋은 표현을 가진 지점에서 출발한다.</p>`,
    analogy: R`<p>전화 게임(말 전달 놀이). 줄 선 사람마다 들은 말을 다음 사람에게 전하는데, 모두가 조금씩 작게 말하면 10명만 지나도 아무것도 안 들리고(소실), 조금씩 크게 말하면 고함이 되어 의미가 뭉개진다(폭발·포화). 각자 "들은 만큼의 크기로" 전하도록 맞추는 것이 Xavier·He 초기화다. 모두에게 같은 대본을 주면(같은 초깃값) 아무리 많은 사람이 있어도 한 사람의 목소리만 들린다(대칭).</p>`,
    diagram: { caption: '깊이에 따른 활성값 크기(로그 눈금, 개념도). 너무 작은 초기화는 신호가 사라지고, 너무 큰 초기화는 폭발한다. ReLU에서는 He 초기화가 크기를 유지한다.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<path class="a" d="M50,200 H500"/><path class="a" d="M50,200 V15"/>
<text x="480" y="213" class="sm">층 깊이 →</text><text x="95" y="12" class="sm">활성값 표준편차 (로그)</text>
<path class="e d" d="M50,110 H490"/><text x="40" y="110" class="sm">1</text>
<path class="e" d="M60,110 L480,25" style="stroke:var(--bad);stroke-width:2"/><text x="480" y="40" class="sm" style="fill:var(--bad)">너무 큼: 폭발</text>
<path class="he" d="M60,112 L480,108"/><text x="430" y="95" class="sm" style="fill:var(--sc)">He (ReLU): 유지</text>
<path class="e" d="M60,112 L480,165" style="stroke-width:2"/><text x="410" y="137" class="sm">Xavier + ReLU: 분산이 층마다 절반</text>
<path class="e" d="M60,115 L480,195" style="stroke:#8a8f98;stroke-width:2"/><text x="330" y="188" class="sm">std 0.01 고정: 소실</text>
</svg>` },
    math: [
      { tex: R`\mathrm{Var}(z) = n_{\text{in}} \,\mathrm{Var}(w)\,\mathrm{Var}(x)`, explain: R`$z = \sum_i w_i x_i$, $w_i$와 $x_i$가 서로 독립이고 평균 0이라는 가정. 층을 지날 때 분산이 유지되려면 $n_\text{in}\mathrm{Var}(w) \approx 1$이어야 한다.` },
      { tex: R`\text{Xavier: } \mathrm{Var}(w) = \frac{2}{n_{\text{in}} + n_{\text{out}}}, \qquad \text{He: } \mathrm{Var}(w) = \frac{2}{n_{\text{in}}}`, explain: R`$n_\text{in}, n_\text{out}$: 층의 입력·출력 뉴런 수. He의 분자 2는 ReLU가 입력의 절반을 0으로 만들어 분산을 반으로 줄이는 것을 보상한다. 정규분포나 같은 분산의 균등분포에서 뽑는다.` },
    ],
    code: R`
import numpy as np

def activation_stds(init, act, layers=20, width=512, seed=0):
  rng = np.random.default_rng(seed)
  h, stds = rng.normal(0, 1, (256, width)), []
  for _ in range(layers):
      z = h @ init(rng, width, width)
      h = np.maximum(0, z) if act == "relu" else np.tanh(z)
      stds.append(h.std())
  return stds, h

INITS = {
  "std 0.01": lambda r, i, o: r.normal(0, 0.01, (i, o)),
  "std 1.0":  lambda r, i, o: r.normal(0, 1.0, (i, o)),
  "Xavier":   lambda r, i, o: r.normal(0, np.sqrt(2 / (i + o)), (i, o)),
  "He":       lambda r, i, o: r.normal(0, np.sqrt(2 / i), (i, o)),
}
for act in ["tanh", "relu"]:
  for name, init in INITS.items():
      s, h = activation_stds(init, act)
      extra = f" | 포화(|h|>0.99) 비율 {np.mean(np.abs(h) > 0.99):.0%}" if act == "tanh" else ""
      print(f"{act:4s} {name:8s}: 1층 {s[0]:9.3g} → 10층 {s[9]:9.3g} → 20층 {s[-1]:9.3g}{extra}")

# 대칭 문제: 같은 값으로 초기화하면 은닉 뉴런들이 같은 그래디언트를 받는다
rng = np.random.default_rng(0)
X, y = rng.normal(size=(16, 3)), rng.normal(size=(16, 1))
W1, W2 = np.full((3, 4), 0.5), np.full((4, 1), 0.5)
h = np.tanh(X @ W1)
d_out = 2 * (h @ W2 - y) / len(X)
dW1 = X.T @ ((d_out @ W2.T) * (1 - h ** 2))
print("\n같은 값 초기화: 은닉 뉴런 4개의 그래디언트가 모두 같은가?", np.allclose(dW1, dW1[:, :1]))
`,
    links: [
      { to: 'dl-activation', why: '활성화 함수의 형태가 알맞은 초기화 분산을 정한다' },
      { to: 'dl-backprop', why: '순전파의 분산 유지는 역전파 그래디언트의 소실·폭발과 직결된다' },
      { to: 'dl-norm', why: '정규화 층이 초기화 민감도를 낮춘다' },
      { to: 'math-prob', why: '독립 확률변수 합의 분산' },
      { to: 'dl-rnn', why: '같은 행렬이 반복 곱해지는 RNN의 초기화' },
      { to: 'ai-finetune', why: '사전 학습된 가중치에서 시작하는 전이 학습' },
    ],
    quiz: [
      { q: '신경망의 모든 가중치를 0(또는 같은 값)으로 초기화하면 생기는 문제는?',
        options: ['출력이 모두 0이라 손실이 계산되지 않아 학습이 시작조차 안 된다', '같은 층 뉴런들이 같은 그래디언트를 받아 계속 똑같이 갱신된다', '그래디언트가 매 층마다 두 배로 커져 곧바로 폭발한다', '편향만 학습되고 가중치는 끝까지 0으로 남는다'], answer: 1,
        explain: '대칭이 깨지지 않는다. 그래서 가중치는 무작위로 초기화한다.' },
      { q: '입력 뉴런 수가 n인 층에서 가중치 분산을 약 1/n로 맞추는 이유는?',
        options: ['분산이 작을수록 행렬 곱이 희소해져 계산이 빨라지기 때문', 'n·Var(w) ≈ 1이어야 층을 지나도 신호의 분산이 유지되기 때문', '가중치 합이 1이 되어야 출력이 입력의 가중 평균이 되기 때문', '1/n보다 크면 가중치가 음수가 될 확률이 커지기 때문'], answer: 1,
        explain: 'z = Σ wᵢxᵢ의 분산은 n·Var(w)·Var(x)이므로 n·Var(w) ≈ 1이어야 층을 지나도 신호의 분산이 유지된다. 1보다 작으면 깊이에 따라 신호가 사라지고, 크면 폭발하거나 포화된다.' },
      { q: 'ReLU를 쓰는 망에 He 초기화(Var = 2/n_in)를 쓰는 이유는?',
        options: ['ReLU는 출력 평균이 0이라 분산이 두 배로 커지는 것을 막으려고', 'ReLU가 입력 절반을 0으로 만들어 분산이 반으로 주는 것을 보상하려고', 'ReLU는 0에서 미분 불가능해 기울기를 두 배로 키워 둬야 해서', '출력층과 입력층 뉴런 수의 평균을 쓰는 Xavier와 맞추려고'], answer: 1,
        explain: 'Xavier를 그대로 쓰면 층마다 분산이 절반씩 줄어 깊은 ReLU 망에서 신호가 약해진다.' },
    ],
    resources: ['Glorot & Bengio, "Understanding the difficulty of training deep feedforward neural networks" (2010)', 'He et al., "Delving Deep into Rectifiers" (2015, He 초기화)', 'deeplearning.ai, "Initializing neural networks" (인터랙티브 해설)', 'Radford et al., "Language Models are Unsupervised Multitask Learners" (GPT-2, 2019)'],
  },
  {
    id: 'dl-norm', title: '정규화 기법: BatchNorm·LayerNorm·Dropout',
    summary: R`BatchNorm·LayerNorm: 층 입력의 평균·분산을 맞춰 <strong>학습 안정화</strong>
드롭아웃·weight decay: 과적합 억제(정규화)`,
    body: R`
<h3>배치 정규화 (BatchNorm)</h3>
<p>미니배치 안에서 <strong>특성(채널)마다</strong> 평균과 분산을 구해 표준화한 뒤, 학습 가능한 배율 $\gamma$와 이동 $\beta$를 적용한다. $\gamma, \beta$가 있어서 필요하면 원래 분포로 되돌릴 수도 있으므로 표현력을 잃지 않는다. 효과는 크다: 더 큰 학습률을 쓸 수 있고, 초기화에 덜 민감해지고, 깊은 CNN 학습이 쉬워졌다. 처음에는 "층 입력 분포의 변화(internal covariate shift)를 줄이기 때문"이라고 설명했지만, 이후 연구는 손실 지형을 더 매끄럽게 만들어 그래디언트를 예측 가능하게 하는 효과를 더 중요한 이유로 제시했다.</p>
<ul>
<li><strong>학습과 추론의 차이</strong>: 학습 중에는 배치 통계를 쓰면서 그 이동 평균을 따로 저장해 두고, 추론 때는 저장된 통계를 쓴다. 추론할 때 샘플이 한 개뿐이어도 결과가 다른 샘플에 좌우되지 않게 하기 위해서다. PyTorch에서 <code>model.eval()</code>을 잊으면 추론 결과가 배치 구성에 따라 흔들린다.</li>
<li><strong>작은 배치에 약함</strong>: 배치가 작으면 배치 평균·분산 추정이 크게 흔들린다. 또 같은 배치의 다른 샘플에 의존한다.</li>
</ul>
<h3>레이어 정규화 (LayerNorm)와 변형</h3>
<p><strong>샘플 하나 안에서</strong> 특성 차원 전체의 평균·분산으로 정규화한다. 배치 크기와 무관하고, 학습과 추론의 계산이 같으며, 시퀀스 길이가 제각각인 데이터에도 자연스럽다. 그래서 RNN과 <strong>Transformer의 표준</strong>이다. Transformer에서 정규화를 잔차 연결 앞에 두는 Pre-LN 배치가 깊은 모델에서 더 안정적으로 학습되는 것으로 알려져 있다. <strong>RMSNorm</strong>은 평균을 빼지 않고 제곱평균제곱근으로만 나누는 단순화 버전으로, LLaMA 등 최근 LLM이 쓴다. 비전에서 배치가 작을 때는 채널을 묶어 정규화하는 GroupNorm을 쓴다.</p>
<h3>드롭아웃</h3>
<p>학습 중 매 스텝마다 뉴런을 확률 $p$로 무작위로 꺼서(0으로) 계산한다. 특정 뉴런들이 서로에게 지나치게 의존하는 것(공동 적응)을 막고, 매번 다른 부분 네트워크를 학습하는 셈이라 <strong>지수적으로 많은 망의 앙상블</strong>을 근사하는 효과가 있다. 현대 구현은 학습 때 살아남은 값을 $1/(1-p)$배로 키워 기대값을 유지하고(inverted dropout), 추론 때는 아무것도 끄지 않고 그대로 계산한다. 이것도 <code>model.eval()</code>로 전환한다.</p>
<h3>그 밖의 규제</h3>
<ul>
<li><strong>weight decay</strong>: 매 스텝 가중치를 조금씩 줄여 작은 가중치를 선호하게 한다(L2 정규화의 딥러닝 버전, Adam 계열에서는 AdamW로 분리 적용).</li>
<li><strong>데이터 증강</strong>: 이미지를 뒤집고 자르고 색을 바꿔 같은 레이블의 다양한 입력을 만든다. 모델이 보존해야 할 불변성을 직접 가르친다.</li>
<li><strong>조기 종료</strong>: 검증 손실이 더 나아지지 않으면 멈춘다.</li>
<li><strong>레이블 스무딩</strong>: 정답 확률 목표를 1이 아니라 0.9처럼 조금 낮춰 지나친 확신을 막는다.</li>
</ul>`,
    analogy: R`<p>여러 반의 시험 점수 비교. 반마다 시험 난이도가 다르면 점수를 그대로 비교할 수 없으니, 반별로 평균 0·표준편차 1로 환산한다 — <strong>배치 정규화</strong>는 "같은 과목(특성)을 여러 학생(배치)에 걸쳐" 환산하고, <strong>레이어 정규화</strong>는 "한 학생의 여러 과목 점수를" 그 학생 안에서 환산한다. <strong>드롭아웃</strong>은 팀 프로젝트에서 매번 무작위로 몇 명을 빼고 진행해, 특정 에이스 한 명에게만 의존하지 않는 팀을 만드는 것이다.</p>`,
    diagram: { caption: '(배치 × 특성) 텐서에서 BatchNorm은 특성 하나를 배치 전체에 걸쳐(열), LayerNorm은 샘플 하나의 특성 전체에 걸쳐(행) 평균·분산을 구한다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="140" y="14">BatchNorm: 열 방향</text><text x="420" y="14">LayerNorm: 행 방향</text>
<g>
  <rect class="n" x="40" y="30" width="40" height="30"/><rect class="h" x="80" y="30" width="40" height="30"/><rect class="n" x="120" y="30" width="40" height="30"/><rect class="n" x="160" y="30" width="40" height="30"/><rect class="n" x="200" y="30" width="40" height="30"/>
  <rect class="n" x="40" y="60" width="40" height="30"/><rect class="h" x="80" y="60" width="40" height="30"/><rect class="n" x="120" y="60" width="40" height="30"/><rect class="n" x="160" y="60" width="40" height="30"/><rect class="n" x="200" y="60" width="40" height="30"/>
  <rect class="n" x="40" y="90" width="40" height="30"/><rect class="h" x="80" y="90" width="40" height="30"/><rect class="n" x="120" y="90" width="40" height="30"/><rect class="n" x="160" y="90" width="40" height="30"/><rect class="n" x="200" y="90" width="40" height="30"/>
  <rect class="n" x="40" y="120" width="40" height="30"/><rect class="h" x="80" y="120" width="40" height="30"/><rect class="n" x="120" y="120" width="40" height="30"/><rect class="n" x="160" y="120" width="40" height="30"/><rect class="n" x="200" y="120" width="40" height="30"/>
</g>
<text x="18" y="90" class="sm">배치</text><text x="140" y="165" class="sm">특성 →</text>
<text x="140" y="190" class="sm">배치 크기에 의존, 추론 땐 이동 평균 통계</text>
<g>
  <rect class="n" x="320" y="30" width="40" height="30"/><rect class="n" x="360" y="30" width="40" height="30"/><rect class="n" x="400" y="30" width="40" height="30"/><rect class="n" x="440" y="30" width="40" height="30"/><rect class="n" x="480" y="30" width="40" height="30"/>
  <rect class="h" x="320" y="60" width="40" height="30"/><rect class="h" x="360" y="60" width="40" height="30"/><rect class="h" x="400" y="60" width="40" height="30"/><rect class="h" x="440" y="60" width="40" height="30"/><rect class="h" x="480" y="60" width="40" height="30"/>
  <rect class="n" x="320" y="90" width="40" height="30"/><rect class="n" x="360" y="90" width="40" height="30"/><rect class="n" x="400" y="90" width="40" height="30"/><rect class="n" x="440" y="90" width="40" height="30"/><rect class="n" x="480" y="90" width="40" height="30"/>
  <rect class="n" x="320" y="120" width="40" height="30"/><rect class="n" x="360" y="120" width="40" height="30"/><rect class="n" x="400" y="120" width="40" height="30"/><rect class="n" x="440" y="120" width="40" height="30"/><rect class="n" x="480" y="120" width="40" height="30"/>
</g>
<text x="298" y="90" class="sm">배치</text><text x="420" y="165" class="sm">특성 →</text>
<text x="420" y="190" class="sm">샘플마다 독립, 학습·추론 계산 동일</text>
</svg>` },
    math: [
      { tex: R`\hat x_{i} = \frac{x_{i} - \mu_{\mathcal B}}{\sqrt{\sigma_{\mathcal B}^2 + \epsilon}}, \qquad y_i = \gamma\,\hat x_i + \beta`, explain: R`배치 정규화.<ul class="defs"><li>$\mu_\mathcal B, \sigma^2_\mathcal B$: 미니배치 안에서 이 특성의 평균·분산(LayerNorm은 같은 식을 샘플 하나의 특성들에 적용)</li><li>$\epsilon$: 0으로 나누기 방지</li><li>$\gamma, \beta$: 학습되는 배율과 이동</li></ul>` },
      { tex: R`\tilde h = \frac{m \odot h}{1 - p},\ \ m_j \sim \text{Bernoulli}(1 - p) \;\Rightarrow\; \mathbb{E}[\tilde h] = h`, explain: R`역드롭아웃.<ul class="defs"><li>$p$: 끄는 확률</li><li>$m$: 0/1 마스크</li></ul>살아남은 값을 $1/(1-p)$배로 키워 기대값을 유지하므로, 추론 때는 스케일 조정 없이 그대로 계산하면 된다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

def batch_norm(x, eps=1e-5):
  mu, var = x.mean(axis=0), x.var(axis=0)                    # 특성(열)마다, 배치 방향으로
  return (x - mu) / np.sqrt(var + eps), mu, var

def layer_norm(x, eps=1e-5):
  mu, var = x.mean(axis=1, keepdims=True), x.var(axis=1, keepdims=True)   # 샘플(행)마다
  return (x - mu) / np.sqrt(var + eps)

x = rng.normal(5, 3, (32, 8))                                   # 배치 32 × 특성 8
bn, _, _ = batch_norm(x)
ln = layer_norm(x)
print("BN 후 특성별 평균·표준편차:", bn.mean(0)[:3].round(3), bn.std(0)[:3].round(3))
print("LN 후 샘플별 평균·표준편차:", ln.mean(1)[:3].round(3), ln.std(1)[:3].round(3))

running_mu, running_var = np.zeros(8), np.ones(8)               # 학습 중 쌓는 이동 평균 통계
for _ in range(200):
  _, m, v = batch_norm(rng.normal(5, 3, (32, 8)))
  running_mu = 0.9 * running_mu + 0.1 * m
  running_var = 0.9 * running_var + 0.1 * v
single = rng.normal(5, 3, (1, 8))
print("\n추론: 샘플 1개를 '배치 통계'로 정규화 →", batch_norm(single)[0][0, :3], "(분산 0 → 정보 소실)")
print("추론: 이동 평균 통계로 정규화        →", ((single - running_mu) / np.sqrt(running_var + 1e-5))[0, :3].round(2))

print()
for B in [2, 8, 64]:                                            # 작은 배치일수록 배치 통계가 흔들린다
  means = [rng.normal(5, 3, B).mean() for _ in range(2000)]
  print(f"배치 크기 {B:2d}: 배치 평균 추정치의 표준편차 {np.std(means):.2f}")

p, h = 0.5, np.ones(100_000)                                    # 역드롭아웃: 기대값 유지
mask = rng.random(h.shape) > p
print(f"\n드롭아웃 p={p}: 학습 출력 평균 {(h * mask / (1 - p)).mean():.3f} (추론 출력 = 원래 값 1.0)")
`,
    links: [
      { to: 'dl-init', why: '정규화 층이 초기화에 대한 민감도를 낮춘다' },
      { to: 'dl-optim', why: '정규화 덕분에 더 큰 학습률을 쓸 수 있다, AdamW의 weight decay' },
      { to: 'dl-transformer', why: 'Transformer 블록의 LayerNorm(Pre-LN), LLM의 RMSNorm' },
      { to: 'ml-regularization', why: 'weight decay = L2 정규화, 과적합과 규제의 원리' },
      { to: 'ml-ensemble', why: '드롭아웃은 수많은 부분 네트워크의 앙상블 근사' },
      { to: 'ml-feature', why: '입력 표준화의 아이디어를 층마다 적용한 것' },
    ],
    quiz: [
      { q: 'BatchNorm을 쓴 모델로 추론할 때 model.eval()을 호출하지 않으면 생기는 문제는?',
        options: ['아무 문제 없다 — BatchNorm은 학습과 추론에서 같은 계산을 한다', '추론 배치의 통계로 정규화해 결과가 같이 들어온 샘플에 따라 달라진다', 'BatchNorm의 가중치가 추론 배치로 다시 학습되어 덮어써진다', '이동 평균이 0으로 초기화되어 모든 출력이 0이 된다'], answer: 1,
        explain: 'train 모드에서는 지금 들어온 배치의 통계로 정규화하므로, 같은 샘플이라도 함께 들어온 다른 샘플에 따라 결과가 달라지고 드롭아웃도 계속 적용된다. eval 모드에서는 학습 중 저장한 이동 평균 통계를 쓰고 드롭아웃을 끈다.' },
      { q: 'Transformer가 BatchNorm 대신 LayerNorm을 쓰는 주된 이유는?',
        options: ['LayerNorm은 학습 가능한 파라미터가 없어 모델이 더 가벼워지기 때문', '샘플 하나 안에서 정규화해 배치 크기·길이와 무관하고 학습·추론이 같아서', 'BatchNorm은 어텐션의 소프트맥스와 함께 쓰면 수학적으로 정의되지 않아서', 'LayerNorm은 위치 정보를 함께 정규화해 위치 인코딩이 필요 없어서'], answer: 1,
        explain: '가변 길이 시퀀스와 작은 배치, 토큰 하나씩 생성하는 추론에서 배치 통계는 다루기 어렵다.' },
      { q: '역드롭아웃(p = 0.5)이 학습 중 살아남은 값을 2배로 키우는 이유는?',
        options: ['살아남은 뉴런의 그래디언트를 키워 학습 속도를 두 배로 높이려고', '출력 기대값을 유지해, 추론 때 아무 조정 없이 모든 뉴런을 쓰려고', '값이 커지면 포화가 일어나 과적합을 막는 정규화 효과가 생겨서', '꺼진 뉴런의 값을 살아남은 뉴런에 그대로 옮겨 정보를 보존하려고'], answer: 1,
        explain: '기대값 = (1 − p) × (1/(1 − p)) × h = h. 원래 논문 방식은 반대로 추론 때 출력을 (1 − p)배로 줄였다.' },
    ],
    resources: ['Ioffe & Szegedy, "Batch Normalization" (2015)', 'Ba, Kiros, Hinton, "Layer Normalization" (2016)', 'Srivastava et al., "Dropout: A Simple Way to Prevent Neural Networks from Overfitting" (2014)', 'Santurkar et al., "How Does Batch Normalization Help Optimization?" (2018)'],
  },
  {
    id: 'dl-cnn', title: 'CNN',
    summary: R`작은 필터를 이미지 전체에 <strong>공유</strong>하며 미끄러뜨려 지역 패턴 탐지
파라미터 적음 + 위치가 바뀌어도 같은 패턴 인식
층이 깊을수록 넓고 추상적인 특징`,
    body: R`
<h3>왜 완전 연결층으로는 안 되는가</h3>
<p>224×224 컬러 이미지는 15만 개의 입력이다. 은닉 뉴런 1,000개를 완전 연결하면 가중치만 1.5억 개고, 고양이가 왼쪽에 있을 때와 오른쪽에 있을 때를 <strong>따로따로</strong> 학습해야 한다. 이미지에는 두 가지 구조가 있다: 의미 있는 패턴은 <strong>국소적</strong>이고(가까운 픽셀끼리 관련), 같은 패턴은 <strong>어디에나</strong> 나타날 수 있다. CNN은 이 두 가지를 구조로 집어넣은 귀납 편향이다.</p>
<h3>합성곱 연산</h3>
<p>$k \times k \times C_\text{in}$ 크기의 필터(커널)를 이미지 위로 한 칸씩 옮기며, 각 위치에서 겹치는 영역과 내적해 값 하나를 만든다. 그 결과가 <strong>특성 맵</strong>이다. 필터를 $C_\text{out}$개 쓰면 출력 채널이 $C_\text{out}$개가 된다.</p>
<ul>
<li><strong>지역 연결</strong>: 출력 하나는 입력의 작은 영역(예: 3×3)만 본다.</li>
<li><strong>가중치 공유</strong>: 같은 필터를 모든 위치에 쓴다. 파라미터 수가 이미지 크기와 무관하게 $k^2 C_\text{in} C_\text{out}$(+ 편향)이다.</li>
<li><strong>이동 등변성</strong>: 입력이 옮겨지면 출력 특성 맵도 같은 만큼 옮겨진다. 왼쪽 고양이를 찾는 필터가 오른쪽 고양이도 찾는다.</li>
</ul>
<p>참고로 딥러닝 라이브러리의 "합성곱"은 수학적으로는 커널을 뒤집지 않는 교차상관이다. 커널이 학습되므로 차이는 없다. 실제 구현은 패치들을 펼쳐(im2col) 큰 <strong>행렬 곱</strong> 하나로 바꾸거나 전용 알고리즘을 써 GPU에서 빠르게 계산한다.</p>
<h3>패딩, 스트라이드, 풀링</h3>
<p>테두리에 0을 덧대는 <strong>패딩</strong>으로 출력 크기를 유지하고, 필터를 여러 칸씩 건너뛰는 <strong>스트라이드</strong>로 출력을 줄인다. <strong>풀링</strong>(영역의 최댓값·평균)은 해상도를 줄여 계산을 아끼고 작은 이동에 덜 민감하게 만든다. 최근 구조는 풀링 대신 스트라이드 합성곱을 쓰기도 한다. 1×1 합성곱은 공간은 그대로 두고 채널끼리만 섞어 채널 수를 조절한다.</p>
<h3>수용 영역과 계층적 특징</h3>
<p>3×3 합성곱을 두 번 쌓으면 출력 하나가 입력의 5×5를, 세 번이면 7×7을 본다. 층이 깊어질수록 <strong>수용 영역</strong>이 넓어지고, 학습된 필터를 시각화하면 앞쪽 층은 모서리와 색 대비, 중간 층은 질감과 무늬, 뒤쪽 층은 눈·바퀴 같은 부분과 물체 전체에 반응하는 경향이 관찰된다. 작은 필터를 여러 층 쌓는 것이 큰 필터 하나보다 파라미터가 적고 비선형성이 많다(VGG의 설계 원리).</p>
<h3>대표 구조의 흐름</h3>
<ul>
<li><strong>LeNet</strong>(1998): 손글씨 숫자 인식.</li>
<li><strong>AlexNet</strong>(2012): ImageNet 대회에서 큰 격차로 우승하며 딥러닝 붐을 일으켰다. GPU 학습, ReLU, 드롭아웃, 데이터 증강.</li>
<li><strong>VGG</strong>(2014): 3×3 합성곱을 깊게 쌓기.</li>
<li><strong>ResNet</strong>(2015): 층의 출력에 입력을 더하는 <strong>잔차 연결</strong> $\mathbf y = F(\mathbf x) + \mathbf x$. 층은 "변화량"만 학습하면 되고, 그래디언트가 덧셈 경로로 곧장 흐르므로 100층 이상도 학습할 수 있게 되었다. 이 아이디어는 Transformer에도 그대로 쓰인다.</li>
</ul>
<p>대규모 데이터로 학습된 CNN을 가져와 마지막 층만 바꿔 다시 학습하는 <strong>전이 학습</strong>은 데이터가 적은 이미지 문제의 표준 방법이다. 이미지를 패치로 잘라 토큰처럼 Transformer에 넣는 ViT가 대규모 학습에서 강력한 대안이 되었지만, CNN은 여전히 효율과 적은 데이터에서 강점이 있다.</p>`,
    analogy: R`<p>돋보기로 그림 훑기. 고양이 귀 모양이 그려진 작은 투명 필름(필터) 한 장을 그림 위로 한 칸씩 옮기며 얼마나 겹치는지 표시하면, 귀가 어디에 있든 찾아낸다(가중치 공유, 이동 등변성). 위치마다 다른 필름을 만들 필요가 없다. 첫 단계는 "선이 있다" 정도만 표시하고, 그 표시 지도를 다시 훑으며 "선이 모여 귀 모양이다", 그다음 "귀와 눈이 모여 고양이다"를 찾는 것이 층을 쌓는 것이다.</p>`,
    diagram: { caption: '3×3 필터가 5×5 입력 위를 미끄러지며 각 위치에서 겹치는 영역과 내적해 3×3 특성 맵을 만든다. 모든 위치에서 같은 필터(9개 가중치)를 공유한다.', svg: R`
<svg viewBox="0 0 560 208" width="560">
<text x="110" y="14" class="sm">입력 5×5</text><text x="310" y="14" class="sm">필터 3×3 (공유)</text><text x="480" y="14" class="sm">특성 맵 3×3</text>
<g>
  <rect class="h" x="30" y="25" width="32" height="32"/><rect class="h" x="62" y="25" width="32" height="32"/><rect class="h" x="94" y="25" width="32" height="32"/><rect class="n" x="126" y="25" width="32" height="32"/><rect class="n" x="158" y="25" width="32" height="32"/>
  <rect class="h" x="30" y="57" width="32" height="32"/><rect class="h" x="62" y="57" width="32" height="32"/><rect class="h" x="94" y="57" width="32" height="32"/><rect class="n" x="126" y="57" width="32" height="32"/><rect class="n" x="158" y="57" width="32" height="32"/>
  <rect class="h" x="30" y="89" width="32" height="32"/><rect class="h" x="62" y="89" width="32" height="32"/><rect class="h" x="94" y="89" width="32" height="32"/><rect class="n" x="126" y="89" width="32" height="32"/><rect class="n" x="158" y="89" width="32" height="32"/>
  <rect class="n" x="30" y="121" width="32" height="32"/><rect class="n" x="62" y="121" width="32" height="32"/><rect class="n" x="94" y="121" width="32" height="32"/><rect class="n" x="126" y="121" width="32" height="32"/><rect class="n" x="158" y="121" width="32" height="32"/>
  <rect class="n" x="30" y="153" width="32" height="32"/><rect class="n" x="62" y="153" width="32" height="32"/><rect class="n" x="94" y="153" width="32" height="32"/><rect class="n" x="126" y="153" width="32" height="32"/><rect class="n" x="158" y="153" width="32" height="32"/>
</g>
<rect class="e d" x="62" y="57" width="96" height="96" style="stroke:var(--sc)"/>
<text x="110" y="196" class="sm">점선: 다음 위치 (같은 필터)</text>
<g>
  <rect class="g" x="262" y="57" width="32" height="32"/><rect class="g" x="294" y="57" width="32" height="32"/><rect class="g" x="326" y="57" width="32" height="32"/>
  <rect class="g" x="262" y="89" width="32" height="32"/><rect class="g" x="294" y="89" width="32" height="32"/><rect class="g" x="326" y="89" width="32" height="32"/>
  <rect class="g" x="262" y="121" width="32" height="32"/><rect class="g" x="294" y="121" width="32" height="32"/><rect class="g" x="326" y="121" width="32" height="32"/>
</g>
<text x="278" y="73" class="sm">−1</text><text x="310" y="73" class="sm">0</text><text x="342" y="73" class="sm">1</text>
<text x="278" y="105" class="sm">−2</text><text x="310" y="105" class="sm">0</text><text x="342" y="105" class="sm">2</text>
<text x="278" y="137" class="sm">−1</text><text x="310" y="137" class="sm">0</text><text x="342" y="137" class="sm">1</text>
<path class="a" d="M195,105 H255"/><text x="225" y="95" class="sm">내적</text>
<path class="a" d="M365,105 H425"/>
<rect class="h" x="432" y="57" width="32" height="32"/><rect class="n" x="464" y="57" width="32" height="32"/><rect class="n" x="496" y="57" width="32" height="32"/>
<rect class="n" x="432" y="89" width="32" height="32"/><rect class="n" x="464" y="89" width="32" height="32"/><rect class="n" x="496" y="89" width="32" height="32"/>
<rect class="n" x="432" y="121" width="32" height="32"/><rect class="n" x="464" y="121" width="32" height="32"/><rect class="n" x="496" y="121" width="32" height="32"/>
<text x="480" y="175" class="sm">위치마다 값 하나</text>
</svg>` },
    math: [
      { tex: R`Y[c_o, i, j] = b_{c_o} + \sum_{c=1}^{C_{\text{in}}} \sum_{u=0}^{k-1}\sum_{v=0}^{k-1} K[c_o, c, u, v]\; X[c,\ i\cdot s + u,\ j\cdot s + v]`, explain: R`합성곱 층(교차상관 형태).<ul class="defs"><li>$X$: 입력(채널 × 높이 × 너비)</li><li>$K$: 필터</li><li>$c_o$: 출력 채널</li><li>$s$: 스트라이드</li></ul>같은 $K$가 모든 위치 $(i, j)$에 쓰인다(가중치 공유).` },
      { tex: R`n_{\text{out}} = \left\lfloor \frac{n + 2p - k}{s} \right\rfloor + 1, \qquad \#\text{params} = k^2\, C_{\text{in}}\, C_{\text{out}} + C_{\text{out}}`, explain: R`<ul class="defs"><li>$n$: 입력 한 변의 크기</li><li>$p$: 패딩</li><li>$k$: 커널 크기</li><li>$s$: 스트라이드</li></ul>예: $n = 224, k = 3, p = 1, s = 1$이면 224(크기 유지), $s = 2$면 112. 파라미터 수는 이미지 크기와 무관하다.` },
    ],
    code: R`
import numpy as np

def conv2d(img, k):                               # 딥러닝의 '합성곱' = 교차상관 (커널을 뒤집지 않음)
  H, W = img.shape
  kh, kw = k.shape
  out = np.zeros((H - kh + 1, W - kw + 1))
  for i in range(out.shape[0]):
      for j in range(out.shape[1]):
          out[i, j] = np.sum(img[i:i + kh, j:j + kw] * k)    # 같은 커널을 모든 위치에 공유
  return out

img = np.zeros((8, 8))
img[2:6, 2:6] = 1.0                               # 가운데 흰 사각형
sobel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], float)   # 세로 경계(가로 방향 밝기 변화) 검출
edges = conv2d(img, sobel_x)
print("세로 경계 검출 결과 (6×6):\n", edges.astype(int))

shifted = np.roll(img, 1, axis=1)                 # 입력을 오른쪽으로 한 칸 이동
print("이동 등변성 — 출력도 한 칸 이동했는가?", np.allclose(conv2d(shifted, sobel_x)[:, 1:], edges[:, :-1]))

patches = np.array([img[i:i + 3, j:j + 3].ravel() for i in range(6) for j in range(6)])   # im2col: (36, 9)
print("im2col + 행렬 곱 결과가 같은가?", np.allclose((patches @ sobel_x.ravel()).reshape(6, 6), edges))

def out_size(n, k, p=0, s=1):
  return (n + 2 * p - k) // s + 1
print("\n224 입력, 3×3, 패딩 1 → 스트라이드 1:", out_size(224, 3, 1, 1), "/ 스트라이드 2:", out_size(224, 3, 1, 2))
fc = 224 * 224 * 3 * 64 + 64                      # 완전 연결로 은닉 64개
conv = 3 * 3 * 3 * 64 + 64                        # 3×3 필터 64개
print(f"파라미터 수: 완전 연결 {fc:,} vs 합성곱 {conv:,}")
print("3×3 합성곱을 L층 쌓은 수용 영역:", {L: f"{2 * L + 1}×{2 * L + 1}" for L in (1, 2, 3, 5)})
`,
    links: [
      { to: 'ca-gpu', why: '합성곱은 im2col 등으로 행렬 곱이 되어 GPU에서 빠르다' },
      { to: 'ca-simd', why: '같은 연산을 수많은 위치에 반복하는 데이터 병렬성' },
      { to: 'dl-mlp', why: '완전 연결층과 비교한 지역 연결·가중치 공유' },
      { to: 'dl-norm', why: 'CNN 학습을 안정시킨 BatchNorm' },
      { to: 'ml-feature', why: '사람이 설계하던 이미지 특징(경계 검출 필터)을 학습으로 대체' },
      { to: 'dl-transformer', why: '이미지를 패치 토큰으로 다루는 ViT, ResNet과 같은 잔차 연결' },
    ],
    quiz: [
      { q: 'CNN이 완전 연결 신경망보다 이미지에서 훨씬 적은 파라미터로 잘 동작하는 이유는?',
        options: ['합성곱 전에 이미지를 흑백으로 바꿔 입력 채널을 줄이기 때문', '지역 연결과 가중치 공유 덕분에 파라미터 수가 이미지 크기와 무관해서', '풀링으로 이미지를 먼저 작게 줄인 뒤 완전 연결층에 넣기 때문', '필터 값을 학습하지 않고 고정된 에지 검출기를 쓰기 때문'], answer: 1,
        explain: '이미지의 국소성과 위치 무관성이라는 구조를 귀납 편향으로 넣은 것이다. 그래서 적은 데이터로도 일반화가 잘 된다.' },
      { q: '입력 32×32, 커널 5×5, 패딩 0, 스트라이드 1이면 출력 크기는?',
        options: ['32×32', '28×28', '27×27', '30×30'], answer: 1,
        explain: '(32 + 0 − 5) / 1 + 1 = 28.' },
      { q: 'ResNet의 잔차 연결(y = F(x) + x)이 매우 깊은 망의 학습을 가능하게 한 이유는?',
        options: ['잔차 연결이 있으면 층마다 파라미터를 공유해 학습할 양이 줄기 때문', '층이 변화량만 배우면 되고, 덧셈 경로로 그래디언트가 곧장 흐르기 때문', '잔차 연결은 활성화 함수를 없애 망 전체를 선형으로 만들기 때문', '입력을 더하면 출력 분산이 줄어 BatchNorm이 필요 없어지기 때문'], answer: 1,
        explain: 'F가 0을 학습하면 항등 함수가 되므로 층을 추가해도 최소한 나빠지지 않는다. Transformer도 같은 구조를 쓴다.' },
    ],
    resources: ['Stanford CS231n — Convolutional Neural Networks for Visual Recognition (강의 노트·영상)', 'He et al., "Deep Residual Learning for Image Recognition" (ResNet, 2015)', 'Krizhevsky, Sutskever, Hinton, "ImageNet Classification with Deep Convolutional Neural Networks" (AlexNet, 2012)', 'Zeiler & Fergus, "Visualizing and Understanding Convolutional Networks" (2014)'],
  },
  {
    id: 'dl-rnn', title: 'RNN',
    summary: R`같은 셀을 시간축으로 반복, 은닉 상태에 과거 요약
가변 길이 시퀀스 처리 가능
한계: 같은 행렬의 반복 곱 → <strong>기울기 소실·폭발</strong>, 병렬화 불가`,
    body: R`
<h3>상태를 가진 신경망</h3>
<p>문장, 음성, 주가처럼 순서가 의미를 가지는 데이터는 길이도 제각각이다. RNN은 매 시점 $t$에서 입력 $\mathbf x_t$와 이전 은닉 상태 $\mathbf h_{t-1}$을 받아 새 상태 $\mathbf h_t = \tanh(W_h \mathbf h_{t-1} + W_x \mathbf x_t + \mathbf b)$를 만든다. 은닉 상태는 "지금까지 읽은 내용의 요약"이다. 핵심은 <strong>모든 시점에서 같은 가중치</strong>를 쓴다는 것이다. 그래서 파라미터 수가 시퀀스 길이와 무관하고, 3번째 단어에서 배운 패턴을 30번째 단어에도 적용한다(시간축의 가중치 공유 — CNN이 공간에서 하는 일과 같다).</p>
<h3>입출력 형태</h3>
<ul>
<li><strong>다대일</strong>: 문장 전체를 읽고 마지막 상태로 감성 분류.</li>
<li><strong>다대다(같은 길이)</strong>: 매 시점마다 출력 — 품사 태깅, 다음 문자 예측(언어 모델).</li>
<li><strong>시퀀스-투-시퀀스</strong>: 인코더 RNN이 입력 문장을 읽어 상태로 요약하고, 디코더 RNN이 그 상태에서 출력 문장을 생성 — 기계 번역. 디코더 학습 때 이전 시점의 정답 토큰을 입력으로 넣는 것을 teacher forcing이라 한다.</li>
</ul>
<p>양방향 RNN은 앞에서 뒤로, 뒤에서 앞으로 두 번 읽어 양쪽 문맥을 함께 쓴다(문장 전체가 주어지는 분류·태깅에 한정).</p>
<h3>시간 방향 역전파(BPTT)와 그 문제</h3>
<p>RNN을 시간축으로 펼치면 시퀀스 길이만큼 깊은 신경망이 되고, 같은 방식으로 역전파한다. 그런데 $t$ 시점의 손실이 $k$ 시점의 상태에 미치는 영향은 $\partial \mathbf h_t/\partial \mathbf h_k = \prod_{j=k+1}^{t} \mathrm{diag}(\tanh'(\cdot))\, W_h$로, <strong>같은 행렬 $W_h$가 $t-k$번 곱해진다</strong>. 행렬을 거듭 곱하면 크기가 그 행렬의 가장 큰 특이값(대략적으로는 고윳값의 크기)의 거듭제곱처럼 변한다.</p>
<ul>
<li>그 값이 1보다 작으면 → 그래디언트가 지수적으로 사라진다(<strong>소실</strong>). 먼 과거의 정보가 지금의 손실에 기여하는지 학습할 수 없어, 긴 의존 관계("문장 처음의 주어"와 "끝의 동사 형태")를 배우지 못한다. tanh의 도함수(≤ 1)가 곱해져 더 심해진다.</li>
<li>1보다 크면 → 지수적으로 커진다(<strong>폭발</strong>). 손실이 갑자기 NaN이 된다.</li>
</ul>
<p>폭발은 <strong>그래디언트 클리핑</strong>(노름이 기준을 넘으면 비율로 줄이기)으로 비교적 쉽게 막지만, 소실은 구조를 바꿔야 한다 → LSTM·GRU. 매우 긴 시퀀스는 일정 길이로 잘라 역전파하는 truncated BPTT를 쓴다.</p>
<h3>순차성이라는 한계</h3>
<p>$\mathbf h_t$를 계산하려면 $\mathbf h_{t-1}$이 있어야 하므로, 시퀀스 길이 방향으로는 병렬화할 수 없다. GPU가 수천 개 연산을 동시에 할 수 있어도 1,000단어 문장은 1,000번 차례로 계산해야 한다. 또 모든 정보를 고정 크기 은닉 상태에 압축해야 한다. 이 두 한계가 어텐션과 Transformer의 등장 배경이다.</p>`,
    analogy: R`<p>책을 읽으며 <strong>한 줄 요약 메모</strong>만 갱신해 가는 독자. 새 문장을 읽을 때마다 "지금까지의 요약 + 새 문장"으로 요약을 고쳐 쓴다(같은 방식을 매 문장에 반복). 메모 칸이 작아서 300쪽 전의 세부 사항은 흐려지고(정보 압축과 소실), 앞 문장을 다 읽어야 다음 문장을 읽을 수 있어 여러 사람이 나눠 읽을 수도 없다(순차성).</p>`,
    diagram: { caption: '시간축으로 펼친 RNN. 모든 시점이 같은 가중치 W를 공유한다. 역전파(점선)는 같은 행렬을 시간 길이만큼 거듭 곱하므로 소실·폭발이 생긴다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="30" y="100" class="sm">h₀</text>
<rect class="h" x="70" y="80" width="80" height="40" rx="8"/><text x="110" y="100">RNN</text>
<rect class="h" x="220" y="80" width="80" height="40" rx="8"/><text x="260" y="100">RNN</text>
<rect class="h" x="370" y="80" width="80" height="40" rx="8"/><text x="410" y="100">RNN</text>
<path class="a" d="M42,100 H68"/><path class="a" d="M150,100 H218"/><path class="a" d="M300,100 H368"/><path class="a" d="M450,100 H500"/>
<text x="185" y="92" class="sm">h₁</text><text x="335" y="92" class="sm">h₂</text><text x="520" y="100" class="sm">h₃</text>
<circle class="n" cx="110" cy="170" r="16"/><text x="110" y="170" class="sm">x₁</text>
<circle class="n" cx="260" cy="170" r="16"/><text x="260" y="170" class="sm">x₂</text>
<circle class="n" cx="410" cy="170" r="16"/><text x="410" y="170" class="sm">x₃</text>
<path class="a" d="M110,154 V122"/><path class="a" d="M260,154 V122"/><path class="a" d="M410,154 V122"/>
<circle class="n" cx="110" cy="30" r="16"/><text x="110" y="30" class="sm">y₁</text>
<circle class="n" cx="260" cy="30" r="16"/><text x="260" y="30" class="sm">y₂</text>
<circle class="n" cx="410" cy="30" r="16"/><text x="410" y="30" class="sm">y₃</text>
<path class="a" d="M110,80 V48"/><path class="a" d="M260,80 V48"/><path class="a" d="M410,80 V48"/>
<path class="a d" d="M410,128 Q335,150 262,128"/><path class="a d" d="M260,128 Q185,150 112,128"/>
<text x="260" y="203" class="sm">역전파: 시점마다 × Wₕᵀ · diag(tanh′) 반복 → 소실 또는 폭발</text>
<text x="485" y="40" class="sm">모든 칸이</text><text x="485" y="56" class="sm">같은 W 공유</text>
</svg>` },
    math: [
      { tex: R`\mathbf h_t = \tanh\!\left(W_h \mathbf h_{t-1} + W_x \mathbf x_t + \mathbf b\right), \qquad \hat{\mathbf y}_t = W_y \mathbf h_t`, explain: R`<ul class="defs"><li>$W_h$: 상태→상태</li><li>$W_x$: 입력→상태</li><li>$W_y$: 상태→출력 가중치</li></ul>모든 시점 $t$에서 같은 행렬을 쓴다.` },
      { tex: R`\frac{\partial \mathbf h_t}{\partial \mathbf h_k} = \prod_{j=k+1}^{t} \mathrm{diag}\!\left(1 - \mathbf h_j^2\right) W_h, \qquad \left\lVert \frac{\partial \mathbf h_t}{\partial \mathbf h_k} \right\rVert \le \left(\gamma\, \sigma_{\max}(W_h)\right)^{t-k}`, explain: R`<ul class="defs"><li>$\sigma_\text{max}$: $W_h$의 가장 큰 특이값</li><li>$\gamma \le 1$: tanh 도함수의 상한</li></ul>괄호 안이 1보다 작으면 거리 $t-k$에 대해 지수적으로 줄어든다(소실). 반대로 행렬 부분이 1보다 크면 폭발할 수 있다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

d_in, d_h = 4, 16
Wx, b = rng.normal(0, 0.5, (d_h, d_in)), np.zeros(d_h)

def rnn_forward(xs, Wh):
  h, hs = np.zeros(d_h), []
  for x in xs:                                    # 같은 가중치를 매 시점 재사용
      h = np.tanh(Wx @ x + Wh @ h + b)
      hs.append(h)
  return hs

Q, _ = np.linalg.qr(rng.normal(size=(d_h, d_h)))    # 직교 행렬: 모든 특이값이 1
n_params = Wx.size + Q.size + b.size
print(f"파라미터 수 {n_params}개 — 길이 10이든 10,000이든 같다")

print("\n행렬 부분만 본 그래디언트 크기 ‖(Wₕᵀ)ᵏ g‖ (활성화 도함수 ≤ 1은 이를 더 줄일 뿐):")
for radius in [0.9, 1.0, 1.1]:
  Wh, g = radius * Q, np.ones(d_h) / np.sqrt(d_h)
  sizes = {}
  for k in range(1, 51):
      g = Wh.T @ g
      if k in (10, 50):
          sizes[k] = np.linalg.norm(g)
  print(f"  특이값 {radius}: 10스텝 {sizes[10]:.3g}, 50스텝 {sizes[50]:.3g}")

hs = rnn_forward(rng.normal(size=(50, d_in)), 0.9 * Q)   # 실제 BPTT: tanh 도함수까지 포함
g, norms = np.ones(d_h) / np.sqrt(d_h), []
for h in reversed(hs):
  g = (0.9 * Q).T @ (g * (1 - h ** 2))
  norms.append(np.linalg.norm(g))
print(f"\ntanh 포함 실제 BPTT (특이값 0.9): 10스텝 전 {norms[9]:.2e}, 50스텝 전 {norms[49]:.2e}")

def clip_by_norm(grad, max_norm=1.0):               # 폭발 대책: 방향은 유지하고 크기만 제한
  n = np.linalg.norm(grad)
  return grad * (max_norm / n) if n > max_norm else grad
exploded = np.full(d_h, 30.0)
print(f"클리핑: 노름 {np.linalg.norm(exploded):.0f} → {np.linalg.norm(clip_by_norm(exploded)):.1f}")
`,
    links: [
      { to: 'dl-lstm', why: '기울기 소실을 구조로 해결한 게이트 RNN' },
      { to: 'dl-backprop', why: '시간축으로 펼친 그래프 위의 역전파(BPTT)' },
      { to: 'math-eigen', why: '행렬을 거듭 곱하면 고윳값·특이값의 거듭제곱이 지배한다' },
      { to: 'dl-init', why: '같은 행렬이 반복 곱해지는 RNN에서의 직교 초기화' },
      { to: 'dl-attention', why: '고정 크기 상태의 병목과 순차성을 넘는 방법' },
      { to: 'dl-cnn', why: '공간축의 가중치 공유(CNN) vs 시간축의 가중치 공유(RNN)' },
    ],
    quiz: [
      { q: 'RNN의 파라미터 수가 입력 시퀀스 길이와 무관한 이유는?',
        options: ['입력 시퀀스를 고정 길이로 잘라서 넣기 때문', '모든 시점에서 같은 가중치를 반복해 쓰기 때문', '은닉 상태를 시점마다 버리고 새로 만들기 때문', '긴 시퀀스는 여러 개의 짧은 RNN으로 나누기 때문'], answer: 1,
        explain: '시간축의 가중치 공유. 덕분에 길이가 다른 시퀀스를 같은 모델로 처리하고, 어느 위치에서 배운 패턴이든 다른 위치에 적용된다.' },
      { q: 'RNN이 긴 문장에서 앞부분 정보를 활용하도록 학습되기 어려운 이유는?',
        options: ['문장이 길면 은닉 상태 벡터에 저장할 공간이 부족해 앞부분이 잘리기 때문', 'BPTT에서 같은 행렬과 tanh 도함수가 반복해 곱해져 그래디언트가 작아지기 때문', 'RNN은 입력을 뒤에서부터 읽어 앞부분이 마지막에 처리되기 때문', '앞부분 토큰은 위치 인코딩이 없어 순서 정보가 사라지기 때문'], answer: 1,
        explain: '기울기 소실. 먼 과거가 현재 손실에 기여하는지 학습 신호가 도달하지 않는다. LSTM은 덧셈으로 갱신되는 셀 상태로 이를 완화한다.' },
      { q: 'RNN 학습 중 손실이 갑자기 NaN이 되는 그래디언트 폭발을 막는 가장 일반적인 방법은?',
        options: ['학습률을 키워 손실이 튀는 구간을 빨리 지나가게 한다', '그래디언트 노름이 기준을 넘으면 같은 비율로 줄이는 클리핑', '은닉 크기를 늘려 그래디언트를 여러 차원에 분산시킨다', '시퀀스를 뒤집어 넣어 그래디언트 경로를 짧게 만든다'], answer: 1,
        explain: '방향은 유지하고 크기만 제한한다. 소실은 클리핑으로 해결되지 않아 구조 변경(LSTM·GRU, 잔차 연결)이 필요하다.' },
    ],
    resources: ['Andrej Karpathy, "The Unreasonable Effectiveness of Recurrent Neural Networks" (2015 블로그)', 'Pascanu, Mikolov, Bengio, "On the difficulty of training recurrent neural networks" (2013)', 'Goodfellow, Bengio, Courville, 『Deep Learning』 10장 — Sequence Modeling', 'Sutskever, Vinyals, Le, "Sequence to Sequence Learning with Neural Networks" (2014)'],
  },
  {
    id: 'dl-lstm', title: 'LSTM과 GRU',
    summary: R`곱셈이 아닌 <strong>덧셈</strong>으로 갱신되는 셀 상태 + 지우기·쓰기·내보내기 게이트
→ 그래디언트가 오래 흐르는 길
GRU: 같은 아이디어를 더 단순하게`,
    body: R`
<h3>핵심 아이디어: 덧셈 경로</h3>
<p>단순 RNN은 매 시점 상태 전체를 행렬 곱과 tanh로 <strong>새로 만든다</strong>. 그래서 역전파 때 같은 행렬이 거듭 곱해진다. LSTM(Hochreiter & Schmidhuber, 1997)은 별도의 <strong>셀 상태</strong> $\mathbf c_t$를 두고, 기존 내용을 일부 지우고 새 내용을 <strong>더하는</strong> 방식으로 갱신한다.</p>
<p>$\mathbf c_t = \mathbf f_t \odot \mathbf c_{t-1} + \mathbf i_t \odot \tilde{\mathbf c}_t$</p>
<p>셀 경로만 보면 $\partial \mathbf c_t/\partial \mathbf c_{t-1} = \mathbf f_t$(원소별)다. 망각 게이트가 1에 가까우면 그래디언트가 거의 줄지 않고 수백 스텝을 거슬러 흐를 수 있다. 정보도 마찬가지로, 지우라는 신호가 없는 한 셀에 그대로 남는다. ResNet의 잔차 연결, Transformer의 잔차 스트림과 같은 원리 — <strong>덧셈은 그래디언트를 그대로 통과시킨다</strong>.</p>
<h3>세 개의 게이트</h3>
<p>게이트는 시그모이드(0~1)로 계산한 "통과 비율"이고, 모두 현재 입력 $\mathbf x_t$와 이전 출력 $\mathbf h_{t-1}$을 보고 정해진다.</p>
<ul>
<li><strong>망각 게이트</strong> $\mathbf f_t$: 셀의 기존 내용을 얼마나 남길지. 문장에서 새 주어가 나오면 이전 주어 정보를 지우는 식이다.</li>
<li><strong>입력 게이트</strong> $\mathbf i_t$: 새 후보 내용 $\tilde{\mathbf c}_t$(tanh)를 얼마나 쓸지.</li>
<li><strong>출력 게이트</strong> $\mathbf o_t$: 셀 내용 중 무엇을 이번 시점 출력 $\mathbf h_t = \mathbf o_t \odot \tanh(\mathbf c_t)$로 내보낼지.</li>
</ul>
<p>실무 요령으로 망각 게이트의 편향을 1 정도로 초기화해, 학습 초기에 "기본적으로 기억한다"에서 출발하게 하면 긴 의존 관계 학습에 도움이 된다고 알려져 있다.</p>
<h3>GRU</h3>
<p>GRU(Cho et al., 2014)는 셀 상태와 은닉 상태를 합치고 게이트를 두 개로 줄였다. <strong>업데이트 게이트</strong> $\mathbf z_t$가 "이전 상태를 유지할지, 새 후보로 바꿀지"를 한 번에 정하고($\mathbf h_t = (1-\mathbf z_t)\odot\mathbf h_{t-1} + \mathbf z_t \odot \tilde{\mathbf h}_t$), <strong>리셋 게이트</strong>가 후보를 만들 때 과거를 얼마나 참고할지 정한다. 파라미터가 LSTM의 약 3/4이고, 많은 과제에서 성능이 비슷해 어느 쪽이 항상 낫다고 하기 어렵다.</p>
<h3>여전히 남은 한계</h3>
<ul>
<li>여전히 <strong>순차 계산</strong>이라 긴 시퀀스 학습이 느리다.</li>
<li>시퀀스-투-시퀀스에서 인코더가 입력 전체를 <strong>고정 크기 벡터 하나</strong>에 압축해야 해, 문장이 길수록 번역 품질이 떨어졌다. 이 병목을 풀기 위해 디코더가 인코더의 모든 시점 상태를 직접 참조하게 한 것이 어텐션이다.</li>
</ul>
<p>LSTM은 Transformer 이전 음성 인식·번역·언어 모델의 주력이었고, 지금도 작은 모델과 실시간 스트리밍 처리에 쓰인다. 순환 구조를 병렬 학습이 가능하게 다시 설계한 상태 공간 모델(SSM) 계열도 활발히 연구되고 있다.</p>`,
    analogy: R`<p>LSTM의 셀 상태는 <strong>컨베이어 벨트</strong>다. 물건(정보)은 벨트를 타고 그대로 흘러가고, 작업자들(게이트)은 옆에서 "이건 내려라"(망각), "이걸 올려라"(입력), "이 중 이걸 지금 보여 줘라"(출력)만 결정한다. 단순 RNN은 매 단계 물건을 전부 분해해 다시 조립하는 공장이라, 몇 단계만 지나도 처음 물건의 흔적이 사라진다.</p>`,
    diagram: { caption: 'LSTM 셀. 위쪽 셀 상태 경로는 원소별 곱(망각)과 덧셈(새 내용)만 거치므로 그래디언트가 오래 유지된다. 게이트는 [hₜ₋₁, xₜ]를 보고 0~1의 통과 비율을 정한다.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<text x="25" y="40" class="sm">cₜ₋₁</text><text x="535" y="40" class="sm">cₜ</text>
<path class="ha" d="M45,40 H156"/><path class="ha" d="M184,40 H286"/><path class="ha" d="M314,40 H520"/>
<circle class="h" cx="170" cy="40" r="14"/><text x="170" y="40">×</text>
<circle class="h" cx="300" cy="40" r="14"/><text x="300" y="40">+</text>
<text x="240" y="11" class="sm" style="fill:var(--sc)">셀 상태: 곱(지우기)·덧셈(쓰기)만</text>
<rect class="n" x="140" y="120" width="60" height="34" rx="5"/><text x="170" y="131" class="sm">f (σ)</text><text x="170" y="145" class="sm">망각</text>
<rect class="n" x="230" y="120" width="60" height="34" rx="5"/><text x="260" y="131" class="sm">i (σ)</text><text x="260" y="145" class="sm">입력</text>
<rect class="n" x="300" y="120" width="60" height="34" rx="5"/><text x="330" y="131" class="sm">c̃ (tanh)</text><text x="330" y="145" class="sm">후보</text>
<rect class="n" x="400" y="120" width="60" height="34" rx="5"/><text x="430" y="131" class="sm">o (σ)</text><text x="430" y="145" class="sm">출력</text>
<circle class="n" cx="300" cy="88" r="12"/><text x="300" y="88">×</text>
<path class="a" d="M170,118 V56"/><path class="a" d="M260,118 L292,96"/><path class="a" d="M330,118 L308,96"/><path class="a" d="M300,76 V56"/>
<rect class="n" x="400" y="62" width="60" height="26" rx="5"/><text x="430" y="75" class="sm">tanh</text>
<path class="a" d="M430,40 V60"/><circle class="n" cx="490" cy="105" r="12"/><text x="490" y="105">×</text>
<path class="a" d="M460,75 L482,97"/><path class="a" d="M460,137 L482,113"/><path class="a" d="M502,105 H540"/><text x="530" y="125" class="sm">hₜ</text>
<rect class="g" x="20" y="180" width="440" height="26" rx="5"/><text x="240" y="193" class="sm">[hₜ₋₁, xₜ] → 네 게이트에 공통 입력</text>
<path class="a" d="M170,180 V156"/><path class="a" d="M260,180 V156"/><path class="a" d="M330,180 V156"/><path class="a" d="M430,180 V156"/>
</svg>` },
    math: [
      { tex: R`\begin{aligned} \mathbf f_t &= \sigma(W_f[\mathbf h_{t-1}, \mathbf x_t] + \mathbf b_f), & \mathbf i_t &= \sigma(W_i[\mathbf h_{t-1}, \mathbf x_t] + \mathbf b_i) \\ \tilde{\mathbf c}_t &= \tanh(W_c[\mathbf h_{t-1}, \mathbf x_t] + \mathbf b_c), & \mathbf o_t &= \sigma(W_o[\mathbf h_{t-1}, \mathbf x_t] + \mathbf b_o) \\ \mathbf c_t &= \mathbf f_t \odot \mathbf c_{t-1} + \mathbf i_t \odot \tilde{\mathbf c}_t, & \mathbf h_t &= \mathbf o_t \odot \tanh(\mathbf c_t) \end{aligned}`, explain: R`<ul class="defs"><li>$[\cdot,\cdot]$: 벡터 이어 붙이기</li><li>$\odot$: 원소별 곱</li><li>$\sigma$: 시그모이드</li></ul>셀 경로만 보면 $\partial \mathbf c_t/\partial \mathbf c_{t-1} = \mathbf f_t$라서, 망각 게이트가 1에 가까우면 그래디언트가 거의 그대로 전달된다.` },
      { tex: R`\#\text{params}_{\text{LSTM}} = 4\,\bigl(h(h + x) + h\bigr), \qquad \#\text{params}_{\text{GRU}} = 3\,\bigl(h(h + x) + h\bigr)`, explain: R`<ul class="defs"><li>$h$: 은닉 크기</li><li>$x$: 입력 크기</li></ul>LSTM은 게이트·후보가 4개, GRU는 3개라 GRU가 약 3/4이다(구현에 따라 편향 개수가 조금 다르다).` },
    ],
    code: R`
import numpy as np
sigmoid = lambda z: 1 / (1 + np.exp(-z))
rng = np.random.default_rng(0)

d_in, d_h, T = 4, 8, 100

def lstm_step(x, h, c, W, b):
  z = W @ np.concatenate([h, x]) + b              # 네 게이트를 한 번의 행렬 곱으로
  f, i, o, g = np.split(z, 4)
  f, i, o, g = sigmoid(f), sigmoid(i), sigmoid(o), np.tanh(g)
  c = f * c + i * g                               # 셀 상태: '덧셈'으로 갱신
  h = o * np.tanh(c)
  return h, c, f

W = rng.normal(0, 0.1, (4 * d_h, d_h + d_in))
xs = rng.normal(size=(T, d_in))
print("셀 경로의 그래디언트 ∂c_T/∂c_0 = 망각 게이트의 곱 (100스텝):")
for forget_bias in [0.0, 1.0, 3.0, 5.0]:
  b = np.zeros(4 * d_h)
  b[:d_h] = forget_bias                           # 망각 게이트 편향
  h, c, path = np.zeros(d_h), np.zeros(d_h), np.ones(d_h)
  for x in xs:
      h, c, f = lstm_step(x, h, c, W, b)
      path *= f
  print(f"  망각 게이트 편향 {forget_bias}: 평균 f ≈ {sigmoid(forget_bias):.3f} → {path.mean():.2e}")
print(f"비교: 특이값 0.9인 단순 RNN의 행렬 부분만 해도 0.9^100 = {0.9 ** 100:.1e}")

write, keep = np.zeros(4 * d_h), np.zeros(4 * d_h)   # 기억 유지: 첫 시점에 쓴 내용이 셀에 남는가
write[:d_h], write[d_h:2 * d_h] = 5.0, 5.0           # 첫 시점: 망각 거의 없음, 입력 게이트 열림
keep[:d_h], keep[d_h:2 * d_h] = 5.0, -5.0            # 이후: 망각 거의 없음, 입력 게이트 닫힘
h, c, _ = lstm_step(rng.normal(size=d_in) * 3, np.zeros(d_h), np.zeros(d_h), W, write)
c0 = c.copy()
for x in rng.normal(size=(T - 1, d_in)):             # 이후 99스텝 동안 다른 입력이 들어와도
  h, c, _ = lstm_step(x, h, c, W, keep)
print(f"\n첫 시점에 쓴 셀 내용과 100스텝 뒤 셀의 상관: {np.corrcoef(c0, c)[0, 1]:.3f}, 크기 비율 {np.linalg.norm(c) / np.linalg.norm(c0):.2f}")

def params(kind, x, hdim):
  gates = {"LSTM": 4, "GRU": 3}[kind]
  return gates * (hdim * (hdim + x) + hdim)
print({k: f"{params(k, 128, 256):,}" for k in ("LSTM", "GRU")}, "(입력 128, 은닉 256)")
`,
    links: [
      { to: 'dl-rnn', why: '단순 RNN의 기울기 소실 문제' },
      { to: 'dl-attention', why: '고정 크기 상태 병목을 푸는 다음 단계' },
      { to: 'dl-cnn', why: 'ResNet의 잔차 연결도 덧셈으로 그래디언트 경로를 만든다' },
      { to: 'dl-activation', why: '게이트에 쓰이는 시그모이드(0~1 통과 비율)와 tanh' },
      { to: 'dl-init', why: '망각 게이트 편향 초기화의 효과' },
    ],
    quiz: [
      { q: 'LSTM이 단순 RNN보다 긴 의존 관계를 잘 학습하는 핵심 이유는?',
        options: ['은닉 상태 차원이 단순 RNN보다 4배 커서 더 많이 기억할 수 있기 때문', '셀 상태가 원소별 곱과 덧셈으로만 갱신되어 그래디언트가 거의 줄지 않고 흘러서', '게이트가 과거 입력을 모두 저장해 두었다가 필요할 때 다시 읽기 때문', 'LSTM은 BPTT 대신 시점마다 따로 학습해 긴 경로가 생기지 않기 때문'], answer: 1,
        explain: '단순 RNN은 매 스텝 같은 행렬 곱과 tanh를 거친다. 셀 상태의 덧셈 경로는 잔차 연결과 같은 효과를 낸다.' },
      { q: 'LSTM의 출력 게이트가 하는 일은?',
        options: ['셀 상태의 기존 내용 중 무엇을 지울지 정한다', '셀 상태 중 무엇을 출력 hₜ로 내보낼지 정한다', '새 입력 중 무엇을 셀 상태에 쓸지 정한다', '이전 은닉 상태를 얼마나 섞을지 정한다'], answer: 1,
        explain: '셀에는 계속 들고 있어야 할 정보와 지금 필요한 정보가 섞여 있다. 출력 게이트가 그중 현재 출력할 부분을 고른다.' },
      { q: 'GRU와 LSTM의 관계로 옳은 것은?',
        options: ['GRU는 게이트가 더 많아 LSTM보다 항상 더 정확하다', 'GRU는 셀·은닉 상태를 합치고 게이트를 둘로 줄였다', 'GRU는 순환 없이 어텐션으로 과거 정보를 참조한다', 'GRU는 LSTM에 출력 게이트를 하나 더 추가한 구조다'], answer: 1,
        explain: '둘 다 게이트로 정보 흐름을 조절해 기울기 소실을 완화한다. 어느 쪽이 나은지는 실험으로 정한다.' },
    ],
    resources: ['Christopher Olah, "Understanding LSTM Networks" (2015 블로그 — 그림 설명으로 유명)', 'Hochreiter & Schmidhuber, "Long Short-Term Memory" (1997)', 'Cho et al., "Learning Phrase Representations using RNN Encoder–Decoder" (GRU, 2014)', 'Jozefowicz, Zaremba, Sutskever, "An Empirical Exploration of Recurrent Network Architectures" (2015)'],
  },
  {
    id: 'dl-attention', title: '어텐션',
    summary: R`각 출력 위치가 입력 전체에서 <strong>관련 있는 곳</strong>을 가중합
가중치 = 질의(Q)·키(K) 유사도의 소프트맥스, 섞는 대상 = 값(V)
거리와 무관하게 한 번에 연결`,
    body: R`
<h3>출발점: 번역의 병목</h3>
<p>RNN 기반 번역에서는 인코더가 원문 전체를 마지막 은닉 상태 하나에 압축하고 디코더는 그것만 보고 번역문을 만들었다. 문장이 길어질수록 정보가 빠져 품질이 떨어졌다. Bahdanau 등(2014)은 디코더가 단어를 하나 만들 때마다 <strong>인코더의 모든 시점 상태</strong>를 보고, 지금 번역할 단어와 관련 있는 원문 위치에 높은 가중치를 주어 섞어 쓰게 했다. 고정 크기 요약이라는 병목이 사라졌다.</p>
<h3>Query · Key · Value</h3>
<p>이 아이디어는 "부드러운 검색"으로 일반화된다.</p>
<ul>
<li><strong>Query(질의)</strong>: 지금 위치가 찾고 싶은 것.</li>
<li><strong>Key(키)</strong>: 각 위치가 "나는 이런 정보를 갖고 있다"고 내건 꼬리표.</li>
<li><strong>Value(값)</strong>: 실제로 가져갈 내용.</li>
</ul>
<p>질의와 모든 키의 내적으로 유사도를 구하고, 소프트맥스로 합이 1인 가중치로 바꾼 뒤, 그 가중치로 값들을 가중합한다. 해시 테이블은 키가 정확히 일치하는 항목 하나를 돌려주지만, 어텐션은 <strong>모든 항목을 유사도에 비례해 섞어</strong> 돌려준다. 이 연산 전체가 미분 가능하므로 "무엇을 볼지"도 학습된다.</p>
<h3>왜 √d로 나누는가</h3>
<p>$\mathbf q, \mathbf k$의 각 성분이 평균 0, 분산 1이고 독립이면 내적 $\mathbf q^\top\mathbf k$의 분산은 차원 $d_k$다. $d_k = 512$면 내적 값이 수십 단위로 커져 소프트맥스가 거의 원-핫이 되고(포화), 그래디언트가 매우 작아진다. $\sqrt{d_k}$로 나누면 분산이 1로 돌아와 소프트맥스가 적당히 부드럽게 유지된다.</p>
<h3>셀프 어텐션</h3>
<p>Q, K, V를 <strong>같은 시퀀스</strong>에서 서로 다른 학습 행렬로 만들면($Q = XW_Q$, $K = XW_K$, $V = XW_V$), 각 토큰이 같은 문장의 다른 모든 토큰을 참조해 자기 표현을 갱신한다. "그것이 맛있었다"에서 "그것"은 앞의 "사과"에 높은 가중치를 주어 그 정보를 가져온다.</p>
<ul>
<li><strong>거리와 무관한 연결</strong>: RNN에서는 100단어 떨어진 정보가 100단계를 거쳐야 했지만, 셀프 어텐션은 한 단계다.</li>
<li><strong>병렬성</strong>: 모든 위치의 계산이 행렬 곱 몇 번이라 GPU에서 한꺼번에 처리된다.</li>
<li><strong>멀티헤드</strong>: Q·K·V를 여러 개의 작은 부분 공간(헤드)으로 나눠 각각 어텐션한 뒤 이어 붙인다. 헤드마다 다른 종류의 관계(문법적 의존, 지시 대상, 가까운 위치)를 볼 수 있다.</li>
<li><strong>마스킹</strong>: 패딩 위치를 무시하는 마스크, 그리고 언어 모델이 다음 단어를 예측할 때 미래 단어를 보지 못하게 하는 <strong>인과(causal) 마스크</strong>(가중치 계산 전에 해당 위치 점수를 −∞로).</li>
</ul>
<h3>대가와 성질</h3>
<ul>
<li><strong>제곱 비용</strong>: 길이 $n$이면 $n \times n$ 점수 행렬을 만든다. 계산과 메모리가 $O(n^2)$라 긴 문맥이 비싸다. FlashAttention은 결과를 바꾸지 않고 GPU 메모리 계층을 활용해 이 행렬을 통째로 저장하지 않게 하며, 근사적인 희소·선형 어텐션 연구도 있다.</li>
<li><strong>순서를 모른다</strong>: 셀프 어텐션은 입력 순서를 섞으면 출력도 똑같이 섞일 뿐이다(순열 등변). 그래서 위치 정보를 따로 넣어야 한다 → Transformer의 위치 인코딩.</li>
<li><strong>해석 주의</strong>: 어텐션 가중치 지도는 "모델이 어디를 봤는지" 힌트를 주지만, 그것이 곧 예측의 이유라고 보기는 어렵다는 연구가 있다.</li>
</ul>`,
    analogy: R`<p>도서관에서 자료 찾기. 내 궁금증(Query)을 들고 가서 책마다 붙은 색인 카드(Key)와 얼마나 맞는지 본 다음, 잘 맞는 책일수록 많이, 덜 맞는 책은 조금씩 내용을 발췌(Value)해 한 장의 노트로 합친다. 한 권만 고르는 검색(해시)과 달리 모든 책을 관련도만큼 섞는다. 셀프 어텐션은 회의 참석자 모두가 동시에 이렇게 서로의 발언을 참고해 자기 생각을 고치는 것이다.</p>`,
    diagram: { caption: '질의("앉았다")와 각 키의 유사도로 가중치(합 1)를 구하고, 그 가중치로 값들을 섞어 새 표현을 만든다. 선의 굵기가 가중치를 나타낸다(예시 값).', svg: R`
<svg viewBox="0 0 560 220" width="560">
<rect class="h" x="225" y="15" width="110" height="34" rx="6"/><text x="280" y="32" class="sm">Query: "앉았다"</text>
<rect class="n" x="20" y="130" width="110" height="34" rx="6"/><text x="75" y="147" class="sm">고양이가</text>
<rect class="n" x="155" y="130" width="110" height="34" rx="6"/><text x="210" y="147" class="sm">매트</text>
<rect class="n" x="290" y="130" width="110" height="34" rx="6"/><text x="345" y="147" class="sm">위에</text>
<rect class="n" x="425" y="130" width="110" height="34" rx="6"/><text x="480" y="147" class="sm">앉았다</text>
<path class="he" d="M260,49 L90,128" style="stroke-width:7"/><path class="he" d="M270,49 L215,128" style="stroke-width:3.5"/>
<path class="he" d="M290,49 L340,128" style="stroke-width:2"/><path class="he" d="M305,49 L465,128" style="stroke-width:1"/>
<text x="150" y="82" class="sm">0.55</text><text x="226" y="98" class="en sm">0.25</text><text x="332" y="98" class="st sm">0.15</text><text x="410" y="82" class="sm">0.05</text>
<text x="280" y="185" class="sm">가중치 = softmax(q·kᵢ / √d) · 합 = 1</text>
<text x="280" y="205" class="sm">출력 = 0.55·v₁ + 0.25·v₂ + 0.15·v₃ + 0.05·v₄</text>
<text x="440" y="32" class="sm">"누가 앉았나?" →</text><text x="440" y="48" class="sm">주어에 집중</text>
</svg>` },
    math: [
      { tex: R`\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V`, explain: R`<ul class="defs"><li>$Q$: $n \times d_k$ 질의</li><li>$K$: $m \times d_k$ 키</li><li>$V$: $m \times d_v$ 값</li></ul>$QK^\top$의 $(i, j)$ 원소는 $i$번째 질의와 $j$번째 키의 유사도. 소프트맥스는 행마다(질의마다) 적용되어 가중치의 합이 1이 된다.` },
      { tex: R`\mathrm{Var}(\mathbf q^\top \mathbf k) = \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) = d_k \quad (\text{각 성분 평균 0, 분산 1, 독립})`, explain: R`스케일링의 근거. $\sqrt{d_k}$로 나누면 분산이 1이 되어 소프트맥스가 포화되지 않는다.` },
      { tex: R`\mathrm{MultiHead}(X) = [\mathrm{head}_1; \ldots; \mathrm{head}_h]\, W_O, \quad \mathrm{head}_i = \mathrm{Attention}(XW_Q^{(i)}, XW_K^{(i)}, XW_V^{(i)})`, explain: R`$h$개 헤드는 각각 $d/h$ 차원에서 어텐션하고, 결과를 이어 붙여 $W_O$로 섞는다. 전체 계산량은 헤드 하나로 $d$ 차원 어텐션을 하는 것과 비슷하다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

def softmax(z, axis=-1):
  z = z - z.max(axis=axis, keepdims=True)
  e = np.exp(z)
  return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V, mask=None):
  scores = Q @ K.T / np.sqrt(K.shape[-1])          # 질의와 각 키의 유사도
  if mask is not None:
      scores = np.where(mask, scores, -np.inf)     # 볼 수 없는 위치 → 가중치 0
  w = softmax(scores)
  return w @ V, w

tokens = ["고양이가", "매트", "위에", "앉았다"]
d = 8
X = rng.normal(size=(len(tokens), d))                # 토큰 임베딩(예시)
Wq, Wk, Wv = (rng.normal(0, d ** -0.5, (d, d)) for _ in range(3))
out, w = attention(X @ Wq, X @ Wk, X @ Wv)           # 셀프 어텐션: Q·K·V 모두 같은 시퀀스에서
print("셀프 어텐션 가중치 (행 = 질의 토큰, 합 1):\n", w.round(2))

causal = np.tril(np.ones((4, 4), bool))              # 인과 마스크: 자신과 이전 위치만
_, wc = attention(X @ Wq, X @ Wk, X @ Wv, causal)
print("인과 마스크 적용:\n", wc.round(2))

print("\n√d 스케일링이 없으면 차원이 클 때 소프트맥스가 포화된다 (최대 가중치):")
for d_k in [8, 512]:
  q, k = rng.normal(size=d_k), rng.normal(size=(10, d_k))
  print(f"  d_k = {d_k:3d}: 스케일 없음 {softmax(k @ q).max():.3f} / √d로 나눔 {softmax(k @ q / np.sqrt(d_k)).max():.3f}")

perm = [2, 0, 3, 1]                                  # 순서를 섞으면 출력도 똑같이 섞일 뿐
out_p, _ = attention((X @ Wq)[perm], (X @ Wk)[perm], (X @ Wv)[perm])
print("\n순열 등변성 (순서 정보 없음):", np.allclose(out_p, out[perm]))

for n in [1_024, 32_768, 131_072]:                   # 점수 행렬 메모리 (헤드 하나, fp16 = 2바이트)
  print(f"길이 {n:>7,}: 점수 행렬 {n * n * 2 / 2**30:8.2f} GiB")
`,
    links: [
      { to: 'dl-transformer', why: '셀프 어텐션을 쌓아 만든 구조' },
      { to: 'dl-lstm', why: 'RNN 인코더-디코더의 고정 크기 병목에서 출발' },
      { to: 'math-vector', why: '내적 = 유사도, 코사인 유사도와의 관계' },
      { to: 'ds-hash', why: '정확히 일치하는 하나(해시) vs 유사도로 모두 섞기(어텐션)' },
      { to: 'ca-hierarchy', why: 'n² 점수 행렬과 GPU 메모리 계층 — FlashAttention' },
      { to: 'ai-llm', why: 'LLM의 핵심 연산과 긴 문맥의 비용' },
    ],
    quiz: [
      { q: '스케일드 닷-프로덕트 어텐션에서 QKᵀ를 √d_k로 나누는 이유는?',
        options: ['내적 값이 작아져 행렬 곱 계산이 빨라지기 때문', '차원이 크면 내적 분산이 커져 소프트맥스가 포화되므로', '어텐션 가중치의 합을 정확히 1로 맞추기 위해서', '키 벡터의 길이를 1로 정규화해 코사인 유사도로 만들려고'], answer: 1,
        explain: '합을 1로 만드는 것은 소프트맥스가 한다. 스케일링은 소프트맥스 입력의 크기를 적절히 유지하는 역할이다.' },
      { q: 'GPT 같은 언어 모델의 셀프 어텐션에 인과 마스크를 쓰는 이유는?',
        options: ['패딩 토큰이 어텐션 점수에 끼어들지 않게 하려고', '미래 토큰을 보면 정답을 엿보는 셈이라 이전 위치만 보게 하려고', '어텐션 행렬의 절반을 버려 계산량을 정확히 절반으로 줄이려고', '먼 토큰보다 가까운 토큰에 더 큰 가중치를 주려고'], answer: 1,
        explain: '마스크 덕분에 학습 때 모든 위치의 다음 토큰 예측을 한 번에 병렬로 계산하면서도 정보 누출이 없다.' },
      { q: '셀프 어텐션만으로는 단어 순서를 구분하지 못하는 이유는?',
        options: ['어텐션은 토큰을 하나씩 순서대로 읽어 앞의 순서 정보를 덮어쓰기 때문', '모든 위치를 같은 방식으로 비교해, 순서를 바꾸면 출력도 같이 바뀔 뿐이라서', '소프트맥스가 점수를 정규화하면서 위치별 차이가 사라지기 때문', '임베딩이 단어마다 고정되어 있어 같은 단어는 항상 같은 벡터라서'], answer: 1,
        explain: '그래서 Transformer는 임베딩에 위치 정보(위치 인코딩, RoPE 등)를 더해 준다.' },
    ],
    resources: ['Bahdanau, Cho, Bengio, "Neural Machine Translation by Jointly Learning to Align and Translate" (2014)', 'Vaswani et al., "Attention Is All You Need" (2017)', 'Jay Alammar, "The Illustrated Transformer" (블로그)', 'Dao et al., "FlashAttention" (2022)'],
  },
  {
    id: 'dl-transformer', title: 'Transformer',
    summary: R`셀프 어텐션(토큰 간 정보 교환) + 피드포워드(토큰별 변환)를 잔차·정규화와 반복
순환 없음 → <strong>병렬 학습</strong>
대가: 길이의 제곱에 비례하는 어텐션 비용`,
    body: R`
<h3>블록 구조</h3>
<p>"Attention Is All You Need"(2017)의 Transformer 블록은 두 개의 하위 층으로 되어 있다(현재 많이 쓰는 Pre-LN 배치).</p>
<ol>
<li>$\mathbf x \leftarrow \mathbf x + \mathrm{MultiHeadAttention}(\mathrm{LN}(\mathbf x))$ — 각 토큰이 다른 토큰들의 정보를 모은다.</li>
<li>$\mathbf x \leftarrow \mathbf x + \mathrm{FFN}(\mathrm{LN}(\mathbf x))$ — 각 토큰을 <strong>독립적으로</strong> 같은 2층 MLP($d \to 4d \to d$, GELU 등)로 변환한다.</li>
</ol>
<p>이 블록을 수십 층 쌓는다. 토큰마다 흐르는 벡터를 "잔차 스트림"으로 보면, 각 층은 스트림을 덮어쓰지 않고 <strong>더하기만</strong> 한다. 이 덧셈 경로 덕분에 그래디언트가 깊은 층을 곧장 통과하고(ResNet과 같은 원리), 정규화가 각 하위 층 입력의 크기를 안정시킨다. 원래 논문은 정규화를 덧셈 뒤에 둔 Post-LN이었지만, 깊은 모델에서는 Pre-LN이 학습이 더 안정적이라 많이 쓰인다.</p>
<h3>위치 정보</h3>
<p>셀프 어텐션은 순서를 모르므로 토큰 임베딩에 위치 정보를 더한다. 원래 논문은 주파수가 다른 사인·코사인 값을 더했고(학습 없이 임의 위치에 대해 계산 가능), BERT·GPT-2는 위치마다 학습된 벡터를 썼다. 최근 LLM은 질의·키 벡터를 위치에 비례하는 각도로 회전시켜 내적이 <strong>상대 위치</strong>에 의존하게 만드는 RoPE를 많이 쓴다.</p>
<h3>세 가지 형태</h3>
<table><tr><th>형태</th><th>어텐션</th><th>대표</th><th>잘하는 일</th></tr>
<tr><td>인코더-디코더</td><td>인코더는 양방향, 디코더는 인과 + 인코더 참조(크로스 어텐션)</td><td>원본 Transformer, T5</td><td>번역, 요약 같은 입력 → 출력 변환</td></tr>
<tr><td>인코더 전용</td><td>양방향</td><td>BERT</td><td>분류, 개체명 인식, 문장 임베딩</td></tr>
<tr><td>디코더 전용</td><td>인과 마스크</td><td>GPT 계열, 대부분의 LLM</td><td>다음 토큰 예측 → 생성</td></tr></table>
<p>BERT는 문장 중간 단어를 가리고 맞히는 방식(마스크 언어 모델)으로, GPT는 다음 토큰을 맞히는 방식으로 사전 학습한다.</p>
<h3>왜 이렇게 성공했나: 병렬성과 규모</h3>
<p>RNN은 시점마다 차례로 계산해야 했지만, Transformer는 학습 시 인과 마스크와 함께 <strong>모든 위치의 다음 토큰 예측을 한 번에</strong> 계산한다. 연산의 대부분은 Q·K·V 투영, 어텐션, FFN의 큰 행렬 곱이라 GPU의 처리량을 거의 다 쓸 수 있다. 덕분에 데이터와 파라미터를 키울수록 성능이 예측 가능하게 좋아지는 규모의 법칙이 관찰되었고, 이것이 LLM으로 이어졌다.</p>
<ul>
<li><strong>파라미터</strong>: 블록 하나에 어텐션 투영 4개($4d^2$)와 FFN($2 \cdot d \cdot 4d = 8d^2$)으로 약 $12d^2$. $L$층이면 약 $12Ld^2$에 임베딩이 더해진다. $L = 12, d = 768$이면 블록 약 8,500만 + 임베딩 약 3,900만 ≈ GPT-2 small의 1.24억 개.</li>
<li><strong>학습 계산량</strong>: 흔히 쓰는 근사로, 파라미터 $N$개 모델을 토큰 $D$개로 학습하는 데 약 $6ND$ FLOP가 든다(순전파 $2N$, 역전파 $4N$ / 토큰).</li>
</ul>
<h3>추론은 여전히 순차적이다</h3>
<p>생성할 때는 토큰을 하나 만들고 그것을 다시 입력에 붙여 다음 토큰을 만든다. 이전 토큰들의 키·값은 바뀌지 않으므로 저장해 두고 재사용한다(<strong>KV 캐시</strong>). 그래서 생성 단계는 매 토큰마다 큰 가중치와 KV 캐시를 메모리에서 읽어야 해 연산보다 <strong>메모리 대역폭</strong>이 속도를 제한하는 경우가 많다.</p>
<h3>언어를 넘어</h3>
<p>이미지를 16×16 패치로 잘라 각 패치를 토큰처럼 넣은 ViT, 음성·단백질·코드, 그리고 여러 모달리티를 한 시퀀스로 다루는 모델까지, "입력을 토큰 시퀀스로 바꾸고 Transformer로 처리"하는 방식이 범용 구조가 되었다.</p>`,
    analogy: R`<p>잘 운영되는 회의. 매 라운드마다 먼저 모두가 서로의 발언을 듣고 관련 있는 말을 골라 메모에 반영하고(셀프 어텐션), 그다음 각자 자기 자리에서 메모를 정리한다(피드포워드). 메모는 지우고 새로 쓰는 게 아니라 <strong>덧붙이기만</strong> 해서(잔차 연결) 초기 발언도 사라지지 않는다. 이런 라운드를 수십 번 반복하면 각자의 메모가 회의 전체 맥락을 담게 된다. 모든 사람이 동시에 듣고 정리하므로, 한 명씩 차례로 말을 전하는 방식(RNN)보다 훨씬 빠르다.</p>`,
    diagram: { caption: '디코더 전용 Transformer(Pre-LN). 블록마다 셀프 어텐션과 피드포워드가 잔차 스트림에 결과를 더한다(위쪽 곡선). 이 블록을 N번 쌓은 뒤 다음 토큰 확률을 출력한다.', svg: R`
<svg viewBox="0 0 560 240" width="560">
<rect class="n" x="10" y="20" width="110" height="40" rx="6"/><text x="65" y="34" class="sm">토큰 ID</text><text x="65" y="50" class="sm">"나는 학생"</text>
<rect class="n" x="150" y="20" width="150" height="40" rx="6"/><text x="225" y="34" class="sm">토큰 임베딩</text><text x="225" y="50" class="sm">+ 위치 정보</text>
<path class="a" d="M120,40 H148"/><path class="a" d="M300,40 H330 V95 H20 V128"/>
<rect class="g" x="10" y="80" width="540" height="100" rx="10" style="fill-opacity:.4"/><text x="470" y="96" class="sm">× N 블록</text>
<rect class="n" x="20" y="130" width="50" height="34" rx="5"/><text x="45" y="147" class="sm">LN</text>
<rect class="h" x="90" y="125" width="130" height="44" rx="6"/><text x="155" y="141" class="sm">멀티헤드</text><text x="155" y="156" class="sm">셀프 어텐션 (인과)</text>
<circle class="h" cx="250" cy="147" r="13"/><text x="250" y="147">+</text>
<rect class="n" x="285" y="130" width="50" height="34" rx="5"/><text x="310" y="147" class="sm">LN</text>
<rect class="h" x="355" y="125" width="110" height="44" rx="6"/><text x="410" y="141" class="sm">피드포워드</text><text x="410" y="156" class="sm">d → 4d → d</text>
<circle class="h" cx="495" cy="147" r="13"/><text x="495" y="147">+</text>
<path class="a" d="M70,147 H88"/><path class="a" d="M220,147 H235"/><path class="a" d="M263,147 H283"/><path class="a" d="M335,147 H353"/><path class="a" d="M465,147 H480"/>
<path class="ha" d="M15,130 Q130,100 250,133"/><path class="ha" d="M265,135 Q380,100 495,133"/>
<text x="130" y="112" class="sm" style="fill:var(--sc)">잔차</text><text x="380" y="112" class="sm" style="fill:var(--sc)">잔차</text>
<path class="a" d="M508,147 H540 V200 H430 V203"/>
<rect class="n" x="250" y="203" width="180" height="32" rx="6"/><text x="340" y="219" class="sm">LN → 선형 → 소프트맥스</text>
<path class="a" d="M250,219 H175"/><text x="95" y="219" class="sm">다음 토큰 확률</text>
<text x="155" y="190" class="sm">토큰 사이 정보 교환</text><text x="410" y="190" class="sm">토큰별 변환</text>
</svg>` },
    math: [
      { tex: R`\mathbf x \leftarrow \mathbf x + \mathrm{MHA}\bigl(\mathrm{LN}(\mathbf x)\bigr), \qquad \mathbf x \leftarrow \mathbf x + W_2\, \phi\bigl(W_1\, \mathrm{LN}(\mathbf x)\bigr)`, explain: R`Pre-LN 블록.<ul class="defs"><li>MHA: 멀티헤드 셀프 어텐션</li><li>LN: 레이어 정규화</li><li>$\phi$: GELU 등 활성화 함수</li><li>$W_1 \in \mathbb R^{d \times 4d}$, $W_2 \in \mathbb R^{4d \times d}$: FFN 가중치(편향 생략)</li></ul>두 하위 층 모두 결과를 잔차 스트림에 더한다.` },
      { tex: R`PE_{(p, 2i)} = \sin\!\left(\frac{p}{10000^{2i/d}}\right), \qquad PE_{(p, 2i+1)} = \cos\!\left(\frac{p}{10000^{2i/d}}\right)`, explain: R`원래 논문의 사인 위치 인코딩.<ul class="defs"><li>$p$: 위치</li><li>$i$: 차원 쌍의 번호</li></ul>차원마다 주파수가 달라, 각 위치가 고유한 무늬를 갖고 고정된 거리만큼 떨어진 위치끼리의 관계를 선형 변환으로 표현할 수 있다.` },
      { tex: R`N_{\text{block}} \approx \underbrace{4d^2}_{Q,K,V,O} + \underbrace{8d^2}_{\text{FFN}} = 12d^2, \qquad C_{\text{train}} \approx 6\,N D`, explain: R`<ul class="defs"><li>$d$: 모델 차원 (FFN 은닉 크기 $4d$ 가정, 편향·정규화 파라미터 생략)</li><li>$C$: 학습 FLOP</li><li>$N$: 파라미터 수</li><li>$D$: 학습 토큰 수</li></ul>$C \approx 6ND$는 널리 쓰이는 근사다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)
d, heads, vocab = 32, 4, 50

def layer_norm(x, eps=1e-5):
  return (x - x.mean(-1, keepdims=True)) / np.sqrt(x.var(-1, keepdims=True) + eps)
def softmax(z):
  z = z - z.max(-1, keepdims=True)
  e = np.exp(z)
  return e / e.sum(-1, keepdims=True)
def gelu(x):                                         # tanh 근사식
  return 0.5 * x * (1 + np.tanh(np.sqrt(2 / np.pi) * (x + 0.044715 * x ** 3)))

P = {name: rng.normal(0, 0.02, shape) for name, shape in {
  "Wq": (d, d), "Wk": (d, d), "Wv": (d, d), "Wo": (d, d), "W1": (d, 4 * d), "W2": (4 * d, d)}.items()}

def multi_head_attention(x, mask):
  T, dh = len(x), d // heads
  q, k, v = [(x @ P[w]).reshape(T, heads, dh).transpose(1, 0, 2) for w in ("Wq", "Wk", "Wv")]
  scores = np.where(mask, q @ k.transpose(0, 2, 1) / np.sqrt(dh), -np.inf)   # (heads, T, T)
  out = softmax(scores) @ v                                                 # 헤드마다 어텐션
  return out.transpose(1, 0, 2).reshape(T, d) @ P["Wo"]                     # 이어 붙이고 섞기

def block(x):                                        # Pre-LN 디코더 블록 (편향 생략)
  mask = np.tril(np.ones((len(x), len(x)), bool))  # 인과 마스크
  x = x + multi_head_attention(layer_norm(x), mask)          # ① 토큰 사이 정보 교환 + 잔차
  x = x + gelu(layer_norm(x) @ P["W1"]) @ P["W2"]            # ② 토큰별 피드포워드 + 잔차
  return x

def positional_encoding(T, d):
  pos, i = np.arange(T)[:, None], np.arange(d // 2)[None, :]
  angle = pos / 10000 ** (2 * i / d)
  pe = np.zeros((T, d))
  pe[:, 0::2], pe[:, 1::2] = np.sin(angle), np.cos(angle)
  return pe

E = rng.normal(0, 0.02, (vocab, d))                 # 토큰 임베딩 (출력층과 공유: weight tying)
def model(token_ids):
  x = E[token_ids] + positional_encoding(len(token_ids), d)
  return layer_norm(block(x)) @ E.T               # 위치마다 다음 토큰 로짓

ids = np.array([3, 14, 15, 9, 26, 5])
logits = model(ids)
changed = ids.copy(); changed[5] = 42               # 마지막(미래) 토큰만 바꾼다
logits2 = model(changed)
print("출력 형태:", logits.shape, "(위치 × 어휘)")
print("미래 토큰을 바꿔도 앞 위치들의 출력은 그대로:", np.allclose(logits[:5], logits2[:5]),
    "| 바뀐 위치의 출력은 달라짐:", not np.allclose(logits[5], logits2[5]))

block_params = sum(w.size for w in P.values())
print(f"\n블록 파라미터 {block_params:,}개 = 12·d² = {12 * d * d:,}")
L, D, V = 12, 768, 50257                             # GPT-2 small 크기로 추정
print(f"GPT-2 small 추정: 블록 {12 * L * D * D / 1e6:.1f}M + 임베딩 {V * D / 1e6:.1f}M ≈ {(12 * L * D * D + V * D) / 1e6:.0f}M")
print(f"학습 계산량 근사 6ND: 70억 파라미터 × 2조 토큰 ≈ {6 * 7e9 * 2e12:.1e} FLOP")
`,
    links: [
      { to: 'dl-attention', why: '블록의 핵심 연산인 멀티헤드 셀프 어텐션' },
      { to: 'dl-norm', why: 'LayerNorm·RMSNorm과 Pre-LN 배치' },
      { to: 'dl-cnn', why: 'ResNet에서 온 잔차 연결, 이미지를 패치 토큰으로 다루는 ViT' },
      { to: 'ca-gpu', why: '연산 대부분이 행렬 곱이라 GPU 병렬화에 유리하다' },
      { to: 'ai-llm', why: '디코더 전용 Transformer를 거대하게 키운 것이 LLM' },
      { to: 'ai-tokenizer', why: '텍스트를 토큰 시퀀스로 바꾸는 입력 단계' },
      { to: 'ai-pretrain', why: '다음 토큰 예측으로 하는 사전 학습' },
    ],
    quiz: [
      { q: 'Transformer가 RNN보다 대규모 학습에 유리했던 가장 큰 이유는?',
        options: ['같은 성능에 필요한 파라미터 수가 RNN보다 훨씬 적어서', '순환이 없어 모든 위치를 한 번에 계산해 GPU를 잘 써서', '어텐션 비용이 문맥 길이에 선형이라 긴 문서도 싸게 처리해서', '사전 학습 없이도 적은 데이터로 바로 높은 성능을 내서'], answer: 1,
        explain: '어텐션 비용은 오히려 길이의 제곱이다. 핵심은 시간 방향의 병렬성과 하드웨어 친화성이다.' },
      { q: 'Transformer 블록에서 셀프 어텐션과 피드포워드 층의 역할 구분으로 가장 적절한 것은?',
        options: ['어텐션은 토큰별 변환, 피드포워드는 토큰 사이 정보 교환을 맡는다', '어텐션은 토큰 사이 정보를 모으고, 피드포워드는 위치마다 같은 MLP로 변환한다', '둘 다 토큰 사이 정보를 교환하며, 피드포워드는 더 먼 토큰을 담당한다', '피드포워드가 위치 정보를 만들고, 어텐션이 그 정보를 각 토큰에 더한다'], answer: 1,
        explain: '어텐션이 "섞기", FFN이 "토큰별 가공"을 맡는다. 두 결과 모두 잔차 스트림에 더해진다.' },
      { q: '디코더 전용 Transformer로 글을 생성할 때 KV 캐시를 쓰는 이유는?',
        options: ['학습 데이터의 자주 나오는 문장을 저장해 그대로 출력하려고', '이전 토큰의 키·값은 바뀌지 않으므로 재사용해 다시 계산하지 않으려고', '어텐션 가중치를 저장해 두고 다음 토큰에서 같은 가중치를 쓰려고', '모델 파라미터 일부를 캐시에 올려 GPU 메모리 사용량을 줄이려고'], answer: 1,
        explain: '인과 마스크 덕분에 과거 위치의 계산은 미래 토큰의 영향을 받지 않는다. 대신 캐시 메모리가 문맥 길이에 비례해 커진다.' },
    ],
    resources: ['Vaswani et al., "Attention Is All You Need" (2017)', 'Jay Alammar, "The Illustrated Transformer", "The Illustrated GPT-2" (블로그)', 'Andrej Karpathy, "Let\'s build GPT: from scratch, in code, spelled out" (영상)', 'Kaplan et al., "Scaling Laws for Neural Language Models" (2020)'],
  },
];
