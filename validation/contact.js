import Joi from 'joi';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('personal', 'home', 'work').required(),
});

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('personal', 'home', 'work'),
});
