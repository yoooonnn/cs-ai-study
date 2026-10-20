
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
