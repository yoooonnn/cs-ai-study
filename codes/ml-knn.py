
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
