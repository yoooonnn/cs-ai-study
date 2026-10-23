# 여러 테이블·여러 단계: 조인, 서브쿼리와 집합 연산, 윈도우 함수
from lib import Page, q

PAGES = []

# 조인 벤 다이어그램: (제목, 왼쪽 원 칠함, 교집합 칠함, 오른쪽 원 칠함)
def venn():
    panels = [('INNER', 0, 1, 0), ('LEFT', 1, 1, 0), ('RIGHT', 0, 1, 1), ('FULL', 1, 1, 1), ('LEFT − 교집합', 1, 0, 0)]
    s = '<svg viewBox="0 0 620 120" width="620"><defs>'
    s += ''.join('<clipPath id="vj%d"><circle cx="%d" cy="52" r="32"/></clipPath>' % (i, 44 + i * 124) for i in range(5))
    s += '</defs>'
    for i, (t, a, m, b) in enumerate(panels):
        x = 44 + i * 124
        if a: s += '<circle class="h" cx="%d" cy="52" r="32"/>' % x
        if b: s += '<circle class="h" cx="%d" cy="52" r="32"/>' % (x + 34)
        if a and not m: s += '<circle class="n" cx="%d" cy="52" r="32" clip-path="url(#vj%d)"/>' % (x + 34, i)
        if m and not (a or b): s += '<circle class="h" cx="%d" cy="52" r="32" clip-path="url(#vj%d)"/>' % (x + 34, i)
        s += '<circle class="e" cx="%d" cy="52" r="32"/><circle class="e" cx="%d" cy="52" r="32"/>' % (x, x + 34)
        s += '<text x="%d" y="100">%s</text><text x="%d" y="52" class="sm">A</text><text x="%d" y="52" class="sm">B</text>' % (x + 17, t, x - 14, x + 48)
    return s + '</svg>'

# ---------------------------------------------------------------------------
p = Page('db-sql-join', '조인: INNER·OUTER·CROSS·SELF', '조인 = 두 테이블의 행을 조건(<code>ON</code>)으로 짝지어 한 행으로\n<code>INNER</code>: 짝 있는 행만 · <code>LEFT</code>/<code>RIGHT</code>/<code>FULL OUTER</code>: 짝 없는 행도 NULL로 채워 남김\n<code>CROSS</code>: 모든 쌍 · <code>SELF</code>: 같은 테이블끼리 · 비등가 조인: 범위 조건')
p('<p>emp의 <code>dept_id</code>가 dept의 <code>dept_id</code>를 가리킨다. 짝이 없는 행이 양쪽에 하나씩 있다: 부서가 없는 직원 <strong>한지민</strong>(dept_id NULL)과 직원이 없는 부서 <strong>기획</strong>(40). 조인 종류에 따라 이 둘이 결과에 남는지가 달라진다.</p>')
p.sample(('emp', 'SELECT emp_id, name, dept_id, salary, manager_id FROM emp'), 'dept', 'salgrade')
p('<figure class="diagram">%s<figcaption>A = emp(왼쪽), B = dept(오른쪽). 색칠한 부분이 결과에 남는 행. 마지막은 LEFT JOIN 후 <code>WHERE B.키 IS NULL</code>로 "짝이 없는 행만" 고른 것.</figcaption></figure>' % venn())

p('<h3>1. 내부 조인 (INNER JOIN)</h3>')
p.ex('직원과 부서 이름', "SELECT e.name, d.dept_name\nFROM emp e\nINNER JOIN dept d ON e.dept_id = d.dept_id;",
     '양쪽에 짝이 있는 7행. 한지민(부서 없음)과 기획(직원 없음)은 빠졌다. <code>INNER</code>는 생략해 <code>JOIN</code>만 써도 된다. <code>emp e</code>의 <code>e</code>는 테이블 별칭으로, 두 테이블에 같은 이름의 열(dept_id)이 있을 때 어느 쪽인지 밝히는 데 쓴다.')
p.ex('예전 문법: FROM 절에 쉼표, 조건은 WHERE', "SELECT e.name, d.dept_name\nFROM emp e, dept d\nWHERE e.dept_id = d.dept_id\n  AND d.loc = '서울';",
     '<code>FROM a, b WHERE 조인조건</code>은 내부 조인과 같다(Oracle 코드와 필기 문제에서 자주 보인다). 조인 조건을 빠뜨리면 모든 쌍이 만들어진다(아래 CROSS JOIN).')
