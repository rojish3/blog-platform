import { IComment } from "../../types/comment.types";
import * as CommentRepository from "../Repository";

export const createComment = async (data: IComment) => {
  try {
    const newComment = await CommentRepository.createComment(data);
    return newComment;
  } catch (error) {
    return error;
  }
};

export const getCommentByPostId = async (id: string) => {
  try {
    const comment = await CommentRepository.getCommentByPostId(id);
    return comment;
  } catch (error) {
    return error;
  }
};

export const getCommentById = async (id: string) => {
  try {
    const comment = await CommentRepository.getCommentById(id);
    return comment;
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const comment = await CommentRepository.deleteComment(id);
    return comment;
  } catch (error) {
    return error;
  }
};

export const getCommentCount = async (id: string) => {
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
