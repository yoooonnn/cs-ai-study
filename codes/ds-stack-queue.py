
from collections import deque

def is_balanced(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)               # 여는 괄호는 짝이 올 때까지 보관
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False               # 가장 최근에 연 괄호와 짝이 맞아야 함
    return not stack

print(is_balanced("f(a[i], {k: v})"))    # True
print(is_balanced("(]"))                  # False

class CircularQueue:
    def __init__(self, capacity):
        self.buf = [None] * capacity
        self.head = self.size = 0          # size를 따로 세서 빈/가득 참을 구별
    def enqueue(self, x):
        if self.size == len(self.buf):
            raise OverflowError("가득 참")
        self.buf[(self.head + self.size) % len(self.buf)] = x
        self.size += 1
    def dequeue(self):
        if self.size == 0:
            raise IndexError("비어 있음")
        x = self.buf[self.head]
        self.head = (self.head + 1) % len(self.buf)
        self.size -= 1
        return x

q = CircularQueue(3)
for x in (1, 2, 3):
    q.enqueue(x)
print(q.dequeue(), q.dequeue())            # 1 2
q.enqueue(4); q.enqueue(5)                 # 배열 끝을 넘어 앞칸을 재사용
print([q.dequeue() for _ in range(3)])     # [3, 4, 5]

dq = deque([1, 2, 3])                      # 실전에서는 deque
dq.appendleft(0); dq.pop()
print(dq)                                  # deque([0, 1, 2])
