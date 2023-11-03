// Express모듈 가져오기
const express = require('express');
// Express모듈에서 라우터 가져오기
const router = express.Router();

// 상품 작성 API
// products.schema.js 가져오기
const products = require("../schemas/products.schema.js");

router.post("/products", async (req, res) => { 
    const {productsName, contentWriting, name, pw} = req.body;

    // 입력받은 상품명 찾아서 할당
    const findingProductsName = await products.find({productsName});
    // 동일한 상품명이 있을시에 예외처리
    if (findingProductsName.length) {
        return res.status(400).json({success: false, errorMessage:"이미 있는 상품입니다."});
    }

    // 입력받은 데이터 및 기존 데이터를 이용해 생성한 값을 할당
    const createdProducts = await products.create({productsName, contentWriting, name, pw, productStatus, date});
    
    // JSON 형식으로 응답
    res.json({products: createdProducts});
})

// 상품 목록 조회 API
router.get("/products", (req, res) => {
    res.status(200).json({"products" : products});
})

// router 모듈 내보내기
module.exports = router;