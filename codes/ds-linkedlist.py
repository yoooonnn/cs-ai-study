
class Node:
    def __init__(self, val, next=None):
        self.val, self.next = val, next

def from_list(xs):
    head = None
    for x in reversed(xs):
        head = Node(x, head)
    return head

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def insert_after(node, val):      # O(1): 포인터만 바꾼다
    node.next = Node(val, node.next)

def reverse(head):                # O(n) 시간, O(1) 추가 공간
    prev, cur = None, head
    while cur:
        nxt = cur.next            # 1) 다음 노드를 잃기 전에 저장
        cur.next = prev           # 2) 방향 뒤집기
        prev, cur = cur, nxt      # 3) 한 칸 전진
    return prev

head = from_list([3, 7, 9])
insert_after(head, 5)
print(to_list(head))              # [3, 5, 7, 9]
print(to_list(reverse(head)))     # [9, 7, 5, 3]
