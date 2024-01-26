import HttpError from 'http-errors';
import JWT from 'jsonwebtoken';
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

  static async update(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { userId } = req;
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

      const user = await Users.findByPk(userId);

      await user.update({
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

  static async delete(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { userId } = req;

      await Users.destroy({
        where: {
          id: userId,
        },
      });

      await t.commit();

      res.send({
        status: 'ok',
      });
    } catch (e) {
      await t.rollback();
      next(e);
    }
  }

  static async profile(req, res, next) {
    try {
      const { id } = req.params;

      const user = await Users.findByPk(id);

      if (!user) {
        throw HttpError(404, 'User not found');
      }

      res.send({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UsersController;
