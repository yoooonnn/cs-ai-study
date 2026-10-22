TOPICS.db = [
  {
    id:'db-relational', title: '관계형 모델', advanced: true,
    summary: R`데이터를 <strong>테이블</strong>에 저장, 포인터 대신 <strong>값(키)</strong>으로 연결
SQL은 "무엇을", DBMS가 "어떻게"`,
    body: R`
<h3>왜 값으로 연결하는가</h3>
<p>관계형 모델 이전의 데이터베이스(계층형·네트워크형)는 레코드끼리 <strong>포인터</strong>로 연결했다. 프로그램이 그 포인터를 따라가는 경로를 직접 코딩해야 했고, 저장 구조가 바뀌면 프로그램도 바뀌어야 했다. 관계형 모델은 모든 데이터를 테이블로 표현하고, 관계는 "주문의 customer_id 값 = 고객의 id 값"처럼 <strong>값의 일치</strong>로 나타낸다. 덕분에 어느 방향으로든 질의할 수 있고, 물리적 저장 방식(인덱스, 파일 배치)을 바꿔도 질의는 그대로다(<strong>데이터 독립성</strong>).</p>
<h3>용어와 키</h3>
<p>릴레이션(테이블)은 같은 속성(열)을 가진 튜플(행)의 <strong>집합</strong>이다. 이론적으로는 행 순서도, 중복 행도 없다(SQL은 실용성을 위해 중복을 허용하므로 <code>DISTINCT</code>가 따로 있다).</p>
<ul>
<li><strong>슈퍼키</strong>: 행을 유일하게 식별하는 속성 집합.</li>
<li><strong>후보키</strong>: 그중 <strong>최소</strong>인 것(속성을 하나라도 빼면 유일성이 깨짐). 선수 ID, 주민번호처럼 여러 개일 수 있다.</li>
<li><strong>기본키</strong>: 후보키 중 대표로 고른 것. NULL일 수 없다.</li>
<li><strong>외래키</strong>: 다른 테이블의 키를 참조하는 속성. "존재하는 값만 참조할 수 있다"는 <strong>참조 무결성</strong>을 DBMS가 강제한다.</li>
</ul>
<h3>관계 대수: SQL 아래의 연산</h3>
<p>질의는 결국 몇 가지 집합 연산의 조합이다. <strong>선택</strong>(조건에 맞는 행), <strong>투영</strong>(원하는 열), <strong>조인</strong>(두 테이블을 조건으로 결합), 합집합·차집합 등. 연산 결과도 테이블이라 자유롭게 조합할 수 있다. SQL은 이 연산들을 <strong>선언적으로</strong> 쓰는 언어다. "어떤 순서로, 어떤 인덱스를 써서" 계산할지는 옵티마이저가 통계를 보고 정한다. 같은 결과를 내는 실행 방법이 수없이 많기 때문에, 이것을 사람이 아니라 시스템이 고를 수 있다는 점이 관계형 모델의 큰 힘이다.</p>
<h3>무결성 제약은 데이터베이스에서</h3>
<p><code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, 외래키 같은 제약을 응용 코드가 아니라 DB에 선언하면, 어떤 경로(웹 서버, 배치 작업, 관리자의 수동 SQL)로 데이터가 들어와도 규칙이 지켜진다. 응용 코드의 검사는 우회되거나 버전마다 달라질 수 있다.</p>
<h3>NULL과 3값 논리</h3>
<p>NULL은 "값이 없음/모름"이다. NULL과의 비교 결과는 참도 거짓도 아닌 <strong>UNKNOWN</strong>이고, <code>WHERE</code>는 참인 행만 남긴다. 그래서 <code>WHERE city != '서울'</code>은 city가 NULL인 행을 포함하지 않고, <code>NULL = NULL</code>도 참이 아니다(<code>IS NULL</code>로 검사). <code>COUNT(*)</code>는 모든 행을, <code>COUNT(city)</code>는 NULL이 아닌 값만 센다. 집계·조인 결과가 예상과 다를 때 NULL이 원인인 경우가 많다.</p>
<h3>조인의 종류</h3>
<p><strong>내부 조인</strong>은 양쪽에 짝이 있는 행만, <strong>왼쪽 외부 조인</strong>은 왼쪽 행을 모두 남기고 짝이 없으면 오른쪽을 NULL로 채운다. "주문이 없는 고객도 0원으로 보여 줘"는 외부 조인이다.</p>`,
    analogy: R`<p>도서관 대출 장부. 회원 명부(회원번호, 이름)와 대출 기록(대출번호, 회원번호, 책)을 따로 두고, 대출 기록에는 회원 이름 대신 <strong>회원번호만</strong> 적는다. 누가 무엇을 빌렸는지는 두 장부를 번호로 맞춰 보면(조인) 알 수 있다. 존재하지 않는 회원번호로는 대출할 수 없다는 규칙이 참조 무결성이다. 사서에게 "서울 사는 회원이 빌린 책 목록 주세요"라고만 하면(선언적 질의), 어떤 장부를 먼저 볼지는 사서가 정한다.</p>`,
    diagram: { caption: '두 테이블은 포인터가 아니라 값으로 연결된다. orders.customer_id(외래키)는 customers.id(기본키)에 존재하는 값만 가질 수 있다.', svg: R`
<svg viewBox="0 0 560 200" width="560">
<text x="130" y="30" class="sm">customers</text><text x="420" y="30" class="sm">orders</text>
<path class="ha" d="M410,44 C410,6 50,6 50,42"/><text x="230" y="14" class="sm">외래키 → 기본키 참조</text>
<rect class="h" x="20" y="44" width="60" height="26"/><rect class="g" x="80" y="44" width="80" height="26"/><rect class="g" x="160" y="44" width="80" height="26"/>
<text x="50" y="57" class="sm">id (PK)</text><text x="120" y="57" class="sm">name</text><text x="200" y="57" class="sm">city</text>
<rect class="h" x="20" y="70" width="60" height="26"/><rect class="n" x="80" y="70" width="80" height="26"/><rect class="n" x="160" y="70" width="80" height="26"/>
<text x="50" y="83" class="sm">1</text><text x="120" y="83" class="sm">양의지</text><text x="200" y="83" class="sm">서울</text>
<rect class="h" x="20" y="96" width="60" height="26"/><rect class="n" x="80" y="96" width="80" height="26"/><rect class="n" x="160" y="96" width="80" height="26"/>
<text x="50" y="109" class="sm">2</text><text x="120" y="109" class="sm">정수빈</text><text x="200" y="109" class="sm">부산</text>
<rect class="h" x="20" y="122" width="60" height="26"/><rect class="n" x="80" y="122" width="80" height="26"/><rect class="n" x="160" y="122" width="80" height="26"/>
<text x="50" y="135" class="sm">3</text><text x="120" y="135" class="sm">김민석</text><text x="200" y="135" class="sm">NULL</text>
<rect class="g" x="300" y="44" width="60" height="26"/><rect class="h" x="360" y="44" width="100" height="26"/><rect class="g" x="460" y="44" width="80" height="26"/>
<text x="330" y="57" class="sm">id (PK)</text><text x="410" y="57" class="sm">customer_id (FK)</text><text x="500" y="57" class="sm">amount</text>
<rect class="n" x="300" y="70" width="60" height="26"/><rect class="h" x="360" y="70" width="100" height="26"/><rect class="n" x="460" y="70" width="80" height="26"/>
<text x="330" y="83" class="sm">101</text><text x="410" y="83" class="sm">1</text><text x="500" y="83" class="sm">30000</text>
<rect class="n" x="300" y="96" width="60" height="26"/><rect class="h" x="360" y="96" width="100" height="26"/><rect class="n" x="460" y="96" width="80" height="26"/>
<text x="330" y="109" class="sm">102</text><text x="410" y="109" class="sm">3</text><text x="500" y="109" class="sm">12000</text>
<rect class="n" x="300" y="122" width="60" height="26"/><rect class="h" x="360" y="122" width="100" height="26"/><rect class="n" x="460" y="122" width="80" height="26"/>
<text x="330" y="135" class="sm">103</text><text x="410" y="135" class="sm">1</text><text x="500" y="135" class="sm">8000</text>
<text x="280" y="180" class="sm">customer_id = 99 같은 주문은 DB가 거부한다 (참조 무결성)</text>
</svg>` },
    math: [
      { tex: R`\sigma_{\text{city}='\text{서울}'}(C), \qquad \pi_{\text{name}}(C), \qquad C \bowtie_{C.\text{id} = O.\text{cid}} O = \sigma_{C.\text{id} = O.\text{cid}}(C \times O)`, explain: R`<ul class="defs"><li>$\sigma$: 선택(행 거르기)</li><li>$\pi$: 투영(열 고르기)</li><li>$\bowtie$: 조인</li><li>$\times$: 카티션 곱(모든 행 쌍)</li></ul>조인은 정의상 "모든 쌍 중 조건을 만족하는 것"이지만, 실제 DBMS는 모든 쌍을 만들지 않는 효율적인 알고리즘으로 같은 결과를 계산한다.` },
    ],
    code: R`
import sqlite3

db = sqlite3.connect(":memory:")
db.execute("PRAGMA foreign_keys = ON")              # SQLite는 외래키 검사를 명시적으로 켜야 한다
db.executescript("""
CREATE TABLE customers (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT
);
CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  amount      INTEGER CHECK (amount > 0)
);
INSERT INTO customers VALUES (1, '양의지', '서울'), (2, '정수빈', '부산'), (3, '김민석', NULL);
INSERT INTO orders VALUES (101, 1, 30000), (102, 3, 12000), (103, 1, 8000);
""")

# 선언적 질의: '무엇을' 원하는지만 쓴다. 외부 조인으로 주문 없는 고객도 남긴다
rows = db.execute("""
  SELECT c.name, COUNT(o.id) AS n, COALESCE(SUM(o.amount), 0) AS total
  FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
  GROUP BY c.id ORDER BY total DESC
""").fetchall()
print("고객별 주문:", rows)

for bad in ["INSERT INTO orders VALUES (104, 99, 5000)",     # 없는 고객 → 참조 무결성 위반
          "INSERT INTO orders VALUES (105, 2, -100)"]:      # CHECK 제약 위반
  try:
      db.execute(bad)
  except sqlite3.IntegrityError as e:
      print("거부됨:", e)

# NULL과 3값 논리
print("city != '서울' :", db.execute("SELECT name FROM customers WHERE city != '서울'").fetchall())  # NULL 행 제외
print("NULL = NULL, NULL IS NULL :", db.execute("SELECT NULL = NULL, NULL IS NULL").fetchone())   # (None, 1)
print("COUNT(*), COUNT(city)     :", db.execute("SELECT COUNT(*), COUNT(city) FROM customers").fetchone())
db.close()
`,
    links: [
      { to: 'db-normal', why: '테이블을 어떻게 나눠야 이상 현상이 없는가' },
      { to: 'db-plan', why: '선언적 질의를 옵티마이저가 실행 계획으로 바꾸는 과정' },
      { to: 'db-index', why: '키로 빠르게 찾기 위한 보조 구조' },
      { to: 'db-tx', why: '여러 연산을 하나의 단위로 묶어 무결성을 지키기' },
      { to: 'db-nosql', why: '관계형 모델의 일부를 포기하고 다른 것을 얻는 저장소들' },
    ],
    quiz: [
      { q: '후보키와 기본키의 관계로 옳은 것은?',
        options: ['기본키는 후보키 여러 개를 합쳐 만든 더 큰 속성 집합이다', '후보키는 행을 유일하게 식별하는 최소 집합이고, 기본키는 그중 하나다', '후보키는 NULL이 될 수 없지만 기본키는 NULL을 허용할 수 있다', '후보키는 외래키로 참조되는 속성이고, 기본키는 참조하는 쪽 속성이다'], answer: 1,
        explain: '선수 테이블에서 선수 ID와 이메일이 모두 후보키라면, 그중 선수 ID를 기본키로 고를 수 있다. 기본키는 NULL을 허용하지 않는다.' },
      { q: '<code>SELECT * FROM users WHERE grade != \'A\'</code>의 결과에 grade가 NULL인 사용자가 포함되지 않는 이유는?',
        options: ['NULL은 문자열 비교에서 빈 문자열로 바뀌어 \'A\'보다 작게 취급되어서', 'NULL과 비교한 결과는 UNKNOWN이고, WHERE는 TRUE인 행만 남기기 때문', '!= 연산자는 인덱스가 있는 값만 비교하고 NULL은 인덱스에 없어서', 'NULL 행은 SELECT * 에서 기본적으로 제외되도록 표준에 정해져 있어서'], answer: 1,
        explain: '포함하려면 WHERE grade != \'A\' OR grade IS NULL처럼 명시해야 한다. 3값 논리는 SQL 실수의 단골 원인이다.' },
      { q: 'SQL이 "어떻게"가 아니라 "무엇을" 쓰는 선언적 언어라서 얻는 가장 큰 이점은?',
        options: ['같은 질의를 절차형 코드보다 짧은 문법으로 표현할 수 있다', '데이터·인덱스가 바뀌어도 질의는 그대로, 옵티마이저가 실행 방법을 고른다', '모든 질의가 인덱스를 자동으로 타서 항상 O(log n)에 실행된다', 'DBMS 종류에 관계없이 같은 SQL이 같은 실행 계획으로 동작한다'], answer: 1,
        explain: '데이터 독립성. 인덱스를 추가하면 같은 SQL이 자동으로 더 빠른 계획을 쓴다. 반대로 실행 계획을 읽을 줄 알아야 성능 문제를 진단할 수 있다.' },
    ],
    resources: ['E. F. Codd, "A Relational Model of Data for Large Shared Data Banks" (1970)', '『데이터베이스 시스템』(Silberschatz, Korth, Sudarshan) 2~3장', 'CMU 15-445 Database Systems (Andy Pavlo, 강의 영상 공개) — Relational Model & Algebra'],
  },
  {
    id:'db-normal', title: '정규화', advanced: true,
    summary: R`<strong>하나의 사실은 한 곳에만</strong> 저장
함수 종속 기준 분해 → 삽입·갱신·삭제 이상 제거
대가: 조인 / 반정규화: 읽기 성능 위해 되돌리기`,
    body: R`
<h3>출발점: 이상 현상</h3>
<p>훈련 배정 정보를 한 테이블 <code>훈련배정(등번호, 이름, 훈련, 코치, 코치실)</code>에 모두 담았다고 하자. "김 코치의 코치실은 301호"라는 사실이 김 코치 훈련을 받는 선수 수만큼 반복 저장된다.</p>
<ul>
<li><strong>갱신 이상</strong>: 김 코치가 코치실을 옮기면 모든 행을 고쳐야 하고, 일부만 고치면 "김 코치 코치실이 두 곳"이라는 모순이 생긴다.</li>
<li><strong>삽입 이상</strong>: 아직 배정된 선수가 없는 새 코치의 코치실은 저장할 수 없다(등번호이 키의 일부인데 비어 있음).</li>
<li><strong>삭제 이상</strong>: 어떤 코치 훈련의 유일한 참가 선수가 빠지면 그 코치의 코치실 정보까지 사라진다.</li>
</ul>
<p>원인은 같다: <strong>서로 다른 사실이 한 테이블에 섞여</strong> 같은 사실이 여러 번 저장된다.</p>
<h3>함수 종속</h3>
<p>X의 값이 정해지면 Y의 값이 하나로 정해질 때 X → Y라고 쓴다. 등번호 → 이름, 훈련 → 코치, 코치 → 코치실. 이것은 데이터 몇 줄이 아니라 <strong>업무 규칙</strong>에서 나온다(데이터로는 "지금까지 위반이 없었다"만 확인할 수 있다). 정규화는 각 테이블에서 모든 종속이 <strong>키에 의해서만</strong> 결정되도록 나누는 과정이다.</p>
<h3>정규형</h3>
<ul>
<li><strong>1NF</strong>: 모든 값이 원자값이다. 한 칸에 "타격, 수비"처럼 목록을 넣지 않는다.</li>
<li><strong>2NF</strong>: 복합키의 <strong>일부에만</strong> 종속된 속성이 없다(부분 종속 제거). 키가 (등번호, 훈련)인데 이름은 등번호에만 종속 → 선수 테이블로 분리.</li>
<li><strong>3NF</strong>: 키가 아닌 속성이 다른 비키 속성을 거쳐 종속되지 않는다(이행 종속 제거). 훈련 → 코치 → 코치실 → 코치 테이블로 분리.</li>
<li><strong>BCNF</strong>: 모든 결정자(종속의 왼쪽)가 후보키다. 3NF보다 엄격하다.</li>
</ul>
<p>"키에, 키 전체에, 키 외에는 아무것에도 종속되지 않는다"로 요약된다. 분해는 <strong>무손실</strong>이어야 한다 — 나눈 테이블을 다시 조인하면 원래 데이터가 정확히 복원되어야 하고, 가능하면 원래의 종속 규칙을 각 테이블 안에서 검사할 수 있어야 한다(종속성 보존).</p>
<h3>반정규화: 언제 일부러 중복하는가</h3>
<p>정규화하면 쓰기는 한 곳만 고치면 되지만 읽기에는 조인이 필요하다. 읽기가 압도적으로 많거나 조인 비용이 큰 경우, 의도적으로 중복을 둔다: 주문 테이블에 고객 이름 복사, 게시글에 댓글 수 컬럼 유지 등. 대가는 <strong>중복을 일관되게 갱신할 책임</strong>이 응용(또는 트리거)으로 넘어온다는 것이다. 분석용 데이터 웨어하우스(스타 스키마)와, ML에서 모델 입력으로 쓰는 "한 행 = 한 샘플"의 넓은 피처 테이블은 대표적인 반정규화 구조다. 실무 원칙은 "OLTP(거래 처리)는 정규화로 시작하고, 측정된 성능 문제가 있을 때 반정규화"다.</p>`,
    analogy: R`<p>회사 비상 연락망. 팀마다 연락망 문서에 "총무팀 연락처: 내선 1234"를 각자 적어 두면, 총무팀 번호가 바뀔 때 모든 팀 문서를 고쳐야 하고 하나라도 놓치면 틀린 번호가 남는다(갱신 이상). 총무팀 번호는 <strong>사내 전화번호부 한 곳</strong>에만 두고, 각 팀 문서에는 "총무팀"이라는 이름(키)만 적는 것이 정규화다. 매번 전화번호부를 찾아보는 수고(조인)는 생기지만, 정보가 어긋날 일은 없다.</p>`,
    diagram: { caption: '정규화 전 한 테이블에 섞여 있던 네 가지 사실(선수, 훈련 배정, 훈련 담당 코치, 코치실)을 각각의 테이블로 나눈다.', svg: R`
<svg viewBox="0 0 560 215" width="560">
<rect class="g" x="10" y="20" width="230" height="160" rx="6"/>
<text x="125" y="36" class="sm">훈련배정 (정규화 전)</text>
<text x="20" y="60" class="st sm">등번호 | 이름 | 훈련 | 코치 | 코치실</text>
<text x="20" y="84" class="st sm">1 | 의지 | 타격 | 김 | 301</text>
<text x="20" y="104" class="st sm">1 | 의지 | 수비 | 이 | 205</text>
<text x="20" y="124" class="st sm">2 | 수빈 | 타격 | 김 | 301</text>
<text x="20" y="144" class="st sm">3 | 민석 | 타격 | 김 | 301</text>
<rect class="h" x="85" y="72" width="48" height="80" style="fill-opacity:.35"/>
<text x="125" y="168" class="sm">"김=301"이 3번 반복 → 갱신 이상</text>
<path class="ha" d="M245,100 H280"/>
<rect class="n" x="290" y="20" width="120" height="56" rx="6"/><text x="350" y="38" class="sm">선수</text><text x="350" y="58" class="sm">등번호(PK), 이름</text>
<rect class="n" x="430" y="20" width="120" height="56" rx="6"/><text x="490" y="38" class="sm">배정</text><text x="490" y="58" class="sm">등번호(FK), 훈련(FK)</text>
<rect class="n" x="290" y="110" width="120" height="56" rx="6"/><text x="350" y="128" class="sm">훈련</text><text x="350" y="148" class="sm">훈련(PK), 코치(FK)</text>
<rect class="h" x="430" y="110" width="120" height="56" rx="6"/><text x="490" y="128" class="sm">코치</text><text x="490" y="148" class="sm">코치(PK), 코치실</text>
<text x="420" y="200" class="sm">각 사실은 한 곳에만 — 코치실 변경은 한 행 수정</text>
</svg>` },
    math: [
      { tex: R`X \rightarrow Y \iff \forall t_1, t_2:\ t_1[X] = t_2[X] \Rightarrow t_1[Y] = t_2[Y]`, explain: R`함수 종속의 정의.<ul class="defs"><li>$t_1, t_2$: 임의의 두 행</li><li>$t[X]$: 행 $t$의 속성 $X$ 값</li></ul>X가 같은 두 행은 Y도 반드시 같아야 한다.` },
      { tex: R`R \to (R_1, R_2) \text{ 가 무손실} \iff (R_1 \cap R_2) \rightarrow R_1 \ \text{또는}\ (R_1 \cap R_2) \rightarrow R_2`, explain: R`두 테이블로 나눌 때, 공통 속성이 한쪽 테이블의 키(그 테이블 전체를 결정)이면 다시 조인했을 때 가짜 행이 생기지 않는다.` },
    ],
    code: R`
import sqlite3
from collections import defaultdict

rows = [  # (등번호, 이름, 훈련, 코치, 코치실)
  (1, "의지", "타격", "김", "301"), (1, "의지", "수비", "이", "205"),
  (2, "수빈", "타격", "김", "301"), (3, "민석", "타격", "김", "301"),
]
cols = ["등번호", "이름", "훈련", "코치", "코치실"]

def holds(X, Y):
  """이 데이터에서 함수 종속 X → Y가 성립하는가: X가 같으면 Y도 같아야 한다"""
  seen = defaultdict(set)
  for r in rows:
      seen[tuple(r[cols.index(c)] for c in X)].add(tuple(r[cols.index(c)] for c in Y))
  return all(len(v) == 1 for v in seen.values())

for X, Y in [(["등번호"], ["이름"]), (["훈련"], ["코치"]), (["코치"], ["코치실"]), (["등번호"], ["훈련"])]:
  print(f"{X} → {Y}: {holds(X, Y)}")

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE 훈련배정 (등번호, 이름, 훈련, 코치, 코치실)")
db.executemany("INSERT INTO 훈련배정 VALUES (?, ?, ?, ?, ?)", rows)
db.execute("UPDATE 훈련배정 SET 코치실 = '410' WHERE 코치 = '김' AND 등번호 = 1")   # 일부 행만 수정
print("갱신 이상 - 김 코치 코치실:", db.execute("SELECT DISTINCT 코치실 FROM 훈련배정 WHERE 코치 = '김'").fetchall())
db.execute("DELETE FROM 훈련배정 WHERE 코치 = '이'")                              # 유일한 참가 선수 제외
print("삭제 이상 - 이 코치 코치실:", db.execute("SELECT 코치실 FROM 훈련배정 WHERE 코치 = '이'").fetchall())

db.executescript("""
CREATE TABLE 선수 (등번호 PRIMARY KEY, 이름);
CREATE TABLE 코치 (코치 PRIMARY KEY, 코치실);
CREATE TABLE 훈련 (훈련 PRIMARY KEY, 코치 REFERENCES 코치);
CREATE TABLE 배정2 (등번호 REFERENCES 선수, 훈련 REFERENCES 훈련, PRIMARY KEY (등번호, 훈련));
""")
db.executemany("INSERT OR IGNORE INTO 선수 VALUES (?, ?)", [(r[0], r[1]) for r in rows])
db.executemany("INSERT OR IGNORE INTO 코치 VALUES (?, ?)", [(r[3], r[4]) for r in rows])
db.executemany("INSERT OR IGNORE INTO 훈련 VALUES (?, ?)", [(r[2], r[3]) for r in rows])
db.executemany("INSERT INTO 배정2 VALUES (?, ?)", [(r[0], r[2]) for r in rows])
db.execute("UPDATE 코치 SET 코치실 = '410' WHERE 코치 = '김'")                # 한 행만 바꾸면 끝
print("정규화 후 조인 결과:")
for r in db.execute("""SELECT 이름, 훈련, 코치, 코치실 FROM 배정2
                     JOIN 선수 USING (등번호) JOIN 훈련 USING (훈련) JOIN 코치 USING (코치)"""):
  print("  ", r)
db.close()
`,
    links: [
      { to: 'db-relational', why: '키와 관계형 모델의 기본 개념' },
      { to: 'db-plan', why: '정규화의 대가인 조인을 DB가 어떻게 실행하는가' },
      { to: 'db-tx', why: '반정규화한 중복 데이터를 함께 갱신할 때 트랜잭션이 필요하다' },
      { to: 'db-nosql', why: '문서 DB는 함께 읽는 데이터를 내장하는 반정규화 모델' },
      { to: 'ml-feature', why: 'ML 학습용 피처 테이블은 여러 테이블을 조인한 넓은 반정규화 테이블' },
    ],
    quiz: [
      { q: '정규화되지 않은 훈련배정 테이블에서 "김 코치 코치실 변경"을 일부 행에만 반영하면 생기는 문제는?',
        options: ['삽입 이상', '갱신 이상', '삭제 이상', '조인 이상'], answer: 1,
        explain: '중복이 원인이다. 정규화하면 "김 코치 = 301호"가 코치 테이블의 한 행에만 있으므로 모순이 생길 수 없다.' },
      { q: '<code>선수(선수ID, 구단, 감독)</code> 테이블에서 선수ID → 구단, 구단 → 감독이 성립한다. 이 테이블이 위반하는 정규형은?',
        options: ['1NF (반복 그룹)', '2NF (부분 종속)', '3NF (이행 종속)', 'BCNF만 위반 (결정자가 후보키 아님)'], answer: 2,
        explain: '키(선수ID)가 아닌 구단을 거쳐 감독이 결정되는 이행 종속이다. 키가 단일 속성이라 부분 종속(2NF 위반)은 생길 수 없다. 구단(구단, 감독)을 분리해야 감독 교체가 한 곳에서 끝난다.' },
      { q: '반정규화(의도적 중복)를 선택할 때 감수해야 하는 비용은?',
        options: ['조인이 늘어나 읽기 질의의 응답 시간이 길어진다', '중복된 값을 일관되게 갱신할 책임이 응용 코드나 트리거로 넘어온다', '외래키 제약을 걸 수 없어 참조 무결성이 자동으로 사라진다', '테이블이 쪼개져 같은 데이터를 찾으려면 더 많은 인덱스가 필요하다'], answer: 1,
        explain: '조인을 줄여 읽기를 빠르게 하는 대신 쓰기가 복잡해지고 불일치 위험이 생긴다. 측정된 문제가 있을 때 선택한다.' },
    ],
    resources: ['『데이터베이스 시스템』(Silberschatz 외) 7장 — 관계형 데이터베이스 설계', 'CMU 15-445 — Database Design (Functional Dependencies, Normal Forms)', '『SQL 전문가 가이드』(한국데이터산업진흥원) — 데이터 모델링, 정규화와 반정규화'],
  },
  {
    id:'db-index', title: '인덱스와 B-Tree', advanced: true,
    summary: R`키를 <strong>정렬 상태로 유지하는 보조 구조</strong>
표준: 디스크 페이지 단위의 <strong>B+Tree</strong>
읽기 ↑, 쓰기·공간 비용 ↑`,
    body: R`
<h3>인덱스가 없으면</h3>
<p>테이블의 행은 보통 특정 순서 없이 저장된다. <code>WHERE email = ?</code>를 처리하려면 모든 행을 읽어 비교해야 한다(전체 스캔, $O(n)$). 행이 수억 개면 디스크에서 수 GB를 읽는 일이다.</p>
<h3>왜 이진 탐색 트리가 아니라 B+Tree인가</h3>
<p>디스크(와 SSD)는 바이트가 아니라 <strong>페이지</strong>(보통 4~16KB) 단위로 읽고, 한 번 읽는 비용이 메모리 접근보다 훨씬 크다. 비용은 비교 횟수가 아니라 <strong>읽는 페이지 수</strong>다. 이진 트리는 노드 하나에 키 하나라 높이가 $\log_2 n$(10억 행이면 약 30)이고, 노드마다 다른 페이지일 수 있다. B+Tree는 노드 하나를 페이지 하나로 만들고 그 안에 키를 수백 개 넣는다. 분기 수(fan-out)가 수백이므로 높이는 $\log_{\text{수백}} n$ — 10억 행도 높이 3~4다. 게다가 상위 노드는 자주 쓰여 거의 항상 메모리 캐시에 있으므로, 실제 디스크 읽기는 한두 번이다.</p>
<h3>B+Tree의 구조</h3>
<ul>
<li><strong>내부 노드</strong>: 키와 자식 포인터만 가진다(어느 방향으로 내려갈지 안내).</li>
<li><strong>리프 노드</strong>: 모든 키와, 행의 위치(또는 행 자체)를 가진다. 리프끼리는 <strong>옆으로 연결</strong>되어 있다.</li>
<li>삽입으로 노드가 넘치면 둘로 <strong>분할</strong>하고 가운데 키를 부모로 올린다. 그래서 루트에서 모든 리프까지 깊이가 항상 같다(항상 균형).</li>
</ul>
<p>리프가 정렬·연결되어 있으므로 <strong>범위 검색</strong>(<code>BETWEEN</code>, <code>&gt;</code>, <code>ORDER BY</code>)은 시작점을 한 번 찾은 뒤 리프를 따라 옆으로 읽으면 된다. 해시 인덱스는 등호 검색이 빠르지만 순서가 없어 이것이 불가능하다.</p>
<h3>클러스터형과 보조 인덱스</h3>
<p>MySQL InnoDB 등에서는 테이블 자체가 기본키 순서의 B+Tree다(<strong>클러스터형 인덱스</strong>: 리프가 행 전체). 다른 컬럼의 <strong>보조 인덱스</strong>는 리프에 기본키를 담고 있어서, 보조 인덱스로 찾은 뒤 기본키로 다시 테이블을 찾아가야 한다. 질의에 필요한 컬럼이 모두 인덱스에 있으면 이 추가 조회 없이 인덱스만으로 답할 수 있다(<strong>커버링 인덱스</strong>).</p>
<h3>복합 인덱스와 인덱스를 못 쓰는 경우</h3>
<p>인덱스 <code>(city, age)</code>는 전화번호부처럼 city로 먼저 정렬하고, 같은 city 안에서 age로 정렬한다. 따라서 <code>city = '부산' AND age = 30</code>이나 <code>city = '부산'</code>에는 쓸 수 있지만, <code>age = 30</code>만으로는 정렬 순서를 이용할 수 없다(<strong>선두 컬럼 규칙</strong>). 마찬가지로 컬럼을 가공하면(<code>lower(email) = ...</code>, <code>YEAR(created_at) = 2024</code>) 인덱스에 저장된 값과 달라 쓸 수 없고, <code>LIKE '%abc'</code>처럼 앞부분을 모르면 정렬을 이용할 수 없다.</p>
<h3>인덱스가 항상 좋은 것은 아니다</h3>
<ul>
<li><strong>선택도</strong>: 결과가 테이블의 큰 비율(예: 성별 = '여')이면, 인덱스로 찾은 뒤 행마다 흩어진 페이지를 읽는 것보다 전체를 순차로 읽는 편이 빠르다. 옵티마이저가 통계로 판단한다.</li>
<li><strong>쓰기 비용</strong>: INSERT·UPDATE·DELETE마다 모든 관련 인덱스를 갱신해야 한다. 인덱스가 많을수록 쓰기가 느려지고 저장 공간이 늘어난다.</li>
</ul>
<p>그래서 인덱스는 "자주 쓰는, 선택도가 높은 조건과 정렬"에 맞춰 설계한다.</p>`,
    analogy: R`<p>두꺼운 책의 <strong>찾아보기(색인)</strong>. 본문 전체를 넘기는 대신, 가나다순으로 정렬된 색인에서 단어를 찾아 쪽수로 바로 간다. 색인은 큰 묶음("ㄱ", "ㄴ"…)에서 세부 항목으로 내려가는 몇 단계짜리 구조라 몇 번만 펼치면 된다(B-Tree의 낮은 높이). 대신 책 내용을 고칠 때마다 색인도 고쳐야 하고(쓰기 비용), "책에서 '의' 자가 나오는 모든 곳"처럼 너무 흔한 단어는 색인보다 처음부터 읽는 게 낫다(선택도).</p>`,
    diagram: { caption: 'B+Tree. 내부 노드는 길 안내만 하고 모든 키는 리프에 있다. 범위 검색은 루트에서 한 번 내려간 뒤 연결된 리프를 따라 옆으로 읽는다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<rect class="h" x="200" y="20" width="140" height="34" rx="4"/><path class="e" d="M246,20 V54 M294,20 V54"/>
<text x="270" y="37" class="sm">30   60</text>
<path class="e" d="M210,54 L95,118"/><path class="he" d="M270,54 L270,118"/><path class="e" d="M330,54 L445,118"/>
<rect class="n" x="20" y="120" width="150" height="34" rx="4"/><text x="95" y="137" class="sm">5 · 12 · 21</text>
<rect class="h" x="195" y="120" width="150" height="34" rx="4"/><text x="270" y="137" class="sm">30 · 41 · 52</text>
<rect class="h" x="370" y="120" width="150" height="34" rx="4"/><text x="445" y="137" class="sm">60 · 75 · 88</text>
<path class="a" d="M170,137 H193"/><path class="ha" d="M345,137 H368"/>
<text x="80" y="37" class="sm">내부 노드 (페이지 1개)</text>
<text x="270" y="172" class="sm">리프: 키 + 행 위치, 옆 리프와 연결</text>
<text x="270" y="192" class="sm">WHERE key BETWEEN 35 AND 80 → 루트 → 리프(30…) → 옆 리프(60…)</text>
</svg>` },
    math: [
      { tex: R`h \approx \lceil \log_{f} N \rceil \qquad (f = 500,\ N = 10^9 \Rightarrow h = 4)`, explain: R`B+Tree의 높이.<ul class="defs"><li>$f$: 노드 하나의 분기 수(페이지 크기 ÷ (키 + 포인터 크기))</li><li>$N$: 행 수</li></ul>이진 트리라면 $\log_2 10^9 \approx 30$.` },
    ],
    code: R`
import math, random, sqlite3, time

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, age INTEGER, city TEXT)")
random.seed(0)
cities = ["서울", "부산", "대구", "인천", "광주"]
db.executemany("INSERT INTO users (email, age, city) VALUES (?, ?, ?)",
             ((f"user{i}@ex.com", random.randint(18, 80), random.choice(cities)) for i in range(300_000)))

def timed(sql, repeat=20):
  t0 = time.perf_counter()
  for _ in range(repeat):
      db.execute(sql).fetchall()
  return (time.perf_counter() - t0) / repeat * 1e3

def plan(sql):                                     # SQLite의 실행 계획
  return " / ".join(row[-1] for row in db.execute("EXPLAIN QUERY PLAN " + sql))

q = "SELECT id FROM users WHERE email = 'user123456@ex.com'"
print(f"인덱스 없음: {timed(q):8.3f}ms | {plan(q)}")
db.execute("CREATE INDEX idx_email ON users(email)")
print(f"인덱스 있음: {timed(q):8.3f}ms | {plan(q)}")

db.execute("CREATE INDEX idx_city_age ON users(city, age)")       # 복합 인덱스: city 순, 같으면 age 순
# SEARCH = 트리를 타고 내려가 범위를 바로 찾음 / SCAN = 처음부터 끝까지 훑음
# (SCAN ... USING COVERING INDEX는 테이블보다 작은 인덱스를 '전부 훑는' 것이지 탐색이 아니다)
for q in ["SELECT COUNT(*) FROM users WHERE city = '부산' AND age = 30",
        "SELECT COUNT(*) FROM users WHERE age = 30",               # 선두 컬럼(city) 조건이 없음
        "SELECT id FROM users WHERE lower(email) = 'user1@ex.com'"]:  # 컬럼을 함수로 가공
  print(f"{q.split('WHERE')[1].strip():38s} → {plan(q)}")

for fanout in (2, 100, 500):
  print(f"분기 수 {fanout:3d}: 10억 행의 트리 높이 ≈ {math.ceil(math.log(1e9, fanout))}")
db.close()
`,
    links: [
      { to: 'ds-tree', why: '이진 탐색 트리 → 균형 트리 → B-Tree로 이어지는 흐름' },
      { to: 'ds-search', why: '노드 안에서의 키 탐색과 범위 시작점 찾기' },
      { to: 'ds-hash', why: '해시 인덱스: 등호는 빠르지만 범위·정렬은 불가' },
      { to: 'db-plan', why: '옵티마이저가 인덱스를 쓸지 전체 스캔을 할지 결정하는 방식' },
      { to: 'ca-hierarchy', why: '디스크 페이지 I/O가 비싸다는 것이 B-Tree 설계의 전제' },
      { to: 'os-fs', why: '파일 시스템도 블록 단위로 데이터를 읽는다' },
    ],
    quiz: [
      { q: 'DB 인덱스에 이진 탐색 트리 대신 B+Tree를 쓰는 핵심 이유는?',
        options: ['B+Tree는 키를 해시해 저장하므로 등호 검색이 O(1)이라서', '노드 하나에 키를 수백 개 담아 높이를 낮추고 페이지 읽기를 줄여서', 'B+Tree는 삽입 시 재균형이 없어 쓰기 비용이 들지 않아서', '이진 탐색 트리는 정렬 순서가 없어 범위 검색을 할 수 없어서'], answer: 1,
        explain: '비용 모델이 "비교 횟수"가 아니라 "페이지 I/O 횟수"다. 리프 연결 덕분에 범위 검색도 효율적이다.' },
      { q: '인덱스 <code>(city, age)</code>가 있을 때 <code>WHERE age = 30</code>만으로는 인덱스 탐색을 효율적으로 쓰기 어려운 이유는?',
        options: ['age가 정수형이라 복합 인덱스의 두 번째 컬럼으로 쓸 수 없어서', '인덱스가 city로 먼저 정렬되어 age = 30인 항목이 흩어져 있어서', '복합 인덱스는 두 컬럼 조건이 모두 있어야만 열 수 있게 잠겨 있어서', 'age는 값의 종류가 적어 옵티마이저가 인덱스를 아예 무시하기 때문'], answer: 1,
        explain: '이름이 성-이름 순으로 정렬된 전화번호부에서 "이름이 의지인 사람"을 찾는 것과 같다. 일부 DBMS는 선두 컬럼 값이 적으면 skip scan으로 부분 활용하기도 한다.' },
      { q: '자주 조회하는 컬럼마다 인덱스를 모두 만들면 생기는 문제는?',
        options: ['인덱스가 많으면 옵티마이저가 고를 계획이 늘어 조회가 느려진다', '행을 바꿀 때마다 모든 인덱스를 갱신해 쓰기가 느려지고 공간이 는다', '인덱스끼리 같은 페이지를 공유해 서로 잠금을 걸어 교착이 생긴다', '테이블당 인덱스 수에 제한이 있어 새 컬럼에는 만들 수 없게 된다'], answer: 1,
        explain: '인덱스는 읽기 성능을 쓰기 성능과 공간으로 사는 거래다. 실제 질의 패턴과 실행 계획을 보고 필요한 것만 만든다.' },
    ],
    resources: ['CMU 15-445 — Tree Indexes (B+Tree)', 'Markus Winand, 「Use The Index, Luke!」 (use-the-index-luke.com, 무료 — SQL 인덱싱 입문서)', '『SQL 전문가 가이드』 — 인덱스 기본, SQL 옵티마이저', 'SQLite 문서 — EXPLAIN QUERY PLAN, Query Planning'],
  },
  {
    id:'db-tx', title: '트랜잭션과 ACID', advanced: true,
    summary: R`<strong>전부 반영 또는 전혀 반영 안 함</strong>으로 묶는 단위
ACID 구현: <strong>WAL</strong> + 동시성 제어`,
    body: R`
<h3>왜 필요한가</h3>
<p>계좌 이체는 "A에서 출금"과 "B에 입금" 두 개의 UPDATE다. 첫 번째 직후 서버가 죽으면 돈이 사라진다. 두 사람이 동시에 같은 계좌에서 출금하면 잔액이 틀어질 수 있다. 트랜잭션은 이런 문제에서 응용 프로그래머를 해방시키는 추상화다: "이 묶음은 중간 상태 없이, 다른 작업과 섞이지 않고, 끝나면 사라지지 않는다."</p>
<h3>ACID와 그 구현</h3>
<ul>
<li><strong>원자성(Atomicity)</strong>: 전부 아니면 전무. 중간에 실패하면 이미 한 변경을 <strong>되돌린다(롤백)</strong>. 되돌리려면 변경 전 값을 기록해 두어야 한다(undo 정보).</li>
<li><strong>일관성(Consistency)</strong>: 트랜잭션 전후로 제약 조건과 업무 규칙(잔액 ≥ 0, 총액 보존)이 유지된다. DB는 선언된 제약(CHECK, 외래키)을 검사하지만, "총액 보존" 같은 규칙은 <strong>응용이 올바른 트랜잭션을 작성해야</strong> 지켜진다. 네 글자 중 유일하게 DB 혼자서는 보장할 수 없는 성질이다.</li>
<li><strong>격리성(Isolation)</strong>: 동시에 실행되는 트랜잭션이 서로의 중간 상태를 보지 않는다. 얼마나 엄격히 할지는 격리 수준으로 조절한다(락, MVCC).</li>
<li><strong>지속성(Durability)</strong>: 커밋이 성공하면 이후 장애가 나도 결과가 남는다.</li>
</ul>
<h3>WAL: 로그를 먼저, 데이터는 나중에</h3>
<p>커밋할 때마다 수정된 데이터 페이지를 디스크의 제자리에 쓰려면, 흩어진 위치에 무작위 쓰기를 여러 번 해야 하고 그 도중에 죽으면 반쯤 쓰인 상태가 된다. 그래서 DBMS는 <strong>로그 선행 기록(Write-Ahead Logging)</strong>을 쓴다.</p>
<ol>
<li>변경 내용(무엇을 어떻게 바꿨는지)을 로그에 <strong>순차적으로 추가</strong>한다.</li>
<li>커밋 시에는 <strong>로그만</strong> 디스크에 강제 기록(fsync)한다. 커밋 기록이 디스크에 닿는 순간이 곧 커밋 시점이다.</li>
<li>수정된 데이터 페이지는 메모리(버퍼 풀)에 두었다가 나중에(체크포인트, 백그라운드) 디스크에 쓴다.</li>
</ol>
<p>순차 추가 쓰기는 무작위 쓰기보다 훨씬 빠르고, 여러 트랜잭션의 커밋 로그를 한 번의 fsync로 묶어(그룹 커밋) 처리량을 높일 수 있다. 장애 후 재시작하면 로그를 읽어 <strong>커밋된 변경은 다시 적용(redo)</strong>하고 <strong>커밋되지 않은 변경은 되돌린다(undo)</strong>. 이것이 원자성과 지속성을 함께 구현하는 방법이며, 파일 시스템의 저널링과 같은 아이디어다.</p>
<h3>응용 개발자가 알아야 할 것</h3>
<ul>
<li>많은 드라이버는 문장마다 자동 커밋(autocommit)하거나, 반대로 명시적으로 커밋하지 않으면 반영되지 않는다. Python <code>sqlite3</code>는 <code>with conn:</code> 블록이 정상 종료되면 커밋, 예외가 나면 롤백한다.</li>
<li>트랜잭션은 <strong>짧게</strong>. 트랜잭션 안에서 외부 API 호출이나 사용자 입력을 기다리면 락과 오래된 버전을 오래 붙잡아 다른 작업을 막는다.</li>
<li>여러 데이터베이스·서비스에 걸친 원자성은 어렵다. 2단계 커밋(2PC)은 가능하지만 느리고 조정자 장애에 취약해, 마이크로서비스에서는 보상 트랜잭션(사가 패턴) 같은 다른 접근을 많이 쓴다.</li>
</ul>`,
    analogy: R`<p>은행 창구의 <strong>전표</strong>. 직원은 금고(데이터 페이지)를 그때그때 정리하는 대신, 모든 거래를 일련번호가 붙은 전표 장부(로그)에 먼저 적는다. 고객에게 "처리 완료"라고 말하는 것은 전표에 기록이 끝난 순간이다(커밋). 정전이 나도 장부를 보면 끝난 거래는 다시 반영하고, 적다 만 거래는 취소할 수 있다. 금고 정리는 한가할 때 장부를 보고 몰아서 한다.</p>`,
    diagram: { caption: 'WAL: 커밋 시에는 로그만 디스크에 순차 기록(fsync)하고, 데이터 페이지는 나중에 쓴다. 장애 후에는 로그로 redo/undo 한다.', svg: R`
<svg viewBox="0 0 540 195" width="540">
<text x="225" y="12" class="sm">메모리</text><text x="445" y="12" class="sm">디스크</text>
<path class="e d" d="M330,18 V160"/>
<rect class="n" x="10" y="62" width="110" height="50" rx="6"/><text x="65" y="80" class="sm">트랜잭션</text><text x="65" y="97" class="sm">UPDATE …</text>
<rect class="n" x="150" y="28" width="160" height="40" rx="6"/><text x="230" y="48" class="sm">버퍼 풀 (수정된 페이지)</text>
<rect class="h" x="150" y="105" width="160" height="40" rx="6"/><text x="230" y="125" class="sm">로그 버퍼</text>
<rect class="n" x="355" y="28" width="175" height="40" rx="6"/><text x="442" y="42" class="sm">데이터 파일</text><text x="442" y="57" class="sm">(무작위 위치, 나중에)</text>
<rect class="h" x="355" y="105" width="175" height="40" rx="6"/><text x="442" y="119" class="sm">로그 파일</text><text x="442" y="134" class="sm">(순차 추가)</text>
<path class="a" d="M120,78 L148,52"/><path class="a" d="M120,96 L148,122"/>
<path class="a d" d="M310,48 H353"/><text x="332" y="80" class="sm">체크포인트</text>
<path class="ha" d="M310,125 H353"/><text x="332" y="150" class="sm">COMMIT 시 fsync</text>
<text x="270" y="182" class="sm">재시작 시: 로그를 읽어 커밋된 변경은 REDO, 커밋 안 된 변경은 UNDO</text>
</svg>` },
    math: [
      { tex: R`\text{불변식: } \sum_{a \in \text{계좌}} \text{balance}(a) = \text{const}`, explain: R`이체 트랜잭션이 지켜야 할 일관성 규칙의 예. 원자성이 깨지면(출금만 반영) 이 합이 바뀐다. 이런 규칙은 DB 제약으로 선언하기 어려워 응용의 트랜잭션 설계가 책임진다.` },
    ],
    code: R`
import os, sqlite3, tempfile

path = os.path.join(tempfile.mkdtemp(), "bank.db")
db = sqlite3.connect(path)
db.execute("CREATE TABLE account (name TEXT PRIMARY KEY, balance INTEGER CHECK (balance >= 0))")
db.executemany("INSERT INTO account VALUES (?, ?)", [("A", 100), ("B", 50)])
db.commit()

def transfer(src, dst, amount, crash_midway=False):
  try:
      with db:                                     # with 블록 = 트랜잭션: 정상 종료 → COMMIT, 예외 → ROLLBACK
          db.execute("UPDATE account SET balance = balance + ? WHERE name = ?", (amount, dst))
          if crash_midway:
              raise RuntimeError("입금 후 출금 전에 장애")
          db.execute("UPDATE account SET balance = balance - ? WHERE name = ?", (amount, src))
      return "커밋"
  except (sqlite3.IntegrityError, RuntimeError) as e:
      return f"롤백 ({e})"

balances = lambda: dict(db.execute("SELECT name, balance FROM account"))
for args in [("A", "B", 30), ("A", "B", 500), ("A", "B", 10, True)]:
  result = transfer(*args)
  print(f"{args[2]:3d}원 이체 → {result:32s} 잔액 {balances()} 총액 {sum(balances().values())}")

db.close()
db = sqlite3.connect(path)                           # 프로세스를 다시 시작한 것처럼 다시 연다
print("다시 연 DB (지속성):", balances())
print("저널 모드를 WAL로:", db.execute("PRAGMA journal_mode = WAL").fetchone()[0])
db.close()
`,
    links: [
      { to: 'os-fs', why: '파일 시스템 저널링과 fsync — WAL과 같은 아이디어' },
      { to: 'db-isolation', why: 'ACID의 I를 얼마나 엄격하게 할 것인가' },
      { to: 'db-cc', why: '격리성을 구현하는 락과 MVCC' },
      { to: 'os-deadlock', why: 'DB는 교착을 탐지해 트랜잭션 하나를 롤백한다' },
      { to: 'net-http', why: '분산 환경의 실패와 멱등한 재시도' },
    ],
    quiz: [
      { q: 'WAL 방식에서 "커밋이 완료되었다"고 보는 시점은?',
        options: ['수정된 데이터 페이지가 디스크에 모두 기록된 시점', '커밋 로그 레코드가 디스크(로그 파일)에 기록된 시점', 'SQL 문장 실행이 끝나고 결과가 반환된 시점', '체크포인트가 지나 버퍼가 모두 비워진 시점'], answer: 1,
        explain: '로그만 디스크에 있으면 장애 후 redo로 데이터 페이지를 복원할 수 있다. 그래서 데이터 페이지는 나중에 써도 된다.' },
      { q: '커밋마다 데이터 페이지를 제자리에 쓰지 않고 로그를 먼저 쓰는 이유로 가장 적절한 것은?',
        options: ['로그는 압축되어 저장되므로 데이터 페이지보다 크기가 훨씬 작아서', '순차 추가 쓰기라 빠르고, 커밋을 묶을 수 있으며, 복구의 근거가 되어서', '데이터 페이지는 다른 트랜잭션이 잠그고 있어 커밋 시점에 쓸 수 없어서', '로그를 먼저 써야 다른 트랜잭션이 커밋 전 값을 읽을 수 있어서'], answer: 1,
        explain: '성능(순차 쓰기, 그룹 커밋)과 안정성(복구 가능성)을 동시에 얻는다.' },
      { q: 'ACID 중 DBMS만으로는 완전히 보장할 수 없고 응용 프로그램의 책임이 큰 것은?',
        options: ['원자성 — 여러 문장 중 일부만 반영되는 것을 막는 일', '일관성 — 총액 보존 같은 업무 규칙을 지키는 일', '격리성 — 동시 실행이 서로 간섭하지 않게 하는 일', '지속성 — 커밋된 결과가 장애 후에도 남게 하는 일'], answer: 1,
        explain: 'DB는 선언된 제약만 검사한다. 출금과 입금을 같은 트랜잭션에 넣는 것은 개발자의 몫이다.' },
    ],
    resources: ['CMU 15-445 — Concurrency Control Theory, Logging & Recovery', 'Mohan et al., "ARIES: A Transaction Recovery Method" (1992)', 'Martin Kleppmann, 『데이터 중심 애플리케이션 설계』 7장 — 트랜잭션', 'Python 공식 문서 — sqlite3: Transaction control'],
  },
  {
    id:'db-isolation', title: '격리 수준', advanced: true,
    summary: R`완벽한 격리 = 동시성 희생
격리 수준 = <strong>허용할 이상 현상 vs 성능</strong> 선택
실제 동작은 DBMS마다 다름`,
    body: R`
<h3>이상 현상들</h3>
<ul>
<li><strong>더티 리드</strong>: 다른 트랜잭션이 아직 커밋하지 않은 값을 읽는다. 그 트랜잭션이 롤백하면 존재한 적 없는 값을 본 셈이다.</li>
<li><strong>반복 불가능한 읽기</strong>: 같은 행을 두 번 읽었는데, 그사이 다른 트랜잭션이 수정·커밋해 값이 달라진다.</li>
<li><strong>팬텀 읽기</strong>: 같은 조건으로 두 번 조회했는데, 그사이 다른 트랜잭션이 <strong>새 행을 추가</strong>해 결과 행 집합이 달라진다.</li>
<li><strong>갱신 손실</strong>: 두 트랜잭션이 같은 값을 읽고 각자 계산해 쓰면, 먼저 쓴 쪽의 변경이 덮어써진다(재고 10에서 둘 다 1을 빼 9를 씀).</li>
<li><strong>쓰기 스큐</strong>: 두 트랜잭션이 같은 조건을 읽고 판단한 뒤 <strong>서로 다른</strong> 행을 수정해, 각자는 규칙을 지켰지만 합치면 규칙이 깨진다(당직 의사 두 명이 "다른 사람이 있으니" 동시에 빠짐).</li>
</ul>
<h3>표준 격리 수준</h3>
<p>SQL 표준은 앞의 세 현상을 기준으로 네 수준을 정의한다: <strong>READ UNCOMMITTED</strong>(모두 허용), <strong>READ COMMITTED</strong>(더티 리드 방지), <strong>REPEATABLE READ</strong>(반복 불가능한 읽기도 방지), <strong>SERIALIZABLE</strong>(모두 방지 — 어떤 직렬 순서로 실행한 것과 같은 결과). 기본값은 제품마다 다르다. PostgreSQL과 Oracle은 READ COMMITTED, MySQL InnoDB는 REPEATABLE READ가 기본이다.</p>
<h3>표준과 실제의 차이</h3>
<p>표준의 정의는 락 기반 구현을 전제로 만들어져, 현대 DBMS가 많이 쓰는 <strong>MVCC 스냅샷 격리</strong>와 딱 맞지 않는다. 스냅샷 격리는 트랜잭션 시작 시점의 일관된 스냅샷을 읽으므로 반복 불가능한 읽기와 팬텀을 막고, 같은 행을 동시에 수정하면 나중에 커밋하는 쪽을 실패시켜 갱신 손실도 막는다. 하지만 <strong>쓰기 스큐는 허용</strong>한다 — 두 트랜잭션이 서로 다른 행을 썼기 때문에 충돌로 보이지 않는다. PostgreSQL의 REPEATABLE READ가 이런 스냅샷 격리이고, SERIALIZABLE은 여기에 읽기-쓰기 의존을 추적하는 SSI를 더해 쓰기 스큐까지 막는다. 그래서 "REPEATABLE READ에서 팬텀이 생기는가?" 같은 질문의 답은 DBMS마다 다르다. 반드시 사용하는 제품의 문서를 확인해야 한다.</p>
<h3>실무 대처</h3>
<ul>
<li><strong>갱신 손실</strong>: 읽고-계산하고-쓰지 말고 <code>UPDATE t SET stock = stock - 1 WHERE id = ?</code>처럼 DB 안에서 원자적으로 계산한다. 또는 <code>SELECT ... FOR UPDATE</code>로 읽을 때 행을 잠그거나, 버전 컬럼으로 낙관적 검사를 한다.</li>
<li><strong>쓰기 스큐</strong>: 판단의 근거가 된 행들까지 <code>FOR UPDATE</code>로 잠그거나, 규칙을 제약 조건으로 표현하거나, SERIALIZABLE을 쓰고 직렬화 실패 오류가 나면 <strong>재시도</strong>한다.</li>
<li>격리 수준을 높이면 대기·충돌·재시도가 늘어난다. 높은 격리 수준을 쓰는 코드는 재시도 로직을 반드시 갖춰야 한다.</li>
</ul>`,
    analogy: R`<p>공유 문서 편집. <strong>READ UNCOMMITTED</strong>는 동료가 타이핑 중인 미완성 문장까지 보는 것, <strong>READ COMMITTED</strong>는 "저장"된 내용만 보지만 볼 때마다 최신 저장본이라 다시 읽으면 바뀌어 있을 수 있는 것, <strong>스냅샷 격리</strong>는 편집 시작 순간의 사본을 받아 그것만 보는 것이다. 사본 방식에서도, 둘이 각자 사본을 보고 "회의실 예약이 한 건 있으니 내 건 취소해도 되겠다"고 서로 다른 예약을 동시에 취소하면 회의실이 빈다 — 쓰기 스큐다.</p>`,
    diagram: { caption: 'SQL 표준의 격리 수준별 허용 현상. 실제 DBMS의 동작(특히 MVCC 기반)은 이 표와 다를 수 있다.', svg: R`
<svg viewBox="0 0 540 190" width="540">
<rect class="g" x="10" y="10" width="170" height="30"/><rect class="g" x="180" y="10" width="115" height="30"/><rect class="g" x="295" y="10" width="115" height="30"/><rect class="g" x="410" y="10" width="115" height="30"/>
<text x="95" y="25" class="sm">격리 수준</text><text x="237" y="25" class="sm">더티 리드</text><text x="352" y="25" class="sm">반복 불가능 읽기</text><text x="467" y="25" class="sm">팬텀</text>
<rect class="n" x="10" y="40" width="170" height="30"/><text x="95" y="55" class="sm">READ UNCOMMITTED</text>
<rect class="n" x="180" y="40" width="115" height="30"/><rect class="n" x="295" y="40" width="115" height="30"/><rect class="n" x="410" y="40" width="115" height="30"/>
<text x="237" y="55" class="sm">발생 가능</text><text x="352" y="55" class="sm">발생 가능</text><text x="467" y="55" class="sm">발생 가능</text>
<rect class="n" x="10" y="70" width="170" height="30"/><text x="95" y="85" class="sm">READ COMMITTED</text>
<rect class="h" x="180" y="70" width="115" height="30"/><rect class="n" x="295" y="70" width="115" height="30"/><rect class="n" x="410" y="70" width="115" height="30"/>
<text x="237" y="85" class="sm">방지</text><text x="352" y="85" class="sm">발생 가능</text><text x="467" y="85" class="sm">발생 가능</text>
<rect class="n" x="10" y="100" width="170" height="30"/><text x="95" y="115" class="sm">REPEATABLE READ</text>
<rect class="h" x="180" y="100" width="115" height="30"/><rect class="h" x="295" y="100" width="115" height="30"/><rect class="n" x="410" y="100" width="115" height="30"/>
<text x="237" y="115" class="sm">방지</text><text x="352" y="115" class="sm">방지</text><text x="467" y="115" class="sm">발생 가능</text>
<rect class="n" x="10" y="130" width="170" height="30"/><text x="95" y="145" class="sm">SERIALIZABLE</text>
<rect class="h" x="180" y="130" width="115" height="30"/><rect class="h" x="295" y="130" width="115" height="30"/><rect class="h" x="410" y="130" width="115" height="30"/>
<text x="237" y="145" class="sm">방지</text><text x="352" y="145" class="sm">방지</text><text x="467" y="145" class="sm">방지</text>
<text x="270" y="178" class="sm">기본값: PostgreSQL·Oracle = READ COMMITTED, MySQL InnoDB = REPEATABLE READ</text>
</svg>` },
    code: R`
class Store:                                          # 버전을 여러 개 보관하는 저장소 (MVCC 흉내)
  def __init__(self, data):
      self.versions = {k: [(0, v)] for k, v in data.items()}   # 키 → [(커밋 시각, 값), ...]
      self.clock = 0

class Tx:
  def __init__(self, db, level):
      self.db, self.level, self.start, self.writes = db, level, db.clock, {}
  def read(self, key):
      if key in self.writes:
          return self.writes[key]
      # READ COMMITTED: 읽을 때마다 최신 커밋 / SNAPSHOT: 시작 시점의 스냅샷
      ts = self.start if self.level == "SNAPSHOT" else self.db.clock
      return max(cv for cv in self.db.versions[key] if cv[0] <= ts)[1]
  def write(self, key, value):
      self.writes[key] = value
  def commit(self):
      if self.level == "SNAPSHOT":                  # 같은 키를 먼저 커밋한 쪽이 이긴다
          for k in self.writes:
              if self.db.versions[k][-1][0] > self.start:
                  raise RuntimeError(f"직렬화 실패: '{k}'를 다른 트랜잭션이 먼저 수정 → 재시도 필요")
      self.db.clock += 1
      for k, v in self.writes.items():
          self.db.versions[k].append((self.db.clock, v))

for level in ["READ COMMITTED", "SNAPSHOT"]:
  print(f"== {level}")
  db = Store({"x": 100})
  t1 = Tx(db, level)
  first = t1.read("x")
  t2 = Tx(db, level); t2.write("x", 200); t2.commit()     # 그사이 다른 트랜잭션이 수정·커밋
  print(f"  같은 행 두 번 읽기: {first} → {t1.read('x')}")

  db = Store({"stock": 10})
  t1, t2 = Tx(db, level), Tx(db, level)
  t1.write("stock", t1.read("stock") - 1)                  # 읽고-계산하고-쓰기
  t2.write("stock", t2.read("stock") - 1)
  t1.commit()
  try:
      t2.commit()
  except RuntimeError as e:
      print("  ", e)
  print(f"  재고 (10에서 두 번 -1 시도): {Tx(db, level).read('stock')}")

print("== 쓰기 스큐 (SNAPSHOT): 당직 의사는 최소 1명 있어야 한다")
db = Store({"alice": True, "bob": True})
ta, tb = Tx(db, "SNAPSHOT"), Tx(db, "SNAPSHOT")
for tx, me in [(ta, "alice"), (tb, "bob")]:
  if tx.read("alice") + tx.read("bob") >= 2:              # 각자의 스냅샷에서는 2명이 당직
      tx.write(me, False)
ta.commit(); tb.commit()                                   # 서로 다른 키라 충돌로 보이지 않는다
print("  당직 상태:", {k: Tx(db, "SNAPSHOT").read(k) for k in ["alice", "bob"]}, "→ 아무도 없음")
`,
    links: [
      { to: 'db-tx', why: 'ACID의 I(격리성)' },
      { to: 'db-cc', why: '격리 수준을 구현하는 락과 MVCC' },
      { to: 'os-sync', why: '갱신 손실 = 공유 변수의 경쟁 상태와 같은 문제' },
      { to: 'os-deadlock', why: '높은 격리 수준의 락 대기가 교착으로 이어질 수 있다' },
    ],
    quiz: [
      { q: '"더티 리드"를 가장 정확히 설명한 것은?',
        options: ['캐시에 남아 있던 오래된 값을 읽는 것', '다른 트랜잭션이 아직 커밋하지 않은 값을 읽는 것', '같은 행을 두 번 읽었는데 값이 달라진 것', '같은 조건으로 다시 읽었더니 행이 늘어난 것'], answer: 1,
        explain: '그 트랜잭션이 롤백하면 존재하지 않는 값을 본 셈이 된다. READ COMMITTED 이상에서는 커밋된 값만 읽으므로 발생하지 않는다. 두 번 읽은 값이 다른 것은 반복 불가능한 읽기, 행이 늘어난 것은 팬텀이다.' },
      { q: '재고를 "SELECT로 읽고 → 응용에서 1을 빼고 → UPDATE로 쓰는" 코드가 동시에 실행되면 갱신 손실이 날 수 있다. 가장 간단한 해결책은?',
        options: ['SELECT를 두 번 실행해 두 값이 같을 때만 UPDATE한다', 'SET stock = stock - 1처럼 DB 안에서 원자적으로 계산한다', '격리 수준을 READ COMMITTED로 바꿔 커밋된 값만 읽는다', 'UPDATE 뒤에 SELECT로 다시 읽어 값이 맞는지 확인한다'], answer: 1,
        explain: '읽기와 쓰기 사이의 틈을 없애는 것이 핵심이다. 계산이 복잡하면 SELECT ... FOR UPDATE나 버전 컬럼(낙관적 잠금)을 쓴다.' },
      { q: '스냅샷 격리가 쓰기 스큐를 막지 못하는 이유는?',
        options: ['스냅샷 격리는 다른 트랜잭션이 커밋하지 않은 값까지 읽기 때문', '같은 스냅샷으로 판단하고 서로 다른 행을 써 쓰기 충돌로 안 잡혀서', '스냅샷이 트랜잭션 시작이 아니라 문장마다 새로 찍히기 때문', '쓰기 스큐는 같은 행을 동시에 수정할 때만 생기는데 이를 허용해서'], answer: 1,
        explain: '판단 근거가 된 읽기까지 추적해야 막을 수 있다. SERIALIZABLE(SSI), FOR UPDATE 잠금, 제약 조건으로 해결한다.' },
    ],
    resources: ['Berenson et al., "A Critique of ANSI SQL Isolation Levels" (1995)', 'Martin Kleppmann, 『데이터 중심 애플리케이션 설계』 7장 — 약한 격리 수준', 'PostgreSQL 문서 — Transaction Isolation', 'MySQL 문서 — InnoDB Transaction Isolation Levels'],
  },
  {
    id:'db-cc', title: '동시성 제어: 락과 MVCC', advanced: true,
    summary: R`<strong>락(2PL)</strong>: 충돌 시 대기
<strong>MVCC</strong>: 다중 버전으로 읽기·쓰기 비차단
응용 수준: 버전 컬럼 기반 낙관적 제어`,
    body: R`
<h3>목표: 직렬 가능성</h3>
<p>여러 트랜잭션의 연산이 섞여 실행되더라도, 그 결과가 <strong>어떤 순서로 하나씩 실행한 것과 같다면</strong> 올바르다고 본다(직렬 가능). 두 연산이 같은 데이터를 다루고 그중 하나가 쓰기면 순서를 바꿀 수 없는 <strong>충돌</strong>이다. 충돌하는 연산의 순서로 "Ti가 Tj보다 먼저여야 한다"는 간선을 그린 <strong>선행 그래프</strong>에 사이클이 없으면 충돌 직렬 가능하다. 사이클이 있다면 어떤 직렬 순서와도 같지 않다(갱신 손실이 대표적인 예).</p>
<h3>락과 2단계 락킹(2PL)</h3>
<p>읽기에는 <strong>공유(S) 락</strong>, 쓰기에는 <strong>배타(X) 락</strong>을 건다. S끼리는 함께 가질 수 있지만, X는 다른 어떤 락과도 함께 가질 수 없다. 락을 거는 것만으로는 부족하고, <strong>규칙</strong>이 필요하다.</p>
<ul>
<li><strong>2PL</strong>: 트랜잭션은 락을 얻기만 하는 <strong>확장 단계</strong>와, 풀기만 하는 <strong>축소 단계</strong>로 나뉜다. 하나라도 풀고 나면 더 얻을 수 없다. 이 규칙만 지키면 결과가 직렬 가능함이 증명되어 있다.</li>
<li><strong>엄격한(strict) 2PL</strong>: 배타 락을 <strong>커밋할 때까지</strong> 쥔다. 그렇지 않으면 다른 트랜잭션이 커밋 안 된 값을 읽었다가, 원래 트랜잭션이 롤백할 때 함께 롤백해야 하는 연쇄 롤백이 생긴다. 대부분의 락 기반 DBMS가 이 방식이다.</li>
</ul>
<p>락의 대가는 <strong>대기</strong>와 <strong>교착 상태</strong>다. DBMS는 대기 그래프에서 사이클을 찾아 희생 트랜잭션 하나를 롤백한다. 새로 삽입되는 행(팬텀)까지 막으려면 행이 아니라 <strong>범위</strong>를 잠가야 한다(InnoDB의 갭 락·넥스트 키 락). 행·페이지·테이블처럼 잠금 단위를 섞어 쓸 때는 상위 단위에 "아래에 잠금이 있다"는 의도 락을 걸어 충돌 검사를 빠르게 한다.</p>
<h3>MVCC: 버전을 여러 개 둔다</h3>
<p>쓰기는 기존 값을 덮어쓰지 않고 <strong>새 버전</strong>을 만든다. 각 트랜잭션은 자신의 스냅샷 시점에 커밋되어 있던 버전을 읽는다. 그래서 <strong>읽기는 쓰기를 기다리지 않고, 쓰기도 읽기를 기다리지 않는다</strong>. 읽기가 많은 일반적인 웹 서비스 부하에서 큰 장점이다. 같은 행에 대한 쓰기끼리는 여전히 충돌하므로 락이나 "먼저 커밋한 쪽 우선" 규칙으로 처리한다.</p>
<p>비용은 오래된 버전의 정리다. 아무 트랜잭션도 더 이상 볼 수 없게 된 버전은 지워야 한다(PostgreSQL의 VACUUM, InnoDB의 undo 로그 정리). 오래 열려 있는 트랜잭션은 그동안의 모든 버전을 붙잡아 정리를 막고 저장 공간과 성능을 악화시킨다. 트랜잭션을 짧게 유지해야 하는 또 하나의 이유다.</p>
<h3>비관적 vs 낙관적</h3>
<p>락은 "충돌이 일어날 것"이라 보고 미리 막는 <strong>비관적</strong> 방식이다. <strong>낙관적</strong> 방식은 일단 진행하고 커밋 시점에 충돌을 검사한다. 응용에서 흔한 형태는 행에 <code>version</code> 컬럼을 두고 <code>UPDATE ... SET ..., version = version + 1 WHERE id = ? AND version = (읽은 버전)</code>으로 갱신하는 것이다. 영향받은 행이 0이면 그사이 누군가 바꾼 것이므로 다시 읽고 재시도한다(많은 ORM이 이 기능을 제공한다). 충돌이 드물면 낙관적 방식이 대기 없이 빠르고, 충돌이 잦으면 재시도가 반복되어 비관적 방식이 낫다.</p>`,
    analogy: R`<p>도서관 책 대출. <strong>락</strong>은 실물 책 한 권: 누가 빌려 가면(배타 락) 다른 사람은 반납까지 기다려야 한다. 열람실에서 여럿이 함께 보는 것(공유 락)은 괜찮지만, 그동안 고쳐 쓸 수는 없다. <strong>MVCC</strong>는 개정판 제도: 수정은 새 판으로 찍고, 독자는 자기가 빌린 시점의 판을 계속 본다. 낡은 판은 아무도 안 볼 때 폐기한다. <strong>낙관적 제어</strong>는 위키 편집: 일단 편집하고, 저장할 때 "그사이 다른 사람이 고쳤으면" 충돌 알림을 받고 다시 고친다.</p>`,
    diagram: { caption: '2단계 락킹: 락을 얻기만 하다가(확장) 한 번 풀기 시작하면 다시 얻지 않는다(축소). 엄격한 2PL은 커밋 때 한 번에 푼다. 오른쪽은 락 호환성.', svg: R`
<svg viewBox="0 0 540 220" width="540">
<path class="a" d="M30,200 H330"/><path class="a" d="M30,200 V20"/>
<text x="315" y="214" class="sm">시간</text><text x="62" y="16" class="sm">보유 락 수</text>
<path class="he" d="M40,195 H80 V160 H120 V125 H160 V90 H200 V125 H240 V160 H280 V195"/>
<path class="e d" d="M160,90 H300 V195"/>
<path class="e d" d="M160,40 V200"/><text x="160" y="32" class="sm">락 포인트</text>
<text x="95" y="80" class="sm">확장 단계</text><text x="232" y="110" class="sm">축소 단계</text>
<text x="250" y="78" class="sm">엄격한 2PL: 커밋 때 해제</text>
<text x="445" y="40" class="sm">락 호환성</text>
<rect class="g" x="370" y="55" width="50" height="34"/><rect class="g" x="420" y="55" width="50" height="34"/><rect class="g" x="470" y="55" width="50" height="34"/>
<text x="445" y="72" class="sm">S</text><text x="495" y="72" class="sm">X</text>
<rect class="g" x="370" y="89" width="50" height="34"/><text x="395" y="106" class="sm">S</text>
<rect class="h" x="420" y="89" width="50" height="34"/><text x="445" y="106">✓</text>
<rect class="n" x="470" y="89" width="50" height="34"/><text x="495" y="106">✗</text>
<rect class="g" x="370" y="123" width="50" height="34"/><text x="395" y="140" class="sm">X</text>
<rect class="n" x="420" y="123" width="50" height="34"/><text x="445" y="140">✗</text>
<rect class="n" x="470" y="123" width="50" height="34"/><text x="495" y="140">✗</text>
<text x="445" y="175" class="sm">읽기끼리만 공존 가능</text>
</svg>` },
    math: [
      { tex: R`S \text{ 가 충돌 직렬 가능} \iff \text{선행 그래프 } G(S) \text{ 에 사이클이 없다}`, explain: R`$G(S)$: 트랜잭션을 정점으로, "충돌하는 두 연산 중 $T_i$의 것이 먼저"이면 $T_i \to T_j$ 간선. 사이클이 없으면 위상 정렬 순서가 곧 동등한 직렬 실행 순서다.` },
    ],
    code: R`
import sqlite3

def precedence_graph(schedule):
  """schedule: [(트랜잭션, 'R'|'W', 항목)] → 충돌 연산의 순서로 만든 간선 집합"""
  edges = set()
  for i, (ti, oi, xi) in enumerate(schedule):
      for tj, oj, xj in schedule[i + 1:]:
          if ti != tj and xi == xj and "W" in (oi, oj):
              edges.add((ti, tj))
  return edges

def has_cycle(edges):
  graph = {}
  for a, b in edges:
      graph.setdefault(a, []).append(b)
  state = {}                                      # 0 = 방문 중, 1 = 완료
  def dfs(u):
      state[u] = 0
      for v in graph.get(u, []):
          if state.get(v) == 0 or (v not in state and dfs(v)):
              return True
      state[u] = 1
      return False
  return any(u not in state and dfs(u) for u in list(graph))

parse = lambda s: [(op[1], op[0], op[3]) for op in s.split()]    # "R1(A)" → ('1', 'R', 'A')
for name, s in [("A 처리 후 B 처리", "R1(A) W1(A) R2(A) W2(A) R1(B) W1(B) R2(B) W2(B)"),
              ("갱신 손실 패턴 ", "R1(A) R2(A) W1(A) W2(A)")]:
  e = precedence_graph(parse(s))
  verdict = "사이클 있음 → 직렬 불가능" if has_cycle(e) else "사이클 없음 → 충돌 직렬 가능"
  print(f"{name}: 간선 {sorted(e)} → {verdict}")

# 낙관적 동시성 제어: 버전 컬럼으로 '읽은 뒤 아무도 안 바꿨을 때만' 갱신
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE item (id INTEGER PRIMARY KEY, stock INTEGER, version INTEGER)")
db.execute("INSERT INTO item VALUES (1, 10, 1)")

def buy(read_stock, read_version, qty):
  cur = db.execute("UPDATE item SET stock = ?, version = version + 1 WHERE id = 1 AND version = ?",
                   (read_stock - qty, read_version))
  return cur.rowcount == 1                        # 0행이면 그사이 누군가 수정함

s1, v1 = db.execute("SELECT stock, version FROM item").fetchone()   # 사용자 1이 읽음
s2, v2 = db.execute("SELECT stock, version FROM item").fetchone()   # 사용자 2도 같은 버전을 읽음
print("사용자 1 구매(3개):", buy(s1, v1, 3))
print("사용자 2 구매(2개):", buy(s2, v2, 2), "← 버전이 바뀌어 거부")
s2, v2 = db.execute("SELECT stock, version FROM item").fetchone()   # 다시 읽고 재시도
print("사용자 2 재시도   :", buy(s2, v2, 2), "| (재고, 버전) =", db.execute("SELECT stock, version FROM item").fetchone())
db.close()
`,
    links: [
      { to: 'db-isolation', why: '락과 MVCC가 구현하는 격리 수준' },
      { to: 'os-sync', why: '운영체제의 뮤텍스·읽기-쓰기 락과 같은 문제' },
      { to: 'os-deadlock', why: '락 기반 동시성 제어의 대가 — DB는 탐지 후 롤백' },
      { to: 'ds-graph', why: '선행 그래프·대기 그래프의 사이클 탐지(DFS)' },
      { to: 'db-tx', why: '롤백이 가능하기 때문에 낙관적 방식과 교착 해소가 성립한다' },
    ],
    quiz: [
      { q: '엄격한(strict) 2PL이 배타 락을 커밋 시점까지 유지하는 이유는?',
        options: ['락을 자주 잡았다 풀면 락 관리자 오버헤드가 커지기 때문', '커밋 전에 풀면 남이 미커밋 값을 읽어, 롤백 시 연쇄 롤백이 생기기 때문', '2PL에서는 축소 단계가 정의상 커밋 이후에만 시작될 수 있기 때문', '커밋 전에 풀면 직렬 가능성 자체가 깨져 결과가 틀리기 때문'], answer: 1,
        explain: '기본 2PL도 직렬 가능성은 보장한다. 하지만 커밋 전에 배타 락을 풀면 다른 트랜잭션이 커밋되지 않은 값을 읽을 수 있고, 원래 트랜잭션이 롤백하면 그 트랜잭션도 연쇄적으로 롤백해야 한다. 연쇄 롤백(cascading abort)을 막고 복구를 단순하게 하려면 커밋까지 쥐어야 한다.' },
      { q: 'MVCC의 장점과 그 대가를 옳게 짝지은 것은?',
        options: ['버전을 하나만 두어 메모리를 아낀다 / 읽기가 쓰기를 기다린다', '읽기와 쓰기가 서로 기다리지 않는다 / 옛 버전 저장·정리 비용이 든다', '교착 상태가 완전히 사라진다 / 같은 행에 동시 쓰기가 불가능하다', '모든 이상 현상이 사라진다 / 트랜잭션마다 테이블을 복사한다'], answer: 1,
        explain: '같은 행에 대한 쓰기끼리의 충돌은 여전히 처리해야 하며, 버전 관리 비용이 생긴다.' },
      { q: '버전 컬럼을 이용한 낙관적 동시성 제어가 비관적 락보다 유리한 상황은?',
        options: ['같은 행을 많은 사용자가 동시에 자주 수정할 때', '충돌이 드물어 대부분 기다림 없이 한 번에 성공할 때', '트랜잭션이 길어 락을 오래 쥐고 있어도 괜찮을 때', '실패한 트랜잭션을 재시도할 수 없는 작업일 때'], answer: 1,
        explain: '충돌이 잦으면 재시도가 연쇄적으로 실패해 오히려 느려진다. 그때는 FOR UPDATE 같은 비관적 락이 낫다.' },
    ],
    resources: ['CMU 15-445 — Two-Phase Locking, Multi-Version Concurrency Control', '『데이터베이스 시스템』(Silberschatz 외) 18장 — 동시성 제어', 'PostgreSQL 문서 — Concurrency Control (MVCC), Routine Vacuuming'],
  },
  {
    id:'db-plan', title: '쿼리 실행 계획', advanced: true,
    summary: R`옵티마이저: 통계로 계획별 비용 추정
결정: <strong>접근 경로·조인 순서·조인 알고리즘</strong>
<code>EXPLAIN</code>으로 판독 → 성능 개선`,
    body: R`
<h3>SQL이 실행되기까지</h3>
<p>파싱(문법 검사) → 재작성(뷰 펼치기, 서브쿼리 변환 등) → <strong>최적화</strong>(같은 결과를 내는 여러 실행 계획 중 비용이 가장 낮은 것 선택) → 실행. 실행 계획은 연산자의 트리이고, 데이터는 잎(테이블 읽기)에서 뿌리(최종 결과)로 흐른다.</p>
<h3>접근 경로</h3>
<ul>
<li><strong>전체 스캔</strong>: 모든 행을 순차로 읽는다. 결과 비율이 크거나 테이블이 작을 때 최선이다.</li>
<li><strong>인덱스 스캔</strong>: 인덱스로 조건에 맞는 위치를 찾고 테이블에서 행을 가져온다. 결과가 적을 때 유리하다.</li>
<li><strong>인덱스 전용(커버링) 스캔</strong>: 필요한 열이 모두 인덱스에 있으면 테이블을 보지 않는다.</li>
</ul>
<h3>세 가지 조인 알고리즘</h3>
<ul>
<li><strong>중첩 루프 조인</strong>: 바깥 테이블의 행마다 안쪽 테이블에서 짝을 찾는다. 안쪽에 조인 키 인덱스가 있고 바깥 결과가 작으면 매우 빠르다(OLTP의 기본). 인덱스가 없으면 $|R| \times |S|$.</li>
<li><strong>해시 조인</strong>: 작은 쪽으로 조인 키의 해시 테이블을 만들고(build), 큰 쪽을 한 번 훑으며 찾는다(probe). $O(|R| + |S|)$. 등호 조인 전용이고 해시 테이블 메모리가 필요하다. 대용량 분석 질의에서 주로 쓰인다.</li>
<li><strong>정렬-병합 조인</strong>: 양쪽을 조인 키로 정렬한 뒤 병합 정렬의 병합처럼 나란히 훑는다. 이미 정렬되어 있거나(인덱스 순서), 범위 조건이거나, 결과도 정렬이 필요할 때 유리하다.</li>
</ul>
<h3>조인 순서와 비용 추정</h3>
<p>테이블이 $n$개면 조인 순서의 경우의 수가 폭발한다($n!$ 이상). 전통적인 옵티마이저(System R)는 "부분 집합을 조인하는 최선의 방법"을 저장하며 키워 가는 <strong>동적 계획법</strong>으로 탐색하고, 테이블이 아주 많으면 휴리스틱으로 줄인다. 비용 추정의 핵심은 각 단계의 결과 행 수(<strong>카디널리티</strong>)다. 통계(행 수, 열의 고유값 수, 값 분포 히스토그램)로 조건의 선택도를 추정하는데, 여러 조건은 보통 <strong>서로 독립</strong>이라고 가정해 곱한다. "도시 = 서울 AND 구 = 강남"처럼 상관된 조건에서는 이 가정이 틀려 추정이 크게 빗나가고, 엉뚱한 계획이 나온다. 데이터가 크게 바뀐 뒤 통계를 갱신하지 않아도(<code>ANALYZE</code>) 같은 일이 생긴다.</p>
<h3>흔한 성능 문제</h3>
<ul>
<li><strong>N+1 질의</strong>: ORM으로 목록을 가져온 뒤 각 항목마다 연관 데이터를 따로 조회하면 질의가 1 + N번 나간다. 왕복 비용이 누적된다 → 조인이나 IN 질의로 한 번에(eager loading).</li>
<li>인덱스를 쓸 수 없는 조건(열에 함수 적용, 앞쪽 와일드카드, 암묵적 형 변환).</li>
<li>깊은 페이지의 <code>OFFSET</code>: 앞의 행을 모두 읽고 버린다 → "마지막으로 본 키보다 큰 것" 조건으로 이어 읽기(keyset pagination).</li>
<li>필요 없는 열까지 가져오는 <code>SELECT *</code>: 커버링 인덱스를 못 쓰고 전송량이 는다.</li>
</ul>`,
    analogy: R`<p>내비게이션. 목적지(원하는 결과)만 말하면, 내비가 도로 정보(통계)를 보고 여러 경로(실행 계획)의 소요 시간을 추정해 고른다. 교통 정보가 오래됐거나(통계 미갱신), "이 두 도로는 동시에 막힌다"는 상관관계를 모르면 엉뚱한 길로 안내한다. <strong>EXPLAIN</strong>은 "어떤 경로로 가려는지 미리 보기" 버튼이다.</p>`,
    diagram: { caption: '실행 계획 트리의 예. 잎에서 테이블을 읽고, 위로 올라가며 조인·정렬·제한을 적용한다.', svg: R`
<svg viewBox="0 0 540 215" width="540">
<rect class="n" x="200" y="8" width="140" height="30" rx="6"/><text x="270" y="23" class="sm">Limit 10</text>
<rect class="n" x="200" y="55" width="140" height="30" rx="6"/><text x="270" y="70" class="sm">Sort (total DESC)</text>
<rect class="h" x="170" y="102" width="200" height="34" rx="6"/><text x="270" y="113" class="sm">Hash Join</text><text x="270" y="127" class="sm">o.customer_id = c.id</text>
<rect class="n" x="20" y="165" width="210" height="40" rx="6"/><text x="125" y="179" class="sm">Seq Scan: orders</text><text x="125" y="194" class="sm">(큰 쪽 → probe)</text>
<rect class="n" x="310" y="165" width="215" height="40" rx="6"/><text x="417" y="179" class="sm">Hash ← Index Scan: customers</text><text x="417" y="194" class="sm">WHERE city = '서울' (작은 쪽 → build)</text>
<path class="a" d="M125,165 L230,138"/><path class="a" d="M417,165 L310,138"/>
<path class="a" d="M270,102 V87"/><path class="a" d="M270,55 V40"/>
<text x="470" y="60" class="sm">데이터는</text><text x="470" y="76" class="sm">아래에서 위로</text>
</svg>` },
    math: [
      { tex: R`C_{\text{NL}} \approx |R| \cdot C_{\text{lookup}}(S),\qquad C_{\text{hash}} \approx |R| + |S|,\qquad C_{\text{SM}} \approx |R|\log|R| + |S|\log|S|`, explain: R`조인 알고리즘의 대략적인 비용.<ul class="defs"><li>$|R|, |S|$: 두 입력의 행 수</li><li>$C_\text{lookup}(S)$: 안쪽에서 짝 하나를 찾는 비용(인덱스가 있으면 $\log|S|$ 수준, 없으면 $|S|$)</li></ul>이미 정렬된 입력이면 정렬-병합의 정렬 비용이 사라진다.` },
      { tex: R`\text{sel}(A = c) \approx \frac{1}{\text{NDV}(A)},\qquad \text{sel}(p_1 \land p_2) \approx \text{sel}(p_1)\cdot\text{sel}(p_2)`, explain: R`선택도 추정. NDV: 열의 고유값 수. 두 번째 식이 독립성 가정이며, 상관된 조건에서는 실제보다 훨씬 작게 추정되는 원인이 된다.` },
    ],
    code: R`
import random, sqlite3, time
from collections import defaultdict

random.seed(0)
customers = [(i, random.choice(["서울", "부산", "대구"])) for i in range(1_000)]
orders = [(j, random.randrange(1_000), random.randint(1, 100)) for j in range(5_000)]

def nested_loop(R, S):              # 바깥 행마다 안쪽 전체를 훑음 (인덱스 없음): |R|·|S|
  return [(c, o) for c in R for o in S if o[1] == c[0]]

def hash_join(R, S):                # 작은 쪽으로 build, 큰 쪽으로 probe: |R| + |S|
  table = defaultdict(list)
  for c in R:
      table[c[0]].append(c)
  return [(c, o) for o in S for c in table.get(o[1], [])]

def sort_merge(R, S):               # 양쪽을 조인 키로 정렬 후 병합 (R의 키는 유일하다고 가정)
  R, S = sorted(R), sorted(S, key=lambda o: o[1])
  out, i = [], 0
  for o in S:
      while i < len(R) and R[i][0] < o[1]:
          i += 1
      if i < len(R) and R[i][0] == o[1]:
          out.append((R[i], o))
  return out

results = []
for f in (nested_loop, hash_join, sort_merge):
  t0 = time.perf_counter(); res = f(customers, orders); t = time.perf_counter() - t0
  results.append(sorted(res))
  print(f"{f.__name__:12s}: {len(res)}행, {t * 1e3:7.1f}ms")
assert results[0] == results[1] == results[2]        # 결과는 같고 비용만 다르다

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE customers (id INTEGER PRIMARY KEY, city TEXT)")
db.execute("CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER)")
db.executemany("INSERT INTO customers VALUES (?, ?)", customers)
db.executemany("INSERT INTO orders VALUES (?, ?, ?)", orders)
q = """SELECT c.id, SUM(o.amount) FROM customers c JOIN orders o ON o.customer_id = c.id
     WHERE c.city = '서울' GROUP BY c.id"""
# SQLite는 중첩 루프 조인 기반이라, 안쪽 테이블에 인덱스가 있는지에 따라 조인 순서가 바뀐다
for label in ["인덱스 없음", "orders(customer_id) 인덱스 추가 후"]:
  print(label, [row[-1] for row in db.execute("EXPLAIN QUERY PLAN " + q)])
  db.execute("CREATE INDEX IF NOT EXISTS idx_cust ON orders(customer_id)")

calls = 0
def run(sql, args=()):
  global calls
  calls += 1
  return db.execute(sql, args).fetchall()

for (cid,) in run("SELECT id FROM customers WHERE city = '서울'"):   # N+1 패턴
  run("SELECT SUM(amount) FROM orders WHERE customer_id = ?", (cid,))
n_plus_1, calls = calls, 0
run(q)                                                              # 한 번의 조인 질의
print(f"N+1 패턴: 질의 {n_plus_1}번 / 조인 한 번: 질의 {calls}번")
db.close()
`,
    links: [
      { to: 'db-index', why: '접근 경로 선택: 인덱스 스캔 vs 전체 스캔' },
      { to: 'ds-hash', why: '해시 조인의 build/probe' },
      { to: 'ds-sort', why: '정렬-병합 조인 = 병합 정렬의 병합 단계' },
      { to: 'ds-dp', why: '조인 순서 탐색에 쓰이는 동적 계획법' },
      { to: 'db-relational', why: '선언적 질의와 관계 대수' },
      { to: 'ds-complexity', why: '같은 결과, 다른 복잡도: |R|·|S| vs |R|+|S|' },
    ],
    quiz: [
      { q: '인덱스 없이 수천만 행짜리 두 테이블을 등호 조건으로 조인하는 분석 질의에 가장 적합한 조인 방식은?',
        options: ['중첩 루프 조인 — 바깥 행마다 안쪽을 훑는다', '해시 조인 — 작은 쪽으로 해시 표를 만들어 큰 쪽을 훑는다', '인덱스 중첩 루프 — 안쪽을 인덱스로 찾는다', '카티션 곱 — 모든 행 쌍을 만든 뒤 조건으로 걸러 낸다'], answer: 1,
        explain: '인덱스 없는 중첩 루프는 |R|·|S|로 감당할 수 없고, 인덱스 중첩 루프는 인덱스가 없으니 쓸 수 없다. 해시 조인은 각 테이블을 한 번씩만 읽는다(메모리가 부족하면 분할해서 처리).' },
      { q: '대량의 데이터를 적재한 뒤 통계를 갱신하지 않았더니 특정 질의가 갑자기 느려졌다. 가장 그럴듯한 원인은?',
        options: ['적재 중에 인덱스가 깨져 DB가 자동으로 인덱스를 비활성화해서', '오래된 통계로 결과 행 수를 잘못 추정해 맞지 않는 계획을 골라서', '테이블이 커져 질의 캐시에 들어가지 못하고 매번 다시 파싱되어서', '대량 적재 후 모든 행에 잠금이 남아 있어 읽기가 기다리게 되어서'], answer: 1,
        explain: '비용 기반 옵티마이저의 판단은 통계만큼만 정확하다. ANALYZE로 통계를 갱신하고 EXPLAIN으로 계획을 확인한다.' },
      { q: 'ORM 코드에서 게시글 100개를 가져온 뒤 각 글의 작성자를 따로 조회하는 "N+1 문제"를 해결하는 방법은?',
        options: ['ORM 캐시를 끄고 매번 DB에서 새로 읽게 한다', '조인이나 IN (...) 질의로 작성자를 한 번에 가져온다', '게시글을 페이지 단위로 10개씩 나눠 가져온다', '작성자 테이블에 인덱스를 추가해 조회를 빠르게 한다'], answer: 1,
        explain: '질의 하나의 비용은 작아도 101번의 왕복(네트워크 지연, 파싱, 계획)이 누적된다. 인덱스는 각 질의를 조금 빠르게 할 뿐 왕복 횟수는 그대로다. 조인이나 IN 질의로 한 번에 가져오는 것을 eager loading이라 한다.' },
    ],
    resources: ['CMU 15-445 — Join Algorithms, Query Planning & Optimization', 'Selinger et al., "Access Path Selection in a Relational Database Management System" (System R, 1979)', 'PostgreSQL 문서 — Using EXPLAIN', '『SQL 전문가 가이드』 — SQL 옵티마이저, 조인 수행 원리'],
  },
  {
    id:'db-nosql', title: 'NoSQL',
    summary: R`고정 스키마·조인·강한 일관성 일부 포기
얻는 것: <strong>수평 확장</strong>, <strong>접근 패턴 맞춤 데이터 모델</strong>
핵심 결정: 데이터 모델·파티셔닝·복제와 일관성`,
    body: R`
<h3>왜 등장했나</h3>
<p>관계형 DB는 한 대의 서버를 크게 키우는(수직 확장) 방식에 익숙하다. 웹 서비스 규모가 커지면서 데이터와 요청을 <strong>여러 대의 서버로 나누는(수평 확장)</strong> 것이 필요해졌고, 이때 여러 서버에 걸친 조인과 강한 일관성의 트랜잭션은 매우 비싸다. NoSQL 시스템들은 그 기능을 줄이거나 포기하고 확장성·가용성·유연성을 택했다.</p>
<h3>데이터 모델</h3>
<ul>
<li><strong>키-값</strong>(Redis, DynamoDB 기본 사용): 키로 값을 저장·조회. 가장 단순하고 빠르다. 캐시, 세션, 카운터에 적합.</li>
<li><strong>문서</strong>(MongoDB 등): JSON 같은 문서 단위로 저장. 주문과 주문 항목처럼 <strong>함께 읽는 데이터를 한 문서에 내장</strong>하면 조인 없이 한 번에 읽는다(반정규화). 대신 여러 문서에 흩어진 데이터를 일관되게 갱신하거나 다대다 관계를 다루기는 어렵다.</li>
<li><strong>와이드 컬럼</strong>(Cassandra, HBase): 파티션 키로 서버를 정하고, 파티션 안에서는 정렬 키 순서로 저장. 시계열·로그처럼 쓰기가 많고 "이 장치의 최근 기록" 같은 질의가 정해진 경우에 강하다.</li>
<li><strong>그래프</strong>(Neo4j 등): 노드와 관계를 일급으로 저장해 "친구의 친구" 같은 다단계 관계 탐색에 강하다.</li>
</ul>
<p>관계형 설계가 "데이터를 먼저 정규화하고 질의는 나중에"라면, 많은 NoSQL 설계는 <strong>"질의(접근 패턴)를 먼저 정하고 그에 맞춰 키와 중복을 설계"</strong>한다.</p>
<h3>파티셔닝(샤딩)</h3>
<p>데이터를 여러 노드에 나눈다. <strong>범위 파티셔닝</strong>은 범위 질의에 좋지만 특정 범위에 쓰기가 몰릴 수 있고, <strong>해시 파티셔닝</strong>은 고르게 퍼지지만 범위 질의가 어렵다. <code>hash(key) mod N</code>으로 나누면 노드를 하나 추가할 때 거의 모든 키의 위치가 바뀐다. <strong>일관된 해싱</strong>은 노드와 키를 같은 해시 링 위에 놓고 키를 시계 방향 다음 노드에 배정해, 노드 추가·제거 시 그 주변의 키만 이동하게 한다(가상 노드를 여러 개 두어 부하를 고르게 한다).</p>
<h3>복제와 일관성</h3>
<p>장애에 대비해 각 데이터를 여러 노드에 복제한다. 리더 하나가 쓰기를 받아 팔로워에 전파하는 방식과, 아무 노드나 쓰기를 받는 리더리스 방식이 있다. 리더리스에서 복제본 $N$개 중 $W$개에 쓰고 $R$개에서 읽을 때 $R + W > N$이면 읽기 집합과 쓰기 집합이 반드시 겹쳐 최신 값을 하나 이상 보게 된다(쿼럼).</p>
<p><strong>CAP 정리</strong>: 네트워크 분할(노드 사이 통신 단절)이 생기면, 모든 노드가 최신 값을 보여 주는 <strong>일관성</strong>과 모든 요청에 응답하는 <strong>가용성</strong> 중 하나를 포기해야 한다. 분할이 없을 때도 지연 시간과 일관성 사이의 선택이 있다(PACELC). 많은 NoSQL 시스템은 기본적으로 <strong>최종적 일관성</strong>(언젠가는 모든 복제본이 같아짐)을 택하고, 요청별로 더 강한 일관성을 고를 수 있게 한다.</p>
<h3>저장 엔진: LSM-Tree</h3>
<p>Cassandra, RocksDB 같은 쓰기 중심 시스템은 B-Tree처럼 제자리를 수정하지 않고, 쓰기를 메모리의 정렬된 버퍼에 모았다가 디스크에 <strong>순차적으로</strong> 새 파일로 내려 쓰고, 백그라운드에서 파일들을 병합한다. 쓰기는 빠르지만 읽을 때 여러 파일을 확인해야 할 수 있다.</p>
<h3>선택 기준</h3>
<p>대부분의 서비스는 관계형 DB로 시작하는 것이 안전하다(트랜잭션, 조인, 성숙한 도구). 특정 접근 패턴, 규모, 가용성 요구가 관계형으로 감당하기 어렵다는 것이 확인되면 맞는 NoSQL을 함께 쓴다. 최근에는 관계형 인터페이스를 유지하면서 수평 확장하는 분산 SQL(NewSQL) 시스템도 있다.</p>`,
    analogy: R`<p>관계형 DB가 <strong>잘 정리된 중앙 도서관</strong>(모든 책이 분류 체계를 따르고, 어떤 질문이든 사서가 여러 서가를 조합해 답해 줌)이라면, NoSQL은 <strong>목적별 창고 체인</strong>이다. 각 지점은 "주문 번호로 상자 꺼내기"처럼 정해진 요청을 아주 빠르게 처리하도록 물건을 미리 묶어 두었고, 지점을 계속 늘릴 수 있다. 대신 "모든 지점의 재고를 합쳐 정확한 순간값을 알려 줘" 같은 질문은 느리거나, 잠깐은 조금 어긋난 답을 준다.</p>`,
    diagram: { caption: '일관된 해싱. 키는 링에서 시계 방향 첫 노드에 저장된다. 노드 D를 추가하면 A와 D 사이의 키(k1)만 D로 옮겨진다.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<circle class="e" cx="270" cy="110" r="80"/>
<circle class="h" cx="310" cy="40.7" r="14"/><text x="310" y="41" class="sm">A</text>
<circle class="h" cx="310" cy="179.3" r="14"/><text x="310" y="180" class="sm">B</text>
<circle class="h" cx="190" cy="110" r="14"/><text x="190" y="111" class="sm">C</text>
<circle class="n" cx="350" cy="110" r="14" style="stroke-dasharray:4 3"/><text x="350" y="111" class="sm">D</text>
<circle class="fill" cx="339.3" cy="70" r="5"/><text x="365" y="62" class="sm">k1</text>
<circle class="n" cx="339.3" cy="150" r="5"/><text x="365" y="158" class="sm">k2</text>
<circle class="n" cx="242.6" cy="185.2" r="5"/><text x="232" y="204" class="sm">k3</text>
<circle class="n" cx="218.6" cy="48.7" r="5"/><text x="205" y="36" class="sm">k4</text>
<path class="ha" d="M342,76 Q352,90 350,94"/>
<text x="290" y="110" class="sm">시계 방향 →</text>
<text x="420" y="60" class="st sm">키 → 시계 방향 첫 노드</text>
<text x="420" y="85" class="st sm">D 추가: k1만 B → D로 이동</text>
<text x="420" y="110" class="st sm">k2·k3·k4는 그대로</text>
<text x="420" y="145" class="st sm">mod N 방식이면</text>
<text x="420" y="165" class="st sm">대부분의 키가 이동</text>
</svg>` },
    math: [
      { tex: R`R + W > N \;\Rightarrow\; \text{읽기 복제본 집합} \cap \text{쓰기 복제본 집합} \neq \varnothing`, explain: R`<ul class="defs"><li>$N$: 복제본 수</li><li>$W$: 쓰기 성공으로 간주하는 응답 수</li><li>$R$: 읽을 때 조회하는 수</li></ul>비둘기집 원리로 두 집합이 겹쳐 최신 쓰기를 적어도 하나 본다. 예: $N=3, W=2, R=2$.` },
      { tex: R`\text{노드 } n \to n+1 \text{ 추가 시 이동하는 키 비율: } \underbrace{\approx 1 - \tfrac{1}{n+1}}_{\text{mod } N} \quad \text{vs} \quad \underbrace{\approx \tfrac{1}{n+1}}_{\text{일관된 해싱}}`, explain: R`mod $N$에서는 $h \bmod n$과 $h \bmod (n+1)$이 같은 키가 드물다. 일관된 해싱에서는 새 노드가 가져가야 할 몫만큼만 이동한다.` },
    ],
    code: R`
import bisect, hashlib, json
from itertools import combinations

def h(key):
  return int(hashlib.md5(key.encode()).hexdigest(), 16)

keys = [f"user:{i}" for i in range(10_000)]

moved = sum(h(k) % 4 != h(k) % 5 for k in keys)              # 1) 해시 mod N: 노드 4 → 5개
print(f"mod N 방식: 키의 {moved / len(keys):.0%}가 다른 노드로 이동")

class Ring:                                                    # 2) 일관된 해싱 (+ 가상 노드)
  def __init__(self, nodes, vnodes=100):
      self.points = sorted((h(f"{n}#{v}"), n) for n in nodes for v in range(vnodes))
      self.hashes = [p for p, _ in self.points]
  def node(self, key):                                       # 시계 방향으로 첫 번째 노드
      i = bisect.bisect(self.hashes, h(key)) % len(self.points)
      return self.points[i][1]

before, after = Ring(list("ABCD")), Ring(list("ABCDE"))
moved = sum(before.node(k) != after.node(k) for k in keys)
print(f"일관된 해싱: 키의 {moved / len(keys):.0%}만 이동 (이상적으로는 1/5 = 20%)")
print("노드별 키 수:", {n: sum(after.node(k) == n for k in keys) for n in "ABCDE"})

N = 3                                                          # 3) 쿼럼
for R, W in [(1, 1), (2, 2), (1, 3)]:
  overlap = all(set(r) & set(w) for r in combinations(range(N), R) for w in combinations(range(N), W))
  print(f"N={N}, R={R}, W={W}: R+W>N = {R + W > N}, 모든 읽기가 최신 쓰기와 겹침 = {overlap}")

order_doc = {"_id": "order:101",                               # 4) 문서 모델: 함께 읽는 데이터를 내장
           "customer": {"id": 1, "name": "양의지"},
           "items": [{"sku": "A1", "qty": 2}, {"sku": "B7", "qty": 1}]}
print("문서 한 번 읽기로 주문 화면 완성:", json.dumps(order_doc, ensure_ascii=False))
`,
    links: [
      { to: 'db-relational', why: '관계형 모델이 제공하는 것과 NoSQL이 포기하는 것' },
      { to: 'db-normal', why: '문서 모델의 내장은 의도적 반정규화' },
      { to: 'ds-hash', why: '해시 파티셔닝과 일관된 해싱' },
      { to: 'db-tx', why: '분산 환경에서 트랜잭션이 어려운 이유' },
      { to: 'db-vector', why: '임베딩 검색에 특화된 또 하나의 전문 저장소' },
    ],
    quiz: [
      { q: '샤드를 hash(key) mod N으로 정할 때 서버를 한 대 추가하면 생기는 문제는?',
        options: ['해시 함수를 바꿔야 해서 기존 키를 모두 다시 해시해야 한다', 'N이 바뀌어 대부분의 키가 다른 서버로 배정되어 대량 이동이 생긴다', '새 서버에만 키가 몰려 부하가 한쪽으로 쏠리는 핫스팟이 생긴다', '새 서버는 기존 키를 받지 못해 데이터가 기존 서버에 계속 쌓인다'], answer: 1,
        explain: '일관된 해싱은 키와 노드를 같은 링에 놓아 추가된 노드 주변의 키만 옮기게 한다.' },
      { q: '복제본 3개(N=3)인 리더리스 저장소에서 W=2, R=2로 설정하는 이유는?',
        options: ['복제본 두 곳에만 써서 저장 공간을 3분의 2로 아끼려고', 'R + W > N이라 읽기·쓰기 집합이 반드시 겹쳐 최신 값을 보려고', '쓰기를 두 곳에만 기다려 W=3보다 빠르면서 지연이 없게 하려고', '한 노드가 죽어도 쓰기를 받을 수 있게 리더를 하나 정하려고'], answer: 1,
        explain: 'W=1, R=1이면 빠르지만 오래된 값을 읽을 수 있다. 쿼럼 크기로 일관성과 지연·가용성을 조절한다.' },
      { q: '문서 DB에서 주문 문서 안에 고객 이름을 내장(복사)해 두는 설계의 장단점은?',
        options: ['장점: 주문 조회가 한 번에 끝남 / 단점: 이름이 바뀌면 여러 문서를 갱신해야 함', '장점: 고객 이름을 한 곳에만 두어 공간 절약 / 단점: 주문마다 조인이 필요함', '장점: 이름 변경이 모든 주문에 자동 반영됨 / 단점: 문서 크기가 커짐', '장점: 고객 문서를 지워도 주문이 남음 / 단점: 주문 조회 때 두 번 읽어야 함'], answer: 0,
        explain: '반정규화의 트레이드오프 그대로다. 주문 시점의 이름을 기록으로 남기는 것이 의도라면 오히려 장점이 되기도 한다.' },
    ],
    resources: ['Martin Kleppmann, 『데이터 중심 애플리케이션 설계』 2장(데이터 모델), 5장(복제), 6장(파티셔닝)', 'DeCandia et al., "Dynamo: Amazon\'s Highly Available Key-value Store" (2007)', 'Karger et al., "Consistent Hashing and Random Trees" (1997)'],
  },
  {
    id:'db-vector', title: '벡터 DB',
    summary: R`임베딩 저장 + 질의와 <strong>가장 비슷한 k개</strong> 검색
<strong>ANN 인덱스</strong>: recall 일부 양보 → 속도
RAG의 검색 단계 담당`,
    body: R`
<h3>무엇을 하는가</h3>
<p>텍스트·이미지를 임베딩 모델로 수백~수천 차원의 벡터로 바꾸면, <strong>의미가 비슷한 것끼리 가까운 벡터</strong>가 된다. "환불 규정"을 물으면 "반품 정책" 문서를 찾는 의미 검색, 추천, 중복 탐지, 그리고 LLM에 관련 문서를 넣어 주는 RAG가 모두 "질의 벡터와 가장 가까운 k개 찾기"다. 해시 테이블이 "정확히 같은 키"를 찾는다면, 벡터 DB는 "가장 비슷한 것"을 찾는다.</p>
<h3>왜 그냥 다 비교하지 않는가</h3>
<p>정확한 방법은 모든 벡터와 거리를 재는 것이다(brute force, $O(nd)$). 벡터 1억 개 × 768차원이면 질의 하나에 수백억 번의 곱셈이다. 저차원에서는 KD-트리처럼 공간을 나누는 구조로 빠르게 할 수 있지만, 고차원에서는 차원의 저주 때문에 거의 모든 영역을 확인해야 해서 효과가 사라진다. 그래서 정확한 답을 포기하고 <strong>대부분 맞히는 근사 탐색</strong>을 쓴다.</p>
<h3>대표적인 ANN 인덱스</h3>
<ul>
<li><strong>IVF(역 파일 인덱스)</strong>: k-means로 벡터들을 군집으로 나누고, 각 군집에 속한 벡터 목록을 저장한다. 질의가 오면 가장 가까운 군집 <code>nprobe</code>개만 확인한다. nprobe를 늘리면 정확도↑ 속도↓.</li>
<li><strong>HNSW(계층적 탐색 가능 작은 세상 그래프)</strong>: 각 벡터를 가까운 이웃들과 간선으로 연결한 그래프를 여러 층으로 만든다. 듬성듬성한 상위 층에서 큰 보폭으로 목적지 근처까지 가고, 아래층으로 내려가며 세밀하게 탐욕적으로 이동한다. 정확도와 속도가 좋아 많이 쓰이지만 그래프를 메모리에 두어야 한다.</li>
<li><strong>PQ(곱 양자화)</strong>: 벡터를 여러 조각으로 나누고 각 조각을 작은 코드북의 번호로 바꿔 저장한다. 메모리를 수십 배 줄이고 거리도 근사로 빠르게 계산한다. IVF와 함께 쓰는 경우가 많다(IVF-PQ).</li>
<li><strong>LSH</strong>: 비슷한 벡터가 같은 버킷에 떨어질 확률이 높도록 설계한 해시 함수를 여러 개 쓴다.</li>
</ul>
<p>평가는 <strong>recall@k</strong>(정확한 top-k 중 몇 개를 찾았는가), 초당 질의 수(QPS), 메모리, 색인 구축 시간의 트레이드오프로 한다.</p>
<h3>거리와 정규화</h3>
<p>코사인 유사도, 내적, 유클리드 거리 중 임베딩 모델이 학습된 기준을 써야 한다. 벡터를 길이 1로 정규화하면 세 기준의 순위가 같아진다.</p>
<h3>실무에서 부딪히는 문제</h3>
<ul>
<li><strong>메타데이터 필터</strong>: "2024년 이후 문서 중에서"처럼 조건을 걸 때, 근사 검색 후에 거르면 결과가 k개보다 적어지고, 먼저 거르면 인덱스를 제대로 못 쓴다. 벡터 DB마다 처리 방식이 다르다.</li>
<li><strong>하이브리드 검색</strong>: 임베딩은 의미에 강하지만 제품 코드·고유명사 같은 정확한 단어 일치에 약하다. 키워드 검색(BM25)과 벡터 검색 결과를 합치는(예: 순위 역수 결합) 방식을 많이 쓴다.</li>
<li><strong>재색인</strong>: 임베딩 모델을 바꾸면 벡터 공간 자체가 달라져, 모든 문서를 다시 임베딩하고 색인해야 한다. 서로 다른 모델의 벡터는 비교할 수 없다.</li>
<li><strong>선택지</strong>: 전용 벡터 DB, 기존 DB의 확장(PostgreSQL의 pgvector 등), 라이브러리(FAISS 등). 데이터가 크지 않다면 기존 DB 확장으로 시작하는 것도 합리적이다.</li>
</ul>`,
    analogy: R`<p>거대한 도서관에서 "이 책과 비슷한 책"을 찾기. 모든 책을 하나씩 비교하면(brute force) 정확하지만 끝이 없다. 그래서 책을 <strong>주제별 서가</strong>로 미리 나눠 두고(IVF 군집), 비슷해 보이는 서가 몇 곳만 둘러본다. 경계 근처의 좋은 책을 가끔 놓칠 수 있지만(recall &lt; 1), 훨씬 빠르다. 둘러볼 서가 수(nprobe)를 늘리면 덜 놓치는 대신 오래 걸린다.</p>`,
    diagram: { caption: 'IVF 인덱스. 벡터를 군집으로 나누고(×는 군집 중심), 질의(★)와 가까운 군집 nprobe개만 탐색한다. 여기서는 nprobe = 2.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<circle class="g" cx="80" cy="60" r="42"/><circle class="h" cx="200" cy="50" r="42"/><circle class="g" cx="330" cy="70" r="42"/>
<circle class="g" cx="110" cy="165" r="42"/><circle class="h" cx="240" cy="155" r="42"/><circle class="g" cx="370" cy="170" r="42"/>
<text x="80" y="60">×</text><text x="200" y="50">×</text><text x="330" y="70">×</text><text x="110" y="165">×</text><text x="240" y="155">×</text><text x="370" y="170">×</text>
<circle class="fill" cx="62" cy="45" r="3"/><circle class="fill" cx="95" cy="78" r="3"/><circle class="fill" cx="70" cy="85" r="3"/>
<circle class="fill" cx="185" cy="30" r="3"/><circle class="fill" cx="222" cy="62" r="3"/><circle class="fill" cx="205" cy="80" r="3"/>
<circle class="fill" cx="315" cy="55" r="3"/><circle class="fill" cx="350" cy="90" r="3"/><circle class="fill" cx="345" cy="50" r="3"/>
<circle class="fill" cx="95" cy="150" r="3"/><circle class="fill" cx="130" cy="185" r="3"/><circle class="fill" cx="90" cy="180" r="3"/>
<circle class="fill" cx="225" cy="138" r="3"/><circle class="fill" cx="258" cy="172" r="3"/><circle class="fill" cx="222" cy="175" r="3"/>
<circle class="fill" cx="355" cy="155" r="3"/><circle class="fill" cx="390" cy="190" r="3"/><circle class="fill" cx="385" cy="150" r="3"/>
<text x="215" y="105" style="font-size:20px">★</text>
<path class="ha d" d="M215,96 L203,62"/><path class="ha d" d="M220,113 L236,143"/>
<text x="430" y="50" class="st sm">1) 구축: k-means로 군집</text>
<text x="430" y="72" class="st sm">2) 저장: 벡터를 가장</text>
<text x="430" y="88" class="st sm">   가까운 군집 목록에</text>
<text x="430" y="112" class="st sm">3) 검색: 질의와 가까운</text>
<text x="430" y="128" class="st sm">   군집 nprobe개만 비교</text>
<text x="430" y="160" class="st sm">경계 근처 이웃은</text>
<text x="430" y="176" class="st sm">놓칠 수 있다 (recall &lt; 1)</text>
</svg>` },
    math: [
      { tex: R`\cos(\mathbf q, \mathbf x) = \frac{\mathbf q^\top \mathbf x}{\lVert\mathbf q\rVert\,\lVert\mathbf x\rVert}, \qquad \text{recall@}k = \frac{|\text{ANN}_k(\mathbf q) \cap \text{Exact}_k(\mathbf q)|}{k}`, explain: R`코사인 유사도와 근사 검색의 정확도 지표. recall@10 = 0.9는 정확한 상위 10개 중 9개를 찾았다는 뜻이다.` },
      { tex: R`\text{IVF 비용} \approx \underbrace{n_{\text{list}} \cdot d}_{\text{중심과 비교}} + \underbrace{n_{\text{probe}} \cdot \tfrac{n}{n_{\text{list}}} \cdot d}_{\text{후보와 비교}} \quad \text{vs} \quad n \cdot d`, explain: R`<ul class="defs"><li>$n$: 벡터 수</li><li>$d$: 차원</li><li>$n_\text{list}$: 군집 수</li><li>$n_\text{probe}$: 탐색할 군집 수</li></ul>군집 크기가 고르다고 가정한 대략적 비용.` },
    ],
    code: R`
