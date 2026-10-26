/* =====================================================================
   논문 읽기: 주마다 한 편. no = 읽기 계획의 번호(#1, #2 …)이고 목록은 이 번호 순으로 정렬된다
   논문 객체 형식:
   {
     no: 11,                  // 읽기 계획 번호
     id: '2017-transformer',  // 주소 #/p/<id>. 퀴즈 오답 키도 'p-<id>:<순번>'이라 배포 후 바꾸지 말 것
     title, authors, venue,
     arxiv: 'https://...',
     summary: R`줄마다 한 항목`,
     sections: [{ no: '3.2.1', title: '논문 절 제목 그대로', desc: '한국어 한 줄 설명', body: R`HTML` }],  // no가 빈 문자열이면 논문 밖 절. body에 $수식$, 도식 사용 가능
     links: [{ to: 'dl-transformer', why: '연결 이유' }],
     quiz: [{ q, options, answer, explain }]
   }
   R`...` 안에는 백틱(`)과 "${" 를 쓰지 말 것.
   ===================================================================== */
const PAPERS = [
  {
    no: 1, id: '2012-alexnet', title: 'ImageNet Classification with Deep Convolutional Neural Networks', short: 'AlexNet',
    authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton (토론토대)',
    venue: 'NeurIPS 2012',
    arxiv: 'https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks',
    lead: '깊은 CNN을 GPU 두 장으로 학습시켜 이미지 분류 대회에서 2등과 10%p 넘는 차이로 우승한 논문. 이 결과를 계기로 컴퓨터 비전, 이어서 AI 전체가 딥러닝으로 넘어갔다.',
    summary: R`층 8개(<strong>convolution 5 + fully connected 3</strong>), parameter 6천만 개의 CNN으로 120만 장 이미지를 1,000개 class로 분류
<strong>ReLU</strong>로 학습을 몇 배 빠르게, <strong>GPU 2장</strong>에 모델을 나눠 실어 큰 모델을 학습
<strong>Data augmentation</strong>과 <strong>dropout</strong>으로 overfitting을 억제
ILSVRC-2012 top-5 error 15.3%, 2등(26.2%)과 큰 차이로 우승`,
    sections: [
      {
        no: '', title: 'Prerequisites', desc: '이 논문을 읽기 전에 필요한 개념',
        body: R`
<p>이 논문이 풀려는 과제는 <strong>image classification</strong>(이미지 분류)이다. 사진 한 장을 넣으면 "고양이", "자동차", "버섯"처럼 미리 정해 둔 1,000개 class 중 하나를 고르는 프로그램을 만드는 것이다.</p>
<h3>컴퓨터가 보는 이미지</h3>
<p>컴퓨터에게 컬러 사진은 숫자 표다. 224×224 크기 사진이면 가로 224칸, 세로 224칸의 점(pixel)이 있고, 점마다 빨강·초록·파랑(RGB) 밝기 3개가 있다. 그래서 사진 한 장은 224 × 224 × 3 = <strong>150,528개의 숫자</strong>다. 모델은 이 숫자들을 받아 class마다 확률을 내놓는다.</p>
<h3>Neural network와 학습</h3>
<p><strong>Neural network</strong>(신경망)는 "숫자에 weight를 곱해 더하고, 비선형 함수를 통과시키는" 층을 여러 겹 쌓은 함수다. 처음에는 weight가 무작위라 엉뚱한 답을 낸다. 정답과 얼마나 다른지(<strong>loss</strong>)를 계산하고, loss가 줄어드는 방향(<strong>gradient</strong>)으로 weight를 조금씩 고치는 일을 수백만 번 반복하는 것이 <strong>학습</strong>이다. 이 고치는 방법이 <strong>stochastic gradient descent</strong>(SGD, 확률적 경사 하강법)이고, gradient를 층마다 거꾸로 전달해 계산하는 방법이 <strong>backpropagation</strong>(역전파)이다.</p>
<h3>Convolution</h3>
<p>이미지를 일반 neural network에 그대로 넣으면 150,528개 입력마다 weight가 필요해 너무 크다. 또 "고양이 귀" 모양이 사진 왼쪽에 있든 오른쪽에 있든 같은 귀인데, 위치마다 따로 배워야 한다.</p>
<p><strong>Convolution</strong>(합성곱)은 작은 <strong>kernel</strong>(filter, 예: 3×3 숫자 표) 하나를 이미지 위에 미끄러뜨리며 겹치는 부분끼리 곱해 더하는 연산이다. 같은 kernel을 모든 위치에 쓰므로 weight가 적고, 어디에 있든 같은 모양을 찾아낸다.</p>
<figure class="diagram"><svg viewBox="0 0 600 245" width="600">
<text x="20" y="18" class="st">3×3 kernel이 5×5 입력 위를 한 칸씩 움직이며 3×3 출력을 만든다</text>
<rect class="h" x="40" y="45" width="90" height="90"/>
<path class="e" d="M40,45 H190 M40,75 H190 M40,105 H190 M40,135 H190 M40,165 H190 M40,195 H190 M40,45 V195 M70,45 V195 M100,45 V195 M130,45 V195 M160,45 V195 M190,45 V195"/>
<text x="115" y="214" class="sm">입력 (5×5)</text>
<text x="222" y="120">×</text>
<rect class="h" x="255" y="75" width="90" height="90"/>
<path class="e" d="M255,75 H345 M255,105 H345 M255,135 H345 M255,165 H345 M255,75 V165 M285,75 V165 M315,75 V165 M345,75 V165"/>
<text x="300" y="184" class="sm">kernel (3×3, 학습되는 weight)</text>
<path class="a" d="M360,120 H408"/>
<rect class="h" x="420" y="75" width="30" height="30"/>
<path class="e" d="M420,75 H510 M420,105 H510 M420,135 H510 M420,165 H510 M420,75 V165 M450,75 V165 M480,75 V165 M510,75 V165"/>
<text x="465" y="184" class="sm">출력 (3×3, feature map)</text>
<text x="300" y="236" class="sm">색칠한 9칸을 kernel과 칸끼리 곱해 모두 더한 값 하나 → 출력의 색칠한 칸</text>
</svg><figcaption>Convolution. Kernel을 오른쪽·아래로 한 칸씩 옮기며 같은 계산을 반복한다. 한 번에 옮기는 칸 수를 stride라 한다.</figcaption></figure>
<p>Kernel마다 찾는 모양이 다르다. 어떤 kernel은 세로 경계선에, 어떤 kernel은 초록색 덩어리에 크게 반응한다. Kernel 96개를 쓰면 출력도 96장(<strong>channel</strong> 96개)이 된다. 이런 층을 여러 겹 쌓은 것이 <strong>CNN</strong>(convolutional neural network)이다. 아래층은 선과 색을, 위층은 눈·바퀴 같은 부분을, 맨 위층은 "고양이 얼굴" 같은 전체 모양을 잡는다.</p>
<p><strong>Pooling</strong>은 가까운 칸 몇 개 중 가장 큰 값만 남겨(max pooling) 그림을 작게 줄이는 연산이다. 계산을 줄이고, 물체가 조금 움직여도 결과가 덜 흔들리게 한다.</p>
<div class="box"><strong>이 논문 이전 상황</strong>: CNN 자체는 1989년(LeCun의 LeNet)부터 있었고 손글씨 숫자 인식에서 잘 동작했다. 하지만 큰 컬러 사진을 다루기엔 데이터도 계산 장비도 부족했다. 그래서 2012년까지 이미지 분류의 주류는 사람이 설계한 특징(SIFT, Fisher Vector 등)을 뽑고 그 위에 분류기를 얹는 방식이었다.</div>`
      },
      {
        no: '1', title: 'Introduction', desc: '왜 큰 데이터와 큰 모델이 필요한가',
        body: R`
<p>저자들의 출발점은 단순하다. 물체 인식을 잘하려면 <strong>데이터가 많아야</strong> 하고, 많은 데이터를 배우려면 <strong>모델이 커야</strong> 한다.</p>
<ul>
<li><strong>데이터</strong>: 그때까지 자주 쓰던 데이터셋(NORB, Caltech-101/256, CIFAR-10/100)은 수만 장 규모였다. 숫자 손글씨처럼 단순한 과제엔 충분하지만, 현실의 물체는 모양·조명·각도가 훨씬 다양하다. 마침 수백만 장 규모의 ImageNet이 나왔다.</li>
<li><strong>모델</strong>: 수백만 장에서 수천 class를 배우려면 표현력이 큰 모델이 필요하다. 그런데 사진에는 성질이 있다. 통계적 성질이 위치와 상관없이 비슷하고(어디서나 같은 귀 모양), 가까운 pixel끼리 관련이 깊다. CNN은 이 성질을 구조에 미리 넣어 두었기 때문에, 비슷한 크기의 일반 neural network보다 연결과 parameter가 훨씬 적고 학습이 쉽다.</li>
<li><strong>장비</strong>: 그래도 큰 CNN을 고해상도 이미지에 학습시키는 건 비쌌다. 저자들은 GPU용 convolution 코드를 직접 최적화해 이 문제를 풀었다.</li>
</ul>
<p>논문이 스스로 꼽는 기여는 다음과 같다.</p>
<ol>
<li>ImageNet 일부로 당시 가장 큰 CNN 중 하나를 학습시켜 ILSVRC-2010, 2012에서 지금까지 보고된 것보다 훨씬 좋은 결과를 냈다.</li>
<li>2D convolution의 GPU 구현을 공개했다.</li>
<li>성능을 높이고 학습 시간을 줄이는 새로운 장치들(3절)을 넣었다.</li>
<li>모델이 커서 생기는 overfitting을 막는 기법들(4절)을 썼다.</li>
<li>Convolution 층 하나만 빼도 성능이 떨어진다. 즉 <strong>깊이가 중요하다</strong>.</li>
</ol>
<p>마지막으로 저자들은 이 결과가 GPU 두 장의 메모리와 5~6일이라는 학습 시간에 묶여 있다고 말한다. 더 빠른 GPU와 더 큰 데이터만 있으면 결과는 더 좋아질 것이라는 예고다. 이 예고는 이후 몇 년 동안 그대로 실현된다.</p>`
      },
      {
        no: '2', title: 'The Dataset', desc: 'ImageNet과 ILSVRC, top-1·top-5 error',
        body: R`
<p><strong>ImageNet</strong>은 사람이 라벨을 붙인 고해상도 이미지 1,500만 장, 약 22,000개 class로 된 데이터셋이다. 인터넷에서 모은 사진에 Amazon Mechanical Turk로 사람들이 라벨을 달았다.</p>
<p>매년 열린 대회 <strong>ILSVRC</strong>(ImageNet Large-Scale Visual Recognition Challenge)는 이 중 1,000개 class만 쓴다.</p>
<table>
<tr><th>구분</th><th>장 수</th><th>쓰임</th></tr>
<tr><td>Training</td><td>약 120만</td><td>학습</td></tr>
<tr><td>Validation</td><td>5만</td><td>학습 중 성능 확인, 설정 조정</td></tr>
<tr><td>Test</td><td>15만</td><td>최종 평가 (2010년만 정답 공개)</td></tr>
</table>
<h3>Top-1 error와 top-5 error</h3>
<p>모델은 class마다 확률을 내놓는다. 이 확률로 두 가지 오답률을 잰다.</p>
<ul>
<li><strong>Top-1 error</strong>: 가장 확률이 높은 답 1개가 정답이 아닌 비율</li>
<li><strong>Top-5 error</strong>: 확률이 높은 답 5개 안에 정답이 없는 비율</li>
</ul>
<p>Top-5를 따로 보는 이유는 class가 아주 세밀하기 때문이다. 1,000개 class에는 개 품종만 100개가 넘는다. "시베리안 허스키"를 "알래스칸 맬러뮤트"로 답했다면 완전히 틀렸다고 보기 어렵다.</p>
<figure class="diagram"><svg viewBox="0 0 600 218" width="600">
<rect class="g" x="20" y="34" width="150" height="130" rx="6"/><text x="95" y="92">입력 사진</text><text x="95" y="112" class="sm">224×224×3</text>
<text x="95" y="182" class="sm">정답 라벨: 시베리안 허스키</text>
<path class="a" d="M178,99 H204"/>
<text x="214" y="16" class="st sm">모델이 낸 확률 상위 5개 (예시 값)</text>
<text x="222" y="44" class="sm">1</text><text x="370" y="44" class="en">알래스칸 맬러뮤트</text>
<rect class="g" x="380" y="34" width="165.6" height="20" rx="3"/><text x="551.6" y="44" class="st sm">0.46</text>
<text x="222" y="72" class="sm">2</text><text x="370" y="72" class="en">시베리안 허스키</text>
<rect class="h" x="380" y="62" width="111.6" height="20" rx="3"/><text x="497.6" y="72" class="st sm">0.31</text>
<text x="222" y="100" class="sm">3</text><text x="370" y="100" class="en">에스키모견</text>
<rect class="g" x="380" y="90" width="43.2" height="20" rx="3"/><text x="429.2" y="100" class="st sm">0.12</text>
<text x="222" y="128" class="sm">4</text><text x="370" y="128" class="en">늑대</text>
<rect class="g" x="380" y="118" width="18" height="20" rx="3"/><text x="404" y="128" class="st sm">0.05</text>
<text x="222" y="156" class="sm">5</text><text x="370" y="156" class="en">노르웨이 엘크하운드</text>
<rect class="g" x="380" y="146" width="7.2" height="20" rx="3"/><text x="393.2" y="156" class="st sm">0.02</text>
<text x="300" y="206" class="sm">1위 답은 틀렸으므로 top-1 기준으로는 오답, 정답이 2위로 5개 안에 있으므로 top-5 기준으로는 정답</text>
</svg><figcaption>Top-1과 top-5 채점. 같은 예측이 top-1으로는 틀리고 top-5로는 맞는다.</figcaption></figure>
<h3>전처리</h3>
<p>ImageNet 사진은 크기가 제각각인데, 모델은 크기가 고정된 입력을 받아야 한다. 그래서 짧은 변을 256으로 줄이고 가운데를 256×256으로 잘랐다. 그 밖에는 각 pixel에서 학습 데이터 전체의 평균값을 빼는 것만 했다. 사람이 설계한 특징을 뽑지 않고 <strong>RGB 원본 그대로</strong> 학습시킨 것이다. 특징까지 모델이 스스로 배운다는 점이 이전 방식과 가장 다른 부분이다.</p>`
      },
      {
        no: '3', title: 'The Architecture', desc: '구조 개요와 새 장치 네 가지',
        body: R`
<p>모델은 학습되는 층 8개로 되어 있다. 앞의 <strong>convolutional layer 5개</strong>가 이미지에서 특징을 뽑고, 뒤의 <strong>fully connected layer 3개</strong>가 그 특징으로 class를 고른다. 전체 구조는 3.5절에서 그림으로 보고, 3.1~3.4절은 저자들이 새롭거나 드물다고 소개한 장치를 <strong>중요한 순서대로</strong> 설명한다.</p>
<table>
<tr><th>절</th><th>장치</th><th>효과</th></tr>
<tr><td>3.1</td><td>ReLU</td><td>학습이 몇 배 빨라짐</td></tr>
<tr><td>3.2</td><td>GPU 2장에 나눠 학습</td><td>더 큰 모델을 올림, top-1 error 1.7%p 감소</td></tr>
<tr><td>3.3</td><td>Local response normalization</td><td>top-1 error 1.4%p 감소</td></tr>
<tr><td>3.4</td><td>Overlapping pooling</td><td>top-1 error 0.4%p 감소</td></tr>
</table>`
      },
      {
        no: '3.1', title: 'ReLU Nonlinearity', desc: 'tanh 대신 max(0, x)를 쓰는 이유',
        body: R`
<p>층마다 weight를 곱해 더한 뒤 <strong>activation function</strong>(활성화 함수)이라는 비선형 함수를 통과시킨다. 이게 없으면 층을 아무리 쌓아도 결국 곱하고 더하기 한 번과 같아서 복잡한 모양을 배울 수 없다.</p>
<p>당시 표준은 $\tanh(x)$나 sigmoid였다. 이 논문은 대신 <strong>ReLU</strong>(Rectified Linear Unit)를 썼다.</p>
$$f(x) = \max(0,\ x)$$
<figure class="diagram"><svg viewBox="0 0 640 230" width="640">
<text x="160" y="12">tanh(x)</text><text x="480" y="12">ReLU: max(0, x)</text>
<path class="e" d="M30,140 H290 M160,20 V200"/>
<path class="he" d="M40,179.8 L48,179.7 L56,179.6 L64,179.3 L72,179.0 L80,178.6 L88,177.9 L96,176.9 L104,175.4 L112,173.3 L120,170.5 L128,166.6 L136,161.5 L144,155.2 L152,147.9 L160,140.0 L168,132.1 L176,124.8 L184,118.5 L192,113.4 L200,109.5 L208,106.7 L216,104.6 L224,103.1 L232,102.1 L240,101.4 L248,101.0 L256,100.7 L264,100.4 L272,100.3 L280,100.2"/>
<path class="e d" d="M30,100 H290 M30,180 H290"/>
<text x="285" y="88" class="sm en">+1</text><text x="285" y="192" class="sm en">−1</text>
<text x="70" y="160" class="sm">평평함: 기울기 ≈ 0</text><text x="250" y="122" class="sm">평평함: 기울기 ≈ 0</text>
<path class="e" d="M350,140 H610 M480,20 V200"/>
<path class="he" d="M360,140 L480,140 L600,20"/>
<text x="420" y="156" class="sm">x &lt; 0 → 0</text><text x="522" y="112" class="st sm">x &gt; 0 → 기울기 1</text>
<text x="320" y="222" class="sm">gradient는 기울기에 비례해 전달된다. 평평한 곳에서는 weight가 거의 고쳐지지 않는다</text>
</svg><figcaption>입력이 크거나 작으면 tanh는 평평해진다(saturation). ReLU는 양수 쪽이 어디서나 기울기 1이다.</figcaption></figure>
<p>$\tanh$는 입력이 크면 출력이 1 근처에 붙어 거의 변하지 않는다. 기울기가 0에 가까우니 학습 신호(gradient)도 거의 0이 되고 학습이 느려진다. 저자들은 이를 <strong>saturating</strong> nonlinearity라 부르고, ReLU처럼 포화되지 않는 함수가 gradient descent에서 훨씬 빨리 학습된다고 했다. ReLU는 계산도 "0보다 작으면 0"뿐이라 지수 계산이 필요한 tanh보다 싸다.</p>
<h3>실험: CIFAR-10에서 6배 빠름</h3>
<p>4층 CNN을 CIFAR-10(작은 사진 데이터셋)으로 학습시켜 training error가 25%에 도달하는 시간을 쟀다. ReLU를 쓴 쪽이 tanh를 쓴 쪽보다 <strong>6배 빨랐다</strong>(논문 Figure 1). 저자들은 tanh 같은 전통적인 함수로는 이렇게 큰 neural network를 실험할 수 없었을 것이라고 말한다.</p>
<div class="box"><strong>ReLU를 처음 만든 논문은 아니다</strong>: ReLU는 Nair &amp; Hinton(2010)이 먼저 썼다. 이 논문은 큰 CNN에서 ReLU가 결정적이라는 것을 보여 주어 이후 모든 CNN의 기본값으로 만들었다.</div>`
      },
      {
        no: '3.2', title: 'Training on Multiple GPUs', desc: 'GPU 2장에 kernel을 반씩 나눠 싣기',
        body: R`
<p>사용한 GPU는 NVIDIA GTX 580으로, 메모리가 <strong>3GB</strong>뿐이었다. 학습에 필요한 메모리가 이보다 커서 GPU 한 장에 모델이 들어가지 않았다.</p>
<p>그래서 각 층의 kernel(neuron)을 <strong>반씩 나눠 GPU 2장에 하나씩</strong> 올렸다. 예를 들어 첫 층의 kernel 96개는 GPU마다 48개씩이다. GPU끼리 데이터를 주고받는 것은 느리므로 <strong>특정 층에서만</strong> 통신한다.</p>
<ul>
<li>3번째 convolution 층은 2번째 층의 출력을 GPU 2장 모두에서 받는다.</li>
<li>4·5번째 convolution 층은 같은 GPU에 있는 앞 층 출력만 받는다.</li>
<li>Fully connected 층은 모두 양쪽에서 받는다.</li>
</ul>
<p>어디서 통신할지는 cross-validation으로 정했다. 이 구조는 3.5절 그림에서 GPU 1·2 두 줄로 보인다.</p>
<p>결과적으로 GPU 한 장에 kernel을 반만 넣은 모델과 비교해 top-1 error가 <strong>1.7%p</strong>, top-5 error가 <strong>1.2%p</strong> 줄었다. 학습 시간도 GPU 한 장짜리보다 약간 짧았다.</p>
<div class="box"><strong>이후의 의미</strong>: 지금은 GPU 메모리가 커서 AlexNet 정도는 한 장에 들어가므로 이렇게 나누지 않는다. 하지만 "모델을 여러 GPU에 쪼개 싣는다"는 생각(model parallelism)은 오늘날 수천 장의 GPU로 LLM을 학습시키는 방식의 원형이다.</div>`
      },
      {
        no: '3.3', title: 'Local Response Normalization', desc: '옆 channel과 경쟁시켜 값을 정규화',
        body: R`
<p>ReLU는 tanh와 달리 출력에 상한이 없다. 그래서 입력이 너무 커지는 것을 막으려는 normalization이 꼭 필요하진 않다. 그래도 저자들은 아래 정규화가 일반화에 도움이 된다는 것을 발견했다.</p>
<p>위치 $(x, y)$에서 $i$번째 kernel의 ReLU 출력을 $a^i_{x,y}$라 하면, 정규화된 값 $b^i_{x,y}$는 다음과 같다.</p>
$$b^i_{x,y} = \frac{a^i_{x,y}}{\left(k + \alpha \displaystyle\sum_{j=\max(0,\ i-n/2)}^{\min(N-1,\ i+n/2)} \left(a^j_{x,y}\right)^2\right)^{\beta}}$$
<p>뜻을 풀면, 같은 위치에서 <strong>번호가 이웃한 kernel $n$개</strong>의 출력 제곱합으로 나눈다. 이웃 kernel들이 모두 크게 반응하면 각자의 값이 줄어들고, 혼자만 크게 반응하면 상대적으로 두드러진다. 실제 뇌의 neuron에서 관찰되는 <strong>lateral inhibition</strong>(측면 억제), 즉 강하게 반응한 neuron이 이웃을 억누르는 현상을 흉내 낸 것이다.</p>
<figure class="diagram"><svg viewBox="0 0 600 290" width="600">
<text x="20" y="16" class="st">이웃도 크게 반응한 경우</text>
<rect class="g" x="40" y="48" width="38" height="54" rx="2"/><text x="59" y="114" class="sm">90</text>
<rect class="g" x="88" y="54" width="38" height="48" rx="2"/><text x="107" y="114" class="sm">80</text>
<rect class="h" x="136" y="42" width="38" height="60" rx="2"/><text x="155" y="114" class="sm">100</text>
<rect class="g" x="184" y="54" width="38" height="48" rx="2"/><text x="203" y="114" class="sm">80</text>
<rect class="g" x="232" y="48" width="38" height="54" rx="2"/><text x="251" y="114" class="sm">90</text>
<text x="136" y="130" class="sm">이웃한 kernel 5개 (가운데가 i번째)</text>
<path class="a" d="M290,72 H340"/>
<rect class="h" x="356" y="86.16" width="38" height="15.84" rx="2"/><text x="375" y="114" class="sm">26.4</text>
<text x="412" y="72" class="st sm">100 → 26.4</text>
<text x="20" y="164" class="st">혼자만 크게 반응한 경우</text>
<rect class="g" x="40" y="247" width="38" height="3" rx="2"/><text x="59" y="262" class="sm">5</text>
<rect class="g" x="88" y="248.5" width="38" height="1.5" rx="2"/><text x="107" y="262" class="sm">0</text>
<rect class="h" x="136" y="190" width="38" height="60" rx="2"/><text x="155" y="262" class="sm">100</text>
<rect class="g" x="184" y="248.5" width="38" height="1.5" rx="2"/><text x="203" y="262" class="sm">0</text>
<rect class="g" x="232" y="247" width="38" height="3" rx="2"/><text x="251" y="262" class="sm">5</text>
<text x="136" y="278" class="sm">이웃한 kernel 5개 (가운데가 i번째)</text>
<path class="a" d="M290,220 H340"/>
<rect class="h" x="356" y="223.7" width="38" height="26.28" rx="2"/><text x="375" y="262" class="sm">43.8</text>
<text x="412" y="220" class="st sm">100 → 43.8</text>
</svg><figcaption>논문의 값($k = 2$, $n = 5$, $\alpha = 10^{-4}$, $\beta = 0.75$)으로 계산한 예. 같은 100이라도 이웃이 조용하면 덜 줄어들어 상대적으로 두드러진다.</figcaption></figure>
<p>값은 validation으로 정해 $k = 2$, $n = 5$, $\alpha = 10^{-4}$, $\beta = 0.75$를 썼다. 1·2번째 convolution 층의 ReLU 다음에 넣었다.</p>
<p>효과는 top-1 error <strong>1.4%p</strong>, top-5 error <strong>1.2%p</strong> 감소였다. CIFAR-10에서도 test error가 13%에서 11%로 줄었다.</p>
<div class="box"><strong>이후 사라진 장치</strong>: 2014년 VGG 논문이 LRN을 넣어도 성능이 오르지 않고 메모리와 계산만 늘어난다고 보고했다. 이후 LRN은 거의 쓰이지 않고, 2015년의 batch normalization(#9)이 그 자리를 대신한다.</div>`
      },
      {
        no: '3.4', title: 'Overlapping Pooling', desc: '창을 겹쳐서 max pooling',
        body: R`
<p>Pooling은 이웃한 칸 몇 개를 하나로 요약한다. 창 크기를 $z$, 창을 옮기는 간격(stride)을 $s$라 하자. 보통은 $s = z$로 창을 겹치지 않게 놓았다(예: 2×2 창을 2칸씩). 이 논문은 $s = 2$, $z = 3$으로 <strong>창이 한 칸씩 겹치게</strong> 했다.</p>
<figure class="diagram"><svg viewBox="0 0 600 200" width="600">
<text x="20" y="16" class="st">기존: z = 2, s = 2 (겹치지 않음)</text>
<rect class="h" x="60" y="34" width="80" height="12" rx="3"/><rect class="h" x="140" y="34" width="80" height="12" rx="3"/><rect class="h" x="220" y="34" width="80" height="12" rx="3"/>
<path class="e" d="M60,54 H340 M60,84 H340 M60,54 V84 M100,54 V84 M140,54 V84 M180,54 V84 M220,54 V84 M260,54 V84 M300,54 V84 M340,54 V84"/>
<text x="380" y="69" class="st sm">창마다 가장 큰 값 1개 → 출력 3칸</text>
<text x="20" y="114" class="st">AlexNet: z = 3, s = 2 (한 칸씩 겹침)</text>
<rect class="h" x="60" y="132" width="120" height="10" rx="3"/><rect class="h" x="140" y="144" width="120" height="10" rx="3"/><rect class="h" x="220" y="132" width="120" height="10" rx="3"/>
<path class="e" d="M60,160 H340 M60,190 H340 M60,160 V190 M100,160 V190 M140,160 V190 M180,160 V190 M220,160 V190 M260,160 V190 M300,160 V190 M340,160 V190"/>
<text x="380" y="175" class="st sm">경계 칸이 두 창에 동시에 들어감</text>
</svg><figcaption>한 줄짜리 예시. 위는 창(띠)이 맞닿기만 하고, 아래는 창 크기 3을 2칸씩 옮겨 한 칸이 겹친다.</figcaption></figure>
<p>출력 크기는 거의 같은데, top-1 error가 <strong>0.4%p</strong>, top-5 error가 <strong>0.3%p</strong> 줄었다. 저자들은 겹치는 pooling을 쓰면 overfitting이 조금 덜 일어나는 것도 관찰했다고 적었다. 효과는 네 장치 중 가장 작다.</p>`
      },
      {
        no: '3.5', title: 'Overall Architecture', desc: '8개 층의 구성과 크기 변화',
        body: R`
<p>그림은 위에서 아래로 읽는다. 각 층의 kernel이 GPU 두 장에 반씩 나뉘어 있고, 색칠한 화살표에서만 GPU끼리 정보를 주고받는다.</p>
<figure class="diagram"><svg viewBox="0 0 680 500" width="680">
<text x="215" y="14" class="sm">GPU 1</text><text x="385" y="14" class="sm">GPU 2</text><text x="490" y="14" class="st sm">출력 크기 (가로 × 세로 × channel)</text>
<text x="20" y="45" class="st">Input</text><rect class="n" x="140" y="30" width="320" height="30" rx="6"/><text x="300" y="45">224 × 224 RGB 이미지</text><text x="490" y="45" class="st sm">224×224×3</text>
<text x="20" y="97" class="st">Conv1</text><rect class="h" x="140" y="82" width="150" height="30" rx="6"/><rect class="h" x="310" y="82" width="150" height="30" rx="6"/><text x="215" y="97">11×11 kernel 48개</text><text x="385" y="97">11×11 kernel 48개</text><text x="490" y="91" class="st sm">stride 4 → 55×55×96</text><text x="490" y="105" class="st sm">LRN, max pool → 27×27×96</text>
<text x="20" y="149" class="st">Conv2</text><rect class="h" x="140" y="134" width="150" height="30" rx="6"/><rect class="h" x="310" y="134" width="150" height="30" rx="6"/><text x="215" y="149">5×5 kernel 128개</text><text x="385" y="149">5×5 kernel 128개</text><text x="490" y="143" class="st sm">27×27×256</text><text x="490" y="157" class="st sm">LRN, max pool → 13×13×256</text>
<text x="20" y="201" class="st">Conv3</text><rect class="h" x="140" y="186" width="150" height="30" rx="6"/><rect class="h" x="310" y="186" width="150" height="30" rx="6"/><text x="215" y="201">3×3 kernel 192개</text><text x="385" y="201">3×3 kernel 192개</text><text x="490" y="201" class="st sm">13×13×384</text>
<text x="20" y="253" class="st">Conv4</text><rect class="h" x="140" y="238" width="150" height="30" rx="6"/><rect class="h" x="310" y="238" width="150" height="30" rx="6"/><text x="215" y="253">3×3 kernel 192개</text><text x="385" y="253">3×3 kernel 192개</text><text x="490" y="253" class="st sm">13×13×384</text>
<text x="20" y="305" class="st">Conv5</text><rect class="h" x="140" y="290" width="150" height="30" rx="6"/><rect class="h" x="310" y="290" width="150" height="30" rx="6"/><text x="215" y="305">3×3 kernel 128개</text><text x="385" y="305">3×3 kernel 128개</text><text x="490" y="299" class="st sm">13×13×256</text><text x="490" y="313" class="st sm">max pool → 6×6×256</text>
<text x="20" y="357" class="st">FC6</text><rect class="n" x="140" y="342" width="150" height="30" rx="6"/><rect class="n" x="310" y="342" width="150" height="30" rx="6"/><text x="215" y="357">neuron 2048개</text><text x="385" y="357">neuron 2048개</text><text x="490" y="357" class="st sm">4096 · dropout</text>
<text x="20" y="409" class="st">FC7</text><rect class="n" x="140" y="394" width="150" height="30" rx="6"/><rect class="n" x="310" y="394" width="150" height="30" rx="6"/><text x="215" y="409">neuron 2048개</text><text x="385" y="409">neuron 2048개</text><text x="490" y="409" class="st sm">4096 · dropout</text>
<text x="20" y="461" class="st">FC8</text><rect class="n" x="140" y="446" width="320" height="30" rx="6"/><text x="300" y="461">1000개 class + softmax</text><text x="490" y="461" class="st sm">1000 (class별 확률)</text>
<path class="a" d="M215,60 V80"/><path class="a" d="M385,60 V80"/>
<path class="a" d="M215,112 V132"/><path class="a" d="M385,112 V132"/>
<path class="a" d="M215,164 V184"/><path class="a" d="M385,164 V184"/><path class="ha" d="M235,164 L365,184"/><path class="ha" d="M365,164 L235,184"/>
<path class="a" d="M215,216 V236"/><path class="a" d="M385,216 V236"/>
<path class="a" d="M215,268 V288"/><path class="a" d="M385,268 V288"/>
<path class="a" d="M215,320 V340"/><path class="a" d="M385,320 V340"/><path class="ha" d="M235,320 L365,340"/><path class="ha" d="M365,320 L235,340"/>
<path class="a" d="M215,372 V392"/><path class="a" d="M385,372 V392"/><path class="ha" d="M235,372 L365,392"/><path class="ha" d="M365,372 L235,392"/>
<path class="a" d="M215,424 V444"/><path class="a" d="M385,424 V444"/>
<text x="300" y="492" class="sm">색칠한 화살표 = GPU 사이 통신 (Conv2→3, Conv5→FC6, FC6→7, FC7→8)</text>
</svg><figcaption>AlexNet 전체 구조(논문 Figure 2를 세로로 다시 그림). 모든 convolution과 FC 층 다음에는 ReLU가 있다.</figcaption></figure>
<h3>크기가 줄어드는 과정</h3>
<p>Convolution 출력의 가로 크기는 $\frac{W - F}{S} + 1$로 계산한다($W$ 입력 크기, $F$ kernel 크기, $S$ stride). 첫 층은 11×11 kernel을 4칸씩 옮기므로 $\frac{227 - 11}{4} + 1 = 55$가 된다.</p>
<div class="box"><strong>224인가 227인가</strong>: 논문은 입력을 224×224라고 적었지만, 그대로 계산하면 55가 나오지 않는다. 실제 구현은 227×227이었거나 가장자리에 padding을 넣었다고 보는 것이 일반적이다. 논문을 읽다 숫자가 안 맞으면 이 부분 때문이다.</div>
<p>정리하면, 가로·세로는 224 → 55 → 27 → 13 → 6으로 줄고 channel은 3 → 96 → 256 → 384 → 256으로 늘어난다. 공간 정보를 줄이는 대신 "어떤 특징이 있는가"를 담는 칸을 늘리는 것이다. 마지막 6×6×256 = 9,216개 숫자를 한 줄로 펴서 fully connected 층에 넣는다.</p>
<h3>Parameter는 어디에 있나</h3>
<table>
<tr><th>층</th><th>Weight 수 (계산)</th><th>대략</th></tr>
<tr><td>Conv1</td><td>11×11×3×96</td><td>3만 5천</td></tr>
<tr><td>Conv2</td><td>5×5×48×256</td><td>31만</td></tr>
<tr><td>Conv3</td><td>3×3×256×384</td><td>88만</td></tr>
<tr><td>Conv4</td><td>3×3×192×384</td><td>66만</td></tr>
<tr><td>Conv5</td><td>3×3×192×256</td><td>44만</td></tr>
<tr><td>FC6</td><td>9,216×4,096</td><td><strong>3,775만</strong></td></tr>
<tr><td>FC7</td><td>4,096×4,096</td><td>1,678만</td></tr>
<tr><td>FC8</td><td>4,096×1,000</td><td>410만</td></tr>
</table>
<figure class="diagram"><svg viewBox="0 0 600 290" width="600">
<text x="20" y="14" class="st sm">층별 weight 수 (막대 길이는 실제 비율)</text>
<text x="70" y="42" class="en">Conv1</text><rect class="g" x="80" y="32" width="1.5" height="20" rx="3"/><text x="87.5" y="42" class="st sm">3.5만</text>
<text x="70" y="70" class="en">Conv2</text><rect class="g" x="80" y="60" width="3.3" height="20" rx="3"/><text x="89.3" y="70" class="st sm">30.7만</text>
<text x="70" y="98" class="en">Conv3</text><rect class="g" x="80" y="88" width="9.4" height="20" rx="3"/><text x="95.4" y="98" class="st sm">88.5만</text>
<text x="70" y="126" class="en">Conv4</text><rect class="g" x="80" y="116" width="7.0" height="20" rx="3"/><text x="93.0" y="126" class="st sm">66.4만</text>
<text x="70" y="154" class="en">Conv5</text><rect class="g" x="80" y="144" width="4.7" height="20" rx="3"/><text x="90.7" y="154" class="st sm">44.2만</text>
<text x="70" y="182" class="en">FC6</text><rect class="h" x="80" y="172" width="400.0" height="20" rx="3"/><text x="486.0" y="182" class="st sm">3,775만</text>
<text x="70" y="210" class="en">FC7</text><rect class="h" x="80" y="200" width="177.8" height="20" rx="3"/><text x="263.8" y="210" class="st sm">1,678만</text>
<text x="70" y="238" class="en">FC8</text><rect class="h" x="80" y="228" width="43.4" height="20" rx="3"/><text x="129.4" y="238" class="st sm">410만</text>
<text x="300" y="276" class="sm">Convolution 5개 합 약 233만 (4%) · fully connected 3개 합 약 5,862만 (96%)</text>
</svg><figcaption>Parameter 분포. Convolution 층은 막대가 거의 보이지 않을 만큼 작고, FC6 하나가 전체의 60%가 넘는다.</figcaption></figure>
<p>합치면 약 <strong>6천만 개</strong>, neuron은 65만 개다. Conv2·4·5의 kernel이 48·192 channel만 보는 것은 같은 GPU 쪽 출력만 받기 때문이다. 눈여겨볼 점은 parameter의 <strong>약 96%가 fully connected 층</strong>에 있다는 것이다. 계산량은 convolution 층이 대부분인데 기억해야 할 숫자는 FC 층이 대부분인 셈이다. 그래서 dropout(4.2절)도 FC 층에만 걸었다.</p>
<p>마지막 층은 1,000개 점수를 <strong>softmax</strong>로 확률로 바꾸고, 정답 class의 확률을 높이는 방향(multinomial logistic regression, 즉 cross-entropy loss)으로 학습한다.</p>`
      },
      {
        no: '4', title: 'Reducing Overfitting', desc: 'Parameter 6천만 개를 120만 장으로 학습할 때의 문제',
        body: R`
<p><strong>Overfitting</strong>(과적합)은 모델이 학습 데이터를 "이해"하지 않고 "외워서", 학습 데이터에서는 잘 맞히는데 처음 보는 사진에서는 틀리는 현상이다.</p>
<p>ImageNet의 1,000개 class는 라벨 하나가 사진 한 장에 대해 꽤 많은 정보를 준다(약 10 bit). 그래도 parameter가 6천만 개나 되니 120만 장으로는 외워 버리기 쉽다. 저자들은 두 가지 방법으로 이를 막았다.</p>`
      },
      {
        no: '4.1', title: 'Data Augmentation', desc: '사진을 자르고 뒤집고 색을 바꿔 데이터 늘리기',
        body: R`
<p>가장 쉬운 방법은 <strong>라벨이 바뀌지 않는 변형</strong>으로 데이터를 인위적으로 늘리는 것이다. 고양이 사진을 조금 자르거나 좌우로 뒤집어도 여전히 고양이다. 변형은 GPU가 이전 batch를 학습하는 동안 CPU에서 만들어 사실상 비용이 없었다.</p>
<h3>방법 1. 무작위로 자르기와 좌우 반전</h3>
<figure class="diagram"><svg viewBox="0 0 620 240" width="620">
<text x="150" y="14">학습할 때</text><text x="470" y="14">테스트할 때</text>
<rect class="n" x="40" y="40" width="160" height="160"/><text x="120" y="214" class="sm">256×256 원본</text>
<rect class="h" x="50" y="46" width="140" height="140" rx="2" style="fill-opacity:.35"/>
<rect class="e d" x="56" y="56" width="140" height="140"/>
<path class="a" d="M210,120 H238"/>
<rect class="h" x="246" y="70" width="80" height="80"/><text x="286" y="110" class="sm">224×224</text><text x="286" y="166" class="sm">± 좌우 반전</text>
<text x="160" y="232" class="sm">매번 다른 위치를 잘라 32×32 위치 × 반전 2 = 2048배</text>
<rect class="n" x="362" y="95" width="44" height="44"/><rect class="h" x="362" y="95" width="38" height="38"/><text x="384" y="155" class="sm">좌상</text>
<rect class="n" x="412" y="95" width="44" height="44"/><rect class="h" x="418" y="95" width="38" height="38"/><text x="434" y="155" class="sm">우상</text>
<rect class="n" x="462" y="95" width="44" height="44"/><rect class="h" x="462" y="101" width="38" height="38"/><text x="484" y="155" class="sm">좌하</text>
<rect class="n" x="512" y="95" width="44" height="44"/><rect class="h" x="518" y="101" width="38" height="38"/><text x="534" y="155" class="sm">우하</text>
<rect class="n" x="562" y="95" width="44" height="44"/><rect class="h" x="565" y="98" width="38" height="38"/><text x="584" y="155" class="sm">가운데</text>
<text x="470" y="214" class="sm">네 귀퉁이 + 가운데 = 5장, 반전까지 10장</text>
<text x="470" y="232" class="sm">10장의 softmax 출력을 평균해 답을 고름</text>
</svg><figcaption>학습 때는 256×256에서 224×224를 무작위로 잘라 쓰고, 테스트 때는 정해진 10장의 예측을 평균한다.</figcaption></figure>
<p>256×256 사진에서 224×224 조각을 위치를 바꿔 가며 자르고, 절반 확률로 좌우를 뒤집는다. 가능한 경우의 수는 (256 − 224)² × 2 = <strong>2,048배</strong>다. 물론 조각끼리 많이 겹쳐서 진짜 새 사진 2,048장만큼의 효과는 아니다. 그래도 저자들은 이게 없으면 상당한 overfitting이 생겨 훨씬 작은 모델을 써야 했을 것이라고 했다.</p>
<h3>방법 2. 색 바꾸기 (PCA color augmentation)</h3>
<p>실제 사진은 조명에 따라 색감과 밝기가 달라진다. 하지만 물체가 무엇인지는 변하지 않는다. 저자들은 학습 데이터 전체의 RGB 값에 <strong>PCA</strong>(principal component analysis, 주성분 분석)를 해서 "색이 주로 변하는 방향" 3개를 찾았다. 그리고 사진마다 이 방향으로 무작위로 조금씩 색을 밀었다.</p>
$$[I^R_{xy},\ I^G_{xy},\ I^B_{xy}]^\top \mathrel{+}= [\mathbf{p}_1,\ \mathbf{p}_2,\ \mathbf{p}_3]\,[\alpha_1\lambda_1,\ \alpha_2\lambda_2,\ \alpha_3\lambda_3]^\top$$
<p>$\mathbf{p}_i$는 색이 변하는 방향(eigenvector), $\lambda_i$는 그 방향으로 얼마나 변하는지(eigenvalue), $\alpha_i$는 평균 0, 표준편차 0.1인 정규분포에서 사진마다 새로 뽑는 값이다. 실제로 많이 변하는 방향일수록 크게 민다. 이 방법만으로 top-1 error가 <strong>1%p 넘게</strong> 줄었다.</p>`
      },
      {
        no: '4.2', title: 'Dropout', desc: '학습 중 neuron 절반을 무작위로 끄기',
        body: R`
<p>여러 모델의 예측을 평균하면(ensemble) 오류가 크게 준다. 하지만 학습에 며칠씩 걸리는 큰 모델을 여러 개 만드는 건 너무 비싸다. <strong>Dropout</strong>은 모델 하나로 비슷한 효과를 싸게 얻는다. 이 논문은 같은 연구실의 Hinton 등(2012)이 막 제안한 이 기법을 크게 활용한 첫 사례 중 하나다.</p>
<figure class="diagram"><svg viewBox="0 0 600 220" width="600">
<text x="150" y="14">일반 학습</text><text x="450" y="14">Dropout 학습 (매 batch마다 다른 neuron이 꺼짐)</text>
<path class="e" d="M70,60 L150,50 M70,60 L150,110 M70,60 L150,170 M70,140 L150,50 M70,140 L150,110 M70,140 L150,170 M150,50 L230,80 M150,110 L230,80 M150,170 L230,80 M150,50 L230,140 M150,110 L230,140 M150,170 L230,140"/>
<circle class="n" cx="70" cy="60" r="14"/><circle class="n" cx="70" cy="140" r="14"/>
<circle class="h" cx="150" cy="50" r="14"/><circle class="h" cx="150" cy="110" r="14"/><circle class="h" cx="150" cy="170" r="14"/>
<circle class="n" cx="230" cy="80" r="14"/><circle class="n" cx="230" cy="140" r="14"/>
<path class="e" d="M370,60 L450,50 M370,140 L450,50 M370,60 L450,170 M370,140 L450,170 M450,50 L530,80 M450,170 L530,80 M450,50 L530,140 M450,170 L530,140"/>
<circle class="n" cx="370" cy="60" r="14"/><circle class="n" cx="370" cy="140" r="14"/>
<circle class="h" cx="450" cy="50" r="14"/><circle class="n d" cx="450" cy="110" r="14"/><circle class="h" cx="450" cy="170" r="14"/>
<text x="450" y="110" class="sm">0</text>
<circle class="n" cx="530" cy="80" r="14"/><circle class="n" cx="530" cy="140" r="14"/>
<text x="300" y="206" class="sm">꺼진 neuron(점선)은 출력이 0이라 앞으로도 뒤로도 신호를 전달하지 않는다</text>
</svg><figcaption>각 hidden neuron을 확률 0.5로 꺼서, batch마다 구조가 조금씩 다른 network를 학습시킨다.</figcaption></figure>
<ul>
<li><strong>학습 때</strong>: 첫 두 fully connected 층의 neuron 출력을 각각 <strong>확률 0.5로 0</strong>으로 만든다. 사진이 들어올 때마다 다른 구조의 network를 학습하는 셈이고, 이 network들은 weight를 공유한다.</li>
<li><strong>테스트 때</strong>: 모든 neuron을 켜고 출력에 0.5를 곱한다. 학습 때 평균적으로 절반만 켜져 있었으므로 크기를 맞추는 것이다. 수많은 network의 예측을 기하평균한 것과 비슷한 효과가 난다.</li>
</ul>
<p>왜 효과가 있을까. 어떤 neuron도 특정 동료 neuron이 늘 있을 거라고 기대할 수 없으니, 혼자서도 쓸모 있는 특징을 배우게 된다. 저자들은 이를 neuron 사이의 복잡한 <strong>co-adaptation</strong>(공동 적응)을 줄인다고 표현했다.</p>
<p>Dropout이 없으면 상당한 overfitting이 일어났다. 대가로 수렴까지 필요한 반복 횟수가 <strong>약 2배</strong>가 됐다.</p>`
      },
      {
        no: '5', title: 'Details of learning', desc: 'Optimizer, weight decay, 초기화, learning rate',
        body: R`
<p>학습은 <strong>SGD</strong>(stochastic gradient descent)로 했다. 설정은 다음과 같다.</p>
<table>
<tr><th>항목</th><th>값</th><th>뜻</th></tr>
<tr><td>Batch size</td><td>128</td><td>한 번에 weight를 고칠 때 보는 사진 수</td></tr>
<tr><td>Momentum</td><td>0.9</td><td>이전에 움직이던 방향을 90% 유지해 진동을 줄임</td></tr>
<tr><td>Weight decay</td><td>0.0005</td><td>weight가 너무 커지지 않게 매번 조금씩 0 쪽으로 당김</td></tr>
<tr><td>Learning rate</td><td>0.01에서 시작</td><td>validation error가 멈추면 10으로 나눔, 총 3번</td></tr>
<tr><td>학습량</td><td>약 90 epoch</td><td>120만 장 전체를 약 90번 반복</td></tr>
<tr><td>시간</td><td>5~6일</td><td>GTX 580 3GB 2장</td></tr>
</table>
<p>Weight $w$를 고치는 규칙은 다음과 같다. $\epsilon$은 learning rate, $v$는 momentum 변수, 마지막 항은 batch $D_i$에서 평균 낸 gradient다.</p>
$$v_{i+1} = 0.9\,v_i - 0.0005\,\epsilon\,w_i - \epsilon \left\langle \frac{\partial L}{\partial w}\Big|_{w_i} \right\rangle_{D_i}, \qquad w_{i+1} = w_i + v_{i+1}$$
<p>저자들이 강조한 발견은 <strong>weight decay가 단순한 regularization이 아니었다</strong>는 점이다. 이 작은 값이 overfitting을 막을 뿐 아니라 <strong>training error 자체도 줄였다</strong>. 즉 학습이 잘 되게 하는 데에도 필요했다.</p>
<h3>초기화</h3>
<ul>
<li>모든 weight는 평균 0, 표준편차 0.01인 정규분포에서 뽑았다.</li>
<li>Conv2·4·5와 fully connected hidden 층의 bias는 <strong>1</strong>로, 나머지는 0으로 두었다. ReLU에 양수 입력이 들어가게 해서 처음부터 neuron이 꺼져 있지 않게 하려는 것이다. 덕분에 초반 학습이 빨라졌다.</li>
</ul>
<p>Learning rate를 언제 줄일지는 사람이 validation error를 보고 직접 정했다. 지금은 cosine schedule처럼 미리 정한 규칙으로 줄이는 것이 일반적이다.</p>`
      },
      {
        no: '6', title: 'Results', desc: 'ILSVRC-2010, 2012 결과',
        body: R`
<h3>ILSVRC-2010</h3>
<p>Test 정답이 공개된 해라 대부분의 실험을 여기서 했다.</p>
<table>
<tr><th>모델</th><th>Top-1 error</th><th>Top-5 error</th></tr>
<tr><td>Sparse coding (대회 우승)</td><td>47.1%</td><td>28.2%</td></tr>
<tr><td>SIFT + Fisher Vectors (이후 최고 기록)</td><td>45.7%</td><td>25.7%</td></tr>
<tr><td><strong>CNN (이 논문)</strong></td><td><strong>37.5%</strong></td><td><strong>17.0%</strong></td></tr>
</table>
<p>Top-5 error 기준으로 기존 최고보다 <strong>8.7%p</strong> 낮다. 당시 이 대회에서는 1년에 1~2%p씩 나아지는 것이 보통이었다.</p>
<h3>ILSVRC-2012</h3>
<p>Test 정답이 공개되지 않아 validation 결과를 주로 보고했다(validation과 test 차이는 0.1%p 이내였다).</p>
<table>
<tr><th>모델</th><th>Top-5 error (val)</th><th>Top-5 error (test)</th></tr>
<tr><td>2등 팀 (SIFT + Fisher Vectors)</td><td>—</td><td>26.2%</td></tr>
<tr><td>CNN 1개</td><td>18.2%</td><td>—</td></tr>
<tr><td>CNN 5개 평균</td><td>16.4%</td><td>16.4%</td></tr>
<tr><td>Conv 층 1개 추가 + 전체 ImageNet으로 사전학습 후 fine-tuning, 1개</td><td>16.6%</td><td>—</td></tr>
<tr><td><strong>위 사전학습 CNN 2개 + CNN 5개 평균</strong></td><td><strong>15.4%</strong></td><td><strong>15.3%</strong></td></tr>
</table>
<p>2등과의 차이는 <strong>10.9%p</strong>다. 표에서 두 가지를 더 읽을 수 있다.</p>
<ul>
<li><strong>Ensemble</strong>: 모델 여러 개의 예측을 평균하면 18.2% → 16.4%로 좋아진다.</li>
<li><strong>Pre-training + fine-tuning</strong>: 더 큰 데이터(ImageNet 2011 가을판 전체, 1,500만 장·22,000 class)로 먼저 학습시키고 1,000 class로 다시 다듬으면 더 좋아진다. 지금 LLM이 쓰는 "크게 미리 학습하고 과제에 맞게 다듬는" 방식이 이미 여기 있다.</li>
</ul>
<p>ImageNet 2009 가을판(10,184 class, 890만 장)에서도 top-1 67.4%, top-5 40.9%로 기존 최고(78.1%, 60.9%)를 크게 앞섰다.</p>`
      },
      {
        no: '6.1', title: 'Qualitative Evaluations', desc: '모델이 실제로 무엇을 배웠는지 들여다보기',
        body: R`
<h3>첫 층 kernel</h3>
<p>첫 convolution 층이 배운 kernel 96개를 그림으로 그려 보면(논문 Figure 3) 여러 방향의 줄무늬, 경계선, 색 덩어리가 나온다. 사람이 설계하지 않았는데 이미지 처리의 기본 filter를 스스로 배운 것이다.</p>
<p>흥미로운 점은 GPU별로 나뉜 kernel의 성격이 달랐다는 것이다. <strong>GPU 1의 kernel은 대부분 색과 무관</strong>한 흑백 경계선이었고, <strong>GPU 2의 kernel은 대부분 색에 특화</strong>되어 있었다. 이 분업은 무작위 초기화와 상관없이 매번 나타났다. 3.2절의 제한된 통신 구조 때문에 생긴 현상이다.</p>
<h3>예측 결과</h3>
<p>Figure 4 왼쪽은 test 사진 8장에 대한 top-5 예측이다. 사진 가운데에 있지 않은 물체(예: 구석의 진드기)도 맞혔다. 틀린 경우도 대부분 그럴듯했다. 예를 들어 grille(자동차 앞 그릴)을 정답으로 단 사진에서 convertible(오픈카)을 1순위로 답했다. 사진 자체에 둘 다 보이니 라벨이 애매한 것이다.</p>
<h3>마지막 hidden 층 = 이미지의 요약</h3>
<p>마지막 hidden 층(FC7)의 4096개 숫자를 사진의 "요약 vector"로 보고, vector끼리 거리가 가까운 사진을 찾아봤다(Figure 4 오른쪽). 코끼리 사진에서 찾은 비슷한 사진들은 pixel 단위로는 전혀 다른데도(다른 자세, 다른 배경) 모두 코끼리였다. 모델이 겉모습이 아니라 <strong>의미</strong>에 가까운 표현을 배웠다는 뜻이다.</p>
<p>저자들은 4096칸 vector는 비교하기 무거우니 짧은 binary code로 압축하면 이미지 검색에 쓸 수 있을 거라 제안했다. 이 아이디어, 즉 학습된 network의 중간 vector를 다른 일에 쓰는 것은 이후 <strong>feature extraction</strong>과 <strong>transfer learning</strong>(전이 학습)으로 크게 퍼진다. #7 Word2Vec의 embedding과도 같은 생각이다.</p>`
      },
      {
        no: '7', title: 'Discussion', desc: '깊이가 중요하다, 그리고 다음 과제',
        body: R`
<p>저자들의 결론은 크고 깊은 CNN이 <strong>순수한 supervised learning만으로</strong> 매우 어려운 데이터셋에서 기록적인 결과를 낼 수 있다는 것이다.</p>
<ul>
<li><strong>깊이가 중요하다</strong>: 가운데 convolution 층 하나만 빼도 top-1 성능이 약 2%p 떨어졌다. 각 층의 parameter는 전체의 1% 남짓인데도 그렇다.</li>
<li><strong>Unsupervised pre-training을 쓰지 않았다</strong>: 당시에는 라벨 없이 먼저 층별로 학습시키는 방법이 유행했다. 저자들은 그게 도움이 될 거라 예상하면서도, 라벨 있는 데이터를 늘리지 않고 모델을 키우는 것만으로 충분했다고 적었다.</li>
<li><strong>아직 사람의 시각에는 멀다</strong>: Network를 키우고 오래 학습시킬수록 좋아졌지만, 사람의 inferotemporal(시각 처리) 경로에 비하면 몇 자릿수 작다.</li>
<li><strong>다음 목표</strong>: 정지 사진에는 없는 시간 정보가 담긴 <strong>영상</strong>에 아주 큰 CNN을 쓰는 것.</li>
</ul>`
      },
      {
        no: '', title: 'Limitations', desc: '저자가 밝힌 한계와 이후 연구에서 지적된 점',
        body: R`
<ul>
<li><strong>하드웨어에 맞춘 구조</strong>: GPU 2장 분할과 그에 맞춘 연결 구조는 원리가 아니라 3GB 메모리 제약 때문이었다. 저자들도 결과가 GPU 메모리와 학습 시간에 묶여 있다고 밝혔다. 이후 모델은 이 분할을 쓰지 않는다.</li>
<li><strong>FC 층에 몰린 parameter</strong>: 6천만 개 중 약 96%가 fully connected 층에 있어 무겁고 overfitting에 약하다. 이후 GoogLeNet(2014)과 ResNet(2015)은 FC 층을 global average pooling으로 바꿔 parameter를 크게 줄였다.</li>
<li><strong>효과가 크지 않았던 장치</strong>: LRN은 VGG(2014)에서 효과가 없다고 확인되어 사라졌다. 큰 11×11 kernel도 이후에는 3×3을 여러 겹 쌓는 방식(VGG)으로 바뀌었다.</li>
<li><strong>설정의 수작업</strong>: Learning rate를 줄이는 시점을 사람이 보고 정했고, 층 구성·GPU 통신 위치 등도 cross-validation으로 하나하나 맞췄다. 재현하기 어려운 부분이다.</li>
<li><strong>숫자 불일치</strong>: 입력 크기 224와 첫 층 출력 55가 맞지 않는다(3.5절). 논문만으로 정확히 재현하기 어려운 부분이 있다.</li>
<li><strong>라벨이 많이 필요하다</strong>: 사람이 라벨을 단 120만 장이 있어야 가능한 방법이다. 라벨 없이 배우는 방법은 이후 BERT(#12), CLIP(#18) 같은 self-supervised 방식으로 발전한다.</li>
</ul>`
      },
      {
        no: '', title: 'Impact', desc: '딥러닝 시대의 시작',
        body: R`
<p>AlexNet 이후 ILSVRC 우승 팀은 모두 CNN을 썼고, 오류율은 매년 빠르게 떨어졌다.</p>
<figure class="diagram"><svg viewBox="0 0 600 270" width="600">
<text x="20" y="14" class="st">ILSVRC 우승 팀의 top-5 error (test)</text>
<path class="e" d="M70,230 H580"/>
<path class="e d" d="M70,170 H580 M70,110 H580"/>
<text x="62" y="230" class="sm en">0%</text><text x="62" y="170" class="sm en">10%</text><text x="62" y="110" class="sm en">20%</text>
<rect class="g" x="90" y="61" width="56" height="169"/><text x="118" y="51" class="sm">28.2</text><text x="118" y="244">2010</text><text x="118" y="258" class="sm">NEC</text>
<rect class="g" x="170" y="75" width="56" height="155"/><text x="198" y="65" class="sm">25.8</text><text x="198" y="244">2011</text><text x="198" y="258" class="sm">XRCE</text>
<rect class="h" x="250" y="138" width="56" height="92"/><text x="278" y="128" class="sm">15.3</text><text x="278" y="244">2012</text><text x="278" y="258" class="sm">AlexNet</text>
<rect class="n" x="330" y="160" width="56" height="70"/><text x="358" y="150" class="sm">11.7</text><text x="358" y="244">2013</text><text x="358" y="258" class="sm">ZFNet 계열</text>
<rect class="n" x="410" y="190" width="56" height="40"/><text x="438" y="180" class="sm">6.7</text><text x="438" y="244">2014</text><text x="438" y="258" class="sm">GoogLeNet</text>
<rect class="n" x="490" y="209" width="56" height="21"/><text x="518" y="199" class="sm">3.6</text><text x="518" y="244">2015</text><text x="518" y="258" class="sm">ResNet</text>
</svg><figcaption>회색 막대는 사람이 설계한 특징을 쓴 방식이고, 2012년 AlexNet부터는 모두 CNN이다. 2015년 ResNet은 사람의 오류율로 자주 인용되는 약 5%보다 낮다.</figcaption></figure>
<ul>
<li><strong>CNN 계보</strong>: ZFNet(2013)은 AlexNet의 kernel 크기를 다듬었고, VGG(2014)는 3×3 kernel로 더 깊게, GoogLeNet(2014)은 여러 크기 kernel을 나란히 썼다. 다음에 읽을 <strong>#2 ResNet</strong>은 "층을 계속 깊게 쌓으면 왜 오히려 나빠지는가"를 풀어 152층까지 쌓았다.</li>
<li><strong>표준이 된 부품</strong>: ReLU, dropout, data augmentation, GPU 학습은 지금도 거의 모든 딥러닝의 기본값이다.</li>
<li><strong>Transfer learning</strong>: ImageNet으로 학습한 CNN의 중간 층을 다른 과제(물체 탐지, 의료 영상 등)에 가져다 쓰는 방식이 퍼졌다.</li>
<li><strong>GPU와 규모의 시대</strong>: "데이터와 계산을 키우면 좋아진다"는 이 논문의 예고는 #14 Scaling Laws와 오늘날의 LLM으로 이어진다. 1저자 Krizhevsky와 함께 쓴 Sutskever는 이후 #5 Seq2Seq를 썼고 OpenAI를 공동 창업했다.</li>
</ul>`
      },
      {
        no: '', title: 'Glossary', desc: '주요 용어',
        body: R`
<table>
<tr><th>영어</th><th>한국어</th><th>뜻</th></tr>
<tr><td>Image classification</td><td>이미지 분류</td><td>사진이 미리 정한 class 중 무엇인지 고르는 과제</td></tr>
<tr><td>Pixel · channel</td><td>픽셀 · 채널</td><td>이미지의 점 하나 · 점마다 있는 값의 종류(RGB면 3개, conv 출력이면 kernel 수)</td></tr>
<tr><td>Convolution · kernel</td><td>합성곱 · 커널</td><td>작은 weight 표(kernel)를 이미지 위에 밀며 곱해 더하는 연산</td></tr>
<tr><td>Stride</td><td>스트라이드</td><td>Kernel이나 pooling 창을 한 번에 옮기는 칸 수</td></tr>
<tr><td>Feature map</td><td>특징 맵</td><td>Kernel 하나가 이미지 전체에 반응한 결과 표</td></tr>
<tr><td>Max pooling</td><td>최대 풀링</td><td>이웃한 칸 중 가장 큰 값만 남겨 크기를 줄이는 연산</td></tr>
<tr><td>Fully connected layer</td><td>완전 연결 층</td><td>앞 층의 모든 값이 다음 층의 모든 neuron과 연결된 층</td></tr>
<tr><td>Activation function · ReLU</td><td>활성화 함수 · —</td><td>층마다 넣는 비선형 함수 · 음수는 0, 양수는 그대로 내보내는 함수</td></tr>
<tr><td>Saturation</td><td>포화</td><td>함수가 평평해져 기울기가 0에 가까워지는 현상</td></tr>
<tr><td>Softmax</td><td>소프트맥스</td><td>점수들을 0~1 사이, 합이 1인 확률로 바꾸는 함수</td></tr>
<tr><td>Top-1 · top-5 error</td><td>—</td><td>1순위 답이 틀린 비율 · 상위 5개 안에 정답이 없는 비율</td></tr>
<tr><td>Overfitting</td><td>과적합</td><td>학습 데이터를 외워 새 데이터에서 성능이 떨어지는 현상</td></tr>
<tr><td>Data augmentation</td><td>데이터 증강</td><td>라벨이 바뀌지 않는 변형으로 학습 데이터를 늘리는 것</td></tr>
<tr><td>Dropout</td><td>드롭아웃</td><td>학습 중 neuron 출력을 무작위로 0으로 만들어 overfitting을 막는 기법</td></tr>
<tr><td>Ensemble</td><td>앙상블</td><td>여러 모델의 예측을 평균해 오류를 줄이는 것</td></tr>
<tr><td>SGD · momentum</td><td>확률적 경사 하강법 · 모멘텀</td><td>Batch마다 gradient로 weight를 고치는 방법 · 이전 이동 방향을 일부 유지하는 것</td></tr>
<tr><td>Weight decay</td><td>가중치 감쇠</td><td>Weight를 매번 조금씩 0 쪽으로 당겨 너무 커지지 않게 하는 것</td></tr>
<tr><td>Epoch</td><td>에포크</td><td>학습 데이터 전체를 한 번 다 보는 것</td></tr>
<tr><td>Pre-training · fine-tuning</td><td>사전 학습 · 미세 조정</td><td>큰 데이터로 먼저 학습 · 그 모델을 목표 과제에 맞게 조금 더 학습</td></tr>
<tr><td>Transfer learning</td><td>전이 학습</td><td>한 과제에서 배운 모델을 다른 과제에 가져다 쓰는 것</td></tr>
</table>`
      },
    ],
    links: [
      { to: 'dl-cnn', why: 'Convolution, pooling, 층이 깊어질수록 넓은 특징을 보는 원리' },
      { to: 'dl-activation', why: 'ReLU와 sigmoid·tanh의 차이, saturation과 vanishing gradient' },
      { to: 'dl-norm', why: 'Dropout과 이후 LRN을 대신한 BatchNorm' },
      { to: 'dl-optim', why: '5절의 SGD + momentum, 이후 #3에서 읽을 Adam' },
    ],
    quiz: [
      { q: 'AlexNet이 tanh 대신 ReLU를 쓴 가장 큰 이유는?', options: ['입력이 커져도 기울기가 0으로 줄지 않아 학습이 훨씬 빨라서', '출력이 항상 0과 1 사이로 묶여 값이 안정돼서', '음수 입력도 그대로 전달해 정보 손실이 없어서', 'Parameter 수를 절반으로 줄일 수 있어서'], answer: 0, explain: '입력이 크면 tanh는 평평해져(saturation) gradient가 거의 0이 된다. ReLU는 양수 구간에서 기울기가 항상 1이라, CIFAR-10 실험에서 같은 training error에 6배 빨리 도달했다.' },
      { q: 'AlexNet 모델을 GPU 2장에 나눠 실은 이유는?', options: ['GPU 한 장의 메모리(3GB)에 모델이 다 들어가지 않아서', 'GPU 두 장이 서로 다른 데이터셋을 학습해야 해서', '한 장은 학습에, 한 장은 테스트에 쓰려고', '두 GPU의 예측을 ensemble로 평균하려고'], answer: 0, explain: 'GTX 580은 메모리가 3GB여서 큰 network가 들어가지 않았다. 각 층의 kernel을 반씩 나눠 올리고 특정 층에서만 GPU끼리 통신하게 했다.' },
      { q: 'AlexNet의 parameter 약 6천만 개는 주로 어디에 있나?', options: ['Fully connected 층 3개 (약 96%)', 'Convolution 층 5개 (약 96%)', 'Local response normalization 층', 'Max pooling 층'], answer: 0, explain: 'FC6만 9,216×4,096 ≈ 3,775만 개다. Convolution 층은 kernel이 작고 위치마다 공유되므로 다 합쳐도 약 230만 개다. Pooling과 LRN에는 학습되는 parameter가 없다.' },
      { q: '학습 때 256×256 이미지에서 224×224 조각을 무작위로 잘라 쓴 목적은?', options: ['라벨이 바뀌지 않는 변형으로 데이터를 늘려 overfitting을 줄이려고', '입력 크기를 줄여 GPU 메모리 사용을 줄이려고', '가장자리의 잡음을 지워 정확도를 높이려고', 'Pooling 층에서 크기를 맞추려고'], answer: 0, explain: '위치를 바꿔 자르고 좌우 반전까지 하면 2,048가지 변형이 생긴다. 저자들은 이게 없으면 상당한 overfitting 때문에 훨씬 작은 모델을 써야 했을 것이라 했다.' },
      { q: 'AlexNet에서 dropout을 쓸 때 테스트 단계에서 하는 일은?', options: ['모든 neuron을 켜고 출력에 0.5를 곱한다', '학습 때처럼 neuron 절반을 무작위로 끈다', 'Dropout을 쓴 층을 통째로 뺀다', '여러 번 돌려 나온 예측 중 다수결로 고른다'], answer: 0, explain: '학습 때 각 neuron은 평균적으로 절반만 켜져 있었으므로, 테스트 때는 모두 켜고 0.5를 곱해 출력 크기를 맞춘다. 수많은 sub-network 예측의 기하평균과 비슷한 효과가 난다.' },
      { q: 'Discussion에서 "깊이가 중요하다"의 근거로 든 결과는?', options: ['가운데 convolution 층 하나만 빼도 top-1 성능이 약 2%p 떨어졌다', 'FC 층을 하나 더 넣으면 top-1 성능이 약 2%p 올랐다', 'GPU를 4장으로 늘리면 학습이 2배 빨라졌다', 'Kernel 크기를 키우면 top-5 성능이 2%p 올랐다'], answer: 0, explain: '각 convolution 층의 parameter는 전체의 1% 남짓인데도, 하나만 빼면 top-1 성능이 약 2%p 떨어졌다. 이 관찰이 이후 VGG, ResNet처럼 더 깊이 쌓는 연구로 이어진다.' },
    ],
  },
  {
    no: 11, id: '2017-transformer', title: 'Attention Is All You Need', short: 'Transformer',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin (Google Brain · Google Research · 토론토대)',
    venue: 'NeurIPS 2017',
    arxiv: 'https://arxiv.org/abs/1706.03762',
    lead: '순서대로 한 단어씩 읽던 번역 모델을 버리고, 모든 단어가 서로를 한 번에 바라보는 구조를 만든 논문. 지금의 GPT·Claude 같은 LLM이 전부 이 구조 위에 서 있다.',
    summary: R`RNN 없이 <strong>attention만으로</strong> 만든 번역 모델 Transformer 제안
모든 단어를 동시에 계산 → GPU를 꽉 채워 <strong>학습이 훨씬 빠름</strong>
어떤 두 단어든 한 단계 만에 연결 → 멀리 떨어진 단어 관계도 잘 잡음
영어→독일어 BLEU 28.4로 당시 최고 기록, 학습 비용은 기존의 몇 분의 1`,
    sections: [
      {
        no: '', title: 'Prerequisites', desc: '이 논문을 읽기 전에 필요한 개념',
        body: R`
<p>이 논문이 풀려는 과제는 <strong>machine translation</strong>(기계 번역)이다. 영어 문장 "I love cats"를 넣으면 독일어 문장 "Ich liebe Katzen"을 내놓는 프로그램을 만드는 것이다. 이렇게 순서가 있는 무언가(문장)를 받아 다른 순서 있는 무언가를 만드는 일을 <strong>sequence transduction</strong>(시퀀스 변환)이라고 부른다.</p>
<p>컴퓨터는 글자를 그대로 계산하지 못하므로 세 단계를 거친다.</p>
<ol>
<li><strong>Token으로 자르기</strong>: 문장을 단어나 단어 조각으로 나눈다. "I love cats" → [I] [love] [cats]</li>
<li><strong>Vector로 바꾸기</strong>: token마다 숫자 512개짜리 목록(vector)을 붙인다. 이를 <strong>embedding</strong>이라 한다. 비슷한 뜻의 단어는 비슷한 숫자 목록을 갖도록 학습된다. 예를 들어 [cats] → (0.21, −1.30, 0.05, …)처럼.</li>
<li><strong>Encoder와 decoder</strong>: <strong>encoder</strong>가 입력 문장 전체를 읽고 각 단어의 의미를 문맥에 맞게 다듬은 vector들을 만든다. <strong>Decoder</strong>는 그 vector들을 참고하면서 출력 문장을 한 단어씩 만들어 낸다.</li>
</ol>
<p>이 큰 틀(encoder → decoder)은 이 논문 전에도 있었다. 이 논문이 바꾼 것은 <strong>encoder와 decoder 안에서 단어들을 처리하는 방식</strong>이다.</p>`
      },
      {
        no: '1', title: 'Introduction', desc: 'RNN이 느리고 먼 단어를 놓치는 이유',
        body: R`
<p>2017년 이전 번역 모델의 주류는 <strong>RNN</strong>(순환 신경망, 특히 LSTM)이었다. RNN은 사람이 책을 읽듯 단어를 <strong>왼쪽부터 하나씩</strong> 읽는다. 단어 하나를 읽을 때마다 지금까지 읽은 내용을 요약한 "기억"(<strong>hidden state</strong>, 은닉 상태)을 갱신하고, 그 기억을 다음 단어로 넘긴다.</p>
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
<div class="box"><strong>이 논문의 질문</strong>: 순서대로 읽는 구조를 아예 없애고, 단어끼리 직접 참고하는 <strong>attention</strong>(2절)만으로 번역 모델을 만들 수 있을까? 그러면 병렬 계산도 되고 먼 단어도 바로 연결될 텐데.</div>`
      },
      {
        no: '2', title: 'Background', desc: '기존 병렬화 시도와 attention의 기본 아이디어',
        body: R`
<p>순차 계산을 줄이려는 시도는 전에도 있었다.</p>
<p>CNN(convolutional neural network, 합성곱 신경망)으로 RNN을 대신하려는 시도(ConvS2S, ByteNet)도 있었다. 이들은 병렬 계산은 되지만, 한 번에 가까운 몇 단어만 보므로 먼 단어끼리 연결하려면 층을 여러 겹 쌓아야 했다.</p>
<h3>Attention</h3>
<p><strong>Attention</strong>은 "지금 이 단어를 이해하려면 문장의 다른 단어 중 <strong>어디를 얼마나</strong> 참고해야 하는가"를 숫자로 계산하는 방법이다.</p>
<p>예를 들어 "동물은 길을 건너지 않았다. 그것이 너무 피곤했기 때문이다."에서 "그것이"가 무엇을 가리키는지 알려면 앞 문장의 "동물은"을 봐야 한다. Attention은 "그것이"가 각 단어를 얼마나 참고할지 비율을 정하는데, 이 비율의 합은 항상 1(100%)이다.</p>
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
</svg><figcaption>Attention 가중치. "그것이"의 새 의미는 "동물은"의 정보를 52%, "길을"의 정보를 15% … 섞어서 만든다.</figcaption></figure>
<p>그 결과 "그것이"의 vector는 "동물"의 정보를 많이 담은 새 vector로 바뀐다. 이렇게 <strong>한 문장 안의 단어들끼리</strong> 서로 참고하는 것을 <strong>self-attention</strong>이라고 한다.</p>
<p>중요한 점은 이 계산이 단어마다 독립적이라는 것이다. "그것이"의 비율을 계산할 때 "동물은"의 비율 계산이 끝날 때까지 기다릴 필요가 없다. 그래서 문장의 모든 단어에 대해 <strong>동시에</strong> 계산할 수 있고, 첫 단어와 마지막 단어도 <strong>한 단계 만에</strong> 연결된다. RNN의 두 약점을 한꺼번에 해결한 것이다.</p>
<p>Attention 자체는 2014년(Bahdanau 등)부터 RNN 번역 모델에 덧붙여 쓰이던 기술이다. 이 논문의 새로움은 제목 그대로 <strong>"attention만 있으면 된다"</strong>, 즉 RNN을 완전히 빼고 attention만으로 모델 전체를 만든 데 있다.</p>`
      },
      {
        no: '3.1', title: 'Encoder and Decoder Stacks', desc: 'Transformer 전체 구조',
        body: R`
<p>그림은 아래에서 위로 읽는다. 각 부품은 이어지는 절에서 하나씩 자세히 본다.</p>
<figure class="diagram"><svg viewBox="0 0 640 572" width="640">
<g transform="translate(0,-50)">
<text x="150" y="590">입력 문장</text><text x="150" y="604" class="sm">I love my cat</text>
<rect class="n" x="40" y="530" width="220" height="34" rx="6"/><text x="150" y="547">Embedding + Positional Encoding</text>
<path class="a" d="M150,580 V566"/><path class="a" d="M150,530 V496"/>
<rect class="g" x="45" y="330" width="210" height="182" rx="10"/><text x="58" y="346" class="st sm">encoder 층 × 6</text>
<rect class="h" x="62" y="460" width="176" height="34" rx="6"/><text x="150" y="477">Multi-Head Attention</text>
<rect class="n" x="90" y="428" width="120" height="22" rx="4"/><text x="150" y="439" class="sm">Add &amp; Norm</text>
<rect class="h" x="70" y="380" width="160" height="34" rx="6"/><text x="150" y="397">Feed Forward</text>
<rect class="n" x="90" y="352" width="120" height="22" rx="4"/><text x="150" y="363" class="sm">Add &amp; Norm</text>
<path class="a" d="M150,460 V452"/><path class="a" d="M150,428 V416"/><path class="a" d="M150,380 V376"/>
<path class="a d" d="M150,504 H52 V439 H88"/><text x="26" y="472" class="sm">residual</text>
<path class="ha" d="M150,352 V300 H340 V387 H388"/><text x="245" y="290" class="sm">encoder 출력 (decoder의 key·value로)</text>
<text x="490" y="590">지금까지 만든 출력</text><text x="490" y="604" class="sm">&lt;시작&gt; Ich liebe</text>
<rect class="n" x="380" y="530" width="220" height="34" rx="6"/><text x="490" y="547">Embedding + Positional Encoding</text>
<path class="a" d="M490,580 V566"/><path class="a" d="M490,530 V496"/>
<rect class="g" x="375" y="240" width="230" height="272" rx="10"/><text x="388" y="256" class="st sm">decoder 층 × 6</text>
<rect class="h" x="380" y="460" width="220" height="34" rx="6"/><text x="490" y="477">Masked Multi-Head Attention</text>
<rect class="n" x="430" y="428" width="120" height="22" rx="4"/><text x="490" y="439" class="sm">Add &amp; Norm</text>
<rect class="h" x="390" y="370" width="200" height="34" rx="6"/><text x="490" y="387">Encoder-Decoder Attention</text>
<rect class="n" x="430" y="340" width="120" height="22" rx="4"/><text x="490" y="351" class="sm">Add &amp; Norm</text>
<rect class="h" x="390" y="292" width="200" height="34" rx="6"/><text x="490" y="309">Feed Forward</text>
<rect class="n" x="430" y="262" width="120" height="22" rx="4"/><text x="490" y="273" class="sm">Add &amp; Norm</text>
<path class="a" d="M490,460 V452"/><path class="a" d="M490,428 V406"/><path class="a" d="M490,370 V364"/><path class="a" d="M490,340 V328"/><path class="a" d="M490,292 V286"/>
<path class="a" d="M490,262 V206"/>
<rect class="n" x="400" y="172" width="180" height="34" rx="6"/><text x="490" y="189">Linear + Softmax</text>
<path class="a" d="M490,172 V130"/>
<rect class="h" x="400" y="96" width="180" height="34" rx="6"/><text x="490" y="113">다음 단어 확률</text>
<text x="490" y="74" class="sm">meine 0.91 · mein 0.04 · …</text>
<rect class="g" x="30" y="86" width="250" height="96" rx="8"/>
<text x="46" y="106" class="st sm">읽는 방향: 아래 → 위</text>
<path class="e d" d="M46,132 H86"/><text x="96" y="132" class="st sm">residual connection (3.1)</text>
<path class="ha" d="M46,158 H86"/><text x="96" y="158" class="st sm">encoder 출력 → decoder (3.2.3)</text>
</g>
</svg><figcaption>Transformer 전체 구조. 왼쪽 encoder가 입력 문장을 이해하고, 오른쪽 decoder가 그 결과를 참고해 다음 단어를 고른다.</figcaption></figure>
<h3>Encoder (왼쪽)</h3>
<p>입력 단어를 embedding하고 positional encoding을 더한 뒤, 같은 구조의 층을 <strong>6번</strong> 통과시킨다. 각 층은 두 부분이다.</p>
<ul>
<li><strong>Multi-head self-attention</strong>: 단어들이 서로 정보를 주고받는다. (단어 사이의 정보 교환)</li>
<li><strong>Feed-forward</strong>: 단어마다 따로, 같은 작은 신경망(512칸 → 2048칸 → 512칸)을 통과시킨다. Attention으로 모은 정보를 단어별로 소화하는 단계다. (단어 안의 정보 가공)</li>
</ul>
<p>층을 6번 반복하면 처음에는 "cat"이라는 단어 자체의 뜻만 갖던 vector가 점점 "이 문장에서 사랑받는 대상인 고양이"라는 문맥까지 담게 된다.</p>
<h3>두 가지 보조 장치: residual connection과 layer normalization</h3>
<ul>
<li><strong>Residual connection</strong>(잔차 연결, 그림의 점선): 각 부분의 출력을 입력에 <strong>더한다</strong>. 즉 $x$를 새 결과로 바꿔치기하지 않고 $x + \text{attention}(x)$로 덧붙인다. 원래 정보가 사라지지 않고, 층이 깊어도 학습 신호가 잘 전달된다. 문서를 고칠 때 원본 위에 메모를 덧붙이는 것과 같다.</li>
<li><strong>Layer normalization</strong>(층 정규화, LayerNorm): 각 단어 vector의 숫자들을 평균 0, 분산 1 근처로 맞춘다. 숫자가 층을 지날수록 너무 커지거나 작아지는 것을 막아 학습을 안정시킨다.</li>
</ul>
<h3>Decoder (오른쪽)</h3>
<p>Decoder도 6층이고, 층마다 세 부분이 있다.</p>
<ol>
<li><strong>Masked self-attention</strong>: 지금까지 만든 출력 단어끼리 서로 참고한다. 단, 아직 만들지 않은 뒤쪽 단어는 볼 수 없게 가린다(3.2.3).</li>
<li><strong>Encoder-decoder attention</strong>: query는 decoder에서, key와 value는 encoder 출력에서 가져온다. "다음 독일어 단어를 정하려면 영어 문장의 어디를 봐야 하나"를 계산하는 부분으로, 번역의 핵심이다. "Katze"를 만들 때는 "cat"을 많이 보게 된다.</li>
<li><strong>Feed-forward</strong>: encoder와 같다.</li>
</ol>
<p>마지막으로 decoder 출력을 vocabulary 크기(약 3만 7천 개)의 점수로 바꾸고 softmax로 확률을 만든다. 가장 확률이 높은 단어(또는 몇 개의 후보)를 다음 단어로 고른다.</p>
<h3>모델 크기</h3>
<table>
<tr><th></th><th>층 수</th><th>Vector 크기</th><th>Feed-forward 크기</th><th>Head 수</th><th>Parameter 수</th></tr>
<tr><td>Transformer (base)</td><td>6</td><td>512</td><td>2048</td><td>8</td><td>6,500만</td></tr>
<tr><td>Transformer (big)</td><td>6</td><td>1024</td><td>4096</td><td>16</td><td>2억 1,300만</td></tr>
</table>
<p>참고로 요즘 LLM은 이보다 수백~수천 배 크지만, 블록 하나의 설계는 거의 그대로다.</p>`
      },
      {
        no: '3.2.1', title: 'Scaled Dot-Product Attention', desc: 'Query·key·value로 참고 비율을 계산하는 방법',
        body: R`
<p>참고 비율을 계산하기 위해 각 단어는 자기 vector로부터 세 가지 vector를 만든다. 도서관에서 책을 찾는 상황에 비유하면 이해가 쉽다.</p>
<table>
<tr><th>이름</th><th>역할</th><th>도서관 비유</th></tr>
<tr><td><strong>Query</strong> (Q)</td><td>내가 찾는 것</td><td>검색창에 입력한 검색어</td></tr>
<tr><td><strong>Key</strong> (K)</td><td>나를 찾을 때 맞춰 볼 표지</td><td>각 책의 제목·태그</td></tr>
<tr><td><strong>Value</strong> (V)</td><td>실제로 건네줄 내용</td><td>책의 본문</td></tr>
</table>
<p>검색어(Q)를 모든 책의 태그(K)와 비교해 얼마나 잘 맞는지 점수를 매기고, 잘 맞는 책일수록 그 본문(V)을 많이 가져와 섞는다. Q, K, V는 각 단어 vector에 서로 다른 가중치 행렬을 곱해 만든다. 이 행렬들이 학습으로 정해지는 부분이다.</p>
<h3>숫자로 직접 따라가 보기</h3>
<p>단어 3개짜리 문장 "고양이가 매트에 앉았다"에서 "앉았다"가 누구를 참고할지 계산해 보자. 실제로는 vector 길이가 64이지만, 여기서는 2로 줄였다($d_k = 2$).</p>
<table>
<tr><th>단어</th><th>Key K</th><th>Value V</th></tr>
<tr><td>고양이가</td><td>(2, 0)</td><td>(1, 0)</td></tr>
<tr><td>매트에</td><td>(0, 1)</td><td>(0, 1)</td></tr>
<tr><td>앉았다</td><td>(1, 0)</td><td>(1, 1)</td></tr>
</table>
<p>"앉았다"의 query는 Q = (1, 1)이라고 하자.</p>
<ol>
<li><strong>점수 매기기: dot product(내적)</strong>: Q와 각 K의 같은 자리끼리 곱해서 더한다. 방향이 비슷할수록 커진다.
<br>고양이가: 1×2 + 1×0 = <strong>2</strong> · 매트에: 1×0 + 1×1 = <strong>1</strong> · 앉았다: 1×1 + 1×0 = <strong>1</strong></li>
<li><strong>크기 조절</strong>: $\sqrt{d_k} = \sqrt 2 \approx 1.41$로 나눈다. → 1.41, 0.71, 0.71 (이유는 아래)</li>
<li><strong>비율로 바꾸기 (softmax)</strong>: 각 점수에 $e^x$를 취한 뒤 전체 합으로 나눠 합이 1이 되게 한다.
<br>$e^{1.41} \approx 4.11$, $e^{0.71} \approx 2.03$, $e^{0.71} \approx 2.03$ → 합 8.17 → 비율 <strong>0.50, 0.25, 0.25</strong></li>
<li><strong>Value 섞기</strong>: 비율대로 V를 더한다.
<br>0.50×(1, 0) + 0.25×(0, 1) + 0.25×(1, 1) = <strong>(0.75, 0.50)</strong></li>
</ol>
<p>"앉았다"는 이제 "고양이가"의 정보를 절반 담은 새 vector (0.75, 0.50)이 되었다. "누가 앉았는가"라는 정보가 들어간 것이다. 이 네 단계를 한 줄로 쓴 것이 논문의 핵심 수식이다.</p>
$$\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$
<p>여기서 $Q, K, V$는 모든 단어의 query·key·value를 한 줄씩 쌓은 행렬이고, $QK^\top$는 모든 단어 쌍의 점수를 <strong>행렬 곱 한 번</strong>으로 구한다. GPU가 가장 잘하는 일이 바로 큰 행렬 곱이라 이 계산이 매우 빠르다. 논문은 이것을 <strong>Scaled Dot-Product Attention</strong>이라고 부른다.</p><h3>왜 √dₖ로 나누나</h3>
<p>실제 모델에서 Q와 K는 숫자 64개짜리 vector다($d_k = 64$). Dot product는 64개의 곱을 더한 값이라, 숫자가 많을수록 점수가 커지기 쉽다. 각 숫자가 평균 0, 분산 1인 무작위 값이라면 dot product의 분산은 64, 즉 점수가 보통 ±8 정도로 흩어진다.</p>
<p>점수가 크면 softmax가 한 단어에 거의 100%를 몰아준다. 아래는 같은 순서의 점수를 크기만 바꿔 softmax에 넣은 결과다.</p>
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
</svg><figcaption>Softmax 출력. 점수가 크면(오른쪽) 한 단어가 비율을 독차지한다.</figcaption></figure>
<p>오른쪽처럼 되면 두 가지 문제가 생긴다. 첫째, 다른 단어 정보를 거의 못 가져온다. 둘째, 학습이 멈춘다. 신경망은 "이 숫자를 조금 바꾸면 결과가 얼마나 좋아지나"(gradient)를 보고 스스로 고치는데, softmax가 1과 0에 붙어 버리면 숫자를 조금 바꿔도 출력이 거의 안 변해서 gradient가 0에 가까워진다.</p>
<p>그래서 점수를 $\sqrt{d_k} = \sqrt{64} = 8$로 나눠 분산을 다시 1로 되돌린다. 점수가 ±1 정도로 흩어지면 softmax가 왼쪽처럼 적당히 고른 비율을 내고, 학습도 잘 된다. 작은 장치지만 논문이 수식에 이름(<strong>Scaled</strong>)까지 붙인 이유다.</p>`
      },
      {
        no: '3.2.2', title: 'Multi-Head Attention', desc: 'Attention을 여러 개 나란히 돌리는 이유',
        body: R`
<p>한 단어가 다른 단어와 맺는 관계는 여러 종류다. "고양이가 매트에 앉았다"에서 "앉았다"는 주어(고양이가)와도, 장소(매트에)와도 관계가 있다. Attention 하나로는 이 중 한 가지 관계에 비율이 몰리기 쉽다.</p>
<p>그래서 논문은 attention을 <strong>8개</strong> 나란히 돌린다. 각각을 <strong>head</strong>라고 부른다. 단어 vector(512칸)를 8개의 서로 다른 행렬로 각각 64칸짜리 Q, K, V로 바꾸고, head마다 따로 attention을 계산한 뒤, 결과 8개(64칸 × 8 = 512칸)를 이어 붙여 다시 한 번 행렬을 곱한다.</p>
<figure class="diagram"><svg viewBox="0 0 680 260" width="680">
<rect class="n" x="20" y="108" width="120" height="44" rx="6"/><text x="80" y="122">단어 vector</text><text x="80" y="140" class="sm">512칸</text>
<rect class="h" x="230" y="14" width="170" height="22" rx="4"/><text x="315" y="25" class="sm">head 1 · 예: 주어-동사</text>
<rect class="h" x="230" y="42" width="170" height="22" rx="4"/><text x="315" y="53" class="sm">head 2 · 예: 장소</text>
<rect class="h" x="230" y="70" width="170" height="22" rx="4"/><text x="315" y="81" class="sm">head 3 · 예: 바로 앞 단어</text>
<rect class="h" x="230" y="98" width="170" height="22" rx="4"/><text x="315" y="109" class="sm">head 4 · 예: 지시 대상</text>
<rect class="h" x="230" y="126" width="170" height="22" rx="4"/><text x="315" y="137" class="sm">head 5</text>
<rect class="h" x="230" y="154" width="170" height="22" rx="4"/><text x="315" y="165" class="sm">head 6</text>
<rect class="h" x="230" y="182" width="170" height="22" rx="4"/><text x="315" y="193" class="sm">head 7</text>
<rect class="h" x="230" y="210" width="170" height="22" rx="4"/><text x="315" y="221" class="sm">head 8</text>
<path class="a" d="M140,130 L228,25"/><path class="a" d="M140,130 L228,53"/><path class="a" d="M140,130 L228,81"/><path class="a" d="M140,130 L228,109"/>
<path class="a" d="M140,130 L228,137"/><path class="a" d="M140,130 L228,165"/><path class="a" d="M140,130 L228,193"/><path class="a" d="M140,130 L228,221"/>
<path class="e" d="M400,25 L470,130"/><path class="e" d="M400,53 L470,130"/><path class="e" d="M400,81 L470,130"/><path class="e" d="M400,109 L470,130"/>
<path class="e" d="M400,137 L470,130"/><path class="e" d="M400,165 L470,130"/><path class="e" d="M400,193 L470,130"/><path class="e" d="M400,221 L470,130"/>
<rect class="n" x="470" y="108" width="90" height="44" rx="6"/><text x="515" y="122">이어 붙이기</text><text x="515" y="140" class="sm">64 × 8 = 512</text>
<path class="a" d="M560,130 H578"/>
<rect class="n" x="580" y="108" width="90" height="44" rx="6"/><text x="625" y="122">행렬 곱</text><text x="625" y="140" class="sm">512칸 출력</text>
<text x="185" y="248" class="sm">head마다 다른 행렬로 Q·K·V를 만든다</text>
</svg><figcaption>Multi-head attention. head별 역할 이름은 이해를 돕기 위한 예시이고, 실제로 무엇을 볼지는 학습이 정한다.</figcaption></figure>
<p>Head마다 vector를 64칸으로 줄였기 때문에, 8개를 돌려도 전체 계산량은 512칸짜리 attention 하나와 비슷하다. 계산량은 그대로 두고 관점만 8개로 늘린 셈이다. 논문 부록의 시각화를 보면 실제로 어떤 head는 문장 구조를, 어떤 head는 "its"가 가리키는 대상을 따라가는 등 head마다 다른 패턴을 학습했다.</p>`
      },
      {
        no: '3.2.3', title: 'Applications of Attention in our Model', desc: '모델 안에서 attention이 쓰이는 세 곳과 decoder masking',
        body: R`
<p>Transformer 안에서 attention은 세 곳에 쓰인다.</p>
<ol>
<li><strong>Encoder self-attention</strong>: 입력 문장의 모든 단어가 서로를 본다.</li>
<li><strong>Decoder self-attention</strong>: 지금까지 만든 출력 단어끼리 서로 본다. 단, 뒤쪽 단어는 가린다(아래).</li>
<li><strong>Encoder-decoder attention</strong>: query는 decoder에서, key와 value는 encoder 출력에서 가져온다.</li>
</ol>
<figure class="diagram"><svg viewBox="0 0 640 212" width="640">
<text x="110" y="16">Encoder self-attention</text>
<rect class="h" x="30" y="34" width="160" height="34" rx="6"/><text x="110" y="51">Attention</text>
<rect class="n" x="20" y="130" width="180" height="34" rx="6"/><text x="110" y="147">encoder 단어들</text>
<path class="a" d="M60,130 V70"/><text x="70" y="100" class="st sm">Q</text>
<path class="a" d="M110,130 V70"/><text x="120" y="100" class="st sm">K</text>
<path class="a" d="M160,130 V70"/><text x="170" y="100" class="st sm">V</text>
<text x="110" y="184" class="sm">입력 문장 안에서 서로 본다</text><text x="110" y="200" class="sm">I · love · my · cat</text>
<text x="320" y="16">Masked self-attention</text>
<rect class="h" x="240" y="34" width="160" height="34" rx="6"/><text x="320" y="51">Attention</text>
<rect class="n" x="230" y="130" width="180" height="34" rx="6"/><text x="320" y="147">decoder 단어들</text>
<path class="a" d="M270,130 V70"/><text x="280" y="100" class="st sm">Q</text>
<path class="a" d="M320,130 V70"/><text x="330" y="100" class="st sm">K</text>
<path class="a" d="M370,130 V70"/><text x="380" y="100" class="st sm">V</text>
<text x="320" y="184" class="sm">지금까지 만든 출력끼리, 앞 단어만</text><text x="320" y="200" class="sm">&lt;시작&gt; · Ich · liebe</text>
<text x="530" y="16">Encoder-decoder attention</text>
<rect class="h" x="450" y="34" width="160" height="34" rx="6"/><text x="530" y="51">Attention</text>
<rect class="n" x="435" y="130" width="70" height="34" rx="6"/><text x="470" y="147">decoder</text>
<rect class="n" x="515" y="130" width="110" height="34" rx="6"/><text x="570" y="147">encoder 출력</text>
<path class="a" d="M470,130 V70"/><text x="480" y="100" class="st sm">Q</text>
<path class="ha" d="M545,130 V70"/><text x="555" y="100" class="st sm">K</text>
<path class="ha" d="M595,130 V70"/><text x="605" y="100" class="st sm">V</text>
<text x="530" y="184" class="sm">출력 단어가 입력 문장을 본다</text><text x="530" y="200" class="sm">Katze → cat</text>
</svg><figcaption>Attention이 쓰이는 세 곳. 차이는 query(Q)와 key·value(K, V)를 어디서 가져오느냐뿐이다. 계산 자체는 3.2.1과 같다.</figcaption></figure>
<h3>Decoder masking</h3>
<p>번역 결과를 만들 때 decoder는 단어를 하나씩 만든다. 방금 만든 단어를 다시 입력에 붙여 다음 단어를 만드는 식이다.</p>
<table>
<tr><th>단계</th><th>Decoder 입력</th><th>나온 단어</th></tr>
<tr><td>1</td><td>&lt;시작&gt;</td><td>Ich</td></tr>
<tr><td>2</td><td>&lt;시작&gt; Ich</td><td>liebe</td></tr>
<tr><td>3</td><td>&lt;시작&gt; Ich liebe</td><td>meine</td></tr>
<tr><td>4</td><td>&lt;시작&gt; Ich liebe meine</td><td>Katze</td></tr>
<tr><td>5</td><td>&lt;시작&gt; Ich liebe meine Katze</td><td>&lt;끝&gt; → 종료</td></tr>
</table>
<p>그런데 학습할 때는 정답 문장 전체를 알고 있으므로, 이 다섯 단계를 <strong>한 번에</strong> 계산하고 싶다(그래야 빠르다). 문제는 정답 문장을 통째로 넣으면 2단계에서 "liebe"를 맞혀야 하는데 입력에 이미 "liebe"가 보인다는 것이다. 시험지에 답이 적혀 있는 셈이다.</p>
<p>그래서 self-attention의 점수표에서 <strong>자기보다 뒤에 있는 단어의 칸을 지운다</strong>(점수를 $-\infty$로 두면 softmax 후 비율이 정확히 0이 된다). 이것을 <strong>masking</strong>이라고 한다.</p>
<figure class="diagram"><svg viewBox="0 0 420 300" width="420">
<text x="250" y="16" class="sm">참고할 수 있는 단어 (Key)</text>
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
</svg><figcaption>Decoder self-attention의 마스크. 각 행(지금 위치)은 색칠된 칸, 즉 자기와 자기 앞 단어만 참고할 수 있다. ×는 가려진 미래.</figcaption></figure>
<p>이렇게 하면 학습 때는 모든 위치를 한 번에 계산하면서도, 각 위치는 실제 생성할 때와 똑같이 "앞에 나온 단어만 보고 다음 단어를 맞히는" 연습을 하게 된다. 지금의 GPT 같은 LLM도 정확히 이 마스크를 쓴 decoder만으로 만들어져 있다.</p>`
      },
      {
        no: '3.3', title: 'Position-wise Feed-Forward Networks', desc: '단어마다 따로 적용하는 작은 신경망',
        body: R`
<p>Attention 다음에 오는 부분이다. 각 단어 vector를 <strong>따로따로</strong>, 하지만 모든 위치에서 <strong>같은</strong> 작은 신경망에 통과시킨다. 그래서 position-wise(위치별)라고 부른다.</p>
$$\mathrm{FFN}(x) = \max(0,\ xW_1 + b_1)\,W_2 + b_2$$
<p>512칸 vector를 2048칸으로 넓혔다가 ReLU($\max(0, \cdot)$, 음수를 0으로 만드는 함수)를 거쳐 다시 512칸으로 줄인다. Attention이 단어 사이에서 정보를 모으는 단계라면, feed-forward는 모은 정보를 단어마다 가공하는 단계다. 같은 층 안에서는 모든 위치가 같은 가중치를 쓰고, 층마다 가중치는 다르다.</p>
<figure class="diagram"><svg viewBox="0 0 640 230" width="640">
<rect class="n" x="60" y="150" width="100" height="26" rx="4"/><text x="110" y="163" class="sm">512칸</text><text x="110" y="192">I</text>
<path class="a" d="M110,150 V122"/>
<rect class="h" x="60" y="80" width="100" height="40" rx="6"/><text x="110" y="94">FFN</text><text x="110" y="110" class="sm">512→2048→512</text>
<path class="a" d="M110,80 V48"/>
<rect class="n" x="60" y="20" width="100" height="26" rx="4"/><text x="110" y="33" class="sm">512칸</text>
<text x="180" y="100">=</text>
<rect class="n" x="200" y="150" width="100" height="26" rx="4"/><text x="250" y="163" class="sm">512칸</text><text x="250" y="192">love</text>
<path class="a" d="M250,150 V122"/>
<rect class="h" x="200" y="80" width="100" height="40" rx="6"/><text x="250" y="94">FFN</text><text x="250" y="110" class="sm">512→2048→512</text>
<path class="a" d="M250,80 V48"/>
<rect class="n" x="200" y="20" width="100" height="26" rx="4"/><text x="250" y="33" class="sm">512칸</text>
<text x="320" y="100">=</text>
<rect class="n" x="340" y="150" width="100" height="26" rx="4"/><text x="390" y="163" class="sm">512칸</text><text x="390" y="192">my</text>
<path class="a" d="M390,150 V122"/>
<rect class="h" x="340" y="80" width="100" height="40" rx="6"/><text x="390" y="94">FFN</text><text x="390" y="110" class="sm">512→2048→512</text>
<path class="a" d="M390,80 V48"/>
<rect class="n" x="340" y="20" width="100" height="26" rx="4"/><text x="390" y="33" class="sm">512칸</text>
<text x="460" y="100">=</text>
<rect class="n" x="480" y="150" width="100" height="26" rx="4"/><text x="530" y="163" class="sm">512칸</text><text x="530" y="192">cat</text>
<path class="a" d="M530,150 V122"/>
<rect class="h" x="480" y="80" width="100" height="40" rx="6"/><text x="530" y="94">FFN</text><text x="530" y="110" class="sm">512→2048→512</text>
<path class="a" d="M530,80 V48"/>
<rect class="n" x="480" y="20" width="100" height="26" rx="4"/><text x="530" y="33" class="sm">512칸</text>
<text x="320" y="218" class="sm">네 FFN은 같은 W₁, W₂를 쓴다. 단어 사이에 정보가 오가지 않는다</text>
</svg><figcaption>Position-wise feed-forward. 위치마다 같은 신경망을 따로 적용하므로, 단어 수만큼 동시에 계산할 수 있다.</figcaption></figure>`
      },
      {
        no: '3.4', title: 'Embeddings and Softmax', desc: 'Token을 vector로, vector를 다음 token 확률로',
        body: R`
<p>입력 token과 출력 token을 $d_{model} = 512$칸 vector로 바꾸는 embedding은 학습으로 정한다. Decoder 끝에서는 linear 변환과 softmax로 다음 token의 확률을 만든다.</p>
<p>이 논문은 encoder 입력 embedding, decoder 입력 embedding, softmax 직전 linear 변환, 이 세 곳에서 <strong>같은 가중치 행렬을 함께 쓴다</strong>(weight tying). Parameter 수가 줄고, 입력에서 단어를 읽는 방식과 출력에서 단어를 고르는 방식이 하나로 묶인다. 또 embedding 값에는 $\sqrt{d_{model}}$을 곱한다(논문은 이유를 따로 설명하지 않는다).</p>
<figure class="diagram"><svg viewBox="0 0 640 192" width="640">
<rect class="h" x="170" y="14" width="300" height="46" rx="8"/><text x="320" y="31">공유 가중치 행렬 E</text><text x="320" y="49" class="sm">vocabulary 약 37,000 × 512</text>
<path class="ha d" d="M225.5,60 L110,106"/>
<rect class="n" x="15" y="108" width="190" height="34" rx="6"/><text x="110" y="125">Encoder input embedding</text>
<text x="110" y="162" class="sm">token → vector</text><text x="110" y="178" class="sm">E에서 그 token의 행을 꺼냄</text>
<path class="ha d" d="M320,60 L320,106"/>
<rect class="n" x="225" y="108" width="190" height="34" rx="6"/><text x="320" y="125">Decoder input embedding</text>
<text x="320" y="162" class="sm">token → vector</text><text x="320" y="178" class="sm">같은 E에서 행을 꺼냄</text>
<path class="ha d" d="M414.5,60 L530,106"/>
<rect class="n" x="435" y="108" width="190" height="34" rx="6"/><text x="530" y="125">Pre-softmax linear</text>
<text x="530" y="162" class="sm">vector → 단어별 점수</text><text x="530" y="178" class="sm">vector에 Eᵀ를 곱함</text>
</svg><figcaption>Weight tying. 행렬 하나를 세 곳이 함께 쓴다. 입력 쪽은 행을 꺼내 읽고, 출력 쪽은 같은 행렬로 모든 단어의 점수를 한 번에 계산한다.</figcaption></figure>`
      },
      {
        no: '3.5', title: 'Positional Encoding', desc: '단어 순서 정보를 넣는 방법',
        body: R`
<p>Attention에는 치명적인 빈틈이 하나 있다. 단어 순서를 모른다. 위의 계산을 다시 보면 점수는 단어 vector끼리의 dot product일 뿐이라, "개가 사람을 물었다"와 "사람이 개를 물었다"처럼 단어를 뒤섞어도 각 단어가 받는 비율은 그대로다. RNN은 왼쪽부터 읽으니 순서를 저절로 알았지만, 모든 단어를 한꺼번에 보는 Transformer는 따로 알려줘야 한다.</p>
<p>논문의 방법은 각 단어 vector에 <strong>위치마다 다른 숫자 패턴</strong>을 더하는 것이다. 이 패턴은 주기가 서로 다른 사인·코사인 파동에서 값을 읽어 만든다.</p>
$$PE_{(pos,\,2i)} = \sin\!\left(\frac{pos}{10000^{2i/512}}\right), \qquad PE_{(pos,\,2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/512}}\right)$$
<p>$pos$는 단어의 위치(0, 1, 2, …), $i$는 512칸 중 몇 번째 칸 쌍인지다. 칸 번호가 작으면 파동이 빠르게, 크면 느리게 출렁인다.</p>
<figure class="diagram"><svg viewBox="0 0 640 270" width="640">
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
<text x="203" y="78" class="st sm">−0.54</text><text x="187" y="134" class="en sm">−0.02</text><text x="203" y="186" class="st sm">0.84</text>
</svg><figcaption>세 칸의 파동. 10번째 단어(점선)는 각 파동에서 읽은 값 (−0.54, −0.02, 0.84, …)을 위치 표시로 갖는다.</figcaption></figure>
<p>시계를 떠올리면 쉽다. 초침만 보면 1분마다 같은 위치가 반복되지만, 분침과 시침까지 같이 보면 하루 중 모든 시각이 서로 다르게 표시된다. Positional encoding도 빠른 파동부터 아주 느린 파동까지 256쌍을 함께 쓰므로 모든 위치가 고유한 패턴을 갖는다.</p>
<p>이 방식의 장점은 두 가지다. 학습할 것이 없어 바로 계산할 수 있고, 위치가 $k$만큼 떨어진 두 단어의 패턴 관계가 위치와 상관없이 일정해서(사인·코사인의 덧셈 정리) 모델이 "몇 칸 앞"이라는 <strong>상대 위치</strong>를 배우기 쉽다. 저자들은 위치마다 vector를 학습시키는 방식도 시험했는데 성능은 거의 같았고, 학습 때 본 것보다 긴 문장에도 쓸 수 있을 것이라는 기대로 사인 방식을 택했다.</p>`
      },
      {
        no: '4', title: 'Why Self-Attention', desc: 'RNN·CNN과 계산량·병렬성·경로 길이 비교',
        body: R`
<p>논문은 self-attention을 RNN, CNN과 세 가지 기준으로 비교한다($n$은 문장 길이, $d$는 vector 크기, $k$는 CNN이 한 번에 보는 폭).</p>
<table>
<tr><th>층 종류</th><th>층 하나의 계산량</th><th>차례로 해야 하는 계산 수</th><th>먼 두 단어 사이 거리</th></tr>
<tr><td>Self-attention</td><td>$O(n^2 \cdot d)$</td><td>$O(1)$ · 한 번에</td><td>$O(1)$ · 바로 연결</td></tr>
<tr><td>RNN</td><td>$O(n \cdot d^2)$</td><td>$O(n)$ · 단어 수만큼</td><td>$O(n)$ · 단어 수만큼 거침</td></tr>
<tr><td>CNN</td><td>$O(k \cdot n \cdot d^2)$</td><td>$O(1)$</td><td>$O(\log_k n)$ · 층 여러 개</td></tr>
</table>
<p>$O(\cdot)$ 표기는 "대략 무엇에 비례하는가"를 뜻한다. 각 열의 의미는 이렇다.</p>
<ul>
<li><strong>계산량</strong>: self-attention은 모든 단어 쌍($n \times n$)을 계산하므로 $n^2$에 비례하고, RNN은 단어마다 $d \times d$ 행렬을 곱하므로 $d^2$에 비례한다. 번역 문장은 보통 단어 수가 vector 크기보다 훨씬 작다. 예를 들어 $n = 50$, $d = 512$이면 self-attention은 약 $50 \times 50 \times 512 \approx$ <strong>128만</strong>, RNN은 약 $50 \times 512 \times 512 \approx$ <strong>1,311만</strong>으로 self-attention이 10배쯤 싸다.</li>
<li><strong>차례로 해야 하는 계산 수</strong>: 병렬화가 얼마나 잘 되는지. RNN만 문장 길이에 비례한다.</li>
<li><strong>먼 두 단어 사이 거리</strong>: 정보가 몇 단계를 거쳐야 전달되는지. 짧을수록 먼 관계를 배우기 쉽다. Self-attention은 어떤 두 단어든 한 단계다.</li>
</ul>
<figure class="diagram"><svg viewBox="0 0 640 240" width="640">
<text x="16" y="36" class="st">RNN</text>
<circle class="h" cx="150" cy="36" r="8"/>
<path class="he" d="M167,36 H196"/>
<circle class="n" cx="195" cy="36" r="8"/>
<path class="he" d="M212,36 H241"/>
<circle class="n" cx="240" cy="36" r="8"/>
<path class="he" d="M257,36 H286"/>
<circle class="n" cx="285" cy="36" r="8"/>
<path class="he" d="M302,36 H331"/>
<circle class="n" cx="330" cy="36" r="8"/>
<path class="he" d="M347,36 H376"/>
<circle class="n" cx="375" cy="36" r="8"/>
<path class="he" d="M392,36 H421"/>
<circle class="n" cx="420" cy="36" r="8"/>
<path class="he" d="M437,36 H466"/>
<circle class="h" cx="465" cy="36" r="8"/>
<text x="490" y="36" class="st sm">7단계 · O(n)</text>
<text x="16" y="128" class="st">CNN (k = 2)</text>
<path class="he" d="M150,168 L172.5,140"/>
<path class="e" d="M195,168 L172.5,140"/>
<path class="e" d="M240,168 L262.5,140"/>
<path class="e" d="M285,168 L262.5,140"/>
<path class="e" d="M330,168 L352.5,140"/>
<path class="e" d="M375,168 L352.5,140"/>
<path class="e" d="M420,168 L442.5,140"/>
<path class="he" d="M465,168 L442.5,140"/>
<path class="he" d="M172.5,140 L217.5,112"/>
<path class="e" d="M262.5,140 L217.5,112"/>
<path class="e" d="M352.5,140 L397.5,112"/>
<path class="he" d="M442.5,140 L397.5,112"/>
<path class="he" d="M217.5,112 L307.5,84"/>
<path class="he" d="M397.5,112 L307.5,84"/>
<circle class="h" cx="150" cy="168" r="8"/>
<circle class="n" cx="195" cy="168" r="8"/>
<circle class="n" cx="240" cy="168" r="8"/>
<circle class="n" cx="285" cy="168" r="8"/>
<circle class="n" cx="330" cy="168" r="8"/>
<circle class="n" cx="375" cy="168" r="8"/>
<circle class="n" cx="420" cy="168" r="8"/>
<circle class="h" cx="465" cy="168" r="8"/>
<circle class="h" cx="172.5" cy="140" r="5"/>
<circle class="n" cx="262.5" cy="140" r="5"/>
<circle class="n" cx="352.5" cy="140" r="5"/>
<circle class="h" cx="442.5" cy="140" r="5"/>
<circle class="h" cx="217.5" cy="112" r="5"/>
<circle class="h" cx="397.5" cy="112" r="5"/>
<circle class="h" cx="307.5" cy="84" r="5"/>
<text x="490" y="128" class="st sm">층 3개 · O(logₖ n)</text>
<text x="16" y="222" class="st">Self-attention</text>
<path class="ha" d="M150,214 Q307.5,180 459,214"/>
<circle class="h" cx="150" cy="222" r="8"/>
<circle class="n" cx="195" cy="222" r="8"/>
<circle class="n" cx="240" cy="222" r="8"/>
<circle class="n" cx="285" cy="222" r="8"/>
<circle class="n" cx="330" cy="222" r="8"/>
<circle class="n" cx="375" cy="222" r="8"/>
<circle class="n" cx="420" cy="222" r="8"/>
<circle class="h" cx="465" cy="222" r="8"/>
<text x="490" y="222" class="st sm">1단계 · O(1)</text>
</svg><figcaption>단어 8개($n = 8$)에서 첫 단어(색칠)의 정보가 마지막 단어까지 가는 길. RNN은 하나씩 넘기고, CNN은 층을 올라갔다 내려오고, self-attention은 바로 간다.</figcaption></figure>
<p>반대로 문장이 아주 길어져 $n$이 $d$보다 커지면 $n^2$ 항이 부담이 된다. 이것이 Transformer의 가장 큰 약점으로 남는다(아래 한계 참고).</p>`
      },
      {
        no: '5', title: 'Training', desc: '데이터, 장비, optimizer, regularization',
        body: R`
<h3>Training Data and Batching · Hardware and Schedule</h3>
<ul>
<li><strong>영어→독일어</strong>: WMT 2014 데이터, 문장 쌍 약 450만 개. 단어를 자주 나오는 조각 단위(BPE)로 잘라 두 언어가 같이 쓰는 vocabulary 약 3만 7천 개를 만들었다.</li>
<li><strong>영어→프랑스어</strong>: 문장 쌍 약 3,600만 개, vocabulary 3만 2천 개.</li>
<li>한 번에 영어 약 2만 5천 token, 대응하는 독일어 약 2만 5천 token씩 묶어 학습했다.</li>
<li>장비는 NVIDIA P100 GPU 8장 한 대. Base 모델은 10만 스텝에 <strong>약 12시간</strong>, big 모델은 30만 스텝에 <strong>3.5일</strong>이 걸렸다.</li>
</ul>
<h3>Optimizer: learning rate warmup</h3>
<p>Learning rate는 "한 번에 숫자를 얼마나 크게 고칠지"다. 처음부터 크게 고치면 아직 엉망인 모델이 크게 흔들려 학습이 망가지기 쉽다. 논문은 처음 4,000 스텝 동안 learning rate를 0부터 천천히 올리고(<strong>warmup</strong>), 그 뒤로는 스텝 수의 제곱근에 반비례하게 천천히 줄였다.</p>
$$\text{learning rate} = d_{model}^{-0.5} \cdot \min\left(\text{step}^{-0.5},\ \text{step} \cdot 4000^{-1.5}\right)$$
<figure class="diagram"><svg viewBox="0 0 640 240" width="640">
<path class="e" d="M60,200 H600"/><path class="e" d="M60,30 V200"/>
<path class="he" d="M60,200 L61,193 L63,178 L65,163 L68,148 L70,133 L72,118 L74,103 L76,89 L78,74 L81,59 L82,52 L103,95 L125,114 L146,126 L168,134 L190,139 L211,144 L233,148 L254,151 L276,153 L298,155 L319,157 L341,159 L362,160 L384,162 L406,163 L427,164 L449,165 L470,166 L492,167 L514,168 L535,168 L557,169 L578,170 L600,170"/>
<circle class="fill" cx="82" cy="52" r="4"/>
<text x="92" y="44" class="st sm">4,000 스텝에서 최고점 ≈ 0.0007</text>
<text x="60" y="216" class="sm">0</text><text x="330" y="216" class="sm">50,000</text><text x="600" y="216" class="sm">100,000</text>
<text x="330" y="232" class="sm">학습 스텝</text>
<text x="52" y="200" class="en sm">0</text><text x="52" y="30" class="en sm">0.0008</text>
<text x="420" y="150" class="sm">스텝의 제곱근에 반비례해 감소</text>
</svg><figcaption>Base 모델($d_{model} = 512$)의 learning rate. 빠르게 오른 뒤 천천히 내려간다. 10만 스텝에서는 약 0.00014.</figcaption></figure>
<h3>Regularization: overfitting 막기</h3>
<ul>
<li><strong>Dropout</strong>(0.1): 학습 중 각 부분 출력의 10%를 무작위로 0으로 만든다. 특정 경로에만 의존하지 않게 해서 처음 보는 문장에도 잘 작동하게 한다.</li>
<li><strong>Label smoothing</strong>(0.1): 정답 단어의 목표 확률을 100%가 아니라 90%로 두고, 나머지 10%를 다른 단어들에 고루 나눈다. 모델이 지나치게 확신하지 않도록 하는 장치다. 논문에 따르면 모델이 덜 확신하게 되어 perplexity(다음 단어를 얼마나 헷갈려하는지 나타내는 값, 낮을수록 좋음)는 나빠지지만 번역 품질(BLEU)은 좋아졌다.</li>
</ul>
`
      },
      {
        no: '6.1', title: 'Machine Translation', desc: '번역 성능과 학습 비용',
        body: R`
<h3>번역문을 만드는 방법</h3>
<p>매 단계 확률이 가장 높은 단어 하나만 고르지 않고, 유망한 후보 문장 4개를 동시에 이어 가다가 가장 좋은 것을 고른다(빔 크기 4의 <strong>beam search</strong>). 또 학습 마지막 몇 개 시점의 모델 숫자를 평균 내서 최종 모델로 썼다.</p>
<div class="box"><strong>BLEU 점수란</strong>: 기계 번역과 사람이 한 번역이 단어·구절 단위로 얼마나 겹치는지를 0~100으로 매긴 점수. 높을수록 좋다. 이 시기 영어→독일어 번역에서는 1점만 올라도 큰 진전으로 여겨졌다.</div>
<h3>영어→독일어</h3>
<figure class="diagram"><svg viewBox="0 0 620 270" width="620">
<text x="200" y="30" class="en">GNMT+RL (구글 번역)</text><rect class="g" x="210" y="20" width="143" height="20" rx="3"/><text x="361" y="30" class="st sm">24.6</text>
<text x="200" y="60" class="en">ConvS2S (페이스북)</text><rect class="g" x="210" y="50" width="173" height="20" rx="3"/><text x="391" y="60" class="st sm">25.16</text>
<text x="200" y="90" class="en">MoE</text><rect class="g" x="210" y="80" width="221" height="20" rx="3"/><text x="439" y="90" class="st sm">26.03</text>
<text x="200" y="120" class="en">GNMT+RL ensemble</text><rect class="g" x="210" y="110" width="236" height="20" rx="3"/><text x="454" y="120" class="st sm">26.30</text>
<text x="200" y="150" class="en">ConvS2S ensemble</text><rect class="g" x="210" y="140" width="239" height="20" rx="3"/><text x="457" y="150" class="st sm">26.36</text>
<text x="200" y="180" class="en">Transformer (base)</text><rect class="h" x="210" y="170" width="291" height="20" rx="3"/><text x="509" y="180" class="st sm">27.3</text>
<text x="200" y="210" class="en">Transformer (big)</text><rect class="h" x="210" y="200" width="351" height="20" rx="3"/><text x="569" y="210" class="st sm">28.4</text>
<path class="e" d="M210,232 H594"/>
<text x="210" y="246" class="sm">22</text><text x="375" y="246" class="sm">25</text><text x="539" y="246" class="sm">28</text>
<text x="402" y="262" class="sm">BLEU (가로축이 22에서 시작)</text>
</svg><figcaption>WMT 2014 영어→독일어 테스트 결과(논문 표 2). Ensemble은 모델 여러 개를 합친 것이다. Transformer는 모델 하나로 ensemble까지 모두 넘었다.</figcaption></figure>
<ul>
<li>Big 모델이 <strong>28.4</strong>로, ensemble을 포함한 기존 최고 기록(26.36)보다 <strong>2점 넘게</strong> 높았다.</li>
<li>작은 base 모델(27.3)도 기존의 모든 모델과 ensemble을 넘었다.</li>
</ul>
<h3>영어→프랑스어</h3>
<p>Big 모델이 <strong>41.8</strong>로 단일 모델 최고 기록을 냈다(기존 단일 최고 MoE 40.56, ensemble 최고 ConvS2S 41.29).</p>
<h3>학습 비용</h3>
<table>
<tr><th>모델</th><th>영→독 BLEU</th><th>학습 계산량 (FLOP)</th></tr>
<tr><td>GNMT+RL</td><td>24.6</td><td>2.3 × 10<sup>19</sup></td></tr>
<tr><td>ConvS2S</td><td>25.16</td><td>9.6 × 10<sup>18</sup></td></tr>
<tr><td>ConvS2S ensemble</td><td>26.36</td><td>7.7 × 10<sup>19</sup></td></tr>
<tr><td><strong>Transformer (base)</strong></td><td>27.3</td><td><strong>3.3 × 10<sup>18</sup></strong></td></tr>
<tr><td><strong>Transformer (big)</strong></td><td>28.4</td><td>2.3 × 10<sup>19</sup></td></tr>
</table>
<p>FLOP은 컴퓨터가 수행한 덧셈·곱셈 횟수다. Base 모델은 GNMT보다 계산을 <strong>7분의 1</strong>만 쓰고도 점수가 2.7점 높았다. 영어→프랑스어에서도 big 모델은 기존 최고 모델 학습 비용의 4분의 1이 안 됐다. "더 좋은데 더 싸다"는 점이 이 구조가 빠르게 퍼진 이유다.</p>
`
      },
      {
        no: '6.2', title: 'Model Variations', desc: '부품을 바꿔 본 실험(ablation)',
        body: R`
<p>저자들은 base 모델의 부품을 하나씩 바꿔 가며 성능이 어떻게 변하는지 쟀다. 이런 실험을 <strong>ablation</strong>이라고 한다(논문 표 3, 개발용 데이터 기준이라 위 테스트 점수와 숫자가 다르다).</p>
<table>
<tr><th>바꾼 것</th><th>BLEU</th><th>의미</th></tr>
<tr><td>기본 (head 8개, 6층)</td><td>25.8</td><td>기준</td></tr>
<tr><td>Head 1개</td><td>24.9</td><td>여러 관점이 실제로 도움이 된다 (−0.9)</td></tr>
<tr><td>Head 32개</td><td>25.4</td><td>너무 잘게 나눠도 손해</td></tr>
<tr><td>Key 크기 $d_k$ 64 → 16</td><td>25.1</td><td>Query와 key를 비교하려면 충분한 크기가 필요하다</td></tr>
<tr><td>층 2개</td><td>23.7</td><td>깊이가 중요하다</td></tr>
<tr><td>Dropout 없음</td><td>24.6</td><td>Overfitting을 막는 장치가 꼭 필요하다</td></tr>
<tr><td>사인 positional encoding → 학습형</td><td>25.7</td><td>위치 표시 방법은 거의 상관없다</td></tr>
<tr><td>Big 모델</td><td>26.4</td><td>모델이 클수록 좋다</td></tr>
</table>
<p>마지막 줄은 이후 역사를 예고한다. 크기를 키우면 좋아진다는 경향은 몇 년 뒤 GPT-3 같은 초대형 모델로 이어진다.</p>`
      },
      {
        no: '6.3', title: 'English Constituency Parsing', desc: '번역 외 과제로 일반화 확인',
        body: R`<p>영어 문장의 문법 구조를 분석하는 과제(constituency parsing)에도 거의 손대지 않고 적용해 봤다. 학습 데이터가 4만 문장뿐인데도 F1 91.3(추가 데이터를 쓰면 92.7)으로, 이 과제에 특화된 대부분의 기존 모델보다 좋았다. 번역 전용 요령이 아니라 범용 구조라는 첫 증거다.</p>`
      },
      {
        no: '7', title: 'Conclusion', desc: '저자들의 결론과 향후 과제',
        body: R`
<p>저자들은 Transformer를 recurrent layer를 multi-head self-attention으로 완전히 대체한 첫 sequence transduction 모델로 정리한다. 번역에서 RNN·CNN 기반 모델보다 훨씬 빨리 학습되면서 더 좋은 성능을 냈다는 것이 결론이다.</p>
<p>앞으로의 과제로 세 가지를 든다.</p>
<ul>
<li>텍스트 외의 입력·출력(이미지, 오디오, 영상)으로 확장</li>
<li>큰 입력을 효율적으로 다루기 위해 주변만 보는 제한된(restricted) attention 연구</li>
<li>생성을 덜 순차적으로 만들기</li>
</ul>`
      },
      {
        no: '', title: 'Limitations', desc: '저자가 밝힌 한계와 이후 연구에서 지적된 점',
        body: R`
<ul>
<li><strong>긴 입력에 비싸다</strong>: 모든 단어 쌍을 계산하므로 문장 길이가 2배면 attention 계산과 메모리는 4배가 된다. 저자들도 주변 단어만 보는 제한된 attention을 다음 과제로 꼽았다. 이후 Longformer 같은 희소 attention, GPU 메모리 사용을 줄인 FlashAttention 등이 이 문제를 다룬다.</li>
<li><strong>생성은 여전히 한 단어씩</strong>: 학습은 병렬이지만 번역문을 만들 때는 3.2.3의 표처럼 단어마다 모델을 다시 돌려야 한다. 저자들도 "덜 순차적인 생성"을 목표로 언급했다.</li>
<li><strong>실험 범위</strong>: 번역과 constituency parsing 두 과제만 다뤘다. 이미지·음성·영상 적용은 향후 과제로 남겼다(이후 ViT 등으로 실현).</li>
<li><strong>Positional encoding에 대한 기대는 검증되지 않았다</strong>: 사인 방식이 학습 때보다 긴 문장에도 통할 것이라 했지만 실험으로 확인하지 않았다. 이후 상대 위치 방식, RoPE 등이 나왔다.</li>
<li><strong>Normalization 위치</strong>: 논문은 더한 다음 normalization하는 배치(Post-LN)를 썼는데, 층을 깊게 쌓으면 warmup 없이는 학습이 불안정하다. 이후 모델 대부분은 normalization을 먼저 하는 Pre-LN을 쓴다.</li>
</ul>`
      },
      {
        no: '', title: 'Impact', desc: '이 논문에서 갈라져 나온 모델들',
        body: R`
<p>Transformer의 세 부분(encoder, decoder, 둘 다)을 떼어 쓰는 방식으로 현대 AI의 큰 갈래가 생겼다.</p>
<figure class="diagram"><svg viewBox="0 0 640 260" width="640">
<rect class="h" x="230" y="14" width="180" height="40" rx="8"/><text x="320" y="28">Transformer</text><text x="320" y="44" class="sm">2017 · encoder + decoder</text>
<path class="a" d="M280,54 L110,108"/><path class="a" d="M320,54 L320,108"/><path class="a" d="M360,54 L530,108"/>
<rect class="n" x="30" y="110" width="160" height="40" rx="8"/><text x="110" y="124">encoder만</text><text x="110" y="140" class="sm">문장 이해</text>
<rect class="n" x="240" y="110" width="160" height="40" rx="8"/><text x="320" y="124">decoder만</text><text x="320" y="140" class="sm">다음 단어 생성</text>
<rect class="n" x="450" y="110" width="160" height="40" rx="8"/><text x="530" y="124">둘 다 · 다른 입력</text><text x="530" y="140" class="sm">변환 · 이미지</text>
<path class="a" d="M110,150 V178"/><path class="a" d="M320,150 V178"/><path class="a" d="M530,150 V178"/>
<text x="110" y="194">BERT (2018)</text><text x="110" y="212" class="sm">검색·분류에 널리 사용</text>
<text x="320" y="194">GPT (2018) → GPT-3 (2020)</text><text x="320" y="212" class="sm">→ ChatGPT, Claude 등 LLM</text>
<text x="530" y="194">T5 (2019) · ViT (2020)</text><text x="530" y="212" class="sm">텍스트 변환 · 이미지 인식</text>
<text x="320" y="248" class="sm">현재 대부분의 LLM은 이 논문의 decoder(masked self-attention + feed-forward)를 수십~백여 층 쌓은 것</text>
</svg><figcaption>Transformer에서 갈라져 나온 주요 모델들.</figcaption></figure>
<p>다음에 읽을 #12 BERT(encoder 갈래)와 #13 GPT-3(decoder 갈래)가 바로 이 그림의 두 가지다.</p>`
      },
      {
        no: '', title: 'Glossary', desc: '주요 용어',
        body: R`
<table>
<tr><th>영어</th><th>한국어</th><th>뜻</th></tr>
<tr><td>Token</td><td>토큰</td><td>문장을 자른 단위. 단어 또는 단어 조각</td></tr>
<tr><td>Embedding</td><td>임베딩</td><td>Token을 숫자 목록(vector)으로 바꾼 것. 이 논문에서는 512칸</td></tr>
<tr><td>Encoder / decoder</td><td>인코더 / 디코더</td><td>입력을 이해하는 부분 / 출력을 만들어 내는 부분</td></tr>
<tr><td>Attention</td><td>어텐션</td><td>다른 단어를 얼마나 참고할지 비율을 계산해 정보를 섞는 방법</td></tr>
<tr><td>Self-attention</td><td>셀프 어텐션</td><td>같은 문장 안의 단어끼리 하는 attention</td></tr>
<tr><td>Query · key · value</td><td>질의 · 키 · 값</td><td>찾는 것 · 맞춰 볼 표지 · 건네줄 내용</td></tr>
<tr><td>Softmax</td><td>소프트맥스</td><td>점수들을 0~1 사이, 합이 1인 비율로 바꾸는 함수</td></tr>
<tr><td>Head</td><td>헤드</td><td>Multi-head attention에서 나란히 도는 attention 하나</td></tr>
<tr><td>Positional encoding</td><td>위치 인코딩</td><td>단어 순서를 알려주기 위해 vector에 더하는 위치별 패턴</td></tr>
<tr><td>Masking</td><td>마스킹</td><td>Decoder가 아직 만들지 않은 뒤쪽 단어를 못 보게 가리는 것</td></tr>
<tr><td>Residual connection</td><td>잔차 연결</td><td>층의 출력을 입력에 더해 원래 정보를 보존하는 연결</td></tr>
<tr><td>Layer normalization</td><td>층 정규화</td><td>각 vector의 숫자들을 평균 0, 분산 1 근처로 맞추는 처리</td></tr>
<tr><td>Dot product</td><td>내적</td><td>두 vector의 같은 자리끼리 곱해 더한 값. 방향이 비슷할수록 크다</td></tr>
<tr><td>Gradient</td><td>기울기</td><td>숫자를 조금 바꿀 때 결과가 얼마나 변하는지. 학습은 이것을 보고 숫자를 고친다</td></tr>
<tr><td>Learning rate · warmup</td><td>학습률 · 워밍업</td><td>한 번에 숫자를 고치는 크기 · 처음에 그 크기를 천천히 올리는 것</td></tr>
<tr><td>Dropout · label smoothing</td><td>드롭아웃 · 라벨 스무딩</td><td>Overfitting을 막는 장치. 출력 일부를 무작위로 끄기 · 정답 확률 목표를 100%보다 조금 낮추기</td></tr>
<tr><td>Feed-forward network</td><td>순방향 신경망</td><td>입력에서 출력으로 한 방향으로만 계산하는 작은 신경망. 여기서는 단어마다 따로 적용</td></tr>
<tr><td>Weight tying</td><td>가중치 공유</td><td>여러 부분이 같은 가중치 행렬을 함께 쓰는 것</td></tr>
<tr><td>Beam search</td><td>빔 탐색</td><td>후보 문장 몇 개를 동시에 이어 가다가 가장 좋은 것을 고르는 생성 방법</td></tr>
<tr><td>Perplexity</td><td>—</td><td>모델이 다음 단어를 얼마나 헷갈려하는지 나타내는 값. 낮을수록 좋다</td></tr>
<tr><td>Ablation</td><td>절제 실험</td><td>부품을 하나씩 빼거나 바꿔 어떤 부분이 성능에 중요한지 보는 실험</td></tr>
<tr><td>BLEU</td><td>—</td><td>번역 품질 점수. 사람 번역과 겹치는 정도</td></tr>
</table>`
      },
    ],
    links: [
      { to: 'dl-rnn', why: '이 논문이 대체한 구조. 한 단어씩 차례로 계산하는 방식과 그 한계' },
      { to: 'dl-attention', why: 'Attention의 일반 원리와 Q·K·V 계산을 더 자세히' },
      { to: 'dl-transformer', why: '이 논문 이후 바뀐 부분(Pre-LN, RoPE, KV 캐시)까지 포함한 Transformer 정리' },
      { to: 'ai-llm', why: 'Decoder만 쌓은 Transformer가 LLM이 되는 과정' },
    ],
    quiz: [
      { q: 'RNN 번역 모델의 학습이 느렸던 가장 큰 이유는?', options: ['앞 단어의 계산이 끝나야 다음 단어를 계산할 수 있어서', 'Parameter 수가 Transformer보다 훨씬 많아서', 'Vocabulary이 너무 커서', 'Softmax를 쓰지 않아서'], answer: 0, explain: 'RNN은 기억(hidden state)을 왼쪽에서 오른쪽으로 넘기며 계산하므로 단어 수만큼 차례로 계산해야 하고, GPU의 병렬 계산 능력을 다 쓰지 못한다.' },
      { q: 'Attention에서 "내가 무엇을 찾고 있는지"를 나타내는 vector는?', options: ['Query', 'Key', 'Value', 'Positional encoding'], answer: 0, explain: 'Query를 각 단어의 key와 비교해 점수를 매기고, 그 비율대로 value를 섞는다. 도서관 비유에서 query는 검색어, key는 책의 태그, value는 책의 본문이다.' },
      { q: '점수를 √d_k로 나누는 이유는?', options: ['점수가 너무 커져 softmax가 한 단어에 쏠리고 gradient가 사라지는 것을 막으려고', '계산 속도를 높이려고', '단어 순서를 알려주려고', '비율의 합을 1로 맞추려고'], answer: 0, explain: '64칸 vector의 dot product는 분산이 64로 커진다. 그대로 softmax에 넣으면 거의 1과 0만 나와 학습 신호(gradient)가 0에 가까워진다. 합을 1로 맞추는 것은 softmax가 하는 일이다.' },
      { q: 'Decoder self-attention에서 masking을 하는 이유는?', options: ['학습 중 아직 만들지 않은 뒤쪽 정답 단어를 미리 보지 못하게 하려고', '계산량을 절반으로 줄이려고', 'Encoder 정보를 차단하려고', '멀리 있는 단어를 무시하려고'], answer: 0, explain: '학습할 때는 정답 문장 전체를 한 번에 넣어 빠르게 계산한다. 마스크가 없으면 각 위치가 자기가 맞혀야 할 다음 단어를 그대로 볼 수 있다.' },
      { q: 'Transformer에 positional encoding이 꼭 필요한 이유는?', options: ['Self-attention 계산만으로는 단어 순서를 구분할 수 없어서', 'Embedding 크기를 맞추려고', 'Learning rate를 조절하려고', 'Head를 나누려고'], answer: 0, explain: 'Attention 점수는 단어 vector끼리의 dot product가라 단어를 뒤섞어도 같은 값이 나온다. 위치마다 다른 패턴을 더해 줘야 순서를 안다.' },
      { q: '논문의 ablation에서 head를 8개에서 1개로 줄이면?', options: ['BLEU가 약 0.9점 떨어졌다', '성능이 그대로였다', 'BLEU가 올랐다', '학습이 아예 되지 않았다'], answer: 0, explain: '개발용 데이터에서 25.8 → 24.9. 여러 관점으로 동시에 보는 것이 실제로 도움이 된다는 근거다. 반대로 32개까지 늘려도 25.4로 떨어졌다.' },
    ],
  },
];
