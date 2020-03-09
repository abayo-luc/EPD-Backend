'use strict';
module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define(
		'Company',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					invalid: function(email) {
						const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
						if (email && !emailRegex.test(email)) {
							throw new Error('Invalid email');
						}
					}
				}
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					invalid: function(phoneNumber) {
						const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
						if (phoneNumber && !phoneRegex.test(phoneNumber)) {
							throw new Error('Invalid phone number');
						}
					}
				}
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			tableName: 'Companies'
		}
	);
	Company.associate = function(models) {
		Company.hasOne(models.User, {
			foreignKey: 'companyId',
			as: 'user'
		});
	};
	return Company;
};
