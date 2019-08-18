# Day3 데이터 다루기

## 왜 필요한가?
프로그래밍은 결국 많은 데이터를 잘 다루는 것이기도 하다.  알고보면 view계층의 작업역시 데이터에. 의해서 변경되고 렌더링 되는 것이다. 자바스크립트의 대표적인 자료형태는 객체와 배열을 통해 자료를 다양하게 처리하는 연습을 할 줄 알아야 한다. 




## 학습 목표
- 함수그리고 배열과 객체까지를 엮은 프로그래밍을 할 수 있다.

  

----


## 미션

### 1. getMatchedType함수 만들기

- 아래 링크를 눌러서 데이터를 확인한다. 
  - https://git.io/vQukL

    

- 아래처럼 type을 판단해서. 원하는 결과를 문자열을 출력하는 getMatchedType함수를 만든다.

  ```javascript
  //json_tree.js의 데이터
  const jsondata = {....};
  
  //입력
  getMathchedType(jsondata, 'sk')
  
  //출력
  'sk 타입 데이터는 총 5개이며, "Yong", "hary", "solvin", "hani", "chulsu" 입니다.
  ```

- 재귀호출을 통해서 구현해야 한다. 
- for/while문을 사용하지 않고 구현해본다.
- template literal 문법을 사용한다.

### 2. customReduce 함수구현해서 사용하기

- array에 있는 reduce와 동일하게 동작하는 **customReduce 함수를 직접 구현**하고, 이를 활용해서 이 문제를 푼다
    - 인터넷의 코드를 참고하지 않는다.
- customReduce함수 앞부분에 customReduce동작방식에 대해서 주석으로 설명한다.

### 3.  filter, forEach, map 구현
- 배열의 filter, forEach, map 함수를 직접구현한다. 
- customFilter, customForEach, customMap 으로 이름짓는다.
- 위 문제를 푸는데 구현한 함수를 활용한다. 

----

## 배경 지식



### 1. 객체 & 배열탐색 

#### 객체(object)

- JavaScript로 데이터를 표현하기 위해서는 Array, Object를 사용해야 한다.
- object는 key, value 구조의 자료구조. (es2015에서는 Map이라는 자료구조도 추가됨)
- object는 {} 로 자료를 표현하며, 서버와 클라이언트 간에 데이터를 교환할때 Object형태와 비슷한 방법으로 JSON이라는 데이터 포맷으로 데이터를 교환한다



#### 객체선언

key값에는 따옴표가 필요하지 않다.

```
const obj = { name : "crong", age : 20} 
```

참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Working_with_Objects#객체_생성하기



#### 객체에 데이터 추가/삭제

```javascript
const myFriend = {key : "value"};

//value 출력 
console.log(myFriend["key"]);
console.log(myFriend.key);

//추가
myFriend.age = 34;

//추가한 정보 출력
console.log(myFriend.age);
```

점 표기법(dot notation)이 [] 를 사용한 방법보다 편의상 좀더 사용된다.





#### 객체 탐색

객체를 탐색하는 방법은 여러가지가 있다. 

아래 다음 방법을 자세히 찾아서 공부해보자. 

for - in 을 사용한 방법, 

Object.keys(), Object.values(), entries() 와 같은 메서드

Object.keys()와 배열메서드(forEach)로 순회 하는 방법 등





#### 배열의 탐색

객체를 다루다보면, 배열과 함께 다루는 경우가 많다. 
따라서 배열의 탐색 방법과 배열의 다양한 메서드를 다시한번 학습해두자.
아래 추가 영상이 도움이 된다. 



#### 참고영상

<iframe src="https://player.vimeo.com/video/258395204" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/258395204">7. 자바스크립트 객체</a> from <a href="https://vimeo.com/codesquad">Yoda codd</a> on <a href="https://vimeo.com">Vimeo</a>.</p>



<iframe src="https://player.vimeo.com/video/258394161" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/258394161">9. 배열의 메서드(foreach,map,filter)</a> from <a href="https://vimeo.com/codesquad">Yoda codd</a> on <a href="https://vimeo.com">Vimeo</a>.</p>



**foreach/map/filter/some/every** 는 매우 유용한 메서드이다. 

다른 함수를 받아서 처리하는 higher order function이다.

reduce 메서드의 동작방식은 약간 차이가 있다. 
하지만 이 메서드는 서버에서도 클라이언트에서도 매우 유용하게 많이쓰는 메서드 임으로 잘 익히는게 좋다. 많은 예제를 돌리면서 reduce를 정복하고 넘어가길 바란다. 



**참고**(이런 사이트는 검색하면 많다)

: https://blog.bitsrc.io/understanding-higher-order-functions-in-javascript-75461803bad



----

## 학습정리

### 피어 컴파일링 체크포인트

```
1. [ ] getMatchedType함수 호출 (sk입력)
2. [ ] getMatchedType함수 호출 (kt입력)
3. [ ] 재귀호출한 부분 존재
4. [ ] customReduce 함수 직접 구현
5. [ ] customReduce 함수를 활용해서 문제 풀이
6. [ ] customFilter, customForEach, customMap 구현확인
```

### 스스로 확인 할 사항
- forEach, map, filter, reduce, some, every 메서드의 용도를 정확히 구분할 수 있는가? 
- sk이외 다른 type에서도 잘 동작하는가 ? 



### 다같이 확인할 사항
- 각자 만든 reduce를  리뷰하고, 버그없고 가장 효율적으로 동작하는 customReduce 함수를 구현해보자.
- reduce의 몇몇 활용 예시를 찾아보고 정리한다.
- 함수형 프로그래밍에서는 forEach, map, filter를 어떤 식으로 사용하는가? 알아보고 정리한다