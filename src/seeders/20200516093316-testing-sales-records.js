const faker = require("faker");

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const data = [...Array(100).keys()].map(() => ({
      id: faker.random.uuid(),
      clientName: faker.name.firstName(),
      phoneNumber: faker.phone.phoneNumber(),
      province: "North",
      district: "Gicumbi",
      sector: "Byumba",
      cell: "Gisuna",
      village: "Gisuna",
      editable: false,
      sex: "male",
      age: faker.random.number(),
      clientID: faker.random.number(),
      companyId: "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e0",
      userId: "10b5f343-efbd-45ce-85d0-7f694a91d34d",
      createdAt: faker.date.between("01/01/2019", "12/30/2019"),
      updatedAt: new Date()
    }));
    return queryInterface.bulkInsert("Sales", [...data], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Sales", null, {});
  }
};
