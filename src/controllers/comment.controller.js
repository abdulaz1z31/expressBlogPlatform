import { ApiError } from "../utils/index.js";
import { Comment } from "../database/models/index.model.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw new ApiError(404, "Comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const updateCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) throw new ApiError(404, "Comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const deleteCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) throw new ApiError(404, "Comment not found");
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};
