import { Router } from "express";
import userRouters from "./user.router";
import authRouters from "./auth.router";
import companyRouters from "./company.router";
import salesRouters from "./sales.routes";

const routers = Router();

routers.use([authRouters, userRouters, companyRouters, salesRouters]);

export default routers;
