# SQL 실전 예제 주제(데이터베이스 과목)를 생성해 topics/sql.js를 통째로 다시 쓴다.
#   python3 tools/sql/build.py
# 페이지: p_query(SELECT·함수·집계) p_join(조인·서브쿼리·윈도우) p_dml(DML·DDL·DCL), 공용 부품: lib
# 결과 표는 전부 SQLite(Python sqlite3)에서 실제로 실행한 결과다. Oracle 함수(NVL, DECODE, TRUNC 등)는 lib.db()에 같은 의미로 등록돼 있고,
# SQLite에 없는 문법(ROLLUP, ANY/ALL, MERGE, (+))은 예제의 run=에 같은 의미의 쿼리를 따로 적어 실행한다.
import sys, json, pathlib
sys.dont_write_bytecode = True
import p_query, p_join, p_dml

pages = p_query.PAGES + p_join.PAGES + p_dml.PAGES
out = pathlib.Path(__file__).resolve().parents[2] / 'topics' / 'sql.js'
js = ('// 자동 생성 파일: tools/sql/build.py로 다시 만든다. 직접 고치지 말 것.\n'
      'TOPICS.db.push(\n' + ',\n'.join(json.dumps(t, ensure_ascii=False) for t in pages) + '\n);\n')
assert '${' not in js and '`' not in js
out.write_text(js, encoding='utf-8')
print(len(pages), '주제', [t['id'] for t in pages], '%d KB' % (len(js.encode()) // 1024))
