# 데이터와 구조 바꾸기: DML(INSERT·UPDATE·DELETE·MERGE)과 TCL, DDL·DCL
from lib import Page, code

PAGES = []

# ---------------------------------------------------------------------------
p = Page('db-sql-dml', 'DML: INSERT·UPDATE·DELETE·MERGE', '<code>INSERT</code> 행 추가 · <code>UPDATE</code> 값 수정 · <code>DELETE</code> 행 삭제 · <code>MERGE</code> 있으면 수정, 없으면 추가\n<code>WHERE</code>를 빼면 <strong>모든 행</strong>이 대상\n<code>COMMIT</code>으로 확정 · <code>ROLLBACK</code>으로 취소 · <code>SAVEPOINT</code>로 중간 지점')
p('<p>각 예제는 아래 product 테이블에서 새로 시작한다. 실행 전과 실행 후의 테이블을 비교해 보자.</p>')
p.sample('product')

p('<h3>1. INSERT: 행 추가</h3>')
p.ex('모든 열의 값을 순서대로', "INSERT INTO product VALUES (5, '웹캠', 45000, 7);",
     '열 목록을 생략하면 테이블 정의 순서대로 <strong>모든 열</strong>의 값을 줘야 한다. 테이블에 열이 추가되면 이 문장은 깨지므로 아래처럼 열을 적는 편이 안전하다.', after=['product'])
p.ex('열을 지정해서', "INSERT INTO product (id, name, price)\nVALUES (5, '웹캠', 45000);",
     '빠진 열(stock)에는 <code>DEFAULT</code>로 정한 값(0)이 들어간다. DEFAULT가 없으면 NULL. NOT NULL 열을 빼면 오류다.', after=['product'])
p.ex('여러 행 한 번에', "INSERT INTO product (id, name, price, stock) VALUES\n  (5, '웹캠', 45000, 7),\n  (6, '스피커', 38000, 2);",
     'MySQL·PostgreSQL·SQLite·SQL Server. Oracle은 <code>INSERT ALL INTO ... INTO ... SELECT * FROM DUAL</code>이나 문장을 여러 번 쓴다.', after=['product'])
p.ex('SELECT 결과를 넣기', "INSERT INTO soldout (id, name)\nSELECT id, name\nFROM product\nWHERE stock = 0;",
     '<code>VALUES</code> 대신 SELECT를 쓰면 조회 결과가 통째로 들어간다. 백업·이력 테이블을 만들 때 자주 쓴다.',
     setup='CREATE TABLE soldout (id INTEGER, name TEXT);', after=['soldout'])
p.ex('기본키 중복', "INSERT INTO product (id, name, price) VALUES (2, '트랙패드', 99000);",
     'id 2는 이미 있으므로 PRIMARY KEY 제약 위반으로 거부된다. 테이블은 바뀌지 않는다.', err=True, after=['product'])

p('<h3>2. UPDATE: 값 수정</h3>')
p.ex('조건에 맞는 행만', "UPDATE product\nSET price = price - 5000, stock = 20\nWHERE id = 2;",
     '<code>SET</code>에 여러 열을 쉼표로 적는다. 오른쪽의 <code>price</code>는 <strong>바꾸기 전</strong> 값이다.', after=['product'])
p.ex('WHERE를 빼면 모든 행', "UPDATE product\nSET price = price * 1.1;",
     '모든 상품 가격이 10% 올랐다. 실수로 WHERE를 빠뜨리면 이렇게 전부 바뀐다. 실행 전에 같은 WHERE로 SELECT를 먼저 해 보는 습관이 좋다.', after=['product'])
p.ex('NULL 조건 주의', "UPDATE product\nSET stock = 0\nWHERE stock IS NULL;",
     '<code>WHERE stock = NULL</code>이었다면 아무 행도 바뀌지 않는다.', after=['product'])
