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
    // 인증에 성공한 사용자의 userId를 res.locals.user를 통해 전달받기
    const {userId} = res.locals.user;
    // 상품명, 작성내용을 req로 전달 받기
    const {productsName, contentWriting} = req.body;

    // 입력받은 상품명 찾아서 할당
    const findingProductsName = await products.find({userId, productsName});
    // 동일한 상품명이 있을시에 예외처리
    if (findingProductsName.length) {
        return res.status(400).json({success: false, errorMessage:"이미 있는 상품입니다."});
    }

    // 입력받은 데이터 및 기존 데이터를 이용해 생성한 값을 할당
    const createdProducts = await products.create({productsName, contentWriting, userId});
    
    res.json({ products: createdProducts });
});

// 상품 목록 조회 API
router.get("/products", async (req, res) => {
    // 해당 데이터들만 찾아 빈 객체에 할당하고 변수에 다시 할당
    const searchProductList = await products.find({}, "productsName name productStatus date")
    // 날짜를 기준으로 내림차순(최신순) 정렬 / -1을 1로 바꾸면 오름차순 
    .sort({date: -1 });

    // 해당하는 상품이 없으면 메시지 반환
    if (!searchProductList.length) {
        return res.status(400).json({success: false, errorMessage:"상품 조회에 실패하였습니다."});
    }
    
    res.status(200).json({"products" : searchProductList});
});

// 상품 상세 조회 API
router.get("/products/:productsName", async (req, res) => {
    // 서버에서 req.params를 통해 :productsName이라는 URL 라우팅 매개변수를 추출
    const {productsName} = req.params;
    // 해당하는 상품명을 가진 객체하나를 반환하고 select를 통해 해당하는 값만 할당
    const detail = await products.findOne({productsName})
    .select("productsName contentWriting name productStatus date");

    // 해당하는 상품이 없으면 메시지 반환
    if (!detail.length) {
        return res.status(400).json({success: false, errorMessage:"상품 조회에 실패하였습니다."});
    }
    
    res.status(200).json({detail});
});

// 상품 정보 수정 API
router.put("/products/:productsName", async (req, res) => {
    // 상품명, 작성내용, 상품상태, 비밀번호를 req로 전달받기
    const {productsName} = req.params;
    const {contentWriting, productStatus, pw} = req.body;

    // 해당하는 상품명을 가진 객체를 반환하고 할당
    const findingProduct = await products.find({productsName});

    // 해당하는 상품이 없거나 비밀번호가 서로 틀릴경우 메시지 반환
    if (!findingProduct.length || findingProduct[0].pw !== pw) {
        return res.status(400).json({success: false, errorMessage:"상품 수정에 실패하였습니다."});
    }

    // 작성내용, 상품상태를 수정한다. $set 연산자 : 특정값 필드 변경
    await products.updateOne(
        {productsName},
        {$set: {contentWriting, productStatus}}
    );
    
    res.json({ success: true });
});

// 상품 삭제 API
router.delete("/products/:productsName", authMiddleware, async (req, res) => {
    // 인증에 성공한 사용자의 userId를 res.locals.user를 통해 전달받기
    const {userId} = res.locals.user;
    
    // 상품명을 데이터로 전달받기
    const {productsName} = req.params;
    
    // 인증에 성공한 userId와 상품을 등록한 userId가 일치한 상품의 객체를 반환하고 할당
    const findingProduct = await products.find({userId, productsName});

    // 해당하는 상품이 없을 경우 메시지 반환
    if (!findingProduct.length) {
        return res.status(400).json({success: false, errorMessage:"상품 조회에 실패하였습니다."});
    }
    
    // 해당하는 상품을 삭제한다.
    await products.deleteOne({userId, productsName});     

    res.json({ success: true });
});

// router 모듈 내보내기
module.exports = router;