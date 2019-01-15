# git manual 
- 최초 설정
```
git config --global user.name "로그인아이디"
git config --global user.email "가입한 이메일"

```
- 작업 폴더 설정
```
cd <작업폴더>
git init
```

- 브런치 생성
```
git checkout -b <브런치 명>
```

- 생성된 브런치및 현재 브런치 확인
```
git branch
```
- 당겨오기
git pull <git@.....>
```

- 업로드할 파일 추가
```
git add .
```

- 커밋
```
git commit -m "커밋 내용"
```

- 원격 저장소 위치 등록
```
git remote add origin <자신의 repo 위치 git@....>
```

- repo로 repo 업로드
```
git push -u origin <브런치>
```
