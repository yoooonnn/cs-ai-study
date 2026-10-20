
import sys, timeit
import numpy as np

# 1) 용량이 '가끔' 크게 늘어나는 것을 관찰 (over-allocation)
lst, last = [], sys.getsizeof([])
for i in range(40):
    lst.append(i)
    size = sys.getsizeof(lst)
    if size != last:
        print(f"len={len(lst):3d}  bytes={size}")
        last = size

# 2) 끝 삽입 O(1) vs 앞 삽입 O(n)
n = 20000
t_end = timeit.timeit("a.append(0)", setup="a=[]", number=n)
t_front = timeit.timeit("a.insert(0, 0)", setup="a=[]", number=n)
print(f"append: {t_end:.4f}s   insert(0): {t_front:.4f}s")

# 3) numpy: 원소 크기(itemsize)와 다음 원소까지의 거리(strides)
a = np.arange(5, dtype=np.float64)
print(a.itemsize, a.strides)   # 8 (8,) → i번째 주소 = 시작 + 8*i
