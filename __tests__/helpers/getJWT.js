import dotenv from "dotenv";
import db from "../../src/models";
import AppToken from "../../src/controllers/AuthController/AppToken";

dotenv.config();
const { SUPER_ADMIN_PASSWORD } = process.env;
const { User } = db;

export default async (
  roles = ["superAdmin", "agent", "supervisor", "admin"]
) => {
  const promises = roles.map(async role =>
    User.findOne({
      where: {
        role
      }
    }).then(async admin => {
      const token = await AppToken.generateJWT(
        SUPER_ADMIN_PASSWORD,
        admin.password,
        {
          id: admin.id,
          role: admin.role
        }
      );
      return { token, id: admin.id };
    })
  );
  const values = await Promise.all(promises);
  const tokens = {};
  await roles.forEach((role, index) => {
    tokens[role] = values[index];
  });
  return tokens;
};
