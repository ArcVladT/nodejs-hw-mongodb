import Joi from 'joi';

export const sessionValidationSchema = Joi.object({
  userId: Joi.string().required(),
  accessToken: Joi.string().required(),
  refreshToken: Joi.string().required(),
  accessTokenValidUntil: Joi.date().required(),
  refreshTokenValidUntil: Joi.date().required(),
});

export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
});

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
});
