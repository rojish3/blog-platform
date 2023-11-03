import { IPost } from "../../types/post.types";
import Post from "../../Model/post.model";
import User from "../../Model/user.model";
import { IQuery } from "../../types/query.types";

export const createPost = async (post: IPost) => {
  try {
    const newPost = await Post.create(post);
    return {
      status: 201,
      message: "Post created successfully",
      data: newPost,
    };
  } catch (error) {
    return error;
  }
};

export const listAllPost = async (query: IQuery) => {
  try {
    const { page, limit, skip, filters, sort } = query;
    const totalPosts = await Post.countDocuments();
    const post = await Post.find(filters)
      .populate({
        path: "userId",
        select: "userName profilePicture",
        model: User,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return {
      status: 200,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts: totalPosts,
      data: post,
    };
  } catch (error) {
    return error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await Post.findById(id).populate({
      path: "userId",
      select: "userName profilePicture",
      model: User,
    });
    if (post) {
      post.views += 1;
      await post.save();
    }
    return post;
  } catch (error) {
    return error;
  }
};

export const listPostBySingleUser = async (id: string) => {
  try {
    const post = await Post.find({ userId: id }).populate({
      path: "userId",
      select: "userName profilePicture",
      model: User,
    });
    return post;
  } catch (error) {
    return error;
  }
};

export const updatePost = async (data: IPost) => {
  try {
    const { id, ...updateData } = data;

    const post = await Post.findById(id);
    if (post) {
      Object.assign(post, updateData); // Update the post with new data

      const updatedPost = await post.save();
      return {
        status: 200,
        message: "Update successful",
        data: updatedPost,
      };
    }
  } catch (error) {
    return error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    return {
      status: 200,
      message: "Post deleted",
    };
  } catch (error) {
    return error;
  }
};
