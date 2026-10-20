
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
X = rng.normal(size=(100, 5000))     # 순수한 잡음 특성 5000개
y = rng.integers(0, 2, 100)          # 무작위 라벨 → 진짜로 가능한 정확도는 약 50%
cv = StratifiedKFold(5, shuffle=True, random_state=0)

# 잘못된 방법: '라벨과 상관 높은 특성 20개'를 전체 데이터로 먼저 고른 뒤 CV
X_leak = SelectKBest(f_classif, k=20).fit_transform(X, y)
print("누수 있는 CV:", cross_val_score(LogisticRegression(), X_leak, y, cv=cv).mean().round(3))

# 올바른 방법: 특성 선택까지 파이프라인에 넣어 fold마다 학습 데이터로만 fit
pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
scores = cross_val_score(pipe, X, y, cv=cv)
print("올바른 CV  :", scores.mean().round(3), "±", scores.std().round(3))
