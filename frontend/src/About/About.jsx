import React, { useState } from 'react';
import './About.css';

const artistData = {
  'Telugu Music': [
    'S. P. Balasubrahmanyam',
    'K. S. Chithra',
    'Sid Sriram',
    'Anirudh Ravichander',
    'DSP (Devi Sri Prasad)',
    'Chinmayi',
    'Karthik',
    'Shreya Ghoshal',
    'Yuvan Shankar Raja',
    'M. M. Keeravani',
  ],
  'Hindi Music': [
    'Arijit Singh',
    'Lata Mangeshkar',
    'Kishore Kumar',
    'Shreya Ghoshal',
    'A. R. Rahman',
    'Sonu Nigam',
    'Neha Kakkar',
    'Atif Aslam',
    'Sunidhi Chauhan',
    'Javed Ali',
  ],
  'Tamil Music': [
    'Ilaiyaraaja',
    'Harris Jayaraj',
    'Anirudh Ravichander',
    'Sid Sriram',
    'Yuvan Shankar Raja',
    'G. V. Prakash Kumar',
    'D. Imman',
    'Karthik',
    'Chinmayi',
    'Shreya Ghoshal',
  ],
  'English Music': [
    'Taylor Swift',
    'Ed Sheeran',
    'Drake',
    'Beyoncé',
    'The Weeknd',
    'Adele',
    'Justin Bieber',
    'Billie Eilish',
    'Bruno Mars',
    'Rihanna',
  ],
};

function About() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleArtistClick = (artistName) => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      `${artistName} songs`
    )}`;
    window.open(googleSearchUrl, '_blank', 'noopener,noreferrer');
  };

  const filterArtists = (artists) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return artists;

    return artists.filter((artist) =>
      artist.toLowerCase().includes(query)
    );
  };

  return (
    <div className="about">
      <div className="content">
        <h1>About Us</h1>

        <div className="search-bar">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search for artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <h2>Popular Artists Across Languages</h2>

        <div className="artists-grid">
          {Object.entries(artistData).map(([category, artists]) => (
            <div className="artist-category" key={category}>
              <h3>{category}</h3>

              <ul>
                {filterArtists(artists).length > 0 ? (
                  filterArtists(artists).map((artist) => (
                    <li
                      key={artist}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleArtistClick(artist)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleArtistClick(artist);
                        }
                      }}
                    >
                      {artist}
                    </li>
                  ))
                ) : (
                  <li className="no-results">No artists found.</li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <h2>Why Choose Us?</h2>

        <ul className="features-list">
          <li>Access to millions of songs across various genres and languages.</li>
          <li>High-quality audio streaming with customizable settings.</li>
          <li>Personalized recommendations based on your listening habits.</li>
          <li>Offline mode to enjoy music without an internet connection.</li>
          <li>Exclusive releases and early access to new tracks.</li>
          <li>User-friendly interface with smooth navigation.</li>
        </ul>

        <h2>Join Our Community</h2>

        <p>
          Become part of our growing community of music enthusiasts. Share your
          playlists, discover new artists, and connect with music lovers from
          around the world.
        </p>

        <p>
          Sign up today and enjoy an amazing music experience with Music Vibes!
        </p>
      </div>
    </div>
  );
}

export default About;