import Joi from 'joi';

export default {
  create: Joi.object({
    blogId: Joi.string().trim().hex().length(24)
      .required(),
    text: Joi.string().trim().required(),
  }),

  update: Joi.object({
    id: Joi.string().trim().hex().length(24)
      .required(),
    text: Joi.string().trim().required(),
  }),
};
