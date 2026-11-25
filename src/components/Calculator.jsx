import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Calculator.css';

const surveyTypeNames = {
  boundary: 'Land Survey',
  topographic: 'Topography & Contour',
  alta: 'Canal / Cadastral',
  construction: 'Building Plotting'
};

const Calculator = () => {
  const [surveyType, setSurveyType] = useState('boundary');
  const [landSize, setLandSize] = useState(1);
  const [terrain, setTerrain] = useState('flat');
  const [estimate, setEstimate] = useState(0);

  // Pricing Logic (INR)
  const calculateEstimate = () => {
    let basePrice = 0;
    
    switch(surveyType) {
      case 'boundary': basePrice = 6000; break;
      case 'topographic': basePrice = 9000; break;
      case 'alta': basePrice = 14000; break;
      case 'construction': basePrice = 7500; break;
      default: basePrice = 6000;
    }

    // Size multiplier (₹1,200 per acre above 1)
    const sizeCost = Math.max(0, (landSize - 1)) * 1200;
    
    // Terrain multiplier
    let terrainMultiplier = 1;
    if (terrain === 'hilly') terrainMultiplier = 1.25;
    if (terrain === 'wooded') terrainMultiplier = 1.45;

    const total = (basePrice + sizeCost) * terrainMultiplier;
    setEstimate(Math.round(total));
  };

  useEffect(() => {
    calculateEstimate();
  }, [surveyType, landSize, terrain]);

  const handleProceedToQuote = (e) => {
    e.preventDefault();
    const serviceName = surveyTypeNames[surveyType] || 'Land Survey';
    const detail = {
      service: serviceName,
      landSize,
      terrain,
      estimate
    };
    
    // Dispatch custom event for Contact component
    window.dispatchEvent(new CustomEvent('prefill-quote', { detail }));

    // Smooth scroll to contact
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="calculator section-light" id="calculator">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title dark-text">Instant Quote Estimator</h2>
          <div className="title-underline center"></div>
          <p className="section-subtitle">Get an instant preliminary cost estimation for your project based on land parcel size and terrain conditions.</p>
        </motion.div>

        <div className="calc-wrapper">
          <motion.div 
            className="calc-form"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-group">
              <label><i className="fa-solid fa-map-location-dot text-gradient" style={{ marginRight: '8px' }}></i>Type of Survey</label>
              <select value={surveyType} onChange={(e) => setSurveyType(e.target.value)}>
                <option value="boundary">Boundary / Land Survey</option>
                <option value="topographic">Topographic & Contour Elevation</option>
                <option value="alta">Cadastral & Land Title Demarcation</option>
                <option value="construction">Building Layout & Setting Out</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fa-solid fa-vector-square text-gradient" style={{ marginRight: '8px' }}></i>
                Land Parcel Size: <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>{landSize} {landSize === 1 ? 'Acre' : 'Acres'}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={landSize} 
                onChange={(e) => setLandSize(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>1 Acre (Min)</span>
                <span>25 Acres</span>
                <span>50+ Acres</span>
              </div>
            </div>

            <div className="form-group">
              <label><i className="fa-solid fa-mountain-sun text-gradient" style={{ marginRight: '8px' }}></i>Terrain Condition</label>
              <div className="terrain-options">
                <button 
                  type="button"
                  className={`terrain-btn ${terrain === 'flat' ? 'active' : ''}`}
                  onClick={() => setTerrain('flat')}
                >
                  <i className="fa-solid fa-road"></i> Flat & Clear
                </button>
                <button 
                  type="button"
                  className={`terrain-btn ${terrain === 'hilly' ? 'active' : ''}`}
                  onClick={() => setTerrain('hilly')}
                >
                  <i className="fa-solid fa-mountain"></i> Hilly / Sloped
                </button>
                <button 
                  type="button"
                  className={`terrain-btn ${terrain === 'wooded' ? 'active' : ''}`}
                  onClick={() => setTerrain('wooded')}
                >
                  <i className="fa-solid fa-tree"></i> Dense Vegetation
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="calc-result"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="result-card">
              <div>
                <h3>Estimated Survey Cost</h3>
                <p className="disclaimer">*Preliminary estimate. Official cost finalized post field inspection.</p>
                
                <div className="price-display">
                  <span className="currency">₹</span>
                  <span className="amount">{estimate.toLocaleString('en-IN')}</span>
                </div>

                <ul className="included-list">
                  <li><i className="fa-solid fa-circle-check"></i> High-accuracy DGPS & Total Station field team</li>
                  <li><i className="fa-solid fa-circle-check"></i> Contour elevation & profile cross-sections</li>
                  <li><i className="fa-solid fa-circle-check"></i> Computerized AutoCAD (.dwg) & PDF deliverables</li>
                  <li><i className="fa-solid fa-circle-check"></i> Verified by Principal Surveyor Kirit Prajapati</li>
                </ul>
              </div>

              <button onClick={handleProceedToQuote} className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem' }}>
                Lock In This Estimate <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
