
import numpy as np
rng = np.random.default_rng(0)

f = lambda x: np.sin(2 * np.pi * x)          # 진짜 함수 (학습자는 모름)
x_test = np.linspace(0.1, 0.9, 50)          # 다항식이 크게 튀는 양 끝은 제외
noise = 0.3

for degree in [1, 3, 6, 9]:
    preds = []
    for _ in range(200):                      # 서로 다른 훈련 세트 200개로 각각 학습
        x = rng.uniform(0, 1, 30)
        y = f(x) + rng.normal(0, noise, 30)
        preds.append(np.polyval(np.polyfit(x, y, degree), x_test))
    preds = np.array(preds)                   # (200개 모델, 50개 테스트 점)
    bias2 = np.mean((preds.mean(axis=0) - f(x_test)) ** 2)   # 평균 예측이 진짜에서 벗어난 정도
    var = np.mean(preds.var(axis=0))                         # 모델마다 예측이 흔들리는 정도
    print(f"차수 {degree}: 편향² {bias2:.3f}  분산 {var:.3f}  → 기대 테스트 오차 ≈ {bias2 + var + noise**2:.3f}")
