import HttpError from 'http-errors';
import JWT from 'jsonwebtoken';
import { Op } from 'sequelize';
import sequelize from '../services/sequelize.js';
import { Users } from '../models/index.js';

const { JWT_SECRET } = process.env;

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

  static async login(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        where: {
          email,
          password: Users.passwordHash(password),
        },
      });

      if (!user) {
        throw HttpError(401, 'Invalid email or password');
      }

      const token = JWT.sign({ userId: user.id }, JWT_SECRET);

      await t.commit();

      res.send({
        status: 'ok',
        user,
        token,
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }

  static async list(req, res, next) {
    try {
      const { s, limit = 20, page = 1 } = req.query;

      const where = {};

      if (s) {
        where[Op.or] = [
          { firstName: { [Op.substring]: s } },
          { lastName: { [Op.substring]: s } },
          { email: { [Op.substring]: s } },
        ];
      }
      const users = await Users.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
      });

      const total = await Users.count();
      const totalPages = Math.ceil(total / limit);

      res.send({
        status: 'ok',
        users,
        total,
        totalPages,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UsersController;
