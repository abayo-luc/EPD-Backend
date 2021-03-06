import { Router } from "express";
import userRouters from "./user.router";
import authRouters from "./auth.router";
import companyRouters from "./company.router";
import salesRouters from "./sales.routes";
import StatsRouter from "./stats.router";
import ItemsRouter from "./item.router";

const routers = Router();

routers.use([
  authRouters,
  userRouters,
  companyRouters,
  salesRouters,
  StatsRouter,
  ItemsRouter
]);

export default routers;
