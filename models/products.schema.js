const { Model, DataTypes} = require("sequelize");

module.exports = class Products extends Model {
    static init(sequelize) {
        return super.init({
            // 유저ID
            userId: {
                type: DataTypes.INTEGER,
            },
            // 상품ID
            productsId: {
                primaryKey: true,
                type : DataTypes.INTEGER
            },
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
        }, {
            sequelize,
            modelName: 'Product',
        });
    }

    static associate(models) {
        // define association here
    }
}