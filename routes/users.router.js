// Express모듈 가져오기
const express = require("express");
// Express모듈에서 라우터 가져오기
const router = express.Router();
// bcrypt모듈 가져오기
const bcrypt = require("bcrypt");
// jwt모듈 가져오기
const jwt = require("jsonwebtoken");
// 인증 middleware 가져오기
const authMiddleware = require("../middlewares/need-signin.middleware");

const { Op } = require("sequelize");
const { User } = require("../models");

// 회원가입 API
router.post("/users", async (req, res) => {
    // 이메일, 닉네임, 비밀번호, 비밀번호확인을 데이터로 넘겨받음
    const { email, nickname, password, confirmPassword } = req.body;

    // 빈 곳 여부 체크
    if (!email || !nickname || !password || !confirmPassword) {
        res.status(400).send({
            errorMessage: "입력란 중 비어있는 곳이 있습니다.",
         });
        return;
    }

    // 비밀번호 최소 6자 이상 및 서로 일치 여부 확인
    if (password.length < 6 || password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "비밀번호 최소 6자 이상이어야 하며, 비밀번호가 서로 일치해야 합니다.",
        });
        return;
    }

    // 이메일 형식 체크
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRegex.test(email)) {
        res.status(400).send({
            errorMessage: "올바른 이메일 형식이 아닙니다.",
        })
        return;
    }

    // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findAll({
        where: {
            [Op.or]: [{ email }, { nickname }],
        },
    });
    if (existsUsers.length) {
        res.status(400).send({
            errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
        });
        return;
    }

    // 비밀번호 hash화 시키기
    const hashingPassword = bcrypt.hash(password, 10);
  
    // 이메일, 닉네임, 해시화한 비밀번호를 저장하고 회원가입 성공 시, 비밀번호를 제외 한 사용자 정보 반환.
    await User.create({ email, nickname, hashingPassword });
    res.status(201).send({ email, nickname });
});

// 내 정보 조회 API
router.get("/user/me", authMiddleware, (req, res) => {
    const { email, nickname } = res.locals.user;

    // 비밀번호를 제외한 내 정보를 반환
    res.status(200).json({
        user : { email, nickname }
    });
});

// router 모듈 내보내기
module.exports = router;