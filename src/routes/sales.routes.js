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
    "/companies/:companyId/users/:id/sales",
    authorize.allow(["owner"]),
    SalesController.agentSales
  )
  .post(
    "/companies/:companyId/sales",
    authorize.allowOnlyMembers(["supervisor", "agent"]),
    SalesController.create
  )
  .get(
    "/companies/:companyId/sales/:salesId",
    authorize.allowOnlyMembers(["supervisor"]),
    SalesController.find
  )
  .get(
    "/companies/:companyId/users/:id/sales/:salesId",
    authorize.allow(["owner"]),
    SalesController.find
  )
  .put(
    "/companies/:companyId/sales/:id",
    authorize.allowOnlyMembers(["supervisor"]),
    SalesController.update
  )
  .put(
    "/companies/:companyId/users/:id/sales/:salesId",
    authorize.allow(["owner"]),
    SalesController.update
  )
  .delete(
    "/companies/:companyId/users/:id/sales/:salesId",
    authorize.allow(["owner"]),
    SalesController.delete
  )
  .put(
    "/companies/:companyId/sales/:id/reverts",
    authorize.allow(["supervisor", "admin"]),
    SalesController.revertSales
  );
export default salesRouters;
