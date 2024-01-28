import mongoose from '../services/mongoose.js';

const commentsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blogs',
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

const Comments = mongoose.model('Comments', commentsSchema);

export default Comments;
