'use strict';
const uuid = require('uuid').v4;
module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					id: uuid(),
					name: 'Super Admin',
					username: 'super-admin',
					confirmed: true,
					blocked: false,
					email: 'super.admin@example.com',
					phoneNumber: '0780000000',
					password:
						'$2b$10$CzfqN8d7S0hhrsMceldTO.Cv9Zxey2Ibd3U6Nmh95NSPyva5z.jeW',
					role: 'superAdmin',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: uuid(),
					name: 'Admin One',
					username: 'admin',
					confirmed: true,
					blocked: false,
					email: 'admin@example.com',
					phoneNumber: '0780000001',
					password:
						'$2b$10$CzfqN8d7S0hhrsMceldTO.Cv9Zxey2Ibd3U6Nmh95NSPyva5z.jeW',
					role: 'admin',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: uuid(),
					name: 'Agent',
					username: 'agent',
					confirmed: true,
					blocked: false,
					email: 'agent@example.com',
					phoneNumber: '0780000002',
					password:
						'$2b$10$CzfqN8d7S0hhrsMceldTO.Cv9Zxey2Ibd3U6Nmh95NSPyva5z.jeW',
					role: 'agent',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkDelete('Users', null, {});
	}
};
