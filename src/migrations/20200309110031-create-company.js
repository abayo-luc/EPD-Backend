module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Companies', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			phoneNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, _Sequelize) => {
		return queryInterface.dropTable('Companies');
	}
};
