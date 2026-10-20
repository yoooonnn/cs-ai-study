
import numpy as np
rng = np.random.default_rng(0)

n = 5000                                              # 불균형 데이터: 양성(사기) 약 2%
y = (rng.random(n) < 0.02).astype(int)
score = np.where(y == 1, rng.normal(1.5, 1, n), rng.normal(0, 1, n))   # 모델 점수

def metrics(y, pred):
    tp = np.sum((pred == 1) & (y == 1)); fp = np.sum((pred == 1) & (y == 0))
    fn = np.sum((pred == 0) & (y == 1)); tn = np.sum((pred == 0) & (y == 0))
    acc = (tp + tn) / len(y)
    prec = tp / (tp + fp) if tp + fp else 0.0
    rec = tp / (tp + fn)
    f1 = 2 * prec * rec / (prec + rec) if prec + rec else 0.0
    return acc, prec, rec, f1

print("항상 '정상'      : acc=%.3f prec=%.3f rec=%.3f f1=%.3f" % metrics(y, np.zeros(n, int)))
for th in [0.5, 1.5, 2.5]:                            # 임계값을 올리면 정밀도↑ 재현율↓
    print(f"임계값 {th}      : acc=%.3f prec=%.3f rec=%.3f f1=%.3f" % metrics(y, (score >= th).astype(int)))

# AUC = 무작위 양성 점수 > 무작위 음성 점수일 확률
pos, neg = score[y == 1], score[y == 0]
auc_pairs = np.mean(pos[:, None] > neg[None, :])
# ROC 곡선(임계값을 훑으며 TPR, FPR) 아래 면적으로 계산해도 같다
ths = np.r_[np.inf, np.sort(score)[::-1]]
tpr = np.array([(pos >= t).mean() for t in ths])
fpr = np.array([(neg >= t).mean() for t in ths])
auc_roc = np.sum(np.diff(fpr) * (tpr[1:] + tpr[:-1]) / 2)   # 사다리꼴 적분
print(f"AUC(쌍 비교) {auc_pairs:.4f}  =  AUC(ROC 면적) {auc_roc:.4f}")
