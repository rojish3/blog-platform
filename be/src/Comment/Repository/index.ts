import Comment from "../../Model/comment.model";
import User from "../../Model/user.model";

export const createComment = async (data: any) => {
  try {
    console.log(data);
    const newComment = await Comment.create(data);
    return {
      status: 201,
      message: "Comment created successfully",
      data: newComment,
    };
  } catch (error) {
    return error;
  }
};

export const getCommentByPostId = async (id: any) => {
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

export const getCommentById = async (id: any) => {
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

export const deleteComment = async (id: any) => {
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

export const getCommentCount = async (id: any) => {
  try {
    const commentCount = await Comment.countDocuments({ postId: id });
    return commentCount;
  } catch (error) {
    return error;
  }
};
