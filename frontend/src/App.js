import React, { useState, useEffect } from 'react';
import './App.css';

import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Services from './Services/Services';
import Albums from './Albums/Albums';
import Artists from './Artists/Artists';
import Crud from './Crud/Crud';
import Registration from './Registration/Registration';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    }

    const storedUsers =
      JSON.parse(localStorage.getItem('users')) || [];

    setUsers(storedUsers);
  }, []);

  const handleRegister = (newUser) => {
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem(
      'users',
      JSON.stringify(updatedUsers)
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} />}
          />

          <Route
            path="/home"
            element={<Home isLoggedIn={isLoggedIn} />}
          />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/services" element={<Services />} />

          <Route
            path="/albums"
            element={
              <ProtectedRoute>
                <Albums />
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists"
            element={
              <ProtectedRoute>
                <Artists />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crud"
            element={
              <ProtectedRoute>
                <Crud />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />

          <Route
            path="/registration"
            element={
              <Registration onRegister={handleRegister} />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;