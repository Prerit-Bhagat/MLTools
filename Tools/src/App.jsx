// // // import { HashRouter, Routes, Route } from "react-router-dom";
// // // import AppLayout from "./layouts/AppLayout";
// // // import Home from "./pages/Home/Home.jsx";
// // // import ML from "./pages/ML/MachineLearning.jsx";
// // // import NLP from "./pages/NLP/Nlp.jsx";
// // // import About from './pages/About/Aboutus.jsx'
// // // const App = () => {
// // //   return (
// // //     <HashRouter> {/* HashRouter ensures compatibility with GitHub Pages */}
// // //       <Routes>
// // //         <Route path="/" element={<AppLayout />}>
// // //           <Route index element={<Home />} />
// // //           <Route path="about" element={<About />} />
// // //           <Route path="ml" element={<ML />} />
// // //           <Route path="nlp" element={<NLP />} />
// // //         </Route>
// // //       </Routes>
// // //     </HashRouter>
// // //   );
// // // };

// // // export default App;
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import AppLayout from "@layouts/AppLayout";
// // import Home from "@pages/Home/Home.jsx";
// // import NLP from "@NLP/Nlp.jsx";
// // import About from "@pages/About/Aboutus.jsx";
// // import ML from "@ML/MachineLearning.jsx";

// // const App = () => {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<AppLayout />}>
// //           <Route index element={<Home />} />
// //           <Route path="about" element={<About />} />
// //           <Route path="ml" element={<ML />} />
// //           <Route path="nlp" element={<NLP />} />
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // };

// // export default App;
// import React, { useContext } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { AuthProvider, AuthContext } from "@pages/Context/Auth";

// import Login from "@pages/Auth/Login";
// import Register from "@pages/Auth/Register";
// import ForgotPassword from "@pages/Auth/ForgotPassword";
// import ResetPassword from "@pages/Auth/ResetPassword";
// import Home from "@pages/Home/Home";
// import About from "@pages/About/Aboutus";
// import NLP from "@NLP/Nlp";
// import ML from "@ML/MachineLearning";
// import ProtectedRoute from "@pages/components/ProtectedRoute";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   console.log("Navbar user:", user);
//   return (
//     <nav style={{ display: "flex", gap: "15px", padding: "10px" }}>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/nlp">NLP</Link>
//       <Link to="/ml">ML</Link>

//       {!user && <Link to="/login">Login</Link>}
//       {!user && <Link to="/register">Register</Link>}

//       {user && (
//         <>
//           <span>Hi, {user}</span>
//           <button onClick={logout}>Logout</button>
//         </>
//       )}
//     </nav>
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />

//           {/* Protected Route */}
//           <Route
//             path="/ml"
//             element={
//               <ProtectedRoute>
//                 {" "}
//                 <ML />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/nlp"
//             element={
//               <ProtectedRoute>
//                 {" "}
//                 <NLP />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "@pages/Context/Auth";

import Login from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";
import ForgotPassword from "@pages/Auth/ForgotPassword";
import ResetPassword from "@pages/Auth/ResetPassword";
import Home from "@pages/Home/Home";
import About from "@pages/About/Aboutus";
import NLP from "@NLP/Nlp";
import ML from "@ML/MachineLearning";
import ProtectedRoute from "@pages/components/ProtectedRoute";

// Styled Navbar using Tailwind
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ML</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MLTools</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
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
            <Link
              to="/nlp"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              NLP
            </Link>
            <Link
              to="/ml"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              ML
            </Link>

            {/* Auth Links */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                {/* <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Register
                </Link> */}
              </>
            )}

            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-gray-800 font-medium">Hi, {user}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/ml"
            element={
              <ProtectedRoute>
                <ML />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nlp"
            element={
              <ProtectedRoute>
                <NLP />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
