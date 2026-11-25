import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <header className="hero" id="hero">
      <div className="hero-bg-image"></div>
      <div className="hero-overlay"></div>
      <motion.div 
        className="container hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <i className="fa-solid fa-satellite-dish"></i>
          ISO Certified Geospatial & Land Surveying
        </motion.div>
        
        <h1>Precision Engineering You Can <span className="text-gradient">Build On</span></h1>
        
        <p>Delivering sub-centimeter GPS accuracy, high-density topographic mapping, and digital computerized layouts across commercial, industrial, and infrastructure projects.</p>
        
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#calculator" className="btn btn-primary">
            Instant Quote <i className="fa-solid fa-calculator"></i>
          </a>
          <a href="#services" className="btn btn-outline">
            Our Services <i className="fa-solid fa-arrow-down"></i>
          </a>
          <a href="mailto:forpurpose119@gmail.com" className="btn btn-outline" style={{ borderColor: 'var(--brand-secondary)', color: 'var(--brand-secondary)' }}>
            Email Inquiry <i className="fa-solid fa-envelope"></i>
          </a>
        </motion.div>

        <motion.div 
          className="hero-trust-bar"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="trust-item">
            <i className="fa-solid fa-award"></i>
            <div>
              <div className="trust-title">10+ Years</div>
              <div className="trust-desc">Field Experience</div>
            </div>
          </div>
          <div className="trust-item">
            <i className="fa-solid fa-crosshairs"></i>
            <div>
              <div className="trust-title">Millimeter Precision</div>
              <div className="trust-desc">DGPS & Total Station</div>
            </div>
          </div>
          <div className="trust-item">
            <i className="fa-solid fa-circle-check"></i>
            <div>
              <div className="trust-title">500+ Projects</div>
              <div className="trust-desc">Completed in Gujarat</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Hero;
