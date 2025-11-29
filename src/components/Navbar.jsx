import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import AuthService from '../services/authService';

export default function Navbar() {
  const [activeOption, setActiveOption] = useState('home');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const navigate = useNavigate();
  const genreRef = useRef(null);

  const toggleGenre = () => {
    setIsGenreOpen(prev => !prev);
  };

  useEffect(() => {
    // Check if user is logged in
    const currentUser = AuthService.getUser();
    console.log('Navbar - Current user:', currentUser);
    setUser(currentUser);

    // Listen for storage changes (in case user logs in from another tab)
    const handleStorageChange = () => {
      const updatedUser = AuthService.getUser();
      console.log('Navbar - Storage changed, updated user:', updatedUser);
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close genre dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setIsGenreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <ul className="navbar-left">
        <li><div className={`home-link option ${activeOption === 'home' ? 'active' : ''}`} onClick={() => { setActiveOption('home'); navigate('/'); setIsGenreOpen(false); }}>
          <a>Home</a>
          <div id='selected-circle'></div>
          </div></li>
        
        {/* Genre with Click Dropdown */}
        <li className="genre-wrapper" ref={genreRef}>
          <div
            className={`genre-link option ${activeOption === 'genre' ? 'active' : ''}`}
            onClick={() => {
              setActiveOption('genre');
                toggleGenre();
              }}
              >
              <a>Genre</a>
              <div id='selected-circle'></div>
              </div>

              {isGenreOpen && (
              <div className="genre-dropdown">
                <button onClick={() => setIsGenreOpen(false)}>Action</button>
                <button onClick={() => setIsGenreOpen(false)}>Adventure</button>
                <button onClick={() => setIsGenreOpen(false)}>Comedy</button>
                <button onClick={() => setIsGenreOpen(false)}>Crime</button>
                <button onClick={() => setIsGenreOpen(false)}>Drama</button>
                <button onClick={() => setIsGenreOpen(false)}>Family</button>
                <button onClick={() => setIsGenreOpen(false)}>Fantasy</button>
                <button onClick={() => setIsGenreOpen(false)}>History</button>
                <button onClick={() => setIsGenreOpen(false)}>Horror</button>
                <button onClick={() => setIsGenreOpen(false)}>Mystery</button>
                <button onClick={() => setIsGenreOpen(false)}>Romance</button>
                <button onClick={() => setIsGenreOpen(false)}>Sci-Fi</button>
                <button onClick={() => setIsGenreOpen(false)}>Thriller</button>
                <button onClick={() => setIsGenreOpen(false)}>War</button>
                <button onClick={() => setIsGenreOpen(false)}>Western</button>
                <button onClick={() => setIsGenreOpen(false)}>Documentary</button>
              </div>
              )}
            </li>

            <li><div className={`country-link option ${activeOption === 'country' ? 'active' : ''}`} onClick={() => { setActiveOption('country'); setIsGenreOpen(false); }}>
          <a href="#country">Country</a>
          <div id='selected-circle'></div>
          </div></li>
      </ul>

      {/* Center Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search movies......." />
        <button><FaSearch /></button>
      </div>

      {/* Right Section */}
    <ul className="navbar-right">
        <li>
          <div className={`movies-link option ${activeOption === 'movies' ? 'active' : ''}`} onClick={() => { setActiveOption('movies'); setIsGenreOpen(false); }}>
            <a href="#movies">Movies</a>
            <div id='selected-circle'></div>
          </div>
        </li>
        <li><div className={`series-link option ${activeOption === 'series' ? 'active' : ''}`} onClick={() => { setActiveOption('series'); setIsGenreOpen(false); }}>
          <a href="#series">Series</a>
          <div id='selected-circle'></div>
          </div></li>
        <li><div className={`animation-link option ${activeOption === 'animation' ? 'active' : ''}`} onClick={() => { setActiveOption('animation'); setIsGenreOpen(false); }}>
          <a href="#animation">Animation</a>
          <div id='selected-circle'></div>
          </div></li>
        <li><FaBell className="icon" /></li>
        <img src="icons/chatbot.png" alt="chatbot" id="chatbot-icon" />
        
        {user ? (
          <div 
            className="user-menu" 
            onMouseEnter={() => {
              console.log('Mouse entered user menu');
              setShowDropdown(true);
            }}
            onMouseLeave={() => {
              console.log('Mouse left user menu');
              setShowDropdown(false);
            }}
          >
            <button className="user-btn">
              {user.name}
            </button>
            {showDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-item" onClick={() => navigate('/profile')}>
                  <FaUser /> About Me
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="signup-btn" id='LOG'>Login / Signup</button>
        )}
    </ul>

    

    </nav>
  );
}
