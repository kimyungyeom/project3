// Express모듈 가져오기
const express = require("express");
// Express모듈에서 라우터 가져오기
const router = express.Router();
// 인증 middleware 가져오기
const authMiddleware = require("../middlewares/need-signin.middleware");

// 내 정보 조회 API
router.get("/user/me", authMiddleware, (req, res) => {
    const { email, nickname } = res.locals.user;

    // 비밀번호를 제외한 내 정보를 반환
    return res.status(200).json({
        user : { email, nickname }
    });
});

// router 모듈 내보내기
module.exports = router;