p.ex('서브쿼리로 값 정하기', "UPDATE emp\nSET salary = (SELECT MAX(salary) FROM emp WHERE dept_id = 20)\nWHERE emp_id = 7;",
     '그바르디올의 급여를 20번 부서 최고 급여(6500)로. 서브쿼리는 값 하나를 돌려줘야 한다.',
     before=[('emp', 'SELECT emp_id, name, dept_id, salary FROM emp WHERE emp_id IN (4, 7)')],
     after=[('emp', 'SELECT emp_id, name, dept_id, salary FROM emp WHERE emp_id IN (4, 7)')])

p('<h3>3. DELETE: 행 삭제</h3>')
p.ex('조건에 맞는 행 삭제', "DELETE FROM product\nWHERE stock = 0;", '', after=['product'])
p.ex('모든 행 삭제', "DELETE FROM product;",
     '구조(열 정의)는 남고 행만 모두 지워진다.', after=['product'])
p('''<table><tr><th></th><th><code>DELETE FROM t</code></th><th><code>TRUNCATE TABLE t</code></th><th><code>DROP TABLE t</code></th></tr>
<tr><td>분류</td><td>DML</td><td>DDL</td><td>DDL</td></tr>
<tr><td>지우는 것</td><td>WHERE에 맞는 행(생략 시 전부)</td><td>모든 행</td><td>행 + 테이블 구조</td></tr>
<tr><td>WHERE</td><td>가능</td><td>불가</td><td>불가</td></tr>
<tr><td>ROLLBACK</td><td>가능</td><td>대부분 불가(Oracle은 자동 커밋)</td><td>불가</td></tr>
<tr><td>속도</td><td>행마다 로그 → 느림</td><td>공간을 통째로 비움 → 빠름</td><td>빠름</td></tr></table>''')

p('<h3>4. MERGE: 있으면 수정, 없으면 추가</h3>')
p.ex('입고 처리', "MERGE INTO product p\nUSING incoming i\n   ON (p.id = i.id)\nWHEN MATCHED THEN\n  UPDATE SET p.stock = COALESCE(p.stock, 0) + i.qty\nWHEN NOT MATCHED THEN\n  INSERT (id, name, price, stock) VALUES (i.id, i.name, i.price, i.qty);",
     '이미 있는 마우스(2)·USB 허브(4)는 재고를 더하고, 없는 웹캠(5)은 새로 넣었다. 표준 SQL·Oracle·SQL Server의 MERGE. MySQL은 <code>INSERT ... ON DUPLICATE KEY UPDATE</code>, PostgreSQL·SQLite는 <code>INSERT ... ON CONFLICT (id) DO UPDATE</code>로 같은 일을 한다(이런 동작을 upsert라고 부른다).',
     setup="CREATE TABLE incoming (id INTEGER, name TEXT, price INTEGER, qty INTEGER);\nINSERT INTO incoming VALUES (2, '마우스', 15000, 30), (4, 'USB 허브', 20000, 5), (5, '웹캠', 45000, 7);",
     side=['incoming'],
     run="INSERT INTO product (id, name, price, stock) SELECT id, name, price, qty FROM incoming WHERE true ON CONFLICT (id) DO UPDATE SET stock = COALESCE(product.stock, 0) + excluded.stock;",
     after=['product'])

p('<h3>5. 트랜잭션: COMMIT · ROLLBACK · SAVEPOINT</h3>')
p.ex('중간 지점까지만 되돌리기', "BEGIN;                                   -- 트랜잭션 시작 (Oracle은 첫 DML에서 자동 시작)\nUPDATE product SET price = 0 WHERE id = 1;\nSAVEPOINT sp1;\nDELETE FROM product WHERE id = 3;\nROLLBACK TO sp1;                         -- DELETE만 취소\nCOMMIT;                                  -- UPDATE는 확정",
     '<code>ROLLBACK TO 저장점</code>은 그 지점 이후의 변경만 취소한다. 트랜잭션은 계속 열려 있어서 COMMIT으로 나머지를 확정한다. 저장점 없이 <code>ROLLBACK</code>만 쓰면 BEGIN 이후 전부 취소된다. Oracle은 <code>ROLLBACK TO SAVEPOINT sp1</code>도 쓴다.',
     after=['product'])
