import { Router } from "express";
import {
  createArticle,
  deleteArticleById,
  getAllArticles,
  getArticleById,
  updateArticleById,
} from "../controllers/index.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { articleSchema } from "../database/schema/article.schema.js";

export const articleRouter = Router();

articleRouter.post("/article", validationMiddleware(articleSchema), createArticle);
articleRouter.get("/article", getAllArticles);
articleRouter.get("/article/:id", getArticleById);
articleRouter.put("/article/:id", updateArticleById);
articleRouter.delete("/article/:id", deleteArticleById);
