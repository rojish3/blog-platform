import * as PostRepository from "../Repository";
import { IPost } from "../../types/post.types";
import { IQuery } from "../../types/query.types";

export const createPost = async (post: IPost) => {
  try {
    const newPost = await PostRepository.createPost(post);
    return newPost;
  } catch (error) {
    return error;
  }
};

export const listAllPost = async (query: IQuery) => {
  try {
    const allPost = await PostRepository.listAllPost(query);
    return allPost;
  } catch (error) {
    return error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await PostRepository.getPostById(id);
    return post;
  } catch (error) {
    return error;
  }
};

export const listPostBySingleUser = async (id: string) => {
  try {
    const userPost = await PostRepository.listPostBySingleUser(id);
    return userPost;
  } catch (error) {
    return error;
  }
};

export const updatePost = async (data: IPost) => {
  try {
    const updatedPost = await PostRepository.updatePost(data);
    return updatedPost;
  } catch (error) {
    return error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const deletedPost = await PostRepository.deletePost(id);
    return deletedPost;
  } catch (error) {
    return error;
  }
};
