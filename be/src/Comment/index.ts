import { Router } from "express";
import * as CommentController from "./Controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const routes = () => {
  router.post("/", verifyToken, CommentController.createComment);
  router.get("/:id", verifyToken, CommentController.getCommentByPostId);
  router.delete("/:id", verifyToken, CommentController.deleteComment);
  router.get("/getcomment", verifyToken, CommentController.getCommentByUser);
  router.get("/count/:postId", CommentController.getCommentCount);
  return router;
};
export default routes;
