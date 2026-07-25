import express from "express";
import AuthRouter from "./auth.routes.js";

const v1Router = express.Router();

v1Router.use("/auth", AuthRouter);
export default v1Router;
