# Day9 프로그램 테스트

## 왜 필요한가?
프로그래밍의 특징중 하나는 계속 기능이 수정되고 변경된다는 점이다.  

문제는 이 과정에서 소프트웨어 동작에 예상하지 못하는 결함(side-effect)이 발견되기도 한다. 

이런 결함을 최소화 시키는 것은 유지보수단계에서 매우 중요하다.




## 학습 목표
- 테스트 코드가 무엇인지 이해한다.
- 테스트 코드의 동작 방식을 이해한다.



----


## 미션



### 준비)

##### 1. 동료의 코드 받기

현재 미션은 동료의 코드를 테스트하는 항목이 포함되어 있다.

동료로부터 지금까지 구현한 미션풀이 코드 하나를 건네받는다. 

동료는 5개 이상의 실행가능한 함수가 포함된 코드를 건네야 한다.




##### 2. **src/source.js** 생성

##### 이 코드는 **수정할 수 없다.**

```javascript
const sum = (a, b) => {
    return a + b;
}

const isEven = (n) => { return n % 2 == 0; }

const appendLazy = (arr, data, time) => {
    return new Promise(resolve => {
        setTimeout(()=> {
            arr.push(data);
            resolve(arr)
        }, time)
    });
}

module.exports = {sum, isEven, appendLazy}
```



##### 3. spec/source.test.js 생성


- 테스트코드가 이미 구현된 파일이다. 
- source.test.js에 테스트코드를 추가할 예정이지만, **이미 구현된 아래 코드내용은 수정할 수 없다.** 


```javascript
const {sum, isEven, appendLazy } = require("../src/source.js")
const _ = require("lodash");
const {test, assert }  = require("../lib/tester.js");

test('support notEqual', () => {
    assert.notEqual(undefined, null); //pass
});

test('adds 1 + 2 to equal 3', () => {
    assert.equal(sum(1,2), 3) //pass
});

test('should support flattening of nested arrays', function() {
    const arr = [1, [2, [3, [4]], 5]];
	  assert.detailEqual(_.flatten(arr), [1, 2, [3, [4]], 5]); //pass
    assert.detailEqual(_.flattenDepth(arr,2), [1, 2, 3, [4], 5]); //pass
    assert.detailEqual(_.flattenDepth(arr,3), [1, 2, 3, [4], 5]);  //fail
});

test('should support filtering of arrays', function() {
    const arr = [1,2,3,4,5,6];
    assert.detailEqual(_.filter(arr, isEven), [2,4,5,6]); //fail
});

```





### 1. **lib/tester.js**  개발

- spec/source.test.js 안의 테스트코드가 동작될 수 있도록  **lib/tester.js** 코드를 개발한다.
  - test, assert, equal, notEqual, detailEqual를 구현
  - 참고로, detailEqual 은 객체나 배열의 중첩된 모든 원소의 값이 일치하는지 비교한다.



lib/tester.js를 완성한 후 source.test.js를 실행하면, 아래처럼 출력된다.

세번째와 네번째 항목은 fail항목이 포함되어 있기때문에, 최종결과는  'FAIL' 이다.

```shell
jisuyoun@Jisuui-Macmini spec (master) $ node source.test.js 
support notEqual : PASS
adds 1 + 2 to equal 3 : PASS
should support flattening of nested arrays : FAIL
should support filtering of arrays :  FAIL  
```





### 2. 비동기함수 테스트코드 완성하기
**src/source.test.js**에 , **appendLazy 함수에 대한 테스트 코드**를 추가로 구현한다.

이미 사용중인 lib/tester.js의 **test** 함수를 사용해서 구현한다.

**given/when/then의 순서를 따라서** 구현한다.

```javascript
//given
const arr = [10,20];

//when
appendLazy(arr, 30, 2000);

//then
assert.detailEqual(arr, [10,20,30]);
```



asyncTest 함수가 완성되면, 아래처럼 결과가 나온다. 

마지막 라인은 2초뒤에 출력된다.

```shell
day9/spec$ node source.test.js 
support notEqual : PASS
adds 1 + 2 to equal 3 : PASS
should support flattening of nested arrays : FAIL  
should support filtering of arrays :  FAIL  
async test : PASS
```



###3. 동기/비동기의 순차적인 실행 결과

아래 테스트코드를 soruce.test.js 맨 아래에 추가한다.

```javascript
test('should support filtering of arrays 2', function() {
    const arr = [1,2,3,4,5,6];
    assert.detailEqual(_.filter(arr, isEven), [2,4,6]); //pass
});
```



이후 결과는 아래와 같이 나온다. 

'async test'부분은 2번에서 구현한 결과이며 2초뒤에 실행된다.

마지막줄은, 'aysnc test' 실행이후 즉시 노출된다.

```shell
jisuyoun@Jisuui-Macmini spec (master) $ node source.test.js 
support notEqual : PASS
adds 1 + 2 to equal 3 : PASS
should support flattening of nested arrays : FAIL
should support filtering of arrays :  FAIL  
async test : PASS
should support filtering of arrays 2 : PASS
```



### 4. 출력결과 하이라이트

- 테스트가 실패했을때 출력되는  <span style="color:red">'FAIL'</span> 글자가 빨간색으로 표시되도록 코드를 수정한다.




### 5. 동료가 구현한 코드에 대한 테스트코드 구현

- **동료의 코드**에 대한 **테스트 코드**를 구현한다.
- 테스트코드 대상 함수는 **최소 5개**이다. 따라서 5개의 테스트코드를 구현해야 한다.
- 테스트코드 구현이 어려운 경우(스파게리🍝 코드라던가..),  동료의 코드를 **내가 직접 리팩토링**한 후 테스트 코드를 구현해도 좋다. (동료가 직접 리팩토링 해줄 수 없다)



