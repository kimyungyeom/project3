// Express모듈 가져오기
const express = require('express');
// Express모듈에서 라우터 가져오기
const router = express.Router();
// 인증 middleware 가져오기
const authMiddleware = require("../middlewares/need-signin.middleware");

// 상품 생성 API
// products.schema.js 가져오기
const products = require("../models/products.schema.js");

router.post("/products", authMiddleware, async (req, res) => {
    // 상품명, 작성내용을 req.body로 전달 받기
    const { productsName, contentWriting } = req.body;

    // 입력받은 데이터 및 기존 데이터를 이용해 생성한 값을 할당
    const createdProducts = await products.create(productsName, contentWriting);
    
    return res.status(201).json({
        success: true,
        message: "상품이 생성되었습니다.",
        data: createdProducts });
});

// 상품 목록 조회 API
router.get("/products", async (req, res) => {
   
});

// 상품 상세 조회 API
router.get("/products/:productsName", async (req, res) => {
  
});

// 상품 정보 수정 API
router.put("/products/:productsName", authMiddleware, async (req, res) => {
   
});

// 상품 삭제 API
router.delete("/products/:productsName", authMiddleware, async (req, res) => {
    
});

// router 모듈 내보내기
module.exports = router;