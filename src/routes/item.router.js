import { Router } from "express";
import SoldItemsController from "../controllers/SoldItemsController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const itemRouters = Router();

itemRouters.use(authenticate);
itemRouters.put(
  "/users/:id/items/:itemId",
  authorize.allow(["owner"]),
  SoldItemsController.update
);

export default itemRouters;