import numpy as np
rng = np.random.default_rng(0)

n, d, k = 20_000, 64, 10
centers = rng.normal(size=(200, d))                    # 의미 주제 200개를 흉내 낸, 서로 겹치는 군집 데이터
sample = lambda m: centers[rng.integers(0, 200, m)] + rng.normal(size=(m, d))
X = sample(n)
X /= np.linalg.norm(X, axis=1, keepdims=True)          # 정규화 → 내적 = 코사인 유사도
Q = sample(100)                                        # 저장된 적 없는 새 질의 100개
Q /= np.linalg.norm(Q, axis=1, keepdims=True)

def exact_topk(q):                                     # 전수 비교: n·d 연산
  return np.argpartition(-(X @ q), k)[:k]

nlist = 100                                            # IVF 구축: k-means로 군집 → 군집별 벡터 목록
C = X[rng.choice(n, nlist, replace=False)]
for _ in range(10):
  assign = np.argmax(X @ C.T, axis=1)
  C = np.array([X[assign == j].mean(0) if np.any(assign == j) else C[j] for j in range(nlist)])
  C /= np.linalg.norm(C, axis=1, keepdims=True)
assign = np.argmax(X @ C.T, axis=1)
lists = [np.flatnonzero(assign == j) for j in range(nlist)]

