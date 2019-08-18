# Day16 Text Browser


## 왜 필요한가?
URI/URL 규격과 HTTP 프로토콜 규격을 이해하면 웹 브라우저가 동작하는 방식을 이해하는 데 도움이 된다. 실제로 웹 브라우저 주소창에 주소를 입력한 순간부터 웹 서버를 찾아서 요청을 보내고 응답을 받아서 화면에 표시하기까지 흐름을 이해하는 게 중요하다.

## 학습 목표
- URI/URL 표준 규격을 학습하고, URL 문자열을 분석해서 처리하는 라이브러리를 직접 구현하는 것이 목표다.
- 웹 브라우저 동작을 이해하기 위해서, 텍스트 기반으로 동작하는 웹 브라우저를 만드는 것이 목표다. 

## 미션

### 1) URL 처리 요구사항

- URI/URL 규격을 처리하는 라이브러리 모듈 또는 클래스를 구현한다.

	- nodejs URL 모듈과 상관없이 다음 조건을 만족하는 직접 URL 객체를 구현해야 한다.

- URL 문자열을 초기 매개변수로 전달해서 URL 객체를 생성할 수 있어야 한다.

	- URL에 포함될 수 없는 특수문자가 포함된 경우나 필수적인 항목이 없으면 `throw` 처리한다.

	- URL 구성 문자에서 escape 문자는 무시하고 alpha 또는 digit, safe, extra 수준만 지원한다고 가정한다. [BNF 문법 참조](https://tools.ietf.org/html/rfc1738) 

	- 따라서 escape 문자는 구현하지 않아도 된다.

- 다음과 같은 URL 부속 요소에 접근해서 읽고, 변경할 수 있어야 한다.

  - host : String
  - lastPathComponent : String
  - pathComponents : [String] //readonly
  - port : Int
  - query : String
  - scheme : String
  - isFileURL : Boolean
  - user : String
  - password : String
  - absoluteString : String (computed property)
  
- Path Components 관련 기능

  - `pathComponents`는 읽기만 가능하도록 만들고 변경하는 것은 메소드를 만든다

  - append 경로 추가하는 메소드

  - 마지막 경로 제거하기

- URL 객체끼리 같은지 비교하는 함수. 결과는 다음과 같에 5개 상태중에 하나

	1) scheme부터 username, password, host:port까지 같은 상태

	2) scheme과 host:port만 같은 상태 (username, password 제외)

	3) scheme부터 path까지만 모두 같은 상태

	4) 완벽하게 같은 상태

	5) 그 외 서로 다른 상태

- 기본 동작을 확인하기 위한 테스트 코드를 작성해서 동작 결과를 확인한다.

#### 동작 예시 (테스트 코드는 생략)

```javascript
var url = new URL("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=ab&param=12");

//url.host = "boostcamp.connect-foundation.or.kr"
//url.lastPathComponent = "last"
//url.pathComponents = ["/", "first", "second", "last"]
//url.port = 2019
//url.query = "query=ab&param=12"
//url.scheme = "http"
//url.isFileURL = false
//url.user = "user_name"
//url.password = "pass-word"
//url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=ab&param=12"

url.appendPathComponent("basecamp");
url.appendPathComponent("camp");
//url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last/basecamp/camp?query=ab&param=12"
url.deleteLastPathComponent();
//url.absoluteString = "http://user_name: pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last/basecamp?query=ab&param=12"

var url2 = new URL("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=cd&param=12");


var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");

var naverurl = new URL("http://m.naver.com");
console.log(zumurl.isEqual(naverurl));

var url1 = new URL("http://admin@zum.com/#!/home?query=zum");
console.log(zumurl.isEqual(url1));

var url2 = new URL("http://admin@zum.com/#!/home");
console.log(zumurl.isEqual(url2));

var url3 = new URL("http://admin@zum.com/?param=zum");
console.log(zumurl.isEqual(url3));

var url4 = new URL("http://zum.com/#!/home");
console.log(zumurl.isEqual(url4));
```


### 2) HTTP Request 요구사항

- 웹 브라우저가 동작하는 것을 단순화해서 그대로 구현한다.

- 프로그램을 실행할 때 또는 실행하고 나서 URL을 입력한다. 
	
	- `http://zum.com` 주소를 넣어서 꼭 동작해야 한다.

- 입력한 URL 구성 요소를 분석하고, host 정보를 DNS Server에서 검색한다. 

	- Node API 중에서 DNS 모듈을 활용한다.

- host 정보로 찾은 IP 주소 중에 첫번째 값과 port 정보로 TCP Socket을 연결한다. 

	- Node API 중에 Net 모듈을 활용한다.

