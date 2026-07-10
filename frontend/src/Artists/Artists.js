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
        { name: 'Love Story', audio: 'https://s3.ultimate-guitar.com/audio.com.audio/source/10/30/1828209253643010-1828209253680867.mp3?response-content-disposition=attachment%3B%20filename%3D%22Taylor%20Swift%20-%20Love%20Story%20%28Lyrics%29.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ROGQRDMARJQJJ35IUG5T%2F20260707%2Fus-west%2Fs3%2Faws4_request&X-Amz-Date=20260707T184229Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=09fbb4c40ac4bb537024ad306fef9021960ef59d3d5ea5e07fc94fcaf75944f2' },
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
        { name: 'Blinding Lights', audio: 'https://s3.ustatik.com/audio.com.audio/transcoding/50/86/1854693117758650-1855318188406517-1855318191572505.mp3?response-content-disposition=attachment%3B%20filename%3D%2204%20Blinding%20Lights%20%28with%20Ad%20Break%29.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260709%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260709T084511Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=78ba7fb3a3af933fbdffbf9d88ad21b3512746a6c2d4cc313edf420133395301' },
        { name: 'Starboy', audio: 'https://www.soundboard.com/track/download/986752' },
        { name: 'Save Your Tears', audio: 'https://s3.ultimate-guitar.com/audio.com.audio/source/32/74/1817891202577432-1817891202609499.mp3?response-content-disposition=attachment%3B%20filename%3D%22Save%20Your%20Tears%20-%20The%20Weeknd.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ROGQRDMARJQJJ35IUG5T%2F20260707%2Fus-west%2Fs3%2Faws4_request&X-Amz-Date=20260707T203232Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=4def1632b7495ed3ce2117458358adad1674220ad72a4a32c8464fd1163d029a' },
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
        { name: 'Jai Ho', audio: 'https://dn710109.ca.archive.org/0/items/jai-ho/Jai%20Ho.mp3' },
        { name: 'Nee Singam Dhan', audio: 'https://pagal-world.com.co/wp-content/uploads/2026/06/Nee%20Singam%20Dhan%20-%20Pathu%20Thala%20(128%20kbps).mp3' },
        { name: 'Tum Tak', audio: 'https://pagal-world.com.co/wp-content/uploads/2026/06/Tum%20Tak%20-%20Raanjhanaa%20(128%20kbps).mp3' },
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
        { name: 'Why This Kolaveri Di', audio: 'https://cdn.besttamilan.com/upload_file/3/55/73/Why_This_Kolaveri_Di_The_Soup_of_Love.mp3' },
        { name: 'Chellamma', audio: 'https://cdn.besttamilan.com/upload_file/3/55/144/Chellamma.mp3' },
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
        { name: 'Shape of You', audio: 'https://s3.ustatik.com/audio.com.audio/source/86/45/1833906561804586-1833906561856521.mp3?response-content-disposition=attachment%3B%20filename%3D%22Ed%20Sheeran%20%20Shape%20of%20You%20Official%20Music%20Video.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260707%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260707T213755Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=616a9b41cc2e2f41a82c1bdb204d14d1c8768e9969163f01f3b8d70415f13985' },
        { name: 'Perfect', audio: 'https://s3.ustatik.com/audio.com.audio/transcoding/04/45/1849883486634504-1849883486795315-1849883556000487.mp3?response-content-disposition=attachment%3B%20filename%3D%22Perfect%20%28Originally%20Performed%20by%20Ed%20Sheeran%29%28M4A_128K%29.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260709%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260709T151221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=5cd4642292434a602bad8aae98af27a6de515d25f573a6f477e512f2920960cd' },
        { name: 'Thinking Out Loud', audio: 'https://s3.ustatik.com/audio.com.audio/source/30/60/1853089081246030-1853089081310111.mp3?response-content-disposition=attachment%3B%20filename%3D%22SpotiDown.App%20-%20Thinking%20out%20Loud%20-%20Ed%20Sheeran.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260709%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260709T072817Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=a522ae0d4468cbbc66e3406284b57718ceee53e9b2fa2e59227eae50c8b41780' },
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