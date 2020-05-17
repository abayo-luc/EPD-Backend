import { Router } from "express";
import SalesStatsController from "../controllers/StatsController/SalesStats";

const StatsRouter = Router();

StatsRouter.get(
  "/statistics/sales_vs_months",
  SalesStatsController.salesVsMonths
).get("/statistics/sales_vs_companies", SalesStatsController.salesVsCompany);
export default StatsRouter;
