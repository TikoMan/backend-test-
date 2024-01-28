import HttpError from 'http-errors';
import mongoose from 'mongoose';
import Blogs from '../models/Blogs.js';
import Comments from '../models/Comments.js';

class BlogsController {
  static async create(req, res, next) {
    try {
      const { userId } = req;
      const { title, body } = req.body;

      const blog = await Blogs.create({
        author: userId,
        title,
        body,
      });

      res.send({
        status: 'ok',
        blog,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const { userId } = req;
      const { blogId, title, body } = req.body;

      if (!mongoose.isValidObjectId(blogId)) {
        throw HttpError(400, 'Invalid blogId format');
      }

      const blog = await Blogs.findOneAndUpdate({
        _id: blogId,
        author: userId,
      }, {
        title,
        body,
      }, {
        new: true,
      });

      if (!blog) {
        throw HttpError(404, 'blog not found');
      }

      res.send({
        status: 'ok',
        blog,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { userId } = req;
      const { blogId } = req.params;

      if (!mongoose.isValidObjectId(blogId)) {
        throw HttpError(400, 'Invalid blogId format');
      }

      const blog = await Blogs.findOneAndDelete(
        {
          _id: blogId,
          author: userId,
        },
      );

      if (!blog) {
        throw HttpError(404, 'blog not found');
      }

      res.send({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  }

  static async index(req, res, next) {
    try {
      const { limit = 20, page = 1 } = req.query;

      const blogs = await Blogs
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .select('-comments');

      const total = await Blogs.countDocuments();
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
      const { blogId } = req.params;
      const { limit = 20, page = 1 } = req.query;

      if (!mongoose.isValidObjectId(blogId)) {
        throw HttpError(400, 'Invalid blogId format');
      }

      const blog = await Blogs.findById(blogId)
        .populate({
          path: 'comments',
          options: {
            limit,
            skip: (page - 1) * limit,
          },
        }).exec();

      if (!blog) {
        throw HttpError(404, 'blog not found');
      }

      const totalComments = await Comments.countDocuments({ blogId });
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