def ivf_topk(q, nprobe):
  probe = np.argpartition(-(C @ q), nprobe)[:nprobe]                 # 질의와 가까운 군집 nprobe개
  cand = np.concatenate([lists[j] for j in probe])
  top = cand[np.argpartition(-(X[cand] @ q), min(k, len(cand) - 1))[:k]]
  return top, nlist + len(cand)                                      # 거리 계산 횟수

for nprobe in [1, 4, 16]:
  recall, cost = [], []
  for q in Q:
      approx, c = ivf_topk(q, nprobe)
      recall.append(len(set(approx) & set(exact_topk(q))) / k)
      cost.append(c)
  print(f"nprobe={nprobe:2d}: recall@{k} = {np.mean(recall):.3f}, 거리 계산 {np.mean(cost):6.0f}회 (전수 비교 {n}회)")
`,
    links: [
      { to: 'ml-knn', why: '벡터 검색 = 대규모 KNN, 차원의 저주' },
      { to: 'ds-hash', why: '정확한 일치(해시) vs 유사도 검색, LSH' },
      { to: 'ml-clustering', why: 'IVF 인덱스는 k-means 군집을 쓴다' },
      { to: 'ai-embedding', why: '벡터를 만드는 임베딩 모델' },
      { to: 'ai-rag', why: 'RAG의 검색 단계' },
      { to: 'math-vector', why: '내적, 노름, 코사인 유사도' },
    ],
    quiz: [
      { q: '벡터 1억 개에서 비슷한 벡터를 찾을 때 근사 최근접 탐색(ANN)을 쓰는 이유는?',
        options: ['고차원에서는 정확한 최근접 이웃이 수학적으로 정의되지 않아서', '전수 비교는 너무 느리고 고차원에선 공간 분할 트리도 효과가 없어서', 'ANN은 군집 중심만 비교하므로 전수 비교보다 오히려 더 정확해서', '정확한 탐색은 GPU에서 실행할 수 없어 CPU로만 처리해야 해서'], answer: 1,
        explain: '실무에서는 recall 0.9~0.99 수준이면 충분한 경우가 많고, 속도는 수십~수천 배 빨라진다.' },
      { q: 'IVF 인덱스에서 nprobe를 늘리면?',
        options: ['더 많은 군집을 보지만 계산은 그대로라 속도·정확도 모두 좋아진다', '더 많은 군집을 확인해 recall은 오르고 거리 계산이 늘어 느려진다', '군집 수 자체가 늘어나므로 인덱스를 처음부터 다시 만들어야 한다', '확인할 군집이 줄어 빨라지지만 recall이 떨어진다'], answer: 1,
        explain: '질의 시점에 조절하는 정확도-속도 손잡이다. nprobe = nlist면 전수 비교와 같다.' },
      { q: '서비스의 임베딩 모델을 새 버전으로 바꿀 때 모든 문서를 다시 임베딩·색인해야 하는 이유는?',
        options: ['벡터 DB가 모델 버전별로 별도 컬렉션만 허용하도록 정해져 있어서', '모델마다 벡터 공간이 달라 새 질의와 옛 문서 벡터의 거리가 무의미해서', '새 모델은 벡터 차원이 항상 두 배라 옛 인덱스에 들어가지 않아서', '옛 벡터는 정규화되어 있지 않아 코사인 유사도를 계산할 수 없어서'], answer: 1,
        explain: '같은 모델로 만든 벡터끼리만 "가까움 = 의미가 비슷함"이 성립한다. 그래서 임베딩 모델 교체는 재색인 비용을 고려해 계획해야 한다.' },
    ],
    resources: ['Malkov & Yashunin, "Efficient and Robust Approximate Nearest Neighbor Search Using HNSW Graphs" (2016)', 'Jégou et al., "Product Quantization for Nearest Neighbor Search" (2011)', 'FAISS 위키 — Guidelines to choose an index', 'pgvector 문서 (PostgreSQL 벡터 확장)'],
  },
  {
    id:'db-er', title: 'ER 모델과 개념적 설계',
    summary: R`설계 단계: 요구 분석 → <strong>개념적</strong>(ER) → <strong>논리적</strong>(릴레이션) → <strong>물리적</strong>(저장 구조)
