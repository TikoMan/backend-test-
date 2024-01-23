import HttpError from 'http-errors';
import sequelize from '../services/sequelize.js';
import { Blogs } from '../models/index.js';

class BlogsController {
  static async create(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { userId } = req;
      const { title, body } = req.body;

      const blog = await Blogs.create({
        authorId: userId,
        title,
        body,
      });

      await t.commit();

      res.send({
        statusL: 'ok',
        blog,
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }

  static async update(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { blogId, title, body } = req.body;

      const blog = await Blogs.findOne({
        where: {
          id: blogId,
        },
      });

      if (!blog) {
        throw HttpError(404, 'blog not found');
      }

      await blog.update({
        title,
        body,
      });

      await t.commit();

      res.send({
        status: 'ok',
        blog,
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }

  static async delete(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { blogId } = req.params;

      const blog = await Blogs.findOne({
        where: {
          id: blogId,
        },
      });

      if (!blog) {
        throw HttpError(404, 'blog not found');
      }

      await blog.destroy();

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

export default BlogsController;
