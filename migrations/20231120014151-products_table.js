"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("products", {
			userId: {
				type: Sequelize.INTEGER,
			},
			productsId: {
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			productsName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			contentWriting: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			productStatus: {
				type: Sequelize.ENUM("FOR_SALE", "SOLD_OUT"),
				defaultValue: "FOR_SALE",
			},
			date: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("products");
	},
};
