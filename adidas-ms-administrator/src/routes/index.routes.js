import { healthCheck } from "./healthCheck.routes";
import { adminToken } from './adminToken.routes';

export const initRoutes = (app) => {
  app.use("/", healthCheck());
  app.use("/admin-token", adminToken());
};
