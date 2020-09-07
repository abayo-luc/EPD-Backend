module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "two_factor_secret", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Users", "password_reset_token", {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, _Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "two_factor_secret"),
      queryInterface.removeColumn("Users", "password_reset_token")
    ]);
  }
};
