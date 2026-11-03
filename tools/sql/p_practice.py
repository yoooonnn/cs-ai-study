# 실무 시나리오: 매출 분석 쿼리, 이력 관리(SCD). 데이터베이스 과목의 'SQL 실전 예제'와 '데이터 모델링' 묶음에 들어간다.
# 예제 테이블은 마트 매출 데이터(store·item·orders·promo)로, 이 파일의 RETAIL·SCD 스크립트에만 있다.
from lib import Page, q

PAGES = []

RETAIL = '''
CREATE TABLE store (store_id INTEGER PRIMARY KEY, store_name TEXT, region TEXT);
CREATE TABLE item (item_id INTEGER PRIMARY KEY, item_name TEXT, category TEXT, price INTEGER);
CREATE TABLE orders (order_id INTEGER PRIMARY KEY, order_date TEXT, store_id INTEGER, cust_id INTEGER, item_id INTEGER, qty INTEGER, amount INTEGER);
CREATE TABLE promo (store_id INTEGER, promo_name TEXT);
INSERT INTO promo VALUES (1, '1+1 행사'), (1, '카드 할인'), (2, '카드 할인');
INSERT INTO store VALUES (1, '강남점', '서울'), (2, '해운대점', '부산'), (3, '수원점', '경기');
INSERT INTO item VALUES (101, '우유', '유제품', 3200), (102, '요거트', '유제품', 2000), (103, '사과', '과일', 5500), (104, '바나나', '과일', 4000), (105, '라면', '가공식품', 5000), (106, '즉석밥', '가공식품', 6000);
INSERT INTO orders VALUES
 (1, '2026-01-05', 1, 501, 101, 2, 6000),
 (2, '2026-01-12', 2, 502, 103, 3, 15000),
 (3, '2026-01-20', 1, 503, 105, 5, 23000),
 (4, '2026-01-28', 3, 501, 102, 5, 10000),
 (5, '2026-02-03', 1, 502, 104, 2, 8000),
 (6, '2026-02-14', 2, 504, 103, 4, 20000),
 (7, '2026-02-20', 1, 501, 101, 3, 9000),
 (8, '2026-02-25', 3, 505, 105, 2, 10000),
 (9, '2026-03-02', 1, 503, 103, 2, 11000),
 (10, '2026-03-09', 2, 502, 101, 4, 12800),
 (11, '2026-03-15', 1, 504, 105, 6, 30000),
 (12, '2026-03-22', 3, 501, 104, 3, 12000),
 (13, '2026-04-01', 1, 505, 102, 4, 8000),
 (14, '2026-04-08', 2, 503, 105, 5, 25000),
 (15, '2026-04-18', 1, 502, 103, 4, 22000),
 (16, '2026-04-26', 3, 504, 101, 2, 6400);
'''
SCD = RETAIL + '''
CREATE TABLE price_hist (item_id INTEGER, price INTEGER, start_date TEXT, end_date TEXT);
INSERT INTO price_hist VALUES
 (101, 3000, '2026-01-01', '2026-02-28'), (101, 3200, '2026-03-01', '9999-12-31'),
 (103, 5000, '2026-01-01', '2026-03-15'), (103, 5500, '2026-03-01', '9999-12-31'),
 (105, 4600, '2026-01-01', '2026-01-31'), (105, 5000, '2026-02-10', '9999-12-31');
CREATE TABLE cust (cust_id INTEGER PRIMARY KEY, grade TEXT);
INSERT INTO cust VALUES (501, '우수'), (502, '일반'), (503, 'VIP');
CREATE TABLE cust_hist (cust_sk INTEGER PRIMARY KEY, cust_id INTEGER, grade TEXT, start_date TEXT, end_date TEXT, cur_flag TEXT);
INSERT INTO cust_hist VALUES
 (1, 501, '일반', '2025-01-01', '2026-02-28', 'N'), (2, 501, '우수', '2026-03-01', '9999-12-31', 'Y'),
 (3, 502, '일반', '2025-06-01', '9999-12-31', 'Y'),
 (4, 503, '우수', '2025-03-01', '2026-01-31', 'N'), (5, 503, 'VIP', '2026-02-01', '9999-12-31', 'Y'),
 (6, 504, '일반', '2025-09-01', '9999-12-31', 'Y'), (7, 505, '우수', '2025-11-01', '9999-12-31', 'Y');
'''

# 조인 팬아웃: 1:N 조인 뒤 합계가 부풀어 오르는 모습
def fanout():
    n, tot = q('SELECT COUNT(*), SUM(amount) FROM orders WHERE store_id = 1', RETAIL)
    s = '<svg viewBox="0 0 600 170" width="600">'
    s += '<rect class="h" x="20" y="55" width="140" height="44" rx="6"/><text x="90" y="70">강남점 매출</text><text x="90" y="88" class="sm">주문 %d건 · 합계 %s</text>' % (n, format(tot, ','))
    s += '<rect class="n" x="230" y="20" width="130" height="36" rx="6"/><text x="295" y="38">1+1 행사</text>'
    s += '<rect class="n" x="230" y="98" width="130" height="36" rx="6"/><text x="295" y="116">카드 할인</text>'
    s += '<path class="a" d="M160,70 L228,40"/><path class="a" d="M160,84 L228,114"/>'
    s += '<rect class="n" x="430" y="20" width="150" height="36" rx="6"/><text x="505" y="38">주문 %d행 × 행사 A</text>' % n
    s += '<rect class="n" x="430" y="98" width="150" height="36" rx="6"/><text x="505" y="116">주문 %d행 × 행사 B</text>' % n
    s += '<path class="a" d="M360,38 L428,38"/><path class="a" d="M360,116 L428,116"/>'
    s += '<text x="505" y="155" class="sm">SUM(amount) = %s (두 배)</text>' % format(tot * 2, ',')
    return s + '</svg>'

