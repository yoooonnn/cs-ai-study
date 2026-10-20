
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
