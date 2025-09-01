// // src/context/AuthContext.jsx
// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // null = not logged in

//   const login = (userData) => {
//     setUser(userData); // { name, email }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for easy access
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://mltools.onrender.com/whoami/", {
          withCredentials: true,
        });
        if (res.data.username) {
          setUser(res.data.username);
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };
    fetchUser();
  }, []);

  const register = async (email, password) => {
    try {
      const res = await axios.post(
        "https://mltools.onrender.com/register/",
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) setUser(email);
      return res.data;
    } catch {
      return { success: false, message: "Registration failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://mltools.onrender.com/login/",
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) setUser(res.data.name);
      // setUser("Prerit");
      console.log(email, password, res.data);
      return res.data;
    } catch {
      return { success: false, message: "Login failed" };
    }
  };

  const logout = () => {
    Cookies.remove("auth");
    setUser(null);
  };

  const forgotPassword = async (email) => {
    return await axios.post(
      "https://mltools.onrender.com/forgotPassword/",
      { email },
      { withCredentials: true }
    );
  };

  const resetPassword = async (token, newPassword) => {
    return await axios.post(
      "https://mltools.onrender.com/resetPassword/",
      { token, new_password: newPassword },
      { withCredentials: true }
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
