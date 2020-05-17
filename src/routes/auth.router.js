import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authenticate from "../middleware/authenticate";
import PasswordController from "../controllers/PasswordController";

const authRouters = Router();
authRouters
  .post("/authentication/sign-in", AuthController.signIn)
  .post("/password/forget", PasswordController.getOneTimeCode)
  .post("/password/reset_token", PasswordController.getResetToken)
  .put("/password/update", PasswordController.updatePassword)
  .get("/authentication/current", authenticate, AuthController.currentUser);
export default authRouters;
