import { Op } from "sequelize";
import faker from "faker";

export const dataSort = order => [["updatedAt", "ASC"], ...order];
export const textSearch = (text, fields) => {
  if (text) {
    return {
      [Op.or]: fields.map(item => ({
        [item]: {
          [Op.iLike]: `%${text}%`
        }
      }))
    };
  }
  return {};
};
export const paginate = ({ page = 1, limit = 50 }) => {
  const offset = (Number(page) - 1) * limit;
  return {
    offset,
    limit
  };
};

export const genSupervisor = ({ name, phoneNumber, password }) => ({
  username: faker.internet.userName(name),
  phoneNumber,
  password:
    password ||
    Math.random()
      .toString(36)
      .slice(-8),
  role: "supervisor"
});
