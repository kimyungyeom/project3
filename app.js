// Express 모듈 가져오기
const express = require("express");
// Express 애플리케이션 생성 / express() 함수 호출
const app = express();
// 포트 번호 설정
const port = 3000;

// 서버 구동
app.listen(port, () => {
    console.log(port, "포트로 서버 구동을 시작합니다.");
})

// 서버 구동이 완료됬는지 확인용
// app.get('/', (req, res) => {
//     res.send("서버 구동 완료.");
// })