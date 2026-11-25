import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FAQ.css';

const faqs = [
  {
    question: "What is land surveying?",
    answer: "Land surveying is the technique, profession, and science of determining the terrestrial or three-dimensional positions of points and the distances and angles between them. It is crucial for property boundaries, mapmaking, and construction."
  },
  {
    question: "How long does a survey take?",
    answer: "The duration of a survey depends on the size of the property, the terrain, and the type of survey required. Most standard residential surveys take a few days, while complex commercial projects may take weeks."
  },
  {
    question: "What equipment do you use?",
    answer: "We use state-of-the-art equipment to ensure maximum precision. Our primary tools include the CHCNAV i73+ GNSS receiver and the HCE600 data collector, which offer exceptional accuracy for all our surveying needs."
  },
  {
    question: "What areas do you cover?",
    answer: "We are based in and proudly serve the entire region of Gujarat, India. If your project is outside this area, please contact us to discuss potential arrangements."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <div className="title-underline center"></div>
          <p className="section-subtitle">Common questions about our land surveying services and processes.</p>
        </motion.div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <i className={`fa-solid fa-chevron-down faq-icon`}></i>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
