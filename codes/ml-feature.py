
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import FunctionTransformer, OneHotEncoder, OrdinalEncoder, StandardScaler

rng = np.random.default_rng(0)
n = 1000
df = pd.DataFrame({
    "area": rng.uniform(20, 120, n),
    "region": rng.choice(["강남", "강북", "판교"], n),
    "income": rng.lognormal(mean=8, sigma=1, size=n),       # 오른쪽으로 치우친 분포
})
effect = df["region"].map({"강남": 3.0, "강북": 1.0, "판교": 2.0})   # 순서가 없는 범주 효과
y = 0.05 * df["area"] + effect + 0.5 * np.log(df["income"]) + rng.normal(0, 0.3, n)
df.loc[rng.random(n) < 0.1, "area"] = np.nan               # 결측 10%

X_tr, X_te, y_tr, y_te = train_test_split(df, y, random_state=0)

def evaluate(name, preprocess):
    model = make_pipeline(preprocess, LinearRegression()).fit(X_tr, y_tr)   # fit은 학습 데이터로만
    print(f"{name}: 테스트 R² = {model.score(X_te, y_te):.3f}")

evaluate("나쁜 표현(정수 인코딩, 원 단위 소득)", ColumnTransformer([
    ("area", SimpleImputer(strategy="median"), ["area"]),
    ("region", OrdinalEncoder(), ["region"]),               # 강남=0, 강북=1, 판교=2 → 가짜 순서
    ("income", "passthrough", ["income"]),
]))
evaluate("좋은 표현(원-핫, log 소득, 결측 표시)", ColumnTransformer([
    ("area", make_pipeline(SimpleImputer(strategy="median", add_indicator=True), StandardScaler()), ["area"]),
    ("region", OneHotEncoder(handle_unknown="ignore"), ["region"]),
    ("income", make_pipeline(FunctionTransformer(np.log), StandardScaler()), ["income"]),
]))
