import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = {
      email,
      username,
      password
    };

    localStorage.setItem(email, JSON.stringify(userData)); // Store data with email as key
    setError('');
    
    alert('Signup successful!');
    navigate('/login'); // Redirect to login page after successful signup
  };
  const handleLoginRedirect = () => {
    // Redirect to signup page
    navigate('/login');
  };

  return (

    <div className='signup-body'>
    <div className="signup-container">
      <h2>Signup</h2>
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className='Signup-button' type="submit">Signup</button>
        <button className="login-button" onClick={handleLoginRedirect}>Login</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
