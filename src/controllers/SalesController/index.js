import MainController from "../main";
import db from "../../models";
import { validateSales } from "../../utils/validator";

const { Sale } = db;
class SalesController {
  static async index(req, res) {
    try {
      const data = await Sale.findAll();
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async create(req, res) {
    try {
      await validateSales.validateAsync({ ...req.body });
      const data = await Sale.create({
        ...res.body,
        userId: req.users.id,
        companyId: req.users.companyId
      });
      return res.status(201).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const data = await Sale.findByPk(id);
      return MainController.handleFind(res, data);
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const record = await Sale.findByPk(id);
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
        "village"
      ].forEach(item => {
        if (req.body[item]) record[item] = req.body[item];
        if (res.body[item]) fields.push(item);
      });
      const data = await record.save({ fields });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }
}

export default SalesController;
