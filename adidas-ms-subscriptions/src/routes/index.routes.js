import { healthCheck } from "./healthCheck.routes";
import { subscription } from "./subscription.routes";

export const initRoutes = (app) => {
  app.use("/", healthCheck());
  app.use("/subscription", subscription());
};
