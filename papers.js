/* =====================================================================
   논문 읽기: 주마다 한 편. 원본 요약은 papers/<id>.md, 여기는 사이트에 보이는 해설
   논문 객체 형식:
   {
     id: '2017-transformer',  // 주소 #/p/<id>. 퀴즈 오답 키도 'p-<id>:<순번>'이라 배포 후 바꾸지 말 것
     title, authors, venue, week: '2026-10-19',  // week는 읽은 주의 월요일
     arxiv: 'https://...', velog: '',            // velog는 리뷰를 올리면 채운다
     summary: R`줄마다 한 항목`,
     sections: [{ title: '소제목', body: R`HTML` }],  // body에 $수식$, <figure class="diagram"> 사용 가능
     links: [{ to: 'dl-transformer', why: '연결 이유' }],
     quiz: [{ q, options, answer, explain }]
   }
   R`...` 안에는 백틱(`)과 "${" 를 쓰지 말 것.
   ===================================================================== */
const PAPERS = [
  {
    id: '2017-transformer', title: 'Attention Is All You Need', short: 'Transformer',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin (Google Brain · Google Research · 토론토대)',
    venue: 'NeurIPS 2017', week: '2026-10-19',
    arxiv: 'https://arxiv.org/abs/1706.03762', velog: '',
    lead: '순서대로 한 단어씩 읽던 번역 모델을 버리고, 모든 단어가 서로를 한 번에 바라보는 구조를 만든 논문. 지금의 GPT·Claude 같은 LLM이 전부 이 구조 위에 서 있다.',
    summary: R`RNN 없이 <strong>어텐션만으로</strong> 만든 번역 모델 Transformer 제안
모든 단어를 동시에 계산 → GPU를 꽉 채워 <strong>학습이 훨씬 빠름</strong>
어떤 두 단어든 한 단계 만에 연결 → 멀리 떨어진 단어 관계도 잘 잡음
영어→독일어 BLEU 28.4로 당시 최고 기록, 학습 비용은 기존의 몇 분의 1`,
    sections: [
      {
        title: '먼저 알아둘 것: 번역 모델은 무엇을 하나',
        body: R`
<p>이 논문이 풀려는 과제는 <strong>기계 번역</strong>이다. 영어 문장 "I love cats"를 넣으면 독일어 문장 "Ich liebe Katzen"을 내놓는 프로그램을 만드는 것이다. 이렇게 순서가 있는 무언가(문장)를 받아 다른 순서 있는 무언가를 만드는 일을 <strong>시퀀스 변환</strong>이라고 부른다.</p>
<p>컴퓨터는 글자를 그대로 계산하지 못하므로 세 단계를 거친다.</p>
<ol>
<li><strong>토큰으로 자르기</strong>: 문장을 단어나 단어 조각으로 나눈다. "I love cats" → [I] [love] [cats]</li>
<li><strong>숫자 목록(벡터)으로 바꾸기</strong>: 토큰마다 숫자 512개짜리 목록을 붙인다. 이를 <strong>임베딩</strong>이라 한다. 비슷한 뜻의 단어는 비슷한 숫자 목록을 갖도록 학습된다. 예를 들어 [cats] → (0.21, −1.30, 0.05, …)처럼.</li>
<li><strong>인코더와 디코더</strong>: <strong>인코더</strong>가 입력 문장 전체를 읽고 각 단어의 의미를 문맥에 맞게 다듬은 벡터들을 만든다. <strong>디코더</strong>는 그 벡터들을 참고하면서 출력 문장을 한 단어씩 만들어 낸다.</li>
</ol>
<p>이 큰 틀(인코더 → 디코더)은 이 논문 전에도 있었다. 이 논문이 바꾼 것은 <strong>인코더와 디코더 안에서 단어들을 처리하는 방식</strong>이다.</p>`
      },
      {
        title: '그 전에는: RNN이 한 단어씩 읽었다',
        body: R`
<p>2017년 이전 번역 모델의 주류는 <strong>RNN</strong>(순환 신경망, 특히 LSTM)이었다. RNN은 사람이 책을 읽듯 단어를 <strong>왼쪽부터 하나씩</strong> 읽는다. 단어 하나를 읽을 때마다 지금까지 읽은 내용을 요약한 "기억"(은닉 상태)을 갱신하고, 그 기억을 다음 단어로 넘긴다.</p>
<figure class="diagram"><svg viewBox="0 0 640 350" width="640">
<text x="20" y="18" class="st">RNN: 앞 단어 계산이 끝나야 다음 단어를 계산할 수 있다</text>
<rect class="h" x="65" y="45" width="90" height="34" rx="6"/><text x="110" y="62">기억 1</text>
<rect class="h" x="205" y="45" width="90" height="34" rx="6"/><text x="250" y="62">기억 2</text>
<rect class="h" x="345" y="45" width="90" height="34" rx="6"/><text x="390" y="62">기억 3</text>
<rect class="h" x="485" y="45" width="90" height="34" rx="6"/><text x="530" y="62">기억 4</text>
<path class="ha" d="M155,62 H203"/><path class="ha" d="M295,62 H343"/><path class="ha" d="M435,62 H483"/>
<path class="a" d="M110,102 V82"/><path class="a" d="M250,102 V82"/><path class="a" d="M390,102 V82"/><path class="a" d="M530,102 V82"/>
<text x="110" y="114">I</text><text x="250" y="114">love</text><text x="390" y="114">my</text><text x="530" y="114">cat</text>
<text x="110" y="136" class="sm">1번째 계산</text><text x="250" y="136" class="sm">2번째 계산</text><text x="390" y="136" class="sm">3번째 계산</text><text x="530" y="136" class="sm">4번째 계산</text>
<text x="20" y="168" class="st">Transformer: 모든 단어가 서로를 한 번에 본다</text>
<path class="he" d="M110,290 Q180,210 250,290"/><path class="he" d="M250,290 Q320,210 390,290"/><path class="he" d="M390,290 Q460,210 530,290"/>
<path class="he" d="M110,290 Q250,150 390,290"/><path class="he" d="M250,290 Q390,150 530,290"/>
<path class="he" d="M110,290 Q320,90 530,290"/>
<rect class="n" x="65" y="290" width="90" height="34" rx="6"/><text x="110" y="307">I</text>
<rect class="n" x="205" y="290" width="90" height="34" rx="6"/><text x="250" y="307">love</text>
<rect class="n" x="345" y="290" width="90" height="34" rx="6"/><text x="390" y="307">my</text>
<rect class="n" x="485" y="290" width="90" height="34" rx="6"/><text x="530" y="307">cat</text>
<text x="320" y="340" class="sm">한 번의 계산으로 모든 단어 쌍을 동시에 처리</text>
</svg><figcaption>위: RNN은 기억을 옆으로 넘기며 차례로 계산한다. 아래: Transformer는 모든 단어 쌍을 한 번에 연결한다.</figcaption></figure>
<p>이 방식에는 두 가지 큰 약점이 있었다.</p>
<h3>약점 1. 느리다</h3>
<p>"기억 3"을 계산하려면 "기억 2"가 있어야 하고, "기억 2"는 "기억 1"이 있어야 한다. 그래서 단어가 100개면 100번을 <strong>차례로</strong> 계산해야 한다. GPU는 수천 개의 계산을 <strong>동시에</strong> 할 수 있는 장치인데, RNN은 그중 일부만 쓰고 나머지는 앞 계산이 끝나기를 기다린다. 일꾼 1,000명을 불러 놓고 한 줄로 세워 한 명씩 일을 시키는 셈이다.</p>
<h3>약점 2. 멀리 있는 단어를 잊는다</h3>
<p>문장 맨 앞 단어의 정보가 맨 뒤까지 가려면 기억을 수십 번 거쳐 전달되어야 한다. 전달될 때마다 조금씩 흐려진다. 귓속말 전달 게임에서 줄이 길수록 처음 말이 바뀌는 것과 같다. "The <strong>animal</strong> that I saw yesterday at the park near my house <strong>was</strong> tired"에서 was가 animal과 이어진다는 것을 알려면 열 단어 넘게 떨어진 정보를 기억해야 한다.</p>
<p>합성곱(CNN)으로 RNN을 대신하려는 시도(ConvS2S, ByteNet)도 있었다. 이들은 병렬 계산은 되지만, 한 번에 가까운 몇 단어만 보므로 먼 단어끼리 연결하려면 층을 여러 겹 쌓아야 했다.</p>
<div class="box"><strong>이 논문의 질문</strong>: 순서대로 읽는 구조를 아예 없애고, <strong>어텐션</strong>만으로 번역 모델을 만들 수 있을까? 그러면 병렬 계산도 되고 먼 단어도 바로 연결될 텐데.</div>`
      },
      {
        title: '핵심 아이디어: 어텐션',
        body: R`
<p><strong>어텐션</strong>(attention, 주의)은 "지금 이 단어를 이해하려면 문장의 다른 단어 중 <strong>어디를 얼마나</strong> 참고해야 하는가"를 숫자로 계산하는 방법이다.</p>
<p>예를 들어 "동물은 길을 건너지 않았다. 그것이 너무 피곤했기 때문이다."에서 "그것이"가 무엇을 가리키는지 알려면 앞 문장의 "동물은"을 봐야 한다. 어텐션은 "그것이"가 각 단어를 얼마나 참고할지 비율을 정하는데, 이 비율의 합은 항상 1(100%)이다.</p>
<figure class="diagram"><svg viewBox="0 0 560 290" width="560">
<text x="20" y="16" class="st">"그것이"가 각 단어를 참고하는 비율 (예시 값, 합 = 1)</text>
<text x="110" y="45" class="en">동물은</text><rect class="h" x="120" y="35" width="208" height="20" rx="3"/><text x="336" y="45" class="st sm">0.52</text>
<text x="110" y="75" class="en">길을</text><rect class="g" x="120" y="65" width="60" height="20" rx="3"/><text x="188" y="75" class="st sm">0.15</text>
<text x="110" y="105" class="en">건너지</text><rect class="g" x="120" y="95" width="16" height="20" rx="3"/><text x="144" y="105" class="st sm">0.04</text>
<text x="110" y="135" class="en">않았다.</text><rect class="g" x="120" y="125" width="12" height="20" rx="3"/><text x="140" y="135" class="st sm">0.03</text>
<text x="110" y="165" class="en">그것이</text><rect class="g" x="120" y="155" width="48" height="20" rx="3"/><text x="176" y="165" class="st sm">0.12</text>
<text x="110" y="195" class="en">너무</text><rect class="g" x="120" y="185" width="12" height="20" rx="3"/><text x="140" y="195" class="st sm">0.03</text>
<text x="110" y="225" class="en">피곤했기</text><rect class="g" x="120" y="215" width="32" height="20" rx="3"/><text x="160" y="225" class="st sm">0.08</text>
<text x="110" y="255" class="en">때문이다.</text><rect class="g" x="120" y="245" width="12" height="20" rx="3"/><text x="140" y="255" class="st sm">0.03</text>
<text x="372" y="45" class="st sm">← "그것이"는 "동물"을 가리킨다</text>
</svg><figcaption>어텐션 가중치. "그것이"의 새 의미는 "동물은"의 정보를 52%, "길을"의 정보를 15% … 섞어서 만든다.</figcaption></figure>
<p>그 결과 "그것이"의 벡터는 "동물"의 정보를 많이 담은 새 벡터로 바뀐다. 이렇게 <strong>한 문장 안의 단어들끼리</strong> 서로 참고하는 것을 <strong>셀프 어텐션</strong>(self-attention)이라고 한다.</p>
<p>중요한 점은 이 계산이 단어마다 독립적이라는 것이다. "그것이"의 비율을 계산할 때 "동물은"의 비율 계산이 끝날 때까지 기다릴 필요가 없다. 그래서 문장의 모든 단어에 대해 <strong>동시에</strong> 계산할 수 있고, 첫 단어와 마지막 단어도 <strong>한 단계 만에</strong> 연결된다. RNN의 두 약점을 한꺼번에 해결한 것이다.</p>
<p>어텐션 자체는 2014년(Bahdanau 등)부터 RNN 번역 모델에 덧붙여 쓰이던 기술이다. 이 논문의 새로움은 제목 그대로 <strong>"어텐션만 있으면 된다"</strong>, 즉 RNN을 완전히 빼고 어텐션만으로 모델 전체를 만든 데 있다.</p>`
      },
      {
        title: '질의·키·값 (Q, K, V): 비율을 어떻게 계산하나',
        body: R`
<p>참고 비율을 계산하기 위해 각 단어는 자기 벡터로부터 세 가지 벡터를 만든다. 도서관에서 책을 찾는 상황에 비유하면 이해가 쉽다.</p>
<table>
<tr><th>이름</th><th>역할</th><th>도서관 비유</th></tr>
<tr><td><strong>질의</strong> Query (Q)</td><td>내가 찾는 것</td><td>검색창에 입력한 검색어</td></tr>
<tr><td><strong>키</strong> Key (K)</td><td>나를 찾을 때 맞춰 볼 표지</td><td>각 책의 제목·태그</td></tr>
<tr><td><strong>값</strong> Value (V)</td><td>실제로 건네줄 내용</td><td>책의 본문</td></tr>
</table>
<p>검색어(Q)를 모든 책의 태그(K)와 비교해 얼마나 잘 맞는지 점수를 매기고, 잘 맞는 책일수록 그 본문(V)을 많이 가져와 섞는다. Q, K, V는 각 단어 벡터에 서로 다른 가중치 행렬을 곱해 만든다. 이 행렬들이 학습으로 정해지는 부분이다.</p>
<h3>숫자로 직접 따라가 보기</h3>
<p>단어 3개짜리 문장 "고양이가 매트에 앉았다"에서 "앉았다"가 누구를 참고할지 계산해 보자. 실제로는 벡터 길이가 64이지만, 여기서는 2로 줄였다($d_k = 2$).</p>
<table>
<tr><th>단어</th><th>키 K</th><th>값 V</th></tr>
<tr><td>고양이가</td><td>(2, 0)</td><td>(1, 0)</td></tr>
<tr><td>매트에</td><td>(0, 1)</td><td>(0, 1)</td></tr>
<tr><td>앉았다</td><td>(1, 0)</td><td>(1, 1)</td></tr>
</table>
<p>"앉았다"의 질의는 Q = (1, 1)이라고 하자.</p>
<ol>
<li><strong>점수 매기기 (내적)</strong>: Q와 각 K의 같은 자리끼리 곱해서 더한다. 방향이 비슷할수록 커진다.
<br>고양이가: 1×2 + 1×0 = <strong>2</strong> · 매트에: 1×0 + 1×1 = <strong>1</strong> · 앉았다: 1×1 + 1×0 = <strong>1</strong></li>
<li><strong>크기 조절</strong>: $\sqrt{d_k} = \sqrt 2 \approx 1.41$로 나눈다. → 1.41, 0.71, 0.71 (이유는 다음 절)</li>
<li><strong>비율로 바꾸기 (소프트맥스)</strong>: 각 점수에 $e^x$를 취한 뒤 전체 합으로 나눠 합이 1이 되게 한다.
<br>$e^{1.41} \approx 4.11$, $e^{0.71} \approx 2.03$, $e^{0.71} \approx 2.03$ → 합 8.17 → 비율 <strong>0.50, 0.25, 0.25</strong></li>
<li><strong>값 섞기</strong>: 비율대로 V를 더한다.
<br>0.50×(1, 0) + 0.25×(0, 1) + 0.25×(1, 1) = <strong>(0.75, 0.50)</strong></li>
</ol>
<p>"앉았다"는 이제 "고양이가"의 정보를 절반 담은 새 벡터 (0.75, 0.50)이 되었다. "누가 앉았는가"라는 정보가 들어간 것이다. 이 네 단계를 한 줄로 쓴 것이 논문의 핵심 수식이다.</p>
$$\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$
<p>여기서 $Q, K, V$는 모든 단어의 질의·키·값을 한 줄씩 쌓은 행렬이고, $QK^\top$는 모든 단어 쌍의 점수를 <strong>행렬 곱 한 번</strong>으로 구한다. GPU가 가장 잘하는 일이 바로 큰 행렬 곱이라 이 계산이 매우 빠르다. 논문은 이것을 <strong>Scaled Dot-Product Attention</strong>(크기 조절한 내적 어텐션)이라고 부른다.</p>`
      },
      {
        title: '왜 점수를 √dₖ로 나눌까',
        body: R`
<p>실제 모델에서 Q와 K는 숫자 64개짜리 벡터다($d_k = 64$). 내적은 64개의 곱을 더한 값이라, 숫자가 많을수록 점수가 커지기 쉽다. 각 숫자가 평균 0, 분산 1인 무작위 값이라면 내적의 분산은 64, 즉 점수가 보통 ±8 정도로 흩어진다.</p>
<p>점수가 크면 소프트맥스가 한 단어에 거의 100%를 몰아준다. 아래는 같은 순서의 점수를 크기만 바꿔 소프트맥스에 넣은 결과다.</p>
<figure class="diagram"><svg viewBox="0 0 600 220" width="600">
<text x="150" y="16">점수 (2, 1, 0.5)</text>
<text x="450" y="16">점수 (16, 8, 4) · 8배</text>
<path class="e" d="M40,180 H260"/><path class="e" d="M340,180 H560"/>
<rect class="h" x="60" y="54" width="44" height="126"/><text x="82" y="44" class="sm">0.63</text>
<rect class="g" x="128" y="134" width="44" height="46"/><text x="150" y="124" class="sm">0.23</text>
<rect class="g" x="196" y="152" width="44" height="28"/><text x="218" y="142" class="sm">0.14</text>
<rect class="h" x="360" y="40" width="44" height="140"/><text x="382" y="30" class="sm">1.00</text>
<rect class="g" x="428" y="179" width="44" height="1"/><text x="450" y="168" class="sm">0.0003</text>
<rect class="g" x="496" y="179" width="44" height="1"/><text x="518" y="168" class="sm">0.000006</text>
<text x="82" y="196" class="sm">A</text><text x="150" y="196" class="sm">B</text><text x="218" y="196" class="sm">C</text>
<text x="382" y="196" class="sm">A</text><text x="450" y="196" class="sm">B</text><text x="518" y="196" class="sm">C</text>
<text x="150" y="212" class="sm">골고루 참고</text><text x="450" y="212" class="sm">A만 보고 나머지는 무시</text>
</svg><figcaption>소프트맥스 출력. 점수가 크면(오른쪽) 한 단어가 비율을 독차지한다.</figcaption></figure>
<p>오른쪽처럼 되면 두 가지 문제가 생긴다. 첫째, 다른 단어 정보를 거의 못 가져온다. 둘째, 학습이 멈춘다. 신경망은 "이 숫자를 조금 바꾸면 결과가 얼마나 좋아지나"(기울기)를 보고 스스로 고치는데, 소프트맥스가 1과 0에 붙어 버리면 숫자를 조금 바꿔도 출력이 거의 안 변해서 기울기가 0에 가까워진다.</p>
<p>그래서 점수를 $\sqrt{d_k} = \sqrt{64} = 8$로 나눠 분산을 다시 1로 되돌린다. 점수가 ±1 정도로 흩어지면 소프트맥스가 왼쪽처럼 적당히 고른 비율을 내고, 학습도 잘 된다. 작은 장치지만 논문이 수식에 이름(<strong>Scaled</strong>)까지 붙인 이유다.</p>`
      },
      {
        title: '멀티헤드 어텐션: 여러 관점으로 동시에 보기',
        body: R`
<p>한 단어가 다른 단어와 맺는 관계는 여러 종류다. "고양이가 매트에 앉았다"에서 "앉았다"는 주어(고양이가)와도, 장소(매트에)와도 관계가 있다. 어텐션 하나로는 이 중 한 가지 관계에 비율이 몰리기 쉽다.</p>
<p>그래서 논문은 어텐션을 <strong>8개</strong> 나란히 돌린다. 각각을 <strong>헤드</strong>(head)라고 부른다. 단어 벡터(512칸)를 8개의 서로 다른 행렬로 각각 64칸짜리 Q, K, V로 바꾸고, 헤드마다 따로 어텐션을 계산한 뒤, 결과 8개(64칸 × 8 = 512칸)를 이어 붙여 다시 한 번 행렬을 곱한다.</p>
<figure class="diagram"><svg viewBox="0 0 680 260" width="680">
<rect class="n" x="20" y="108" width="120" height="44" rx="6"/><text x="80" y="122">단어 벡터</text><text x="80" y="140" class="sm">512칸</text>
<rect class="h" x="230" y="14" width="170" height="22" rx="4"/><text x="315" y="25" class="sm">헤드 1 · 예: 주어-동사</text>
<rect class="h" x="230" y="42" width="170" height="22" rx="4"/><text x="315" y="53" class="sm">헤드 2 · 예: 장소</text>
<rect class="h" x="230" y="70" width="170" height="22" rx="4"/><text x="315" y="81" class="sm">헤드 3 · 예: 바로 앞 단어</text>
<rect class="h" x="230" y="98" width="170" height="22" rx="4"/><text x="315" y="109" class="sm">헤드 4 · 예: 지시 대상</text>
<rect class="h" x="230" y="126" width="170" height="22" rx="4"/><text x="315" y="137" class="sm">헤드 5</text>
<rect class="h" x="230" y="154" width="170" height="22" rx="4"/><text x="315" y="165" class="sm">헤드 6</text>
<rect class="h" x="230" y="182" width="170" height="22" rx="4"/><text x="315" y="193" class="sm">헤드 7</text>
<rect class="h" x="230" y="210" width="170" height="22" rx="4"/><text x="315" y="221" class="sm">헤드 8</text>
<path class="a" d="M140,130 L228,25"/><path class="a" d="M140,130 L228,53"/><path class="a" d="M140,130 L228,81"/><path class="a" d="M140,130 L228,109"/>
<path class="a" d="M140,130 L228,137"/><path class="a" d="M140,130 L228,165"/><path class="a" d="M140,130 L228,193"/><path class="a" d="M140,130 L228,221"/>
<path class="e" d="M400,25 L470,130"/><path class="e" d="M400,53 L470,130"/><path class="e" d="M400,81 L470,130"/><path class="e" d="M400,109 L470,130"/>
<path class="e" d="M400,137 L470,130"/><path class="e" d="M400,165 L470,130"/><path class="e" d="M400,193 L470,130"/><path class="e" d="M400,221 L470,130"/>
<rect class="n" x="470" y="108" width="90" height="44" rx="6"/><text x="515" y="122">이어 붙이기</text><text x="515" y="140" class="sm">64 × 8 = 512</text>
<path class="a" d="M560,130 H578"/>
<rect class="n" x="580" y="108" width="90" height="44" rx="6"/><text x="625" y="122">행렬 곱</text><text x="625" y="140" class="sm">512칸 출력</text>
<text x="185" y="248" class="sm">헤드마다 다른 행렬로 Q·K·V를 만든다</text>
</svg><figcaption>멀티헤드 어텐션. 헤드별 역할 이름은 이해를 돕기 위한 예시이고, 실제로 무엇을 볼지는 학습이 정한다.</figcaption></figure>
<p>헤드마다 벡터를 64칸으로 줄였기 때문에, 8개를 돌려도 전체 계산량은 512칸짜리 어텐션 하나와 비슷하다. 계산량은 그대로 두고 관점만 8개로 늘린 셈이다. 논문 부록의 시각화를 보면 실제로 어떤 헤드는 문장 구조를, 어떤 헤드는 "its"가 가리키는 대상을 따라가는 등 헤드마다 다른 패턴을 학습했다.</p>`
      },
      {
        title: '순서 정보 넣기: 위치 인코딩',
        body: R`
<p>어텐션에는 치명적인 빈틈이 하나 있다. 단어 순서를 모른다. 위의 계산을 다시 보면 점수는 단어 벡터끼리의 내적일 뿐이라, "개가 사람을 물었다"와 "사람이 개를 물었다"처럼 단어를 뒤섞어도 각 단어가 받는 비율은 그대로다. RNN은 왼쪽부터 읽으니 순서를 저절로 알았지만, 모든 단어를 한꺼번에 보는 Transformer는 따로 알려줘야 한다.</p>
<p>논문의 방법은 각 단어 벡터에 <strong>위치마다 다른 숫자 패턴</strong>을 더하는 것이다. 이 패턴은 주기가 서로 다른 사인·코사인 파동에서 값을 읽어 만든다.</p>
$$PE_{(pos,\,2i)} = \sin\!\left(\frac{pos}{10000^{2i/512}}\right), \qquad PE_{(pos,\,2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/512}}\right)$$
<p>$pos$는 단어의 위치(0, 1, 2, …), $i$는 512칸 중 몇 번째 칸 쌍인지다. 칸 번호가 작으면 파동이 빠르게, 크면 느리게 출렁인다.</p>
<figure class="diagram"><svg viewBox="0 0 640 260" width="640">
<text x="600" y="18" class="en sm">0번 칸: 빠른 파동 (주기 약 6단어)</text>
<path class="he" d="M60,50.0 L63,44.6 L67,39.5 L70,35.0 L74,31.5 L77,29.1 L80,28.1 L84,28.4 L87,30.0 L90,32.9 L94,36.8 L97,41.6 L100,46.9 L104,52.4 L107,57.7 L111,62.6 L114,66.6 L117,69.7 L121,71.5 L124,72.0 L128,71.1 L131,68.9 L134,65.5 L138,61.2 L141,56.1 L144,50.7 L148,45.3 L151,40.1 L154,35.5 L158,31.9 L161,29.4 L165,28.1 L168,28.2 L171,29.7 L175,32.4 L178,36.3 L182,40.9 L185,46.2 L188,51.7 L192,57.0 L195,62.0 L198,66.2 L202,69.4 L205,71.3 L208,72.0 L212,71.3 L215,69.3 L219,66.0 L222,61.8 L225,56.8 L229,51.5 L232,46.0 L236,40.8 L239,36.1 L242,32.3 L246,29.6 L249,28.2 L252,28.1 L256,29.4 L259,32.0 L262,35.7 L266,40.3 L269,45.5 L273,50.9 L276,56.3 L279,61.3 L283,65.7 L286,69.0 L290,71.2 L293,72.0 L296,71.5 L300,69.6 L303,66.5 L306,62.4 L310,57.5 L313,52.2 L316,46.7 L320,41.4 L323,36.7 L327,32.8 L330,29.9 L333,28.3 L337,28.1 L340,29.2 L344,31.6 L347,35.1 L350,39.6 L354,44.7 L357,50.2 L360,55.6 L364,60.7 L367,65.1 L370,68.6 L374,70.9 L377,72.0 L381,71.6 L384,69.9 L387,67.0 L391,63.0 L394,58.2 L398,52.9 L401,47.4 L404,42.1 L408,37.3 L411,33.2 L414,30.2 L418,28.5 L421,28.0 L424,29.0 L428,31.2 L431,34.6 L435,39.0 L438,44.0 L441,49.5 L445,54.9 L448,60.1 L452,64.6 L455,68.2 L458,70.7 L462,71.9 L465,71.7 L468,70.2 L472,67.4 L475,63.6 L478,58.9 L482,53.6 L485,48.2 L489,42.8 L492,37.9 L495,33.7 L499,30.6 L502,28.6 L506,28.0 L509,28.8 L512,30.8 L516,34.1 L519,38.4 L522,43.3 L526,48.7 L529,54.2 L532,59.4 L536,64.0 L539,67.8 L543,70.4 L546,71.8 L549,71.8 L553,70.5 L556,67.9 L560,64.2 L563,59.6 L566,54.4 L570,48.9 L573,43.5 L576,38.5 L580,34.2 L583,30.9 L586,28.8 L590,28.0 L593,28.6 L597,30.5 L600,33.6"/>
<text x="600" y="88" class="en sm">64번 칸: 중간 파동 (주기 약 20단어)</text>
<path class="e" d="M60,120.0 L63,118.3 L67,116.5 L70,114.8 L74,113.2 L77,111.5 L80,110.0 L84,108.4 L87,107.0 L90,105.6 L94,104.4 L97,103.2 L100,102.1 L104,101.2 L107,100.3 L111,99.6 L114,99.0 L117,98.6 L121,98.2 L124,98.1 L128,98.0 L131,98.1 L134,98.3 L138,98.7 L141,99.2 L144,99.8 L148,100.5 L151,101.4 L154,102.4 L158,103.5 L161,104.7 L165,106.0 L168,107.4 L171,108.8 L175,110.4 L178,112.0 L182,113.6 L185,115.3 L188,117.0 L192,118.7 L195,120.5 L198,122.2 L202,123.9 L205,125.6 L208,127.3 L212,128.9 L215,130.5 L219,131.9 L222,133.4 L225,134.7 L229,136.0 L232,137.1 L236,138.1 L239,139.1 L242,139.9 L246,140.6 L249,141.1 L252,141.5 L256,141.8 L259,142.0 L262,142.0 L266,141.9 L269,141.6 L273,141.2 L276,140.7 L279,140.0 L283,139.2 L286,138.3 L290,137.3 L293,136.2 L296,135.0 L300,133.7 L303,132.3 L306,130.8 L310,129.2 L313,127.6 L316,126.0 L320,124.3 L323,122.6 L327,120.8 L330,119.1 L333,117.4 L337,115.6 L340,114.0 L344,112.3 L347,110.7 L350,109.2 L354,107.7 L357,106.3 L360,105.0 L364,103.7 L367,102.6 L370,101.6 L374,100.7 L377,99.9 L381,99.3 L384,98.8 L387,98.4 L391,98.1 L394,98.0 L398,98.0 L401,98.2 L404,98.5 L408,98.9 L411,99.5 L414,100.2 L418,101.0 L421,101.9 L424,103.0 L428,104.1 L431,105.4 L435,106.7 L438,108.1 L441,109.6 L445,111.2 L448,112.8 L452,114.5 L455,116.2 L458,117.9 L462,119.6 L465,121.4 L468,123.1 L472,124.8 L475,126.5 L478,128.1 L482,129.7 L485,131.2 L489,132.7 L492,134.1 L495,135.4 L499,136.6 L502,137.7 L506,138.6 L509,139.5 L512,140.2 L516,140.9 L519,141.3 L522,141.7 L526,141.9 L529,142.0 L532,141.9 L536,141.7 L539,141.4 L543,141.0 L546,140.4 L549,139.6 L553,138.8 L556,137.8 L560,136.8 L563,135.6 L566,134.3 L570,132.9 L573,131.5 L576,130.0 L580,128.4 L583,126.8 L586,125.1 L590,123.4 L593,121.7 L597,119.9 L600,118.2"/>
<text x="600" y="150" class="en sm">128번 칸: 느린 파동 (주기 약 63단어)</text>
<path class="e d" d="M60,190.0 L63,189.5 L67,188.9 L70,188.4 L74,187.8 L77,187.3 L80,186.7 L84,186.2 L87,185.6 L90,185.1 L94,184.6 L97,184.0 L100,183.5 L104,183.0 L107,182.5 L111,181.9 L114,181.4 L117,180.9 L121,180.4 L124,179.9 L128,179.5 L131,179.0 L134,178.5 L138,178.0 L141,177.6 L144,177.1 L148,176.7 L151,176.3 L154,175.8 L158,175.4 L161,175.0 L165,174.6 L168,174.2 L171,173.8 L175,173.5 L178,173.1 L182,172.8 L185,172.4 L188,172.1 L192,171.8 L195,171.5 L198,171.2 L202,170.9 L205,170.6 L208,170.4 L212,170.2 L215,169.9 L219,169.7 L222,169.5 L225,169.3 L229,169.1 L232,169.0 L236,168.8 L239,168.7 L242,168.5 L246,168.4 L249,168.3 L252,168.2 L256,168.2 L259,168.1 L262,168.1 L266,168.0 L269,168.0 L273,168.0 L276,168.0 L279,168.0 L283,168.1 L286,168.1 L290,168.2 L293,168.3 L296,168.4 L300,168.5 L303,168.6 L306,168.7 L310,168.9 L313,169.0 L316,169.2 L320,169.4 L323,169.6 L327,169.8 L330,170.0 L333,170.2 L337,170.5 L340,170.7 L344,171.0 L347,171.3 L350,171.6 L354,171.9 L357,172.2 L360,172.5 L364,172.9 L367,173.2 L370,173.6 L374,174.0 L377,174.3 L381,174.7 L384,175.1 L387,175.5 L391,176.0 L394,176.4 L398,176.8 L401,177.3 L404,177.7 L408,178.2 L411,178.7 L414,179.1 L418,179.6 L421,180.1 L424,180.6 L428,181.1 L431,181.6 L435,182.1 L438,182.6 L441,183.2 L445,183.7 L448,184.2 L452,184.7 L455,185.3 L458,185.8 L462,186.4 L465,186.9 L468,187.4 L472,188.0 L475,188.5 L478,189.1 L482,189.6 L485,190.2 L489,190.7 L492,191.3 L495,191.8 L499,192.4 L502,192.9 L506,193.5 L509,194.0 L512,194.6 L516,195.1 L519,195.6 L522,196.2 L526,196.7 L529,197.2 L532,197.7 L536,198.2 L539,198.7 L543,199.2 L546,199.7 L549,200.2 L553,200.7 L556,201.2 L560,201.7 L563,202.1 L566,202.6 L570,203.0 L573,203.5 L576,203.9 L580,204.3 L583,204.7 L586,205.1 L590,205.5 L593,205.9 L597,206.3 L600,206.6"/>
<path class="e" d="M60,228 H600"/>
<text x="60" y="242" class="sm">0</text><text x="195" y="242" class="sm">10</text><text x="330" y="242" class="sm">20</text><text x="465" y="242" class="sm">30</text><text x="600" y="242" class="sm">40</text>
<text x="330" y="256" class="sm">단어 위치</text>
<path class="e d" d="M195,8 V228"/>
<circle class="fill" cx="195" cy="62" r="4"/><circle class="fill" cx="195" cy="120.5" r="4"/><circle class="fill" cx="195" cy="171.5" r="4"/>
<text x="203" y="78" class="st sm">−0.54</text><text x="203" y="134" class="st sm">−0.02</text><text x="203" y="186" class="st sm">0.84</text>
</svg><figcaption>세 칸의 파동. 10번째 단어(점선)는 각 파동에서 읽은 값 (−0.54, −0.02, 0.84, …)을 위치 표시로 갖는다.</figcaption></figure>
<p>시계를 떠올리면 쉽다. 초침만 보면 1분마다 같은 위치가 반복되지만, 분침과 시침까지 같이 보면 하루 중 모든 시각이 서로 다르게 표시된다. 위치 인코딩도 빠른 파동부터 아주 느린 파동까지 256쌍을 함께 쓰므로 모든 위치가 고유한 패턴을 갖는다.</p>
<p>이 방식의 장점은 두 가지다. 학습할 것이 없어 바로 계산할 수 있고, 위치가 $k$만큼 떨어진 두 단어의 패턴 관계가 위치와 상관없이 일정해서(사인·코사인의 덧셈 정리) 모델이 "몇 칸 앞"이라는 <strong>상대 위치</strong>를 배우기 쉽다. 저자들은 위치마다 벡터를 학습시키는 방식도 시험했는데 성능은 거의 같았고, 학습 때 본 것보다 긴 문장에도 쓸 수 있을 것이라는 기대로 사인 방식을 택했다.</p>`
      },
      {
        title: '전체 구조 한눈에',
        body: R`
<p>지금까지의 부품을 조립하면 Transformer가 된다. 아래 그림은 아래에서 위로 읽는다.</p>
<figure class="diagram"><svg viewBox="0 0 640 610" width="640">
<text x="150" y="590">입력 문장</text><text x="150" y="604" class="sm">I love my cat</text>
<rect class="n" x="60" y="530" width="180" height="34" rx="6"/><text x="150" y="547">임베딩 + 위치 인코딩</text>
<path class="a" d="M150,580 V566"/><path class="a" d="M150,530 V496"/>
<rect class="g" x="45" y="330" width="210" height="182" rx="10"/><text x="58" y="346" class="st sm">인코더 층 × 6</text>
<rect class="h" x="70" y="460" width="160" height="34" rx="6"/><text x="150" y="477">멀티헤드 셀프 어텐션</text>
<rect class="n" x="90" y="428" width="120" height="22" rx="4"/><text x="150" y="439" class="sm">더하기 + 정규화</text>
<rect class="h" x="70" y="380" width="160" height="34" rx="6"/><text x="150" y="397">피드포워드</text>
<rect class="n" x="90" y="352" width="120" height="22" rx="4"/><text x="150" y="363" class="sm">더하기 + 정규화</text>
<path class="a" d="M150,460 V452"/><path class="a" d="M150,428 V416"/><path class="a" d="M150,380 V376"/>
<path class="a d" d="M150,504 H60 V439 H88"/><text x="40" y="472" class="sm">잔차</text>
<path class="ha" d="M150,352 V300 H340 V387 H388"/><text x="245" y="290" class="sm">인코더 출력 (디코더의 키·값으로)</text>
<text x="490" y="590">지금까지 만든 출력</text><text x="490" y="604" class="sm">&lt;시작&gt; Ich liebe</text>
<rect class="n" x="400" y="530" width="180" height="34" rx="6"/><text x="490" y="547">임베딩 + 위치 인코딩</text>
<path class="a" d="M490,580 V566"/><path class="a" d="M490,530 V496"/>
<rect class="g" x="375" y="240" width="230" height="272" rx="10"/><text x="388" y="256" class="st sm">디코더 층 × 6</text>
<rect class="h" x="390" y="460" width="200" height="34" rx="6"/><text x="490" y="477">마스크드 셀프 어텐션</text>
<rect class="n" x="430" y="428" width="120" height="22" rx="4"/><text x="490" y="439" class="sm">더하기 + 정규화</text>
<rect class="h" x="390" y="370" width="200" height="34" rx="6"/><text x="490" y="387">인코더-디코더 어텐션</text>
<rect class="n" x="430" y="340" width="120" height="22" rx="4"/><text x="490" y="351" class="sm">더하기 + 정규화</text>
<rect class="h" x="390" y="292" width="200" height="34" rx="6"/><text x="490" y="309">피드포워드</text>
<rect class="n" x="430" y="262" width="120" height="22" rx="4"/><text x="490" y="273" class="sm">더하기 + 정규화</text>
<path class="a" d="M490,460 V452"/><path class="a" d="M490,428 V406"/><path class="a" d="M490,370 V364"/><path class="a" d="M490,340 V328"/><path class="a" d="M490,292 V286"/>
<path class="a" d="M490,262 V206"/>
<rect class="n" x="400" y="172" width="180" height="34" rx="6"/><text x="490" y="189">선형 + 소프트맥스</text>
<path class="a" d="M490,172 V130"/>
<rect class="h" x="400" y="96" width="180" height="34" rx="6"/><text x="490" y="113">다음 단어 확률</text>
<text x="490" y="74" class="sm">meine 0.91 · mein 0.04 · …</text>
</svg><figcaption>Transformer 전체 구조. 왼쪽 인코더가 입력 문장을 이해하고, 오른쪽 디코더가 그 결과를 참고해 다음 단어를 고른다.</figcaption></figure>
<h3>인코더 (왼쪽)</h3>
<p>입력 단어를 임베딩하고 위치 인코딩을 더한 뒤, 같은 구조의 층을 <strong>6번</strong> 통과시킨다. 각 층은 두 부분이다.</p>
<ul>
<li><strong>멀티헤드 셀프 어텐션</strong>: 단어들이 서로 정보를 주고받는다. (단어 사이의 정보 교환)</li>
<li><strong>피드포워드</strong>: 단어마다 따로, 같은 작은 신경망(512칸 → 2048칸 → 512칸)을 통과시킨다. 어텐션으로 모은 정보를 단어별로 소화하는 단계다. (단어 안의 정보 가공)</li>
</ul>
<p>층을 6번 반복하면 처음에는 "cat"이라는 단어 자체의 뜻만 갖던 벡터가 점점 "이 문장에서 사랑받는 대상인 고양이"라는 문맥까지 담게 된다.</p>
<h3>두 가지 보조 장치: 잔차 연결과 정규화</h3>
<ul>
<li><strong>잔차 연결</strong>(그림의 점선): 각 부분의 출력을 입력에 <strong>더한다</strong>. 즉 $x$를 새 결과로 바꿔치기하지 않고 $x + \text{어텐션}(x)$로 덧붙인다. 원래 정보가 사라지지 않고, 층이 깊어도 학습 신호가 잘 전달된다. 문서를 고칠 때 원본 위에 메모를 덧붙이는 것과 같다.</li>
<li><strong>층 정규화</strong>(LayerNorm): 각 단어 벡터의 숫자들을 평균 0, 분산 1 근처로 맞춘다. 숫자가 층을 지날수록 너무 커지거나 작아지는 것을 막아 학습을 안정시킨다.</li>
</ul>
<h3>디코더 (오른쪽)</h3>
<p>디코더도 6층이고, 층마다 세 부분이 있다.</p>
<ol>
<li><strong>마스크드 셀프 어텐션</strong>: 지금까지 만든 출력 단어끼리 서로 참고한다. 단, 아직 만들지 않은 뒤쪽 단어는 볼 수 없게 가린다(다음 절).</li>
<li><strong>인코더-디코더 어텐션</strong>: 질의는 디코더에서, 키와 값은 인코더 출력에서 가져온다. "다음 독일어 단어를 정하려면 영어 문장의 어디를 봐야 하나"를 계산하는 부분으로, 번역의 핵심이다. "Katze"를 만들 때는 "cat"을 많이 보게 된다.</li>
<li><strong>피드포워드</strong>: 인코더와 같다.</li>
</ol>
<p>마지막으로 디코더 출력을 단어장 크기(약 3만 7천 개)의 점수로 바꾸고 소프트맥스로 확률을 만든다. 가장 확률이 높은 단어(또는 몇 개의 후보)를 다음 단어로 고른다.</p>
<h3>모델 크기</h3>
<table>
<tr><th></th><th>층 수</th><th>벡터 크기</th><th>피드포워드 크기</th><th>헤드 수</th><th>파라미터 수</th></tr>
<tr><td>Transformer (base)</td><td>6</td><td>512</td><td>2048</td><td>8</td><td>6,500만</td></tr>
<tr><td>Transformer (big)</td><td>6</td><td>1024</td><td>4096</td><td>16</td><td>2억 1,300만</td></tr>
</table>
<p>참고로 요즘 LLM은 이보다 수백~수천 배 크지만, 블록 하나의 설계는 거의 그대로다.</p>`
      },
      {
        title: '디코더: 한 단어씩 만들되, 미래는 가린다',
        body: R`
<p>번역 결과를 만들 때 디코더는 단어를 하나씩 만든다. 방금 만든 단어를 다시 입력에 붙여 다음 단어를 만드는 식이다.</p>
<table>
<tr><th>단계</th><th>디코더 입력</th><th>나온 단어</th></tr>
<tr><td>1</td><td>&lt;시작&gt;</td><td>Ich</td></tr>
<tr><td>2</td><td>&lt;시작&gt; Ich</td><td>liebe</td></tr>
<tr><td>3</td><td>&lt;시작&gt; Ich liebe</td><td>meine</td></tr>
<tr><td>4</td><td>&lt;시작&gt; Ich liebe meine</td><td>Katze</td></tr>
<tr><td>5</td><td>&lt;시작&gt; Ich liebe meine Katze</td><td>&lt;끝&gt; → 종료</td></tr>
</table>
<p>그런데 학습할 때는 정답 문장 전체를 알고 있으므로, 이 다섯 단계를 <strong>한 번에</strong> 계산하고 싶다(그래야 빠르다). 문제는 정답 문장을 통째로 넣으면 2단계에서 "liebe"를 맞혀야 하는데 입력에 이미 "liebe"가 보인다는 것이다. 시험지에 답이 적혀 있는 셈이다.</p>
<p>그래서 셀프 어텐션의 점수표에서 <strong>자기보다 뒤에 있는 단어의 칸을 지운다</strong>(점수를 $-\infty$로 두면 소프트맥스 후 비율이 정확히 0이 된다). 이것을 <strong>마스킹</strong>이라고 한다.</p>
<figure class="diagram"><svg viewBox="0 0 420 300" width="420">
<text x="250" y="16" class="sm">참고할 수 있는 단어 (키)</text>
<text x="135" y="40" class="sm">&lt;시작&gt;</text><text x="185" y="40" class="sm">Ich</text><text x="235" y="40" class="sm">liebe</text><text x="285" y="40" class="sm">meine</text><text x="335" y="40" class="sm">Katze</text>
<text x="100" y="75" class="en sm">&lt;시작&gt;</text><text x="100" y="125" class="en sm">Ich</text><text x="100" y="175" class="en sm">liebe</text><text x="100" y="225" class="en sm">meine</text><text x="100" y="275" class="en sm">Katze</text>
<rect class="h" x="110" y="50" width="50" height="50"/><rect class="g" x="160" y="50" width="50" height="50"/><rect class="g" x="210" y="50" width="50" height="50"/><rect class="g" x="260" y="50" width="50" height="50"/><rect class="g" x="310" y="50" width="50" height="50"/>
<rect class="h" x="110" y="100" width="50" height="50"/><rect class="h" x="160" y="100" width="50" height="50"/><rect class="g" x="210" y="100" width="50" height="50"/><rect class="g" x="260" y="100" width="50" height="50"/><rect class="g" x="310" y="100" width="50" height="50"/>
<rect class="h" x="110" y="150" width="50" height="50"/><rect class="h" x="160" y="150" width="50" height="50"/><rect class="h" x="210" y="150" width="50" height="50"/><rect class="g" x="260" y="150" width="50" height="50"/><rect class="g" x="310" y="150" width="50" height="50"/>
<rect class="h" x="110" y="200" width="50" height="50"/><rect class="h" x="160" y="200" width="50" height="50"/><rect class="h" x="210" y="200" width="50" height="50"/><rect class="h" x="260" y="200" width="50" height="50"/><rect class="g" x="310" y="200" width="50" height="50"/>
<rect class="h" x="110" y="250" width="50" height="50"/><rect class="h" x="160" y="250" width="50" height="50"/><rect class="h" x="210" y="250" width="50" height="50"/><rect class="h" x="260" y="250" width="50" height="50"/><rect class="h" x="310" y="250" width="50" height="50"/>
<text x="185" y="75" class="sm">×</text><text x="235" y="75" class="sm">×</text><text x="285" y="75" class="sm">×</text><text x="335" y="75" class="sm">×</text>
<text x="235" y="125" class="sm">×</text><text x="285" y="125" class="sm">×</text><text x="335" y="125" class="sm">×</text>
<text x="285" y="175" class="sm">×</text><text x="335" y="175" class="sm">×</text>
<text x="335" y="225" class="sm">×</text>
<text x="20" y="175" class="st sm">지금</text><text x="20" y="190" class="st sm">위치</text>
</svg><figcaption>디코더 셀프 어텐션의 마스크. 각 행(지금 위치)은 색칠된 칸, 즉 자기와 자기 앞 단어만 참고할 수 있다. ×는 가려진 미래.</figcaption></figure>
<p>이렇게 하면 학습 때는 모든 위치를 한 번에 계산하면서도, 각 위치는 실제 생성할 때와 똑같이 "앞에 나온 단어만 보고 다음 단어를 맞히는" 연습을 하게 된다. 지금의 GPT 같은 LLM도 정확히 이 마스크를 쓴 디코더만으로 만들어져 있다.</p>`
      },
      {
        title: '왜 셀프 어텐션인가: 세 가지 비교',
        body: R`
<p>논문은 셀프 어텐션을 RNN, CNN과 세 가지 기준으로 비교한다($n$은 문장 길이, $d$는 벡터 크기, $k$는 CNN이 한 번에 보는 폭).</p>
<table>
<tr><th>층 종류</th><th>층 하나의 계산량</th><th>차례로 해야 하는 계산 수</th><th>먼 두 단어 사이 거리</th></tr>
<tr><td>셀프 어텐션</td><td>$O(n^2 \cdot d)$</td><td>$O(1)$ · 한 번에</td><td>$O(1)$ · 바로 연결</td></tr>
<tr><td>RNN</td><td>$O(n \cdot d^2)$</td><td>$O(n)$ · 단어 수만큼</td><td>$O(n)$ · 단어 수만큼 거침</td></tr>
<tr><td>CNN</td><td>$O(k \cdot n \cdot d^2)$</td><td>$O(1)$</td><td>$O(\log_k n)$ · 층 여러 개</td></tr>
</table>
<p>$O(\cdot)$ 표기는 "대략 무엇에 비례하는가"를 뜻한다. 각 열의 의미는 이렇다.</p>
<ul>
<li><strong>계산량</strong>: 셀프 어텐션은 모든 단어 쌍($n \times n$)을 계산하므로 $n^2$에 비례하고, RNN은 단어마다 $d \times d$ 행렬을 곱하므로 $d^2$에 비례한다. 번역 문장은 보통 단어 수가 벡터 크기보다 훨씬 작다. 예를 들어 $n = 50$, $d = 512$이면 셀프 어텐션은 약 $50 \times 50 \times 512 \approx$ <strong>128만</strong>, RNN은 약 $50 \times 512 \times 512 \approx$ <strong>1,311만</strong>으로 셀프 어텐션이 10배쯤 싸다.</li>
<li><strong>차례로 해야 하는 계산 수</strong>: 병렬화가 얼마나 잘 되는지. RNN만 문장 길이에 비례한다.</li>
<li><strong>먼 두 단어 사이 거리</strong>: 정보가 몇 단계를 거쳐야 전달되는지. 짧을수록 먼 관계를 배우기 쉽다. 셀프 어텐션은 어떤 두 단어든 한 단계다.</li>
</ul>
<p>반대로 문장이 아주 길어져 $n$이 $d$보다 커지면 $n^2$ 항이 부담이 된다. 이것이 Transformer의 가장 큰 약점으로 남는다(아래 한계 참고).</p>`
      },
      {
        title: '학습 방법',
        body: R`
<h3>데이터와 장비</h3>
<ul>
<li><strong>영어→독일어</strong>: WMT 2014 데이터, 문장 쌍 약 450만 개. 단어를 자주 나오는 조각 단위(BPE)로 잘라 두 언어가 같이 쓰는 단어장 약 3만 7천 개를 만들었다.</li>
<li><strong>영어→프랑스어</strong>: 문장 쌍 약 3,600만 개, 단어장 3만 2천 개.</li>
<li>한 번에 영어 약 2만 5천 토큰, 대응하는 독일어 약 2만 5천 토큰씩 묶어 학습했다.</li>
<li>장비는 NVIDIA P100 GPU 8장 한 대. base 모델은 10만 스텝에 <strong>약 12시간</strong>, big 모델은 30만 스텝에 <strong>3.5일</strong>이 걸렸다.</li>
</ul>
<h3>학습률 워밍업</h3>
<p>학습률은 "한 번에 숫자를 얼마나 크게 고칠지"다. 처음부터 크게 고치면 아직 엉망인 모델이 크게 흔들려 학습이 망가지기 쉽다. 논문은 처음 4,000 스텝 동안 학습률을 0부터 천천히 올리고(<strong>워밍업</strong>), 그 뒤로는 스텝 수의 제곱근에 반비례하게 천천히 줄였다.</p>
$$\text{학습률} = d_{model}^{-0.5} \cdot \min\left(\text{step}^{-0.5},\ \text{step} \cdot 4000^{-1.5}\right)$$
<figure class="diagram"><svg viewBox="0 0 640 240" width="640">
<path class="e" d="M60,200 H600"/><path class="e" d="M60,30 V200"/>
<path class="he" d="M60,200 L61,193 L63,178 L65,163 L68,148 L70,133 L72,118 L74,103 L76,89 L78,74 L81,59 L82,52 L103,95 L125,114 L146,126 L168,134 L190,139 L211,144 L233,148 L254,151 L276,153 L298,155 L319,157 L341,159 L362,160 L384,162 L406,163 L427,164 L449,165 L470,166 L492,167 L514,168 L535,168 L557,169 L578,170 L600,170"/>
<circle class="fill" cx="82" cy="52" r="4"/>
<text x="92" y="44" class="st sm">4,000 스텝에서 최고점 ≈ 0.0007</text>
<text x="60" y="216" class="sm">0</text><text x="330" y="216" class="sm">50,000</text><text x="600" y="216" class="sm">100,000</text>
<text x="330" y="232" class="sm">학습 스텝</text>
<text x="52" y="200" class="en sm">0</text><text x="52" y="30" class="en sm">0.0008</text>
<text x="420" y="150" class="sm">스텝의 제곱근에 반비례해 감소</text>
</svg><figcaption>base 모델($d_{model} = 512$)의 학습률. 빠르게 오른 뒤 천천히 내려간다. 10만 스텝에서는 약 0.00014.</figcaption></figure>
<h3>과적합 막기</h3>
<ul>
<li><strong>드롭아웃</strong>(0.1): 학습 중 각 부분 출력의 10%를 무작위로 0으로 만든다. 특정 경로에만 의존하지 않게 해서 처음 보는 문장에도 잘 작동하게 한다.</li>
<li><strong>라벨 스무딩</strong>(0.1): 정답 단어의 목표 확률을 100%가 아니라 90%로 두고, 나머지 10%를 다른 단어들에 고루 나눈다. 모델이 지나치게 확신하지 않도록 하는 장치다. 논문에 따르면 모델이 덜 확신하게 되어 혼란도(perplexity) 수치는 나빠지지만 번역 품질(BLEU)은 좋아졌다.</li>
</ul>
<h3>번역할 때</h3>
<p>매 단계 확률이 가장 높은 단어 하나만 고르지 않고, 유망한 후보 문장 4개를 동시에 이어 가다가 가장 좋은 것을 고른다(빔 크기 4의 <strong>빔 서치</strong>). 또 학습 마지막 몇 개 시점의 모델 숫자를 평균 내서 최종 모델로 썼다.</p>`
      },
      {
        title: '결과',
        body: R`
<div class="box"><strong>BLEU 점수란</strong>: 기계 번역과 사람이 한 번역이 단어·구절 단위로 얼마나 겹치는지를 0~100으로 매긴 점수. 높을수록 좋다. 이 시기 영어→독일어 번역에서는 1점만 올라도 큰 진전으로 여겨졌다.</div>
<h3>영어→독일어</h3>
<figure class="diagram"><svg viewBox="0 0 620 270" width="620">
<text x="200" y="30" class="en">GNMT+RL (구글 번역)</text><rect class="g" x="210" y="20" width="143" height="20" rx="3"/><text x="361" y="30" class="st sm">24.6</text>
<text x="200" y="60" class="en">ConvS2S (페이스북)</text><rect class="g" x="210" y="50" width="173" height="20" rx="3"/><text x="391" y="60" class="st sm">25.16</text>
<text x="200" y="90" class="en">MoE</text><rect class="g" x="210" y="80" width="221" height="20" rx="3"/><text x="439" y="90" class="st sm">26.03</text>
<text x="200" y="120" class="en">GNMT+RL 앙상블</text><rect class="g" x="210" y="110" width="236" height="20" rx="3"/><text x="454" y="120" class="st sm">26.30</text>
<text x="200" y="150" class="en">ConvS2S 앙상블</text><rect class="g" x="210" y="140" width="239" height="20" rx="3"/><text x="457" y="150" class="st sm">26.36</text>
<text x="200" y="180" class="en">Transformer (base)</text><rect class="h" x="210" y="170" width="291" height="20" rx="3"/><text x="509" y="180" class="st sm">27.3</text>
<text x="200" y="210" class="en">Transformer (big)</text><rect class="h" x="210" y="200" width="351" height="20" rx="3"/><text x="569" y="210" class="st sm">28.4</text>
<path class="e" d="M210,232 H594"/>
<text x="210" y="246" class="sm">22</text><text x="375" y="246" class="sm">25</text><text x="539" y="246" class="sm">28</text>
<text x="402" y="262" class="sm">BLEU (가로축이 22에서 시작)</text>
</svg><figcaption>WMT 2014 영어→독일어 테스트 결과(논문 표 2). 앙상블은 모델 여러 개를 합친 것이다. Transformer는 모델 하나로 앙상블까지 모두 넘었다.</figcaption></figure>
<ul>
<li>big 모델이 <strong>28.4</strong>로, 앙상블을 포함한 기존 최고 기록(26.36)보다 <strong>2점 넘게</strong> 높았다.</li>
<li>작은 base 모델(27.3)도 기존의 모든 모델과 앙상블을 넘었다.</li>
</ul>
<h3>영어→프랑스어</h3>
<p>big 모델이 <strong>41.8</strong>로 단일 모델 최고 기록을 냈다(기존 단일 최고 MoE 40.56, 앙상블 최고 ConvS2S 41.29).</p>
<h3>학습 비용</h3>
<table>
<tr><th>모델</th><th>영→독 BLEU</th><th>학습 계산량 (FLOP)</th></tr>
<tr><td>GNMT+RL</td><td>24.6</td><td>2.3 × 10<sup>19</sup></td></tr>
<tr><td>ConvS2S</td><td>25.16</td><td>9.6 × 10<sup>18</sup></td></tr>
<tr><td>ConvS2S 앙상블</td><td>26.36</td><td>7.7 × 10<sup>19</sup></td></tr>
<tr><td><strong>Transformer (base)</strong></td><td>27.3</td><td><strong>3.3 × 10<sup>18</sup></strong></td></tr>
<tr><td><strong>Transformer (big)</strong></td><td>28.4</td><td>2.3 × 10<sup>19</sup></td></tr>
</table>
<p>FLOP은 컴퓨터가 수행한 덧셈·곱셈 횟수다. base 모델은 GNMT보다 계산을 <strong>7분의 1</strong>만 쓰고도 점수가 2.7점 높았다. 영어→프랑스어에서도 big 모델은 기존 최고 모델 학습 비용의 4분의 1이 안 됐다. "더 좋은데 더 싸다"는 점이 이 구조가 빠르게 퍼진 이유다.</p>
<h3>번역 말고 다른 일에도</h3>
<p>영어 문장의 문법 구조를 분석하는 과제(구문 분석)에도 거의 손대지 않고 적용해 봤다. 학습 데이터가 4만 문장뿐인데도 F1 91.3(추가 데이터를 쓰면 92.7)으로, 이 과제에 특화된 대부분의 기존 모델보다 좋았다. 번역 전용 요령이 아니라 범용 구조라는 첫 증거다.</p>`
      },
      {
        title: '무엇이 중요했나: 부품 바꿔 보기',
        body: R`
<p>저자들은 base 모델의 부품을 하나씩 바꿔 가며 성능이 어떻게 변하는지 쟀다(논문 표 3, 개발용 데이터 기준이라 위 테스트 점수와 숫자가 다르다).</p>
<table>
<tr><th>바꾼 것</th><th>BLEU</th><th>의미</th></tr>
<tr><td>기본 (헤드 8개, 6층)</td><td>25.8</td><td>기준</td></tr>
<tr><td>헤드 1개</td><td>24.9</td><td>여러 관점이 실제로 도움이 된다 (−0.9)</td></tr>
<tr><td>헤드 32개</td><td>25.4</td><td>너무 잘게 나눠도 손해</td></tr>
<tr><td>층 2개</td><td>23.7</td><td>깊이가 중요하다</td></tr>
<tr><td>드롭아웃 없음</td><td>24.6</td><td>과적합을 막는 장치가 꼭 필요하다</td></tr>
<tr><td>사인 위치 인코딩 → 학습형</td><td>25.7</td><td>위치 표시 방법은 거의 상관없다</td></tr>
<tr><td>big 모델</td><td>26.4</td><td>모델이 클수록 좋다</td></tr>
</table>
<p>마지막 줄은 이후 역사를 예고한다. 크기를 키우면 좋아진다는 경향은 몇 년 뒤 GPT-3 같은 초대형 모델로 이어진다.</p>`
      },
      {
        title: '한계',
        body: R`
<ul>
<li><strong>긴 입력에 비싸다</strong>: 모든 단어 쌍을 계산하므로 문장 길이가 2배면 어텐션 계산과 메모리는 4배가 된다. 저자들도 주변 단어만 보는 제한된 어텐션을 다음 과제로 꼽았다. 이후 Longformer 같은 희소 어텐션, GPU 메모리 사용을 줄인 FlashAttention 등이 이 문제를 다룬다.</li>
<li><strong>생성은 여전히 한 단어씩</strong>: 학습은 병렬이지만 번역문을 만들 때는 위의 표처럼 단어마다 모델을 다시 돌려야 한다. 저자들도 "덜 순차적인 생성"을 목표로 언급했다.</li>
<li><strong>실험 범위</strong>: 번역과 구문 분석 두 과제만 다뤘다. 이미지·음성·영상 적용은 향후 과제로 남겼다(이후 ViT 등으로 실현).</li>
<li><strong>위치 인코딩에 대한 기대는 검증되지 않았다</strong>: 사인 방식이 학습 때보다 긴 문장에도 통할 것이라 했지만 실험으로 확인하지 않았다. 이후 상대 위치 방식, RoPE 등이 나왔다.</li>
<li><strong>정규화 위치</strong>: 논문은 더한 다음 정규화하는 배치(Post-LN)를 썼는데, 층을 깊게 쌓으면 워밍업 없이는 학습이 불안정하다. 이후 모델 대부분은 정규화를 먼저 하는 Pre-LN을 쓴다.</li>
</ul>`
      },
      {
        title: '이후에 일어난 일',
        body: R`
<p>Transformer의 세 부분(인코더, 디코더, 둘 다)을 떼어 쓰는 방식으로 현대 AI의 큰 갈래가 생겼다.</p>
<figure class="diagram"><svg viewBox="0 0 640 260" width="640">
<rect class="h" x="230" y="14" width="180" height="40" rx="8"/><text x="320" y="28">Transformer</text><text x="320" y="44" class="sm">2017 · 인코더 + 디코더</text>
<path class="a" d="M280,54 L110,108"/><path class="a" d="M320,54 L320,108"/><path class="a" d="M360,54 L530,108"/>
<rect class="n" x="30" y="110" width="160" height="40" rx="8"/><text x="110" y="124">인코더만</text><text x="110" y="140" class="sm">문장 이해</text>
<rect class="n" x="240" y="110" width="160" height="40" rx="8"/><text x="320" y="124">디코더만</text><text x="320" y="140" class="sm">다음 단어 생성</text>
<rect class="n" x="450" y="110" width="160" height="40" rx="8"/><text x="530" y="124">둘 다 · 다른 입력</text><text x="530" y="140" class="sm">변환 · 이미지</text>
<path class="a" d="M110,150 V178"/><path class="a" d="M320,150 V178"/><path class="a" d="M530,150 V178"/>
<text x="110" y="194">BERT (2018)</text><text x="110" y="212" class="sm">검색·분류에 널리 사용</text>
<text x="320" y="194">GPT (2018) → GPT-3 (2020)</text><text x="320" y="212" class="sm">→ ChatGPT, Claude 등 LLM</text>
<text x="530" y="194">T5 (2019) · ViT (2020)</text><text x="530" y="212" class="sm">텍스트 변환 · 이미지 인식</text>
<text x="320" y="248" class="sm">현재 대부분의 LLM은 이 논문의 디코더(마스크드 셀프 어텐션 + 피드포워드)를 수십~백여 층 쌓은 것</text>
</svg><figcaption>Transformer에서 갈라져 나온 주요 모델들.</figcaption></figure>
<p>다음 주에 읽을 후보인 BERT(인코더 갈래)와 GPT-3(디코더 갈래)가 바로 이 그림의 두 가지다.</p>`
      },
      {
        title: '용어 정리',
        body: R`
<table>
<tr><th>용어</th><th>뜻</th></tr>
<tr><td>토큰</td><td>문장을 자른 단위. 단어 또는 단어 조각</td></tr>
<tr><td>임베딩</td><td>토큰을 숫자 목록(벡터)으로 바꾼 것. 이 논문에서는 512칸</td></tr>
<tr><td>인코더 / 디코더</td><td>입력을 이해하는 부분 / 출력을 만들어 내는 부분</td></tr>
<tr><td>어텐션</td><td>다른 단어를 얼마나 참고할지 비율을 계산해 정보를 섞는 방법</td></tr>
<tr><td>셀프 어텐션</td><td>같은 문장 안의 단어끼리 하는 어텐션</td></tr>
<tr><td>Q · K · V</td><td>질의(찾는 것) · 키(맞춰 볼 표지) · 값(건네줄 내용)</td></tr>
<tr><td>소프트맥스</td><td>점수들을 0~1 사이, 합이 1인 비율로 바꾸는 함수</td></tr>
<tr><td>헤드</td><td>멀티헤드 어텐션에서 나란히 도는 어텐션 하나</td></tr>
<tr><td>위치 인코딩</td><td>단어 순서를 알려주기 위해 벡터에 더하는 위치별 패턴</td></tr>
<tr><td>마스킹</td><td>디코더가 아직 만들지 않은 뒤쪽 단어를 못 보게 가리는 것</td></tr>
<tr><td>잔차 연결</td><td>층의 출력을 입력에 더해 원래 정보를 보존하는 연결</td></tr>
<tr><td>BLEU</td><td>번역 품질 점수. 사람 번역과 겹치는 정도</td></tr>
</table>`
      },
    ],
    links: [
      { to: 'dl-rnn', why: '이 논문이 대체한 구조. 한 단어씩 차례로 계산하는 방식과 그 한계' },
      { to: 'dl-attention', why: '어텐션의 일반 원리와 Q·K·V 계산을 더 자세히' },
      { to: 'dl-transformer', why: '이 논문 이후 바뀐 부분(Pre-LN, RoPE, KV 캐시)까지 포함한 Transformer 정리' },
      { to: 'ai-llm', why: '디코더만 쌓은 Transformer가 LLM이 되는 과정' },
    ],
    quiz: [
      { q: 'RNN 번역 모델의 학습이 느렸던 가장 큰 이유는?', options: ['앞 단어의 계산이 끝나야 다음 단어를 계산할 수 있어서', '파라미터 수가 Transformer보다 훨씬 많아서', '단어장이 너무 커서', '소프트맥스를 쓰지 않아서'], answer: 0, explain: 'RNN은 기억(은닉 상태)을 왼쪽에서 오른쪽으로 넘기며 계산하므로 단어 수만큼 차례로 계산해야 하고, GPU의 병렬 계산 능력을 다 쓰지 못한다.' },
      { q: '어텐션에서 "내가 무엇을 찾고 있는지"를 나타내는 벡터는?', options: ['질의 (Query)', '키 (Key)', '값 (Value)', '위치 인코딩'], answer: 0, explain: '질의를 각 단어의 키와 비교해 점수를 매기고, 그 비율대로 값을 섞는다. 도서관 비유에서 질의는 검색어, 키는 책의 태그, 값은 책의 본문이다.' },
      { q: '점수를 √d_k로 나누는 이유는?', options: ['점수가 너무 커져 소프트맥스가 한 단어에 쏠리고 기울기가 사라지는 것을 막으려고', '계산 속도를 높이려고', '단어 순서를 알려주려고', '비율의 합을 1로 맞추려고'], answer: 0, explain: '64칸 벡터의 내적은 분산이 64로 커진다. 그대로 소프트맥스에 넣으면 거의 1과 0만 나와 학습 신호(기울기)가 0에 가까워진다. 합을 1로 맞추는 것은 소프트맥스가 하는 일이다.' },
      { q: '디코더 셀프 어텐션에서 마스킹을 하는 이유는?', options: ['학습 중 아직 만들지 않은 뒤쪽 정답 단어를 미리 보지 못하게 하려고', '계산량을 절반으로 줄이려고', '인코더 정보를 차단하려고', '멀리 있는 단어를 무시하려고'], answer: 0, explain: '학습할 때는 정답 문장 전체를 한 번에 넣어 빠르게 계산한다. 마스크가 없으면 각 위치가 자기가 맞혀야 할 다음 단어를 그대로 볼 수 있다.' },
      { q: 'Transformer에 위치 인코딩이 꼭 필요한 이유는?', options: ['셀프 어텐션 계산만으로는 단어 순서를 구분할 수 없어서', '임베딩 크기를 맞추려고', '학습률을 조절하려고', '헤드를 나누려고'], answer: 0, explain: '어텐션 점수는 단어 벡터끼리의 내적이라 단어를 뒤섞어도 같은 값이 나온다. 위치마다 다른 패턴을 더해 줘야 순서를 안다.' },
      { q: '논문의 부품 실험에서 헤드를 8개에서 1개로 줄이면?', options: ['BLEU가 약 0.9점 떨어졌다', '성능이 그대로였다', 'BLEU가 올랐다', '학습이 아예 되지 않았다'], answer: 0, explain: '개발용 데이터에서 25.8 → 24.9. 여러 관점으로 동시에 보는 것이 실제로 도움이 된다는 근거다. 반대로 32개까지 늘려도 25.4로 떨어졌다.' },
    ],
  },
];