p('<p>DDL(<code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>)은 Oracle·MySQL에서 실행 전후로 <strong>자동 커밋</strong>된다. 그래서 DELETE 후 커밋하지 않은 상태에서 CREATE TABLE을 실행하면 DELETE까지 확정되어 ROLLBACK으로 되돌릴 수 없다. PostgreSQL은 DDL도 트랜잭션 안에서 롤백할 수 있다.</p>')

PAGES.append(p.done(
    links=[{'to': 'db-tx', 'why': 'COMMIT·ROLLBACK이 보장하는 원자성과 로그'},
           {'to': 'db-sql-ddl', 'why': 'DEFAULT·NOT NULL·외래키 같은 제약이 DML을 거부하는 경우'},
           {'to': 'db-sql-subquery', 'why': 'INSERT ... SELECT, UPDATE의 서브쿼리'}],
    quiz=[
        {'q': '<code>UPDATE product SET price = price * 1.1</code>을 실행하면?',
         'options': ['모든 행의 price가 10% 오른다', '첫 번째 행의 price만 바뀐다', 'WHERE가 없어 문법 오류가 난다', 'price가 NULL인 행만 바뀐다'], 'answer': 0,
         'explain': 'WHERE를 생략하면 테이블의 모든 행이 대상이다. 오류는 나지 않으므로 더 위험하다.'},
        {'q': 'DELETE, TRUNCATE, DROP에 대한 설명으로 옳은 것은?',
         'options': ['TRUNCATE는 행을 모두 지우고 구조는 남긴다', 'DELETE는 DDL이라 ROLLBACK할 수 없다', 'TRUNCATE에도 WHERE 조건을 쓸 수 있다', 'DROP은 행만 지우고 구조는 남긴다'], 'answer': 0,
         'explain': 'DELETE는 DML(롤백 가능, WHERE 가능), TRUNCATE는 DDL(전체 삭제, 구조 유지), DROP은 구조까지 삭제한다.'},
        {'q': "<code>INSERT INTO product (id, name) VALUES (9, '펜')</code>에서 price(DEFAULT 없음)와 stock(DEFAULT 0)에 들어가는 값은?",
         'options': ['price = NULL, stock = 0', 'price = 0, stock = 0', 'price = NULL, stock = NULL', '열이 빠져서 오류가 난다'], 'answer': 0,
         'explain': '지정하지 않은 열에는 DEFAULT 값, DEFAULT가 없으면 NULL이 들어간다. NOT NULL이면서 DEFAULT도 없는 열을 빼면 오류다.'},
        {'q': 'UPDATE → SAVEPOINT s → DELETE → ROLLBACK TO s → COMMIT 순서로 실행했을 때 최종 반영되는 것은?',
         'options': ['UPDATE만', 'DELETE만', 'UPDATE와 DELETE 모두', '아무것도 반영되지 않음'], 'answer': 0,
         'explain': 'ROLLBACK TO s는 저장점 이후(DELETE)만 취소하고 트랜잭션은 계속된다. COMMIT이 UPDATE를 확정한다.'},
    ],
    resources=['『SQL 전문가 가이드』 — DML, TCL', 'Oracle 문서 — MERGE', 'SQLite 문서 — UPSERT']))

