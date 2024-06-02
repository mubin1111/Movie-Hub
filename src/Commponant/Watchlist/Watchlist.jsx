// src/Watchlist.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/login');
    } else {
      const storedWatchlist = localStorage.getItem(`watchlist_${loggedInUser}`);
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    }
  }, [navigate]);

  const handleRemoveFromWatchlist = (movie) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const updatedWatchlist = watchlist.filter(item => item.imdbID !== movie.imdbID);
    setWatchlist(updatedWatchlist);
    localStorage.setItem(`watchlist_${loggedInUser}`, JSON.stringify(updatedWatchlist));
  };

  const handleLogout = () => {
    // const loggedInUser = localStorage.getItem('loggedInUser');
    // localStorage.removeItem('loggedInUser');
    // localStorage.removeItem(`watchlist_${loggedInUser}`);
    navigate('/login');
  };

  return (
    <div className="watchlist-container">
      <div className="header">
        <h2>My Watchlist</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="movie-list">
          {watchlist.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <div className="movie-details">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">Year: {movie.Year}</p>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromWatchlist(movie)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
