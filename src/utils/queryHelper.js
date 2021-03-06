import { Op } from "sequelize";
import faker from "faker";

export const dataSort = order => [["updatedAt", "ASC"], ...order];
export const textSearch = (text, fields) => {
  if (text) {
    return {
      [Op.or]: fields.map(item => ({
        [item]: {
          [Op.like]: `%${text}%`
        }
      }))
    };
  }
  return {};
};
export const paginate = ({ page = 1, limit = 50 }) => {
  const offset = (Number(page) - 1) * limit;
  return {
    offset: parseInt(offset, 10),
    limit: parseInt(offset, 10)
  };
};

export const generateUser = ({
  name,
  username,
  phoneNumber,
  password,
  role
}) => ({
  username: username || faker.internet.userName(name),
  phoneNumber,
  password:
    password ||
    Math.random()
      .toString(36)
      .slice(-8),
  role: role || "agent"
});
