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
				unique: true,
				validate: {
					invalid: function(username) {
						const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
						if (username.length < 4) {
							throw new Error('Username too short');
						}
						if (username.length > 20) {
							throw new Error('Username too long');
						}
						if (!usernameRegex.test(username)) {
							throw new Error('Invalid username');
						}
					}
				}
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					invalid: function(email) {
						const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
						if (email && !emailRegex.test(email)) {
							throw new Error('Invalid email');
						}
					}
				}
			},
			phoneNumber: DataTypes.STRING,
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					invalid: function(password) {
						if (password.length < 6) {
							throw new Error('Password too short');
						} else if (password.length > 20) {
							throw new Error('Password too long');
						}
					}
				}
			},
			role: {
				type: DataTypes.ENUM('superAdmin', 'admin', 'supervisor', 'agent'),
				defaultValue: 'agent'
			},
			blocked: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		},
		{
			tableName: 'Users'
		}
	);
	User.beforeSave(async (user, _options) => {
		user.password = await encrypt(user.password);
	});
	User.beforeSave((user, _options) => {
		if (user.username) {
			user.username = user.username.toLowerCase();
		}
	});
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};