p.ex('USING과 NATURAL JOIN', "SELECT name, dept_name\nFROM emp\nNATURAL JOIN dept;",
     '<code>NATURAL JOIN</code>은 <strong>이름이 같은 모든 열</strong>로 자동으로 등가 조인한다(여기서는 dept_id 하나). <code>JOIN dept USING (dept_id)</code>와 같다. 두 방식 모두 공통 열이 결과에 한 번만 나오고, 그 열 앞에 테이블 별칭을 붙일 수 없다(Oracle). 나중에 같은 이름의 열이 추가되면 조건이 몰래 바뀌므로 실무에서는 <code>ON</code>을 권한다.')

p('<h3>2. 외부 조인 (OUTER JOIN)</h3>')
p.ex('LEFT JOIN: 왼쪽(emp)은 모두', "SELECT e.name, d.dept_name\nFROM emp e\nLEFT JOIN dept d ON e.dept_id = d.dept_id;",
     '8행. 짝이 없는 한지민의 dept_name은 NULL로 채워졌다. <code>LEFT OUTER JOIN</code>과 같다.')
p.ex('RIGHT JOIN: 오른쪽(dept)은 모두', "SELECT e.name, d.dept_name\nFROM emp e\nRIGHT JOIN dept d ON e.dept_id = d.dept_id;",
     '직원이 없는 기획 부서가 name = NULL로 남았다. <code>A RIGHT JOIN B</code>는 <code>B LEFT JOIN A</code>와 같아서 실무에서는 LEFT로 통일해 쓰는 경우가 많다.')
p.ex('FULL OUTER JOIN: 양쪽 모두', "SELECT e.name, d.dept_name\nFROM emp e\nFULL OUTER JOIN dept d ON e.dept_id = d.dept_id;",
     '7(짝 있음) + 1(한지민) + 1(기획) = 9행. MySQL은 FULL OUTER JOIN이 없어서 LEFT JOIN과 RIGHT JOIN을 <code>UNION</code>으로 합친다.')
p.ex('Oracle의 (+) 표기', "SELECT e.name, d.dept_name\nFROM emp e, dept d\nWHERE e.dept_id = d.dept_id(+);",
     '<code>(+)</code>는 <strong>NULL로 채워지는 쪽</strong>(짝이 없을 수 있는 쪽)에 붙인다. 위 식은 dept 쪽에 붙었으므로 emp가 모두 남는 LEFT JOIN이다. 헷갈리기 쉬운 필기 포인트: (+)가 붙은 반대쪽 테이블이 기준이다.',
     run="SELECT e.name, d.dept_name FROM emp e LEFT JOIN dept d ON e.dept_id = d.dept_id")
p.ex('짝이 없는 행만: 안티 조인', "SELECT d.dept_name\nFROM dept d\nLEFT JOIN emp e ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;",
     '"직원이 한 명도 없는 부서". LEFT JOIN 결과에서 오른쪽이 NULL로 채워진 행만 남긴다. <code>NOT EXISTS</code>로도 쓸 수 있다(<a href="#/t/db-sql-subquery">서브쿼리</a>).')
p.ex('부서별 인원: COUNT(*)가 아니라 COUNT(열)', "SELECT d.dept_name,\n       COUNT(*)        AS count_star,\n       COUNT(e.emp_id) AS count_emp\nFROM dept d\nLEFT JOIN emp e ON e.dept_id = d.dept_id\nGROUP BY d.dept_id, d.dept_name;",
     '기획 부서는 LEFT JOIN으로 NULL이 채워진 행이 1개 있으므로 <code>COUNT(*)</code>는 1이 된다. 직원 수는 <code>COUNT(e.emp_id)</code>로 세야 0이 나온다.')

p('<h3>3. 외부 조인에서 ON과 WHERE의 차이</h3>')
p.ex('조건을 ON에: 부서는 모두 남는다', "SELECT d.dept_name, e.name\nFROM dept d\nLEFT JOIN emp e\n  ON e.dept_id = d.dept_id AND e.salary >= 5000;",
     'ON의 조건은 "어떤 직원을 짝으로 붙일지"만 정한다. 5000 이상인 직원이 없는 인사·기획 부서도 NULL과 함께 남는다.')
p.ex('조건을 WHERE에: 사실상 내부 조인', "SELECT d.dept_name, e.name\nFROM dept d\nLEFT JOIN emp e ON e.dept_id = d.dept_id\nWHERE e.salary >= 5000;",
     'WHERE는 조인이 끝난 <strong>뒤에</strong> 행을 거른다. NULL로 채워진 행은 <code>NULL &gt;= 5000</code>이 UNKNOWN이라 모두 사라진다. 짝 없는 행을 남기고 싶다면 오른쪽 테이블 조건은 ON에 쓴다.')

