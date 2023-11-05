// Express모듈 가져오기
const express = require('express');
// Express모듈에서 라우터 가져오기
const router = express.Router();

// 상품 작성 API
// products.schema.js 가져오기
const products = require("../schemas/products.schema.js");

router.post("/products", async (req, res) => {
    // 서버에서 req.body를 통해 객체형식으로 받아온 데이터들을 구조분해할당으로 각각 할당
    const {productsName, contentWriting, name, pw} = req.body;

    // 입력받은 상품명 찾아서 할당
    const findingProductsName = await products.find({productsName});
    // 동일한 상품명이 있을시에 예외처리
    if (findingProductsName.length) {
        return res.status(400).json({success: false, errorMessage:"이미 있는 상품입니다."});
    }

    // 입력받은 데이터 및 기존 데이터를 이용해 생성한 값을 할당
    const createdProducts = await products.create({productsName, contentWriting, name, pw});
    
    res.json({products: createdProducts});
})

// 상품 목록 조회 API
router.get("/products", async (req, res) => {
    // 해당 데이터들만 찾아 빈 객체에 할당하고 변수에 다시 할당
    const searchProductList = await products.find({}, "productsName name productStatus date")
    // 날짜를 기준으로 내림차순(최신순) 정렬 / -1을 1로 바꾸면 오름차순 
    .sort({date: -1 });
    
    res.status(200).json({"products" : searchProductList});
})

// 상품 상세 조회 API
router.get("/products/:productsName", async (req, res) => {
    // 서버에서 req.params를 통해 :productsName이라는 URL 라우팅 매개변수를 추출
    const {productsName} = req.params;
    // 해당하는 상품명을 가진 객체하나를 반환하고 select를 통해 해당하는 값만 할당
    const detail = await products.findOne({productsName})
    .select("productsName contentWriting name productStatus date");
    
    res.status(200).json({detail});
});

// 상품 정보 수정 API
router.put("/products/:productsName", async (req, res) => {
    // 상품명, 작성내용, 상품상태, 비밀번호를 req로 전달받기
    const {productsName} = req.params;
    const {contentWriting, productStatus, pw} = req.body;

    // 해당하는 상품명을 가진 객체하나를 반환하고 할당
    const findingProduct = await products.find({productsName});

    // 해당하는 상품이 없거나 비밀번호가 서로 틀릴경우 메시지 반환
    if (!findingProduct.length || findingProduct[0].pw !== pw) {
        return res.status(400).json({success: false, errorMessage:"상품 조회에 실패하였습니다."});
    }
    // 위에 조건이 해당하지 않으면 작성내용, 상품상태를 수정한다. $set 연산자 : 특정값 필드 변경
    else {
        await products.updateOne(
            {productsName},
            {$set: {contentWriting, productStatus}}
        );
    }

    res.json({ success: true});
})

// router 모듈 내보내기
module.exports = router;