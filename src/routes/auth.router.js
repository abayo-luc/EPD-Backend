import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authenticate from "../middleware/authenticate";

const authRouters = Router();
authRouters
  .post("/authentication/sign-in", AuthController.signIn)
  .get("/authentication/current", authenticate, AuthController.currentUser);
export default authRouters;
