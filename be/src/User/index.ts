import { Router } from "express";
import * as UserController from "./Controller";
import { upload } from "../config/multer";
import { validateUserData } from "../middleware/validateUserData";
import { signupSchema } from "../schema/signupSchema";
import { loginSchema } from "../schema/loginSchema";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

const routes = () => {
  router.get("/", verifyToken, UserController.listUser);
  router.post(
    "/register",
    validateUserData(signupSchema),
    UserController.createUser
  );
  router.post(
    "/login",
    validateUserData(loginSchema),
    UserController.loginUser
  );
  router.get("/logout", UserController.logoutUser);
  router.get("/getuser", verifyToken, UserController.getLoggedInUserData);
  router.get("/loggedin", UserController.loginStatus);
  // router.get("/:id", UserController.loginStatus);
  router.patch("/", verifyToken, UserController.updateUser);
  router.patch("/change-password", verifyToken, UserController.changePassword);
  router.post("/forgot-password", UserController.forgotPassword);
  router.post("/reset-password", UserController.resetPassword);
  return router;
};

export default routes;
