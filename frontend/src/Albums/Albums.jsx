import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Albums.css';

// Define the albumsData object
const albumsData = {
  telugu: [
    {
      id: 1,
      title: 'Hi Nanna',
      artist: 'Hesham Abdul Wahab',
      year: 2023,
      genre: 'Romantic',
      cover: 'https://occ-0-8407-1723.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABYRYOYABadb1mRM4nM1pgdneVIXLVozmlqi3lOFLXl8WO5UHZqERjuESM9uK8uC30aSPUOv9wRW8AhoU264TJnowYP9-bT5w7Tk5.jpg?r=773',
      link: 'https://www.google.com/search?q=Hi+Nanna+album',
      audio: 'https://mp3teluguwap.net/mp3/2023/Hi%20Nanna/Hi%20Nanna/Odiyamma.mp3',
      video: 'https://www.youtube.com/embed/WuBsvj2AJj0?si=5b52QDS7nbI5zPTN',
    },
    {
      id: 2,
      title: 'Salaar',
      artist: 'Ravi Basrur',
      year: 2023,
      genre: 'Action',
      cover: 'https://images.filmibeat.com/ph-big/2023/09/salaar_169596800440.jpg',
      link: 'https://www.google.com/search?q=Salaar+album',
      audio: 'https://mp3teluguwap.net/mp3/2023/Salaar/Sound%20of%20Salaar.mp3',
      video: 'https://www.youtube.com/embed/Z1QuBXVrUHU?si=vniVxJRuzUk4zPOM',
    },
    {
      id: 3,
      title: 'Pushpa: The Rise',
      artist: 'Devi Sri Prasad',
      year: 2021,
      genre: 'Action',
      cover: 'https://images.news18.com/ibnlive/uploads/2024/05/pushpa-2-new-song-2024-05-34d5805dfddd6eb3bfd7e88a42f19002.jpg',
      link: 'https://www.google.com/search?q=Pushpa+The+Rise+album',
      audio: 'https://mp3teluguwap.net/mp3/2021/Pushpa/Pushpa%20(2021)/Dakko%20Dakko%20Meka.mp3',
      video: 'https://www.youtube.com/embed/u_wB6byrl5k?si=uy-sTzPm6yr8N40C',
    },
    {
      id: 4,
      title: 'Ala Vaikunthapurramuloo',
      artist: 'Thaman S',
      year: 2020,
      genre: 'Action',
      cover: 'https://i.scdn.co/image/ab67616d0000b273807942c7080fe48745c8f6b3',
      link: 'https://www.google.com/search?q=Ala+Vaikunthapurramuloo+album',
      audio: 'https://mp3teluguwap.net/mp3/2020/Ala%20Vaikunthapurramuloo%20(2020)/Ala%20Vaikunthapurramuloo%20(2020)/OMG%20Daddy%20-%20SenSongsMp3.Co.mp3',
      video: 'https://www.youtube.com/embed/Qryz5rAm4FI?si=TOa-D82UW8fr7jZS',
    },
  ],
  hindi: [
    {
      id: 5,
      title: 'Animal',
      artist: 'Harshavardhan Rameshwar',
      year: 2023,
      genre: 'Action',
      cover: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/6/2023/11/29182225/Animal-movie-location-2.jpg?tr=w-1200,q-60',
      link: 'https://www.google.com/search?q=Animal+album',
      audio: 'https://pagal-world.com.co/wp-content/uploads/2026/06/Kashmir%20-%20ANIMAL%20(128%20kbps).mp3',
      video: 'https://www.youtube.com/embed/y1WfYJ8xrc8?si=57biXE7fP7ZURZE5',
    },
    {
      id: 6,
      title: 'Pathaan',
      artist: 'Vishal-Shekhar',
      year: 2023,
      genre: 'Action',
      cover: 'https://i.pinimg.com/736x/4d/47/3d/4d473d1edded9306190ec66c0c1c4628.jpg',
      link: 'https://www.google.com/search?q=Pathaan+album',
      audio: 'https://320.pagalnew.com/download-320k.php?id=37159',
      video: 'https://www.youtube.com/embed/SGHQuqMH7p8?si=oCp2ujMQVA3xvlGT',
    },
    {
  id: 7,
  title: 'Student of the Year',
  artist: 'Vishal & Shekhar',
  year: 2012,
  genre: 'Romance / Drama',
  cover: 'https://pagal-world.com.co/wp-content/uploads/2026/06/Student-of-the-Year-Hindi-2012-20190618094244-500x500.jpg',
  link: 'https://www.google.com/search?q=Student+of+the+Year+2012+album',
  audio: 'https://pagal-world.com.co/wp-content/uploads/2026/06/Radha%20-%20Student%20of%20the%20Year%20(128%20kbps).mp3',
  video: 'https://youtu.be/mcL6ZErM49Q?si=9Z0qdxHUO5Lue9eV'
},
    {
      id: 8,
      title: 'Kabir Singh',
      artist: 'Amaal Mallik, Vishal Mishra, Sachet-Parampara',
      year: 2019,
      genre: 'Romantic',
      cover: 'https://m.media-amazon.com/images/I/71UXkorikgL._UF1000,1000_QL80_.jpg',
      link: 'https://www.google.com/search?q=Kabir+Singh+album',
      audio: 'https://pagal-world.com.co/wp-content/uploads/2026/06/Tujhe%20Kitna%20Chahein%20Aur%20(Film%20Version)%20-%20Kabir%20Singh%20(320%20kbps).mp3',
      video: 'https://www.youtube.com/embed/BDlNjOc3wiQ?si=LUa-J55CedZkPIxO',
    },
  ],
  tamil: [
    {
      id: 9,
      title: 'Leo',
      artist: 'Anirudh Ravichander',
      year: 2023,
      genre: 'Action',
      cover: 'https://i.ytimg.com/vi/Po3jStA673E/maxresdefault.jpg',
      link: 'https://www.google.com/search?q=Leo+album',
      audio: 'https://mp3teluguwap.net/mp3/2023/Leo%20(2023)/Leo%20(2023)/Naa%20Ready.mp3',
      video: 'https://www.youtube.com/embed/QLtoSEqF8ag?si=62CiYKAn75xorSo6',
    },
    {
      id: 10,
      title: 'Jailer',
      artist: 'Anirudh Ravichander',
      year: 2023,
      genre: 'Action',
      cover: 'https://m.economictimes.com/thumb/msid-102527517,width-1600,height-900,resizemode-4,imgsize-56396/rajinikanths-jailer-set-to-storm-theaters-in-the-us-with-sky-high-expectations.jpg',
      link: 'https://www.google.com/search?q=Jailer+album',
      audio: 'https://mp3teluguwap.net/mp3/2023/Jailer/Jailer/Jailer%20Theme%20(Instrumental).mp3',
      video: 'https://www.youtube.com/embed/X8k6LPsB4tY?si=pB8FC7QCUNDJVzdd',
    },
    {
      id: 11,
      title: 'Ponniyin Selvan: I',
      artist: 'A. R. Rahman',
      year: 2022,
      genre: 'Historical',
      cover: 'https://c.saavncdn.com/613/Aga-Naga-From-Ponniyin-Selvan-Part-2-Tamil-2023-20240823225332-500x500.jpg',
      link: 'https://www.google.com/search?q=Ponniyin+Selvan+album',
      audio: 'https://mp3teluguwap.net/mp3/2022/Ponniyan%20Selvan/Ponniyan%20Selvan%20(2022)/Alaikadal.mp3',
      video: 'https://www.youtube.com/embed/fbyq3AZWPYs?si=AZkHcFj7We3-aoiY',
    },
    {
      id: 12,
      title: 'Master',
      artist: 'Anirudh Ravichander',
      year: 2021,
      genre: 'Action',
      cover: 'https://c.saavncdn.com/231/Master-the-Blaster-From-Master--English-2021-20210115102601-500x500.jpg',
      link: 'https://www.google.com/search?q=Master+album',
      audio: 'https://mp3teluguwap.net/mp3/2020/Master%20(2020)/01%20-%20Kutti%20Story%20-%20SenSongsMp3.Co.mp3',
      video: 'https://www.youtube.com/embed/d2SYKWBlwjE?si=fm-wLHt7nuMkwEWK',
    },
  ],
  english: [
    {
      id: 13,
      title: 'Midnights',
      artist: 'Taylor Swift',
      year: 2022,
      genre: 'Pop',
      cover: 'https://theblackandwhite.net/wp-content/uploads/2023/02/midnights.png',
      link: 'https://www.google.com/search?q=Midnights+album',
      audio: 'https://cs1.mp3.pm/download/175838595/cTJVQytDZ1l6bHowVnVDYUdtaFhUdm1LMFFvaDJqd1lTWjZyODRMWlZMTGlWdU0xeHp4VDVnY2lNdm1CWmtMSmJhT1EzaUNKdDRsZWVmUGN1QnF4TVNCNWE2dER6U0JrSWVzNFBMTmd1QTFYMjRIVkI3MzdOSFcxN25vSXBRYy8/TaylorSwift_-_IKnewYouWereTrouble_DJArixClubRemix_(mp3.pm).mp3',
      video: 'https://youtu.be/uSWL3Bm4fwg?si=DhrcwDRwwVZZ0MO6',
    },
    {
      id: 14,
      title: 'After Hours',
      artist: 'The Weeknd',
      year: 2020,
      genre: 'R&B',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtz6NCMQ8-Qz3A1t61EDv04yBbFZhALl9baA&s',
      link: 'https://www.google.com/search?q=After+Hours+album',
      audio: 'https://s320.djpunjab.is/data/320/52951/301042/Afterhours%20-%20BIR.mp3',
      video: 'https://www.youtube.com/embed/ygTZZpVkmKg?si=-4Z-B9aCR8Kn9GGj',
    },
    {
      id: 15,
      title: 'Dawn FM',
      artist: 'The Weeknd',
      year: 2022,
      genre: 'R&B',
      cover: 'https://thepostermonster.com.au/cdn/shop/products/S111676cf23d84e599082d58376200ae2m.jpg?v=1681780417&width=1445',
      link: 'https://www.google.com/search?q=Dawn+FM+album',
      audio: 'https://cs1.mp3.pm/download/203617237/cTJVQytDZ1l6bHowVnVDYUdtaFhUdm1LMFFvaDJqd1lTWjZyODRMWlZMSVY4Zm5iYmxwNTZjZEdFaXBNdTdESVdDdEY3OWRwUXZwMnB0SmYwMDhuekM5TDB1dmdlLysxMXRicWxERnFrcE4wdUpsRDdmV3ZEYzk3ck14UCtaaTk/The_Weeknd_i_ya_-_Dawn_FM_Album_extended_with_some_stems_(mp3.pm).mp3',
      video: 'https://www.youtube.com/embed/hWlYEaxubRY?si=JTaKbowDFWWKHGxV',
    },
    {
      id: 16,
      title: 'Folklore',
      artist: 'Taylor Swift',
      year: 2020,
      genre: 'Indie',
      cover: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png',
      link: 'https://www.google.com/search?q=Folklore+album',
      audio: 'https://s3.ustatik.com/audio.com.audio/source/61/09/1816100479800961-1816100479828738.mp3?response-content-disposition=attachment%3B%20filename%3D%22invisible%20string%20-%20Taylor%20Swift.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260707%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260707T205042Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=81a8133bd4b2c43dba2fc02b5547aa07edd4cd10b52122ba07ed184614cea5f6',
      video: 'https://youtu.be/K-a8s8OLBSE?si=9OshPNRhoT5m0sM4',
    },
  ],
};

