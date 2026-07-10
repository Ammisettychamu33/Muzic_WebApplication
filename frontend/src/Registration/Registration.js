import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const API_URL = 'http://localhost:5000';

function Registration({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setError('');
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      !trimmedUsername ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (trimmedPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (response.status === 201) {
        onRegister({
          username: trimmedUsername,
          email: trimmedEmail,
        });

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        navigate('/login');
      }
    } catch (err) {
      console.error('Registration Error:', err);

      if (err.response) {
        setError(
          err.response.data.message ||
            'Registration failed. Please try again.'
        );
      } else {
        if (!navigator.onLine) {
          setError('No internet connection.');
        } else {
          setError('Unable to connect to the backend server.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register for Music Vibes</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>

          <input
            ref={usernameRef}
            type="text"
            id="username"
            placeholder="Enter your username"
            autoComplete="username"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              setError('');
            }}
            required
          />

          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError('');
            }}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            minLength={6}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError('');
            }}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="new-password"
            minLength={6}
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <button
          className="login-button"
          onClick={handleLoginRedirect}
          disabled={loading}
        >
          Already Registered? Log In Here
        </button>
      </div>
    </div>
  );
}

export default Registration;