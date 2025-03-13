import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <header >
      <div >
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" alt="MLTools Logo" />
          <span>MLTools</span>
        </Link>

        <nav >
          <Link to="/" >Home</Link>
          <Link to="/ml" >ML</Link>
          <Link to="/nlp">NLP</Link>
        </nav>
      </div>
    </header>
    <h1>header ends</h1>
    </>
  );
};

export default Header;
