const { Model, DataTypes } = require("sequelize");

module.exports = class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				// 유저ID
				userId: {
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				// 이메일
				email: DataTypes.STRING,
				// 닉네임
				nickname: DataTypes.STRING,
				// 비밀번호
				password: DataTypes.STRING,
			},
			{
				sequelize,
				modelName: "User",
				tableName: "Users",
			},
		);
	}

	static associate(models) {
		// define association here
	}
};
