import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moviesData from "../data/movies.json";
import "./MyMovieCard.css";

export default function MyMovieCard({ which_genre }) {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  const MOVIES_PER_SLIDE = 7;

  const getGenreId = (genre) => {
    const map = {
      Action: 28,
      Adventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      Romance: 10749,
      SciFi: 878,
      ScienceFiction: 878,
      TVMovie: 10770,
      Thriller: 53,
      War: 10752,
      Western: 37,
    };
    return map[genre] || null;
  };

  useEffect(() => {
    const genre = which_genre();
    if (!genre) return;
    setSelectedGenre(genre);

    const genreID = getGenreId(genre);
    if (!genreID) return;

    const filtered = moviesData.filter((m) => {
      try {
        const ids = Array.isArray(m.genre_ids)
          ? m.genre_ids
          : JSON.parse(m.genre_ids);
        return ids.includes(genreID);
      } catch {
        return false;
      }
    });

    setMovies(filtered.slice(0, 35));
    setIndex(0);
  }, []);

  const nextSlide = () => {
    if (index + MOVIES_PER_SLIDE < movies.length) setIndex(index + MOVIES_PER_SLIDE);
  };

  const prevSlide = () => {
    if (index - MOVIES_PER_SLIDE >= 0) setIndex(index - MOVIES_PER_SLIDE);
  };

  const currentMovies = movies.slice(index, index + MOVIES_PER_SLIDE);

  const handleViewAll = () => {
    // Convert genre name to lowercase for URL
    const genreUrl = selectedGenre.toLowerCase().replace(/\s+/g, '-');
    navigate(`/genre/${genreUrl}`);
  };

  return (
    <div className="mmc_container">
      <div className="mmc_header">
        <h2 className="mmc_title">{selectedGenre} - Movies</h2>
        <span className="mmc_view_all" onClick={handleViewAll} style={{ cursor: 'pointer' }}>View All →</span>
      </div>

      <div className="mmc_content">
        <button className="mmc_arrow left" onClick={prevSlide} disabled={index === 0}>
          &#10094;
        </button>

        <div className="mmc_movies_wrapper">
          {currentMovies.map((movie, idx) => (
            <div className="mmc_card" key={movie.id || `${movie.title}-${idx}`}>
              <img
                className="mmc_poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="mmc_info">
                <h4 className="mmc_name">{movie.title}</h4>
                <p className="mmc_rating">⭐ {movie.vote_average}</p>
                <p className="mmc_date">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="mmc_arrow right"
          onClick={nextSlide}
          disabled={index + MOVIES_PER_SLIDE >= movies.length}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
