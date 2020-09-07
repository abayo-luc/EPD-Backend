module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				type: Sequelize.STRING
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: Sequelize.STRING
			},
			phoneNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			role: {
				type: Sequelize.ENUM('superAdmin', 'admin', 'supervisor', 'agent'),
				defaultValue: 'agent'
			},
			blocked: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			confirmed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
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
		return queryInterface.dropTable('Users');
	}
};
