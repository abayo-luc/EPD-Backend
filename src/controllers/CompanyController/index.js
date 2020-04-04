import MainController from "../main";
import db from "../../models";
import {
  companyValidator,
  companyUpdateValidator
} from "../../utils/validator";
import { textSearch, paginate, generateUser } from "../../utils/queryHelper";

class CompanyController {
  static async index(req, res) {
    try {
      const { search, limit, page } = req.query;
      const data = await db.Company.findAll({
        where: {
          ...textSearch(search, ["name", "phoneNumber", "email"])
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
      const { phoneNumber, name, email, address, password } = req.body;
      await companyValidator.validateAsync({
        phoneNumber,
        name,
        email,
        address,
        password
      });
      const supervisor = await generateUser({
        name,
        phoneNumber,
        password,
        role: "supervisor"
      });
      const data = await db.Company.create(
        {
          phoneNumber,
          name,
          email,
          address,
          user: supervisor
        },
        {
          include: "user"
        }
      );
      return res.status(201).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const data = await db.Company.findByPk(id);
      return MainController.handleFind(res, data);
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async update(req, res) {
    try {
      const { phoneNumber, name, email, address } = req.body;
      await companyUpdateValidator.validateAsync({
        phoneNumber,
        name,
        email,
        address
      });
      const fields = [];
      const { id } = req.params;
      const company = await db.Company.findByPk(id);
      if (!company) {
        return MainController.handleFind(res);
      }
      ["phoneNumber", "name", "email", "address"].forEach(atr => {
        if (req.body[atr]) {
          company[atr] = req.body[atr];
          fields.push(atr);
        }
      });
      const data = await company.save({ fields });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const company = await db.Company.findByPk(id);
      if (!company) {
        return MainController.handleFind(res);
      }
      await company.destroy();
      return res.status(200).json({
        data: {
          message: "Company successfully deleted"
        }
      });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }
}

export default CompanyController;
