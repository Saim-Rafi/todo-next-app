import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'New Additions'
  },
  description: {
    type: String,
    default: 'To stay representative of framework & new example apps.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);