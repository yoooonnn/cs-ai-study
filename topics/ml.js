TOPICS.ml = [
  {
    id:'ml-learning', title: '학습이란 무엇인가',
    summary: R`규칙 직접 코딩 대신 데이터에서 함수 $f$ 탐색
목표: <strong>보지 못한 데이터에서의 성능(일반화)</strong>`,
    body: R`
<p>머신러닝 모델은 세 가지로 구성된다.</p>
<ul>
<li><strong>가설 공간(모델)</strong>: 후보 함수의 집합. 예: 모든 직선 $f(x) = wx + b$. 파라미터 $w, b$를 정하면 함수 하나가 정해진다.</li>
<li><strong>손실 함수</strong>: 예측이 얼마나 틀렸는지 수치로 측정한다. 회귀는 제곱 오차, 분류는 교차 엔트로피가 대표적이다.</li>
<li><strong>최적화</strong>: 손실을 줄이는 파라미터를 찾는 방법. 경사하강법이 대표적이다.</li>
</ul>
<h3>진짜 목표는 계산할 수 없다</h3>
<p>우리가 원하는 것은 앞으로 들어올 데이터 전체에서의 평균 손실, 즉 <strong>기대 위험</strong>이다. 하지만 데이터가 생성되는 분포를 모르므로 계산할 수 없다. 그래서 대신 가진 데이터의 평균 손실인 <strong>경험적 위험</strong>을 최소화한다(경험적 위험 최소화, ERM). 훈련 데이터가 미래 데이터와 같은 분포에서 왔다고 가정하는 것이다.</p>
<p>둘의 차이를 <strong>일반화 격차</strong>라고 한다. 가설 공간이 너무 크면(복잡한 모델) 훈련 데이터의 잡음까지 외워서 경험적 위험은 0에 가까운데 기대 위험은 크다. 이것이 과적합이다. 그래서 성능은 반드시 <strong>학습에 쓰지 않은 데이터</strong>로 측정해야 한다.</p>
<h3>가정 없이는 일반화도 없다: 귀납 편향</h3>
<p>유한한 데이터로 무한한 입력에 대해 예측하려면 "보지 못한 곳은 이럴 것"이라는 가정이 반드시 필요하다. 선형 모델은 "관계가 선형이다", KNN은 "가까운 입력은 출력도 비슷하다", CNN은 "국소 패턴은 위치와 무관하게 의미가 같다"고 가정한다. 이를 <strong>귀납 편향</strong>이라 한다. 모든 문제에서 다른 알고리즘보다 우월한 알고리즘은 없다는 <strong>No Free Lunch 정리</strong>는, 결국 모델의 가정이 데이터의 실제 구조와 맞을 때만 잘 동작한다는 뜻이다.</p>
<h3>학습의 종류</h3>
<ul>
<li><strong>지도 학습</strong>: 정답 $y$가 있다. 연속값이면 회귀, 범주면 분류.</li>
<li><strong>비지도 학습</strong>: $y$ 없이 데이터의 구조(군집, 저차원 구조)를 찾는다.</li>
<li><strong>강화 학습</strong>: 행동에 대한 보상 신호로 학습한다.</li>
<li><strong>자기지도 학습</strong>: 데이터 자체에서 정답을 만든다. "다음 토큰 맞히기"로 학습하는 LLM 사전학습이 대표적이다.</li>
</ul>
<h3>파라메트릭 vs 비파라메트릭</h3>
<p>선형 회귀는 데이터를 고정된 개수의 파라미터로 요약하고 학습이 끝나면 데이터를 버려도 된다. KNN은 데이터 자체를 저장해 두고 예측 때 사용하므로, 데이터가 늘수록 모델도 커진다.</p>
<h3>손실 함수에는 확률적 가정이 숨어 있다</h3>
<p>제곱 오차를 최소화하는 것은 "잡음이 정규분포를 따른다"는 가정에서 최대우도추정(MLE)을 하는 것과 같고, 교차 엔트로피를 최소화하는 것은 베르누이/카테고리 분포의 MLE와 같다. 손실 함수 선택은 데이터에 대한 가정의 선택이다.</p>`,
    analogy: R`<p>상대 투수 공략. <strong>지난 경기 영상(훈련 데이터)</strong>의 투구 순서만 통째로 외운 타자는 그 경기를 재연하면 다 치지만, 처음 보는 경기(테스트 데이터)에서는 못 친다. 구종 배합과 투구 습관의 원리를 익힌 타자는 영상 복습 점수가 조금 낮더라도 새 경기에서 친다. 연습 배팅이 아니라 처음 만나는 상대와의 실전 성적으로 타자를 평가하는 이유가 일반화를 측정하기 위해서다.</p>`,
    diagram: { caption: '학습 루프: 예측 → 손실 계산 → 손실이 줄어드는 방향으로 파라미터 θ 갱신을 반복한다.', svg: R`
<svg viewBox="0 0 540 170" width="540">
<rect class="n" x="10" y="50" width="100" height="44" rx="8"/><text x="60" y="66">데이터</text><text x="60" y="82" class="sm">(x, y)</text>
<rect class="h" x="150" y="50" width="100" height="44" rx="8"/><text x="200" y="66">모델 f_θ</text><text x="200" y="82" class="sm">가설 공간</text>
<rect class="n" x="290" y="50" width="100" height="44" rx="8"/><text x="340" y="66">예측 ŷ</text><text x="340" y="82" class="sm">f_θ(x)</text>
<rect class="n" x="430" y="50" width="100" height="44" rx="8"/><text x="480" y="66">손실</text><text x="480" y="82" class="sm">L(ŷ, y)</text>
<path class="a" d="M110,72 H148"/><path class="a" d="M250,72 H288"/><path class="a" d="M390,72 H428"/>
<path class="a" d="M60,94 V100"/>
<path class="ha" d="M480,94 V135 H200 V96"/><text x="340" y="150">θ ← θ − η ∇L (최적화)</text>
<path class="e d" d="M60,50 V30 H480 V50"/><text x="270" y="22" class="sm">정답 y는 손실 계산에 쓰인다</text>
</svg>` },
    math: [
      { tex: R`R(f) = \mathbb{E}_{(x,y)\sim P}\big[L(f(x), y)\big], \qquad \hat{R}(f) = \frac{1}{n}\sum_{i=1}^{n} L(f(x_i), y_i)`, explain: R`<ul class="defs"><li>$R$: 기대 위험(진짜 목표, $P$를 몰라 계산 불가)</li><li>$\hat R$: 경험적 위험(훈련 데이터 $n$개의 평균 손실)</li><li>$L$: 손실 함수</li></ul>` },
      { tex: R`\hat{f} = \arg\min_{f \in \mathcal{H}} \hat{R}(f)`, explain: R`경험적 위험 최소화. $\mathcal{H}$: 가설 공간. $\mathcal{H}$가 클수록 $\hat R(\hat f)$는 작아지지만 $R(\hat f)$와의 격차가 커질 수 있다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

def sample(n):                      # 진짜 규칙(학습자는 모름): y = 2x + 1 + 잡음
  x = rng.uniform(-3, 3, n)
  return x, 2 * x + 1 + rng.normal(0, 1, n)

x_tr, y_tr = sample(20)             # 가진 데이터
x_te, y_te = sample(10_000)         # '보지 못한 데이터' → 기대 위험의 근사

# 경험적 위험 최소화: 가설 공간(직선) 격자에서 훈련 MSE가 최소인 (w, b) 찾기
ws, bs = np.linspace(-1, 5, 301), np.linspace(-2, 4, 301)
loss = ((ws[:, None, None] * x_tr + bs[None, :, None] - y_tr) ** 2).mean(-1)   # (301, 301)
i, j = np.unravel_index(loss.argmin(), loss.shape)
w, b = ws[i], bs[j]
mse = lambda pred, y: np.mean((pred - y) ** 2)
print(f"찾은 직선 y = {w:.2f}x + {b:.2f}")
print(f"  훈련 MSE {mse(w * x_tr + b, y_tr):.3f} | 테스트 MSE {mse(w * x_te + b, y_te):.3f}")

# 가설 공간을 키우면(12차 다항식) 훈련 손실은 줄지만 일반화 격차가 커진다
coef = np.polyfit(x_tr, y_tr, 12)
print(f"12차 다항식")
print(f"  훈련 MSE {mse(np.polyval(coef, x_tr), y_tr):.3f} | 테스트 MSE {mse(np.polyval(coef, x_te), y_te):.3f}")
`,
    links: [
      { to: 'math-mle', why: 'MSE·교차 엔트로피 최소화 = 특정 분포 가정에서의 최대우도추정' },
      { to: 'ml-biasvar', why: '일반화 오차를 편향과 분산으로 분해' },
      { to: 'math-gradient', why: '손실을 줄이는 방향 = 음의 그래디언트' },
      { to: 'ai-pretrain', why: 'LLM 사전학습 = 다음 토큰 예측이라는 자기지도 학습' },
    ],
    quiz: [
      { q: '훈련 데이터 정확도가 100%인 모델을 곧바로 좋은 모델이라고 할 수 없는 이유는?',
        options: ['훈련 정확도는 클래스 불균형을 반영하지 못해 실제보다 높게 나오기 때문', '경험적 위험만 낮다는 뜻이고, 보지 못한 데이터의 성능은 따로 재야 하기 때문', '정확도는 확률 출력을 보지 않아 모델의 확신 정도를 알 수 없기 때문', '100%가 나오면 학습률이 너무 커서 최솟값을 지나쳤다는 신호이기 때문'], answer: 1,
        explain: '모델이 잡음까지 외웠을 수 있다. 학습에 쓰지 않은 데이터로 평가해야 일반화 성능을 알 수 있다.' },
      { q: 'KNN은 "학습" 단계에서 데이터를 저장만 한다. 그런데도 새 입력을 예측할 수 있는 근거는?',
        options: ['저장한 데이터로 예측 시점에 선형 회귀를 다시 학습하기 때문', '"가까운 입력은 출력도 비슷하다"는 귀납 편향 아래 데이터 자체를 모델로 쓰기 때문', '저장할 때 각 클래스의 평균점을 계산해 두고 가장 가까운 평균으로 분류하기 때문', '모든 특성이 서로 독립이라고 가정하고 특성별 빈도를 곱해 예측하기 때문'], answer: 1,
        explain: '모든 모델은 어떤 가정 위에서 일반화한다. KNN의 가정이 틀린 데이터(예: 고차원, 스케일이 엉망인 특성)에서는 성능이 나빠진다.' },
      { q: 'No Free Lunch 정리가 실무에 주는 교훈으로 가장 적절한 것은?',
        options: ['데이터가 충분히 많으면 어떤 알고리즘이든 결국 같은 성능에 도달한다', '모든 문제에 우월한 알고리즘은 없으니 데이터에 맞는 가정의 모델을 골라 검증한다', '가장 복잡한 모델을 쓰고 정규화로 줄이는 것이 언제나 안전한 선택이다', '알고리즘보다 하이퍼파라미터 탐색이 중요하므로 모델은 아무거나 써도 된다'], answer: 1,
        explain: '모든 가능한 문제에 대해 평균을 내면 알고리즘 간 차이가 없다. 실제 문제에서의 차이는 모델 가정과 데이터 구조가 얼마나 맞는지에서 나온다.' },
    ],
    resources: ['Andrew Ng, Machine Learning Specialization (Coursera)', '『핸즈온 머신러닝』(Aurélien Géron) 1~2장', 'Shalev-Shwartz & Ben-David, 『Understanding Machine Learning』 2장 (ERM, 무료 PDF 공개)'],
  },
  {
    id:'ml-linear', title: '선형 회귀와 경사하강법', advanced: true,
    summary: R`가장 단순한 모델 = ML 핵심 개념의 집합(손실·최적화·스케일링·정규화)
해법: <strong>정사영</strong> 또는 <strong>경사하강</strong>`,
    body: R`
<p>모델은 $\hat{y} = w_1x_1 + \cdots + w_dx_d + b$. 절편을 위해 모든 샘플에 상수 1인 특성을 붙이면 행렬로 $\hat{\mathbf y} = X\mathbf w$로 쓸 수 있다. 손실은 평균 제곱 오차(MSE)다.</p>
<h3>방법 1: 닫힌 형태의 해 (정규방정식)</h3>
<p>MSE를 $\mathbf w$로 미분해 0으로 두면 $X^\top X \mathbf w = X^\top \mathbf y$를 얻는다. 기하적으로 보면 더 명확하다. $X\mathbf w$는 $X$의 열벡터들이 만드는 공간(열공간) 위의 한 점이고, $\mathbf y$와의 거리를 최소로 하려면 잔차 $\mathbf y - X\mathbf w$가 그 공간에 <strong>수직</strong>이어야 한다. 즉 $X^\top(\mathbf y - X\mathbf w) = 0$ — 선형 회귀의 예측은 $\mathbf y$를 열공간에 <strong>정사영</strong>한 것이다.</p>
<p>실제 계산에서는 $(X^\top X)^{-1}$를 직접 구하지 않는다. 수치적으로 불안정하기 때문이다. <code>np.linalg.lstsq</code>는 SVD 기반으로 푼다. 특성끼리 거의 선형 종속(다중공선성)이거나 특성 수가 샘플 수보다 많으면 $X^\top X$가 특이 행렬에 가까워 해가 불안정해지거나 유일하지 않다 → 정규화가 필요하다.</p>
<h3>방법 2: 경사하강법</h3>
<p>손실이 줄어드는 방향(음의 그래디언트)으로 조금씩 이동한다: $\mathbf w \leftarrow \mathbf w - \eta \nabla L$. MSE는 <strong>볼록 함수</strong>라 지역 최솟값이 곧 전역 최솟값이므로, 학습률만 적절하면 수렴이 보장된다.</p>
<ul>
<li><strong>학습률 $\eta$</strong>: 너무 작으면 느리고, 너무 크면 골짜기를 넘나들며 <strong>발산</strong>한다. 수렴하려면 손실 곡면이 가장 가파르게 휘는 방향의 곡률보다 충분히 작아야 한다.</li>
<li><strong>특성 스케일</strong>: 한 특성의 값이 0~1이고 다른 특성이 0~10,000이면 손실 곡면이 한 방향으로만 매우 길쭉한 골짜기가 된다. 가파른 방향에 맞춰 학습률을 작게 잡아야 하므로 완만한 방향으로는 거의 움직이지 못하고 지그재그한다. <strong>표준화</strong>(평균 0, 표준편차 1)로 등고선을 원에 가깝게 만들면 해결된다.</li>
</ul>
<h3>닫힌 해가 있는데 왜 경사하강을 쓰는가</h3>
<p>(1) 특성 수 $d$가 크면 $X^\top X$를 다루는 비용($d \times d$ 행렬, 대략 $O(nd^2 + d^3)$)이 크다. (2) 데이터가 메모리에 다 안 들어가면 일부(미니배치)씩 보며 갱신하는 SGD가 필요하다. (3) 신경망처럼 닫힌 해가 없는 모델에도 <strong>그대로 확장</strong>된다. 선형 회귀의 경사하강은 딥러닝 학습의 축소판이다.</p>
<h3>계수 해석의 주의점</h3>
<p>$w_j$는 "다른 특성을 고정했을 때 $x_j$가 1 증가하면 $\hat y$가 $w_j$만큼 변한다"는 뜻이다. 특성 간 상관이 크면 이 "고정"이 현실적이지 않고 계수가 불안정해지므로 인과적으로 해석하면 안 된다.</p>`,
    analogy: R`<p>안개 낀 산에서 가장 낮은 골짜기 찾기. 발밑의 경사만 느낄 수 있으니 <strong>내리막 방향으로 한 걸음씩</strong> 걷는다(경사하강). 보폭이 너무 크면 골짜기를 건너뛰어 반대편 비탈로 올라가 버린다(발산). 골짜기가 좁고 길쭉하면 양쪽 벽 사이를 지그재그로 오가느라 바닥 쪽으로는 잘 나아가지 못한다(스케일 문제).</p>`,
    diagram: { caption: '특성 스케일이 크게 다르면 손실 등고선이 길쭉해져 경사하강이 지그재그로 느리게 수렴한다.', svg: R`
<svg viewBox="0 0 520 220" width="520">
<ellipse class="e" cx="260" cy="110" rx="230" ry="80"/>
<ellipse class="e" cx="260" cy="110" rx="160" ry="55"/>
<ellipse class="e" cx="260" cy="110" rx="95" ry="32"/>
<ellipse class="e" cx="260" cy="110" rx="35" ry="12"/>
<circle class="fill" cx="260" cy="110" r="4"/>
<path class="ha" d="M60,70 L95,160 L125,66 L155,150 L180,78 L203,138 L222,90 L238,126 L250,104"/>
<text x="60" y="56" class="sm">시작</text><text x="270" y="124" class="sm">최솟값</text>
<text x="260" y="208" class="sm">w₁ (큰 스케일 특성의 가중치 방향: 가파름)  ·  가로축(작은 스케일 방향: 완만함)</text>
</svg>` },
    math: [
      { tex: R`L(\mathbf w) = \frac{1}{n}\lVert \mathbf y - X\mathbf w \rVert^2, \qquad \nabla L = \frac{2}{n} X^\top (X\mathbf w - \mathbf y)`, explain: R`<ul class="defs"><li>$X$: $n \times d$ 특성 행렬(절편용 1 열 포함)</li><li>$\mathbf y$: 정답 벡터</li></ul>그래디언트는 "잔차 $(X\mathbf w - \mathbf y)$를 각 특성과 내적한 것" — 잔차와 상관이 큰 특성의 가중치가 크게 수정된다.` },
      { tex: R`X^\top X\,\mathbf w^* = X^\top \mathbf y \;\Rightarrow\; \mathbf w^* = (X^\top X)^{-1} X^\top \mathbf y`, explain: R`정규방정식. 잔차가 열공간과 수직이라는 조건. $X^\top X$가 가역일 때만 두 번째 식이 성립한다.` },
      { tex: R`\mathbf w_{t+1} = \mathbf w_t - \eta\, \nabla L(\mathbf w_t)`, explain: R`경사하강 갱신. $\eta$: 학습률. 신경망 학습도 같은 식이며, 그래디언트를 역전파로 계산한다는 점만 다르다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(42)

n = 200
X = np.column_stack([rng.normal(0, 1, n), rng.normal(0, 100, n)])   # 스케일이 100배 다른 두 특성
y = X @ np.array([3.0, 0.05]) + 2.0 + rng.normal(0, 0.5, n)          # 진짜: b=2, w=(3, 0.05)

def gd(X, y, lr, steps=500):
  Xb = np.column_stack([np.ones(len(X)), X])        # 절편용 1 열
  w = np.zeros(Xb.shape[1])
  for _ in range(steps):
      w -= lr * 2 / len(y) * Xb.T @ (Xb @ w - y)    # 경사하강 갱신
  return w, np.mean((Xb @ w - y) ** 2)

Xb = np.column_stack([np.ones(n), X])
print("lstsq(정답)  :", np.linalg.lstsq(Xb, y, rcond=None)[0].round(3))

# 원본 스케일: 큰 특성 때문에 lr을 아주 작게 해야 하고, 그러면 절편·작은 특성은 거의 못 배운다
print("원본 GD      :", gd(X, y, lr=1e-5)[0].round(3))
print("lr 너무 큼   : MSE =", f"{gd(X, y, lr=1e-3, steps=50)[1]:.2e}  (발산)")

# 표준화 후: 같은 반복 횟수로 수렴. 계수는 원래 단위로 되돌려 비교
mu, sd = X.mean(0), X.std(0)
w_s, mse = gd((X - mu) / sd, y, lr=0.1)
w = w_s[1:] / sd
b = w_s[0] - (mu / sd) @ w_s[1:]
print("표준화 GD    :", np.r_[b, w].round(3), " MSE", round(mse, 3))
`,
    links: [
      { to: 'math-gradient', why: '그래디언트와 경사하강의 수학' },
      { to: 'math-matrix', why: '열공간과 정사영 — 최소제곱의 기하학' },
      { to: 'math-mle', why: '가우시안 잡음 가정에서 MSE 최소화 = MLE' },
      { to: 'ml-regularization', why: 'XᵀX가 불안정할 때 λI를 더하는 릿지 회귀' },
      { to: 'dl-optim', why: 'SGD·모멘텀·Adam — 경사하강을 개선한 최적화 기법' },
      { to: 'ml-feature', why: '스케일링이 필요한 모델과 필요 없는 모델' },
    ],
    quiz: [
      { q: '두 특성의 스케일이 크게 다를 때 경사하강이 느려지는 이유는?',
        options: ['스케일이 큰 특성 때문에 데이터 개수가 사실상 늘어난 효과가 생겨서', '손실 곡면이 길쭉해져, 작은 학습률로는 완만한 방향으로 거의 나아가지 못해서', '스케일이 다르면 손실이 볼록하지 않게 되어 지역 최솟값이 여러 개 생겨서', '큰 특성의 계수는 0으로 수렴하고 작은 특성의 계수만 학습되기 때문'], answer: 1,
        explain: '하나의 학습률이 모든 방향에 적용된다. 가장 가파른 방향에서 발산하지 않도록 작게 잡으면 완만한 방향은 매우 느리다. 표준화로 곡률을 비슷하게 맞춘다.' },
      { q: '학습률이 너무 크면 손실이 오히려 커지며 발산할 수 있는 이유는?',
        options: ['학습률이 크면 그래디언트의 부호가 반대로 계산되기 때문', '한 걸음이 너무 커서 최솟값을 지나쳐 더 높은 지점에 가기 때문', '학습률이 크면 손실 함수가 볼록하지 않은 모양으로 바뀌기 때문', '큰 학습률은 매 단계 그래디언트를 더 작게 만들어 멈추기 때문'], answer: 1,
        explain: '그래디언트는 "지금 위치에서의" 기울기일 뿐이다. 멀리 이동하면 그 정보가 맞지 않는다.' },
      { q: '닫힌 형태의 해가 있는데도 대규모 문제에서 경사하강(SGD)을 쓰는 이유로 적절하지 않은 것은?',
        options: ['특성 수가 크면 XᵀX 계산과 역행렬 풀이 비용이 크다', '데이터를 미니배치로 나눠 메모리에 일부만 올려 처리할 수 있다', '닫힌 해가 없는 신경망에도 같은 방법을 쓸 수 있다', '경사하강은 반올림 오차가 없어 정규방정식보다 정확한 해를 준다'], answer: 3,
        explain: '볼록한 MSE에서 정규방정식(또는 lstsq)은 정확한 최적해를 준다. 경사하강은 근사적으로 그 해에 다가갈 뿐이다. 장점은 확장성과 일반성이다.' },
    ],
    resources: ['Andrew Ng, Machine Learning Specialization — Linear Regression, Gradient Descent', 'Gilbert Strang, MIT 18.06 Linear Algebra — Projections and Least Squares', '『An Introduction to Statistical Learning』(ISLR/ISLP) 3장 (무료 PDF 공개)'],
  },
  {
    id:'ml-logistic', title: '로지스틱 회귀',
    summary: R`선형 점수 → 시그모이드 → 0~1 확률
<strong>로그 오즈를 선형으로 모델링</strong>, 교차 엔트로피로 학습
신경망 출력층의 원형`,
    body: R`
<h3>왜 '회귀'인데 분류인가</h3>
<p>선형 회귀를 분류에 그대로 쓰면 출력이 0~1 범위를 벗어나고 확률로 해석할 수 없다. 로지스틱 회귀는 선형 점수 $z = \mathbf w^\top \mathbf x + b$를 시그모이드 $\sigma(z) = 1/(1+e^{-z})$에 통과시켜 $P(y=1 \mid \mathbf x)$로 해석한다. 식을 정리하면 $\log \frac{p}{1-p} = \mathbf w^\top \mathbf x + b$ — 즉 <strong>로그 오즈(log-odds)에 대한 선형 회귀</strong>다. $w_j$는 "$x_j$가 1 증가할 때 로그 오즈가 $w_j$만큼 증가(오즈가 $e^{w_j}$배)"로 해석된다. 분류는 확률에 임계값(기본 0.5)을 적용해 이뤄진다.</p>
<h3>결정 경계는 선형이다</h3>
<p>$p \ge 0.5 \iff z \ge 0$이므로 결정 경계는 초평면 $\mathbf w^\top \mathbf x + b = 0$이다. 원 모양 같은 비선형 경계가 필요하면 $x_1^2$, $x_1x_2$ 같은 특성을 직접 추가해야 한다. 신경망은 이 특성 변환을 은닉층이 학습하게 만든 것이라고 볼 수 있다.</p>
<h3>왜 MSE가 아니라 교차 엔트로피인가</h3>
<p>각 샘플을 확률 $p_i$의 베르누이 시행으로 보면, 데이터 전체의 우도를 최대화하는 것은 <strong>음의 로그 우도</strong> = 이진 교차 엔트로피(BCE)를 최소화하는 것과 같다. 이것이 통계적 근거다. 최적화 측면에서도 이유가 있다.</p>
<ul>
<li>시그모이드 + MSE는 파라미터에 대해 볼록하지 않아 지역 최솟값이 생길 수 있다. BCE는 볼록하다.</li>
<li>MSE의 그래디언트에는 $\sigma'(z) = p(1-p)$가 곱해진다. 모델이 <strong>확신을 가지고 틀리면</strong>($p \approx 0$인데 $y=1$) 이 값이 0에 가까워 학습이 거의 멈춘다. BCE의 그래디언트는 $p - y$로, 크게 틀릴수록 크게 수정한다.</li>
</ul>
<p>BCE의 그래디언트 $X^\top(\mathbf p - \mathbf y)/n$은 선형 회귀의 그래디언트와 같은 꼴("예측 − 정답"을 특성과 내적)이다. 이는 우연이 아니라 두 모델이 모두 일반화 선형 모델(GLM)에서 자연스러운 손실을 쓴 결과다.</p>
<h3>다중 분류: 소프트맥스</h3>
<p>클래스가 $K$개면 클래스마다 점수 $z_k$를 계산하고 소프트맥스 $p_k = e^{z_k}/\sum_j e^{z_j}$로 확률 분포를 만든다. 손실은 범주형 교차 엔트로피다. 신경망 분류기의 마지막 층과 LLM이 다음 토큰을 고르는 방식이 정확히 이것이다.</p>
<h3>완전 분리 문제</h3>
<p>두 클래스가 직선으로 완벽히 나뉘면, $\mathbf w$를 키울수록 모든 확률이 0 또는 1에 가까워져 손실이 계속 줄어든다. 최솟값이 존재하지 않아 가중치가 무한히 커진다. L2 정규화를 더하면 유한한 해가 생긴다. scikit-learn의 <code>LogisticRegression</code>이 기본으로 L2 정규화를 적용하는 이유 중 하나다.</p>`,
    analogy: R`<p>시그모이드는 <strong>"점수 → 확신도" 변환기</strong>다. 선형 점수는 "증거의 합"이다. 증거가 0이면 반반(0.5), 증거가 쌓일수록 확신이 커지지만 100%에는 점점 천천히 다가간다. 증거를 아무리 더 모아도 확률이 1을 넘지는 않는다.</p>`,
    diagram: { caption: '시그모이드: 선형 점수 z를 확률로 바꾼다. z = 0(결정 경계)에서 확률 0.5.', svg: R`
<svg viewBox="0 0 480 230" width="480">
<path class="a" d="M30,200 H460"/><path class="a" d="M240,215 V10"/>
<path class="e d" d="M30,32 H460"/><path class="e d" d="M30,116 H460"/>
<path class="he" d="M30,198 C150,197 190,192 240,116 S330,34 450,33"/>
<text x="446" y="214" class="sm">z = wᵀx + b</text>
<text x="262" y="20" class="sm">p</text>
<text x="20" y="32" class="sm">1</text><text x="16" y="116" class="sm">0.5</text><text x="20" y="200" class="sm">0</text>
<text x="120" y="96" class="sm">z &lt; 0 → 클래스 0으로 분류</text><text x="360" y="150" class="sm">z ≥ 0 → 클래스 1로 분류</text>
</svg>` },
    math: [
      { tex: R`p = \sigma(z) = \frac{1}{1 + e^{-z}}, \qquad \log\frac{p}{1-p} = z = \mathbf w^\top \mathbf x + b`, explain: R`$p$: $y=1$일 확률. 두 식은 같은 관계를 두 방향으로 쓴 것이다. 로그 오즈가 특성의 선형 결합이다.` },
      { tex: R`L = -\frac{1}{n}\sum_{i=1}^{n}\big[y_i \log p_i + (1-y_i)\log(1-p_i)\big]`, explain: R`이진 교차 엔트로피. $y_i=1$이면 $-\log p_i$만 남아 $p_i$가 1에서 멀수록 손실이 급격히 커진다($p_i \to 0$이면 $\infty$).` },
      { tex: R`\frac{\partial L}{\partial z_i} = \frac{1}{n}(p_i - y_i), \qquad \nabla_{\mathbf w} L = \frac{1}{n} X^\top(\mathbf p - \mathbf y)`, explain: R`시그모이드의 미분 $p(1-p)$가 BCE의 미분과 상쇄되어 깔끔한 "예측 − 정답" 꼴이 된다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

n = 400
X = np.vstack([rng.normal([-1, -1], 1, (n // 2, 2)), rng.normal([1.5, 1], 1, (n // 2, 2))])
y = np.r_[np.zeros(n // 2), np.ones(n // 2)]

sigmoid = lambda z: 1 / (1 + np.exp(-z))
Xb = np.column_stack([np.ones(n), X])
w = np.zeros(3)
for step in range(2001):
  p = sigmoid(Xb @ w)
  w -= 0.5 * Xb.T @ (p - y) / n            # BCE 그래디언트: (예측 - 정답)과 특성의 내적
  if step % 500 == 0:
      bce = -np.mean(y * np.log(p + 1e-12) + (1 - y) * np.log(1 - p + 1e-12))
      print(f"step {step:4d}  BCE {bce:.4f}")

p = sigmoid(Xb @ w)
print("가중치(b, w1, w2):", w.round(3), " 정확도:", np.mean((p >= 0.5) == y))

# 확신에 찬 오답(p=0.001인데 y=1)에서 z에 대한 기울기 비교
grad_mse = 2 * (0.001 - 1) * 0.001 * (1 - 0.001)   # MSE: σ'(z)=p(1-p)가 곱해져 거의 0
grad_bce = 0.001 - 1                               # BCE: p - y
print(f"dL/dz  MSE {grad_mse:.4f}  vs  BCE {grad_bce:.4f}")
`,
    links: [
      { to: 'math-info', why: '교차 엔트로피의 정보이론적 의미' },
      { to: 'math-mle', why: '베르누이 분포의 최대우도추정 = BCE 최소화' },
      { to: 'ml-metrics', why: '임계값 0.5는 선택일 뿐 — 정밀도·재현율 트레이드오프' },
      { to: 'dl-perceptron', why: '시그모이드 출력 뉴런 하나 = 로지스틱 회귀' },
      { to: 'dl-activation', why: '시그모이드의 포화와 기울기 소실 문제' },
      { to: 'ai-llm', why: 'LLM의 다음 토큰 예측 = 어휘 전체에 대한 소프트맥스 분류' },
    ],
    quiz: [
      { q: '로지스틱 "회귀"라는 이름이 붙은 이유로 가장 정확한 것은?',
        options: ['출력이 연속값이고 그 값을 그대로 예측값으로 쓰는 회귀 모델이라서', '로그 오즈를 특성의 선형 결합으로 회귀하고, 그 확률에 임계값을 적용해서', '손실 함수로 MSE를 쓰기 때문에 선형 회귀와 같은 계열로 분류되어서', '여러 개의 선형 회귀를 로지스틱 함수로 합쳐 하나로 만든 모델이라서'], answer: 1,
        explain: 'log(p/(1-p)) = wᵀx + b. 모델이 직접 출력하는 것은 연속적인 확률이고, 분류는 그 위에 결정 규칙을 얹은 것이다.' },
      { q: '시그모이드 출력에 MSE 대신 교차 엔트로피를 쓰는 이유가 <strong>아닌</strong> 것은?',
        options: ['베르누이 분포의 최대우도추정과 같아 통계적 근거가 있다', '확신에 찬 오답에서 MSE는 σ\'(z)가 곱해져 기울기가 거의 0이 된다', '파라미터에 대해 볼록하여 최적화가 안정적이다', '교차 엔트로피는 0과 1 사이 값만 가져 확률처럼 해석할 수 있다'], answer: 3,
        explain: 'BCE는 0 이상 무한대까지 값을 가진다(p→0인데 y=1이면 무한대). 나머지는 모두 BCE를 쓰는 실제 이유다.' },
      { q: '두 클래스가 직선으로 완벽히 분리되는 데이터에서 정규화 없이 로지스틱 회귀를 학습하면?',
        options: ['경계에서 가장 먼 점을 기준으로 정확히 하나의 해에 빠르게 수렴한다', '가중치를 키울수록 손실이 계속 줄어 최솟값이 없고, 가중치가 무한히 커진다', '모든 점의 확률이 0.5로 수렴해 경계를 정하지 못하고 정확도가 50%가 된다', '그래디언트가 처음부터 0이라 가중치가 초기값에서 전혀 움직이지 않는다'], answer: 1,
        explain: '모든 점을 맞히는 방향을 찾은 뒤에는 그 방향으로 w를 키울수록 확률이 0/1에 다가가 손실이 0에 접근한다. L2 정규화가 이를 막는다.' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 4장 — 분류', 'Andrew Ng, Machine Learning Specialization — Logistic Regression', 'Stanford CS229 강의 노트 — Generalized Linear Models'],
  },
  {
    id:'ml-biasvar', title: '편향-분산 트레이드오프', advanced: true,
    summary: R`테스트 오차 = <strong>편향² + 분산 + 줄일 수 없는 잡음</strong>
과소적합·과적합 진단의 기본 틀`,
    body: R`
<h3>"훈련 데이터가 바뀌었다면?"이라는 사고 실험</h3>
<p>같은 분포에서 뽑은 다른 훈련 세트로 모델을 다시 학습하면 다른 모델이 나온다. 이 사고 실험을 무한히 반복했을 때, 어떤 입력 $x$에서의 예측값 $\hat f(x)$는 하나의 확률변수다. 이 확률변수의</p>
<ul>
<li><strong>평균이 진짜 값에서 얼마나 떨어져 있는가</strong> → 편향(bias). 모델의 가정이 현실과 맞지 않아 생기는 체계적인 오차. 예: 곡선 관계를 직선으로 맞추면 데이터를 아무리 바꿔도 같은 방향으로 틀린다.</li>
<li><strong>평균 주위로 얼마나 흩어지는가</strong> → 분산(variance). 훈련 데이터의 우연한 특성(잡음)에 모델이 얼마나 민감한가.</li>
</ul>
<p>제곱 오차의 기대값은 정확히 편향² + 분산 + 잡음 분산 $\sigma^2$으로 분해된다(아래 수식). $\sigma^2$은 어떤 모델로도 줄일 수 없는 하한이다.</p>
<h3>복잡도와의 관계</h3>
<p>모델이 단순하면(직선) 유연성이 없어 편향이 크고 분산은 작다 — <strong>과소적합</strong>. 복잡하면(고차 다항식, 깊은 트리) 어떤 모양이든 맞출 수 있어 편향은 작지만 데이터의 잡음까지 따라가 분산이 크다 — <strong>과적합</strong>. 그 합인 테스트 오차는 보통 U자 모양이 되고, 최적의 복잡도는 그 사이에 있다.</p>
<h3>진단: 학습 곡선</h3>
<table><tr><th>증상</th><th>진단</th><th>대처</th></tr>
<tr><td>훈련 오차도 높고 검증 오차도 높다(차이 작음)</td><td>편향 큼(과소적합)</td><td>더 복잡한 모델, 특성 추가, 정규화 약화</td></tr>
<tr><td>훈련 오차는 낮은데 검증 오차가 훨씬 높다</td><td>분산 큼(과적합)</td><td>데이터 추가, 정규화 강화, 단순한 모델, 배깅, 조기 종료</td></tr></table>
<p><strong>데이터를 더 모으는 것</strong>은 주로 분산을 줄인다. 편향이 큰 모델(직선)에 데이터를 아무리 더 줘도 곡선을 표현할 수 없다.</p>
<h3>앙상블의 관점</h3>
<p>배깅(랜덤 포레스트)은 분산이 큰 모델 여러 개를 평균해 <strong>분산을 줄이고</strong>, 부스팅은 편향이 큰 약한 모델을 순차적으로 더해 <strong>편향을 줄인다</strong>.</p>
<h3>현대 딥러닝에 대한 주의</h3>
<p>파라미터 수가 데이터 수보다 훨씬 많은 신경망에서는 복잡도를 더 늘렸더니 테스트 오차가 다시 내려가는 "이중 하강(double descent)" 현상이 보고되었다. 고전적인 U자 곡선만으로는 모든 상황을 설명할 수 없다는 뜻이지만, 위의 분해식 자체는 여전히 성립하며 실무 진단 틀로서 유용하다.</p>`,
    analogy: R`<p>다트 던지기. <strong>편향이 큰 선수</strong>는 다트가 한곳에 모이지만 과녁 중심에서 벗어난 곳에 모인다(조준 자체가 틀림). <strong>분산이 큰 선수</strong>는 평균적으로는 중심 근처지만 다트가 사방으로 흩어진다(손이 떨림). 좋은 선수는 둘 다 작다. 연습 데이터(훈련 세트)가 바뀔 때마다 조준이 크게 바뀐다면 분산이 큰 것이다.</p>`,
    diagram: { caption: '모델 복잡도가 커질수록 편향²은 줄고 분산은 커진다. 테스트 오차(합)는 그 사이에서 최소가 된다.', svg: R`
<svg viewBox="0 0 500 250" width="500">
<path class="a" d="M40,225 H480"/><path class="a" d="M40,225 V12"/>
<text x="440" y="240" class="sm">모델 복잡도 →</text><text x="66" y="12" class="sm">오차</text>
<path class="e d" d="M40,203 H470"/><text x="420" y="215" class="sm">줄일 수 없는 잡음 σ²</text>
<path class="e" d="M50,40 C120,165 220,190 460,198"/><text x="100" y="60" class="st sm">편향²</text>
<path class="e" d="M50,200 C300,196 390,160 460,40"/><text x="463" y="62" class="st sm">분산</text>
<path class="he" d="M50,28 C150,190 330,195 460,30"/><text x="255" y="134" class="sm">테스트 오차</text>
<path class="e d" d="M255,160 V225"/>
<text x="120" y="238" class="sm">과소적합</text><text x="255" y="238" class="sm">적정</text><text x="370" y="238" class="sm">과적합</text>
</svg>` },
    math: [
      { tex: R`\mathbb{E}\big[(y - \hat f(x))^2\big] = \underbrace{\big(\mathbb{E}[\hat f(x)] - f(x)\big)^2}_{\text{편향}^2} + \underbrace{\mathbb{E}\big[(\hat f(x) - \mathbb{E}[\hat f(x)])^2\big]}_{\text{분산}} + \underbrace{\sigma^2}_{\text{잡음}}`, explain: R`$y = f(x) + \varepsilon$, $\varepsilon$의 평균 0·분산 $\sigma^2$. 기대값 $\mathbb E$는 "훈련 세트를 다시 뽑는 것"과 잡음에 대해 취한다.<ul class="defs"><li>$\hat f$: 학습된 모델</li><li>$f$: 진짜 함수</li></ul>` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

f = lambda x: np.sin(2 * np.pi * x)          # 진짜 함수 (학습자는 모름)
x_test = np.linspace(0.1, 0.9, 50)          # 다항식이 크게 튀는 양 끝은 제외
noise = 0.3

for degree in [1, 3, 6, 9]:
  preds = []
  for _ in range(200):                      # 서로 다른 훈련 세트 200개로 각각 학습
      x = rng.uniform(0, 1, 30)
      y = f(x) + rng.normal(0, noise, 30)
      preds.append(np.polyval(np.polyfit(x, y, degree), x_test))
  preds = np.array(preds)                   # (200개 모델, 50개 테스트 점)
  bias2 = np.mean((preds.mean(axis=0) - f(x_test)) ** 2)   # 평균 예측이 진짜에서 벗어난 정도
  var = np.mean(preds.var(axis=0))                         # 모델마다 예측이 흔들리는 정도
  print(f"차수 {degree}: 편향² {bias2:.3f}  분산 {var:.3f}  → 기대 테스트 오차 ≈ {bias2 + var + noise**2:.3f}")
`,
    links: [
      { to: 'ml-regularization', why: '정규화 강도 λ로 편향과 분산 사이를 조절' },
      { to: 'ml-cv', why: '편향-분산의 균형점을 데이터로 찾는 방법' },
      { to: 'ml-ensemble', why: '배깅은 분산을, 부스팅은 편향을 줄인다' },
      { to: 'ml-knn', why: 'k가 작을수록 분산↑, 클수록 편향↑' },
      { to: 'math-prob', why: '기대값과 분산의 정의' },
    ],
    quiz: [
      { q: '훈련 오차와 검증 오차가 모두 높고 둘의 차이가 작다. 가장 적절한 조치는?',
        options: ['데이터를 더 수집해 훈련 세트를 늘린다', '모델 복잡도를 높이거나 유용한 특성을 추가한다', '정규화를 더 강하게 걸어 모델을 단순화한다', '조기 종료 시점을 더 앞당겨 학습을 멈춘다'], answer: 1,
        explain: '편향이 큰(과소적합) 상태다. 모델이 데이터 구조를 표현하지 못하므로 데이터를 더 줘도 크게 나아지지 않는다. 나머지 선택지는 분산을 줄이는 방법이다.' },
      { q: '데이터를 더 많이 모으면 주로 줄어드는 오차 요소는?',
        options: ['편향', '분산', '줄일 수 없는 잡음 σ²', '세 가지 모두 같은 비율로'], answer: 1,
        explain: '데이터가 많아지면 훈련 세트가 바뀌어도 학습 결과가 덜 흔들린다. 모델의 가정에서 오는 편향과 데이터 자체의 잡음은 그대로다.' },
      { q: 'KNN에서 k=1과 k=전체 데이터 수(n)를 비교한 설명으로 옳은 것은?',
        options: ['k=1은 편향이 크고, k=n은 분산이 크다', 'k=1은 분산이 크고, k=n은 편향이 크다', '둘 다 분산이 크고, 중간 k에서 편향이 크다', '둘 다 편향이 크고, 중간 k에서 분산이 크다'], answer: 1,
        explain: 'k=1은 가장 가까운 훈련 점 하나에 민감해서 점 하나만 바뀌어도 예측이 바뀐다(분산↑). k=n은 항상 전체 다수 클래스를 예측하는 상수 예측이라 데이터가 바뀌어도 거의 흔들리지 않지만 체계적으로 틀린다(편향↑).' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 2.2절', 'Andrew Ng, 『Machine Learning Yearning』 — 편향·분산 진단 (무료 공개)', 'Belkin et al., "Reconciling modern machine learning practice and the bias-variance trade-off" (2019, 이중 하강)'],
  },
  {
    id:'ml-regularization', title: '과적합과 정규화 (L1·L2)',
    summary: R`손실에 <strong>가중치 크기 벌점</strong> 추가 → 잡음 추종 방지
L2: 고르게 축소 / L1: 일부를 <strong>정확히 0</strong>으로`,
    body: R`
<p>과적합된 모델은 훈련 데이터의 작은 변동을 맞추려고 가중치를 극단적인 값으로 키우는 경향이 있다(서로 상쇄되는 큰 양수·음수 계수 등). 정규화는 손실에 $\lambda \cdot (\text{가중치 크기})$를 더해 "데이터를 잘 맞추되, <strong>단순한 설명</strong>을 선호하라"는 압력을 준다. $\lambda$가 클수록 단순한 모델(편향↑ 분산↓)이 된다.</p>
<h3>L2 (릿지)</h3>
<p>벌점 $\lambda\lVert\mathbf w\rVert_2^2 = \lambda\sum w_j^2$. 큰 가중치를 제곱으로 강하게 벌하므로 가중치들이 <strong>고르게 작아진다</strong>. 해가 닫힌 형태로 존재한다: $(X^\top X + \lambda I)^{-1}X^\top\mathbf y$. $X^\top X$가 특이 행렬에 가까워도(다중공선성) $\lambda I$를 더하면 항상 가역이 되어 해가 안정된다. 상관이 큰 특성들이 있으면 가중치를 그들 사이에 나눠 갖는 경향이 있다.</p>
<h3>L1 (라쏘)</h3>
<p>벌점 $\lambda\lVert\mathbf w\rVert_1 = \lambda\sum |w_j|$. 많은 가중치를 <strong>정확히 0</strong>으로 만들어 자동으로 특성을 선택한다. 왜 0이 될까?</p>
<ul>
<li><strong>기하적 설명</strong>: 정규화 문제는 "가중치가 $\lVert\mathbf w\rVert \le t$ 영역 안에 있으면서 손실이 최소인 점"을 찾는 것과 같다. L2 영역은 원(구)이라 손실 등고선이 아무 곳에나 닿지만, L1 영역은 <strong>꼭짓점이 축 위에 있는 마름모</strong>라 등고선이 꼭짓점에 먼저 닿기 쉽다. 꼭짓점에서는 일부 좌표가 0이다(도식 참조).</li>
<li><strong>미분 관점</strong>: L2 벌점의 기울기 $2\lambda w$는 $w$가 0에 가까워질수록 작아져 0 근처에서 미는 힘이 사라진다. L1 벌점의 기울기는 $w$가 아무리 작아도 $\lambda$로 일정해서, 데이터가 주는 기울기가 $\lambda$보다 작은 특성은 0까지 밀려난다.</li>
</ul>
<p>L1은 미분 불가능한 점이 있어 닫힌 해가 없고 좌표 하강법 등으로 푼다. 상관이 큰 특성 그룹에서는 그중 하나만 고르고 나머지를 0으로 만드는 경향이 있어 선택이 불안정할 수 있다. 둘을 섞은 것이 <strong>Elastic Net</strong>이다.</p>
<h3>확률적 해석: 사전 분포</h3>
<p>베이즈 관점에서 정규화는 가중치에 대한 사전 믿음이다. L2는 "가중치는 0 근처의 정규분포를 따른다", L1은 "0에 뾰족한 라플라스 분포를 따른다"는 가정 하의 최대 사후 확률(MAP) 추정과 같다.</p>
<h3>실무 주의점</h3>
<ul>
<li><strong>표준화 필수</strong>: 벌점은 계수의 크기에 걸린다. 특성의 단위가 다르면(원 vs 만 원) 같은 효과라도 계수 크기가 달라 불공평하게 벌을 받는다.</li>
<li><strong>절편은 벌하지 않는다</strong>: 절편은 출력의 평균 수준일 뿐 복잡도와 무관하다.</li>
<li><strong>$\lambda$는 교차검증으로</strong> 고른다.</li>
<li>딥러닝에서는 L2(weight decay) 외에도 드롭아웃, 조기 종료, 데이터 증강 등이 같은 목적(분산 감소)으로 쓰인다.</li>
</ul>`,
    analogy: R`<p>보고서 분량 제한. 제한이 없으면(정규화 없음) 모든 사소한 관찰까지 장황하게 적다가 핵심을 놓친다. <strong>L2</strong>는 "전체 분량을 줄여라" — 모든 항목을 조금씩 줄인다. <strong>L1</strong>은 "항목 수를 줄여라" — 중요하지 않은 항목은 아예 삭제한다.</p>`,
    diagram: { caption: '빨간 등고선(손실)이 제약 영역에 처음 닿는 점이 해. L1의 마름모는 꼭짓점(축 위)에서 닿기 쉬워 w₁ = 0이 된다.', svg: R`
<svg viewBox="0 0 520 240" width="520">
<path class="a" d="M20,140 H230"/><path class="a" d="M120,208 V15"/>
<path class="h" d="M120,80 L180,140 L120,200 L60,140 Z" style="fill-opacity:.5"/>
<ellipse class="e" cx="185" cy="45" rx="75" ry="30" transform="rotate(-25 185 45)" style="stroke:var(--bad)"/>
<ellipse class="e" cx="185" cy="45" rx="40" ry="15" transform="rotate(-25 185 45)" style="stroke:var(--bad)"/>
<circle class="fill" cx="120" cy="80" r="5"/>
<text x="120" y="226" class="sm">L1: |w₁|+|w₂| ≤ t</text><text x="84" y="70" class="sm">w₁ = 0</text>
<text x="232" y="152" class="sm">w₁</text><text x="132" y="18" class="sm">w₂</text>
<path class="a" d="M290,140 H500"/><path class="a" d="M390,208 V15"/>
<circle class="h" cx="390" cy="140" r="60" style="fill-opacity:.5"/>
<ellipse class="e" cx="470" cy="50" rx="72" ry="30" transform="rotate(-25 470 50)" style="stroke:var(--bad)"/>
<ellipse class="e" cx="470" cy="50" rx="38" ry="15" transform="rotate(-25 470 50)" style="stroke:var(--bad)"/>
<circle class="fill" cx="424" cy="91" r="5"/>
<text x="390" y="226" class="sm">L2: w₁²+w₂² ≤ t</text><text x="440" y="98" class="st sm">둘 다 0 아님</text>
<text x="502" y="152" class="sm">w₁</text><text x="402" y="18" class="sm">w₂</text>
</svg>` },
    math: [
      { tex: R`\text{Ridge: } \min_{\mathbf w}\ \lVert \mathbf y - X\mathbf w\rVert_2^2 + \lambda \lVert \mathbf w \rVert_2^2 \;\Rightarrow\; \mathbf w^* = (X^\top X + \lambda I)^{-1} X^\top \mathbf y`, explain: R`$\lambda \ge 0$: 정규화 강도. $X^\top X$는 양의 준정부호이므로 $\lambda>0$이면 $X^\top X + \lambda I$의 모든 고유값이 $\lambda$ 이상이 되어 항상 가역이다.` },
      { tex: R`\text{Lasso: } \min_{\mathbf w}\ \frac{1}{2n}\lVert \mathbf y - X\mathbf w\rVert_2^2 + \alpha \lVert \mathbf w \rVert_1`, explain: R`scikit-learn의 Lasso 목적 함수 형태. $\lVert\mathbf w\rVert_1 = \sum_j |w_j|$. 0에서 미분 불가능한 이 항이 희소해를 만든다.` },
    ],
    code: R`
import numpy as np
from sklearn.linear_model import Lasso, Ridge
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)
n, d = 50, 10
X = rng.normal(size=(n, d))
X[:, 1] = X[:, 0] + rng.normal(0, 0.01, n)          # 0번과 거의 같은 특성 (다중공선성)
true_w = np.array([3, 0, 0, -2, 0, 0, 0, 1.5, 0, 0])
y = X @ true_w + rng.normal(0, 1, n)
X = StandardScaler().fit_transform(X)                  # 정규화 전 표준화

def ridge_closed(X, y, lam):                           # 절편은 중심화로 처리 (벌하지 않음)
  Xc, yc = X - X.mean(0), y - y.mean()
  return np.linalg.solve(Xc.T @ Xc + lam * np.eye(X.shape[1]), Xc.T @ yc)

np.set_printoptions(precision=2, suppress=True)
print("OLS   (λ=0)   :", ridge_closed(X, y, 0))       # 0번·1번 계수가 크게 반대 부호로 튈 수 있다
print("Ridge (λ=10)  :", ridge_closed(X, y, 10))      # 0번·1번이 효과를 나눠 갖고 안정적
print("sklearn Ridge :", Ridge(alpha=10).fit(X, y).coef_)   # 위와 같은 값
print("Lasso (α=0.1) :", Lasso(alpha=0.1).fit(X, y).coef_)  # 여러 계수가 정확히 0
`,
    links: [
      { to: 'ml-biasvar', why: 'λ는 편향과 분산 사이의 손잡이' },
      { to: 'math-bayes', why: 'L2·L1 정규화 = 가우시안·라플라스 사전 분포의 MAP 추정' },
      { to: 'ml-linear', why: 'XᵀX가 불안정할 때의 해결책' },
      { to: 'dl-norm', why: '딥러닝의 정규화: weight decay, 드롭아웃' },
      { to: 'ml-feature', why: 'L1을 이용한 임베디드 방식 특성 선택' },
    ],
    quiz: [
      { q: 'L1 정규화가 일부 가중치를 정확히 0으로 만드는 이유로 옳은 것은?',
        options: ['L1은 각 반복에서 크기가 작은 가중치를 골라 무작위로 0으로 만들기 때문', '벌점 기울기가 0 근처에서도 λ로 일정해, 데이터 기울기가 작은 가중치는 0까지 밀려서', 'L1은 가중치를 제곱해 벌점을 주므로 작은 값은 더 빨리 0에 도달하기 때문', 'L1은 가중치의 부호를 반복마다 뒤집어 평균적으로 0에 모이게 하기 때문'], answer: 1,
        explain: 'L2 벌점의 기울기(2λw)는 0 근처에서 사라지므로 0에 가까워질 뿐 정확히 0이 되기는 어렵다. 기하적으로는 마름모의 꼭짓점이 축 위에 있기 때문이다.' },
      { q: '정규화 모델을 학습하기 전에 특성을 표준화해야 하는 이유는?',
        options: ['표준화하면 벌점 계산에 쓰는 행렬이 작아져 학습이 빨라져서', '계수 크기는 단위에 따라 달라, 단위가 다르면 특성마다 불공평하게 벌을 받아서', '표준화하지 않으면 정규화 항의 기울기가 0이 되어 아무 효과가 없어서', '정규화는 평균이 0인 데이터에서만 볼록한 손실 함수가 되기 때문'], answer: 1,
        explain: '키를 m로 재면 계수가 크고 cm로 재면 계수가 작다. 같은 정보인데 벌점이 달라진다.' },
      { q: 'λ를 점점 키울 때 일어나는 일로 옳은 것은?',
        options: ['편향은 줄고 분산은 커져 훈련 오차가 계속 낮아진다', '편향은 커지고 분산은 줄며, 너무 크면 과소적합된다', '편향과 분산이 함께 줄어 검증 오차가 단조롭게 감소한다', '계수가 커져 모델이 복잡해지고 과적합이 심해진다'], answer: 1,
        explain: '벌점이 데이터 적합보다 중요해지면 모델이 단순해진다. 적절한 λ는 교차검증으로 찾는다.' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 6장 — 릿지, 라쏘', '『The Elements of Statistical Learning』(ESL) 3.4절 (무료 PDF 공개)', 'scikit-learn 사용자 가이드 — Linear Models'],
  },
  {
    id:'ml-cv', title: '교차검증과 데이터 누수', advanced: true,
    summary: R`모델 선택에 쓴 데이터로 평가 → 낙관적 편향
교차검증: <strong>제한된 데이터로 정직한 일반화 추정</strong>
데이터 누수 = 가장 흔한 실수`,
    body: R`
<h3>왜 세 개로 나누는가: train / validation / test</h3>
<p>하이퍼파라미터(정규화 강도, 트리 깊이 등)를 고르려면 여러 후보를 비교할 데이터가 필요하다. 그런데 검증 세트에서 가장 좋은 후보를 고르는 행위 자체가 <strong>검증 세트에 대한 학습</strong>이다. 후보를 많이 비교할수록 우연히 검증 세트에 잘 맞는 후보가 뽑히고, 그 점수는 실제보다 높다. 그래서 선택이 모두 끝난 뒤 <strong>한 번만</strong> 쓰는 테스트 세트를 따로 남겨 둔다.</p>
<h3>K-겹 교차검증</h3>
<p>데이터가 적으면 검증 세트를 크게 떼기 아깝고, 작게 떼면 점수가 어떤 샘플이 뽑혔느냐에 따라 크게 흔들린다. K-겹 교차검증은 데이터를 K개로 나눠, 각 조각을 한 번씩 검증에 쓰고 나머지로 학습한 K개 점수의 <strong>평균</strong>을 쓴다. 모든 샘플이 정확히 한 번 검증에 쓰이므로 데이터를 낭비하지 않고, 점수의 <strong>표준편차</strong>로 추정의 불확실성도 볼 수 있다. 대가는 K배의 학습 비용이다.</p>
<h3>데이터의 구조에 맞게 나누기</h3>
<ul>
<li><strong>Stratified K-Fold</strong>: 불균형 분류에서 각 fold의 클래스 비율을 전체와 같게 유지한다. 그렇지 않으면 어떤 fold에는 양성이 거의 없을 수 있다.</li>
<li><strong>시계열</strong>: 무작위로 섞으면 미래 데이터로 학습해 과거를 예측하게 된다. 실제 배포 상황(과거로 학습 → 미래 예측)을 흉내 내도록 항상 과거로 학습하고 이후 시점으로 검증한다(<code>TimeSeriesSplit</code>).</li>
<li><strong>그룹</strong>: 같은 환자의 여러 사진, 같은 사용자의 여러 로그가 학습과 검증에 나뉘어 들어가면, 모델이 "그 사람"을 외워서 점수가 부풀려진다. 그룹 단위로 나눈다(<code>GroupKFold</code>).</li>
</ul>
<h3>데이터 누수(leakage)</h3>
<p>예측 시점에는 얻을 수 없는 정보가 학습 과정에 섞여 들어가는 것이다. 검증 점수는 훌륭한데 배포하면 성능이 무너진다.</p>
<ul>
<li><strong>전처리 누수</strong>: 스케일러, 결측치 대체, 특성 선택을 <em>전체 데이터</em>로 <code>fit</code>한 뒤 나누면 검증 데이터의 통계가 학습에 섞인다. 특히 "라벨과 상관 높은 특성 고르기"를 분할 전에 하면 순수한 잡음에서도 높은 점수가 나온다(아래 코드). 해결: 전처리를 <code>Pipeline</code>에 넣어 fold마다 학습 데이터로만 fit한다.</li>
<li><strong>타깃 누수</strong>: 결과가 난 뒤에야 생기는 특성("환불 처리 여부"로 "사기 거래"를 예측)을 쓰는 경우.</li>
<li><strong>중복·근접 샘플</strong>: 거의 같은 샘플이 학습과 테스트에 모두 있는 경우.</li>
</ul>
<h3>중첩 교차검증</h3>
<p>교차검증으로 하이퍼파라미터를 고르고 같은 교차검증 점수를 성능으로 보고하면 역시 낙관적이다. 바깥 루프는 성능 추정, 안쪽 루프는 하이퍼파라미터 선택에 쓰는 중첩 교차검증으로 둘을 분리할 수 있다.</p>`,
    analogy: R`<p>모의고사 문제로 공부하면서 같은 모의고사로 실력을 재는 상황. 모의고사를 여러 번 풀어 볼수록 점수는 오르지만 실력이 아니라 그 문제에 익숙해진 것이다. 그래서 수능(테스트 세트)은 마지막에 한 번만 본다. 교차검증은 문제집을 5등분해 4권으로 공부하고 1권으로 확인하는 것을 돌아가며 5번 하는 방법이다. 데이터 누수는 <strong>시험 전에 답안지를 슬쩍 본 것</strong>이다.</p>`,
    diagram: { caption: '5-겹 교차검증: 각 fold가 한 번씩 검증 세트(강조)가 되고, 5개 점수의 평균과 표준편차를 본다.', svg: R`
<svg viewBox="0 0 520 200" width="520">
<g>
  <rect class="h" x="80" y="10" width="72" height="28"/><rect class="n" x="152" y="10" width="72" height="28"/><rect class="n" x="224" y="10" width="72" height="28"/><rect class="n" x="296" y="10" width="72" height="28"/><rect class="n" x="368" y="10" width="72" height="28"/>
  <rect class="n" x="80" y="46" width="72" height="28"/><rect class="h" x="152" y="46" width="72" height="28"/><rect class="n" x="224" y="46" width="72" height="28"/><rect class="n" x="296" y="46" width="72" height="28"/><rect class="n" x="368" y="46" width="72" height="28"/>
  <rect class="n" x="80" y="82" width="72" height="28"/><rect class="n" x="152" y="82" width="72" height="28"/><rect class="h" x="224" y="82" width="72" height="28"/><rect class="n" x="296" y="82" width="72" height="28"/><rect class="n" x="368" y="82" width="72" height="28"/>
  <rect class="n" x="80" y="118" width="72" height="28"/><rect class="n" x="152" y="118" width="72" height="28"/><rect class="n" x="224" y="118" width="72" height="28"/><rect class="h" x="296" y="118" width="72" height="28"/><rect class="n" x="368" y="118" width="72" height="28"/>
  <rect class="n" x="80" y="154" width="72" height="28"/><rect class="n" x="152" y="154" width="72" height="28"/><rect class="n" x="224" y="154" width="72" height="28"/><rect class="n" x="296" y="154" width="72" height="28"/><rect class="h" x="368" y="154" width="72" height="28"/>
</g>
<text x="40" y="24" class="sm">반복 1</text><text x="40" y="60" class="sm">반복 2</text><text x="40" y="96" class="sm">반복 3</text><text x="40" y="132" class="sm">반복 4</text><text x="40" y="168" class="sm">반복 5</text>
<text x="116" y="24" class="sm">검증</text><text x="188" y="60" class="sm">검증</text><text x="260" y="96" class="sm">검증</text><text x="332" y="132" class="sm">검증</text><text x="404" y="168" class="sm">검증</text>
<text x="474" y="24">s₁</text><text x="474" y="60">s₂</text><text x="474" y="96">s₃</text><text x="474" y="132">s₄</text><text x="474" y="168">s₅</text>
<text x="260" y="194" class="sm">흰 칸 = 학습에 사용 · 최종 점수 = mean(s) ± std(s)</text>
</svg>` },
    math: [
      { tex: R`\text{CV}_K = \frac{1}{K}\sum_{k=1}^{K} \text{score}\big(\hat f^{(-k)},\ D_k\big)`, explain: R`<ul class="defs"><li>$D_k$: $k$번째 fold</li><li>$\hat f^{(-k)}$: $D_k$를 제외한 데이터로 학습한 모델</li></ul>학습에 쓰지 않은 데이터로만 채점한 점수의 평균이다.` },
    ],
    code: R`
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
X = rng.normal(size=(100, 5000))     # 순수한 잡음 특성 5000개
y = rng.integers(0, 2, 100)          # 무작위 라벨 → 진짜로 가능한 정확도는 약 50%
cv = StratifiedKFold(5, shuffle=True, random_state=0)

# 잘못된 방법: '라벨과 상관 높은 특성 20개'를 전체 데이터로 먼저 고른 뒤 CV
X_leak = SelectKBest(f_classif, k=20).fit_transform(X, y)
print("누수 있는 CV:", cross_val_score(LogisticRegression(), X_leak, y, cv=cv).mean().round(3))

# 올바른 방법: 특성 선택까지 파이프라인에 넣어 fold마다 학습 데이터로만 fit
pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
scores = cross_val_score(pipe, X, y, cv=cv)
print("올바른 CV  :", scores.mean().round(3), "±", scores.std().round(3))
`,
    links: [
      { to: 'ml-biasvar', why: '검증 오차로 과소적합·과적합을 진단' },
      { to: 'ml-metrics', why: '교차검증에서 무엇으로 채점할 것인가' },
      { to: 'ml-feature', why: '전처리는 학습 데이터로만 fit — 파이프라인' },
      { to: 'ai-mlops', why: '배포 후 성능 저하(데이터 드리프트)와 검증 체계' },
    ],
    quiz: [
      { q: '여러 하이퍼파라미터 후보 중 테스트 세트 점수가 가장 높은 것을 고르고, 그 점수를 최종 성능으로 보고하면 어떤 문제가 있는가?',
        options: ['문제없다 — 테스트 세트로 고른 것이므로 오히려 가장 정확한 추정이다', '선택이 테스트 세트에 맞춰져 점수가 낙관적으로 편향된다', '후보를 여러 개 비교하면 테스트 세트의 크기가 줄어든 효과가 생긴다', '하이퍼파라미터는 테스트 점수에 영향을 주지 않으므로 의미가 없다'], answer: 1,
        explain: '선택에 쓴 데이터는 학습에 쓴 데이터나 마찬가지다. 선택은 검증 세트(또는 교차검증)로, 보고는 손대지 않은 테스트 세트로 한다.' },
      { q: '전체 데이터로 StandardScaler를 fit한 뒤 train/test로 나누는 것이 누수인 이유는?',
        options: ['StandardScaler는 분류 문제에서 라벨 정보를 함께 사용하기 때문', '테스트의 평균·표준편차가 학습에 섞여 배포 때 알 수 없는 정보를 쓴 셈이라서', '나누기 전에 스케일링하면 train과 test의 행 순서가 뒤섞이기 때문', '스케일링된 값은 원래 단위로 되돌릴 수 없어 해석이 불가능하기 때문'], answer: 1,
        explain: '스케일링 정도의 누수는 영향이 작을 때가 많지만, 특성 선택·타깃 인코딩처럼 라벨을 쓰는 전처리에서는 결과를 완전히 왜곡할 수 있다. 항상 Pipeline으로 fold 내부에서 fit한다.' },
      { q: '주가 예측 모델에 무작위 셔플 K-겹 교차검증을 쓰면 안 되는 이유는?',
        options: ['주가는 정규분포를 따르지 않아 K-겹의 독립 가정이 깨지기 때문', '미래 데이터로 학습해 과거를 맞히게 되어 실제보다 쉬운 문제가 되기 때문', '주가 데이터는 클래스가 불균형해서 겹마다 비율을 맞출 수 없기 때문', '셔플하면 같은 날짜의 데이터가 여러 겹에 중복으로 들어가기 때문'], answer: 1,
        explain: '시계열은 시간 순서를 지켜 "과거로 학습, 이후 구간으로 검증"하는 방식(TimeSeriesSplit, 롤링 검증)을 써야 한다.' },
    ],
    resources: ['『The Elements of Statistical Learning』(ESL) 7.10.2 "The Wrong and Right Way to Do Cross-validation"', 'scikit-learn 사용자 가이드 — Cross-validation, Common pitfalls (Data leakage)', 'Kaufman et al., "Leakage in Data Mining: Formulation, Detection, and Avoidance" (2012)'],
  },
  {
    id:'ml-tree', title: '결정 트리', advanced: true,
    summary: R`<strong>불순도가 가장 많이 줄어드는</strong> 질문으로 분할
해석 쉬움·전처리 거의 불필요
단독으로는 불안정 → 앙상블 부품`,
    body: R`
<p>결정 트리는 "공부 시간 ≤ 4.5?" 같은 질문을 반복해 특성 공간을 <strong>축에 평행한 직사각형 영역</strong>으로 나누고, 각 영역(잎)에서 다수 클래스(분류)나 평균값(회귀)을 예측한다.</p>
<h3>어떤 질문이 좋은 질문인가: 불순도</h3>
<p>좋은 분할은 나뉜 그룹이 각각 한 클래스로 "순수"해지는 분할이다. 순수하지 않은 정도를 불순도로 측정한다.</p>
<ul>
<li><strong>지니 불순도</strong> $1 - \sum_k p_k^2$: 무작위로 두 개를 뽑았을 때 클래스가 다를 확률. 한 클래스뿐이면 0.</li>
<li><strong>엔트로피</strong> $-\sum_k p_k\log_2 p_k$: 클래스를 알아내는 데 필요한 평균 정보량(비트). 분할 전후 엔트로피 차이가 <strong>정보 이득</strong>이다.</li>
<li><strong>회귀</strong>: 각 영역 안의 분산(MSE)을 불순도로 쓴다.</li>
</ul>
<p>분할의 점수는 자식 노드 불순도를 샘플 수로 가중 평균한 값이고, 이것이 가장 작아지는 (특성, 임계값)을 고른다.</p>
<h3>분할 탐색과 그리디</h3>
<p>각 특성의 값을 정렬하면 서로 다른 분할은 "인접한 두 값 사이"뿐이므로 후보가 유한하다. 모든 특성 × 모든 후보를 시도해 가장 좋은 분할을 고르고, 자식 노드에서 같은 과정을 재귀적으로 반복한다. 이것은 <strong>그리디</strong> 알고리즘이다. 각 노드에서 당장 최선인 분할을 고를 뿐, 전체적으로 최적인 트리를 보장하지 않는다. 최적의 결정 트리를 찾는 문제는 NP-완전으로 알려져 있어 현실적으로 그리디를 쓴다. 예를 들어 XOR 패턴처럼 한 특성만으로는 아무 이득이 없지만 두 특성을 조합해야 의미가 생기는 경우, 첫 분할에서 이득을 찾지 못할 수 있다.</p>
<h3>과적합과 제어</h3>
<p>제한 없이 키우면 잎마다 샘플이 하나 남을 때까지 나눠 훈련 데이터를 100% 맞히는 과적합이 일어난다. <code>max_depth</code>, <code>min_samples_leaf</code> 같은 사전 제한이나, 다 키운 뒤 검증 성능을 기준으로 가지를 잘라내는 비용-복잡도 가지치기(<code>ccp_alpha</code>)로 제어한다.</p>
<h3>장점과 한계</h3>
<ul>
<li><strong>스케일링 불필요</strong>: 분할은 값의 <em>순서</em>만 사용한다. 표준화나 로그 변환 같은 단조 증가 변환은 순서를 바꾸지 않으므로 같은 분할(임계값만 변환됨)이 나온다.</li>
<li>비선형 관계와 특성 간 상호작용을 자동으로 포착하고, 규칙을 그대로 읽을 수 있다.</li>
<li><strong>불안정(고분산)</strong>: 루트 근처 분할이 데이터의 작은 변화로 바뀌면 그 아래 트리 전체가 바뀐다.</li>
<li><strong>축 평행 경계</strong>: 대각선 경계를 표현하려면 계단 모양으로 많은 분할이 필요하다.</li>
</ul>
<p>불안정성은 여러 트리를 평균해 상쇄할 수 있다. 이것이 랜덤 포레스트와 그래디언트 부스팅이 정형 데이터에서 강력한 이유다.</p>`,
    analogy: R`<p>스무고개로 동물 맞히기. 좋은 첫 질문은 "날 수 있나요?"처럼 후보를 고르게 반으로 나누는 질문이다. "코끼리인가요?" 같은 질문은 대부분 "아니요"라서 정보가 거의 없다. 결정 트리는 매 단계 <strong>정보를 가장 많이 주는 질문</strong>을 고르지만, 지금 당장 좋은 질문만 고르기 때문에 전체 질문 순서가 최적이라는 보장은 없다.</p>`,
    diagram: { caption: '왼쪽의 트리가 오른쪽 특성 공간을 축에 평행한 영역으로 나눈다.', svg: R`
<svg viewBox="0 0 520 220" width="520">
<path class="e" d="M110,32 L50,100 M110,32 L180,100 M180,100 L130,170 M180,100 L230,170"/>
<rect class="h" x="55" y="16" width="110" height="32" rx="6"/><text x="110" y="32">x₁ ≤ 3 ?</text>
<rect class="n" x="125" y="84" width="110" height="32" rx="6"/><text x="180" y="100">x₂ ≤ 2 ?</text>
<circle class="n" cx="50" cy="100" r="16"/><text x="50" y="100">A</text>
<circle class="n" cx="130" cy="170" r="16"/><text x="130" y="170">B</text>
<circle class="n" cx="230" cy="170" r="16"/><text x="230" y="170">A</text>
<text x="66" y="62" class="sm">예</text><text x="152" y="62" class="st sm">아니요</text><text x="140" y="138" class="sm">예</text><text x="214" y="138" class="st sm">아니요</text>
<rect class="g" x="290" y="20" width="200" height="180"/>
<path class="he" d="M370,20 V200"/><path class="he" d="M370,128 H490"/>
<text x="330" y="110">A</text><text x="430" y="74">A</text><text x="430" y="164">B</text>
<text x="370" y="212" class="sm">x₁ = 3</text><text x="505" y="128" class="sm">x₂=2</text>
<text x="490" y="212" class="sm">x₁ →</text><text x="280" y="24" class="sm">x₂</text>
</svg>` },
    math: [
      { tex: R`\text{Gini}(S) = 1 - \sum_{k} p_k^2, \qquad H(S) = -\sum_{k} p_k \log_2 p_k`, explain: R`$p_k$: 노드 $S$ 안에서 클래스 $k$의 비율. 둘 다 한 클래스만 있으면 0, 클래스가 고르게 섞일수록 커진다.` },
      { tex: R`\text{Gain} = I(S) - \frac{|S_L|}{|S|} I(S_L) - \frac{|S_R|}{|S|} I(S_R)`, explain: R`<ul class="defs"><li>$I$: 불순도(지니 또는 엔트로피)</li><li>$S_L, S_R$: 분할 후 왼쪽·오른쪽 자식</li></ul>샘플 수로 가중하므로 소수 샘플만 떼어내는 분할은 이득이 작다.` },
    ],
    code: R`
import numpy as np

def gini(y):
  _, counts = np.unique(y, return_counts=True)
  p = counts / counts.sum()
  return 1 - np.sum(p ** 2)

def best_split(X, y):
  n, best = len(y), (None, None, gini(y))       # (특성, 임계값, 가중 지니)
  for j in range(X.shape[1]):
      values = np.unique(X[:, j])
      for t in (values[:-1] + values[1:]) / 2:   # 인접한 값의 중점만 후보로 충분
          left = X[:, j] <= t
          score = (left.sum() * gini(y[left]) + (~left).sum() * gini(y[~left])) / n
          if score < best[2]:
              best = (j, t, score)
  return best

# 특성: [공부 시간, 수면 시간] → 합격(1) / 불합격(0)
X = np.array([[1, 8], [2, 4], [3, 7], [4, 3], [5, 8], [6, 6], [7, 5], [8, 7], [2, 9], [7, 2]], float)
y = np.array([0, 0, 0, 0, 1, 1, 1, 1, 0, 0])

j, t, s = best_split(X, y)
print(f"루트 지니 {gini(y):.3f} → 최선의 분할: 특성 {j} <= {t}  (가중 지니 {s:.3f})")

# 단조 변환(표준화, 로그)을 해도 같은 특성·같은 데이터 분할이 선택된다
for name, Xt in [("표준화", (X - X.mean(0)) / X.std(0)), ("로그", np.log(X))]:
  jt, tt, st = best_split(Xt, y)
  print(f"{name}: 특성 {jt}, 가중 지니 {st:.3f}, 왼쪽 샘플 {np.flatnonzero(Xt[:, jt] <= tt)}")
`,
    links: [
      { to: 'math-info', why: '엔트로피와 정보 이득' },
      { to: 'ds-greedy', why: '각 노드의 분할 선택은 그리디' },
      { to: 'ds-tree', why: '자료구조로서의 트리, 탐색 경로 길이 = 깊이' },
      { to: 'ml-ensemble', why: '불안정한 트리를 여러 개 결합해 강력한 모델로' },
      { to: 'ml-feature', why: '트리 기반 모델은 스케일링이 필요 없다' },
    ],
    quiz: [
      { q: '특성을 표준화해도 결정 트리의 분할 결과(어떤 샘플이 어느 쪽으로 가는지)가 변하지 않는 이유는?',
        options: ['트리는 표준화된 값을 다시 원래 값으로 되돌려 분할하기 때문', '분할은 값의 순서만 쓰는데, 표준화는 순서를 바꾸지 않기 때문', '트리는 불순도만 계산하고 특성 값 자체는 사용하지 않기 때문', '표준화하면 모든 특성의 분산이 1이라 분할 후보가 같아지기 때문'], answer: 1,
        explain: '임계값의 숫자만 바뀌고 나뉘는 샘플 집합은 같다. 반면 거리나 계수 크기를 쓰는 KNN·SVM·정규화 선형 모델은 스케일링이 필요하다.' },
      { q: '결정 트리가 "불안정하다(분산이 크다)"고 하는 이유는?',
        options: ['학습할 때마다 분할 후보를 무작위로 뽑아 결과가 매번 달라서', '루트 근처 분할이 조금만 바뀌어도 아래 구조 전체가 연쇄적으로 바뀌어서', '잎 노드의 예측값이 평균이라 이상치 하나에 크게 흔들리기 때문', '깊이가 깊어질수록 각 노드의 샘플이 늘어나 계산이 불안정해져서'], answer: 1,
        explain: '계층 구조 때문에 상위 결정의 변화가 증폭된다. 랜덤 포레스트는 이런 트리 여러 개를 평균해 분산을 줄인다.' },
      { q: '두 특성 x₁, x₂에 대해 "x₁ + x₂ > 10"이 정답 경계인 문제를 결정 트리가 다루기 어려운 이유는?',
        options: ['트리는 두 특성을 함께 보는 분할을 정의할 수 없어 전혀 학습하지 못한다', '경계가 축에 평행해서 대각선을 계단 모양으로 근사하려면 분할이 많이 든다', '데이터가 선형 분리 가능하면 지니 불순도가 항상 0이라 분할이 멈춘다', '연속형 특성은 미리 구간으로 나눠야 해서 경계가 흐려지기 때문이다'], answer: 1,
        explain: '학습은 가능하지만 비효율적이고 과적합되기 쉽다. x₁ + x₂ 같은 특성을 직접 만들어 주면 한 번의 분할로 해결된다(피처 엔지니어링).' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 8장 — 트리 기반 방법', 'scikit-learn 사용자 가이드 — Decision Trees', 'Hyafil & Rivest, "Constructing optimal binary decision trees is NP-complete" (1976)'],
  },
  {
    id:'ml-ensemble', title: '앙상블: 배깅·랜덤 포레스트·부스팅', advanced: true,
    summary: R`여러 모델 결합 → 단일 모델보다 개선
<strong>배깅: 분산</strong> 감소(독립 모델 평균)
<strong>부스팅: 편향</strong> 감소(오차 순차 보정)`,
    body: R`
<h3>왜 평균을 내면 좋아지는가</h3>
<p>분산이 $\sigma^2$인 모델 $M$개의 예측을 평균하면, 모델 간 상관계수가 $\rho$일 때 평균의 분산은 $\rho\sigma^2 + \frac{1-\rho}{M}\sigma^2$이다. 모델을 많이 쓰면 둘째 항은 0으로 가지만 첫째 항 $\rho\sigma^2$은 남는다. 즉 <strong>모델들이 서로 다르게 틀릴수록</strong>(상관이 낮을수록) 평균의 효과가 크다. 같은 데이터로 같은 모델을 100개 학습하면 $\rho = 1$이라 아무 효과가 없다.</p>
<h3>배깅 (Bootstrap AGGregatING)</h3>
<p>원본 데이터에서 <strong>중복을 허용해 같은 크기로</strong> 샘플링(부트스트랩)한 데이터셋 여러 개로 각각 모델을 학습하고, 예측을 평균(회귀) 또는 투표(분류)한다. 데이터가 조금씩 달라 모델들이 다르게 틀리므로 분산이 줄어든다. 결정 트리처럼 <strong>편향은 낮고 분산이 큰</strong> 모델에 특히 효과적이다.</p>
<p>부트스트랩 샘플에는 각 원본 샘플이 포함되지 않을 확률이 $(1-1/n)^n \approx e^{-1} \approx 36.8\%$이다. 각 모델이 보지 못한 이 <strong>OOB(Out-Of-Bag)</strong> 샘플로 평가하면 별도 검증 세트 없이 일반화 성능을 추정할 수 있다.</p>
<h3>랜덤 포레스트: 상관을 더 낮추기</h3>
<p>강력한 특성이 하나 있으면 부트스트랩 트리들이 모두 그 특성으로 루트를 나눠 서로 비슷해진다($\rho$가 높음). 랜덤 포레스트는 <strong>각 분할마다 특성의 무작위 부분집합만</strong> 후보로 허용해 트리들을 강제로 다르게 만든다. 개별 트리는 약간 나빠지지만 상관이 낮아져 평균의 분산이 더 줄어든다.</p>
<h3>부스팅: 오차를 순차적으로 고치기</h3>
<p>부스팅은 모델을 <strong>순서대로</strong> 학습하며, 각 모델이 지금까지의 앙상블이 틀린 부분을 보정한다. 얕은 트리처럼 <strong>편향이 큰 약한 모델</strong>을 더해 가며 편향을 줄인다.</p>
<p><strong>그래디언트 부스팅</strong>은 이를 "함수 공간에서의 경사하강"으로 일반화한다. 현재 예측 $F$에서 손실을 줄이는 방향은 손실의 음의 그래디언트이고, 다음 트리는 이 그래디언트를 근사하도록 학습된다. MSE 손실이면 음의 그래디언트가 바로 <strong>잔차</strong>($y - F$)라서, "잔차에 트리를 맞추고 조금 더하기"를 반복하는 것이 된다. 학습률(shrinkage)을 작게 하면 트리가 더 많이 필요하지만 보통 일반화가 좋아진다. 순차적으로 오차를 줄이므로 트리를 너무 많이 쓰면 과적합되며, 조기 종료로 개수를 정한다.</p>
<p>XGBoost, LightGBM, CatBoost는 그래디언트 부스팅에 2차 미분 정보 활용, 트리 복잡도 정규화, 히스토그램 기반의 빠른 분할 탐색, 범주형 처리 등을 더한 구현이다. 정형(표) 데이터에서 매우 강력한 기본 선택지다.</p>
<h3>스태킹</h3>
<p>서로 다른 종류의 모델들의 예측을 입력으로 받아 최종 예측을 하는 메타 모델을 학습한다. 메타 모델의 학습 데이터는 반드시 교차검증 방식의 out-of-fold 예측으로 만들어야 누수가 없다.</p>`,
    analogy: R`<p><strong>배깅</strong>은 서로 다른 신문을 읽은 여러 전문가에게 독립적으로 물어 다수결을 내는 것. 다들 같은 신문만 읽었다면(상관이 높으면) 여럿에게 물어도 소용없다. <strong>부스팅</strong>은 오답 노트 공부법. 첫 번째 학생이 문제를 풀고, 두 번째 학생은 첫 번째가 틀린 문제를 집중적으로 공부하고, 세 번째는 그래도 남은 오답을 공부한다.</p>`,
    diagram: { caption: '배깅은 독립적인 모델을 병렬로 학습해 평균하고, 부스팅은 이전 모델의 잔차를 다음 모델이 학습하며 순차적으로 더한다.', svg: R`
<svg viewBox="0 0 540 230" width="540">
<text x="20" y="14" class="st sm">배깅 / 랜덤 포레스트 (병렬)</text>
<rect class="n" x="20" y="45" width="70" height="30" rx="5"/><text x="55" y="60">데이터</text>
<rect class="n" x="140" y="22" width="90" height="24" rx="5"/><text x="185" y="34" class="sm">부트스트랩 1</text>
<rect class="n" x="140" y="50" width="90" height="24" rx="5"/><text x="185" y="62" class="sm">부트스트랩 2</text>
<rect class="n" x="140" y="78" width="90" height="24" rx="5"/><text x="185" y="90" class="sm">부트스트랩 3</text>
<rect class="h" x="270" y="22" width="60" height="24" rx="5"/><text x="300" y="34" class="sm">트리 1</text>
<rect class="h" x="270" y="50" width="60" height="24" rx="5"/><text x="300" y="62" class="sm">트리 2</text>
<rect class="h" x="270" y="78" width="60" height="24" rx="5"/><text x="300" y="90" class="sm">트리 3</text>
<rect class="n" x="380" y="45" width="110" height="30" rx="5"/><text x="435" y="60">평균 / 투표</text>
<path class="a" d="M90,55 L138,34"/><path class="a" d="M90,60 H138"/><path class="a" d="M90,65 L138,90"/><path class="a" d="M230,34 H268"/><path class="a" d="M230,62 H268"/><path class="a" d="M230,90 H268"/><path class="a" d="M330,34 L378,55"/><path class="a" d="M330,62 H378"/><path class="a" d="M330,90 L378,66"/>
<text x="20" y="128" class="st sm">부스팅 (순차)</text>
<rect class="h" x="20" y="150" width="70" height="30" rx="5"/><text x="55" y="165">트리 1</text>
<rect class="n" x="120" y="150" width="70" height="30" rx="5"/><text x="155" y="165" class="sm">잔차 r₁</text>
<rect class="h" x="220" y="150" width="70" height="30" rx="5"/><text x="255" y="165">트리 2</text>
<rect class="n" x="320" y="150" width="70" height="30" rx="5"/><text x="355" y="165" class="sm">잔차 r₂</text>
<rect class="h" x="420" y="150" width="70" height="30" rx="5"/><text x="455" y="165">트리 3</text>
<path class="a" d="M90,165 H118"/><path class="a" d="M190,165 H218"/><path class="a" d="M290,165 H318"/><path class="a" d="M390,165 H418"/>
<text x="255" y="210">F = F₀ + η·트리1 + η·트리2 + η·트리3 + …</text>
</svg>` },
    math: [
      { tex: R`\operatorname{Var}\!\Big(\frac{1}{M}\sum_{m=1}^{M} \hat f_m\Big) = \rho\,\sigma^2 + \frac{1-\rho}{M}\,\sigma^2`, explain: R`<ul class="defs"><li>$\sigma^2$: 개별 모델의 분산</li><li>$\rho$: 모델 간 상관계수</li><li>$M$: 모델 수</li></ul>$M$을 늘려도 $\rho\sigma^2$은 남으므로 상관을 낮추는 것(랜덤 포레스트의 특성 샘플링)이 중요하다.` },
      { tex: R`P(\text{샘플 } i \text{가 부트스트랩에 없음}) = \Big(1 - \frac{1}{n}\Big)^{n} \xrightarrow{n\to\infty} e^{-1} \approx 0.368`, explain: R`$n$번 뽑는 동안 매번 샘플 $i$가 아닌 것을 뽑을 확률. 각 트리는 데이터의 약 63.2%만 본다.` },
      { tex: R`F_m(x) = F_{m-1}(x) + \eta\, h_m(x), \qquad h_m \approx -\frac{\partial L(y, F)}{\partial F}\Big|_{F = F_{m-1}}`, explain: R`그래디언트 부스팅.<ul class="defs"><li>$h_m$: $m$번째 트리</li><li>$\eta$: 학습률</li></ul>MSE 손실 $\tfrac12(y-F)^2$이면 음의 그래디언트는 잔차 $y - F_{m-1}$이다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

# 1) 부트스트랩에 포함되지 않는(OOB) 비율 ≈ 1/e
n = 10_000
idx = rng.integers(0, n, n)                       # 중복 허용 n번 추출
print(f"OOB 비율 {1 - len(np.unique(idx)) / n:.4f}  (1/e = {np.exp(-1):.4f})")

# 2) 그래디언트 부스팅(MSE) 직접 구현: 잔차에 깊이 1 트리(stump)를 반복 적합
x = np.sort(rng.uniform(0, 6, 200))
y = np.sin(x) + rng.normal(0, 0.2, 200)

def fit_stump(x, r):
  best = None
  for t in (x[:-1] + x[1:]) / 2:
      left = x <= t
      a, b = r[left].mean(), r[~left].mean()
      err = np.sum((r - np.where(left, a, b)) ** 2)
      if best is None or err < best[0]:
          best = (err, t, a, b)
  _, t, a, b = best
  return lambda z: np.where(z <= t, a, b)

lr = 0.1
F = np.full_like(y, y.mean())                     # 초기 예측: 평균
for m in range(1, 201):
  h = fit_stump(x, y - F)                       # MSE의 음의 그래디언트 = 잔차
  F = F + lr * h(x)                             # 학습률만큼만 더한다
  if m in (1, 10, 50, 200):
      print(f"트리 {m:3d}개  훈련 MSE {np.mean((y - F) ** 2):.4f}")
`,
    links: [
      { to: 'ml-tree', why: '앙상블의 기본 부품' },
      { to: 'ml-biasvar', why: '배깅 = 분산 감소, 부스팅 = 편향 감소' },
      { to: 'ml-linear', why: '그래디언트 부스팅 = 함수 공간에서의 경사하강' },
      { to: 'math-prob', why: '분산의 성질과 상관계수' },
      { to: 'ml-cv', why: 'OOB 추정, 스태킹의 out-of-fold 예측' },
    ],
    quiz: [
      { q: '같은 학습 데이터로 같은 설정의 결정 트리(무작위성 없음)를 100개 만들어 평균내면?',
        options: ['분산이 1/100로 줄어 단일 트리보다 훨씬 안정적이다', '100개 트리가 모두 같아(ρ=1) 평균해도 단일 트리와 같다', '편향이 줄어 단일 트리보다 더 복잡한 경계를 표현한다', '분산이 1/10(√100)로 줄어 부트스트랩과 같은 효과가 난다'], answer: 1,
        explain: '평균의 분산 ρσ² + (1-ρ)σ²/M에서 ρ=1이면 σ² 그대로다. 앙상블의 핵심은 모델 간의 다양성이다.' },
      { q: '랜덤 포레스트가 각 분할에서 특성의 일부만 후보로 쓰는 이유는?',
        options: ['특성을 전부 보면 분할 계산이 너무 느려서 속도만을 위해 줄이는 것이다', '강한 특성이 모든 트리 상단을 독점해 트리들이 비슷해지는 것을 막기 위해', '일부 특성만 보면 각 트리의 정확도가 올라가 평균 성능이 좋아지기 때문', '특성 중요도를 공정하게 계산하려면 특성마다 쓰이는 횟수를 맞춰야 해서'], answer: 1,
        explain: '개별 트리의 성능은 약간 떨어질 수 있지만 상관이 낮아져 평균의 분산이 더 크게 줄어든다.' },
      { q: '그래디언트 부스팅에서 학습률을 0.3에서 0.03으로 낮추면 일반적으로?',
        options: ['트리가 더 많이 필요하지만 일반화는 비슷하거나 나아지는 경우가 많다', '트리 수와 무관하게 각 트리가 거의 학습하지 않아 성능이 계속 나빠진다', '각 트리가 잔차를 더 정확히 맞추게 되어 과적합이 반드시 심해진다', '학습률은 트리 개수에만 영향을 주고 최종 성능에는 영향이 없다'], answer: 0,
        explain: '각 트리의 기여를 줄이면 한 트리의 실수가 덜 반영되어 정규화 효과가 있다. 대신 학습 시간이 늘어나므로 조기 종료와 함께 트리 수를 정한다.' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 8.2절', 'Friedman, "Greedy Function Approximation: A Gradient Boosting Machine" (2001)', 'Breiman, "Random Forests" (2001)', 'XGBoost 공식 문서 — Introduction to Boosted Trees'],
  },
  {
    id:'ml-svm', title: '서포트 벡터 머신 (SVM)',
    summary: R`<strong>마진이 최대인</strong> 결정 경계
커널 트릭: 고차원 매핑 없이 비선형 경계`,
    body: R`
<h3>왜 마진을 최대화하는가</h3>
<p>선형 분리 가능한 데이터에는 분리하는 직선이 무수히 많다. 그중 양쪽 클래스의 가장 가까운 점과 최대한 멀리 떨어진 경계는 새 데이터가 조금 흔들려도 반대편으로 넘어갈 가능성이 가장 작다. 이 직관은 "마진이 클수록 일반화 오차의 상한이 작아진다"는 학습 이론의 결과로도 뒷받침된다.</p>
<p>경계 $\mathbf w^\top\mathbf x + b = 0$에서 점까지의 거리는 $|\mathbf w^\top\mathbf x + b|/\lVert\mathbf w\rVert$이다. 가장 가까운 점에서 $|\mathbf w^\top\mathbf x + b| = 1$이 되도록 스케일을 정하면 마진 폭은 $2/\lVert\mathbf w\rVert$이므로, <strong>마진 최대화 = $\lVert\mathbf w\rVert^2$ 최소화</strong>가 된다.</p>
<h3>서포트 벡터</h3>
<p>최적 경계는 마진 경계선 위(또는 안쪽)에 있는 소수의 점들만으로 결정된다. 이 점들이 서포트 벡터다. 나머지 점은 아무리 많이 지우거나 움직여도(마진 밖에 있는 한) 경계가 변하지 않는다. 그래서 SVM의 해는 데이터 일부에 대한 "희소한" 표현이다.</p>
<h3>소프트 마진과 C</h3>
<p>현실 데이터는 겹치고 이상치가 있다. 소프트 마진은 마진 침범을 허용하되 벌점을 준다. 이는 <strong>힌지 손실</strong> $\max(0, 1 - y_i(\mathbf w^\top\mathbf x_i + b))$에 L2 정규화를 더한 것과 같다. 하이퍼파라미터 $C$는 침범에 대한 벌점 크기다.</p>
<ul><li>$C$ 큼 → 침범을 거의 허용하지 않음 → 좁은 마진, 이상치에 민감(분산↑).</li><li>$C$ 작음 → 침범을 허용하고 넓은 마진(편향↑, 정규화 강함).</li></ul>
<p>힌지 손실은 올바르게, 충분한 여유로 분류된 점(마진 밖)에는 손실이 정확히 0이다. 모든 점에 대해 확률을 맞추려는 로지스틱 회귀와 달리, 경계 근처의 점에만 집중한다.</p>
<h3>커널 트릭</h3>
<p>원 안/밖처럼 선형 분리가 안 되는 데이터도 $\phi(x_1,x_2) = (x_1, x_2, x_1^2+x_2^2)$처럼 고차원으로 보내면 평면으로 분리된다. 문제는 고차원 계산 비용이다. SVM의 최적화 문제를 쌍대(dual) 형태로 바꾸면 데이터가 오직 <strong>내적 $\phi(\mathbf x)^\top\phi(\mathbf z)$</strong> 형태로만 등장한다. 그래서 이 내적을 원래 공간에서 바로 계산하는 함수 $K(\mathbf x,\mathbf z)$(커널)만 있으면 $\phi$를 계산할 필요가 없다. 가장 많이 쓰는 RBF 커널은 무한 차원 특성 공간의 내적에 해당한다.</p>
<p>RBF 커널의 $\gamma$는 한 점의 영향 범위를 정한다. $\gamma$가 크면 영향이 좁아 경계가 구불구불해지고(과적합), 작으면 경계가 매끄러워진다.</p>
<h3>실무 주의점</h3>
<p>거리와 내적에 의존하므로 <strong>특성 스케일링이 필수</strong>다. 커널 SVM은 샘플 쌍마다 커널 값을 다루므로 데이터가 수십만 건 이상이면 학습이 매우 느려진다. 대규모 데이터에는 선형 SVM이나 다른 모델을 쓰는 것이 일반적이다. 확률 출력이 기본으로 나오지 않는다(별도 보정 필요).</p>`,
    analogy: R`<p>두 마을 사이에 <strong>가장 넓은 도로</strong>를 내는 일. 도로의 중앙선이 경계이고, 도로 폭이 마진이다. 도로 폭을 결정하는 것은 도로에 바로 붙어 있는 몇 채의 집(서포트 벡터)뿐이고, 마을 안쪽 집들은 도로 위치에 영향을 주지 않는다. 소프트 마진은 "몇 채는 도로 위에 있어도 되니 도로를 더 넓게"라는 타협이다.</p>`,
    diagram: { caption: '실선이 결정 경계, 점선이 마진 경계. 점선 위의 강조된 점이 서포트 벡터이며 이 점들만으로 경계가 정해진다.', svg: R`
<svg viewBox="0 0 400 240" width="400">
<path class="he" d="M40,220 L260,0"/>
<path class="e d" d="M0,210 L210,0"/><path class="e d" d="M70,240 L310,0"/>
<path class="a" d="M108,102 L150,144"/><path class="a" d="M150,144 L108,102"/>
<text x="104" y="92" class="en sm">마진 2/‖w‖</text>
<circle class="n" cx="40" cy="60" r="7"/><circle class="n" cx="70" cy="110" r="7"/><circle class="n" cx="30" cy="150" r="7"/><circle class="n" cx="100" cy="40" r="7"/><circle class="n" cx="120" cy="80" r="7"/><circle class="n" cx="45" cy="105" r="7"/>
<circle class="h" cx="90" cy="120" r="7"/><circle class="h" cx="150" cy="60" r="7"/>
<circle class="e" cx="90" cy="120" r="13"/><circle class="e" cx="150" cy="60" r="13"/>
<rect class="n" x="243" y="143" width="14" height="14"/><rect class="n" x="293" y="113" width="14" height="14"/><rect class="n" x="223" y="183" width="14" height="14"/><rect class="n" x="313" y="173" width="14" height="14"/><rect class="n" x="273" y="203" width="14" height="14"/><rect class="n" x="340" y="120" width="14" height="14"/>
<rect class="h" x="193" y="103" width="14" height="14"/><rect class="h" x="153" y="143" width="14" height="14"/>
<circle class="e" cx="200" cy="110" r="14"/><circle class="e" cx="160" cy="150" r="14"/>
</svg>` },
    math: [
      { tex: R`\min_{\mathbf w, b}\ \frac12\lVert\mathbf w\rVert^2 \quad \text{s.t.}\quad y_i(\mathbf w^\top\mathbf x_i + b) \ge 1\ \ \forall i`, explain: R`하드 마진 SVM. $y_i \in \{-1, +1\}$. 제약은 "모든 점이 올바른 쪽에, 마진 경계 밖에 있다"는 뜻. $\lVert\mathbf w\rVert$를 줄이는 것이 마진 $2/\lVert\mathbf w\rVert$를 키우는 것이다.` },
      { tex: R`\min_{\mathbf w, b}\ \frac12\lVert\mathbf w\rVert^2 + C\sum_{i}\max\big(0,\ 1 - y_i(\mathbf w^\top\mathbf x_i + b)\big)`, explain: R`소프트 마진 SVM = 힌지 손실 + L2 정규화. $C$: 마진 침범 벌점의 크기(정규화 강도의 역수 역할).` },
      { tex: R`K(\mathbf x, \mathbf z) = \exp\!\big(-\gamma\lVert\mathbf x - \mathbf z\rVert^2\big)`, explain: R`RBF(가우시안) 커널. 두 점이 가까우면 1, 멀면 0에 가까운 "유사도". $\gamma$: 영향 범위의 역수.` },
    ],
    code: R`
import numpy as np
from sklearn.datasets import make_blobs, make_circles
from sklearn.model_selection import cross_val_score
from sklearn.svm import SVC

X, y = make_blobs(n_samples=100, centers=2, cluster_std=1.0, random_state=6)
clf = SVC(kernel="linear", C=1000).fit(X, y)          # C가 크면 하드 마진에 가깝다
print("서포트 벡터 수:", len(clf.support_), "/ 전체", len(X))
print("마진 폭 2/||w|| =", round(2 / np.linalg.norm(clf.coef_[0]), 3))

# 서포트 벡터만으로 다시 학습해도 경계가 (거의) 같다
clf2 = SVC(kernel="linear", C=1000).fit(X[clf.support_], y[clf.support_])
print("w 비교:", clf.coef_[0].round(3), clf2.coef_[0].round(3))

# 원형 데이터: 선형 커널은 실패, RBF 커널은 성공
Xc, yc = make_circles(n_samples=300, factor=0.4, noise=0.08, random_state=0)
for k in ["linear", "rbf"]:
  print(f"{k:6s} 교차검증 정확도:", cross_val_score(SVC(kernel=k), Xc, yc, cv=5).mean().round(3))
`,
    links: [
      { to: 'math-vector', why: '내적, 노름, 점과 초평면 사이의 거리' },
      { to: 'ml-logistic', why: '힌지 손실 vs 로지스틱 손실 — 같은 선형 경계, 다른 손실' },
      { to: 'ml-regularization', why: '소프트 마진 SVM = 힌지 손실 + L2 정규화' },
      { to: 'ml-feature', why: '거리 기반 모델이라 스케일링 필수' },
      { to: 'ml-knn', why: 'RBF 커널 = 거리 기반 유사도' },
    ],
    quiz: [
      { q: '학습된 선형 SVM에서 서포트 벡터가 아닌(마진 밖의) 점 하나를 삭제하고 다시 학습하면?',
        options: ['경계가 그 점 쪽으로 크게 이동한다', '경계는 변하지 않는다', '서포트 벡터 수가 반드시 늘어난다', '마진이 좁아지고 경계가 회전한다'], answer: 1,
        explain: '최적해는 서포트 벡터만으로 결정된다. 마진 밖의 점은 제약이 활성화되지 않아(힌지 손실 0) 해에 영향을 주지 않는다.' },
      { q: '소프트 마진 SVM에서 C를 매우 크게 하면?',
        options: ['마진이 넓어지고 이상치에 훨씬 둔감해진다', '침범을 거의 허용하지 않아 마진이 좁고 이상치에 민감하다', '모든 점이 서포트 벡터가 되어 항상 과소적합된다', '커널이 자동으로 선형으로 바뀌어 경계가 단순해진다'], answer: 1,
        explain: 'C는 침범 벌점의 크기다. 크면 모든 점을 맞추려 하고, 작으면 넓은 마진을 위해 일부 오류를 허용한다.' },
      { q: '커널 트릭이 계산적으로 유리한 이유는?',
        options: ['커널을 쓰면 데이터 차원이 줄어 계산량이 감소하기 때문', '쌍대 문제에 데이터가 내적으로만 나와 K(x, z)만 계산하면 되기 때문', '커널 함수는 항상 선형이라 행렬 곱 한 번으로 계산이 끝나기 때문', '커널을 쓰면 서포트 벡터만 저장하면 되어 학습 데이터가 필요 없기 때문'], answer: 1,
        explain: 'RBF 커널은 무한 차원 공간의 내적에 해당하지만, 계산은 원래 공간에서 거리 하나를 구하는 것으로 끝난다.' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 9장', 'Stanford CS229 강의 노트 — Support Vector Machines', 'scikit-learn 사용자 가이드 — Support Vector Machines'],
  },
  {
    id:'ml-knn', title: 'KNN과 거리, 차원의 저주',
    summary: R`가장 가까운 $k$개 이웃의 다수결·평균
성능 좌우: <strong>거리 정의·스케일·차원</strong>
벡터 검색의 원형`,
    body: R`
<p>KNN은 학습 단계에서 데이터를 저장만 하고(게으른 학습), 예측할 때 새 점과 모든 학습 점의 거리를 계산해 가장 가까운 $k$개의 라벨로 결정한다. 가정은 단 하나, "가까운 점은 라벨도 비슷하다"이다.</p>
<h3>거리의 선택</h3>
<ul>
<li><strong>유클리드</strong>(L2): 직선거리. 가장 일반적.</li>
<li><strong>맨해튼</strong>(L1): 축 방향 거리의 합. 이상치 같은 큰 차이에 덜 민감하다.</li>
<li><strong>코사인 유사도</strong>: 벡터의 방향만 비교하고 크기는 무시한다. 문서·임베딩처럼 "어떤 성분이 상대적으로 큰가"가 중요할 때 쓴다. 벡터를 길이 1로 정규화하면 유클리드 거리 순위와 코사인 유사도 순위가 일치한다.</li>
</ul>
<h3>스케일링은 선택이 아니다</h3>
<p>키(cm, 범위 수십)와 연봉(원, 범위 수천만)을 그대로 쓰면 거리는 사실상 연봉 차이만 반영한다. 키가 20cm 다른 사람이 연봉 200만 원 다른 사람보다 "가깝다"고 판단된다. 표준화로 각 특성이 거리에 기여하는 정도를 맞춰야 한다.</p>
<h3>k의 선택 = 편향-분산 조절</h3>
<p>$k=1$이면 가장 가까운 한 점에 휘둘려 경계가 들쭉날쭉하다(분산↑). $k$가 크면 넓은 영역을 평균해 경계가 매끄러워지지만 국소 구조를 놓친다(편향↑). 교차검증으로 고르고, 이진 분류에서는 동점을 피하려 홀수를 쓰기도 한다.</p>
<h3>차원의 저주</h3>
<p>차원이 커지면 직관이 깨진다. 단위 초입방체에서 데이터의 10%를 포함하는 부분 입방체의 한 변 길이는 $0.1^{1/d}$인데, $d=10$이면 약 0.79다. "이웃"을 찾으려고 각 축 범위의 79%까지 넓혀야 한다는 뜻이다. 또 고차원에서 무작위 점들 사이의 거리는 서로 비슷해져서, 가장 가까운 점과 가장 먼 점의 거리 비가 1에 가까워진다(아래 코드). "가장 가까운 이웃"이라는 개념이 덜 의미 있어진다. 실제 데이터가 고차원 공간에서도 성능이 나오는 것은 데이터가 공간 전체에 퍼져 있지 않고 저차원 구조 근처에 몰려 있는 경우가 많기 때문이다. 그래서 차원 축소나 좋은 표현(임베딩)이 중요하다.</p>
<h3>예측 비용과 근사 최근접 탐색</h3>
<p>단순 구현은 예측마다 $O(nd)$로 모든 점과 거리를 잰다. 저차원에서는 KD-트리 같은 공간 분할 구조로 빠르게 할 수 있지만 고차원에서는 효과가 떨어진다. 수백만~수십억 개의 임베딩에서 비슷한 벡터를 찾는 벡터 DB는 정확도를 약간 포기하고 속도를 얻는 <strong>근사 최근접 이웃(ANN)</strong> 기법(그래프 기반 HNSW, 클러스터 기반 IVF, 양자화 등)을 쓴다. RAG의 검색 단계가 바로 이 "임베딩 공간에서의 KNN"이다.</p>`,
    analogy: R`<p>처음 간 동네에서 맛집 고르기: "내 취향과 비슷한 친구 3명이 좋아한 식당"을 고른다. 친구가 1명이면 그 친구의 특이한 취향에 휘둘리고, 100명이면 평범한 인기 식당만 남는다. 그리고 "비슷하다"를 매운맛 선호도 하나로만 재는지, 가격대·분위기까지 같은 비중으로 보는지가 결과를 좌우한다(스케일링과 거리 정의).</p>`,
    diagram: { caption: 'k=3: ★에서 가장 가까운 3개 중 사각형이 2개이므로 사각형 클래스로 예측. k를 바꾸면 결과가 달라질 수 있다.', svg: R`
<svg viewBox="0 0 420 230" width="420">
<circle class="e d" cx="200" cy="115" r="58"/>
<circle class="n" cx="70" cy="60" r="8"/><circle class="n" cx="100" cy="150" r="8"/><circle class="n" cx="60" cy="120" r="8"/><circle class="n" cx="130" cy="40" r="8"/><circle class="n" cx="120" cy="190" r="8"/>
<circle class="h" cx="160" cy="80" r="8"/>
<rect class="n" x="310" y="70" width="16" height="16"/><rect class="n" x="340" y="140" width="16" height="16"/><rect class="n" x="290" y="180" width="16" height="16"/><rect class="n" x="360" y="50" width="16" height="16"/>
<rect class="h" x="222" y="137" width="16" height="16"/><rect class="h" x="235" y="80" width="16" height="16"/>
<path class="ha" d="M200,115 L162,82"/><path class="ha" d="M200,115 L228,141"/><path class="ha" d="M200,115 L238,90"/>
<text x="200" y="115" style="font-size:22px">★</text>
<text x="200" y="200" class="sm">k=3 → □ 2개, ○ 1개 → □</text>
</svg>` },
    math: [
      { tex: R`d_2(\mathbf x, \mathbf z) = \sqrt{\textstyle\sum_j (x_j - z_j)^2},\quad d_1 = \textstyle\sum_j |x_j - z_j|,\quad \cos\theta = \dfrac{\mathbf x^\top \mathbf z}{\lVert\mathbf x\rVert\,\lVert\mathbf z\rVert}`, explain: R`유클리드, 맨해튼 거리와 코사인 유사도. 단위 벡터에서는 $\lVert\mathbf x - \mathbf z\rVert^2 = 2 - 2\cos\theta$이므로 두 기준의 순위가 같다.` },
      { tex: R`\ell = r^{1/d}`, explain: R`$d$차원 단위 초입방체에서 부피 비율 $r$(예: 0.1)을 차지하는 부분 입방체의 한 변 길이. $d$가 커지면 1에 가까워져 "국소적인 이웃"이 사라진다.` },
    ],
    code: R`
import numpy as np
from collections import Counter
rng = np.random.default_rng(0)

def knn_predict(X_train, y_train, x, k=3):
  d = np.sqrt(((X_train - x) ** 2).sum(axis=1))   # 모든 학습 점까지 거리: O(n·d)
  nearest = np.argpartition(d, k)[:k]             # 전체 정렬 없이 가장 작은 k개 → O(n)
  return Counter(y_train[nearest]).most_common(1)[0][0]

X_train = np.array([[1, 1], [1, 2], [2, 1], [6, 5], [7, 7], [6, 6]])
y_train = np.array(["A", "A", "A", "B", "B", "B"])
print(knn_predict(X_train, y_train, np.array([2, 2])), knn_predict(X_train, y_train, np.array([5, 5])))  # A B

# 스케일 문제: (키 cm, 연봉 원)
a, b, c = np.array([170, 50_000_000]), np.array([171, 52_000_000]), np.array([190, 50_100_000])
print(f"a-b 거리 {np.linalg.norm(a - b):,.0f}  /  a-c 거리 {np.linalg.norm(a - c):,.0f}")  # 키가 20cm 다른 c가 더 가깝다?

# 차원의 저주: 가장 가까운 점과 가장 먼 점의 거리 비가 1에 가까워진다
for dim in [2, 10, 100, 1000]:
  P = rng.uniform(size=(1000, dim))
  d = np.linalg.norm(P - rng.uniform(size=dim), axis=1)
  print(f"차원 {dim:4d}: 최소/최대 거리 비 = {d.min() / d.max():.3f}")
`,
    links: [
      { to: 'db-vector', why: '근사 최근접 이웃(ANN) 검색 = 대규모 KNN' },
      { to: 'ai-embedding', why: '좋은 임베딩 공간에서는 "가까움 = 의미가 비슷함"' },
      { to: 'ai-rag', why: 'RAG의 검색 단계는 질문 임베딩의 최근접 문서 찾기' },
      { to: 'ds-heap', why: 'k개의 최근접 이웃 유지 = Top-k' },
      { to: 'math-vector', why: '노름, 내적, 코사인 유사도' },
      { to: 'ml-pca', why: '차원의 저주를 완화하는 차원 축소' },
    ],
    quiz: [
      { q: '키(cm)와 연봉(원)을 그대로 넣은 KNN에서 생기는 문제는?',
        options: ['문제없다 — KNN은 거리 순위만 보므로 단위의 영향을 받지 않는다', '연봉의 수치 범위가 훨씬 커서 거리가 사실상 연봉 차이로만 정해진다', '키의 소수점 자리가 많아 거리가 사실상 키 차이로만 정해진다', '단위가 다르면 거리를 계산할 수 없어 KNN이 오류를 낸다'], answer: 1,
        explain: '거리는 각 축 차이의 제곱합이다. 표준화로 각 특성의 기여도를 맞춰야 한다.' },
      { q: '고차원(예: 1000차원)에서 KNN 성능이 떨어지기 쉬운 이유는?',
        options: ['차원이 높으면 거리 값이 너무 커져 부동소수점 범위를 넘기 때문', '점들 사이 거리가 서로 비슷해져 "가장 가까운 이웃"의 의미가 약해지기 때문', '고차원에서는 유클리드 거리가 정의되지 않아 코사인만 쓸 수 있기 때문', 'k를 차원 수보다 크게 잡아야 해서 사실상 다수결과 같아지기 때문'], answer: 1,
        explain: '차원의 저주. 데이터가 저차원 구조에 몰려 있거나 좋은 표현으로 바꿀 수 있을 때만 고차원 최근접 탐색이 잘 동작한다.' },
      { q: 'KNN이 "학습은 빠르고 예측은 느린" 이유는?',
        options: ['학습 때 데이터를 저장만 하고, 예측마다 모든 학습 점과의 거리를 계산해서', '예측할 때마다 이웃들로 작은 선형 모델을 경사하강으로 새로 학습해서', '학습 때 거리 행렬을 미리 만들어 두지만 예측 때 그 행렬을 다시 정렬해서', '예측 때 k를 교차검증으로 다시 골라야 해서 매번 여러 번 계산하기 때문'], answer: 0,
        explain: '선형 회귀는 학습에 비용을 쓰고 예측은 내적 한 번이다. KNN은 반대다. 그래서 대규모 검색에는 인덱스 구조(ANN)가 필요하다.' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 2.2.3, 4.7절', '『The Elements of Statistical Learning』(ESL) 2.5절 — 고차원에서의 국소 방법', 'Malkov & Yashunin, "Efficient and robust approximate nearest neighbor search using HNSW graphs" (2016)'],
  },
  {
    id:'ml-clustering', title: '군집: K-means·계층·DBSCAN', advanced: true,
    summary: R`정답 없이 비슷한 데이터끼리 묶기(비지도)
알고리즘별 <strong>군집 가정</strong>(중심·계층·밀도)이 결과 결정`,
    body: R`
<h3>K-means: 중심으로부터의 거리</h3>
<p>목표는 각 점과 소속 군집 중심 사이 거리 제곱의 합(SSE, inertia)을 최소화하는 것이다. 최적해를 정확히 찾는 것은 계산적으로 어려워서(NP-hard), 두 단계를 번갈아 반복하는 Lloyd 알고리즘을 쓴다.</p>
<ol>
<li><strong>할당</strong>: 중심을 고정하고, 각 점을 가장 가까운 중심에 배정한다. 중심이 고정이면 이것이 SSE를 최소로 하는 배정이다.</li>
<li><strong>갱신</strong>: 배정을 고정하고, 각 중심을 소속 점들의 평균으로 옮긴다. 제곱 거리 합을 최소로 하는 점이 평균이기 때문이다.</li>
</ol>
<p>두 단계 모두 SSE를 늘리지 않고, 가능한 배정의 수는 유한하므로 <strong>반드시 수렴</strong>한다. 하지만 수렴점은 <strong>지역 최적</strong>일 수 있어 초기 중심에 따라 결과가 달라진다. 그래서 서로 멀리 떨어진 점을 확률적으로 초기 중심으로 고르는 <strong>k-means++</strong>와 여러 번 실행 후 SSE가 가장 작은 결과를 고르는 방식을 쓴다(scikit-learn 기본값).</p>
<p>K-means의 숨은 가정: 군집은 중심 주변의 <strong>둥근(등방성) 모양</strong>이고 크기가 비슷하다. 초승달·고리 모양이나 밀도가 크게 다른 군집에서는 실패한다. 유클리드 거리를 쓰므로 스케일링도 필요하다.</p>
<h3>k는 어떻게 정하나</h3>
<p>$k$를 늘리면 SSE는 항상 줄어든다($k=n$이면 0). 그래서 SSE 최소화로 $k$를 고를 수 없다. <strong>엘보우 방법</strong>(SSE 감소가 급격히 둔해지는 지점)이나 <strong>실루엣 계수</strong>(자기 군집 내 평균 거리 $a$와 가장 가까운 다른 군집까지의 평균 거리 $b$를 비교, $-1$~$1$)를 참고하되, 결국 군집의 쓸모(도메인 해석)가 기준이다.</p>
<h3>계층적 군집</h3>
<p>모든 점을 각자 군집으로 시작해 가장 가까운 두 군집을 반복적으로 합친다(병합형). 결과는 합쳐지는 과정을 나타낸 트리(덴드로그램)이고, 원하는 높이에서 잘라 군집 수를 정한다. 군집 간 거리를 무엇으로 정의하는지(연결 방식)가 결과를 좌우한다: 최단 연결(single, 길쭉한 사슬 모양 군집이 생기기 쉬움), 최장 연결(complete), 평균 연결, Ward(합칠 때 SSE 증가가 최소인 쌍).</p>
<h3>DBSCAN: 밀도</h3>
<p>반경 <code>eps</code> 안에 <code>min_samples</code>개 이상의 이웃이 있는 점을 핵심점으로 보고, 핵심점끼리 이어지는 영역을 하나의 군집으로 본다. 군집 수를 미리 정할 필요가 없고 <strong>임의 모양</strong>의 군집을 찾으며, 어느 군집에도 속하지 않는 점을 <strong>노이즈(이상치)</strong>로 분류한다. 대신 밀도가 크게 다른 군집이 섞이면 하나의 <code>eps</code>로 다루기 어렵다.</p>
<h3>평가의 어려움</h3>
<p>정답이 없으므로 "좋은 군집"의 기준이 목적에 따라 다르다. 고객 세분화라면 군집별로 다른 마케팅이 가능한지가, 이상 탐지라면 노이즈로 분류된 점이 실제 이상인지가 기준이 된다.</p>`,
    analogy: R`<p>스프링캠프 훈련장에 흩어진 선수들을 훈련조로 나누기. <strong>K-means</strong>는 코치 k명을 세우고 "가장 가까운 코치에게 가라 → 코치는 조원들의 한가운데로 이동"을 반복한다. 코치를 처음에 어디 세우느냐에 따라 결과가 달라진다. <strong>DBSCAN</strong>은 "팔을 뻗어 닿는 동료가 충분히 많은 선수들끼리 어깨동무를 하고, 아무와도 닿지 않는 선수는 혼자(잡음) 남긴다"는 방식이다.</p>`,
    diagram: { caption: 'K-means 한 반복: 각 점을 가까운 중심에 할당(색)한 뒤, 중심(×)을 소속 점들의 평균으로 옮긴다(점선 화살표).', svg: R`
<svg viewBox="0 0 440 230" width="440">
<circle class="h" cx="70" cy="70" r="6"/><circle class="h" cx="95" cy="50" r="6"/><circle class="h" cx="110" cy="90" r="6"/><circle class="h" cx="60" cy="105" r="6"/><circle class="h" cx="130" cy="60" r="6"/><circle class="h" cx="90" cy="120" r="6"/><circle class="h" cx="140" cy="110" r="6"/>
<circle class="n" cx="290" cy="140" r="6"/><circle class="n" cx="320" cy="170" r="6"/><circle class="n" cx="340" cy="130" r="6"/><circle class="n" cx="300" cy="190" r="6"/><circle class="n" cx="360" cy="175" r="6"/><circle class="n" cx="270" cy="170" r="6"/><circle class="n" cx="330" cy="200" r="6"/>
<text x="170" y="150" style="font-size:20px">×</text><text x="230" y="80" style="font-size:20px">×</text>
<path class="a d" d="M165,145 L108,92"/><path class="a d" d="M236,86 L312,160"/>
<text x="100" y="78" style="font-size:22px;font-weight:700">×</text><text x="318" y="166" style="font-size:22px;font-weight:700">×</text>
<text x="185" y="166" class="sm">이전 중심</text><text x="245" y="66" class="sm">이전 중심</text>
<text x="220" y="222" class="sm">할당 → 평균으로 이동 → 반복 (SSE는 매 단계 줄어들거나 그대로)</text>
</svg>` },
    math: [
      { tex: R`J = \sum_{j=1}^{k}\sum_{\mathbf x \in C_j} \lVert \mathbf x - \boldsymbol\mu_j \rVert^2`, explain: R`K-means 목적 함수(SSE).<ul class="defs"><li>$C_j$: $j$번째 군집</li><li>$\boldsymbol\mu_j$: 그 중심</li></ul>할당 단계와 갱신 단계가 각각 $J$를 줄이거나 유지한다.` },
      { tex: R`s(i) = \frac{b(i) - a(i)}{\max\{a(i),\, b(i)\}}`, explain: R`실루엣 계수.<ul class="defs"><li>$a(i)$: 같은 군집 다른 점들과의 평균 거리</li><li>$b(i)$: 가장 가까운 다른 군집 점들과의 평균 거리</li></ul>1에 가까우면 잘 묶임, 음수면 다른 군집에 더 가까움.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(1)
X = np.vstack([rng.normal(c, 0.6, (100, 2)) for c in [(0, 0), (4, 0), (2, 3.5)]])

def kmeans(X, k, iters=50, seed=0, verbose=False):
  r = np.random.default_rng(seed)
  C = X[r.choice(len(X), k, replace=False)]                 # 무작위 초기 중심
  for it in range(iters):
      d = ((X[:, None, :] - C[None, :, :]) ** 2).sum(-1)     # (n, k) 거리²
      labels = d.argmin(1)                                    # 1) 할당
      sse = d[np.arange(len(X)), labels].sum()
      if verbose:
          print(f"  반복 {it}: SSE {sse:.2f}")
      newC = np.array([X[labels == j].mean(0) if np.any(labels == j) else C[j] for j in range(k)])  # 2) 갱신
      if np.allclose(newC, C):
          break
      C = newC
  return C, labels, sse

C, labels, sse = kmeans(X, 3, verbose=True)                   # SSE가 단조 감소하는 것을 확인
print("중심:", C.round(2).tolist())

# k를 늘리면 SSE는 계속 줄어든다 → SSE 최소화로 k를 고르면 안 된다
for k in [1, 2, 3, 4, 6, 10]:
  best = min(kmeans(X, k, seed=s)[2] for s in range(5))     # 초기값 5번 중 최선
  print(f"k={k:2d}  SSE {best:8.1f}")
`,
    links: [
      { to: 'ml-knn', why: '거리 정의와 스케일링 문제를 공유' },
      { to: 'ml-pca', why: '고차원 데이터는 차원 축소 후 군집화하거나 시각화' },
      { to: 'ai-embedding', why: '문서 임베딩을 군집화해 주제 묶기' },
      { to: 'math-vector', why: '평균(무게중심)과 유클리드 거리' },
    ],
    quiz: [
      { q: 'K-means가 항상 수렴하지만 전역 최적을 보장하지 않는 이유는?',
        options: ['반복 횟수에 상한이 있어 최적에 도달하기 전에 멈추기 때문', '단계마다 SSE가 줄어 멈추지만 그곳이 초기값에 따른 지역 최적일 수 있어서', '거리 계산의 반올림 오차가 누적되어 중심이 조금씩 어긋나기 때문', '군집 수 k가 크면 SSE가 볼록 함수가 아니게 되어 수렴하지 않기 때문'], answer: 1,
        explain: '좌표 하강처럼 한 번에 한쪽(배정 또는 중심)만 최적화한다. 그래서 k-means++ 초기화와 여러 번 실행이 필요하다.' },
      { q: '초승달 두 개가 맞물린 모양의 데이터에 적합한 군집 방법은?',
        options: ['K-means (k=2) — 두 달의 중심이 떨어져 있으므로', 'DBSCAN처럼 밀도로 연결된 영역을 군집으로 보는 방법', 'K-means (k=2)에 표준화를 먼저 적용한 방법', 'PCA로 1차원으로 줄인 뒤 중앙값으로 나누는 방법'], answer: 1,
        explain: 'K-means는 중심으로부터의 거리로 나누므로 볼록한 둥근 군집을 가정한다. 밀도 기반 방법은 임의 모양의 연결된 영역을 찾는다.' },
      { q: '"SSE가 가장 작은 k를 고른다"가 잘못된 기준인 이유는?',
        options: ['SSE는 군집 간 거리를 재는 지표라 작을수록 군집이 겹쳐 있다는 뜻이라서', 'k가 커질수록 SSE는 항상 줄어 k = n에서 0이 되기 때문', 'SSE는 초기 중심에 따라 달라져 같은 k에서도 비교할 수 없기 때문', 'SSE가 작으면 군집 크기가 불균형해져 해석이 불가능하기 때문'], answer: 1,
        explain: '모델 복잡도가 늘면 훈련 손실이 항상 줄어드는 것과 같은 현상이다. 엘보우, 실루엣, 도메인 해석으로 정한다.' },
    ],
    resources: ['『An Introduction to Statistical Learning』(ISLP) 12.4절 — 군집 분석', 'scikit-learn 사용자 가이드 — Clustering (알고리즘별 비교 그림)', 'Arthur & Vassilvitskii, "k-means++: The Advantages of Careful Seeding" (2007)'],
  },
  {
    id:'ml-pca', title: '주성분 분석 (PCA)', advanced: true,
    summary: R`<strong>분산이 가장 큰 방향</strong>으로 좌표축 변경
방향 = 공분산 행렬의 고유벡터, 계산은 SVD`,
    body: R`
<h3>무엇을 찾는가</h3>
<p>상관이 큰 특성들(키와 몸무게처럼)은 정보가 겹친다. PCA는 데이터를 새로운 직교 좌표축으로 회전시켜, 첫 번째 축(PC1)이 데이터의 분산을 가장 많이 담고, 두 번째 축은 PC1과 직교하는 방향 중 분산이 가장 큰 방향… 이 되도록 한다. 앞의 몇 개 축만 남기면 정보 손실을 최소로 하면서 차원을 줄일 수 있다.</p>
<h3>두 가지 같은 관점</h3>
<ul>
<li><strong>분산 최대화</strong>: 단위벡터 $\mathbf v$ 방향으로 투영한 값의 분산 $\mathbf v^\top\Sigma\mathbf v$를 최대화한다($\Sigma$: 공분산 행렬). 이 최적화의 해가 $\Sigma$의 <strong>가장 큰 고유값에 대응하는 고유벡터</strong>이고, 그때의 분산이 고유값 자체다.</li>
<li><strong>재구성 오차 최소화</strong>: $k$차원 부분공간에 투영했다가 되돌렸을 때의 오차 제곱합을 최소화하는 부분공간이 상위 $k$개 주성분이 만드는 공간이다. 전체 분산 = 남긴 분산 + 버린 분산(재구성 오차)이므로 두 관점은 같은 답을 준다.</li>
</ul>
<h3>계산: SVD</h3>
<p>중심화된 데이터 행렬을 $X_c = U\Sigma V^\top$로 특이값 분해하면 $V$의 열이 주성분 방향이고, 각 주성분의 분산은 $\sigma_i^2/(n-1)$이다. 공분산 행렬을 명시적으로 만들지 않아 수치적으로 더 안정적이다. scikit-learn의 PCA도 SVD를 쓴다.</p>
<h3>꼭 알아야 할 주의점</h3>
<ul>
<li><strong>중심화는 필수</strong>: 평균을 빼지 않으면 첫 주성분이 "원점에서 데이터 평균 쪽 방향"을 가리켜, 분산이 아니라 평균 위치를 설명하게 된다.</li>
<li><strong>표준화 여부가 결과를 바꾼다</strong>: 분산은 단위에 의존한다. 원 단위 연봉과 cm 단위 키를 그대로 쓰면 PC1은 거의 연봉 축이 된다. 단위가 다른 특성은 표준화(= 상관 행렬의 PCA)한다.</li>
<li><strong>비지도 방법이다</strong>: 라벨을 보지 않으므로, 분산은 작지만 분류에 결정적인 방향을 버릴 수 있다.</li>
<li><strong>선형 방법이다</strong>: 휘어진 구조(스위스 롤 등)는 펴지 못한다. 시각화용 비선형 방법인 t-SNE·UMAP은 국소 이웃 관계를 보존하는 데 초점을 둬서, 그림에서 군집 사이 거리나 군집 크기를 그대로 해석하면 안 된다.</li>
</ul>
<h3>쓰임</h3>
<p>고차원 데이터 시각화, 노이즈 제거(작은 분산 성분 = 잡음이라는 가정), 다중공선성 제거, 이후 모델의 학습 속도 향상, 차원의 저주 완화. 남길 개수는 누적 설명 분산 비율(예: 95%)이나 다운스트림 성능으로 정한다.</p>`,
    analogy: R`<p>3차원 물체의 그림자를 벽에 비춰 2차원 사진을 찍는 상황. 손전등 방향에 따라 그림자가 물체의 특징을 잘 보여 주기도(넓게 퍼진 그림자) 하고, 점 하나로 뭉개지기도 한다. PCA는 <strong>그림자가 가장 넓게 퍼지는 방향</strong>을 찾아 정보 손실이 가장 적은 사진을 찍는 방법이다.</p>`,
    diagram: { caption: '퍼진 방향이 가장 긴 축이 PC1(분산 최대), 그에 직교하는 축이 PC2. PC1 하나로 투영해도 대부분의 정보가 남는다.', svg: R`
<svg viewBox="0 0 440 240" width="440">
<ellipse class="g" cx="220" cy="120" rx="165" ry="48" transform="rotate(-30 220 120)"/>
<circle class="n" cx="100" cy="180" r="4"/><circle class="n" cx="130" cy="165" r="4"/><circle class="n" cx="150" cy="150" r="4"/><circle class="n" cx="170" cy="150" r="4"/><circle class="n" cx="190" cy="130" r="4"/><circle class="n" cx="210" cy="128" r="4"/><circle class="n" cx="230" cy="110" r="4"/><circle class="n" cx="250" cy="108" r="4"/><circle class="n" cx="270" cy="95" r="4"/><circle class="n" cx="290" cy="90" r="4"/><circle class="n" cx="320" cy="72" r="4"/><circle class="n" cx="160" cy="130" r="4"/><circle class="n" cx="240" cy="130" r="4"/><circle class="n" cx="200" cy="105" r="4"/><circle class="n" cx="280" cy="115" r="4"/><circle class="n" cx="140" cy="172" r="4"/><circle class="n" cx="305" cy="68" r="4"/><circle class="n" cx="180" cy="145" r="4"/><circle class="n" cx="345" cy="62" r="4"/><circle class="n" cx="120" cy="150" r="4"/>
<path class="ha" d="M220,120 L350,45"/><path class="ha" d="M220,120 L246,165"/>
<text x="372" y="38">PC1</text><text x="262" y="180">PC2</text>
<text x="220" y="225" class="sm">PC1 방향 분산 ≫ PC2 방향 분산</text>
</svg>` },
    math: [
      { tex: R`\max_{\lVert\mathbf v\rVert = 1} \mathbf v^\top \Sigma\, \mathbf v \;\Rightarrow\; \Sigma\mathbf v = \lambda\mathbf v`, explain: R`$\Sigma = \frac{1}{n-1}X_c^\top X_c$: 공분산 행렬. 라그랑주 승수법으로 풀면 고유값 문제가 되고, 최대 분산은 가장 큰 고유값 $\lambda_1$이다.` },
      { tex: R`X_c = U\Sigma_s V^\top, \qquad \lambda_i = \frac{\sigma_i^2}{n-1}, \qquad \text{설명 분산 비율}_i = \frac{\lambda_i}{\sum_j \lambda_j}`, explain: R`<ul class="defs"><li>$X_c$: 중심화된 데이터</li><li>$\Sigma_s$의 대각 원소 $\sigma_i$: 특이값</li><li>$V$의 열: 주성분 방향</li></ul>$X_c V_k$가 $k$차원으로 줄인 좌표다.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

# 2개의 잠재 요인으로 만든 5차원 데이터 + 약간의 잡음
Z = rng.normal(size=(500, 2)) * [3, 1]
X = Z @ rng.normal(size=(2, 5)) + rng.normal(0, 0.1, (500, 5))

Xc = X - X.mean(0)                                    # 1) 중심화 (필수)
cov = Xc.T @ Xc / (len(X) - 1)
eigval, eigvec = np.linalg.eigh(cov)                   # 대칭 행렬 → eigh (오름차순 반환)
order = eigval.argsort()[::-1]
eigval, eigvec = eigval[order], eigvec[:, order]
print("설명 분산 비율:", (eigval / eigval.sum()).round(4))   # 앞의 2개가 거의 전부

U, S, Vt = np.linalg.svd(Xc, full_matrices=False)      # 2) SVD로 계산
print("SVD 분산 = 고유값?", np.allclose(S**2 / (len(X) - 1), eigval))
print("방향 일치(부호 무시)?", np.allclose(np.abs(Vt[:2]), np.abs(eigvec[:, :2].T)))

X2 = Xc @ Vt[:2].T                                     # 2차원으로 투영
X_rec = X2 @ Vt[:2] + X.mean(0)                        # 다시 5차원으로 복원
print("복원 MSE:", np.mean((X - X_rec) ** 2).round(5), "/ 원 데이터 분산:", X.var(0).mean().round(3))
`,
    links: [
      { to: 'math-eigen', why: '주성분 = 공분산 행렬의 고유벡터' },
      { to: 'math-svd', why: 'PCA의 실제 계산 방법' },
      { to: 'ml-knn', why: '차원의 저주 완화' },
      { to: 'ml-feature', why: '차원 축소를 통한 특성 생성과 다중공선성 제거' },
      { to: 'ai-embedding', why: '고차원 임베딩을 2차원으로 시각화할 때' },
    ],
    quiz: [
      { q: 'PCA 전에 중심화(평균 빼기)를 하지 않으면?',
        options: ['결과가 똑같다 — 주성분은 평균과 무관하게 정해지므로', '첫 주성분이 퍼진 방향이 아니라 원점에서 평균 쪽 방향이 되기 쉽다', '모든 주성분의 순서가 거꾸로 뒤집혀 마지막 성분이 가장 중요해진다', '고유값이 음수가 되어 설명된 분산 비율을 계산할 수 없게 된다'], answer: 1,
        explain: '중심화하지 않은 Xᵀ X는 공분산이 아니라 원점 기준 2차 모멘트다. 평균이 원점에서 멀면 그 방향이 가장 큰 "분산"처럼 보인다.' },
      { q: '키(m)와 연봉(원)이 섞인 데이터에서 표준화 없이 PCA를 하면?',
        options: ['두 특성이 같은 비율로 공평하게 섞여 반영된다', '연봉 분산이 압도적이라 PC1이 거의 연봉 축이 된다', '키의 값이 작아 PC1이 거의 키 축이 된다', '단위가 다르면 공분산 행렬이 대칭이 아니게 된다'], answer: 1,
        explain: '분산은 단위에 의존한다. 단위가 다른 특성은 표준화해서(상관 행렬 기준) PCA를 한다.' },
      { q: 'PCA로 차원을 줄인 뒤 분류 성능이 오히려 크게 떨어질 수 있는 이유는?',
        options: ['PCA는 데이터에 잡음을 더해 원래보다 분산을 늘리기 때문', '라벨을 보지 않아 분산은 작아도 구분에 결정적인 방향을 버릴 수 있어서', 'PCA는 비선형 변환이라 선형 분류기와 함께 쓰면 경계가 왜곡되기 때문', '주성분끼리 상관이 생겨 분류기가 다중공선성 문제를 겪기 때문'], answer: 1,
        explain: '"분산이 크다"와 "분류에 유용하다"는 다른 기준이다. 라벨을 쓰는 차원 축소(LDA 등)나 다운스트림 성능으로 검증해야 한다.' },
    ],
    resources: ['Gilbert Strang, 『Linear Algebra and Learning from Data』 — SVD와 PCA', '『An Introduction to Statistical Learning』(ISLP) 12.2절', 'Jonathon Shlens, "A Tutorial on Principal Component Analysis" (arXiv:1404.1100)'],
  },
  {
    id:'ml-metrics', title: '평가 지표', advanced: true,
    summary: R`지표 = "어떤 실수가 얼마나 비싼가"에 대한 답
불균형 데이터에선 정확도가 무의미
<strong>정밀도·재현율·ROC-AUC</strong>는 서로 다른 질문`,
    body: R`
<h3>혼동 행렬에서 시작</h3>
<p>이진 분류의 모든 결과는 TP(양성을 양성으로), FP(음성을 양성으로 — 거짓 경보), FN(양성을 음성으로 — 놓침), TN 네 칸으로 나뉜다. 모든 분류 지표는 이 네 수의 조합이다.</p>
<h3>정확도의 함정</h3>
<p>사기 거래가 1%인 데이터에서 "모두 정상"이라고 답하는 모델의 정확도는 99%다. 하지만 사기를 하나도 잡지 못한다. 클래스가 불균형하면 정확도는 다수 클래스의 비율에 끌려간다.</p>
<h3>정밀도와 재현율: 서로 다른 질문</h3>
<ul>
<li><strong>정밀도</strong> $\frac{TP}{TP+FP}$: "양성이라고 한 것 중 진짜 양성 비율" — 경보를 믿을 수 있는가? 스팸 필터처럼 <strong>FP가 비쌀 때</strong>(중요한 메일이 스팸함으로) 중요하다.</li>
<li><strong>재현율</strong> $\frac{TP}{TP+FN}$: "진짜 양성 중 잡아낸 비율" — 놓치지 않는가? 암 검진, 사기 탐지처럼 <strong>FN이 비쌀 때</strong> 중요하다.</li>
</ul>
<p>둘은 보통 <strong>임계값</strong>으로 교환된다. 임계값을 낮추면 더 많이 양성으로 판정해 재현율은 오르고 정밀도는 내려간다. 모델의 점수(확률) 자체는 그대로이고 결정 규칙만 바뀌는 것이다. <strong>F1</strong>은 정밀도와 재현율의 조화 평균으로, 둘 중 하나가 낮으면 크게 낮아진다(산술 평균과 달리 한쪽만 높여서는 점수를 얻기 어렵다).</p>
<h3>ROC-AUC: 임계값과 무관한 순위 능력</h3>
<p>ROC 곡선은 임계값을 바꿔 가며 (FPR, TPR=재현율)을 그린 것이다. 그 아래 면적 AUC는 <strong>무작위로 뽑은 양성의 점수가 무작위로 뽑은 음성의 점수보다 높을 확률</strong>과 같다. 0.5는 무작위 수준, 1은 완벽한 순위다. 임계값을 정하기 전에 모델 자체의 "구분 능력"을 비교할 때 유용하다.</p>
<p>단, 양성이 매우 드물면 FPR의 분모(음성 수)가 커서 FP가 많이 늘어도 ROC가 별로 나빠 보이지 않는다. 이럴 때는 정밀도-재현율 곡선과 그 면적(PR-AUC, Average Precision)이 실제 운영 상황을 더 잘 반영한다.</p>
<h3>회귀 지표</h3>
<ul>
<li><strong>MAE</strong>: 오차 절댓값의 평균. 단위가 원래와 같고 이상치에 덜 민감하다.</li>
<li><strong>MSE / RMSE</strong>: 오차를 제곱하므로 큰 오차를 강하게 벌한다. RMSE는 단위를 원래대로 되돌린 것.</li>
<li><strong>$R^2$</strong>: "평균으로만 예측하는 기준 모델"에 비해 오차 제곱합을 얼마나 줄였는가. 테스트 데이터에서는 음수도 가능하다(평균보다 못한 모델).</li>
</ul>
<h3>지표 선택은 비즈니스 결정이다</h3>
<p>FN 하나가 FP 하나보다 몇 배 비싼지 정할 수 있다면, 기대 비용을 최소화하는 임계값을 직접 고를 수 있다. 또 확률을 그대로 의사결정에 쓴다면(예: 기대 손실 계산) 예측 확률이 실제 빈도와 맞는지(보정, calibration)도 확인해야 한다.</p>`,
    analogy: R`<p>공항 보안 검색대. <strong>재현율</strong>은 "위험물 중 몇 %를 찾아냈나", <strong>정밀도</strong>는 "경보가 울린 가방 중 진짜 위험물이 든 비율". 탐지기를 민감하게 설정하면(임계값↓) 위험물을 거의 놓치지 않지만 경보가 너무 자주 울려 정밀도가 떨어진다. 공항은 재현율을, 스팸 필터는 정밀도를 더 중시한다.</p>`,
    diagram: { caption: '혼동 행렬. 정밀도는 "예측 양성" 열 안에서, 재현율은 "실제 양성" 행 안에서 계산한다.', svg: R`
<svg viewBox="0 0 480 240" width="480">
<text x="245" y="16" class="sm">예측</text>
<text x="190" y="40">양성</text><text x="300" y="40">음성</text>
<text x="60" y="88">실제 양성</text><text x="60" y="158">실제 음성</text>
<rect class="h" x="135" y="55" width="110" height="65"/><text x="190" y="80">TP</text><text x="190" y="100" class="sm">맞게 잡음</text>
<rect class="n" x="245" y="55" width="110" height="65"/><text x="300" y="80">FN</text><text x="300" y="100" class="sm">놓침</text>
<rect class="n" x="135" y="120" width="110" height="65"/><text x="190" y="145">FP</text><text x="190" y="165" class="sm">거짓 경보</text>
<rect class="g" x="245" y="120" width="110" height="65"/><text x="300" y="145">TN</text><text x="300" y="165" class="sm">맞게 통과</text>
<path class="e d" d="M130,50 H360 V125 H130 Z" style="stroke:var(--sc)"/>
<path class="e d" d="M140,48 H240 V192 H140 Z"/>
<text x="415" y="88" class="sm">재현율 = TP/(TP+FN)</text>
<text x="190" y="210" class="sm">정밀도 = TP/(TP+FP)</text>
</svg>` },
    math: [
      { tex: R`\text{Precision} = \frac{TP}{TP+FP},\quad \text{Recall} = \frac{TP}{TP+FN},\quad F_1 = \frac{2\cdot P\cdot R}{P + R}`, explain: R`$F_1$은 조화 평균이라 $P=1, R=0.01$이면 약 0.02다(산술 평균이면 0.505).` },
      { tex: R`\text{AUC} = P\big(s(X^{+}) > s(X^{-})\big)`, explain: R`<ul class="defs"><li>$s$: 모델 점수</li><li>$X^+$·$X^-$: 무작위로 뽑은 양성·음성 샘플</li></ul>임계값과 무관하게 "양성을 음성보다 위에 줄 세우는 능력"이다.` },
      { tex: R`R^2 = 1 - \frac{\sum_i (y_i - \hat y_i)^2}{\sum_i (y_i - \bar y)^2}`, explain: R`분모: 평균 $\bar y$로만 예측했을 때의 오차 제곱합. 분자: 모델의 오차 제곱합.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

n = 5000                                              # 불균형 데이터: 양성(사기) 약 2%
y = (rng.random(n) < 0.02).astype(int)
score = np.where(y == 1, rng.normal(1.5, 1, n), rng.normal(0, 1, n))   # 모델 점수

def metrics(y, pred):
  tp = np.sum((pred == 1) & (y == 1)); fp = np.sum((pred == 1) & (y == 0))
  fn = np.sum((pred == 0) & (y == 1)); tn = np.sum((pred == 0) & (y == 0))
  acc = (tp + tn) / len(y)
  prec = tp / (tp + fp) if tp + fp else 0.0
  rec = tp / (tp + fn)
  f1 = 2 * prec * rec / (prec + rec) if prec + rec else 0.0
  return acc, prec, rec, f1

print("항상 '정상'      : acc=%.3f prec=%.3f rec=%.3f f1=%.3f" % metrics(y, np.zeros(n, int)))
for th in [0.5, 1.5, 2.5]:                            # 임계값을 올리면 정밀도↑ 재현율↓
  print(f"임계값 {th}      : acc=%.3f prec=%.3f rec=%.3f f1=%.3f" % metrics(y, (score >= th).astype(int)))

# AUC = 무작위 양성 점수 > 무작위 음성 점수일 확률
pos, neg = score[y == 1], score[y == 0]
auc_pairs = np.mean(pos[:, None] > neg[None, :])
# ROC 곡선(임계값을 훑으며 TPR, FPR) 아래 면적으로 계산해도 같다
ths = np.r_[np.inf, np.sort(score)[::-1]]
tpr = np.array([(pos >= t).mean() for t in ths])
fpr = np.array([(neg >= t).mean() for t in ths])
auc_roc = np.sum(np.diff(fpr) * (tpr[1:] + tpr[:-1]) / 2)   # 사다리꼴 적분
print(f"AUC(쌍 비교) {auc_pairs:.4f}  =  AUC(ROC 면적) {auc_roc:.4f}")
`,
    links: [
      { to: 'ml-logistic', why: '확률 출력과 임계값' },
      { to: 'math-test', why: 'FP·FN = 통계적 가설 검정의 1종·2종 오류' },
      { to: 'ml-cv', why: '교차검증에서 어떤 지표로 채점할지' },
      { to: 'math-prob', why: '조건부 확률로 보는 정밀도(P(실제+|예측+))와 재현율(P(예측+|실제+))' },
    ],
    quiz: [
      { q: '사기 거래 비율이 1%인 데이터에서 정확도 99%인 모델에 대해 옳은 판단은?',
        options: ['99%면 오류가 1%뿐이므로 매우 우수한 모델이다', '"모두 정상"이라고만 해도 99%라, 사기를 잡는 능력은 알 수 없다', '1%의 오류는 모두 사기 거래를 놓친 경우이므로 재현율이 0이다', '정확도 99%면 정밀도와 재현율도 99% 근처라고 볼 수 있다'], answer: 1,
        explain: '불균형 데이터에서는 재현율, 정밀도, PR-AUC 등으로 소수 클래스에 대한 성능을 봐야 한다. 오류 1%가 전부 놓친 사기인지는 정확도만으로 알 수 없다.' },
      { q: '암 1차 선별 검사 모델에서 재현율을 정밀도보다 우선하는 이유는?',
        options: ['재현율이 높으면 정밀도도 따라서 함께 높아지기 때문', '환자를 놓치는 비용(FN)이 정밀 검사 비용(FP)보다 커서', '재현율은 양성 비율과 무관해 다른 병원과 비교하기 좋아서', '정밀도는 검사 결과가 확률일 때만 계산할 수 있어서'], answer: 1,
        explain: '지표 선택은 오류 비용의 비대칭성에서 나온다. 1차 선별은 놓치지 않는 것이 중요하고, 확정은 정밀 검사가 한다.' },
      { q: 'ROC-AUC가 0.5라는 것의 의미는?',
        options: ['정확도가 50%라는 뜻이다', '양성이 음성보다 높은 점수를 받을 확률이 50%다', '임계값 0.5에서 재현율이 50%라는 뜻이다', '양성과 음성의 비율이 50:50이라는 뜻이다'], answer: 1,
        explain: 'AUC는 순위 능력이다. 0.5는 동전 던지기와 같고, 0.5보다 작으면 순위가 거꾸로 되어 있다는 뜻이다.' },
    ],
    resources: ['scikit-learn 사용자 가이드 — Metrics and scoring', 'Saito & Rehmsmeier, "The Precision-Recall Plot Is More Informative than the ROC Plot When Evaluating Binary Classifiers on Imbalanced Datasets" (2015)', 'Google Machine Learning Crash Course — Classification'],
  },
  {
    id:'ml-feature', title: '피처 엔지니어링',
    summary: R`학습하기 쉬운 형태로 입력 변환
<strong>표현이 모델 가정과 맞으면</strong> 성능 크게 향상
모든 변환은 학습 데이터로만 fit`,
    body: R`
<p>모델은 입력 숫자 사이의 관계만 본다. "지역 코드 3"이 "지역 코드 1"보다 3배 크다고 생각할지, 소득 1억과 2억의 차이를 100만과 200만의 차이와 같게 볼지는 표현에 달려 있다. 피처 엔지니어링은 <strong>데이터에 대한 도메인 지식을 모델이 이해할 수 있는 형태로 옮기는 일</strong>이다.</p>
<h3>수치형 특성</h3>
<ul>
<li><strong>스케일링</strong>: 거리(KNN, SVM, K-means), 경사하강(선형 모델, 신경망), 정규화 벌점을 쓰는 모델에는 필요하고, 트리 기반 모델에는 필요 없다(값의 순서만 쓰므로).</li>
<li><strong>로그 변환</strong>: 소득·가격·조회수처럼 오른쪽으로 길게 치우친 분포는 로그를 취하면 대칭에 가까워진다. "1% 증가"처럼 비율이 의미 있는 변수라면 로그 공간에서의 선형 관계가 더 자연스럽다. 0이 있으면 $\log(1+x)$를 쓴다.</li>
<li><strong>구간화(binning)</strong>: 연속값을 구간으로 나눠 비선형 효과를 선형 모델에 넣을 수 있지만 정보 손실이 있다.</li>
</ul>
<h3>범주형 특성</h3>
<ul>
<li><strong>원-핫 인코딩</strong>: 범주마다 0/1 열을 만든다. 범주 사이에 크기나 순서가 없다는 사실을 정확히 표현한다. 범주가 수천 개면 열이 폭증한다.</li>
<li><strong>정수(라벨) 인코딩</strong>: 범주를 1, 2, 3으로 바꾸면 선형 모델은 "2는 1과 3의 중간"이라는 존재하지 않는 순서를 학습한다. 실제 순서가 있는 범주(학점, 등급)나 트리 모델에서만 무난하다.</li>
<li><strong>타깃 인코딩</strong>: 범주를 "그 범주의 타깃 평균"으로 바꾼다. 카디널리티가 높을 때 유용하지만 타깃 정보를 직접 쓰므로 <strong>누수 위험</strong>이 크다. 반드시 out-of-fold로 계산하고, 샘플이 적은 범주는 전체 평균 쪽으로 당겨(스무딩) 과적합을 막는다.</li>
</ul>
<h3>결측치</h3>
<p>평균·중앙값 대체가 기본이지만, <strong>결측 자체가 정보</strong>인 경우가 많다("소득 미기재"는 무작위가 아닐 수 있다). 대체값과 함께 "결측 여부" 지시 변수를 추가하면 모델이 이 패턴을 학습할 수 있다.</p>
<h3>도메인 기반 특성</h3>
<p>날짜에서 요일·월·공휴일 여부, 주기적 변수(시간, 월)는 $\sin, \cos$로 바꿔 23시와 0시가 가깝다는 사실을 표현한다. 비율(부채/소득), 차이, 상호작용($x_1 \times x_2$), 집계(사용자별 최근 7일 평균) 등은 모델이 스스로 찾기 어려운 관계를 직접 알려 준다. 결정 트리가 대각선 경계에 약할 때 $x_1 + x_2$ 특성 하나가 문제를 해결하기도 한다.</p>
<h3>특성 선택</h3>
<p>필터(상관, 상호정보량 등 통계량으로 선택), 래퍼(모델 성능으로 부분집합 탐색), 임베디드(L1 정규화, 트리 중요도처럼 학습 중에 선택). 어떤 방식이든 선택 자체를 교차검증 안에서 해야 누수가 없다.</p>
<h3>파이프라인으로 누수를 막는다</h3>
<p>대체값(중앙값), 스케일러의 평균·표준편차, 인코더가 아는 범주 목록은 모두 <strong>학습 데이터로부터 "학습"한 파라미터</strong>다. scikit-learn의 <code>Pipeline</code>과 <code>ColumnTransformer</code>로 전처리와 모델을 하나로 묶으면 fit은 학습 데이터에만, transform은 같은 파라미터로 테스트 데이터에 적용되는 것이 보장된다.</p>
<h3>딥러닝과의 관계</h3>
<p>이미지·텍스트처럼 비정형 데이터에서는 신경망이 원시 입력에서 유용한 표현을 스스로 학습한다(표현 학습). 임베딩은 범주형 변수(단어, 사용자 ID)를 학습 가능한 밀집 벡터로 바꾸는 방법으로, 원-핫의 한계를 넘는다. 정형 데이터에서는 여전히 사람의 피처 엔지니어링이 성능을 크게 좌우한다.</p>`,
    analogy: R`<p>외국인 친구에게 길 안내하기. 같은 정보라도 "편의점에서 세 블록, 큰 교회에서 우회전"처럼 <strong>상대가 이해하는 기준</strong>으로 바꿔 주면 훨씬 잘 찾아온다. 모델에게 "지역 = 3"이라고 말하면 숫자 3으로만 이해한다. "강남이다/아니다"라고 따로 알려 줘야(원-핫) 의도를 전달할 수 있다.</p>`,
    diagram: { caption: '전처리 파라미터(중앙값, 평균·표준편차, 범주 목록)는 학습 데이터로만 fit하고, 같은 값으로 테스트 데이터를 변환한다.', svg: R`
<svg viewBox="0 0 540 210" width="540">
<rect class="n" x="10" y="85" width="80" height="40" rx="6"/><text x="50" y="105">원본 데이터</text>
<rect class="n" x="120" y="35" width="70" height="34" rx="6"/><text x="155" y="52">학습</text>
<rect class="n" x="120" y="140" width="70" height="34" rx="6"/><text x="155" y="157">테스트</text>
<path class="a" d="M90,98 L118,56"/><path class="a" d="M90,112 L118,152"/>
<rect class="h" x="220" y="25" width="92" height="54" rx="6"/><text x="266" y="42" class="sm">결측 대체</text><text x="266" y="58" class="sm">+ 결측 표시</text>
<rect class="h" x="330" y="25" width="92" height="54" rx="6"/><text x="376" y="42" class="sm">원-핫 / 로그</text><text x="376" y="58" class="sm">+ 표준화</text>
<rect class="h" x="440" y="25" width="90" height="54" rx="6"/><text x="485" y="52">모델 fit</text>
<path class="a" d="M190,52 H218"/><path class="a" d="M312,52 H328"/><path class="a" d="M422,52 H438"/>
<rect class="n" x="220" y="130" width="202" height="54" rx="6"/><text x="321" y="150" class="sm">같은 파라미터로 transform만</text><text x="321" y="166" class="sm">(테스트 통계는 절대 사용 안 함)</text>
<rect class="n" x="440" y="130" width="90" height="54" rx="6"/><text x="485" y="157">예측·평가</text>
<path class="a" d="M190,157 H218"/><path class="a" d="M422,157 H438"/>
<path class="ha d" d="M321,79 V128"/><text x="360" y="104" class="st sm">학습된 값 전달</text>
</svg>` },
    math: [
      { tex: R`z = \frac{x - \mu_{\text{train}}}{\sigma_{\text{train}}}`, explain: R`표준화. $\mu, \sigma$는 학습 데이터에서만 계산한 값이며 테스트 데이터에도 같은 값을 쓴다.` },
      { tex: R`\text{enc}(c) = \frac{n_c\,\bar y_c + m\,\bar y}{n_c + m}`, explain: R`스무딩한 타깃 인코딩.<ul class="defs"><li>$n_c$: 범주 $c$의 샘플 수</li><li>$\bar y_c$: 범주 평균</li><li>$\bar y$: 전체 평균</li><li>$m$: 스무딩 강도</li></ul>샘플이 적은 범주일수록 전체 평균에 가깝게 당긴다.` },
    ],
    code: R`
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import FunctionTransformer, OneHotEncoder, OrdinalEncoder, StandardScaler

rng = np.random.default_rng(0)
n = 1000
df = pd.DataFrame({
  "area": rng.uniform(20, 120, n),
  "region": rng.choice(["강남", "강북", "판교"], n),
  "income": rng.lognormal(mean=8, sigma=1, size=n),       # 오른쪽으로 치우친 분포
})
effect = df["region"].map({"강남": 3.0, "강북": 1.0, "판교": 2.0})   # 순서가 없는 범주 효과
y = 0.05 * df["area"] + effect + 0.5 * np.log(df["income"]) + rng.normal(0, 0.3, n)
df.loc[rng.random(n) < 0.1, "area"] = np.nan               # 결측 10%

X_tr, X_te, y_tr, y_te = train_test_split(df, y, random_state=0)

def evaluate(name, preprocess):
  model = make_pipeline(preprocess, LinearRegression()).fit(X_tr, y_tr)   # fit은 학습 데이터로만
  print(f"{name}: 테스트 R² = {model.score(X_te, y_te):.3f}")

evaluate("나쁜 표현(정수 인코딩, 원 단위 소득)", ColumnTransformer([
  ("area", SimpleImputer(strategy="median"), ["area"]),
  ("region", OrdinalEncoder(), ["region"]),               # 강남=0, 강북=1, 판교=2 → 가짜 순서
  ("income", "passthrough", ["income"]),
]))
evaluate("좋은 표현(원-핫, log 소득, 결측 표시)", ColumnTransformer([
  ("area", make_pipeline(SimpleImputer(strategy="median", add_indicator=True), StandardScaler()), ["area"]),
  ("region", OneHotEncoder(handle_unknown="ignore"), ["region"]),
  ("income", make_pipeline(FunctionTransformer(np.log), StandardScaler()), ["income"]),
]))
`,
    links: [
      { to: 'ml-cv', why: '전처리·특성 선택·타깃 인코딩의 누수 방지' },
      { to: 'ml-knn', why: '스케일링이 필수인 모델' },
      { to: 'ml-tree', why: '스케일링이 필요 없는 모델, 그러나 대각선 경계에는 특성 조합이 도움' },
      { to: 'ml-regularization', why: 'L1을 이용한 임베디드 방식 특성 선택' },
      { to: 'ai-embedding', why: '범주형·텍스트를 학습된 밀집 벡터로 표현' },
      { to: 'sec-deid', why: '개인정보 특성을 다룰 때의 가명·익명 처리' },
    ],
    quiz: [
      { q: '지역(강남, 강북, 판교)을 0, 1, 2로 인코딩해 선형 회귀에 넣으면 생기는 문제는?',
        options: ['문제없다 — 숫자로 바꿨으므로 계수 하나로 지역 효과를 나타낼 수 있다', '"강북은 강남과 판교의 중간"이라는 없는 순서와 등간격을 가정하게 된다', '선형 회귀는 정수 특성을 실수로 바꾸지 못해 학습 중 오류가 난다', '값이 0인 강남은 계수가 곱해지지 않아 예측에서 완전히 빠진다'], answer: 1,
        explain: '실제 효과가 3, 1, 2처럼 단조롭지 않으면 하나의 계수로 표현할 수 없다. 원-핫 인코딩은 범주마다 별도의 계수를 준다. 트리 모델은 분할을 여러 번 해서 어느 정도 대응할 수 있다.' },
      { q: '타깃 인코딩을 전체 학습 데이터로 계산해 같은 데이터로 모델을 학습하면 위험한 이유는?',
        options: ['범주별 평균을 매번 다시 계산해야 해서 학습이 크게 느려지기 때문', '인코딩 값에 자기 타깃이 포함되어, 적은 범주에서 정답을 엿보는 누수가 생겨서', '타깃 인코딩은 범주 수를 줄여 서로 다른 범주가 같은 값이 되기 때문', '타깃 값의 스케일이 특성과 달라 정규화를 따로 해야 하기 때문'], answer: 1,
        explain: '범주에 샘플이 하나뿐이면 인코딩 값이 곧 정답이다. out-of-fold 계산과 스무딩으로 막는다.' },
      { q: '소득처럼 오른쪽으로 길게 치우친 변수에 로그 변환을 하는 주된 이유는?',
        options: ['값을 음수로 바꿔 평균이 0 근처가 되게 하기 위해', '극단값 영향을 줄이고, 배수 변화의 관계를 선형으로 표현하기 쉽게 하려고', '트리 모델이 더 좋은 분할점을 찾도록 순서를 바꿔 주기 위해', '분포를 균등 분포로 바꿔 모든 구간에 같은 수의 샘플이 오게 하려고'], answer: 1,
        explain: '로그 공간에서는 100만→200만과 1억→2억이 같은 거리다. 트리 모델은 단조 변환에 영향을 받지 않으므로 효과가 거의 없다.' },
    ],
    resources: ['Alice Zheng & Amanda Casari, 『피처 엔지니어링 기술(Feature Engineering for Machine Learning)』', 'scikit-learn 사용자 가이드 — Preprocessing data, ColumnTransformer', 'Kaggle Learn — Feature Engineering (무료 강좌)'],
  },
];
