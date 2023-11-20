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
: Hash는 입력한 데이터를 고정된 길이의 문자열로 변환시켜서 저장하는 암호화 방식으로 일방향성을 갖기 때문에 해시 값으로부터 Key를 역산할 수 없어  단방향 암호화에 해당된다.

2. 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
: 원본 비밀번호를 Hash화 했기 때문에 데이터베이스가 노출이 되더라도 사용자의 원본 비밀번호를 알 수 없어서 해킹을 방지하여 데이터 유출을 방지할 수 있다.

# 인증 방식
