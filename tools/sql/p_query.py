# 조회: SELECT 기본, 단일행 함수, 집계와 GROUP BY
from lib import Page, q

PAGES = []

# ---------------------------------------------------------------------------
p = Page('db-sql-select', 'SELECT 기본: 조회·조건·정렬', '<code>SELECT</code> 열 → <code>FROM</code> 테이블 → <code>WHERE</code> 행 조건 → <code>ORDER BY</code> 정렬\n조건 연산자: 비교 · AND/OR/NOT · BETWEEN · IN · LIKE · IS NULL\nNULL과의 비교는 참이 아니다(UNKNOWN) → <code>IS NULL</code>로 검사')
p('<p>모든 예제는 아래 두 테이블을 쓴다. <code>salary</code>는 월급(만 원), <code>bonus</code>가 NULL인 직원과 부서가 없는(<code>dept_id</code>가 NULL인) 직원이 일부러 섞여 있다. NULL이 결과를 어떻게 바꾸는지가 SQL 문제의 단골이기 때문이다.</p>')
p.sample('emp', 'dept')

p('<h3>1. 열 고르기: SELECT</h3>')
p.ex('필요한 열만 고르기', "SELECT name, job, salary\nFROM emp;",
     '<code>SELECT *</code>는 모든 열. 실무에서는 필요한 열만 적는 것이 좋다(읽는 양이 줄고, 테이블에 열이 추가돼도 결과 모양이 그대로다).')
p.ex('계산식과 별칭(AS)', "SELECT name,\n       salary * 12         AS annual,\n       salary + bonus      AS total\nFROM emp;",
     '<strong>NULL이 섞인 산술 연산의 결과는 NULL</strong>이다. bonus가 NULL인 김민준·박지호·강수아·한지민의 total이 NULL이 됐다. 0으로 보고 더하려면 <code>COALESCE(bonus, 0)</code>을 쓴다(<a href="#/t/db-sql-func">단일행 함수</a>). 별칭에 공백이나 한글을 쓰려면 <code>AS "월 합계"</code>처럼 큰따옴표로 감싼다.')
p.ex('중복 없애기: DISTINCT', "SELECT DISTINCT job\nFROM emp;",
     '8명 중 직급은 5종류. DISTINCT는 SELECT 목록 <strong>전체</strong>가 같은 행을 하나로 합친다.')
p.ex('DISTINCT는 열 조합 기준', "SELECT DISTINCT dept_id, job\nFROM emp;",
     '(20, 사원)이 두 번 있었는데 한 번만 남았다. <code>DISTINCT dept_id, job</code>은 "dept_id만 중복 제거"가 아니라 <strong>(dept_id, job) 쌍</strong>의 중복 제거다.')

p('<h3>2. 행 거르기: WHERE</h3>')
p.ex('비교 연산자', "SELECT name, salary\nFROM emp\nWHERE salary >= 5000;",
     '비교 연산자: <code>=</code> <code>&lt;&gt;</code>(또는 <code>!=</code>) <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code>. 같다는 <code>==</code>가 아니라 <code>=</code> 하나다.')
p.ex('AND가 OR보다 먼저 계산된다', "SELECT name, dept_id, salary\nFROM emp\nWHERE dept_id = 10 OR dept_id = 20 AND salary >= 5000;",
     '의도는 "10번이나 20번 부서 중 5000 이상"이었지만, <code>AND</code>가 먼저 묶여서 <code>dept_id = 10 OR (dept_id = 20 AND salary &gt;= 5000)</code>으로 처리됐다. 그래서 4300을 받는 박지호도 나온다. 우선순위: <strong>NOT &gt; AND &gt; OR</strong>.')
p.ex('괄호로 의도대로 묶기', "SELECT name, dept_id, salary\nFROM emp\nWHERE (dept_id = 10 OR dept_id = 20) AND salary >= 5000;",
     'AND와 OR을 섞을 때는 괄호를 쓰는 습관을 들이자.')
p.ex('범위: BETWEEN a AND b', "SELECT name, salary\nFROM emp\nWHERE salary BETWEEN 4300 AND 5200;",
     '<strong>양 끝 값을 포함</strong>한다(<code>salary &gt;= 4300 AND salary &lt;= 5200</code>과 같다). 박지호(4300)와 이서연(5200)이 포함됐다. 작은 값을 앞에 써야 한다. <code>BETWEEN 5200 AND 4300</code>은 결과가 없다.')
p.ex('목록: IN', "SELECT name, dept_id\nFROM emp\nWHERE dept_id IN (20, 30);",
     '<code>dept_id = 20 OR dept_id = 30</code>을 줄여 쓴 것.')
