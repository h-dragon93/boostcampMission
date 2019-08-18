# Day7 Linux Shell


## 왜 필요한가?
리눅스/유닉스 개발 환경은 백엔드 개발자들에게 익숙한 개발 환경이다. 터미널로 서버 환경에 원격으로 접속해서 원하는 작업을 할 수 있도록 친숙해져야 한다. 리눅스/유닉스의 역사부터 쉘 환경에 익숙해지고 스크립트로 원하는 동작을 자동화할 수 있어야 한다.

## 학습 목표
- 리눅스/유닉스 환경에 대해 학습하고, 터미널로 리눅스 쉘 환경에 익숙해지는 것이 목표다.
- 셀 환경에 익숙해지고, 셀 스크립트를 작성해서 자동화 처리를 진행한다.
- 로컬 컴퓨터에서 타입 스크립트를 컴파일해서 리눅스 가상 환경에 배포 파일을 스크립트로 배포하는 것이 목표다.


## 미션

* 다음 각 단계를 진행하면서 작업한 명령어, 스크린 캡처, 진행 과정, 실행 결과를 설명하는 문서를 마크다운 형식으로 작성한다. 

* 스크립트 파일, 마크다운 문서와 이미지 등을 모두 포함해서 커밋하고 푸시한다. 

* 단, 컴파일한 바이너리 실행 파일은 포함하지 않는다. 

### 1)가상 환경 설치하기

* 각자 컴퓨터 환경에서 사용할 수 있는 가상 환경(Virtual Machine)에서 리눅스 운영체제를 설치한다. 

  * 권장 설치 운영체제 : ubuntu 18.04 또는 ubuntu 16.04

* 가상 환경에 원격으로 접속할 수 있도록 ssh 설정을 하고, root 계정 이외에 본인 접속할 계정을 추가한다. 

* 본인 계정에 대한 패스워드를 설정한다.

* 로컬 컴퓨터에서 가상 환경 리모트 컴퓨터에 ssh로 접속해서 본인 계정으로 로그인한다.

* 본인 계정에서 `/backup` 디렉토리를 생성하고 `764` 모드로 접근 권한을 바꿔서, 본인 계정으로 쓸 수 있도록 설정한다. 

#### 무료 가상 환경
> 1) VirtualBox : https://www.virtualbox.org
> 
> 2) Docker : https://www.docker.com
> 	- ubuntu images `https://hub.docker.com/_/ubuntu/`

#### 유료 가상 환경
> 1) VMWare : https://www.vmware.com
> 
> 2) Parallels : http://parallels.com/
> 

### 2)쉘 스크립트 요구사항

* 특정한 디렉토리 아래 `day1` 부터 `day16`까지 문제 해결 디렉토리가 있다고 가정한다. 

	* 각 디렉토리 아래에는 작업한 소스 파일들이 들어있다.

* bash 셀 스크립트로 현재 디렉토리 아래있는 `day1`에서 `day16` 디렉토리 중에서 있는 js 파일만 `zip`으로 압축해서 백업하는 스크립트를 자동화해서 구현한다.

* 스크립트 진행 도중에 js 파일이 없는 디렉토리가 있으면, 어느 디렉토리가 없는지 문구를 출력한다.

* 예를 들어 `day7/` 경로 아래 js 파일이 없으면 `day7 is empty` 같은 문구를 출력할 수 있다.

* 스크립트는 js 파일들을 압축해서 가상머신 리눅스 `/backup` 경로에 복사한다. 

* 로컬에 생성한 `.zip` 파일은 scp 명령을 사용해서 가상 머신으로 복사한다. (패스워드를 입력하는 단계를 생략할 필요는 없다.)

* 백업 파일 이름에는 오늘 날짜를 붙여서 복사한다. 예시) `backup_20190724.zip` 

### 3) 타입스크립트 컴파일 요구사항

* 가상 환경에 설치한 리눅스 환경을 서비스를 배포하는 서버라고 가정하고, nodejs 10.x 버전과 npm을 설치한다.

	* 단, 가상 환경에는 타입스트립트 환경을 설치하지 않는다.

	* 리모트 리눅스에 접속해서 `/day7` 디렉토리를 생성하고 쓰기 권한를 설정한다.

* 로컬 컴퓨터에 타입스크립트 컴파일러를 설치한다.

	* 컴파일 해야 하는 타입 스크립트 `baseball.ts`

* 로컬에 타입 스크립트 컴파일러로 `baseball.js` 파일을 만들고, html 파일과 함께 가상 환경으로 scp 명령을 사용해서 복사한다.

* 타입스크립트 컴파일한 js파일과 html 파일을 가상 머신으로 `/day7` 복사하는 쉘 스크립트로 작성한다.

* 리눅스 가상 환경에 접속해서 npm 에서 `local-web-server` 패키지를 설치한다.