p('<h3>4. 교차 조인 (CROSS JOIN)</h3>')
p.ex('모든 조합 만들기', "SELECT c.color, s.size\nFROM color c\nCROSS JOIN size s;",
     '2행 × 3행 = 6행(카티션 곱). 조건 없이 모든 쌍을 만든다. 옵션 조합표나 날짜 × 상품 같은 빈 틀을 만들 때 쓴다. 조인 조건을 실수로 빠뜨리면 이렇게 행 수가 곱으로 불어난다.',
     setup="CREATE TABLE color (color TEXT); INSERT INTO color VALUES ('검정'), ('흰색');\nCREATE TABLE size (size TEXT); INSERT INTO size VALUES ('S'), ('M'), ('L');",
     side=['color', 'size'])

p('<h3>5. 셀프 조인과 비등가 조인</h3>')
p.ex('셀프 조인: 직원과 상사 이름', "SELECT e.name AS employee, m.name AS manager\nFROM emp e\nLEFT JOIN emp m ON e.manager_id = m.emp_id;",
     '같은 emp를 직원용(e)과 상사용(m) 별칭 두 개로 조인한다. 상사가 없는 부장 2명도 남기려고 LEFT JOIN을 썼다.')
p.ex('비등가 조인: 연봉 등급', "SELECT e.name, e.salary, g.grade\nFROM emp e\nJOIN salgrade g ON e.salary BETWEEN g.lo AND g.hi\nORDER BY g.grade DESC;",
     '조인 조건이 <code>=</code>가 아닌 범위 조건이다. 각 직원의 급여가 들어가는 구간의 등급과 짝지어진다.')
p.ex('세 테이블 조인', "SELECT e.name, d.dept_name, g.grade\nFROM emp e\nJOIN dept d     ON e.dept_id = d.dept_id\nJOIN salgrade g ON e.salary BETWEEN g.lo AND g.hi\nWHERE d.loc = '서울'\nORDER BY e.name;",
     '조인을 이어 붙이면 앞의 조인 결과에 다음 테이블을 붙인다. N개 테이블을 빠짐없이 연결하려면 조인 조건이 최소 N − 1개 필요하다.')

PAGES.append(p.done(
    links=[{'to': 'db-algebra', 'why': '조인은 관계대수의 ⋈(세타 조인·동등 조인·자연 조인)'},
           {'to': 'db-sql-subquery', 'why': 'IN·EXISTS로 쓰는 세미 조인과 NOT EXISTS 안티 조인'},
           {'to': 'db-plan', 'why': 'DBMS가 조인을 실제로 계산하는 방법: 중첩 루프·해시·정렬 병합'}],
    quiz=[
        {'q': 'emp(8행, 그중 dept_id가 NULL인 행 1개)와 dept(4행, 그중 직원이 없는 부서 1개)를 dept_id로 <code>FULL OUTER JOIN</code>한 결과 행 수는?',
         'options': ['9', '7', '8', '32'], 'answer': ['9', '7', '8', '32'].index(str(q("SELECT COUNT(*) FROM emp e FULL JOIN dept d ON e.dept_id = d.dept_id")[0])),
         'explain': '짝 있는 7행 + 왼쪽에만 있는 1행 + 오른쪽에만 있는 1행 = 9행. 32는 CROSS JOIN(8 × 4).'},
        {'q': "<code>FROM emp e, dept d WHERE e.dept_id = d.dept_id(+)</code>와 같은 조인은?",
         'options': ['emp LEFT JOIN dept', 'emp RIGHT JOIN dept', 'emp FULL JOIN dept', 'emp INNER JOIN dept'], 'answer': 0,
         'explain': '(+)는 NULL로 채워질 쪽(dept)에 붙는다. 따라서 emp가 모두 남는 LEFT OUTER JOIN이다.'},
        {'q': 'LEFT JOIN에서 오른쪽 테이블에 대한 조건을 ON이 아니라 WHERE에 쓰면 생기는 일은?',
         'options': ['짝 없는 행이 걸러져 내부 조인처럼 된다', '왼쪽 테이블의 행도 모두 NULL로 바뀐다', '조건이 무시되고 모든 행이 그대로 남는다', '문법 오류가 발생해 실행되지 않는다'], 'answer': 0,
         'explain': 'WHERE는 조인 후에 실행된다. NULL로 채운 행은 오른쪽 열 조건이 UNKNOWN이 되어 사라진다.'},
        {'q': '3행 테이블과 5행 테이블을 <code>CROSS JOIN</code>하면 결과 행 수는?', 'options': ['15', '8', '5', '3'], 'answer': 0,
         'explain': '교차 조인은 모든 행 쌍을 만든다: 3 × 5 = 15.'},
    ],
    resources=['『SQL 전문가 가이드』 — 조인, 표준 조인(ANSI/ISO SQL)', 'SQLite 문서 — SELECT: join-operator', '프로그래머스 SQL 고득점 Kit — JOIN']))

