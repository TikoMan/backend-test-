import Joi from 'joi';

export default {
  create: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),

  update: Joi.object({
    blogId: Joi.number().min(1).required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),

  list: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(100),
  }),
};