ER 구성: 개체(□) · 관계(◇) · 속성(○) + 카디널리티 1:1 · 1:N · M:N`,
    body: R`
<h3>1. 데이터베이스 설계 단계</h3>
<table><tr><th>단계</th><th>결과물</th><th>하는 일</th><th>DBMS 종속</th></tr>
<tr><td>요구사항 분석</td><td>요구사항 명세서</td><td>어떤 데이터를 어떻게 쓰는지 수집</td><td>-</td></tr>
<tr><td><strong>개념적 설계</strong></td><td><strong>ER 다이어그램</strong></td><td>개체·관계·속성 도출, 트랜잭션 모델링</td><td>독립</td></tr>
<tr><td><strong>논리적 설계</strong></td><td>릴레이션 스키마</td><td>ER을 테이블로 변환(매핑), <strong>정규화</strong>, 트랜잭션 인터페이스 설계</td><td>데이터 모델(관계형 등)에 종속</td></tr>
<tr><td><strong>물리적 설계</strong></td><td>저장 구조</td><td>인덱스, 레코드 배치, 접근 경로, 반정규화 검토</td><td>특정 DBMS에 종속</td></tr>
<tr><td>구현</td><td>DDL</td><td>실제 테이블 생성</td><td>종속</td></tr></table>
<p>필기 포인트: 개념적 설계는 "무엇을 저장할지"를 DBMS와 무관하게 표현하고, 물리적 설계로 갈수록 특정 제품과 성능에 가까워진다. 정규화는 <strong>논리적 설계</strong> 단계다.</p>
<h3>2. 3단계 스키마와 데이터 독립성</h3>
<ul>
<li><strong>외부 스키마</strong>(서브스키마): 사용자·응용 프로그램마다 보는 부분(뷰). 여러 개.</li>
<li><strong>개념 스키마</strong>: 조직 전체의 논리 구조. 모든 개체·관계·<strong>제약 조건·접근 권한</strong>을 포함. DB당 하나.</li>
<li><strong>내부 스키마</strong>: 물리적 저장 방식(레코드 형식, 인덱스, 저장 위치). 하나.</li>
</ul>
<p>단계 사이에 사상(매핑)이 있어서 한 단계를 바꿔도 위 단계가 영향을 덜 받는다. <strong>논리적 독립성</strong>: 개념 스키마가 바뀌어도 외부 스키마(응용 프로그램)는 그대로. <strong>물리적 독립성</strong>: 내부 스키마(인덱스 추가, 저장 장치 변경)가 바뀌어도 개념 스키마는 그대로.</p>
<h3>3. ER 다이어그램 구성 요소 (피터 첸 표기)</h3>
<table><tr><th>기호</th><th>의미</th></tr>
<tr><td>사각형</td><td><strong>개체</strong>(entity): 독립적으로 존재하는 대상 (학생, 과목)</td></tr>
<tr><td>이중 사각형</td><td><strong>약한 개체</strong>: 자기 키만으로 식별되지 않고 소유 개체에 의존 (직원의 부양가족)</td></tr>
<tr><td>마름모</td><td><strong>관계</strong>(relationship) / 이중 마름모: 약한 개체의 식별 관계</td></tr>
<tr><td>타원</td><td><strong>속성</strong> / 밑줄: 키 속성 / 이중 타원: <strong>다중값</strong> 속성 / 점선 타원: <strong>유도</strong> 속성</td></tr>
<tr><td>선 / 이중선</td><td>연결 / 이중선은 <strong>전체 참여</strong>(모든 개체가 관계에 참여해야 함)</td></tr></table>
<p><strong>속성의 종류</strong>: 단일값 vs <strong>다중값</strong>(연락처 여러 개), 단순 vs <strong>복합</strong>(주소 = 시 + 구 + 도로명), 저장 vs <strong>유도</strong>(생년에서 계산되는 나이), 그리고 개체를 식별하는 <strong>키 속성</strong>.</p>
<h3>4. 관계의 제약</h3>
<ul>
<li><strong>카디널리티(대응 수)</strong>: 1:1(사람-여권), 1:N(학과-학생), M:N(학생-과목).</li>
<li><strong>참여 제약</strong>: 전체 참여(모든 학생은 반드시 학과에 소속) vs 부분 참여(모든 교수가 학과장인 것은 아님). (최소, 최대)로 쓰기도 한다: 학생 쪽 (1, 1)은 "반드시 하나의 학과".</li>
<li><strong>관계의 차수</strong>: 참여하는 개체 수. 단항(순환: 직원-관리-직원), 이항, 삼항.</li>
</ul>
<p>실무에서는 첸 표기 대신 <strong>까마귀발(IE) 표기</strong>를 많이 쓴다. 관계를 선 하나로 그리고, 선 끝 모양으로 개수를 나타낸다: 세 갈래(까마귀발) = 여러 개, 세로선 = 하나, 원 = 0개 가능(선택).</p>
<h3>5. ER → 릴레이션 매핑 규칙 (논리적 설계)</h3>
<table><tr><th>ER 요소</th><th>변환 방법</th></tr>
<tr><td>개체</td><td>테이블 하나. 키 속성이 기본키</td></tr>
<tr><td>1:N 관계</td><td><strong>N쪽</strong> 테이블에 1쪽 기본키를 외래키로 추가</td></tr>
<tr><td>1:1 관계</td><td>한쪽(보통 전체 참여 쪽)에 상대 기본키를 외래키로. 둘 다 전체 참여면 한 테이블로 합치기도 함</td></tr>
<tr><td><strong>M:N 관계</strong></td><td><strong>관계 자체를 새 테이블로</strong>. 양쪽 기본키를 외래키로 갖고, 그 조합이 기본키. 관계의 속성(성적)도 이 테이블에</td></tr>
<tr><td>다중값 속성</td><td>별도 테이블 (원래 키 + 속성값). 한 칸에 여러 값을 넣지 않는다(제1정규형)</td></tr>
<tr><td>복합 속성</td><td>단순 속성들로 분해해 각각 열로</td></tr>
<tr><td>유도 속성</td><td>보통 저장하지 않고 질의로 계산 (성능 때문에 저장하면 반정규화)</td></tr>
<tr><td>약한 개체</td><td>소유 개체의 기본키 + 자신의 부분키를 기본키로</td></tr></table>
<p>M:N을 한쪽 테이블의 외래키로 처리할 수 없는 이유: 학생 행에 과목 외래키 열을 두면 한 학생이 여러 과목을 들을 때 한 칸에 여러 값이 필요해진다. 관계 테이블을 두면 "학생 하나 - 과목 하나"가 한 행이 된다.</p>`,
    analogy: R`<p>건물을 짓기 전의 설계 과정. 건축주의 요구를 듣고(요구 분석), 방과 동선을 스케치한다(개념적 설계 = ER: 자재나 공법과 무관). 그다음 철근 콘크리트 구조로 도면을 그리고(논리적 설계: 관계형이라는 방식을 정함), 마지막으로 특정 시공사의 자재 규격에 맞춰 시공 도면을 만든다(물리적 설계). 스케치 단계에서 방을 잘못 나누면 이후 모든 도면이 틀어지듯, ER 설계 실수는 나중에 고치기가 가장 비싸다.</p>`,
    diagram: { caption: '첸 표기 ER 다이어그램. 학생과 과목은 M:N 관계(수강)이고, 성적은 관계의 속성이다. 학번·과목코드(밑줄)는 키, 연락처(이중 타원)는 다중값, 나이(점선)는 유도 속성. 매핑하면 학생, 과목, 수강(학번, 과목코드, 성적), 학생_연락처 4개 테이블이 된다.', svg: R`