# ---------------------------------------------------------------------------
p = Page('db-sql-subquery', '서브쿼리·CTE·집합 연산', '서브쿼리 = 쿼리 안의 쿼리: 값 하나(스칼라) · 여러 행(<code>IN</code>·<code>ANY</code>·<code>ALL</code>) · 테이블(인라인 뷰)\n상관 서브쿼리: 바깥 행마다 다시 계산 · <code>EXISTS</code>: 존재 여부만\n<code>NOT IN</code> + NULL → 결과 없음 · 집합 연산 <code>UNION</code>·<code>INTERSECT</code>·<code>EXCEPT</code>')
p.sample('emp', 'dept')

p('<h3>1. 값 하나를 돌려주는 서브쿼리</h3>')
p.ex('평균보다 많이 받는 직원', "SELECT name, salary\nFROM emp\nWHERE salary > (SELECT AVG(salary) FROM emp);",
     '괄호 안이 먼저 계산되어 4675가 되고, 바깥은 <code>WHERE salary &gt; 4675</code>가 된다. <code>=</code>, <code>&gt;</code> 같은 단일 비교 연산자 옆의 서브쿼리는 반드시 <strong>한 행</strong>만 돌려줘야 한다. 여러 행이 나오면 오류(Oracle: <code>ORA-01427</code>).')
p.ex('SELECT 절의 스칼라 서브쿼리', "SELECT name, salary,\n       salary - (SELECT AVG(salary) FROM emp) AS diff\nFROM emp\nWHERE dept_id = 20;", '')
p.ex('상관 서브쿼리: 부서별 인원', "SELECT d.dept_name,\n       (SELECT COUNT(*) FROM emp e\n         WHERE e.dept_id = d.dept_id) AS cnt\nFROM dept d;",
     '서브쿼리가 바깥의 <code>d.dept_id</code>를 참조하므로 dept의 <strong>각 행마다</strong> 다시 계산된다. 이런 것을 상관(correlated) 서브쿼리라고 한다. 조인 + GROUP BY와 달리 0명인 기획도 0으로 나온다.')
p.ex('상관 서브쿼리: 자기 부서 평균보다 많이 받는 직원', "SELECT e.name, e.dept_id, e.salary\nFROM emp e\nWHERE e.salary > (SELECT AVG(salary)\n                  FROM emp\n                  WHERE dept_id = e.dept_id);",
     '각 직원에 대해 그 직원 부서의 평균을 구해 비교한다. 10번 평균 5500 → 김민준, 20번 평균 약 4567 → 최유나. 30번은 1명뿐이라 자기 자신이 평균이고, 한지민은 <code>dept_id = NULL</code>이 참이 아니라 평균이 NULL이 되어 빠진다.')

p('<h3>2. 여러 행을 돌려주는 서브쿼리: IN · ANY · ALL</h3>')
p.ex('IN: 서울에 있는 부서의 직원', "SELECT name, dept_id\nFROM emp\nWHERE dept_id IN (SELECT dept_id FROM dept WHERE loc = '서울');",
     '서브쿼리 결과(10, 30) 중 하나와 같으면 참.')
p.ex('> ALL: 모두보다 크다 = 최댓값보다 크다', "SELECT name, salary\nFROM emp\nWHERE salary > ALL (SELECT salary FROM emp WHERE dept_id = 20);",
     '20번 부서의 급여(6500, 3600, 3600) <strong>모두</strong>보다 큰 = 6500보다 큰 직원. <code>&gt; ALL</code> = <code>&gt; MAX</code>, <code>&lt; ALL</code> = <code>&lt; MIN</code>.',
     run="SELECT name, salary FROM emp WHERE salary > (SELECT MAX(salary) FROM emp WHERE dept_id = 20)")
p.ex('> ANY: 하나라도보다 크다 = 최솟값보다 크다', "SELECT name, salary\nFROM emp\nWHERE salary > ANY (SELECT salary FROM emp WHERE dept_id = 20);",
     '20번 급여 중 <strong>하나라도</strong>보다 크면 참 = 최솟값 3600보다 큰 직원. <code>&gt; ANY</code> = <code>&gt; MIN</code>. <code>= ANY</code>는 <code>IN</code>과 같다. <code>SOME</code>은 ANY와 같은 뜻.',
     run="SELECT name, salary FROM emp WHERE salary > (SELECT MIN(salary) FROM emp WHERE dept_id = 20)")

p('<h3>3. EXISTS와 NOT IN의 함정</h3>')
p.ex('EXISTS: 직원이 있는 부서', "SELECT d.dept_name\nFROM dept d\nWHERE EXISTS (SELECT 1 FROM emp e WHERE e.dept_id = d.dept_id);",
     'EXISTS는 서브쿼리가 <strong>한 행이라도 돌려주면 참</strong>이다. 무슨 값인지는 보지 않으므로 <code>SELECT 1</code>처럼 쓴다. 조인과 달리 직원이 여러 명이어도 부서가 한 번만 나온다(세미 조인).')
