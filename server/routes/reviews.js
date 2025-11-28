import express from 'express';
import Review from '../models/Review.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get reviews for a movie
router.get('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId: parseInt(movieId) })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add review
router.post('/:movieId', authenticateToken, async (req, res) => {
  try {
    const { movieId } = req.params;
    const { rating, review } = req.body;

    // Check if user already reviewed this movie
    const existing = await Review.findOne({
      userId: req.user.userId,
      movieId: parseInt(movieId)
    });

    if (existing) {
      return res.status(400).json({ message: 'You already reviewed this movie' });
    }

    const newReview = new Review({
      userId: req.user.userId,
      movieId: parseInt(movieId),
      rating,
      review
    });

    await newReview.save();
    const populatedReview = await Review.findById(newReview._id).populate('userId', 'name');
    
    res.status(201).json({ message: 'Review added', review: populatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update review
router.put('/:reviewId', authenticateToken, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;

    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (existingReview.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    existingReview.rating = rating;
    existingReview.review = review;
    await existingReview.save();

    res.json({ message: 'Review updated', review: existingReview });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete review
router.delete('/:reviewId', authenticateToken, async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
