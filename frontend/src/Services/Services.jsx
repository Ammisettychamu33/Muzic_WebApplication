import React from "react";
import "./Services.css";

function Services() {
  const services = [
    {
      title: "Music Albums",
      description:
        "Browse a collection of popular albums across Telugu, Hindi, Tamil, and English music."
    },
    {
      title: "Top Artists",
      description:
        "Explore talented artists, learn about them, and enjoy their most popular songs and videos."
    },
    {
      title: "Music Search",
      description:
        "Quickly search for albums, artists, or genres and discover your favorite music."
    },
    {
      title: "Audio Playback",
      description:
        "Listen to songs directly within the application using the built-in music player."
    },
    {
      title: "Music Videos",
      description:
        "Watch official music videos directly from the application through embedded YouTube videos."
    },
    {
      title: "Music Collection Management",
      description:
        "Add, update, view, and delete albums using the integrated Music Collection Management system."
    },
    {
      title: "Secure User Authentication",
      description:
        "Register and log in securely to access protected features of the Music Vibes application."
    },
    {
      title: "Responsive Design",
      description:
        "Enjoy a smooth experience on desktop, tablet, and mobile devices."
    },
    {
      title: "Easy Navigation",
      description:
        "Navigate effortlessly between Home, Albums, Artists, Services, Contact, and other sections."
    },
    {
      title: "Modern User Interface",
      description:
        "A clean and attractive interface designed to provide an enjoyable music browsing experience."
    }
  ];

  return (
    <div className="services">
      <div className="content">
        <h1>Our Services</h1>

        <p>
          Music Vibes provides everything you need to explore music, discover
          artists, and manage your favorite albums in one place.
        </p>

        <div className="service-list">
          {services.map((service, index) => (
            <div className="service-item" key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;