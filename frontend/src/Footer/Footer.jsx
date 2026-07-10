import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* About */}
        <div className="footer-section">
          <h3>Music Vibes</h3>

          <p>
            Music Vibes is your destination for discovering albums,
            artists, playlists, and enjoying music from around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/albums">Albums</Link>
            </li>

            <li>
              <Link to="/artists">Artists</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3>Connect With Us</h3>

          <div className="social-links">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://github.com/Ammisettychamu33"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/chamundeswari-ammisetty-371676287"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>

          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <strong>Music Vibes</strong>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;