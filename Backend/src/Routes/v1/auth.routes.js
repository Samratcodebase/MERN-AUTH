import express from "express";

const AuthRouter = express.Router();
import AuthController from "../../controllers/auth.contoller.js";
import { Protect } from "../../middlewares/Auth.middleware.js";

AuthRouter.post("/checkauth", Protect, AuthController.checkAuth);
AuthRouter.post("/signup", AuthController.signup);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", AuthController.logout);
AuthRouter.post("/verify", AuthController.verifyEmail);
AuthRouter.post("/forgot-password", AuthController.forgotPassword);
AuthRouter.post("/rest-password/:id", AuthController.restPassword);

export default AuthRouter;
