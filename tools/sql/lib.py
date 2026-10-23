# SQL 실전 예제 페이지의 공용 부품: 예제 DB, 결과 표 렌더링, 예제(쿼리 → 결과) 블록
# 결과 표는 손으로 쓰지 않고 전부 SQLite에서 실제로 실행해 만든다.
import sqlite3, html
from decimal import Decimal, ROUND_HALF_UP, ROUND_DOWN

BASE = """
CREATE TABLE dept (
  dept_id   INTEGER PRIMARY KEY,
  dept_name TEXT NOT NULL,
  loc       TEXT
);
CREATE TABLE emp (
  emp_id     INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  dept_id    INTEGER REFERENCES dept(dept_id),
  job        TEXT,
  salary     INTEGER,
  bonus      INTEGER,
  hire_date  TEXT,
  manager_id INTEGER REFERENCES emp(emp_id)
);
CREATE TABLE salgrade (grade INTEGER PRIMARY KEY, lo INTEGER, hi INTEGER);
CREATE TABLE sales (month TEXT, region TEXT, amount INTEGER);
CREATE TABLE product (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER, stock INTEGER DEFAULT 0);
INSERT INTO dept VALUES (10, '개발', '서울'), (20, '영업', '부산'), (30, '인사', '서울'), (40, '기획', '대전');
INSERT INTO emp VALUES
 (1, '홀란', 10, '부장', 7000, NULL, '2015-03-02', NULL),
 (2, '로드리', 10, '과장', 5200, 300,  '2018-07-16', 1),
 (3, '포든', 10, '대리', 4300, NULL, '2021-01-04', 2),
 (4, '디아스', 20, '부장', 6500, 500,  '2016-11-01', NULL),
 (5, '도쿠', 20, '사원', 3600, 200,  '2023-02-13', 4),
 (6, '셰르키', 20, '사원', 3600, NULL, '2023-09-01', 4),
 (7, '그바르디올', 30, '과장', 4800, 0,    '2019-05-20', 1),
 (8, '오라일리', NULL, '인턴', 2400, NULL, '2025-07-01', 1);
INSERT INTO salgrade VALUES (1, 0, 2999), (2, 3000, 3999), (3, 4000, 4999), (4, 5000, 5999), (5, 6000, 9999);
INSERT INTO sales VALUES
 ('2026-01', '서울', 120), ('2026-02', '서울', 150), ('2026-03', '서울', 90),  ('2026-04', '서울', 180),
 ('2026-01', '부산', 80),  ('2026-02', '부산', 80),  ('2026-03', '부산', 110), ('2026-04', '부산', 70);
INSERT INTO product VALUES (1, '키보드', 30000, 10), (2, '마우스', 15000, 0), (3, '모니터', 250000, 3), (4, 'USB 허브', 20000, NULL);
"""

def _round(x, d=0, mode=ROUND_HALF_UP):
    if x is None: return None
    q = Decimal(1).scaleb(-int(d))
    r = Decimal(str(x)).quantize(q, rounding=mode) if d >= 0 else (Decimal(str(x)) / q).quantize(Decimal(1), rounding=mode) * q
    return int(r) if r == r.to_integral_value() else float(r)

def _decode(*a):
    for i in range(1, len(a) - 1, 2):
        if a[0] == a[i]: return a[i + 1]
    return a[-1] if len(a) % 2 == 0 else None

def db():
    con = sqlite3.connect(':memory:', isolation_level=None)
    # Oracle에서 자주 쓰는 함수를 같은 의미로 등록 (ROUND·TRUNC는 음수 자릿수까지)
    con.create_function('ROUND', 1, lambda x: _round(x))
    con.create_function('ROUND', 2, lambda x, d: _round(x, d))
    con.create_function('TRUNC', 1, lambda x: _round(x, 0, ROUND_DOWN))
    con.create_function('TRUNC', 2, lambda x, d: _round(x, d, ROUND_DOWN))
    con.create_function('NVL', 2, lambda a, b: b if a is None else a)
    con.create_function('NVL2', 3, lambda a, b, c: c if a is None else b)
    con.create_function('DECODE', -1, _decode)
    con.execute('PRAGMA foreign_keys = ON')
    con.executescript(BASE)
    return con

