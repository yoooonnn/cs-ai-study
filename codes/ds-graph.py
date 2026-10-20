
from collections import deque

graph = {                                 # 인접 리스트 (무방향)
    'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'],
    'D': ['B'], 'E': ['B', 'F'], 'F': ['C', 'E', 'G'], 'G': ['F'],
}

def bfs(start):
    dist = {start: 0}                     # 방문 표시 겸 거리
    q = deque([start])
    while q:
        u = q.popleft()
        for v in graph[u]:
            if v not in dist:             # 큐에 '넣을 때' 표시해야 중복 삽입이 없다
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

def dfs(start):
    seen, order, stack = set(), [], [start]
    while stack:
        u = stack.pop()
        if u in seen:
            continue
        seen.add(u)
        order.append(u)
        stack.extend(reversed(graph[u]))  # 인접 순서대로 방문하려고 뒤집어 넣음
    return order

print("BFS 거리:", bfs('A'))
print("DFS 순서:", dfs('A'))

# 위상 정렬 (Kahn): 진입 차수 0인 노드부터 — 계산 그래프의 실행 순서
dag = {'x': ['h'], 'w': ['h'], 'h': ['y'], 'y': ['loss'], 't': ['loss'], 'loss': []}
indeg = {u: 0 for u in dag}
for u in dag:
    for v in dag[u]:
        indeg[v] += 1
q = deque(u for u in dag if indeg[u] == 0)
topo = []
while q:
    u = q.popleft()
    topo.append(u)
    for v in dag[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)
print("위상 순서:", topo)   # 순전파 순서. 역전파는 이 역순으로 그래디언트를 전달
