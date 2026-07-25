import express from "express";
import v1Router from "../Routes/v1/index.js";

const AppRouter = express.Router();

AppRouter.use("/v1", v1Router);

export default AppRouter;
