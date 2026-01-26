import mongoose from 'mongoose';

const ScrapbookSchema = new mongoose.Schema({
  shareId: {
    type: String,
    required: true,
    unique: true,
  },
  pages: {
    type: Array,
    default: [],
  },
  bgPattern: {
    type: String,
    default: 'graphy',
  },
  bgColor: {
    type: String,
    default: '#FFFDF5',
  },
  pageBorder: {
    type: String,
    default: 'none',
  },
  animId: {
    type: String,
    default: 'default',
  },
  soundId: {
    type: String,
    default: 'page-flip',
  },
  bookStyle: {
    type: String,
    default: 'classic',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // null means created anonymously
  },
  title: {
    type: String,
    default: 'Untitled Scrapbook',
  },
  appBackground: {
    type: String,
    default: 'none',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Scrapbook || mongoose.model('Scrapbook', ScrapbookSchema);