p.ex('NOT IN과 NULL', "SELECT name, dept_id\nFROM emp\nWHERE dept_id NOT IN (20, 30);",
     '10번 부서 3명만 나왔다. 한지민은 dept_id가 NULL이라 <code>NULL NOT IN (20, 30)</code>이 참이 아니라 UNKNOWN이 되어 빠졌다. <code>&lt;&gt;</code>, <code>NOT IN</code> 같은 "아닌 것" 조건은 NULL 행을 포함하지 않는다.')
p.ex('패턴: LIKE', "SELECT name\nFROM emp\nWHERE name LIKE '이%' OR name LIKE '_지%';",
     '<code>%</code>는 0글자 이상 아무 문자, <code>_</code>는 정확히 1글자. <code>\'이%\'</code>는 이로 시작(이서연), <code>\'_지%\'</code>는 둘째 글자가 지(박지호, 한지민). <code>\'%준\'</code>이면 준으로 끝나는 이름(김민준, 정하준).')
p.ex('NULL 검사는 = NULL이 아니다', "SELECT name, bonus\nFROM emp\nWHERE bonus = NULL;",
     '<strong>결과가 비어 있다.</strong> NULL과의 비교는 무엇이든(NULL끼리도) UNKNOWN이고, WHERE는 참인 행만 남긴다.')
p.ex('IS NULL / IS NOT NULL', "SELECT name, bonus\nFROM emp\nWHERE bonus IS NULL;",
     'NULL 여부는 반드시 <code>IS NULL</code>, <code>IS NOT NULL</code>로 검사한다. bonus가 0인 윤도윤은 NULL이 아니므로 나오지 않는다(0은 값이다).')

p('<h3>3. 정렬: ORDER BY</h3>')
p.ex('내림차순, 동점은 이름순', "SELECT name, salary\nFROM emp\nORDER BY salary DESC, name ASC;",
     '<code>ASC</code>(오름차순)가 기본이고 생략할 수 있다. 첫 기준이 같은 행(3600인 강수아·정하준)은 두 번째 기준으로 정렬된다. ORDER BY가 없으면 결과 순서는 <strong>보장되지 않는다</strong>.')
p.ex('별칭과 열 번호로 정렬', "SELECT name, salary * 12 AS annual\nFROM emp\nWHERE dept_id = 10\nORDER BY annual DESC;",
     'ORDER BY는 SELECT 다음에 처리되므로 SELECT의 별칭을 쓸 수 있다(WHERE에서는 못 쓴다). <code>ORDER BY 2 DESC</code>처럼 SELECT 목록의 열 번호도 쓸 수 있다.')
p.ex('NULL의 정렬 위치', "SELECT name, bonus\nFROM emp\nORDER BY bonus DESC NULLS LAST;",
     'NULL을 가장 큰 값으로 볼지 작은 값으로 볼지는 DBMS마다 다르다. <strong>Oracle·PostgreSQL</strong>은 NULL을 가장 큰 값으로 봐서 오름차순이면 맨 뒤, 내림차순이면 맨 앞. <strong>MySQL·SQLite·SQL Server</strong>는 반대로 가장 작은 값. <code>NULLS FIRST</code> / <code>NULLS LAST</code>로 직접 정할 수 있다(Oracle, PostgreSQL, SQLite).')

p('<h3>4. 개수 제한: 상위 N개</h3>')
p.ex('연봉 상위 3명', "SELECT name, salary\nFROM emp\nORDER BY salary DESC\nLIMIT 3;", '')
p.ex('건너뛰고 가져오기(페이지 나누기)', "SELECT name, salary\nFROM emp\nORDER BY salary DESC\nLIMIT 3 OFFSET 3;",
     '앞의 3행을 건너뛰고 다음 3행. 한 페이지에 3개씩이면 2페이지다.')
p('''<p>이 부분은 DBMS마다 문법이 가장 많이 다르다.</p>
<table><tr><th>DBMS</th><th>상위 3개</th></tr>
<tr><td>MySQL · PostgreSQL · SQLite</td><td><code>ORDER BY salary DESC LIMIT 3</code></td></tr>
<tr><td>Oracle 12c+ · 표준 SQL</td><td><code>ORDER BY salary DESC FETCH FIRST 3 ROWS ONLY</code></td></tr>
<tr><td>Oracle (전통)</td><td><code>SELECT * FROM (SELECT ... ORDER BY salary DESC) WHERE ROWNUM &lt;= 3</code></td></tr>
<tr><td>SQL Server</td><td><code>SELECT TOP 3 ... ORDER BY salary DESC</code></td></tr></table>
<p><strong>ROWNUM의 함정</strong>(필기 단골): <code>SELECT ... WHERE ROWNUM &lt;= 3 ORDER BY salary DESC</code>는 상위 3명이 아니다. ROWNUM은 WHERE 단계에서 행을 읽는 순서대로 붙고, ORDER BY는 그 뒤에 실행되므로 "아무 3명을 고른 뒤 정렬"이 된다. 그래서 정렬을 인라인 뷰(FROM 절 서브쿼리) 안에서 먼저 하고 바깥에서 ROWNUM으로 자른다. 또 <code>WHERE ROWNUM = 2</code>는 항상 빈 결과다. 첫 행이 ROWNUM 1을 받지 못하고 버려지면 다음 행이 다시 1이 되기 때문이다.</p>''')

