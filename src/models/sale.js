module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cell: {
        type: DataTypes.STRING,
        allowNull: false
      },
      village: {
        type: DataTypes.STRING,
        allowNull: false
      },
      editable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      sex: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      clientID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  Sale.associate = models => {
    Sale.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
    Sale.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company"
    });
    Sale.hasMany(models.SoldItems, {
      foreignKey: "salesId",
      as: "items",
      onDelete: "CASCADE",
      hooks: true
    });
  };
  return Sale;
};
