import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(isLoggedIn ? "/albums" : "/login");
  };

  const openGoogleSearch = (query) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query + " music")}`,
      "_blank"
    );
  };

  const featuredPlaylists = [
    {
      id: 1,
      name: "Chill Vibes",
      image:
        "https://c8.alamy.com/zooms/9/fea52cd0567241618d28f3bbbe97e1aa/2h31w35.jpg",
    },
    {
      id: 2,
      name: "Workout Hits",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84781355501085dec579477533",
    },
    {
      id: 3,
      name: "Indie Essentials",
      image:
        "https://i.scdn.co/image/ab67616d0000b273467ae64e2c6ea2fd2ddbfdb6",
    },
  ];

  const genres = [
    {
      id: 1,
      name: "Rock",
      image:
        "https://e7.pngegg.com/pngimages/87/996/png-clipart-internet-radio-rock-music-song-classic-rock-others-logo-computer-wallpaper-thumbnail.png",
    },
    {
      id: 2,
      name: "Pop",
      image:
        "https://upload.wikimedia.org/wikipedia/en/9/96/U2-Pop-cover.png",
    },
    {
      id: 3,
      name: "Jazz",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cxFamLDFQF3hr8X1WrARUbuUf7ST1lU98Q&s",
    },
    {
      id: 4,
      name: "Electronic",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDFZzX8h7NH4QEpgGkaSgyfCU8xH_bCoKig&s",
    },
  ];

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/300x300?text=No+Image";
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay">
          <div className="content">
            <h1>Welcome to Music Vibes</h1>

            <p>
              Discover trending albums, explore talented artists,
              and enjoy your favorite music anytime.
            </p>

            <button
              className="explore-btn"
              onClick={handleExploreClick}
            >
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="featured">
        <h2>Featured Playlists</h2>

        <div className="playlist-container">
          {featuredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card"
              onClick={() => openGoogleSearch(playlist.name)}
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                loading="lazy"
                onError={handleImageError}
              />

              <p>{playlist.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="genres">
        <h2>Explore Genres</h2>

        <div className="genre-container">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="genre-card"
              onClick={() => openGoogleSearch(genre.name)}
            >
              <img
                src={genre.image}
                alt={genre.name}
                loading="lazy"
                onError={handleImageError}
              />

              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;