# ---------------------------------------------------------------------------
p = Page('db-sql-analysis', '매출 분석 쿼리 실전', '업무 질문을 <strong>단위(grain)</strong>부터 정하고 쿼리로 옮긴다: "무엇 한 행당 무엇을 셀 것인가"\n<code>LEFT JOIN</code> + <code>COALESCE</code>로 0건도 남기고, 1:N 조인 뒤 <code>SUM</code>은 부풀어 오른다(팬아웃)\n<code>ROW_NUMBER</code>로 그룹별 Top N·중복 제거, <code>LAG</code>로 전월 대비, <code>SUM() OVER</code>로 누적·구성비', data=RETAIL)
p('<p>앞 페이지들이 문법을 하나씩 익혔다면, 여기서는 실제 업무에서 받는 질문을 쿼리로 옮긴다. 마트 3개 점포의 1~4월 주문 16건이다. 면접이나 코딩 테스트의 SQL 문제, 그리고 Text2SQL이 만들어 내는 쿼리도 대부분 이 패턴들의 조합이다.</p>')
p.sample('store', 'item', 'promo', 'orders')
p('''<h3>먼저 할 일: 결과 한 행의 단위 정하기</h3>
<p>"점포별 월 매출"이면 결과 한 행은 <strong>점포 × 월</strong>이다. 이 단위를 먼저 정하면 <code>GROUP BY</code>에 무엇을 넣을지, 어느 테이블을 붙여도 되는지가 정해진다. 주문 테이블은 <strong>주문 1건</strong>이 한 행이고, 점포·상품 테이블은 <strong>점포 1개, 상품 1개</strong>가 한 행이다. 단위가 더 큰 쪽(점포)을 작은 쪽(주문)에 붙이는 조인은 행 수를 바꾸지 않지만, 한 점포에 여러 행이 딸린 테이블(행사)을 붙이면 주문 행이 복제된다.</p>''')

p('<h3>1. 0건도 보여야 하는 집계: LEFT JOIN</h3>')
p.ex('상품별 판매액 (안 팔린 상품 포함)', "SELECT i.item_name,\n       COUNT(o.order_id)          AS orders,\n       COALESCE(SUM(o.amount), 0) AS total\nFROM item i\nLEFT JOIN orders o ON o.item_id = i.item_id\nGROUP BY i.item_id, i.item_name\nORDER BY total DESC;",
     '기준이 되는 쪽(상품 목록)을 왼쪽에 두고 LEFT JOIN한다. 한 번도 안 팔린 즉석밥은 주문이 없어 <code>SUM</code>이 NULL이므로 <code>COALESCE</code>로 0을 넣는다. 개수는 <code>COUNT(*)</code>가 아니라 <code>COUNT(o.order_id)</code>로 세야 0이 나온다. INNER JOIN으로 썼다면 즉석밥은 결과에서 조용히 사라진다.')
p.ex('4월에 안 팔린 상품: 조건은 ON에', "SELECT i.item_name\nFROM item i\nLEFT JOIN orders o\n  ON o.item_id = i.item_id\n AND o.order_date >= '2026-04-01'\nWHERE o.order_id IS NULL;",
     '기간 조건을 <code>ON</code>에 넣어야 "4월 주문만 짝으로 붙인 뒤, 짝이 없는 상품"이 된다. 같은 조건을 WHERE에 쓰면 4월 주문이 있는 행만 남아 결과가 늘 0행이다. 날짜 열은 <code>YYYY-MM-DD</code> 문자열이라 크기 비교가 날짜 순서와 같다.')

p('<h3>2. 조인 팬아웃: 합계가 두 배가 되는 이유</h3>')
p.ex('잘못된 쿼리: 행사 테이블을 붙인 뒤 합계', "SELECT s.store_name, SUM(o.amount) AS total\nFROM orders o\nJOIN store s ON s.store_id = o.store_id\nJOIN promo p ON p.store_id = o.store_id\nGROUP BY s.store_id, s.store_name;",
     '강남점은 행사가 2개라서 주문 8행이 각각 2번씩 붙어 16행이 되고, 합계가 실제(117,000)의 두 배가 됐다. 행사가 없는 수원점은 INNER JOIN이라 아예 빠졌다. 오류 없이 그럴듯한 숫자가 나오기 때문에 가장 찾기 어려운 실수다.')
p('<figure class="diagram">%s<figcaption>점포 1개에 행사 N개가 딸려 있으면, 점포 기준으로 붙은 주문 행이 N번 복제된다. 결과 단위(점포)보다 잘게 쪼개진 테이블을 두 개 이상 붙일 때 생긴다.</figcaption></figure>' % fanout())
p.ex('고친 쿼리: 먼저 집계하고 붙이기', "SELECT s.store_name, t.total,\n       (SELECT COUNT(*) FROM promo p\n         WHERE p.store_id = s.store_id) AS promo_cnt\nFROM store s\nLEFT JOIN (SELECT store_id, SUM(amount) AS total\n           FROM orders\n           GROUP BY store_id) t ON t.store_id = s.store_id;",
     '주문을 점포 단위로 <strong>먼저 집계</strong>해서 한 점포당 한 행으로 만든 뒤 붙인다. 행사 수도 따로 센다. 각 테이블을 결과 단위에 맞춰 줄인 다음 조인하면 행이 복제되지 않는다. 의심스러우면 조인 전후의 <code>COUNT(*)</code>를 비교한다.')

p('<h3>3. 기간·조건별 집계: GROUP BY, HAVING, CASE</h3>')
p.ex('2월 이후 매출이 6만 원 이상인 카테고리', "SELECT i.category,\n       COUNT(*)      AS orders,\n       SUM(o.amount) AS total\nFROM orders o\nJOIN item i ON i.item_id = o.item_id\nWHERE o.order_date >= '2026-02-01'\nGROUP BY i.category\nHAVING SUM(o.amount) >= 60000;",
     '<code>WHERE</code>는 묶기 <strong>전에</strong> 행을 거르고(2월 이후 주문만), <code>HAVING</code>은 묶은 <strong>뒤에</strong> 그룹을 거른다(합계 6만 이상). 집계 함수 조건은 WHERE에 쓸 수 없다. 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.')
