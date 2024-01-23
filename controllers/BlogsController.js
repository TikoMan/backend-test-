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
}

export default BlogsController;
