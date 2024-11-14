import { ApiError, statusCodes } from "../utils/index.js";
import {
  createArticleService,
  getAllArticlesService,
  getArticleByIdService,
  updateArticleByIdService,
  deleteArticleByIdService,
} from "../service/article.service.js";
import { logger } from "../utils/logger.js"; 

export const createArticle = async (req, res, next) => {
  try {
    const result = await createArticleService(req.body);
    const { success, error, article } = result;
    if (success) {
      logger.info("Article created successfully", { article });
      res.status(201).json(article);
    } else {
      logger.warn("Article creation failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in createArticle", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllArticles = async (req, res, next) => {
  try {
    const result = await getAllArticlesService();
    const { success, error, articles } = result;
    if (success) {
      logger.info("Fetched all articles successfully", { articles });
      res.status(200).json(articles);
    } else {
      logger.warn("Fetching articles failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in getAllArticles", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const result = await getArticleByIdService(req.params.id);
    const { success, error, article } = result;
    if (success) {
      logger.info("Fetched article by ID successfully", { article });
      res.status(200).json(article);
    } else {
      logger.warn("Article not found", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in getArticleById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    const result = await updateArticleByIdService(
      req.params.id,
      req.body,
      req.user.id
    );
    const { success, error, article } = result;
    if (success) {
      logger.info("Article updated successfully", { article });
      res.status(200).json(article);
    } else {
      logger.warn("Article update failed", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in updateArticleById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const result = await deleteArticleByIdService(req.params.id);
    const { success, error } = result;
    if (success) {
      logger.info("Article deleted successfully", { id: req.params.id });
      res.status(200).json({ message: "Article deleted successfully" });
    } else {
      logger.warn("Article deletion failed", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in deleteArticleById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};
