import React from 'react';
import { motion } from 'framer-motion';
import './Blog.css';

const blogPosts = [
  {
    title: "What is Land Surveying?",
    excerpt: "Discover the fundamentals of land surveying, its importance in property development, and why precision is critical for any successful construction project.",
    date: "May 10, 2026",
    readTime: "4 min read",
    icon: "fa-solid fa-map"
  },
  {
    title: "Importance of DGPS in Surveying",
    excerpt: "Learn how Differential Global Positioning System (DGPS) technology revolutionizes the accuracy and efficiency of modern land surveying.",
    date: "April 22, 2026",
    readTime: "6 min read",
    icon: "fa-solid fa-satellite"
  },
  {
    title: "Topographic Survey Explained",
    excerpt: "An in-depth look at topographic surveys, the equipment used, and why mapping the contours of the earth is essential for engineers and architects.",
    date: "March 15, 2026",
    readTime: "5 min read",
    icon: "fa-solid fa-mountain"
  }
];

const Blog = () => {
  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title dark-text">Latest <span className="text-gradient">Insights</span></h2>
          <div className="title-underline center dark-line"></div>
          <p className="section-subtitle">Expert articles, industry trends, and valuable knowledge from our professional surveyors.</p>
        </motion.div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index} 
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="blog-image">
                <i className={post.icon}></i>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span><i className="fa-regular fa-calendar"></i> {post.date}</span>
                  <span><i className="fa-regular fa-clock"></i> {post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <a href="#" className="blog-read-more">Read Article <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
