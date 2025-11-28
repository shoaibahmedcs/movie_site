import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  posterPath: {
    type: String
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Watchlist', watchlistSchema);
