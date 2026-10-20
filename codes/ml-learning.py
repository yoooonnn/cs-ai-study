
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
