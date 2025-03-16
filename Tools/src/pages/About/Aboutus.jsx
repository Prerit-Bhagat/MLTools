import React from 'react';

function AboutUs() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="text-lg text-center max-w-3xl">
        Hello! I'm <span className="text-blue-400 font-semibold">Prerit Bhagat</span>, a Computer Science student at Thapar University. I am passionate about 
        artificial intelligence, web development, and building innovative technology solutions. 
        This project is a reflection of my dedication to revolutionizing AI-driven solutions, helping 
        users find the best ML models tailored to their needs.
      </p>
      <p className="text-lg text-center max-w-3xl mt-4">
        My goal is to create seamless and intelligent applications that enhance user experience and 
        optimize workflows. I am always eager to learn and explore new technologies in the field of 
        AI and software development.
      </p>
      <p className="text-lg text-center max-w-3xl mt-4">
        Feel free to explore my work and connect with me for collaborations or discussions related 
        to AI and software engineering.
      </p>
    </div>
  );
}

export default AboutUs;
