# 필기 대비 문항(EXAM)을 생성해 index.html의 `const EXAM = {...};` 블록을 통째로 교체한다.
#   python3 tools/exam/build.py            # 저장소 루트의 index.html
#   python3 tools/exam/build.py 다른.html
# 과목별 문항: q_ds(자료구조) q_os q_ca(컴퓨터구조) q_net q_rest(DB·SW공학·PL·보안), 공용 부품: lib(add, 표, SVG 그림)
# 정답·풀이·그림은 전부 코드로 계산하고, 무작위 변형은 고정 시드라 실행할 때마다 같은 결과가 나온다.
# 주의: 오답 기록 키가 'exam-<과목>:<순번>'이므로 배포 후에는 기존 add() 호출 순서를 바꾸지 말고
#       새 문항은 각 과목 파일 끝에 추가한다(시드가 같은 random 호출 순서도 바꾸지 말 것).
import sys, json, pathlib
sys.dont_write_bytecode = True
import lib, q_ds, q_os, q_ca, q_net, q_rest
ORDER = ['ds', 'os', 'ca', 'net', 'db', 'se', 'pl', 'sec']
p = sys.argv[1] if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parents[2] / 'index.html'
s = open(p, encoding='utf-8').read()
a = s.index('const EXAM = {'); b = s.index('\n};\n', a) + 3
body = 'const EXAM = {\n' + ''.join('  %s: [\n%s\n  ],\n' % (k, ',\n'.join('    ' + json.dumps(q, ensure_ascii=False) for q in lib.OUT[k])) for k in ORDER) + '};'
for k in ORDER:
    for q in lib.OUT[k]: assert 0 <= q['answer'] < len(q['options']) and len(set(q['options'])) == len(q['options']), q['q']
open(p, 'w', encoding='utf-8').write(s[:a] + body + s[b:])
print({k: len(lib.OUT[k]) for k in ORDER}, '총', sum(len(v) for v in lib.OUT.values()))
