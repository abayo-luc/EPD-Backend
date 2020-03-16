module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Sales", "age", {
        type: Sequelize.INTEGER,
        allowNull: false
      }),
      queryInterface.addColumn("Sales", "sex", {
        type: Sequelize.ENUM("male", "female"),
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, _Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Sales", "age"),
      queryInterface.removeColumn("Sales", "sex")
    ]);
  }
};
