import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_CONNECTION: Joi.required(),
  PORT: Joi.number().default(3000),
});
