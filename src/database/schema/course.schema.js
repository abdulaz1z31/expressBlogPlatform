// schemas/course.schema.js
import Joi from 'joi';

export const courseSchema = Joi.object({
  name: Joi.string().required(),
  category_id: Joi.string().required(),
  description: Joi.string().optional()
});
