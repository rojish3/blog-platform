import * as PostRepository from "../Repository";
import { IPost } from "../../types/post.types";

export const createPost = async (post: IPost) => {
  try {
    const newPost = PostRepository.createPost(post);
    return newPost;
  } catch (error) {
    return error;
  }
};

export const listAllPost = async () => {
  try {
    const allPost = PostRepository.listAllPost();
    return allPost;
  } catch (error) {
    return error;
  }
};
