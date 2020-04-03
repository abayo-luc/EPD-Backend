import MainController from "../main";
import db from "../../models";
import { validateSales } from "../../utils/validator";
import { paginate, textSearch } from "../../utils/queryHelper";

const { Sale } = db;
class SalesController {
  static async index(req, res) {
    try {
      const { search, page = 1, limit = 15 } = req.query;
      const data = await Sale.findAll({
        where: {
          ...textSearch(search, [
            "clientName",
            "province",
            "district",
            "sector",
            "cell",
            "village"
          ])
        },
        order: [["updatedAt", "ASC"]],
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
      const data = await Sale.findAll({
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
        order: [["updatedAt", "ASC"]],
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
      const data = await Sale.findAll({
        where: {
          userId: req.params?.id,
          editable: type.toLowerCase() === "editable",
          ...textSearch(search, [
            "clientName",
            "province",
            "district",
            "sector",
            "cell",
            "village"
          ])
        },
        order: [["updatedAt", "ASC"]],
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
      const record = await Sale.findByPk(salesId || id);
      if (!record) {
        return MainController.handleFind(res);
      }
      const fields = [];
      [
        "clientName",
        "phoneNumber",
        "province",
        "district",
        "sector",
        "cell",
        "village",
        "age",
        "sex"
      ].forEach(item => {
        if (req.body[item]) record[item] = req.body[item];
        if (req.body[item]) fields.push(item);
      });
      const data = await record.save({ fields });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }
}

export default SalesController;
