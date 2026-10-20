
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
