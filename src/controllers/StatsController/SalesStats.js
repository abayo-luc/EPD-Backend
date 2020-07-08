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

const getByRange = ({ start, end }) => ({
  $and: [
    {
      createdAt: {
        [Op.gte]: moment(start).format("YYYY-MM-DD"),
        [Op.lt]: moment(end).format("YYYY-MM-DD")
      }
    }
  ]
});

const getByWeek = week => ({
  $and: [
    {
      createdAt: {
        [Op.gte]: moment(week)
          .startOf("isoWeek")
          .format("YYYY-MM-DD"),
        [Op.lt]: moment(week)
          .endOf("isoWeek")
          .format("YYYY-MM-DD")
      }
    }
  ]
});

export default class SalesStats {
  static async salesVsMonths(req, res) {
    try {
      const filters = {
        editable: false
      };
      if (req.user.role === "supervisor") {
        filters.companyId = req.user.companyId;
      }
      const { start = moment().startOf("year"), end = moment() } = req.query;
      const sales = await db.Sale.findAll({
        where: {
          ...getByRange({ start, end }),
          ...filters
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
      return res.status(200).json(data);
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async salesVsCompany(req, res) {
    try {
      const { start = moment().startOf("year"), end = moment() } = req.query;
      const companySales = await db.Company.findAll({
        include: [
          {
            model: db.Sale,
            as: "sales",
            where: {
              ...getByRange({ start, end }),
              editable: false
            }
          }
        ],
        groupe: ["sales.id"]
      });
      return res.status(200).json(companySales);
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async salesVsAgents(req, res) {
    try {
      const { start = moment().startOf("year"), end = moment() } = req.query;

      const agentsSales = await db.User.findAll({
        where: {
          companyId: req.user.companyId,
          role: "agent"
        },
        attributes: ["id", "name", "avatar"],
        include: [
          {
            model: db.Sale,
            as: "sales",
            attributes: ["id"],
            where: {
              ...getByRange({ start, end }),
              editable: false
            }
          }
        ],
        groupe: ["sales.id"]
      });
      return res.status(200).json(agentsSales);
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async totalSales(req, res) {
    try {
      const { start, end } = req.query;
      let filters = {
        editable: false
      };
      if (start && end) {
        filters = {
          ...filters,
          ...getByRange({ start, end })
        };
      }
      if (req.user.role === "supervisor") {
        filters.companyId = req.user.companyId;
      }
      const count = await db.Sale.count({
        where: {
          ...filters
        }
      });

      const previousMonth = await db.Sale.count({
        where: {
          ...filters,
          $and: [
            {
              createdAt: {
                [Op.lt]: moment()
                  .startOf("month")
                  .subtract(1, "day")
                  .format("YYYY-MM-DD")
              }
            }
          ]
        }
      });

      return res.status(200).json({ count, previous: previousMonth });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async totalDrafts(req, res) {
    try {
      const filters = {
        editable: true
      };
      if (req.user.role === "supervisor") {
        filters.companyId = req.user.companyId;
      }
      const count = await db.Sale.count({
        where: {
          ...filters
        }
      });
      return res.status(200).json({ count });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async weekSales(req, res) {
    try {
      const filters = {
        editable: false
      };
      if (req.user.role === "supervisor") {
        filters.companyId = req.user.companyId;
      }
      const { date = new Date().toISOString() } = req.query;
      const count = await db.Sale.count({
        where: {
          ...filters,
          ...getByWeek(date)
        }
      });
      const lastWeekDate = moment(date)
        .subtract(1, "weeks")
        .endOf("isoWeek");

      const previousWeek = await db.Sale.count({
        where: {
          ...filters,
          ...getByWeek(lastWeekDate)
        }
      });

      return res.status(200).json({ count, previous: previousWeek });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async totalAgents(req, res) {
    try {
      const { start, end } = req.query;
      let filters = {
        role: "agent"
      };
      if (start && end) {
        filters = {
          ...filters,
          ...getByRange({ start, end })
        };
      }
      if (req.user.role === "supervisor") {
        filters.companyId = req.user.companyId;
      }

      const count = await db.User.count({
        where: {
          ...filters
        }
      });
      return res.status(200).json({ count });
    } catch (error) {
      return main.handleError(res, error);
    }
  }
}
