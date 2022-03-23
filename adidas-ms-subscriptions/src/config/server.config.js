import express from "express";
import { initRoutes } from "../routes/index.routes";
import morgan from "morgan";

// Application Intance
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Group Routes
initRoutes(app);

export default app;
