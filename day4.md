# Day4 논리게이트

## 왜 필요한가?
디지털 논리회로는 컴퓨터 구조에서 가장 기초가 되는 지식을 포함한다.
디지털 논리회로를 연결해서 CPU나 메모리 같은 컴퓨터를 구성하는 부품을 만들게 된다.
디지털 논리회로는 논리적인 사고를 위한 가장 기본이 되는 동작이며, 자연스럽게 프로그래밍 논리 구조와 연결된다. 
디지털 논리회로로 사칙연산을 구현할 수 있고, 현대 CPU에는 ALU 부품으로 구현되어 있다.

## 학습 목표
- 디지털 논리회로 기본 부품(AND, OR, NOT)을 응용해서 만들 수 있는 부가적인 회로에 대해 학습한다.
- 학습한 디지털 논리회로 기본 부품만 활용해서 만들 수 있는 부가적인 회로를 연결해서, 이진 덧셈기를 만든다.
- 우선 1비트를 더하는 반쪽덧셈기(half-adder)를 만들고, 8비트를 처리하는 전체덧셈기(full-adder)를 만든다.
- BOOL 타입으로 만든 8비트 덧셈기에 값을 전달하고, 전달받은 값을 표시하기 위해서 값을 변환하는 함수를 구현한다.


## 미션

### NAND 게이트 함수

- NAND 게이트 동작을 함수로 구현합니다.
- 함수의 매개변수는 BOOL 타입을 갖는 두 개를 갖고, 결과값은 BOOL 타입으로 리턴합니다.
- paramA 와 paramB 가 모두 true 일 때만 결과가 false 가 되고, 나머지 다른 경우는 모두 true가 됩니다.

> 함수 시그니처 예시

```cpp
bool nand(bool paramA, bool paramB) {
    bool answer = true;
    // 여기에 원하는 동작을 구현하세요
    return answer;
}
```

### NOR 게이트 함수

- NOR게이트 동작을 구현합니다.
- 함수의 매개변수는 BOOL 타입을 갖는 두 개를 갖고, 결과값은 BOOL 타입으로 리턴합니다.
- paramA 와 paramB 가 모두 false 일 때만 결과가 true 가 되고, 나머지 다른 경우는 모두 false가 됩니다.

> 함수 시그니처 예시

```cpp
bool nor(bool paramA, bool paramB) {
    bool answer = true;
    // 여기에 원하는 동작을 구현하세요
    return answer;
}
```

### XOR 게이트 함수

- XOR게이트 동작을 구현합니다.
- 함수의 매개변수는 BOOL 타입을 갖는 두 개를 갖고, 결과값은 BOOL 타입으로 리턴합니다.
- paramA 와 paramB 가 서로 다른 값일 때만 결과가 true 가 되고, 같은 값인 경우는 모두 false가 됩니다.

> 함수 시그니처 예시

```cpp
bool xor(bool paramA, bool paramB) {
    bool answer = true;
    // 여기에 원하는 동작을 구현하세요
    return answer;
}
```


### 반쪽덧셈 함수와 전체덧셈 함수

덧셈은 숫자 연산에서 가장 기본이 되는 동작입니다. 

- BOOL 타입으로 동작하는 이진 덧셈기를 논리 게이트 동작만으로 구현해봅니다.
- 합(sum) : 합을 구하는 내부 함수를 구현합니다.
- 자리올림(carry) : 자리올림 비트를 구하는 내부 함수를 구현합니다.
- 반쪽덧셈(halfadder) : 입력을 두 개 받아서, 합(sum)과 자리올림(carry)를 배열로 리턴하는 함수를 구현합니다.

- 반쪽덧셈 예상 결과

```
byteA  = true
byteB  = true
결과 = [true, false]
```

```
byteA  = true
byteB  = false
결과 = [false, true]
```

- 전체덧셈(fulladder) : 입력을 두 개와 자리올림 비트를 입력으로 받아서, 합(sum)과 자리올림(carry)를 배열로 리턴하는 함수를 구현합니다.

- 전체덧셈 예상 결과

```
byteA  = true
byteB  = true
carry  = true
결과 = [true, true]
```

```
byteA  = true
byteB  = false
carry  = true
결과 = [true, false]
```

#### 함수 시그니처 예시

> 자바

```java
class Adder {
    public boolean[] halfadder(boolean bitA, boolean bitB) {
        boolean[] answer = {};
        return answer;
    }
    public boolean[] fulladder(boolean bitA, boolean bitB, boolean carry) {
        boolean[] answer = {};
        return answer;
    }
}
```

> 자바스크립트

```javascript
function halfadder(bitA, bitB) {
    var answer = [];
    return answer;
}

function fulladder(bitA, bitB, carry) {
    var answer = [];
    return answer;
}
```

### 8비트 덧셈기

