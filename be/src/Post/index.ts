import { Router } from "express";
import * as PostController from "./Controller";
import { upload } from "../config/multer";
import { validateUserData } from "../middleware/validateUserData";
import { postSchema } from "../schema/postSchema";

const router = Router();

const routes = () => {
  router.post(
    "/",
    // validateUserData(postSchema),
    upload.single("image"),
    PostController.createPost
  );
  router.get("/", PostController.listAllPost);
  return router;
};
export default routes;
