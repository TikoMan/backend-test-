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
  UsersController.login,
);

router.put(
  '/update',
  validate(usersSchema.update),
  UsersController.update,
);

router.get(
  '/list',
  validate(usersSchema.list, 'query'),
  UsersController.list,
);

router.get(
  '/single/:id',
  UsersController.profile,
);
export default router;
