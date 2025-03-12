import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import ML from './pages/ML/MachineLearning.jsx';
import NLP from './pages/NLP/Nlp.jsx'
import Login from './pages/Auth/Auth.jsx';
import AppLayout from "./AppLayout";

function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? element : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "ml", element: <ProtectedRoute element={<ML />} /> },
      { path: "nlp", element: <ProtectedRoute element={<NLP />} /> },
    ],
  },
  { path: "login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
