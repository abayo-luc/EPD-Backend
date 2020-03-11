import { Router } from "express";
import UserController from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import authorize, { roleAssignable } from "../middleware/authorize";

const userRouters = Router();
userRouters
  .get("/users", authenticate, authorize(["admin"]), UserController.index)
  .post(
    "/users",
    authenticate,
    authorize(["admin", "superAdmin", "supervisor"]),
    roleAssignable,
    UserController.create
  )
  .get(
    "/users/:id",
    authenticate,
    authorize(["admin", "superAdmin", "owner", "supervisor"]),
    UserController.find
  )
  .put(
    "/users/:id",
    authenticate,
    authorize(["admin", "owner"]),
    UserController.update
  )
  .put(
    "/users/:id/passwords",
    authenticate,
    authorize(["admin", "owner"]),
    UserController.updatePassword
  );
export default userRouters;
