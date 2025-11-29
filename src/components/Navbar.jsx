import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FaSearch, FaUser, FaSignOutAlt, FaHome, FaChevronDown } from "react-icons/fa";
import AuthService from '../services/authService';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const genreRef = useRef(null);
  const languageRef = useRef(null);

  const toggleGenre = () => {
    setIsGenreOpen(prev => !prev);
    setIsLanguageOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(prev => !prev);
    setIsGenreOpen(false);
  };

  // Update active page based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActivePage('home');
    } else if (path === '/chatbot') {
      setActivePage('chatbot');
    } else if (path === '/login') {
      setActivePage('login');
    } else {
      setActivePage(null);
    }
  }, [location.pathname]);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setIsGenreOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setIsLanguageOpen(false);
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

  const handleGenreSelect = (genre) => {
    console.log('Selected genre:', genre);
    setIsGenreOpen(false);
    // Add your genre filtering logic here
  };

  const handleLanguageSelect = (language) => {
    console.log('Selected language:', language);
    setIsLanguageOpen(false);
    // Add your language preference logic here
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchQuery = e.target.value;
      console.log('Search query:', searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsGenreOpen(false);
    setIsLanguageOpen(false);
  };

  const handleChatbotClick = () => {
    navigate('/chatbot');
    setIsGenreOpen(false);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Left Section - Logo & Navigation */}
      <ul className="navbar-left">
        <li>
          <div 
            className={`home-link option ${activePage === 'home' ? 'active' : ''}`} 
            onClick={handleHomeClick}
            title="Home"
          >
            <FaHome style={{ fontSize: '1.6rem' }} />
            <div className="selected-circle"></div>
          </div>
        </li>
        
        {/* Genre Dropdown - NO ACTIVE STATE (Just Filter, Not a Page) */}
        <li>
          <div className="genre-wrapper" ref={genreRef}>
            <div
              className="genre-link option"
              onClick={toggleGenre}
            >
              <a>Genre <FaChevronDown style={{ fontSize: '0.65rem' }} /></a>
            </div>

            {isGenreOpen && (
              <div className="genre-dropdown">
                <button onClick={() => handleGenreSelect('Action')}>Action</button>
                <button onClick={() => handleGenreSelect('Adventure')}>Adventure</button>
                <button onClick={() => handleGenreSelect('Comedy')}>Comedy</button>
                <button onClick={() => handleGenreSelect('Crime')}>Crime</button>
                <button onClick={() => handleGenreSelect('Drama')}>Drama</button>
                <button onClick={() => handleGenreSelect('Family')}>Family</button>
                <button onClick={() => handleGenreSelect('Fantasy')}>Fantasy</button>
                <button onClick={() => handleGenreSelect('History')}>History</button>
                <button onClick={() => handleGenreSelect('Horror')}>Horror</button>
                <button onClick={() => handleGenreSelect('Mystery')}>Mystery</button>
                <button onClick={() => handleGenreSelect('Romance')}>Romance</button>
                <button onClick={() => handleGenreSelect('Sci-Fi')}>Sci-Fi</button>
                <button onClick={() => handleGenreSelect('Thriller')}>Thriller</button>
                <button onClick={() => handleGenreSelect('War')}>War</button>
                <button onClick={() => handleGenreSelect('Western')}>Western</button>
                <button onClick={() => handleGenreSelect('Documentary')}>Documentary</button>
              </div>
            )}
          </div>
        </li>
      </ul>

      {/* Center Search Bar */}
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Search movies..." 
          onKeyPress={handleSearch}
        />
        <button title="Search"><FaSearch /></button>
      </div>

      {/* Right Section - Languages, Icons & User Menu */}
      <ul className="navbar-right">
        {/* Languages Dropdown - NO ACTIVE STATE (Just Filter, Not a Page) */}
        <li>
          <div className="language-wrapper" ref={languageRef}>
            <div
              className="language-link option"
              onClick={toggleLanguage}
            >
              <a>Languages <FaChevronDown style={{ fontSize: '0.65rem' }} /></a>
            </div>

            {isLanguageOpen && (
              <div className="language-dropdown">
                <button onClick={() => handleLanguageSelect('English')}>English</button>
                <button onClick={() => handleLanguageSelect('Hindi')}>Hindi</button>
                <button onClick={() => handleLanguageSelect('Spanish')}>Spanish</button>
                <button onClick={() => handleLanguageSelect('French')}>French</button>
                <button onClick={() => handleLanguageSelect('German')}>German</button>
                <button onClick={() => handleLanguageSelect('Italian')}>Italian</button>
                <button onClick={() => handleLanguageSelect('Japanese')}>Japanese</button>
                <button onClick={() => handleLanguageSelect('Korean')}>Korean</button>
                <button onClick={() => handleLanguageSelect('Chinese')}>Chinese</button>
                <button onClick={() => handleLanguageSelect('Portuguese')}>Portuguese</button>
                <button onClick={() => handleLanguageSelect('Russian')}>Russian</button>
                <button onClick={() => handleLanguageSelect('Arabic')}>Arabic</button>
              </div>
            )}
          </div>
        </li>
      
        {/* Chatbot Icon - PAGE NAVIGATION (Shows Active State) */}
        <li>
          <div 
            className={`chatbot-link option ${activePage === 'chatbot' ? 'active' : ''}`}
            onClick={handleChatbotClick}
            title="Chat with us"
          >
            <img 
              src="icons/chatbot.png" 
              alt="Chatbot" 
              id="chatbot-icon"
            />
            <div className="selected-circle"></div>
          </div>
        </li>

        {/* User Menu or Auth Buttons */}
        <li>
          {user ? (
            <div 
              className="user-menu" 
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="user-btn">
                <FaUser style={{ fontSize: '0.9rem' }} />
                {user.name}
              </button>
              {showDropdown && (
                <div className="user-dropdown">
                  <div 
                    className="dropdown-item" 
                    onClick={() => {
                      navigate('/profile');
                      setShowDropdown(false);
                    }}
                  >
                    <FaUser /> Profile
                  </div>
                  <div 
                    className="dropdown-item" 
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className={`signup-btn ${activePage === 'login' ? 'active' : ''}`}
            >
              Sign In
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}