# ---------------------------------------------------------------------------
p = Page('db-sql-ddl', 'DDL·DCL: 테이블·제약조건·뷰·권한', 'DDL: <code>CREATE</code>·<code>ALTER</code>·<code>DROP</code>·<code>TRUNCATE</code> (구조)\n제약조건: <code>PRIMARY KEY</code>·<code>FOREIGN KEY</code>·<code>UNIQUE</code>·<code>NOT NULL</code>·<code>CHECK</code>·<code>DEFAULT</code>\n뷰: 저장된 SELECT · DCL: <code>GRANT</code>·<code>REVOKE</code>')

p('<h3>1. CREATE TABLE과 제약조건</h3>')
MEMBER = """CREATE TABLE member (
  id      INTEGER PRIMARY KEY,                -- 기본키: 유일 + NOT NULL
  email   VARCHAR(50) NOT NULL UNIQUE,        -- 반드시 있어야 하고 중복 불가
  age     INTEGER CHECK (age >= 14),          -- 조건을 만족해야 함
  grade   VARCHAR(10) DEFAULT 'BRONZE',       -- 값을 주지 않으면 BRONZE
  dept_id INTEGER REFERENCES dept(dept_id)    -- 외래키: dept에 있는 값만
);"""
p(code(MEMBER))
p('''<table><tr><th>제약조건</th><th>뜻</th><th>NULL</th><th>테이블당</th></tr>
<tr><td><code>PRIMARY KEY</code></td><td>행을 유일하게 식별</td><td>불가</td><td>1개</td></tr>
<tr><td><code>UNIQUE</code></td><td>중복 불가</td><td>가능(NULL은 서로 다른 값으로 취급)</td><td>여러 개</td></tr>
<tr><td><code>NOT NULL</code></td><td>NULL 불가</td><td>불가</td><td>여러 개</td></tr>
<tr><td><code>CHECK</code></td><td>조건식을 만족해야 함</td><td>조건이 UNKNOWN이면 통과</td><td>여러 개</td></tr>
<tr><td><code>FOREIGN KEY</code></td><td>참조하는 테이블에 있는 값만</td><td>가능</td><td>여러 개</td></tr>
<tr><td><code>DEFAULT</code></td><td>값을 주지 않았을 때 넣을 값(엄밀히는 제약이 아니라 기본값)</td><td>—</td><td>열마다</td></tr></table>
<p>주요 타입: <code>CHAR(n)</code>은 고정 길이(남는 자리는 공백으로 채움), <code>VARCHAR(n)</code>(Oracle: <code>VARCHAR2</code>)은 가변 길이, <code>NUMBER(p, s)</code>/<code>DECIMAL(p, s)</code>는 전체 p자리 중 소수 s자리, <code>DATE</code>·<code>TIMESTAMP</code>는 날짜·시각.</p>''')
p.ex('정상 입력과 DEFAULT', "INSERT INTO member (id, email, age) VALUES (1, 'a@x.com', 20);\nINSERT INTO member (id, email, age, grade, dept_id) VALUES (2, 'b@x.com', 31, 'GOLD', 10);",
     'id 1은 grade를 주지 않아 DEFAULT인 BRONZE가, dept_id에는 NULL이 들어갔다.', setup=MEMBER, after=['member'])
SEED = MEMBER + "\nINSERT INTO member (id, email, age) VALUES (1, 'a@x.com', 20);"
p.ex('NOT NULL 위반', "INSERT INTO member (id, age) VALUES (3, 25);", 'email이 없다.', setup=SEED, err=True, after=['member'])
p.ex('UNIQUE 위반', "INSERT INTO member (id, email, age) VALUES (3, 'a@x.com', 25);", '같은 email이 이미 있다.', setup=SEED, err=True, after=['member'])
p.ex('CHECK 위반', "INSERT INTO member (id, email, age) VALUES (3, 'c@x.com', 12);", 'age &gt;= 14를 만족하지 않는다.', setup=SEED, err=True, after=['member'])
p.ex('외래키 위반', "INSERT INTO member (id, email, age, dept_id) VALUES (3, 'c@x.com', 25, 99);", 'dept에 99번 부서가 없다. 이것이 <strong>참조 무결성</strong>이다.', setup=SEED, err=True, after=['member'])

