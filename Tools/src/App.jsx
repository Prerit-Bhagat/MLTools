import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ML from "./ML";
import NLP from "./NLP";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Router>
      <AppLayout />
      <Routes>
        <Route path="/ml" element={<ML />} />
        <Route path="/nlp" element={<NLP />} />
      </Routes>
    </Router>
  );
}

export default App;
