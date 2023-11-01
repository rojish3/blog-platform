import { Request, Response } from "express";
import * as PostService from "../Service";
import { IResponse } from "../../types/response.types";
import { IPost } from "../../types/post.types";

interface IBlogResponse {
  status: number;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  data: IPost;
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const image = req.file?.filename;
    const user = res.locals.user;
    const userId = user.id;
    const userName = user.userName;
    const { status, message, data } = (await PostService.createPost({
      ...req.body,
      image,
      userId,
      userName,
    })) as IResponse;
    res.status(status).json({ message, data });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const listAllPost = async (req: Request, res: Response) => {
  try {
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    let skip = (page - 1) * limit;

    const filters: { [key: string]: any } = {};
    if (req.query.searchQuery) {
      filters.title = new RegExp(req.query.searchQuery as string, "i");
    }
    if (req.query.category) {
      filters.category = req.query.category as string;
    }

    const sort: { [key: string]: number } = {};
    if (req.query.sortBy === "latest") {
      sort.createdAt = -1; // Sort by newest to oldest
    } else if (req.query.sortBy === "oldest") {
      sort.createdAt = 1; // Sort by oldest to newest
    } else if (req.query.sortBy === "popular") {
      sort.views = -1; // Sort by views in descending order
    }
    const { status, currentPage, totalPages, totalPosts, data } =
      (await PostService.listAllPost({
        page,
        limit,
        skip,
        filters,
        sort,
      })) as IBlogResponse;

    res.status(status).json({ currentPage, totalPages, totalPosts, data });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).json(await PostService.getPostById(id));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const listPostBySingleUser = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const id = user.id;

    res.status(200).json(await PostService.listPostBySingleUser(id));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const image = req.file?.filename;
    const user = res.locals.user;
    const userId = user.id;
    const userName = user.userName;
    const id = req.params.id;
    const { status, message, data } = (await PostService.updatePost({
      id,
      ...req.body,
      image,
      userId,
      userName,
    })) as IResponse;
    res.status(status).json({ message, data });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).json(await PostService.deletePost(id));
  } catch (error) {
    res.status(400).json(error);
  }
};
