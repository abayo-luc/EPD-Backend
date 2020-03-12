import { Router } from "express";
import SalesController from "../controllers/SalesController";
import authenticate from "../middleware/authenticate";

const salesRouters = Router();
salesRouters.use(authenticate);
salesRouters
  .get("/sales", SalesController.index)
  .post("/sales", SalesController.create)
  .get("/sales/:id", SalesController.find)
  .put("/sales/:id", SalesController.update);
export default salesRouters;
