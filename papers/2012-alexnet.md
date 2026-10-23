# ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)

| 항목 | 내용 |
| --- | --- |
| 저자 | Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton |
| 발표 | NeurIPS (NIPS), 2012 |
| 링크 | [NeurIPS proceedings](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks) |
| 번호 | #1 |
| 관련 노트 | `topics/dl.js` 의 CNN(`dl-cnn`), 활성화 함수(`dl-activation`), 정규화 기법(`dl-norm`) |
| 내 리뷰 | |

## 요약

Convolution 5층과 fully connected 3층, parameter 6천만 개의 CNN으로 ImageNet 120만 장을 1,000개 class로 분류했다. ReLU로 학습을 빠르게 하고 GPU 2장에 모델을 나눠 실었으며, data augmentation과 dropout으로 overfitting을 막았다. ILSVRC-2012에서 top-5 error 15.3%로 2등(26.2%)을 10%p 넘게 앞섰다.

## 문제 정의

- 2012년까지 이미지 분류의 주류는 사람이 설계한 특징(SIFT, Fisher Vector)에 분류기를 얹는 방식이었고, 오류율은 1년에 1~2%p씩 줄고 있었다.
- CNN은 손글씨 숫자 같은 작은 과제에서만 검증됐고, 큰 컬러 사진을 학습시키기엔 데이터와 계산이 부족했다.
- 한 문장으로: **큰 데이터(ImageNet)와 GPU가 생긴 지금, 크고 깊은 CNN을 원본 pixel부터 학습시키면 사람이 설계한 특징을 이길 수 있는가.**

## 핵심 방법

- **구조**: 224×224×3 입력 → Conv1(11×11, 96개, stride 4) → Conv2(5×5, 256) → Conv3·4(3×3, 384) → Conv5(3×3, 256) → FC 4096 → FC 4096 → 1000-way softmax. Conv1·2 뒤에 LRN과 max pooling, Conv5 뒤에 max pooling.
- **ReLU** $f(x)=\max(0,x)$: tanh보다 포화가 없어 CIFAR-10에서 같은 training error에 6배 빨리 도달.
- **GPU 2장 분할**: GTX 580 3GB에 모델이 안 들어가 kernel을 반씩 나눔. Conv3과 FC 층에서만 GPU 간 통신. Top-1 1.7%p 개선.
- **Local response normalization**: 이웃 channel 출력 제곱합으로 나눔($k=2, n=5, \alpha=10^{-4}, \beta=0.75$). Top-1 1.4%p 개선. 이후 VGG에서 효과 없다고 확인됨.
- **Overlapping pooling**: 창 3, stride 2. Top-1 0.4%p 개선.
- **Overfitting 대책**: 256×256에서 224×224 무작위 crop + 좌우 반전(2048배), PCA 기반 색 변형(top-1 1%p 이상 개선), FC 첫 두 층에 dropout 0.5.
- **학습**: SGD, batch 128, momentum 0.9, weight decay 0.0005, learning rate 0.01에서 시작해 정체 시 10으로 나눔(3번). 약 90 epoch, GTX 580 2장으로 5~6일.
- Parameter의 약 96%가 FC 층에 있다(FC6만 약 3,775만 개).

## 실험 결과

- ILSVRC-2010 test: top-1 37.5%, top-5 17.0% (기존 최고 45.7%, 25.7%).
- ILSVRC-2012: CNN 1개 val 18.2%, 5개 평균 16.4%, 전체 ImageNet(2011 가을판) 사전학습 모델 2개를 더한 7개 평균 val 15.4% / test 15.3%. 2등 26.2%.
- 가운데 convolution 층 하나만 빼도 top-1이 약 2%p 나빠짐 → 깊이가 중요하다.
- 마지막 hidden 층(4096차원) vector가 가까운 이미지는 pixel이 달라도 의미가 같았다 → 학습된 표현을 이미지 검색 등에 쓸 수 있음.

## 한계

- GPU 분할과 연결 구조는 원리가 아니라 3GB 메모리 제약 때문.
- Parameter가 FC 층에 몰려 무겁고, LRN·11×11 kernel은 이후 모델에서 사라짐.
- Learning rate 감소 시점 등 설정을 사람이 직접 정함. 입력 224와 Conv1 출력 55가 계산상 맞지 않는 등 재현하기 어려운 부분이 있다.
- 사람이 라벨을 단 데이터가 대량으로 필요하다.

## 읽으면서 생각해 볼 질문

- 네 가지 장치(ReLU, GPU 분할, LRN, overlapping pooling) 중 지금까지 살아남은 것과 사라진 것은 무엇이고, 그 차이는 왜 생겼을까?
- Parameter는 FC 층에, 계산량은 convolution 층에 몰린 이유는 무엇일까?
- "데이터와 계산을 키우면 좋아진다"는 결론은 지금의 LLM과 어떻게 이어질까?
