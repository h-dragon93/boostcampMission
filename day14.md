# Day14 Sync Cafe

## 왜 필요한가?
모든 현대 운영체제가 동작하는 기본 방식 중에서 프로세스와 스레드 스케줄링에 대한 이해는 프로그램 동작과 함께 코드가 어떤식으로 동작하는 지 이해하는 데 도움이 된다. 
특히 멀티 스레드 프로그래밍을 작성하기 위해서는 멀티 스레드를 어떻게 스케줄링하고, 컨텍스트를 이동하고, 어느 부분에서 병목 현상이 생기는 지 알고 있어야 한다. 

## 학습 목표
- 카페에서 음료를 주문했을 때 주문해서 나올때까지 바리스타가 하는 작업을 시뮬레이션하는 프로그램을 만드는 것이 목표다. 
- 이번 단계에서는 카페에서 여러 바리스타가 각각 동기 방식으로 음료를 만드는 것을 시뮬레이션하도록 구현한다.
- 매니저가 음료 주문을 큐에 담아 FIFO 방식으로 처리하도록 구현한다.
- HTML / DOM 이벤트 구조와 연결해서 웹 브라우저에서 자바스크립트 코드를 실행한다.

## 미션

### 1) 바리스타 요구사항

- 운영체제가 다루는 `프로세스`를 `카페 프로그램`으로 가정하고, `카페`내에 `바리스타`를 `스레드`라고 가정한다.

- 바리스타가 만들 수 있는 음료 종류를 3개 정하고, 음료마다 만드는 데 걸리는 시간을 초단위로 정한다.

	- 예) 아메리카노 : 3초, 카페라떼 : 5초, 프라프치노 : 10초

- 바리스타가 동시에 여러 음료를 만들 수 없고 한 번에 하나씩만 만들 수 있다고 가정한다.

- 바리스타는 음료를 만들기 시작하면 실수없이 해당 시간내에 반드시 완성한다고 가정한다. 

- 바리스타는 음료를 만들고 나서 곧 바로 다음 음료를 만들 수 있다고 가정한다.

- 프로그램을 시작하면 주문 가능한 메뉴를 표시하고, 주문할 전체 음료 개수를 입력받는다. 

- 바리스타는 음료 개수에 따라 작업 시간동안 잠들어있다가 깨어나면 작업을 완료하고, 해당 음료수를 출력한다. 

	- 바리스타 동작을 위해서 적절한 Timeout 기능을 구현해야 한다.

- 프로그램은 모든 음료수를 만들고 나면 종료한다.

- 동작 예시에 해당하는 결과를 HTML 상에서 볼 수 있도록 출력한다.

- 동작 예시에서 "." 점은 초단위로 시간이 지나가는 것을 표현한 예시일 뿐, 출력 형식이 완벽하게 동일할 필요는 없다.

#### 입력 화면

> 메뉴는 1. 아메리카노(3초) 2. 카페라떼(5초) 3. 프라프치노(10초) 3가지를 가진다.
> 
> 3가지 메뉴에 대해 HTML 화면에서 입력을 받는다.
> 
> [주문] 버튼을 추가하고, 버튼을 누르면 입력한 음료수 개수를 실행한다. 

<img src="http://public.codesquad.kr/jk/cs23/step12-barista-view1.png" width="300">

#### 동작 예시
`아메리카노 2개, 카페라떼 3개, 프라프치노 2개`를 주문한 경우 출력 예시

```
...아메리카노 완료
...아메리카노 완료
.....카페라떼 완료
.....카페라떼 완료
.....카페라떼 완료
..........프라프치노 완료
..........프라프치노 완료

모든 메뉴가 완성되었습니다.
```

### 2) 카페 요구사항

- 운영체제가 다루는 `프로세스`를 `카페 프로그램`으로 가정하고, `카페`내에 `바리스타`를 `스레드`라고 가정한다.

- 프로그램을 시작할 때 바리스타 인원수를 지정할 수 있도록 개선한다. 입력 후에 바리스타 인원 몇 명인지 출력한다.

- 여러 바리스타를 관리하는 `카페 매니저`가 있다고 가정한다. 매니저도 웹 워커로 동작하도록 구현한다.

