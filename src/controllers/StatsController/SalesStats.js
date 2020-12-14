import { Op } from 'sequelize';
import moment from 'moment';
import main from '../main';
import db from '../../models';

const monthsBetween = async (start, end) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('MMM-YY'));
    dateStart.add(1, 'month');
  }
  return timeValues.reduce((prev, current) => ({ ...prev, [current]: [] }), {});
};

const getByRange = ({ start, end }) => ({
  [Op.and]: [
    {
      createdAt: {
        [Op.gte]: moment(start).format('YYYY-MM-DD'),
        [Op.lt]: moment(end).format('YYYY-MM-DD'),
      },
    },
  ],
});

const getByWeek = (week) => ({
  [Op.and]: [
    {
      createdAt: {
        [Op.between]: [
          moment(week)
            .startOf('week')
            .format('YYYY-MM-DD'),
          moment(week)
            .endOf('week')
            .format('YYYY-MM-DD'),
        ],
      },
    },
  ],
});
export default class SalesStats {
  static async salesVsMonths(req, res) {
    try {
      const {
        start = moment().startOf('year'),
        end = moment(),
        companyId,
      } = req.query;
      const filters = {
        editable: false,
      };

      if (req.user.role === 'supervisor') {
        filters.companyId = req.user.companyId;
      } else if (companyId) {
        filters.companyId = companyId;
      }
      const sales = await db.Sale.findAll({
        where: {
          ...getByRange({ start, end }),
          ...filters,
        },
      });

      const months = await monthsBetween(start, end); // populate empty months

      const data = sales.reduce(
        (prevValue, currentValue) => {
          const currentMonth = moment(currentValue.createdAt).format('MMM-YY');
          return {
            ...prevValue,
            [currentMonth]: [
              currentValue,
              ...(prevValue[currentMonth] ? prevValue[currentMonth] : []),
            ],
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
      const { start = moment().startOf('year'), end = moment() } = req.query;
      const companySales = await db.Company.findAll({
        include: [
          {
            model: db.Sale,
            as: 'sales',
            where: {
              ...getByRange({ start, end }),
              editable: false,
            },
          },
        ],
        groupe: ['sales.id'],
      });
      return res.status(200).json(companySales);
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async salesVsAgents(req, res) {
    try {
      const {
        start = moment().startOf('year'),
        end = moment(),
        companyId,
      } = req.query;

      const agentsSales = await db.User.findAll({
        where: {
          companyId: companyId || req.user.companyId,
          role: 'agent',
        },
        attributes: ['id', 'name', 'avatar'],
        include: [
          {
            model: db.Sale,
            as: 'sales',
            attributes: ['id'],
            where: {
              ...getByRange({ start, end }),
              editable: false,
            },
          },
        ],
        groupe: ['sales.id'],
      });
      return res.status(200).json(agentsSales);
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async totalSales(req, res) {
    try {
      const { start, end, companyId } = req.query;
      let filters = {
        editable: false,
      };
      if (start && end) {
        filters = {
          ...filters,
          ...getByRange({ start, end }),
        };
      }

      if (req.user.role === 'supervisor') {
        filters.companyId = req.user.companyId;
      } else if (companyId) {
        filters.companyId = companyId;
      }

      const count = await db.Sale.count({
        where: {
          ...filters,
        },
      });

      return res.status(200).json({ count });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async totalDrafts(req, res) {
    try {
      const { companyId } = req.query;
      const filters = {
        editable: true,
      };
      if (req.user.role === 'supervisor') {
        filters.companyId = req.user.companyId;
      } else if (companyId) {
        filters.companyId = companyId;
      }
      const count = await db.Sale.count({
        where: {
          ...filters,
        },
      });
      return res.status(200).json({ count });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async weekSales(req, res) {
    try {
      const { companyId } = req.query;
      const filters = {
        editable: false,
      };
      if (req.user.role === 'supervisor') {
        filters.companyId = req.user.companyId;
      } else if (companyId) {
        filters.companyId = companyId;
      }
      const { date = new Date().toISOString() } = req.query;
      const count = await db.Sale.count({
        where: {
          ...filters,
          ...getByWeek(date),
        },
      });
      const lastWeekDate = moment(date).subtract(1, 'weeks');

      const previousWeek = await db.Sale.count({
        where: {
          ...filters,
          ...getByWeek(lastWeekDate),
        },
      });

      return res.status(200).json({ count, previous: previousWeek });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async totalAgents(req, res) {
    try {
      const { start, end, companyId } = req.query;
      let filters = {
        role: 'agent',
      };
      if (start && end) {
        filters = {
          ...filters,
          ...getByRange({ start, end }),
        };
      }
      if (req.user.role === 'supervisor') {
        filters.companyId = req.user.companyId;
      } else if (companyId) {
        filters.companyId = companyId;
      }

      const count = await db.User.count({
        where: {
          ...filters,
        },
      });
      return res.status(200).json({ count });
    } catch (error) {
      return main.handleError(res, error);
    }
  }
}
