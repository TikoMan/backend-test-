import mongoose from '../services/mongoose.js';
import Comments from './Comments.js';

const blogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
}, {
  versionKey: false,
  timestamps: true,
});

blogsSchema.pre('findOneAndDelete', async function delCascade(next) {
  try {
    const { _conditions: { _id: id } } = this;

    await Comments.deleteMany({ blogId: id });

    next();
  } catch (error) {
    next(error);
  }
});

const Blogs = mongoose.model('Blogs', blogsSchema);

export default Blogs;
