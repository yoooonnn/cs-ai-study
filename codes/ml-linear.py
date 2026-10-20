
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