PAGES.append(p.done(
    links=[{'to': 'db-sql', 'why': '명령어 분류와 SELECT의 논리적 실행 순서'},
           {'to': 'db-sql-func', 'why': 'NULL을 다른 값으로 바꾸는 COALESCE·NVL, 조건 분기 CASE'},
           {'to': 'db-relational', 'why': 'NULL과 3값 논리(TRUE·FALSE·UNKNOWN)'}],
    quiz=[
        {'q': 'emp 테이블에서 <code>WHERE dept_id = 10 OR dept_id = 20 AND salary &gt;= 5000</code>의 결과 행 수는?',
         'options': ['%d행' % n for n in (2, 3, 4, 5)], 'answer': [2, 3, 4, 5].index(q("SELECT COUNT(*) FROM emp WHERE dept_id = 10 OR dept_id = 20 AND salary >= 5000")[0]),
         'explain': 'AND가 먼저 묶여 dept_id = 10 OR (dept_id = 20 AND salary &gt;= 5000)이 된다. 10번 부서 3명 + 20번 부서의 최유나 = 4행.'},
        {'q': '<code>SELECT name FROM emp WHERE bonus = NULL</code>의 결과로 옳은 것은?',
         'options': ['bonus가 NULL인 행이 모두 나온다', '아무 행도 나오지 않는다', 'bonus가 0인 행만 나온다', '문법 오류로 실행되지 않는다'], 'answer': 1,
         'explain': 'NULL과의 = 비교는 항상 UNKNOWN이라 어떤 행도 조건을 만족하지 않는다. 오류는 나지 않는다. IS NULL을 써야 한다.'},
        {'q': "<code>name LIKE '_지%'</code>에 해당하는 이름은?",
         'options': ['지은영', '박지호', '김민지', '이수진'], 'answer': 1,
         'explain': "_는 정확히 한 글자, %는 0글자 이상. 둘째 글자가 '지'인 이름이다. 김민지는 셋째 글자가 지라 해당하지 않는다."},
        {'q': '<code>salary BETWEEN 4300 AND 5200</code>과 같은 조건은?',
         'options': ['salary &gt;= 4300 AND salary &lt;= 5200', 'salary &gt; 4300 AND salary &lt; 5200', 'salary &gt;= 4300 AND salary &lt; 5200', 'salary &gt; 4300 AND salary &lt;= 5200'], 'answer': 0,
         'explain': 'BETWEEN은 양 끝 값을 포함한다.'},
    ],
    resources=['『SQL 전문가 가이드』(한국데이터산업진흥원) — SQL 기본', 'SQLite 문서 — SELECT', '프로그래머스 SQL 고득점 Kit — SELECT']))

# ---------------------------------------------------------------------------
p = Page('db-sql-func', '단일행 함수: 문자·숫자·날짜·NULL·CASE', '행마다 값 하나를 받아 값 하나를 돌려주는 함수(행 수는 그대로)\n문자 <code>SUBSTR</code>·<code>LENGTH</code>·<code>REPLACE</code> · 숫자 <code>ROUND</code>·<code>TRUNC</code>·<code>MOD</code>\nNULL 처리 <code>COALESCE</code>·<code>NVL</code>·<code>NULLIF</code> · 조건 분기 <code>CASE</code>')
p('<p>단일행 함수는 각 행에 따로 적용되어 행 수를 바꾸지 않는다. 여러 행을 하나로 줄이는 <a href="#/t/db-sql-agg">집계 함수</a>와 구분한다. 함수 이름은 DBMS마다 조금씩 다른데, 여기서는 표준 SQL과 Oracle 이름을 기준으로 하고 다른 DBMS의 이름을 함께 적었다. FROM 없이 값만 계산할 때 Oracle은 <code>FROM DUAL</code>을 붙인다.</p>')
p.sample('emp')

