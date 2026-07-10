import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Artists.css'; 
import { FaArrowLeft } from 'react-icons/fa';

const Artists = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); 
  const [playbackSpeed, setPlaybackSpeed] = useState(1); 
  const audioRef = useRef(null); 
  const videoRef = useRef(null); 

  const artistData = [
    {
      id: 1,
      name: 'Taylor Swift',
      genre: 'Pop',
      image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2023-07/230713-taylor-swift-jm-1600-daea0b.jpg',
      bio: 'Taylor Swift is an American singer-songwriter known for her narrative songwriting.',
      tracks: [
        { name: 'Love Story', audio: 'https://pagalnew.com.se/files/download/id/8342' },
        { name: 'Blank Space', audio: 'https://www.scarybeatz.com/wp-content/uploads/2024/08/Taylor_Swift_-_Blank_Space_ScaryBeatz.com.mp3' },
        { name: 'Shake It Off', audio: 'https://www.soundboard.com/track/download/944702' },
      ],
      video: 'https://www.youtube.com/embed/8xg3vE8Ie_E', 
    },
    {
      id: 2,
      name: 'The Weeknd',
      genre: 'R&B',
      image: 'https://www.booska-p.com/wp-content/uploads/2022/01/The-Weeknd-Spotify-Visu-News-1024x750.jpg',
      bio: 'The Weeknd is a Canadian singer known for his distinctive voice and dark lyrical themes.',
      tracks: [
        { name: 'Blinding Lights', audio: 'https://hhk.awamedia.store/uploads/new/music/2024/09/The-Weeknd-Blinding-Lights-(HipHopKit.com).mp3' },
        { name: 'Starboy', audio: 'https://www.soundboard.com/track/download/986752' },
        { name: 'Save Your Tears', audio: 'https://www.terre2buzz.com/download/7621' },
      ],
      video: 'https://www.youtube.com/embed/4NRXx6U8ABQ', 
    },
    {
      id: 3,
      name: 'A. R. Rahman',
      genre: 'Indian',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBNn3OtEExxp5VUAnxV2MXuHqLt8F4Cz-5717vmZYY0aNf8Dn4nE8czsrym4tpZbGvP3iQ1Tt-39u4Ybct7wNIcg',
      bio: 'A. R. Rahman is an Indian composer, singer, and music producer known for his work in Indian cinema.',
      tracks: [
        { name: 'Jai Ho', audio: 'https://pagalfree.com/download/128-Jai%20Ho%20-%20Slumdog%20Millionaire%20128%20Kbps.mp3' },
        { name: 'Tum Hi Ho', audio: 'https://pagalfree.com/download/320-Tum%20Hi%20Ho%20-%20Aashiqui%202%20320%20Kbps.mp3' },
        { name: 'Challa', audio: 'https://pagalfree.com/download/128-Challa%20-%20Jab%20Tak%20Hai%20Jaan%20128%20Kbps.mp3' },
      ],
      video: 'https://www.youtube.com/embed/ZWCZ8I5BUY4',
    },
    {
      id: 4,
      name: 'Anirudh Ravichander',
      genre: 'Tamil',
      image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTsdgINTjqtOimYyehz19YVtbKnq0ggKqPPOHYdlzQD5Y-vspK2QIuSBfQmbBSS2QibSghSIKz6zWEmpB4MFVealw',
      bio: 'Anirudh Ravichander is an Indian music composer and singer known for his work in Tamil cinema.',
      tracks: [
        { name: 'Why This Kolaveri Di', audio: 'https://pagalfree.com/download/128-Why%20This%20Kolaveri%20Di%20(The%20Soup%20of%20Love)%20-%203%20128%20Kbps.mp3' },
        { name: 'Chellamma', audio: 'https://pagalnew.com/128-download/20288' },
        { name: 'Naa Ready', audio: 'https://mp3teluguwap.net/mp3/2023/Leo%20(2023)/Leo%20(2023)/Naa%20Ready.mp3' },
      ],
      video: 'https://www.youtube.com/embed/YR12Z8f1Dh8',
    },
    {
      id: 5,
      name: 'Ed Sheeran',
      genre: 'Pop',
      image: 'https://www.hindustantimes.com/ht-img/img/2024/03/10/1600x900/ed_sheeran_1710051495622_1710051500856.jpeg',
      bio: 'Ed Sheeran is an English singer-songwriter known for his hit songs like "Shape of You" and "Perfect".',
      tracks: [
        { name: 'Shape of You', audio: 'https://pagalnew.com.se/files/download/id/8298' },
        { name: 'Perfect', audio: 'https://mr-jat.in/dlod/6239/320' },
        { name: 'Thinking Out Loud', audio: 'https://pagallworld.co.in/wp-content/uploads/2023/12/Thinking-Out-Loud.mp3' },
      ],
      video: 'https://www.youtube.com/embed/JGwWNGJdvx8',
    },
  ];

  const handleCardClick = (artist) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedArtist(artist);
    setShowVideo(false);
    setCurrentTrack(null);
  };

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedArtist(null);
    setShowVideo(false);
    setCurrentTrack(null);
  };

  const toggleVideo = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTrack(null);
  }

  const nextState = !showVideo;
    setShowVideo(nextState);

    if (nextState) {
      setTimeout(() => {
        videoRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const handleTrackClick = async (track) => {
    try {
      if (currentTrack === track.audio) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentTrack(null);
        return;
      }

      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      audioRef.current.src = track.audio;
      audioRef.current.playbackRate = playbackSpeed;

      await audioRef.current.play();

      setCurrentTrack(track.audio);

      audioRef.current.onended = () => {
        setCurrentTrack(null);
      };
    } catch (error) {
      console.error('Playback Error:', error);
      alert('This audio cannot be played.');
      setCurrentTrack(null);
    }
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed; 
    }
  };

  return (
    <div className="artist-page">
      <header className="header">
        <h1>Top Artists & Super Hit Songs</h1>
      </header>

      {/* Navigation to Albums */}
      <Link to="/albums" className="nav-to-albums">
        Explore Albums
      </Link>

      <div className="content-container">
        {!selectedArtist && (
          <section id="artists" className="artists-section">
            <h2>Our Top Artists</h2>
            <div className="artists-container">
              {artistData.map((artist) => (
                <div
                  key={artist.id}
                  className="artist-card"
                  onClick={() => handleCardClick(artist)}
                >
                  <img
                    loading="lazy"
                    src={artist.image}
                    alt={artist.name}
                    className="artist-image"
                  />
                  <h3>{artist.name}</h3>
                  <p className="artist-genre">{artist.genre}</p>
                  <p className="artist-bio">{artist.bio}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedArtist && (
          <section id="media" className="media-section">
            <div className="back-button-container">
              <button type="button" onClick={handleBack} className="back-button">
                <FaArrowLeft /> Back
              </button>
            </div>
            <img
              src={selectedArtist.image}
              alt={selectedArtist.name}
              className="selected-artist-image"
            />
            <h2>{selectedArtist.name}</h2>
            <h3>{selectedArtist.genre}</h3>
            <div className="toggle-section">
              <button type="button" onClick={toggleVideo} className="toggle-button">
                {showVideo ? 'Show Tracks' : 'Show Video'}
              </button>
            </div>
            {!showVideo && (
              <div className="track-list">
                <audio ref={audioRef} controls style={{ display: 'none' }} />
                {selectedArtist.tracks.map((track) => (
                 <div key={track.name} className="track-item">
                    <p className="track-name">{track.name}</p>
                    <button type="button"
                      onClick={() => handleTrackClick(track)}
                      className="play-button"
                    >
                      {currentTrack === track.audio ? 'Pause' : 'Play'}
                    </button>
                  </div>
                ))}
                <div className="playback-speed-control">
                  <label htmlFor="playback-speed">Playback Speed: </label>
                  <select
                    id="playback-speed"
                    value={playbackSpeed}
                    onChange={(e) =>
                      handlePlaybackSpeedChange(parseFloat(e.target.value))
                    }
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </div>
            )}
            {showVideo && (
              <div className="video-section" ref={videoRef}>
                <h3>Featured Video</h3>
                {selectedArtist.video.includes('youtube.com') ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={selectedArtist.video}
                    title={selectedArtist.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls width="100%">
                    <source src={selectedArtist.video} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>
                )}
              </div>
            )}
          </section>
        )}
      </div>

      <footer className="footer">
        <p>© 2024 Top Artists. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Artists;