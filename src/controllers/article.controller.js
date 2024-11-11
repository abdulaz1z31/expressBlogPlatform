import { ApiError } from "../utils/index.js";
import { Article } from "../database/models/index.model.js";

export const createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) throw new ApiError(404, "Article not found");
    res.status(200).json(article);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) throw new ApiError(404, "Article not found");
    res.status(200).json(article);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) throw new ApiError(404, "Article not found");
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
