import { Article } from "../database/models/index.model.js";

export const createArticleService = async (data) => {
  try {
    const article = new Article(data);
    await article.save();
    return { success: true, error: null, article };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllArticlesService = async () => {
  try {
    const articles = await Article.find();
    return { success: true, error: null, articles };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getArticleByIdService = async (id) => {
  try {
    const article = await Article.findById(id);
    if (!article) {
      return { success: false, error: "Article not found" };
    }
    return { success: true, error: null, article };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateArticleByIdService = async (id, data, authorId) => {
  try {
    const { title, content, carcategory_id } = data;
    const newData = { title, content, authorId, carcategory_id };
    const article = await Article.findByIdAndUpdate(id, newData, { new: true });

    if (!article) {
      return { success: false, error: "Article not found" };
    }
    return { success: true, error: null, article };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteArticleByIdService = async (id) => {
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return { success: false, error: "Article not found" };
    }
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
