import { ApiError, statusCodes } from "../utils/index.js";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
} from "../service/index.service.js";

export const createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    const { success, error, category } = result;
    if (success) {
      res.status(201).json(category);
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await getAllCategoriesService();
    const { success, error, categories } = result;
    if (success) {
      res.status(200).json(categories);
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const result = await getCategoryByIdService(req.params.id);
    const { success, error, category } = result;
    if (success) {
      res.status(200).json(category);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const result = await updateCategoryByIdService(req.params.id, req.body);
    const { success, error, category } = result;
    if (success) {
      res.status(200).json(category);
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    const result = await deleteCategoryByIdService(req.params.id);
    const { success, error } = result;
    if (success) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(statusCodes.NOT_FOUND).json({ error });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};