p.ex('NOT IN: 결과가 비어 버린다', "SELECT dept_name\nFROM dept\nWHERE dept_id NOT IN (SELECT dept_id FROM emp);",
     '"직원이 없는 부서"를 의도했지만 <strong>결과가 없다</strong>. 서브쿼리 결과에 한지민의 NULL이 섞여 있기 때문이다. <code>40 NOT IN (10, 20, 30, NULL)</code>은 <code>40 &lt;&gt; 10 AND ... AND 40 &lt;&gt; NULL</code>이고, 마지막이 UNKNOWN이라 전체가 참이 될 수 없다.')
p.ex('NOT EXISTS로 고치기', "SELECT d.dept_name\nFROM dept d\nWHERE NOT EXISTS (SELECT 1 FROM emp e WHERE e.dept_id = d.dept_id);",
     'NOT EXISTS는 NULL에 영향받지 않는다. 서브쿼리에 NULL이 섞일 수 있으면 NOT IN 대신 NOT EXISTS를 쓰거나, 서브쿼리에 <code>WHERE dept_id IS NOT NULL</code>을 붙인다.')

p('<h3>4. 테이블처럼 쓰는 서브쿼리: 인라인 뷰와 WITH</h3>')
p.ex('FROM 절의 서브쿼리(인라인 뷰)', "SELECT d.dept_name, a.avg_sal\nFROM (SELECT dept_id, ROUND(AVG(salary)) AS avg_sal\n      FROM emp\n      GROUP BY dept_id) a\nJOIN dept d ON d.dept_id = a.dept_id\nWHERE a.avg_sal >= 4700;",
     '부서별 평균을 먼저 테이블처럼 만든 뒤 조인한다. 인라인 뷰 안에서 만든 별칭(avg_sal)은 바깥에서 일반 열처럼 쓸 수 있다.')
p.ex('WITH (CTE): 같은 것을 이름 붙여 먼저 쓰기', "WITH dept_avg AS (\n  SELECT dept_id, ROUND(AVG(salary)) AS avg_sal\n  FROM emp\n  GROUP BY dept_id\n)\nSELECT d.dept_name, a.avg_sal\nFROM dept_avg a\nJOIN dept d ON d.dept_id = a.dept_id\nWHERE a.avg_sal >= 4700;",
     '결과는 위와 같다. 서브쿼리를 위로 빼서 이름을 붙이므로 위에서 아래로 읽을 수 있고, 같은 CTE를 여러 번 참조할 수 있다.')
p.ex('재귀 CTE: 조직도 내려가기', "WITH RECURSIVE org (emp_id, name, lvl) AS (\n  SELECT emp_id, name, 1 FROM emp WHERE emp_id = 1     -- 시작: 김민준\n  UNION ALL\n  SELECT e.emp_id, e.name, o.lvl + 1\n  FROM emp e JOIN org o ON e.manager_id = o.emp_id     -- 바로 아래 직원\n)\nSELECT name, lvl FROM org ORDER BY lvl, emp_id;",
     '첫 SELECT가 시작 행, UNION ALL 아래가 "직전 결과에서 한 단계 내려가는" 규칙이다. 새 행이 안 나올 때까지 반복한다. 김민준 → 이서연·윤도윤·한지민 → 박지호. Oracle의 계층 질의 <code>START WITH emp_id = 1 CONNECT BY PRIOR emp_id = manager_id</code>가 같은 일을 한다(<code>LEVEL</code>이 lvl).')

p('<h3>5. 집합 연산: UNION · INTERSECT · EXCEPT</h3>')
p('<p>두 SELECT 결과를 행 단위로 합치거나 비교한다. 두 SELECT의 <strong>열 개수와 타입이 맞아야</strong> 하고, 결과의 열 이름은 첫 번째 SELECT를 따른다. ORDER BY는 맨 끝에 한 번만 쓴다. 아래는 10번 부서 직급(부장, 과장, 대리)과 20번 부서 직급(부장, 사원, 사원)을 비교한다.</p>')
p.ex('UNION: 합집합, 중복 제거', "SELECT job FROM emp WHERE dept_id = 10\nUNION\nSELECT job FROM emp WHERE dept_id = 20\nORDER BY job;", '부장이 양쪽에 있고 사원이 두 번 있지만 한 번씩만 남았다.')
p.ex('UNION ALL: 중복 그대로', "SELECT job FROM emp WHERE dept_id = 10\nUNION ALL\nSELECT job FROM emp WHERE dept_id = 20\nORDER BY job;",
     '3 + 3 = 6행. 중복 제거를 위한 정렬·해시가 없어 빠르다. 중복이 없다는 것을 알거나 중복도 필요할 때는 UNION ALL.')
