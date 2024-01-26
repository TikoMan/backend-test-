import HttpError from 'http-errors';
import sequelize from '../services/sequelize.js';
import { Blogs, Comments } from '../models/index.js';

class CommentsController {
  static async create(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { blogId, text } = req.body;
      const { userId } = req;

      const blog = await Blogs.findByPk(blogId);

      if (!blog) {
        throw HttpError(404, 'blog is not found');
      }

      const comment = await Comments.create({
        authorId: userId,
        blogId,
        text,
      });

      await t.commit();

      res.send({
        status: 'ok',
        comment,
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }
}

export default CommentsController;