앞에서 만든 이진 덧셈기를 이용해서 BOOL 타입으로 동작하는 8비트 덧셈기를 구현한다.

- 바이트 덧셈(byteadder) : 8비트를 BOOL타입 배열로 2개를 입력 받는다.
- 자리올림(carry) + 전체 합(sum)을 순서대로 배열로 담아서 리턴하는 함수를 구현한다.
- 입력으로 들어오는 byteA, byteB 배열의 길이는 같다고 가정한다.
- 입력으로 들어오는 byteA 비트 순서는 낮은 자리가 배열의 앞쪽에 오도록 표현한다. 배열의 순서대로 보면 이진수가 뒤집혀 있는 것처럼 보인다고 가정한다.
- 아래 예시에서는 true 대신 1로 표시, false 대신 0으로 표시한다. 

`이진수 1100 = [ 0, 0, 1, 1 ]`  `이진수 0101 = [ 1, 0, 1, 0 ]`

- 덧셈 예상 결과

```
byteA  = [ 1, 1, 0, 1, 1, 0, 1, 0 ]
byteB  = [ 1, 0, 1, 1, 0, 0, 1, 1 ]
   결과 = [ 0, 0, 0, 1, 0, 1, 0, 0, 1 ]
```

```
byteA  = [ 1, 1, 0, 0, 1, 0, 1, 0 ]
byteB  = [ 1, 1, 0, 1, 1, 0, 0, 1 ]
   결과 = [ 0, 1, 1, 1, 0, 1, 1, 1, 0 ]
```

#### 함수 시그니처 예시

> Java

```java
class Adder {
    public boolean[] byteadder(boolean[] byteA, boolean[] byteB) {
        boolean[] answer = {};
        return answer;
    }
}
```


> 자바스크립트

```javascript
function byteadder(byteA, byteB) {
    var answer = [];
    return answer;
}
```


### 10진수 -> 2진수 변환 함수

0부터 256 미만의 `Int` 정수형 10진수를 `[Bool]` 2진수 배열로 변환하는 dex2bin 함수를 구현한다.
- 사칙연산만으로 변환하는 방식을 구현한다.
- 만들어지는 비트 순서는 낮은 자리가 배열의 앞쪽에 오도록 표현한다. 배열의 순서대로 보면 이진수가 뒤집혀 있는 것처럼 보인다고 가정한다.
- 아래 예시에서는 true 대신 1로 표시, false 대신 0으로 표시한다. 

`이진수 1100 = [ 0, 0, 1, 1 ]`  `이진수 0101 = [ 1, 0, 1, 0 ]`

- 예상 결과

```
입력  = 10
결과 = [0, 1, 0, 1]

입력  = 173
결과 = [1,0,1,1,0,1,0,1]
```

> 함수 시그니처 예시

> 자바
```java
class Convertor {
    public boolean[] dec2bin(int decimal) {
        boolean[] answer = {};
        return answer;
    }
}
```

> 자바스크립트
```javascript
function dec2bin(decimal) {
    var answer = [];
    return answer;
}
```


### 2진수 -> 10진수 변환 함수

`[Bool]` 2진수 배열을  `Int` 정수형 10진수로 변환하는 bin2dec 함수를 구현한다.

- 사칙연산만으로 변환하는 방식을 구현한다.
- 입력하는 비트 순서는 낮은 자리가 배열의 앞쪽에 오도록 표현한다. 배열의 순서대로 보면 이진수가 뒤집혀 있는 것처럼 보인다고 가정한다.
- 아래 예시에서는 true 대신 1로 표시, false 대신 0으로 표시한다. 

`이진수 1100 = [ 0, 0, 1, 1 ]`  `이진수 0101 = [ 1, 0, 1, 0 ]`

- 예상 결과

```
입력 = [0, 1, 1, 1]
결과  = 14

입력  = [1,1,1,1,0,1,0,1]
결과 = 175
```

> 함수 시그니처 예시

> 자바
```java
class Convertor {
    public int bin2dec(boolean[] bin) {
        int answer = 0;
        return answer;
    }
}
```

> 자바스크립트
```javascript
function bin2dec(bin) {
    var answer = 0;
    return answer;
}
```

## 배경 지식

### NAND 게이트
이 게이트는 릴레이가 동작하지 않을 때 전압이 출력되고 전구에 불이 들어오는 특징이 있다.

아래 그림을 살펴보자.
회로에서 나오는 출력이 연결되어 있어서 OR 게이트처럼 비슷하게 보인다. 이 회로는 두 스위치가 모두 닫혀있을 때만 전구에 불이 꺼집니다. 그 외에 나머지 경우에는 불이 켜진다.

