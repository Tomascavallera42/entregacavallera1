import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./routes/mocks.router.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mockingDB");

app.use("/api/mocks", mocksRouter);

export default app;