p.ex('월별 × 점포별 표: 조건부 집계로 피벗', "SELECT substr(order_date, 1, 7) AS month,\n       SUM(CASE WHEN store_id = 1 THEN amount ELSE 0 END) AS 강남,\n       SUM(CASE WHEN store_id = 2 THEN amount ELSE 0 END) AS 해운대,\n       SUM(CASE WHEN store_id = 3 THEN amount ELSE 0 END) AS 수원,\n       SUM(amount) AS total\nFROM orders\nGROUP BY substr(order_date, 1, 7)\nORDER BY month;",
     '행으로 쌓인 값을 열로 펼치는 피벗이다. <code>SUM(CASE WHEN 조건 THEN 값 ELSE 0 END)</code>는 어느 DBMS에서나 쓰이는 정석이다. Oracle은 <code>PIVOT</code> 절, 날짜 자르기는 <code>TO_CHAR(order_date, \'YYYY-MM\')</code>를 쓴다.')

p('<h3>4. 순위와 Top N: ROW_NUMBER, RANK</h3>')
p.ex('카테고리 매출 순위: 동점 처리 비교', "SELECT category, total,\n       RANK()       OVER (ORDER BY total DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY total DESC) AS dense,\n       ROW_NUMBER() OVER (ORDER BY total DESC) AS row_num\nFROM (SELECT i.category, SUM(o.amount) AS total\n      FROM orders o JOIN item i ON i.item_id = o.item_id\n      GROUP BY i.category);",
     '가공식품과 과일이 동점이면 <code>RANK</code>는 1, 1, 3, <code>DENSE_RANK</code>는 1, 1, 2, <code>ROW_NUMBER</code>는 1, 2, 3이다. "상위 1개만"을 ROW_NUMBER로 고르면 동점 중 하나가 임의로 빠지므로, 동점을 모두 보여야 하면 RANK를 쓴다.')
p.ex('카테고리별 매출 1위 상품', "SELECT category, item_name, total\nFROM (SELECT i.category, i.item_name,\n             SUM(o.amount) AS total,\n             ROW_NUMBER() OVER (PARTITION BY i.category\n                                ORDER BY SUM(o.amount) DESC) AS rn\n      FROM orders o JOIN item i ON i.item_id = o.item_id\n      GROUP BY i.category, i.item_id, i.item_name)\nWHERE rn = 1;",
     '"그룹별 Top N"의 정석: 안쪽에서 집계와 순위를 함께 계산하고, 바깥에서 <code>rn &lt;= N</code>으로 거른다. 윈도우 함수는 GROUP BY 뒤에 계산되므로 <code>ORDER BY SUM(o.amount)</code>처럼 집계 결과로 순위를 매길 수 있다. 같은 쿼리의 WHERE에서는 윈도우 함수를 쓸 수 없어 한 번 감싼다.')

p('<h3>5. 시계열: 전월 대비, 누적, 이동 평균, 구성비</h3>')
p.ex('월 매출의 전월 대비 증감률과 누적', "WITH m AS (\n  SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS total\n  FROM orders\n  GROUP BY substr(order_date, 1, 7)\n)\nSELECT month, total,\n       LAG(total) OVER (ORDER BY month) AS prev,\n       ROUND(100.0 * (total - LAG(total) OVER (ORDER BY month))\n             / LAG(total) OVER (ORDER BY month), 1) AS growth_pct,\n       SUM(total) OVER (ORDER BY month) AS running,\n       ROUND(AVG(total) OVER (ORDER BY month\n             ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)) AS ma3\nFROM m;",
     '<code>WITH</code>(CTE)로 월 단위 집계를 먼저 만들고 그 위에서 윈도우 함수를 쓴다. <code>LAG</code>는 직전 행 값이라 첫 달은 NULL이다. <code>100.0</code>을 곱해야 정수 나눗셈이 되지 않는다. <code>ma3</code>는 최근 3개월 이동 평균으로, 처음 두 달은 있는 달만 평균 낸다. 빠진 달이 있으면 LAG가 "직전 달"이 아니라 "직전 행"을 가리키므로, 실무에서는 달력 테이블에 LEFT JOIN해 빈 달을 0으로 채운다.')
p.ex('점포별 매출 구성비', "SELECT s.store_name,\n       SUM(o.amount) AS total,\n       ROUND(100.0 * SUM(o.amount) / SUM(SUM(o.amount)) OVER (), 1) AS pct\nFROM orders o\nJOIN store s ON s.store_id = o.store_id\nGROUP BY s.store_id, s.store_name\nORDER BY total DESC;",
     '<code>SUM(SUM(o.amount)) OVER ()</code>: 안쪽 SUM은 GROUP BY 집계(점포별 합계), 바깥 SUM은 그 결과 전체에 대한 윈도우 합계다. 구성비를 서브쿼리 없이 한 번에 구한다.')

p('<h3>6. 고객 분석: 재구매 간격, 중복 제거</h3>')
p.ex('고객별 몇 번째 구매이고, 직전 구매로부터 며칠 지났나', "SELECT cust_id, order_date,\n       ROW_NUMBER() OVER (PARTITION BY cust_id ORDER BY order_date) AS nth,\n       julianday(order_date)\n         - julianday(LAG(order_date) OVER (PARTITION BY cust_id\n                                          ORDER BY order_date)) AS gap_days\nFROM orders\nWHERE cust_id IN (501, 505)\nORDER BY cust_id, order_date;",
     '<code>PARTITION BY cust_id</code>로 고객마다 따로 번호를 매기고 직전 주문을 찾는다. <code>nth = 1</code>이면 첫 구매, 2 이상이면 재구매다. 날짜 차이는 SQLite의 <code>julianday</code>로 구했다(Oracle은 날짜끼리 빼면 일수, MySQL은 <code>DATEDIFF</code>).')
p.ex('적재 중 두 번 들어간 주문 찾기', "SELECT *\nFROM (SELECT o.*,\n             ROW_NUMBER() OVER (PARTITION BY order_date, store_id, cust_id, item_id, qty\n                                ORDER BY order_id) AS dup_no\n      FROM orders o)\nWHERE dup_no > 1;",
     '같은 날, 같은 점포, 같은 고객, 같은 상품, 같은 수량인 행에 번호를 매기면 두 번째부터가 중복 후보다(여기서는 17번이 3번의 중복으로 들어갔다). 지울 때는 <code>DELETE FROM orders WHERE order_id IN (위 결과의 order_id)</code>. 무엇을 같은 거래로 볼지(업무 키)는 데이터 담당자와 정해야 한다.',
     setup="INSERT INTO orders VALUES (17, '2026-01-20', 1, 503, 105, 5, 23000);")

