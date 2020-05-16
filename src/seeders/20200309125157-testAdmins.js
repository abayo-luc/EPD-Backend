const uuid = require("uuid").v4;
const dotenv = require("dotenv");

dotenv.config();
const { CUSTOM_PASSWORD, SUPER_ADMIN_EMAIL } = process.env;
module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuid(),
          name: "Super Admin",
          username: "super-admin",
          confirmed: true,
          blocked: false,
          email: SUPER_ADMIN_EMAIL,
          phoneNumber: "0780000000",
          password: CUSTOM_PASSWORD,
          role: "superAdmin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: "Admin One",
          username: "admin",
          confirmed: true,
          blocked: false,
          email: "admin@example.com",
          phoneNumber: "0780000001",
          password: CUSTOM_PASSWORD,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "10b5f343-efbd-45ce-85d0-7f694a91d34d",
          name: "Agent",
          username: "agent",
          confirmed: true,
          blocked: false,
          email: "agent@example.com",
          phoneNumber: "0780000002",
          password: CUSTOM_PASSWORD,
          role: "agent",
          createdAt: new Date(),
          companyId: "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e0",
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: "Supervisor",
          username: "superv12",
          confirmed: true,
          blocked: false,
          email: "supervisor@example.com",
          phoneNumber: "0780000076",
          password: CUSTOM_PASSWORD,
          companyId: "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e0",
          role: "supervisor",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