p('<h3>1. 문자 함수</h3>')
p.ex('자르기·길이·위치', "SELECT SUBSTR('DATABASE', 3, 4) AS sub,\n       LENGTH('DATABASE')       AS len,\n       INSTR('DATABASE', 'BASE') AS pos,\n       UPPER('sql')             AS up,\n       LOWER('SQL')             AS low;",
     '<code>SUBSTR(문자열, 시작, 길이)</code>: <strong>위치는 1부터</strong> 센다. 3번째 글자부터 4글자 = TABA. 길이를 생략하면 끝까지. <code>INSTR</code>는 처음 나타나는 위치(없으면 0). MySQL·SQL Server는 <code>SUBSTRING</code>, SQL Server의 길이는 <code>LEN</code>.')
p.ex('공백 제거·바꾸기·붙이기', "SELECT TRIM('  sql  ')          AS t,\n       LTRIM('xxsqlxx', 'x')     AS lt,\n       RTRIM('xxsqlxx', 'x')     AS rt,\n       REPLACE('a-b-c', '-', '') AS rep,\n       'SQL' || '실습'           AS cat;",
     '<code>TRIM</code>은 양쪽, <code>LTRIM</code>/<code>RTRIM</code>은 왼쪽/오른쪽만 지운다. 두 번째 인자로 지울 문자를 정할 수 있다. 문자열 연결은 Oracle·PostgreSQL·SQLite가 <code>||</code>, MySQL은 <code>CONCAT(a, b)</code>, SQL Server는 <code>+</code>.')
p.ex('테이블의 열에 적용', "SELECT name,\n       SUBSTR(name, 1, 1)      AS family,\n       SUBSTR(hire_date, 1, 4) AS hire_year,\n       name || '(' || job || ')' AS label\nFROM emp\nWHERE dept_id = 10;",
     '함수는 행마다 한 번씩 적용된다. 3행이 들어가 3행이 나온다.')

p('<h3>2. 숫자 함수</h3>')
p.ex('반올림·버림·올림·내림', "SELECT ROUND(1234.567, 1)  AS r1,\n       ROUND(1234.567)     AS r0,\n       ROUND(1234.567, -2) AS r_2,\n       TRUNC(1234.567, 1)  AS t1,\n       CEIL(12.1)          AS ce,\n       FLOOR(12.9)         AS fl;",
     '두 번째 인자는 <strong>남길 소수 자릿수</strong>. 음수면 정수 부분에서 자른다: <code>ROUND(1234.567, -2)</code>는 십의 자리에서 반올림해 1200. <code>TRUNC</code>는 버림(MySQL은 <code>TRUNCATE</code>). <code>CEIL</code>은 그 수 이상의 가장 작은 정수, <code>FLOOR</code>는 그 수 이하의 가장 큰 정수.')
p.ex('음수에서의 차이', "SELECT CEIL(-12.1)       AS ce,\n       FLOOR(-12.1)      AS fl,\n       TRUNC(-12.7)      AS tr,\n       ROUND(-12.5)      AS ro,\n       ABS(-7)           AS ab,\n       MOD(17, 5)        AS md;",
     '음수에서 <code>FLOOR</code>는 더 작은 쪽(-13), <code>TRUNC</code>는 0 쪽(-12)으로 간다. <code>MOD(17, 5)</code>는 나머지 2(MySQL·PostgreSQL은 <code>17 % 5</code>도 가능).')
p.ex('계산에 활용', "SELECT name, salary,\n       ROUND(salary * 1.035, -1) AS raised,\n       MOD(emp_id, 2)            AS team\nFROM emp\nWHERE dept_id = 20;",
     '3.5% 인상 후 일의 자리에서 반올림. <code>MOD(id, 2)</code>로 짝수/홀수 팀을 나누는 것은 자주 쓰는 패턴이다.')

p('<h3>3. 날짜 함수</h3>')
p('''<p>날짜는 DBMS마다 함수 이름이 가장 많이 다른 영역이다. 필기에서는 Oracle 함수가 주로 나온다.</p>
<table><tr><th>하는 일</th><th>Oracle</th><th>MySQL</th><th>PostgreSQL</th></tr>
<tr><td>현재 날짜·시각</td><td><code>SYSDATE</code></td><td><code>NOW()</code>, <code>CURDATE()</code></td><td><code>NOW()</code>, <code>CURRENT_DATE</code></td></tr>
<tr><td>연도만 꺼내기</td><td><code>EXTRACT(YEAR FROM d)</code>, <code>TO_CHAR(d, 'YYYY')</code></td><td><code>YEAR(d)</code></td><td><code>EXTRACT(YEAR FROM d)</code></td></tr>
<tr><td>며칠 더하기</td><td><code>d + 7</code></td><td><code>DATE_ADD(d, INTERVAL 7 DAY)</code></td><td><code>d + 7</code>, <code>d + INTERVAL '7 days'</code></td></tr>
<tr><td>몇 달 더하기</td><td><code>ADD_MONTHS(d, 3)</code></td><td><code>DATE_ADD(d, INTERVAL 3 MONTH)</code></td><td><code>d + INTERVAL '3 months'</code></td></tr>
<tr><td>두 날짜의 차이</td><td><code>d1 - d2</code>(일), <code>MONTHS_BETWEEN(d1, d2)</code></td><td><code>DATEDIFF(d1, d2)</code></td><td><code>d1 - d2</code></td></tr>
<tr><td>문자 ↔ 날짜</td><td><code>TO_CHAR(d, 'YYYY-MM-DD')</code>, <code>TO_DATE(s, 'YYYY-MM-DD')</code></td><td><code>DATE_FORMAT</code>, <code>STR_TO_DATE</code></td><td><code>TO_CHAR</code>, <code>TO_DATE</code></td></tr></table>
<p>Oracle에서 날짜끼리 빼면 <strong>일 수</strong>(소수 포함), 날짜에 숫자를 더하면 그 일 수만큼 뒤의 날짜다. <code>SYSDATE + 1/24</code>는 1시간 뒤.</p>''')