p('''<h3>정리: 질문 → 패턴</h3>
<table><tr><th>질문</th><th>패턴</th><th>함정</th></tr>
<tr><td>"0건도 보여 줘"</td><td>기준 테이블 <code>LEFT JOIN</code> + <code>COALESCE</code>, <code>COUNT(열)</code></td><td>오른쪽 조건을 WHERE에 쓰면 내부 조인이 된다</td></tr>
<tr><td>"안 팔린 것"</td><td><code>LEFT JOIN … WHERE 오른쪽.키 IS NULL</code> 또는 <code>NOT EXISTS</code></td><td><code>NOT IN</code>은 서브쿼리에 NULL이 있으면 0행</td></tr>
<tr><td>"합계가 N 이상인 그룹"</td><td><code>HAVING</code></td><td>집계 조건은 WHERE에 못 쓴다</td></tr>
<tr><td>"그룹별 상위 N개"</td><td>인라인 뷰 + <code>ROW_NUMBER() OVER (PARTITION BY …)</code></td><td>동점을 살리려면 RANK</td></tr>
<tr><td>"전월 대비"</td><td><code>LAG</code></td><td>빈 달이 있으면 달력 테이블로 채운다</td></tr>
<tr><td>"누적, 이동 평균"</td><td><code>SUM/AVG() OVER (ORDER BY … ROWS …)</code></td><td>동점이 있으면 기본 RANGE가 묶어서 계산</td></tr>
<tr><td>"전체 대비 비율"</td><td><code>x / SUM(x) OVER ()</code></td><td>정수 나눗셈은 100.0을 곱해 피한다</td></tr>
<tr><td>여러 테이블 합계</td><td>먼저 결과 단위로 집계한 뒤 조인</td><td>1:N 조인 뒤 SUM은 부풀어 오른다</td></tr>
</table>''')

PAGES.append(p.done(
    links=[{'to': 'db-sql-join', 'why': 'LEFT JOIN, 안티 조인, ON과 WHERE의 차이'},
           {'to': 'db-sql-window', 'why': 'ROW_NUMBER·LAG·누적 합계 문법을 하나씩'},
           {'to': 'db-dw', 'why': '분석용 테이블을 스타 스키마로 미리 만들어 두면 이 쿼리들이 단순해진다'},
           {'to': 'db-governance', 'why': '중복·누락을 찾는 쿼리는 데이터 품질 점검 규칙이 된다'},
           {'to': 'ai-text2sql', 'why': 'LLM이 만든 SQL도 이 함정(팬아웃, NULL)을 그대로 밟는다'}],
    quiz=[
        {'q': '상품별 판매액을 구할 때 한 번도 팔리지 않은 상품도 0으로 보이게 하려면?',
         'options': ['item을 왼쪽에 두고 LEFT JOIN한 뒤 COALESCE(SUM(amount), 0)', 'orders를 왼쪽에 두고 LEFT JOIN한 뒤 COALESCE(SUM(amount), 0)', 'item과 orders를 INNER JOIN한 뒤 HAVING SUM(amount) >= 0', 'item과 orders를 INNER JOIN한 뒤 COUNT(*)로 개수를 센다'], 'answer': 0,
         'explain': '모든 행이 남아야 하는 기준 테이블(상품)을 LEFT JOIN의 왼쪽에 둔다. 주문이 없는 상품은 SUM이 NULL이 되므로 COALESCE로 0을 넣는다. INNER JOIN은 짝 없는 상품을 지운다.'},
        {'q': '점포(1) - 주문(N), 점포(1) - 행사(N) 관계에서 세 테이블을 한 번에 조인하고 SUM(주문금액)을 구하면?',
         'options': ['점포마다 주문 금액 합계가 정확히 한 번씩 나온다', '행사 수만큼 주문 행이 복제되어 합계가 부풀어 오른다', 'GROUP BY 대상이 모호해서 실행 오류가 발생한다', '행사가 여러 개인 점포는 결과에서 자동으로 빠진다'], 'answer': 1,
         'explain': '한 점포에 행사가 2개면 그 점포의 주문 행이 각각 2번씩 붙어 합계가 두 배가 된다(팬아웃). 각 테이블을 점포 단위로 먼저 집계한 뒤 조인해야 한다.'},
        {'q': '카테고리별 매출 1위 상품을 고르는 쿼리에서 ROW_NUMBER 조건(rn = 1)을 바깥 쿼리에 두는 이유는?',
         'options': ['ROW_NUMBER는 ORDER BY보다 먼저 계산되어 순서가 없기 때문', '윈도우 함수는 SELECT 단계에서 계산되어 같은 쿼리의 WHERE에서 못 쓰기 때문', 'PARTITION BY를 쓰면 HAVING에서만 순위를 거를 수 있기 때문', '인라인 뷰가 없으면 ROW_NUMBER가 전체 행에 1만 매기기 때문'], 'answer': 1,
         'explain': 'WHERE는 SELECT보다 먼저 실행되므로 SELECT에서 계산한 윈도우 함수 결과를 볼 수 없다. 인라인 뷰나 CTE로 감싸 바깥에서 거른다.'},
        {'q': '월별 매출 표에서 3월 데이터가 아예 없을 때 LAG(total) OVER (ORDER BY month)로 구한 4월의 "전월 값"은?',
         'options': ['3월 값이 없으므로 NULL', '2월의 매출 값', '0으로 자동 채워진 값', '1월부터 2월까지의 평균'], 'answer': 1,
         'explain': 'LAG는 날짜가 아니라 정렬된 "직전 행"을 가리킨다. 3월 행이 없으면 4월의 직전 행은 2월이다. 달력 테이블에 LEFT JOIN해 빈 달을 만들어 두어야 한다.'},
    ],
    resources=['『SQL 전문가 가이드』(한국데이터산업진흥원) 2과목: 윈도우 함수, Top N 쿼리', 'Mode Analytics, 「SQL Tutorial: Advanced」 (mode.com/sql-tutorial)'],
    analogy='<p>엑셀 피벗 테이블과 같다. 먼저 "행에 무엇을, 열에 무엇을 놓을지"(결과 단위)를 정해야 표가 나온다. 영수증 묶음에 행사 안내문을 점포마다 끼워 넣고 영수증 금액을 더하면, 안내문이 두 장 든 점포는 금액이 두 번 더해진다. 그래서 점포별 합계를 먼저 내고 안내문은 따로 센다.</p>',
    points=['WHERE는 그룹 전 행 필터, HAVING은 그룹 후 필터. 실행 순서 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
            'RANK 1,1,3 / DENSE_RANK 1,1,2 / ROW_NUMBER 1,2,3',
            '외부 조인에서 오른쪽 테이블 조건을 WHERE에 쓰면 내부 조인과 같아진다',
            'COUNT(*)는 NULL 행도, COUNT(열)은 NULL이 아닌 값만 센다',
            '윈도우 함수는 WHERE·GROUP BY 뒤에 계산된다 → 결과로 거르려면 인라인 뷰'],
    interview=[
        {'q': '조인했더니 매출 합계가 실제보다 크게 나옵니다. 원인과 해결은요?', 'a': '<p>결과 단위보다 잘게 쪼개진 테이블이 1:N으로 붙으면서 행이 복제된 팬아웃일 가능성이 크다. 조인 전후로 <code>COUNT(*)</code>를 비교해 확인하고, 각 테이블을 결과 단위(예: 점포)로 먼저 집계한 뒤 조인하거나, 필요 없는 테이블은 <code>EXISTS</code>로 바꾼다.</p>'},
        {'q': '그룹별 상위 3개를 구하는 쿼리를 설명해 주세요.', 'a': '<p>인라인 뷰에서 <code>ROW_NUMBER() OVER (PARTITION BY 그룹 ORDER BY 값 DESC)</code>로 그룹마다 순위를 매기고, 바깥에서 <code>rn &lt;= 3</code>으로 거른다. 동점을 모두 포함해야 하면 RANK나 DENSE_RANK를 쓴다. 윈도우 함수는 같은 쿼리의 WHERE에서 쓸 수 없어서 감싸는 것이다.</p>'},
        {'q': '전월 대비 증감률은 어떻게 구하나요?', 'a': '<p>월 단위로 먼저 집계한 뒤 <code>LAG(합계) OVER (ORDER BY 월)</code>로 직전 달 값을 옆에 붙이고 (이번 달 - 직전 달) / 직전 달로 계산한다. 빠진 달이 있으면 LAG가 두 달 전을 가리키므로 달력 테이블을 기준으로 LEFT JOIN해 0을 채운다.</p>'},
    ],
    types=['SQL 분석']))

