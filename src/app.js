import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger.js";

import mocksRouter from "./routes/mocks.router.js";
import adoptionRouter from "./routes/adoption.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
