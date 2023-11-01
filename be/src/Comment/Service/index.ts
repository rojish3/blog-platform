import * as CommentRepository from "../Repository";

export const createComment = async (data: any) => {
  try {
    const newComment = await CommentRepository.createComment(data);
    return newComment;
  } catch (error) {
    return error;
  }
};

export const getCommentByPostId = async (id: any) => {
  try {
    const comment = await CommentRepository.getCommentByPostId(id);
    return comment;
  } catch (error) {
    return error;
  }
};

export const getCommentById = async (id: any) => {
  try {
    const comment = await CommentRepository.getCommentById(id);
    return comment;
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (id: any) => {
  try {
    const comment = await CommentRepository.deleteComment(id);
    return comment;
  } catch (error) {
    return error;
  }
};

export const getCommentCount = async (id: any) => {
  try {
    const commentCount = await CommentRepository.getCommentCount(id);
    return commentCount;
  } catch (error) {
    return error;
  }
};

export const getCommentByUser = async (id: string) => {
  try {
    const comment = await CommentRepository.getCommentByUser(id);
    return comment;
  } catch (error) {
    return;
  }
};
