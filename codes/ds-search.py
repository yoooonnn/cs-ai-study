
import bisect

def lower_bound(a, x):
    """x 이상인 첫 위치. 불변식: a[:lo] < x  그리고  a[hi:] >= x"""
    lo, hi = 0, len(a)                 # 반열린 구간 [lo, hi)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1               # mid까지는 x보다 작다 → 버림
        else:
            hi = mid                   # mid는 답 후보 → 남김
    return lo

a = [1, 3, 3, 3, 7, 9]
for x in [0, 3, 4, 10]:
    assert lower_bound(a, x) == bisect.bisect_left(a, x)
print(lower_bound(a, 3), bisect.bisect_right(a, 3))   # 1 4 → 3의 개수 = 4 - 1 = 3

# 답에 대한 이진 탐색: f(k) = (k*k > n) 은 F...F T...T 꼴(단조)
def isqrt(n):
    lo, hi = 0, n + 1
    while lo < hi:                     # k*k > n 을 만족하는 최소 k 찾기
        mid = (lo + hi) // 2
        if mid * mid > n:
            hi = mid
        else:
            lo = mid + 1
    return lo - 1

print(isqrt(10**12 + 5), isqrt(15))    # 1000000 3
