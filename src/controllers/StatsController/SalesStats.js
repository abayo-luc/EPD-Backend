import { Op } from "sequelize";
import moment from "moment";
import main from "../main";
import db from "../../models";

const months = moment
  .months()
  .reduce(
    (prev, current) => ({ ...prev, [current.toLocaleLowerCase()]: [] }),
    {}
  );

const getByYear = year => ({
  $and: [
    {
      createdAt: {
        [Op.gte]: moment([year])
          .startOf("year")
          .format("YYYY-MM-DD"),
        [Op.lt]: moment([year])
          .endOf("year")
          .format("YYYY-MM-DD")
      }
    }
  ]
});

export default class SalesStats {
  static async salesVsMonths(req, res) {
    try {
      const { year = new Date().getFullYear() } = req.query;
      const sales = await db.Sale.findAll({
        where: {
          ...getByYear(year)
        }
      });
      const data = sales.reduce(
        (prevValue, currentValue) => {
          const currentMonth = new Date(currentValue.createdAt)
            .toLocaleString("default", { month: "long" })
            ?.toLowerCase();
          return {
            ...prevValue,
            [currentMonth]: [currentValue, ...prevValue[currentMonth]]
          };
        },
        { ...months }
      );
      return res.status(200).json({ data });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async salesVsCompany(req, res) {
    try {
      const { year = new Date().getFullYear() } = req.query;
      const companySales = await db.Company.findAll({
        include: [
          {
            model: db.Sale,
            as: "sales",
            where: {
              ...getByYear(year)
            }
          }
        ],
        groupe: ["sales.id"]
      });
      return res.status(200).json({ data: companySales });
    } catch (error) {
      return main.handleError(res, error);
    }
  }
}
