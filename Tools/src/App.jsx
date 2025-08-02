// import { HashRouter, Routes, Route } from "react-router-dom";
// import AppLayout from "./layouts/AppLayout";
// import Home from "./pages/Home/Home.jsx";
// import ML from "./pages/ML/MachineLearning.jsx";
// import NLP from "./pages/NLP/Nlp.jsx";
// import About from './pages/About/Aboutus.jsx'
// const App = () => {
//   return (
//     <HashRouter> {/* HashRouter ensures compatibility with GitHub Pages */}
//       <Routes>
//         <Route path="/" element={<AppLayout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="ml" element={<ML />} />
//           <Route path="nlp" element={<NLP />} />
//         </Route>
//       </Routes>
//     </HashRouter>
//   );
// };

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import Home from "@pages/Home/Home.jsx";
import NLP from "@NLP/Nlp.jsx";
import About from "@pages/About/Aboutus.jsx";
import ML from "@ML/MachineLearning.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="ml" element={<ML />} />
          <Route path="nlp" element={<NLP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
