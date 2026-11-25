import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Footer from './components/Footer';

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

import Calculator from './components/Calculator';
import Chatbot from './components/Chatbot';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Calculator />
    <WhyUs />
    <FAQ />
    <Blog />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
        <Route path="/dashboard" element={<><Dashboard /><Footer /></>} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
