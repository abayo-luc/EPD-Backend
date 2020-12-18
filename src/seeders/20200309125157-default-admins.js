import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import encrypt from "../utils/encrypt";

dotenv.config();
const { CUSTOM_PASSWORD, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PHONE } = process.env;
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const password = await encrypt(CUSTOM_PASSWORD);
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
          phoneNumber: SUPER_ADMIN_PHONE,
          password,
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
          password,
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
          password,
          role: "agent",
          createdAt: new Date(),
          companyId: "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e0",
          updatedAt: new Date()
        },
        {
          id: "10b5f343-efbd-45ce-85d0-7f694a91d34c",
          name: "Agent 2",
          username: "agent2",
          confirmed: true,
          blocked: false,
          email: "agent2@example.com",
          phoneNumber: "0780000003",
          password,
          role: "agent",
          createdAt: new Date(),
          companyId: "53d8cfb2-b6a7-4e61-8088-ae278ef2e5e6",
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
          password,
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