# 선분 이력 타임라인: 상품별 가격 구간을 막대로 그린다 (겹침·끊김 표시)
def timeline():
    import datetime as dt
    rows = [(101, '우유'), (103, '사과'), (105, '라면')]
    con_rows = {}
    from lib import db
    con = db(SCD)
    for iid, _ in rows:
        con_rows[iid] = con.execute('SELECT price, start_date, end_date FROM price_hist WHERE item_id = ? ORDER BY start_date', (iid,)).fetchall()
    d0, d1 = dt.date(2026, 1, 1), dt.date(2026, 5, 1)
    X0, W = 80, 480
    def x(s):
        d = min(dt.date.fromisoformat(s), d1)
        return X0 + W * (d - d0).days / (d1 - d0).days
    s = '<svg viewBox="0 0 600 230" width="600">'
    for m, label in enumerate(['1월', '2월', '3월', '4월']):
        mx = x('2026-%02d-01' % (m + 1))
        s += '<path class="e d" d="M%.0f,20 L%.0f,200"/><text x="%.0f" y="12" class="sm">%s</text>' % (mx, mx, mx + 20, label)
    for k, (iid, name) in enumerate(rows):
        y = 40 + k * 62
        s += '<text x="40" y="%d">%s</text>' % (y + 12, name)
        for j, (price, a, b) in enumerate(con_rows[iid]):
            yy = y + (24 if j % 2 else 0) if iid == 103 else y
            cls = 'h' if j % 2 else 'n'
            s += '<rect class="%s" x="%.0f" y="%d" width="%.0f" height="22" rx="3"/><text x="%.0f" y="%d" class="sm">%s원</text>' % (cls, x(a), yy, x(b) - x(a) if b < '9999' else X0 + W - x(a), (x(a) + (x(b) if b < '9999' else X0 + W)) / 2, yy + 11, format(price, ','))
    s += '<text x="300" y="212" class="sm">사과: 3/1~3/15 두 가격이 겹침 · 라면: 2/1~2/9 가격이 없음 · 끝이 열린 막대는 종료일 9999-12-31(현재 유효)</text>'
    return s + '</svg>'

