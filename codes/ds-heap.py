
import heapq, random

def push(h, x):
    h.append(x)
    i = len(h) - 1
    while i > 0 and h[(i - 1) // 2] > h[i]:    # 부모보다 작으면 위로 (sift-up)
        p = (i - 1) // 2
        h[i], h[p] = h[p], h[i]
        i = p

def pop(h):
    top, last = h[0], h.pop()
    if h:
        h[0] = last
        i = 0
        while True:                             # 더 작은 자식과 교환하며 아래로 (sift-down)
            l, r, m = 2 * i + 1, 2 * i + 2, i
            if l < len(h) and h[l] < h[m]: m = l
            if r < len(h) and h[r] < h[m]: m = r
            if m == i: break
            h[i], h[m] = h[m], h[i]
            i = m
    return top

data = random.sample(range(100), 10)
h = []
for x in data:
    push(h, x)
print("힙 배열 :", h)                                    # 정렬된 상태가 아니다
print("꺼낸 순서:", [pop(h) for _ in range(len(data))])  # 정렬된 순서로 나온다

# Top-k: 크기 k 힙으로 O(n log k)
nums = [random.random() for _ in range(100_000)]
print(heapq.nlargest(3, nums) == sorted(nums, reverse=True)[:3])   # True

# 최대 힙: 부호를 뒤집어 저장
mx = []
for x in [5, 1, 9]:
    heapq.heappush(mx, -x)
print(-heapq.heappop(mx))   # 9
