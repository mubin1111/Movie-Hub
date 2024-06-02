// src/Main.js (Updated handleAddToWatchlist function)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setSearchResults(data.Search);
        setError('');
      } else {
        setSearchResults([]);
        setError(data.Error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    }
  };

  const handleMovieClick = async (movie) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setSelectedMovie(data);
        setIsPopupOpen(true);
      } else {
        console.error('Error fetching movie details:', data.Error);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleAddToWatchlist = (movie) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      // Handle case where user is not logged in
      return;
    }
  
    const storedWatchlist = localStorage.getItem(`watchlist_${loggedInUser}`);
    const watchlist = storedWatchlist ? JSON.parse(storedWatchlist) : [];
  
    if (!watchlist.find(item => item.imdbID === movie.imdbID)) {
      watchlist.push(movie);
      localStorage.setItem(`watchlist_${loggedInUser}`, JSON.stringify(watchlist));
      alert('Movie added to watchlist');
    } else {
      alert('Movie already in watchlist');
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2>Movie Hub</h2>
        <button onClick={() => navigate('/watchlist')} className="watchlist-button">My Watchlist</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter movie title..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="movie-list">
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="movie-card" >
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <div className="movie-details">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">Year: {movie.Year}</p>
              <button className='details-button' onClick={() => handleMovieClick(movie)}>details</button>
              <button
                className="watchlist-button"
                onClick={() => handleAddToWatchlist(movie)}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup">
            <button className="close-button" onClick={handleClosePopup}>X</button>
            <div className="popup-content">
              <div className="movie-image-container">
                <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="popup-movie-poster" />
              </div>
              <div className="movie-details">
                <h2>{selectedMovie.Title}</h2>
                <p>Year: {selectedMovie.Year}</p>
                <p>Type: {selectedMovie.Type}</p>
                <p>IMDB Rating: {selectedMovie.imdbRating}</p>
                <p>Description: {selectedMovie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