p.ex('INTERSECT: 교집합', "SELECT job FROM emp WHERE dept_id = 10\nINTERSECT\nSELECT job FROM emp WHERE dept_id = 20;", '')
p.ex('EXCEPT (Oracle: MINUS): 차집합', "SELECT job FROM emp WHERE dept_id = 10\nEXCEPT\nSELECT job FROM emp WHERE dept_id = 20\nORDER BY job;",
     '10번에는 있고 20번에는 없는 직급. <strong>순서를 바꾸면 결과가 달라진다</strong>(20 EXCEPT 10 = 사원). Oracle은 <code>MINUS</code>라고 쓴다.')

PAGES.append(p.done(
    links=[{'to': 'db-sql-join', 'why': 'IN·EXISTS는 조인으로, NOT EXISTS는 LEFT JOIN + IS NULL로 바꿔 쓸 수 있다'},
           {'to': 'db-sql-window', 'why': '부서별 평균 비교·순위는 윈도우 함수로 더 간단히'},
           {'to': 'db-algebra', 'why': '집합 연산(∪, ∩, −)과 나누기(÷)'}],
    quiz=[
        {'q': '서브쿼리 결과가 <code>(10, 20, NULL)</code>일 때 <code>WHERE x NOT IN (서브쿼리)</code>의 결과는?',
         'options': ['아무 행도 반환되지 않는다', '10과 20이 아닌 모든 행이 반환된다', 'x가 NULL인 행만 반환된다', '실행 중 오류가 발생한다'], 'answer': 0,
         'explain': 'x NOT IN (10, 20, NULL) = x≠10 AND x≠20 AND x≠NULL. 마지막이 항상 UNKNOWN이라 전체가 참이 될 수 없다.'},
        {'q': '<code>salary &gt; ALL (SELECT salary FROM emp WHERE dept_id = 20)</code>과 같은 조건은?',
         'options': ['20번 부서의 최고 급여보다 크다', '20번 부서의 최저 급여보다 크다', '20번 부서의 평균 급여보다 크다', '20번 부서의 급여 중 하나와 같다'], 'answer': 0,
         'explain': '모든 값보다 크다 = 최댓값보다 크다. &gt; ANY는 최솟값보다 크다, = ANY는 IN과 같다.'},
        {'q': '바깥 쿼리의 행마다 다시 실행되는 서브쿼리를 무엇이라 하는가?',
         'options': ['상관 서브쿼리', '스칼라 서브쿼리', '인라인 뷰', '중첩 뷰'], 'answer': 0,
         'explain': '서브쿼리가 바깥 테이블의 열을 참조하면 바깥 행마다 값이 달라지므로 다시 평가해야 한다.'},
        {'q': '결과 행이 3개, 4개인 두 SELECT를 <code>UNION ALL</code>한 결과 행 수는?', 'options': ['7', '3', '4', '최대 7, 중복만큼 적음'], 'answer': 0,
         'explain': 'UNION ALL은 중복을 제거하지 않고 이어 붙인다. 중복을 제거하는 UNION이라면 7 이하.'},
    ],
    resources=['『SQL 전문가 가이드』 — 서브쿼리, 집합 연산자, 계층형 질의', 'PostgreSQL 문서 — WITH Queries (Common Table Expressions)', '프로그래머스 SQL 고득점 Kit — IS NULL, JOIN']))

# ---------------------------------------------------------------------------
p = Page('db-sql-window', '윈도우 함수: 순위·누적·이전 행', '<code>함수() OVER (PARTITION BY 그룹 ORDER BY 순서)</code>\nGROUP BY와 달리 <strong>행 수를 줄이지 않고</strong> 각 행 옆에 계산 결과를 붙임\n순위 <code>ROW_NUMBER</code>·<code>RANK</code>·<code>DENSE_RANK</code> · 누적 <code>SUM() OVER</code> · 이전/다음 행 <code>LAG</code>·<code>LEAD</code>')
p('<p>GROUP BY는 그룹마다 한 행으로 줄인다. 그래서 "부서 평균과 각 직원의 급여를 나란히" 보려면 서브쿼리나 조인이 필요했다. 윈도우 함수는 각 행이 자기 주변 행들(윈도우)을 보고 값을 계산하되 행은 그대로 둔다.</p>')
p.sample('emp', 'sales')