p('<h3>4. NULL 처리 함수</h3>')
p.ex('NULL을 다른 값으로: COALESCE · NVL', "SELECT name, bonus,\n       COALESCE(bonus, 0)               AS b0,\n       salary + COALESCE(bonus, 0)      AS total,\n       NVL2(bonus, '있음', '없음')       AS has_bonus\nFROM emp\nWHERE dept_id IN (10, 20);",
     '<code>COALESCE(a, b, c, ...)</code>는 <strong>NULL이 아닌 첫 번째 값</strong>(표준). <code>NVL(a, b)</code>는 Oracle에서 인자 두 개짜리 같은 함수(MySQL·SQLite는 <code>IFNULL</code>, SQL Server는 <code>ISNULL</code>). <code>NVL2(a, b, c)</code>는 a가 NULL이 <strong>아니면</strong> b, NULL이면 c. 이제 total에 NULL이 없다.')
p.ex('특정 값을 NULL로: NULLIF', "SELECT name, salary,\n       NULLIF(salary, 3600)        AS n,\n       10000 / NULLIF(bonus, 0)    AS ratio\nFROM emp\nWHERE emp_id IN (2, 5, 7);",
     '<code>NULLIF(a, b)</code>는 a = b이면 NULL, 아니면 a. 0으로 나누기 오류를 피할 때 자주 쓴다. 윤도윤은 bonus가 0이라 나누는 수가 NULL이 되고, 결과도 NULL이 됐다(오류 대신).')
p.ex('COALESCE에 여러 후보', "SELECT COALESCE(NULL, NULL, 3, 4) AS c1,\n       COALESCE(NULL, 'x')        AS c2,\n       COALESCE(NULL, NULL)       AS c3;",
     '모두 NULL이면 결과도 NULL.')

p('<h3>5. 조건 분기: CASE</h3>')
p.ex('검색형 CASE: 조건으로 분기', "SELECT name, salary,\n       CASE WHEN salary >= 6000 THEN '고'\n            WHEN salary >= 4000 THEN '중'\n            ELSE '저'\n       END AS band\nFROM emp;",
     '<strong>위에서부터 처음 참인 WHEN</strong> 하나만 적용된다. 7000은 첫 줄에서 결정되므로 두 번째 조건(&gt;= 4000)은 보지 않는다. <code>ELSE</code>를 빼면 어디에도 안 걸린 행은 NULL.')
p.ex('단순형 CASE: 값 비교', "SELECT name,\n       CASE dept_id WHEN 10 THEN '개발'\n                    WHEN 20 THEN '영업'\n                    ELSE '기타'\n       END AS dept\nFROM emp\nWHERE emp_id IN (1, 4, 7, 8);",
     '<code>CASE 열 WHEN 값</code> 형태는 <code>=</code> 비교만 한다. 그래서 NULL은 <code>WHEN NULL</code>로 잡을 수 없고 ELSE로 간다(한지민).')
p.ex('Oracle의 DECODE', "SELECT name,\n       DECODE(dept_id, 10, '개발', 20, '영업', '기타') AS dept\nFROM emp\nWHERE emp_id IN (1, 4, 7, 8);",
     '<code>DECODE(열, 값1, 결과1, 값2, 결과2, ..., 기본값)</code>은 위의 단순형 CASE와 같다(Oracle 전용). 단, DECODE는 NULL끼리를 같다고 본다는 점이 CASE와 다르다.')
p.ex('CASE + 집계: 조건별 개수 세기', "SELECT COUNT(CASE WHEN salary >= 5000 THEN 1 END) AS high,\n       COUNT(CASE WHEN salary <  5000 THEN 1 END) AS low,\n       SUM(CASE WHEN job = '사원' THEN salary ELSE 0 END) AS staff_sum\nFROM emp;",
     'ELSE가 없으면 NULL이 되고, COUNT는 NULL을 세지 않는다. 이 패턴으로 행을 열로 펼치는 피벗을 만든다.')

