
import heapq

def dijkstra(graph, src):
    dist = {u: float("inf") for u in graph}
    dist[src] = 0
    pq, done = [(0, src)], set()
    while pq:
        d, u = heapq.heappop(pq)
        if u in done:              # 이미 확정된 정점의 낡은 항목 → 건너뜀
            continue
        done.add(u)                # 꺼낸 순간 거리 확정 (음수 간선이 없다는 가정)
        for v, w in graph[u]:
            if v not in done and d + w < dist[v]:   # 완화
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist

def bellman_ford(graph, src):
    dist = {u: float("inf") for u in graph}
    dist[src] = 0
    edges = [(u, v, w) for u in graph for v, w in graph[u]]
    for _ in range(len(graph) - 1):          # 최단 경로의 간선 수 ≤ V-1
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:                    # 그래도 줄어들면 음수 사이클
        if dist[u] + w < dist[v]:
            raise ValueError("음수 사이클 존재")
    return dist

g = {'S': [('A', 4), ('B', 1)], 'A': [('C', 1)], 'B': [('A', 2), ('C', 5)], 'C': []}
print(dijkstra(g, 'S'))                      # {'S': 0, 'A': 3, 'B': 1, 'C': 4}

neg = {'S': [('A', 1), ('B', 5)], 'A': [], 'B': [('A', -10)]}   # 음수 간선
print("다익스트라:", dijkstra(neg, 'S'))     # A=1 (틀림: A를 너무 일찍 확정)
print("벨만-포드:", bellman_ford(neg, 'S'))  # A=-5 (정답)
