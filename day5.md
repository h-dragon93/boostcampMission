# Day5 디버깅

## 왜 필요한가?
- 개발자가 개발환경과 디버깅방법을 잘 이해하는 것은 필수이다. 효율적이고 생산적인 프로그램을 할 수 있다.
- 프로그래밍 소스는 다양하게 변경되고 발전되며, 그 과정에서 버전별로 잘 관리할 필요가 있다. 

## 학습 목표
- vscode도구에서 Node.js 프로그래밍을 실행하고 디버깅할 수 있다.
- NPM환경에 대한 기본이해를 한다.
- git 을 통한 프로그래밍 소스관리에 대한 기본 이해를 한다.



----
## 미션

### 1. 프로그래밍의 문제를 해결해서 올바른 출력을 한다
code : https://gist.github.com/nigayo/df0f0919d04900966154ab512b21cdfb

- 예상 결과
b.js 를 실행하면, run메서드가 두번 호출되며, 아래 결과가 화면에 출력돼야 한다.

```shell
step1$ node b.js
error없이 프로그래밍이 실행됐습니다
이크 에러가 발생했어요 'who are you?' == 'hello our members!'
```



### 2. 디버깅과정을 코드 상단에 주석으로 5줄 미만으로 작성한다.

이 문제를 해결하기 위해서 vscode를 어떻게 활용했는지 주석으로 그 과정을 자세하게 작성한다. 



### 프로그램조건 

- 현재 발생하는 버그(에러)를 모두 해결한다.
- 결과는 VSCode 콘솔에 출력된다.
- b.js 는 수정할 수 없으며 다른파일은 수정할 수 있음.



----

## 배경 지식

### VSCode-Node.js  debugging

debugging은 문제를 해결하는 과정이다. 보통 개발도구를 통해서 프로그램이 동작되는 과정에서 생기는 문제를 찾을 수 있다.

예를들어 소스코드의 특정 line에서 breakpoint를 지정하면 프로그램은 그 line에서 동작을 멈추고 더이상 실행되지 않는다. 멈춘 상태에서 변수값등을 확인하면서 문제를 찾아나갈 수 있다. 



vscode에서 nodejs디버깅 방법을 익혀보자. 공식홈페이지의 디버깅 방법을 공부한다.
https://code.visualstudio.com/docs/editor/debugging
https://code.visualstudio.com/docs/editor/debugging#nodejs-articles



디버깅 과정에서 중요하게 이해해야 할 방법들.

- breakpoints란
- watch사용법
- call stack 의 의미
- Step over / Step into/ Step out 




### NodeJS 의 module 방식의 프로그래밍에 대해서 공부해보자. 

먼저 Node.js 기반의 프로젝트를 만드는 방법과 외부모듈을 설치하는 방법을 익혀본다. 

- npm init : 프로젝트 디렉토리 초기화 명령어이다.
- package.json : npm init 한 이후에 생성되는 npm 프로젝트에 대한 환경정보이다.
- npm install 특정모듈 : 특정모듈을 설치하기 위한 방법이다. 



Modular programming 은 모듈방식으로 프로그램을 나누고, 이를 통해 복잡한 애플리케이션의 역할을 나눠서 문제를 해결한다. NodeJS에서도 이를 지원하다. 

- require, exports !!
- 참고 : https://nodejs.org/api/modules.html
- 공식사이트의 튜터리얼을 따라해서 export 와 require를 사용해보자.



------

## 학습정리

### 피어 컴파일링 체크포인트

```
1. [ ] b.js를 실행 후 두 개의 결과확인(성공과 에러발생)
2. [ ] b.js 코드가 수정되지 않았는지 확인
3. [ ] 주석내에 있는 디버깅과정이 실제 이 문제를 해결하는 내용이 맞는지 확인
```

### 스스로 확인할 사항
- git의 branch에 대해서 이해를 하고 있는가? 
- 디버깅단계에서 breakpoint를 사용하면서 문제를 해결하려고 했는가?


### 다같이 확인할 사항
- 각자 어떤 디버깅 방법을 사용해보았는가? 이 부분을 모두 이야기하고 적어보자.
- 프로젝트에서 npm 명령어를 활용해 추가로 외부 모듈을 설치했을때 package.json에 어떤 변화가 생기지 설명하자.
- node_modules 디렉토리는 어떤 역할을 하는 디렉토리 인가 설명해보자.
- export, require 동작방식에 대해서 설명해보자.
