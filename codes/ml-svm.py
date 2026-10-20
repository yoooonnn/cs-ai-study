
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
