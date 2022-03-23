import { Router } from "express";
const router = Router();

// Controller
import { create, login, verifyToken } from "../controller/adminToken.controller";

export const adminToken = () => {
  router.post("/create", create);
  router.post("/login", login);
  router.post("/verify-token", verifyToken);
  return router;
};
