import { Category } from "../database/models/index.model.js";

export const createCategoryService = async (data) => {
  try {
    const category = new Category(data);
    await category.save();
    return { success: true, error: null, category };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllCategoriesService = async () => {
  try {
    const categories = await Category.find();
    return { success: true, error: null, categories };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCategoryByIdService = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      return { success: false, error: "Category not found" };
    }
    return { success: true, error: null, category };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateCategoryByIdService = async (id, data) => {
  try {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) {
      return { success: false, error: "Category not found" };
    }
    return { success: true, error: null, category };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteCategoryByIdService = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return { success: false, error: "Category not found" };
    }
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
