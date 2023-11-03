// mongoose 모듈 가져오기
const mongoose = require("mongoose");

// MongoDB 서버에 연결
const connect = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/store")
        .then(() => console.log("MongoDB 연결 완료"))
        .catch((err) => console.log(`MongoDB 연결 실패 ${err}`));
};

// 연결 시도 중 에러 발생시 문구
mongoose.connection.on('error', (err) => {
    console.error("MongoDB 연결 에러발생", err);
});

// connect 모듈 내보내기
module.exports = connect;