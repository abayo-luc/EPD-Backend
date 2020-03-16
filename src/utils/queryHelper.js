import { Op } from "sequelize";

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
export const paginate = ({ page = 1, limit = 2 }) => {
  const offset = (Number(page) - 1) * limit;
  return {
    offset,
    limit
  };
};
