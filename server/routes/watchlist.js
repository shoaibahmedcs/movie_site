import express from 'express';
import Watchlist from '../models/Watchlist.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's watchlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.user.userId }).sort({ addedAt: -1 });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to watchlist
router.post('/:movieId', authenticateToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    const { movieTitle, posterPath } = req.body;

    // Check if already in watchlist
    const existing = await Watchlist.findOne({
      userId: req.user.userId,
      movieId: parseInt(movieId)
    });

    if (existing) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const watchlistItem = new Watchlist({
      userId: req.user.userId,
      movieId: parseInt(movieId),
      movieTitle,
      posterPath
    });

    await watchlistItem.save();
    res.status(201).json({ message: 'Added to watchlist', watchlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from watchlist
router.delete('/:movieId', authenticateToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    
    await Watchlist.findOneAndDelete({
      userId: req.user.userId,
      movieId: parseInt(movieId)
    });

    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
