module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Sales", "clientID", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    });
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn("Sales", "clientID");
  }
};