* `local-web-server`를 실행하고 `baseball.html`에 접속해서 동작을 확인한다.

## 배경 지식

### Shell 

Shell(쉘, 셸)이란?

- OS와 대화하는 프로그램
- 여러 가지 종류가 있는데 지금은 bash 사용
- 맥 사용자는 zsh를 사용하는 것도 좋다! (oh-my-zsh)

[쉘 관련 읽을거리](https://beomi.github.io/2017/07/07/Beautify-ZSH/)

#### pwd

> 현재 디렉토리를 확인

#### 리눅스 디렉토리들

```bash
/
/home
/boot
/home/ubuntu
/bin
/etc
```

#### ls

> List Directory, 디렉토리의 내용을 보여줌

```bash
ls -l
ls -al
```

`.` 은 현재 디렉토리
`..` 은 현재 디렉토리의 부모 디렉토리를 나타낸다.

#### tree [디렉토리이름] [-L 깊이]

```bash
tree / -L 1
```

#### mkdir

> 새로운 디렉토리 생성

```bash
mkdir project
ls
pwd
cd project
ls
pwd
```

#### cd

디렉토리 변경

```bash
cd
cd ../
cd /
cd /home/ubuntu/project
cd ~
cd ubuntu
cd ./././././././
cd ~/Documents #~은 홈의 약자
```

#### cat 파일이름

> 파일 내용 표시

```bash
echo "Hello, CodeSquad?" > hello.txt
cat hello.txt
```

#### less 파일명

> 긴 파일의 내용을 끊어서 표시

- q: 종료
- g: 처음으로
- G: 끝으로
- /단어: 문서에서 '단어'를 검색
- space, enter, 화살표, hjkl: 페이지 이동

#### history

명령어 이력 표시

```bash
history
!명령어번호
```

#### cp, mv, rm

> 파일 복사, 이동, 삭제

```bash
mkdir dir1
echo "some" > dir1/file.txt
cp dir1/file.txt file2.txt
cp -a dir1 dir2
tree .
mv dir2 dir3
rm -rf dir1
```

#### find 디렉토리 -name "파일이름"

> 지정한 디렉토리와 그 하위디렉토리에서 해당 파일을 검색한다.

#### touch 파일이름

> 0바이트 파일 생성

```bash
touch foo.txt
ls
```

### 쉘 스크립트 

> Environment Variables

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.002.png" width="600px">

> export 설정하기

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.003.png" width="600px">

> 실행하기

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.004.png" width="600px">

> 스크립트 변수

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.005.png" width="600px">

> 리다이렉션 redirection

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.006.png" width="600px">

> 파이프 pipe

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.007.png" width="600px">

> 키보드 입력

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.008.png" width="600px">

> 반복 구문

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.009.png" width="600px">

> 비교 구문

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.010.png" width="600px">

> 문자열 비교, 패턴

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.011.png" width="600px">

> 파일, 디렉토리, 문자열 테스트 test

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.012.png" width="600px">

> 숫자 비교 테스트

<img src="http://public.codesquad.kr/jk/cs23/shellscript/shellscript.013.png" width="600px">

### 타입 스크립트

* 공식 사이트 [링크](https://www.typescriptlang.org)

* 타입 스크립트 설계자 소개 [영상](https://www.youtube.com/watch?v=hDACN-BGvI8)

* 타입 스크립트에 대한 소개글 

	[튜토리얼](https://github.com/JaeYeopHan/typescript_tutorial)	
	
	[블로그](https://velog.io/@dongwon2/TypeScript를-시작하기-전에-이정도는-해줘야지)

## 학습정리

### 피어 컴파일링 체크포인트

```
1. [ ] 가상 환경에 리눅스 설치
2. [ ] ssh 접속 - 로그인 가능 여부
3. [ ] /backup 디렉토리 생성 여부
4. [ ] 백업 자동화 스크립트 - 압축 파일 생성
5. [ ] 백업 자동화 스크립트 - 가상 환경으로 복사
6. [ ] 로컬에 타입스크립 컴파일러 설치
7. [ ] js 컴파일링 및 실행 환경 복사 스크립트
8. [ ] 웹 서버로 html 실행 확인
```

### 스스로 확인할 사항

- 리눅스 역사와 유닉스와 차이를 학습한다.
- 여러 가지 쉘 종류에 대해 학습한다.
- 타입스크립트가 자바스크립트 다른 점에 대해 학습하고, ts 파일과 js 파일을 비교한다.

### 다같이 확인할 사항

- 셀 스크립트에 활용한 다양한 사례에 대해서 조사해보자.
- 타입스크립크를 왜 써야하는지 각자 나름의 이유를 찾아서 비교하고 정리한다.
- babel 도구의 트랜스파일링 동작방식과, 실무에서  babel도구가 어떤목적으로 사용되는지 조사하자.

