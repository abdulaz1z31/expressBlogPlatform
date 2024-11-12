import { ApiError, logger, statusCodes } from "../utils/index.js";
import { Article } from "../database/models/index.model.js";
export const isSelfRoleGuard = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      const userId = req.user.id
      const paramsId = req.params.id

      
      if (roles.includes(userRole) || paramsId == userId) {
        next();
      } else {
        res.status(403).send("Permission Denied");
      }
    };
  };
  
export const isSelfArticle = (...roles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role
      const userId = req.user.id
      const article = await Article.findById(req.params.id);
      if (!article) {
        res.status(statusCodes.NOT_FOUND).send("Atricle not found")
      }
      const authorId = article.author_id

      if (roles.includes(userRole) || authorId == userId) {
        next();
      } else {
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      next(new ApiError(error.statusCode, error.message))
    }
  }
}