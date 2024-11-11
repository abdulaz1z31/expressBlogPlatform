// schemas/article.schema.js
import Joi from 'joi';

export const articleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author_id: Joi.string().required(),
  category_id: Joi.string().required()
});
