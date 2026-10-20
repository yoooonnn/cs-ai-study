
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
