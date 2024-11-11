import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateUserById,
} from "../controllers/index.controller.js";
import validationMiddleware from "../middlewares/index.middleware.js";
import { categorySchema } from "../database/schema/cartegory.schema.js";

export const cartegoryRouter = Router();

cartegoryRouter.post("/cartegory", validationMiddleware(categorySchema), createCategory);
cartegoryRouter.get("/cartegory", getAllCategories);
cartegoryRouter.get("/cartegory/:id", getCategoryById);
cartegoryRouter.post("/cartegory/:id", updateUserById);
cartegoryRouter.delete("/cartegory/:id", deleteCategoryById);