p('<h3>1. 순위 함수</h3>')
p.ex('ROW_NUMBER · RANK · DENSE_RANK 비교', "SELECT name, salary,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,\n       RANK()       OVER (ORDER BY salary DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense\nFROM emp;",
     '3600인 정하준·강수아가 동점이다. <code>ROW_NUMBER</code>는 동점에도 다른 번호(6, 7, 순서는 정해지지 않음), <code>RANK</code>는 같은 순위 후 <strong>건너뛰고</strong>(6, 6, 8), <code>DENSE_RANK</code>는 <strong>건너뛰지 않는다</strong>(6, 6, 7).')
p.ex('PARTITION BY: 부서 안에서의 순위', "SELECT dept_id, name, salary,\n       RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk\nFROM emp\nWHERE dept_id IS NOT NULL;",
     '<code>PARTITION BY</code>는 GROUP BY처럼 행을 나누지만 합치지 않는다. 부서가 바뀌면 순위가 1부터 다시 시작한다.')
p.ex('부서별 1등만: 인라인 뷰로 감싸기', "SELECT dept_id, name, salary\nFROM (SELECT dept_id, name, salary,\n             ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rn\n      FROM emp\n      WHERE dept_id IS NOT NULL) t\nWHERE rn = 1;",
     '윈도우 함수는 SELECT 단계에서 계산되므로 같은 쿼리의 WHERE에서는 쓸 수 없다. 한 번 감싸서 바깥에서 거른다. "그룹별 상위 N개"의 정석 패턴이다.')

p('<h3>2. 집계 함수를 윈도우로</h3>')
p.ex('각 행 옆에 부서 평균', "SELECT name, dept_id, salary,\n       ROUND(AVG(salary) OVER (PARTITION BY dept_id)) AS dept_avg,\n       salary - ROUND(AVG(salary) OVER (PARTITION BY dept_id)) AS diff\nFROM emp\nWHERE dept_id IS NOT NULL;",
     'ORDER BY 없이 PARTITION BY만 쓰면 파티션 전체가 윈도우다. 서브쿼리 페이지의 "자기 부서 평균보다 많이 받는 직원"을 이렇게 쓰면 테이블을 한 번만 읽는다.')
p.ex('전체 대비 비율', "SELECT region, month, amount,\n       SUM(amount) OVER (PARTITION BY region) AS region_total,\n       ROUND(100.0 * amount / SUM(amount) OVER (PARTITION BY region), 1) AS pct\nFROM sales\nWHERE region = '서울';",
     '<code>OVER ()</code>처럼 비워 두면 전체 행이 하나의 윈도우다. Oracle의 <code>RATIO_TO_REPORT(amount) OVER (...)</code>가 같은 비율을 0~1로 돌려준다.')
p.ex('누적 합계: ORDER BY를 넣으면', "SELECT region, month, amount,\n       SUM(amount) OVER (PARTITION BY region ORDER BY month) AS running\nFROM sales;",
     'OVER 안에 <code>ORDER BY</code>가 들어가면 윈도우가 "파티션 처음부터 <strong>현재 행까지</strong>"로 바뀌어 누적 합계가 된다.')
p.ex('동점이 있을 때 기본 범위의 함정', "SELECT name, salary,\n       SUM(salary) OVER (ORDER BY salary) AS range_sum,\n       SUM(salary) OVER (ORDER BY salary\n                         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS rows_sum\nFROM emp\nWHERE salary < 5000;",
     'ORDER BY만 쓴 기본 범위는 <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>여서 <strong>값이 같은 행을 한꺼번에</strong> 포함한다. 그래서 3600인 두 행의 range_sum이 둘 다 9600이다. 한 행씩 누적하려면 <code>ROWS</code>로 명시한다.')
p.ex('이동 평균: 직전 행과 현재 행', "SELECT month, amount,\n       ROUND(AVG(amount) OVER (ORDER BY month\n                 ROWS BETWEEN 1 PRECEDING AND CURRENT ROW), 1) AS moving_avg\nFROM sales\nWHERE region = '서울';",
     '<code>ROWS BETWEEN n PRECEDING AND m FOLLOWING</code>으로 윈도우 크기를 정한다. 첫 행은 앞 행이 없으니 자기 자신만의 평균이다.')

p('<h3>3. 이전·다음 행: LAG · LEAD</h3>')
p.ex('전월 대비 증감', "SELECT month, amount,\n       LAG(amount)  OVER (ORDER BY month) AS prev,\n       amount - LAG(amount) OVER (ORDER BY month) AS change,\n       LEAD(amount) OVER (ORDER BY month) AS next\nFROM sales\nWHERE region = '서울';",
     '<code>LAG(열, n, 기본값)</code>은 n행 앞(기본 1), <code>LEAD</code>는 n행 뒤의 값. 첫 행의 LAG와 마지막 행의 LEAD는 없으므로 NULL이다(기본값을 주면 그 값).')
