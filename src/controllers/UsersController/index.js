import MainController from "../main";
import db from "../../models";
import { signUpValidator, userUpdateValidator } from "../../utils/validator";
import { textSearch, paginate } from "../../utils/queryHelper";

const { User, Company } = db;
class UserController extends MainController {
  static async index(req, res) {
    try {
      const { search, limit, page } = req.query;
      const data = await User.findAndCountAll({
        attributes: {
          exclude: ["password"]
        },
        where: {
          ...textSearch(search, ["name", "phoneNumber", "username"])
        },
        order: [["updatedAt", "ASC"]],
        ...paginate({ limit, page }),
        include: [
          {
            model: Company,
            as: "company"
          }
        ]
      });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async getCompanyUsers(req, res) {
    try {
      const { companyId } = req.params;
      const { search, limit, page } = req.query;
      const data = await User.findAndCountAll({
        attributes: {
          exclude: ["password"]
        },
        where: {
          companyId,
          ...textSearch(search, ["name", "phoneNumber", "username"])
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
      const {
        username,
        password,
        name,
        phoneNumber,
        address,
        role,
        companyId
      } = req.body;
      const { companyId: userCompanyId } = req.user;
      await signUpValidator.validateAsync(req.body);
      const data = await User.create({
        username,
        name,
        password:
          password ||
          Math.random()
            .toString(36)
            .slice(-8),
        phoneNumber,
        address,
        role,
        companyId: companyId || userCompanyId
      });
      data.password = undefined;
      return res.status(201).json({
        data
      });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      let data;
      if (req.user?.role === "supervisor") {
        data = await User.findOne({
          attributes: {
            exclude: ["password"]
          },
          where: {
            id,
            companyId: req.user.companyId
          }
        });
      } else {
        data = await User.findByPk(id, {
          attributes: {
            exclude: ["password"]
          }
        });
      }

      return MainController.handleFind(res, data);
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async update(req, res) {
    try {
      const fields = [];
      const { id } = req.params;
      await userUpdateValidator.validateAsync(req.body);
      const user = await User.findByPk(id);
      if (!user) {
        return MainController.handleFind(res);
      }
      ["email", "name", "username", "avatar", "address"].forEach(item => {
        if (req.body[item]) user[item] = req.body[item];
        if (req.body[item]) fields.push(item);
      });
      const data = await user.save({ fields });
      data.password = undefined;
      return res.status(200).json({
        data
      });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }

  static async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return MainController.handleFind(res);
      }
      user.password = password;
      await user.save({ fields: ["password"] });
      return res.status(200).json({
        data: {
          message: "Password update successfully"
        }
      });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }
}

export default UserController;
