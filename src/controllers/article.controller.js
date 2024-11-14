import { ApiError, statusCodes } from "../utils/index.js";
import {
  createArticleService,
  getAllArticlesService,
  getArticleByIdService,
  updateArticleByIdService,
  deleteArticleByIdService,
} from "../service/article.service.js";

export const createArticle = async (req, res, next) => {
  try {
    const result = await createArticleService(req.body);
    const { success, error, article } = result;
    if (success) {
      res.status(201).json(article);
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllArticles = async (req, res, next) => {
  try {
    const result = await getAllArticlesService();
    const { success, error, articles } = result;
    if (success) {
      res.status(200).json(articles);
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const result = await getArticleByIdService(req.params.id);
    const { success, error, article } = result;
    if (success) {
      res.status(200).json(article);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
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
      res.status(200).json(article);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const result = await deleteArticleByIdService(req.params.id);
    const { success, error } = result;
    if (success) {
      res.status(200).json({ message: "Article deleted successfully" });
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
