// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch user data from local storage based on email
    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
      setError('User not found');
      return;
    }

    // Parse user data and check if the password matches
    const userData = JSON.parse(storedUser);
    if (userData.password !== password) {
      setError('Incorrect password');
      return;
    }

    // Set logged-in status in local storage
    localStorage.setItem('loggedInUser', email);
    // Redirect to main page
    navigate('/main');
  };

  const handleSignupRedirect = () => {
    // Redirect to signup page
    navigate('/signup');
  };

  return (
    <div className='login-body'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button className='login-button' type="submit">Login</button>
        </form>
        <button className="signup-button" onClick={handleSignupRedirect}>Signup</button>
      </div>
    </div>
  );
};

export default Login;