def cell(v):
    if v is None: return '<span class="null">NULL</span>'
    if isinstance(v, float):
        if v.is_integer(): v = int(v)
        else:
            assert abs(v - round(v, 2)) < 1e-9, '소수점이 길다. ROUND를 쓸 것: %r' % v
            v = round(v, 2)
    return html.escape(str(v))

def table(cols, rows, cap=None, cls='rt'):
    h = '<div class="rtw">' + ('<div class="rt-cap">%s</div>' % cap if cap else '') + '<table class="%s">' % cls
    h += '<tr>' + ''.join('<th>%s</th>' % html.escape(c) for c in cols) + '</tr>'
    if not rows: h += '<tr><td class="empty" colspan="%d">(행 없음)</td></tr>' % len(cols)
    for r in rows: h += '<tr>' + ''.join('<td>%s</td>' % cell(v) for v in r) + '</tr>'
    return h + '</table></div>'

def show(con, name, sql=None, cap=None):
    cur = con.execute(sql or 'SELECT * FROM %s' % name)
    return table([d[0] for d in cur.description], cur.fetchall(), cap if cap is not None else name)

def tables(con, *names):
    """예제 테이블 여러 개를 나란히. 이름 또는 (캡션, SELECT문)"""
    return '<div class="tbls">' + ''.join(show(con, n) if isinstance(n, str) else show(con, None, n[1], n[0]) for n in names) + '</div>'

def code(sql):
    return '<pre><button class="copy">복사</button><code class="language-sql">%s</code></pre>' % html.escape(sql.strip())

class Page:
    def __init__(self, id, title, summary):
        self.t = {'id': id, 'title': title, 'summary': summary}
        self.h = []
        self.n = 0
    def __call__(self, s): self.h.append(s)
    def sample(self, *names, title='예제 테이블'):
        self('<h3>%s</h3>' % title + tables(db(), *names))
    def ex(self, title, sql, note='', run=None, setup=None, before=None, after=None, err=False, fake_err=None, side=None):
        """쿼리 하나 = 제목 + (실행 전 표) + SQL + 결과 표 + 설명.
        run: 화면의 SQL 대신 실행할 같은 의미의 쿼리(SQLite에 없는 문법일 때)
        after: 실행 후 보여 줄 테이블 이름들(DML·DDL). err: 오류가 나야 하는 예제. fake_err: 실행 없이 보여 줄 오류(표준 DBMS 기준)"""
        self.n += 1
        con = db()
        if setup: con.executescript(setup)
        h = '<div class="sqlx"><div class="sqlx-h"><span class="pill">%d</span> %s</div>' % (self.n, title)
        if side: h += tables(con, *side)
        if before: h += '<div class="sqlx-l">실행 전</div>' + tables(con, *before)
        h += code(sql)
        if fake_err:
            h += '<div class="sqlx-err">오류: %s</div>' % fake_err
        elif after:
            try: con.executescript(run or sql)
            except sqlite3.Error as e:
                assert err, (sql, e); h += '<div class="sqlx-err">오류: %s</div>' % html.escape(str(e))
            h += '<div class="sqlx-l">%s</div>' % ('실행 후' if not err else '테이블은 그대로') + tables(con, *after)
        else:
            try:
                cur = con.execute(run or sql)
                rows = cur.fetchall()
                assert not err, sql
                h += '<div class="sqlx-l">결과 · %d행</div>' % len(rows) + table([d[0] for d in cur.description], rows)
            except sqlite3.Error as e:
                assert err, (sql, e); h += '<div class="sqlx-err">오류: %s</div>' % html.escape(str(e))
        if note: h += '<div class="sqlx-n">%s</div>' % note
        self(h + '</div>')
    def done(self, links, quiz, resources):
        for q in quiz:
            assert 0 <= q['answer'] < len(q['options']) and len(set(q['options'])) == len(q['options']), q['q']
        self.t.update(body=''.join(self.h), links=links, quiz=quiz, resources=resources)
        return self.t

def q(sql):
    """퀴즈 정답 계산용: 첫 행 반환"""
    return db().execute(sql).fetchone()