- HTTP Request 규격을 처리하는 라이브러리 모듈 또는 클래스를 구현한다.

	- 매개변수로 URL을 넘겨서 Request 객체를 생성한다.

	- 요청 방식을 변경하기 위해서 method를 바꿀 수 있다. 기본값은 `GET` 메소드로 생성한다.

	- 요청에 필요한 Header를 추가할 수 있다. 

	- 전송하기 위해 Request Message를 문자열로 return하는 stringfy() 메소드를 구현한다.

- URL 정보를 바탕으로 HTTP Request 객체를 생성하고, Request 메시지를 TCP 세션에 전송(send)한다. 소켓을 생성해서 요청을 보내고 응답을 받아서 처리하는 동작을 구현한다.

	- 서버가 HTTP Reqeust를 인식하기 위한 필수 헤더로 구성한다. (어떤 헤더가 필요한가 학습해서 추가한다.)

- 동작 예시1처럼 네이버로 요청하는 경우 어떤 응답이 오는지 확인한다.

- 동작 예시2에 있는 주소로 GET 요청을 전송한다.

	- 정상적으로 전송되었는지 WireShark 같은 네트워크 분석 도구에서 확인한다. 

	- 결과를 화면 캡처해서 첨부한다.

#### 동작 예시1

> URL `http://m.naver.com`
> 
> (DNS Lookup...)
> 
> TCP Connection : 125.209.218.87 80
>
> `HTTP Request`


#### 동작 예시2

> URL `http://zum.com`
> 
> (DNS Lookup...)
> 
> TCP Connection : 121.189.40.10 80
>
> `HTTP Request`


### 3) HTTP Response 요구사항

- 웹 브라우저가 기본 동작을 구현하기 위해서 응답 처리를 구현한다.

- Request 전송 이후에 수신되는 HTTP Response을 받아서 아래 과정을 거쳐서 출력한다.

- 만약 body에 오는 data가 커서 분리되는 경우는 나머지를 합쳐서 전체를 저장해야 한다. 

	- 정확하게 Content-Length 헤더에 있는 값과 특수문자를 포함한 Body 크기가 같아야 한다.

- 전체 응답을 다 받고나면 응답 데이터를 분석한다.

	- HTTPRequest 처럼 HTTPResponse 객체를 구현한다.

	- HTTP Response Header 부분과 Body를 구분한다. 

	- HTTP Reponse Status 코드를 분리한다. 

	- HTTP Header 중에서 Content-Length 값을 분리한다.

- HTTPResponse 객체는 다음과 같은 속성을 가진다.

	- statusCode : Int

	- responseLine : String

	- contentLength : Int

	- headers : [String]

	- body : Buffer

- Reponse Header를 문자열로 출력하고, Body를 문자열로 바꿔서 출력한다. 

- 모든 데이터를 받고 3초 후에 socket을 소멸하고 프로그램을 종료한다.

#### 동작 예시

> URL `http://zum.com`
>
> TCP Connection : 121.189.40.10 80

`HTTP Request`

```
GET / HTTP/1.1
Accept: text/html
Host: zum.com
User-Agent: Mozilla/5.0
```

`HTTP Response header`

```
HTTP/1.1 200
Server: nginx/1.8.0
Date: Fri, 29 Mar 2019 10:17:38 GMT
Content-Type: text/html;charset=UTF-8
Content-Length: 99605
Connection: keep-alive
Keep-Alive: timeout=5
Vary: Accept-Encoding
X-Application-Context: application:set1:8081
Cache-Control: no-store
Set-Cookie: _TUID=2053B3E7-129F-40E0-A1D0-A6BF7A541B57; Expires=Mon, 26-Mar-2029 10:17:38 GMT; Path=/
Set-Cookie: _ZUT=nc%3D72843112530; Domain=.zum.com; Path=/
Set-Cookie: czi=""; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/
Set-Cookie: bakeryStamp=1; Expires=Mon, 26-Mar-2029 10:17:38 GMT; Path=/
Set-Cookie: p=0; Path=/
```

`HTTP Response Body - HTML`