<svg viewBox="0 0 580 225" width="580">
<path class="e" d="M70,95 L50,51 M110,95 L135,51 M70,135 L50,174 M110,135 L135,174 M280,85 L280,56 M450,95 L430,51 M490,95 L520,51"/>
<path class="e" d="M140,115 L225,115 M335,115 L420,115"/>
<rect class="h" x="40" y="95" width="100" height="40"/><text x="90" y="115">학생</text>
<polygon class="h" points="225,115 280,85 335,115 280,145"/><text x="280" y="115">수강</text>
<rect class="h" x="420" y="95" width="100" height="40"/><text x="470" y="115">과목</text>
<text x="180" y="103" class="sm">M</text><text x="378" y="103" class="sm">N</text>
<ellipse class="n" cx="50" cy="35" rx="38" ry="16"/><text x="50" y="35">학번</text><path class="e" d="M36,45 L64,45"/>
<ellipse class="n" cx="135" cy="35" rx="38" ry="16"/><text x="135" y="35">이름</text>
<ellipse class="n" cx="50" cy="190" rx="40" ry="17"/><ellipse class="n" cx="50" cy="190" rx="34" ry="12"/><text x="50" y="190">연락처</text>
<ellipse class="n d" cx="135" cy="190" rx="38" ry="16"/><text x="135" y="190">나이</text>
<ellipse class="n" cx="280" cy="40" rx="38" ry="16"/><text x="280" y="40">성적</text>
<ellipse class="n" cx="430" cy="35" rx="42" ry="16"/><text x="430" y="35">과목코드</text><path class="e" d="M405,45 L455,45"/>
<ellipse class="n" cx="525" cy="35" rx="40" ry="16"/><text x="525" y="35">과목명</text>
</svg>` },
    code: R`
