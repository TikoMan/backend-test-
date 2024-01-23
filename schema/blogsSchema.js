import Joi from 'joi';

export default {
  create: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};