p.ex('FIRST_VALUE · NTILE', "SELECT name, salary,\n       FIRST_VALUE(name) OVER (ORDER BY salary DESC) AS top_name,\n       NTILE(3) OVER (ORDER BY salary DESC) AS bucket\nFROM emp;",
     '<code>FIRST_VALUE</code>는 윈도우의 첫 행 값. <code>NTILE(n)</code>은 행을 n개 묶음으로 나눈 번호다. 8행을 3묶음으로 나누면 3, 3, 2행이 된다(앞 묶음부터 하나씩 더 받는다).')

p('''<h3>정리</h3>
<table><tr><th>분류</th><th>함수</th><th>하는 일</th></tr>
<tr><td>순위</td><td><code>ROW_NUMBER</code> · <code>RANK</code> · <code>DENSE_RANK</code></td><td>동점 처리만 다르다: 1,2,3 / 1,1,3 / 1,1,2</td></tr>
<tr><td>집계</td><td><code>SUM</code> · <code>AVG</code> · <code>COUNT</code> · <code>MAX</code> · <code>MIN</code></td><td>ORDER BY 없으면 파티션 전체, 있으면 누적</td></tr>
<tr><td>행 순서</td><td><code>LAG</code> · <code>LEAD</code> · <code>FIRST_VALUE</code> · <code>LAST_VALUE</code></td><td>앞뒤 행, 윈도우의 처음·끝 값</td></tr>
<tr><td>비율·분포</td><td><code>NTILE</code> · <code>PERCENT_RANK</code> · <code>CUME_DIST</code> · <code>RATIO_TO_REPORT</code>(Oracle)</td><td>묶음 번호, 백분위, 누적 분포, 합계 대비 비율</td></tr></table>
<p><code>LAST_VALUE</code>를 ORDER BY와 함께 쓰면 기본 범위가 "현재 행까지"라서 현재 행 값이 나온다. 진짜 마지막 값을 원하면 <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>을 붙인다.</p>''')

PAGES.append(p.done(
    links=[{'to': 'db-sql-agg', 'why': 'GROUP BY는 행을 줄이고, 윈도우 함수는 행을 남긴다'},
           {'to': 'db-sql-subquery', 'why': '윈도우 결과로 거를 때 필요한 인라인 뷰'},
           {'to': 'db-sql', 'why': 'SELECT 단계에서 계산되므로 WHERE·GROUP BY에서는 못 쓴다'}],
    quiz=[
        {'q': '급여 (900, 800, 800, 700)에 <code>RANK() OVER (ORDER BY 급여 DESC)</code>를 적용한 결과는?',
         'options': ['1, 2, 2, 4', '1, 2, 2, 3', '1, 2, 3, 4', '1, 1, 2, 3'], 'answer': 0,
         'explain': 'RANK는 동점 수만큼 다음 순위를 건너뛴다. DENSE_RANK면 1, 2, 2, 3, ROW_NUMBER면 1, 2, 3, 4.'},
        {'q': 'emp(8행)에 <code>SELECT name, AVG(salary) OVER (PARTITION BY dept_id) FROM emp</code>를 실행한 결과 행 수는?',
         'options': ['8', '4', '1', '5'], 'answer': 0,
         'explain': '윈도우 함수는 행을 줄이지 않는다. GROUP BY dept_id였다면 그룹 수(NULL 포함 4)만큼 나온다.'},
        {'q': '월별 매출에 <code>LAG(amount) OVER (ORDER BY month)</code>를 쓰면 첫 번째 월의 값은?',
         'options': ['NULL', '0', '첫 번째 월의 amount', '마지막 월의 amount'], 'answer': 0,
         'explain': '앞 행이 없으므로 NULL이다. LAG(amount, 1, 0)처럼 세 번째 인자로 기본값을 줄 수 있다.'},
        {'q': '<code>WHERE RANK() OVER (ORDER BY salary DESC) &lt;= 3</code>이 오류가 나는 이유는?',
         'options': ['윈도우 함수는 WHERE보다 늦은 SELECT 단계에서 계산된다', 'RANK에는 PARTITION BY가 반드시 필요하다', 'WHERE 절에서는 비교 연산자를 함수와 함께 쓸 수 없다', 'RANK는 집계 함수라 HAVING에만 쓸 수 있다'], 'answer': 0,
         'explain': '논리적 실행 순서상 WHERE가 먼저다. 인라인 뷰나 CTE로 감싼 뒤 바깥 WHERE에서 거른다.'},
    ],
    resources=['『SQL 전문가 가이드』 — 윈도우 함수', 'SQLite 문서 — Window Functions', 'PostgreSQL 문서 — Window Functions 튜토리얼']))
