import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      {/* Top Section */}
      <div className="Footer-Top">
        {/* Logo / Brand */}
        <h2 className="Footer-Brand">MLTools</h2>
        
        {/* Quick Description */}
        <p className="Footer-Tagline">
          Empowering you with cutting-edge AI solutions.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="Footer-Links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Bottom Section */}
      <div className="Footer-Bottom">
        <p>&copy; 2025 MLTools. All rights reserved.</p>
        <div className="Footer-Legal">
          <a href="#privacy">Privacy Policy</a>
          <span> | </span>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
