// schemas/category.schema.js
import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional()
});
