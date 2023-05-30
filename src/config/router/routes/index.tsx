import { authRoutesDontRequireAuthentication } from "./auth";
import { billingRoutes } from "./billing";
import { homeRoutes } from "./home";
import { notFoundRoutes } from "./notFound";
import { notificationRoutes } from "./notifications";
import { payrollRoutes } from "./payroll";
import { selfServiceRoutes } from "./selfService";
import { settingRoutes } from "./settings";
import { systemAdminRoutes } from "./systemAdmins";

export const appPagesData = [
  ...authRoutesDontRequireAuthentication,
  ...billingRoutes,
  ...homeRoutes,
  ...notFoundRoutes,
  ...notificationRoutes,
  ...payrollRoutes,
  ...selfServiceRoutes,
  ...settingRoutes,
  ...systemAdminRoutes,
];