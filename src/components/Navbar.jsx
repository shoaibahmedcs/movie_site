import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch, FaBell } from "react-icons/fa";

export default function Navbar() {
  const [activeOption, setActiveOption] = useState('home');

  return (
    <nav className="navbar">
      {/* Left Section */}
      <ul className="navbar-left">
        <li><div className={`home-link option ${activeOption === 'home' ? 'active' : ''}`} onClick={() => setActiveOption('home')}>
          <a href="#home">Home</a>
          <div id='selected-circle'></div>
          </div></li>
        <li><div className={`genre-link option ${activeOption === 'genre' ? 'active' : ''}`} onClick={() => setActiveOption('genre')}>
          <a href="#genre">Genre</a>
          <div id='selected-circle'></div>
          </div></li>
        <li><div className={`country-link option ${activeOption === 'country' ? 'active' : ''}`} onClick={() => setActiveOption('country')}>
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
          <div className={`movies-link option ${activeOption === 'movies' ? 'active' : ''}`} onClick={() => setActiveOption('movies')}>
            <a href="#movies">Movies</a>
            <div id='selected-circle'></div>
          </div>



        </li>
        <li><div className={`series-link option ${activeOption === 'series' ? 'active' : ''}`} onClick={() => setActiveOption('series')}>
          <a href="#series">Series</a>
          <div id='selected-circle'></div>
          </div></li>
        <li><div className={`animation-link option ${activeOption === 'animation' ? 'active' : ''}`} onClick={() => setActiveOption('animation')}>
          <a href="#animation">Animation</a>
          <div id='selected-circle'></div>
          </div></li>
        <li><FaBell className="icon" /></li>
        <img src="icons/chatbot.png" alt="chatbot" id="chatbot-icon" />
        <button href="#login" className="signup-btn" id='LOG'>Login / Signup</button>
    </ul>

    

    </nav>
  );
}
