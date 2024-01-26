import Joi from 'joi';

export default {
  register: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),

  login: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),

  update: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),
};
