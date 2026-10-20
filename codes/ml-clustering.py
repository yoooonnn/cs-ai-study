
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
