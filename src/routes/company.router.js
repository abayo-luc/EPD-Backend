import { Router } from "express";
import CompanyController from "../controllers/CompanyController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const companyRouters = Router();
companyRouters.use(authenticate);
companyRouters
  .get(
    "/companies",
    authorize.allow(["admin", "superAdmin"]),
    CompanyController.index
  )
  .post(
    "/companies",
    authorize.allow(["admin", "superAdmin"]),
    CompanyController.create
  )
  .get(
    "/companies/:id",
    authorize.allowOnlyMembers(["agent", "supervisor"]),
    CompanyController.find
  )
  .put(
    "/companies/:id",
    authorize.allowOnlyMembers(["supervisor"]),
    CompanyController.update
  )
  .delete(
    "/companies/:id",
    authorize.allow(["admin", "superAdmin"]),
    CompanyController.destroy
  );

export default companyRouters;
