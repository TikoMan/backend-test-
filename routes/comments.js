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

export default router;
