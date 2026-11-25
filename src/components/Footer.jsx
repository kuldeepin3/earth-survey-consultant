import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container footer-content">
        <div className="footer-brand">
          <a href="#" className="logo">
            <img src="/earth_survey_logo.jpg" alt="Earth Survey Consultant Logo" className="logo-img" />
            <span>Earth Survey<br/>Consultant</span>
          </a>
          <p>Precision Engineering You Can Build On. Trusted by civil engineers, infrastructure contractors, and property owners across Gujarat, India.</p>
        </div>
        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About & Leadership</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#calculator">Instant Estimator</a></li>
            <li><a href="#why-us">Why Choose Us</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
            <li><a href="#contact">Contact & Location</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#94A3B8' }}>
            Vadodara, Gujarat, India<br/>
            Email: <a href="mailto:forpurpose119@gmail.com" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>forpurpose119@gmail.com</a>
          </p>
          <div className="social-icons">
            <a href="mailto:forpurpose119@gmail.com" title="Email Us"><i className="fa-solid fa-envelope"></i></a>
            <a href="#" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Earth Survey Consultant. Directed by Kirit Prajapati. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
