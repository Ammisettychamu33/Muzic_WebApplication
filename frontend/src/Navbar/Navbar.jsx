import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Info,
  Album,
  Phone,
  Settings,
  LogIn,
  User,
  Music,
  Menu,
  X,
} from 'lucide-react';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navbar */}
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <NavLink
            to="/home"
            className="logo-link"
            onClick={closeMenu}
          >
            <div className="logo">
              <Music size={24} />
            </div>

            <span className="logo-text">Muzik</span>
          </NavLink>
        </div>

        <ul>
          <li>
            <NavLink
              to="/home"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <Info size={20} />
              <span>About</span>
            </NavLink>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/albums"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  <Album size={20} />
                  <span>Albums</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/artists"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  <User size={20} />
                  <span>Artists</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/crud"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  <Music size={20} />
                  <span>Music Collections</span>
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <Phone size={20} />
              <span>Contact</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <Settings size={20} />
              <span>Services</span>
            </NavLink>
          </li>

          {isLoggedIn ? (
            <li>
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                <LogIn size={20} />
                <span>Log Out</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/registration"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  <User size={20} />
                  <span>Registration</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;