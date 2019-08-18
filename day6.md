# Day6 대화형 할일관리 프로그램

## 왜 필요한가?
대부분의 프로그램은 사용자 입력에 즉각적으로 반응하면 동작한다. 

프로그램이 복잡해지면 모듈로 나누고,  각 모듈은 함수형태만을 유지하며 구성되게 할 수 있다.

복잡한 프로그래밍을 구현할때는 디자인을 먼저 하는 습관이 필요하다. 




## 학습 목표
- 프로그래밍 디자인을 할 수 있다.

- 사용자 입력을 받아서 코드를 구현할 수 있다.

- 자바스크립트 문자열 조작과 데이터상태의 변경을 할 수 있다.





------

## 미션

### 1. 스켈레톤 코드 구현

- 프로그램을 다 구현하기 전에 별도의 Skeleton code를 구현한 skeleton.js 파일을 생성하고, 이를 commit 하고 push한다.



### 2. todos.js 구현

- 다음과 같이 todo 데이터의 상태를 변경하는 개발을 한다.
- 초기 데이터를 JSON형태로 작성한다. 
- 클래스나 객체를 사용할수 없음.(todo데이터를 보관하기 위한 배열/객체 생성은 가능)
- todos.js 파일 하나에 모든 코드를 구현한다.
- Array의 reduce메서드를 1회 이상 적극 사용한다.
- 가급적 모든 코드가 함수안에 존재해야 한다.
- 3줄 이상의 중복코드는 함수를 사용해서 없앤다.
- id는 unique하게 생성돼야 한다.
- add 명령에서는 tag를 n개로 받을 수 있다.
- update 시에는 2초 delay후에 화면에 결과가 출력된다.


  ```javascript
  $  node todos.js
  
  명령하세요 : show$$current
  현재상태 :  todo:[123,124], doing:[123,444], done:[]
  
  명령하세요 : show$$todo
  todo리스트 :  총2건 : ' 자바스크립트 공부하기, 123번','iOS공부하기, 124번'
  
  명령하세요 : add$$docker공부하기$$["favorite","programming"]
  docker공부하기가 추가됐습니다.(id : 7788)
  현재상태 :  todo:[123,124,7788], doing:[123,444], done:[]
  
  명령하세요 : update$$7788$$doing
  docker공부하기 doing으로 상태가 변경됐습니다
  현재상태 :  todo:[123,124], doing:[123,444, 7788], done:[]
  
  명령하세요 : delete$$7788
  docker공부하기가 doing목록에서 삭제됐습니다
  현재상태 :  todo:[123,124], doing:[123,444], done:[]

  명령하세요 : q
  (프로그램 종료)
  
  ```



-----

## 배경 지식



#### 배열과 객체

배열과 객체를 다루는 것이 익숙해야 이번 미션을 풀 수 있다. 

MDN사이트를 통해서 다양한 예제를 찾고, 이를 직접 코딩하면서 연습을 거친다. 



#### 프로그래밍 설계

프로그래밍 설계는 종이로 하는 것도 매우 훌륭하다. 특히나 페어프로그래밍 단계에서는 이렇게 매개체를 통해서 서로의 생각을 나누는 방법이 추천된다. code & fix 하지 말고, **design & code** !! 하기. 



설계는 다양한 방법이 있을 수 있다.

 OOP프로그래밍에서는 클래스 다이어그램을 그리기도하고, 함수형프로그래밍에서는 함수의 관계와 연결을 설계하기도 한다. 

이는 프로그래밍 설계에 대한 것이 인간의 창의적인 사고방식과 관련 있는 것이라, 그렇다. 

심지어. 대부분의 개발자는 코드에 대한 설계를 머리로 하거나, 종이에 끄적 거리는방법을 사용한다. 



아래방법들도 참고하고, 어떤 방법이든 프로그래밍의 알고리즘을 정리할 수 있는 방법을 시도해봐야 한다. 



[참고로 해볼만한 방법들]

- skeleton 코드란 무엇인지 살펴보고 따라해본다.
- pseudo 코드란 무엇인지 살펴보고 따라해본다.



### node.js 에서의 사용자 입력

대화형으로 동작하는 프로그램은, 계속 입력값을 받으면서 처리할 수 있어야 한다.

아래링크를 테스트 하면서 이방법을 알아본다.

참고.

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
```

<https://nodejs.org/api/readline.html>


### data 구성

웹개발을 하다보면 클라이언트(브라우저)와 서버간의 데이터 통신이 필요하다. 
이때 주고받는 표준 포맷이 필요한데, 자주사용하는 것은 JSON형태이다. 
예시는 아래와 같다

```javascript
[
  {
    "id" : 123,
    values : ['lorem', 'xdof']
  },
  {
    "id" : 124,
    values : ['snffox', 'lorem']
  }
  ....
]
```

### 배열 조작
forEach메서드 이외에, filter, reduce 메서드의 사용법을 익혀보자.
특히 reduce는 매우 막강한 기능을 가지고 있는데, 사용법은 foreach, map, filter와 약간 다른점이 존재한다.
몇몇 예제를 익히면서 그 사용법을 잘 공부하도록 한다.


## 학습정리

### 피어 컴파일링 체크포인트

```
1. [ ] show$$current 실행
2. [ ] show$$todo 실행 
3. [ ] add 실행(태그는 2개이상)
4. [ ] update 실행(2초 지연 결과 노출)
5. [ ] delete 실행 
6. [ ] 'q'로 프로그램 종료
7. [ ] 3줄 이상의 중복코드가 없음
8. [ ] unique한 id 생성 확인
```

### 스스로 확인할 사항
- 충분히 디자인 과정을 했는가? 디자인이후 개발을 하면서 다시 잘못된 디자인을 수정했는가? 
- 프로그램이 버그 없이 잘 동작하는가? 



### 다같이 확인할 사항
- 아래 내용을 토론하고 정리해보자.
  - 상태관리를 mutable 과 immutable 방식 중 어떤 것을 선택했는가? 이중 무엇이 왜 더 좋을까? 
  - 함수만으로 구현하는데 어떤 장점과 단점이 존재하는가 ? 