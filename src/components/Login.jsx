import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css'; // We will create this

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
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
            <h2 className="section-title dark-text" style={{ textAlign: 'center', fontSize: '2.5rem' }}>Welcome Back</h2>
            <div className="title-underline center"></div>
            <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Log in to access your portal</p>
            
            {error && <div className="auth-error">{error}</div>}

            <form className="contact-form" style={{ padding: '2rem', marginTop: '0' }} onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Log In</button>
              </div>
              <p className="auth-switch">
                Don't have an account? <Link to="/signup" className="text-gradient">Sign up</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;
