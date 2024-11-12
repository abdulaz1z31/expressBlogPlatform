import { ApiError, statusCodes } from "../utils/index.js";
import { Category } from "../database/models/index.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) { 
      res.status(statusCodes.NOT_FOUND).send("Category not found")
    }
    res.status(200).json(category);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) { 
      res.status(statusCodes.NOT_FOUND).send("Category not found")
    }
    res.status(200).json(category);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) { 
      res.status(statusCodes.NOT_FOUND).send("Category not found")
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};
