import { Request, Response } from "express";
import * as PostService from "../Service";

export const createPost = async (req: Request, res: Response) => {
  try {
    const image = req.file?.filename;
    console.log(req.body, image);
    res.status(200).json(await PostService.createPost({ ...req.body, image }));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const listAllPost = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await PostService.listAllPost());
  } catch (error) {
    res.status(400).json(error);
  }
};
