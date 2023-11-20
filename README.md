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