function Albums() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const audioRef = useRef(new Audio());

  // Cleanup audio on component unmount
  useEffect(() => {
    const currentAudioRef = audioRef.current; // Store the current value in a variable

    return () => {
      if (currentAudioRef) {
        currentAudioRef.pause();
        currentAudioRef.currentTime = 0;
        currentAudioRef.src = '';
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

const handlePlay = async (album) => {
  try {
    // Stop previous song
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // Stop if clicking same song
    if (currentlyPlaying === album.id) {
      setCurrentlyPlaying(null);
      return;
    }

    // No playable audio
    if (!album.audio || !album.audio.startsWith("http")) {
      alert("Audio is unavailable.");
      return;
    }

    audioRef.current.src = album.audio;
    await audioRef.current.play();

    setCurrentlyPlaying(album.id);

    audioRef.current.onended = () => {
      setCurrentlyPlaying(null);
    };
  } catch (err) {
    console.error(err);
    setCurrentlyPlaying(null);
    alert("Unable to play this song.");
  }
};

  const handleVideoPlay = (videoUrl) => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentlyPlaying(null);

    setSelectedVideo(videoUrl);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const allAlbums = Object.values(albumsData).flat();
      const filtered = allAlbums.filter(
        (album) =>
          album.title.toLowerCase().includes(query) ||
          album.artist.toLowerCase().includes(query) ||
          album.genre.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        setFilteredAlbums(filtered);
      } else {
        // Redirect to Google if no album is found
        window.open(
        `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
        "_blank"
        );
      }
    } else {
      setFilteredAlbums([]);
    }
  };

  const renderAlbums = (albums) => {
    if (!albums || albums.length === 0) {
      return <p>No albums found.</p>;
    }

    return (
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            <img
              src={album.cover}
              alt={album.title}
              className="album-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/250x250?text=No+Image";
              }}
            />
            <div className="album-info">
              <h3 className="album-title">{album.title}</h3>
              <p className="album-artist">{album.artist} ({album.year})</p>
              <p className="album-genre">{album.genre}</p>
            </div>
            <div className="album-actions">
              <a href={album.link} target="_blank" rel="noopener noreferrer" className="view-details-btn">
                View Details
              </a>
              <button
              className={`play-btn ${currentlyPlaying===album.id?'playing':''}`}
              disabled={!album.audio || !album.audio.startsWith("http")}
              onClick={()=>handlePlay(album)}
              >
                {currentlyPlaying === album.id ? 'Stop' : 'Play'}
              </button>
              <button
                className="video-btn"
                onClick={() => handleVideoPlay(album.video)}
              >
                Play Video
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="albums-container">
      <h2>🎵 Explore Music Albums</h2>

      {/* Navigation to Artists */}
      <Link to="/artists" className="nav-to-artists">
        Explore Artists
      </Link>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for albums or songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>

      {/* Video Section */}
      {selectedVideo && (
        <div className="video-section">
          <button
            className="close-video-btn"
            onClick={() => {
                setSelectedVideo(null);
            }}
            >
            Close
          </button>
          <iframe
            src={selectedVideo}
            title="Album Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Display filtered albums if search query exists */}
      {filteredAlbums.length > 0 ? (
        <section className="album-section">
          <h2>Search Results</h2>
          {renderAlbums(filteredAlbums)}
        </section>
      ) : (
        <>
          {/* Display all albums if no search query */}
          <section className="album-section">
            <h2>Telugu Albums</h2>
            {renderAlbums(albumsData.telugu)}
          </section>

          <section className="album-section">
            <h2>Hindi Albums</h2>
            {renderAlbums(albumsData.hindi)}
          </section>

          <section className="album-section">
            <h2>Tamil Albums</h2>
            {renderAlbums(albumsData.tamil)}
          </section>

          <section className="album-section">
            <h2>English Albums</h2>
            {renderAlbums(albumsData.english)}
          </section>
        </>
      )}
    </div>
  );
}

export default Albums;