# project3
Sequelize을 이용한 상품 마이그레이션 코드 및 스키마 코드 작성부분에서 어려움을 느껴 상품 관련 기능들을 완성하지 못했습니다.  


# API 명세서
https://docs.google.com/spreadsheets/d/1XXmvFdjoQmYAYid6rfMbZ6DDWGqiRKFUyfunnnqHtDU/edit#gid=0

# ERD
https://www.erdcloud.com/d/prefszpPww6y9a9nj

# 환경 변수
Server_port
MYSQL_USERNAME  
MYSQL_PASSWORD  
MYSQL_DATABASE  
MYSQL_HOST  
Secret_key

# 암호화 방식
1. 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?  
: Hash는 입력한 데이터를 고정된 길이의 문자열로 변환시켜서 저장하는 암호화 방식으로 일방향성을 갖기 때문에 해시 값으로부터 Key를 역산할 수 없어  단방향 암호화에 해당 됩니다.

2. 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?  
: 원본 비밀번호를 Hash화 했기 때문에 데이터베이스가 노출이 되더라도 사용자의 원본 비밀번호를 알 수 없어서 해킹을 방지하여 데이터 유출을 방지할 수 있습니다.

# 인증 방식
1. JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?  
: Access Token이 노출이 되면 누구나 해당 토큰을 가지고 인증을 시도할 수 있고 토큰을 변조하여 권한을 탈취할 수도 있습니다.

2. 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?  
: Access Token의 유효 기간을 짧게 유지를 하며, Refresh Token과 함께 사용하여서 주기적으로 새로운 Access Token이 발급되도록 해야합니다.

# 인증과 인가  
1. 인증과 인가가 무엇인지 각각 설명해 주세요.
: 인증(Authentication)이란 사용자의 신원을 증명하는 것. 즉, 로그인하는 과정이 예시이며 로그인을 하게 되면 JWT나 Session을 이용해 인증을 유지하게 됩니다.  
인가(Authorization)이란 특정 리소스에 접근할 수 있는 권한을 부여하는 것. 즉, 사용자 등급에 따라 리소스에 접근을 제한하는 경우가 예시이며 JWT나 Session을 이용해 인증을 확인하고 서버가 해당 권한을 확인해서 리소스 접근 허용을 결정하게 됩니다.

2. 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.  
: 로그인을 통해서 JWT AccessToken을 생성을 했고 생성한 token을 통해서 검증 및 사용자를 확인하는 미들웨어이기 때문에 인증에 해당된다고 생각합니다.

# Http Status Code
1. 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.  
200 : 요청이 성공적으로 완료된 것을 의미하고 정보는 요청에 따른 응답으로 반환합니다. 생성한 Token을 반환했거나 내 정보 조회를 반환할 때 사용했습니다.  
201 : 요청이 성공적으로 완료됬으며 새로운 리소스를 생성하는 것을 의미합니다. 회원가입 성공 시 유저를 생성할 때나 POST 메서드를 통해 새로운 리소스를 생성할 때 사용했습니다.    
401 : 미승인. 즉, 인증에 필요한 정보들을 유효하지 않는 값을 제공할때 서버가 응답하지 않는 것을 의미합니다. 회원가입 및 로그인시 형식에 맞지 않는 값을 넣었을 때 사용하였습니다.  
409 : 요청이 서버의 현재 상태와 충돌이 발생했을 때를 의미합니다. 이메일이나 닉네임 중복으로 이용할 경우 사용하였습니다.

# 리팩토링
1. MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?  
: 상품 스키마부분에서 mongoDB를 통해 데이터가 입력되었는데 Sequelize로 변경하면서 코드 문법을 변경해야 했습니다. ex) type부분에서 DataTypes을 붙이는 등
2. 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.  
: 코드 구조를 가능하면 특정 데이터베이스에 의존하지 않도록 사용하고 데이터베이스 연결이나 모델 정의하는 부분 등에서 설정을 분리하여 보다 쉽게 수정이 가능하여 이 방식을 이용하면 좋다고 생각합니다.

# 서버 장애 복구
1. 현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다. 만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다. AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요?  
: 찾아본 결과 PM2는 오토 리스타트 기능을 가지고 있어서 이것을 활용하면 조치할 수 있습니다.  
 pm2 startup - 오토 리스타트 활성화  
  pm2 save - 현재 실행 중인 PM2프로세스 목록을 저장 
