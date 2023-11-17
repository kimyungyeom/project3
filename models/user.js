const { Model, DataTypes} = require("sequelize");

module.exports = class User extends Model {
    static init(sequelize) {
        return User.init({
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: DataTypes.STRING,
            nickname: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'User',
        });
    }

    static associate(models) {
        // define association here
    }
}