```
<!DOCTYPE html>
<html lang="ko" class="">
<head>
<title>ZUM - 생각을 읽다, ZUM</title>
<!-- zum.com의 소스코드가 궁금하면 이곳을 방문하라. http://www.zuminternet.com/recruit/list -->
<meta charset="utf-8"/>
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta property="og:title" content="검색포털 줌닷컴"/>
<meta property="og:description" content="생각을 읽는 검색포털 줌닷컴에서 빠르고 편리한 서비스를 만나보세요!"/>
<meta property="og:image" content="http://lego.zumst.com/resources/current/images/img_zum.jpg"/>
<link rel="image_src" href="http://lego.zumst.com/resources/current/images/thumb_zum.jpg"/>
<link rel="icon" href="/favicon.ico?v=2"/>
<style>
html {
background: url(http://lego.zumst.com/resources/current/images/img_main_loading.gif) no-repeat 50% 310px
}
body {
display: none
}
</style>
... <중간생략>

</head>
<body>

...<중간생략>

<li>
<div class="item" data-olap-url="//olaplog.smartmediarep.com/api/v1/olap/olap.sb?version=1.0&media=SMR_MEMBERS&site=ZUM&recomedia=SMR&page=CP_HOME&layout=L1&cpid=C0&channelid=&section=&brand=&programid=&clipid=&targetclipid=CS1_192310&requesttime=20190329191600&device=PC">
<a class="clip_content" href="//tv.zum.com/play/1059872" data-cm="img" data-order="5">
<div class="thumb">
<img src="//thumb.tv.zumst.com/s/zum.tv-zum-cf/tvchosun/2019/03/29/4d63ff958c335f38c8cfe8bb14b70af5.jpg?w=352&h=200">
</div>
<span class="bd"></span>
<span class="icon_mov"></span>
</a>
<a class="clip_content" href="//tv.zum.com/play/1059872" data-cm="tit" data-order="5">
<strong class="title">입 벌어지는 ‘커피 한 잔‘ 장하온 ◉_◉ 박력 웨이브까지?</strong>
</a>
<span class="source">
<a class="clip_content channel" href="//tv.zum.com/channel/3489" data-cm="reference" data-order="5">
미스트롯
</a>
</span>
</div>
</li>
</ul>
</div>
<a href="//tv.zum.com" class="view_more">
<span>TV줌</span> 홈<b class="icon_arrow"></b>
</a>
</div>
</div>
<style type="text/css">body {-ms-touch-action: pan-y pinch-zoom;}</style>
</body>
</html>

```

## 배경 지식

### URI/URL 규격

- URI 주소를 구성하는 요소들에 대해 어떤 용어로 구분하고 처리하는지 학습한다.

- `RFC1738` 표준안에 명시되어 있는 문법 구성을 학습한다.

### HTTP 프로토콜

- HTTP 1.1 프로토콜 규격에서 Request와 Response 종류에 대해 학습한다.

- HTTP과 함께 사용하는 관련 프로토콜 규격을 찾아보고 어떤 역할을 담당하는지 학습한다.

- 웹 브라우저가 동작하는 방식에 대해 학습한다.

	- URL을 입력하면 URL 구성 요소를 분석하고, host 정보를 DNS Server에서 검색한다.

	- host 정보에서 찾은 서버로 보내는 HTTP Reqeuset 내용을 브라우저 개발자 환경에서 확인한다.

	- 여러 사이트에서 받는 HTTP Response 내용을 확인하고, 필수적인 정보가 무엇인가 확인한다.

	- 웹 브라우저는 응답으로 받은 HTML을 표시하기 위해서 어떤 동작을 하는지 확인한다.

### SOCKET API

- TCP/IP 수준에서 저수준 네트워크 프로그래밍을 위한 SOCKET API에 대해 학습한다.

- SOCKET API에 대한 Client, Server 동작 원리를 학습한다.

## 학습정리

### 피어 컴파일링 체크포인트

```
  1. [ ] URL 문자열로 URL 분석 후 객체 생성 - 예외처리 확인
  2. [ ] URL 부속 요소 접근 - 5개 이상 구현 확인
  3. [ ] Path 콤포넌트 - 경로 변경 확인
  4. [ ] URL 객체 비교 - 모든 상태 조건 확인
  5. [ ] 텍스트 브라우저에 URL 주소 입력 - zum.com 동작 확인
  6. [ ] DNS 검색 - Host 주소 확인
  7. [ ] HTTP Request 객체 생성 + 필수 헤더 포함
  8. [ ] HTTP Request 메시지 전송 - Socket Client 동작 확인
  9. [ ] HTTP Response 수신 + 데이터 병합 - Content-Length와 크기 비교
  10. [ ] HTTP Response 분석 객체 - Response Header 확인
  11. [ ] HTTP Response Body 출력 - HTML
```

### 스스로 확인할 사항

- URL 구성 요소에 대해 학습한다. 
- 다양한 URL 케이스를 어떻게 처리하는지 확인한 방법을 정리한다.
- HTTP Request 종류와 HTTP Response 종류에 대해 학습하고 정리한다.

### 다같이 확인할 사항

- 웹 브라우저가 동작하는 과정을 개발자 화면에서 확인하고 학습한다.
- 리눅스/유닉스 환경에서 wget 이나 curl 명령 사용방식에 대해 학습한다.
- 브라우저가 처리하는 과정을 WireShark 같은 네트워크 패킷 분석 도구를 통해서 확인한다.
- WireShark 도구가 동작하는 원리에 대해 학습한다.
