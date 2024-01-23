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

router.post(
  '/login',
  validate(usersSchema.login),
);

export default router;
