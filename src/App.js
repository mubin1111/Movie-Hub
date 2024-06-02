import './App.css';
import Signup from './Commponant/signup/signup';
import Login from './Commponant/login/login';
import MainPage from './Commponant/Main/Main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Watchlist from './Commponant/Watchlist/Watchlist';

const App = () => {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
};

export default App;
