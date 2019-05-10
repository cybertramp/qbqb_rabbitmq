# git manual 

## 1. Command
- 최초 설정
```bash
git config --global user.name "로그인아이디"
git config --global user.email "가입한 이메일"
```
- 작업 폴더 설정
```bash
cd <작업폴더>
git init
```

- 브런치 생성
```bash
git checkout -b <브런치 명>
```

- 생성된 브런치및 현재 브런치 확인
```bash
git branch
```
- 당겨오기
```bash
git pull <git@.....>
```

- 업로드할 파일 추가
```bash
git add .
```

- 커밋
```bash
git commit -m "커밋 내용"
```

- 원격 저장소 위치 등록
```bash
git remote add origin <자신의 repo 위치 git@....>
```

- repo로 repo 업로드
```bash
git push -u origin <브런치>
```

- git remote branch 삭제
```bash
git push origin --delete <브런치 명>
```


## 2. branch

브런치는 생성하면 다음과 같은 구조가 된다.
origin - master - 브런치한것