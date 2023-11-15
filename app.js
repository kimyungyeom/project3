// Express 모듈 가져오기
const express = require("express");
// Express 애플리케이션 생성 / express() 함수 호출
const app = express();
// 포트 번호 env 불러오기
require('dotenv').config();
const port = process.env.Server_port;
// cookie-parser 모듈 가져오기
const cookieParser = require("cookie-parser");
// products.router.js 가져오기
const productsRouter = require("./routes/products.router.js");
// users.router.js 가져오기
const usersRouter = require("./routes/users.router.js");
// auth.router.js 가져오기
const authRouter = require("./routes/auth.router.js");
// schemas 모듈들 가져오기
const connect = require("./mongo/index.js");
connect();

// JSON 미들웨어 사용
app.use(express.json());
// form-urlencoded 라는 규격의 body 데이터를 손쉽게 코드에서 사용할 수 있는 미들웨어 사용
app.use(express.urlencoded({ extended: false }));
// cookieParser 미들웨어 사용
app.use(cookieParser());
// 위에서 가져온 라우터 미들웨어 사용
app.use("/api", [productsRouter, usersRouter, authRouter]);

// 서버 구동
app.listen(port, () => {
    console.log("서버 구동을 시작합니다.");
})