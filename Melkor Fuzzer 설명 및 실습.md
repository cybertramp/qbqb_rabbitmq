

# Melkor Fuzzer

- 하나의 ELF 파일 포맷 fuzzer



## ELF 파일 포맷

- 실행 가능하고 링크 가능한 포맷
- 1999년에 x86 기반 Unix 및 Unix 계열 시스템의 표준 바이너리 파일 형식으로 채택됨
- 많은 다른 플랫폼의 많은 OS에 의해 채택되어짐
- 실행 파일, 재배치 가능 객체(.o), 공유 라이브러리(.so) 및 코어 덤프



## ELF 퍼징

- Fuzz testing
  - 사람의 눈에 의해 종종 놓칠 수 있는 버그에 대한  무효 / 반 유효 데이터 생성을 위한 자동화된 접근법
    - 데이터가 너무 무효할 경우 신속히 거부됨



## Fuzzing options

![1551900773591](C:\Users\Po_Gang\AppData\Roaming\Typora\typora-user-images\1551900773591.png)



## Melkor fuzzer를 이용한 간단한 테스트

1. 간단한 테스트를 위해 BOF에 취약 코드 작성

   ![1551900973220](C:\Users\Po_Gang\AppData\Roaming\Typora\typora-user-images\1551900973220.png) 



2. Fuzzing option을 이용한 테스트 준비

- ./melkor -a test -n 1337
  - ELF 파일에 대해 Autodetect 모드로 1337번의 퍼징을 의도한 명령어

![1551901206136](C:\Users\Po_Gang\AppData\Roaming\Typora\typora-user-images\1551901206136.png)



- 명령어 실행 시 다음과 같음 실행 화면을 볼 수 있음
  - 아무 키를 입력시 fuzzing process가 실행됨 (fuzzing은 rule에 의해 실행되는데 이것은 word로 정리)



3. Fuzzing 

![1551904181620](C:\Users\Po_Gang\AppData\Roaming\Typora\typora-user-images\1551904181620.png)



4. md5sum 명령어 실행을 통한 체크섬 확인

- md5 sum orcs_test/orc_* | head -15 명령어를 입력하면 현재 명령어를 실행한 디렉토리에서 orc__*로 시작하는 모든 파일의 md5 체크섬을 계산하여 화면에 출력함
  - 아래 화면은 md5 체크섬을 계산하여 화면에 출력한 것임. 

![1551904514345](C:\Users\Po_Gang\AppData\Roaming\Typora\typora-user-images\1551904514345.png)

- 1337번의 테스트를 거쳤기 때문에 orc_1337까지 존재



5. readelf 명령어를 통해  ELF 파일의 정보 확인

- readelf
  - BFD(Binary Descriptor Library) 라이브러리를 이용하지 않고 직접 ELF를 읽기 위한 툴
  - readelf를 사용하는 이유
    - BFD를 경우하지 않고 ELF 파일을 읽어내므로 objdump보다 상세한 정보를 얻을 수 있기 때문임
  - 옵션
    - ELF 헤더 출력 및 ELF 정보 출력



| 헤더 종류      | 옵션 | 긴 옵션                       |
| -------------- | ---- | ----------------------------- |
| ELF 파일 헤더  | -h   | --file-header                 |
| 프로그램 헤더  | -l   | --program-headers, --segments |
| 섹션 헤더      | -S   | --section-headers, --section  |
| 위 세가지 헤더 | -e   | --headers                     |





| 정보 종류                      | 옵션 | 긴 옵션           |
| ------------------------------ | ---- | ----------------- |
| 심볼 테이블                    | -s   | --syms, --symbols |
| 재배치 정보                    | -r   | --relocs          |
| 동적 세그먼트                  | -d   | --dynamic         |
| 버전 섹션                      | -V   | --version-info    |
| 아키텍쳐 의존 정보             | -A   | --arch-specific   |
| 버킷 리스트의 길이 히스토 그램 | -I   | --histogram       |
| 모든 헤더 및 정보              | -a   | --all             |
| 코어 노트                      | -n   | --notes           |
| unwind 정보                    | -u   | --unwind          |



- 일반적으로 심볼 정보는 심볼 섹션에 있는 심볼 정보를 이용
  - -D 옵션(--use-dynamic 옵션)을 사용하면 동적 섹션에 있는 심볼 정보를 이용하게됨



![1551905733610](C:\Users\Po_Gang\AppData\Roaming\Typora\typora-user-images\1551905733610.png)





위의 실행화면을 통해 현재 세그먼트의 파일 크기가 메모리 사이즈보다 큰 에러가 발생한 것을 확인 가능



















