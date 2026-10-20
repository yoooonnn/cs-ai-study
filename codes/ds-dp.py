
from functools import lru_cache

calls = 0
def fib_naive(n):
    global calls
    calls += 1
    return n if n < 2 else fib_naive(n - 1) + fib_naive(n - 2)

fib_naive(25)
print("단순 재귀 호출 수:", calls)                       # 242785

@lru_cache(maxsize=None)                                  # 메모이제이션
def fib_memo(n):
    return n if n < 2 else fib_memo(n - 1) + fib_memo(n - 2)

print(fib_memo(25), "/ 실제 계산 횟수:", fib_memo.cache_info().misses)   # 75025 / 26

def knapsack(items, W):
    """items: (무게, 가치) 목록. dp[w] = 용량 w로 얻을 수 있는 최대 가치"""
    dp = [0] * (W + 1)
    for wt, val in items:
        for w in range(W, wt - 1, -1):   # 큰 용량부터: dp[w-wt]가 아직 '이번 물건 전' 값이어야 함
            dp[w] = max(dp[w], dp[w - wt] + val)
    return dp[W]

print(knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7))   # 9 (무게 3+4)
