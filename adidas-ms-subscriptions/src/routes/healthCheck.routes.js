import { Router } from "express";
const router = Router();

// Controller
import { getHealthCheck } from "../controller/healthCheck.controller";

export const healthCheck = () => {
  router.get("/", getHealthCheck);

  return router;
};
