// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="Footer">
//       {/* Top Section */}
//       <div className="Footer-Top">
//         {/* Logo / Brand */}
//         <h2 className="Footer-Brand">MLTools</h2>

//         {/* Quick Description */}
//         <p className="Footer-Tagline">
//           Empowering you with cutting-edge AI solutions.
//         </p>
//       </div>

//       {/* Navigation Links */}
//       <div className="Footer-Links">
//         <a href="#home">Home</a>
//         <a href="#about">About</a>
//         <a href="#services">Services</a>
//         <a href="#contact">Contact</a>
//       </div>

//       {/* Bottom Section */}
//       <div className="Footer-Bottom">
//         <p>&copy; 2025 MLTools. All rights reserved.</p>
//         <div className="Footer-Legal">
//           <a href="#privacy">Privacy Policy</a>
//           <span> | </span>
//           <a href="#terms">Terms & Conditions</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-white mt-auto"
      style={{
        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        padding: "3rem 0 1rem",
      }}
    >
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4" style={{ marginBottom: "2rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4" style={{ gap: "0.75rem" }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                }}
              ></div>
              <h2
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MLTools
              </h2>
            </div>
            <p
              className="text-gray-300 leading-relaxed max-w-md"
              style={{ lineHeight: "1.6" }}
            >
              Empowering you with cutting-edge AI solutions for machine learning
              model selection. Making advanced ML accessible to everyone through
              intelligent automation.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Navigation
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ℹ About
              </Link>
              <Link
                to="/ml"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ML Analysis
              </Link>
              <Link
                to="/nlp"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                NLP Tools
              </Link>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <div className="flex flex-col space-y-3">
              <Link
                to="/ml"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Model Selection
              </Link>
              <a
                href="#classification"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Classification
              </a>
              <a
                href="#regression"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Regression
              </a>
              <a
                href="#topsis"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                TOPSIS Analysis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-gray-700">
        <div
          className="flex flex-col md:flex-row justify-between items-center"
          style={{ gap: "1rem" }}
        >
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; 2025 MLTools. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center text-sm" style={{ gap: "1rem" }}>
            <a
              href="#privacy"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#terms"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Terms & Conditions
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#contact"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-4 pt-4 border-t border-gray-800">
          <p
            className="text-gray-500 text-xs"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span>Made with Love for data scientists</span>
            <span>•</span>
            <span>Powered by PyCaret & TOPSIS</span>
            {/* <span>•</span> */}
            {/* <span>🚀 Deploy on Vercel</span> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
