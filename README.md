# 와인 시커 백엔드
와인 시커의 백엔드 입니다. express.js 기반의 REST API 서버이며, prisma orm을 사용하였고 esm을 사용한 js로 컴파일 되는 타입스크립트로 작성하였습니다.

## 요구 사항
이 앱을 실행하려면 컴퓨터에 node.js 20 버전이 설치되어야 합니다. 이 외의 버전은 정상 작동을 장담할 수 없으며, 실제로 이 앱은 node.js 18 이하 버전에 서 오작동 합니다.

## 개발 환경 셋팅 방법
1. node.js 20 버전을 설치합니다. 권장하는 방법은 nvs(윈도우 환경에서 권장), nvm(맥, 리눅스 등에서 권장) 등의 버전 관리자를 사용하는 것입니다. node.js 20 버전이 설치되어있으면 이를 생략합니다.
2. IDE 혹은 에디터를 설치합니다. 권장하는 에디터는 젯브레인즈 사의 PhpStorm(익스프레스.js를 포함하여 node.js도 지원합니다.) 이며 mju.ac.kr 메일을 통해 학생 라이선스를 발급 받을 수 있습니다. VS Code를 써도 상관이 없으나, 편의성 면에서는 PhpStorm이 우위입니다. 참고로 웹스톰의 경우 데이터베이스 관리 등 백엔드 관련 기능을 기본적으로 지원하지 않으며, 유료 플러그인 설치가 필요합니다.
3. 다음과 같은 커멘드를 사용하여 의존성을 설치합니다.
    ```
    npm install
    ```
4. ```.env.sample``` 파일을 ```.env``` 파일로 복사하세요. 그 다음 데이터베이스 URL에 적절한 값을 작성합니다. 데이터베이스 URL 작성방식은 아래와 같으며 포트는 기본적인 MySQL 설치 환경에서는 3306 포트입니다. HOST 란은 로컬에 있는 DB 사용시 localhost 입니다.
   ```
   mysql://USER:PASSWORD@HOST:PORT/DATABASE
   ```
5. 다음 명령어로 프리즈마 마이그레이트를 실행합니다. 이 명령어는 개발 환경 전용 명령어로 프로덕션에서 실행하면 안됩니다.
   ```
   npx prisma migrate dev
   ```
6. 프리즈마 제너레이트 명령어를 실행합니다.
   ```
   npx prisma generate
   ```
7. 아래와 같은 명령어로 개발 서버를 실행합니다.
   ```
   npm run dev
   ```
## 유의 사항
### 데이터베이스 스키마를 바꾸실 시
데이터베이스 스키마는 ```schema.prisma``` 파일에 정의되어 있습니다. 프리즈마 스키마에 대한 정보는 https://www.prisma.io/docs/orm/prisma-schema/overview 에서 보실 수 있습니다. 데이터타입에 대한 정보는 https://www.prisma.io/docs/orm/prisma-schema/data-model/models#native-types-mapping 에서 확인 가능합니다.

데이터베이스 스키마를 바꾸신 다음 반드시 ```npx prisma migrate dev```를 실행해야 하며, ```npx prisma migrate dev```를 실행한 다음 지체없이 prisma 폴더를 커밋하셔야 합니다.
### ```swagger-output.json``` 파일 임의 수정 금지
```swagger-output.json``` 파일은 swagger-autogen에서 생성하는 파일로 API 정의가 자동으로 생성됩니다. 수정할 부분이 있을 경우 swagger-autogen에서 정하는 대로 API 정의가 수정되도록 해야합니다. ```swagger-output.json``` 파일에 출력되는 내용을 바꾸고 싶다면 https://swagger-autogen.github.io/docs 를 참고하세요.