p('<h3>2. 외래키의 삭제 규칙: ON DELETE</h3>')
p('<p>참조되고 있는 부모 행(부서)을 지우면 자식 행(그 부서 직원)을 어떻게 할지 정한다.</p>')
def FK(rule):
    return """CREATE TABLE d (dept_id INTEGER PRIMARY KEY, dept_name TEXT);
INSERT INTO d VALUES (10, '개발'), (20, '영업');
CREATE TABLE e (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER REFERENCES d(dept_id) %s);
INSERT INTO e VALUES (1, '홀란', 10), (2, '디아스', 20);""" % rule
p.ex('ON DELETE CASCADE: 자식도 함께 삭제', "-- 자식 테이블 e: dept_id INTEGER REFERENCES d(dept_id) ON DELETE CASCADE\nDELETE FROM d WHERE dept_id = 20;",
     '20번 부서를 지우자 그 부서 직원(디아스)도 지워졌다.', setup=FK('ON DELETE CASCADE'), before=['d', 'e'], after=['d', 'e'])
p.ex('ON DELETE SET NULL: 자식의 외래키를 NULL로', "-- 자식 테이블 e: dept_id INTEGER REFERENCES d(dept_id) ON DELETE SET NULL\nDELETE FROM d WHERE dept_id = 20;",
     '직원은 남고 소속만 NULL이 됐다.', setup=FK('ON DELETE SET NULL'), after=['d', 'e'])
p.ex('RESTRICT · NO ACTION: 자식이 있으면 거부', "-- 자식 테이블 e: dept_id INTEGER REFERENCES d(dept_id) ON DELETE RESTRICT\nDELETE FROM d WHERE dept_id = 20;",
     '참조하는 직원이 있어 삭제가 거부됐다. 아무것도 지정하지 않았을 때의 기본값 <code>NO ACTION</code>도 결과는 같다(검사 시점만 조금 다르다). 부서를 지우려면 직원을 먼저 옮기거나 지워야 한다.',
     setup=FK('ON DELETE RESTRICT'), err=True, after=['d', 'e'])

p('<h3>3. ALTER TABLE: 구조 바꾸기</h3>')
p.ex('열 추가', "ALTER TABLE product ADD COLUMN category VARCHAR(20) DEFAULT '기타';",
     '기존 행에는 DEFAULT 값(없으면 NULL)이 채워진다. Oracle은 <code>ALTER TABLE product ADD (category VARCHAR2(20))</code>처럼 괄호를 쓰고 COLUMN을 생략한다.', after=['product'])
p.ex('열 이름 바꾸기와 삭제', "ALTER TABLE product RENAME COLUMN stock TO qty;\nALTER TABLE product DROP COLUMN price;", '', after=['product'])
p('''<table><tr><th>하는 일</th><th>표준·PostgreSQL</th><th>Oracle</th><th>MySQL</th></tr>
<tr><td>열 추가</td><td><code>ADD COLUMN c 타입</code></td><td><code>ADD (c 타입)</code></td><td><code>ADD COLUMN c 타입</code></td></tr>
<tr><td>타입 변경</td><td><code>ALTER COLUMN c TYPE 타입</code></td><td><code>MODIFY (c 타입)</code></td><td><code>MODIFY c 타입</code></td></tr>
<tr><td>이름 변경</td><td colspan="3"><code>RENAME COLUMN a TO b</code></td></tr>
<tr><td>삭제</td><td colspan="3"><code>DROP COLUMN c</code></td></tr>
<tr><td>제약 추가</td><td colspan="3"><code>ADD CONSTRAINT 이름 UNIQUE (c)</code> 등</td></tr></table>''')

