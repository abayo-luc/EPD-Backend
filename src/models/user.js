import encrypt from "../utils/encrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
        // validate: {
        // 	invalid(username) {
        // 		const usernameRegex = /^[a-z0-9_-]{3,15}$/;
        // 		if (username.length < 4) {
        // 			throw new Error('Username too short');
        // 		}

        // 		if (!usernameRegex.test(username)) {
        // 			throw new Error('Invalid username');
        // 		}
        // 	}
        // }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          invalid(email) {
            const emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;
            if (email && !emailRegex.test(email)) {
              throw new Error("Invalid email");
            }
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          invalid(phoneNumber) {
            // eslint-disable-next-line no-useless-escape
            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (phoneNumber && !phoneRegex.test(phoneNumber)) {
              throw new Error("Invalid phone number");
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          invalid(password) {
            if (password.length < 6) {
              throw new Error("Password too short");
            } else if (password.length > 20) {
              throw new Error("Password too long");
            }
          }
        }
      },
      role: {
        type: DataTypes.ENUM("superAdmin", "admin", "supervisor", "agent"),
        defaultValue: "agent"
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      two_factor_secret: DataTypes.STRING,
      password_reset_token: DataTypes.STRING
    },
    {
      tableName: "Users"
    }
  );
  User.beforeSave(async (user, _options) => {
    const hashedPwd = await encrypt(user.password);
    user.setDataValue("password", hashedPwd);
  });
  User.associate = models => {
    User.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company"
    });
  };
  return User;
};
