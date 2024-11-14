import { Comment } from "../database/models/index.model.js";

export const createCommentService = async (data) => {
  try {
    const comment = new Comment(data);
    await comment.save();
    return { success: true, error: null, comment };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllCommentsService = async () => {
  try {
    const comments = await Comment.find();
    return { success: true, error: null, comments };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCommentByIdService = async (id) => {
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return { success: false, error: "Comment not found" };
    }
    return { success: true, error: null, comment };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateCommentByIdService = async (id, data) => {
  try {
    const { content } = data;
    const comment = await Comment.findById(id);
    if (!comment) {
      return { success: false, error: "Comment not found" };
    }
    comment.content = content;
    await comment.save();
    return { success: true, error: null, comment };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteCommentByIdService = async (id) => {
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return { success: false, error: "Comment not found" };
    }
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
