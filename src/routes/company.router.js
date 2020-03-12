import { Router } from "express";
import CompanyController from "../controllers/CompanyController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const companyRouters = Router();
companyRouters.use(authenticate);
companyRouters
  .get(
    "/companies",
    authorize(["admin", "superAdmin"]),
    CompanyController.index
  )
  .post(
    "/companies",
    authorize(["admin", "superAdmin"]),
    CompanyController.create
  )
  .get("/companies/:id", CompanyController.find)
  .put(
    "/companies/:id",
    authorize(["admin", "superAdmin", "owner"]),
    CompanyController.update
  )
  .delete(
    "/companies/:id",
    authorize(["admin", "superAdmin"]),
    CompanyController.destroy
  );

export default companyRouters;