------

## 배경 지식

### Software Test

software test에는 unit test를 포함해서 여러가지 테스트 개념이 있다.  

아래 링크의 4가지 레벨이 일반적인 테스트 종류로 본다.

http://www.seguetech.com/the-four-levels-of-software-testing/



- unit test :  소프트웨어의 최소단위, 보통 함수를 가리킴
- Integration test : 단위 기능이 합쳐진 기능에 대한 테스트
- System test : 위 내용보다 더 큰 개념, 전체 시스템에 대한 동작 테스트
- Acceptance(인수) Test  : 고객이 ok할 수 있는지 판단하기 위한 테스트

그리고, 

- UI test : FE에서 존재하는 개념으로, UI 기능 단위로 진행하는 테스트. 보통 Unit test와 system test 사이라고 볼 수 있음.
- E2E test : End-to-end 테스트.  이 역시 UI 테스트와 같이 말하는 경우도 있고, 전체 시스템관점에서의 테스트로 보는 경우도 있음. 



------

### TDD(Test drive development)

개발 -> 테스트코드 작성 이라는 순서가 아니고 그 반대.

함수단위 **테스트코드 구현 -> fail -> 함수구현 -> pass -> refactoring.**



=> TDD는 단순한 테스트 코드 구현방식보다, 프로그래밍 설계 방법론에 가까움.



참고로, 비슷한 용어로 BDD(Behavior drive development)가 있음

BDD는 함수단위라기 보다는 하나의 인터랙션(시나리오)단위로 테스트 코드를 구현하는 방식.

TDD를 BDD형태로 구현할 수 있음. TDD가 함수단위라 그런 점의 차이점은 있으나, 두 개가 대비대는 개념은 아님. 



------

### Unit Test

프로그래밍의 최소단위를 테스트 하는 것. 그 대상은 보통 함수.

사람이 직접 모든 함수를 호출하는 것은 불가능.
특정 함수를 호출하도록 테스트 코드를 구현하고, 이를 자동화해서 그 결과를 확인.



```javascript
function print(arg) {
	return 'result' + arg;
}

var expected = "result yes";
console.log(expected === print('yes')); // 성공(success)
console.log(expected === print('no'));  // 실패(fail)
```



------

### JavaScript unit test 라이브러리

앞 예제와 같이 비교를 하는 것이 귀찮기 때문에, 
chai, shouldjs와 같은 **assertion 라이브러리**를 통해 테스트코드를 조금 더 쉽게 구현할 수 있음.

```javascript
//assertion에는 여러가지 함수가 있는데, 
//아래 equal 메서드는 '기대값' 과 '실제값' 이 같은지를 테스트 해준다.
assert.equal(true, false);
```

Ex)  http://chaijs.com/api/assert/



----

###  Promise와 async/await 제어

비동기제어를 위해서 promise 객체사용을 찾아본다. 

async/await함수는 promise패턴을 좀더 쓰기 좋게 발전시킨 방법이다. 그 사용법도 한번 찾아보도록 한다.



------

### 참고. 테스트코드 구현 잘 짜기



#### 1. 최소단위 함수부터 테스트하기

반환값이 명확히 존재하고, 다른 함수를 호출하지 않는 함수부터 테스트 한다. 

즉,  dependency 가 없는 함수.



#### 2.  given -> when- > then 패턴

일관된 방식의 테스트 코드 구현을 위해서 

**given(테스트에 필요한 값 셋팅) -> when(실행) -> then(테스트)** 

방식으로 테스트 수행. 이 방법이 정답은 아니지만 가장 많이 쓰임. 

```javascript
describe('array test', function() {
  it('equal dummy test', function() {
	//given
	var arr = [];
	//when
	arr.push(1,2,'3');
	//then
	assert.equal(arr.length, 3);
  });
})
```

참고 :  given(테스트에 필요한 값 셋팅) -> when(실행) -> then(테스트) 
https://martinfowler.com/bliki/GivenWhenThen.html





-----


## 학습정리



### 피어 컴파일링 체크포인트

```
1. [ ] source.test.js 올바른 실행결과와 실행순서 (PASS,PASS,FAIL,FAIL,PASS,PASS)
2. [ ] source.test.js 실행결과에 'support notEqual'와 같은 설명부분이 함께 출력됨
3. [ ] source.test.js 5번째 줄에서 출력되는 비동기 테스트 결과는 2초뒤에 출력
4. [ ] fail 출력 결과 붉은색
5. [ ] 동료코드에 대한 테스트코드 구현과 올바른 결과 노출(5개이상)
6. [ ] tester.js 동작방식에 대해서 비동기 부분을 포함해 충분한 구두 설명(90초 이상 설명해야 함)
```



### 스스로 확인할 사항

- 테스트 라이브러리의 다양한 기능을 좀더 살펴보고, 내 코드와 동작방식의 차이에 대해서 비교해본다.

  

### 다같이 확인할 사항

#### 1. 라이브러리에서 제공하는 유용한 기능 제공

  인기있는 테스트프레임워크나 테스트라이브러리를 찾아본다. 

  거기에서 제공하는 유용한 기능이 있다면, 이를 흉내낼 수 있는 구현 방법을 고민해본다.

  유용한 기능은, **함수이거나 동작방식**등 다양하게 선택한다.

  

#### 2. TDD

- TDD 방식을 찾아본후, TDD의 장점과 단점은 무엇일까? 토론해본다.
