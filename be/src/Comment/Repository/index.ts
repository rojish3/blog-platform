import Comment from "../../Model/comment.model";
import User from "../../Model/user.model";
import { IComment } from "../../types/comment.types";

export const createComment = async (data: IComment) => {
  try {
    const newComment = await Comment.create(data);
    const populatedComment = await Comment.findById(newComment._id).populate({
      path: "userId",
      select: "userName profilePicture",
      model: User,
    });

    return {
      status: 201,
      message: "Comment created successfully",
      data: populatedComment, // Return the populated comment data
    };
  } catch (error) {
    return error;
  }
};

export const getCommentByPostId = async (id: string) => {
  try {
    const post = await Comment.find({ postId: id }).populate({
      path: "userId",
      select: "userName profilePicture",
      model: User,
    });
    return post;
  } catch (error) {
    return error;
  }
};

export const getCommentById = async (id: string) => {
  try {
    const post = await Comment.findById(id).populate({
      path: "userId",
      select: "userName profilePicture",
      model: User,
    });
    return post;
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const comment = await Comment.findByIdAndDelete(id);
    return {
      status: 200,
      message: "Comment Deleted",
    };
  } catch (error) {
    return error;
  }
};

export const getCommentCount = async (id: string) => {
  try {
    const commentCount = await Comment.countDocuments({ postId: id });
    return commentCount;
  } catch (error) {
    return error;
  }
};

export const getCommentByUser = async (id: string) => {
  try {
    const comment = await Comment.find({ userId: id });
    return comment;
  } catch (error) {
    return error;
  }
};