p('<h3>6. 형 변환: CAST</h3>')
p.ex('문자 ↔ 숫자', "SELECT CAST('123' AS INTEGER) + 1     AS n,\n       CAST(4300 AS TEXT) || '만원'   AS s,\n       7 / 2                        AS int_div,\n       CAST(7 AS REAL) / 2          AS real_div;",
     '<code>CAST(값 AS 타입)</code>은 표준. Oracle은 <code>TO_NUMBER</code>, <code>TO_CHAR</code>도 많이 쓴다. <strong>정수끼리 나누기</strong>는 SQLite·PostgreSQL·SQL Server에서 몫만 남는다(7 / 2 = 3). Oracle·MySQL은 3.5. 평균·비율을 직접 계산할 때 결과가 0이 나오면 이것을 의심하자.')

PAGES.append(p.done(
    links=[{'to': 'db-sql-select', 'why': 'NULL이 산술 연산과 비교에 퍼지는 방식'},
           {'to': 'db-sql-agg', 'why': '여러 행을 하나로 줄이는 집계 함수, CASE를 집계 안에 넣는 패턴'}],
    quiz=[
        {'q': "<code>SUBSTR('DATABASE', 3, 4)</code>의 결과는?", 'options': ['TABA', 'ATAB', 'TABAS', 'ABAS'],
         'answer': ['TABA', 'ATAB', 'TABAS', 'ABAS'].index(q("SELECT SUBSTR('DATABASE', 3, 4)")[0]),
         'explain': '위치는 1부터 센다. 3번째 글자 T부터 4글자.'},
        {'q': '<code>ROUND(1234.567, -2)</code>의 결과는?', 'options': ['1200', '1234.57', '1230', '1300'],
         'answer': ['1200', '1234.57', '1230', '1300'].index(str(q("SELECT ROUND(1234.567, -2)")[0])),
         'explain': '음수 자릿수는 정수 부분에서 반올림한다. -2는 십의 자리에서 반올림해 백의 자리까지 남긴다.'},
        {'q': "<code>NVL2(bonus, '있음', '없음')</code>에서 bonus가 0일 때 결과는?", 'options': ["'있음'", "'없음'", 'NULL', '0'], 'answer': 0,
         'explain': 'NVL2는 첫 인자가 NULL이 아니면 두 번째 값을 돌려준다. 0은 NULL이 아니다.'},
        {'q': '다음 CASE 식에서 salary가 7000일 때 결과는?<br><code>CASE WHEN salary &gt;= 4000 THEN \'중\' WHEN salary &gt;= 6000 THEN \'고\' ELSE \'저\' END</code>',
         'options': ["'중'", "'고'", "'저'", "'중'과 '고' 둘 다"], 'answer': 0,
         'explain': 'CASE는 위에서부터 처음 참이 되는 WHEN 하나만 적용한다. 7000 &gt;= 4000이 먼저 참이라 \'중\'. 범위 조건은 큰 값부터 써야 한다.'},
    ],
    resources=['『SQL 전문가 가이드』 — 함수(문자형·숫자형·날짜형·NULL 관련 함수)', 'Oracle 문서 — SQL Functions', 'SQLite 문서 — Core Functions']))

# ---------------------------------------------------------------------------
p = Page('db-sql-agg', '집계 함수와 GROUP BY·HAVING', '집계 함수: 여러 행 → 값 하나 (<code>COUNT</code>·<code>SUM</code>·<code>AVG</code>·<code>MIN</code>·<code>MAX</code>), NULL은 무시\n<code>GROUP BY</code>로 묶은 그룹마다 한 행 · 그룹 조건은 <code>HAVING</code>\n소계·총계: <code>ROLLUP</code> · <code>CUBE</code> · <code>GROUPING SETS</code>')
p.sample('emp')

p('<h3>1. 집계 함수</h3>')
p.ex('전체를 한 행으로', "SELECT COUNT(*)            AS cnt,\n       SUM(salary)         AS total,\n       AVG(salary)         AS avg_sal,\n       MIN(salary)         AS min_sal,\n       MAX(salary)         AS max_sal\nFROM emp;",
     'GROUP BY가 없으면 테이블 전체가 하나의 그룹이 되어 8행이 1행으로 줄어든다. <code>MIN</code>/<code>MAX</code>는 문자·날짜에도 쓸 수 있다(<code>MIN(hire_date)</code> = 가장 이른 입사일).')
