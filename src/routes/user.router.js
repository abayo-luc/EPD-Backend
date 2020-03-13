import { Router } from "express";
import UserController from "../controllers/UserController";
import authenticate from "../middleware/authenticate";
import authorize, { roleAssignable } from "../middleware/authorize";

const userRouters = Router();
userRouters.use(authenticate);
userRouters
  .get("/users", authorize.allow(["admin"]), UserController.index)
  .post(
    "/users",

    authorize.allow(["admin", "superAdmin"]),
    roleAssignable,
    UserController.create
  )
  .post(
    "/companies/:companyId/users",
    authorize.allowOnlyMembers(["supervisor"]),
    roleAssignable,
    UserController.create
  )
  .get(
    "/users/:id",

    authorize.allow(["admin", "superAdmin", "owner"]),
    UserController.find
  )
  .get(
    "/companies/:companyId/users/:id",
    authorize.allowOnlyMembers(["owner", "supervisor"]),
    UserController.find
  )
  .put(
    "/users/:id",

    authorize.allow(["admin", "owner"]),
    UserController.update
  )
  .put(
    "/users/:id/passwords",

    authorize.allow(["admin", "owner"]),
    UserController.updatePassword
  );
export default userRouters;
