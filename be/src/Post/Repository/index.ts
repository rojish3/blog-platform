import { IPost } from "../../types/post.types";
import Post from "../../Model/post.model";

export const createPost = async (post: IPost) => {
  try {
    console.log(post);
    const newPost = Post.create(post);
    return "Post created successfully";
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
