import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Protect route
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <section className="section-light" style={{ minHeight: '100vh', paddingTop: '10rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="contact-form"
          >
            <h2 className="section-title dark-text">Welcome, {user.name}!</h2>
            <div className="title-underline dark-line"></div>
            
            <div style={{ marginTop: '2rem' }}>
              <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '12px', marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--navy)', marginBottom: '0.5rem' }}>Account Information</h4>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status:</strong> Active Client</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ padding: '2rem', background: 'var(--white-pure)', border: '1px solid #E2E8F0', borderRadius: '12px', textAlign: 'center' }}>
                  <i className="fa-solid fa-file-invoice" style={{ fontSize: '2rem', color: 'var(--amber)', marginBottom: '1rem' }}></i>
                  <h4 style={{ color: 'var(--navy)' }}>My Invoices</h4>
                  <p style={{ color: '#64748B', fontSize: '0.9rem' }}>View past quotes and invoices.</p>
                </div>
                <div style={{ padding: '2rem', background: 'var(--white-pure)', border: '1px solid #E2E8F0', borderRadius: '12px', textAlign: 'center' }}>
                  <i className="fa-solid fa-map-location-dot" style={{ fontSize: '2rem', color: 'var(--amber)', marginBottom: '1rem' }}></i>
                  <h4 style={{ color: 'var(--navy)' }}>My Surveys</h4>
                  <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Access your survey reports.</p>
                </div>
                <div style={{ padding: '2rem', background: 'var(--white-pure)', border: '1px solid #E2E8F0', borderRadius: '12px', textAlign: 'center' }}>
                  <i className="fa-solid fa-headset" style={{ fontSize: '2rem', color: 'var(--amber)', marginBottom: '1rem' }}></i>
                  <h4 style={{ color: 'var(--navy)' }}>Support</h4>
                  <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Contact your dedicated surveyor.</p>
                </div>
              </div>

              <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
