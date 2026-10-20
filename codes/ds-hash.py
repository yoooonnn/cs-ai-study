
class HashMap:
    """체이닝 방식 해시 테이블 (학습용)"""
    def __init__(self, m=8):
        self.buckets = [[] for _ in range(m)]
        self.n = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:                       # 버킷 안에서는 == 로 실제 키 비교
                b[i] = (key, value)
                return
        b.append((key, value))
        self.n += 1
        if self.n / len(self.buckets) > 0.75:  # 적재율 초과 → 2배로 재해싱
            self._resize(2 * len(self.buckets))

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        raise KeyError(key)

    def _resize(self, m):
        items = [kv for b in self.buckets for kv in b]
        self.buckets = [[] for _ in range(m)]
        for k, v in items:
            self._bucket(k).append((k, v))

h = HashMap()
for i in range(20):
    h.put(f"key{i}", i)
print(h.get("key13"), "버킷 수:", len(h.buckets), "최장 체인:", max(map(len, h.buckets)))

print(hash(1) == hash(1.0) == hash(True))   # True: 같다고 비교되는 값은 해시도 같아야 한다
try:
    {[1, 2]: "x"}
except TypeError as e:
    print("TypeError:", e)                    # unhashable type: 'list'
