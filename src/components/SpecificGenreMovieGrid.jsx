import React, { useState, useEffect } from "react";
import "./SpecificGenreMovieGrid.css";
import moviesData from "../data/movies.json"; 

const GENRE_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 9648: "Mystery",
  10749: "Romance", 878: "Sci-Fi", 53: "Thriller", 10752: "War",
  37: "Western"
};

// 1. Adjusted to ensure full rows (8 columns * 15 rows = 120 items)
const MOVIES_PER_PAGE = 120; 

export default function SpecificGenreMovieGrid({ genre }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // 2. Safer filtering logic
    const filtered = moviesData.filter(movie => {
      let genres = movie.genre_ids;
      
      // Safety check: Only parse if it's a string
      if (typeof genres === 'string') {
        try {
            genres = JSON.parse(genres);
        } catch (e) {
            console.error("Error parsing genre_ids", e);
            return false;
        }
      }
      
      // Ensure genres is an array before checking
      return Array.isArray(genres) && genres.some(id => GENRE_MAP[id] === genre);
    });

    setFilteredMovies(filtered);
    setCurrentPage(1);
  }, [genre]);

  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  // Safety: prevent slice from exceeding bounds
  const moviesToShow = filteredMovies.slice(startIndex, startIndex + MOVIES_PER_PAGE);

  // 3. Scroll to top when page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="movie-grid-container">
      {moviesToShow.length > 0 ? (
        <div className="movie-grid">
          {moviesToShow.map((movie) => (
            <div key={movie.id} className="movie-card">
              {/* 4. Optimized Image Size (w500 instead of original) */}
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                alt={movie.title}
                className="movie-poster"
                loading="lazy" 
              />
              <div className="movie-info">
                <p className="movie-title" title={movie.title}>{movie.title.toUpperCase()}</p>
                <div className="movie-meta">
                  <span className="movie-rating">⭐ {parseFloat(movie.vote_average).toFixed(1)}</span>
                  {/* Format date to look like your screenshot if needed, otherwise raw date */}
                  <span className="movie-date">{movie.release_date?.split("-")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-movies">No {genre} movies found.</div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
