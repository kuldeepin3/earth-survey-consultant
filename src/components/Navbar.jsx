import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/earth_survey_logo.jpg" alt="Earth Survey Consultant Logo" className="logo-img" />
          <span>Earth Survey<br/>Consultant</span>
        </Link>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="/#services" onClick={() => setMenuOpen(false)}>Services</a></li>
          <li><a href="/#calculator" onClick={() => setMenuOpen(false)}>Estimator</a></li>
          <li><a href="/#why-us" onClick={() => setMenuOpen(false)}>Why Us</a></li>
          <li><a href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
          
          {user ? (
            <li>
              <Link to="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1.4rem' }} onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.4rem' }} onClick={() => setMenuOpen(false)}>
                Log In
              </Link>
            </li>
          )}
          
          <li><a href="/#contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Quote</a></li>
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme" title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </li>
        </ul>
        <div className="mobile-cta">
          <a href="mailto:forpurpose119@gmail.com" className="btn btn-primary mobile-call-btn" title="Email Us">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
