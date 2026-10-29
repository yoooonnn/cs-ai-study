TOPICS.pl = [
  {
    id: 'pl-oop', title: '객체지향의 핵심 개념', advanced: true,
    summary: R`데이터 + 행동을 묶고(<strong>캡슐화</strong>) 공통 인터페이스 뒤에서 구현 교체(<strong>다형성</strong>)
핵심은 상속이 아니라 불변식 보호`,
    body: R`
<h3>네 가지 특징</h3>
<table><tr><th>특징</th><th>뜻</th><th>대표 문법</th></tr>
<tr><td>캡슐화</td><td>데이터와 그 데이터를 다루는 메서드를 묶고, 내부를 숨긴다(정보 은닉)</td><td>private 필드, getter/setter, <code>@property</code></td></tr>
<tr><td>상속</td><td>부모의 속성·기능을 물려받아 재사용하고 확장한다(is-a)</td><td><code>extends</code>, <code>class B(A)</code></td></tr>
<tr><td>다형성</td><td>같은 메시지에 객체마다 다르게 반응한다</td><td>오버라이딩(실행 시 결정), 오버로딩(컴파일 시 결정)</td></tr>
<tr><td>추상화</td><td>공통된 핵심만 뽑아 모델링하고 세부는 감춘다</td><td>추상 클래스, 인터페이스</td></tr></table>
<h3>캡슐화: 불변식을 지키는 경계</h3>
<p>객체는 상태(데이터)와 그 상태를 바꾸는 행동(메서드)을 함께 가진다. 캡슐화의 진짜 목적은 "숨기기"가 아니라 <strong>불변식 보호</strong>다. 계좌의 잔액이 음수가 되면 안 된다면, 잔액은 검증하는 메서드를 통해서만 바뀌어야 한다. 그러면 잔액 규칙을 확인할 곳이 한 곳뿐이다.</p>
<p>Python은 접근 제어를 강제하지 않는다. 이름 앞의 <code>_</code>는 "내부용"이라는 관례이고, <code>__name</code>은 하위 클래스와의 이름 충돌을 피하기 위해 이름을 바꿔(name mangling) 저장할 뿐 진짜 비공개가 아니다. 대신 <code>@property</code>로 속성 접근처럼 보이는 검증 로직을 만들 수 있어, 처음에는 단순한 속성으로 시작했다가 나중에 검증을 추가해도 사용하는 코드를 바꿀 필요가 없다.</p>
<h3>다형성: 같은 메시지, 다른 동작</h3>
<p><code>model.predict(X)</code>를 호출하는 코드는 model이 선형 회귀인지 랜덤 포레스트인지 몰라도 된다. 실제로 어떤 메서드가 실행될지는 <strong>실행 시점에 객체의 실제 타입</strong>을 보고 정해진다(동적 디스패치). 그래서 새 모델을 추가해도 호출하는 쪽 코드를 고칠 필요가 없다. 다형성은 "변경할 부분과 고정된 부분을 나누는" 객체지향의 가장 강력한 도구다.</p>
<p>Python은 <strong>덕 타이핑</strong>을 쓴다: 필요한 메서드가 있으면 상속 관계와 무관하게 그 역할을 할 수 있다. <code>len(x)</code>는 x에 <code>__len__</code>이 있으면 동작하고, scikit-learn의 파이프라인은 <code>fit</code>·<code>transform</code>만 있으면 어떤 객체든 받아들인다. 명시적인 계약이 필요하면 <code>abc.ABC</code>(추상 메서드를 구현하지 않으면 인스턴스 생성 불가)나 <code>typing.Protocol</code>(구조적 타입 검사)을 쓴다.</p>
<!--diagram-->
<h3>상속: 강력하지만 가장 강한 결합</h3>
<p>상속은 코드 재사용과 "is-a" 관계를 표현하지만, 하위 클래스가 상위 클래스의 <strong>내부 구현</strong>에 의존하게 만든다. 상위 클래스를 고치면 모든 하위 클래스가 깨질 수 있다(깨지기 쉬운 기반 클래스 문제). 그래서 "상속보다 조합(composition)"이라는 격언이 있다: 다른 객체를 필드로 가지고 일을 맡기면(has-a), 그 부분만 다른 구현으로 바꿔 끼우기 쉽다.</p>
<h3>다중 상속과 MRO</h3>
<p>Python은 다중 상속을 지원한다. 메서드를 찾는 순서는 C3 선형화로 계산한 <strong>MRO(Method Resolution Order)</strong>를 따른다(<code>Class.__mro__</code>). <code>super()</code>는 "부모 클래스"가 아니라 <strong>MRO에서 다음 클래스</strong>를 가리킨다. 그래서 다이아몬드 상속에서도 각 클래스의 메서드가 한 번씩만 호출된다.</p>
<figure class="diagram"><svg viewBox="0 0 560 236" width="560"><path class="a" d="M74,97 L104,57"/><path class="a" d="M166,97 L136,57"/><path class="a" d="M106,177 L76,137"/><path class="a" d="M134,177 L164,137"/><circle class="n" cx="120" cy="36" r="22"/><text x="120" y="36">A</text><circle class="n" cx="60" cy="116" r="22"/><text x="60" y="116">B</text><circle class="n" cx="180" cy="116" r="22"/><text x="180" y="116">C</text><circle class="h" cx="120" cy="196" r="22"/><text x="120" y="196">D</text><text x="260" y="40" class="st"><tspan class="sm">L[A]</tspan>  = A, object</text><text x="260" y="70" class="st"><tspan class="sm">L[B]</tspan>  B + merge(L[A], [A]) = B, A, object</text><text x="260" y="100" class="st"><tspan class="sm">L[C]</tspan>  C + merge(L[A], [A]) = C, A, object</text><text x="260" y="130" class="st"><tspan class="sm">L[D]</tspan>  D + merge(L[B], L[C], [B, C])</text><text x="260" y="160" class="st">     = <tspan font-weight="700">D, B, C, A, object</tspan></text><text x="260" y="206" class="st sm">merge: 맨 앞 후보가 다른 목록의 꼬리에 없으면 꺼낸다</text></svg><figcaption>다이아몬드 상속 D(B, C)의 MRO를 C3 선형화로 계산한 결과. 자식이 부모보다 먼저, 괄호에 쓴 순서(B 다음 C)대로 오고, 공통 부모 A는 한 번만 마지막 쪽에 온다.</figcaption></figure>
<h3>Python 데이터 모델</h3>
<p><code>__len__</code>, <code>__eq__</code>, <code>__iter__</code>, <code>__getitem__</code>, <code>__add__</code> 같은 특수 메서드를 구현하면 내 객체가 <code>len()</code>, <code>==</code>, <code>for</code>, 인덱싱, <code>+</code> 같은 언어 문법과 자연스럽게 어울린다. numpy 배열과 PyTorch 텐서의 연산자도 이렇게 만들어진 것이다. <code>@dataclass</code>는 데이터 중심 클래스의 <code>__init__</code>·<code>__repr__</code>·<code>__eq__</code>를 자동으로 만들어 준다.</p>
<!--code-->`,
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
    points: [
      R`객체지향 4특징: 캡슐화(묶고 숨김), 상속(재사용·확장), 다형성(같은 메시지, 다른 동작), 추상화(핵심만 모델링)`,
      R`정보 은닉: 내부 구현을 감추고 공개된 인터페이스로만 접근. Java 접근 범위 private &lt; default &lt; protected &lt; public`,
      R`오버로딩: 같은 이름, 다른 매개변수, 컴파일 시 결정 / 오버라이딩: 자식이 같은 시그니처로 재정의, 실행 시 결정(동적 바인딩)`,
      R`is-a는 상속, has-a는 조합. 상속은 부모 구현에 강하게 묶이므로 상속보다 조합`,
      R`Python 다중 상속은 C3 선형화로 MRO를 정하고, super()는 MRO의 다음 클래스를 부른다`,
    ],
    interview: [
      { q: '캡슐화와 정보 은닉은 어떻게 다른가요?', a: R`<p>캡슐화는 데이터와 그 데이터를 다루는 메서드를 하나의 단위로 묶는 것이고, 정보 은닉은 그 단위의 내부 구현을 바깥에서 직접 건드리지 못하게 감추는 것이다. 은닉이 있어야 상태를 바꾸는 길이 메서드 하나로 모이고, 그 메서드에서 불변식(예: 잔액은 음수가 아님)을 검사할 수 있다.</p>` },
      { q: '다형성이 왜 중요한가요?', a: R`<p>호출하는 코드가 구체 타입이 아니라 공통 인터페이스에만 의존하게 해 준다. 실제로 실행될 메서드는 실행 시점에 객체의 실제 타입으로 정해지므로, 새 구현을 추가해도 호출하는 쪽을 고치지 않아도 된다. 개방-폐쇄 원칙이 가능한 이유다.</p>` },
      { q: '상속보다 조합을 권하는 이유는요?', a: R`<p>상속은 자식이 부모의 내부 구현에 의존하게 만들어, 부모를 고치면 자식이 깨질 수 있고 관계가 컴파일 시점에 고정된다. 조합은 다른 객체를 필드로 가지고 일을 맡기므로 결합이 느슨하고 실행 중에도 구현을 바꿔 끼울 수 있다. 진짜 is-a이고 부모의 계약을 그대로 지킬 때만 상속을 쓴다.</p>` },
    ],
    types: ['OOP'],
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
<!--diagram-->
<h3>원칙의 비용</h3>
<p>추상화는 공짜가 아니다. 구현이 하나뿐인데 인터페이스부터 만들면 코드만 복잡해진다(YAGNI: 지금 필요 없는 것은 만들지 않는다). 변경이 실제로 일어나는 지점, 두 번째 구현이 필요해진 시점에 원칙을 적용하는 것이 실용적이다. Python에서는 덕 타이핑과 <code>Protocol</code> 덕분에 무거운 인터페이스 계층 없이도 DIP를 가볍게 적용할 수 있다.</p>
<!--code-->`,
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
    points: [
      R`S 단일 책임: 클래스가 바뀔 이유는 하나뿐`,
      R`O 개방-폐쇄: 확장에는 열려 있고 수정에는 닫혀 있다(새 기능은 새 클래스로)`,
      R`L 리스코프 치환: 자식은 부모 자리에 넣어도 올바르게 동작해야 한다. 사전 조건 강화 X, 사후 조건 약화 X`,
      R`I 인터페이스 분리: 쓰지 않는 메서드에 의존하지 않도록 작은 인터페이스로`,
      R`D 의존 역전: 구체가 아니라 추상에 의존. 구현은 바깥에서 주입(DI)`,
    ],
    interview: [
      { q: 'SOLID 중 하나를 골라 예와 함께 설명해 주세요.', a: R`<p>개방-폐쇄 원칙을 예로 들면, 할인 정책이 추가될 때마다 if-elif를 고치는 대신 할인 정책 인터페이스를 두고 정책마다 클래스를 만든다. 새 정책은 새 클래스를 추가하는 것으로 끝나 기존에 검증된 코드를 건드리지 않는다. 이를 가능하게 하는 것이 다형성이다.</p>` },
      { q: '의존 역전 원칙과 의존성 주입은 같은 건가요?', a: R`<p>다르다. 의존 역전은 설계 원칙으로, 고수준 정책이 저수준 구현이 아니라 추상에 의존하도록 의존 방향을 뒤집으라는 것이다. 의존성 주입은 그 구현 기법으로, 객체가 필요한 구현을 스스로 만들지 않고 생성자나 인자로 바깥에서 받는 것이다. 주입을 쓰면 테스트에서 가짜 구현을 넣기 쉽다.</p>` },
    ],
    types: ['SOLID'],
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
<!--diagram-->
<h3>is와 ==</h3>
<p><code>a is b</code>는 <strong>같은 객체인가</strong>(정체성), <code>a == b</code>는 <strong>값이 같은가</strong>(<code>__eq__</code> 호출)다. CPython은 작은 정수(-5~256)와 일부 문자열을 미리 만들어 재사용하기 때문에 <code>is</code>로 값을 비교해도 우연히 맞을 때가 있지만, 이는 구현 세부라 언제든 달라질 수 있다. 값 비교는 항상 <code>==</code>, 싱글턴인 <code>None</code>과의 비교만 <code>is</code>를 쓴다.</p>
<h3>함수 인자 전달: 공유에 의한 호출</h3>
<p>Python은 값을 복사해 전달하지도(call by value), 변수 자체를 넘기지도(call by reference) 않는다. <strong>객체에 대한 참조를 전달</strong>해, 함수의 매개변수가 같은 객체를 가리키게 한다. 그래서</p>
<ul><li>함수 안에서 가변 객체를 <strong>변경</strong>하면(<code>x.append(1)</code>) 호출한 쪽에서도 보인다.</li>
<li>함수 안에서 매개변수에 <strong>새 객체를 대입</strong>하면(<code>x = x + [1]</code>) 지역 이름표만 옮겨 붙으므로 호출한 쪽은 그대로다.</li></ul>
<h3>속성 조회의 순서</h3>
<p><code>obj.attr</code>은 대략 인스턴스의 <code>__dict__</code> → 클래스 → MRO를 따라 상위 클래스 순으로 찾는다. 단, 클래스에 정의된 <strong>디스크립터</strong>(<code>__get__</code>을 가진 객체)는 이 과정에 끼어들 수 있다. <code>@property</code>, 메서드가 <code>self</code>를 자동으로 받는 것(바운드 메서드), <code>@classmethod</code>가 모두 디스크립터로 구현된다. <code>__slots__</code>를 정의하면 인스턴스마다 <code>__dict__</code>를 만들지 않아 수많은 작은 객체의 메모리를 줄일 수 있다.</p>
<h3>모든 것이 객체인 대가</h3>
<p>정수 하나도 참조 카운트와 타입 포인터를 담은 헤더를 가진 객체라, 64비트 CPython에서 작은 <code>int</code> 하나가 28바이트다(8바이트 값 하나에 비해 큼). 리스트는 이 객체들을 가리키는 포인터 배열이다. numpy 배열이 같은 데이터를 훨씬 적은 메모리로, 훨씬 빠르게 다루는 이유가 여기에 있다.</p>
<!--code-->`,
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
    points: [
      R`모든 객체 = 정체성(id) + 타입(type) + 값. 정체성과 타입은 바뀌지 않는다`,
      R`변수는 객체에 붙인 이름표. b = a는 복사가 아니라 같은 객체에 이름을 하나 더 붙이는 것`,
      R`is는 같은 객체인가, ==는 값이 같은가. None 비교만 is`,
      R`인자 전달: 객체 참조를 넘긴다(call by sharing). 변경은 공유되고, 재대입은 지역에서만`,
    ],
    interview: [
      { q: 'is와 ==의 차이는요?', a: R`<p>is는 두 이름이 같은 객체를 가리키는지(정체성)를 보고, ==는 __eq__를 불러 값이 같은지를 본다. 작은 정수나 일부 문자열은 CPython이 재사용해서 is가 우연히 참일 수 있지만 구현 세부라 믿으면 안 된다. 싱글턴인 None과 비교할 때만 is를 쓴다.</p>` },
      { q: 'Python의 인자 전달은 값 전달인가요, 참조 전달인가요?', a: R`<p>둘 다 아니고 객체 참조를 값으로 넘기는 공유에 의한 호출이다. 함수 안에서 리스트에 append하면 같은 객체를 바꾸므로 호출한 쪽에서도 보이지만, 매개변수에 새 리스트를 대입하면 지역 이름만 다른 객체로 옮겨 붙어 호출한 쪽은 그대로다.</p>` },
    ],
    types: ['Python 객체'],
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
<!--diagram-->
<h3>불변 컨테이너 안의 가변 객체</h3>
<p>튜플은 불변이지만, 튜플이 담은 것은 <strong>객체에 대한 참조</strong>다. 참조 자체는 바꿀 수 없어도 참조된 리스트의 내용은 바꿀 수 있다. 그래서 <code>(1, [2])</code>는 해시할 수 없다(내용이 바뀌면 해시가 바뀔 수 있으므로). 유명한 퍼즐로, <code>t = (1, [2]); t[1] += [3]</code>은 TypeError를 내면서도 리스트는 이미 <code>[2, 3]</code>으로 바뀌어 있다. 리스트의 제자리 확장은 성공하고, 그 결과를 튜플 칸에 다시 대입하는 단계에서 실패하기 때문이다.</p>
<h3>해시 가능성</h3>
<p>딕셔너리 키와 집합 원소는 해시 가능해야 한다. 해시 테이블은 "같은 객체는 언제나 같은 해시"를 전제로 하는데, 값이 바뀔 수 있는 객체는 이를 보장할 수 없다. 그래서 리스트는 키가 될 수 없고, 같은 내용을 키로 쓰려면 튜플이나 frozenset으로 바꾼다.</p>
<h3>기본 인자 함정</h3>
<p><code>def add(item, bucket=[])</code>의 기본값 <code>[]</code>은 함수가 <strong>정의될 때 한 번</strong> 만들어져 모든 호출이 공유한다. 호출할 때마다 새 리스트가 생길 것이라 기대하면 이전 호출의 값이 남아 있는 버그가 된다. 가변 기본값이 필요하면 <code>None</code>을 기본값으로 두고 함수 안에서 새로 만든다.</p>
<h3>문자열 연결과 성능</h3>
<p>불변 문자열에 루프로 <code>s += piece</code>를 하면 원칙적으로 매번 새 문자열을 만들고 지금까지의 내용을 복사하므로 총 $O(n^2)$이 될 수 있다. CPython은 일부 상황에서 이를 최적화하지만 보장되지 않으므로, 조각을 리스트에 모았다가 <code>''.join(pieces)</code>로 한 번에 합치는 것이 표준 방법이다.</p>
<h3>불변의 장점</h3>
<p>불변 객체는 공유해도 안전하다. 함수에 넘겨도 바뀔 걱정이 없고, 여러 스레드가 동시에 읽어도 동기화가 필요 없으며, 해시 키로 쓸 수 있고, 코드의 동작을 추론하기 쉽다. 그래서 설정값이나 값 객체에는 <code>@dataclass(frozen=True)</code>, <code>NamedTuple</code>처럼 불변 구조를 쓰는 경우가 많다.</p>
<!--code-->`,
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
    points: [
      R`불변: int, float, str, tuple, frozenset, bytes / 가변: list, dict, set, bytearray`,
      R`불변 객체를 "바꾸면" 새 객체가 생기고 이름이 옮겨 간다. list의 +=는 제자리 확장(__iadd__)`,
      R`딕셔너리 키·집합 원소는 해시 가능해야 한다. 리스트를 담은 튜플은 키가 될 수 없다`,
      R`가변 기본 인자는 정의 시점에 한 번만 만들어져 호출 사이에 공유된다. None으로 두고 안에서 생성`,
    ],
    interview: [
      { q: '리스트는 딕셔너리 키가 될 수 없는데 튜플은 되는 이유는요?', a: R`<p>해시 테이블은 같은 키가 언제나 같은 해시값을 가진다는 전제로 칸을 찾는다. 리스트는 내용이 바뀔 수 있어 해시가 바뀔 위험이 있으므로 해시를 제공하지 않는다. 튜플은 불변이라 해시할 수 있지만, 안에 리스트 같은 가변 객체가 들어 있으면 그 튜플도 해시할 수 없다.</p>` },
      { q: 'def f(x, acc=[]) 같은 코드가 왜 문제인가요?', a: R`<p>기본값은 함수가 정의될 때 한 번만 평가되므로, 모든 호출이 같은 리스트 객체를 공유한다. 이전 호출에서 넣은 값이 다음 호출에 남아 있게 된다. acc=None으로 두고 함수 안에서 None이면 새 리스트를 만드는 것이 관례다.</p>` },
    ],
    types: ['가변·불변'],
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
<!--diagram-->
<h3>대표적인 함정</h3>
<p><code>grid = [[0] * 3] * 3</code>은 3×3 격자처럼 보이지만, 바깥 <code>* 3</code>이 <strong>같은 행 리스트의 참조를 세 번</strong> 담는다. <code>grid[0][0] = 1</code>을 하면 세 행이 모두 바뀐다. 행마다 새 리스트를 만들려면 <code>[[0] * 3 for _ in range(3)]</code>을 쓴다. 안쪽의 <code>[0] * 3</code>은 괜찮은데, 0은 불변이라 공유해도 문제가 없기 때문이다.</p>
<p>2차원 리스트나 설정 딕셔너리를 <code>.copy()</code>로 복사한 뒤 안쪽을 수정하면 원본도 바뀐다. 중첩된 가변 구조를 독립적으로 바꾸려면 깊은 복사가 필요하다.</p>
<h3>깊은 복사의 비용과 한계</h3>
<p>깊은 복사는 구조 전체를 순회하므로 느리고 메모리를 많이 쓴다. 파일 핸들, 락, 소켓처럼 복사할 수 없거나 복사가 의미 없는 객체도 있다. 클래스는 <code>__copy__</code>·<code>__deepcopy__</code>로 복사 방식을 직접 정할 수 있다. 실무에서는 "필요한 부분만 새로 만드는" 설계(불변 구조, 함수가 입력을 수정하지 않고 새 값을 반환)가 무분별한 깊은 복사보다 낫다.</p>
<h3>numpy: 뷰와 복사</h3>
<p>numpy의 기본 슬라이싱(<code>a[1:3]</code>, <code>a[:, 0]</code>), <code>reshape</code>, 전치는 데이터를 복사하지 않고 <strong>같은 메모리를 다르게 보는 뷰</strong>를 만든다. 큰 배열을 다룰 때 빠르고 메모리를 아끼지만, 뷰를 수정하면 원본이 바뀐다. 반면 정수 배열이나 불리언 마스크로 인덱싱하는(fancy indexing) 경우는 <strong>복사본</strong>을 만든다. 확실히 독립적인 배열이 필요하면 <code>.copy()</code>를 쓰고, <code>np.shares_memory</code>로 공유 여부를 확인할 수 있다.</p>
<h3>데이터 분석·ML에서의 의미</h3>
<p>전처리 함수가 인자로 받은 배열이나 DataFrame을 제자리에서 수정하면, 호출한 쪽의 원본 데이터까지 몰래 바뀌는 버그가 생긴다. pandas의 <code>SettingWithCopyWarning</code>은 "지금 수정하는 것이 뷰인지 복사본인지 불분명하다"는 경고이며, pandas는 이 혼란을 없애기 위해 Copy-on-Write 방식으로 동작을 바꿨다(2.x에서 옵션으로 도입, 3.0부터 기본). PyTorch에서도 텐서 슬라이스는 뷰이고, 독립된 텐서가 필요하면 <code>.clone()</code>을 쓴다.</p>
<!--code-->`,
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
    points: [
      R`대입: 같은 객체 / 얕은 복사(copy, [:], list()): 바깥만 새로, 안쪽은 공유 / 깊은 복사(deepcopy): 끝까지 새로`,
      R`[[0] * 3] * 3은 같은 행을 세 번 참조. 행마다 새로 만들려면 컴프리헨션`,
      R`numpy 슬라이스·reshape·전치는 뷰(원본 공유), 정수 배열·불리언 마스크 인덱싱은 복사`,
    ],
    interview: [
      { q: '얕은 복사와 깊은 복사의 차이를 설명해 주세요.', a: R`<p>얕은 복사는 바깥 컨테이너만 새로 만들고 원소는 원래 객체의 참조를 그대로 담는다. 원소가 리스트 같은 가변 객체면 사본과 원본이 그 안쪽을 공유해, 한쪽에서 안쪽을 바꾸면 다른 쪽에도 보인다. 깊은 복사는 안쪽 객체까지 재귀적으로 새로 만들어 완전히 독립된 사본을 만들지만 느리고 메모리를 더 쓴다.</p>` },
    ],
    types: ['복사'],
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
<!--diagram-->
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
<p>클로저는 변수의 <strong>값이 아니라 변수 자체(셀)</strong>를 기억하고, 값은 <strong>호출될 때</strong> 읽는다. 그래서 <code>[lambda: i for i in range(3)]</code>로 만든 세 함수는 모두 같은 i를 보고, 호출 시점의 i(마지막 값 2)를 돌려준다. 정의 시점의 값을 고정하려면 기본 인자(<code>lambda i=i: i</code>, 기본값은 정의 시점에 평가됨)나 <code>functools.partial</code>을 쓴다. 콜백이나 버튼 핸들러를 루프에서 만들 때 흔히 걸리는 버그다.</p>
<!--code-->`,
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
    points: [
      R`LEGB: Local → Enclosing → Global → Builtins 순서로 이름을 찾는다`,
      R`함수 안 어디서든 대입하면 지역 변수. 대입 전에 읽으면 UnboundLocalError. global, nonlocal로 선언`,
      R`클로저 = 함수 + 정의될 때의 환경(자유 변수를 셀에 보관)`,
      R`늦은 바인딩: 클로저는 값이 아니라 변수를 기억하고 호출할 때 읽는다. 고정하려면 기본 인자 i=i`,
    ],
    interview: [
      { q: '클로저란 무엇이고 어디에 쓰나요?', a: R`<p>바깥 함수의 지역 변수를 참조하는 안쪽 함수가, 바깥 함수가 끝난 뒤에도 그 변수를 기억하는 것이다. 설정값을 기억하는 함수 팩토리, nonlocal로 상태를 가진 카운터, 원래 함수를 기억하는 데코레이터의 래퍼가 모두 클로저다.</p>` },
      { q: '루프에서 만든 lambda들이 모두 같은 값을 반환하는 이유는요?', a: R`<p>클로저가 변수의 값이 아니라 변수 자체를 기억하고, 값은 호출할 때 읽기 때문이다. 루프가 끝난 뒤 호출하면 모두 마지막 값을 본다. lambda i=i: i처럼 기본 인자로 정의 시점의 값을 고정하거나 functools.partial을 쓴다.</p>` },
    ],
    types: ['스코프'],
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
<!--diagram-->
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
<p><code>yield from 다른_이터러블</code>은 하위 제너레이터에 일을 위임한다. 제너레이터는 <code>send()</code>로 값을 받을 수도 있어 "중간에 멈추고 바깥과 대화하는 함수", 즉 코루틴이 된다. 이 아이디어가 발전한 것이 <code>async</code>/<code>await</code>다. ML에서는 디스크에 다 올라가지 않는 데이터셋을 배치 단위로 읽어 학습에 공급할 때 이 패턴을 쓴다.</p>
<!--code-->`,
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
    points: [
      R`이터러블: iter()로 이터레이터를 주는 객체 / 이터레이터: next()로 다음 값, 끝나면 StopIteration`,
      R`yield가 있는 함수는 호출하면 제너레이터 객체를 반환하고, next()마다 다음 yield까지 실행 후 멈춘다`,
      R`지연 평가: 메모리가 크기와 무관하게 일정, 무한 시퀀스, 파이프라인`,
      R`제너레이터는 한 번만 순회된다. len과 인덱싱이 없다`,
    ],
    interview: [
      { q: '제너레이터를 쓰는 이유는요?', a: R`<p>값을 미리 다 만들어 두지 않고 요청할 때 하나씩 만들어서, 데이터 크기와 무관하게 메모리를 일정하게 쓴다. 다 올라가지 않는 큰 파일이나 무한 스트림을 다룰 수 있고, 첫 결과가 바로 나오며, 읽기·필터·변환 단계를 파이프라인으로 연결하기 쉽다.</p>` },
      { q: '이터러블과 이터레이터의 차이는요?', a: R`<p>이터러블은 iter()를 부르면 이터레이터를 돌려주는 객체이고, 이터레이터는 현재 위치를 상태로 가지고 next()마다 다음 값을 주는 객체다. 리스트는 이터러블이라 매번 새 이터레이터를 만들어 여러 번 돌 수 있지만, 이터레이터는 한 번 끝까지 가면 소진된다.</p>` },
    ],
    types: ['제너레이터'],
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
<!--diagram-->
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
</ul>
<!--code-->`,
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
    points: [
      R`@deco 는 f = deco(f). 함수가 정의될 때(import 시점) 실행된다`,
      R`래퍼는 원래 함수를 기억하는 클로저. functools.wraps로 이름·docstring 보존`,
      R`인자 받는 데코레이터는 3겹: 설정 → 데코레이터 → 래퍼`,
      R`@a @b def f 는 f = a(b(f)). b가 먼저 적용되고, 호출 시 a의 래퍼부터 실행`,
    ],
    interview: [
      { q: '데코레이터는 어떻게 동작하나요?', a: R`<p>함수를 인자로 받아 기능을 덧붙인 새 함수(래퍼)를 돌려주는 함수다. @timer를 붙이면 정의 시점에 train = timer(train)이 실행되어 이름 train이 래퍼를 가리키게 된다. 래퍼는 원래 함수를 기억하는 클로저로, 전처리, 원래 함수 호출, 후처리를 한다. 로깅, 캐싱, 인증, 재시도처럼 본 로직과 무관한 공통 기능을 분리할 때 쓴다.</p>` },
    ],
    types: ['데코레이터'],
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
<!--diagram-->
<h3>GIL은 스레드 안전을 보장하지 않는다</h3>
<p>GIL은 인터프리터 내부를 보호할 뿐이다. <code>count += 1</code>처럼 여러 바이트코드로 이뤄진 연산 사이에서 스레드가 바뀔 수 있으므로, 공유 데이터는 여전히 락으로 보호해야 한다.</p>
<h3>작업 종류별 선택</h3>
<table><tr><th>작업</th><th>도구</th><th>이유와 비용</th></tr>
<tr><td>I/O 대기가 많음 (API 호출, 파일, DB)</td><td><code>ThreadPoolExecutor</code></td><td>대기 중 GIL 해제. 기존 동기 코드를 그대로 쓸 수 있음</td></tr>
<tr><td>아주 많은 동시 연결</td><td><code>asyncio</code></td><td>스레드 하나의 이벤트 루프. 스레드보다 가볍지만 비동기 라이브러리가 필요</td></tr>
<tr><td>순수 파이썬 CPU 계산</td><td><code>ProcessPoolExecutor</code>, <code>multiprocessing</code></td><td>프로세스마다 별도 인터프리터와 GIL. 인자·결과 직렬화(pickle)와 프로세스 시작 비용</td></tr>
<tr><td>수치 계산</td><td>numpy 벡터화, Numba, Cython</td><td>계산을 네이티브 코드로 옮기면 GIL과 인터프리터 오버헤드를 동시에 피함</td></tr></table>
<h3>GIL 없는 Python</h3>
<p>PEP 703에 따라 Python 3.13부터 GIL을 끈 빌드(free-threaded)가 실험적으로 제공되기 시작했고, 이후 버전에서 지원이 확대되고 있다. 이 빌드에서는 순수 파이썬 스레드도 병렬로 실행되지만, 단일 스레드 성능 부담과 C 확장의 호환성 문제가 있어 생태계가 점진적으로 따라가는 중이다. 실행 중인 인터프리터의 상태는 <code>sys._is_gil_enabled()</code>(3.13+)로 확인할 수 있다.</p>
<!--code-->`,
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
    points: [
      R`GIL: CPython에서 한 번에 한 스레드만 바이트코드를 실행. 참조 카운트를 보호하기 위해`,
      R`I/O 대기 중에는 GIL을 놓는다 → I/O 작업은 스레드나 asyncio로 효과`,
      R`CPU 계산은 멀티프로세싱(프로세스마다 GIL) 또는 numpy처럼 네이티브 코드로`,
      R`GIL은 스레드 안전을 보장하지 않는다. 공유 데이터는 여전히 락`,
    ],
    interview: [
      { q: 'GIL이 있는데 Python에서 멀티스레드를 쓰는 이유는요?', a: R`<p>블로킹 I/O 동안에는 GIL을 놓기 때문에, API 호출이나 파일·DB 대기가 많은 작업은 여러 스레드가 대기 시간을 겹쳐 전체 시간이 줄어든다. 반대로 순수 파이썬 계산은 한 번에 한 스레드만 돌아 빨라지지 않으므로 멀티프로세싱이나 네이티브 확장을 쓴다.</p>` },
      { q: 'GIL이 있으면 락이 필요 없나요?', a: R`<p>필요하다. GIL은 인터프리터 내부 자료구조를 보호할 뿐이고, count += 1처럼 여러 바이트코드로 이뤄진 연산 사이에서 스레드가 바뀔 수 있다. 그래서 읽고-고치고-쓰는 공유 데이터는 Lock으로 보호해야 한다.</p>` },
    ],
    types: ['GIL'],
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
<!--diagram-->
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
<p>PyTorch 학습 루프에서 <code>total_loss += loss</code>를 하면, loss 텐서가 계산 그래프 전체를 참조하고 있어서 매 반복의 그래프가 해제되지 않고 쌓인다. 숫자만 필요하면 <code>loss.item()</code>으로 파이썬 숫자를 꺼내야 한다. Jupyter에서는 출력 기록(<code>Out[n]</code>)과 마지막 결과(<code>_</code>)가 큰 객체의 참조를 남겨 GPU 메모리가 풀리지 않는 일도 흔하다.</p>
<!--code-->`,
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
    points: [
      R`참조 카운트가 0이 되는 즉시 해제. del은 객체가 아니라 이름을 지워 카운트를 하나 줄인다`,
      R`순환 참조는 카운트가 0이 되지 않아 세대별 순환 GC가 회수(세대 가설: 대부분 금방 죽는다)`,
      R`weakref는 카운트를 올리지 않는 참조. 캐시·역방향 참조에 사용`,
      R`해제해도 pymalloc 아레나가 비어야 OS에 반환되므로 RSS가 바로 줄지 않을 수 있다`,
    ],
    interview: [
      { q: 'Python은 메모리를 어떻게 관리하나요?', a: R`<p>기본은 참조 카운트다. 객체마다 자기를 가리키는 참조 수를 세다가 0이 되는 순간 즉시 해제한다. 서로만 가리키는 순환 참조는 카운트가 0이 되지 않으므로, 컨테이너 객체를 추적하는 세대별 순환 GC가 외부에서 도달할 수 없는 덩어리를 찾아 회수한다.</p>` },
      { q: 'GC가 있는데도 메모리 누수가 생기나요?', a: R`<p>생긴다. GC는 도달할 수 없는 객체만 회수하므로, 계속 커지는 전역 캐시나 큰 객체를 붙잡은 콜백·클로저처럼 아직 참조가 남아 있으면 해제되지 않는다. PyTorch에서 loss 텐서를 그대로 누적해 계산 그래프가 쌓이는 것도 같은 경우다. tracemalloc과 gc.get_referrers로 원인을 찾는다.</p>` },
    ],
    types: ['메모리 관리'],
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
  {
    id: 'pl-processor', title: '언어 처리기: 컴파일러·인터프리터',
    summary: R`컴파일러: 실행 전에 전체를 <strong>기계어로 번역</strong> / 인터프리터: 실행하면서 한 문장씩 해석
번역 단계: 어휘 분석 → 구문 분석(AST) → 의미 분석 → 최적화 → 코드 생성
Python·Java는 중간 단계인 <strong>바이트코드</strong>를 가상 머신이 실행 (Java는 JIT로 기계어까지)`,
    body: R`
<p>CPU는 기계어만 실행한다. 사람이 쓴 고급 언어를 기계어로 옮기는 프로그램이 언어 처리기이고, 옮기는 시점에 따라 성격이 갈린다.</p>
<h3>컴파일러와 인터프리터</h3>
<table><tr><th></th><th>컴파일러</th><th>인터프리터</th></tr>
<tr><td>번역 시점</td><td>실행 전에 프로그램 전체</td><td>실행하면서 문장 단위로</td></tr>
<tr><td>결과물</td><td>실행 파일(목적 코드)</td><td>별도 파일 없음</td></tr>
<tr><td>실행 속도</td><td>빠름 (번역이 끝나 있음)</td><td>느림 (매번 해석)</td></tr>
<tr><td>오류 발견</td><td>문법·타입 오류를 실행 전에 한꺼번에</td><td>그 줄에 도달했을 때</td></tr>
<tr><td>예</td><td>C, C++, Rust, Go</td><td>초기 BASIC, 셸 스크립트</td></tr></table>
<p>요즘 언어는 대부분 둘을 섞는다. Java는 <code>javac</code>가 소스를 JVM용 <strong>바이트코드</strong>(.class)로 컴파일하고, JVM이 이를 해석하다가 자주 실행되는 부분을 실행 중에 기계어로 컴파일한다(<strong>JIT</strong>, Just-In-Time). Python(CPython)도 소스를 바이트코드로 컴파일(.pyc)한 뒤 가상 머신이 한 명령씩 해석한다. 바이트코드는 특정 CPU가 아닌 가상 머신을 위한 명령어라, 같은 .class 파일이 어느 운영체제에서든 돈다.</p>
<h3>C 프로그램이 실행 파일이 되기까지</h3>
<ol>
<li><strong>전처리기</strong>: <code>#include</code>로 헤더를 붙여 넣고 <code>#define</code> 매크로를 치환한다.</li>
<li><strong>컴파일러</strong>: C 코드를 어셈블리어로 번역한다.</li>
<li><strong>어셈블러</strong>: 어셈블리어를 기계어 목적 파일(.o)로 바꾼다.</li>
<li><strong>링커</strong>: 여러 목적 파일과 라이브러리를 묶어 실행 파일을 만든다. 라이브러리를 실행 파일 안에 복사하면 정적 링크, 실행할 때 공유 라이브러리(.so, .dll)를 불러오면 동적 링크다.</li>
<li><strong>로더</strong>: 실행 파일을 메모리에 올리고 시작 주소로 점프한다.</li>
</ol>
<figure class="diagram"><svg viewBox="0 0 560 196" width="560"><text x="40" y="41" class="sm">hello.c</text><rect class="n" x="85" y="24" width="80" height="34" rx="4"/><text x="125.0" y="41.0">전처리기</text><text x="215" y="41" class="sm">hello.i</text><rect class="n" x="260" y="24" width="80" height="34" rx="4"/><text x="300.0" y="41.0">컴파일러</text><text x="390" y="41" class="sm">hello.s</text><rect class="n" x="435" y="24" width="80" height="34" rx="4"/><text x="475.0" y="41.0">어셈블러</text><path class="a" d="M68,41 L85,41"/><path class="a" d="M165,41 L187,41"/><path class="a" d="M243,41 L260,41"/><path class="a" d="M340,41 L362,41"/><path class="a" d="M418,41 L435,41"/><path class="a" d="M475,58 V96"/><text x="475" y="115" class="sm">hello.o</text><rect class="h" x="340" y="98" width="80" height="34" rx="4"/><text x="380.0" y="115.0">링커</text><text x="285" y="115" class="sm">실행 파일</text><rect class="n" x="150" y="98" width="80" height="34" rx="4"/><text x="190.0" y="115.0">로더</text><text x="90" y="115" class="sm">메모리</text><path class="a" d="M445,115 L420,115"/><path class="a" d="M340,115 L319,115"/><path class="a" d="M255,115 L230,115"/><path class="a" d="M150,115 L124,115"/><rect class="g" x="340" y="152" width="80" height="30" rx="4"/><text x="380.0" y="167.0" class="sm">라이브러리</text><path class="a" d="M380,152 V134"/><text x="330" y="167" class="en sm">정적 링크: 복사해 넣음 · 동적 링크: 실행 때 불러옴</text><text x="40" y="80" class="st sm">#include·#define 처리</text><text x="215" y="80" class="sm">어셈블리어</text><text x="390" y="80" class="sm">기계어 목적 파일</text></svg><figcaption>C 프로그램의 빌드와 실행. 전처리 → 컴파일 → 어셈블 → 링크 → 로드 순서이며, 링커가 여러 목적 파일과 라이브러리를 하나의 실행 파일로 묶는다.</figcaption></figure>
<p>다른 종류의 CPU에서 돌 실행 파일을 만드는 컴파일러를 <strong>크로스 컴파일러</strong>라 한다(PC에서 임베디드 기기용 프로그램 빌드).</p>
<h3>컴파일러 내부의 단계</h3>
<ul>
<li><strong>어휘 분석</strong>: 글자 흐름을 의미 있는 최소 단위인 <strong>토큰</strong>(이름, 숫자, 연산자, 키워드)으로 자른다. 정규 표현식·유한 오토마타로 구현한다.</li>
<li><strong>구문 분석</strong>: 토큰 배열이 문법에 맞는지 확인하고 구조를 트리로 만든다(파스 트리, 추상 구문 트리 AST). 연산자 우선순위가 트리의 깊이로 표현된다.</li>
<li><strong>의미 분석</strong>: 문법은 맞지만 뜻이 틀린 것을 잡는다. 선언 안 된 변수, 타입 불일치, 인자 개수 오류.</li>
<li><strong>중간 코드 생성과 최적화</strong>: 상수 계산을 미리 하고(상수 접기), 실행될 수 없는 코드를 지우고(죽은 코드 제거), 반복마다 같은 계산을 루프 밖으로 뺀다.</li>
<li><strong>코드 생성</strong>: 목표 기계의 명령어로 바꾸고 변수를 레지스터에 배정한다.</li>
</ul>
<!--diagram-->
<p>Python 같은 동적 언어는 타입을 실행 중에 정하므로 의미 분석 대부분이 실행 시점으로 밀린다. 존재하지 않는 이름을 쓴 함수도 정의는 되고, 호출하는 순간 <code>NameError</code>가 난다. 타입 힌트와 mypy 같은 정적 검사기는 이 검사를 실행 전으로 당겨 온다.</p>
<h3>ML 속의 컴파일러</h3>
<p><code>torch.compile</code>, XLA, TensorRT는 신경망 연산 그래프를 받아 여러 연산을 하나로 합치고(연산 융합) 메모리 이동을 줄여 GPU 코드를 만든다. numba는 파이썬 함수를 JIT로 기계어로 바꿔 반복문을 빠르게 한다. 원리는 위의 최적화·코드 생성과 같다.</p>
<!--code-->`,
    analogy: R`<p>외국어 책을 읽는 두 방법. 번역가가 책 전체를 미리 번역해 출판하면(컴파일러) 독자는 빠르게 읽지만 번역에 시간이 걸린다. 통역사가 옆에서 한 문장씩 읽어 주면(인터프리터) 바로 시작할 수 있지만 읽을 때마다 통역이 필요하다. JIT는 통역하다가 자주 나오는 문장은 아예 번역문을 적어 두고 그 뒤로는 그걸 읽는 통역사다.</p>`,
    diagram: { caption: 'x = a + 2 * b가 번역되는 과정. 어휘 분석이 토큰으로 자르고, 구문 분석이 우선순위에 맞는 트리를 만든다(곱셈이 더 깊다). 코드 생성은 트리를 후위 순회하며 스택 기계 명령어를 낸다(CPython 바이트코드).', svg: R`
<svg viewBox="0 0 560 240" width="560">
<rect class="n" x="10" y="20" width="80" height="36" rx="6"/><text x="50" y="38" class="sm">소스 코드</text>
<rect class="h" x="125" y="20" width="80" height="36" rx="6"/><text x="165" y="38" class="sm">어휘 분석</text>
<rect class="h" x="240" y="20" width="80" height="36" rx="6"/><text x="280" y="38" class="sm">구문 분석</text>
<rect class="h" x="355" y="20" width="80" height="36" rx="6"/><text x="395" y="38" class="sm">의미 분석</text>
<rect class="h" x="470" y="20" width="80" height="36" rx="6"/><text x="510" y="38" class="sm">코드 생성</text>
<path class="a" d="M90,38 H123"/><path class="a" d="M205,38 H238"/><path class="a" d="M320,38 H353"/><path class="a" d="M435,38 H468"/>
<text x="85" y="82" class="sm">토큰</text><text x="290" y="82" class="sm">AST</text><text x="480" y="82" class="sm">바이트코드</text>
<text x="85" y="105" class="sm">x · = · a · + · 2 · * · b</text>
<path class="e" d="M290,105 L250,145 M290,105 L330,145 M330,145 L300,185 M330,145 L360,185 M360,185 L340,220 M360,185 L380,220"/>
<circle class="n" cx="290" cy="105" r="13"/><text x="290" y="105">=</text>
<circle class="n" cx="250" cy="145" r="13"/><text x="250" y="145">x</text>
<circle class="n" cx="330" cy="145" r="13"/><text x="330" y="145">+</text>
<circle class="n" cx="300" cy="185" r="13"/><text x="300" y="185">a</text>
<circle class="h" cx="360" cy="185" r="13"/><text x="360" y="185">*</text>
<circle class="n" cx="340" cy="220" r="13"/><text x="340" y="220">2</text>
<circle class="n" cx="380" cy="220" r="13"/><text x="380" y="220">b</text>
<text x="430" y="105" class="st sm">LOAD_NAME a</text><text x="430" y="122" class="st sm">LOAD_CONST 2</text><text x="430" y="139" class="st sm">LOAD_NAME b</text>
<text x="430" y="156" class="st sm">BINARY_OP *</text><text x="430" y="173" class="st sm">BINARY_OP +</text><text x="430" y="190" class="st sm">STORE_NAME x</text>
</svg>` },
    code: R`
import ast, dis, io, tokenize

src = "x = a + 2 * b"

# 1) 어휘 분석: 글자 → 토큰
toks = [t.string for t in tokenize.generate_tokens(io.StringIO(src).readline) if t.string.strip()]
print("토큰:", toks)

# 2) 구문 분석: 토큰 → 추상 구문 트리(AST). 곱셈이 덧셈보다 깊이(먼저) 있다
print(ast.dump(ast.parse(src).body[0].value))

# 3) 코드 생성: AST → 바이트코드 (스택 기계 명령어, 트리의 후위 순회 순서)
#    Python 3.12~3.13 기준. 버전마다 명령어 이름이 조금씩 다르다
for ins in dis.get_instructions(compile(src, "<src>", "exec")):
  if ins.opname not in ("RESUME", "RETURN_CONST", "LOAD_CONST") or ins.argrepr == "2":   # 앞뒤 관리용 명령은 생략
      print(f"  {ins.opname:12} {ins.argrepr}")

# 4) 최적화: 상수 접기와 죽은 코드 제거는 컴파일 시점에 끝난다
def f():
  if False:
      print("실행될 일 없음")
  return 60 * 60 * 24
ops = [f"{i.opname} {i.argrepr}".strip() for i in dis.get_instructions(f)]
print("f의 바이트코드:", ops)            # print 호출은 사라지고 86400만 남는다

# 5) 의미 분석 오류(존재하지 않는 이름)는 Python에선 실행 중에야 드러난다
code = compile("def g():\n    return undefined_name + 1", "<src>", "exec")   # 컴파일은 통과
ns = {}
exec(code, ns)
try:
  ns["g"]()
except NameError as e:
  print("실행 시점 오류:", e)
`,
    points: [
      R`컴파일러: 실행 전 전체 번역, 실행 빠름, 목적 파일 생성 / 인터프리터: 실행하며 문장 단위 해석, 목적 파일 없음`,
      R`컴파일 단계: 어휘 분석(토큰) → 구문 분석(파스 트리·AST) → 의미 분석(타입 검사) → 중간 코드·최적화 → 코드 생성`,
      R`C 빌드: 전처리기 → 컴파일러 → 어셈블러 → 링커 → 로더`,
      R`정적 링크는 라이브러리를 실행 파일에 복사, 동적 링크는 실행 시 공유 라이브러리를 불러옴`,
      R`Java: javac → 바이트코드(.class) → JVM이 해석, 자주 쓰는 부분은 JIT로 기계어. 크로스 컴파일러는 다른 CPU용 코드 생성`,
    ],
    interview: [
      { q: '컴파일러와 인터프리터의 차이는요?', a: R`<p>컴파일러는 실행 전에 프로그램 전체를 기계어로 번역해 실행 파일을 만들므로 실행이 빠르고 문법·타입 오류를 미리 잡는다. 인터프리터는 실행하면서 문장 단위로 해석해 바로 실행해 볼 수 있지만 매번 해석하므로 느리고 오류는 그 줄에 도달해야 드러난다. Java와 Python처럼 바이트코드로 컴파일한 뒤 가상 머신이 해석하는 혼합 방식이 많다.</p>` },
      { q: 'JIT 컴파일이란 무엇인가요?', a: R`<p>실행 중에 자주 실행되는 코드를 찾아 그 부분을 기계어로 컴파일해 두고 다음부터 기계어로 실행하는 방식이다. JVM의 HotSpot이 대표적이며, 실제 실행 정보를 보고 최적화할 수 있어 인터프리터보다 훨씬 빠르다.</p>` },
    ],
    types: ['언어 처리기'],
    links: [
      { to: 'ds-tree', why: 'AST를 후위 순회하면 스택 기계 명령어 순서가 된다' },
      { to: 'ds-stack-queue', why: '바이트코드 가상 머신은 스택 기계, 중위식→후위식 변환과 같은 원리' },
      { to: 'pl-binding', why: '정적·동적 타입은 타입 검사를 언제 하느냐의 차이' },
      { to: 'pl-gil', why: 'CPython 가상 머신이 바이트코드를 실행하는 방식' },
      { to: 'ca-cycle', why: '코드 생성의 결과물인 기계어 명령어가 CPU에서 실행되는 과정' },
    ],
    quiz: [
      { q: 'Java 프로그램이 같은 .class 파일로 여러 운영체제에서 실행되는 이유는?',
        options: ['javac가 운영체제마다 다른 기계어를 하나의 파일에 모두 넣기 때문', 'CPU가 아닌 JVM용 바이트코드로 컴파일되어 각 OS의 JVM이 실행해서', 'Java는 인터프리터 언어라서 소스 코드를 그대로 배포해 실행하기 때문', '실행할 때마다 원격 서버에서 그 OS용 기계어를 내려받아 쓰기 때문'], answer: 1,
        explain: '바이트코드는 가상 머신의 명령어다. 운영체제별 차이는 JVM이 흡수하고, JVM은 자주 실행되는 부분을 JIT로 그 기계에 맞는 기계어로 바꾼다.' },
      { q: '"선언하지 않은 변수를 사용했다"는 오류를 잡는 컴파일 단계는?',
        options: ['어휘 분석', '구문 분석', '의미 분석', '코드 생성'], answer: 2,
        explain: '변수 이름은 올바른 토큰이고 문장 구조도 문법에 맞으므로 어휘·구문 분석은 통과한다. 이름이 선언되었는지, 타입이 맞는지 같은 뜻의 검사는 의미 분석이 한다.' },
      { q: 'C 컴파일 과정에서 여러 목적 파일(.o)과 라이브러리를 합쳐 실행 파일을 만드는 것은?',
        options: ['전처리기', '어셈블러', '로더', '링커'], answer: 3,
        explain: '전처리기는 #include·#define을 처리하고, 어셈블러는 어셈블리를 목적 파일로 바꾸며, 로더는 완성된 실행 파일을 메모리에 올린다.' },
    ],
    resources: ['『컴파일러: 원리, 기법, 도구』(Aho 외, 일명 드래곤 북) 1~2장', 'Crafting Interpreters (Robert Nystrom, 무료 온라인) — 인터프리터를 직접 만들며 배우기'],
  },
  {
    id: 'pl-binding', title: '바인딩·자료형·매개변수 전달',
    summary: R`바인딩: 이름에 타입·값·주소 같은 속성을 묶는 것, <strong>언제 묶느냐</strong>(컴파일 시간 vs 실행 시간)가 핵심
정적·동적 타입(언제 검사하나)과 강한·약한 타입(암시적 변환을 얼마나 허용하나)은 <strong>다른 축</strong>
매개변수 전달: 값 전달 / 참조 전달 / Python·Java는 <strong>객체 참조를 값으로</strong> 전달`,
    body: R`
<h3>바인딩과 바인딩 시간</h3>
<p>변수 하나에는 이름, 타입, 값, 메모리 주소, 수명, 유효 범위 같은 속성이 붙는다. 이름과 속성을 연결하는 것을 바인딩이라 하고, 그 연결이 일어나는 때를 바인딩 시간이라 한다.</p>
<ul>
<li>언어 설계 시간: <code>+</code>가 덧셈이라는 의미</li>
<li>구현 시간: C의 <code>int</code>가 몇 바이트인지(컴파일러마다 다를 수 있다)</li>
<li>컴파일 시간: C·Java 변수의 타입, 오버로딩된 함수 중 어느 것을 부를지</li>
<li>링크·로드 시간: 다른 파일에 있는 함수의 주소, 전역 변수의 메모리 위치</li>
<li>실행 시간: 지역 변수의 스택 주소, Python 변수가 가리키는 객체와 그 타입, 오버라이딩된 메서드 중 실제로 실행될 것</li>
</ul>
<p>실행 전에 정해지면 <strong>정적 바인딩</strong>, 실행 중에 정해지면 <strong>동적 바인딩</strong>이다. 정적 바인딩은 빠르고 오류를 미리 잡고, 동적 바인딩은 유연하다. 객체지향의 다형성은 "어느 메서드를 부를지"를 실행 시간까지 미루는 동적 바인딩이다.</p>
<h3>저장 위치와 수명</h3>
<ul>
<li><strong>정적 영역</strong>: 전역 변수와 C의 <code>static</code> 변수. 프로그램 시작부터 끝까지 산다. 함수 안의 <code>static</code> 지역 변수는 이름은 그 함수 안에서만 보이지만 값은 호출이 끝나도 남아, 다음 호출에서 이어서 쓴다. 초기화도 처음 한 번만 된다.</li>
<li><strong>스택</strong>: 일반 지역 변수와 매개변수. 함수가 호출될 때 생기고 반환하면 사라진다.</li>
<li><strong>힙</strong>: <code>malloc</code>·<code>new</code>로 만든 객체. 직접 해제하거나 가비지 컬렉터가 회수할 때까지 산다.</li>
</ul>
<h3>타입 체계의 두 축</h3>
<table><tr><th></th><th>강한 타입 (암시적 변환 적음)</th><th>약한 타입 (암시적 변환 많음)</th></tr>
<tr><td>정적 타입 (컴파일 시 검사)</td><td>Java, Rust, Haskell</td><td>C (포인터 캐스팅, 정수·실수 섞어 쓰기)</td></tr>
<tr><td>동적 타입 (실행 시 검사)</td><td>Python (<code>"1" + 1</code>은 TypeError)</td><td>JavaScript (<code>"1" + 1</code>은 <code>"11"</code>)</td></tr></table>
<p>"Python은 타입이 없다"는 틀린 말이다. 변수(이름)에 타입이 없을 뿐, 모든 객체는 타입을 가지고 연산 때마다 검사된다. 타입을 쓰지 않아도 컴파일러가 알아내는 <strong>타입 추론</strong>(C++ <code>auto</code>, Kotlin, TypeScript)은 정적 타입이면서 동적 타입처럼 간결하게 쓰는 방법이다.</p>
<h3>형 변환과 정수 나눗셈</h3>
<p>섞어 쓰면 범위가 넓은 쪽으로 자동 변환된다(정수 + 실수 → 실수). 이를 암시적 변환(승격)이라 하고, <code>(int)x</code>처럼 직접 쓰면 명시적 변환(캐스팅)이다. C에서 정수끼리 나누면 결과도 정수이며 <strong>0 쪽으로 버린다</strong>. <code>-9 / 4</code>는 C에서 -2, Python의 <code>-9 // 4</code>는 아래로 내려 -3이다. 나머지도 따라서 C는 -1, Python은 3이다.</p>
<h3>매개변수 전달 방식</h3>
<ul>
<li><strong>값에 의한 전달</strong>(call by value): 인자의 복사본이 매개변수가 된다. 함수 안에서 바꿔도 호출한 쪽 변수는 그대로다. C의 기본이고, 그래서 C에서 <code>swap(int x, int y)</code>는 교환에 실패한다.</li>
<li><strong>주소 전달</strong>: C에서 <code>swap(&amp;a, &amp;b)</code>처럼 주소를 값으로 넘기고 <code>*x</code>로 원래 칸을 고친다. 전달 자체는 여전히 값 전달이다.</li>
<li><strong>참조에 의한 전달</strong>(call by reference): 매개변수가 호출한 쪽 변수의 별칭이 된다. C++의 <code>int&amp;</code>. 매개변수에 대입하면 원래 변수가 바뀐다.</li>
<li><strong>Python·Java의 방식</strong>: 객체를 가리키는 참조를 값으로 복사해 넘긴다(call by sharing). 같은 객체를 가리키므로 <code>x.append(3)</code>처럼 <strong>객체를 바꾸면</strong> 밖에서도 보이고, <code>x = [9]</code>처럼 <strong>이름에 새 객체를 대입하면</strong> 지역 이름만 바뀐다. Java의 기본형(int 등)은 값 자체가 복사된다.</li>
<li><strong>이름에 의한 전달</strong>(call by name): 인자 식을 쓰일 때마다 다시 계산한다. ALGOL에 있던 방식으로, 오늘날 지연 평가의 조상이다.</li>
</ul>
<!--diagram-->
<!--code-->`,
    analogy: R`<p>값 전달은 서류의 복사본을 건네는 것이다. 받은 사람이 복사본에 낙서해도 원본은 멀쩡하다. 참조 전달은 원본 서류철 자체를 건네는 것이다. Python의 방식은 "공유 문서의 링크"를 복사해 건네는 것과 같다. 받은 사람이 문서 내용을 고치면 모두에게 보이지만, 자기 링크를 다른 문서 링크로 바꿔 적는 것은 내 링크에 영향이 없다.</p>`,
    diagram: { caption: '세 가지 전달 방식. 값 전달은 칸을 복사하고, 참조 전달은 같은 칸에 이름이 둘 붙는다. Python은 같은 객체를 가리키는 참조를 복사하므로 객체 변경은 공유되고 이름 대입은 공유되지 않는다.', svg: R`
<svg viewBox="0 0 560 220" width="560">
<path class="e d" d="M185,10 V210 M375,10 V210"/>
<text x="95" y="16" class="sm">값 전달 (C 기본)</text><text x="280" y="16" class="sm">참조 전달 (C++ int&amp;)</text><text x="470" y="16" class="sm">Python (참조를 값으로)</text>
<text x="55" y="38" class="sm">a (main)</text><text x="145" y="38" class="sm">x (f)</text>
<rect class="n" x="20" y="48" width="70" height="34"/><text x="55" y="65">1</text>
<rect class="h" x="110" y="48" width="70" height="34"/><text x="145" y="65">99</text>
<path class="a d" d="M90,65 H108"/>
<text x="95" y="105" class="sm">x = 99 → a는 그대로 1</text>
<text x="95" y="135" class="sm">void f(int x)</text>
<text x="280" y="38" class="sm">a와 x: 같은 칸의 두 이름</text>
<rect class="h" x="240" y="48" width="80" height="34"/><text x="280" y="65">99</text>
<text x="280" y="105" class="sm">x = 99 → a도 99</text>
<text x="280" y="135" class="sm">void f(int &amp;x)</text>
<rect class="n" x="388" y="42" width="30" height="26"/><text x="403" y="55">a</text>
<rect class="n" x="388" y="96" width="30" height="26"/><text x="403" y="109">x</text>
<rect class="h" x="460" y="52" width="90" height="30" rx="5"/><text x="505" y="67" class="sm">[1, 2, 3]</text>
<rect class="n" x="460" y="128" width="90" height="30" rx="5"/><text x="505" y="143" class="sm">[9]</text>
<path class="a" d="M418,55 L458,63"/><path class="a" d="M418,107 L458,76"/><path class="a d" d="M418,115 L458,138"/>
<text x="470" y="182" class="sm">x.append(3): a에도 보임</text>
<text x="470" y="200" class="sm">x = [9] (점선): x만 바뀜</text>
</svg>` },
    code: R`
import math

def mutate(x):
  x.append(3)                          # 공유된 객체 자체를 바꾼다 → 호출한 쪽에서도 보인다

def rebind(x):
  x = [9]                              # 지역 이름 x만 새 객체를 가리킨다 → 밖에는 영향 없음

a = [1, 2]
mutate(a); print("append 후:", a)        # [1, 2, 3]
rebind(a); print("대입 후:  ", a)        # [1, 2, 3] 그대로

def show_id(x):
  return id(x)
print("같은 객체를 받는가?", show_id(a) == id(a))   # True: 참조(주소)가 값으로 복사되어 전달

def swap(x, y):                          # C의 값 전달 swap과 같은 이유로 실패한다
  x, y = y, x
p, q = 1, 2
swap(p, q); print("swap 후:", p, q)       # 1 2
p, q = q, p; print("호출한 쪽에서 직접 교환:", p, q)

def counter():                           # C의 static 지역 변수 흉내: 호출이 끝나도 값이 남는다
  counter.n = getattr(counter, "n", 0) + 3
  return counter.n
print([counter() for _ in range(3)])     # [3, 6, 9]

v = 10;  print(type(v).__name__)         # 동적 타입: 같은 이름이 실행 중에 다른 타입의 객체를 가리킨다
v = "십"; print(type(v).__name__)
try:
  "1" + 1                              # 강한 타입: 암시적으로 바꿔 주지 않는다 (JavaScript는 "11")
except TypeError as e:
  print("TypeError:", e)

print("C식 정수 나눗셈(0 쪽으로 버림):", math.trunc(-9 / 4), "/ Python // (아래로 내림):", -9 // 4)   # -2 / -3
print("나머지: C의 -9 % 4 =", int(math.fmod(-9, 4)), "/ Python -9 % 4 =", -9 % 4)                  # -1 / 3
`,
    points: [
      R`바인딩 시간: 언어 설계 → 구현 → 컴파일 → 링크·로드 → 실행. 실행 전이면 정적, 실행 중이면 동적 바인딩`,
      R`정적·동적 타입(언제 검사하나)과 강·약 타입(암시적 변환을 얼마나 허용하나)은 다른 축`,
      R`static 지역 변수: 처음 한 번만 초기화, 호출 사이 값 유지(정적 영역)`,
      R`값 전달은 복사본, 참조 전달은 별칭, Python·Java는 참조를 값으로 전달(call by sharing)`,
      R`C 정수 나눗셈은 0 쪽으로 버림(-9 / 4 = -2), Python //는 아래로 내림(-9 // 4 = -3)`,
    ],
    interview: [
      { q: '정적 타입 언어와 동적 타입 언어의 차이는요?', a: R`<p>정적 타입은 변수의 타입이 컴파일 시점에 정해지고 검사되어 타입 오류를 실행 전에 잡고 최적화에 유리하다. 동적 타입은 변수에는 타입이 없고 값(객체)이 타입을 가지며 실행 중에 검사해 코드가 간결하고 유연하지만 오류가 늦게 드러난다. 이와 별개로 암시적 변환을 얼마나 허용하는지가 강한·약한 타입의 기준이다.</p>` },
      { q: 'call by value와 call by reference의 차이는요?', a: R`<p>값에 의한 호출은 인자의 복사본을 넘겨 함수 안에서 바꿔도 원래 변수에 영향이 없다. 참조에 의한 호출은 매개변수가 원래 변수의 별칭이 되어 대입하면 원래 변수가 바뀐다. C는 값 전달만 있어 주소를 값으로 넘겨 흉내 내고, C++의 참조 매개변수가 진짜 참조 전달이다.</p>` },
    ],
    types: ['바인딩', '자료형', '매개변수 전달'],
    links: [
      { to: 'pl-object', why: 'Python 변수는 객체에 붙인 이름표' },
      { to: 'pl-mutable', why: '가변 객체를 넘기면 함수 안 변경이 밖에도 보인다' },
      { to: 'pl-scope', why: '이름의 유효 범위(정적 스코프)도 바인딩의 한 종류' },
      { to: 'pl-c', why: 'static 지역 변수, 포인터로 흉내 내는 참조 전달' },
      { to: 'pl-java', why: '오버라이딩 = 동적 바인딩, 오버로딩 = 정적 바인딩' },
    ],
    quiz: [
      { q: 'Python에서 def f(x): x = [9] 를 호출해도 넘긴 리스트가 바뀌지 않는 이유는?',
        options: ['리스트는 불변 객체라서 함수 안에서 바꿀 수 없기 때문', '함수에 리스트 전체가 깊은 복사되어 전달되기 때문', '대입은 지역 이름 x가 새 객체를 가리키게 할 뿐이라서', '함수가 끝나면 지역 변수의 변경이 되돌려지기 때문'], answer: 2,
        explain: 'x와 호출한 쪽 변수는 처음에 같은 객체를 가리킨다. x = [9]는 객체를 고치지 않고 x라는 이름표만 다른 객체로 옮긴다. x.append(9)였다면 공유 객체가 바뀌어 밖에서도 보인다.' },
      { q: 'C 함수 안의 static int n = 0; 에 대한 설명으로 옳은 것은?',
        options: ['호출할 때마다 0으로 다시 초기화되는 지역 변수다', '다른 파일에서도 이름으로 접근할 수 있는 전역 변수다', '처음 한 번만 초기화되고 값이 호출 사이에 유지된다', '함수가 끝나면 스택에서 사라지고 다음 호출에 다시 생긴다'], answer: 2,
        explain: 'static 지역 변수는 정적 영역에 있어 프로그램이 끝날 때까지 산다. 이름은 그 함수 안에서만 보인다. 그래서 f()를 세 번 부르면 n이 누적된다.' },
      { q: '"정적 타입"과 "강한 타입"에 대한 설명으로 옳은 것은?',
        options: ['둘은 같은 뜻이며 컴파일하는 언어는 모두 강한 타입에 속한다', '정적은 검사 시점, 강한은 암시적 변환 정도를 말하는 다른 축이다', '동적 타입 언어는 변수에 타입이 없으므로 모두 약한 타입이다', '강한 타입 언어는 형 변환을 아예 할 수 없는 언어를 말한다'], answer: 1,
        explain: 'C는 정적이지만 비교적 약하고, Python은 동적이지만 강하다. 강한 타입이라도 int("3")처럼 명시적 변환은 할 수 있다.' },
    ],
    resources: ['『프로그래밍 언어론』(Robert Sebesta) 5장(바인딩), 6장(자료형), 9장(부프로그램)', 'Python 공식 FAQ — "How do I write a function with output parameters (call by reference)?"'],
  },
  {
    id: 'pl-c', title: 'C 코드 읽기: 포인터·배열·구조체',
    summary: R`포인터 = 주소를 담는 변수: <code>&amp;x</code>는 x의 주소, <code>*p</code>는 p가 가리키는 칸
배열 이름은 첫 원소의 주소, <code>a[i] == *(a + i)</code>, <code>p + 1</code>은 원소 하나 뒤
자주 틀리는 곳: 후위 ++, switch fall-through, 정수 나눗셈, 비트 연산 우선순위, 단락 평가`,
    body: R`
<p>C 코드 출력 문제는 외워서 푸는 문제가 아니다. 변수마다 칸을 그리고 한 줄씩 값을 고쳐 가며 추적하면 된다. 그러려면 C가 메모리를 다루는 방식 몇 가지를 정확히 알아야 한다.</p>
<h3>포인터</h3>
<p>모든 변수는 메모리 어딘가의 칸이고, 칸마다 주소가 있다. <code>int *p = &amp;n;</code>은 "p는 int 칸의 주소를 담는 변수이고, 지금 n의 주소를 담는다"는 뜻이다.</p>
<ul>
<li><code>&amp;n</code>: n의 주소. <code>*p</code>: p가 담은 주소에 있는 칸(역참조).</li>
<li><code>*p = 20;</code>은 p를 바꾸는 것이 아니라 p가 가리키는 칸, 즉 n을 20으로 바꾼다.</li>
<li><code>p = q;</code>는 p가 가리키는 대상을 바꿀 뿐, 원래 가리키던 칸의 값은 그대로다. 이 두 가지를 구분하는 것이 포인터 문제의 핵심이다.</li>
<li>선언의 <code>*</code>는 "포인터 타입"이라는 표시이고, 식 안의 <code>*</code>는 역참조 연산이다. <code>int *p, q;</code>에서 q는 포인터가 아닌 그냥 int다.</li>
</ul>
<h3>배열과 포인터 산술</h3>
<ul>
<li>배열 이름 <code>a</code>는 대부분의 식에서 첫 원소의 주소 <code>&amp;a[0]</code>로 바뀐다.</li>
<li>포인터에 1을 더하면 1바이트가 아니라 <strong>원소 하나 크기만큼</strong> 뒤를 가리킨다. int가 4바이트면 주소가 4 늘어난다.</li>
<li>그래서 <code>a[i]</code>는 <code>*(a + i)</code>와 정확히 같다. 포인터 <code>p</code>에도 <code>p[i]</code>를 쓸 수 있고, <code>p[-1]</code>은 p 바로 앞 원소다.</li>
<li><code>*a + 1</code>은 <code>a[0] + 1</code>(값에 1을 더함), <code>*(a + 1)</code>은 <code>a[1]</code>이다. 단항 <code>*</code>가 <code>+</code>보다 먼저 계산된다.</li>
<li>배열을 함수에 넘기면 주소만 넘어간다. 함수 안에서는 <code>sizeof</code>로 배열 크기를 알 수 없어 길이를 따로 넘긴다.</li>
</ul>
<!--diagram-->
<p><strong>2차원 배열</strong> <code>int m[2][3]</code>은 행 우선으로 한 줄로 이어 저장된다. <code>m[i][j]</code>는 앞에서부터 <code>i × 3 + j</code>번째 원소다.</p>
<h3>문자열</h3>
<p>C 문자열은 끝에 널 문자 <code>'\0'</code>이 붙은 char 배열이다. <code>char s[] = "code";</code>는 5칸('c','o','d','e','\0')이라 <code>sizeof(s)</code>는 5, 널 문자 앞까지 세는 <code>strlen(s)</code>는 4다. 문자열 비교는 <code>==</code>(주소 비교)가 아니라 <code>strcmp</code>로 한다.</p>
<h3>구조체</h3>
<p><code>struct Point { int x, y; };</code>로 여러 값을 하나로 묶는다. 구조체 변수에서는 <code>pt.x</code>, 구조체 포인터에서는 <code>p-&gt;x</code>를 쓴다. <code>p-&gt;x</code>는 <code>(*p).x</code>의 줄임이다. 구조체를 값으로 넘기면 통째로 복사되므로, 함수 안에서 고치려면 포인터로 넘긴다.</p>
<h3>연산자 함정</h3>
<table><tr><th>코드</th><th>규칙</th></tr>
<tr><td><code>j = i++ * 3;</code></td><td>후위: 현재 값으로 계산한 뒤 증가. 전위 <code>++i</code>는 먼저 증가하고 그 값을 쓴다</td></tr>
<tr><td><code>9 / 4</code>, <code>-9 / 4</code>, <code>9 % 4</code></td><td>정수끼리 나누면 정수, 0 쪽으로 버림: 2, −2, 나머지 1</td></tr>
<tr><td><code>switch</code></td><td>일치한 case부터 <strong>break를 만날 때까지</strong> 아래 case를 모두 실행(fall-through)</td></tr>
<tr><td><code>6 | 3 &amp; 5 ^ 2</code></td><td>비트 연산 우선순위는 <code>&amp;</code> → <code>^</code> → <code>|</code>. 모두 <code>==</code>보다 낮아 <code>x &amp; 1 == 0</code>은 <code>x &amp; (1 == 0)</code>이 된다</td></tr>
<tr><td><code>a &gt; 2 || ++b</code></td><td>단락 평가: <code>||</code> 앞이 참이면(<code>&amp;&amp;</code> 앞이 거짓이면) 뒤를 실행하지 않아 <code>++b</code>도 일어나지 않는다</td></tr>
<tr><td><code>if (x = 0)</code></td><td>비교가 아니라 대입. 값이 0이라 항상 거짓</td></tr></table>
<p>한 식에서 같은 변수를 두 번 바꾸는 코드(<code>i = i++ + ++i;</code>)는 결과가 정의되지 않는다. 시험 문제는 이런 코드를 피해 출제된다.</p>
<figure class="diagram"><svg viewBox="0 0 560 284" width="560"><path class="e" d="M150,54 L70,84"/><path class="e" d="M150,54 L230,84"/><path class="e" d="M230,124 L170,154"/><path class="e" d="M230,124 L290,154"/><path class="e" d="M170,194 L120,224"/><path class="e" d="M170,194 L220,224"/><circle class="h" cx="150" cy="34" r="20"/><text x="150" y="34">|</text><text x="176" y="34" class="st sm">= 7</text><circle class="n" cx="70" cy="104" r="20"/><text x="70" y="104">6</text><circle class="h" cx="230" cy="104" r="20"/><text x="230" y="104">^</text><text x="256" y="104" class="st sm">= 3</text><circle class="h" cx="170" cy="174" r="20"/><text x="170" y="174">&amp;</text><text x="196" y="174" class="st sm">= 1</text><circle class="n" cx="290" cy="174" r="20"/><text x="290" y="174">2</text><circle class="n" cx="120" cy="244" r="20"/><text x="120" y="244">3</text><circle class="n" cx="220" cy="244" r="20"/><text x="220" y="244">5</text><text x="350" y="40" class="st">① 3 &amp; 5</text><text x="380" y="60" class="st sm">  0011</text><text x="380" y="76" class="st sm">&amp; 0101</text><path class="e" d="M380,86 H450"/><text x="380" y="98" class="st sm">  0001 = <tspan font-weight="700">1</tspan></text><text x="350" y="118" class="st">② 1 ^ 2</text><text x="380" y="138" class="st sm">  0001</text><text x="380" y="154" class="st sm">^ 0010</text><path class="e" d="M380,164 H450"/><text x="380" y="176" class="st sm">  0011 = <tspan font-weight="700">3</tspan></text><text x="350" y="196" class="st">③ 6 | 3</text><text x="380" y="216" class="st sm">  0110</text><text x="380" y="232" class="st sm">| 0011</text><path class="e" d="M380,242 H450"/><text x="380" y="254" class="st sm">  0111 = <tspan font-weight="700">7</tspan></text></svg><figcaption><code>6 | 3 &amp; 5 ^ 2</code>의 계산. 우선순위가 높은 연산일수록 트리의 아래쪽에 있어 먼저 계산된다: &amp; → ^ → |. 결과는 7.</figcaption></figure>
<h3>함수와 메모리</h3>
<p>C의 인자 전달은 값 전달이라, <code>swap(int x, int y)</code>는 복사본만 바꾼다. 원래 변수를 바꾸려면 주소를 넘기고 <code>*x</code>로 고친다. 함수 안 <code>static</code> 지역 변수는 처음 한 번만 초기화되고 호출 사이에 값이 남는다. <code>malloc</code>으로 받은 메모리는 <code>free</code>로 직접 돌려줘야 하며, 돌려준 뒤 다시 쓰거나(use-after-free) 두 번 돌려주는 것은 보안 취약점의 흔한 원인이다.</p>
<figure class="diagram"><svg viewBox="0 0 560 290" width="560"><rect class="h" x="80" y="20" width="150" height="46"/><text x="155" y="43.0">스택</text><text x="250" y="43.0" class="st sm">지역 변수·매개변수 · 함수가 끝나면 사라짐</text><rect class="e d" x="80" y="66" width="150" height="64"/><rect class="g" x="80" y="130" width="150" height="40"/><text x="155" y="150.0">힙</text><text x="250" y="150.0" class="st sm">malloc으로 받은 메모리 · free할 때까지</text><rect class="n" x="80" y="170" width="150" height="34"/><text x="155" y="187.0">BSS</text><text x="250" y="187.0" class="st sm">초기값 없는 전역·static 변수 (0으로 채움)</text><rect class="n" x="80" y="204" width="150" height="34"/><text x="155" y="221.0">데이터</text><text x="250" y="221.0" class="st sm">초기값 있는 전역·static 변수</text><rect class="n" x="80" y="238" width="150" height="34"/><text x="155" y="255.0">코드</text><text x="250" y="255.0" class="st sm">기계어 명령 (읽기 전용)</text><path class="a" d="M155,70 V92"/><path class="a" d="M155,126 V104"/><text x="250" y="98" class="st sm">스택은 아래로, 힙은 위로 자란다</text><text x="70" y="26" class="en sm">높은 주소</text><text x="70" y="266" class="en sm">낮은 주소</text></svg><figcaption>프로세스의 메모리 영역. 전역·static 변수는 프로그램 내내 데이터·BSS 영역에, 지역 변수는 호출마다 스택에, malloc으로 받은 메모리는 힙에 있다.</figcaption></figure>
<!--code-->`,
    analogy: R`<p>포인터는 사물함 번호가 적힌 쪽지다. <code>*p = 20</code>은 쪽지에 적힌 번호의 사물함을 열어 내용물을 바꾸는 것이고, <code>p = q</code>는 쪽지를 다른 번호가 적힌 쪽지로 바꿔 드는 것이다. 사물함이 한 줄로 붙어 있으니(배열) "지금 번호에서 두 칸 옆"(<code>p + 2</code>)도 바로 찾아갈 수 있다.</p>`,
    diagram: { caption: 'int a[4] = {3, 6, 9, 12}; int *q = a + 2; 일 때. q는 a[2]의 주소(1008)를 담는다. int가 4바이트라 q + 1은 1012, 즉 a[3]이고, q[-2]는 1000에 있는 a[0]이다.', svg: R`
<svg viewBox="0 0 540 200" width="540">
<text x="45" y="40" class="sm">q</text>
<rect class="h" x="10" y="48" width="70" height="36"/><text x="45" y="66" class="sm">1008</text>
<path class="ha" d="M80,60 C140,8 300,8 318,46"/>
<rect class="n" x="120" y="50" width="80" height="40"/><rect class="n" x="200" y="50" width="80" height="40"/><rect class="h" x="280" y="50" width="80" height="40"/><rect class="n" x="360" y="50" width="80" height="40"/>
<text x="160" y="70">3</text><text x="240" y="70">6</text><text x="320" y="70">9</text><text x="400" y="70">12</text>
<text x="160" y="104" class="sm">a[0]</text><text x="240" y="104" class="sm">a[1]</text><text x="320" y="104" class="sm">a[2]</text><text x="400" y="104" class="sm">a[3]</text>
<text x="160" y="120" class="sm">1000</text><text x="240" y="120" class="sm">1004</text><text x="320" y="120" class="sm">1008</text><text x="400" y="120" class="sm">1012</text>
<text x="160" y="146" class="sm">q[-2] = 3</text><text x="320" y="146" class="sm">*q = 9</text><text x="400" y="146" class="sm">*(q + 1) = 12</text>
<text x="270" y="180" class="sm">a[i] == *(a + i)   ·   q + 1은 주소 4 증가 (int 하나)</text>
</svg>` },
    code: R`
#include <stdio.h>
#include <string.h>

struct Point { int x, y; };

void move(struct Point *p, int dx) {   /* 구조체 포인터: p->x 는 (*p).x */
    p->x += dx;
}

void swap(int *x, int *y) {            /* 주소를 넘겨 원래 칸을 바꾼다 */
    int t = *x; *x = *y; *y = t;
}

int next_id(void) {
    static int id = 100;               /* 처음 한 번만 초기화, 호출 사이에 값 유지 */
    id += 10;
    return id;
}

int main(void) {
    int n = 10, *p = &n;
    *p = 20;                           /* p가 가리키는 칸(n)을 바꾼다 */
    printf("n = %d\n", n);             /* 20 */

    int a[4] = {3, 6, 9, 12};
    int *q = a + 2;                    /* a[2]의 주소 */
    printf("%d %d %d\n", *(q + 1), q[-2], *a + 1);   /* 12 3 4 (*a + 1은 a[0] + 1) */

    char s[] = "code";
    printf("sizeof %zu, strlen %zu\n", sizeof(s), strlen(s));   /* 5 4 ('\0' 포함 여부) */

    int i = 4;
    int j = i++ * 3;                   /* 4 * 3을 계산한 뒤 i가 5가 된다 */
    int k = ++i * 3;                   /* i가 6이 된 뒤 6 * 3 */
    printf("i=%d j=%d k=%d\n", i, j, k);   /* i=6 j=12 k=18 */

    printf("%d %d %d\n", 9 / 4, 9 % 4, -9 / 4);   /* 2 1 -2 (0 쪽으로 버림) */

    int x = 2, sum = 0;
    switch (x) {                       /* break가 없으면 아래 case로 계속 실행 */
        case 1: sum += 1;
        case 2: sum += 20;
        case 3: sum += 300; break;
        default: sum += 4000;
    }
    printf("sum = %d\n", sum);         /* 320 */

    printf("%d\n", 6 | 3 & 5 ^ 2);     /* & → ^ → | 순서: 6 | ((3 & 5) ^ 2) = 6 | 3 = 7 */

    int c = 0;
    if (x == 2 || ++c) { }             /* 앞이 참이면 뒤는 실행하지 않는다 (단락 평가) */
    printf("c = %d\n", c);             /* 0 */

    int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("%d %d\n", m[1][0], *(*m + 4));   /* 4 5: 행 우선으로 이어 저장 */

    struct Point pt = {1, 2};
    move(&pt, 5);
    int u = 1, v = 2;
    swap(&u, &v);
    printf("pt.x=%d u=%d v=%d\n", pt.x, u, v);   /* pt.x=6 u=2 v=1 */

    next_id(); next_id();
    printf("id = %d\n", next_id());   /* 130 */
    return 0;
}
`,
    lang: 'c',
    points: [
      R`&amp;x는 x의 주소, *p는 p가 가리키는 칸. *p = 값은 가리키는 칸을, p = q는 가리키는 대상을 바꾼다`,
      R`a[i] == *(a + i). p + 1은 원소 하나 크기만큼 뒤. *a + 1은 a[0] + 1`,
      R`char s[] = "code": sizeof 5(널 문자 포함), strlen 4. 문자열 비교는 strcmp`,
      R`비트 연산 우선순위 &amp; → ^ → |, 모두 == 보다 낮다. 단락 평가로 뒤쪽 ++가 실행 안 될 수 있다`,
      R`후위 i++는 현재 값 사용 후 증가. switch는 break까지 fall-through. 정수 나눗셈은 0 쪽으로 버림`,
      R`static 지역 변수는 한 번만 초기화되고 값이 유지된다(데이터 영역)`,
    ],
    interview: [
      { q: '포인터와 배열은 같은 건가요?', a: R`<p>아니다. 배열 이름은 대부분의 식에서 첫 원소의 주소로 바뀌어 포인터처럼 쓰이지만, 배열은 원소들이 놓인 메모리 블록 자체이고 포인터는 주소를 담는 변수다. 그래서 sizeof(배열)은 전체 크기, sizeof(포인터)는 주소 크기이고, 배열 이름에는 다른 주소를 대입할 수 없다. 함수에 배열을 넘기면 포인터로 바뀌어 크기 정보를 잃는다.</p>` },
      { q: '스택과 힙의 차이는요?', a: R`<p>스택은 함수 호출마다 지역 변수와 매개변수가 쌓였다가 반환하면 자동으로 사라지는 영역으로, 할당이 빠르지만 크기가 작고 수명이 함수에 묶인다. 힙은 malloc이나 new로 필요한 만큼 받아 쓰고 직접 해제하거나 GC가 회수할 때까지 남는 영역으로, 유연하지만 할당이 느리고 해제를 잊으면 누수가 생긴다.</p>` },
    ],
    types: ['C 기초', 'C 포인터', 'C 연산자'],
    links: [
      { to: 'pl-binding', why: '값 전달·주소 전달, static 변수의 수명' },
      { to: 'pl-memory', why: '스택·힙과 직접 관리하는 메모리(malloc/free)' },
      { to: 'ds-array', why: '배열이 연속 메모리라 인덱스 계산이 O(1)' },
      { to: 'ca-number', why: '정수 나눗셈·비트 연산·2의 보수' },
      { to: 'pl-java', why: 'Java는 포인터 대신 참조, 배열 경계 검사와 GC가 있다' },
    ],
    quiz: [
      { q: 'int a[] = {2, 4, 6, 8}; int *p = a + 1; 일 때 *(p + 2)와 *p + 2의 값은?',
        options: ['8과 6', '6과 6', '8과 4', '6과 8'], answer: 0,
        explain: 'p는 a[1]을 가리킨다. *(p + 2)는 두 칸 뒤인 a[3] = 8이다. *p + 2는 역참조를 먼저 해서 a[1] + 2 = 4 + 2 = 6이다.' },
      { q: 'int x = 1, s = 0; switch (x) { case 1: s += 1; case 2: s += 2; break; case 3: s += 3; } 실행 후 s는?',
        options: ['1', '3', '6', '2'], answer: 1,
        explain: 'case 1에서 시작해 break가 없으므로 case 2까지 이어서 실행한다(1 + 2 = 3). case 2 끝의 break에서 멈춰 case 3은 실행되지 않는다.' },
      { q: 'int a = 5, b = 0; if (a &lt; 3 &amp;&amp; ++b) a++; 실행 후 a와 b는?',
        options: ['a = 6, b = 1', 'a = 5, b = 1', 'a = 5, b = 0', 'a = 6, b = 0'], answer: 2,
        explain: 'a &lt; 3이 거짓이라 &amp;&amp; 뒤의 ++b는 실행되지 않고(단락 평가), 조건 전체가 거짓이라 a++도 실행되지 않는다.' },
    ],
    resources: ['『The C Programming Language』(Kernighan & Ritchie) 5장 — 포인터와 배열', '『Expert C Programming』(Peter van der Linden) — 배열과 포인터가 다른 경우들'],
  },
  {
    id: 'pl-java', title: 'Java 코드 읽기: 클래스·상속·예외',
    summary: R`객체는 <code>new</code>로 힙에 생기고, 변수에는 객체가 아니라 <strong>참조</strong>가 담긴다
상속: 생성자는 <strong>부모부터</strong> 실행, 오버라이딩한 메서드는 <strong>실제 객체 타입</strong> 기준(필드는 변수 타입 기준)
<code>==</code>는 같은 객체인지, <code>equals</code>는 내용이 같은지 / try-catch-<strong>finally는 항상 실행</strong>`,
    body: R`
<p>Java 출력 문제는 대부분 "어느 클래스의 무엇이 실행되는가"를 묻는다. 변수의 선언 타입과 실제 객체의 타입을 구분하면 거의 다 풀린다.</p>
<h3>클래스, 객체, 참조</h3>
<ul>
<li><code>Dog d = new Dog();</code>에서 객체는 힙에 생기고, 변수 <code>d</code>에는 그 객체를 가리키는 참조가 담긴다.</li>
<li>기본형(<code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code> 등 8가지)은 값 자체가 변수에 담기고, 나머지(클래스, 배열, <code>String</code>)는 모두 참조형이다.</li>
<li><code>int[] y = x;</code>는 배열을 복사하지 않는다. 두 변수가 같은 배열을 가리키므로 <code>y[1] = 20</code>이 <code>x[1]</code>에도 보인다.</li>
<li>메서드 인자는 Python과 같은 방식으로, 참조를 값으로 복사해 넘긴다.</li>
</ul>
<h3>접근 제어자와 static</h3>
<table><tr><th>제어자</th><th>같은 클래스</th><th>같은 패키지</th><th>자식 클래스</th><th>전체</th></tr>
<tr><td>public</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
<tr><td>protected</td><td>O</td><td>O</td><td>O</td><td>X</td></tr>
<tr><td>(default, 생략)</td><td>O</td><td>O</td><td>X</td><td>X</td></tr>
<tr><td>private</td><td>O</td><td>X</td><td>X</td><td>X</td></tr></table>
<p><code>static</code> 필드는 객체마다가 아니라 <strong>클래스에 하나</strong>다. 생성자에서 <code>count++</code>를 하면 만든 객체 수가 누적된다. <code>static</code> 메서드는 특정 객체 없이 호출하므로 <code>this</code>와 인스턴스 필드를 쓸 수 없다.</p>
<h3>생성자와 상속</h3>
<p>자식 생성자의 첫 줄은 항상 부모 생성자 호출이다. 직접 <code>super(...)</code>를 쓰지 않으면 컴파일러가 <code>super()</code>를 넣는다. 그래서 <code>new Dog()</code>는 Animal 생성자 본문을 먼저 실행하고 Dog 생성자 본문을 실행한다. 같은 클래스의 다른 생성자를 부르는 것은 <code>this(...)</code>다.</p>
<h3>오버라이딩은 실제 객체, 필드는 선언 타입</h3>
<p><code>Animal a = new Dog();</code>처럼 부모 타입 변수가 자식 객체를 가리킬 수 있다(업캐스팅).</p>
<ul>
<li><strong>메서드</strong>: 자식이 오버라이딩했다면 <strong>실제 객체(Dog)의 메서드</strong>가 실행된다. 실행 중에 결정되는 동적 바인딩이다. 부모 클래스 안의 메서드가 <code>sound()</code>를 불러도 Dog의 것이 불린다.</li>
<li><strong>필드</strong>: 자식에 같은 이름 필드를 만들면 덮어쓰는 것이 아니라 가린다(hiding). 어느 필드인지는 <strong>변수의 선언 타입</strong>으로 컴파일 때 정해진다. <code>a.name</code>은 Animal의 name이다. static 메서드도 같은 이유로 선언 타입을 따른다.</li>
<li>부모의 원래 메서드는 자식 안에서 <code>super.sound()</code>로 부른다.</li>
</ul>
<!--diagram-->
<table><tr><th></th><th>오버로딩</th><th>오버라이딩</th></tr>
<tr><td>의미</td><td>같은 이름, 다른 매개변수 목록</td><td>부모 메서드를 같은 시그니처로 재정의</td></tr>
<tr><td>위치</td><td>보통 같은 클래스</td><td>상속 관계의 자식 클래스</td></tr>
<tr><td>결정 시점</td><td>컴파일 시 (인자 타입으로)</td><td>실행 시 (실제 객체로)</td></tr>
<tr><td>주의</td><td>반환형만 다르면 오버로딩이 아니다(컴파일 오류)</td><td>접근 범위를 좁힐 수 없다</td></tr></table>
<h3>추상 클래스와 인터페이스</h3>
<p><code>abstract</code> 메서드는 몸체 없이 선언만 하고, 이를 가진 추상 클래스는 <code>new</code>로 만들 수 없다. 인터페이스는 구현해야 할 메서드 목록이며, 클래스는 하나만 상속(<code>extends</code>)하지만 인터페이스는 여러 개 구현(<code>implements</code>)할 수 있다.</p>
<h3>String</h3>
<ul>
<li>문자열 리터럴은 상수 풀에 하나만 만들어 공유한다. <code>"java" == "java"</code>는 같은 객체라 true다.</li>
<li><code>new String("java")</code>는 새 객체를 만든다. <code>==</code>는 false, 내용을 비교하는 <code>equals</code>는 true다. 문자열 비교에는 항상 <code>equals</code>를 쓴다.</li>
<li>String은 불변이다. <code>s.toUpperCase()</code>는 새 문자열을 돌려줄 뿐 s를 바꾸지 않는다.</li>
<li><code>+</code>는 왼쪽부터 계산한다. <code>"a" + 1 + 2</code>는 <code>"a12"</code>, <code>1 + 2 + "a"</code>는 <code>"3a"</code>다.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 560 230" width="560"><text x="80" y="22" class="sm">스택</text><text x="370" y="22" class="sm">힙</text><rect class="n" x="40" y="50" width="80" height="34" rx="4"/><text x="80.0" y="67.0">a</text><rect class="n" x="40" y="100" width="80" height="34" rx="4"/><text x="80.0" y="117.0">b</text><rect class="n" x="40" y="150" width="80" height="34" rx="4"/><text x="80.0" y="167.0">c</text><rect class="n" x="200" y="34" width="340" height="186" rx="6" fill="none"/><rect class="g d" x="220" y="48" width="150" height="90" rx="6"/><text x="295" y="64" class="sm">String Pool</text><rect class="h" x="250" y="80" width="90" height="36" rx="4"/><text x="295.0" y="98.0">"hi"</text><rect class="n" x="420" y="150" width="90" height="36" rx="4"/><text x="465.0" y="168.0">"hi"</text><text x="465" y="200" class="sm">new로 만든 객체</text><path class="a" d="M120,67 L248,94"/><path class="a" d="M120,167 L248,106"/><path class="a" d="M120,117 C300,150 330,168 418,168"/></svg><figcaption>String a = "hi"; String b = new String("hi"); String c = "hi"; 일 때. a와 c는 상수 풀의 같은 객체라 a == c는 true, b는 별도 객체라 a == b는 false다. 내용을 비교하는 a.equals(b)는 true다.</figcaption></figure>
<h3>예외 처리</h3>
<p><code>try</code>에서 예외가 나면 맞는 <code>catch</code>로 건너뛰고, <code>finally</code>는 예외 여부와 상관없이, <code>try</code> 안에 <code>return</code>이 있어도 실행된다. 컴파일러가 처리를 강제하는 checked 예외(<code>IOException</code> 등)와 강제하지 않는 unchecked 예외(<code>RuntimeException</code>의 자식: <code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>)가 있다. C와 달리 배열 범위를 벗어나면 조용히 메모리를 망가뜨리지 않고 예외가 난다.</p>
<!--code-->`,
    analogy: R`<p>"동물"이라고 적힌 목줄(변수 타입)을 개(실제 객체)에게 채웠다고 하자. "소리 내!"라고 하면 개는 멍 하고 짖는다. 행동(메서드)은 실제 동물이 정한다. 하지만 목줄에 붙은 이름표(필드)를 읽으면 목줄에 적힌 것이 보인다. 목줄 종류는 할 수 있는 명령의 목록을 정할 뿐, 누가 어떻게 수행할지는 정하지 않는다.</p>`,
    diagram: { caption: 'Animal a = new Dog(); 일 때. 변수 a의 선언 타입은 Animal이지만 가리키는 객체는 Dog다. a.sound()는 실행 중에 실제 객체의 클래스(Dog)에서 메서드를 찾는다(동적 바인딩).', svg: R`
<svg viewBox="0 0 540 225" width="540">
<text x="75" y="95" class="sm">Animal a</text>
<rect class="n" x="20" y="105" width="110" height="40" rx="5"/><text x="75" y="125" class="sm">참조</text>
<path class="ha" d="M130,125 H188"/>
<rect class="h" x="190" y="100" width="120" height="50" rx="6"/><text x="250" y="118" class="sm">Dog 객체 (힙)</text><text x="250" y="136" class="sm">name 필드 2개</text>
<rect class="n" x="390" y="20" width="140" height="60" rx="5"/><text x="460" y="35" class="sm">Animal</text><path class="e" d="M390,48 H530"/><text x="460" y="64" class="sm">sound() → "..."</text>
<rect class="n" x="390" y="130" width="140" height="60" rx="5"/><text x="460" y="145" class="sm">Dog extends Animal</text><path class="e" d="M390,158 H530"/><text x="460" y="174" class="sm">sound() → "멍" (재정의)</text>
<path class="a" d="M460,128 V82"/><text x="468" y="105" class="st sm">상속</text>
<path class="a d" d="M310,132 L388,158"/><text x="342" y="128" class="sm">실제 타입</text>
<text x="270" y="212" class="sm">a.sound() → Dog의 sound() 실행 → "멍"   ·   a.name → 선언 타입 Animal의 필드</text>
</svg>` },
    code: R`
class Animal {
    String name = "동물";
    static int count = 0;                    // 클래스에 하나: 모든 객체가 공유

    Animal() {
        count++;
        System.out.print("A");               // 자식 생성자보다 먼저 실행된다
    }
    String sound() { return "..."; }
    String hello() { return name + ": " + sound(); }   // sound()는 실제 객체 타입 기준
}

class Dog extends Animal {
    String name = "개";                      // 필드는 재정의가 아니라 '가림'
    Dog() {
        super();                             // 생략해도 컴파일러가 넣는다
        System.out.print("D");
    }
    @Override
    String sound() { return "멍"; }
}

public class Main {
    static int add(int a, int b) { return a + b; }            // 오버로딩: 매개변수가 다르다
    static double add(double a, double b) { return a + b; }

    static int test() {
        try {
            return 1;
        } finally {
            System.out.println("finally는 return 전에 실행");
        }
    }

    public static void main(String[] args) {
        Animal a = new Dog();                // 생성자 출력: AD
        System.out.println();
        System.out.println(a.sound());       // 멍 (메서드: 실제 객체 타입 Dog)
        System.out.println(a.name);          // 동물 (필드: 변수 타입 Animal)
        System.out.println(a.hello());       // 동물: 멍
        new Animal(); new Dog();             // A, AD
        System.out.println(" count=" + Animal.count);   // 3

        String s1 = "java", s2 = "java", s3 = new String("java");
        System.out.println((s1 == s2) + " " + (s1 == s3) + " " + s1.equals(s3));   // true false true

        int[] x = {1, 2, 3};
        int[] y = x;                         // 배열도 객체: 참조만 복사
        y[1] = 20;
        System.out.println(x[1]);            // 20

        System.out.println(add(1, 2) + " " + add(1.5, 2));   // 3 3.5 (컴파일 시 어느 add인지 결정)
        System.out.println("a" + 1 + 2 + " " + (1 + 2 + "a"));  // a12 3a (왼쪽부터 계산)
        System.out.println(7 / 2 + " " + (-7 / 2) + " " + 7 % -3);   // 3 -3 1

        System.out.println(test());          // finally 출력 후 1
        try {
            int[] z = new int[2];
            z[2] = 1;                        // 배열 경계 검사 → 예외
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("잡힘: " + e.getMessage());
        }
    }
}
`,
    lang: 'java',
    points: [
      R`기본형 8가지(byte short int long float double char boolean)는 값, 나머지는 참조`,
      R`생성자: 자식 생성자 첫 줄에 super()가 숨어 있어 부모 생성자가 먼저 실행`,
      R`Animal a = new Dog(): 오버라이딩한 메서드는 실제 객체(Dog), 필드·static 메서드는 선언 타입(Animal)`,
      R`static 필드는 클래스에 하나라 모든 객체가 공유`,
      R`==는 같은 객체인가, equals는 내용이 같은가. 리터럴은 상수 풀에서 공유`,
      R`finally는 예외가 나도, try 안에 return이 있어도 실행. checked 예외는 처리 강제`,
    ],
    interview: [
      { q: '추상 클래스와 인터페이스의 차이는요?', a: R`<p>추상 클래스는 공통 필드와 구현된 메서드를 가질 수 있고 하나만 상속할 수 있어, 밀접한 is-a 관계의 공통 부분을 물려줄 때 쓴다. 인터페이스는 구현해야 할 메서드 목록, 즉 역할의 계약이고 여러 개를 구현할 수 있다. 둘 다 new로 직접 만들 수 없다.</p>` },
      { q: '==와 equals의 차이는요?', a: R`<p>==는 참조형에서 두 변수가 같은 객체를 가리키는지 비교하고, equals는 클래스가 정의한 기준으로 내용이 같은지 비교한다. 문자열 리터럴은 상수 풀에서 공유되어 ==가 우연히 true일 수 있지만, new String으로 만든 객체와는 false가 되므로 문자열 비교는 항상 equals로 한다.</p>` },
    ],
    types: ['Java'],
    links: [
      { to: 'pl-oop', why: '캡슐화·상속·다형성의 개념' },
      { to: 'pl-binding', why: '오버로딩 = 정적 바인딩, 오버라이딩 = 동적 바인딩' },
      { to: 'pl-solid', why: '인터페이스에 의존하는 설계(DIP)' },
      { to: 'pl-memory', why: '힙의 객체를 GC가 회수한다' },
      { to: 'pl-c', why: 'C의 포인터와 Java 참조의 차이' },
    ],
    quiz: [
      { q: 'class P { P() { print("P"); } } class Q extends P { Q() { print("Q"); } } 에서 new Q()의 출력은?',
        options: ['Q', 'PQ', 'QP', 'P'], answer: 1,
        explain: 'Q 생성자의 첫 줄에 컴파일러가 super()를 넣으므로 P 생성자가 먼저 실행된다.' },
      { q: 'Animal a = new Dog(); 에서 Dog가 sound()를 오버라이딩하고 name 필드도 새로 선언했다. a.sound()와 a.name은 각각 어느 클래스의 것인가?',
        options: ['둘 다 Animal의 것', 'sound()는 Dog, name은 Animal', '둘 다 Dog의 것', 'sound()는 Animal, name은 Dog'], answer: 1,
        explain: '메서드는 실행 중 실제 객체 타입으로 결정되고(동적 바인딩), 필드는 컴파일 때 선언 타입으로 결정된다(가림).' },
      { q: 'String a = "hi"; String b = new String("hi"); 일 때 a == b와 a.equals(b)는?',
        options: ['true, true', 'false, true', 'true, false', 'false, false'], answer: 1,
        explain: 'new는 상수 풀과 별개의 새 객체를 만들어 참조가 다르다(==는 false). 내용은 같으므로 equals는 true다.' },
    ],
    resources: ['『Java의 정석』(남궁성) 6~8장 — 객체지향, 예외 처리', '『Effective Java』(Joshua Bloch) 3판 — 아이템 10(equals), 18(상속보다 컴포지션)'],
  },
  {
    id:'pl-python', title: 'Python 코드 읽기: 슬라이싱·컬렉션·문자열',
    summary: R`<strong>슬라이싱</strong> a[시작:끝:간격]은 끝을 포함하지 않고, 음수 인덱스는 뒤에서 센다
<strong>sort()</strong>는 제자리 정렬 후 None, <strong>sorted()</strong>는 새 리스트. 메서드가 무엇을 돌려주는지가 함정의 대부분
<strong>//</strong>는 내림 나눗셈(−7 // 2 = −4), <strong>**</strong>는 오른쪽부터 계산, 기본값 리스트는 호출 사이에 공유된다`,
    body: R`
<p>정보처리기사 실기와 코딩 면접에서는 짧은 Python 코드를 주고 출력값을 묻는다. 문법 자체는 쉽지만, 어떤 연산이 새 객체를 만들고 어떤 연산이 원래 객체를 바꾸는지, 무엇을 돌려주는지를 정확히 알아야 한다.</p>
<h3>인덱싱과 슬라이싱</h3>
<p>a = [10, 20, 30, 40, 50, 60]이면 a[0]은 10, a[-1]은 60이다. 슬라이스 a[i:j:k]는 i부터 j <strong>직전</strong>까지 k칸씩 건너뛴다. 생략하면 시작은 처음, 끝은 마지막, 간격은 1이다.</p>
<table>
<tr><th>식</th><th>결과</th><th>읽는 법</th></tr>
<tr><td>a[1:4]</td><td>[20, 30, 40]</td><td>인덱스 1, 2, 3 (4는 제외)</td></tr>
<tr><td>a[-2:]</td><td>[50, 60]</td><td>뒤에서 두 번째부터 끝까지</td></tr>
<tr><td>a[::2]</td><td>[10, 30, 50]</td><td>처음부터 두 칸씩</td></tr>
<tr><td>a[::-1]</td><td>[60, 50, …, 10]</td><td>뒤집기</td></tr>
<tr><td>a[4:1:-1]</td><td>[50, 40, 30]</td><td>4에서 거꾸로, 1은 제외</td></tr>
</table>
<!--diagram-->
<p>슬라이스는 범위를 벗어나도 오류가 나지 않고 빈 리스트나 잘린 결과를 준다. 반면 a[10]처럼 인덱스 하나로 범위를 벗어나면 IndexError다. 문자열과 튜플도 똑같이 슬라이싱되며, 'python'[1:4]는 'yth'다.</p>
<h3>리스트: 바꾸는 메서드와 새로 만드는 함수</h3>
<ul>
<li><strong>append(x)</strong>는 x 하나를 끝에 넣고, <strong>extend(iter)</strong>는 원소들을 풀어서 넣는다. [1].append([2, 3])은 [1, [2, 3]], extend면 [1, 2, 3]이다.</li>
<li><strong>insert(i, x)</strong>는 i 위치에 끼운다. <strong>pop()</strong>은 마지막을 꺼내 돌려주고, <strong>pop(i)</strong>는 i번째를 꺼낸다. <strong>remove(x)</strong>는 값이 x인 첫 원소를 지우고 None을 돌려준다.</li>
<li><strong>sort()</strong>와 <strong>reverse()</strong>는 리스트를 제자리에서 바꾸고 <strong>None</strong>을 돌려준다. 그래서 print(s.sort())는 None을 찍는다. 새 리스트가 필요하면 <strong>sorted(s)</strong>, reversed(s)를 쓴다.</li>
<li>+는 새 리스트를 만들고, +=는 기존 리스트를 바꾼다. [0] * 3은 [0, 0, 0]이지만 [[0]] * 3은 같은 안쪽 리스트를 세 번 가리킨다.</li>
<li>b = a는 이름만 하나 더 붙이므로 b를 고치면 a도 바뀐다. a[:], list(a), a.copy()는 새 리스트다(얕은 복사).</li>
</ul>
<h3>딕셔너리와 집합</h3>
<ul>
<li>d[k]는 키가 없으면 KeyError, <strong>d.get(k, 기본값)</strong>은 기본값(생략 시 None)을 준다.</li>
<li>d.keys(), d.values(), d.items()는 넣은 순서대로 나온다(Python 3.7부터 보장). d.pop(k)는 값을 돌려주며 지운다.</li>
<li>for k in d는 키를 돈다. 값까지 필요하면 for k, v in d.items().</li>
<li>집합은 중복을 없애고 순서가 없다. <strong>&</strong> 교집합, <strong>|</strong> 합집합, <strong>-</strong> 차집합, <strong>^</strong> 대칭차집합. set('banana')는 {'b', 'a', 'n'} 세 원소다.</li>
</ul>
<h3>문자열</h3>
<p>문자열은 불변이라 메서드가 항상 새 문자열을 돌려준다. s.upper()를 호출해도 s 자체는 그대로다.</p>
<ul>
<li>s.split()은 공백 기준으로 나눠 리스트를, '-'.join(리스트)는 이어 붙인 문자열을 준다.</li>
<li>s.find(x)는 처음 나오는 위치, 없으면 −1. s.index(x)는 없으면 ValueError. s.count(x)는 개수.</li>
<li>s.replace(a, b), s.strip()(양끝 공백 제거), s.startswith(x), s.isdigit().</li>
<li>포맷팅: f"{3.14159:.2f}"는 '3.14', f"{7:>4}"는 오른쪽 정렬 4칸 '   7', f"{'ok':&lt;4}"는 'ok  '. 옛 방식 '%d-%s' % (5, 'x')는 '5-x'.</li>
<li>'ab' * 3은 'ababab', 'a' &lt; 'b' &lt; 'B'는 False다. 대문자의 코드값(65~)이 소문자(97~)보다 작기 때문이다.</li>
</ul>
<h3>연산자</h3>
<ul>
<li><strong>/</strong>는 항상 실수(7 / 2 = 3.5, 4 / 2 = 2.0), <strong>//</strong>는 내림 나눗셈이다. 음수에서 C·Java와 다르다: −7 // 2는 −4, −7 % 2는 1이다. 몫을 아래로 내리고 나머지는 나누는 수와 같은 부호가 된다.</li>
<li><strong>**</strong>는 오른쪽부터 묶는다: 2 ** 3 ** 2 = 2 ** 9 = 512. 또 −2 ** 2는 −4다(거듭제곱이 단항 −보다 먼저).</li>
<li>and·or는 True/False가 아니라 <strong>마지막으로 평가한 값</strong>을 돌려준다. 0 or 'x'는 'x', 3 and 0은 0.</li>
<li>비교는 이어 쓸 수 있다: 1 &lt; x &lt; 5는 1 &lt; x and x &lt; 5와 같다.</li>
<li>++ 연산자는 없다. ++x는 +(+x)로 해석되어 x 그대로다.</li>
</ul>
<table><tr><th>식</th><th>Python (아래로 내림)</th><th>C·Java (0 쪽으로 버림)</th></tr>
<tr><td>7 // 2, 7 % 2</td><td>3, 1</td><td>3, 1</td></tr>
<tr><td>-7 // 2, -7 % 2</td><td>-4, 1</td><td>-3, -1</td></tr>
<tr><td>7 // -2, 7 % -2</td><td>-4, -1</td><td>-3, 1</td></tr>
<tr><td>-7 // -2, -7 % -2</td><td>3, -1</td><td>3, -1</td></tr></table>
<p>두 방식 모두 <code>(a // b) * b + a % b == a</code>를 만족한다(C·Java는 //를 /로). 몫을 정하는 방법이 다르니 나머지도 따라 달라진다. Python의 나머지는 나누는 수와 부호가 같고, C·Java의 나머지는 나눠지는 수와 부호가 같다.</p>
<h3>반복과 컴프리헨션</h3>
<ul>
<li>range(a, b, k)는 b를 포함하지 않는다. range(5, 0, -2)는 5, 3, 1.</li>
<li>enumerate(s, 1)은 (1, 첫 원소)부터, zip(a, b)는 짧은 쪽에 맞춰 짝짓는다.</li>
<li>[x * x for x in range(6) if x % 2]는 홀수만 골라 [1, 9, 25]. {k: len(k) for k in …}는 딕셔너리, {x % 3 for x in …}는 집합 컴프리헨션이다.</li>
<li>for 뒤의 <strong>else</strong>는 break 없이 끝까지 돌았을 때만 실행된다.</li>
</ul>
<h3>함수</h3>
<ul>
<li><strong>기본값은 함수를 정의할 때 한 번만</strong> 계산된다. def f(n, acc=[])는 호출마다 같은 리스트를 써서, f(1) 다음 f(2)는 [1, 2]를 돌려준다. 기본값이 필요하면 acc=None으로 두고 함수 안에서 새로 만든다.</li>
<li>*args는 남는 위치 인자를 튜플로, **kwargs는 남는 키워드 인자를 딕셔너리로 받는다. 호출할 때 f(*[1, 2])는 리스트를 풀어서 넘긴다.</li>
<li>return이 없으면 None을 돌려준다.</li>
<li>함수 안에서 바깥 변수에 대입하면 지역 변수가 새로 생긴다. 바깥 것을 바꾸려면 global이나 nonlocal이 필요하다.</li>
<li>언패킹: x, *rest = (1, 2, 3, 4)이면 x는 1, rest는 [2, 3, 4](리스트). a, b = b, a로 값을 맞바꾼다.</li>
</ul>
<h3>클래스</h3>
<p>메서드의 첫 인자 self는 호출한 객체다. __init__은 생성자, __str__은 print할 때 쓰이는 문자열이다. 자식 클래스가 같은 이름의 메서드를 정의하면 오버라이딩되고, super().메서드()로 부모 것을 부른다. 클래스 본문에 바로 쓴 변수는 모든 객체가 공유하는 클래스 변수이고, self.x로 대입한 것은 그 객체만의 인스턴스 변수다. 객체에서 self.cnt += 1을 하면 클래스 변수가 바뀌지 않고 같은 이름의 인스턴스 변수가 새로 생긴다.</p>
<h3>풀이 요령</h3>
<p>출력 문제는 변수 표를 그리며 한 줄씩 따라간다. 특히 (1) 이 연산이 원본을 바꾸는가, (2) 무엇을 돌려주는가(None인가), (3) 두 이름이 같은 객체를 가리키는가를 매 줄 확인한다. print의 sep(기본 공백)와 end(기본 줄바꿈) 인자도 출력 모양을 바꾼다.</p>
<!--code-->`,
    analogy: R`<p>슬라이스는 줄자로 길이를 재는 것과 같다. 눈금 1에서 4까지 재면 그 사이 칸은 3개다. 인덱스를 칸이 아니라 칸 사이의 눈금으로 생각하면 a[1:4]에 원소가 세 개뿐인 이유와 a[:3] + a[3:]이 원래 리스트가 되는 이유가 한눈에 보인다.</p>`,
    diagram: { caption: '인덱스를 칸 사이의 눈금으로 보면 슬라이스가 쉽다. a[1:4]는 눈금 1과 4 사이의 세 칸이고, 음수는 끝에서부터 센 눈금이다.', svg: R`
<svg viewBox="0 0 560 200" width="560">
<text x="20" y="90" class="st">a =</text>
<rect class="n" x="70" y="70" width="70" height="40"/><text x="105" y="90">10</text>
<rect class="h" x="140" y="70" width="70" height="40"/><text x="175" y="90">20</text>
<rect class="h" x="210" y="70" width="70" height="40"/><text x="245" y="90">30</text>
<rect class="h" x="280" y="70" width="70" height="40"/><text x="315" y="90">40</text>
<rect class="n" x="350" y="70" width="70" height="40"/><text x="385" y="90">50</text>
<rect class="n" x="420" y="70" width="70" height="40"/><text x="455" y="90">60</text>
<text x="70" y="55" class="sm">0</text><text x="140" y="55" class="sm">1</text><text x="210" y="55" class="sm">2</text><text x="280" y="55" class="sm">3</text><text x="350" y="55" class="sm">4</text><text x="420" y="55" class="sm">5</text><text x="490" y="55" class="sm">6</text>
<text x="70" y="128" class="sm">−6</text><text x="140" y="128" class="sm">−5</text><text x="210" y="128" class="sm">−4</text><text x="280" y="128" class="sm">−3</text><text x="350" y="128" class="sm">−2</text><text x="420" y="128" class="sm">−1</text>
<text x="20" y="55" class="st sm">눈금</text><text x="20" y="128" class="st sm">음수</text>
<path class="he" d="M140,150 V160 H350 V150"/>
<text x="245" y="178">a[1:4] = [20, 30, 40]</text>
<path class="e d" d="M350,150 V160 H490 V150"/>
<text x="420" y="178" class="sm">a[-2:] = [50, 60]</text>
</svg>` },
    code: R`
a = [10, 20, 30, 40, 50, 60]
print(a[1:4], a[-2:], a[::2], a[::-1])  # 슬라이싱: [시작:끝:간격], 끝은 포함하지 않는다
print(a[4:1:-1])                         # 거꾸로 셀 때도 끝은 제외

b = a                                    # 같은 리스트를 가리키는 이름이 하나 더
c = a[:]                                 # 슬라이스는 새 리스트(얕은 복사)
b.append(70)
print(len(a), len(c))

s = [3, 1, 2]
print(s.sort(), s, sorted(s, reverse=True))  # sort는 제자리 정렬하고 None을 돌려준다

d = {'x': 1, 'y': 2}
d['z'] = d.get('w', 0) + 5
print(list(d.items()), d.pop('x'), d)

print({1, 2, 3} & {2, 3, 4}, {1, 2} | {5}, {1, 2, 3} - {2})

word = 'algorithm'
print(word[2:5].upper(), word.find('o'), word.count('r'), '-'.join(['a', 'b', 'c']))
print(f"{3.14159:.2f}|{7:>4}|{'ok':<4}|", '%d-%s' % (5, 'x'))

print([x * x for x in range(6) if x % 2], {k: len(k) for k in ['ab', 'cde']})

def f(n, acc=[]):                        # 기본값 리스트는 함수를 정의할 때 한 번만 만들어진다
  acc.append(n)
  return acc
f(1)
print(f(2))

x, *rest = (1, 2, 3, 4)
print(x, rest, 7 // 2, -7 // 2, 7 % 3, 2 ** 3 ** 2)
`,
    lang: 'python',
    points: [
      R`a[i:j:k]는 j를 포함하지 않는다. 슬라이스는 범위를 벗어나도 오류가 없고, 인덱스 하나는 IndexError`,
      R`sort(), reverse(), append()는 제자리 변경 후 None. sorted()는 새 리스트`,
      R`// 는 아래로 내림: -7 // 2 = -4, -7 % 2 = 1. ** 는 오른쪽부터: 2 ** 3 ** 2 = 512`,
      R`and·or는 마지막으로 평가한 값을 돌려준다. 0 or "x"는 "x"`,
      R`기본 인자 리스트는 호출 사이에 공유. 클래스 변수는 공유, self.x는 인스턴스별`,
      R`for-else의 else는 break 없이 끝났을 때만 실행`,
    ],
    interview: [
      { q: '리스트와 튜플의 차이는요?', a: R`<p>리스트는 가변이라 원소를 추가·삭제·변경할 수 있고, 튜플은 불변이라 만든 뒤 바꿀 수 없다. 튜플은 불변이어서 원소가 모두 해시 가능하면 딕셔너리 키로 쓸 수 있고, 함수의 여러 반환값이나 바뀌면 안 되는 레코드를 표현하는 데 쓴다.</p>` },
      { q: 'sort()와 sorted()의 차이는요?', a: R`<p>sort()는 리스트 메서드로 원래 리스트를 제자리에서 정렬하고 None을 돌려준다. sorted()는 내장 함수로 아무 이터러블이나 받아 정렬된 새 리스트를 돌려주고 원본은 그대로 둔다. 그래서 print(s.sort())는 None을 출력한다.</p>` },
    ],
    types: ['Python'],
    links: [
      { to: 'pl-object', why: '변수는 이름표다: b = a가 복사가 아닌 이유' },
      { to: 'pl-mutable', why: '리스트는 가변, 문자열·튜플은 불변' },
      { to: 'pl-copy', why: 'a[:]는 얕은 복사라 안쪽 리스트는 공유된다' },
      { to: 'pl-c', why: 'C 코드 읽기와 비교: 정수 나눗셈과 % 부호가 다르다' },
      { to: 'pl-java', why: 'Java 코드 읽기: 같은 유형의 출력 문제' },
    ],
    quiz: [
      { q: 's = [5, 2, 8]일 때 print(s.sort())의 출력은?',
        options: ['[2, 5, 8]', 'None', '[8, 5, 2]', '[5, 2, 8]'], answer: 1,
        explain: 'sort()는 리스트를 제자리에서 정렬하고 None을 돌려준다. 정렬 후 s는 [2, 5, 8]이 되지만 print가 받은 값은 sort()의 반환값이다.' },
      { q: "t = 'database'일 때 t[-4:] + t[1:3]의 값은?",
        options: ["'baseat'", "'basedat'", "'abaseat'", "'asebat'"], answer: 0,
        explain: "t[-4:]는 뒤에서 네 글자 'base', t[1:3]은 인덱스 1, 2인 'at'. 합치면 'baseat'이다." },
      { q: 'print(-9 // 4, -9 % 4)의 출력은?',
        options: ['-2 -1', '-3 -1', '-2 3', '-3 3'], answer: 3,
        explain: 'Python의 //는 내림이라 −2.25를 −3으로 내린다. 나머지는 −9 − (4 × −3) = 3으로, 나누는 수와 같은 부호다. C와 Java에서는 −2, −1이 나온다.' },
    ],
    resources: ['Python 공식 튜토리얼 3~5장 (docs.python.org/ko/3/tutorial)', '『전문가를 위한 파이썬』(Luciano Ramalho) 2~4장'],
  },
];