p.ex('COUNT(*) vs COUNT(열) vs COUNT(DISTINCT 열)', "SELECT COUNT(*)              AS all_rows,\n       COUNT(bonus)          AS has_bonus,\n       COUNT(dept_id)        AS has_dept,\n       COUNT(DISTINCT job)   AS jobs\nFROM emp;",
     '<code>COUNT(*)</code>는 모든 행을, <code>COUNT(열)</code>은 그 열이 <strong>NULL이 아닌</strong> 행만 센다. bonus가 0인 윤도윤은 세어진다(0은 NULL이 아니다).')
p.ex('AVG는 NULL을 빼고 나눈다', "SELECT SUM(bonus)                     AS s,\n       AVG(bonus)                     AS avg_nonnull,\n       SUM(bonus) / COUNT(*)          AS avg_all,\n       AVG(COALESCE(bonus, 0))        AS avg_zero\nFROM emp;",
     'bonus 합 1000을 <code>AVG</code>는 NULL이 아닌 4명으로 나눠 250, <code>COUNT(*)</code>로 나누면 8명 기준 125. "보너스 없는 사람은 0원"으로 보려면 <code>COALESCE</code>로 바꾼 뒤 평균을 낸다. 어느 쪽이 맞는지는 질문의 의도에 달려 있다.')

p('<h3>2. GROUP BY: 그룹마다 한 행</h3>')
p.ex('부서별 인원·합계·평균', "SELECT dept_id,\n       COUNT(*)              AS cnt,\n       SUM(salary)           AS total,\n       ROUND(AVG(salary), 1) AS avg_sal\nFROM emp\nGROUP BY dept_id;",
     '같은 dept_id끼리 묶어 그룹마다 한 행. <strong>NULL도 하나의 그룹</strong>이 된다(한지민). 직원이 없는 40번 부서는 emp에 행이 없으니 나오지 않는다. 0명으로 보여 주려면 dept를 기준으로 <a href="#/t/db-sql-join">외부 조인</a>한다.')
p.ex('여러 열로 묶기', "SELECT dept_id, job, COUNT(*) AS cnt\nFROM emp\nWHERE dept_id IS NOT NULL\nGROUP BY dept_id, job\nORDER BY dept_id, job;",
     '(dept_id, job) 조합마다 한 그룹. 20번 부서의 사원 2명이 한 행으로 합쳐졌다.')
p.ex('SELECT에는 그룹 기준 열과 집계만', "SELECT dept_id, name, COUNT(*)\nFROM emp\nGROUP BY dept_id;",
     '10번 그룹에는 이름이 3개인데 그중 무엇을 보여 줄지 정할 수 없다. Oracle은 <code>ORA-00979: not a GROUP BY expression</code>, PostgreSQL·SQL Server도 오류를 낸다. (MySQL의 일부 설정과 SQLite는 아무 행의 값을 골라 보여 주는데, 결과를 믿을 수 없으므로 쓰면 안 된다.)',
     fake_err='name이 GROUP BY에 없고 집계 함수로 감싸지도 않았다')

p('<h3>3. WHERE vs HAVING</h3>')
p.ex('그룹 조건은 HAVING', "SELECT dept_id, COUNT(*) AS cnt, ROUND(AVG(salary)) AS avg_sal\nFROM emp\nGROUP BY dept_id\nHAVING AVG(salary) >= 4700;",
     '<code>HAVING</code>은 그룹이 만들어진 <strong>뒤에</strong> 그룹을 거른다. 평균이 4700에 못 미치는 20번(약 4567)과 NULL 그룹(2400)이 빠졌다.')
p.ex('WHERE에는 집계 함수를 못 쓴다', "SELECT dept_id, COUNT(*)\nFROM emp\nWHERE COUNT(*) >= 2\nGROUP BY dept_id;", '',
     err=True)
p.ex('WHERE → GROUP BY → HAVING → ORDER BY 한 번에', "SELECT dept_id, COUNT(*) AS cnt, MAX(salary) AS top\nFROM emp\nWHERE job <> '부장'          -- ① 행 거르기: 부장 제외\nGROUP BY dept_id               -- ② 부서별로 묶기\nHAVING COUNT(*) >= 2           -- ③ 2명 이상인 부서만\nORDER BY top DESC;             -- ④ 정렬",
     '부장(김민준, 최유나)을 먼저 빼고 묶었기 때문에 10번은 2명(이서연, 박지호), 20번도 2명이 남는다. 행 단위로 거를 수 있는 조건은 WHERE에 두는 것이 좋다. 묶기 전에 행 수를 줄이므로 빠르다.')

