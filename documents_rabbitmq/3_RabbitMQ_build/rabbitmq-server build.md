# rabbitmq-server build

- 빌드 환경

  ubuntu 18.04 LTS

  2gb

  Disk 20gb

  bridge network

- 빌드하기 전에 필요한 것들

  - erlang

  - Elixir

  - GNU make

  - xsltproc of libxlt

    > 의존성으로 인해 500M 넘음

  - xmlto

  - zip, unzip

- 설치

  - erlang 설치

    ```bash
    wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
    sudo apt install update
    ```

  - 나머지 필요 요소 설치

    ```bash
    sudo apt install erlang elixir make xsltproc xmlto curl -y
    ```

  - 빌드

    ``` bash
    cd rabbitmq-server
    sudo make
    ```

    - 추가적인 빌드 옵션

      - all - 모두 빌드

      - shell - 클라이언트 라이브러리와 시작시 라이브러리가 로드된 erlang 쉘 빌드
      - clean - 빌드 과정의 모든 임시 파일 제거

      - distclean - 의존성을 포함하여 빌드된 것 모두 제거

      - test - 테스트 셋 실행

      - run-broker - 서버를 빌드하고 상호작용 가능한 erlang 쉘을 시작한다. 이것은 기본 데이터를 입력하고, /tmp/rabbitmq-test-instances의 Mnesia database를 포함한다. 해당 위치는 make run-broker TEST_TMPDIR=/some/other/location/for/rabbitmq-test-instances 명령을 사용하면 됨

        erlang 노드 이름을 변경하려면  make run-broker RABBITMQ_NODENAME=rmq을 사용

        (여기와 관련된 것은 scripts/rabbitmq-env 참조)