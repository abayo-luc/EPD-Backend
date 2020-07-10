import { Op } from "sequelize";
import MainController from "../main";
import db from "../../models";
import { validateSales, validateSalesUpdate } from "../../utils/validator";
import { paginate, textSearch } from "../../utils/queryHelper";

const { Sale } = db;
class SalesController {
  static async index(req, res) {
    try {
      const { search, page = 1, limit = 15, companyId } = req.query;
      let otherFilters = {};
      if (companyId) {
        otherFilters = {
          [Op.and]: {
            companyId
          }
        };
      }
      const data = await Sale.findAndCountAll({
        where: {
          ...textSearch(search, [
            "clientName",
            "province",
            "district",
            "sector",
            "cell",
            "village"
          ]),
          ...otherFilters
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "role",
                "companyId",
                "two_factor_secret",
                "password_reset_token"
              ]
            }
          },
          { model: db.Company, as: "company" }
        ],

        ...paginate({ page, limit })
      });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async companySales(req, res) {
    try {
      const { search, page = 1, limit = 15 } = req.query;
      const { companyId } = req.params;
      const data = await Sale.findAndCountAll({
        where: {
          companyId,
          ...textSearch(search, [
            "clientName",
            "province",
            "district",
            "sector",
            "cell",
            "village"
          ])
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "role",
                "companyId",
                "two_factor_secret",
                "password_reset_token"
              ]
            }
          },
          { model: db.Company, as: "company" }
        ],

        ...paginate({ page, limit })
      });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async agentSales(req, res) {
    try {
      const { search, page = 1, limit = 15, type = "" } = req.query;
      const data = await Sale.findAndCountAll({
        where: {
          userId: req.params?.id,
          editable: type.toLowerCase().trim() === "editable",
          ...textSearch(search, [
            "clientName",
            "province",
            "district",
            "sector",
            "cell",
            "village"
          ])
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "role",
                "companyId",
                "two_factor_secret",
                "password_reset_token"
              ]
            }
          },
          { model: db.Company, as: "company" }
        ],
        ...paginate({ page, limit })
      });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async create(req, res) {
    try {
      const { companyId } = req.params;
      await validateSales.validateAsync({ ...req.body, companyId });
      const data = await Sale.create({
        ...req.body,
        userId: req.user.id,
        companyId
      });
      return res.status(201).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async find(req, res) {
    try {
      const { salesId } = req.params;
      const data = await Sale.findByPk(salesId);
      return MainController.handleFind(res, data);
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async update(req, res) {
    try {
      const { id, salesId } = req.params;
      const attributes = [
        "clientName",
        "phoneNumber",
        "province",
        "district",
        "sector",
        "cell",
        "village",
        "age",
        "clientID",
        "sex",
        "editable"
      ];
      await validateSalesUpdate.validateAsync(
        attributes.reduce(
          (prev, current) => ({
            ...prev,
            [current]: req.body[current]
          }),
          {}
        ),
        { abortEarly: false }
      );
      const record = await Sale.findByPk(salesId || id);
      if (!record) {
        return MainController.handleFind(res);
      }
      const fields = [];
      attributes.forEach(item => {
        if (req.body[item]) record[item] = req.body[item];
        if (req.body[item]) fields.push(item);
      });

      const data = await record.save({ fields });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async delete(req, res) {
    try {
      const { id, salesId } = req.params;
      const record = await Sale.find({
        where: {
          id: salesId || id,
          editable: true
        }
      });
      if (!record) {
        return MainController.handleFind(res);
      }
      await record.destroy();
      return res.status(204).json({ message: "Success" });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }
}

export default SalesController;
