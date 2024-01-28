import { Router } from 'express';
import users from './users.js';
import blogs from './blogs.js';
import comments from './comments.js';

const router = Router();

router.use('/users', users);
router.use('/blogs', blogs);
router.use('/comments', comments);

export default router;
