import { ApiError, statusCodes } from "../utils/index.js";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
} from "../service/index.service.js";
import { logger } from "../utils/logger.js"; // Logger import qilindi

export const createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    const { success, error, category } = result;
    if (success) {
      logger.info("Category created successfully", { category });
      res.status(201).json(category);
    } else {
      logger.warn("Category creation failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in createCategory", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await getAllCategoriesService();
    const { success, error, categories } = result;
    if (success) {
      logger.info("Fetched all categories successfully", { categories });
      res.status(200).json(categories);
    } else {
      logger.warn("Fetching categories failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in getAllCategories", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const result = await getCategoryByIdService(req.params.id);
    const { success, error, category } = result;
    if (success) {
      logger.info("Fetched category by ID successfully", { category });
      res.status(200).json(category);
    } else {
      logger.warn("Category not found", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in getCategoryById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const result = await updateCategoryByIdService(req.params.id, req.body);
    const { success, error, category } = result;
    if (success) {
      logger.info("Category updated successfully", { category });
      res.status(200).json(category);
    } else {
      logger.warn("Category update failed", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in updateCategoryById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    const result = await deleteCategoryByIdService(req.params.id);
    const { success, error } = result;
    if (success) {
      logger.info("Category deleted successfully", { id: req.params.id });
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      logger.warn("Category deletion failed", { id: req.params.id, error });
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    logger.error("Error in deleteCategoryById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};
