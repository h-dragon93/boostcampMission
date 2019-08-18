# Day8 OOP 할일관리 프로그램

## 왜 필요한가?
소프트웨어의 크기가 커지면 이를 객체 단위로 만들어서 큰 그룹을 지어 프로그래밍을 할 수 있다.

Java나 C#과 같은 객체지향프로그래밍 언어에서는 이를 필수로 하지만, 자바스크립트는 객체지향언어라고 하기는 어렵다.(객체없이 프로그래밍이 가능함으로)

하지만 자바스크립에서도 객체지향프로그래밍이 가능하며, 이를 활용해서 현업에서는 많은 프로그래밍을 만들어서 운영하고 있다.

현대의 프로그래밍에서는 객체단위로 프로그래밍을 하는 것이 여러가지 선택지 중 하나이다.(참고로 자바스크립트에서도 함수형프로그래밍 방법이 많이 활용되고 있고, 객체지향과 함수형프로그래밍 패러다임을 섞는 경우도 많다)




## 학습 목표
- OOP 라는 것은 무엇이고, 어떻게 프로그램을 설계 해야 하는지 기초적인 지식을 안다.
- Object literal을 이해한다
- prototype 과 prototype chain을 이해한다.
- ES6 Classes로 객체 만드는 방법을 안다.
- API 서버의 기본 역할을 이해한다.
- 모듈단위의 개발을 할 수 있다.



----


## 미션

### 객체지향을 고민하면서 만드는 TODO 애플리케이션



#### 1. 기본기능  

- id는 unique하게 생성한다. **uuid 모듈을 사용**한다.
- add에서는 tag를  n개로 받을 수 있다.
- update 시에는 2초 delay후에 화면에 결과가 출력된다. **async/await 와 promise패턴을 사용**해서 구현한다.


- show/add/update/delete 가 동작되며, **add 기능은 immutable 한 방식**으로 상태가 변경된다.

- entry point 역할을 하는 파일은 **TodoApp.js** 이다.

  ```javascript
  $  node TodoApp.js
  
  명령하세요 : show$$current
  현재상태 :  todo: [1,124], doing:[123,444], done:[]
  
  명령하세요 : show$$todo
  todo리스트 :  총2건 : ' 자바스크립트 공부하기, 123번' , 'iOS공부하기, 124번'
  
  명령하세요 : add$$docker공부하기$$["favorite","programming"]
  docker공부하기가 추가됐습니다.(id : 7788)
  현재상태 :  todo: [1,124,7788], doing:[123,444], done:[]
  
  명령하세요 : update$$7788$$doing
  (여기서 2초가 흐른뒤에 아래 내용이 나온다)
  docker공부하기 doing으로 상태가 변경됐습니다
  현재상태 :  todo: [1,124], doing:[123,444, 7788], done:[]
  
  명령하세요 : delete$$7788
  docker공부하기가 doing목록에서 삭제됐습니다
  현재상태 :  todo: [123,124], doing:[123,444], done:[]
  
  
  ```



#### 2. TodoApp.js 의 내용

- 아래 주어진 코드를 TodoApp.js의 **기본코드로 사용**하면서, 필요한 코드를 변경/추가 한다.

```javascript
const TodoModel = require("./TodoModel.js")
const TodoController = require("./TodoController.js")
const TodoHtmlView = require('./TodoHtmlView.js') //뒤에 설명

//todolist 값을 서버에서 얻어와야 한다.
//const todolist = 서버에서 데이터 가져오기 코드가 필요

const todoModel = new TodoModel(todolist);
const controller = new TodoController(todoModel);
controller.runTodo();
new TodoHtmlView(todoModel);

```

- **TodoController.js**
  - 사용자 입력내용(add/update/delete)을 분석해서 분기하는 역할
  - **ES Classes** 형태로 구현해야 한다.
  - TodoModel객체만 주입받는다.
- **TodoModel.js**
  - todolist 상태값을 add/update/delete등을 통해서 실제 변경하는 역할
  - ES6 Classes 패턴을 사용할 수 없으며, ES6이전의 **prototype패턴**을 활용해서 만들어야 한다. 
  - todolist 데이터만 주입받아서 동작된다.
  - 뒤에 나오는 Observer 기능을 하는 객체는 require로 가져와서 사용한다.
  - console.log로 출력하는 역할을 할 수 있으며, console.log부분을 별도의 클래스로 분리할 수도 있다(선택사항)