import sqlite3

# ER: 학생 —(M:N, 속성 '성적')— 과목,  학생의 다중값 속성 '연락처',  학과 —(1:N)— 학생
db = sqlite3.connect(":memory:")
db.execute("PRAGMA foreign_keys = ON")
db.executescript("""
CREATE TABLE 학과 (학과코드 TEXT PRIMARY KEY, 학과명 TEXT NOT NULL);

-- 1:N 관계 → N쪽(학생)에 1쪽(학과)의 기본키를 외래키로
CREATE TABLE 학생 (
  학번     INTEGER PRIMARY KEY,
  이름     TEXT NOT NULL,
  생년     INTEGER,                       -- 유도 속성 '나이'는 저장하지 않고 생년에서 계산
  학과코드 TEXT REFERENCES 학과(학과코드)
);

-- 다중값 속성 → 별도 테이블 (학번 + 값이 기본키)
CREATE TABLE 학생_연락처 (
  학번   INTEGER REFERENCES 학생(학번),
  연락처 TEXT,
  PRIMARY KEY (학번, 연락처)
);

CREATE TABLE 과목 (과목코드 TEXT PRIMARY KEY, 과목명 TEXT NOT NULL);

-- M:N 관계 → 관계 자체를 테이블로. 양쪽 기본키 조합이 기본키, 관계의 속성(성적)도 여기에
CREATE TABLE 수강 (
  학번     INTEGER REFERENCES 학생(학번),
  과목코드 TEXT    REFERENCES 과목(과목코드),
  성적     TEXT,
  PRIMARY KEY (학번, 과목코드)
);

INSERT INTO 학과 VALUES ('CS', '컴퓨터공학과');
INSERT INTO 학생 VALUES (1, '김', 2003, 'CS'), (2, '이', 2002, 'CS');
INSERT INTO 학생_연락처 VALUES (1, '010-1111-1111'), (1, 'kim@mail.com'), (2, '010-2222-2222');
INSERT INTO 과목 VALUES ('DB', '데이터베이스'), ('OS', '운영체제');
INSERT INTO 수강 VALUES (1, 'DB', 'A'), (1, 'OS', 'B'), (2, 'DB', 'A');
""")

# M:N은 관계 테이블을 사이에 두고 두 번 조인해야 풀린다
print(db.execute("""SELECT s.이름, c.과목명, e.성적 FROM 학생 s
                  JOIN 수강 e ON e.학번 = s.학번 JOIN 과목 c ON c.과목코드 = e.과목코드
                  ORDER BY s.학번, c.과목코드""").fetchall())
# [('김', '데이터베이스', 'A'), ('김', '운영체제', 'B'), ('이', '데이터베이스', 'A')]
print(db.execute("SELECT 학번, COUNT(*) FROM 학생_연락처 GROUP BY 학번").fetchall())   # [(1, 2), (2, 1)]
print(db.execute("SELECT 이름, 2026 - 생년 AS 나이 FROM 학생").fetchall())            # [('김', 23), ('이', 24)]

try:   # 같은 학생이 같은 과목을 두 번 수강 등록 → 복합 기본키가 막는다
  db.execute("INSERT INTO 수강 VALUES (1, 'DB', 'C')")
except sqlite3.IntegrityError as e:
  print("거부됨:", e)
`,
    links: [
      { to: 'db-relational', why: '매핑 결과인 릴레이션, 기본키·외래키·참조 무결성' },
      { to: 'db-normal', why: '논리적 설계에서 매핑 후 이상 현상을 없애는 정규화' },
      { to: 'db-index', why: '물리적 설계에서 정하는 접근 경로' },
      { to: 'se-req', why: 'UML 클래스 다이어그램도 같은 "개체와 관계" 모델링' },
    ],
    quiz: [
      { q: '데이터베이스 설계 단계 중 <strong>정규화</strong>를 수행하는 단계는?',
        options: ['요구사항 분석', '개념적 설계', '논리적 설계', '물리적 설계'], answer: 2,
        explain: 'ER 다이어그램(개념적 설계)을 릴레이션 스키마로 변환한 뒤 정규화하는 것이 논리적 설계다. 인덱스·저장 구조는 물리적 설계.' },
      { q: '학생과 과목 사이의 M:N 관계 "수강"을 관계형 스키마로 변환하는 올바른 방법은?',
        options: ['학생 테이블에 과목코드 외래키를 추가한다', '과목 테이블에 학번 외래키를 추가한다', '학번과 과목코드를 외래키로 갖는 수강 테이블을 새로 만든다', '학생과 과목 테이블을 하나로 합친다'], answer: 2,
        explain: '한쪽에 외래키를 두면 한 칸에 여러 값이 필요해진다. M:N은 관계 테이블을 만들고 양쪽 기본키의 조합을 기본키로 삼는다.' },
      { q: '첸(Chen) 표기법의 ER 다이어그램에서 <strong>이중 타원</strong>이 나타내는 것은?',
        options: ['키 속성', '다중값 속성', '유도 속성', '약한 개체'], answer: 1,
        explain: '키 속성은 밑줄, 유도 속성은 점선 타원, 약한 개체는 이중 사각형이다.' },
      { q: '인덱스를 추가하거나 저장 장치를 바꿔도 개념 스키마와 응용 프로그램을 수정하지 않아도 되는 성질은?',
        options: ['논리적 독립성', '물리적 독립성', '참조 무결성', '개체 무결성'], answer: 1,
        explain: '내부 스키마의 변경이 개념 스키마에 영향을 주지 않는 것이 물리적 독립성이다. 개념 스키마 변경이 외부 스키마에 영향을 주지 않는 것은 논리적 독립성.' },
      { q: '3단계 스키마 중 무결성 제약 조건과 접근 권한 정의를 포함하며, 데이터베이스당 하나만 존재하는 것은?',
        options: ['외부 스키마', '개념 스키마', '내부 스키마', '서브스키마'], answer: 1,
        explain: '개념 스키마는 조직 전체 관점의 논리 구조로 하나다. 외부 스키마(=서브스키마)는 사용자마다 여러 개일 수 있다.' },
    ],
    resources: ['Peter Chen, "The Entity-Relationship Model — Toward a Unified View of Data" (1976)', '『데이터베이스 시스템』(Silberschatz, Korth, Sudarshan) 6장 — E-R 모델을 이용한 설계', '정보처리기사 필기 3과목 데이터베이스 구축 — 데이터베이스 설계'],
  },
  {
    id:'db-algebra', title: '관계대수',
    summary: R`릴레이션을 입력받아 릴레이션을 내놓는 <strong>절차적</strong> 질의 연산 (SQL의 이론적 기반)
기본 연산 σ π ∪ − × ρ / 확장 연산 ∩ ⋈ ÷`,
    body: R`
