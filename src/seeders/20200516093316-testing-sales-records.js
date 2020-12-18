const faker = require("faker");

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const sales = [...Array(100).keys()].map((_item, index) => {
      let i = 0;
      if (index > 30) {
        i = index % 2 === 0 ? 0 : 1;
      }
      const id = faker.random.uuid();
      return {
        id,
        clientName: faker.name.firstName(),
        phoneNumber: faker.phone.phoneNumber(),
        province: "North",
        district: "Gicumbi",
        sector: "Byumba",
        cell: "Gisuna",
        village: "Gisuna",
        editable: false,
        sex: "male",
        clientID: "1234567890123456",
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
    const soldItems = await sales.map(item => ({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      price: faker.random.number(),
      quantity: faker.random.number(),
      description: faker.lorem.sentences(3),
      salesId: item.id,
      createdAt: faker.date.between("06/06/2019", new Date()),
      updatedAt: new Date(),
      userId: item.userId
    }));
    await queryInterface.bulkInsert("Sales", [...sales], {});
    return queryInterface.bulkInsert("SoldItems", [...soldItems], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("Sales", null, {});
    return queryInterface.bulkDelete("SoldItems", null, {});
  }
};
