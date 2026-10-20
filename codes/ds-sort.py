
import random

def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    L, R = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:               # '<=': 같은 값은 왼쪽 것이 먼저 → 안정 정렬
            out.append(L[i]); i += 1
        else:
            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]

def quick_sort(a):                     # 이해용 버전 (제자리 분할 아님)
    if len(a) <= 1:
        return a
    pivot = random.choice(a)           # 무작위 피벗: 어떤 입력이든 기대 O(n log n)
    return (quick_sort([x for x in a if x < pivot])
            + [x for x in a if x == pivot]
            + quick_sort([x for x in a if x > pivot]))

data = [random.randint(0, 99) for _ in range(20)]
assert merge_sort(data) == quick_sort(data) == sorted(data)
print(merge_sort(data))

# 안정성: 점수로 정렬해도 같은 점수끼리는 직전 순서(이름순)가 유지된다
students = sorted([("양의지", 90), ("곽빈", 85), ("정수빈", 90), ("김택연", 85)])  # 이름순
print(sorted(students, key=lambda s: s[1], reverse=True))
# [('양의지', 90), ('정수빈', 90), ('곽빈', 85), ('김택연', 85)]
