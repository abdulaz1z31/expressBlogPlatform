import { ApiError, logger, statusCodes } from "../utils/index.js";
import { Article, Comment } from "../database/models/index.model.js";
import { checkIsActive } from "../service/index.service.js";
export const isSelfRoleGuard = (...roles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      const userId = req.user.id;
      const paramsId = req.params.id;
      const isActive = await checkIsActive(userId);
      
      if (isActive && (roles.includes(userRole) || paramsId == userId)) {
        next();
      } else {
        logger.info("Permission Denied")
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      next(new ApiError(error.statusCode, error.message));
    }
  };
};

export const isSelfArticle = (...roles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      const userId = req.user.id;
      const isActive = await checkIsActive(userId);
      const article = await Article.findById(req.params.id);
      if (!article) {
        logger.info("Article not found")
        return res.status(statusCodes.NOT_FOUND).send("Article not found");
      }
      const authorId = article.author_id;

      if (isActive && (roles.includes(userRole) || authorId == userId)) {
        next();
      } else {
        logger.info("Permission Denied")
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      next(new ApiError(error.statusCode, error.message));
    }
  };
};

export const isSelfComment = (...roles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      const userId = req.user.id;
      const isActive = await checkIsActive(userId);
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        logger.info("Comment not found")
        return res.status(statusCodes.NOT_FOUND).send("Comment not found");
      }
      const user_id = comment.user_id;

      if (isActive && (roles.includes(userRole) || user_id == userId)) {
        next();
      } else {
        logger.info("Permission Denied")
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      next(new ApiError(error.statusCode, error.message));
    }
  };
};
