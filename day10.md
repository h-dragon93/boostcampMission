# Day10 VMGit

## 왜 필요한가?
DVCS 분산 저장소 방식 중에서 git 방식은 가장 많이 사용하는 방식이다. 
git 명령의 동작 방식을 이해하고, 기본 명령의 동작을 그대로 구현해보는 것이 효과적인 학습 방법이다. 

## 학습 목표
- DVCS 분산 저장소 방식에 대해 학습하고, 기본 동작을 구현하는 것이 목표다.
- 첫 단계로 저장소를 init 하고 checkout으로 저장소를 이동하는 과정을 구현한다.
- 파일을 생성하고, 추가하고, 커밋하는 흐름을 작성한다. 이 때 실제 파일을 생성하지는 않고 가상으로 동작을 구현한다. 
- 로컬에 커밋한 내용을 remote에 반영하는 흐름을 구현한다.
- 여러번 커밋한 내용을 한꺼번에 push하면, remote 마지막 커밋과 비교해서 이후 커밋만 반영한다.


## 미션

* File, Commit, Repository, Local, Remote 주요 기능을 담당하도록 module을 나누거나 class로 구분해서 작업한다.

	* 입/출력을 위한 모듈 외에 모든 기능은 바닐라 자바스크립트로 구현한다.

* 가상으로 git 동작을 확인하는 프로그램을 작성한다.

* vmgit을 시작하면 셀 프롬프트와 비슷하게 명령을 입력받는다.

### 1) init 요구사항

* `init <repository_name>` 명령을 사용하면 local 영역에 `<repository_name>` 이름으로 저장소 공간을 생성한다. 

* `status local <repository_name>` 명령을 사용하면 local에 있는 `<repository_name>` 저장소 내부 파일 상태를 출력한다. 
  * 만약 입력한 저장소 이름이 없으면 전체 저장소 목록을 출력한다.

* `checkout <repository_name>` 명령을 사용하면 해당 저장소를 선택한 것을 표시하기 위해서 프롬프트 뒤에 `<repository_name>` 저장소 이름을 붙여서 출력한다. 
  * 만약 입력한 저장소 이름이 없으면 아무런 저장소를 선택하지 않은 상태로 초기 상태와 동일하게 표시한다. 

### 예상 출력 화면 

```
/>init hello
created hello repository.

/>status
hello/

/>checkout hello
/hello/>checkout

/>quit
```

### 2) checkout 요구사항

* checkout으로 저장소 선택한 후에 `new <file_name>` 명령을 사용하면 해당 working directory에 파일을 생성한 것으로 기록한다. 처음 생성한 파일 상태는 Untracked 상태로 표시한다. 

* checkout 이후에 `status` 명령을 사용하면 Working directory / Staging Area / Git Repository 영역에 있는 파일 목록을 변경시간과 함께 출력한다. 
  * 만약 저장소를 선택한 상태가 아니면 `status local` 처럼 동작한다.

* `add <file_name>` 명령을 사용하면 생성한 파일을 staging area로 이동했다고 가정하고 Staged 상태로 표시한다.

* `commit <commit_log>` 명령을 사용하면 staging area에 있는 모든 파일을 git repository에 등록한다. 커밋된 파일들을 커밋 시간과 함께 Unmodified 상태로 표시한다.

### 예상 출력 화면 

```
/>init hello
created hello repository.

/>status
hello/

/>checkout hello
/hello/>new readme

hello/>status
---Working Directory/
readme	2019-03-26 09:28:05
---Staging Area/
---Git Repository/

hello/>add readme
---Staging Area/
readme	2019-03-26 09:29:25/

hello/>commit make readme file
---commit files/
readme	2019-03-26 09:29:25

hello/>
```

### 3) touch, log 요구사항

* checkout으로 선택한 저장소에서 이미 커밋한 파일에 대해 `touch <file_name>` 명령을 사용하면 파일 상태는 Modified 상태로 표시하고 Working Directory 목록에 표시한다.

* `log` 명령을 사용하면 커밋 로그를 함께 커밋한 파일들 목록을 표시한다.


### 예상 출력 화면 

```
/>status
hello/

/>checkout hello
/hello/>touch readme

hello/>add readme
---Staging Area/
readme	2019-03-27 12:11:01

hello/>commit modified file
---commit files/
readme	2019-03-27 12:11:01

hello/>log
commit "make readme file"
readme	2019-03-25 09:29:25
commit "modified file"
readme	2019-03-27 12:11:01

hello/>
```

