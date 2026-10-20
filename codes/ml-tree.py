
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
