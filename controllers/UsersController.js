import HttpError from 'http-errors';
import sequelize from '../services/sequelize.js';
import { Users } from '../models/index.js';

class UsersController {
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        firstName, lastName, email, password,
      } = req.body;

      const exists = await Users.findOne({
        where: {
          email,
        },
      });

      if (exists) {
        throw HttpError(422, {
          errors: {
            email: 'Already registered',
          },
        });
      }

      const user = await Users.create({
        firstName,
        lastName,
        email,
        password,
      });

      await t.commit();

      res.send({
        status: 'ok',
        user,
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }
}

export default UsersController;