- 메뉴를 입력받으면 주문한 메뉴를 음료 주문 Queue에 저장한다. 

- 매니저는 음료 주문 Queue에서 밀린 음료를 대기중인 바리스타에게 요청해서 음료를 할당한다. 

- 바리스타는 정해진 작업 시간이 끝나서 음료를 만들고 나면, 완료 상태를 전달해서 다시 대기 상태로 등록한다. 
	- 일반적인 Pool 개념으로 동작한다.

- 프로그램은 모든 주문한 음료를 완성하고 나면 종료한다.

- 동작 예시에 해당하는 결과를 HTML 상에서 볼 수 있도록 출력한다. 

- 화면 구성과 출력 양식은 자신만의 스타일로 표현해도 된다.

#### 바리스타 입력 화면

> 바리스타 인원수를 입력할 수 있도록 HTML을 변경한다.
> 
> [설정] 버튼을 추가하고, 버튼을 누르면 입력한 바리스타 인원수를 지정한다. 

```
> 바리스타는 총 3명입니다.
> 메뉴  =  1. 아메리카노(3s)    2. 카페라떼(5s)    3. 프라프치노(10s)
```
<img src="http://public.codesquad.kr/jk/cs23/step12-barista-view2.png" width="400">

#### 동작 예시

`아메리카노 2개, 카페라떼 3개, 프라프치노 2개`를 주문한 경우 출력 예시

```
바리스타1 - 아메리카노 완료
바리스타2 - 아메리카노 완료
바리스타3 - 카페라떼 완료
바리스타1 - 카페라떼 완료
바리스타2 - 카페라떼 완료
바리스타3 - 프라프치노 완료
바리스타1 - 프라프치노 완료

모든 메뉴가 완성되었습니다.
```

## 배경 지식

### 운영체제

- 주요 운영체제와 다음과 관련된 내용들을 학습하고 정리한다.

	- 프로세스를 관리하는 자료구조에 대해 학습한다.

	- 프로세스와 스레드의 관계에 대해 학습한다.

	- 운영체제에서 사용하는 작업 스케줄링 알고리즘에 대해 학습한다.

- 프로세스나 스레드가 만들어지고 종료될 때까지 스케줄러에 따라서 어떤 상태로 변화하는지 학습한다.

- 웹 워커(Web Worker)나 워커 스레드(Worker Thread) 대해 학습하고, 멀티 스레드 동작 구현에 대해 학습한다.

- Worker 나 Thread를 미리 만들어서 Pool 형태로 관리하는 방식에 대해 학습한다. 

- 웹 워커를 Pool로 관리하는 패키지를 찾아서 사용해도 된다. 단, 가져온 소스에 대해서는 꼭 출처와 라이센스를 명시한다.

## 학습정리

### 피어 컴파일링 체크포인트

```
  1. [ ] 바리스타 음료 제작 - 아메리카노
  2. [ ] 바리스타 음료 제작 - 카페라테
  3. [ ] 바리스타 음료 제작 - 프라프치노
  4. [ ] 음료 메뉴 주문 입력과 버튼
  5. [ ] 바리스타 Timer 구현
  6. [ ] 바리스타 인원수 입력과 버튼
  7. [ ] 음료 주문 대기 큐 
  8. [ ] 매니저 - 바리스타 Pool 작업 관리
  9. [ ] 음료 제작 - 서비스 워커 구현
  10. [ ] 음료 완료 HTML 표시
```

### 스스로 확인할 사항

- 멀티 스레드 스케줄링 방식에 대해 학습한다. 

- 스레드 동작 방식과 바리스타 작업 방식에 대해 비교한다.

- Web Worker(또는 Worker Thread)에서 사용하지 않은 기능에 대해 학습한다.

- setTimeout 내부 동작 방식에 대해 학습한다.

### 다같이 확인할 사항

- setTimeout 이 외에 timer를 구현하기 위한 여러 방식에 대해 학습한다.

- 멀티 스레드가 공용 리소스에 접근할 때 임계구역을 다루는 방식에 대해 학습한다. (Semaphore, Mutex 등)

- 멀티 스레드 작업을 그룹으로 묶어서 동기화하는 방식에 대해 학습한다.