module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Sales", "clientID", {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn("Sales", "clientID");
  }
};
