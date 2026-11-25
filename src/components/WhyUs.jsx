import React from 'react';
import './WhyUs.css';

const WhyUs = () => {
  return (
    <section className="why-us" id="why-us">
      <div className="container">
        <div className="why-us-content">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="title-underline"></div>
          <div className="features-grid">
            <div className="feature-item">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <h4>Years of Experience</h4>
              <p>Our veteran team brings deep industry knowledge to solve complex tasks.</p>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-satellite"></i>
              <h4>Modern Equipment</h4>
              <p>Deploying the latest Total Stations, DGPS, and mapping software.</p>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-crosshairs"></i>
              <h4>Accurate Results</h4>
              <p>Strictly verified data points ensuring safety and compliance.</p>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-truck-fast"></i>
              <h4>Timely Delivery</h4>
              <p>Systematically delivering comprehensive reports right on time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
