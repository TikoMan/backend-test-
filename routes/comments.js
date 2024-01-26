import { Router } from 'express';
import validate from '../middlewares/validate.js';
import commentsSchema from '../schema/commentsSchema.js';
import CommentsController from '../controllers/CommentsController.js';

const router = Router();

router.post(
  '/',
  validate(commentsSchema.create),
  CommentsController.create,
);

router.put(
  '/update',
  validate(commentsSchema.update),
  CommentsController.update,
);

router.delete(
  '/:id',
  CommentsController.delete,
);

export default router;
