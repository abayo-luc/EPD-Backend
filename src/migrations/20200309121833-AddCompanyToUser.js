'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Users', 'companyId', {
			type: Sequelize.UUID,
			allowNull: true
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Users', 'companyId');
	}
};
