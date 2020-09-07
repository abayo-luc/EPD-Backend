const faker = require("faker");

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const data = [...Array(100).keys()].map((_item, index) => {
      let i = 0;
      if (index > 30) {
        i = index % 2 === 0 ? 0 : 1;
      }
      return {
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
        companyId: [
          "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e0",
          "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e6"
        ][i],
        userId: [
          "10b5f343-efbd-45ce-85d0-7f694a91d34d",
          "10b5f343-efbd-45ce-85d0-7f694a91d34c"
        ][i],
        createdAt: faker.date.between("06/06/2019", new Date()),
        updatedAt: new Date()
      };
    });
    return queryInterface.bulkInsert("Sales", [...data], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Sales", null, {});
  }
};
