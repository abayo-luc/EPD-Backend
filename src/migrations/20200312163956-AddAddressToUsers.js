module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "address", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Users", "avatar", {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, _Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "address"),
      queryInterface.removeColumn("Users", "avatar")
    ]);
  }
};
