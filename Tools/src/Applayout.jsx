import { Outlet, Link } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <nav>
        <Link to="/ml">ML</Link> | <Link to="/nlp">NLP</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default AppLayout;
