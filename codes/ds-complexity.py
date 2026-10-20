
import time

def count_log(n):          # 절반씩 줄이기
    ops = 0
    while n > 1:
        n //= 2
        ops += 1
    return ops

def count_linear(n):
    ops = 0
    for _ in range(n):
        ops += 1
    return ops

def count_quadratic(n):    # 모든 쌍 (i, j), i < j
    ops = 0
    for i in range(n):
        for j in range(i + 1, n):
            ops += 1
    return ops

for n in [10, 100, 1000, 2000]:
    print(f"n={n:5d}  log:{count_log(n):3d}  linear:{count_linear(n):6d}  quad:{count_quadratic(n):8d}")

# 입력을 2배로 늘렸을 때 실제 시간이 몇 배가 되는가?
def ratio(f, n):
    t0 = time.perf_counter(); f(n)
    t1 = time.perf_counter(); f(2 * n)
    t2 = time.perf_counter()
    return (t2 - t1) / (t1 - t0)

print("linear    ×", round(ratio(count_linear, 1_000_000), 1))   # 약 2
print("quadratic ×", round(ratio(count_quadratic, 1500), 1))      # 약 4
