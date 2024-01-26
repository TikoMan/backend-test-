import Joi from 'joi';

export default {
  create: Joi.object({
    blogId: Joi.number().min(1).required(),
    text: Joi.string().trim().required(),
  }),

  update: Joi.object({
    id: Joi.number().min(1).required(),
    text: Joi.string().trim().required(),
  }),
};
