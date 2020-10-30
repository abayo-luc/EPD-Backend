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
        }
      ],
      {}
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
