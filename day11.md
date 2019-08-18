# Day11 콜스택 & 이벤트 큐

## 왜 필요한가?
자바스크립트는 동기적인 프로그램 실행과, 비동기적인 프로그램 실행으로, 프로그램의 효율적이고 빠른 동작을 가능하게 한다.

비동기적인 동작의 흐름에 대한 충분한 이해를 통해 보다 좋은 자바스크립트 프로그래밍이 가능하다.




## 학습 목표
- call stack과 event queue의 동작 관계를 이해한다.



----

## 미션



### 프로그램 제약조건)

- 전역변수를 추가하면 안된다.
- async/await, promise를 사용할 수 없다.
- eventEmitter와 같은 비동기 모듈을 사용할 수 없다.
- **setTimeout은 사용할 수 있음**



### 1. 2초 동안 실행되는 함수 구현 

runSync는 수행시간이 2초이다. 다시말해 함수의 실행시작부터 반환까지 2초가 걸린다.

runSync함수 구현시, 위 프로그램 제약조건뿐 아니라 **setTimeout도 사용할 수 없다**.

```javascript
function runSync(id) {
   //여기에 구현
}

runSync(1) 
runSync(3)
```



**[실행결과]**

```shell
1 sync 함수 실행    //최초실행 이후 2초 뒤에 출력
3 sync 함수 실행    //윗줄 이후 2초 뒤에 출력
```





### 2.  Call Stack과 Event Queue의 구현

Call stack(JS Stack)과 Event-Queue 동작을 흉내내는 코드를 구현한다.

**executeCallStack과 executeEventQueue 함수를 완성**해서, 원하는 결과를 출력하도록 한다. 

```javascript
function runSync(id) {
 //위에서 구현한 코드
}

//runAsync 함수는 수정하지 않는다.
function runAsync(id) {
  console.log(id + " async 함수 실행");
}


//executeEventQueue는 callstack이 비워지면, eventQueue에 있는 함수가 순서대로 실행되도록 구현한다.
//executeEventQueue는 종료되지 않고 계속 실행되는 프로그램이다.
function executeEventQueue() {
  //.......
}

//executeCallStack은 callstack에 있는 함수가 역순으로 실행되도록 구현한다.
//executeCallStack은 종료되지 않고 계속 실행되는 프로그램이다.
//하지만 callstack에 더이상 실행해야할 함수가 없다면 종료되야 한다.
function executeCallStack() {
  //.......
}

//이부분은 수정하지 않는다. 
//callStack과 eventQueue의 갯수는 1개 이상 n개일 수 있다.
let callStack = [runSync.bind(null, 1), runSync.bind(null, 2)];
let eventQueue = [runAsync.bind(null, 1),runAsync.bind(null, 2),runAsync.bind(null, 3)];

//프로그래밍 실행 예시
//구현방법에 따라서, executeEventQueue,executeCallStack 실행시 필요한 인자는 아래와 다를 수 있다.
executeEventQueue(callStack, eventQueue);
executeCallStack(callStack);
callStack.push(runSync.bind(null, 3));
```



**[실행결과]**

sync에 있는 내용이 먼저 모두 나온후에, async내용이 노출된다.

```shell
2 sync 함수 실행    //최초실행 이후 2초 뒤에 출력
1 sync 함수 실행    //윗줄 이후 2초 뒤에 출력
3 sync 함수 실행    //윗줄 이후 2초 뒤에 출력
1 async 함수 실행   //윗줄 이후 즉시 출력
2 async 함수 실행   //윗줄 이후 즉시 출력
3 async 함수 실행   //윗줄 이후 즉시 출력
```



### 3. 특정 시간 이후 프로그램 종료

callstack이 비워진 채로, **5초가 흐르면 프로그램은 자동 종료**된다.

```javascript
//프로그래밍 실행 예시
//구현방법에 따라서, executeEventQueue,executeCallStack 실행시 필요한 인자는 아래와 다를 수 있다.
executeEventQueue(callStack, eventQueue);
executeCallStack(callStack);
callStack.push(runSync.bind(null, 3));
setTimeout(()=>callStack.push(runSync.bind(null, 4)), 6000);
setTimeout(()=>callStack.push(runSync.bind(null, 5)), 20000);
```



**[실행결과]**

'4 sync함수 실행'은 프로그램 실행 부터 12초 뒤에 출력된다. (정확한 확인을 하려면 console.time 함수를 활용할 수 있다)

'4 sync함수 실행'이 출력된 후 5초 뒤에 프로그램은 자동 종료된다.  따라서 '5 sync함수 실행'은 출력될 수 없다.

```shell
2 sync함수 실행
1 sync함수 실행
3 sync함수 실행
1 async함수 실행
2 async함수 실행
3 async함수 실행
4 sync함수 실행  //프로그램 실행 후 12초 뒤에 출력되야 함
//5초뒤에 프로그램 자동종료
```



