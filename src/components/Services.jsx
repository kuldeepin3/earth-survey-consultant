import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const servicesList = [
  { icon: 'fa-map', title: 'Land Survey', desc: 'Precision land measurement and mapping for residential and commercial plots.' },
  { icon: 'fa-mountain', title: 'Topography & Contour', desc: 'Detailed topographic mapping capturing natural features with precise elevations.' },
  { icon: 'fa-ruler-combined', title: 'C/S & L/S Work', desc: 'Computerized Section generation for accurate profile analysis.' },
  { icon: 'fa-road', title: 'Highway / Pipeline', desc: 'Alignment and topographic surveying for linear transportation projects.' },
  { icon: 'fa-building', title: 'Building Plotting', desc: 'Precise setting out and leveling to guide construction exactly as planned.' },
  { icon: 'fa-water', title: 'Canal / Cadastral', desc: 'Boundary definitions for canal networks and land registries.' },
];

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">Our Services</h2>
          <div className="title-underline center"></div>
          <p className="section-subtitle">Comprehensive geospatial and mapping solutions tailored to your needs with absolute precision.</p>
        </div>
        
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesList.map((service, idx) => (
            <motion.div className="service-card glass-card" key={idx} variants={cardVariants}>
               <div className="service-icon"><i className={`fa-solid ${service.icon}`}></i></div>
               <h3>{service.title}</h3>
               <p>{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
