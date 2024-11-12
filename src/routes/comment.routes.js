import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  updateCommentById,
} from "../controllers/index.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { commentSchema } from "../database/schema/index.schema.js";
import { checkTokens, isSelfComment } from "../middlewares/index.middleware.js";

export const commentRouter = Router();

commentRouter.post("/comment", checkTokens, validationMiddleware(commentSchema), createComment);
commentRouter.get("/comment", checkTokens, getAllComments);
commentRouter.get("/comment/:id", checkTokens, getCommentById);
commentRouter.post("/comment/:id", checkTokens, isSelfComment("admin", "superAdmin"), updateCommentById);
commentRouter.delete("/comment/:id", checkTokens, isSelfComment("admin", "superAdmin"), deleteCommentById);
