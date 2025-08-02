// // import { Link } from "react-router-dom";
// // import { useState } from "react";
// // import "./Header.css";

// // const Header = () => {
// //   const [dropdownOpen, setDropdownOpen] = useState(false);

// //   return (
// //     <header className="Header">
// //       <div className="Header-Left">
// //         <Link to="/" className="Logo">
// //           <img src="ML.png" alt="MLTools Logo" />
// //           <span className="Logo-text">MLTools</span>
// //         </Link>
// //       </div>

// //       <nav className="Header-Right">
// //         <Link to="/">Home</Link>
// //         <Link to="/about">About</Link>

// //         <div
// //           className="Dropdown"
// //           onMouseEnter={() => setDropdownOpen(true)}
// //           onMouseLeave={() => setDropdownOpen(false)}
// //         >
// //           <span className="Dropdown-Title">Services ▾</span>
// //           {dropdownOpen && (
// //             <div className="Dropdown-Menu">
// //               <Link to="/ml">ML</Link>
// //               {/* <Link to="/nlp">NLP</Link> */}
// //             </div>
// //           )}
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Header;
// "use client";

// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-sm border-b sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">ML</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">MLTools</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//             >
//               About
//             </Link>
//             <div
//               className="relative"
//               onMouseEnter={() => setDropdownOpen(true)}
//               onMouseLeave={() => setDropdownOpen(false)}
//             >
//               <span className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">
//                 Services ▾
//               </span>
//               {dropdownOpen && (
//                 <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg py-2 min-w-[120px]">
//                   <Link
//                     to="/ml"
//                     className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     ML Analysis
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </nav>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
//           >
//             {mobileMenuOpen ? "✕" : "☰"}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 to="/"
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 to="/ml"
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 ML Analysis
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing the dropdown
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // 300ms delay
  };

  const handleDropdownMouseEnter = () => {
    // Keep dropdown open when hovering over it
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Close dropdown when leaving the dropdown menu
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150); // Shorter delay when leaving dropdown
  };

  const handleLinkClick = () => {
    // Close dropdown immediately when clicking a link
    setDropdownOpen(false);
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ML</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MLTools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer flex items-center">
                Services
                <span
                  className={`ml-1 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </span>
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg py-2 min-w-[140px] z-50"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <Link
                    to="/ml"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🧠</span>
                      ML Analysis
                    </span>
                  </Link>
                  <Link
                    to="/nlp"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🔤</span>
                      NLP Tools
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
          >
            <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link
                to="/about"
                className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                ℹ️ About
              </Link>
              <Link
                to="/ml"
                className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                🧠 ML Analysis
              </Link>
              <Link
                to="/nlp"
                className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔤 NLP Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
