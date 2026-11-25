import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-section section-light">
      <div className="container">
        <div className="auth-card">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title dark-text" style={{ textAlign: 'center', fontSize: '2.5rem' }}>Create Account</h2>
            <div className="title-underline center"></div>
            <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Join Earth Survey Consultant today</p>
            
            {error && <div className="auth-error">{error}</div>}

            <form className="contact-form" style={{ padding: '2rem', marginTop: '0' }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="John Doe" 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••" 
                />
              </div>
              <div className="submit-btn-wrapper">
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Sign Up</button>
              </div>
              <p className="auth-switch">
                Already have an account? <Link to="/login" className="text-gradient">Log in</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
