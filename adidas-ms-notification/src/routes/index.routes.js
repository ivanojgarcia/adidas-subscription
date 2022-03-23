import { healthCheck } from "./healthCheck.routes";
import { notification } from "./notification.routes";

export const initRoutes = (app) => {
  app.use("/", healthCheck());
  app.use("/notification", notification());
};
