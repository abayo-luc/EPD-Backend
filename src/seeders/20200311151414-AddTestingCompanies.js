module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Companies",
      [
        {
          id: "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e0",
          name: "123 Inc.",
          email: "info@123inc.com",
          address: "KG 11 Av",
          phoneNumber: "0789277275",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  }
};
