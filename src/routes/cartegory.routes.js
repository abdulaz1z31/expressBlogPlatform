import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateUserById,
} from "../controllers/index.controller.js";
import {checkTokens, roleGuard, validationMiddleware} from "../middlewares/index.middleware.js";
import { categorySchema } from "../database/schema/cartegory.schema.js";

export const cartegoryRouter = Router();

cartegoryRouter.post("/cartegory", checkTokens, roleGuard("admin", "superAdmin"), validationMiddleware(categorySchema), createCategory);
cartegoryRouter.get("/cartegory", checkTokens, roleGuard("admin", "superAdmin"), getAllCategories);
cartegoryRouter.get("/cartegory/:id", checkTokens, roleGuard("admin", "superAdmin"), getCategoryById);
cartegoryRouter.post("/cartegory/:id", checkTokens, roleGuard("admin", "superAdmin"), updateUserById);
cartegoryRouter.delete("/cartegory/:id", checkTokens, roleGuard("admin", "superAdmin"), deleteCategoryById);
