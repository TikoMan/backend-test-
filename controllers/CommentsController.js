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

  static async update(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id, text } = req.body;

      const comment = await Comments.findByPk(id);

      if (!comment) {
        throw HttpError(404, 'comment is not found');
      }

      await comment.update({
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

  static async delete(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      const comment = await Comments.findByPk(id);

      if (!comment) {
        throw HttpError(404, 'comment is not found');
      }

      await comment.destroy();

      await t.commit();

      res.send({
        status: 'ok',
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }
}

export default CommentsController;