# ---------------------------------------------------------------------------
p = Page('db-scd', '이력 관리: 선분 이력과 SCD', '시간에 따라 바뀌는 값(가격, 등급, 소속 조직)은 <strong>적용 기간</strong>(시작일·종료일)과 함께 저장한다 = 선분 이력\n<strong>SCD Type 1</strong>: 덮어쓰기(과거 사라짐) · <strong>Type 2</strong>: 새 행 추가 + 기간·현재 여부(과거 보존) · Type 3: 이전 값 열 하나\n시점 조회 <code>기준일 BETWEEN 시작일 AND 종료일</code> · 기간 겹침 조건 <code>A.시작 &lt;= B.종료 AND B.시작 &lt;= A.종료</code>', data=SCD)
p('''<p>상품 가격은 바뀌고, 고객 등급은 오르내리고, 직원은 부서를 옮긴다. 값을 그냥 덮어쓰면 "3월에 팔린 사과는 얼마였나", "작년 VIP 고객의 매출은 얼마였나"에 답할 수 없다. 그래서 바뀌는 값을 <strong>언제부터 언제까지 유효했는지</strong>와 함께 남긴다. 데이터 웨어하우스에서는 이 방식을 <strong>SCD</strong>(Slowly Changing Dimension, 천천히 변하는 차원)라 부르고, 업무 시스템에서는 <strong>선분 이력</strong>이라고 부른다.</p>
<h3>이력을 남기는 세 가지 모양</h3>
<table><tr><th>방식</th><th>저장하는 것</th><th>예</th><th>장단점</th></tr>
<tr><td><strong>스냅샷</strong></td><td>매일(매월) 전체 상태를 통째로 복사</td><td>월말 재고 테이블</td><td>조회가 가장 쉽다. 바뀌지 않은 행까지 매번 저장해 크다</td></tr>
<tr><td><strong>점 이력</strong></td><td>바뀐 시점(변경일)만 기록</td><td>가격 변경 로그: 3/1에 3,200원</td><td>저장은 작다. "3/5의 가격"을 찾으려면 3/5 이전 가장 최근 행을 찾는 서브쿼리가 필요</td></tr>
<tr><td><strong>선분 이력</strong></td><td>시작일과 종료일을 함께 기록</td><td>3,000원: 1/1~2/28, 3,200원: 3/1~9999-12-31</td><td>시점 조회가 <code>BETWEEN</code> 한 줄. 대신 바꿀 때 이전 행의 종료일도 닫아야 하고, 기간이 겹치거나 끊기지 않게 관리해야 한다</td></tr>
</table>
<p>현재 유효한 행의 종료일은 NULL 대신 <code>9999-12-31</code> 같은 먼 미래 날짜를 넣는 경우가 많다. NULL이면 <code>BETWEEN</code>이 UNKNOWN이 되어 현재 행이 빠지기 때문이다.</p>''')
p.sample('price_hist', ('cust_hist', 'SELECT * FROM cust_hist'))
p('<figure class="diagram">%s<figcaption>price_hist를 시간 축에 그린 것. 한 상품의 구간은 빈틈없이, 겹치지 않게 이어져야 한다. 예제 데이터에는 일부러 겹침(사과)과 끊김(라면)을 하나씩 넣었다.</figcaption></figure>' % timeline())

p('<h3>1. 시점 조회</h3>')
p.ex('2026-02-20 기준 가격', "SELECT item_id, price\nFROM price_hist\nWHERE '2026-02-20' BETWEEN start_date AND end_date;",
     '기준일이 시작일과 종료일 사이에 있는 행 하나가 그날의 값이다. 종료일을 포함(<code>&lt;=</code>)하는 규칙이므로 이전 행의 종료일은 다음 행 시작일의 <strong>하루 전</strong>이어야 한다.')
p.ex('현재 가격', "SELECT item_id, price\nFROM price_hist\nWHERE end_date = '9999-12-31';",
     '현재 행만 자주 찾는다면 <code>cur_flag = \'Y\'</code> 같은 현재 여부 열을 두기도 한다(cust_hist). 종료일 조건과 같은 뜻이지만 인덱스를 걸기 쉽다.')
p.ex('주문 당시 가격으로 금액 검증 (이력 조인)', "SELECT o.order_id, o.order_date, o.item_id, o.qty,\n       p.price, o.qty * p.price AS calc, o.amount\nFROM orders o\nJOIN price_hist p\n  ON p.item_id = o.item_id\n AND o.order_date BETWEEN p.start_date AND p.end_date\nWHERE o.item_id IN (101, 103)\nORDER BY o.order_id;",
     '조인 조건에 키뿐 아니라 <strong>기간</strong>을 함께 건다. 그래야 각 주문이 그날 유효했던 가격 한 행과만 짝지어진다. 그런데 9번 주문이 두 번 나왔다. 사과 가격 이력이 3/1~3/15에 겹쳐 있어서 두 행 모두 조건을 만족했기 때문이다. 5,000원 행으로 계산한 10,000원은 실제 결제 금액 11,000원과도 맞지 않는다. 겹침은 조인 결과를 복제해 매출을 부풀린다.')

p('<h3>2. 이력 데이터 점검: 겹침과 끊김</h3>')
p.ex('기간이 겹치는 행 찾기', "SELECT a.item_id,\n       a.price, a.start_date, a.end_date,\n       b.price AS b_price, b.start_date AS b_start, b.end_date AS b_end\nFROM price_hist a\nJOIN price_hist b\n  ON a.item_id = b.item_id\n AND a.start_date &lt; b.start_date   -- 같은 쌍을 한 번만\n AND b.start_date &lt;= a.end_date;".replace('&lt;', '<'),
     '두 구간 [A시작, A종료]와 [B시작, B종료]가 겹치는 일반 조건은 <code>A시작 &lt;= B종료 AND B시작 &lt;= A종료</code>다(서로 상대가 끝나기 전에 시작). 여기서는 A가 먼저 시작한 쌍만 보도록 <code>a.start_date &lt; b.start_date</code>를 걸었으므로 "B가 A의 종료일 이전에 시작"만 확인하면 된다. 시작일이 같은 행끼리도 겹침이므로 실무 점검에서는 고유 번호로 쌍을 구분하고 일반 조건을 쓴다.')
p.ex('기간이 끊긴 곳 찾기', "SELECT item_id, end_date, next_start\nFROM (SELECT item_id, end_date,\n             LEAD(start_date) OVER (PARTITION BY item_id\n                                    ORDER BY start_date) AS next_start\n      FROM price_hist)\nWHERE next_start > date(end_date, '+1 day');",
     '상품별로 시작일 순서로 줄 세우고 <code>LEAD</code>로 다음 행의 시작일을 옆에 붙인다. 다음 시작일이 "종료일 + 1일"보다 늦으면 그 사이에 값이 없는 구간이다. 라면은 2/1~2/9의 가격이 없다. 이 기간의 주문은 이력 조인에서 사라진다. 반대로 다음 시작일이 종료일 이하이면 겹침이다.')

