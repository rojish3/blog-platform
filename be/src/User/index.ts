import { Router } from "express";
import * as UserController from "./Controller";

const router = Router();

const routes = () => {
  //   router.get("/api/users", UserController.listUsers);
  //   router.post("/users", UserController.createUser);
  router.get("/users/:id", UserController.listUser);
  router.put("/users/", UserController.updateUser);
  return router;
};

export default routes;
