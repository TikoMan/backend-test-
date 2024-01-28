import HttpError from 'http-errors';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import Users from '../models/Users.js';
import passwordHashing from '../helper/passwordHashing.js';

const { JWT_SECRET } = process.env;

class UsersController {
  static async register(req, res, next) {
    try {
      const {
        firstName, lastName, email, password,
      } = req.body;

      const exists = await Users.findOne({
        email,
      }).exec();

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

      res.send({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        email,
        password: passwordHashing(password),
      });

      if (!user) {
        throw HttpError(401, 'Invalid email or password');
      }

      const token = JWT.sign({ userId: user.id }, JWT_SECRET);

      res.send({
        status: 'ok',
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const { userId } = req;
      const {
        firstName, lastName, email, password,
      } = req.body;

      const exists = await Users.findOne({
        email,
      });

      if (exists && exists.id !== userId) {
        throw HttpError(422, {
          errors: {
            email: 'Already registered',
          },
        });
      }

      const user = await Users.findOneAndUpdate(
        { _id: userId },
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          new: true,
        },
      );

      res.send({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req;

      if (id !== userId) {
        throw HttpError(404, 'user not found');
      }

      await Users.deleteOne({
        _id: id,
      });

      res.send({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  }

  static async profile(req, res, next) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        throw HttpError(404, 'User not found');
      }

      const user = await Users.findById(id);

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
