import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about section-light" id="about">
      <div className="container about-grid">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title dark-text">About Us</h2>
          <div className="title-underline dark-line"></div>
          <p><strong>Earth Survey Consultant</strong> is a premier land and geospatial surveying firm in Gujarat. We combine modern computerized tools, high-precision GNSS receivers, and deep field engineering expertise to deliver survey data that civil engineers, developers, and planners can depend on with complete confidence.</p>
          <p>Our commitment: Delivering flawless geospatial intelligence that establishes the accurate foundation for your most ambitious projects.</p>
          
          <div className="founder-info">
            <h4><i className="fa-solid fa-user-tie"></i> Personally Led by Kirit Prajapati</h4>
            <p>All survey operations, field mapping, and final computations are personally supervised by our Principal Surveyor, <strong>Mr. Kirit Prajapati</strong>. With direct leadership in every project, you are assured of rigorous quality checks and zero-margin error verification.</p>
          </div>

          <ul className="about-features">
            <li><i className="fa-solid fa-circle-check"></i> Advanced CHCNAV DGPS & Total Stations</li>
            <li><i className="fa-solid fa-circle-check"></i> Certified Precision Geomatics Professionals</li>
            <li><i className="fa-solid fa-circle-check"></i> Complete CAD Drawings, Contour Profiles & GIS Deliverables</li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="Surveyor Outdoors" className="about-img" />
          <div className="experience-badge pulse">
            <span className="number">10+</span>
            <span className="text">Years Of<br/>Excellence</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
