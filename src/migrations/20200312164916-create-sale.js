module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Sales", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cell: {
        type: Sequelize.STRING,
        allowNull: false
      },
      village: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sex: {
        type: Sequelize.ENUM("male", "female"),
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      editable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Companies", key: "id" }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" }
      }
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable("Sales");
  }
};
