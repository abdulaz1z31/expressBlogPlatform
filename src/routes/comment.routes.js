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

export const commentRouter = Router();

commentRouter.post("/comment", validationMiddleware(commentSchema), createComment);
commentRouter.get("/comment", getAllComments);
commentRouter.get("/comment/:id", getCommentById);
commentRouter.post("/comment/:id", updateCommentById);
commentRouter.delete("/comment/:id", deleteCommentById);
