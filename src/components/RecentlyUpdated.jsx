import React, { useRef, useState, useEffect } from "react";
import moviesData from "../data/movies.json";
import "./RecentlyUpdated.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function RecentlyUpdated() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
  const movies = moviesData.slice(0, 25); // limit to 25 movies

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="recent-container">
      <h2 className="recent-title">Recently Updated</h2>

      <div className="recent-wrapper">
        <div className="recent-cards" ref={scrollContainerRef}>
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-img"
              />
              <div className="movie-details">
                <p className="movie-name">🎬 {movie.title}</p>
                <p className="movie-rating">⭐ {movie.vote_average}</p>
                <p className="movie-date">📅 {movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>

        {showLeftArrow && (
          <button className="arrow-btn arrow-btn-left" onClick={handlePrev}>
            <FaChevronLeft />
          </button>
        )}
        
        {showRightArrow && (
          <button className="arrow-btn arrow-btn-right" onClick={handleNext}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
