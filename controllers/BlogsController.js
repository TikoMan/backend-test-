import HttpError from 'http-errors';
import sequelize from '../services/sequelize.js';
import { Blogs, Comments } from '../models/index.js';

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
        status: 'ok',
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
      const { userId } = req;
      const { blogId, title, body } = req.body;

      const blog = await Blogs.findOne({
        where: {
          id: blogId,
          authorId: userId,
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
      const { userId } = req;
      const { blogId } = req.params;

      const blog = await Blogs.findOne({
        where: {
          id: blogId,
          authorId: userId,
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

  static async index(req, res, next) {
    try {
      const { limit = 20, page = 1 } = req.query;

      const blogs = await Blogs.findAll({
        limit,
        offset: (page - 1) * limit,
      });

      const total = await Blogs.count();
      const totalPages = Math.ceil(total / limit);

      res.send({
        status: 'ok',
        blogs,
        total,
        totalPages,
      });
    } catch (e) {
      next(e);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const { limit = 20, page = 1 } = req.query;

      const blog = await Blogs.findByPk(id, {
        include: {
          model: Comments,
          as: 'comments',
          limit,
          offset: (page - 1) * limit,
        },
      });

      if (!blog) {
        throw HttpError(404, 'blog not found');
      }

      const totalComments = await Comments.count({
        where: {
          id,
        },
      });
      const totalCommentsPages = Math.ceil(totalComments / limit);

      res.send({
        status: 'ok',
        blog,
        totalComments,
        totalCommentsPages,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default BlogsController;
