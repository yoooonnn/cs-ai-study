TOPICS.os = [
  {
    id:'os-process', title: '프로세스와 PCB', advanced: true,
    summary: R`실행 중인 프로그램 = 자원 배분·보호의 <strong>격리 단위</strong>
상태를 PCB에 기록 → 언제든 멈추고 재개`,
    body: R`
<h3>프로그램과 프로세스</h3>
<p>프로그램은 디스크에 있는 실행 파일(명령어와 초기 데이터)일 뿐이다. 이것을 실행하면 OS가 메모리 공간을 할당하고, 실행 상태(어디까지 실행했는지, 레지스터 값, 열린 파일 등)를 붙여 <strong>프로세스</strong>를 만든다. 같은 프로그램을 두 번 실행하면 서로 독립된 프로세스 두 개가 생긴다.</p>
<h3>주소 공간의 구조</h3>
<ul>
<li><strong>코드(텍스트)</strong>: 실행할 기계어. 보통 읽기 전용이라 같은 프로그램의 여러 프로세스가 물리 메모리를 공유할 수 있다.</li>
<li><strong>데이터</strong>: 전역·정적 변수.</li>
<li><strong>힙</strong>: 실행 중 동적으로 할당하는 영역. Python의 모든 객체가 여기에 있다.</li>
<li><strong>스택</strong>: 함수 호출마다 지역 변수와 돌아갈 주소를 쌓는 영역(콜 스택). 재귀가 너무 깊으면 이 영역이 넘친다.</li>
</ul>
<p>각 프로세스는 자신만의 <strong>가상 주소 공간</strong>을 가진다. 두 프로세스가 같은 주소값을 써도 실제로는 다른 물리 메모리를 가리키므로, 한 프로세스가 다른 프로세스의 메모리를 읽거나 망가뜨릴 수 없다. 이것이 격리의 핵심이다.</p>
<h3>PCB: 멈췄다가 이어 가기 위한 기록</h3>
<p>CPU 코어 하나는 한 순간에 하나의 흐름만 실행한다. 여러 프로세스가 동시에 도는 것처럼 보이는 것은 OS가 아주 짧은 간격으로 실행할 프로세스를 바꾸기 때문이다. 바꾸려면 지금 프로세스의 상태를 어딘가에 저장해야 하는데, 그곳이 <strong>PCB(Process Control Block)</strong>다. PID, 상태, 프로그램 카운터(다음 실행할 명령 주소), 레지스터 값, 메모리 관리 정보(페이지 테이블 위치), 열린 파일 목록, 스케줄링 정보(우선순위 등)가 들어 있다.</p>
<h3>상태 전이: 왜 '대기' 상태가 있는가</h3>
<p>프로세스는 <strong>준비</strong>(CPU만 받으면 실행 가능) → <strong>실행</strong> → 다시 준비(시간 할당이 끝나 선점됨) 또는 <strong>대기</strong>(디스크·네트워크 응답 같은 이벤트를 기다림)를 오간다. I/O는 CPU에 비해 수천~수백만 배 느리므로, I/O를 기다리는 프로세스가 CPU를 붙잡고 있으면 낭비다. 대기 상태로 빼 두고 그동안 다른 준비 프로세스를 실행하는 것이 <strong>다중 프로그래밍</strong>의 핵심 아이디어다.</p>
<h3>프로세스 생성: fork와 exec</h3>
<p>Unix 계열에서는 <code>fork()</code>가 현재 프로세스를 복제해 자식을 만들고, 자식이 <code>exec()</code>로 다른 프로그램을 덮어써 실행한다. 주소 공간 전체를 실제로 복사하면 느리므로, 일단 같은 물리 페이지를 읽기 전용으로 공유하다가 <strong>쓰기가 일어나는 페이지만 그때 복사(Copy-on-Write)</strong>한다. 부모는 <code>wait()</code>로 자식의 종료 상태를 회수한다. 종료했지만 회수되지 않은 자식을 좀비, 부모가 먼저 끝나 버린 자식을 고아 프로세스라 한다.</p>
<h3>격리의 대가: IPC</h3>
<p>메모리가 분리되어 있으므로 프로세스끼리 데이터를 주고받으려면 파이프, 소켓, 공유 메모리 같은 <strong>프로세스 간 통신(IPC)</strong>을 거쳐야 한다. Python <code>multiprocessing</code>은 별도 프로세스를 띄워 GIL의 제약을 피하지만, 인자와 결과를 직렬화(pickle)해 주고받는 비용이 있다. 그래서 큰 데이터를 자주 넘기는 작업에서는 병렬화 이득이 줄어든다.</p>`,
    analogy: R`<p>프로그램은 <strong>요리 레시피</strong>, 프로세스는 그 레시피로 <strong>지금 요리 중인 상황</strong>이다. 같은 레시피로 두 사람이 요리하면 각자의 조리대(주소 공간)를 쓴다. 요리사가 한 명뿐인 주방에서 여러 요리를 번갈아 할 때는, 손을 뗄 때마다 "몇 번째 단계까지 했고, 불은 몇 단이었는지"를 메모지(PCB)에 적어 둬야 다시 이어서 할 수 있다. 오븐이 예열되는 동안(I/O 대기) 가만히 서 있지 않고 다른 요리를 하는 것이 다중 프로그래밍이다.</p>`,
    diagram: { caption: '프로세스 상태 전이. I/O를 기다리는 동안 대기 상태로 빠져 CPU를 다른 프로세스에 양보한다.', svg: R`
<svg viewBox="0 0 540 250" width="540">
<ellipse class="n" cx="70" cy="40" rx="46" ry="20"/><text x="70" y="40">생성</text>
<ellipse class="n" cx="190" cy="130" rx="46" ry="20"/><text x="190" y="130">준비</text>
<ellipse class="h" cx="370" cy="130" rx="46" ry="20"/><text x="370" y="130">실행</text>
<ellipse class="n" cx="280" cy="215" rx="46" ry="20"/><text x="280" y="215">대기</text>
<ellipse class="n" cx="480" cy="40" rx="46" ry="20"/><text x="480" y="40">종료</text>
<path class="a" d="M95,57 L165,113"/><text x="112" y="88" class="sm">승인</text>
<path class="a" d="M222,116 Q280,80 338,116"/><text x="280" y="84" class="sm">디스패치</text>
<path class="a" d="M325,138 L237,138"/><text x="281" y="152" class="sm">선점(타이머)</text>
<path class="a" d="M352,149 L304,197"/><text x="372" y="178" class="sm">I/O·이벤트 대기</text>
<path class="a" d="M256,197 L208,149"/><text x="192" y="182" class="sm">I/O 완료</text>
<path class="a" d="M395,113 L458,58"/><text x="446" y="92" class="sm">종료</text>
</svg>` },
    code: R`
import os
from multiprocessing import Process, Queue

counter = 0

def child(q):
  global counter
  counter += 100                    # 자식 주소 공간의 '사본'만 바뀐다
  q.put((os.getpid(), os.getppid(), counter))

if __name__ == "__main__":            # multiprocessing은 이 가드가 필요하다
  q = Queue()
  p = Process(target=child, args=(q,))
  p.start()
  pid, ppid, c = q.get()            # 값은 IPC(큐 = 파이프 + 직렬화)로만 받을 수 있다
  p.join()                          # 자식 종료를 기다리고 상태를 회수 (좀비 방지)
  print(f"부모 PID {os.getpid()} / 자식 PID {pid} (자식이 본 부모 PID {ppid})")
  print(f"자식 안의 counter = {c}, 부모의 counter = {counter}")   # 100 vs 0
  print("자식 종료 코드:", p.exitcode)
`,
    links: [
      { to: 'os-thread', why: '주소 공간을 공유하는 더 가벼운 실행 단위' },
      { to: 'os-syscall', why: 'fork·exec·wait는 모두 시스템 콜, 프로세스 전환 = 문맥 교환' },
      { to: 'os-memory', why: '각 프로세스의 가상 주소 공간과 페이지 테이블' },
      { to: 'os-sched', why: '준비 상태의 프로세스 중 누구를 실행할지' },
      { to: 'ds-stack-queue', why: '주소 공간의 스택 영역 = 콜 스택' },
      { to: 'pl-gil', why: 'multiprocessing이 GIL을 우회하는 원리와 비용' },
    ],
    quiz: [
      { q: '같은 Python 스크립트를 터미널 두 개에서 동시에 실행했다. 한쪽에서 전역 변수를 바꾸면 다른 쪽은?',
        options: ['같이 바뀐다 — 같은 실행 파일의 코드·데이터 영역을 공유하므로', '바뀌지 않는다 — 각자 독립된 가상 주소 공간을 가진 별개의 프로세스라서', '같이 바뀐다 — 같은 사용자가 띄운 프로세스는 전역 변수를 공유하므로', '먼저 실행한 쪽이 바꿀 때만 바뀐다 — 나중 프로세스가 부모가 되므로'], answer: 1,
        explain: '프로그램은 같아도 프로세스는 둘이다. 데이터를 공유하려면 파일, 소켓, 공유 메모리 같은 IPC를 명시적으로 써야 한다.' },
      { q: '프로세스 상태에 "대기(waiting)"가 따로 있는 이유는?',
        options: ['우선순위가 낮은 프로세스를 잠시 실행 대상에서 빼 두기 위해', 'I/O를 기다리는 동안 CPU를 붙잡지 않고 다른 프로세스가 쓰게 하기 위해', '메모리가 부족할 때 프로세스를 디스크로 내보낸 상태를 나타내기 위해', '타임 퀀텀을 다 쓴 프로세스가 다음 차례를 기다리는 곳으로 쓰기 위해'], answer: 1,
        explain: 'I/O 완료 전에는 CPU를 줘도 할 일이 없다. 대기 큐에 두었다가 완료 인터럽트가 오면 준비 상태로 옮긴다. 퀀텀을 다 쓴 프로세스는 대기가 아니라 준비(ready) 상태로 돌아간다.' },
      { q: 'fork() 직후 자식 프로세스의 메모리를 실제로 전부 복사하지 않아도 되는 이유는?',
        options: ['자식은 부모와 같은 주소 공간을 쓰는 스레드로 만들어지기 때문', 'Copy-on-Write로 공유하다가 쓰기가 일어난 페이지만 복사하기 때문', '자식은 코드 영역만 받고 데이터·힙은 빈 상태로 새로 시작하기 때문', '커널이 부모의 메모리를 압축해 자식에게 넘기고 필요할 때 풀기 때문'], answer: 1,
        explain: 'fork 직후 exec를 하면 복사한 메모리는 곧바로 버려진다. COW 덕분에 이 낭비가 없다. 페이지 테이블과 보호 비트(읽기 전용)를 이용한 기법이다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP, 무료 공개) 4~6장 — 프로세스, 프로세스 API', '『Operating System Concepts』(Silberschatz, 일명 공룡책) 3장', 'KOCW 이화여대 반효경 교수 「운영체제」 강의'],
  },
  {
    id:'os-thread', title: '스레드와 멀티스레딩',
    summary: R`프로세스 안의 <strong>실행 흐름</strong>
코드·힙·파일 공유, 스택·레지스터만 별도
가볍고 공유 쉬움 ↔ 동기화 문제`,
    body: R`
<h3>무엇을 공유하고 무엇을 따로 갖는가</h3>
<table><tr><th>스레드끼리 공유</th><th>스레드마다 따로</th></tr>
<tr><td>코드, 전역 데이터, 힙(모든 객체), 열린 파일, 주소 공간 전체</td><td>스택(지역 변수, 호출 기록), 레지스터, 프로그램 카운터, 스레드 지역 저장소</td></tr></table>
<p>스택과 레지스터가 따로인 이유는 각 스레드가 <strong>코드의 서로 다른 지점</strong>을 실행하며 서로 다른 함수 호출 경로에 있을 수 있어야 하기 때문이다. 반면 힙은 공유되므로, 한 스레드가 만든 리스트를 다른 스레드가 그대로 읽고 쓸 수 있다.</p>
<h3>왜 스레드를 쓰는가</h3>
<ul>
<li><strong>가볍다</strong>: 새 주소 공간을 만들 필요가 없어 생성이 빠르고, 같은 프로세스 내 스레드 전환은 주소 공간(페이지 테이블)을 바꿀 필요가 없어 프로세스 전환보다 싸다.</li>
<li><strong>공유가 쉽다</strong>: IPC 없이 같은 메모리를 직접 쓴다.</li>
<li><strong>응답성</strong>: 무거운 작업은 다른 스레드에 맡기고 UI·네트워크 응답은 계속 처리한다.</li>
<li><strong>병렬성</strong>: 멀티코어에서 여러 스레드가 실제로 동시에 실행된다.</li>
</ul>
<h3>대가</h3>
<p>공유 메모리에 여러 스레드가 동시에 쓰면 실행 순서에 따라 결과가 달라지는 경쟁 상태가 생긴다(→ 동기화). 또 격리가 없으므로 한 스레드가 메모리를 망가뜨리거나 치명적 오류로 죽으면 프로세스 전체가 영향을 받는다. 웹 브라우저가 탭마다 별도 프로세스를 쓰는 이유 중 하나다.</p>
<h3>동시성과 병렬성</h3>
<p><strong>동시성</strong>은 여러 작업이 진행 중인 상태를 다루는 구조(코어 하나에서 번갈아 실행해도 성립), <strong>병렬성</strong>은 실제로 같은 순간에 여러 작업이 실행되는 것(여러 코어 필요)이다. 스레드는 둘 다를 위한 도구지만, 병렬성은 하드웨어와 런타임이 허락해야 얻는다.</p>
<h3>커널 스레드와 사용자 수준 스레드</h3>
<p>Linux·Windows의 일반 스레드는 사용자 스레드 하나가 커널 스레드 하나에 대응(1:1)해서, 커널이 직접 스케줄링하고 멀티코어에 분산한다. 반면 Go의 고루틴처럼 런타임이 많은 사용자 수준 실행 단위를 적은 커널 스레드 위에 얹어 관리하는 방식도 있다.</p>
<h3>Python과 GIL</h3>
<p>일반적인 CPython에는 <strong>GIL(Global Interpreter Lock)</strong>이 있어 한 프로세스 안에서 한 번에 한 스레드만 파이썬 바이트코드를 실행한다. 그래서 순수 파이썬 계산(CPU-bound)은 스레드를 늘려도 빨라지지 않는다. 하지만 파일·네트워크 I/O를 기다리는 동안이나 numpy 같은 C 확장이 큰 연산을 하는 동안에는 GIL을 놓으므로, <strong>I/O-bound 작업에는 스레드가 효과적</strong>이다. CPU-bound 병렬화에는 <code>multiprocessing</code>(별도 프로세스)을 쓰는 것이 전통적인 방법이다. Python 3.13부터는 GIL을 끈 실험적 빌드(free-threaded)도 제공된다.</p>`,
    analogy: R`<p>프로세스가 <strong>하나의 사무실</strong>이라면 스레드는 그 사무실의 <strong>직원들</strong>이다. 직원들은 사무실의 서류함(힙)과 복사기(열린 파일)를 함께 쓰고, 각자의 메모장(스택)과 지금 하던 일의 위치(프로그램 카운터)만 따로 가진다. 서류를 건네기는 쉽지만, 두 사람이 같은 장부를 동시에 고치면 기록이 엉킨다. 다른 사무실(프로세스)과 일하려면 우편(IPC)을 보내야 한다.</p>`,
    diagram: { caption: '한 프로세스 안의 세 스레드. 위쪽 자원은 공유하고, 각 스레드는 자신의 스택과 레지스터만 가진다.', svg: R`
<svg viewBox="0 0 520 230" width="520">
<rect class="g" x="10" y="10" width="500" height="210" rx="10"/>
<text x="60" y="26" class="sm">프로세스</text>
<rect class="h" x="30" y="40" width="105" height="40" rx="6"/><text x="82" y="60">코드</text>
<rect class="h" x="147" y="40" width="105" height="40" rx="6"/><text x="200" y="60">전역 데이터</text>
<rect class="h" x="264" y="40" width="105" height="40" rx="6"/><text x="316" y="60">힙 (객체)</text>
<rect class="h" x="381" y="40" width="110" height="40" rx="6"/><text x="436" y="60">열린 파일</text>
<text x="260" y="98" class="sm">↑ 모든 스레드가 공유 ↑</text>
<rect class="n" x="40" y="115" width="130" height="30" rx="5"/><text x="105" y="130" class="sm">레지스터 · PC</text>
<rect class="n" x="40" y="150" width="130" height="55" rx="5"/><text x="105" y="177">스택 1</text>
<rect class="n" x="195" y="115" width="130" height="30" rx="5"/><text x="260" y="130" class="sm">레지스터 · PC</text>
<rect class="n" x="195" y="150" width="130" height="55" rx="5"/><text x="260" y="177">스택 2</text>
<rect class="n" x="350" y="115" width="130" height="30" rx="5"/><text x="415" y="130" class="sm">레지스터 · PC</text>
<rect class="n" x="350" y="150" width="130" height="55" rx="5"/><text x="415" y="177">스택 3</text>
</svg>` },
    code: R`
import threading, time

def io_task():
  time.sleep(0.5)                   # I/O 대기 흉내: 기다리는 동안 GIL을 놓는다

def cpu_task():
  s = 0
  for i in range(3_000_000):        # 순수 파이썬 계산: GIL을 쥔 채 실행
      s += i

def sequential(task, n):
  t0 = time.perf_counter()
  for _ in range(n):
      task()
  return time.perf_counter() - t0

def threaded(task, n):
  ts = [threading.Thread(target=task) for _ in range(n)]
  t0 = time.perf_counter()
  for t in ts: t.start()
  for t in ts: t.join()
  return time.perf_counter() - t0

cpu_task()                            # 워밍업 (첫 실행의 부가 비용 제외)
# 일반(GIL이 있는) CPython 기준 결과
for name, task in [("I/O 작업", io_task), ("CPU 작업", cpu_task)]:
  print(f"{name} 4개: 순차 {sequential(task, 4):.2f}s / 스레드 4개 {threaded(task, 4):.2f}s")

shared = []                           # 같은 주소 공간 → 모든 스레드가 같은 리스트 객체를 본다
ts = [threading.Thread(target=shared.append, args=(k,)) for k in range(5)]
for t in ts: t.start()
for t in ts: t.join()
print("스레드들이 함께 채운 리스트:", sorted(shared))
`,
    links: [
      { to: 'os-process', why: '격리된 프로세스 vs 공유하는 스레드' },
      { to: 'os-sync', why: '공유 메모리 → 경쟁 상태 → 락과 세마포어' },
      { to: 'pl-gil', why: 'CPython에서 스레드가 CPU 병렬성을 못 내는 이유' },
      { to: 'os-io', why: 'I/O-bound 작업: 스레드 vs 비동기 I/O' },
      { to: 'ca-gpu', why: '수천 개 스레드를 동시에 실행하도록 설계된 하드웨어' },
    ],
    quiz: [
      { q: '같은 프로세스의 스레드들이 공유하지 <strong>않는</strong> 것은?',
        options: ['힙에 만든 객체', '전역 변수', '각자의 콜 스택(지역 변수)', '프로세스가 연 파일 디스크립터'], answer: 2,
        explain: '각 스레드는 서로 다른 함수 호출 경로를 실행하므로 스택과 레지스터는 따로 가진다. 단, 스택도 같은 주소 공간 안에 있어서 포인터로 접근하는 것 자체가 막혀 있지는 않다.' },
      { q: '일반 CPython에서 순수 파이썬 계산을 4개 스레드로 나눠도 빨라지지 않는 이유는?',
        options: ['OS가 한 프로세스의 스레드를 항상 같은 코어에만 배치하기 때문', 'GIL 때문에 한 번에 한 스레드만 파이썬 바이트코드를 실행하기 때문', '스레드마다 별도의 인터프리터가 떠서 초기화 비용이 크기 때문', '파이썬 스레드는 OS 스레드가 아닌 사용자 수준 코루틴이기 때문'], answer: 1,
        explain: 'OS는 스레드를 여러 코어에 배치할 수 있지만, 바이트코드 실행 권한(GIL)을 한 스레드만 가진다. I/O 대기나 GIL을 놓는 C 확장 연산에서는 겹쳐 실행된다.' },
      { q: '스레드 대신 프로세스를 여러 개 쓰는 구조(예: 브라우저 탭마다 프로세스)의 장점은?',
        options: ['같은 작업을 할 때 메모리 사용량이 더 적다', '프로세스끼리 데이터를 주고받기가 더 쉽다', '한 프로세스가 죽어도 나머지는 격리되어 안전하다', '프로세스 사이의 문맥 교환 비용이 더 적다'], answer: 2,
        explain: '격리와 안정성(보안 포함)을 얻는 대신 메모리 사용량과 통신 비용이 늘어난다. 나머지 선택지는 오히려 스레드의 장점이다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 26~27장 — Concurrency, Thread API', '『Operating System Concepts』(공룡책) 4장', 'Python 공식 문서 — threading, concurrent.futures', 'PEP 703 — Making the Global Interpreter Lock Optional'],
  },
  {
    id:'os-syscall', title: '시스템 콜과 문맥 교환',
    summary: R`하드웨어 접근은 <strong>시스템 콜</strong>로 커널에 요청
모드 전환·<strong>문맥 교환</strong> 비용 → 성능 설계 기준`,
    body: R`
<h3>이중 모드: 왜 직접 못 하게 막는가</h3>
<p>CPU는 최소 두 가지 모드로 실행된다. <strong>커널 모드</strong>에서는 모든 명령(입출력 장치 제어, 페이지 테이블 변경, 인터럽트 설정 등 특권 명령)을 실행할 수 있고, <strong>사용자 모드</strong>에서는 특권 명령을 실행하면 하드웨어가 예외를 일으켜 OS로 넘긴다. 아무 프로그램이나 디스크를 직접 읽거나 다른 프로세스의 메모리 매핑을 바꿀 수 있다면 보호와 격리가 불가능하기 때문이다.</p>
<h3>시스템 콜의 동작</h3>
<ol>
<li>프로그램이 시스템 콜 번호와 인자를 레지스터에 넣고 트랩 명령(x86-64의 <code>syscall</code> 등)을 실행한다.</li>
<li>CPU가 커널 모드로 바뀌고, 커널이 미리 등록해 둔 진입점으로 점프한다. 사용자가 임의의 커널 주소로 뛰어들 수는 없다.</li>
<li>커널이 번호로 처리 함수를 찾고, 인자와 권한을 검사한 뒤 일을 한다(파일 읽기, 프로세스 생성 등).</li>
<li>결과를 돌려주며 사용자 모드로 복귀한다.</li>
</ol>
<p>Python의 <code>open()</code>, <code>f.read()</code>, <code>socket.recv()</code>, <code>os.getpid()</code>는 결국 <code>open</code>·<code>read</code>·<code>recv</code>·<code>getpid</code> 같은 시스템 콜을 부른다. 하나의 비용은 크지 않지만 일반 함수 호출보다는 훨씬 비싸므로, <strong>호출 횟수를 줄이는 것</strong>이 중요하다. 파일을 1바이트씩 쓸 때 매번 시스템 콜을 하는 대신 메모리 버퍼에 모아 한 번에 쓰는 <strong>버퍼링</strong>이 그 예다.</p>
<h3>트랩과 인터럽트</h3>
<p>커널로 진입하는 경로는 셋이다. 프로그램이 의도적으로 요청하는 <strong>시스템 콜</strong>, 0으로 나누기나 잘못된 메모리 접근(페이지 폴트 포함) 같은 <strong>예외</strong>, 그리고 장치·타이머가 보내는 비동기 신호인 <strong>인터럽트</strong>. 특히 <strong>타이머 인터럽트</strong> 덕분에 무한 루프를 도는 프로그램이 있어도 OS가 주기적으로 제어권을 되찾아 다른 프로세스를 실행할 수 있다(선점형 스케줄링의 전제).</p>
<h3>문맥 교환</h3>
<p>실행 중인 프로세스(또는 스레드)를 다른 것으로 바꾸는 작업이다. 현재 레지스터·프로그램 카운터를 PCB에 저장하고, 다음 실행할 것의 값을 복원한다. 비용은 두 가지다.</p>
<ul>
<li><strong>직접 비용</strong>: 저장·복원과 스케줄러 실행 시간. 이 동안은 아무 사용자 작업도 진행되지 않는다.</li>
<li><strong>간접 비용</strong>: 새로 실행되는 흐름은 자기 데이터가 CPU 캐시와 TLB에 없어서 한동안 미스가 많다. 프로세스 간 전환은 주소 공간도 바꾸므로 TLB 효과가 더 크게 줄어든다(일부 CPU는 주소 공간 태그로 이를 완화한다).</li>
</ul>
<p>그래서 같은 프로세스 안의 스레드 전환이 프로세스 전환보다 싸고, 스케줄러의 타임 퀀텀을 너무 작게 잡으면 문맥 교환 오버헤드가 실제 작업 시간을 잠식한다.</p>`,
    analogy: R`<p>은행 창구. 고객(사용자 프로그램)은 금고(하드웨어)에 직접 들어갈 수 없고, 창구에 <strong>신청서(시스템 콜 번호와 인자)</strong>를 내면 직원(커널)이 신원과 권한을 확인한 뒤 대신 처리해 준다. 동전 하나 넣을 때마다 번호표를 뽑는 대신 모아서 한 번에 입금하면 훨씬 빠르다(버퍼링). 창구 직원이 고객을 바꿀 때마다 앞 고객의 서류를 정리하고 다음 고객 서류를 펼치는 시간이 문맥 교환 비용이다.</p>`,
    diagram: { caption: '시스템 콜: 트랩으로 커널 모드에 진입해 커널이 검사·처리한 뒤 사용자 모드로 복귀한다. 점선이 보호 경계.', svg: R`
<svg viewBox="0 0 540 220" width="540">
<text x="40" y="20" class="st sm">사용자 모드</text><text x="40" y="200" class="st sm">커널 모드</text>
<path class="e d" d="M10,110 H530"/>
<rect class="n" x="40" y="40" width="130" height="40" rx="6"/><text x="105" y="60">f.read() 호출</text>
<rect class="n" x="370" y="40" width="130" height="40" rx="6"/><text x="435" y="60">결과 사용</text>
<rect class="h" x="120" y="140" width="140" height="40" rx="6"/><text x="190" y="152" class="sm">시스템 콜 핸들러</text><text x="190" y="168" class="sm">번호로 분기·권한 검사</text>
<rect class="h" x="290" y="140" width="120" height="40" rx="6"/><text x="350" y="152" class="sm">파일 시스템·</text><text x="350" y="168" class="sm">장치 드라이버</text>
<path class="ha" d="M105,80 L170,138"/><text x="116" y="95" class="en sm">trap</text>
<path class="a" d="M260,160 H288"/>
<path class="ha" d="M370,138 L425,82"/><text x="423" y="95" class="st sm">복귀</text>
</svg>` },
    code: R`
import io, os, tempfile, time

path = os.path.join(tempfile.mkdtemp(), "out.bin")
N = 200_000

# 1) 1바이트마다 write 시스템 콜 (버퍼 없음)
fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC)
t0 = time.perf_counter()
for _ in range(N):
  os.write(fd, b"x")                    # 매번 사용자 모드 → 커널 모드 → 복귀
os.close(fd)
t_raw = time.perf_counter() - t0

# 2) 버퍼링: 파이썬 내부 버퍼가 찰 때만 write 시스템 콜
t0 = time.perf_counter()
with open(path, "wb") as f:
  for _ in range(N):
      f.write(b"x")
t_buf = time.perf_counter() - t0

print(f"버퍼 크기 {io.DEFAULT_BUFFER_SIZE}바이트 → 시스템 콜 약 {N // io.DEFAULT_BUFFER_SIZE + 1}번")
print(f"시스템 콜 {N}번: {t_raw:.3f}s  /  버퍼링: {t_buf:.3f}s  →  약 {t_raw / t_buf:.0f}배 차이")
`,
    links: [
      { to: 'os-process', why: '문맥 교환 때 상태를 저장하는 PCB' },
      { to: 'os-io', why: '장치가 보내는 인터럽트와 그 처리' },
      { to: 'os-sched', why: '타임 퀀텀과 문맥 교환 오버헤드의 트레이드오프' },
      { to: 'os-fs', why: 'open·read·write — 파일 API는 시스템 콜 위에 있다' },
      { to: 'ca-cache', why: '문맥 교환의 간접 비용: 캐시·TLB가 차가워진다' },
    ],
    quiz: [
      { q: '사용자 프로그램이 디스크 컨트롤러를 직접 조작하지 못하고 시스템 콜을 거쳐야 하는 근본 이유는?',
        options: ['사용자 코드에서 장치를 직접 다루면 디스크 블록 크기를 알 수 없기 때문', '장치 제어는 특권 명령이라 커널 모드에서만 실행되고, OS가 보호를 강제하기 때문', '시스템 콜을 거쳐야 데이터가 자동으로 캐시되어 다시 읽을 때 빨라지기 때문', '디스크 컨트롤러는 한 번에 하나의 프로세스만 접근할 수 있는 장치이기 때문'], answer: 1,
        explain: '하드웨어(CPU의 모드 비트)가 보호를 강제한다. 커널은 모든 요청을 한 곳에서 검사하는 관문 역할을 한다.' },
      { q: '파일에 1바이트씩 20만 번 쓸 때 open()으로 연 파일 객체가 os.write()보다 훨씬 빠른 이유는?',
        options: ['파일 객체는 쓰기 전에 데이터를 압축해 실제로 쓰는 양이 적기 때문', '버퍼에 모았다가 찰 때만 시스템 콜을 해 모드 전환 횟수가 크게 줄기 때문', 'os.write는 매번 fsync까지 호출해 디스크 기록이 끝나길 기다리기 때문', '파일 객체는 C로 구현되고 os.write는 순수 파이썬으로 구현되었기 때문'], answer: 1,
        explain: '둘 다 결국 같은 커널 경로로 기록된다. 차이는 커널 진입 횟수다. 같은 원리로 네트워크·DB도 요청을 묶어(batch) 보낸다.' },
      { q: '같은 프로세스 안의 스레드 전환이 서로 다른 프로세스 간 전환보다 일반적으로 싼 이유는?',
        options: ['스레드는 레지스터를 공유하므로 저장·복원할 레지스터가 없기 때문', '주소 공간을 바꿀 필요가 없어 TLB·캐시에 남은 정보를 재사용하기 때문', '스레드 전환은 커널을 거치지 않고 사용자 모드에서만 일어나기 때문', '스레드는 스택을 공유하므로 스택 포인터를 바꿀 필요가 없기 때문'], answer: 1,
        explain: '레지스터 저장·복원은 둘 다 필요하다. 차이는 주소 공간 전환과 그에 따른 간접 비용이다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 6장 — Limited Direct Execution', '『Computer Systems: A Programmer\'s Perspective』(CS:APP) 8장 — 예외적 제어 흐름', 'Linux man-pages: syscalls(2), strace(1) — 실제 프로그램의 시스템 콜 추적'],
  },
  {
    id:'os-sched', title: 'CPU 스케줄링', advanced: true,
    summary: R`준비 큐에서 다음에 CPU를 줄 대상 결정
대기·응답 시간·공정성 동시 최적화 불가 → <strong>무엇을 희생하는가</strong>`,
    body: R`
<h3>무엇을 최적화하는가</h3>
<ul>
<li><strong>반환 시간</strong>(도착 → 완료)과 <strong>대기 시간</strong>(준비 큐에서 기다린 시간의 합): 배치 작업에서 중요.</li>
<li><strong>응답 시간</strong>(도착 → 처음 실행): 대화형 프로그램에서 중요. 사용자는 끝나는 시간보다 "반응이 있는가"를 먼저 느낀다.</li>
<li><strong>공정성</strong>과 <strong>기아 방지</strong>: 어떤 프로세스도 무한히 기다리지 않아야 한다.</li>
</ul>
<p>또 프로세스는 CPU를 오래 쓰는 <strong>CPU-bound</strong>와, 짧게 쓰고 I/O를 기다리는 <strong>I/O-bound</strong>로 나뉜다. I/O-bound 프로세스를 빨리 실행해 주면 곧바로 I/O를 시작해 CPU와 장치가 함께 바빠지므로 시스템 전체 효율이 오른다.</p>
<h3>주요 알고리즘과 그 대가</h3>
<ul>
<li><strong>FCFS</strong>(먼저 온 순서): 단순하지만 긴 작업 하나가 앞에 있으면 짧은 작업들이 줄줄이 기다린다(<strong>호위 효과</strong>, convoy effect).</li>
<li><strong>SJF</strong>(가장 짧은 작업 먼저): 모든 작업이 동시에 도착하면 평균 대기 시간을 최소로 한다. 짧은 작업을 긴 작업 앞으로 옮기면 짧은 작업의 대기 감소가 긴 작업의 대기 증가보다 크기 때문이다(교환 논증). 문제는 <strong>다음 CPU 사용 시간을 미리 알 수 없다</strong>는 것 — 과거 사용 시간의 지수 평균으로 예측한다. 선점형 버전은 SRTF. 긴 작업이 기아에 빠질 수 있다.</li>
<li><strong>우선순위</strong>: 낮은 우선순위가 영원히 밀리는 기아가 생기므로, 오래 기다릴수록 우선순위를 올리는 <strong>에이징</strong>을 쓴다.</li>
<li><strong>라운드 로빈(RR)</strong>: 정해진 타임 퀀텀만큼 실행하고 큐 뒤로 보낸다. 응답 시간이 좋고 공정하다. 퀀텀이 너무 크면 FCFS와 같아지고, 너무 작으면 문맥 교환 오버헤드가 커진다. 평균 반환 시간은 SJF보다 보통 나쁘다.</li>
<li><strong>MLFQ</strong>(다단계 피드백 큐): 작업 길이를 모르는 문제를 <strong>관찰로</strong> 푼다. 새 작업은 높은 우선순위에서 시작하고, 퀀텀을 다 써 버리면(CPU-bound로 보임) 우선순위를 내린다. 퀀텀 전에 I/O로 CPU를 양보하는 대화형 작업은 높은 우선순위에 남는다. 낮은 큐의 기아를 막기 위해 주기적으로 모두의 우선순위를 다시 올린다.</li>
</ul>
<!--diagram-->
<p>SJF가 쓰는 "다음 실행 시간"은 실제로는 알 수 없어서, 지난 실행 시간들로 예측한다.</p>
<!--math:0-->
<h3>HRN: 기다린 만큼 우선순위를 올린다</h3>
<p>HRN(Highest Response Ratio Next)은 SJF의 기아 문제를 고친 비선점 방식이다. 고를 때마다 다음 값이 가장 큰 작업을 실행한다.</p>
<p>$$\text{우선순위} = \frac{\text{대기 시간} + \text{서비스(실행) 시간}}{\text{서비스 시간}}$$</p>
<p>서비스 시간이 짧을수록 값이 커서 짧은 작업이 유리하지만, 긴 작업도 기다릴수록 분자가 커져 언젠가는 선택된다. 예: A(대기 4, 서비스 2) = 3, B(대기 9, 서비스 6) = 2.5, C(대기 3, 서비스 1) = 4이면 C가 먼저다.</p>
<h3>실제 OS</h3>
<p>Linux는 오랫동안 CFS(Completely Fair Scheduler)를 썼다. 각 작업의 가중치를 반영한 실행 시간(vruntime)을 기록하고, 가장 적게 실행된 작업을 레드-블랙 트리에서 꺼내 실행해 CPU 시간을 비율대로 나눈다. Linux 6.6부터는 지연 시간 요구를 더 잘 반영하는 EEVDF 스케줄러로 바뀌었다. 멀티코어에서는 코어별 큐, 캐시 친화성(같은 코어에서 다시 실행하면 캐시가 따뜻함), 코어 간 부하 분산도 고려한다.</p>
<h3>계산 문제 푸는 법</h3>
<p>도착 시간과 실행 시간이 주어지면 간트 차트(시간축 위에 실행 구간을 그린 그림)를 먼저 그리고, 프로세스마다 다음 셋을 구한다.</p>
<!--math:1-->
<p>예: P1(도착 0, 실행 7), P2(도착 2, 실행 4), P3(도착 4, 실행 1)을 <strong>SRT</strong>(남은 시간이 가장 짧은 작업, 선점)로 돌리면 다음과 같다.</p>
<ol>
<li>0~2: P1 실행. 시각 2에 P2가 오면 P1은 5 남고 P2는 4라 P2로 바꾼다.</li>
<li>2~4: P2 실행. 시각 4에 P3(1)이 오면 P2의 남은 2보다 짧아 P3로 바꾼다.</li>
<li>4~5: P3, 5~7: P2, 7~12: P1.</li>
</ol>
<p>완료 시각은 P1 12, P2 7, P3 5이고, 반환 시간은 12, 5, 1, 대기 시간은 5, 1, 0이라 평균 대기 시간은 2다. 같은 작업을 비선점 SJF로 돌리면 P1이 7까지 실행된 뒤 P3, P2 순서가 된다. RR에서 새로 도착한 작업과 퀀텀을 다 쓴 작업이 같은 시각에 큐로 들어오면 어느 쪽을 앞에 둘지는 문제의 규칙을 따른다(보통 새로 도착한 작업이 먼저).</p>
<p>그림의 세 작업(24, 3, 3)을 FCFS·SJF·RR로 돌려 평균 대기와 응답 시간을 비교한다. RR은 퀀텀에 따라 결과가 달라진다.</p>
<!--code-->
`,
    analogy: R`<p>마트 계산대. 카트 가득한 손님(긴 작업) 뒤에 우유 하나 든 손님들이 줄 서 있으면 모두가 오래 기다린다(호위 효과). "물건 10개 이하 전용 계산대"는 SJF의 아이디어다. 놀이공원 기구처럼 한 번에 정해진 시간만 타고 다시 줄 서는 방식이 라운드 로빈이다. 모두가 빨리 한 번은 타 보지만(응답 시간), 줄 섰다 내렸다 하는 시간(문맥 교환)이 늘어난다.</p>`,
    diagram: { caption: '실행 시간 24, 3, 3인 세 작업이 동시에 도착할 때. 긴 작업을 먼저 실행하면(FCFS) 짧은 작업들의 대기가 길어진다.', svg: R`
<svg viewBox="0 0 540 185" width="540">
<text x="28" y="44">FCFS</text>
<rect class="n" x="60" y="30" width="360" height="28"/><text x="240" y="44">P1 (24)</text>
<rect class="h" x="420" y="30" width="45" height="28"/><text x="442" y="44">P2</text>
<rect class="h" x="465" y="30" width="45" height="28"/><text x="487" y="44">P3</text>
<text x="60" y="68" class="sm">0</text><text x="420" y="68" class="sm">24</text><text x="465" y="68" class="sm">27</text><text x="510" y="68" class="sm">30</text>
<text x="285" y="86" class="sm">평균 대기 = (0 + 24 + 27) / 3 = 17</text>
<text x="28" y="124">SJF</text>
<rect class="h" x="60" y="110" width="45" height="28"/><text x="82" y="124">P2</text>
<rect class="h" x="105" y="110" width="45" height="28"/><text x="127" y="124">P3</text>
<rect class="n" x="150" y="110" width="360" height="28"/><text x="330" y="124">P1 (24)</text>
<text x="60" y="148" class="sm">0</text><text x="105" y="148" class="sm">3</text><text x="150" y="148" class="sm">6</text><text x="510" y="148" class="sm">30</text>
<text x="285" y="168" class="sm">평균 대기 = (0 + 3 + 6) / 3 = 3</text>
</svg>` },
    math: [
      { tex: R`\tau_{n+1} = \alpha\, t_n + (1 - \alpha)\,\tau_n, \qquad 0 \le \alpha \le 1`, explain: R`다음 CPU 버스트 길이 예측(지수 평균).<ul class="defs"><li>$t_n$: 방금 측정한 실제 버스트</li><li>$\tau_n$: 이전 예측값</li><li>$\alpha$: 최근 값의 반영 비율</li></ul>오래된 측정일수록 $(1-\alpha)^k$로 영향이 줄어든다.` },
      { tex: R`\text{반환 시간} = \text{완료 시각} - \text{도착 시각}, \qquad \text{대기 시간} = \text{반환 시간} - \text{실행 시간}`, explain: R`응답 시간은 "처음 CPU를 받은 시각 − 도착 시각". RR은 응답 시간을, SJF는 평균 대기·반환 시간을 개선한다.` },
    ],
    code: R`
from collections import deque

def fcfs(bursts):                         # 모두 시각 0에 도착했다고 가정
  t, wait = 0, {}
  for p, b in bursts.items():
      wait[p] = t
      t += b
  return wait

def sjf(bursts):
  return fcfs(dict(sorted(bursts.items(), key=lambda kv: kv[1])))

def round_robin(bursts, q):
  remain, t, first, done = dict(bursts), 0, {}, {}
  ready = deque(bursts)
  while ready:
      p = ready.popleft()
      first.setdefault(p, t)            # 처음 CPU를 받은 시각 = 응답 시간
      run = min(q, remain[p])
      t += run
      remain[p] -= run
      if remain[p]:
          ready.append(p)               # 퀀텀을 다 쓰면 큐 맨 뒤로
      else:
          done[p] = t
  wait = {p: done[p] - bursts[p] for p in bursts}   # 반환 시간 - 실행 시간
  return wait, first

bursts = {"P1": 24, "P2": 3, "P3": 3}
avg = lambda d: sum(d.values()) / len(d)
print("FCFS 대기:", fcfs(bursts), "평균", avg(fcfs(bursts)))
print("SJF  대기:", sjf(bursts), "평균", avg(sjf(bursts)))
for q in (1, 4, 30):
  w, r = round_robin(bursts, q)
  print(f"RR(q={q:2d}) 평균 대기 {avg(w):5.2f} / 평균 응답 {avg(r):5.2f}")
`,
    points: [
      R`<strong>선점 / 비선점</strong> 구분이 가장 자주 나온다. 비선점: FCFS, SJF, HRN / 선점: RR, SRT, MLFQ / 우선순위는 둘 다 가능`,
      R`평균 대기 시간 최소 = <strong>SJF</strong>(비선점 중), <strong>SRT</strong>(선점 포함). SRT = 선점형 SJF`,
      R`기아가 생기는 것: SJF, SRT, 우선순위 → 해결: <strong>에이징</strong>, HRN`,
      R`HRN 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간, <strong>값이 큰 것</strong>부터 실행`,
      R`RR 퀀텀이 너무 크면 → FCFS와 같아짐, 너무 작으면 → 문맥 교환 오버헤드 증가`,
      R`호위 효과(convoy effect) = FCFS의 단점`,
      R`계산 문제: 간트 차트부터 그린다. 반환 = 완료 − 도착, 대기 = 반환 − 실행, 응답 = 첫 실행 − 도착. "평균 반환"과 "평균 대기"를 헷갈리지 말 것`,
      R`RR에서 같은 시각에 새 작업 도착과 퀀텀 만료가 겹치면 <strong>새로 도착한 작업을 큐에 먼저</strong> 넣는 것이 보통의 규칙`,
    ],
    interview: [
      { q: '선점형과 비선점형 스케줄링의 차이는 무엇인가요?', a: R`<p>비선점형은 프로세스가 CPU를 받으면 끝나거나 스스로 I/O 대기에 들어갈 때까지 계속 쓴다. 문맥 교환이 적어 오버헤드가 작지만, 긴 작업이 CPU를 붙잡으면 다른 작업의 응답이 늦어진다. 선점형은 타이머 인터럽트나 더 급한 작업이 도착하면 OS가 CPU를 빼앗을 수 있다. 응답 시간이 좋아 대화형 시스템에 맞지만 문맥 교환 비용과 공유 데이터 동기화 문제가 생긴다. 현대 범용 OS는 선점형이다.</p>` },
      { q: 'SJF가 평균 대기 시간이 최소인데 실제로 그대로 쓰지 않는 이유는요?', a: R`<p>다음 CPU 버스트 길이를 미리 알 수 없기 때문이다. 과거 버스트의 지수 평균으로 예측할 수는 있지만 정확하지 않다. 또 짧은 작업이 계속 들어오면 긴 작업이 기아에 빠진다. 그래서 실제 OS는 MLFQ처럼 작업의 행동을 관찰해 우선순위를 조정하거나, Linux CFS·EEVDF처럼 CPU 시간을 공정하게 나누는 방식을 쓴다.</p>` },
      { q: '라운드 로빈의 타임 퀀텀은 어떻게 정하나요?', a: R`<p>퀀텀이 너무 크면 FCFS와 같아져 응답 시간이 나빠지고, 너무 작으면 문맥 교환이 잦아 실제로 일하는 시간 비율이 줄어든다. 보통 문맥 교환 비용보다 충분히 크고, 대부분의 대화형 작업이 한 퀀텀 안에 CPU 버스트를 끝낼 정도(수 ms~수십 ms)로 잡는다.</p>` },
      { q: '기아(starvation)란 무엇이고 어떻게 막나요?', a: R`<p>우선순위가 낮거나 실행 시간이 긴 프로세스가 계속 뒤로 밀려 무한히 실행되지 못하는 상태다. 기다린 시간에 비례해 우선순위를 올리는 에이징(aging)으로 막는다. HRN은 대기 시간을 우선순위 식에 넣어 같은 효과를 내고, MLFQ는 주기적으로 모든 작업의 우선순위를 다시 올린다.</p>` },
    ],
    types: ['CPU 스케줄링'],
    links: [
      { to: 'ds-stack-queue', why: '준비 큐와 FIFO' },
      { to: 'ds-heap', why: '우선순위 스케줄링의 자료구조' },
      { to: 'ds-greedy', why: 'SJF 최적성의 교환 논증' },
      { to: 'ds-tree', why: 'Linux CFS는 레드-블랙 트리로 vruntime이 가장 작은 작업을 찾았다' },
      { to: 'os-syscall', why: '타이머 인터럽트로 선점, 퀀텀과 문맥 교환 비용' },
    ],
    quiz: [
      { q: 'FCFS에서 "호위 효과(convoy effect)"가 생기는 상황은?',
        options: ['짧은 작업만 계속 들어와 긴 작업이 끝없이 밀릴 때', '긴 CPU-bound 작업 뒤에서 짧은 작업들이 오래 기다릴 때', '타임 퀀텀이 너무 작아 문맥 교환이 계속 일어날 때', '우선순위가 같은 작업들이 번갈아 가며 CPU를 차지할 때'], answer: 1,
        explain: '짧은 작업들의 대기가 누적되어 평균 대기 시간이 크게 늘고, I/O 장치도 한동안 놀게 된다. 긴 작업이 계속 밀리는 것은 SJF의 기아 문제다.' },
      { q: '라운드 로빈의 타임 퀀텀을 극단적으로 작게 하면?',
        options: ['작업이 끝날 때까지 실행하는 FCFS와 사실상 똑같아진다', '응답은 빨라지지만 문맥 교환이 잦아 실제 작업 비율이 준다', '짧은 작업이 계속 앞서서 긴 작업에 기아가 발생한다', '모든 작업의 반환 시간이 줄어 처리량이 크게 오른다'], answer: 1,
        explain: '퀀텀이 문맥 교환 비용에 가까워지면 오버헤드가 지배한다. 반대로 퀀텀이 모든 작업보다 크면 FCFS가 된다.' },
      { q: 'MLFQ가 작업 길이를 미리 모르면서도 대화형 작업을 우대할 수 있는 원리는?',
        options: ['작업이 처음 도착할 때 실행 파일 크기로 예상 실행 시간을 추정하기 때문', '퀀텀을 다 쓰면 우선순위를 낮추고, I/O로 일찍 양보하면 유지해 행동을 관찰하기 때문', '대화형 작업은 OS가 터미널 연결 여부로 구분해 항상 최상위 큐에 넣기 때문', '모든 작업을 같은 퀀텀으로 돌린 뒤 실행 시간이 짧았던 순서로 다시 정렬하기 때문'], answer: 1,
        explain: '과거 행동으로 미래를 예측한다. 낮은 큐가 굶지 않도록 주기적으로 모두의 우선순위를 올리는 장치(priority boost)도 함께 쓴다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 7~9장 — 스케줄링, MLFQ, 비례 배분', '『Operating System Concepts』(공룡책) 5장', 'Linux 커널 문서 — "EEVDF Scheduler", "CFS Scheduler"'],
  },
  {
    id:'os-sync', title: '동기화: 경쟁 상태·뮤텍스·세마포어', advanced: true,
    summary: R`공유 데이터 동시 수정 → <strong>실행 순서에 따라 결과 변동</strong>(경쟁 상태)
동기화: "한 번에 하나만" / "조건까지 대기" 보장`,
    body: R`
<h3>왜 count += 1 이 깨지는가</h3>
<p><code>count += 1</code>은 한 줄이지만 실제로는 <strong>읽기 → 더하기 → 쓰기</strong> 세 단계다. 두 스레드가 동시에 5를 읽고 각자 6을 쓰면, 두 번 증가했는데 결과는 6이다(갱신 손실). 이처럼 결과가 스레드 실행의 끼어들기 순서에 의존하는 상황을 <strong>경쟁 상태(race condition)</strong>라 하고, 공유 자원에 접근하는 코드 구간을 <strong>임계 구역</strong>이라 한다.</p>
<p>임계 구역 문제의 해법은 세 조건을 만족해야 한다: <strong>상호 배제</strong>(한 번에 하나만 들어감), <strong>진행</strong>(아무도 안 쓰면 들어가려는 누군가는 들어갈 수 있음), <strong>한정 대기</strong>(무한히 기다리는 스레드가 없음).</p>
<h3>하드웨어의 도움: 원자적 명령</h3>
<p>"락이 비었는지 확인하고 → 잡는다"도 두 단계라 소프트웨어만으로는 같은 문제가 생긴다. 그래서 CPU는 읽기와 쓰기를 쪼개지지 않는 하나의 연산으로 수행하는 <strong>원자적 명령</strong>(test-and-set, compare-and-swap 등)을 제공하고, 모든 락은 이 위에 만들어진다.</p>
<h3>뮤텍스(락)</h3>
<p>임계 구역 앞에서 획득하고 끝나면 해제한다. 이미 잡혀 있으면 기다린다. 기다리는 방법은 두 가지다.</p>
<ul><li><strong>스핀락</strong>: 반복해서 확인하며 CPU를 쓴다. 임계 구역이 매우 짧고 멀티코어일 때는 잠들었다 깨는 비용보다 싸다.</li>
<li><strong>블로킹 락</strong>: 대기 큐에서 잠들고, 해제 시 깨운다. 오래 기다릴 때 CPU를 낭비하지 않는다.</li></ul>
<h3>세마포어</h3>
<p>정수 카운터와 두 연산 <code>wait</code>(P: 0이면 기다리고, 아니면 1 감소)·<code>signal</code>(V: 1 증가, 기다리는 스레드를 깨움)이다. 값이 1이면 뮤텍스처럼, N이면 <strong>"동시에 최대 N개까지"</strong>를 표현한다(DB 연결 풀, 동시 다운로드 수 제한). 뮤텍스는 잡은 스레드가 풀어야 한다는 소유권 개념이 있지만, 세마포어는 다른 스레드가 signal할 수 있어 "이벤트가 일어났다"는 신호 전달에도 쓰인다.</p>
<h3>조건 변수와 모니터</h3>
<p>"버퍼에 데이터가 생길 때까지 기다리기"처럼 <strong>조건</strong>을 기다려야 할 때, 락을 쥔 채 반복 확인하면 다른 스레드가 조건을 만들 수 없다. 조건 변수의 <code>wait</code>은 <strong>락을 놓고 잠든 뒤, 깨어나면 락을 다시 잡고</strong> 돌아온다. 깨어났다고 조건이 성립한다는 보장은 없으므로(다른 스레드가 먼저 가져갔거나, 이유 없이 깨는 경우) 항상 <code>while</code>로 조건을 다시 확인한다. 생산자-소비자(유한 버퍼) 문제가 대표적이며, Python <code>queue.Queue</code>는 내부적으로 락과 조건 변수로 이를 구현한다.</p>
<h3>Python에서도 락이 필요하다</h3>
<p>GIL은 인터프리터 내부 상태를 보호할 뿐, <code>+=</code> 같은 여러 바이트코드로 이뤄진 연산의 원자성을 보장하지 않는다. 바이트코드 사이에서 스레드가 바뀔 수 있으므로 공유 데이터 갱신에는 <code>threading.Lock</code>을 써야 한다.</p>
<h3>동기화의 비용</h3>
<p>락은 병렬 구간을 직렬화하므로 경합이 심하면 성능이 떨어지고, 여러 락을 잘못 조합하면 교착 상태가 생긴다. 또 멀티코어에서는 코어마다 캐시가 있어 한 코어의 쓰기가 다른 코어에 보이는 시점이 보장되지 않을 수 있는데, 락 획득·해제는 이러한 메모리 가시성도 보장해 준다.</p>
<h3>우선순위 역전</h3>
<p>낮은 우선순위 작업 L이 락을 잡고 있는데 높은 우선순위 작업 H가 그 락을 기다린다고 하자. 이때 락과 상관없는 중간 우선순위 작업 M이 L을 선점하면, L이 락을 풀지 못해 H가 M보다 늦게 실행된다. 1997년 화성 탐사선 Mars Pathfinder가 이 문제로 계속 재부팅되었다. 락을 쥔 작업의 우선순위를 그 락을 기다리는 가장 높은 작업 수준으로 잠시 올려 주는 <strong>우선순위 상속</strong>으로 해결한다.</p>`,
    analogy: R`<p>화장실 열쇠가 하나뿐인 카페. 열쇠를 가진 사람만 들어갈 수 있다(<strong>뮤텍스</strong>). 열쇠 없이 "문 두드려 보고 조용하면 들어가기"를 하면, 두 사람이 동시에 확인하고 동시에 들어가는 사고가 난다(원자적이지 않은 확인-후-행동). 탈의실처럼 칸이 3개면 열쇠를 3개 두는 것이 <strong>카운팅 세마포어</strong>다. "주문한 커피가 나오면 불러 주세요"하고 자리에서 기다리는 것이 <strong>조건 변수</strong>다 — 불려 가서 내 커피가 맞는지 다시 확인해야 한다.</p>`,
    diagram: { caption: '갱신 손실: 두 스레드가 같은 값(5)을 읽고 각자 6을 쓰면, 증가가 두 번 일어났는데 결과는 6이다.', svg: R`
<svg viewBox="0 0 520 230" width="520">
<text x="120" y="14">스레드 1</text><text x="300" y="14">스레드 2</text><text x="460" y="14">메모리 count</text>
<rect class="n" x="40" y="30" width="160" height="32" rx="5"/><text x="120" y="46">count 읽기 → 5</text>
<rect class="n" x="220" y="75" width="160" height="32" rx="5"/><text x="300" y="91">count 읽기 → 5</text>
<rect class="n" x="40" y="120" width="160" height="32" rx="5"/><text x="120" y="136">5 + 1 = 6 쓰기</text>
<rect class="h" x="220" y="165" width="160" height="32" rx="5"/><text x="300" y="181">5 + 1 = 6 쓰기</text>
<rect class="g" x="420" y="30" width="80" height="32"/><text x="460" y="46">5</text>
<rect class="g" x="420" y="75" width="80" height="32"/><text x="460" y="91">5</text>
<rect class="g" x="420" y="120" width="80" height="32"/><text x="460" y="136">6</text>
<rect class="h" x="420" y="165" width="80" height="32"/><text x="460" y="181">6</text><text x="460" y="210" class="sm" style="fill:var(--bad)">7이어야 함</text>
<path class="a" d="M20,30 V200"/><text x="12" y="215" class="sm">시간</text>
<text x="260" y="218" class="sm">스레드 1의 쓰기를 스레드 2가 덮어썼다</text>
</svg>` },
    code: R`
import threading, time

N, THREADS = 1000, 4
counter = 0
lock = threading.Lock()

def unsafe():
  global counter
  for _ in range(N):
      tmp = counter                 # 1) 읽기
      time.sleep(0)                 # 이 사이에 다른 스레드로 전환되기 쉽게 만든다
      counter = tmp + 1             # 2) 쓰기 — 그 사이의 다른 갱신을 덮어쓴다

def safe():
  global counter
  for _ in range(N):
      with lock:                    # 임계 구역: 한 번에 한 스레드만
          tmp = counter
          time.sleep(0)
          counter = tmp + 1

for f in (unsafe, safe):
  counter = 0
  ts = [threading.Thread(target=f) for _ in range(THREADS)]
  for t in ts: t.start()
  for t in ts: t.join()
  print(f"{f.__name__:6s}: 기대값 {N * THREADS}, 실제 {counter}")

# 카운팅 세마포어: 동시에 최대 2개까지만 실행
sem, active, peak = threading.Semaphore(2), 0, 0
state_lock = threading.Lock()
def limited():
  global active, peak
  with sem:
      with state_lock:
          active += 1; peak = max(peak, active)
      time.sleep(0.05)
      with state_lock:
          active -= 1
ts = [threading.Thread(target=limited) for _ in range(8)]
for t in ts: t.start()
for t in ts: t.join()
print("세마포어(2) 아래 동시 실행 최대 개수:", peak)
`,
    links: [
      { to: 'os-thread', why: '공유 메모리를 쓰는 실행 흐름' },
      { to: 'os-deadlock', why: '여러 락을 잘못 조합하면 생기는 문제' },
      { to: 'db-cc', why: 'DB의 동시성 제어: 락과 MVCC' },
      { to: 'pl-gil', why: 'GIL이 있어도 파이썬 코드에 락이 필요한 이유' },
      { to: 'ca-cache', why: '멀티코어 캐시와 메모리 가시성' },
    ],
    quiz: [
      { q: '<code>count += 1</code>을 여러 스레드가 동시에 실행하면 결과가 기대보다 작아질 수 있는 이유는?',
        options: ['여러 스레드가 동시에 더하면 정수가 표현 범위를 넘어 잘리기 때문', '읽기·더하기·쓰기가 분리되어 같은 값을 읽은 두 스레드 중 한쪽 갱신이 사라져서', '각 스레드가 count를 자기 스택에 복사해 따로 증가시키기 때문', 'CPU 캐시에 쓴 값이 메모리에 반영되지 않아 영원히 보이지 않기 때문'], answer: 1,
        explain: '갱신 손실. 세 단계를 하나의 원자적 단위로 만들거나(원자적 명령), 락으로 임계 구역을 보호해야 한다.' },
      { q: 'CPython에는 GIL이 있는데도 공유 데이터 갱신에 threading.Lock이 필요한 이유는?',
        options: ['GIL은 I/O를 수행하는 동안에만 다른 스레드를 막아 주기 때문', 'GIL은 바이트코드 하나 단위로만 원자성을 줘 연산 중간에 전환될 수 있어서', 'GIL은 프로세스마다 하나라서 같은 프로세스의 스레드는 보호하지 못하기 때문', 'Lock을 써야 GIL이 해제되어 다른 코어에서 병렬로 실행되기 때문'], answer: 1,
        explain: 'GIL은 인터프리터 내부 보호용이지 사용자 코드의 임계 구역 보호용이 아니다.' },
      { q: '조건 변수에서 깨어난 뒤 <code>if</code>가 아니라 <code>while</code>로 조건을 다시 확인하는 이유는?',
        options: ['notify()가 호출될 때마다 대기 중인 모든 스레드가 한꺼번에 깨어나기 때문', '락을 다시 잡기 전에 다른 스레드가 조건을 소비했거나 이유 없이 깨어날 수 있기 때문', 'if로 확인하면 wait()가 락을 놓지 않아 다른 스레드가 진입할 수 없기 때문', 'while을 써야 조건이 성립할 때까지 바쁜 대기로 CPU를 계속 확인하기 때문'], answer: 1,
        explain: '깨우는 것은 "조건이 바뀌었을 수 있다"는 힌트일 뿐이다. 다시 확인하고 아니면 또 기다린다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 28~31장 — 락, 조건 변수, 세마포어', 'Allen Downey, 『The Little Book of Semaphores』 (무료 공개)', 'Python 공식 문서 — threading (Lock, Condition, Semaphore), queue'],
  },
  {
    id:'os-deadlock', title: '교착 상태', advanced: true,
    summary: R`<strong>서로의 자원을 기다리며</strong> 영원히 멈춘 상태
4가지 조건 중 하나만 깨면 예방
실무: 락 획득 순서 고정`,
    body: R`
<h3>네 가지 필요 조건</h3>
<ol>
<li><strong>상호 배제</strong>: 자원을 한 번에 하나만 쓸 수 있다.</li>
<li><strong>점유와 대기</strong>: 자원을 가진 채로 다른 자원을 기다린다.</li>
<li><strong>비선점</strong>: 남이 가진 자원을 강제로 빼앗을 수 없다.</li>
<li><strong>순환 대기</strong>: T1은 T2의 자원을, T2는 T1의 자원을 기다리는 식의 사이클이 있다.</li>
</ol>
<p>네 조건은 <strong>모두</strong> 성립해야 교착이 생긴다(필요 조건). 따라서 대처 전략도 "어떤 조건을 깰 것인가"로 정리된다.</p>
<h3>자원 할당 그래프</h3>
<p>실행 흐름과 자원을 정점으로, "요청"(흐름 → 자원)과 "할당"(자원 → 흐름)을 간선으로 그린다. 사이클이 없으면 교착도 없다. 각 자원이 하나뿐이라면 사이클 = 교착이고, 같은 종류의 자원이 여러 개라면 사이클이 있어도 교착이 아닐 수 있다(다른 인스턴스가 풀려날 수 있으므로). 교착 탐지는 결국 그래프의 사이클 탐지 문제다.</p>
<h3>네 가지 대응 전략</h3>
<ul>
<li><strong>예방</strong>: 조건 하나를 구조적으로 불가능하게 만든다. 가장 실용적인 것은 <strong>모든 락에 전역 순서를 정하고 항상 그 순서로 획득</strong>하는 것이다(순환 대기 제거). 필요한 자원을 한 번에 모두 요청하는 방식(점유와 대기 제거)은 자원 활용률이 떨어진다.</li>
<li><strong>회피</strong>: 요청을 들어줬을 때 시스템이 여전히 <strong>안전 상태</strong>(모두가 끝날 수 있는 실행 순서가 존재)인지 검사하고, 아니면 기다리게 한다. 은행원 알고리즘이 대표적이지만 각 프로세스의 <strong>최대 요구량을 미리 알아야</strong> 하고 매 요청마다 검사 비용이 들어 범용 OS에서는 거의 쓰지 않는다.</li>
<li><strong>탐지와 회복</strong>: 일단 허용하고 주기적으로(또는 대기가 길어질 때) 대기 그래프의 사이클을 찾아, 희생자를 골라 중단·롤백한다. <strong>관계형 DB</strong>가 이 방식으로, 교착을 감지하면 트랜잭션 하나를 롤백하고 오류를 돌려준다.</li>
<li><strong>무시</strong>: 드물게 발생한다고 보고 별도 처리를 하지 않는다(일명 타조 알고리즘). 범용 OS 커널은 응용 프로그램의 락 사용에 대해 대체로 이 입장이고, 책임은 프로그래머에게 있다.</li>
</ul>
<h3>비슷하지만 다른 것</h3>
<p><strong>기아</strong>는 진행은 되지만 특정 흐름만 계속 밀리는 것, <strong>라이브락</strong>은 서로 양보하느라 계속 상태는 바뀌지만 아무도 진행하지 못하는 것이다(복도에서 서로 같은 방향으로 비켜 주는 두 사람).</p>
<h3>실무 지침</h3>
<p>락 순서를 문서화하고 지킨다, 락을 쥔 채로 외부 호출·I/O를 하지 않는다, 락을 잡는 범위를 최소화한다, 필요하면 타임아웃이 있는 획득(<code>acquire(timeout=...)</code>)으로 무한 대기를 막고 재시도한다.</p>`,
    analogy: R`<p>좁은 일방통행 교차로에서 네 대의 차가 각자 오른쪽 차가 지나가기만 기다리는 상황. 모두 앞으로 조금씩 들어와 있어(점유) 상대가 비켜야만 갈 수 있는데(대기), 아무도 후진하지 않고(비선점), 기다림이 원을 이룬다(순환 대기). 해결은 "항상 북쪽 차가 먼저" 같은 <strong>순서 규칙</strong>을 정하는 것이다.</p>`,
    diagram: { caption: '자원 할당 그래프. T1은 A를 점유하고 B를 요청, T2는 B를 점유하고 A를 요청 → 사이클 → 교착 상태.', svg: R`
<svg viewBox="0 0 420 235" width="420">
<circle class="h" cx="90" cy="50" r="24"/><text x="90" y="50">T1</text>
<circle class="h" cx="330" cy="180" r="24"/><text x="330" y="180">T2</text>
<rect class="n" x="306" y="28" width="48" height="44"/><text x="330" y="50">자원 A</text>
<rect class="n" x="66" y="158" width="48" height="44"/><text x="90" y="180">자원 B</text>
<path class="ha" d="M304,50 L116,50"/><text x="210" y="36" class="sm">점유 (A → T1)</text>
<path class="ha" d="M90,76 L90,156"/><text x="46" y="116" class="sm">요청</text>
<path class="ha" d="M116,180 L304,180"/><text x="210" y="196" class="sm">점유 (B → T2)</text>
<path class="ha" d="M330,156 L330,74"/><text x="372" y="116" class="sm">요청</text>
<text x="210" y="118" class="sm">사이클 = 아무도 진행 불가</text>
</svg>` },
    math: [
      { tex: R`\text{Need}_i = \text{Max}_i - \text{Allocation}_i`, explain: R`은행원 알고리즘.<ul class="defs"><li>$\text{Max}_i$: 프로세스 $i$의 최대 요구량(미리 선언)</li><li>$\text{Allocation}_i$: 현재 할당량</li><li>$\text{Need}_i$: 앞으로 더 필요할 수 있는 양(자원 종류별 벡터)</li></ul>` },
      { tex: R`\text{안전} \iff \exists\ \text{순서 } P_{k_1}, \dots, P_{k_n}:\ \text{Need}_{k_j} \le \text{Available} + \sum_{m < j} \text{Allocation}_{k_m}`, explain: R`앞선 프로세스들이 끝나며 반납한 자원과 현재 여유 자원으로 다음 프로세스의 남은 요구를 채울 수 있는 순서가 하나라도 있으면 안전 상태다.` },
    ],
    code: R`
import threading, time

a, b = threading.Lock(), threading.Lock()

def worker(name, first, second, log):
  with first:
      time.sleep(0.1)                         # 상대가 다른 락을 잡을 시간을 준다
      if second.acquire(timeout=1):           # 진짜 교착이면 영원히 기다림 → 타임아웃으로 탐지
          second.release()
          log.append(f"{name} 성공")
      else:
          log.append(f"{name} 1초 대기 후 포기")

def run(order1, order2):
  log = []
  ts = [threading.Thread(target=worker, args=("T1", *order1, log)),
        threading.Thread(target=worker, args=("T2", *order2, log))]
  for t in ts: t.start()
  for t in ts: t.join()
  return log

print("반대 순서로 획득:", run((a, b), (b, a)))   # 순환 대기 → 교착 → 타임아웃으로 한쪽이 포기해야 풀린다
print("같은 순서로 획득:", run((a, b), (a, b)))   # 순환 대기 조건 제거 → 정상

def is_safe(available, max_need, alloc):
  """은행원 알고리즘의 안전성 검사: 모두 끝낼 수 있는 순서를 찾는다"""
  need = [[m - x for m, x in zip(mr, ar)] for mr, ar in zip(max_need, alloc)]
  work, done, order = list(available), [False] * len(alloc), []
  progress = True
  while progress:
      progress = False
      for i in range(len(alloc)):
          if not done[i] and all(n <= w for n, w in zip(need[i], work)):
              work = [w + x for w, x in zip(work, alloc[i])]   # i가 끝나며 자원 반납
              done[i] = progress = True
              order.append(f"P{i}")
  return all(done), order

max_need = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]]
alloc    = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]]
print("여유 (3,3,2):", is_safe([3, 3, 2], max_need, alloc))
print("여유 (0,1,0):", is_safe([0, 1, 0], max_need, alloc))
`,
    links: [
      { to: 'ds-graph', why: '교착 탐지 = 대기 그래프의 사이클 탐지(DFS)' },
      { to: 'os-sync', why: '락을 쓰는 순간 생기는 위험' },
      { to: 'db-cc', why: 'DB는 교착을 탐지해 트랜잭션 하나를 롤백한다' },
      { to: 'db-tx', why: '롤백이 가능하기 때문에 "탐지 후 회복" 전략을 쓸 수 있다' },
    ],
    quiz: [
      { q: '"모든 스레드는 락 A를 잡은 뒤에만 락 B를 잡는다"는 규칙이 깨는 교착 조건은?',
        options: ['상호 배제', '점유와 대기', '비선점', '순환 대기'], answer: 3,
        explain: '전역 순서가 있으면 "B를 가진 채 A를 기다리는" 간선이 생길 수 없어 사이클이 만들어지지 않는다. 여전히 점유와 대기는 일어난다.' },
      { q: '범용 OS가 은행원 알고리즘 같은 교착 회피를 거의 쓰지 않는 이유는?',
        options: ['현대 OS는 자원을 무한히 늘릴 수 있어 교착 상태가 생기지 않기 때문', '최대 자원 요구량을 미리 알기 어렵고, 요청마다 안전성 검사 비용이 크기 때문', '은행원 알고리즘은 자원이 한 종류일 때만 적용할 수 있는 방법이기 때문', '교착이 생기면 은행원 알고리즘이 모든 프로세스를 강제 종료하기 때문'], answer: 1,
        explain: '알고리즘 자체는 정확하지만 전제(사전 선언)와 비용이 범용 환경에 맞지 않는다. 자원 사용이 예측 가능한 특수 시스템에서는 의미가 있다.' },
      { q: '자원 할당 그래프에 사이클이 있으면 항상 교착 상태인가?',
        options: ['항상 그렇다 — 사이클은 교착 상태의 필요충분조건이다', '자원 인스턴스가 하나면 그렇지만, 여러 개면 아닐 수 있다', '아니다 — 사이클은 교착 상태와 아무 관련이 없다', '사이클에 프로세스가 3개 이상 포함될 때만 교착 상태가 된다'], answer: 1,
        explain: '단일 인스턴스에서는 사이클이 필요충분조건, 다중 인스턴스에서는 필요조건일 뿐이다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 32장 — Common Concurrency Problems', '『Operating System Concepts』(공룡책) 8장 — Deadlocks', 'PostgreSQL 문서 — Explicit Locking: Deadlocks'],
  },
  {
    id:'os-memory', title: '메모리 관리: 페이징·세그멘테이션', advanced: true,
    summary: R`프로세스별 <strong>가상 주소</strong> → MMU·페이지 테이블이 물리 주소로 변환
격리·재배치·공유 가능, TLB로 비용 은닉`,
    body: R`
<h3>왜 물리 주소를 직접 쓰지 않는가</h3>
<ul>
<li><strong>격리</strong>: 프로세스가 물리 주소를 직접 쓰면 다른 프로세스의 메모리를 읽고 쓸 수 있다.</li>
<li><strong>재배치</strong>: 프로그램이 물리 메모리 어디에 올라가든 같은 주소로 동작해야 한다.</li>
<li><strong>연속성의 착시</strong>: 물리 메모리는 조각조각 비어 있어도, 프로세스에게는 넓고 연속된 공간처럼 보여 줄 수 있다.</li>
</ul>
<p>그래서 CPU가 내는 모든 주소는 가상 주소이고, <strong>MMU</strong>(메모리 관리 장치)가 매 접근마다 물리 주소로 변환한다. 변환 규칙(페이지 테이블)은 OS가 관리하며, 사용자 프로세스는 바꿀 수 없다.</p>
<h3>연속 할당과 외부 단편화</h3>
<p>프로세스마다 연속된 물리 구간을 주면, 할당·해제가 반복되며 빈 공간이 작은 조각들로 흩어져 총 여유 공간은 충분한데도 큰 요청을 못 들어주는 <strong>외부 단편화</strong>가 생긴다.</p>
<h3>페이징</h3>
<p>가상 공간을 고정 크기 <strong>페이지</strong>(흔히 4KB), 물리 메모리를 같은 크기의 <strong>프레임</strong>으로 나누고, 페이지마다 아무 프레임에나 놓는다. 모든 조각이 같은 크기라 아무 빈 프레임이나 쓸 수 있으므로 외부 단편화가 없다. 대신 마지막 페이지의 남는 부분만큼 <strong>내부 단편화</strong>가 생긴다.</p>
<p>가상 주소는 <strong>페이지 번호 + 오프셋</strong>으로 나뉜다. 4KB = $2^{12}$이므로 하위 12비트가 오프셋이다. 페이지 번호로 페이지 테이블을 찾아 프레임 번호를 얻고, 오프셋은 그대로 붙인다. 페이지 테이블 항목에는 프레임 번호 외에 유효 비트, 보호 비트(읽기/쓰기/실행), 접근(referenced)·수정(dirty) 비트가 있어 보호와 페이지 교체에 쓰인다.</p>
<h3>페이지 테이블이 너무 크다: 다단계 페이지 테이블</h3>
<p>64비트 주소 공간을 4KB 페이지로 나누면 단일 테이블은 감당할 수 없이 커진다. 하지만 실제로 쓰는 영역은 일부(코드, 힙, 스택 근처)뿐이다. 그래서 테이블을 트리처럼 여러 단계로 나누고, <strong>사용하는 영역의 하위 테이블만 할당</strong>한다. x86-64는 보통 4단계(일부 CPU는 5단계)를 쓴다.</p>
<h3>변환이 느리다: TLB</h3>
<p>다단계 테이블이면 메모리 접근 한 번에 테이블 조회로 여러 번의 메모리 접근이 더 필요하다. 그래서 MMU는 최근 변환 결과를 저장하는 작은 캐시인 <strong>TLB</strong>를 둔다. TLB가 수십~수천 항목뿐인데도 적중률이 매우 높은 이유는 <strong>지역성</strong>이다. 한 페이지(4KB) 안을 순차적으로 읽으면 첫 접근만 미스이고 나머지는 모두 적중한다. 큰 배열을 무작위로 건드리는 코드는 캐시뿐 아니라 TLB에서도 손해를 본다. 큰 페이지(2MB 등)를 쓰면 TLB 항목 하나가 덮는 범위가 넓어진다.</p>
<h3>세그멘테이션</h3>
<p>코드·데이터·스택 같은 <strong>논리적 단위</strong>로 가변 크기 구간을 나누고, 구간마다 시작 주소와 길이(경계 검사)를 둔다. 사람이 이해하는 구조와 맞고 보호 단위로 자연스럽지만, 가변 크기라 외부 단편화가 다시 생긴다. 현대 x86-64 운영체제는 사실상 페이징 중심으로 메모리를 관리한다.</p>
<h3>공유</h3>
<p>여러 프로세스의 페이지 테이블이 같은 물리 프레임을 가리키게 하면 메모리를 공유할 수 있다. 공유 라이브러리 코드를 한 번만 올려 두는 것, fork의 Copy-on-Write, 공유 메모리 IPC가 모두 이 방식이다.</p>
<h3>빈 공간 고르기: 배치 전략과 압축</h3>
<p>연속 할당에서 요청이 오면 어느 빈 공간에 넣을지 정해야 한다. 빈 공간이 100, 500, 200, 300, 600KB 순서로 있고 212KB 요청이 왔다면,</p>
<ul>
<li><strong>최초 적합</strong>(first fit): 처음부터 훑어 들어가는 첫 공간 → 500KB. 탐색이 가장 빠르다.</li>
<li><strong>최적 적합</strong>(best fit): 들어가는 공간 중 가장 작은 것 → 300KB. 남는 조각이 가장 작지만, 쓸 수 없는 작은 조각이 많이 생긴다.</li>
<li><strong>최악 적합</strong>(worst fit): 가장 큰 공간 → 600KB. 남는 공간을 크게 남겨 다시 쓰게 하려는 방식이다.</li>
</ul>
<p>외부 단편화는 흩어진 빈 공간을 한쪽으로 모으는 <strong>압축</strong>(compaction)으로 없앨 수 있지만, 실행 중인 프로세스를 옮겨야 해서 비싸다. 이웃한 빈 공간을 하나로 합치는 것은 <strong>통합</strong>(coalescing)이다. 이런 비용 때문에 같은 크기 조각으로 나누는 페이징이 쓰인다.</p>
<h3>TLB가 있을 때의 유효 접근 시간</h3>
<p>1단계 페이지 테이블에서 TLB 적중률이 $\alpha$, TLB 접근 시간이 $t$, 메모리 접근 시간이 $m$이면</p>
<p>$$\text{EAT} = \alpha(t + m) + (1 - \alpha)(t + 2m)$$</p>
<p>적중하면 TLB 확인 후 데이터 접근 한 번, 실패하면 TLB 확인 후 페이지 테이블 접근 한 번과 데이터 접근 한 번이다. $t = 15$, $m = 100$, $\alpha = 0.85$면 $0.85 \times 115 + 0.15 \times 215 = 130$ns다.</p>`,
    analogy: R`<p>호텔 객실 번호. 손님(프로세스)은 "내 방 3호"라고만 알고(가상 주소), 프런트(MMU)가 장부(페이지 테이블)를 보고 실제 객실 "712호"(물리 프레임)로 안내한다. 손님마다 "3호"가 다른 방이므로 서로의 방에 들어갈 수 없다. 객실이 모두 같은 크기라 빈 방 아무거나 배정하면 되고(외부 단편화 없음), 자주 찾는 손님의 방 번호는 프런트가 외워 둔다(TLB).</p>`,
    diagram: { caption: '주소 변환: 페이지 번호는 TLB(미스면 페이지 테이블)로 프레임 번호로 바뀌고, 오프셋은 그대로 붙는다.', svg: R`
<svg viewBox="0 0 540 220" width="540">
<text x="140" y="12" class="sm">가상 주소</text>
<rect class="n" x="40" y="22" width="120" height="32"/><text x="100" y="38">페이지 번호</text>
<rect class="n" x="160" y="22" width="80" height="32"/><text x="200" y="38">오프셋</text>
<rect class="h" x="40" y="92" width="120" height="36" rx="6"/><text x="100" y="110">TLB (캐시)</text>
<rect class="n" x="40" y="168" width="120" height="36" rx="6"/><text x="100" y="186">페이지 테이블</text>
<path class="a" d="M100,54 V90"/><path class="a" d="M100,128 V166"/><text x="122" y="148" class="sm">미스</text>
<rect class="h" x="320" y="112" width="110" height="32"/><text x="375" y="128">프레임 번호</text>
<rect class="n" x="430" y="112" width="80" height="32"/><text x="470" y="128">오프셋</text>
<text x="415" y="162" class="sm">물리 주소</text>
<path class="ha" d="M160,110 L318,124"/><text x="236" y="104" class="sm">적중</text>
<path class="a" d="M160,186 L318,136"/><text x="228" y="184" class="st sm">조회 후 TLB에 저장</text>
<path class="a d" d="M200,54 C200,90 470,72 470,110"/><text x="372" y="70" class="sm">그대로 복사</text>
</svg>` },
    math: [
      { tex: R`\begin{aligned} \text{페이지 번호} &= \left\lfloor \frac{\text{가상 주소}}{P} \right\rfloor \\ \text{오프셋} &= \text{가상 주소} \bmod P \\ \text{물리 주소} &= \text{프레임} \times P + \text{오프셋} \end{aligned}`, explain: R`$P$: 페이지 크기. $P = 2^{12}$이면 나눗셈·나머지는 그냥 비트를 상위/하위로 자르는 것이라 하드웨어로 매우 싸다.` },
      { tex: R`\text{EAT} \approx h \cdot t_{\text{mem}} + (1 - h)(k + 1)\, t_{\text{mem}}`, explain: R`유효 메모리 접근 시간(TLB 조회 시간은 무시한 근사).<ul class="defs"><li>$h$: TLB 적중률</li><li>$k$: 페이지 테이블 단계 수</li><li>$t_\text{mem}$: 메모리 접근 시간</li></ul>$h$가 0.99 수준이어야 변환 비용이 거의 사라진다.` },
    ],
    code: R`
import random
from collections import OrderedDict

random.seed(0)
PAGE = 4096
page_table = {vpn: random.randrange(10_000) for vpn in range(256)}   # 가상 페이지 → 물리 프레임

def translate(vaddr, tlb, stats, tlb_size=16):
  vpn, offset = divmod(vaddr, PAGE)            # 상위 비트 = 페이지 번호, 하위 12비트 = 오프셋
  if vpn in tlb:
      tlb.move_to_end(vpn)
      stats["hit"] += 1
  else:
      stats["miss"] += 1
      tlb[vpn] = page_table[vpn]               # 페이지 테이블 조회 (추가 메모리 접근)
      if len(tlb) > tlb_size:
          tlb.popitem(last=False)              # 가장 오래 안 쓴 항목 제거
  return tlb[vpn] * PAGE + offset

pa = translate(0x1234, OrderedDict(), {"hit": 0, "miss": 0})
print(f"가상 0x1234 → 물리 {hex(pa)} (하위 12비트 0x234는 그대로)")

n = 256 * PAGE // 8
for name, addrs in [("순차 접근", range(0, 256 * PAGE, 8)),
                  ("무작위 접근", [random.randrange(256 * PAGE) for _ in range(n)])]:
  tlb, stats = OrderedDict(), {"hit": 0, "miss": 0}
  for a in addrs:
      translate(a, tlb, stats)
  print(f"{name}: TLB 적중률 {stats['hit'] / (stats['hit'] + stats['miss']):.1%}")
`,
    links: [
      { to: 'os-vm', why: '유효 비트를 이용해 필요한 페이지만 올리는 가상 메모리' },
      { to: 'ca-cache', why: 'TLB도 캐시다 — 지역성이 적중률을 결정한다' },
      { to: 'ca-hierarchy', why: '레지스터·캐시·메모리·디스크의 속도 계층' },
      { to: 'os-process', why: '프로세스마다 다른 페이지 테이블 = 격리' },
      { to: 'ds-array', why: '연속된 배열 순회가 캐시·TLB 모두에 유리한 이유' },
    ],
    quiz: [
      { q: '페이징에서 외부 단편화가 생기지 않는 이유는?',
        options: ['OS가 주기적으로 프로세스를 옮겨 빈 공간을 한쪽으로 모으기 때문', '페이지와 프레임 크기가 같아 아무 빈 프레임에나 놓을 수 있기 때문', '프로세스마다 필요한 크기만큼 정확히 메모리를 잘라 주기 때문', '페이지 하나의 크기가 작아 남는 공간이 전혀 생기지 않기 때문'], answer: 1,
        explain: '외부 단편화는 "가변 크기 + 연속 할당"에서 생긴다. 페이징에는 연속된 물리 공간이 필요 없다. 대신 마지막 페이지의 남는 공간(내부 단편화)은 생긴다.' },
      { q: 'TLB가 수십~수천 항목밖에 없는데도 적중률이 매우 높은 이유는?',
        options: ['페이지 테이블 전체가 TLB 안에 들어갈 만큼 작기 때문', '프로그램이 짧은 시간 동안 소수의 페이지에 집중해 접근하기 때문', 'OS가 다음에 쓸 주소를 미리 TLB에 채워 넣어 두기 때문', 'TLB 항목 하나가 여러 프로세스의 같은 페이지를 공유하기 때문'], answer: 1,
        explain: '4KB 페이지 하나를 순차적으로 읽으면 수백 번의 접근 중 첫 번째만 미스다. 무작위 접근 패턴은 이 이점을 잃는다.' },
      { q: '다단계 페이지 테이블을 쓰는 주된 이유는?',
        options: ['단계를 나누면 주소 변환 때 메모리 접근 횟수가 줄어서', '실제로 쓰는 영역의 하위 테이블만 만들어 테이블 메모리를 줄이려고', '단계마다 다른 권한을 둬 커널 영역을 사용자에게서 숨기려고', 'TLB 미스가 나도 상위 테이블만 보면 변환이 끝나게 하려고'], answer: 1,
        explain: '주소 공간 대부분이 비어 있으므로 쓰는 영역의 하위 테이블만 만들면 된다. 단계가 늘면 미스 시 조회 비용은 오히려 커진다. 그 비용은 TLB가 숨긴다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 13~20장 — 주소 공간, 주소 변환, 세그멘테이션, 페이징, TLB', '『Computer Systems: A Programmer\'s Perspective』(CS:APP) 9장 — Virtual Memory', 'Ulrich Drepper, "What Every Programmer Should Know About Memory" (2007)'],
  },
  {
    id:'os-vm', title: '가상 메모리와 페이지 교체', advanced: true,
    summary: R`<strong>요구 페이징</strong>: 필요한 페이지만 적재 → 물리 메모리보다 큰 프로그램 실행
메모리 부족 시 교체 정책이 성능 좌우`,
    body: R`
<h3>요구 페이징과 페이지 폴트</h3>
<p>프로그램 전체를 처음부터 메모리에 올릴 필요는 없다. 실제로 쓰는 페이지만 올리고, 페이지 테이블에서 아직 안 올린 페이지는 유효 비트를 0으로 둔다. 그 페이지에 접근하면 MMU가 <strong>페이지 폴트</strong> 예외를 일으키고, OS가 디스크에서 페이지를 읽어 빈 프레임에 올린 뒤 테이블을 고치고, <strong>폴트를 일으킨 명령을 다시 실행</strong>한다. 프로그램은 이 과정을 전혀 모른다.</p>
<!--diagram-->
<p>메모리 접근은 수십~100ns 수준인데, 디스크에서 페이지를 읽는 것은 SSD여도 수십 µs 이상, HDD면 ms 단위다. 그래서 폴트 비율이 아주 조금만 올라가도 평균 접근 시간이 폭증한다. 가상 메모리가 잘 동작하는 것은 결국 <strong>지역성</strong> 덕분이다.</p>
<!--math:0-->
<h3>페이지 교체 알고리즘</h3>
<p>빈 프레임이 없으면 기존 페이지 하나를 내보내야 한다(수정된 페이지라면 디스크에 써야 하므로 더 비싸다 — <strong>dirty 비트</strong>로 판단).</p>
<ul>
<li><strong>OPT(최적)</strong>: 앞으로 가장 오랫동안 쓰이지 않을 페이지를 내보낸다. 폴트 수가 최소지만 미래를 알아야 하므로 구현 불가. 다른 알고리즘을 평가하는 기준선이다.</li>
<li><strong>FIFO</strong>: 가장 먼저 들어온 페이지를 내보낸다. 단순하지만 자주 쓰는 페이지도 오래됐다는 이유로 내보낸다. 프레임을 늘렸는데 폴트가 오히려 늘어나는 <strong>벨레이디의 이상 현상</strong>이 생길 수 있다.</li>
<li><strong>LRU</strong>: 가장 오래 사용되지 않은 페이지를 내보낸다. "최근에 안 쓴 것은 앞으로도 안 쓸 것"이라는 지역성 가정으로 OPT를 근사한다. 프레임이 많을 때의 메모리 내용이 항상 적을 때의 내용을 포함하는 성질(스택 알고리즘)이 있어 벨레이디 이상이 없다. 하지만 매 메모리 접근마다 순서를 갱신하는 것은 하드웨어적으로 너무 비싸다.</li>
<li><strong>Clock(2차 기회)</strong>: LRU의 실용적 근사. 하드웨어가 접근 시 켜 주는 <strong>참조 비트</strong>를 이용해, 시계 바늘처럼 프레임을 돌며 참조 비트가 1이면 0으로 끄고 넘어가고(한 번 더 기회), 0이면 내보낸다.</li>
<li><strong>NUR</strong>(Not Used Recently): 참조 비트와 변경(dirty) 비트로 페이지를 네 부류로 나눠, (참조 0, 변경 0) → (0, 1) → (1, 0) → (1, 1) 순으로 내보낸다. 최근에 안 쓰였고 디스크에 다시 쓸 필요도 없는 페이지가 가장 싸다.</li>
<li><strong>LFU</strong>: 참조 횟수가 가장 적은 페이지를 내보낸다. 초반에 많이 쓰이고 지금은 안 쓰는 페이지가 오래 남는 단점이 있다.</li>
</ul>
<p>같은 참조열로 FIFO·LRU·OPT의 폴트 수를 세어 보고, 벨레이디의 이상 현상도 직접 확인한다.</p>
<!--code-->
<h3>스래싱</h3>
<p>프로세스들이 활발히 쓰는 페이지 집합(작업 집합)의 합이 물리 메모리보다 커지면, 페이지를 들이자마자 다른 필요한 페이지가 쫓겨나는 일이 반복된다. CPU는 대부분의 시간을 폴트 처리를 기다리며 놀고, 이를 본 시스템이 "CPU가 한가하니" 프로세스를 더 실행하면 상황은 더 나빠진다. 해결은 동시에 실행하는 프로세스 수를 줄이거나 메모리를 늘리는 것이다. OS 차원에서는 프로세스마다 작업 집합만큼의 프레임을 보장하는 <strong>작업 집합 모델</strong>이나, 폴트 빈도가 높으면 프레임을 더 주고 낮으면 회수하는 <strong>PFF</strong>(Page Fault Frequency) 방식으로 조절한다.</p>
<h3>가상 메모리가 주는 다른 기능</h3>
<p><strong>메모리 매핑 파일(mmap)</strong>은 파일을 주소 공간에 매핑해 배열처럼 접근하게 하고, 실제 읽기는 페이지 폴트 때 일어난다. numpy의 <code>np.memmap</code>은 이 방식으로 메모리보다 큰 배열을 다룬다. fork의 Copy-on-Write, 실행 파일의 지연 로딩도 같은 기반 위에 있다. 반면 GPU 메모리는 일반적으로 이렇게 투명하게 디스크로 넘치지 않으므로, 딥러닝에서 메모리가 부족하면 느려지는 대신 바로 OOM 오류가 나는 경우가 많다.</p>`,
    analogy: R`<p>작은 책상(메모리)과 큰 책장(디스크). 공부에 필요한 책만 책상에 펼치고, 책상이 꽉 차면 한 권을 책장에 돌려놓는다. 가장 현명한 선택은 "앞으로 가장 오래 안 볼 책"(OPT)이지만 미래는 모른다. 그래서 "가장 오랫동안 안 펼친 책"(LRU)을 돌려놓는다. 책상이 너무 작아 매번 책을 바꾸느라 정작 공부를 못 하는 상태가 스래싱이다.</p>`,
    diagram: { caption: '페이지 폴트 처리 과정. 가장 비싼 단계는 ④의 디스크 읽기다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<rect class="n" x="15" y="25" width="150" height="50" rx="8"/><text x="90" y="42" class="sm">① CPU가 가상 주소</text><text x="90" y="60" class="sm">접근</text>
<rect class="n" x="195" y="25" width="150" height="50" rx="8"/><text x="270" y="42" class="sm">② 페이지 테이블:</text><text x="270" y="60" class="sm">유효 비트 = 0</text>
<rect class="n" x="375" y="25" width="150" height="50" rx="8"/><text x="450" y="42" class="sm">③ 페이지 폴트 예외</text><text x="450" y="60" class="sm">→ OS로 진입</text>
<rect class="h" x="375" y="125" width="150" height="50" rx="8"/><text x="450" y="142" class="sm">④ 디스크에서 읽기</text><text x="450" y="160" class="sm">(빈 프레임 없으면 교체)</text>
<rect class="n" x="195" y="125" width="150" height="50" rx="8"/><text x="270" y="142" class="sm">⑤ 페이지 테이블 갱신</text><text x="270" y="160" class="sm">유효 비트 = 1</text>
<rect class="n" x="15" y="125" width="150" height="50" rx="8"/><text x="90" y="142" class="sm">⑥ 같은 명령을</text><text x="90" y="160" class="sm">다시 실행</text>
<path class="a" d="M165,50 H193"/><path class="a" d="M345,50 H373"/><path class="a" d="M450,75 V123"/><path class="a" d="M375,150 H347"/><path class="a" d="M195,150 H167"/>
</svg>` },
    math: [
      { tex: R`\text{EAT} = (1 - p)\, t_{\text{mem}} + p\, t_{\text{fault}}`, explain: R`<ul class="defs"><li>$p$: 페이지 폴트 비율</li><li>$t_\text{mem}$: 메모리 접근 시간</li><li>$t_\text{fault}$: 폴트 처리 시간(디스크 I/O 포함)</li></ul>예를 들어 $t_\text{mem}$ = 100ns, $t_\text{fault}$ = 100µs라면 $p$ = 0.001(천 번에 한 번)만 돼도 EAT ≈ 200ns로 두 배가 된다.` },
    ],
    code: R`
from collections import OrderedDict, deque

def fifo(refs, n):
  mem, q, faults = set(), deque(), 0
  for p in refs:
      if p not in mem:
          faults += 1
          if len(mem) == n:
              mem.remove(q.popleft())          # 가장 먼저 들어온 페이지
          mem.add(p); q.append(p)
  return faults

def lru(refs, n):
  mem, faults = OrderedDict(), 0
  for p in refs:
      if p in mem:
          mem.move_to_end(p)                   # 최근 사용으로 갱신
      else:
          faults += 1
          if len(mem) == n:
              mem.popitem(last=False)          # 가장 오래 안 쓴 페이지
          mem[p] = True
  return faults

def opt(refs, n):
  mem, faults = set(), 0
  for i, p in enumerate(refs):
      if p in mem:
          continue
      faults += 1
      if len(mem) == n:
          future = refs[i + 1:]
          mem.remove(max(mem, key=lambda q: future.index(q) if q in future else float("inf")))
      mem.add(p)                               # ↑ 가장 나중에(또는 다시는 안) 쓰일 페이지를 내보냄
  return faults

refs = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1]
for f in (fifo, lru, opt):
  print(f"{f.__name__.upper():4s} (프레임 3개): 페이지 폴트 {f(refs, 3)}회")

belady = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
print("FIFO 프레임 3→4:", fifo(belady, 3), "→", fifo(belady, 4), "(늘렸는데 증가: 벨레이디의 이상)")
print("LRU  프레임 3→4:", lru(belady, 3), "→", lru(belady, 4))
`,
    points: [
      R`폴트 수 계산: 참조열을 따라 프레임 표를 그린다. 빈 프레임을 처음 채울 때도 <strong>폴트로 센다</strong>`,
      R`<strong>벨레이디의 이상</strong>(프레임을 늘렸는데 폴트 증가) = FIFO에서만. LRU·OPT는 생기지 않는다(스택 알고리즘)`,
      R`OPT = 폴트 최소지만 미래를 알아야 해서 구현 불가, 다른 알고리즘의 비교 기준`,
      R`LRU = 가장 오래 <strong>사용되지 않은</strong> 것, LFU = 사용 <strong>횟수</strong>가 가장 적은 것. 둘을 바꿔 쓴 선지가 자주 나온다`,
      R`Clock = 2차 기회 = 참조 비트. NUR = 참조 비트 + 변경 비트, (0, 0)부터 교체`,
      R`스래싱: 다중 프로그래밍 정도를 올렸는데 CPU 이용률이 급격히 떨어지는 현상. 대책 = 작업 집합 모델, PFF, 프로세스 수 줄이기`,
      R`EAT = (1 − p) × 메모리 접근 시간 + p × 폴트 처리 시간. 단위(ns, µs, ms)를 맞춘 뒤 계산`,
    ],
    interview: [
      { q: '가상 메모리는 왜 필요한가요?', a: R`<p>각 프로세스에 독립된 주소 공간을 줘서 서로의 메모리를 침범하지 못하게 하고(격리), 실제로 쓰는 페이지만 물리 메모리에 올려 물리 메모리보다 큰 프로그램도 실행할 수 있게 한다. 덕분에 프로그래머는 물리 메모리 배치를 신경 쓰지 않아도 되고, fork의 Copy-on-Write, mmap, 공유 라이브러리 같은 기능도 같은 구조 위에서 구현된다.</p>` },
      { q: '페이지 폴트가 나면 어떤 일이 일어나나요?', a: R`<p>MMU가 페이지 테이블에서 유효 비트가 0인 항목을 만나면 예외를 일으키고 OS로 제어가 넘어간다. OS는 접근이 합법인지 확인한 뒤 빈 프레임을 찾고, 없으면 교체 알고리즘으로 희생 페이지를 골라(수정됐으면 디스크에 기록) 내보낸다. 디스크에서 필요한 페이지를 읽어 오고, 페이지 테이블을 갱신한 다음 폴트를 일으킨 명령을 다시 실행한다.</p>` },
      { q: 'LRU는 어떻게 구현하나요?', a: R`<p>소프트웨어 캐시라면 해시맵과 이중 연결 리스트를 함께 써서 조회·갱신·제거를 모두 O(1)에 한다. 접근할 때마다 노드를 리스트 맨 앞으로 옮기고, 꽉 차면 맨 뒤를 지운다. OS의 페이지 교체에서는 모든 메모리 접근마다 순서를 갱신하는 것이 너무 비싸서, 하드웨어 참조 비트를 이용한 Clock 알고리즘으로 근사한다.</p>` },
      { q: '스래싱은 무엇이고 어떻게 해결하나요?', a: R`<p>실행 중인 프로세스들의 작업 집합 합이 물리 메모리보다 커서 페이지 폴트가 끊임없이 일어나고, CPU가 거의 일을 못 하는 상태다. 동시에 실행하는 프로세스 수를 줄이거나, 작업 집합 모델이나 PFF로 프로세스별 프레임 수를 조절하거나, 메모리를 늘려 해결한다.</p>` },
    ],
    types: ['가상 메모리', '페이지 교체'],
    links: [
      { to: 'os-memory', why: '페이지 테이블의 유효·참조·dirty 비트' },
      { to: 'ds-linkedlist', why: '해시 + 이중 연결 리스트로 LRU를 O(1)에 구현' },
      { to: 'ca-hierarchy', why: '메모리와 디스크의 속도 차이가 폴트 비용을 결정' },
      { to: 'os-fs', why: '파일 데이터도 페이지 캐시로 메모리에 올라온다, mmap' },
      { to: 'ca-cache', why: 'CPU 캐시의 교체 정책도 같은 문제' },
    ],
    quiz: [
      { q: '최적(OPT) 교체 알고리즘을 실제 OS에서 쓰지 못하는 이유는?',
        options: ['모든 페이지의 참조 횟수를 세야 해서 메모리가 너무 많이 들기 때문', '앞으로 어떤 페이지가 언제 참조될지 알아야 하는데 미래는 알 수 없기 때문', '프레임 수를 늘리면 오히려 폴트가 늘어나는 이상 현상이 생기기 때문', '교체할 때마다 모든 페이지를 정렬해야 해서 O(n log n)이 걸리기 때문'], answer: 1,
        explain: 'OPT는 다른 알고리즘이 얼마나 좋은지 비교하는 이론적 기준선이다. LRU는 과거로 미래를 예측해 OPT를 근사한다. 프레임을 늘렸는데 폴트가 느는 것(Belady의 이상 현상)은 FIFO에서 생기는 일이다.' },
      { q: '스래싱 상태에서 CPU 사용률이 낮다고 프로세스를 더 실행시키면?',
        options: ['노는 CPU에 일이 생겨 사용률이 오르고 스래싱이 해소된다', '프로세스당 프레임이 더 줄어 폴트가 늘고 상황이 악화된다', '새 프로세스가 기존 프로세스의 페이지를 공유해 변화가 없다', 'OS가 자동으로 스와프 공간을 늘려 폴트 처리가 빨라진다'], answer: 1,
        explain: 'CPU가 노는 이유는 할 일이 없어서가 아니라 모두 페이지 I/O를 기다리기 때문이다. 다중 프로그래밍 정도를 줄여야 한다.' },
      { q: '페이지 테이블의 dirty(수정) 비트가 교체에서 하는 역할은?',
        options: ['페이지에 최근 접근이 있었는지 알려 LRU 근사에 쓰게 한다', '수정되지 않은 페이지는 디스크에 쓰지 않고 바로 버릴 수 있게 한다', '여러 프로세스가 공유하는 페이지인지 알려 교체에서 제외한다', '페이지가 메모리에 있는지 알려 페이지 폴트 여부를 판단하게 한다'], answer: 1,
        explain: '수정되지 않은 페이지는 디스크에 이미 같은 내용이 있다. 그래서 교체 정책은 가능하면 깨끗한 페이지를 먼저 내보내기도 한다. 최근 접근 여부는 reference(접근) 비트, 메모리에 있는지는 valid 비트가 알려 준다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 21~23장 — Swapping: Mechanisms, Policies', '『Operating System Concepts』(공룡책) 10장 — Virtual Memory', 'NumPy 문서 — numpy.memmap'],
  },
  {
    id:'os-fs', title: '파일 시스템',
    summary: R`번호 붙은 블록 배열 위에 <strong>이름 있는 파일·디렉터리</strong> 추상화
핵심: inode·블록 할당·페이지 캐시·저널링`,
    body: R`
<h3>파일 = 메타데이터 + 데이터 블록</h3>
<p>저장 장치는 고정 크기 블록을 번호로 읽고 쓸 뿐이다. 파일 시스템은 "이 파일의 내용은 어느 블록들에 있는가"와 "크기·권한·소유자·시간" 같은 메타데이터를 관리한다. Unix 계열에서는 이것을 <strong>inode</strong>에 담는다.</p>
<p>중요한 점: <strong>파일 이름은 inode에 없다</strong>. 디렉터리는 "이름 → inode 번호" 목록을 담은 특수한 파일이다. 그래서 같은 inode를 가리키는 이름을 여러 개 만들 수 있다(<strong>하드 링크</strong>). inode는 자신을 가리키는 이름의 수(링크 수)를 세고, 링크 수가 0이 되고 그 파일을 연 프로세스도 없을 때 실제로 공간이 해제된다. 반면 <strong>심볼릭 링크</strong>는 "다른 경로 문자열"을 내용으로 가진 별도의 파일이라, 원본 경로가 사라지면 깨진다.</p>
<h3>블록을 어떻게 기록하는가</h3>
<ul>
<li><strong>연속 할당</strong>: 순차 읽기가 빠르지만 파일이 커지기 어렵고 외부 단편화가 생긴다.</li>
<li><strong>연결 할당</strong>(FAT 계열): 각 블록이 다음 블록 번호를 가리킨다. 임의 위치 접근이 느리다.</li>
<li><strong>인덱스 할당</strong>(전통적 Unix inode): inode에 <strong>직접 포인터</strong> 여러 개와, 포인터 블록을 가리키는 <strong>간접 포인터</strong>(단일·이중·삼중)를 둔다. 대부분의 파일은 작아서 직접 포인터만으로 빠르게 접근하고, 큰 파일은 간접 단계로 지원한다. 비대칭 분포(작은 파일이 많고 큰 파일은 드묾)에 맞춘 설계다.</li>
<li><strong>익스텐트</strong>(ext4 등): "시작 블록 + 길이"로 연속 구간을 한 번에 기록해 큰 파일의 메타데이터를 줄인다.</li>
</ul>
<h3>열린 파일과 파일 디스크립터</h3>
<p><code>open()</code>은 프로세스별 파일 디스크립터 테이블에 항목을 만들고 작은 정수(fd)를 돌려준다. 이 항목은 커널의 열린 파일 객체(현재 오프셋, 열기 모드)를 거쳐 inode를 가리킨다. 같은 파일을 두 번 열면 오프셋을 따로 가진다.</p>
<h3>페이지 캐시와 fsync</h3>
<p>디스크는 느리므로 커널은 파일 데이터를 메모리(페이지 캐시)에 보관한다. 같은 파일을 다시 읽으면 디스크를 거치지 않는다. 쓰기도 보통 캐시에만 기록하고 나중에 디스크에 반영한다(write-back). 그래서 <code>write()</code>가 성공해도 <strong>전원이 나가면 사라질 수 있다</strong>. 반드시 디스크에 있어야 하는 데이터(DB 로그 등)는 <code>fsync()</code>로 강제로 내려 쓴다.</p>
<h3>크래시 일관성: 저널링</h3>
<p>파일에 블록 하나를 추가하는 것도 "데이터 블록 쓰기, inode 갱신, 빈 블록 비트맵 갱신" 여러 번의 쓰기다. 중간에 전원이 꺼지면 inode는 블록을 가리키는데 비트맵은 빈 블록으로 표시하는 등 불일치가 생긴다. <strong>저널링</strong>은 변경 내용을 먼저 저널(로그) 영역에 기록하고, 완료 표시를 한 뒤에 실제 위치에 반영한다. 재부팅 시 완료 표시된 저널만 다시 적용하면 일관된 상태가 된다. DB의 WAL(Write-Ahead Logging)과 같은 아이디어다. btrfs·ZFS·APFS 같은 파일 시스템은 기존 블록을 덮어쓰지 않고 새 위치에 쓰는 Copy-on-Write 방식으로 일관성을 얻는다.</p>
<h3>데이터 작업과의 연결</h3>
<p>작은 파일 수백만 개로 된 데이터셋이 느린 이유는 파일마다 경로 탐색, inode 조회, open/close 시스템 콜이 필요하기 때문이다. 그래서 대규모 학습 데이터는 큰 파일 여러 개로 묶은 형식(샤딩된 Parquet, TFRecord, WebDataset 등)으로 저장하는 경우가 많다.</p>`,
    analogy: R`<p>도서관. 책장(디스크 블록)에 꽂힌 책을 찾으려면 <strong>카드 목록(inode)</strong>에 "어느 서가 몇 번째 칸"이 적혀 있어야 한다. 제목 색인(디렉터리)은 "제목 → 카드 번호"만 알려 준다. 같은 카드를 가리키는 제목이 둘이면 하드 링크, "○○ 제목의 책을 보시오"라는 메모 카드가 심볼릭 링크다. 사서가 반납 처리를 장부에 먼저 적어 두고 나중에 책장을 정리하는 것이 저널링이다.</p>`,
    diagram: { caption: '디렉터리는 이름을 inode 번호로 바꿔 주고, inode는 메타데이터와 데이터 블록 위치(직접·간접 포인터)를 담는다.', svg: R`
<svg viewBox="0 0 540 245" width="540">
<rect class="n" x="20" y="12" width="200" height="34" rx="6"/><text x="120" y="29">디렉터리: "a.txt" → inode 12</text>
<path class="a" d="M120,46 V68"/>
<rect class="h" x="20" y="70" width="200" height="150" rx="6"/>
<text x="120" y="88" class="sm">inode 12</text>
<path class="e" d="M20,100 H220 M20,130 H220 M20,160 H220 M20,190 H220"/>
<text x="120" y="115" class="sm">크기 · 권한 · 소유자 · 시간 · 링크 수</text>
<text x="120" y="145" class="sm">직접 포인터 (여러 개)</text>
<text x="120" y="175" class="sm">단일 간접 포인터</text>
<text x="120" y="205" class="sm">이중 간접 포인터 …</text>
<rect class="n" x="330" y="60" width="30" height="30"/><rect class="n" x="370" y="60" width="30" height="30"/><rect class="n" x="410" y="60" width="30" height="30"/>
<text x="470" y="75" class="sm">데이터 블록</text>
<path class="a" d="M220,145 L328,80"/>
<rect class="n" x="260" y="150" width="80" height="40" rx="4"/><text x="300" y="163" class="sm">간접 블록</text><text x="300" y="179" class="sm">(포인터 목록)</text>
<path class="a" d="M220,175 L258,172"/>
<rect class="n" x="380" y="140" width="30" height="30"/><rect class="n" x="420" y="140" width="30" height="30"/><rect class="n" x="460" y="140" width="30" height="30"/>
<path class="a" d="M340,165 L378,157"/>
<text x="120" y="232" class="sm">※ 파일 이름은 inode가 아니라 디렉터리에 있다</text>
</svg>` },
    math: [
      { tex: R`\text{최대 파일 크기} = B\left(d + \frac{B}{p} + \left(\frac{B}{p}\right)^2 + \left(\frac{B}{p}\right)^3\right)`, explain: R`전통적 inode 구조에서.<ul class="defs"><li>$B$: 블록 크기</li><li>$p$: 블록 포인터 크기</li><li>$d$: 직접 포인터 개수</li></ul>간접 블록 하나에는 포인터가 $B/p$개 들어간다. 예: $B$ = 4KB, $p$ = 4바이트면 $B/p$ = 1024.` },
    ],
    code: R`
import os, tempfile

d = tempfile.mkdtemp()
a = os.path.join(d, "a.txt")
with open(a, "w") as f:
  f.write("hello")
  f.flush()
  os.fsync(f.fileno())                          # 페이지 캐시 → 디스크까지 강제 기록

os.link(a, os.path.join(d, "hard.txt"))           # 같은 inode를 가리키는 두 번째 이름
os.symlink(a, os.path.join(d, "soft.txt"))        # '경로 문자열'을 내용으로 갖는 별도 파일
for name in ["a.txt", "hard.txt", "soft.txt"]:
  st = os.lstat(os.path.join(d, name))          # lstat: 링크를 따라가지 않고 링크 자체의 정보
  print(f"{name:9s} inode={st.st_ino}  링크 수={st.st_nlink}  크기={st.st_size}")

os.remove(a)                                      # 이름 하나 삭제 = 링크 수 감소
with open(os.path.join(d, "hard.txt")) as f:
  print("hard.txt 내용:", f.read())                 # 데이터는 그대로
print("soft.txt 대상 존재?", os.path.exists(os.path.join(d, "soft.txt")))  # 가리키던 경로가 사라짐

# 같은 파일을 두 번 열면 오프셋(읽은 위치)을 따로 가진다
p = os.path.join(d, "hard.txt")
with open(p) as f1, open(p) as f2:
  print(f1.read(2), f2.read(4), "| fd:", f1.fileno(), f2.fileno())
`,
    links: [
      { to: 'os-syscall', why: 'open·read·write·fsync는 모두 시스템 콜' },
      { to: 'os-vm', why: '페이지 캐시와 메모리 매핑 파일(mmap)' },
      { to: 'db-tx', why: '저널링과 DB의 WAL은 같은 아이디어 — 먼저 로그를 쓴다' },
      { to: 'db-index', why: '많은 파일 시스템과 DB가 메타데이터 탐색에 B-Tree 계열 구조를 쓴다' },
      { to: 'os-io', why: '블록 장치 I/O와 DMA' },
    ],
    quiz: [
      { q: '하드 링크를 만든 뒤 원래 이름의 파일을 삭제해도 하드 링크로 내용을 읽을 수 있는 이유는?',
        options: ['삭제하면 파일이 휴지통으로 옮겨질 뿐 실제로 지워지지 않기 때문', '이름은 inode를 가리킬 뿐이고 inode의 링크 수가 아직 0이 아니라서', '하드 링크를 만들 때 파일 내용 전체가 새 블록에 복사되기 때문', '하드 링크는 원본 경로를 저장해 두고 삭제된 경로도 따라가기 때문'], answer: 1,
        explain: '두 이름은 동등하다. "원본"이라는 개념이 없다. 심볼릭 링크는 경로를 가리키므로 원본 경로가 사라지면 깨진다.' },
      { q: 'write()가 성공적으로 반환됐는데 직후 전원이 꺼지면 데이터를 잃을 수 있는 이유는?',
        options: ['write()는 디스크 오류가 나도 성공을 반환하도록 설계되었기 때문', '쓰기가 보통 페이지 캐시에만 반영되고 디스크 기록은 나중에 일어나기 때문', '디스크는 전원이 꺼지면 마지막으로 쓴 블록을 자동으로 되돌리기 때문', 'write()는 파일을 닫을 때까지 데이터를 프로세스 메모리에만 두기 때문'], answer: 1,
        explain: '쓰기 지연(write-back)은 성능을 위한 선택이다. DB는 커밋 시점에 로그를 fsync해 내구성을 보장한다.' },
      { q: '저널링 파일 시스템의 주된 목적은?',
        options: ['자주 쓰는 블록을 메모리에 모아 디스크 접근을 줄이기', '갱신 도중 전원이 꺼져도 재부팅 후 일관된 상태로 복구하기', '파일 블록을 연속으로 배치해 단편화를 없애기', '같은 내용의 블록을 하나로 합쳐 공간을 아끼기'], answer: 1,
        explain: '변경 내용을 로그에 먼저 기록하고 완료 표시 후 반영한다. 오히려 쓰기가 한 번 더 일어나 성능 비용이 있다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 39~42장 — Files and Directories, FS Implementation, Crash Consistency', '『Operating System Concepts』(공룡책) 13~14장', 'Linux man-pages: inode(7), fsync(2), link(2), symlink(7)'],
  },
  {
    id:'os-io', title: 'I/O와 인터럽트',
    summary: R`장치는 CPU보다 수천~수백만 배 느림
하드웨어 답: 폴링·인터럽트·DMA
소프트웨어 답: 블로킹·논블로킹·비동기 I/O`,
    body: R`
<h3>장치와 대화하는 방법</h3>
<p>각 장치에는 컨트롤러가 있고, CPU는 컨트롤러의 상태·명령·데이터 레지스터를 읽고 써서 장치를 제어한다. 문제는 "작업이 끝났는지 어떻게 아는가"다.</p>
<ul>
<li><strong>폴링</strong>: CPU가 상태 레지스터를 반복해서 확인한다. 장치가 아주 빠르면 오히려 가장 효율적이지만, 느린 장치라면 CPU 시간을 낭비한다(바쁜 대기).</li>
<li><strong>인터럽트</strong>: CPU는 다른 일을 하고, 장치가 끝나면 신호를 보낸다. CPU는 현재 상태를 저장하고 인터럽트 핸들러를 실행한 뒤 원래 작업으로 돌아간다. 다만 인터럽트 처리에도 비용이 있어서, 초당 수백만 개 패킷이 오는 고속 네트워크에서는 인터럽트가 너무 잦아 오히려 성능이 떨어진다. 그래서 부하가 높을 때는 폴링으로 전환하는 하이브리드 방식(Linux 네트워크의 NAPI 등)을 쓴다.</li>
<li><strong>DMA</strong>: 큰 데이터를 옮길 때 CPU가 한 단어씩 복사하면 그 시간 내내 CPU가 묶인다. DMA 컨트롤러가 장치와 메모리 사이를 <strong>직접</strong> 복사하고, 전체가 끝났을 때 인터럽트를 한 번만 보낸다. 디스크·네트워크·GPU 데이터 전송의 기본이다.</li>
</ul>
<h3>속도 차이의 감각</h3>
<p>대략적인 자릿수로, CPU 캐시 접근은 ns 이하~수 ns, 메인 메모리는 약 100ns, NVMe SSD 읽기는 수십~수백 µs, HDD 탐색은 ms 단위, 다른 대륙 서버와의 왕복은 수십~수백 ms다. 디스크나 네트워크를 한 번 기다리는 동안 CPU는 수십만~수억 개의 명령을 실행할 수 있다. I/O 설계의 목표는 이 시간을 다른 일로 채우는 것이다.</p>
<h3>프로그램 입장의 I/O 모델</h3>
<ul>
<li><strong>블로킹</strong>: <code>read()</code>를 부르면 데이터가 올 때까지 스레드가 대기 상태로 잠든다. 코드는 단순하지만, 연결 1만 개를 동시에 처리하려면 스레드 1만 개가 필요하다.</li>
<li><strong>논블로킹</strong>: 준비된 데이터가 없으면 즉시 "아직 없음"을 반환한다. 계속 다시 물어보면 폴링이 된다.</li>
<li><strong>I/O 다중화</strong>: <code>select</code>/<code>poll</code>/<code>epoll</code>(Linux)/<code>kqueue</code>(macOS·BSD)로 <strong>스레드 하나가 수많은 소켓을 감시</strong>하다가 준비된 것만 처리한다. 고성능 웹 서버와 Node.js, Python asyncio의 이벤트 루프가 이 방식이다.</li>
<li><strong>비동기 I/O</strong>: 요청만 등록하고 완료되면 통지받는다(Linux io_uring, Windows IOCP 등).</li>
</ul>
<h3>Python asyncio</h3>
<p><code>async</code>/<code>await</code>는 코루틴이 I/O를 기다리는 지점에서 제어권을 이벤트 루프에 돌려주고, 루프는 준비된 다른 코루틴을 실행한다. 스레드 하나로 수천 개의 동시 연결을 처리할 수 있다. 하지만 코루틴 안에서 <code>time.sleep()</code>이나 동기식 <code>requests.get()</code> 같은 <strong>블로킹 호출</strong>을 하면 루프 전체가 멈춘다. 또 CPU 계산은 기다림이 없으므로 asyncio로 빨라지지 않는다.</p>
<h3>ML과의 연결</h3>
<p>딥러닝 학습에서 GPU가 데이터 로딩(디스크 읽기, 디코딩, 증강)을 기다리면 비싼 GPU가 논다. PyTorch <code>DataLoader</code>의 여러 워커 프로세스와 미리 가져오기(prefetch)는 I/O·전처리와 GPU 계산을 겹쳐 실행하려는 것으로, 위의 "기다리는 시간을 다른 일로 채우기"와 같은 원리다.</p>`,
    analogy: R`<p>배달 음식 기다리기. <strong>폴링</strong>은 1분마다 현관문을 열어 확인하는 것, <strong>인터럽트</strong>는 초인종이 울릴 때까지 다른 일을 하는 것, <strong>DMA</strong>는 장 본 물건 수십 개를 배달 기사가 냉장고까지 직접 넣어 주고 다 끝나면 한 번만 알려 주는 것이다. <strong>asyncio</strong>는 요리사 한 명이 여러 냄비를 올려 두고 끓는 냄비만 돌보는 방식 — 한 냄비 앞에서 멍하니 서 있으면(블로킹 호출) 다른 냄비가 모두 탄다.</p>`,
    diagram: { caption: 'CPU 시간 사용 비교. 폴링은 기다리는 내내 CPU를 쓰고, 인터럽트는 단위마다 짧게 끼어들며, DMA는 블록 전송이 끝났을 때 한 번만 끼어든다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<text x="55" y="44">폴링</text><text x="55" y="104">인터럽트</text><text x="55" y="164">DMA</text>
<rect class="g" x="110" y="30" width="410" height="28"/><text x="315" y="44" class="sm">장치 상태 확인 반복 (바쁜 대기)</text>
<rect class="n" x="110" y="90" width="60" height="28"/><rect class="h" x="170" y="90" width="12" height="28"/>
<rect class="n" x="182" y="90" width="60" height="28"/><rect class="h" x="242" y="90" width="12" height="28"/>
<rect class="n" x="254" y="90" width="60" height="28"/><rect class="h" x="314" y="90" width="12" height="28"/>
<rect class="n" x="326" y="90" width="60" height="28"/><rect class="h" x="386" y="90" width="12" height="28"/>
<rect class="n" x="398" y="90" width="60" height="28"/><rect class="h" x="458" y="90" width="12" height="28"/>
<rect class="n" x="470" y="90" width="50" height="28"/>
<rect class="n" x="110" y="150" width="380" height="28"/><text x="300" y="164" class="sm">다른 작업 (DMA 컨트롤러가 메모리로 직접 전송)</text>
<rect class="h" x="490" y="150" width="30" height="28"/>
<text x="315" y="194" class="sm">흰 칸 = 다른 유용한 작업 · 강조 칸 = 인터럽트 핸들러</text>
</svg>` },
    code: R`
import asyncio, time

async def fetch(i):
  await asyncio.sleep(0.2)          # I/O 대기 흉내: 기다리는 동안 이벤트 루프가 다른 코루틴을 실행
  return i

async def blocking(i):
  time.sleep(0.2)                   # 블로킹 호출: 이벤트 루프 전체가 멈춘다
  return i

async def main():
  t0 = time.perf_counter()
  results = await asyncio.gather(*(fetch(i) for i in range(100)))
  print(f"비동기 대기 100개: {time.perf_counter() - t0:.2f}s (결과 {len(results)}개)")

  t0 = time.perf_counter()
  await asyncio.gather(*(blocking(i) for i in range(5)))
  print(f"코루틴 안의 블로킹 호출 5개: {time.perf_counter() - t0:.2f}s (순차 실행과 같다)")

t0 = time.perf_counter()
for _ in range(5):
  time.sleep(0.2)
print(f"순차 블로킹 5개: {time.perf_counter() - t0:.2f}s")
asyncio.run(main())
`,
    links: [
      { to: 'os-syscall', why: '인터럽트·트랩으로 커널에 진입하는 경로' },
      { to: 'os-thread', why: 'I/O 동시성: 스레드 여러 개 vs 이벤트 루프 하나' },
      { to: 'net-tcp', why: '소켓 I/O — 다중화가 가장 많이 쓰이는 곳' },
      { to: 'pl-generator', why: 'async/await 코루틴은 제너레이터에서 발전한 개념' },
      { to: 'ca-hierarchy', why: '저장 장치 계층별 속도 차이' },
      { to: 'ca-gpu', why: 'GPU가 데이터를 기다리지 않게 하는 데이터 로딩 파이프라인' },
    ],
    quiz: [
      { q: '인터럽트보다 폴링이 더 효율적일 수 있는 상황은?',
        options: ['장치가 매우 느려 완료 이벤트가 드물게 일어날 때', '장치가 매우 빠르거나 이벤트가 잦아 인터럽트 비용이 더 클 때', 'CPU가 다른 계산 작업으로 바쁘게 돌아가고 있을 때', '여러 장치가 동시에 요청을 보내 우선순위를 정해야 할 때'], answer: 1,
        explain: '그래서 고속 네트워크 카드는 부하가 낮을 때는 인터럽트, 높을 때는 폴링으로 전환하는 방식을 쓴다.' },
      { q: '대용량 디스크 읽기에서 DMA를 쓰는 이점은?',
        options: ['디스크 컨트롤러가 데이터를 압축해 전송량 자체를 줄여 준다', 'CPU가 직접 복사하지 않고 끝날 때 인터럽트 한 번만 받는다', '데이터가 CPU 캐시를 거쳐 들어와 이후 접근이 빨라진다', '디스크의 회전 지연과 탐색 시간이 줄어 장치가 빨라진다'], answer: 1,
        explain: '장치 속도는 그대로다. 달라지는 것은 CPU가 그 시간 동안 묶여 있느냐다.' },
      { q: '이미지 리사이즈(순수 CPU 계산) 1,000개를 asyncio로 동시에 실행해도 빨라지지 않는 이유는?',
        options: ['asyncio는 코루틴마다 새 스레드를 만들어 생성 비용이 계산보다 커서', '기다림을 겹치는 도구인데 CPU 계산엔 기다림이 없고 루프는 스레드 하나라서', 'asyncio는 GIL을 잡지 않아 코루틴끼리 메모리를 망가뜨리지 않으려 순차 실행해서', '이벤트 루프가 코루틴을 여러 코어에 나누지만 코어 간 통신 비용이 커서'], answer: 1,
        explain: 'CPU-bound 작업은 multiprocessing이나 GIL을 놓는 네이티브 라이브러리(numpy 등)로 병렬화해야 한다.' },
    ],
    resources: ['『Operating Systems: Three Easy Pieces』(OSTEP) 36~37장 — I/O Devices, Hard Disk Drives', 'Python 공식 문서 — asyncio, selectors', 'Jeff Dean, "Latency Numbers Every Programmer Should Know" (발표 자료에서 유래한 대략적 지연 시간 표)'],
  },
  {
    id:'os-disk', title: '디스크 스케줄링과 RAID',
    summary: R`HDD 접근 시간 = 탐색 + 회전 지연 + 전송 → <strong>헤드 이동 거리</strong>가 성능을 좌우
FCFS·SSTF·SCAN·C-SCAN·LOOK: 쌓인 요청을 <strong>어떤 순서로</strong> 처리할지의 차이
RAID: 디스크 여러 개를 묶어 <strong>속도(스트라이핑)와 안정성(미러링·패리티)</strong> 확보`,
    body: R`
<h3>HDD가 느린 이유</h3>
<p>하드 디스크는 회전하는 원판(플래터) 위를 팔(암) 끝의 헤드가 움직이며 읽는다. 원판의 동심원 하나가 <strong>트랙</strong>, 트랙을 나눈 조각이 <strong>섹터</strong>, 여러 원판에서 같은 반지름의 트랙을 묶은 것이 <strong>실린더</strong>다. 한 번 읽는 데 드는 시간은 셋으로 나뉜다.</p>
<ul>
<li><strong>탐색 시간</strong>(seek): 헤드를 목표 트랙으로 옮기는 시간. 수 ms로 가장 크다.</li>
<li><strong>회전 지연</strong>: 원하는 섹터가 헤드 밑으로 돌아올 때까지 기다리는 시간. 7,200rpm이면 한 바퀴 8.33ms, 평균은 반 바퀴인 약 4.17ms다.</li>
<li><strong>전송 시간</strong>: 실제로 읽는 시간. 위 둘에 비하면 작다.</li>
</ul>
<p>그래서 흩어진 위치를 읽는 무작위 접근은 이어진 위치를 읽는 순차 접근보다 수십~수백 배 느리다. OS는 대기 중인 요청을 모아 헤드가 덜 움직이는 순서로 처리한다. 이것이 디스크 스케줄링이다.</p>
<h3>스케줄링 알고리즘</h3>
<table><tr><th>알고리즘</th><th>규칙</th><th>특징</th></tr>
<tr><td>FCFS</td><td>도착한 순서대로</td><td>공평하지만 헤드가 지그재그로 오가 이동 거리가 크다</td></tr>
<tr><td>SSTF</td><td>현재 위치에서 가장 가까운 요청부터</td><td>평균 이동은 작지만 먼 요청이 계속 밀리는 <strong>기아</strong> 가능</td></tr>
<tr><td>SCAN</td><td>한 방향으로 <strong>끝 트랙까지</strong> 가며 처리, 끝에서 방향 전환</td><td>엘리베이터 방식. 양 끝 트랙은 대기 시간이 길다</td></tr>
<tr><td>C-SCAN</td><td>한 방향으로만 처리, 끝에 닿으면 반대쪽 끝으로 돌아가 다시 시작</td><td>대기 시간이 고르다</td></tr>
<tr><td>LOOK / C-LOOK</td><td>SCAN / C-SCAN과 같지만 <strong>마지막 요청</strong>에서 바로 방향 전환</td><td>요청이 없는 끝까지 가지 않는다</td></tr></table>
<p>계산 문제에서는 시작 방향과 끝 트랙(예: 0~199), C-SCAN의 복귀 이동을 거리에 넣는지를 문제 조건에서 반드시 확인한다. SCAN으로 0 방향 먼저 가면 총 이동은 "시작 위치 − 0"에 "가장 큰 요청 − 0"을 더한 값이다.</p>
<h3>SSD에서는</h3>
<p>SSD는 움직이는 헤드가 없어 위치에 따른 탐색 시간이 없다. 그래서 리눅스는 NVMe SSD에 대개 스케줄러를 거의 쓰지 않는다(<code>none</code>, <code>mq-deadline</code>). 대신 SSD는 덮어쓰기가 안 되고 블록 단위로 지운 뒤 써야 해서, 내부 컨트롤러가 쓰기 위치를 관리한다(FTL, 가비지 컬렉션).</p>
<h3>RAID</h3>
<p>여러 디스크를 하나처럼 묶는 방법이다. 데이터를 디스크에 나눠 쓰는 <strong>스트라이핑</strong>은 동시에 읽고 써서 빨라지고, 같은 데이터를 두 곳에 쓰는 <strong>미러링</strong>과 복구용 값을 따로 두는 <strong>패리티</strong>는 고장에 대비한다.</p>
<table><tr><th>레벨</th><th>방식</th><th>디스크 N개(각 용량 S)일 때 사용 용량</th><th>견디는 고장</th></tr>
<tr><td>RAID 0</td><td>스트라이핑만</td><td>$N \times S$</td><td>0개 (하나만 고장 나도 전체 손실)</td></tr>
<tr><td>RAID 1</td><td>미러링</td><td>$S$ (2개 미러면 절반)</td><td>사본이 하나라도 남으면 됨</td></tr>
<tr><td>RAID 5</td><td>스트라이핑 + 분산 패리티 1개</td><td>$(N-1) \times S$</td><td>1개</td></tr>
<tr><td>RAID 6</td><td>스트라이핑 + 분산 패리티 2개</td><td>$(N-2) \times S$</td><td>2개</td></tr>
<tr><td>RAID 10</td><td>미러링한 쌍들을 스트라이핑</td><td>$N/2 \times S$</td><td>최소 1개, 짝마다 1개까지</td></tr></table>
<p><strong>패리티는 XOR</strong>이다. 같은 줄(stripe)의 데이터 블록들을 XOR한 값을 저장해 두면, 블록 하나를 잃어도 나머지 블록과 패리티를 XOR해 되살릴 수 있다($a \oplus b \oplus b = a$). 패리티를 한 디스크에 몰지 않고 돌아가며 두는 것이 RAID 5다(몰아 두는 RAID 4는 패리티 디스크가 병목이 된다). 대신 작은 쓰기 하나에 "옛 데이터·옛 패리티 읽기, 새 데이터·새 패리티 쓰기"로 I/O 4번이 필요하다(쓰기 페널티).</p>
<p>RAID는 백업이 아니다. 실수로 지운 파일이나 랜섬웨어가 암호화한 파일도 모든 디스크에 똑같이 반영된다. RAID는 디스크 고장에 대비하는 장치일 뿐, 별도 위치의 백업이 따로 필요하다.</p>`,
    analogy: R`<p>디스크 스케줄링은 엘리베이터 운행과 같다. 버튼 누른 순서대로 오르내리면(FCFS) 엘리베이터가 쉴 새 없이 오가고, 가장 가까운 층만 가면(SSTF) 꼭대기 층 손님은 한참 기다린다. 실제 엘리베이터처럼 한 방향으로 쭉 가며 태우고 내리는 것이 SCAN이다.</p>`,
    diagram: { caption: '헤드 50에서 요청 82, 170, 43, 140, 24, 16, 190을 SCAN(0 방향 먼저)으로 처리. 아래로 내려가며 43 → 24 → 16을 처리하고 트랙 0까지 간 뒤 방향을 바꿔 82 → 140 → 170 → 190. 총 이동 50 + 190 = 240.', svg: R`
<svg viewBox="0 0 520 205" width="520">
<path class="e" d="M40,22 H490"/>
<text x="40" y="12" class="sm">0</text><text x="75.2" y="12" class="sm">16</text><text x="92.8" y="12" class="sm">24</text><text x="134.6" y="12" class="sm">43</text><text x="150" y="12" class="sm">50</text><text x="220.4" y="12" class="sm">82</text><text x="348" y="12" class="sm">140</text><text x="414" y="12" class="sm">170</text><text x="458" y="12" class="sm">190</text><text x="490" y="12" class="sm">199</text>
<path class="e d" d="M40,22 V112 M75.2,22 V94 M92.8,22 V76 M134.6,22 V58 M150,22 V40 M220.4,22 V130 M348,22 V148 M414,22 V166 M458,22 V184"/>
<path class="ha" d="M150,40 L134.6,58 L92.8,76 L75.2,94 L40,112 L220.4,130 L348,148 L414,166 L458,184"/>
<circle class="fill" cx="150" cy="40" r="4"/><circle class="fill" cx="134.6" cy="58" r="4"/><circle class="fill" cx="92.8" cy="76" r="4"/><circle class="fill" cx="75.2" cy="94" r="4"/>
<circle class="fill" cx="220.4" cy="130" r="4"/><circle class="fill" cx="348" cy="148" r="4"/><circle class="fill" cx="414" cy="166" r="4"/>
<text x="160" y="40" class="st sm">시작</text><text x="30" y="190" class="st sm">위에서 아래로 처리 순서</text>
</svg>` },
    code: R`
from functools import reduce

def total(path):
  return sum(abs(a - b) for a, b in zip(path, path[1:]))

def fcfs(head, reqs):
  return [head] + reqs

def sstf(head, reqs):
  left, path = list(reqs), [head]
  while left:
      nxt = min(left, key=lambda r: abs(r - path[-1]))   # 지금 위치에서 가장 가까운 요청
      left.remove(nxt)
      path.append(nxt)
  return path

def scan(head, reqs, lo=0):              # 0 방향으로 끝(트랙 0)까지 갔다가 되돌아온다
  down = sorted([r for r in reqs if r <= head], reverse=True)
  up = sorted(r for r in reqs if r > head)
  return [head] + down + [lo] + up

def look(head, reqs):                    # SCAN과 같지만 마지막 요청에서 바로 방향을 바꾼다
  down = sorted([r for r in reqs if r <= head], reverse=True)
  up = sorted(r for r in reqs if r > head)
  return [head] + down + up

def c_scan(head, reqs, lo=0, hi=199):    # 큰 쪽으로만 처리, 끝에 닿으면 0으로 돌아가 다시 시작
  up = sorted(r for r in reqs if r >= head)
  rest = sorted(r for r in reqs if r < head)
  return [head] + up + [hi, lo] + rest # 복귀(hi→lo) 이동도 거리에 넣는 관례

head, reqs = 50, [82, 170, 43, 140, 24, 16, 190]
for name, f in [("FCFS", fcfs), ("SSTF", sstf), ("SCAN", scan), ("LOOK", look), ("C-SCAN", c_scan)]:
  p = f(head, reqs)
  print(f"{name:6} 이동 {total(p):3}  순서 {p}")

# RAID 5의 패리티: 같은 줄 블록들의 XOR
blocks = [0b1011_0010, 0b0110_1100, 0b1111_0000]          # 디스크 0, 1, 2의 데이터
parity = reduce(lambda a, b: a ^ b, blocks)               # 디스크 3에 저장
lost = 1                                                  # 디스크 1 고장
recovered = reduce(lambda a, b: a ^ b, [b for i, b in enumerate(blocks) if i != lost] + [parity])
print(f"패리티 {parity:08b}, 복구한 블록 {recovered:08b}, 원래 블록 {blocks[lost]:08b}")

def usable(level, n, size):              # 사용 가능 용량, 견디는 동시 고장 수
  return {"0": (n * size, 0), "1": (size, n - 1), "5": ((n - 1) * size, 1),
          "6": ((n - 2) * size, 2), "10": (n // 2 * size, 1)}[level]   # RAID 10은 최소 1개(미러 짝마다 1개까지)
for lv in ["0", "1", "5", "6", "10"]:
  print(f"RAID {lv:2}: 2TB × 6개 →", usable(lv, 6, 2))  # RAID 1은 6개 모두 같은 내용으로 미러링한 경우
`,
    links: [
      { to: 'os-fs', why: '파일 시스템이 블록을 디스크 어디에 두는지가 접근 패턴을 정한다' },
      { to: 'os-io', why: '디스크 요청은 장치 드라이버의 I/O 큐를 거친다' },
      { to: 'os-sched', why: 'SSTF의 기아는 CPU 스케줄링의 SJF와 같은 문제' },
      { to: 'ca-hierarchy', why: '디스크는 기억장치 계층의 가장 느린 층' },
    ],
    quiz: [
      { q: 'SSTF 디스크 스케줄링의 대표적인 단점은?',
        options: ['매번 가까운 요청만 고르므로 총 이동 거리가 FCFS보다 항상 길다', '현재 위치에서 먼 요청이 계속 뒤로 밀려 기아가 생길 수 있다', '헤드가 끝 트랙까지 갔다 와야 해서 가운데 요청이 늦어진다', '도착 순서를 무시해 같은 트랙 요청을 두 번 처리하게 된다'], answer: 1,
        explain: '가운데 근처에 요청이 계속 들어오면 헤드가 그 주변만 맴돌아 먼 트랙의 요청은 무한히 기다릴 수 있다. SCAN 계열은 한 방향으로 끝까지 훑어 이를 막는다.' },
      { q: 'RAID 5에서 디스크 하나가 고장 났을 때 데이터를 되살리는 원리는?',
        options: ['모든 블록이 다른 디스크에 하나씩 복제되어 있어 그 사본을 읽는다', '패리티 디스크에 원본 전체가 압축되어 있어 풀어서 다시 쓴다', '같은 줄의 나머지 블록과 패리티를 XOR하면 잃은 블록이 나온다', '고장 난 디스크의 섹터를 컨트롤러 캐시에서 그대로 다시 읽는다'], answer: 2,
        explain: '패리티 = 데이터 블록들의 XOR이다. XOR은 같은 값을 두 번 하면 사라지므로, 남은 블록과 패리티를 모두 XOR하면 빠진 블록만 남는다. 그래서 고장 하나까지만 견딘다.' },
      { q: '2TB 디스크 5개로 RAID 6을 구성할 때 사용 가능한 용량과 견딜 수 있는 동시 고장 디스크 수는?',
        options: ['8TB, 1개', '6TB, 2개', '4TB, 2개', '6TB, 1개'], answer: 1,
        explain: 'RAID 6은 패리티 두 개만큼 용량을 쓴다: (5 − 2) × 2TB = 6TB. 패리티가 두 개라 두 디스크가 동시에 고장 나도 복구할 수 있다.' },
    ],
    resources: ['『Operating System Concepts』(Silberschatz) 11장 — Mass-Storage Structure', '『Operating Systems: Three Easy Pieces』 37~38장 — Hard Disk Drives, RAID (무료 온라인)'],
  },
  {
    id:'os-virtual', title: '가상화와 컨테이너, 클라우드',
    summary: R`<strong>가상 머신</strong>은 하이퍼바이저 위에 게스트 OS를 통째로 올리고, <strong>컨테이너</strong>는 호스트 커널을 공유한 채 프로세스를 격리한다
컨테이너 격리의 정체는 리눅스 커널의 <strong>네임스페이스</strong>(보이는 범위)와 <strong>cgroup</strong>(쓸 수 있는 양)
클라우드 서비스 모델: 인프라만 빌리는 <strong>IaaS</strong>, 실행 환경까지 빌리는 <strong>PaaS</strong>, 완성된 소프트웨어를 쓰는 <strong>SaaS</strong>`,
    body: R`
<p>운영체제는 프로세스마다 CPU와 메모리를 혼자 쓰는 것처럼 보이게 한다. 가상화는 이 착시를 한 단계 더 올려, 컴퓨터 한 대를 여러 대처럼 보이게 한다. 클라우드와 배포 환경이 모두 이 위에 서 있어서 면접에서 VM과 컨테이너의 차이를 자주 묻는다.</p>
<h3>하이퍼바이저와 가상 머신</h3>
<p><strong>하이퍼바이저</strong>(VMM)는 물리 하드웨어를 나눠 여러 가상 머신(VM)에 주는 소프트웨어다. VM마다 자기 커널을 가진 게스트 OS가 돈다.</p>
<ul>
<li><strong>Type 1</strong>(베어메탈, native): 하드웨어 위에서 바로 돈다. VMware ESXi, Xen, KVM, Hyper-V. 클라우드 서버가 이 방식이다.</li>
<li><strong>Type 2</strong>(호스트형, hosted): 일반 OS 위의 응용 프로그램으로 돈다. VirtualBox, VMware Workstation. 개인 PC에서 다른 OS를 띄울 때 쓴다. 한 층을 더 거쳐 느리다.</li>
</ul>
<p>게스트 OS가 특권 명령을 실행하면 하이퍼바이저가 가로채 대신 처리해야 한다. 게스트 OS를 고치지 않고 이를 가로채는 방식을 <strong>전가상화</strong>, 게스트 OS를 고쳐 하이퍼바이저를 직접 부르게(hypercall) 하는 방식을 <strong>반가상화</strong>라 한다. 지금은 CPU가 가상화를 지원(Intel VT-x, AMD-V)해서 전가상화도 빠르다.</p>
<h3>컨테이너</h3>
<p>컨테이너는 VM이 아니다. 호스트 커널을 그대로 쓰는 <strong>평범한 프로세스</strong>인데, 커널 기능으로 보이는 것과 쓸 수 있는 것을 제한했을 뿐이다.</p>
<ul>
<li><strong>네임스페이스</strong>: 무엇이 보이는지를 나눈다. PID(컨테이너 안에서는 자기 프로세스만 보이고 첫 프로세스가 PID 1), 네트워크(자기만의 IP와 포트), 마운트(자기만의 파일 시스템 뷰), UTS(호스트 이름), 사용자 등.</li>
<li><strong>cgroup</strong>: 얼마나 쓸 수 있는지를 제한한다. CPU 비율, 메모리 상한, 디스크 I/O. 메모리 상한을 넘으면 그 컨테이너의 프로세스만 종료된다(OOM kill).</li>
<li><strong>이미지</strong>: 실행에 필요한 파일(라이브러리, 런타임, 앱)을 읽기 전용 계층으로 쌓은 묶음이다. 같은 기반 계층은 여러 이미지가 공유하고, 실행 중 바뀌는 내용은 맨 위 쓰기 계층에 쌓인다.</li>
</ul>
<table>
<tr><th></th><th>가상 머신</th><th>컨테이너</th></tr>
<tr><td>격리 단위</td><td>OS 전체 (커널 포함)</td><td>프로세스</td></tr>
<tr><td>커널</td><td>VM마다 따로</td><td>호스트와 공유</td></tr>
<tr><td>크기·시작 시간</td><td>GB, 수십 초~분</td><td>MB, 1초 안팎</td></tr>
<tr><td>격리 강도</td><td>강함 (하드웨어 수준)</td><td>약함 (커널 취약점이 곧 탈출 경로)</td></tr>
<tr><td>다른 OS 실행</td><td>가능 (리눅스 위에 윈도우)</td><td>불가 (같은 커널 계열만)</td></tr>
</table>
<p>그래서 클라우드는 보통 VM으로 고객끼리 강하게 나누고, 각 VM 안에서 컨테이너로 앱을 나눈다.</p>
<h3>Docker와 쿠버네티스</h3>
<p><strong>Docker</strong>는 Dockerfile로 이미지를 만들고(build), 저장소에 올리고(push), 어디서든 같은 환경으로 실행(run)하게 해 준다. "내 PC에서는 되는데"를 없애는 것이 핵심 가치다. 컨테이너가 수백 개가 되면 어느 서버에 띄울지, 죽으면 다시 띄우기, 트래픽에 맞춰 늘리고 줄이기를 자동화해야 한다. 이것이 <strong>오케스트레이션</strong>이고, 사실상 표준이 <strong>쿠버네티스</strong>(Kubernetes)다.</p>
<h3>클라우드 서비스 모델</h3>
<table>
<tr><th>모델</th><th>사용자가 관리</th><th>제공자가 관리</th><th>예</th></tr>
<tr><td>IaaS</td><td>OS, 런타임, 앱, 데이터</td><td>서버, 스토리지, 네트워크, 가상화</td><td>AWS EC2</td></tr>
<tr><td>PaaS</td><td>앱, 데이터</td><td>여기에 OS와 런타임까지</td><td>Heroku, Google App Engine</td></tr>
<tr><td>SaaS</td><td>사용만 함</td><td>전부</td><td>Gmail, Notion</td></tr>
</table>
<p>코드 함수 단위로 올리고 실행된 만큼만 비용을 내는 <strong>서버리스</strong>(FaaS, AWS Lambda)도 있다. 배치 형태로는 <strong>퍼블릭</strong>(여럿이 공유), <strong>프라이빗</strong>(한 조직 전용), <strong>하이브리드</strong>(둘을 섞음) 클라우드로 나눈다.</p>
<h3>그 밖의 가상화</h3>
<p>스토리지 가상화(여러 디스크를 하나의 풀로), 네트워크 가상화(<strong>SDN</strong>: 장비의 제어 기능을 소프트웨어 컨트롤러로 분리해 중앙에서 프로그래밍, <strong>NFV</strong>: 방화벽·라우터 같은 장비를 일반 서버 위 소프트웨어로)도 같은 생각이다. 물리 자원을 논리 자원으로 바꿔 필요할 때 나눠 주는 것이다.</p>`,
    analogy: R`<p>가상 머신은 땅 위에 단독 주택을 여러 채 짓는 것이다. 집마다 수도·전기 설비(커널)를 따로 갖춰 튼튼히 분리되지만 짓는 데 오래 걸린다. 컨테이너는 아파트 한 동의 세대들이다. 수도관과 기초(커널)는 함께 쓰고 벽(네임스페이스)과 계량기(cgroup)로만 나눠서, 빨리 입주할 수 있는 대신 공용 설비가 고장 나면 모두 영향을 받는다.</p>`,
    diagram: { caption: '가상 머신은 게스트 OS를 통째로 올리고, 컨테이너는 호스트 커널 위에서 격리된 프로세스로 돈다. 컨테이너 쪽에는 게스트 OS 층이 없다.', svg: R`
<svg viewBox="0 0 560 240" width="560">
<text x="135" y="15">가상 머신</text>
<rect class="n" x="20" y="30" width="70" height="30"/><text x="55" y="45" class="sm">앱 A</text>
<rect class="n" x="100" y="30" width="70" height="30"/><text x="135" y="45" class="sm">앱 B</text>
<rect class="n" x="180" y="30" width="70" height="30"/><text x="215" y="45" class="sm">앱 C</text>
<rect class="g" x="20" y="64" width="70" height="30"/><text x="55" y="79" class="sm">라이브러리</text>
<rect class="g" x="100" y="64" width="70" height="30"/><text x="135" y="79" class="sm">라이브러리</text>
<rect class="g" x="180" y="64" width="70" height="30"/><text x="215" y="79" class="sm">라이브러리</text>
<rect class="h" x="20" y="98" width="70" height="30"/><text x="55" y="113" class="sm">게스트 OS</text>
<rect class="h" x="100" y="98" width="70" height="30"/><text x="135" y="113" class="sm">게스트 OS</text>
<rect class="h" x="180" y="98" width="70" height="30"/><text x="215" y="113" class="sm">게스트 OS</text>
<rect class="n" x="20" y="136" width="230" height="30"/><text x="135" y="151" class="sm">하이퍼바이저</text>
<rect class="n" x="20" y="174" width="230" height="30"/><text x="135" y="189" class="sm">호스트 OS (Type 1이면 없음)</text>
<rect class="g" x="20" y="208" width="230" height="26"/><text x="135" y="221" class="sm">하드웨어</text>
<text x="425" y="15">컨테이너</text>
<rect class="n" x="310" y="98" width="70" height="30"/><text x="345" y="113" class="sm">앱 A</text>
<rect class="n" x="390" y="98" width="70" height="30"/><text x="425" y="113" class="sm">앱 B</text>
<rect class="n" x="470" y="98" width="70" height="30"/><text x="505" y="113" class="sm">앱 C</text>
<rect class="g" x="310" y="132" width="70" height="30"/><text x="345" y="147" class="sm">라이브러리</text>
<rect class="g" x="390" y="132" width="70" height="30"/><text x="425" y="147" class="sm">라이브러리</text>
<rect class="g" x="470" y="132" width="70" height="30"/><text x="505" y="147" class="sm">라이브러리</text>
<rect class="n" x="310" y="170" width="230" height="30"/><text x="425" y="185" class="sm">컨테이너 런타임 · 호스트 OS 커널 (공유)</text>
<rect class="g" x="310" y="208" width="230" height="26"/><text x="425" y="221" class="sm">하드웨어</text>
<path class="e d" d="M305,94 H545 V166 H305 Z"/>
<text x="425" y="80" class="sm">네임스페이스 + cgroup으로 격리</text>
</svg>` },
    code: R`
# 컨테이너는 '격리된 시야'를 가진 일반 프로세스다: PID 네임스페이스 흉내
host_procs = {101: 'systemd', 245: 'sshd', 1302: 'nginx', 1303: 'nginx-worker', 2210: 'python app.py'}
containers = {'web': [1302, 1303], 'api': [2210]}

for name, pids in containers.items():
  view = {i + 1: host_procs[p] for i, p in enumerate(pids)}  # 컨테이너 안에서는 PID 1부터 보인다
  print(f"[{name}] 안에서 본 ps:", view)
print('[host]  밖에서 본 ps:', host_procs)

# cgroup처럼 자원 상한을 걸고, 넘으면 그 컨테이너만 제한된다
limits_mb = {'web': 256, 'api': 512}
usage_mb = {'web': 300, 'api': 120}
for c in limits_mb:
  state = 'OOM kill' if usage_mb[c] > limits_mb[c] else 'ok'
  print(f"{c}: {usage_mb[c]}/{limits_mb[c]}MB → {state}")

# 같은 서버(64GB)에 몇 개를 올릴 수 있나: VM은 게스트 OS마다 메모리를 따로 쓴다
host_gb, app_gb, guest_os_gb, engine_gb = 64, 1.5, 2.0, 0.1
print('VM:', int(host_gb // (app_gb + guest_os_gb)), '개, 컨테이너:', int(host_gb // (app_gb + engine_gb)), '개')
`,
    links: [
      { to: 'os-process', why: '컨테이너는 결국 격리된 프로세스다' },
      { to: 'os-syscall', why: '사용자 모드와 커널 모드: 하이퍼바이저가 가로채는 특권 명령' },
      { to: 'os-vm', why: '프로세스 단위 가상화(가상 메모리)가 머신 단위로 확장된 것' },
      { to: 'se-cicd', why: '컨테이너 이미지로 빌드·배포 환경을 맞춘다' },
      { to: 'se-sysdesign', why: '오케스트레이션으로 수평 확장을 자동화' },
    ],
    quiz: [
      { q: '컨테이너와 가상 머신을 비교한 설명으로 옳은 것은?',
        options: ['컨테이너는 각자 독립된 커널을 갖고 있어 격리가 더 강하다', '컨테이너는 호스트 커널을 공유해 가볍지만 격리는 VM보다 약하다', '가상 머신은 호스트 커널을 공유하므로 다른 OS를 실행할 수 없다', '컨테이너는 하이퍼바이저가 있어야만 실행할 수 있다'], answer: 1,
        explain: '컨테이너는 같은 커널 위의 격리된 프로세스라 게스트 OS가 없어 가볍다. 대신 커널 취약점 하나로 다른 컨테이너나 호스트에 닿을 수 있어 격리는 약하다. 커널을 따로 갖는 쪽은 VM이다.' },
      { q: '리눅스에서 컨테이너가 쓸 수 있는 메모리와 CPU의 양을 제한하는 커널 기능은?',
        options: ['cgroup', 'PID 네임스페이스', 'chroot', '하이퍼바이저'], answer: 0,
        explain: '네임스페이스는 무엇이 보이는지(PID, 네트워크, 마운트 등)를, cgroup은 자원을 얼마나 쓸 수 있는지를 제한한다. chroot는 루트 디렉터리만 바꾸는 옛 기능이다.' },
      { q: '운영체제와 런타임은 클라우드 제공자가 관리하고, 사용자는 애플리케이션 코드와 데이터만 올리는 서비스 모델은?',
        options: ['IaaS', 'SaaS', 'PaaS', '온프레미스'], answer: 2,
        explain: 'IaaS는 가상 서버까지만 받아 OS부터 사용자가 관리한다. PaaS는 실행 환경까지 받아 코드만 올린다. SaaS는 완성된 소프트웨어를 쓰기만 한다.' },
    ],
    resources: ['『Docker 교과서』(Elton Stoneman)', 'Kubernetes 공식 문서, 「쿠버네티스란 무엇인가」 (kubernetes.io/ko/docs/concepts/overview)'],
  },
];
