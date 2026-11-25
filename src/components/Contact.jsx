import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    const handlePrefill = (e) => {
      if (e.detail) {
        const { service, landSize, terrain, estimate } = e.detail;
        setFormData(prev => ({
          ...prev,
          service: service || prev.service,
          message: `Hello Mr. Kirit Prajapati, I used your Instant Estimator for a ${service} on a ${landSize} Acre parcel (${terrain} terrain). Estimated amount was ₹${estimate.toLocaleString('en-IN')}. Please provide an official quotation and timeline for dispatch.`
        }));
      }
    };

    window.addEventListener('prefill-quote', handlePrefill);
    return () => window.removeEventListener('prefill-quote', handlePrefill);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Send directly to owner's inbox via FormSubmit API
      const response = await fetch('https://formsubmit.co/ajax/forpurpose119@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Email: formData.email,
          Phone: formData.phone || 'Not provided',
          Service_Requested: formData.service,
          Project_Details: formData.message,
          _subject: `New Survey Inquiry: ${formData.service} from ${formData.fullName}`,
          _template: 'table',
          _captcha: 'false'
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        setFormData({ fullName: '', email: '', phone: '', service: '', message: '' });
      } else {
        // Fallback to mailto link if API rejects or limits
        console.warn('FormSubmit responded with non-ok status:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Email delivery error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="contact section-light" id="contact">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title dark-text">Get In Touch</h2>
          <div className="title-underline center"></div>
          <p className="section-subtitle">Reach out directly to Principal Surveyor Kirit Prajapati for consultations, immediate field deployment, and formal tenders.</p>
        </motion.div>
        
        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-item">
              <div className="icon-wrapper"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <h4>Head Office</h4>
                <p>Earth Survey Consultant Office Location</p>
                <a 
                  href="https://maps.app.goo.gl/5RQ8ddBWFTCnTnvw8" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.4rem' }}
                >
                  Open in Google Maps <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.78rem' }}></i>
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-wrapper"><i className="fa-solid fa-envelope"></i></div>
              <div>
                <h4>Official Email</h4>
                <p><a href="mailto:forpurpose119@gmail.com" style={{ color: 'var(--brand-primary)', fontWeight: 700, fontSize: '1.05rem' }}>forpurpose119@gmail.com</a></p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Send project proposals, coordinates & tender inquiries</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-wrapper"><i className="fa-solid fa-clock"></i></div>
              <div>
                <h4>Inquiry Response</h4>
                <p>All email inquiries are reviewed directly by Principal Surveyor Kirit Prajapati within 24 hours.</p>
                <a href="mailto:forpurpose119@gmail.com" className="btn btn-outline" style={{ marginTop: '0.6rem', padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
                  Send Email Directly <i className="fa-solid fa-paper-plane"></i>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {status === 'success' && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1.5px solid #10B981',
                color: '#10B981',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 600
              }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '1.3rem' }}></i>
                <span>Thank you! Your survey inquiry has been sent to our team at <strong>forpurpose119@gmail.com</strong>. We will review your project details and get back to you shortly.</span>
              </div>
            )}

            {status === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1.5px solid #EF4444',
                color: '#EF4444',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '6px' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>Unable to dispatch via web service.</span>
                </div>
                <p style={{ margin: '0 0 8px 0', color: 'var(--text-color)' }}>
                  Please email your query directly to <strong>forpurpose119@gmail.com</strong>:
                </p>
                <a 
                  href={`mailto:forpurpose119@gmail.com?subject=Survey Inquiry from ${encodeURIComponent(formData.fullName || 'Client')}&body=${encodeURIComponent(formData.message || '')}`}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}
                >
                  Send via Email App <i className="fa-solid fa-paper-plane"></i>
                </a>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g. Rajesh Patel" />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@company.com" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone / Contact (Optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Optional contact number" />
              </div>
              <div className="form-group">
                <label>Survey Service Required *</label>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="" disabled>Select required service</option>
                  <option value="Land Survey">Land Survey & Demarcation</option>
                  <option value="Topography & Contour">Topography & Contour Elevation</option>
                  <option value="C/S & L/S Work">C/S & L/S Work (Cross Section / Long Section)</option>
                  <option value="Highway / Pipeline">Highway / Pipeline Alignment</option>
                  <option value="Building Plotting">Building Plotting & Column Setting Out</option>
                  <option value="Canal / Cadastral">Canal / Cadastral Boundary</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Project Details / Site Location *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required placeholder="Describe property location, acreage, specific survey requirements..."></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{
                width: '100%', 
                opacity: status === 'submitting' ? 0.7 : 1, 
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
              }} 
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>Sending Request <i className="fa-solid fa-spinner fa-spin"></i></>
              ) : (
                <>Submit Survey Request <i className="fa-solid fa-paper-plane"></i></>
              )}
            </button>
          </motion.form>
        </div>

        <motion.div 
          className="map-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-map-location-dot" style={{ color: 'var(--brand-secondary)' }}></i> Our Office Location
            </h4>
            <a 
              href="https://maps.app.goo.gl/5RQ8ddBWFTCnTnvw8" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline" 
              style={{ padding: '0.5rem 1.4rem', fontSize: '0.85rem' }}
            >
              Open in Google Maps <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <iframe 
            src="https://maps.google.com/maps?q=22.3072,73.1812&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="420" 
            style={{ border: 0, borderRadius: '20px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Earth Survey Consultant Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
