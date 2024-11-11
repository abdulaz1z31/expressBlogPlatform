// schemas/comment.schema.js
import Joi from 'joi';

export const commentSchema = Joi.object({
  content: Joi.string().required(),
  article_id: Joi.string().required(),
  user_id: Joi.string().required(),
  course_id: Joi.string().optional()
});