### 4) push 요구사항

* `push` 명령을 사용하면 마지막까지 local에서 commit 한 이력과 Git Repository 파일을 모두 remote로 복사한다.

* `status remote <repository_name>` 명령을 사용하면 remote에 있는 `<repository_name>` 저장소 내부 파일 목록을 출력한다. 
  * 만약 저장소 이름이 없으면 해당 저장소가 없다고 출력한다.

* vmgit 프로그램을 종료하고 다시 시작하면, remote 저장소에 있는 내용은 유지되도록 저장한다. 파일로 저장하기 위해서 적당한 npm 패키지를 찾아서 구현해도 된다.

### 예상 출력 화면 

```
hello/>push
push some commits...
commit "make readme file" pushed
commit "modified file" pushed

hello/>status remote hello
last commit "modified file"
readme	2019-03-27 12:11:01

hello/>checkout

/>status remote
hello/

/>quit
```


----

## 배경 지식

### VCS 버전관리 시스템

소스코드를 관리하는 시스템은 크게 3종류로 나눌 수 있다.
버전관리 시스템 종류를 학습하고, 차이점을 비교해본다. 

	* VCS 로컬 방식 : RCS, SCCS
	
	* CVCS 중앙 서버 방식 : Subversion(SVN), CVS, Perforce, ClearCase, TFS
	
	* DVCS 분산 저장소 방식 : Git, Mercurial, Bitkeeper, SVK, Darcs

### git 

- git 에서 사용하는 기본적인 용어들을 학습하고 정리한다.
- git 명령을 이용해서 저장소 관리하는 방식을 학습하고 정리한다.
- 변경 사항을 추가,수정,삭제하는 방식에 대해 학습하고 정리한다.

> 참고자료 
> 
> `http://rogerdudler.github.io/git-guide/index.ko.html`

### 용어

다음과 같은 git 관련 용어를 학습하고 의미가 무엇인지, 어떤 동작을 해야 하는지 정리한다.

> 저장소 관련

| 용어 | 의미 |
|---|---|
| remote | _ |
| local | _ |
| init | _  |
| clone | _ |

> 상태 관리

| 용어 | 의미 |
|---|---|
| git repository | _ |
| staging area | _ |
| working directory | _ |

> 파일 관련

| 용어 | 의미 |
|---|---|
| Untracked | _ |
| Unmodified | _ |
| Modified | _ |
| Staged | _ |

### 파일 상태변화

Pro Git2 에 나오는 파일 상태 변화 그림

![](https://git-scm.com/book/en/v2/images/lifecycle.png)

* 동작에 따른 파일 상태 변화에 대해 학습한다.
[참고 링크](https://git-scm.com/book/ko/v2/Git의-기초-수정하고-저장소에-저장하기)

## 학습정리

### 피어 컴파일링 체크포인트

```
	1. [ ] init 명령으로 local 영역에 저장소 생성
	2. [ ] status 명령으로 저장소 목록 확인
	3. [ ] checkout 명령으로 저장소 선택
	4. [ ] new 명령으로 untracked 파일 생성
	5. [ ] 저장소 선택 이후 status 명령으로 파일 목록 확인
	6. [ ] add 명령으로 stage 영역으로 파일 옮기기
	7. [ ] commit 명령으로 저장 공간에 여러 파일 옮기기
	8. [ ] touch 명령으로 저장 공간에 있는 파일 수정
	9. [ ] log 명령으로 커밋 목록 확인
	10. [ ] push 명령으로 local 커밋 목록을 remote로 복사
	11. [ ] status remote 명령으로 remote 저장소 / 파일 목록 확인
	12. [ ] remote 저장소 데이터 파일 저장
	13. [ ] 명령/상태에 대한 안전한 예외 처리 (멈추지 않고 동작하기)
```

### 스스로 확인할 사항

- 실제 git 명령어와 구현한 명령 동작 차이점에 대해 정리한다.

### 다같이 확인할 사항

- clone 명령을 구현하려면 어떻게 구현해야 할까?
- branch 개념을 추가하려면 어떤 구조로 어떻게 구현해야 할까?
- pull 명령을 구현하려며 어떤 구조로 어떻게 구현해야 할까?
