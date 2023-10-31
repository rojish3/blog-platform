import { Router } from "express";
import * as PostController from "./Controller";
import { upload } from "../config/multer";
import { validateUserData } from "../middleware/validateUserData";
import { postSchema } from "../schema/postSchema";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

const routes = () => {
  router.post(
    "/",
    // validateUserData(postSchema),
    verifyToken,
    upload.single("image"),
    PostController.createPost
  );
  router.get("/", PostController.listAllPost);
  router.get("/getposts", verifyToken, PostController.listPostBySingleUser);
  router.get("/:id", PostController.getPostById);
  router.patch(
    "/:id",
    verifyToken,
    upload.single("image"),
    PostController.updatePost
  );
  router.delete("/:id", verifyToken, PostController.deletePost);
  return router;
};
export default routes;