p('<h3>4. 소계와 총계: ROLLUP · CUBE · GROUPING SETS</h3>')
p.ex('ROLLUP: 부서·직급별 합계 + 부서 소계 + 총계', "SELECT dept_id, job, SUM(salary) AS total\nFROM emp\nWHERE dept_id IS NOT NULL\nGROUP BY ROLLUP(dept_id, job);",
     '<code>ROLLUP(a, b)</code>는 (a, b) 그룹 → (a) 소계 → () 총계를 한 번에 만든다. 소계 행에서는 묶지 않은 열이 NULL로 표시된다(dept_id 10, job NULL = 10번 부서 소계). 진짜 NULL과 구분하려면 <code>GROUPING(job)</code>을 쓴다(소계 행이면 1). Oracle·SQL Server는 <code>ROLLUP(a, b)</code>, MySQL은 <code>GROUP BY a, b WITH ROLLUP</code>.',
     run="""SELECT dept_id, job, total FROM (
  SELECT dept_id, job, SUM(salary) AS total, 0 AS lv FROM emp WHERE dept_id IS NOT NULL GROUP BY dept_id, job
  UNION ALL SELECT dept_id, NULL, SUM(salary), 1 FROM emp WHERE dept_id IS NOT NULL GROUP BY dept_id
  UNION ALL SELECT NULL, NULL, SUM(salary), 2 FROM emp WHERE dept_id IS NOT NULL
) ORDER BY lv = 2, dept_id, lv, job""")
p('''<p>세 가지가 만드는 그룹을 비교하면:</p>
<table><tr><th>쓴 것</th><th>만들어지는 그룹</th><th>그룹 수</th></tr>
<tr><td><code>GROUP BY ROLLUP(a, b)</code></td><td>(a, b), (a), ()</td><td>열 n개면 n + 1</td></tr>
<tr><td><code>GROUP BY CUBE(a, b)</code></td><td>(a, b), (a), (b), ()</td><td>2<sup>n</sup></td></tr>
<tr><td><code>GROUP BY GROUPING SETS((a), (b))</code></td><td>(a), (b) — 적은 것만</td><td>적은 만큼</td></tr></table>
<p><strong>ROLLUP은 열 순서가 결과를 바꾼다</strong>(계층 구조: 부서 → 직급). <code>ROLLUP(job, dept_id)</code>라면 직급별 소계가 나온다. CUBE와 GROUPING SETS는 순서와 관계없이 같은 그룹을 만든다.</p>''')

PAGES.append(p.done(
    links=[{'to': 'db-sql', 'why': '논리적 실행 순서: WHERE가 GROUP BY보다, HAVING이 SELECT보다 먼저'},
           {'to': 'db-sql-window', 'why': '행을 줄이지 않고 집계하는 윈도우 함수'},
           {'to': 'db-sql-join', 'why': '직원 없는 부서까지 0명으로 세려면 외부 조인 + COUNT(열)'}],
    quiz=[
        {'q': 'emp 테이블(8행, bonus가 NULL인 행 4개)에서 <code>COUNT(*)</code>와 <code>COUNT(bonus)</code>의 결과는?',
         'options': ['8, 4', '8, 8', '4, 4', '8, 0'], 'answer': 0,
         'explain': 'COUNT(*)는 모든 행, COUNT(열)은 NULL이 아닌 값만 센다.'},
        {'q': 'bonus 값이 (300, NULL, 500, 200, 0, NULL, NULL, NULL)일 때 <code>AVG(bonus)</code>는?',
         'options': ['250', '125', '200', '333.33'], 'answer': ['250', '125', '200', '333.33'].index(str(q("SELECT AVG(bonus) FROM emp")[0]).replace('.0', '')),
         'explain': '합 1000을 NULL이 아닌 4개로 나눈다. 0은 값이므로 개수에 들어간다.'},
        {'q': '"평균 연봉이 5000 이상인 부서"를 구할 때 조건 <code>AVG(salary) &gt;= 5000</code>을 둘 곳은?',
         'options': ['HAVING', 'WHERE', 'GROUP BY', 'SELECT'], 'answer': 0,
         'explain': '집계 결과에 대한 조건은 그룹이 만들어진 뒤에 평가하는 HAVING에 둔다. WHERE는 그룹을 만들기 전에 실행되어 집계 함수를 쓸 수 없다.'},
        {'q': '<code>GROUP BY CUBE(a, b, c)</code>가 만드는 그룹(집계 수준)의 수는?',
         'options': ['8', '4', '6', '3'], 'answer': 0,
         'explain': 'CUBE는 가능한 모든 조합을 만든다: 2³ = 8. ROLLUP(a, b, c)는 (a,b,c), (a,b), (a), ()의 4개.'},
    ],
    resources=['『SQL 전문가 가이드』 — GROUP BY·HAVING 절, 그룹 함수(ROLLUP·CUBE·GROUPING SETS)', '프로그래머스 SQL 고득점 Kit — SUM·MAX·MIN, GROUP BY']))