p('<h3>4. 뷰 (VIEW)</h3>')
VIEW = "CREATE VIEW v_dept_pay AS\nSELECT d.dept_name, COUNT(*) AS cnt, SUM(e.salary) AS total\nFROM emp e\nJOIN dept d ON e.dept_id = d.dept_id\nGROUP BY d.dept_name;"
p.ex('뷰 만들고 조회하기', VIEW + "\n\nSELECT * FROM v_dept_pay;",
     '뷰는 <strong>저장된 SELECT 문</strong>이다(데이터를 따로 저장하지 않는다). 조회할 때마다 정의된 SELECT가 실행되므로 원본이 바뀌면 뷰 결과도 바뀐다.',
     run="SELECT * FROM v_dept_pay", setup=VIEW)
p.ex('원본을 바꾸면 뷰도 바뀐다', "UPDATE emp SET dept_id = 30 WHERE emp_id = 3;\nSELECT * FROM v_dept_pay;",
     '포든을 인사부(30)로 옮겼더니 뷰의 인원과 합계가 바뀌었다.',
     run="SELECT * FROM v_dept_pay", setup=VIEW + "\nUPDATE emp SET dept_id = 30 WHERE emp_id = 3;")
p('''<ul>
<li><strong>장점</strong>: 복잡한 조인·집계를 이름 하나로 감춘다(단순화). 필요한 열·행만 보여 주어 접근을 제한한다(보안). 원본 테이블 구조가 바뀌어도 뷰 정의만 고치면 응용은 그대로다(논리적 독립성).</li>
<li><strong>제약</strong>: 뷰 정의는 <code>ALTER VIEW</code>로 고치지 않고 <code>DROP</code> 후 다시 만들거나 <code>CREATE OR REPLACE VIEW</code>를 쓴다. 집계·DISTINCT·GROUP BY·조인이 들어간 뷰는 보통 INSERT·UPDATE·DELETE를 할 수 없다. 뷰 위에 뷰를 만들 수 있고, 기반 뷰를 DROP하면 그 위의 뷰도 쓸 수 없게 된다.</li>
<li><code>CREATE VIEW ... WITH CHECK OPTION</code>: 뷰를 통해 넣거나 고친 행이 뷰의 WHERE 조건을 벗어나지 못하게 한다.</li>
</ul>''')

p('<h3>5. 인덱스와 삭제</h3>')
p(code("CREATE INDEX idx_emp_dept ON emp (dept_id);           -- 조회 속도를 위한 인덱스\nCREATE UNIQUE INDEX idx_member_email ON member (email); -- 중복도 막는 인덱스\nDROP INDEX idx_emp_dept;\n\nDROP TABLE member;                 -- 테이블 삭제\nDROP TABLE dept CASCADE CONSTRAINTS; -- Oracle: 참조하는 외래키 제약도 함께 삭제\nTRUNCATE TABLE sales;              -- 행만 모두 삭제"))
p('<p>인덱스가 어떻게 조회를 빠르게 하는지는 <a href="#/t/db-index">인덱스와 B-Tree</a>에서 다룬다. 인덱스는 SELECT를 빠르게 하는 대신 INSERT·UPDATE·DELETE 때마다 함께 갱신해야 해서 쓰기를 느리게 한다.</p>')

