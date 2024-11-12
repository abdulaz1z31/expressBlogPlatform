import { Router } from "express";
import {
  createArticle,
  deleteArticleById,
  getAllArticles,
  getArticleById,
  updateArticleById,
} from "../controllers/index.controller.js";
import { validationMiddleware , checkTokens, roleGuard, isSelfRoleGuard, isSelfArticle} from "../middlewares/index.middleware.js";
import { articleSchema } from "../database/schema/article.schema.js";

export const articleRouter = Router();

articleRouter.post("/article", checkTokens, validationMiddleware(articleSchema), createArticle);
articleRouter.get("/article", checkTokens, roleGuard("admin", "superAdmin"), getAllArticles);
articleRouter.get("/article/:id", checkTokens, isSelfArticle("admin", "superAdmin"), getArticleById);
articleRouter.put("/article/:id", checkTokens, isSelfArticle("admin", "superAdmin"), updateArticleById);
articleRouter.delete("/article/:id", checkTokens, isSelfArticle("admin", "superAdmin"), deleteArticleById);
