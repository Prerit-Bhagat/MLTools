import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="Main">
      {/* Left side with text */}
      <div className="left-content">
        <h3>Find Your Ideal ML Model!</h3>
        <h1>Revolutionizing</h1>
        <h1>Technology with AI</h1>
        <p>
          Unlock the Power of AI for Machine Learning! Effortlessly discover the best ML 
          algorithms tailored to your data with PyCaret. Optimize predictions, streamline 
          workflows, and elevate data-driven decision-making. Experience the future of 
          automated ML selection today!
        </p>
      </div>

      {/* Right side with background image */}
      <div className="right-content"><img src="Background.jpg" alt="AIImage" /></div>
    </div>
  );
};

export default Home;
