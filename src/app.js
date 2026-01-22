import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger.js";

import mocksRouter from "./routes/mocks.router.js";
import adoptionRouter from "./routes/adoption.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/adoptionDB");

app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
