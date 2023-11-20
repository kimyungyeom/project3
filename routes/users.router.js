// Express모듈 가져오기
const express = require("express");
// Express모듈에서 라우터 가져오기
const router = express.Router();
// 인증 middleware 가져오기
const authMiddleware = require("../middlewares/need-signin.middleware.js");

// 내 정보 조회 API
router.get("/user/me", authMiddleware, (req, res) => {
    // 비밀번호를 제외한 내 정보 받아오기
    const { userId, email, nickname, createdAt, updatedAt } = res.locals.user

    // 비밀번호를 제외한 내 정보를 반환
    return res.status(200).json({
        success: true,
        message: "내 정보 조회가 완료되었습니다.",
        user: { userId,  email, nickname, createdAt, updatedAt }
    });
});

// router 모듈 내보내기
module.exports = router;