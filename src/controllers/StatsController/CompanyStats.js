import main from "../main";
import db from "../../models";

export default class CompanyStats {
  static async totalCompanies(req, res) {
    try {
      const count = await db.Company.count();
      return res.status(200).json({ count });
    } catch (error) {
      return main.handleError(res, error);
    }
  }
}
