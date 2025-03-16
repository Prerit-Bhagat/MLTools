import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="Header">
      <div className="Header-Left">
        <Link to="/" className="Logo">
          <img src="ML.png" alt="MLTools Logo" />
          <span className="Logo-text">MLTools</span>
        </Link>
      </div>

      <nav className="Header-Right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
        <div 
          className="Dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className="Dropdown-Title">Services ▾</span>
          {dropdownOpen && (
            <div className="Dropdown-Menu">
              <Link to="/ml">ML</Link>
              <Link to="/nlp">NLP</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;