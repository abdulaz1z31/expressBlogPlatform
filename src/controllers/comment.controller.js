import { ApiError, statusCodes } from "../utils/index.js";
import {
  createCommentService,
  getAllCommentsService,
  getCommentByIdService,
  updateCommentByIdService,
  deleteCommentByIdService,
} from "../service/comment.service.js";

export const createComment = async (req, res, next) => {
  try {
    const result = await createCommentService(req.body);
    const { success, error, comment } = result;
    if (success) {
      res.status(201).json(comment);
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const result = await getAllCommentsService();
    const { success, error, comments } = result;
    if (success) {
      res.status(200).json(comments);
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const result = await getCommentByIdService(req.params.id);
    const { success, error, comment } = result;
    if (success) {
      res.status(200).json(comment);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};

export const updateCommentById = async (req, res, next) => {
  try {
    const result = await updateCommentByIdService(req.params.id, req.body);
    const { success, error, comment } = result;
    if (success) {
      res.status(200).json(comment);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};

export const deleteCommentById = async (req, res, next) => {
  try {
    const result = await deleteCommentByIdService(req.params.id);
    const { success, error } = result;
    if (success) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
