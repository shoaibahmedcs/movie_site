import React from "react";
import moviesData from "../data/movies.json";
import "./Trending.css";

const GENRES = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

export default function Trending() {
  const movies2025 = moviesData.filter(movie => movie.release_date.endsWith("2025")).slice(0, 4);

  return (
    <div className="trending-container">
      <div className="trending-header">
        <h2>Trending</h2>
        <span className="view-all">View all →</span>
      </div>

      <div className="trending-grid">
        {movies2025.map((movie, i) => {
          const poster = "https://image.tmdb.org/t/p/original" + movie.poster_path;
          const genreIds = typeof movie.genre_ids === 'string' ? JSON.parse(movie.genre_ids) : movie.genre_ids;
          const genres = genreIds.map(id => GENRES[id]).slice(0, 2);

          return (
            <div className="movie-card" key={i}>
              {/* Poster Box */}
              <div className="poster-box">
                <img src={poster} alt={movie.title} className="poster-img" />
                
                {/* Rating Badge (Top Left) */}
                <div className="badge badge-left">⭐ {movie.vote_average}</div>
                
                {/* Duration Badge (Top Right) */}
                <div className="badge badge-right">3:12:00</div>
              </div>

              {/* Info Below */}
              <div className="meta-data">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="genre-row">
                  {genres.map((g, idx) => (
                    <span className="genre-pill" key={idx}>{g}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}