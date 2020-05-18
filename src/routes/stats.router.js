import { Router } from "express";
import SalesStatsController from "../controllers/StatsController/SalesStats";
import CompanyStatsController from "../controllers/StatsController/CompanyStats";

const StatsRouter = Router();

StatsRouter.get(
  "/statistics/sales_vs_months",
  SalesStatsController.salesVsMonths
)
  .get("/statistics/sales_vs_companies", SalesStatsController.salesVsCompany)
  .get("/statistics/total_sales", SalesStatsController.totalSales)
  .get("/statistics/total_companies", CompanyStatsController.totalCompanies)
  .get("/statistics/week_sales", SalesStatsController.weekSales);
export default StatsRouter;
