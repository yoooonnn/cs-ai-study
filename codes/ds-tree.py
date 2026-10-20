
import random

class Node:
    __slots__ = ("key", "left", "right")
    def __init__(self, key):
        self.key, self.left, self.right = key, None, None

def insert(root, key):                    # 반복문으로 구현 (깊은 트리에서도 재귀 한도 문제 없음)
    if root is None:
        return Node(key)
    node = root
    while True:
        if key < node.key:
            if node.left is None:
                node.left = Node(key); break
            node = node.left
        else:
            if node.right is None:
                node.right = Node(key); break
            node = node.right
    return root

def search_steps(root, key):
    steps = 0
    while root:
        steps += 1
        if key == root.key:
            return steps
        root = root.left if key < root.key else root.right
    return steps

def height(root):                         # 레벨 단위로 내려가며 높이 계산
    h, level = -1, [root] if root else []
    while level:
        h += 1
        level = [c for n in level for c in (n.left, n.right) if c]
    return h

def inorder(root):                        # 왼쪽 → 자기 → 오른쪽 = 정렬 순서
    out, stack = [], []
    while stack or root:
        while root:
            stack.append(root); root = root.left
        root = stack.pop(); out.append(root.key); root = root.right
    return out

n = 2000
keys = list(range(n))
for name, order in [("무작위 순서 삽입", random.sample(keys, n)), ("정렬된 순서 삽입", keys)]:
    root = None
    for k in order:
        root = insert(root, k)
    print(f"{name}: 높이={height(root)}, 최댓값 탐색 비교 횟수={search_steps(root, n - 1)}")
print(inorder(root)[:10])
