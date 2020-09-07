import { Router } from "express";
import SalesStatsController from "../controllers/StatsController/SalesStats";
import CompanyStatsController from "../controllers/StatsController/CompanyStats";
import authorize from "../middleware/authorize";

const StatsRouter = Router();

StatsRouter.get(
  "/statistics/sales_vs_months",
  authorize.allow(["superAdmin", "admin", "supervisor"]),
  SalesStatsController.salesVsMonths
)
  .get(
    "/statistics/sales_vs_companies",
    authorize.allow(["superAdmin", "admin"]),
    SalesStatsController.salesVsCompany
  )
  .get(
    "/statistics/sales_vs_agents",
    authorize.allow(["supervisor"]),
    SalesStatsController.salesVsAgents
  )
  .get(
    "/statistics/total_sales",
    authorize.allow(["superAdmin", "admin", "supervisor"]),
    SalesStatsController.totalSales
  )
  .get(
    "/statistics/total_drafts",
    authorize.allow(["supervisor"]),
    SalesStatsController.totalDrafts
  )
  .get(
    "/statistics/total_companies",
    authorize.allow(["superAdmin", "admin"]),
    CompanyStatsController.totalCompanies
  )
  .get(
    "/statistics/week_sales",
    authorize.allow(["superAdmin", "admin", "supervisor"]),
    SalesStatsController.weekSales
  )
  .get(
    "/statistics/total_agents",
    authorize.allow(["superAdmin", "admin", "supervisor"]),
    SalesStatsController.totalAgents
  );

export default StatsRouter;
