import { Request, Response } from "express";
import * as PostService from "../Service";
import { IResponse } from "../../types/response.types";
export const createPost = async (req: Request, res: Response) => {
  try {
    const image = req.file?.filename;
    const { status, message, data } = (await PostService.createPost({
      ...req.body,
      image,
    })) as IResponse;
    res.status(status).json({ message, data });
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
