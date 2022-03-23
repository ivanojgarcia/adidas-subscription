import { Router } from "express";
const router = Router();
import { verifyToken } from "../middlewares/token.middleware";

// Controller
import { send } from "../controller/notification.controller";

export const notification = () => {
  router.post("/send-email", verifyToken, send);

  return router;
};