p('''<h3>3. 바뀔 때 저장하는 방법: SCD 유형</h3>
<table><tr><th>유형</th><th>변경 시 하는 일</th><th>과거 조회</th><th>쓰는 곳</th></tr>
<tr><td>Type 0</td><td>바꾸지 않는다</td><td>처음 값만</td><td>생년월일, 최초 가입일</td></tr>
<tr><td><strong>Type 1</strong></td><td>기존 값을 <strong>덮어쓴다</strong></td><td>불가</td><td>오타 수정, 과거 분석에 의미 없는 값(전화번호)</td></tr>
<tr><td><strong>Type 2</strong></td><td>이전 행의 종료일을 닫고 <strong>새 행을 추가</strong>. 대리키, 시작일·종료일, 현재 여부</td><td>가능 (변경 횟수만큼 행이 는다)</td><td>고객 등급, 상품 가격, 소속 조직처럼 과거 기준 분석이 필요한 값</td></tr>
<tr><td>Type 3</td><td><code>prev_grade</code> 같은 열에 직전 값 하나만 보관</td><td>직전 1회만</td><td>조직 개편 직후 "개편 전 기준" 비교</td></tr>
<tr><td>Type 4 / 6</td><td>현재 테이블과 이력 테이블을 분리(4), 1·2·3을 섞음(6)</td><td>가능</td><td>현재 조회가 대부분이고 이력은 가끔일 때</td></tr>
</table>''')
p.ex('Type 1: 덮어쓰기', "UPDATE cust SET grade = 'VIP' WHERE cust_id = 501;", '501번 고객이 언제부터 VIP였는지, 그 전에는 무엇이었는지가 사라졌다. 이 테이블로 "1월 우수 고객의 매출"을 구하면 지금 등급으로 계산된다.', before=['cust'], after=['cust'])
p.ex('Type 2: 기존 행을 닫고 새 행 추가', "UPDATE cust_hist\n   SET end_date = '2026-03-31', cur_flag = 'N'\n WHERE cust_id = 501 AND cur_flag = 'Y';\n\nINSERT INTO cust_hist\nVALUES (8, 501, 'VIP', '2026-04-01', '9999-12-31', 'Y');",
     '두 문장은 반드시 한 트랜잭션으로 묶는다. UPDATE만 반영되고 INSERT가 실패하면 그 고객의 현재 행이 없어진다. <code>cust_sk</code>는 고객 번호와 별개인 <strong>대리키</strong>(surrogate key)다. 같은 고객이 여러 행을 가지므로 고객 번호만으로는 행을 구분할 수 없고, 팩트 테이블은 이 대리키를 저장해 "그때의 등급 행"을 가리킨다. 실무에서는 <code>MERGE</code> 문 하나로 처리하기도 한다.',
     before=[('cust_hist', 'SELECT * FROM cust_hist WHERE cust_id = 501')], after=[('cust_hist', 'SELECT * FROM cust_hist WHERE cust_id = 501')])

p('<h3>4. 그때 기준으로 볼 것인가, 지금 기준으로 볼 것인가</h3>')
p.ex('주문 당시 등급 기준 매출', "SELECT h.grade, COUNT(*) AS orders, SUM(o.amount) AS total\nFROM orders o\nJOIN cust_hist h\n  ON h.cust_id = o.cust_id\n AND o.order_date BETWEEN h.start_date AND h.end_date\nGROUP BY h.grade;",
     '주문일에 유효했던 등급 행과 조인한다. 501번 고객의 1~2월 주문은 "일반", 3월 주문은 "우수"로 집계된다. "등급 제도가 매출을 올렸나"처럼 그 시점의 상태로 판단해야 하는 분석은 이 방식이다.')
p.ex('현재 등급 기준 매출', "SELECT h.grade, COUNT(*) AS orders, SUM(o.amount) AS total\nFROM orders o\nJOIN cust_hist h\n  ON h.cust_id = o.cust_id\n AND h.cur_flag = 'Y'\nGROUP BY h.grade;",
     '같은 주문을 지금 등급으로 다시 묶었다. "현재 VIP 고객들은 과거에 얼마나 샀나"를 볼 때 쓴다. 두 결과의 합계는 같지만 등급별 숫자가 다르다. 보고서를 만들 때 어느 기준인지 반드시 밝혀야 하는 이유다.')

p('''<h3>설계할 때 정할 것</h3>
<ul>
<li><strong>종료일 포함 여부</strong>: 위 예제처럼 종료일을 포함하면(닫힌 구간) 다음 행은 종료일 + 1일에 시작한다. 시각까지 다루는 이력이라면 종료 시각을 포함하지 않는 <strong>반열린 구간</strong> <code>start &lt;= t AND t &lt; end</code>로 두고 다음 행의 시작을 이전 행의 종료와 같게 맞추는 편이 안전하다. 23:59:59 같은 경계값 실수가 없다.</li>
<li><strong>무엇을 이력으로 남길지</strong>: 모든 열을 Type 2로 관리하면 행이 폭증한다. 분석에 의미 있는 열(등급, 소속, 가격)만 Type 2로, 나머지는 Type 1로 섞는다.</li>
<li><strong>무결성 점검</strong>: 겹침·끊김 점검 쿼리를 적재 후 매번 돌린다. PostgreSQL은 <code>EXCLUDE USING gist</code> 제약으로 겹침 자체를 막을 수 있고, SQL:2011 표준은 기간(<code>PERIOD FOR</code>)과 시스템 버전 테이블을 정의한다(Oracle Flashback, SQL Server temporal table).</li>
<li><strong>변경 이력과의 구분</strong>: 누가 언제 무엇을 바꿨는지 남기는 <strong>감사 로그</strong>와는 목적이 다르다. 선분 이력은 "업무상 유효 기간"(유효 시간), 감사 로그는 "DB에 기록된 시각"(트랜잭션 시간)이다. 둘 다 가진 것을 이중 시간(bitemporal) 이력이라 한다.</li>
</ul>''')

