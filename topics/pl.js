TOPICS.pl = [
  {
    id: 'pl-oop', title: '객체지향의 핵심 개념', advanced: true,
    summary: R`데이터 + 행동을 묶고(<strong>캡슐화</strong>) 공통 인터페이스 뒤에서 구현 교체(<strong>다형성</strong>)
핵심은 상속이 아니라 불변식 보호`,
    body: R`
<h3>캡슐화: 불변식을 지키는 경계</h3>
<p>객체는 상태(데이터)와 그 상태를 바꾸는 행동(메서드)을 함께 가진다. 캡슐화의 진짜 목적은 "숨기기"가 아니라 <strong>불변식 보호</strong>다. 계좌의 잔액이 음수가 되면 안 된다면, 잔액은 검증하는 메서드를 통해서만 바뀌어야 한다. 그러면 잔액 규칙을 확인할 곳이 한 곳뿐이다.</p>
<p>Python은 접근 제어를 강제하지 않는다. 이름 앞의 <code>_</code>는 "내부용"이라는 관례이고, <code>__name</code>은 하위 클래스와의 이름 충돌을 피하기 위해 이름을 바꿔(name mangling) 저장할 뿐 진짜 비공개가 아니다. 대신 <code>@property</code>로 속성 접근처럼 보이는 검증 로직을 만들 수 있어, 처음에는 단순한 속성으로 시작했다가 나중에 검증을 추가해도 사용하는 코드를 바꿀 필요가 없다.</p>
<h3>다형성: 같은 메시지, 다른 동작</h3>
<p><code>model.predict(X)</code>를 호출하는 코드는 model이 선형 회귀인지 랜덤 포레스트인지 몰라도 된다. 실제로 어떤 메서드가 실행될지는 <strong>실행 시점에 객체의 실제 타입</strong>을 보고 정해진다(동적 디스패치). 그래서 새 모델을 추가해도 호출하는 쪽 코드를 고칠 필요가 없다. 다형성은 "변경할 부분과 고정된 부분을 나누는" 객체지향의 가장 강력한 도구다.</p>
<p>Python은 <strong>덕 타이핑</strong>을 쓴다: 필요한 메서드가 있으면 상속 관계와 무관하게 그 역할을 할 수 있다. <code>len(x)</code>는 x에 <code>__len__</code>이 있으면 동작하고, scikit-learn의 파이프라인은 <code>fit</code>·<code>transform</code>만 있으면 어떤 객체든 받아들인다. 명시적인 계약이 필요하면 <code>abc.ABC</code>(추상 메서드를 구현하지 않으면 인스턴스 생성 불가)나 <code>typing.Protocol</code>(구조적 타입 검사)을 쓴다.</p>
<h3>상속: 강력하지만 가장 강한 결합</h3>
<p>상속은 코드 재사용과 "is-a" 관계를 표현하지만, 하위 클래스가 상위 클래스의 <strong>내부 구현</strong>에 의존하게 만든다. 상위 클래스를 고치면 모든 하위 클래스가 깨질 수 있다(깨지기 쉬운 기반 클래스 문제). 그래서 "상속보다 조합(composition)"이라는 격언이 있다: 다른 객체를 필드로 가지고 일을 맡기면(has-a), 그 부분만 다른 구현으로 바꿔 끼우기 쉽다.</p>
<h3>다중 상속과 MRO</h3>
<p>Python은 다중 상속을 지원한다. 메서드를 찾는 순서는 C3 선형화로 계산한 <strong>MRO(Method Resolution Order)</strong>를 따른다(<code>Class.__mro__</code>). <code>super()</code>는 "부모 클래스"가 아니라 <strong>MRO에서 다음 클래스</strong>를 가리킨다. 그래서 다이아몬드 상속에서도 각 클래스의 메서드가 한 번씩만 호출된다.</p>
<h3>Python 데이터 모델</h3>
<p><code>__len__</code>, <code>__eq__</code>, <code>__iter__</code>, <code>__getitem__</code>, <code>__add__</code> 같은 특수 메서드를 구현하면 내 객체가 <code>len()</code>, <code>==</code>, <code>for</code>, 인덱싱, <code>+</code> 같은 언어 문법과 자연스럽게 어울린다. numpy 배열과 PyTorch 텐서의 연산자도 이렇게 만들어진 것이다. <code>@dataclass</code>는 데이터 중심 클래스의 <code>__init__</code>·<code>__repr__</code>·<code>__eq__</code>를 자동으로 만들어 준다.</p>`,
    analogy: R`<p>전기 콘센트. 콘센트(인터페이스)는 "220V를 이 모양으로 준다"는 약속만 하고, 꽂는 기기(구현)가 선풍기든 노트북이든 상관없다(다형성). 기기 내부 회로는 케이스로 막혀 있어 사용자가 실수로 건드릴 수 없다(캡슐화). 선풍기를 만들려고 냉장고를 상속받아 개조하기보다(상속), 모터와 날개 부품을 조립하는 편이 낫다(조합).</p>`,
    diagram: { caption: '클라이언트는 추상 인터페이스(Model)에만 의존한다. 실제로 실행되는 predict는 실행 시점에 객체의 실제 타입으로 결정된다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<rect class="h" x="200" y="20" width="160" height="50" rx="6"/><text x="280" y="38" class="sm">«추상» Model</text><text x="280" y="56" class="sm">fit(X, y) · predict(X)</text>
<rect class="n" x="120" y="130" width="140" height="44" rx="6"/><text x="190" y="146" class="sm">LinearModel</text><text x="190" y="162" class="sm">predict: X @ w</text>
<rect class="n" x="300" y="130" width="140" height="44" rx="6"/><text x="370" y="146" class="sm">TreeModel</text><text x="370" y="162" class="sm">predict: 트리 순회</text>
<path class="a" d="M190,128 L250,72"/><path class="a" d="M370,128 L310,72"/>
<text x="190" y="100" class="sm">구현</text><text x="370" y="100" class="sm">구현</text>
<rect class="n" x="10" y="25" width="140" height="40" rx="6"/><text x="80" y="45" class="sm">model.predict(X)</text>
<path class="ha" d="M150,45 H198"/>
<text x="270" y="194" class="sm">새 모델을 추가해도 클라이언트 코드는 그대로 (동적 디스패치)</text>
</svg>` },
    code: R`
from abc import ABC, abstractmethod
import math

class Account:
  def __init__(self, balance=0):
      self._balance = balance
  @property
  def balance(self):                         # 읽기는 속성처럼
      return self._balance
  def withdraw(self, amount):                # 상태 변경은 검증을 거치는 한 곳으로
      if amount > self._balance:
          raise ValueError("잔액 부족: 불변식(잔액 >= 0) 위반")
      self._balance -= amount

acc = Account(100)
acc.withdraw(30)
try:
  acc.withdraw(500)
except ValueError as e:
  print("거부:", e, "| 잔액", acc.balance)

class Shape(ABC):
  @abstractmethod
  def area(self): ...
class Circle(Shape):
  def __init__(self, r): self.r = r
  def area(self): return math.pi * self.r ** 2
class Square(Shape):
  def __init__(self, a): self.a = a
  def area(self): return self.a ** 2

for s in [Circle(1), Square(2)]:               # 다형성: 같은 호출, 실제 타입의 메서드 실행
  print(type(s).__name__, round(s.area(), 2))
try:
  Shape()
except TypeError as e:
  print("추상 클래스:", e)

class Playlist:                                # 덕 타이핑 + 데이터 모델: 상속 없이 len()·for와 어울린다
  def __init__(self, songs): self.songs = songs
  def __len__(self): return len(self.songs)
  def __iter__(self): return iter(self.songs)
print(len(Playlist(["a", "b"])), list(Playlist(["a", "b"])))

class Base:
  def hello(self): print("  Base")
class Left(Base):
  def hello(self): print("  Left"); super().hello()
class Right(Base):
  def hello(self): print("  Right"); super().hello()
class Child(Left, Right):
  def hello(self): print("  Child"); super().hello()
print("MRO:", [c.__name__ for c in Child.__mro__])
Child().hello()                                # super()는 MRO의 다음 클래스 → Base는 한 번만
`,
    links: [
      { to: 'pl-solid', why: '객체지향 설계를 변경에 강하게 만드는 원칙들' },
      { to: 'pl-object', why: 'Python에서 객체·클래스·속성 조회가 실제로 동작하는 방식' },
      { to: 'se-pattern', why: '다형성과 조합을 활용한 반복되는 설계 해법' },
      { to: 'ml-learning', why: 'scikit-learn의 fit/predict 인터페이스 = 다형성의 대표 사례' },
      { to: 'se-principle', why: '결합도와 응집도 — 상속이 결합도를 높이는 이유' },
    ],
    quiz: [
      { q: '잔액을 private 필드로 두고 withdraw 메서드로만 바꾸게 하는(캡슐화) 가장 본질적인 이유는?',
        options: ['잔액을 읽을 때마다 메서드를 거치게 해 접근 기록을 자동으로 남기려고', '"잔액 ≥ 0" 같은 규칙을 검사하는 지점을 한 곳으로 모아 우회를 막으려고', '필드를 숨기면 객체 크기가 줄어 메모리를 아끼고 속도가 빨라지므로', '하위 클래스가 잔액 필드를 재정의하지 못하게 상속을 막으려고'], answer: 1,
        explain: '외부에서 필드를 직접 바꿀 수 있으면 검증을 우회할 수 있다. Python은 강제하지 않으므로 _ 관례와 property로 의도를 표현한다.' },
      { q: '"상속보다 조합을 선호하라"는 조언의 근거로 가장 적절한 것은?',
        options: ['상속은 메서드 조회 단계가 늘어 호출이 눈에 띄게 느려지기 때문', '상속은 하위 클래스를 상위 구현에 묶지만, 조합은 부품을 쉽게 바꿀 수 있어서', '조합을 쓰면 부품 객체를 공유해 인스턴스마다 메모리를 덜 쓰기 때문', '상속은 다중 상속을 허용하지 않는 언어가 많아 이식성이 떨어지기 때문'], answer: 1,
        explain: '상속은 is-a가 확실하고 상위 클래스가 안정적일 때 쓰고, 행동을 바꿔 끼워야 하는 곳은 조합(전략 객체 주입)이 유연하다.' },
      { q: '다이아몬드 상속(Child(Left, Right), 둘 다 Base 상속)에서 모든 클래스가 super().hello()를 호출하면 Base.hello는 몇 번 실행되는가?',
        options: ['0번 — Base는 MRO의 마지막이라 super() 체인이 거기까지 가지 않는다', '1번 — super()는 MRO(Child→Left→Right→Base)의 다음을 부른다', '2번 — Left와 Right가 각각 자기 부모인 Base를 한 번씩 부른다', '3번 — Child·Left·Right가 모두 Base를 직접 부르기 때문이다'], answer: 1,
        explain: 'super()는 "내 부모"가 아니라 "MRO에서 내 다음"이다. Left의 super()는 Right를 부른다.' },
    ],
    resources: ['Luciano Ramalho, 『전문가를 위한 파이썬(Fluent Python)』 1장(데이터 모델), 13~14장(인터페이스, 상속)', 'Python 공식 문서 — Data model, abc, typing.Protocol', 'Gamma 외, 『GoF의 디자인 패턴』 1장 — "상속보다 객체 합성"'],
  },
  {
    id: 'pl-solid', title: 'SOLID 원칙', advanced: true,
    summary: R`변경에 강한 객체지향 설계의 5원칙
공통 목표: 변경 이유 분리 + 구현이 아닌 <strong>추상에 의존</strong>`,
    body: R`
<h3>S — 단일 책임 원칙 (SRP)</h3>
<p>"클래스는 하나의 일만 한다"보다 정확한 표현은 <strong>"변경될 이유가 하나뿐이어야 한다"</strong>이다. 매출 보고서 클래스가 계산(재무팀 요구), 서식(디자인팀 요구), 이메일 발송(인프라 요구)을 모두 하면, 세 집단의 요구가 한 파일에서 충돌한다. 변경 요청을 하는 주체(액터)별로 나눈다.</p>
<h3>O — 개방-폐쇄 원칙 (OCP)</h3>
<p>확장에는 열려 있고 수정에는 닫혀 있어야 한다. 새 할인 정책을 추가할 때마다 기존 함수의 <code>if-elif</code>를 고친다면, 매번 이미 검증된 코드를 건드리게 된다. 할인 정책을 공통 인터페이스로 만들고 새 정책은 새 클래스(또는 함수 등록)로 추가하면, 기존 코드는 그대로 둔 채 동작을 확장할 수 있다. 다형성이 이를 가능하게 한다.</p>
<h3>L — 리스코프 치환 원칙 (LSP)</h3>
<p>상위 타입을 쓰는 곳에 하위 타입을 넣어도 <strong>프로그램의 올바름이 유지</strong>되어야 한다. 하위 타입은 상위 타입의 계약을 지켜야 한다: 사전 조건을 강화하지 않고(더 까다로운 입력을 요구하지 않음), 사후 조건을 약화하지 않는다(덜 보장하지 않음). 유명한 예가 정사각형-직사각형이다. 수학적으로 정사각형은 직사각형이지만, "너비만 바꾸면 높이는 그대로"라는 직사각형의 계약을 정사각형은 지킬 수 없다. 상속이 "개념상 is-a"가 아니라 <strong>"행동상 대체 가능"</strong>할 때만 맞다는 것을 보여 준다.</p>
<h3>I — 인터페이스 분리 원칙 (ISP)</h3>
<p>클라이언트가 쓰지 않는 메서드에 의존하게 만들지 않는다. 프린트·스캔·팩스를 모두 가진 거대한 인터페이스를 단순 프린터가 구현하면 쓸모없는 메서드를 억지로 만들어야 하고, 팩스 인터페이스가 바뀔 때 프린터까지 영향을 받는다. 작은 역할별 인터페이스로 나눈다.</p>
<h3>D — 의존성 역전 원칙 (DIP)</h3>
<p>주문 처리 같은 <strong>고수준 정책</strong>이 MySQL 드라이버나 SMTP 같은 <strong>저수준 세부</strong>에 직접 의존하면, 세부를 바꿀 때마다 핵심 로직을 고쳐야 한다. 고수준 쪽이 필요한 기능을 추상(인터페이스)으로 정의하고, 저수준 구현이 그 추상을 따르게 한다. 의존 방향이 "핵심 → 세부"에서 "세부 → 추상 ← 핵심"으로 뒤집힌다. 구현은 바깥에서 넣어 준다(의존성 주입). 가장 큰 실익은 <strong>테스트</strong>다: 실제 DB 대신 메모리 저장소를 넣어 핵심 로직만 빠르게 검증할 수 있다.</p>
<h3>원칙의 비용</h3>
<p>추상화는 공짜가 아니다. 구현이 하나뿐인데 인터페이스부터 만들면 코드만 복잡해진다(YAGNI: 지금 필요 없는 것은 만들지 않는다). 변경이 실제로 일어나는 지점, 두 번째 구현이 필요해진 시점에 원칙을 적용하는 것이 실용적이다. Python에서는 덕 타이핑과 <code>Protocol</code> 덕분에 무거운 인터페이스 계층 없이도 DIP를 가볍게 적용할 수 있다.</p>`,
    analogy: R`<p>노트북의 USB-C 포트. 노트북(고수준)은 특정 회사의 충전기(저수준)에 맞춰 설계되지 않고, USB-C라는 <strong>표준(추상)</strong>에 맞춰 설계된다. 충전기 회사들도 그 표준을 따른다(DIP). 새 충전기가 나와도 노트북을 개조하지 않는다(OCP). 표준을 따른다고 주장하면서 전압을 다르게 주는 충전기는 꽂는 순간 문제를 일으킨다(LSP 위반).</p>`,
    diagram: { caption: '의존성 역전: 핵심 로직이 구체적인 DB 구현이 아니라 추상(Repository)에 의존하면, 구현을 바꾸거나 테스트용 가짜를 넣기 쉽다.', svg: R`
<svg viewBox="0 0 560 210" width="560">
<text x="120" y="14">이전</text><text x="400" y="14">이후 (DIP)</text>
<path class="e d" d="M240,8 V200"/>
<rect class="h" x="40" y="40" width="160" height="40" rx="6"/><text x="120" y="60" class="sm">OrderService (핵심)</text>
<rect class="n" x="40" y="140" width="160" height="40" rx="6"/><text x="120" y="160" class="sm">MySQLRepository (세부)</text>
<path class="a" d="M120,80 V138"/><text x="170" y="110" class="sm">직접 의존</text>
<rect class="h" x="320" y="30" width="160" height="36" rx="6"/><text x="400" y="48" class="sm">OrderService (핵심)</text>
<rect class="n" x="320" y="95" width="160" height="36" rx="6"/><text x="400" y="113" class="sm">«추상» Repository</text>
<rect class="n" x="260" y="160" width="140" height="36" rx="6"/><text x="330" y="178" class="sm">MySQLRepository</text>
<rect class="n" x="410" y="160" width="140" height="36" rx="6"/><text x="480" y="178" class="sm">InMemoryRepository</text>
<path class="a" d="M400,66 V93"/>
<path class="a d" d="M330,158 L380,133"/><path class="a d" d="M480,158 L420,133"/>
<text x="510" y="145" class="sm">테스트용</text>
</svg>` },
    code: R`
from typing import Protocol

# LSP 위반: 정사각형은 '너비만 바꾸면 높이는 그대로'라는 직사각형의 계약을 지킬 수 없다
class Rectangle:
  def __init__(self, w, h): self.w, self.h = w, h
  def set_width(self, w): self.w = w
  def area(self): return self.w * self.h

class Square(Rectangle):
  def __init__(self, a): super().__init__(a, a)
  def set_width(self, w): self.w = self.h = w      # 정사각형을 유지하려면 높이도 바뀐다

def stretch(r: Rectangle):                          # 직사각형을 믿고 작성한 클라이언트 코드
  r.set_width(10)
  return r.area() == 10 * r.h and r.h == 5          # 높이 5는 그대로일 것이라는 기대

print("Rectangle 통과:", stretch(Rectangle(2, 5)), "/ Square 통과:", stretch(Square(5)))

# OCP: 새 할인 정책은 등록만 하면 되고 checkout은 수정하지 않는다
DISCOUNTS = {}
def discount(name):
  def register(fn):
      DISCOUNTS[name] = fn
      return fn
  return register

@discount("none")
def no_discount(price): return price
@discount("member")
def member(price): return price * 0.9
@discount("coupon5000")                              # 나중에 추가된 정책 — 기존 코드 수정 없음
def coupon(price): return max(price - 5000, 0)

def checkout(price, policy):
  return DISCOUNTS[policy](price)
print({p: checkout(30000, p) for p in DISCOUNTS})

# DIP: 핵심 로직은 추상(Protocol)에만 의존하고, 구현은 밖에서 주입한다
class Repository(Protocol):
  def save(self, order_id: str, amount: int) -> None: ...

class InMemoryRepository:                            # 테스트용 가짜 구현 (실제 DB 불필요)
  def __init__(self): self.rows = {}
  def save(self, order_id, amount): self.rows[order_id] = amount

class OrderService:
  def __init__(self, repo: Repository): self.repo = repo
  def place(self, order_id, amount):
      if amount <= 0:
          raise ValueError("금액은 양수")
      self.repo.save(order_id, amount)

repo = InMemoryRepository()
OrderService(repo).place("o-1", 12000)
assert repo.rows == {"o-1": 12000}
print("DB 없이 핵심 로직 테스트 통과:", repo.rows)
`,
    links: [
      { to: 'pl-oop', why: '다형성과 조합 — SOLID가 기대는 도구' },
      { to: 'se-principle', why: '결합도·응집도와 모듈화 원칙' },
      { to: 'se-pattern', why: '전략·팩토리·어댑터 등 SOLID를 구현하는 패턴' },
      { to: 'se-test', why: '의존성 주입이 단위 테스트를 쉽게 만드는 이유' },
      { to: 'pl-decorator', why: '데코레이터를 이용한 등록(registry) 패턴' },
    ],
    quiz: [
      { q: '단일 책임 원칙(SRP)의 "책임"을 판단하는 가장 실용적인 기준은?',
        options: ['클래스의 public 메서드가 다섯 개 이하인지', '그 코드의 변경을 요구하는 주체(액터)가 하나인지', '클래스가 다른 클래스를 하나만 의존하는지', '클래스 하나가 파일 하나에 들어가는지'], answer: 1,
        explain: '재무 규칙 변경과 보고서 서식 변경이 같은 클래스를 건드리면, 한쪽 변경이 다른 쪽을 깨뜨릴 위험이 생긴다.' },
      { q: 'Square가 Rectangle을 상속하면 리스코프 치환 원칙을 위반할 수 있는 이유는?',
        options: ['정사각형은 수학적으로 직사각형의 한 종류가 아니어서 is-a 관계가 성립하지 않기 때문', '"너비를 바꿔도 높이는 유지된다"는 Rectangle의 계약을 Square가 지킬 수 없기 때문', 'Square는 변이 하나뿐이라 Rectangle의 생성자 인자 개수와 맞지 않아 호출이 실패하기 때문', '하위 클래스가 상위 클래스의 메서드를 재정의하면 그 자체로 LSP 위반이기 때문'], answer: 1,
        explain: '상속은 개념 분류가 아니라 행동의 대체 가능성을 기준으로 해야 한다. 불변 객체로 만들면(크기 변경 없이 새 객체 생성) 이 문제가 사라진다.' },
      { q: '의존성 역전(DIP)을 적용하면 단위 테스트가 쉬워지는 이유는?',
        options: ['추상 클래스가 테스트 메서드를 자동으로 만들어 주어서', '핵심 로직이 추상에만 의존해 실제 DB 대신 가짜 구현을 넣을 수 있어서', '의존 객체를 전역으로 하나만 두어 테스트마다 다시 만들 필요가 없어서', '구체 클래스를 상속해 테스트용 메서드만 덮어쓸 수 있게 되어서'], answer: 1,
        explain: '구체 구현을 직접 생성하는 코드는 테스트할 때도 진짜 DB가 필요하다. 생성자 주입은 그 결합을 끊는다.' },
    ],
    resources: ['Robert C. Martin, 『클린 아키텍처』 3부 — 설계 원칙', 'Barbara Liskov & Jeannette Wing, "A Behavioral Notion of Subtyping" (1994)', 'Python 공식 문서 — typing.Protocol (PEP 544)'],
  },
  {
    id: 'pl-object', title: 'Python 객체 모델',
    summary: R`Python은 숫자·함수·클래스까지 <strong>모두 객체</strong>
변수 = 값을 담는 상자 ✗ → 객체에 붙인 <strong>이름표(참조)</strong>`,
    body: R`
<h3>객체 = 정체성 + 타입 + 값</h3>
<p>모든 객체는 세 가지를 가진다. <strong>정체성</strong>(<code>id()</code>, CPython에서는 메모리 주소, 객체가 살아 있는 동안 불변), <strong>타입</strong>(<code>type()</code>, 가능한 연산을 정함, 불변), <strong>값</strong>(가변 객체만 바뀔 수 있음). 정수 <code>1</code>, 함수, 모듈, 클래스까지 모두 객체이며, 클래스 자신도 <code>type</code>의 인스턴스다.</p>
<h3>변수는 이름표다</h3>
<p><code>a = [1, 2, 3]</code>은 리스트 객체를 만들고 이름 <code>a</code>를 그 객체에 붙인다. <code>b = a</code>는 <strong>복사가 아니라</strong> 같은 객체에 이름을 하나 더 붙인다. 그래서 <code>b.append(4)</code>를 하면 <code>a</code>로 봐도 바뀌어 있다(별칭, aliasing). 이름과 객체의 연결은 이름공간(모듈·함수·객체의 딕셔너리)에 저장된다.</p>
<h3>is와 ==</h3>
<p><code>a is b</code>는 <strong>같은 객체인가</strong>(정체성), <code>a == b</code>는 <strong>값이 같은가</strong>(<code>__eq__</code> 호출)다. CPython은 작은 정수(-5~256)와 일부 문자열을 미리 만들어 재사용하기 때문에 <code>is</code>로 값을 비교해도 우연히 맞을 때가 있지만, 이는 구현 세부라 언제든 달라질 수 있다. 값 비교는 항상 <code>==</code>, 싱글턴인 <code>None</code>과의 비교만 <code>is</code>를 쓴다.</p>
<h3>함수 인자 전달: 공유에 의한 호출</h3>
<p>Python은 값을 복사해 전달하지도(call by value), 변수 자체를 넘기지도(call by reference) 않는다. <strong>객체에 대한 참조를 전달</strong>해, 함수의 매개변수가 같은 객체를 가리키게 한다. 그래서</p>
<ul><li>함수 안에서 가변 객체를 <strong>변경</strong>하면(<code>x.append(1)</code>) 호출한 쪽에서도 보인다.</li>
<li>함수 안에서 매개변수에 <strong>새 객체를 대입</strong>하면(<code>x = x + [1]</code>) 지역 이름표만 옮겨 붙으므로 호출한 쪽은 그대로다.</li></ul>
<h3>속성 조회의 순서</h3>
<p><code>obj.attr</code>은 대략 인스턴스의 <code>__dict__</code> → 클래스 → MRO를 따라 상위 클래스 순으로 찾는다. 단, 클래스에 정의된 <strong>디스크립터</strong>(<code>__get__</code>을 가진 객체)는 이 과정에 끼어들 수 있다. <code>@property</code>, 메서드가 <code>self</code>를 자동으로 받는 것(바운드 메서드), <code>@classmethod</code>가 모두 디스크립터로 구현된다. <code>__slots__</code>를 정의하면 인스턴스마다 <code>__dict__</code>를 만들지 않아 수많은 작은 객체의 메모리를 줄일 수 있다.</p>
<h3>모든 것이 객체인 대가</h3>
<p>정수 하나도 참조 카운트와 타입 포인터를 담은 헤더를 가진 객체라, 64비트 CPython에서 작은 <code>int</code> 하나가 28바이트다(8바이트 값 하나에 비해 큼). 리스트는 이 객체들을 가리키는 포인터 배열이다. numpy 배열이 같은 데이터를 훨씬 적은 메모리로, 훨씬 빠르게 다루는 이유가 여기에 있다.</p>`,
    analogy: R`<p>변수는 <strong>포스트잇</strong>이다. <code>a = [1, 2, 3]</code>은 상자(객체)에 "a"라고 쓴 포스트잇을 붙이는 것이고, <code>b = a</code>는 같은 상자에 "b" 포스트잇을 하나 더 붙이는 것이다. 상자 안에 물건을 넣으면(<code>append</code>) 어느 포스트잇으로 찾아가도 바뀐 상자가 보인다. 함수에 인자를 넘기는 것은 상자를 복사해 주는 게 아니라, 같은 상자에 함수용 포스트잇을 하나 더 붙여 주는 것이다.</p>`,
    diagram: { caption: '이름은 객체를 가리키는 참조일 뿐이다. b = a 이후 a와 b는 같은 리스트 객체를 가리키므로, 한쪽으로 변경하면 다른 쪽에서도 보인다.', svg: R`
<svg viewBox="0 0 520 180" width="520">
<text x="70" y="14" class="sm">이름공간 (이름 → 참조)</text><text x="370" y="14" class="sm">객체 (힙)</text>
<rect class="n" x="40" y="30" width="60" height="30" rx="5"/><text x="70" y="45">a</text>
<rect class="n" x="40" y="75" width="60" height="30" rx="5"/><text x="70" y="90">b</text>
<rect class="n" x="40" y="120" width="60" height="30" rx="5"/><text x="70" y="135">c</text>
<rect class="h" x="270" y="40" width="200" height="50" rx="6"/><text x="370" y="56" class="sm">list  id=0x7f…a0</text><text x="370" y="74" class="sm">[1, 2, 3, 4]</text>
<rect class="n" x="270" y="115" width="200" height="40" rx="6"/><text x="370" y="135" class="sm">int  1000</text>
<path class="ha" d="M100,45 L268,58"/><path class="ha" d="M100,90 L268,76"/><path class="a" d="M100,135 H268"/>
<text x="185" y="170" class="sm">b = a 는 복사가 아니라 이름을 하나 더 붙인 것</text>
</svg>` },
    code: R`
import sys

a = [1, 2, 3]
b = a                                   # 같은 객체에 이름 하나 더
b.append(4)
print("a:", a, "| a is b:", a is b, "| id 같음:", id(a) == id(b))
c = [1, 2, 3, 4]
print("a == c:", a == c, "| a is c:", a is c)          # 값은 같지만 다른 객체

def mutate(x):
  x.append("변경")                    # 같은 객체를 변경 → 호출한 쪽에서도 보인다
def rebind(x):
  x = x + ["새 객체"]                 # 지역 이름표만 새 객체로 옮김 → 밖은 그대로

data = [0]
mutate(data); rebind(data)
print("공유에 의한 호출:", data)

print("type(1):", type(1), "| type(int):", type(int), "| type(type):", type(type))
print("int 1의 크기:", sys.getsizeof(1), "바이트 (값 + 객체 헤더)")

class Point:
  kind = "2D"                          # 클래스 속성
  def __init__(self, x): self.x = x    # 인스턴스 속성
p = Point(3)
print("인스턴스 __dict__:", p.__dict__, "| p.kind는 클래스에서 찾음:", p.kind)
p.kind = "custom"                        # 인스턴스에 같은 이름을 만들면 그쪽이 먼저 보인다
print("가림:", p.kind, "/ 클래스는 그대로:", Point.kind)

class Slim:
  __slots__ = ("x",)                   # 인스턴스 __dict__를 만들지 않는다
  def __init__(self, x): self.x = x
print("__dict__ 크기 + 객체:", sys.getsizeof(Point(1)) + sys.getsizeof(Point(1).__dict__),
    "바이트 / __slots__ 객체:", sys.getsizeof(Slim(1)), "바이트")
`,
    links: [
      { to: 'pl-mutable', why: '이름표 모델 위에서 가변·불변이 만드는 차이' },
      { to: 'pl-copy', why: '대입은 복사가 아니다 — 진짜 복사가 필요할 때' },
      { to: 'pl-memory', why: '객체 헤더의 참조 카운트와 메모리 해제' },
      { to: 'ds-array', why: 'list는 객체 포인터의 배열, numpy는 값의 배열' },
      { to: 'pl-oop', why: '클래스·인스턴스·MRO와 속성 조회' },
    ],
    quiz: [
      { q: '<code>a = [1, 2]; b = a; b.append(3)</code> 후 <code>print(a)</code>의 결과와 그 이유는?',
        options: ['[1, 2] — b = a가 리스트를 새로 복사해 b에 담으므로', '[1, 2, 3] — b = a는 같은 리스트에 이름을 하나 더 붙인 것이므로', '[1, 2] — append는 b의 지역 사본에만 원소를 추가하므로', '[1, 2, 3, 3] — a와 b에 각각 3이 한 번씩 추가되므로'], answer: 1,
        explain: '독립적인 사본이 필요하면 a.copy()나 list(a)로 새 객체를 만든다(중첩 구조라면 깊은 복사).' },
      { q: '<code>def f(x): x = x + [1]</code>를 <code>f(data)</code>로 호출해도 data가 바뀌지 않는 이유는?',
        options: ['Python은 인자를 넘길 때 항상 객체 전체를 복사해 전달하기 때문', 'x + [1]은 새 리스트를 만들고 x = …는 지역 이름만 그쪽으로 옮겨서', '함수 안에서 리스트를 바꾸려면 global 선언이 반드시 필요하기 때문', '리스트 인자는 함수 안에서 읽기 전용 튜플로 바뀌어 전달되기 때문'], answer: 1,
        explain: '같은 객체를 변경하는 x.append(1)이나 x += [1](리스트에서는 제자리 확장)이었다면 data도 바뀐다.' },
      { q: '값이 같은지 비교할 때 <code>is</code> 대신 <code>==</code>를 써야 하는 이유는?',
        options: ['is는 객체의 모든 속성을 하나씩 비교하므로 큰 객체에서 훨씬 느려서', 'is는 같은 객체인지 묻는데, 같은 값이 같은 객체일지는 구현에 따라 달라서', '==는 타입이 달라도 값을 변환해 비교하므로 is보다 더 많은 경우를 잡아서', 'is는 숫자와 문자열에만 쓸 수 있고 리스트·딕셔너리에는 오류가 나서'], answer: 1,
        explain: '예외는 None처럼 하나만 존재하도록 보장된 싱글턴과의 비교다(x is None).' },
    ],
    resources: ['Luciano Ramalho, 『전문가를 위한 파이썬』 6장 — 객체 참조, 가변성, 재활용', 'Ned Batchelder, "Facts and Myths about Python Names and Values" (PyCon 2015)', 'Python 공식 문서 — Data model: Objects, values and types / Descriptor HowTo Guide'],
  },
  {
    id: 'pl-mutable', title: '가변 객체와 불변 객체',
    summary: R`제자리 변경 가능(list·dict·set) vs 불가(int·str·tuple)
이 차이가 해시 가능 여부·기본 인자 버그·공유 부작용을 결정`,
    body: R`
<h3>불변 객체에서 "바꾸기"란 새 객체 만들기</h3>
<p><code>x = 1; x += 1</code>에서 정수 객체 1이 2로 바뀌는 것이 아니다. 새 정수 객체 2가 만들어지고 이름 x가 그쪽으로 옮겨 붙는다. 문자열의 <code>upper()</code>, <code>replace()</code>도 모두 새 문자열을 돌려준다. 반면 리스트의 <code>append</code>, 딕셔너리 항목 대입은 <strong>같은 객체를 제자리에서</strong> 바꾼다.</p>
<h3>+= 은 타입마다 의미가 다르다</h3>
<p><code>a += b</code>는 먼저 <code>__iadd__</code>(제자리 연산)를 찾고, 없으면 <code>a = a + b</code>로 처리한다. 리스트는 <code>__iadd__</code>가 있어 <strong>제자리 확장</strong>(extend)이고, 정수·문자열·튜플은 없어서 새 객체를 만든다. 그래서 리스트에 다른 이름이 붙어 있으면 <code>a += [3]</code>은 그 이름에서도 보이지만, <code>a = a + [3]</code>은 보이지 않는다.</p>
<h3>불변 컨테이너 안의 가변 객체</h3>
<p>튜플은 불변이지만, 튜플이 담은 것은 <strong>객체에 대한 참조</strong>다. 참조 자체는 바꿀 수 없어도 참조된 리스트의 내용은 바꿀 수 있다. 그래서 <code>(1, [2])</code>는 해시할 수 없다(내용이 바뀌면 해시가 바뀔 수 있으므로). 유명한 퍼즐로, <code>t = (1, [2]); t[1] += [3]</code>은 TypeError를 내면서도 리스트는 이미 <code>[2, 3]</code>으로 바뀌어 있다. 리스트의 제자리 확장은 성공하고, 그 결과를 튜플 칸에 다시 대입하는 단계에서 실패하기 때문이다.</p>
<h3>해시 가능성</h3>
<p>딕셔너리 키와 집합 원소는 해시 가능해야 한다. 해시 테이블은 "같은 객체는 언제나 같은 해시"를 전제로 하는데, 값이 바뀔 수 있는 객체는 이를 보장할 수 없다. 그래서 리스트는 키가 될 수 없고, 같은 내용을 키로 쓰려면 튜플이나 frozenset으로 바꾼다.</p>
<h3>기본 인자 함정</h3>
<p><code>def add(item, bucket=[])</code>의 기본값 <code>[]</code>은 함수가 <strong>정의될 때 한 번</strong> 만들어져 모든 호출이 공유한다. 호출할 때마다 새 리스트가 생길 것이라 기대하면 이전 호출의 값이 남아 있는 버그가 된다. 가변 기본값이 필요하면 <code>None</code>을 기본값으로 두고 함수 안에서 새로 만든다.</p>
<h3>문자열 연결과 성능</h3>
<p>불변 문자열에 루프로 <code>s += piece</code>를 하면 원칙적으로 매번 새 문자열을 만들고 지금까지의 내용을 복사하므로 총 $O(n^2)$이 될 수 있다. CPython은 일부 상황에서 이를 최적화하지만 보장되지 않으므로, 조각을 리스트에 모았다가 <code>''.join(pieces)</code>로 한 번에 합치는 것이 표준 방법이다.</p>
<h3>불변의 장점</h3>
<p>불변 객체는 공유해도 안전하다. 함수에 넘겨도 바뀔 걱정이 없고, 여러 스레드가 동시에 읽어도 동기화가 필요 없으며, 해시 키로 쓸 수 있고, 코드의 동작을 추론하기 쉽다. 그래서 설정값이나 값 객체에는 <code>@dataclass(frozen=True)</code>, <code>NamedTuple</code>처럼 불변 구조를 쓰는 경우가 많다.</p>`,
    analogy: R`<p>불변 객체는 <strong>인쇄된 책</strong>, 가변 객체는 <strong>화이트보드</strong>다. 책의 오타를 고치려면 새 판을 찍어야 하고(새 객체), 기존 책을 가진 사람의 책은 그대로다. 화이트보드는 그 자리에서 고치므로, 같은 화이트보드를 보는 모든 사람이 바뀐 내용을 본다. 기본 인자 함정은 회의실에 걸린 화이트보드 하나를 "회의마다 새 칠판"이라고 착각하고 쓰는 것과 같다.</p>`,
    diagram: { caption: '불변인 int의 += 는 새 객체를 만들고 이름을 옮긴다. 가변인 list의 += 는 같은 객체를 제자리에서 확장한다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<text x="135" y="14">x = 1; x += 1  (int: 불변)</text>
<rect class="n" x="20" y="45" width="50" height="30" rx="5"/><text x="45" y="60">x</text>
<rect class="g" x="150" y="30" width="90" height="30" rx="5"/><text x="195" y="45" class="sm">int 1 (그대로)</text>
<rect class="h" x="150" y="80" width="90" height="30" rx="5"/><text x="195" y="95" class="sm">int 2 (새 객체)</text>
<path class="a d" d="M70,55 L148,46"/><path class="ha" d="M70,65 L148,92"/>
<text x="135" y="130" class="sm">이름 x가 새 객체로 옮겨 붙음</text>
<path class="e d" d="M270,10 V190"/>
<text x="405" y="14">lst += [3]  (list: 가변)</text>
<rect class="n" x="290" y="45" width="50" height="30" rx="5"/><text x="315" y="60">lst</text>
<rect class="n" x="290" y="95" width="50" height="30" rx="5"/><text x="315" y="110">alias</text>
<rect class="h" x="400" y="60" width="120" height="44" rx="6"/><text x="460" y="75" class="sm">list (같은 id)</text><text x="460" y="92" class="sm">[1, 2] → [1, 2, 3]</text>
<path class="ha" d="M340,60 L398,75"/><path class="ha" d="M340,110 L398,92"/>
<text x="405" y="150" class="sm">제자리 변경 → alias에서도 보인다</text>
<text x="405" y="170" class="sm">(lst = lst + [3]이면 새 객체)</text>
</svg>` },
    code: R`
import time

x = 1; before = id(x); x += 1
print("int += → 새 객체:", id(x) != before)
s = "ab"; before = id(s); s += "c"
print("str += → 새 객체:", id(s) != before)

lst = [1, 2]; alias = lst
lst += [3]                              # list.__iadd__: 제자리 확장
print("list += :", alias, "| 같은 객체:", lst is alias)
lst = lst + [4]                         # 새 리스트를 만들어 이름만 옮김
print("list = list + … :", alias, "| 같은 객체:", lst is alias)

t = (1, [2])
try:
  t[1] += [3]                         # 리스트 확장은 성공, 튜플 칸 재대입에서 실패
except TypeError as e:
  print("TypeError:", e, "| 그런데 t =", t)
try:
  hash(t)
except TypeError as e:
  print("가변 객체를 담은 튜플은 해시 불가:", e)

def add_bad(item, bucket=[]):           # 기본값은 정의 시점에 한 번만 만들어진다
  bucket.append(item)
  return bucket
def add_good(item, bucket=None):
  if bucket is None:
      bucket = []                      # 호출마다 새 리스트
  bucket.append(item)
  return bucket
print("기본 인자 함정:", add_bad("a"), add_bad("b"), "/ 수정:", add_good("a"), add_good("b"))

pieces = ["x"] * 100_000
t0 = time.perf_counter()
out = ""
for p in pieces:
  out += p                            # 불변 문자열: 원칙적으로 매번 새 객체 (최적화는 보장 안 됨)
t1 = time.perf_counter()
joined = "".join(pieces)                # 한 번에 크기를 계산해 합친다
t2 = time.perf_counter()
print(f"+= 루프 {(t1 - t0) * 1e3:.1f}ms / join {(t2 - t1) * 1e3:.2f}ms, 결과 같음: {out == joined}")
`,
    links: [
      { to: 'pl-object', why: '변수는 이름표 — 불변 객체의 "변경"은 이름표를 옮기는 것' },
      { to: 'ds-hash', why: '해시 테이블 키가 불변이어야 하는 이유' },
      { to: 'pl-copy', why: '가변 객체를 안전하게 넘기려면 복사가 필요하다' },
      { to: 'pl-gil', why: '불변 객체는 스레드 간에 공유해도 안전하다' },
      { to: 'pl-scope', why: '기본 인자는 정의 시점에 평가된다 — 클로저의 늦은 바인딩과 대비' },
    ],
    quiz: [
      { q: '<code>a = [1]; b = a; a += [2]</code> 후 b는? 그리고 <code>a += [2]</code> 대신 <code>a = a + [2]</code>였다면?',
        options: ['둘 다 [1] — 정수·리스트 모두 +는 새 객체를 만들므로', '+= 이면 [1, 2], a = a + [2]이면 [1]', '둘 다 [1, 2] — a와 b가 같은 리스트를 가리키므로', '+= 이면 [1], a = a + [2]이면 [1, 2]'], answer: 1,
        explain: '리스트의 +=는 __iadd__로 같은 객체를 확장한다. 정수·문자열·튜플의 +=는 항상 새 객체를 만든다.' },
      { q: '<code>def f(x, acc=[]): acc.append(x); return acc</code>를 f(1), f(2) 순서로 호출하면 두 번째 결과는?',
        options: ['[2] — 호출할 때마다 기본값 리스트가 새로 만들어지므로', '[1, 2] — 기본값 리스트는 정의 시 한 번만 만들어져 공유되므로', '[2, 1] — append가 기본값 리스트의 앞쪽에 원소를 넣으므로', 'TypeError — 기본값으로 가변 객체를 쓸 수 없으므로'], answer: 1,
        explain: '가변 기본값 대신 None을 쓰고 함수 안에서 새 리스트를 만든다. 린터(pylint 등)가 경고하는 대표적인 버그다.' },
      { q: '튜플은 불변인데 <code>hash((1, [2]))</code>가 실패하는 이유는?',
        options: ['튜플은 불변이지만 해시를 지원하지 않는 자료형이라서', '튜플은 참조만 고정하고, 안의 리스트는 내용이 바뀔 수 있어서', '서로 다른 타입(int, list)이 섞인 튜플은 해시할 수 없어서', '원소가 2개 이상인 튜플은 해시값 계산이 정의되지 않아서'], answer: 1,
        explain: '튜플의 해시는 원소들의 해시로 계산하므로 모든 원소가 해시 가능해야 한다. (1, (2,))는 해시 가능하다.' },
    ],
    resources: ['Luciano Ramalho, 『전문가를 위한 파이썬』 6장 — 가변성, 기본 인자', 'Python 공식 문서 — Programming FAQ: "Why are default values shared between objects?"', 'Python 공식 문서 — Data model: __iadd__ 등 제자리 연산자'],
  },
  {
    id: 'pl-copy', title: '얕은 복사와 깊은 복사',
    summary: R`대입 ≠ 복사
얕은 복사: 바깥만 새로, 안쪽 객체는 <strong>공유</strong> / 깊은 복사: 끝까지 새로
numpy 슬라이스는 복사가 아닌 <strong>뷰</strong>`,
    body: R`
<h3>세 단계</h3>
<ul>
<li><strong>대입</strong>(<code>b = a</code>): 같은 객체. 아무것도 복사되지 않는다.</li>
<li><strong>얕은 복사</strong>(<code>a.copy()</code>, <code>list(a)</code>, <code>a[:]</code>, <code>dict(d)</code>, <code>copy.copy(a)</code>): 새 바깥 컨테이너에 <strong>원래 원소들의 참조</strong>를 그대로 담는다. 원소가 불변(숫자, 문자열)이면 충분하지만, 원소가 리스트·딕셔너리 같은 가변 객체면 그 내부는 원본과 공유된다.</li>
<li><strong>깊은 복사</strong>(<code>copy.deepcopy(a)</code>): 안쪽 객체까지 재귀적으로 새로 만든다. 이미 복사한 객체를 기록(memo)해 두므로, 같은 객체를 두 번 참조하는 구조는 사본에서도 하나로 유지되고 순환 참조도 무한 루프 없이 처리된다.</li>
</ul>
<h3>대표적인 함정</h3>
<p><code>grid = [[0] * 3] * 3</code>은 3×3 격자처럼 보이지만, 바깥 <code>* 3</code>이 <strong>같은 행 리스트의 참조를 세 번</strong> 담는다. <code>grid[0][0] = 1</code>을 하면 세 행이 모두 바뀐다. 행마다 새 리스트를 만들려면 <code>[[0] * 3 for _ in range(3)]</code>을 쓴다. 안쪽의 <code>[0] * 3</code>은 괜찮은데, 0은 불변이라 공유해도 문제가 없기 때문이다.</p>
<p>2차원 리스트나 설정 딕셔너리를 <code>.copy()</code>로 복사한 뒤 안쪽을 수정하면 원본도 바뀐다. 중첩된 가변 구조를 독립적으로 바꾸려면 깊은 복사가 필요하다.</p>
<h3>깊은 복사의 비용과 한계</h3>
<p>깊은 복사는 구조 전체를 순회하므로 느리고 메모리를 많이 쓴다. 파일 핸들, 락, 소켓처럼 복사할 수 없거나 복사가 의미 없는 객체도 있다. 클래스는 <code>__copy__</code>·<code>__deepcopy__</code>로 복사 방식을 직접 정할 수 있다. 실무에서는 "필요한 부분만 새로 만드는" 설계(불변 구조, 함수가 입력을 수정하지 않고 새 값을 반환)가 무분별한 깊은 복사보다 낫다.</p>
<h3>numpy: 뷰와 복사</h3>
<p>numpy의 기본 슬라이싱(<code>a[1:3]</code>, <code>a[:, 0]</code>), <code>reshape</code>, 전치는 데이터를 복사하지 않고 <strong>같은 메모리를 다르게 보는 뷰</strong>를 만든다. 큰 배열을 다룰 때 빠르고 메모리를 아끼지만, 뷰를 수정하면 원본이 바뀐다. 반면 정수 배열이나 불리언 마스크로 인덱싱하는(fancy indexing) 경우는 <strong>복사본</strong>을 만든다. 확실히 독립적인 배열이 필요하면 <code>.copy()</code>를 쓰고, <code>np.shares_memory</code>로 공유 여부를 확인할 수 있다.</p>
<h3>데이터 분석·ML에서의 의미</h3>
<p>전처리 함수가 인자로 받은 배열이나 DataFrame을 제자리에서 수정하면, 호출한 쪽의 원본 데이터까지 몰래 바뀌는 버그가 생긴다. pandas의 <code>SettingWithCopyWarning</code>은 "지금 수정하는 것이 뷰인지 복사본인지 불분명하다"는 경고이며, pandas는 이 혼란을 없애기 위해 Copy-on-Write 방식(2.x에서 옵션으로 도입)으로 동작을 바꾸고 있다. PyTorch에서도 텐서 슬라이스는 뷰이고, 독립된 텐서가 필요하면 <code>.clone()</code>을 쓴다.</p>`,
    analogy: R`<p>폴더 복사. <strong>대입</strong>은 바탕화면에 같은 폴더의 바로가기를 하나 더 만드는 것. <strong>얕은 복사</strong>는 새 폴더를 만들었지만 그 안에 원본 파일들의 바로가기만 넣은 것 — 새 폴더의 파일을 열어 수정하면 원본 파일이 바뀐다. <strong>깊은 복사</strong>는 파일 내용까지 전부 새로 복사한 완전히 독립된 폴더다.</p>`,
    diagram: { caption: '대입은 같은 객체, 얕은 복사는 바깥만 새 객체(안쪽 리스트는 공유), 깊은 복사는 안쪽까지 모두 새 객체.', svg: R`
<svg viewBox="0 0 560 200" width="560">
<text x="95" y="14" class="sm">대입: b = a</text><text x="275" y="14" class="sm">얕은 복사: b = a.copy()</text><text x="460" y="14" class="sm">깊은 복사: deepcopy(a)</text>
<path class="e d" d="M185,8 V190 M368,8 V190"/>
<text x="25" y="50">a</text><text x="25" y="90">b</text>
<rect class="h" x="80" y="57" width="50" height="26" rx="4"/><text x="105" y="70" class="sm">[ , ]</text>
<path class="a" d="M35,52 L78,64"/><path class="a" d="M35,88 L78,76"/>
<rect class="n" x="60" y="140" width="45" height="22" rx="4"/><text x="82" y="151" class="sm">[1,2]</text>
<rect class="n" x="115" y="140" width="45" height="22" rx="4"/><text x="137" y="151" class="sm">[3,4]</text>
<path class="a" d="M100,83 L85,138"/><path class="a" d="M112,83 L132,138"/>
<text x="205" y="50">a</text><text x="205" y="90">b</text>
<rect class="n" x="240" y="37" width="50" height="26" rx="4"/><text x="265" y="50" class="sm">[ , ]</text>
<rect class="h" x="240" y="77" width="50" height="26" rx="4"/><text x="265" y="90" class="sm">[ , ]</text>
<path class="a" d="M215,50 H238"/><path class="a" d="M215,90 H238"/>
<rect class="n" x="225" y="140" width="45" height="22" rx="4"/><text x="247" y="151" class="sm">[1,2]</text>
<rect class="n" x="285" y="140" width="45" height="22" rx="4"/><text x="307" y="151" class="sm">[3,4]</text>
<path class="a" d="M262,63 L250,138"/><path class="a" d="M272,63 L300,138"/>
<path class="ha" d="M258,103 L248,138"/><path class="ha" d="M275,103 L303,138"/>
<text x="275" y="182" class="sm">안쪽 리스트는 공유</text>
<text x="385" y="50">a</text><text x="385" y="90">b</text>
<rect class="n" x="425" y="37" width="50" height="26" rx="4"/><text x="450" y="50" class="sm">[ , ]</text>
<rect class="h" x="425" y="77" width="50" height="26" rx="4"/><text x="450" y="90" class="sm">[ , ]</text>
<path class="a" d="M395,50 H423"/><path class="a" d="M395,90 H423"/>
<rect class="n" x="378" y="140" width="38" height="22" rx="4"/><text x="397" y="151" class="sm">[1,2]</text>
<rect class="n" x="420" y="140" width="38" height="22" rx="4"/><text x="439" y="151" class="sm">[3,4]</text>
<rect class="h" x="468" y="140" width="38" height="22" rx="4"/><text x="487" y="151" class="sm">[1,2]</text>
<rect class="h" x="510" y="140" width="38" height="22" rx="4"/><text x="529" y="151" class="sm">[3,4]</text>
<path class="a" d="M445,63 L400,138"/><path class="a" d="M450,63 L440,138"/>
<path class="ha" d="M450,103 L487,138"/><path class="ha" d="M458,103 L527,138"/>
<text x="460" y="182" class="sm">모두 새 객체</text>
</svg>` },
    code: R`
import copy
import numpy as np

grid = [[0] * 3] * 3                    # 같은 행 리스트의 참조 3개!
grid[0][0] = 1
print("곱하기로 만든 격자:", grid)
grid = [[0] * 3 for _ in range(3)]      # 행마다 새 리스트
grid[0][0] = 1
print("컴프리헨션 격자  :", grid)

a = [[1, 2], [3, 4]]
shallow, deep = a.copy(), copy.deepcopy(a)
shallow[0].append(99)                    # 안쪽 리스트는 원본과 공유
deep[1].append(77)                       # 완전히 독립
print("원본:", a, "| 얕은:", shallow, "| 깊은:", deep)
print("안쪽 공유? 얕은:", a[0] is shallow[0], "/ 깊은:", a[0] is deep[0])

node = {"name": "A"}
node["self"] = node                      # 순환 참조
clone = copy.deepcopy(node)              # memo 덕분에 무한 루프 없이 복사
print("순환 구조 깊은 복사:", clone["self"] is clone, "| 원본과 분리:", clone is not node)

arr = np.arange(6)
view = arr[1:4]                          # 기본 슬라이싱 = 뷰 (메모리 공유)
view[0] = 100
fancy = arr[[1, 2, 3]]                   # 정수 배열 인덱싱 = 복사본
fancy[1] = -1
print("numpy 원본:", arr)
print("뷰 공유:", np.shares_memory(arr, view), "/ fancy 공유:", np.shares_memory(arr, fancy))
`,
    links: [
      { to: 'pl-object', why: '대입은 이름을 하나 더 붙이는 것' },
      { to: 'pl-mutable', why: '공유가 문제가 되는 것은 가변 객체일 때뿐' },
      { to: 'pl-memory', why: '깊은 복사는 메모리를 두 배로 쓴다 / 순환 참조' },
      { to: 'ds-array', why: 'numpy 뷰: 같은 메모리를 strides로 다르게 보기' },
      { to: 'ml-feature', why: '전처리 함수가 원본 데이터를 몰래 바꾸는 버그' },
    ],
    quiz: [
      { q: '<code>grid = [[0] * 3] * 3; grid[0][0] = 1</code> 후 grid는?',
        options: ['[[1, 0, 0], [0, 0, 0], [0, 0, 0]] — 첫 행만 바뀐다', '[[1, 0, 0], [1, 0, 0], [1, 0, 0]] — 세 행이 같은 리스트다', '[[1, 1, 1], [0, 0, 0], [0, 0, 0]] — [0] * 3이 같은 0을 공유한다', '[[1, 1, 1], [1, 1, 1], [1, 1, 1]] — 모든 칸이 같은 객체다'], answer: 1,
        explain: '리스트에 * n을 하면 원소의 참조가 반복된다. 원소가 가변이면 컴프리헨션으로 매번 새로 만든다.' },
      { q: '<code>b = a.copy()</code>로 2차원 리스트 a를 복사한 뒤 <code>b[0].append(5)</code>를 하면?',
        options: ['a는 그대로다 — copy()가 안쪽 리스트까지 모두 새로 만들므로', 'a[0]에도 5가 추가된다 — 얕은 복사라 안쪽 리스트는 공유되므로', 'a의 모든 행에 5가 추가된다 — 행들이 같은 객체를 공유하므로', 'a는 그대로다 — append는 바깥 리스트에만 영향을 주므로'], answer: 1,
        explain: 'b[0] = [9]처럼 바깥 칸에 새 객체를 대입하는 것은 a에 영향이 없다. 안쪽 객체를 변경할 때만 공유가 드러난다.' },
      { q: 'numpy에서 <code>sub = arr[10:20]; sub[:] = 0</code>을 하면 arr는?',
        options: ['그대로다 — numpy 슬라이스는 항상 새 배열을 복사해 만들므로', 'arr[10:20]이 0으로 바뀐다 — 기본 슬라이싱은 같은 메모리를 보는 뷰이므로', 'arr 전체가 0이 된다 — sub[:]가 원본 배열 전체를 가리키므로', '그대로다 — sub[:] = 0은 sub라는 이름에 새 배열을 대입할 뿐이므로'], answer: 1,
        explain: '뷰는 대용량 데이터를 복사 없이 다루게 해 주지만 의도치 않은 원본 수정의 원인이 된다. 독립 배열이 필요하면 arr[10:20].copy().' },
    ],
    resources: ['Python 공식 문서 — copy 모듈 (Shallow and deep copy operations)', 'NumPy 문서 — Copies and views', 'pandas 문서 — Copy-on-Write (CoW)'],
  },
  {
    id: 'pl-scope', title: '스코프와 클로저',
    summary: R`이름 찾는 순서: <strong>LEGB</strong>, 코드를 작성한 위치로 결정
클로저: 정의된 환경의 변수를 기억하는 함수`,
    body: R`
<h3>LEGB: 안쪽에서 바깥쪽으로</h3>
<p>이름을 만나면 Python은 <strong>L</strong>ocal(현재 함수) → <strong>E</strong>nclosing(감싸는 함수들) → <strong>G</strong>lobal(모듈) → <strong>B</strong>uiltins(<code>print</code>, <code>len</code> 등) 순서로 찾는다. 처음 발견된 곳의 값을 쓴다. 그래서 모듈에서 <code>list = [1, 2]</code>처럼 내장 이름을 덮어쓰면, 그 모듈에서는 <code>list(...)</code>가 더 이상 내장 함수가 아니게 된다(가리기, shadowing).</p>
<h3>스코프는 컴파일 시점에 정해진다</h3>
<p>Python은 함수 본문을 컴파일할 때, 함수 안 <strong>어디서든</strong> 대입되는 이름을 그 함수의 지역 변수로 정한다. 그래서 다음 코드는 오류다.</p>
<pre><code>count = 0
def inc():
  count += 1   # UnboundLocalError</code></pre>
<p><code>count += 1</code>이 대입이므로 count는 inc의 지역 변수로 결정되고, 지역 count에 아직 값이 없는 상태에서 읽으려 하기 때문이다. 바깥 변수를 다시 바인딩하려면 의도를 선언해야 한다: 모듈 변수는 <code>global</code>, 감싸는 함수의 변수는 <code>nonlocal</code>. 읽기만 한다면 선언 없이 바깥 변수를 쓸 수 있다.</p>
<h3>클로저: 환경을 기억하는 함수</h3>
<p>함수 안에서 정의된 함수가 바깥 함수의 지역 변수(자유 변수)를 참조하면, 바깥 함수가 반환된 뒤에도 그 변수는 사라지지 않는다. Python은 그런 변수를 <strong>셀(cell)</strong> 객체에 담아 안쪽 함수의 <code>__closure__</code>에 붙여 둔다. 이렇게 "함수 + 그 함수가 정의될 때의 환경"을 클로저라고 한다.</p>
<ul><li><strong>팩토리</strong>: <code>make_multiplier(3)</code>이 "3을 곱하는 함수"를 만든다.</li>
<li><strong>상태를 가진 함수</strong>: <code>nonlocal</code>로 카운터, 누적 평균을 구현한다. 클래스로 상태와 행동을 묶는 것과 같은 일을 더 가볍게 한다.</li>
<li><strong>데코레이터</strong>: 원래 함수를 기억하는 래퍼 함수가 바로 클로저다.</li></ul>
<h3>늦은 바인딩 함정</h3>
<p>클로저는 변수의 <strong>값이 아니라 변수 자체(셀)</strong>를 기억하고, 값은 <strong>호출될 때</strong> 읽는다. 그래서 <code>[lambda: i for i in range(3)]</code>로 만든 세 함수는 모두 같은 i를 보고, 호출 시점의 i(마지막 값 2)를 돌려준다. 정의 시점의 값을 고정하려면 기본 인자(<code>lambda i=i: i</code>, 기본값은 정의 시점에 평가됨)나 <code>functools.partial</code>을 쓴다. 콜백이나 버튼 핸들러를 루프에서 만들 때 흔히 걸리는 버그다.</p>`,
    analogy: R`<p>클로저는 <strong>배낭을 멘 함수</strong>다. 함수가 태어난 집(바깥 함수)을 떠날 때, 거기서 쓰던 물건(변수)을 배낭(셀)에 넣어 가지고 나간다. 집이 사라져도 배낭 속 물건은 계속 쓸 수 있다. 다만 배낭에 든 것은 사진이 아니라 <strong>물건 자체</strong>라서, 누가 그 물건을 바꾸면 나중에 꺼내 볼 때 바뀐 상태로 보인다(늦은 바인딩).</p>`,
    diagram: { caption: 'LEGB 규칙. 이름은 안쪽 스코프에서 바깥쪽으로 찾으며, 처음 발견한 곳의 값을 쓴다.', svg: R`
<svg viewBox="0 0 540 210" width="540">
<rect class="g" x="10" y="10" width="520" height="190" rx="8"/><text x="20" y="24" class="st sm">Builtins: print, len, list, …</text>
<rect class="n" x="30" y="35" width="480" height="140" rx="8"/><text x="40" y="49" class="st sm">Global (모듈): x = "G"</text>
<rect class="n" x="50" y="60" width="440" height="95" rx="8"/><text x="60" y="74" class="st sm">Enclosing (outer 함수): x = "E"</text>
<rect class="h" x="70" y="85" width="200" height="55" rx="8"/><text x="80" y="99" class="st sm">Local (inner 함수)</text><text x="80" y="120" class="st sm">print(x)  → "E"</text>
<path class="ha" d="M270,112 H300"/><text x="390" y="104" class="sm">① L에 없음 → ② E에서 발견</text>
<text x="390" y="124" class="sm">(못 찾으면 ③ G → ④ B)</text>
<text x="270" y="190" class="sm">스코프는 코드가 '쓰인 위치'로 정해진다 (렉시컬 스코프)</text>
</svg>` },
    code: R`
from functools import partial

count = 0
def inc_bad():
  count += 1                        # 대입이 있으므로 count는 지역 변수로 결정됨
try:
  inc_bad()
except UnboundLocalError as e:
  print("UnboundLocalError:", e)

def make_counter():
  n = 0
  def counter():
      nonlocal n                    # 감싸는 함수의 n을 다시 바인딩하겠다는 선언
      n += 1
      return n
  return counter

c1, c2 = make_counter(), make_counter()
print("카운터:", c1(), c1(), c1(), "| 독립된 다른 카운터:", c2())
print("클로저 셀:", c1.__code__.co_freevars, [cell.cell_contents for cell in c1.__closure__])

def make_multiplier(k):
  return lambda x: x * k            # k를 기억하는 함수 팩토리
triple = make_multiplier(3)
print("triple(5) =", triple(5))

late = [lambda: i for i in range(3)]               # 모두 같은 i를 보고 호출 시점에 읽음
fixed = [lambda i=i: i for i in range(3)]          # 기본 인자는 정의 시점에 평가
via_partial = [partial(lambda i: i, i) for i in range(3)]
print("늦은 바인딩:", [f() for f in late], "| 기본 인자:", [f() for f in fixed],
    "| partial:", [f() for f in via_partial])

list_ = list                          # (비교용으로 내장 함수 보관)
list = [1, 2]                         # 내장 이름을 가림
try:
  list("abc")
except TypeError as e:
  print("내장 이름 가리기:", e)
del list                              # 모듈의 이름을 지우면 다시 내장 list가 보인다
print("복구:", list("abc") == list_("abc"))
`,
    links: [
      { to: 'pl-decorator', why: '데코레이터의 래퍼 함수는 원래 함수를 기억하는 클로저' },
      { to: 'pl-mutable', why: '기본 인자는 정의 시점에 평가된다' },
      { to: 'pl-object', why: '이름공간은 이름 → 객체 참조의 딕셔너리' },
      { to: 'pl-memory', why: '클로저가 붙잡은 큰 객체는 해제되지 않는다' },
      { to: 'ds-stack-queue', why: '함수 호출과 지역 변수는 콜 스택 프레임에 있다' },
    ],
    quiz: [
      { q: '전역 변수 count를 함수 안에서 <code>count += 1</code> 하면 UnboundLocalError가 나는 이유는?',
        options: ['함수 안에서는 전역 변수를 읽는 것 자체가 금지되어 있기 때문', '함수 안에 대입이 있어 count가 지역 변수로 정해졌는데 값 없이 읽어서', '+= 는 전역 변수에 쓸 수 없고 반드시 count = count + 1로 써야 해서', 'count가 정수라 불변이므로 함수 안에서 바꾸려 하면 오류가 나서'], answer: 1,
        explain: 'global count 선언이 필요하다. 읽기만 하면(print(count)) 선언 없이도 LEGB로 전역 값을 찾는다.' },
      { q: '<code>fs = [lambda: i for i in range(3)]; [f() for f in fs]</code>의 결과는?',
        options: ['[0, 1, 2] — 람다가 만들어질 때의 i 값을 각각 기억하므로', '[2, 2, 2] — 클로저는 변수를 기억하고 호출 시점의 i를 읽으므로', '[3, 3, 3] — range가 끝난 뒤 i가 하나 더 증가해 3이 되므로', 'NameError — 컴프리헨션이 끝나면 i가 사라져 찾을 수 없으므로'], answer: 1,
        explain: '루프에서 콜백을 만들 때 흔한 버그다. lambda i=i: i나 functools.partial로 정의 시점의 값을 고정한다.' },
      { q: 'make_counter()가 반환된 뒤에도 안쪽 counter 함수가 n을 계속 증가시킬 수 있는 이유는?',
        options: ['n이 반환 시점에 전역 변수로 승격되어 모듈 이름 공간에 저장되어서', 'n이 안쪽 함수의 클로저 셀에 보관되어, 바깥 실행이 끝나도 유지되어서', '바깥 함수의 스택 프레임이 다시 호출될 때까지 메모리에 그대로 남아서', 'counter 함수가 처음 정의될 때 n의 값을 복사해 자기 속성에 담아 두어서'], answer: 1,
        explain: 'make_counter()를 두 번 호출하면 각각 별도의 셀을 가진 독립적인 카운터가 생긴다.' },
    ],
    resources: ['Luciano Ramalho, 『전문가를 위한 파이썬』 9장 — 데코레이터와 클로저', 'Python 공식 문서 — Execution model: Naming and binding', 'Python 공식 문서 — Programming FAQ: "Why do lambdas defined in a loop with different values all return the same result?"'],
  },
  {
    id: 'pl-generator', title: '이터레이터와 제너레이터',
    summary: R`for문의 실체 = 이터레이터 프로토콜(__iter__/__next__)
제너레이터: yield에서 멈췄다 이어 실행 → 값을 <strong>필요할 때 하나씩</strong>(메모리 절약)`,
    body: R`
<h3>이터러블과 이터레이터</h3>
<p><strong>이터러블</strong>은 <code>iter()</code>를 호출하면 이터레이터를 돌려주는 객체(리스트, 문자열, 딕셔너리, 파일 등)다. <strong>이터레이터</strong>는 <code>next()</code>를 호출할 때마다 다음 값을 주고, 더 없으면 <code>StopIteration</code>을 일으키는 객체다. 이터레이터는 <strong>현재 위치라는 상태</strong>를 가지므로 한 번 끝까지 가면 소진된다. <code>for x in data:</code>는 내부적으로 <code>it = iter(data)</code> 후 <code>StopIteration</code>이 날 때까지 <code>next(it)</code>를 반복하는 것이다. 리스트는 매번 새 이터레이터를 만들어 여러 번 순회할 수 있다.</p>
<h3>제너레이터: 멈췄다 재개되는 함수</h3>
<p>함수 본문에 <code>yield</code>가 있으면 그 함수는 호출해도 <strong>바로 실행되지 않고</strong> 제너레이터 객체를 반환한다. <code>next()</code>를 부를 때마다 다음 <code>yield</code>까지 실행하고 값을 내준 뒤 <strong>멈춘다</strong>. 이때 지역 변수와 실행 위치(프레임)가 그대로 보존되어, 다음 <code>next()</code>에서 바로 그 지점부터 이어진다. 함수가 끝나면 <code>StopIteration</code>이 발생한다. 이터레이터 클래스를 직접 만들 때 필요한 상태 관리 코드를 Python이 대신 해 주는 것이다.</p>
<h3>왜 쓰는가: 지연 평가</h3>
<ul>
<li><strong>메모리</strong>: 100만 개 원소의 리스트는 100만 개를 모두 메모리에 올리지만, 제너레이터는 지금 만들 하나만 다룬다. 크기와 무관하게 메모리가 일정하다.</li>
<li><strong>무한 시퀀스</strong>: 끝이 없는 ID 생성, 실시간 스트림을 자연스럽게 표현한다.</li>
<li><strong>파이프라인</strong>: "파일 줄 읽기 → 필터 → 변환 → 집계"를 제너레이터로 연결하면, 데이터가 한 줄씩 파이프를 통과한다. 수 GB 로그도 메모리 걱정 없이 처리한다. 첫 결과가 바로 나오는 것도 장점이다.</li>
</ul>
<p>제너레이터 표현식 <code>(x * x for x in data)</code>은 리스트 컴프리헨션의 지연 버전이고, <code>sum(x * x for x in data)</code>처럼 쓰면 중간 리스트를 만들지 않는다. <code>itertools</code>(<code>islice</code>, <code>chain</code>, <code>groupby</code>, <code>batched</code> 등)는 이터레이터를 조합하는 도구 모음이다.</p>
<h3>주의: 한 번만 순회된다</h3>
<p>제너레이터를 변수에 담아 두고 두 번 쓰면 두 번째는 비어 있다. <code>gen = (x for x in data); sum(gen); sum(gen)</code>의 두 번째 결과는 0이다. 여러 번 써야 하면 리스트로 만들거나 매번 제너레이터를 새로 만든다. 길이(<code>len</code>)나 인덱싱도 없다.</p>
<h3>더 나아가</h3>
<p><code>yield from 다른_이터러블</code>은 하위 제너레이터에 일을 위임한다. 제너레이터는 <code>send()</code>로 값을 받을 수도 있어 "중간에 멈추고 바깥과 대화하는 함수", 즉 코루틴이 된다. 이 아이디어가 발전한 것이 <code>async</code>/<code>await</code>다. ML에서는 디스크에 다 올라가지 않는 데이터셋을 배치 단위로 읽어 학습에 공급할 때 이 패턴을 쓴다.</p>`,
    analogy: R`<p>리스트는 <strong>미리 다 만들어 둔 뷔페</strong>, 제너레이터는 <strong>주문하면 하나씩 만들어 주는 요리사</strong>다. 뷔페는 처음에 모든 음식을 진열할 공간(메모리)이 필요하지만, 요리사는 "다음 요리요"(next) 할 때만 만들고 그 사이에는 손을 멈추고 기다린다. 어디까지 만들었는지는 기억한다(상태 보존). 다만 한 번 낸 요리를 다시 내달라고 할 수는 없다(한 번만 순회).</p>`,
    diagram: { caption: '제너레이터 실행 흐름. next()를 부를 때마다 다음 yield까지 실행하고, 지역 변수와 실행 위치를 보존한 채 멈춘다.', svg: R`
<svg viewBox="0 0 540 175" width="540">
<text x="60" y="26" class="sm">호출자 (for 문)</text><text x="60" y="152" class="sm">제너레이터</text>
<path class="e" d="M20,40 H525"/><path class="e d" d="M20,130 H525"/>
<path class="a" d="M60,45 L90,125"/><text x="64" y="80" class="en sm">next()</text>
<path class="he" d="M90,130 H150"/>
<path class="ha" d="M150,125 L180,45"/><text x="176" y="80" class="st sm">yield 1</text>
<text x="215" y="118" class="sm">멈춤: 상태 보존</text>
<path class="a" d="M250,45 L280,125"/><text x="254" y="80" class="en sm">next()</text>
<path class="he" d="M280,130 H330"/>
<path class="ha" d="M330,125 L360,45"/><text x="356" y="80" class="st sm">yield 2</text>
<path class="a" d="M420,45 L450,125"/><text x="441" y="80" class="st sm">next()</text>
<path class="he" d="M450,130 H490"/>
<path class="a" d="M490,125 L515,45"/><text x="490" y="22" class="sm">StopIteration</text>
</svg>` },
    code: R`
import sys
from itertools import islice

class Countdown:                               # 이터레이터 프로토콜을 직접 구현
  def __init__(self, start): self.n = start
  def __iter__(self): return self
  def __next__(self):
      if self.n <= 0:
          raise StopIteration
      self.n -= 1
      return self.n + 1
print("Countdown:", list(Countdown(3)))

def countdown(n):                              # 같은 일을 제너레이터로: 상태 관리는 Python이 한다
  print("  (시작)")
  while n > 0:
      yield n                                # 값을 내주고 여기서 멈춘다
      print(f"  (재개, n={n})")
      n -= 1
gen = countdown(2)
print("호출 직후에는 실행 안 됨:", type(gen).__name__)
print("next →", next(gen))
print("next →", next(gen))
print("남은 것:", list(gen))

squares_list = [x * x for x in range(1_000_000)]
squares_gen = (x * x for x in range(1_000_000))
print(f"리스트 {sys.getsizeof(squares_list):,}바이트 / 제너레이터 {sys.getsizeof(squares_gen)}바이트")
print("합계 같음:", sum(squares_list) == sum(squares_gen), "| 두 번째 sum(squares_gen):", sum(squares_gen))

def naturals():                                # 무한 시퀀스
  n = 1
  while True:
      yield n
      n += 1

def batches(iterable, size):                   # 대용량 데이터를 배치 단위로 공급하는 패턴
  it = iter(iterable)
  while batch := list(islice(it, size)):
      yield batch

lines = (f"user{i},{i % 7}" for i in range(10))                  # 파일 줄 읽기 대신
parsed = (line.split(",") for line in lines)                     # 변환
active = (name for name, score in parsed if int(score) >= 3)     # 필터
print("파이프라인:", list(batches(active, 2)))
print("무한 시퀀스 앞 5개:", list(islice(naturals(), 5)))
`,
    links: [
      { to: 'os-io', why: 'async/await는 제너레이터에서 발전한 코루틴' },
      { to: 'pl-scope', why: '멈춘 제너레이터는 프레임(지역 변수)을 보존한다' },
      { to: 'pl-memory', why: '지연 평가로 메모리 사용량을 일정하게 유지' },
      { to: 'ds-stack-queue', why: '호출 프레임과 실행 위치의 보존' },
      { to: 'ml-feature', why: '대용량 데이터를 스트리밍으로 전처리하기' },
    ],
    quiz: [
      { q: '<code>gen = (x for x in range(5)); a = sum(gen); b = sum(gen)</code>일 때 b는?',
        options: ['10 — 제너레이터는 sum이 끝날 때마다 처음으로 되감기므로', '0 — 제너레이터는 첫 sum에서 소진되어 남은 값이 없으므로', 'StopIteration 예외 — 이미 소진된 제너레이터를 다시 순회하므로', '20 — 두 번째 sum이 첫 결과에 이어서 누적되므로'], answer: 1,
        explain: '리스트는 순회할 때마다 새 이터레이터를 만들지만, 제너레이터 객체는 그 자체가 이터레이터다.' },
      { q: '10GB 로그 파일을 줄 단위 제너레이터 파이프라인으로 처리할 때 메모리를 적게 쓰는 이유는?',
        options: ['제너레이터는 읽은 데이터를 자동으로 압축해 메모리에 보관하므로', '각 단계가 값을 필요할 때 하나씩 만들어 넘겨 전체를 올리지 않으므로', '제너레이터는 파일을 메모리 매핑해 운영체제가 페이지를 관리하므로', '파이프라인의 단계마다 별도 프로세스가 떠서 메모리가 나뉘므로'], answer: 1,
        explain: '파이프라인 전체에서 동시에 메모리에 있는 것은 처리 중인 몇 줄뿐이다.' },
      { q: '함수 본문에 yield가 있는 함수를 호출하면 무슨 일이 일어나는가?',
        options: ['첫 yield까지 즉시 실행되고, 그 값과 함께 제너레이터가 반환된다', '본문은 실행되지 않고 제너레이터 객체가 반환되며, next() 때 실행된다', '함수 전체가 실행된 뒤 yield한 값들이 리스트로 모여 반환된다', '본문이 별도 스레드에서 시작되고 값이 준비될 때마다 큐에 쌓인다'], answer: 1,
        explain: '그래서 제너레이터 함수 안의 인자 검사 오류도 첫 next() 때에야 드러난다.' },
    ],
    resources: ['Luciano Ramalho, 『전문가를 위한 파이썬』 17장 — 이터레이터, 제너레이터, 고전적 코루틴', 'David Beazley, "Generator Tricks for Systems Programmers" (PyCon 2008 자료, 무료)', 'Python 공식 문서 — itertools, Iterator types'],
  },
  {
    id: 'pl-decorator', title: '데코레이터',
    summary: R`함수를 받아 새 함수를 돌려주는 함수, <code>@deco</code> = <code>f = deco(f)</code>
로깅·캐싱·재시도처럼 <strong>본 로직과 무관한 공통 기능</strong> 분리`,
    body: R`
<h3>함수는 일급 객체</h3>
<p>Python의 함수는 변수에 담고, 인자로 넘기고, 다른 함수에서 반환할 수 있는 객체다. 그래서 "함수를 받아 기능을 덧붙인 새 함수를 돌려주는 함수"를 만들 수 있다. 덧붙인 함수(래퍼)는 원래 함수를 기억하는 <strong>클로저</strong>다.</p>
<h3>@ 문법의 정체</h3>
<pre><code>@timer
def train(): ...</code></pre>
<p>는 정확히 <code>train = timer(train)</code>과 같다. 이름 train이 이제 원래 함수가 아니라 timer가 돌려준 래퍼를 가리킨다. 이 대입은 <strong>함수가 정의되는 순간</strong>(모듈을 import할 때) 실행된다. 그래서 데코레이터는 Flask의 <code>@app.get("/users")</code>처럼 함수를 어딘가에 <strong>등록</strong>하는 용도로도 쓰인다.</p>
<h3>functools.wraps를 잊지 말 것</h3>
<p>래퍼로 바꿔치기하면 함수의 <code>__name__</code>, docstring, 시그니처가 래퍼의 것으로 바뀐다. 로그, 디버거, 문서 생성 도구, 그리고 함수 이름이나 시그니처를 보고 동작하는 프레임워크(FastAPI, pytest)가 엉뚱하게 동작할 수 있다. 래퍼에 <code>@functools.wraps(func)</code>를 붙이면 원래 함수의 정보를 복사해 준다.</p>
<h3>인자를 받는 데코레이터</h3>
<p><code>@retry(times=3)</code>는 먼저 <code>retry(times=3)</code>을 호출하고, 그 결과(진짜 데코레이터)를 함수에 적용한다. 그래서 함수가 세 겹으로 중첩된다: 설정을 받는 함수 → 데코레이터 → 래퍼.</p>
<h3>여러 개 쌓기</h3>
<pre><code>@a
@b
def f(): ...</code></pre>
<p>는 <code>f = a(b(f))</code>다. 함수에 <strong>가까운 b가 먼저</strong> 적용되고, 호출할 때는 <strong>바깥인 a의 래퍼부터</strong> 실행된다. 인증 검사와 캐싱을 쌓을 때 순서를 잘못 정하면 "인증 없이 캐시된 결과를 반환"하는 보안 버그가 될 수 있다.</p>
<h3>자주 쓰는 데코레이터</h3>
<ul>
<li><code>@functools.lru_cache</code>/<code>@cache</code>: 인자별 결과를 기억(메모이제이션). 인자는 해시 가능해야 하고, 캐시가 객체를 붙잡으므로 메모리 증가에 주의.</li>
<li><code>@property</code>, <code>@staticmethod</code>, <code>@classmethod</code>: 클래스 안의 함수가 어떻게 동작할지 바꾼다(디스크립터).</li>
<li><code>@dataclass</code>: 클래스 데코레이터 — 클래스를 받아 메서드를 추가한 클래스를 돌려준다.</li>
<li>프레임워크: <code>@app.get</code>(웹 라우팅), <code>@pytest.fixture</code>, <code>@torch.no_grad()</code>(그래디언트 추적 끄기, 컨텍스트 매니저로도 쓰임).</li>
</ul>`,
    analogy: R`<p>선물 포장. 선물(원래 함수)은 그대로 두고 그 위에 포장지(래퍼)를 씌운다. 받는 사람(호출자)은 포장을 먼저 만나고(전처리: 카드 읽기), 포장을 풀어 선물을 꺼내고(원래 함수 실행), 포장지를 정리한다(후처리). 포장을 여러 겹 하면 마지막에 싼 것이 가장 먼저 풀린다(쌓기 순서). 포장 겉면에 원래 선물 이름표를 붙여 두는 것이 <code>functools.wraps</code>다.</p>`,
    diagram: { caption: '데코레이터가 돌려준 래퍼가 원래 함수를 감싼다. 호출하면 래퍼의 전처리 → 원래 함수 → 래퍼의 후처리 순으로 실행된다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<rect class="h" x="20" y="40" width="500" height="120" rx="10" style="fill-opacity:.5"/>
<text x="34" y="58" class="st sm">wrapper (클로저: func를 기억)</text>
<rect class="n" x="40" y="80" width="120" height="50" rx="6"/><text x="100" y="98" class="sm">① 전처리</text><text x="100" y="114" class="sm">시작 시간 기록</text>
<rect class="n" x="210" y="75" width="120" height="60" rx="6"/><text x="270" y="97">② func(*args)</text><text x="270" y="117" class="sm">원래 함수</text>
<rect class="n" x="380" y="80" width="120" height="50" rx="6"/><text x="440" y="98" class="sm">③ 후처리</text><text x="440" y="114" class="sm">경과 시간 출력</text>
<path class="a" d="M160,105 H208"/><path class="a" d="M330,105 H378"/>
<text x="270" y="20" class="sm">train(…) 호출 → 실제로는 wrapper(…)가 실행됨</text>
<text x="270" y="185" class="sm">@timer 는 train = timer(train) — 이름이 래퍼를 가리키게 된다</text>
</svg>` },
    code: R`
import functools, time

def timer(func):
  @functools.wraps(func)                       # 이름·docstring을 원래 함수 것으로 유지
  def wrapper(*args, **kwargs):
      t0 = time.perf_counter()                 # ① 전처리
      result = func(*args, **kwargs)           # ② 원래 함수
      print(f"  [{func.__name__}] {(time.perf_counter() - t0) * 1e3:.1f}ms")   # ③ 후처리
      return result
  return wrapper

@timer
def train(epochs):
  """모델을 학습한다."""
  time.sleep(0.01 * epochs)
  return "done"
print(train(3), "| 이름:", train.__name__, "| doc:", train.__doc__)

def retry(times):                                # 인자를 받는 데코레이터 = 데코레이터를 반환하는 함수
  def decorator(func):
      @functools.wraps(func)
      def wrapper(*args, **kwargs):
          for attempt in range(1, times + 1):
              try:
                  return func(*args, **kwargs)
              except ConnectionError as e:
                  print(f"  시도 {attempt} 실패: {e}")
          raise RuntimeError("재시도 횟수 초과")
      return wrapper
  return decorator

calls = {"n": 0}
@retry(times=3)
def flaky_api():
  calls["n"] += 1
  if calls["n"] < 3:
      raise ConnectionError("일시적 네트워크 오류")
  return "응답 OK"
print(flaky_api())

def tag(name):
  def decorator(func):
      @functools.wraps(func)
      def wrapper():
          print(f"  {name} 시작")
          func()
          print(f"  {name} 끝")
      return wrapper
  return decorator

@tag("바깥 A")
@tag("안쪽 B")                                   # f = A(B(f)): B가 먼저 적용, 실행은 A부터
def work():
  print("    본 작업")
work()

REGISTRY = []
def register(func):                              # 정의되는 순간(import 시점) 실행된다
  REGISTRY.append(func.__name__)
  return func
@register
def handler_a(): pass
@register
def handler_b(): pass
print("등록된 핸들러:", REGISTRY)

@functools.lru_cache(maxsize=None)
def fib(n):
  return n if n < 2 else fib(n - 1) + fib(n - 2)
print("fib(80) =", fib(80), "|", fib.cache_info())
`,
    links: [
      { to: 'pl-scope', why: '래퍼는 원래 함수를 기억하는 클로저' },
      { to: 'ds-dp', why: 'lru_cache = 메모이제이션' },
      { to: 'pl-solid', why: '데코레이터로 함수를 등록하는 개방-폐쇄 설계' },
      { to: 'se-pattern', why: '래퍼로 기능을 덧붙이는 데코레이터 패턴(객체지향 버전)' },
      { to: 'net-http', why: '웹 프레임워크의 @app.get 라우팅과 인증 데코레이터' },
    ],
    quiz: [
      { q: '<code>@deco</code>를 붙인 함수 정의 <code>def f(): ...</code>와 정확히 같은 코드는?',
        options: ['f = deco', 'def f(): ... 후 f = deco(f)', 'def f(): ... 후 f = deco(f())', 'f를 호출할 때마다 deco(f)()'], answer: 1,
        explain: '데코레이터는 정의 직후 한 번 호출되고, 그 반환값이 이름 f에 바인딩된다. 그래서 데코레이터 본문은 import 시점에 실행된다.' },
      { q: '래퍼 함수에 <code>@functools.wraps(func)</code>를 붙이지 않으면 생기는 문제는?',
        options: ['래퍼가 원래 함수를 호출하지 못해 데코레이터가 아무 일도 하지 않는다', '함수의 __name__·docstring·시그니처가 래퍼의 것으로 바뀐다', '래퍼가 매 호출마다 새로 만들어져 실행 속도가 크게 느려진다', '데코레이터를 두 개 이상 쌓을 수 없어 TypeError가 발생한다'], answer: 1,
        explain: '예: 모든 함수 이름이 "wrapper"로 찍히고, FastAPI 같은 프레임워크가 엔드포인트의 매개변수를 인식하지 못할 수 있다.' },
      { q: '<code>@a</code> 아래 <code>@b</code>를 붙인 함수 f를 호출할 때 래퍼가 실행되는 순서는?',
        options: ['b의 래퍼 → a의 래퍼 → f (가까운 b가 먼저 적용되므로)', 'a의 래퍼 → b의 래퍼 → f (f = a(b(f))이므로)', 'a의 래퍼 → f → b의 래퍼 (위아래로 감싸므로)', '정해져 있지 않다 (데코레이터 등록 순서에 따름)'], answer: 1,
        explain: '적용은 아래(가까운 것)부터, 실행은 위(바깥)부터다. 인증과 캐싱처럼 순서가 의미를 가지는 조합에 주의해야 한다.' },
    ],
    resources: ['Luciano Ramalho, 『전문가를 위한 파이썬』 9장 — 데코레이터와 클로저', 'Python 공식 문서 — functools (wraps, lru_cache, cache)', 'PEP 318 — Decorators for Functions and Methods'],
  },
  {
    id: 'pl-gil', title: 'GIL과 동시성',
    summary: R`CPython은 한 번에 <strong>한 스레드만</strong> 바이트코드 실행(GIL)
I/O 대기 작업 → 스레드 OK / CPU 계산 → 멀티프로세싱·numpy`,
    body: R`
<h3>GIL은 왜 있는가</h3>
<p>CPython은 모든 객체의 참조 카운트를 수시로 올리고 내린다. 여러 스레드가 동시에 이 값을 고치면 카운트가 틀어져 객체가 너무 일찍 해제되거나 영원히 남는다. 모든 객체에 개별 락을 다는 대신, 인터프리터 전체에 <strong>락 하나</strong>를 두어 한 번에 한 스레드만 바이트코드를 실행하게 한 것이 GIL이다. 단순하고, 단일 스레드 성능에 유리하며, C 확장 모듈을 작성하기 쉽게 해 준다.</p>
<h3>GIL은 언제 풀리는가</h3>
<ul>
<li><strong>블로킹 I/O</strong>(파일 읽기, 소켓 수신, <code>time.sleep</code>): 기다리는 동안 GIL을 놓는다. 그래서 I/O 대기는 여러 스레드가 겹쳐 진행할 수 있다.</li>
<li><strong>일정 간격</strong>: 계산 중인 스레드도 정해진 간격(<code>sys.getswitchinterval()</code>, 기본 5ms)마다 다른 스레드에게 넘길 기회를 준다. 번갈아 실행될 뿐 동시에 실행되지는 않는다.</li>
<li><strong>네이티브 코드</strong>: numpy의 큰 연산, <code>hashlib</code>의 큰 데이터 해시, 압축 등 C로 작성된 확장은 파이썬 객체를 건드리지 않는 계산 구간에서 GIL을 놓을 수 있다. 이때는 스레드가 진짜로 병렬 실행된다.</li>
</ul>
<h3>GIL은 스레드 안전을 보장하지 않는다</h3>
<p>GIL은 인터프리터 내부를 보호할 뿐이다. <code>count += 1</code>처럼 여러 바이트코드로 이뤄진 연산 사이에서 스레드가 바뀔 수 있으므로, 공유 데이터는 여전히 락으로 보호해야 한다.</p>
<h3>작업 종류별 선택</h3>
<table><tr><th>작업</th><th>도구</th><th>이유와 비용</th></tr>
<tr><td>I/O 대기가 많음 (API 호출, 파일, DB)</td><td><code>ThreadPoolExecutor</code></td><td>대기 중 GIL 해제. 기존 동기 코드를 그대로 쓸 수 있음</td></tr>
<tr><td>아주 많은 동시 연결</td><td><code>asyncio</code></td><td>스레드 하나의 이벤트 루프. 스레드보다 가볍지만 비동기 라이브러리가 필요</td></tr>
<tr><td>순수 파이썬 CPU 계산</td><td><code>ProcessPoolExecutor</code>, <code>multiprocessing</code></td><td>프로세스마다 별도 인터프리터와 GIL. 인자·결과 직렬화(pickle)와 프로세스 시작 비용</td></tr>
<tr><td>수치 계산</td><td>numpy 벡터화, Numba, Cython</td><td>계산을 네이티브 코드로 옮기면 GIL과 인터프리터 오버헤드를 동시에 피함</td></tr></table>
<h3>GIL 없는 Python</h3>
<p>PEP 703에 따라 Python 3.13부터 GIL을 끈 빌드(free-threaded)가 실험적으로 제공되기 시작했고, 이후 버전에서 지원이 확대되고 있다. 이 빌드에서는 순수 파이썬 스레드도 병렬로 실행되지만, 단일 스레드 성능 부담과 C 확장의 호환성 문제가 있어 생태계가 점진적으로 따라가는 중이다. 실행 중인 인터프리터의 상태는 <code>sys._is_gil_enabled()</code>(3.13+)로 확인할 수 있다.</p>`,
    analogy: R`<p>마이크가 하나뿐인 회의실. 여러 사람(스레드)이 있어도 <strong>마이크(GIL)를 쥔 사람만 말할 수 있다</strong>. 누군가 자료를 찾으러 나가면(I/O 대기) 마이크를 내려놓고 가므로 그동안 다른 사람이 말한다 — 그래서 자료 찾기가 많은 회의는 사람을 늘리면 빨라진다. 하지만 모두가 말만 해야 하는 회의(CPU 계산)는 사람을 늘려도 한 번에 한 명뿐이다. 그럴 때는 회의실을 여러 개 연다(멀티프로세싱).</p>`,
    diagram: { caption: '세 스레드의 실행. 한 순간에 GIL을 가진 스레드 하나만 바이트코드를 실행하지만, I/O 대기는 GIL 없이 다른 스레드와 겹쳐 진행된다.', svg: R`
<svg viewBox="0 0 540 180" width="540">
<text x="50" y="44" class="sm">스레드 1</text><text x="50" y="84" class="sm">스레드 2</text><text x="50" y="124" class="sm">스레드 3</text>
<rect class="h" x="100" y="30" width="60" height="28"/><rect class="g" x="160" y="30" width="120" height="28"/><rect class="h" x="280" y="30" width="60" height="28"/><rect class="g" x="340" y="30" width="180" height="28"/>
<rect class="g" x="100" y="70" width="60" height="28"/><rect class="h" x="160" y="70" width="60" height="28"/><rect class="n" x="220" y="70" width="180" height="28"/><text x="310" y="84" class="sm">I/O 대기 (GIL 없이 진행)</text><rect class="h" x="400" y="70" width="60" height="28"/><rect class="g" x="460" y="70" width="60" height="28"/>
<rect class="g" x="100" y="110" width="120" height="28"/><rect class="h" x="220" y="110" width="60" height="28"/><rect class="g" x="280" y="110" width="60" height="28"/><rect class="h" x="340" y="110" width="60" height="28"/><rect class="g" x="400" y="110" width="60" height="28"/><rect class="h" x="460" y="110" width="60" height="28"/>
<text x="290" y="162" class="sm">강조 = GIL 보유·바이트코드 실행 · 회색 = GIL 대기 · 흰색 = I/O 대기</text>
</svg>` },
    code: R`
import hashlib, sys, time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

DATA = b"x" * 30_000_000

def cpu_python(_):                     # 순수 파이썬 계산: GIL을 쥔 채 실행
  s = 0
  for i in range(3_000_000):
      s += i * i
  return s

def native_hash(_):                    # hashlib은 큰 데이터를 해시하는 동안 GIL을 놓는다
  return hashlib.sha256(DATA).hexdigest()

def run(executor_cls, fn, workers=4):
  t0 = time.perf_counter()
  with executor_cls(max_workers=workers) as ex:
      list(ex.map(fn, range(workers)))
  return time.perf_counter() - t0

def sequential(fn, n=4):
  t0 = time.perf_counter()
  for i in range(n):
      fn(i)
  return time.perf_counter() - t0

if __name__ == "__main__":             # ProcessPool은 이 가드가 필요하다
  gil = getattr(sys, "_is_gil_enabled", lambda: True)()
  print(f"GIL 활성: {gil} | 전환 간격: {sys.getswitchinterval() * 1000:.0f}ms")
  print(f"순수 파이썬 4개  순차 {sequential(cpu_python):.2f}s | 스레드 {run(ThreadPoolExecutor, cpu_python):.2f}s"
        f" | 프로세스 {run(ProcessPoolExecutor, cpu_python):.2f}s")
  print(f"네이티브 해시 4개 순차 {sequential(native_hash):.2f}s | 스레드 {run(ThreadPoolExecutor, native_hash):.2f}s")
`,
    links: [
      { to: 'os-thread', why: '스레드의 개념과 프로세스와의 차이' },
      { to: 'os-sync', why: 'GIL이 있어도 공유 데이터에는 락이 필요하다' },
      { to: 'os-io', why: 'I/O-bound 동시성: 스레드 vs asyncio' },
      { to: 'pl-memory', why: 'GIL이 보호하는 참조 카운트' },
      { to: 'ca-simd', why: 'numpy 벡터화: 계산을 네이티브 코드로 옮기는 방법' },
      { to: 'os-process', why: 'multiprocessing은 별도 프로세스 = 별도 인터프리터와 GIL' },
    ],
    quiz: [
      { q: 'CPython이 GIL을 두는 주된 이유는?',
        options: ['한 프로세스가 CPU 코어를 독점하지 못하게 운영체제와 약속한 규칙이라서', '참조 카운트 같은 인터프리터 내부 상태를 단순하게 보호하기 위해', '사용자 코드의 경쟁 상태를 막아 threading.Lock이 필요 없게 하려고', '파이썬 바이트코드를 코어마다 나눠 실행할 때 순서를 맞추기 위해'], answer: 1,
        explain: 'GIL은 인터프리터 구현을 위한 장치다. 사용자 코드의 경쟁 상태는 막지 못한다.' },
      { q: '웹 API 1,000개를 호출해 결과를 모으는 작업을 빠르게 하려 할 때 적절한 선택은?',
        options: ['ProcessPoolExecutor — 요청마다 코어를 하나씩 써서 병렬로 처리하려고', 'ThreadPoolExecutor나 asyncio — 대부분 응답 대기라 겹쳐 진행할 수 있으므로', '단일 스레드 순차 실행 — GIL 때문에 동시 실행은 오히려 느려지므로', 'multiprocessing + 공유 메모리 — 결과를 모으는 비용을 줄이려고'], answer: 1,
        explain: 'I/O-bound 작업에 프로세스를 쓰면 시작·직렬화 비용만 늘어난다. 동시 연결이 아주 많다면 asyncio가 더 가볍다.' },
      { q: 'numpy의 큰 행렬 연산이나 hashlib 해시를 여러 스레드로 나누면 빨라질 수 있는 이유는?',
        options: ['numpy를 import하면 그 프로세스의 GIL이 영구적으로 꺼지기 때문', 'C로 구현된 계산 구간에서 GIL을 놓아 다른 스레드가 실제로 병렬 실행되기 때문', '스레드가 numpy 함수를 부르면 내부적으로 자식 프로세스로 바뀌기 때문', 'numpy 배열은 불변 객체라 여러 스레드가 동시에 접근해도 안전하기 때문'], answer: 1,
        explain: '파이썬 객체를 건드리지 않는 네이티브 계산은 GIL이 필요 없다. 다만 numpy·BLAS가 이미 내부적으로 멀티스레드를 쓰는 경우도 있다.' },
    ],
    resources: ['David Beazley, "Understanding the Python GIL" (PyCon 2010)', 'PEP 703 — Making the Global Interpreter Lock Optional in CPython', 'Python 공식 문서 — concurrent.futures, Python support for free threading'],
  },
  {
    id: 'pl-memory', title: '메모리 관리: 참조 카운트와 GC',
    summary: R`<strong>참조 카운트</strong>로 대부분 즉시 해제
순환 참조는 세대별 GC가 정리
"메모리가 안 줄어요"의 원인: 남은 참조·할당자 캐시`,
    body: R`
<h3>참조 카운트: 즉시 해제</h3>
<p>모든 객체는 헤더에 "나를 가리키는 참조의 수"를 가진다. 이름에 대입하거나, 리스트에 넣거나, 함수 인자로 넘기면 1 증가하고, 이름이 사라지거나 다른 객체를 가리키게 되면 1 감소한다. <strong>0이 되는 순간 즉시</strong> 해제된다(<code>__del__</code> 호출, 메모리 반환). 그래서 CPython에서는 파일 객체가 마지막 참조를 잃는 순간 닫히는 등 해제 시점이 예측 가능하다(그래도 자원 정리는 <code>with</code>문으로 명시하는 것이 원칙이다).</p>
<p><code>del x</code>는 객체를 지우는 것이 아니라 <strong>이름 x를 지워 참조를 하나 줄이는 것</strong>이다. 다른 곳에서 그 객체를 참조하고 있으면 객체는 계속 살아 있다.</p>
<h3>순환 참조와 순환 GC</h3>
<p>부모 노드가 자식을, 자식이 부모를 가리키면, 바깥에서 둘을 가리키는 참조가 모두 사라져도 서로가 서로를 가리켜 카운트가 0이 되지 않는다. 참조 카운트만으로는 영원히 남는다. 이를 위해 CPython에는 <strong>순환 GC</strong>가 있다. 다른 객체를 담을 수 있는 컨테이너 객체들을 추적하다가, 외부에서 도달할 수 없는 순환 덩어리를 찾아 해제한다.</p>
<p>순환 GC는 <strong>세대별</strong>로 동작한다. "대부분의 객체는 금방 죽는다"는 관찰(세대 가설)에 따라, 새로 만든 객체를 자주 검사하고 오래 살아남은 객체는 드물게 검사해 비용을 줄인다(세대 수와 실행 임계값은 Python 버전에 따라 다르다). <code>gc.collect()</code>로 강제 실행할 수 있고, 매우 많은 객체를 한꺼번에 만드는 구간에서는 일시적으로 <code>gc.disable()</code>하기도 한다.</p>
<h3>약한 참조</h3>
<p><code>weakref</code>는 참조 카운트를 올리지 않는 참조다. 대상이 다른 이유로 해제되면 약한 참조는 <code>None</code>을 돌려준다. 캐시("다른 곳에서 쓰는 동안만 보관")나 자식이 부모를 가리키는 역방향 참조에 쓰면 객체 수명을 불필요하게 늘리거나 순환을 만드는 것을 피할 수 있다.</p>
<h3>메모리가 OS로 돌아가지 않는 이유</h3>
<p>작은 객체(512바이트 이하)는 <strong>pymalloc</strong>이 미리 받아 둔 큰 메모리 덩어리(아레나)를 잘게 나눠 쓴다. 객체가 해제되어도 그 공간은 다음 객체를 위해 Python 안에 남아 있을 수 있고, 아레나 전체가 비어야 OS에 반환된다. 그래서 큰 리스트를 지운 뒤에도 프로세스의 메모리 사용량(RSS)이 바로 줄지 않는 경우가 있다. 이것이 곧 메모리 누수를 뜻하지는 않는다.</p>
<h3>흔한 누수 패턴과 도구</h3>
<ul>
<li>계속 커지기만 하는 전역 캐시·리스트(크기 제한이 없는 <code>lru_cache(maxsize=None)</code> 포함).</li>
<li>콜백·클로저·이벤트 핸들러가 큰 객체를 붙잡고 있는 경우.</li>
<li>저장해 둔 예외의 traceback이 함수 프레임과 그 지역 변수 전체를 붙잡는 경우.</li>
</ul>
<p><code>tracemalloc</code>으로 어느 코드 줄에서 메모리를 할당했는지 추적하고, <code>gc.get_referrers</code>로 누가 객체를 붙잡고 있는지 찾는다.</p>
<h3>ML에서 자주 보는 사례</h3>
<p>PyTorch 학습 루프에서 <code>total_loss += loss</code>를 하면, loss 텐서가 계산 그래프 전체를 참조하고 있어서 매 반복의 그래프가 해제되지 않고 쌓인다. 숫자만 필요하면 <code>loss.item()</code>으로 파이썬 숫자를 꺼내야 한다. Jupyter에서는 출력 기록(<code>Out[n]</code>)과 마지막 결과(<code>_</code>)가 큰 객체의 참조를 남겨 GPU 메모리가 풀리지 않는 일도 흔하다.</p>`,
    analogy: R`<p>도서관 대출 카드. 책(객체)마다 "지금 이 책을 빌려 간 사람 수"(참조 카운트)가 적혀 있고, 마지막 사람이 반납하면 즉시 서고로 돌려보낸다(해제). 그런데 두 사람이 서로의 책을 상대방 이름으로 빌려 간 채 둘 다 이사 가 버리면(외부 참조 없음), 장부상으로는 여전히 대출 중이라 책이 돌아오지 않는다(순환 참조). 그래서 사서가 가끔 "실제로 연락되는 사람이 있는지" 장부를 훑어 회수한다(순환 GC).</p>`,
    diagram: { caption: '왼쪽: 참조 카운트가 0이 되는 즉시 해제된다. 오른쪽: 서로만 참조하는 순환은 카운트가 0이 되지 않아 순환 GC가 찾아서 회수한다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<text x="135" y="14" class="sm">참조 카운트</text><text x="405" y="14" class="sm">순환 참조</text>
<rect class="n" x="20" y="40" width="40" height="28" rx="4"/><text x="40" y="54">x</text>
<rect class="n" x="20" y="110" width="40" height="28" rx="4"/><text x="40" y="124">y</text>
<rect class="h" x="120" y="65" width="120" height="50" rx="6"/><text x="180" y="82" class="sm">list 객체</text><text x="180" y="100" class="sm">refcnt = 2</text>
<path class="a" d="M60,54 L118,80"/><path class="a" d="M60,124 L118,100"/>
<text x="135" y="155" class="sm">del x → 1, y = None → 0</text>
<text x="135" y="175" class="sm">0이 되는 순간 즉시 해제</text>
<path class="e d" d="M270,8 V195"/>
<rect class="h" x="295" y="55" width="90" height="46" rx="6"/><text x="340" y="71" class="sm">A</text><text x="340" y="88" class="sm">refcnt = 1</text>
<rect class="h" x="430" y="55" width="90" height="46" rx="6"/><text x="475" y="71" class="sm">B</text><text x="475" y="88" class="sm">refcnt = 1</text>
<path class="ha" d="M385,68 H428"/><path class="ha" d="M430,90 H387"/>
<rect class="g" x="300" y="140" width="40" height="26" rx="4"/><text x="320" y="153" class="sm">a</text>
<path class="a d" d="M320,140 L330,103"/><text x="330" y="122" class="sm">✗</text>
<text x="430" y="150" class="sm">a = None: 외부 참조 제거</text>
<text x="405" y="180" class="sm">서로만 참조 → 0이 안 됨 → 순환 GC가 회수</text>
</svg>` },
    code: R`
import gc, sys, tracemalloc, weakref

x = []
print("getrefcount (인자로 넘기며 +1 포함):", sys.getrefcount(x))
y = x
print("이름 하나 더:", sys.getrefcount(x))
del y                                         # 객체가 아니라 이름을 지움
print("del y 후:", sys.getrefcount(x))

class Node:
  def __init__(self, name): self.name, self.other = name, None
  def __del__(self): print(f"  {self.name} 해제됨")

print("참조 카운트가 0이 되면 즉시 해제:")
n = Node("단독")
n = None

print("순환 참조:")
gc.disable()                                  # 자동 순환 GC를 잠시 끄고 관찰
a, b = Node("A"), Node("B")
a.other, b.other = b, a                       # 서로를 가리킴
a = b = None                                  # 외부 참조를 모두 없애도…
print("  (아직 해제 안 됨)")
print("  gc.collect()가 회수한 객체 수 (A·B와 각자의 __dict__ 등 포함):", gc.collect())
gc.enable()

class Big:
  pass
obj = Big()
ref = weakref.ref(obj)                        # 참조 카운트를 올리지 않는 참조
print("약한 참조 살아 있음:", ref() is obj)
del obj
print("대상 해제 후 약한 참조:", ref())

tracemalloc.start()
leak = []
for i in range(100_000):
  leak.append(str(i) * 3)                   # 계속 커지기만 하는 리스트
snapshot = tracemalloc.take_snapshot()
top = snapshot.statistics("lineno")[0]
print(f"가장 많이 할당한 줄: {top.size / 1e6:.1f}MB, {top.count:,}개 블록 (line {top.traceback[0].lineno})")
tracemalloc.stop()
`,
    links: [
      { to: 'pl-object', why: '모든 객체 헤더에 참조 카운트가 있다' },
      { to: 'pl-gil', why: 'GIL이 존재하는 가장 큰 이유가 참조 카운트 보호' },
      { to: 'ds-graph', why: '순환 GC = 객체 그래프에서 도달 불가능한 사이클 찾기' },
      { to: 'os-vm', why: '프로세스 메모리와 OS로의 반환' },
      { to: 'dl-backprop', why: '손실 텐서가 계산 그래프를 붙잡는 메모리 문제' },
    ],
    quiz: [
      { q: 'CPython에서 서로를 참조하는 두 객체에 대한 외부 참조가 모두 사라졌다. 이 객체들을 정리하는 것은?',
        options: ['참조 카운트 — 외부 참조가 사라지는 순간 0이 되므로', '순환 GC — 카운트가 0이 안 되므로 도달 불가능한 순환을 찾아 해제한다', 'del 문 — 개발자가 각 객체를 명시적으로 지워야만 해제된다', '아무도 — 프로그램이 끝날 때까지 메모리에 남는다'], answer: 1,
        explain: '참조 카운트는 순환을 감지할 수 없다. weakref로 역방향 참조를 만들면 순환 자체를 피할 수 있다.' },
      { q: '<code>del data</code>를 실행했는데 메모리가 줄지 않았다. 가능한 설명으로 옳지 <strong>않은</strong> 것은?',
        options: ['다른 이름·리스트·클로저가 같은 객체를 아직 참조하고 있다', '해제된 작은 객체의 공간이 pymalloc 아레나에 남아 OS로 바로 돌아가지 않았다', 'del은 이름만 지우므로 다른 참조가 있으면 객체는 살아 있다', 'del은 객체를 스와프 영역으로 내보낼 뿐이라 메모리 사용량은 그대로다'], answer: 3,
        explain: 'del은 이름을 지울 뿐 객체를 스와프나 디스크로 옮기지 않는다. 나머지는 모두 실제로 흔한 원인이다.' },
      { q: 'PyTorch 학습 루프에서 <code>total_loss += loss</code>를 하면 메모리가 계속 증가하는 이유와 해결책은?',
        options: ['손실 값이 계속 커져 float이 넘친다 / 학습률을 낮춘다', 'loss 텐서가 계산 그래프를 붙잡아 쌓인다 / loss.item()으로 숫자만 더한다', 'GPU 캐시가 정리되지 않는다 / 매 반복 torch.cuda.empty_cache()를 부른다', '옵티마이저 상태가 쌓인다 / 매 반복 optimizer를 새로 만든다'], answer: 1,
        explain: '그래프를 붙잡는 참조가 남아 있으면 참조 카운트가 0이 되지 않는다. 기록용 값은 텐서가 아니라 파이썬 숫자로 저장한다. empty_cache()는 이미 해제된 캐시 블록만 돌려줄 뿐 참조 중인 그래프는 해제하지 못한다.' },
    ],
    resources: ['Python 공식 문서 — gc, weakref, tracemalloc 모듈', 'Python 개발자 가이드 — Garbage collector design (devguide.python.org)', 'Luciano Ramalho, 『전문가를 위한 파이썬』 6장 — del과 가비지 컬렉션, 약한 참조'],
  },
  { id:'pl-processor', title: '언어 처리기: 컴파일러·인터프리터' },
  { id:'pl-binding', title: '바인딩·자료형·매개변수 전달' },
  { id:'pl-c', title: 'C 코드 읽기: 포인터·배열·구조체' },
  { id:'pl-java', title: 'Java 코드 읽기: 클래스·상속·예외' },
];