<p>관계대수는 "어떤 연산을 어떤 순서로 적용해 결과를 얻는가"를 기술하는 <strong>절차적</strong> 언어다. 모든 연산의 입력과 출력이 릴레이션이라 연산을 자유롭게 겹쳐 쓸 수 있다(닫혀 있다). DBMS는 SQL을 내부적으로 관계대수 식으로 바꾼 뒤, 같은 결과를 내는 더 싼 식으로 변형해 실행한다.</p>
<h3>1. 연산자 분류</h3>
<table><tr><th>구분</th><th>연산</th><th>기호</th><th>의미</th><th>SQL 대응</th></tr>
<tr><td rowspan="4">순수 관계 연산</td><td>셀렉트(선택)</td><td>$\sigma$</td><td>조건에 맞는 <strong>행</strong> (수평 분할)</td><td><code>WHERE</code></td></tr>
<tr><td>프로젝트(투영)</td><td>$\pi$</td><td>원하는 <strong>열</strong> (수직 분할), 중복 행 제거</td><td><code>SELECT DISTINCT 열</code></td></tr>
<tr><td>조인</td><td>$\bowtie$</td><td>두 릴레이션을 조건으로 결합</td><td><code>JOIN</code></td></tr>
<tr><td>디비전</td><td>$\div$</td><td>나누는 릴레이션의 <strong>모든</strong> 값과 짝을 이루는 행</td><td>이중 <code>NOT EXISTS</code></td></tr>
<tr><td rowspan="4">일반 집합 연산</td><td>합집합</td><td>$\cup$</td><td>둘 중 하나에 있는 행</td><td><code>UNION</code></td></tr>
<tr><td>교집합</td><td>$\cap$</td><td>둘 다에 있는 행</td><td><code>INTERSECT</code></td></tr>
<tr><td>차집합</td><td>$-$</td><td>앞에만 있는 행</td><td><code>EXCEPT</code></td></tr>
<tr><td>카티션 곱</td><td>$\times$</td><td>모든 행 쌍</td><td><code>CROSS JOIN</code></td></tr></table>
<p><strong>기본 연산</strong>은 $\sigma, \pi, \cup, -, \times, \rho$(이름 바꾸기) 6개이고, 나머지는 이들로 표현할 수 있다. 예를 들어 $R \cap S = R - (R - S)$, 조인은 "카티션 곱 후 선택"이다.</p>
<h3>2. 집합 연산의 조건과 크기 계산 (필기 단골)</h3>
<ul>
<li>$\cup, \cap, -$는 두 릴레이션이 <strong>합병 가능(union-compatible)</strong>해야 한다: 속성 수(차수)가 같고, 대응하는 속성의 도메인이 같아야 한다.</li>
<li><strong>차수</strong>(degree, 속성 수)와 <strong>카디널리티</strong>(cardinality, 행 수)를 묻는 문제가 자주 나온다. $R$의 차수 $d_R$, 카디널리티 $n_R$일 때:</li>
</ul>
<table><tr><th>연산</th><th>결과 차수</th><th>결과 카디널리티</th></tr>
<tr><td>$R \times S$</td><td>$d_R + d_S$</td><td>$n_R \times n_S$</td></tr>
<tr><td>$R \cup S$</td><td>$d_R$</td><td>$\le n_R + n_S$</td></tr>
<tr><td>$R \cap S$</td><td>$d_R$</td><td>$\le \min(n_R, n_S)$</td></tr>
<tr><td>$R - S$</td><td>$d_R$</td><td>$\le n_R$</td></tr>
<tr><td>$\sigma(R)$</td><td>$d_R$</td><td>$\le n_R$</td></tr>
<tr><td>$\pi(R)$</td><td>고른 속성 수</td><td>$\le n_R$ (중복 제거)</td></tr></table>
<h3>3. 조인의 종류</h3>
<ul>
<li><strong>세타 조인</strong>: 임의의 비교 조건($=, &lt;, &gt;, \ne$ …)으로 결합.</li>
<li><strong>동등 조인</strong>: 조건이 $=$인 세타 조인. 조인 속성이 양쪽 모두 결과에 남는다.</li>
<li><strong>자연 조인</strong>: 이름이 같은 속성끼리 동등 조인하고 <strong>공통 속성은 한 번만</strong> 남긴다. 기호 $\bowtie$에 조건을 쓰지 않는다.</li>
<li><strong>외부 조인</strong>: 짝이 없는 행도 NULL로 채워 남긴다. 왼쪽 ⟕, 오른쪽 ⟖, 완전 ⟗.</li>
<li><strong>세미 조인</strong> $\ltimes$: 오른쪽과 짝이 있는 <strong>왼쪽 행만</strong>(왼쪽 속성만). 분산 DB에서 전송량을 줄이는 데 쓰인다.</li>
</ul>
<h3>4. 디비전: "모든 ~을 한"</h3>
<p>$R(A, B) \div S(B)$는 $S$에 있는 <strong>모든</strong> $B$ 값과 짝을 이루는 $A$ 값들이다. "필수 과목을 <em>전부</em> 들은 학생", "모든 부품을 공급하는 공급자"처럼 '모든'이 들어간 질의가 디비전이다. 기본 연산으로 쓰면 $\pi_A(R) - \pi_A\big((\pi_A(R) \times S) - R\big)$: 가능한 모든 (학생, 필수과목) 조합 중 실제로 없는 것이 하나라도 있는 학생을 빼는 것이다.</p>
<h3>5. 관계해석과의 비교</h3>
<p><strong>관계해석</strong>은 "어떤 조건을 만족하는 튜플"인지만 기술하는 <strong>비절차적</strong> 언어로, 수학의 술어 논리($\forall$ 모든, $\exists$ 존재)에 기반한다. 튜플 관계해석과 도메인 관계해석이 있다. 관계대수와 관계해석은 <strong>표현력이 같고</strong>, 이 표현력을 갖춘 언어를 <strong>관계적으로 완전</strong>하다고 한다. SQL은 둘의 성격을 모두 가진다(SELECT-FROM-WHERE는 해석에 가깝고, 내부 실행은 대수).</p>
<h3>6. 대수식 변형 = 질의 최적화</h3>
<p>같은 결과를 내는 대수식은 여러 개다. 옵티마이저의 기본 규칙은 <strong>선택과 투영을 최대한 먼저</strong> 하는 것이다. 조인(또는 카티션 곱) 전에 $\sigma$로 행을, $\pi$로 열을 줄여 두면 중간 결과가 작아진다. 예: $\sigma_{\text{학년}=4}(\text{학생} \bowtie \text{수강})$보다 $\sigma_{\text{학년}=4}(\text{학생}) \bowtie \text{수강}$이 훨씬 싸다.</p>`,
    analogy: R`<p>엑셀 작업에 비유하면, 셀렉트는 <strong>필터</strong>(행 숨기기), 프로젝트는 <strong>열 숨기기</strong> 후 중복 제거, 조인은 VLOOKUP으로 두 시트를 붙이기, 카티션 곱은 두 목록의 모든 조합을 만들기다. 디비전은 "체크리스트 항목을 <strong>하나도 빠짐없이</strong> 체크한 사람"을 찾는 일이다.</p>`,
    diagram: { caption: '디비전: 수강 ÷ 필수과목. 1번과 3번 학생은 DB와 OS를 모두 들었으므로 결과에 남는다. 2번은 OS가 없어 탈락하고, 3번의 NET 수강은 결과와 무관하다.', svg: R`
<svg viewBox="0 0 410 190" width="410">
<text x="75" y="8" class="sm">수강</text>
<rect class="g" x="20" y="16" width="50" height="22"/><text x="45" y="27">학번</text>
<rect class="g" x="70" y="16" width="60" height="22"/><text x="100" y="27">과목</text>
<rect class="h" x="20" y="38" width="50" height="24"/><text x="45" y="50">1</text><rect class="h" x="70" y="38" width="60" height="24"/><text x="100" y="50">DB</text>
<rect class="h" x="20" y="62" width="50" height="24"/><text x="45" y="74">1</text><rect class="h" x="70" y="62" width="60" height="24"/><text x="100" y="74">OS</text>
<rect class="n" x="20" y="86" width="50" height="24"/><text x="45" y="98">2</text><rect class="n" x="70" y="86" width="60" height="24"/><text x="100" y="98">DB</text>
<rect class="h" x="20" y="110" width="50" height="24"/><text x="45" y="122">3</text><rect class="h" x="70" y="110" width="60" height="24"/><text x="100" y="122">DB</text>
<rect class="h" x="20" y="134" width="50" height="24"/><text x="45" y="146">3</text><rect class="h" x="70" y="134" width="60" height="24"/><text x="100" y="146">OS</text>
<rect class="n" x="20" y="158" width="50" height="24"/><text x="45" y="170">3</text><rect class="n" x="70" y="158" width="60" height="24"/><text x="100" y="170">NET</text>
<text x="165" y="62" style="font-size:24px">÷</text>
<text x="230" y="8" class="sm">필수과목</text>
<rect class="g" x="200" y="16" width="60" height="22"/><text x="230" y="27">과목</text>
<rect class="n" x="200" y="38" width="60" height="24"/><text x="230" y="50">DB</text>
<rect class="n" x="200" y="62" width="60" height="24"/><text x="230" y="74">OS</text>
<text x="295" y="62" style="font-size:24px">=</text>
<text x="360" y="8" class="sm">결과</text>
<rect class="g" x="330" y="16" width="60" height="22"/><text x="360" y="27">학번</text>
<rect class="h" x="330" y="38" width="60" height="24"/><text x="360" y="50">1</text>
<rect class="h" x="330" y="62" width="60" height="24"/><text x="360" y="74">3</text>
</svg>` },
    math: [
      { tex: R`\sigma_{\text{조건}}(R), \qquad \pi_{A_1, \ldots, A_k}(R), \qquad R \bowtie_{\theta} S = \sigma_{\theta}(R \times S)`, explain: R`<ul class="defs"><li>$\sigma$: 조건을 만족하는 행만 남김</li><li>$\pi$: 속성 $A_1 \ldots A_k$만 남기고 중복 행 제거</li><li>$\theta$: 조인 조건</li></ul>조인은 정의상 카티션 곱 뒤의 선택이다. 실제 DBMS는 모든 쌍을 만들지 않는 알고리즘(해시·정렬 병합·인덱스 조인)으로 같은 결과를 낸다.` },
      { tex: R`R \div S = \pi_A(R) - \pi_A\big((\pi_A(R) \times S) - R\big)`, explain: R`$R(A, B)$, $S(B)$일 때. $\pi_A(R) \times S$는 "모든 후보가 모든 필수 값을 가졌다면" 있어야 할 조합이고, 거기서 실제 $R$을 빼면 <strong>빠진 조합</strong>이 남는다. 빠진 조합이 있는 후보를 제외한다.` },
    ],
    code: R`
# 릴레이션 = (속성 이름 튜플, 행 집합). 집합이므로 중복 행이 없다.
def rel(attrs, rows): return (tuple(attrs), frozenset(map(tuple, rows)))

def select(r, pred):                      # σ: 조건에 맞는 행
  A, R = r
  return (A, frozenset(t for t in R if pred(dict(zip(A, t)))))

def project(r, attrs):                    # π: 열 고르기 (중복 행은 사라진다)
  A, R = r
  idx = [A.index(a) for a in attrs]
  return (tuple(attrs), frozenset(tuple(t[i] for i in idx) for t in R))

def product(r, s):                        # ×: 모든 행 쌍
  return (r[0] + s[0], frozenset(a + b for a in r[1] for b in s[1]))

def minus(r, s):                          # −: 합병 가능해야 한다 (차수·도메인 일치)
  assert len(r[0]) == len(s[0])
  return (r[0], r[1] - s[1])

def natural_join(r, s):                   # ⋈: 이름이 같은 속성끼리 같은 값, 공통 속성은 한 번만
  common = [a for a in r[0] if a in s[0]]
  rest = [a for a in s[0] if a not in common]
  rows = set()
  for a in r[1]:
      da = dict(zip(r[0], a))
      for b in s[1]:
          db = dict(zip(s[0], b))
          if all(da[c] == db[c] for c in common):
              rows.add(a + tuple(db[x] for x in rest))
  return (r[0] + tuple(rest), frozenset(rows))

def divide(r, s):                         # ÷: π(r) − π((π(r) × s) − r)
  keep = [a for a in r[0] if a not in s[0]]
  cand = project(r, keep)
  missing = project(minus(project(product(cand, s), r[0]), r), keep)
  return minus(cand, missing)

enroll = rel(['학번', '과목'], [(1, 'DB'), (1, 'OS'), (2, 'DB'), (3, 'DB'), (3, 'OS'), (3, 'NET')])
required = rel(['과목'], [('DB',), ('OS',)])
student = rel(['학번', '이름'], [(1, '김'), (2, '이'), (3, '박'), (4, '최')])

print(sorted(divide(enroll, required)[1]))     # [(1,), (3,)]  DB와 OS를 모두 들은 학생
print(sorted(project(enroll, ['과목'])[1]))     # [('DB',), ('NET',), ('OS',)]  6행 → 3행
print(sorted(project(select(enroll, lambda t: t['과목'] == 'DB'), ['학번'])[1]))   # [(1,), (2,), (3,)]

j = natural_join(student, enroll)
print(j[0], len(j[1]))                          # ('학번', '이름', '과목') 6 — 4번 학생은 짝이 없어 빠짐
p = product(student, required)
print(len(p[0]), len(p[1]))                     # 3 8 — 차수 2+1, 카디널리티 4×2
print(sorted(minus(project(student, ['학번']), project(enroll, ['학번']))[1]))   # [(4,)] 수강하지 않은 학생
`,
    links: [
      { to: 'db-sql', why: '각 대수 연산이 SQL의 어느 절에 대응하는가' },
      { to: 'db-relational', why: '릴레이션·튜플·키 같은 기본 용어' },
      { to: 'db-plan', why: '선택·투영을 먼저 하도록 식을 바꾸는 질의 최적화' },
    ],
    quiz: [
      { q: '릴레이션 R(차수 3, 카디널리티 4)과 S(차수 2, 카디널리티 5)의 카티션 곱 R × S의 차수와 카디널리티는?',
        options: ['차수 5, 카디널리티 20', '차수 6, 카디널리티 9', '차수 5, 카디널리티 9', '차수 6, 카디널리티 20'], answer: 0,
        explain: '카티션 곱은 속성을 이어 붙이므로 차수는 3+2=5, 모든 행 쌍을 만들므로 카디널리티는 4×5=20이다.' },
      { q: '다음 중 순수 관계 연산자가 <strong>아닌</strong> 것은?',
        options: ['Select (σ)', 'Project (π)', 'Division (÷)', 'Cartesian Product (×)'], answer: 3,
        explain: '순수 관계 연산자는 σ, π, ⋈, ÷. 카티션 곱은 ∪, ∩, −와 함께 일반 집합 연산자로 분류된다.' },
      { q: '"모든 필수 과목을 수강한 학생"을 구하는 데 가장 적합한 관계대수 연산은?',
        options: ['합집합', '디비전', '자연 조인', '차집합'], answer: 1,
        explain: '"모든 ~에 대해"라는 조건은 디비전이다. 수강(학번, 과목) ÷ 필수(과목).' },
      { q: '자연 조인과 동등 조인의 차이로 옳은 것은?',
        options: ['자연 조인은 조건으로 <, >도 쓸 수 있다', '자연 조인은 이름이 같은 속성끼리 동등 비교하고 공통 속성을 한 번만 남긴다', '동등 조인은 짝이 없는 행도 남긴다', '둘은 완전히 같다'], answer: 1,
        explain: '동등 조인은 조인 속성이 양쪽 모두 결과에 남고, 자연 조인은 중복 속성을 하나로 합친다. 짝이 없는 행을 남기는 것은 외부 조인이다.' },
      { q: '관계해석에 대한 설명으로 옳지 않은 것은?',
        options: ['원하는 결과의 조건만 기술하는 비절차적 언어다', '술어 논리(∀, ∃)에 기반한다', '관계대수보다 표현력이 강하다', '튜플 관계해석과 도메인 관계해석이 있다'], answer: 2,
        explain: '관계대수와 관계해석은 표현력이 같다(관계적 완전성). 차이는 절차적(대수)이냐 비절차적(해석)이냐다.' },
    ],
    resources: ['『데이터베이스 시스템』(Silberschatz, Korth, Sudarshan) 2장, 27장 — 관계대수·관계해석', 'CMU 15-445 — Relational Model & Algebra', 'E. F. Codd, "Relational Completeness of Data Base Sublanguages" (1972)'],
  },
  {
    id:'db-sql', title: 'SQL: DDL·DML·조인·서브쿼리',
    summary: R`명령 분류: <strong>DDL</strong>(구조) · <strong>DML</strong>(데이터) · <strong>DCL</strong>(권한) · <strong>TCL</strong>(트랜잭션)
논리적 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`,
    body: R`
<h3>1. 명령어 분류 (필기 단골)</h3>
<table><tr><th>분류</th><th>명령</th><th>대상</th></tr>
<tr><td><strong>DDL</strong> (정의어)</td><td><code>CREATE</code> · <code>ALTER</code> · <code>DROP</code> · <code>TRUNCATE</code></td><td>테이블·뷰·인덱스 같은 <strong>구조</strong></td></tr>
<tr><td><strong>DML</strong> (조작어)</td><td><code>SELECT</code> · <code>INSERT</code> · <code>UPDATE</code> · <code>DELETE</code></td><td>행(<strong>데이터</strong>)</td></tr>
<tr><td><strong>DCL</strong> (제어어)</td><td><code>GRANT</code> · <code>REVOKE</code></td><td>사용자 <strong>권한</strong></td></tr>
<tr><td><strong>TCL</strong></td><td><code>COMMIT</code> · <code>ROLLBACK</code> · <code>SAVEPOINT</code></td><td><strong>트랜잭션</strong> 확정·취소</td></tr></table>
<ul>
<li><strong>DELETE vs TRUNCATE vs DROP</strong>: DELETE는 조건에 맞는 행을 지우는 DML(롤백 가능, 행마다 로그). TRUNCATE는 모든 행을 한 번에 비우는 DDL(구조는 남음, 대부분의 DBMS에서 롤백 불가). DROP은 테이블 구조까지 삭제.</li>
<li><strong>DROP ... CASCADE / RESTRICT</strong>: CASCADE는 참조하는 객체(뷰, 외래키 제약)까지 함께 삭제, RESTRICT는 참조하는 객체가 있으면 거부.</li>
<li><strong>GRANT ... WITH GRANT OPTION</strong>: 받은 권한을 다른 사용자에게 다시 줄 수 있게 한다. 이 권한을 REVOKE ... CASCADE로 회수하면 그 사용자가 넘겨준 권한도 연쇄적으로 회수된다.</li>
</ul>
<h3>2. SELECT의 논리적 실행 순서</h3>
<p>SQL은 쓰는 순서(SELECT가 맨 앞)와 <strong>논리적으로 처리되는 순서</strong>가 다르다. 이 순서를 알면 많은 규칙이 설명된다.</p>
<ul>
<li><strong>WHERE에서 집계 함수를 못 쓴다</strong>: WHERE는 그룹을 만들기 전, 행 단위로 거른다. 그룹 조건은 <code>HAVING</code>에 쓴다.</li>
<li><strong>SELECT의 별칭을 WHERE에서 못 쓴다</strong>: WHERE가 SELECT보다 먼저 처리되기 때문. ORDER BY는 SELECT 뒤라 별칭을 쓸 수 있다.</li>
<li><strong>GROUP BY 후 SELECT에는</strong> 그룹 기준 열이나 집계 함수만 올 수 있다. 그룹 안에서 값이 하나로 정해지지 않는 열은 의미가 없다.</li>
</ul>
<h3>3. 조인</h3>
<table><tr><th>종류</th><th>결과</th></tr>
<tr><td><strong>내부 조인</strong> (INNER JOIN)</td><td>양쪽에 짝이 있는 행만</td></tr>
<tr><td><strong>왼쪽/오른쪽 외부 조인</strong> (LEFT/RIGHT OUTER JOIN)</td><td>한쪽 행은 모두 남기고, 짝이 없으면 반대쪽을 NULL로</td></tr>
<tr><td><strong>완전 외부 조인</strong> (FULL OUTER JOIN)</td><td>양쪽 모두 남김</td></tr>
<tr><td><strong>교차 조인</strong> (CROSS JOIN)</td><td>모든 행 쌍 (카티션 곱, $m \times n$행)</td></tr>
<tr><td><strong>자연 조인</strong> (NATURAL JOIN)</td><td>이름이 같은 열끼리 동등 조인, 공통 열은 한 번만 표시</td></tr>
<tr><td><strong>셀프 조인</strong></td><td>같은 테이블을 별칭 두 개로 조인 (직원-상사)</td></tr></table>
<p>외부 조인에서 오른쪽 테이블 조건을 <code>WHERE</code>에 쓰면 NULL로 채운 행이 걸러져 사실상 내부 조인이 된다. 짝이 없는 행을 남기려면 그 조건을 <code>ON</code>에 써야 한다.</p>
<h3>4. 서브쿼리</h3>
<ul>
<li><strong>스칼라 서브쿼리</strong>: 값 하나를 돌려준다. <code>WHERE salary &gt; (SELECT AVG(salary) FROM emp)</code></li>
<li><strong>다중 행</strong>: <code>IN</code>, <code>ANY</code>/<code>SOME</code>(하나라도), <code>ALL</code>(모두)과 함께 쓴다. <code>&gt; ALL(...)</code>은 최댓값보다 큼, <code>&gt; ANY(...)</code>는 최솟값보다 큼.</li>
<li><strong>상관 서브쿼리</strong>: 바깥 행의 값을 참조해 바깥 행마다 다시 평가된다. "자기 부서 평균보다 많이 받는 직원".</li>
<li><strong>EXISTS</strong>: 결과 행이 하나라도 있으면 참. 값이 아니라 존재 여부만 보므로 첫 행을 찾으면 멈출 수 있다.</li>
<li><strong>NOT IN의 함정</strong>: 서브쿼리 결과에 NULL이 하나라도 있으면 <code>x NOT IN (...)</code>은 참이 될 수 없어 결과가 비어 버린다. NULL이 섞일 수 있으면 <code>NOT EXISTS</code>를 쓴다.</li>
</ul>
<h3>5. 집합 연산과 집계</h3>
<ul>
<li><code>UNION</code>은 <strong>중복 제거</strong>(정렬·해시 비용), <code>UNION ALL</code>은 그대로 이어 붙인다. <code>INTERSECT</code>(교집합), <code>EXCEPT</code>/<code>MINUS</code>(차집합). 두 SELECT의 열 개수와 타입이 맞아야 한다.</li>
<li>집계 함수(<code>SUM</code>, <code>AVG</code>, <code>COUNT(열)</code>, <code>MAX</code>, <code>MIN</code>)는 <strong>NULL을 무시</strong>한다. <code>COUNT(*)</code>만 NULL을 포함해 모든 행을 센다. 그래서 <code>AVG(salary)</code>와 <code>SUM(salary)/COUNT(*)</code>는 NULL이 있으면 다르다.</li>
<li><code>LIKE</code>: <code>%</code>는 0개 이상의 아무 문자, <code>_</code>는 정확히 1개. <code>'김%'</code>는 김으로 시작, <code>'_수%'</code>는 둘째 글자가 수.</li>
</ul>
<h3>6. 뷰와 윈도우 함수</h3>
<ul>
<li><strong>뷰</strong>: 저장된 SELECT 문(가상 테이블). 복잡한 질의를 감추고 열·행 단위로 접근을 제한하는 보안 수단이 된다. 필기 포인트: 뷰 정의는 <code>ALTER</code>로 바꿀 수 없고 지우고 다시 만든다, 뷰 위에 다시 뷰를 만들 수 있다, 뷰를 지우면 그 위의 뷰도 함께 지워진다(CASCADE), 집계·DISTINCT·조인이 들어간 뷰는 보통 INSERT/UPDATE가 안 된다.</li>
<li><strong>윈도우 함수</strong>: <code>GROUP BY</code>와 달리 <strong>행을 줄이지 않고</strong> 각 행 옆에 계산 결과를 붙인다. <code>RANK()</code>는 동점 다음 순위를 건너뛰고(1, 1, 3), <code>DENSE_RANK()</code>는 건너뛰지 않으며(1, 1, 2), <code>ROW_NUMBER()</code>는 동점도 서로 다른 번호(1, 2, 3)를 준다. "부서별 연봉 순위", "누적 합계"처럼 대기업 코딩테스트 SQL 문제에 자주 나온다.</li>
</ul>`,
    analogy: R`<p>식당 주문 처리. 주방은 손님이 말한 순서("돈가스 두 개, 매운 걸로, 큰 접시에")가 아니라 정해진 공정 순서로 일한다: 재료 창고에서 꺼내고(FROM), 상한 재료를 버리고(WHERE), 메뉴별로 나누고(GROUP BY), 2인분 미만인 메뉴는 빼고(HAVING), 접시에 담고(SELECT), 나갈 순서대로 줄 세운다(ORDER BY). 접시에 붙인 이름표(별칭)는 담은 뒤에야 생기므로, 재료를 버리는 단계에서는 그 이름표를 볼 수 없다.</p>`,
    diagram: { caption: 'SELECT 문의 논리적 처리 순서. 쓰는 순서와 다르다. SELECT의 별칭은 ⑤에서 생기므로 ②WHERE에서는 못 쓰고 ⑥ORDER BY에서는 쓸 수 있다.', svg: R`
