import { Router } from "express";
import {
  likePost,
  likesCount,
  unlikePost,
} from "./Controller/reactionController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

const routes = () => {
  router.post("/like/:postId", verifyToken, likePost);
  router.post("/unlike/:postId", verifyToken, unlikePost);
  router.get("/count/:postId", likesCount);
  return router;
};

export default routes;
