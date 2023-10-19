import { IPost } from "../../types/post.types";
import Post from "../../Model/post.model";

export const createPost = async (post: IPost) => {
  try {
    const newPost = Post.create(post);
    return {
      status: 201,
      message: "Post created successfully",
      data: newPost,
    };
  } catch (error) {
    return error;
  }
};

export const listAllPost = async () => {
  try {
    const allPosts = Post.find();
    return allPosts;
  } catch (error) {
    return error;
  }
};
