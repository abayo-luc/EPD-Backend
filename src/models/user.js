'use strict';
import encrypt from '../utils/encrypt';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			name: DataTypes.STRING,
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			email: DataTypes.STRING,
			poneNumber: DataTypes.STRING,
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			role: {
				type: DataTypes.ENUM('superAdmin', 'admin', 'supervisor', 'agent'),
				defaultValue: 'agent'
			}
		},
		{
			tableName: 'Users'
		}
	);
	User.beforeCreate((user, _options) => encrypt(user));
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};
