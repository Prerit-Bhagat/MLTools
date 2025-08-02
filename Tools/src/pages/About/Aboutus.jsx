// import React from "react";

// function AboutUs() {
//   return (
//     <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-10">
//       <h1 className="text-4xl font-bold mb-6">About Me</h1>
//       <p className="text-lg text-center max-w-3xl">
//         Hello! I'm{" "}
//         <span className="text-blue-400 font-semibold">Prerit Bhagat</span>, a
//         Computer Science student at Thapar University. I am passionate about
//         artificial intelligence, web development, and building innovative
//         technology solutions. This project is a reflection of my dedication to
//         revolutionizing AI-driven solutions, helping users find the best ML
//         models tailored to their needs.
//       </p>
//       <p className="text-lg text-center max-w-3xl mt-4">
//         My goal is to create seamless and intelligent applications that enhance
//         user experience and optimize workflows. I am always eager to learn and
//         explore new technologies in the field of AI and software development.
//       </p>
//       <p className="text-lg text-center max-w-3xl mt-4">
//         Feel free to explore my work and connect with me for collaborations or
//         discussions related to AI and software engineering.
//       </p>
//     </div>
//   );
// }

// export default AboutUs;
import "@pages/About/About.css";

const About = () => {
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI automatically tests 15+ machine learning algorithms to find the perfect match.",
    },
    {
      icon: "🎯",
      title: "Accurate Predictions",
      description:
        "Get highly accurate models with detailed performance metrics and confidence scores.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Process your data and get results in minutes, not hours or days.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description:
        "Your data is processed securely and never stored on our servers.",
    },
    {
      icon: "👥",
      title: "Beginner Friendly",
      description:
        "No coding required! Our intuitive interface makes ML accessible to everyone.",
    },
    {
      icon: "🏆",
      title: "Enterprise Ready",
      description:
        "Trusted by data scientists and businesses worldwide for critical decisions.",
    },
  ];

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About MLTools</h1>
          <p>
            MLTools is an AI-powered platform that automatically finds the best
            machine learning model for your data. No coding required, no complex
            setup - just upload your data and get professional-grade ML models
            in minutes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h2>Why Choose MLTools?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-card">
            <h2>Our Mission</h2>
            <p>
              We believe that machine learning should be accessible to everyone,
              not just data scientists and engineers. Our mission is to
              democratize AI by providing powerful, easy-to-use tools that help
              businesses and individuals make better data-driven decisions.
              Whether you're a student learning about ML, a business analyst
              exploring data, or a researcher testing hypotheses, MLTools makes
              advanced machine learning simple and approachable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
