# Day13 문법 분석기

## 왜 필요한가?
내가 구현한 프로그래밍 코드가 어떻게 해석되서 처리될까? 

컴파일러와 인터프리터, 파서등의 프로그램은 우리의 프로그램 코드를 해석하고 분석한다. 

이런 파싱과정을 약간이라도 이해하고나서 프로그래밍을 하면 더 효율적인 방법을 생각하게 된다. 



파서는 복잡한 프로그램분석 능력이 필요로한다.  

실무에서는 파서와 같은 복잡한 프로그램 분석과 같은 수준의 작업을 요구하는 경우가 많다. 

이런 프로그램 경험을 통해서 이를 완성해보도록 한다. 




## 학습 목표
- 문자열을 분석하고, 이를 구조화할 수 있다.
- 파싱과정을 이해한다.
- 복잡한 문제를 여러개의 객체와 함수로 나누고, 이를 연결지어 프로그래밍 할 수 있다.



----


## 미션

### 1. arrayParser 구현

- 배열형태의 문자열을 입력받아 이를 분석하는 프로그램을 만든다.
- JSON.parse 메서드를 사용할 수 없으며, 이와 유사한 파싱을 처리해주는 외부 라이브러리를 모두 사용할 수 없다.
- 배열안에는 **배열, 숫자, 문자열, NULL 타입**이 올 수 있다.
  - 배열안에 배열이 무한 중첩된 형태도 해석돼야 한다.   **ex) [[[[[….]]]]]**
- 정규표현식은 token을 **추출**하고 **분석**하기 위한 용도로 사용할 수 있다. (물론, 사용하지 않아도 된다)
- 단계별로 문제를 나눠서 처리한다. 
  - **tokenizer, lexer, parser 를 처리하는 메서드를 각각 만든다.**
- 함수의 역할이 커지지 않도록 하위함수로 나눈다.



**[실행결과]**

```javascript
const str = "[1, [2,[3]],'hello world', null]";
const result = ArrayParser(str);
console.log(result); //최종결과인 result를 보기좋게 출력하기 위해 JSON.stringfiy(result)를 사용할 수 있음

{ type: 'array',
  child: 
   [ 
     { type: 'number', value: '1', child: [] },
     { type: 'array', child: [
		    { type: 'number', value: '2', child: [] },
        	{ type: 'array', child: [
		    	{ type: 'number', value: '3', child: [] },          
     		]},
     ]},
     { type: 'string', value: 'hello world', child: [] },
     { type: 'NULL', value: 'null', child: [] } 
   ] 
}

```



### 2. 에러처리

두 가지 에러처리를 한다. 

- 문자열이 제대로 닫히지 않았을때

- 배열이 제대로 안 닫혔을때



```javascript
const str = "[[1,[2,[3],'hello world]]]";
const result = ArrayParser(str);
console.log(result); 

//ERROR : "올바른 문자열형태가 아니네요"
```



### 3. 테스트코드

**tokenizer, lexer, parser** 함수에 대한 테스트코드를 각각 구현한다. (총 3개의 테스트코드를 구현해야 함)

테스트를 위해서 원한다면 모든 테스트 라이브러리를 사용할 수 있다. 



------

## 배경 지식



#### 자바스크립트의 기본 문법위주에 대한 복습을 한다.

- 자바스크립트 배열과 객체의 이해
- es classes 문법
- 배열의 고차함수들 사용



#### Stack /  queue 그리고 재귀함수

- stack & queue 에 대한 개념을 익힌다. 
- 재귀와 DFS와 같은 탐색방법



#### Tokenizer 를 활용한 문자열 분석

프로그래밍을 하다보면 AST라는 구조와 유사한 형태의 자료구조를 만들어야 할 때가 종종생긴다.

데이터를 분석하고 이를 tree구조로 만들기도 한다.

- **tokenizer, lexer, parser** 

  - 이 세가지는 순서대로 토큰화를 거치고 , 각 토큰의 어휘를 분석해서 의미를 부여하며,  문법을 체크한다.

  

#### throw, try~catch를 활용한 에러발생.

에러처리 방법을 익힌다. throw 를 던지면 상위함수에서 try-catch를 통해서 에러를 전달 받을 수 있다.



####정규표현식

JavaScript에서 정규표현식을 다루는  **test함수**, **match함수에** 대한 학습을 이해한다.

정규표현식 문법이 낯설다면, **이메일패턴이나 문자열패턴, 숫자패턴** 등을 정규표현식으로 어떻게 처리할 수 있는지 간단하게 학습한다.





-----


## 학습정리



### 피어 컴파일링 체크포인트

```
1. [  ] 다음 문자열을 실행해서 정상처리 확인 :  [1, [2,[3,[4,[5]]]],'hello world', null]
2. [  ] 다음 문자열을 실행해서 에러출력 확인(문자열관련오류).  : [[1,[2,[3],'hello world]]]  
3. [  ] tokenizer, lexer, parser 함수를 각각 구현
4. [  ] tokenizer, lexer, parser 함수에 대한 각각 테스트 코드 구현
```



### 스스로 확인할 사항

- 무한 중첩된 구조를 프로그래밍 하는데 효과적인 방법은 무엇인가? 재귀인가, 반복인가? 

- token, lexer, parser 역할을 나눠서 단계적으로 처리하고 있는가? 

- 에러처리에 대한 흐름제어를 할 수 있는가?

  


### 다같이 확인할 사항

- 소프트웨어 개발에서,  token, lexer, parser의 역할은 각각 무엇인지 조사해보자.
- 이번 미션에서 구현한,  token, lexer, parser의 각각 역할과 동작방식을 요약해서 설명해보자.
