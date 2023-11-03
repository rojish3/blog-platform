import { Request, Response } from "express";
import * as CommentService from "../Service";
import { IResponse } from "../../types/response.types";

export const createComment = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const userId = user.id;
    // console.log(userId);
    const profilePicture = user.profilePicture;
    const { status, message, data } = (await CommentService.createComment({
      ...req.body,
      userId,
      profilePicture,
    })) as IResponse;
    res.status(status).json({ message, data });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCommentByPostId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(id);
    res.status(200).json(await CommentService.getCommentByPostId(id));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { status, message } = (await CommentService.deleteComment(
      id
    )) as IResponse;
    res.status(status).json(message);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCommentCount = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    res.status(200).json(await CommentService.getCommentCount(postId));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCommentByUser = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    // console.log(user);
    const userId = user.id;
    res.status(200).json(await CommentService.getCommentByUser(userId));
  } catch (error) {
    res.status(400).json(error);
  }
};
