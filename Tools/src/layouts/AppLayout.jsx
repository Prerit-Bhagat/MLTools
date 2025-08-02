import { Outlet } from "react-router-dom";
import Header from "@pages/Additional/Header.jsx";
import Footer from "@pages/Additional/Footer.jsx";

const AppLayout = () => {
  return (
    <div>
      <Header />
      {/* <main className="flex-1 p-6"> */}
      <Outlet /> {/* Nested routes will render here */}
      {/* </main> */}
      <Footer />
    </div>
  );
};

export default AppLayout;
