module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Users', 'companyId', {
			type: Sequelize.UUID,
			allowNull: true
		});
	},

	down: (queryInterface, _Sequelize) => {
		return queryInterface.removeColumn('Users', 'companyId');
	}
};
