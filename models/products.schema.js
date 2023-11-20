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
                type: DataTypes.STRING,
                allowNull: false
            },
            // 작성내용
            contentWriting: {
                type: DataTypes.STRING,
                allowNull: false
            },
            // 상품상태
            productStatus: {
                // 필드값 제한하기
                type: DataTypes.ENUM("FOR_SALE", "SOLD_OUT"),
                // 기본값 설정
                defaultValue: "FOR_SALE"
            },
            // 작성날짜
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }, {
            sequelize,
            modelName: 'Product',
            tableName: "products"
        });
    }

    static associate(models) {
        // define association here
    }
}