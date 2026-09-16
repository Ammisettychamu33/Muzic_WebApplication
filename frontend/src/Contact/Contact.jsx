import React, { useState } from 'react';
import './Contact.css';

import API_URL from '../config/api';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Contact Error:', err);

      if (!navigator.onLine) {
        setError('No internet connection.');
      } else {
        setError(
          'Unable to connect to the backend server. Please try again later.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError('');
  };

  return (
    <div className="contact">
      <div className="content">
        <h1>Contact Our Music Team</h1>

        <p>
          Have questions about our latest tracks, playlists, or want to
          collaborate? We'd love to hear from you!
        </p>

        {isSubmitted ? (
          <div className="thank-you-message">
            <h3>🎉 Thank You!</h3>

            <p>Your message has been sent successfully.</p>

            <p>We'll get back to you as soon as possible.</p>

            <button
              type="button"
              className="submit-btn"
              onClick={handleReset}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              required
            />

            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
            />

            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              rows="6"
              maxLength={500}
              placeholder="Tell us how we can help..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              required
            />

            <p className="character-count">
              {message.length}/500 characters
            </p>

            {error && <p className="error">{error}</p>}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;