p('<h3>6. DCL: GRANT · REVOKE</h3>')
p(code("GRANT SELECT, INSERT ON emp TO kim;              -- kim에게 emp 조회·추가 권한\nGRANT SELECT ON emp TO lee WITH GRANT OPTION;    -- lee는 받은 권한을 남에게 줄 수 있음\nREVOKE INSERT ON emp FROM kim;                   -- 권한 회수 (TO가 아니라 FROM)\nREVOKE SELECT ON emp FROM lee CASCADE;           -- lee가 다른 사용자에게 준 권한도 연쇄 회수\n\nCREATE ROLE analyst;                             -- 권한 묶음(롤)\nGRANT SELECT ON emp TO analyst;\nGRANT analyst TO park;"))
p('''<ul>
<li>객체 권한: <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>REFERENCES</code>(외래키로 참조), <code>ALL</code>. 시스템 권한: <code>CREATE TABLE</code>, <code>CREATE SESSION</code> 등.</li>
<li><code>WITH GRANT OPTION</code>: 받은 <strong>객체 권한</strong>을 다른 사용자에게 다시 줄 수 있다. 회수하면 그가 준 권한도 연쇄적으로 회수된다(<code>CASCADE</code>). 시스템 권한·롤에는 Oracle에서 <code>WITH ADMIN OPTION</code>을 쓰며, 이것은 연쇄 회수되지 않는다.</li>
<li><strong>롤(ROLE)</strong>: 여러 권한을 묶어 이름을 붙인 것. 사용자마다 권한을 하나씩 주는 대신 롤을 준다.</li>
</ul>''')

PAGES.append(p.done(
    links=[{'to': 'db-relational', 'why': '키와 무결성 제약을 DB에 선언하는 이유'},
           {'to': 'db-sql-dml', 'why': '제약조건은 INSERT·UPDATE·DELETE 시점에 검사된다'},
           {'to': 'db-index', 'why': 'CREATE INDEX가 만드는 B+Tree'},
           {'to': 'sec-access', 'why': 'GRANT·REVOKE와 롤 기반 접근 제어(RBAC)'}],
    quiz=[
        {'q': 'UNIQUE 제약조건에 대한 설명으로 옳은 것은?',
         'options': ['한 테이블에 여러 개 둘 수 있고 NULL을 허용한다', '한 테이블에 하나만 둘 수 있고 NULL을 허용한다', '한 테이블에 여러 개 둘 수 있고 NULL을 허용하지 않는다', '기본키와 같아서 함께 선언할 수 없다'], 'answer': 0,
         'explain': 'PRIMARY KEY는 테이블당 하나, NULL 불가. UNIQUE는 여러 개 가능하고 NULL을 허용한다.'},
        {'q': '부서를 삭제하면 그 부서에 속한 직원 행도 자동으로 삭제되게 하는 외래키 옵션은?',
         'options': ['ON DELETE CASCADE', 'ON DELETE SET NULL', 'ON DELETE RESTRICT', 'ON DELETE NO ACTION'], 'answer': 0,
         'explain': 'CASCADE는 연쇄 삭제, SET NULL은 자식의 외래키를 NULL로, RESTRICT·NO ACTION은 자식이 있으면 삭제를 거부한다.'},
        {'q': '뷰(VIEW)에 대한 설명으로 옳지 <strong>않은</strong> 것은?',
         'options': ['ALTER VIEW로 정의를 수정할 수 있다', '데이터를 따로 저장하지 않는 가상 테이블이다', '필요한 열만 보여 주어 보안에 활용된다', '뷰를 기반으로 다른 뷰를 만들 수 있다'], 'answer': 0,
         'explain': '뷰 정의는 ALTER로 바꿀 수 없고 DROP 후 다시 만들거나 CREATE OR REPLACE를 쓴다(필기 기준).'},
        {'q': 'A가 <code>WITH GRANT OPTION</code>으로 받은 권한을 B에게 주었다. A의 권한을 <code>REVOKE ... CASCADE</code>로 회수하면?',
         'options': ['A와 B의 권한이 모두 회수된다', 'A의 권한만 회수되고 B는 유지된다', 'B의 권한만 회수되고 A는 유지된다', 'B가 권한을 가진 동안은 회수할 수 없다'], 'answer': 0,
         'explain': 'CASCADE는 A가 넘겨준 권한까지 연쇄적으로 회수한다.'},
    ],
    resources=['『SQL 전문가 가이드』 — DDL, DCL, 제약조건', 'Oracle 문서 — CREATE TABLE, constraint, GRANT', 'PostgreSQL 문서 — Constraints, Privileges']))
