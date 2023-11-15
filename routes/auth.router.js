// Express모듈 가져오기
const express = require("express");
// Express모듈에서 라우터 가져오기
const router = express.Router();

// jwt모듈 가져오기
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const { User } = require("../models");

// 로그인 API
const secretKey = process.env.Secret_key;

router.post("/auth", async (req, res) => {
    // 이메일, 비밀번호를 데이터로 넘겨받음
    const { email, password } = req.body;
  
    // 해당 이메일을 가진 유저를 데이터베이스에서 찾는다.
    const user = await User.findOne({
         where: {
             email,
         },
    });

    // 유저 존재 유무와 비밀번호 서로 일치여부 확인
    if (!user || password !== user.password) {
      res.status(400).send({
         errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
      });
      return;
    }
  
    // 로그인 성공 시 JWT AccessToken을 생성
    const accessToken = jwt.sign(
        // userId를 담고 있는 Payload
        { userId: user.userId },
        secretKey,
        // Token 유효기한 12시간 설정
        { expiresIn: new Date().getHours() + 12}
    );
    
    // 생성한 Token 반환
    res.status(200).send({
        token: accessToken
    });
});

// router 모듈 내보내기
module.exports = router;