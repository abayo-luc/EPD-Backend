import { Router } from "express";
import SalesController from "../controllers/SalesController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const salesRouters = Router();
salesRouters.use(authenticate);
salesRouters
  .get(
    "/sales",
    authorize.allow(["admin", "superAdmin"]),
    SalesController.index
  )
  .get(
    "/companies/:companyId/sales",
    authorize.allowOnlyMembers(["supervisor"]),
    SalesController.companySales
  )
  .get(
    "/companies/users/:id/sales",
    authorize.allow(["owner"]),
    SalesController.agentSales
  )
  .post(
    "/companies/:companyId/sales",
    authorize.allowOnlyMembers(["supervisor"]),
    SalesController.create
  )
  .get(
    "/companies/:companyId/sales/:salesId",
    authorize.allowOnlyMembers(["supervisor"]),
    SalesController.find
  )
  .get(
    "/companies/users/:id/sales/:salesId",
    authorize.allow(["owner"]),
    SalesController.find
  )
  .put(
    "/companies/:companyId/sales/:id",
    authorize.allowOnlyMembers(["supervisor"]),
    SalesController.update
  )
  .put(
    "/companies/users/:id/sales/:salesId",
    authorize.allow(["owner"]),
    SalesController.update
  );
export default salesRouters;
