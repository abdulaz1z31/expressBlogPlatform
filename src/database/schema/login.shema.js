import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required()
});
