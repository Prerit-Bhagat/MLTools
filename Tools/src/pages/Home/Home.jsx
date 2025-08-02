// // import React from "react";
// // import "./Home.css";

// // const Home = () => {
// //   return (
// //     <div className="Main">
// //       <h3>Find Your Ideal ML Model!</h3>
// //       <h1>Revolutionizing </h1>
// //       <h1>Technology with Al</h1>
// //       <p>
// //         Unlock the Power of AI for Machine Learning! Effortlessly discover the
// //         best ML algorithms tailored to your data with PyCaret. Optimize
// //         predictions, streamline workflows, and elevate data-driven
// //         decision-making. Experience the future of automated ML selection today!
// //       </p>
// //       {/* How It Works */}
// //       <section className="py-12 sm:py-16 w-full">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-8 sm:mb-12">
// //             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
// //               How It Works
// //             </h2>
// //             <p className="text-base sm:text-lg text-gray-600">
// //               Simple process to find your best algorithm
// //             </p>
// //           </div>

// //           <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
// //             <div className="text-center">
// //               <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-lg sm:text-2xl font-bold text-blue-600">
// //                   1
// //                 </span>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
// //                 Upload Dataset
// //               </h3>
// //               <p className="text-sm sm:text-base text-gray-600">
// //                 Upload your CSV file with structured data.
// //               </p>
// //             </div>

// //             <div className="text-center">
// //               <div className="bg-green-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-lg sm:text-2xl font-bold text-green-600">
// //                   2
// //                 </span>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
// //                 Configure Analysis
// //               </h3>
// //               <p className="text-sm sm:text-base text-gray-600">
// //                 Set target variable, weights, and impacts.
// //               </p>
// //             </div>

// //             <div className="text-center">
// //               <div className="bg-purple-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-lg sm:text-2xl font-bold text-purple-600">
// //                   3
// //                 </span>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
// //                 AI Analysis
// //               </h3>
// //               <p className="text-sm sm:text-base text-gray-600">
// //                 Our AI tests multiple algorithms using PyCaret.
// //               </p>
// //             </div>

// //             <div className="text-center">
// //               <div className="bg-orange-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-lg sm:text-2xl font-bold text-orange-600">
// //                   4
// //                 </span>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
// //                 Get Results
// //               </h3>
// //               <p className="text-sm sm:text-base text-gray-600">
// //                 Receive detailed recommendations and metrics.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;
// import React from "react";
// import "./Home.css";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Background overlay */}
//       <div className="overlay" />
//       <div className="content-wrapper">
//         <h3 className="subtitle">Find Your Ideal ML Model!</h3>
//         <h1 className="title">
//           Revolutionizing
//           <br />
//           Technology with AI
//         </h1>
//         <p className="description">
//           Unlock the Power of AI for Machine Learning! Effortlessly discover the
//           best ML algorithms tailored to your data with PyCaret. Optimize
//           predictions, streamline workflows, and elevate data-driven
//           decision-making. Experience the future of automated ML selection
//           today!
//         </p>
//         <button className="cta-button">Get Started</button>

//         {/* How It Works */}
//         <section className="steps-section">
//           <div className="steps-header">
//             <h2>How It Works</h2>
//             <p>Simple process to find your best algorithm</p>
//           </div>

//           <div className="steps-grid">
//             {[
//               {
//                 num: 1,
//                 title: "Upload Dataset",
//                 desc: "Upload your CSV file with structured data.",
//               },
//               {
//                 num: 2,
//                 title: "Configure Analysis",
//                 desc: "Set target variable, weights, and impacts.",
//               },
//               {
//                 num: 3,
//                 title: "AI Analysis",
//                 desc: "Our AI tests multiple algorithms using PyCaret.",
//               },
//               {
//                 num: 4,
//                 title: "Get Results",
//                 desc: "Receive detailed recommendations and metrics.",
//               },
//             ].map(({ num, title, desc }) => (
//               <div key={num} className="step-card">
//                 <div className="step-icon">{num}</div>
//                 <h3 className="step-title">{title}</h3>
//                 <p className="step-desc">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";
import "@pages/Home/Home.css";

const Home = () => {
  const steps = [
    {
      num: 1,
      title: "Upload Dataset",
      desc: "Upload your CSV file with structured data.",
      icon: "📁",
      color: "bg-blue-100 text-blue-600",
    },
    {
      num: 2,
      title: "Configure Analysis",
      desc: "Set target variable, weights, and impacts.",
      icon: "⚙️",
      color: "bg-green-100 text-green-600",
    },
    {
      num: 3,
      title: "AI Analysis",
      desc: "Our AI tests multiple algorithms using PyCaret.",
      icon: "🧠",
      color: "bg-purple-100 text-purple-600",
    },
    {
      num: 4,
      title: "Get Results",
      desc: "Receive detailed recommendations and metrics.",
      icon: "📊",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="home-container">
      <div className="overlay" />
      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <h3 className="subtitle">Find Your Ideal ML Model!</h3>
          <h1 className="title">
            Revolutionizing
            <br />
            Technology with AI
          </h1>
          <p className="description">
            Unlock the Power of AI for Machine Learning! Effortlessly discover
            the best ML algorithms tailored to your data with PyCaret. Optimize
            predictions, streamline workflows, and elevate data-driven
            decision-making. Experience the future of automated ML selection
            today!
          </p>
          <Link to="/ml">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>

        {/* How It Works Section */}
        <section className="steps-section">
          <div className="steps-header">
            <h2>How It Works</h2>
            <p>Simple process to find your best algorithm</p>
          </div>
          <div className="steps-grid">
            {steps.map(({ num, title, desc, icon, color }) => (
              <div key={num} className="step-card">
                <div className={`step-icon ${color}`}>
                  <span className="step-emoji">{icon}</span>
                  <span className="step-number">{num}</span>
                </div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Find Your Perfect ML Model?</h2>
          <p>
            Join thousands of data scientists who trust our AI-powered model
            selection
          </p>
          <Link to="/ml">
            <button className="cta-button secondary">
              Start Your Analysis →
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