- **TodoHtmlView.js**
  - todoModel에서 현재상태를 출력 할 때마다, log.html파일을 새롭게 생성하는 파일이다. (뒤에 설명)
- **util.js**
  - util.js 를 객체리터럴 형태로 만들고, 아래 기능을 포함한다.
    - unique한 방식으로 id를 생성하는 방식
    - delay를 시키는 함수
    - 기타  일반적인 유틸리티 기능이라고 판단되는 기능들
- **그외에 필요한 객체는 ES Classes 나 prototype패턴을 활용해서 추가 할 수 있다.**



#### 3. 객체지향 원칙

- 클래스나 객체코드 (TodoModel, TodoController, TodoHtmlView 등)안에서 다른 객체를 직접 호출하는 코드가 없어야 한다. 즉 모든 클래스나 객체는 결합도가 낮은상태를 유지한다.

  ```javascript
  class A {
    go() {
      const b = new B();  //A클래스 안에서, 이렇게 직접호출하는 것은 좋지 않음
      b.run();
    }
  }
  ```

  

- 생성자에서 많은 일을 하지 않도록 한다. 메서드를 최대한 작게만들고, 여러개로 나눠서 만든다.



#### 4. API서버 구성

- 8090 port로 동작하는 API서버를 만든다. 
- nodejs의 **Express 모듈을 사용**해서 만든다.
- /server 디렉토리를 새롭게 만들고, **/server/app.js** 에 서버를 구동하는 코드를 구현한다.
- 데이터베이스는 존재하지 않는다. json형태의 데이터를 javascript파일로  만들고, 이를 응답하도록 한다.
- 데이터 요청/응답에 필요한 부분은 Express뿐만 아니라 모든 npm 라이브러리를 사용할 수 있다.
- Express 사이트의 **getting started** 부분을 참고해서 만드는 것을 권장한다.



#### 5. Observer pattern 을 통한 model에서의 알림과, 새로운 View 클래스 에서의 구독기능 

- **TodoHtmlView.js**는 html/log.html 파일과 내용을 생성하는 view생성 클래스이다.
- /html/log.html 파일내용은 아래와 같으며, 현재todlist 상태값이 출력될때마다 업데이트 된다.
- TodoHtmlView.js는  template literal을 활용해서 HTML문자열을 생성할 수 있고, 'fs' 와 같은 모듈을 사용할 수 있다.
- TodoHtmlView.js 는 ES Classes로 구현한다.
- /html/log.html  내용

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TodoList Result</title>
</head>
<body>
<h1>todolist</h1>
    <div class="log">
        현재상태 : doing:[1,223,333,423], todo:[], done:[], 
    </div>
</body>
</html>
```

- Observer pattern 사용.

  - **Observer 패턴을 공부하고, 이를 Observable.js 파일로 생성한다. ES Classes문법으로 구현한다.**
  - **TodoModel은 Observable.js를 상속**받는다. (prototype 체인을 연결하는 방식을 적용, extends 키워드를 쓸 수 없음)
  - **TodoHtmlView.js** 는 객체 생성단계에서 주입받은 **TodoModel객체를  '구독'** 한다. (주어진 TodoApp.js 내용참고)
  - **model의 변경이 view로 전달되는 과정은 Observer패턴**을 따른다.
    - **TodoModel에서 현재상태를 출력할때마다**, TodoModel의 '알림' 기능을 통해서, **/html/log.html** 내용도 자동으로 업데이트 된다. 
    - 즉, TodoModel에서 TodoHtmlView객체를 직접 호출하지 않고, **TodoHtmlView가 TodoModel을 구독**해서 실행되어야 한다.

  

#### 6. 기타

- node_modules/ 디렉토리를 **commit 에서 제외**시킨다.

- this binding을 위해서 **that = this;** 와 같은 this값을 변수에 저장하는 방식을 **사용할 수 없다.** 

- TodoController 는 기본적으로 try-catch를 통해서 에러처리를 포함한다.

  

------

## 배경 지식

### 객체

모든 것이 객체다!?

어떠한사물 === Object.

현실세계를 인지하면서 프로그래밍을 하자!에서 출발

 => 상상하고,볼수있고,만질수있는 것들은 모두 객체이다.



------

### 객체의 구성

모든객체는 속성(property)과 행위(method)를 가질 수 있음.

- 속성 : 사람의 키,나이,몸무게
- 행위  : 움직이다, 먹다, 자다, 공부하다



```javascript
Class {
  this.height = 180;  //property
  this.age = 22;  //property
  eat = function() {}  //method
}
```



업계에서 현실적으로 같이 쓰는 용어

- 속성,필드,property는 같은말.
- 함수,메서드도 같은말.



------

### 클래스와 객체

class는  어떠한 객체를 표현하기 위해, 일반화된 형태로 만든 것으로 볼 수 있다.
어떠한 **집합이나 분류**에 가깝다.(사람, 동물, 자동차 등)

객체는 인스턴스라고도 하며, class를 통해서 얻을 수 있는 것으로 볼 수 있다.
따라서 유일한 사물이라고 볼 수 있으며,  꼭 그런것은 아니지만 실체에 가깝다(crong, 사자, 벤츠)

우리가 자주 사용하는 console.log 에도 객체와 메서드가 있다.

- console => 객체(인스턴스)
- log => 메서드(함수)



------

### OOP 핵심 개념(참고)

객체지향 언어에서는 다음의 항목을 중요하게 다룬다. 이를 이해하고 프로그래밍을 하면 더 나은 객체지향프로그래밍을 할 수 있다.

- Class
- 캡슐화(Encapsulation)
- 상속(Inheritance)
- 다형성(polymorphism)
- 추상화(abstraction)



### 프론트엔드에서는 OOP를 어떻게 할 수 있지 ?

화면에 보이는 UI요소, 어떠한 제어를 하는 비UI요소등, 모든 것을 **모듈**로 만들어서 개발할 수 있음.

여기서 **모듈은 객체(class형태)**임.

JavaScript세계에서 **객체의 표현방식은 다양**함.



------

### 객체표현 - 1. object literal

class없이 바로 object로 표현가능(singleton)

```javascript
const healthObj = {
  name : "달리기",
  lastTime : "PM10:12",
  showHealth() {
    console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
  }
}