### 4. 글쓰기, 정리

자바스크립트 비동기에 대해서 이해하기 위해서, **call stack과 event queue, event loop**에 대해서 글로 정리한다.

Markdown 형식으로 정리한다.

**jsasync.md** 파일로 정리해서 commit 한다.

분량은 한페이지 또는 그 이상으로 작성한다.



------

## 배경 지식

### 동기(synchronous)

```javascript
const baseData = [1,2,3,4,5,6,100];

baseData.forEach((v,i) => {
    console.log("sync ", i);
});

baseData.forEach((v,i) => {
    console.log("sync 2", i);
});

```

동기적인 흐름은 순서대로 실행될 뿐이다. 원활한 프로그램 흐름을 유지해야 함으로 순서가 바뀔 수 없다.



------

### call stack

개발자도구의 call stack으로 확인해보기.

```Javascript
const baseData = [1,2,3,4,5,6,100];

function foo() {
  baseData.forEach((v,i) => {
    console.log("sync ", i);
    bar();
  });
}

function bar() {
  baseData.forEach((v,i) => {
    //debugger;
    console.log("sync 2", i);
  });
}
```

**call stack이 쌓이는 것을 시각적으로 표현해보라!**



------

### setTimeout과 비동기

만약 setTIme이 동기적으로 실행되면 어떻게 돼지? 

```javascript
setTimeout( ()=>console.log(10), 10000);
```



setTimeout함수의 callback 함수는 함수의 인자로 들어가서, 즉시 또는 나중에 실행되는 녀석이다.

어떻게 동작하는 걸까?  설명해보자.



------

### callstack & callback queue(event queue)

<img src="https://cdn-images-1.medium.com/max/1600/1*FA9NGxNB6-v1oI2qGEtlRQ.png" width="600px">

- call stack 그리고, callback queue(또는 event queue)
- event loop를 통해서 callback queue에 있는 callback함수들이 stack으로 올라감.



------

### 동기-비동기 순서 이해하기

결과값을 예상해보자. 

```javascript
function plus() {
  let a = 1;
  setTimeout( ()=>console.log(++a), 1000);
  return a;
}

const result = plus();
console.log('result :', result);  //?
```



------

### 비동기 상황 예

```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) => {
 for(var i=0; i<arr.length; i++) {
   setTimeout( () => fn(i), 1000);
 }
}

asyncRun(baseData, idx =>console.log(idx));
```





------

### 비동기 상황 예 - forEach로 변경해보자.

```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) => {
   arr.forEach((v,i) => {
     setTimeout( () => fn(i), 1000);
   });
}
asyncRun(baseData, idx =>console.log(idx))
```





------

### 비동기 상황 예 - 동기 + 비동기  + 동기 

```javascript
const baseData = [1,2,3,4,5,6,100];

function sync() {
  baseData.forEach((v,i) => {
    console.log("sync ", i);
  });
}

const asyncRun = (arr, fn) => {
   arr.forEach((v,i) => {
     setTimeout( () => fn(i), 1000);
   });
}
 

function sync2() {
  baseData.forEach((v,i) => {
    console.log("sync 2 ", i);
  });
}

asyncRun(baseData, idx =>console.log(idx))
sync();
sync2();
```





------

### 비동기 상황 예 - 비동기 + 비동기

순서를 예상해보기.

call stack과 callback queue를 상상하자.

```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) => {
   arr.forEach((v,i) => {
     setTimeout(() => {
       setTimeout(() => {
         console.log("cb 2");
         fn(i)
        },1000);
       console.log("cb 1");
     }, 1000);
   });
}

asyncRun(baseData, idx =>console.log(idx))

```



### EventQueue와 CallStack 과의 관계

아래 **매우 훌륭한 영상**을 제대로 보고 이해하자. 

https://youtu.be/8aGhZQkoFbQ



-----

## 학습정리



### 피어 컴파일링 체크포인트

```
1. [ ] executeEventQueue와 executeCallStack의 구현
2. [ ] 실행순서 확인 (sync -> sync -> sync -> async -> async -> async -> sync)
3. [ ] runSync는 2초씩 실행
4. [ ] '4 sync 함수 실행'은 프로그램 실행 후 12초 후에 출력
5. [ ] '4 sync 함수 실행' 5초 후 프로그램 종료
6. [ ] jsasync.md 글 내용확인과, 이 글에 대한 충분한 구두설명
```



### 스스로 확인할 사항

- 실제 call stack과 event queue동작을 충분히 이해하고, 이를 코드로 구현한 것인지 확인한다. 

  
### 다같이 확인할 사항

- 자바스크립트 비동기에 대해서 이해하기 위해서, **call stack과 event queue, event loop**에 대해서 글로 정리한다.

