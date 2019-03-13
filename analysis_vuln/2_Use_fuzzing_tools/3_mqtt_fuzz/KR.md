# mqtt_fuzz

![1](images/1.png)

이것은 간단한 mqtt 프로토콜을 위한 퍼저이다. 이것은 모든 프로토콜을 구현하지는 않았으나, 녹화된 MQTT 제어 패킷을 보내고 그때마다 fuzzed 제어 패킷을 보낸다.

- 요구사항

  - Radamsa를 필요로 한다(https://gitlab.com/akihe/radamsa). Fuzz 케이스는 Radamsa를 통생 생성되어 사용된다. 해당 mqtt_fuzz는 Radamsa 0.4a 버전을 통해 테스트되었다. 이전 버전은 아마 명령 파라미터가 달라서 동작하지 않을것이다.

  - Python Twisted를 필요로 한다(https://twistedmatrix.com/trac/wiki/Downloads). pip를 통해 설치하거나 url을 통해 설치하면된다.

- 사용

  먼저 테스트 할 MQTT 서버를 선택하세요. address sanitizer와 연결하는 것이 좋습니다. ASan은 만약 타깃이 fuzz 케이스에 의해 corruption이 발생된 경우 반드시 도움을 줄것이다.

  타깃 프로그램이 충돌했을때 stack trace를 얻을수 있으므로 디버거 아래에서 실행되는 것을 제안한다. 또한 GDB 'exploitable' (https://github.com/jfoote/exploitable)명령을 통해 필요한것을 걱정하는 시간을 빠르게 할수있다.

  mqtt_fuzz 사용 명령은 다음과 같다.

  ``` bash
  python mqtt_fuzz.py --help
  ```

  mqtt_fuzz는 순서대로 미리 선언된 MQTT 제어 패킷의 시리즈를 보낸다. 순서는 변경할 수 있고 확장 할 수 있다.

  또한 얼마나 빠르게 fuzz 케이스를 보낼지도 정할 수있다. 너무 많은 fuzzed 패킷을 보내면 테스트의 효과가 감소할 것이다. 예를 들면, 만약 모든 CONNECT 패킷이 모두 fuzzed 되어 있다면, CONNECT 이후의 상태를 얻을수 없게 될것이다.

  해당 도구는 서버가 새 연결에 응답하지 않을 때까지 실행된다.

  => 퍼징하다가 서버가 죽어서 멈추면 실행 또한 멈춤

  > 실행중 서버를 중단시키니 해당 도구 또한 멈추는 것을 확인

  각 제어 패킷 순서('session')는 특별 UUID 태그와 모든 메시지들은 타임스탬프가 찍혀 출력된다. 대상 및 fuzzer 호스트의 시간이 동기화되었는지 확인하고 타임 스탬프를 사용하여 문제를 일으킨 메시지를 찾을 수 있다. 과정은 다음과 같다.

  1. 충돌을 감지하고 UNIX epoch timestamp를 얻는다.(기본적으로 gdb에 표시)
  2. 해당 타임스탬프가 있는 fuzzer의 출력 로그에서 모든 행을 선택한다.
  3. 해당 행에 나열된 모든 세션 UUID들을 알아낸다.
  4. 이 UUID 중 하나를 가진 fuzzer의 출력 로그에서 모든 행을 추출한다.
  5. 이제 순서대로 보내진 모든 제어 메시지들을 가지게 된다.

  만약 자동화에서 fuzzer를 실행하면 분석단계를 자동화하는 것이 좋을것이다.

  보내진 제어 메시지는 base64 인코딩을 사용하여 로그에 남는다. MQTT의 wire protocol은 binary이다; base64는 문제를 일으킬 가능성이 적은 형식으로 제어 메시지를 복사, 붙여넣기 할 수 있게 사용된다.

  충돌을 일으킨 한 일련의 제어 메시지를 찾으면 로그에서 모든 제어 메시지를 추출하여 reprotool.py에 넣을 수 있다. 해당 도구는 해당 메시지를 호스트로 보낸다. reprotool.py 통해 수와 순서를 수정하여 충돌을 재현할 수 있다. 충돌을 유발하는 최소 세트가 있으면 MQTT 서버 개발자에게 개념 검증하기에 도움이 될것이다.

- 확장

  mqtt_fuzz는 MQTT server의 클라이언트 역할을 통해 테스트합니다.

  기본 설치된 제어 패킷은 다음과 같다.

  CONNECT

  CONNACK

  PUBLISH

  PUBACK

  SUBSCRIBE

  PUBCOMP

  PUBREL

  PUBREC

  DISCONNECT

  특별하게, 포함되지 않은 제어 패킷은 다음과 같다.

  UNSUBSCRIBE

  UNSUBACK

  PINGREQ

  PINGRESP

  SUBACK

  몇몇 빠진 패킷은 서버에서 클라이언트로 가는 패킷이다, 그래서 포함시키지 않았다. 그러나, 퍼징을 위해서는 테스트 중에 서버로 보내야한다.

  응용 프로그램은 상위 프로토콜 계층에서 데이터를 처리 할 수도 있다. 해당 코드는 일반적으로 퍼징 테스트에 도움이된다. 유효한 MQTT를 사용하고 더 높은 레벨의 프로토콜을 사용하는 것이 바람직하지만, mqtt_fuzz는 상위 레벨 프로토콜 데이터를 전달하는 새로운 제어 패킷을 추가하여 여기에 사용할 수 있다. 이 경우 더 긴 fuzz 테스트가 필요할 것이다.

  mqtt_fuzz/valid-cases 아래 새로운 디렉토리를 생성하고 디렉토리 안에 가능한 제어 패킷의 예제를 넣어 간단하게 새로운 제어 패킷을 추가할 수 있다. 예를 들면, 와이어 샤크로 트래픽을 스니핑하고 원시 MQTT 프로토콜 계층 데이터를 해당 디렉토리의 파일로 추출하여 예제를 얻을 수 있다. 또한 실레조 제어 패킷을 사용하기 위해서는 session_structures 목록에 새로운 새션을 추가할 필요가 있다.

  예를 들어, PUBLISH 메시지 내에 사용자의 페이로드가 있는 새 제어 패킷을 추가하고, 메시지를 전달하기를 원한다면, valid-cases/publish-with-payload 디렉토리를 만들고, 유효한 케이스의 raw 예제를 이 디렉토리에 복사하고(최소 1에서 추가적으로 약 15), session_structures에 follwing list를 추가 시키면된다.

  ``` bash
  ['connect', 'publish-with-payload', 'disconnect']
  ```

  이제 새로운 제어 패킷이 추가 되었다. 자동으로 Fuzz 케이스가 생성될 것이다.

- 설치

  - 사전 설치

    ``` bash
    sudo apt install python-pip git curl gcc make -y
    ```

    radamsa 설치

    ``` bash
    git clone https://gitlab.com/akihe/radamsa.git
    cd radamsa
    sudo make
    radamsa		# check radamsa installation
    ```

    python Twisted 설치

    > 이벤트 기반 python 라이브러리이다.

    ``` bash
    pip install Twisted
    ```

  - mqtt_fuzz 설치

    ``` bash
    cd ..
    git clone https://github.com/F-Secure/mqtt_fuzz.git
    cd mqtt_fuzz
    python mqtt_fuzz --help		# check mqtt_fuzz installation
    ```

- 사용

  ``` bash
  python mqtt_fuzz.py [IP] [Port] [Options....]
  ```

  형식은 위와 같은 형식을 따른다. 아래는 실제 사용되는 에제 명령구이다.

  ``` bash
  python mqtt_fuzz.py localhost 1883 -ratio 3 -delay 100
  ```

  해당 파라미터의 의미는 localhost(127.0.0.1):1883 으로 모든 패킷을 fuzz하여 100ms 만큼 지연시켜 보낸다는 의미이다.

  - 옵션

    파라미터 옵션은 다음과 같이 존재한다.

    | 옵션        | 설명                                          |
    | ----------- | --------------------------------------------- |
    | -h          | 도움말                                        |
    | -ratio      | 10 패킷 당 퍼징율(0: not fuzz / 10: all fuzz) |
    | -delay      | ms 단위의 지연(기본 50ms)                     |
    | -validcases | valid-case 디렉토리 지정(기본은 valid-cases/) |
    | -fuzzer     | 퍼저 지정(기본은 radamsa)                     |


