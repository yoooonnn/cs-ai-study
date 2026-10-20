
def select_activities(acts):
    """끝나는 시간이 빠른 순으로 고르면 최대 개수 (교환 논증으로 증명 가능)"""
    chosen, end = [], float("-inf")
    for s, e in sorted(acts, key=lambda a: a[1]):
        if s >= end:
            chosen.append((s, e))
            end = e
    return chosen

acts = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10),
        (8, 11), (8, 12), (2, 14), (12, 16)]
print(select_activities(acts))     # [(1, 4), (5, 7), (8, 11), (12, 16)]

def coins_greedy(amount, coins):
    used = []
    for c in sorted(coins, reverse=True):
        while amount >= c:
            amount -= c
            used.append(c)
    return used

def coins_dp(amount, coins):       # 최소 동전 개수 (정답)
    INF = float("inf")
    dp = [0] + [INF] * amount
    for a in range(1, amount + 1):
        dp[a] = min((dp[a - c] + 1 for c in coins if c <= a), default=INF)
    return dp[amount]

print(coins_greedy(6, [1, 3, 4]), "→ 최적 개수:", coins_dp(6, [1, 3, 4]))          # [4, 1, 1] → 2
print(coins_greedy(760, [10, 50, 100, 500]), "→ 최적 개수:", coins_dp(760, [10, 50, 100, 500]))
