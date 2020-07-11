module.exports = (sequelize, DataTypes) => {
  const SoldItems = sequelize.define(
    "SoldItems",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      salesId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  SoldItems.associate = _models => {
    // SoldItems.belongsTo(models.Sale);
  };
  return SoldItems;
};