PAGES.append(p.done(
    links=[{'to': 'db-dw', 'why': '차원 테이블의 변경을 관리하는 방법이 SCD'},
           {'to': 'db-modeling', 'why': '이력 테이블 추가는 반정규화·모델링 단계에서 결정한다'},
           {'to': 'db-sql-window', 'why': '끊김·겹침 점검에 쓰는 LEAD'},
           {'to': 'db-tx', 'why': 'Type 2 변경의 UPDATE와 INSERT는 한 트랜잭션이어야 한다'},
           {'to': 'db-governance', 'why': '이력 무결성 점검은 데이터 품질(일관성·유효성) 규칙'}],
    quiz=[
        {'q': '고객 등급이 바뀔 때 기존 행의 종료일을 닫고 새 등급 행을 추가하는 방식은?',
         'options': ['SCD Type 1', 'SCD Type 2', 'SCD Type 3', '스냅샷 이력'], 'answer': 1,
         'explain': 'Type 2는 새 행을 추가하고 기간(시작일·종료일)과 현재 여부로 구분해 과거를 모두 보존한다. Type 1은 덮어쓰기, Type 3은 직전 값 열 하나만 보관한다.'},
        {'q': '두 기간 [A시작, A종료]와 [B시작, B종료]가 하루라도 겹치는지 판별하는 조건은? (종료일 포함)',
         'options': ['A시작 <= B시작 AND A종료 >= B종료', 'A시작 <= B종료 AND B시작 <= A종료', 'A시작 >= B시작 AND A종료 <= B종료', 'A종료 < B시작 OR B종료 < A시작'], 'answer': 1,
         'explain': '서로 상대가 끝나기 전에 시작하면 겹친다. ①과 ③은 한쪽이 다른 쪽을 완전히 포함하는 경우만, ④는 겹치지 않는 조건이다.'},
        {'q': '선분 이력에서 현재 유효한 행의 종료일을 NULL 대신 9999-12-31로 두는 주된 이유는?',
         'options': ['NULL은 날짜 열에 저장할 수 없기 때문', '기준일 BETWEEN 시작일 AND 종료일 조건이 NULL이면 참이 되지 않기 때문', '9999-12-31을 넣어야 기본키가 유일해지기 때문', 'NULL을 쓰면 시작일 인덱스를 사용할 수 없기 때문'], 'answer': 1,
         'explain': 'NULL과의 비교는 UNKNOWN이라 BETWEEN 조건을 통과하지 못하고 현재 행이 시점 조회에서 빠진다. 먼 미래 날짜를 넣으면 같은 조건 하나로 과거와 현재를 모두 찾는다.'},
        {'q': '가격 이력에 기간이 겹치는 두 행이 있을 때 주문과 가격 이력을 기간 조건으로 조인하면 생기는 일은?',
         'options': ['겹친 기간의 주문이 두 행으로 복제되어 매출이 부풀어 오른다', '겹친 기간의 주문은 짝이 없어 결과에서 빠진다', 'DBMS가 기간 중복을 감지해 조인 오류를 낸다', '두 가격의 평균으로 자동 계산되어 한 행이 된다'], 'answer': 0,
         'explain': '겹친 기간의 주문은 두 이력 행 모두와 조건이 맞아 두 번 나온다. 기간이 끊긴 경우는 반대로 짝이 없어 주문이 빠진다.'},
    ],
    resources=['Ralph Kimball, 『The Data Warehouse Toolkit』 5장(SCD 기법)', '『SQL 전문가 가이드』 1과목: 이력 데이터 모델(선분 이력, 점 이력)', 'Richard Snodgrass, 『Developing Time-Oriented Database Applications in SQL』'],
    analogy='<p>회사 조직도를 해마다 액자로 걸어 두는 것과 같다. 올해 조직도만 남기고 작년 것을 버리면(Type 1) "작년 영업팀 실적"을 작년 팀원 기준으로 다시 셀 수 없다. 액자마다 "2025.1.1~2025.12.31"처럼 걸려 있던 기간을 적어 두면(Type 2) 어느 날짜를 대도 그날의 조직도를 바로 꺼낼 수 있다. 단, 두 액자의 기간이 겹치거나 비어 있으면 그날의 조직도가 두 개이거나 없는 셈이 된다.</p>',
    points=['SCD Type 1 덮어쓰기(이력 없음), Type 2 행 추가 + 기간·현재 여부·대리키(완전 이력), Type 3 이전 값 열(직전 1회)',
            '선분 이력 = 시작일 + 종료일, 점 이력 = 변경 시점만. 선분 이력은 시점 조회가 BETWEEN 한 줄',
            '기간 겹침 조건: A.시작 <= B.종료 AND B.시작 <= A.종료',
            '현재 행 종료일은 9999-12-31 (NULL이면 BETWEEN에서 빠짐)',
            '이력 조인은 키 + 기간 조건. 겹침 → 행 복제, 끊김 → 행 누락'],
    interview=[
        {'q': '상품 가격처럼 바뀌는 값은 어떻게 저장하나요?', 'a': '<p>가격, 시작일, 종료일을 함께 저장하는 선분 이력으로 관리한다. 가격이 바뀌면 현재 행의 종료일을 변경 전날로 닫고 새 행을 추가하며, 두 작업은 한 트랜잭션으로 묶는다. 그러면 주문일과 기간 조건으로 조인해 주문 당시 가격을 구할 수 있다. 적재 후에는 같은 상품의 기간이 겹치거나 끊기지 않았는지 점검 쿼리를 돌린다.</p>'},
        {'q': 'SCD Type 1과 Type 2는 어떻게 고르나요?', 'a': '<p>과거 시점 기준의 분석이 필요한지로 정한다. 오타 수정이나 연락처처럼 과거 값이 분석에 의미가 없으면 Type 1로 덮어쓴다. 고객 등급, 소속 조직, 가격처럼 "그때 기준"으로 실적을 봐야 하는 속성은 Type 2로 행을 추가한다. 모든 열을 Type 2로 하면 행이 폭증하므로 열마다 섞어서 정한다.</p>'},
        {'q': '이력 데이터에 기간이 겹친 행이 있으면 어떤 문제가 생기나요?', 'a': '<p>기간 조건으로 조인할 때 한 거래가 두 이력 행과 모두 짝지어져 행이 복제되고 합계가 부풀어 오른다. 셀프 조인으로 <code>A.시작 &lt;= B.종료 AND B.시작 &lt;= A.종료</code>인 쌍을 찾거나 LEAD로 다음 행 시작일과 비교해 찾아내고, 가능하면 제약 조건으로 막는다.</p>'},
    ],
    types=['이력 관리']))
