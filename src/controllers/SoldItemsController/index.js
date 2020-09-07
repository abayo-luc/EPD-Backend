import MainController from "../main";
import db from "../../models";
import { validateItem } from "../../utils/validator";

const { SoldItems } = db;

class SoldItemsController {
  static async update(req, res) {
    try {
      const { itemId } = req.params;
      await validateItem.validateAsync(req.body, {
        abortEarly: false
      });

      const record = await SoldItems.findByPk(itemId);
      if (!record) return MainController.handleFind(res);
      const fields = [];
      Object.keys(req.body).forEach(key => {
        if (
          ["name", "price", "quantity", "description"].includes(key) &&
          req.body[key]
        ) {
          fields.push(key);
          record[key] = req.body[key];
        }
      });
      const data = await record.save({ fields });
      return res.status(200).json({ data });
    } catch (error) {
      return MainController.handleError(res, error);
    }
  }
}

export default SoldItemsController;
