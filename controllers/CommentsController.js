import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Blogs from '../models/Blogs.js';
import Comments from '../models/Comments.js';

class CommentsController {
  static async create(req, res, next) {
    try {
      const { blogId, text } = req.body;
      const { userId } = req;

      if (!mongoose.isValidObjectId(blogId)) {
        throw HttpError(400, 'Invalid blogId format');
      }

      const blog = await Blogs.findById(blogId);

      if (!blog) {
        throw HttpError(404, 'blog is not found');
      }

      const comment = await Comments.create({
        authorId: userId,
        blogId,
        text,
      });

      await Blogs.findByIdAndUpdate(blogId, { $push: { comments: comment.id } });

      res.send({
        status: 'ok',
        comment,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const { id, text } = req.body;

      if (!mongoose.isValidObjectId(id)) {
        throw HttpError(400, 'Invalid blogId format');
      }

      const comment = await Comments.findByIdAndUpdate(
        id,
        {
          text,
        },
        {
          new: true,
        },
      );

      if (!comment) {
        throw HttpError(404, 'comment is not found');
      }

      res.send({
        status: 'ok',
        comment,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        throw HttpError(400, 'Invalid blogId format');
      }

      const comment = await Comments.findByIdAndDelete(id);

      if (!comment) {
        throw HttpError(404, 'comment is not found');
      }

      res.send({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  }
}

export default CommentsController;