![nand](http://public.codesquad.kr/jk/cs23/step1-nand.png)

이 논리 게이트는 AND 게이트의 동작과 완전히 반대로 동작한다. 그래서 이 논리 게이트의 이름을 NOT AND (줄여서 NAND) 게이트라고 한다.

NAND 는 AND 게이트 동작에 NOT(인버터)를 붙인 것과 동일하다.
NAND 게이트의 출력은 다음 표와 같습니다.

| NAND | false  | true   |
|---|---|---|
| false  | true  | true  |
| true | true  | false  |


### NOR 게이트

이 게이트는 릴레이가 동작하지 않을 때 전압이 출력되고 전구에 불이 들어오는 특징이 있다.

아래 그림을 살펴보자.
첫 번째 릴레이의 출력은 두 번째 릴레이에 전력을 공급하는 형태가 된다. 결국 두 입력 모두가 꺼져 있어서 전구에는 불이 들어오게 된다.

![nor](http://public.codesquad.kr/jk/cs23/step1-nor.png)

이 논리 게이트는 OR 게이트의 동작과 완전히 반대로 동작한다. 그래서 이 논리 게이트의 이름을 NOT OR (줄여서 NOR) 게이트라고 한다.

NOR 는 OR 게이트 동작에 NOT(인버터)를 붙인 것과 동일하다.
NOR 게이트의 출력은 다음 표와 같다.

| NOR | false  | true   |
|---|---|---|
| false  | true  | false  |
| true | false  | false  |

### XOR 게이트

이 게이트는 OR 게이트와 비슷하지만 다르다. 서로 다른 값일 때만 불이 들어오는 특징이 있다.

XOR 게이트의 출력은 다음 표와 같다.

| XOR | false  | true   |
|---|---|---|
| false  | false  | true  |
| true | true  | false  |

### 반가산기 half-adder

A,B 두 개 비트를 이진 덧셈기로 더하는 과정을 생각해보자. 
다음과 같이 2비트 값으로 표현해볼 수 있다.

| + | 0  | 1 |
|---|---|---|
| 0 | 00  | 01 |
| 1 | 01 | 10 |

![half-adder](http://public.codesquad.kr/jk/cs23/step1-halfadder.png)

이처럼 한 비트의 두 이진수를 더하면 두 비트가 되며, 각각 합(sum)과 자리올림(carry) 비트라고 한다. 
두 개의 표로 구분해본다.

| 합 | 0  | 1 |
|---|---|---|
| 0 | 0  | 1 |
| 1 | 1 | 0 |

| 자리올림 | 0  | 1 |
|---|---|---|
| 0 | 0  | 0 |
| 1 | 0 | 1 |

### 전가산기 full-adder

위에서 살펴본 반가산기는 이진수 덧셈에서 가장 아래 자릿수만 계산할 수 있다.
두번째 자리부터는 자리올림이 발생하면 그것을 함께 더할 수 있어야 한다.

세 개의 이진수를 더하기 위해서는 두 개의 반가산기와 OR 게이트를 아래 그림처럼 연결하면 된다. 

![full-adder](http://public.codesquad.kr/jk/cs23/step1-fulladder.png)

위와 같은 복잡한 그림 대신에 사각형과 직선으로, 아래처럼 표현하고 전가산기(full-adder)라고 부른다. 

![symbol](http://public.codesquad.kr/jk/cs23/step1-fulladder-symbol.png)

### 진법 변환

- 정수형 10진수 값을 2진수로 표현하는 방법을 학습한다.
- 2진수를 16진수로 변경하는 방법을 학습한다.
- 16진수를 10진수로 변경하는 방법을 학습한다.
- 미리 만들어진 수학 함수가 아니라 4칙연산(+, -, *, /) 연산만으로 계산하는 방식으로 학습한다.

## 학습정리

### 피어 컴파일링 체크포인트

```
  1. [ ] NAND 게이트 구현
  2. [ ] NOR 게이트 구현
  3. [ ] XOR 게이트 구현
  4. [ ] 반쪽덧셈 구현
  5. [ ] 전체덧셈 구현
  6. [ ] 8비트 구현
  7. [ ] 10진수 -> 2진수 변환 구현
  8. [ ] 2진수 -> 10진수 변환 구현
```

### 스스로 확인할 사항
- 4비트나 16비트도 같은 함수로 한꺼번에 처리 가능한가?
- byteA와 byteB 배열의 크기가 다르면 어떻게 처리 가능할까?

### 다같이 확인할 사항
- 바이트 순서를 큰 비트(Most Significant Bit)를 좌측으로 배치하는 것과 우측으로 배치하는 방식이 구현할 때 어떤 장점이 있나?
- 같은 방식으로 2진수를 16진법으로 변환하는 함수를 만든다면 어떤 구조가 될까
- 같은 방식으로 16진수를 2진법으로 변환하는 함수를 만든다면 어떤 구조가 될까