<svg viewBox="0 0 620 100" width="620">
<rect class="h" x="4" y="22" width="76" height="34" rx="6"/><text x="42" y="39">FROM·JOIN</text>
<rect class="n" x="92" y="22" width="76" height="34" rx="6"/><text x="130" y="39">WHERE</text>
<rect class="n" x="180" y="22" width="76" height="34" rx="6"/><text x="218" y="39">GROUP BY</text>
<rect class="n" x="268" y="22" width="76" height="34" rx="6"/><text x="306" y="39">HAVING</text>
<rect class="h" x="356" y="22" width="76" height="34" rx="6"/><text x="394" y="39">SELECT</text>
<rect class="n" x="444" y="22" width="76" height="34" rx="6"/><text x="482" y="39">ORDER BY</text>
<rect class="n" x="532" y="22" width="76" height="34" rx="6"/><text x="570" y="39">LIMIT</text>
<path class="a" d="M80,39 L91,39 M168,39 L179,39 M256,39 L267,39 M344,39 L355,39 M432,39 L443,39 M520,39 L531,39"/>
<text x="42" y="10" class="sm">①</text><text x="130" y="10" class="sm">②</text><text x="218" y="10" class="sm">③</text><text x="306" y="10" class="sm">④</text><text x="394" y="10" class="sm">⑤</text><text x="482" y="10" class="sm">⑥</text><text x="570" y="10" class="sm">⑦</text>
<text x="42" y="72" class="sm">테이블 결합</text><text x="130" y="72" class="sm">행 거르기</text><text x="218" y="72" class="sm">묶기</text><text x="306" y="72" class="sm">그룹 거르기</text><text x="394" y="72" class="sm">열 계산·별칭</text><text x="482" y="72" class="sm">정렬</text><text x="570" y="72" class="sm">개수 제한</text>
<text x="130" y="90" class="sm">집계 함수 ✗</text><text x="306" y="90" class="sm">집계 함수 ✓</text><text x="482" y="90" class="sm">별칭 ✓</text>
</svg>` },
    code: R`
import sqlite3

db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE dept (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE emp (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  dept_id INTEGER REFERENCES dept(id),
  salary  INTEGER,
  boss_id INTEGER REFERENCES emp(id)
);
INSERT INTO dept VALUES (1, '개발'), (2, '영업'), (3, '인사');
INSERT INTO emp VALUES
(1, '김부장', 1, 700, NULL), (2, '이대리', 1, 450, 1), (3, '박사원', 1, 380, 2),
(4, '최과장', 2, 520, NULL), (5, '정사원', 2, 350, 4), (6, '한인턴', NULL, 200, 1);
""")
q = lambda sql: db.execute(sql).fetchall()

# 1) WHERE는 행을, HAVING은 그룹을 거른다
print(q("""SELECT dept_id, COUNT(*), AVG(salary) FROM emp
         WHERE salary >= 300 GROUP BY dept_id HAVING COUNT(*) >= 2"""))
# [(1, 3, 510.0), (2, 2, 435.0)]

# 2) 내부 조인은 짝 있는 행만(부서 없는 한인턴 제외), 외부 조인은 직원 없는 부서도 남긴다
print(q("SELECT e.name, d.name FROM emp e JOIN dept d ON e.dept_id = d.id WHERE e.id >= 5"))
# [('정사원', '영업')]
print(q("SELECT d.name, COUNT(e.id) FROM dept d LEFT JOIN emp e ON e.dept_id = d.id GROUP BY d.id"))
# [('개발', 3), ('영업', 2), ('인사', 0)]

# 3) 셀프 조인: 직원과 상사
print(q("SELECT e.name, b.name FROM emp e JOIN emp b ON e.boss_id = b.id WHERE b.name = '김부장'"))
# [('이대리', '김부장'), ('한인턴', '김부장')]

# 4) 스칼라 서브쿼리 / 상관 서브쿼리 / NOT EXISTS
print(q("SELECT name FROM emp WHERE salary > (SELECT AVG(salary) FROM emp)"))
# [('김부장',), ('이대리',), ('최과장',)]           전체 평균 433.3보다 많이 받는 직원
print(q("""SELECT name FROM emp e
         WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept_id = e.dept_id)"""))
# [('김부장',), ('최과장',)]                         자기 부서 평균보다 많이 받는 직원
print(q("SELECT name FROM dept d WHERE NOT EXISTS (SELECT 1 FROM emp WHERE dept_id = d.id)"))
# [('인사',)]                                         직원이 없는 부서

# 5) UNION은 중복 제거, UNION ALL은 그대로
print(q("SELECT dept_id FROM emp WHERE salary > 400 UNION SELECT dept_id FROM emp WHERE salary < 400"))
# [(None,), (1,), (2,)]
print(len(q("SELECT dept_id FROM emp WHERE salary > 400 UNION ALL SELECT dept_id FROM emp WHERE salary < 400")))
# 6

# 6) 윈도우 함수: 행을 줄이지 않고 부서 안 순위를 붙인다
print(q("""SELECT name, salary, RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)
         FROM emp WHERE dept_id = 1"""))
# [('김부장', 700, 1), ('이대리', 450, 2), ('박사원', 380, 3)]

# 7) 집계 함수는 NULL을 무시한다 (COUNT(*)만 예외)
db.execute("UPDATE emp SET salary = NULL WHERE id = 6")
print(q("SELECT COUNT(*), COUNT(salary), AVG(salary) FROM emp"))
# [(6, 5, 480.0)]

# 8) TCL: ROLLBACK하면 커밋 이후의 변경이 사라진다
db.commit()
db.execute("DELETE FROM emp WHERE dept_id = 2")
db.rollback()
print(q("SELECT COUNT(*) FROM emp"))   # [(6,)]
`,
    links: [
      { to: 'db-algebra', why: 'SELECT·WHERE·JOIN 아래에 있는 관계대수 연산(π, σ, ⋈)' },
      { to: 'db-relational', why: '키, 무결성 제약, NULL과 3값 논리' },
      { to: 'db-plan', why: '같은 SQL을 옵티마이저가 어떤 실행 계획으로 바꾸는가' },
      { to: 'db-index', why: 'WHERE·JOIN 조건의 열에 인덱스가 있으면 전체 스캔을 피한다' },
      { to: 'db-tx', why: 'COMMIT·ROLLBACK이 보장하는 원자성' },
      { to: 'sec-web', why: '문자열로 SQL을 조립하면 생기는 SQL 인젝션과 바인딩 변수' },
    ],
    quiz: [
      { q: '다음 중 SELECT 문의 논리적 처리 순서로 옳은 것은?',
        options: ['FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', 'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY', 'FROM → GROUP BY → WHERE → HAVING → SELECT → ORDER BY', 'FROM → WHERE → SELECT → GROUP BY → HAVING → ORDER BY'], answer: 0,
        explain: '행을 거르고(WHERE) → 묶고(GROUP BY) → 그룹을 거른 뒤(HAVING) → 열을 계산하고(SELECT) → 정렬(ORDER BY). 그래서 WHERE에는 집계 함수와 SELECT 별칭을 쓸 수 없다.' },
      { q: '"부서별 평균 연봉이 500 이상인 부서"를 구하는 SQL에서 <code>AVG(salary) &gt;= 500</code> 조건을 넣을 위치는?',
        options: ['WHERE', 'HAVING', 'ON', 'ORDER BY'], answer: 1,
        explain: '집계 결과에 대한 조건은 그룹이 만들어진 뒤에 평가해야 하므로 HAVING이다. WHERE는 그룹을 만들기 전 개별 행을 거른다.' },
      { q: '다음 중 DDL에 속하지 <strong>않는</strong> 명령은?',
        options: ['CREATE', 'ALTER', 'TRUNCATE', 'DELETE'], answer: 3,
        explain: 'DELETE는 행을 지우는 DML이다(롤백 가능). TRUNCATE는 테이블을 통째로 비우는 DDL로 분류된다. GRANT/REVOKE는 DCL, COMMIT/ROLLBACK은 TCL.' },
      { q: '서브쿼리 결과가 <code>(10, 20, NULL)</code>일 때 <code>WHERE x NOT IN (서브쿼리)</code>의 결과는?',
        options: ['10, 20이 아닌 모든 행', '아무 행도 반환되지 않는다', 'NULL인 행만 반환된다', '오류가 난다'], answer: 1,
        explain: 'x NOT IN (10, 20, NULL)은 x≠10 AND x≠20 AND x≠NULL이고, x≠NULL은 항상 UNKNOWN이라 전체가 참이 될 수 없다. NULL이 섞일 수 있으면 NOT EXISTS를 쓴다.' },
      { q: '연봉 (900, 800, 800, 700)에 대해 <code>DENSE_RANK()</code>로 내림차순 순위를 매긴 결과는?',
        options: ['1, 2, 2, 3', '1, 2, 2, 4', '1, 2, 3, 4', '1, 1, 2, 3'], answer: 0,
        explain: 'DENSE_RANK는 동점 다음 순위를 건너뛰지 않는다. RANK라면 1, 2, 2, 4, ROW_NUMBER라면 1, 2, 3, 4.' },
    ],
    resources: ['『데이터베이스 시스템』(Silberschatz, Korth, Sudarshan) 3~5장 — SQL', 'SQLite 공식 문서 — SELECT, Window Functions', '프로그래머스 SQL 고득점 Kit (코딩테스트 SQL 연습)'],
  },
  {
    id:'db-recovery', title: '장애와 회복: 로그·체크포인트',
    summary: R`<strong>REDO</strong>: 커밋됐는데 디스크에 없을 수 있는 변경을 다시 적용 / <strong>UNDO</strong>: 커밋 안 됐는데 디스크에 들어간 변경을 되돌림
체크포인트 이후만 보면 된다 → 커밋됨 = REDO, 커밋 안 됨 = UNDO`,
    body: R`
<p>트랜잭션의 <strong>원자성</strong>(전부 아니면 전무)과 <strong>지속성</strong>(커밋된 것은 사라지지 않음)을 장애가 나도 지키는 것이 회복(recovery)이다. 핵심 도구는 <strong>로그</strong>와 <strong>체크포인트</strong>다.</p>
<h3>1. 장애의 종류</h3>
<table><tr><th>장애</th><th>예</th><th>잃는 것</th><th>회복 방법</th></tr>
<tr><td>트랜잭션 장애</td><td>잘못된 입력, 교착 상태로 인한 철회</td><td>그 트랜잭션의 작업</td><td>해당 트랜잭션 UNDO</td></tr>
<tr><td>시스템 장애</td><td>전원 차단, OS·DBMS 다운</td><td><strong>주기억장치(버퍼)</strong> 내용. 디스크는 안전</td><td>로그로 REDO·UNDO</td></tr>
<tr><td>미디어 장애</td><td>디스크 헤드 손상</td><td>디스크 데이터</td><td><strong>백업(덤프)</strong> 복원 후 로그로 REDO</td></tr></table>
<h3>2. 왜 REDO와 UNDO가 둘 다 필요한가</h3>
<p>DBMS는 변경을 먼저 메모리의 <strong>버퍼</strong>에 하고, 디스크에는 나중에 쓴다. 성능을 위해 대부분의 DBMS는 다음 두 가지를 허용한다.</p>
<ul>
<li><strong>커밋 전에도</strong> 버퍼가 부족하면 변경된 페이지를 디스크에 쓴다(steal) → 장애 후 디스크에 <strong>커밋 안 된 변경</strong>이 남을 수 있다 → <strong>UNDO</strong> 필요.</li>
<li><strong>커밋할 때</strong> 데이터 페이지를 디스크에 바로 쓰지 않는다(no-force) → 커밋된 변경이 디스크에 <strong>없을</strong> 수 있다 → <strong>REDO</strong> 필요.</li>
</ul>
<h3>3. 로그와 WAL 규칙</h3>
<p>로그는 모든 변경을 순서대로 적은 기록이다: <code>&lt;T1 start&gt;</code>, <code>&lt;T1, A, 100, 90&gt;</code>(항목, <strong>이전값</strong>, <strong>새값</strong>), <code>&lt;T1 commit&gt;</code>. 이전값은 UNDO에, 새값은 REDO에 쓰인다. 로그는 순차 쓰기라 데이터 페이지를 여기저기 쓰는 것보다 훨씬 빠르다.</p>
<p><strong>WAL(Write-Ahead Logging)</strong>: 데이터 페이지를 디스크에 쓰기 <strong>전에</strong> 해당 로그를 먼저 디스크에 써야 하고, 커밋은 <code>commit</code> 로그가 디스크에 기록된 순간 완료된다. 그래야 디스크에 들어간 어떤 변경이든 로그로 되돌리거나 다시 할 수 있다.</p>
<h3>4. 회복 기법 (필기 단골)</h3>
<table><tr><th>기법</th><th>디스크 반영 시점</th><th>필요한 연산</th></tr>
<tr><td><strong>지연 갱신</strong> (deferred update)</td><td>커밋된 후에만</td><td><strong>REDO만</strong> (UNDO 불필요, 로그에 이전값 불필요)</td></tr>
<tr><td><strong>즉시 갱신</strong> (immediate update)</td><td>커밋 전에도 가능</td><td><strong>REDO + UNDO</strong></td></tr>
<tr><td><strong>그림자 페이징</strong></td><td>복사본 페이지에 쓰고 커밋 때 페이지 테이블 교체</td><td><strong>로그 불필요</strong>, UNDO는 그림자 페이지 테이블로 복귀</td></tr>
<tr><td><strong>미디어 회복</strong></td><td>-</td><td>백업 복원 + 로그 REDO</td></tr></table>
<p>그림자 페이징은 UNDO가 간단하지만 커밋할 때마다 페이지 테이블을 통째로 바꾸므로 데이터가 흩어지고(단편화), 쓰레기 페이지 수집이 필요하며, 동시 트랜잭션 환경에서는 결국 로그와 함께 써야 한다.</p>
<h3>5. 체크포인트: 로그를 어디부터 볼 것인가</h3>
<p>로그 전체를 처음부터 다시 읽으면 너무 오래 걸린다. 그래서 주기적으로 <strong>체크포인트</strong>를 둔다: 버퍼의 로그와 변경 페이지를 모두 디스크에 쓰고, <code>&lt;checkpoint (진행 중 트랜잭션 목록)&gt;</code>을 로그에 남긴다. 장애가 나면 마지막 체크포인트 이후만 보면 된다.</p>
<ul>
<li>체크포인트 <strong>이전에 커밋</strong>된 트랜잭션: 이미 디스크에 반영됨 → <strong>아무것도 안 함</strong></li>
<li>체크포인트 이후(또는 걸쳐서) 장애 전에 <strong>커밋</strong>된 트랜잭션 → <strong>REDO</strong></li>
<li>장애 시점까지 <strong>커밋되지 않은</strong> 트랜잭션 → <strong>UNDO</strong> (체크포인트 이전에 한 변경까지 거슬러 올라가 되돌린다)</li>
</ul>
<p>UNDO는 로그를 <strong>거꾸로</strong>, REDO는 <strong>앞으로</strong> 읽으며 수행한다. 실제 DBMS의 표준 알고리즘인 <strong>ARIES</strong>는 분석 → REDO(장애 직전 상태를 그대로 재현) → UNDO 3단계로 진행하고, UNDO한 내용도 로그(CLR)로 남겨 회복 도중 다시 장애가 나도 안전하게 이어 간다.</p>`,
    analogy: R`<p>가계부를 연필로 쓰는 사람. 실제 통장(디스크)보다 가계부(로그)를 <strong>먼저</strong> 적는 습관이 WAL이다. 한 달에 한 번 통장과 가계부를 맞춰 보고 "여기까지 일치" 도장을 찍는 것이 체크포인트다. 통장 정리 중 정전이 나면, 도장 이후 기록만 보고 "확정된 거래인데 통장에 안 찍힌 것"은 다시 찍고(REDO), "아직 확정 안 됐는데 미리 찍힌 것"은 취소한다(UNDO).</p>`,
    diagram: { caption: '체크포인트 tc 이후 장애 tf가 발생한 경우. 실선과 점(●)은 커밋된 트랜잭션, 점선은 장애 시점까지 커밋되지 않은 트랜잭션이다. T1은 체크포인트 전에 커밋되어 무시, T2·T4는 REDO, T3·T5는 UNDO.', svg: R`
<svg viewBox="0 0 560 195" width="560">
<path class="e d" d="M220,12 L220,162"/><path class="he" d="M460,12 L460,162"/>
<text x="40" y="28">T1</text><path class="he" d="M70,28 L170,28"/><circle class="fill" cx="170" cy="28" r="5"/><text x="515" y="28" class="sm">무시</text>
<text x="40" y="58">T2</text><path class="he" d="M100,58 L330,58"/><circle class="fill" cx="330" cy="58" r="5"/><text x="515" y="58">REDO</text>
<text x="40" y="88">T3</text><path class="e d" d="M140,88 L460,88"/><text x="515" y="88">UNDO</text>
<text x="40" y="118">T4</text><path class="he" d="M250,118 L400,118"/><circle class="fill" cx="400" cy="118" r="5"/><text x="515" y="118">REDO</text>
<text x="40" y="148">T5</text><path class="e d" d="M330,148 L460,148"/><text x="515" y="148">UNDO</text>
<text x="220" y="178" class="sm">체크포인트 tc</text><text x="460" y="178" class="sm">장애 tf</text>
</svg>` },
    code: R`
# 즉시 갱신 + 체크포인트 방식의 로그 기반 회복 (학습용)
# 로그 레코드: ('start', T) / ('write', T, 항목, 이전값, 새값) / ('commit', T) / ('checkpoint', [진행 중인 T])
log = [
  ('start', 'T1'), ('write', 'T1', 'A', 100, 90), ('commit', 'T1'),
  ('start', 'T2'), ('write', 'T2', 'B', 200, 250),
  ('start', 'T3'), ('write', 'T3', 'C', 300, 0),
  ('checkpoint', ['T2', 'T3']),          # 이 시점의 버퍼 내용은 모두 디스크에 기록됨
  ('write', 'T2', 'A', 90, 80), ('commit', 'T2'),
  ('start', 'T4'), ('write', 'T4', 'B', 250, 260), ('commit', 'T4'),
  ('start', 'T5'), ('write', 'T5', 'D', 400, 55),
  # ---- 여기서 시스템 장애 ----
]

def recover(log, disk):
  cp = max(i for i, r in enumerate(log) if r[0] == 'checkpoint')
  active = set(log[cp][1]) | {r[1] for r in log[cp:] if r[0] == 'start'}   # 체크포인트 이후 관심 대상
  committed = {r[1] for r in log[cp:] if r[0] == 'commit'}
  redo, undo = active & committed, active - committed
  # UNDO: 로그를 거꾸로 읽으며 커밋 안 된 트랜잭션의 변경을 이전값으로
  for r in reversed(log):
      if r[0] == 'write' and r[1] in undo: disk[r[2]] = r[3]
  # REDO: 체크포인트부터 앞으로 읽으며 커밋된 트랜잭션의 변경을 새값으로
  for r in log[cp:]:
      if r[0] == 'write' and r[1] in redo: disk[r[2]] = r[4]
  return sorted(redo), sorted(undo), disk

# 장애 직전 디스크: 체크포인트까지는 반영, T3·T4·T5의 변경도 디스크에 쓰였고, T2의 A=80은 아직 버퍼에만
disk = {'A': 90, 'B': 260, 'C': 0, 'D': 55}
print(recover(log, disk))
# (['T2', 'T4'], ['T3', 'T5'], {'A': 80, 'B': 260, 'C': 300, 'D': 400})
# T1은 체크포인트 전에 커밋되어 무시. 커밋 안 된 T3의 C와 T5의 D는 원래 값으로 되돌아갔다
`,
    links: [
      { to: 'db-tx', why: '회복이 지키는 원자성(A)과 지속성(D)' },
      { to: 'db-cc', why: '동시성 제어(락)가 있어야 커밋 안 된 값을 다른 트랜잭션이 덮어쓰지 않아 UNDO가 안전하다' },
      { to: 'os-fs', why: '파일 시스템의 저널링도 같은 WAL 아이디어' },
      { to: 'ca-hierarchy', why: '휘발성 메모리(버퍼)와 비휘발성 디스크의 차이가 회복 문제의 출발점' },
    ],
    quiz: [
      { q: '체크포인트 이후 시스템 장애가 발생했다. 체크포인트 <strong>이전에 시작</strong>해 장애 <strong>이전에 커밋</strong>된 트랜잭션에 필요한 회복 연산은?',
        options: ['아무것도 하지 않는다', 'REDO', 'UNDO', 'UNDO 후 REDO'], answer: 1,
        explain: '커밋은 됐지만 체크포인트 이후의 변경이 디스크에 반영됐다는 보장이 없으므로 REDO한다. 체크포인트 이전에 커밋까지 끝난 트랜잭션이라면 아무것도 하지 않는다.' },
      { q: '지연 갱신(deferred update) 회복 기법에 대한 설명으로 옳은 것은?',
        options: ['UNDO와 REDO가 모두 필요하다', '커밋 전에는 디스크에 반영하지 않으므로 UNDO가 필요 없다', '로그가 전혀 필요 없다', 'REDO가 필요 없다'], answer: 1,
        explain: '커밋되지 않은 변경은 디스크에 없으므로 되돌릴 것이 없다. 커밋된 변경이 디스크에 다 쓰이기 전에 장애가 날 수 있으므로 REDO는 필요하다. 로그가 필요 없는 것은 그림자 페이징.' },
      { q: 'WAL(Write-Ahead Logging) 규칙의 내용은?',
        options: ['데이터 페이지를 디스크에 쓰기 전에 해당 로그를 먼저 디스크에 기록한다', '로그는 트랜잭션이 끝난 뒤 한꺼번에 기록한다', '커밋 시 모든 데이터 페이지를 즉시 디스크에 쓴다', '로그는 주기억장치에만 둔다'], answer: 0,
        explain: '로그가 먼저 있어야 디스크에 들어간 변경을 UNDO할 수 있다. 커밋 시 데이터 페이지를 바로 쓰지 않아도(no-force) 로그로 REDO할 수 있다.' },
      { q: '로그를 사용하지 않고, 페이지 테이블을 두 개 유지해 장애 시 이전 페이지 테이블로 복귀하는 회복 기법은?',
        options: ['즉시 갱신', '지연 갱신', '그림자 페이징', '체크포인트'], answer: 2,
        explain: '그림자 페이징은 커밋 전까지 그림자 페이지 테이블을 보존하다가 커밋 시 현재 페이지 테이블로 교체한다. 단편화와 쓰레기 수집 문제가 있다.' },
      { q: '디스크가 물리적으로 손상된 미디어 장애에서 데이터를 복구하는 방법은?',
        options: ['체크포인트 이후 로그만으로 UNDO', '백업(덤프) 복원 후 로그로 REDO', '그림자 페이지 테이블로 복귀', '버퍼 내용을 디스크에 다시 쓴다'], answer: 1,
        explain: '디스크 자체가 사라졌으므로 별도 매체의 백업을 복원하고, 백업 이후의 커밋된 변경을 로그(별도 장치에 보관)로 다시 적용한다.' },
    ],
    resources: ['『데이터베이스 시스템』(Silberschatz, Korth, Sudarshan) 19장 — 회복 시스템', 'C. Mohan et al., "ARIES: A Transaction Recovery Method" (1992)', 'CMU 15-445 — Logging & Recovery 강의'],
  },
];
