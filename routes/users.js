import { Router } from 'express';
import validate from '../middlewares/validate.js';
import usersSchema from '../schema/usersSchema.js';
import UsersController from '../controllers/UsersController.js';

const router = Router();

router.post(
  '/register',
  validate(usersSchema.register),
  UsersController.register,
);

export default router;
