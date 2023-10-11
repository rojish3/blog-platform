import { Router } from "express";
import * as UserController from "./Controller";
import { upload } from "../config/multer";

const router = Router();

const routes = () => {
  router.get("/users", UserController.listUser);
  router.post(
    "/users",
    upload.single("profilePicture"),
    UserController.createUser
  );
  // router.get("/users/:id", UserController.listUser);
  router.put("/users/:id", UserController.updateUser);
  return router;
};

export default routes;
