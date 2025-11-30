import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpecificGenreMovieGrid from '../components/SpecificGenreMovieGrid';
import './GenrePage.css';

export default function GenrePage() {
  const { genre } = useParams();
  const navigate = useNavigate();

  // Format genre for display - handle special cases like "sci-fi"
  const formatGenreName = (genreParam) => {
    if (!genreParam) return '';
    
    // Handle special cases
    if (genreParam === 'sci-fi' || genreParam === 'scifi') return 'Sci-Fi';
    if (genreParam === 'science-fiction') return 'Sci-Fi';
    
    // Capitalize first letter of each word
    return genreParam
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayGenre = formatGenreName(genre);

  return (
    <div className="genre-page">
      <div className="genre-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1>{displayGenre} Movies</h1>
      </div>
      <SpecificGenreMovieGrid genre={displayGenre} />
    </div>
  );
}