healthObj.showHealth();
```



------

### 객체표현 - 2. ES Classes pattern - ES2015

Class가 생기고, class에서 제공하는 constructor라는 생성자가 주어짐. 
class를 new키워드로 호출하면 constructor가 자동호출 됨. 

constructor는 instance를 만들어서 반환.  다시말해 객체(instance)를 생성해서 반환.

하지만 ES Classes역시 prototype을 내부적으로 사용하고 있다.

```javascript
const Health = class {
  constructor(name, healthTime) {
    this.name = name;
    this.healthTime = healthTime;
  }

  showHealth(){
     console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }

}

const ho = new Health("crong", "12:12");
ho.showHealth();
```

class의 브라우저 지원범위는 어때요? 
https://caniuse.com/#feat=es6-class



------

### 객체표현 - 3. constructor pattern

function을 new 키워드로 호출하면, 그 함수는 constructor가 됨.

```javascript
const Health = function(name,healthTime) {
  this.name = name;
  this.healthTime = healthTime;
  this.showHealth = function() {
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = new Health("crong", "12:12");
ho.showHealth();
```





------

### 객체표현 - 4. prototype pattern 

(가장 중요한 부분으로 내용이 길다. 🚂)

constructor 패턴과 유사하나,

메서드를 prototype객체에 보관해서 constructor pattern보다는 메모리 효율 성에서 매우 유리함.



<iframe src="https://player.vimeo.com/video/266039157" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/266039157">Prototype pattern</a> from <a href="https://vimeo.com/codesquad">Yoda codd</a> on <a href="https://vimeo.com">Vimeo</a>.</p>



```javascript
const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
}

Health.prototype.showHealth = function() {
  console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
}

const ho = new Health("crong", "12:12");
ho.showHealth();

```

ho 라는 객체를 열어서 prototype의 어떻게 실제 존재하는지도 들여다 보자. 

또한 ho2로 만들어진 prototype객체의 메서드와 ho의 prototype객체의 메서드가 서로 같은 메모리 주소를 참조하는지도 확인해보자. (=== 으로 비교)



##### 이렇게 만들어진 객체 들여다보기.

myHealth 개발자도구의 콘솔창에서 열어보면 다음과 같다.

```javascript
myHealth => 
    name : "달리기", 
    lastTime : "23:10", 
    > __proto__ : Object
        showHealth: ()
        > __proto__: Object  
```

__proto__ 는 prototype객체를 표현한 것이고, 
모든 객체는 prototype으로 연결되어 있어, prototype안에 있는 어떠한 메서드를 사용하면, prototype을 타고 올라가면서 찾는다. 이것을 prototype체인이라고 한다.



##### 왜 prototype?

prototype은 효과적으로 동작.
생성자를 통해 생성된 객체(인스턴스)들이 여러개 있어도, 
prototype에 연결된 객체들(movieObject)는 동일한 메모리 공간에서 효율적으로 재사용 됨.
즉, 두 객체의 prototype은 같음.

```javascript
myHealth.__proto__ === myHealth2.__proto__  //true
myHealth2.__proto__ === myHealth3.__proto__  //true
//__proto__ 객체는 자바스크립트 내부에서만 사용되는 속성이다.
```

prototype객체는 최상위 Object까지 연결되어 있음.
prototype연결고리를 만들어서 객체간의 상속관계를 만들 수 있음.



##### prototype을 사용한 예제

두 개의 모듈을 생성자 역할을 하는 함수를 만들고, 각각 생성자에 prototype속성에다가 메서드를 추가하는 예제이다.
이처럼 class없이도 구현할 수 있다. 

```javascript
//VM 모듈
var VM = function(elBase) {
   this.elBase = elBase;
	 this.init();
}

VM.prototype = {
  init : function() {
	  this.elBase.addEventListener("click", this.clickListener);
    this.xxx.addEventListener("click", this.xxxxListener);
  }
}

//Wallet 모듈
var Wallet = function(elBase) {
   this.elBase = elBase;
	 this.init();
}

Wallet.prototype = {
  init : function() {
	  this.elBase.addEventListener("click", this.clickListener);
    this.xxx.addEventListener("click", this.xxxxListener);
  },
	run : function() {
    //blah....
  }
}
```





------

### 객체표현 - 5. Object.create

Object.create는 직접적으로 prototype키워드를 사용하진 않지만, Prototype object를 만드는 것과 동일.

```javascript
const healthObj = {
  showHealth : function() {
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = Object.create(healthObj, {
   name: { value: "crong" },
   healthTime: { value: "12:22" } 
})

ho.showHealth();
```

Object.create는 prototype기반 객체연결(상속형태)을 좀더 매끄럽게 사용하기 위해 탄생했다고 이해할 수 있음.

Object.create를 사용하면 객체연결구조가 잘 만들어짐. 

하지만 이 방법은 많이 쓰이지 않고 있는데 이유는, ES6 Classes의 extend를 사용해서 이제 보다 쉽게 클래스간 상속 구조를 만들 수 있게 됐기 때문.



------

### 언제 object literal을 사용하고, 언제 class 를 사용할까?

1. object literal 

여러개의 객체를 만들어서 생성할 필요가 없을때, 즉 일반화할 필요가 없는 경우에는 단순히 object literal로 객체를 표현.



2. class

하나 이상으로 개별적인 객체를 생성해야 할 때. 





-----


## 학습정리


### 피어 컴파일링 체크포인트

```
1. [ ] show$$current 실행
2. [ ] add 실행(태그는 2개이상)
3. [ ] add할때 immutable방식적용
4. [ ] update 실행(2초 지연 결과 노출)
5. [ ] 지연시 async/await와 promise를 활용
6. [ ] delete 실행 
7. [ ] 'q'로 프로그램 종료
8. [ ] unique한 id 생성 확인(uuid사용)
9. [ ] util에서 객체리터럴 사용
10. [ ] TodoController, TodoHtmlView, Observable에서 ES Classes를 사용
11. [ ] TodoModel에서 prototype을 통한 객체 표현
12. [ ] TodoModel에서 Obsevable 객체를 상속 (prototype방식으로 연결)
13. [ ] TodoHtmlView.js에서 TodoModel객체를 구독
14. [ ] '현재상태' 출력시 a.html내용도 계속 업데이트
15. [ ] 객체지향원칙 준수
16. [ ] Express를 통한 API서버 연결
17. [ ] '기타' 항목의 요구사항 확인
```



### 스스로 확인할 사항

- 주어진 요구사항을 꼼꼼하게 체크하고, OOP와 모듈단위로 나눈방식의 개발방법의 장점이 무엇인지 고민한다.
- 더 개선할 부분은 없는지, 더 좋은 방식의 패턴이 없을지 고민해본다.



### 다같이 확인할 사항
- undo/redo 기능을 제공하고 싶다. 특정 사람의 코드를 골라서, 이 기능을 추가하기 위한 전략을 세워보자.

- html파일생성이 아닌 markdown포맷을 생성하는 view클래스를 만든다고 가정한다. Obsever패턴을 어떻게 적용할 수 있을까? Observer패턴의 장점은 무엇일까? 

  