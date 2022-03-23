import { Router } from "express";
const router = Router();
import { verifyToken } from "../middlewares/token.middleware";

// Controller
import { create, getAll, getById, removeSubscription } from "../controller/subscription.controller";

export const subscription = () => {
  router.post("/", verifyToken, create);
  router.get("/", verifyToken, getAll);
  router.get("/:subscriptionId", verifyToken, getById);
  router.delete("/:email", verifyToken, removeSubscription);

  return router;
};
