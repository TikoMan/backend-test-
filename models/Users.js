import Promise from 'bluebird';
import mongoose from '../services/mongoose.js';
import passwordHashing from '../helper/passwordHashing.js';
import Blogs from './Blogs.js';
import Comments from './Comments.js';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
}, {
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      const { password, ...userWithoutPassword } = ret;
      return userWithoutPassword;
    },
  },
});

userSchema.pre('save', async function hash(next) {
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }

    user.password = passwordHashing(user.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function hash(next) {
  const { _update: user } = this;

  if (user.password) {
    try {
      user.password = passwordHashing(user.password);
    } catch (error) {
      next(error);
    }
  }
  return next();
});

userSchema.pre('deleteOne', async function delCascade(next) {
  try {
    const { _conditions: { _id: id } } = this;

    const blogs = await Blogs.find({ author: id });

    await Promise.map(blogs, async (blog) => {
      await Comments.deleteMany({ blogId: blog.id });
    });

    await Blogs.deleteMany({ author: id });
    next();
  } catch (error) {
    next(error);
  }
});

const Users = mongoose.model('Users', userSchema);

export default Users;
