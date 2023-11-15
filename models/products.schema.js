// mongoose 모듈 가져오기
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    // 상품명
    productsName: {
        type: String,
        required: true,
        unique: true
    },
    // 작성내용
    contentWriting: {
        type: String,
        required: true
    },
    // 작성자명
    name: {
        type: String,
        required: true
    },
    // 비밀번호
    pw: {
        type: Number,
        required: true
    },
    // 상품상태
    productStatus: {
        type: String,
        // 필드값 제한하기
        enum: ["FOR_SALE", "SOLD_OUT"],
        // 기본값 설정
        default: "FOR_SALE"
    },
    // 작성날짜
    date: {
        type: Date,
        default: Date.now
    }
});

// products명으로 입력받은 데이터들을 MongoDB로 내보내기
module.exports = mongoose.model("products", productsSchema);