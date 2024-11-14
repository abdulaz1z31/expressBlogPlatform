import { ApiError, statusCodes } from "../utils/index.js";
import {
  createCommentService,
  getAllCommentsService,
  getCommentByIdService,
  updateCommentByIdService,
  deleteCommentByIdService,
} from "../service/comment.service.js";
import { logger } from "../utils/logger.js"; 

export const createComment = async (req, res, next) => {
  try {
    const result = await createCommentService(req.body);
    const { success, error, comment } = result;
    if (success) {
      logger.info("Comment created successfully", { comment });
      res.status(201).json(comment);
    } else {
      logger.warn("Comment creation failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in createComment", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const result = await getAllCommentsService();
    const { success, error, comments } = result;
    if (success) {
      logger.info("Fetched all comments successfully", { comments });
      res.status(200).json(comments);
    } else {
      logger.warn("Fetching comments failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in getAllComments", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const result = await getCommentByIdService(req.params.id);
    const { success, error, comment } = result;
    if (success) {
      logger.info("Fetched comment by ID successfully", { comment });
      res.status(200).json(comment);
    } else {
      logger.warn("Comment not found", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in getCommentById", { error });
    next(new ApiError(error.statusCode, error));
  }
};

export const updateCommentById = async (req, res, next) => {
  try {
    const result = await updateCommentByIdService(req.params.id, req.body);
    const { success, error, comment } = result;
    if (success) {
      logger.info("Comment updated successfully", { comment });
      res.status(200).json(comment);
    } else {
      logger.warn("Comment update failed", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in updateCommentById", { error });
    next(new ApiError(error.statusCode, error));
  }
};

export const deleteCommentById = async (req, res, next) => {
  try {
    const result = await deleteCommentByIdService(req.params.id);
    const { success, error } = result;
    if (success) {
      logger.info("Comment deleted successfully", { id: req.params.id });
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      logger.warn("Comment deletion failed", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in deleteCommentById", { error });
    next(new ApiError(error.statusCode, error));
  }
};
