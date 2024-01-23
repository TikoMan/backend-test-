import { Router } from 'express';
import validate from '../middlewares/validate.js';
import blogsSchema from '../schema/blogsSchema.js';
import BlogsController from '../controllers/BlogsController.js';

const router = Router();

router.post(
  '/',
  validate(blogsSchema.create),
  BlogsController.create,
);

router.put(
  '/update',
  validate(blogsSchema.update),
  BlogsController.update,
);

export default router;
